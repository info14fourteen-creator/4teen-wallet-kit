import { getWalletState } from '../../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

export function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function getResolvedSigningProvider(input = null) {
  if (input && (input.provider || input.tronWeb || input.runtime)) {
    return (
      input.provider ||
      input.runtime?.provider ||
      input.tronWeb ||
      input.runtime?.tronWeb ||
      null
    );
  }

  const state = input || getWalletState();

  return (
    state?.provider ||
    state?.runtime?.provider ||
    state?.tronWeb ||
    state?.runtime?.tronWeb ||
    null
  );
}

export function getResolvedSigningTronWeb(input = null) {
  if (input && (input.tronWeb || input.provider || input.runtime)) {
    return (
      input.tronWeb ||
      input.runtime?.tronWeb ||
      input.provider?.tronWeb ||
      input.runtime?.provider?.tronWeb ||
      input.provider ||
      null
    );
  }

  const state = input || getWalletState();

  return (
    state?.tronWeb ||
    state?.runtime?.tronWeb ||
    state?.provider?.tronWeb ||
    state?.runtime?.provider?.tronWeb ||
    state?.provider ||
    null
  );
}

export function getSigningCapabilities(provider, tronWeb) {
  const resolvedProvider = provider || null;
  const resolvedTronWeb = tronWeb || provider?.tronWeb || provider || null;

  return {
    hasProvider: !!resolvedProvider,
    hasTronWeb: !!resolvedTronWeb,

    hasProviderRequest: typeof resolvedProvider?.request === 'function',
    hasProviderSend: typeof resolvedProvider?.send === 'function',
    hasProviderSign: typeof resolvedProvider?.sign === 'function',

    hasTrxSign: typeof resolvedTronWeb?.trx?.sign === 'function',
    hasTransactionBuilder: typeof resolvedTronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof resolvedTronWeb?.address?.toHex === 'function',
    hasAddressFromHex: typeof resolvedTronWeb?.address?.fromHex === 'function',

    canSign: !!(
      typeof resolvedProvider?.sign === 'function' ||
      typeof resolvedProvider?.request === 'function' ||
      typeof resolvedProvider?.send === 'function' ||
      typeof resolvedTronWeb?.trx?.sign === 'function'
    )
  };
}

export function getSigningReadiness(input = {}) {
  const state =
    input && (input.connected !== undefined || input.address || input.provider || input.tronWeb)
      ? input
      : getWalletState();

  const provider = getResolvedSigningProvider(state);
  const tronWeb = getResolvedSigningTronWeb(state);
  const capabilities = getSigningCapabilities(provider, tronWeb);

  const address =
    state?.address ||
    state?.account?.address ||
    tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    null;

  const win = getWindowSafe();

  const providerName =
    provider === win?.tronLink || provider === win?.tronLink?.tronWeb || provider?.isTronLink || provider?.tronWeb?.isTronLink
      ? 'TronLink'
      : provider === win?.okxwallet || provider === win?.okxwallet?.tronWeb || provider === win?.okxWallet || provider === win?.okxWallet?.tronWeb || provider?.isOkxWallet || provider?.isOKExWallet
        ? 'OKX Wallet'
        : provider === win?.BinanceChain || provider === win?.BinanceChain?.tronWeb || provider === win?.binancew3w || provider === win?.binancew3w?.tron || provider?.isBinance
          ? 'Binance Wallet'
          : provider === win?.tp || provider === win?.tp?.tronWeb || provider === win?.tokenPocket || provider === win?.tokenPocket?.tronWeb || provider?.isTokenPocket
            ? 'TokenPocket'
            : provider === win?.bitkeep || provider === win?.bitkeep?.tronWeb || provider === win?.bitget || provider === win?.bitget?.tronWeb || provider?.isBitKeep || provider?.isBitget
              ? 'Bitget Wallet'
              : provider === win?.trustwallet || provider === win?.trustwallet?.tronWeb || provider === win?.trustWallet || provider === win?.trustWallet?.tronWeb || provider?.isTrust || provider?.isTrustWallet
                ? 'Trust'
                : provider === win?.ethereum || provider === win?.ethereum?.tronWeb || provider?.isMetaMask
                  ? 'MetaMask'
                  : null;

  if (!(state?.connected || state?.lifecycle?.connected)) {
    return {
      ok: false,
      stage: 'connection',
      address: null,
      providerName,
      capabilities,
      error: 'wallet is not connected'
    };
  }

  if (!isUsableAddress(address)) {
    return {
      ok: false,
      stage: 'address',
      address: null,
      providerName,
      capabilities,
      error: 'wallet address is missing or invalid'
    };
  }

  if (!capabilities.canSign) {
    return {
      ok: false,
      stage: 'capabilities',
      address,
      providerName,
      capabilities,
      error: 'wallet signing capability is not available'
    };
  }

  if (!capabilities.hasTransactionBuilder) {
    return {
      ok: false,
      stage: 'transaction_builder',
      address,
      providerName,
      capabilities,
      error: 'transaction builder is not available'
    };
  }

  if (!capabilities.hasAddressToHex) {
    return {
      ok: false,
      stage: 'address_codec',
      address,
      providerName,
      capabilities,
      error: 'tronWeb address codec is not available'
    };
  }

  return {
    ok: true,
    stage: 'ready',
    address,
    providerName,
    capabilities,
    error: null
  };
}

export function assertSigningCapability(input = {}) {
  const readiness = getSigningReadiness(input);

  if (!readiness.ok) {
    throw new Error(readiness.error || 'wallet signing readiness failed');
  }

  return readiness;
}
