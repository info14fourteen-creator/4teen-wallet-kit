import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';

let initialized = false;
let walletKit = null;

const WALLET_PRIORITY = [
  'TronLink',
  'OKX Wallet',
  'Binance Wallet',
  'Trust',
  'Bitget Wallet',
  'TokenPocket',
  'MetaMask',
  'WalletConnect'
];

function mapAdaptersToWallets(adapters) {
  return adapters.map((adapter) => ({
    id: adapter.name,
    name: adapter.name,
    readyState: adapter.readyState || 'Unknown',
    connected: !!adapter.connected
  }));
}

function rankAdapter(adapter) {
  const idx = WALLET_PRIORITY.indexOf(adapter?.name);
  return idx === -1 ? 999 : idx;
}

function getReadyAdapters(adapters) {
  return adapters
    .filter((adapter) => adapter && adapter.readyState === 'Found')
    .sort((a, b) => rankAdapter(a) - rankAdapter(b));
}

function createWalletKit({ projectId }) {
  const adapters = createWalletAdapters({ projectId });

  const kit = {
    projectId,
    adapters,
    connectedAdapter: null,

    updateAvailableWallets() {
      const availableWallets = mapAdaptersToWallets(this.adapters);

      setWalletState({
        availableWallets
      });

      console.log('[4TEEN] available wallets', availableWallets);
    },

    getPreferredAdapter() {
      const readyAdapters = getReadyAdapters(this.adapters);

      if (readyAdapters.length > 0) {
        return readyAdapters[0];
      }

      const walletConnect = this.adapters.find((adapter) => adapter?.name === 'WalletConnect');
      return walletConnect || null;
    },

    getAdapterByName(name) {
      return this.adapters.find((adapter) => adapter?.name === name) || null;
    },

    selectAdapter(name) {
      const adapter = name ? this.getAdapterByName(name) : this.getPreferredAdapter();
      this.connectedAdapter = adapter || null;

      setWalletState({
        selectedWalletId: adapter?.name || null
      });

      return adapter;
    },

    getAccount() {
      const adapter = this.connectedAdapter;
      const address = adapter?.address || null;

      if (!address) return null;

      return {
        address
      };
    },

    getWalletProvider() {
      const adapter = this.connectedAdapter;
      if (!adapter) return null;

      return adapter.tronWeb || adapter.provider || adapter;
    }
  };

  kit.updateAvailableWallets();

  kit.adapters.forEach((adapter) => {
    if (typeof adapter?.on === 'function') {
      try {
        adapter.on('readyStateChanged', () => {
          kit.updateAvailableWallets();
        });
      } catch (_) {
        // ignore adapter event binding issues
      }
    }
  });

  return kit;
}

export function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    return {
      appkit: walletKit,
      tronAdapter: null
    };
  }

  try {
    walletKit = createWalletKit({ projectId });
    initialized = true;

    setWalletState({
      initialized: true,
      error: null
    });

    const state = getWalletState();

    console.log('[4TEEN] initWalletKit result', {
      hasAppkit: !!walletKit,
      hasTronAdapter: false,
      availableWallets: state.availableWallets
    });

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  } catch (error) {
    console.error('[4TEEN] initWalletKit failed', error);

    setWalletState({
      initialized: false,
      error: error?.message || 'initWalletKit failed'
    });

    return {
      appkit: null,
      tronAdapter: null
    };
  }
}
