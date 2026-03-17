import './polyfills/node.js';
import { initWalletKit } from './services/wallet/initWalletKit.js';
import { connectWallet } from './services/wallet/connectWallet.js';
import { disconnectWallet } from './services/wallet/disconnectWallet.js';
import { restoreSession } from './services/wallet/restoreSession.js';
import { refreshAllBalances } from './services/balances/refreshAllBalances.js';
import { getWalletState, subscribeWalletState } from './core/store/walletStore.js';

let appkit = null;
let tronAdapter = null;
let readyPromise = null;

async function ensureWalletKit(projectId) {
  if (appkit) {
    return { appkit, tronAdapter };
  }

  if (readyPromise) {
    return readyPromise;
  }

  readyPromise = (async () => {
    const init = await Promise.resolve(initWalletKit({ projectId })) || {};

    appkit = init.appkit || null;
    tronAdapter = init.tronAdapter || null;

    console.log('[4TEEN] initFourteenConnect', {
      hasAppkit: !!appkit,
      hasTronAdapter: !!tronAdapter
    });

    if (!appkit) {
      throw new Error('initWalletKit did not return appkit');
    }

    return { appkit, tronAdapter };
  })();

  try {
    return await readyPromise;
  } catch (error) {
    readyPromise = null;
    console.error('[4TEEN] wallet kit initialization failed', error);
    throw error;
  }
}

export function initFourteenConnect({ projectId }) {
  ensureWalletKit(projectId)
    .then(({ appkit }) => {
      console.log('[4TEEN] Wallet kit ready');

      restoreSession(appkit).catch((error) => {
        console.error('[4TEEN] restoreSession failed', error);
      });
    })
    .catch((error) => {
      console.error('[4TEEN] initWalletKit did not return appkit', error);
    });

  return {
    async connect(walletId = null) {
      const { appkit } = await ensureWalletKit(projectId);
      return connectWallet(appkit, walletId);
    },

    async disconnect() {
      const { appkit } = await ensureWalletKit(projectId);
      return disconnectWallet(appkit);
    },

    async restore() {
      const { appkit } = await ensureWalletKit(projectId);
      return restoreSession(appkit);
    },

    async refreshBalances() {
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
    },

    whenReady() {
      return ensureWalletKit(projectId);
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
