import TronWeb from 'tronweb';
import { TRC20_ABI } from '../contracts/trc20.js';

function createReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTokenTotalSupply(tokenAddress, decimals = 6) {
  const tronWeb = createReadOnlyTronWeb();
  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const raw = await contract.totalSupply().call();
  return Number(raw) / Math.pow(10, decimals);
}
