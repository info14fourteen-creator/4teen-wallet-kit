import { getDriverById } from '../../adapters/registry/getDriverById.js';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { openWalletPicker } from '../../ui/wallet/openWalletPicker.js';
import { failWalletConnection } from '../session/failWalletConnection.js';
import { finalizeWalletConnection } from '../session/finalizeWalletConnection.js';

let connectInFlight = null;
let connectInFlightWalletId = null;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function shouldSkipAppkitSelection(walletId) {
  return walletId === 'imToken' || walletId === 'FoxWallet';
}

function extractAddressFromUnknown(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    return isUsableAddress(value) ? value : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = extractAddressFromUnknown(item);
      if (nested) return nested;
    }

    return null;
  }

  if (typeof value === 'object') {
    return (
      extractAddressFromUnknown(value.address) ||
      extractAddressFromUnknown(value.publicKey) ||
      extractAddressFromUnknown(value.selectedAddress) ||
      extractAddressFromUnknown(value.base58) ||
      extractAddressFromUnknown(value.data) ||
      extractAddressFromUnknown(value.result) ||
      extractAddressFromUnknown(value.accounts) ||
      extractAddressFromUnknown(value.account) ||
      extractAddressFromUnknown(value.payload) ||
      extractAddressFromUnknown(value.object) ||
      extractAddressFromUnknown(value.defaultAddress?.base58) ||
      extractAddressFromUnknown(value.tronWeb?.defaultAddress?.base58) ||
      null
    );
  }

  return null;
}

function resolveFinalAddress(appkit, result, driver) {
  return (
    extractAddressFromUnknown(result?.address) ||
    extractAddressFromUnknown(result?.provider) ||
    extractAddressFromUnknown(result?.tronWeb) ||
    extractAddressFromUnknown(result?.adapter) ||
    extractAddressFromUnknown(driver?.getAddress?.(appkit)) ||
    null
  );
}

function resolveFinalProvider(result) {
  return (
    result?.tronWeb ||
    result?.provider ||
    result?.adapter?.provider ||
    result?.adapter?.tronWeb ||
    result?.adapter?.walletProvider ||
    result?.adapter?.wallet ||
    result?.adapter?.connector?.provider ||
    null
  );
}

function isAlreadyConnectedToWallet(state, walletId) {
  if (!state?.connected) {
    return false;
  }

  return (
    state.walletId === walletId ||
    state.activeWalletId === walletId ||
    state.selectedWalletId === walletId
  );
}

export async function connectWallet(appkit, walletId = null) {
  if (!walletId) {
    setWalletState({
      connecting: true,
      error: null
    });

    try {
      if (!appkit) {
        throw new Error('Wallet kit not initialized');
      }

      await openWalletPicker(appkit);

      return {
        ok: true,
        session: null,
        error: null
      };
    } catch (error) {
      return failWalletConnection(error);
    }
  }

  if (connectInFlight && connectInFlightWalletId === walletId) {
    return connectInFlight;
  }

  const state = getWalletState();

  if (state?.connecting && state?.selectedWalletId === walletId) {
    return {
      ok: false,
      session: null,
      error: null,
      skipped: true,
      reason: 'connect_in_progress'
    };
  }

  if (isAlreadyConnectedToWallet(state, walletId) && isUsableAddress(state?.address)) {
    return {
      ok: true,
      session: {
        walletId: state.walletId || walletId,
        walletName: state.walletName || walletId,
        address: state.address,
        provider: state.provider,
        tronWeb: state.tronWeb
      },
      error: null,
      skipped: true,
      reason: 'already_connected'
    };
  }

  connectInFlightWalletId = walletId;

  connectInFlight = (async () => {
    try {
      setWalletState({
        connecting: true,
        error: null,
        selectedWalletId: walletId
      });

      if (!appkit) {
        throw new Error('Wallet kit not initialized');
      }

      if (!shouldSkipAppkitSelection(walletId) && typeof appkit.selectWallet === 'function') {
        appkit.selectWallet(walletId);
      }

      const driver = getDriverById(walletId);

      if (!driver) {
        throw new Error(`Driver not found: ${walletId}`);
      }

      const result = await driver.connect(appkit);
      const address = resolveFinalAddress(appkit, result, driver);
      const provider = resolveFinalProvider(result);

      if (!isUsableAddress(address)) {
        throw new Error('wallet address is missing or invalid');
      }

      return await finalizeWalletConnection({
        walletId: result?.walletId || driver.name || walletId,
        walletName: result?.walletName || driver.name || walletId,
        address,
        provider
      });
    } catch (error) {
      return failWalletConnection(error);
    } finally {
      connectInFlight = null;
      connectInFlightWalletId = null;
    }
  })();

  return connectInFlight;
}
