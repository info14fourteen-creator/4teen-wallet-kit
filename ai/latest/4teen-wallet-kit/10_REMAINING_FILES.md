# REPOSITORY: 4teen-wallet-kit
# SECTION: REMAINING FILES
# GENERATED_AT: 2026-03-25T17:14:04.749Z

## INCLUDED FILES

- examples/vanilla/index.html
- examples/vanilla/main.js
- src/core/config/appkit.js
- src/core/config/constants.js
- src/core/config/token.js
- src/core/config/wallets.js
- src/core/store/walletStore.js
- src/core/utils/address.js
- src/core/utils/format.js
- src/core/utils/tron.js
- src/debug/debugOverlay.js
- src/diagnostics/assertWalletSigning.js
- src/diagnostics/walletDiagnostics.js
- src/polyfills/node.js
- src/services/balances/getFourteenBalance.js
- src/services/balances/getTokenBalance.js
- src/services/balances/getTrxBalance.js
- src/services/balances/refreshAllBalances.js
- src/services/contracts/trc20.js
- src/services/readonly/getTokenContractData.js
- src/services/readonly/getTokenDecimals.js
- src/services/readonly/getTokenSymbol.js
- src/services/readonly/getTokenTotalSupply.js
- src/services/wallet/connectWallet.js
- src/services/wallet/disconnectWallet.js
- src/services/wallet/initWalletKit.js
- src/services/wallet/restoreSession.js

## REPOSITORY LINK BASE

- https://raw.githubusercontent.com/info14fourteen-creator/4teen-wallet-kit/main/ai/latest/4teen-wallet-kit

---

## FILE: examples/vanilla/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>4TEEN Connect Kit Demo</title>
  </head>
  <body>
    <div id="wallet-button"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

---

## FILE: examples/vanilla/main.js

```js
import { initFourteenConnect } from '../../src/index.js';

const buttonTarget = document.getElementById('wallet-button');

initFourteenConnect({
  projectId: 'YOUR_REOWN_PROJECT_ID',
  buttonTarget
});
```

---

## FILE: src/core/config/appkit.js

```js
import { createAppKit } from '@reown/appkit';
import { TronAdapter } from '@reown/appkit-adapter-tron';
import { tronMainnet } from '@reown/appkit/networks';
import { createWalletAdapters } from '../../adapters/createAdapters.js';

let appkitInstance = null;
let tronAdapterInstance = null;

const APP_METADATA = {
  name: '4TEEN Wallet Kit',
  description: 'Wallet connection layer for 4TEEN on TRON',
  url: 'https://4teen.me',
  icons: ['https://img2.creatium.app/disk2/4c/c7/a4/1c875d6b871b8c3824991c86b88e0a0f37/logo_sq_white.png']
};

export function createWalletModal({ projectId }) {
  if (appkitInstance) {
    return {
      appkit: appkitInstance,
      tronAdapter: tronAdapterInstance
    };
  }

  const walletAdapters = createWalletAdapters(projectId);

  tronAdapterInstance = new TronAdapter({
    walletAdapters
  });

  appkitInstance = createAppKit({
    projectId,
    metadata: APP_METADATA,
    networks: [tronMainnet],
    adapters: [tronAdapterInstance],
    features: {
      analytics: false
    }
  });

  return {
    appkit: appkitInstance,
    tronAdapter: tronAdapterInstance
  };
}
```

---

## FILE: src/core/config/constants.js

```js
export const TRON_MAINNET_CHAIN_ID = 'tron:0x2b6653dc';

export const APP_METADATA = {
  name: '4TEEN Connect Kit',
  description: 'Wallet connectivity layer for 4TEEN on TRON',
  url: 'https://4teen.me',
  icons: ['https://4teen.me/logo.png']
};

export const DEFAULT_BALANCE_DECIMALS = 2;
```

---

## FILE: src/core/config/token.js

```js
export const FOURTEEN_TOKEN = {
  name: '4TEEN',
  symbol: '4TEEN',
  address: 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A',
  decimals: 6,
  icon: '/src/assets/4teen.svg'
};
```

---

## FILE: src/core/config/wallets.js

```js
export const SUPPORTED_WALLETS = [
  'tronlink',
  'okx',
  'binance',
  'trust',
  'bitget',
  'tokenpocket',
  'metamask'
];
```

---

## FILE: src/core/store/walletStore.js

```js
const DEFAULT_STATE = {
  lifecycle: {
    initialized: false,
    connecting: false,
    connected: false
  },

  wallet: {
    id: null,
    name: null,
    activeId: null,
    activeName: null,
    selectedId: null
  },

  account: {
    address: null,
    shortAddress: null
  },

  runtime: {
    tronWeb: null,
    provider: null
  },

  balances: {
    trx: null,
    fourteen: null
  },

  ui: {
    walletPickerOpen: false,
    availableWallets: []
  },

  status: {
    error: null
  }
};

let walletState = createInitialState();
const listeners = new Set();

function createInitialState() {
  return {
    lifecycle: { ...DEFAULT_STATE.lifecycle },
    wallet: { ...DEFAULT_STATE.wallet },
    account: { ...DEFAULT_STATE.account },
    runtime: { ...DEFAULT_STATE.runtime },
    balances: { ...DEFAULT_STATE.balances },
    ui: {
      walletPickerOpen: DEFAULT_STATE.ui.walletPickerOpen,
      availableWallets: [...DEFAULT_STATE.ui.availableWallets]
    },
    status: { ...DEFAULT_STATE.status }
  };
}

function cloneState(state) {
  return {
    lifecycle: { ...state.lifecycle },
    wallet: { ...state.wallet },
    account: { ...state.account },
    runtime: { ...state.runtime },
    balances: { ...state.balances },
    ui: {
      walletPickerOpen: !!state.ui?.walletPickerOpen,
      availableWallets: Array.isArray(state.ui?.availableWallets)
        ? [...state.ui.availableWallets]
        : []
    },
    status: { ...state.status }
  };
}

function buildPublicState(state) {
  const snapshot = cloneState(state);

  return {
    ...snapshot,

    initialized: snapshot.lifecycle.initialized,
    connecting: snapshot.lifecycle.connecting,
    connected: snapshot.lifecycle.connected,

    walletId: snapshot.wallet.id,
    walletName: snapshot.wallet.name,
    activeWalletId: snapshot.wallet.activeId,
    activeWalletName: snapshot.wallet.activeName,
    selectedWalletId: snapshot.wallet.selectedId,

    address: snapshot.account.address,
    shortAddress: snapshot.account.shortAddress,

    tronWeb: snapshot.runtime.tronWeb,
    provider: snapshot.runtime.provider,

    trxBalance: snapshot.balances.trx,
    fourteenBalance: snapshot.balances.fourteen,

    walletPickerOpen: snapshot.ui.walletPickerOpen,
    availableWallets: [...snapshot.ui.availableWallets],

    error: snapshot.status.error
  };
}

function emitWalletState() {
  const snapshot = getWalletState();

  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      console.error('[4TEEN] walletStore listener failed', error);
    }
  });
}

function normalizeLegacyPatch(patch = {}) {
  const normalized = {};

  if (patch.lifecycle) {
    normalized.lifecycle = patch.lifecycle;
  }

  if (patch.wallet) {
    normalized.wallet = patch.wallet;
  }

  if (patch.account) {
    normalized.account = patch.account;
  }

  if (patch.runtime) {
    normalized.runtime = patch.runtime;
  }

  if (patch.balances) {
    normalized.balances = patch.balances;
  }

  if (patch.ui) {
    normalized.ui = patch.ui;
  }

  if (patch.status) {
    normalized.status = patch.status;
  }

  if (
    'initialized' in patch ||
    'connecting' in patch ||
    'connected' in patch
  ) {
    normalized.lifecycle = {
      ...(normalized.lifecycle || {}),
      ...('initialized' in patch ? { initialized: patch.initialized } : {}),
      ...('connecting' in patch ? { connecting: patch.connecting } : {}),
      ...('connected' in patch ? { connected: patch.connected } : {})
    };
  }

  if (
    'walletId' in patch ||
    'walletName' in patch ||
    'activeWalletId' in patch ||
    'activeWalletName' in patch ||
    'selectedWalletId' in patch
  ) {
    normalized.wallet = {
      ...(normalized.wallet || {}),
      ...('walletId' in patch ? { id: patch.walletId } : {}),
      ...('walletName' in patch ? { name: patch.walletName } : {}),
      ...('activeWalletId' in patch ? { activeId: patch.activeWalletId } : {}),
      ...('activeWalletName' in patch ? { activeName: patch.activeWalletName } : {}),
      ...('selectedWalletId' in patch ? { selectedId: patch.selectedWalletId } : {})
    };
  }

  if (
    'address' in patch ||
    'shortAddress' in patch
  ) {
    normalized.account = {
      ...(normalized.account || {}),
      ...('address' in patch ? { address: patch.address } : {}),
      ...('shortAddress' in patch ? { shortAddress: patch.shortAddress } : {})
    };
  }

  if (
    'tronWeb' in patch ||
    'provider' in patch
  ) {
    normalized.runtime = {
      ...(normalized.runtime || {}),
      ...('tronWeb' in patch ? { tronWeb: patch.tronWeb } : {}),
      ...('provider' in patch ? { provider: patch.provider } : {})
    };
  }

  if (
    'trxBalance' in patch ||
    'fourteenBalance' in patch
  ) {
    normalized.balances = {
      ...(normalized.balances || {}),
      ...('trxBalance' in patch ? { trx: patch.trxBalance } : {}),
      ...('fourteenBalance' in patch ? { fourteen: patch.fourteenBalance } : {})
    };
  }

  if (
    'walletPickerOpen' in patch ||
    'availableWallets' in patch
  ) {
    normalized.ui = {
      ...(normalized.ui || {}),
      ...('walletPickerOpen' in patch ? { walletPickerOpen: patch.walletPickerOpen } : {}),
      ...('availableWallets' in patch
        ? { availableWallets: Array.isArray(patch.availableWallets) ? patch.availableWallets : [] }
        : {})
    };
  }

  if ('error' in patch) {
    normalized.status = {
      ...(normalized.status || {}),
      error: patch.error
    };
  }

  return normalized;
}

function applyPatch(patch = {}) {
  const normalized = normalizeLegacyPatch(patch);

  walletState = {
    lifecycle: {
      ...walletState.lifecycle,
      ...(normalized.lifecycle || {})
    },
    wallet: {
      ...walletState.wallet,
      ...(normalized.wallet || {})
    },
    account: {
      ...walletState.account,
      ...(normalized.account || {})
    },
    runtime: {
      ...walletState.runtime,
      ...(normalized.runtime || {})
    },
    balances: {
      ...walletState.balances,
      ...(normalized.balances || {})
    },
    ui: {
      ...walletState.ui,
      ...(normalized.ui || {}),
      availableWallets:
        'availableWallets' in (normalized.ui || {})
          ? Array.isArray(normalized.ui.availableWallets)
            ? [...normalized.ui.availableWallets]
            : []
          : [...walletState.ui.availableWallets]
    },
    status: {
      ...walletState.status,
      ...(normalized.status || {})
    }
  };

  emitWalletState();
  return getWalletState();
}

export function getWalletState() {
  return buildPublicState(walletState);
}

export function resetWalletState() {
  walletState = createInitialState();
  emitWalletState();
  return getWalletState();
}

export function subscribeWalletState(listener) {
  if (typeof listener !== 'function') {
    throw new Error('subscribeWalletState: listener must be a function');
  }

  listeners.add(listener);

  try {
    listener(getWalletState());
  } catch (error) {
    console.error('[4TEEN] walletStore immediate listener call failed', error);
  }

  return () => {
    listeners.delete(listener);
  };
}

export function patchWalletState(patch = {}) {
  return applyPatch(patch);
}

export function setWalletState(patch = {}) {
  return applyPatch(patch);
}

export function setWalletLifecycle(patch = {}) {
  return applyPatch({ lifecycle: patch });
}

export function setWalletIdentity(patch = {}) {
  return applyPatch({ wallet: patch });
}

export function setWalletAccount(patch = {}) {
  return applyPatch({ account: patch });
}

export function setWalletRuntime(patch = {}) {
  return applyPatch({ runtime: patch });
}

export function setWalletBalances(patch = {}) {
  return applyPatch({ balances: patch });
}

export function setWalletUi(patch = {}) {
  return applyPatch({ ui: patch });
}

export function setWalletError(error = null) {
  return applyPatch({
    status: {
      error
    }
  });
}

export function clearWalletError() {
  return applyPatch({
    status: {
      error: null
    }
  });
}
```

