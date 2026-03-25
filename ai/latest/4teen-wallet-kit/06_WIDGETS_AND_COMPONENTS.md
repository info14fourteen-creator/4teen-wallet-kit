# REPOSITORY: 4teen-wallet-kit
# SECTION: WIDGETS AND COMPONENTS
# GENERATED_AT: 2026-03-25T17:07:08.204Z

## INCLUDED FILES

- src/ui/icons.js
- src/ui/mobileShell.config.js
- src/ui/mobileShell.css
- src/ui/mobileShell.js
- src/ui/noticeCenter.css
- src/ui/noticeCenter.js
- src/ui/wallet/openWalletPicker.js
- src/ui/walletButton.css
- src/ui/walletButton.js
- src/ui/walletDropdown.js
- src/ui/walletPicker.css
- src/ui/walletPicker.js
- src/widgets/ambassadorRegister/ambassadorRegister.css
- src/widgets/ambassadorRegister/index.js
- src/widgets/directBuy/directBuy.css
- src/widgets/directBuy/index.js
- src/widgets/liquidityController/index.js
- src/widgets/liquidityController/liquidityController.css
- src/widgets/mobileShell/index.js
- src/widgets/swap/constants.js
- src/widgets/swap/index.js
- src/widgets/swap/providers/justmoney.js
- src/widgets/swap/providers/sunio.js
- src/widgets/swap/services/quotes.js
- src/widgets/swap/services/swapExecution.js
- src/widgets/swap/swap.css
- src/widgets/unlockTimeline/index.js
- src/widgets/unlockTimeline/unlockTimeline.css

## REPOSITORY LINK BASE

- https://raw.githubusercontent.com/info14fourteen-creator/4teen-wallet-kit/main/ai/latest/4teen-wallet-kit

---

## FILE: src/ui/icons.js

```js
import trxIcon from '../assets/trx.svg';
import fourteenIcon from '../assets/4teen.svg';
import walletIcon from '../assets/wallet.svg';

export { trxIcon, fourteenIcon, walletIcon };
```

---

## FILE: src/ui/mobileShell.config.js

```js
// src/ui/mobileShell.config.js

import facebookSocial from '../assets/socials/facebook_social.svg';
import xSocial from '../assets/socials/x_social.svg';
import instagramSocial from '../assets/socials/instagram_social.svg';
import youtubeSocial from '../assets/socials/youtube_social.svg';
import whatsappSocial from '../assets/socials/whatsapp_social.svg';
import telegramSocial from '../assets/socials/telegram_social.svg';
import threadsSocial from '../assets/socials/threads_social.svg';
import tiktokSocial from '../assets/socials/tiktok_social.svg';
import discordSocial from '../assets/socials/discord_social.svg';
import githubSocial from '../assets/socials/github_social.svg';

import buyMenu from '../assets/menu/buy_menu.svg';
import swapMenu from '../assets/menu/swap_menu.svg';
import unlockMenu from '../assets/menu/unlock_menu.svg';
import liquidityMenu from '../assets/menu/liquidity_menu.svg';

export const MOBILE_MENU_LINKS = [
  { id: 'home', label: 'home', href: 'https://4teen.me' },
  { id: 'whitepaper', label: 'whitepaper', href: 'https://4teen.me/wp' },
  { id: 'tokenomics', label: 'tokenomics', href: 'https://4teen.me/tc' },
  { id: 'airdrop', label: 'airdrop', href: 'https://4teen.me/ad' },
  { id: 'blog', label: 'blog', href: 'https://4teen.me/bg' },
  { id: 'buy', label: 'buy', href: 'https://4teen.me/bt' },
  { id: 'swap', label: 'swap', href: 'https://4teen.me/sw' },
  { id: 'unlock-timeline', label: 'unlock timeline', href: 'https://4teen.me/ult' },
  { id: 'liquidity-controller', label: 'liquidity controller', href: 'https://4teen.me/lc' },
  { id: 'phone', label: 'tel: +1 646-217-8070', href: 'tel:+1%20646-217-8070' },
  { id: 'email', label: 'email: info@4teen.me', href: 'mailto:info@4teen.me' }
];

export const MOBILE_SOCIALS = [
  {
    id: 'facebook',
    shortName: 'facebook',
    href: 'https://facebook.com/Fourteentoken',
    icon: facebookSocial,
    alt: 'Facebook'
  },
  {
    id: 'x',
    shortName: 'x',
    href: 'https://x.com/4teentoken',
    icon: xSocial,
    alt: 'X'
  },
  {
    id: 'instagram',
    shortName: 'instagram',
    href: 'https://instagram.com/fourteentoken',
    icon: instagramSocial,
    alt: 'Instagram'
  },
  {
    id: 'youtube',
    shortName: 'youtube',
    href: 'https://www.youtube.com/@4teentoken',
    icon: youtubeSocial,
    alt: 'YouTube'
  },
  {
    id: 'whatsapp',
    shortName: 'whatsapp',
    href: 'https://wa.me/16462178070',
    icon: whatsappSocial,
    alt: 'WhatsApp'
  },
  {
    id: 'telegram',
    shortName: 'telegram',
    href: 'https://t.me/fourteentoken',
    icon: telegramSocial,
    alt: 'Telegram'
  },
  {
    id: 'threads',
    shortName: 'threads',
    href: 'https://www.threads.com/@fourteentoken',
    icon: threadsSocial,
    alt: 'Threads'
  },
  {
    id: 'tiktok',
    shortName: 'tiktok',
    href: 'https://www.tiktok.com/@4teentoken',
    icon: tiktokSocial,
    alt: 'TikTok'
  },
  {
    id: 'discord',
    shortName: 'discord',
    href: 'https://discord.gg/jWZF6KzPCB',
    icon: discordSocial,
    alt: 'Discord'
  },
  {
    id: 'github',
    shortName: 'github',
    href: 'https://github.com/info14fourteen-creator',
    icon: githubSocial,
    alt: 'GitHub'
  }
];

export const MOBILE_BOTTOM_NAV = [
  {
    id: 'buy',
    label: 'buy\ntoken',
    href: 'https://4teen.me/bt',
    icon: buyMenu
  },
  {
    id: 'swap',
    label: 'swap\ntoken',
    href: 'https://4teen.me/sw',
    icon: swapMenu
  },
  {
    id: 'unlock',
    label: 'unlock\ntimeline',
    href: 'https://4teen.me/ult',
    icon: unlockMenu
  },
  {
    id: 'liquidity',
    label: 'liquidity\ncontroller',
    href: 'https://4teen.me/lc',
    icon: liquidityMenu
  }
];

export const MOBILE_SHELL_DEFAULTS = {
  brandText: '4teen.me',
  connectText: 'connect',
  socialRotateMs: 1500
};
```

---

## FILE: src/ui/mobileShell.css

```css
:root {
  --ms-bg: #050505;
  --ms-panel: rgba(7, 7, 9, 0.96);
  --ms-panel-strong: rgba(5, 5, 7, 0.985);
  --ms-text: #ffffff;
  --ms-text-soft: rgba(255, 255, 255, 0.82);
  --ms-text-dim: rgba(255, 255, 255, 0.56);
  --ms-accent: #ff6a00;
  --ms-accent-2: #ff7f11;
  --ms-top-h: 72px;
  --ms-bottom-h: 112px;
  --ms-center-size: 96px;
  --ms-side-gap: 14px;
  --ms-safe-top: env(safe-area-inset-top, 0px);
  --ms-safe-bottom: env(safe-area-inset-bottom, 0px);
  --ms-z-overlay: 1200;
  --ms-z-panel: 1250;
  --ms-z-bars: 1300;
  --ms-z-center: 1360;
}

html.mobile-shell-lock,
body.mobile-shell-lock {
  overflow: hidden;
  touch-action: none;
}

.mobile-shell {
  position: relative;
  z-index: 1;
  font-family: inherit;
  color: var(--ms-text);
}

.mobile-shell *,
.mobile-shell *::before,
.mobile-shell *::after {
  box-sizing: border-box;
}

.ms-overlay {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 8%, rgba(255, 106, 0, 0.08), transparent 24%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.985) 100%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 220ms ease, visibility 220ms ease;
  z-index: var(--ms-z-overlay);
}

.mobile-shell.is-open .ms-overlay {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* top */

.ms-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(var(--ms-top-h) + var(--ms-safe-top));
  padding:
    calc(var(--ms-safe-top) + 10px)
    var(--ms-side-gap)
    8px;
  display: grid;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  gap: 10px;
  z-index: var(--ms-z-bars);
}

.ms-topbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(12, 14, 18, 0.96) 0%, rgba(8, 10, 14, 0.9) 100%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: -1;
}

.ms-top-spacer {
  min-width: 0;
}

.ms-top-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;
}

/* burger */

.ms-burger {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 24px;
  position: relative;
  cursor: pointer;
  border-radius: 0;
}

.ms-burger-line {
  position: absolute;
  left: 0;
  width: 26px;
  height: 2px;
  border-radius: 999px;
  background: var(--ms-accent);
  box-shadow: 0 0 10px rgba(255, 106, 0, 0.22);
  transition:
    transform 200ms ease,
    top 200ms ease,
    opacity 160ms ease;
}

.ms-burger-line:nth-child(1) {
  top: 3px;
}

.ms-burger-line:nth-child(2) {
  top: 11px;
}

.ms-burger-line:nth-child(3) {
  top: 19px;
}

.mobile-shell.is-menu-open .ms-burger-line:nth-child(1) {
  top: 11px;
  transform: rotate(45deg);
}

.mobile-shell.is-menu-open .ms-burger-line:nth-child(2) {
  opacity: 0;
}

.mobile-shell.is-menu-open .ms-burger-line:nth-child(3) {
  top: 11px;
  transform: rotate(-45deg);
}

/* social top button */

.ms-social-toggle {
  appearance: none;
  border: 0;
  outline: none;
  cursor: pointer;
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  padding: 0;
  margin: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(30, 30, 33, 0.98) 0%, rgba(16, 16, 18, 0.98) 100%);
  display: inline-grid;
  place-items: center;
  overflow: hidden;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 4px 14px rgba(0, 0, 0, 0.18);
  transition:
    transform 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;
  flex: 0 0 auto;
}

.ms-social-toggle:hover,
.ms-social-toggle:active {
  transform: translateY(-1px);
  background: linear-gradient(180deg, rgba(38, 38, 42, 0.98) 0%, rgba(20, 20, 24, 0.98) 100%);
  opacity: 1;
}

.ms-social-toggle-icon {
  width: 26px;
  height: 26px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

/* wallet hosts */

.ms-wallet-host {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.ms-top-actions .ms-wallet-host {
  min-width: 0;
  max-width: 100%;
}

.ms-bottom-center .ms-wallet-host {
  position: relative;
  width: var(--ms-center-size);
  height: 72px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.ms-top-actions .ms-wallet-host [data-fourteen-wallet],
.ms-top-actions .ms-wallet-host > * {
  max-width: 100%;
}

.ms-bottom-center .ms-wallet-host [data-fourteen-wallet],
.ms-bottom-center .ms-wallet-host > * {
  position: relative;
  z-index: 2;
}

/* panels */

.ms-menu-panel,
.ms-social-panel {
  position: fixed;
  top: calc(var(--ms-top-h) + var(--ms-safe-top));
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--ms-z-panel);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(6px);
  transition:
    opacity 200ms ease,
    visibility 200ms ease,
    transform 200ms ease;
}

.mobile-shell.is-menu-open .ms-menu-panel,
.mobile-shell.is-social-open .ms-social-panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

.ms-menu-inner,
.ms-social-panel-inner {
  height: 100%;
  overflow: auto;
  padding: 12px 16px calc(var(--ms-bottom-h) + var(--ms-safe-bottom) + 18px);
  background:
    linear-gradient(180deg, rgba(8, 9, 11, 0.985) 0%, rgba(3, 3, 5, 0.995) 100%);
}

.ms-menu-shell,
.ms-social-shell {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* menu nav */

.ms-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ms-menu-link,
.ms-menu-link:link,
.ms-menu-link:visited,
.ms-menu-link:hover,
.ms-menu-link:active {
  display: block;
  width: fit-content;
  text-decoration: none !important;
  color: #ffffff !important;
  font-size: clamp(23px, 5vw, 31px);
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
  padding: 4px 0;
  transition:
    color 160ms ease,
    transform 160ms ease,
    opacity 160ms ease;
}

.ms-menu-link:hover,
.ms-menu-link:active {
  color: #ffffff !important;
  transform: translateX(4px);
  opacity: 0.82;
}

.ms-menu-link.is-active,
.ms-menu-link.is-active:link,
.ms-menu-link.is-active:visited,
.ms-menu-link.is-active:hover,
.ms-menu-link.is-active:active {
  color: var(--ms-accent) !important;
  opacity: 1;
  text-decoration: none !important;
}

/* contacts */

.ms-contacts {
  margin-top: auto;
  padding-top: 18px;
}

.ms-contacts-title {
  color: rgba(255, 255, 255, 0.26);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.ms-contacts-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ms-contact-link,
.ms-contact-link:link,
.ms-contact-link:visited,
.ms-contact-link:hover,
.ms-contact-link:active {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  text-decoration: none !important;
  color: #ffffff !important;
  font-size: 13px;
  line-height: 1.25;
  font-weight: 600;
  transition:
    color 160ms ease,
    opacity 160ms ease;
}

.ms-contact-link:hover,
.ms-contact-link:active {
  color: #ffffff !important;
  opacity: 0.82;
}

.ms-contact-link__emoji {
  font-size: 13px;
  line-height: 1;
}

.ms-contact-link__text {
  display: inline-block;
  color: inherit;
}

/* socials */

.ms-social-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ms-social-menu-link,
.ms-social-menu-link:link,
.ms-social-menu-link:visited,
.ms-social-menu-link:hover,
.ms-social-menu-link:active {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 8px 0;
  text-decoration: none !important;
  color: #ffffff !important;
  transition:
    transform 160ms ease,
    opacity 160ms ease;
}

.ms-social-menu-link:hover,
.ms-social-menu-link:active {
  transform: translateX(4px);
  opacity: 0.82;
}

.ms-social-menu-link-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

.ms-social-menu-link-label {
  color: #ffffff !important;
  font-size: 17px;
  line-height: 1;
  font-weight: 700;
  text-transform: lowercase;
  text-decoration: none !important;
}

/* bottom bar */

.ms-bottombar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(var(--ms-bottom-h) + var(--ms-safe-bottom));
  padding:
    0
    10px
    calc(10px + var(--ms-safe-bottom));
  z-index: var(--ms-z-bars);
  pointer-events: none;
  transition: opacity 180ms ease, transform 180ms ease;
}

.mobile-shell.is-open .ms-bottombar {
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
}

.ms-bottombar::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(88px + var(--ms-safe-bottom));
  background:
    linear-gradient(180deg, rgba(5, 5, 7, 0.98) 0%, rgba(1, 1, 3, 0.995) 100%);
  box-shadow:
    0 -10px 28px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  z-index: -1;
}

.ms-bottom-left,
.ms-bottom-center,
.ms-bottom-right {
  position: absolute;
  bottom: calc(6px + var(--ms-safe-bottom));
  pointer-events: auto;
}

.ms-bottom-left {
  left: 10px;
  width: calc(50% - 64px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.ms-bottom-right {
  right: 10px;
  width: calc(50% - 64px);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.ms-bottom-center {
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(6px + var(--ms-safe-bottom));
  z-index: var(--ms-z-center);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* bottom groups */

.ms-bottom-links-group {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  align-items: end;
}

.ms-bottom-link,
.ms-bottom-link:link,
.ms-bottom-link:visited,
.ms-bottom-link:hover,
.ms-bottom-link:active {
  min-height: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 4px 2px 2px;
  border-radius: 16px;
  text-decoration: none !important;
  color: #ffffff !important;
  background: transparent;
  transition:
    transform 160ms ease,
    opacity 160ms ease,
    color 160ms ease;
  -webkit-tap-highlight-color: transparent;
}

.ms-bottom-link:hover,
.ms-bottom-link:active {
  transform: translateY(-1px);
  opacity: 0.84;
  color: #ffffff !important;
}

.ms-bottom-link.is-active,
.ms-bottom-link.is-active:link,
.ms-bottom-link.is-active:visited,
.ms-bottom-link.is-active:hover,
.ms-bottom-link.is-active:active {
  color: var(--ms-accent) !important;
  opacity: 1;
}

.ms-bottom-link-icon-wrap {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.ms-bottom-link-icon {
  width: 38px;
  height: 38px;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.98;
}

.ms-bottom-link.is-active .ms-bottom-link-icon {
  filter: none;
  opacity: 1;
}

.ms-bottom-link-label {
  text-align: center;
  font-size: 10px;
  line-height: 1.08;
  font-weight: 700;
  color: currentColor !important;
  opacity: 1;
  text-decoration: none !important;
}

/* responsive */

@media (max-width: 420px) {
  :root {
    --ms-top-h: 70px;
    --ms-bottom-h: 108px;
    --ms-center-size: 92px;
  }

  .ms-menu-link,
  .ms-menu-link:link,
  .ms-menu-link:visited,
  .ms-menu-link:hover,
  .ms-menu-link:active {
    font-size: clamp(21px, 5vw, 28px);
  }

  .ms-social-toggle {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }

  .ms-social-toggle-icon {
    width: 24px;
    height: 24px;
  }

  .ms-social-menu-link-label {
    font-size: 16px;
  }

  .ms-bottom-left,
  .ms-bottom-right {
    width: calc(50% - 62px);
  }

  .ms-bottom-link {
    min-height: 64px;
  }

  .ms-bottom-link-icon-wrap {
    width: 40px;
    height: 40px;
  }

  .ms-bottom-link-icon {
    width: 34px;
    height: 34px;
  }

  .ms-bottom-link-label {
    font-size: 9px;
  }
}

@media (min-width: 769px) {
  .mobile-shell {
    display: none;
  }
}
```

---

## FILE: src/ui/mobileShell.js

```js
// src/ui/mobileShell.js

import './mobileShell.css';
import { mountWalletButton } from './walletButton.js';
import {
  MOBILE_MENU_LINKS,
  MOBILE_BOTTOM_NAV,
  MOBILE_SOCIALS,
  MOBILE_SHELL_DEFAULTS
} from './mobileShell.config.js';

const MOBILE_SHELL_INSTANCE_KEY = '__fourteenMobileShellInstance__';
const EXCLUDED_MENU_IDS = new Set(['buy', 'swap', 'unlock', 'liquidity']);
const EXCLUDED_MENU_HREFS = new Set([
  'https://4teen.me/bt',
  'https://4teen.me/sw',
  'https://4teen.me/ult',
  'https://4teen.me/lc'
]);

function ensureTarget(target) {
  if (!target) return document.body;

  if (typeof target === 'string') {
    const element = document.querySelector(target);

    if (!element) {
      throw new Error(`createMobileShell: target "${target}" not found`);
    }

    return element;
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  return document.body;
}

function createElement(tag, className, html = '') {
  const node = document.createElement(tag);

  if (className) {
    node.className = className;
  }

  if (html) {
    node.innerHTML = html;
  }

  return node;
}

function nlToBr(value = '') {
  return String(value).replace(/\n/g, '<br>');
}

function lockBodyScroll() {
  document.documentElement.classList.add('mobile-shell-lock');
  document.body.classList.add('mobile-shell-lock');
}

function unlockBodyScroll() {
  document.documentElement.classList.remove('mobile-shell-lock');
  document.body.classList.remove('mobile-shell-lock');
}

function normalizeUrl(input = '') {
  try {
    const url = new URL(input, window.location.origin);
    return `${url.origin}${url.pathname}`.replace(/\/+$/, '') || url.origin;
  } catch {
    return String(input).replace(/\/+$/, '');
  }
}

function getCurrentComparableUrl() {
  return normalizeUrl(window.location.href);
}

function isActiveHref(href = '') {
  if (!href) return false;
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;

  return normalizeUrl(href) === getCurrentComparableUrl();
}

function isExternalHttpLink(href = '') {
  return /^https?:\/\//i.test(href);
}

function shouldOpenInNewTab(href = '') {
  if (!href) return false;
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function shouldHideFromBurgerMenu(item = {}) {
  const id = String(item.id || '').trim().toLowerCase();
  const href = normalizeUrl(item.href || '');

  return EXCLUDED_MENU_IDS.has(id) || EXCLUDED_MENU_HREFS.has(href);
}

function splitMenuItems(items = []) {
  const navigation = [];
  const contacts = [];

  items.forEach((item) => {
    const href = String(item?.href || '');

    if (href.startsWith('tel:') || href.startsWith('mailto:')) {
      contacts.push(item);
      return;
    }

    if (shouldHideFromBurgerMenu(item)) {
      return;
    }

    navigation.push(item);
  });

  return { navigation, contacts };
}

function buildMenuLinks(items = []) {
  const nav = createElement('nav', 'ms-menu-nav');
  nav.setAttribute('aria-label', 'Mobile menu');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-menu-link';
    a.href = item.href || '#';
    a.textContent = item.label || 'link';
    a.dataset.id = item.id || '';

    if (isActiveHref(item.href || '')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }

    if (shouldOpenInNewTab(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    nav.appendChild(a);
  });

  return nav;
}

function getContactMeta(item = {}) {
  const href = String(item.href || '');

  if (href.startsWith('tel:')) {
    return {
      emoji: '📞',
      label: item.label || 'phone'
    };
  }

  if (href.startsWith('mailto:')) {
    return {
      emoji: '✉️',
      label: item.label || 'email'
    };
  }

  return {
    emoji: '•',
    label: item.label || 'contact'
  };
}

function buildContacts(items = []) {
  if (!items.length) return null;

  const wrap = createElement('div', 'ms-contacts');
  const title = createElement('div', 'ms-contacts-title', 'Contacts');
  const list = createElement('div', 'ms-contacts-list');

  items.forEach((item) => {
    const a = document.createElement('a');
    const meta = getContactMeta(item);

    a.className = 'ms-contact-link';
    a.href = item.href || '#';
    a.dataset.id = item.id || '';

    a.innerHTML = `
      <span class="ms-contact-link__emoji" aria-hidden="true">${meta.emoji}</span>
      <span class="ms-contact-link__text">${meta.label}</span>
    `;

    list.appendChild(a);
  });

  wrap.appendChild(title);
  wrap.appendChild(list);

  return wrap;
}

function buildSocialMenu(items = []) {
  const nav = createElement('nav', 'ms-social-menu-nav');
  nav.setAttribute('aria-label', 'Social links');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-social-menu-link';
    a.href = item.href || '#';
    a.dataset.id = item.id || '';
    a.setAttribute('aria-label', item.alt || item.shortName || item.id || 'social');

    if (isExternalHttpLink(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <img
        class="ms-social-menu-link-icon"
        src="${item.icon || ''}"
        alt="${item.alt || item.shortName || item.id || 'social'}"
      >
      <span class="ms-social-menu-link-label">${item.shortName || item.alt || item.id || 'social'}</span>
    `;

    nav.appendChild(a);
  });

  return nav;
}

