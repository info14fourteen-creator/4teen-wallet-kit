export { initWalletKit } from './wallet/services/initWalletKit.js';

export { connectWallet } from './wallet/actions/connectWallet.js';
export { disconnectWallet } from './wallet/actions/disconnectWallet.js';
export { restoreWalletSession } from './wallet/actions/restoreWalletSession.js';
export { refreshWalletBalances } from './wallet/actions/refreshWalletBalances.js';

export {
  getWalletState,
  setWalletState,
  resetWalletState,
  subscribeWalletState
} from './core/store/walletStore.js';

export { openWalletPicker } from './ui/wallet/openWalletPicker.js';

export { createWalletAdapters } from './adapters/createAdapters.js';
export { connectTrustFallback, isTrustWalletBrowser } from './adapters/trustFallback.js';

export {
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

export {
  isUsableAddress,
  isHexAddress,
  normalizeAddress,
  extractAddressFromPayload,
  resolveAddress,
  readAddressFromAdapter
} from './adapters/shared/addressResolver.js';

export {
  getProviderCandidates,
  providerMatchesWallet,
  pickBestProvider
} from './adapters/shared/providerResolver.js';

export {
  tryProviderRequest,
  tryRequestAccounts,
  forceBindTronWeb,
  waitForAddress
} from './adapters/shared/accountRequests.js';

export { connectAdapter } from './adapters/shared/connectAdapter.js';

export {
  pickWalletAdapter,
  getWalletAdapterById,
  listWalletAdapters
} from './adapters/registry/pickWalletAdapter.js';

export { bindAdapterEvents } from './wallet/runtime/bindAdapterEvents.js';
export { waitAdaptersReady } from './wallet/runtime/waitAdaptersReady.js';
export { refreshAvailableWallets } from './wallet/runtime/refreshAvailableWallets.js';
export { buildWalletKitRuntime } from './wallet/runtime/buildWalletKitRuntime.js';
export { createWalletScheduler } from './wallet/runtime/walletScheduler.js';

export { createWalletManager } from './wallet/core/walletManager.js';

export { finalizeWalletConnection } from './wallet/session/finalizeWalletConnection.js';
export { failWalletConnection } from './wallet/session/failWalletConnection.js';
