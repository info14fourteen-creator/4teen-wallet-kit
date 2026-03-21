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
    payable: false,
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
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const SMART_ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'string[]', name: 'poolVersion', type: 'string[]' },
      { internalType: 'uint256[]', name: 'versionLen', type: 'uint256[]' },
      { internalType: 'uint24[]', name: 'fees', type: 'uint24[]' },
      {
        components: [
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' }
        ],
        internalType: 'struct ISmartExchangeRouter.SwapData',
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'swapExactInput',
    outputs: [{ internalType: 'uint256[]', name: 'amountsOut', type: 'uint256[]' }],
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

function parseSlippageBps(
  slippage,
  fallbackBps = SUNIO_MAINNET_DEFAULTS.defaultSlippageBps
) {
  const num = Number.parseFloat(slippage);

  if (!Number.isFinite(num) || num < 0) {
    return fallbackBps;
  }

  return Math.round(num * 100);
}

function getWalletStateSafe(wallet) {
  if (!wallet) return null;

  if (typeof wallet.getWalletState === 'function') {
    return wallet.getWalletState();
  }

  if (typeof wallet.getState === 'function') {
    return wallet.getState();
  }

  return null;
}

function getTronWebSafe(wallet) {
  if (!wallet) return null;

  if (typeof wallet.getTronWeb === 'function') {
    return wallet.getTronWeb();
  }

  const state = getWalletStateSafe(wallet);
  return state?.tronWeb || null;
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

function isUsableAddress(address) {
  return typeof address === 'string' && address.length >= 20;
}

function isHexStrict(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]+$/.test(value);
}

function normalizeBigintLike(value) {
  if (typeof value === 'bigint') return value;

  if (typeof value === 'number') {
    return BigInt(Math.trunc(value));
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) return 0n;

    if (isHexStrict(trimmed)) {
      return BigInt(trimmed);
    }

    return BigInt(trimmed);
  }

  if (value && typeof value.toString === 'function') {
    return BigInt(value.toString());
  }

  return 0n;
}

function decimalToRaw(amount, decimals) {
  const safeDecimals = Math.max(0, Number(decimals || 0));
  const normalized = String(amount ?? '0').replace(',', '.').trim();

  if (!normalized) return 0n;

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error(`Invalid decimal amount: ${amount}`);
  }

  const [whole, fraction = ''] = normalized.split('.');
  const paddedFraction = (fraction + '0'.repeat(safeDecimals)).slice(0, safeDecimals);

  return (
    BigInt(whole || '0') * 10n ** BigInt(safeDecimals) +
    BigInt(paddedFraction || '0')
  );
}

function humanOutputToRaw(value, decimals) {
  return decimalToRaw(value, decimals);
}

function calcMinOutRawFromExpected(expectedOutRaw, slippageBps) {
  const safeExpected = normalizeBigintLike(expectedOutRaw);
  const safeBps = BigInt(Math.max(0, Number(slippageBps || 0)));

  return (safeExpected * (10000n - safeBps)) / 10000n;
}

async function getTokenDecimals(tronWeb, tokenAddress, fallback = 6) {
  try {
    const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
    const result = await contract.decimals().call();
    return Number(result?.toString?.() || result || fallback);
  } catch (_) {
    return fallback;
  }
}

function getOutputDecimalsByTarget(targetToken, explicitDecimals = null) {
  if (Number.isFinite(Number(explicitDecimals))) {
    return Number(explicitDecimals);
  }

  if (targetToken === 'TRX') return 6;
  if (targetToken === 'USDT') return 6;

  return 6;
}

