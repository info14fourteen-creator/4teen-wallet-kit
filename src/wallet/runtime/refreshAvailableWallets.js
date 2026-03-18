import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { readAddressFromAdapter } from '../../adapters/shared/addressResolver.js';

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

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function getConnectedAdapterPriority(adapter, activeWalletId = null) {
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const address = readAddressFromAdapter(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (activeWalletId && (activeWalletId === adapterId || activeWalletId === adapterName)) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score += 50;
  }

  return score;
}

function resolveConnectedAdapter(adapters = [], activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;
    return !!adapter?.connected || !!readAddressFromAdapter(adapter);
  });

  if (!connectedAdapters.length) {
    return null;
  }

  const ranked = [...connectedAdapters].sort((a, b) => {
    return (
      getConnectedAdapterPriority(b, activeWalletId) -
      getConnectedAdapterPriority(a, activeWalletId)
    );
  });

  return ranked[0] || null;
}

function mapAvailableWallets(adapters = [], connectedAdapter = null) {
  return adapters.map((adapter) => {
    const adapterId = getAdapterId(adapter) || getAdapterName(adapter);
    const adapterName = getAdapterName(adapter);
    const readyState = String(adapter?.readyState || 'Unknown');

    return {
      id: adapterId,
      name: adapterName,
      readyState,
      connected: !!(
        connectedAdapter &&
        (
          getAdapterId(connectedAdapter) === adapterId ||
          getAdapterName(connectedAdapter) === adapterName
        )
      )
    };
  });
}

export function refreshAvailableWallets(appkit) {
  const adapters = Array.isArray(appkit?.adapters) ? appkit.adapters : [];
  const state = getWalletState();
  const activeWalletId = state.activeWalletId || null;

  const connectedAdapter = resolveConnectedAdapter(adapters, activeWalletId);
  const availableWallets = mapAvailableWallets(adapters, connectedAdapter);

  if (appkit) {
    appkit.connectedAdapter = connectedAdapter || null;
  }

  setWalletState({
    availableWallets
  });

  return availableWallets;
}
