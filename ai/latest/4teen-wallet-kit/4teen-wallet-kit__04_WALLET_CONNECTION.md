# 4teen-wallet-kit — WALLET CONNECTION

Generated: 2026-03-26T08:37:00.842Z
Repository: info14fourteen-creator/4teen-wallet-kit
Branch: main

## Snapshot rules

- This is a curated AI snapshot, not a full raw dump.
- Files are grouped for easier reading.
- Every file in this snapshot belongs to the repository shown above.

## Included files

- 4teen-wallet-kit :: src/adapters/createAdapters.js
- 4teen-wallet-kit :: src/adapters/drivers/binance/index.js
- 4teen-wallet-kit :: src/adapters/drivers/bitget/index.js
- 4teen-wallet-kit :: src/adapters/drivers/foxwallet/index.js
- 4teen-wallet-kit :: src/adapters/drivers/imtoken/index.js
- 4teen-wallet-kit :: src/adapters/drivers/metamask/index.js
- 4teen-wallet-kit :: src/adapters/drivers/okx/index.js
- 4teen-wallet-kit :: src/adapters/drivers/tokenpocket/index.js
- 4teen-wallet-kit :: src/adapters/drivers/tronlink/index.js
- 4teen-wallet-kit :: src/adapters/drivers/trust/index.js
- 4teen-wallet-kit :: src/adapters/drivers/walletconnect/index.js
- 4teen-wallet-kit :: src/adapters/priority.js
- 4teen-wallet-kit :: src/adapters/registry/getAvailableDrivers.js
- 4teen-wallet-kit :: src/adapters/registry/getDriverById.js
- 4teen-wallet-kit :: src/adapters/registry/getDriverMap.js
- 4teen-wallet-kit :: src/adapters/registry/pickWalletAdapter.js
- 4teen-wallet-kit :: src/adapters/registry/walletRegistry.js
- 4teen-wallet-kit :: src/adapters/shared/accountRequests.js
- 4teen-wallet-kit :: src/adapters/shared/addressResolver.js
- 4teen-wallet-kit :: src/adapters/shared/browserDetection.js
- 4teen-wallet-kit :: src/adapters/shared/createReadonlyTronWeb.js
- 4teen-wallet-kit :: src/adapters/shared/providerResolver.js
- 4teen-wallet-kit :: src/adapters/shared/signingReadiness.js
- 4teen-wallet-kit :: src/adapters/shared/tokenBalanceReader.js
- 4teen-wallet-kit :: src/adapters/shared/trxBalanceReader.js
- 4teen-wallet-kit :: src/wallet/actions/connectWallet.js
- 4teen-wallet-kit :: src/wallet/actions/disconnectWallet.js
- 4teen-wallet-kit :: src/wallet/actions/refreshWalletBalances.js
- 4teen-wallet-kit :: src/wallet/actions/restoreWalletSession.js
- 4teen-wallet-kit :: src/wallet/core/walletManager.js
- 4teen-wallet-kit :: src/wallet/runtime/bindAdapterEvents.js
- 4teen-wallet-kit :: src/wallet/runtime/buildWalletKitRuntime.js
- 4teen-wallet-kit :: src/wallet/runtime/refreshAvailableWallets.js
- 4teen-wallet-kit :: src/wallet/runtime/resolveAutoWallet.js
- 4teen-wallet-kit :: src/wallet/runtime/waitAdaptersReady.js
- 4teen-wallet-kit :: src/wallet/runtime/walletScheduler.js
- 4teen-wallet-kit :: src/wallet/services/initWalletKit.js
- 4teen-wallet-kit :: src/wallet/services/restoreSession.js
- 4teen-wallet-kit :: src/wallet/session/failWalletConnection.js
- 4teen-wallet-kit :: src/wallet/session/finalizeWalletConnection.js

---

## FILE: 4teen-wallet-kit :: src/adapters/createAdapters.js

```js
import {
  TronLinkAdapter,
  OkxWalletAdapter,
  BinanceWalletAdapter,
  TrustAdapter,
  BitKeepAdapter,
  TokenPocketAdapter,
  MetaMaskAdapter,
  WalletConnectAdapter,
  ImTokenAdapter,
  FoxWalletAdapter
} from '@tronweb3/tronwallet-adapters';

import {
  isOkxBrowser,
  isBinanceBrowser,
  isTronLinkBrowser,
  isTrustWalletBrowser,
  isMetaMaskBrowser,
  isTokenPocketBrowser,
  isBitgetBrowser,
  isImTokenBrowser,
  isFoxWalletBrowser
} from './shared/browserDetection.js';

function getPreferredInjectedOrder() {
  if (isOkxBrowser()) {
    return ['OKX Wallet', 'WalletConnect'];
  }

  if (isBinanceBrowser()) {
    return ['Binance Wallet', 'WalletConnect'];
  }

  if (isTronLinkBrowser()) {
    return ['TronLink', 'WalletConnect'];
  }

  if (isTokenPocketBrowser()) {
    return ['TokenPocket', 'WalletConnect'];
  }

  if (isBitgetBrowser()) {
    return ['Bitget Wallet', 'WalletConnect'];
  }

  if (isTrustWalletBrowser()) {
    return ['Trust', 'WalletConnect'];
  }

  if (isMetaMaskBrowser()) {
    return ['MetaMask', 'WalletConnect'];
  }

  if (isImTokenBrowser()) {
    return ['imToken', 'WalletConnect'];
  }

  if (isFoxWalletBrowser()) {
    return ['FoxWallet', 'WalletConnect'];
  }

  return [
    'TronLink',
    'OKX Wallet',
    'Binance Wallet',
    'TokenPocket',
    'Bitget Wallet',
    'Trust',
    'MetaMask',
    'imToken',
    'FoxWallet',
    'WalletConnect'
  ];
}

function createWalletConnect(projectId) {
  return new WalletConnectAdapter({
    network: 'Mainnet',
    options: {
      projectId,
      relayUrl: 'wss://relay.walletconnect.com',
      metadata: {
        name: '4TEEN',
        description: '4TEEN wallet connection',
        url: 'https://4teen.me',
        icons: ['https://4teen.me/logo.png']
      }
    }
  });
}

function createNamedAdapters(projectId) {
  const entries = [];

  try {
    entries.push({
      id: 'TronLink',
      name: 'TronLink',
      adapter: new TronLinkAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'OKX Wallet',
      name: 'OKX Wallet',
      adapter: new OkxWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'Binance Wallet',
      name: 'Binance Wallet',
      adapter: new BinanceWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'TokenPocket',
      name: 'TokenPocket',
      adapter: new TokenPocketAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'Bitget Wallet',
      name: 'Bitget Wallet',
      adapter: new BitKeepAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'Trust',
      name: 'Trust',
      adapter: new TrustAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'MetaMask',
      name: 'MetaMask',
      adapter: new MetaMaskAdapter({
        useDeeplink: true
      })
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'imToken',
      name: 'imToken',
      adapter: new ImTokenAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'FoxWallet',
      name: 'FoxWallet',
      adapter: new FoxWalletAdapter()
    });
  } catch (_) {}

  try {
    entries.push({
      id: 'WalletConnect',
      name: 'WalletConnect',
      adapter: createWalletConnect(projectId)
    });
  } catch (_) {}

  return entries;
}

function decorateAdapter(entry) {
  const adapter = entry?.adapter;

  if (!adapter) {
    return null;
  }

  try {
    if (!adapter.id) {
      adapter.id = entry.id;
    }
  } catch (_) {}

  try {
    if (!adapter.name) {
      adapter.name = entry.name;
    }
  } catch (_) {}

  return adapter;
}

export function createWalletAdapters({ projectId }) {
  const entries = createNamedAdapters(projectId);
  const order = getPreferredInjectedOrder();

  const sorted = [...entries].sort((a, b) => {
    const ai = order.indexOf(a.name);
    const bi = order.indexOf(b.name);

    const aRank = ai === -1 ? 999 : ai;
    const bRank = bi === -1 ? 999 : bi;

    return aRank - bRank;
  });

  return sorted
    .map(decorateAdapter)
    .filter(Boolean);
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/binance/index.js

```js
import { TronWeb } from 'tronweb';
import { isBinanceBrowser } from '../../shared/browserDetection.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress,
  tryRequestAccounts
} from '../../shared/accountRequests.js';
import { pickBestProvider } from '../../shared/providerResolver.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'binance';
const DRIVER_NAME = 'Binance Wallet';
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
    id === 'binance' ||
    id === 'binance wallet' ||
    id === 'binancewallet' ||
    name === 'binance wallet' ||
    name === 'binance' ||
    name === 'binancewallet'
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

function getInjectedBinanceProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  if (win.BinanceChain?.tronWeb) return win.BinanceChain.tronWeb;
  if (win.BinanceChain?.tron) return win.BinanceChain.tron;
  if (win.BinanceChain) return win.BinanceChain;
  if (win.binancew3w?.tron) return win.binancew3w.tron;
  if (win.binancew3w) return win.binancew3w;

  return null;
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedBinanceProvider();
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

