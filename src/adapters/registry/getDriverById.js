import { WALLET_REGISTRY } from './walletRegistry.js';
import { getDriverMap } from './getDriverMap.js';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function matchWallet(entry, walletId) {
  const target = normalize(walletId);

  return (
    normalize(entry.id) === target ||
    normalize(entry.key) === target ||
    normalize(entry.name) === target ||
    normalize(entry.driverId) === target
  );
}

export function getWalletById(walletId) {
  if (!walletId) return null;

  return WALLET_REGISTRY.find((entry) => matchWallet(entry, walletId)) || null;
}

export function getDriverIdByWallet(walletId) {
  const entry = getWalletById(walletId);
  return entry?.driverId || null;
}

export function getDriverById(walletId) {
  if (!walletId) return null;

  const driverId = getDriverIdByWallet(walletId);
  if (!driverId) return null;

  const driverMap = getDriverMap();

  return driverMap[normalize(driverId)] || null;
}
