import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import { forceBindTronWeb } from '../../shared/accountRequests.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'foxwallet';
const DRIVER_NAME = 'FoxWallet';
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
    id === 'foxwallet' ||
    id === 'fox wallet' ||
    name === 'foxwallet' ||
    name === 'fox wallet'
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

function getFoxWindowProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.foxwallet?.tronLink ||
    win.foxwallet ||
    null
  );
}

function isFoxWalletBrowser() {
  const win = getWindowSafe();
  if (!win) return false;

  const ua = String(win.navigator?.userAgent || '').toLowerCase();
  const href = String(win.location?.href || '').toLowerCase();

  return (
    href.includes('utm_source=foxwallet') ||
    ua.includes('foxwallet') ||
    ua.includes('fox wallet') ||
    !!win.foxwallet
  );
}

function isFoxProvider(provider) {
  const win = getWindowSafe();
  if (!provider || !win) return false;

  return !!(
    provider === win.foxwallet ||
    provider === win.foxwallet?.tronLink ||
    provider?.isFoxWallet
  );
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const windowProvider = getFoxWindowProvider();

  if (windowProvider && isFoxProvider(windowProvider)) {
    return windowProvider;
  }

  const candidates = [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider,
    adapter?.connector?.wallet,
    typeof appkit?.getWalletProvider === 'function' ? appkit.getWalletProvider() : null
  ].filter(Boolean);

  for (const provider of candidates) {
    if (provider === windowProvider || isFoxProvider(provider)) {
      return provider;
    }
  }

  return windowProvider || null;
}

function extractFoxAddress(payload, provider = null) {
  const candidates = [
    payload,
    payload?.data,
    payload?.result,
    payload?.object,
    payload?.object?.address,
    payload?.data?.address,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58,
    provider?.address,
    provider?.selectedAddress
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      const first = candidate[0] || null;
      if (isUsableAddress(first)) {
        return first;
      }
    }

    if (typeof candidate === 'string' && isUsableAddress(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function tryFoxRequest(provider, method, params = []) {
  if (!provider) {
    return null;
  }

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({ method, params });
    } catch (_) {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch (_) {}
  }

  return null;
}

async function requestFoxAddress(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryFoxRequest(provider, method, params || []);
    const address = extractFoxAddress(result, provider);

    if (isUsableAddress(address)) {
      return address;
    }
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

async function waitForFoxProvider(appkit, adapter, options = {}) {
  const {
    attempts = 18,
    intervalMs = 180
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider(appkit, adapter);

    if (provider && isFoxProvider(provider)) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider(appkit, adapter);
}

async function waitForFoxAddress(adapter, provider, options = {}) {
  const {
    attempts = 24,
    intervalMs = 180,
    requestAccountAt = [0, 1, 2, 4, 8, 12, 16, 20]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress =
      resolveAddress(adapter, provider) ||
      extractFoxAddress(null, provider);

    if (isUsableAddress(directAddress)) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAccountAt.includes(i)) {
      const requestedAddress = await requestFoxAddress(provider);

      if (isUsableAddress(requestedAddress)) {
        await forceBindTronWeb(provider, requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(intervalMs);
  }

  return null;
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

export const foxWalletDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle(appkit) {
    return isFoxWalletBrowser() || !!getResolvedProvider(appkit, this.getAdapter(appkit));
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

    return (
      resolveAddress(adapter, provider) ||
      extractFoxAddress(null, provider)
    );
  },

  async connect(appkit) {
    const adapter = this.getAdapter(appkit);

    if (adapter) {
      try {
        await connectAdapter(adapter);
      } catch (_) {}
    }

    const provider = await waitForFoxProvider(appkit, adapter);

    if (!provider) {
      throw new Error('FoxWallet provider not found');
    }

    const address = await waitForFoxAddress(adapter, provider, {
      attempts: isFoxWalletBrowser() ? 24 : 20,
      intervalMs: 180,
      requestAccountAt: isFoxWalletBrowser() ? [0, 1, 2, 4, 8, 12, 16, 20] : [0, 2, 4, 8, 12, 16]
    });

    if (!isUsableAddress(address)) {
      throw new Error('FoxWallet address not resolved');
    }

    await forceBindTronWeb(provider, address);

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb: provider?.tronWeb || provider || null,
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
      throw new Error('FoxWallet balances: invalid address');
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
      subscribe(win?.foxwallet, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.foxwallet, 'disconnect', handlers.onDisconnect),
      subscribe(win?.foxwallet, 'connect', handlers.onConnect),
      subscribe(win?.foxwallet?.tronLink, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.foxwallet?.tronLink, 'disconnect', handlers.onDisconnect),
      subscribe(win?.foxwallet?.tronLink, 'connect', handlers.onConnect)
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

export function createFoxWalletDriver() {
  return foxWalletDriver;
}
