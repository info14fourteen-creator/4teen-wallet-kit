import { isUsableAddress } from '../../shared/addressResolver.js';
import { forceBindTronWeb } from '../../shared/accountRequests.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'foxwallet';
const DRIVER_NAME = 'FoxWallet';
const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';

let connectPromise = null;
let lastConnectedAddress = null;
let lastConnectedAt = 0;

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

function getInjectedFoxWalletContainer() {
  const win = getWindowSafe();
  return win?.foxwallet || null;
}

function getInjectedFoxWalletProvider() {
  const win = getWindowSafe();
  return win?.foxwallet?.tronLink || null;
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
    !!win?.foxwallet?.tronLink ||
    !!win?.foxwallet
  );
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedFoxWalletProvider();
  if (injected) {
    return injected;
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

  return candidates[0] || null;
}

function extractFoxWalletAddress(value) {
  if (!value) return null;

  if (typeof value === 'string' && isUsableAddress(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = extractFoxWalletAddress(item);
      if (nested) return nested;
    }

    return null;
  }

  if (typeof value === 'object') {
    return (
      extractFoxWalletAddress(value.address) ||
      extractFoxWalletAddress(value.selectedAddress) ||
      extractFoxWalletAddress(value.publicKey) ||
      extractFoxWalletAddress(value.data) ||
      extractFoxWalletAddress(value.result) ||
      extractFoxWalletAddress(value.accounts) ||
      extractFoxWalletAddress(value.account) ||
      extractFoxWalletAddress(value.object) ||
      extractFoxWalletAddress(value.object?.address) ||
      extractFoxWalletAddress(value.payload) ||
      extractFoxWalletAddress(value.defaultAddress?.base58) ||
      extractFoxWalletAddress(value.tronWeb?.defaultAddress?.base58) ||
      null
    );
  }

  return null;
}

