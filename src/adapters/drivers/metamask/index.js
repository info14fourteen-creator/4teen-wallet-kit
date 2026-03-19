import { TronWeb } from 'tronweb';
import { isMetaMaskBrowser } from '../../shared/browserDetection.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress,
  tryRequestAccounts
} from '../../shared/accountRequests.js';
import { pickBestProvider } from '../../shared/providerResolver.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'metamask';
const DRIVER_NAME = 'MetaMask';
const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const TRONGRID_FULL_HOST = 'https://api.trongrid.io';

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
    id === 'metamask' ||
    id === 'meta mask' ||
    name === 'metamask' ||
    name === 'meta mask'
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

function hasNativeTronSigningCapability(target) {
  const tronWeb = target?.tronWeb || target || null;

  return !!(
    typeof tronWeb?.trx?.sign === 'function' &&
    typeof tronWeb?.address?.toHex === 'function' &&
    (
      typeof tronWeb?.transactionBuilder?.triggerSmartContract === 'function' ||
      typeof tronWeb?.transactionBuilder?.sendTrx === 'function'
    )
  );
}

function hasAdapterSigningCapability(adapter) {
  return typeof adapter?.signTransaction === 'function';
}

function getAdapterAddress(adapter) {
  return (
    adapter?.address ||
    adapter?.adapter?.address ||
    null
  );
}

function getProviderSignerAddress(provider) {
  return (
    provider?.tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.address ||
    provider?.selectedAddress ||
    null
  );
}

function getInjectedMetaMaskProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  if (hasNativeTronSigningCapability(win.ethereum?.tronWeb)) {
    return win.ethereum.tronWeb;
  }

  if (hasNativeTronSigningCapability(win.ethereum)) {
    return win.ethereum;
  }

  return null;
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  if (adapter) {
    const picked = pickBestProvider(appkit, adapter, DRIVER_NAME);
    if (picked) {
      return picked;
    }
  }

  const injected = getInjectedMetaMaskProvider();
  if (injected) return injected;

  const candidates = [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider,
    adapter?.connector?.wallet,
    typeof appkit?.getWalletProvider === 'function' ? appkit.getWalletProvider() : null
  ].filter(Boolean);

  return candidates.find(hasNativeTronSigningCapability) || candidates[0] || null;
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

