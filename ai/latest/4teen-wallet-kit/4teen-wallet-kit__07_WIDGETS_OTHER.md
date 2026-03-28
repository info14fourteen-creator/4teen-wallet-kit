# 4teen-wallet-kit — WIDGETS OTHER

Generated: 2026-03-28T11:56:01.057Z
Repository: info14fourteen-creator/4teen-wallet-kit
Branch: main

## Snapshot rules

- This is a curated AI snapshot, not a full raw dump.
- Files are grouped for easier reading.
- Every file in this snapshot belongs to the repository shown above.

## Included files

- 4teen-wallet-kit :: src/widgets/ambassadorCabinet/ambassadorCabinet.css
- 4teen-wallet-kit :: src/widgets/ambassadorCabinet/index.js
- 4teen-wallet-kit :: src/widgets/ambassadorRegister/ambassadorRegister.css
- 4teen-wallet-kit :: src/widgets/ambassadorRegister/index.js
- 4teen-wallet-kit :: src/widgets/directBuy/directBuy.css
- 4teen-wallet-kit :: src/widgets/directBuy/index.js
- 4teen-wallet-kit :: src/widgets/liquidityController/index.js
- 4teen-wallet-kit :: src/widgets/liquidityController/liquidityController.css
- 4teen-wallet-kit :: src/widgets/mobileShell/index.js
- 4teen-wallet-kit :: src/widgets/unlockTimeline/index.js
- 4teen-wallet-kit :: src/widgets/unlockTimeline/unlockTimeline.css

---

## FILE: 4teen-wallet-kit :: src/widgets/ambassadorCabinet/ambassadorCabinet.css

```css
:root {
  --fourteen-cabinet-bg: rgba(17, 17, 17, 0.92);
  --fourteen-cabinet-bg-soft: rgba(255, 255, 255, 0.03);
  --fourteen-cabinet-bg-softer: rgba(255, 255, 255, 0.02);
  --fourteen-cabinet-border: rgba(255, 255, 255, 0.08);
  --fourteen-cabinet-border-strong: rgba(255, 255, 255, 0.12);
  --fourteen-cabinet-text: rgba(255, 255, 255, 0.94);
  --fourteen-cabinet-text-soft: rgba(255, 255, 255, 0.64);
  --fourteen-cabinet-text-faint: rgba(255, 255, 255, 0.46);
  --fourteen-cabinet-accent: rgb(255, 105, 0);
  --fourteen-cabinet-accent-soft: rgba(255, 105, 0, 0.14);
  --fourteen-cabinet-accent-strong: rgba(255, 105, 0, 0.2);
  --fourteen-cabinet-green: rgb(26, 224, 58);
  --fourteen-cabinet-green-soft: rgba(26, 224, 58, 0.12);
  --fourteen-cabinet-amber: rgb(255, 184, 0);
  --fourteen-cabinet-amber-soft: rgba(255, 184, 0, 0.12);
  --fourteen-cabinet-blue: rgb(84, 170, 255);
  --fourteen-cabinet-blue-soft: rgba(84, 170, 255, 0.12);
  --fourteen-cabinet-red: rgb(255, 48, 73);
  --fourteen-cabinet-red-soft: rgba(255, 48, 73, 0.12);
  --fourteen-cabinet-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  --fourteen-cabinet-radius: 16px;
  --fourteen-cabinet-radius-sm: 12px;
}

.fourteen-ambassador-cabinet-widget {
  position: relative;
  width: 100%;
  font-family: TTNorm, Inter, Arial, Helvetica, sans-serif;
  color: var(--fourteen-cabinet-text);
}

.fourteen-ambassador-cabinet-shell {
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* -------------------------------------------------------
   HEADER / HERO
------------------------------------------------------- */

.fourteen-ambassador-cabinet-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.fourteen-ambassador-cabinet-heading__text {
  min-width: 0;
  flex: 1 1 auto;
}

.fourteen-ambassador-cabinet-hero {
  position: relative;
  padding: 14px 0 12px 0;
  overflow: visible;
}

.fourteen-ambassador-cabinet-hero__bg {
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

.fourteen-ambassador-cabinet-hero__text {
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fourteen-ambassador-cabinet-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: #ffffff;
}

.fourteen-ambassador-cabinet-hero__title span {
  color: #ff6900;
  text-shadow: 0 0 14px rgba(255, 105, 0, 0.28);
}

.fourteen-ambassador-cabinet-hero__subtitle {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.45;
  max-width: 860px;
}

.fourteen-ambassador-cabinet-hero__actions {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 0 0 auto;
  position: relative;
  z-index: 3;
}

.fourteen-ambassador-cabinet-badge {
  flex: 0 0 auto;
  min-height: 24px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 105, 0, 0.22);
  background: rgba(255, 105, 0, 0.08);
  color: var(--fourteen-cabinet-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* -------------------------------------------------------
   ACTIONS / INFO
------------------------------------------------------- */

.fourteen-ambassador-cabinet-info-toggle-wrap {
  position: relative;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
}

.fourteen-ambassador-cabinet-info-toggle {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 0;
  background: var(--fourteen-cabinet-accent);
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

.fourteen-ambassador-cabinet-info-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-ambassador-cabinet-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(420px, 92vw);
  max-width: calc(100vw - 32px);
  padding: 14px;
  border-radius: 14px;
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid var(--fourteen-cabinet-border);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.36);
  z-index: 999;
  backdrop-filter: blur(14px);
}

.fourteen-ambassador-cabinet-popover__title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--fourteen-cabinet-text);
}

.fourteen-ambassador-cabinet-popover__text {
  font-size: 12px;
  line-height: 1.55;
  color: var(--fourteen-cabinet-text-soft);
}

.fourteen-ambassador-cabinet-action {
  appearance: none;
  border: 1px solid rgba(255, 105, 0, 0.34);
  outline: 0;
  border-radius: 14px;
  min-height: 42px;
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 145, 52, 1) 0%,
    rgba(255, 105, 0, 0.96) 100%
  );
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(255, 105, 0, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease,
    opacity 0.18s ease;
  text-decoration: none;
}

.fourteen-ambassador-cabinet-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(255, 105, 0, 0.28);
  filter: brightness(1.03);
}

.fourteen-ambassador-cabinet-action:disabled,
.fourteen-ambassador-cabinet-action[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.52;
  transform: none;
  filter: none;
  box-shadow: none;
}

.fourteen-ambassador-cabinet-action--secondary {
  min-height: 36px;
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--fourteen-cabinet-text);
  border: 1px solid var(--fourteen-cabinet-border);
  box-shadow: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: none;
}

.fourteen-ambassador-cabinet-action--secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

/* -------------------------------------------------------
   TOPBAR / CONNECT
------------------------------------------------------- */

.fourteen-ambassador-cabinet-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.fourteen-ambassador-cabinet-wallet {
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--fourteen-cabinet-text-soft);
}

.fourteen-ambassador-cabinet-topbar__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex: 0 0 auto;
}

.fourteen-ambassador-cabinet-connect-slot {
  margin-bottom: 16px;
}

.fourteen-ambassador-cabinet-connect-slot__desktop {
  display: block;
  width: 100%;
}

.fourteen-ambassador-cabinet-connect-slot__desktop > .fw-wallet-root {
  display: block;
  width: 100%;
}

.fourteen-ambassador-cabinet-connect-slot__desktop .fw-wallet-button {
  width: 100%;
}

.fourteen-ambassador-cabinet-connect-slot__mobile {
  display: none;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-cabinet-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-cabinet-text-soft);
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

/* -------------------------------------------------------
   BANNERS / EMPTY STATES
------------------------------------------------------- */

.fourteen-ambassador-cabinet-banner {
  margin-bottom: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--fourteen-cabinet-border);
  background: var(--fourteen-cabinet-bg-soft);
  font-size: 13px;
  line-height: 1.5;
}

.fourteen-ambassador-cabinet-banner--neutral {
  color: var(--fourteen-cabinet-text-soft);
}

.fourteen-ambassador-cabinet-banner--error {
  color: #ffd4db;
  border-color: rgba(255, 48, 73, 0.24);
  background: rgba(255, 48, 73, 0.08);
}

.fourteen-ambassador-cabinet-empty {
  margin-bottom: 18px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid var(--fourteen-cabinet-border);
  background: linear-gradient(
    180deg,
    rgba(24, 24, 24, 0.94) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
}

.fourteen-ambassador-cabinet-empty__title {
  font-size: 16px;
  font-weight: 800;
  color: var(--fourteen-cabinet-text);
}

.fourteen-ambassador-cabinet-empty__text {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--fourteen-cabinet-text-soft);
}

/* -------------------------------------------------------
   GRID / CARDS
------------------------------------------------------- */

.fourteen-ambassador-cabinet-grid {
  display: grid;
  gap: 14px;
  margin-bottom: 14px;
}

.fourteen-ambassador-cabinet-grid:last-child {
  margin-bottom: 0;
}

.fourteen-ambassador-cabinet-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.fourteen-ambassador-cabinet-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.fourteen-ambassador-cabinet-grid--four {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.fourteen-ambassador-cabinet-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--fourteen-cabinet-border);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
  padding: 15px 16px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.fourteen-ambassador-cabinet-card--green {
  border-color: rgba(26, 224, 58, 0.32);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 0 0 1px rgba(26, 224, 58, 0.06);
}

.fourteen-ambassador-cabinet-card--amber {
  border-color: rgba(255, 184, 0, 0.32);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 0 0 1px rgba(255, 184, 0, 0.05);
}

.fourteen-ambassador-cabinet-card--blue {
  border-color: rgba(84, 170, 255, 0.32);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 0 0 1px rgba(84, 170, 255, 0.05);
}

.fourteen-ambassador-cabinet-card__label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--fourteen-cabinet-text-faint);
}

.fourteen-ambassador-cabinet-card__value {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.18;
  font-weight: 800;
  color: var(--fourteen-cabinet-text);
  word-break: break-word;
}

.fourteen-ambassador-cabinet-card__hint {
  margin-top: 7px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--fourteen-cabinet-text-soft);
  word-break: break-word;
}

/* -------------------------------------------------------
   SECTIONS / LINKS
------------------------------------------------------- */

.fourteen-ambassador-cabinet-section {
  margin-bottom: 14px;
  padding: 16px;
  border: 1px solid var(--fourteen-cabinet-border);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.98) 0%,
    rgba(15, 15, 15, 0.98) 100%
  );
}

.fourteen-ambassador-cabinet-section__title {
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 800;
  color: var(--fourteen-cabinet-text);
}

.fourteen-ambassador-cabinet-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.fourteen-ambassador-cabinet-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--fourteen-cabinet-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--fourteen-cabinet-text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;
}

.fourteen-ambassador-cabinet-link:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 105, 0, 0.28);
  background: rgba(255, 105, 0, 0.08);
  color: #ffffff;
}

.fourteen-ambassador-cabinet-link:focus-visible,
.fourteen-ambassador-cabinet-action:focus-visible,
.fourteen-ambassador-cabinet-info-toggle:focus-visible {
  outline: 2px solid rgba(255, 105, 0, 0.5);
  outline-offset: 2px;
}

.fourteen-ambassador-cabinet-section [data-role='register-slot'] {
  width: 100%;
}

.fourteen-ambassador-cabinet-section [data-role='register-slot'] > * {
  width: 100%;
}

.fourteen-ambassador-cabinet-section .fourteen-ambassador-cabinet-action {
  width: auto;
  max-width: 100%;
}

/* -------------------------------------------------------
   RESPONSIVE
------------------------------------------------------- */

@media (max-width: 1100px) {
  .fourteen-ambassador-cabinet-grid--four {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fourteen-ambassador-cabinet-grid--three {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .fourteen-ambassador-cabinet-hero__title {
    font-size: 36px;
  }

  .fourteen-ambassador-cabinet-popover {
    right: 0;
    left: auto;
  }
}

@media (max-width: 720px) {
  .fourteen-ambassador-cabinet-heading {
    flex-direction: column;
    align-items: stretch;
  }

  .fourteen-ambassador-cabinet-hero__actions {
    justify-content: space-between;
  }

  .fourteen-ambassador-cabinet-topbar__actions {
    justify-content: flex-start;
  }

  .fourteen-ambassador-cabinet-grid--two,
  .fourteen-ambassador-cabinet-grid--three,
  .fourteen-ambassador-cabinet-grid--four {
    grid-template-columns: 1fr;
  }

  .fourteen-ambassador-cabinet-section {
    padding: 14px;
  }

  .fourteen-ambassador-cabinet-card {
    padding: 14px;
  }

  .fourteen-ambassador-cabinet-card__value {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .fourteen-ambassador-cabinet-topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .fourteen-ambassador-cabinet-topbar__actions {
    width: 100%;
    justify-content: space-between;
  }

  .fourteen-ambassador-cabinet-action--secondary {
    flex: 1 1 auto;
  }

  .fourteen-ambassador-cabinet-connect-slot__desktop {
    display: none;
  }

  .fourteen-ambassador-cabinet-connect-slot__mobile {
    display: block;
  }

  .fourteen-ambassador-cabinet-links {
    flex-direction: column;
  }

  .fourteen-ambassador-cabinet-link,
  .fourteen-ambassador-cabinet-section .fourteen-ambassador-cabinet-action {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .fourteen-ambassador-cabinet-hero {
    align-items: flex-start;
    padding-top: 10px;
  }

  .fourteen-ambassador-cabinet-hero__title {
    font-size: 32px;
  }

  .fourteen-ambassador-cabinet-hero__subtitle {
    margin-top: 7px;
    font-size: 11px;
  }

  .fourteen-ambassador-cabinet-hero__actions {
    gap: 8px;
  }

  .fourteen-ambassador-cabinet-hero__bg {
    left: -10px;
    top: -14px;
    width: 52px;
    height: 52px;
  }

  .fourteen-ambassador-cabinet-popover {
    right: auto;
    left: 0;
    width: min(320px, 94vw);
    max-width: calc(100vw - 28px);
  }

  .fourteen-ambassador-cabinet-info-toggle {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }

  .fourteen-ambassador-cabinet-connect-slot {
    margin-bottom: 14px;
  }

  .fourteen-ambassador-cabinet-connect-slot__mobile {
    padding: 11px 12px;
    font-size: 11px;
  }

  .fourteen-ambassador-cabinet-banner,
  .fourteen-ambassador-cabinet-empty {
    margin-bottom: 12px;
  }
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/ambassadorCabinet/index.js

```js
import './ambassadorCabinet.css';
import { mountWalletButton } from '../../ui/walletButton.js';
import { mountAmbassadorRegister } from '../ambassadorRegister/index.js';
import {
  showSuccessNotice,
  showErrorNotice,
  showNeutralNotice
} from '../../ui/noticeCenter.js';

