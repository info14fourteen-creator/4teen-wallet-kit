const SUN_DEFAULTS = {
  inputTokenAddress: 'TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A',
  wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  usdtAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',

  smartRouterAddress: 'TCFNp179Lg46D16zKoumd4Poa2WFFdtqYj',
  v3RouterAddress: 'TQAvWQpT9H916GckwWDJNhYZvQMkuRL7PN',
  v3FactoryAddress: 'TThJt8zaJzJMhCEScH7zWKnp5buVZqys9x',

  routeCount: 3,
  defaultDeadlineSeconds: 1200,
  infiniteApproveThreshold: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
};

const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const GENERIC_ROUTER_ABI = [
  {
    constant: false,
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'swapExactTokensForTRX',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

function asString(value, fallback = '0') {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : fallback;
  if (typeof value?.toString === 'function') return value.toString();
  return fallback;
}

function toBaseUnits(amount, decimals = 6) {
  const text = String(amount ?? '').trim().replace(',', '.');

  if (!text || Number(text) <= 0) {
    return '0';
  }

  const [wholeRaw, fracRaw = ''] = text.split('.');
  const whole = wholeRaw.replace(/\D/g, '') || '0';
  const frac = fracRaw.replace(/\D/g, '').slice(0, decimals).padEnd(decimals, '0');

  const normalized = `${whole}${frac}`.replace(/^0+/, '');
  return normalized || '0';
}

function fromBaseUnits(value, decimals = 6) {
  const raw = asString(value, '0').replace(/\D/g, '') || '0';

  if (decimals <= 0) {
    return raw;
  }

  const padded = raw.padStart(decimals + 1, '0');
  const whole = padded.slice(0, -decimals) || '0';
  const frac = padded.slice(-decimals).replace(/0+$/, '');

  return frac ? `${whole}.${frac}` : whole;
}

function toDisplayAmount(value, decimals = 6, displayDigits = 6) {
  const num = Number(fromBaseUnits(value, decimals));

  if (!Number.isFinite(num)) {
    return '0';
  }

  return num.toFixed(displayDigits);
}

function toBigIntSafe(value) {
  try {
    return BigInt(asString(value, '0'));
  } catch (_) {
    return 0n;
  }
}

function applySlippage(amountOutBaseUnits, slippageBps) {
  const amount = toBigIntSafe(amountOutBaseUnits);
  const bps = BigInt(Number(slippageBps || 0));

  if (amount <= 0n) {
    return '0';
  }

  const kept = (amount * (10000n - bps)) / 10000n;
  return kept > 0n ? kept.toString() : '0';
}

function buildPathText(pathSymbols = []) {
  return pathSymbols.filter(Boolean).join(' → ');
}

function normalizeFeeText(route) {
  if (route?.feeText) return String(route.feeText);
  if (route?.feeTier) return `${route.feeTier}`;
  if (route?.feeBps !== undefined && route?.feeBps !== null) {
    return `${(Number(route.feeBps) / 100).toFixed(2)}%`;
  }
  return '—';
}

function normalizeImpactText(route) {
  if (route?.priceImpactText) return String(route.priceImpactText);
  if (route?.priceImpact !== undefined && route?.priceImpact !== null) {
    const num = Number(route.priceImpact);
    if (Number.isFinite(num)) {
      return `${num.toFixed(2)}%`;
    }
  }
  return '—';
}

function getUnixDeadline(secondsFromNow = 1200) {
  return Math.floor(Date.now() / 1000) + Number(secondsFromNow || 1200);
}

function getOutputMeta(outputToken, config) {
  const defaults = { ...SUN_DEFAULTS, ...(config || {}) };

  if (outputToken?.key === 'TRX' || outputToken?.address === 'TRX') {
    return {
      ...outputToken,
      symbol: 'TRX',
      address: 'TRX',
      decimals: outputToken?.decimals ?? 6,
      wrappedAddress: defaults.wtrxAddress
    };
  }

  return {
    ...outputToken,
    wrappedAddress: outputToken?.address
  };
}

function buildRouteTemplates(inputToken, outputToken, config = {}) {
  const defaults = { ...SUN_DEFAULTS, ...(config || {}) };
  const outputMeta = getOutputMeta(outputToken, config);
  const routes = [];

  if (outputMeta.key === 'TRX' || outputMeta.address === 'TRX') {
    routes.push({
      kind: 'DIRECT_WTRX_UNWRAP',
      provider: 'SUN.io',
      routeLabel: `${inputToken.symbol} → TRX`,
      pathSymbols: [inputToken.symbol, 'TRX'],
      pathAddresses: [inputToken.address, defaults.wtrxAddress],
      metaText: 'Direct',
      feeText: 'Best direct'
    });

    routes.push({
      kind: 'SMART',
      provider: 'SUN.io',
      routeLabel: `${inputToken.symbol} → Smart Route → TRX`,
      pathSymbols: [inputToken.symbol, 'TRX'],
      pathAddresses: [inputToken.address, defaults.wtrxAddress],
      metaText: 'Smart Router',
      feeText: 'Aggregated'
    });

    routes.push({
      kind: 'WTRX_PREFERRED',
      provider: 'SUN.io',
      routeLabel: `${inputToken.symbol} → WTRX → TRX`,
      pathSymbols: [inputToken.symbol, 'WTRX', 'TRX'],
      pathAddresses: [inputToken.address, defaults.wtrxAddress],
      metaText: 'Wrapped exit',
      feeText: 'Multi-hop'
    });

    return routes.slice(0, defaults.routeCount);
  }

  routes.push({
    kind: 'DIRECT',
    provider: 'SUN.io',
    routeLabel: `${inputToken.symbol} → ${outputMeta.symbol}`,
    pathSymbols: [inputToken.symbol, outputMeta.symbol],
    pathAddresses: [inputToken.address, outputMeta.address],
    metaText: 'Direct',
    feeText: 'Best direct'
  });

  routes.push({
    kind: 'VIA_WTRX',
    provider: 'SUN.io',
    routeLabel: `${inputToken.symbol} → WTRX → ${outputMeta.symbol}`,
    pathSymbols: [inputToken.symbol, 'WTRX', outputMeta.symbol],
    pathAddresses: [inputToken.address, defaults.wtrxAddress, outputMeta.address],
    metaText: 'Via WTRX',
    feeText: 'Multi-hop'
  });

  routes.push({
    kind: 'SMART',
    provider: 'SUN.io',
    routeLabel: `${inputToken.symbol} → Smart Route → ${outputMeta.symbol}`,
    pathSymbols: [inputToken.symbol, outputMeta.symbol],
    pathAddresses: [inputToken.address, outputMeta.address],
    metaText: 'Smart Router',
    feeText: 'Aggregated'
  });

  return routes.slice(0, defaults.routeCount);
}

async function readAllowance({
  tronWeb,
  tokenAddress,
  owner,
  spender
}) {
  const contract = await tronWeb.contract(ERC20_ABI, tokenAddress);
  const raw = await contract.allowance(owner, spender).call();
  return asString(raw, '0');
}

async function approveMax({
  tronWeb,
  tokenAddress,
  spender
}) {
  const contract = await tronWeb.contract(ERC20_ABI, tokenAddress);
  const tx = await contract.approve(spender, SUN_DEFAULTS.infiniteApproveThreshold).send({
    shouldPollResponse: true
  });

  return tx;
}

function normalizeExternalRoute(rawRoute, {
  inputToken,
  outputToken,
  amountInBaseUnits,
  slippageBps,
  fallbackTemplate,
  index
}) {
  const outputMeta = getOutputMeta(outputToken, {});
  const amountOutBaseUnits =
    rawRoute?.amountOutBaseUnits ??
    rawRoute?.amountOut ??
    rawRoute?.quoteOut ??
    rawRoute?.outAmount ??
    '0';

  const minReceivedBaseUnits =
    rawRoute?.minReceivedBaseUnits ??
    rawRoute?.amountOutMin ??
    applySlippage(amountOutBaseUnits, slippageBps);

  const pathSymbols =
    rawRoute?.pathSymbols ||
    rawRoute?.symbols ||
    fallbackTemplate?.pathSymbols ||
    [inputToken.symbol, outputMeta.symbol];

  const pathAddresses =
    rawRoute?.pathAddresses ||
    rawRoute?.path ||
    fallbackTemplate?.pathAddresses ||
    [inputToken.address, outputMeta.address];

  return {
    id: rawRoute?.id || `sun-route-${index + 1}`,
    provider: 'SUN.io',
    routeLabel: rawRoute?.routeLabel || fallbackTemplate?.routeLabel || buildPathText(pathSymbols),
    amountOut: Number(toDisplayAmount(amountOutBaseUnits, outputMeta.decimals, 6)),
    minReceived: Number(toDisplayAmount(minReceivedBaseUnits, outputMeta.decimals, 6)),
    priceImpact: normalizeImpactText(rawRoute),
    feeText: normalizeFeeText(rawRoute),
    pathText: buildPathText(pathSymbols),
    metaText: rawRoute?.metaText || fallbackTemplate?.metaText || 'Direct contract',
    executionData: {
      routerAddress: rawRoute?.routerAddress || rawRoute?.contractAddress || rawRoute?.router || null,
      method: rawRoute?.method || rawRoute?.functionName || null,
      params: rawRoute?.params || rawRoute?.args || null,
      amountInBaseUnits,
      amountOutBaseUnits: asString(amountOutBaseUnits, '0'),
      minReceivedBaseUnits: asString(minReceivedBaseUnits, '0'),
      pathAddresses,
      raw: rawRoute
    }
  };
}

async function resolveRoutesViaCustomResolver({
  tronWeb,
  amountIn,
  inputToken,
  outputToken,
  routeCount,
  slippageBps,
  config
}) {
  if (typeof config?.sunQuoteResolver !== 'function') {
    return null;
  }

  const raw = await config.sunQuoteResolver({
    tronWeb,
    amountIn,
    inputToken,
    outputToken,
    routeCount,
    slippageBps,
    config
  });

  if (!Array.isArray(raw)) {
    return [];
  }

  const amountInBaseUnits = toBaseUnits(amountIn, inputToken.decimals);
  const templates = buildRouteTemplates(inputToken, outputToken, config);

  return raw.slice(0, routeCount).map((route, index) =>
    normalizeExternalRoute(route, {
      inputToken,
      outputToken,
      amountInBaseUnits,
      slippageBps,
      fallbackTemplate: templates[index],
      index
    })
  );
}

async function resolveRoutesViaCalculationService({
  amountIn,
  inputToken,
  outputToken,
  routeCount,
  slippageBps,
  config
}) {
  const endpoint =
    config?.sunCalculationServiceUrl ||
    config?.calculationServiceUrl ||
    null;

  if (!endpoint) {
    return null;
  }

  const amountInBaseUnits = toBaseUnits(amountIn, inputToken.decimals);
  const templates = buildRouteTemplates(inputToken, outputToken, config);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(config?.sunCalculationHeaders || {})
    },
    body: JSON.stringify({
      tokenIn: inputToken.address,
      tokenOut: outputToken.address,
      amountIn: amountInBaseUnits,
      amountInDecimal: amountIn,
      tokenInDecimals: inputToken.decimals,
      tokenOutDecimals: outputToken.decimals,
      routeCount,
      routeTemplates: templates.map((route) => ({
        kind: route.kind,
        path: route.pathAddresses
      }))
    })
  });

  if (!response.ok) {
    throw new Error(`SUN calculation service failed with status ${response.status}`);
  }

  const json = await response.json();

  const rawRoutes =
    json?.routes ||
    json?.data?.routes ||
    json?.data ||
    [];

  if (!Array.isArray(rawRoutes)) {
    return [];
  }

  return rawRoutes.slice(0, routeCount).map((route, index) =>
    normalizeExternalRoute(route, {
      inputToken,
      outputToken,
      amountInBaseUnits,
      slippageBps,
      fallbackTemplate: templates[index],
      index
    })
  );
}

