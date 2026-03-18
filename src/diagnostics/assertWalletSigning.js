import { getWalletState } from '../core/store/walletStore.js';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getResolvedProvider(state) {
  return state?.provider || state?.runtime?.provider || null;
}

function getResolvedTronWeb(state) {
  return (
    state?.tronWeb ||
    state?.runtime?.tronWeb ||
    state?.provider?.tronWeb ||
    state?.runtime?.provider?.tronWeb ||
    null
  );
}

function getSigningCapabilities(provider, tronWeb) {
  return {
    hasProvider: !!provider,
    hasTronWeb: !!tronWeb,

    hasProviderRequest: typeof provider?.request === 'function',
    hasProviderSend: typeof provider?.send === 'function',
    hasProviderSign: typeof provider?.sign === 'function',

    hasTrxSign: typeof tronWeb?.trx?.sign === 'function',
    hasTransactionBuilder: typeof tronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof tronWeb?.address?.toHex === 'function',

    canSign: !!(
      typeof provider?.sign === 'function' ||
      typeof provider?.request === 'function' ||
      typeof provider?.send === 'function' ||
      typeof tronWeb?.trx?.sign === 'function'
    )
  };
}

async function buildDryRunTransaction(tronWeb, address) {
  if (!tronWeb) {
    throw new Error('tronWeb is missing');
  }

  if (!isUsableAddress(address)) {
    throw new Error('wallet address is invalid');
  }

  if (typeof tronWeb?.transactionBuilder?.sendTrx !== 'function') {
    throw new Error('transactionBuilder.sendTrx is not available');
  }

  const tx = await tronWeb.transactionBuilder.sendTrx(
    address,
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

export async function assertWalletSigning() {
  const state = getWalletState();

  const address = state.address || state.account?.address || null;
  const provider = getResolvedProvider(state);
  const tronWeb = getResolvedTronWeb(state);
  const capabilities = getSigningCapabilities(provider, tronWeb);

  if (!state.connected) {
    return {
      ok: false,
      stage: 'connection',
      error: 'wallet is not connected',
      capabilities
    };
  }

  if (!isUsableAddress(address)) {
    return {
      ok: false,
      stage: 'address',
      error: 'wallet address is missing or invalid',
      capabilities
    };
  }

  if (!capabilities.canSign) {
    return {
      ok: false,
      stage: 'capabilities',
      error: 'no signing capability detected',
      capabilities
    };
  }

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
      capabilities,
      transactionBuilt: true
    };
  }

  return {
    ok: false,
    stage: 'sign',
    error: providerResult.error || tronWebResult.error || 'signing failed',
    address,
    capabilities,
    transactionBuilt: true,
    attempts: {
      tronWeb: tronWebResult,
      provider: providerResult
    }
  };
}

export async function printWalletSigningDiagnostics() {
  const result = await assertWalletSigning();

  console.group('[4TEEN] WALLET SIGNING DIAGNOSTICS');
  console.log('Signing OK:', result.ok);
  console.log('Stage:', result.stage);
  console.log('Method:', result.method || null);
  console.log('Address:', result.address || null);
  console.log('Capabilities:', result.capabilities || null);
  console.log('Error:', result.error || null);
  console.log('Attempts:', result.attempts || null);
  console.groupEnd();

  return result;
}
