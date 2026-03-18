import { createReadonlyTronWeb } from './createReadonlyTronWeb.js';

const DEFAULT_TOKEN_DECIMALS = 6;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function normalizeTokenUnits(value, decimals = DEFAULT_TOKEN_DECIMALS) {
  const num = Number(value ?? 0);

  if (!Number.isFinite(num)) {
    return null;
  }

  return Number((num / Math.pow(10, decimals)).toFixed(6));
}

function decodeHexBalance(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') {
    return null;
  }

  try {
    return parseInt(hexValue, 16);
  } catch (_) {
    return null;
  }
}

export async function readTokenBalance(address, tokenAddress, options = {}) {
  if (!isUsableAddress(address)) {
    throw new Error('readTokenBalance: invalid wallet address');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('readTokenBalance: invalid token address');
  }

  const {
    fullHost,
    decimals = DEFAULT_TOKEN_DECIMALS
  } = options;

  const tronWeb = createReadonlyTronWeb({
    fullHost,
    address
  });

  const contract = await tronWeb.contract().at(tokenAddress);
  const raw = await contract.balanceOf(address).call();

  const value =
    typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
      ? raw.toString()
      : String(raw);

  const balance = normalizeTokenUnits(value, decimals);

  if (balance === null) {
    throw new Error('readTokenBalance: invalid balance result');
  }

  return balance;
}

export async function readTokenBalanceViaTrigger(address, tokenAddress, options = {}) {
  if (!isUsableAddress(address)) {
    throw new Error('readTokenBalanceViaTrigger: invalid wallet address');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('readTokenBalanceViaTrigger: invalid token address');
  }

  const {
    fullHost,
    decimals = DEFAULT_TOKEN_DECIMALS
  } = options;

  const tronWeb = createReadonlyTronWeb({
    fullHost,
    address
  });

  const ownerHex = tronWeb.address.toHex(address);
  const contractHex = tronWeb.address.toHex(tokenAddress);

  const result = await tronWeb.transactionBuilder.triggerConstantContract(
    contractHex,
    'balanceOf(address)',
    {},
    [{ type: 'address', value: address }],
    ownerHex
  );

  const hexValue = result?.constant_result?.[0] || null;
  const raw = decodeHexBalance(hexValue);
  const balance = normalizeTokenUnits(raw, decimals);

  if (balance === null) {
    throw new Error('readTokenBalanceViaTrigger: decode failed');
  }

  return balance;
}

export async function safeReadTokenBalance(address, tokenAddress, options = {}) {
  try {
    const value = await readTokenBalance(address, tokenAddress, options);

    return {
      ok: true,
      value,
      error: null,
      source: 'contract'
    };
  } catch (contractError) {
    try {
      const value = await readTokenBalanceViaTrigger(address, tokenAddress, options);

      return {
        ok: true,
        value,
        error: null,
        source: 'trigger'
      };
    } catch (triggerError) {
      return {
        ok: false,
        value: null,
        error: triggerError,
        source: null,
        warnings: {
          contract: contractError?.message || null,
          trigger: triggerError?.message || null
        }
      };
    }
  }
}
