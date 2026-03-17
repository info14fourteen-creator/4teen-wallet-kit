import { resetWalletState } from '../../core/store/walletStore.js';
import { showNeutralNotice, showErrorNotice } from '../../ui/noticeCenter.js';

export async function disconnectWallet(appkit) {
  try {
    await appkit?.disconnect?.();
    showNeutralNotice('Wallet disconnected');
  } catch (error) {
    console.error('[4TEEN] disconnectWallet failed', error);
    showErrorNotice(error?.message || 'Failed to disconnect wallet');
    throw error;
  } finally {
    resetWalletState();
  }
}
