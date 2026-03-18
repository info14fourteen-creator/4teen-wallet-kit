function isString(value) {
  return typeof value === 'string';
}

export function isUsableAddress(value) {
  return isString(value) && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function isHexAddress(value) {
  return isString(value) && /^41[0-9a-fA-F]{40}$/.test(value);
}

export function normalizeAddress(value, provider = null) {
  if (isUsableAddress(value)) {
    return value;
  }

  if (isHexAddress(value) && provider?.address?.fromHex) {
    try {
      const converted = provider.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  if (isHexAddress(value) && provider?.tronWeb?.address?.fromHex) {
    try {
      const converted = provider.tronWeb.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  return null;
}

export function extractAddressFromPayload(payload, provider = null) {
  if (!payload) {
    return null;
  }

  if (typeof payload === 'string') {
    return normalizeAddress(payload, provider);
  }

  if (Array.isArray(payload)) {
    return normalizeAddress(payload[0], provider);
  }

  if (typeof payload === 'object') {
    return (
      normalizeAddress(payload.address, provider) ||
      normalizeAddress(payload.selectedAddress, provider) ||
      normalizeAddress(payload.publicKey, provider) ||
      normalizeAddress(payload.result?.[0], provider) ||
      normalizeAddress(payload.accounts?.[0], provider) ||
      normalizeAddress(payload.data?.address, provider) ||
      normalizeAddress(payload.payload?.address, provider) ||
      null
    );
  }

  return null;
}

export function resolveAddress(adapter = null, provider = null) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,

    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,

    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,

    adapter?.connector?.provider?.address,
    adapter?.connector?.provider?.selectedAddress,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58,

    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const candidate of candidates) {
    const normalized = normalizeAddress(candidate, provider);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

export function readAddressFromAdapter(adapter = null) {
  return resolveAddress(adapter, null);
}
