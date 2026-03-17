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

function getBrowserHint() {
  if (typeof window === 'undefined') return '';

  const href = String(window.location.href || '').toLowerCase();
  const ua = String(window.navigator?.userAgent || '').toLowerCase();

  if (href.includes('utm_source=tronlink') || ua.includes('tronlink')) return 'TronLink';
  if (href.includes('utm_source=trust') || href.includes('utm_source=trust_ios_browser') || ua.includes('trust')) return 'Trust';
  if (href.includes('utm_source=okx') || ua.includes('okx')) return 'OKX Wallet';
  if (href.includes('utm_source=binance') || ua.includes('binance')) return 'Binance Wallet';
  if (href.includes('utm_source=metamask') || ua.includes('metamask')) return 'MetaMask';

  return '';
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

function pickActiveAdapter(adapters) {
  const connectedAdapters = adapters.filter((adapter) => !!adapter?.connected);

  if (connectedAdapters.length === 0) {
    return null;
  }

  if (connectedAdapters.length === 1) {
    return connectedAdapters[0];
  }

  const browserHint = getBrowserHint();
  const hinted = connectedAdapters.find((adapter) => adapter?.name === browserHint);
  if (hinted) return hinted;

  return connectedAdapters[0];
}

export async function restoreSession(appkit) {
  if (!appkit) {
    console.warn('[4TEEN] restoreSession skipped: wallet kit is missing');
    return false;
  }

  const adapters = Array.isArray(appkit.adapters) ? appkit.adapters : [];
  const activeAdapter = pickActiveAdapter(adapters);

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
