import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

function safeCall(fn, ...args) {
  if (typeof fn !== 'function') return;
  try {
    return fn(...args);
  } catch (error) {
    console.error('[4TEEN] bindAdapterEvents callback failed', error);
  }
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
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

function matchesAdapter(adapter, target) {
  if (!adapter || !target) return false;

  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);

  return target === adapterName || target === adapterId;
}

function applyConnectedAdapterState(adapter) {
  const adapterKey = getAdapterId(adapter) || getAdapterName(adapter);

  setWalletState({
    activeWalletId: adapterKey,
    selectedWalletId: adapterKey,
    walletPickerOpen: false
  });
}

function clearConnectedAdapterStateIfMatches(adapter) {
  const state = getWalletState();

  if (!matchesAdapter(adapter, state.activeWalletId)) {
    return;
  }

  setWalletState({
    activeWalletId: null,
    selectedWalletId: null
  });
}

function tryBindEvent(adapter, eventName, handler) {
  if (!adapter || typeof adapter.on !== 'function') {
    return;
  }

  try {
    adapter.on(eventName, handler);
  } catch (error) {
    console.error(`[4TEEN] failed to bind ${eventName} event`, {
      adapter: getAdapterName(adapter),
      error
    });
  }
}

/**
 * Binds adapter events to runtime actions.
 *
 * @param {object} kit
 * @param {object} adapter
 * @param {object} options
 * @param {function():void} [options.onReadyStateChanged]
 * @param {function(adapter: any):void} [options.onConnected]
 * @param {function(adapter: any):void} [options.onDisconnected]
 * @param {function(adapter: any):void} [options.onAccountsChanged]
 * @param {function(number=):void} [options.scheduleRestore]
 * @param {function(number=):void} [options.scheduleAutoConnect]
 * @param {function():boolean} [options.isWalletBrowser]
 * @param {function():any} [options.resolveConnectedAdapter]
 * @param {function():void} [options.refreshAvailableWallets]
 */
export function bindAdapterEvents(kit, adapter, options = {}) {
  const {
    onReadyStateChanged,
    onConnected,
    onDisconnected,
    onAccountsChanged,
    scheduleRestore,
    scheduleAutoConnect,
    isWalletBrowser,
    resolveConnectedAdapter,
    refreshAvailableWallets
  } = options;

  tryBindEvent(adapter, 'readyStateChanged', () => {
    safeCall(refreshAvailableWallets);

    if (safeCall(isWalletBrowser)) {
      safeCall(scheduleAutoConnect, 120);
    }

    safeCall(onReadyStateChanged);
  });

  tryBindEvent(adapter, 'connect', () => {
    const normalized = safeCall(resolveConnectedAdapter) || adapter;

    if (kit) {
      kit.connectedAdapter = normalized || adapter;
    }

    applyConnectedAdapterState(normalized || adapter);

    safeCall(refreshAvailableWallets);
    safeCall(scheduleRestore, 100);
    safeCall(onConnected, normalized || adapter);
  });

  tryBindEvent(adapter, 'disconnect', () => {
    clearConnectedAdapterStateIfMatches(adapter);

    if (kit?.connectedAdapter && matchesAdapter(adapter, getAdapterId(kit.connectedAdapter) || getAdapterName(kit.connectedAdapter))) {
      kit.connectedAdapter = null;
    }

    safeCall(refreshAvailableWallets);
    safeCall(scheduleRestore, 120);

    if (safeCall(isWalletBrowser)) {
      safeCall(scheduleAutoConnect, 250);
    }

    safeCall(onDisconnected, adapter);
  });

  tryBindEvent(adapter, 'accountsChanged', () => {
    const normalized = safeCall(resolveConnectedAdapter) || null;

    if (kit) {
      kit.connectedAdapter = normalized;
    }

    if (!normalized) {
      setWalletState({
        activeWalletId: null,
        selectedWalletId: null
      });
    }

    safeCall(refreshAvailableWallets);
    safeCall(scheduleRestore, 120);
    safeCall(onAccountsChanged, normalized || adapter);
  });
}
