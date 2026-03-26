import { getSwapQuotes } from './services/quotes.js';
import { executeSwapFlow } from './services/swapExecution.js';
import './swap.css';
import { mountWalletButton } from '../../ui/walletButton.js';
import {
  showNeutralNotice,
  showSuccessNotice,
  showErrorNotice
} from '../../ui/noticeCenter.js';

import sunioLogo from '../../assets/sunio_swap.svg';
import justmoneyLogo from '../../assets/justmoney_swap.svg';
import trxLogo from '../../assets/trx_swap.svg';
import fourteenLogo from '../../assets/4teen_swap.svg';
import usdtLogo from '../../assets/usdt_swap.svg';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONFIG = {
  title: 'Swap 4TEEN to TRX/USDT',
  subtitle: 'Compare routes and swap 4TEEN efficiently',
  infoTitle: 'How route comparison works',
  infoText:
    'This widget compares available swap routes and ranks them from the highest possible output to the lowest. The estimate updates automatically as you type and changes depending on the token you select.\n\nEach route card shows the expected output, minimum received after slippage, route path, execution type, and provider source. As new routing providers are added, they will automatically be included, ranked, and displayed here.\n\nFor now, the module is prepared for a live routing backend and already uses the final visual structure that future on-chain integrations will plug into.',
  mobileConnectHint: 'Tap connect below to continue.',
  sourceLabel: 'SUN.io',
  tokenInSymbol: '4TEEN',
  tokenOutDefault: 'TRX',
  tokenOutOptions: ['TRX', 'USDT'],
  defaultSlippage: '3.00',
  slippageOptions: ['0.50', '1.00', '3.00'],
  estimateDecimals: 2,
  routeCount: 3,
  tokenAddresses: {
    '4TEEN': 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A',
    'TRX': 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
    'WTRX': 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    'USDT': 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  }
};

const TOKEN_META = {
  '4TEEN': {
    symbol: '4TEEN',
    logo: fourteenLogo
  },
  'TRX': {
    symbol: 'TRX',
    logo: trxLogo
  },
  'USDT': {
    symbol: 'USDT',
    logo: usdtLogo
  }
};

