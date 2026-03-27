# 4teen-wallet-kit — ENTRYPOINTS AND EXPORTS

Generated: 2026-03-27T23:36:27.346Z
Repository: info14fourteen-creator/4teen-wallet-kit
Branch: main

## Snapshot rules

- This is a curated AI snapshot, not a full raw dump.
- Files are grouped for easier reading.
- Every file in this snapshot belongs to the repository shown above.

## Included files

- 4teen-wallet-kit :: src/index.js

---

## FILE: 4teen-wallet-kit :: src/index.js

```js
// ==========================
// CORE STYLES & POLYFILLS
// ==========================
import './polyfills/node.js';
import './ui/walletButton.css';
import './ui/walletPicker.css';
import './ui/noticeCenter.css';


// ==========================
// WALLET CORE ACTIONS
// ==========================
import { initWalletKit as initWalletKitInternal } from './wallet/services/initWalletKit.js';
import { connectWallet } from './wallet/actions/connectWallet.js';
import { disconnectWallet } from './wallet/actions/disconnectWallet.js';
import { restoreWalletSession } from './wallet/actions/restoreWalletSession.js';
import { refreshWalletBalances } from './wallet/actions/refreshWalletBalances.js';


// ==========================
// WALLET STATE STORE
// ==========================
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


// ==========================
// ADDRESS UTILITIES
// ==========================
import {
  shortenAddress,
  isHexAddress as isHexWalletAddress,
  isTronAddress,
  isUsableAddress as isUsableWalletAddress,
  normalizeAddress as normalizeWalletAddress,
  extractAddressFromPayload as extractWalletAddressFromPayload
} from './core/utils/address.js';


// ==========================
// UI + WIDGETS
// ==========================
import { openWalletPicker } from './ui/wallet/openWalletPicker.js';
import { mountWalletButton } from './ui/walletButton.js';
import { mountDirectBuy } from './widgets/directBuy/index.js';
import { mountUnlockTimeline } from './widgets/unlockTimeline/index.js';
import { mountLiquidityController } from './widgets/liquidityController/index.js';
import { mountSwap } from './widgets/swap/index.js';
import { mountMobileShell } from './widgets/mobileShell/index.js';
import { mountAmbassadorRegister } from './widgets/ambassadorRegister/index.js';
import { mountAmbassadorCabinet } from './widgets/ambassadorCabinet/index.js';


// ==========================
// DEBUG & NOTIFICATIONS
// ==========================
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


// ==========================
// ADAPTER SYSTEM
// ==========================
import { createWalletAdapters } from './adapters/createAdapters.js';

import {
  isOkxBrowser,
  isBinanceBrowser,
  isTronLinkBrowser,
  isTrustWalletBrowser as isTrustBrowser,
  isMetaMaskBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  isImTokenBrowser,
  isFoxWalletBrowser,
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


// ==========================
// WALLET REGISTRY
// ==========================
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


// ==========================
// DRIVERS
// ==========================
import { createTronLinkDriver, tronLinkDriver } from './adapters/drivers/tronlink/index.js';
import { createOkxDriver, okxDriver } from './adapters/drivers/okx/index.js';
import { createBinanceDriver, binanceDriver } from './adapters/drivers/binance/index.js';
import { createTokenPocketDriver, tokenPocketDriver } from './adapters/drivers/tokenpocket/index.js';
import { createBitgetDriver, bitgetDriver } from './adapters/drivers/bitget/index.js';
import { createTrustDriver, trustDriver } from './adapters/drivers/trust/index.js';
import { createMetaMaskDriver, metaMaskDriver } from './adapters/drivers/metamask/index.js';
import { createImTokenDriver, imTokenDriver } from './adapters/drivers/imtoken/index.js';
import { createFoxWalletDriver, foxWalletDriver } from './adapters/drivers/foxwallet/index.js';
import { createWalletConnectDriver, walletConnectDriver } from './adapters/drivers/walletconnect/index.js';


// ==========================
// WALLET RUNTIME
// ==========================
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


// ==========================
// SESSION FLOW
// ==========================
import { finalizeWalletConnection } from './wallet/session/finalizeWalletConnection.js';
import { failWalletConnection } from './wallet/session/failWalletConnection.js';


// ==========================
// BALANCES
// ==========================
import { refreshAllBalances } from './services/balances/refreshAllBalances.js';


// ==========================
// DIAGNOSTICS
// ==========================
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


// ==========================
// INTERNAL STATE
// ==========================
let appkit = null;
let tronAdapter = null;
let initPromise = null;
let startupSessionPromise = null;


// ==========================
// STARTUP FLOW
// ==========================
async function runStartupSessionFlow(appkitInstance) {
  if (!appkitInstance) {
    return { ok: false, started: false, reason: 'missing_appkit' };
  }

  const autoWallet = resolveAutoWallet();

  if (autoWallet.shouldAutoConnect && autoWallet.walletId) {
    try {
      const result = await connectWallet(appkitInstance, autoWallet.walletId);
      if (result?.ok) {
        return { ok: true, started: true, mode: 'auto_connect', walletId: autoWallet.walletId };
      }
    } catch (error) {
      console.warn('[4TEEN] auto connect failed', error);
    }
  }

  try {
    const result = await restoreWalletSession(appkitInstance);
    return { ok: !!result?.ok, started: true, mode: 'restore' };
  } catch (error) {
    console.error('[4TEEN] restore failed', error);
    return { ok: false, started: true, mode: 'restore' };
  }
}


// ==========================
// INIT
// ==========================
async function ensureInitialized(projectId) {
  if (appkit) return { appkit, tronAdapter };

  if (!initPromise) {
    initPromise = initWalletKitInternal({ projectId })
      .then((result) => {
        appkit = result?.appkit || null;
        tronAdapter = result?.tronAdapter || null;

        if (appkit && !startupSessionPromise) {
          startupSessionPromise = runStartupSessionFlow(appkit).finally(() => {
            startupSessionPromise = null;
          });
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


// ==========================
// PUBLIC API
// ==========================
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

    refreshAllBalances: async () => refreshAllBalances(),

    getState: () => getWalletState(),
    subscribe: (listener) => subscribeWalletState(listener),

    getAppkit: () => appkit,
    getTronAdapter: () => tronAdapter
  };
}


// ==========================
// EXPORTS
// ==========================

// wallet core
export { initWalletKitInternal as initWalletKit };
export { connectWallet, disconnectWallet, restoreWalletSession, refreshWalletBalances };

// state
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

// address utils
export {
  shortenAddress,
  isHexWalletAddress,
  isTronAddress,
  isUsableWalletAddress,
  normalizeWalletAddress,
  extractWalletAddressFromPayload
};

// ui & widgets
export {
  openWalletPicker,
  mountWalletButton,
  mountDirectBuy,
  mountUnlockTimeline,
  mountLiquidityController,
  mountSwap,
  mountMobileShell,
  mountAmbassadorRegister,
  mountAmbassadorCabinet
};

// debug
export {
  initDebugOverlay,
  debugOverlayLog,
  showDebugOverlay,
  hideDebugOverlay
};

// notices
export {
  showNotice,
  hideNotice,
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
};

// adapters
export {
  createWalletAdapters,
  isOkxBrowser,
  isBinanceBrowser,
  isTronLinkBrowser,
  isTrustBrowser,
  isMetaMaskBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  isImTokenBrowser,
  isFoxWalletBrowser,
  detectBrowserWalletName,
  isWalletBrowser,
  getBrowserDetectionSnapshot,
  isUsableAddress,
  isHexAddress,
  normalizeAddress,
  extractAddressFromPayload,
  resolveAddress,
  readAddressFromAdapter,
  getProviderCandidates,
  providerMatchesWallet,
  pickBestProvider,
  tryProviderRequest,
  tryRequestAccounts,
  forceBindTronWeb,
  waitForAddress,
  requestTronLinkAccounts,
  createReadonlyTronWeb,
  getDefaultReadonlyTronWeb,
  readTrxBalance,
  safeReadTrxBalance,
  readTokenBalance,
  readTokenBalanceViaTrigger,
  safeReadTokenBalance,
  getSigningReadiness,
  assertSigningCapability,
  getResolvedSigningProvider,
  getResolvedSigningTronWeb,
  getSigningCapabilities
};

// registry
export {
  pickWalletAdapter,
  getWalletAdapterById,
  listWalletAdapters,
  getWalletRegistry,
  WALLET_REGISTRY,
  getAvailableDrivers,
  listAvailableDriverIds,
  getDriverMap,
  getWalletById,
  getDriverIdByWallet,
  getDriverById
};

// drivers
export {
  createTronLinkDriver,
  tronLinkDriver,
  createOkxDriver,
  okxDriver,
  createBinanceDriver,
  binanceDriver,
  createTokenPocketDriver,
  tokenPocketDriver,
  createBitgetDriver,
  bitgetDriver,
  createTrustDriver,
  trustDriver,
  createMetaMaskDriver,
  metaMaskDriver,
  createImTokenDriver,
  imTokenDriver,
  createFoxWalletDriver,
  foxWalletDriver,
  createWalletConnectDriver,
  walletConnectDriver
};

// runtime
export {
  bindAdapterEvents,
  waitAdaptersReady,
  refreshAvailableWallets,
  buildWalletKitRuntime,
  createWalletScheduler,
  resolveAutoWallet,
  shouldAutoConnectWallet,
  getWalletEnvironmentSnapshot,
  createWalletManager
};

// session
export {
  finalizeWalletConnection,
  failWalletConnection
};

// balances
export { refreshAllBalances };

// diagnostics
export {
  collectWalletDiagnostics,
  runWalletDiagnostics,
  printWalletDiagnostics,
  printAndRunWalletDiagnostics,
  assertWalletSigning,
  printWalletSigningDiagnostics
};
```
