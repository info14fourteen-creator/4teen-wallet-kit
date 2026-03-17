import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

let restoreInFlight = false;
let lastRestoreAt = 0;
let lastRestoreSignature = null;

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getUserAgent() {
  const win = getWindowSafe();
  return String(win?.navigator?.userAgent || '').toLowerCase();
}

function getLocationHref() {
  const win = getWindowSafe();
  return String(win?.location?.href || '').toLowerCase();
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
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

function resolveAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function normalizeWalletId(value) {
  return String(value || '').trim().toLowerCase();
}

function isWalletConnectAdapter(adapter) {
  const id = normalizeWalletId(resolveAdapterId(adapter));
  const name = normalizeWalletId(resolveAdapterName(adapter));

  return id === 'walletconnect' || name === 'walletconnect';
}

function isOkxBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=okx') ||
    ua.includes('okex/') ||
    ua.includes('okapp/') ||
    ua.includes('okx') ||
    !!win?.okxwallet ||
    !!win?.okxWallet
  );
}

function isBinanceBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance')
  );
}

function isTronLinkBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

function isTrustBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet') ||
    !!win?.trustwallet ||
    !!win?.trustWallet
  );
}

function isMetaMaskBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();

  return href.includes('utm_source=metamask') || ua.includes('metamask');
}

function isTokenPocketBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=tokenpocket') ||
    ua.includes('tokenpocket') ||
    ua.includes('tp/') ||
    !!win?.tp ||
    !!win?.tokenPocket
  );
}

function isBitgetBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=bitget') ||
    href.includes('utm_source=bitkeep') ||
    ua.includes('bitkeep') ||
    ua.includes('bitget') ||
    !!win?.bitkeep ||
    !!win?.bitget
  );
}

function detectBrowserWalletName() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  return null;
}

function getProviderCandidates(appkit, adapter) {
  const win = getWindowSafe();

  return [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider,
    adapter?.connector?.wallet,
    appkit?.getWalletProvider?.(),
    win?.tronLink,
    win?.tronLink?.tronWeb,
    win?.okxwallet,
    win?.okxwallet?.tronWeb,
    win?.okxWallet,
    win?.okxWallet?.tronWeb,
    win?.BinanceChain,
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
    win?.ethereum,
    win?.tronWeb
  ].filter(Boolean);
}

function providerMatchesBrowser(provider, browserWalletName) {
  if (!browserWalletName) return true;

  const win = getWindowSafe();

  if (browserWalletName === 'OKX Wallet') {
    return !!(
      provider === win?.okxwallet ||
      provider === win?.okxWallet ||
      provider === win?.okxwallet?.tronWeb ||
      provider === win?.okxWallet?.tronWeb ||
      provider?.isOkxWallet ||
      provider?.isOKExWallet
    );
  }

  if (browserWalletName === 'Binance Wallet') {
    return !!(
      provider === win?.BinanceChain ||
      provider?.isBinance ||
      provider?.chain === 'tron'
    );
  }

  if (browserWalletName === 'TronLink') {
    return !!(
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    );
  }

  if (browserWalletName === 'MetaMask') {
    return !!(
      provider === win?.ethereum ||
      provider?.isMetaMask
    );
  }

  if (browserWalletName === 'TokenPocket') {
    return !!(
      provider === win?.tp ||
      provider === win?.tp?.tronWeb ||
      provider === win?.tokenPocket ||
      provider === win?.tokenPocket?.tronWeb ||
      provider?.isTokenPocket
    );
  }

  if (browserWalletName === 'Bitget Wallet') {
    return !!(
      provider === win?.bitkeep ||
      provider === win?.bitkeep?.tronWeb ||
      provider === win?.bitget ||
      provider === win?.bitget?.tronWeb ||
      provider?.isBitKeep ||
      provider?.isBitget
    );
  }

  if (browserWalletName === 'Trust') {
    return !!(
      provider === win?.trustwallet ||
      provider === win?.trustwallet?.tronWeb ||
      provider === win?.trustWallet ||
      provider === win?.trustWallet?.tronWeb ||
      provider?.isTrust ||
      provider?.isTrustWallet
    );
  }

  return true;
}

