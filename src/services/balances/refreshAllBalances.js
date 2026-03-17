import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

// ===== PROVIDER RESOLUTION (FIXED) =====

function getTronWebCandidates(provider) {
  const win = getWindowSafe();

  return [
    // highest priority — explicit provider
    provider?.tronWeb,
    provider,

    // injected sources (ordered by reliability)
    win?.tronLink?.tronWeb,
    win?.okxwallet?.tronWeb,
    win?.okxWallet?.tronWeb,
    win?.tp?.tronWeb,
    win?.tokenPocket?.tronWeb,
    win?.bitkeep?.tronWeb,
    win?.bitget?.tronWeb,
    win?.trustwallet?.tronWeb,
    win?.trustWallet?.tronWeb,

    // fallback
    win?.tronWeb
  ].filter(Boolean);
}

function hasValidAddress(tronWeb, address) {
  const addr =
    tronWeb?.defaultAddress?.base58 ||
    tronWeb?.tronWeb?.defaultAddress?.base58 ||
    null;

  return addr && address && addr === address;
}

function isValidTronWeb(tronWeb) {
  return (
    tronWeb &&
    typeof tronWeb?.trx?.getBalance === 'function'
  );
}

function pickBestTronWeb(provider, address) {
  const candidates = getTronWebCandidates(provider);

  // 1. perfect match (address совпадает)
  for (const tw of candidates) {
    if (isValidTronWeb(tw) && hasValidAddress(tw, address)) {
      return tw;
    }
  }

  // 2. просто валидный tronWeb
  for (const tw of candidates) {
    if (isValidTronWeb(tw)) {
      return tw;
    }
  }

  return candidates[0] || null;
}

// ===== HELPERS =====

function normalizeSunToTrx(value) {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return null;
  return num / 1_000_000;
}

function decodeHexBalance(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') return null;

  try {
    return parseInt(hexValue, 16);
  } catch {
    return null;
  }
}

// ===== READERS =====

async function readTrxBalance(address, tronWeb) {
  if (!isUsableAddress(address)) {
    throw new Error('TRX balance: invalid address');
  }

  if (!tronWeb?.trx?.getBalance) {
    throw new Error('TRX balance: tronWeb not ready');
  }

  const balanceSun = await tronWeb.trx.getBalance(address);
  const trx = normalizeSunToTrx(balanceSun);

  if (trx === null) {
    throw new Error('TRX balance: invalid result');
  }

  return trx;
}

async function readTokenBalanceViaContract(address, tronWeb) {
  if (!isUsableAddress(address)) {
    throw new Error('Token balance: invalid address');
  }

  if (typeof tronWeb?.contract !== 'function') {
    throw new Error('Token balance: contract API missing');
  }

  const contract = await tronWeb.contract().at(FOURTEEN_TOKEN_ADDRESS);
  const raw = await contract.balanceOf(address).call();

  const value =
    typeof raw === 'object' && raw !== null && raw.toString
      ? raw.toString()
      : String(raw);

  const num = Number(value) / 1_000_000;

  if (!Number.isFinite(num)) {
    throw new Error('Token balance: invalid result');
  }

  return num;
}

async function readTokenBalanceViaTrigger(address, tronWeb) {
  if (!isUsableAddress(address)) {
    throw new Error('Token fallback: invalid address');
  }

  if (!tronWeb?.transactionBuilder?.triggerConstantContract) {
    throw new Error('Token fallback: triggerConstantContract missing');
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
    throw new Error('Token fallback: decode failed');
  }

  return raw / 1_000_000;
}

// ===== MAIN =====

export async function refreshAllBalances({ address, walletId, provider } = {}) {
  const state = getWalletState();

  const finalAddress = address || state.address || null;
  const finalWalletId = walletId || state.activeWalletId || state.walletId || null;
  const finalProvider = provider || state.provider || state.tronWeb || null;

  if (!isUsableAddress(finalAddress)) {
    throw new Error('refreshAllBalances: invalid address');
  }

  const tronWeb = pickBestTronWeb(finalProvider, finalAddress);

  setWalletState({
    address: finalAddress,
    walletId: finalWalletId,
    activeWalletId: finalWalletId,
    provider: finalProvider,
    tronWeb: tronWeb || null
  });

  let trxBalance = null;
  let fourteenBalance = null;

  let trxError = null;
  let tokenError = null;

  // ===== TRX =====

  try {
    trxBalance = await readTrxBalance(finalAddress, tronWeb);
  } catch (e) {
    trxError = e;
    console.error('[4TEEN] TRX balance error', e);
  }

  // ===== TOKEN =====

  try {
    fourteenBalance = await readTokenBalanceViaContract(finalAddress, tronWeb);
  } catch (e) {
    tokenError = e;
    console.error('[4TEEN] token contract error', e);

    try {
      fourteenBalance = await readTokenBalanceViaTrigger(finalAddress, tronWeb);
      tokenError = null;
    } catch (fallbackError) {
      tokenError = fallbackError;
      console.error('[4TEEN] token fallback error', fallbackError);
    }
  }

  // ===== FAIL SAFE =====

  if (trxBalance === null && fourteenBalance === null) {
    throw new Error('Failed to fetch any balances');
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