function getSigningCapabilities(provider, tronWeb = null) {
  const resolvedTronWeb = tronWeb || provider?.tronWeb || provider || null;

  return {
    hasProviderRequest: typeof provider?.request === 'function',
    hasProviderSend: typeof provider?.send === 'function',
    hasProviderSignTransaction: typeof provider?.signTransaction === 'function',
    hasTronWebSign: typeof resolvedTronWeb?.trx?.sign === 'function',
    hasTransactionBuilder: typeof resolvedTronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof resolvedTronWeb?.address?.toHex === 'function',
    canSign: !!(
      typeof provider?.request === 'function' ||
      typeof provider?.send === 'function' ||
      typeof provider?.signTransaction === 'function' ||
      typeof resolvedTronWeb?.trx?.sign === 'function'
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
    if (typeof provider.getAccount === 'function') {
      const result = await provider.getAccount();

      if (isUsableAddress(result)) {
        return result;
      }

      if (isUsableAddress(result?.address)) {
        return result.address;
      }

      if (isUsableAddress(result?.data?.address)) {
        return result.data.address;
      }

      if (isUsableAddress(result?.result?.address)) {
        return result.result.address;
      }
    }
  } catch (_) {}

  try {
    const result = await tryRequestAccounts(provider);

    if (isUsableAddress(result)) {
      return result;
    }
  } catch (_) {}

  return (
    provider?.address ||
    provider?.selectedAddress ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    getWindowSafe()?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function createBinanceTronWeb(provider, address) {
  const tronWeb = new TronWeb({
    fullHost: TRONGRID_FULL_HOST
  });

  if (isUsableAddress(address)) {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}

    try {
      tronWeb.defaultAddress = {
        ...tronWeb.defaultAddress,
        base58: address
      };
    } catch (_) {}
  }

  if (typeof provider?.signTransaction === 'function') {
    tronWeb.trx.sign = async (transaction) => {
      return provider.signTransaction(transaction);
    };
  }

  return tronWeb;
}

async function ensureBinanceSession(adapter, provider) {
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

async function waitForBinanceProvider(appkit, adapter, options = {}) {
  const {
    attempts = 12,
    intervalMs = 120
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider(appkit, adapter);
    const address = resolveAddress(adapter, provider);

    if (provider && (address || provider?.trx?.sign || provider?.tronWeb?.trx?.sign || provider?.signTransaction)) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider(appkit, adapter);
}

export const binanceDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle() {
    return isBinanceBrowser() || !!getInjectedBinanceProvider();
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

    let provider = await waitForBinanceProvider(appkit, adapter);
    let address = await ensureBinanceSession(adapter, provider);

    provider = await waitForBinanceProvider(appkit, adapter);

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 16,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('Binance Wallet address not resolved');
    }

    let tronWeb =
      provider?.tronWeb ||
      (provider?.trx?.sign ? provider : null) ||
      null;

    if (!tronWeb) {
      tronWeb = createBinanceTronWeb(provider, address);
    }

    await forceBindTronWeb(provider, address);

    if (tronWeb && typeof tronWeb.setAddress === 'function') {
      try {
        tronWeb.setAddress(address);
      } catch (_) {}
    }

    const finalProvider = await waitForBinanceProvider(appkit, adapter);

    return {
      ok: true,
      walletId: DRIVER_NAME,
      walletName: DRIVER_NAME,
      address,
      provider: finalProvider || provider,
      tronWeb:
        finalProvider?.tronWeb ||
        (finalProvider?.trx?.sign ? finalProvider : null) ||
        tronWeb ||
        provider?.tronWeb ||
        provider ||
        null,
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
      throw new Error('Binance Wallet balances: invalid address');
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
    const address = this.getAddress(appkit);
    const tronWeb =
      provider?.tronWeb ||
      (provider?.trx?.sign ? provider : null) ||
      createBinanceTronWeb(provider, address);

    return getSigningCapabilities(provider, tronWeb);
  },

  async assertSigningReady(appkit) {
    const provider = this.getProvider(appkit);
    const address = this.getAddress(appkit);
    const tronWeb =
      provider?.tronWeb ||
      (provider?.trx?.sign ? provider : null) ||
      createBinanceTronWeb(provider, address);

    const signing = getSigningCapabilities(provider, tronWeb);

    if (!signing.canSign) {
      throw new Error('Binance Wallet signing not available');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('Binance Wallet transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('Binance Wallet address codec is not available');
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
      subscribe(win?.BinanceChain, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.BinanceChain, 'disconnect', handlers.onDisconnect),
      subscribe(win?.BinanceChain, 'connect', handlers.onConnect),
      subscribe(win?.binancew3w, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.binancew3w, 'disconnect', handlers.onDisconnect),
      subscribe(win?.binancew3w, 'connect', handlers.onConnect)
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

export function createBinanceDriver() {
  return binanceDriver;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/bitget/index.js

```js
import { isBitgetBrowser } from '../../shared/browserDetection.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress,
  tryRequestAccounts
} from '../../shared/accountRequests.js';
import { pickBestProvider } from '../../shared/providerResolver.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'bitget';
const DRIVER_NAME = 'Bitget Wallet';
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
    id === 'bitget' ||
    id === 'bitget wallet' ||
    id === 'bitkeep' ||
    id === 'bitkeep wallet' ||
    name === 'bitget' ||
    name === 'bitget wallet' ||
    name === 'bitkeep' ||
    name === 'bitkeep wallet'
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

function getInjectedBitgetProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  if (win.bitkeep?.tronWeb) return win.bitkeep.tronWeb;
  if (win.bitkeep) return win.bitkeep;
  if (win.bitget?.tronWeb) return win.bitget.tronWeb;
  if (win.bitget) return win.bitget;

  return null;
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedBitgetProvider();
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

async function ensureBitgetSession(adapter, provider) {
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

async function waitForBitgetProvider(appkit, adapter, options = {}) {
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

export const bitgetDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle() {
    return isBitgetBrowser() || !!getInjectedBitgetProvider();
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

    let provider = await waitForBitgetProvider(appkit, adapter);
    let address = await ensureBitgetSession(adapter, provider);

    provider = await waitForBitgetProvider(appkit, adapter);

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 16,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('Bitget Wallet address not resolved');
    }

    await forceBindTronWeb(provider, address);

    const finalProvider = await waitForBitgetProvider(appkit, adapter);

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
      throw new Error('Bitget Wallet balances: invalid address');
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
      throw new Error('Bitget Wallet signing not available');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('Bitget Wallet transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('Bitget Wallet address codec is not available');
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
      subscribe(win?.bitkeep, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.bitkeep, 'disconnect', handlers.onDisconnect),
      subscribe(win?.bitkeep, 'connect', handlers.onConnect),
      subscribe(win?.bitget, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.bitget, 'disconnect', handlers.onDisconnect),
      subscribe(win?.bitget, 'connect', handlers.onConnect)
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

export function createBitgetDriver() {
  return bitgetDriver;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/foxwallet/index.js

```js
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
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/imtoken/index.js

```js
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

function getInjectedImTokenProvider() {
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
    !!win?.tronweb ||
    !!win?.tronWeb
  );
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider() {
  return getInjectedImTokenProvider();
}

function extractImTokenAddress(value) {
  if (!value) return null;

  if (typeof value === 'string' && isUsableAddress(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = extractImTokenAddress(item);
      if (nested) return nested;
    }

    return null;
  }

  if (typeof value === 'object') {
    return (
      extractImTokenAddress(value.address) ||
      extractImTokenAddress(value.selectedAddress) ||
      extractImTokenAddress(value.publicKey) ||
      extractImTokenAddress(value.data) ||
      extractImTokenAddress(value.result) ||
      extractImTokenAddress(value.accounts) ||
      extractImTokenAddress(value.account) ||
      extractImTokenAddress(value.object) ||
      extractImTokenAddress(value.object?.address) ||
      extractImTokenAddress(value.payload) ||
      extractImTokenAddress(value.defaultAddress?.base58) ||
      extractImTokenAddress(value.tronWeb?.defaultAddress?.base58) ||
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

async function requestImTokenAccounts(provider) {
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = extractImTokenAddress(result);

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
    attempts = 20,
    intervalMs = 180,
    requestAccountAt = [0, 1, 2, 4, 8, 12, 16]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = extractImTokenAddress(provider);

    if (isUsableAddress(directAddress)) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAccountAt.includes(i)) {
      const requestedAddress = await requestImTokenAccounts(provider);

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
    return extractImTokenAddress(provider);
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
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/metamask/index.js

```js
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
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/okx/index.js

```js
import { isOkxBrowser } from '../../shared/browserDetection.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress,
  tryRequestAccounts
} from '../../shared/accountRequests.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'okx';
const DRIVER_NAME = 'OKX Wallet';
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
    id === 'okx' ||
    id === 'okx wallet' ||
    id === 'okxwallet' ||
    name === 'okx wallet' ||
    name === 'okx' ||
    name === 'okxwallet'
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

function isOkxTronProvider(target) {
  const tronWeb = target?.tronWeb || target || null;

  return !!(
    tronWeb &&
    (
      target?.isOkxWallet ||
      target?.isOKXWallet ||
      target?.okxwallet ||
      tronWeb?.isOkxWallet ||
      tronWeb?.isOKXWallet ||
      tronWeb?.walletName === 'OKX Wallet' ||
      tronWeb?.wallet === 'OKX Wallet'
    )
  );
}

function getInjectedOkxProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  if (win.okxwallet?.tronWeb) return win.okxwallet.tronWeb;
  if (win.okxwallet) return win.okxwallet;
  if (win.okxWallet?.tronWeb) return win.okxWallet.tronWeb;
  if (win.okxWallet) return win.okxWallet;

  if (isOkxTronProvider(win.tronLink?.tronWeb)) return win.tronLink.tronWeb;
  if (isOkxTronProvider(win.tronLink)) return win.tronLink;
  if (isOkxTronProvider(win.tronWeb)) return win.tronWeb;

  return null;
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedOkxProvider();
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

  return candidates.find(isOkxTronProvider) || candidates[0] || null;
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
      typeof tronWeb?.trx?.sign === 'function' &&
      typeof tronWeb?.transactionBuilder?.sendTrx === 'function' &&
      typeof tronWeb?.address?.toHex === 'function'
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

async function ensureOkxSession(adapter, provider) {
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

async function waitForOkxProvider(appkit, adapter, options = {}) {
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

export const okxDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle(appkit) {
    return !!getResolvedProvider(appkit, this.getAdapter(appkit)) || isOkxBrowser();
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

    let provider = await waitForOkxProvider(appkit, adapter);
    let address = await ensureOkxSession(adapter, provider);

    provider = await waitForOkxProvider(appkit, adapter);

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 16,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('OKX Wallet address not resolved');
    }

    await forceBindTronWeb(provider, address);

    const finalProvider = await waitForOkxProvider(appkit, adapter);
    const signing = getSigningCapabilities(finalProvider || provider);

    if (!signing.canSign) {
      throw new Error('OKX Wallet signing capability is not available');
    }

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
      throw new Error('OKX Wallet balances: invalid address');
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
      throw new Error('OKX Wallet signing not available');
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
      subscribe(win?.okxwallet, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.okxwallet, 'disconnect', handlers.onDisconnect),
      subscribe(win?.okxwallet, 'connect', handlers.onConnect),
      subscribe(win?.okxWallet, 'accountsChanged', handlers.onAccountsChanged),
      subscribe(win?.okxWallet, 'disconnect', handlers.onDisconnect),
      subscribe(win?.okxWallet, 'connect', handlers.onConnect)
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

export function createOkxDriver() {
  return okxDriver;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/tokenpocket/index.js

```js
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
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/tronlink/index.js

```js
import { isTronLinkBrowser } from '../../shared/browserDetection.js';
import { resolveAddress, isUsableAddress } from '../../shared/addressResolver.js';
import {
  forceBindTronWeb,
  waitForAddress,
  requestTronLinkAccounts
} from '../../shared/accountRequests.js';
import { pickBestProvider } from '../../shared/providerResolver.js';
import { readTrxBalance } from '../../shared/trxBalanceReader.js';
import { safeReadTokenBalance } from '../../shared/tokenBalanceReader.js';

const DRIVER_ID = 'tronlink';
const DRIVER_NAME = 'TronLink';
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

  return id === 'tronlink' || name === 'tronlink';
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

function getInjectedTronLinkProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  if (win.tronLink?.tronWeb) return win.tronLink.tronWeb;
  if (win.tronLink) return win.tronLink;
  if (win.tronWeb?.isTronLink) return win.tronWeb;

  return null;
}

function getInjectedTronLinkContainer() {
  const win = getWindowSafe();
  return win?.tronLink || null;
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedTronLinkProvider();
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

async function ensureTronLinkSession(provider) {
  const container = getInjectedTronLinkContainer();
  const requestTarget = container?.request ? container : provider;

  const requestResult = await requestTronLinkAccounts(requestTarget, {
    attempts: 5,
    intervalMs: 180
  });

  if (requestResult.ok && requestResult.address) {
    return requestResult.address;
  }

  if (requestResult.reason === 'rejected') {
    throw new Error('TronLink connection rejected');
  }

  return null;
}

async function waitForTronLinkProvider(appkit, adapter, options = {}) {
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

export const tronLinkDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  canHandle() {
    return isTronLinkBrowser() || !!getInjectedTronLinkProvider();
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

    let provider = await waitForTronLinkProvider(appkit, adapter);
    let address = await ensureTronLinkSession(provider);

    provider = await waitForTronLinkProvider(appkit, adapter);

    if (!isUsableAddress(address)) {
      address = await waitForAddress(adapter, provider, {
        attempts: 16,
        intervalMs: 180,
        requestAccountAt: [0, 2, 4, 8, 12]
      });
    }

    if (!isUsableAddress(address)) {
      throw new Error('TronLink address not resolved');
    }

    await forceBindTronWeb(provider, address);

    const finalProvider = await waitForTronLinkProvider(appkit, adapter);
    const signing = getSigningCapabilities(finalProvider || provider);

    if (!signing.canSign) {
      throw new Error('TronLink signing capability is not available');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('TronLink transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('TronLink address codec is not available');
    }

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
      throw new Error('TronLink balances: invalid address');
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
      throw new Error('TronLink signing not available');
    }

    if (!signing.hasTransactionBuilder) {
      throw new Error('TronLink transaction builder is not available');
    }

    if (!signing.hasAddressToHex) {
      throw new Error('TronLink address codec is not available');
    }

    return {
      ok: true,
      ...signing
    };
  },

  subscribe(appkit, handlers = {}) {
    const adapter = this.getAdapter(appkit);
    const provider = this.getProvider(appkit);
    const container = getInjectedTronLinkContainer();

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
      subscribe(container, 'connect', handlers.onConnect)
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

export function createTronLinkDriver() {
  return tronLinkDriver;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/trust/index.js

```js
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

function extractAddressFromAnything(...values) {
  for (const value of values) {
    if (!value) continue;

    if (typeof value === 'string' && isUsableAddress(value)) {
      return value;
    }

    if (Array.isArray(value)) {
      const nested = extractAddressFromAnything(...value);
      if (nested) return nested;
    }

    if (typeof value === 'object') {
      const nested = extractAddressFromAnything(
        value.address,
        value.publicKey,
        value.selectedAddress,
        value.base58,
        value.result,
        value.data,
        value.accounts,
        value.account,
        value.payload,
        value.object,
        value.defaultAddress?.base58,
        value.tronWeb?.defaultAddress?.base58
      );

      if (nested) return nested;
    }
  }

  return null;
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
      message.includes('connection already open')
    ) {
      return null;
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

async function tryAdapterRequestAccounts(adapter) {
  if (!adapter) {
    return null;
  }

  const methods = ['requestAccounts', 'connect'];

  for (const methodName of methods) {
    if (typeof adapter?.[methodName] !== 'function') {
      continue;
    }

    try {
      const result = await adapter[methodName]();
      const address = extractAddressFromAnything(result);

      if (isUsableAddress(address)) {
        return address;
      }
    } catch (_) {}
  }

  return null;
}

async function waitForTrustAddress(adapter, provider, connectResult = null, options = {}) {
  const {
    attempts = 22,
    intervalMs = 180,
    requestAt = [0, 1, 2, 4, 8, 12, 16, 20]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = extractAddressFromAnything(
      connectResult,
      resolveAddress(adapter, provider),
      adapter?.address,
      adapter?.publicKey,
      adapter?.account,
      adapter?.connectedAddress,
      adapter?.state,
      provider?.address,
      provider?.selectedAddress,
      provider?.defaultAddress?.base58,
      provider?.tronWeb?.defaultAddress?.base58
    );

    if (isUsableAddress(directAddress)) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAt.includes(i)) {
      const requestedAddress =
        (await tryRequestAccounts(provider)) ||
        (await tryAdapterRequestAccounts(adapter)) ||
        null;

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

    return extractAddressFromAnything(
      resolveAddress(adapter, provider),
      adapter?.address,
      adapter?.publicKey,
      adapter?.account,
      provider?.address,
      provider?.selectedAddress,
      provider?.defaultAddress?.base58,
      provider?.tronWeb?.defaultAddress?.base58
    );
  },

  async connect(appkit) {
    const adapter = this.getAdapter(appkit);

    if (!adapter) {
      throw new Error('Trust Wallet adapter not found');
    }

    const connectResult = await connectAdapter(adapter);

    let provider = this.getProvider(appkit);

    if (!provider || !isTrustProvider(provider)) {
      provider = getTrustWindowProvider();
    }

    if (!provider || !isTrustProvider(provider)) {
      throw new Error('Trust Wallet provider not found');
    }

    const address = await waitForTrustAddress(adapter, provider, connectResult, {
      attempts: isTrustWalletBrowser() ? 26 : 22,
      intervalMs: 180,
      requestAt: isTrustWalletBrowser()
        ? [0, 1, 2, 4, 8, 12, 16, 20, 24]
        : [0, 1, 2, 4, 8, 12, 16, 20]
    });

    if (!isUsableAddress(address)) {
      throw new Error('Trust Wallet address not resolved');
    }

    await forceBindTronWeb(provider, address);

    const reboundProvider = this.getProvider(appkit) || provider;

    return {
      ok: true,
      walletId: 'Trust',
      walletName: DRIVER_NAME,
      address,
      provider: reboundProvider,
      tronWeb: reboundProvider?.tronWeb || reboundProvider || null,
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
```

---

## FILE: 4teen-wallet-kit :: src/adapters/drivers/walletconnect/index.js

```js
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
```

---

## FILE: 4teen-wallet-kit :: src/adapters/priority.js

```js
export const WALLET_PRIORITY = [
  'tronlink',
  'tokenpocket',
  'okx',
  'trust',
  'bitget',
  'binance',
  'imtoken',
  'foxwallet',
  'metamask',
  'walletconnect'
];
```

---

## FILE: 4teen-wallet-kit :: src/adapters/registry/getAvailableDrivers.js

```js
import { WALLET_REGISTRY } from './walletRegistry.js';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
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

function isAdapterMatch(entry, adapter) {
  const entryIds = [
    entry.id,
    entry.key,
    entry.name,
    entry.driverId
  ].map(normalize);

  const adapterIds = [
    getAdapterId(adapter),
    getAdapterName(adapter)
  ].map(normalize);

  return adapterIds.some((id) => entryIds.includes(id));
}

function findAdapterForRegistryEntry(appkit, entry) {
  const adapters = resolveAdapters(appkit);

  return adapters.find((adapter) => isAdapterMatch(entry, adapter)) || null;
}

export function getAvailableDrivers(appkit) {
  return WALLET_REGISTRY
    .filter((entry) => entry.enabled !== false)
    .map((entry) => {
      const adapter = findAdapterForRegistryEntry(appkit, entry);

      return {
        id: entry.id,
        key: entry.key,
        name: entry.name,
        driverId: entry.driverId,
        type: entry.type,
        enabled: entry.enabled !== false,
        available: !!adapter,
        readyState: adapter?.readyState || 'Unknown',
        connected: !!adapter?.connected,
        adapter: adapter || null
      };
    });
}

export function listAvailableDriverIds(appkit) {
  return getAvailableDrivers(appkit)
    .filter((entry) => entry.available)
    .map((entry) => entry.driverId);
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/registry/getDriverById.js

```js
import { WALLET_REGISTRY } from './walletRegistry.js';
import { getDriverMap } from './getDriverMap.js';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function matchWallet(entry, walletId) {
  const target = normalize(walletId);

  return (
    normalize(entry.id) === target ||
    normalize(entry.key) === target ||
    normalize(entry.name) === target ||
    normalize(entry.driverId) === target
  );
}

export function getWalletById(walletId) {
  if (!walletId) return null;

  return WALLET_REGISTRY.find((entry) => matchWallet(entry, walletId)) || null;
}

export function getDriverIdByWallet(walletId) {
  const entry = getWalletById(walletId);
  return entry?.driverId || null;
}

export function getDriverById(walletId) {
  if (!walletId) return null;

  const driverId = getDriverIdByWallet(walletId);
  if (!driverId) return null;

  const driverMap = getDriverMap();

  return driverMap[normalize(driverId)] || null;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/registry/getDriverMap.js

```js
import { createTronLinkDriver } from '../drivers/tronlink/index.js';
import { createOkxDriver } from '../drivers/okx/index.js';
import { createBinanceDriver } from '../drivers/binance/index.js';
import { createTokenPocketDriver } from '../drivers/tokenpocket/index.js';
import { createBitgetDriver } from '../drivers/bitget/index.js';
import { createTrustDriver } from '../drivers/trust/index.js';
import { createMetaMaskDriver } from '../drivers/metamask/index.js';
import { createImTokenDriver } from '../drivers/imtoken/index.js';
import { createFoxWalletDriver } from '../drivers/foxwallet/index.js';
import { createWalletConnectDriver } from '../drivers/walletconnect/index.js';

let driverMap = null;

export function getDriverMap() {
  if (driverMap) {
    return driverMap;
  }

  driverMap = {
    tronlink: createTronLinkDriver(),
    okx: createOkxDriver(),
    binance: createBinanceDriver(),
    tokenpocket: createTokenPocketDriver(),
    bitget: createBitgetDriver(),
    trust: createTrustDriver(),
    metamask: createMetaMaskDriver(),
    imtoken: createImTokenDriver(),
    foxwallet: createFoxWalletDriver(),
    walletconnect: createWalletConnectDriver()
  };

  return driverMap;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/registry/pickWalletAdapter.js

```js
import { detectBrowserWalletName } from '../shared/browserDetection.js';
import { readAddressFromAdapter } from '../shared/addressResolver.js';

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

function normalizeWalletId(value) {
  return String(value || '').trim().toLowerCase();
}

function isWalletConnectAdapter(adapter) {
  const adapterId = normalizeWalletId(getAdapterId(adapter));
  const adapterName = normalizeWalletId(getAdapterName(adapter));

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
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

function isAdapterAllowedForBrowser(adapter, browserWalletName) {
  if (!browserWalletName) return true;
  if (isWalletConnectAdapter(adapter)) return true;

  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);

  return adapterName === browserWalletName || adapterId === browserWalletName;
}

function getAdapterScore(adapter, walletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const address = readAddressFromAdapter(adapter);

  let score = 0;

  if (!isAdapterAllowedForBrowser(adapter, browserWalletName)) {
    return -100000;
  }

  if (walletId && normalizeWalletId(walletId) === normalizeWalletId(adapterId)) {
    score += 30000;
  }

  if (walletId && normalizeWalletId(walletId) === normalizeWalletId(adapterName)) {
    score += 30000;
  }

  if (browserWalletName && adapterName === browserWalletName) {
    score += 20000;
  }

  if (browserWalletName && adapterId === browserWalletName) {
    score += 20000;
  }

  if (connected) score += 10000;
  if (address) score += 12000;

  if (readyState === 'Found') score += 500;
  if (readyState === 'Installed') score += 450;
  if (readyState === 'Loadable') score += 250;
  if (readyState === 'Loading') score += 50;

  if (browserWalletName && browserWalletName !== 'TronLink') {
    if (adapterName === 'TronLink' || adapterId === 'TronLink') {
      score -= 25000;
    }
  }

  if (isWalletConnectAdapter(adapter) && browserWalletName) {
    score -= 5000;
  }

  return score;
}

export function pickWalletAdapter(appkit, walletId = null) {
  const adapters = resolveAdapters(appkit);

  if (!adapters.length) {
    return null;
  }

  const ranked = [...adapters]
    .map((adapter) => ({
      adapter,
      score: getAdapterScore(adapter, walletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.adapter || null;
}

export function getWalletAdapterById(appkit, walletId) {
  if (!walletId) return null;

  const adapters = resolveAdapters(appkit);

  return (
    adapters.find((adapter) => {
      return (
        getAdapterId(adapter) === walletId ||
        getAdapterName(adapter) === walletId
      );
    }) || null
  );
}

export function listWalletAdapters(appkit) {
  return resolveAdapters(appkit).map((adapter) => ({
    id: getAdapterId(adapter) || getAdapterName(adapter),
    name: getAdapterName(adapter),
    readyState: adapter?.readyState || 'Unknown',
    connected: !!adapter?.connected,
    hasAddress: !!readAddressFromAdapter(adapter)
  }));
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/registry/walletRegistry.js

```js
export const WALLET_REGISTRY = [
  {
    id: 'TronLink',
    key: 'tronlink',
    name: 'TronLink',
    driverId: 'tronlink',
    type: 'injected',
    enabled: true
  },
  {
    id: 'OKX Wallet',
    key: 'okx',
    name: 'OKX Wallet',
    driverId: 'okx',
    type: 'injected',
    enabled: true
  },
  {
    id: 'Binance Wallet',
    key: 'binance',
    name: 'Binance Wallet',
    driverId: 'binance',
    type: 'injected',
    enabled: true
  },
  {
    id: 'TokenPocket',
    key: 'tokenpocket',
    name: 'TokenPocket',
    driverId: 'tokenpocket',
    type: 'injected',
    enabled: true
  },
  {
    id: 'Bitget Wallet',
    key: 'bitget',
    name: 'Bitget Wallet',
    driverId: 'bitget',
    type: 'injected',
    enabled: true
  },
  {
    id: 'Trust',
    key: 'trust',
    name: 'Trust Wallet',
    driverId: 'trust',
    type: 'injected',
    enabled: true
  },
  {
    id: 'MetaMask',
    key: 'metamask',
    name: 'MetaMask',
    driverId: 'metamask',
    type: 'injected',
    enabled: true
  },
  {
    id: 'imToken',
    key: 'imtoken',
    name: 'imToken',
    driverId: 'imtoken',
    type: 'injected',
    enabled: true
  },
  {
    id: 'FoxWallet',
    key: 'foxwallet',
    name: 'FoxWallet',
    driverId: 'foxwallet',
    type: 'injected',
    enabled: true
  },
  {
    id: 'WalletConnect',
    key: 'walletconnect',
    name: 'WalletConnect',
    driverId: 'walletconnect',
    type: 'bridge',
    enabled: true
  }
];

export function getWalletRegistry() {
  return [...WALLET_REGISTRY];
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/accountRequests.js

```js
import { extractAddressFromPayload, resolveAddress } from './addressResolver.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isTronLinkProvider(provider) {
  const win = getWindowSafe();

  return !!(
    provider &&
    (
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    )
  );
}

function extractRequestCode(payload) {
  if (typeof payload?.code === 'number') return payload.code;
  if (typeof payload?.result?.code === 'number') return payload.result.code;
  return null;
}

export async function tryProviderRequest(provider, method, params = []) {
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

export async function requestTronLinkAccounts(provider, options = {}) {
  const {
    attempts = 4,
    intervalMs = 180
  } = options;

  if (!isTronLinkProvider(provider)) {
    return {
      ok: false,
      code: null,
      address: null,
      ready: false,
      reason: 'not_tronlink'
    };
  }

  const tronLink = provider?.request ? provider : getWindowSafe()?.tronLink || null;

  for (let i = 0; i < attempts; i++) {
    try {
      const response = await tronLink.request({ method: 'tron_requestAccounts' });
      const code = extractRequestCode(response);

      if (code === 4001) {
        return {
          ok: false,
          code,
          address: null,
          ready: !!tronLink?.ready,
          reason: 'rejected'
        };
      }

      if (code === 4000) {
        await sleep(intervalMs);
      }

      const address =
        extractAddressFromPayload(response, provider) ||
        provider?.tronWeb?.defaultAddress?.base58 ||
        tronLink?.tronWeb?.defaultAddress?.base58 ||
        getWindowSafe()?.tronWeb?.defaultAddress?.base58 ||
        null;

      if (isUsableAddress(address)) {
        return {
          ok: true,
          code,
          address,
          ready: !!tronLink?.ready
        };
      }
    } catch (error) {
      if (i === attempts - 1) {
        return {
          ok: false,
          code: null,
          address: null,
          ready: !!tronLink?.ready,
          reason: error?.message || 'tron_requestAccounts failed'
        };
      }
    }

    await sleep(intervalMs);
  }

  return {
    ok: false,
    code: null,
    address: null,
    ready: !!tronLink?.ready,
    reason: 'address_not_resolved'
  };
}

export async function tryRequestAccounts(provider) {
  if (isTronLinkProvider(provider)) {
    const tronLinkResult = await requestTronLinkAccounts(provider);

    if (tronLinkResult.ok && tronLinkResult.address) {
      return tronLinkResult.address;
    }
  }

  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['eth_requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = extractAddressFromPayload(result, provider);

    if (address) {
      return address;
    }
  }

  return null;
}

export async function forceBindTronWeb(provider, address) {
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
    if (provider?.defaultAddress && typeof provider.defaultAddress === 'object') {
      provider.defaultAddress.hex = null;
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb?.defaultAddress && typeof provider.tronWeb.defaultAddress === 'object') {
      provider.tronWeb.defaultAddress.base58 = address;
    }
  } catch (_) {}

  try {
    if (provider?.tronWeb?.defaultAddress && typeof provider.tronWeb.defaultAddress === 'object') {
      provider.tronWeb.defaultAddress.hex = null;
    }
  } catch (_) {}

  try {
    if ('selectedAddress' in provider) {
      provider.selectedAddress = address;
    }
  } catch (_) {}

  try {
    if ('address' in provider && typeof provider.address === 'string') {
      provider.address = address;
    }
  } catch (_) {}

  try {
    const win = getWindowSafe();

    if (win?.tronWeb && typeof win.tronWeb.setAddress === 'function') {
      win.tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    const win = getWindowSafe();

    if (win?.tronWeb?.defaultAddress && typeof win.tronWeb.defaultAddress === 'object') {
      win.tronWeb.defaultAddress.base58 = address;
      win.tronWeb.defaultAddress.hex = null;
    }
  } catch (_) {}
}

export async function waitForAddress(adapter, provider, options = {}) {
  const {
    attempts = 16,
    intervalMs = 250,
    requestAccountAt = [0, 2, 4, 8, 12]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress = resolveAddress(adapter, provider);

    if (directAddress) {
      await forceBindTronWeb(provider, directAddress);
      return directAddress;
    }

    if (requestAccountAt.includes(i)) {
      const requestedAddress = await tryRequestAccounts(provider);

      if (requestedAddress) {
        await forceBindTronWeb(provider, requestedAddress);
        return requestedAddress;
      }
    }

    await sleep(intervalMs);
  }

  return null;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/addressResolver.js

```js
function isString(value) {
  return typeof value === 'string';
}

export function isUsableAddress(value) {
  return isString(value) && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function isHexAddress(value) {
  return isString(value) && /^41[0-9a-fA-F]{40}$/.test(value);
}

export function normalizeAddress(value, provider = null) {
  if (isUsableAddress(value)) {
    return value;
  }

  if (isHexAddress(value) && provider?.address?.fromHex) {
    try {
      const converted = provider.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  if (isHexAddress(value) && provider?.tronWeb?.address?.fromHex) {
    try {
      const converted = provider.tronWeb.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  return null;
}

export function extractAddressFromPayload(payload, provider = null) {
  if (!payload) {
    return null;
  }

  if (typeof payload === 'string') {
    return normalizeAddress(payload, provider);
  }

  if (Array.isArray(payload)) {
    return normalizeAddress(payload[0], provider);
  }

  if (typeof payload === 'object') {
    return (
      normalizeAddress(payload.address, provider) ||
      normalizeAddress(payload.selectedAddress, provider) ||
      normalizeAddress(payload.publicKey, provider) ||
      normalizeAddress(payload.result?.[0], provider) ||
      normalizeAddress(payload.accounts?.[0], provider) ||
      normalizeAddress(payload.data?.address, provider) ||
      normalizeAddress(payload.payload?.address, provider) ||
      null
    );
  }

  return null;
}

export function resolveAddress(adapter = null, provider = null) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,

    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,

    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,

    adapter?.connector?.provider?.address,
    adapter?.connector?.provider?.selectedAddress,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58,

    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const candidate of candidates) {
    const normalized = normalizeAddress(candidate, provider);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

export function readAddressFromAdapter(adapter = null) {
  return resolveAddress(adapter, null);
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/browserDetection.js

```js
function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getUserAgent() {
  const win = getWindowSafe();
  return String(win?.navigator?.userAgent || '').toLowerCase();
}

function getLocationHref() {
  const win = getWindowSafe();
  return String(win?.location?.href || '').toLowerCase();
}

export function isOkxBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=okx') ||
    ua.includes('okex/') ||
    ua.includes('okapp/') ||
    ua.includes('okx') ||
    !!win?.okxwallet ||
    !!win?.okxWallet
  );
}

export function isBinanceBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance') ||
    !!win?.BinanceChain ||
    !!win?.binancew3w
  );
}

export function isTronLinkBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  if (
    !!win?.okxwallet ||
    !!win?.okxWallet ||
    ua.includes('okex/') ||
    ua.includes('okapp/') ||
    ua.includes('okx') ||
    href.includes('utm_source=okx')
  ) {
    return false;
  }

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

export function isTrustWalletBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=trust') ||
    href.includes('trust_ios_browser') ||
    ua.includes('trustwallet') ||
    ua.includes('trust wallet') ||
    !!win?.trustwallet ||
    !!win?.trustWallet
  );
}

export function isTokenPocketBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=tokenpocket') ||
    ua.includes('tokenpocket') ||
    ua.includes('tp/') ||
    !!win?.tp ||
    !!win?.tokenPocket
  );
}

export function isBitgetBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=bitget') ||
    href.includes('utm_source=bitkeep') ||
    ua.includes('bitkeep') ||
    ua.includes('bitget') ||
    !!win?.bitkeep ||
    !!win?.bitget
  );
}

export function isImTokenBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=imtoken') ||
    ua.includes('imtoken') ||
    !!win?.tronweb ||
    !!win?.tronWeb
  );
}

export function isFoxWalletBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=foxwallet') ||
    ua.includes('foxwallet') ||
    ua.includes('fox wallet') ||
    !!win?.foxwallet?.tronLink ||
    !!win?.foxwallet
  );
}

export function isMetaMaskBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=metamask') ||
    ua.includes('metamask') ||
    !!win?.ethereum?.isMetaMask
  );
}

export function detectBrowserWalletName() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustWalletBrowser()) return 'Trust';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  if (isImTokenBrowser()) return 'imToken';
  if (isFoxWalletBrowser()) return 'FoxWallet';
  if (isMetaMaskBrowser()) return 'MetaMask';

  return null;
}

export function isWalletBrowser() {
  return !!detectBrowserWalletName();
}

export function getBrowserDetectionSnapshot() {
  return {
    okx: isOkxBrowser(),
    binance: isBinanceBrowser(),
    tronLink: isTronLinkBrowser(),
    trust: isTrustWalletBrowser(),
    tokenPocket: isTokenPocketBrowser(),
    bitget: isBitgetBrowser(),
    imToken: isImTokenBrowser(),
    foxWallet: isFoxWalletBrowser(),
    metaMask: isMetaMaskBrowser(),
    detectedWalletName: detectBrowserWalletName()
  };
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/createReadonlyTronWeb.js

```js
import { TronWeb } from 'tronweb';

const DEFAULT_FULL_HOST = 'https://api.trongrid.io';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function createReadonlyTronWeb(options = {}) {
  const {
    fullHost = DEFAULT_FULL_HOST,
    address = null
  } = options;

  const tronWeb = new TronWeb({ fullHost });

  if (address && isUsableAddress(address)) {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}
  }

  return tronWeb;
}

export function getDefaultReadonlyTronWeb(address = null) {
  return createReadonlyTronWeb({
    fullHost: DEFAULT_FULL_HOST,
    address
  });
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/providerResolver.js

```js
import { detectBrowserWalletName } from './browserDetection.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
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

function normalizeWalletId(value) {
  return String(value || '').trim().toLowerCase();
}

function isWalletConnectAdapter(adapter) {
  const adapterId = normalizeWalletId(getAdapterId(adapter));
  const adapterName = normalizeWalletId(getAdapterName(adapter));

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function isAddressLikeProvider(provider) {
  return !!(
    provider?.tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.selectedAddress ||
    provider?.address
  );
}

function isSignCapableProvider(provider) {
  const tronWeb = provider?.tronWeb || provider || null;

  return !!(
    typeof provider?.request === 'function' ||
    typeof provider?.send === 'function' ||
    typeof provider?.sign === 'function' ||
    typeof tronWeb?.trx?.sign === 'function'
  );
}

function getProviderScore(provider, walletName) {
  let score = 0;

  if (providerMatchesWallet(provider, walletName)) score += 50000;
  if (isAddressLikeProvider(provider)) score += 12000;
  if (isSignCapableProvider(provider)) score += 8000;

  if (walletName === 'TronLink') {
    const win = getWindowSafe();

    if (
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    ) {
      score += 40000;
    }
  }

  return score;
}

export function getProviderCandidates(appkit, adapter) {
  const win = getWindowSafe();

  return [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider,
    adapter?.connector?.wallet,

    appkit?.getWalletProvider?.(),

    win?.tronLink,
    win?.tronLink?.tronWeb,

    win?.okxwallet,
    win?.okxwallet?.tronWeb,
    win?.okxWallet,
    win?.okxWallet?.tronWeb,

    win?.BinanceChain,
    win?.BinanceChain?.tronWeb,
    win?.binancew3w,
    win?.binancew3w?.tron,

    win?.tp,
    win?.tp?.tronWeb,
    win?.tokenPocket,
    win?.tokenPocket?.tronWeb,

    win?.bitkeep,
    win?.bitkeep?.tronWeb,
    win?.bitget,
    win?.bitget?.tronWeb,

    win?.trustwallet,
    win?.trustwallet?.tronWeb,
    win?.trustWallet,
    win?.trustWallet?.tronWeb,

    win?.ethereum,
    win?.ethereum?.tronWeb,

    win?.tronWeb
  ].filter(Boolean);
}

export function providerMatchesWallet(provider, walletName) {
  const win = getWindowSafe();

  if (!walletName) {
    return true;
  }

  if (walletName === 'OKX Wallet') {
    return !!(
      provider === win?.okxwallet ||
      provider === win?.okxwallet?.tronWeb ||
      provider === win?.okxWallet ||
      provider === win?.okxWallet?.tronWeb ||
      provider?.isOkxWallet ||
      provider?.isOKExWallet
    );
  }

  if (walletName === 'Binance Wallet') {
    return !!(
      provider === win?.BinanceChain ||
      provider === win?.BinanceChain?.tronWeb ||
      provider === win?.binancew3w ||
      provider === win?.binancew3w?.tron ||
      provider?.isBinance ||
      provider?.chain === 'tron'
    );
  }

  if (walletName === 'TronLink') {
    return !!(
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    );
  }

  if (walletName === 'MetaMask') {
    return !!(
      provider === win?.ethereum ||
      provider === win?.ethereum?.tronWeb ||
      provider?.isMetaMask
    );
  }

  if (walletName === 'TokenPocket') {
    return !!(
      provider === win?.tp ||
      provider === win?.tp?.tronWeb ||
      provider === win?.tokenPocket ||
      provider === win?.tokenPocket?.tronWeb ||
      provider?.isTokenPocket
    );
  }

  if (walletName === 'Bitget Wallet') {
    return !!(
      provider === win?.bitkeep ||
      provider === win?.bitkeep?.tronWeb ||
      provider === win?.bitget ||
      provider === win?.bitget?.tronWeb ||
      provider?.isBitKeep ||
      provider?.isBitget
    );
  }

  if (walletName === 'Trust') {
    return !!(
      provider === win?.trustwallet ||
      provider === win?.trustwallet?.tronWeb ||
      provider === win?.trustWallet ||
      provider === win?.trustWallet?.tronWeb ||
      provider?.isTrust ||
      provider?.isTrustWallet
    );
  }

  return true;
}

export function pickBestProvider(appkit, adapter, walletId = null) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);

  const targetWalletName =
    walletId ||
    browserWalletName ||
    adapterName ||
    adapterId ||
    null;

  const candidates = getProviderCandidates(appkit, adapter);

  if (!candidates.length) {
    return null;
  }

  const ranked = [...candidates]
    .map((provider) => ({
      provider,
      score: getProviderScore(provider, targetWalletName)
    }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.provider) {
    return ranked[0].provider;
  }

  if (
    browserWalletName &&
    browserWalletName !== 'TronLink' &&
    (adapterName === 'TronLink' || adapterId === 'TronLink') &&
    !isWalletConnectAdapter(adapter)
  ) {
    for (const provider of candidates) {
      if (provider !== getWindowSafe()?.tronWeb && provider !== getWindowSafe()?.tronLink) {
        return provider;
      }
    }
  }

  return candidates[0] || null;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/signingReadiness.js

```js
import { getWalletState } from '../../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

export function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

export function getResolvedSigningProvider(input = null) {
  if (input && (input.provider || input.tronWeb || input.runtime)) {
    return (
      input.provider ||
      input.runtime?.provider ||
      input.tronWeb ||
      input.runtime?.tronWeb ||
      null
    );
  }

  const state = input || getWalletState();

  return (
    state?.provider ||
    state?.runtime?.provider ||
    state?.tronWeb ||
    state?.runtime?.tronWeb ||
    null
  );
}

export function getResolvedSigningTronWeb(input = null) {
  if (input && (input.tronWeb || input.provider || input.runtime)) {
    return (
      input.tronWeb ||
      input.runtime?.tronWeb ||
      input.provider?.tronWeb ||
      input.runtime?.provider?.tronWeb ||
      input.provider ||
      null
    );
  }

  const state = input || getWalletState();

  return (
    state?.tronWeb ||
    state?.runtime?.tronWeb ||
    state?.provider?.tronWeb ||
    state?.runtime?.provider?.tronWeb ||
    state?.provider ||
    null
  );
}

export function getSigningCapabilities(provider, tronWeb) {
  const resolvedProvider = provider || null;
  const resolvedTronWeb = tronWeb || provider?.tronWeb || provider || null;

  return {
    hasProvider: !!resolvedProvider,
    hasTronWeb: !!resolvedTronWeb,

    hasProviderRequest: typeof resolvedProvider?.request === 'function',
    hasProviderSend: typeof resolvedProvider?.send === 'function',
    hasProviderSign: typeof resolvedProvider?.sign === 'function',

    hasTrxSign: typeof resolvedTronWeb?.trx?.sign === 'function',
    hasTransactionBuilder: typeof resolvedTronWeb?.transactionBuilder?.sendTrx === 'function',
    hasAddressToHex: typeof resolvedTronWeb?.address?.toHex === 'function',
    hasAddressFromHex: typeof resolvedTronWeb?.address?.fromHex === 'function',

    canSign: !!(
      typeof resolvedProvider?.sign === 'function' ||
      typeof resolvedProvider?.request === 'function' ||
      typeof resolvedProvider?.send === 'function' ||
      typeof resolvedTronWeb?.trx?.sign === 'function'
    )
  };
}

function getResolvedSigningAddress(state, provider, tronWeb) {
  return (
    state?.address ||
    state?.account?.address ||
    tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    provider?.address ||
    provider?.selectedAddress ||
    null
  );
}

function getResolvedProviderName(provider) {
  const win = getWindowSafe();

  if (
    provider === win?.tronLink ||
    provider === win?.tronLink?.tronWeb ||
    provider?.isTronLink ||
    provider?.tronWeb?.isTronLink
  ) {
    return 'TronLink';
  }

  if (
    provider === win?.okxwallet ||
    provider === win?.okxwallet?.tronWeb ||
    provider === win?.okxWallet ||
    provider === win?.okxWallet?.tronWeb ||
    provider?.isOkxWallet ||
    provider?.isOKExWallet
  ) {
    return 'OKX Wallet';
  }

  if (
    provider === win?.BinanceChain ||
    provider === win?.BinanceChain?.tronWeb ||
    provider === win?.binancew3w ||
    provider === win?.binancew3w?.tron ||
    provider?.isBinance
  ) {
    return 'Binance Wallet';
  }

  if (
    provider === win?.tp ||
    provider === win?.tp?.tronWeb ||
    provider === win?.tokenPocket ||
    provider === win?.tokenPocket?.tronWeb ||
    provider?.isTokenPocket
  ) {
    return 'TokenPocket';
  }

  if (
    provider === win?.bitkeep ||
    provider === win?.bitkeep?.tronWeb ||
    provider === win?.bitget ||
    provider === win?.bitget?.tronWeb ||
    provider?.isBitKeep ||
    provider?.isBitget
  ) {
    return 'Bitget Wallet';
  }

  if (
    provider === win?.trustwallet ||
    provider === win?.trustwallet?.tronWeb ||
    provider === win?.trustWallet ||
    provider === win?.trustWallet?.tronWeb ||
    provider?.isTrust ||
    provider?.isTrustWallet
  ) {
    return 'Trust';
  }

  if (
    provider === win?.ethereum ||
    provider === win?.ethereum?.tronWeb ||
    provider?.isMetaMask
  ) {
    return 'MetaMask';
  }

  return null;
}

export function getSigningReadiness(input = {}) {
  const state =
    input && (input.connected !== undefined || input.address || input.provider || input.tronWeb)
      ? input
      : getWalletState();

  const provider = getResolvedSigningProvider(state);
  const tronWeb = getResolvedSigningTronWeb(state);
  const capabilities = getSigningCapabilities(provider, tronWeb);
  const address = getResolvedSigningAddress(state, provider, tronWeb);
  const providerName = getResolvedProviderName(provider);

  if (!(state?.connected || state?.lifecycle?.connected)) {
    return {
      ok: false,
      stage: 'connection',
      address: null,
      providerName,
      capabilities,
      error: 'wallet is not connected'
    };
  }

  if (!isUsableAddress(address)) {
    return {
      ok: false,
      stage: 'address',
      address: null,
      providerName,
      capabilities,
      error: 'wallet address is missing or invalid'
    };
  }

  if (!capabilities.canSign) {
    return {
      ok: false,
      stage: 'capabilities',
      address,
      providerName,
      capabilities,
      error: 'wallet signing capability is not available'
    };
  }

  if (!capabilities.hasTransactionBuilder) {
    return {
      ok: false,
      stage: 'transaction_builder',
      address,
      providerName,
      capabilities,
      error: 'transaction builder is not available'
    };
  }

  if (!capabilities.hasAddressToHex) {
    return {
      ok: false,
      stage: 'address_codec',
      address,
      providerName,
      capabilities,
      error: 'tronWeb address codec is not available'
    };
  }

  return {
    ok: true,
    stage: 'ready',
    address,
    providerName,
    capabilities,
    error: null
  };
}

export function assertSigningCapability(input = {}) {
  const readiness = getSigningReadiness(input);

  if (!readiness.ok) {
    throw new Error(readiness.error || 'wallet signing readiness failed');
  }

  return readiness;
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/tokenBalanceReader.js

```js
import { createReadonlyTronWeb } from './createReadonlyTronWeb.js';

const DEFAULT_TOKEN_DECIMALS = 6;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function normalizeTokenUnits(value, decimals = DEFAULT_TOKEN_DECIMALS) {
  const num = Number(value ?? 0);

  if (!Number.isFinite(num)) {
    return null;
  }

  return Number((num / Math.pow(10, decimals)).toFixed(6));
}

function decodeHexBalance(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') {
    return null;
  }

  try {
    return parseInt(hexValue, 16);
  } catch (_) {
    return null;
  }
}

export async function readTokenBalance(address, tokenAddress, options = {}) {
  if (!isUsableAddress(address)) {
    throw new Error('readTokenBalance: invalid wallet address');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('readTokenBalance: invalid token address');
  }

  const {
    fullHost,
    decimals = DEFAULT_TOKEN_DECIMALS
  } = options;

  const tronWeb = createReadonlyTronWeb({
    fullHost,
    address
  });

  const contract = await tronWeb.contract().at(tokenAddress);
  const raw = await contract.balanceOf(address).call();

  const value =
    typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
      ? raw.toString()
      : String(raw);

  const balance = normalizeTokenUnits(value, decimals);

  if (balance === null) {
    throw new Error('readTokenBalance: invalid balance result');
  }

  return balance;
}

export async function readTokenBalanceViaTrigger(address, tokenAddress, options = {}) {
  if (!isUsableAddress(address)) {
    throw new Error('readTokenBalanceViaTrigger: invalid wallet address');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('readTokenBalanceViaTrigger: invalid token address');
  }

  const {
    fullHost,
    decimals = DEFAULT_TOKEN_DECIMALS
  } = options;

  const tronWeb = createReadonlyTronWeb({
    fullHost,
    address
  });

  const ownerHex = tronWeb.address.toHex(address);
  const contractHex = tronWeb.address.toHex(tokenAddress);

  const result = await tronWeb.transactionBuilder.triggerConstantContract(
    contractHex,
    'balanceOf(address)',
    {},
    [{ type: 'address', value: address }],
    ownerHex
  );

  const hexValue = result?.constant_result?.[0] || null;
  const raw = decodeHexBalance(hexValue);
  const balance = normalizeTokenUnits(raw, decimals);

  if (balance === null) {
    throw new Error('readTokenBalanceViaTrigger: decode failed');
  }

  return balance;
}

export async function safeReadTokenBalance(address, tokenAddress, options = {}) {
  try {
    const value = await readTokenBalance(address, tokenAddress, options);

    return {
      ok: true,
      value,
      error: null,
      source: 'contract'
    };
  } catch (contractError) {
    try {
      const value = await readTokenBalanceViaTrigger(address, tokenAddress, options);

      return {
        ok: true,
        value,
        error: null,
        source: 'trigger'
      };
    } catch (triggerError) {
      return {
        ok: false,
        value: null,
        error: triggerError,
        source: null,
        warnings: {
          contract: contractError?.message || null,
          trigger: triggerError?.message || null
        }
      };
    }
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/adapters/shared/trxBalanceReader.js

```js
import { createReadonlyTronWeb } from './createReadonlyTronWeb.js';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function normalizeSunToTrx(value) {
  const num = Number(value ?? 0);

  if (!Number.isFinite(num)) {
    return null;
  }

  return Number((num / 1_000_000).toFixed(6));
}

export async function readTrxBalance(address, options = {}) {
  if (!isUsableAddress(address)) {
    throw new Error('readTrxBalance: invalid address');
  }

  const tronWeb = createReadonlyTronWeb({
    fullHost: options.fullHost,
    address
  });

  const balanceSun = await tronWeb.trx.getBalance(address);
  const trxBalance = normalizeSunToTrx(balanceSun);

  if (trxBalance === null) {
    throw new Error('readTrxBalance: invalid balance result');
  }

  return trxBalance;
}

export async function safeReadTrxBalance(address, options = {}) {
  try {
    const value = await readTrxBalance(address, options);

    return {
      ok: true,
      value,
      error: null
    };
  } catch (error) {
    return {
      ok: false,
      value: null,
      error
    };
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/actions/connectWallet.js

```js
import { getDriverById } from '../../adapters/registry/getDriverById.js';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { openWalletPicker } from '../../ui/wallet/openWalletPicker.js';
import { failWalletConnection } from '../session/failWalletConnection.js';
import { finalizeWalletConnection } from '../session/finalizeWalletConnection.js';

let connectInFlight = null;
let connectInFlightWalletId = null;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function shouldSkipAppkitSelection(walletId) {
  return walletId === 'imToken' || walletId === 'FoxWallet';
}

function extractAddressFromUnknown(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    return isUsableAddress(value) ? value : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = extractAddressFromUnknown(item);
      if (nested) return nested;
    }

    return null;
  }

  if (typeof value === 'object') {
    return (
      extractAddressFromUnknown(value.address) ||
      extractAddressFromUnknown(value.publicKey) ||
      extractAddressFromUnknown(value.selectedAddress) ||
      extractAddressFromUnknown(value.base58) ||
      extractAddressFromUnknown(value.data) ||
      extractAddressFromUnknown(value.result) ||
      extractAddressFromUnknown(value.accounts) ||
      extractAddressFromUnknown(value.account) ||
      extractAddressFromUnknown(value.payload) ||
      extractAddressFromUnknown(value.object) ||
      extractAddressFromUnknown(value.defaultAddress?.base58) ||
      extractAddressFromUnknown(value.tronWeb?.defaultAddress?.base58) ||
      null
    );
  }

  return null;
}

function resolveFinalAddress(appkit, result, driver) {
  return (
    extractAddressFromUnknown(result?.address) ||
    extractAddressFromUnknown(result?.provider) ||
    extractAddressFromUnknown(result?.tronWeb) ||
    extractAddressFromUnknown(result?.adapter) ||
    extractAddressFromUnknown(driver?.getAddress?.(appkit)) ||
    null
  );
}

function resolveFinalProvider(result) {
  return (
    result?.tronWeb ||
    result?.provider ||
    result?.adapter?.provider ||
    result?.adapter?.tronWeb ||
    result?.adapter?.walletProvider ||
    result?.adapter?.wallet ||
    result?.adapter?.connector?.provider ||
    null
  );
}

function isAlreadyConnectedToWallet(state, walletId) {
  if (!state?.connected) {
    return false;
  }

  return (
    state.walletId === walletId ||
    state.activeWalletId === walletId ||
    state.selectedWalletId === walletId
  );
}

export async function connectWallet(appkit, walletId = null) {
  if (!walletId) {
    setWalletState({
      connecting: true,
      error: null
    });

    try {
      if (!appkit) {
        throw new Error('Wallet kit not initialized');
      }

      await openWalletPicker(appkit);

      return {
        ok: true,
        session: null,
        error: null
      };
    } catch (error) {
      return failWalletConnection(error);
    }
  }

  if (connectInFlight && connectInFlightWalletId === walletId) {
    return connectInFlight;
  }

  const state = getWalletState();

  if (state?.connecting && state?.selectedWalletId === walletId) {
    return {
      ok: false,
      session: null,
      error: null,
      skipped: true,
      reason: 'connect_in_progress'
    };
  }

  if (isAlreadyConnectedToWallet(state, walletId) && isUsableAddress(state?.address)) {
    return {
      ok: true,
      session: {
        walletId: state.walletId || walletId,
        walletName: state.walletName || walletId,
        address: state.address,
        provider: state.provider,
        tronWeb: state.tronWeb
      },
      error: null,
      skipped: true,
      reason: 'already_connected'
    };
  }

  connectInFlightWalletId = walletId;

  connectInFlight = (async () => {
    try {
      setWalletState({
        connecting: true,
        error: null,
        selectedWalletId: walletId
      });

      if (!appkit) {
        throw new Error('Wallet kit not initialized');
      }

      if (!shouldSkipAppkitSelection(walletId) && typeof appkit.selectWallet === 'function') {
        appkit.selectWallet(walletId);
      }

      const driver = getDriverById(walletId);

      if (!driver) {
        throw new Error(`Driver not found: ${walletId}`);
      }

      const result = await driver.connect(appkit);
      const address = resolveFinalAddress(appkit, result, driver);
      const provider = resolveFinalProvider(result);

      if (!isUsableAddress(address)) {
        throw new Error('wallet address is missing or invalid');
      }

      return await finalizeWalletConnection({
        walletId: result?.walletId || driver.name || walletId,
        walletName: result?.walletName || driver.name || walletId,
        address,
        provider
      });
    } catch (error) {
      return failWalletConnection(error);
    } finally {
      connectInFlight = null;
      connectInFlightWalletId = null;
    }
  })();

  return connectInFlight;
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/actions/disconnectWallet.js

```js
import { resetWalletState, setWalletState } from '../../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'unknown'
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

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (typeof appkit.getConnectors === 'function') {
    const adapters = appkit.getConnectors();
    return Array.isArray(adapters) ? adapters : [];
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

async function safeCall(target, methodName) {
  if (!target || typeof target[methodName] !== 'function') {
    return;
  }

  try {
    await target[methodName]();
  } catch (error) {
    console.warn(`[4TEEN] ${methodName} failed`, error);
  }
}

async function safeDisconnectAdapter(adapter) {
  if (!adapter) return;

  await safeCall(adapter, 'disconnect');
  await safeCall(adapter, 'close');
  await safeCall(adapter, 'reset');

  if (adapter?.connector) {
    await safeCall(adapter.connector, 'disconnect');
    await safeCall(adapter.connector, 'close');
    await safeCall(adapter.connector, 'reset');
  }

  if (adapter?.provider) {
    await safeCall(adapter.provider, 'disconnect');
    await safeCall(adapter.provider, 'close');
    await safeCall(adapter.provider, 'reset');
  }

  if (adapter?.walletProvider) {
    await safeCall(adapter.walletProvider, 'disconnect');
    await safeCall(adapter.walletProvider, 'close');
    await safeCall(adapter.walletProvider, 'reset');
  }
}

function clearWalletConnectStorage() {
  const win = getWindowSafe();
  if (!win) return;

  const storageTargets = [];

  try {
    if (win.localStorage) storageTargets.push(win.localStorage);
  } catch (_) {}

  try {
    if (win.sessionStorage) storageTargets.push(win.sessionStorage);
  } catch (_) {}

  const keysToRemove = [
    'walletconnect',
    'WALLETCONNECT_DEEPLINK_CHOICE',
    'WALLETCONNECT_MODAL_SELECTED_CHAIN',
    'wc@2:client:0.3//proposal',
    'wc@2:client:0.3//session',
    'wc@2:core:0.3//expirer',
    'wc@2:core:0.3//history',
    'wc@2:core:0.3//keychain',
    'wc@2:core:0.3//messages',
    'wc@2:core:0.3//pairing',
    'wc@2:core:0.3//subscription',
    'wc@2:universal_provider:/namespaces',
    'wc@2:universal_provider:/optionalNamespaces',
    'wc@2:universal_provider:/sessionProperties'
  ];

  for (const storage of storageTargets) {
    try {
      for (const key of keysToRemove) {
        storage.removeItem(key);
      }

      const dynamicKeys = [];

      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);

        if (!key) continue;

        if (
          key.startsWith('wc@2:') ||
          key.startsWith('walletconnect') ||
          key.includes('WalletConnect')
        ) {
          dynamicKeys.push(key);
        }
      }

      for (const key of dynamicKeys) {
        storage.removeItem(key);
      }
    } catch (_) {}
  }
}

function clearRuntimeCaches() {
  const win = getWindowSafe();
  if (!win) return;

  try {
    win.__FOURTEEN_WALLETCONNECT_URI__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_LAST_SELECTED_WALLET__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_CONNECT_IN_PROGRESS__ = false;
  } catch (_) {}

  try {
    win.__FOURTEEN_ACTIVE_CONNECT_PROMISE__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_SELECTED_WALLET_ID__ = null;
  } catch (_) {}

  try {
    win.__FOURTEEN_AUTO_CONNECT_LOCK__ = false;
  } catch (_) {}
}

function clearInjectedWalletHints() {
  const win = getWindowSafe();
  if (!win) return;

  const clearAddress = (target) => {
    if (!target) return;

    try {
      if (target.defaultAddress && typeof target.defaultAddress === 'object') {
        target.defaultAddress.base58 = false;
        target.defaultAddress.hex = false;
      }
    } catch (_) {}

    try {
      if ('selectedAddress' in target) {
        target.selectedAddress = null;
      }
    } catch (_) {}

    try {
      if ('address' in target && typeof target.address === 'string') {
        target.address = null;
      }
    } catch (_) {}
  };

  clearAddress(win.tronWeb);
  clearAddress(win.tronLink);
  clearAddress(win.tronLink?.tronWeb);
  clearAddress(win.okxwallet);
  clearAddress(win.okxwallet?.tronWeb);
  clearAddress(win.okxWallet);
  clearAddress(win.okxWallet?.tronWeb);
  clearAddress(win.tp);
  clearAddress(win.tp?.tronWeb);
  clearAddress(win.tokenPocket);
  clearAddress(win.tokenPocket?.tronWeb);
  clearAddress(win.bitkeep);
  clearAddress(win.bitkeep?.tronWeb);
  clearAddress(win.bitget);
  clearAddress(win.bitget?.tronWeb);
  clearAddress(win.trustwallet);
  clearAddress(win.trustwallet?.tronWeb);
  clearAddress(win.trustWallet);
  clearAddress(win.trustWallet?.tronWeb);
}

function buildAvailableWallets(adapters = []) {
  return adapters.map((adapter) => ({
    id: getAdapterId(adapter) || getAdapterName(adapter),
    name: getAdapterName(adapter),
    readyState: adapter?.readyState || 'Unknown',
    connected: false
  }));
}

function buildDisconnectedState(availableWallets = []) {
  return {
    initialized: true,
    connecting: false,
    connected: false,
    walletPickerOpen: true,

    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,

    provider: null,
    tronWeb: null,

    address: null,
    shortAddress: null,

    trxBalance: null,
    fourteenBalance: null,

    error: null,
    availableWallets
  };
}

export async function disconnectWallet(appkit) {
  const adapters = resolveAdapters(appkit);

  try {
    setWalletState({
      connecting: false,
      error: null
    });

    if (appkit && typeof appkit.closeWalletPicker === 'function') {
      try {
        appkit.closeWalletPicker();
      } catch (_) {}
    }

    if (appkit && typeof appkit.disconnect === 'function') {
      try {
        await appkit.disconnect();
      } catch (error) {
        console.warn('[4TEEN] appkit.disconnect failed', error);
      }
    }

    for (const adapter of adapters) {
      await safeDisconnectAdapter(adapter);

      if (isWalletConnectAdapter(adapter)) {
        clearWalletConnectStorage();
      }
    }

    if (appkit) {
      try {
        appkit.connectedAdapter = null;
      } catch (_) {}
    }

    clearRuntimeCaches();
    clearInjectedWalletHints();
    clearWalletConnectStorage();
  } finally {
    resetWalletState();

    const availableWallets = buildAvailableWallets(adapters);

    setWalletState(buildDisconnectedState(availableWallets));
  }

  return { ok: true };
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/actions/refreshWalletBalances.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

let refreshInFlight = false;
let lastRefreshAt = 0;
let lastRefreshSignature = null;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function buildRefreshSignature(walletId, address) {
  return `${walletId || 'none'}::${address || 'none'}`;
}

function resolveProvider(appkit, state) {
  if (state?.provider) {
    return state.provider;
  }

  if (appkit && typeof appkit.getWalletProvider === 'function') {
    return appkit.getWalletProvider() || null;
  }

  if (appkit && typeof appkit.getConnectedAdapter === 'function') {
    const adapter = appkit.getConnectedAdapter();

    return (
      adapter?.provider ||
      adapter?.tronWeb ||
      adapter?.wallet ||
      adapter?.walletProvider ||
      adapter?.connector?.provider ||
      null
    );
  }

  return null;
}

function clearBalances(errorMessage = null) {
  setWalletState({
    trxBalance: null,
    fourteenBalance: null,
    error: errorMessage
  });
}

export async function refreshWalletBalances(appkit = null, options = {}) {
  const {
    force = false,
    minIntervalMs = 1200
  } = options;

  const state = getWalletState();
  const walletId = state.activeWalletId || state.walletId || null;
  const address = state.address || null;
  const provider = resolveProvider(appkit, state);

  if (!isUsableAddress(address)) {
    clearBalances(null);

    return {
      ok: false,
      refreshed: false,
      reason: 'missing_address'
    };
  }

  const now = Date.now();
  const signature = buildRefreshSignature(walletId, address);

  if (!force) {
    if (refreshInFlight) {
      return {
        ok: false,
        refreshed: false,
        reason: 'in_flight'
      };
    }

    if (
      now - lastRefreshAt < minIntervalMs &&
      lastRefreshSignature === signature
    ) {
      return {
        ok: true,
        refreshed: false,
        reason: 'throttled'
      };
    }
  }

  refreshInFlight = true;
  lastRefreshAt = now;

  try {
    await refreshAllBalances({
      address,
      walletId,
      provider
    });

    lastRefreshSignature = signature;

    return {
      ok: true,
      refreshed: true,
      error: null
    };
  } catch (error) {
    console.error('[4TEEN] refreshWalletBalances failed', error);

    setWalletState({
      error: error?.message || 'refreshWalletBalances failed'
    });

    return {
      ok: false,
      refreshed: false,
      error
    };
  } finally {
    refreshInFlight = false;
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/actions/restoreWalletSession.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { resolveAddress } from '../../adapters/shared/addressResolver.js';
import { forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { assertSigningCapability } from '../../adapters/shared/signingReadiness.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

let restoreInFlight = false;
let lastRestoreAt = 0;
let lastRestoreSignature = null;

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

function resolveAdapters(appkit) {
  if (!appkit) return [];

  if (Array.isArray(appkit.adapters)) {
    return appkit.adapters;
  }

  if (typeof appkit.getConnectors === 'function') {
    const adapters = appkit.getConnectors();
    return Array.isArray(adapters) ? adapters : [];
  }

  if (Array.isArray(appkit.connectors)) {
    return appkit.connectors;
  }

  return [];
}

function resolveProviderFromAdapter(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter?.provider,
    adapter?.tronWeb,
    adapter?.wallet,
    adapter?.walletProvider,
    adapter?.connector?.provider
  ].filter(Boolean);

  for (const provider of candidates) {
    if (
      provider?.tronWeb?.defaultAddress?.base58 ||
      provider?.defaultAddress?.base58 ||
      provider?.selectedAddress ||
      provider?.address
    ) {
      return provider;
    }
  }

  return candidates[0] || null;
}

function scoreAdapter(adapter, activeWalletId = null) {
  const adapterId = getAdapterId(adapter);
  const adapterName = getAdapterName(adapter);
  const provider = resolveProviderFromAdapter(adapter);
  const address = resolveAddress(adapter, provider);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (
    activeWalletId &&
    (activeWalletId === adapterId || activeWalletId === adapterName)
  ) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  return score;
}

function pickRestorableAdapter(appkit) {
  const state = getWalletState();

  if (typeof appkit?.getConnectedAdapter === 'function') {
    const connectedAdapter = appkit.getConnectedAdapter();

    if (connectedAdapter) {
      const provider =
        typeof appkit.getWalletProvider === 'function'
          ? appkit.getWalletProvider()
          : resolveProviderFromAdapter(connectedAdapter);

      const address = resolveAddress(connectedAdapter, provider);

      if (isUsableAddress(address)) {
        return {
          adapter: connectedAdapter,
          provider,
          address
        };
      }
    }
  }

  const adapters = resolveAdapters(appkit);
  if (!adapters.length) {
    return null;
  }

  const ranked = [...adapters].sort((a, b) => {
    return scoreAdapter(b, state.activeWalletId) - scoreAdapter(a, state.activeWalletId);
  });

  for (const adapter of ranked) {
    const provider = resolveProviderFromAdapter(adapter);
    const address = resolveAddress(adapter, provider);

    if (adapter?.connected && isUsableAddress(address)) {
      return {
        adapter,
        provider,
        address
      };
    }
  }

  for (const adapter of ranked) {
    const provider = resolveProviderFromAdapter(adapter);
    const address = resolveAddress(adapter, provider);

    if (isUsableAddress(address)) {
      return {
        adapter,
        provider,
        address
      };
    }
  }

  return null;
}

function buildDisconnectedPatch() {
  return {
    connecting: false,
    connected: false,
    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,
    address: null,
    shortAddress: null,
    provider: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null,
    error: null
  };
}

function buildConnectedPatch({ walletId, walletName, address, provider }) {
  return {
    initialized: true,
    connecting: false,
    connected: true,
    walletId,
    walletName,
    activeWalletId: walletId,
    activeWalletName: walletName,
    selectedWalletId: walletId,
    address,
    shortAddress: shortenAddress(address),
    provider,
    tronWeb: provider?.tronWeb || provider || null,
    walletPickerOpen: false,
    error: null
  };
}

function buildRestoreSignature(walletId, address) {
  return `${walletId || 'none'}::${address || 'none'}`;
}

function clearRestoreState() {
  setWalletState(buildDisconnectedPatch());
  lastRestoreSignature = null;
}

export async function restoreWalletSession(appkit) {
  const now = Date.now();

  if (!appkit) {
    return {
      ok: false,
      restored: false,
      error: new Error('Wallet kit not initialized')
    };
  }

  if (restoreInFlight) {
    return { ok: false, restored: false };
  }

  if (now - lastRestoreAt < 500) {
    return { ok: false, restored: false };
  }

  restoreInFlight = true;
  lastRestoreAt = now;

  try {
    const selected = pickRestorableAdapter(appkit);

    if (!selected) {
      clearRestoreState();
      return { ok: true, restored: false };
    }

    const { adapter, provider, address } = selected;

    if (!provider || !isUsableAddress(address)) {
      clearRestoreState();
      return { ok: true, restored: false };
    }

    await forceBindTronWeb(provider, address);

    const walletName = getAdapterName(adapter);
    const walletId = getAdapterId(adapter) || walletName;
    const restoreSignature = buildRestoreSignature(walletId, address);
    const state = getWalletState();

    if (
      state.connected &&
      state.address === address &&
      state.activeWalletId === walletId &&
      lastRestoreSignature === restoreSignature
    ) {
      return {
        ok: true,
        restored: true,
        session: {
          walletId,
          walletName,
          address,
          provider,
          tronWeb: state.tronWeb || provider?.tronWeb || provider || null
        },
        error: null
      };
    }

    setWalletState(
      buildConnectedPatch({
        walletId,
        walletName,
        address,
        provider
      })
    );

    lastRestoreSignature = restoreSignature;

    const balances = await refreshAllBalances({
      address,
      walletId,
      provider,
      force: true
    });

    const latestState = getWalletState();

    const signing = assertSigningCapability({
      connected: true,
      address: latestState.address,
      provider: latestState.provider,
      tronWeb: latestState.tronWeb
    });

    return {
      ok: true,
      restored: true,
      session: {
        walletId,
        walletName,
        address,
        provider,
        tronWeb: latestState.tronWeb || provider?.tronWeb || provider || null,
        balances,
        signing
      },
      error: null
    };
  } catch (error) {
    console.error('[4TEEN] restoreWalletSession failed', error);

    setWalletState({
      ...buildDisconnectedPatch(),
      error: error?.message || 'restoreWalletSession failed'
    });

    lastRestoreSignature = null;

    return {
      ok: false,
      restored: false,
      session: null,
      error
    };
  } finally {
    restoreInFlight = false;
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/core/walletManager.js

```js
import { bindAdapterEvents } from '../runtime/bindAdapterEvents.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { readAddressFromAdapter } from '../../adapters/shared/addressResolver.js';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

function createNoopScheduler() {
  return {
    scheduleRestore() {},
    scheduleAutoConnect() {},
    clearAll() {}
  };
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

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function getConnectedAdapterPriority(adapter, activeWalletId = null) {
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const address = readAddressFromAdapter(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (activeWalletId && (activeWalletId === adapterId || activeWalletId === adapterName)) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score += 50;
  }

  return score;
}

function resolveConnectedAdapter(adapters = [], activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;
    return !!adapter?.connected || !!readAddressFromAdapter(adapter);
  });

  if (!connectedAdapters.length) {
    return null;
  }

  const ranked = [...connectedAdapters].sort((a, b) => {
    return (
      getConnectedAdapterPriority(b, activeWalletId) -
      getConnectedAdapterPriority(a, activeWalletId)
    );
  });

  return ranked[0] || null;
}

function mapAvailableWallets(adapters = [], activeWalletId = null) {
  const connectedAdapter = resolveConnectedAdapter(adapters, activeWalletId);

  return adapters.map((adapter) => {
    const adapterId = getAdapterId(adapter) || getAdapterName(adapter);
    const adapterName = getAdapterName(adapter);
    const readyState = String(adapter?.readyState || 'Unknown');

    return {
      id: adapterId,
      name: adapterName,
      readyState,
      connected: !!(
        connectedAdapter &&
        (
          getAdapterId(connectedAdapter) === adapterId ||
          getAdapterName(connectedAdapter) === adapterName
        )
      )
    };
  });
}

export function createWalletManager({
  adapters = [],
  scheduler = null
} = {}) {
  const runtimeScheduler = scheduler || createNoopScheduler();

  const manager = {
    adapters: Array.isArray(adapters) ? adapters : [],
    connectedAdapter: null,

    refreshAvailableWallets() {
      const state = getWalletState();
      const activeWalletId = state.activeWalletId || null;

      this.connectedAdapter = resolveConnectedAdapter(this.adapters, activeWalletId);

      const availableWallets = mapAvailableWallets(this.adapters, activeWalletId);

      setWalletState({
        availableWallets
      });

      return availableWallets;
    },

    getAdapterById(walletId) {
      if (!walletId) {
        return null;
      }

      return (
        this.adapters.find((adapter) => {
          return (
            getAdapterId(adapter) === walletId ||
            getAdapterName(adapter) === walletId
          );
        }) || null
      );
    },

    getConnectedAdapter() {
      const state = getWalletState();

      this.connectedAdapter = resolveConnectedAdapter(
        this.adapters,
        state.activeWalletId || null
      );

      return this.connectedAdapter || null;
    },

    getWalletProvider() {
      const adapter = this.getConnectedAdapter();

      if (!adapter) {
        return null;
      }

      return (
        adapter?.provider ||
        adapter?.tronWeb ||
        adapter?.wallet ||
        adapter?.walletProvider ||
        adapter?.connector?.provider ||
        null
      );
    },

    selectWallet(walletId) {
      const adapter = this.getAdapterById(walletId);

      if (!adapter) {
        return null;
      }

      const adapterKey = getAdapterId(adapter) || getAdapterName(adapter);

      setWalletState({
        selectedWalletId: adapterKey,
        activeWalletId: adapterKey
      });

      return adapter;
    },

    openWalletPicker() {
      const connectedAdapter = this.getConnectedAdapter();

      setWalletState({
        walletPickerOpen: !connectedAdapter
      });
    },

    closeWalletPicker() {
      setWalletState({
        walletPickerOpen: false
      });
    },

    bindEvents() {
      this.adapters.forEach((adapter) => {
        bindAdapterEvents(this, adapter, {
          isWalletBrowser,
          resolveConnectedAdapter: () => {
            const state = getWalletState();

            return resolveConnectedAdapter(
              this.adapters,
              state.activeWalletId || null
            );
          },
          refreshAvailableWallets: () => {
            this.refreshAvailableWallets();
          },
          scheduleRestore: (delay = 120) => {
            runtimeScheduler.scheduleRestore(this, delay);
          },
          scheduleAutoConnect: (delay = 120) => {
            runtimeScheduler.scheduleAutoConnect(this, delay);
          }
        });
      });
    },

    destroy() {
      this.connectedAdapter = null;

      if (typeof runtimeScheduler.clearAll === 'function') {
        runtimeScheduler.clearAll();
      }
    }
  };

  return manager;
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/runtime/bindAdapterEvents.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

function safeCall(fn, ...args) {
  if (typeof fn !== 'function') return;
  try {
    return fn(...args);
  } catch (error) {
    console.error('[4TEEN] bindAdapterEvents callback failed', error);
  }
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

function matchesAdapter(adapter, target) {
  if (!adapter || !target) return false;

  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);

  return target === adapterName || target === adapterId;
}

function getAdapterKey(adapter) {
  return getAdapterId(adapter) || getAdapterName(adapter) || 'Wallet';
}

function applyConnectedAdapterState(adapter) {
  const adapterKey = getAdapterKey(adapter);

  setWalletState({
    activeWalletId: adapterKey,
    selectedWalletId: adapterKey,
    walletPickerOpen: false
  });
}

function clearConnectedAdapterStateIfMatches(adapter) {
  const state = getWalletState();

  if (!matchesAdapter(adapter, state.activeWalletId)) {
    return;
  }

  setWalletState({
    activeWalletId: null,
    selectedWalletId: null
  });
}

function tryBindEvent(adapter, eventName, handler) {
  if (!adapter || typeof adapter.on !== 'function') {
    return;
  }

  try {
    adapter.on(eventName, handler);
  } catch (error) {
    console.error(`[4TEEN] failed to bind ${eventName} event`, {
      adapter: getAdapterName(adapter),
      error
    });
  }
}

export function bindAdapterEvents(kit, adapter, options = {}) {
  const {
    onReadyStateChanged,
    onConnected,
    onDisconnected,
    onAccountsChanged,
    scheduleRestore,
    scheduleAutoConnect,
    isWalletBrowser,
    resolveConnectedAdapter,
    refreshAvailableWallets
  } = options;

  let lastConnectAt = 0;
  let lastAccountsChangedAt = 0;
  let lastDisconnectAt = 0;
  let lastConnectedAdapterKey = null;
  let lastAccountsAdapterKey = null;

  function shouldIgnoreDuplicate(type, adapterLike, windowMs = 1200) {
    const now = Date.now();
    const adapterKey = getAdapterKey(adapterLike);

    if (type === 'connect') {
      const duplicate =
        lastConnectedAdapterKey === adapterKey &&
        now - lastConnectAt < windowMs;

      lastConnectedAdapterKey = adapterKey;
      lastConnectAt = now;
      return duplicate;
    }

    if (type === 'accountsChanged') {
      const duplicate =
        lastAccountsAdapterKey === adapterKey &&
        now - lastAccountsChangedAt < windowMs;

      lastAccountsAdapterKey = adapterKey;
      lastAccountsChangedAt = now;
      return duplicate;
    }

    if (type === 'disconnect') {
      const duplicate = now - lastDisconnectAt < windowMs;
      lastDisconnectAt = now;
      return duplicate;
    }

    return false;
  }

  tryBindEvent(adapter, 'readyStateChanged', () => {
    safeCall(refreshAvailableWallets);

    if (safeCall(isWalletBrowser)) {
      safeCall(scheduleAutoConnect, 120);
    }

    safeCall(onReadyStateChanged);
  });

  tryBindEvent(adapter, 'connect', () => {
    const normalized = safeCall(resolveConnectedAdapter) || adapter;

    if (shouldIgnoreDuplicate('connect', normalized, 1500)) {
      return;
    }

    const state = getWalletState();
    const normalizedKey = getAdapterKey(normalized);
    const alreadySameAdapter =
      state.connected &&
      (state.activeWalletId === normalizedKey || state.selectedWalletId === normalizedKey);

    if (kit) {
      kit.connectedAdapter = normalized || adapter;
    }

    applyConnectedAdapterState(normalized || adapter);
    safeCall(refreshAvailableWallets);

    if (!alreadySameAdapter) {
      safeCall(scheduleRestore, 100);
    }

    safeCall(onConnected, normalized || adapter);
  });

  tryBindEvent(adapter, 'disconnect', () => {
    if (shouldIgnoreDuplicate('disconnect', adapter, 1000)) {
      return;
    }

    clearConnectedAdapterStateIfMatches(adapter);

    if (
      kit?.connectedAdapter &&
      matchesAdapter(adapter, getAdapterId(kit.connectedAdapter) || getAdapterName(kit.connectedAdapter))
    ) {
      kit.connectedAdapter = null;
    }

    safeCall(refreshAvailableWallets);
    safeCall(scheduleRestore, 120);

    if (safeCall(isWalletBrowser)) {
      safeCall(scheduleAutoConnect, 250);
    }

    safeCall(onDisconnected, adapter);
  });

  tryBindEvent(adapter, 'accountsChanged', () => {
    const normalized = safeCall(resolveConnectedAdapter) || adapter;

    if (shouldIgnoreDuplicate('accountsChanged', normalized, 1500)) {
      return;
    }

    const state = getWalletState();
    const normalizedKey = getAdapterKey(normalized);
    const alreadySameAdapter =
      state.connected &&
      (state.activeWalletId === normalizedKey || state.selectedWalletId === normalizedKey);

    if (kit) {
      kit.connectedAdapter = normalized;
    }

    if (!normalized) {
      setWalletState({
        activeWalletId: null,
        selectedWalletId: null
      });
    }

    safeCall(refreshAvailableWallets);

    if (!alreadySameAdapter) {
      safeCall(scheduleRestore, 120);
    }

    safeCall(onAccountsChanged, normalized || adapter);
  });
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/runtime/buildWalletKitRuntime.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { refreshAvailableWallets } from './refreshAvailableWallets.js';
import { bindAdapterEvents } from './bindAdapterEvents.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';

function createNoopScheduler() {
  return {
    scheduleRestore() {},
    scheduleAutoConnect() {},
    clearAll() {}
  };
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

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function readAddressFromAdapter(adapter) {
  if (!adapter) return null;

  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.address,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const value of candidates) {
    if (isUsableAddress(value)) {
      return value;
    }
  }

  return null;
}

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function getConnectedAdapterPriority(adapter, activeWalletId = null) {
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const address = readAddressFromAdapter(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (activeWalletId && (activeWalletId === adapterId || activeWalletId === adapterName)) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score += 50;
  }

  return score;
}

function resolveConnectedAdapter(adapters = [], activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;
    return !!adapter?.connected || !!readAddressFromAdapter(adapter);
  });

  if (!connectedAdapters.length) {
    return null;
  }

  const ranked = [...connectedAdapters].sort((a, b) => {
    return (
      getConnectedAdapterPriority(b, activeWalletId) -
      getConnectedAdapterPriority(a, activeWalletId)
    );
  });

  return ranked[0] || null;
}

export function buildWalletKitRuntime({
  projectId = null,
  adapters = [],
  scheduler = null
} = {}) {
  const runtimeScheduler = scheduler || createNoopScheduler();

  const runtime = {
    projectId,
    adapters: Array.isArray(adapters) ? adapters : [],
    connectedAdapter: null,

    refreshAvailableWallets() {
      return refreshAvailableWallets(this);
    },

    getAdapterById(walletId) {
      if (!walletId) {
        return null;
      }

      return (
        this.adapters.find((adapter) => {
          return (
            getAdapterId(adapter) === walletId ||
            getAdapterName(adapter) === walletId
          );
        }) || null
      );
    },

    getConnectedAdapter() {
      const state = getWalletState();
      const activeWalletId = state.activeWalletId || null;

      this.connectedAdapter = resolveConnectedAdapter(
        this.adapters,
        activeWalletId
      );

      return this.connectedAdapter || null;
    },

    getWalletProvider() {
      const adapter = this.getConnectedAdapter();

      if (!adapter) {
        return null;
      }

      return (
        adapter?.provider ||
        adapter?.tronWeb ||
        adapter?.wallet ||
        adapter?.walletProvider ||
        adapter?.connector?.provider ||
        null
      );
    },

    selectWallet(walletId) {
      const adapter = this.getAdapterById(walletId);

      if (!adapter) {
        return null;
      }

      const adapterKey = getAdapterId(adapter) || getAdapterName(adapter);

      setWalletState({
        selectedWalletId: adapterKey,
        activeWalletId: adapterKey
      });

      return adapter;
    },

    openWalletPicker() {
      const connectedAdapter = this.getConnectedAdapter();

      setWalletState({
        walletPickerOpen: !connectedAdapter
      });
    },

    closeWalletPicker() {
      setWalletState({
        walletPickerOpen: false
      });
    },

    bindEvents() {
      this.adapters.forEach((adapter) => {
        bindAdapterEvents(this, adapter, {
          isWalletBrowser,
          resolveConnectedAdapter: () => {
            const state = getWalletState();

            return resolveConnectedAdapter(
              this.adapters,
              state.activeWalletId || null
            );
          },
          refreshAvailableWallets: () => {
            this.refreshAvailableWallets();
          },
          scheduleRestore: (delay = 120) => {
            runtimeScheduler.scheduleRestore(this, delay);
          },
          scheduleAutoConnect: (delay = 120) => {
            runtimeScheduler.scheduleAutoConnect(this, delay);
          }
        });
      });
    },

    destroy() {
      this.connectedAdapter = null;

      if (typeof runtimeScheduler.clearAll === 'function') {
        runtimeScheduler.clearAll();
      }
    }
  };

  return runtime;
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/runtime/refreshAvailableWallets.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { readAddressFromAdapter } from '../../adapters/shared/addressResolver.js';

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

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function getConnectedAdapterPriority(adapter, activeWalletId = null) {
  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const address = readAddressFromAdapter(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (activeWalletId && (activeWalletId === adapterId || activeWalletId === adapterName)) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score += 50;
  }

  return score;
}

function resolveConnectedAdapter(adapters = [], activeWalletId = null) {
  const connectedAdapters = adapters.filter((adapter) => {
    if (!adapter) return false;
    return !!adapter?.connected || !!readAddressFromAdapter(adapter);
  });

  if (!connectedAdapters.length) {
    return null;
  }

  const ranked = [...connectedAdapters].sort((a, b) => {
    return (
      getConnectedAdapterPriority(b, activeWalletId) -
      getConnectedAdapterPriority(a, activeWalletId)
    );
  });

  return ranked[0] || null;
}

function mapAvailableWallets(adapters = [], connectedAdapter = null) {
  return adapters.map((adapter) => {
    const adapterId = getAdapterId(adapter) || getAdapterName(adapter);
    const adapterName = getAdapterName(adapter);
    const readyState = String(adapter?.readyState || 'Unknown');

    return {
      id: adapterId,
      name: adapterName,
      readyState,
      connected: !!(
        connectedAdapter &&
        (
          getAdapterId(connectedAdapter) === adapterId ||
          getAdapterName(connectedAdapter) === adapterName
        )
      )
    };
  });
}

export function refreshAvailableWallets(appkit) {
  const adapters = Array.isArray(appkit?.adapters) ? appkit.adapters : [];
  const state = getWalletState();
  const activeWalletId = state.activeWalletId || null;

  const connectedAdapter = resolveConnectedAdapter(adapters, activeWalletId);
  const availableWallets = mapAvailableWallets(adapters, connectedAdapter);

  if (appkit) {
    appkit.connectedAdapter = connectedAdapter || null;
  }

  setWalletState({
    availableWallets
  });

  return availableWallets;
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/runtime/resolveAutoWallet.js

```js
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
```

---

## FILE: 4teen-wallet-kit :: src/wallet/runtime/waitAdaptersReady.js

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isReadyStateUsable(readyState) {
  const state = String(readyState || '');

  return (
    state === 'Found' ||
    state === 'Installed' ||
    state === 'Loadable'
  );
}

export async function waitAdaptersReady(adapters = [], options = {}) {
  const {
    attempts = 12,
    intervalMs = 200
  } = options;

  const normalizedAdapters = Array.isArray(adapters) ? adapters : [];

  if (!normalizedAdapters.length) {
    return {
      ok: true,
      ready: false,
      attempts: 0
    };
  }

  for (let i = 0; i < attempts; i++) {
    const anyReady = normalizedAdapters.some((adapter) => {
      return isReadyStateUsable(adapter?.readyState);
    });

    if (anyReady) {
      return {
        ok: true,
        ready: true,
        attempts: i + 1
      };
    }

    await sleep(intervalMs);
  }

  return {
    ok: true,
    ready: false,
    attempts
  };
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/runtime/walletScheduler.js

```js
import { getWalletState } from '../../core/store/walletStore.js';
import { detectBrowserWalletName, isWalletBrowser } from '../../adapters/shared/browserDetection.js';
import { readAddressFromAdapter } from '../../adapters/shared/addressResolver.js';
import { restoreWalletSession } from '../actions/restoreWalletSession.js';

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

function isWalletConnectAdapter(adapter) {
  const adapterId = String(getAdapterId(adapter) || '').trim().toLowerCase();
  const adapterName = String(getAdapterName(adapter) || '').trim().toLowerCase();

  return adapterId === 'walletconnect' || adapterName === 'walletconnect';
}

function getAutoConnectPriority(adapter, browserWalletName) {
  if (!adapter) return -100000;

  const adapterName = getAdapterName(adapter);
  const adapterId = getAdapterId(adapter);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const address = readAddressFromAdapter(adapter);

  let score = 0;

  if (address) score += 20000;
  if (connected) score += 15000;

  if (browserWalletName && (adapterName === browserWalletName || adapterId === browserWalletName)) {
    score += 12000;
  }

  if (readyState === 'Found') score += 800;
  if (readyState === 'Installed') score += 700;
  if (readyState === 'Loadable') score += 400;
  if (readyState === 'Loading') score += 100;

  if (isWalletConnectAdapter(adapter)) {
    score -= 5000;
  }

  if (
    browserWalletName &&
    adapterName !== browserWalletName &&
    adapterId !== browserWalletName &&
    !isWalletConnectAdapter(adapter)
  ) {
    score -= 30000;
  }

  return score;
}

async function safeConnectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    return false;
  }

  try {
    await adapter.connect();
    return true;
  } catch (error) {
    const message = String(error?.message || '').toLowerCase();

    if (
      message.includes('already connected') ||
      message.includes('session currently connected') ||
      message.includes('connection already open')
    ) {
      return true;
    }

    if (
      message.includes('user rejected') ||
      message.includes('no accounts found in session')
    ) {
      return false;
    }

    console.warn('[4TEEN] auto connect adapter failed', {
      adapter: getAdapterName(adapter),
      error
    });

    return false;
  }
}

function pickAutoConnectAdapter(adapters = []) {
  const browserWalletName = detectBrowserWalletName();

  if (!browserWalletName) {
    return null;
  }

  const ranked = adapters
    .filter(Boolean)
    .filter((adapter) => !isWalletConnectAdapter(adapter))
    .sort((a, b) => {
      return (
        getAutoConnectPriority(b, browserWalletName) -
        getAutoConnectPriority(a, browserWalletName)
      );
    });

  const best = ranked[0] || null;

  if (!best) {
    return null;
  }

  const bestName = getAdapterName(best);
  const bestId = getAdapterId(best);

  if (bestName !== browserWalletName && bestId !== browserWalletName) {
    return null;
  }

  return best;
}

function hasConnectedAdapter(manager) {
  if (!manager || typeof manager.getConnectedAdapter !== 'function') {
    return false;
  }

  return !!manager.getConnectedAdapter();
}

function shouldAutoConnect(manager) {
  if (!isWalletBrowser()) return false;
  if (!manager) return false;

  const state = getWalletState();

  if (state.connecting) return false;
  if (state.connected) return false;
  if (state.address) return false;
  if (hasConnectedAdapter(manager)) return false;

  return true;
}

export function createWalletScheduler() {
  let restoreTimer = null;
  let autoConnectTimer = null;
  let autoConnectInFlight = false;

  return {
    scheduleRestore(manager, delay = 300) {
      if (restoreTimer) {
        clearTimeout(restoreTimer);
      }

      restoreTimer = setTimeout(() => {
        restoreWalletSession(manager).catch((error) => {
          console.error('[4TEEN] restoreWalletSession error', error);
        });
      }, delay);
    },

    scheduleAutoConnect(manager, delay = 250) {
      if (autoConnectTimer) {
        clearTimeout(autoConnectTimer);
      }

      autoConnectTimer = setTimeout(async () => {
        if (!shouldAutoConnect(manager) || autoConnectInFlight) {
          return;
        }

        const adapter = pickAutoConnectAdapter(manager?.adapters || []);
        if (!adapter) {
          return;
        }

        autoConnectInFlight = true;

        try {
          const connected = await safeConnectAdapter(adapter);

          if (connected && typeof manager?.refreshAvailableWallets === 'function') {
            manager.refreshAvailableWallets();
          }

          this.scheduleRestore(manager, 120);
        } finally {
          autoConnectInFlight = false;
        }
      }, delay);
    },

    clearAll() {
      if (restoreTimer) {
        clearTimeout(restoreTimer);
        restoreTimer = null;
      }

      if (autoConnectTimer) {
        clearTimeout(autoConnectTimer);
        autoConnectTimer = null;
      }

      autoConnectInFlight = false;
    }
  };
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/services/initWalletKit.js

```js
import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletState } from '../../core/store/walletStore.js';
import { createWalletManager } from '../core/walletManager.js';
import { createWalletScheduler } from '../runtime/walletScheduler.js';
import { waitAdaptersReady } from '../runtime/waitAdaptersReady.js';

let initialized = false;
let walletKit = null;
let walletScheduler = null;
let initInFlight = null;

function buildInitResult(appkit) {
  return {
    appkit,
    tronAdapter: null
  };
}

async function warmAdapters(manager) {
  try {
    await waitAdaptersReady(manager?.adapters || []);
    manager?.refreshAvailableWallets?.();
  } catch (error) {
    console.warn('[4TEEN] waitAdaptersReady warning', error);
  }
}

export async function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    walletKit.refreshAvailableWallets();
    return buildInitResult(walletKit);
  }

  if (initInFlight) {
    return initInFlight;
  }

  initInFlight = (async () => {
    try {
      const adapters = createWalletAdapters({ projectId });

      walletScheduler = createWalletScheduler();

      walletKit = createWalletManager({
        adapters,
        scheduler: walletScheduler
      });

      walletKit.bindEvents();
      walletKit.refreshAvailableWallets();

      initialized = true;

      setWalletState({
        initialized: true,
        error: null
      });

      void warmAdapters(walletKit);

      console.log('[4TEEN] wallet kit initialized');

      return buildInitResult(walletKit);
    } catch (error) {
      console.error('[4TEEN] initWalletKit failed', error);

      initialized = false;
      walletKit = null;

      walletScheduler?.clearAll?.();
      walletScheduler = null;

      setWalletState({
        initialized: false,
        error: error?.message || 'initWalletKit failed'
      });

      return buildInitResult(null);
    } finally {
      initInFlight = null;
    }
  })();

  return initInFlight;
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/services/restoreSession.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function isHexAddress(value) {
  return typeof value === 'string' && /^41[0-9a-fA-F]{40}$/.test(value);
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

function normalizeAddress(value, provider = null) {
  if (isUsableAddress(value)) {
    return value;
  }

  if (isHexAddress(value) && provider?.address?.fromHex) {
    try {
      const converted = provider.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  if (isHexAddress(value) && provider?.tronWeb?.address?.fromHex) {
    try {
      const converted = provider.tronWeb.address.fromHex(value);
      if (isUsableAddress(converted)) {
        return converted;
      }
    } catch (_) {}
  }

  return null;
}

function resolveAddress(adapter, provider) {
  const candidates = [
    adapter?.address,
    adapter?.publicKey,
    adapter?.account?.address,
    adapter?.account?.publicKey,
    adapter?.provider?.address,
    adapter?.provider?.selectedAddress,
    adapter?.provider?.defaultAddress?.base58,
    adapter?.provider?.tronWeb?.defaultAddress?.base58,
    adapter?.tronWeb?.defaultAddress?.base58,
    adapter?.wallet?.defaultAddress?.base58,
    adapter?.walletProvider?.defaultAddress?.base58,
    adapter?.connector?.provider?.address,
    adapter?.connector?.provider?.selectedAddress,
    adapter?.connector?.provider?.defaultAddress?.base58,
    adapter?.connector?.provider?.tronWeb?.defaultAddress?.base58,
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const candidate of candidates) {
    const normalized = normalizeAddress(candidate, provider);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

function getProviderFromManager(manager, adapter = null) {
  if (adapter) {
    return (
      adapter?.provider ||
      adapter?.tronWeb ||
      adapter?.wallet ||
      adapter?.walletProvider ||
      adapter?.connector?.provider ||
      null
    );
  }

  if (!manager || typeof manager.getWalletProvider !== 'function') {
    return null;
  }

  return manager.getWalletProvider();
}

async function forceBindTronWeb(provider, address) {
  if (!provider || !address) return;

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

function buildDisconnectedPatch() {
  return {
    connecting: false,
    connected: false,
    walletId: null,
    walletName: null,
    address: null,
    shortAddress: null,
    provider: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null
  };
}

function buildConnectedPatch({ walletId, walletName, address, provider }) {
  return {
    connecting: false,
    connected: true,
    walletId,
    walletName,
    activeWalletId: walletId,
    activeWalletName: walletName,
    selectedWalletId: walletId,
    address,
    shortAddress: shortenAddress(address),
    provider,
    tronWeb: provider?.tronWeb || provider || null,
    walletPickerOpen: false,
    error: null
  };
}

function resolveActiveAdapter(manager) {
  if (!manager || typeof manager.getConnectedAdapter !== 'function') {
    return null;
  }

  return manager.getConnectedAdapter();
}

export async function restoreSession(manager) {
  try {
    const adapter = resolveActiveAdapter(manager);

    if (!adapter) {
      setWalletState(buildDisconnectedPatch());
      return { ok: true, restored: false };
    }

    const provider = getProviderFromManager(manager, adapter);
    const address = resolveAddress(adapter, provider);

    if (!isUsableAddress(address)) {
      setWalletState(buildDisconnectedPatch());
      return { ok: true, restored: false };
    }

    await forceBindTronWeb(provider, address);

    const walletId = getAdapterId(adapter) || getAdapterName(adapter);
    const walletName = getAdapterName(adapter);

    setWalletState(
      buildConnectedPatch({
        walletId,
        walletName,
        address,
        provider
      })
    );

    const state = getWalletState();

    await refreshAllBalances({
      address: state.address,
      walletId: state.activeWalletId,
      provider: state.provider
    });

    return {
      ok: true,
      restored: true,
      address,
      walletId
    };
  } catch (error) {
    console.error('[4TEEN] restoreSession failed', error);

    setWalletState({
      ...buildDisconnectedPatch(),
      error: error?.message || 'restoreSession failed'
    });

    return {
      ok: false,
      restored: false,
      error
    };
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/session/failWalletConnection.js

```js
import { setWalletState } from '../../core/store/walletStore.js';

function buildDisconnectedPatch(errorMessage = 'Wallet connection failed') {
  return {
    connecting: false,
    connected: false,
    walletId: null,
    walletName: null,
    activeWalletId: null,
    activeWalletName: null,
    selectedWalletId: null,
    address: null,
    shortAddress: null,
    provider: null,
    tronWeb: null,
    trxBalance: null,
    fourteenBalance: null,
    walletPickerOpen: true,
    error: errorMessage
  };
}

export function failWalletConnection(error) {
  const message = error?.message || 'Wallet connection failed';

  console.error('[4TEEN] connectWallet failed', error);

  setWalletState(buildDisconnectedPatch(message));

  return {
    ok: false,
    session: null,
    error
  };
}
```

---

## FILE: 4teen-wallet-kit :: src/wallet/session/finalizeWalletConnection.js

```js
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { forceBindTronWeb } from '../../adapters/shared/accountRequests.js';
import { assertSigningCapability } from '../../adapters/shared/signingReadiness.js';
import { refreshAllBalances } from '../../services/balances/refreshAllBalances.js';

function isValidAddress(address) {
  return typeof address === 'string' && address.startsWith('T') && address.length === 34;
}

function resolveTronWeb(provider) {
  return (
    provider?.tronWeb ||
    provider ||
    window?.tronWeb ||
    window?.tronweb ||
    null
  );
}

function buildConnectedPatch({ walletId, walletName, address, provider }) {
  return {
    connecting: false,
    connected: true,
    walletId,
    walletName,
    activeWalletId: walletId,
    activeWalletName: walletName,
    selectedWalletId: walletId,
    address,
    shortAddress: shortenAddress(address),
    provider,
    tronWeb: resolveTronWeb(provider),
    walletPickerOpen: false,
    error: null
  };
}

export async function finalizeWalletConnection({
  walletId,
  walletName,
  address,
  provider
}) {
  // 🔥 FIX 1: validate BEFORE anything
  if (!isValidAddress(address)) {
    throw new Error('wallet address is missing or invalid');
  }

  // 🔥 FIX 2: normalize provider
  const tronWeb = resolveTronWeb(provider);

  if (!tronWeb) {
    throw new Error('tronWeb not available');
  }

  // 🔥 FIX 3: bind only if needed
  try {
    await forceBindTronWeb(tronWeb, address);
  } catch (_) {}

  // 🔥 FIX 4: always set normalized provider
  setWalletState(
    buildConnectedPatch({
      walletId,
      walletName,
      address,
      provider: tronWeb
    })
  );

  const state = getWalletState();

  let balances = null;

  try {
    balances = await refreshAllBalances({
      address: state.address,
      walletId: state.activeWalletId,
      provider: state.provider,
      force: true
    });
  } catch (e) {
    console.warn('[4TEEN] balance read failed but continuing', e);
  }

  const latestState = getWalletState();

  let signing = null;

  try {
    signing = assertSigningCapability({
      connected: true,
      address: latestState.address,
      provider: latestState.provider,
      tronWeb: latestState.tronWeb
    });
  } catch (_) {}

  return {
    ok: true,
    session: {
      walletId,
      walletName,
      address,
      provider: latestState.provider,
      tronWeb: latestState.tronWeb,
      balances,
      signing
    },
    error: null
  };
}
```
