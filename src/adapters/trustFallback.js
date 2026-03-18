function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getTrustProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.trustwallet ||
    win.trustWallet ||
    win.trustwallet?.ethereum ||
    win.trustWallet?.ethereum ||
    null
  );
}

function isHexAddress(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]{40}$/.test(value);
}

function isTronAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
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
  }

  return null;
}

function getAddressFromTronWeb(tronWeb) {
  return tronWeb?.defaultAddress?.base58 || null;
}

function getTronWebFromWindow() {
  const win = getWindowSafe();
  if (!win) return null;

  if (win.tronWeb) {
    return win.tronWeb;
  }

  if (win.TronWeb) {
    try {
      return new win.TronWeb({
        fullHost: 'https://api.trongrid.io'
      });
    } catch (_) {
      return null;
    }
  }

  return null;
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
    throw new Error('Trust provider not found');
  }

  const methods = [
    ['tron_requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
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
      return;
    }
  } catch (_) {}

  try {
    tronWeb.defaultAddress = {
      base58: address,
      hex: tronWeb.address?.toHex?.(address) || ''
    };
  } catch (_) {}
}

export function isTrustWalletBrowser() {
  const win = getWindowSafe();
  if (!win) return false;

  const href = String(win.location?.href || '').toLowerCase();
  const ua = String(win.navigator?.userAgent || '').toLowerCase();

  return (
    !!getTrustProvider() ||
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet')
  );
}

export async function connectTrustFallback() {
  const provider = getTrustProvider();
  const tronWeb = getTronWebFromWindow();

  const requestedAddress = await requestAccounts(provider, tronWeb);
  const winAddress = normalizeTrustAddress(getAddressFromTronWeb(tronWeb), tronWeb);

  const address = winAddress || requestedAddress || null;

  if (!address) {
    throw new Error('Trust Wallet did not provide a TRON address');
  }

  await forceBindTronWeb(tronWeb, address);

  return {
    walletId: 'Trust',
    walletName: 'Trust Wallet',
    address,
    provider,
    tronWeb
  };
}
