import {
  checkSunioAllowance,
  ensureSunioApproval,
  executeSunioSwap,
  waitForSunioTransactionConfirmation,
  SUNIO_MAINNET_DEFAULTS
} from '../providers/sunio.js';

function isUserRejectedError(error) {
  const code = Number(error?.code);
  const message = String(error?.message || error?.error || '');

  return (
    code === 4001 ||
    message.includes('User denied') ||
    message.includes('user denied') ||
    message.includes('Request Signature: User denied request signature')
  );
}

function emitProgress(onProgress, payload) {
  if (typeof onProgress === 'function') {
    onProgress(payload);
  }
}

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
  recipient,
  onProgress
} = {}) {
  if (!route) {
    throw new Error('Swap execution: route is required');
  }

  if (route.provider !== 'sunio') {
    throw new Error(`Unsupported swap provider: ${route.provider}`);
  }

  try {
    emitProgress(onProgress, {
      step: 'checking-allowance',
      message: 'Checking allowance...'
    });

    const allowanceState = await checkSunioAllowance({
      wallet,
      tokenAddress: inputTokenAddress,
      spenderAddress: smartRouterAddress,
      amountIn,
      tokenDecimals: inputTokenDecimals
    });

    if (!allowanceState?.hasEnoughAllowance) {
      const approvalResult = await ensureSunioApproval({
        wallet,
        tokenAddress: inputTokenAddress,
        spenderAddress: smartRouterAddress,
        amountIn,
        tokenDecimals: inputTokenDecimals,
        feeLimit
      });

      emitProgress(onProgress, {
        step: 'approval-submitted',
        message: 'Approving 4TEEN...',
        approvalTxid: approvalResult?.txid || null
      });

      await waitForSunioTransactionConfirmation({
        wallet,
        txid: approvalResult.txid,
        timeoutMs: 120000,
        pollIntervalMs: 1500
      });

      emitProgress(onProgress, {
        step: 'approval-confirmed',
        message: 'Approval confirmed. Press Swap again.',
        approvalTxid: approvalResult?.txid || null
      });

      return {
        ok: true,
        needsRetry: true,
        approvalRequired: true,
        approvalTxid: approvalResult?.txid || null,
        message: 'Approval confirmed. Press Swap again.'
      };
    }

    emitProgress(onProgress, {
      step: 'approval-skipped',
      message: 'Allowance already available. Sending swap...'
    });

    emitProgress(onProgress, {
      step: 'swap-submitting',
      message: 'Swap requested...'
    });

    const swapResult = await executeSunioSwap({
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

    emitProgress(onProgress, {
      step: 'swap-submitted',
      message: swapResult?.unwrapTxid
        ? 'Swap completed. TRX received.'
        : 'Swap completed.',
      swapTxid: swapResult?.txid || null,
      unwrapTxid: swapResult?.unwrapTxid || null
    });

    return {
      ok: true,
      needsRetry: false,
      provider: route.provider,
      approvalRequired: false,
      approvalTxid: null,
      txid: swapResult?.txid || null,
      unwrapTxid: swapResult?.unwrapTxid || null,
      unwrappedAmountRaw: swapResult?.unwrappedAmountRaw || '0',
      route,
      swapResult
    };
  } catch (error) {
    if (isUserRejectedError(error)) {
      return {
        ok: false,
        cancelled: true,
        code: 4001,
        message: 'Transaction cancelled by user.'
      };
    }

    throw error;
  }
}
