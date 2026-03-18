import { setWalletState } from '../../core/store/walletStore.js';

function safeCall(target, methodName) {
  if (!target || typeof target[methodName] !== 'function') {
    return false;
  }

  try {
    target[methodName]();
    return true;
  } catch (error) {
    console.error(`[4TEEN] ${methodName} failed`, error);
    return false;
  }
}

export async function openWalletPicker(appkit = null) {
  const opened =
    safeCall(appkit, 'openWalletPicker') ||
    safeCall(appkit, 'openWalletModal') ||
    safeCall(appkit, 'open') ||
    false;

  setWalletState({
    connecting: false,
    walletPickerOpen: true
  });

  return {
    ok: true,
    opened
  };
}
