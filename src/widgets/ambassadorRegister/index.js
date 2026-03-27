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