function buildRotatingSocialButton() {
  const button = createElement('button', 'ms-social-toggle');
  button.type = 'button';
  button.setAttribute('aria-label', 'Open social links');

  const icon = document.createElement('img');
  icon.className = 'ms-social-toggle-icon';
  icon.alt = 'Social';

  button.appendChild(icon);

  return { button, icon };
}

function buildWalletHost(className = '') {
  return createElement('div', className ? `ms-wallet-host ${className}` : 'ms-wallet-host');
}

function buildBottomLink(item = {}) {
  const a = document.createElement('a');
  a.className = 'ms-bottom-link';
  a.href = item.href || '#';
  a.dataset.id = item.id || '';
  a.setAttribute('aria-label', item.label || item.id || 'navigation item');

  if (isActiveHref(item.href || '')) {
    a.classList.add('is-active');
    a.setAttribute('aria-current', 'page');
  }

  if (shouldOpenInNewTab(item.href || '')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  a.innerHTML = `
    <span class="ms-bottom-link-icon-wrap">
      <img
        class="ms-bottom-link-icon"
        src="${item.icon || ''}"
        alt="${item.label || item.id || ''}"
      >
    </span>
    <span class="ms-bottom-link-label">${nlToBr(item.label || '')}</span>
  `;

  return a;
}

function buildBottomGroups(items = []) {
  const leftWrap = createElement('div', 'ms-bottom-links-group ms-bottom-links-group-left');
  const rightWrap = createElement('div', 'ms-bottom-links-group ms-bottom-links-group-right');

  const safeItems = Array.isArray(items) ? items.slice(0, 4) : [];
  const leftItems = safeItems.slice(0, 2);
  const rightItems = safeItems.slice(2, 4);

  leftItems.forEach((item) => {
    leftWrap.appendChild(buildBottomLink(item));
  });

  rightItems.forEach((item) => {
    rightWrap.appendChild(buildBottomLink(item));
  });

  return { leftWrap, rightWrap };
}

export function createMobileShell(options = {}) {
  const target = ensureTarget(options.target);

  if (
    target[MOBILE_SHELL_INSTANCE_KEY] &&
    typeof target[MOBILE_SHELL_INSTANCE_KEY].destroy === 'function'
  ) {
    target[MOBILE_SHELL_INSTANCE_KEY].destroy();
  }

  const menuItems = options.menuItems || MOBILE_MENU_LINKS;
  const bottomNavItems = options.bottomNavItems || MOBILE_BOTTOM_NAV;
  const socials = options.socials || MOBILE_SOCIALS;
  const socialRotateMs =
    Number(options.socialRotateMs || MOBILE_SHELL_DEFAULTS.socialRotateMs) || 1500;

  const walletButtonOptions = {
    onConnectClick: options.onConnectClick,
    onDisconnect: options.onDisconnect,
    onRefresh: options.onRefresh
  };

  const { navigation: mainMenuItems, contacts: contactMenuItems } = splitMenuItems(menuItems);

  const root = createElement('div', 'mobile-shell');
  root.innerHTML = `
    <div class="ms-overlay"></div>

    <header class="ms-topbar">
      <button class="ms-burger" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
      </button>

      <div class="ms-top-spacer"></div>

      <div class="ms-top-actions"></div>
    </header>

    <aside class="ms-menu-panel" aria-hidden="true">
      <div class="ms-menu-inner">
        <div class="ms-menu-shell"></div>
      </div>
    </aside>

    <aside class="ms-social-panel" aria-hidden="true">
      <div class="ms-social-panel-inner">
        <div class="ms-social-shell"></div>
      </div>
    </aside>

    <nav class="ms-bottombar" aria-label="Bottom mobile bar">
      <div class="ms-bottom-left"></div>
      <div class="ms-bottom-center"></div>
      <div class="ms-bottom-right"></div>
    </nav>
  `;

  const overlay = root.querySelector('.ms-overlay');
  const burger = root.querySelector('.ms-burger');
  const topActions = root.querySelector('.ms-top-actions');
  const menuPanel = root.querySelector('.ms-menu-panel');
  const socialPanel = root.querySelector('.ms-social-panel');
  const menuShell = root.querySelector('.ms-menu-shell');
  const socialShell = root.querySelector('.ms-social-shell');
  const bottomLeft = root.querySelector('.ms-bottom-left');
  const bottomCenter = root.querySelector('.ms-bottom-center');
  const bottomRight = root.querySelector('.ms-bottom-right');

  const menuLinks = buildMenuLinks(mainMenuItems);
  const contactsBlock = buildContacts(contactMenuItems);
  const socialMenuLinks = buildSocialMenu(socials);
  const rotatingSocialButton = buildRotatingSocialButton();
  const topWalletHost = buildWalletHost('ms-wallet-host-top');
  const bottomWalletHost = buildWalletHost('ms-wallet-host-bottom');
  const bottomGroups = buildBottomGroups(bottomNavItems);

  menuShell.appendChild(menuLinks);

  if (contactsBlock) {
    menuShell.appendChild(contactsBlock);
  }

  socialShell.appendChild(socialMenuLinks);

  topActions.appendChild(rotatingSocialButton.button);
  topActions.appendChild(topWalletHost);

  bottomLeft.appendChild(bottomGroups.leftWrap);
  bottomCenter.appendChild(bottomWalletHost);
  bottomRight.appendChild(bottomGroups.rightWrap);

  const cleanups = [];
  let isDestroyed = false;
  let activePanel = null;
  let socialIndex = 0;
  let socialTimer = null;
  let topWalletInstance = null;
  let bottomWalletInstance = null;

  function registerCleanup(fn) {
    cleanups.push(fn);
  }

  function on(node, eventName, handler, optionsValue) {
    node.addEventListener(eventName, handler, optionsValue);
    registerCleanup(() => {
      node.removeEventListener(eventName, handler, optionsValue);
    });
  }

  function updateRotatingSocialIcon() {
    if (!socials.length) return;

    const current = socials[socialIndex % socials.length];
    rotatingSocialButton.icon.src = current.icon || '';
    rotatingSocialButton.icon.alt = current.alt || current.shortName || 'Social';
  }

  function stopSocialRotation() {
    if (socialTimer) {
      window.clearInterval(socialTimer);
      socialTimer = null;
    }
  }

  function startSocialRotation() {
    stopSocialRotation();

    if (!socials.length) return;

    updateRotatingSocialIcon();

    socialTimer = window.setInterval(() => {
      socialIndex = (socialIndex + 1) % socials.length;
      updateRotatingSocialIcon();
    }, socialRotateMs);
  }

  function setPanelState(panelName) {
    activePanel = panelName;

    const menuOpen = panelName === 'menu';
    const socialOpen = panelName === 'social';

    root.classList.toggle('is-open', Boolean(panelName));
    root.classList.toggle('is-menu-open', menuOpen);
    root.classList.toggle('is-social-open', socialOpen);

    burger.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    menuPanel.setAttribute('aria-hidden', menuOpen ? 'false' : 'true');
    socialPanel.setAttribute('aria-hidden', socialOpen ? 'false' : 'true');

    if (panelName) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
  }

  function openMenu() {
    setPanelState('menu');
  }

  function openSocialMenu() {
    setPanelState('social');
  }

  function closePanels() {
    setPanelState(null);
  }

  function toggleMenu() {
    if (activePanel === 'menu') {
      closePanels();
      return;
    }

    openMenu();
  }

  function toggleSocialMenu() {
    if (activePanel === 'social') {
      closePanels();
      return;
    }

    openSocialMenu();
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && activePanel) {
      closePanels();
    }
  }

  on(burger, 'click', toggleMenu);
  on(rotatingSocialButton.button, 'click', toggleSocialMenu);
  on(overlay, 'click', closePanels);
  on(document, 'keydown', handleKeydown);

  menuLinks.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  socialMenuLinks.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  if (contactsBlock) {
    contactsBlock.querySelectorAll('a').forEach((link) => {
      on(link, 'click', closePanels);
    });
  }

  bottomLeft.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  bottomRight.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  target.innerHTML = '';
  target.appendChild(root);

  topWalletInstance = mountWalletButton(topWalletHost, {
    ...walletButtonOptions,
    variant: 'compact'
  });

  bottomWalletInstance = mountWalletButton(bottomWalletHost, {
    ...walletButtonOptions,
    variant: 'mobile'
  });

  startSocialRotation();

  const instance = {
    root,
    openMenu,
    openSocialMenu,
    close: closePanels,
    destroy() {
      if (isDestroyed) return;
      isDestroyed = true;

      stopSocialRotation();
      closePanels();

      try {
        if (typeof topWalletInstance?.destroy === 'function') {
          topWalletInstance.destroy();
        } else if (typeof topWalletInstance === 'function') {
          topWalletInstance();
        }
      } catch (_) {}

      try {
        if (typeof bottomWalletInstance?.destroy === 'function') {
          bottomWalletInstance.destroy();
        } else if (typeof bottomWalletInstance === 'function') {
          bottomWalletInstance();
        }
      } catch (_) {}

      cleanups.forEach((cleanup) => {
        try {
          cleanup();
        } catch (_) {}
      });

      cleanups.length = 0;

      if (target[MOBILE_SHELL_INSTANCE_KEY] === instance) {
        target[MOBILE_SHELL_INSTANCE_KEY] = null;
      }

      if (root.parentNode) {
        root.parentNode.removeChild(root);
      }

      unlockBodyScroll();
    }
  };

  target[MOBILE_SHELL_INSTANCE_KEY] = instance;

  return instance;
}
```

---

## FILE: src/ui/noticeCenter.css

```css
:root {
  --fw-orange: rgb(255, 105, 0);
  --fw-graphite: rgb(26, 26, 26);
  --fw-steel: rgb(77, 77, 77);
  --fw-light: rgb(242, 242, 242);
  --fw-white: rgb(255, 255, 255);
  --fw-green: rgb(26, 224, 58);
  --fw-red: rgb(255, 48, 73);
}

.fw-notice-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483000;
}

.fw-notice {
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%) translateY(-10px);

  width: min(92vw, 420px);
  padding: 18px 18px 18px;

  border-radius: 14px;
  background: rgba(26, 26, 26, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.42);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  pointer-events: auto;

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s ease;
}

.fw-notice--visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* CONTENT */
.fw-notice__content {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-right: 18px;
}

.fw-notice__message {
  margin: 0;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 700;
  color: var(--fw-light);
  word-break: break-word;
}

/* COLORS */
.fw-notice--success .fw-notice__message {
  color: var(--fw-green);
}

.fw-notice--error .fw-notice__message {
  color: var(--fw-red);
}

.fw-notice--neutral .fw-notice__message {
  color: var(--fw-light);
}

/* CLOSE BUTTON */
.fw-notice__close {
  position: absolute;
  top: -12px;
  right: -12px;

  width: 34px;
  height: 34px;

  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;

  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);

  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.32);

  transition:
    transform 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
}

.fw-notice__close:hover {
  transform: scale(1.08);
  border-color: rgba(255, 255, 255, 0.28);
}

.fw-notice__close:active {
  transform: scale(0.96);
}

.fw-notice__close svg {
  width: 14px;
  height: 14px;
  display: block;
}

.fw-notice__close path {
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
}

/* TIMER RING */
.fw-notice__ring {
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  transform: rotate(-90deg);
}

.fw-notice__ring-track {
  fill: none;
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 3;
}

.fw-notice__ring-progress {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.12s linear;
}

.fw-notice--success .fw-notice__ring-progress {
  stroke: var(--fw-green);
}

.fw-notice--error .fw-notice__ring-progress {
  stroke: var(--fw-red);
}

.fw-notice--neutral .fw-notice__ring-progress {
  stroke: var(--fw-light);
}

/* MOBILE */
@media (max-width: 640px) {
  .fw-notice {
    top: 14px;
    width: min(94vw, 380px);
    padding: 16px 16px 16px;
    border-radius: 12px;
  }

  .fw-notice__content {
    gap: 12px;
    padding-right: 14px;
  }

  .fw-notice__message {
    font-size: 14px;
  }

  .fw-notice__close {
    top: -10px;
    right: -10px;
    width: 32px;
    height: 32px;
  }

  .fw-notice__close svg {
    width: 13px;
    height: 13px;
  }
}
```

---

## FILE: src/ui/noticeCenter.js

```js
import './noticeCenter.css';

let layer = null;
let noticeEl = null;
let messageEl = null;
let progressEl = null;
let closeEl = null;

let hideTimer = null;
let rafId = null;
let activeNoticeId = 0;

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ensureLayer() {
  if (typeof document === 'undefined') return null;
  if (layer) return layer;

  layer = document.createElement('div');
  layer.className = 'fw-notice-layer';

  noticeEl = document.createElement('div');
  noticeEl.className = 'fw-notice fw-notice--neutral';
  noticeEl.innerHTML = `
    <button type="button" class="fw-notice__close" aria-label="Close notification">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 7L17 17"></path>
        <path d="M17 7L7 17"></path>
      </svg>
    </button>

    <div class="fw-notice__content">
      <svg class="fw-notice__ring" viewBox="0 0 34 34" aria-hidden="true">
        <circle class="fw-notice__ring-track" cx="17" cy="17" r="${RADIUS}"></circle>
        <circle class="fw-notice__ring-progress" cx="17" cy="17" r="${RADIUS}"></circle>
      </svg>

      <div class="fw-notice__message"></div>
    </div>
  `;

  messageEl = noticeEl.querySelector('.fw-notice__message');
  progressEl = noticeEl.querySelector('.fw-notice__ring-progress');
  closeEl = noticeEl.querySelector('.fw-notice__close');

  progressEl.style.strokeDasharray = `${CIRCUMFERENCE}`;
  progressEl.style.strokeDashoffset = '0';

  closeEl.addEventListener('click', () => {
    hideNotice();
  });

  layer.appendChild(noticeEl);
  document.body.appendChild(layer);

  return layer;
}

function clearTimers() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function setType(type) {
  noticeEl.classList.remove(
    'fw-notice--success',
    'fw-notice--error',
    'fw-notice--neutral'
  );

  if (type === 'success') {
    noticeEl.classList.add('fw-notice--success');
    return;
  }

  if (type === 'error') {
    noticeEl.classList.add('fw-notice--error');
    return;
  }

  noticeEl.classList.add('fw-notice--neutral');
}

function animateRing(duration, noticeId) {
  const start = performance.now();

  function frame(now) {
    if (noticeId !== activeNoticeId) return;

    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const offset = CIRCUMFERENCE * progress;

    if (progressEl) {
      progressEl.style.strokeDashoffset = String(offset);
    }

    if (progress < 1) {
      rafId = requestAnimationFrame(frame);
    }
  }

  if (progressEl) {
    progressEl.style.strokeDashoffset = '0';
  }

  rafId = requestAnimationFrame(frame);
}

export function hideNotice() {
  clearTimers();

  if (!noticeEl) return;

  noticeEl.classList.remove('fw-notice--visible');
}

export function showNotice(options = {}) {
  if (typeof document === 'undefined') return;

  ensureLayer();
  clearTimers();

  activeNoticeId += 1;
  const noticeId = activeNoticeId;

  const type = options.type || 'neutral';
  const message = options.message || '';
  const duration = Number(options.duration) > 0 ? Number(options.duration) : 5000;

  setType(type);
  messageEl.textContent = message;
  noticeEl.classList.add('fw-notice--visible');

  animateRing(duration, noticeId);

  hideTimer = setTimeout(() => {
    if (noticeId !== activeNoticeId) return;
    hideNotice();
  }, duration);
}

export function showSuccessNotice(message, duration = 5000) {
  showNotice({
    type: 'success',
    message,
    duration
  });
}

export function showErrorNotice(message, duration = 5000) {
  showNotice({
    type: 'error',
    message,
    duration
  });
}

export function showNeutralNotice(message, duration = 5000) {
  showNotice({
    type: 'neutral',
    message,
    duration
  });
}
```

---

## FILE: src/ui/wallet/openWalletPicker.js

```js
import { setWalletState } from '../../core/store/walletStore.js';

function safeCall(target, methodName) {
  if (!target || typeof target[methodName] !== 'function') {
    return false;
  }

  try {
    target[methodName]();
    return true;
  } catch (error) {
    console.error(`[4TEEN] ${methodName} failed`, error);
    return false;
  }
}

export async function openWalletPicker(appkit = null) {
  const opened =
    safeCall(appkit, 'openWalletPicker') ||
    safeCall(appkit, 'openWalletModal') ||
    safeCall(appkit, 'open') ||
    false;

  setWalletState({
    connecting: false,
    walletPickerOpen: true
  });

  return {
    ok: true,
    opened
  };
}
```

---

## FILE: src/ui/walletButton.css

```css
:root {
  --fw-orange: rgb(255, 105, 0);
  --fw-graphite: rgb(26, 26, 26);
  --fw-steel: rgb(77, 77, 77);
  --fw-light: rgb(242, 242, 242);
  --fw-white: rgb(255, 255, 255);
  --fw-green: rgb(26, 224, 58);
  --fw-red: rgb(255, 48, 73);

  --fw-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
  --fw-radius: 10px;
  --fw-radius-sm: 8px;
  --fw-border: 1px solid rgba(255, 255, 255, 0.08);

  --fw-balance-slot-standard: 12ch;
  --fw-balance-slot-compact: 11ch;
  --fw-balance-slot-hero: 13ch;
}

.fw-wallet-root {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: Inter, Arial, Helvetica, sans-serif;
}

/* desktop button */

.fw-wallet-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 40px;
  padding: 8px 12px;
  border-radius: var(--fw-radius);
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: linear-gradient(
    180deg,
    rgba(38, 38, 38, 0.98) 0%,
    rgba(26, 26, 26, 0.98) 100%
  );
  color: var(--fw-white);
  box-shadow: var(--fw-shadow);
  cursor: pointer;
  user-select: none;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease,
    opacity 0.25s ease;
  white-space: nowrap;
}

.fw-wallet-button:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 105, 0, 0.5);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.34);
}

.fw-wallet-button:active {
  transform: translateY(0);
}

.fw-wallet-button:disabled {
  opacity: 0.72;
  cursor: default;
}

.fw-wallet-button__left,
.fw-wallet-button__right {
  display: inline-flex;
  align-items: center;
}

.fw-wallet-button__left {
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
  justify-content: flex-start;
}

.fw-wallet-button__right {
  gap: 8px;
  flex: 0 0 auto;
  justify-content: flex-end;
  width: calc(var(--fw-balance-slot-standard) + 24px);
}

.fw-wallet-button--idle .fw-wallet-button__label {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--fw-white);
}

.fw-wallet-button__wallet-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--fw-orange);
  box-shadow: 0 0 12px rgba(255, 105, 0, 0.75);
  flex: 0 0 auto;
}

.fw-wallet-button--connecting {
  border-color: rgba(255, 105, 0, 0.55);
}

.fw-wallet-button--connecting .fw-wallet-button__label {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--fw-light);
}

.fw-wallet-spinner {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.18);
  border-top-color: var(--fw-orange);
  animation: fw-spin 0.85s linear infinite;
}

@keyframes fw-spin {
  to {
    transform: rotate(360deg);
  }
}

.fw-wallet-button--connected {
  border-color: rgba(26, 224, 58, 0.34);
  background:
    radial-gradient(circle at top left, rgba(255, 105, 0, 0.12), transparent 35%),
    linear-gradient(180deg, rgba(34, 34, 34, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%);
}

.fw-wallet-button__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--fw-green);
  box-shadow: 0 0 10px rgba(26, 224, 58, 0.75);
  flex: 0 0 auto;
}

.fw-wallet-button__address {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 700;
  color: var(--fw-white);
  opacity: 0.92;
}

.fw-wallet-button__balance {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  width: var(--fw-balance-slot-standard);
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
  color: var(--fw-light);
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  transition:
    opacity 0.28s ease,
    transform 0.28s ease,
    filter 0.28s ease;
}

