import { TronWeb } from 'tronweb';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

function normalizeSunToTrx(value) {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return null;
  return Number((num / 1_000_000).toFixed(6));
}

function normalizeTokenUnits(value) {
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

function extractAccountBalance(response) {
  if (!response) return null;

  if (typeof response.balance === 'number') return response.balance;
  if (typeof response?.data?.balance === 'number') return response.data.balance;
  if (typeof response?.account?.balance === 'number') return response.account.balance;
  if (typeof response?.result?.balance === 'number') return response.result.balance;

  return null;
}

function getTronWebCandidates(provider) {
  const win = getWindowSafe();

  return [
    provider?.tronWeb,
    provider,
    provider?.provider?.tronWeb,
    provider?.provider,

    win?.tronLink?.tronWeb,
    win?.okxwallet?.tronWeb,
    win?.okxWallet?.tronWeb,
    win?.tp?.tronWeb,
    win?.tokenPocket?.tronWeb,
    win?.bitkeep?.tronWeb,
    win?.bitget?.tronWeb,
    win?.trustwallet?.tronWeb,
    win?.trustWallet?.tronWeb,
    win?.tronWeb
  ].filter(Boolean);
}

function getProviderCandidates(provider) {
  const win = getWindowSafe();

  return [
    provider,
    provider?.provider,
    provider?.tronWeb,
    provider?.tronWeb?.provider,

    win?.tronLink,
    win?.okxwallet,
    win?.okxWallet,
    win?.tp,
    win?.tokenPocket,
    win?.bitkeep,
    win?.bitget,
    win?.trustwallet,
    win?.trustWallet,
    win?.tronWeb
  ].filter(Boolean);
}

function hasValidAddress(tronWeb, address) {
  const addr =
    tronWeb?.defaultAddress?.base58 ||
    tronWeb?.tronWeb?.defaultAddress?.base58 ||
    null;

  return !!(addr && address && addr === address);
}

function isValidTronWeb(tronWeb) {
  return !!(
    tronWeb &&
    (
      typeof tronWeb?.trx?.getBalance === 'function' ||
      typeof tronWeb?.contract === 'function' ||
      typeof tronWeb?.transactionBuilder?.triggerConstantContract === 'function'
    )
  );
}

function pickBestTronWeb(provider, address) {
  const candidates = getTronWebCandidates(provider);

  for (const tw of candidates) {
    if (isValidTronWeb(tw) && hasValidAddress(tw, address)) {
      return tw;
    }
  }

  for (const tw of candidates) {
    if (isValidTronWeb(tw)) {
      return tw;
    }
  }

  return null;
}

async function tryProviderRequest(provider, method, params) {
  if (!provider || typeof provider.request !== 'function') {
    return null;
  }

  try {
    return await provider.request({
      method,
      ...params
    });
  } catch {
    return null;
  }
}

async function readTrxBalance(address, tronWeb, provider) {
  if (!isUsableAddress(address)) {
    throw new Error('TRX balance: invalid address');
  }

  if (tronWeb?.trx?.getBalance) {
    try {
      const balanceSun = await tronWeb.trx.getBalance(address);
      const trx = normalizeSunToTrx(balanceSun);

      if (trx !== null) {
        return trx;
      }
    } catch (_) {}
  }

  const providers = getProviderCandidates(provider);
  const addressHex = base58ToHexSafe(address);

  if (addressHex) {
    for (const item of providers) {
      const res = await tryProviderRequest(item, 'walletsolidity/getaccount', {
        params: { address: addressHex }
      });

      const balanceSun = extractAccountBalance(res);
      const trx = normalizeSunToTrx(balanceSun);

      if (trx !== null) {
        return trx;
      }
    }

    for (const item of providers) {
      const res = await tryProviderRequest(item, 'wallet/getaccount', {
        params: { address: addressHex }
      });

      const balanceSun = extractAccountBalance(res);
      const trx = normalizeSunToTrx(balanceSun);

      if (trx !== null) {
        return trx;
      }
    }
  }

  const readOnly = getReadOnlyTronWeb();
  const balanceSun = await readOnly.trx.getBalance(address);
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

  const num = normalizeTokenUnits(value);

  if (num === null) {
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
  const value = normalizeTokenUnits(raw);

  if (value === null) {
    throw new Error('Token fallback: decode failed');
  }

  return value;
}

function base58ToHexSafe(address) {
  try {
    return TronWeb.address.toHex(address);
  } catch {
    return null;
  }
}

export async function refreshAllBalances({ address, walletId, provider } = {}) {
  const state = getWalletState();

  const finalAddress = address || state.address || null;
  const finalWalletId = walletId || state.activeWalletId || state.walletId || null;
  const finalProvider = provider || state.provider || state.tronWeb || null;

  if (!isUsableAddress(finalAddress)) {
    throw new Error('refreshAllBalances: invalid address');
  }

  const tronWeb = pickBestTronWeb(finalProvider, finalAddress);
  const balanceReader = tronWeb || getReadOnlyTronWeb();

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

  try {
    trxBalance = await readTrxBalance(finalAddress, tronWeb, finalProvider);
  } catch (e) {
    trxError = e;
    console.error('[4TEEN] TRX balance error', e);
  }

  try {
    fourteenBalance = await readTokenBalanceViaContract(finalAddress, balanceReader);
  } catch (e) {
    tokenError = e;
    console.error('[4TEEN] token contract error', e);

    try {
      fourteenBalance = await readTokenBalanceViaTrigger(finalAddress, balanceReader);
      tokenError = null;
    } catch (fallbackError) {
      tokenError = fallbackError;
      console.error('[4TEEN] token fallback error', fallbackError);
    }
  }

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
