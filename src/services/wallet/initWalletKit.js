import { createWalletModal } from '../../core/config/appkit.js';
import { setWalletState } from '../../core/store/walletStore.js';

let initialized = false;
let appkit = null;
let tronAdapter = null;

export function initWalletKit({ projectId }) {
  if (initialized) {
    return { appkit, tronAdapter };
  }

  try {
    const result = createWalletModal({ projectId }) || {};

    appkit = result.appkit || null;
    tronAdapter = result.tronAdapter || null;

    initialized = true;

    setWalletState({
      initialized: true,
      error: null
    });

    console.log('[4TEEN] initWalletKit result', {
      hasAppkit: !!appkit,
      hasTronAdapter: !!tronAdapter
    });

    return { appkit, tronAdapter };
  } catch (error) {
    console.error('[4TEEN] initWalletKit failed', error);

    setWalletState({
      initialized: false,
      error: error?.message || 'initWalletKit failed'
    });

    return {
      appkit: null,
      tronAdapter: null
    };
  }
}
