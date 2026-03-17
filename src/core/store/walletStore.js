const listeners = new Set();

const state = {
  initialized: false,
  connecting: false,
  connected: false,
  walletId: null,
  walletName: null,
  address: null,
  shortAddress: null,
  tronWeb: null,
  provider: null,
  trxBalance: null,
  fourteenBalance: null,
  error: null
};

export function getWalletState() {
  return { ...state };
}

export function setWalletState(patch = {}) {
  Object.assign(state, patch);
  for (const listener of listeners) {
    listener(getWalletState());
  }
}

export function resetWalletState() {
  setWalletState({
    connecting: false,
    connected: false,
    walletId: null,
    walletName: null,
    address: null,
    shortAddress: null,
    tronWeb: null,
    provider: null,
    trxBalance: null,
    fourteenBalance: null,
    error: null
  });
}

export function subscribeWalletState(listener) {
  listeners.add(listener);
  listener(getWalletState());
  return () => listeners.delete(listener);
}
