import sunioLogo from '../../../assets/sunio_swap.svg';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

/**
 * IMPORTANT:
 * SUN upgraded the smart router in Sep 2024.
 * Keep it overrideable from config.
 */
export const SUNIO_MAINNET_DEFAULTS = {
  smartRouterAddress: 'TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j',
  feeLimit: 200_000_000,
  deadlineSeconds: 60 * 20,
  defaultSlippageBps: 300
};

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

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function parseSlippageBps(slippage, fallbackBps = SUNIO_MAINNET_DEFAULTS.defaultSlippageBps) {
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
  if (typeof value === 'number') return BigInt(Math.trunc(value));
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

  return BigInt(whole || '0') * 10n ** BigInt(safeDecimals) + BigInt(paddedFraction || '0');
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

function resolveSwapData({
  amountInRaw,
  amountOutMinRaw,
  recipient,
  deadlineSeconds
}) {
  return [
    amountInRaw.toString(),
    amountOutMinRaw.toString(),
    recipient,
    String(deadlineSeconds)
  ];
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

  if (!Array.isArray(route.fees)) {
    throw new Error('SUN.io execution: route.fees is required');
  }
}

/**
 * Optional preset helper.
 * Use only when YOU already know the exact SUN path payload.
 */
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

/**
 * Real approval flow.
 */
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

  const resolvedDecimals =
    Number.isFinite(Number(tokenDecimals))
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
      allowanceRaw: allowanceRaw.toString(),
      amountInRaw: amountInRaw.toString(),
      spenderAddress
    };
  }

  const txid = await token
    .approve(spenderAddress, amountInRaw.toString())
    .send({
      feeLimit,
      callValue: 0,
      shouldPollResponse: true
    });

  return {
    ok: true,
    required: true,
    approved: true,
    txid,
    spenderAddress,
    allowanceRaw: allowanceRaw.toString(),
    amountInRaw: amountInRaw.toString()
  };
}

/**
 * Real SUN.io router execution.
 *
 * REQUIREMENT:
 * route must already contain exact:
 * - path
 * - poolVersion
 * - versionLen
 * - fees
 */
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
  const to = recipient || getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io execution: tronWeb is not available');
  }

  if (!isUsableAddress(to)) {
    throw new Error('SUN.io execution: recipient address is invalid');
  }

  if (!isUsableAddress(smartRouterAddress)) {
    throw new Error('SUN.io execution: smartRouterAddress is invalid');
  }

  assertExecutableRoute(route);

  const amountInRaw = decimalToRaw(amountIn, inputTokenDecimals);
  const slippageBps = parseSlippageBps(slippage);

  let amountOutMinRaw = 0n;

  if (route.minReceived != null && outputTokenDecimals != null) {
    amountOutMinRaw = humanOutputToRaw(route.minReceived, outputTokenDecimals);
  } else if (route.expectedOut != null && outputTokenDecimals != null) {
    const expectedOutRaw = humanOutputToRaw(route.expectedOut, outputTokenDecimals);
    amountOutMinRaw = calcMinOutRawFromExpected(expectedOutRaw, slippageBps);
  } else {
    throw new Error('SUN.io execution: route.minReceived or route.expectedOut with outputTokenDecimals is required');
  }

  const deadline =
    Number.isFinite(Number(deadlineSeconds))
      ? Number(deadlineSeconds)
      : Math.floor(Date.now() / 1000) + SUNIO_MAINNET_DEFAULTS.deadlineSeconds;

  const swapData = resolveSwapData({
    amountInRaw,
    amountOutMinRaw,
    recipient: to,
    deadlineSeconds: deadline
  });

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
      shouldPollResponse: true
    });

  return {
    ok: true,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    txid,
    to,
    smartRouterAddress,
    amountInRaw: amountInRaw.toString(),
    amountOutMinRaw: amountOutMinRaw.toString(),
    deadline
  };
}
