import { createTronLinkDriver } from '../drivers/tronlink/index.js';
import { createOkxDriver } from '../drivers/okx/index.js';
import { createBinanceDriver } from '../drivers/binance/index.js';
import { createTokenPocketDriver } from '../drivers/tokenpocket/index.js';
import { createBitgetDriver } from '../drivers/bitget/index.js';
import { createMetaMaskDriver } from '../drivers/metamask/index.js';

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
    metamask: createMetaMaskDriver()
  };

  return driverMap;
}
