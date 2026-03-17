import { FOURTEEN_TOKEN } from '../../core/config/token.js';
import { getTokenDecimals } from './getTokenDecimals.js';
import { getTokenSymbol } from './getTokenSymbol.js';
import { getTokenTotalSupply } from './getTokenTotalSupply.js';

export async function getTokenContractData(tokenAddress = FOURTEEN_TOKEN.address) {
  const [decimals, symbol] = await Promise.all([
    getTokenDecimals(tokenAddress),
    getTokenSymbol(tokenAddress)
  ]);

  const totalSupply = await getTokenTotalSupply(tokenAddress, decimals);

  return {
    address: tokenAddress,
    symbol,
    decimals,
    totalSupply
  };
}
