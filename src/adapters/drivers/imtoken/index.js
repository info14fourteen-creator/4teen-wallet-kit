import { isUsableAddress } from '../../shared/addressResolver.js';
import { forceBindTronWeb } from '../../shared/accountRequests.js';

const DRIVER_NAME = 'imToken';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getProvider() {
  const win = getWindowSafe();
  return win?.tronweb || win?.tronWeb || null;
}

function extractAddress(provider) {
  return (
    provider?.defaultAddress?.base58 ||
    provider?.address ||
    null
  );
}

export const imTokenDriver = {
  id: 'imtoken',
  name: DRIVER_NAME,

  async connect() {
    const provider = getProvider();

    if (!provider) {
      throw new Error('imToken provider not found');
    }

    let address = extractAddress(provider);

    if (!isUsableAddress(address)) {
      try {
        const res = await provider.request?.({
          method: 'tron_requestAccounts'
        });

        if (Array.isArray(res?.data)) {
          address = res.data[0];
        }
      } catch (_) {}
    }

    if (!isUsableAddress(address)) {
      throw new Error('imToken address not resolved');
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

export function createImTokenDriver() {
  return imTokenDriver;
}