function ensureTronWebAddress(tronWeb, address) {
  if (!tronWeb || !isUsableAddress(address)) {
    return;
  }

  try {
    if (typeof tronWeb.setAddress === 'function') {
      tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    const hex =
      typeof tronWeb?.address?.toHex === 'function'
        ? tronWeb.address.toHex(address)
        : undefined;

    tronWeb.defaultAddress = {
      ...(tronWeb.defaultAddress || {}),
      base58: address,
      ...(hex ? { hex } : {})
    };
  } catch (_) {}
}

function tryDecodeHexMessage(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  const normalized = message.startsWith('0x') ? message.slice(2) : message;

  if (!/^[0-9a-fA-F]+$/.test(normalized)) {
    return message;
  }

  try {
    let text = '';

    for (let i = 0; i < normalized.length; i += 2) {
      const code = Number.parseInt(normalized.slice(i, i + 2), 16);

      if (Number.isFinite(code) && code > 0) {
        text += String.fromCharCode(code);
      }
    }

    return text.replace(/\0/g, '').trim() || message;
  } catch (_) {
    return message;
  }
}

function extractContractError(error) {
  const message =
    error?.error ||
    error?.message ||
    error?.data?.message ||
    error?.toString?.() ||
    '';

  return tryDecodeHexMessage(String(message || '')) || 'Swap execution failed';
}

function isTransientNetworkError(error) {
  const message = String(error?.message || error || '').toLowerCase();

  return (
    message.includes('network error') ||
    message.includes('failed to fetch') ||
    message.includes('fetch failed') ||
    message.includes('timeout') ||
    message.includes('request failed') ||
    message.includes('socket hang up') ||
    message.includes('connection') ||
    message.includes('disconnected')
  );
}

function assertExecutableRoute(route) {
  if (!route) {
    throw new Error('SUN.io execution: route is required');
  }

  if (route.isExecutable === false) {
    throw new Error(
      route.unsupportedReason ||
        'SUN.io execution: this route is not supported by current executor'
    );
  }

  if (!Array.isArray(route.path) || route.path.length < 2) {
    throw new Error('SUN.io execution: route.path is required');
  }

  if (!Array.isArray(route.poolVersion) || !route.poolVersion.length) {
    throw new Error('SUN.io execution: route.poolVersion is required');
  }

  if (!Array.isArray(route.versionLen) || !route.versionLen.length) {
    throw new Error('SUN.io execution: route.versionLen is required');
  }

  if (!Array.isArray(route.fees) || !route.fees.length) {
    throw new Error('SUN.io execution: route.fees is required');
  }
}

export function makeSunioRoute({
  id,
  fromToken,
  toToken,
  path,
  poolVersion,
  versionLen,
  fees,
  routeLabel = 'Direct',
  executionLabel = 'Best direct',
  expectedOut = null,
  minReceived = null,
  outputDecimals = 6,
  impactLabel = '—',
  symbols = [],
  via = [],
  isExecutable = true,
  unsupportedReason = null
}) {
  return {
    id: id || `sunio-${Date.now()}`,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    providerLogo: sunioLogo,
    providerMeta: getSunioProviderMeta(),
    fromToken,
    toToken,
    path,
    symbols,
    via,
    poolVersion,
    versionLen,
    fees,
    routeLabel,
    executionLabel,
    expectedOut,
    minReceived,
    outputDecimals,
    impactLabel,
    isExecutable,
    unsupportedReason
  };
}

export async function getSunioQuotes({
  targetToken,
  ...rest
} = {}) {
  const normalizedTarget = String(targetToken || '').toUpperCase();

  if (!normalizedTarget) {
    throw new Error('SUN.io quotes: targetToken is required');
  }

  if (normalizedTarget === 'TRX') {
    return getSunioTrxQuotes(rest);
  }

  if (normalizedTarget === 'USDT') {
    return getSunioUsdtQuotes(rest);
  }

  throw new Error(`SUN.io quotes: unsupported targetToken "${targetToken}"`);
}

export async function waitForSunioTransactionConfirmation({
  wallet,
  txid,
  timeoutMs = 120000,
  pollIntervalMs = 1500
} = {}) {
  const tronWeb = getTronWebSafe(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io confirmation: tronWeb is not available');
  }

  if (!txid || typeof txid !== 'string') {
    throw new Error('SUN.io confirmation: txid is required');
  }

  const startedAt = Date.now();
  let lastKnownError = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const info = await tronWeb.trx.getTransactionInfo(txid);

      if (info && Object.keys(info).length > 0) {
        const receiptResult = info?.receipt?.result;

        if (receiptResult === 'SUCCESS') {
          return {
            ok: true,
            txid,
            info
          };
        }

        if (receiptResult && receiptResult !== 'SUCCESS') {
          throw new Error(`Transaction failed: ${receiptResult}`);
        }
      }
    } catch (error) {
      const message = String(error?.message || '');

      if (
        message.includes('Transaction not found') ||
        message.includes('does not exist') ||
        isTransientNetworkError(error)
      ) {
        lastKnownError = error;
        await wait(pollIntervalMs);
        continue;
      }

      throw error;
    }

    await wait(pollIntervalMs);
  }

  if (lastKnownError && isTransientNetworkError(lastKnownError)) {
    throw new Error('Network error while waiting for transaction confirmation');
  }

  throw new Error('Transaction confirmation timeout');
}

export async function checkSunioAllowance({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io allowance: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io allowance: wallet address is not available');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('SUN.io allowance: tokenAddress is invalid');
  }

  if (!isUsableAddress(spenderAddress)) {
    throw new Error('SUN.io allowance: spenderAddress is invalid');
  }

  ensureTronWebAddress(tronWeb, owner);

  const resolvedDecimals = Number.isFinite(Number(tokenDecimals))
    ? Number(tokenDecimals)
    : await getTokenDecimals(tronWeb, tokenAddress, 6);

  const requiredAmountRaw = decimalToRaw(amountIn, resolvedDecimals);
  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const allowanceRaw = normalizeBigintLike(
    await token.allowance(owner, spenderAddress).call()
  );

  return {
    ok: true,
    owner,
    spenderAddress,
    tokenAddress,
    allowanceRaw: allowanceRaw.toString(),
    requiredAmountRaw: requiredAmountRaw.toString(),
    hasEnoughAllowance: allowanceRaw >= requiredAmountRaw
  };
}

