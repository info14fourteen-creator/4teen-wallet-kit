import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { restoreSession } from './restoreSession.js';

let initialized = false;
let walletKit = null;
let restoreTimer = null;
let autoConnectTimer = null;
let autoConnectInFlight = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function isWalletBrowser() {
  return !!detectBrowserWalletName();
}

function readAddressFromAnyProvider(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.address,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const value of candidates) {
    if (isUsableAddress(value)) return value;
  }

  return null;
}

function getWalletPriority(adapter, activeWalletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = resolveAdapterName(adapter);
  const adapterId = resolveAdapterId(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const address = readAddressFromAnyProvider(adapter);

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (
    activeWalletId &&
    (adapterName === activeWalletId || adapterId === activeWalletId)
  ) {
    score += 12000;
  }

  if (browserWalletName && adapterName === browserWalletName) {
    score += 10000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score += 50;
  }

  if (browserWalletName && adapterName !== browserWalletName && !isWalletConnectAdapter(adapter)) {
    score -= 30000;
  }

  if (
    browserWalletName &&
    browserWalletName !== 'TronLink' &&
    (adapterName === 'TronLink' || adapterId === 'TronLink')
  ) {
    score -= 50000;
  }

  return score;
}

function normalizeConnectedAdapters(adapters, activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;

    const address = readAddressFromAnyProvider(adapter);
    return !!adapter?.connected || !!address;
  });

  if (!connectedAdapters.length) return null;

  const ranked = [...connectedAdapters].sort(
    (a, b) => getWalletPriority(b, activeWalletId) - getWalletPriority(a, activeWalletId)
  );

  return ranked[0] || null;
}

function mapAdaptersToWallets(adapters, activeWalletId = null) {
  const normalized = normalizeConnectedAdapters(adapters, activeWalletId);

  return adapters.map((adapter) => {
    const readyState = adapter?.readyState || 'Unknown';

    return {
      id: resolveAdapterId(adapter) || resolveAdapterName(adapter),
      name: resolveAdapterName(adapter),
      readyState,
      connected: !!(normalized && resolveAdapterName(normalized) === resolveAdapterName(adapter))
    };
  });
}

function scheduleRestore(kit, delay = 300) {
  if (restoreTimer) {
    clearTimeout(restoreTimer);
  }

  restoreTimer = setTimeout(() => {
    restoreSession(kit).catch((error) => {
      console.error('[4TEEN] restoreSession error', error);
    });
  }, delay);
}

async function waitAdaptersReady(adapters) {
  for (let i = 0; i < 12; i++) {
    const anyReady = adapters.some((adapter) => {
      const state = String(adapter?.readyState || '');
      return state === 'Found' || state === 'Installed' || state === 'Loadable';
    });

    if (anyReady) {
      return;
    }

    await sleep(200);
  }
}

async function safeConnectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    return false;
  }

  try {
    await adapter.connect();
    return true;
  } catch (error) {
    const message = String(error?.message || '').toLowerCase();

    if (
      message.includes('already connected') ||
      message.includes('session currently connected') ||
      message.includes('connection already open')
    ) {
      return true;
    }

    if (
      message.includes('user rejected') ||
      message.includes('no accounts found in session')
    ) {
      return false;
    }

    console.warn('[4TEEN] auto connect adapter failed', {
      adapter: resolveAdapterName(adapter),
      error
    });

    return false;
  }
}

function pickAutoConnectAdapter(adapters) {
  const browserWalletName = detectBrowserWalletName();
  if (!browserWalletName) return null;

  const ranked = adapters
    .filter((adapter) => !isWalletConnectAdapter(adapter))
    .filter((adapter) => resolveAdapterName(adapter) === browserWalletName)
    .sort((a, b) => getWalletPriority(b) - getWalletPriority(a));

  return ranked[0] || null;
}

function shouldAutoConnect(kit) {
  if (!isWalletBrowser()) return false;

  const state = getWalletState();

  if (state.connecting) return false;
  if (state.connected) return false;
  if (state.address) return false;

  const alreadyConnected = normalizeConnectedAdapters(kit.adapters, state.activeWalletId);
  if (alreadyConnected) return false;

  return true;
}

function scheduleAutoConnect(kit, delay = 250) {
  if (autoConnectTimer) {
    clearTimeout(autoConnectTimer);
  }

  autoConnectTimer = setTimeout(async () => {
    if (!shouldAutoConnect(kit) || autoConnectInFlight) {
      return;
    }

    const adapter = pickAutoConnectAdapter(kit.adapters);
    if (!adapter) {
      return;
    }

    autoConnectInFlight = true;

    try {
      await safeConnectAdapter(adapter);
      kit.updateAvailableWallets();
      scheduleRestore(kit, 120);
    } finally {
      autoConnectInFlight = false;
    }
  }, delay);
}

