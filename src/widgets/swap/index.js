import './swap.css';
import { mountWalletButton } from '../../ui/walletButton.js';
import {
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
} from '../../ui/noticeCenter.js';
import {
  getSunSwapRoutes,
  executeSunSwapRoute
} from './providers/sunio.js';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONFIG = {
  inputToken: {
    key: '4TEEN',
    symbol: '4TEEN',
    address: 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A',
    decimals: 6
  },

  outputTokens: [
    {
      key: 'TRX',
      symbol: 'TRX',
      address: 'TRX',
      decimals: 6
    },
    {
      key: 'USDT',
      symbol: 'USDT',
      address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      decimals: 6
    }
  ],

  title: 'Token Swap Router',
  subtitle: 'Compare routes and swap 4TEEN efficiently',
  badgeText: 'SUN.IO',
  infoTitle: 'How swap routing works',
  infoText:
    'SUN Smart Router finds the best swap routes across the TRON network in real time — optimizing price, reducing slippage, and routing through the most efficient liquidity pools.
This module intentionally focuses on two outputs only: TRX and USDT.
Why? Simplicity and control.
If you want full flexibility — swap to TRX and bridge anywhere, or move into USDT and access the entire market from there.
Fast. Transparent. On-chain.',
  routeCount: 3,
  defaultOutputKey: 'TRX',
  defaultSlippageBps: 300,
  slippageOptionsBps: [100, 300, 500, 1000],
  amountPlaceholder: '0.00',
  emptyRoutesText: 'Enter a 4TEEN amount to load swap routes.'
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatAmount(value, digits = 6) {
  const num = Number(value || 0);

  if (!Number.isFinite(num)) {
    return '0.000000';
  }

  return num.toFixed(digits);
}

function formatCompact(value) {
  const num = Number(value || 0);

  if (!Number.isFinite(num)) {
    return '0.00';
  }

  const abs = Math.abs(num);

  if (abs >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}b`;
  }

  if (abs >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}m`;
  }

  if (abs >= 1_000) {
    return `${(num / 1_000).toFixed(2)}k`;
  }

  return num.toFixed(2);
}

