import {
  TronLinkAdapter,
  OkxWalletAdapter,
  BinanceWalletAdapter,
  TrustAdapter,
  BitKeepAdapter,
  TokenPocketAdapter,
  MetaMaskAdapter,
  WalletConnectAdapter
} from '@tronweb3/tronwallet-adapters';

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

function isOkxBrowser() {
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

function isBinanceBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance') ||
    !!win?.BinanceChain
  );
}

function isTronLinkBrowser() {
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

function isTrustBrowser() {
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

function isMetaMaskBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=metamask') ||
    ua.includes('metamask') ||
    !!win?.ethereum?.isMetaMask
  );
}

function isTokenPocketBrowser() {
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

function isBitgetBrowser() {
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

function getPreferredInjectedOrder() {
  if (isOkxBrowser()) {
    return ['OKX Wallet', 'WalletConnect'];
  }

  if (isBinanceBrowser()) {
    return ['Binance Wallet', 'WalletConnect'];
  }

  if (isTronLinkBrowser()) {
    return ['TronLink', 'WalletConnect'];
  }

  if (isTokenPocketBrowser()) {
    return ['TokenPocket', 'WalletConnect'];
  }

  if (isBitgetBrowser()) {
    return ['Bitget Wallet', 'WalletConnect'];
  }

  if (isTrustBrowser()) {
    return ['Trust', 'WalletConnect'];
  }

  if (isMetaMaskBrowser()) {
    return ['MetaMask', 'WalletConnect'];
  }

  return [
    'TronLink',
    'OKX Wallet',
    'Binance Wallet',
    'TokenPocket',
    'Bitget Wallet',
    'Trust',
    'MetaMask',
    'WalletConnect'
  ];
}

function createWalletConnect(projectId) {
  return new WalletConnectAdapter({
    network: 'Mainnet',
    options: {
      projectId,
      relayUrl: 'wss://relay.walletconnect.com',
      metadata: {
        name: '4TEEN',
        description: '4TEEN wallet connection',
        url: 'https://4teen.me',
        icons: ['https://4teen.me/logo.png']
      }
    }
  });
}

function createNamedAdapters(projectId) {
  const entries = [];

  try {
    entries.push({
      name: 'TronLink',
      adapter: new TronLinkAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'OKX Wallet',
      adapter: new OkxWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'Binance Wallet',
      adapter: new BinanceWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'TokenPocket',
      adapter: new TokenPocketAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'Bitget Wallet',
      adapter: new BitKeepAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'Trust',
      adapter: new TrustAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'MetaMask',
      adapter: new MetaMaskAdapter({
        useDeeplink: true
      })
    });
  } catch (_) {}

  try {
    entries.push({
      name: 'WalletConnect',
      adapter: createWalletConnect(projectId)
    });
  } catch (_) {}

  return entries;
}

export function createWalletAdapters({ projectId }) {
  const entries = createNamedAdapters(projectId);
  const order = getPreferredInjectedOrder();

  const sorted = [...entries].sort((a, b) => {
    const ai = order.indexOf(a.name);
    const bi = order.indexOf(b.name);

    const aRank = ai === -1 ? 999 : ai;
    const bRank = bi === -1 ? 999 : bi;

    return aRank - bRank;
  });

  return sorted.map((item) => item.adapter).filter(Boolean);
}
