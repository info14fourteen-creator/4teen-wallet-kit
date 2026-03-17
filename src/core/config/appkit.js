import { createAppKit } from '@reown/appkit';
import { TronAdapter } from '@reown/appkit-adapter-tron';
import { tronMainnet } from '@reown/appkit/networks';
import { APP_METADATA } from './constants.js';
import { createWalletAdapters } from '../../adapters/createAdapters.js';

let modal = null;

export function createWalletModal({ projectId }) {
  if (modal) return modal;

  const tronAdapter = new TronAdapter({
    walletAdapters: createWalletAdapters()
  });

  modal = createAppKit({
    adapters: [tronAdapter],
    networks: [tronMainnet],
    metadata: APP_METADATA,
    projectId,
    features: {
      analytics: false
    }
  });

  return modal;
}
