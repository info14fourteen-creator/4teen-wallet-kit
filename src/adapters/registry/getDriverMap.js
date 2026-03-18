import { createTronLinkDriver } from '../drivers/tronlink/index.js';
import { createOkxDriver } from '../drivers/okx/index.js';
import { createBinanceDriver } from '../drivers/binance/index.js';
import { createTokenPocketDriver } from '../drivers/tokenpocket/index.js';
import { createBitgetDriver } from '../drivers/bitget/index.js';
import { createTrustDriver } from '../drivers/trust/index.js';
import { createMetaMaskDriver } from '../drivers/metamask/index.js';
import { createWalletConnectDriver } from '../drivers/walletconnect/index.js';

let driverMap = null;

export function getDriverMap() {
  if (driverMap) {
    return driverMap;
  }

  driverMap = {
    tronlink: createTronLinkDriver(),
    okx: createOkxDriver(),
    binance: createBinanceDriver(),
    tokenpocket: createTokenPocketDriver(),
    bitget: createBitgetDriver(),
    trust: createTrustDriver(),
    metamask: createMetaMaskDriver(),
    walletconnect: createWalletConnectDriver()
  };

  return driverMap;
}
