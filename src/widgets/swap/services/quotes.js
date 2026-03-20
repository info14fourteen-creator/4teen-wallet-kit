import { getSunioQuotes } from '../providers/sunio.js';
import { getJustmoneyQuotes } from '../providers/justmoney.js';

export async function getSwapQuotes(params) {
  const routes = [
    ...(await getSunioQuotes(params)),
    ...(await getJustmoneyQuotes(params))
  ];

  return routes.sort((a, b) => Number(b.receive || 0) - Number(a.receive || 0));
}
