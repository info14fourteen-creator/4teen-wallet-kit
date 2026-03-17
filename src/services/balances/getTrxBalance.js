import TronWeb from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';
import { normalizeTronBalance } from '../../core/utils/tron.js';

export async function getTrxBalance(addressOverride = null) {
  const state = getWalletState();
  const address = addressOverride || state.address;

  if (!address) return 0;

  const tronWeb =
    state.tronWeb ||
    new TronWeb({
      fullHost: 'https://api.trongrid.io'
    });

  const raw = await tronWeb.trx.getBalance(address);
  return normalizeTronBalance(raw);
}
