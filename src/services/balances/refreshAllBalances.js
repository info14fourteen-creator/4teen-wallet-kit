import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const FOURTEEN_TOKEN_DECIMALS = 6;

let refreshPromise = null;
let lastRefreshAt = 0;
const MIN_REFRESH_GAP_MS = 1200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function fromSun(value) {
  return normalizeNumber(value, 0) / 1e6;
}

function formatTokenUnits(rawValue, decimals = 6) {
  if (rawValue === null || rawValue === undefined) return 0;

  try {
    const raw = BigInt(String(rawValue));
    const base = BigInt(10) ** BigInt(decimals);
    const whole = raw / base;
    const fraction = raw % base;

    const fractionText = fraction.toString().padStart(decimals, '0').replace(/0+$/, '');
    return Number(fractionText ? `${whole}.${fractionText}` : whole.toString());
  } catch (_) {
    return 0;
  }
}

function isBase58Address(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getTronWeb() {
  const state = getWalletState();

  if (state?.tronWeb) {
    return state.tronWeb;
  }

  if (typeof window !== 'undefined' && window?.tronWeb) {
    return window.tronWeb;
  }

  return null;
}

function getAddress() {
  const state = getWalletState();

  if (isBase58Address(state?.address)) return state.address;
  if (isBase58Address(state?.shortAddress)) return state.shortAddress;

  const tronWeb = getTronWeb();
  const fromTronWeb = tronWeb?.defaultAddress?.base58 || null;

  if (isBase58Address(fromTronWeb)) return fromTronWeb;

  return null;
}

async function readTrxBalanceViaTronWeb(tronWeb, address) {
  if (!tronWeb || !address) {
    throw new Error('TRX balance read skipped: tronWeb or address missing');
  }

  if (typeof tronWeb.trx?.getBalance !== 'function') {
    throw new Error('TRX balance read skipped: tronWeb.trx.getBalance missing');
  }

  const rawBalance = await tronWeb.trx.getBalance(address);
  return fromSun(rawBalance);
}

async function readTokenBalanceViaContract(tronWeb, address) {
  if (!tronWeb || !address) {
    throw new Error('Token balance read skipped: tronWeb or address missing');
  }

  if (typeof tronWeb.contract !== 'function') {
    throw new Error('Token balance read skipped: tronWeb.contract missing');
  }

  const contract = await tronWeb.contract().at(FOURTEEN_TOKEN_ADDRESS);

  if (!contract?.balanceOf) {
    throw new Error('Token balance read skipped: balanceOf missing');
  }

  const raw = await contract.balanceOf(address).call();
  return formatTokenUnits(raw, FOURTEEN_TOKEN_DECIMALS);
}

async function readTokenBalanceViaTriggerConstantContract(tronWeb, address) {
  if (!tronWeb || !address) {
    throw new Error('Token balance fallback skipped: tronWeb or address missing');
  }

  if (typeof tronWeb.transactionBuilder?.triggerConstantContract !== 'function') {
    throw new Error('Token balance fallback skipped: triggerConstantContract missing');
  }

  if (typeof tronWeb.address?.toHex !== 'function') {
    throw new Error('Token balance fallback skipped: toHex missing');
  }

  const ownerHex = tronWeb.address.toHex(address);
  const contractHex = tronWeb.address.toHex(FOURTEEN_TOKEN_ADDRESS);

  const result = await tronWeb.transactionBuilder.triggerConstantContract(
    contractHex,
    'balanceOf(address)',
    {},
    [{ type: 'address', value: address }],
    ownerHex
  );

  const rawHex = result?.constant_result?.[0];
  if (!rawHex) {
    throw new Error('Token balance fallback returned empty result');
  }

  const raw = BigInt(`0x${rawHex}`);
  return formatTokenUnits(raw, FOURTEEN_TOKEN_DECIMALS);
}

async function safeReadTrxBalance(tronWeb, address) {
  try {
    return await readTrxBalanceViaTronWeb(tronWeb, address);
  } catch (error) {
    console.error('[4TEEN] readTrxBalance failed', error);
    return null;
  }
}

async function safeReadFourteenBalance(tronWeb, address) {
  try {
    return await readTokenBalanceViaContract(tronWeb, address);
  } catch (error) {
    console.error('[4TEEN] readTokenBalance via contract failed', error);
  }

  try {
    return await readTokenBalanceViaTriggerConstantContract(tronWeb, address);
  } catch (error) {
    console.error('[4TEEN] readTokenBalance via triggerConstantContract failed', error);
    return null;
  }
}

async function doRefreshAllBalances() {
  const state = getWalletState();
  const tronWeb = getTronWeb();
  const address = getAddress();

  if (!state?.connected) {
    throw new Error('Wallet is not connected');
  }

  if (!address || !isBase58Address(address)) {
    throw new Error('Invalid address provided');
  }

  if (!tronWeb) {
    throw new Error('tronWeb is not available');
  }

  const [trxBalance, fourteenBalance] = await Promise.all([
    safeReadTrxBalance(tronWeb, address),
    safeReadFourteenBalance(tronWeb, address)
  ]);

  const nextPatch = {};

  if (trxBalance !== null) {
    nextPatch.trxBalance = trxBalance;
  }

  if (fourteenBalance !== null) {
    nextPatch.fourteenBalance = fourteenBalance;
  }

  if (Object.keys(nextPatch).length === 0) {
    throw new Error('Failed to refresh any balances');
  }

  setWalletState(nextPatch);

  return {
    ok: true,
    address,
    trxBalance: nextPatch.trxBalance ?? state?.trxBalance ?? null,
    fourteenBalance: nextPatch.fourteenBalance ?? state?.fourteenBalance ?? null
  };
}

export async function refreshAllBalances(options = {}) {
  const now = Date.now();
  const force = options?.force === true;

  if (!force && refreshPromise) {
    return refreshPromise;
  }

  if (!force && now - lastRefreshAt < MIN_REFRESH_GAP_MS) {
    await sleep(MIN_REFRESH_GAP_MS - (now - lastRefreshAt));
  }

  refreshPromise = doRefreshAllBalances()
    .catch((error) => {
      console.error('[4TEEN] refreshAllBalances failed', error);
      throw error;
    })
    .finally(() => {
      lastRefreshAt = Date.now();
      refreshPromise = null;
    });

  return refreshPromise;
}
