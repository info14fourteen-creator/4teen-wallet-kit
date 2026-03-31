# 4teen-wallet-kit — WIDGETS SWAP

Generated: 2026-03-31T00:01:16.787Z
Repository: info14fourteen-creator/4teen-wallet-kit
Branch: main

## Snapshot rules

- This is a curated AI snapshot, not a full raw dump.
- Files are grouped for easier reading.
- Every file in this snapshot belongs to the repository shown above.

## Included files

- 4teen-wallet-kit :: src/widgets/swap/constants.js
- 4teen-wallet-kit :: src/widgets/swap/index.js
- 4teen-wallet-kit :: src/widgets/swap/providers/justmoney.js
- 4teen-wallet-kit :: src/widgets/swap/providers/sunio.js
- 4teen-wallet-kit :: src/widgets/swap/services/quotes.js
- 4teen-wallet-kit :: src/widgets/swap/services/swapExecution.js
- 4teen-wallet-kit :: src/widgets/swap/swap.css

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/constants.js

```js

```

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/index.js

```js
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
```

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/providers/justmoney.js

```js
export async function getJustmoneyQuotes() {
  return [];
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/providers/sunio.js

```js
import sunioLogo from '../../../assets/sunio_swap.svg';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

export const SUNIO_MAINNET_DEFAULTS = {
  smartRouterAddress: 'TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j',
  calculationServiceUrl: 'https://rot.endjgfsv.link/swap/routerUniversal',
  feeLimit: 500_000_000,
  deadlineSeconds: 60 * 20,
  defaultSlippageBps: 300,
  typeList: ''
};

export const SUNIO_TOKEN_ADDRESSES = {
  TRX: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  WTRX: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  USDT: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
};

const MAX_UINT256 = (2n ** 256n - 1n).toString();

