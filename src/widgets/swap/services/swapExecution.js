import { executeSunioSwap } from '../providers/sunio.js';

export async function executeSwapRoute(params) {
  const { route } = params;

  if (route.provider === 'sunio') {
    return executeSunioSwap(params);
  }

  throw new Error(`Unsupported provider: ${route.provider}`);
}
