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
  } catch (_) {
    return null;
  }
}

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

function resolveProviders(state) {
  const list = [
    state?.provider,
    state?.tronWeb,
    state?.provider?.tronWeb,
    typeof window !== 'undefined' ? window.tronWeb : null
  ];

  return list.filter(Boolean);
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
  if (!provider || typeof provider.request !== 'function') {
    return null;
  }

  try {
    return await provider.request({
      method,
      ...params
    });
  } catch (_) {
    return null;
  }
}

async function tryAccountRequests(provider, address) {
  const hex = base58ToHex(address);
  if (!hex) return null;

  const requests = [
    {
      method: 'walletsolidity/getaccount',
      params: { params: { address: hex } }
    },
    {
      method: 'wallet/getaccount',
      params: { params: { address: hex } }
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
    } catch (_) {}
  }

  for (const provider of providers) {
    try {
      const raw = await tryAccountRequests(provider, address);
      if (typeof raw === 'number') {
        return toFixedBalance(raw);
      }
    } catch (_) {}
  }

  try {
    const tronWeb = getReadOnlyTronWeb();
    const raw = await tronWeb.trx.getBalance(address);
    if (typeof raw === 'number') {
      return toFixedBalance(raw);
    }
  } catch (_) {}

  throw new Error('TRX balance: unable to resolve balance');
}
