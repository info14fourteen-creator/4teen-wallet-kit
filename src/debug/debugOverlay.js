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
