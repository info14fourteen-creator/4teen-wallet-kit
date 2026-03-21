import { getSunioQuotes } from '../providers/sunio.js';

export async function getSwapQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses,
  inputDecimals = 6,
  outputDecimals = 6,
  routeCount = 3,
  typeList,
  calculationServiceUrl
} = {}) {
  const allRoutes = [
    ...(await getSunioQuotes({
      amountIn,
      targetToken,
      fromTokenAddress,
      tokenAddresses,
      inputDecimals,
      outputDecimals,
      routeCount,
      typeList,
      calculationServiceUrl
    }))
  ];

  return allRoutes.sort((a, b) => {
    if (Boolean(a.isExecutable) !== Boolean(b.isExecutable)) {
      return a.isExecutable ? -1 : 1;
    }

    return Number(b.expectedOut || 0) - Number(a.expectedOut || 0);
  });
}
