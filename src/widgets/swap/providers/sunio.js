import sunioLogo from '../../../assets/sunio_swap.svg';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

export const SUNIO_MAINNET_DEFAULTS = {
  smartRouterAddress: 'TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j',
  calculationServiceUrl: 'https://rot.endjgfsv.link/swap/router',
  feeLimit: 35_000_000,
  deadlineSeconds: 60 * 20,
  defaultSlippageBps: 300,
  typeList: 'PSM,CURVE,CURVE_COMBINATION,WTRX,SUNSWAP_V1,SUNSWAP_V2,SUNSWAP_V3'
};

export const SUNIO_TOKEN_ADDRESSES = {
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
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const WTRX_ABI = [
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
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

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
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

async function getTokenBalanceRaw(tronWeb, tokenAddress, owner) {
  const contract = await tronWeb.contract(WTRX_ABI, tokenAddress);
  const balance = await contract.balanceOf(owner).call();
  return normalizeBigintLike(balance);
}

function assertExecutableRoute(route) {
  if (!route) {
    throw new Error('SUN.io execution: route is required');
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

function getTargetTokenAddress(targetToken, tokenAddresses = {}) {
  if (targetToken === 'TRX') {
    return tokenAddresses.WTRX || SUNIO_TOKEN_ADDRESSES.WTRX;
  }

  if (targetToken === 'USDT') {
    return tokenAddresses.USDT || SUNIO_TOKEN_ADDRESSES.USDT;
  }

  return tokenAddresses[targetToken] || null;
}

function getOutputDecimalsByTarget(targetToken, explicitDecimals = null) {
  if (Number.isFinite(Number(explicitDecimals))) {
    return Number(explicitDecimals);
  }

  if (targetToken === 'TRX') return 6;
  if (targetToken === 'USDT') return 6;

  return 6;
}

function buildVersionLen(poolVersions = []) {
  if (!Array.isArray(poolVersions) || !poolVersions.length) {
    return [];
  }

  const result = [];
  let current = poolVersions[0];
  let count = 1;

  for (let i = 1; i < poolVersions.length; i += 1) {
    if (poolVersions[i] === current) {
      count += 1;
    } else {
      result.push(result.length === 0 ? count + 1 : count);
      current = poolVersions[i];
      count = 1;
    }
  }

  result.push(result.length === 0 ? count + 1 : count);
  return result;
}

function normalizePoolVersions(poolVersions = []) {
  if (!Array.isArray(poolVersions)) return [];
  return poolVersions.map((item) => String(item || '').trim()).filter(Boolean);
}

function normalizePoolFees(poolFees = [], tokenCount = 0) {
  const normalized = Array.isArray(poolFees)
    ? poolFees.map((item) => Number.parseInt(String(item ?? '0'), 10) || 0)
    : [];

  if (normalized.length >= tokenCount) {
    return normalized.slice(0, tokenCount);
  }

  if (tokenCount > 0) {
    return [...normalized, ...new Array(tokenCount - normalized.length).fill(0)];
  }

  return normalized;
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

function shouldAutoUnwrapWtrx(route) {
  if (!route || route.toToken !== 'TRX') {
    return false;
  }

  const path = Array.isArray(route.path) ? route.path : [];
  const lastToken = path[path.length - 1] || '';

  return lastToken === SUNIO_TOKEN_ADDRESSES.WTRX;
}

function mapApiRouteToSunioRoute(apiRoute, targetToken, outputDecimals) {
  const tokens = Array.isArray(apiRoute?.tokens) ? apiRoute.tokens : [];
  const symbols = Array.isArray(apiRoute?.symbols) ? apiRoute.symbols : [];
  const poolVersions = normalizePoolVersions(apiRoute?.poolVersions);
  const fees = normalizePoolFees(apiRoute?.poolFees, tokens.length);
  const versionLen = buildVersionLen(poolVersions);

  return {
    id: `sunio-${targetToken}-${tokens.join('-')}-${poolVersions.join('-')}`,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    providerLogo: sunioLogo,
    providerMeta: getSunioProviderMeta(),
    fromToken: '4TEEN',
    toToken: targetToken,
    path: tokens,
    symbols,
    via: symbols.slice(1, -1),
    poolVersion: poolVersions,
    versionLen,
    fees,
    expectedOut: apiRoute?.amountOut ?? null,
    minReceived: null,
    outputDecimals,
    impactLabel:
      apiRoute?.impact != null && apiRoute?.impact !== ''
        ? `${String(apiRoute.impact)}%`
        : '—',
    routeLabel:
      symbols.length > 2
        ? `Optimized · ${Math.max(0, symbols.length - 2)} hop${
            symbols.length - 2 > 1 ? 's' : ''
          }`
        : 'Direct · best route',
    executionLabel:
      apiRoute?.fee != null && apiRoute?.fee !== ''
        ? `${String(apiRoute.fee)}`
        : '—',
    apiFee: apiRoute?.fee ?? null,
    apiImpact: apiRoute?.impact ?? null,
    amountIn: apiRoute?.amountIn ?? null,
    amountOut: apiRoute?.amountOut ?? null,
    inUsd: apiRoute?.inUsd ?? null,
    outUsd: apiRoute?.outUsd ?? null,
    stepAmountsOut: Array.isArray(apiRoute?.stepAmountsOut)
      ? apiRoute.stepAmountsOut
      : []
  };
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
  impactLabel = '—'
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
    poolVersion,
    versionLen,
    fees,
    routeLabel,
    executionLabel,
    expectedOut,
    minReceived,
    outputDecimals,
    impactLabel
  };
}

export async function getSunioQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3,
  typeList = SUNIO_MAINNET_DEFAULTS.typeList,
  calculationServiceUrl = SUNIO_MAINNET_DEFAULTS.calculationServiceUrl
} = {}) {
  const safeAmountIn = toSafeNumber(amountIn, 0);

  if (!safeAmountIn || safeAmountIn <= 0) {
    return [];
  }

  if (!isUsableAddress(fromTokenAddress)) {
    throw new Error('SUN.io quotes: fromTokenAddress is invalid');
  }

  const toTokenAddress = getTargetTokenAddress(targetToken, tokenAddresses);

  if (!isUsableAddress(toTokenAddress)) {
    throw new Error(`SUN.io quotes: target token address for ${targetToken} is invalid`);
  }

  const amountInRaw = decimalToRaw(amountIn, inputDecimals).toString();
  const resolvedOutputDecimals = getOutputDecimalsByTarget(targetToken, outputDecimals);

  const url = new URL(calculationServiceUrl);
  url.searchParams.set('fromToken', fromTokenAddress);
  url.searchParams.set('toToken', toTokenAddress);
  url.searchParams.set('amountIn', amountInRaw);
  url.searchParams.set('typeList', typeList);

  const response = await fetch(url.toString(), {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`SUN.io quotes failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (!payload || Number(payload.code) !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload?.message || 'SUN.io quotes returned invalid payload');
  }

  return payload.data
    .slice(0, Math.max(1, Number(routeCount || 3)))
    .map((item) => mapApiRouteToSunioRoute(item, targetToken, resolvedOutputDecimals))
    .sort((a, b) => Number(b.expectedOut || 0) - Number(a.expectedOut || 0));
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

  console.log('[SUN SWAP ROUTE RAW]', route);
  console.log('[SUN SWAP PAYLOAD]', {
    owner,
    to,
    path: route.path,
    poolVersion: route.poolVersion,
    versionLen: route.versionLen,
    fees: route.fees,
    swapData,
    smartRouterAddress,
    inputTokenAddress,
    amountIn,
    slippage,
    outputTokenDecimals,
    resolvedOutputDecimals,
    deadline,
    feeLimit
  });

  try {
    const shouldUnwrap = shouldAutoUnwrapWtrx(route);

    let wtrxBalanceBefore = 0n;
    if (shouldUnwrap) {
      wtrxBalanceBefore = await getTokenBalanceRaw(
        tronWeb,
        SUNIO_TOKEN_ADDRESSES.WTRX,
        owner
      );
      console.log('[SUN SWAP WTRX BEFORE]', wtrxBalanceBefore.toString());
    }

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

    console.log('[SUN SWAP TXID]', txid);

    await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    let unwrapTxid = null;
    let unwrappedAmountRaw = '0';

    if (shouldUnwrap) {
      let wtrxBalanceAfter = wtrxBalanceBefore;

      for (let i = 0; i < 10; i += 1) {
        await wait(700);

        try {
          wtrxBalanceAfter = await getTokenBalanceRaw(
            tronWeb,
            SUNIO_TOKEN_ADDRESSES.WTRX,
            owner
          );
        } catch (_) {}

        if (wtrxBalanceAfter > wtrxBalanceBefore) {
          break;
        }
      }

      console.log('[SUN SWAP WTRX AFTER]', wtrxBalanceAfter.toString());

      let unwrapAmountRaw = wtrxBalanceAfter - wtrxBalanceBefore;

      if (unwrapAmountRaw <= 0n && route.expectedOut != null) {
        unwrapAmountRaw = humanOutputToRaw(
          route.expectedOut,
          resolvedOutputDecimals
        );
      }

      if (unwrapAmountRaw > 0n) {
        const wtrx = await tronWeb.contract(WTRX_ABI, SUNIO_TOKEN_ADDRESSES.WTRX);

        console.log('[SUN SWAP UNWRAP AMOUNT]', unwrapAmountRaw.toString());

        unwrapTxid = await wtrx
          .withdraw(unwrapAmountRaw.toString())
          .send({
            feeLimit,
            callValue: 0,
            shouldPollResponse: false
          });

        await waitForSunioTransactionConfirmation({
          wallet,
          txid: unwrapTxid,
          timeoutMs: 120000,
          pollIntervalMs: 1500
        });

        console.log('[SUN SWAP UNWRAP TXID]', unwrapTxid);
        unwrappedAmountRaw = unwrapAmountRaw.toString();
      } else {
        console.warn('[SUN SWAP UNWRAP SKIPPED] unwrap amount was zero');
      }
    }

    return {
      ok: true,
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      txid,
      unwrapTxid,
      unwrappedAmountRaw,
      to,
      smartRouterAddress,
      amountInRaw: amountInRaw.toString(),
      amountOutMinRaw: amountOutMinRaw.toString(),
      deadline,
      route
    };
  } catch (error) {
    console.error('[SUN SWAP CONTRACT SEND ERROR FULL]', error);
    console.error('[SUN SWAP CONTRACT SEND ERROR MESSAGE]', error?.message);
    console.error('[SUN SWAP CONTRACT SEND ERROR RAW]', JSON.stringify(error, null, 2));
    throw new Error(extractContractError(error));
  }
}
