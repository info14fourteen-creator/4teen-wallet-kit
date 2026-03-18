import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

let refreshInFlight = false;
let lastRefreshAt = 0;
let lastRefreshSignature = null;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function buildRefreshSignature(walletId, address) {
  return `${walletId || 'none'}::${address || 'none'}`;
}

function resolveProvider(appkit, state) {
  if (state?.provider) {
    return state.provider;
  }

  if (appkit && typeof appkit.getWalletProvider === 'function') {
    return appkit.getWalletProvider() || null;
  }

  if (appkit && typeof appkit.getConnectedAdapter === 'function') {
    const adapter = appkit.getConnectedAdapter();

    return (
      adapter?.provider ||
      adapter?.tronWeb ||
      adapter?.wallet ||
      adapter?.walletProvider ||
      adapter?.connector?.provider ||
      null
    );
  }

  return null;
}

function clearBalances(errorMessage = null) {
  setWalletState({
    trxBalance: null,
    fourteenBalance: null,
    error: errorMessage
  });
}

export async function refreshWalletBalances(appkit = null, options = {}) {
  const {
    force = false,
    minIntervalMs = 1200
  } = options;

  const state = getWalletState();
  const walletId = state.activeWalletId || state.walletId || null;
  const address = state.address || null;
  const provider = resolveProvider(appkit, state);

  if (!isUsableAddress(address)) {
    clearBalances(null);

    return {
      ok: false,
      refreshed: false,
      reason: 'missing_address'
    };
  }

  const now = Date.now();
  const signature = buildRefreshSignature(walletId, address);

  if (!force) {
    if (refreshInFlight) {
      return {
        ok: false,
        refreshed: false,
        reason: 'in_flight'
      };
    }

    if (
      now - lastRefreshAt < minIntervalMs &&
      lastRefreshSignature === signature
    ) {
      return {
        ok: true,
        refreshed: false,
        reason: 'throttled'
      };
    }
  }

  refreshInFlight = true;
  lastRefreshAt = now;

  try {
    await refreshAllBalances({
      address,
      walletId,
      provider
    });

    lastRefreshSignature = signature;

    return {
      ok: true,
      refreshed: true,
      error: null
    };
  } catch (error) {
    console.error('[4TEEN] refreshWalletBalances failed', error);

    setWalletState({
      error: error?.message || 'refreshWalletBalances failed'
    });

    return {
      ok: false,
      refreshed: false,
      error
    };
  } finally {
    refreshInFlight = false;
  }
}
