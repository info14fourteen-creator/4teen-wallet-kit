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
    allowanceRaw: allowance.toString(),
    requiredAmountRaw: required.toString(),
    hasEnoughAllowance: normalizeBigintLike(allowance) >= required
  };
}

export async function ensureSunioApproval({
  wallet,
  tokenAddress,
  spenderAddress = SUNIO_MAINNET_DEFAULTS.smartRouterAddress,
  feeLimit = SUNIO_MAINNET_DEFAULTS.feeLimit
}) {
  const tronWeb = getTronWebSafe(wallet);
  const owner = getConnectedAddress(wallet);

  ensureTronWebAddress(tronWeb, owner);

  const token = await tronWeb.contract(TRC20_ABI, tokenAddress);

  const txid = await token
    .approve(spenderAddress, MAX_UINT256)
    .send({ feeLimit, callValue: 0 });

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

  try {
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
        feeLimit: SUNIO_MAINNET_DEFAULTS.feeLimit,
        callValue: 0
      });

    await waitForSunioTransactionConfirmation({ wallet, txid });

    return { ok: true, txid };
  } catch (e) {
    const msg = String(e?.message || '').toLowerCase();

    if (msg.includes('reject') || msg.includes('denied')) {
      return { ok: false, rejected: true };
    }

    throw new Error(String(e?.message || 'Swap failed'));
  }
}