.fw-wallet-button__balance--animate {
  animation: fw-balance-swap 0.42s ease;
}

.fw-wallet-button__balance--trx {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.05));
}

.fw-wallet-button__balance--fourteen {
  filter: drop-shadow(0 0 10px rgba(255, 105, 0, 0.12));
}

@keyframes fw-balance-swap {
  0% {
    opacity: 0;
    transform: translateY(4px) scale(0.985);
  }
  55% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fw-wallet-button__balance-value {
  min-width: 0;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  text-align: right;
  color: var(--fw-white);
  font-weight: 800;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'lnum' 1;
}

.fw-wallet-button__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

.fw-wallet-button__caret {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.64);
  flex: 0 0 auto;
}

.fw-wallet-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  padding: 8px;
  border-radius: 10px;
  background: rgba(26, 26, 26, 0.98);
  border: var(--fw-border);
  box-shadow: var(--fw-shadow);
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.fw-wallet-dropdown__item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 11px;
  border: 0;
  outline: 0;
  border-radius: var(--fw-radius-sm);
  background: transparent;
  color: var(--fw-white);
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.fw-wallet-dropdown__item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.fw-wallet-dropdown__item--danger:hover {
  background: rgba(255, 48, 73, 0.12);
  color: var(--fw-red);
}

.fw-wallet-dropdown__bullet {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--fw-orange);
  flex: 0 0 auto;
}

.fw-wallet-dropdown__item--danger .fw-wallet-dropdown__bullet {
  background: var(--fw-red);
}

.fw-wallet-button--compact {
  min-height: 34px;
  padding: 6px 10px;
}

.fw-wallet-button--compact .fw-wallet-button__label,
.fw-wallet-button--compact .fw-wallet-button__address,
.fw-wallet-button--compact .fw-wallet-button__balance {
  font-size: 11px;
}

.fw-wallet-button--compact .fw-wallet-button__icon {
  width: 12px;
  height: 12px;
}

.fw-wallet-button--compact .fw-wallet-button__right {
  width: calc(var(--fw-balance-slot-compact) + 22px);
}

.fw-wallet-button--compact .fw-wallet-button__balance {
  width: var(--fw-balance-slot-compact);
}

.fw-wallet-button--standard {
  min-height: 40px;
}

.fw-wallet-button--hero {
  min-height: 48px;
  padding: 10px 14px;
  border-radius: 12px;
}

.fw-wallet-button--hero .fw-wallet-button__label,
.fw-wallet-button--hero .fw-wallet-button__address,
.fw-wallet-button--hero .fw-wallet-button__balance {
  font-size: 13px;
}

.fw-wallet-button--hero .fw-wallet-button__icon {
  width: 16px;
  height: 16px;
}

.fw-wallet-button--hero .fw-wallet-button__right {
  width: calc(var(--fw-balance-slot-hero) + 26px);
}

.fw-wallet-button--hero .fw-wallet-button__balance {
  width: var(--fw-balance-slot-hero);
}

/* mobile button */

.fw-wallet-mobile {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  user-select: none;
}

.fw-wallet-mobile:disabled {
  opacity: 0.72;
  cursor: default;
}

.fw-wallet-mobile__circle {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 105, 0, 0.24);
  background: linear-gradient(
    180deg,
    rgba(38, 38, 38, 0.98) 0%,
    rgba(26, 26, 26, 0.98) 100%
  );
  box-shadow: var(--fw-shadow);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fw-wallet-mobile:hover .fw-wallet-mobile__circle {
  transform: translateY(-1px);
}

.fw-wallet-mobile__circle--idle {
  border-color: rgba(255, 105, 0, 0.34);
}

.fw-wallet-mobile__circle--connecting {
  border-color: rgba(255, 105, 0, 0.55);
}

.fw-wallet-mobile__circle--connected {
  border-color: rgba(26, 224, 58, 0.28);
  background:
    radial-gradient(circle at top left, rgba(255, 105, 0, 0.12), transparent 35%),
    linear-gradient(180deg, rgba(34, 34, 34, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%);
}

.fw-wallet-mobile__circle--trx,
.fw-wallet-mobile__circle--fourteen {
  border-color: rgba(255, 105, 0, 0.32);
  background:
    radial-gradient(circle at top left, rgba(255, 105, 0, 0.12), transparent 35%),
    linear-gradient(180deg, rgba(34, 34, 34, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%);
}

.fw-wallet-mobile__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.fw-wallet-mobile__status-dot--idle {
  background: var(--fw-orange);
  box-shadow: 0 0 12px rgba(255, 105, 0, 0.75);
}

.fw-wallet-mobile__status-dot--connected {
  background: var(--fw-green);
  box-shadow: 0 0 10px rgba(26, 224, 58, 0.75);
}

.fw-wallet-mobile__icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

.fw-wallet-mobile__text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 12px;
  text-align: center;
  font-size: 10px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--fw-white);
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'lnum' 1;
}

.fw-wallet-mobile__text--animate {
  animation: fw-mobile-text-swap 0.42s ease;
}

@keyframes fw-mobile-text-swap {
  0% {
    opacity: 0;
    transform: translateY(4px) scale(0.97);
  }
  55% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fw-wallet-root:has(.fw-wallet-mobile) .fw-wallet-dropdown {
  top: auto;
  bottom: calc(100% + 8px);
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

@media (max-width: 640px) {
  .fw-wallet-button {
    min-height: 38px;
    padding: 7px 10px;
    gap: 10px;
  }

  .fw-wallet-button__address {
    font-size: 11px;
  }

  .fw-wallet-button__balance {
    width: var(--fw-balance-slot-standard);
    font-size: 11px;
  }

  .fw-wallet-button__right {
    width: calc(var(--fw-balance-slot-standard) + 22px);
  }

  .fw-wallet-button__icon {
    width: 13px;
    height: 13px;
  }

  .fw-wallet-dropdown {
    top: auto;
    bottom: calc(100% + 8px);
    right: 0;
    left: auto;
    min-width: 180px;
  }

  .fw-wallet-root:has(.fw-wallet-mobile) .fw-wallet-dropdown {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  .fw-wallet-root:has(.fw-wallet-button--compact) .fw-wallet-dropdown {
    top: calc(100% + 8px);
    bottom: auto;
    right: 0;
    left: auto;
    transform: none;
  }

  .fw-wallet-button--compact .fw-wallet-button__balance {
    width: var(--fw-balance-slot-compact);
  }

  .fw-wallet-button--compact .fw-wallet-button__right {
    width: calc(var(--fw-balance-slot-compact) + 20px);
  }

  .fw-wallet-mobile__circle {
    width: 52px;
    height: 52px;
  }

  .fw-wallet-mobile__icon {
    width: 26px;
    height: 26px;
  }

  .fw-wallet-mobile__text {
    font-size: 9px;
    color: var(--fw-white);
  }
}
```

---

## FILE: src/ui/walletButton.js

```js
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

function getDesktopCycleBalance(state, cycleIndex) {
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

function getMobileCycleState(state, cycleIndex) {
  if (cycleIndex === 1) {
    return {
      label: formatNumber(state.trxBalance),
      icon: trxIcon,
      alt: 'TRX',
      mode: 'trx'
    };
  }

  if (cycleIndex === 2) {
    return {
      label: formatNumber(state.fourteenBalance),
      icon: fourteenIcon,
      alt: '4TEEN',
      mode: 'fourteen'
    };
  }

  return {
    label: 'connected',
    icon: null,
    alt: '',
    mode: 'connected'
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
  if (variant === 'mobile') return 'fw-wallet-button--mobile';
  return 'fw-wallet-button--standard';
}

function renderIdle(root, variant) {
  if (variant === 'mobile') {
    root.innerHTML = `
      <button type="button" class="fw-wallet-mobile" aria-label="Connect Wallet">
        <span class="fw-wallet-mobile__circle fw-wallet-mobile__circle--idle">
          <span class="fw-wallet-mobile__status-dot fw-wallet-mobile__status-dot--idle"></span>
        </span>
        <span class="fw-wallet-mobile__text">connect</span>
      </button>
    `;
    return;
  }

  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--idle ${getVariantClass(variant)}">
      <span class="fw-wallet-button__left">
        <span class="fw-wallet-button__wallet-dot"></span>
        <span class="fw-wallet-button__label">Connect Wallet</span>
      </span>
    </button>
  `;
}

function renderConnecting(root, variant) {
  if (variant === 'mobile') {
    root.innerHTML = `
      <button type="button" class="fw-wallet-mobile" aria-label="Connecting" disabled>
        <span class="fw-wallet-mobile__circle fw-wallet-mobile__circle--connecting">
          <span class="fw-wallet-spinner"></span>
        </span>
        <span class="fw-wallet-mobile__text">connecting</span>
      </button>
    `;
    return;
  }

  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--connecting ${getVariantClass(variant)}" disabled>
      <span class="fw-wallet-button__left">
        <span class="fw-wallet-spinner"></span>
        <span class="fw-wallet-button__label">CONNECTING...</span>
      </span>
    </button>
  `;
}

function renderDesktopConnected(root, state, variant, cycleIndex, animate = false) {
  const currentBalance = getDesktopCycleBalance(state, cycleIndex);
  const balanceAnimationClass = animate ? ' fw-wallet-button__balance--animate' : '';

  root.innerHTML = `
    <button type="button" class="fw-wallet-button fw-wallet-button--connected ${getVariantClass(variant)}">
      <span class="fw-wallet-button__left">
        <span class="fw-wallet-button__status-dot"></span>
        <span class="fw-wallet-button__address">${state.shortAddress || ''}</span>
      </span>
      <span class="fw-wallet-button__right">
        <span class="fw-wallet-button__balance fw-wallet-button__balance--${currentBalance.kind}${balanceAnimationClass}">
          <img class="fw-wallet-button__icon" src="${currentBalance.icon}" alt="${currentBalance.alt}" />
          <span class="fw-wallet-button__balance-value">${currentBalance.value}</span>
        </span>
        <span class="fw-wallet-button__caret">▾</span>
      </span>
    </button>
  `;
}

function renderMobileConnected(root, state, cycleIndex, animate = false) {
  const currentState = getMobileCycleState(state, cycleIndex);
  const animationClass = animate ? ' fw-wallet-mobile__text--animate' : '';

  root.innerHTML = `
    <button type="button" class="fw-wallet-mobile" aria-label="Wallet actions">
      <span class="fw-wallet-mobile__circle fw-wallet-mobile__circle--${currentState.mode}">
        ${
          currentState.icon
            ? `<img class="fw-wallet-mobile__icon" src="${currentState.icon}" alt="${currentState.alt}" />`
            : '<span class="fw-wallet-mobile__status-dot fw-wallet-mobile__status-dot--connected"></span>'
        }
      </span>
      <span class="fw-wallet-mobile__text${animationClass}">${currentState.label}</span>
    </button>
  `;
}

function renderConnected(root, state, variant, cycleIndex, animate = false) {
  if (variant === 'mobile') {
    renderMobileConnected(root, state, cycleIndex, animate);
    return;
  }

  renderDesktopConnected(root, state, variant, cycleIndex, animate);
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

      cycleIndex = variant === 'mobile'
        ? (cycleIndex + 1) % 3
        : (cycleIndex + 1) % 2;

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
    const button = root.querySelector('button');

    button?.addEventListener('click', async () => {
      await handleDisconnectedClick();
    });
  }

  function bindConnected() {
    const button = root.querySelector('button');

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
```

---

## FILE: src/ui/walletDropdown.js

```js
export function createWalletDropdown({
  onRefresh,
  onDisconnect,
  onDiagnostics
}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'fourteen-wallet-dropdown';
  wrapper.innerHTML = `
    <button type="button" data-action="refresh">Refresh balances</button>
    <button type="button" data-action="diagnostics">Diagnostics</button>
    <button type="button" data-action="disconnect">Disconnect</button>
  `;

  wrapper.querySelector('[data-action="refresh"]')?.addEventListener('click', () => {
    onRefresh?.();
  });

  wrapper.querySelector('[data-action="diagnostics"]')?.addEventListener('click', () => {
    onDiagnostics?.();
  });

  wrapper.querySelector('[data-action="disconnect"]')?.addEventListener('click', () => {
    onDisconnect?.();
  });

  return wrapper;
}
```

---

## FILE: src/ui/walletPicker.css

```css
.fw-wallet-picker-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.56);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2147482500;
}

.fw-wallet-picker {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(94vw, 420px);
  max-height: min(78vh, 620px);
  overflow: auto;
  background: rgba(26, 26, 26, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.42);
  padding: 14px;
  z-index: 2147482600;
  font-family: Inter, Arial, Helvetica, sans-serif;
}

.fw-wallet-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fw-wallet-picker__title {
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.fw-wallet-picker__close {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fw-wallet-picker__close svg {
  width: 13px;
  height: 13px;
  display: block;
}

.fw-wallet-picker__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fw-wallet-picker__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    180deg,
    rgba(38, 38, 38, 0.98) 0%,
    rgba(26, 26, 26, 0.98) 100%
  );
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}

.fw-wallet-picker__item:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 105, 0, 0.38);
}

.fw-wallet-picker__item:disabled {
  cursor: default;
  opacity: 0.72;
}

.fw-wallet-picker__item-left {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.fw-wallet-picker__icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

.fw-wallet-picker__name {
  font-size: 13px;
  font-weight: 700;
  color: rgb(255, 255, 255);
}

.fw-wallet-picker__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.fw-wallet-picker__dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  flex: 0 0 auto;
}

.fw-wallet-picker__dot--ready {
  background: rgb(26, 224, 58);
  box-shadow: 0 0 10px rgba(26, 224, 58, 0.66);
}

.fw-wallet-picker__dot--not-ready {
  background: rgb(255, 48, 73);
  box-shadow: 0 0 10px rgba(255, 48, 73, 0.58);
}

.fw-wallet-picker__status-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgb(242, 242, 242);
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .fw-wallet-picker {
    width: min(96vw, 390px);
    padding: 12px;
    border-radius: 12px;
  }

  .fw-wallet-picker__item {
    padding: 10px 11px;
  }

  .fw-wallet-picker__name {
    font-size: 12px;
  }
}
```

---

## FILE: src/ui/walletPicker.js

```js
import './walletPicker.css';

import tronlinkIcon from '../assets/tronlink.svg';
import okxIcon from '../assets/okx.svg';
import binanceIcon from '../assets/binance.svg';
import trustIcon from '../assets/trust.svg';
import bitgetIcon from '../assets/bitget.svg';
import tokenpocketIcon from '../assets/tokenpocket.svg';
import metamaskIcon from '../assets/metamask.svg';
import imtokenIcon from '../assets/imtoken.svg';
import foxwalletIcon from '../assets/foxwallet.svg';
import walletconnectIcon from '../assets/walletconnect.svg';

const WALLET_META = [
  { id: 'TronLink', name: 'TronLink', icon: tronlinkIcon },
  { id: 'OKX Wallet', name: 'OKX Wallet', icon: okxIcon },
  { id: 'Binance Wallet', name: 'Binance Wallet', icon: binanceIcon },
  { id: 'Trust', name: 'Trust Wallet', icon: trustIcon },
  { id: 'Bitget Wallet', name: 'Bitget Wallet', icon: bitgetIcon },
  { id: 'TokenPocket', name: 'TokenPocket', icon: tokenpocketIcon },
  { id: 'MetaMask', name: 'MetaMask', icon: metamaskIcon },
  { id: 'imToken', name: 'imToken', icon: imtokenIcon },
  { id: 'FoxWallet', name: 'FoxWallet', icon: foxwalletIcon },
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
```

---

## FILE: src/widgets/ambassadorRegister/ambassadorRegister.css

```css
:root {
  --fourteen-amb-bg: rgba(17, 17, 17, 0.92);
  --fourteen-amb-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-amb-border: rgba(255, 255, 255, 0.08);
  --fourteen-amb-text: rgba(255, 255, 255, 0.94);
  --fourteen-amb-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-amb-text-faint: rgba(255, 255, 255, 0.48);
  --fourteen-amb-accent: rgb(255, 105, 0);
  --fourteen-amb-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-amb-green: rgb(26, 224, 58);
  --fourteen-amb-red: rgb(255, 48, 73);
  --fourteen-amb-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-amb-radius: 16px;
  --fourteen-amb-radius-sm: 12px;
}

.fourteen-ambassador-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-amb-text);
}

.fourteen-ambassador-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HERO / HEADER
------------------------------------------------------- */

.fourteen-ambassador-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-ambassador-hero__bg {
  position: absolute;
  left: -14px;
  top: -18px;
  width: 60px;
  height: 60px;
  background-image: url('../../assets/text_bg.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.fourteen-ambassador-hero__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-ambassador-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-ambassador-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-ambassador-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.fourteen-ambassador-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

.fourteen-ambassador-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-amb-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.fourteen-ambassador-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
}

.fourteen-ambassador-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-amb-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.fourteen-ambassador-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-ambassador-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-amb-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-ambassador-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-amb-text);
}

.fourteen-ambassador-popover__text {
  font-size: 12px;
  line-height: 1.55;
  color: var(--fourteen-amb-text-soft);
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-ambassador-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-ambassador-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-amb-text-soft);
}

.fourteen-ambassador-connect-slot {
  margin-bottom: 16px;
}

.fourteen-ambassador-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-ambassador-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-ambassador-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-ambassador-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-amb-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-amb-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   FORM
------------------------------------------------------- */

.fourteen-ambassador-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fourteen-ambassador-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fourteen-ambassador-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fourteen-amb-text-soft);
}