---

## FILE: src/core/utils/address.js

```js
function isString(value) {
  return typeof value === 'string';
}

export function isHexAddress(value) {
  return isString(value) && /^0x[0-9a-fA-F]{40}$/.test(value);
}

export function isTronAddress(value) {
  return isString(value) &&
    value.length === 34 &&
    value.startsWith('T');
}

export function isUsableAddress(value) {
  return isTronAddress(value);
}

export function normalizeAddress(value) {
  if (!isString(value)) return null;

  const trimmed = value.trim();

  if (isTronAddress(trimmed)) {
    return trimmed;
  }

  return null;
}

export function extractAddressFromPayload(payload) {
  if (!payload) return null;

  const candidates = [
    payload,
    payload?.data,
    payload?.result,
    payload?.accounts,
    payload?.address,
    payload?.object,
    payload?.object?.address
  ];

  for (const c of candidates) {
    if (!c) continue;

    if (typeof c === 'string') {
      const normalized = normalizeAddress(c);
      if (normalized) return normalized;
    }

    if (Array.isArray(c)) {
      const first = normalizeAddress(c[0]);
      if (first) return first;
    }

    if (typeof c === 'object') {
      const nested = extractAddressFromPayload(c);
      if (nested) return nested;
    }
  }

  return null;
}

export function shortenAddress(address) {
  if (!isString(address)) return '';
  if (address.length < 10) return address;

  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
```

---

## FILE: src/core/utils/format.js

```js
export function formatTokenAmount(value, digits = 2) {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return '0.00';
  return num.toFixed(digits);
}
```

---

## FILE: src/core/utils/tron.js

```js
export function fromSun(value) {
  return Number(value || 0) / 1_000_000;
}

export function normalizeTronBalance(value) {
  return Number(fromSun(value).toFixed(6));
}
```

---

## FILE: src/debug/debugOverlay.js

