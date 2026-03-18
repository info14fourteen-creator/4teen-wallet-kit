import { connectTrustFallback, isTrustWalletBrowser } from '../../trustFallback.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress,
  tryRequestAccounts
} from '../../shared/accountRequests.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'trust';
const DRIVER_NAME = 'Trust Wallet';
const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function isMatchingAdapter(adapter) {
  const id = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const name = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return (
    id === 'trust' ||
    id === 'trustwallet' ||
    id === 'trust wallet' ||
    name === 'trust' ||
    name === 'trustwallet' ||
    name === 'trust wallet'
  );
}

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (typeof appkit.getConnectors === 'function') {
    const connectors = appkit.getConnectors();
    return Array.isArray(connectors) ? connectors : [];
  }

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function getStrictTrustWindowProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.trustwallet?.tronWeb ||
    win.trustWallet?.tronWeb ||
    win.trustwallet ||
    win.trustWallet ||
    win.trustwallet?.ethereum ||
    win.trustWallet?.ethereum ||
    null
  );
}

function isTrustProvider(provider) {
  const win = getWindowSafe();
  if (!win || !provider) return false;

  return !!(
    provider === win.trustwallet ||
    provider === win.trustWallet ||
    provider === win.trustwallet?.tronWeb ||
    provider === win.trustWallet?.tronWeb ||
    provider === win.trustwallet?.ethereum ||
    provider === win.trustWallet?.ethereum ||
    provider?.isTrust ||
    provider?.isTrustWallet
  );
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedDesktopProvider(appkit, adapter = null) {
  const strictWindowProvider = getStrictTrustWindowProvider();

  if (strictWindowProvider && isTrustProvider(strictWindowProvider)) {
    return strictWindowProvider;
  }

  if (!adapter) {
    return null;
  }

  const candidates = [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider,
    adapter?.connector?.wallet
  ].filter(Boolean);

  for (const provider of candidates) {
    if (isTrustProvider(provider)) {
      return provider;
    }
  }

  const appkitProvider =
    typeof appkit?.getWalletProvider === 'function'
      ? appkit.getWalletProvider()
      : null;

  if (appkitProvider && isTrustProvider(appkitProvider)) {
    return appkitProvider;
  }

  return null;
}

async function connectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    return;
  }

  try {
    await adapter.connect();
  } catch (error) {
    const message = String(error?.message || '').toLowerCase();

    if (
      message.includes('already connected') ||
      message.includes('session currently connected') ||
      message.includes('connection already open')
    ) {
      return;
    }

    throw error;
  }
}

async function disconnectAdapter(adapter, provider = null) {
  const targets = [
    adapter,
    adapter?.connector,
    adapter?.provider,
    adapter?.walletProvider,
    provider
  ].filter(Boolean);

  for (const target of targets) {
    for (const methodName of ['disconnect', 'close', 'reset']) {
      if (typeof target?.[methodName] !== 'function') continue;

      try {
        await target[methodName]();
      } catch (_) {}
    }
  }
}

function getSigningCapabilities(provider) {
  const tronWeb = provider?.tronWeb || provider || null;

  return {
    hasProviderRequest: typeof provider?.request === 'function',
    hasProviderSend: typeof provider?.send === 'function',
    hasProviderSign: typeof provider?.sign === 'function',
    hasTronWebSign: typeof tronWeb?.trx?.sign === 'function',
    hasTransactionBuilder: typeof tronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof tronWeb?.address?.toHex === 'function',
    canSign: !!(
      typeof provider?.request === 'function' ||
      typeof provider?.send === 'function' ||
      typeof provider?.sign === 'function' ||
      typeof tronWeb?.trx?.sign === 'function'
    )
  };
}

function subscribe(target, eventName, handler) {
  if (!target || typeof target.on !== 'function' || typeof handler !== 'function') {
    return () => {};
  }

  try {
    target.on(eventName, handler);
  } catch (_) {
    return () => {};
  }

  return () => {
    try {
      if (typeof target.off === 'function') {
        target.off(eventName, handler);
      }
    } catch (_) {}

    try {
      if (typeof target.removeListener === 'function') {
        target.removeListener(eventName, handler);
      }
    } catch (_) {}
  };
}

async function ensureDesktopTrustSession(adapter, provider) {
  const directAddress = resolveAddress(adapter, provider);

  if (isUsableAddress(directAddress)) {
    return directAddress;
  }

  const requestedAddress = await tryRequestAccounts(provider);

  if (isUsableAddress(requestedAddress)) {
    return requestedAddress;
  }

  return null;
}