function getSigningCapabilities(adapter, provider, tronWeb = null) {
  const resolvedTronWeb = tronWeb || provider?.tronWeb || provider || null;

  const hasAdapterSignTransaction = hasAdapterSigningCapability(adapter);
  const hasTronWebSign = typeof resolvedTronWeb?.trx?.sign === 'function';
  const hasTransactionBuilder =
    typeof resolvedTronWeb?.transactionBuilder?.triggerSmartContract === 'function' ||
    typeof resolvedTronWeb?.transactionBuilder?.sendTrx === 'function';
  const hasAddressToHex = typeof resolvedTronWeb?.address?.toHex === 'function';

  return {
    hasAdapterSignTransaction,
    hasProviderRequest: typeof provider?.request === 'function',
    hasProviderSend: typeof provider?.send === 'function',
    hasProviderSign: typeof provider?.sign === 'function',
    hasTronWebSign,
    hasTransactionBuilder,
    hasAddressToHex,
    canSign: !!(
      hasAdapterSignTransaction ||
      (hasTronWebSign && hasTransactionBuilder && hasAddressToHex)
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

async function readAddressFromProvider(provider) {
  if (!provider) {
    return null;
  }

  try {
    const result = await tryRequestAccounts(provider);

    if (isUsableAddress(result)) {
      return result;
    }
  } catch (_) {}

  return (
    getProviderSignerAddress(provider) ||
    getWindowSafe()?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function createAdapterBoundTronWeb(adapter, provider, address) {
  const tronWeb = new TronWeb({
    fullHost: TRONGRID_FULL_HOST
  });

  const originalSendRawTransaction = tronWeb.trx.sendRawTransaction.bind(tronWeb.trx);

  tronWeb.setPrivateKey = () => {};

  tronWeb.trx.sign = async (transaction) => {
    if (typeof adapter?.signTransaction === 'function') {
      return adapter.signTransaction(transaction);
    }

    if (provider?.trx?.sign) {
      return provider.trx.sign(transaction);
    }

    if (provider?.tronWeb?.trx?.sign) {
      return provider.tronWeb.trx.sign(transaction);
    }

    throw new Error('MetaMask TRON signing is not available');
  };

  tronWeb.trx.sendRawTransaction = async (signedTransaction) => {
    return originalSendRawTransaction(signedTransaction);
  };

  if (isUsableAddress(address)) {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}

    try {
      tronWeb.defaultAddress = {
        ...tronWeb.defaultAddress,
        base58: address,
        hex: tronWeb.address.toHex(address)
      };
    } catch (_) {}
  }

  return tronWeb;
}

async function ensureMetaMaskSession(adapter, provider) {
  const adapterAddress = getAdapterAddress(adapter);

  if (isUsableAddress(adapterAddress)) {
    return adapterAddress;
  }

  const signerAddress = getProviderSignerAddress(provider);

  if (isUsableAddress(signerAddress)) {
    return signerAddress;
  }

  const directAddress = resolveAddress(adapter, provider);

  if (isUsableAddress(directAddress)) {
    return directAddress;
  }

  const providerAddress = await readAddressFromProvider(provider);

  if (isUsableAddress(providerAddress)) {
    return providerAddress;
  }

  const requestedAddress = await tryRequestAccounts(provider);

  if (isUsableAddress(requestedAddress)) {
    return requestedAddress;
  }

  return null;
}

async function waitForMetaMaskProvider(appkit, adapter, options = {}) {
  const {
    attempts = 12,
    intervalMs = 120
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider(appkit, adapter);
    const address =
      getAdapterAddress(adapter) ||
      getProviderSignerAddress(provider) ||
      resolveAddress(adapter, provider);

    if (
      provider &&
      (
        address ||
        hasAdapterSigningCapability(adapter) ||
        hasNativeTronSigningCapability(provider) ||
        hasNativeTronSigningCapability(provider?.tronWeb)
      )
    ) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider(appkit, adapter);
}

export const metaMaskDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle(appkit) {
    return !!getResolvedProvider(appkit, this.getAdapter(appkit)) || isMetaMaskBrowser();
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
      getAdapterAddress(adapter) ||
      getProviderSignerAddress(provider) ||
      resolveAddress(adapter, provider)
    );
  },

  async connect(appkit) {
    const adapter = this.getAdapter(appkit);

    if (adapter) {
      await connectAdapter(adapter);
    }

    let provider = await waitForMetaMaskProvider(appkit, adapter);
    provider = getResolvedProvider(appkit, adapter) || provider;

    let address = await ensureMetaMaskSession(adapter, provider);

    provider = await waitForMetaMaskProvider(appkit, adapter);
    provider = getResolvedProvider(appkit, adapter) || provider;

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 16,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    const adapterAddress = getAdapterAddress(adapter);
    const signerAddress = getProviderSignerAddress(provider);

    if (isUsableAddress(adapterAddress)) {
      address = adapterAddress;
    } else if (isUsableAddress(signerAddress)) {
      address = signerAddress;
    }

    if (!isUsableAddress(address)) {
      throw new Error('MetaMask address not resolved');
    }

    const directSigningTronWeb =
      hasNativeTronSigningCapability(provider?.tronWeb) ? provider.tronWeb :
      hasNativeTronSigningCapability(provider) ? provider :
      null;

    const tronWeb =
      directSigningTronWeb ||
      createAdapterBoundTronWeb(adapter, provider, address);

    await forceBindTronWeb(tronWeb, address);

    if (tronWeb && typeof tronWeb.setAddress === 'function') {
      try {
        tronWeb.setAddress(address);
      } catch (_) {}
    }

    try {
      if (tronWeb?.defaultAddress && typeof tronWeb.address?.toHex === 'function') {
        tronWeb.defaultAddress = {
          ...tronWeb.defaultAddress,
          base58: address,
          hex: tronWeb.address.toHex(address)
        };
      }
    } catch (_) {}

    const signing = getSigningCapabilities(adapter, provider, tronWeb);

    if (!signing.canSign) {
      throw new Error('MetaMask does not provide TRON signing in this environment');
    }

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb,
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
      throw new Error('MetaMask balances: invalid address');
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
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);
    const address = this.getAddress(appkit);

    const tronWeb =
      hasNativeTronSigningCapability(provider?.tronWeb) ? provider.tronWeb :
      hasNativeTronSigningCapability(provider) ? provider :
      createAdapterBoundTronWeb(adapter, provider, address);

    return getSigningCapabilities(adapter, provider, tronWeb);
  },

  async assertSigningReady(appkit) {
    const signing = this.getSigningState(appkit);

    if (!signing.canSign) {
      throw new Error('MetaMask does not provide TRON signing in this environment');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('MetaMask transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('MetaMask address codec is not available');
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
      subscribe(win?.ethereum, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.ethereum, 'disconnect', handlers.onDisconnect),
      subscribe(win?.ethereum, 'connect', handlers.onConnect)
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

export function createMetaMaskDriver() {
  return metaMaskDriver;
}
