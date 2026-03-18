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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * IMPORTANT:
 * WalletConnect provider will come from adapter
 * (AppKit / WalletConnect SDK layer)
 */

function getAdapter(appkit) {
  if (!appkit) return null;

  if (typeof appkit.getConnectors === 'function') {
    const connectors = appkit.getConnectors();
    return connectors?.find(
      (c) =>
        String(c?.id || c?.name || '')
          .toLowerCase()
          .includes('walletconnect')
    );
  }

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters.find((a) =>
      String(a?.id || a?.name || '')
        .toLowerCase()
        .includes('walletconnect')
    );
  }

  return null;
}

async function connectAdapter(adapter) {
  if (!adapter?.connect) return;

  try {
    await adapter.connect();
  } catch (error) {
    const msg = String(error?.message || '').toLowerCase();

    if (
      msg.includes('already connected') ||
      msg.includes('session currently connected')
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

function getSigningCapabilities(provider) {
  const tronWeb = provider?.tronWeb || provider || null;

  return {
    hasProviderRequest: typeof provider?.request === 'function',
    hasProviderSend: typeof provider?.send === 'function',
    hasTronWebSign: typeof tronWeb?.trx?.sign === 'function',
    hasTransactionBuilder:
      typeof tronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof tronWeb?.address?.toHex === 'function',
    canSign: !!(
      typeof provider?.request === 'function' ||
      typeof provider?.send === 'function' ||
      typeof tronWeb?.trx?.sign === 'function'
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
  const address = resolveAddress(adapter, provider);

  if (isUsableAddress(address)) {
    return address;
  }

  return null;
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

    return resolveAddress(adapter, provider);
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

    if (!isUsableAddress(address)) {
      throw new Error('WalletConnect address not resolved');
    }

    await forceBindTronWeb(provider, address);

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider,
      tronWeb: provider?.tronWeb || provider || null,
      adapter
    };
  },

  async disconnect(appkit) {
    const adapter = this.getAdapter(appkit);

    const targets = [
      adapter,
      adapter?.connector,
      adapter?.provider
    ].filter(Boolean);

    for (const target of targets) {
      if (typeof target?.disconnect === 'function') {
        try {
          await target.disconnect();
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
    const provider = this.getProvider(appkit);
    return getSigningCapabilities(provider);
  },

  async assertSigningReady(appkit) {
    const signing = this.getSigningState(appkit);

    if (!signing.canSign) {
      throw new Error('WalletConnect signing not available');
    }

    return {
      ok: true,
      ...signing
    };
  },

  subscribe(appkit, handlers = {}) {
    const provider = this.getProvider(appkit);

    if (!provider || typeof provider.on !== 'function') {
      return () => {};
    }

    const events = [
      ['accountsChanged', handlers.onAccountsChanged],
      ['disconnect', handlers.onDisconnect],
      ['connect', handlers.onConnect]
    ];

    const unsubs = events.map(([event, handler]) => {
      if (!handler) return () => {};

      try {
        provider.on(event, handler);
      } catch (_) {}

      return () => {
        try {
          provider.off?.(event, handler);
        } catch (_) {}
      };
    });

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
