import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

async function forceBindTronWeb(provider, address) {
  if (!provider || !address) return;

  try {
    if (typeof provider.setAddress === 'function') {
      provider.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb && typeof provider.tronWeb.setAddress === 'function') {
      provider.tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.defaultAddress && typeof provider.defaultAddress === 'object') {
      provider.defaultAddress.base58 = address;
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb?.defaultAddress && typeof provider.tronWeb.defaultAddress === 'object') {
      provider.tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}
}

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
