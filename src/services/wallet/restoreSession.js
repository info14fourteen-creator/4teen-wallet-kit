import { setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

function resolveAddress(appkit) {
  if (!appkit || typeof appkit.getAccount !== 'function') return null;
  const account = appkit.getAccount();
  return account?.address || null;
}

function resolveProvider(appkit) {
  if (!appkit || typeof appkit.getWalletProvider !== 'function') return null;
  return appkit.getWalletProvider() || null;
}

function resolveWalletName(appkit) {
  if (!appkit || typeof appkit.getAccount !== 'function') return 'Wallet';
  const account = appkit.getAccount();

  return (
    account?.embeddedWalletInfo?.name ||
    account?.walletInfo?.name ||
    account?.connector?.name ||
    'Wallet'
  );
}

function resolveWalletId(appkit) {
  if (!appkit || typeof appkit.getAccount !== 'function') return null;
  const account = appkit.getAccount();

  return (
    account?.embeddedWalletInfo?.type ||
    account?.walletInfo?.rdns ||
    account?.walletInfo?.id ||
    account?.connector?.id ||
    null
  );
}

export async function restoreSession(appkit) {
  if (!appkit) {
    return false;
  }

  const address = resolveAddress(appkit);
  const provider = resolveProvider(appkit);

  if (!address) {
    return false;
  }

  setWalletState({
    connected: true,
    connecting: false,
    walletId: resolveWalletId(appkit),
    walletName: resolveWalletName(appkit),
    address,
    shortAddress: shortenAddress(address),
    provider,
    tronWeb: null,
    error: null
  });

  await refreshAllBalances();
  return true;
}
