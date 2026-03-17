import { resetWalletState } from '../../core/store/walletStore.js';

export async function disconnectWallet(appkit) {
  try {
    await appkit.disconnect?.();
  } finally {
    resetWalletState();
  }
}
