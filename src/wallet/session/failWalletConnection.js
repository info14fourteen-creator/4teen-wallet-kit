import { setWalletState } from '../../core/store/walletStore.js';

function buildDisconnectedPatch(errorMessage = 'Wallet connection failed') {
  return {
    connecting: false,
    connected: false,
    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,
    address: null,
    shortAddress: null,
    provider: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null,
    walletPickerOpen: true,
    error: errorMessage
  };
}

export function failWalletConnection(error) {
  const message = error?.message || 'Wallet connection failed';

  console.error('[4TEEN] connectWallet failed', error);

  setWalletState(buildDisconnectedPatch(message));

  return {
    ok: false,
    session: null,
    error
  };
}
