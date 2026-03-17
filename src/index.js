<script>
(function () {
  const BASE = "https://info14fourteen-creator.github.io/4teen-wallet-kit";
  const PROJECT_ID = "9939c89b9fce5af4c2c69f1835c5164b";
  const BUILD = Date.now();

  function loadCSS(url) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`link[href^="${url.split("?")[0]}"]`);
      if (existing) return resolve();

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = resolve;
      link.onerror = () => reject(new Error("Failed to load CSS: " + url));
      document.head.appendChild(link);
    });
  }

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src^="${url.split("?")[0]}"]`);
      if (existing && window.FourteenConnect) return resolve();

      const s = document.createElement("script");
      s.src = url;
      s.async = false;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Failed to load script: " + url));
      document.head.appendChild(s);
    });
  }

  async function bootstrap() {
    await loadCSS(`${BASE}/4teen-wallet-kit.css?v=${BUILD}`);
    await loadScript(`${BASE}/fourteen-connect.umd.js?v=${BUILD}`);

    if (!window.FourteenConnect) {
      throw new Error("window.FourteenConnect is missing");
    }

    window.FourteenConnect.initDebugOverlay({ maxLogs: 300 });

    const kit = window.FourteenConnect.initFourteenConnect({
      projectId: PROJECT_ID
    });

    window.FourteenKit = kit;

    document.querySelectorAll("[data-fourteen-wallet]").forEach((slot) => {
      if (slot.dataset.fourteenMounted === "1") return;

      const variant = slot.getAttribute("data-variant") || "standard";

      window.FourteenConnect.mountWalletButton(slot, {
        variant,
        onConnectClick: async () => {
          await kit.connect();
        },
        onRefresh: async () => {
          await kit.refreshBalances();
        },
        onDisconnect: async () => {
          await kit.disconnect();
        }
      });

      slot.dataset.fourteenMounted = "1";
    });

    console.log("[4TEEN] Wallet kit ready");
  }

  bootstrap().catch((error) => {
    console.error("[4TEEN] Wallet bootstrap failed:", error);
  });
})();
</script>
