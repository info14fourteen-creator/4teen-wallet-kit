import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { restoreSession } from './restoreSession.js';

let initialized = false;
let walletKit = null;
let restoreTimer = null;

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

function readAddressFromAnyProvider(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter.address,
    adapter.tronWeb?.defaultAddress?.base58,
    adapter.provider?.defaultAddress?.base58,
    adapter.provider?.tronWeb?.defaultAddress?.base58,
    adapter.tronLink?.defaultAddress?.base58,
    adapter.wallet?.defaultAddress?.base58
  ];

  for (const value of candidates) {
    if (isUsableAddress(value)) return value;
  }

  return null;
}

function isOkxBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();
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
  const ua = getUserAgent();
  const href = getLocationHref();
  const win = getWindowSafe();

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

function isTrustBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();
  const win = getWindowSafe();

  return (
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet') ||
    (!!win?.trustwallet || !!win?.trustWallet)
  );
}

function isMetaMaskBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();

  return href.includes('utm_source=metamask') || ua.includes('metamask');
}

function isTokenPocketBrowser() {
  const ua = getUserAgent();
  const win = getWindowSafe();

  return (
    ua.includes('tokenpocket') ||
    ua.includes('tp/') ||
    !!win?.tp ||
    !!win?.tokenPocket
  );
}

function isBitgetBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();
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

function getBrowserHint() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
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
    'Bitget Wallet': 740,
    'WalletConnect': 100
  };

  return base[name] || 1;
}

function isAdapterAllowedInCurrentBrowser(adapterName, browserHint) {
  if (!browserHint) return true;

  if (browserHint === 'OKX Wallet') {
    return adapterName === 'OKX Wallet' || adapterName === 'WalletConnect';
  }

  if (browserHint === 'Binance Wallet') {
    return adapterName === 'Binance Wallet' || adapterName === 'WalletConnect';
  }

  if (browserHint === 'TronLink') {
    return adapterName === 'TronLink' || adapterName === 'WalletConnect';
  }

  if (browserHint === 'MetaMask') {
    return adapterName === 'MetaMask' || adapterName === 'WalletConnect';
  }

  if (browserHint === 'TokenPocket') {
    return adapterName === 'TokenPocket' || adapterName === 'WalletConnect';
  }

  if (browserHint === 'Bitget Wallet') {
    return adapterName === 'Bitget Wallet' || adapterName === 'WalletConnect';
  }

  if (browserHint === 'Trust') {
    return adapterName === 'Trust' || adapterName === 'WalletConnect';
  }

  return true;
}

function normalizeConnectedAdapters(adapters, activeWalletId = null) {
  const browserHint = getBrowserHint();

  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;

    const adapterAddress = readAddressFromAnyProvider(adapter);
    const adapterConnected = !!adapter.connected || !!adapterAddress;

    if (!adapterConnected) return false;

    return isAdapterAllowedInCurrentBrowser(adapter?.name, browserHint);
  });

  if (connectedAdapters.length === 0) {
    return null;
  }

  const sorted = [...connectedAdapters].sort((a, b) => {
    return (
      getWalletPriority(b?.name, browserHint, activeWalletId) -
      getWalletPriority(a?.name, browserHint, activeWalletId)
    );
  });

  return sorted[0] || null;
}

function mapAdaptersToWallets(adapters, activeWalletId = null) {
  const browserHint = getBrowserHint();
  const normalized = normalizeConnectedAdapters(adapters, activeWalletId);

  return adapters.map((adapter) => {
    const allowed = isAdapterAllowedInCurrentBrowser(adapter?.name, browserHint);
    const realReadyState = adapter?.readyState || 'Unknown';

    let connected = false;

    if (normalized?.name && adapter?.name === normalized.name) {
      connected = true;
    }

    return {
      id: adapter.name,
      name: adapter.name,
      readyState: allowed ? realReadyState : 'NotFound',
      connected
    };
  });
}

