import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet';
import { BinanceAdapter } from '@tronweb3/tronwallet-adapter-binance';
import { TrustAdapter } from '@tronweb3/tronwallet-adapter-trust';
import { BitKeepAdapter } from '@tronweb3/tronwallet-adapter-bitkeep';
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';

export function createWalletAdapters() {
  return [
    new TronLinkAdapter(),
    new OkxWalletAdapter(),
    new BinanceAdapter(),
    new TrustAdapter(),
    new BitKeepAdapter(),
    new TokenPocketAdapter(),
    new WalletConnectAdapter({
      network: 'Mainnet',
      options: {
        projectId: import.meta.env.VITE_REOWN_PROJECT_ID
      }
    })
  ];
}
