import './walletButton.css';
import { subscribeWalletState } from '../core/store/walletStore.js';

function formatNumber(value, digits = 2) {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return '0.00';
  return num.toFixed(digits);
}

function createTRXIcon() {
  return `
    <svg class="fw-wallet-button__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.2 4.4L18.7 6.9L12.7 18.5L6.2 4.4Z" fill="rgb(255,105,0)"/>
      <path d="M6.2 4.4L11.3 10.6L18.7 6.9L6.2 4.4Z" fill="rgba(255,255,255,0.18)"/>
      <path d="M11.3 10.6L12.7 18.5L18.7 6.9L11.3 10.6Z" fill="rgba(255,255,255,0.28)"/>
    </svg>
  `;
}

function createFourteenIcon() {
  return `
    <svg class="fw-wallet-button__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="6" fill="rgb(255,105,0)"/>
      <path d="M8 15V9.8L6.8 10.6V8.9L8.8 7.7H10.1V15H8ZM14 15V13.3H11.1V11.9L14.3 7.7H16.1V11.8H17.2V13.3H16.1V15H14ZM12.8 11.8H14V10.2L12.8 11.8Z" fill="rgb(255,255,255)"/>
    </svg>
  `;
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
    await onRefresh?.();
  });

  dropdown.querySelector('[data-action="disconnect"]')?.addEventListener('click', async (e) => {
    e.stopPropagation();
    await onDisconnect?.();
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
      <span class="fw-wallet-button__label">CONNECT WALLET</span>
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

function renderError(root, variant, message) {
  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--error ${getVariantClass(variant)}">
      <span class="fw-wallet-button__wallet-dot"></span>
      <span class="fw-wallet-button__label">CONNECT WALLET</span>
    </button>
    <div class="fw-wallet-message fw-wallet-message--error">${message || 'Connection failed'}</div>
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
        ${createTRXIcon()}
      </span>
      <span class="fw-wallet-button__balance">
        <span class="fw-wallet-button__balance-value">${formatNumber(state.fourteenBalance)}</span>
        ${createFourteenIcon()}
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

  function bindDisconnected() {
    const button = root.querySelector('.fw-wallet-button');
    button?.addEventListener('click', async () => {
      closeDropdown();
      await options.onConnectClick?.();
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

    if (state.error) {
      renderError(root, variant, state.error);
      bindDisconnected();
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
    closeDropdown();
    document.removeEventListener('click', handleOutsideClick);
    unsubscribe?.();
  };
}
