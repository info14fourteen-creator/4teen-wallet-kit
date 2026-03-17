import './polyfills/node.js';
import { initWalletKit } from './services/wallet/initWalletKit.js';
import { connectWallet } from './services/wallet/connectWallet.js';
import { disconnectWallet } from './services/wallet/disconnectWallet.js';
import { restoreSession } from './services/wallet/restoreSession.js';
import { refreshAllBalances } from './services/balances/refreshAllBalances.js';
import { getWalletState, subscribeWalletState } from './core/store/walletStore.js';

let appkit = null;
let tronAdapter = null;

function getAppkitSafe() {
  if (!appkit) {
    throw new Error('Wallet kit not initialized');
  }
  return appkit;
}

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
    connect(walletId = null) {
      return connectWallet(getAppkitSafe(), walletId);
    },

    disconnect() {
      return disconnectWallet(getAppkitSafe());
    },

    restore() {
      return restoreSession(getAppkitSafe());
    },

    refreshBalances() {
      return refreshAllBalances();
    },

    getState() {
      return getWalletState();
    },

    subscribe(listener) {
      return subscribeWalletState(listener);
    },

    getAppkit() {
      return appkit;
    },

    getTronAdapter() {
      return tronAdapter;
    }
  };
}

export { mountWalletButton } from './ui/walletButton.js';

export {
  initDebugOverlay,
  debugOverlayLog,
  showDebugOverlay,
  hideDebugOverlay
} from './debug/debugOverlay.js';

export {
  showNotice,
  hideNotice,
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
} from './ui/noticeCenter.js';