const ACTIVE_INSTANCES = new WeakMap();

const DEFAULT_CONTROLLER_CONTRACT = 'TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ';

const DEFAULT_CONFIG = {
  controllerContractAddress: DEFAULT_CONTROLLER_CONTRACT,
  backendBaseUrl: '',
  title: '4TEEN Ambassador Cabinet',
  subtitle: 'Profile, stats, rewards and withdrawals in one place',
  mobileConnectHint: 'Tap connect below to continue.',
  refreshText: 'Refresh',
  withdrawText: 'Withdraw rewards',
  processingText: 'Processing...',
  replayText: 'Process pending rewards',
  replayProcessingText: 'Processing pending rewards...',
  copyReferralText: 'Copy referral link',
  copyReferralSuccessText: 'Referral link copied.',
  profileEndpoint: '/cabinet/profile',
  walletLookupEndpoint: '/ambassador/by-wallet',
  replayPendingEndpoint: '/cabinet/replay-pending',
  profileQueryParam: 'wallet',
  referralBaseUrl: 'https://4teen.me/?r=',
  registrationPageUrl: 'https://4teen.me/a/reg',
  registrationMode: 'redirect',
  registerTitle: 'Not an ambassador yet',
  registerText:
    'This wallet is connected, but no ambassador profile was found. If you want to join the 4TEEN Ambassador Program, continue to registration.',
  infoTitle: 'What you can do inside this cabinet',
  infoContent:
    'This cabinet is your ambassador control panel. After connecting your wallet, it shows whether this wallet is already registered as an ambassador, your profile, tracked referral stats, reward state and withdrawal availability.\n\nIf rewards are already available, you can request withdrawal here. If part of rewards is still pending processing, the cabinet will show that state separately.\n\nIf rewards were not fully allocated earlier because of temporary resource limits, you can process pending rewards here.\n\nIf this wallet is not registered yet, you can continue to the ambassador registration page.'
};

function escapeHtml(value) {
  return String(value ?? '')
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
  return String(value || '').trim().replace(/\/+$/, '');
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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeString(value, fallback = '0') {
  if (value == null) return fallback;
  return String(value);
}

function safeNumber(value, fallback = 0) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'bigint') {
    return Number(value);
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function safeBoolean(value) {
  return Boolean(value);
}

function safeObject(value, fallback = null) {
  return value && typeof value === 'object' ? value : fallback;
}

function sunToTrxString(value) {
  const raw = safeString(value, '0');

  if (!raw || raw === '0') {
    return '0';
  }

  const negative = raw.startsWith('-');
  const digits = negative ? raw.slice(1) : raw;

  if (!/^\d+$/.test(digits)) {
    return '0';
  }

  const padded = digits.padStart(7, '0');
  const whole = padded.slice(0, -6) || '0';
  const fraction = padded.slice(-6).replace(/0+$/, '');
  const result = fraction ? `${whole}.${fraction}` : whole;

  return negative ? `-${result}` : result;
}

function formatDate(timestamp) {
  if (!timestamp) return '—';

  try {
    const normalized = timestamp > 1_000_000_000_000 ? timestamp : timestamp * 1000;
    const date = new Date(normalized);

    if (!Number.isFinite(date.getTime())) {
      return '—';
    }

    return date.toLocaleString();
  } catch {
    return '—';
  }
}

function levelToLabel(level) {
  if (level === 0) return 'Bronze';
  if (level === 1) return 'Silver';
  if (level === 2) return 'Gold';
  if (level === 3) return 'Platinum';
  return `Unknown (${level})`;
}

function isPositiveSun(value) {
  try {
    return BigInt(String(value || '0')) > 0n;
  } catch {
    return false;
  }
}

function normalizeError(error) {
  const raw =
    error?.message ||
    error?.error ||
    error?.data?.message ||
    error?.response?.data?.message ||
    error?.response?.message ||
    error?.responseJSON?.message ||
    error?.reason ||
    'Unknown error';

  const text = String(raw || '').trim();
  const lower = text.toLowerCase();

  if (
    lower.includes('user rejected') ||
    lower.includes('rejected by user') ||
    lower.includes('rejected') ||
    lower.includes('denied') ||
    lower.includes('confirmation declined') ||
    lower.includes('cancelled') ||
    lower.includes('canceled') ||
    lower.includes('declined by user') ||
    lower.includes('signature declined') ||
    lower.includes('signature rejected') ||
    lower.includes('contract validate error : user') ||
    lower.includes('the user canceled') ||
    lower.includes('cancel by user')
  ) {
    return 'Transaction was rejected in wallet.';
  }

  if (lower.includes('wallet is not connected')) {
    return 'Wallet is not connected.';
  }

  if (lower.includes('tron wallet is not connected')) {
    return 'Wallet is not connected.';
  }

  if (lower.includes('out_of_energy')) {
    return 'Transaction failed: OUT_OF_ENERGY.';
  }

  if (lower.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (lower.includes("owner_address isn't set") || lower.includes('owner_address is not set')) {
    return 'Wallet session is connected, but contract reads are not ready in this browser wallet yet.';
  }

  return text || 'Unknown error';
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
  return wallet?.getTronWeb?.() || wallet?.getState?.()?.tronWeb || window?.tronWeb || null;
}

async function readJson(response) {
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

async function getControllerContractInstance(wallet, controllerContractAddress) {
  const tronWeb = getActiveTronWeb(wallet);

  if (!tronWeb || !tronWeb.defaultAddress?.base58) {
    throw new Error('Tron wallet is not connected');
  }

  return await tronWeb.contract().at(controllerContractAddress);
}

async function withdrawRewards(wallet, controllerContractAddress) {
  const contract = await getControllerContractInstance(wallet, controllerContractAddress);
  const result = await contract.withdrawRewards().send();

  const txid =
    typeof result === 'string'
      ? result
      : result?.txid || result?.transaction?.txID || result?.txID || '';

  return {
    txid: assertNonEmpty(txid, 'txid')
  };
}

async function replayPendingRewards(config, walletAddress) {
  const baseUrl = normalizeBaseUrl(config.backendBaseUrl);

  if (!baseUrl) {
    throw new Error('Backend base URL is not configured');
  }

  const endpoint = String(config.replayPendingEndpoint || '/cabinet/replay-pending').trim();
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      wallet: walletAddress
    })
  });

  const payload = await readJson(response);

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || 'Failed to process pending rewards');
  }

  return payload?.result || payload || {};
}

