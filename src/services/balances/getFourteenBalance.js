import { FOURTEEN_TOKEN } from '../../core/config/token.js';
import { getTokenBalance } from './getTokenBalance.js';

export async function getFourteenBalance(addressOverride = null) {
  return getTokenBalance(
    FOURTEEN_TOKEN.address,
    FOURTEEN_TOKEN.decimals,
    addressOverride
  );
}