.fourteen-ambassador-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.fourteen-ambassador-input {
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid var(--fourteen-amb-border);
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  color: var(--fourteen-amb-text);
  font-size: 18px;
  font-weight: 800;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fourteen-ambassador-input::placeholder {
  color: var(--fourteen-amb-text-faint);
}

.fourteen-ambassador-input:focus {
  border-color: rgba(255, 105, 0, 0.58);
  box-shadow: 0 0 0 4px rgba(255, 105, 0, 0.08);
}

.fourteen-ambassador-button {
  width: 100%;
  min-height: 52px;
  padding: 0 18px;
  border: 1px solid rgba(255, 105, 0, 0.34);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
}

.fourteen-ambassador-button:hover:not(:disabled):not([aria-disabled="true"]) {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(255, 105, 0, 0.28);
}

.fourteen-ambassador-button:active {
  transform: translateY(0);
}

.fourteen-ambassador-button:disabled,
.fourteen-ambassador-button[aria-disabled="true"] {
  opacity: 0.52;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  filter: grayscale(0.12);
}

/* -------------------------------------------------------
   SUMMARY / STATUS
------------------------------------------------------- */

.fourteen-ambassador-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.fourteen-ambassador-summary-card {
  border: 1px solid var(--fourteen-amb-border);
  border-radius: 14px;
  padding: 12px 14px;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
}

.fourteen-ambassador-summary-label {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--fourteen-amb-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fourteen-ambassador-summary-value {
  font-size: 14px;
  font-weight: 800;
  color: var(--fourteen-amb-text);
  line-height: 1.4;
  word-break: break-word;
}

.fourteen-ambassador-status {
  margin-top: 12px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  line-height: 1.45;
  color: var(--fourteen-amb-text-soft);
}

.fourteen-ambassador-status[data-state="error"] {
  color: #ffd4db;
}

.fourteen-ambassador-status[data-state="success"] {
  color: rgba(170, 255, 189, 0.95);
}

.fourteen-ambassador-link {
  color: var(--fourteen-amb-accent);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.18s ease;
}

.fourteen-ambassador-link:hover {
  color: #ffffff;
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 860px) {
  .fourteen-ambassador-hero__title {
    font-size: 36px;
  }

  .fourteen-ambassador-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 640px) {
  .fourteen-ambassador-summary {
    grid-template-columns: 1fr;
  }

  .fourteen-ambassador-connect-slot__desktop {
    display: none;
  }

  .fourteen-ambassador-connect-slot__mobile {
    display: block;
  }
}

@media (max-width: 560px) {
  .fourteen-ambassador-hero {
    align-items: flex-start;
  }

  .fourteen-ambassador-hero__title {
    font-size: 32px;
  }

  .fourteen-ambassador-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-ambassador-hero__actions {
    gap: 8px;
  }

  .fourteen-ambassador-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-ambassador-popover {
    width: min(320px, 94vw);
  }

  .fourteen-ambassador-connect-slot {
    margin-bottom: 14px;
  }

  .fourteen-ambassador-connect-slot__mobile {
    padding: 11px 12px;
    font-size: 11px;
  }

  .fourteen-ambassador-input {
    min-height: 48px;
    font-size: 16px;
    padding: 0 14px;
  }

  .fourteen-ambassador-button {
    min-height: 48px;
    font-size: 11px;
  }
}
```

---

## FILE: src/widgets/ambassadorRegister/index.js

```js
import './ambassadorRegister.css';
import { keccak_256 } from '@noble/hashes/sha3';
import { utf8ToBytes } from '@noble/hashes/utils';
import { mountWalletButton } from '../../ui/walletButton.js';
import {
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
} from '../../ui/noticeCenter.js';

const ACTIVE_INSTANCES = new WeakMap();
const DEFAULT_CONTROLLER_CONTRACT = 'TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ';
const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
const SLUG_MAX_LENGTH = 24;

const DEFAULT_CONFIG = {
  backendBaseUrl: 'https://fourteen-allocation-worker-6e0e920395d8.herokuapp.com',
  controllerContractAddress: DEFAULT_CONTROLLER_CONTRACT,
  title: 'Become a 4TEEN Ambassador',
  subtitle: 'Ambassador Registration',
  description: 'Reserve your referral slug and create your ambassador link.',
  connectText: 'Connect Wallet',
  mobileConnectHint: 'Tap connect below to continue.',
  defaultSlug: ''
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleep(ms) {
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

function assertNonEmpty(value, fieldName) {
  const normalized = String(value || '').trim();

  if (!normalized) {
    throw new Error(`${fieldName} is required`);
  }

  return normalized;
}

function normalizeBaseUrl(value) {
  return assertNonEmpty(value, 'backendBaseUrl').replace(/\/+$/, '');
}

function normalizeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, SLUG_MAX_LENGTH);
}

function generateRandomSlug() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let suffix = '';

  for (let i = 0; i < 6; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `amb-${suffix}`;
}

function resolveInitialSlug(config) {
  const normalized = normalizeSlug(config.defaultSlug);

  if (normalized) {
    return normalized;
  }

  return generateRandomSlug();
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

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function keccakUtf8ToHex(value) {
  const bytes = utf8ToBytes(String(value || ''));
  return `0x${bytesToHex(keccak_256(bytes))}`;
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

async function readJson(response) {
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

async function checkSlugAvailability(backendBaseUrl, slug) {
  const response = await fetch(
    `${normalizeBaseUrl(backendBaseUrl)}/slug/check?slug=${encodeURIComponent(slug)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const payload = await readJson(response);

  if (!response.ok || !payload || !payload.ok) {
    throw new Error((payload && payload.error) || 'Failed to check slug');
  }

  if (!payload.available) {
    throw new Error('Slug is already taken');
  }

  return payload;
}

async function completeRegistration(backendBaseUrl, payload) {
  const response = await fetch(
    `${normalizeBaseUrl(backendBaseUrl)}/ambassador/register-complete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  const result = await readJson(response);

  if (!response.ok || !result || !result.ok) {
    throw new Error((result && result.error) || 'Failed to complete registration');
  }

  return result.result;
}

function buildReferralLink(value) {
  const normalized = assertNonEmpty(value, 'referralLink');

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  if (normalized.startsWith('?')) {
    return `${window.location.origin}/${normalized}`;
  }

  if (normalized.startsWith('/')) {
    return `${window.location.origin}${normalized}`;
  }

  return `${window.location.origin}/${normalized}`;
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

  if (text.includes('Slug is already taken')) {
    return 'Slug is already taken.';
  }

  if (text.includes('wallet is not connected') || text.includes('Wallet is not connected')) {
    return 'Wallet is not connected.';
  }

  if (text.includes('Slug is required')) {
    return 'Slug is required.';
  }

  if (text.includes('contract validate error')) {
    return text;
  }

  return text;
}

function buildContractAbi() {
  return [
    {
      constant: false,
      inputs: [
        { name: 'slugHash', type: 'bytes32' },
        { name: 'metaHash', type: 'bytes32' }
      ],
      name: 'registerAsAmbassador',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];
}

function createMarkup(config, state, isConnected) {
  const statusState = state.error
    ? 'error'
    : state.success
      ? 'success'
      : 'default';

  return `
    <div class="fourteen-ambassador-widget">
      <div class="fourteen-ambassador-shell">
        <div class="fourteen-ambassador-hero">
          <div class="fourteen-ambassador-hero__bg"></div>

          <div class="fourteen-ambassador-hero__text">
            <h2 class="fourteen-ambassador-hero__title">
              Become a <span>4TEEN</span> Ambassador
            </h2>
            <div class="fourteen-ambassador-hero__subtitle">
              ${escapeHtml(config.subtitle)}
            </div>
          </div>

          <div class="fourteen-ambassador-hero__actions">
            <div class="fourteen-ambassador-badge">Slug Link</div>

            <div class="fourteen-ambassador-info-toggle-wrap">
              <button
                type="button"
                class="fourteen-ambassador-info-toggle"
                aria-label="Show registration info"
                aria-expanded="false"
              >
                i
              </button>

              <div class="fourteen-ambassador-popover" hidden>
                <div class="fourteen-ambassador-popover__title">Registration Info</div>
                <div class="fourteen-ambassador-popover__text">
                  Choose your public ambassador slug - this will be your referral handle and it can be changed later. Registration is a real blockchain action, so your wallet may spend a small amount of TRX on bandwidth and energy if free resources are not available. Core registration data is written on-chain, while the service layer is stored separately in a protected two-layer database system for secure verification, matching, and recovery. This is a live registration step, not a demo.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-ambassador-topbar">
          <div class="fourteen-ambassador-wallet" data-role="wallet-label">Wallet not connected</div>
        </div>

        <div class="fourteen-ambassador-connect-slot">
          <div class="fourteen-ambassador-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-ambassador-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(config.mobileConnectHint)}
          </div>
        </div>

        <div class="fourteen-ambassador-form">
          <label class="fourteen-ambassador-field">
            <span class="fourteen-ambassador-label">Referral slug</span>
            <span class="fourteen-ambassador-input-wrap">
              <input
                id="fourteen-ambassador-slug"
                class="fourteen-ambassador-input"
                type="text"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                maxlength="${SLUG_MAX_LENGTH}"
                placeholder="amb-abc123"
                value="${escapeHtml(state.slug)}"
              />
            </span>
          </label>

          <button
            type="button"
            class="fourteen-ambassador-button"
            id="fourteen-ambassador-submit"
            ${state.loading || !isConnected ? 'disabled aria-disabled="true"' : ''}
          >
            ${state.loading ? 'Registering...' : 'Register Ambassador'}
          </button>
        </div>

        <div class="fourteen-ambassador-status" data-state="${statusState}" role="status" aria-live="polite">
          ${
            state.error
              ? escapeHtml(state.error)
              : state.success
                ? 'Registration completed successfully.'
                : !isConnected
                  ? 'Connect your wallet to activate registration.'
                  : ''
          }
        </div>

        ${
          state.success
            ? `
              <div class="fourteen-ambassador-summary">
                <div class="fourteen-ambassador-summary-card">
                  <div class="fourteen-ambassador-summary-label">Slug</div>
                  <div class="fourteen-ambassador-summary-value">${escapeHtml(state.success.slug)}</div>
                </div>

                <div class="fourteen-ambassador-summary-card">
                  <div class="fourteen-ambassador-summary-label">Tx</div>
                  <div class="fourteen-ambassador-summary-value">${escapeHtml(state.success.txid)}</div>
                </div>

                <div class="fourteen-ambassador-summary-card" style="grid-column: 1 / -1;">
                  <div class="fourteen-ambassador-summary-label">Referral link</div>
                  <div class="fourteen-ambassador-summary-value">
                    <a
                      class="fourteen-ambassador-link"
                      href="${escapeHtml(state.success.referralLink)}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${escapeHtml(state.success.referralLink)}
                    </a>
                  </div>
                </div>
              </div>
            `
            : ''
        }
      </div>
    </div>
  `;
}

export function mountAmbassadorRegister(target, config = {}) {
  if (!target) {
    throw new Error('mountAmbassadorRegister: target is required');
  }

  const wallet = getWalletSafe();

  if (!wallet) {
    throw new Error('Fourteen wallet instance is not loaded');
  }

  if (ACTIVE_INSTANCES.has(target)) {
    try {
      ACTIVE_INSTANCES.get(target).destroy();
    } catch (error) {
      console.error('Failed to destroy previous ambassador register instance:', error);
    }
  }

  const resolvedConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };

  const state = {
    slug: resolveInitialSlug(resolvedConfig),
    loading: false,
    error: '',
    success: null
  };

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;

  const root = target;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function closePopover() {
    const popoverEl = root.querySelector('.fourteen-ambassador-popover');
    const infoToggleEl = root.querySelector('.fourteen-ambassador-info-toggle');

    if (!popoverEl || !infoToggleEl) return;

    popoverEl.hidden = true;
    infoToggleEl.setAttribute('aria-expanded', 'false');
  }

  function togglePopover(event) {
    event?.stopPropagation?.();

    const popoverEl = root.querySelector('.fourteen-ambassador-popover');
    const infoToggleEl = root.querySelector('.fourteen-ambassador-info-toggle');

    if (!popoverEl || !infoToggleEl) return;

    const nextHidden = !popoverEl.hidden;
    popoverEl.hidden = nextHidden;
    infoToggleEl.setAttribute('aria-expanded', nextHidden ? 'false' : 'true');
  }

  function updateWalletLabel() {
    const walletLabelEl = root.querySelector('[data-role="wallet-label"]');
    const address = getWalletAddressSafe(wallet);

    if (!walletLabelEl) return;

    if (!isConnectedSafe(wallet) || !address) {
      walletLabelEl.textContent = 'Wallet not connected';
      return;
    }

    walletLabelEl.textContent = `Wallet ${shortenAddress(address)}`;
  }

  function unmountEmbeddedWalletButton() {
    try {
      embeddedWalletUnmount?.();
    } catch (_) {}

    embeddedWalletUnmount = null;

    const embeddedWalletButtonEl = root.querySelector('[data-role="embedded-wallet-button"]');

    if (embeddedWalletButtonEl) {
      embeddedWalletButtonEl.innerHTML = '';
    }
  }

  function syncEmbeddedWalletUi() {
    const connected = isConnectedSafe(wallet);
    const mobile = isMobileViewport();
    const embeddedWalletButtonEl = root.querySelector('[data-role="embedded-wallet-button"]');
    const mobileConnectHintEl = root.querySelector('[data-role="mobile-connect-hint"]');

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

    if (!embeddedWalletButtonEl) {
      return;
    }

    if (embeddedWalletUnmount) {
      return;
    }

    embeddedWalletUnmount = mountWalletButton(embeddedWalletButtonEl, {
      variant: 'compact',
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await wait(450);

          if (typeof wallet.refreshBalances === 'function') {
            await wallet.refreshBalances();
          }

          await refreshUi();
        }
      },
      onRefresh: async () => {
        if (typeof wallet.refreshBalances === 'function') {
          await wallet.refreshBalances();
        }
        await refreshUi();
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
        await refreshUi();
      }
    });
  }

  async function runRegistration() {
    const tronWeb = getActiveTronWeb(wallet);
    const walletAddress = getWalletAddressSafe(wallet);

    if (!tronWeb || !walletAddress) {
      throw new Error('Wallet is not connected');
    }

    const slug = normalizeSlug(state.slug);

    if (!slug) {
      throw new Error('Slug is required');
    }

    state.loading = true;
    state.error = '';
    state.success = null;
    render();

    try {
      await checkSlugAvailability(resolvedConfig.backendBaseUrl, slug);

      const slugHash = keccakUtf8ToHex(slug);
      const metaHash = ZERO_BYTES32;

      const contract = await tronWeb.contract(
        buildContractAbi(),
        resolvedConfig.controllerContractAddress
      );

      const txid = await contract.registerAsAmbassador(slugHash, metaHash).send();

      const completed = await completeRegistration(resolvedConfig.backendBaseUrl, {
        slug,
        slugHash,
        wallet: walletAddress
      });

      state.success = {
        slug,
        txid: assertNonEmpty(txid, 'txid'),
        referralLink: buildReferralLink(completed.referralLink)
      };

      showSuccessNotice('Ambassador registration completed.', 10000);
      await sleep(250);
    } catch (error) {
      const message = normalizeError(error);
      state.error = message;
      showErrorNotice(message, 10000);
      throw error;
    } finally {
      state.loading = false;
      render();
    }
  }

  async function handleSubmit() {
    try {
      if (!isConnectedSafe(wallet)) {
        return;
      }

      await runRegistration();
    } catch (error) {
      console.error('Ambassador registration flow failed:', error);
    }
  }

  function handleOutsideClick(event) {
    const widgetEl = root.querySelector('.fourteen-ambassador-widget');

    if (!widgetEl?.contains(event.target)) {
      closePopover();
    }
  }

  function handleResize() {
    if (!isAlive()) return;
    unmountEmbeddedWalletButton();
    syncEmbeddedWalletUi();
  }

  function bindEvents() {
    const slugInput = root.querySelector('#fourteen-ambassador-slug');
    const submitButton = root.querySelector('#fourteen-ambassador-submit');
    const infoToggleEl = root.querySelector('.fourteen-ambassador-info-toggle');

    slugInput?.addEventListener('input', () => {
      const normalized = normalizeSlug(slugInput.value);
      state.slug = normalized;
      slugInput.value = normalized;
    });

    submitButton?.addEventListener('click', handleSubmit);
    infoToggleEl?.addEventListener('click', togglePopover);
  }

  async function refreshUi() {
    if (!isAlive()) {
      return;
    }

    render();
  }

  function render() {
    unmountEmbeddedWalletButton();
    root.innerHTML = createMarkup(resolvedConfig, state, isConnectedSafe(wallet));
    updateWalletLabel();
    syncEmbeddedWalletUi();
    bindEvents();
  }

  document.addEventListener('click', handleOutsideClick);

  if (typeof wallet.subscribe === 'function') {
    walletUnsubscribe = wallet.subscribe(() => {
      refreshUi().catch((error) => {
        console.error('Ambassador widget wallet refresh failed:', error);
      });
    });
  }

  if (typeof window !== 'undefined' && !resizeListenerBound) {
    window.addEventListener('resize', handleResize);
    resizeListenerBound = true;
  }

  const instance = {
    destroy() {
      isDestroyed = true;
      unmountEmbeddedWalletButton();
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

  render();

  return instance;
}
```

---

## FILE: src/widgets/directBuy/directBuy.css

```css
:root {
  --fourteen-buy-bg: rgba(17, 17, 17, 0.92);
  --fourteen-buy-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-buy-border: rgba(255, 255, 255, 0.08);
  --fourteen-buy-text: rgba(255, 255, 255, 0.94);
  --fourteen-buy-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-buy-text-faint: rgba(255, 255, 255, 0.48);
  --fourteen-buy-accent: rgb(255, 105, 0);
  --fourteen-buy-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-buy-green: rgb(26, 224, 58);
  --fourteen-buy-red: rgb(255, 48, 73);
  --fourteen-buy-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-buy-radius: 16px;
  --fourteen-buy-radius-sm: 12px;
}

.fourteen-buy-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-buy-text);
}

.fourteen-buy-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HERO / HEADER
------------------------------------------------------- */

.fourteen-buy-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-buy-hero__bg {
  position: absolute;
  left: -14px;
  top: -18px;
  width: 60px;
  height: 60px;
  background-image: url('../../assets/text_bg.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.fourteen-buy-hero__text,
.fourteen-buy-heading__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-buy-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-buy-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-buy-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.fourteen-buy-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

/* legacy compact heading support */
.fourteen-buy-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.fourteen-buy-title {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--fourteen-buy-text);
}

.fourteen-buy-subtitle {
  font-size: 12px;
  line-height: 1.4;
  color: var(--fourteen-buy-text-soft);
}

.fourteen-buy-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-buy-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.fourteen-buy-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
}

.fourteen-buy-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-buy-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.fourteen-buy-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-buy-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-buy-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-buy-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-buy-text);
}

.fourteen-buy-popover__item {
  display: grid;
  grid-template-columns: 94px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

.fourteen-buy-popover__item + .fourteen-buy-popover__item {
  margin-top: 10px;
}

.fourteen-buy-popover__label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--fourteen-buy-text-faint);
}

.fourteen-buy-popover__value {
  font-size: 12px;
  line-height: 1.45;
  color: var(--fourteen-buy-text-soft);
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-buy-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-buy-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-buy-text-soft);
}

.fourteen-buy-connect-slot {
  margin-bottom: 16px;
}

.fourteen-buy-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-buy-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-buy-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-buy-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-buy-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-buy-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   FORM
------------------------------------------------------- */

.fourteen-buy-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fourteen-buy-input-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fourteen-buy-text-soft);
}

.fourteen-buy-form-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: stretch;
}

.fourteen-buy-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.fourteen-buy-input {
  width: 100%;
  min-height: 52px;
  padding: 0 64px 0 16px;
  border-radius: 16px;
  border: 1px solid var(--fourteen-buy-border);
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.98) 0%, rgba(18, 18, 18, 0.98) 100%);
  color: var(--fourteen-buy-text);
  font-size: 18px;
  font-weight: 800;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fourteen-buy-input::placeholder {
  color: var(--fourteen-buy-text-faint);
}

.fourteen-buy-input:focus {
  border-color: rgba(255, 105, 0, 0.58);
  box-shadow: 0 0 0 4px rgba(255, 105, 0, 0.08);
}

.fourteen-buy-input-suffix {
  position: absolute;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--fourteen-buy-text-faint);
  pointer-events: none;
}

.fourteen-buy-button {
  min-width: 118px;
  min-height: 52px;
  padding: 0 18px;
  border: 1px solid rgba(255, 105, 0, 0.34);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255, 145, 52, 1) 0%, rgba(255, 105, 0, 0.96) 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
}

.fourteen-buy-button:hover:not(:disabled):not([aria-disabled="true"]) {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(255, 105, 0, 0.28);
}

.fourteen-buy-button:active {
  transform: translateY(0);
}

.fourteen-buy-button:disabled,
.fourteen-buy-button[aria-disabled="true"] {
  opacity: 0.52;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  filter: grayscale(0.12);
}

/* -------------------------------------------------------
   META / STATUS
------------------------------------------------------- */

.fourteen-buy-estimate {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
  min-height: 20px;
}

.fourteen-buy-estimate__label {
  font-size: 11px;
  font-weight: 600;
  color: var(--fourteen-buy-text-faint);
}

.fourteen-buy-estimate__value {
  font-size: 15px;
  font-weight: 800;
  color: var(--fourteen-buy-text);
}

.fourteen-buy-estimate__token {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-buy-text-soft);
}

.fourteen-buy-status {
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  line-height: 1.45;
  color: var(--fourteen-buy-text-soft);
}

.fourteen-buy-status[data-state="error"] {
  color: #ffd4db;
}

.fourteen-buy-status[data-state="success"] {
  color: rgba(170, 255, 189, 0.95);
}

.fourteen-buy-status__link {
  color: var(--fourteen-buy-accent);
  text-decoration: underline;
  font-weight: 700;
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 860px) {
  .fourteen-buy-form-row {
    grid-template-columns: 1fr;
  }

  .fourteen-buy-button {
    width: 100%;
  }

  .fourteen-buy-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 640px) {
  .fourteen-buy-connect-slot__desktop {
    display: none;
  }

  .fourteen-buy-connect-slot__mobile {
    display: block;
  }
}

