import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';
import { isTrustWalletBrowser, connectTrustFallback } from '../../adapters/trustFallback.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isHexAddress(value) {
  return typeof value === 'string' && /^41[0-9a-fA-F]{40}$/.test(value);
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
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();
  const href = String(win?.location?.href || '').toLowerCase();

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
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();
  const href = String(win?.location?.href || '').toLowerCase();

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance') ||
    !!win?.BinanceChain
  );
}

function isTronLinkBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();
  const href = String(win?.location?.href || '').toLowerCase();

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

function isMetaMaskBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();
  const href = String(win?.location?.href || '').toLowerCase();

  return href.includes('utm_source=metamask') || ua.includes('metamask') || !!win?.ethereum?.isMetaMask;
}

function isTokenPocketBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();
  const href = String(win?.location?.href || '').toLowerCase();

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
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();
  const href = String(win?.location?.href || '').toLowerCase();

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
  if (isTrustWalletBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  return null;
}

function isAdapterAllowedForBrowser(adapter, browserWalletName) {
  if (!browserWalletName) return true;
  if (isWalletConnectAdapter(adapter)) return true;
  return resolveAdapterName(adapter) === browserWalletName;
}

function scoreAdapter(appkit, adapter, walletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = resolveAdapterName(adapter);
  const adapterId = resolveAdapterId(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const provider = pickBestProvider(appkit, adapter, walletId);
  const address = resolveAddress(adapter, provider);

  let score = 0;

  if (!isAdapterAllowedForBrowser(adapter, browserWalletName)) {
    return -100000;
  }

  if (walletId && normalizeWalletId(walletId) === normalizeWalletId(adapterId)) score += 30000;
  if (walletId && normalizeWalletId(walletId) === normalizeWalletId(adapterName)) score += 30000;
  if (browserWalletName && adapterName === browserWalletName) score += 20000;
  if (connected) score += 10000;
  if (address) score += 12000;
  if (readyState === 'Found') score += 500;
  if (readyState === 'Installed') score += 450;
  if (readyState === 'Loadable') score += 250;
  if (readyState === 'Loading') score += 50;

  if (browserWalletName && browserWalletName !== 'TronLink') {
    if (adapterName === 'TronLink' || adapterId === 'TronLink') {
      score -= 25000;
    }
  }

  if (isWalletConnectAdapter(adapter)) {
    score -= browserWalletName ? 5000 : 0;
  }

  return score;
}

function pickAdapter(appkit, walletId) {
  const adapters = resolveAdapters(appkit);
  if (!adapters.length) return null;

  const ranked = adapters
    .map((adapter) => ({
      adapter,
      score: scoreAdapter(appkit, adapter, walletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.adapter || null;
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
    win?.BinanceChain?.tronWeb,

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
    win?.ethereum?.tronWeb,

    win?.tronWeb
  ].filter(Boolean);
}

function providerMatchesWallet(provider, walletName) {
  const win = getWindowSafe();

  if (!walletName) return true;

  if (walletName === 'OKX Wallet') {
    return !!(
      provider === win?.okxwallet ||
      provider === win?.okxwallet?.tronWeb ||
      provider === win?.okxWallet ||
      provider === win?.okxWallet?.tronWeb ||
      provider?.isOkxWallet ||
      provider?.isOKExWallet
    );
  }

  if (walletName === 'Binance Wallet') {
    return !!(
      provider === win?.BinanceChain ||
      provider === win?.BinanceChain?.tronWeb ||
      provider?.isBinance ||
      provider?.chain === 'tron'
    );
  }

  if (walletName === 'TronLink') {
    return !!(
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    );
  }

  if (walletName === 'MetaMask') {
    return !!(
      provider === win?.ethereum ||
      provider === win?.ethereum?.tronWeb ||
      provider?.isMetaMask
    );
  }

  if (walletName === 'TokenPocket') {
    return !!(
      provider === win?.tp ||
      provider === win?.tp?.tronWeb ||
      provider === win?.tokenPocket ||
      provider === win?.tokenPocket?.tronWeb ||
      provider?.isTokenPocket
    );
  }

  if (walletName === 'Bitget Wallet') {
    return !!(
      provider === win?.bitkeep ||
      provider === win?.bitkeep?.tronWeb ||
      provider === win?.bitget ||
      provider === win?.bitget?.tronWeb ||
      provider?.isBitKeep ||
      provider?.isBitget
    );
  }

  if (walletName === 'Trust') {
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

function pickBestProvider(appkit, adapter, walletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const targetWalletName = walletId || browserWalletName || resolveAdapterName(adapter);
  const candidates = getProviderCandidates(appkit, adapter);

  for (const provider of candidates) {
    if (
      providerMatchesWallet(provider, targetWalletName) &&
      (
        provider?.tronWeb?.defaultAddress?.base58 ||
        provider?.defaultAddress?.base58 ||
        provider?.selectedAddress ||
        provider?.address
      )
    ) {
      return provider;
    }
  }

  for (const provider of candidates) {
    if (providerMatchesWallet(provider, targetWalletName)) {
      return provider;
    }
  }

  return candidates[0] || null;
}

function normalizeAddress(value, provider = null) {
  if (isUsableAddress(value)) {
    return value;
  }

  if (isHexAddress(value) && provider?.address?.fromHex) {
    try {
      const converted = provider.address.fromHex(value);
      if (isUsableAddress(converted)) return converted;
    } catch (_) {}
  }

  if (isHexAddress(value) && provider?.tronWeb?.address?.fromHex) {
    try {
      const converted = provider.tronWeb.address.fromHex(value);
      if (isUsableAddress(converted)) return converted;
    } catch (_) {}
  }

  return null;
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
    const normalized = normalizeAddress(candidate, provider);
    if (normalized) return normalized;
  }

  return null;
}

async function tryProviderRequest(provider, method, params = []) {
  if (!provider) return null;

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({ method, params });
    } catch (_) {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch (_) {}
  }

  return null;
}

function extractAddressFromPayload(payload, provider) {
  if (!payload) return null;

  if (typeof payload === 'string') {
    return normalizeAddress(payload, provider);
  }

  if (Array.isArray(payload)) {
    return normalizeAddress(payload[0], provider);
  }

  if (typeof payload === 'object') {
    return (
      normalizeAddress(payload.address, provider) ||
      normalizeAddress(payload.selectedAddress, provider) ||
      normalizeAddress(payload.publicKey, provider) ||
      normalizeAddress(payload.result?.[0], provider) ||
      normalizeAddress(payload.accounts?.[0], provider) ||
      normalizeAddress(payload.data?.address, provider) ||
      normalizeAddress(payload.payload?.address, provider) ||
      null
    );
  }

  return null;
}

async function tryRequestAccounts(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const res = await tryProviderRequest(provider, method, params || []);
    const address = extractAddressFromPayload(res, provider);

    if (address) {
      return address;
    }
  }

  return null;
}

async function forceBindTronWeb(provider, address) {
  if (!provider || !address) return;

  try {
    if (typeof provider.setAddress === 'function') {
      provider.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb && typeof provider.tronWeb.setAddress === 'function') {
      provider.tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.defaultAddress && typeof provider.defaultAddress === 'object') {
      provider.defaultAddress.base58 = address;
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb?.defaultAddress && typeof provider.tronWeb.defaultAddress === 'object') {
      provider.tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}
}

async function waitForAddress(adapter, provider) {
  for (let i = 0; i < 16; i++) {
    const directAddress = resolveAddress(adapter, provider);
    if (directAddress) {
      await forceBindTronWeb(provider, directAddress);
      console.log('[4TEEN] address resolved', directAddress);
      return directAddress;
    }

    if (i === 0 || i === 4 || i === 8 || i === 12) {
      const requestedAddress = await tryRequestAccounts(provider);
      if (requestedAddress) {
        await forceBindTronWeb(provider, requestedAddress);
        console.log('[4TEEN] address resolved', requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(250);
  }

  return null;
}

async function connectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    throw new Error(`Adapter ${resolveAdapterName(adapter)} has no connect()`);
  }

  try {
    await adapter.connect();
    return;
  } catch (error) {
    const msg = String(error?.message || '').toLowerCase();

    if (
      msg.includes('already connected') ||
      msg.includes('connection already open') ||
      msg.includes('session currently connected')
    ) {
      return;
    }

    throw error;
  }
}

function buildConnectedState({
  walletId,
  walletName,
  address,
  provider
}) {
  return {
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
  };
}

function buildDisconnectedState(errorMessage = 'Wallet connection failed') {
  return {
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
    fourteenBalance: null,
    walletPickerOpen: true,
    error: errorMessage
  };
}

async function finalizeConnection({ walletId, walletName, address, provider }) {
  await forceBindTronWeb(provider, address);

  setWalletState(
    buildConnectedState({
      walletId,
      walletName,
      address,
      provider
    })
  );

  const state = getWalletState();

  await refreshAllBalances({
    address: state.address,
    walletId: state.activeWalletId,
    provider: state.provider
  });

  return {
    ok: true,
    address,
    walletId
  };
}

export async function connectWallet(appkit, walletId = null) {
  try {
    setWalletState({
      connecting: true,
      error: null
    });

    if (!appkit) {
      throw new Error('Wallet kit not initialized');
    }

    if (!walletId) {
      if (typeof appkit.openWalletPicker === 'function') {
        appkit.openWalletPicker();

        setWalletState({
          connecting: false,
          walletPickerOpen: true
        });

        return { ok: true };
      }

      throw new Error('Wallet picker not available');
    }

    if (walletId === 'Trust' && isTrustWalletBrowser()) {
      const result = await connectTrustFallback();

      return await finalizeConnection({
        walletId: result.walletId,
        walletName: result.walletName,
        address: result.address,
        provider: result.tronWeb || result.provider || null
      });
    }

    // BINANCE HARD OVERRIDE
if (walletId === 'Binance Wallet') {
  const win = getWindowSafe();

  const provider =
    win?.binancew3w?.tron ||
    win?.BinanceChain?.tron ||
    win?.BinanceChain ||
    null;

  if (!provider) {
    throw new Error('Binance TRON provider not found');
  }

  let address = null;

  try {
    if (typeof provider.getAccount === 'function') {
      const acc = await provider.getAccount();
      address = Array.isArray(acc) ? acc[0] : acc;
    }
  } catch (_) {}

  if (!address && typeof provider.request === 'function') {
    try {
      const res = await provider.request({ method: 'tron_requestAccounts' });
      address = Array.isArray(res) ? res[0] : res;
    } catch (_) {}
  }

  if (!address) {
    address =
      provider.address ||
      provider.selectedAddress ||
      provider.defaultAddress?.base58 ||
      provider.tronWeb?.defaultAddress?.base58 ||
      null;
  }

  if (!isUsableAddress(address)) {
    throw new Error('Binance did not return valid address');
  }

  let tronWeb = provider.tronWeb || null;

  if (!tronWeb) {
    const { TronWeb } = await import('tronweb');

    tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io'
    });
  }

  try {
    if (typeof tronWeb.setAddress === 'function') {
      tronWeb.setAddress(address);
    } else {
      tronWeb.defaultAddress = {
        base58: address,
        hex: tronWeb.address?.toHex?.(address) || ''
      };
    }

    tronWeb.ready = true;
  } catch (_) {}

  return await finalizeConnection({
    walletId: 'Binance Wallet',
    walletName: 'Binance Wallet',
    address,
    provider: tronWeb
  });
}
    const adapter = pickAdapter(appkit, walletId);

    if (!adapter) {
      throw new Error(`Adapter not found: ${walletId}`);
    }

    await connectAdapter(adapter);

    let provider = pickBestProvider(appkit, adapter, walletId);
    let address = await waitForAddress(adapter, provider);

    if (!isUsableAddress(address)) {
      await sleep(400);
      provider = pickBestProvider(appkit, adapter, walletId);
      address = await waitForAddress(adapter, provider);
    }

    if (!isUsableAddress(address)) {
      await sleep(600);
      provider = pickBestProvider(appkit, adapter, walletId);
      address = await waitForAddress(adapter, provider);
    }

    if (!isUsableAddress(address) && walletId === 'Trust' && isTrustWalletBrowser()) {
      const result = await connectTrustFallback();

      return await finalizeConnection({
        walletId: result.walletId,
        walletName: result.walletName,
        address: result.address,
        provider: result.tronWeb || result.provider || null
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('Address not resolved');
    }

    const walletName = resolveAdapterName(adapter);
    const walletIdResolved = resolveAdapterId(adapter) || walletName;

    return await finalizeConnection({
      walletId: walletIdResolved,
      walletName,
      address,
      provider
    });
  } catch (error) {
    console.error('[4TEEN] connectWallet failed', error);

    setWalletState(
      buildDisconnectedState(error?.message || 'Wallet connection failed')
    );

    return { ok: false, error };
  }
}
