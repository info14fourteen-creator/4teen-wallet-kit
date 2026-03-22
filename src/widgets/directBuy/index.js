import './directBuy.css';
import { mountWalletButton } from '../../ui/walletButton.js';
import {
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
} from '../../ui/noticeCenter.js';

const ACTIVE_INSTANCES = new WeakMap();
const SUN = 1_000_000;
const DEFAULT_CONTRACT_ADDRESS = 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A';
const DEFAULT_TOKEN_PRICE_SUN = 1_147_500;

const DEFAULT_CONFIG = {
  contractAddress: DEFAULT_CONTRACT_ADDRESS,
  inputLabel: 'Enter TRX amount',
  buttonBuyText: 'Buy',
  title: 'Direct Buy',
  subtitle: 'Mint-on-Purchase Issuance',
  connectText: 'Connect Wallet',
  mobileConnectHint: 'Tap connect below to continue.'
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatNumber(value) {
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

function formatTrx(value, digits = 6) {
  const num = Number(value || 0);

  if (!Number.isFinite(num)) {
    return '0.000000';
  }

  return num.toFixed(digits);
}

function fromSun(value) {
  const num = Number(value || 0);

  if (!Number.isFinite(num)) {
    return 0;
  }

  return num / SUN;
}

function toSun(value) {
  const num = Number(value || 0);

  if (!Number.isFinite(num) || num <= 0) {
    return 0;
  }

  return Math.floor(num * SUN);
}

function parsePositiveNumber(value) {
  const num = Number.parseFloat(String(value || '').replace(',', '.'));

  if (!Number.isFinite(num) || num <= 0) {
    return 0;
  }

  return num;
}

function extractTxid(result) {
  if (!result) return '';
  if (typeof result === 'string') return result;
  if (typeof result?.txid === 'string') return result.txid;
  if (typeof result?.txID === 'string') return result.txID;
  if (typeof result?.transaction === 'string') return result.transaction;
  if (typeof result?.transaction?.txID === 'string') return result.transaction.txID;
  if (typeof result?.receipt?.txID === 'string') return result.receipt.txID;
  if (typeof result?.id === 'string') return result.id;
  return '';
}

function normalizeError(error) {
  const raw =
    error?.message ||
    error?.error ||
    error?.data?.message ||
    error?.response?.data?.message ||
    'Unknown error';

  const text = String(raw);

  if (
    text.includes('User rejected') ||
    text.includes('rejected') ||
    text.includes('denied') ||
    text.includes('Confirmation declined')
  ) {
    return 'Transaction was rejected in wallet.';
  }

  if (text.includes('Balance below') || text.includes('balance')) {
    return 'Insufficient balance for this transaction.';
  }

  if (text.includes('contract validate error')) {
    return text;
  }

  return text;
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

function isConnectedSafe(wallet) {
  const state = getWalletStateSafe(wallet);
  return !!state?.connected;
}

function getWalletAddressSafe(wallet) {
  const state = getWalletStateSafe(wallet);

  return (
    state?.address ||
    wallet?.getAddress?.() ||
    wallet?.getTronWeb?.()?.defaultAddress?.base58 ||
    null
  );
}

function getActiveTronWeb(wallet) {
  return wallet?.getTronWeb?.() || wallet?.getState?.()?.tronWeb || null;
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

function buildContractAbi() {
  return [
    {
      constant: false,
      inputs: [],
      name: 'buyTokens',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'tokenPrice',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ];
}

async function readTokenPrice(tronWeb, contractAddress) {
  if (!tronWeb || !contractAddress) {
    return DEFAULT_TOKEN_PRICE_SUN;
  }

  try {
    const contract = await tronWeb.contract(buildContractAbi(), contractAddress);
    const raw = await contract.tokenPrice().call();

    const resolved =
      raw?.toString?.() ||
      raw?._hex ||
      raw?.[0] ||
      raw;

    const priceSun = Number(resolved);

    if (Number.isFinite(priceSun) && priceSun > 0) {
      return priceSun;
    }
  } catch (_) {}

  return DEFAULT_TOKEN_PRICE_SUN;
}

function computeEstimatedTokens(trxAmount, tokenPriceSun) {
  const trx = Number(trxAmount || 0);
  const priceSun = Number(tokenPriceSun || 0);

  if (!Number.isFinite(trx) || trx <= 0) {
    return 0;
  }

  if (!Number.isFinite(priceSun) || priceSun <= 0) {
    return 0;
  }

  return (trx * SUN) / priceSun;
}

function buildPriceText(tokenPriceSun) {
  const trxPerToken = fromSun(tokenPriceSun);
  return `Current price: 1 4TEEN = ${formatTrx(trxPerToken, 6)} TRX`;
}

export function mountDirectBuy(target, config = {}) {
  const {
    contractAddress,
    inputLabel,
    buttonBuyText,
    title,
    subtitle,
    connectText,
    mobileConnectHint
  } = { ...DEFAULT_CONFIG, ...config };

  if (!target) {
    throw new Error('mountDirectBuy: target is required');
  }

  const wallet = getWalletSafe();

  if (!wallet) {
    throw new Error('Fourteen wallet instance is not loaded');
  }

  if (ACTIVE_INSTANCES.has(target)) {
    try {
      ACTIVE_INSTANCES.get(target).destroy();
    } catch (error) {
      console.error('Failed to destroy previous direct buy instance:', error);
    }
  }

  target.innerHTML = `
    <div class="fourteen-buy-widget">
      <div class="fourteen-buy-shell">
        <div class="fourteen-buy-heading">
          <div class="fourteen-buy-heading__text">
            <div class="fourteen-buy-hero">
              <div class="fourteen-buy-hero__bg"></div>

              <h2 class="fourteen-buy-hero__title">
                Buy <span>4teen</span> Directly
              </h2>

              <div class="fourteen-buy-hero__subtitle">
                ${escapeHtml(subtitle)}
              </div>
            </div>
          </div>

          <div class="fourteen-buy-info-toggle-wrap">
            <button
              type="button"
              class="fourteen-buy-info-toggle"
              aria-label="Show buy info"
              aria-expanded="false"
            >
              i
            </button>

            <div class="fourteen-buy-popover" hidden>
              <div class="fourteen-buy-popover__title">Buy Info</div>

              <div class="fourteen-buy-popover__item">
                <span class="fourteen-buy-popover__label">Price</span>
                <span class="fourteen-buy-popover__value" data-buy-info="price">Loading current price...</span>
              </div>

              <div class="fourteen-buy-popover__item">
                <span class="fourteen-buy-popover__label">Lock Period</span>
                <span class="fourteen-buy-popover__value">Tokens bought directly are locked for 14 days and cannot be sold or transferred during this period.</span>
              </div>

              <div class="fourteen-buy-popover__item">
                <span class="fourteen-buy-popover__label">Liquidity</span>
                <span class="fourteen-buy-popover__value">90% of incoming TRX is routed into liquidity pools on Sun.io and JustMoney.</span>
              </div>

              <div class="fourteen-buy-popover__item">
                <span class="fourteen-buy-popover__label">Resources & Fees</span>
                <span class="fourteen-buy-popover__value">Around 9 TRX may be needed only if the wallet has no energy and bandwidth.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-buy-topbar">
          <div class="fourteen-buy-wallet-label" data-role="wallet-label">Wallet not connected</div>
        </div>

        <div class="fourteen-buy-connect-slot">
          <div class="fourteen-buy-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-buy-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(mobileConnectHint)}
          </div>
        </div>

        <div class="fourteen-buy-form">
          <label class="fourteen-buy-input-label">${escapeHtml(inputLabel)}</label>

          <div class="fourteen-buy-form-row">
            <div class="fourteen-buy-input-wrap">
              <input
                class="fourteen-buy-input"
                type="number"
                placeholder="0.00"
                step="0.000001"
                min="0"
                inputmode="decimal"
                aria-label="TRX amount to spend"
              />
              <span class="fourteen-buy-input-suffix">TRX</span>
            </div>

            <button class="fourteen-buy-button" type="button">
              ${escapeHtml(buttonBuyText)}
            </button>
          </div>

          <div class="fourteen-buy-estimate">
            <span class="fourteen-buy-estimate__label">You receive ~</span>
            <span class="fourteen-buy-estimate__value">0.00</span>
            <span class="fourteen-buy-estimate__token">4TEEN</span>
          </div>

          <div class="fourteen-buy-status" role="status" aria-live="polite"></div>
        </div>
      </div>
    </div>
  `;

  const widgetEl = target.querySelector('.fourteen-buy-widget');
  const inputEl = target.querySelector('.fourteen-buy-input');
  const buttonEl = target.querySelector('.fourteen-buy-button');
  const statusEl = target.querySelector('.fourteen-buy-status');
  const estimateValueEl = target.querySelector('.fourteen-buy-estimate__value');
  const priceInfoEl = target.querySelector('[data-buy-info="price"]');
  const infoToggleEl = target.querySelector('.fourteen-buy-info-toggle');
  const popoverEl = target.querySelector('.fourteen-buy-popover');
  const walletLabelEl = target.querySelector('[data-role="wallet-label"]');
  const embeddedWalletButtonEl = target.querySelector('[data-role="embedded-wallet-button"]');
  const mobileConnectHintEl = target.querySelector('[data-role="mobile-connect-hint"]');

  let isDestroyed = false;
  let isSubmitting = false;
  let tokenPriceSun = DEFAULT_TOKEN_PRICE_SUN;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
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

  function setStatus(message = '', isError = false, txid = '') {
    if (!statusEl) return;

    const safeMessage = escapeHtml(message || '');

    if (!message) {
      statusEl.innerHTML = '';
      statusEl.dataset.state = 'default';
      return;
    }

    statusEl.dataset.state = isError ? 'error' : 'default';

    if (txid) {
      statusEl.innerHTML = `
        <span>${safeMessage}</span>
        <a
          class="fourteen-buy-status__link"
          href="https://tronscan.org/#/transaction/${txid}"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Tronscan
        </a>
      `;
      return;
    }

    statusEl.innerHTML = `<span>${safeMessage}</span>`;
  }

  function syncEstimate() {
    const trxAmount = parsePositiveNumber(inputEl.value);
    const estimatedTokens = computeEstimatedTokens(trxAmount, tokenPriceSun);
    estimateValueEl.textContent = formatNumber(estimatedTokens);
  }

  function updateWalletLabel() {
    const address = getWalletAddressSafe(wallet);

    if (!isConnectedSafe(wallet) || !address) {
      walletLabelEl.textContent = 'Wallet not connected';
      return;
    }

    walletLabelEl.textContent = `Wallet ${shortenAddress(address)}`;
  }

  function setButtonState() {
    const connected = isConnectedSafe(wallet);
    const trxAmount = parsePositiveNumber(inputEl.value);
    const canBuy = connected && trxAmount > 0 && !isSubmitting;

    buttonEl.disabled = isSubmitting || !connected || trxAmount <= 0;
    buttonEl.textContent = isSubmitting ? 'Waiting...' : buttonBuyText;

    if (canBuy) {
      buttonEl.removeAttribute('aria-disabled');
    } else {
      buttonEl.setAttribute('aria-disabled', 'true');
    }
  }

  async function refreshPrice() {
    const tronWeb = getActiveTronWeb(wallet);

    tokenPriceSun = await readTokenPrice(tronWeb, contractAddress);

    if (priceInfoEl) {
      priceInfoEl.textContent = buildPriceText(tokenPriceSun);
    }

    syncEstimate();
  }

  async function refreshBalancesSafe() {
    if (!wallet || typeof wallet.refreshBalances !== 'function') {
      return;
    }

    try {
      await wallet.refreshBalances();
    } catch (_) {}
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
      connectText,
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await wait(450);
          await refreshBalancesSafe();
          await refreshUI();
        }
      },
      onRefresh: async () => {
        await refreshBalancesSafe();
        await refreshUI();
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }

        await refreshUI();
      }
    });
  }

  async function refreshPriceSafe() {
    try {
      await refreshPrice();
    } catch (error) {
      console.error('Direct buy price refresh failed:', error);

      if (priceInfoEl) {
        priceInfoEl.textContent = buildPriceText(DEFAULT_TOKEN_PRICE_SUN);
      }

      tokenPriceSun = DEFAULT_TOKEN_PRICE_SUN;
      syncEstimate();
    }
  }

  async function connectWallet() {
    if (typeof wallet.connect === 'function') {
      showNeutralNotice('Opening wallet...', 5000);
      await wallet.connect();
      return;
    }

    throw new Error('Wallet connect method is not available');
  }

  async function buy() {
    const tronWeb = getActiveTronWeb(wallet);
    const address = getWalletAddressSafe(wallet);

    if (!tronWeb || !address) {
      throw new Error('Wallet is not connected');
    }

    const trxAmount = parsePositiveNumber(inputEl.value);

    if (trxAmount <= 0) {
      throw new Error('Enter a valid TRX amount');
    }

    const valueInSun = toSun(trxAmount);

    if (valueInSun <= 0) {
      throw new Error('Enter a valid TRX amount');
    }

    const contract = await tronWeb.contract(buildContractAbi(), contractAddress);

    isSubmitting = true;
    setButtonState();
    setStatus('Waiting for wallet confirmation...');

    try {
      const result = await contract.buyTokens().send({
        callValue: valueInSun,
        shouldPollResponse: false
      });

      const txid = extractTxid(result);

      showSuccessNotice('Transaction sent successfully.', 10000);
      setStatus('Transaction sent successfully.', false, txid);

      inputEl.value = '';
      syncEstimate();

      await sleep(400);
    } catch (error) {
      const message = normalizeError(error);
      setStatus(message, true);
      showErrorNotice(message, 10000);
      throw error;
    } finally {
      isSubmitting = false;
      setButtonState();
    }
  }

  async function handleButtonClick() {
    try {
      if (!isConnectedSafe(wallet)) {
        await connectWallet();
        await refreshUI();
        setStatus('');
        return;
      }

      await buy();
      updateWalletLabel();
    } catch (error) {
      console.error('Direct buy flow failed:', error);
    }
  }

  function handleInput() {
    const value = parsePositiveNumber(inputEl.value);

    if (inputEl.value === '') {
      syncEstimate();
      setButtonState();
      return;
    }

    if (!Number.isFinite(value) || value < 0) {
      inputEl.value = '';
      syncEstimate();
      setButtonState();
      return;
    }

    inputEl.value = value ? String(value) : '';
    syncEstimate();
    setButtonState();
  }

  async function refreshUI() {
    if (!isAlive()) {
      return;
    }

    updateWalletLabel();
    syncEmbeddedWalletUi();
    await refreshPriceSafe();
    syncEstimate();
    setButtonState();
  }

  function handleOutsideClick(event) {
    if (!widgetEl?.contains(event.target)) {
      closePopover();
    }
  }

  function handleResize() {
    if (!isAlive()) return;
    syncEmbeddedWalletUi();
  }

  buttonEl.addEventListener('click', handleButtonClick);
  inputEl.addEventListener('input', handleInput);
  infoToggleEl?.addEventListener('click', togglePopover);
  document.addEventListener('click', handleOutsideClick);

  if (typeof window !== 'undefined' && !resizeListenerBound) {
    window.addEventListener('resize', handleResize);
    resizeListenerBound = true;
  }

  if (typeof wallet.subscribe === 'function') {
    walletUnsubscribe = wallet.subscribe(() => {
      refreshUI().catch((error) => {
        console.error('Direct buy wallet refresh failed:', error);
      });
    });
  }

  const instance = {
    destroy() {
      isDestroyed = true;
      buttonEl.removeEventListener('click', handleButtonClick);
      inputEl.removeEventListener('input', handleInput);
      infoToggleEl?.removeEventListener('click', togglePopover);
      document.removeEventListener('click', handleOutsideClick);
      unmountEmbeddedWalletButton();

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

  refreshUI().catch((error) => {
    console.error('Initial direct buy UI refresh failed:', error);
    setStatus('Failed to initialize direct buy widget.', true);
    showErrorNotice('Failed to initialize direct buy widget.', 10000);
  });

  return instance;
}