```js
import { getWalletState } from '../core/store/walletStore.js';
import { getSigningReadiness } from '../adapters/shared/signingReadiness.js';

let overlayRoot = null;
let logBox = null;
let badge = null;
let stateBox = null;
let envBox = null;
let healthBox = null;
let isVisible = false;
let logs = [];
let maxLogs = 120;
let installed = false;
let originalConsole = null;
let bodyObserver = null;
let stateUnsubscribe = null;

function getNowTime() {
  const now = new Date();
  return now.toLocaleTimeString();
}

function stringifyArg(value) {
  try {
    if (typeof value === 'string') return value;
    if (value instanceof Error) return `${value.name}: ${value.message}\n${value.stack || ''}`;
    if (typeof value === 'undefined') return 'undefined';
    if (value === null) return 'null';
    return JSON.stringify(value, null, 2);
  } catch (_) {
    try {
      return String(value);
    } catch (_) {
      return '[unserializable]';
    }
  }
}

function joinArgs(args) {
  return args.map(stringifyArg).join(' ');
}

function refreshBadge() {
  if (!badge) return;
  badge.textContent = String(logs.length);
}

function refreshLogBox() {
  if (!logBox) return;
  logBox.textContent = logs.join('\n\n');
  logBox.scrollTop = logBox.scrollHeight;
  refreshBadge();
}

function setBoxText(node, value) {
  if (!node) return;
  node.textContent = typeof value === 'string' ? value : stringifyArg(value);
}

function addLog(level, ...args) {
  const line = `[${getNowTime()}] [${level}] ${joinArgs(args)}`;
  logs.push(line);

  if (logs.length > maxLogs) {
    logs = logs.slice(logs.length - maxLogs);
  }

  refreshLogBox();
}

function copyLogs() {
  const text = logs.join('\n\n');

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
    return;
  }

  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  ta.style.pointerEvents = 'none';
  document.body.appendChild(ta);
  ta.select();

  try {
    document.execCommand('copy');
  } catch (_) {}

  document.body.removeChild(ta);
}

function setVisible(nextVisible) {
  isVisible = Boolean(nextVisible);
  if (!overlayRoot) return;

  const panel = overlayRoot.querySelector('[data-debug-panel]');
  if (!panel) return;

  panel.style.display = isVisible ? 'flex' : 'none';
}

function makeBtn(text) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = text;
  btn.style.padding = '8px 10px';
  btn.style.borderRadius = '10px';
  btn.style.border = '1px solid rgba(255,255,255,0.12)';
  btn.style.background = '#181818';
  btn.style.color = '#fff';
  btn.style.fontSize = '12px';
  btn.style.cursor = 'pointer';
  return btn;
}

function makeSection(titleText) {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.gap = '6px';

  const title = document.createElement('div');
  title.textContent = titleText;
  title.style.color = '#fff';
  title.style.fontSize = '12px';
  title.style.fontWeight = '700';

  const box = document.createElement('pre');
  box.style.margin = '0';
  box.style.padding = '10px';
  box.style.borderRadius = '12px';
  box.style.background = '#050505';
  box.style.color = '#c4b5fd';
  box.style.fontSize = '11px';
  box.style.lineHeight = '1.45';
  box.style.whiteSpace = 'pre-wrap';
  box.style.wordBreak = 'break-word';
  box.style.overflow = 'auto';
  box.style.maxHeight = '140px';

  wrap.appendChild(title);
  wrap.appendChild(box);

  return { wrap, box };
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getEnvSnapshot() {
  return {
    href: window.location.href,
    userAgent: navigator.userAgent,
    fourteenConnect: !!window.FourteenConnect,
    fourteenKit: !!window.FourteenKit,
    tronWeb: !!window.tronWeb,
    tronLink: !!window.tronLink,
    okxwallet: !!window.okxwallet,
    okxWallet: !!window.okxWallet,
    BinanceChain: !!window.BinanceChain,
    trustwallet: !!window.trustwallet,
    trustWallet: !!window.trustWallet,
    ethereum: !!window.ethereum,
    tokenPocket: !!window.tokenPocket,
    tp: !!window.tp,
    bitkeep: !!window.bitkeep,
    bitget: !!window.bitget
  };
}

function getStateSnapshot() {
  try {
    if (window.FourteenKit?.getState) {
      return window.FourteenKit.getState();
    }
  } catch (error) {
    return { error: error?.message || 'getState failed' };
  }

  try {
    return getWalletState();
  } catch (error) {
    return { error: error?.message || 'wallet state unavailable' };
  }
}

function getHealthSnapshot() {
  const state = getStateSnapshot();

  const provider =
    state?.provider ||
    state?.runtime?.provider ||
    null;

  const tronWeb =
    state?.tronWeb ||
    state?.runtime?.tronWeb ||
    provider?.tronWeb ||
    null;

  const address =
    state?.address ||
    state?.account?.address ||
    tronWeb?.defaultAddress?.base58 ||
    provider?.defaultAddress?.base58 ||
    provider?.tronWeb?.defaultAddress?.base58 ||
    null;

  const trxBalance =
    state?.trxBalance ??
    state?.balances?.trx ??
    null;

  const fourteenBalance =
    state?.fourteenBalance ??
    state?.balances?.fourteen ??
    null;

  const signing = getSigningReadiness(state);

  const addressResolved = isUsableAddress(address);
  const balancesResolved =
    trxBalance !== null &&
    trxBalance !== undefined &&
    fourteenBalance !== null &&
    fourteenBalance !== undefined;

  const providerBoundCorrectly = !!(
    provider &&
    tronWeb &&
    (
      tronWeb === provider ||
      provider?.tronWeb === tronWeb ||
      tronWeb?.defaultAddress?.base58 === address ||
      provider?.defaultAddress?.base58 === address ||
      provider?.tronWeb?.defaultAddress?.base58 === address
    )
  );

  const connected = !!(
    state?.connected ||
    state?.lifecycle?.connected
  );

  const overallOk = !!(
    connected &&
    addressResolved &&
    balancesResolved &&
    providerBoundCorrectly &&
    signing?.ok
  );

  return {
    overallOk,
    checks: {
      connected: {
        ok: connected
      },
      addressResolved: {
        ok: addressResolved,
        value: address
      },
      balancesResolved: {
        ok: balancesResolved,
        trxBalance,
        fourteenBalance
      },
      providerBoundCorrectly: {
        ok: providerBoundCorrectly,
        hasProvider: !!provider,
        hasTronWeb: !!tronWeb,
        providerAddress:
          provider?.defaultAddress?.base58 ||
          provider?.tronWeb?.defaultAddress?.base58 ||
          provider?.address ||
          provider?.selectedAddress ||
          null,
        tronWebAddress:
          tronWeb?.defaultAddress?.base58 ||
          null
      },
      signingCapabilityPresent: signing
    }
  };
}

function refreshStateBox() {
  setBoxText(stateBox, getStateSnapshot());
}

function refreshEnvBox() {
  setBoxText(envBox, getEnvSnapshot());
}

function refreshHealthBox() {
  setBoxText(healthBox, getHealthSnapshot());
}

function refreshAllBoxes() {
  refreshStateBox();
  refreshEnvBox();
  refreshHealthBox();
}

function buildUi() {
  if (overlayRoot || !document.body) return;

  overlayRoot = document.createElement('div');
  overlayRoot.id = 'fourteenDebugOverlay';
  overlayRoot.style.position = 'fixed';
  overlayRoot.style.right = '12px';
  overlayRoot.style.bottom = '12px';
  overlayRoot.style.zIndex = '2147483647';
  overlayRoot.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = 'DBG';
  toggle.style.width = '52px';
  toggle.style.height = '52px';
  toggle.style.borderRadius = '999px';
  toggle.style.border = '1px solid rgba(255,255,255,0.18)';
  toggle.style.background = '#111';
  toggle.style.color = '#fff';
  toggle.style.fontWeight = '700';
  toggle.style.fontSize = '13px';
  toggle.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
  toggle.style.cursor = 'pointer';
  toggle.style.position = 'relative';

  badge = document.createElement('span');
  badge.style.position = 'absolute';
  badge.style.top = '-4px';
  badge.style.right = '-4px';
  badge.style.minWidth = '18px';
  badge.style.height = '18px';
  badge.style.padding = '0 4px';
  badge.style.borderRadius = '999px';
  badge.style.background = '#dc2626';
  badge.style.color = '#fff';
  badge.style.fontSize = '11px';
  badge.style.lineHeight = '18px';
  badge.style.textAlign = 'center';
  badge.textContent = '0';

  toggle.appendChild(badge);

  const panel = document.createElement('div');
  panel.setAttribute('data-debug-panel', '1');
  panel.style.display = 'none';
  panel.style.flexDirection = 'column';
  panel.style.gap = '8px';
  panel.style.position = 'fixed';
  panel.style.left = '12px';
  panel.style.right = '12px';
  panel.style.bottom = '76px';
  panel.style.top = '12px';
  panel.style.background = 'rgba(8,8,8,0.96)';
  panel.style.border = '1px solid rgba(255,255,255,0.12)';
  panel.style.borderRadius = '16px';
  panel.style.padding = '12px';
  panel.style.boxShadow = '0 18px 50px rgba(0,0,0,0.45)';
  panel.style.backdropFilter = 'blur(6px)';
  panel.style.webkitBackdropFilter = 'blur(6px)';

  const topBar = document.createElement('div');
  topBar.style.display = 'flex';
  topBar.style.gap = '8px';
  topBar.style.alignItems = 'center';
  topBar.style.justifyContent = 'space-between';

  const title = document.createElement('div');
  title.textContent = '4TEEN Debug';
  title.style.color = '#fff';
  title.style.fontSize = '14px';
  title.style.fontWeight = '700';

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '8px';
  actions.style.flexWrap = 'wrap';

  const copyBtn = makeBtn('Copy');
  const clearBtn = makeBtn('Clear');
  const refreshBtn = makeBtn('Refresh');
  const hideBtn = makeBtn('Hide');

  copyBtn.addEventListener('click', () => copyLogs());

  clearBtn.addEventListener('click', () => {
    logs = [];
    refreshLogBox();
  });

  refreshBtn.addEventListener('click', () => {
    refreshAllBoxes();
  });

  hideBtn.addEventListener('click', () => setVisible(false));

  actions.appendChild(copyBtn);
  actions.appendChild(clearBtn);
  actions.appendChild(refreshBtn);
  actions.appendChild(hideBtn);

  topBar.appendChild(title);
  topBar.appendChild(actions);

  const healthSection = makeSection('Health');
  const stateSection = makeSection('State');
  const envSection = makeSection('Env');
  const logSection = makeSection('Logs');

  healthBox = healthSection.box;
  stateBox = stateSection.box;
  envBox = envSection.box;
  logBox = logSection.box;

  healthBox.style.color = '#86efac';
  logBox.style.flex = '1';
  logBox.style.maxHeight = 'none';
  logBox.style.color = '#93c5fd';

  panel.appendChild(topBar);
  panel.appendChild(healthSection.wrap);
  panel.appendChild(stateSection.wrap);
  panel.appendChild(envSection.wrap);
  panel.appendChild(logSection.wrap);

  toggle.addEventListener('click', () => {
    setVisible(!isVisible);
    if (isVisible) {
      refreshAllBoxes();
    }
  });

  overlayRoot.appendChild(toggle);
  overlayRoot.appendChild(panel);
  document.body.appendChild(overlayRoot);

  refreshAllBoxes();
  refreshLogBox();
}

function patchConsole() {
  if (originalConsole) return;

  originalConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
  };

  console.log = (...args) => {
    addLog('LOG', ...args);
    originalConsole.log(...args);
  };

  console.warn = (...args) => {
    addLog('WARN', ...args);
    originalConsole.warn(...args);
  };

  console.error = (...args) => {
    addLog('ERROR', ...args);
    originalConsole.error(...args);
  };
}

function bindGlobalErrors() {
  window.addEventListener('error', (event) => {
    addLog(
      'WINDOW_ERROR',
      event.message,
      event.filename,
      `line:${event.lineno}`,
      `col:${event.colno}`
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    addLog('PROMISE_REJECTION', event.reason);
  });
}

function bindStateUpdates() {
  if (stateUnsubscribe) return;
  if (!window.FourteenKit?.subscribe) return;

  try {
    stateUnsubscribe = window.FourteenKit.subscribe((state) => {
      if (stateBox) {
        setBoxText(stateBox, state);
      }

      if (healthBox) {
        refreshHealthBox();
      }
    });
  } catch (_) {}
}

function waitForBodyAndStart(start) {
  if (document.body) {
    start();
    return;
  }

  bodyObserver = new MutationObserver(() => {
    if (document.body) {
      bodyObserver.disconnect();
      bodyObserver = null;
      start();
    }
  });

  bodyObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

export function initDebugOverlay(options = {}) {
  if (installed || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  installed = true;

  if (typeof options.maxLogs === 'number' && options.maxLogs > 0) {
    maxLogs = options.maxLogs;
  }

  const start = () => {
    buildUi();
    patchConsole();
    bindGlobalErrors();
    bindStateUpdates();

    addLog('INFO', 'Debug overlay initialized');
    addLog('INFO', 'User agent:', navigator.userAgent);
    addLog('INFO', 'Location:', window.location.href);
  };

  waitForBodyAndStart(start);
}

export function debugOverlayLog(...args) {
  addLog('DEBUG', ...args);
}

export function showDebugOverlay() {
  setVisible(true);
  refreshAllBoxes();
}

export function hideDebugOverlay() {
  setVisible(false);
}
```

