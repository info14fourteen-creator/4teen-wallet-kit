import './unlockTimeline.css';
import { mountWalletButton } from '../../ui/walletButton.js';
import { createReadonlyTronWeb } from '../../adapters/shared/createReadonlyTronWeb.js';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONFIG = {
  contractAddress: 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A',
  apiKey: 'd4fcb4c1-89d8-4651-9e34-11dd7848789b',
  decimals: 6,
  unlockDays: 14,
  apiUrl: 'https://rot.endjgfsv.link/swap/router',
  toToken: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  typeList: 'SUNSWAP_V3',
  connectText: 'Connect Wallet',
  mobileConnectHint: 'Tap connect below to continue.',
  swapUrl: 'https://4teen.me/sw',
  title: 'Token Unlock Timeline',
  subtitle: 'Track your locked 4TEEN releases',
  infoTitle: 'What this timeline shows — and why it matters',
  infoText:
    'When you buy 4TEEN, your tokens are created and automatically locked for 14 days. This protects the market from instant sell-offs and gives early holders a fair, stable entry. The timeline on the right displays every one of your purchases, showing the exact unlock date in GMT, a live countdown, and your current Locked/Unlocked status.\n\nEach row includes a direct link to the on-chain transaction on Tronscan, so you can always verify the data yourself — block time, amount received, and event ID. As soon as the 14-day period ends, the status updates automatically and your tokens become freely tradable, with no action required from your side.\n\nThis gives you complete clarity: you always know when your tokens unlock, how close you are to the next release, and where to check everything on the blockchain.'
};

const BALANCE_REFRESH_INTERVAL_MS = 30_000;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function formatRemaining(ms) {
  if (ms <= 0) return '00:00:00';

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return (days > 0 ? `${days}d ` : '') + `${hh}:${mm}:${ss}`;
}

function formatUnlockDate(unlockMs) {
  return new Date(unlockMs).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  });
}

function shortenAddress(address) {
  if (!address || typeof address !== 'string') return '';
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
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

function getTronWebSafe(wallet) {
  if (!wallet) return null;

  if (typeof wallet.getTronWeb === 'function') {
    return wallet.getTronWeb();
  }

  const state = getWalletStateSafe(wallet);
  return state?.tronWeb || null;
}

function isConnectedSafe(wallet) {
  const state = getWalletStateSafe(wallet);
  return !!state?.connected && !!state?.address;
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false;

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(max-width: 640px)').matches;
  }

  return window.innerWidth <= 640;
}

function isUsableAddress(value) {
  return typeof value === 'string' && /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
}

function normalizeTokenUnits(value, decimals = 6) {
  const num = Number(value ?? 0);

  if (!Number.isFinite(num)) {
    return null;
  }

  return Number((num / Math.pow(10, decimals)).toFixed(6));
}

function decodeHexUint256(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') {
    return null;
  }

  try {
    return parseInt(hexValue, 16);
  } catch (_) {
    return null;
  }
}

async function readContractUint256(address, contractAddress, methodName, decimals = 6) {
  if (!isUsableAddress(address)) {
    throw new Error(`${methodName}: invalid wallet address`);
  }

  if (!isUsableAddress(contractAddress)) {
    throw new Error(`${methodName}: invalid contract address`);
  }

  const tronWeb = createReadonlyTronWeb({
    address
  });

  try {
    const contract = await tronWeb.contract().at(contractAddress);
    const raw = await contract[methodName](address).call();

    const value =
      typeof raw === 'object' && raw !== null && typeof raw.toString === 'function'
        ? raw.toString()
        : String(raw);

    const normalized = normalizeTokenUnits(value, decimals);

    if (normalized === null) {
      throw new Error(`${methodName}: invalid result`);
    }

    return normalized;
  } catch (contractError) {
    const ownerHex = tronWeb.address.toHex(address);
    const contractHex = tronWeb.address.toHex(contractAddress);

    const result = await tronWeb.transactionBuilder.triggerConstantContract(
      contractHex,
      `${methodName}(address)`,
      {},
      [{ type: 'address', value: address }],
      ownerHex
    );

    const hexValue = result?.constant_result?.[0] || null;
    const decoded = decodeHexUint256(hexValue);
    const normalized = normalizeTokenUnits(decoded, decimals);

    if (normalized === null) {
      throw contractError;
    }

    return normalized;
  }
}

