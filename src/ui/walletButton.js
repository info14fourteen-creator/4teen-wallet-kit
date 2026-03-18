import './walletButton.css';
import { subscribeWalletState } from '../core/store/walletStore.js';
import {
  showErrorNotice,
  showNeutralNotice,
  showSuccessNotice
} from './noticeCenter.js';
import { trxIcon, fourteenIcon } from './icons.js';
import { showWalletPicker, hideWalletPicker } from './walletPicker.js';
import { resolveAutoWallet } from '../wallet/runtime/resolveAutoWallet.js';

function formatNumber(value, digits = 2) {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return '0.00';
  return num.toFixed(digits);
}

function createDropdown({ onRefresh, onDisconnect }) {
  const dropdown = document.createElement('div');
  dropdown.className = 'fw-wallet-dropdown';
  dropdown.innerHTML = `
    <button type="button" class="fw-wallet-dropdown__item" data-action="refresh">
      <span class="fw-wallet-dropdown__bullet"></span>
      <span>Refresh balances</span>
    </button>
    <button type="button" class="fw-wallet-dropdown__item fw-wallet-dropdown__item--danger" data-action="disconnect">
      <span class="fw-wallet-dropdown__bullet"></span>
      <span>Disconnect</span>
    </button>
  `;

  dropdown.querySelector('[data-action="refresh"]')?.addEventListener('click', async (e) => {
    e.stopPropagation();

    try {
      showNeutralNotice('Refreshing balances...');
      await onRefresh?.();
      showSuccessNotice('Balances refreshed');
    } catch (error) {
      showErrorNotice(error?.message || 'Failed to refresh balances');
    }
  });

  dropdown.querySelector('[data-action="disconnect"]')?.addEventListener('click', async (e) => {
    e.stopPropagation();

    try {
      await onDisconnect?.();
    } catch (error) {
      showErrorNotice(error?.message || 'Failed to disconnect wallet');
    }
  });

  return dropdown;
}

function getVariantClass(variant) {
  if (variant === 'compact') return 'fw-wallet-button--compact';
  if (variant === 'hero') return 'fw-wallet-button--hero';
  return 'fw-wallet-button--standard';
}

function renderIdle(root, variant) {
  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--idle ${getVariantClass(variant)}">
      <span class="fw-wallet-button__wallet-dot"></span>
      <span class="fw-wallet-button__label">WALLET NOT CONNECTED</span>
    </button>
  `;
}

function renderConnecting(root, variant) {
  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--connecting ${getVariantClass(variant)}" disabled>
      <span class="fw-wallet-spinner"></span>
      <span class="fw-wallet-button__label">CONNECTING...</span>
    </button>
  `;
}

function renderConnected(root, state, variant) {
  const compact = variant === 'compact';

  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--connected ${getVariantClass(variant)}">
      <span class="fw-wallet-button__status-dot"></span>
      <span class="fw-wallet-button__address">${state.shortAddress || ''}</span>
      ${compact ? '' : '<span class="fw-wallet-button__divider"></span>'}
      <span class="fw-wallet-button__balance">
        <span class="fw-wallet-button__balance-value">${formatNumber(state.trxBalance)}</span>
        <img class="fw-wallet-button__icon" src="${trxIcon}" alt="TRX" />
      </span>
      <span class="fw-wallet-button__balance">
        <span class="fw-wallet-button__balance-value">${formatNumber(state.fourteenBalance)}</span>
        <img class="fw-wallet-button__icon" src="${fourteenIcon}" alt="4TEEN" />
      </span>
      <span class="fw-wallet-button__caret">▾</span>
    </button>
  `;
}

export function mountWalletButton(target, options = {}) {
  if (!target) {
    throw new Error('mountWalletButton: target is required');
  }

  const variant = options.variant || 'standard';
  const root = document.createElement('div');
  root.className = 'fw-wallet-root';
  target.innerHTML = '';
  target.appendChild(root);

  let isDropdownOpen = false;
  let unsubscribe = null;
  let latestState = null;
  let pickerOpen = false;
  let connectInFlight = false;

  function closeDropdown() {
    const existing = root.querySelector('.fw-wallet-dropdown');
    if (existing) existing.remove();
    isDropdownOpen = false;
  }

  function toggleDropdown() {
    if (isDropdownOpen) {
      closeDropdown();
      return;
    }

    closeDropdown();

    const dropdown = createDropdown({
      onRefresh: options.onRefresh,
      onDisconnect: async () => {
        closeDropdown();
        await options.onDisconnect?.();
      }
    });

    root.appendChild(dropdown);
    isDropdownOpen = true;
  }

  async function tryDirectAutoConnect() {
    const autoWallet = resolveAutoWallet();

    if (!autoWallet.shouldAutoConnect || !autoWallet.walletId) {
      return false;
    }

    if (connectInFlight) {
      return true;
    }

    connectInFlight = true;

    try {
      await options.onConnectClick?.(autoWallet.walletId);
      return true;
    } finally {
      connectInFlight = false;
    }
  }

  async function openPicker() {
    if (pickerOpen) return;
    pickerOpen = true;

    const wallets = Array.isArray(latestState?.availableWallets)
      ? latestState.availableWallets
      : [];

    showWalletPicker({
      wallets,
      onSelect: async (wallet) => {
        connectInFlight = true;

        try {
          await options.onConnectClick?.(wallet.id);
        } finally {
          connectInFlight = false;
          pickerOpen = false;
        }
      },
      onClose: () => {
        pickerOpen = false;
        hideWalletPicker();
      }
    });
  }

  async function handleDisconnectedClick() {
    if (connectInFlight) {
      return;
    }

    closeDropdown();

    const handledByAutoConnect = await tryDirectAutoConnect();

    if (handledByAutoConnect) {
      return;
    }

    await openPicker();
  }

  function bindDisconnected() {
    const button = root.querySelector('.fw-wallet-button');

    button?.addEventListener('click', async () => {
      await handleDisconnectedClick();
    });
  }

  function bindConnected() {
    const button = root.querySelector('.fw-wallet-button');

    button?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  function render(state) {
    latestState = state;
    closeDropdown();

    if (state.connecting) {
      renderConnecting(root, variant);
      return;
    }

    if (state.connected) {
      renderConnected(root, state, variant);
      bindConnected();
      return;
    }

    renderIdle(root, variant);
    bindDisconnected();
  }

  unsubscribe = subscribeWalletState(render);

  function handleOutsideClick(event) {
    if (!root.contains(event.target)) {
      closeDropdown();
    }
  }

  document.addEventListener('click', handleOutsideClick);

  return () => {
    pickerOpen = false;
    connectInFlight = false;
    hideWalletPicker();
    closeDropdown();
    document.removeEventListener('click', handleOutsideClick);
    unsubscribe?.();
  };
}
