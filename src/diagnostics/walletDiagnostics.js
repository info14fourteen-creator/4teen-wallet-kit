import { getWalletState } from '../core/store/walletStore.js';
import { refreshAllBalances } from '../services/balances/refreshAllBalances.js';
import { assertWalletSigning } from './assertWalletSigning.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function collectInjectedWallets() {
  const w = getWindowSafe();

  return {
    tronWeb: !!w?.tronWeb,
    tronLink: !!w?.tronLink,
    okxwallet: !!w?.okxwallet,
    okxWallet: !!w?.okxWallet,
    BinanceChain: !!w?.BinanceChain,
    binancew3w: !!w?.binancew3w,
    trustwallet: !!w?.trustwallet,
    trustWallet: !!w?.trustWallet,
    bitkeep: !!w?.bitkeep,
    bitget: !!w?.bitget,
    tp: !!w?.tp,
    tokenPocket: !!w?.tokenPocket,
    ethereum: !!w?.ethereum
  };
}

function buildBaseStateSnapshot(state) {
  return {
    initialized: state.initialized,
    connecting: state.connecting,
    connected: state.connected,
    walletId: state.walletId,
    walletName: state.walletName,
    activeWalletId: state.activeWalletId,
    address: state.address,
    shortAddress: state.shortAddress,
    trxBalance: state.trxBalance,
    fourteenBalance: state.fourteenBalance,
    hasProvider: !!state.provider,
    hasTronWeb: !!state.tronWeb,
    error: state.error
  };
}

function evaluateConnection(state) {
  const ok = !!(
    state.connected &&
    isUsableAddress(state.address) &&
    (state.provider || state.tronWeb)
  );

  return {
    ok,
    address: state.address || null,
    walletId: state.activeWalletId || state.walletId || null,
    walletName: state.walletName || null,
    hasProvider: !!state.provider,
    hasTronWeb: !!state.tronWeb,
    reason: ok ? null : 'Wallet is not fully connected'
  };
}

function evaluateBalances(state) {
  const trxOk = state.trxBalance !== null && state.trxBalance !== undefined;
  const tokenOk = state.fourteenBalance !== null && state.fourteenBalance !== undefined;
  const ok = trxOk && tokenOk;

  return {
    ok,
    trx: {
      ok: trxOk,
      value: state.trxBalance
    },
    fourteen: {
      ok: tokenOk,
      value: state.fourteenBalance
    },
    reason: ok ? null : 'One or both balances are unavailable'
  };
}

function evaluateSigningSnapshot(state) {
  const provider = state.provider || state.runtime?.provider || null;
  const tronWeb =
    state.tronWeb ||
    state.runtime?.tronWeb ||
    provider?.tronWeb ||
    null;

  const hasProviderSign =
    typeof provider?.sign === 'function' ||
    typeof provider?.request === 'function' ||
    typeof provider?.send === 'function';

  const hasTronWebSign =
    typeof tronWeb?.trx?.sign === 'function';

  const hasTronWebTransactionBuilder =
    typeof tronWeb?.transactionBuilder?.sendTrx === 'function';

  const ok = !!(hasProviderSign || hasTronWebSign);

  return {
    ok,
    hasProviderSign,
    hasTronWebSign,
    hasTronWebTransactionBuilder,
    reason: ok ? null : 'No signing capability detected on provider/tronWeb'
  };
}

export function collectWalletDiagnostics() {
  const state = getWalletState();
  const w = getWindowSafe();

  const connection = evaluateConnection(state);
  const balances = evaluateBalances(state);
  const signing = evaluateSigningSnapshot(state);

  return {
    timestamp: new Date().toISOString(),
    overallOk: connection.ok && balances.ok && signing.ok,
    walletState: buildBaseStateSnapshot(state),
    checks: {
      connection,
      balances,
      signing
    },
    injected: collectInjectedWallets(),
    userAgent: w?.navigator?.userAgent || null
  };
}

export async function runWalletDiagnostics() {
  const before = collectWalletDiagnostics();
  const state = getWalletState();

  let balanceRefresh = {
    attempted: false,
    ok: false,
    error: null
  };

  if (
    isUsableAddress(state.address) &&
    (state.provider || state.tronWeb)
  ) {
    try {
      balanceRefresh.attempted = true;

      await refreshAllBalances({
        address: state.address,
        walletId: state.activeWalletId || state.walletId || null,
        provider: state.provider || state.tronWeb || null
      });

      balanceRefresh.ok = true;
    } catch (error) {
      balanceRefresh.ok = false;
      balanceRefresh.error = error?.message || 'refreshAllBalances failed';
    }
  }

  let signingCheck = null;

  try {
    signingCheck = await assertWalletSigning();
  } catch (error) {
    signingCheck = {
      ok: false,
      stage: 'sign',
      error: error?.message || 'assertWalletSigning failed'
    };
  }

  const after = collectWalletDiagnostics();

  return {
    ok: after.checks.connection.ok && after.checks.balances.ok && !!signingCheck?.ok,
    before,
    after,
    balanceRefresh,
    signingCheck
  };
}

export function printWalletDiagnostics() {
  const data = collectWalletDiagnostics();

  console.group('4TEEN WALLET DIAGNOSTICS');
  console.log('Overall OK:', data.overallOk);
  console.log('Connection:', data.checks.connection);
  console.log('Balances:', data.checks.balances);
  console.log('Signing Snapshot:', data.checks.signing);
  console.log('Wallet State:', data.walletState);
  console.log('Injected:', data.injected);
  console.groupEnd();

  return data;
}

export async function printAndRunWalletDiagnostics() {
  const data = await runWalletDiagnostics();

  console.group('4TEEN WALLET DIAGNOSTICS RUN');
  console.log('Overall OK:', data.ok);
  console.log('Balance Refresh:', data.balanceRefresh);
  console.log('Signing Check:', data.signingCheck);
  console.log('Before:', data.before);
  console.log('After:', data.after);
  console.groupEnd();

  return data;
}
