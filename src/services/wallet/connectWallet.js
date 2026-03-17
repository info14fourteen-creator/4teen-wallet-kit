import { setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

export async function connectWallet(appkit) {
  try {
    setWalletState({
      connecting: true,
      error: null
    });

    await appkit.open();

    const account = appkit.getAccount?.();
    const provider = appkit.getWalletProvider?.();

    const address = account?.address || null;

    if (!address) {
      throw new Error('Wallet connected but address not resolved');
    }

    setWalletState({
      connecting: false,
      connected: true,
      address,
      shortAddress: shortenAddress(address),
      provider,
      walletName: account?.embeddedWalletInfo?.name || 'Wallet'
    });

    await refreshAllBalances();

    return { ok: true, address };
  } catch (error) {
    setWalletState({
      connecting: false,
      connected: false,
      error: error?.message || 'Wallet connection failed'
    });

    return { ok: false, error };
  }
}
