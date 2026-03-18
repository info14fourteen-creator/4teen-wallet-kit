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
    activeName: null
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
    status: { ...DEFAULT_STATE.status }
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

export function getWalletState() {
  return {
    lifecycle: { ...walletState.lifecycle },
    wallet: { ...walletState.wallet },
    account: { ...walletState.account },
    runtime: { ...walletState.runtime },
    balances: { ...walletState.balances },
    status: { ...walletState.status }
  };
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
  walletState = {
    lifecycle: {
      ...walletState.lifecycle,
      ...(patch.lifecycle || {})
    },
    wallet: {
      ...walletState.wallet,
      ...(patch.wallet || {})
    },
    account: {
      ...walletState.account,
      ...(patch.account || {})
    },
    runtime: {
      ...walletState.runtime,
      ...(patch.runtime || {})
    },
    balances: {
      ...walletState.balances,
      ...(patch.balances || {})
    },
    status: {
      ...walletState.status,
      ...(patch.status || {})
    }
  };

  emitWalletState();
  return getWalletState();
}

export function setWalletLifecycle(patch = {}) {
  return patchWalletState({ lifecycle: patch });
}

export function setWalletIdentity(patch = {}) {
  return patchWalletState({ wallet: patch });
}

export function setWalletAccount(patch = {}) {
  return patchWalletState({ account: patch });
}

export function setWalletRuntime(patch = {}) {
  return patchWalletState({ runtime: patch });
}

export function setWalletBalances(patch = {}) {
  return patchWalletState({ balances: patch });
}

export function setWalletError(error = null) {
  return patchWalletState({
    status: {
      error
    }
  });
}

export function clearWalletError() {
  return patchWalletState({
    status: {
      error: null
    }
  });
}
