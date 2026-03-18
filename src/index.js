import './polyfills/node.js';
import './ui/walletButton.css';
import './ui/walletPicker.css';
import './ui/noticeCenter.css';

import { initWalletKit as initWalletKitInternal } from './wallet/services/initWalletKit.js';
import { connectWallet } from './wallet/actions/connectWallet.js';
import { disconnectWallet } from './wallet/actions/disconnectWallet.js';
import { restoreWalletSession } from './wallet/actions/restoreWalletSession.js';
import { refreshWalletBalances } from './wallet/actions/refreshWalletBalances.js';

import {
  getWalletState,
  setWalletState,
  patchWalletState,
  resetWalletState,
  subscribeWalletState,
  setWalletLifecycle,
  setWalletIdentity,
  setWalletAccount,
  setWalletRuntime,
  setWalletBalances,
  setWalletUi,
  setWalletError,
  clearWalletError
} from './core/store/walletStore.js';

import {
  shortenAddress,
  isHexAddress as isHexWalletAddress,
  isTronAddress,
  isUsableAddress as isUsableWalletAddress,
  normalizeAddress as normalizeWalletAddress,
  extractAddressFromPayload as extractWalletAddressFromPayload
} from './core/utils/address.js';

import { openWalletPicker } from './ui/wallet/openWalletPicker.js';
import { mountWalletButton } from './ui/walletButton.js';

import {
  initDebugOverlay,
  debugOverlayLog,
  showDebugOverlay,
  hideDebugOverlay
} from './debug/debugOverlay.js';

import {
  showNotice,
  hideNotice,
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
} from './ui/noticeCenter.js';

import { createWalletAdapters } from './adapters/createAdapters.js';
import { connectTrustFallback, isTrustWalletBrowser } from './adapters/trustFallback.js';

import {
  isOkxBrowser,
  isBinanceBrowser,
  isTronLinkBrowser,
  isTrustWalletBrowser as isTrustBrowser,
  isMetaMaskBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  detectBrowserWalletName,
  isWalletBrowser,
  getBrowserDetectionSnapshot
} from './adapters/shared/browserDetection.js';

import {
  isUsableAddress,
  isHexAddress,
  normalizeAddress,
  extractAddressFromPayload,
  resolveAddress,
  readAddressFromAdapter
} from './adapters/shared/addressResolver.js';

import {
  getProviderCandidates,
  providerMatchesWallet,
  pickBestProvider
} from './adapters/shared/providerResolver.js';

import {
  tryProviderRequest,
  tryRequestAccounts,
  forceBindTronWeb,
  waitForAddress,
  requestTronLinkAccounts
} from './adapters/shared/accountRequests.js';

import {
  createReadonlyTronWeb,
  getDefaultReadonlyTronWeb
} from './adapters/shared/createReadonlyTronWeb.js';

import {
  readTrxBalance,
  safeReadTrxBalance
} from './adapters/shared/trxBalanceReader.js';

import {
  readTokenBalance,
  readTokenBalanceViaTrigger,
  safeReadTokenBalance
} from './adapters/shared/tokenBalanceReader.js';

import {
  getSigningReadiness,
  assertSigningCapability,
  getResolvedSigningProvider,
  getResolvedSigningTronWeb,
  getSigningCapabilities
} from './adapters/shared/signingReadiness.js';

import {
  pickWalletAdapter,
  getWalletAdapterById,
  listWalletAdapters
} from './adapters/registry/pickWalletAdapter.js';

import {
  getWalletRegistry,
  WALLET_REGISTRY
} from './adapters/registry/walletRegistry.js';

import {
  getAvailableDrivers,
  listAvailableDriverIds
} from './adapters/registry/getAvailableDrivers.js';

import { getDriverMap } from './adapters/registry/getDriverMap.js';

import {
  getWalletById,
  getDriverIdByWallet,
  getDriverById
} from './adapters/registry/getDriverById.js';

import {
  createTronLinkDriver,
  tronLinkDriver
} from './adapters/drivers/tronlink/index.js';

import {
  createOkxDriver,
  okxDriver
} from './adapters/drivers/okx/index.js';