function normalizeProvider(appkit, adapter) {
  const browserWalletName = detectBrowserWalletName();
  const candidates = getProviderCandidates(appkit, adapter);

  if (!candidates.length) return null;

  if (browserWalletName) {
    for (const provider of candidates) {
      if (providerMatchesBrowser(provider, browserWalletName)) {
        return provider;
      }
    }
  }

  const adapterName = resolveAdapterName(adapter);

  if (browserWalletName && adapterName !== browserWalletName && !isWalletConnectAdapter(adapter)) {
    return null;
  }

  for (const provider of candidates) {
    if (
      provider?.tronWeb?.defaultAddress?.base58 ||
      provider?.defaultAddress?.base58 ||
      provider?.selectedAddress ||
      provider?.address
    ) {
      return provider;
    }
  }

  return candidates[0] || null;
}

function resolveAddress(adapter, provider) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,
    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const candidate of candidates) {
    if (isUsableAddress(candidate)) {
      return candidate;
    }
  }

  return null;
}

function adapterAllowedForCurrentContext(adapter) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = resolveAdapterName(adapter);

  if (!browserWalletName) return true;
  if (isWalletConnectAdapter(adapter)) return false;

  return adapterName === browserWalletName;
}

function scoreAdapter(appkit, adapter, activeWalletId = null) {
  const adapterName = resolveAdapterName(adapter);
  const adapterId = resolveAdapterId(adapter);
  const provider = normalizeProvider(appkit, adapter);
  const address = resolveAddress(adapter, provider);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const browserWalletName = detectBrowserWalletName();

  let score = 0;

  if (!adapterAllowedForCurrentContext(adapter)) {
    return -100000;
  }

  if (browserWalletName && adapterName === browserWalletName) score += 15000;

  if (
    activeWalletId &&
    (activeWalletId === adapterName || activeWalletId === adapterId)
  ) {
    score += 12000;
  }

  if (connected) score += 7000;
  if (address) score += 9000;

  if (readyState === 'Found') score += 600;
  if (readyState === 'Installed') score += 500;
  if (readyState === 'Loadable') score += 300;
  if (readyState === 'Loading') score += 100;

  if (provider) score += 300;
  if (isWalletConnectAdapter(adapter)) score -= 50000;

  return score;
}

function pickConnectedAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  const state = getWalletState();

  if (!adapters.length) return null;

  const ranked = adapters
    .map((adapter) => ({
      adapter,
      provider: normalizeProvider(appkit, adapter),
      score: scoreAdapter(appkit, adapter, state.activeWalletId)
    }))
    .sort((a, b) => b.score - a.score);

  for (const item of ranked) {
    const address = resolveAddress(item.adapter, item.provider);
    if (item.adapter?.connected && isUsableAddress(address)) {
      return {
        adapter: item.adapter,
        provider: item.provider,
        address
      };
    }
  }

  for (const item of ranked) {
    const address = resolveAddress(item.adapter, item.provider);
    if (isUsableAddress(address)) {
      return {
        adapter: item.adapter,
        provider: item.provider,
        address
      };
    }
  }

  return null;
}

function clearState() {
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
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null
  });

  lastRestoreSignature = null;
}

function buildRestoreSignature(walletId, address) {
  return `${walletId || 'none'}::${address || 'none'}::${detectBrowserWalletName() || 'browserless'}`;
}

export async function restoreSession(appkit) {
  const now = Date.now();

  if (!appkit) return false;
  if (restoreInFlight) return false;
  if (now - lastRestoreAt < 500) return false;

  restoreInFlight = true;
  lastRestoreAt = now;

  try {
    const selected = pickConnectedAdapter(appkit);

    if (!selected) {
      clearState();
      return false;
    }

    const adapter = selected.adapter;
    const provider = selected.provider;
    const address = selected.address;

    if (!provider || !isUsableAddress(address)) {
      clearState();
      return false;
    }

    const walletName = resolveAdapterName(adapter);
    const walletId = resolveAdapterId(adapter) || walletName;
    const signature = buildRestoreSignature(walletId, address);
    const state = getWalletState();

    if (
      state.connected &&
      state.address === address &&
      state.activeWalletId === walletId &&
      lastRestoreSignature === signature
    ) {
      return true;
    }

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
      walletPickerOpen: false,
      error: null
    });

    lastRestoreSignature = signature;

    try {
      await refreshAllBalances({
        address,
        walletId,
        provider
      });
    } catch (_) {}

    return true;
  } finally {
    restoreInFlight = false;
  }
}