function parsePositiveNumber(value) {
  const normalized = String(value ?? '').replace(',', '.').trim();
  const num = Number.parseFloat(normalized);

  if (!Number.isFinite(num) || num <= 0) {
    return 0;
  }

  return num;
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

function isConnectedSafe(wallet) {
  const state = getWalletStateSafe(wallet);
  return !!state?.connected && !!state?.address;
}

function getOutputToken(outputTokens, key) {
  return outputTokens.find((token) => token.key === key) || outputTokens[0] || null;
}

function formatSlippageLabel(bps) {
  return `${(Number(bps || 0) / 100).toFixed(2)}%`;
}

function normalizeRoute(route, index = 0) {
  return {
    id: route?.id || `route-${index + 1}`,
    provider: route?.provider || 'SUN.io',
    routeLabel: route?.routeLabel || '4TEEN → Route',
    amountOut: route?.amountOut ?? '0',
    minReceived: route?.minReceived ?? '0',
    priceImpact: route?.priceImpact ?? '—',
    feeText: route?.feeText ?? '—',
    pathText: route?.pathText || route?.routeLabel || '—',
    metaText: route?.metaText || 'Direct contract',
    executionData: route?.executionData || null
  };
}

export function mountSwap(target, config = {}) {
  const {
    inputToken,
    outputTokens,
    title,
    subtitle,
    badgeText,
    infoTitle,
    infoText,
    mobileConnectHint,
    routeCount,
    defaultOutputKey,
    defaultSlippageBps,
    slippageOptionsBps,
    amountPlaceholder,
    emptyRoutesText
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

  const initialOutputToken = getOutputToken(outputTokens, defaultOutputKey);

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
            <div class="fourteen-swap-badge">${escapeHtml(badgeText)}</div>

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
          <div class="fourteen-swap-form-grid">
            <div class="fourteen-swap-field">
              <div class="fourteen-swap-field__label">From</div>
              <div class="fourteen-swap-fixed-token">
                <span class="fourteen-swap-fixed-token__symbol">${escapeHtml(inputToken.symbol)}</span>
                <span class="fourteen-swap-fixed-token__address">${escapeHtml(shortenAddress(inputToken.address))}</span>
              </div>
            </div>

            <div class="fourteen-swap-field">
              <div class="fourteen-swap-field__label">Amount</div>
              <div class="fourteen-swap-amount-wrap">
                <input
                  class="fourteen-swap-amount-input"
                  data-role="amount-input"
                  type="number"
                  step="0.000001"
                  min="0"
                  inputmode="decimal"
                  placeholder="${escapeHtml(amountPlaceholder)}"
                />
                <span class="fourteen-swap-amount-suffix">${escapeHtml(inputToken.symbol)}</span>
              </div>
            </div>

            <div class="fourteen-swap-field">
              <div class="fourteen-swap-field__label">To</div>
              <div class="fourteen-swap-output-list" data-role="output-list">
                ${outputTokens.map((token) => `
                  <button
                    class="fourteen-swap-output-chip ${token.key === initialOutputToken?.key ? 'is-active' : ''}"
                    type="button"
                    data-output-key="${escapeHtml(token.key)}"
                  >
                    ${escapeHtml(token.symbol)}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="fourteen-swap-field">
              <div class="fourteen-swap-field__label">Slippage</div>
              <select class="fourteen-swap-select" data-role="slippage-select">
                ${slippageOptionsBps.map((bps) => `
                  <option value="${bps}" ${bps === defaultSlippageBps ? 'selected' : ''}>${escapeHtml(formatSlippageLabel(bps))}</option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="fourteen-swap-status" data-role="status" role="status" aria-live="polite"></div>

        <div class="fourteen-swap-routes-head">
          <div class="fourteen-swap-routes-title">Available Routes</div>
          <div class="fourteen-swap-routes-subtitle" data-role="routes-subtitle">${escapeHtml(emptyRoutesText)}</div>
        </div>

        <div class="fourteen-swap-routes" data-role="routes"></div>
      </div>
    </div>
  `;

  const walletInfoEl = target.querySelector('[data-role="wallet-label"]');
  const embeddedWalletButtonEl = target.querySelector('[data-role="embedded-wallet-button"]');
  const mobileConnectHintEl = target.querySelector('[data-role="mobile-connect-hint"]');
  const infoToggleEl = target.querySelector('[data-role="swap-info-toggle"]');
  const popoverEl = target.querySelector('[data-role="swap-popover"]');
  const amountInputEl = target.querySelector('[data-role="amount-input"]');
  const slippageSelectEl = target.querySelector('[data-role="slippage-select"]');
  const outputListEl = target.querySelector('[data-role="output-list"]');
  const statusEl = target.querySelector('[data-role="status"]');
  const routesEl = target.querySelector('[data-role="routes"]');
  const routesSubtitleEl = target.querySelector('[data-role="routes-subtitle"]');

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;
  let isQuoting = false;
  let isSwapping = false;

  let currentOutputKey = initialOutputToken?.key || 'TRX';
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
          await new Promise((resolve) => setTimeout(resolve, 450));
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

  function renderEmptyRoutes(message) {
    currentRoutes = [];
    routesEl.innerHTML = `
      <div class="fourteen-swap-empty">
        ${escapeHtml(message)}
      </div>
    `;
  }

  function buildRouteCard(route) {
    return `
      <div class="fourteen-swap-route-card" data-route-id="${escapeHtml(route.id)}">
        <div class="fourteen-swap-route-card__top">
          <div>
            <div class="fourteen-swap-route-card__provider">${escapeHtml(route.provider)}</div>
            <div class="fourteen-swap-route-card__label">${escapeHtml(route.routeLabel)}</div>
          </div>

          <div class="fourteen-swap-route-card__badge">${escapeHtml(route.metaText)}</div>
        </div>

        <div class="fourteen-swap-route-card__grid">
          <div class="fourteen-swap-route-card__item">
            <div class="fourteen-swap-route-card__item-label">You receive</div>
            <div class="fourteen-swap-route-card__item-value">
              ${escapeHtml(formatCompact(route.amountOut))} ${escapeHtml(getOutputToken(outputTokens, currentOutputKey)?.symbol || '')}
            </div>
          </div>

          <div class="fourteen-swap-route-card__item">
            <div class="fourteen-swap-route-card__item-label">Min received</div>
            <div class="fourteen-swap-route-card__item-value">
              ${escapeHtml(formatCompact(route.minReceived))} ${escapeHtml(getOutputToken(outputTokens, currentOutputKey)?.symbol || '')}
            </div>
          </div>

          <div class="fourteen-swap-route-card__item">
            <div class="fourteen-swap-route-card__item-label">Fee</div>
            <div class="fourteen-swap-route-card__item-value">${escapeHtml(route.feeText)}</div>
          </div>

          <div class="fourteen-swap-route-card__item">
            <div class="fourteen-swap-route-card__item-label">Impact</div>
            <div class="fourteen-swap-route-card__item-value">${escapeHtml(route.priceImpact)}</div>
          </div>
        </div>

        <div class="fourteen-swap-route-card__path">
          <span class="fourteen-swap-route-card__path-label">Path</span>
          <span class="fourteen-swap-route-card__path-value">${escapeHtml(route.pathText)}</span>
        </div>

        <button
          class="fourteen-swap-route-card__action"
          type="button"
          data-role="swap-route-button"
          data-route-id="${escapeHtml(route.id)}"
          ${isSwapping ? 'disabled' : ''}
        >
          Swap via ${escapeHtml(route.provider)}
        </button>
      </div>
    `;
  }

  function renderRoutes(routes) {
    currentRoutes = routes.map((route, index) => normalizeRoute(route, index));

    if (!currentRoutes.length) {
      renderEmptyRoutes('No routes found for the selected amount.');
      return;
    }

    routesEl.innerHTML = currentRoutes.map(buildRouteCard).join('');

    routesEl.querySelectorAll('[data-role="swap-route-button"]').forEach((button) => {
      button.addEventListener('click', async () => {
        const routeId = button.getAttribute('data-route-id');
        await handleSwap(routeId);
      });
    });
  }

  async function refreshQuotes() {
    if (isQuoting || isSwapping) {
      return;
    }

    const amount = parsePositiveNumber(amountInputEl.value);
    const outputToken = getOutputToken(outputTokens, currentOutputKey);
    const tronWeb = getTronWebSafe(wallet);

    if (!amount || !outputToken) {
      routesSubtitleEl.textContent = emptyRoutesText;
      renderEmptyRoutes(emptyRoutesText);
      setStatus('');
      return;
    }

    if (!tronWeb) {
      routesSubtitleEl.textContent = 'Connect wallet to load routes.';
      renderEmptyRoutes('Connect wallet to load routes.');
      return;
    }

    try {
      isQuoting = true;
      setStatus('Loading routes...');
      showNeutralNotice('Loading swap routes...', 3000);

      const routes = await getSunSwapRoutes({
        tronWeb,
        amountIn: amount,
        inputToken,
        outputToken,
        routeCount,
        slippageBps: Number(slippageSelectEl.value || defaultSlippageBps),
        config
      });

      routesSubtitleEl.textContent = `${routes.length} route${routes.length === 1 ? '' : 's'} found via SUN.io`;
      renderRoutes(routes);
      setStatus('');
    } catch (error) {
      console.error('[4TEEN] refreshQuotes failed', error);
      routesSubtitleEl.textContent = 'Failed to load routes.';
      renderEmptyRoutes('Could not load swap routes right now.');
      setStatus(error?.message || 'Failed to load swap routes.', true);
    } finally {
      isQuoting = false;
    }
  }

  async function handleSwap(routeId) {
    if (isSwapping) {
      return;
    }

    const route = currentRoutes.find((item) => item.id === routeId);
    const tronWeb = getTronWebSafe(wallet);
    const recipient = getConnectedAddress(wallet);
    const amount = parsePositiveNumber(amountInputEl.value);
    const outputToken = getOutputToken(outputTokens, currentOutputKey);
    const slippageBps = Number(slippageSelectEl.value || defaultSlippageBps);

    if (!route || !tronWeb || !recipient || !amount || !outputToken) {
      setStatus('Swap data is incomplete.', true);
      return;
    }

    if (!isConnectedSafe(wallet)) {
      setStatus('Connect wallet first.', true);
      return;
    }

    try {
      isSwapping = true;
      setStatus('Preparing swap...');
      showNeutralNotice('Preparing swap...', 4000);
      renderRoutes(currentRoutes);

      const result = await executeSunSwapRoute({
        tronWeb,
        route,
        amountIn: amount,
        inputToken,
        outputToken,
        recipient,
        slippageBps,
        config
      });

      setStatus('Swap submitted successfully.');
      showSuccessNotice('Swap submitted successfully.', 6000);

      await refreshBalancesSafe();
      await refreshQuotes();

      return result;
    } catch (error) {
      console.error('[4TEEN] handleSwap failed', error);
      const message = error?.message || 'Swap failed.';
      setStatus(message, true);
      showErrorNotice(message, 7000);
    } finally {
      isSwapping = false;
      renderRoutes(currentRoutes);
    }
  }

  async function syncWidgetState() {
    syncEmbeddedWalletUi();
    updateWalletLabel();

    if (!isConnectedSafe(wallet)) {
      routesSubtitleEl.textContent = 'Connect wallet to load routes.';
      renderEmptyRoutes('Connect wallet to load routes.');
      setStatus('');
      return;
    }

    await refreshQuotes();
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncWidgetState().catch((error) => {
      console.error('[4TEEN] swap sync failed', error);
      setStatus('Failed to refresh swap widget.', true);
    });
  }

  function handleResize() {
    if (!isAlive()) return;
    syncEmbeddedWalletUi();
  }

  function handleAmountInput() {
    refreshQuotes().catch((error) => {
      console.error('[4TEEN] amount input refresh failed', error);
    });
  }

  function handleSlippageChange() {
    refreshQuotes().catch((error) => {
      console.error('[4TEEN] slippage refresh failed', error);
    });
  }

  function handleOutputClick(event) {
    const button = event.target.closest('[data-output-key]');
    if (!button) return;

    const nextKey = button.getAttribute('data-output-key');
    if (!nextKey || nextKey === currentOutputKey) return;

    currentOutputKey = nextKey;

    outputListEl.querySelectorAll('[data-output-key]').forEach((item) => {
      item.classList.toggle('is-active', item.getAttribute('data-output-key') === currentOutputKey);
    });

    refreshQuotes().catch((error) => {
      console.error('[4TEEN] output switch refresh failed', error);
    });
  }

  amountInputEl.addEventListener('input', handleAmountInput);
  slippageSelectEl.addEventListener('change', handleSlippageChange);
  outputListEl.addEventListener('click', handleOutputClick);
  infoToggleEl?.addEventListener('click', togglePopover);
  document.addEventListener('click', handleOutsideClick);

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

      amountInputEl.removeEventListener('input', handleAmountInput);
      slippageSelectEl.removeEventListener('change', handleSlippageChange);
      outputListEl.removeEventListener('click', handleOutputClick);
      infoToggleEl?.removeEventListener('click', togglePopover);
      document.removeEventListener('click', handleOutsideClick);

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

  handleWalletUpdate();

  return instance;
}