import {
  createBinanceDriver,
  binanceDriver
} from './adapters/drivers/binance/index.js';

import {
  createTokenPocketDriver,
  tokenPocketDriver
} from './adapters/drivers/tokenpocket/index.js';

import {
  createBitgetDriver,
  bitgetDriver
} from './adapters/drivers/bitget/index.js';

import {
  createMetaMaskDriver,
  metaMaskDriver
} from './adapters/drivers/metamask/index.js';

import { bindAdapterEvents } from './wallet/runtime/bindAdapterEvents.js';
import { waitAdaptersReady } from './wallet/runtime/waitAdaptersReady.js';
import { refreshAvailableWallets } from './wallet/runtime/refreshAvailableWallets.js';
import { buildWalletKitRuntime } from './wallet/runtime/buildWalletKitRuntime.js';
import { createWalletScheduler } from './wallet/runtime/walletScheduler.js';
import {
  resolveAutoWallet,
  shouldAutoConnectWallet,
  getWalletEnvironmentSnapshot
} from './wallet/runtime/resolveAutoWallet.js';

import { createWalletManager } from './wallet/core/walletManager.js';

import { finalizeWalletConnection } from './wallet/session/finalizeWalletConnection.js';
import { failWalletConnection } from './wallet/session/failWalletConnection.js';

import { refreshAllBalances } from './services/balances/refreshAllBalances.js';

import {
  collectWalletDiagnostics,
  runWalletDiagnostics,
  printWalletDiagnostics,
  printAndRunWalletDiagnostics
} from './diagnostics/walletDiagnostics.js';

import {
  assertWalletSigning,
  printWalletSigningDiagnostics
} from './diagnostics/assertWalletSigning.js';

let appkit = null;
let tronAdapter = null;
let initPromise = null;
let startupSessionPromise = null;

async function runStartupSessionFlow(appkitInstance) {
  if (!appkitInstance) {
    return {
      ok: false,
      started: false,
      reason: 'missing_appkit'
    };
  }

  const autoWallet = resolveAutoWallet();

  if (autoWallet.shouldAutoConnect && autoWallet.walletId) {
    try {
      const result = await connectWallet(appkitInstance, autoWallet.walletId);

      if (result?.ok) {
        return {
          ok: true,
          started: true,
          mode: 'auto_connect',
          walletId: autoWallet.walletId,
          result
        };
      }
    } catch (error) {
      console.warn('[4TEEN] startup auto connect failed', error);
    }
  }

  try {
    const result = await restoreWalletSession(appkitInstance);

    return {
      ok: !!result?.ok,
      started: true,
      mode: 'restore',
      walletId: null,
      result
    };
  } catch (error) {
    console.error('[4TEEN] restoreWalletSession failed', error);

    return {
      ok: false,
      started: true,
      mode: 'restore',
      walletId: null,
      error
    };
  }
}

async function ensureInitialized(projectId) {
  if (appkit) {
    return { appkit, tronAdapter };
  }

  if (!initPromise) {
    initPromise = initWalletKitInternal({ projectId })
      .then((result) => {
        appkit = result?.appkit || null;
        tronAdapter = result?.tronAdapter || null;

        console.log('[4TEEN] initFourteenConnect', {
          hasAppkit: !!appkit,
          hasTronAdapter: !!tronAdapter
        });

        if (appkit && !startupSessionPromise) {
          startupSessionPromise = runStartupSessionFlow(appkit).finally(() => {
            startupSessionPromise = null;
          });
        }

        if (!appkit) {
          console.error('[4TEEN] initWalletKit did not return appkit');
        }

        return { appkit, tronAdapter };
      })
      .catch((error) => {
        initPromise = null;
        throw error;
      });
  }

  return initPromise;
}

export function initFourteenConnect({ projectId }) {
  void ensureInitialized(projectId);

  return {
    connect: async (walletId = null) => {
      const { appkit } = await ensureInitialized(projectId);
      return connectWallet(appkit, walletId);
    },

    disconnect: async () => {
      const { appkit } = await ensureInitialized(projectId);
      return disconnectWallet(appkit);
    },

    restore: async () => {
      const { appkit } = await ensureInitialized(projectId);
      return restoreWalletSession(appkit);
    },

    refreshBalances: async (options = {}) => {
      const { appkit } = await ensureInitialized(projectId);
      return refreshWalletBalances(appkit, options);
    },

    refreshAllBalances: async () => {
      return refreshAllBalances();
    },

    getState: () => getWalletState(),

    subscribe: (listener) => subscribeWalletState(listener),

    getAppkit: () => appkit,

    getTronAdapter: () => tronAdapter
  };
}

