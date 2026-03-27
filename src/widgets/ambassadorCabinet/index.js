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
  profileEndpoint: '/cabinet/profile',
  walletLookupEndpoint: '/ambassador/by-wallet',
  profileQueryParam: 'wallet',
  referralBaseUrl: 'https://4teen.me/?ref=',
  registerTitle: 'Not an ambassador yet',
  registerText:
    'This wallet is connected, but no ambassador profile was found. If you want to join the 4TEEN Ambassador Program, complete registration below.',
  infoTitle: 'What you can do inside this cabinet',
  infoContent:
    'This cabinet is your ambassador control panel. After connecting your wallet, it shows whether this wallet is already registered as an ambassador, your profile, tracked referral stats, reward state and withdrawal availability.\n\nIf rewards are already available, you can request withdrawal here. If part of rewards is still pending processing, the cabinet will show that state separately.\n\nIf this wallet is not registered yet, you can complete ambassador registration directly inside this cabinet.'
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

  if (text.includes('wallet is not connected') || text.includes('Wallet is not connected')) {
    return 'Wallet is not connected.';
  }

  if (text.includes('Tron wallet is not connected')) {
    return 'Wallet is not connected.';
  }

  if (text.includes('OUT_OF_ENERGY')) {
    return 'Transaction failed: OUT_OF_ENERGY.';
  }

  if (text.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (text.includes("owner_address isn't set") || text.includes('owner_address is not set')) {
    return 'Wallet session is connected, but contract reads are not ready in this browser wallet yet.';
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
  return wallet?.getTronWeb?.() || wallet?.getState?.()?.tronWeb || window?.tronWeb || null;
}

async function readJson(response) {
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

async function getConnectedWalletAddress(wallet) {
  const address = getWalletAddressSafe(wallet);

  if (!address) {
    throw new Error('Wallet is not connected');
  }

  return assertNonEmpty(address, 'wallet');
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
  const txid = await contract.withdrawRewards().send();

  return {
    txid: assertNonEmpty(txid, 'txid')
  };
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
    identity: result.identity || null,
    stats: result.stats || null,
    withdrawalQueue: result.withdrawalQueue || null
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

  const identity = profile?.identity || {};
  const stats = profile?.stats || {};
  const withdrawalQueue = profile?.withdrawalQueue || {};

  return {
    identity: {
      ...empty.identity,
      wallet: walletAddress,
      exists: true,
      active: profile?.status ? profile.status === 'active' : safeBoolean(identity.active),
      effectiveLevel: safeNumber(identity.level, 0),
      currentLevel: safeNumber(identity.level, 0),
      overrideLevel: 0,
      rewardPercent: safeNumber(identity.rewardPercent, 0),
      createdAt: safeNumber(identity.createdAt, 0),
      slugHash: safeString(identity.slugHash, '—'),
      metaHash: safeString(identity.metaHash, '—')
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
      currentLevel: safeNumber(identity.level, 0)
    },
    withdrawalQueue: {
      ...empty.withdrawalQueue,
      availableOnChainSun: safeString(withdrawalQueue.availableOnChainSun, '0'),
      availableOnChainTrx: safeString(withdrawalQueue.availableOnChainTrx, '0'),
      pendingBackendSyncSun: safeString(withdrawalQueue.pendingBackendSyncSun, '0'),
      pendingBackendSyncTrx: safeString(withdrawalQueue.pendingBackendSyncTrx, '0'),
      requestedForProcessingSun: safeString(withdrawalQueue.requestedForProcessingSun, '0'),
      requestedForProcessingTrx: safeString(withdrawalQueue.requestedForProcessingTrx, '0'),
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

    if (direct.startsWith('?')) {
      return `${window.location.origin}/${direct}`;
    }

    if (direct.startsWith('/')) {
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
        ${escapeHtml(String(count))} ${count === 1 ? 'purchase' : 'purchases'}
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
  return `
    ${createConnectedWalletSummary(walletAddress)}
    <div class="fourteen-ambassador-cabinet-empty">
      <div class="fourteen-ambassador-cabinet-empty__title">${escapeHtml(config.registerTitle)}</div>
      <div class="fourteen-ambassador-cabinet-empty__text">
        ${escapeHtml(config.registerText)}
      </div>
    </div>
    ${createSection('Ambassador registration', '<div data-role="register-slot"></div>')}
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
          levelToLabel(dashboard?.progress?.currentLevel ?? identity?.effectiveLevel ?? 0),
          `Current buyers: ${dashboard?.progress?.buyersCount ?? 0}`
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
        <div class="fourteen-ambassador-cabinet-hero">
          <div class="fourteen-ambassador-cabinet-hero__bg"></div>

          <div class="fourteen-ambassador-cabinet-hero__text">
            <div class="fourteen-ambassador-cabinet-hero__title">
              4TEEN <span>Ambassador Cabinet</span>
            </div>
            <div class="fourteen-ambassador-cabinet-hero__subtitle">
              ${escapeHtml(config.subtitle)}
            </div>
          </div>
        </div>

        <div class="fourteen-ambassador-cabinet-topbar">
          <div class="fourteen-ambassador-cabinet-wallet" data-role="wallet-label">
            Wallet not connected
          </div>

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
              ${state.isRefreshing || state.isWithdrawing ? 'disabled aria-disabled="true"' : ''}
            >
              ${state.isRefreshing ? 'Refreshing...' : escapeHtml(config.refreshText)}
            </button>
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
      variant: 'compact',
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
      backendProfile?.registered ||
        backendProfile?.slug ||
        backendProfile?.wallet
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
      backendProfile?.identity ||
        backendProfile?.stats ||
        backendProfile?.withdrawalQueue
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
    state.statusCards = buildStatusCards(null);
    state.hasProcessingWithdrawal = false;
    state.isLoading = false;
    state.isRefreshing = false;
    state.error = '';
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

  function bindEvents() {
    const refreshButton = root.querySelector('[data-role="refresh-button"]');
    const withdrawButton = root.querySelector('[data-role="withdraw-button"]');
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

    infoToggleEl?.addEventListener('click', togglePopover);
  }

  function mountRegisterWidgetIfNeeded() {
    if (!state.isConnected || !state.registrationKnown || state.isRegistered || state.isLoading) {
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
