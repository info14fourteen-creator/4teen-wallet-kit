import { createReadonlyTronWeb } from './createReadonlyTronWeb.js';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function normalizeSunToTrx(value) {
  const num = Number(value ?? 0);

  if (!Number.isFinite(num)) {
    return null;
  }

  return Number((num / 1_000_000).toFixed(6));
}

export async function readTrxBalance(address, options = {}) {
  if (!isUsableAddress(address)) {
    throw new Error('readTrxBalance: invalid address');
  }

  const tronWeb = createReadonlyTronWeb({
    fullHost: options.fullHost,
    address
  });

  const balanceSun = await tronWeb.trx.getBalance(address);
  const trxBalance = normalizeSunToTrx(balanceSun);

  if (trxBalance === null) {
    throw new Error('readTrxBalance: invalid balance result');
  }

  return trxBalance;
}

export async function safeReadTrxBalance(address, options = {}) {
  try {
    const value = await readTrxBalance(address, options);

    return {
      ok: true,
      value,
      error: null
    };
  } catch (error) {
    return {
      ok: false,
      value: null,
      error
    };
  }
}
