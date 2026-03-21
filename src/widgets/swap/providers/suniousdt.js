import {
  SUNIO_MAINNET_DEFAULTS,
  SUNIO_TOKEN_ADDRESSES,
  getSunioProviderMeta
} from './sunio.js';

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function isUsableAddress(address) {
  return typeof address === 'string' && address.length >= 20;
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

function getOutputDecimalsByTarget(targetToken, explicitDecimals = null) {
  if (Number.isFinite(Number(explicitDecimals))) {
    return Number(explicitDecimals);
  }

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

function normalizePoolFees(poolFees = [], count = 0) {
  const normalized = Array.isArray(poolFees)
    ? poolFees.map((item) => Number.parseInt(String(item ?? '0'), 10) || 0)
    : [];

  if (normalized.length >= count) {
    return normalized.slice(0, count);
  }

  if (count > 0) {
    return [...normalized, ...new Array(count - normalized.length).fill(0)];
  }

  return normalized;
}

function mapApiRouteToSunioUsdtRoute(apiRoute, outputDecimals) {
  const providerMeta = getSunioProviderMeta();

  const tokens = Array.isArray(apiRoute?.tokens) ? apiRoute.tokens : [];
  const symbols = Array.isArray(apiRoute?.symbols) ? apiRoute.symbols : [];

  const poolVersions = normalizePoolVersions(apiRoute?.poolVersions);

  // FIX 1: correct length
  const fees = normalizePoolFees(apiRoute?.poolFees, poolVersions.length);

  const versionLen = buildVersionLen(poolVersions);

  return {
    id: `sunio-USDT-${Date.now()}-${Math.random()}`, // FIX 2: unique id
    provider: 'sunio',
    providerName: 'SUN.io',
    providerLogo: providerMeta.logo,
    providerMeta,
    fromToken: '4TEEN',
    toToken: 'USDT',
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
    amountInRaw: apiRoute?.amountInRaw ?? null,
    amountOutRaw: apiRoute?.amountOutRaw ?? null,
    inUsd: apiRoute?.inUsd ?? null,
    outUsd: apiRoute?.outUsd ?? null,
    stepAmountsOut: Array.isArray(apiRoute?.stepAmountsOut)
      ? apiRoute.stepAmountsOut
      : [],
    isExecutable: true,
    unsupportedReason: null
  };
}

export async function getSunioUsdtQuotes({
  amountIn,
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
    throw new Error('SUN.io USDT quotes: fromTokenAddress is invalid');
  }

  const toTokenParam = tokenAddresses.USDT || SUNIO_TOKEN_ADDRESSES.USDT;

  if (!isUsableAddress(toTokenParam)) {
    throw new Error('SUN.io USDT quotes: target token address is invalid');
  }

  const amountInRaw = decimalToRaw(amountIn, inputDecimals).toString();
  const resolvedOutputDecimals = getOutputDecimalsByTarget('USDT', outputDecimals);

  const url = new URL(calculationServiceUrl);

  url.searchParams.set('fromToken', fromTokenAddress);
  url.searchParams.set('toToken', toTokenParam);
  url.searchParams.set('amountIn', amountInRaw);

  // FIX 3: match sun.io behavior
  if (typeList) {
    url.searchParams.set('typeList', typeList);
  }

  url.searchParams.set('includeUnverifiedV4Hook', 'true');

  const response = await fetch(url.toString(), {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`SUN.io USDT quotes failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (!payload || Number(payload.code) !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload?.message || 'SUN.io USDT quotes returned invalid payload');
  }

  return payload.data
    .map((item) => mapApiRouteToSunioUsdtRoute(item, resolvedOutputDecimals))
    .sort((a, b) => Number(b.expectedOut || 0) - Number(a.expectedOut || 0))
    .slice(0, Math.max(1, Number(routeCount || 3)));
}
