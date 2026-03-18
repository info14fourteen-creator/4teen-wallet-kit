function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function isHexAddress(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]{40}$/.test(value);
}

function isTronAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getTrustProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.trustwallet?.tronWeb ||
    win.trustwallet ||
    win.trustWallet?.tronWeb ||
    win.trustWallet ||
    win.trustwallet?.ethereum ||
    win.trustWallet?.ethereum ||
    null
  );
}

function getTrustContainer() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.trustwallet ||
    win.trustWallet ||
    null
  );
}

function normalizeAccountsPayload(accounts) {
  if (Array.isArray(accounts)) {
    return accounts[0] || null;
  }

  if (typeof accounts === 'string') {
    return accounts || null;
  }

  if (accounts && typeof accounts === 'object') {
    if (Array.isArray(accounts.result)) return accounts.result[0] || null;
    if (Array.isArray(accounts.accounts)) return accounts.accounts[0] || null;
    if (typeof accounts.address === 'string') return accounts.address;
    if (typeof accounts.selectedAddress === 'string') return accounts.selectedAddress;
    if (typeof accounts.publicKey === 'string') return accounts.publicKey;
    if (typeof accounts.result?.address === 'string') return accounts.result.address;
    if (typeof accounts.data?.address === 'string') return accounts.data.address;
  }

  return null;
}

function getAddressFromTronWeb(tronWeb) {
  return (
    tronWeb?.defaultAddress?.base58 ||
    tronWeb?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function getTronWebFromWindow() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.tronWeb ||
    win.trustwallet?.tronWeb ||
    win.trustWallet?.tronWeb ||
    null
  );
}

function normalizeTrustAddress(address, tronWeb = null) {
  if (!address) {
    return null;
  }

  if (isTronAddress(address)) {
    return address;
  }

  if (isHexAddress(address) && tronWeb?.address?.fromHex) {
    try {
      const converted = tronWeb.address.fromHex(address);

      if (isTronAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  return null;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tryProviderRequest(provider, method, params = []) {
  if (!provider) {
    return null;
  }

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({ method, params });
    } catch (_) {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch (_) {}
  }

  return null;
}

async function requestAccounts(provider, tronWeb = null) {
  if (!provider) {
    return null;
  }

  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null],
    ['eth_requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = normalizeAccountsPayload(result);
    const normalized = normalizeTrustAddress(address, tronWeb);

    if (normalized) {
      return normalized;
    }
  }

  return null;
}

async function forceBindTronWeb(tronWeb, address) {
  if (!tronWeb || !address) {
    return;
  }

  try {
    if (typeof tronWeb.setAddress === 'function') {
      tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    if (tronWeb.defaultAddress && typeof tronWeb.defaultAddress === 'object') {
      tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}

  try {
    if (tronWeb.defaultAddress && typeof tronWeb.defaultAddress === 'object' && typeof tronWeb.address?.toHex === 'function') {
      tronWeb.defaultAddress.hex = tronWeb.address.toHex(address);
    }
  } catch (_) {}
}

function readDirectTrustAddress(provider, tronWeb) {
  return (
    normalizeTrustAddress(provider?.address, tronWeb) ||
    normalizeTrustAddress(provider?.selectedAddress, tronWeb) ||
    normalizeTrustAddress(provider?.defaultAddress?.base58, tronWeb) ||
    normalizeTrustAddress(provider?.tronWeb?.defaultAddress?.base58, tronWeb) ||
    normalizeTrustAddress(getAddressFromTronWeb(tronWeb), tronWeb) ||
    null
  );
}

async function waitForTrustAddress(provider, tronWeb, options = {}) {
  const {
    attempts = 18,
    intervalMs = 180,
    requestAt = [0, 2, 4, 8, 12]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = readDirectTrustAddress(provider, tronWeb);

    if (directAddress) {
      await forceBindTronWeb(tronWeb, directAddress);
      return directAddress;
    }

    if (requestAt.includes(i)) {
      const requestedAddress = await requestAccounts(provider, tronWeb);

      if (requestedAddress) {
        await forceBindTronWeb(tronWeb, requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(intervalMs);
  }

  return null;
}

export function isTrustWalletBrowser() {
  const win = getWindowSafe();
  if (!win) return false;

  const href = String(win.location?.href || '').toLowerCase();
  const ua = String(win.navigator?.userAgent || '').toLowerCase();

  return !!(
    getTrustProvider() ||
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet')
  );
}

export async function connectTrustFallback() {
  const container = getTrustContainer();
  const provider = getTrustProvider();
  const tronWeb = getTronWebFromWindow();

  const address = await waitForTrustAddress(container || provider, tronWeb, {
    attempts: 20,
    intervalMs: 180,
    requestAt: [0, 1, 2, 4, 8, 12]
  });

  if (!address) {
    throw new Error('Trust Wallet did not provide a TRON address');
  }

  await forceBindTronWeb(tronWeb, address);

  return {
    walletId: 'Trust',
    walletName: 'Trust Wallet',
    address,
    provider: provider || container || null,
    tronWeb: tronWeb || provider || container || null
  };
}
