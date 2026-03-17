import './walletPicker.css';

import tronlinkIcon from '../assets/tronlink.svg';
import okxIcon from '../assets/okx.svg';
import binanceIcon from '../assets/binance.svg';
import trustIcon from '../assets/trust.svg';
import bitgetIcon from '../assets/bitget.svg';
import tokenpocketIcon from '../assets/tokenpocket.svg';
import metamaskIcon from '../assets/metamask.svg';
import walletconnectIcon from '../assets/walletconnect.svg';

const WALLET_META = [
  { id: 'TronLink', name: 'TronLink', icon: tronlinkIcon },
  { id: 'OKX Wallet', name: 'OKX Wallet', icon: okxIcon },
  { id: 'Binance Wallet', name: 'Binance Wallet', icon: binanceIcon },
  { id: 'Trust', name: 'Trust Wallet', icon: trustIcon },
  { id: 'Bitget Wallet', name: 'Bitget Wallet', icon: bitgetIcon },
  { id: 'TokenPocket', name: 'TokenPocket', icon: tokenpocketIcon },
  { id: 'MetaMask', name: 'MetaMask', icon: metamaskIcon },
  { id: 'WalletConnect', name: 'WalletConnect', icon: walletconnectIcon }
];

let pickerRoot = null;
let backdropEl = null;
let panelEl = null;

function getWalletMeta(wallet) {
  return WALLET_META.find((item) => item.id === wallet.id) || {
    id: wallet.id,
    name: wallet.name,
    icon: walletconnectIcon
  };
}

function isReady(wallet) {
  if (wallet.id === 'WalletConnect') return true;
  return wallet.readyState === 'Found';
}

function getStatusText(wallet) {
  if (wallet.id === 'WalletConnect') return 'Ready';
  return wallet.readyState === 'Found' ? 'Ready' : 'Unavailable';
}

function ensurePicker() {
  if (pickerRoot) {
    return pickerRoot;
  }

  pickerRoot = document.createElement('div');

  backdropEl = document.createElement('div');
  backdropEl.className = 'fw-wallet-picker-backdrop';

  panelEl = document.createElement('div');
  panelEl.className = 'fw-wallet-picker';

  pickerRoot.appendChild(backdropEl);
  pickerRoot.appendChild(panelEl);

  return pickerRoot;
}

export function hideWalletPicker() {
  if (pickerRoot?.parentNode) {
    pickerRoot.parentNode.removeChild(pickerRoot);
  }
}

export function showWalletPicker({ wallets = [], onSelect, onClose }) {
  const root = ensurePicker();

  panelEl.innerHTML = `
    <div class="fw-wallet-picker__header">
      <div class="fw-wallet-picker__title">Select Wallet</div>
      <button type="button" class="fw-wallet-picker__close" aria-label="Close wallet picker">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 7L17 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M17 7L7 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div class="fw-wallet-picker__list"></div>
  `;

  const list = panelEl.querySelector('.fw-wallet-picker__list');
  const closeBtn = panelEl.querySelector('.fw-wallet-picker__close');

  wallets.forEach((wallet) => {
    const meta = getWalletMeta(wallet);
    const ready = isReady(wallet);

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'fw-wallet-picker__item';
    item.innerHTML = `
      <span class="fw-wallet-picker__item-left">
        <img class="fw-wallet-picker__icon" src="${meta.icon}" alt="${meta.name}" />
        <span class="fw-wallet-picker__name">${meta.name}</span>
      </span>
      <span class="fw-wallet-picker__status">
        <span class="fw-wallet-picker__dot ${ready ? 'fw-wallet-picker__dot--ready' : 'fw-wallet-picker__dot--not-ready'}"></span>
        <span class="fw-wallet-picker__status-text">${getStatusText(wallet)}</span>
      </span>
    `;

    item.addEventListener('click', async () => {
      hideWalletPicker();
      await onSelect?.(wallet);
    });

    list.appendChild(item);
  });

  function close() {
    hideWalletPicker();
    onClose?.();
  }

  backdropEl.onclick = close;
  closeBtn.onclick = close;

  if (!document.body.contains(root)) {
    document.body.appendChild(root);
  }
}
