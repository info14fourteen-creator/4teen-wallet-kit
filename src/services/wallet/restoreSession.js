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
  return String(win?.location?.href || '');
}

function getUserAgent() {
  const nav = getNavigatorSafe();
  return String(nav?.userAgent || '');
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

function isOkxBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());
  const win = getWindowSafe();

  return (
    href.includes('utm_source=okx') ||
    ua.includes('okex/') ||
    ua.includes('okapp/') ||
    ua.includes('okx') ||
    !!win?.okxwallet ||
    !!win?.okxWallet
  );
}

function isTokenPocketBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());
  const win = getWindowSafe();

  return (
    href.includes('utm_source=tokenpocket') ||
    ua.includes('tokenpocket') ||
    ua.includes('tp/') ||
    !!win?.tp ||
    !!win?.tokenPocket
  );
}

function isBitgetBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());
  const win = getWindowSafe();

  return (
    href.includes('utm_source=bitget') ||
    href.includes('utm_source=bitkeep') ||
    ua.includes('bitkeep') ||
    ua.includes('bitget') ||
    !!win?.bitkeep ||
    !!win?.bitget
  );
}

function isBinanceBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance')
  );
}

function isTronLinkBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());
  const win = getWindowSafe();

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

function isTrustBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());
  const win = getWindowSafe();

  return (
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet') ||
    ua.includes('trust') ||
    !!win?.trustwallet ||
    !!win?.trustWallet
  );
}

function isMetaMaskBrowser() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(getLocationHref());

  return href.includes('utm_source=metamask') || ua.includes('metamask');
}

function detectPreferredWalletId() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  return null;
}

function isAdapterAllowedForCurrentBrowser(adapter) {
  const preferredWalletId = detectPreferredWalletId();
  const adapterId = resolveAdapterId(adapter);
  const adapterName = resolveAdapterName(adapter);

  if (!preferredWalletId) return true;

  if (preferredWalletId === 'OKX Wallet') {
    return adapterId === 'OKX Wallet' || adapterName === 'OKX Wallet';
  }

  if (preferredWalletId === 'Binance Wallet') {
    return adapterId === 'Binance Wallet' || adapterName === 'Binance Wallet';
  }

  if (preferredWalletId === 'TronLink') {
    return adapterId === 'TronLink' || adapterName === 'TronLink';
  }

  if (preferredWalletId === 'Trust') {
    return adapterId === 'Trust' || adapterName === 'Trust';
  }

  if (preferredWalletId === 'MetaMask') {
    return adapterId === 'MetaMask' || adapterName === 'MetaMask';
  }

  if (preferredWalletId === 'TokenPocket') {
    return adapterId === 'TokenPocket' || adapterName === 'TokenPocket';
  }

  if (preferredWalletId === 'Bitget Wallet') {
    return adapterId === 'Bitget Wallet' || adapterName === 'Bitget Wallet';
  }

  return true;
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
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.wallet?.defaultAddress?.base58
  ];

  return candidates.find(isUsableAddress) || null;
}

function resolveProviderFromAdapter(appkit, adapter) {
  return (
    adapter?.provider ||
    adapter?.wallet ||
    adapter?.tronWeb ||
    appkit?.getWalletProvider?.() ||
    null
  );
}

function scoreAdapter(adapter, preferredWalletId) {
  const id = resolveAdapterId(adapter);
  const name = resolveAdapterName(adapter);
  const readyState = resolveAdapterReadyState(adapter);
  const connected = !!adapter?.connected;
  const address = resolveAddressFromAdapter(adapter);

  let score = 0;

  if (connected) score += 1000;
  if (address) score += 1500;
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
    score -= 6000;
  }

  if (!isAdapterAllowedForCurrentBrowser(adapter)) {
    score -= 20000;
  }

  return score;
}

function pickBestAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  const preferredWalletId = detectPreferredWalletId();
  const state = getWalletState();

  if (!adapters.length) return null;

  const activeWalletId = state.activeWalletId || null;

  const ranked = adapters
    .map((adapter) => {
      let score = scoreAdapter(adapter, preferredWalletId);

      if (
        activeWalletId &&
        (
          resolveAdapterId(adapter) === activeWalletId ||
          resolveAdapterName(adapter) === activeWalletId
        )
      ) {
        score += 8000;
      }

      return {
        adapter,
        score
      };
    })
    .sort((a, b) => b.score - a.score);

  const selected = ranked[0]?.adapter || null;
  const selectedAddress = resolveAddressFromAdapter(selected);

  if (!selected || !isUsableAddress(selectedAddress)) {
    return null;
  }

  return selected;
}

function buildRestoreSignature(adapter, address) {
  return `${resolveAdapterName(adapter)}::${address || 'null'}::${detectPreferredWalletId() || 'none'}`;
}

function clearRestoredWalletState() {
  setWalletState({
    connecting: false,
    connected: false,

    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,

    address: null,
    shortAddress: null,

    provider: null,
    tronWeb: null
  });

  lastRestoredSignature = null;
}

export async function restoreSession(appkit) {
  const now = Date.now();

  if (!appkit) {
    return false;
  }

  if (restoreInFlight) {
    return false;
  }

  if (now - lastRestoreAt < 800) {
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
      clearRestoredWalletState();
      return false;
    }

    const provider = resolveProviderFromAdapter(appkit, selectedAdapter);
    const address = resolveAddressFromAdapter(selectedAdapter);

    if (!isUsableAddress(address)) {
      clearRestoredWalletState();
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
      selectedWalletId: walletId,

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
