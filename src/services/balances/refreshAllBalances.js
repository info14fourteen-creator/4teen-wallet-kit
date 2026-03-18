import { TronWeb } from 'tronweb';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const TRONGRID_FULL_HOST = 'https://api.trongrid.io';

let refreshInFlight = null;
let lastRefreshAt = 0;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error) {
  const message = String(error?.message || '').toLowerCase();
  return message.includes('429') || message.includes('too many requests');
}

function getReadOnlyTronWeb(address = null) {
  const tronWeb = new TronWeb({
    fullHost: TRONGRID_FULL_HOST
  });

  if (address && isUsableAddress(address)) {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}
  }

  return tronWeb;
}

function normalizeSunToTrx(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return null;
  return Number((num / 1_000_000).toFixed(6));
}

function normalizeTokenUnits(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return null;
  return Number((num / 1_000_000).toFixed(6));
}

function decodeHexBalance(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') return null;

  try {
    return parseInt(hexValue, 16);
  } catch (_) {
    return null;
  }
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
  if (provider === win?.BinanceChain || provider === win?.BinanceChain?.tron) return 'Binance Wallet';
  if (provider === win?.binancew3w || provider === win?.binancew3w?.tron) return 'Binance Wallet';
  if (provider === win?.ethereum || provider === win?.ethereum?.tronWeb) return 'MetaMask';

  if (provider?.isTronLink || provider?.tronWeb?.isTronLink) return 'TronLink';
  if (provider?.isOkxWallet || provider?.isOKExWallet) return 'OKX Wallet';
  if (provider?.isTokenPocket) return 'TokenPocket';
  if (provider?.isBitKeep || provider?.isBitget) return 'Bitget Wallet';
  if (provider?.isTrust || provider?.isTrustWallet) return 'Trust';
  if (provider?.isMetaMask) return 'MetaMask';
  if (provider?.isBinance || provider?.chain === 'tron') return 'Binance Wallet';

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
    win?.tronLink,

    win?.okxwallet?.tronWeb,
    win?.okxwallet,
    win?.okxWallet?.tronWeb,
    win?.okxWallet,

    win?.BinanceChain?.tronWeb,
    win?.BinanceChain?.tron,
    win?.BinanceChain,
    win?.binancew3w?.tron,
    win?.binancew3w,

    win?.tp?.tronWeb,
    win?.tp,
    win?.tokenPocket?.tronWeb,
    win?.tokenPocket,

    win?.bitkeep?.tronWeb,
    win?.bitkeep,
    win?.bitget?.tronWeb,
    win?.bitget,

    win?.trustwallet?.tronWeb,
    win?.trustwallet,
    win?.trustWallet?.tronWeb,
    win?.trustWallet,

    win?.ethereum?.tronWeb,
    win?.ethereum,

    win?.tronWeb
  ].filter(Boolean);
}

function isValidTronWeb(tronWeb) {
  return !!(
    tronWeb &&
    typeof tronWeb?.trx?.getBalance === 'function'
  );
}

function getTronWebAddress(tronWeb) {
  return (
    tronWeb?.defaultAddress?.base58 ||
    tronWeb?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function scoreTronWebCandidate(tronWeb, address, walletId) {
  if (!isValidTronWeb(tronWeb)) return -100000;

  const currentAddress = getTronWebAddress(tronWeb);
  const providerName = getProviderName(tronWeb);
  const targetWalletId = String(walletId || '').trim().toLowerCase();

  let score = 0;

  if (currentAddress && currentAddress === address) score += 30000;
  if (currentAddress && currentAddress !== address) score -= 25000;

  if (providerName) score += 100;

  if (targetWalletId && providerName && providerName.toLowerCase() === targetWalletId) {
    score += 12000;
  }

  if (targetWalletId && targetWalletId !== 'tronlink' && providerName === 'TronLink') {
    score -= 40000;
  }

  if (targetWalletId && targetWalletId !== 'okx wallet' && providerName === 'OKX Wallet') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'binance wallet' && providerName === 'Binance Wallet') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'tokenpocket' && providerName === 'TokenPocket') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'bitget wallet' && providerName === 'Bitget Wallet') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'trust' && providerName === 'Trust') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'metamask' && providerName === 'MetaMask') {
    score -= 12000;
  }

  return score;
}

