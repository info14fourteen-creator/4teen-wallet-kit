import { getSunioTrxQuotes } from './suniotrx.js';
import { getSunioUsdtQuotes } from './suniousdt.js';

export const SUNIO_MAINNET_DEFAULTS = {
  calculationServiceUrl: 'https://rot.endjgfsv.link/swap/routerUniversal',
  typeList: ''
};

export const SUNIO_TOKEN_ADDRESSES = {
  TRX: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  USDT: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
};

export function getSunioProviderMeta() {
  return {
    id: 'sunio',
    name: 'SUN.io',
    supports: ['TRX', 'USDT']
  };
}

export async function getSunioQuotes({
  targetToken,
  amountIn,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3
} = {}) {
  if (!targetToken) {
    throw new Error('SUN.io: targetToken is required');
  }

  const normalizedTarget = String(targetToken).toUpperCase();

  if (normalizedTarget === 'TRX') {
    return getSunioTrxQuotes({
      amountIn,
      fromTokenAddress,
      tokenAddresses,
      inputDecimals,
      outputDecimals,
      routeCount
    });
  }

  if (normalizedTarget === 'USDT') {
    return getSunioUsdtQuotes({
      amountIn,
      fromTokenAddress,
      tokenAddresses,
      inputDecimals,
      outputDecimals,
      routeCount
    });
  }

  throw new Error(`SUN.io: unsupported target token "${targetToken}"`);
}
