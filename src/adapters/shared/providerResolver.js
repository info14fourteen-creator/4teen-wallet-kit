import { detectBrowserWalletName } from './browserDetection.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function getAdapterId(adapter) {
  return (
    adapter?.id ||
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.key ||
    null
  );
}

function normalizeWalletId(value) {
  return String(value || '').trim().toLowerCase();
}

function isWalletConnectAdapter(adapter) {
  const adapterId = normalizeWalletId(getAdapterId(adapter));
  const adapterName = normalizeWalletId(getAdapterName(adapter));

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function isAddressLikeProvider(provider) {
  return !!(
    provider?.tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.selectedAddress ||
    provider?.address
  );
}

function isSignCapableProvider(provider) {
  const tronWeb = provider?.tronWeb || provider || null;

  return !!(
    typeof provider?.request === 'function' ||
    typeof provider?.send === 'function' ||
    typeof provider?.sign === 'function' ||
    typeof tronWeb?.trx?.sign === 'function'
  );
}

function getProviderScore(provider, walletName) {
  let score = 0;

  if (providerMatchesWallet(provider, walletName)) score += 50000;
  if (isAddressLikeProvider(provider)) score += 12000;
  if (isSignCapableProvider(provider)) score += 8000;

  if (walletName === 'TronLink') {
    const win = getWindowSafe();

    if (
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    ) {
      score += 40000;
    }
  }

  return score;
}

export function getProviderCandidates(appkit, adapter) {
  const win = getWindowSafe();

  return [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider,
    adapter?.connector?.wallet,

    appkit?.getWalletProvider?.(),

    win?.tronLink,
    win?.tronLink?.tronWeb,

    win?.okxwallet,
    win?.okxwallet?.tronWeb,
    win?.okxWallet,
    win?.okxWallet?.tronWeb,

    win?.BinanceChain,
    win?.BinanceChain?.tronWeb,
    win?.binancew3w,
    win?.binancew3w?.tron,

    win?.tp,
    win?.tp?.tronWeb,
    win?.tokenPocket,
    win?.tokenPocket?.tronWeb,

    win?.bitkeep,
    win?.bitkeep?.tronWeb,
    win?.bitget,
    win?.bitget?.tronWeb,

    win?.trustwallet,
    win?.trustwallet?.tronWeb,
    win?.trustWallet,
    win?.trustWallet?.tronWeb,

    win?.ethereum,
    win?.ethereum?.tronWeb,

    win?.tronWeb
  ].filter(Boolean);
}

export function providerMatchesWallet(provider, walletName) {
  const win = getWindowSafe();

  if (!walletName) {
    return true;
  }

  if (walletName === 'OKX Wallet') {
    return !!(
      provider === win?.okxwallet ||
      provider === win?.okxwallet?.tronWeb ||
      provider === win?.okxWallet ||
      provider === win?.okxWallet?.tronWeb ||
      provider?.isOkxWallet ||
      provider?.isOKExWallet
    );
  }

  if (walletName === 'Binance Wallet') {
    return !!(
      provider === win?.BinanceChain ||
      provider === win?.BinanceChain?.tronWeb ||
      provider === win?.binancew3w ||
      provider === win?.binancew3w?.tron ||
      provider?.isBinance ||
      provider?.chain === 'tron'
    );
  }

  if (walletName === 'TronLink') {
    return !!(
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    );
  }

  if (walletName === 'MetaMask') {
    return !!(
      provider === win?.ethereum ||
      provider === win?.ethereum?.tronWeb ||
      provider?.isMetaMask
    );
  }

  if (walletName === 'TokenPocket') {
    return !!(
      provider === win?.tp ||
      provider === win?.tp?.tronWeb ||
      provider === win?.tokenPocket ||
      provider === win?.tokenPocket?.tronWeb ||
      provider?.isTokenPocket
    );
  }

  if (walletName === 'Bitget Wallet') {
    return !!(
      provider === win?.bitkeep ||
      provider === win?.bitkeep?.tronWeb ||
      provider === win?.bitget ||
      provider === win?.bitget?.tronWeb ||
      provider?.isBitKeep ||
      provider?.isBitget
    );
  }

  if (walletName === 'Trust') {
    return !!(
      provider === win?.trustwallet ||
      provider === win?.trustwallet?.tronWeb ||
      provider === win?.trustWallet ||
      provider === win?.trustWallet?.tronWeb ||
      provider?.isTrust ||
      provider?.isTrustWallet
    );
  }

  return true;
}

export function pickBestProvider(appkit, adapter, walletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);

  const targetWalletName =
    walletId ||
    browserWalletName ||
    adapterName ||
    adapterId ||
    null;

  const candidates = getProviderCandidates(appkit, adapter);

  if (!candidates.length) {
    return null;
  }

  const ranked = [...candidates]
    .map((provider) => ({
      provider,
      score: getProviderScore(provider, targetWalletName)
    }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.provider) {
    return ranked[0].provider;
  }

  if (
    browserWalletName &&
    browserWalletName !== 'TronLink' &&
    (adapterName === 'TronLink' || adapterId === 'TronLink') &&
    !isWalletConnectAdapter(adapter)
  ) {
    for (const provider of candidates) {
      if (provider !== getWindowSafe()?.tronWeb && provider !== getWindowSafe()?.tronLink) {
        return provider;
      }
    }
  }

  return candidates[0] || null;
}
