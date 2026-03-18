import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

function buildConnectedPatch({ walletId, walletName, address, provider }) {
  return {
    connecting: false,
    connected: true,
    walletId,
    walletName,
    activeWalletId: walletId,
    activeWalletName: walletName,
    selectedWalletId: walletId,
    address,
    shortAddress: shortenAddress(address),
    provider,
    tronWeb: provider?.tronWeb || provider || null,
    walletPickerOpen: false,
    error: null
  };
}

export async function finalizeWalletConnection({
  walletId,
  walletName,
  address,
  provider
}) {
  await forceBindTronWeb(provider, address);

  setWalletState(
    buildConnectedPatch({
      walletId,
      walletName,
      address,
      provider
    })
  );

  const state = getWalletState();

  await refreshAllBalances({
    address: state.address,
    walletId: state.activeWalletId,
    provider: state.provider
  });

  return {
    ok: true,
    session: {
      walletId,
      walletName,
      address,
      provider,
      tronWeb: provider?.tronWeb || provider || null
    },
    error: null
  };
}
