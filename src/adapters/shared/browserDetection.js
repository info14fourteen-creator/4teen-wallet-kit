function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getUserAgent() {
  const win = getWindowSafe();
  return String(win?.navigator?.userAgent || '').toLowerCase();
}

function getLocationHref() {
  const win = getWindowSafe();
  return String(win?.location?.href || '').toLowerCase();
}

export function isOkxBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=okx') ||
    ua.includes('okex/') ||
    ua.includes('okapp/') ||
    ua.includes('okx') ||
    !!win?.okxwallet ||
    !!win?.okxWallet
  );
}

export function isBinanceBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance') ||
    !!win?.BinanceChain ||
    !!win?.binancew3w
  );
}

export function isTronLinkBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

export function isTrustWalletBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet') ||
    !!win?.trustwallet ||
    !!win?.trustWallet
  );
}

export function isMetaMaskBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=metamask') ||
    ua.includes('metamask') ||
    !!win?.ethereum?.isMetaMask
  );
}

export function isTokenPocketBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=tokenpocket') ||
    ua.includes('tokenpocket') ||
    ua.includes('tp/') ||
    !!win?.tp ||
    !!win?.tokenPocket
  );
}

export function isBitgetBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=bitget') ||
    href.includes('utm_source=bitkeep') ||
    ua.includes('bitkeep') ||
    ua.includes('bitget') ||
    !!win?.bitkeep ||
    !!win?.bitget
  );
}

export function isImTokenBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=imtoken') ||
    ua.includes('imtoken') ||
    !!win?.tronweb
  );
}

export function isFoxWalletBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=foxwallet') ||
    ua.includes('foxwallet') ||
    ua.includes('fox wallet') ||
    !!win?.foxwallet?.tronLink ||
    !!win?.foxwallet
  );
}

export function detectBrowserWalletName() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustWalletBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  if (isImTokenBrowser()) return 'imToken';
  if (isFoxWalletBrowser()) return 'FoxWallet';
  return null;
}

export function isWalletBrowser() {
  return !!detectBrowserWalletName();
}

export function getBrowserDetectionSnapshot() {
  return {
    okx: isOkxBrowser(),
    binance: isBinanceBrowser(),
    tronLink: isTronLinkBrowser(),
    trust: isTrustWalletBrowser(),
    metaMask: isMetaMaskBrowser(),
    tokenPocket: isTokenPocketBrowser(),
    bitget: isBitgetBrowser(),
    imToken: isImTokenBrowser(),
    foxWallet: isFoxWalletBrowser(),
    detectedWalletName: detectBrowserWalletName()
  };
}
