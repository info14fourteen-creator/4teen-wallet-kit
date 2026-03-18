import { isUsableAddress } from '../../shared/addressResolver.js';
import { forceBindTronWeb } from '../../shared/accountRequests.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'imtoken';
const DRIVER_NAME = 'imToken';
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
    id === 'imtoken' ||
    id === 'im token' ||
    name === 'imtoken' ||
    name === 'im token'
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

function getImTokenWindowProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  return win.tronweb || win.tronWeb || null;
}

function isImTokenBrowser() {
  const win = getWindowSafe();
  if (!win) return false;

  const ua = String(win.navigator?.userAgent || '').toLowerCase();
  const href = String(win.location?.href || '').toLowerCase();

  return (
    href.includes('utm_source=imtoken') ||
    ua.includes('imtoken') ||
    !!win.tronweb
  );
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider() {
  return getImTokenWindowProvider();
}

async function tryImTokenRequest(provider, method, params = []) {
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

function extractImTokenAddress(payload, provider = null) {
  const candidates = [
    payload,
    payload?.data,
    payload?.result,
    payload?.object,
    provider?.defaultAddress?.base58,
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

async function requestImTokenAddress(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryImTokenRequest(provider, method, params || []);
    const address = extractImTokenAddress(result, provider);

    if (isUsableAddress(address)) {
      return address;
    }
  }

  return null;
}

async function waitForImTokenProvider(options = {}) {
  const {
    attempts = 20,
    intervalMs = 180
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider();

    if (provider) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider();
}

async function waitForImTokenAddress(provider, options = {}) {
  const {
    attempts = 24,
    intervalMs = 180,
    requestAccountAt = [0, 1, 2, 4, 8, 12, 16, 20]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = extractImTokenAddress(null, provider);

    if (isUsableAddress(directAddress)) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAccountAt.includes(i)) {
      const requestedAddress = await requestImTokenAddress(provider);

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

export const imTokenDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle() {
    return isImTokenBrowser() || !!getResolvedProvider();
  },

  getAdapter(appkit) {
    return getCandidateAdapter(appkit);
  },

  getProvider() {
    return getResolvedProvider();
  },

  getAddress() {
    const provider = this.getProvider();
    return extractImTokenAddress(null, provider);
  },

  async connect() {
    const provider = await waitForImTokenProvider({
      attempts: isImTokenBrowser() ? 24 : 18,
      intervalMs: 180
    });

    if (!provider) {
      throw new Error('imToken provider not found');
    }

    const address = await waitForImTokenAddress(provider, {
      attempts: isImTokenBrowser() ? 24 : 20,
      intervalMs: 180,
      requestAccountAt: isImTokenBrowser() ? [0, 1, 2, 4, 8, 12, 16, 20] : [0, 2, 4, 8, 12, 16]
    });

    if (!isUsableAddress(address)) {
      throw new Error('imToken address not resolved');
    }

    await forceBindTronWeb(provider, address);

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb: provider,
      adapter: null
    };
  },

  async disconnect() {
    return { ok: true };
  },

  async readBalances(appkit, options = {}) {
    const address = options.address || this.getAddress(appkit);

    if (!isUsableAddress(address)) {
      throw new Error('imToken balances: invalid address');
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

  getSigningState() {
    const provider = this.getProvider();
    return getSigningCapabilities(provider);
  },

  async assertSigningReady() {
    const signing = this.getSigningState();

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
    const provider = this.getProvider();
    const win = getWindowSafe();

    const unsubs = [
      subscribe(adapter, 'connect', handlers.onConnect),
      subscribe(adapter, 'disconnect', handlers.onDisconnect),
      subscribe(adapter, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(adapter, 'readyStateChanged', handlers.onReadyStateChanged),
      subscribe(provider, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(provider, 'disconnect', handlers.onDisconnect),
      subscribe(provider, 'connect', handlers.onConnect),
      subscribe(win?.tronweb, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.tronweb, 'disconnect', handlers.onDisconnect),
      subscribe(win?.tronweb, 'connect', handlers.onConnect),
      subscribe(win?.tronWeb, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.tronWeb, 'disconnect', handlers.onDisconnect),
      subscribe(win?.tronWeb, 'connect', handlers.onConnect)
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

export function createImTokenDriver() {
  return imTokenDriver;
}
