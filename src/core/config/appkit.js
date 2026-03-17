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
  icons: ['https://4teen.me/logo.png']
};

export function getAppKit() {
  return appkitInstance;
}

export function getTronAdapter() {
  return tronAdapterInstance;
}

export function createWalletModal({ projectId }) {
  if (appkitInstance) {
    return {
      appkit: appkitInstance,
      tronAdapter: tronAdapterInstance
    };
  }

  if (!projectId) {
    throw new Error('createWalletModal: projectId is required');
  }

  const walletAdapters = createWalletAdapters(projectId);

  tronAdapterInstance = new TronAdapter({
    walletAdapters
  });

  const created = createAppKit({
    projectId,
    metadata: APP_METADATA,
    networks: [tronMainnet],
    adapters: [tronAdapterInstance],
    features: {
      analytics: false
    }
  });

  appkitInstance = created || null;

  return {
    appkit: appkitInstance,
    tronAdapter: tronAdapterInstance
  };
}
