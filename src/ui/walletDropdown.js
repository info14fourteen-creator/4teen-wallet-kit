export function createWalletDropdown({
  onRefresh,
  onDisconnect,
  onDiagnostics
}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'fourteen-wallet-dropdown';
  wrapper.innerHTML = `
    <button type="button" data-action="refresh">Refresh balances</button>
    <button type="button" data-action="diagnostics">Diagnostics</button>
    <button type="button" data-action="disconnect">Disconnect</button>
  `;

  wrapper.querySelector('[data-action="refresh"]')?.addEventListener('click', () => {
    onRefresh?.();
  });

  wrapper.querySelector('[data-action="diagnostics"]')?.addEventListener('click', () => {
    onDiagnostics?.();
  });

  wrapper.querySelector('[data-action="disconnect"]')?.addEventListener('click', () => {
    onDisconnect?.();
  });

  return wrapper;
}