const TRC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const SMART_ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'string[]', name: 'poolVersion', type: 'string[]' },
      { internalType: 'uint256[]', name: 'versionLen', type: 'uint256[]' },
      { internalType: 'uint24[]', name: 'fees', type: 'uint24[]' },
      {
        components: [
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' }
        ],
        internalType: 'struct ISmartExchangeRouter.SwapData',
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'swapExactInput',
    outputs: [{ internalType: 'uint256[]', name: 'amountsOut', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function'
  }
];

export function getSunioProviderMeta() {
  return {
    id: PROVIDER_ID,
    name: PROVIDER_NAME,
    logo: sunioLogo
  };
}

export function getSunioSpenderAddressForRoute() {
  return SUNIO_MAINNET_DEFAULTS.smartRouterAddress;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function parseSlippageBps(
  slippage,
  fallbackBps = SUNIO_MAINNET_DEFAULTS.defaultSlippageBps
) {
  const num = Number.parseFloat(slippage);

  if (!Number.isFinite(num) || num < 0) {
    return fallbackBps;
  }

  return Math.round(num * 100);
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

function getTronWebSafe(wallet) {
  if (!wallet) return null;

  if (typeof wallet.getTronWeb === 'function') {
    return wallet.getTronWeb();
  }

  const state = getWalletStateSafe(wallet);
  return state?.tronWeb || null;
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

function isUsableAddress(address) {
  return typeof address === 'string' && address.length >= 20;
}

function isHexStrict(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]+$/.test(value);
}

function normalizeBigintLike(value) {
  if (typeof value === 'bigint') return value;

  if (typeof value === 'number') {
    return BigInt(Math.trunc(value));
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) return 0n;

    if (isHexStrict(trimmed)) {
      return BigInt(trimmed);
    }

    return BigInt(trimmed);
  }

  if (value && typeof value.toString === 'function') {
    return BigInt(value.toString());
  }

  return 0n;
}

function decimalToRaw(amount, decimals) {
  const safeDecimals = Math.max(0, Number(decimals || 0));
  const normalized = String(amount ?? '0').replace(',', '.').trim();

  if (!normalized) return 0n;

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error(`Invalid decimal amount: ${amount}`);
  }

  const [whole, fraction = ''] = normalized.split('.');
  const paddedFraction = (fraction + '0'.repeat(safeDecimals)).slice(0, safeDecimals);

  return (
    BigInt(whole || '0') * 10n ** BigInt(safeDecimals) +
    BigInt(paddedFraction || '0')
  );
}

function humanOutputToRaw(value, decimals) {
  return decimalToRaw(value, decimals);
}

function calcMinOutRawFromExpected(expectedOutRaw, slippageBps) {
  const safeExpected = normalizeBigintLike(expectedOutRaw);
  const safeBps = BigInt(Math.max(0, Number(slippageBps || 0)));

  return (safeExpected * (10000n - safeBps)) / 10000n;
}

async function getTokenDecimals(tronWeb, tokenAddress, fallback = 6) {
  try {
    const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
    const result = await contract.decimals().call();
    return Number(result?.toString?.() || result || fallback);
  } catch (_) {
    return fallback;
  }
}

function assertExecutableRoute(route) {
  if (!route) {
    throw new Error('SUN.io execution: route is required');
  }

  if (!Array.isArray(route.path) || route.path.length < 2) {
    throw new Error('SUN.io execution: route.path is required');
  }

  if (!Array.isArray(route.poolVersion) || !route.poolVersion.length) {
    throw new Error('SUN.io execution: route.poolVersion is required');
  }

  if (!Array.isArray(route.versionLen) || !route.versionLen.length) {
    throw new Error('SUN.io execution: route.versionLen is required');
  }

  if (!Array.isArray(route.fees) || !route.fees.length) {
    throw new Error('SUN.io execution: route.fees is required');
  }

  if (route.isExecutable === false) {
    throw new Error(
      'SUN.io execution: selected route is not supported by the current widget implementation'
    );
  }
}

function getTargetTokenParam(targetToken, tokenAddresses = {}) {
  if (targetToken === 'TRX') {
    return tokenAddresses.TRX || SUNIO_TOKEN_ADDRESSES.TRX;
  }

  if (targetToken === 'USDT') {
    return tokenAddresses.USDT || SUNIO_TOKEN_ADDRESSES.USDT;
  }

  return tokenAddresses[targetToken] || null;
}

function getOutputDecimalsByTarget(targetToken, explicitDecimals = null) {
  if (Number.isFinite(Number(explicitDecimals))) {
    return Number(explicitDecimals);
  }

  if (targetToken === 'TRX') return 6;
  if (targetToken === 'USDT') return 6;

  return 6;
}

function buildVersionLen(poolVersions = []) {
  if (!Array.isArray(poolVersions) || !poolVersions.length) {
    return [];
  }

  const result = [];
  let current = poolVersions[0];
  let count = 1;

  for (let i = 1; i < poolVersions.length; i += 1) {
    if (poolVersions[i] === current) {
      count += 1;
    } else {
      result.push(result.length === 0 ? count + 1 : count);
      current = poolVersions[i];
      count = 1;
    }
  }

  result.push(result.length === 0 ? count + 1 : count);
  return result;
}

function normalizePoolVersions(poolVersions = []) {
  if (!Array.isArray(poolVersions)) return [];
  return poolVersions.map((item) => String(item || '').trim()).filter(Boolean);
}

function normalizePoolFees(poolFees = [], tokenCount = 0) {
  const normalized = Array.isArray(poolFees)
    ? poolFees.map((item) => Number.parseInt(String(item ?? '0'), 10) || 0)
    : [];

  if (normalized.length >= tokenCount) {
    return normalized.slice(0, tokenCount);
  }

  if (tokenCount > 0) {
    return [...normalized, ...new Array(tokenCount - normalized.length).fill(0)];
  }

  return normalized;
}

function ensureTronWebAddress(tronWeb, address) {
  if (!tronWeb || !isUsableAddress(address)) {
    return;
  }

  let hex = '';

  try {
    if (typeof tronWeb?.address?.toHex === 'function') {
      hex = tronWeb.address.toHex(address) || '';
    }
  } catch (_) {}

  try {
    if (typeof tronWeb.setAddress === 'function') {
      tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    tronWeb.defaultAddress = {
      ...(tronWeb.defaultAddress || {}),
      base58: address,
      ...(hex ? { hex } : {})
    };
  } catch (_) {}

  try {
    if (!tronWeb.defaultAddress) {
      tronWeb.defaultAddress = {};
    }

    tronWeb.defaultAddress.base58 = address;

    if (hex) {
      tronWeb.defaultAddress.hex = hex;
    }
  } catch (_) {}
}

function prepareTronWebForSigning(tronWeb, owner) {
  if (!tronWeb) {
    throw new Error('SUN.io execution: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io execution: owner address is invalid');
  }

  ensureTronWebAddress(tronWeb, owner);

  const defaultBase58 = tronWeb?.defaultAddress?.base58;

  if (!defaultBase58 || defaultBase58 !== owner) {
    throw new Error('SUN.io execution: owner_address is not set');
  }
}

function tryDecodeHexMessage(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  const normalized = message.startsWith('0x') ? message.slice(2) : message;

  if (!/^[0-9a-fA-F]+$/.test(normalized)) {
    return message;
  }

  try {
    let text = '';

    for (let i = 0; i < normalized.length; i += 2) {
      const code = Number.parseInt(normalized.slice(i, i + 2), 16);

      if (Number.isFinite(code) && code > 0) {
        text += String.fromCharCode(code);
      }
    }

    return text.replace(/\0/g, '').trim() || message;
  } catch (_) {
    return message;
  }
}

function collectErrorStrings(error, bucket = []) {
  if (!error) {
    return bucket;
  }

  if (typeof error === 'string') {
    bucket.push(error);
    return bucket;
  }

  if (typeof error?.message === 'string') {
    bucket.push(error.message);
  }

  if (typeof error?.error === 'string') {
    bucket.push(error.error);
  }

  if (typeof error?.data === 'string') {
    bucket.push(error.data);
  }

  if (typeof error?.data?.message === 'string') {
    bucket.push(error.data.message);
  }

  if (typeof error?.data?.error === 'string') {
    bucket.push(error.data.error);
  }

  if (typeof error?.response?.data?.message === 'string') {
    bucket.push(error.response.data.message);
  }

  if (typeof error?.response?.data?.error === 'string') {
    bucket.push(error.response.data.error);
  }

  if (Array.isArray(error?.errors)) {
    error.errors.forEach((item) => collectErrorStrings(item, bucket));
  }

  return bucket;
}

function normalizeErrorText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^error:\s*/i, '')
    .trim();
}

function extractContractError(error) {
  const rawCandidates = collectErrorStrings(error)
    .map((item) => tryDecodeHexMessage(String(item || '')))
    .map((item) => normalizeErrorText(item))
    .filter(Boolean);

  const joined = rawCandidates.join(' | ');
  const lower = joined.toLowerCase();

  if (!joined) {
    return 'Swap execution failed.';
  }

  if (lower.includes('owner_address isn\'t set') || lower.includes('owner_address is not set')) {
    return 'Wallet connection is not ready. Please reconnect the wallet and try again.';
  }

  if (lower.includes('network fee estimation unsuccessful')) {
    return 'Network fee estimation failed. Please try again in a moment.';
  }

  if (lower.includes('third-party contract execution error')) {
    return 'The swap transaction was rejected by the target contract. Please try another route or try again later.';
  }

  if (lower.includes('insufficient output amount') || lower.includes('amountoutmin')) {
    return 'Price changed before confirmation. Please try again.';
  }

  if (lower.includes('out of energy') || lower.includes('not enough energy')) {
    return 'Not enough TRX energy for this transaction. Please add more TRX for network resources and try again.';
  }

  if (lower.includes('bandwidth')) {
    return 'Not enough bandwidth for this transaction. Please try again after replenishing wallet resources.';
  }

  if (lower.includes('user denied') || lower.includes('user rejected') || lower.includes('cancelled')) {
    return 'Transaction was cancelled in the wallet.';
  }

  return rawCandidates[0];
}

