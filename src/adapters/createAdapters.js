import {
  TronLinkAdapter,
  OkxWalletAdapter,
  BinanceWalletAdapter,
  TrustAdapter,
  BitKeepAdapter,
  TokenPocketAdapter,
  MetaMaskAdapter,
  WalletConnectAdapter,
  ImTokenAdapter,
  FoxWalletAdapter
} from '@tronweb3/tronwallet-adapters';

import {
  isOkxBrowser,
  isBinanceBrowser,
  isTronLinkBrowser,
  isTrustWalletBrowser,
  isMetaMaskBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  isImTokenBrowser,
  isFoxWalletBrowser
} from './shared/browserDetection.js';

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

  if (isTrustWalletBrowser()) {
    return ['Trust', 'WalletConnect'];
  }

  if (isMetaMaskBrowser()) {
    return ['MetaMask', 'WalletConnect'];
  }

  if (isImTokenBrowser()) {
    return ['imToken', 'WalletConnect'];
  }

  if (isFoxWalletBrowser()) {
    return ['FoxWallet', 'WalletConnect'];
  }

  return [
    'TronLink',
    'OKX Wallet',
    'Binance Wallet',
    'TokenPocket',
    'Bitget Wallet',
    'Trust',
    'MetaMask',
    'imToken',
    'FoxWallet',
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
      id: 'TronLink',
      name: 'TronLink',
      adapter: new TronLinkAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'OKX Wallet',
      name: 'OKX Wallet',
      adapter: new OkxWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'Binance Wallet',
      name: 'Binance Wallet',
      adapter: new BinanceWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'TokenPocket',
      name: 'TokenPocket',
      adapter: new TokenPocketAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'Bitget Wallet',
      name: 'Bitget Wallet',
      adapter: new BitKeepAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'Trust',
      name: 'Trust',
      adapter: new TrustAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'MetaMask',
      name: 'MetaMask',
      adapter: new MetaMaskAdapter({
        useDeeplink: true
      })
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'imToken',
      name: 'imToken',
      adapter: new ImTokenAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'FoxWallet',
      name: 'FoxWallet',
      adapter: new FoxWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'WalletConnect',
      name: 'WalletConnect',
      adapter: createWalletConnect(projectId)
    });
  } catch (_) {}

  return entries;
}

function decorateAdapter(entry) {
  const adapter = entry?.adapter;

  if (!adapter) {
    return null;
  }

  try {
    if (!adapter.id) {
      adapter.id = entry.id;
    }
  } catch (_) {}

  try {
    if (!adapter.name) {
      adapter.name = entry.name;
    }
  } catch (_) {}

  return adapter;
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

  return sorted
    .map(decorateAdapter)
    .filter(Boolean);
}
