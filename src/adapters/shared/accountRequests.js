import { extractAddressFromPayload, resolveAddress } from './addressResolver.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isTronLinkProvider(provider) {
  const win = getWindowSafe();

  return !!(
    provider &&
    (
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    )
  );
}

function extractRequestCode(payload) {
  if (typeof payload?.code === 'number') return payload.code;
  if (typeof payload?.result?.code === 'number') return payload.result.code;
  return null;
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

export async function requestTronLinkAccounts(provider, options = {}) {
  const {
    attempts = 4,
    intervalMs = 180
  } = options;

  if (!isTronLinkProvider(provider)) {
    return {
      ok: false,
      code: null,
      address: null,
      ready: false,
      reason: 'not_tronlink'
    };
  }

  const tronLink = provider?.request ? provider : getWindowSafe()?.tronLink || null;

  for (let i = 0; i < attempts; i++) {
    try {
      const response = await tronLink.request({ method: 'tron_requestAccounts' });
      const code = extractRequestCode(response);

      if (code === 4001) {
        return {
          ok: false,
          code,
          address: null,
          ready: !!tronLink?.ready,
          reason: 'rejected'
        };
      }

      if (code === 4000) {
        await sleep(intervalMs);
      }

      const address =
        extractAddressFromPayload(response, provider) ||
        provider?.tronWeb?.defaultAddress?.base58 ||
        tronLink?.tronWeb?.defaultAddress?.base58 ||
        getWindowSafe()?.tronWeb?.defaultAddress?.base58 ||
        null;

      if (isUsableAddress(address)) {
        return {
          ok: true,
          code,
          address,
          ready: !!tronLink?.ready
        };
      }
    } catch (error) {
      if (i === attempts - 1) {
        return {
          ok: false,
          code: null,
          address: null,
          ready: !!tronLink?.ready,
          reason: error?.message || 'tron_requestAccounts failed'
        };
      }
    }

    await sleep(intervalMs);
  }

  return {
    ok: false,
    code: null,
    address: null,
    ready: !!tronLink?.ready,
    reason: 'address_not_resolved'
  };
}

export async function tryRequestAccounts(provider) {
  if (isTronLinkProvider(provider)) {
    const tronLinkResult = await requestTronLinkAccounts(provider);

    if (tronLinkResult.ok && tronLinkResult.address) {
      return tronLinkResult.address;
    }
  }

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

  try {
    const win = getWindowSafe();
    if (win?.tronWeb && typeof win.tronWeb.setAddress === 'function') {
      win.tronWeb.setAddress(address);
    }
  } catch (_) {}
}

export async function waitForAddress(adapter, provider, options = {}) {
  const {
    attempts = 16,
    intervalMs = 250,
    requestAccountAt = [0, 2, 4, 8, 12]
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