@media (max-width: 560px) {
  .fourteen-buy-hero {
    align-items: flex-start;
  }

  .fourteen-buy-heading {
    align-items: center;
  }

  .fourteen-buy-title {
    font-size: 16px;
  }

  .fourteen-buy-subtitle {
    font-size: 11px;
  }

  .fourteen-buy-input {
    min-height: 48px;
    padding: 0 58px 0 14px;
    font-size: 16px;
  }

  .fourteen-buy-button {
    min-height: 48px;
    font-size: 11px;
  }

  .fourteen-buy-popover {
    width: min(320px, 94vw);
  }

  .fourteen-buy-popover__item {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .fourteen-buy-hero__title {
    font-size: 34px;
  }

  .fourteen-buy-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-buy-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-buy-topbar {
    margin-bottom: 10px;
  }

  .fourteen-buy-connect-slot {
    margin-bottom: 14px;
  }
}
```

---

## FILE: src/widgets/directBuy/index.js

```js
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
  mobileConnectHint: 'Tap connect below to continue.',
  afterBuy: null
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

function isFunction(value) {
  return typeof value === 'function';
}

export function mountDirectBuy(target, config = {}) {
  const {
    contractAddress,
    inputLabel,
    buttonBuyText,
    subtitle,
    connectText,
    mobileConnectHint,
    afterBuy
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
          <div class="fourteen-buy-wallet" data-role="wallet-label">Wallet not connected</div>
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

  async function runAfterBuyHook(txHash, buyerWallet) {
    if (!isFunction(afterBuy)) {
      return null;
    }

    return afterBuy({
      txHash,
      buyerWallet
    });
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

      if (!txid) {
        throw new Error('Transaction sent but txid was not returned');
      }

      showSuccessNotice('Transaction sent successfully.', 10000);
      setStatus('Transaction sent successfully.', false, txid);

      try {
        await runAfterBuyHook(txid, address);
      } catch (afterBuyError) {
        console.error('Direct buy post-purchase hook failed:', afterBuyError);
        showNeutralNotice('Purchase succeeded, but post-purchase attribution is pending.', 10000);
      }

      inputEl.value = '';
      syncEstimate();

      await sleep(400);

      return {
        txid,
        buyerWallet: address
      };
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
```

---

## FILE: src/widgets/liquidityController/index.js

```js
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

• Liquidity Executed — confirmed liquidity distribution  
• TRX Received — incoming TRX from token sales  

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

const EVENTS_LIMIT = 10;

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

  async function fetchEvents(eventName, limit = EVENTS_LIMIT) {
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
    return Array.isArray(json?.data) ? json.data.slice(0, limit) : [];
  }

  async function loadExecuteEvents() {
    try {
      const data = await fetchEvents('LiquidityExecuted', EVENTS_LIMIT);

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
      const data = await fetchEvents('TRXReceived', EVENTS_LIMIT);

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
```

---

## FILE: src/widgets/liquidityController/liquidityController.css

```css
:root {
  --fourteen-liquidity-bg: rgba(17, 17, 17, 0.92);
  --fourteen-liquidity-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-liquidity-border: rgba(255, 255, 255, 0.08);
  --fourteen-liquidity-text: rgba(255, 255, 255, 0.94);
  --fourteen-liquidity-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-liquidity-text-faint: rgba(255, 255, 255, 0.48);
  --fourteen-liquidity-accent: rgb(255, 105, 0);
  --fourteen-liquidity-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-liquidity-green: rgb(26, 224, 58);
  --fourteen-liquidity-red: rgb(255, 48, 73);
  --fourteen-liquidity-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-liquidity-radius: 16px;
  --fourteen-liquidity-radius-sm: 12px;
}

.fourteen-liquidity-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-liquidity-text);
}

.fourteen-liquidity-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HERO / HEADER
------------------------------------------------------- */

.fourteen-liquidity-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-liquidity-hero__bg {
  position: absolute;
  left: -14px;
  top: -18px;
  width: 60px;
  height: 60px;
  background-image: url('../../assets/text_bg.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.fourteen-liquidity-hero__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-liquidity-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-liquidity-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-liquidity-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.fourteen-liquidity-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

.fourteen-liquidity-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-liquidity-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.fourteen-liquidity-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
}

.fourteen-liquidity-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-liquidity-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.fourteen-liquidity-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-liquidity-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-liquidity-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-liquidity-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-liquidity-text);
}

.fourteen-liquidity-popover__text {
  font-size: 12px;
  line-height: 1.55;
  color: var(--fourteen-liquidity-text-soft);
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-liquidity-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-liquidity-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-liquidity-text-soft);
}

.fourteen-liquidity-connect-slot {
  margin-bottom: 16px;
}

.fourteen-liquidity-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-liquidity-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-liquidity-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-liquidity-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-liquidity-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-liquidity-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   SUMMARY / DETAILS
------------------------------------------------------- */

.fourteen-liquidity-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.fourteen-liquidity-summary-card {
  border: 1px solid var(--fourteen-liquidity-border);
  border-radius: 14px;
  padding: 12px 14px;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  box-shadow: none;
}

.fourteen-liquidity-summary-label {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--fourteen-liquidity-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fourteen-liquidity-summary-value {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.4;
  color: var(--fourteen-liquidity-text);
  word-break: break-word;
}

.fourteen-liquidity-details {
  margin-bottom: 16px;
}

.fourteen-liquidity-note {
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-liquidity-border);
  background: rgba(255, 255, 255, 0.03);
  font-size: 13px;
  line-height: 1.55;
  color: var(--fourteen-liquidity-text-soft);
}

.fourteen-liquidity-note strong {
  color: var(--fourteen-liquidity-text);
}

.fourteen-liquidity-action {
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid rgba(255, 105, 0, 0.34);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
}

.fourteen-liquidity-action:hover:not(:disabled):not([aria-disabled='true']) {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(255, 105, 0, 0.28);
}

.fourteen-liquidity-action:active {
  transform: translateY(0);
}

.fourteen-liquidity-action:disabled,
.fourteen-liquidity-action[aria-disabled='true'] {
  opacity: 0.52;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  filter: grayscale(0.12);
}

.fourteen-liquidity-status {
  margin-top: 10px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  line-height: 1.45;
  color: var(--fourteen-liquidity-text-soft);
}

.fourteen-liquidity-status[data-state='error'] {
  color: #ffd4db;
}

.fourteen-liquidity-status[data-state='success'] {
  color: rgba(170, 255, 189, 0.95);
}

/* -------------------------------------------------------
   SECTION / TABLE
------------------------------------------------------- */

.fourteen-liquidity-section {
  margin-top: 18px;
  overflow: hidden;
  border: 1px solid var(--fourteen-liquidity-border);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
}

.fourteen-liquidity-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--fourteen-liquidity-border);
  background: rgba(255, 105, 0, 0.04);
}

.fourteen-liquidity-section-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--fourteen-liquidity-text);
}

.fourteen-liquidity-section-subtitle {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.45;
  color: var(--fourteen-liquidity-text-soft);
}

.fourteen-liquidity-section-link {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.24);
  background: rgba(255, 105, 0, 0.1);
  color: #ffffff;
  text-decoration: none;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.fourteen-liquidity-section-link:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.18);
}

.fourteen-liquidity-desktop-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.fourteen-liquidity-table {
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  font-size: 14px;
}

.fourteen-liquidity-table th,
.fourteen-liquidity-table td {
  padding: 12px 14px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--fourteen-liquidity-text);
}

.fourteen-liquidity-table th {
  background: rgba(255, 255, 255, 0.01);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--fourteen-liquidity-text-faint);
}

.fourteen-liquidity-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.01);
}

.fourteen-liquidity-table tbody tr:hover {
  background: rgba(255, 105, 0, 0.03);
}

/* -------------------------------------------------------
   MOBILE CARDS
------------------------------------------------------- */

.fourteen-liquidity-mobile-list {
  display: none;
  padding: 14px;
  gap: 12px;
}

.fourteen-liquidity-event-card {
  border: 1px solid var(--fourteen-liquidity-border);
  border-radius: 14px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
}

.fourteen-liquidity-event-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.fourteen-liquidity-event-title {
  font-size: 16px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--fourteen-liquidity-text);
  word-break: break-word;
}

.fourteen-liquidity-event-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 105, 0, 0.12);
  color: #ffb38f;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.fourteen-liquidity-event-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.fourteen-liquidity-event-item {
  min-width: 0;
}

.fourteen-liquidity-event-label {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--fourteen-liquidity-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fourteen-liquidity-event-value {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--fourteen-liquidity-text);
  word-break: break-word;
}

.fourteen-liquidity-link {
  color: var(--fourteen-liquidity-accent);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.18s ease;
}

.fourteen-liquidity-link:hover {
  color: #ffffff;
}

.fourteen-liquidity-empty,
.fourteen-liquidity-muted {
  padding: 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--fourteen-liquidity-text-soft);
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 860px) {
  .fourteen-liquidity-summary {
    grid-template-columns: 1fr;
  }

  .fourteen-liquidity-hero__title {
    font-size: 36px;
  }

  .fourteen-liquidity-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 640px) {
  .fourteen-liquidity-desktop-table-wrap {
    display: none;
  }

  .fourteen-liquidity-mobile-list {
    display: grid;
  }

  .fourteen-liquidity-topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-liquidity-section-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-liquidity-connect-slot__desktop {
    display: none;
  }

  .fourteen-liquidity-connect-slot__mobile {
    display: block;
  }
}

@media (max-width: 560px) {
  .fourteen-liquidity-hero {
    align-items: flex-start;
  }

  .fourteen-liquidity-hero__title {
    font-size: 32px;
  }

  .fourteen-liquidity-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-liquidity-hero__actions {
    gap: 8px;
  }

  .fourteen-liquidity-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-liquidity-popover {
    width: min(320px, 94vw);
  }

  .fourteen-liquidity-connect-slot {
    margin-bottom: 14px;
  }

  .fourteen-liquidity-connect-slot__mobile {
    padding: 11px 12px;
    font-size: 11px;
  }

  .fourteen-liquidity-action {
    min-height: 46px;
    font-size: 11px;
  }

  .fourteen-liquidity-section-head {
    padding: 13px 14px;
  }

  .fourteen-liquidity-mobile-list {
    padding: 12px;
    gap: 10px;
  }

  .fourteen-liquidity-event-card {
    padding: 13px;
  }
}
```

---

## FILE: src/widgets/mobileShell/index.js

```js
// src/widgets/mobileShell/index.js

import { createMobileShell } from '../../ui/mobileShell.js';

export function mountMobileShell(options = {}) {
  return createMobileShell(options);
}
```

---

## FILE: src/widgets/swap/constants.js

```js

```

---

## FILE: src/widgets/swap/index.js

```js
import { getSwapQuotes } from './services/quotes.js';
import { executeSwapFlow } from './services/swapExecution.js';
import './swap.css';
import { mountWalletButton } from '../../ui/walletButton.js';
import {
  showNeutralNotice,
  showSuccessNotice,
  showErrorNotice
} from '../../ui/noticeCenter.js';

import sunioLogo from '../../assets/sunio_swap.svg';
import justmoneyLogo from '../../assets/justmoney_swap.svg';
import trxLogo from '../../assets/trx_swap.svg';
import fourteenLogo from '../../assets/4teen_swap.svg';
import usdtLogo from '../../assets/usdt_swap.svg';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONFIG = {
  title: 'Swap 4TEEN to TRX/USDT',
  subtitle: 'Compare routes and swap 4TEEN efficiently',
  infoTitle: 'How route comparison works',
  infoText:
    'This widget compares available swap routes and ranks them from the highest possible output to the lowest. The estimate updates automatically as you type and changes depending on the token you select.\n\nEach route card shows the expected output, minimum received after slippage, route path, execution type, and provider source. As new routing providers are added, they will automatically be included, ranked, and displayed here.\n\nFor now, the module is prepared for a live routing backend and already uses the final visual structure that future on-chain integrations will plug into.',
  mobileConnectHint: 'Tap connect below to continue.',
  sourceLabel: 'SUN.io',
  tokenInSymbol: '4TEEN',
  tokenOutDefault: 'TRX',
  tokenOutOptions: ['TRX', 'USDT'],
  defaultSlippage: '3.00',
  slippageOptions: ['0.50', '1.00', '3.00'],
  estimateDecimals: 2,
  routeCount: 3,
  tokenAddresses: {
    '4TEEN': 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A',
    'TRX': 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
    'WTRX': 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    'USDT': 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  }
};

const TOKEN_META = {
  '4TEEN': {
    symbol: '4TEEN',
    logo: fourteenLogo
  },
  'TRX': {
    symbol: 'TRX',
    logo: trxLogo
  },
  'USDT': {
    symbol: 'USDT',
    logo: usdtLogo
  }
};

