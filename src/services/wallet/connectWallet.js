import { TronWeb } from 'tronweb';
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

function normalizeAddress(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    return value || null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  if (typeof value === 'object') {
    if (typeof value.address === 'string') return value.address;
    if (typeof value.base58 === 'string') return value.base58;
    if (Array.isArray(value.accounts)) return value.accounts[0] || null;
  }

  return null;
}

function resolveAdapterAddress(adapter) {
  return (
    normalizeAddress(adapter?.address) ||
    normalizeAddress(adapter?.tronWeb?.defaultAddress?.base58) ||
    normalizeAddress(adapter?.provider?.defaultAddress?.base58) ||
    normalizeAddress(adapter?.provider?.address) ||
    null
  );
}

function buildTronWeb(address, adapter) {
  const existing =
    adapter?.tronWeb ||
    adapter?.provider?.tronWeb ||
    null;

  if (existing) {
    try {
      if (typeof existing.setAddress === 'function' && address) {
        existing.setAddress(address);
      }
    } catch (_) {
      // ignore
    }

    return existing;
  }

  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });

  if (address && typeof tronWeb.setAddress === 'function') {
    tronWeb.setAddress(address);
  }

  return tronWeb;
}

async function waitForAdapterAddress(adapter, attempts = 18, delay = 250) {
  for (let i = 0; i < attempts; i += 1) {
    const address = resolveAdapterAddress(adapter);

    console.log('[4TEEN] waitForAdapterAddress attempt', {
      attempt: i + 1,
      adapter: adapter?.name,
      address
    });

    if (address) return address;
    await sleep(delay);
  }

  return null;
}

function isWalletConnect(adapter) {
  return adapter?.name === 'WalletConnect';
}

function canAttemptConnect(adapter) {
  if (!adapter) return false;
  if (isWalletConnect(adapter)) return true;

  return adapter.readyState === 'Found';
}

export async function connectWallet(appkit, walletId = null) {
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
    const adapter = appkit.selectAdapter(walletId);

    if (!adapter) {
      throw new Error('Selected wallet is not available');
    }

    if (!canAttemptConnect(adapter)) {
      throw new Error(`${adapter.name} is not available in this browser`);
    }

    setWalletState({
      connecting: true,
      connected: false,
      error: null,
      selectedWalletId: adapter.name,
      walletPickerOpen: false
    });

    showNeutralNotice(`Connecting ${adapter.name}...`);

    await adapter.connect();

    const address = await waitForAdapterAddress(adapter, 18, 250);

    if (!address) {
      throw new Error('Wallet connected but address not resolved');
    }

    const tronWeb = buildTronWeb(address, adapter);

    setWalletState({
      connecting: false,
      connected: true,
      walletId: adapter.name,
      walletName: adapter.name,
      address,
      shortAddress: shortenAddress(address),
      adapter,
      provider: adapter,
      tronWeb,
      error: null
    });

    await refreshAllBalances();

    showSuccessNotice('Wallet connected');

    return {
      ok: true,
      address,
      walletId: adapter.name,
      walletName: adapter.name
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
      adapter: null,
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
