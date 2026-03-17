import { subscribeWalletState } from '../core/store/walletStore.js';
import { formatTokenAmount } from '../core/utils/format.js';
import { trxIcon, fourteenIcon, walletIcon } from './icons.js';

export function mountWalletButton(element, { onConnectClick }) {
  if (!element) {
    throw new Error('mountWalletButton: target element is required');
  }

  function render(state) {
    if (!state.connected) {
      element.innerHTML = `
        <button class="fourteen-wallet-button" type="button">
          <span class="fourteen-wallet-button__label">CONNECT WALLET</span>
          <img class="fourteen-wallet-button__wallet-icon" src="${walletIcon}" alt="wallet" />
        </button>
      `;

      const button = element.querySelector('button');
      button?.addEventListener('click', onConnectClick, { once: true });
      return;
    }

    element.innerHTML = `
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
      </button>
    `;
  }

  return subscribeWalletState(render);
}
