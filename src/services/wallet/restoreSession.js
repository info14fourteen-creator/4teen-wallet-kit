import { setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

function hasMethod(obj, methodName) {
  return !!obj && typeof obj[methodName] === 'function';
}

function resolveAccount(appkit) {
  if (!hasMethod(appkit, 'getAccount')) return null;

  try {
    return appkit.getAccount() || null;
  } catch (error) {
    console.error('[4TEEN] restoreSession getAccount failed', error);
    return null;
  }
}

function resolveAddress(appkit) {
  const account = resolveAccount(appkit);
  return account?.address || null;
}

function resolveProvider(appkit) {
  if (!hasMethod(appkit, 'getWalletProvider')) return null;

  try {
    return appkit.getWalletProvider() || null;
  } catch (error) {
    console.error('[4TEEN] restoreSession getWalletProvider failed', error);
    return null;
  }
}

function resolveWalletName(appkit) {
  const account = resolveAccount(appkit);

  return (
    account?.embeddedWalletInfo?.name ||
    account?.walletInfo?.name ||
    account?.connector?.name ||
    'Wallet'
  );
}

function resolveWalletId(appkit) {
  const account = resolveAccount(appkit);

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
    console.warn('[4TEEN] restoreSession skipped: appkit is missing');
    return false;
  }

  const address = resolveAddress(appkit);
  const provider = resolveProvider(appkit);

  console.log('[4TEEN] restoreSession check', {
    hasAppkit: !!appkit,
    hasGetAccount: hasMethod(appkit, 'getAccount'),
    hasGetWalletProvider: hasMethod(appkit, 'getWalletProvider'),
    address
  });

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

  try {
    await refreshAllBalances();
  } catch (error) {
    console.error('[4TEEN] restoreSession refreshAllBalances failed', error);
  }

  return true;
}
