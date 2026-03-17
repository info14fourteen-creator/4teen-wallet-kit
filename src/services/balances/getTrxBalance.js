import { TronWeb } from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';

function fromSun(value) {
  return Number(value || 0) / 1_000_000;
}

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTrxBalance(addressOverride = null) {
  const state = getWalletState();
  const address = addressOverride || state.address;

  if (!address) return 0;

  const tronWeb = state.tronWeb || getReadOnlyTronWeb();
  const raw = await tronWeb.trx.getBalance(address);

  return Number(fromSun(raw).toFixed(6));
}