const PROVIDER_META = {
  sunio: {
    name: 'SUN.io',
    logo: sunioLogo
  },
  justmoney: {
    name: 'JustMoney',
    logo: justmoneyLogo
  }
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeNoticeMessage(value, fallback = 'Operation failed.') {
  if (typeof value === 'string') {
    const cleaned = value.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  if (typeof value?.message === 'string') {
    const cleaned = value.message.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  if (typeof value?.error === 'string') {
    const cleaned = value.error.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  if (typeof value?.data?.message === 'string') {
    const cleaned = value.data.message.replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== '[object Object]') {
      return cleaned;
    }
  }

  return fallback;
}

function getReadableErrorMessage(error, fallback = 'Operation failed.') {
  return normalizeNoticeMessage(error, fallback);
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

function isConnectedSafe(wallet) {
  const state = getWalletStateSafe(wallet);
  return !!state?.connected && !!state?.address;
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

function parsePositiveNumber(value) {
  const normalized = String(value ?? '').replace(',', '.').trim();
  const num = Number.parseFloat(normalized);

  if (!Number.isFinite(num) || num <= 0) {
    return 0;
  }

  return num;
}

function formatNumber(value, digits = 2) {
  const num = Number(value || 0);

  if (!Number.isFinite(num)) {
    return (0).toFixed(digits);
  }

  return num.toFixed(digits);
}

function getDisplayedReceive(route) {
  return Number(route?.expectedOut ?? route?.receive ?? 0);
}

function getDisplayedMinReceived(route, slippagePercent) {
  if (route?.minReceived != null) {
    return Number(route.minReceived || 0);
  }

  const receive = getDisplayedReceive(route);
  const safeSlippage = Number.parseFloat(slippagePercent || '0') || 0;

  return receive * (1 - safeSlippage / 100);
}

function createRoutePathHtml(route) {
  const fromMeta = TOKEN_META[route.fromToken] || TOKEN_META['4TEEN'];
  const toMeta = TOKEN_META[route.toToken] || TOKEN_META['TRX'];
  const viaParts = Array.isArray(route.via) ? route.via : [];

  return `
    <div class="fourteen-swap-route-card__path-line">
      <span class="fourteen-swap-route-card__path-token">
        <img class="fourteen-swap-route-card__token-logo" src="${fromMeta.logo}" alt="${escapeHtml(fromMeta.symbol)}" />
        <span class="fourteen-swap-route-card__token-symbol">${escapeHtml(fromMeta.symbol)}</span>
      </span>

      ${
        viaParts.length
          ? viaParts
              .map((via) => `<span class="fourteen-swap-route-card__path-via">${escapeHtml(via)}</span>`)
              .join('')
          : ''
      }

      <span class="fourteen-swap-route-card__path-token">
        <img class="fourteen-swap-route-card__token-logo" src="${toMeta.logo}" alt="${escapeHtml(toMeta.symbol)}" />
        <span class="fourteen-swap-route-card__token-symbol">${escapeHtml(toMeta.symbol)}</span>
      </span>
    </div>
  `;
}

export function mountSwap(target, config = {}) {
  const {
    title,
    subtitle,
    infoTitle,
    infoText,
    mobileConnectHint,
    sourceLabel,
    tokenInSymbol,
    tokenOutDefault,
    tokenOutOptions,
    defaultSlippage,
    slippageOptions,
    estimateDecimals,
    routeCount,
    tokenAddresses
  } = { ...DEFAULT_CONFIG, ...config };

  if (!target) {
    throw new Error('mountSwap: target is required');
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
    <div class="fourteen-swap-widget">
      <div class="fourteen-swap-shell">
        <div class="fourteen-swap-hero">
          <div class="fourteen-swap-hero__bg"></div>

          <div class="fourteen-swap-hero__text">
            <div class="fourteen-swap-hero__title">
              ${escapeHtml(title).replace('4TEEN', '<span>4TEEN</span>')}
            </div>
            <div class="fourteen-swap-hero__subtitle">${escapeHtml(subtitle)}</div>
          </div>

          <div class="fourteen-swap-hero__actions">
            <div class="fourteen-swap-badge">${escapeHtml(sourceLabel)}</div>

            <div class="fourteen-swap-info-toggle-wrap">
              <button
                class="fourteen-swap-info-toggle"
                type="button"
                aria-label="Swap info"
                data-role="swap-info-toggle"
              >
                i
              </button>

              <div class="fourteen-swap-popover" data-role="swap-popover" hidden>
                <div class="fourteen-swap-popover__title">${escapeHtml(infoTitle)}</div>
                <div class="fourteen-swap-popover__text">${escapeHtml(infoText).replaceAll('\n', '<br><br>')}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-swap-topbar">
          <div class="fourteen-swap-wallet" data-role="wallet-label">Wallet not connected</div>
        </div>

        <div class="fourteen-swap-connect-slot">
          <div class="fourteen-swap-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-swap-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(mobileConnectHint)}
          </div>
        </div>

        <div class="fourteen-swap-form">
          <div class="fourteen-swap-form__meta-row">
            <div class="fourteen-swap-form__meta-label">Amount tokens to swap</div>

            <div class="fourteen-swap-form__slippage-wrap">
              <label class="fourteen-swap-form__meta-label" for="fourteen-swap-slippage">Slippage</label>
              <select class="fourteen-swap-slippage" id="fourteen-swap-slippage" data-role="slippage-select">
                ${slippageOptions.map((item) => `
                  <option value="${escapeHtml(item)}" ${String(item) === String(defaultSlippage) ? 'selected' : ''}>
                    ${escapeHtml(item)}%
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="fourteen-swap-input-wrap">
            <input
              class="fourteen-swap-input"
              type="number"
              step="0.000001"
              min="0"
              inputmode="decimal"
              placeholder="0.00"
              data-role="amount-input"
            />
            <div class="fourteen-swap-input__suffix">
              <img class="fourteen-swap-input__token-logo" src="${fourteenLogo}" alt="4TEEN" />
              <span>${escapeHtml(tokenInSymbol)}</span>
            </div>
          </div>

          <div class="fourteen-swap-form__meta-row fourteen-swap-form__meta-row--estimate">
            <div class="fourteen-swap-form__meta-label">Estimate</div>

            <div class="fourteen-swap-target-switch" data-role="target-switch">
              ${tokenOutOptions.map((symbol) => {
                const meta = TOKEN_META[symbol];
                const active = symbol === tokenOutDefault;

                return `
                  <button
                    type="button"
                    class="fourteen-swap-target-switch__button ${active ? 'is-active' : ''}"
                    data-role="target-button"
                    data-token="${escapeHtml(symbol)}"
                    aria-pressed="${active ? 'true' : 'false'}"
                  >
                    <img class="fourteen-swap-target-switch__logo" src="${meta.logo}" alt="${escapeHtml(symbol)}" />
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="fourteen-swap-estimate-wrap">
            <div class="fourteen-swap-estimate">
              <div class="fourteen-swap-estimate__value" data-role="estimate-value">0.00</div>
              <div class="fourteen-swap-estimate__suffix">
                <img class="fourteen-swap-estimate__token-logo" src="${trxLogo}" alt="TRX" data-role="estimate-logo" />
                <span data-role="estimate-symbol">${escapeHtml(tokenOutDefault)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="fourteen-swap-routes-head">
          <div class="fourteen-swap-routes-head__title">Available Routes</div>
          <div class="fourteen-swap-routes-head__subtitle" data-role="routes-summary">0 routes found via ${escapeHtml(sourceLabel)}</div>
        </div>

        <div class="fourteen-swap-routes" data-role="routes-list"></div>

        <div class="fourteen-swap-status" data-role="status" role="status" aria-live="polite"></div>
      </div>
    </div>
  `;

  const walletInfoEl = target.querySelector('[data-role="wallet-label"]');
  const infoToggleEl = target.querySelector('[data-role="swap-info-toggle"]');
  const popoverEl = target.querySelector('[data-role="swap-popover"]');
  const embeddedWalletButtonEl = target.querySelector('[data-role="embedded-wallet-button"]');
  const mobileConnectHintEl = target.querySelector('[data-role="mobile-connect-hint"]');
  const amountInputEl = target.querySelector('[data-role="amount-input"]');
  const slippageSelectEl = target.querySelector('[data-role="slippage-select"]');
  const targetButtons = Array.from(target.querySelectorAll('[data-role="target-button"]'));
  const estimateValueEl = target.querySelector('[data-role="estimate-value"]');
  const estimateSymbolEl = target.querySelector('[data-role="estimate-symbol"]');
  const estimateLogoEl = target.querySelector('[data-role="estimate-logo"]');
  const routesSummaryEl = target.querySelector('[data-role="routes-summary"]');
  const routesListEl = target.querySelector('[data-role="routes-list"]');
  const statusEl = target.querySelector('[data-role="status"]');

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;
  let selectedTarget = tokenOutDefault;
  let currentRoutes = [];
  let isSwapPending = false;
  let quotesRequestId = 0;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function setStatus(message = '', isError = false) {
    if (!statusEl) return;
    statusEl.textContent = normalizeNoticeMessage(message, '');
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
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await wait(450);
          await refreshBalancesSafe();
        }
      },
      onRefresh: async () => {
        await refreshBalancesSafe();
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
      }
    });
  }

  function updateTargetButtons() {
    targetButtons.forEach((button) => {
      const token = button.getAttribute('data-token');
      const active = token === selectedTarget;

      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateSwapButtonsDisabledState() {
    const disabled = isSwapPending || !isConnectedSafe(wallet);

    Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
      button.disabled = disabled || button.dataset.executable === 'false';
      button.textContent = isSwapPending ? 'Processing...' : button.dataset.executable === 'false' ? 'Unavailable' : 'Swap';
    });
  }

  function resetSwapFormState() {
    if (amountInputEl) {
      amountInputEl.value = '';
    }

    currentRoutes = [];
    quotesRequestId += 1;
    renderEstimate();
    renderRoutes({ preserveStatus: true });
  }

  async function buildRoutes() {
    const amount = parsePositiveNumber(amountInputEl?.value);

    if (!amount || amount <= 0) {
      currentRoutes = [];
      return;
    }

    const requestId = ++quotesRequestId;

    const routes = await getSwapQuotes({
      amountIn: amount,
      targetToken: selectedTarget,
      fromTokenAddress: tokenAddresses['4TEEN'],
      tokenAddresses: {
        TRX: tokenAddresses['TRX'],
        WTRX: tokenAddresses['WTRX'],
        USDT: tokenAddresses['USDT']
      },
      inputDecimals: 6,
      outputDecimals: 6,
      routeCount
    });

    if (requestId !== quotesRequestId) {
      return;
    }

    currentRoutes = routes;
  }

  function renderEstimate() {
    const bestRoute = currentRoutes[0] || null;
    const toMeta = TOKEN_META[selectedTarget] || TOKEN_META['TRX'];

    estimateLogoEl.src = toMeta.logo;
    estimateLogoEl.alt = toMeta.symbol;
    estimateSymbolEl.textContent = toMeta.symbol;
    estimateValueEl.textContent = bestRoute
      ? formatNumber(getDisplayedReceive(bestRoute), estimateDecimals)
      : formatNumber(0, estimateDecimals);
  }

  function renderRoutes(options = {}) {
    const preserveStatus = Boolean(options.preserveStatus);
    const amount = parsePositiveNumber(amountInputEl?.value);
    const count = currentRoutes.length;
    routesSummaryEl.textContent = `${count} ${count === 1 ? 'route' : 'routes'} found via ${sourceLabel}`;

    if (!amount || amount <= 0) {
      routesListEl.innerHTML = `
        <div class="fourteen-swap-routes-empty">
          Enter an amount to preview available routes.
        </div>
      `;
      if (!preserveStatus) {
        setStatus('');
      }
      return;
    }

    if (!count) {
      routesListEl.innerHTML = `
        <div class="fourteen-swap-routes-empty">
          No routes available for this amount right now.
        </div>
      `;
      if (!preserveStatus) {
        setStatus('No routes available right now.', true);
      }
      return;
    }

    const currentSlippage = slippageSelectEl?.value || defaultSlippage;

    routesListEl.innerHTML = currentRoutes
      .map((route) => {
        const displayedReceive = getDisplayedReceive(route);
        const displayedMinReceived = getDisplayedMinReceived(route, currentSlippage);
        const executable = route?.isExecutable !== false;

        return `
          <div class="fourteen-swap-route-card ${executable ? '' : 'is-disabled-route'}">
            <div class="fourteen-swap-route-card__left">
              <div class="fourteen-swap-route-card__eyebrow">You receive</div>
              <div class="fourteen-swap-route-card__receive">
                ${escapeHtml(formatNumber(displayedReceive, estimateDecimals))} ${escapeHtml(route.toToken)}
              </div>

              <div class="fourteen-swap-route-card__min">
                Min received ${escapeHtml(formatNumber(displayedMinReceived, estimateDecimals))} ${escapeHtml(route.toToken)}
              </div>

              <button
                type="button"
                class="fourteen-swap-route-card__action"
                data-role="swap-route-button"
                data-route-id="${escapeHtml(route.id)}"
                data-executable="${executable ? 'true' : 'false'}"
                ${isConnectedSafe(wallet) && !isSwapPending && executable ? '' : 'disabled'}
              >
                ${isSwapPending ? 'Processing...' : executable ? 'Swap' : 'Unavailable'}
              </button>
            </div>

            <div class="fourteen-swap-route-card__divider" aria-hidden="true"></div>

            <div class="fourteen-swap-route-card__right">
              <div class="fourteen-swap-route-card__provider">
                <img class="fourteen-swap-route-card__provider-logo" src="${route.providerLogo}" alt="${escapeHtml(route.providerName)}" />
              </div>

              <div class="fourteen-swap-route-card__detail fourteen-swap-route-card__detail--path">
                <div class="fourteen-swap-route-card__label">Path</div>
                <div class="fourteen-swap-route-card__value">
                  ${createRoutePathHtml(route)}
                </div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Route</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.routeLabel || PROVIDER_META[route.provider]?.name || route.providerName)}</div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Execution</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.executionLabel ?? '—')}</div>
              </div>

              <div class="fourteen-swap-route-card__detail">
                <div class="fourteen-swap-route-card__label">Impact</div>
                <div class="fourteen-swap-route-card__value">${escapeHtml(route.impactLabel ?? '—')}</div>
              </div>

              ${
                executable
                  ? ''
                  : `
                    <div class="fourteen-swap-route-card__detail">
                      <div class="fourteen-swap-route-card__label">Status</div>
                      <div class="fourteen-swap-route-card__value">Quote available, execution not supported yet</div>
                    </div>
                  `
              }
            </div>
          </div>
        `;
      })
      .join('');

    Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
      button.addEventListener('click', handleRouteSwapClick);
    });

    updateSwapButtonsDisabledState();

    if (!preserveStatus) {
      const best = currentRoutes[0];
      if (best) {
        setStatus(
          `Best route: ${best.providerName} · ${formatNumber(
            getDisplayedReceive(best),
            estimateDecimals
          )} ${best.toToken}`
        );
      } else {
        setStatus('');
      }
    }
  }

  async function syncQuotes(options = {}) {
    const preserveStatus = Boolean(options.preserveStatus);
    await buildRoutes();
    renderEstimate();
    renderRoutes({ preserveStatus });
  }

  function handleAmountInput() {
    if (isSwapPending) return;

    syncQuotes().catch((error) => {
      console.error('[4TEEN] swap quotes failed', error);
      const message = getReadableErrorMessage(error, 'Failed to load routes.');
      setStatus(message, true);
      showErrorNotice(message);
    });
  }

  function handleSlippageChange() {
    if (isSwapPending) return;

    syncQuotes().catch((error) => {
      console.error('[4TEEN] swap slippage refresh failed', error);
      const message = getReadableErrorMessage(error, 'Failed to refresh routes.');
      setStatus(message, true);
      showErrorNotice(message);
    });
  }

  function handleTargetClick(event) {
    if (isSwapPending) return;

    const button = event.currentTarget;
    const token = button.getAttribute('data-token');

    if (!token || token === selectedTarget) {
      return;
    }

    selectedTarget = token;
    updateTargetButtons();

    syncQuotes().catch((error) => {
      console.error('[4TEEN] swap target refresh failed', error);
      const message = getReadableErrorMessage(error, 'Failed to refresh routes.');
      setStatus(message, true);
      showErrorNotice(message);
    });
  }

  function handleExecutionProgress(progress) {
    const step = progress?.step || '';
    const message = normalizeNoticeMessage(progress?.message, '');

    if (message) {
      setStatus(message, step === 'error');
    }

    if (
      step === 'validating' ||
      step === 'checking-allowance' ||
      step === 'approval-required' ||
      step === 'approval-submitted' ||
      step === 'approval-confirming' ||
      step === 'approval-confirmed' ||
      step === 'approval-ready' ||
      step === 'swap-submitting' ||
      step === 'swap-submitted' ||
      step === 'swap-confirming'
    ) {
      if (message) {
        showNeutralNotice(message, 2600);
      }
      return;
    }

    if (step === 'swap-confirmed' || step === 'success') {
      if (message) {
        showSuccessNotice(message, 4200);
      }
      return;
    }

    if (step === 'error') {
      showErrorNotice(message || 'Swap failed.', 4200);
    }
  }

  async function handleRouteSwapClick(event) {
    if (isSwapPending) {
      return;
    }

    const routeId = event.currentTarget?.getAttribute('data-route-id');
    const route = currentRoutes.find((item) => item.id === routeId);
    const amountIn = parsePositiveNumber(amountInputEl?.value);
    const slippage = slippageSelectEl?.value || defaultSlippage;

    if (!route) {
      const message = 'Route not found.';
      setStatus(message, true);
      showErrorNotice(message);
      return;
    }

    if (route?.isExecutable === false) {
      const message = 'This route is shown by the quote engine, but execution is not supported by the widget yet.';
      setStatus(message, true);
      showErrorNotice(message, 4200);
      return;
    }

    if (!isConnectedSafe(wallet)) {
      const message = 'Connect wallet first.';
      setStatus(message, true);
      showErrorNotice(message);
      return;
    }

    if (!amountIn || amountIn <= 0) {
      const message = 'Enter amount first.';
      setStatus(message, true);
      showErrorNotice(message);
      return;
    }

    isSwapPending = true;
    updateSwapButtonsDisabledState();

    const preparingMessage = `Preparing ${route.providerName} swap...`;
    setStatus(preparingMessage);
    showNeutralNotice(preparingMessage, 2200);

    try {
      const result = await executeSwapFlow({
        wallet,
        selectedRoute: route,
        amountIn,
        slippage,
        inputTokenAddress: tokenAddresses['4TEEN'],
        inputTokenDecimals: 6,
        outputTokenDecimals: 6,
        reportProgress: handleExecutionProgress
      });

      if (result?.ok) {
        const successMessage = normalizeNoticeMessage(
          result?.successMessage,
          route.toToken === 'TRX'
            ? 'Swap completed successfully. TRX received.'
            : `Swap completed successfully. ${route.toToken} received.`
        );

        setStatus(successMessage, false);
        showSuccessNotice(successMessage, 5200);

        await refreshBalancesSafe();
        resetSwapFormState();

        return;
      }

      const fallbackMessage = normalizeNoticeMessage(result?.message, 'Swap failed.');
      setStatus(fallbackMessage, true);
      showErrorNotice(fallbackMessage, 4200);
    } catch (error) {
      console.error('[4TEEN] swap execution failed', error);
      const message = getReadableErrorMessage(error, 'Swap execution failed.');
      setStatus(message, true);
      showErrorNotice(message, 4200);
    } finally {
      isSwapPending = false;
      updateSwapButtonsDisabledState();
      renderEstimate();
      renderRoutes({ preserveStatus: true });
    }
  }

  function handleWalletUpdate() {
    if (!isAlive()) return;

    syncEmbeddedWalletUi();
    updateWalletLabel();
    updateSwapButtonsDisabledState();
  }

  function handleResize() {
    if (!isAlive()) return;
    syncEmbeddedWalletUi();
  }

  infoToggleEl?.addEventListener('click', togglePopover);
  document.addEventListener('click', handleOutsideClick);
  amountInputEl?.addEventListener('input', handleAmountInput);
  slippageSelectEl?.addEventListener('change', handleSlippageChange);
  targetButtons.forEach((button) => {
    button.addEventListener('click', handleTargetClick);
  });

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

      infoToggleEl?.removeEventListener('click', togglePopover);
      document.removeEventListener('click', handleOutsideClick);
      amountInputEl?.removeEventListener('input', handleAmountInput);
      slippageSelectEl?.removeEventListener('change', handleSlippageChange);

      targetButtons.forEach((button) => {
        button.removeEventListener('click', handleTargetClick);
      });

      Array.from(routesListEl.querySelectorAll('[data-role="swap-route-button"]')).forEach((button) => {
        button.removeEventListener('click', handleRouteSwapClick);
      });

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

  updateTargetButtons();
  syncEmbeddedWalletUi();
  updateWalletLabel();

  syncQuotes().catch((error) => {
    console.error('[4TEEN] initial swap quotes failed', error);
    const message = getReadableErrorMessage(error, 'Failed to load routes.');
    setStatus(message, true);
    showErrorNotice(message);
  });

  return instance;
}
```

---

## FILE: src/widgets/swap/providers/justmoney.js

```js
export async function getJustmoneyQuotes() {
  return [];
}
```

---

## FILE: src/widgets/swap/providers/sunio.js

```js
import sunioLogo from '../../../assets/sunio_swap.svg';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

export const SUNIO_MAINNET_DEFAULTS = {
  smartRouterAddress: 'TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j',
  calculationServiceUrl: 'https://rot.endjgfsv.link/swap/routerUniversal',
  feeLimit: 500_000_000,
  deadlineSeconds: 60 * 20,
  defaultSlippageBps: 300,
  typeList: ''
};

export const SUNIO_TOKEN_ADDRESSES = {
  TRX: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  WTRX: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  USDT: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
};

const MAX_UINT256 = (2n ** 256n - 1n).toString();

const TRC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const SMART_ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'string[]', name: 'poolVersion', type: 'string[]' },
      { internalType: 'uint256[]', name: 'versionLen', type: 'uint256[]' },
      { internalType: 'uint24[]', name: 'fees', type: 'uint24[]' },
      {
        components: [
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' }
        ],
        internalType: 'struct ISmartExchangeRouter.SwapData',
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'swapExactInput',
    outputs: [{ internalType: 'uint256[]', name: 'amountsOut', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function'
  }
];

export function getSunioProviderMeta() {
  return {
    id: PROVIDER_ID,
    name: PROVIDER_NAME,
    logo: sunioLogo
  };
}

export function getSunioSpenderAddressForRoute() {
  return SUNIO_MAINNET_DEFAULTS.smartRouterAddress;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function parseSlippageBps(
  slippage,
  fallbackBps = SUNIO_MAINNET_DEFAULTS.defaultSlippageBps
) {
  const num = Number.parseFloat(slippage);

  if (!Number.isFinite(num) || num < 0) {
    return fallbackBps;
  }

  return Math.round(num * 100);
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

function getConnectedAddress(wallet) {
  const state = getWalletStateSafe(wallet);

  return (
    state?.address ||
    wallet?.getAddress?.() ||
    wallet?.getTronWeb?.()?.defaultAddress?.base58 ||
    null
  );
}

function isUsableAddress(address) {
  return typeof address === 'string' && address.length >= 20;
}

function isHexStrict(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]+$/.test(value);
}

function normalizeBigintLike(value) {
  if (typeof value === 'bigint') return value;

  if (typeof value === 'number') {
    return BigInt(Math.trunc(value));
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) return 0n;

    if (isHexStrict(trimmed)) {
      return BigInt(trimmed);
    }

    return BigInt(trimmed);
  }

  if (value && typeof value.toString === 'function') {
    return BigInt(value.toString());
  }

  return 0n;
}

function decimalToRaw(amount, decimals) {
  const safeDecimals = Math.max(0, Number(decimals || 0));
  const normalized = String(amount ?? '0').replace(',', '.').trim();

  if (!normalized) return 0n;

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error(`Invalid decimal amount: ${amount}`);
  }

  const [whole, fraction = ''] = normalized.split('.');
  const paddedFraction = (fraction + '0'.repeat(safeDecimals)).slice(0, safeDecimals);

  return (
    BigInt(whole || '0') * 10n ** BigInt(safeDecimals) +
    BigInt(paddedFraction || '0')
  );
}

function humanOutputToRaw(value, decimals) {
  return decimalToRaw(value, decimals);
}

function calcMinOutRawFromExpected(expectedOutRaw, slippageBps) {
  const safeExpected = normalizeBigintLike(expectedOutRaw);
  const safeBps = BigInt(Math.max(0, Number(slippageBps || 0)));

  return (safeExpected * (10000n - safeBps)) / 10000n;
}

async function getTokenDecimals(tronWeb, tokenAddress, fallback = 6) {
  try {
    const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
    const result = await contract.decimals().call();
    return Number(result?.toString?.() || result || fallback);
  } catch (_) {
    return fallback;
  }
}

function assertExecutableRoute(route) {
  if (!route) {
    throw new Error('SUN.io execution: route is required');
  }

  if (!Array.isArray(route.path) || route.path.length < 2) {
    throw new Error('SUN.io execution: route.path is required');
  }

  if (!Array.isArray(route.poolVersion) || !route.poolVersion.length) {
    throw new Error('SUN.io execution: route.poolVersion is required');
  }

  if (!Array.isArray(route.versionLen) || !route.versionLen.length) {
    throw new Error('SUN.io execution: route.versionLen is required');
  }

  if (!Array.isArray(route.fees) || !route.fees.length) {
    throw new Error('SUN.io execution: route.fees is required');
  }

  if (route.isExecutable === false) {
    throw new Error(
      'SUN.io execution: selected route is not supported by the current widget implementation'
    );
  }
}

function getTargetTokenParam(targetToken, tokenAddresses = {}) {
  if (targetToken === 'TRX') {
    return tokenAddresses.TRX || SUNIO_TOKEN_ADDRESSES.TRX;
  }

  if (targetToken === 'USDT') {
    return tokenAddresses.USDT || SUNIO_TOKEN_ADDRESSES.USDT;
  }

  return tokenAddresses[targetToken] || null;
}

function getOutputDecimalsByTarget(targetToken, explicitDecimals = null) {
  if (Number.isFinite(Number(explicitDecimals))) {
    return Number(explicitDecimals);
  }

  if (targetToken === 'TRX') return 6;
  if (targetToken === 'USDT') return 6;

  return 6;
}

function buildVersionLen(poolVersions = []) {
  if (!Array.isArray(poolVersions) || !poolVersions.length) {
    return [];
  }

  const result = [];
  let current = poolVersions[0];
  let count = 1;

  for (let i = 1; i < poolVersions.length; i += 1) {
    if (poolVersions[i] === current) {
      count += 1;
    } else {
      result.push(result.length === 0 ? count + 1 : count);
      current = poolVersions[i];
      count = 1;
    }
  }

  result.push(result.length === 0 ? count + 1 : count);
  return result;
}

function normalizePoolVersions(poolVersions = []) {
  if (!Array.isArray(poolVersions)) return [];
  return poolVersions.map((item) => String(item || '').trim()).filter(Boolean);
}

function normalizePoolFees(poolFees = [], tokenCount = 0) {
  const normalized = Array.isArray(poolFees)
    ? poolFees.map((item) => Number.parseInt(String(item ?? '0'), 10) || 0)
    : [];

  if (normalized.length >= tokenCount) {
    return normalized.slice(0, tokenCount);
  }

  if (tokenCount > 0) {
    return [...normalized, ...new Array(tokenCount - normalized.length).fill(0)];
  }

  return normalized;
}

function ensureTronWebAddress(tronWeb, address) {
  if (!tronWeb || !isUsableAddress(address)) {
    return;
  }

  let hex = '';

  try {
    if (typeof tronWeb?.address?.toHex === 'function') {
      hex = tronWeb.address.toHex(address) || '';
    }
  } catch (_) {}

  try {
    if (typeof tronWeb.setAddress === 'function') {
      tronWeb.setAddress(address);
    }
  } catch (_) {}

  try {
    tronWeb.defaultAddress = {
      ...(tronWeb.defaultAddress || {}),
      base58: address,
      ...(hex ? { hex } : {})
    };
  } catch (_) {}

  try {
    if (!tronWeb.defaultAddress) {
      tronWeb.defaultAddress = {};
    }

    tronWeb.defaultAddress.base58 = address;

    if (hex) {
      tronWeb.defaultAddress.hex = hex;
    }
  } catch (_) {}
}

function prepareTronWebForSigning(tronWeb, owner) {
  if (!tronWeb) {
    throw new Error('SUN.io execution: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io execution: owner address is invalid');
  }

  ensureTronWebAddress(tronWeb, owner);

  const defaultBase58 = tronWeb?.defaultAddress?.base58;

  if (!defaultBase58 || defaultBase58 !== owner) {
    throw new Error('SUN.io execution: owner_address is not set');
  }
}

function tryDecodeHexMessage(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  const normalized = message.startsWith('0x') ? message.slice(2) : message;

  if (!/^[0-9a-fA-F]+$/.test(normalized)) {
    return message;
  }

  try {
    let text = '';

    for (let i = 0; i < normalized.length; i += 2) {
      const code = Number.parseInt(normalized.slice(i, i + 2), 16);

      if (Number.isFinite(code) && code > 0) {
        text += String.fromCharCode(code);
      }
    }

    return text.replace(/\0/g, '').trim() || message;
  } catch (_) {
    return message;
  }
}

function collectErrorStrings(error, bucket = []) {
  if (!error) {
    return bucket;
  }

  if (typeof error === 'string') {
    bucket.push(error);
    return bucket;
  }

  if (typeof error?.message === 'string') {
    bucket.push(error.message);
  }

  if (typeof error?.error === 'string') {
    bucket.push(error.error);
  }

  if (typeof error?.data === 'string') {
    bucket.push(error.data);
  }

  if (typeof error?.data?.message === 'string') {
    bucket.push(error.data.message);
  }

  if (typeof error?.data?.error === 'string') {
    bucket.push(error.data.error);
  }

  if (typeof error?.response?.data?.message === 'string') {
    bucket.push(error.response.data.message);
  }

  if (typeof error?.response?.data?.error === 'string') {
    bucket.push(error.response.data.error);
  }

  if (Array.isArray(error?.errors)) {
    error.errors.forEach((item) => collectErrorStrings(item, bucket));
  }

  return bucket;
}

function normalizeErrorText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^error:\s*/i, '')
    .trim();
}

function extractContractError(error) {
  const rawCandidates = collectErrorStrings(error)
    .map((item) => tryDecodeHexMessage(String(item || '')))
    .map((item) => normalizeErrorText(item))
    .filter(Boolean);

  const joined = rawCandidates.join(' | ');
  const lower = joined.toLowerCase();

  if (!joined) {
    return 'Swap execution failed.';
  }

  if (lower.includes('owner_address isn\'t set') || lower.includes('owner_address is not set')) {
    return 'Wallet connection is not ready. Please reconnect the wallet and try again.';
  }

  if (lower.includes('network fee estimation unsuccessful')) {
    return 'Network fee estimation failed. Please try again in a moment.';
  }

  if (lower.includes('third-party contract execution error')) {
    return 'The swap transaction was rejected by the target contract. Please try another route or try again later.';
  }

  if (lower.includes('insufficient output amount') || lower.includes('amountoutmin')) {
    return 'Price changed before confirmation. Please try again.';
  }

  if (lower.includes('out of energy') || lower.includes('not enough energy')) {
    return 'Not enough TRX energy for this transaction. Please add more TRX for network resources and try again.';
  }

  if (lower.includes('bandwidth')) {
    return 'Not enough bandwidth for this transaction. Please try again after replenishing wallet resources.';
  }

  if (lower.includes('user denied') || lower.includes('user rejected') || lower.includes('cancelled')) {
    return 'Transaction was cancelled in the wallet.';
  }

  return rawCandidates[0];
}

function isTransientNetworkError(error) {
  const message = String(error?.message || error || '').toLowerCase();

  return (
    message.includes('network error') ||
    message.includes('failed to fetch') ||
    message.includes('fetch failed') ||
    message.includes('timeout') ||
    message.includes('request failed') ||
    message.includes('socket hang up') ||
    message.includes('connection') ||
    message.includes('disconnected')
  );
}

function isRouteExecutableByWidget({
  tokens = [],
  poolVersions = [],
  versionLen = []
} = {}) {
  if (!Array.isArray(tokens) || tokens.length < 2) return false;
  if (!Array.isArray(poolVersions) || !poolVersions.length) return false;
  if (!Array.isArray(versionLen) || !versionLen.length) return false;
  return true;
}

function mapApiRouteToSunioRoute(apiRoute, targetToken, outputDecimals) {
  const tokens = Array.isArray(apiRoute?.tokens) ? apiRoute.tokens : [];
  const symbols = Array.isArray(apiRoute?.symbols) ? apiRoute.symbols : [];
  const poolVersions = normalizePoolVersions(apiRoute?.poolVersions);
  const fees = normalizePoolFees(apiRoute?.poolFees, tokens.length);
  const versionLen = buildVersionLen(poolVersions);
  const isExecutable = isRouteExecutableByWidget({
    tokens,
    poolVersions,
    versionLen
  });

  return {
    id: `sunio-${targetToken}-${tokens.join('-')}-${poolVersions.join('-')}`,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    providerLogo: sunioLogo,
    providerMeta: getSunioProviderMeta(),
    fromToken: '4TEEN',
    toToken: targetToken,
    path: tokens,
    symbols,
    via: symbols.slice(1, -1),
    poolVersion: poolVersions,
    versionLen,
    fees,
    expectedOut: apiRoute?.amountOut ?? null,
    expectedOutRaw: apiRoute?.amountOutRaw ?? null,
    minReceived: null,
    outputDecimals,
    impactLabel:
      apiRoute?.impact != null && apiRoute?.impact !== ''
        ? `${String(apiRoute.impact)}%`
        : '—',
    routeLabel:
      symbols.length > 2
        ? `Optimized · ${Math.max(0, symbols.length - 2)} hop${
            symbols.length - 2 > 1 ? 's' : ''
          }`
        : 'Direct · best route',
    executionLabel:
      apiRoute?.fee != null && apiRoute?.fee !== ''
        ? `${String(apiRoute.fee)}`
        : '—',
    apiFee: apiRoute?.fee ?? null,
    apiImpact: apiRoute?.impact ?? null,
    amountIn: apiRoute?.amountIn ?? null,
    amountInRaw: apiRoute?.amountInRaw ?? null,
    amountOut: apiRoute?.amountOut ?? null,
    amountOutRaw: apiRoute?.amountOutRaw ?? null,
    inUsd: apiRoute?.inUsd ?? null,
    outUsd: apiRoute?.outUsd ?? null,
    containsUnverifiedHook: Boolean(apiRoute?.containsUnverifiedHook),
    poolKeys: Array.isArray(apiRoute?.poolKeys) ? apiRoute.poolKeys : [],
    stepAmountsOut: Array.isArray(apiRoute?.stepAmountsOut)
      ? apiRoute.stepAmountsOut
      : [],
    isExecutable
  };
}

export function makeSunioRoute({
  id,
  fromToken,
  toToken,
  path,
  poolVersion,
  versionLen,
  fees,
  routeLabel = 'Direct',
  executionLabel = 'Best direct',
  expectedOut = null,
  expectedOutRaw = null,
  minReceived = null,
  outputDecimals = 6,
  impactLabel = '—',
  isExecutable = true
}) {
  return {
    id: id || `sunio-${Date.now()}`,
    provider: PROVIDER_ID,
    providerName: PROVIDER_NAME,
    providerLogo: sunioLogo,
    providerMeta: getSunioProviderMeta(),
    fromToken,
    toToken,
    path,
    poolVersion,
    versionLen,
    fees,
    routeLabel,
    executionLabel,
    expectedOut,
    expectedOutRaw,
    minReceived,
    outputDecimals,
    impactLabel,
    isExecutable
  };
}

export async function getSunioQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3,
  typeList = SUNIO_MAINNET_DEFAULTS.typeList,
  calculationServiceUrl = SUNIO_MAINNET_DEFAULTS.calculationServiceUrl
} = {}) {
  const safeAmountIn = toSafeNumber(amountIn, 0);

  if (!safeAmountIn || safeAmountIn <= 0) {
    return [];
  }

  if (!isUsableAddress(fromTokenAddress)) {
    throw new Error('SUN.io quotes: fromTokenAddress is invalid');
  }

  const toTokenParam = getTargetTokenParam(targetToken, tokenAddresses);

  if (!isUsableAddress(toTokenParam)) {
    throw new Error(`SUN.io quotes: target token address for ${targetToken} is invalid`);
  }

  const amountInRaw = decimalToRaw(amountIn, inputDecimals).toString();
  const resolvedOutputDecimals = getOutputDecimalsByTarget(targetToken, outputDecimals);

  const url = new URL(calculationServiceUrl);
  url.searchParams.set('fromToken', fromTokenAddress);
  url.searchParams.set('toToken', toTokenParam);
  url.searchParams.set('amountIn', amountInRaw);
  url.searchParams.set('typeList', typeof typeList === 'string' ? typeList : '');
  url.searchParams.set('includeUnverifiedV4Hook', 'true');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*'
    }
  });

  if (!response.ok) {
    throw new Error(`SUN.io quotes failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (!payload || Number(payload.code) !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload?.message || 'SUN.io quotes returned invalid payload');
  }

  return payload.data
    .slice(0, Math.max(1, Number(routeCount || 3)))
    .map((item) => mapApiRouteToSunioRoute(item, targetToken, resolvedOutputDecimals))
    .sort((a, b) => Number(b.expectedOut || 0) - Number(a.expectedOut || 0));
}

export async function waitForSunioTransactionConfirmation({
  wallet,
  txid,
  timeoutMs = 120000,
  pollIntervalMs = 1500
} = {}) {
  const tronWeb = getTronWebSafe(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io confirmation: tronWeb is not available');
  }

  if (!txid || typeof txid !== 'string') {
    throw new Error('SUN.io confirmation: txid is required');
  }

  const startedAt = Date.now();
  let lastKnownError = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const [info, tx] = await Promise.allSettled([
        tronWeb.trx.getTransactionInfo(txid),
        tronWeb.trx.getTransaction(txid)
      ]);

      const txInfo = info.status === 'fulfilled' ? info.value : null;
      const txData = tx.status === 'fulfilled' ? tx.value : null;

      if (txInfo && Object.keys(txInfo).length > 0) {
        const receiptResult = txInfo?.receipt?.result;

        if (receiptResult === 'SUCCESS') {
          return {
            ok: true,
            txid,
            info: txInfo,
            transaction: txData || null
          };
        }

        if (receiptResult && receiptResult !== 'SUCCESS') {
          throw new Error(`Transaction failed: ${receiptResult}`);
        }
      }

      const txResult =
        txData?.ret?.[0]?.contractRet ||
        txData?.ret?.[0]?.contract_ret ||
        txData?.result ||
        '';

      if (String(txResult).toUpperCase() === 'SUCCESS') {
        return {
          ok: true,
          txid,
          info: txInfo || null,
          transaction: txData
        };
      }
    } catch (error) {
      const message = String(error?.message || '');

      if (
        message.includes('Transaction not found') ||
        message.includes('does not exist') ||
        isTransientNetworkError(error)
      ) {
        lastKnownError = error;
        await wait(pollIntervalMs);
        continue;
      }

      throw error;
    }

    await wait(pollIntervalMs);
  }

  if (lastKnownError && isTransientNetworkError(lastKnownError)) {
    throw new Error('Network error while waiting for transaction confirmation');
  }

  throw new Error('Transaction confirmation timeout');
}

export async function checkSunioAllowance({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io allowance: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io allowance: wallet address is not available');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('SUN.io allowance: tokenAddress is invalid');
  }

  if (!isUsableAddress(spenderAddress)) {
    throw new Error('SUN.io allowance: spenderAddress is invalid');
  }

  prepareTronWebForSigning(tronWeb, owner);

  const resolvedDecimals = Number.isFinite(Number(tokenDecimals))
    ? Number(tokenDecimals)
    : await getTokenDecimals(tronWeb, tokenAddress, 6);

  const requiredAmountRaw = decimalToRaw(amountIn, resolvedDecimals);
  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const allowanceRaw = normalizeBigintLike(
    await token.allowance(owner, spenderAddress).call()
  );

  return {
    ok: true,
    owner,
    spenderAddress,
    tokenAddress,
    allowanceRaw: allowanceRaw.toString(),
    requiredAmountRaw: requiredAmountRaw.toString(),
    hasEnoughAllowance: allowanceRaw >= requiredAmountRaw
  };
}

export async function ensureSunioApproval({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = null,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  if (!tronWeb) {
    throw new Error('SUN.io approval: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io approval: wallet address is not available');
  }

  if (!isUsableAddress(tokenAddress)) {
    throw new Error('SUN.io approval: tokenAddress is invalid');
  }

  if (!isUsableAddress(spenderAddress)) {
    throw new Error('SUN.io approval: spenderAddress is invalid');
  }

  prepareTronWebForSigning(tronWeb, owner);

  const resolvedDecimals = Number.isFinite(Number(tokenDecimals))
    ? Number(tokenDecimals)
    : await getTokenDecimals(tronWeb, tokenAddress, 6);

  const amountInRaw = decimalToRaw(amountIn, resolvedDecimals);
  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const allowanceRaw = normalizeBigintLike(
    await token.allowance(owner, spenderAddress).call()
  );

  if (allowanceRaw >= amountInRaw) {
    return {
      ok: true,
      required: false,
      approved: true,
      approvalType: 'already-approved',
      allowanceRaw: allowanceRaw.toString(),
      amountInRaw: amountInRaw.toString(),
      approvalAmountRaw: MAX_UINT256,
      spenderAddress
    };
  }

  try {
    const txid = await token
      .approve(spenderAddress, MAX_UINT256)
      .send({
        feeLimit,
        callValue: 0,
        shouldPollResponse: false
      });

    return {
      ok: true,
      required: true,
      approved: false,
      approvalType: 'unlimited',
      txid,
      spenderAddress,
      allowanceRaw: allowanceRaw.toString(),
      amountInRaw: amountInRaw.toString(),
      approvalAmountRaw: MAX_UINT256
    };
  } catch (error) {
    throw new Error(extractContractError(error));
  }
}

export async function executeSunioSwap({
  wallet,
  route,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = null,
  smartRouterAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit,
  deadlineSeconds = null,
  recipient = null
} = {}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);
  const to = recipient || owner;

  if (!tronWeb) {
    throw new Error('SUN.io execution: tronWeb is not available');
  }

  if (!isUsableAddress(owner)) {
    throw new Error('SUN.io execution: owner address is invalid');
  }

  if (!isUsableAddress(to)) {
    throw new Error('SUN.io execution: recipient address is invalid');
  }

  if (!isUsableAddress(smartRouterAddress)) {
    throw new Error('SUN.io execution: smartRouterAddress is invalid');
  }

  if (!isUsableAddress(inputTokenAddress)) {
    throw new Error('SUN.io execution: inputTokenAddress is invalid');
  }

  assertExecutableRoute(route);
  prepareTronWebForSigning(tronWeb, owner);

  const amountInRaw = decimalToRaw(amountIn, inputTokenDecimals);
  const slippageBps = parseSlippageBps(slippage);
  const resolvedOutputDecimals = getOutputDecimalsByTarget(
    route?.toToken,
    outputTokenDecimals ?? route?.outputDecimals
  );

  let amountOutMinRaw = 0n;

  if (route.amountOutRaw != null) {
    amountOutMinRaw = calcMinOutRawFromExpected(route.amountOutRaw, slippageBps);
  } else if (route.minReceived != null) {
    amountOutMinRaw = humanOutputToRaw(route.minReceived, resolvedOutputDecimals);
  } else if (route.expectedOut != null) {
    const expectedOutRaw = humanOutputToRaw(route.expectedOut, resolvedOutputDecimals);
    amountOutMinRaw = calcMinOutRawFromExpected(expectedOutRaw, slippageBps);
  } else {
    throw new Error('SUN.io execution: route.minReceived or route.expectedOut is required');
  }

  const deadline =
    Number.isFinite(Number(deadlineSeconds)) && Number(deadlineSeconds) > 0
      ? Number(deadlineSeconds)
      : Math.floor(Date.now() / 1000) + SUNIO_MAINNET_DEFAULTS.deadlineSeconds;

  const swapData = [
    amountInRaw.toString(),
    amountOutMinRaw.toString(),
    to,
    String(deadline)
  ];

  console.log('[SUN SWAP ROUTE RAW JSON]', JSON.stringify(route, null, 2));
  console.log(
    '[SUN SWAP PAYLOAD JSON]',
    JSON.stringify(
      {
        owner,
        to,
        path: route.path,
        poolVersion: route.poolVersion,
        versionLen: route.versionLen,
        fees: route.fees,
        swapData,
        smartRouterAddress,
        inputTokenAddress,
        amountIn,
        amountInRaw: amountInRaw.toString(),
        amountOutMinRaw: amountOutMinRaw.toString(),
        slippage,
        outputTokenDecimals,
        resolvedOutputDecimals,
        deadline,
        feeLimit,
        tronDefaultAddress: tronWeb?.defaultAddress || null,
        poolKeys: route.poolKeys || null,
        stepAmountsOut: route.stepAmountsOut || null
      },
      null,
      2
    )
  );

  try {
    prepareTronWebForSigning(tronWeb, owner);

    const router = await tronWeb.contract(SMART_ROUTER_ABI, smartRouterAddress);

    const txid = await router
      .swapExactInput(
        route.path,
        route.poolVersion,
        route.versionLen.map((v) => String(v)),
        route.fees.map((v) => Number(v)),
        swapData
      )
      .send({
        feeLimit,
        callValue: 0,
        shouldPollResponse: false
      });

    console.log('[SUN SWAP TXID]', txid);

    const confirmation = await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    return {
      ok: true,
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      txid,
      unwrapTxid: null,
      unwrappedAmountRaw: '0',
      to,
      smartRouterAddress,
      amountInRaw: amountInRaw.toString(),
      amountOutMinRaw: amountOutMinRaw.toString(),
      deadline,
      route,
      confirmation
    };
  } catch (error) {
    console.error('[SUN SWAP CONTRACT SEND ERROR FULL]', error);
    console.error('[SUN SWAP CONTRACT SEND ERROR MESSAGE]', error?.message);
    console.error(
      '[SUN SWAP CONTRACT SEND ERROR JSON]',
      JSON.stringify(
        {
          message: error?.message || null,
          error: error?.error || null,
          data: error?.data || null,
          response: error?.response || null,
          stack: error?.stack || null,
          defaultAddress: tronWeb?.defaultAddress || null,
          owner,
          to,
          route
        },
        null,
        2
      )
    );
    throw new Error(extractContractError(error));
  }
}
```

---

## FILE: src/widgets/swap/services/quotes.js

```js
import { getSunioQuotes } from '../providers/sunio.js';

function toFiniteNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function sortRoutesBestFirst(routes = []) {
  return [...routes].sort((a, b) => {
    const aExecutable = a?.isExecutable !== false;
    const bExecutable = b?.isExecutable !== false;

    if (aExecutable !== bExecutable) {
      return aExecutable ? -1 : 1;
    }

    const aOutRaw = BigInt(String(a?.amountOutRaw ?? a?.expectedOutRaw ?? '0'));
    const bOutRaw = BigInt(String(b?.amountOutRaw ?? b?.expectedOutRaw ?? '0'));

    if (aOutRaw > bOutRaw) return -1;
    if (aOutRaw < bOutRaw) return 1;

    const aOut = toFiniteNumber(a?.expectedOut, 0);
    const bOut = toFiniteNumber(b?.expectedOut, 0);

    return bOut - aOut;
  });
}

export async function getSwapQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = null,
  routeCount = 3
} = {}) {
  const safeAmount = toFiniteNumber(amountIn, 0);

  if (!safeAmount || safeAmount <= 0) {
    return [];
  }

  const routes = await getSunioQuotes({
    amountIn: safeAmount,
    targetToken,
    fromTokenAddress,
    tokenAddresses,
    inputDecimals,
    outputDecimals,
    routeCount
  });

  const sorted = sortRoutesBestFirst(routes);

  const executable = sorted.filter((item) => item?.isExecutable !== false);

  return executable.length ? executable : sorted;
}
```

---

## FILE: src/widgets/swap/services/swapExecution.js

```js
import {
  checkSunioAllowance,
  ensureSunioApproval,
  executeSunioSwap,
  waitForSunioTransactionConfirmation,
  getSunioSpenderAddressForRoute
} from '../providers/sunio.js';

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (_) {
    return '';
  }
}

