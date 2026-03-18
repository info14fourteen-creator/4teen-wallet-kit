import { isTrustWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { isUsableAddress } from '../../adapters/shared/addressResolver.js';
import { waitForAddress } from '../../adapters/shared/accountRequests.js';
import { connectAdapter } from '../../adapters/shared/connectAdapter.js';
import { pickBestProvider } from '../../adapters/shared/providerResolver.js';
import { pickWalletAdapter } from '../../adapters/registry/pickWalletAdapter.js';
import { connectTrustFallback } from '../../adapters/trustFallback.js';
import { setWalletState } from '../../core/store/walletStore.js';
import { openWalletPicker } from '../../ui/wallet/openWalletPicker.js';
import { failWalletConnection } from '../session/failWalletConnection.js';
import { finalizeWalletConnection } from '../session/finalizeWalletConnection.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function getAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

export async function connectWallet(appkit, walletId = null) {
  try {
    setWalletState({
      connecting: true,
      error: null
    });

    if (!appkit) {
      throw new Error('Wallet kit not initialized');
    }

    if (!walletId) {
      await openWalletPicker(appkit);

      return {
        ok: true,
        session: null,
        error: null
      };
    }

    if (typeof appkit.selectWallet === 'function') {
      appkit.selectWallet(walletId);
    }

    if (walletId === 'Trust' && isTrustWalletBrowser()) {
      const result = await connectTrustFallback();

      return await finalizeWalletConnection({
        walletId: result.walletId,
        walletName: result.walletName,
        address: result.address,
        provider: result.tronWeb || result.provider || null
      });
    }

    const adapter =
      (typeof appkit.getAdapterById === 'function' && appkit.getAdapterById(walletId)) ||
      pickWalletAdapter(appkit, walletId);

    if (!adapter) {
      throw new Error(`Adapter not found: ${walletId}`);
    }

    await connectAdapter(adapter);

    let provider = null;
    let address = null;

    for (const delay of [0, 400, 600]) {
      if (delay) {
        await sleep(delay);
      }

      provider = pickBestProvider(appkit, adapter, walletId);
      address = await waitForAddress(adapter, provider);

      if (isUsableAddress(address)) {
        break;
      }
    }

    if (!isUsableAddress(address)) {
      throw new Error('Address not resolved');
    }

    const walletIdResolved = getAdapterId(adapter) || walletId;
    const walletNameResolved = getAdapterName(adapter) || walletId;

    return await finalizeWalletConnection({
      walletId: walletIdResolved,
      walletName: walletNameResolved,
      address,
      provider
    });
  } catch (error) {
    return failWalletConnection(error);
  }
}
