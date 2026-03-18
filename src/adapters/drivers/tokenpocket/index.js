import { isTokenPocketBrowser } from '../../shared/browserDetection.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress
} from '../../shared/accountRequests.js';
import { pickBestProvider } from '../../shared/providerResolver.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'tokenpocket';
const DRIVER_NAME = 'TokenPocket';
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
    id === 'tokenpocket' ||
    id === 'token pocket' ||
    id === 'tp' ||
    name === 'tokenpocket' ||
    name === 'token pocket' ||
    name === 'tp'
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

function getInjectedTokenPocketProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  if (win.tokenPocket?.tronWeb) return win.tokenPocket.tronWeb;
  if (win.tokenPocket?.tron) return win.tokenPocket.tron;
  if (win.tokenPocket) return win.tokenPocket;

  if (win.tokenpocket?.tronWeb) return win.tokenpocket.tronWeb;
  if (win.tokenpocket?.tron) return win.tokenpocket.tron;
  if (win.tokenpocket) return win.tokenpocket;

  if (win.tp?.tronWeb) return win.tp.tronWeb;
  if (win.tp?.tron) return win.tp.tron;
  if (win.tp) return win.tp;

  return null;
}

function getInjectedTokenPocketContainer() {
  const win = getWindowSafe();
  return win?.tokenPocket || win?.tokenpocket || win?.tp || null;
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedTokenPocketProvider();
  if (injected) return injected;

  if (adapter) {
    const picked = pickBestProvider(appkit, adapter, DRIVER_NAME);
    if (picked) return picked;
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
    hasTronWebSign: typeof tronWeb?.trx?.sign === 'function',
    hasTransactionBuilder: typeof tronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof tronWeb?.address?.toHex === 'function',
    canSign: !!(
      typeof provider?.request === 'function' ||
      typeof provider?.send === 'function' ||
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

async function requestTokenPocketAccounts(provider) {
  const container = getInjectedTokenPocketContainer();
  const requestTargets = [
    container?.tron,
    provider?.tron,
    container,
    provider
  ].filter(Boolean);

  for (const target of requestTargets) {
    try {
      if (typeof target?.request === 'function') {
        const result = await target.request({ method: 'eth_requestAccounts' });

        if (Array.isArray(result) && isUsableAddress(result[0])) {
          return result[0];
        }

        if (isUsableAddress(result)) {
          return result;
        }

        if (isUsableAddress(result?.address)) {
          return result.address;
        }
      }
    } catch (_) {}
  }

  return null;
}

async function ensureTokenPocketSession(adapter, provider) {
  const directAddress = resolveAddress(adapter, provider);

  if (isUsableAddress(directAddress)) {
    return directAddress;
  }

  const requestedAddress = await requestTokenPocketAccounts(provider);

  if (isUsableAddress(requestedAddress)) {
    return requestedAddress;
  }

  return null;
}

async function waitForTokenPocketProvider(appkit, adapter, options = {}) {
  const {
    attempts = 12,
    intervalMs = 120
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider(appkit, adapter);
    const address = resolveAddress(adapter, provider);

    if (provider && (address || provider?.trx?.sign || provider?.tronWeb?.trx?.sign)) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider(appkit, adapter);
}

export const tokenPocketDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle() {
    return isTokenPocketBrowser() || !!getInjectedTokenPocketProvider();
  },

  getAdapter(appkit) {
    return getCandidateAdapter(appkit);
  },

  getProvider(appkit) {
    const adapter = this.getAdapter(appkit);
    return getResolvedProvider(appkit, adapter);
  },

  getAddress(appkit) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    return resolveAddress(adapter, provider);
  },

  async connect(appkit) {
    const adapter = this.getAdapter(appkit);

    if (adapter) {
      await connectAdapter(adapter);
    }

    let provider = await waitForTokenPocketProvider(appkit, adapter);
    let address = await ensureTokenPocketSession(adapter, provider);

    provider = await waitForTokenPocketProvider(appkit, adapter);

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 16,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('TokenPocket address not resolved');
    }

    await forceBindTronWeb(provider, address);

    const finalProvider = await waitForTokenPocketProvider(appkit, adapter);

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider: finalProvider || provider,
      tronWeb: finalProvider?.tronWeb || finalProvider || provider?.tronWeb || provider || null,
      adapter: adapter || null
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
      throw new Error('TokenPocket balances: invalid address');
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
      throw new Error('TokenPocket signing not available');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('TokenPocket transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('TokenPocket address codec is not available');
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
      subscribe(win?.tokenPocket, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.tokenPocket, 'disconnect', handlers.onDisconnect),
      subscribe(win?.tokenPocket, 'connect', handlers.onConnect),
      subscribe(win?.tokenpocket, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.tokenpocket, 'disconnect', handlers.onDisconnect),
      subscribe(win?.tokenpocket, 'connect', handlers.onConnect),
      subscribe(win?.tp, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.tp, 'disconnect', handlers.onDisconnect),
      subscribe(win?.tp, 'connect', handlers.onConnect)
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

export function createTokenPocketDriver() {
  return tokenPocketDriver;
}