async function copyToClipboard(value) {
  const text = String(value || '').trim();

  if (!text) {
    throw new Error('Nothing to copy');
  }

  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return true;
}

function createEmptyDashboard(walletAddress = '') {
  return {
    identity: {
      wallet: walletAddress,
      exists: false,
      active: false,
      selfRegistered: false,
      manualAssigned: false,
      overrideEnabled: false,
      effectiveLevel: 0,
      currentLevel: 0,
      overrideLevel: 0,
      rewardPercent: 0,
      createdAt: 0,
      slugHash: '—',
      metaHash: '—'
    },
    stats: {
      totalBuyers: 0,
      totalVolumeSun: '0',
      totalVolumeTrx: '0',
      totalRewardsAccruedSun: '0',
      totalRewardsAccruedTrx: '0',
      totalRewardsClaimedSun: '0',
      totalRewardsClaimedTrx: '0',
      claimableRewardsSun: '0',
      claimableRewardsTrx: '0'
    },
    rewards: {
      availableSun: '0',
      availableTrx: '0',
      withdrawnSun: '0',
      withdrawnTrx: '0',
      lifetimeSun: '0',
      lifetimeTrx: '0'
    },
    progress: {
      currentLevel: 0,
      buyersCount: 0,
      nextThreshold: 0,
      remainingToNextLevel: 0
    },
    withdrawalQueue: {
      availableOnChainSun: '0',
      availableOnChainTrx: '0',
      pendingBackendSyncSun: '0',
      pendingBackendSyncTrx: '0',
      requestedForProcessingSun: '0',
      requestedForProcessingTrx: '0',
      availableOnChainCount: 0,
      pendingBackendSyncCount: 0,
      requestedForProcessingCount: 0,
      hasProcessingWithdrawal: false
    }
  };
}

function normalizeRegisteredProfile(payload) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const result = payload.result && typeof payload.result === 'object' ? payload.result : payload;
  const slug = String(
    result.slug ||
      result.referralSlug ||
      result.referral_slug ||
      result.publicSlug ||
      ''
  ).trim();
  const wallet = String(result.wallet || result.ambassadorWallet || '').trim();
  const status = String(result.status || '').trim().toLowerCase();
  const referralLink = String(
    result.referralLink || result.referral_url || result.referralUrl || result.link || ''
  ).trim();

  const registered =
    result.registered === true ||
    result.exists === true ||
    result.isRegistered === true ||
    Boolean(slug || wallet || status);

  if (!registered) {
    return null;
  }

  return {
    registered: true,
    slug,
    wallet,
    status,
    referralLink,
    identity: safeObject(result.identity),
    stats: safeObject(result.stats),
    withdrawalQueue: safeObject(result.withdrawalQueue),
    progress: safeObject(result.progress)
  };
}

async function fetchProfileMaybe(config, walletAddress) {
  const baseUrl = normalizeBaseUrl(config.backendBaseUrl);

  if (!baseUrl) {
    return null;
  }

  const queryParam = config.profileQueryParam || 'wallet';
  const profileEndpoint = config.profileEndpoint || '/cabinet/profile';
  const walletLookupEndpoint = config.walletLookupEndpoint || '/ambassador/by-wallet';

  const urls = [
    `${baseUrl}${profileEndpoint}?${encodeURIComponent(queryParam)}=${encodeURIComponent(
      walletAddress
    )}`,
    `${baseUrl}${walletLookupEndpoint}?wallet=${encodeURIComponent(walletAddress)}`
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const payload = await readJson(response);

      if (response.status === 404) {
        if (url.includes(walletLookupEndpoint)) {
          return {
            registered: false
          };
        }
        continue;
      }

      if (!response.ok || !payload) {
        continue;
      }

      const normalized = normalizeRegisteredProfile(payload);

      if (normalized) {
        return normalized;
      }

      if (payload.ok === true && (payload.registered === false || payload.result == null)) {
        return {
          registered: false
        };
      }
    } catch (_) {}
  }

  return null;
}

function buildDashboardFromBackendProfile(profile, walletAddress) {
  const empty = createEmptyDashboard(walletAddress);

  const identity = safeObject(profile?.identity, {});
  const stats = safeObject(profile?.stats, {});
  const withdrawalQueue = safeObject(profile?.withdrawalQueue, {});
  const progress = safeObject(profile?.progress, {});

  return {
    identity: {
      ...empty.identity,
      wallet: walletAddress,
      exists: true,
      active: profile?.status ? profile.status === 'active' : safeBoolean(identity.active),
      effectiveLevel: safeNumber(identity.level, 0),
      currentLevel: safeNumber(identity.currentLevel, safeNumber(identity.level, 0)),
      overrideLevel: safeNumber(identity.overrideLevel, 0),
      rewardPercent: safeNumber(identity.rewardPercent, 0),
      createdAt: safeNumber(identity.createdAt, 0),
      slugHash: safeString(identity.slugHash, '—'),
      metaHash: safeString(identity.metaHash, '—'),
      selfRegistered: safeBoolean(identity.selfRegistered),
      manualAssigned: safeBoolean(identity.manualAssigned),
      overrideEnabled: safeBoolean(identity.overrideEnabled)
    },
    stats: {
      ...empty.stats,
      totalBuyers: safeNumber(stats.totalBuyers, 0),
      totalVolumeSun: safeString(stats.trackedVolumeSun, '0'),
      totalVolumeTrx: safeString(stats.trackedVolumeTrx, '0'),
      totalRewardsAccruedSun: safeString(stats.lifetimeRewardsSun, '0'),
      totalRewardsAccruedTrx: safeString(stats.lifetimeRewardsTrx, '0'),
      totalRewardsClaimedSun: safeString(stats.withdrawnRewardsSun, '0'),
      totalRewardsClaimedTrx: safeString(stats.withdrawnRewardsTrx, '0'),
      claimableRewardsSun: safeString(stats.claimableRewardsSun, '0'),
      claimableRewardsTrx: safeString(stats.claimableRewardsTrx, '0')
    },
    rewards: {
      ...empty.rewards,
      availableSun: safeString(stats.claimableRewardsSun, '0'),
      availableTrx: safeString(stats.claimableRewardsTrx, '0'),
      withdrawnSun: safeString(stats.withdrawnRewardsSun, '0'),
      withdrawnTrx: safeString(stats.withdrawnRewardsTrx, '0'),
      lifetimeSun: safeString(stats.lifetimeRewardsSun, '0'),
      lifetimeTrx: safeString(stats.lifetimeRewardsTrx, '0')
    },
    progress: {
      ...empty.progress,
      currentLevel: safeNumber(progress.currentLevel, safeNumber(identity.level, 0)),
      buyersCount: safeNumber(progress.buyersCount, safeNumber(stats.totalBuyers, 0)),
      nextThreshold: safeNumber(progress.nextThreshold, 0),
      remainingToNextLevel: safeNumber(progress.remainingToNextLevel, 0)
    },
    withdrawalQueue: {
      ...empty.withdrawalQueue,
      availableOnChainSun: safeString(withdrawalQueue.availableOnChainSun, '0'),
      availableOnChainTrx: safeString(
        withdrawalQueue.availableOnChainTrx,
        sunToTrxString(withdrawalQueue.availableOnChainSun)
      ),
      pendingBackendSyncSun: safeString(withdrawalQueue.pendingBackendSyncSun, '0'),
      pendingBackendSyncTrx: safeString(
        withdrawalQueue.pendingBackendSyncTrx,
        sunToTrxString(withdrawalQueue.pendingBackendSyncSun)
      ),
      requestedForProcessingSun: safeString(withdrawalQueue.requestedForProcessingSun, '0'),
      requestedForProcessingTrx: safeString(
        withdrawalQueue.requestedForProcessingTrx,
        sunToTrxString(withdrawalQueue.requestedForProcessingSun)
      ),
      availableOnChainCount: safeNumber(withdrawalQueue.availableOnChainCount, 0),
      pendingBackendSyncCount: safeNumber(withdrawalQueue.pendingBackendSyncCount, 0),
      requestedForProcessingCount: safeNumber(withdrawalQueue.requestedForProcessingCount, 0),
      hasProcessingWithdrawal: safeBoolean(withdrawalQueue.hasProcessingWithdrawal)
    }
  };
}

