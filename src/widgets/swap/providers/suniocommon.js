import TronWeb from 'tronweb';

export const TRON_RPC = 'https://api.trongrid.io';

export const ROUTER_ADDRESS = 'TP7sU6xJrjGvZ9u6Vw2WZsMppAf5BgU984';

export const SMART_ROUTER_ABI = [
  {
    name: 'swapExactInput',
    type: 'Function',
    stateMutability: 'Nonpayable',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
      { name: 'poolVersion', type: 'uint8[]' },
      { name: 'versionLen', type: 'uint256[]' },
      { name: 'fees', type: 'uint24[]' },
      { name: 'data', type: 'bytes' }
    ],
    outputs: []
  }
];

export function createTronWebInstance(privateKey) {
  return new TronWeb({
    fullHost: TRON_RPC,
    privateKey
  });
}

export function normalizeAddress(address, tronWeb) {
  if (!address) return address;
  if (address.startsWith('T')) return address;
  try {
    return tronWeb.address.fromHex(address);
  } catch {
    return address;
  }
}

export function buildPath(tokens, tronWeb) {
  return tokens.map((t) => tronWeb.address.toHex(t));
}

export function buildPoolVersions(poolVersions) {
  return poolVersions.map((v) => {
    const version = String(v).toLowerCase();
    if (version === 'v2') return 2;
    if (version === 'v3') return 3;
    if (version === 'v4') return 4;
    return 3;
  });
}

export function buildFees(poolFees) {
  return poolFees.map((f) => Number(f || 0));
}

export function buildVersionLen(poolVersions) {
  return poolVersions.map(() => 1);
}

export function calculateMinOut(expectedOutRaw, slippage) {
  const amount = BigInt(expectedOutRaw);
  const slip = BigInt(Math.floor(slippage * 100));
  return (amount * (10000n - slip)) / 10000n;
}

export async function ensureAllowance({
  tronWeb,
  tokenAddress,
  owner,
  spender,
  amount
}) {
  const contract = await tronWeb.contract().at(tokenAddress);

  const allowance = await contract.allowance(owner, spender).call();

  if (BigInt(allowance) >= BigInt(amount)) return;

  await contract.approve(spender, amount).send({
    feeLimit: 100_000_000
  });
}

export async function executeSunioSwap({
  privateKey,
  route,
  slippage = 0.5
}) {
  const tronWeb = createTronWebInstance(privateKey);

  const router = await tronWeb.contract(
    SMART_ROUTER_ABI,
    ROUTER_ADDRESS
  );

  const owner = tronWeb.defaultAddress.base58;

  const path = buildPath(route.tokens, tronWeb);
  const poolVersion = buildPoolVersions(route.poolVersions);
  const fees = buildFees(route.poolFees);
  const versionLen = buildVersionLen(route.poolVersions);

  const amountIn = route.amountInRaw;
  const minOut = calculateMinOut(route.expectedOutRaw, slippage);

  await ensureAllowance({
    tronWeb,
    tokenAddress: route.tokens[0],
    owner,
    spender: ROUTER_ADDRESS,
    amount: amountIn
  });

  return router.swapExactInput(
    amountIn,
    minOut.toString(),
    path,
    owner,
    Math.floor(Date.now() / 1000) + 600,
    poolVersion,
    versionLen,
    fees,
    '0x'
  ).send({
    feeLimit: 200_000_000
  });
}
