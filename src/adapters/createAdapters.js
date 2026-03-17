import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet';
import { BinanceWalletAdapter } from '@tronweb3/tronwallet-adapter-binance';
import { TrustAdapter } from '@tronweb3/tronwallet-adapter-trust';
import { BitKeepAdapter } from '@tronweb3/tronwallet-adapter-bitkeep';
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket';
import { MetaMaskAdapter } from '@tronweb3/tronwallet-adapter-metamask';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';

export function createWalletAdapters(projectId) {
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
        projectId
      }
    })
  ];
}
