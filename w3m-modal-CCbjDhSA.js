import { a as e, i as t, o as n, r, s as i, t as a } from "./exports-D_wXhA01.js";
import { C as o, H as s, K as c, M as l, N as u, S as d, T as f, b as p, d as m, p as h, r as g, s as _, t as v, v as y, w as b, x, y as ee } from "./ModalController-DHlkqy_7.js";
import { t as S } from "./SwapController-4z3X1f9r.js";
import "./w3m-tooltip-BYcqa_Vj.js";
import { t as C } from "./SIWXUtil-BkN6zpHU.js";
import { t as w } from "./ConstantsUtil-BluUpxh9.js";
import { i as T, l as E, t as D } from "./lit-CKWVc9vf.js";
import { a as O, o as k, s as A } from "./wui-text-ec7ybml8.js";
import "./wui-loading-spinner-D9SqO953.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-icon-link-BE6JisUI.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-icon-box-DJlJZe2u.js";
import "./wui-tag-BqdKUeiG.js";
import "./w3m-router-QIhbETug.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/ModalUtil.js
var j = {
	isUnsupportedChainView() {
		return p.state.view === "UnsupportedChain" || p.state.view === "SwitchNetwork" && p.state.history.includes("UnsupportedChain");
	},
	async safeClose() {
		if (this.isUnsupportedChainView()) {
			v.shake();
			return;
		}
		if (await C.isSIWXCloseDisabled()) {
			v.shake();
			return;
		}
		(p.state.view === "DataCapture" || p.state.view === "DataCaptureOtpConfirm") && m.disconnect(), v.close();
	}
}, te = E`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`, ne = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, M = class extends D {
	render() {
		return T`<slot></slot>`;
	}
};
M.styles = [i, te], M = ne([a("wui-card")], M);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-alertbar/styles.js
var re = E`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`, N = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, P = class extends D {
	constructor() {
		super(...arguments), this.message = "", this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.icon = "info";
	}
	render() {
		return this.style.cssText = `
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `, T`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `;
	}
	onClose() {
		o.close();
	}
};
P.styles = [i, re], N([A()], P.prototype, "message", void 0), N([A()], P.prototype, "backgroundColor", void 0), N([A()], P.prototype, "iconColor", void 0), N([A()], P.prototype, "icon", void 0), P = N([a("wui-alertbar")], P);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-alertbar/styles.js
var ie = E`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`, F = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ae = {
	info: {
		backgroundColor: "fg-350",
		iconColor: "fg-325",
		icon: "info"
	},
	success: {
		backgroundColor: "success-glass-reown-020",
		iconColor: "success-125",
		icon: "checkmark"
	},
	warning: {
		backgroundColor: "warning-glass-reown-020",
		iconColor: "warning-100",
		icon: "warningCircle"
	},
	error: {
		backgroundColor: "error-glass-reown-020",
		iconColor: "error-125",
		icon: "exclamationTriangle"
	}
}, I = class extends D {
	constructor() {
		super(), this.unsubscribe = [], this.open = o.state.open, this.onOpen(!0), this.unsubscribe.push(o.subscribeKey("open", (e) => {
			this.open = e, this.onOpen(!1);
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { message: e, variant: t } = o.state, n = ae[t];
		return T`
      <wui-alertbar
        message=${e}
        backgroundColor=${n?.backgroundColor}
        iconColor=${n?.iconColor}
        icon=${n?.icon}
      ></wui-alertbar>
    `;
	}
	onOpen(e) {
		this.open ? (this.animate([{
			opacity: 0,
			transform: "scale(0.85)"
		}, {
			opacity: 1,
			transform: "scale(1)"
		}], {
			duration: 150,
			fill: "forwards",
			easing: "ease"
		}), this.style.cssText = "pointer-events: auto") : e || (this.animate([{
			opacity: 1,
			transform: "scale(1)"
		}, {
			opacity: 0,
			transform: "scale(0.85)"
		}], {
			duration: 150,
			fill: "forwards",
			easing: "ease"
		}), this.style.cssText = "pointer-events: none");
	}
};
I.styles = ie, F([k()], I.prototype, "open", void 0), I = F([a("w3m-alertbar")], I);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-select/styles.js
var L = E`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`, R = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, z = class extends D {
	constructor() {
		super(...arguments), this.imageSrc = "";
	}
	render() {
		return T`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`;
	}
	imageTemplate() {
		return this.imageSrc ? T`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>` : T`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`;
	}
};
z.styles = [
	i,
	e,
	t,
	L
], R([A()], z.prototype, "imageSrc", void 0), z = R([a("wui-select")], z);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-header/styles.js
var B = E`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`, V = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, H = ["SmartSessionList"];
function U() {
	let e = p.state.data?.connector?.name, t = p.state.data?.wallet?.name, n = p.state.data?.network?.name, r = t ?? e, i = y.getConnectors();
	return {
		Connect: `Connect ${i.length === 1 && i[0]?.id === "w3m-email" ? "Email" : ""} Wallet`,
		Create: "Create Wallet",
		ChooseAccountName: void 0,
		Account: void 0,
		AccountSettings: void 0,
		AllWallets: "All Wallets",
		ApproveTransaction: "Approve Transaction",
		BuyInProgress: "Buy",
		ConnectingExternal: r ?? "Connect Wallet",
		ConnectingWalletConnect: r ?? "WalletConnect",
		ConnectingWalletConnectBasic: "WalletConnect",
		ConnectingSiwe: "Sign In",
		Convert: "Convert",
		ConvertSelectToken: "Select token",
		ConvertPreview: "Preview convert",
		Downloads: r ? `Get ${r}` : "Downloads",
		EmailLogin: "Email Login",
		EmailVerifyOtp: "Confirm Email",
		EmailVerifyDevice: "Register Device",
		GetWallet: "Get a wallet",
		Networks: "Choose Network",
		OnRampProviders: "Choose Provider",
		OnRampActivity: "Activity",
		OnRampTokenSelect: "Select Token",
		OnRampFiatSelect: "Select Currency",
		Pay: "How you pay",
		ProfileWallets: "Wallets",
		SwitchNetwork: n ?? "Switch Network",
		Transactions: "Activity",
		UnsupportedChain: "Switch Network",
		UpgradeEmailWallet: "Upgrade your Wallet",
		UpdateEmailWallet: "Edit Email",
		UpdateEmailPrimaryOtp: "Confirm Current Email",
		UpdateEmailSecondaryOtp: "Confirm New Email",
		WhatIsABuy: "What is Buy?",
		RegisterAccountName: "Choose name",
		RegisterAccountNameSuccess: "",
		WalletReceive: "Receive",
		WalletCompatibleNetworks: "Compatible Networks",
		Swap: "Swap",
		SwapSelectToken: "Select token",
		SwapPreview: "Preview swap",
		WalletSend: "Send",
		WalletSendPreview: "Review send",
		WalletSendSelectToken: "Select Token",
		WhatIsANetwork: "What is a network?",
		WhatIsAWallet: "What is a wallet?",
		ConnectWallets: "Connect wallet",
		ConnectSocials: "All socials",
		ConnectingSocial: g.state.socialProvider ? g.state.socialProvider : "Connect Social",
		ConnectingMultiChain: "Select chain",
		ConnectingFarcaster: "Farcaster",
		SwitchActiveChain: "Switch chain",
		SmartSessionCreated: void 0,
		SmartSessionList: "Smart Sessions",
		SIWXSignMessage: "Sign In",
		PayLoading: "Payment in progress",
		DataCapture: "Profile",
		DataCaptureOtpConfirm: "Confirm Email",
		FundWallet: "Fund wallet",
		PayWithExchange: "Deposit from an exchange"
	};
}
var W = class extends D {
	constructor() {
		super(), this.unsubscribe = [], this.heading = U()[p.state.view], this.network = _.state.activeCaipNetwork, this.networkImage = b.getNetworkImage(this.network), this.showBack = !1, this.prevHistoryLength = 1, this.view = p.state.view, this.viewDirection = "", this.headerText = U()[p.state.view], this.unsubscribe.push(f.subscribeNetworkImages(() => {
			this.networkImage = b.getNetworkImage(this.network);
		}), p.subscribeKey("view", (e) => {
			setTimeout(() => {
				this.view = e, this.headerText = U()[e];
			}, w.ANIMATION_DURATIONS.HeaderText), this.onViewChange(), this.onHistoryChange();
		}), _.subscribeKey("activeCaipNetwork", (e) => {
			this.network = e, this.networkImage = b.getNetworkImage(this.network);
		}));
	}
	disconnectCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return T`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
	}
	onWalletHelp() {
		d.sendEvent({
			type: "track",
			event: "CLICK_WALLET_HELP"
		}), p.push("WhatIsAWallet");
	}
	async onClose() {
		await j.safeClose();
	}
	rightHeaderTemplate() {
		let e = l?.state?.features?.smartSessions;
		return p.state.view !== "Account" || !e ? this.closeButtonTemplate() : T`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${() => p.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `;
	}
	closeButtonTemplate() {
		return T`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `;
	}
	titleTemplate() {
		let e = H.includes(this.view);
		return T`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e ? T`<wui-tag variant="main">Beta</wui-tag>` : null}
      </wui-flex>
    `;
	}
	leftHeaderTemplate() {
		let { view: e } = p.state, t = e === "Connect", n = l.state.enableEmbedded, r = e === "ApproveTransaction", i = e === "ConnectingSiwe", a = e === "Account", o = l.state.enableNetworkSwitch, s = r || i || t && n;
		return a && o ? T`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${O(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${O(this.networkImage)}
      ></wui-select>` : this.showBack && !s ? T`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>` : T`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`;
	}
	onNetworks() {
		this.isAllowedNetworkSwitch() && (d.sendEvent({
			type: "track",
			event: "CLICK_NETWORKS"
		}), p.push("Networks"));
	}
	isAllowedNetworkSwitch() {
		let e = _.getAllRequestedCaipNetworks(), t = e ? e.length > 1 : !1, n = e?.find(({ id: e }) => e === this.network?.id);
		return t || !n;
	}
	getPadding() {
		return this.heading ? [
			"l",
			"2l",
			"l",
			"2l"
		] : [
			"0",
			"2l",
			"0",
			"2l"
		];
	}
	onViewChange() {
		let { history: e } = p.state, t = w.VIEW_DIRECTION.Next;
		e.length < this.prevHistoryLength && (t = w.VIEW_DIRECTION.Prev), this.prevHistoryLength = e.length, this.viewDirection = t;
	}
	async onHistoryChange() {
		let { history: e } = p.state, t = this.shadowRoot?.querySelector("#dynamic");
		e.length > 1 && !this.showBack && t ? (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}).finished, this.showBack = !0, t.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		})) : e.length <= 1 && this.showBack && t && (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}).finished, this.showBack = !1, t.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}));
	}
	onGoBack() {
		p.goBack();
	}
};
W.styles = B, V([k()], W.prototype, "heading", void 0), V([k()], W.prototype, "network", void 0), V([k()], W.prototype, "networkImage", void 0), V([k()], W.prototype, "showBack", void 0), V([k()], W.prototype, "prevHistoryLength", void 0), V([k()], W.prototype, "view", void 0), V([k()], W.prototype, "viewDirection", void 0), V([k()], W.prototype, "headerText", void 0), W = V([a("w3m-header")], W);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-snackbar/styles.js
var oe = E`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`, G = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, K = class extends D {
	constructor() {
		super(...arguments), this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.icon = "checkmark", this.message = "", this.loading = !1, this.iconType = "default";
	}
	render() {
		return T`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `;
	}
	templateIcon() {
		return this.loading ? T`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : this.iconType === "default" ? T`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>` : T`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`;
	}
};
K.styles = [i, oe], G([A()], K.prototype, "backgroundColor", void 0), G([A()], K.prototype, "iconColor", void 0), G([A()], K.prototype, "icon", void 0), G([A()], K.prototype, "message", void 0), G([A()], K.prototype, "loading", void 0), G([A()], K.prototype, "iconType", void 0), K = G([a("wui-snackbar")], K);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-snackbar/styles.js
var se = E`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`, q = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ce = {
	loading: void 0,
	success: {
		backgroundColor: "success-100",
		iconColor: "success-100",
		icon: "checkmark"
	},
	error: {
		backgroundColor: "error-100",
		iconColor: "error-100",
		icon: "close"
	}
}, J = class extends D {
	constructor() {
		super(), this.unsubscribe = [], this.timeout = void 0, this.open = h.state.open, this.unsubscribe.push(h.subscribeKey("open", (e) => {
			this.open = e, this.onOpen();
		}));
	}
	disconnectedCallback() {
		clearTimeout(this.timeout), this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { message: e, variant: t, svg: n } = h.state, r = ce[t], { icon: i, iconColor: a } = n ?? r ?? {};
		return T`
      <wui-snackbar
        message=${e}
        backgroundColor=${r?.backgroundColor}
        iconColor=${a}
        icon=${i}
        .loading=${t === "loading"}
      ></wui-snackbar>
    `;
	}
	onOpen() {
		clearTimeout(this.timeout), this.open ? (this.animate([{
			opacity: 0,
			transform: "translateX(-50%) scale(0.85)"
		}, {
			opacity: 1,
			transform: "translateX(-50%) scale(1)"
		}], {
			duration: 150,
			fill: "forwards",
			easing: "ease"
		}), this.timeout && clearTimeout(this.timeout), h.state.autoClose && (this.timeout = setTimeout(() => h.hide(), 2500))) : this.animate([{
			opacity: 1,
			transform: "translateX(-50%) scale(1)"
		}, {
			opacity: 0,
			transform: "translateX(-50%) scale(0.85)"
		}], {
			duration: 150,
			fill: "forwards",
			easing: "ease"
		});
	}
};
J.styles = se, q([k()], J.prototype, "open", void 0), J = q([a("w3m-snackbar")], J);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/styles.js
var le = E`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`, Y = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, X = "scroll-lock", Z = class extends D {
	constructor() {
		super(), this.unsubscribe = [], this.abortController = void 0, this.hasPrefetched = !1, this.enableEmbedded = l.state.enableEmbedded, this.open = v.state.open, this.caipAddress = _.state.activeCaipAddress, this.caipNetwork = _.state.activeCaipNetwork, this.shake = v.state.shake, this.filterByNamespace = y.state.filterByNamespace, this.initializeTheming(), x.prefetchAnalyticsConfig(), this.unsubscribe.push(v.subscribeKey("open", (e) => e ? this.onOpen() : this.onClose()), v.subscribeKey("shake", (e) => this.shake = e), _.subscribeKey("activeCaipNetwork", (e) => this.onNewNetwork(e)), _.subscribeKey("activeCaipAddress", (e) => this.onNewAddress(e)), l.subscribeKey("enableEmbedded", (e) => this.enableEmbedded = e), y.subscribeKey("filterByNamespace", (e) => {
			this.filterByNamespace !== e && !_.getAccountData(e)?.caipAddress && (x.fetchRecommendedWallets(), this.filterByNamespace = e);
		}));
	}
	firstUpdated() {
		if (this.caipAddress) {
			if (this.enableEmbedded) {
				v.close(), this.prefetch();
				return;
			}
			this.onNewAddress(this.caipAddress);
		}
		this.open && this.onOpen(), this.enableEmbedded && this.prefetch();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), this.onRemoveKeyboardListener();
	}
	render() {
		return this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? "clamp(0px, var(--wui-border-radius-l), 44px)" : "0px"};
    `, this.enableEmbedded ? T`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> ` : this.open ? T`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        ` : null;
	}
	contentTemplate() {
		return T` <wui-card
      shake="${this.shake}"
      data-embedded="${O(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
	}
	async onOverlayClick(e) {
		e.target === e.currentTarget && await this.handleClose();
	}
	async handleClose() {
		await j.safeClose();
	}
	initializeTheming() {
		let { themeVariables: e, themeMode: t } = ee.state;
		n(e, r.getColorTheme(t));
	}
	onClose() {
		this.open = !1, this.classList.remove("open"), this.onScrollUnlock(), h.hide(), this.onRemoveKeyboardListener();
	}
	onOpen() {
		this.open = !0, this.classList.add("open"), this.onScrollLock(), this.onAddKeyboardListener();
	}
	onScrollLock() {
		let e = document.createElement("style");
		e.dataset.w3m = X, e.textContent = "\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ", document.head.appendChild(e);
	}
	onScrollUnlock() {
		let e = document.head.querySelector(`style[data-w3m="${X}"]`);
		e && e.remove();
	}
	onAddKeyboardListener() {
		this.abortController = new AbortController();
		let e = this.shadowRoot?.querySelector("wui-card");
		e?.focus(), window.addEventListener("keydown", (t) => {
			if (t.key === "Escape") this.handleClose();
			else if (t.key === "Tab") {
				let { tagName: n } = t.target;
				n && !n.includes("W3M-") && !n.includes("WUI-") && e?.focus();
			}
		}, this.abortController);
	}
	onRemoveKeyboardListener() {
		this.abortController?.abort(), this.abortController = void 0;
	}
	async onNewAddress(e) {
		let t = _.state.isSwitchingNamespace, n = p.state.view === "ProfileWallets";
		e ? await this.onConnected({
			caipAddress: e,
			isSwitchingNamespace: t,
			isInProfileView: n
		}) : !t && !this.enableEmbedded && !n && v.close(), await C.initializeIfEnabled(e), this.caipAddress = e, _.setIsSwitchingNamespace(!1);
	}
	async onConnected(e) {
		if (e.isInProfileView) return;
		let { chainNamespace: t, chainId: n, address: r } = s.parseCaipAddress(e.caipAddress), i = `${t}:${n}`, a = !u.getPlainAddress(this.caipAddress), o = await C.getSessions({
			address: r,
			caipNetworkId: i
		}), c = C.getSIWX() ? o.some((e) => e.data.accountAddress === r) : !0, l = e.isSwitchingNamespace && c && !this.enableEmbedded, d = this.enableEmbedded && a;
		l ? p.goBack() : d && v.close();
	}
	onNewNetwork(e) {
		let t = this.caipNetwork, n = t?.caipNetworkId?.toString(), r = t?.chainNamespace, i = e?.caipNetworkId?.toString(), a = e?.chainNamespace, o = n !== i, s = o && r === a, l = t?.name === c.UNSUPPORTED_NETWORK_NAME, u = p.state.view === "ConnectingExternal", d = p.state.view === "ProfileWallets", f = !_.getAccountData(e?.chainNamespace)?.caipAddress, m = p.state.view === "UnsupportedChain", h = v.state.open, g = !1;
		this.enableEmbedded && p.state.view === "SwitchNetwork" && (g = !0), o && S.resetState(), h && !u && !d && (f ? o && (g = !0) : (m || s && !l) && (g = !0)), g && p.state.view !== "SIWXSignMessage" && p.goBack(), this.caipNetwork = e;
	}
	prefetch() {
		this.hasPrefetched || (x.prefetch(), x.fetchWalletsByPage({ page: 1 }), this.hasPrefetched = !0);
	}
};
Z.styles = le, Y([A({ type: Boolean })], Z.prototype, "enableEmbedded", void 0), Y([k()], Z.prototype, "open", void 0), Y([k()], Z.prototype, "caipAddress", void 0), Y([k()], Z.prototype, "caipNetwork", void 0), Y([k()], Z.prototype, "shake", void 0), Y([k()], Z.prototype, "filterByNamespace", void 0);
var Q = class extends Z {};
Q = Y([a("w3m-modal")], Q);
var $ = class extends Z {};
$ = Y([a("appkit-modal")], $);
//#endregion
export { $ as AppKitModal, Q as W3mModal, Z as W3mModalBase };
