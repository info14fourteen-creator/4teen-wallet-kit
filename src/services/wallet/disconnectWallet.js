import { resetWalletState } from '../../core/store/walletStore.js';
import { showNeutralNotice, showErrorNotice } from '../../ui/noticeCenter.js';

export async function disconnectWallet(appkit) {
  const adapters = Array.isArray(appkit?.adapters) ? appkit.adapters : [];
  const errors = [];

  for (const adapter of adapters) {
    try {
      if (adapter && typeof adapter.disconnect === 'function') {
        await adapter.disconnect();
      }
    } catch (error) {
      errors.push({
        wallet: adapter?.name || 'Unknown',
        message: error?.message || String(error)
      });
    }
  }

  if (appkit) {
    appkit.connectedAdapter = null;
  }

  resetWalletState();

  if (errors.length > 0) {
    console.error('[4TEEN] disconnectWallet partial errors', errors);
    showErrorNotice('Some wallets did not disconnect cleanly');
    return {
      ok: false,
      errors
    };
  }

  showNeutralNotice('Wallet disconnected');
  return {
    ok: true
  };
}
