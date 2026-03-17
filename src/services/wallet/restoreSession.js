import { TronWeb } from 'tronweb';
import { setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

function normalizeAddress(value) {
  if (!value) return null;

  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || null;

  if (typeof value === 'object') {
    if (typeof value.address === 'string') return value.address;
    if (typeof value.base58 === 'string') return value.base58;
    if (Array.isArray(value.accounts)) return value.accounts[0] || null;
  }

  return null;
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

function resolveAddressFromAdapter(adapter) {
  return (
    normalizeAddress(adapter?.address) ||
    normalizeAddress(adapter?.tronWeb?.defaultAddress?.base58) ||
    normalizeAddress(adapter?.provider?.defaultAddress?.base58) ||
    normalizeAddress(adapter?.provider?.address) ||
    null
  );
}

export async function restoreSession(appkit) {
  if (!appkit) {
    console.warn('[4TEEN] restoreSession skipped: wallet kit is missing');
    return false;
  }

  const adapters = Array.isArray(appkit.adapters) ? appkit.adapters : [];

  let activeAdapter = adapters.find((adapter) => adapter?.connected && resolveAddressFromAdapter(adapter));

  if (!activeAdapter && typeof window !== 'undefined' && window?.tronWeb?.defaultAddress?.base58) {
    activeAdapter = adapters.find((adapter) => adapter?.name === 'TronLink') || null;
  }

  const address =
    resolveAddressFromAdapter(activeAdapter) ||
    (typeof window !== 'undefined' ? window?.tronWeb?.defaultAddress?.base58 || null : null);

  console.log('[4TEEN] restoreSession check', {
    hasAppkit: !!appkit,
    adapters: adapters.map((adapter) => ({
      name: adapter?.name,
      connected: !!adapter?.connected,
      readyState: adapter?.readyState || 'Unknown'
    })),
    address
  });

  if (!address) {
    return false;
  }

  appkit.connectedAdapter = activeAdapter || null;

  const tronWeb = buildTronWeb(address, activeAdapter);

  setWalletState({
    connected: true,
    connecting: false,
    walletId: activeAdapter?.name || 'TronLink',
    walletName: activeAdapter?.name || 'Wallet',
    address,
    shortAddress: shortenAddress(address),
    provider: activeAdapter || null,
    adapter: activeAdapter || null,
    tronWeb,
    error: null
  });

  try {
    await refreshAllBalances();
  } catch (error) {
    console.error('[4TEEN] restoreSession refreshAllBalances failed', error);
  }

  return true;
}
