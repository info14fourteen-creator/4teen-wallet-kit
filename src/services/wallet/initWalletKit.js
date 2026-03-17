import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { restoreSession } from './restoreSession.js';

let initialized = false;
let walletKit = null;
let restoreTimer = null;

function mapAdaptersToWallets(adapters) {
  return adapters.map((adapter) => ({
    id: adapter.name,
    name: adapter.name,
    readyState: adapter.readyState || 'Unknown',
    connected: !!adapter.connected
  }));
}

function getBrowserHint() {
  if (typeof window === 'undefined') return '';

  const href = String(window.location.href || '').toLowerCase();
  const ua = String(window.navigator?.userAgent || '').toLowerCase();

  if (href.includes('utm_source=tronlink') || ua.includes('tronlink')) return 'TronLink';
  if (href.includes('utm_source=trust') || href.includes('trust_ios_browser') || ua.includes('trustwallet') || ua.includes('trust')) return 'Trust';
  if (href.includes('utm_source=okx') || ua.includes('okex/') || ua.includes('okapp/') || ua.includes('okx')) return 'OKX Wallet';
  if (href.includes('utm_source=binance') || ua.includes('bnc/') || ua.includes('binance')) return 'Binance Wallet';
  if (href.includes('utm_source=metamask') || ua.includes('metamask')) return 'MetaMask';
  if (ua.includes('tokenpocket') || ua.includes('tp/')) return 'TokenPocket';

  return '';
}

function normalizeConnectedAdapters(adapters, activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => !!adapter?.connected);

  if (connectedAdapters.length === 0) {
    return null;
  }

  if (activeWalletId) {
    const active = connectedAdapters.find((adapter) => adapter?.name === activeWalletId);
    if (active) return active;
  }

  const browserHint = getBrowserHint();
  if (browserHint) {
    const hinted = connectedAdapters.find((adapter) => adapter?.name === browserHint);
    if (hinted) return hinted;
  }

  return connectedAdapters[0];
}

function scheduleRestore(kit, delay = 300) {
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
      kit.connectedAdapter = normalizeConnectedAdapters(kit.adapters, state.activeWalletId) || adapter;
      kit.updateAvailableWallets();
      scheduleRestore(kit, 200);
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

      if (kit.connectedAdapter?.name === adapter.name) {
        kit.connectedAdapter = null;
      }

      kit.updateAvailableWallets();
      scheduleRestore(kit, 200);
    });
  } catch (_) {}

  try {
    adapter.on('accountsChanged', () => {
      kit.updateAvailableWallets();
      scheduleRestore(kit, 250);
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
      const availableWallets = mapAdaptersToWallets(this.adapters);

      setWalletState({
        availableWallets
      });

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
      const address = adapter?.address || null;

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
