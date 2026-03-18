const DEFAULT_STATE = {
  lifecycle: {
    initialized: false,
    connecting: false,
    connected: false
  },

  wallet: {
    id: null,
    name: null,
    activeId: null,
    activeName: null,
    selectedId: null
  },

  account: {
    address: null,
    shortAddress: null
  },

  runtime: {
    tronWeb: null,
    provider: null
  },

  balances: {
    trx: null,
    fourteen: null
  },

  ui: {
    walletPickerOpen: false,
    availableWallets: []
  },

  status: {
    error: null
  }
};

let walletState = createInitialState();
const listeners = new Set();

function createInitialState() {
  return {
    lifecycle: { ...DEFAULT_STATE.lifecycle },
    wallet: { ...DEFAULT_STATE.wallet },
    account: { ...DEFAULT_STATE.account },
    runtime: { ...DEFAULT_STATE.runtime },
    balances: { ...DEFAULT_STATE.balances },
    ui: {
      walletPickerOpen: DEFAULT_STATE.ui.walletPickerOpen,
      availableWallets: [...DEFAULT_STATE.ui.availableWallets]
    },
    status: { ...DEFAULT_STATE.status }
  };
}

function cloneState(state) {
  return {
    lifecycle: { ...state.lifecycle },
    wallet: { ...state.wallet },
    account: { ...state.account },
    runtime: { ...state.runtime },
    balances: { ...state.balances },
    ui: {
      walletPickerOpen: !!state.ui?.walletPickerOpen,
      availableWallets: Array.isArray(state.ui?.availableWallets)
        ? [...state.ui.availableWallets]
        : []
    },
    status: { ...state.status }
  };
}

function buildPublicState(state) {
  const snapshot = cloneState(state);

  return {
    ...snapshot,

    initialized: snapshot.lifecycle.initialized,
    connecting: snapshot.lifecycle.connecting,
    connected: snapshot.lifecycle.connected,

    walletId: snapshot.wallet.id,
    walletName: snapshot.wallet.name,
    activeWalletId: snapshot.wallet.activeId,
    activeWalletName: snapshot.wallet.activeName,
    selectedWalletId: snapshot.wallet.selectedId,

    address: snapshot.account.address,
    shortAddress: snapshot.account.shortAddress,

    tronWeb: snapshot.runtime.tronWeb,
    provider: snapshot.runtime.provider,

    trxBalance: snapshot.balances.trx,
    fourteenBalance: snapshot.balances.fourteen,

    walletPickerOpen: snapshot.ui.walletPickerOpen,
    availableWallets: [...snapshot.ui.availableWallets],

    error: snapshot.status.error
  };
}

function emitWalletState() {
  const snapshot = getWalletState();

  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      console.error('[4TEEN] walletStore listener failed', error);
    }
  });
}

