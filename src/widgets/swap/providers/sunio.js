import sunioLogo from '../../../assets/sunio_swap.svg';

const PROVIDER_ID = 'sunio';
const PROVIDER_NAME = 'SUN.io';

export const SUNIO_MAINNET_DEFAULTS = {
  smartRouterAddress: 'TJ4NNy8xZEqsowCBhLvZ45LCqPdGjkET5j',
  calculationServiceUrl: 'https://rot.endjgfsv.link/swap/routerUniversal',
  feeLimit: 35_000_000,
  deadlineSeconds: 60 * 20,
  defaultSlippageBps: 300,
  typeList: 'PSM,CURVE,CURVE_COMBINATION,WTRX,SUNSWAP_V1,SUNSWAP_V2,SUNSWAP_V3'
};

export function getSunioProviderMeta() {
  return {
    id: PROVIDER_ID,
    name: PROVIDER_NAME,
    logo: sunioLogo
  };
}

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
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const SMART_ROUTER_ABI = [
  {
    inputs: [
      { name: 'path', type: 'address[]' },
      { name: 'poolVersion', type: 'string[]' },
      { name: 'versionLen', type: 'uint256[]' },
      { name: 'fees', type: 'uint24[]' },
      {
        components: [
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMin', type: 'uint256' },
          { name: 'to', type: 'address' },
          { name: 'deadline', type: 'uint256' }
        ],
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'swapExactInput',
    outputs: [{ name: 'amountsOut', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function'
  }
];

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getWalletStateSafe(wallet) {
  return wallet?.getWalletState?.() || wallet?.getState?.() || null;
}

function getTronWebSafe(wallet) {
  return wallet?.getTronWeb?.() || getWalletStateSafe(wallet)?.tronWeb || null;
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

function ensureTronWebAddress(tronWeb, address) {
  if (!tronWeb || !address) return;

  try {
    tronWeb.setAddress?.(address);
  } catch (_) {}

  try {
    const hex = tronWeb.address.toHex(address);
    tronWeb.defaultAddress = { base58: address, hex };
  } catch (_) {}
}

function decimalToRaw(amount, decimals) {
  const [w, f = ''] = String(amount || '0').split('.');
  const d = BigInt(decimals || 0);
  const frac = (f + '0'.repeat(Number(d))).slice(0, Number(d));
  return BigInt(w || '0') * 10n ** d + BigInt(frac || '0');
}

function normalizeBigintLike(v) {
  return BigInt(v?.toString?.() || '0');
}

function calcMinOutRaw(expected, bps) {
  return (normalizeBigintLike(expected) * (10000n - BigInt(bps))) / 10000n;
}

export async function getSunioQuotes({
  amountIn,
  targetToken,
  fromTokenAddress,
  tokenAddresses = {},
  inputDecimals = 6,
  outputDecimals = 6,
  routeCount = 3,
  typeList = SUNIO_MAINNET_DEFAULTS.typeList,
  calculationServiceUrl = SUNIO_MAINNET_DEFAULTS.calculationServiceUrl
} = {}) {
  if (!amountIn || amountIn <= 0) return [];

  const toToken =
    targetToken === 'TRX'
      ? tokenAddresses.TRX || SUNIO_TOKEN_ADDRESSES.TRX
      : tokenAddresses.USDT || SUNIO_TOKEN_ADDRESSES.USDT;

  const amountInRaw = decimalToRaw(amountIn, inputDecimals).toString();

  const url = new URL(calculationServiceUrl);
  url.searchParams.set('fromToken', fromTokenAddress);
  url.searchParams.set('toToken', toToken);
  url.searchParams.set('amountIn', amountInRaw);
  url.searchParams.set('typeList', typeList);

  const res = await fetch(url.toString());
  const data = await res.json();

  return (data?.data || [])
    .slice(0, routeCount)
    .map((r) => ({
      id: `sunio-${Date.now()}-${Math.random()}`,
      provider: PROVIDER_ID,
      providerName: PROVIDER_NAME,
      providerLogo: sunioLogo,
      fromToken: '4TEEN',
      toToken: targetToken,
      path: r.tokens,
      poolVersion: r.poolVersions,
      versionLen: r.poolVersions?.map(() => 1) || [],
      fees: r.poolFees || [],
      expectedOut: r.amountOut,
      amountOutRaw: r.amountOutRaw,
      outputDecimals
    }));
}

export async function checkSunioAllowance({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  amountIn,
  tokenDecimals = 6
}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  ensureTronWebAddress(tronWeb, owner);

  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const allowance = await token.allowance(owner, spenderAddress).call();

  const required = decimalToRaw(amountIn, tokenDecimals);

  return {
    ok: true,
    hasEnoughAllowance: normalizeBigintLike(allowance) >= required
  };
}

export async function ensureSunioApproval({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress
}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  ensureTronWebAddress(tronWeb, owner);

  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const txid = await token
    .approve(spenderAddress, MAX_UINT256)
    .send({ feeLimit: SUNIO_MAINNET_DEFAULTS.feeLimit });

  return { ok: true, txid };
}

export async function waitForSunioTransactionConfirmation({
  wallet,
  txid,
  timeoutMs = 120000
}) {
  const tronWeb = getTronWebSafe(wallet);

  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const info = await tronWeb.trx.getTransactionInfo(txid);
      if (info?.receipt?.result === 'SUCCESS') {
        return { ok: true };
      }
    } catch (_) {}
    await wait(1500);
  }

  throw new Error('Transaction timeout');
}

export async function executeSunioSwap({
  wallet,
  route,
  amountIn,
  slippage,
  inputTokenAddress,
  inputTokenDecimals = 6
}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  ensureTronWebAddress(tronWeb, owner);

  const amountInRaw = decimalToRaw(amountIn, inputTokenDecimals);
  const minOut = calcMinOutRaw(route.amountOutRaw, slippage * 100);

  const router = await tronWeb.contract(
    SMART_ROUTER_ABI,
    SUNIO_MAINNET_DEFAULTS.smartRouterAddress
  );

  const txid = await router
    .swapExactInput(
      route.path,
      route.poolVersion,
      route.versionLen.map(String),
      route.fees.map(Number),
      [
        amountInRaw.toString(),
        minOut.toString(),
        owner,
        String(Math.floor(Date.now() / 1000) + 1200)
      ]
    )
    .send({
      feeLimit: SUNIO_MAINNET_DEFAULTS.feeLimit
    });

  await waitForSunioTransactionConfirmation({ wallet, txid });

  return { ok: true, txid };
}
