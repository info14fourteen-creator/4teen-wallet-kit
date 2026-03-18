import { getWalletState } from '../../core/store/walletStore.js';
import { isWalletBrowser, detectBrowserWalletName } from '../../adapters/shared/browserDetection.js';
import { restoreSession } from '../services/restoreSession.js';

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

function getAutoConnectPriority(adapter, browserWalletName) {
  if (!adapter) return -100000;

  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const address = readAddressFromAdapter(adapter);

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (browserWalletName && (adapterName === browserWalletName || adapterId === browserWalletName)) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score -= 5000;
  }

  if (
    browserWalletName &&
    adapterName !== browserWalletName &&
    adapterId !== browserWalletName &&
    !isWalletConnectAdapter(adapter)
  ) {
    score -= 30000;
  }

  return score;
}

async function safeConnectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    return false;
  }

  try {
    await adapter.connect();
    return true;
  } catch (error) {
    const message = String(error?.message || '').toLowerCase();

    if (
      message.includes('already connected') ||
      message.includes('session currently connected') ||
      message.includes('connection already open')
    ) {
      return true;
    }

    if (
      message.includes('user rejected') ||
      message.includes('no accounts found in session')
    ) {
      return false;
    }

    console.warn('[4TEEN] auto connect adapter failed', {
      adapter: getAdapterName(adapter),
      error
    });

    return false;
  }
}

function pickAutoConnectAdapter(adapters = []) {
  const browserWalletName = detectBrowserWalletName();
  if (!browserWalletName) return null;

  const ranked = adapters
    .filter(Boolean)
    .filter((adapter) => !isWalletConnectAdapter(adapter))
    .sort((a, b) => {
      return (
        getAutoConnectPriority(b, browserWalletName) -
        getAutoConnectPriority(a, browserWalletName)
      );
    });

  const best = ranked[0] || null;

  if (!best) {
    return null;
  }

  const bestName = getAdapterName(best);
  const bestId = getAdapterId(best);

  if (bestName !== browserWalletName && bestId !== browserWalletName) {
    return null;
  }

  return best;
}

function hasConnectedAdapter(manager) {
  if (!manager || typeof manager.getConnectedAdapter !== 'function') {
    return false;
  }

  return !!manager.getConnectedAdapter();
}

function shouldAutoConnect(manager) {
  if (!isWalletBrowser()) return false;
  if (!manager) return false;

  const state = getWalletState();

  if (state.connecting) return false;
  if (state.connected) return false;
  if (state.address) return false;
  if (hasConnectedAdapter(manager)) return false;

  return true;
}

export function createWalletScheduler() {
  let restoreTimer = null;
  let autoConnectTimer = null;
  let autoConnectInFlight = false;

  return {
    scheduleRestore(manager, delay = 300) {
      if (restoreTimer) {
        clearTimeout(restoreTimer);
      }

      restoreTimer = setTimeout(() => {
        restoreSession(manager).catch((error) => {
          console.error('[4TEEN] restoreSession error', error);
        });
      }, delay);
    },

    scheduleAutoConnect(manager, delay = 250) {
      if (autoConnectTimer) {
        clearTimeout(autoConnectTimer);
      }

      autoConnectTimer = setTimeout(async () => {
        if (!shouldAutoConnect(manager) || autoConnectInFlight) {
          return;
        }

        const adapter = pickAutoConnectAdapter(manager?.adapters || []);
        if (!adapter) {
          return;
        }

        autoConnectInFlight = true;

        try {
          const connected = await safeConnectAdapter(adapter);

          if (connected && typeof manager?.refreshAvailableWallets === 'function') {
            manager.refreshAvailableWallets();
          }

          this.scheduleRestore(manager, 120);
        } finally {
          autoConnectInFlight = false;
        }
      }, delay);
    },

    clearAll() {
      if (restoreTimer) {
        clearTimeout(restoreTimer);
        restoreTimer = null;
      }

      if (autoConnectTimer) {
        clearTimeout(autoConnectTimer);
        autoConnectTimer = null;
      }

      autoConnectInFlight = false;
    }
  };
}