function buildReferralLink(config, profile, identity) {
  const direct =
    profile?.referralLink ||
    profile?.referral_url ||
    profile?.referralUrl ||
    profile?.link ||
    '';

  if (direct) {
    if (/^https?:\/\//i.test(direct)) {
      return direct;
    }

    if (typeof window !== 'undefined' && direct.startsWith('?')) {
      return `${window.location.origin}/${direct}`;
    }

    if (typeof window !== 'undefined' && direct.startsWith('/')) {
      return `${window.location.origin}${direct}`;
    }

    return direct;
  }

  const slug =
    profile?.slug ||
    profile?.referralSlug ||
    profile?.referral_slug ||
    profile?.publicSlug ||
    '';

  if (slug) {
    const base = String(config.referralBaseUrl || '').trim();

    if (!base) {
      return slug;
    }

    if (base.includes('{slug}')) {
      return base.replaceAll('{slug}', slug);
    }

    if (base.endsWith('=')) {
      return `${base}${slug}`;
    }

    return `${base.replace(/\/+$/, '')}/${slug}`;
  }

  if (identity?.slugHash && identity.slugHash !== '—') {
    return identity.slugHash;
  }

  return '—';
}

function buildWithdrawButtonLabel(state) {
  if (state.isWithdrawing) {
    return 'Processing withdrawal...';
  }

  if (state.hasProcessingWithdrawal || state.statusCards.hasRequestedForProcessing) {
    return 'Requested for processing';
  }

  if (state.statusCards.hasPendingBackendSync && !state.statusCards.hasAvailableOnChain) {
    return 'Prepare withdrawal request';
  }

  if (state.statusCards.hasAvailableOnChain) {
    return 'Withdraw rewards';
  }

  return 'No rewards available';
}

function buildReplayButtonLabel(config, state) {
  if (state.isReplayingPending) {
    return config.replayProcessingText || 'Processing pending rewards...';
  }

  return config.replayText || 'Process pending rewards';
}

function buildWithdrawHint(state) {
  if (state.statusCards.hasRequestedForProcessing) {
    return 'Your withdrawal request was created and is waiting for backend processing.';
  }

  if (state.statusCards.hasPendingBackendSync && state.statusCards.hasAvailableOnChain) {
    return 'Part of rewards is already available, and part is still waiting for backend sync.';
  }

  if (state.statusCards.hasPendingBackendSync) {
    return 'Rewards exist, but they are not yet fully available for withdrawal.';
  }

  if (state.statusCards.hasAvailableOnChain) {
    return 'These rewards are already available for withdrawal.';
  }

  return 'No rewards are currently available.';
}

function buildStatusCards(withdrawalQueue) {
  if (!withdrawalQueue) {
    return {
      availableOnChainSun: '0',
      pendingBackendSyncSun: '0',
      requestedForProcessingSun: '0',
      availableOnChainCount: 0,
      pendingBackendSyncCount: 0,
      requestedForProcessingCount: 0,
      hasAvailableOnChain: false,
      hasPendingBackendSync: false,
      hasRequestedForProcessing: false
    };
  }

  const availableOnChainSun = withdrawalQueue.availableOnChainSun || '0';
  const pendingBackendSyncSun = withdrawalQueue.pendingBackendSyncSun || '0';
  const requestedForProcessingSun = withdrawalQueue.requestedForProcessingSun || '0';

  const availableOnChainCount = withdrawalQueue.availableOnChainCount || 0;
  const pendingBackendSyncCount = withdrawalQueue.pendingBackendSyncCount || 0;
  const requestedForProcessingCount = withdrawalQueue.requestedForProcessingCount || 0;

  return {
    availableOnChainSun,
    pendingBackendSyncSun,
    requestedForProcessingSun,
    availableOnChainCount,
    pendingBackendSyncCount,
    requestedForProcessingCount,
    hasAvailableOnChain: isPositiveSun(availableOnChainSun) || availableOnChainCount > 0,
    hasPendingBackendSync:
      isPositiveSun(pendingBackendSyncSun) || pendingBackendSyncCount > 0,
    hasRequestedForProcessing:
      isPositiveSun(requestedForProcessingSun) || requestedForProcessingCount > 0
  };
}

function createValueCard(label, value, hint = '') {
  return `
    <div class="fourteen-ambassador-cabinet-card">
      <div class="fourteen-ambassador-cabinet-card__label">${escapeHtml(label)}</div>
      <div class="fourteen-ambassador-cabinet-card__value">${escapeHtml(value)}</div>
      ${hint ? `<div class="fourteen-ambassador-cabinet-card__hint">${escapeHtml(hint)}</div>` : ''}
    </div>
  `;
}

function createStatusCard(label, trxValue, sunValue, count, modifier) {
  return `
    <div class="fourteen-ambassador-cabinet-card fourteen-ambassador-cabinet-card--${escapeHtml(
      modifier
    )}">
      <div class="fourteen-ambassador-cabinet-card__label">${escapeHtml(label)}</div>
      <div class="fourteen-ambassador-cabinet-card__value">${escapeHtml(trxValue)} TRX</div>
      <div class="fourteen-ambassador-cabinet-card__hint">${escapeHtml(sunValue)} SUN</div>
      <div class="fourteen-ambassador-cabinet-card__hint">
        ${escapeHtml(String(count))} ${count === 1 ? 'reward entry' : 'reward entries'}
      </div>
    </div>
  `;
}

function createSection(title, content) {
  return `
    <div class="fourteen-ambassador-cabinet-section">
      <div class="fourteen-ambassador-cabinet-section__title">${escapeHtml(title)}</div>
      ${content}
    </div>
  `;
}

function createConnectedWalletSummary(walletAddress) {
  return `
    <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
      Connected wallet: ${escapeHtml(walletAddress)}
    </div>
  `;
}

function createConnectStateMarkup() {
  return `
    <div class="fourteen-ambassador-cabinet-empty">
      <div class="fourteen-ambassador-cabinet-empty__title">Connect wallet to continue</div>
      <div class="fourteen-ambassador-cabinet-empty__text">
        Connect your wallet to access your ambassador cabinet, view rewards, check referral status and manage your account.
      </div>
    </div>
  `;
}

function createRegistrationStateMarkup(config, walletAddress) {
  const registrationUrl = String(
    config.registrationPageUrl || 'https://4teen.me/a/reg'
  ).trim();
  const useRedirect = String(config.registrationMode || 'redirect') === 'redirect';

  return `
    ${createConnectedWalletSummary(walletAddress)}
    <div class="fourteen-ambassador-cabinet-empty">
      <div class="fourteen-ambassador-cabinet-empty__title">${escapeHtml(config.registerTitle)}</div>
      <div class="fourteen-ambassador-cabinet-empty__text">
        ${escapeHtml(config.registerText)}
      </div>

      ${
        useRedirect
          ? `
            <div class="fourteen-ambassador-cabinet-links" style="margin-top:16px;">
              <a
                class="fourteen-ambassador-cabinet-action"
                href="${escapeHtml(registrationUrl)}"
              >
                Go to Ambassador Registration
              </a>
            </div>
          `
          : createSection('Ambassador registration', '<div data-role="register-slot"></div>')
      }
    </div>
  `;
}

function createIdentitySection(config, state, walletAddress) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const identity = dashboard.identity ?? {};
  const profile = state.profile ?? null;
  const slugValue =
    profile?.slug ||
    profile?.referralSlug ||
    profile?.referral_slug ||
    profile?.publicSlug ||
    '—';
  const referralLink = buildReferralLink(config, profile, identity);
  const statusLabel =
    profile?.status
      ? profile.status.charAt(0).toUpperCase() + profile.status.slice(1)
      : identity?.active
        ? 'Active'
        : 'Inactive';

  return createSection(
    'Identity',
    `
      <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--two">
        ${createValueCard('Wallet', shortenAddress(walletAddress || '—'), walletAddress || '—')}
        ${createValueCard(
          'Ambassador status',
          statusLabel,
          `Level: ${levelToLabel(identity?.effectiveLevel ?? identity?.currentLevel ?? 0)}`
        )}
        ${createValueCard('Slug', slugValue, 'Public ambassador handle')}
        ${createValueCard(
          'Referral link',
          referralLink,
          slugValue !== '—' ? 'Public ambassador link' : 'Unavailable yet'
        )}
      </div>
    `
  );
}

function createRewardStatusSection(state) {
  return createSection(
    'Reward status',
    `
      <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
        ${createStatusCard(
          'Available now',
          sunToTrxString(state.statusCards.availableOnChainSun),
          state.statusCards.availableOnChainSun,
          state.statusCards.availableOnChainCount,
          'green'
        )}
        ${createStatusCard(
          'Pending backend sync',
          sunToTrxString(state.statusCards.pendingBackendSyncSun),
          state.statusCards.pendingBackendSyncSun,
          state.statusCards.pendingBackendSyncCount,
          'amber'
        )}
        ${createStatusCard(
          'Requested for processing',
          sunToTrxString(state.statusCards.requestedForProcessingSun),
          state.statusCards.requestedForProcessingSun,
          state.statusCards.requestedForProcessingCount,
          'blue'
        )}
      </div>
    `
  );
}