---

## FILE: src/diagnostics/assertWalletSigning.js

```js
import { getWalletState } from '../core/store/walletStore.js';
import {
  getResolvedSigningProvider,
  getResolvedSigningTronWeb,
  getSigningCapabilities,
  getSigningReadiness,
  isUsableAddress
} from '../adapters/shared/signingReadiness.js';

const DRY_RUN_RECEIVER = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';

async function buildDryRunTransaction(tronWeb, address) {
  if (!tronWeb) {
    throw new Error('tronWeb is missing');
  }

  if (!isUsableAddress(address)) {
    throw new Error('wallet address is invalid');
  }

  if (!isUsableAddress(DRY_RUN_RECEIVER)) {
    throw new Error('dry run receiver is invalid');
  }

  if (typeof tronWeb?.transactionBuilder?.sendTrx !== 'function') {
    throw new Error('transactionBuilder.sendTrx is not available');
  }

  const tx = await tronWeb.transactionBuilder.sendTrx(
    DRY_RUN_RECEIVER,
    1,
    address
  );

  if (!tx || typeof tx !== 'object') {
    throw new Error('failed to build dry-run transaction');
  }

  return tx;
}

async function trySignWithTronWeb(tronWeb, tx) {
  if (typeof tronWeb?.trx?.sign !== 'function') {
    return {
      ok: false,
      method: 'tronWeb.trx.sign',
      error: 'tronWeb.trx.sign is not available'
    };
  }

  try {
    const signed = await tronWeb.trx.sign(tx);

    return {
      ok: !!signed,
      method: 'tronWeb.trx.sign',
      signedTransaction: signed || null,
      error: signed ? null : 'sign returned empty result'
    };
  } catch (error) {
    return {
      ok: false,
      method: 'tronWeb.trx.sign',
      error: error?.message || 'tronWeb sign failed'
    };
  }
}

async function trySignWithProvider(provider, tx) {
  if (typeof provider?.sign === 'function') {
    try {
      const signed = await provider.sign(tx);

      return {
        ok: !!signed,
        method: 'provider.sign',
        signedTransaction: signed || null,
        error: signed ? null : 'provider.sign returned empty result'
      };
    } catch (error) {
      return {
        ok: false,
        method: 'provider.sign',
        error: error?.message || 'provider.sign failed'
      };
    }
  }

  if (typeof provider?.request === 'function') {
    try {
      const signed = await provider.request({
        method: 'tron_signTransaction',
        params: [tx]
      });

      return {
        ok: !!signed,
        method: 'provider.request(tron_signTransaction)',
        signedTransaction: signed || null,
        error: signed ? null : 'provider request returned empty result'
      };
    } catch (error) {
      return {
        ok: false,
        method: 'provider.request(tron_signTransaction)',
        error: error?.message || 'provider tron_signTransaction failed'
      };
    }
  }

  if (typeof provider?.send === 'function') {
    try {
      const signed = await provider.send('tron_signTransaction', [tx]);

      return {
        ok: !!signed,
        method: 'provider.send(tron_signTransaction)',
        signedTransaction: signed || null,
        error: signed ? null : 'provider send returned empty result'
      };
    } catch (error) {
      return {
        ok: false,
        method: 'provider.send(tron_signTransaction)',
        error: error?.message || 'provider send tron_signTransaction failed'
      };
    }
  }

  return {
    ok: false,
    method: null,
    error: 'no provider signing method available'
  };
}

export async function assertWalletSigning(options = {}) {
  const { mode = 'capability' } = options;

  const state = getWalletState();
  const readiness = getSigningReadiness(state);

  if (!readiness.ok) {
    return readiness;
  }

  if (mode !== 'verify') {
    return {
      ok: true,
      stage: 'capability',
      address: readiness.address,
      providerName: readiness.providerName,
      capabilities: readiness.capabilities,
      transactionBuilt: false,
      error: null
    };
  }

  const provider = getResolvedSigningProvider(state);
  const tronWeb = getResolvedSigningTronWeb(state);
  const capabilities = getSigningCapabilities(provider, tronWeb);
  const address = readiness.address;

  let tx = null;

  try {
    tx = await buildDryRunTransaction(tronWeb, address);
  } catch (error) {
    return {
      ok: false,
      stage: 'build',
      error: error?.message || 'failed to build transaction',
      capabilities
    };
  }

  const tronWebResult = await trySignWithTronWeb(tronWeb, tx);

  if (tronWebResult.ok) {
    return {
      ok: true,
      stage: 'sign',
      method: tronWebResult.method,
      address,
      providerName: readiness.providerName,
      capabilities,
      transactionBuilt: true
    };
  }

  const providerResult = await trySignWithProvider(provider, tx);

  if (providerResult.ok) {
    return {
      ok: true,
      stage: 'sign',
      method: providerResult.method,
      address,
      providerName: readiness.providerName,
      capabilities,
      transactionBuilt: true
    };
  }

  return {
    ok: false,
    stage: 'sign',
    error: providerResult.error || tronWebResult.error || 'signing failed',
    address,
    providerName: readiness.providerName,
    capabilities,
    transactionBuilt: true,
    attempts: {
      tronWeb: tronWebResult,
      provider: providerResult
    }
  };
}

export async function printWalletSigningDiagnostics(options = {}) {
  const result = await assertWalletSigning(options);

  console.group('[4TEEN] WALLET SIGNING DIAGNOSTICS');
  console.log('Signing OK:', result.ok);
  console.log('Stage:', result.stage);
  console.log('Method:', result.method || null);
  console.log('Address:', result.address || null);
  console.log('Provider:', result.providerName || null);
  console.log('Capabilities:', result.capabilities || null);
  console.log('Error:', result.error || null);
  console.log('Attempts:', result.attempts || null);
  console.groupEnd();

  return result;
}
```

---

## FILE: src/diagnostics/walletDiagnostics.js

```js
import { getWalletState } from '../core/store/walletStore.js';
import { refreshAllBalances } from '../services/balances/refreshAllBalances.js';
import { assertWalletSigning } from './assertWalletSigning.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function collectInjectedWallets() {
  const w = getWindowSafe();

  return {
    tronWeb: !!w?.tronWeb,
    tronLink: !!w?.tronLink,
    okxwallet: !!w?.okxwallet,
    okxWallet: !!w?.okxWallet,
    BinanceChain: !!w?.BinanceChain,
    binancew3w: !!w?.binancew3w,
    trustwallet: !!w?.trustwallet,
    trustWallet: !!w?.trustWallet,
    bitkeep: !!w?.bitkeep,
    bitget: !!w?.bitget,
    tp: !!w?.tp,
    tokenPocket: !!w?.tokenPocket,
    ethereum: !!w?.ethereum
  };
}

function buildBaseStateSnapshot(state) {
  return {
    initialized: state.initialized,
    connecting: state.connecting,
    connected: state.connected,
    walletId: state.walletId,
    walletName: state.walletName,
    activeWalletId: state.activeWalletId,
    address: state.address,
    shortAddress: state.shortAddress,
    trxBalance: state.trxBalance,
    fourteenBalance: state.fourteenBalance,
    hasProvider: !!state.provider,
    hasTronWeb: !!state.tronWeb,
    error: state.error
  };
}

function evaluateConnection(state) {
  const ok = !!(
    state.connected &&
    isUsableAddress(state.address) &&
    (state.provider || state.tronWeb)
  );

  return {
    ok,
    address: state.address || null,
    walletId: state.activeWalletId || state.walletId || null,
    walletName: state.walletName || null,
    hasProvider: !!state.provider,
    hasTronWeb: !!state.tronWeb,
    reason: ok ? null : 'Wallet is not fully connected'
  };
}

function evaluateBalances(state) {
  const trxOk = state.trxBalance !== null && state.trxBalance !== undefined;
  const tokenOk = state.fourteenBalance !== null && state.fourteenBalance !== undefined;
  const ok = trxOk && tokenOk;

  return {
    ok,
    trx: {
      ok: trxOk,
      value: state.trxBalance
    },
    fourteen: {
      ok: tokenOk,
      value: state.fourteenBalance
    },
    reason: ok ? null : 'One or both balances are unavailable'
  };
}

function evaluateSigningSnapshot(state) {
  const provider = state.provider || state.runtime?.provider || null;
  const tronWeb =
    state.tronWeb ||
    state.runtime?.tronWeb ||
    provider?.tronWeb ||
    null;

  const hasProviderSign =
    typeof provider?.sign === 'function' ||
    typeof provider?.request === 'function' ||
    typeof provider?.send === 'function';

  const hasTronWebSign =
    typeof tronWeb?.trx?.sign === 'function';

  const hasTronWebTransactionBuilder =
    typeof tronWeb?.transactionBuilder?.sendTrx === 'function';

  const ok = !!(hasProviderSign || hasTronWebSign);

  return {
    ok,
    hasProviderSign,
    hasTronWebSign,
    hasTronWebTransactionBuilder,
    reason: ok ? null : 'No signing capability detected on provider/tronWeb'
  };
}

export function collectWalletDiagnostics() {
  const state = getWalletState();
  const w = getWindowSafe();

  const connection = evaluateConnection(state);
  const balances = evaluateBalances(state);
  const signing = evaluateSigningSnapshot(state);

  return {
    timestamp: new Date().toISOString(),
    overallOk: connection.ok && balances.ok && signing.ok,
    walletState: buildBaseStateSnapshot(state),
    checks: {
      connection,
      balances,
      signing
    },
    injected: collectInjectedWallets(),
    userAgent: w?.navigator?.userAgent || null
  };
}

export async function runWalletDiagnostics() {
  const before = collectWalletDiagnostics();
  const state = getWalletState();

  let balanceRefresh = {
    attempted: false,
    ok: false,
    error: null
  };

  if (
    isUsableAddress(state.address) &&
    (state.provider || state.tronWeb)
  ) {
    try {
      balanceRefresh.attempted = true;

      await refreshAllBalances({
        address: state.address,
        walletId: state.activeWalletId || state.walletId || null,
        provider: state.provider || state.tronWeb || null
      });

      balanceRefresh.ok = true;
    } catch (error) {
      balanceRefresh.ok = false;
      balanceRefresh.error = error?.message || 'refreshAllBalances failed';
    }
  }

  let signingCheck = null;

  try {
    signingCheck = await assertWalletSigning();
  } catch (error) {
    signingCheck = {
      ok: false,
      stage: 'sign',
      error: error?.message || 'assertWalletSigning failed'
    };
  }

  const after = collectWalletDiagnostics();

  return {
    ok: after.checks.connection.ok && after.checks.balances.ok && !!signingCheck?.ok,
    before,
    after,
    balanceRefresh,
    signingCheck
  };
}

export function printWalletDiagnostics() {
  const data = collectWalletDiagnostics();

  console.group('4TEEN WALLET DIAGNOSTICS');
  console.log('Overall OK:', data.overallOk);
  console.log('Connection:', data.checks.connection);
  console.log('Balances:', data.checks.balances);
  console.log('Signing Snapshot:', data.checks.signing);
  console.log('Wallet State:', data.walletState);
  console.log('Injected:', data.injected);
  console.groupEnd();

  return data;
}

export async function printAndRunWalletDiagnostics() {
  const data = await runWalletDiagnostics();

  console.group('4TEEN WALLET DIAGNOSTICS RUN');
  console.log('Overall OK:', data.ok);
  console.log('Balance Refresh:', data.balanceRefresh);
  console.log('Signing Check:', data.signingCheck);
  console.log('Before:', data.before);
  console.log('After:', data.after);
  console.groupEnd();

  return data;
}
```