function buildFallbackRoutes({
  amountIn,
  inputToken,
  outputToken,
  routeCount,
  slippageBps,
  config
}) {
  const amountInBaseUnits = toBaseUnits(amountIn, inputToken.decimals);
  const templates = buildRouteTemplates(inputToken, outputToken, config);
  const outputMeta = getOutputMeta(outputToken, config);

  return templates.slice(0, routeCount).map((template, index) => {
    const roughOut = outputMeta.key === 'TRX'
      ? amountInBaseUnits
      : amountInBaseUnits;

    const minReceivedBaseUnits = applySlippage(roughOut, slippageBps);

    return {
      id: `sun-fallback-${index + 1}`,
      provider: 'SUN.io',
      routeLabel: template.routeLabel,
      amountOut: Number(toDisplayAmount(roughOut, outputMeta.decimals, 6)),
      minReceived: Number(toDisplayAmount(minReceivedBaseUnits, outputMeta.decimals, 6)),
      priceImpact: '—',
      feeText: template.feeText,
      pathText: buildPathText(template.pathSymbols),
      metaText: `${template.metaText} · needs live quote`,
      executionData: {
        routerAddress: null,
        method: null,
        params: null,
        amountInBaseUnits,
        amountOutBaseUnits: roughOut,
        minReceivedBaseUnits,
        pathAddresses: template.pathAddresses,
        raw: {
          fallback: true,
          kind: template.kind
        }
      }
    };
  });
}

