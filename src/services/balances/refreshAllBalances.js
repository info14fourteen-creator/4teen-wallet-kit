import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { getTrxBalance } from './getTrxBalance.js';
import { getFourteenBalance } from './getFourteenBalance.js';
import { showErrorNotice } from '../../ui/noticeCenter.js';

export async function refreshAllBalances() {
  const state = getWalletState();

  if (!state.address) {
    return null;
  }

  try {
    const [trxBalance, fourteenBalance] = await Promise.all([
      getTrxBalance(state.address),
      getFourteenBalance(state.address)
    ]);

    setWalletState({
      trxBalance,
      fourteenBalance,
      error: null
    });

    return {
      trxBalance,
      fourteenBalance
    };
  } catch (error) {
    console.error('[4TEEN] refreshAllBalances failed', error);

    setWalletState({
      trxBalance: null,
      fourteenBalance: null,
      error: error?.message || 'Failed to refresh balances'
    });

    showErrorNotice(error?.message || 'Failed to refresh balances');

    throw error;
  }
}
