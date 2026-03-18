import { getWalletState } from '../core/store/walletStore.js';
import {
  getResolvedSigningProvider,
  getResolvedSigningTronWeb,
  getSigningCapabilities,
  getSigningReadiness,
  isUsableAddress
} from '../adapters/shared/signingReadiness.js';

const DRY_RUN_RECEIVER = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';

async function buildDryRunTransaction(tronWeb, address) {
  if (!tronWeb) {
    throw new Error('tronWeb is missing');
  }

  if (!isUsableAddress(address)) {
    throw new Error('wallet address is invalid');
  }

  if (!isUsableAddress(DRY_RUN_RECEIVER)) {
    throw new Error('dry run receiver is invalid');
  }

  if (typeof tronWeb?.transactionBuilder?.sendTrx !== 'function') {
    throw new Error('transactionBuilder.sendTrx is not available');
  }

  const tx = await tronWeb.transactionBuilder.sendTrx(
    DRY_RUN_RECEIVER,
    1,
    address
  );

  if (!tx || typeof tx !== 'object') {
    throw new Error('failed to build dry-run transaction');
  }

  return tx;
}

async function trySignWithTronWeb(tronWeb, tx) {
  if (typeof tronWeb?.trx?.sign !== 'function') {
    return {
      ok: false,
      method: 'tronWeb.trx.sign',
      error: 'tronWeb.trx.sign is not available'
    };
  }

  try {
    const signed = await tronWeb.trx.sign(tx);

    return {
      ok: !!signed,
      method: 'tronWeb.trx.sign',
      signedTransaction: signed || null,
      error: signed ? null : 'sign returned empty result'
    };
  } catch (error) {
    return {
      ok: false,
      method: 'tronWeb.trx.sign',
      error: error?.message || 'tronWeb sign failed'
    };
  }
}

async function trySignWithProvider(provider, tx) {
  if (typeof provider?.sign === 'function') {
    try {
      const signed = await provider.sign(tx);

      return {
        ok: !!signed,
        method: 'provider.sign',
        signedTransaction: signed || null,
        error: signed ? null : 'provider.sign returned empty result'
      };
    } catch (error) {
      return {
        ok: false,
        method: 'provider.sign',
        error: error?.message || 'provider.sign failed'
      };
    }
  }

  if (typeof provider?.request === 'function') {
    try {
      const signed = await provider.request({
        method: 'tron_signTransaction',
        params: [tx]
      });

      return {
        ok: !!signed,
        method: 'provider.request(tron_signTransaction)',
        signedTransaction: signed || null,
        error: signed ? null : 'provider request returned empty result'
      };
    } catch (error) {
      return {
        ok: false,
        method: 'provider.request(tron_signTransaction)',
        error: error?.message || 'provider tron_signTransaction failed'
      };
    }
  }

  if (typeof provider?.send === 'function') {
    try {
      const signed = await provider.send('tron_signTransaction', [tx]);

      return {
        ok: !!signed,
        method: 'provider.send(tron_signTransaction)',
        signedTransaction: signed || null,
        error: signed ? null : 'provider send returned empty result'
      };
    } catch (error) {
      return {
        ok: false,
        method: 'provider.send(tron_signTransaction)',
        error: error?.message || 'provider send tron_signTransaction failed'
      };
    }
  }

  return {
    ok: false,
    method: null,
    error: 'no provider signing method available'
  };
}

export async function assertWalletSigning(options = {}) {
  const { mode = 'capability' } = options;

  const state = getWalletState();
  const readiness = getSigningReadiness(state);

  if (!readiness.ok) {
    return readiness;
  }

  if (mode !== 'verify') {
    return {
      ok: true,
      stage: 'capability',
      address: readiness.address,
      providerName: readiness.providerName,
      capabilities: readiness.capabilities,
      transactionBuilt: false,
      error: null
    };
  }

  const provider = getResolvedSigningProvider(state);
  const tronWeb = getResolvedSigningTronWeb(state);
  const capabilities = getSigningCapabilities(provider, tronWeb);
  const address = readiness.address;

  let tx = null;

  try {
    tx = await buildDryRunTransaction(tronWeb, address);
  } catch (error) {
    return {
      ok: false,
      stage: 'build',
      error: error?.message || 'failed to build transaction',
      capabilities
    };
  }

  const tronWebResult = await trySignWithTronWeb(tronWeb, tx);

  if (tronWebResult.ok) {
    return {
      ok: true,
      stage: 'sign',
      method: tronWebResult.method,
      address,
      providerName: readiness.providerName,
      capabilities,
      transactionBuilt: true
    };
  }

  const providerResult = await trySignWithProvider(provider, tx);

  if (providerResult.ok) {
    return {
      ok: true,
      stage: 'sign',
      method: providerResult.method,
      address,
      providerName: readiness.providerName,
      capabilities,
      transactionBuilt: true
    };
  }

  return {
    ok: false,
    stage: 'sign',
    error: providerResult.error || tronWebResult.error || 'signing failed',
    address,
    providerName: readiness.providerName,
    capabilities,
    transactionBuilt: true,
    attempts: {
      tronWeb: tronWebResult,
      provider: providerResult
    }
  };
}

export async function printWalletSigningDiagnostics(options = {}) {
  const result = await assertWalletSigning(options);

  console.group('[4TEEN] WALLET SIGNING DIAGNOSTICS');
  console.log('Signing OK:', result.ok);
  console.log('Stage:', result.stage);
  console.log('Method:', result.method || null);
  console.log('Address:', result.address || null);
  console.log('Provider:', result.providerName || null);
  console.log('Capabilities:', result.capabilities || null);
  console.log('Error:', result.error || null);
  console.log('Attempts:', result.attempts || null);
  console.groupEnd();

  return result;
}
