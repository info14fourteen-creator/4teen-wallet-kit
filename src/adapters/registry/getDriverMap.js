import { createTronLinkDriver } from '../drivers/tronlink/index.js';

let driverMap = null;

export function getDriverMap() {
  if (driverMap) return driverMap;

  const tronlink = createTronLinkDriver();

  driverMap = {
    tronlink
  };

  return driverMap;
}
