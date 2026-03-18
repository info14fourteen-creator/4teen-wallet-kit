import { isUsableAddress } from '../../shared/addressResolver.js';
import { forceBindTronWeb } from '../../shared/accountRequests.js';

const DRIVER_NAME = 'FoxWallet';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function extractAddress(payload, provider) {
  const candidates = [
    payload,
    payload?.data,
    payload?.result,
    provider?.defaultAddress?.base58,
    provider?.address
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) {
      if (isUsableAddress(c[0])) return c[0];
    }

    if (typeof c === 'string' && isUsableAddress(c)) {
      return c;
    }
  }

  return null;
}

async function requestAccounts(provider) {
  if (!provider) return null;

  try {
    const res = await provider.request?.({
      method: 'tron_requestAccounts'
    });

    return extractAddress(res, provider);
  } catch (_) {}

  return null;
}

export const foxWalletDriver = {
  id: 'foxwallet',
  name: DRIVER_NAME,

  async connect() {
    const win = getWindowSafe();

    const provider =
      win?.foxwallet ||
      win?.tronWeb ||
      null;

    if (!provider) {
      throw new Error('FoxWallet provider not found');
    }

    let address =
      extractAddress(null, provider) ||
      await requestAccounts(provider);

    if (!isUsableAddress(address)) {
      throw new Error('FoxWallet address not resolved');
    }

    await forceBindTronWeb(provider, address);

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb: provider
    };
  }
};

export function createFoxWalletDriver() {
  return foxWalletDriver;
}
