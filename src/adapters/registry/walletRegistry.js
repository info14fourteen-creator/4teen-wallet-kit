export const WALLET_REGISTRY = [
  {
    id: 'TronLink',
    key: 'tronlink',
    name: 'TronLink',
    driverId: 'tronlink',
    type: 'injected',
    enabled: true
  },
  {
    id: 'OKX Wallet',
    key: 'okx',
    name: 'OKX Wallet',
    driverId: 'okx',
    type: 'injected',
    enabled: true
  },
  {
    id: 'Binance Wallet',
    key: 'binance',
    name: 'Binance Wallet',
    driverId: 'binance',
    type: 'injected',
    enabled: true
  },
  {
    id: 'TokenPocket',
    key: 'tokenpocket',
    name: 'TokenPocket',
    driverId: 'tokenpocket',
    type: 'injected',
    enabled: true
  },
  {
    id: 'Bitget Wallet',
    key: 'bitget',
    name: 'Bitget Wallet',
    driverId: 'bitget',
    type: 'injected',
    enabled: true
  },
  {
    id: 'Trust',
    key: 'trust',
    name: 'Trust Wallet',
    driverId: 'trust',
    type: 'injected',
    enabled: true
  },
  {
    id: 'MetaMask',
    key: 'metamask',
    name: 'MetaMask',
    driverId: 'metamask',
    type: 'injected',
    enabled: true
  },
  {
    id: 'WalletConnect',
    key: 'walletconnect',
    name: 'WalletConnect',
    driverId: 'walletconnect',
    type: 'bridge',
    enabled: true
  }
];

export function getWalletRegistry() {
  return [...WALLET_REGISTRY];
}