function scheduleRestore(kit, delay = 250) {
  if (restoreTimer) {
    clearTimeout(restoreTimer);
  }

  restoreTimer = setTimeout(() => {
    restoreSession(kit).catch((error) => {
      console.error('[4TEEN] scheduled restoreSession failed', error);
    });
  }, delay);
}

function bindAdapterEvents(kit, adapter) {
  if (!adapter || typeof adapter.on !== 'function') {
    return;
  }

  try {
    adapter.on('readyStateChanged', () => {
      kit.updateAvailableWallets();
    });
  } catch (_) {}

  try {
    adapter.on('connect', () => {
      const state = getWalletState();
      kit.connectedAdapter =
        normalizeConnectedAdapters(kit.adapters, state.activeWalletId) || adapter;

      setWalletState({
        activeWalletId: kit.connectedAdapter?.name || adapter?.name || null,
        selectedWalletId: kit.connectedAdapter?.name || adapter?.name || null
      });

      kit.updateAvailableWallets();
      scheduleRestore(kit, 120);
    });
  } catch (_) {}

  try {
    adapter.on('disconnect', () => {
      const state = getWalletState();

      if (state.activeWalletId === adapter.name) {
        setWalletState({
          activeWalletId: null
        });
      }

      if (state.selectedWalletId === adapter.name) {
        setWalletState({
          selectedWalletId: null
        });
      }

      if (kit.connectedAdapter?.name === adapter.name) {
        kit.connectedAdapter = null;
      }

      kit.updateAvailableWallets();
      scheduleRestore(kit, 120);
    });
  } catch (_) {}

  try {
    adapter.on('accountsChanged', () => {
      const state = getWalletState();
      kit.connectedAdapter =
        normalizeConnectedAdapters(kit.adapters, state.activeWalletId) || null;

      if (!kit.connectedAdapter) {
        setWalletState({
          activeWalletId: null
        });
      }

      kit.updateAvailableWallets();
      scheduleRestore(kit, 180);
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
      } else if (
        this.connectedAdapter &&
        !readAddressFromAnyProvider(this.connectedAdapter) &&
        !this.connectedAdapter?.connected
      ) {
        this.connectedAdapter = null;
      }

      const availableWallets = mapAdaptersToWallets(
        this.adapters,
        getWalletState().activeWalletId
      );

      setWalletState({ availableWallets });
      console.log('[4TEEN] available wallets', availableWallets);
    },

    getAdapterByName(name) {
      return this.adapters.find((adapter) => adapter?.name === name) || null;
    },

    getConnectedAdapter() {
      const state = getWalletState();
      const normalized = normalizeConnectedAdapters(this.adapters, state.activeWalletId);

      if (normalized) {
        this.connectedAdapter = normalized;
      }

      return this.connectedAdapter || null;
    },

    selectAdapter(name) {
      const adapter = name ? this.getAdapterByName(name) : null;

      this.connectedAdapter = adapter || null;

      setWalletState({
        selectedWalletId: adapter?.name || null,
        activeWalletId: adapter?.name || null
      });

      return adapter;
    },

    getAccount() {
      const adapter = this.getConnectedAdapter();
      const address = readAddressFromAnyProvider(adapter);

      if (!address) return null;

      return { address };
    },

    getWalletProvider() {
      const adapter = this.getConnectedAdapter();
      if (!adapter) return null;

      return adapter.tronWeb || adapter.provider || adapter;
    },

    openWalletPicker() {
      setWalletState({
        walletPickerOpen: true
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

  const state = getWalletState();
  kit.connectedAdapter = normalizeConnectedAdapters(kit.adapters, state.activeWalletId);
  kit.updateAvailableWallets();

  return kit;
}

export function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    walletKit.updateAvailableWallets();

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  }

  try {
    walletKit = createWalletKit({ projectId });
    initialized = true;

    setWalletState({
      initialized: true,
      error: null
    });

    const state = getWalletState();

    console.log('[4TEEN] initWalletKit result', {
      hasAppkit: !!walletKit,
      hasTronAdapter: false,
      availableWallets: state.availableWallets
    });

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