async function tryProviderRequest(provider, method, params = []) {
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

async function requestFoxWalletAccounts(provider) {
  const result = await tryProviderRequest(provider, 'tron_requestAccounts', []);
  return extractFoxWalletAddress(result);
}

async function connectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    return null;
  }

  try {
    return await adapter.connect();
  } catch (error) {
    const message = String(error?.message || '').toLowerCase();

    if (
      message.includes('already connected') ||
      message.includes('session currently connected') ||
      message.includes('connection already open') ||
      message.includes('wallet not found') ||
      message.includes('not ready')
    ) {
      return null;
    }

    return null;
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

async function waitForFoxWalletProvider(appkit, adapter, options = {}) {
  const {
    attempts = 16,
    intervalMs = 180
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider(appkit, adapter);

    if (provider?.ready) {
      return provider;
    }

    if (provider) {
      await sleep(intervalMs);
      if (provider?.ready) {
        return provider;
      }
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider(appkit, adapter);
}

function getDirectConnectedAddress(provider) {
  return (
    extractFoxWalletAddress(provider?.tronWeb?.defaultAddress?.base58) ||
    extractFoxWalletAddress(provider?.defaultAddress?.base58) ||
    extractFoxWalletAddress(provider)
  );
}

async function waitForFoxWalletAddress(provider, options = {}) {
  const {
    attempts = 12,
    intervalMs = 180,
    requestAccountAt = [0, 2, 4, 8]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = getDirectConnectedAddress(provider);

    if (isUsableAddress(directAddress)) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAccountAt.includes(i)) {
      const requestedAddress = await requestFoxWalletAccounts(provider);

      if (isUsableAddress(requestedAddress)) {
        await forceBindTronWeb(provider, requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(intervalMs);
  }

  return null;
}

function getFoxWalletActiveProvider(appkit, adapter = null) {
  return getResolvedProvider(appkit, adapter) || getInjectedFoxWalletProvider();
}

async function readFoxWalletTrxBalance(appkit, adapter, address) {
  const provider = getFoxWalletActiveProvider(appkit, adapter);

  try {
    if (typeof provider?.tronWeb?.getBalance === 'function') {
      const balanceSun = await provider.tronWeb.getBalance(address);
      const value = Number((Number(balanceSun || 0) / 1_000_000).toFixed(6));

      if (Number.isFinite(value)) {
        return {
          ok: true,
          value,
          source: 'foxwallet_provider'
        };
      }
    }
  } catch (_) {}

  try {
    if (typeof provider?.tronWeb?.trx?.getBalance === 'function') {
      const balanceSun = await provider.tronWeb.trx.getBalance(address);
      const value = Number((Number(balanceSun || 0) / 1_000_000).toFixed(6));

      if (Number.isFinite(value)) {
        return {
          ok: true,
          value,
          source: 'foxwallet_tronweb'
        };
      }
    }
  } catch (_) {}

  return {
    ok: false,
    value: null,
    source: 'foxwallet_balance_unavailable'
  };
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
    const provider = getFoxWalletActiveProvider(appkit, this.getAdapter(appkit));
    return getDirectConnectedAddress(provider);
  },

  async connect(appkit) {
    if (connectPromise) {
      return connectPromise;
    }

    connectPromise = (async () => {
      const adapter = this.getAdapter(appkit);
      await connectAdapter(adapter);

      const provider = await waitForFoxWalletProvider(appkit, adapter, {
        attempts: isFoxWalletBrowser() ? 20 : 16,
        intervalMs: 180
      });

      const container = getInjectedFoxWalletContainer();

      if (!provider && !container) {
        throw new Error('FoxWallet provider not found');
      }

      const activeProvider = provider || container?.tronLink || container;

      if (!activeProvider?.ready) {
        throw new Error('FoxWallet provider is not ready');
      }

      const alreadyConnectedAddress = getDirectConnectedAddress(activeProvider);
      const now = Date.now();

      if (
        isUsableAddress(alreadyConnectedAddress) &&
        lastConnectedAddress === alreadyConnectedAddress &&
        now - lastConnectedAt < 10000
      ) {
        await forceBindTronWeb(activeProvider, alreadyConnectedAddress);

        return {
          ok: true,
          walletId: DRIVER_NAME,
          walletName: DRIVER_NAME,
          address: alreadyConnectedAddress,
          provider: activeProvider,
          tronWeb: activeProvider?.tronWeb || activeProvider || null,
          adapter: adapter || null
        };
      }

      const address = isUsableAddress(alreadyConnectedAddress)
        ? alreadyConnectedAddress
        : await waitForFoxWalletAddress(activeProvider, {
            attempts: isFoxWalletBrowser() ? 12 : 10,
            intervalMs: 180,
            requestAccountAt: [0, 2, 4, 8]
          });

      if (!isUsableAddress(address)) {
        throw new Error('FoxWallet address not resolved');
      }

      await forceBindTronWeb(activeProvider, address);

      lastConnectedAddress = address;
      lastConnectedAt = Date.now();

      return {
        ok: true,
        walletId: DRIVER_NAME,
        walletName: DRIVER_NAME,
        address,
        provider: activeProvider,
        tronWeb: activeProvider?.tronWeb || activeProvider || null,
        adapter: adapter || null
      };
    })();

    try {
      return await connectPromise;
    } finally {
      connectPromise = null;
    }
  },

  async disconnect(appkit) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    lastConnectedAddress = null;
    lastConnectedAt = 0;

    await disconnectAdapter(adapter, provider);

    return { ok: true };
  },

  async readBalances(appkit, options = {}) {
    const adapter = this.getAdapter(appkit);
    const address = options.address || this.getAddress(appkit);

    if (!isUsableAddress(address)) {
      throw new Error('FoxWallet balances: invalid address');
    }

    const trxResult = await readFoxWalletTrxBalance(appkit, adapter, address);
    const trxBalance = trxResult.ok ? trxResult.value : await readTrxBalance(address);

    const tokenResult = await safeReadTokenBalance(
      address,
      options.tokenAddress || FOURTEEN_TOKEN_ADDRESS
    );

    return {
      ok: trxBalance !== null && tokenResult.ok,
      address,
      trxBalance,
      tokenBalance: tokenResult.value,
      trxSource: trxResult.ok ? trxResult.source : 'readonly_fallback',
      tokenSource: tokenResult.source || null,
      tokenError: tokenResult.error?.message || null
    };
  },

  getSigningState(appkit) {
    const provider = getFoxWalletActiveProvider(appkit, this.getAdapter(appkit));
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
    const provider = getFoxWalletActiveProvider(appkit, adapter);
    const container = getInjectedFoxWalletContainer();

    const unsubs = [
      subscribe(adapter, 'connect', handlers.onConnect),
      subscribe(adapter, 'disconnect', handlers.onDisconnect),
      subscribe(adapter, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(adapter, 'readyStateChanged', handlers.onReadyStateChanged),
      subscribe(provider, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(provider, 'disconnect', handlers.onDisconnect),
      subscribe(provider, 'connect', handlers.onConnect),
      subscribe(container, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(container, 'disconnect', handlers.onDisconnect),
      subscribe(container, 'connect', handlers.onConnect),
      subscribe(container?.tronLink, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(container?.tronLink, 'disconnect', handlers.onDisconnect),
      subscribe(container?.tronLink, 'connect', handlers.onConnect)
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
