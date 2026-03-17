import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function resolveAdapterId(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.id ||
    adapter?.key ||
    null
  );
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

function resolveAdapterReadyState(adapter) {
  return String(adapter?.readyState || '');
}

function resolveConnectedAdapters(appkit) {
  const adapters = appkit?.getConnectors?.() || appkit?.connectors || appkit?.adapters || [];
  return Array.isArray(adapters) ? adapters : [];
}

function getUserAgent() {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent || '';
}

function detectPreferredWalletId() {
  const ua = normalizeText(getUserAgent());
  const href = normalizeText(typeof window !== 'undefined' ? window.location?.href : '');

  if (ua.includes('okex') || ua.includes('okx')) return 'OKX Wallet';
  if (ua.includes('tokenpocket')) return 'TokenPocket';
  if (ua.includes('bitkeep') || ua.includes('bitget')) return 'Bitget Wallet';
  if (ua.includes('bnc/') || ua.includes('binance')) return 'Binance Wallet';
  if (ua.includes('tronlink') || href.includes('utm_source=tronlink')) return 'TronLink';
  if (href.includes('trust_ios_browser') || ua.includes('trust')) return 'Trust';

  return null;
}

function scoreAdapter(adapter, preferredWalletId, selectedWalletId) {
  const id = resolveAdapterId(adapter);
  const name = resolveAdapterName(adapter);
  const readyState = resolveAdapterReadyState(adapter);
  const connected = !!adapter?.connected;

  let score = 0;

  if (connected) score += 1000;
  if (readyState === 'Found') score += 100;
  if (readyState === 'Installed') score += 90;
  if (readyState === 'Loadable') score += 70;
  if (readyState === 'Loading') score += 15;

  if (selectedWalletId && (id === selectedWalletId || name === selectedWalletId)) {
    score += 10000;
  }

  if (preferredWalletId && (id === preferredWalletId || name === preferredWalletId)) {
    score += 5000;
  }

  if (preferredWalletId && preferredWalletId !== 'TronLink' && (id === 'TronLink' || name === 'TronLink')) {
    score -= 500;
  }

  return score;
}

function pickBestAdapter(appkit, selectedWalletId) {
  const adapters = resolveConnectedAdapters(appkit);
  const preferredWalletId = detectPreferredWalletId();

  if (!adapters.length) {
    return null;
  }

  const ranked = [...adapters]
    .map((adapter) => ({
      adapter,
      score: scoreAdapter(adapter, preferredWalletId, selectedWalletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.adapter || null;
}

function resolveAddressFromAdapter(adapter) {
  return (
    adapter?.address ||
    adapter?.publicKey ||
    adapter?.account?.address ||
    adapter?.adapter?.address ||
    null
  );
}

function resolveAddressFromProvider(provider) {
  const direct =
    provider?.address ||
    provider?.selectedAddress ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    null;

  if (isUsableAddress(direct)) return direct;

  const request = provider?.request;
  if (typeof request === 'function') {
    return null;
  }

  return null;
}

async function tryRequestAccounts(provider) {
  if (!provider || typeof provider.request !== 'function') {
    return null;
  }

  const methods = [
    'tron_requestAccounts',
    'requestAccounts'
  ];

  for (const method of methods) {
    try {
      const result = await provider.request({ method });

      if (Array.isArray(result) && isUsableAddress(result[0])) {
        return result[0];
      }

      if (typeof result === 'string' && isUsableAddress(result)) {
        return result;
      }

      if (result?.address && isUsableAddress(result.address)) {
        return result.address;
      }

      if (result?.data?.address && isUsableAddress(result.data.address)) {
        return result.data.address;
      }
    } catch (error) {
      console.warn('[4TEEN] request accounts method failed', { method, error });
    }
  }

  return null;
}

async function waitForAdapterAddress(adapter, provider, attempts = 12, delayMs = 250) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const adapterAddress = resolveAddressFromAdapter(adapter);
    const providerAddress = resolveAddressFromProvider(provider);
    const requestedAddress = providerAddress || (attempt === 1 ? await tryRequestAccounts(provider) : null);

    const resolved = [adapterAddress, providerAddress, requestedAddress].find(isUsableAddress) || null;

    console.log('[4TEEN] waitForAdapterAddress attempt', {
      attempt,
      adapter: resolveAdapterName(adapter),
      address: resolved
    });

    if (resolved) {
      return resolved;
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return null;
}

function resolveWalletProvider(appkit, adapter) {
  const candidates = [
    appkit?.getWalletProvider?.(),
    adapter?.provider,
    adapter?.tronWeb,
    typeof window !== 'undefined' ? window.tronWeb : null
  ];

  return candidates.find(Boolean) || null;
}

export async function connectWallet(appkit, walletId = null) {
  try {
    setWalletState({
      connecting: true,
      connected: false,
      error: null,
      activeWalletId: walletId || null
    });

    if (!appkit) {
      throw new Error('Wallet kit is not initialized');
    }

    if (walletId && typeof appkit.connect === 'function') {
      await appkit.connect(walletId);
    } else if (typeof appkit.open === 'function') {
      await appkit.open();
    } else {
      throw new Error('Wallet modal is not available');
    }

    const selectedAdapter = pickBestAdapter(appkit, walletId);
    if (!selectedAdapter) {
      throw new Error('Selected wallet is not available');
    }

    const provider = resolveWalletProvider(appkit, selectedAdapter);
    const address = await waitForAdapterAddress(selectedAdapter, provider);

    if (!isUsableAddress(address)) {
      throw new Error('Wallet connected but address not resolved');
    }

    const walletName = resolveAdapterName(selectedAdapter);
    const activeWalletId = resolveAdapterId(selectedAdapter) || walletId || walletName;

    setWalletState({
      connecting: false,
      connected: true,

      walletId: activeWalletId,
      walletName,
      activeWalletId,
      activeWalletName: walletName,

      address,
      shortAddress: shortenAddress(address),

      provider,
      tronWeb: provider?.tronWeb || provider || null,

      error: null
    });

    const latestState = getWalletState();

    await refreshAllBalances({
      address: latestState.address,
      walletId: latestState.activeWalletId,
      provider: latestState.provider
    });

    return { ok: true, address, walletId: activeWalletId };
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
      error: error?.message || 'Wallet connection failed'
    });

    return { ok: false, error };
  }
}