---

## FILE: src/polyfills/node.js

```js
import { Buffer } from 'buffer/';

if (typeof globalThis !== 'undefined') {
  if (!globalThis.Buffer) {
    globalThis.Buffer = Buffer;
  }

  if (!globalThis.global) {
    globalThis.global = globalThis;
  }
}
```

---

## FILE: src/services/balances/getFourteenBalance.js

```js
import { FOURTEEN_TOKEN } from '../../core/config/token.js';
import { getTokenBalance } from './getTokenBalance.js';

export async function getFourteenBalance(addressOverride = null) {
  return getTokenBalance(
    FOURTEEN_TOKEN.address,
    FOURTEEN_TOKEN.decimals,
    addressOverride
  );
}
```

---

## FILE: src/services/balances/getTokenBalance.js

```js
import { TronWeb } from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';
import { TRC20_ABI } from '../contracts/trc20.js';

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTokenBalance(tokenAddress, decimals, addressOverride = null) {
  const state = getWalletState();
  const address = addressOverride || state.address;

  if (!address) return 0;

  const tronWeb = state.tronWeb || getReadOnlyTronWeb();

  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const raw = await contract.balanceOf(address).call();

  return Number(raw) / Math.pow(10, decimals);
}
```

---

## FILE: src/services/balances/getTrxBalance.js

```js
import { TronWeb } from 'tronweb';
import { getWalletState } from '../../core/store/walletStore.js';

function fromSun(value) {
  return Number(value || 0) / 1_000_000;
}

function toFixedBalance(value) {
  return Number(fromSun(value).toFixed(6));
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function base58ToHex(address) {
  try {
    return TronWeb.address.toHex(address);
  } catch {
    return null;
  }
}

function getReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function getProviderName(provider) {
  const win = getWindowSafe();

  if (!provider) return '';

  if (provider === win?.tronLink || provider === win?.tronLink?.tronWeb) return 'TronLink';
  if (provider === win?.okxwallet || provider === win?.okxwallet?.tronWeb) return 'OKX Wallet';
  if (provider === win?.okxWallet || provider === win?.okxWallet?.tronWeb) return 'OKX Wallet';
  if (provider === win?.tp || provider === win?.tp?.tronWeb) return 'TokenPocket';
  if (provider === win?.tokenPocket || provider === win?.tokenPocket?.tronWeb) return 'TokenPocket';
  if (provider === win?.bitkeep || provider === win?.bitkeep?.tronWeb) return 'Bitget Wallet';
  if (provider === win?.bitget || provider === win?.bitget?.tronWeb) return 'Bitget Wallet';
  if (provider === win?.trustwallet || provider === win?.trustwallet?.tronWeb) return 'Trust';
  if (provider === win?.trustWallet || provider === win?.trustWallet?.tronWeb) return 'Trust';
  if (provider === win?.BinanceChain) return 'Binance Wallet';
  if (provider === win?.ethereum) return 'MetaMask';

  if (provider?.isTronLink) return 'TronLink';
  if (provider?.isOkxWallet || provider?.isOKExWallet) return 'OKX Wallet';
  if (provider?.isTokenPocket) return 'TokenPocket';
  if (provider?.isBitKeep || provider?.isBitget) return 'Bitget Wallet';
  if (provider?.isTrust || provider?.isTrustWallet) return 'Trust';
  if (provider?.isMetaMask) return 'MetaMask';

  return '';
}

function getTronWebAddress(providerLike) {
  return (
    providerLike?.defaultAddress?.base58 ||
    providerLike?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function resolveProviders(state) {
  const win = getWindowSafe();
  const walletId = String(state?.activeWalletId || state?.walletId || '').trim().toLowerCase();

  const list = [
    state?.provider,
    state?.tronWeb,
    state?.provider?.tronWeb,
    state?.provider?.provider,
    state?.provider?.provider?.tronWeb,
    win?.okxwallet,
    win?.okxwallet?.tronWeb,
    win?.okxWallet,
    win?.okxWallet?.tronWeb,
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
    win?.BinanceChain,
    win?.ethereum,
    win?.tronLink,
    win?.tronLink?.tronWeb,
    win?.tronWeb
  ].filter(Boolean);

  const unique = [];
  for (const item of list) {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  }

  const scored = unique
    .map((item) => {
      const name = getProviderName(item);
      const currentAddress = getTronWebAddress(item);

      let score = 0;

      if (item?.trx?.getBalance || item?.tronWeb?.trx?.getBalance) score += 100;
      if (currentAddress) score += 50;

      if (walletId && name && name.toLowerCase() === walletId) score += 5000;

      if (walletId && walletId !== 'tronlink' && name === 'TronLink') score -= 12000;
      if (walletId && walletId !== 'okx wallet' && name === 'OKX Wallet') score -= 4000;
      if (walletId && walletId !== 'tokenpocket' && name === 'TokenPocket') score -= 4000;
      if (walletId && walletId !== 'bitget wallet' && name === 'Bitget Wallet') score -= 4000;
      if (walletId && walletId !== 'binance wallet' && name === 'Binance Wallet') score -= 4000;
      if (walletId && walletId !== 'metamask' && name === 'MetaMask') score -= 4000;
      if (walletId && walletId !== 'trust' && name === 'Trust') score -= 4000;

      return { item, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.item);
}

function extractBalanceFromAccountResponse(response) {
  if (!response) return null;

  if (typeof response.balance === 'number') {
    return response.balance;
  }

  if (typeof response?.data?.balance === 'number') {
    return response.data.balance;
  }

  if (typeof response?.account?.balance === 'number') {
    return response.account.balance;
  }

  if (typeof response?.result?.balance === 'number') {
    return response.result.balance;
  }

  return null;
}

async function tryTronWebGetBalance(providerLike, address) {
  const tronWeb =
    providerLike?.trx?.getBalance
      ? providerLike
      : providerLike?.tronWeb?.trx?.getBalance
        ? providerLike.tronWeb
        : null;

  if (!tronWeb?.trx?.getBalance) {
    return null;
  }

  const raw = await tronWeb.trx.getBalance(address);
  if (typeof raw === 'number') {
    return raw;
  }

  return null;
}

async function tryProviderRequest(provider, method, params) {
  if (!provider) {
    return null;
  }

  if (typeof provider.request === 'function') {
    try {
      return await provider.request({
        method,
        params
      });
    } catch {}
  }

  if (typeof provider.send === 'function') {
    try {
      return await provider.send(method, params);
    } catch {}
  }

  return null;
}

async function tryAccountRequests(provider, address) {
  const hex = base58ToHex(address);
  if (!hex) return null;

  const requests = [
    {
      method: 'walletsolidity/getaccount',
      params: { address: hex }
    },
    {
      method: 'wallet/getaccount',
      params: { address: hex }
    }
  ];

  for (const item of requests) {
    const response = await tryProviderRequest(provider, item.method, item.params);
    const balance = extractBalanceFromAccountResponse(response);

    if (typeof balance === 'number') {
      return balance;
    }
  }

  return null;
}

export async function getTrxBalance(addressOverride = null) {
  const state = getWalletState();
  const address = addressOverride || state.address;

  if (!isUsableAddress(address)) {
    return 0;
  }

  const providers = resolveProviders(state);

  for (const provider of providers) {
    try {
      const raw = await tryTronWebGetBalance(provider, address);
      if (typeof raw === 'number') {
        return toFixedBalance(raw);
      }
    } catch {}
  }

  for (const provider of providers) {
    try {
      const raw = await tryAccountRequests(provider, address);
      if (typeof raw === 'number') {
        return toFixedBalance(raw);
      }
    } catch {}
  }

  try {
    const tronWeb = getReadOnlyTronWeb();
    const raw = await tronWeb.trx.getBalance(address);
    if (typeof raw === 'number') {
      return toFixedBalance(raw);
    }
  } catch {}

  throw new Error('TRX balance: unable to resolve balance');
}
```

