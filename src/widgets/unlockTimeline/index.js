import './unlockTimeline.css';

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
  swapUrl: 'https://4teen.me/sw',
  title: 'Token Unlock Timeline',
  subtitle: 'Track your locked 4TEEN releases',
  infoTitle: 'What this timeline shows — and why it matters',
  infoText:
    'When you buy 4TEEN, your tokens are created and automatically locked for 14 days. This protects the market from instant sell-offs and gives early holders a fair, stable entry. The timeline on the right displays every one of your purchases, showing the exact unlock date in GMT, a live countdown, and your current Locked/Unlocked status.\n\nEach row includes a direct link to the on-chain transaction on Tronscan, so you can always verify the data yourself — block time, amount received, and event ID. As soon as the 14-day period ends, the status updates automatically and your tokens become freely tradable, with no action required from your side.\n\nThis gives you complete clarity: you always know when your tokens unlock, how close you are to the next release, and where to check everything on the blockchain.'
};

const TIMELINE_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'lockedBalanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

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
    swapUrl,
    title,
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
              <span>Unlock</span> Timeline
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

        <button class="fourteen-timeline-button" type="button">${escapeHtml(connectText)}</button>

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
  const buttonEl = target.querySelector('.fourteen-timeline-button');
  const statusEl = target.querySelector('[data-role="status"]');
  const tableBodyEl = target.querySelector('[data-role="table-body"]');
  const mobileListEl = target.querySelector('[data-role="mobile-list"]');
  const infoToggleEl = target.querySelector('[data-role="timeline-info-toggle"]');
  const popoverEl = target.querySelector('[data-role="timeline-popover"]');

  let isDestroyed = false;
  let isConnecting = false;
  let walletUnsubscribe = null;
  let countdownInterval = null;

  let balances = {
    total: 0,
    locked: 0,
    available: 0
  };

  let rates = {
    qsiToTrx: '—',
    qsiToUsd: '—'
  };

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function stopCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
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

  function startCountdownUpdater() {
    stopCountdown();

    countdownInterval = setInterval(() => {
      const now = Date.now();
      const nodes = Array.from(target.querySelectorAll('[data-unlock]'));

      nodes.forEach((node) => {
        const unlockMs = Number(node.getAttribute('data-unlock') || 0);
        const countdownEl = node.querySelector('.fourteen-timeline-countdown');
        const statusElLocal = node.querySelector('.fourteen-timeline-status-pill');

        if (!countdownEl || !statusElLocal) return;

        if (unlockMs <= now) {
          countdownEl.textContent = '00:00:00';
          statusElLocal.textContent = 'Unlocked';
          statusElLocal.classList.add('unlocked');
          statusElLocal.classList.remove('locked');
        } else {
          countdownEl.textContent = formatRemaining(unlockMs - now);
          statusElLocal.textContent = 'Locked';
          statusElLocal.classList.add('locked');
          statusElLocal.classList.remove('unlocked');
        }
      });
    }, 1000);
  }

  async function getBalances() {
    const tronWeb = getTronWebSafe(wallet);

    if (!tronWeb?.defaultAddress?.base58) {
      throw new Error('Wallet address not available');
    }

    const userAddress = tronWeb.defaultAddress.base58;
    const contract = await tronWeb.contract(TIMELINE_CONTRACT_ABI, contractAddress);

    const totalRaw = await contract.balanceOf(userAddress).call();
    const lockedRaw = await contract.lockedBalanceOf(userAddress).call();

    const total = parseFloat(totalRaw?.toString?.() || '0') / Math.pow(10, decimals);
    const locked = parseFloat(lockedRaw?.toString?.() || '0') / Math.pow(10, decimals);
    const available = Math.max(0, total - locked);

    balances = {
      total,
      locked,
      available
    };
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
    startCountdownUpdater();
  }

  async function syncTimeline() {
    if (!isConnectedSafe(wallet)) {
      updateWalletLabel();
      balances = { total: 0, locked: 0, available: 0 };
      rates = { qsiToTrx: '—', qsiToUsd: '—' };
      availableEl.textContent = '— 4TEEN';
      rateEl.textContent = '— TRX';
      renderPlaceholder();
      renderEmptyHistory('Connect wallet to view unlock events.');
      updateSwapLink();
      buttonEl.disabled = false;
      buttonEl.classList.remove('connected');
      buttonEl.textContent = connectText;
      setStatus('');
      stopCountdown();
      return;
    }

    updateWalletLabel();
    buttonEl.disabled = true;
    buttonEl.classList.add('connected');
    buttonEl.textContent = 'Connected';

    try {
      await getBalances();
    } catch (error) {
      console.error('[4TEEN] unlockTimeline getBalances failed', error);
      balances = { total: 0, locked: 0, available: 0 };
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
    }
  }

  async function handleConnect() {
    if (isConnecting) return;

    try {
      isConnecting = true;
      buttonEl.disabled = true;
      buttonEl.textContent = 'Connecting...';
      setStatus('Connecting wallet...');

      if (typeof wallet.connect !== 'function') {
        throw new Error('Wallet connect method is not available');
      }

      await wallet.connect();
      await wait(500);
      await syncTimeline();
    } catch (error) {
      buttonEl.disabled = false;
      buttonEl.classList.remove('connected');
      buttonEl.textContent = connectText;
      setStatus(`Failed to connect: ${error?.message || error}`, true);
    } finally {
      isConnecting = false;
    }
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncTimeline().catch((error) => {
      console.error('Unlock timeline sync failed:', error);
      setStatus('Failed to refresh unlock timeline.', true);
    });
  }

  buttonEl.addEventListener('click', handleConnect);
  infoToggleEl?.addEventListener('click', togglePopover);
  document.addEventListener('click', handleOutsideClick);

  if (typeof wallet.subscribe === 'function') {
    walletUnsubscribe = wallet.subscribe(handleWalletUpdate);
  }

  const instance = {
    destroy() {
      isDestroyed = true;
      stopCountdown();
      buttonEl.removeEventListener('click', handleConnect);
      infoToggleEl?.removeEventListener('click', togglePopover);
      document.removeEventListener('click', handleOutsideClick);

      try {
        walletUnsubscribe?.();
      } catch (_) {}
    }
  };

  ACTIVE_INSTANCES.set(target, instance);

  handleWalletUpdate();

  return instance;
}