export const diagnostics = {
  collectWalletDiagnostics,
  runWalletDiagnostics,
  printWalletDiagnostics,
  printAndRunWalletDiagnostics,
  assertWalletSigning,
  printWalletSigningDiagnostics
};

export { initWalletKitInternal as initWalletKit };

export { connectWallet };
export { disconnectWallet };
export { restoreWalletSession };
export { refreshWalletBalances };

export {
  getWalletState,
  setWalletState,
  patchWalletState,
  resetWalletState,
  subscribeWalletState,
  setWalletLifecycle,
  setWalletIdentity,
  setWalletAccount,
  setWalletRuntime,
  setWalletBalances,
  setWalletUi,
  setWalletError,
  clearWalletError
};

export {
  shortenAddress,
  isHexWalletAddress,
  isTronAddress,
  isUsableWalletAddress,
  normalizeWalletAddress,
  extractWalletAddressFromPayload
};

export { openWalletPicker };

export {
  mountWalletButton,
  initDebugOverlay,
  debugOverlayLog,
  showDebugOverlay,
  hideDebugOverlay
};

export {
  showNotice,
  hideNotice,
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
};

export { createWalletAdapters };
export { connectTrustFallback, isTrustWalletBrowser };

export {
  isOkxBrowser,
  isBinanceBrowser,
  isTronLinkBrowser,
  isTrustBrowser,
  isMetaMaskBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  detectBrowserWalletName,
  isWalletBrowser,
  getBrowserDetectionSnapshot
};

export {
  isUsableAddress,
  isHexAddress,
  normalizeAddress,
  extractAddressFromPayload,
  resolveAddress,
  readAddressFromAdapter
};

export {
  getProviderCandidates,
  providerMatchesWallet,
  pickBestProvider
};

export {
  tryProviderRequest,
  tryRequestAccounts,
  forceBindTronWeb,
  waitForAddress,
  requestTronLinkAccounts
};

export {
  createReadonlyTronWeb,
  getDefaultReadonlyTronWeb
};

export {
  readTrxBalance,
  safeReadTrxBalance
};

export {
  readTokenBalance,
  readTokenBalanceViaTrigger,
  safeReadTokenBalance
};

export {
  getSigningReadiness,
  assertSigningCapability,
  getResolvedSigningProvider,
  getResolvedSigningTronWeb,
  getSigningCapabilities
};

export {
  pickWalletAdapter,
  getWalletAdapterById,
  listWalletAdapters
};

export {
  getWalletRegistry,
  WALLET_REGISTRY
};

export {
  getAvailableDrivers,
  listAvailableDriverIds
};

export { getDriverMap };

export {
  getWalletById,
  getDriverIdByWallet,
  getDriverById
};

export {
  createTronLinkDriver,
  tronLinkDriver
};

export {
  createOkxDriver,
  okxDriver
};

export {
  createBinanceDriver,
  binanceDriver
};

export {
  createTokenPocketDriver,
  tokenPocketDriver
};

export {
  createBitgetDriver,
  bitgetDriver
};

export {
  createMetaMaskDriver,
  metaMaskDriver
};

export { bindAdapterEvents };
export { waitAdaptersReady };
export { refreshAvailableWallets };
export { buildWalletKitRuntime };
export { createWalletScheduler };
export {
  resolveAutoWallet,
  shouldAutoConnectWallet,
  getWalletEnvironmentSnapshot
};

export { createWalletManager };

export { finalizeWalletConnection };
export { failWalletConnection };

export { refreshAllBalances };

export {
  collectWalletDiagnostics,
  runWalletDiagnostics,
  printWalletDiagnostics,
  printAndRunWalletDiagnostics
};

export {
  assertWalletSigning,
  printWalletSigningDiagnostics
};
