function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
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

function getTrustWindowProvider() {
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

function isTrustWalletBrowser() {
  const win = getWindowSafe();
  if (!win) return false;

  const href = String(win.location?.href || '').toLowerCase();
  const ua = String(win.navigator?.userAgent || '').toLowerCase();

  return !!(
    getTrustWindowProvider() ||
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet')
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

function getAdapterScopedTrustProvider(appkit, adapter = null) {
  const strictWindowProvider = getTrustWindowProvider();

  if (strictWindowProvider && isTrustProvider(strictWindowProvider)) {
    return strictWindowProvider;
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
    if (isTrustProvider(provider)) {
      return provider;
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

function normalizeAccountsPayload(accounts) {
  if (Array.isArray(accounts)) {
    return accounts[0] || null;
  }

  if (typeof accounts === 'string') {
    return accounts || null;
  }

  if (accounts && typeof accounts === 'object') {
    if (Array.isArray(accounts.result)) return accounts.result[0] || null;
    if (Array.isArray(accounts.accounts)) return accounts.accounts[0] || null;
    if (typeof accounts.address === 'string') return accounts.address;
    if (typeof accounts.selectedAddress === 'string') return accounts.selectedAddress;
    if (typeof accounts.result?.address === 'string') return accounts.result.address;
    if (typeof accounts.data?.address === 'string') return accounts.data.address;
  }

  return null;
}

async function tryRequestTrustAddress(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null],
    ['eth_requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = normalizeAccountsPayload(result);

    if (isUsableAddress(address)) {
      return address;
    }
  }

  return null;
}

async function forceBindTronWeb(provider, address) {
  if (!provider || !address) {
    return;
  }

  try {
    if (typeof provider.setAddress === 'function') {
      provider.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb && typeof provider.tronWeb.setAddress === 'function') {
      provider.tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    if (provider?.defaultAddress && typeof provider.defaultAddress === 'object') {
      provider.defaultAddress.base58 = address;
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb?.defaultAddress && typeof provider.tronWeb.defaultAddress === 'object') {
      provider.tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}
}

async function waitForTrustAddress(adapter, provider, options = {}) {
  const {
    attempts = 20,
    intervalMs = 180,
    requestAt = [0, 1, 2, 4, 8, 12, 16]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const address =
      provider?.address ||
      provider?.selectedAddress ||
      provider?.defaultAddress?.base58 ||
      provider?.tronWeb?.defaultAddress?.base58 ||
      adapter?.address ||
      adapter?.publicKey ||
      null;

    if (isUsableAddress(address)) {
      await forceBindTronWeb(provider, address);
      return address;
    }

    if (requestAt.includes(i)) {
      const requestedAddress = await tryRequestTrustAddress(provider);

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

const DRIVER_ID = 'trust';
const DRIVER_NAME = 'Trust Wallet';
const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';

export const trustDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle(appkit) {
    return isTrustWalletBrowser() || !!getAdapterScopedTrustProvider(appkit, this.getAdapter(appkit));
  },

  getAdapter(appkit) {
    return getCandidateAdapter(appkit);
  },

  getProvider(appkit) {
    const adapter = this.getAdapter(appkit);
    return getAdapterScopedTrustProvider(appkit, adapter);
  },

  getAddress(appkit) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    return (
      resolveAddress(adapter, provider) ||
      provider?.address ||
      provider?.selectedAddress ||
      provider?.defaultAddress?.base58 ||
      provider?.tronWeb?.defaultAddress?.base58 ||
      null
    );
  },

  async connect(appkit) {
    const adapter = this.getAdapter(appkit);

    if (!adapter) {
      throw new Error('Trust Wallet adapter not found');
    }

    await connectAdapter(adapter);

    let provider = this.getProvider(appkit);

    if (!provider || !isTrustProvider(provider)) {
      provider = getTrustWindowProvider();
    }

    if (!provider || !isTrustProvider(provider)) {
      throw new Error('Trust Wallet provider not found');
    }

    const address = await waitForTrustAddress(adapter, provider, {
      attempts: isTrustWalletBrowser() ? 24 : 18,
      intervalMs: 180,
      requestAt: isTrustWalletBrowser() ? [0, 1, 2, 4, 8, 12, 16, 20] : [0, 2, 4, 8, 12]
    });

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
