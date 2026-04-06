import { t as e } from "./exports-D_wXhA01.js";
import { b as t } from "./ModalController-DHlkqy_7.js";
import { t as n } from "./w3m-tooltip-BYcqa_Vj.js";
import { t as r } from "./ConstantsUtil-BluUpxh9.js";
import { i, l as a, t as o } from "./lit-CKWVc9vf.js";
import { o as s } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/styles.js
var c = a`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`, l = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, u = class extends o {
	constructor() {
		super(), this.resizeObserver = void 0, this.prevHeight = "0px", this.prevHistoryLength = 1, this.unsubscribe = [], this.view = t.state.view, this.viewDirection = "", this.unsubscribe.push(t.subscribeKey("view", (e) => this.onViewChange(e)));
	}
	firstUpdated() {
		this.resizeObserver = new ResizeObserver(([e]) => {
			let t = `${e?.contentRect.height}px`;
			this.prevHeight !== "0px" && (this.style.setProperty("--prev-height", this.prevHeight), this.style.setProperty("--new-height", t), this.style.animation = "w3m-view-height 150ms forwards ease", this.style.height = "auto"), setTimeout(() => {
				this.prevHeight = t, this.style.animation = "unset";
			}, r.ANIMATION_DURATIONS.ModalHeight);
		}), this.resizeObserver?.observe(this.getWrapper());
	}
	disconnectedCallback() {
		this.resizeObserver?.unobserve(this.getWrapper()), this.unsubscribe.forEach((e) => e());
	}
	render() {
		return i`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`;
	}
	viewTemplate() {
		switch (this.view) {
			case "AccountSettings": return i`<w3m-account-settings-view></w3m-account-settings-view>`;
			case "Account": return i`<w3m-account-view></w3m-account-view>`;
			case "AllWallets": return i`<w3m-all-wallets-view></w3m-all-wallets-view>`;
			case "ApproveTransaction": return i`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;
			case "BuyInProgress": return i`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;
			case "ChooseAccountName": return i`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;
			case "Connect": return i`<w3m-connect-view></w3m-connect-view>`;
			case "Create": return i`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;
			case "ConnectingWalletConnect": return i`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;
			case "ConnectingWalletConnectBasic": return i`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;
			case "ConnectingExternal": return i`<w3m-connecting-external-view></w3m-connecting-external-view>`;
			case "ConnectingSiwe": return i`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;
			case "ConnectWallets": return i`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;
			case "ConnectSocials": return i`<w3m-connect-socials-view></w3m-connect-socials-view>`;
			case "ConnectingSocial": return i`<w3m-connecting-social-view></w3m-connecting-social-view>`;
			case "DataCapture": return i`<w3m-data-capture-view></w3m-data-capture-view>`;
			case "DataCaptureOtpConfirm": return i`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;
			case "Downloads": return i`<w3m-downloads-view></w3m-downloads-view>`;
			case "EmailLogin": return i`<w3m-email-login-view></w3m-email-login-view>`;
			case "EmailVerifyOtp": return i`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;
			case "EmailVerifyDevice": return i`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;
			case "GetWallet": return i`<w3m-get-wallet-view></w3m-get-wallet-view>`;
			case "Networks": return i`<w3m-networks-view></w3m-networks-view>`;
			case "SwitchNetwork": return i`<w3m-network-switch-view></w3m-network-switch-view>`;
			case "ProfileWallets": return i`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;
			case "Transactions": return i`<w3m-transactions-view></w3m-transactions-view>`;
			case "OnRampProviders": return i`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;
			case "OnRampTokenSelect": return i`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;
			case "OnRampFiatSelect": return i`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;
			case "UpgradeEmailWallet": return i`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;
			case "UpdateEmailWallet": return i`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;
			case "UpdateEmailPrimaryOtp": return i`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;
			case "UpdateEmailSecondaryOtp": return i`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;
			case "UnsupportedChain": return i`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;
			case "Swap": return i`<w3m-swap-view></w3m-swap-view>`;
			case "SwapSelectToken": return i`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;
			case "SwapPreview": return i`<w3m-swap-preview-view></w3m-swap-preview-view>`;
			case "WalletSend": return i`<w3m-wallet-send-view></w3m-wallet-send-view>`;
			case "WalletSendSelectToken": return i`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;
			case "WalletSendPreview": return i`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;
			case "WhatIsABuy": return i`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;
			case "WalletReceive": return i`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;
			case "WalletCompatibleNetworks": return i`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;
			case "WhatIsAWallet": return i`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;
			case "ConnectingMultiChain": return i`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;
			case "WhatIsANetwork": return i`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;
			case "ConnectingFarcaster": return i`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;
			case "SwitchActiveChain": return i`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;
			case "RegisterAccountName": return i`<w3m-register-account-name-view></w3m-register-account-name-view>`;
			case "RegisterAccountNameSuccess": return i`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;
			case "SmartSessionCreated": return i`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;
			case "SmartSessionList": return i`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;
			case "SIWXSignMessage": return i`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;
			case "Pay": return i`<w3m-pay-view></w3m-pay-view>`;
			case "PayLoading": return i`<w3m-pay-loading-view></w3m-pay-loading-view>`;
			case "FundWallet": return i`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;
			case "PayWithExchange": return i`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;
			default: return i`<w3m-connect-view></w3m-connect-view>`;
		}
	}
	onViewChange(e) {
		n.hide();
		let i = r.VIEW_DIRECTION.Next, { history: a } = t.state;
		a.length < this.prevHistoryLength && (i = r.VIEW_DIRECTION.Prev), this.prevHistoryLength = a.length, this.viewDirection = i, setTimeout(() => {
			this.view = e;
		}, r.ANIMATION_DURATIONS.ViewTransition);
	}
	getWrapper() {
		return this.shadowRoot?.querySelector("div");
	}
};
u.styles = c, l([s()], u.prototype, "view", void 0), l([s()], u.prototype, "viewDirection", void 0), u = l([e("w3m-router")], u);
//#endregion
export { u as t };