async function waitForDesktopTrustProvider(appkit, adapter, options = {}) {
  const {
    attempts = 16,
    intervalMs = 160
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedDesktopProvider(appkit, adapter);

    if (provider && isTrustProvider(provider)) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedDesktopProvider(appkit, adapter);
}

export const trustDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle(appkit) {
    return isTrustWalletBrowser() || !!getResolvedDesktopProvider(appkit, this.getAdapter(appkit));
  },

  getAdapter(appkit) {
    return getCandidateAdapter(appkit);
  },

  getProvider(appkit) {
    const adapter = this.getAdapter(appkit);
    return getResolvedDesktopProvider(appkit, adapter);
  },

  getAddress(appkit) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    return resolveAddress(adapter, provider);
  },

  async connect(appkit) {
    if (isTrustWalletBrowser()) {
      const fallbackResult = await connectTrustFallback();

      return {
        ok: true,
        walletId: 'Trust',
        walletName: DRIVER_NAME,
        address: fallbackResult.address,
        provider: fallbackResult.provider || fallbackResult.tronWeb || null,
        tronWeb: fallbackResult.tronWeb || fallbackResult.provider || null,
        adapter: null
      };
    }

    const adapter = this.getAdapter(appkit);

    if (!adapter) {
      throw new Error('Trust Wallet adapter not found');
    }

    await connectAdapter(adapter);

    let provider = await waitForDesktopTrustProvider(appkit, adapter);

    if (!provider || !isTrustProvider(provider)) {
      throw new Error('Trust Wallet provider not found');
    }

    let address = await ensureDesktopTrustSession(adapter, provider);

    provider = await waitForDesktopTrustProvider(appkit, adapter);

    if (!provider || !isTrustProvider(provider)) {
      throw new Error('Wrong provider resolved (not Trust Wallet)');
    }

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 18,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('Trust Wallet address not resolved');
    }

    await forceBindTronWeb(provider, address);

    return {
      ok: true,
      walletId: 'Trust',
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb: provider?.tronWeb || provider || null,
      adapter
    };
  },

  async disconnect(appkit) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    await disconnectAdapter(adapter, provider);

    return { ok: true };
  },

  async readBalances(appkit, options = {}) {
    const address = options.address || this.getAddress(appkit);

    if (!isUsableAddress(address)) {
      throw new Error('Trust Wallet balances: invalid address');
    }

    const trxBalance = await readTrxBalance(address);

    const tokenResult = await safeReadTokenBalance(
      address,
      options.tokenAddress || FOURTEEN_TOKEN_ADDRESS
    );

    return {
      ok: trxBalance !== null && tokenResult.ok,
      address,
      trxBalance,
      tokenBalance: tokenResult.value,
      tokenSource: tokenResult.source || null,
      tokenError: tokenResult.error?.message || null
    };
  },

  getSigningState(appkit) {
    const provider = this.getProvider(appkit);
    return getSigningCapabilities(provider);
  },

  async assertSigningReady(appkit) {
    const signing = this.getSigningState(appkit);

    if (!signing.canSign) {
      return {
        ok: true,
        degraded: true,
        reason: 'signing_not_ready_yet',
        ...signing
      };
    }

    return {
      ok: true,
      ...signing
    };
  },

  subscribe(appkit, handlers = {}) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);
    const win = getWindowSafe();

    const unsubs = [
      subscribe(adapter, 'connect', handlers.onConnect),
      subscribe(adapter, 'disconnect', handlers.onDisconnect),
      subscribe(adapter, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(adapter, 'readyStateChanged', handlers.onReadyStateChanged),
      subscribe(provider, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(provider, 'disconnect', handlers.onDisconnect),
      subscribe(provider, 'connect', handlers.onConnect),
      subscribe(win?.trustwallet, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.trustwallet, 'disconnect', handlers.onDisconnect),
      subscribe(win?.trustwallet, 'connect', handlers.onConnect),
      subscribe(win?.trustWallet, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.trustWallet, 'disconnect', handlers.onDisconnect),
      subscribe(win?.trustWallet, 'connect', handlers.onConnect)
    ];

    return () => {
      unsubs.forEach((unsub) => {
        try {
          unsub();
        } catch (_) {}
      });
    };
  }
};

export function createTrustDriver() {
  return trustDriver;
}
