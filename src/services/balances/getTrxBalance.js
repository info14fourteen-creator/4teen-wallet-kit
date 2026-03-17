import { TronWeb } from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';

function fromSun(value) {
  return Number(value || 0) / 1_000_000;
}

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
  return Number(fromSun(raw).toFixed(6));
}