---

## FILE: src/services/balances/refreshAllBalances.js

```js
import { TronWeb } from 'tronweb';
import { getWalletState, setWalletState } from '../../core/store/walletStore.js';

const FOURTEEN_TOKEN_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const TRONGRID_FULL_HOST = 'https://api.trongrid.io';

let refreshInFlight = null;
let lastRefreshAt = 0;

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error) {
  const message = String(error?.message || '').toLowerCase();
  return message.includes('429') || message.includes('too many requests');
}

function getReadOnlyTronWeb(address = null) {
  const tronWeb = new TronWeb({
    fullHost: TRONGRID_FULL_HOST
  });

  if (address && isUsableAddress(address)) {
    try {
      tronWeb.setAddress(address);
    } catch (_) {}
  }

  return tronWeb;
}

function normalizeSunToTrx(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return null;
  return Number((num / 1_000_000).toFixed(6));
}

function normalizeTokenUnits(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return null;
  return Number((num / 1_000_000).toFixed(6));
}

function decodeHexBalance(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') return null;

  try {
    return parseInt(hexValue, 16);
  } catch (_) {
    return null;
  }
}

function getProviderName(provider) {
  if (!provider) return '';

  const win = getWindowSafe();

  if (provider === win?.tronLink || provider === win?.tronLink?.tronWeb) return 'TronLink';
  if (provider === win?.okxwallet || provider === win?.okxwallet?.tronWeb) return 'OKX Wallet';
  if (provider === win?.okxWallet || provider === win?.okxWallet?.tronWeb) return 'OKX Wallet';
  if (provider === win?.tp || provider === win?.tp?.tronWeb) return 'TokenPocket';
  if (provider === win?.tokenPocket || provider === win?.tokenPocket?.tronWeb) return 'TokenPocket';
  if (provider === win?.bitkeep || provider === win?.bitkeep?.tronWeb) return 'Bitget Wallet';
  if (provider === win?.bitget || provider === win?.bitget?.tronWeb) return 'Bitget Wallet';
  if (provider === win?.trustwallet || provider === win?.trustwallet?.tronWeb) return 'Trust';
  if (provider === win?.trustWallet || provider === win?.trustWallet?.tronWeb) return 'Trust';
  if (provider === win?.BinanceChain || provider === win?.BinanceChain?.tron) return 'Binance Wallet';
  if (provider === win?.binancew3w || provider === win?.binancew3w?.tron) return 'Binance Wallet';
  if (provider === win?.ethereum || provider === win?.ethereum?.tronWeb) return 'MetaMask';

  if (provider?.isTronLink || provider?.tronWeb?.isTronLink) return 'TronLink';
  if (provider?.isOkxWallet || provider?.isOKExWallet) return 'OKX Wallet';
  if (provider?.isTokenPocket) return 'TokenPocket';
  if (provider?.isBitKeep || provider?.isBitget) return 'Bitget Wallet';
  if (provider?.isTrust || provider?.isTrustWallet) return 'Trust';
  if (provider?.isMetaMask) return 'MetaMask';
  if (provider?.isBinance || provider?.chain === 'tron') return 'Binance Wallet';

  return '';
}

function getTronWebCandidates(provider) {
  const win = getWindowSafe();

  return [
    provider?.tronWeb,
    provider,
    provider?.provider?.tronWeb,
    provider?.provider,

    win?.tronLink?.tronWeb,
    win?.tronLink,

    win?.okxwallet?.tronWeb,
    win?.okxwallet,
    win?.okxWallet?.tronWeb,
    win?.okxWallet,

    win?.BinanceChain?.tronWeb,
    win?.BinanceChain?.tron,
    win?.BinanceChain,
    win?.binancew3w?.tron,
    win?.binancew3w,

    win?.tp?.tronWeb,
    win?.tp,
    win?.tokenPocket?.tronWeb,
    win?.tokenPocket,

    win?.bitkeep?.tronWeb,
    win?.bitkeep,
    win?.bitget?.tronWeb,
    win?.bitget,

    win?.trustwallet?.tronWeb,
    win?.trustwallet,
    win?.trustWallet?.tronWeb,
    win?.trustWallet,

    win?.ethereum?.tronWeb,
    win?.ethereum,

    win?.tronWeb
  ].filter(Boolean);
}

function isValidTronWeb(tronWeb) {
  return !!(
    tronWeb &&
    typeof tronWeb?.trx?.getBalance === 'function'
  );
}

function getTronWebAddress(tronWeb) {
  return (
    tronWeb?.defaultAddress?.base58 ||
    tronWeb?.tronWeb?.defaultAddress?.base58 ||
    null
  );
}

function scoreTronWebCandidate(tronWeb, address, walletId) {
  if (!isValidTronWeb(tronWeb)) return -100000;

  const currentAddress = getTronWebAddress(tronWeb);
  const providerName = getProviderName(tronWeb);
  const targetWalletId = String(walletId || '').trim().toLowerCase();

  let score = 0;

  if (currentAddress && currentAddress === address) score += 30000;
  if (currentAddress && currentAddress !== address) score -= 25000;

  if (providerName) score += 100;

  if (targetWalletId && providerName && providerName.toLowerCase() === targetWalletId) {
    score += 12000;
  }

  if (targetWalletId && targetWalletId !== 'tronlink' && providerName === 'TronLink') {
    score -= 40000;
  }

  if (targetWalletId && targetWalletId !== 'okx wallet' && providerName === 'OKX Wallet') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'binance wallet' && providerName === 'Binance Wallet') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'tokenpocket' && providerName === 'TokenPocket') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'bitget wallet' && providerName === 'Bitget Wallet') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'trust' && providerName === 'Trust') {
    score -= 12000;
  }

  if (targetWalletId && targetWalletId !== 'metamask' && providerName === 'MetaMask') {
    score -= 12000;
  }

  return score;
}

function pickBestInjectedTronWeb(provider, address, walletId) {
  const candidates = getTronWebCandidates(provider);

  if (!candidates.length) return null;

  const ranked = candidates
    .map((item) => ({
      item,
      score: scoreTronWebCandidate(item, address, walletId)
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > -100000 ? ranked[0].item : null;
}

async function readTrxBalance(address) {
  if (!isUsableAddress(address)) {
    throw new Error('TRX balance: invalid address');
  }

  const tronWeb = getReadOnlyTronWeb(address);
  const balanceSun = await tronWeb.trx.getBalance(address);
  const trx = normalizeSunToTrx(balanceSun);

  if (trx === null) {
    throw new Error('TRX balance: invalid result');
  }

  return trx;
}

async function readTokenBalanceViaContract(address) {
  if (!isUsableAddress(address)) {
    throw new Error('Token balance: invalid address');
  }

  const tronWeb = getReadOnlyTronWeb(address);
  const contract = await tronWeb.contract().at(FOURTEEN_TOKEN_ADDRESS);
  const raw = await contract.balanceOf(address).call();

  const value =
    typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
      ? raw.toString()
      : String(raw);

  const balance = normalizeTokenUnits(value);

  if (balance === null) {
    throw new Error('Token balance: invalid result');
  }

  return balance;
}

async function readTokenBalanceViaTrigger(address) {
  if (!isUsableAddress(address)) {
    throw new Error('Token fallback: invalid address');
  }

  const tronWeb = getReadOnlyTronWeb(address);
  const ownerHex = tronWeb.address.toHex(address);
  const contractHex = tronWeb.address.toHex(FOURTEEN_TOKEN_ADDRESS);

  const res = await tronWeb.transactionBuilder.triggerConstantContract(
    contractHex,
    'balanceOf(address)',
    {},
    [{ type: 'address', value: address }],
    ownerHex
  );

  const hexValue = res?.constant_result?.[0] || null;
  const raw = decodeHexBalance(hexValue);
  const balance = normalizeTokenUnits(raw);

  if (balance === null) {
    throw new Error('Token fallback: decode failed');
  }

  return balance;
}

async function withRetry(fn, retries = 2, delayMs = 500) {
  let lastError = null;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (!isRateLimitError(error) || i === retries) {
        throw error;
      }

      await sleep(delayMs * (i + 1));
    }
  }

  throw lastError;
}

export async function refreshAllBalances({ address, walletId, provider, force = false } = {}) {
  const now = Date.now();

  if (!force && refreshInFlight) {
    return refreshInFlight;
  }

  if (!force && now - lastRefreshAt < 1200) {
    const state = getWalletState();

    return {
      address: state.address || null,
      walletId: state.activeWalletId || state.walletId || null,
      trxBalance: state.trxBalance,
      fourteenBalance: state.fourteenBalance,
      warnings: {
        trx: null,
        token: null
      }
    };
  }

  refreshInFlight = (async () => {
    const state = getWalletState();

    const finalAddress =
      address ||
      state.address ||
      state.account?.address ||
      null;

    const finalWalletId =
      walletId ||
      state.activeWalletId ||
      state.walletId ||
      state.wallet?.activeId ||
      state.wallet?.id ||
      null;

    const finalProvider =
      provider ||
      state.provider ||
      state.tronWeb ||
      state.runtime?.provider ||
      state.runtime?.tronWeb ||
      null;

    if (!isUsableAddress(finalAddress)) {
      throw new Error('refreshAllBalances: invalid address');
    }

    const injectedTronWeb = pickBestInjectedTronWeb(
      finalProvider,
      finalAddress,
      finalWalletId
    );

    const previousTrxBalance = state.trxBalance ?? state.balances?.trx ?? null;
    const previousFourteenBalance = state.fourteenBalance ?? state.balances?.fourteen ?? null;

    setWalletState({
      address: finalAddress,
      walletId: finalWalletId,
      activeWalletId: finalWalletId,
      provider: finalProvider,
      tronWeb: injectedTronWeb || null
    });

    let trxBalance = previousTrxBalance;
    let fourteenBalance = previousFourteenBalance;
    let trxError = null;
    let tokenError = null;

    try {
      trxBalance = await withRetry(() => readTrxBalance(finalAddress), 1, 350);
    } catch (error) {
      trxError = error;
      console.error('[4TEEN] TRX balance error', error);
    }

    try {
      fourteenBalance = await withRetry(() => readTokenBalanceViaContract(finalAddress), 2, 700);
    } catch (error) {
      tokenError = error;
      console.error('[4TEEN] token contract error', error);

      try {
        fourteenBalance = await withRetry(() => readTokenBalanceViaTrigger(finalAddress), 2, 900);
        tokenError = null;
      } catch (fallbackError) {
        tokenError = fallbackError;
        console.error('[4TEEN] token fallback error', fallbackError);
      }
    }

    if (trxBalance === null && fourteenBalance === null) {
      throw new Error('Failed to fetch any balances');
    }

    setWalletState({
      trxBalance,
      fourteenBalance,
      error: null
    });

    lastRefreshAt = Date.now();

    return {
      address: finalAddress,
      walletId: finalWalletId,
      trxBalance,
      fourteenBalance,
      warnings: {
        trx: trxError?.message || null,
        token: tokenError?.message || null
      }
    };
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}
```

