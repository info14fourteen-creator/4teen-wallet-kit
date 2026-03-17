import { resetWalletState, getWalletState } from '../../core/store/walletStore.js';
import { showNeutralNotice, showErrorNotice } from '../../ui/noticeCenter.js';

export async function disconnectWallet(appkit) {
  const state = getWalletState();
  const adapter = state.adapter || appkit?.connectedAdapter || null;

  try {
    if (adapter && typeof adapter.disconnect === 'function') {
      await adapter.disconnect();
    }

    if (appkit) {
      appkit.connectedAdapter = null;
    }

    showNeutralNotice('Wallet disconnected');
  } catch (error) {
    console.error('[4TEEN] disconnectWallet failed', error);
    showErrorNotice(error?.message || 'Failed to disconnect wallet');
    throw error;
  } finally {
    resetWalletState();
  }
}
