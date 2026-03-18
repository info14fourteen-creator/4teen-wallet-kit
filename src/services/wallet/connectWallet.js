import { openWalletPicker } from '../../ui/wallet/openWalletPicker.js';
import { connectTrustFallback } from '../../adapters/trustFallback.js';
import { pickAdapter } from '../../adapters/registry/pickWalletAdapter.js';
import { connectAdapter } from '../../adapters/shared/connectAdapter.js';
import { pickBestProvider } from '../../adapters/shared/providerResolver.js';
import { waitForAddress, forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { isTrustWalletBrowser } from '../../adapters/trustFallback.js';
import { isUsableAddress } from '../../adapters/shared/addressResolver.js';
import { finalizeWalletConnection } from '../session/finalizeWalletConnection.js';
import { failWalletConnection } from '../session/failWalletConnection.js';
import { setWalletLifecycle } from '../../core/store/walletStore.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectWallet(appkit, walletId = null) {
  try {
    setWalletLifecycle({
      connecting: true
    });

    if (!appkit) {
      throw new Error('Wallet kit not initialized');
    }

    if (!walletId) {
      await openWalletPicker(appkit);
      setWalletLifecycle({ connecting: false });
      return { ok: true, session: null, error: null };
    }

    if (walletId === 'Trust' && isTrustWalletBrowser()) {
      const trustResult = await connectTrustFallback();

      return await finalizeWalletConnection({
        walletId: trustResult.walletId,
        walletName: trustResult.walletName,
        address: trustResult.address,
        provider: trustResult.tronWeb || trustResult.provider || null
      });
    }

    const adapter = pickAdapter(appkit, walletId);

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

    await forceBindTronWeb(provider, address);

    return await finalizeWalletConnection({
      walletId: adapter.id || adapter.name || walletId,
      walletName: adapter.name || walletId,
      address,
      provider
    });
  } catch (error) {
    return failWalletConnection(error);
  }
}
