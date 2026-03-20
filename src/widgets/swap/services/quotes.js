import { getSunioQuotes } from '../providers/sunio.js';

export async function getSwapQuotes({
  amountIn,
  targetToken,
  slippage,
  routeCount,
  baseRates
} = {}) {
  const allRoutes = [
    ...(await getSunioQuotes({
      amountIn,
      targetToken,
      slippage,
      routeCount,
      baseRates
    }))
  ];

  return allRoutes.sort((a, b) => Number(b.receive || 0) - Number(a.receive || 0));
}
