import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState } from '../../core/store/walletStore.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { createWalletManager } from '../core/walletManager.js';
import { createWalletScheduler } from '../runtime/walletScheduler.js';
import { waitAdaptersReady } from '../runtime/waitAdaptersReady.js';

let initialized = false;
let walletKit = null;
let walletScheduler = null;
let initInFlight = null;

function buildInitResult(appkit) {
  return {
    appkit,
    tronAdapter: null
  };
}

function scheduleRuntime(manager, scheduler) {
  if (!manager || !scheduler) return;

  if (isWalletBrowser()) {
    scheduler.scheduleAutoConnect(manager, 80);
    scheduler.scheduleRestore(manager, 140);
  } else {
    scheduler.scheduleRestore(manager, 180);
  }
}

async function warmAdapters(manager) {
  try {
    await waitAdaptersReady(manager?.adapters || []);
    manager?.refreshAvailableWallets?.();
  } catch (error) {
    console.warn('[4TEEN] waitAdaptersReady warning', error);
  }
}

export async function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    walletKit.refreshAvailableWallets();
    scheduleRuntime(walletKit, walletScheduler);
    return buildInitResult(walletKit);
  }

  if (initInFlight) {
    return initInFlight;
  }

  initInFlight = (async () => {
    try {
      const adapters = createWalletAdapters({ projectId });

      walletScheduler = createWalletScheduler();

      walletKit = createWalletManager({
        adapters,
        scheduler: walletScheduler
      });

      walletKit.bindEvents();
      walletKit.refreshAvailableWallets();

      initialized = true;

      setWalletState({
        initialized: true,
        error: null
      });

      scheduleRuntime(walletKit, walletScheduler);

      void warmAdapters(walletKit);

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
    } finally {
      initInFlight = null;
    }
  })();

  return initInFlight;
}
