import sunioLogo from '../../../assets/sunio_swap.svg';
import { getSunioTrxQuotes } from './suniotrx.js';
import { getSunioUsdtQuotes } from './suniousdt.js';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

export const SUNIO_MAINNET_DEFAULTS = {
  smartRouterAddress: 'TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j',
  calculationServiceUrl: 'https://rot.endjgfsv.link/swap/routerUniversal',
  feeLimit: 35_000_000,
  deadlineSeconds: 60 * 20,
  defaultSlippageBps: 300,
  typeList: 'PSM,CURVE,CURVE_COMBINATION,WTRX,SUNSWAP_V1,SUNSWAP_V2,SUNSWAP_V3'
};

export const SUNIO_TOKEN_ADDRESSES = {
  TRX: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  WTRX: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  USDT: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
};

const MAX_UINT256 = (2n ** 256n - 1n).toString();

const TRC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const SMART_ROUTER_ABI = [
  {
    inputs: [
      { name: 'path', type: 'address[]' },
      { name: 'poolVersion', type: 'string[]' },
      { name: 'versionLen', type: 'uint256[]' },
      { name: 'fees', type: 'uint24[]' },
      {
        components: [
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMin', type: 'uint256' },
          { name: 'to', type: 'address' },
          { name: 'deadline', type: 'uint256' }
        ],
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'swapExactInput',
    outputs: [{ name: 'amountsOut', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function'
  }
];

export function getSunioProviderMeta() {
  return {
    id: PROVIDER_ID,
    name: PROVIDER_NAME,
    logo: sunioLogo
  };
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseSlippageBps(slippage, fallback = SUNIO_MAINNET_DEFAULTS.defaultSlippageBps) {
  const num = Number(slippage);
  return Number.isFinite(num) && num >= 0 ? Math.round(num * 100) : fallback;
}

function getWalletStateSafe(wallet) {
  if (!wallet) return null;
  return wallet.getWalletState?.() || wallet.getState?.() || null;
}

function getTronWebSafe(wallet) {
  return wallet?.getTronWeb?.() || getWalletStateSafe(wallet)?.tronWeb || null;
}

function getConnectedAddress(wallet) {
  const state = getWalletStateSafe(wallet);
  return (
    state?.address ||
    wallet?.getAddress?.() ||
    wallet?.getTronWeb?.()?.defaultAddress?.base58 ||
    null
  );
}

function isUsableAddress(addr) {
  return typeof addr === 'string' && addr.length >= 20;
}

function normalizeBigintLike(v) {
  if (typeof v === 'bigint') return v;
  if (typeof v === 'number') return BigInt(Math.trunc(v));
  if (typeof v === 'string') return BigInt(v || '0');
  return BigInt(v?.toString?.() || '0');
}

function decimalToRaw(amount, decimals) {
  const d = Math.max(0, Number(decimals || 0));
  const [w, f = ''] = String(amount || '0').split('.');
  const frac = (f + '0'.repeat(d)).slice(0, d);
  return BigInt(w || '0') * 10n ** BigInt(d) + BigInt(frac || '0');
}

function calcMinOutRawFromExpected(expectedRaw, slippageBps) {
  return (normalizeBigintLike(expectedRaw) * (10000n - BigInt(slippageBps))) / 10000n;
}

function ensureTronWebAddress(tronWeb, address) {
  try {
    tronWeb?.setAddress?.(address);
  } catch (_) {}
}

function extractContractError(error) {
  const msg =
    error?.error ||
    error?.message ||
    error?.data?.message ||
    error?.toString?.() ||
    '';
  return String(msg || 'Swap execution failed');
}

function assertExecutableRoute(route) {
  if (!route?.path?.length) throw new Error('Invalid route');
}

export async function getSunioQuotes({ targetToken, ...rest } = {}) {
  const t = String(targetToken || '').toUpperCase();
  if (t === 'TRX') return getSunioTrxQuotes(rest);
  if (t === 'USDT') return getSunioUsdtQuotes(rest);
  throw new Error(`Unsupported targetToken "${targetToken}"`);
}

export async function executeSunioSwap({
  wallet,
  route,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = null,
  smartRouterAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit,
  recipient = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);
  const to = recipient || owner;

  if (!tronWeb) throw new Error('tronWeb not available');
  if (!isUsableAddress(owner)) throw new Error('Invalid wallet address');

  assertExecutableRoute(route);
  ensureTronWebAddress(tronWeb, owner);

  const amountInRaw = decimalToRaw(amountIn, inputTokenDecimals);
  const slippageBps = parseSlippageBps(slippage);

  let minOut = 0n;

  if (route.amountOutRaw) {
    minOut = calcMinOutRawFromExpected(route.amountOutRaw, slippageBps);
  } else {
    throw new Error('Missing route output');
  }

  const deadline = Math.floor(Date.now() / 1000) + 1200;

  const router = await tronWeb.contract(SMART_ROUTER_ABI, smartRouterAddress);

  try {
    const txid = await router
      .swapExactInput(
        route.path,
        route.poolVersion,
        route.versionLen.map(String),
        route.fees.map(Number),
        [amountInRaw.toString(), minOut.toString(), to, String(deadline)]
      )
      .send({
        feeLimit,
        callValue: 0,
        shouldPollResponse: false
      });

    try {
      await tronWeb.trx.getTransactionInfo(txid);
    } catch (_) {}

    return {
      ok: true,
      txid,
      provider: PROVIDER_ID
    };
  } catch (error) {
    const msg = String(error?.message || '').toLowerCase();

    if (
      msg.includes('denied') ||
      msg.includes('rejected') ||
      msg.includes('user rejected')
    ) {
      return {
        ok: false,
        rejected: true,
        message: 'User rejected transaction'
      };
    }

    throw new Error(extractContractError(error));
  }
}