function normalizeLegacyPatch(patch = {}) {
  const normalized = {};

  if (patch.lifecycle) {
    normalized.lifecycle = patch.lifecycle;
  }

  if (patch.wallet) {
    normalized.wallet = patch.wallet;
  }

  if (patch.account) {
    normalized.account = patch.account;
  }

  if (patch.runtime) {
    normalized.runtime = patch.runtime;
  }

  if (patch.balances) {
    normalized.balances = patch.balances;
  }

  if (patch.ui) {
    normalized.ui = patch.ui;
  }

  if (patch.status) {
    normalized.status = patch.status;
  }

  if (
    'initialized' in patch ||
    'connecting' in patch ||
    'connected' in patch
  ) {
    normalized.lifecycle = {
      ...(normalized.lifecycle || {}),
      ...('initialized' in patch ? { initialized: patch.initialized } : {}),
      ...('connecting' in patch ? { connecting: patch.connecting } : {}),
      ...('connected' in patch ? { connected: patch.connected } : {})
    };
  }

  if (
    'walletId' in patch ||
    'walletName' in patch ||
    'activeWalletId' in patch ||
    'activeWalletName' in patch ||
    'selectedWalletId' in patch
  ) {
    normalized.wallet = {
      ...(normalized.wallet || {}),
      ...('walletId' in patch ? { id: patch.walletId } : {}),
      ...('walletName' in patch ? { name: patch.walletName } : {}),
      ...('activeWalletId' in patch ? { activeId: patch.activeWalletId } : {}),
      ...('activeWalletName' in patch ? { activeName: patch.activeWalletName } : {}),
      ...('selectedWalletId' in patch ? { selectedId: patch.selectedWalletId } : {})
    };
  }

  if (
    'address' in patch ||
    'shortAddress' in patch
  ) {
    normalized.account = {
      ...(normalized.account || {}),
      ...('address' in patch ? { address: patch.address } : {}),
      ...('shortAddress' in patch ? { shortAddress: patch.shortAddress } : {})
    };
  }

  if (
    'tronWeb' in patch ||
    'provider' in patch
  ) {
    normalized.runtime = {
      ...(normalized.runtime || {}),
      ...('tronWeb' in patch ? { tronWeb: patch.tronWeb } : {}),
      ...('provider' in patch ? { provider: patch.provider } : {})
    };
  }

  if (
    'trxBalance' in patch ||
    'fourteenBalance' in patch
  ) {
    normalized.balances = {
      ...(normalized.balances || {}),
      ...('trxBalance' in patch ? { trx: patch.trxBalance } : {}),
      ...('fourteenBalance' in patch ? { fourteen: patch.fourteenBalance } : {})
    };
  }

  if (
    'walletPickerOpen' in patch ||
    'availableWallets' in patch
  ) {
    normalized.ui = {
      ...(normalized.ui || {}),
      ...('walletPickerOpen' in patch ? { walletPickerOpen: patch.walletPickerOpen } : {}),
      ...('availableWallets' in patch
        ? { availableWallets: Array.isArray(patch.availableWallets) ? patch.availableWallets : [] }
        : {})
    };
  }

  if ('error' in patch) {
    normalized.status = {
      ...(normalized.status || {}),
      error: patch.error
    };
  }

  return normalized;
}

function applyPatch(patch = {}) {
  const normalized = normalizeLegacyPatch(patch);

  walletState = {
    lifecycle: {
      ...walletState.lifecycle,
      ...(normalized.lifecycle || {})
    },
    wallet: {
      ...walletState.wallet,
      ...(normalized.wallet || {})
    },
    account: {
      ...walletState.account,
      ...(normalized.account || {})
    },
    runtime: {
      ...walletState.runtime,
      ...(normalized.runtime || {})
    },
    balances: {
      ...walletState.balances,
      ...(normalized.balances || {})
    },
    ui: {
      ...walletState.ui,
      ...(normalized.ui || {}),
      availableWallets:
        'availableWallets' in (normalized.ui || {})
          ? Array.isArray(normalized.ui.availableWallets)
            ? [...normalized.ui.availableWallets]
            : []
          : [...walletState.ui.availableWallets]
    },
    status: {
      ...walletState.status,
      ...(normalized.status || {})
    }
  };

  emitWalletState();
  return getWalletState();
}

export function getWalletState() {
  return buildPublicState(walletState);
}

export function resetWalletState() {
  walletState = createInitialState();
  emitWalletState();
  return getWalletState();
}

export function subscribeWalletState(listener) {
  if (typeof listener !== 'function') {
    throw new Error('subscribeWalletState: listener must be a function');
  }

  listeners.add(listener);

  try {
    listener(getWalletState());
  } catch (error) {
    console.error('[4TEEN] walletStore immediate listener call failed', error);
  }

  return () => {
    listeners.delete(listener);
  };
}

export function patchWalletState(patch = {}) {
  return applyPatch(patch);
}

export function setWalletState(patch = {}) {
  return applyPatch(patch);
}

export function setWalletLifecycle(patch = {}) {
  return applyPatch({ lifecycle: patch });
}

export function setWalletIdentity(patch = {}) {
  return applyPatch({ wallet: patch });
}

export function setWalletAccount(patch = {}) {
  return applyPatch({ account: patch });
}

export function setWalletRuntime(patch = {}) {
  return applyPatch({ runtime: patch });
}

export function setWalletBalances(patch = {}) {
  return applyPatch({ balances: patch });
}

export function setWalletUi(patch = {}) {
  return applyPatch({ ui: patch });
}

export function setWalletError(error = null) {
  return applyPatch({
    status: {
      error
    }
  });
}

export function clearWalletError() {
  return applyPatch({
    status: {
      error: null
    }
  });
}
