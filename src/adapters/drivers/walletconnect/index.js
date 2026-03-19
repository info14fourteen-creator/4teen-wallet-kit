import { TronWeb } from 'tronweb';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress
} from '../../shared/accountRequests.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'walletconnect';
const DRIVER_NAME = 'WalletConnect';
const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const TRONGRID_FULL_HOST = 'https://api.trongrid.io';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAdapter(appkit) {
  if (!appkit) return null;

  if (typeof appkit.getConnectors === 'function') {
    const connectors = appkit.getConnectors();
    return connectors?.find((c) =>
      String(c?.id || c?.name || '')
        .toLowerCase()
        .includes('walletconnect')
    ) || null;
  }

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters.find((a) =>
      String(a?.id || a?.name || '')
        .toLowerCase()
        .includes('walletconnect')
    ) || null;
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors.find((c) =>
      String(c?.id || c?.name || '')
        .toLowerCase()
        .includes('walletconnect')
    ) || null;
  }

  return null;
}

function getAdapterAddress(adapter) {
  return (
    adapter?.address ||
    adapter?.adapter?.address ||
    null
  );
}

async function connectAdapter(adapter) {
  if (!adapter?.connect) return;

  try {
    await adapter.connect();
  } catch (error) {
    const msg = String(error?.message || '').toLowerCase();

    if (
      msg.includes('already connected') ||
      msg.includes('session currently connected') ||
      msg.includes('connection already open')
    ) {
      return;
    }

    throw error;
  }
}

function getProvider(adapter) {
  return (
    adapter?.provider ||
    adapter?.walletProvider ||
    adapter?.connector?.provider ||
    null
  );
}

function getProviderAddress(provider) {
  return (
    provider?.tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.address ||
    provider?.selectedAddress ||
    null
  );
}

function hasAdapterSigningCapability(adapter) {
  return typeof adapter?.signTransaction === 'function';
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

function getSigningCapabilities(adapter, provider, tronWeb = null) {
  const resolvedTronWeb = tronWeb || provider?.tronWeb || provider || null;

  const hasAdapterSignTransaction = hasAdapterSigningCapability(adapter);
  const hasProviderRequest = typeof provider?.request === 'function';
  const hasProviderSend = typeof provider?.send === 'function';
  const hasTronWebSign = typeof resolvedTronWeb?.trx?.sign === 'function';
  const hasTransactionBuilder =
    typeof resolvedTronWeb?.transactionBuilder?.triggerSmartContract === 'function' ||
    typeof resolvedTronWeb?.transactionBuilder?.sendTrx === 'function';
  const hasAddressToHex = typeof resolvedTronWeb?.address?.toHex === 'function';

  return {
    hasAdapterSignTransaction,
    hasProviderRequest,
    hasProviderSend,
    hasTronWebSign,
    hasTransactionBuilder,
    hasAddressToHex,
    canSign: !!(
      hasAdapterSignTransaction ||
      (hasTronWebSign && hasTransactionBuilder && hasAddressToHex)
    )
  };
}

async function waitForProvider(adapter, options = {}) {
  const { attempts = 20, intervalMs = 150 } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getProvider(adapter);

    if (provider) return provider;

    await sleep(intervalMs);
  }

  return getProvider(adapter);
}

async function ensureSession(adapter, provider) {
  const adapterAddress = getAdapterAddress(adapter);

  if (isUsableAddress(adapterAddress)) {
    return adapterAddress;
  }

  const providerAddress = getProviderAddress(provider);

  if (isUsableAddress(providerAddress)) {
    return providerAddress;
  }

  const resolved = resolveAddress(adapter, provider);

  if (isUsableAddress(resolved)) {
    return resolved;
  }

  return null;
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

    throw new Error('WalletConnect signing is not available');
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

export const walletConnectDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'walletconnect',

  canHandle(appkit) {
    return !!getAdapter(appkit);
  },

  getAdapter(appkit) {
    return getAdapter(appkit);
  },

  getProvider(appkit) {
    const adapter = this.getAdapter(appkit);
    return getProvider(adapter);
  },

  getAddress(appkit) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    return (
      getAdapterAddress(adapter) ||
      getProviderAddress(provider) ||
      resolveAddress(adapter, provider)
    );
  },

  async connect(appkit) {
    const adapter = this.getAdapter(appkit);

    if (!adapter) {
      throw new Error('WalletConnect adapter not found');
    }

    await connectAdapter(adapter);

    let provider = await waitForProvider(adapter);
    let address = await ensureSession(adapter, provider);

    provider = await waitForProvider(adapter);

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 20,
        intervalMs: 200
      });
    }

    const adapterAddress = getAdapterAddress(adapter);
    const providerAddress = getProviderAddress(provider);

    if (isUsableAddress(adapterAddress)) {
      address = adapterAddress;
    } else if (isUsableAddress(providerAddress)) {
      address = providerAddress;
    }

    if (!isUsableAddress(address)) {
      throw new Error('WalletConnect address not resolved');
    }

    const nativeTronWeb =
      hasNativeTronSigningCapability(provider?.tronWeb) ? provider.tronWeb :
      hasNativeTronSigningCapability(provider) ? provider :
      null;

    const tronWeb =
      nativeTronWeb ||
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
      throw new Error('WalletConnect signing is not available');
    }

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb,
      adapter
    };
  },

  async disconnect(appkit) {
    const adapter = this.getAdapter(appkit);

    const targets = [
      adapter,
      adapter?.connector,
      adapter?.provider,
      adapter?.walletProvider,
      adapter?.connector?.provider
    ].filter(Boolean);

    for (const target of targets) {
      if (typeof target?.disconnect === 'function') {
        try {
          await target.disconnect();
        } catch (_) {}
      }

      if (typeof target?.close === 'function') {
        try {
          await target.close();
        } catch (_) {}
      }
    }

    return { ok: true };
  },

  async readBalances(appkit, options = {}) {
    const address = options.address || this.getAddress(appkit);

    if (!isUsableAddress(address)) {
      throw new Error('WalletConnect balances: invalid address');
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
      throw new Error('WalletConnect signing not available');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('WalletConnect transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('WalletConnect address codec is not available');
    }

    return {
      ok: true,
      ...signing
    };
  },

  subscribe(appkit, handlers = {}) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);

    const unsubs = [
      subscribe(adapter, 'connect', handlers.onConnect),
      subscribe(adapter, 'disconnect', handlers.onDisconnect),
      subscribe(adapter, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(adapter, 'readyStateChanged', handlers.onReadyStateChanged),
      subscribe(provider, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(provider, 'disconnect', handlers.onDisconnect),
      subscribe(provider, 'connect', handlers.onConnect)
    ];

    return () => {
      unsubs.forEach((u) => {
        try {
          u();
        } catch (_) {}
      });
    };
  }
};

export function createWalletConnectDriver() {
  return walletConnectDriver;
}
