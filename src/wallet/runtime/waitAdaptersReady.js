function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isReadyStateUsable(readyState) {
  const state = String(readyState || '');

  return (
    state === 'Found' ||
    state === 'Installed' ||
    state === 'Loadable'
  );
}

export async function waitAdaptersReady(adapters = [], options = {}) {
  const {
    attempts = 12,
    intervalMs = 200
  } = options;

  const normalizedAdapters = Array.isArray(adapters) ? adapters : [];

  if (!normalizedAdapters.length) {
    return {
      ok: true,
      ready: false,
      attempts: 0
    };
  }

  for (let i = 0; i < attempts; i++) {
    const anyReady = normalizedAdapters.some((adapter) => {
      return isReadyStateUsable(adapter?.readyState);
    });

    if (anyReady) {
      return {
        ok: true,
        ready: true,
        attempts: i + 1
      };
    }

    await sleep(intervalMs);
  }

  return {
    ok: true,
    ready: false,
    attempts
  };
}