---

## FILE: src/services/contracts/trc20.js

```js
export const TRC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  }
];
```

---

## FILE: src/services/readonly/getTokenContractData.js

```js
import { FOURTEEN_TOKEN } from '../../core/config/token.js';
import { getTokenDecimals } from './getTokenDecimals.js';
import { getTokenSymbol } from './getTokenSymbol.js';
import { getTokenTotalSupply } from './getTokenTotalSupply.js';

export async function getTokenContractData(tokenAddress = FOURTEEN_TOKEN.address) {
  const [decimals, symbol] = await Promise.all([
    getTokenDecimals(tokenAddress),
    getTokenSymbol(tokenAddress)
  ]);

  const totalSupply = await getTokenTotalSupply(tokenAddress, decimals);

  return {
    address: tokenAddress,
    symbol,
    decimals,
    totalSupply
  };
}
```

---

## FILE: src/services/readonly/getTokenDecimals.js

```js
import TronWeb from 'tronweb';
import { TRC20_ABI } from '../contracts/trc20.js';

function createReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTokenDecimals(tokenAddress) {
  const tronWeb = createReadOnlyTronWeb();
  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const value = await contract.decimals().call();
  return Number(value);
}
```

---

## FILE: src/services/readonly/getTokenSymbol.js

```js
import TronWeb from 'tronweb';
import { TRC20_ABI } from '../contracts/trc20.js';

function createReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTokenSymbol(tokenAddress) {
  const tronWeb = createReadOnlyTronWeb();
  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  return await contract.symbol().call();
}
```

---

## FILE: src/services/readonly/getTokenTotalSupply.js

```js
import TronWeb from 'tronweb';
import { TRC20_ABI } from '../contracts/trc20.js';

function createReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTokenTotalSupply(tokenAddress, decimals = 6) {
  const tronWeb = createReadOnlyTronWeb();
  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const raw = await contract.totalSupply().call();
  return Number(raw) / Math.pow(10, decimals);
}
```

---

## FILE: src/services/wallet/connectWallet.js

```js
export { connectWallet } from '../../wallet/actions/connectWallet.js';
```

---

## FILE: src/services/wallet/disconnectWallet.js

```js
import { resetWalletState, setWalletState } from '../../core/store/walletStore.js';

function getWindowSafe() {
  return typeof window !== 'undefined' ? window : null;
}

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
}

function resolveAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'unknown'
  );
}

function isWalletConnectAdapter(adapter) {
  const name = String(resolveAdapterName(adapter)).toLowerCase();
  return name === 'walletconnect';
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
  if (typeof window === 'undefined') return;

  const storageTargets = [];

  try {
    if (window.localStorage) storageTargets.push(window.localStorage);
  } catch {}

  try {
    if (window.sessionStorage) storageTargets.push(window.sessionStorage);
  } catch {}

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
    } catch {}
  }
}

function clearRuntimeCaches() {
  const win = getWindowSafe();
  if (!win) return;

  try {
    win.__FOURTEEN_WALLETCONNECT_URI__ = null;
  } catch {}

  try {
    win.__FOURTEEN_LAST_SELECTED_WALLET__ = null;
  } catch {}

  try {
    win.__FOURTEEN_CONNECT_IN_PROGRESS__ = false;
  } catch {}

  try {
    win.__FOURTEEN_ACTIVE_CONNECT_PROMISE__ = null;
  } catch {}

  try {
    win.__FOURTEEN_SELECTED_WALLET_ID__ = null;
  } catch {}

  try {
    win.__FOURTEEN_AUTO_CONNECT_LOCK__ = false;
  } catch {}
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
    } catch {}

    try {
      if ('selectedAddress' in target) {
        target.selectedAddress = null;
      }
    } catch {}

    try {
      if ('address' in target && typeof target.address === 'string') {
        target.address = null;
      }
    } catch {}
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

export async function disconnectWallet(appkit) {
  try {
    setWalletState({
      connecting: false,
      error: null
    });

    if (appkit && typeof appkit.closeWalletPicker === 'function') {
      try {
        appkit.closeWalletPicker();
      } catch {}
    }

    if (appkit?.disconnect && typeof appkit.disconnect === 'function') {
      try {
        await appkit.disconnect();
      } catch (error) {
        console.warn('[4TEEN] appkit.disconnect failed', error);
      }
    }

    const adapters = resolveAdapters(appkit);

    for (const adapter of adapters) {
      await safeDisconnectAdapter(adapter);

      if (isWalletConnectAdapter(adapter)) {
        clearWalletConnectStorage();
      }
    }

    if (appkit) {
      try {
        appkit.connectedAdapter = null;
      } catch {}
    }

    clearRuntimeCaches();
    clearInjectedWalletHints();
    clearWalletConnectStorage();
  } finally {
    resetWalletState();

    setWalletState({
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
      error: null
    });

    const adapters = resolveAdapters(appkit);
    const availableWallets = adapters.map((adapter) => ({
      id: resolveAdapterName(adapter),
      name: resolveAdapterName(adapter),
      readyState: adapter?.readyState || 'Unknown',
      connected: false
    }));

    setWalletState({
      availableWallets
    });
  }

  return { ok: true };
}
```

---

## FILE: src/services/wallet/initWalletKit.js

```js
import { createWalletAdapters } from '../../adapters/createAdapters.js';
import { setWalletLifecycle, setWalletError } from '../../core/store/walletStore.js';
import { buildWalletKitRuntime } from '../runtime/buildWalletKitRuntime.js';
import { waitAdaptersReady } from '../runtime/waitAdaptersReady.js';
import { bindWalletAdapterEvents } from '../runtime/bindWalletAdapterEvents.js';
import { refreshAvailableWallets } from '../runtime/refreshAvailableWallets.js';
import { scheduleRestoreSession } from '../runtime/restoreScheduler.js';
import { scheduleAutoConnect } from '../runtime/autoConnect.js';
import { isWalletBrowser } from '../../adapters/shared/browserDetection.js';

let initialized = false;
let walletKit = null;

export async function initWalletKit({ projectId }) {
  if (initialized && walletKit) {
    refreshAvailableWallets(walletKit);

    if (isWalletBrowser()) {
      scheduleAutoConnect(walletKit, 120);
    }

    scheduleRestoreSession(walletKit, 120);

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  }

  try {
    const adapters = createWalletAdapters({ projectId });

    walletKit = buildWalletKitRuntime({
      projectId,
      adapters
    });

    await waitAdaptersReady(walletKit.adapters);

    bindWalletAdapterEvents(walletKit);

    initialized = true;

    setWalletLifecycle({
      initialized: true
    });

    setWalletError(null);

    refreshAvailableWallets(walletKit);

    if (isWalletBrowser()) {
      scheduleAutoConnect(walletKit, 120);
      scheduleRestoreSession(walletKit, 220);
    } else {
      scheduleRestoreSession(walletKit, 300);
    }

    return {
      appkit: walletKit,
      tronAdapter: null
    };
  } catch (error) {
    setWalletLifecycle({
      initialized: false
    });

    setWalletError(error?.message || 'initWalletKit failed');

    return {
      appkit: null,
      tronAdapter: null
    };
  }
}
```

