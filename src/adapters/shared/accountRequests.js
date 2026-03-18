import { extractAddressFromPayload, resolveAddress } from './addressResolver.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function tryProviderRequest(provider, method, params = []) {
  if (!provider) {
    return null;
  }

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({ method, params });
    } catch (_) {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch (_) {}
  }

  return null;
}

export async function tryRequestAccounts(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = extractAddressFromPayload(result, provider);

    if (address) {
      return address;
    }
  }

  return null;
}

export async function forceBindTronWeb(provider, address) {
  if (!provider || !address) {
    return;
  }

  try {
    if (typeof provider.setAddress === 'function') {
      provider.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb && typeof provider.tronWeb.setAddress === 'function') {
      provider.tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.defaultAddress && typeof provider.defaultAddress === 'object') {
      provider.defaultAddress.base58 = address;
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb?.defaultAddress && typeof provider.tronWeb.defaultAddress === 'object') {
      provider.tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}
}

export async function waitForAddress(adapter, provider, options = {}) {
  const {
    attempts = 16,
    intervalMs = 250,
    requestAccountAt = [0, 4, 8, 12]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = resolveAddress(adapter, provider);

    if (directAddress) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAccountAt.includes(i)) {
      const requestedAddress = await tryRequestAccounts(provider);

      if (requestedAddress) {
        await forceBindTronWeb(provider, requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(intervalMs);
  }

  return null;
}