export function mountUnlockTimeline(target, config = {}) {
  const {
    contractAddress,
    apiKey,
    decimals,
    unlockDays,
    apiUrl,
    toToken,
    typeList,
    connectText,
    mobileConnectHint,
    swapUrl,
    subtitle,
    infoTitle,
    infoText
  } = { ...DEFAULT_CONFIG, ...config };

  if (!target) {
    throw new Error('mountUnlockTimeline: target is required');
  }

  if (!contractAddress) {
    throw new Error('mountUnlockTimeline: contractAddress is required');
  }

  if (!apiKey) {
    throw new Error('mountUnlockTimeline: apiKey is required');
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
    <div class="fourteen-timeline-widget">
      <div class="fourteen-timeline-shell">
        <div class="fourteen-timeline-hero">
          <div class="fourteen-timeline-hero__bg"></div>

          <div class="fourteen-timeline-hero__text">
            <div class="fourteen-timeline-hero__title">
              Token <span>Unlock</span> Timeline
            </div>
            <div class="fourteen-timeline-hero__subtitle">${escapeHtml(subtitle)}</div>
          </div>

          <div class="fourteen-timeline-hero__actions">
            <div class="fourteen-timeline-badge">${escapeHtml(`${unlockDays} Day Lock`)}</div>

            <div class="fourteen-timeline-info-toggle-wrap">
              <button
                class="fourteen-timeline-info-toggle"
                type="button"
                aria-label="Timeline info"
                aria-expanded="false"
                data-role="timeline-info-toggle"
              >
                i
              </button>

              <div class="fourteen-timeline-popover" data-role="timeline-popover" hidden>
                <div class="fourteen-timeline-popover__title">${escapeHtml(infoTitle)}</div>
                <div class="fourteen-timeline-popover__text">${escapeHtml(infoText).replaceAll('\n', '<br><br>')}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-timeline-topbar">
          <div class="fourteen-timeline-wallet" data-role="wallet-label">Wallet not connected</div>

          <a
            class="fourteen-timeline-swap-link"
            data-role="swap-link"
            href="${escapeHtml(swapUrl)}"
            target="_self"
            rel="noopener noreferrer"
            hidden
          >
            Swap
          </a>
        </div>

        <div class="fourteen-timeline-connect-slot">
          <div class="fourteen-timeline-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-timeline-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(mobileConnectHint)}
          </div>
        </div>

        <div class="fourteen-timeline-summary">
          <div class="fourteen-timeline-summary-card">
            <div class="fourteen-timeline-summary-label">Available Now</div>
            <div class="fourteen-timeline-summary-value" data-role="available">— 4TEEN</div>
          </div>

          <div class="fourteen-timeline-summary-card">
            <div class="fourteen-timeline-summary-label">Current Rate</div>
            <div class="fourteen-timeline-summary-value" data-role="rate">— TRX</div>
          </div>
        </div>

        <div class="fourteen-timeline-details" data-role="details">
          <div class="fourteen-timeline-placeholder">
            Connect wallet to load balances, current rate, and your unlock timeline.
          </div>
        </div>

        <div class="fourteen-timeline-status" data-role="status" role="status" aria-live="polite"></div>

        <div class="fourteen-timeline-history">
          <div class="fourteen-timeline-history-head">
            <div class="fourteen-timeline-history-title">Unlock History</div>
            <div class="fourteen-timeline-history-subtitle">Each direct buy unlocks after ${escapeHtml(String(unlockDays))} days</div>
          </div>

          <div class="fourteen-timeline-desktop-table-wrap">
            <table class="fourteen-timeline-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Unlock (UTC)</th>
                  <th>Countdown</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody data-role="table-body"></tbody>
            </table>
          </div>

          <div class="fourteen-timeline-mobile-list" data-role="mobile-list"></div>
        </div>
      </div>
    </div>
  `;

  const walletInfoEl = target.querySelector('[data-role="wallet-label"]');
  const availableEl = target.querySelector('[data-role="available"]');
  const rateEl = target.querySelector('[data-role="rate"]');
  const swapLinkEl = target.querySelector('[data-role="swap-link"]');
  const detailsEl = target.querySelector('[data-role="details"]');
  const statusEl = target.querySelector('[data-role="status"]');
  const tableBodyEl = target.querySelector('[data-role="table-body"]');
  const mobileListEl = target.querySelector('[data-role="mobile-list"]');
  const infoToggleEl = target.querySelector('[data-role="timeline-info-toggle"]');
  const popoverEl = target.querySelector('[data-role="timeline-popover"]');
  const connectSlotEl = target.querySelector('.fourteen-timeline-connect-slot');
  const embeddedWalletButtonEl = target.querySelector('[data-role="embedded-wallet-button"]');
  const mobileConnectHintEl = target.querySelector('[data-role="mobile-connect-hint"]');

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let countdownInterval = null;
  let balanceRefreshInterval = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;

  let balances = {
    total: 0,
    locked: 0,
    available: 0
  };

  let rates = {
    qsiToTrx: '—',
    qsiToUsd: '—'
  };

  let timelineEvents = [];

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function stopCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  function stopBalanceRefresh() {
    if (balanceRefreshInterval) {
      clearInterval(balanceRefreshInterval);
      balanceRefreshInterval = null;
    }
  }

  function setStatus(message = '', isError = false) {
    if (!statusEl) return;
    statusEl.textContent = message;
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

  function updateSwapLink() {
    if (!swapLinkEl) return;
    swapLinkEl.hidden = !(Number(balances.available || 0) > 0);
  }

  function renderPlaceholder() {
    detailsEl.innerHTML = `
      <div class="fourteen-timeline-placeholder">
        Connect wallet to load balances, current rate, and your unlock timeline.
      </div>
    `;
  }

  function renderDetails() {
    detailsEl.innerHTML = `
      <div class="fourteen-timeline-details-grid">
        <div class="fourteen-timeline-info-card">
          <div class="fourteen-timeline-info-label">Total Balance</div>
          <div class="fourteen-timeline-info-value">${formatAmount(balances.total)} 4TEEN</div>
        </div>

        <div class="fourteen-timeline-info-card">
          <div class="fourteen-timeline-info-label">Locked Balance</div>
          <div class="fourteen-timeline-info-value fourteen-timeline-info-value--locked">${formatAmount(balances.locked)} 4TEEN</div>
        </div>

        <div class="fourteen-timeline-info-card">
          <div class="fourteen-timeline-info-label">Available Balance</div>
          <div class="fourteen-timeline-info-value fourteen-timeline-info-value--available">${formatAmount(balances.available)} 4TEEN</div>
        </div>

        <div class="fourteen-timeline-info-card">
          <div class="fourteen-timeline-info-label">Conversion</div>
          <div class="fourteen-timeline-info-value">1 4TEEN → ${escapeHtml(rates.qsiToTrx)} TRX</div>
          <div class="fourteen-timeline-info-subvalue">≈ ${escapeHtml(rates.qsiToUsd)} USD</div>
        </div>
      </div>
    `;

    availableEl.textContent = `${formatCompact(balances.available)} 4TEEN`;
    rateEl.textContent =
      rates.qsiToTrx && rates.qsiToTrx !== '—'
        ? `${rates.qsiToTrx} TRX`
        : '— TRX';

    updateSwapLink();
  }

  function renderEmptyHistory(message) {
    timelineEvents = [];

    tableBodyEl.innerHTML = `
      <tr>
        <td colspan="4" class="fourteen-timeline-muted">${escapeHtml(message)}</td>
      </tr>
    `;

    mobileListEl.innerHTML = `
      <div class="fourteen-timeline-empty">${escapeHtml(message)}</div>
    `;
  }

  function renderHistory(events) {
    timelineEvents = Array.isArray(events) ? events.slice() : [];

    const now = Date.now();

    tableBodyEl.innerHTML = events.map((event) => {
      const unlocked = event.unlockMs <= now;

      return `
        <tr data-unlock="${event.unlockMs}">
          <td>
            <a class="fourteen-timeline-link" href="${event.trxLink}" target="_blank" rel="noopener noreferrer">
              ${formatAmount(event.amount)} 4TEEN
            </a>
          </td>
          <td>${escapeHtml(event.formattedUnlockDate)}</td>
          <td class="fourteen-timeline-countdown">${unlocked ? '00:00:00' : formatRemaining(event.unlockMs - now)}</td>
          <td>
            <span class="fourteen-timeline-status-pill ${unlocked ? 'unlocked' : 'locked'}">
              ${unlocked ? 'Unlocked' : 'Locked'}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    mobileListEl.innerHTML = events.map((event) => {
      const unlocked = event.unlockMs <= now;

      return `
        <div class="fourteen-timeline-event-card" data-unlock="${event.unlockMs}">
          <div class="fourteen-timeline-event-top">
            <a class="fourteen-timeline-event-amount" href="${event.trxLink}" target="_blank" rel="noopener noreferrer">
              ${formatAmount(event.amount)} 4TEEN
            </a>

            <span class="fourteen-timeline-status-pill ${unlocked ? 'unlocked' : 'locked'}">
              ${unlocked ? 'Unlocked' : 'Locked'}
            </span>
          </div>

          <div class="fourteen-timeline-event-grid">
            <div class="fourteen-timeline-event-item">
              <div class="fourteen-timeline-event-label">Unlock</div>
              <div class="fourteen-timeline-event-value">${escapeHtml(event.formattedUnlockDate)}</div>
            </div>

            <div class="fourteen-timeline-event-item">
              <div class="fourteen-timeline-event-label">Countdown</div>
              <div class="fourteen-timeline-event-value fourteen-timeline-countdown">
                ${unlocked ? '00:00:00' : formatRemaining(event.unlockMs - now)}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function recomputeLockedFromTimeline() {
    const now = Date.now();
    const locked = timelineEvents.reduce((sum, event) => {
      if (Number(event.unlockMs) > now) {
        return sum + Number(event.amount || 0);
      }
      return sum;
    }, 0);

    balances.locked = Number(locked.toFixed(6));
    balances.available = Math.max(0, Number((balances.total - balances.locked).toFixed(6)));
  }

  function startCountdownUpdater() {
    stopCountdown();

    countdownInterval = setInterval(() => {
      const now = Date.now();
      const nodes = Array.from(target.querySelectorAll('[data-unlock]'));
      let changed = false;

      nodes.forEach((node) => {
        const unlockMs = Number(node.getAttribute('data-unlock') || 0);
        const countdownEl = node.querySelector('.fourteen-timeline-countdown');
        const statusElLocal = node.querySelector('.fourteen-timeline-status-pill');

        if (!countdownEl || !statusElLocal) return;

        const isUnlockedNow = unlockMs <= now;
        const wasUnlocked = statusElLocal.classList.contains('unlocked');

        if (isUnlockedNow) {
          countdownEl.textContent = '00:00:00';
          statusElLocal.textContent = 'Unlocked';
          statusElLocal.classList.add('unlocked');
          statusElLocal.classList.remove('locked');

          if (!wasUnlocked) {
            changed = true;
          }
        } else {
          countdownEl.textContent = formatRemaining(unlockMs - now);
          statusElLocal.textContent = 'Locked';
          statusElLocal.classList.add('locked');
          statusElLocal.classList.remove('unlocked');
        }
      });

      if (changed) {
        recomputeLockedFromTimeline();
        renderDetails();
      }
    }, 1000);
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
      text: connectText,
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

  async function getBalances() {
    const userAddress = getConnectedAddress(wallet);

    if (!isUsableAddress(userAddress)) {
      throw new Error('Wallet address not available');
    }

    const total = await readContractUint256(
      userAddress,
      contractAddress,
      'balanceOf',
      decimals
    );

    balances.total = total;
    recomputeLockedFromTimeline();
  }

  async function fetchSwapRate(amount = 1) {
    const amountIn = Math.round(amount * Math.pow(10, decimals));
    const url = `${apiUrl}?fromToken=${contractAddress}&toToken=${toToken}&amountIn=${amountIn}&typeList=${typeList}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Rate API failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data && data.code === 0 && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0];
    }

    return null;
  }

  async function getFilteredContractEvents() {
    const tronWeb = getTronWebSafe(wallet);

    if (!tronWeb?.defaultAddress?.base58) {
      throw new Error('Wallet address not available');
    }

    const userAddress = tronWeb.defaultAddress.base58;
    const response = await fetch(
      `https://api.trongrid.io/v1/contracts/${contractAddress}/events?event_name=BuyTokens&limit=200`,
      {
        headers: {
          'TRON-PRO-API-KEY': apiKey
        }
      }
    );

    if (response.status === 429) {
      throw new Error('429 rate limit');
    }

    if (!response.ok) {
      throw new Error(`Events API failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      renderEmptyHistory('No unlock events found.');
      recomputeLockedFromTimeline();
      return;
    }

    const filtered = data.data.filter((event) => {
      if (!event.result?.buyer) return false;

      try {
        const buyerBase58 = tronWeb.address.fromHex(event.result.buyer);
        return buyerBase58 === userAddress;
      } catch (_) {
        return false;
      }
    });

    if (!filtered.length) {
      renderEmptyHistory('No matching unlock events found.');
      recomputeLockedFromTimeline();
      return;
    }

    filtered.sort((a, b) => (Number(a.block_timestamp) || 0) - (Number(b.block_timestamp) || 0));

    const mapped = filtered.map((event) => {
      const timestamp = Number(event.block_timestamp) || 0;
      const amount = parseFloat(event.result.amountTokens || 0) / Math.pow(10, decimals);
      const unlockMs = timestamp + unlockDays * 24 * 60 * 60 * 1000;

      return {
        amount,
        unlockMs,
        formattedUnlockDate: formatUnlockDate(unlockMs),
        trxLink: event.transaction_id
          ? `https://tronscan.org/#/transaction/${event.transaction_id}`
          : '#'
      };
    });

    renderHistory(mapped);
    recomputeLockedFromTimeline();
    startCountdownUpdater();
  }

  async function refreshBalancesAndRenderSafe() {
    if (!isConnectedSafe(wallet) || !isAlive()) {
      return;
    }

    try {
      await getBalances();

      if (!isAlive()) return;

      renderDetails();
    } catch (error) {
      console.error('[4TEEN] unlockTimeline refreshBalancesAndRenderSafe failed', error);
    }
  }

  function startBalanceRefresh() {
    stopBalanceRefresh();

    balanceRefreshInterval = setInterval(() => {
      refreshBalancesAndRenderSafe().catch((error) => {
        console.error('[4TEEN] unlockTimeline periodic balance refresh failed', error);
      });
    }, BALANCE_REFRESH_INTERVAL_MS);
  }

  async function syncTimeline() {
    syncEmbeddedWalletUi();

    if (!isConnectedSafe(wallet)) {
      updateWalletLabel();
      balances = { total: 0, locked: 0, available: 0 };
      rates = { qsiToTrx: '—', qsiToUsd: '—' };
      timelineEvents = [];
      availableEl.textContent = '— 4TEEN';
      rateEl.textContent = '— TRX';
      renderPlaceholder();
      renderEmptyHistory('Connect wallet to view unlock events.');
      updateSwapLink();
      setStatus('');
      stopCountdown();
      stopBalanceRefresh();
      return;
    }

    updateWalletLabel();

    try {
      await getFilteredContractEvents();
      setStatus('');
    } catch (error) {
      console.error('[4TEEN] unlockTimeline events failed', error);

      if (String(error?.message || '').includes('429')) {
        setStatus('Unlock events are temporarily rate-limited. Please try again in a few moments.', true);
      } else {
        setStatus('Could not load unlock events right now.', true);
      }

      renderEmptyHistory('Unlock events are temporarily unavailable.');
      timelineEvents = [];
      balances.locked = 0;
    }

    try {
      await getBalances();
    } catch (error) {
      console.error('[4TEEN] unlockTimeline getBalances failed', error);
      balances = {
        total: 0,
        locked: Number(balances.locked || 0),
        available: 0
      };
      balances.available = Math.max(0, Number((balances.total - balances.locked).toFixed(6)));
    }

    try {
      const rate = await fetchSwapRate(1);

      if (rate) {
        rates.qsiToTrx = parseFloat(rate.amountOut).toFixed(6);
        rates.qsiToUsd =
          rate.outUsd !== undefined
            ? parseFloat(rate.outUsd).toFixed(6)
            : '—';
      } else {
        rates.qsiToTrx = '—';
        rates.qsiToUsd = '—';
      }
    } catch (error) {
      console.error('[4TEEN] unlockTimeline fetchSwapRate failed', error);
      rates.qsiToTrx = '—';
      rates.qsiToUsd = '—';
    }

    renderDetails();
    startBalanceRefresh();
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncTimeline().catch((error) => {
      console.error('Unlock timeline sync failed:', error);
      setStatus('Failed to refresh unlock timeline.', true);
    });
  }

  function handleResize() {
    if (!isAlive()) return;
    syncEmbeddedWalletUi();
  }

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
      stopCountdown();
      stopBalanceRefresh();
      unmountEmbeddedWalletButton();
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
