import { resetWalletState, setWalletState } from '../../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'unknown'
  );
}

function getAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (typeof appkit.getConnectors === 'function') {
    const adapters = appkit.getConnectors();
    return Array.isArray(adapters) ? adapters : [];
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

async function safeCall(target, methodName) {
  if (!target || typeof target[methodName] !== 'function') {
    return;
  }

  try {
    await target[methodName]();
  } catch (error) {
    console.warn(`[4TEEN] ${methodName} failed`, error);
  }
}

async function safeDisconnectAdapter(adapter) {
  if (!adapter) return;

  await safeCall(adapter, 'disconnect');
  await safeCall(adapter, 'close');
  await safeCall(adapter, 'reset');

  if (adapter?.connector) {
    await safeCall(adapter.connector, 'disconnect');
    await safeCall(adapter.connector, 'close');
    await safeCall(adapter.connector, 'reset');
  }

  if (adapter?.provider) {
    await safeCall(adapter.provider, 'disconnect');
    await safeCall(adapter.provider, 'close');
    await safeCall(adapter.provider, 'reset');
  }

  if (adapter?.walletProvider) {
    await safeCall(adapter.walletProvider, 'disconnect');
    await safeCall(adapter.walletProvider, 'close');
    await safeCall(adapter.walletProvider, 'reset');
  }
}

function clearWalletConnectStorage() {
  const win = getWindowSafe();
  if (!win) return;

  const storageTargets = [];

  try {
    if (win.localStorage) storageTargets.push(win.localStorage);
  } catch (_) {}

  try {
    if (win.sessionStorage) storageTargets.push(win.sessionStorage);
  } catch (_) {}

  const keysToRemove = [
    'walletconnect',
    'WALLETCONNECT_DEEPLINK_CHOICE',
    'WALLETCONNECT_MODAL_SELECTED_CHAIN',
    'wc@2:client:0.3//proposal',
    'wc@2:client:0.3//session',
    'wc@2:core:0.3//expirer',
    'wc@2:core:0.3//history',
    'wc@2:core:0.3//keychain',
    'wc@2:core:0.3//messages',
    'wc@2:core:0.3//pairing',
    'wc@2:core:0.3//subscription',
    'wc@2:universal_provider:/namespaces',
    'wc@2:universal_provider:/optionalNamespaces',
    'wc@2:universal_provider:/sessionProperties'
  ];

  for (const storage of storageTargets) {
    try {
      for (const key of keysToRemove) {
        storage.removeItem(key);
      }

      const dynamicKeys = [];

      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);

        if (!key) continue;

        if (
          key.startsWith('wc@2:') ||
          key.startsWith('walletconnect') ||
          key.includes('WalletConnect')
        ) {
          dynamicKeys.push(key);
        }
      }

      for (const key of dynamicKeys) {
        storage.removeItem(key);
      }
    } catch (_) {}
  }
}

function clearRuntimeCaches() {
  const win = getWindowSafe();
  if (!win) return;

  try {
    win.__FOURTEEN_WALLETCONNECT_URI__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_LAST_SELECTED_WALLET__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_CONNECT_IN_PROGRESS__ = false;
  } catch (_) {}

  try {
    win.__FOURTEEN_ACTIVE_CONNECT_PROMISE__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_SELECTED_WALLET_ID__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_AUTO_CONNECT_LOCK__ = false;
  } catch (_) {}
}

function clearInjectedWalletHints() {
  const win = getWindowSafe();
  if (!win) return;

  const clearAddress = (target) => {
    if (!target) return;

    try {
      if (target.defaultAddress && typeof target.defaultAddress === 'object') {
        target.defaultAddress.base58 = false;
        target.defaultAddress.hex = false;
      }
    } catch (_) {}

    try {
      if ('selectedAddress' in target) {
        target.selectedAddress = null;
      }
    } catch (_) {}

    try {
      if ('address' in target && typeof target.address === 'string') {
        target.address = null;
      }
    } catch (_) {}
  };

  clearAddress(win.tronWeb);
  clearAddress(win.tronLink);
  clearAddress(win.tronLink?.tronWeb);
  clearAddress(win.okxwallet);
  clearAddress(win.okxwallet?.tronWeb);
  clearAddress(win.okxWallet);
  clearAddress(win.okxWallet?.tronWeb);
  clearAddress(win.tp);
  clearAddress(win.tp?.tronWeb);
  clearAddress(win.tokenPocket);
  clearAddress(win.tokenPocket?.tronWeb);
  clearAddress(win.bitkeep);
  clearAddress(win.bitkeep?.tronWeb);
  clearAddress(win.bitget);
  clearAddress(win.bitget?.tronWeb);
  clearAddress(win.trustwallet);
  clearAddress(win.trustwallet?.tronWeb);
  clearAddress(win.trustWallet);
  clearAddress(win.trustWallet?.tronWeb);
}

function buildAvailableWallets(adapters = []) {
  return adapters.map((adapter) => ({
    id: getAdapterId(adapter) || getAdapterName(adapter),
    name: getAdapterName(adapter),
    readyState: adapter?.readyState || 'Unknown',
    connected: false
  }));
}

function buildDisconnectedState(availableWallets = []) {
  return {
    initialized: true,
    connecting: false,
    connected: false,
    walletPickerOpen: true,

    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,

    provider: null,
    tronWeb: null,

    address: null,
    shortAddress: null,

    trxBalance: null,
    fourteenBalance: null,

    error: null,
    availableWallets
  };
}

export async function disconnectWallet(appkit) {
  const adapters = resolveAdapters(appkit);

  try {
    setWalletState({
      connecting: false,
      error: null
    });

    if (appkit && typeof appkit.closeWalletPicker === 'function') {
      try {
        appkit.closeWalletPicker();
      } catch (_) {}
    }

    if (appkit && typeof appkit.disconnect === 'function') {
      try {
        await appkit.disconnect();
      } catch (error) {
        console.warn('[4TEEN] appkit.disconnect failed', error);
      }
    }

    for (const adapter of adapters) {
      await safeDisconnectAdapter(adapter);

      if (isWalletConnectAdapter(adapter)) {
        clearWalletConnectStorage();
      }
    }

    if (appkit) {
      try {
        appkit.connectedAdapter = null;
      } catch (_) {}
    }

    clearRuntimeCaches();
    clearInjectedWalletHints();
    clearWalletConnectStorage();
  } finally {
    resetWalletState();

    const availableWallets = buildAvailableWallets(adapters);

    setWalletState(buildDisconnectedState(availableWallets));
  }

  return { ok: true };
}
