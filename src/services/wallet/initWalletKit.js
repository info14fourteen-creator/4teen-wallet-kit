import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletLifecycle, setWalletError } from '../../core/store/walletStore.js';
import { buildWalletKitRuntime } from '../runtime/buildWalletKitRuntime.js';
import { waitAdaptersReady } from '../runtime/waitAdaptersReady.js';
import { bindWalletAdapterEvents } from '../runtime/bindWalletAdapterEvents.js';
import { refreshAvailableWallets } from '../runtime/refreshAvailableWallets.js';
import { scheduleRestoreSession } from '../runtime/restoreScheduler.js';
import { scheduleAutoConnect } from '../runtime/autoConnect.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';

let initialized = false;
let walletKit = null;

export async function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    refreshAvailableWallets(walletKit);

    if (isWalletBrowser()) {
      scheduleAutoConnect(walletKit, 120);
    }

    scheduleRestoreSession(walletKit, 120);

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  }

  try {
    const adapters = createWalletAdapters({ projectId });

    walletKit = buildWalletKitRuntime({
      projectId,
      adapters
    });

    await waitAdaptersReady(walletKit.adapters);

    bindWalletAdapterEvents(walletKit);

    initialized = true;

    setWalletLifecycle({
      initialized: true
    });

    setWalletError(null);

    refreshAvailableWallets(walletKit);

    if (isWalletBrowser()) {
      scheduleAutoConnect(walletKit, 120);
      scheduleRestoreSession(walletKit, 220);
    } else {
      scheduleRestoreSession(walletKit, 300);
    }

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  } catch (error) {
    setWalletLifecycle({
      initialized: false
    });

    setWalletError(error?.message || 'initWalletKit failed');

    return {
      appkit: null,
      tronAdapter: null
    };
  }
}
