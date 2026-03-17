export function fromSun(value) {
  return Number(value || 0) / 1_000_000;
}

export function normalizeTronBalance(value) {
  return Number(fromSun(value).toFixed(6));
}
