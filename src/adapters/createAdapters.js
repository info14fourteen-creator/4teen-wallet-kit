import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet';
import { BinanceWalletAdapter } from '@tronweb3/tronwallet-adapter-binancewallet';
import { TrustAdapter } from '@tronweb3/tronwallet-adapter-trust';
import { BitKeepAdapter } from '@tronweb3/tronwallet-adapter-bitkeep';
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket';
import { MetaMaskAdapter } from '@tronweb3/tronwallet-adapter-metamask-evm';

export function createWalletAdapters() {
  return [
    new TronLinkAdapter(),
    new OkxWalletAdapter(),
    new BinanceWalletAdapter(),
    new TrustAdapter(),
    new BitKeepAdapter(),
    new TokenPocketAdapter(),
    new MetaMaskAdapter()
  ];
}
