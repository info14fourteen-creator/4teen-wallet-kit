import sunioLogo from '../../../assets/sunio_swap.svg';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

export const SUNIO_DEFAULTS = {
  routeCount: 3,
  baseRates: {
    TRX: 1.0,
    USDT: 0.122
  }
};

export function getSunioProviderMeta() {
  return {
    id: PROVIDER_ID,
    name: PROVIDER_NAME,
    logo: sunioLogo
  };
}

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function parseSlippage(slippageValue, fallback = 3) {
  const slippage = Number.parseFloat(slippageValue);
  return Number.isFinite(slippage) && slippage > 0 ? slippage : fallback;
}

function buildMockTemplates(targetToken) {
  return [
    {
      id: 'sun-direct',
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      routeLabel: 'Direct · needs live quote',
      executionLabel: 'Best direct',
      via: [],
      qualityFactor: 1.0
    },
    {
      id: 'sun-optimized',
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      routeLabel: 'Optimized · best price',
      executionLabel: 'Optimized route',
      via: ['WTRX'],
      qualityFactor: 0.992
    },
    {
      id: 'sun-stable',
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      routeLabel: 'Stable · protected route',
      executionLabel: 'Protected path',
      via: targetToken === 'USDT' ? ['TRX'] : ['USDT'],
      qualityFactor: 0.983
    }
  ];
}

/**
 * Quote layer for SUN.io
 *
 * Right now it preserves your current working behavior,
 * but it is already isolated so we can replace this with
 * real SUN.io route fetching and quoting logic later.
 */
export async function getSunioQuotes({
  amountIn,
  targetToken,
  slippage,
  routeCount = SUNIO_DEFAULTS.routeCount,
  baseRates = SUNIO_DEFAULTS.baseRates
} = {}) {
  const safeAmountIn = toSafeNumber(amountIn, 0);

  if (!safeAmountIn || safeAmountIn <= 0) {
    return [];
  }

  const baseRate = toSafeNumber(baseRates?.[targetToken], 0);

  if (!baseRate || baseRate <= 0) {
    return [];
  }

  const safeSlippage = parseSlippage(slippage, 3);

  return buildMockTemplates(targetToken)
    .slice(0, Math.max(1, routeCount || 3))
    .map((template) => {
      const receive = safeAmountIn * baseRate * template.qualityFactor;
      const minReceived = receive * (1 - safeSlippage / 100);

      return {
        ...template,
        fromToken: '4TEEN',
        toToken: targetToken,
        receive,
        minReceived,
        impactLabel: '—',
        providerLogo: sunioLogo,
        providerMeta: getSunioProviderMeta()
      };
    })
    .sort((a, b) => Number(b.receive || 0) - Number(a.receive || 0));
}

/**
 * Approval stub for future real SUN.io TRC20 flow.
 *
 * Later here we will:
 * 1. read allowance
 * 2. compare with amountIn
 * 3. submit approve if needed
 */
export async function ensureSunioApproval({
  wallet,
  amountIn,
  tokenAddress,
  spenderAddress
} = {}) {
  if (!wallet) {
    throw new Error('SUN.io approval: wallet is required');
  }

  return {
    ok: true,
    required: false,
    approved: true,
    amountIn,
    tokenAddress,
    spenderAddress
  };
}

/**
 * Execution stub for future real SUN.io router integration.
 *
 * Later here we will:
 * 1. build router params
 * 2. call router contract
 * 3. sign via connected wallet
 * 4. return txid
 */
export async function executeSunioSwap({
  wallet,
  route,
  amountIn,
  slippage
} = {}) {
  if (!wallet) {
    throw new Error('SUN.io execution: wallet is required');
  }

  if (!route) {
    throw new Error('SUN.io execution: route is required');
  }

  const safeAmountIn = toSafeNumber(amountIn, 0);

  if (!safeAmountIn || safeAmountIn <= 0) {
    throw new Error('SUN.io execution: invalid amount');
  }

  return {
    ok: false,
    provider: PROVIDER_ID,
    routeId: route.id || null,
    amountIn: safeAmountIn,
    slippage,
    message: 'SUN.io live execution is not wired yet'
  };
}
