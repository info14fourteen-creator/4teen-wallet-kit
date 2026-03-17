import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { getTrxBalance } from './getTrxBalance.js';
import { getFourteenBalance } from './getFourteenBalance.js';

export async function refreshAllBalances() {
  const state = getWalletState();

  if (!state.address) return null;

  const [trxBalance, fourteenBalance] = await Promise.all([
    getTrxBalance(state.address),
    getFourteenBalance(state.address)
  ]);

  setWalletState({
    trxBalance,
    fourteenBalance
  });

  return { trxBalance, fourteenBalance };
}