function toErrorMessage(error) {
  if (!error) return 'Unknown error';

  if (typeof error === 'string') {
    return error.trim() || 'Unknown error';
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error?.error === 'string' && error.error.trim()) {
    return error.error.trim();
  }

  if (typeof error?.data === 'string' && error.data.trim()) {
    return error.data.trim();
  }

  if (typeof error?.data?.message === 'string' && error.data.message.trim()) {
    return error.data.message.trim();
  }

  if (typeof error?.response?.data?.message === 'string' && error.response.data.message.trim()) {
    return error.response.data.message.trim();
  }

  const json = safeJsonStringify(error);
  if (json && json !== '{}' && json !== '[]') {
    return json;
  }

  return 'Unknown error';
}

function normalizeMessage(message) {
  return String(message || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeCleanUserMessage(message, fallback) {
  const normalized = normalizeMessage(message);

  if (!normalized || normalized === '[object Object]') {
    return fallback;
  }

  return normalized;
}

function mapSwapErrorToUserMessage(error) {
  const raw = normalizeMessage(toErrorMessage(error));
  const lower = raw.toLowerCase();

  if (!raw || raw === '[object Object]') {
    return 'Swap failed for an unknown reason. Please try again.';
  }

  if (
    lower.includes('user denied') ||
    lower.includes('user rejected') ||
    lower.includes('rejected by user') ||
    lower.includes('cancelled') ||
    lower.includes('canceled') ||
    lower.includes('declined') ||
    lower.includes('transaction was cancelled in the wallet')
  ) {
    return 'Transaction was cancelled in the wallet.';
  }

  if (
    lower.includes('wallet is not connected') ||
    lower.includes('tronweb is not available') ||
    lower.includes('wallet address is not available') ||
    lower.includes('owner address is invalid') ||
    lower.includes('recipient address is invalid') ||
    lower.includes('wallet connection is not ready') ||
    lower.includes('owner_address is not set') ||
    lower.includes('owner_address isn\'t set')
  ) {
    return 'Wallet connection is not ready. Please reconnect the wallet and try again.';
  }

  if (
    lower.includes('network error') ||
    lower.includes('failed to fetch') ||
    lower.includes('fetch failed') ||
    lower.includes('request failed') ||
    lower.includes('timeout') ||
    lower.includes('connection') ||
    lower.includes('disconnected')
  ) {
    return 'Network issue while talking to the blockchain. Please try again.';
  }

  if (
    lower.includes('transaction confirmation timeout') ||
    lower.includes('transaction not found')
  ) {
    return 'The transaction was sent, but confirmation took too long. Please check the wallet or explorer.';
  }

  if (
    lower.includes('insufficient output amount') ||
    lower.includes('amountoutmin') ||
    lower.includes('slippage') ||
    lower.includes('price changed before confirmation')
  ) {
    return 'Price changed before confirmation. Try again or increase slippage slightly.';
  }

  if (
    lower.includes('deadline') ||
    lower.includes('expired') ||
    lower.includes('transaction expired')
  ) {
    return 'Swap request expired before confirmation. Please try again.';
  }

  if (
    lower.includes('balance is not sufficient') ||
    lower.includes('insufficient balance') ||
    lower.includes('no enough balance') ||
    lower.includes('account balance is insufficient')
  ) {
    return 'Insufficient balance to complete this swap.';
  }

  if (
    lower.includes('out of energy') ||
    lower.includes('bandwidth') ||
    lower.includes('fee limit') ||
    lower.includes('not enough energy') ||
    lower.includes('network fee estimation unsuccessful')
  ) {
    return 'Not enough network resources for the transaction. Add more TRX for fees or energy and try again.';
  }

  if (
    lower.includes('allowance') ||
    lower.includes('approve') ||
    lower.includes('approval failed')
  ) {
    return 'Token approval failed. Please confirm approval in the wallet and try again.';
  }

  if (
    lower.includes('selected route is not supported') ||
    lower.includes('route is not supported') ||
    lower.includes('route.path is required') ||
    lower.includes('route.poolversion is required')
  ) {
    return 'This route is not supported by the current widget version yet. Please try another quote.';
  }

  if (
    lower.includes('third-party contract execution error') ||
    lower.includes('the swap transaction was rejected by the target contract')
  ) {
    return 'The swap route could not be executed. Please try another route or try again later.';
  }

  if (isPlainObject(error)) {
    return 'Swap failed. Please try again.';
  }

  return makeCleanUserMessage(raw, 'Swap failed. Please try again.');
}

function makeStepReporter(reportProgress) {
  return function step(step, payload = {}) {
    if (typeof reportProgress === 'function') {
      reportProgress({
        step,
        ...payload
      });
    }
  };
}

async function confirmIfNeeded({
  wallet,
  txid,
  reportStep,
  label = 'confirming'
}) {
  if (!txid) return null;

  reportStep(label, { txid });

  try {
    const confirmation = await waitForSunioTransactionConfirmation({
      wallet,
      txid,
      timeoutMs: 120000,
      pollIntervalMs: 1500
    });

    return confirmation;
  } catch (error) {
    throw new Error(mapSwapErrorToUserMessage(error));
  }
}

export async function executeSwapFlow({
  wallet,
  selectedRoute,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6,
  outputTokenDecimals = null,
  reportProgress
} = {}) {
  const step = makeStepReporter(reportProgress);

  try {
    if (!wallet) {
      throw new Error('Wallet is not connected');
    }

    if (!selectedRoute) {
      throw new Error('No route selected');
    }

    if (!amountIn || Number(amountIn) <= 0) {
      throw new Error('Enter a valid amount');
    }

    if (!inputTokenAddress) {
      throw new Error('Input token address is missing');
    }

    const spenderAddress = getSunioSpenderAddressForRoute(selectedRoute);

    step('validating', {
      message: 'Preparing swap...'
    });

    step('checking-allowance', {
      message: 'Checking token approval...'
    });

    const allowance = await checkSunioAllowance({
      wallet,
      tokenAddress: inputTokenAddress,
      spenderAddress,
      amountIn,
      tokenDecimals: inputTokenDecimals
    });

    let approval = null;
    let approvalConfirmation = null;

    if (!allowance?.hasEnoughAllowance) {
      step('approval-required', {
        message: 'Approval is required before swap.'
      });

      approval = await ensureSunioApproval({
        wallet,
        tokenAddress: inputTokenAddress,
        spenderAddress,
        amountIn,
        tokenDecimals: inputTokenDecimals
      });

      if (approval?.txid) {
        step('approval-submitted', {
          message: 'Approval transaction sent.',
          txid: approval.txid
        });

        approvalConfirmation = await confirmIfNeeded({
          wallet,
          txid: approval.txid,
          reportStep: step,
          label: 'approval-confirming'
        });

        step('approval-confirmed', {
          message: 'Approval confirmed.',
          txid: approval.txid,
          confirmation: approvalConfirmation
        });
      }
    } else {
      step('approval-ready', {
        message: 'Existing approval is sufficient.'
      });
    }

    step('swap-submitting', {
      message: 'Sending swap transaction...'
    });

    const swapResult = await executeSunioSwap({
      wallet,
      route: selectedRoute,
      amountIn,
      slippage,
      inputTokenAddress,
      inputTokenDecimals,
      outputTokenDecimals
    });

    if (!swapResult?.txid) {
      throw new Error('Swap transaction was not created');
    }

    step('swap-submitted', {
      message: 'Swap transaction sent.',
      txid: swapResult.txid
    });

    const confirmation =
      swapResult?.confirmation ||
      (await confirmIfNeeded({
        wallet,
        txid: swapResult.txid,
        reportStep: step,
        label: 'swap-confirming'
      }));

    step('swap-confirmed', {
      message: 'Swap confirmed on-chain.',
      txid: swapResult.txid,
      confirmation
    });

    const receiveSymbol = selectedRoute?.toToken || 'tokens';
    const receiveAmount = selectedRoute?.expectedOut || null;
    const successMessage = receiveAmount
      ? `Swap completed successfully. Estimated received: ${receiveAmount} ${receiveSymbol}.`
      : `Swap completed successfully. ${receiveSymbol} received.`;

    step('success', {
      message: successMessage,
      txid: swapResult.txid,
      approvalTxid: approval?.txid || null,
      confirmation
    });

    return {
      ok: true,
      status: 'success',
      provider: swapResult?.provider || selectedRoute?.provider || 'sunio',
      txid: swapResult.txid,
      approvalTxid: approval?.txid || null,
      approval,
      approvalConfirmation,
      confirmation,
      route: selectedRoute,
      result: swapResult,
      successMessage,
      shouldResetForm: true
    };
  } catch (error) {
    const userMessage = mapSwapErrorToUserMessage(error);
    const rawMessage = makeCleanUserMessage(toErrorMessage(error), userMessage);

    step('error', {
      message: userMessage,
      rawMessage
    });

    return {
      ok: false,
      status: 'error',
      message: userMessage,
      rawMessage,
      route: selectedRoute || null
    };
  }
}

export { mapSwapErrorToUserMessage };
export const executeSwapRoute = executeSwapFlow;
```

---

## FILE: src/widgets/swap/swap.css

```css
:root {
  --fourteen-swap-bg: rgba(17, 17, 17, 0.92);
  --fourteen-swap-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-swap-border: rgba(255, 255, 255, 0.08);
  --fourteen-swap-text: rgba(255, 255, 255, 0.94);
  --fourteen-swap-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-swap-text-faint: rgba(255, 255, 255, 0.48);
  --fourteen-swap-accent: rgb(255, 105, 0);
  --fourteen-swap-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-swap-green: rgb(26, 224, 58);
  --fourteen-swap-red: rgb(255, 48, 73);
  --fourteen-swap-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-swap-radius: 16px;
  --fourteen-swap-radius-sm: 12px;
}

.fourteen-swap-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HERO / HEADER
------------------------------------------------------- */

.fourteen-swap-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-swap-hero__bg {
  position: absolute;
  left: -14px;
  top: -18px;
  width: 60px;
  height: 60px;
  background-image: url('../../assets/text_bg.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.fourteen-swap-hero__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-swap-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-swap-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-swap-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.fourteen-swap-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

.fourteen-swap-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-swap-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.fourteen-swap-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
}

.fourteen-swap-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-swap-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.fourteen-swap-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-swap-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-swap-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-swap-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-popover__text {
  font-size: 12px;
  line-height: 1.55;
  color: var(--fourteen-swap-text-soft);
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-swap-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-swap-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-connect-slot {
  margin-bottom: 16px;
}

.fourteen-swap-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-swap-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-swap-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-swap-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-swap-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-swap-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   FORM
------------------------------------------------------- */

.fourteen-swap-form {
  margin-bottom: 16px;
}

.fourteen-swap-form__meta-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.fourteen-swap-form__meta-row--estimate {
  margin-top: 12px;
}

.fourteen-swap-form__meta-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-form__slippage-wrap {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.fourteen-swap-slippage {
  min-width: 110px;
  height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--fourteen-swap-border);
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  color: var(--fourteen-swap-text);
  font-size: 13px;
  font-weight: 700;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.6) 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.6) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 16px,
    calc(100% - 12px) 16px;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fourteen-swap-slippage:focus {
  border-color: rgba(255, 105, 0, 0.58);
  box-shadow: 0 0 0 4px rgba(255, 105, 0, 0.08);
}

.fourteen-swap-input-wrap,
.fourteen-swap-estimate-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.fourteen-swap-input,
.fourteen-swap-estimate {
  width: 100%;
  min-height: 62px;
  padding: 0 132px 0 16px;
  border-radius: 16px;
  border: 1px solid var(--fourteen-swap-border);
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  color: var(--fourteen-swap-text);
  font-size: 28px;
  font-weight: 800;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.fourteen-swap-input::placeholder {
  color: var(--fourteen-swap-text-faint);
}

.fourteen-swap-input:focus {
  border-color: rgba(255, 105, 0, 0.58);
  box-shadow: 0 0 0 4px rgba(255, 105, 0, 0.08);
}

.fourteen-swap-input__suffix,
.fourteen-swap-estimate__suffix {
  position: absolute;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 800;
  color: var(--fourteen-swap-text);
  pointer-events: none;
}

.fourteen-swap-input__token-logo,
.fourteen-swap-estimate__token-logo,
.fourteen-swap-target-switch__logo,
.fourteen-swap-route-card__token-logo,
.fourteen-swap-route-card__provider-logo {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  flex: 0 0 auto;
}

.fourteen-swap-estimate {
  display: flex;
  align-items: center;
  pointer-events: none;
}

.fourteen-swap-estimate__value {
  font-size: 28px;
  font-weight: 800;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-target-switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.fourteen-swap-target-switch__button {
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: 1px solid var(--fourteen-swap-border);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.fourteen-swap-target-switch__button:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 105, 0, 0.34);
}

.fourteen-swap-target-switch__button.is-active {
  border-color: rgba(255, 105, 0, 0.34);
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
}

/* -------------------------------------------------------
   ROUTES
------------------------------------------------------- */

.fourteen-swap-routes-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.fourteen-swap-routes-head__title {
  font-size: 14px;
  font-weight: 800;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-routes-head__subtitle {
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-swap-text-soft);
  text-align: right;
}

.fourteen-swap-routes {
  display: grid;
  gap: 14px;
}

.fourteen-swap-routes-empty {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-swap-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-swap-text-soft);
  font-size: 13px;
  line-height: 1.5;
}

.fourteen-swap-route-card {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 1px minmax(300px, 1fr);
  gap: 18px;
  align-items: stretch;
  padding: 18px;
  border: 1px solid var(--fourteen-swap-border);
  border-radius: 18px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
  box-shadow: var(--fourteen-swap-shadow);
}

.fourteen-swap-route-card__left,
.fourteen-swap-route-card__right {
  min-height: 220px;
}

.fourteen-swap-route-card__left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
}

.fourteen-swap-route-card__divider {
  width: 1px;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
}

.fourteen-swap-route-card__eyebrow,
.fourteen-swap-route-card__label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fourteen-swap-text-faint);
}

