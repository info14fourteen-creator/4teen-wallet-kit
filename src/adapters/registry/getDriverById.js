import { WALLET_REGISTRY } from './walletRegistry.js';

/**
 * Normalize any wallet id / name to comparable lowercase string
 */
function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

/**
 * Match wallet entry by id / key / name
 */
function matchWallet(entry, walletId) {
  const target = normalize(walletId);

  return (
    normalize(entry.id) === target ||
    normalize(entry.key) === target ||
    normalize(entry.name) === target ||
    normalize(entry.driverId) === target
  );
}

/**
 * Resolve wallet registry entry
 */
export function getWalletById(walletId) {
  if (!walletId) return null;

  return WALLET_REGISTRY.find((entry) => matchWallet(entry, walletId)) || null;
}

/**
 * Resolve driverId by walletId
 */
export function getDriverIdByWallet(walletId) {
  const entry = getWalletById(walletId);
  return entry?.driverId || null;
}

/**
 * MAIN: resolve driver instance from appkit
 * (fallback-safe, works с текущей архитектурой)
 */
export function getDriverById(appkit, walletId) {
  if (!appkit || !walletId) return null;

  const driverId = getDriverIdByWallet(walletId);
  if (!driverId) return null;

  // 1. If appkit already has adapter getter
  if (typeof appkit.getAdapterById === 'function') {
    const adapter = appkit.getAdapterById(walletId) || appkit.getAdapterById(driverId);
    if (adapter) return adapter;
  }

  // 2. Fallback: search inside adapters array
  const adapters = Array.isArray(appkit.adapters) ? appkit.adapters : [];

  return (
    adapters.find((adapter) => {
      const id =
        adapter?.id ||
        adapter?.name ||
        adapter?.adapterName ||
        adapter?.key;

      return normalize(id) === normalize(walletId) ||
             normalize(id) === normalize(driverId);
    }) || null
  );
}
