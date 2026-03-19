import {
  isWalletBrowser,
  isTronLinkBrowser,
  isOkxBrowser,
  isBinanceBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  isTrustWalletBrowser,
  isMetaMaskBrowser,
  isImTokenBrowser,
  isFoxWalletBrowser
} from '../../adapters/shared/browserDetection.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getNavigatorSafe() {
  const win = getWindowSafe();
  return win?.navigator || null;
}

function getUserAgent() {
  return String(getNavigatorSafe()?.userAgent || '').toLowerCase();
}

function isMobileUserAgent() {
  const ua = getUserAgent();

  return (
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('ipod') ||
    ua.includes('android') ||
    ua.includes('mobile')
  );
}

function getInstalledInjectedWallets() {
  const win = getWindowSafe();
  if (!win) return [];

  const installed = [];

  if (win.tronLink || win.tronWeb?.isTronLink) {
    installed.push('TronLink');
  }

  if (win.okxwallet || win.okxWallet) {
    installed.push('OKX Wallet');
  }

  if (win.BinanceChain || win.binancew3w) {
    installed.push('Binance Wallet');
  }

  if (win.tp || win.tokenPocket) {
    installed.push('TokenPocket');
  }

  if (win.bitkeep || win.bitget) {
    installed.push('Bitget Wallet');
  }

  if (win.trustwallet || win.trustWallet) {
    installed.push('Trust');
  }

  if (win.tronweb || win.tronWeb) {
    if (isImTokenBrowser()) {
      installed.push('imToken');
    }
  }

  if (win.foxwallet || win.foxwallet?.tronLink) {
    installed.push('FoxWallet');
  }

  if (win.ethereum?.isMetaMask) {
    installed.push('MetaMask');
  }

  return [...new Set(installed)];
}

function getMobileWalletBrowserId() {
  if (!isWalletBrowser()) return null;
  if (!isMobileUserAgent()) return null;

  if (isTronLinkBrowser()) return 'TronLink';
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  if (isTrustWalletBrowser()) return 'Trust';

  // These must be resolved before MetaMask because in-app mobile browsers
  // may also expose window.ethereum and otherwise get misclassified.
  if (isImTokenBrowser()) return 'imToken';
  if (isFoxWalletBrowser()) return 'FoxWallet';

  if (isMetaMaskBrowser()) return 'MetaMask';

  return null;
}

export function getWalletEnvironmentSnapshot() {
  const installedWallets = getInstalledInjectedWallets();
  const mobileWalletId = getMobileWalletBrowserId();

  return {
    isWalletBrowser: isWalletBrowser(),
    isMobile: isMobileUserAgent(),
    installedWallets,
    installedWalletCount: installedWallets.length,
    mobileWalletId
  };
}

export function shouldAutoConnectWallet() {
  const snapshot = getWalletEnvironmentSnapshot();

  if (!snapshot.isWalletBrowser) {
    return false;
  }

  if (!snapshot.isMobile) {
    return false;
  }

  if (!snapshot.mobileWalletId) {
    return false;
  }

  // FoxWallet is kept on manual connect for stability.
  if (snapshot.mobileWalletId === 'FoxWallet') {
    return false;
  }

  return true;
}

export function resolveAutoWallet() {
  const snapshot = getWalletEnvironmentSnapshot();

  if (!shouldAutoConnectWallet()) {
    return {
      shouldAutoConnect: false,
      walletId: null,
      reason: snapshot.mobileWalletId === 'FoxWallet'
        ? 'foxwallet_manual_connect_only'
        : !snapshot.isWalletBrowser
          ? 'not_wallet_browser'
          : !snapshot.isMobile
            ? 'desktop_environment'
            : 'wallet_browser_not_resolved',
      ...snapshot
    };
  }

  return {
    shouldAutoConnect: true,
    walletId: snapshot.mobileWalletId,
    reason: 'mobile_wallet_browser',
    ...snapshot
  };
}
