import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { resolveAddress } from '../../adapters/shared/addressResolver.js';
import { forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

let restoreInFlight = false;
let lastRestoreAt = 0;
let lastRestoreSignature = null;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
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

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (typeof appkit.getConnectors === 'function') {
    const adapters = appkit.getConnectors();
    return Array.isArray(adapters) ? adapters : [];
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function resolveProviderFromAdapter(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider
  ].filter(Boolean);

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

function scoreAdapter(adapter, activeWalletId = null) {
  const adapterId = getAdapterId(adapter);
  const adapterName = getAdapterName(adapter);
  const provider = resolveProviderFromAdapter(adapter);
  const address = resolveAddress(adapter, provider);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (
    activeWalletId &&
    (activeWalletId === adapterId || activeWalletId === adapterName)
  ) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  return score;
}

function pickRestorableAdapter(appkit) {
  const state = getWalletState();

  if (typeof appkit?.getConnectedAdapter === 'function') {
    const connectedAdapter = appkit.getConnectedAdapter();

    if (connectedAdapter) {
      const provider =
        typeof appkit.getWalletProvider === 'function'
          ? appkit.getWalletProvider()
          : resolveProviderFromAdapter(connectedAdapter);

      const address = resolveAddress(connectedAdapter, provider);

      if (isUsableAddress(address)) {
        return {
          adapter: connectedAdapter,
          provider,
          address
        };
      }
    }
  }

  const adapters = resolveAdapters(appkit);
  if (!adapters.length) {
    return null;
  }

  const ranked = [...adapters].sort((a, b) => {
    return scoreAdapter(b, state.activeWalletId) - scoreAdapter(a, state.activeWalletId);
  });

  for (const adapter of ranked) {
    const provider = resolveProviderFromAdapter(adapter);
    const address = resolveAddress(adapter, provider);

    if (adapter?.connected && isUsableAddress(address)) {
      return {
        adapter,
        provider,
        address
      };
    }
  }

  for (const adapter of ranked) {
    const provider = resolveProviderFromAdapter(adapter);
    const address = resolveAddress(adapter, provider);

    if (isUsableAddress(address)) {
      return {
        adapter,
        provider,
        address
      };
    }
  }

  return null;
}

function buildDisconnectedPatch() {
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
    error: null
  };
}

function buildConnectedPatch({ walletId, walletName, address, provider }) {
  return {
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
    walletPickerOpen: false,
    error: null
  };
}

function buildRestoreSignature(walletId, address) {
  return `${walletId || 'none'}::${address || 'none'}`;
}

function clearRestoreState() {
  setWalletState(buildDisconnectedPatch());
  lastRestoreSignature = null;
}

export async function restoreWalletSession(appkit) {
  const now = Date.now();

  if (!appkit) {
    return {
      ok: false,
      restored: false,
      error: new Error('Wallet kit not initialized')
    };
  }

  if (restoreInFlight) {
    return { ok: false, restored: false };
  }

  if (now - lastRestoreAt < 500) {
    return { ok: false, restored: false };
  }

  restoreInFlight = true;
  lastRestoreAt = now;

  try {
    const selected = pickRestorableAdapter(appkit);

    if (!selected) {
      clearRestoreState();
      return { ok: true, restored: false };
    }

    const { adapter, provider, address } = selected;

    if (!provider || !isUsableAddress(address)) {
      clearRestoreState();
      return { ok: true, restored: false };
    }

    await forceBindTronWeb(provider, address);

    const walletName = getAdapterName(adapter);
    const walletId = getAdapterId(adapter) || walletName;
    const restoreSignature = buildRestoreSignature(walletId, address);
    const state = getWalletState();

    if (
      state.connected &&
      state.address === address &&
      state.activeWalletId === walletId &&
      lastRestoreSignature === restoreSignature
    ) {
      return {
        ok: true,
        restored: true,
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

    setWalletState(
      buildConnectedPatch({
        walletId,
        walletName,
        address,
        provider
      })
    );

    lastRestoreSignature = restoreSignature;

    try {
      await refreshAllBalances({
        address,
        walletId,
        provider
      });
    } catch (_) {}

    return {
      ok: true,
      restored: true,
      session: {
        walletId,
        walletName,
        address,
        provider,
        tronWeb: provider?.tronWeb || provider || null
      },
      error: null
    };
  } catch (error) {
    console.error('[4TEEN] restoreWalletSession failed', error);

    setWalletState({
      ...buildDisconnectedPatch(),
      error: error?.message || 'restoreWalletSession failed'
    });

    lastRestoreSignature = null;

    return {
      ok: false,
      restored: false,
      session: null,
      error
    };
  } finally {
    restoreInFlight = false;
  }
}
