import { detectBrowserWalletName } from '../shared/browserDetection.js';

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

function normalizeWalletId(value) {
  return String(value || '').trim().toLowerCase();
}

function isWalletConnectAdapter(adapter) {
  const adapterId = normalizeWalletId(getAdapterId(adapter));
  const adapterName = normalizeWalletId(getAdapterName(adapter));

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

  for (const candidate of candidates) {
    if (isUsableAddress(candidate)) {
      return candidate;
    }
  }

  return null;
}

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (typeof appkit.getConnectors === 'function') {
    const connectors = appkit.getConnectors();
    return Array.isArray(connectors) ? connectors : [];
  }

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function isAdapterAllowedForBrowser(adapter, browserWalletName) {
  if (!browserWalletName) return true;
  if (isWalletConnectAdapter(adapter)) return true;

  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);

  return adapterName === browserWalletName || adapterId === browserWalletName;
}

function getAdapterScore(adapter, walletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const address = readAddressFromAdapter(adapter);

  let score = 0;

  if (!isAdapterAllowedForBrowser(adapter, browserWalletName)) {
    return -100000;
  }

  if (walletId && normalizeWalletId(walletId) === normalizeWalletId(adapterId)) {
    score += 30000;
  }

  if (walletId && normalizeWalletId(walletId) === normalizeWalletId(adapterName)) {
    score += 30000;
  }

  if (browserWalletName && adapterName === browserWalletName) {
    score += 20000;
  }

  if (browserWalletName && adapterId === browserWalletName) {
    score += 20000;
  }

  if (connected) score += 10000;
  if (address) score += 12000;

  if (readyState === 'Found') score += 500;
  if (readyState === 'Installed') score += 450;
  if (readyState === 'Loadable') score += 250;
  if (readyState === 'Loading') score += 50;

  if (browserWalletName && browserWalletName !== 'TronLink') {
    if (adapterName === 'TronLink' || adapterId === 'TronLink') {
      score -= 25000;
    }
  }

  if (isWalletConnectAdapter(adapter) && browserWalletName) {
    score -= 5000;
  }

  return score;
}

export function pickWalletAdapter(appkit, walletId = null) {
  const adapters = resolveAdapters(appkit);

  if (!adapters.length) {
    return null;
  }

  const ranked = [...adapters]
    .map((adapter) => ({
      adapter,
      score: getAdapterScore(adapter, walletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.adapter || null;
}

export function getWalletAdapterById(appkit, walletId) {
  if (!walletId) return null;

  const adapters = resolveAdapters(appkit);

  return (
    adapters.find((adapter) => {
      return (
        getAdapterId(adapter) === walletId ||
        getAdapterName(adapter) === walletId
      );
    }) || null
  );
}

export function listWalletAdapters(appkit) {
  return resolveAdapters(appkit).map((adapter) => ({
    id: getAdapterId(adapter) || getAdapterName(adapter),
    name: getAdapterName(adapter),
    readyState: adapter?.readyState || 'Unknown',
    connected: !!adapter?.connected,
    hasAddress: !!readAddressFromAdapter(adapter)
  }));
}
