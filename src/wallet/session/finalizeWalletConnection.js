import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';
import { assertWalletSigning } from '../../diagnostics/assertWalletSigning.js';

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

  const [balancesResult, signingResult] = await Promise.allSettled([
    refreshAllBalances({
      address: state.address,
      walletId: state.activeWalletId,
      provider: state.provider,
      force: true
    }),
    assertWalletSigning()
  ]);

  if (balancesResult.status !== 'fulfilled') {
    throw balancesResult.reason || new Error('Failed to refresh balances');
  }

  if (signingResult.status !== 'fulfilled') {
    throw signingResult.reason || new Error('Failed to verify signing');
  }

  if (!signingResult.value?.ok) {
    throw new Error(signingResult.value?.error || 'Wallet signing is not ready');
  }

  return {
    ok: true,
    session: {
      walletId,
      walletName,
      address,
      provider,
      tronWeb: provider?.tronWeb || provider || null,
      balances: balancesResult.value,
      signing: signingResult.value
    },
    error: null
  };
}
