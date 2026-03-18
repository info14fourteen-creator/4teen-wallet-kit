import { TronWeb } from 'tronweb';

const DEFAULT_FULL_HOST = 'https://api.trongrid.io';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function createReadonlyTronWeb(options = {}) {
  const {
    fullHost = DEFAULT_FULL_HOST,
    address = null
  } = options;

  const tronWeb = new TronWeb({ fullHost });

  if (address && isUsableAddress(address)) {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}
  }

  return tronWeb;
}

export function getDefaultReadonlyTronWeb(address = null) {
  return createReadonlyTronWeb({
    fullHost: DEFAULT_FULL_HOST,
    address
  });
}
