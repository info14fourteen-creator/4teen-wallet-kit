import { WALLET_REGISTRY } from './walletRegistry.js';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function getAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (typeof appkit.getConnectors === 'function') {
    const connectors = appkit.getConnectors();
    return Array.isArray(connectors) ? connectors : [];
  }

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function isAdapterMatch(entry, adapter) {
  const entryIds = [
    entry.id,
    entry.key,
    entry.name,
    entry.driverId
  ].map(normalize);

  const adapterIds = [
    getAdapterId(adapter),
    getAdapterName(adapter)
  ].map(normalize);

  return adapterIds.some((id) => entryIds.includes(id));
}

function findAdapterForRegistryEntry(appkit, entry) {
  const adapters = resolveAdapters(appkit);

  return adapters.find((adapter) => isAdapterMatch(entry, adapter)) || null;
}

export function getAvailableDrivers(appkit) {
  return WALLET_REGISTRY
    .filter((entry) => entry.enabled !== false)
    .map((entry) => {
      const adapter = findAdapterForRegistryEntry(appkit, entry);

      return {
        id: entry.id,
        key: entry.key,
        name: entry.name,
        driverId: entry.driverId,
        type: entry.type,
        enabled: entry.enabled !== false,
        available: !!adapter,
        readyState: adapter?.readyState || 'Unknown',
        connected: !!adapter?.connected,
        adapter: adapter || null
      };
    });
}

export function listAvailableDriverIds(appkit) {
  return getAvailableDrivers(appkit)
    .filter((entry) => entry.available)
    .map((entry) => entry.driverId);
}