function bindAdapterEvents(kit, adapter) {
  if (!adapter || typeof adapter.on !== 'function') return;

  try {
    adapter.on('readyStateChanged', () => {
      kit.updateAvailableWallets();

      if (isWalletBrowser()) {
        scheduleAutoConnect(kit, 120);
      }
    });
  } catch (_) {}

  try {
    adapter.on('connect', () => {
      const state = getWalletState();

      kit.connectedAdapter =
        normalizeConnectedAdapters(kit.adapters, state.activeWalletId) || adapter;

      const connectedName =
        resolveAdapterId(kit.connectedAdapter) ||
        resolveAdapterName(kit.connectedAdapter) ||
        resolveAdapterId(adapter) ||
        resolveAdapterName(adapter) ||
        null;

      setWalletState({
        activeWalletId: connectedName,
        selectedWalletId: connectedName,
        walletPickerOpen: false
      });

      kit.updateAvailableWallets();
      scheduleRestore(kit, 100);
    });
  } catch (_) {}

  try {
    adapter.on('disconnect', () => {
      const state = getWalletState();
      const adapterName = resolveAdapterName(adapter);
      const adapterId = resolveAdapterId(adapter);

      if (state.activeWalletId === adapterName || state.activeWalletId === adapterId) {
        setWalletState({
          activeWalletId: null,
          selectedWalletId: null
        });
      }

      if (
        kit.connectedAdapter &&
        (
          resolveAdapterName(kit.connectedAdapter) === adapterName ||
          resolveAdapterId(kit.connectedAdapter) === adapterId
        )
      ) {
        kit.connectedAdapter = null;
      }

      kit.updateAvailableWallets();
      scheduleRestore(kit, 120);

      if (isWalletBrowser()) {
        scheduleAutoConnect(kit, 250);
      }
    });
  } catch (_) {}

  try {
    adapter.on('accountsChanged', () => {
      const state = getWalletState();
      const normalized = normalizeConnectedAdapters(kit.adapters, state.activeWalletId);

      kit.connectedAdapter = normalized || null;

      if (!normalized) {
        setWalletState({
          activeWalletId: null,
          selectedWalletId: null
        });
      }

      kit.updateAvailableWallets();
      scheduleRestore(kit, 120);
    });
  } catch (_) {}
}

function createWalletKit({ projectId }) {
  const adapters = createWalletAdapters({ projectId });

  const kit = {
    projectId,
    adapters,
    connectedAdapter: null,

    updateAvailableWallets() {
      const state = getWalletState();
      const normalized =
        normalizeConnectedAdapters(this.adapters, state.activeWalletId);

      if (normalized) {
        this.connectedAdapter = normalized;
      } else {
        this.connectedAdapter = null;
      }

      const availableWallets = mapAdaptersToWallets(
        this.adapters,
        state.activeWalletId
      );

      setWalletState({
        availableWallets
      });

      console.log('[4TEEN] available wallets', availableWallets);
    },

    getAdapterByName(name) {
      return (
        this.adapters.find((adapter) => {
          return (
            resolveAdapterName(adapter) === name ||
            resolveAdapterId(adapter) === name
          );
        }) || null
      );
    },

    getConnectedAdapter() {
      const state = getWalletState();
      const normalized =
        normalizeConnectedAdapters(this.adapters, state.activeWalletId);

      if (normalized) {
        this.connectedAdapter = normalized;
      }

      return this.connectedAdapter || null;
    },

    selectAdapter(name) {
      const adapter = this.getAdapterByName(name);

      if (adapter) {
        const adapterKey = resolveAdapterId(adapter) || resolveAdapterName(adapter);

        setWalletState({
          selectedWalletId: adapterKey,
          activeWalletId: adapterKey
        });
      }

      return adapter || null;
    },

    getWalletProvider() {
      const adapter = this.getConnectedAdapter();
      if (!adapter) return null;

      return (
        adapter?.tronWeb ||
        adapter?.provider ||
        adapter?.wallet ||
        adapter?.walletProvider ||
        adapter
      );
    },

    openWalletPicker() {
      const normalized = normalizeConnectedAdapters(this.adapters, getWalletState().activeWalletId);

      setWalletState({
        walletPickerOpen: !normalized
      });
    },

    closeWalletPicker() {
      setWalletState({
        walletPickerOpen: false
      });
    }
  };

  kit.adapters.forEach((adapter) => {
    bindAdapterEvents(kit, adapter);
  });

  return kit;
}

export async function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    walletKit.updateAvailableWallets();

    if (isWalletBrowser()) {
      scheduleAutoConnect(walletKit, 120);
    } else {
      scheduleRestore(walletKit, 120);
    }

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  }

  try {
    walletKit = createWalletKit({ projectId });

    await waitAdaptersReady(walletKit.adapters);

    initialized = true;

    setWalletState({
      initialized: true,
      error: null
    });

    walletKit.updateAvailableWallets();

    if (isWalletBrowser()) {
      scheduleAutoConnect(walletKit, 120);
      scheduleRestore(walletKit, 220);
    } else {
      scheduleRestore(walletKit, 300);
    }

    console.log('[4TEEN] wallet kit initialized');

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  } catch (error) {
    console.error('[4TEEN] initWalletKit failed', error);

    setWalletState({
      initialized: false,
      error: error?.message || 'initWalletKit failed'
    });

    return {
      appkit: null,
      tronAdapter: null
    };
  }
}
