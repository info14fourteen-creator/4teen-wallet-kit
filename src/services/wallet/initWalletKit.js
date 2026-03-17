import { createWalletModal } from '../../core/config/appkit.js';
import { setWalletState } from '../../core/store/walletStore.js';

let initialized = false;
let appkit = null;

export function initWalletKit({ projectId }) {
  if (initialized) return appkit;

  appkit = createWalletModal({ projectId });
  initialized = true;

  setWalletState({
    initialized: true
  });

  return appkit;
}
