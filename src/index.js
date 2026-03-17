import { initWalletKit } from './services/wallet/initWalletKit.js';
import { connectWallet } from './services/wallet/connectWallet.js';
import { disconnectWallet } from './services/wallet/disconnectWallet.js';
import { restoreSession } from './services/wallet/restoreSession.js';
import { refreshAllBalances } from './services/balances/refreshAllBalances.js';
import { getWalletState, subscribeWalletState } from './core/store/walletStore.js';

let appkit = null;
let tronAdapter = null;

export function initFourteenConnect({ projectId }) {
  const init = initWalletKit({ projectId }) || {};

  appkit = init.appkit || null;
  tronAdapter = init.tronAdapter || null;

  console.log('[4TEEN] initFourteenConnect', {
    hasAppkit: !!appkit,
    hasTronAdapter: !!tronAdapter
  });

  if (appkit) {
    restoreSession(appkit).catch((error) => {
      console.error('[4TEEN] restoreSession failed', error);
    });
  } else {
    console.error('[4TEEN] initWalletKit did not return appkit');
  }

  return {
    connect: () => connectWallet(appkit),
    disconnect: () => disconnectWallet(appkit),
    restore: () => restoreSession(appkit),
    refreshBalances: () => refreshAllBalances(),
    getState: () => getWalletState(),
    subscribe: (listener) => subscribeWalletState(listener),
    getAppkit: () => appkit,
    getTronAdapter: () => tronAdapter
  };
}

export { mountWalletButton } from './ui/walletButton.js';

export {
  initDebugOverlay,
  debugOverlayLog,
  showDebugOverlay,
  hideDebugOverlay
} from './debug/debugOverlay.js';
