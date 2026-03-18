import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isHexAddress(value) {
  return typeof value === 'string' && /^41[0-9a-fA-F]{40}$/.test(value);
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function getAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function normalizeAddress(value, provider = null) {
  if (isUsableAddress(value)) {
    return value;
  }

  if (isHexAddress(value) && provider?.address?.fromHex) {
    try {
      const converted = provider.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  if (isHexAddress(value) && provider?.tronWeb?.address?.fromHex) {
    try {
      const converted = provider.tronWeb.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  return null;
}

function resolveAddress(adapter, provider) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,
    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,
    adapter?.connector?.provider?.address,
    adapter?.connector?.provider?.selectedAddress,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58,
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const candidate of candidates) {
    const normalized = normalizeAddress(candidate, provider);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

function getProviderFromManager(manager, adapter = null) {
  if (adapter) {
    return (
      adapter?.provider ||
      adapter?.tronWeb ||
      adapter?.wallet ||
      adapter?.walletProvider ||
      adapter?.connector?.provider ||
      null
    );
  }

  if (!manager || typeof manager.getWalletProvider !== 'function') {
    return null;
  }

  return manager.getWalletProvider();
}

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

function buildDisconnectedPatch() {
  return {
    connecting: false,
    connected: false,
    walletId: null,
    walletName: null,
    address: null,
    shortAddress: null,
    provider: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null
  };
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

function resolveActiveAdapter(manager) {
  if (!manager || typeof manager.getConnectedAdapter !== 'function') {
    return null;
  }

  return manager.getConnectedAdapter();
}

export async function restoreSession(manager) {
  try {
    const adapter = resolveActiveAdapter(manager);

    if (!adapter) {
      setWalletState(buildDisconnectedPatch());
      return { ok: true, restored: false };
    }

    const provider = getProviderFromManager(manager, adapter);
    const address = resolveAddress(adapter, provider);

    if (!isUsableAddress(address)) {
      setWalletState(buildDisconnectedPatch());
      return { ok: true, restored: false };
    }

    await forceBindTronWeb(provider, address);

    const walletId = getAdapterId(adapter) || getAdapterName(adapter);
    const walletName = getAdapterName(adapter);

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
      restored: true,
      address,
      walletId
    };
  } catch (error) {
    console.error('[4TEEN] restoreSession failed', error);

    setWalletState({
      ...buildDisconnectedPatch(),
      error: error?.message || 'restoreSession failed'
    });

    return {
      ok: false,
      restored: false,
      error
    };
  }
}
