export function shortenAddress(address) {
  if (!address || address.length < 10) return address || '';
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
