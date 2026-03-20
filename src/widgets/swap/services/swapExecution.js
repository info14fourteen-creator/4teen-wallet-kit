import {
  ensureSunioApproval,
  executeSunioSwap,
  SUNIO_MAINNET_DEFAULTS
} from '../providers/sunio.js';

export async function executeSwapRoute({
  wallet,
  route,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = 6,
  smartRouterAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit,
  deadlineSeconds,
  recipient
} = {}) {
  if (!route) {
    throw new Error('Swap execution: route is required');
  }

  if (route.provider === 'sunio') {
    await ensureSunioApproval({
      wallet,
      tokenAddress: inputTokenAddress,
      spenderAddress: smartRouterAddress,
      amountIn,
      tokenDecimals: inputTokenDecimals,
      feeLimit
    });

    return executeSunioSwap({
      wallet,
      route,
      amountIn,
      slippage,
      inputTokenAddress,
      inputTokenDecimals,
      outputTokenDecimals,
      smartRouterAddress,
      feeLimit,
      deadlineSeconds,
      recipient
    });
  }

  throw new Error(`Unsupported swap provider: ${route.provider}`);
}