const PROVIDER_META = {
  sunio: {
    name: 'SUN.io',
    logo: sunioLogo
  },
  justmoney: {
    name: 'JustMoney',
    logo: justmoneyLogo
  }
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeNoticeMessage(value, fallback = 'Operation failed.') {
  if (typeof value === 'string') {
    const cleaned = value.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  if (typeof value?.message === 'string') {
    const cleaned = value.message.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  if (typeof value?.error === 'string') {
    const cleaned = value.error.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  if (typeof value?.data?.message === 'string') {
    const cleaned = value.data.message.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  return fallback;
}

function getReadableErrorMessage(error, fallback = 'Operation failed.') {
  return normalizeNoticeMessage(error, fallback);
}

function getWalletSafe() {
  return window.FourteenKit || window.FourteenWallet || null;
}

function getWalletStateSafe(wallet) {
  if (!wallet) return null;

  if (typeof wallet.getWalletState === 'function') {
    return wallet.getWalletState();
  }

  if (typeof wallet.getState === 'function') {
    return wallet.getState();
  }

  return null;
}

function getConnectedAddress(wallet) {
  const state = getWalletStateSafe(wallet);

  return (
    state?.address ||
    wallet?.getAddress?.() ||
    wallet?.getTronWeb?.()?.defaultAddress?.base58 ||
    null
  );
}

function isConnectedSafe(wallet) {
  const state = getWalletStateSafe(wallet);
  return !!state?.connected && !!state?.address;
}

function shortenAddress(address) {
  if (!address || typeof address !== 'string') return '';
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false;

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(max-width: 640px)').matches;
  }

  return window.innerWidth <= 640;
}

function parsePositiveNumber(value) {
  const normalized = String(value ?? '').replace(',', '.').trim();
  const num = Number.parseFloat(normalized);

  if (!Number.isFinite(num) || num <= 0) {
    return 0;
  }

  return num;
}

function formatNumber(value, digits = 2) {
  const num = Number(value || 0);

  if (!Number.isFinite(num)) {
    return (0).toFixed(digits);
  }

  return num.toFixed(digits);
}

function getDisplayedReceive(route) {
  return Number(route?.expectedOut ?? route?.receive ?? 0);
}

function getDisplayedMinReceived(route, slippagePercent) {
  if (route?.minReceived != null) {
    return Number(route.minReceived || 0);
  }

  const receive = getDisplayedReceive(route);
  const safeSlippage = Number.parseFloat(slippagePercent || '0') || 0;

  return receive * (1 - safeSlippage / 100);
}

function createRoutePathHtml(route) {
  const fromMeta = TOKEN_META[route.fromToken] || TOKEN_META['4TEEN'];
  const toMeta = TOKEN_META[route.toToken] || TOKEN_META['TRX'];
  const viaParts = Array.isArray(route.via) ? route.via : [];

  return `
    <div class="fourteen-swap-route-card__path-line">
      <span class="fourteen-swap-route-card__path-token">
        <img class="fourteen-swap-route-card__token-logo" src="${fromMeta.logo}" alt="${escapeHtml(fromMeta.symbol)}" />
        <span class="fourteen-swap-route-card__token-symbol">${escapeHtml(fromMeta.symbol)}</span>
      </span>

      ${
        viaParts.length
          ? viaParts
              .map((via) => `<span class="fourteen-swap-route-card__path-via">${escapeHtml(via)}</span>`)
              .join('')
          : ''
      }

      <span class="fourteen-swap-route-card__path-token">
        <img class="fourteen-swap-route-card__token-logo" src="${toMeta.logo}" alt="${escapeHtml(toMeta.symbol)}" />
        <span class="fourteen-swap-route-card__token-symbol">${escapeHtml(toMeta.symbol)}</span>
      </span>
    </div>
  `;
}

export function mountSwap(target, config = {}) {
  const {
    title,
    subtitle,
    infoTitle,
    infoText,
    mobileConnectHint,
    sourceLabel,
    tokenInSymbol,
    tokenOutDefault,
    tokenOutOptions,
    defaultSlippage,
    slippageOptions,
    estimateDecimals,
    routeCount,
    tokenAddresses
  } = { ...DEFAULT_CONFIG, ...config };

  if (!target) {
    throw new Error('mountSwap: target is required');
  }

  const wallet = getWalletSafe();

  if (!wallet) {
    throw new Error('Fourteen wallet runtime is not loaded');
  }

  if (ACTIVE_INSTANCES.has(target)) {
    try {
      ACTIVE_INSTANCES.get(target).destroy();
    } catch (_) {}
  }

  target.innerHTML = `
    <div class="fourteen-swap-widget">
      <div class="fourteen-swap-shell">
        <div class="fourteen-swap-hero">
          <div class="fourteen-swap-hero__bg"></div>

          <div class="fourteen-swap-hero__text">
            <div class="fourteen-swap-hero__title">
              ${escapeHtml(title).replace('4TEEN', '<span>4TEEN</span>')}
            </div>
            <div class="fourteen-swap-hero__subtitle">${escapeHtml(subtitle)}</div>
          </div>

          <div class="fourteen-swap-hero__actions">
            <div class="fourteen-swap-badge">${escapeHtml(sourceLabel)}</div>

            <div class="fourteen-swap-info-toggle-wrap">
              <button
                class="fourteen-swap-info-toggle"
                type="button"
                aria-label="Swap info"
                aria-expanded="false"
                data-role="swap-info-toggle"
              >
                i
              </button>

              <div class="fourteen-swap-popover" data-role="swap-popover" hidden>
                <div class="fourteen-swap-popover__title">${escapeHtml(infoTitle)}</div>
                <div class="fourteen-swap-popover__text">${escapeHtml(infoText).replaceAll('\n', '<br><br>')}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-swap-topbar">
          <div class="fourteen-swap-wallet" data-role="wallet-label">Wallet not connected</div>
        </div>

        <div class="fourteen-swap-connect-slot">
          <div class="fourteen-swap-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-swap-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(mobileConnectHint)}
          </div>
        </div>

        <div class="fourteen-swap-form">
          <div class="fourteen-swap-form__meta-row">
            <div class="fourteen-swap-form__meta-label">Amount tokens to swap</div>

            <div class="fourteen-swap-form__slippage-wrap">
              <label class="fourteen-swap-form__meta-label" for="fourteen-swap-slippage">Slippage</label>
              <select class="fourteen-swap-slippage" id="fourteen-swap-slippage" data-role="slippage-select">
                ${slippageOptions.map((item) => `
                  <option value="${escapeHtml(item)}" ${String(item) === String(defaultSlippage) ? 'selected' : ''}>
                    ${escapeHtml(item)}%
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="fourteen-swap-input-wrap">
            <input
              class="fourteen-swap-input"
              type="number"
              step="0.000001"
              min="0"
              inputmode="decimal"
              placeholder="0.00"
              data-role="amount-input"
            />
            <div class="fourteen-swap-input__suffix">
              <img class="fourteen-swap-input__token-logo" src="${fourteenLogo}" alt="4TEEN" />
              <span>${escapeHtml(tokenInSymbol)}</span>
            </div>
          </div>

          <div class="fourteen-swap-form__meta-row fourteen-swap-form__meta-row--estimate">
            <div class="fourteen-swap-form__meta-label">Estimate</div>

            <div class="fourteen-swap-target-switch" data-role="target-switch">
              ${tokenOutOptions.map((symbol) => {
                const meta = TOKEN_META[symbol];
                const active = symbol === tokenOutDefault;

                return `
                  <button
                    type="button"
                    class="fourteen-swap-target-switch__button ${active ? 'is-active' : ''}"
                    data-role="target-button"
                    data-token="${escapeHtml(symbol)}"
                    aria-pressed="${active ? 'true' : 'false'}"
                  >
                    <img class="fourteen-swap-target-switch__logo" src="${meta.logo}" alt="${escapeHtml(symbol)}" />
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="fourteen-swap-estimate-wrap">
            <div class="fourteen-swap-estimate">
              <div class="fourteen-swap-estimate__value" data-role="estimate-value">0.00</div>
              <div class="fourteen-swap-estimate__suffix">
                <img class="fourteen-swap-estimate__token-logo" src="${trxLogo}" alt="TRX" data-role="estimate-logo" />
                <span data-role="estimate-symbol">${escapeHtml(tokenOutDefault)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-swap-routes-head">
          <div class="fourteen-swap-routes-head__title">Available Routes</div>
          <div class="fourteen-swap-routes-head__subtitle" data-role="routes-summary">0 routes found via ${escapeHtml(sourceLabel)}</div>
        </div>

        <div class="fourteen-swap-routes" data-role="routes-list"></div>

        <div class="fourteen-swap-status" data-role="status" role="status" aria-live="polite"></div>
      </div>
    </div>
  `;

  const walletInfoEl = target.querySelector('[data-role="wallet-label"]');
  const infoToggleEl = target.querySelector('[data-role="swap-info-toggle"]');
  const popoverEl = target.querySelector('[data-role="swap-popover"]');
  const connectSlotEl = target.querySelector('.fourteen-swap-connect-slot');
  const embeddedWalletButtonEl = target.querySelector('[data-role="embedded-wallet-button"]');
  const mobileConnectHintEl = target.querySelector('[data-role="mobile-connect-hint"]');
  const amountInputEl = target.querySelector('[data-role="amount-input"]');
  const slippageSelectEl = target.querySelector('[data-role="slippage-select"]');
  const targetButtons = Array.from(target.querySelectorAll('[data-role="target-button"]'));
  const estimateValueEl = target.querySelector('[data-role="estimate-value"]');
  const estimateSymbolEl = target.querySelector('[data-role="estimate-symbol"]');
  const estimateLogoEl = target.querySelector('[data-role="estimate-logo"]');
  const routesSummaryEl = target.querySelector('[data-role="routes-summary"]');
  const routesListEl = target.querySelector('[data-role="routes-list"]');
  const statusEl = target.querySelector('[data-role="status"]');

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;
  let selectedTarget = tokenOutDefault;
  let currentRoutes = [];
  let isSwapPending = false;
  let quotesRequestId = 0;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function setStatus(message = '', isError = false) {
    if (!statusEl) return;
    statusEl.textContent = normalizeNoticeMessage(message, '');
    statusEl.dataset.state = isError ? 'error' : 'default';
  }

  function closePopover() {
    if (!popoverEl || !infoToggleEl) return;
    popoverEl.hidden = true;
    infoToggleEl.setAttribute('aria-expanded', 'false');
  }

  function togglePopover(event) {
    event?.stopPropagation?.();

    if (!popoverEl || !infoToggleEl) return;

    const nextHidden = !popoverEl.hidden;
    popoverEl.hidden = nextHidden;
    infoToggleEl.setAttribute('aria-expanded', nextHidden ? 'false' : 'true');
  }

  function handleOutsideClick(event) {
    if (!target.contains(event.target)) {
      closePopover();
    }
  }

  function updateWalletLabel() {
    const address = getConnectedAddress(wallet);

    if (!isConnectedSafe(wallet) || !address) {
      walletInfoEl.textContent = 'Wallet not connected';
      return;
    }

    walletInfoEl.textContent = `Wallet ${shortenAddress(address)}`;
  }

  function unmountEmbeddedWalletButton() {
    try {
      embeddedWalletUnmount?.();
    } catch (_) {}

    embeddedWalletUnmount = null;

    if (embeddedWalletButtonEl) {
      embeddedWalletButtonEl.innerHTML = '';
    }
  }

  async function refreshBalancesSafe() {
    if (!wallet || typeof wallet.refreshBalances !== 'function') {
      return;
    }

    try {
      await wallet.refreshBalances();
    } catch (_) {}
  }

  function syncEmbeddedWalletUi() {
    const connected = isConnectedSafe(wallet);
    const mobile = isMobileViewport();

    if (connectSlotEl) {
      connectSlotEl.hidden = connected;
    }

    if (connected) {
      unmountEmbeddedWalletButton();

      if (mobileConnectHintEl) {
        mobileConnectHintEl.hidden = true;
      }

      return;
    }

    if (mobile) {
      unmountEmbeddedWalletButton();

      if (mobileConnectHintEl) {
        mobileConnectHintEl.hidden = false;
      }

      return;
    }

    if (mobileConnectHintEl) {
      mobileConnectHintEl.hidden = true;
    }

    if (embeddedWalletUnmount || !embeddedWalletButtonEl) {
      return;
    }

    embeddedWalletUnmount = mountWalletButton(embeddedWalletButtonEl, {
      variant: 'hero',
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await wait(450);
          await refreshBalancesSafe();
          handleWalletUpdate();
        }
      },
      onRefresh: async () => {
        await refreshBalancesSafe();
        handleWalletUpdate();
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
        handleWalletUpdate();
      }
    });
  }

  function updateTargetButtons() {
    targetButtons.forEach((button) => {
      const token = button.getAttribute('data-token');
      const active = token === selectedTarget;

      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateSwapButtonsDisabledState() {
    const disabled = isSwapPending || !isConnectedSafe(wallet);

    Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
      button.disabled = disabled || button.dataset.executable === 'false';
      button.textContent = isSwapPending ? 'Processing...' : button.dataset.executable === 'false' ? 'Unavailable' : 'Swap';
    });
  }

  function resetSwapFormState() {
    if (amountInputEl) {
      amountInputEl.value = '';
    }

    currentRoutes = [];
    quotesRequestId += 1;
    renderEstimate();
    renderRoutes({ preserveStatus: true });
  }

  async function buildRoutes() {
    const amount = parsePositiveNumber(amountInputEl?.value);

    if (!amount || amount <= 0) {
      currentRoutes = [];
      return;
    }

    const requestId = ++quotesRequestId;

    const routes = await getSwapQuotes({
      amountIn: amount,
      targetToken: selectedTarget,
      fromTokenAddress: tokenAddresses['4TEEN'],
      tokenAddresses: {
        TRX: tokenAddresses['TRX'],
        WTRX: tokenAddresses['WTRX'],
        USDT: tokenAddresses['USDT']
      },
      inputDecimals: 6,
      outputDecimals: 6,
      routeCount
    });

    if (requestId !== quotesRequestId) {
      return;
    }

    currentRoutes = routes;
  }

  function renderEstimate() {
    const bestRoute = currentRoutes[0] || null;
    const toMeta = TOKEN_META[selectedTarget] || TOKEN_META['TRX'];

    estimateLogoEl.src = toMeta.logo;
    estimateLogoEl.alt = toMeta.symbol;
    estimateSymbolEl.textContent = toMeta.symbol;
    estimateValueEl.textContent = bestRoute
      ? formatNumber(getDisplayedReceive(bestRoute), estimateDecimals)
      : formatNumber(0, estimateDecimals);
  }

  function renderRoutes(options = {}) {
    const preserveStatus = Boolean(options.preserveStatus);
    const amount = parsePositiveNumber(amountInputEl?.value);
    const count = currentRoutes.length;
    routesSummaryEl.textContent = `${count} ${count === 1 ? 'route' : 'routes'} found via ${sourceLabel}`;

    if (!amount || amount <= 0) {
      routesListEl.innerHTML = `
        <div class="fourteen-swap-routes-empty">
          Enter an amount to preview available routes.
        </div>
      `;
      if (!preserveStatus) {
        setStatus('');
      }
      return;
    }

    if (!count) {
      routesListEl.innerHTML = `
        <div class="fourteen-swap-routes-empty">
          No routes available for this amount right now.
        </div>
      `;
      if (!preserveStatus) {
        setStatus('No routes available right now.', true);
      }
      return;
    }

    const currentSlippage = slippageSelectEl?.value || defaultSlippage;

    routesListEl.innerHTML = currentRoutes
      .map((route) => {
        const displayedReceive = getDisplayedReceive(route);
        const displayedMinReceived = getDisplayedMinReceived(route, currentSlippage);
        const executable = route?.isExecutable !== false;

        return `
          <div class="fourteen-swap-route-card ${executable ? '' : 'is-disabled-route'}">
            <div class="fourteen-swap-route-card__left">
              <div class="fourteen-swap-route-card__eyebrow">You receive</div>
              <div class="fourteen-swap-route-card__receive">
                ${escapeHtml(formatNumber(displayedReceive, estimateDecimals))} ${escapeHtml(route.toToken)}
              </div>

              <div class="fourteen-swap-route-card__min">
                Min received ${escapeHtml(formatNumber(displayedMinReceived, estimateDecimals))} ${escapeHtml(route.toToken)}
              </div>

              <button
                type="button"
                class="fourteen-swap-route-card__action"
                data-role="swap-route-button"
                data-route-id="${escapeHtml(route.id)}"
                data-executable="${executable ? 'true' : 'false'}"
                ${isConnectedSafe(wallet) && !isSwapPending && executable ? '' : 'disabled'}
              >
                ${isSwapPending ? 'Processing...' : executable ? 'Swap' : 'Unavailable'}
              </button>
            </div>

            <div class="fourteen-swap-route-card__divider" aria-hidden="true"></div>

            <div class="fourteen-swap-route-card__right">
              <div class="fourteen-swap-route-card__provider">
                <img class="fourteen-swap-route-card__provider-logo" src="${route.providerLogo}" alt="${escapeHtml(route.providerName)}" />
              </div>

              <div class="fourteen-swap-route-card__detail fourteen-swap-route-card__detail--path">
                <div class="fourteen-swap-route-card__label">Path</div>
                <div class="fourteen-swap-route-card__value">
                  ${createRoutePathHtml(route)}
                </div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Route</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.routeLabel || PROVIDER_META[route.provider]?.name || route.providerName)}</div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Execution</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.executionLabel ?? '—')}</div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Impact</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.impactLabel ?? '—')}</div>
              </div>

              ${
                executable
                  ? ''
                  : `
                    <div class="fourteen-swap-route-card__detail">
                      <div class="fourteen-swap-route-card__label">Status</div>
                      <div class="fourteen-swap-route-card__value">Quote available, execution not supported yet</div>
                    </div>
                  `
              }
            </div>
          </div>
        `;
      })
      .join('');

    Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
      button.addEventListener('click', handleRouteSwapClick);
    });

    updateSwapButtonsDisabledState();

    if (!preserveStatus) {
      const best = currentRoutes[0];
      if (best) {
        setStatus(
          `Best route: ${best.providerName} · ${formatNumber(
            getDisplayedReceive(best),
            estimateDecimals
          )} ${best.toToken}`
        );
      } else {
        setStatus('');
      }
    }
  }

  async function syncQuotes(options = {}) {
    const preserveStatus = Boolean(options.preserveStatus);
    await buildRoutes();
    renderEstimate();
    renderRoutes({ preserveStatus });
  }

  function handleAmountInput() {
    if (isSwapPending) return;

    syncQuotes().catch((error) => {
      console.error('[4TEEN] swap quotes failed', error);
      const message = getReadableErrorMessage(error, 'Failed to load routes.');
      setStatus(message, true);
      showErrorNotice(message);
    });
  }

  function handleSlippageChange() {
    if (isSwapPending) return;

    syncQuotes().catch((error) => {
      console.error('[4TEEN] swap slippage refresh failed', error);
      const message = getReadableErrorMessage(error, 'Failed to refresh routes.');
      setStatus(message, true);
      showErrorNotice(message);
    });
  }

  function handleTargetClick(event) {
    if (isSwapPending) return;

    const button = event.currentTarget;
    const token = button.getAttribute('data-token');

    if (!token || token === selectedTarget) {
      return;
    }

    selectedTarget = token;
    updateTargetButtons();

    syncQuotes().catch((error) => {
      console.error('[4TEEN] swap target refresh failed', error);
      const message = getReadableErrorMessage(error, 'Failed to refresh routes.');
      setStatus(message, true);
      showErrorNotice(message);
    });
  }

  function handleExecutionProgress(progress) {
    const step = progress?.step || '';
    const message = normalizeNoticeMessage(progress?.message, '');

    if (message) {
      setStatus(message, step === 'error');
    }

    if (
      step === 'validating' ||
      step === 'checking-allowance' ||
      step === 'approval-required' ||
      step === 'approval-submitted' ||
      step === 'approval-confirming' ||
      step === 'approval-confirmed' ||
      step === 'approval-ready' ||
      step === 'swap-submitting' ||
      step === 'swap-submitted' ||
      step === 'swap-confirming'
    ) {
      if (message) {
        showNeutralNotice(message, 2600);
      }
      return;
    }

    if (step === 'swap-confirmed' || step === 'success') {
      if (message) {
        showSuccessNotice(message, 4200);
      }
      return;
    }

    if (step === 'error') {
      showErrorNotice(message || 'Swap failed.', 4200);
    }
  }

  async function handleRouteSwapClick(event) {
    if (isSwapPending) {
      return;
    }

    const routeId = event.currentTarget?.getAttribute('data-route-id');
    const route = currentRoutes.find((item) => item.id === routeId);
    const amountIn = parsePositiveNumber(amountInputEl?.value);
    const slippage = slippageSelectEl?.value || defaultSlippage;

    if (!route) {
      const message = 'Route not found.';
      setStatus(message, true);
      showErrorNotice(message);
      return;
    }

    if (route?.isExecutable === false) {
      const message = 'This route is shown by the quote engine, but execution is not supported by the widget yet.';
      setStatus(message, true);
      showErrorNotice(message, 4200);
      return;
    }

    if (!isConnectedSafe(wallet)) {
      const message = 'Connect wallet first.';
      setStatus(message, true);
      showErrorNotice(message);
      return;
    }

    if (!amountIn || amountIn <= 0) {
      const message = 'Enter amount first.';
      setStatus(message, true);
      showErrorNotice(message);
      return;
    }

    isSwapPending = true;
    updateSwapButtonsDisabledState();

    const preparingMessage = `Preparing ${route.providerName} swap...`;
    setStatus(preparingMessage);
    showNeutralNotice(preparingMessage, 2200);

    try {
      const result = await executeSwapFlow({
        wallet,
        selectedRoute: route,
        amountIn,
        slippage,
        inputTokenAddress: tokenAddresses['4TEEN'],
        inputTokenDecimals: 6,
        outputTokenDecimals: 6,
        reportProgress: handleExecutionProgress
      });

      if (result?.ok) {
        const successMessage = normalizeNoticeMessage(
          result?.successMessage,
          route.toToken === 'TRX'
            ? 'Swap completed successfully. TRX received.'
            : `Swap completed successfully. ${route.toToken} received.`
        );

        setStatus(successMessage, false);
        showSuccessNotice(successMessage, 5200);

        await refreshBalancesSafe();
        resetSwapFormState();
        handleWalletUpdate();

        return;
      }

      const fallbackMessage = normalizeNoticeMessage(result?.message, 'Swap failed.');
      setStatus(fallbackMessage, true);
      showErrorNotice(fallbackMessage, 4200);
    } catch (error) {
      console.error('[4TEEN] swap execution failed', error);
      const message = getReadableErrorMessage(error, 'Swap execution failed.');
      setStatus(message, true);
      showErrorNotice(message, 4200);
    } finally {
      isSwapPending = false;
      updateSwapButtonsDisabledState();
      renderEstimate();
      renderRoutes({ preserveStatus: true });
    }
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncEmbeddedWalletUi();
    updateWalletLabel();
    updateSwapButtonsDisabledState();
  }

  function handleResize() {
    if (!isAlive()) return;
    syncEmbeddedWalletUi();
  }

  infoToggleEl?.addEventListener('click', togglePopover);
  document.addEventListener('click', handleOutsideClick);
  amountInputEl?.addEventListener('input', handleAmountInput);
  slippageSelectEl?.addEventListener('change', handleSlippageChange);
  targetButtons.forEach((button) => {
    button.addEventListener('click', handleTargetClick);
  });

  if (typeof window !== 'undefined' && !resizeListenerBound) {
    window.addEventListener('resize', handleResize);
    resizeListenerBound = true;
  }

  if (typeof wallet.subscribe === 'function') {
    walletUnsubscribe = wallet.subscribe(handleWalletUpdate);
  }

  const instance = {
    destroy() {
      isDestroyed = true;
      unmountEmbeddedWalletButton();

      infoToggleEl?.removeEventListener('click', togglePopover);
      document.removeEventListener('click', handleOutsideClick);
      amountInputEl?.removeEventListener('input', handleAmountInput);
      slippageSelectEl?.removeEventListener('change', handleSlippageChange);

      targetButtons.forEach((button) => {
        button.removeEventListener('click', handleTargetClick);
      });

      Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
        button.removeEventListener('click', handleRouteSwapClick);
      });

      if (resizeListenerBound && typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        resizeListenerBound = false;
      }

      try {
        walletUnsubscribe?.();
      } catch (_) {}
    }
  };

  ACTIVE_INSTANCES.set(target, instance);

  updateTargetButtons();
  syncEmbeddedWalletUi();
  updateWalletLabel();

  syncQuotes().catch((error) => {
    console.error('[4TEEN] initial swap quotes failed', error);
    const message = getReadableErrorMessage(error, 'Failed to load routes.');
    setStatus(message, true);
    showErrorNotice(message);
  });

  return instance;
}
