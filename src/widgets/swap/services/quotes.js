import { getSunioQuotes } from '../providers/sunio.js';

function toFiniteNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function sortRoutesBestFirst(routes = []) {
  return [...routes].sort((a, b) => {
    const aExecutable = a?.isExecutable !== false;
    const bExecutable = b?.isExecutable !== false;

    if (aExecutable !== bExecutable) {
      return aExecutable ? -1 : 1;
    }

    const aOutRaw = BigInt(String(a?.amountOutRaw ?? a?.expectedOutRaw ?? '0'));
    const bOutRaw = BigInt(String(b?.amountOutRaw ?? b?.expectedOutRaw ?? '0'));

    if (aOutRaw > bOutRaw) return -1;
    if (aOutRaw < bOutRaw) return 1;

    const aOut = toFiniteNumber(a?.expectedOut, 0);
    const bOut = toFiniteNumber(b?.expectedOut, 0);

    return bOut - aOut;
  });
}

export async function getSwapQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3
} = {}) {
  const safeAmount = toFiniteNumber(amountIn, 0);

  if (!safeAmount || safeAmount <= 0) {
    return [];
  }

  const routes = await getSunioQuotes({
    amountIn: safeAmount,
    targetToken,
    fromTokenAddress,
    tokenAddresses,
    inputDecimals,
    outputDecimals,
    routeCount
  });

  const sorted = sortRoutesBestFirst(routes);

  const executable = sorted.filter((item) => item?.isExecutable !== false);

  return executable.length ? executable : sorted;
}
