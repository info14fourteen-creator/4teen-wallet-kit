import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState } from '../../core/store/walletStore.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { createWalletManager } from '../core/walletManager.js';
import { createWalletScheduler } from '../runtime/walletScheduler.js';
import { waitAdaptersReady } from '../runtime/waitAdaptersReady.js';

let initialized = false;
let walletKit = null;
let walletScheduler = null;

function buildInitResult(appkit) {
  return {
    appkit,
    tronAdapter: null
  };
}

export async function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    walletKit.refreshAvailableWallets();

    if (isWalletBrowser()) {
      walletScheduler?.scheduleAutoConnect(walletKit, 120);
      walletScheduler?.scheduleRestore(walletKit, 220);
    } else {
      walletScheduler?.scheduleRestore(walletKit, 120);
    }

    return buildInitResult(walletKit);
  }

  try {
    const adapters = createWalletAdapters({ projectId });

    walletScheduler = createWalletScheduler();

    walletKit = createWalletManager({
      adapters,
      scheduler: walletScheduler
    });

    await waitAdaptersReady(walletKit.adapters);

    walletKit.bindEvents();
    walletKit.refreshAvailableWallets();

    initialized = true;

    setWalletState({
      initialized: true,
      error: null
    });

    if (isWalletBrowser()) {
      walletScheduler.scheduleAutoConnect(walletKit, 120);
      walletScheduler.scheduleRestore(walletKit, 220);
    } else {
      walletScheduler.scheduleRestore(walletKit, 300);
    }

    console.log('[4TEEN] wallet kit initialized');

    return buildInitResult(walletKit);
  } catch (error) {
    console.error('[4TEEN] initWalletKit failed', error);

    initialized = false;
    walletKit = null;

    walletScheduler?.clearAll?.();
    walletScheduler = null;

    setWalletState({
      initialized: false,
      error: error?.message || 'initWalletKit failed'
    });

    return buildInitResult(null);
  }
}
