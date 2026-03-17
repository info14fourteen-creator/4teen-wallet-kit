const DEFAULT_STATE = {
  initialized: false,
  connecting: false,
  connected: false,

  walletId: null,
  walletName: null,
  activeWalletId: null,
  activeWalletName: null,

  address: null,
  shortAddress: null,

  tronWeb: null,
  provider: null,

  trxBalance: null,
  fourteenBalance: null,

  error: null
};

let walletState = { ...DEFAULT_STATE };
const listeners = new Set();

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
  return { ...walletState };
}

export function setWalletState(patch = {}) {
  walletState = {
    ...walletState,
    ...patch
  };

  emitWalletState();
  return getWalletState();
}

export function resetWalletState() {
  walletState = { ...DEFAULT_STATE };
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