export async function getSunSwapRoutes({
  tronWeb,
  amountIn,
  inputToken,
  outputToken,
  routeCount = 3,
  slippageBps = 300,
  config = {}
}) {
  if (!tronWeb) {
    throw new Error('SUN.io provider: tronWeb is required');
  }

  if (!amountIn || Number(amountIn) <= 0) {
    return [];
  }

  const customRoutes = await resolveRoutesViaCustomResolver({
    tronWeb,
    amountIn,
    inputToken,
    outputToken,
    routeCount,
    slippageBps,
    config
  });

  if (Array.isArray(customRoutes) && customRoutes.length) {
    return customRoutes;
  }

  const serviceRoutes = await resolveRoutesViaCalculationService({
    amountIn,
    inputToken,
    outputToken,
    routeCount,
    slippageBps,
    config
  });

  if (Array.isArray(serviceRoutes) && serviceRoutes.length) {
    return serviceRoutes;
  }

  return buildFallbackRoutes({
    amountIn,
    inputToken,
    outputToken,
    routeCount,
    slippageBps,
    config
  });
}

export async function executeSunSwapRoute({
  tronWeb,
  route,
  amountIn,
  inputToken,
  outputToken,
  recipient,
  slippageBps = 300,
  config = {}
}) {
  if (!tronWeb) {
    throw new Error('SUN.io execute: tronWeb is required');
  }

  if (!route) {
    throw new Error('SUN.io execute: route is required');
  }

  if (!recipient) {
    throw new Error('SUN.io execute: recipient is required');
  }

  const outputMeta = getOutputMeta(outputToken, config);
  const routerAddress =
    route?.executionData?.routerAddress ||
    config?.smartRouterAddress ||
    config?.v3RouterAddress ||
    SUN_DEFAULTS.smartRouterAddress;

  const amountInBaseUnits =
    route?.executionData?.amountInBaseUnits ||
    toBaseUnits(amountIn, inputToken.decimals);

  const minReceivedBaseUnits =
    route?.executionData?.minReceivedBaseUnits ||
    applySlippage(
      route?.executionData?.amountOutBaseUnits || amountInBaseUnits,
      slippageBps
    );

  if (typeof config?.sunSwapExecutor === 'function') {
    return config.sunSwapExecutor({
      tronWeb,
      route,
      amountIn,
      inputToken,
      outputToken,
      recipient,
      slippageBps,
      routerAddress,
      amountInBaseUnits,
      minReceivedBaseUnits,
      config
    });
  }

  const owner =
    tronWeb?.defaultAddress?.base58 ||
    recipient;

  if (!owner) {
    throw new Error('SUN.io execute: wallet address not available');
  }

  const currentAllowance = await readAllowance({
    tronWeb,
    tokenAddress: inputToken.address,
    owner,
    spender: routerAddress
  });

  if (toBigIntSafe(currentAllowance) < toBigIntSafe(amountInBaseUnits)) {
    await approveMax({
      tronWeb,
      tokenAddress: inputToken.address,
      spender: routerAddress
    });
  }

  const router = await tronWeb.contract(GENERIC_ROUTER_ABI, routerAddress);
  const pathAddresses =
    route?.executionData?.pathAddresses ||
    [inputToken.address, outputMeta.address];

  const deadline =
    route?.executionData?.deadline ||
    getUnixDeadline(config?.defaultDeadlineSeconds || SUN_DEFAULTS.defaultDeadlineSeconds);

  const explicitMethod = route?.executionData?.method || null;
  const explicitParams = route?.executionData?.params || null;

  if (explicitMethod && explicitParams && typeof router?.[explicitMethod] === 'function') {
    const tx = await router[explicitMethod](...(Array.isArray(explicitParams) ? explicitParams : [explicitParams])).send({
      shouldPollResponse: true
    });

    return {
      ok: true,
      provider: 'SUN.io',
      routeId: route.id,
      tx
    };
  }

  if (
    (outputMeta.key === 'TRX' || outputMeta.address === 'TRX') &&
    typeof router.swapExactTokensForTRX === 'function'
  ) {
    const tx = await router.swapExactTokensForTRX(
      amountInBaseUnits,
      minReceivedBaseUnits,
      pathAddresses,
      recipient,
      deadline
    ).send({
      shouldPollResponse: true
    });

    return {
      ok: true,
      provider: 'SUN.io',
      routeId: route.id,
      tx
    };
  }

  if (typeof router.swapExactTokensForTokens === 'function') {
    const normalizedPath = pathAddresses.map((address) =>
      address === 'TRX' ? SUN_DEFAULTS.wtrxAddress : address
    );

    const tx = await router.swapExactTokensForTokens(
      amountInBaseUnits,
      minReceivedBaseUnits,
      normalizedPath,
      recipient,
      deadline
    ).send({
      shouldPollResponse: true
    });

    return {
      ok: true,
      provider: 'SUN.io',
      routeId: route.id,
      tx
    };
  }

  throw new Error('SUN.io execute: no compatible router method available');
}
