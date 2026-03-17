import { TronWeb } from 'tronweb';
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

let lastRestoreKey = null;

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

function getBrowserHint() {
  if (typeof window === 'undefined') return '';

  const href = String(window.location.href || '').toLowerCase();
  const ua = String(window.navigator?.userAgent || '').toLowerCase();

  if (href.includes('utm_source=okx') || ua.includes('okex/') || ua.includes('okapp/') || ua.includes('okx')) {
    return 'OKX Wallet';
  }

  if (href.includes('utm_source=binance') || ua.includes('bnc/') || ua.includes('binance')) {
    return 'Binance Wallet';
  }

  if (href.includes('utm_source=tronlink') || ua.includes('tronlink')) {
    return 'TronLink';
  }

  if (href.includes('utm_source=trust') || href.includes('trust_ios_browser') || ua.includes('trustwallet') || ua.includes('trust')) {
    return 'Trust';
  }

  if (href.includes('utm_source=metamask') || ua.includes('metamask')) {
    return 'MetaMask';
  }

  if (ua.includes('tokenpocket') || ua.includes('tp/')) {
    return 'TokenPocket';
  }

  return '';
}

function getWalletPriority(name, browserHint, activeWalletId) {
  if (activeWalletId && name === activeWalletId) return 1000;
  if (browserHint && name === browserHint) return 900;

  const base = {
    'OKX Wallet': 800,
    'Binance Wallet': 790,
    'TronLink': 780,
    'Trust': 770,
    'TokenPocket': 760,
    'MetaMask': 750,
    'WalletConnect': 100,
    'Bitget Wallet': 740
  };

  return base[name] || 1;
}

function buildTronWeb(address, adapter) {
  const existing =
    adapter?.tronWeb ||
    adapter?.provider?.tronWeb ||
    (typeof window !== 'undefined' ? window?.tronWeb || null : null);

  if (existing) {
    try {
      if (typeof existing.setAddress === 'function' && address) {
        existing.setAddress(address);
      }
    } catch (_) {}

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

function pickActiveAdapter(adapters, activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => !!adapter?.connected);

  if (connectedAdapters.length === 0) {
    return null;
  }

  const browserHint = getBrowserHint();

  const sorted = [...connectedAdapters].sort((a, b) => {
    return getWalletPriority(b?.name, browserHint, activeWalletId) -
      getWalletPriority(a?.name, browserHint, activeWalletId);
  });

  return sorted[0] || null;
}

export async function restoreSession(appkit) {
  if (!appkit) {
    console.warn('[4TEEN] restoreSession skipped: wallet kit is missing');
    return false;
  }

  const state = getWalletState();
  const adapters = Array.isArray(appkit.adapters) ? appkit.adapters : [];
  const activeAdapter = pickActiveAdapter(adapters, state.activeWalletId);

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
    lastRestoreKey = null;
    return false;
  }

  const walletId = activeAdapter?.name || state.activeWalletId || 'Wallet';
  const restoreKey = `${walletId}:${address}`;

  if (lastRestoreKey === restoreKey && state.connected && state.address === address) {
    return true;
  }

  lastRestoreKey = restoreKey;

  appkit.connectedAdapter = activeAdapter || null;

  const tronWeb = buildTronWeb(address, activeAdapter);

  setWalletState({
    connected: true,
    connecting: false,
    walletId,
    walletName: walletId,
    activeWalletId: walletId,
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