function isTransientNetworkError(error) {
  const message = String(error?.message || error || '').toLowerCase();

  return (
    message.includes('network error') ||
    message.includes('failed to fetch') ||
    message.includes('fetch failed') ||
    message.includes('timeout') ||
    message.includes('request failed') ||
    message.includes('socket hang up') ||
    message.includes('connection') ||
    message.includes('disconnected')
  );
}

function isRouteExecutableByWidget({
  tokens = [],
  poolVersions = [],
  versionLen = []
} = {}) {
  if (!Array.isArray(tokens) || tokens.length < 2) return false;
  if (!Array.isArray(poolVersions) || !poolVersions.length) return false;
  if (!Array.isArray(versionLen) || !versionLen.length) return false;
  return true;
}

function mapApiRouteToSunioRoute(apiRoute, targetToken, outputDecimals) {
  const tokens = Array.isArray(apiRoute?.tokens) ? apiRoute.tokens : [];
  const symbols = Array.isArray(apiRoute?.symbols) ? apiRoute.symbols : [];
  const poolVersions = normalizePoolVersions(apiRoute?.poolVersions);
  const fees = normalizePoolFees(apiRoute?.poolFees, tokens.length);
  const versionLen = buildVersionLen(poolVersions);
  const isExecutable = isRouteExecutableByWidget({
    tokens,
    poolVersions,
    versionLen
  });

  return {
    id: `sunio-${targetToken}-${tokens.join('-')}-${poolVersions.join('-')}`,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    providerLogo: sunioLogo,
    providerMeta: getSunioProviderMeta(),
    fromToken: '4TEEN',
    toToken: targetToken,
    path: tokens,
    symbols,
    via: symbols.slice(1, -1),
    poolVersion: poolVersions,
    versionLen,
    fees,
    expectedOut: apiRoute?.amountOut ?? null,
    expectedOutRaw: apiRoute?.amountOutRaw ?? null,
    minReceived: null,
    outputDecimals,
    impactLabel:
      apiRoute?.impact != null && apiRoute?.impact !== ''
        ? `${String(apiRoute.impact)}%`
        : '—',
    routeLabel:
      symbols.length > 2
        ? `Optimized · ${Math.max(0, symbols.length - 2)} hop${
            symbols.length - 2 > 1 ? 's' : ''
          }`
        : 'Direct · best route',
    executionLabel:
      apiRoute?.fee != null && apiRoute?.fee !== ''
        ? `${String(apiRoute.fee)}`
        : '—',
    apiFee: apiRoute?.fee ?? null,
    apiImpact: apiRoute?.impact ?? null,
    amountIn: apiRoute?.amountIn ?? null,
    amountInRaw: apiRoute?.amountInRaw ?? null,
    amountOut: apiRoute?.amountOut ?? null,
    amountOutRaw: apiRoute?.amountOutRaw ?? null,
    inUsd: apiRoute?.inUsd ?? null,
    outUsd: apiRoute?.outUsd ?? null,
    containsUnverifiedHook: Boolean(apiRoute?.containsUnverifiedHook),
    poolKeys: Array.isArray(apiRoute?.poolKeys) ? apiRoute.poolKeys : [],
    stepAmountsOut: Array.isArray(apiRoute?.stepAmountsOut)
      ? apiRoute.stepAmountsOut
      : [],
    isExecutable
  };
}

export function makeSunioRoute({
  id,
  fromToken,
  toToken,
  path,
  poolVersion,
  versionLen,
  fees,
  routeLabel = 'Direct',
  executionLabel = 'Best direct',
  expectedOut = null,
  expectedOutRaw = null,
  minReceived = null,
  outputDecimals = 6,
  impactLabel = '—',
  isExecutable = true
}) {
  return {
    id: id || `sunio-${Date.now()}`,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    providerLogo: sunioLogo,
    providerMeta: getSunioProviderMeta(),
    fromToken,
    toToken,
    path,
    poolVersion,
    versionLen,
    fees,
    routeLabel,
    executionLabel,
    expectedOut,
    expectedOutRaw,
    minReceived,
    outputDecimals,
    impactLabel,
    isExecutable
  };
}

