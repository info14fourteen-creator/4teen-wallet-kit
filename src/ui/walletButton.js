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

function getCycleBalance(state, cycleIndex) {
  if (cycleIndex === 1) {
    return {
      value: formatNumber(state.fourteenBalance),
      icon: fourteenIcon,
      alt: '4TEEN',
      kind: 'fourteen'
    };
  }

  return {
    value: formatNumber(state.trxBalance),
    icon: trxIcon,
    alt: 'TRX',
    kind: 'trx'
  };
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
      <span class="fw-wallet-button__label">Connect Wallet</span>
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

function renderConnected(root, state, variant, cycleIndex, animate = false) {
  const compact = variant === 'compact';
  const currentBalance = getCycleBalance(state, cycleIndex);
  const balanceAnimationClass = animate ? ' fw-wallet-button__balance--animate' : '';

  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--connected ${getVariantClass(variant)}">
      <span class="fw-wallet-button__status-dot"></span>
      <span class="fw-wallet-button__address">${state.shortAddress || ''}</span>
      ${compact ? '' : '<span class="fw-wallet-button__divider"></span>'}
      <span class="fw-wallet-button__balance fw-wallet-button__balance--single fw-wallet-button__balance--${currentBalance.kind}${balanceAnimationClass}">
        <span class="fw-wallet-button__balance-value">${currentBalance.value}</span>
        <img class="fw-wallet-button__icon" src="${currentBalance.icon}" alt="${currentBalance.alt}" />
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
  let cycleTimer = null;
  let cycleIndex = 0;
  let animateNextCycle = false;

  function closeDropdown() {
    const existing = root.querySelector('.fw-wallet-dropdown');
    if (existing) existing.remove();
    isDropdownOpen = false;
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }

    cycleIndex = 0;
    animateNextCycle = false;
  }

  function startCycle() {
    if (cycleTimer) {
      return;
    }

    cycleTimer = setInterval(() => {
      if (!latestState?.connected) {
        stopCycle();
        return;
      }

      cycleIndex = (cycleIndex + 1) % 2;
      animateNextCycle = true;
      render(latestState);
    }, 3000);
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
      stopCycle();
      renderConnecting(root, variant);
      return;
    }

    if (state.connected) {
      renderConnected(root, state, variant, cycleIndex, animateNextCycle);
      animateNextCycle = false;
      bindConnected();
      startCycle();
      return;
    }

    stopCycle();
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
    stopCycle();
    hideWalletPicker();
    closeDropdown();
    document.removeEventListener('click', handleOutsideClick);
    unsubscribe?.();
  };
}
