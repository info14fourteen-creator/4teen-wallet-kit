async function mountMobileShellSlot(slot) {
  if (!slot || slot.dataset[MOUNT_FLAG] === "1") return;

  const { FourteenConnect, FourteenKit } = await ensureKit();

  const brandText =
    slot.getAttribute("data-brand-text") ||
    slot.getAttribute("data-brand") ||
    "4teen.me";

  const instance = FourteenConnect.mountMobileShell({
    target: slot,
    brandText
  });

  FourteenConnect.mountWalletButton(instance.topWalletSlot, {
    variant: "compact",
    onConnectClick: async (walletId) => {
      await FourteenKit.connect(walletId);
      await new Promise((resolve) => setTimeout(resolve, 450));
      await refreshBalancesSafe();
    },
    onRefresh: async () => {
      await FourteenKit.refreshBalances();
    },
    onDisconnect: async () => {
      await FourteenKit.disconnect();
    }
  });

  FourteenConnect.mountWalletButton(instance.bottomWalletSlot, {
    variant: "mobile",
    onConnectClick: async (walletId) => {
      await FourteenKit.connect(walletId);
      await new Promise((resolve) => setTimeout(resolve, 450));
      await refreshBalancesSafe();
    },
    onRefresh: async () => {
      await FourteenKit.refreshBalances();
    },
    onDisconnect: async () => {
      await FourteenKit.disconnect();
    }
  });

  slot.dataset[MOUNT_FLAG] = "1";
}
