import { setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';
import {
  showErrorNotice,
  showNeutralNotice,
  showSuccessNotice
} from '../../ui/noticeCenter.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeAccountsPayload(accounts) {
  if (Array.isArray(accounts)) {
    return accounts[0] || null;
  }

  if (typeof accounts === 'string') {
    return accounts || null;
  }

  if (accounts && typeof accounts === 'object') {
    if (Array.isArray(accounts.accounts)) {
      return accounts.accounts[0] || null;
    }

    if (typeof accounts.address === 'string') {
      return accounts.address;
    }
  }

  return null;
}

function tryReadAddressFromProvider(provider) {
  if (!provider) return null;

  return (
    provider?.address ||
    provider?.selectedAddress ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    normalizeAccountsPayload(provider?.accounts) ||
    null
  );
}

async function tryRequestAddress(provider) {
  if (!provider || typeof provider.request !== 'function') {
    return null;
  }

  const methods = [
    'tron_requestAccounts',
    'tron_accounts',
    'eth_requestAccounts',
    'eth_accounts'
  ];

  for (const method of methods) {
    try {
      const result = await provider.request({ method });
      const address = normalizeAccountsPayload(result);
      if (address) return address;
    } catch (_) {
      // continue
    }
  }

  return null;
}

function readWindowFallbackAddress() {
  if (typeof window === 'undefined') return null;

  return (
    window?.tronWeb?.defaultAddress?.base58 ||
    window?.tronLink?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function resolveProvider(appkit) {
  try {
    return appkit?.getWalletProvider?.() || null;
  } catch (_) {
    return null;
  }
}

function resolveAccount(appkit) {
  try {
    return appkit?.getAccount?.() || null;
  } catch (_) {
    return null;
  }
}

function resolveWalletName(appkit, provider) {
  const account = resolveAccount(appkit);

  return (
    account?.embeddedWalletInfo?.name ||
    account?.walletInfo?.name ||
    account?.connector?.name ||
    provider?.name ||
    'Wallet'
  );
}

function resolveWalletId(appkit, provider) {
  const account = resolveAccount(appkit);

  return (
    account?.embeddedWalletInfo?.type ||
    account?.walletInfo?.rdns ||
    account?.walletInfo?.id ||
    account?.connector?.id ||
    provider?.rdns ||
    provider?.id ||
    null
  );
}

async function resolveAddressDeep(appkit, attempts = 12, delay = 400) {
  for (let i = 0; i < attempts; i += 1) {
    const account = resolveAccount(appkit);
    const provider = resolveProvider(appkit);

    const accountAddress = account?.address || null;
    const providerAddress = tryReadAddressFromProvider(provider);
    const requestedAddress = providerAddress ? null : await tryRequestAddress(provider);
    const windowAddress = readWindowFallbackAddress();

    const resolved =
      accountAddress ||
      providerAddress ||
      requestedAddress ||
      windowAddress ||
      null;

    console.log('[4TEEN] resolveAddressDeep attempt', {
      attempt: i + 1,
      accountAddress,
      providerAddress,
      requestedAddress,
      windowAddress,
      resolved
    });

    if (resolved) {
      return {
        address: resolved,
        provider
      };
    }

    await sleep(delay);
  }

  return {
    address: null,
    provider: resolveProvider(appkit)
  };
}

export async function connectWallet(appkit) {
  if (!appkit) {
    const error = new Error('Wallet module is not ready');

    setWalletState({
      connecting: false,
      connected: false,
      error: error.message
    });

    showErrorNotice(error.message);

    return {
      ok: false,
      error
    };
  }

  try {
    setWalletState({
      connecting: true,
      connected: false,
      error: null
    });

    showNeutralNotice('Waiting for wallet connection...');

    await appkit.open();

    const { address, provider } = await resolveAddressDeep(appkit, 14, 450);
    const walletName = resolveWalletName(appkit, provider);
    const walletId = resolveWalletId(appkit, provider);

    if (!address) {
      throw new Error('Wallet connected but address not resolved');
    }

    setWalletState({
      connecting: false,
      connected: true,
      walletId,
      walletName,
      address,
      shortAddress: shortenAddress(address),
      provider,
      tronWeb: provider?.tronWeb || null,
      error: null
    });

    await refreshAllBalances();

    showSuccessNotice('Wallet connected');

    return {
      ok: true,
      address,
      walletId,
      walletName
    };
  } catch (error) {
    console.error('[4TEEN] connectWallet failed', error);

    setWalletState({
      connecting: false,
      connected: false,
      walletId: null,
      walletName: null,
      address: null,
      shortAddress: null,
      provider: null,
      tronWeb: null,
      trxBalance: null,
      fourteenBalance: null,
      error: error?.message || 'Wallet connection failed'
    });

    showErrorNotice(error?.message || 'Wallet connection failed');

    return {
      ok: false,
      error
    };
  }
}
