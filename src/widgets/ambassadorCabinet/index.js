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
  copyLinkText: 'Copy referral link',
  copySlugText: 'Copy slug',
  openLinkText: 'Open referral link',
  walletExplorerText: 'Wallet on Tronscan',
  withdrawExplorerText: 'Last withdrawal tx',
  summaryEndpointTemplate: '/cabinet/ambassador/{wallet}/summary',
  buyersEndpointTemplate: '/cabinet/ambassador/{wallet}/buyers?limit=100&offset=0',
  purchasesEndpointTemplate: '/cabinet/ambassador/{wallet}/purchases?limit=100&offset=0',
  pendingEndpointTemplate: '/cabinet/ambassador/{wallet}/pending?limit=100&offset=0',
  refreshEndpoint: '',
  replayPendingEndpoint: '/cabinet/replay-pending',
  confirmWithdrawalEndpoint: '/cabinet/confirm-withdrawal',
  referralBaseUrl: 'https://4teen.me/?ref=',
  registrationPageUrl: 'https://4teen.me/a/reg',
  registrationMode: 'redirect',
  registerTitle: 'Not an ambassador yet',
  registerText:
    'This wallet is connected, but no ambassador profile was found. If you want to join the 4TEEN Ambassador Program, continue to registration.',
  infoTitle: 'What this cabinet shows and lets you do',
  infoContent:
    'This cabinet reads the real backend state for the connected ambassador wallet.\n\nTop cards show the most important numbers first: slug, level, reward percent, linked buyers, attributed volume, earned reward, pending reward and claimable reward.\n\nImportant: “Claimable now” is the real on-chain amount available for withdrawal right now. “Processed reward” means purchases already passed through the controller flow. “Pending reward” means purchases are already attributed in backend but are not yet processed by controller.\n\nThe Buyers section shows linked buyers and their totals. The Purchases section shows all attributed and processed purchases. The Pending section isolates purchases that are already attributed but still waiting for controller processing.\n\nIf the connected wallet is not registered as an ambassador yet, the cabinet will show that no ambassador profile was found and direct you to the ambassador registration page.'
};

