import './liquidityController.css';
import { mountWalletButton } from '../../ui/walletButton.js';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONFIG = {
  controllerAddress: 'TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ',
  apiKey: 'd4fcb4c1-89d8-4651-9e34-11dd7848789b',
  explorerBase: 'https://tronscan.org/#/transaction/',
  contractEventsUrl: 'https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ/events',
  eventsBase: 'https://api.trongrid.io/v1/contracts',
  executeText: 'Execute Liquidity',
  processingText: 'Processing...',
  mobileConnectHint: 'Tap connect below to continue.',
  title: 'Liquidity Controller',
  subtitle: 'Manual trigger for automated liquidity routing',
  infoTitle: 'How this controller works',
  infoText: `4TEEN runs a fully automated on-chain liquidity system.

The Liquidity Controller smart contract accumulates TRX and executes daily liquidity distribution when conditions are met.

Funds from token sales are routed directly into liquidity pools through on-chain execution.

6.43% of the contract balance is deployed to liquidity every day during the lock period.

All actions are executed via smart contracts and sent to JustMoney and Sun.io.

Everything you see here is 100% on-chain:

• LiquidityExecuted — confirmed liquidity distribution  
• TRXReceived — incoming TRX from token sales  

No backend. No manual control. No hidden logic.

If it's shown here — it's on-chain and verifiable.`
};

