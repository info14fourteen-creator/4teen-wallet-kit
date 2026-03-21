import {
  checkSunioAllowance,
  ensureSunioApproval,
  executeSunioSwap,
  waitForSunioTransactionConfirmation
} from '../providers/sunio.js';

function toErrorMessage(error) {
  if (!error) return 'Unknown error';

  if (typeof error === 'string') return error;

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error?.error === 'string' && error.error.trim()) {
    return error.error.trim();
  }

  try {
    return JSON.stringify(error);
  } catch (_) {
    return 'Unknown error';
  }
}

function normalizeMessage(message) {
  return String(message || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapSwapErrorToUserMessage(error) {
  const raw = normalizeMessage(toErrorMessage(error));
  const lower = raw.toLowerCase();

  if (!raw) {
    return 'Swap failed for an unknown reason. Please try again.';
  }

  if (
    lower.includes('user denied') ||
    lower.includes('user rejected') ||
    lower.includes('rejected by user') ||
    lower.includes('cancelled') ||
    lower.includes('canceled') ||
    lower.includes('declined')
  ) {
    return 'Transaction was cancelled in the wallet.';
  }

  if (
    lower.includes('wallet is not connected') ||
    lower.includes('tronweb is not available') ||
    lower.includes('wallet address is not available') ||
    lower.includes('owner address is invalid') ||
    lower.includes('recipient address is invalid')
  ) {
    return 'Wallet connection is not ready. Reconnect the wallet and try again.';
  }

  if (
    lower.includes('network error') ||
    lower.includes('failed to fetch') ||
    lower.includes('fetch failed') ||
    lower.includes('request failed') ||
    lower.includes('timeout') ||
    lower.includes('connection') ||
    lower.includes('disconnected')
  ) {
    return 'Network issue while talking to the blockchain. Please try again.';
  }

  if (
    lower.includes('transaction confirmation timeout') ||
    lower.includes('transaction not found')
  ) {
    return 'The transaction was sent, but confirmation took too long. Please check the wallet or explorer.';
  }

  if (
    lower.includes('insufficient output amount') ||
    lower.includes('amountoutmin') ||
    lower.includes('slippage')
  ) {
    return 'Price changed before confirmation. Try again or increase slippage slightly.';
  }

  if (
    lower.includes('deadline') ||
    lower.includes('expired') ||
    lower.includes('transaction expired')
  ) {
    return 'Swap request expired before confirmation. Please try again.';
  }

  if (
    lower.includes('balance is not sufficient') ||
    lower.includes('insufficient balance') ||
    lower.includes('no enough balance') ||
    lower.includes('account balance is insufficient')
  ) {
    return 'Insufficient balance to complete this swap.';
  }

  if (
    lower.includes('out of energy') ||
    lower.includes('bandwidth') ||
    lower.includes('fee limit') ||
    lower.includes('not enough energy')
  ) {
    return 'Not enough network resources for the transaction. Add more TRX for fees or energy and try again.';
  }

  if (
    lower.includes('allowance') ||
    lower.includes('approve')
  ) {
    return 'Token approval failed. Please confirm approval in the wallet and try again.';
  }

  if (
    lower.includes('selected route is not supported') ||
    lower.includes('route is not supported') ||
    lower.includes('route.path is required') ||
    lower.includes('route.poolversion is required')
  ) {
    return 'This route is not supported by the current widget version yet. Please try another quote.';
  }

  return raw;
}

function makeStepReporter(reportProgress) {
  return function step(step, payload = {}) {
    if (typeof reportProgress === 'function') {
      reportProgress({
        step,
        ...payload
      });
    }
  };
}

async function confirmIfNeeded({
  wallet,
  txid,
  reportStep,
  label = 'confirming'
}) {
  if (!txid) return null;

  reportStep(label, { txid });

  try {
    const confirmation = await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    return confirmation;
  } catch (error) {
    throw new Error(mapSwapErrorToUserMessage(error));
  }
}

export async function executeSwapFlow({
  wallet,
  selectedRoute,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = null,
  reportProgress
} = {}) {
  const step = makeStepReporter(reportProgress);

  try {
    if (!wallet) {
      throw new Error('Wallet is not connected');
    }

    if (!selectedRoute) {
      throw new Error('No route selected');
    }

    if (!amountIn || Number(amountIn) <= 0) {
      throw new Error('Enter a valid amount');
    }

    if (!inputTokenAddress) {
      throw new Error('Input token address is missing');
    }

    step('validating', {
      message: 'Preparing swap...'
    });

    step('checking-allowance', {
      message: 'Checking token approval...'
    });

    const allowance = await checkSunioAllowance({
      wallet,
      tokenAddress: inputTokenAddress,
      amountIn,
      tokenDecimals: inputTokenDecimals
    });

    let approval = null;
    let approvalConfirmation = null;

    if (!allowance?.hasEnoughAllowance) {
      step('approval-required', {
        message: 'Approval is required before swap.'
      });

      approval = await ensureSunioApproval({
        wallet,
        tokenAddress: inputTokenAddress,
        amountIn,
        tokenDecimals: inputTokenDecimals
      });

      if (approval?.txid) {
        step('approval-submitted', {
          message: 'Approval transaction sent.',
          txid: approval.txid
        });

        approvalConfirmation = await confirmIfNeeded({
          wallet,
          txid: approval.txid,
          reportStep: step,
          label: 'approval-confirming'
        });

        step('approval-confirmed', {
          message: 'Approval confirmed.',
          txid: approval.txid,
          confirmation: approvalConfirmation
        });
      }
    } else {
      step('approval-ready', {
        message: 'Existing approval is sufficient.'
      });
    }

    step('swap-submitting', {
      message: 'Sending swap transaction...'
    });

    const swapResult = await executeSunioSwap({
      wallet,
      route: selectedRoute,
      amountIn,
      slippage,
      inputTokenAddress,
      inputTokenDecimals,
      outputTokenDecimals
    });

    if (!swapResult?.txid) {
      throw new Error('Swap transaction was not created');
    }

    step('swap-submitted', {
      message: 'Swap transaction sent.',
      txid: swapResult.txid
    });

    const confirmation =
      swapResult?.confirmation ||
      (await confirmIfNeeded({
        wallet,
        txid: swapResult.txid,
        reportStep: step,
        label: 'swap-confirming'
      }));

    step('swap-confirmed', {
      message: 'Swap confirmed on-chain.',
      txid: swapResult.txid,
      confirmation
    });

    step('success', {
      message: 'Swap completed successfully.',
      txid: swapResult.txid,
      approvalTxid: approval?.txid || null,
      confirmation
    });

    return {
      ok: true,
      status: 'success',
      provider: swapResult?.provider || selectedRoute?.provider || 'sunio',
      txid: swapResult.txid,
      approvalTxid: approval?.txid || null,
      approval,
      approvalConfirmation,
      confirmation,
      route: selectedRoute,
      result: swapResult
    };
  } catch (error) {
    const userMessage = mapSwapErrorToUserMessage(error);

    step('error', {
      message: userMessage,
      rawMessage: toErrorMessage(error)
    });

    return {
      ok: false,
      status: 'error',
      message: userMessage,
      rawMessage: toErrorMessage(error),
      route: selectedRoute || null
    };
  }
}

export { mapSwapErrorToUserMessage };
