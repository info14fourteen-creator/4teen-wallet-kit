import { getWalletState } from '../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

export function collectWalletDiagnostics() {
  const state = getWalletState();
  const w = getWindowSafe();

  return {
    timestamp: new Date().toISOString(),
    walletState: {
      initialized: state.initialized,
      connecting: state.connecting,
      connected: state.connected,
      walletId: state.walletId,
      walletName: state.walletName,
      address: state.address,
      shortAddress: state.shortAddress,
      trxBalance: state.trxBalance,
      fourteenBalance: state.fourteenBalance,
      hasProvider: !!state.provider,
      hasTronWeb: !!state.tronWeb,
      error: state.error
    },
    injected: {
      tronWeb: !!w?.tronWeb,
      tronLink: !!w?.tronLink,
      okxwallet: !!w?.okxwallet,
      okx: !!w?.okx,
      BinanceChain: !!w?.BinanceChain,
      trustwallet: !!w?.trustwallet,
      trustWallet: !!w?.trustWallet,
      bitkeep: !!w?.bitkeep,
      tokenpocket: !!w?.tokenpocket,
      ethereum: !!w?.ethereum
    },
    userAgent: w?.navigator?.userAgent || null
  };
}

export function printWalletDiagnostics() {
  const data = collectWalletDiagnostics();
  console.group('4TEEN WALLET DIAGNOSTICS');
  console.log(data);
  console.groupEnd();
  return data;
}
