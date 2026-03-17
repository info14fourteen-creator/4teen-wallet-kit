import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';
import { isTrustWalletBrowser, connectTrustFallback } from '../../adapters/trustFallback.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isHexAddress(value) {
  return typeof value === 'string' && /^41[0-9a-fA-F]{40}$/.test(value);
}

/* ================== CRITICAL FIX ================== */

function forceBindTronWeb(provider, address) {
  if (!provider || !address) return;

  try {
    if (provider?.tronWeb?.setAddress) {
      provider.tronWeb.setAddress(address);
    }

    if (provider?.setAddress) {
      provider.setAddress(address);
    }

    if (provider?.defaultAddress) {
      provider.defaultAddress.base58 = address;
    }

    if (provider?.tronWeb?.defaultAddress) {
      provider.tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}
}

/* ================== ADAPTER ================== */

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

function normalizeWalletId(value) {
  return String(value || '').trim().toLowerCase();
}

/* ================== BROWSER DETECT ================== */

function isOkxBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();

  return ua.includes('okx') || !!win?.okxwallet || !!win?.okxWallet;
}

function isTronLinkBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();

  return ua.includes('tronlink') || !!win?.tronLink || !!win?.tronWeb?.isTronLink;
}

function isMetaMaskBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();

  return ua.includes('metamask');
}

function isTokenPocketBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();

  return ua.includes('tokenpocket') || !!win?.tp;
}

function isBitgetBrowser() {
  const win = getWindowSafe();
  const ua = String(win?.navigator?.userAgent || '').toLowerCase();

  return ua.includes('bitkeep') || ua.includes('bitget') || !!win?.bitkeep;
}

function detectBrowserWalletName() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustWalletBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  return null;
}

/* ================== PICK ADAPTER ================== */

function pickAdapter(appkit, walletId) {
  const adapters = resolveAdapters(appkit);
  if (!adapters.length) return null;

  if (walletId) {
    return adapters.find(
      (a) =>
        normalizeWalletId(resolveAdapterId(a)) === normalizeWalletId(walletId) ||
        normalizeWalletId(resolveAdapterName(a)) === normalizeWalletId(walletId)
    ) || adapters[0];
  }

  return adapters[0];
}

/* ================== PROVIDER ================== */

function getProviderCandidates(appkit, adapter) {
  const win = getWindowSafe();

  return [
    adapter?.provider,
    adapter?.tronWeb,
    appkit?.getWalletProvider?.(),

    win?.tronLink,
    win?.tronLink?.tronWeb,
    win?.okxwallet,
    win?.okxwallet?.tronWeb,
    win?.tp,
    win?.bitkeep,
    win?.trustwallet,
    win?.ethereum,
    win?.tronWeb
  ].filter(Boolean);
}

function pickBestProvider(appkit, adapter) {
  const candidates = getProviderCandidates(appkit, adapter);

  for (const p of candidates) {
    if (p?.tronWeb?.defaultAddress?.base58) return p;
    if (p?.defaultAddress?.base58) return p;
  }

  return candidates[0] || null;
}

/* ================== ADDRESS ================== */

function normalizeAddress(value, provider = null) {
  if (isUsableAddress(value)) return value;

  if (isHexAddress(value) && provider?.tronWeb?.address?.fromHex) {
    try {
      return provider.tronWeb.address.fromHex(value);
    } catch {}
  }

  return null;
}

function resolveAddress(adapter, provider) {
  const list = [
    adapter?.address,
    adapter?.account?.address,
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const item of list) {
    const addr = normalizeAddress(item, provider);
    if (addr) return addr;
  }

  return null;
}

async function tryRequestAccounts(provider) {
  if (!provider?.request) return null;

  try {
    const res = await provider.request({ method: 'tron_requestAccounts' });
    return Array.isArray(res) ? res[0] : res;
  } catch {}

  return null;
}

async function waitForAddress(adapter, provider) {
  for (let i = 0; i < 12; i++) {
    const addr = resolveAddress(adapter, provider);
    if (addr) return addr;

    if (i === 0 || i === 4) {
      const requested = await tryRequestAccounts(provider);
      if (requested) return requested;
    }

    await sleep(250);
  }

  return null;
}

/* ================== CONNECT ================== */

async function connectAdapter(adapter) {
  if (!adapter?.connect) throw new Error('No connect()');

  try {
    await adapter.connect();
  } catch (e) {
    if (!String(e?.message).includes('already')) {
      throw e;
    }
  }
}

/* ================== STATE ================== */

function buildConnectedState({ walletId, walletName, address, provider }) {
  return {
    connecting: false,
    connected: true,

    walletId,
    walletName,
    activeWalletId: walletId,

    address,
    shortAddress: shortenAddress(address),

    provider,
    tronWeb: provider?.tronWeb || provider || null,

    walletPickerOpen: false,
    error: null
  };
}

function buildDisconnectedState(errorMessage) {
  return {
    connecting: false,
    connected: false,
    address: null,
    provider: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null,
    walletPickerOpen: true,
    error: errorMessage
  };
}

/* ================== FINALIZE ================== */

async function finalizeConnection({ walletId, walletName, address, provider }) {
  forceBindTronWeb(provider, address);

  setWalletState(
    buildConnectedState({
      walletId,
      walletName,
      address,
      provider
    })
  );

  const state = getWalletState();

  await refreshAllBalances({
    address: state.address,
    walletId: state.walletId,
    provider: state.provider
  });

  return { ok: true, address, walletId };
}

/* ================== MAIN ================== */

export async function connectWallet(appkit, walletId = null) {
  try {
    setWalletState({ connecting: true, error: null });

    if (!appkit) throw new Error('Wallet kit not initialized');

    if (!walletId) {
      appkit?.openWalletPicker?.();
      return { ok: true };
    }

    // Trust fallback
    if (walletId === 'Trust' && isTrustWalletBrowser()) {
      const result = await connectTrustFallback();

      return await finalizeConnection({
        walletId: result.walletId,
        walletName: result.walletName,
        address: result.address,
        provider: result.tronWeb || result.provider
      });
    }

    const adapter = pickAdapter(appkit, walletId);
    if (!adapter) throw new Error('Adapter not found');

    await connectAdapter(adapter);

    let provider = pickBestProvider(appkit, adapter);
    let address = await waitForAddress(adapter, provider);

    if (!isUsableAddress(address)) {
      await sleep(400);
      provider = pickBestProvider(appkit, adapter);
      address = await waitForAddress(adapter, provider);
    }

    if (!isUsableAddress(address)) {
      throw new Error('Address not resolved');
    }

    const walletName = resolveAdapterName(adapter);
    const walletIdResolved = resolveAdapterId(adapter) || walletName;

    forceBindTronWeb(provider, address);

    return await finalizeConnection({
      walletId: walletIdResolved,
      walletName,
      address,
      provider
    });
  } catch (error) {
    console.error('[4TEEN] connectWallet failed', error);

    setWalletState(
      buildDisconnectedState(error?.message || 'Wallet connection failed')
    );

    return { ok: false, error };
  }
}
