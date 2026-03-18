import { bindAdapterEvents } from '../runtime/bindAdapterEvents.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

function createNoopScheduler() {
  return {
    scheduleRestore() {},
    scheduleAutoConnect() {}
  };
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

function readAddressFromAdapter(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.address,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const value of candidates) {
    if (isUsableAddress(value)) {
      return value;
    }
  }

  return null;
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

function resolveConnectedAdapter(adapters, activeWalletId = null) {
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

function mapAvailableWallets(adapters, activeWalletId = null) {
  const connectedAdapter = resolveConnectedAdapter(adapters, activeWalletId);

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
        (getAdapterId(connectedAdapter) === adapterId ||
          getAdapterName(connectedAdapter) === adapterName)
      )
    };
  });
}

export function createWalletManager({
  adapters = [],
  scheduler = null
} = {}) {
  const runtimeScheduler = scheduler || createNoopScheduler();

  const manager = {
    adapters: Array.isArray(adapters) ? adapters : [],
    connectedAdapter: null,

    refreshAvailableWallets() {
      const state = getWalletState();
      const activeWalletId = state.activeWalletId || null;

      this.connectedAdapter = resolveConnectedAdapter(this.adapters, activeWalletId);

      const availableWallets = mapAvailableWallets(this.adapters, activeWalletId);

      setWalletState({
        availableWallets
      });

      return availableWallets;
    },

    getAdapterById(walletId) {
      if (!walletId) return null;

      return (
        this.adapters.find((adapter) => {
          return (
            getAdapterId(adapter) === walletId ||
            getAdapterName(adapter) === walletId
          );
        }) || null
      );
    },

    getConnectedAdapter() {
      const state = getWalletState();
      this.connectedAdapter = resolveConnectedAdapter(
        this.adapters,
        state.activeWalletId || null
      );

      return this.connectedAdapter || null;
    },

    getWalletProvider() {
      const adapter = this.getConnectedAdapter();
      if (!adapter) return null;

      return (
        adapter?.provider ||
        adapter?.tronWeb ||
        adapter?.wallet ||
        adapter?.walletProvider ||
        adapter?.connector?.provider ||
        null
      );
    },

    selectWallet(walletId) {
      const adapter = this.getAdapterById(walletId);

      if (!adapter) {
        return null;
      }

      const adapterKey = getAdapterId(adapter) || getAdapterName(adapter);

      setWalletState({
        selectedWalletId: adapterKey,
        activeWalletId: adapterKey
      });

      return adapter;
    },

    openWalletPicker() {
      const connectedAdapter = this.getConnectedAdapter();

      setWalletState({
        walletPickerOpen: !connectedAdapter
      });
    },

    closeWalletPicker() {
      setWalletState({
        walletPickerOpen: false
      });
    },

    bindEvents() {
      this.adapters.forEach((adapter) => {
        bindAdapterEvents(this, adapter, {
          isWalletBrowser,
          resolveConnectedAdapter: () => {
            const state = getWalletState();
            return resolveConnectedAdapter(
              this.adapters,
              state.activeWalletId || null
            );
          },
          refreshAvailableWallets: () => {
            this.refreshAvailableWallets();
          },
          scheduleRestore: (delay = 120) => {
            runtimeScheduler.scheduleRestore(this, delay);
          },
          scheduleAutoConnect: (delay = 120) => {
            runtimeScheduler.scheduleAutoConnect(this, delay);
          }
        });
      });
    }
  };

  return manager;
}
