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

export function createWalletAdapters({ projectId }) {
  const adapters = [];

  // injected first (mobile browsers)
  try {
    adapters.push(new TronLinkAdapter());
  } catch (_) {}

  try {
    adapters.push(new OkxWalletAdapter());
  } catch (_) {}

  try {
    adapters.push(new BinanceWalletAdapter());
  } catch (_) {}

  try {
    adapters.push(new TokenPocketAdapter());
  } catch (_) {}

  try {
    adapters.push(new BitKeepAdapter());
  } catch (_) {}

  try {
    adapters.push(new TrustAdapter());
  } catch (_) {}

  // MetaMask через deeplink / fallback
  try {
    adapters.push(
      new MetaMaskAdapter({
        useDeeplink: true
      })
    );
  } catch (_) {}

  // WalletConnect ВСЕГДА в конце (универсальный fallback)
  try {
    adapters.push(createWalletConnect(projectId));
  } catch (_) {}

  return adapters.filter(Boolean);
}
