import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { assertSigningCapability } from '../../adapters/shared/signingReadiness.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

function isValidAddress(address) {
  return typeof address === 'string' && address.startsWith('T') && address.length === 34;
}

function resolveTronWeb(provider) {
  return (
    provider?.tronWeb ||
    provider ||
    window?.tronWeb ||
    window?.tronweb ||
    null
  );
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
    tronWeb: resolveTronWeb(provider),
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
  // 🔥 FIX 1: validate BEFORE anything
  if (!isValidAddress(address)) {
    throw new Error('wallet address is missing or invalid');
  }

  // 🔥 FIX 2: normalize provider
  const tronWeb = resolveTronWeb(provider);

  if (!tronWeb) {
    throw new Error('tronWeb not available');
  }

  // 🔥 FIX 3: bind only if needed
  try {
    await forceBindTronWeb(tronWeb, address);
  } catch (_) {}

  // 🔥 FIX 4: always set normalized provider
  setWalletState(
    buildConnectedPatch({
      walletId,
      walletName,
      address,
      provider: tronWeb
    })
  );

  const state = getWalletState();

  let balances = null;

  try {
    balances = await refreshAllBalances({
      address: state.address,
      walletId: state.activeWalletId,
      provider: state.provider,
      force: true
    });
  } catch (e) {
    console.warn('[4TEEN] balance read failed but continuing', e);
  }

  const latestState = getWalletState();

  let signing = null;

  try {
    signing = assertSigningCapability({
      connected: true,
      address: latestState.address,
      provider: latestState.provider,
      tronWeb: latestState.tronWeb
    });
  } catch (_) {}

  return {
    ok: true,
    session: {
      walletId,
      walletName,
      address,
      provider: latestState.provider,
      tronWeb: latestState.tronWeb,
      balances,
      signing
    },
    error: null
  };
}
