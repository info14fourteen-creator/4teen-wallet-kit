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

function getAdapterKey(adapter) {
  return getAdapterId(adapter) || getAdapterName(adapter) || 'Wallet';
}

function applyConnectedAdapterState(adapter) {
  const adapterKey = getAdapterKey(adapter);

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

  let lastConnectAt = 0;
  let lastAccountsChangedAt = 0;
  let lastDisconnectAt = 0;
  let lastConnectedAdapterKey = null;
  let lastAccountsAdapterKey = null;

  function shouldIgnoreDuplicate(type, adapterLike, windowMs = 1200) {
    const now = Date.now();
    const adapterKey = getAdapterKey(adapterLike);

    if (type === 'connect') {
      const duplicate =
        lastConnectedAdapterKey === adapterKey &&
        now - lastConnectAt < windowMs;

      lastConnectedAdapterKey = adapterKey;
      lastConnectAt = now;
      return duplicate;
    }

    if (type === 'accountsChanged') {
      const duplicate =
        lastAccountsAdapterKey === adapterKey &&
        now - lastAccountsChangedAt < windowMs;

      lastAccountsAdapterKey = adapterKey;
      lastAccountsChangedAt = now;
      return duplicate;
    }

    if (type === 'disconnect') {
      const duplicate = now - lastDisconnectAt < windowMs;
      lastDisconnectAt = now;
      return duplicate;
    }

    return false;
  }

  tryBindEvent(adapter, 'readyStateChanged', () => {
    safeCall(refreshAvailableWallets);

    if (safeCall(isWalletBrowser)) {
      safeCall(scheduleAutoConnect, 120);
    }

    safeCall(onReadyStateChanged);
  });

  tryBindEvent(adapter, 'connect', () => {
    const normalized = safeCall(resolveConnectedAdapter) || adapter;

    if (shouldIgnoreDuplicate('connect', normalized, 1500)) {
      return;
    }

    const state = getWalletState();
    const normalizedKey = getAdapterKey(normalized);
    const alreadySameAdapter =
      state.connected &&
      (state.activeWalletId === normalizedKey || state.selectedWalletId === normalizedKey);

    if (kit) {
      kit.connectedAdapter = normalized || adapter;
    }

    applyConnectedAdapterState(normalized || adapter);
    safeCall(refreshAvailableWallets);

    if (!alreadySameAdapter) {
      safeCall(scheduleRestore, 100);
    }

    safeCall(onConnected, normalized || adapter);
  });

  tryBindEvent(adapter, 'disconnect', () => {
    if (shouldIgnoreDuplicate('disconnect', adapter, 1000)) {
      return;
    }

    clearConnectedAdapterStateIfMatches(adapter);

    if (
      kit?.connectedAdapter &&
      matchesAdapter(adapter, getAdapterId(kit.connectedAdapter) || getAdapterName(kit.connectedAdapter))
    ) {
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
    const normalized = safeCall(resolveConnectedAdapter) || adapter;

    if (shouldIgnoreDuplicate('accountsChanged', normalized, 1500)) {
      return;
    }

    const state = getWalletState();
    const normalizedKey = getAdapterKey(normalized);
    const alreadySameAdapter =
      state.connected &&
      (state.activeWalletId === normalizedKey || state.selectedWalletId === normalizedKey);

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

    if (!alreadySameAdapter) {
      safeCall(scheduleRestore, 120);
    }

    safeCall(onAccountsChanged, normalized || adapter);
  });
}
