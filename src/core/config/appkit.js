import { createAppKit } from '@reown/appkit';
import { TronAdapter } from '@reown/appkit-adapter-tron';
import { tronMainnet } from '@reown/appkit/networks';
import { createWalletAdapters } from '../../adapters/createAdapters.js';

let appkitInstance = null;
let tronAdapterInstance = null;

const APP_METADATA = {
  name: '4TEEN Wallet Kit',
  description: 'Wallet connection layer for 4TEEN on TRON',
  url: 'https://4teen.me',
  icons: ['https://img2.creatium.app/disk2/4c/c7/a4/1c875d6b871b8c3824991c86b88e0a0f37/logo_sq_white.png']
};

export function createWalletModal({ projectId }) {
  if (appkitInstance) {
    return {
      appkit: appkitInstance,
      tronAdapter: tronAdapterInstance
    };
  }

  const walletAdapters = createWalletAdapters(projectId);

  tronAdapterInstance = new TronAdapter({
    walletAdapters
  });

  appkitInstance = createAppKit({
    projectId,
    metadata: APP_METADATA,
    networks: [tronMainnet],
    adapters: [tronAdapterInstance],
    features: {
      analytics: false
    }
  });

  return {
    appkit: appkitInstance,
    tronAdapter: tronAdapterInstance
  };
}