export async function getSunioQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3,
  typeList = SUNIO_MAINNET_DEFAULTS.typeList,
  calculationServiceUrl = SUNIO_MAINNET_DEFAULTS.calculationServiceUrl
} = {}) {
  const safeAmountIn = toSafeNumber(amountIn, 0);

  if (!safeAmountIn || safeAmountIn <= 0) {
    return [];
  }

  if (!isUsableAddress(fromTokenAddress)) {
    throw new Error('SUN.io quotes: fromTokenAddress is invalid');
  }

  const toTokenParam = getTargetTokenParam(targetToken, tokenAddresses);

  if (!isUsableAddress(toTokenParam)) {
    throw new Error(`SUN.io quotes: target token address for ${targetToken} is invalid`);
  }

  const amountInRaw = decimalToRaw(amountIn, inputDecimals).toString();
  const resolvedOutputDecimals = getOutputDecimalsByTarget(targetToken, outputDecimals);

  const url = new URL(calculationServiceUrl);
  url.searchParams.set('fromToken', fromTokenAddress);
  url.searchParams.set('toToken', toTokenParam);
  url.searchParams.set('amountIn', amountInRaw);
  url.searchParams.set('typeList', typeof typeList === 'string' ? typeList : '');
  url.searchParams.set('includeUnverifiedV4Hook', 'true');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*'
    }
  });

  if (!response.ok) {
    throw new Error(`SUN.io quotes failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (!payload || Number(payload.code) !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload?.message || 'SUN.io quotes returned invalid payload');
  }

  return payload.data
    .slice(0, Math.max(1, Number(routeCount || 3)))
    .map((item) => mapApiRouteToSunioRoute(item, targetToken, resolvedOutputDecimals))
    .sort((a, b) => Number(b.expectedOut || 0) - Number(a.expectedOut || 0));
}

export async function waitForSunioTransactionConfirmation({
  wallet,
  txid,
  timeoutMs = 120000,
  pollIntervalMs = 1500
} = {}) {
  const tronWeb = getTronWebSafe(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io confirmation: tronWeb is not available');
  }

  if (!txid || typeof txid !== 'string') {
    throw new Error('SUN.io confirmation: txid is required');
  }

  const startedAt = Date.now();
  let lastKnownError = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const [info, tx] = await Promise.allSettled([
        tronWeb.trx.getTransactionInfo(txid),
        tronWeb.trx.getTransaction(txid)
      ]);

      const txInfo = info.status === 'fulfilled' ? info.value : null;
      const txData = tx.status === 'fulfilled' ? tx.value : null;

      if (txInfo && Object.keys(txInfo).length > 0) {
        const receiptResult = txInfo?.receipt?.result;

        if (receiptResult === 'SUCCESS') {
          return {
            ok: true,
            txid,
            info: txInfo,
            transaction: txData || null
          };
        }

        if (receiptResult && receiptResult !== 'SUCCESS') {
          throw new Error(`Transaction failed: ${receiptResult}`);
        }
      }

      const txResult =
        txData?.ret?.[0]?.contractRet ||
        txData?.ret?.[0]?.contract_ret ||
        txData?.result ||
        '';

      if (String(txResult).toUpperCase() === 'SUCCESS') {
        return {
          ok: true,
          txid,
          info: txInfo || null,
          transaction: txData
        };
      }
    } catch (error) {
      const message = String(error?.message || '');

      if (
        message.includes('Transaction not found') ||
        message.includes('does not exist') ||
        isTransientNetworkError(error)
      ) {
        lastKnownError = error;
        await wait(pollIntervalMs);
        continue;
      }

      throw error;
    }

    await wait(pollIntervalMs);
  }

  if (lastKnownError && isTransientNetworkError(lastKnownError)) {
    throw new Error('Network error while waiting for transaction confirmation');
  }

  throw new Error('Transaction confirmation timeout');
}

export async function checkSunioAllowance({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io allowance: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io allowance: wallet address is not available');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('SUN.io allowance: tokenAddress is invalid');
  }

  if (!isUsableAddress(spenderAddress)) {
    throw new Error('SUN.io allowance: spenderAddress is invalid');
  }

  prepareTronWebForSigning(tronWeb, owner);

  const resolvedDecimals = Number.isFinite(Number(tokenDecimals))
    ? Number(tokenDecimals)
    : await getTokenDecimals(tronWeb, tokenAddress, 6);

  const requiredAmountRaw = decimalToRaw(amountIn, resolvedDecimals);
  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const allowanceRaw = normalizeBigintLike(
    await token.allowance(owner, spenderAddress).call()
  );

  return {
    ok: true,
    owner,
    spenderAddress,
    tokenAddress,
    allowanceRaw: allowanceRaw.toString(),
    requiredAmountRaw: requiredAmountRaw.toString(),
    hasEnoughAllowance: allowanceRaw >= requiredAmountRaw
  };
}

export async function ensureSunioApproval({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = null,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io approval: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io approval: wallet address is not available');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('SUN.io approval: tokenAddress is invalid');
  }

  if (!isUsableAddress(spenderAddress)) {
    throw new Error('SUN.io approval: spenderAddress is invalid');
  }

  prepareTronWebForSigning(tronWeb, owner);

  const resolvedDecimals = Number.isFinite(Number(tokenDecimals))
    ? Number(tokenDecimals)
    : await getTokenDecimals(tronWeb, tokenAddress, 6);

  const amountInRaw = decimalToRaw(amountIn, resolvedDecimals);
  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const allowanceRaw = normalizeBigintLike(
    await token.allowance(owner, spenderAddress).call()
  );

  if (allowanceRaw >= amountInRaw) {
    return {
      ok: true,
      required: false,
      approved: true,
      approvalType: 'already-approved',
      allowanceRaw: allowanceRaw.toString(),
      amountInRaw: amountInRaw.toString(),
      approvalAmountRaw: MAX_UINT256,
      spenderAddress
    };
  }

  try {
    const txid = await token
      .approve(spenderAddress, MAX_UINT256)
      .send({
        feeLimit,
        callValue: 0,
        shouldPollResponse: false
      });

    return {
      ok: true,
      required: true,
      approved: false,
      approvalType: 'unlimited',
      txid,
      spenderAddress,
      allowanceRaw: allowanceRaw.toString(),
      amountInRaw: amountInRaw.toString(),
      approvalAmountRaw: MAX_UINT256
    };
  } catch (error) {
    throw new Error(extractContractError(error));
  }
}

export async function executeSunioSwap({
  wallet,
  route,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = null,
  smartRouterAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit,
  deadlineSeconds = null,
  recipient = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);
  const to = recipient || owner;

  if (!tronWeb) {
    throw new Error('SUN.io execution: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io execution: owner address is invalid');
  }

  if (!isUsableAddress(to)) {
    throw new Error('SUN.io execution: recipient address is invalid');
  }

  if (!isUsableAddress(smartRouterAddress)) {
    throw new Error('SUN.io execution: smartRouterAddress is invalid');
  }

  if (!isUsableAddress(inputTokenAddress)) {
    throw new Error('SUN.io execution: inputTokenAddress is invalid');
  }

  assertExecutableRoute(route);
  prepareTronWebForSigning(tronWeb, owner);

  const amountInRaw = decimalToRaw(amountIn, inputTokenDecimals);
  const slippageBps = parseSlippageBps(slippage);
  const resolvedOutputDecimals = getOutputDecimalsByTarget(
    route?.toToken,
    outputTokenDecimals ?? route?.outputDecimals
  );

  let amountOutMinRaw = 0n;

  if (route.amountOutRaw != null) {
    amountOutMinRaw = calcMinOutRawFromExpected(route.amountOutRaw, slippageBps);
  } else if (route.minReceived != null) {
    amountOutMinRaw = humanOutputToRaw(route.minReceived, resolvedOutputDecimals);
  } else if (route.expectedOut != null) {
    const expectedOutRaw = humanOutputToRaw(route.expectedOut, resolvedOutputDecimals);
    amountOutMinRaw = calcMinOutRawFromExpected(expectedOutRaw, slippageBps);
  } else {
    throw new Error('SUN.io execution: route.minReceived or route.expectedOut is required');
  }

  const deadline =
    Number.isFinite(Number(deadlineSeconds)) && Number(deadlineSeconds) > 0
      ? Number(deadlineSeconds)
      : Math.floor(Date.now() / 1000) + SUNIO_MAINNET_DEFAULTS.deadlineSeconds;

  const swapData = [
    amountInRaw.toString(),
    amountOutMinRaw.toString(),
    to,
    String(deadline)
  ];

  console.log('[SUN SWAP ROUTE RAW JSON]', JSON.stringify(route, null, 2));
  console.log(
    '[SUN SWAP PAYLOAD JSON]',
    JSON.stringify(
      {
        owner,
        to,
        path: route.path,
        poolVersion: route.poolVersion,
        versionLen: route.versionLen,
        fees: route.fees,
        swapData,
        smartRouterAddress,
        inputTokenAddress,
        amountIn,
        amountInRaw: amountInRaw.toString(),
        amountOutMinRaw: amountOutMinRaw.toString(),
        slippage,
        outputTokenDecimals,
        resolvedOutputDecimals,
        deadline,
        feeLimit,
        tronDefaultAddress: tronWeb?.defaultAddress || null,
        poolKeys: route.poolKeys || null,
        stepAmountsOut: route.stepAmountsOut || null
      },
      null,
      2
    )
  );

  try {
    prepareTronWebForSigning(tronWeb, owner);

    const router = await tronWeb.contract(SMART_ROUTER_ABI, smartRouterAddress);

    const txid = await router
      .swapExactInput(
        route.path,
        route.poolVersion,
        route.versionLen.map((v) => String(v)),
        route.fees.map((v) => Number(v)),
        swapData
      )
      .send({
        feeLimit,
        callValue: 0,
        shouldPollResponse: false
      });

    console.log('[SUN SWAP TXID]', txid);

    const confirmation = await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    return {
      ok: true,
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      txid,
      unwrapTxid: null,
      unwrappedAmountRaw: '0',
      to,
      smartRouterAddress,
      amountInRaw: amountInRaw.toString(),
      amountOutMinRaw: amountOutMinRaw.toString(),
      deadline,
      route,
      confirmation
    };
  } catch (error) {
    console.error('[SUN SWAP CONTRACT SEND ERROR FULL]', error);
    console.error('[SUN SWAP CONTRACT SEND ERROR MESSAGE]', error?.message);
    console.error(
      '[SUN SWAP CONTRACT SEND ERROR JSON]',
      JSON.stringify(
        {
          message: error?.message || null,
          error: error?.error || null,
          data: error?.data || null,
          response: error?.response || null,
          stack: error?.stack || null,
          defaultAddress: tronWeb?.defaultAddress || null,
          owner,
          to,
          route
        },
        null,
        2
      )
    );
    throw new Error(extractContractError(error));
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/services/quotes.js

```js
import { getSunioQuotes } from '../providers/sunio.js';

function toFiniteNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function sortRoutesBestFirst(routes = []) {
  return [...routes].sort((a, b) => {
    const aExecutable = a?.isExecutable !== false;
    const bExecutable = b?.isExecutable !== false;

    if (aExecutable !== bExecutable) {
      return aExecutable ? -1 : 1;
    }

    const aOutRaw = BigInt(String(a?.amountOutRaw ?? a?.expectedOutRaw ?? '0'));
    const bOutRaw = BigInt(String(b?.amountOutRaw ?? b?.expectedOutRaw ?? '0'));

    if (aOutRaw > bOutRaw) return -1;
    if (aOutRaw < bOutRaw) return 1;

    const aOut = toFiniteNumber(a?.expectedOut, 0);
    const bOut = toFiniteNumber(b?.expectedOut, 0);

    return bOut - aOut;
  });
}

export async function getSwapQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3
} = {}) {
  const safeAmount = toFiniteNumber(amountIn, 0);

  if (!safeAmount || safeAmount <= 0) {
    return [];
  }

  const routes = await getSunioQuotes({
    amountIn: safeAmount,
    targetToken,
    fromTokenAddress,
    tokenAddresses,
    inputDecimals,
    outputDecimals,
    routeCount
  });

  const sorted = sortRoutesBestFirst(routes);

  const executable = sorted.filter((item) => item?.isExecutable !== false);

  return executable.length ? executable : sorted;
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/services/swapExecution.js

```js
import {
  checkSunioAllowance,
  ensureSunioApproval,
  executeSunioSwap,
  waitForSunioTransactionConfirmation,
  getSunioSpenderAddressForRoute
} from '../providers/sunio.js';

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (_) {
    return '';
  }
}

function toErrorMessage(error) {
  if (!error) return 'Unknown error';

  if (typeof error === 'string') {
    return error.trim() || 'Unknown error';
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error?.error === 'string' && error.error.trim()) {
    return error.error.trim();
  }

  if (typeof error?.data === 'string' && error.data.trim()) {
    return error.data.trim();
  }

  if (typeof error?.data?.message === 'string' && error.data.message.trim()) {
    return error.data.message.trim();
  }

  if (typeof error?.response?.data?.message === 'string' && error.response.data.message.trim()) {
    return error.response.data.message.trim();
  }

  const json = safeJsonStringify(error);
  if (json && json !== '{}' && json !== '[]') {
    return json;
  }

  return 'Unknown error';
}

function normalizeMessage(message) {
  return String(message || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeCleanUserMessage(message, fallback) {
  const normalized = normalizeMessage(message);

  if (!normalized || normalized === '[object Object]') {
    return fallback;
  }

  return normalized;
}

function mapSwapErrorToUserMessage(error) {
  const raw = normalizeMessage(toErrorMessage(error));
  const lower = raw.toLowerCase();

  if (!raw || raw === '[object Object]') {
    return 'Swap failed for an unknown reason. Please try again.';
  }

  if (
    lower.includes('user denied') ||
    lower.includes('user rejected') ||
    lower.includes('rejected by user') ||
    lower.includes('cancelled') ||
    lower.includes('canceled') ||
    lower.includes('declined') ||
    lower.includes('transaction was cancelled in the wallet')
  ) {
    return 'Transaction was cancelled in the wallet.';
  }

  if (
    lower.includes('wallet is not connected') ||
    lower.includes('tronweb is not available') ||
    lower.includes('wallet address is not available') ||
    lower.includes('owner address is invalid') ||
    lower.includes('recipient address is invalid') ||
    lower.includes('wallet connection is not ready') ||
    lower.includes('owner_address is not set') ||
    lower.includes('owner_address isn\'t set')
  ) {
    return 'Wallet connection is not ready. Please reconnect the wallet and try again.';
  }

  if (
    lower.includes('network error') ||
    lower.includes('failed to fetch') ||
    lower.includes('fetch failed') ||
    lower.includes('request failed') ||
    lower.includes('timeout') ||
    lower.includes('connection') ||
    lower.includes('disconnected')
  ) {
    return 'Network issue while talking to the blockchain. Please try again.';
  }

  if (
    lower.includes('transaction confirmation timeout') ||
    lower.includes('transaction not found')
  ) {
    return 'The transaction was sent, but confirmation took too long. Please check the wallet or explorer.';
  }

  if (
    lower.includes('insufficient output amount') ||
    lower.includes('amountoutmin') ||
    lower.includes('slippage') ||
    lower.includes('price changed before confirmation')
  ) {
    return 'Price changed before confirmation. Try again or increase slippage slightly.';
  }

  if (
    lower.includes('deadline') ||
    lower.includes('expired') ||
    lower.includes('transaction expired')
  ) {
    return 'Swap request expired before confirmation. Please try again.';
  }

  if (
    lower.includes('balance is not sufficient') ||
    lower.includes('insufficient balance') ||
    lower.includes('no enough balance') ||
    lower.includes('account balance is insufficient')
  ) {
    return 'Insufficient balance to complete this swap.';
  }

  if (
    lower.includes('out of energy') ||
    lower.includes('bandwidth') ||
    lower.includes('fee limit') ||
    lower.includes('not enough energy') ||
    lower.includes('network fee estimation unsuccessful')
  ) {
    return 'Not enough network resources for the transaction. Add more TRX for fees or energy and try again.';
  }

  if (
    lower.includes('allowance') ||
    lower.includes('approve') ||
    lower.includes('approval failed')
  ) {
    return 'Token approval failed. Please confirm approval in the wallet and try again.';
  }

  if (
    lower.includes('selected route is not supported') ||
    lower.includes('route is not supported') ||
    lower.includes('route.path is required') ||
    lower.includes('route.poolversion is required')
  ) {
    return 'This route is not supported by the current widget version yet. Please try another quote.';
  }

  if (
    lower.includes('third-party contract execution error') ||
    lower.includes('the swap transaction was rejected by the target contract')
  ) {
    return 'The swap route could not be executed. Please try another route or try again later.';
  }

  if (isPlainObject(error)) {
    return 'Swap failed. Please try again.';
  }

  return makeCleanUserMessage(raw, 'Swap failed. Please try again.');
}

function makeStepReporter(reportProgress) {
  return function step(step, payload = {}) {
    if (typeof reportProgress === 'function') {
      reportProgress({
        step,
        ...payload
      });
    }
  };
}

async function confirmIfNeeded({
  wallet,
  txid,
  reportStep,
  label = 'confirming'
}) {
  if (!txid) return null;

  reportStep(label, { txid });

  try {
    const confirmation = await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    return confirmation;
  } catch (error) {
    throw new Error(mapSwapErrorToUserMessage(error));
  }
}

export async function executeSwapFlow({
  wallet,
  selectedRoute,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = null,
  reportProgress
} = {}) {
  const step = makeStepReporter(reportProgress);

  try {
    if (!wallet) {
      throw new Error('Wallet is not connected');
    }

    if (!selectedRoute) {
      throw new Error('No route selected');
    }

    if (!amountIn || Number(amountIn) <= 0) {
      throw new Error('Enter a valid amount');
    }

    if (!inputTokenAddress) {
      throw new Error('Input token address is missing');
    }

    const spenderAddress = getSunioSpenderAddressForRoute(selectedRoute);

    step('validating', {
      message: 'Preparing swap...'
    });

    step('checking-allowance', {
      message: 'Checking token approval...'
    });

    const allowance = await checkSunioAllowance({
      wallet,
      tokenAddress: inputTokenAddress,
      spenderAddress,
      amountIn,
      tokenDecimals: inputTokenDecimals
    });

    let approval = null;
    let approvalConfirmation = null;

    if (!allowance?.hasEnoughAllowance) {
      step('approval-required', {
        message: 'Approval is required before swap.'
      });

      approval = await ensureSunioApproval({
        wallet,
        tokenAddress: inputTokenAddress,
        spenderAddress,
        amountIn,
        tokenDecimals: inputTokenDecimals
      });

      if (approval?.txid) {
        step('approval-submitted', {
          message: 'Approval transaction sent.',
          txid: approval.txid
        });

        approvalConfirmation = await confirmIfNeeded({
          wallet,
          txid: approval.txid,
          reportStep: step,
          label: 'approval-confirming'
        });

        step('approval-confirmed', {
          message: 'Approval confirmed.',
          txid: approval.txid,
          confirmation: approvalConfirmation
        });
      }
    } else {
      step('approval-ready', {
        message: 'Existing approval is sufficient.'
      });
    }

    step('swap-submitting', {
      message: 'Sending swap transaction...'
    });

    const swapResult = await executeSunioSwap({
      wallet,
      route: selectedRoute,
      amountIn,
      slippage,
      inputTokenAddress,
      inputTokenDecimals,
      outputTokenDecimals
    });

    if (!swapResult?.txid) {
      throw new Error('Swap transaction was not created');
    }

    step('swap-submitted', {
      message: 'Swap transaction sent.',
      txid: swapResult.txid
    });

    const confirmation =
      swapResult?.confirmation ||
      (await confirmIfNeeded({
        wallet,
        txid: swapResult.txid,
        reportStep: step,
        label: 'swap-confirming'
      }));

    step('swap-confirmed', {
      message: 'Swap confirmed on-chain.',
      txid: swapResult.txid,
      confirmation
    });

    const receiveSymbol = selectedRoute?.toToken || 'tokens';
    const receiveAmount = selectedRoute?.expectedOut || null;
    const successMessage = receiveAmount
      ? `Swap completed successfully. Estimated received: ${receiveAmount} ${receiveSymbol}.`
      : `Swap completed successfully. ${receiveSymbol} received.`;

    step('success', {
      message: successMessage,
      txid: swapResult.txid,
      approvalTxid: approval?.txid || null,
      confirmation
    });

    return {
      ok: true,
      status: 'success',
      provider: swapResult?.provider || selectedRoute?.provider || 'sunio',
      txid: swapResult.txid,
      approvalTxid: approval?.txid || null,
      approval,
      approvalConfirmation,
      confirmation,
      route: selectedRoute,
      result: swapResult,
      successMessage,
      shouldResetForm: true
    };
  } catch (error) {
    const userMessage = mapSwapErrorToUserMessage(error);
    const rawMessage = makeCleanUserMessage(toErrorMessage(error), userMessage);

    step('error', {
      message: userMessage,
      rawMessage
    });

    return {
      ok: false,
      status: 'error',
      message: userMessage,
      rawMessage,
      route: selectedRoute || null
    };
  }
}

export { mapSwapErrorToUserMessage };
export const executeSwapRoute = executeSwapFlow;
```

---

## FILE: 4teen-wallet-kit :: src/widgets/swap/swap.css

```css
:root {
  --fourteen-swap-bg: rgba(17, 17, 17, 0.92);
  --fourteen-swap-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-swap-border: rgba(255, 255, 255, 0.08);
  --fourteen-swap-text: rgba(255, 255, 255, 0.94);
  --fourteen-swap-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-swap-text-faint: rgba(255, 255, 255, 0.48);
  --fourteen-swap-accent: rgb(255, 105, 0);
  --fourteen-swap-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-swap-green: rgb(26, 224, 58);
  --fourteen-swap-red: rgb(255, 48, 73);
  --fourteen-swap-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-swap-radius: 16px;
  --fourteen-swap-radius-sm: 12px;
}

.fourteen-swap-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HERO / HEADER
------------------------------------------------------- */

.fourteen-swap-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-swap-hero__bg {
  position: absolute;
  left: -14px;
  top: -18px;
  width: 60px;
  height: 60px;
  background-image: url('../../assets/text_bg.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.fourteen-swap-hero__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-swap-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-swap-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-swap-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.fourteen-swap-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

.fourteen-swap-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-swap-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.fourteen-swap-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
}

.fourteen-swap-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-swap-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.fourteen-swap-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-swap-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-swap-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-swap-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-popover__text {
  font-size: 12px;
  line-height: 1.55;
  color: var(--fourteen-swap-text-soft);
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-swap-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-swap-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-connect-slot {
  margin-bottom: 16px;
}

.fourteen-swap-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-swap-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-swap-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-swap-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-swap-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-swap-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   FORM
------------------------------------------------------- */

.fourteen-swap-form {
  margin-bottom: 16px;
}

.fourteen-swap-form__meta-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.fourteen-swap-form__meta-row--estimate {
  margin-top: 12px;
}

.fourteen-swap-form__meta-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-form__slippage-wrap {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.fourteen-swap-slippage {
  min-width: 110px;
  height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--fourteen-swap-border);
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  color: var(--fourteen-swap-text);
  font-size: 13px;
  font-weight: 700;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.6) 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.6) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 16px,
    calc(100% - 12px) 16px;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fourteen-swap-slippage:focus {
  border-color: rgba(255, 105, 0, 0.58);
  box-shadow: 0 0 0 4px rgba(255, 105, 0, 0.08);
}

.fourteen-swap-input-wrap,
.fourteen-swap-estimate-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.fourteen-swap-input,
.fourteen-swap-estimate {
  width: 100%;
  min-height: 62px;
  padding: 0 132px 0 16px;
  border-radius: 16px;
  border: 1px solid var(--fourteen-swap-border);
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  color: var(--fourteen-swap-text);
  font-size: 28px;
  font-weight: 800;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fourteen-swap-input::placeholder {
  color: var(--fourteen-swap-text-faint);
}

.fourteen-swap-input:focus {
  border-color: rgba(255, 105, 0, 0.58);
  box-shadow: 0 0 0 4px rgba(255, 105, 0, 0.08);
}

.fourteen-swap-input__suffix,
.fourteen-swap-estimate__suffix {
  position: absolute;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 800;
  color: var(--fourteen-swap-text);
  pointer-events: none;
}

.fourteen-swap-input__token-logo,
.fourteen-swap-estimate__token-logo,
.fourteen-swap-target-switch__logo,
.fourteen-swap-route-card__token-logo,
.fourteen-swap-route-card__provider-logo {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

.fourteen-swap-estimate {
  display: flex;
  align-items: center;
  pointer-events: none;
}

.fourteen-swap-estimate__value {
  font-size: 28px;
  font-weight: 800;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-target-switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.fourteen-swap-target-switch__button {
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: 1px solid var(--fourteen-swap-border);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.fourteen-swap-target-switch__button:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 105, 0, 0.34);
}

.fourteen-swap-target-switch__button.is-active {
  border-color: rgba(255, 105, 0, 0.34);
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
}

/* -------------------------------------------------------
   ROUTES
------------------------------------------------------- */

.fourteen-swap-routes-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.fourteen-swap-routes-head__title {
  font-size: 14px;
  font-weight: 800;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-routes-head__subtitle {
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-swap-text-soft);
  text-align: right;
}

.fourteen-swap-routes {
  display: grid;
  gap: 14px;
}

.fourteen-swap-routes-empty {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-swap-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-swap-text-soft);
  font-size: 13px;
  line-height: 1.5;
}

.fourteen-swap-route-card {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 1px minmax(300px, 1fr);
  gap: 18px;
  align-items: stretch;
  padding: 18px;
  border: 1px solid var(--fourteen-swap-border);
  border-radius: 18px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
  box-shadow: var(--fourteen-swap-shadow);
}

.fourteen-swap-route-card__left,
.fourteen-swap-route-card__right {
  min-height: 220px;
}

.fourteen-swap-route-card__left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
}

.fourteen-swap-route-card__divider {
  width: 1px;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
}

.fourteen-swap-route-card__eyebrow,
.fourteen-swap-route-card__label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fourteen-swap-text-faint);
}

.fourteen-swap-route-card__receive {
  margin-top: 8px;
  font-size: 34px;
  font-weight: 900;
  line-height: 1.05;
  color: var(--fourteen-swap-text);
  word-break: break-word;
}

.fourteen-swap-route-card__min {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-route-card__action {
  width: 100%;
  min-height: 52px;
  margin-top: 18px;
  padding: 0 18px;
  border: 1px solid rgba(255, 105, 0, 0.34);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
}

.fourteen-swap-route-card__action:hover:not(:disabled):not([aria-disabled='true']) {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(255, 105, 0, 0.28);
}

.fourteen-swap-route-card__action:active {
  transform: translateY(0);
}

.fourteen-swap-route-card__action:disabled,
.fourteen-swap-route-card__action[aria-disabled='true'] {
  opacity: 0.52;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  filter: grayscale(0.12);
}

.fourteen-swap-route-card__right {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  padding: 4px 0;
}

.fourteen-swap-route-card__provider {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 52px;
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.fourteen-swap-route-card__provider-logo {
  width: 34px;
  height: 34px;
}

.fourteen-swap-route-card__detail--path {
  padding-right: 54px;
}

.fourteen-swap-route-card__value {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-route-card__path-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.fourteen-swap-route-card__path-token {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
}

.fourteen-swap-route-card__token-symbol {
  font-weight: 800;
}

.fourteen-swap-route-card__path-via {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--fourteen-swap-text-soft);
  font-size: 12px;
  font-weight: 700;
}

/* -------------------------------------------------------
   STATUS
------------------------------------------------------- */

.fourteen-swap-status {
  margin-top: 12px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  line-height: 1.45;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-status[data-state='error'] {
  color: #ffd4db;
}

.fourteen-swap-status[data-state='success'] {
  color: rgba(170, 255, 189, 0.95);
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 1024px) {
  .fourteen-swap-route-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .fourteen-swap-route-card__left,
  .fourteen-swap-route-card__right {
    min-height: auto;
  }

  .fourteen-swap-route-card__divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(255, 255, 255, 0.12) 50%,
      rgba(255, 255, 255, 0.02) 100%
    );
  }
}

@media (max-width: 860px) {
  .fourteen-swap-hero__title {
    font-size: 36px;
  }

  .fourteen-swap-form__meta-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-swap-form__slippage-wrap {
    width: 100%;
    justify-content: space-between;
  }

  .fourteen-swap-slippage {
    min-width: 120px;
  }

  .fourteen-swap-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 640px) {
  .fourteen-swap-connect-slot__desktop {
    display: none;
  }

  .fourteen-swap-connect-slot__mobile {
    display: block;
  }

  .fourteen-swap-routes-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-swap-routes-head__subtitle {
    text-align: left;
  }

  .fourteen-swap-input,
  .fourteen-swap-estimate {
    min-height: 56px;
    padding-right: 108px;
    font-size: 24px;
  }

  .fourteen-swap-estimate__value {
    font-size: 24px;
  }

  .fourteen-swap-input__suffix,
  .fourteen-swap-estimate__suffix {
    font-size: 16px;
  }

  .fourteen-swap-target-switch__button {
    width: 48px;
    height: 48px;
  }

  .fourteen-swap-route-card__right {
    padding-top: 6px;
  }

  .fourteen-swap-route-card__provider {
    top: 0;
    right: 0;
  }

  .fourteen-swap-route-card__detail--path {
    padding-right: 50px;
  }
}

@media (max-width: 560px) {
  .fourteen-swap-hero {
    align-items: flex-start;
  }

  .fourteen-swap-hero__title {
    font-size: 32px;
  }

  .fourteen-swap-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-swap-hero__actions {
    gap: 8px;
  }

  .fourteen-swap-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-swap-popover {
    width: min(320px, 94vw);
  }

  .fourteen-swap-connect-slot {
    margin-bottom: 14px;
  }

  .fourteen-swap-connect-slot__mobile {
    padding: 11px 12px;
    font-size: 11px;
  }

  .fourteen-swap-input,
  .fourteen-swap-estimate {
    min-height: 52px;
    padding-right: 92px;
    font-size: 22px;
  }

  .fourteen-swap-estimate__value {
    font-size: 22px;
  }

  .fourteen-swap-input__suffix,
  .fourteen-swap-estimate__suffix {
    right: 12px;
    gap: 6px;
    font-size: 14px;
  }

  .fourteen-swap-input__token-logo,
  .fourteen-swap-estimate__token-logo,
  .fourteen-swap-target-switch__logo,
  .fourteen-swap-route-card__token-logo {
    width: 18px;
    height: 18px;
  }

  .fourteen-swap-route-card {
    padding: 14px;
  }

  .fourteen-swap-route-card__receive {
    font-size: 28px;
  }

  .fourteen-swap-route-card__action {
    min-height: 48px;
    font-size: 12px;
  }

  .fourteen-swap-route-card__provider-logo {
    width: 30px;
    height: 30px;
  }

  .fourteen-swap-route-card__value {
    font-size: 14px;
  }

  .fourteen-swap-route-card__path-line {
    gap: 6px;
  }

  .fourteen-swap-route-card__detail--path {
    padding-right: 42px;
  }
}
```
