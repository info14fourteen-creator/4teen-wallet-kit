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

async function requestAccounts(provider) {
  if (!provider) {
    throw new Error('Trust provider not found');
  }

  if (typeof provider.request === 'function') {
    try {
      const tronAccounts = await provider.request({
        method: 'tron_requestAccounts'
      });
      const tronAddress = normalizeAccountsPayload(tronAccounts);
      if (tronAddress) return tronAddress;
    } catch (_) {}

    try {
      const ethAccounts = await provider.request({
        method: 'eth_requestAccounts'
      });
      const ethAddress = normalizeAccountsPayload(ethAccounts);
      if (ethAddress) return ethAddress;
    } catch (_) {}
  }

  if (typeof provider.send === 'function') {
    try {
      const tronAccounts = await provider.send('tron_requestAccounts', []);
      const tronAddress = normalizeAccountsPayload(tronAccounts);
      if (tronAddress) return tronAddress;
    } catch (_) {}

    try {
      const ethAccounts = await provider.send('eth_requestAccounts', []);
      const ethAddress = normalizeAccountsPayload(ethAccounts);
      if (ethAddress) return ethAddress;
    } catch (_) {}
  }

  return null;
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
    ua.includes('trust')
  );
}

export async function connectTrustFallback() {
  const provider = getTrustProvider();
  const tronWeb = getTronWebFromWindow();

  const requestedAddress = await requestAccounts(provider);

  const winAddress = getAddressFromTronWeb(tronWeb);

  let address = winAddress || requestedAddress || null;

  if (isHexAddress(address) && tronWeb?.address?.fromHex) {
    try {
      address = tronWeb.address.fromHex(address);
    } catch (_) {}
  }

  if (!address) {
    throw new Error('Trust Wallet did not provide a TRON address');
  }

  if (tronWeb && typeof tronWeb.setAddress === 'function') {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}
  }

  return {
    walletId: 'Trust',
    walletName: 'Trust Wallet',
    address,
    provider,
    tronWeb
  };
}
