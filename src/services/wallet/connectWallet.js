import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';
import { isTrustWalletBrowser, connectTrustFallback } from '../../adapters/trustFallback.js';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
}

function resolveAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function resolveAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function resolveProvider(appkit, adapter) {
  return (
    adapter?.provider ||
    adapter?.tronWeb ||
    appkit?.getWalletProvider?.() ||
    (typeof window !== 'undefined' ? window.tronWeb : null) ||
    null
  );
}

function resolveAddress(adapter, provider) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.tronWeb?.defaultAddress?.base58,
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  return candidates.find(isUsableAddress) || null;
}

async function tryRequestAccounts(provider) {
  if (!provider || typeof provider.request !== 'function') return null;

  const methods = ['tron_requestAccounts', 'requestAccounts'];

  for (const method of methods) {
    try {
      const res = await provider.request({ method });

      if (Array.isArray(res) && isUsableAddress(res[0])) return res[0];
      if (typeof res === 'string' && isUsableAddress(res)) return res;
      if (res?.address && isUsableAddress(res.address)) return res.address;
      if (res?.data?.address && isUsableAddress(res.data.address)) return res.data.address;
    } catch (_) {}
  }

  return null;
}

async function waitForAddress(adapter, provider) {
  for (let i = 0; i < 12; i++) {
    const addr =
      resolveAddress(adapter, provider) ||
      (i === 0 ? await tryRequestAccounts(provider) : null);

    if (isUsableAddress(addr)) {
      console.log('[4TEEN] address resolved', addr);
      return addr;
    }

    await new Promise((r) => setTimeout(r, 250));
  }

  return null;
}

function pickAdapter(appkit, walletId) {
  const adapters = resolveAdapters(appkit);

  if (!adapters.length) return null;

  if (walletId) {
    return adapters.find(
      (a) =>
        resolveAdapterId(a) === walletId ||
        resolveAdapterName(a) === walletId
    ) || null;
  }

  return adapters.find((a) => a?.connected) || null;
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
      if (typeof appkit.openWalletPicker === 'function') {
        appkit.openWalletPicker();

        setWalletState({
          connecting: false,
          walletPickerOpen: true
        });

        return { ok: true };
      }

      throw new Error('Wallet picker not available');
    }

    if (walletId === 'Trust' && isTrustWalletBrowser()) {
      const result = await connectTrustFallback();

      const address = result.address;

      setWalletState({
        connecting: false,
        connected: true,

        walletId: result.walletId,
        walletName: result.walletName,
        activeWalletId: result.walletId,
        activeWalletName: result.walletName,

        address,
        shortAddress: shortenAddress(address),

        provider: result.provider,
        tronWeb: result.tronWeb || result.provider || null,

        walletPickerOpen: false,
        error: null
      });

      const state = getWalletState();

      await refreshAllBalances({
        address: state.address,
        walletId: state.activeWalletId,
        provider: state.provider
      });

      return {
        ok: true,
        address,
        walletId: result.walletId
      };
    }

    const adapter = pickAdapter(appkit, walletId);

    if (!adapter) {
      throw new Error(`Adapter not found: ${walletId}`);
    }

    if (typeof adapter.connect !== 'function') {
      throw new Error(`Adapter ${walletId} has no connect()`);
    }

    await adapter.connect();

    const provider = resolveProvider(appkit, adapter);
    const address = await waitForAddress(adapter, provider);

    if (!isUsableAddress(address)) {
      throw new Error('Address not resolved');
    }

    const walletName = resolveAdapterName(adapter);
    const walletIdResolved = resolveAdapterId(adapter) || walletName;

    setWalletState({
      connecting: false,
      connected: true,

      walletId: walletIdResolved,
      walletName,
      activeWalletId: walletIdResolved,
      activeWalletName: walletName,

      address,
      shortAddress: shortenAddress(address),

      provider,
      tronWeb: provider?.tronWeb || provider || null,

      walletPickerOpen: false,
      error: null
    });

    const state = getWalletState();

    await refreshAllBalances({
      address: state.address,
      walletId: state.activeWalletId,
      provider: state.provider
    });

    return {
      ok: true,
      address,
      walletId: walletIdResolved
    };
  } catch (error) {
    console.error('[4TEEN] connectWallet failed', error);

    setWalletState({
      connecting: false,
      connected: false,
      walletId: null,
      walletName: null,
      activeWalletId: null,
      activeWalletName: null,
      address: null,
      shortAddress: null,
      provider: null,
      tronWeb: null,
      trxBalance: null,
      fourteenBalance: null,
      walletPickerOpen: true,
      error: error?.message || 'Wallet connection failed'
    });

    return { ok: false, error };
  }
}