---

## FILE: src/services/wallet/restoreSession.js

```js
import { setWalletState, getWalletState } from '../../core/store/walletStore.js';
import { shortenAddress } from '../../core/utils/address.js';
import { refreshAllBalances } from '../balances/refreshAllBalances.js';

let restoreInFlight = false;
let lastRestoreAt = 0;
let lastRestoreSignature = null;

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

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function resolveAdapters(appkit) {
  const adapters =
    appkit?.getConnectors?.() ||
    appkit?.connectors ||
    appkit?.adapters ||
    [];

  return Array.isArray(adapters) ? adapters : [];
}

function resolveAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function resolveAdapterId(adapter) {
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
  const id = normalizeWalletId(resolveAdapterId(adapter));
  const name = normalizeWalletId(resolveAdapterName(adapter));

  return id === 'walletconnect' || name === 'walletconnect';
}

function isOkxBrowser() {
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

function isBinanceBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=binance') ||
    ua.includes('bnc/') ||
    ua.includes('binance')
  );
}

function isTronLinkBrowser() {
  const win = getWindowSafe();
  const ua = getUserAgent();
  const href = getLocationHref();

  return (
    href.includes('utm_source=tronlink') ||
    ua.includes('tronlink') ||
    !!win?.tronLink ||
    !!win?.tronWeb?.isTronLink
  );
}

function isTrustBrowser() {
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

function isMetaMaskBrowser() {
  const ua = getUserAgent();
  const href = getLocationHref();

  return href.includes('utm_source=metamask') || ua.includes('metamask');
}

function isTokenPocketBrowser() {
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

function isBitgetBrowser() {
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

function detectBrowserWalletName() {
  if (isOkxBrowser()) return 'OKX Wallet';
  if (isBinanceBrowser()) return 'Binance Wallet';
  if (isTronLinkBrowser()) return 'TronLink';
  if (isTrustBrowser()) return 'Trust';
  if (isMetaMaskBrowser()) return 'MetaMask';
  if (isTokenPocketBrowser()) return 'TokenPocket';
  if (isBitgetBrowser()) return 'Bitget Wallet';
  return null;
}

function getProviderCandidates(appkit, adapter) {
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
    win?.tronWeb
  ].filter(Boolean);
}

function providerMatchesBrowser(provider, browserWalletName) {
  if (!browserWalletName) return true;

  const win = getWindowSafe();

  if (browserWalletName === 'OKX Wallet') {
    return !!(
      provider === win?.okxwallet ||
      provider === win?.okxWallet ||
      provider === win?.okxwallet?.tronWeb ||
      provider === win?.okxWallet?.tronWeb ||
      provider?.isOkxWallet ||
      provider?.isOKExWallet
    );
  }

  if (browserWalletName === 'Binance Wallet') {
    return !!(
      provider === win?.BinanceChain ||
      provider?.isBinance ||
      provider?.chain === 'tron'
    );
  }

  if (browserWalletName === 'TronLink') {
    return !!(
      provider === win?.tronLink ||
      provider === win?.tronLink?.tronWeb ||
      provider === win?.tronWeb ||
      provider?.isTronLink ||
      provider?.tronWeb?.isTronLink
    );
  }

  if (browserWalletName === 'MetaMask') {
    return !!(
      provider === win?.ethereum ||
      provider?.isMetaMask
    );
  }

  if (browserWalletName === 'TokenPocket') {
    return !!(
      provider === win?.tp ||
      provider === win?.tp?.tronWeb ||
      provider === win?.tokenPocket ||
      provider === win?.tokenPocket?.tronWeb ||
      provider?.isTokenPocket
    );
  }

  if (browserWalletName === 'Bitget Wallet') {
    return !!(
      provider === win?.bitkeep ||
      provider === win?.bitkeep?.tronWeb ||
      provider === win?.bitget ||
      provider === win?.bitget?.tronWeb ||
      provider?.isBitKeep ||
      provider?.isBitget
    );
  }

  if (browserWalletName === 'Trust') {
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

function normalizeProvider(appkit, adapter) {
  const browserWalletName = detectBrowserWalletName();
  const candidates = getProviderCandidates(appkit, adapter);

  if (!candidates.length) return null;

  if (browserWalletName) {
    for (const provider of candidates) {
      if (providerMatchesBrowser(provider, browserWalletName)) {
        return provider;
      }
    }
  }

  const adapterName = resolveAdapterName(adapter);

  if (browserWalletName && adapterName !== browserWalletName && !isWalletConnectAdapter(adapter)) {
    return null;
  }

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
    provider?.address,
    provider?.selectedAddress,
    provider?.defaultAddress?.base58,
    provider?.tronWeb?.defaultAddress?.base58
  ];

  for (const candidate of candidates) {
    if (isUsableAddress(candidate)) {
      return candidate;
    }
  }

  return null;
}

function adapterAllowedForCurrentContext(adapter) {
  const browserWalletName = detectBrowserWalletName();
  const adapterName = resolveAdapterName(adapter);

  if (!browserWalletName) return true;
  if (isWalletConnectAdapter(adapter)) return false;

  return adapterName === browserWalletName;
}

function scoreAdapter(appkit, adapter, activeWalletId = null) {
  const adapterName = resolveAdapterName(adapter);
  const adapterId = resolveAdapterId(adapter);
  const provider = normalizeProvider(appkit, adapter);
  const address = resolveAddress(adapter, provider);
  const readyState = String(adapter?.readyState || '');
  const connected = !!adapter?.connected;
  const browserWalletName = detectBrowserWalletName();

  let score = 0;

  if (!adapterAllowedForCurrentContext(adapter)) {
    return -100000;
  }

  if (browserWalletName && adapterName === browserWalletName) score += 15000;

  if (
    activeWalletId &&
    (activeWalletId === adapterName || activeWalletId === adapterId)
  ) {
    score += 12000;
  }

  if (connected) score += 7000;
  if (address) score += 9000;

  if (readyState === 'Found') score += 600;
  if (readyState === 'Installed') score += 500;
  if (readyState === 'Loadable') score += 300;
  if (readyState === 'Loading') score += 100;

  if (provider) score += 300;
  if (isWalletConnectAdapter(adapter)) score -= 50000;

  return score;
}

function pickConnectedAdapter(appkit) {
  const adapters = resolveAdapters(appkit);
  const state = getWalletState();

  if (!adapters.length) return null;

  const ranked = adapters
    .map((adapter) => ({
      adapter,
      provider: normalizeProvider(appkit, adapter),
      score: scoreAdapter(appkit, adapter, state.activeWalletId)
    }))
    .sort((a, b) => b.score - a.score);

  for (const item of ranked) {
    const address = resolveAddress(item.adapter, item.provider);
    if (item.adapter?.connected && isUsableAddress(address)) {
      return {
        adapter: item.adapter,
        provider: item.provider,
        address
      };
    }
  }

  for (const item of ranked) {
    const address = resolveAddress(item.adapter, item.provider);
    if (isUsableAddress(address)) {
      return {
        adapter: item.adapter,
        provider: item.provider,
        address
      };
    }
  }

  return null;
}

function clearState() {
  setWalletState({
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
    fourteenBalance: null
  });

  lastRestoreSignature = null;
}

function buildRestoreSignature(walletId, address) {
  return `${walletId || 'none'}::${address || 'none'}::${detectBrowserWalletName() || 'browserless'}`;
}

export async function restoreSession(appkit) {
  const now = Date.now();

  if (!appkit) return false;
  if (restoreInFlight) return false;
  if (now - lastRestoreAt < 500) return false;

  restoreInFlight = true;
  lastRestoreAt = now;

  try {
    const selected = pickConnectedAdapter(appkit);

    if (!selected) {
      clearState();
      return false;
    }

    const adapter = selected.adapter;
    const provider = selected.provider;
    const address = selected.address;

    if (!provider || !isUsableAddress(address)) {
      clearState();
      return false;
    }

    const walletName = resolveAdapterName(adapter);
    const walletId = resolveAdapterId(adapter) || walletName;
    const signature = buildRestoreSignature(walletId, address);
    const state = getWalletState();

    if (
      state.connected &&
      state.address === address &&
      state.activeWalletId === walletId &&
      lastRestoreSignature === signature
    ) {
      return true;
    }

    setWalletState({
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
    });

    lastRestoreSignature = signature;

    try {
      await refreshAllBalances({
        address,
        walletId,
        provider
      });
    } catch (_) {}

    return true;
  } finally {
    restoreInFlight = false;
  }
}
```
