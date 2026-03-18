function isString(value) {
  return typeof value === 'string';
}

export function isHexAddress(value) {
  return isString(value) && /^0x[0-9a-fA-F]{40}$/.test(value);
}

export function isTronAddress(value) {
  return isString(value) && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function isUsableAddress(value) {
  return isTronAddress(value);
}

export function normalizeAddress(value) {
  if (!isString(value)) return null;

  const trimmed = value.trim();

  if (isTronAddress(trimmed)) {
    return trimmed;
  }

  return null;
}

export function extractAddressFromPayload(payload) {
  if (!payload) return null;

  if (isString(payload)) return normalizeAddress(payload);

  if (Array.isArray(payload)) {
    return normalizeAddress(payload[0]);
  }

  if (typeof payload === 'object') {
    if (Array.isArray(payload.result)) {
      return normalizeAddress(payload.result[0]);
    }

    if (Array.isArray(payload.accounts)) {
      return normalizeAddress(payload.accounts[0]);
    }

    if (isString(payload.address)) {
      return normalizeAddress(payload.address);
    }
  }

  return null;
}

export function shortenAddress(address) {
  if (!isString(address)) return '';
  if (address.length < 10) return address;

  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