function createPerformanceSection(state, walletAddress) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const stats = dashboard.stats ?? {};
  const rewards = dashboard.rewards ?? {};
  const identity = dashboard.identity ?? {};
  const progress = dashboard.progress ?? {};

  return createSection(
    'Performance',
    `
      <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
        ${createValueCard('Total buyers', String(stats?.totalBuyers ?? 0))}
        ${createValueCard(
          'Tracked volume',
          `${stats?.totalVolumeTrx ?? '0'} TRX`,
          `${stats?.totalVolumeSun ?? '0'} SUN`
        )}
        ${createValueCard(
          'Claimable rewards',
          `${rewards?.availableTrx ?? '0'} TRX`,
          `${rewards?.availableSun ?? '0'} SUN`
        )}
      </div>
      <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
        ${createValueCard(
          'Reward percent',
          `${identity?.rewardPercent ?? 0}%`,
          `Effective level: ${levelToLabel(identity?.effectiveLevel ?? 0)}`
        )}
        ${createValueCard(
          'Current level',
          levelToLabel(progress?.currentLevel ?? identity?.effectiveLevel ?? 0),
          `Current buyers: ${progress?.buyersCount ?? stats?.totalBuyers ?? 0}`
        )}
        ${createValueCard('Created at', formatDate(identity?.createdAt ?? 0))}
      </div>
    `
  );
}

function createActionsSection(state, walletAddress, config) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const profile = state.profile ?? null;
  const identity = dashboard.identity ?? {};
  const referralLink = buildReferralLink(config, profile, identity);
  const walletExplorerUrl = walletAddress
    ? `https://tronscan.org/#/address/${walletAddress}`
    : '';
  const withdrawExplorerUrl = state.lastWithdrawTxid
    ? `https://tronscan.org/#/transaction/${state.lastWithdrawTxid}`
    : '';
  const withdrawButtonLabel = buildWithdrawButtonLabel(state);
  const replayButtonLabel = buildReplayButtonLabel(config, state);
  const canReplayPending =
    state.statusCards.hasPendingBackendSync &&
    !state.isReplayingPending &&
    !state.isWithdrawing;

  return createSection(
    'Actions',
    `
      <div class="fourteen-ambassador-cabinet-links">
        <button
          type="button"
          class="fourteen-ambassador-cabinet-action"
          data-role="withdraw-button"
          ${
            state.isWithdrawing ||
            state.hasProcessingWithdrawal ||
            state.statusCards.hasRequestedForProcessing ||
            (!state.statusCards.hasAvailableOnChain && !state.statusCards.hasPendingBackendSync)
              ? 'disabled aria-disabled="true"'
              : ''
          }
        >
          ${escapeHtml(withdrawButtonLabel)}
        </button>

        <button
          type="button"
          class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary"
          data-role="replay-button"
          ${canReplayPending ? '' : 'disabled aria-disabled="true"'}
        >
          ${escapeHtml(replayButtonLabel)}
        </button>

        ${
          referralLink && referralLink !== '—'
            ? `
              <button
                type="button"
                class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary"
                data-role="copy-referral-button"
              >
                ${escapeHtml(config.copyReferralText)}
              </button>
            `
            : ''
        }

        ${
          walletExplorerUrl
            ? `
              <a
                class="fourteen-ambassador-cabinet-link"
                href="${escapeHtml(walletExplorerUrl)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wallet on Tronscan
              </a>
            `
            : ''
        }

        ${
          withdrawExplorerUrl
            ? `
              <a
                class="fourteen-ambassador-cabinet-link"
                href="${escapeHtml(withdrawExplorerUrl)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Last withdrawal tx
              </a>
            `
            : ''
        }

        ${
          referralLink && referralLink !== '—'
            ? `
              <a
                class="fourteen-ambassador-cabinet-link"
                href="${escapeHtml(referralLink)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open referral link
              </a>
            `
            : ''
        }
      </div>
    `
  );
}

function createAdvancedSection(state, walletAddress) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const identity = dashboard.identity ?? {};
  const progress = dashboard.progress ?? {};
  const rewards = dashboard.rewards ?? {};
  const stats = dashboard.stats ?? {};

  return createSection(
    'Advanced details',
    `
      <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--two">
        ${createValueCard('Slug hash', identity?.slugHash || '—')}
        ${createValueCard('Meta hash', identity?.metaHash || '—')}
        ${createValueCard(
          'Registration mode',
          identity?.selfRegistered
            ? 'Self-registered'
            : identity?.manualAssigned
              ? 'Manually assigned'
              : state.isRegistered
                ? 'Registered'
                : '—'
        )}
        ${createValueCard(
          'Override',
          identity?.overrideEnabled ? 'Enabled' : 'Disabled',
          `Current: ${levelToLabel(identity?.currentLevel ?? 0)} • Override: ${levelToLabel(
            identity?.overrideLevel ?? 0
          )}`
        )}
        ${createValueCard(
          'Next threshold',
          String(progress?.nextThreshold ?? 0),
          'Buyers needed for next milestone'
        )}
        ${createValueCard(
          'Remaining',
          String(progress?.remainingToNextLevel ?? 0),
          'Buyers left to next level'
        )}
        ${createValueCard(
          'Lifetime rewards',
          `${rewards?.lifetimeTrx ?? '0'} TRX`,
          `${rewards?.lifetimeSun ?? '0'} SUN`
        )}
        ${createValueCard(
          'Withdrawn rewards',
          `${rewards?.withdrawnTrx ?? '0'} TRX`,
          `${rewards?.withdrawnSun ?? '0'} SUN`
        )}
        ${createValueCard(
          'Accrued total',
          `${stats?.totalRewardsAccruedTrx ?? '0'} TRX`,
          `${stats?.totalRewardsAccruedSun ?? '0'} SUN`
        )}
        ${createValueCard('Tracked wallet', walletAddress || '—')}
      </div>
    `
  );
}

function createDashboardStateMarkup(config, state, walletAddress) {
  return `
    ${createConnectedWalletSummary(walletAddress)}

    <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
      ${escapeHtml(buildWithdrawHint(state))}
    </div>

    ${createIdentitySection(config, state, walletAddress)}
    ${createRewardStatusSection(state)}
    ${createPerformanceSection(state, walletAddress)}
    ${createActionsSection(state, walletAddress, config)}
    ${createAdvancedSection(state, walletAddress)}
  `;
}

function createMarkup(config, state, walletAddress) {
  let stateMarkup = '';

  if (state.isLoading) {
    stateMarkup = `
      <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
        Loading ambassador cabinet...
      </div>
    `;
  } else if (!state.isConnected) {
    stateMarkup = createConnectStateMarkup();
  } else if (state.registrationKnown && !state.isRegistered) {
    stateMarkup = createRegistrationStateMarkup(config, walletAddress);
  } else if (!state.registrationKnown) {
    stateMarkup = `
      ${createConnectedWalletSummary(walletAddress)}
      <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
        Checking ambassador profile...
      </div>
    `;
  } else {
    stateMarkup = createDashboardStateMarkup(config, state, walletAddress);
  }

  return `
    <div class="fourteen-ambassador-cabinet-widget">
      <div class="fourteen-ambassador-cabinet-shell">
        <div class="fourteen-ambassador-cabinet-heading">
          <div class="fourteen-ambassador-cabinet-heading__text">
            <div class="fourteen-ambassador-cabinet-hero">
              <div class="fourteen-ambassador-cabinet-hero__bg"></div>

              <div class="fourteen-ambassador-cabinet-hero__text">
                <h2 class="fourteen-ambassador-cabinet-hero__title">
                  4TEEN <span>Ambassador Cabinet</span>
                </h2>

                <div class="fourteen-ambassador-cabinet-hero__subtitle">
                  ${escapeHtml(config.subtitle)}
                </div>
              </div>
            </div>
          </div>

          <div class="fourteen-ambassador-cabinet-hero__actions">
            <div class="fourteen-ambassador-cabinet-badge">Ambassador</div>

            <div class="fourteen-ambassador-cabinet-topbar__actions">
              <div class="fourteen-ambassador-cabinet-info-toggle-wrap">
                <button
                  class="fourteen-ambassador-cabinet-info-toggle"
                  type="button"
                  aria-label="Cabinet info"
                  aria-expanded="false"
                  data-role="info-toggle"
                >
                  i
                </button>

                <div class="fourteen-ambassador-cabinet-popover" data-role="info-popover" hidden>
                  <div class="fourteen-ambassador-cabinet-popover__title">${escapeHtml(config.infoTitle)}</div>
                  <div class="fourteen-ambassador-cabinet-popover__text">${escapeHtml(config.infoContent).replaceAll('\n', '<br><br>')}</div>
                </div>
              </div>

              <button
                type="button"
                class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary"
                data-role="refresh-button"
                ${state.isRefreshing || state.isWithdrawing || state.isReplayingPending ? 'disabled aria-disabled="true"' : ''}
              >
                ${state.isRefreshing ? 'Refreshing...' : escapeHtml(config.refreshText)}
              </button>
            </div>
          </div>
        </div>

        <div class="fourteen-ambassador-cabinet-topbar">
          <div class="fourteen-ambassador-cabinet-wallet" data-role="wallet-label">
            Wallet not connected
          </div>
        </div>

        <div class="fourteen-ambassador-cabinet-connect-slot">
          <div class="fourteen-ambassador-cabinet-connect-slot__desktop" data-role="embedded-wallet-button"></div>
          <div class="fourteen-ambassador-cabinet-connect-slot__mobile" data-role="mobile-connect-hint" hidden>
            ${escapeHtml(config.mobileConnectHint)}
          </div>
        </div>

        ${
          state.error
            ? `
              <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--error">
                ${escapeHtml(state.error)}
              </div>
            `
            : ''
        }

        ${stateMarkup}
      </div>
    </div>
  `;
}

