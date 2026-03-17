import { createWalletModal } from '../../core/config/appkit.js';
import { setWalletState } from '../../core/store/walletStore.js';

let initialized = false;
let appkit = null;
let tronAdapter = null;

export function initWalletKit({ projectId }) {
  if (initialized) {
    return { appkit, tronAdapter };
  }

  const result = createWalletModal({ projectId });

  appkit = result?.appkit || null;
  tronAdapter = result?.tronAdapter || null;

  initialized = true;

  setWalletState({
    initialized: true,
    error: null
  });

  return { appkit, tronAdapter };
}
