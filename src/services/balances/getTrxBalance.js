import { TronWeb } from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';

function fromSun(value) {
  return Number(value || 0) / 1_000_000;
}

function toFixedBalance(value) {
  return Number(fromSun(value).toFixed(6));
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function base58ToHex(address) {
  try {
    return TronWeb.address.toHex(address);
  } catch {
    return null;
  }
}

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getProviderName(provider) {
  const win = getWindowSafe();

  if (!provider) return '';

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

function getTronWebAddress(providerLike) {
  return (
    providerLike?.defaultAddress?.base58 ||
    providerLike?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function resolveProviders(state) {
  const win = getWindowSafe();
  const walletId = String(state?.activeWalletId || state?.walletId || '').trim().toLowerCase();

  const list = [
    state?.provider,
    state?.tronWeb,
    state?.provider?.tronWeb,
    state?.provider?.provider,
    state?.provider?.provider?.tronWeb,
    win?.okxwallet,
    win?.okxwallet?.tronWeb,
    win?.okxWallet,
    win?.okxWallet?.tronWeb,
    win?.tp,
    win?.tp?.tronWeb,
    win?.tokenPocket,
    win?.tokenPocket?.tronWeb,
    win?.bitkeep,
    win?.bitkeep?.tronWeb,
    win?.bitget,
    win?.bitget?.tronWeb,
    win?.trustwallet,
    win?.trustwallet?.tronWeb,
    win?.trustWallet,
    win?.trustWallet?.tronWeb,
    win?.BinanceChain,
    win?.ethereum,
    win?.tronLink,
    win?.tronLink?.tronWeb,
    win?.tronWeb
  ].filter(Boolean);

  const unique = [];
  for (const item of list) {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  }

  const scored = unique
    .map((item) => {
      const name = getProviderName(item);
      const currentAddress = getTronWebAddress(item);

      let score = 0;

      if (item?.trx?.getBalance || item?.tronWeb?.trx?.getBalance) score += 100;
      if (currentAddress) score += 50;

      if (walletId && name && name.toLowerCase() === walletId) score += 5000;

      if (walletId && walletId !== 'tronlink' && name === 'TronLink') score -= 12000;
      if (walletId && walletId !== 'okx wallet' && name === 'OKX Wallet') score -= 4000;
      if (walletId && walletId !== 'tokenpocket' && name === 'TokenPocket') score -= 4000;
      if (walletId && walletId !== 'bitget wallet' && name === 'Bitget Wallet') score -= 4000;
      if (walletId && walletId !== 'binance wallet' && name === 'Binance Wallet') score -= 4000;
      if (walletId && walletId !== 'metamask' && name === 'MetaMask') score -= 4000;
      if (walletId && walletId !== 'trust' && name === 'Trust') score -= 4000;

      return { item, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.item);
}

function extractBalanceFromAccountResponse(response) {
  if (!response) return null;

  if (typeof response.balance === 'number') {
    return response.balance;
  }

  if (typeof response?.data?.balance === 'number') {
    return response.data.balance;
  }

  if (typeof response?.account?.balance === 'number') {
    return response.account.balance;
  }

  if (typeof response?.result?.balance === 'number') {
    return response.result.balance;
  }

  return null;
}

async function tryTronWebGetBalance(providerLike, address) {
  const tronWeb =
    providerLike?.trx?.getBalance
      ? providerLike
      : providerLike?.tronWeb?.trx?.getBalance
        ? providerLike.tronWeb
        : null;

  if (!tronWeb?.trx?.getBalance) {
    return null;
  }

  const raw = await tronWeb.trx.getBalance(address);
  if (typeof raw === 'number') {
    return raw;
  }

  return null;
}

async function tryProviderRequest(provider, method, params) {
  if (!provider) {
    return null;
  }

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

async function tryAccountRequests(provider, address) {
  const hex = base58ToHex(address);
  if (!hex) return null;

  const requests = [
    {
      method: 'walletsolidity/getaccount',
      params: { address: hex }
    },
    {
      method: 'wallet/getaccount',
      params: { address: hex }
    }
  ];

  for (const item of requests) {
    const response = await tryProviderRequest(provider, item.method, item.params);
    const balance = extractBalanceFromAccountResponse(response);

    if (typeof balance === 'number') {
      return balance;
    }
  }

  return null;
}

export async function getTrxBalance(addressOverride = null) {
  const state = getWalletState();
  const address = addressOverride || state.address;

  if (!isUsableAddress(address)) {
    return 0;
  }

  const providers = resolveProviders(state);

  for (const provider of providers) {
    try {
      const raw = await tryTronWebGetBalance(provider, address);
      if (typeof raw === 'number') {
        return toFixedBalance(raw);
      }
    } catch {}
  }

  for (const provider of providers) {
    try {
      const raw = await tryAccountRequests(provider, address);
      if (typeof raw === 'number') {
        return toFixedBalance(raw);
      }
    } catch {}
  }

  try {
    const tronWeb = getReadOnlyTronWeb();
    const raw = await tronWeb.trx.getBalance(address);
    if (typeof raw === 'number') {
      return toFixedBalance(raw);
    }
  } catch {}

  throw new Error('TRX balance: unable to resolve balance');
}