function pickBestInjectedTronWeb(provider, address, walletId) {
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

async function readTrxBalance(address) {
  if (!isUsableAddress(address)) {
    throw new Error('TRX balance: invalid address');
  }

  const tronWeb = getReadOnlyTronWeb(address);
  const balanceSun = await tronWeb.trx.getBalance(address);
  const trx = normalizeSunToTrx(balanceSun);

  if (trx === null) {
    throw new Error('TRX balance: invalid result');
  }

  return trx;
}

async function readTokenBalanceViaContract(address) {
  if (!isUsableAddress(address)) {
    throw new Error('Token balance: invalid address');
  }

  const tronWeb = getReadOnlyTronWeb(address);
  const contract = await tronWeb.contract().at(FOURTEEN_TOKEN_ADDRESS);
  const raw = await contract.balanceOf(address).call();

  const value =
    typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
      ? raw.toString()
      : String(raw);

  const balance = normalizeTokenUnits(value);

  if (balance === null) {
    throw new Error('Token balance: invalid result');
  }

  return balance;
}

async function readTokenBalanceViaTrigger(address) {
  if (!isUsableAddress(address)) {
    throw new Error('Token fallback: invalid address');
  }

  const tronWeb = getReadOnlyTronWeb(address);
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
  const balance = normalizeTokenUnits(raw);

  if (balance === null) {
    throw new Error('Token fallback: decode failed');
  }

  return balance;
}

async function withRetry(fn, retries = 2, delayMs = 500) {
  let lastError = null;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (!isRateLimitError(error) || i === retries) {
        throw error;
      }

      await sleep(delayMs * (i + 1));
    }
  }

  throw lastError;
}

export async function refreshAllBalances({ address, walletId, provider, force = false } = {}) {
  const now = Date.now();

  if (!force && refreshInFlight) {
    return refreshInFlight;
  }

  if (!force && now - lastRefreshAt < 1200) {
    return {
      address: getWalletState().address || null,
      walletId: getWalletState().activeWalletId || getWalletState().walletId || null,
      trxBalance: getWalletState().trxBalance,
      fourteenBalance: getWalletState().fourteenBalance,
      warnings: {
        trx: null,
        token: null
      }
    };
  }

  refreshInFlight = (async () => {
    const state = getWalletState();

    const finalAddress =
      address ||
      state.address ||
      state.account?.address ||
      null;

    const finalWalletId =
      walletId ||
      state.activeWalletId ||
      state.walletId ||
      state.wallet?.activeId ||
      state.wallet?.id ||
      null;

    const finalProvider =
      provider ||
      state.provider ||
      state.tronWeb ||
      state.runtime?.provider ||
      state.runtime?.tronWeb ||
      null;

    if (!isUsableAddress(finalAddress)) {
      throw new Error('refreshAllBalances: invalid address');
    }

    const injectedTronWeb = pickBestInjectedTronWeb(
      finalProvider,
      finalAddress,
      finalWalletId
    );

    const previousTrxBalance = state.trxBalance ?? state.balances?.trx ?? null;
    const previousFourteenBalance = state.fourteenBalance ?? state.balances?.fourteen ?? null;

    setWalletState({
      address: finalAddress,
      walletId: finalWalletId,
      activeWalletId: finalWalletId,
      provider: finalProvider,
      tronWeb: injectedTronWeb || null
    });

    let trxBalance = previousTrxBalance;
    let fourteenBalance = previousFourteenBalance;
    let trxError = null;
    let tokenError = null;

    try {
      trxBalance = await withRetry(() => readTrxBalance(finalAddress), 1, 350);
    } catch (error) {
      trxError = error;
      console.error('[4TEEN] TRX balance error', error);
    }

    try {
      fourteenBalance = await withRetry(() => readTokenBalanceViaContract(finalAddress), 2, 700);
    } catch (error) {
      tokenError = error;
      console.error('[4TEEN] token contract error', error);

      try {
        fourteenBalance = await withRetry(() => readTokenBalanceViaTrigger(finalAddress), 2, 900);
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

    lastRefreshAt = Date.now();

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
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}
