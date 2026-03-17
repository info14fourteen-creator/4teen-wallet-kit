import { resetWalletState, setWalletState } from '../../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
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
    'unknown'
  );
}

function isWalletConnectAdapter(adapter) {
  const name = String(resolveAdapterName(adapter)).toLowerCase();
  return name === 'walletconnect';
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
  if (typeof window === 'undefined') return;

  const storageTargets = [];

  try {
    if (window.localStorage) storageTargets.push(window.localStorage);
  } catch {}

  try {
    if (window.sessionStorage) storageTargets.push(window.sessionStorage);
  } catch {}

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
    } catch {}
  }
}

function clearRuntimeCaches() {
  const win = getWindowSafe();
  if (!win) return;

  try {
    win.__FOURTEEN_WALLETCONNECT_URI__ = null;
  } catch {}

  try {
    win.__FOURTEEN_LAST_SELECTED_WALLET__ = null;
  } catch {}

  try {
    win.__FOURTEEN_CONNECT_IN_PROGRESS__ = false;
  } catch {}

  try {
    win.__FOURTEEN_ACTIVE_CONNECT_PROMISE__ = null;
  } catch {}

  try {
    win.__FOURTEEN_SELECTED_WALLET_ID__ = null;
  } catch {}

  try {
    win.__FOURTEEN_AUTO_CONNECT_LOCK__ = false;
  } catch {}
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
    } catch {}

    try {
      if ('selectedAddress' in target) {
        target.selectedAddress = null;
      }
    } catch {}

    try {
      if ('address' in target && typeof target.address === 'string') {
        target.address = null;
      }
    } catch {}
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

export async function disconnectWallet(appkit) {
  try {
    setWalletState({
      connecting: false,
      error: null
    });

    if (appkit && typeof appkit.closeWalletPicker === 'function') {
      try {
        appkit.closeWalletPicker();
      } catch {}
    }

    if (appkit?.disconnect && typeof appkit.disconnect === 'function') {
      try {
        await appkit.disconnect();
      } catch (error) {
        console.warn('[4TEEN] appkit.disconnect failed', error);
      }
    }

    const adapters = resolveAdapters(appkit);

    for (const adapter of adapters) {
      await safeDisconnectAdapter(adapter);

      if (isWalletConnectAdapter(adapter)) {
        clearWalletConnectStorage();
      }
    }

    if (appkit) {
      try {
        appkit.connectedAdapter = null;
      } catch {}
    }

    clearRuntimeCaches();
    clearInjectedWalletHints();
    clearWalletConnectStorage();
  } finally {
    resetWalletState();

    setWalletState({
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
      error: null
    });

    const adapters = resolveAdapters(appkit);
    const availableWallets = adapters.map((adapter) => ({
      id: resolveAdapterName(adapter),
      name: resolveAdapterName(adapter),
      readyState: adapter?.readyState || 'Unknown',
      connected: false
    }));

    setWalletState({
      availableWallets
    });
  }

  return { ok: true };
}