const DEFAULT_SECTION_STATE = {
  actions: true,
  identity: true,
  overview: true,
  rewards: true,
  buyers: false,
  purchases: false,
  pending: false,
  advanced: false
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

function shortenMiddle(value, start = 18, end = 10) {
  const text = String(value || '').trim();

  if (!text) return '';
  if (text.length <= start + end + 3) return text;

  return `${text.slice(0, start)}...${text.slice(-end)}`;
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

function safeArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

function safeSun(value, fallback = '0') {
  const raw = String(value ?? fallback).trim();
  return /^-?\d+$/.test(raw) ? raw : fallback;
}

function sumSun(values) {
  try {
    let total = 0n;

    for (const value of values) {
      total += BigInt(safeSun(value, '0'));
    }

    return total.toString();
  } catch {
    return '0';
  }
}

function sunToTrxString(value) {
  const raw = safeString(value, '0').trim();

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
    const normalized =
      typeof timestamp === 'string' && /\D/.test(timestamp)
        ? Date.parse(timestamp)
        : timestamp > 1_000_000_000_000
          ? timestamp
          : timestamp * 1000;

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

  if (lower.includes('wallet is not connected') || lower.includes('tron wallet is not connected')) {
    return 'Wallet is not connected.';
  }

  if (lower.includes('out_of_energy')) {
    return 'Transaction failed: OUT_OF_ENERGY.';
  }

  if (lower.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (
    lower.includes("owner_address isn't set") ||
    lower.includes('owner_address is not set')
  ) {
    return 'Wallet session is connected, but contract reads are not ready in this browser wallet yet.';
  }

  if (
    lower.includes('resource insufficient') ||
    lower.includes('insufficient energy') ||
    lower.includes('insufficient bandwidth') ||
    lower.includes('account resource insufficient')
  ) {
    return 'Resources are not available yet. Please try again later.';
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

function buildEndpoint(template, walletAddress) {
  return String(template || '').replaceAll(
    '{wallet}',
    encodeURIComponent(String(walletAddress || '').trim())
  );
}

async function fetchJsonOrThrow(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await readJson(response);

  if (!response.ok) {
    const error = new Error(
      payload?.error ||
      payload?.message ||
      `${options.method || 'GET'} ${url} failed with status ${response.status}`
    );

    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
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

  const payload = await fetchJsonOrThrow(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      wallet: walletAddress
    })
  });

  return payload?.result || payload || {};
}

async function confirmWithdrawal(config, input) {
  const baseUrl = normalizeBaseUrl(config.backendBaseUrl);

  if (!baseUrl) {
    return null;
  }

  const endpoint = String(
    config.confirmWithdrawalEndpoint || '/cabinet/confirm-withdrawal'
  ).trim();

  const body = {
    wallet: input.wallet,
    txid: input.txid
  };

  if (input.withdrawSessionId) {
    body.withdrawSessionId = input.withdrawSessionId;
  }

  const payload = await fetchJsonOrThrow(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return payload?.result || payload || {};
}

async function requestCabinetRefresh(config, walletAddress) {
  const baseUrl = normalizeBaseUrl(config.backendBaseUrl);
  const endpoint = String(config.refreshEndpoint || '').trim();

  if (!baseUrl || !endpoint) {
    return null;
  }

  const payload = await fetchJsonOrThrow(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ambassadorWallet: walletAddress
    })
  });

  return payload?.result || payload || {};
}

async function copyText(value) {
  const text = String(value || '').trim();

  if (!text) {
    throw new Error('Nothing to copy');
  }

  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
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
      level: 0,
      effectiveLevel: 0,
      currentLevel: 0,
      overrideLevel: 0,
      rewardPercent: 0,
      createdAt: 0,
      slug: '',
      slugHash: '—',
      metaHash: '—'
    },
    stats: {
      totalBuyers: 0,
      trackedVolumeSun: '0',
      trackedVolumeTrx: '0',
      claimableRewardsSun: '0',
      claimableRewardsTrx: '0',
      lifetimeRewardsSun: '0',
      lifetimeRewardsTrx: '0',
      withdrawnRewardsSun: '0',
      withdrawnRewardsTrx: '0',
      processedCount: 0,
      attributedCount: 0,
      unattributedCount: 0,
      buyersCount: 0,
      buyersTotalPurchaseAmountSun: '0',
      buyersTotalPurchaseAmountTrx: '0',
      buyersProcessedPurchaseAmountSun: '0',
      buyersProcessedPurchaseAmountTrx: '0',
      buyersPendingPurchaseAmountSun: '0',
      buyersPendingPurchaseAmountTrx: '0',
      buyersTotalRewardSun: '0',
      buyersTotalRewardTrx: '0',
      buyersProcessedRewardSun: '0',
      buyersProcessedRewardTrx: '0',
      buyersPendingRewardSun: '0',
      buyersPendingRewardTrx: '0'
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
      availableOnChainCount: 0,
      allocatedInDbSun: '0',
      allocatedInDbTrx: '0',
      allocatedInDbCount: 0,
      pendingBackendSyncSun: '0',
      pendingBackendSyncTrx: '0',
      pendingBackendSyncCount: 0,
      requestedForProcessingSun: '0',
      requestedForProcessingTrx: '0',
      requestedForProcessingCount: 0,
      hasProcessingWithdrawal: false,
      withdrawSessionId: null,
      hasBrokenPendingRewards: false,
      missingRewardCount: 0,
      missingRewardOwnerShareSun: '0',
      missingRewardOwnerShareTrx: '0'
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
    profile?.summary?.slug ||
    identity?.slug ||
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

  return '';
}

function buildWithdrawButtonLabel(state, config) {
  if (state.isWithdrawing) {
    return config.processingText || 'Processing withdrawal...';
  }

  if (state.hasProcessingWithdrawal || state.statusCards.hasRequestedForProcessing) {
    return 'Requested for processing';
  }

  if (state.statusCards.hasAvailableOnChain) {
    return config.withdrawText || 'Withdraw rewards';
  }

  return 'No on-chain rewards available';
}

function buildReplayButtonLabel(config, state) {
  if (state.isReplayingPending) {
    return config.replayProcessingText || 'Processing pending rewards...';
  }

  return config.replayText || 'Process pending rewards';
}

function buildStatusCards(withdrawalQueue) {
  if (!withdrawalQueue) {
    return {
      availableOnChainSun: '0',
      allocatedInDbSun: '0',
      pendingBackendSyncSun: '0',
      requestedForProcessingSun: '0',
      availableOnChainCount: 0,
      allocatedInDbCount: 0,
      pendingBackendSyncCount: 0,
      requestedForProcessingCount: 0,
      hasAvailableOnChain: false,
      hasAllocatedInDb: false,
      hasPendingBackendSync: false,
      hasRequestedForProcessing: false,
      hasBrokenPendingRewards: false,
      missingRewardCount: 0,
      missingRewardOwnerShareSun: '0',
      missingRewardOwnerShareTrx: '0'
    };
  }

  const availableOnChainSun = safeSun(withdrawalQueue.availableOnChainSun, '0');
  const allocatedInDbSun = safeSun(withdrawalQueue.allocatedInDbSun, '0');
  const pendingBackendSyncSun = safeSun(withdrawalQueue.pendingBackendSyncSun, '0');
  const requestedForProcessingSun = safeSun(withdrawalQueue.requestedForProcessingSun, '0');
  const missingRewardOwnerShareSun = safeSun(withdrawalQueue.missingRewardOwnerShareSun, '0');

  const availableOnChainCount = safeNumber(withdrawalQueue.availableOnChainCount, 0);
  const allocatedInDbCount = safeNumber(withdrawalQueue.allocatedInDbCount, 0);
  const pendingBackendSyncCount = safeNumber(withdrawalQueue.pendingBackendSyncCount, 0);
  const requestedForProcessingCount = safeNumber(withdrawalQueue.requestedForProcessingCount, 0);
  const missingRewardCount = safeNumber(withdrawalQueue.missingRewardCount, 0);
  const hasBrokenPendingRewards = safeBoolean(withdrawalQueue.hasBrokenPendingRewards);

  return {
    availableOnChainSun,
    allocatedInDbSun,
    pendingBackendSyncSun,
    requestedForProcessingSun,
    availableOnChainCount,
    allocatedInDbCount,
    pendingBackendSyncCount,
    requestedForProcessingCount,
    hasAvailableOnChain: isPositiveSun(availableOnChainSun) || availableOnChainCount > 0,
    hasAllocatedInDb: isPositiveSun(allocatedInDbSun) || allocatedInDbCount > 0,
    hasPendingBackendSync:
      isPositiveSun(pendingBackendSyncSun) ||
      pendingBackendSyncCount > 0 ||
      hasBrokenPendingRewards ||
      missingRewardCount > 0,
    hasRequestedForProcessing:
      isPositiveSun(requestedForProcessingSun) || requestedForProcessingCount > 0,
    hasBrokenPendingRewards,
    missingRewardCount,
    missingRewardOwnerShareSun,
    missingRewardOwnerShareTrx: sunToTrxString(missingRewardOwnerShareSun)
  };
}

function buildDashboardFromSummary(summary, walletAddress, buyersRows, purchasesRows, pendingRows) {
  const empty = createEmptyDashboard(walletAddress);

  const claimableRewardsSun = safeSun(summary?.claimable_rewards_sun, '0');
  const totalRewardsAccruedSun = safeSun(summary?.total_rewards_accrued_sun, '0');
  const totalRewardsClaimedSun = safeSun(summary?.total_rewards_claimed_sun, '0');

  const buyersTotalPurchaseAmountSun = safeSun(summary?.buyers_total_purchase_amount_sun, '0');
  const buyersProcessedPurchaseAmountSun = safeSun(
    summary?.buyers_processed_purchase_amount_sun,
    '0'
  );
  const buyersPendingPurchaseAmountSun = safeSun(
    summary?.buyers_pending_purchase_amount_sun,
    '0'
  );
  const buyersTotalRewardSun = safeSun(summary?.buyers_total_reward_sun, '0');
  const buyersProcessedRewardSun = safeSun(summary?.buyers_processed_reward_sun, '0');
  const buyersPendingRewardSun = safeSun(summary?.buyers_pending_reward_sun, '0');

  const availableOnChainCount = isPositiveSun(claimableRewardsSun) ? 1 : 0;
  const allocatedInDbCount = safeArray(purchasesRows).length;
  const pendingBackendSyncCount = safeArray(pendingRows).length;

  return {
    identity: {
      ...empty.identity,
      wallet: walletAddress,
      exists: safeBoolean(summary?.exists_on_chain),
      active: safeBoolean(summary?.active),
      selfRegistered: safeBoolean(summary?.self_registered),
      manualAssigned: safeBoolean(summary?.manual_assigned),
      overrideEnabled: safeBoolean(summary?.override_enabled),
      level: safeNumber(summary?.effective_level, 0),
      effectiveLevel: safeNumber(summary?.effective_level, 0),
      currentLevel: safeNumber(summary?.current_level, safeNumber(summary?.effective_level, 0)),
      overrideLevel: safeNumber(summary?.override_level, 0),
      rewardPercent: safeNumber(summary?.reward_percent, 0),
      createdAt: safeString(summary?.created_at_chain, '0'),
      slug: String(summary?.slug || '').trim(),
      slugHash: safeString(summary?.slug_hash, '—'),
      metaHash: safeString(summary?.meta_hash, '—')
    },
    stats: {
      ...empty.stats,
      totalBuyers: safeNumber(summary?.total_buyers, safeArray(buyersRows).length),
      trackedVolumeSun: safeSun(summary?.total_volume_sun, '0'),
      trackedVolumeTrx: sunToTrxString(summary?.total_volume_sun),
      claimableRewardsSun,
      claimableRewardsTrx: sunToTrxString(claimableRewardsSun),
      lifetimeRewardsSun: totalRewardsAccruedSun,
      lifetimeRewardsTrx: sunToTrxString(totalRewardsAccruedSun),
      withdrawnRewardsSun: totalRewardsClaimedSun,
      withdrawnRewardsTrx: sunToTrxString(totalRewardsClaimedSun),
      processedCount: safeNumber(summary?.processed_count, 0),
      attributedCount: safeNumber(summary?.attributed_count, 0),
      unattributedCount: safeNumber(summary?.unattributed_count, 0),
      buyersCount: safeNumber(summary?.buyers_count, safeArray(buyersRows).length),
      buyersTotalPurchaseAmountSun,
      buyersTotalPurchaseAmountTrx: sunToTrxString(buyersTotalPurchaseAmountSun),
      buyersProcessedPurchaseAmountSun,
      buyersProcessedPurchaseAmountTrx: sunToTrxString(buyersProcessedPurchaseAmountSun),
      buyersPendingPurchaseAmountSun,
      buyersPendingPurchaseAmountTrx: sunToTrxString(buyersPendingPurchaseAmountSun),
      buyersTotalRewardSun,
      buyersTotalRewardTrx: sunToTrxString(buyersTotalRewardSun),
      buyersProcessedRewardSun,
      buyersProcessedRewardTrx: sunToTrxString(buyersProcessedRewardSun),
      buyersPendingRewardSun,
      buyersPendingRewardTrx: sunToTrxString(buyersPendingRewardSun)
    },
    progress: {
      ...empty.progress,
      currentLevel: safeNumber(summary?.effective_level, 0),
      buyersCount: safeNumber(summary?.total_buyers, safeArray(buyersRows).length),
      nextThreshold: 0,
      remainingToNextLevel: 0
    },
    withdrawalQueue: {
      ...empty.withdrawalQueue,
      availableOnChainSun: claimableRewardsSun,
      availableOnChainTrx: sunToTrxString(claimableRewardsSun),
      availableOnChainCount,
      allocatedInDbSun: buyersTotalRewardSun,
      allocatedInDbTrx: sunToTrxString(buyersTotalRewardSun),
      allocatedInDbCount,
      pendingBackendSyncSun: buyersPendingRewardSun,
      pendingBackendSyncTrx: sunToTrxString(buyersPendingRewardSun),
      pendingBackendSyncCount,
      requestedForProcessingSun: '0',
      requestedForProcessingTrx: '0',
      requestedForProcessingCount: 0,
      hasProcessingWithdrawal: false,
      withdrawSessionId: null,
      hasBrokenPendingRewards: false,
      missingRewardCount: 0,
      missingRewardOwnerShareSun: '0',
      missingRewardOwnerShareTrx: '0'
    }
  };
}

async function fetchCabinetData(config, walletAddress) {
  const baseUrl = normalizeBaseUrl(config.backendBaseUrl);

  if (!baseUrl) {
    return null;
  }

  const summaryUrl = `${baseUrl}${buildEndpoint(config.summaryEndpointTemplate, walletAddress)}`;

  let summaryPayload;

  try {
    summaryPayload = await fetchJsonOrThrow(summaryUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    if (error?.status === 404) {
      return {
        registered: false
      };
    }

    throw error;
  }

  const summary = safeObject(summaryPayload?.summary, null);

  if (!summary) {
    return {
      registered: false
    };
  }

  const buyersUrl = `${baseUrl}${buildEndpoint(config.buyersEndpointTemplate, walletAddress)}`;
  const purchasesUrl = `${baseUrl}${buildEndpoint(config.purchasesEndpointTemplate, walletAddress)}`;
  const pendingUrl = `${baseUrl}${buildEndpoint(config.pendingEndpointTemplate, walletAddress)}`;

  const [buyersPayload, purchasesPayload, pendingPayload] = await Promise.all([
    fetchJsonOrThrow(buyersUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(() => ({ ok: true, rows: [], total: 0 })),
    fetchJsonOrThrow(purchasesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(() => ({ ok: true, rows: [], total: 0 })),
    fetchJsonOrThrow(pendingUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(() => ({ ok: true, rows: [], total: 0 }))
  ]);

  const buyersRows = safeArray(buyersPayload?.rows, []);
  const purchasesRows = safeArray(purchasesPayload?.rows, []);
  const pendingRows = safeArray(pendingPayload?.rows, []);

  return {
    registered: true,
    wallet: walletAddress,
    status: safeBoolean(summary?.active) ? 'active' : 'inactive',
    summary,
    buyersRows,
    purchasesRows,
    pendingRows,
    buyersTotal: safeNumber(buyersPayload?.total, buyersRows.length),
    purchasesTotal: safeNumber(purchasesPayload?.total, purchasesRows.length),
    pendingTotal: safeNumber(pendingPayload?.total, pendingRows.length)
  };
}

function createValueCard(label, value, hint = '', modifier = '') {
  return `
    <div class="fourteen-ambassador-cabinet-card ${modifier ? `fourteen-ambassador-cabinet-card--${escapeHtml(modifier)}` : ''}">
      <div class="fourteen-ambassador-cabinet-card__label">${escapeHtml(label)}</div>
      <div class="fourteen-ambassador-cabinet-card__value">${escapeHtml(value)}</div>
      ${hint ? `<div class="fourteen-ambassador-cabinet-card__hint">${escapeHtml(hint)}</div>` : ''}
    </div>
  `;
}

function createStatusCard(label, trxValue, sunValue, count, modifier, hint = '') {
  return `
    <div class="fourteen-ambassador-cabinet-card fourteen-ambassador-cabinet-card--${escapeHtml(
      modifier
    )}">
      <div class="fourteen-ambassador-cabinet-card__label">${escapeHtml(label)}</div>
      <div class="fourteen-ambassador-cabinet-card__value">${escapeHtml(trxValue)} TRX</div>
      <div class="fourteen-ambassador-cabinet-card__hint">${escapeHtml(sunValue)} SUN</div>
      <div class="fourteen-ambassador-cabinet-card__hint">
        ${escapeHtml(String(count))} ${count === 1 ? 'row' : 'rows'}
      </div>
      ${hint ? `<div class="fourteen-ambassador-cabinet-card__hint">${escapeHtml(hint)}</div>` : ''}
    </div>
  `;
}

function createAccordionSection(id, title, isOpen, content) {
  return `
    <section class="fourteen-ambassador-cabinet-section fourteen-ambassador-cabinet-section--accordion" data-section="${escapeHtml(
      id
    )}">
      <button
        type="button"
        class="fourteen-ambassador-cabinet-section__toggle"
        data-role="section-toggle"
        data-section-id="${escapeHtml(id)}"
        aria-expanded="${isOpen ? 'true' : 'false'}"
      >
        <span class="fourteen-ambassador-cabinet-section__toggle-left">
          <span class="fourteen-ambassador-cabinet-section__icon">${isOpen ? '−' : '+'}</span>
          <span class="fourteen-ambassador-cabinet-section__title">${escapeHtml(title)}</span>
        </span>
      </button>

      <div
        class="fourteen-ambassador-cabinet-section__content ${isOpen ? 'is-open' : ''}"
        ${isOpen ? '' : 'hidden'}
      >
        ${content}
      </div>
    </section>
  `;
}

function createDataTable(headers, rows) {
  return `
    <div class="fourteen-ambassador-cabinet-table-wrap">
      <table class="fourteen-ambassador-cabinet-table">
        <thead>
          <tr>
            ${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    </div>
  `;
}

function createConnectStateMarkup() {
  return `
    <div class="fourteen-ambassador-cabinet-empty">
      <div class="fourteen-ambassador-cabinet-empty__title">Connect wallet to continue</div>
      <div class="fourteen-ambassador-cabinet-empty__text">
        Connect your wallet to access your ambassador cabinet, view rewards, linked buyers, purchase rows and current backend state.
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
          : createAccordionSection(
              'register',
              'Ambassador registration',
              true,
              '<div data-role="register-slot"></div>'
            )
      }

      ${
        walletAddress
          ? `
            <div class="fourteen-ambassador-cabinet-empty__hint">
              Connected wallet: ${escapeHtml(shortenAddress(walletAddress))}
            </div>
          `
          : ''
      }
    </div>
  `;
}

function createIdentityContent(config, state, walletAddress) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const identity = dashboard.identity ?? {};
  const referralLink = buildReferralLink(config, state.profile, identity);
  const effectiveLevel = safeNumber(identity.effectiveLevel, safeNumber(identity.level, 0));
  const slug = String(identity.slug || '').trim();

  return `
    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
      ${createValueCard(
        'Slug',
        slug || 'Not assigned yet',
        slug ? 'Main public ambassador handle' : 'Plain slug is not available yet',
        slug ? 'accent' : ''
      )}
      ${createValueCard(
        'Status',
        identity?.active ? 'Active' : 'Inactive',
        `Level: ${levelToLabel(effectiveLevel)}`
      )}
      ${createValueCard(
        'Reward percent',
        `${identity.rewardPercent ?? 0}%`,
        'Current effective reward percent'
      )}
    </div>

    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--two">
      ${createValueCard(
        'Referral link',
        referralLink ? shortenMiddle(referralLink, 26, 14) : 'Not available yet',
        referralLink ? 'Use copy or open in Actions' : 'Referral URL will appear when plain slug is available'
      )}
      ${createValueCard(
        'Created on chain',
        formatDate(identity.createdAt ?? 0),
        'Controller registration timestamp'
      )}
    </div>
  `;
}

function createOverviewContent(state, walletAddress) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const stats = dashboard.stats ?? {};
  const identity = dashboard.identity ?? {};
  const withdrawalQueue = dashboard.withdrawalQueue ?? {};

  return `
    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
      ${createValueCard(
        'Linked buyers',
        String(stats.buyersCount ?? stats.totalBuyers ?? 0),
        'Backend linked buyers'
      )}
      ${createValueCard(
        'Attributed volume',
        `${stats.buyersTotalPurchaseAmountTrx ?? '0'} TRX`,
        `${stats.buyersTotalPurchaseAmountSun ?? '0'} SUN`
      )}
      ${createValueCard(
        'Total reward',
        `${stats.buyersTotalRewardTrx ?? '0'} TRX`,
        `${stats.buyersTotalRewardSun ?? '0'} SUN`
      )}
    </div>

    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
      ${createValueCard(
        'Processed reward',
        `${stats.buyersProcessedRewardTrx ?? '0'} TRX`,
        `${stats.buyersProcessedRewardSun ?? '0'} SUN`
      )}
      ${createValueCard(
        'Pending reward',
        `${stats.buyersPendingRewardTrx ?? '0'} TRX`,
        `${stats.buyersPendingRewardSun ?? '0'} SUN`
      )}
      ${createValueCard(
        'Claimable now',
        `${withdrawalQueue.availableOnChainTrx ?? '0'} TRX`,
        `${withdrawalQueue.availableOnChainSun ?? '0'} SUN`
      )}
    </div>

    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
      ${createValueCard(
        'Processed rows',
        String(stats.processedCount ?? 0),
        'Already passed through controller'
      )}
      ${createValueCard(
        'Pending rows',
        String(stats.attributedCount ?? 0),
        'Already attributed in DB, not processed yet'
      )}
      ${createValueCard(
        'Level',
        levelToLabel(identity.effectiveLevel ?? 0),
        `Current reward: ${identity.rewardPercent ?? 0}%`
      )}
    </div>
  `;
}

function createRewardStatusContent(state) {
  const brokenHint =
    state.statusCards.hasBrokenPendingRewards || state.statusCards.missingRewardCount > 0
      ? ` Broken pending rewards detected: ${state.statusCards.missingRewardCount} item(s), owner share ${state.statusCards.missingRewardOwnerShareTrx} TRX / ${state.statusCards.missingRewardOwnerShareSun} SUN.`
      : '';

  return `
    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--three">
      ${createStatusCard(
        'Claimable now',
        sunToTrxString(state.statusCards.availableOnChainSun),
        state.statusCards.availableOnChainSun,
        state.statusCards.availableOnChainCount,
        'green',
        'Real withdrawable amount from contract state.'
      )}
      ${createStatusCard(
        'Processed reward in DB',
        sunToTrxString(
          sumSun([
            safeString(state.dashboard?.stats?.buyersProcessedRewardSun, '0')
          ])
        ),
        safeString(state.dashboard?.stats?.buyersProcessedRewardSun, '0'),
        safeNumber(state.dashboard?.stats?.processedCount, 0),
        'graphite',
        'Rows already settled through controller.'
      )}
      ${createStatusCard(
        'Pending backend sync',
        sunToTrxString(state.statusCards.pendingBackendSyncSun),
        state.statusCards.pendingBackendSyncSun,
        state.statusCards.pendingBackendSyncCount,
        'amber',
        `Attributed purchases that are not processed yet.${brokenHint}`
      )}
    </div>
  `;
}

function createActionsContent(state, walletAddress, config) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const identity = dashboard.identity ?? {};
  const referralLink = buildReferralLink(config, state.profile, identity);
  const slug = String(identity.slug || '').trim();
  const walletExplorerUrl = walletAddress
    ? `https://tronscan.org/#/address/${walletAddress}`
    : '';
  const withdrawExplorerUrl = state.lastWithdrawTxid
    ? `https://tronscan.org/#/transaction/${state.lastWithdrawTxid}`
    : '';
  const withdrawButtonLabel = buildWithdrawButtonLabel(state, config);
  const replayButtonLabel = buildReplayButtonLabel(config, state);

  const canWithdraw =
    state.statusCards.hasAvailableOnChain &&
    !state.isWithdrawing &&
    !state.hasProcessingWithdrawal &&
    !state.statusCards.hasRequestedForProcessing;

  const canReplayPending =
    state.statusCards.hasPendingBackendSync &&
    !state.isReplayingPending &&
    !state.isWithdrawing;

  let helperText = 'Cabinet shows current backend and on-chain state.';

  if (state.statusCards.hasRequestedForProcessing || state.hasProcessingWithdrawal) {
    helperText = 'A withdrawal request is already in progress.';
  } else if (state.statusCards.hasBrokenPendingRewards) {
    helperText =
      'Broken pending rewards were detected. Backend rows exist, but reward split was not saved correctly for some purchases.';
  } else if (state.statusCards.hasAvailableOnChain && state.statusCards.hasPendingBackendSync) {
    helperText =
      'Part of rewards is withdrawable now on-chain, and another part is still waiting for backend sync.';
  } else if (state.statusCards.hasAvailableOnChain) {
    helperText = 'Rewards are really available now on-chain.';
  } else if (state.statusCards.hasPendingBackendSync) {
    helperText = 'Some rewards still need backend processing before they become withdrawable.';
  } else if (state.statusCards.hasAllocatedInDb) {
    helperText =
      'Rewards are already visible in backend accounting. Some may still require controller processing.';
  }

  return `
    <div class="fourteen-ambassador-cabinet-actions-helper">${escapeHtml(helperText)}</div>

    <div class="fourteen-ambassador-cabinet-links">
      <button
        type="button"
        class="fourteen-ambassador-cabinet-action"
        data-role="withdraw-button"
        ${canWithdraw ? '' : 'disabled aria-disabled="true"'}
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

      <button
        type="button"
        class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary"
        data-role="copy-slug"
        ${slug ? '' : 'disabled aria-disabled="true"'}
      >
        ${escapeHtml(config.copySlugText)}
      </button>

      <button
        type="button"
        class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary"
        data-role="copy-referral-link"
        ${referralLink ? '' : 'disabled aria-disabled="true"'}
      >
        ${escapeHtml(config.copyLinkText)}
      </button>

      ${
        referralLink
          ? `
            <a
              class="fourteen-ambassador-cabinet-link"
              href="${escapeHtml(referralLink)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHtml(config.openLinkText)}
            </a>
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
              ${escapeHtml(config.walletExplorerText)}
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
              ${escapeHtml(config.withdrawExplorerText)}
            </a>
          `
          : ''
      }
    </div>
  `;
}

function createBuyersContent(state) {
  const rows = safeArray(state.buyersRows, []);

  if (!rows.length) {
    return `
      <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
        No linked buyers found yet.
      </div>
    `;
  }

  const tableRows = rows.map((row) => `
    <tr>
      <td title="${escapeHtml(row.buyer_wallet || '')}">
        ${escapeHtml(shortenAddress(row.buyer_wallet || '—'))}
      </td>
      <td>${escapeHtml(formatDate(row.binding_at))}</td>
      <td>${escapeHtml(String(row.purchase_count ?? 0))}</td>
      <td>${escapeHtml(sunToTrxString(row.total_purchase_amount_sun || '0'))} TRX</td>
      <td>${escapeHtml(sunToTrxString(row.total_reward_amount_sun || '0'))} TRX</td>
      <td>${escapeHtml(String(row.processed_purchase_count ?? 0))}</td>
      <td>${escapeHtml(String(row.pending_purchase_count ?? 0))}</td>
    </tr>
  `);

  return createDataTable(
    ['Buyer', 'Bound at', 'Purchases', 'Total volume', 'Total reward', 'Processed', 'Pending'],
    tableRows
  );
}

function createPurchasesContent(state) {
  const rows = safeArray(state.purchasesRows, []);

  if (!rows.length) {
    return `
      <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
        No attributed or processed purchases found yet.
      </div>
    `;
  }

  const tableRows = rows.map((row) => `
    <tr>
      <td>${escapeHtml(formatDate(row.token_block_time))}</td>
      <td title="${escapeHtml(row.buyer_wallet || '')}">
        ${escapeHtml(shortenAddress(row.buyer_wallet || '—'))}
      </td>
      <td>${escapeHtml(sunToTrxString(row.purchase_amount_sun || '0'))} TRX</td>
      <td>${escapeHtml(sunToTrxString(row.ambassador_reward_sun || '0'))} TRX</td>
      <td>${escapeHtml(String(row.status || '—'))}</td>
      <td>${row.controller_processed ? 'Yes' : 'No'}</td>
      <td title="${escapeHtml(row.tx_hash || '')}">
        ${escapeHtml(shortenMiddle(row.tx_hash || '—', 10, 8))}
      </td>
    </tr>
  `);

  return createDataTable(
    ['Time', 'Buyer', 'Purchase', 'Reward', 'Status', 'Processed', 'TX'],
    tableRows
  );
}

function createPendingContent(state) {
  const rows = safeArray(state.pendingRows, []);

  if (!rows.length) {
    return `
      <div class="fourteen-ambassador-cabinet-banner fourteen-ambassador-cabinet-banner--neutral">
        No pending purchases. Everything visible here is already synchronized for this ambassador.
      </div>
    `;
  }

  const tableRows = rows.map((row) => `
    <tr>
      <td>${escapeHtml(formatDate(row.token_block_time))}</td>
      <td title="${escapeHtml(row.buyer_wallet || '')}">
        ${escapeHtml(shortenAddress(row.buyer_wallet || '—'))}
      </td>
      <td>${escapeHtml(sunToTrxString(row.purchase_amount_sun || '0'))} TRX</td>
      <td>${escapeHtml(sunToTrxString(row.ambassador_reward_sun || '0'))} TRX</td>
      <td>${escapeHtml(String(row.status || '—'))}</td>
      <td title="${escapeHtml(row.tx_hash || '')}">
        ${escapeHtml(shortenMiddle(row.tx_hash || '—', 10, 8))}
      </td>
    </tr>
  `);

  return createDataTable(
    ['Time', 'Buyer', 'Purchase', 'Reward', 'Status', 'TX'],
    tableRows
  );
}

function createAdvancedContent(state, walletAddress) {
  const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
  const identity = dashboard.identity ?? {};
  const stats = dashboard.stats ?? {};

  return `
    <div class="fourteen-ambassador-cabinet-grid fourteen-ambassador-cabinet-grid--two">
      ${createValueCard('Slug hash', identity.slugHash || '—')}
      ${createValueCard('Meta hash', identity.metaHash || '—')}
      ${createValueCard(
        'Registration mode',
        identity.selfRegistered
          ? 'Self-registered'
          : identity.manualAssigned
            ? 'Manually assigned'
            : state.isRegistered
              ? 'Registered'
              : '—'
      )}
      ${createValueCard(
        'Override',
        identity.overrideEnabled ? 'Enabled' : 'Disabled',
        `Current: ${levelToLabel(identity.currentLevel ?? identity.effectiveLevel ?? 0)} • Override: ${levelToLabel(
          identity.overrideLevel ?? 0
        )}`
      )}
      ${createValueCard(
        'Lifetime rewards',
        `${stats.lifetimeRewardsTrx ?? '0'} TRX`,
        `${stats.lifetimeRewardsSun ?? '0'} SUN`
      )}
      ${createValueCard(
        'Withdrawn rewards',
        `${stats.withdrawnRewardsTrx ?? '0'} TRX`,
        `${stats.withdrawnRewardsSun ?? '0'} SUN`
      )}
      ${createValueCard('Created at', formatDate(identity.createdAt ?? 0))}
      ${createValueCard(
        'Rows loaded',
        `${safeArray(state.purchasesRows).length} purchases / ${safeArray(state.pendingRows).length} pending / ${safeArray(state.buyersRows).length} buyers`
      )}
    </div>
  `;
}

function createDashboardStateMarkup(config, state, walletAddress) {
  return `
    <div class="fourteen-ambassador-cabinet-content">
      ${createAccordionSection(
        'actions',
        'Actions',
        state.sections.actions,
        createActionsContent(state, walletAddress, config)
      )}
      ${createAccordionSection(
        'identity',
        'Identity',
        state.sections.identity,
        createIdentityContent(config, state, walletAddress)
      )}
      ${createAccordionSection(
        'overview',
        'Overview',
        state.sections.overview,
        createOverviewContent(state, walletAddress)
      )}
      ${createAccordionSection(
        'rewards',
        'Reward status',
        state.sections.rewards,
        createRewardStatusContent(state)
      )}
      ${createAccordionSection(
        'buyers',
        `Buyers (${safeArray(state.buyersRows).length})`,
        state.sections.buyers,
        createBuyersContent(state)
      )}
      ${createAccordionSection(
        'purchases',
        `Purchases (${safeArray(state.purchasesRows).length})`,
        state.sections.purchases,
        createPurchasesContent(state)
      )}
      ${createAccordionSection(
        'pending',
        `Pending (${safeArray(state.pendingRows).length})`,
        state.sections.pending,
        createPendingContent(state)
      )}
      ${createAccordionSection(
        'advanced',
        'Advanced details',
        state.sections.advanced,
        createAdvancedContent(state, walletAddress)
      )}
    </div>
  `;
}

function createMarkup(config, state, walletAddress) {
  const slug = String(state.dashboard?.identity?.slug || '').trim();
  const rewardPercent = safeNumber(state.dashboard?.identity?.rewardPercent, 0);
  const levelLabel = levelToLabel(safeNumber(state.dashboard?.identity?.effectiveLevel, 0));
  const claimableTrx = state.dashboard?.withdrawalQueue?.availableOnChainTrx || '0';

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

              <h2 class="fourteen-ambassador-cabinet-hero__title">
                4TEEN <span>Ambassador Cabinet</span>
              </h2>

              <div class="fourteen-ambassador-cabinet-hero__subtitle">
                ${escapeHtml(config.subtitle)}
              </div>

              ${
                state.isConnected && state.registrationKnown && state.isRegistered
                  ? `
                    <div class="fourteen-ambassador-cabinet-hero-stats">
                      <div class="fourteen-ambassador-cabinet-hero-stat">
                        <span class="fourteen-ambassador-cabinet-hero-stat__label">Slug</span>
                        <span class="fourteen-ambassador-cabinet-hero-stat__value">${escapeHtml(
                          slug || 'Not assigned yet'
                        )}</span>
                      </div>
                      <div class="fourteen-ambassador-cabinet-hero-stat">
                        <span class="fourteen-ambassador-cabinet-hero-stat__label">Level</span>
                        <span class="fourteen-ambassador-cabinet-hero-stat__value">${escapeHtml(
                          levelLabel
                        )}</span>
                      </div>
                      <div class="fourteen-ambassador-cabinet-hero-stat">
                        <span class="fourteen-ambassador-cabinet-hero-stat__label">Reward</span>
                        <span class="fourteen-ambassador-cabinet-hero-stat__value">${escapeHtml(
                          `${rewardPercent}%`
                        )}</span>
                      </div>
                      <div class="fourteen-ambassador-cabinet-hero-stat">
                        <span class="fourteen-ambassador-cabinet-hero-stat__label">Claimable</span>
                        <span class="fourteen-ambassador-cabinet-hero-stat__value">${escapeHtml(
                          `${claimableTrx} TRX`
                        )}</span>
                      </div>
                    </div>
                  `
                  : ''
              }
            </div>
          </div>

          <div class="fourteen-ambassador-cabinet-hero__actions">
            <div class="fourteen-ambassador-cabinet-badge">Ambassador</div>

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
          </div>
        </div>

        <div class="fourteen-ambassador-cabinet-topbar">
          <div class="fourteen-ambassador-cabinet-wallet" data-role="wallet-label">
            Wallet not connected
          </div>

          <button
            type="button"
            class="fourteen-ambassador-cabinet-action fourteen-ambassador-cabinet-action--secondary fourteen-ambassador-cabinet-action--top-refresh"
            data-role="refresh-button"
            ${state.isRefreshing || state.isWithdrawing || state.isReplayingPending ? 'disabled aria-disabled="true"' : ''}
          >
            ${state.isRefreshing ? 'Refreshing...' : escapeHtml(config.refreshText)}
          </button>
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
    buyersRows: [],
    purchasesRows: [],
    pendingRows: [],
    buyersTotal: 0,
    purchasesTotal: 0,
    pendingTotal: 0,
    statusCards: buildStatusCards(null),
    lastWithdrawTxid: null,
    sections: {
      ...DEFAULT_SECTION_STATE
    }
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
      state.buyersRows = [];
      state.purchasesRows = [];
      state.pendingRows = [];
      state.buyersTotal = 0;
      state.purchasesTotal = 0;
      state.pendingTotal = 0;
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

    const backendProfile = await fetchCabinetData(resolvedConfig, walletAddress);

    state.profile = backendProfile;
    state.registrationKnown = backendProfile !== null;
    state.isRegistered = Boolean(backendProfile?.registered);

    if (state.registrationKnown && !state.isRegistered) {
      state.dashboard = createEmptyDashboard(walletAddress);
      state.buyersRows = [];
      state.purchasesRows = [];
      state.pendingRows = [];
      state.buyersTotal = 0;
      state.purchasesTotal = 0;
      state.pendingTotal = 0;
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
      state.buyersRows = [];
      state.purchasesRows = [];
      state.pendingRows = [];
      state.buyersTotal = 0;
      state.purchasesTotal = 0;
      state.pendingTotal = 0;
      state.statusCards = buildStatusCards(null);
      state.hasProcessingWithdrawal = false;
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = '';
      lastLoadedWalletAddress = walletAddress;
      return;
    }

    state.buyersRows = safeArray(backendProfile?.buyersRows, []);
    state.purchasesRows = safeArray(backendProfile?.purchasesRows, []);
    state.pendingRows = safeArray(backendProfile?.pendingRows, []);
    state.buyersTotal = safeNumber(backendProfile?.buyersTotal, state.buyersRows.length);
    state.purchasesTotal = safeNumber(backendProfile?.purchasesTotal, state.purchasesRows.length);
    state.pendingTotal = safeNumber(backendProfile?.pendingTotal, state.pendingRows.length);

    const dashboard = buildDashboardFromSummary(
      backendProfile?.summary || {},
      walletAddress,
      state.buyersRows,
      state.purchasesRows,
      state.pendingRows
    );

    state.dashboard = dashboard;
    state.statusCards = buildStatusCards(dashboard.withdrawalQueue);
    state.hasProcessingWithdrawal = Boolean(dashboard.withdrawalQueue?.hasProcessingWithdrawal);
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
        if (!initial && options.backendRefresh === true) {
          const walletAddress = getWalletAddressSafe(wallet);

          if (walletAddress) {
            await requestCabinetRefresh(resolvedConfig, walletAddress).catch(() => null);
            await wait(350);
          }
        }

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
          state.buyersRows = [];
          state.purchasesRows = [];
          state.pendingRows = [];
          state.buyersTotal = 0;
          state.purchasesTotal = 0;
          state.pendingTotal = 0;
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

    if (!state.statusCards.hasAvailableOnChain) {
      showNeutralNotice('No on-chain rewards are available for withdrawal yet.', 7000);
      return;
    }

    state.isWithdrawing = true;
    state.error = '';
    render();

    try {
      const walletAddress = getWalletAddressSafe(wallet);

      if (!walletAddress) {
        throw new Error('Wallet is not connected.');
      }

      const withdrawSessionId =
        state.dashboard?.withdrawalQueue?.withdrawSessionId ||
        state.profile?.withdrawalQueue?.withdrawSessionId ||
        null;

      const result = await withdrawRewards(wallet, resolvedConfig.controllerContractAddress);
      state.lastWithdrawTxid = result.txid;

      try {
        await confirmWithdrawal(resolvedConfig, {
          wallet: walletAddress,
          txid: result.txid,
          withdrawSessionId
        });
      } catch (confirmError) {
        console.error('Ambassador cabinet confirm withdrawal failed:', confirmError);
      }

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
      showNeutralNotice('No pending rewards require backend processing right now.', 7000);
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
      const skipped = safeNumber(result.skipped, 0);

      if (succeeded > 0 && failed === 0) {
        showSuccessNotice(`Processed ${succeeded} pending reward item(s).`, 8000);
      } else if (succeeded > 0 && failed > 0) {
        showNeutralNotice(
          `Processed ${succeeded} pending item(s), but ${failed} still failed.`,
          10000
        );
      } else if (attempted > 0 && failed > 0) {
        showErrorNotice(`No pending items were processed. Failed: ${failed}.`, 10000);
      } else if (skipped > 0 && succeeded === 0 && failed === 0) {
        showNeutralNotice(
          'Pending rewards are cooling down or waiting for the next retry window.',
          8000
        );
      } else if (totalFound === 0) {
        showNeutralNotice('No pending rewards were found for processing.', 7000);
      } else {
        showNeutralNotice('Pending rewards check completed.', 7000);
      }

      await refresh('refresh', { force: true, backendRefresh: true });
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

  async function handleCopyReferralLink() {
    const walletAddress = getWalletAddressSafe(wallet) || '';
    const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
    const identity = dashboard.identity ?? {};
    const referralLink = buildReferralLink(resolvedConfig, state.profile, identity);

    if (!referralLink) {
      showNeutralNotice('Referral link is not available yet.', 5000);
      return;
    }

    try {
      await copyText(referralLink);
      showSuccessNotice('Referral link copied.', 5000);
    } catch (error) {
      const message = normalizeError(error);
      showErrorNotice(message, 7000);
    }
  }

  async function handleCopySlug() {
    const walletAddress = getWalletAddressSafe(wallet) || '';
    const dashboard = state.dashboard || createEmptyDashboard(walletAddress);
    const slug = String(dashboard.identity?.slug || '').trim();

    if (!slug) {
      showNeutralNotice('Slug is not available yet.', 5000);
      return;
    }

    try {
      await copyText(slug);
      showSuccessNotice('Slug copied.', 5000);
    } catch (error) {
      const message = normalizeError(error);
      showErrorNotice(message, 7000);
    }
  }

  function toggleSection(sectionId) {
    if (!sectionId || !(sectionId in state.sections)) {
      return;
    }

    state.sections[sectionId] = !state.sections[sectionId];
    render();
  }

  function bindEvents() {
    const refreshButton = root.querySelector('[data-role="refresh-button"]');
    const withdrawButton = root.querySelector('[data-role="withdraw-button"]');
    const replayButton = root.querySelector('[data-role="replay-button"]');
    const copySlugButton = root.querySelector('[data-role="copy-slug"]');
    const copyReferralLinkButton = root.querySelector('[data-role="copy-referral-link"]');
    const infoToggleEl = root.querySelector('[data-role="info-toggle"]');
    const sectionToggles = root.querySelectorAll('[data-role="section-toggle"]');

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

    copySlugButton?.addEventListener('click', () => {
      handleCopySlug().catch((error) => {
        console.error('Ambassador cabinet copy slug failed:', error);
      });
    });

    copyReferralLinkButton?.addEventListener('click', () => {
      handleCopyReferralLink().catch((error) => {
        console.error('Ambassador cabinet copy referral link failed:', error);
      });
    });

    infoToggleEl?.addEventListener('click', togglePopover);

    sectionToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        toggleSection(toggle.getAttribute('data-section-id'));
      });
    });
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