const LIQUIDITY_CONTROLLER_ABI = [
  {
    constant: false,
    inputs: [],
    name: 'executeLiquidity',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatUtc(ts) {
  const date = new Date(Number(ts || 0));

  if (!Number.isFinite(date.getTime())) {
    return '—';
  }

  return date.toLocaleString('en-GB', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function shortTx(txid) {
  return txid ? `${String(txid).slice(0, 8)}…` : 'View';
}

function trxAmount(value) {
  const num = Number(value || 0) / 1e6;

  if (!Number.isFinite(num)) {
    return '0.00';
  }

  return num.toFixed(2);
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

function getConnectedAddress(wallet) {
  const state = getWalletStateSafe(wallet);

  return (
    state?.address ||
    wallet?.getAddress?.() ||
    wallet?.getTronWeb?.()?.defaultAddress?.base58 ||
    null
  );
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false;

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(max-width: 640px)').matches;
  }

  return window.innerWidth <= 640;
}

async function refreshBalancesSafe(wallet) {
  if (!wallet || typeof wallet.refreshBalances !== 'function') {
    return;
  }

  try {
    await wallet.refreshBalances();
  } catch (_) {}
}

export function mountLiquidityController(target, config = {}) {
  const {
    controllerAddress,
    apiKey,
    explorerBase,
    contractEventsUrl,
    eventsBase,
    executeText,
    processingText,
    mobileConnectHint,
    title,
    subtitle,
    infoTitle,
    infoText
  } = { ...DEFAULT_CONFIG, ...config };

  if (!target) {
    throw new Error('mountLiquidityController: target is required');
  }

  if (!controllerAddress) {
    throw new Error('mountLiquidityController: controllerAddress is required');
  }

  if (!apiKey) {
    throw new Error('mountLiquidityController: apiKey is required');
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
    <div class="fourteen-liquidity-widget">
      <div class="fourteen-liquidity-shell">
        <div class="fourteen-liquidity-hero">
          <div class="fourteen-liquidity-hero__bg"></div>

          <div class="fourteen-liquidity-hero__text">
            <div class="fourteen-liquidity-hero__title">
  Liquidity <span>Controller</span>
</div>
            <div class="fourteen-liquidity-hero__subtitle">${escapeHtml(subtitle)}</div>
          </div>

          <div class="fourteen-liquidity-hero__actions">
            <div class="fourteen-liquidity-badge">AUTOMATED</div>

            <div class="fourteen-liquidity-info-toggle-wrap">
              <button
                class="fourteen-liquidity-info-toggle"
                type="button"
                aria-label="Liquidity info"
                data-role="liquidity-info-toggle"
              >
                i
              </button>

              <div class="fourteen-liquidity-popover" data-role="liquidity-popover" hidden>
                <div class="fourteen-liquidity-popover__title">${escapeHtml(infoTitle)}</div>
                <div class="fourteen-liquidity-popover__text">${escapeHtml(infoText).replaceAll('\n', '<br><br>')}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-liquidity-topbar">
          <div class="fourteen-liquidity-wallet" data-role="wallet-label">Wallet not connected</div>

          <a
            class="fourteen-liquidity-section-link"
            href="${escapeHtml(contractEventsUrl)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all
          </a>
        </div>

        <div class="fourteen-liquidity-connect-slot">
          <div class="fourteen-liquidity-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-liquidity-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(mobileConnectHint)}
          </div>
        </div>

        <div class="fourteen-liquidity-summary">
          <div class="fourteen-liquidity-summary-card">
            <div class="fourteen-liquidity-summary-label">Controller</div>
            <div class="fourteen-liquidity-summary-value">${escapeHtml(shortenAddress(controllerAddress))}</div>
          </div>

          <div class="fourteen-liquidity-summary-card">
            <div class="fourteen-liquidity-summary-label">Last Execute</div>
            <div class="fourteen-liquidity-summary-value" data-role="last-execute">—</div>
          </div>

          <div class="fourteen-liquidity-summary-card">
            <div class="fourteen-liquidity-summary-label">Latest TRX Received</div>
            <div class="fourteen-liquidity-summary-value" data-role="last-received">—</div>
          </div>
        </div>

        <div class="fourteen-liquidity-details">
          <div class="fourteen-liquidity-note">
            <strong>Manual trigger:</strong> connect a wallet and execute the controller when conditions are satisfied. Execution history and incoming TRX are shown below for transparency.
          </div>
        </div>

        <button class="fourteen-liquidity-action" type="button" data-role="execute-button" disabled>
          ${escapeHtml(executeText)}
        </button>

        <div class="fourteen-liquidity-status" data-role="status" role="status" aria-live="polite"></div>

        <div class="fourteen-liquidity-section">
          <div class="fourteen-liquidity-section-head">
            <div>
              <div class="fourteen-liquidity-section-title">Last Liquidity Executions</div>
              <div class="fourteen-liquidity-section-subtitle">Recent controller executions on-chain</div>
            </div>
          </div>

          <div class="fourteen-liquidity-desktop-table-wrap">
            <table class="fourteen-liquidity-table">
              <thead>
                <tr>
                  <th>Date (UTC)</th>
                  <th>Total</th>
                  <th>JustMoney</th>
                  <th>Sun.io</th>
                  <th>Tx</th>
                </tr>
              </thead>
              <tbody data-role="exec-table"></tbody>
            </table>
          </div>

          <div class="fourteen-liquidity-mobile-list" data-role="exec-mobile"></div>
        </div>

        <div class="fourteen-liquidity-section">
          <div class="fourteen-liquidity-section-head">
            <div>
              <div class="fourteen-liquidity-section-title">Last TRX Received</div>
              <div class="fourteen-liquidity-section-subtitle">Recent deposits received by the controller</div>
            </div>
          </div>

          <div class="fourteen-liquidity-desktop-table-wrap">
            <table class="fourteen-liquidity-table">
              <thead>
                <tr>
                  <th>Date (UTC)</th>
                  <th>Amount</th>
                  <th>Tx</th>
                </tr>
              </thead>
              <tbody data-role="trx-table"></tbody>
            </table>
          </div>

          <div class="fourteen-liquidity-mobile-list" data-role="trx-mobile"></div>
        </div>
      </div>
    </div>
  `;

  const walletInfoEl = target.querySelector('[data-role="wallet-label"]');
  const statusEl = target.querySelector('[data-role="status"]');
  const lastExecuteEl = target.querySelector('[data-role="last-execute"]');
  const lastReceivedEl = target.querySelector('[data-role="last-received"]');
  const execTableEl = target.querySelector('[data-role="exec-table"]');
  const execMobileEl = target.querySelector('[data-role="exec-mobile"]');
  const trxTableEl = target.querySelector('[data-role="trx-table"]');
  const trxMobileEl = target.querySelector('[data-role="trx-mobile"]');
  const executeButtonEl = target.querySelector('[data-role="execute-button"]');
  const infoToggleEl = target.querySelector('[data-role="liquidity-info-toggle"]');
  const popoverEl = target.querySelector('[data-role="liquidity-popover"]');
  const embeddedWalletButtonEl = target.querySelector('[data-role="embedded-wallet-button"]');
  const mobileConnectHintEl = target.querySelector('[data-role="mobile-connect-hint"]');

  let isDestroyed = false;
  let busy = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;
  let contract = null;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function setStatus(text = '', isError = false) {
    if (!statusEl) return;
    statusEl.textContent = text;
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

  function renderExecEmpty(message) {
    execTableEl.innerHTML = `<tr><td colspan="5" class="fourteen-liquidity-muted">${escapeHtml(message)}</td></tr>`;
    execMobileEl.innerHTML = `<div class="fourteen-liquidity-empty">${escapeHtml(message)}</div>`;
  }

  function renderTrxEmpty(message) {
    trxTableEl.innerHTML = `<tr><td colspan="3" class="fourteen-liquidity-muted">${escapeHtml(message)}</td></tr>`;
    trxMobileEl.innerHTML = `<div class="fourteen-liquidity-empty">${escapeHtml(message)}</div>`;
  }

  function updateActionState() {
    const connected = isConnectedSafe(wallet);
    executeButtonEl.disabled = !connected || busy;
    executeButtonEl.textContent = busy ? processingText : executeText;
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
      variant: 'compact',
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await waitForWalletReady();
          await refreshBalancesSafe(wallet);
        }
      },
      onRefresh: async () => {
        await refreshBalancesSafe(wallet);
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
      }
    });
  }

  async function waitForWalletReady(attempts = 12, intervalMs = 250) {
    for (let i = 0; i < attempts; i++) {
      const tronWeb = getTronWebSafe(wallet);
      const address = getConnectedAddress(wallet);

      if (tronWeb?.defaultAddress?.base58 && address) {
        return true;
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }

    return false;
  }

  async function ensureContractReady() {
    const tronWeb = getTronWebSafe(wallet);

    if (!tronWeb?.defaultAddress?.base58) {
      throw new Error('Wallet not ready');
    }

    contract = await tronWeb.contract(LIQUIDITY_CONTROLLER_ABI, controllerAddress);
    return contract;
  }

  async function fetchEvents(eventName, limit = 20) {
    const resp = await fetch(
      `${eventsBase}/${controllerAddress}/events?event_name=${encodeURIComponent(eventName)}&limit=${limit}`,
      {
        headers: {
          'TRON-PRO-API-KEY': apiKey
        }
      }
    );

    if (!resp.ok) {
      throw new Error(`Events API failed with status ${resp.status}`);
    }

    const json = await resp.json();
    return Array.isArray(json?.data) ? json.data : [];
  }

  async function loadExecuteEvents() {
    try {
      const data = await fetchEvents('LiquidityExecuted', 20);

      if (!data.length) {
        renderExecEmpty('No execution data yet.');
        lastExecuteEl.textContent = '—';
        return;
      }

      lastExecuteEl.textContent = formatUtc(data[0]?.block_timestamp);

      execTableEl.innerHTML = data
        .map((e) => {
          const totalAmount = trxAmount(e?.result?.totalAmount);
          const amountA = trxAmount(e?.result?.amountA);
          const amountB = trxAmount(e?.result?.amountB);
          const txid = e?.transaction_id || '';

          return `
            <tr>
              <td>${escapeHtml(formatUtc(e?.block_timestamp))}</td>
              <td>${escapeHtml(totalAmount)} TRX</td>
              <td>${escapeHtml(amountA)} TRX</td>
              <td>${escapeHtml(amountB)} TRX</td>
              <td>
                <a class="fourteen-liquidity-link" href="${escapeHtml(explorerBase + txid)}" target="_blank" rel="noopener noreferrer">
                  ${escapeHtml(shortTx(txid))}
                </a>
              </td>
            </tr>
          `;
        })
        .join('');

      execMobileEl.innerHTML = data
        .map((e) => {
          const totalAmount = trxAmount(e?.result?.totalAmount);
          const amountA = trxAmount(e?.result?.amountA);
          const amountB = trxAmount(e?.result?.amountB);
          const txid = e?.transaction_id || '';

          return `
            <div class="fourteen-liquidity-event-card">
              <div class="fourteen-liquidity-event-top">
                <div class="fourteen-liquidity-event-title">${escapeHtml(totalAmount)} TRX</div>
                <div class="fourteen-liquidity-event-badge">Executed</div>
              </div>

              <div class="fourteen-liquidity-event-grid">
                <div class="fourteen-liquidity-event-item">
                  <div class="fourteen-liquidity-event-label">Date (UTC)</div>
                  <div class="fourteen-liquidity-event-value">${escapeHtml(formatUtc(e?.block_timestamp))}</div>
                </div>

                <div class="fourteen-liquidity-event-item">
                  <div class="fourteen-liquidity-event-label">JustMoney</div>
                  <div class="fourteen-liquidity-event-value">${escapeHtml(amountA)} TRX</div>
                </div>

                <div class="fourteen-liquidity-event-item">
                  <div class="fourteen-liquidity-event-label">Sun.io</div>
                  <div class="fourteen-liquidity-event-value">${escapeHtml(amountB)} TRX</div>
                </div>

                <div class="fourteen-liquidity-event-item">
                  <div class="fourteen-liquidity-event-label">Transaction</div>
                  <div class="fourteen-liquidity-event-value">
                    <a class="fourteen-liquidity-link" href="${escapeHtml(explorerBase + txid)}" target="_blank" rel="noopener noreferrer">
                      ${escapeHtml(shortTx(txid))}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    } catch (error) {
      console.error('loadExecuteEvents error:', error);
      renderExecEmpty('Could not load execution history.');
    }
  }

  async function loadTrxReceived() {
    try {
      const data = await fetchEvents('TRXReceived', 20);

      if (!data.length) {
        renderTrxEmpty('No TRX received data yet.');
        lastReceivedEl.textContent = '—';
        return;
      }

      lastReceivedEl.textContent = `${trxAmount(data[0]?.result?.amount)} TRX`;

      trxTableEl.innerHTML = data
        .map((e) => {
          const amount = trxAmount(e?.result?.amount);
          const txid = e?.transaction_id || '';

          return `
            <tr>
              <td>${escapeHtml(formatUtc(e?.block_timestamp))}</td>
              <td>${escapeHtml(amount)} TRX</td>
              <td>
                <a class="fourteen-liquidity-link" href="${escapeHtml(explorerBase + txid)}" target="_blank" rel="noopener noreferrer">
                  ${escapeHtml(shortTx(txid))}
                </a>
              </td>
            </tr>
          `;
        })
        .join('');

      trxMobileEl.innerHTML = data
        .map((e) => {
          const amount = trxAmount(e?.result?.amount);
          const txid = e?.transaction_id || '';

          return `
            <div class="fourteen-liquidity-event-card">
              <div class="fourteen-liquidity-event-top">
                <div class="fourteen-liquidity-event-title">${escapeHtml(amount)} TRX</div>
                <div class="fourteen-liquidity-event-badge">Received</div>
              </div>

              <div class="fourteen-liquidity-event-grid">
                <div class="fourteen-liquidity-event-item">
                  <div class="fourteen-liquidity-event-label">Date (UTC)</div>
                  <div class="fourteen-liquidity-event-value">${escapeHtml(formatUtc(e?.block_timestamp))}</div>
                </div>

                <div class="fourteen-liquidity-event-item">
                  <div class="fourteen-liquidity-event-label">Transaction</div>
                  <div class="fourteen-liquidity-event-value">
                    <a class="fourteen-liquidity-link" href="${escapeHtml(explorerBase + txid)}" target="_blank" rel="noopener noreferrer">
                      ${escapeHtml(shortTx(txid))}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    } catch (error) {
      console.error('loadTrxReceived error:', error);
      renderTrxEmpty('Could not load TRX received history.');
    }
  }

  async function executeLiquidity() {
    if (busy) return;

    try {
      busy = true;
      updateActionState();
      setStatus('Sending transaction...');

      await ensureContractReady();

      const tx = await contract.executeLiquidity().send({
        shouldPollResponse: true
      });

      const txid =
        typeof tx === 'string'
          ? tx
          : (tx?.txid || tx?.transaction || '');

      setStatus(
        txid
          ? `Done · ${txid}`
          : 'Execution completed.'
      );

      await loadExecuteEvents();
      await loadTrxReceived();
    } catch (error) {
      console.error('executeLiquidity error:', error);
      setStatus(error?.message || 'Transaction failed', true);
    } finally {
      busy = false;
      updateActionState();
    }
  }

  async function syncWalletState() {
    syncEmbeddedWalletUi();
    updateWalletLabel();
    updateActionState();

    if (!isConnectedSafe(wallet)) {
      contract = null;
      return;
    }

    try {
      await ensureContractReady();
      setStatus('');
    } catch (error) {
      console.error('liquidity ensureContractReady error:', error);
      contract = null;
      setStatus('Wallet is connected but controller is not ready yet.', true);
    }
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncWalletState().catch((error) => {
      console.error('Liquidity controller wallet sync failed:', error);
    });
  }

  function handleResize() {
    if (!isAlive()) return;
    syncEmbeddedWalletUi();
  }

  executeButtonEl.addEventListener('click', async () => {
    if (!isConnectedSafe(wallet)) {
      setStatus('Connect wallet first.', true);
      return;
    }

    await executeLiquidity();
  });

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
      executeButtonEl.removeEventListener('click', executeLiquidity);
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

  syncWalletState().catch((error) => {
    console.error('Liquidity controller initial sync failed:', error);
  });

  loadExecuteEvents();
  loadTrxReceived();

  return instance;
}
