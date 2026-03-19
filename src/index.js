<script>
(function () {
  if (window.__FOURTEEN_BOOTSTRAP__) return;
  window.__FOURTEEN_BOOTSTRAP__ = true;

  const BASE = "https://info14fourteen-creator.github.io/4teen-wallet-kit";
  const PROJECT_ID = "9939c89b9fce5af4c2c69f1835c5164b";
  const BUILD = Date.now();

  function loadCSS(url) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href^="${url.split("?")[0]}"]`)) {
        return resolve();
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      if (window.FourteenConnect) return resolve();

      const existing = document.querySelector(`script[src^="${url.split("?")[0]}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load existing script: " + url)), { once: true });
        return;
      }

      const s = document.createElement("script");
      s.src = url;
      s.async = true;
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

    if (!window.FourteenKit) {
      window.FourteenKit = window.FourteenConnect.initFourteenConnect({
        projectId: PROJECT_ID
      });
    }

    document.querySelectorAll("[data-fourteen-wallet]").forEach((slot) => {
      if (slot.dataset.fourteenMounted === "1") return;

      const variant = slot.getAttribute("data-variant") || "standard";

      window.FourteenConnect.mountWalletButton(slot, {
        variant,
        onConnectClick: async (walletId) => {
          await window.FourteenKit.connect(walletId);
          await new Promise((resolve) => setTimeout(resolve, 600));
          await window.FourteenKit.refreshBalances();
        },
        onRefresh: async () => {
          await window.FourteenKit.refreshBalances();
        },
        onDisconnect: async () => {
          await window.FourteenKit.disconnect();
        }
      });

      slot.dataset.fourteenMounted = "1";
    });

    document.querySelectorAll("[data-fourteen-buy]").forEach((slot) => {
      if (slot.dataset.fourteenMounted === "1") return;

      window.FourteenConnect.mountDirectBuy(slot);

      slot.dataset.fourteenMounted = "1";
    });

    console.log("[4TEEN] Wallet kit ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bootstrap().catch((error) => {
        console.error("[4TEEN] Wallet bootstrap failed:", error);
      });
    }, { once: true });
  } else {
    bootstrap().catch((error) => {
      console.error("[4TEEN] Wallet bootstrap failed:", error);
    });
  }
})();
</script>
