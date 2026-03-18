import { getDriverById } from '../../adapters/registry/getDriverById.js';
import { setWalletState } from '../../core/store/walletStore.js';
import { openWalletPicker } from '../../ui/wallet/openWalletPicker.js';
import { failWalletConnection } from '../session/failWalletConnection.js';
import { finalizeWalletConnection } from '../session/finalizeWalletConnection.js';

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

    const driver = getDriverById(walletId);

    if (!driver) {
      throw new Error(`Driver not found: ${walletId}`);
    }

    const result = await driver.connect(appkit);

    if (!result?.address) {
      throw new Error(`${driver.name || walletId} did not return address`);
    }

    return await finalizeWalletConnection({
      walletId: result.walletId || driver.name || walletId,
      walletName: result.walletName || driver.name || walletId,
      address: result.address,
      provider: result.tronWeb || result.provider || null
    });
  } catch (error) {
    return failWalletConnection(error);
  }
}
