import { resetWalletState } from '../../core/store/walletStore.js';

function resolveAdapters(appkit) {
  const adapters = appkit?.getConnectors?.() || appkit?.connectors || appkit?.adapters || [];
  return Array.isArray(adapters) ? adapters : [];
}

async function safeDisconnectAdapter(adapter) {
  if (!adapter) return;

  const methods = [
    adapter.disconnect,
    adapter.close,
    adapter.reset
  ].filter((method) => typeof method === 'function');

  for (const method of methods) {
    try {
      await method.call(adapter);
    } catch (error) {
      console.warn('[4TEEN] adapter disconnect method failed', {
        adapter: adapter?.name || adapter?.id || 'unknown',
        error
      });
    }
  }
}

export async function disconnectWallet(appkit) {
  try {
    if (appkit && typeof appkit.disconnect === 'function') {
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

    if (typeof window !== 'undefined') {
      try {
        if (window.tronLink?.ready) {
          // no-op
        }
      } catch (error) {
        console.warn('[4TEEN] tronLink cleanup probe failed', error);
      }
    }
  } finally {
    resetWalletState();
  }
}