export async function ensureSunioApproval({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = null,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io approval: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io approval: wallet address is not available');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('SUN.io approval: tokenAddress is invalid');
  }

  if (!isUsableAddress(spenderAddress)) {
    throw new Error('SUN.io approval: spenderAddress is invalid');
  }

  ensureTronWebAddress(tronWeb, owner);

  const resolvedDecimals = Number.isFinite(Number(tokenDecimals))
    ? Number(tokenDecimals)
    : await getTokenDecimals(tronWeb, tokenAddress, 6);

  const amountInRaw = decimalToRaw(amountIn, resolvedDecimals);
  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const allowanceRaw = normalizeBigintLike(
    await token.allowance(owner, spenderAddress).call()
  );

  if (allowanceRaw >= amountInRaw) {
    return {
      ok: true,
      required: false,
      approved: true,
      approvalType: 'already-approved',
      allowanceRaw: allowanceRaw.toString(),
      amountInRaw: amountInRaw.toString(),
      approvalAmountRaw: MAX_UINT256,
      spenderAddress
    };
  }

  const txid = await token
    .approve(spenderAddress, MAX_UINT256)
    .send({
      feeLimit,
      callValue: 0,
      shouldPollResponse: false
    });

  return {
    ok: true,
    required: true,
    approved: false,
    approvalType: 'unlimited',
    txid,
    spenderAddress,
    allowanceRaw: allowanceRaw.toString(),
    amountInRaw: amountInRaw.toString(),
    approvalAmountRaw: MAX_UINT256
  };
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
  deadlineSeconds = null,
  recipient = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);
  const to = recipient || owner;

  if (!tronWeb) {
    throw new Error('SUN.io execution: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io execution: owner address is invalid');
  }

  if (!isUsableAddress(to)) {
    throw new Error('SUN.io execution: recipient address is invalid');
  }

  if (!isUsableAddress(smartRouterAddress)) {
    throw new Error('SUN.io execution: smartRouterAddress is invalid');
  }

  if (!isUsableAddress(inputTokenAddress)) {
    throw new Error('SUN.io execution: inputTokenAddress is invalid');
  }

  assertExecutableRoute(route);
  ensureTronWebAddress(tronWeb, owner);

  const amountInRaw = decimalToRaw(amountIn, inputTokenDecimals);
  const slippageBps = parseSlippageBps(slippage);
  const resolvedOutputDecimals = getOutputDecimalsByTarget(
    route?.toToken,
    outputTokenDecimals ?? route?.outputDecimals
  );

  let amountOutMinRaw = 0n;

  if (route.minReceived != null) {
    amountOutMinRaw = humanOutputToRaw(route.minReceived, resolvedOutputDecimals);
  } else if (route.expectedOut != null) {
    const expectedOutRaw = humanOutputToRaw(route.expectedOut, resolvedOutputDecimals);
    amountOutMinRaw = calcMinOutRawFromExpected(expectedOutRaw, slippageBps);
  } else {
    throw new Error('SUN.io execution: route.minReceived or route.expectedOut is required');
  }

  const deadline =
    Number.isFinite(Number(deadlineSeconds)) && Number(deadlineSeconds) > 0
      ? Number(deadlineSeconds)
      : Math.floor(Date.now() / 1000) + SUNIO_MAINNET_DEFAULTS.deadlineSeconds;

  const swapData = [
    amountInRaw.toString(),
    amountOutMinRaw.toString(),
    to,
    String(deadline)
  ];

  try {
    const router = await tronWeb.contract(SMART_ROUTER_ABI, smartRouterAddress);

    const txid = await router
      .swapExactInput(
        route.path,
        route.poolVersion,
        route.versionLen.map((v) => String(v)),
        route.fees.map((v) => Number(v)),
        swapData
      )
      .send({
        feeLimit,
        callValue: 0,
        shouldPollResponse: false
      });

    await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    return {
      ok: true,
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      txid,
      unwrapTxid: null,
      unwrappedAmountRaw: '0',
      to,
      smartRouterAddress,
      amountInRaw: amountInRaw.toString(),
      amountOutMinRaw: amountOutMinRaw.toString(),
      deadline,
      route
    };
  } catch (error) {
    throw new Error(extractContractError(error));
  }
}
