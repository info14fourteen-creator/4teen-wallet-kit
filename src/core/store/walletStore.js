const listeners = new Set();

const state = {
  initialized: false,
  connecting: false,
  connected: false,
  walletId: null,
  walletName: null,
  address: null,
  shortAddress: null,
  provider: null,
  adapter: null,
  tronWeb: null,
  trxBalance: null,
  fourteenBalance: null,
  error: null,
  availableWallets: [],
  selectedWalletId: null,
  activeWalletId: null,
  walletPickerOpen: false
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
    provider: null,
    adapter: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null,
    error: null,
    selectedWalletId: null,
    activeWalletId: null,
    walletPickerOpen: false
  });
}

export function subscribeWalletState(listener) {
  listeners.add(listener);
  listener(getWalletState());
  return () => listeners.delete(listener);
}
