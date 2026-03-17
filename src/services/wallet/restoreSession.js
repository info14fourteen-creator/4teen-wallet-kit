import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function resolveAdapters(appkit) {
  const adapters = appkit?.getConnectors?.() || appkit?.connectors || appkit?.adapters || [];
  return Array.isArray(adapters) ? adapters : [];
}

function resolveAdapterId(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.id ||
    adapter?.key ||
    null
  );
}

function resolveAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function resolveAdapterReadyState(adapter) {
  return String(adapter?.readyState || '');
}

function getUserAgent() {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent || '';
}

function detectPreferredWalletId() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(typeof window !== 'undefined' ? window.location?.href : '');

  if (ua.includes('okex') || ua.includes('okx')) return 'OKX Wallet';
  if (ua.includes('tokenpocket')) return 'TokenPocket';
  if (ua.includes('bitkeep') || ua.includes('bitget')) return 'Bitget Wallet';
  if (ua.includes('bnc/') || ua.includes('binance')) return 'Binance Wallet';
  if (ua.includes('tronlink') || href.includes('utm_source=tronlink')) return 'TronLink';
  if (href.includes('trust_ios_browser') || ua.includes('trust')) return 'Trust';

  return null;
}

function resolveAddressFromAdapter(adapter) {
  return (
    adapter?.address ||
    adapter?.publicKey ||
    adapter?.account?.address ||
    adapter?.adapter?.address ||
    null
  );
}

function resolveAddressFromProvider(provider) {
  return (
    provider?.address ||
    provider?.selectedAddress ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function resolveProviderFromAdapter(appkit, adapter) {
  return (
    adapter?.provider ||
    appkit?.getWalletProvider?.() ||
    adapter?.tronWeb ||
    (typeof window !== 'undefined' ? window.tronWeb : null) ||
    null
  );
}

function scoreAdapter(adapter, preferredWalletId, activeWalletId) {
  const id = resolveAdapterId(adapter);
  const name = resolveAdapterName(adapter);
  const readyState = resolveAdapterReadyState(adapter);
  const connected = !!adapter?.connected;

  let score = 0;

  if (connected) score += 1000;
  if (readyState === 'Found') score += 100;
  if (readyState === 'Installed') score += 90;
  if (readyState === 'Loadable') score += 70;
  if (readyState === 'Loading') score += 15;

  if (activeWalletId && (id === activeWalletId || name === activeWalletId)) {
    score += 10000;
  }

  if (preferredWalletId && (id === preferredWalletId || name === preferredWalletId)) {
    score += 5000;
  }

  if (preferredWalletId && preferredWalletId !== 'TronLink' && (id === 'TronLink' || name === 'TronLink')) {
    score -= 500;
  }

  return score;
}

function pickActiveAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  const preferredWalletId = detectPreferredWalletId();
  const state = getWalletState();
  const activeWalletId = state.activeWalletId || state.walletId || null;

  if (!adapters.length) {
    return null;
  }

  const ranked = adapters
    .map((adapter) => ({
      adapter,
      score: scoreAdapter(adapter, preferredWalletId, activeWalletId)
    }))
    .sort((a, b) => b.score - a.score);

  const winner = ranked[0]?.adapter || null;
  return winner;
}

export async function restoreSession(appkit) {
  if (!appkit) {
    console.warn('[4TEEN] restoreSession skipped: appkit is missing');
    return false;
  }

  const adapters = resolveAdapters(appkit);

  console.log('[4TEEN] restoreSession check', {
    hasAppkit: !!appkit,
    adapters: adapters.map((adapter) => ({
      name: resolveAdapterName(adapter),
      connected: !!adapter?.connected,
      readyState: resolveAdapterReadyState(adapter)
    })),
    address: getWalletState().address || null
  });

  const activeAdapter = pickActiveAdapter(appkit);
  if (!activeAdapter) {
    return false;
  }

  const provider = resolveProviderFromAdapter(appkit, activeAdapter);
  const addressCandidates = [
    resolveAddressFromAdapter(activeAdapter),
    resolveAddressFromProvider(provider),
    appkit?.getAccount?.()?.address || null,
    typeof window !== 'undefined' ? window.tronWeb?.defaultAddress?.base58 : null
  ];

  const address = addressCandidates.find(isUsableAddress) || null;

  if (!address) {
    return false;
  }

  const walletId = resolveAdapterId(activeAdapter);
  const walletName = resolveAdapterName(activeAdapter);

  setWalletState({
    connected: true,
    connecting: false,

    walletId,
    walletName,
    activeWalletId: walletId,
    activeWalletName: walletName,

    address,
    shortAddress: shortenAddress(address),

    provider,
    tronWeb: provider?.tronWeb || provider || null,

    error: null
  });

  try {
    await refreshAllBalances({
      address,
      walletId,
      provider
    });
  } catch (error) {
    console.error('[4TEEN] restoreSession refreshAllBalances failed', error);
  }

  return true;
}
