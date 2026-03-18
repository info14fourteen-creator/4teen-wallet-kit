function getAdapterName(adapter) {
  return (
    adapter?.name ||
    adapter?.adapterName ||
    adapter?.displayName ||
    adapter?.id ||
    'Wallet'
  );
}

function isAlreadyConnectedError(error) {
  const message = String(error?.message || '').toLowerCase();

  return (
    message.includes('already connected') ||
    message.includes('connection already open') ||
    message.includes('session currently connected')
  );
}

export async function connectAdapter(adapter) {
  if (!adapter || typeof adapter.connect !== 'function') {
    throw new Error(`Adapter ${getAdapterName(adapter)} has no connect()`);
  }

  try {
    await adapter.connect();
    return { ok: true, adapter };
  } catch (error) {
    if (isAlreadyConnectedError(error)) {
      return { ok: true, adapter };
    }

    throw error;
  }
}
