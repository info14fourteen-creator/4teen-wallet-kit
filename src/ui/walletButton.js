import { subscribeWalletState } from '../core/store/walletStore.js';
import { formatTokenAmount } from '../core/utils/format.js';
import { trxIcon, fourteenIcon, walletIcon } from './icons.js';
import { createWalletDropdown } from './walletDropdown.js';

export function mountWalletButton(element, options = {}) {
  if (!element) {
    throw new Error('mountWalletButton: target element is required');
  }

  let dropdownMounted = false;

  function renderDisconnected() {
    element.innerHTML = `
      <button class="fourteen-wallet-button" type="button">
        <span class="fourteen-wallet-button__label">CONNECT WALLET</span>
        <img class="fourteen-wallet-button__wallet-icon" src="${walletIcon}" alt="wallet" />
      </button>
    `;

    const button = element.querySelector('button');
    button?.addEventListener('click', () => {
      options.onConnectClick?.();
    });
  }

  function renderConnected(state) {
    element.innerHTML = `
      <div class="fourteen-wallet-button-shell">
        <button class="fourteen-wallet-button fourteen-wallet-button--connected" type="button">
          <span class="fourteen-wallet-button__address">${state.shortAddress || ''}</span>
          <span class="fourteen-wallet-button__balance">
            ${formatTokenAmount(state.trxBalance)}
            <img src="${trxIcon}" alt="TRX" />
          </span>
          <span class="fourteen-wallet-button__balance">
            ${formatTokenAmount(state.fourteenBalance)}
            <img src="${fourteenIcon}" alt="4TEEN" />
          </span>
          <span class="fourteen-wallet-button__caret">▾</span>
        </button>
        <div class="fourteen-wallet-button__dropdown-slot"></div>
      </div>
    `;

    const button = element.querySelector('.fourteen-wallet-button');
    const slot = element.querySelector('.fourteen-wallet-button__dropdown-slot');

    button?.addEventListener('click', () => {
      dropdownMounted = !dropdownMounted;
      slot.innerHTML = '';

      if (!dropdownMounted) return;

      const dropdown = createWalletDropdown({
        onRefresh: options.onRefresh,
        onDisconnect: options.onDisconnect,
        onDiagnostics: options.onDiagnostics
      });

      slot.appendChild(dropdown);
    });
  }

  function render(state) {
    if (!state.connected) {
      dropdownMounted = false;
      renderDisconnected();
      return;
    }

    renderConnected(state);
  }

  return subscribeWalletState(render);
}
