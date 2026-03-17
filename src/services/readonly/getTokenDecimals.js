import TronWeb from 'tronweb';
import { TRC20_ABI } from '../contracts/trc20.js';

function createReadOnlyTronWeb() {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });
}

export async function getTokenDecimals(tokenAddress) {
  const tronWeb = createReadOnlyTronWeb();
  const contract = await tronWeb.contract(TRC20_ABI, tokenAddress);
  const value = await contract.decimals().call();
  return Number(value);
}
