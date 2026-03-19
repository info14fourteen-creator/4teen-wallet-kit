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

function getInjectedFoxWalletContainer() {
  const win = getWindowSafe();
  if (!win) return null;

  return win.foxwallet || null;
}

function getInjectedFoxWalletProvider() {
  const win = getWindowSafe();
  if (!win) return null;

  return (
    win.foxwallet?.tronLink ||
    win.foxwallet?.tronWeb ||
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
    !!win?.foxwallet
  );
}

function getCandidateAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  return adapters.find(isMatchingAdapter) || null;
}

function getResolvedProvider(appkit, adapter = null) {
  const injected = getInjectedFoxWalletProvider();
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
  const methods = [
    ['tron_requestAccounts', []],
    ['requestAccounts', []],
    ['tron_requestAccounts', null],
    ['requestAccounts', null]
  ];

  for (const [method, params] of methods) {
    const result = await tryProviderRequest(provider, method, params || []);
    const address = extractFoxWalletAddress(result);

    if (isUsableAddress(address)) {
      return address;
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
    intervalMs = 120
  } = options;

  for (let i = 0; i < attempts; i++) {
    const provider = getResolvedProvider(appkit, adapter);
    const address = extractFoxWalletAddress(provider) || resolveAddress(adapter, provider);

    if (provider && (address || provider?.trx?.sign || provider?.tronWeb?.trx?.sign)) {
      return provider;
    }

    await sleep(intervalMs);
  }

  return getResolvedProvider(appkit, adapter);
}

async function waitForFoxWalletAddress(adapter, provider, connectResult = null, options = {}) {
  const {
    attempts = 20,
    intervalMs = 180,
    requestAccountAt = [0, 1, 2, 4, 8, 12, 16]
  } = options;

  for (let i = 0; i < attempts; i++) {
    const directAddress =
      extractFoxWalletAddress(connectResult) ||
      resolveAddress(adapter, provider) ||
      extractFoxWalletAddress(provider);

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

async function readFoxWalletTrxBalance(address, provider) {
  const candidates = [
    provider?.tronWeb,
    provider,
    getInjectedFoxWalletContainer()?.tronLink?.tronWeb,
    getInjectedFoxWalletContainer()?.tronWeb,
    getInjectedFoxWalletProvider()
  ].filter(Boolean);

  for (const tronWeb of candidates) {
    try {
      if (typeof tronWeb?.trx?.getBalance === 'function') {
        const balanceSun = await tronWeb.trx.getBalance(address);
        const value = Number((Number(balanceSun || 0) / 1_000_000).toFixed(6));

        if (Number.isFinite(value)) {
          return {
            ok: true,
            value,
            source: 'foxwallet_injected'
          };
        }
      }
    } catch (_) {}
  }

  return { ok: false, value: null };
}

export const foxWalletDriver = {
  id: DRIVER_ID,
  key: DRIVER_ID,
  name: DRIVER_NAME,
  type: 'injected',

  async connect(appkit) {
    const adapter = getCandidateAdapter(appkit);
    const connectResult = await connectAdapter(adapter);

    let provider = await waitForFoxWalletProvider(appkit, adapter);

    if (!provider) {
      provider = getInjectedFoxWalletProvider();
    }

    if (!provider) {
      throw new Error('FoxWallet provider not found');
    }

    const address = await waitForFoxWalletAddress(adapter, provider, connectResult);

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
      tronWeb: provider?.tronWeb || provider
    };
  },

  async readBalances(appkit, options = {}) {
    const provider = this.getProvider?.(appkit) || getInjectedFoxWalletProvider();
    const address = options.address || this.getAddress?.(appkit);

    if (!isUsableAddress(address)) {
      throw new Error('FoxWallet balances: invalid address');
    }

    // 🔥 Сначала пробуем через Fox injected
    const injected = await readFoxWalletTrxBalance(address, provider);

    let trxBalance = injected.value;

    // fallback на универсальный
    if (!injected.ok) {
      trxBalance = await readTrxBalance(address);
    }

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
  }
};

export function createFoxWalletDriver() {
  return foxWalletDriver;
}
