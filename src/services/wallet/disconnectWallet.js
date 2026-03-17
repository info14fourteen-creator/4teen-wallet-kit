import { resetWalletState, setWalletState } from '../../core/store/walletStore.js';

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
}

async function safeDisconnectAdapter(adapter) {
  if (!adapter) return;

  const methods = [
    adapter.disconnect,
    adapter.close,
    adapter.reset
  ].filter((fn) => typeof fn === 'function');

  for (const method of methods) {
    try {
      await method.call(adapter);
    } catch (error) {
      console.warn('[4TEEN] adapter disconnect failed', {
        adapter: adapter?.name || adapter?.id || 'unknown',
        error
      });
    }
  }
}

function clearRuntimeCaches() {
  if (typeof window === 'undefined') return;

  try {
    window.__FOURTEEN_WALLETCONNECT_URI__ = null;
  } catch (_) {}

  try {
    window.__FOURTEEN_LAST_SELECTED_WALLET__ = null;
  } catch (_) {}

  try {
    window.__FOURTEEN_CONNECT_IN_PROGRESS__ = false;
  } catch (_) {}
}

export async function disconnectWallet(appkit) {
  try {
    setWalletState({
      connecting: false,
      error: null
    });

    if (appkit?.disconnect && typeof appkit.disconnect === 'function') {
      try {
        await appkit.disconnect();
      } catch (error) {
        console.warn('[4TEEN] appkit.disconnect failed', error);
      }
    }

    const adapters = resolveAdapters(appkit);

    for (const adapter of adapters) {
      await safeDisconnectAdapter(adapter);
    }

    clearRuntimeCaches();
  } finally {
    resetWalletState();

    setWalletState({
      initialized: true,
      connecting: false,
      connected: false,
      walletPickerOpen: true,
      error: null
    });
  }

  return { ok: true };
}
