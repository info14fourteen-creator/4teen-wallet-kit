import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { restoreSession } from './restoreSession.js';

let initialized = false;
let walletKit = null;
let restoreTimer = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function readAddressFromAnyProvider(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter.address,
    adapter.tronWeb?.defaultAddress?.base58,
    adapter.provider?.defaultAddress?.base58,
    adapter.provider?.tronWeb?.defaultAddress?.base58,
    adapter.wallet?.defaultAddress?.base58
  ];

  for (const value of candidates) {
    if (isUsableAddress(value)) return value;
  }

  return null;
}

function normalizeConnectedAdapters(adapters, activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;

    const address = readAddressFromAnyProvider(adapter);
    return !!adapter.connected || !!address;
  });

  if (!connectedAdapters.length) return null;

  if (activeWalletId) {
    const found = connectedAdapters.find(
      (a) => a?.name === activeWalletId
    );
    if (found) return found;
  }

  return connectedAdapters[0];
}

function mapAdaptersToWallets(adapters, activeWalletId = null) {
  const normalized = normalizeConnectedAdapters(adapters, activeWalletId);

  return adapters.map((adapter) => {
    const readyState = adapter?.readyState || 'Unknown';

    let connected = false;

    if (normalized?.name && adapter?.name === normalized.name) {
      connected = true;
    }

    return {
      id: adapter.name,
      name: adapter.name,
      readyState,
      connected
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

function bindAdapterEvents(kit, adapter) {
  if (!adapter || typeof adapter.on !== 'function') return;

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
      scheduleRestore(kit, 150);
    });
  } catch (_) {}

  try {
    adapter.on('disconnect', () => {
      const state = getWalletState();

      if (state.activeWalletId === adapter.name) {
        setWalletState({ activeWalletId: null });
      }

      if (kit.connectedAdapter?.name === adapter.name) {
        kit.connectedAdapter = null;
      }

      kit.updateAvailableWallets();
      scheduleRestore(kit, 150);
    });
  } catch (_) {}

  try {
    adapter.on('accountsChanged', () => {
      kit.updateAvailableWallets();
      scheduleRestore(kit, 200);
    });
  } catch (_) {}
}

async function waitAdaptersReady(adapters) {
  for (let i = 0; i < 10; i++) {
    const anyReady = adapters.some((a) => {
      const state = String(a?.readyState || '');
      return state === 'Found' || state === 'Installed';
    });

    if (anyReady) return;

    await sleep(200);
  }
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

      setWalletState({ availableWallets });
      console.log('[4TEEN] available wallets', availableWallets);
    },

    getAdapterByName(name) {
      return this.adapters.find((a) => a?.name === name) || null;
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

    getWalletProvider() {
      const adapter = this.getConnectedAdapter();
      if (!adapter) return null;

      return adapter.tronWeb || adapter.provider || adapter;
    },

    openWalletPicker() {
      setWalletState({ walletPickerOpen: true });
    },

    closeWalletPicker() {
      setWalletState({ walletPickerOpen: false });
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

    scheduleRestore(walletKit, 300);

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
