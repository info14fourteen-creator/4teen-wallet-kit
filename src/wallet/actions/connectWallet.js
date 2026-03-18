import { isTrustWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { connectTrustFallback } from '../../adapters/trustFallback.js';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isHexAddress(value) {
  return typeof value === 'string' && /^41[0-9a-fA-F]{40}$/.test(value);
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

function getProviderCandidates(adapter) {
  return [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider
  ].filter(Boolean);
}

function resolveProvider(adapter) {
  const candidates = getProviderCandidates(adapter);

  for (const provider of candidates) {
    if (
      provider?.tronWeb?.defaultAddress?.base58 ||
      provider?.defaultAddress?.base58 ||
      provider?.selectedAddress ||
      provider?.address
    ) {
      return provider;
    }
  }

  return candidates[0] || null;
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

async function tryProviderRequest(provider, method, params = []) {
  if (!provider) return null;

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({ method, params });
    } catch (_) {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch (_) {}
  }

  return null;
}

function extractAddressFromPayload(payload, provider) {
  if (!payload) return null;

  if (typeof payload === 'string') {
    return normalizeAddress(payload, provider);
  }

  if (Array.isArray(payload)) {
    return normalizeAddress(payload[0], provider);
  }

  if (typeof payload === 'object') {
    return (
      normalizeAddress(payload.address, provider) ||
      normalizeAddress(payload.selectedAddress, provider) ||
      normalizeAddress(payload.publicKey, provider) ||
      normalizeAddress(payload.result?.[0], provider) ||
      normalizeAddress(payload.accounts?.[0], provider) ||
      normalizeAddress(payload.data?.address, provider) ||
      normalizeAddress(payload.payload?.address, provider) ||
      null
    );
  }

  return null;
}

async function tryRequestAccounts(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = extractAddressFromPayload(result, provider);

    if (address) {
      return address;
    }
  }

  return null;
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

async function waitForAddress(adapter, provider) {
  for (let i = 0; i < 16; i++) {
    const directAddress = resolveAddress(adapter, provider);

    if (directAddress) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (i === 0 || i === 4 || i === 8 || i === 12) {
      const requestedAddress = await tryRequestAccounts(provider);

      if (requestedAddress) {
        await forceBindTronWeb(provider, requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(250);
  }

  return null;
}

async function connectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    throw new Error(`Adapter ${getAdapterName(adapter)} has no connect()`);
  }

  try {
    await adapter.connect();
  } catch (error) {
    const message = String(error?.message || '').toLowerCase();

    if (
      message.includes('already connected') ||
      message.includes('connection already open') ||
      message.includes('session currently connected')
    ) {
      return;
    }

    throw error;
  }
}

function openWalletPicker(appkit) {
  if (appkit && typeof appkit.openWalletPicker === 'function') {
    appkit.openWalletPicker();
    return;
  }

  if (appkit && typeof appkit.openWalletModal === 'function') {
    appkit.openWalletModal();
    return;
  }

  setWalletState({
    walletPickerOpen: true
  });
}

function pickAdapter(appkit, walletId) {
  if (!appkit || !walletId) return null;

  if (typeof appkit.getAdapterById === 'function') {
    const adapter = appkit.getAdapterById(walletId);
    if (adapter) return adapter;
  }

  const adapters = Array.isArray(appkit.adapters) ? appkit.adapters : [];

  return (
    adapters.find((adapter) => {
      return (
        getAdapterId(adapter) === walletId ||
        getAdapterName(adapter) === walletId
      );
    }) || null
  );
}

function buildDisconnectedPatch(errorMessage = 'Wallet connection failed') {
  return {
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
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null,
    walletPickerOpen: true,
    error: errorMessage
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

async function finalizeWalletConnection({ walletId, walletName, address, provider }) {
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

function failWalletConnection(error) {
  const message = error?.message || 'Wallet connection failed';

  console.error('[4TEEN] connectWallet failed', error);

  setWalletState(buildDisconnectedPatch(message));

  return {
    ok: false,
    session: null,
    error
  };
}

export async function connectWallet(appkit, walletId = null) {
  try {
    setWalletState({
      connecting: true,
      error: null
    });

    if (!appkit) {
      throw new Error('Wallet kit not initialized');
    }

    if (!walletId) {
      openWalletPicker(appkit);

      setWalletState({
        connecting: false,
        walletPickerOpen: true
      });

      return {
        ok: true,
        session: null,
        error: null
      };
    }

    if (typeof appkit.selectWallet === 'function') {
      appkit.selectWallet(walletId);
    }

    if (walletId === 'Trust' && isTrustWalletBrowser()) {
      const result = await connectTrustFallback();

      return await finalizeWalletConnection({
        walletId: result.walletId,
        walletName: result.walletName,
        address: result.address,
        provider: result.tronWeb || result.provider || null
      });
    }

    const adapter = pickAdapter(appkit, walletId);

    if (!adapter) {
      throw new Error(`Adapter not found: ${walletId}`);
    }

    await connectAdapter(adapter);

    let provider = null;
    let address = null;

    for (const delay of [0, 400, 600]) {
      if (delay) {
        await sleep(delay);
      }

      provider = resolveProvider(adapter);
      address = await waitForAddress(adapter, provider);

      if (isUsableAddress(address)) {
        break;
      }
    }

    if (!isUsableAddress(address)) {
      throw new Error('Address not resolved');
    }

    const walletIdResolved = getAdapterId(adapter) || walletId;
    const walletNameResolved = getAdapterName(adapter) || walletId;

    return await finalizeWalletConnection({
      walletId: walletIdResolved,
      walletName: walletNameResolved,
      address,
      provider
    });
  } catch (error) {
    return failWalletConnection(error);
  }
}
