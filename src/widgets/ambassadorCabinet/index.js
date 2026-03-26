import './ambassadorCabinet.css';
import { mountWalletButton } from '../../ui/walletButton.js';
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
  connectText: 'Connect Wallet',
  profileEndpoint: '/cabinet/profile',
  profileQueryParam: 'wallet',
  referralBaseUrl: 'https://4teen.me/?ref='
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

function pickTupleValue(source, index, key) {
  if (Array.isArray(source)) {
    return source[index];
  }

  if (source && typeof source === 'object') {
    if (key && key in source) {
      return source[key];
    }

    const numericKey = String(index);
    if (numericKey in source) {
      return source[numericKey];
    }

    const values = Object.values(source);
    return values[index];
  }

  return undefined;
}

function sunToTrxString(value) {
  const raw = safeString(value, '0');

  if (!raw || raw === '0') {
    return '0';
  }

  const negative = raw.startsWith('-');
  const digits = negative ? raw.slice(1) : raw;
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

function mapIdentity(walletAddress, coreRaw, profileRaw) {
  const exists = safeBoolean(pickTupleValue(coreRaw, 0, 'exists'));
  const active = safeBoolean(pickTupleValue(coreRaw, 1, 'active'));
  const effectiveLevel = safeNumber(pickTupleValue(coreRaw, 2, 'effectiveLevel'));
  const rewardPercent = safeNumber(pickTupleValue(coreRaw, 3, 'rewardPercent'));
  const createdAt = safeNumber(pickTupleValue(coreRaw, 4, 'createdAt'));

  const selfRegistered = safeBoolean(pickTupleValue(profileRaw, 0, 'selfRegistered'));
  const manualAssigned = safeBoolean(pickTupleValue(profileRaw, 1, 'manualAssigned'));
  const overrideEnabled = safeBoolean(pickTupleValue(profileRaw, 2, 'overrideEnabled'));
  const currentLevel = safeNumber(pickTupleValue(profileRaw, 3, 'currentLevel'));
  const overrideLevel = safeNumber(pickTupleValue(profileRaw, 4, 'overrideLevel'));
  const slugHash = safeString(pickTupleValue(profileRaw, 5, 'slugHash'), '—');
  const metaHash = safeString(pickTupleValue(profileRaw, 6, 'metaHash'), '—');

  return {
    wallet: walletAddress,
    exists,
    active,
    selfRegistered,
    manualAssigned,
    overrideEnabled,
    effectiveLevel,
    currentLevel,
    overrideLevel,
    rewardPercent,
    createdAt,
    slugHash,
    metaHash
  };
}

function mapStats(statsRaw) {
  const totalBuyers = safeNumber(pickTupleValue(statsRaw, 0, 'totalBuyers'));
  const totalVolumeSun = safeString(pickTupleValue(statsRaw, 1, 'totalVolumeSun'));
  const totalRewardsAccruedSun = safeString(
    pickTupleValue(statsRaw, 2, 'totalRewardsAccruedSun')
  );
  const totalRewardsClaimedSun = safeString(
    pickTupleValue(statsRaw, 3, 'totalRewardsClaimedSun')
  );
  const claimableRewardsSun = safeString(
    pickTupleValue(statsRaw, 4, 'claimableRewardsSun')
  );

  return {
    totalBuyers,
    totalVolumeSun,
    totalVolumeTrx: sunToTrxString(totalVolumeSun),
    totalRewardsAccruedSun,
    totalRewardsAccruedTrx: sunToTrxString(totalRewardsAccruedSun),
    totalRewardsClaimedSun,
    totalRewardsClaimedTrx: sunToTrxString(totalRewardsClaimedSun),
    claimableRewardsSun,
    claimableRewardsTrx: sunToTrxString(claimableRewardsSun)
  };
}

function mapRewards(payoutRaw) {
  const availableSun = safeString(pickTupleValue(payoutRaw, 0, 'claimableRewardsSun'));
  const lifetimeSun = safeString(pickTupleValue(payoutRaw, 1, 'totalRewardsAccruedSun'));
  const withdrawnSun = safeString(pickTupleValue(payoutRaw, 2, 'totalRewardsClaimedSun'));

  return {
    availableSun,
    availableTrx: sunToTrxString(availableSun),
    withdrawnSun,
    withdrawnTrx: sunToTrxString(withdrawnSun),
    lifetimeSun,
    lifetimeTrx: sunToTrxString(lifetimeSun)
  };
}

function mapProgress(progressRaw) {
  return {
    currentLevel: safeNumber(pickTupleValue(progressRaw, 0, 'currentLevel')),
    buyersCount: safeNumber(pickTupleValue(progressRaw, 1, 'buyersCount')),
    nextThreshold: safeNumber(pickTupleValue(progressRaw, 2, 'nextThreshold')),
    remainingToNextLevel: safeNumber(pickTupleValue(progressRaw, 3, 'remainingToNextLevel'))
  };
}

function mapWithdrawalQueue(raw, rewards) {
  if (!raw) {
    return {
      availableOnChainSun: rewards?.availableSun || '0',
      availableOnChainTrx: rewards?.availableTrx || '0',
      pendingBackendSyncSun: '0',
      pendingBackendSyncTrx: '0',
      requestedForProcessingSun: '0',
      requestedForProcessingTrx: '0',
      availableOnChainCount: 0,
      pendingBackendSyncCount: 0,
      requestedForProcessingCount: 0,
      hasProcessingWithdrawal: false
    };
  }

  const availableOnChainSun = safeString(pickTupleValue(raw, 0, 'availableOnChainSun'));
  const pendingBackendSyncSun = safeString(pickTupleValue(raw, 1, 'pendingBackendSyncSun'));
  const requestedForProcessingSun = safeString(
    pickTupleValue(raw, 2, 'requestedForProcessingSun')
  );
  const availableOnChainCount = safeNumber(pickTupleValue(raw, 3, 'availableOnChainCount'));
  const pendingBackendSyncCount = safeNumber(
    pickTupleValue(raw, 4, 'pendingBackendSyncCount')
  );
  const requestedForProcessingCount = safeNumber(
    pickTupleValue(raw, 5, 'requestedForProcessingCount')
  );
  const hasProcessingWithdrawal = safeBoolean(
    pickTupleValue(raw, 6, 'hasProcessingWithdrawal')
  );

  return {
    availableOnChainSun,
    availableOnChainTrx: sunToTrxString(availableOnChainSun),
    pendingBackendSyncSun,
    pendingBackendSyncTrx: sunToTrxString(pendingBackendSyncSun),
    requestedForProcessingSun,
    requestedForProcessingTrx: sunToTrxString(requestedForProcessingSun),
    availableOnChainCount,
    pendingBackendSyncCount,
    requestedForProcessingCount,
    hasProcessingWithdrawal
  };
}

async function readAmbassadorDashboard(wallet, controllerContractAddress) {
  const resolvedWallet = await getConnectedWalletAddress(wallet);
  const contract = await getControllerContractInstance(wallet, controllerContractAddress);

  const [coreRaw, profileRaw, statsRaw, payoutRaw, progressRaw] = await Promise.all([
    contract.getDashboardCore(resolvedWallet).call(),
    contract.getDashboardProfile(resolvedWallet).call(),
    contract.getDashboardStats(resolvedWallet).call(),
    contract.getAmbassadorPayoutData(resolvedWallet).call(),
    contract.getAmbassadorLevelProgress(resolvedWallet).call()
  ]);

  let withdrawalQueueRaw = null;

  if (typeof contract.getAmbassadorWithdrawalQueue === 'function') {
    withdrawalQueueRaw = await contract.getAmbassadorWithdrawalQueue(resolvedWallet).call();
  } else if (typeof contract.getDashboardWithdrawalQueue === 'function') {
    withdrawalQueueRaw = await contract.getDashboardWithdrawalQueue(resolvedWallet).call();
  }

  const identity = mapIdentity(resolvedWallet, coreRaw, profileRaw);
  const stats = mapStats(statsRaw);
  const rewards = mapRewards(payoutRaw);
  const progress = mapProgress(progressRaw);
  const withdrawalQueue = mapWithdrawalQueue(withdrawalQueueRaw, rewards);

  return {
    identity,
    stats,
    rewards,
    progress,
    withdrawalQueue
  };
}

async function withdrawRewards(wallet, controllerContractAddress) {
  const contract = await getControllerContractInstance(wallet, controllerContractAddress);
  const txid = await contract.withdrawRewards().send();

  return {
    txid: assertNonEmpty(txid, 'txid')
  };
}

async function fetchProfileMaybe(config, walletAddress) {
  const baseUrl = normalizeBaseUrl(config.backendBaseUrl);

  if (!baseUrl) {
    return null;
  }

  const queryParam = config.profileQueryParam || 'wallet';
  const endpoint = config.profileEndpoint || '/cabinet/profile';
  const url = `${baseUrl}${endpoint}?${encodeURIComponent(queryParam)}=${encodeURIComponent(
    walletAddress
  )}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const payload = await readJson(response);

    if (!response.ok || !payload) {
      return null;
    }

    return payload.result || payload.profile || payload.data || payload;
  } catch (_) {
    return null;
  }
}

function buildReferralLink(config, profile, identity) {
  const direct =
    profile?.referralLink ||
    profile?.referral_url ||
    profile?.referralUrl ||
    profile?.link ||
    '';

  if (direct) {
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
  if (!state.isRegistered) {
    return 'Ambassador profile required';
  }

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
    return 'Part of rewards is already on-chain, and part is still waiting for backend sync.';
  }

  if (state.statusCards.hasPendingBackendSync) {
    return 'Rewards exist, but they are not yet written on-chain.';
  }

  if (state.statusCards.hasAvailableOnChain) {
    return 'These rewards are already written on-chain and available now.';
  }

  return 'No rewards available for withdrawal yet.';
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

function createMarkup(config, state, walletAddress) {
  const dashboard = state.dashboard;
  const identity = dashboard?.identity ?? null;
  const stats = dashboard?.stats ?? null;
  const rewards = dashboard?.rewards ?? null;
  const progress = dashboard?.progress ?? null;
  const profile = state.profile ?? null;
  const referralLink = buildReferralLink(config, profile, identity);

  const walletExplorerUrl = walletAddress
    ? `https://tronscan.org/#/address/${walletAddress}`
    : '';

  const withdrawExplorerUrl = state.lastWithdrawTxid
    ? `https://tronscan.org/#/transaction/${state.lastWithdrawTxid}`
    : '';

  const withdrawButtonLabel = buildWithdrawButtonLabel(state);
  const withdrawHint = buildWithdrawHint(state);

  const withdrawDisabled =
    !state.isRegistered ||
    state.isWithdrawing ||
    state.hasProcessingWithdrawal ||
    state.statusCards.hasRequestedForProcessing ||
    (!state.statusCards.hasAvailableOnChain && !state.statusCards.hasPendingBackendSync);

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

          <div class="fourteen-ambassador-cabinet-hero__actions">
            <button
              type="button"
              class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary"
              data-role="refresh-button"
              ${state.isRefreshing || state.isWithdrawing ? 'disabled aria-disabled="true"' : ''}
            >
              ${state.isRefreshing ? 'Refreshing...' : escapeHtml(config.refreshText)}
            </button>

            <button
              type="button"
              class="fourteen-ambassador-cabinet-action"
              data-role="withdraw-button"
              ${withdrawDisabled ? 'disabled aria-disabled="true"' : ''}
            >
              ${escapeHtml(withdrawButtonLabel)}
            </button>
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
          state.isLoading
            ? `
              <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
                Loading ambassador dashboard...
              </div>
            `
            : ''
        }

        ${
          !state.isLoading
            ? `
              <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
                ${escapeHtml(withdrawHint)}
              </div>
            `
            : ''
        }

        ${
          state.error
            ? `
              <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--error">
                ${escapeHtml(state.error)}
              </div>
            `
            : ''
        }

        ${
          !state.isLoading && !state.isConnected
            ? `
              <div class="fourteen-ambassador-cabinet-empty">
                <div class="fourteen-ambassador-cabinet-empty__title">Connect wallet to continue</div>
                <div class="fourteen-ambassador-cabinet-empty__text">
                  This cabinet reads your ambassador data directly from the controller contract.
                </div>
              </div>
            `
            : ''
        }

        ${
          !state.isLoading && state.isConnected && !state.isRegistered
            ? `
              <div class="fourteen-ambassador-cabinet-empty">
                <div class="fourteen-ambassador-cabinet-empty__title">Ambassador profile not found</div>
                <div class="fourteen-ambassador-cabinet-empty__text">
                  This wallet is connected, but no ambassador profile is registered on-chain yet.
                </div>
              </div>
            `
            : ''
        }

        ${
          !state.isLoading && state.isConnected && state.isRegistered
            ? `
              <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
                ${createStatusCard(
                  'Available on-chain',
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

              <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
                ${createValueCard(
                  'Wallet',
                  state.isConnected ? 'Connected' : 'Not connected',
                  walletAddress || 'Connect TronLink to continue'
                )}
                ${createValueCard(
                  'Ambassador status',
                  state.isRegistered ? 'Registered' : 'Not registered',
                  identity
                    ? `${identity.active ? 'Active' : 'Inactive'} • ${levelToLabel(
                        identity.effectiveLevel
                      )}`
                    : 'No ambassador profile found'
                )}
                ${createValueCard(
                  'Reward percent',
                  `${identity?.rewardPercent ?? 0}%`,
                  `Effective level: ${levelToLabel(identity?.effectiveLevel ?? 0)}`
                )}
              </div>

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
              </div>

              <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--four">
                ${createValueCard(
                  'Current level',
                  levelToLabel(progress?.currentLevel ?? 0),
                  `Current buyers: ${progress?.buyersCount ?? 0}`
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
                ${createValueCard('Created at', formatDate(identity?.createdAt ?? 0))}
              </div>

              <div class="fourteen-ambassador-cabinet-section">
                <div class="fourteen-ambassador-cabinet-section__title">Referral</div>
                <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--two">
                  ${createValueCard(
                    'Slug',
                    profile?.slug || profile?.referralSlug || profile?.referral_slug || '—',
                    identity?.slugHash || 'No readable slug provided by backend yet'
                  )}
                  ${createValueCard(
                    'Referral link',
                    referralLink,
                    profile?.slug ? 'Public ambassador link' : 'Backend profile can enrich this value'
                  )}
                </div>
              </div>

              <div class="fourteen-ambassador-cabinet-section">
                <div class="fourteen-ambassador-cabinet-section__title">On-chain profile</div>
                <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--two">
                  ${createValueCard('Slug hash', identity?.slugHash || '—')}
                  ${createValueCard('Meta hash', identity?.metaHash || '—')}
                  ${createValueCard(
                    'Registration mode',
                    identity?.selfRegistered
                      ? 'Self-registered'
                      : identity?.manualAssigned
                        ? 'Manually assigned'
                        : '—'
                  )}
                  ${createValueCard(
                    'Override',
                    identity?.overrideEnabled ? 'Enabled' : 'Disabled',
                    identity
                      ? `Current: ${levelToLabel(identity.currentLevel)} • Override: ${levelToLabel(
                          identity.overrideLevel
                        )}`
                      : ''
                  )}
                </div>
              </div>

              <div class="fourteen-ambassador-cabinet-section">
                <div class="fourteen-ambassador-cabinet-section__title">Links</div>
                <div class="fourteen-ambassador-cabinet-links">
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
              </div>
            `
            : ''
        }
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
    isRegistered: false,
    hasProcessingWithdrawal: false,
    error: '',
    dashboard: null,
    profile: null,
    statusCards: {
      availableOnChainSun: '0',
      pendingBackendSyncSun: '0',
      requestedForProcessingSun: '0',
      availableOnChainCount: 0,
      pendingBackendSyncCount: 0,
      requestedForProcessingCount: 0,
      hasAvailableOnChain: false,
      hasPendingBackendSync: false,
      hasRequestedForProcessing: false
    },
    lastWithdrawTxid: null
  };

  let isDestroyed = false;
  let walletUnsubscribe = null;
  let embeddedWalletUnmount = null;
  let resizeListenerBound = false;

  const root = target;

  function isAlive() {
    return !isDestroyed && document.body.contains(target);
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

          await refresh('initial');
        }
      },
      onRefresh: async () => {
        if (typeof wallet.refreshBalances === 'function') {
          await wallet.refreshBalances();
        }
        await refresh('refresh');
      },
      onDisconnect: async () => {
        if (typeof wallet.disconnect === 'function') {
          await wallet.disconnect();
        }
        await refresh('initial');
      }
    });
  }

  async function refresh(mode = 'refresh') {
    if (!isAlive()) {
      return;
    }

    const initial = mode === 'initial';

    if (initial) {
      state.isLoading = true;
      state.error = '';
    } else {
      state.isRefreshing = true;
      state.error = '';
    }

    render();

    try {
      const walletAddress = getWalletAddressSafe(wallet);

      if (!walletAddress || !isConnectedSafe(wallet)) {
        state.isConnected = false;
        state.isRegistered = false;
        state.hasProcessingWithdrawal = false;
        state.dashboard = null;
        state.profile = null;
        state.statusCards = buildStatusCards(null);
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = '';
        render();
        return;
      }

      const [dashboard, profile] = await Promise.all([
        readAmbassadorDashboard(wallet, resolvedConfig.controllerContractAddress),
        fetchProfileMaybe(resolvedConfig, walletAddress)
      ]);

      state.dashboard = dashboard;
      state.profile = profile;
      state.statusCards = buildStatusCards(dashboard.withdrawalQueue);
      state.hasProcessingWithdrawal = Boolean(
        dashboard.withdrawalQueue?.hasProcessingWithdrawal
      );
      state.isConnected = true;
      state.isRegistered = Boolean(dashboard.identity?.exists);
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = '';

      render();
    } catch (error) {
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = normalizeError(error);

      if (initial) {
        state.isConnected = false;
        state.isRegistered = false;
        state.hasProcessingWithdrawal = false;
        state.dashboard = null;
        state.profile = null;
        state.statusCards = buildStatusCards(null);
      }

      render();
    }
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
      await refresh('refresh');
    } catch (error) {
      const message = normalizeError(error);
      state.error = message;
      showErrorNotice(message, 10000);
    } finally {
      state.isWithdrawing = false;
      render();
    }
  }

  function bindEvents() {
    const refreshButton = root.querySelector('[data-role="refresh-button"]');
    const withdrawButton = root.querySelector('[data-role="withdraw-button"]');

    refreshButton?.addEventListener('click', () => {
      refresh('refresh').catch((error) => {
        console.error('Ambassador cabinet refresh failed:', error);
      });
    });

    withdrawButton?.addEventListener('click', () => {
      handleWithdraw().catch((error) => {
        console.error('Ambassador cabinet withdraw failed:', error);
      });
    });
  }

  function handleResize() {
    if (!isAlive()) return;
    unmountEmbeddedWalletButton();
    syncEmbeddedWalletUi();
  }

  function render() {
    const walletAddress = getWalletAddressSafe(wallet) || '';
    unmountEmbeddedWalletButton();
    root.innerHTML = createMarkup(resolvedConfig, state, walletAddress);
    updateWalletLabel();
    syncEmbeddedWalletUi();
    bindEvents();
  }

  if (typeof wallet.subscribe === 'function') {
    walletUnsubscribe = wallet.subscribe(() => {
      refresh('refresh').catch((error) => {
        console.error('Ambassador cabinet wallet refresh failed:', error);
      });
    });
  }

  if (typeof window !== 'undefined' && !resizeListenerBound) {
    window.addEventListener('resize', handleResize);
    resizeListenerBound = true;
  }

  const instance = {
    refresh: () => refresh('refresh'),
    destroy() {
      isDestroyed = true;
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

  refresh('initial').catch((error) => {
    console.error('Ambassador cabinet initial load failed:', error);
    state.isLoading = false;
    state.error = normalizeError(error);
    render();
    showNeutralNotice('Cabinet loaded with limited state.', 5000);
  });

  return instance;
}