export function mountAmbassadorCabinet(target, config = {}) {
  if (!target) {
    throw new Error('mountAmbassadorCabinet: target is required');
  }

  const wallet = getWalletSafe();

  if (!wallet) {
    throw new Error('Fourteen wallet instance is not loaded');
  }

  if (ACTIVE_INSTANCES.has(target)) {
    try {
      ACTIVE_INSTANCES.get(target).destroy();
    } catch (error) {
      console.error('Failed to destroy previous ambassador cabinet instance:', error);
    }
  }

  const resolvedConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };

  const state = {
    isLoading: true,
    isRefreshing: false,
    isWithdrawing: false,
    isReplayingPending: false,
    isConnected: false,
    registrationKnown: false,
    isRegistered: false,
    hasProcessingWithdrawal: false,
    error: '',
    dashboard: createEmptyDashboard(''),
    profile: null,
    statusCards: buildStatusCards(null),
    lastWithdrawTxid: null
  };

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let registerWidgetInstance = null;
  let resizeListenerBound = false;
  let refreshInFlight = null;
  let lastLoadedWalletAddress = '';

  const root = target;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
  }

  function closePopover() {
    const popoverEl = root.querySelector('[data-role="info-popover"]');
    const infoToggleEl = root.querySelector('[data-role="info-toggle"]');

    if (!popoverEl || !infoToggleEl) return;

    popoverEl.hidden = true;
    infoToggleEl.setAttribute('aria-expanded', 'false');
  }

  function togglePopover(event) {
    event?.stopPropagation?.();

    const popoverEl = root.querySelector('[data-role="info-popover"]');
    const infoToggleEl = root.querySelector('[data-role="info-toggle"]');

    if (!popoverEl || !infoToggleEl) return;

    const nextHidden = !popoverEl.hidden;
    popoverEl.hidden = nextHidden;
    infoToggleEl.setAttribute('aria-expanded', nextHidden ? 'false' : 'true');
  }

  function handleOutsideClick(event) {
    const widgetEl = root.querySelector('.fourteen-ambassador-cabinet-widget');

    if (!widgetEl?.contains(event.target)) {
      closePopover();
    }
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

  function destroyRegisterWidget() {
    try {
      registerWidgetInstance?.destroy?.();
    } catch (_) {}

    registerWidgetInstance = null;
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
    const connectSlotEl = root.querySelector('.fourteen-ambassador-cabinet-connect-slot');
    const embeddedWalletButtonEl = root.querySelector('[data-role="embedded-wallet-button"]');
    const mobileConnectHintEl = root.querySelector('[data-role="mobile-connect-hint"]');

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

    if (!embeddedWalletButtonEl) {
      return;
    }

    if (embeddedWalletUnmount) {
      return;
    }

    embeddedWalletUnmount = mountWalletButton(embeddedWalletButtonEl, {
      variant: 'hero',
      onConnectClick: async (walletId) => {
        if (typeof wallet.connect === 'function') {
          await wallet.connect(walletId);
          await wait(450);

          if (typeof wallet.refreshBalances === 'function') {
            await wallet.refreshBalances();
          }

          await refresh('initial', { force: true });
        }
      },
      onRefresh: async () => {
        if (typeof wallet.refreshBalances === 'function') {
          await wallet.refreshBalances();
        }
        await refresh('refresh', { force: true });
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
        await refresh('initial', { force: true });
      }
    });
  }

  async function loadData(mode = 'refresh', options = {}) {
    const initial = mode === 'initial';
    const force = options.force === true;

    const walletAddress = getWalletAddressSafe(wallet) || '';
    const connected = isConnectedSafe(wallet) && !!walletAddress;

    if (!connected) {
      state.isConnected = false;
      state.registrationKnown = false;
      state.isRegistered = false;
      state.dashboard = createEmptyDashboard('');
      state.profile = null;
      state.hasProcessingWithdrawal = false;
      state.statusCards = buildStatusCards(null);
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = '';
      lastLoadedWalletAddress = '';
      return;
    }

    state.isConnected = true;

    if (!force && lastLoadedWalletAddress === walletAddress && state.registrationKnown && !initial) {
      state.isLoading = false;
      state.isRefreshing = false;
      return;
    }

    const backendProfile = await fetchProfileMaybe(resolvedConfig, walletAddress);

    state.profile = backendProfile;
    state.registrationKnown = backendProfile !== null;
    state.isRegistered = Boolean(
      backendProfile?.registered || backendProfile?.slug || backendProfile?.wallet
    );

    if (state.registrationKnown && !state.isRegistered) {
      state.dashboard = createEmptyDashboard(walletAddress);
      state.statusCards = buildStatusCards(null);
      state.hasProcessingWithdrawal = false;
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = '';
      lastLoadedWalletAddress = walletAddress;
      return;
    }

    if (!state.registrationKnown) {
      state.dashboard = createEmptyDashboard(walletAddress);
      state.statusCards = buildStatusCards(null);
      state.hasProcessingWithdrawal = false;
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = '';
      lastLoadedWalletAddress = walletAddress;
      return;
    }

    const backendHasCabinetData = Boolean(
      backendProfile?.identity || backendProfile?.stats || backendProfile?.withdrawalQueue
    );

    if (state.registrationKnown && state.isRegistered && backendHasCabinetData) {
      const dashboard = buildDashboardFromBackendProfile(backendProfile, walletAddress);

      state.dashboard = dashboard;
      state.statusCards = buildStatusCards(dashboard.withdrawalQueue);
      state.hasProcessingWithdrawal = Boolean(dashboard.withdrawalQueue?.hasProcessingWithdrawal);
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = '';
      lastLoadedWalletAddress = walletAddress;
      return;
    }

    state.dashboard = createEmptyDashboard(walletAddress);
    state.dashboard.identity.exists = state.isRegistered;
    state.dashboard.identity.active =
      backendProfile?.status ? backendProfile.status === 'active' : false;
    state.isLoading = false;
    state.isRefreshing = false;
    state.error = '';
    state.statusCards = buildStatusCards(state.dashboard.withdrawalQueue);
    state.hasProcessingWithdrawal = Boolean(state.dashboard.withdrawalQueue?.hasProcessingWithdrawal);
    lastLoadedWalletAddress = walletAddress;
  }

  async function refresh(mode = 'refresh', options = {}) {
    if (!isAlive()) {
      return;
    }

    if (refreshInFlight) {
      return refreshInFlight;
    }

    const initial = mode === 'initial';

    if (initial) {
      state.isLoading = true;
      state.isRefreshing = false;
    } else {
      state.isRefreshing = true;
    }

    state.error = '';
    render();

    refreshInFlight = (async () => {
      try {
        await loadData(mode, options);
      } catch (error) {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = normalizeError(error);

        if (!state.isConnected) {
          state.registrationKnown = false;
          state.isRegistered = false;
          state.hasProcessingWithdrawal = false;
          state.dashboard = createEmptyDashboard('');
          state.profile = null;
          state.statusCards = buildStatusCards(null);
          lastLoadedWalletAddress = '';
        }
      } finally {
        refreshInFlight = null;
        render();
      }
    })();

    return refreshInFlight;
  }

  async function handleWithdraw() {
    if (!state.isRegistered) {
      return;
    }

    state.isWithdrawing = true;
    state.error = '';
    render();

    try {
      const result = await withdrawRewards(wallet, resolvedConfig.controllerContractAddress);
      state.lastWithdrawTxid = result.txid;
      showSuccessNotice('Withdrawal request submitted.', 8000);
      await refresh('refresh', { force: true });
    } catch (error) {
      const message = normalizeError(error);
      state.error = message;
      showErrorNotice(message, 10000);
      render();
    } finally {
      state.isWithdrawing = false;
      render();
    }
  }

  async function handleReplayPending() {
    if (!state.isRegistered) {
      return;
    }

    const walletAddress = getWalletAddressSafe(wallet);

    if (!walletAddress) {
      state.error = 'Wallet is not connected.';
      render();
      return;
    }

    if (!state.statusCards.hasPendingBackendSync) {
      return;
    }

    state.isReplayingPending = true;
    state.error = '';
    render();

    try {
      const result = await replayPendingRewards(resolvedConfig, walletAddress);
      const totalFound = safeNumber(result.totalFound, 0);
      const attempted = safeNumber(result.attempted, totalFound);
      const succeeded = safeNumber(result.succeeded, 0);
      const failed = safeNumber(result.failed, 0);

      if (succeeded > 0 && failed === 0) {
        showSuccessNotice(`Processed ${succeeded} pending reward item(s).`, 8000);
      } else if (succeeded > 0 && failed > 0) {
        showNeutralNotice(
          `Processed ${succeeded} pending item(s), but ${failed} still failed.`,
          10000
        );
      } else if (attempted > 0 && failed > 0) {
        showErrorNotice(`No pending items were processed. Failed: ${failed}.`, 10000);
      } else if (totalFound === 0) {
        showNeutralNotice('No pending rewards were found for processing.', 7000);
      } else {
        showNeutralNotice('Pending rewards check completed.', 7000);
      }

      await refresh('refresh', { force: true });
    } catch (error) {
      const message = normalizeError(error);
      state.error = message;
      showErrorNotice(message, 10000);
      render();
    } finally {
      state.isReplayingPending = false;
      render();
    }
  }

  async function handleCopyReferral() {
    const dashboard = state.dashboard || createEmptyDashboard('');
    const referralLink = buildReferralLink(resolvedConfig, state.profile, dashboard.identity);

    if (!referralLink || referralLink === '—') {
      showNeutralNotice('Referral link is not available yet.', 5000);
      return;
    }

    try {
      await copyToClipboard(referralLink);
      showSuccessNotice(resolvedConfig.copyReferralSuccessText, 5000);
    } catch (error) {
      const message = normalizeError(error);
      showErrorNotice(message, 7000);
    }
  }

  function bindEvents() {
    const refreshButton = root.querySelector('[data-role="refresh-button"]');
    const withdrawButton = root.querySelector('[data-role="withdraw-button"]');
    const replayButton = root.querySelector('[data-role="replay-button"]');
    const copyReferralButton = root.querySelector('[data-role="copy-referral-button"]');
    const infoToggleEl = root.querySelector('[data-role="info-toggle"]');

    refreshButton?.addEventListener('click', () => {
      refresh('refresh', { force: true }).catch((error) => {
        console.error('Ambassador cabinet refresh failed:', error);
      });
    });

    withdrawButton?.addEventListener('click', () => {
      handleWithdraw().catch((error) => {
        console.error('Ambassador cabinet withdraw failed:', error);
      });
    });

    replayButton?.addEventListener('click', () => {
      handleReplayPending().catch((error) => {
        console.error('Ambassador cabinet replay pending failed:', error);
      });
    });

    copyReferralButton?.addEventListener('click', () => {
      handleCopyReferral().catch((error) => {
        console.error('Ambassador cabinet copy referral failed:', error);
      });
    });

    infoToggleEl?.addEventListener('click', togglePopover);
  }

  function mountRegisterWidgetIfNeeded() {
    if (!state.isConnected || !state.registrationKnown || state.isRegistered || state.isLoading) {
      destroyRegisterWidget();
      return;
    }

    const useRedirect = String(resolvedConfig.registrationMode || 'redirect') === 'redirect';

    if (useRedirect) {
      destroyRegisterWidget();
      return;
    }

    const slot = root.querySelector('[data-role="register-slot"]');

    if (!slot) {
      destroyRegisterWidget();
      return;
    }

    if (registerWidgetInstance) {
      return;
    }

    const registerOptions = {};

    if (resolvedConfig.backendBaseUrl) {
      registerOptions.backendBaseUrl = resolvedConfig.backendBaseUrl;
    }

    registerWidgetInstance = mountAmbassadorRegister(slot, registerOptions);

    const tryRefreshAfterRegistration = async () => {
      const connected = isConnectedSafe(wallet);
      const walletAddress = getWalletAddressSafe(wallet);

      if (!connected || !walletAddress) {
        return;
      }

      try {
        await refresh('refresh', { force: true });
      } catch (_) {}
    };

    setTimeout(tryRefreshAfterRegistration, 3000);
    setTimeout(tryRefreshAfterRegistration, 7000);
    setTimeout(tryRefreshAfterRegistration, 12000);
  }

  function handleResize() {
    if (!isAlive()) return;
    unmountEmbeddedWalletButton();
    syncEmbeddedWalletUi();
    closePopover();
  }

  function render() {
    const walletAddress = getWalletAddressSafe(wallet) || '';
    destroyRegisterWidget();
    unmountEmbeddedWalletButton();
    root.innerHTML = createMarkup(resolvedConfig, state, walletAddress);
    updateWalletLabel();
    syncEmbeddedWalletUi();
    bindEvents();
    mountRegisterWidgetIfNeeded();
  }

  document.addEventListener('click', handleOutsideClick);

  if (typeof wallet.subscribe === 'function') {
    walletUnsubscribe = wallet.subscribe(async () => {
      const currentWallet = getWalletAddressSafe(wallet) || '';
      const connected = isConnectedSafe(wallet);

      if (!connected) {
        await refresh('initial', { force: true }).catch((error) => {
          console.error('Ambassador cabinet wallet refresh failed:', error);
        });
        return;
      }

      if (currentWallet !== lastLoadedWalletAddress) {
        await refresh('refresh', { force: true }).catch((error) => {
          console.error('Ambassador cabinet wallet refresh failed:', error);
        });
      }
    });
  }

  if (typeof window !== 'undefined' && !resizeListenerBound) {
    window.addEventListener('resize', handleResize);
    resizeListenerBound = true;
  }

  const instance = {
    refresh: () => refresh('refresh', { force: true }),
    destroy() {
      isDestroyed = true;
      destroyRegisterWidget();
      unmountEmbeddedWalletButton();
      document.removeEventListener('click', handleOutsideClick);

      if (resizeListenerBound && typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        resizeListenerBound = false;
      }

      try {
        walletUnsubscribe?.();
      } catch (_) {}

      ACTIVE_INSTANCES.delete(target);
    }
  };

  ACTIVE_INSTANCES.set(target, instance);

  refresh('initial', { force: true }).catch((error) => {
    console.error('Ambassador cabinet initial load failed:', error);
    state.isLoading = false;
    state.error = normalizeError(error);
    render();
    showNeutralNotice('Cabinet loaded with limited state.', 5000);
  });

  return instance;
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/ambassadorRegister/ambassadorRegister.css

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

## FILE: 4teen-wallet-kit :: src/widgets/ambassadorRegister/index.js

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
  defaultSlug: '',
  infoTitle: 'What this registration does',
  infoText:
    'Your slug becomes your public ambassador handle and can be changed later. Registration itself is executed as a real blockchain action.\n\n' +
    'If your wallet does not have enough free bandwidth and energy, a small amount of TRX may be used to complete the transaction.\n\n' +
    'Slug availability is checked before registration.\n' +
    'Registration is confirmed on-chain.\n' +
    'Service mapping is stored in a protected backend layer.\n' +
    'Your referral link is generated after successful registration.\n\n' +
    'Telegram linking and additional profile actions will be handled later through the ambassador cabinet layer.',
  walletLookupEndpoint: '/ambassador/by-wallet',
  cabinetUrl: 'https://4teen.me/a/cab',
  redirectIfRegistered: false,
  registeredTitle: 'Already registered',
  registeredText: 'This wallet is already registered as ambassador.',
  registeredButtonText: 'Already Registered',
  cabinetButtonText: 'Open Ambassador Cabinet'
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

function buildWalletLookupUrl(backendBaseUrl, endpoint, walletAddress) {
  const baseUrl = normalizeBaseUrl(backendBaseUrl);
  const normalizedEndpoint = String(endpoint || '/ambassador/by-wallet').trim() || '/ambassador/by-wallet';
  const path = normalizedEndpoint.startsWith('/') ? normalizedEndpoint : `/${normalizedEndpoint}`;

  return `${baseUrl}${path}?wallet=${encodeURIComponent(walletAddress)}`;
}

function normalizeRegisteredProfile(payload) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const result = payload.result && typeof payload.result === 'object' ? payload.result : payload;
  const slug = normalizeSlug(result.slug || result.referralSlug || result.handle || '');
  const wallet = String(result.wallet || result.ambassadorWallet || '').trim();
  const status = String(result.status || '').trim().toLowerCase();
  const referralLinkRaw = String(result.referralLink || result.link || '').trim();

  if (!slug && !wallet && !status) {
    return null;
  }

  return {
    slug,
    wallet,
    status,
    referralLink: referralLinkRaw ? buildReferralLink(referralLinkRaw) : ''
  };
}

function isRegisteredProfilePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  if (payload.registered === true) {
    return true;
  }

  if (payload.exists === true) {
    return true;
  }

  if (payload.isRegistered === true) {
    return true;
  }

  const result = payload.result && typeof payload.result === 'object' ? payload.result : null;

  if (result?.registered === true || result?.exists === true || result?.isRegistered === true) {
    return true;
  }

  const profile = normalizeRegisteredProfile(payload);

  if (!profile) {
    return false;
  }

  return Boolean(profile.slug || profile.wallet || profile.status);
}

async function lookupAmbassadorByWallet(backendBaseUrl, endpoint, walletAddress) {
  const response = await fetch(buildWalletLookupUrl(backendBaseUrl, endpoint, walletAddress), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const payload = await readJson(response);

  if (response.status === 404) {
    return {
      found: false,
      profile: null
    };
  }

  if (!response.ok) {
    throw new Error((payload && payload.error) || 'Failed to check ambassador profile');
  }

  if (!payload || payload.ok === false) {
    throw new Error((payload && payload.error) || 'Failed to check ambassador profile');
  }

  if (!isRegisteredProfilePayload(payload)) {
    return {
      found: false,
      profile: null
    };
  }

  return {
    found: true,
    profile: normalizeRegisteredProfile(payload)
  };
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

function buildPopoverTextHtml(value) {
  const text = String(value || '').trim();

  if (!text) {
    return '';
  }

  return text
    .split(/\n{2,}/)
    .map((paragraph) => {
      const html = escapeHtml(paragraph).replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    })
    .join('');
}

function createMarkup(config, state, isConnected) {
  const statusState = state.error
    ? 'error'
    : state.success
      ? 'success'
      : state.registeredProfile
        ? 'success'
        : 'default';

  const isRegistered = Boolean(state.registeredProfile);
  const isBusy = state.loading || state.registrationCheckLoading;
  const submitDisabled = state.loading || state.registrationCheckLoading || !isConnected || isRegistered;
  const submitLabel = state.loading
    ? 'Registering...'
    : state.registrationCheckLoading
      ? 'Checking wallet...'
      : isRegistered
        ? config.registeredButtonText
        : 'Register Ambassador';

  const statusText = state.error
    ? state.error
    : state.success
      ? 'Registration completed successfully.'
      : state.registrationCheckLoading
        ? 'Checking ambassador profile for this wallet...'
        : !isConnected
          ? 'Connect your wallet to activate registration.'
          : isRegistered
            ? config.registeredText
            : '';

  const registeredProfile = state.registeredProfile;

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
                <div class="fourteen-ambassador-popover__title">${escapeHtml(config.infoTitle)}</div>
                <div class="fourteen-ambassador-popover__text">
                  ${buildPopoverTextHtml(config.infoText)}
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
                ${isRegistered ? 'readonly aria-readonly="true"' : ''}
                ${isBusy ? 'disabled aria-disabled="true"' : ''}
              />
            </span>
          </label>

          <button
            type="button"
            class="fourteen-ambassador-button"
            id="fourteen-ambassador-submit"
            ${submitDisabled ? 'disabled aria-disabled="true"' : ''}
          >
            ${escapeHtml(submitLabel)}
          </button>
        </div>

        <div class="fourteen-ambassador-status" data-state="${statusState}" role="status" aria-live="polite">
          ${escapeHtml(statusText)}
        </div>

        ${
          isRegistered
            ? `
              <div class="fourteen-ambassador-summary">
                <div class="fourteen-ambassador-summary-card">
                  <div class="fourteen-ambassador-summary-label">${escapeHtml(config.registeredTitle)}</div>
                  <div class="fourteen-ambassador-summary-value">${escapeHtml(registeredProfile.slug || '—')}</div>
                </div>

                ${
                  registeredProfile.status
                    ? `
                      <div class="fourteen-ambassador-summary-card">
                        <div class="fourteen-ambassador-summary-label">Status</div>
                        <div class="fourteen-ambassador-summary-value">${escapeHtml(registeredProfile.status)}</div>
                      </div>
                    `
                    : ''
                }

                <div class="fourteen-ambassador-summary-card" style="grid-column: 1 / -1;">
                  <div class="fourteen-ambassador-summary-label">Cabinet</div>
                  <div class="fourteen-ambassador-summary-value">
                    <a
                      class="fourteen-ambassador-link"
                      href="${escapeHtml(config.cabinetUrl)}"
                    >
                      ${escapeHtml(config.cabinetButtonText)}
                    </a>
                  </div>
                </div>

                ${
                  registeredProfile.referralLink
                    ? `
                      <div class="fourteen-ambassador-summary-card" style="grid-column: 1 / -1;">
                        <div class="fourteen-ambassador-summary-label">Referral link</div>
                        <div class="fourteen-ambassador-summary-value">
                          <a
                            class="fourteen-ambassador-link"
                            href="${escapeHtml(registeredProfile.referralLink)}"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ${escapeHtml(registeredProfile.referralLink)}
                          </a>
                        </div>
                      </div>
                    `
                    : ''
                }
              </div>
            `
            : ''
        }

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

                <div class="fourteen-ambassador-summary-card" style="grid-column: 1 / -1;">
                  <div class="fourteen-ambassador-summary-label">Cabinet</div>
                  <div class="fourteen-ambassador-summary-value">
                    <a
                      class="fourteen-ambassador-link"
                      href="${escapeHtml(config.cabinetUrl)}"
                    >
                      ${escapeHtml(config.cabinetButtonText)}
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
    registrationCheckLoading: false,
    error: '',
    success: null,
    registeredProfile: null
  };

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;
  let lastCheckedWallet = '';
  let activeRegistrationCheckId = 0;
  let notifiedRegisteredWallet = '';
  let redirectScheduledForWallet = '';

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
    const connectSlotEl = root.querySelector('.fourteen-ambassador-connect-slot');
    const embeddedWalletButtonEl = root.querySelector('[data-role="embedded-wallet-button"]');
    const mobileConnectHintEl = root.querySelector('[data-role="mobile-connect-hint"]');

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

  function applyRegisteredProfile(profile) {
    state.registeredProfile = profile || null;
    state.success = null;
    state.error = '';

    if (profile?.slug) {
      state.slug = profile.slug;
    }
  }

  function clearRegisteredProfile() {
    state.registeredProfile = null;
  }

  async function maybeRedirectRegistered(walletAddress) {
    if (!resolvedConfig.redirectIfRegistered) {
      return;
    }

    if (!walletAddress || redirectScheduledForWallet === walletAddress) {
      return;
    }

    redirectScheduledForWallet = walletAddress;
    showNeutralNotice('Wallet is already registered. Opening ambassador cabinet...', 4000);
    await wait(600);

    if (typeof window !== 'undefined') {
      window.location.href = resolvedConfig.cabinetUrl;
    }
  }

  async function syncRegisteredStateFromWallet(options = {}) {
    const { force = false, silent = false } = options;
    const connected = isConnectedSafe(wallet);
    const walletAddress = getWalletAddressSafe(wallet);

    if (!connected || !walletAddress) {
      lastCheckedWallet = '';
      activeRegistrationCheckId += 1;
      state.registrationCheckLoading = false;
      clearRegisteredProfile();

      if (!state.success) {
        state.error = '';
      }

      render();
      return;
    }

    if (!force && lastCheckedWallet === walletAddress) {
      return;
    }

    lastCheckedWallet = walletAddress;
    const checkId = ++activeRegistrationCheckId;

    state.registrationCheckLoading = true;

    if (!silent) {
      state.error = '';
    }

    render();

    try {
      const lookup = await lookupAmbassadorByWallet(
        resolvedConfig.backendBaseUrl,
        resolvedConfig.walletLookupEndpoint,
        walletAddress
      );

      if (!isAlive() || checkId !== activeRegistrationCheckId) {
        return;
      }

      if (lookup.found && lookup.profile) {
        applyRegisteredProfile(lookup.profile);
        state.registrationCheckLoading = false;
        render();

        if (notifiedRegisteredWallet !== walletAddress) {
          notifiedRegisteredWallet = walletAddress;
          showNeutralNotice('This wallet is already registered as ambassador.', 7000);
        }

        await maybeRedirectRegistered(walletAddress);
        return;
      }

      clearRegisteredProfile();
      state.registrationCheckLoading = false;
      state.error = '';
      render();
    } catch (error) {
      if (!isAlive() || checkId !== activeRegistrationCheckId) {
        return;
      }

      state.registrationCheckLoading = false;
      clearRegisteredProfile();
      render();

      const message = normalizeError(error);
      console.error('Ambassador profile lookup failed:', error);

      if (!silent) {
        showErrorNotice(message, 8000);
      }
    }
  }

  async function runRegistration() {
    const tronWeb = getActiveTronWeb(wallet);
    const walletAddress = getWalletAddressSafe(wallet);

    if (!tronWeb || !walletAddress) {
      throw new Error('Wallet is not connected');
    }

    if (state.registeredProfile) {
      showNeutralNotice('This wallet is already registered as ambassador.', 7000);
      return;
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

      state.registeredProfile = {
        slug,
        wallet: walletAddress,
        status: 'active',
        referralLink: state.success.referralLink
      };

      lastCheckedWallet = walletAddress;

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
        showNeutralNotice('Connect your wallet first.', 5000);
        return;
      }

      if (state.registrationCheckLoading) {
        showNeutralNotice('Checking ambassador profile for this wallet...', 5000);
        return;
      }

      if (state.registeredProfile) {
        showNeutralNotice('This wallet is already registered as ambassador.', 7000);
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
      if (state.registeredProfile || state.loading || state.registrationCheckLoading) {
        slugInput.value = state.slug;
        return;
      }

      const normalized = normalizeSlug(slugInput.value);
      state.slug = normalized;
      slugInput.value = normalized;
    });

    submitButton?.addEventListener('click', handleSubmit);
    infoToggleEl?.addEventListener('click', togglePopover);
  }

  async function refreshUi(options = {}) {
    if (!isAlive()) {
      return;
    }

    render();
    await syncRegisteredStateFromWallet(options);
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
      refreshUi({ force: true, silent: true }).catch((error) => {
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

  refreshUi({ force: true, silent: true }).catch((error) => {
    console.error('Failed to initialize ambassador register widget:', error);
    render();
  });

  return instance;
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/directBuy/directBuy.css

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

## FILE: 4teen-wallet-kit :: src/widgets/directBuy/index.js

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
  const connectSlotEl = target.querySelector('.fourteen-buy-connect-slot');
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
      await refreshUI();
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

## FILE: 4teen-wallet-kit :: src/widgets/liquidityController/index.js

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

## FILE: 4teen-wallet-kit :: src/widgets/liquidityController/liquidityController.css

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

## FILE: 4teen-wallet-kit :: src/widgets/mobileShell/index.js

```js
// src/widgets/mobileShell/index.js

import { createMobileShell } from '../../ui/mobileShell.js';

export function mountMobileShell(options = {}) {
  return createMobileShell(options);
}
```

---

## FILE: 4teen-wallet-kit :: src/widgets/unlockTimeline/index.js

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
```

---

## FILE: 4teen-wallet-kit :: src/widgets/unlockTimeline/unlockTimeline.css

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
