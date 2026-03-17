import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function toBase58Candidate(value) {
  if (!value || typeof value !== 'string') return null;
  if (isUsableAddress(value)) return value;
  return null;
}

function getTronWebCandidates(provider) {
  const win = getWindowSafe();

  return [
    provider?.tronWeb,
    provider,
    win?.tronWeb,
    win?.tronLink?.tronWeb,
    win?.okxwallet?.tronWeb,
    win?.trustwallet?.tronWeb,
    win?.trustWallet?.tronWeb
  ].filter(Boolean);
}

function pickBestTronWeb(provider) {
  const candidates = getTronWebCandidates(provider);

  for (const tronWeb of candidates) {
    if (
      tronWeb &&
      (
        typeof tronWeb?.trx?.getBalance === 'function' ||
        typeof tronWeb?.contract === 'function' ||
        typeof tronWeb?.transactionBuilder?.triggerConstantContract === 'function'
      )
    ) {
      return tronWeb;
    }
  }

  return candidates[0] || null;
}

function normalizeSunToTrx(value) {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return null;
  return num / 1_000_000;
}

function decodeHexBalance(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') return null;

  try {
    return parseInt(hexValue, 16);
  } catch (error) {
    return null;
  }
}

async function readTrxBalance(address, tronWeb) {
  if (!isUsableAddress(address)) {
    throw new Error('TRX balance read skipped: invalid address');
  }

  if (typeof tronWeb?.trx?.getBalance !== 'function') {
    throw new Error('TRX balance read skipped: tronWeb.trx.getBalance missing');
  }

  const balanceSun = await tronWeb.trx.getBalance(address);
  const balanceTrx = normalizeSunToTrx(balanceSun);

  if (balanceTrx === null) {
    throw new Error('TRX balance read failed: invalid numeric result');
  }

  return balanceTrx;
}

async function readTokenBalanceViaContract(address, tronWeb) {
  if (!isUsableAddress(address)) {
    throw new Error('Token balance read skipped: invalid address');
  }

  if (typeof tronWeb?.contract !== 'function') {
    throw new Error('Token balance read skipped: tronWeb.contract missing');
  }

  const contract = await tronWeb.contract().at(FOURTEEN_TOKEN_ADDRESS);
  const raw = await contract.balanceOf(address).call();

  const value =
    typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
      ? raw.toString()
      : String(raw);

  const num = Number(value) / 1_000_000;

  if (!Number.isFinite(num)) {
    throw new Error('Token balance via contract failed: invalid numeric result');
  }

  return num;
}

async function readTokenBalanceViaTrigger(address, tronWeb) {
  if (!isUsableAddress(address)) {
    throw new Error('Token balance fallback skipped: invalid address');
  }

  if (typeof tronWeb?.transactionBuilder?.triggerConstantContract !== 'function') {
    throw new Error('Token balance fallback skipped: triggerConstantContract missing');
  }

  const ownerHex = tronWeb.address.toHex(address);
  const contractHex = tronWeb.address.toHex(FOURTEEN_TOKEN_ADDRESS);

  const res = await tronWeb.transactionBuilder.triggerConstantContract(
    contractHex,
    'balanceOf(address)',
    {},
    [{ type: 'address', value: address }],
    ownerHex
  );

  const hexValue = res?.constant_result?.[0] || null;
  const raw = decodeHexBalance(hexValue);

  if (!Number.isFinite(raw)) {
    throw new Error('Token balance fallback failed: invalid decoded result');
  }

  return raw / 1_000_000;
}

export async function refreshAllBalances({ address, walletId, provider } = {}) {
  const state = getWalletState();

  const finalAddress = address || state.address || null;
  const finalWalletId = walletId || state.activeWalletId || state.walletId || null;
  const finalProvider = provider || state.provider || state.tronWeb || null;

  if (!isUsableAddress(finalAddress)) {
    throw new Error('Failed to refresh balances: invalid address');
  }

  const tronWeb = pickBestTronWeb(finalProvider);

  setWalletState({
    address: finalAddress,
    walletId: finalWalletId,
    activeWalletId: finalWalletId,
    provider: finalProvider,
    tronWeb: tronWeb || finalProvider || null
  });

  let trxBalance = null;
  let fourteenBalance = null;
  let trxError = null;
  let tokenError = null;

  try {
    trxBalance = await readTrxBalance(finalAddress, tronWeb);
  } catch (error) {
    trxError = error;
    console.error('[4TEEN] readTrxBalance failed', error);
  }

  try {
    fourteenBalance = await readTokenBalanceViaContract(finalAddress, tronWeb);
  } catch (error) {
    tokenError = error;
    console.error('[4TEEN] readTokenBalance via contract failed', error);

    try {
      fourteenBalance = await readTokenBalanceViaTrigger(finalAddress, tronWeb);
      tokenError = null;
    } catch (fallbackError) {
      tokenError = fallbackError;
      console.error('[4TEEN] readTokenBalance via triggerConstantContract failed', fallbackError);
    }
  }

  if (trxBalance === null && fourteenBalance === null) {
    throw new Error('Failed to refresh any balances');
  }

  setWalletState({
    trxBalance,
    fourteenBalance,
    error: null
  });

  return {
    address: finalAddress,
    walletId: finalWalletId,
    trxBalance,
    fourteenBalance,
    warnings: {
      trx: trxError?.message || null,
      token: tokenError?.message || null
    }
  };
}
