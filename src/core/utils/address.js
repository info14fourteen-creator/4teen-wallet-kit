function isString(value) {
  return typeof value === 'string';
}

export function isHexAddress(value) {
  return isString(value) && /^0x[0-9a-fA-F]{40}$/.test(value);
}

export function isTronAddress(value) {
  return isString(value) &&
    value.length === 34 &&
    value.startsWith('T');
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

  const candidates = [
    payload,
    payload?.data,
    payload?.result,
    payload?.accounts,
    payload?.address,
    payload?.object,
    payload?.object?.address
  ];

  for (const c of candidates) {
    if (!c) continue;

    if (typeof c === 'string') {
      const normalized = normalizeAddress(c);
      if (normalized) return normalized;
    }

    if (Array.isArray(c)) {
      const first = normalizeAddress(c[0]);
      if (first) return first;
    }

    if (typeof c === 'object') {
      const nested = extractAddressFromPayload(c);
      if (nested) return nested;
    }
  }

  return null;
}

export function shortenAddress(address) {
  if (!isString(address)) return '';
  if (address.length < 10) return address;

  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
