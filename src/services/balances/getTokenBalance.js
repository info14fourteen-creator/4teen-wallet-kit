import { TronWeb } from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';
import { TRC20_ABI } from '../contracts/trc20.js';

export async function getTokenBalance(tokenAddress, decimals, addressOverride = null) {
  const state = getWalletState();
  const address = addressOverride || state.address;

  if (!address) return 0;

  const tronWeb =
    state.tronWeb ||
    new TronWeb({
      fullHost: 'https://api.trongrid.io'
    });

  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const raw = await contract.balanceOf(address).call();

  return Number(raw) / Math.pow(10, decimals);
}
