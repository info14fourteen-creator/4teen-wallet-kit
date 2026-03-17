let overlayRoot = null;
let logBox = null;
let badge = null;
let isVisible = false;
let logs = [];
let maxLogs = 200;
let installed = false;
let originalConsole = null;
let bodyObserver = null;

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
  const hideBtn = makeBtn('Hide');
  const stateBtn = makeBtn('State');
  const envBtn = makeBtn('Env');

  copyBtn.addEventListener('click', () => copyLogs());

  clearBtn.addEventListener('click', () => {
    logs = [];
    refreshLogBox();
  });

  hideBtn.addEventListener('click', () => setVisible(false));

  stateBtn.addEventListener('click', () => {
    try {
      if (window.FourteenKit?.getState) {
        addLog('STATE', window.FourteenKit.getState());
      } else {
        addLog('STATE', 'window.FourteenKit.getState is not available');
      }
    } catch (error) {
      addLog('STATE_ERROR', error);
    }
  });

  envBtn.addEventListener('click', () => {
    addLog('ENV', {
      href: window.location.href,
      userAgent: navigator.userAgent,
      fourteенConnect: !!window.FourteenConnect,
      fourteenKit: !!window.FourteenKit,
      tronWeb: !!window.tronWeb,
      tronLink: !!window.tronLink,
      okxwallet: !!window.okxwallet,
      okx: !!window.okx,
      BinanceChain: !!window.BinanceChain,
      trustwallet: !!window.trustwallet,
      trustWallet: !!window.trustWallet,
      ethereum: !!window.ethereum,
      tokenpocket: !!window.tokenpocket,
      bitkeep: !!window.bitkeep
    });
  });

  actions.appendChild(copyBtn);
  actions.appendChild(clearBtn);
  actions.appendChild(stateBtn);
  actions.appendChild(envBtn);
  actions.appendChild(hideBtn);

  topBar.appendChild(title);
  topBar.appendChild(actions);

  logBox = document.createElement('pre');
  logBox.style.flex = '1';
  logBox.style.margin = '0';
  logBox.style.padding = '10px';
  logBox.style.borderRadius = '12px';
  logBox.style.background = '#050505';
  logBox.style.color = '#93c5fd';
  logBox.style.fontSize = '11px';
  logBox.style.lineHeight = '1.45';
  logBox.style.whiteSpace = 'pre-wrap';
  logBox.style.wordBreak = 'break-word';
  logBox.style.overflow = 'auto';

  panel.appendChild(topBar);
  panel.appendChild(logBox);

  toggle.addEventListener('click', () => {
    setVisible(!isVisible);
  });

  overlayRoot.appendChild(toggle);
  overlayRoot.appendChild(panel);
  document.body.appendChild(overlayRoot);

  refreshLogBox();
}

function patchConsole() {
  if (originalConsole) return;

  originalConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info ? console.info.bind(console) : console.log.bind(console),
    debug: console.debug ? console.debug.bind(console) : console.log.bind(console)
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

  console.info = (...args) => {
    addLog('INFO', ...args);
    originalConsole.info(...args);
  };

  console.debug = (...args) => {
    addLog('DEBUG', ...args);
    originalConsole.debug(...args);
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
}

export function hideDebugOverlay() {
  setVisible(false);
}
