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
        adapter: adapter?.name || adapter?.id,
        error
      });
    }
  }
}

export async function disconnectWallet(appkit) {
  try {
    // appkit disconnect (WalletConnect etc)
    if (appkit?.disconnect) {
      try {
        await appkit.disconnect();
      } catch (e) {
        console.warn('[4TEEN] appkit.disconnect error', e);
      }
    }

    const adapters = resolveAdapters(appkit);

    for (const adapter of adapters) {
      await safeDisconnectAdapter(adapter);
    }

  } finally {
    // 🔥 
    resetWalletState();

    setWalletState({
      walletPickerOpen: true,
      connecting: false,
      connected: false
    });
  }
}