.fourteen-swap-route-card__receive {
  margin-top: 8px;
  font-size: 34px;
  font-weight: 900;
  line-height: 1.05;
  color: var(--fourteen-swap-text);
  word-break: break-word;
}

.fourteen-swap-route-card__min {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-route-card__action {
  width: 100%;
  min-height: 52px;
  margin-top: 18px;
  padding: 0 18px;
  border: 1px solid rgba(255, 105, 0, 0.34);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.2);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
}

.fourteen-swap-route-card__action:hover:not(:disabled):not([aria-disabled='true']) {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(255, 105, 0, 0.28);
}

.fourteen-swap-route-card__action:active {
  transform: translateY(0);
}

.fourteen-swap-route-card__action:disabled,
.fourteen-swap-route-card__action[aria-disabled='true'] {
  opacity: 0.52;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  filter: grayscale(0.12);
}

.fourteen-swap-route-card__right {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  padding: 4px 0;
}

.fourteen-swap-route-card__provider {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 52px;
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.fourteen-swap-route-card__provider-logo {
  width: 34px;
  height: 34px;
}

.fourteen-swap-route-card__detail--path {
  padding-right: 54px;
}

.fourteen-swap-route-card__value {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--fourteen-swap-text);
}

.fourteen-swap-route-card__path-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.fourteen-swap-route-card__path-token {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
}

.fourteen-swap-route-card__token-symbol {
  font-weight: 800;
}

.fourteen-swap-route-card__path-via {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--fourteen-swap-text-soft);
  font-size: 12px;
  font-weight: 700;
}

/* -------------------------------------------------------
   STATUS
------------------------------------------------------- */

.fourteen-swap-status {
  margin-top: 12px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  line-height: 1.45;
  color: var(--fourteen-swap-text-soft);
}

.fourteen-swap-status[data-state='error'] {
  color: #ffd4db;
}

.fourteen-swap-status[data-state='success'] {
  color: rgba(170, 255, 189, 0.95);
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 1024px) {
  .fourteen-swap-route-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .fourteen-swap-route-card__left,
  .fourteen-swap-route-card__right {
    min-height: auto;
  }

  .fourteen-swap-route-card__divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(255, 255, 255, 0.12) 50%,
      rgba(255, 255, 255, 0.02) 100%
    );
  }
}

@media (max-width: 860px) {
  .fourteen-swap-hero__title {
    font-size: 36px;
  }

  .fourteen-swap-form__meta-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-swap-form__slippage-wrap {
    width: 100%;
    justify-content: space-between;
  }

  .fourteen-swap-slippage {
    min-width: 120px;
  }

  .fourteen-swap-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 640px) {
  .fourteen-swap-connect-slot__desktop {
    display: none;
  }

  .fourteen-swap-connect-slot__mobile {
    display: block;
  }

  .fourteen-swap-routes-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-swap-routes-head__subtitle {
    text-align: left;
  }

  .fourteen-swap-input,
  .fourteen-swap-estimate {
    min-height: 56px;
    padding-right: 108px;
    font-size: 24px;
  }

  .fourteen-swap-estimate__value {
    font-size: 24px;
  }

  .fourteen-swap-input__suffix,
  .fourteen-swap-estimate__suffix {
    font-size: 16px;
  }

  .fourteen-swap-target-switch__button {
    width: 48px;
    height: 48px;
  }

  .fourteen-swap-route-card__right {
    padding-top: 6px;
  }

  .fourteen-swap-route-card__provider {
    top: 0;
    right: 0;
  }

  .fourteen-swap-route-card__detail--path {
    padding-right: 50px;
  }
}

@media (max-width: 560px) {
  .fourteen-swap-hero {
    align-items: flex-start;
  }

  .fourteen-swap-hero__title {
    font-size: 32px;
  }

  .fourteen-swap-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-swap-hero__actions {
    gap: 8px;
  }

  .fourteen-swap-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-swap-popover {
    width: min(320px, 94vw);
  }

  .fourteen-swap-connect-slot {
    margin-bottom: 14px;
  }

  .fourteen-swap-connect-slot__mobile {
    padding: 11px 12px;
    font-size: 11px;
  }

  .fourteen-swap-input,
  .fourteen-swap-estimate {
    min-height: 52px;
    padding-right: 92px;
    font-size: 22px;
  }

  .fourteen-swap-estimate__value {
    font-size: 22px;
  }

  .fourteen-swap-input__suffix,
  .fourteen-swap-estimate__suffix {
    right: 12px;
    gap: 6px;
    font-size: 14px;
  }

  .fourteen-swap-input__token-logo,
  .fourteen-swap-estimate__token-logo,
  .fourteen-swap-target-switch__logo,
  .fourteen-swap-route-card__token-logo {
    width: 18px;
    height: 18px;
  }

  .fourteen-swap-route-card {
    padding: 14px;
  }

  .fourteen-swap-route-card__receive {
    font-size: 28px;
  }

  .fourteen-swap-route-card__action {
    min-height: 48px;
    font-size: 12px;
  }

  .fourteen-swap-route-card__provider-logo {
    width: 30px;
    height: 30px;
  }

  .fourteen-swap-route-card__value {
    font-size: 14px;
  }

  .fourteen-swap-route-card__path-line {
    gap: 6px;
  }

  .fourteen-swap-route-card__detail--path {
    padding-right: 42px;
  }
}
```

---

## FILE: src/widgets/unlockTimeline/index.js

```js
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
      text: connectText,
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await wait(450);
          await refreshBalancesSafe();
        }
      },
      onRefresh: async () => {
        await refreshBalancesSafe();
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
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
```

---

## FILE: src/widgets/unlockTimeline/unlockTimeline.css

```css
:root {
  --fourteen-timeline-bg: rgba(17, 17, 17, 0.92);
  --fourteen-timeline-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-timeline-border: rgba(255, 255, 255, 0.08);
  --fourteen-timeline-text: rgba(255, 255, 255, 0.94);
  --fourteen-timeline-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-timeline-text-faint: rgba(255, 255, 255, 0.48);
  --fourteen-timeline-accent: rgb(255, 105, 0);
  --fourteen-timeline-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-timeline-green: rgb(26, 224, 58);
  --fourteen-timeline-red: rgb(255, 48, 73);
  --fourteen-timeline-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-timeline-radius: 16px;
  --fourteen-timeline-radius-sm: 12px;
}

.fourteen-timeline-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-timeline-text);
}

.fourteen-timeline-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HERO / HEADER
------------------------------------------------------- */

.fourteen-timeline-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-timeline-hero__bg {
  position: absolute;
  left: -14px;
  top: -18px;
  width: 60px;
  height: 60px;
  background-image: url('../../assets/text_bg.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.fourteen-timeline-hero__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-timeline-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-timeline-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-timeline-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.fourteen-timeline-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

.fourteen-timeline-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-timeline-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.fourteen-timeline-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
}

.fourteen-timeline-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-timeline-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.fourteen-timeline-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-timeline-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-timeline-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-timeline-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-timeline-text);
}

.fourteen-timeline-popover__text {
  font-size: 12px;
  line-height: 1.55;
  color: var(--fourteen-timeline-text-soft);
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-timeline-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-timeline-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-timeline-text-soft);
}

.fourteen-timeline-swap-link {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.24);
  background: rgba(255, 105, 0, 0.1);
  color: #ffffff;
  text-decoration: none;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.fourteen-timeline-swap-link:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.18);
}

.fourteen-timeline-connect-slot {
  margin-bottom: 16px;
}

.fourteen-timeline-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-timeline-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-timeline-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-timeline-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-timeline-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-timeline-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   SUMMARY / DETAILS
------------------------------------------------------- */

.fourteen-timeline-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.fourteen-timeline-summary-card {
  border: 1px solid var(--fourteen-timeline-border);
  border-radius: 14px;
  padding: 12px 14px;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
  box-shadow: none;
}

.fourteen-timeline-summary-label {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--fourteen-timeline-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fourteen-timeline-summary-value {
  font-size: 16px;
  font-weight: 800;
  color: var(--fourteen-timeline-text);
  line-height: 1.35;
  word-break: break-word;
}

.fourteen-timeline-details {
  margin-bottom: 16px;
}

.fourteen-timeline-placeholder {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  border: 1px solid var(--fourteen-timeline-border);
  font-size: 13px;
  line-height: 1.5;
  color: var(--fourteen-timeline-text-soft);
}

.fourteen-timeline-details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.fourteen-timeline-info-card {
  border: 1px solid var(--fourteen-timeline-border);
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(18, 18, 18, 0.98) 100%
  );
}

.fourteen-timeline-info-label {
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--fourteen-timeline-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fourteen-timeline-info-value {
  font-size: 15px;
  font-weight: 800;
  color: var(--fourteen-timeline-text);
  line-height: 1.45;
  word-break: break-word;
}

.fourteen-timeline-info-value--locked {
  color: #ffb38f;
}

.fourteen-timeline-info-value--available {
  color: #b6ffb6;
}

.fourteen-timeline-info-subvalue {
  margin-top: 6px;
  font-size: 12px;
  color: var(--fourteen-timeline-text-soft);
  line-height: 1.4;
}

.fourteen-timeline-status {
  margin-top: 10px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  line-height: 1.45;
  color: var(--fourteen-timeline-text-soft);
}

.fourteen-timeline-status[data-state="error"] {
  color: #ffd4db;
}

.fourteen-timeline-status[data-state="success"] {
  color: rgba(170, 255, 189, 0.95);
}

/* -------------------------------------------------------
   HISTORY
------------------------------------------------------- */

.fourteen-timeline-history {
  margin-top: 18px;
  overflow: hidden;
  border: 1px solid var(--fourteen-timeline-border);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
}

.fourteen-timeline-history-head {
  padding: 14px 16px;
  border-bottom: 1px solid var(--fourteen-timeline-border);
  background: rgba(255, 105, 0, 0.04);
}

.fourteen-timeline-history-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--fourteen-timeline-text);
}

.fourteen-timeline-history-subtitle {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.45;
  color: var(--fourteen-timeline-text-soft);
}

.fourteen-timeline-desktop-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.fourteen-timeline-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  font-size: 14px;
}

.fourteen-timeline-table th,
.fourteen-timeline-table td {
  padding: 12px 14px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--fourteen-timeline-text);
}

.fourteen-timeline-table th {
  background: rgba(255, 255, 255, 0.01);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--fourteen-timeline-text-faint);
}

.fourteen-timeline-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.01);
}

.fourteen-timeline-table tbody tr:hover {
  background: rgba(255, 105, 0, 0.03);
}

.fourteen-timeline-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.18s ease;
}

.fourteen-timeline-link:hover {
  color: var(--fourteen-timeline-accent);
}

.fourteen-timeline-mobile-list {
  display: none;
  padding: 14px;
  gap: 12px;
}

.fourteen-timeline-event-card {
  border: 1px solid var(--fourteen-timeline-border);
  border-radius: 14px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
}

.fourteen-timeline-event-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.fourteen-timeline-event-amount {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--fourteen-timeline-text);
  text-decoration: none;
  word-break: break-word;
}

.fourteen-timeline-event-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.fourteen-timeline-event-item {
  min-width: 0;
}

.fourteen-timeline-event-label {
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--fourteen-timeline-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fourteen-timeline-event-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--fourteen-timeline-text);
  line-height: 1.45;
  word-break: break-word;
}

.fourteen-timeline-countdown {
  font-weight: 800;
  color: #ffb38f;
}

.fourteen-timeline-status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.fourteen-timeline-status-pill.locked {
  color: #ffb38f;
  background: rgba(255, 105, 0, 0.12);
}

.fourteen-timeline-status-pill.unlocked {
  color: #b6ffb6;
  background: rgba(26, 224, 58, 0.12);
}

.fourteen-timeline-empty,
.fourteen-timeline-muted {
  padding: 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--fourteen-timeline-text-soft);
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 860px) {
  .fourteen-timeline-details-grid {
    grid-template-columns: 1fr;
  }

  .fourteen-timeline-hero__title {
    font-size: 36px;
  }

  .fourteen-timeline-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 640px) {
  .fourteen-timeline-summary {
    grid-template-columns: 1fr;
  }

  .fourteen-timeline-desktop-table-wrap {
    display: none;
  }

  .fourteen-timeline-mobile-list {
    display: grid;
  }

  .fourteen-timeline-topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-timeline-connect-slot__desktop {
    display: none;
  }

  .fourteen-timeline-connect-slot__mobile {
    display: block;
  }
}

@media (max-width: 560px) {
  .fourteen-timeline-hero {
    align-items: flex-start;
  }

  .fourteen-timeline-hero__title {
    font-size: 32px;
  }

  .fourteen-timeline-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-timeline-hero__actions {
    gap: 8px;
  }

  .fourteen-timeline-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-timeline-popover {
    width: min(320px, 94vw);
  }

  .fourteen-timeline-connect-slot {
    margin-bottom: 14px;
  }

  .fourteen-timeline-connect-slot__mobile {
    padding: 11px 12px;
    font-size: 11px;
  }

  .fourteen-timeline-history-head {
    padding: 13px 14px;
  }

  .fourteen-timeline-mobile-list {
    padding: 12px;
    gap: 10px;
  }

  .fourteen-timeline-event-card {
    padding: 13px;
  }
}
```
