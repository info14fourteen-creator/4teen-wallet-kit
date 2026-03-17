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

export function createWalletAdapters({ projectId }) {
  return [
    new TronLinkAdapter(),
    new OkxWalletAdapter(),
    new BinanceWalletAdapter(),
    new TrustAdapter(),
    new BitKeepAdapter(),
    new TokenPocketAdapter(),
    new MetaMaskAdapter({
      useDeeplink: true
    }),
    new WalletConnectAdapter({
      network: 'Mainnet',
      options: {
        projectId,
        metadata: {
          name: '4TEEN',
          description: '4TEEN wallet connection',
          url: 'https://4teen.me',
          icons: ['https://4teen.me/logo.png']
        }
      }
    })
  ];
}
