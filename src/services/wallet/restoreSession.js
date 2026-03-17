import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

let restoreInFlight = false;
let lastRestoreAt = 0;
let lastRestoredSignature = null;

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getNavigatorSafe() {
  return typeof navigator !== 'undefined' ? navigator : null;
}

function getLocationHref() {
  const win = getWindowSafe();
  return win?.location?.href || '';
}

function getUserAgent() {
  const nav = getNavigatorSafe();
  return nav?.userAgent || '';
}

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
}

function resolveAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
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

function detectPreferredWalletId() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());

  if (ua.includes('okex') || ua.includes('okx')) return 'OKX Wallet';
  if (ua.includes('tokenpocket')) return 'TokenPocket';
  if (ua.includes('bitkeep') || ua.includes('bitget')) return 'Bitget Wallet';
  if (ua.includes('bnc/') || ua.includes('binance')) return 'Binance Wallet';
  if (ua.includes('tronlink') || href.includes('utm_source=tronlink')) return 'TronLink';
  if (href.includes('trust_ios_browser') || ua.includes('trust')) return 'Trust';

  return null;
}

function resolveAddressFromAdapter(adapter) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.adapter?.address,
    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.tronWeb?.defaultAddress?.base58
  ];

  return candidates.find(isUsableAddress) || null;
}

function resolveProviderFromAdapter(appkit, adapter) {
  const provider = (
    adapter?.provider ||
    adapter?.wallet ||
    appkit?.getWalletProvider?.() ||
    adapter?.tronWeb ||
    null
  );

  return provider || null;
}

function scoreAdapter(adapter, preferredWalletId) {
  const id = resolveAdapterId(adapter);
  const name = resolveAdapterName(adapter);
  const readyState = resolveAdapterReadyState(adapter);
  const connected = !!adapter?.connected;

  let score = 0;

  if (connected) score += 1000;
  if (readyState === 'Found') score += 200;
  if (readyState === 'Installed') score += 180;
  if (readyState === 'Loadable') score += 120;
  if (readyState === 'Loading') score += 10;

  if (preferredWalletId && (id === preferredWalletId || name === preferredWalletId)) {
    score += 10000;
  }

  if (
    preferredWalletId &&
    preferredWalletId !== 'TronLink' &&
    (id === 'TronLink' || name === 'TronLink')
  ) {
    score -= 4000;
  }

  return score;
}

function pickBestAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  const preferredWalletId = detectPreferredWalletId();

  if (!adapters.length) return null;

  const ranked = adapters
    .map((adapter) => ({
      adapter,
      score: scoreAdapter(adapter, preferredWalletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.adapter || null;
}

function buildRestoreSignature(adapter, address) {
  return `${resolveAdapterName(adapter)}::${address || 'null'}::${detectPreferredWalletId() || 'none'}`;
}

export async function restoreSession(appkit) {
  const now = Date.now();

  if (!appkit) {
    return false;
  }

  if (restoreInFlight) {
    return false;
  }

  if (now - lastRestoreAt < 1200) {
    return false;
  }

  restoreInFlight = true;
  lastRestoreAt = now;

  try {
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

    const selectedAdapter = pickBestAdapter(appkit);
    if (!selectedAdapter) {
      return false;
    }

    const provider = resolveProviderFromAdapter(appkit, selectedAdapter);
    const address = resolveAddressFromAdapter(selectedAdapter);

    if (!isUsableAddress(address)) {
      return false;
    }

    const signature = buildRestoreSignature(selectedAdapter, address);
    if (lastRestoredSignature === signature) {
      return true;
    }

    const walletId = resolveAdapterId(selectedAdapter);
    const walletName = resolveAdapterName(selectedAdapter);

    setWalletState({
      initialized: true,
      connecting: false,
      connected: true,

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

    lastRestoredSignature = signature;

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
  } finally {
    restoreInFlight = false;
  }
}
