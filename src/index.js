import './ui/walletButton.css';

import { initWalletKit } from './services/wallet/initWalletKit.js';
import { connectWallet } from './services/wallet/connectWallet.js';
import { disconnectWallet } from './services/wallet/disconnectWallet.js';
import { restoreSession } from './services/wallet/restoreSession.js';
import { mountWalletButton } from './ui/walletButton.js';
import { getWalletState, subscribeWalletState } from './core/store/walletStore.js';
import { refreshAllBalances } from './services/balances/refreshAllBalances.js';

let appkit = null;

export function initFourteenConnect({ projectId, buttonTarget }) {
  appkit = initWalletKit({ projectId });

  if (buttonTarget) {
    mountWalletButton(buttonTarget, {
      onConnectClick: async () => {
        await connectWallet(appkit);
      }
    });
  }

  restoreSession(appkit).catch(console.error);

  return {
    connect: () => connectWallet(appkit),
    disconnect: () => disconnectWallet(appkit),
    refreshBalances: () => refreshAllBalances(),
    getState: () => getWalletState(),
    subscribe: (listener) => subscribeWalletState(listener)
  };
}
