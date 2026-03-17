import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

let restoreInFlight = false;
let lastRestoreAt = 0;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
}

function resolveAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function resolveAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function resolveProvider(appkit, adapter) {
  return (
    adapter?.provider ||
    adapter?.tronWeb ||
    appkit?.getWalletProvider?.() ||
    null
  );
}

function resolveAddress(adapter, provider) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.tronWeb?.defaultAddress?.base58,
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  return candidates.find(isUsableAddress) || null;
}

function pickConnectedAdapter(appkit) {
  const adapters = resolveAdapters(appkit);

  if (!adapters.length) return null;

  for (const adapter of adapters) {
    if (!adapter) continue;

    const provider =
      adapter?.provider ||
      adapter?.tronWeb ||
      null;

    const address = resolveAddress(adapter, provider);

    if (adapter?.connected && isUsableAddress(address)) {
      return adapter;
    }
  }

  for (const adapter of adapters) {
    if (!adapter) continue;

    const provider =
      adapter?.provider ||
      adapter?.tronWeb ||
      null;

    const address = resolveAddress(adapter, provider);

    if (isUsableAddress(address)) {
      return adapter;
    }
  }

  return null;
}

function clearState() {
  setWalletState({
    connecting: false,
    connected: false,

    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,

    address: null,
    shortAddress: null,

    provider: null,
    tronWeb: null
  });
}

export async function restoreSession(appkit) {
  const now = Date.now();

  if (!appkit) return false;
  if (restoreInFlight) return false;
  if (now - lastRestoreAt < 500) return false;

  restoreInFlight = true;
  lastRestoreAt = now;

  try {
    const adapter = pickConnectedAdapter(appkit);

    if (!adapter) {
      clearState();
      return false;
    }

    const provider = resolveProvider(appkit, adapter);
    const address = resolveAddress(adapter, provider);

    if (!isUsableAddress(address)) {
      clearState();
      return false;
    }

    const walletName = resolveAdapterName(adapter);
    const walletId = resolveAdapterId(adapter) || walletName;

    const state = getWalletState();

    if (
      state.connected &&
      state.address === address &&
      state.activeWalletId === walletId
    ) {
      return true;
    }

    setWalletState({
      initialized: true,
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

      error: null
    });

    try {
      await refreshAllBalances({
        address,
        walletId,
        provider
      });
    } catch (_) {}

    return true;
  } finally {
    restoreInFlight = false;
  }
}
