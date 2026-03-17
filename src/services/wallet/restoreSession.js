import { setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

export async function restoreSession(appkit) {
  const account = appkit.getAccount?.();
  const provider = appkit.getWalletProvider?.();

  if (!account?.address) return false;

  setWalletState({
    connected: true,
    address: account.address,
    shortAddress: shortenAddress(account.address),
    provider,
    walletName: account?.embeddedWalletInfo?.name || 'Wallet'
  });

  await refreshAllBalances();
  return true;
}
