import {
  ensureSunioApproval,
  executeSunioSwap
} from '../providers/sunio.js';

export async function executeSwapRoute({
  wallet,
  route,
  amountIn,
  slippage,
  tokenAddress,
  spenderAddress
} = {}) {
  if (!route) {
    throw new Error('Swap execution: route is required');
  }

  if (route.provider === 'sunio') {
    await ensureSunioApproval({
      wallet,
      amountIn,
      tokenAddress,
      spenderAddress
    });

    return executeSunioSwap({
      wallet,
      route,
      amountIn,
      slippage
    });
  }

  throw new Error(`Unsupported swap provider: ${route.provider}`);
}
