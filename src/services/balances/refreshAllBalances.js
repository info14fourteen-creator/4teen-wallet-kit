import { TronWeb } from 'tronweb';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const TRONGRID_FULL_HOST = 'https://api.trongrid.io';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: TRONGRID_FULL_HOST
  });
}

function normalizeSunToTrx(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return null;
  return Number((num / 1_000_000).toFixed(6));
}

function normalizeTokenUnits(value) {
  const num = Number(value ?? 0);
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

function base58ToHexSafe(address) {
  try {
    return TronWeb.address.toHex(address);
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

function getProviderName(provider) {
  if (!provider) return '';

  const win = getWindowSafe();

  if (provider === win?.tronLink || provider === win?.tronLink?.tronWeb) return 'TronLink';
  if (provider === win?.okxwallet || provider === win?.okxwallet?.tronWeb) return 'OKX Wallet';
  if (provider === win?.okxWallet || provider === win?.okxWallet?.tronWeb) return 'OKX Wallet';
  if (provider === win?.tp || provider === win?.tp?.tronWeb) return 'TokenPocket';
  if (provider === win?.tokenPocket || provider === win?.tokenPocket?.tronWeb) return 'TokenPocket';
  if (provider === win?.bitkeep || provider === win?.bitkeep?.tronWeb) return 'Bitget Wallet';
  if (provider === win?.bitget || provider === win?.bitget?.tronWeb) return 'Bitget Wallet';
  if (provider === win?.trustwallet || provider === win?.trustwallet?.tronWeb) return 'Trust';
  if (provider === win?.trustWallet || provider === win?.trustWallet?.tronWeb) return 'Trust';
  if (provider === win?.BinanceChain) return 'Binance Wallet';
  if (provider === win?.ethereum) return 'MetaMask';

  if (provider?.isTronLink) return 'TronLink';
  if (provider?.isOkxWallet || provider?.isOKExWallet) return 'OKX Wallet';
  if (provider?.isTokenPocket) return 'TokenPocket';
  if (provider?.isBitKeep || provider?.isBitget) return 'Bitget Wallet';
  if (provider?.isTrust || provider?.isTrustWallet) return 'Trust';
  if (provider?.isMetaMask) return 'MetaMask';

  return '';
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
    win?.BinanceChain,
    win?.ethereum,
    win?.tronWeb
  ].filter(Boolean);
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

function getTronWebAddress(tronWeb) {
  return (
    tronWeb?.defaultAddress?.base58 ||
    tronWeb?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function hasValidAddress(tronWeb, address) {
  const current = getTronWebAddress(tronWeb);
  return !!(current && address && current === address);
}

function scoreTronWebCandidate(tronWeb, address, walletId) {
  if (!isValidTronWeb(tronWeb)) return -100000;

  const name = getProviderName(tronWeb);
  const currentAddress = getTronWebAddress(tronWeb);
  const normalizedWalletId = String(walletId || '').trim().toLowerCase();

  let score = 0;

  if (currentAddress && currentAddress === address) score += 10000;
  if (currentAddress && currentAddress !== address) score -= 8000;

  if (typeof tronWeb?.trx?.getBalance === 'function') score += 200;
  if (typeof tronWeb?.contract === 'function') score += 100;
  if (typeof tronWeb?.transactionBuilder?.triggerConstantContract === 'function') score += 100;

  if (normalizedWalletId && name && name.toLowerCase() === normalizedWalletId) score += 4000;

  if (normalizedWalletId && normalizedWalletId !== 'tronlink' && name === 'TronLink') score -= 12000;
  if (normalizedWalletId && normalizedWalletId !== 'okx wallet' && name === 'OKX Wallet') score -= 3000;
  if (normalizedWalletId && normalizedWalletId !== 'tokenpocket' && name === 'TokenPocket') score -= 3000;
  if (normalizedWalletId && normalizedWalletId !== 'bitget wallet' && name === 'Bitget Wallet') score -= 3000;
  if (normalizedWalletId && normalizedWalletId !== 'trust' && name === 'Trust') score -= 3000;
  if (normalizedWalletId && normalizedWalletId !== 'binance wallet' && name === 'Binance Wallet') score -= 3000;
  if (normalizedWalletId && normalizedWalletId !== 'metamask' && name === 'MetaMask') score -= 3000;

  return score;
}

function pickBestTronWeb(provider, address, walletId) {
  const candidates = getTronWebCandidates(provider);

  if (!candidates.length) return null;

  const ranked = candidates
    .map((item) => ({
      item,
      score: scoreTronWebCandidate(item, address, walletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > -100000 ? ranked[0].item : null;
}

async function tryProviderRequest(provider, method, params) {
  if (!provider) return null;

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({
        method,
        params
      });
    } catch {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch {}
  }

  return null;
}

async function readTrxBalanceViaProvider(address, provider) {
  const providers = getProviderCandidates(provider);
  const addressHex = base58ToHexSafe(address);

  if (!addressHex) return null;

  for (const item of providers) {
    const res = await tryProviderRequest(item, 'walletsolidity/getaccount', { address: addressHex });
    const balanceSun = extractAccountBalance(res);
    const trx = normalizeSunToTrx(balanceSun);

    if (trx !== null) {
      return trx;
    }
  }

  for (const item of providers) {
    const res = await tryProviderRequest(item, 'wallet/getaccount', { address: addressHex });
    const balanceSun = extractAccountBalance(res);
    const trx = normalizeSunToTrx(balanceSun);

    if (trx !== null) {
      return trx;
    }
  }

  return null;
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
    } catch {}
  }

  const providerTrx = await readTrxBalanceViaProvider(address, provider);
  if (providerTrx !== null) {
    return providerTrx;
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
    typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
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

function createReadOnlyBalanceReader(address) {
  const tronWeb = getReadOnlyTronWeb();

  try {
    tronWeb.setAddress(address);
  } catch {}

  return tronWeb;
}

export async function refreshAllBalances({ address, walletId, provider } = {}) {
  const state = getWalletState();

  const finalAddress = address || state.address || null;
  const finalWalletId = walletId || state.activeWalletId || state.walletId || null;
  const finalProvider = provider || state.provider || state.tronWeb || null;

  if (!isUsableAddress(finalAddress)) {
    throw new Error('refreshAllBalances: invalid address');
  }

  const injectedTronWeb = pickBestTronWeb(finalProvider, finalAddress, finalWalletId);
  const readOnlyTronWeb = createReadOnlyBalanceReader(finalAddress);

  setWalletState({
    address: finalAddress,
    walletId: finalWalletId,
    activeWalletId: finalWalletId,
    provider: finalProvider,
    tronWeb: injectedTronWeb || null
  });

  let trxBalance = null;
  let fourteenBalance = null;

  let trxError = null;
  let tokenError = null;

  try {
    trxBalance = await readTrxBalance(finalAddress, injectedTronWeb, finalProvider);
  } catch (error) {
    trxError = error;
    console.error('[4TEEN] TRX balance error', error);
  }

  try {
    fourteenBalance = await readTokenBalanceViaContract(finalAddress, readOnlyTronWeb);
  } catch (error) {
    tokenError = error;
    console.error('[4TEEN] token contract error', error);

    try {
      fourteenBalance = await readTokenBalanceViaTrigger(finalAddress, readOnlyTronWeb);
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
