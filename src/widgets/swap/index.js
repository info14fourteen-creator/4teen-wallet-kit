import './swap.css';
import { mountWalletButton } from '../../ui/walletButton.js';

import sunioLogo from '../../assets/sunio_swap.svg';
import justmoneyLogo from '../../assets/justmoney_swap.svg';
import trxLogo from '../../assets/trx_swap.svg';
import fourteenLogo from '../../assets/4teen_swap.svg';
import usdtLogo from '../../assets/usdt_swap.svg';
import swapArrowsLogo from '../../assets/swap_arrows.svg';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONFIG = {
  title: 'Swap 4TEEN to TRX/USDT',
  subtitle: 'Compare routes and swap 4TEEN efficiently',
  infoTitle: 'How route comparison works',
  infoText:
    'This widget compares available swap routes and ranks them from the highest possible output to the lowest. The estimate updates automatically as you type and changes depending on the token you select.\n\nEach route card shows the expected output, minimum received after slippage, route path, fee label, and provider source. As new routing providers are added, they will automatically be included, ranked, and displayed here.\n\nFor now, the module is prepared for a live routing backend and already uses the final visual structure that future on-chain integrations will plug into.',
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
    'TRX': 'TRX',
    'USDT': 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf'
  },
  mockBaseRates: {
    TRX: 1.0,
    USDT: 0.122
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

function createRoutePathHtml(route) {
  const fromMeta = TOKEN_META[route.fromToken] || TOKEN_META['4TEEN'];
  const toMeta = TOKEN_META[route.toToken] || TOKEN_META['TRX'];

  const viaParts = Array.isArray(route.via) ? route.via : [];
  const viaHtml = viaParts.length
    ? `<span class="fourteen-swap-route-card__path-via">${escapeHtml(viaParts.join(' / '))}</span>`
    : '';

  return `
    <div class="fourteen-swap-route-card__path-line">
      <img class="fourteen-swap-route-card__token-logo" src="${fromMeta.logo}" alt="${escapeHtml(fromMeta.symbol)}" />
      <span class="fourteen-swap-route-card__token-symbol">${escapeHtml(fromMeta.symbol)}</span>

      <span class="fourteen-swap-route-card__path-arrow">→</span>

      ${viaHtml ? `<span class="fourteen-swap-route-card__via-wrap">${viaHtml}<span class="fourteen-swap-route-card__path-arrow">→</span></span>` : ''}

      <img class="fourteen-swap-route-card__token-logo" src="${toMeta.logo}" alt="${escapeHtml(toMeta.symbol)}" />
      <span class="fourteen-swap-route-card__token-symbol">${escapeHtml(toMeta.symbol)}</span>
    </div>
  `;
}

function buildMockRoutes(amountIn, targetToken, baseRates, slippageValue, routeCount) {
  if (!amountIn || amountIn <= 0) {
    return [];
  }

  const baseRate = Number(baseRates?.[targetToken] || 0);

  if (!Number.isFinite(baseRate) || baseRate <= 0) {
    return [];
  }

  const safeSlippage = Number.parseFloat(slippageValue || '3') || 3;

  const templates = [
    {
      id: 'sun-direct',
      provider: 'sunio',
      providerName: 'SUN.io',
      routeLabel: 'Direct · needs live quote',
      feeLabel: 'Best direct',
      pathHint: [],
      qualityFactor: 1.0
    },
    {
      id: 'sun-optimized',
      provider: 'sunio',
      providerName: 'SUN.io',
      routeLabel: 'Optimized · best price',
      feeLabel: 'Optimized route',
      pathHint: ['WTRX'],
      qualityFactor: 0.992
    },
    {
      id: 'sun-stable',
      provider: 'sunio',
      providerName: 'SUN.io',
      routeLabel: 'Stable · protected route',
      feeLabel: 'Protected path',
      pathHint: targetToken === 'USDT' ? ['TRX'] : ['USDT'],
      qualityFactor: 0.983
    }
  ].slice(0, Math.max(1, routeCount || 3));

  return templates
    .map((template) => {
      const receive = amountIn * baseRate * template.qualityFactor;
      const minReceived = receive * (1 - safeSlippage / 100);

      return {
        ...template,
        fromToken: '4TEEN',
        toToken: targetToken,
        receive,
        minReceived,
        impactLabel: '—',
        providerLogo: PROVIDER_META[template.provider]?.logo || sunioLogo
      };
    })
    .sort((a, b) => b.receive - a.receive);
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
    tokenAddresses,
    mockBaseRates
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
              Swap <span>4TEEN</span> to TRX/USDT
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

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function setStatus(message = '', isError = false) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.state = isError ? 'error' : 'default';
  }

  function closePopover() {
    if (popoverEl) {
      popoverEl.hidden = true;
    }
  }

  function togglePopover(event) {
    event?.stopPropagation?.();

    if (!popoverEl) return;
    popoverEl.hidden = !popoverEl.hidden;
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

    if (mobile) {
      unmountEmbeddedWalletButton();
      if (mobileConnectHintEl) {
        mobileConnectHintEl.hidden = connected;
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
        }
      },
      onRefresh: async () => {
        await refreshBalancesSafe();
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
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

  function buildRoutes() {
    const amount = parsePositiveNumber(amountInputEl?.value);
    const slippage = slippageSelectEl?.value || defaultSlippage;

    currentRoutes = buildMockRoutes(
      amount,
      selectedTarget,
      mockBaseRates,
      slippage,
      routeCount
    );
  }

  function renderEstimate() {
    const bestRoute = currentRoutes[0] || null;
    const toMeta = TOKEN_META[selectedTarget] || TOKEN_META['TRX'];

    estimateLogoEl.src = toMeta.logo;
    estimateLogoEl.alt = toMeta.symbol;
    estimateSymbolEl.textContent = toMeta.symbol;
    estimateValueEl.textContent = bestRoute
      ? formatNumber(bestRoute.receive, estimateDecimals)
      : formatNumber(0, estimateDecimals);
  }

  function renderRoutes() {
    const count = currentRoutes.length;
    routesSummaryEl.textContent = `${count} ${count === 1 ? 'route' : 'routes'} found via ${sourceLabel}`;

    if (!count) {
      routesListEl.innerHTML = `
        <div class="fourteen-swap-routes-empty">
          Enter an amount to preview available routes.
        </div>
      `;
      return;
    }

    routesListEl.innerHTML = currentRoutes
      .map((route, index) => {
        return `
          <div class="fourteen-swap-route-card">
            <div class="fourteen-swap-route-card__left">
              <div class="fourteen-swap-route-card__eyebrow">You receive</div>
              <div class="fourteen-swap-route-card__receive">
                ${escapeHtml(formatNumber(route.receive, estimateDecimals))} ${escapeHtml(route.toToken)}
              </div>

              <div class="fourteen-swap-route-card__min">
                Min received ${escapeHtml(formatNumber(route.minReceived, estimateDecimals))} ${escapeHtml(route.toToken)}
              </div>

              <button
                type="button"
                class="fourteen-swap-route-card__action"
                data-role="swap-route-button"
                data-route-id="${escapeHtml(route.id)}"
                ${isConnectedSafe(wallet) ? '' : 'disabled'}
              >
                Swap
              </button>
            </div>

            <div class="fourteen-swap-route-card__middle">
              <img class="fourteen-swap-route-card__middle-icon" src="${swapArrowsLogo}" alt="Swap arrows" />
            </div>

            <div class="fourteen-swap-route-card__right">
              <div class="fourteen-swap-route-card__provider">
                <img class="fourteen-swap-route-card__provider-logo" src="${route.providerLogo}" alt="${escapeHtml(route.providerName)}" />
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Path</div>
                <div class="fourteen-swap-route-card__value">
                  ${createRoutePathHtml(route)}
                </div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Route</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.routeLabel)}</div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Fee</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.feeLabel)}</div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Impact</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.impactLabel)}</div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
      button.addEventListener('click', handleRouteSwapClick);
    });

    const best = currentRoutes[0];
    if (best) {
      setStatus(`Best route: ${best.providerName} · ${formatNumber(best.receive, estimateDecimals)} ${best.toToken}`);
    } else {
      setStatus('');
    }
  }

  function syncQuotes() {
    buildRoutes();
    renderEstimate();
    renderRoutes();
  }

  function handleAmountInput() {
    syncQuotes();
  }

  function handleSlippageChange() {
    syncQuotes();
  }

  function handleTargetClick(event) {
    const button = event.currentTarget;
    const token = button.getAttribute('data-token');

    if (!token || token === selectedTarget) {
      return;
    }

    selectedTarget = token;
    updateTargetButtons();
    syncQuotes();
  }

  async function handleRouteSwapClick(event) {
    const routeId = event.currentTarget?.getAttribute('data-route-id');
    const route = currentRoutes.find((item) => item.id === routeId);

    if (!route) {
      setStatus('Route not found.', true);
      return;
    }

    if (!isConnectedSafe(wallet)) {
      setStatus('Connect wallet first.', true);
      return;
    }

    setStatus(`Swap execution for ${route.providerName} will be connected next.`);
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncEmbeddedWalletUi();
    updateWalletLabel();

    Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
      button.disabled = !isConnectedSafe(wallet);
    });
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
  syncQuotes();

  return instance;
}
