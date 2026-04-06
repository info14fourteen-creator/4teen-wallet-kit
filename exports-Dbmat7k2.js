import { a as e, i as t, r as n, s as r, t as i, u as a } from "./exports-D_wXhA01.js";
import { A as o, C as s, F as c, H as ee, K as l, M as u, N as d, P as f, S as p, T as te, _ as ne, b as m, c as re, d as h, m as ie, n as ae, p as g, r as _, s as v, t as y, v as b, w as x, x as S, y as oe } from "./ModalController-DHlkqy_7.js";
import { n as se, t as ce } from "./HelpersUtil-DGysdoOO.js";
import { i as C, n as le, r as ue, t as de } from "./ConnectorUtil-CHo5ko5D.js";
import "./w3m-tooltip-BYcqa_Vj.js";
import { t as fe } from "./w3m-legal-footer-BYlOi615.js";
import { t as pe } from "./SIWXUtil-BkN6zpHU.js";
import { t as me } from "./ConstantsUtil-DozDCknC.js";
import { t as he } from "./W3mFrameProvider-DIecb6Xz.js";
import { i as w, l as T, t as E } from "./lit-CKWVc9vf.js";
import { a as D, o as O, s as k, t as ge } from "./wui-text-ec7ybml8.js";
import "./wui-loading-spinner-D9SqO953.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-icon-xSC_yRIR.js";
import { t as _e } from "./wui-wallet-image-UFn5bm4F.js";
import "./wui-icon-link-BE6JisUI.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-icon-box-DJlJZe2u.js";
import "./wui-list-item-nRWo5lh4.js";
import "./wui-loading-spinner-CgnUakaY.js";
import "./wui-separator-DKfel88c.js";
import "./wui-loading-thumbnail-CkvS96N0.js";
import "./wui-link-d0unVgA5.js";
import "./wui-icon-box-Cxv_9O0m.js";
import { n as ve, t as ye } from "./ref-Bg7qJIY4.js";
import "./wui-input-text-DaYBnzKP.js";
import "./wui-email-input-DvdYlafC.js";
import "./wui-tag-BqdKUeiG.js";
import "./wui-list-token-CuaGloPq.js";
import { t as be } from "./w3m-router-QIhbETug.js";
import "./w3m-activity-list-B9YRnb8o.js";
import "./wui-shimmer-OxoqWYWL.js";
import "./w3m-tooltip-trigger-CJzTgHzq.js";
import "./wui-shimmer-Cctp5GZa.js";
import { t as xe } from "./wui-list-social-QMRaUXbh.js";
import "./wui-chip-button-DliE7z5S.js";
import "./wui-qr-code-B__Ozs2I.js";
import "./wui-visual-3YAnHwn6.js";
import "./wui-input-text-wJvlkZd9.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-account-button/styles.js
var Se = T`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`, Ce = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, A = class extends E {
	constructor() {
		super(...arguments), this.networkSrc = void 0, this.avatarSrc = void 0, this.balance = void 0, this.isUnsupportedChain = void 0, this.disabled = !1, this.loading = !1, this.address = "", this.profileName = "", this.charsStart = 4, this.charsEnd = 6;
	}
	render() {
		return w`
      <button
        ?disabled=${this.disabled}
        class=${D(this.balance ? void 0 : "local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address ? n.getTruncateString({
			string: this.profileName || this.address,
			charsStart: this.profileName ? 18 : this.charsStart,
			charsEnd: this.profileName ? 0 : this.charsEnd,
			truncate: this.profileName ? "end" : "middle"
		}) : null}
          </wui-text>
        </wui-flex>
      </button>
    `;
	}
	balanceTemplate() {
		return this.isUnsupportedChain ? w` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
          data-testid="wui-account-button-unsupported-chain"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>` : this.balance ? w`${this.networkSrc ? w`<wui-image src=${this.networkSrc}></wui-image>` : w`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `} ${this.loading ? w`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>` : w`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`}` : null;
	}
};
A.styles = [
	r,
	e,
	Se
], Ce([k()], A.prototype, "networkSrc", void 0), Ce([k()], A.prototype, "avatarSrc", void 0), Ce([k()], A.prototype, "balance", void 0), Ce([k({ type: Boolean })], A.prototype, "isUnsupportedChain", void 0), Ce([k({ type: Boolean })], A.prototype, "disabled", void 0), Ce([k({ type: Boolean })], A.prototype, "loading", void 0), Ce([k()], A.prototype, "address", void 0), Ce([k()], A.prototype, "profileName", void 0), Ce([k()], A.prototype, "charsStart", void 0), Ce([k()], A.prototype, "charsEnd", void 0), A = Ce([i("wui-account-button")], A);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-account-button/index.js
var j = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, M = class extends E {
	constructor() {
		super(...arguments), this.unsubscribe = [], this.disabled = !1, this.balance = "show", this.charsStart = 4, this.charsEnd = 6, this.namespace = void 0, this.isSupported = u.state.allowUnsupportedChain ? !0 : v.state.activeChain ? v.checkIfSupportedNetwork(v.state.activeChain) : !0;
	}
	connectedCallback() {
		super.connectedCallback(), this.setAccountData(v.getAccountData(this.namespace)), this.setNetworkData(v.getNetworkData(this.namespace));
	}
	firstUpdated() {
		let e = this.namespace;
		e ? this.unsubscribe.push(v.subscribeChainProp("accountState", (e) => {
			this.setAccountData(e);
		}, e), v.subscribeChainProp("networkState", (t) => {
			this.setNetworkData(t), this.isSupported = v.checkIfSupportedNetwork(e, t?.caipNetwork?.caipNetworkId);
		}, e)) : this.unsubscribe.push(te.subscribeNetworkImages(() => {
			this.networkImage = x.getNetworkImage(this.network);
		}), v.subscribeKey("activeCaipAddress", (e) => {
			this.caipAddress = e;
		}), _.subscribeKey("balance", (e) => this.balanceVal = e), _.subscribeKey("balanceSymbol", (e) => this.balanceSymbol = e), _.subscribeKey("profileName", (e) => this.profileName = e), _.subscribeKey("profileImage", (e) => this.profileImage = e), v.subscribeKey("activeCaipNetwork", (e) => {
			this.network = e, this.networkImage = x.getNetworkImage(e), this.isSupported = e?.chainNamespace ? v.checkIfSupportedNetwork(e?.chainNamespace) : !0, this.fetchNetworkImage(e);
		}));
	}
	updated() {
		this.fetchNetworkImage(this.network);
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		if (!v.state.activeChain) return null;
		let e = this.balance === "show", t = typeof this.balanceVal != "string";
		return w`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${u.state.allowUnsupportedChain ? !1 : !this.isSupported}
        address=${D(d.getPlainAddress(this.caipAddress))}
        profileName=${D(this.profileName)}
        networkSrc=${D(this.networkImage)}
        avatarSrc=${D(this.profileImage)}
        balance=${e ? d.formatBalance(this.balanceVal, this.balanceSymbol) : ""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace ? `-${this.namespace}` : ""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${t}
      >
      </wui-account-button>
    `;
	}
	onClick() {
		this.isSupported || u.state.allowUnsupportedChain ? y.open({ namespace: this.namespace }) : y.open({ view: "UnsupportedChain" });
	}
	async fetchNetworkImage(e) {
		e?.assets?.imageId && (this.networkImage = await x.fetchNetworkImage(e?.assets?.imageId));
	}
	setAccountData(e) {
		e && (this.caipAddress = e.caipAddress, this.balanceVal = e.balance, this.balanceSymbol = e.balanceSymbol, this.profileName = e.profileName, this.profileImage = e.profileImage);
	}
	setNetworkData(e) {
		e && (this.network = e.caipNetwork, this.networkImage = x.getNetworkImage(e.caipNetwork));
	}
};
j([k({ type: Boolean })], M.prototype, "disabled", void 0), j([k()], M.prototype, "balance", void 0), j([k()], M.prototype, "charsStart", void 0), j([k()], M.prototype, "charsEnd", void 0), j([k()], M.prototype, "namespace", void 0), j([O()], M.prototype, "caipAddress", void 0), j([O()], M.prototype, "balanceVal", void 0), j([O()], M.prototype, "balanceSymbol", void 0), j([O()], M.prototype, "profileName", void 0), j([O()], M.prototype, "profileImage", void 0), j([O()], M.prototype, "network", void 0), j([O()], M.prototype, "networkImage", void 0), j([O()], M.prototype, "isSupported", void 0);
var we = class extends M {};
we = j([i("w3m-account-button")], we);
var Te = class extends M {};
Te = j([i("appkit-account-button")], Te);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-button/styles.js
var Ee = T`
  :host {
    display: block;
    width: max-content;
  }
`, De = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, N = class extends E {
	constructor() {
		super(...arguments), this.unsubscribe = [], this.disabled = !1, this.balance = void 0, this.size = void 0, this.label = void 0, this.loadingLabel = void 0, this.charsStart = 4, this.charsEnd = 6, this.namespace = void 0;
	}
	firstUpdated() {
		this.caipAddress = this.namespace ? v.state.chains.get(this.namespace)?.accountState?.caipAddress : v.state.activeCaipAddress, this.namespace ? this.unsubscribe.push(v.subscribeChainProp("accountState", (e) => {
			this.caipAddress = e?.caipAddress;
		}, this.namespace)) : this.unsubscribe.push(v.subscribeKey("activeCaipAddress", (e) => this.caipAddress = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return this.caipAddress ? w`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${D(this.balance)}
            .charsStart=${D(this.charsStart)}
            .charsEnd=${D(this.charsEnd)}
            namespace=${D(this.namespace)}
          >
          </appkit-account-button>
        ` : w`
          <appkit-connect-button
            size=${D(this.size)}
            label=${D(this.label)}
            loadingLabel=${D(this.loadingLabel)}
            namespace=${D(this.namespace)}
          ></appkit-connect-button>
        `;
	}
};
N.styles = Ee, De([k({ type: Boolean })], N.prototype, "disabled", void 0), De([k()], N.prototype, "balance", void 0), De([k()], N.prototype, "size", void 0), De([k()], N.prototype, "label", void 0), De([k()], N.prototype, "loadingLabel", void 0), De([k()], N.prototype, "charsStart", void 0), De([k()], N.prototype, "charsEnd", void 0), De([k()], N.prototype, "namespace", void 0), De([O()], N.prototype, "caipAddress", void 0);
var Oe = class extends N {};
Oe = De([i("w3m-button")], Oe);
var ke = class extends N {};
ke = De([i("appkit-button")], ke);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-connect-button/styles.js
var Ae = T`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`, je = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Me = class extends E {
	constructor() {
		super(...arguments), this.size = "md", this.loading = !1;
	}
	render() {
		let e = this.size === "md" ? "paragraph-600" : "small-600";
		return w`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading ? "accent-100" : "inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `;
	}
	loadingTemplate() {
		return this.loading ? w`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>` : null;
	}
};
Me.styles = [
	r,
	e,
	Ae
], je([k()], Me.prototype, "size", void 0), je([k({ type: Boolean })], Me.prototype, "loading", void 0), Me = je([i("wui-connect-button")], Me);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-connect-button/index.js
var Ne = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Pe = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.size = "md", this.label = "Connect Wallet", this.loadingLabel = "Connecting...", this.open = y.state.open, this.loading = this.namespace ? y.state.loadingNamespaceMap.get(this.namespace) : y.state.loading, this.unsubscribe.push(y.subscribe((e) => {
			this.open = e.open, this.loading = this.namespace ? e.loadingNamespaceMap.get(this.namespace) : e.loading;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      <wui-connect-button
        size=${D(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace ? `-${this.namespace}` : ""}`}
      >
        ${this.loading ? this.loadingLabel : this.label}
      </wui-connect-button>
    `;
	}
	onClick() {
		this.open ? y.close() : this.loading || y.open({
			view: "Connect",
			namespace: this.namespace
		});
	}
};
Ne([k()], Pe.prototype, "size", void 0), Ne([k()], Pe.prototype, "label", void 0), Ne([k()], Pe.prototype, "loadingLabel", void 0), Ne([k()], Pe.prototype, "namespace", void 0), Ne([O()], Pe.prototype, "open", void 0), Ne([O()], Pe.prototype, "loading", void 0);
var Fe = class extends Pe {};
Fe = Ne([i("w3m-connect-button")], Fe);
var Ie = class extends Pe {};
Ie = Ne([i("appkit-connect-button")], Ie);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-button/styles.js
var Le = T`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`, Re = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ze = class extends E {
	constructor() {
		super(...arguments), this.imageSrc = void 0, this.isUnsupportedChain = void 0, this.disabled = !1;
	}
	render() {
		return w`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `;
	}
	visualTemplate() {
		return this.isUnsupportedChain ? w`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      ` : this.imageSrc ? w`<wui-image src=${this.imageSrc}></wui-image>` : w`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
	}
};
ze.styles = [
	r,
	e,
	Le
], Re([k()], ze.prototype, "imageSrc", void 0), Re([k({ type: Boolean })], ze.prototype, "isUnsupportedChain", void 0), Re([k({ type: Boolean })], ze.prototype, "disabled", void 0), ze = Re([i("wui-network-button")], ze);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-network-button/styles.js
var Be = T`
  :host {
    display: block;
    width: max-content;
  }
`, Ve = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, He = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.disabled = !1, this.network = v.state.activeCaipNetwork, this.networkImage = x.getNetworkImage(this.network), this.caipAddress = v.state.activeCaipAddress, this.loading = y.state.loading, this.isSupported = u.state.allowUnsupportedChain ? !0 : v.state.activeChain ? v.checkIfSupportedNetwork(v.state.activeChain) : !0, this.unsubscribe.push(te.subscribeNetworkImages(() => {
			this.networkImage = x.getNetworkImage(this.network);
		}), v.subscribeKey("activeCaipAddress", (e) => {
			this.caipAddress = e;
		}), v.subscribeKey("activeCaipNetwork", (e) => {
			this.network = e, this.networkImage = x.getNetworkImage(e), this.isSupported = e?.chainNamespace ? v.checkIfSupportedNetwork(e.chainNamespace) : !0, x.fetchNetworkImage(e?.assets?.imageId);
		}), y.subscribeKey("loading", (e) => this.loading = e));
	}
	firstUpdated() {
		x.fetchNetworkImage(this.network?.assets?.imageId);
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.network ? v.checkIfSupportedNetwork(this.network.chainNamespace) : !0;
		return w`
      <wui-network-button
        .disabled=${!!(this.disabled || this.loading)}
        .isUnsupportedChain=${u.state.allowUnsupportedChain ? !1 : !e}
        imageSrc=${D(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `;
	}
	getLabel() {
		return this.network ? !this.isSupported && !u.state.allowUnsupportedChain ? "Switch Network" : this.network.name : this.label ? this.label : this.caipAddress ? "Unknown Network" : "Select Network";
	}
	onClick() {
		this.loading || (p.sendEvent({
			type: "track",
			event: "CLICK_NETWORKS"
		}), y.open({ view: "Networks" }));
	}
};
He.styles = Be, Ve([k({ type: Boolean })], He.prototype, "disabled", void 0), Ve([k({ type: String })], He.prototype, "label", void 0), Ve([O()], He.prototype, "network", void 0), Ve([O()], He.prototype, "networkImage", void 0), Ve([O()], He.prototype, "caipAddress", void 0), Ve([O()], He.prototype, "loading", void 0), Ve([O()], He.prototype, "isSupported", void 0);
var Ue = class extends He {};
Ue = Ve([i("w3m-network-button")], Ue);
var We = class extends He {};
We = Ve([i("appkit-network-button")], We);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-notice-card/styles.js
var Ge = T`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`, Ke = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, qe = class extends E {
	constructor() {
		super(...arguments), this.label = "", this.description = "", this.icon = "wallet";
	}
	render() {
		return w`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `;
	}
};
qe.styles = [
	r,
	e,
	Ge
], Ke([k()], qe.prototype, "label", void 0), Ke([k()], qe.prototype, "description", void 0), Ke([k()], qe.prototype, "icon", void 0), qe = Ke([i("wui-notice-card")], qe);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-auth-button/index.js
var Je = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ye = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.socialProvider = f.getConnectedSocialProvider(), this.socialUsername = f.getConnectedSocialUsername(), this.namespace = v.state.activeChain, this.unsubscribe.push(v.subscribeKey("activeChain", (e) => {
			this.namespace = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = b.getConnectorId(this.namespace), t = b.getAuthConnector();
		if (!t || e !== l.CONNECTOR_ID.AUTH) return this.style.cssText = "display: none", null;
		let n = t.provider.getEmail() ?? "";
		return !n && !this.socialUsername ? (this.style.cssText = "display: none", null) : w`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider ?? "mail"}
        iconSize=${this.socialProvider ? "xxl" : "sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${() => {
			this.onGoToUpdateEmail(n, this.socialProvider);
		}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(n)}</wui-text>
      </wui-list-item>
    `;
	}
	onGoToUpdateEmail(e, t) {
		t || m.push("UpdateEmailWallet", {
			email: e,
			redirectView: "Account"
		});
	}
	getAuthName(e) {
		return this.socialUsername ? this.socialProvider === "discord" && this.socialUsername.endsWith("0") ? this.socialUsername.slice(0, -1) : this.socialUsername : e.length > 30 ? `${e.slice(0, -3)}...` : e;
	}
};
Je([O()], Ye.prototype, "namespace", void 0), Ye = Je([i("w3m-account-auth-button")], Ye);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-account-settings-view/index.js
var Xe = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, P = class extends E {
	constructor() {
		super(), this.usubscribe = [], this.networkImages = te.state.networkImages, this.address = _.state.address, this.profileImage = _.state.profileImage, this.profileName = _.state.profileName, this.network = v.state.activeCaipNetwork, this.disconnecting = !1, this.loading = !1, this.switched = !1, this.text = "", this.remoteFeatures = u.state.remoteFeatures, this.usubscribe.push(_.subscribe((e) => {
			e.address && (this.address = e.address, this.profileImage = e.profileImage, this.profileName = e.profileName);
		}), v.subscribeKey("activeCaipNetwork", (e) => {
			e?.id && (this.network = e);
		}), u.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e;
		}));
	}
	disconnectedCallback() {
		this.usubscribe.forEach((e) => e());
	}
	render() {
		if (!this.address) throw Error("w3m-account-settings-view: No account provided");
		let e = this.networkImages[this.network?.assets?.imageId ?? ""];
		return w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${[
			"0",
			"xl",
			"m",
			"xl"
		]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${D(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${n.getTruncateString({
			string: this.address,
			charsStart: 4,
			charsEnd: 6,
			truncate: "middle"
		})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${[
			"0",
			"l",
			"m",
			"l"
		]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e ? "image" : "icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${D(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name ?? "Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
	}
	chooseNameButtonTemplate() {
		let e = this.network?.chainNamespace, t = b.getConnectorId(e), n = b.getAuthConnector();
		return !v.checkIfNamesSupported() || !n || t !== l.CONNECTOR_ID.AUTH || this.profileName ? null : w`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `;
	}
	authCardTemplate() {
		let e = b.getConnectorId(this.network?.chainNamespace), t = b.getAuthConnector(), { origin: n } = location;
		return !t || e !== l.CONNECTOR_ID.AUTH || n.includes(c.SECURE_SITE) ? null : w`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
	}
	isAllowedNetworkSwitch() {
		let e = v.getAllRequestedCaipNetworks(), t = e ? e.length > 1 : !1, n = e?.find(({ id: e }) => e === this.network?.id);
		return t || !n;
	}
	onCopyAddress() {
		try {
			this.address && (d.copyToClopboard(this.address), g.showSuccess("Address copied"));
		} catch {
			g.showError("Failed to copy");
		}
	}
	togglePreferredAccountBtnTemplate() {
		let e = this.network?.chainNamespace, t = v.checkIfSmartAccountEnabled(), n = b.getConnectorId(e);
		return !b.getAuthConnector() || n !== l.CONNECTOR_ID.AUTH || !t ? null : (this.switched || (this.text = ne(e) === o.ACCOUNT_TYPES.SMART_ACCOUNT ? "Switch to your EOA" : "Switch to your Smart Account"), w`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `);
	}
	onChooseName() {
		m.push("ChooseAccountName");
	}
	async changePreferredAccountType() {
		let e = this.network?.chainNamespace, t = v.checkIfSmartAccountEnabled(), n = ne(e) === o.ACCOUNT_TYPES.SMART_ACCOUNT || !t ? o.ACCOUNT_TYPES.EOA : o.ACCOUNT_TYPES.SMART_ACCOUNT;
		b.getAuthConnector() && (this.loading = !0, await h.setPreferredAccountType(n, e), this.text = n === o.ACCOUNT_TYPES.SMART_ACCOUNT ? "Switch to your EOA" : "Switch to your Smart Account", this.switched = !0, re.resetSend(), this.loading = !1, this.requestUpdate());
	}
	onNetworks() {
		this.isAllowedNetworkSwitch() && m.push("Networks");
	}
	async onDisconnect() {
		try {
			this.disconnecting = !0;
			let e = this.network?.chainNamespace, t = h.getConnections(e).length > 0, n = e && b.state.activeConnectorIds[e], r = this.remoteFeatures?.multiWallet;
			await h.disconnect(r ? {
				id: n,
				namespace: e
			} : {}), t && r && (m.push("ProfileWallets"), g.showSuccess("Wallet deleted"));
		} catch {
			p.sendEvent({
				type: "track",
				event: "DISCONNECT_ERROR",
				properties: { message: "Failed to disconnect" }
			}), g.showError("Failed to disconnect");
		} finally {
			this.disconnecting = !1;
		}
	}
	onGoToUpgradeView() {
		p.sendEvent({
			type: "track",
			event: "EMAIL_UPGRADE_FROM_MODAL"
		}), m.push("UpgradeEmailWallet");
	}
};
Xe([O()], P.prototype, "address", void 0), Xe([O()], P.prototype, "profileImage", void 0), Xe([O()], P.prototype, "profileName", void 0), Xe([O()], P.prototype, "network", void 0), Xe([O()], P.prototype, "disconnecting", void 0), Xe([O()], P.prototype, "loading", void 0), Xe([O()], P.prototype, "switched", void 0), Xe([O()], P.prototype, "text", void 0), Xe([O()], P.prototype, "remoteFeatures", void 0), P = Xe([i("w3m-account-settings-view")], P);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tabs/styles.js
var Ze = T`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`, Qe = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, $e = class extends E {
	constructor() {
		super(...arguments), this.tabs = [], this.onTabChange = () => null, this.buttons = [], this.disabled = !1, this.localTabWidth = "100px", this.activeTab = 0, this.isDense = !1;
	}
	render() {
		return this.isDense = this.tabs.length > 3, this.style.cssText = `
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `, this.dataset.type = this.isDense ? "flex" : "block", this.tabs.map((e, t) => {
			let n = t === this.activeTab;
			return w`
        <button
          ?disabled=${this.disabled}
          @click=${() => this.onTabClick(t)}
          data-active=${n}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `;
		});
	}
	firstUpdated() {
		this.shadowRoot && this.isDense && (this.buttons = [...this.shadowRoot.querySelectorAll("button")], setTimeout(() => {
			this.animateTabs(0, !0);
		}, 0));
	}
	iconTemplate(e) {
		return e.icon ? w`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>` : null;
	}
	onTabClick(e) {
		this.buttons && this.animateTabs(e, !1), this.activeTab = e, this.onTabChange(e);
	}
	animateTabs(e, t) {
		let n = this.buttons[this.activeTab], r = this.buttons[e], i = n?.querySelector("wui-text"), a = r?.querySelector("wui-text"), o = r?.getBoundingClientRect(), s = a?.getBoundingClientRect();
		n && i && !t && e !== this.activeTab && (i.animate([{ opacity: 0 }], {
			duration: 50,
			easing: "ease",
			fill: "forwards"
		}), n.animate([{ width: "34px" }], {
			duration: 500,
			easing: "ease",
			fill: "forwards"
		})), r && o && s && a && (e !== this.activeTab || t) && (this.localTabWidth = `${Math.round(o.width + s.width) + 6}px`, r.animate([{ width: `${o.width + s.width}px` }], {
			duration: t ? 0 : 500,
			fill: "forwards",
			easing: "ease"
		}), a.animate([{ opacity: 1 }], {
			duration: t ? 0 : 125,
			delay: t ? 0 : 200,
			fill: "forwards",
			easing: "ease"
		}));
	}
};
$e.styles = [
	r,
	e,
	Ze
], Qe([k({ type: Array })], $e.prototype, "tabs", void 0), Qe([k()], $e.prototype, "onTabChange", void 0), Qe([k({ type: Array })], $e.prototype, "buttons", void 0), Qe([k({ type: Boolean })], $e.prototype, "disabled", void 0), Qe([k()], $e.prototype, "localTabWidth", void 0), Qe([O()], $e.prototype, "activeTab", void 0), Qe([O()], $e.prototype, "isDense", void 0), $e = Qe([i("wui-tabs")], $e);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-switch/styles.js
var et = T`
  button {
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-xxs);
    column-gap: var(--wui-spacing-xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-xxl);
    height: var(--wui-spacing-xxl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: var(--wui-color-gray-glass-005);
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: var(--wui-spacing-1xs);
    height: var(--wui-spacing-1xs);
    background-color: var(--wui-color-success-100);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
  }
`, tt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, F = class extends E {
	constructor() {
		super(...arguments), this.address = "", this.profileName = "", this.alt = "", this.imageSrc = "", this.icon = void 0, this.iconSize = "md", this.loading = !1, this.charsStart = 4, this.charsEnd = 6;
	}
	render() {
		return w`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `;
	}
	leftImageTemplate() {
		let e = this.icon ? w`<wui-icon
          size=${this.iconSize}
          color="fg-200"
          name=${this.icon}
          class="icon"
        ></wui-icon>` : w`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;
		return w`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${e}
        <wui-flex class="circle"></wui-flex>
      </wui-flex>
    `;
	}
	textTemplate() {
		return w`
      <wui-text variant="paragraph-500" color="fg-100">
        ${n.getTruncateString({
			string: this.profileName || this.address,
			charsStart: this.profileName ? 16 : this.charsStart,
			charsEnd: this.profileName ? 0 : this.charsEnd,
			truncate: this.profileName ? "end" : "middle"
		})}
      </wui-text>
    `;
	}
	rightImageTemplate() {
		return w`<wui-icon name="chevronBottom" size="xs" color="fg-200"></wui-icon>`;
	}
};
F.styles = [
	r,
	e,
	et
], tt([k()], F.prototype, "address", void 0), tt([k()], F.prototype, "profileName", void 0), tt([k()], F.prototype, "alt", void 0), tt([k()], F.prototype, "imageSrc", void 0), tt([k()], F.prototype, "icon", void 0), tt([k()], F.prototype, "iconSize", void 0), tt([k({ type: Boolean })], F.prototype, "loading", void 0), tt([k({ type: Number })], F.prototype, "charsStart", void 0), tt([k({ type: Number })], F.prototype, "charsEnd", void 0), F = tt([i("wui-wallet-switch")], F);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-default-widget/styles.js
var nt = T`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-wallet-switch {
    margin-top: var(--wui-spacing-xs);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`, I = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, L = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.caipAddress = _.state.caipAddress, this.address = d.getPlainAddress(_.state.caipAddress), this.profileImage = _.state.profileImage, this.profileName = _.state.profileName, this.disconnecting = !1, this.balance = _.state.balance, this.balanceSymbol = _.state.balanceSymbol, this.features = u.state.features, this.remoteFeatures = u.state.remoteFeatures, this.namespace = v.state.activeChain, this.activeConnectorIds = b.state.activeConnectorIds, this.unsubscribe.push(_.subscribeKey("caipAddress", (e) => {
			this.address = d.getPlainAddress(e), this.caipAddress = e;
		}), _.subscribeKey("balance", (e) => this.balance = e), _.subscribeKey("balanceSymbol", (e) => this.balanceSymbol = e), _.subscribeKey("profileName", (e) => this.profileName = e), _.subscribeKey("profileImage", (e) => this.profileImage = e), u.subscribeKey("features", (e) => this.features = e), u.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e), b.subscribeKey("activeConnectorIds", (e) => {
			this.activeConnectorIds = e;
		}), v.subscribeKey("activeChain", (e) => this.namespace = e), v.subscribeKey("activeCaipNetwork", (e) => {
			e?.chainNamespace && (this.namespace = e?.chainNamespace);
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		if (!this.caipAddress || !this.namespace) return null;
		let e = this.activeConnectorIds[this.namespace], t = e ? b.getConnectorById(e) : void 0, n = x.getConnectorImage(t);
		return w`<wui-flex
        flexDirection="column"
        .padding=${[
			"0",
			"xl",
			"m",
			"xl"
		]}
        alignItems="center"
        gap="s"
      >
        <wui-avatar
          alt=${D(this.caipAddress)}
          address=${D(d.getPlainAddress(this.caipAddress))}
          imageSrc=${D(this.profileImage === null ? void 0 : this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${n}
          alt=${t?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${d.formatBalance(this.balance, this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`;
	}
	fundWalletTemplate() {
		if (!this.namespace) return null;
		let e = c.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace), t = this.remoteFeatures?.onramp && e, n = !!this.features?.receive;
		return !t && !n ? null : w`
      <wui-list-item
        data-testid="w3m-account-default-fund-wallet-button"
        iconVariant="blue"
        icon="dollar"
        ?chevron=${!0}
        @click=${this.handleClickFundWallet.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Fund wallet</wui-text>
      </wui-list-item>
    `;
	}
	orderedFeaturesTemplate() {
		return (this.features?.walletFeaturesOrder || c.DEFAULT_FEATURES.walletFeaturesOrder).map((e) => {
			switch (e) {
				case "onramp": return this.fundWalletTemplate();
				case "swaps": return this.swapsTemplate();
				case "send": return this.sendTemplate();
				default: return null;
			}
		});
	}
	activityTemplate() {
		return this.namespace && this.remoteFeatures?.activity && c.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace) ? w` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>` : null;
	}
	swapsTemplate() {
		let e = this.remoteFeatures?.swaps, t = v.state.activeChain === l.CHAIN.EVM;
		return !e || !t ? null : w`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `;
	}
	sendTemplate() {
		let e = this.features?.send, t = v.state.activeChain;
		if (!t) throw Error("SendController:sendTemplate - namespace is required");
		let n = c.SEND_SUPPORTED_NAMESPACES.includes(t);
		return !e || !n ? null : w`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `;
	}
	authCardTemplate() {
		let e = v.state.activeChain;
		if (!e) throw Error("AuthCardTemplate:authCardTemplate - namespace is required");
		let t = b.getConnectorId(e), n = b.getAuthConnector(), { origin: r } = location;
		return !n || t !== l.CONNECTOR_ID.AUTH || r.includes(c.SECURE_SITE) ? null : w`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
	}
	handleClickFundWallet() {
		m.push("FundWallet");
	}
	handleClickSwap() {
		m.push("Swap");
	}
	handleClickSend() {
		m.push("WalletSend");
	}
	explorerBtnTemplate() {
		return _.state.addressExplorerUrl ? w`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    ` : null;
	}
	onTransactions() {
		p.sendEvent({
			type: "track",
			event: "CLICK_TRANSACTIONS",
			properties: { isSmartAccount: ne(v.state.activeChain) === o.ACCOUNT_TYPES.SMART_ACCOUNT }
		}), m.push("Transactions");
	}
	async onDisconnect() {
		try {
			this.disconnecting = !0;
			let e = h.getConnections(this.namespace).length > 0, t = this.namespace && b.state.activeConnectorIds[this.namespace], n = this.remoteFeatures?.multiWallet;
			await h.disconnect(n ? {
				id: t,
				namespace: this.namespace
			} : {}), e && n && (m.push("ProfileWallets"), g.showSuccess("Wallet deleted"));
		} catch {
			p.sendEvent({
				type: "track",
				event: "DISCONNECT_ERROR",
				properties: { message: "Failed to disconnect" }
			}), g.showError("Failed to disconnect");
		} finally {
			this.disconnecting = !1;
		}
	}
	onExplorer() {
		let e = _.state.addressExplorerUrl;
		e && d.openHref(e, "_blank");
	}
	onGoToUpgradeView() {
		p.sendEvent({
			type: "track",
			event: "EMAIL_UPGRADE_FROM_MODAL"
		}), m.push("UpgradeEmailWallet");
	}
	onGoToProfileWalletsView() {
		m.push("ProfileWallets");
	}
};
L.styles = nt, I([O()], L.prototype, "caipAddress", void 0), I([O()], L.prototype, "address", void 0), I([O()], L.prototype, "profileImage", void 0), I([O()], L.prototype, "profileName", void 0), I([O()], L.prototype, "disconnecting", void 0), I([O()], L.prototype, "balance", void 0), I([O()], L.prototype, "balanceSymbol", void 0), I([O()], L.prototype, "features", void 0), I([O()], L.prototype, "remoteFeatures", void 0), I([O()], L.prototype, "namespace", void 0), I([O()], L.prototype, "activeConnectorIds", void 0), L = I([i("w3m-account-default-widget")], L);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-balance/styles.js
var rt = T`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`, it = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, at = class extends E {
	constructor() {
		super(...arguments), this.dollars = "0", this.pennies = "00";
	}
	render() {
		return w`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`;
	}
};
at.styles = [r, rt], it([k()], at.prototype, "dollars", void 0), it([k()], at.prototype, "pennies", void 0), at = it([i("wui-balance")], at);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tooltip/styles.js
var ot = T`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`, st = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ct = class extends E {
	constructor() {
		super(...arguments), this.placement = "top", this.variant = "fill", this.message = "";
	}
	render() {
		return this.dataset.variant = this.variant, w`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${this.variant === "fill" ? "cursor" : "cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`;
	}
};
ct.styles = [
	r,
	e,
	ot
], st([k()], ct.prototype, "placement", void 0), st([k()], ct.prototype, "variant", void 0), st([k()], ct.prototype, "message", void 0), ct = st([i("wui-tooltip")], ct);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-activity-widget/styles.js
var lt = T`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`, ut = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, dt = class extends E {
	render() {
		return w`<w3m-activity-list page="account"></w3m-activity-list>`;
	}
};
dt.styles = lt, dt = ut([i("w3m-account-activity-widget")], dt);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-nfts-widget/styles.js
var ft = T`
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`, pt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, mt = class extends E {
	render() {
		return w`${this.nftTemplate()}`;
	}
	nftTemplate() {
		return w` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`;
	}
	onReceiveClick() {
		m.push("WalletReceive");
	}
};
mt.styles = ft, mt = pt([i("w3m-account-nfts-widget")], mt);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-description/styles.js
var ht = T`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`, gt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, _t = class extends E {
	constructor() {
		super(...arguments), this.icon = "card", this.text = "", this.description = "", this.tag = void 0, this.iconBackgroundColor = "accent-100", this.iconColor = "accent-100", this.disabled = !1;
	}
	render() {
		return w`
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          ${this.description ? w`<wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text>` : null}</wui-flex
        >
      </button>
    `;
	}
	titleTemplate() {
		return this.tag ? w` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>` : w`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`;
	}
};
_t.styles = [
	r,
	e,
	ht
], gt([k()], _t.prototype, "icon", void 0), gt([k()], _t.prototype, "text", void 0), gt([k()], _t.prototype, "description", void 0), gt([k()], _t.prototype, "tag", void 0), gt([k()], _t.prototype, "iconBackgroundColor", void 0), gt([k()], _t.prototype, "iconColor", void 0), gt([k({ type: Boolean })], _t.prototype, "disabled", void 0), _t = gt([i("wui-list-description")], _t);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-tokens-widget/styles.js
var vt = T`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`, yt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, bt = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tokenBalance = _.state.tokenBalance, this.remoteFeatures = u.state.remoteFeatures, this.unsubscribe.push(_.subscribe((e) => {
			this.tokenBalance = e.tokenBalance;
		}), u.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`${this.tokenTemplate()}`;
	}
	tokenTemplate() {
		return this.tokenBalance && this.tokenBalance?.length > 0 ? w`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>` : w` <wui-flex flexDirection="column" gap="xs"
      >${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Scan the QR code and receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="w3m-account-receive-button"
      ></wui-list-description
    ></wui-flex>`;
	}
	onRampTemplate() {
		return this.remoteFeatures?.onramp ? w`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="w3m-account-onramp-button"
      ></wui-list-description>` : w``;
	}
	tokenItemTemplate() {
		return this.tokenBalance?.map((e) => w`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`);
	}
	onReceiveClick() {
		m.push("WalletReceive");
	}
	onBuyClick() {
		p.sendEvent({
			type: "track",
			event: "SELECT_BUY_CRYPTO",
			properties: { isSmartAccount: ne(v.state.activeChain) === o.ACCOUNT_TYPES.SMART_ACCOUNT }
		}), m.push("OnRampProviders");
	}
};
bt.styles = vt, yt([O()], bt.prototype, "tokenBalance", void 0), yt([O()], bt.prototype, "remoteFeatures", void 0), bt = yt([i("w3m-account-tokens-widget")], bt);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-wallet-features-widget/styles.js
var xt = T`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`, R = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, St = 48, Ct = 430, z = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.address = _.state.address, this.profileName = _.state.profileName, this.network = v.state.activeCaipNetwork, this.currentTab = _.state.currentTab, this.tokenBalance = _.state.tokenBalance, this.features = u.state.features, this.namespace = v.state.activeChain, this.activeConnectorIds = b.state.activeConnectorIds, this.remoteFeatures = u.state.remoteFeatures, this.unsubscribe.push(_.subscribe((e) => {
			e.address ? (this.address = e.address, this.profileName = e.profileName, this.currentTab = e.currentTab, this.tokenBalance = e.tokenBalance) : y.close();
		}), b.subscribeKey("activeConnectorIds", (e) => {
			this.activeConnectorIds = e;
		}), v.subscribeKey("activeChain", (e) => this.namespace = e), v.subscribeKey("activeCaipNetwork", (e) => this.network = e), u.subscribeKey("features", (e) => this.features = e), u.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e)), this.watchSwapValues();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), clearInterval(this.watchTokenBalance);
	}
	firstUpdated() {
		_.fetchTokenBalance();
	}
	render() {
		if (!this.address) throw Error("w3m-account-view: No account provided");
		if (!this.namespace) return null;
		let e = this.activeConnectorIds[this.namespace], t = e ? b.getConnectorById(e) : void 0, { icon: n, iconSize: r } = this.getAuthData();
		return w`<wui-flex
      flexDirection="column"
      .padding=${[
			"0",
			"xl",
			"m",
			"xl"
		]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="xs">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${n}
          iconSize=${r}
          alt=${t?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`;
	}
	orderedWalletFeatures() {
		let e = this.features?.walletFeaturesOrder || c.DEFAULT_FEATURES.walletFeaturesOrder;
		if (e.every((e) => e === "send" || e === "receive" ? !this.features?.[e] : e === "swaps" || e === "onramp" ? !this.remoteFeatures?.[e] : !0)) return null;
		let t = e.map((e) => e === "receive" || e === "onramp" ? "fund" : e);
		return w`<wui-flex gap="s">
      ${[...new Set(t)].map((e) => {
			switch (e) {
				case "fund": return this.fundWalletTemplate();
				case "swaps": return this.swapsTemplate();
				case "send": return this.sendTemplate();
				default: return null;
			}
		})}
    </wui-flex>`;
	}
	fundWalletTemplate() {
		let e = this.remoteFeatures?.onramp, t = this.features?.receive;
		return !e && !t ? null : w`
      <w3m-tooltip-trigger text="Fund wallet">
        <wui-icon-button
          data-testid="wallet-features-fund-wallet-button"
          @click=${this.onFundWalletClick.bind(this)}
          icon="dollar"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `;
	}
	swapsTemplate() {
		let e = this.remoteFeatures?.swaps, t = v.state.activeChain === l.CHAIN.EVM;
		return !e || !t ? null : w`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `;
	}
	sendTemplate() {
		let e = this.features?.send, t = v.state.activeChain, n = c.SEND_SUPPORTED_NAMESPACES.includes(t);
		return !e || !n ? null : w`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `;
	}
	watchSwapValues() {
		this.watchTokenBalance = setInterval(() => _.fetchTokenBalance((e) => this.onTokenBalanceError(e)), 1e4);
	}
	onTokenBalanceError(e) {
		e instanceof Error && e.cause instanceof Response && e.cause.status === l.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE && clearInterval(this.watchTokenBalance);
	}
	listContentTemplate() {
		return this.currentTab === 0 ? w`<w3m-account-tokens-widget></w3m-account-tokens-widget>` : this.currentTab === 1 ? w`<w3m-account-nfts-widget></w3m-account-nfts-widget>` : this.currentTab === 2 ? w`<w3m-account-activity-widget></w3m-account-activity-widget>` : w`<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
	}
	tokenBalanceTemplate() {
		if (this.tokenBalance && this.tokenBalance?.length >= 0) {
			let e = d.calculateBalance(this.tokenBalance), { dollars: t = "0", pennies: n = "00" } = d.formatTokenBalance(e);
			return w`<wui-balance dollars=${t} pennies=${n}></wui-balance>`;
		}
		return w`<wui-balance dollars="0" pennies="00"></wui-balance>`;
	}
	tabsTemplate() {
		let e = ce.getTabsByNamespace(v.state.activeChain);
		if (e.length === 0) return null;
		let t = d.isMobile() && window.innerWidth < Ct, n = "104px";
		return n = t ? `${(window.innerWidth - St) / e.length}px` : e.length === 2 ? "156px" : "104px", w`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${n}
      .tabs=${e}
    ></wui-tabs>`;
	}
	onTabChange(e) {
		_.setCurrentTab(e);
	}
	onFundWalletClick() {
		m.push("FundWallet");
	}
	onSwapClick() {
		this.network?.caipNetworkId && !c.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId) ? m.push("UnsupportedChain", { swapUnsupportedChain: !0 }) : (p.sendEvent({
			type: "track",
			event: "OPEN_SWAP",
			properties: {
				network: this.network?.caipNetworkId || "",
				isSmartAccount: ne(v.state.activeChain) === o.ACCOUNT_TYPES.SMART_ACCOUNT
			}
		}), m.push("Swap"));
	}
	getAuthData() {
		let e = f.getConnectedSocialProvider(), t = f.getConnectedSocialUsername(), n = b.getAuthConnector()?.provider.getEmail() ?? "";
		return {
			name: de.getAuthName({
				email: n,
				socialUsername: t,
				socialProvider: e
			}),
			icon: e ?? "mail",
			iconSize: e ? "xl" : "md"
		};
	}
	onGoToProfileWalletsView() {
		m.push("ProfileWallets");
	}
	onSendClick() {
		p.sendEvent({
			type: "track",
			event: "OPEN_SEND",
			properties: {
				network: this.network?.caipNetworkId || "",
				isSmartAccount: ne(v.state.activeChain) === o.ACCOUNT_TYPES.SMART_ACCOUNT
			}
		}), m.push("WalletSend");
	}
};
z.styles = xt, R([O()], z.prototype, "watchTokenBalance", void 0), R([O()], z.prototype, "address", void 0), R([O()], z.prototype, "profileName", void 0), R([O()], z.prototype, "network", void 0), R([O()], z.prototype, "currentTab", void 0), R([O()], z.prototype, "tokenBalance", void 0), R([O()], z.prototype, "features", void 0), R([O()], z.prototype, "namespace", void 0), R([O()], z.prototype, "activeConnectorIds", void 0), R([O()], z.prototype, "remoteFeatures", void 0), z = R([i("w3m-account-wallet-features-widget")], z);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-account-view/index.js
var wt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Tt = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.namespace = v.state.activeChain, this.unsubscribe.push(v.subscribeKey("activeChain", (e) => {
			this.namespace = e;
		}));
	}
	render() {
		if (!this.namespace) return null;
		let e = b.getConnectorId(this.namespace);
		return w`
      ${b.getAuthConnector() && e === l.CONNECTOR_ID.AUTH ? this.walletFeaturesTemplate() : this.defaultTemplate()}
    `;
	}
	walletFeaturesTemplate() {
		return w`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`;
	}
	defaultTemplate() {
		return w`<w3m-account-default-widget></w3m-account-default-widget>`;
	}
};
wt([O()], Tt.prototype, "namespace", void 0), Tt = wt([i("w3m-account-view")], Tt);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-active-profile-wallet-item/styles.js
var Et = T`
  wui-image {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`, B = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, V = class extends E {
	constructor() {
		super(...arguments), this.address = "", this.profileName = "", this.content = [], this.alt = "", this.imageSrc = "", this.icon = void 0, this.iconSize = "md", this.iconBadge = void 0, this.iconBadgeSize = "md", this.buttonVariant = "neutral", this.enableMoreButton = !1, this.charsStart = 4, this.charsEnd = 6;
	}
	render() {
		return w`
      <wui-flex flexDirection="column" rowGap="xs">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `;
	}
	topTemplate() {
		return w`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton ? w`<wui-icon-link
              iconColor="fg-200"
              size="sm"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>` : null}
      </wui-flex>
    `;
	}
	bottomTemplate() {
		return w` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `;
	}
	imageOrIconTemplate() {
		return this.icon ? w`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge ? w`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>` : null}
          </wui-flex>
        </wui-flex>
      ` : w`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `;
	}
	contentTemplate() {
		return this.content.length === 0 ? null : w`
      <wui-flex flexDirection="column" rowGap="s">
        ${this.content.map((e) => this.labelAndTagTemplate(e))}
      </wui-flex>
    `;
	}
	labelAndTagTemplate({ address: e, profileName: t, label: r, description: i, enableButton: a, buttonType: o, buttonLabel: s, buttonVariant: c, tagVariant: ee, tagLabel: l, alignItems: u = "flex-end" }) {
		return w`
      <wui-flex justifyContent="space-between" alignItems=${u} columnGap="3xs">
        <wui-flex flexDirection="column" rowGap="4xs">
          ${r ? w`<wui-text variant="micro-600" color="fg-200">${r}</wui-text>` : null}

          <wui-flex alignItems="center" columnGap="3xs">
            <wui-text variant="small-500" color="fg-100">
              ${n.getTruncateString({
			string: t || e,
			charsStart: t ? 16 : this.charsStart,
			charsEnd: t ? 0 : this.charsEnd,
			truncate: t ? "end" : "middle"
		})}
            </wui-text>

            ${ee && l ? w`<wui-tag variant=${ee} size="xs">${l}</wui-tag>` : null}
          </wui-flex>

          ${i ? w`<wui-text variant="tiny-500" color="fg-200">${i}</wui-text>` : null}
        </wui-flex>

        ${a ? this.buttonTemplate({
			buttonType: o,
			buttonLabel: s,
			buttonVariant: c
		}) : null}
      </wui-flex>
    `;
	}
	buttonTemplate({ buttonType: e, buttonLabel: t, buttonVariant: n }) {
		return w`
      <wui-button
        size="xs"
        variant=${n}
        @click=${e === "disconnect" ? this.dispatchDisconnectEvent.bind(this) : this.dispatchSwitchEvent.bind(this)}
        data-testid=${e === "disconnect" ? "wui-active-profile-wallet-item-disconnect-button" : "wui-active-profile-wallet-item-switch-button"}
      >
        ${t}
      </wui-button>
    `;
	}
	dispatchDisconnectEvent() {
		this.dispatchEvent(new CustomEvent("disconnect", {
			bubbles: !0,
			composed: !0
		}));
	}
	dispatchSwitchEvent() {
		this.dispatchEvent(new CustomEvent("switch", {
			bubbles: !0,
			composed: !0
		}));
	}
	dispatchExternalLinkEvent() {
		this.dispatchEvent(new CustomEvent("externalLink", {
			bubbles: !0,
			composed: !0
		}));
	}
	dispatchMoreButtonEvent() {
		this.dispatchEvent(new CustomEvent("more", {
			bubbles: !0,
			composed: !0
		}));
	}
	dispatchCopyEvent() {
		this.dispatchEvent(new CustomEvent("copy", {
			bubbles: !0,
			composed: !0
		}));
	}
};
V.styles = [
	r,
	e,
	Et
], B([k()], V.prototype, "address", void 0), B([k()], V.prototype, "profileName", void 0), B([k({ type: Array })], V.prototype, "content", void 0), B([k()], V.prototype, "alt", void 0), B([k()], V.prototype, "imageSrc", void 0), B([k()], V.prototype, "icon", void 0), B([k()], V.prototype, "iconSize", void 0), B([k()], V.prototype, "iconBadge", void 0), B([k()], V.prototype, "iconBadgeSize", void 0), B([k()], V.prototype, "buttonVariant", void 0), B([k({ type: Boolean })], V.prototype, "enableMoreButton", void 0), B([k({ type: Number })], V.prototype, "charsStart", void 0), B([k({ type: Number })], V.prototype, "charsEnd", void 0), V = B([i("wui-active-profile-wallet-item")], V);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-inactive-profile-wallet-item/styles.js
var Dt = T`
  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`, H = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, U = class extends E {
	constructor() {
		super(...arguments), this.address = "", this.profileName = "", this.alt = "", this.buttonLabel = "", this.buttonVariant = "accent", this.imageSrc = "", this.icon = void 0, this.iconSize = "md", this.iconBadgeSize = "md", this.rightIcon = "off", this.rightIconSize = "md", this.loading = !1, this.charsStart = 4, this.charsEnd = 6;
	}
	render() {
		return w`
      <wui-flex alignItems="center" columnGap="xs">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `;
	}
	imageOrIconTemplate() {
		return this.icon ? w`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>
            ${this.iconBadge ? w`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>` : null}
          </wui-flex>
        </wui-flex>
      ` : w`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`;
	}
	labelAndDescriptionTemplate() {
		return w`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="small-500" color="fg-100">
          ${n.getTruncateString({
			string: this.profileName || this.address,
			charsStart: this.profileName ? 16 : this.charsStart,
			charsEnd: this.profileName ? 0 : this.charsEnd,
			truncate: this.profileName ? "end" : "middle"
		})}
        </wui-text>
      </wui-flex>
    `;
	}
	buttonActionTemplate() {
		return w`
      <wui-flex columnGap="3xs" alignItems="center" justifyContent="center">
        <wui-button
          size="xs"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          iconColor="fg-200"
          size=${this.rightIconSize}
          icon=${this.rightIcon}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `;
	}
	handleButtonClick() {
		this.dispatchEvent(new CustomEvent("buttonClick", {
			bubbles: !0,
			composed: !0
		}));
	}
	handleIconClick() {
		this.dispatchEvent(new CustomEvent("iconClick", {
			bubbles: !0,
			composed: !0
		}));
	}
};
U.styles = [
	r,
	e,
	Dt
], H([k()], U.prototype, "address", void 0), H([k()], U.prototype, "profileName", void 0), H([k()], U.prototype, "alt", void 0), H([k()], U.prototype, "buttonLabel", void 0), H([k()], U.prototype, "buttonVariant", void 0), H([k()], U.prototype, "imageSrc", void 0), H([k()], U.prototype, "icon", void 0), H([k()], U.prototype, "iconSize", void 0), H([k()], U.prototype, "iconBadge", void 0), H([k()], U.prototype, "iconBadgeSize", void 0), H([k()], U.prototype, "rightIcon", void 0), H([k()], U.prototype, "rightIconSize", void 0), H([k({ type: Boolean })], U.prototype, "loading", void 0), H([k({ type: Number })], U.prototype, "charsStart", void 0), H([k({ type: Number })], U.prototype, "charsEnd", void 0), U = H([i("wui-inactive-profile-wallet-item")], U);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectionUtil.js
var Ot = { getAuthData(e) {
	let t = e.connectorId === l.CONNECTOR_ID.AUTH;
	if (!t) return {
		isAuth: !1,
		icon: void 0,
		iconSize: void 0,
		name: void 0
	};
	let n = e?.auth?.name ?? f.getConnectedSocialProvider(), r = e?.auth?.username ?? f.getConnectedSocialUsername(), i = b.getAuthConnector()?.provider.getEmail() ?? "";
	return {
		isAuth: !0,
		icon: n ?? "mail",
		iconSize: n ? "xl" : "md",
		name: t ? de.getAuthName({
			email: i,
			socialUsername: r,
			socialProvider: n
		}) : void 0
	};
} }, kt = T`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: var(--wui-spacing-l);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-separator {
    margin: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  .active-connection {
    padding: var(--wui-spacing-xs);
  }

  .recent-connection {
    padding: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`, W = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, At = 16, jt = 4, G = {
	ADDRESS_DISPLAY: {
		START: 4,
		END: 6
	},
	BADGE: {
		SIZE: "md",
		ICON: "lightbulb"
	},
	SCROLL_THRESHOLD: 50,
	OPACITY_RANGE: [0, 1]
}, Mt = {
	eip155: "ethereum",
	solana: "solana",
	bip122: "bitcoin"
}, Nt = [
	{
		namespace: "eip155",
		icon: Mt.eip155,
		label: "EVM"
	},
	{
		namespace: "solana",
		icon: Mt.solana,
		label: "Solana"
	},
	{
		namespace: "bip122",
		icon: Mt.bip122,
		label: "Bitcoin"
	}
], Pt = {
	eip155: {
		title: "Add EVM Wallet",
		description: "Add your first EVM wallet"
	},
	solana: {
		title: "Add Solana Wallet",
		description: "Add your first Solana wallet"
	},
	bip122: {
		title: "Add Bitcoin Wallet",
		description: "Add your first Bitcoin wallet"
	}
}, K = class extends E {
	constructor() {
		super(), this.unsubscribers = [], this.currentTab = 0, this.namespace = v.state.activeChain, this.namespaces = Array.from(v.state.chains.keys()), this.caipAddress = void 0, this.profileName = void 0, this.activeConnectorIds = b.state.activeConnectorIds, this.lastSelectedAddress = "", this.lastSelectedConnectorId = "", this.isSwitching = !1, this.caipNetwork = v.state.activeCaipNetwork, this.user = _.state.user, this.remoteFeatures = u.state.remoteFeatures, this.tabWidth = "", this.currentTab = this.namespace ? this.namespaces.indexOf(this.namespace) : 0, this.caipAddress = v.getAccountData(this.namespace)?.caipAddress, this.profileName = v.getAccountData(this.namespace)?.profileName, this.unsubscribers.push(h.subscribeKey("connections", () => this.onConnectionsChange()), h.subscribeKey("recentConnections", () => this.requestUpdate()), b.subscribeKey("activeConnectorIds", (e) => {
			this.activeConnectorIds = e;
		}), v.subscribeKey("activeCaipNetwork", (e) => this.caipNetwork = e), _.subscribeKey("user", (e) => this.user = e), u.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e)), this.chainListener = v.subscribeChainProp("accountState", (e) => {
			this.caipAddress = e?.caipAddress, this.profileName = e?.profileName;
		}, this.namespace);
	}
	disconnectedCallback() {
		this.unsubscribers.forEach((e) => e()), this.resizeObserver?.disconnect(), this.tabsResizeObserver?.disconnect(), this.removeScrollListener(), this.chainListener?.();
	}
	firstUpdated() {
		let e = this.shadowRoot?.querySelector(".wallet-list"), t = this.shadowRoot?.querySelector("wui-tabs");
		if (!e) return;
		let n = () => this.updateScrollOpacity(e);
		if (requestAnimationFrame(n), e.addEventListener("scroll", n), this.resizeObserver = new ResizeObserver(n), this.resizeObserver.observe(e), n(), t) {
			let e = () => {
				let e = Nt.filter((e) => this.namespaces.includes(e.namespace)).length;
				if (e > 1) {
					let t = this.getBoundingClientRect()?.width, n = jt * 2;
					this.tabWidth = `${(t - At * 2 - n) / e}px`, this.requestUpdate();
				}
			};
			this.tabsResizeObserver = new ResizeObserver(e), this.tabsResizeObserver.observe(this), e();
		}
	}
	render() {
		let e = this.namespace;
		if (!e) throw Error("Namespace is not set");
		return w`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"l",
			"l"
		]} gap="l">
        ${this.renderTabs()} ${this.renderHeader(e)} ${this.renderConnections(e)}
        ${this.renderAddConnectionButton(e)}
      </wui-flex>
    `;
	}
	renderTabs() {
		let e = Nt.filter((e) => this.namespaces.includes(e.namespace));
		return e.length > 1 ? w`
        <wui-tabs
          .onTabChange=${(e) => this.handleTabChange(e)}
          .activeTab=${this.currentTab}
          localTabWidth=${this.tabWidth}
          .tabs=${e}
        ></wui-tabs>
      ` : null;
	}
	renderHeader(e) {
		let t = this.getActiveConnections(e).flatMap(({ accounts: e }) => e).length + (this.caipAddress ? 1 : 0);
		return w`
      <wui-flex alignItems="center" columnGap="3xs">
        <wui-icon
          name=${Mt[e] ?? Mt.eip155}
          size="lg"
        ></wui-icon>
        <wui-text color="fg-200" variant="small-400"
          >${t > 1 ? "Wallets" : "Wallet"}</wui-text
        >
        <wui-text
          color="fg-100"
          variant="small-400"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${t}
        </wui-text>
        <wui-link
          color="fg-200"
          @click=${() => h.disconnect({ namespace: e })}
          ?disabled=${!this.hasAnyConnections(e)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `;
	}
	renderConnections(e) {
		let t = this.hasAnyConnections(e);
		return w`
      <wui-flex flexDirection="column" class=${ge({
			"wallet-list": !0,
			"active-wallets-box": t,
			"empty-wallet-list-box": !t
		})} rowGap="s">
        ${t ? this.renderActiveConnections(e) : this.renderEmptyState(e)}
      </wui-flex>
    `;
	}
	renderActiveConnections(e) {
		let t = this.getActiveConnections(e), n = this.activeConnectorIds[e];
		return w`
      ${this.getPlainAddress() || n || t.length > 0 ? w`<wui-flex
            flexDirection="column"
            .padding=${[
			"l",
			"0",
			"xs",
			"0"
		]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(e)} ${this.renderActiveConnectionsList(e)}
          </wui-flex>` : null}
      ${this.renderRecentConnections(e)}
    `;
	}
	renderActiveProfile(e) {
		let t = this.activeConnectorIds[e];
		if (!t) return null;
		let { connections: n } = ie.getConnectionsData(e), r = b.getConnectorById(t), i = x.getConnectorImage(r), a = this.getPlainAddress();
		if (!a) return null;
		let o = e === l.CHAIN.BITCOIN, s = Ot.getAuthData({
			connectorId: t,
			accounts: []
		}), c = this.getActiveConnections(e).flatMap((e) => e.accounts).length > 0, ee = n.find((e) => e.connectorId === t), u = ee?.accounts.filter((e) => !C.isLowerCaseMatch(e.address, a));
		return w`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"0",
			"l"
		]}>
        <wui-active-profile-wallet-item
          address=${a}
          alt=${r?.name}
          .content=${this.getProfileContent({
			address: a,
			connections: n,
			connectorId: t,
			namespace: e
		})}
          .charsStart=${G.ADDRESS_DISPLAY.START}
          .charsEnd=${G.ADDRESS_DISPLAY.END}
          .icon=${s.icon}
          .iconSize=${s.iconSize}
          .iconBadge=${this.isSmartAccount(a) ? G.BADGE.ICON : void 0}
          .iconBadgeSize=${this.isSmartAccount(a) ? G.BADGE.SIZE : void 0}
          imageSrc=${i}
          ?enableMoreButton=${s.isAuth}
          @copy=${() => this.handleCopyAddress(a)}
          @disconnect=${() => this.handleDisconnect(e, { id: t })}
          @switch=${() => {
			o && ee && u?.[0] && this.handleSwitchWallet(ee, u[0].address, e);
		}}
          @externalLink=${() => this.handleExternalLink(a)}
          @more=${() => this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${c ? w`<wui-separator></wui-separator>` : null}
      </wui-flex>
    `;
	}
	renderActiveConnectionsList(e) {
		let t = this.getActiveConnections(e);
		return t.length === 0 ? null : w`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"xs",
			"0",
			"xs"
		]}>
        ${this.renderConnectionList(t, !1, e)}
      </wui-flex>
    `;
	}
	renderRecentConnections(e) {
		let { recentConnections: t } = ie.getConnectionsData(e);
		return t.flatMap((e) => e.accounts).length === 0 ? null : w`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"xs",
			"0",
			"xs"
		]} rowGap="xs">
        <wui-text color="fg-200" variant="micro-500" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${[
			"0",
			"xs",
			"0",
			"xs"
		]}>
          ${this.renderConnectionList(t, !0, e)}
        </wui-flex>
      </wui-flex>
    `;
	}
	renderConnectionList(e, t, n) {
		return e.filter((e) => e.accounts.length > 0).map((e, r) => {
			let i = b.getConnectorById(e.connectorId), a = x.getConnectorImage(i) ?? "", o = Ot.getAuthData(e);
			return e.accounts.map((i, s) => {
				let c = r !== 0 || s !== 0, ee = this.isAccountLoading(e.connectorId, i.address);
				return w`
            <wui-flex flexDirection="column">
              ${c ? w`<wui-separator></wui-separator>` : null}
              <wui-inactive-profile-wallet-item
                address=${i.address}
                alt=${e.connectorId}
                buttonLabel=${t ? "Connect" : "Switch"}
                buttonVariant=${t ? "neutral" : "accent"}
                rightIcon=${t ? "bin" : "off"}
                rightIconSize="sm"
                class=${t ? "recent-connection" : "active-connection"}
                data-testid=${t ? "recent-connection" : "active-connection"}
                imageSrc=${a}
                .iconBadge=${this.isSmartAccount(i.address) ? G.BADGE.ICON : void 0}
                .iconBadgeSize=${this.isSmartAccount(i.address) ? G.BADGE.SIZE : void 0}
                .icon=${o.icon}
                .iconSize=${o.iconSize}
                .loading=${ee}
                .showBalance=${!1}
                .charsStart=${G.ADDRESS_DISPLAY.START}
                .charsEnd=${G.ADDRESS_DISPLAY.END}
                @buttonClick=${() => this.handleSwitchWallet(e, i.address, n)}
                @iconClick=${() => this.handleWalletAction({
					connection: e,
					address: i.address,
					isRecentConnection: t,
					namespace: n
				})}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `;
			});
		});
	}
	renderAddConnectionButton(e) {
		if (!this.isMultiWalletEnabled() && this.caipAddress || !this.hasAnyConnections(e)) return null;
		let { title: t } = this.getChainLabelInfo(e);
		return w`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${!0}
        @click=${() => this.handleAddConnection(e)}
        data-testid="add-connection-button"
      >
        <wui-text variant="paragraph-500" color="fg-200">${t}</wui-text>
      </wui-list-item>
    `;
	}
	renderEmptyState(e) {
		let { title: t, description: n } = this.getChainLabelInfo(e);
		return w`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="s"
          class="empty-box"
        >
          <wui-icon-box
            size="lg"
            icon="wallet"
            background="gray"
            iconColor="fg-200"
            backgroundColor="glass-002"
          ></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="3xs">
            <wui-text color="fg-100" variant="paragraph-500" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="fg-200" variant="tiny-500" data-testid="empty-state-description"
              >${n}</wui-text
            >
          </wui-flex>

          <wui-button
            variant="neutral"
            size="md"
            @click=${() => this.handleAddConnection(e)}
            data-testid="empty-state-button"
          >
            <wui-icon color="inherit" slot="iconLeft" name="plus"></wui-icon>
            ${t}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
	}
	handleTabChange(e) {
		let t = this.namespaces[e];
		t && (this.chainListener?.(), this.currentTab = this.namespaces.indexOf(t), this.namespace = t, this.caipAddress = v.getAccountData(t)?.caipAddress, this.profileName = v.getAccountData(t)?.profileName, this.chainListener = v.subscribeChainProp("accountState", (e) => {
			this.caipAddress = e?.caipAddress;
		}, t));
	}
	async handleSwitchWallet(e, t, n) {
		try {
			this.isSwitching = !0, this.lastSelectedConnectorId = e.connectorId, this.lastSelectedAddress = t, await h.switchConnection({
				connection: e,
				address: t,
				namespace: n,
				closeModalOnConnect: !1,
				onChange({ hasSwitchedAccount: e, hasSwitchedWallet: t }) {
					t ? g.showSuccess("Wallet switched") : e && g.showSuccess("Account switched");
				}
			});
		} catch {
			g.showError("Failed to switch wallet");
		} finally {
			this.isSwitching = !1;
		}
	}
	handleWalletAction(e) {
		let { connection: t, address: n, isRecentConnection: r, namespace: i } = e;
		r ? (f.deleteAddressFromConnection({
			connectorId: t.connectorId,
			address: n,
			namespace: i
		}), h.syncStorageConnections(), g.showSuccess("Wallet deleted")) : this.handleDisconnect(i, { id: t.connectorId });
	}
	async handleDisconnect(e, { id: t }) {
		try {
			await h.disconnect({
				id: t,
				namespace: e
			}), g.showSuccess("Wallet disconnected");
		} catch {
			g.showError("Failed to disconnect wallet");
		}
	}
	handleCopyAddress(e) {
		d.copyToClopboard(e), g.showSuccess("Address copied");
	}
	handleMore() {
		m.push("AccountSettings");
	}
	handleExternalLink(e) {
		let t = this.caipNetwork?.blockExplorers?.default.url;
		t && d.openHref(`${t}/address/${e}`, "_blank");
	}
	handleAddConnection(e) {
		b.setFilterByNamespace(e), m.push("Connect");
	}
	getChainLabelInfo(e) {
		return Pt[e] ?? {
			title: "Add Wallet",
			description: "Add your first wallet"
		};
	}
	isSmartAccount(e) {
		if (!this.namespace) return !1;
		let t = this.user?.accounts?.find((e) => e.type === "smartAccount");
		return t && e ? C.isLowerCaseMatch(t.address, e) : !1;
	}
	getPlainAddress() {
		return this.caipAddress ? d.getPlainAddress(this.caipAddress) : void 0;
	}
	getActiveConnections(e) {
		let t = this.activeConnectorIds[e], { connections: n } = ie.getConnectionsData(e), [r] = n.filter((e) => C.isLowerCaseMatch(e.connectorId, t));
		if (!t) return n;
		let i = e === l.CHAIN.BITCOIN, { address: a } = this.caipAddress ? ee.parseCaipAddress(this.caipAddress) : {}, o = [...a ? [a] : []];
		return i && r && (o = r.accounts.map((e) => e.address) || []), ie.excludeConnectorAddressFromConnections({
			connectorId: t,
			addresses: o,
			connections: n
		});
	}
	hasAnyConnections(e) {
		let t = this.getActiveConnections(e), { recentConnections: n } = ie.getConnectionsData(e);
		return !!this.caipAddress || t.length > 0 || n.length > 0;
	}
	isAccountLoading(e, t) {
		return C.isLowerCaseMatch(this.lastSelectedConnectorId, e) && C.isLowerCaseMatch(this.lastSelectedAddress, t) && this.isSwitching;
	}
	getProfileContent(e) {
		let { address: t, connections: n, connectorId: r, namespace: i } = e, [a] = n.filter((e) => C.isLowerCaseMatch(e.connectorId, r));
		if (i === l.CHAIN.BITCOIN && a?.accounts.every((e) => typeof e.type == "string")) return this.getBitcoinProfileContent(a.accounts, t);
		let o = Ot.getAuthData({
			connectorId: r,
			accounts: []
		});
		return [{
			address: t,
			tagLabel: "Active",
			tagVariant: "success",
			enableButton: !0,
			profileName: this.profileName,
			buttonType: "disconnect",
			buttonLabel: "Disconnect",
			buttonVariant: "neutral",
			...o.isAuth ? { description: this.isSmartAccount(t) ? "Smart Account" : "EOA Account" } : {}
		}];
	}
	getBitcoinProfileContent(e, t) {
		let n = e.length > 1, r = this.getPlainAddress();
		return e.map((e) => {
			let i = C.isLowerCaseMatch(e.address, r), a = "PAYMENT";
			return e.type === "ordinal" && (a = "ORDINALS"), {
				address: e.address,
				tagLabel: C.isLowerCaseMatch(e.address, t) ? "Active" : void 0,
				tagVariant: C.isLowerCaseMatch(e.address, t) ? "success" : void 0,
				enableButton: !0,
				...n ? {
					label: a,
					alignItems: "flex-end",
					buttonType: i ? "disconnect" : "switch",
					buttonLabel: i ? "Disconnect" : "Switch",
					buttonVariant: i ? "neutral" : "accent"
				} : {
					alignItems: "center",
					buttonType: "disconnect",
					buttonLabel: "Disconnect",
					buttonVariant: "neutral"
				}
			};
		});
	}
	removeScrollListener() {
		let e = this.shadowRoot?.querySelector(".wallet-list");
		e && e.removeEventListener("scroll", () => this.handleConnectListScroll());
	}
	handleConnectListScroll() {
		let e = this.shadowRoot?.querySelector(".wallet-list");
		e && this.updateScrollOpacity(e);
	}
	isMultiWalletEnabled() {
		return !!this.remoteFeatures?.multiWallet;
	}
	updateScrollOpacity(e) {
		e.style.setProperty("--connect-scroll--top-opacity", a.interpolate([0, G.SCROLL_THRESHOLD], G.OPACITY_RANGE, e.scrollTop).toString()), e.style.setProperty("--connect-scroll--bottom-opacity", a.interpolate([0, G.SCROLL_THRESHOLD], G.OPACITY_RANGE, e.scrollHeight - e.scrollTop - e.offsetHeight).toString());
	}
	onConnectionsChange() {
		if (this.isMultiWalletEnabled() && this.namespace) {
			let { connections: e } = ie.getConnectionsData(this.namespace);
			e.length === 0 && m.reset("ProfileWallets");
		}
		this.requestUpdate();
	}
};
K.styles = kt, W([O()], K.prototype, "currentTab", void 0), W([O()], K.prototype, "namespace", void 0), W([O()], K.prototype, "namespaces", void 0), W([O()], K.prototype, "caipAddress", void 0), W([O()], K.prototype, "profileName", void 0), W([O()], K.prototype, "activeConnectorIds", void 0), W([O()], K.prototype, "lastSelectedAddress", void 0), W([O()], K.prototype, "lastSelectedConnectorId", void 0), W([O()], K.prototype, "isSwitching", void 0), W([O()], K.prototype, "caipNetwork", void 0), W([O()], K.prototype, "user", void 0), W([O()], K.prototype, "remoteFeatures", void 0), W([O()], K.prototype, "tabWidth", void 0), K = W([i("w3m-profile-wallets-view")], K);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-switch/styles.js
var Ft = T`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`, It = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Lt = class extends E {
	constructor() {
		super(...arguments), this.inputElementRef = ye(), this.checked = void 0;
	}
	render() {
		return w`
      <label>
        <input
          ${ve(this.inputElementRef)}
          type="checkbox"
          ?checked=${D(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
	}
	dispatchChangeEvent() {
		this.dispatchEvent(new CustomEvent("switchChange", {
			detail: this.inputElementRef.value?.checked,
			bubbles: !0,
			composed: !0
		}));
	}
};
Lt.styles = [
	r,
	e,
	t,
	Ft
], It([k({ type: Boolean })], Lt.prototype, "checked", void 0), Lt = It([i("wui-switch")], Lt);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-certified-switch/styles.js
var Rt = T`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`, zt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Bt = class extends E {
	constructor() {
		super(...arguments), this.checked = void 0;
	}
	render() {
		return w`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${D(this.checked)}></wui-switch>
      </button>
    `;
	}
};
Bt.styles = [
	r,
	e,
	Rt
], zt([k({ type: Boolean })], Bt.prototype, "checked", void 0), Bt = zt([i("wui-certified-switch")], Bt);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-element/styles.js
var Vt = T`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`, Ht = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ut = class extends E {
	constructor() {
		super(...arguments), this.icon = "copy";
	}
	render() {
		return w`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `;
	}
};
Ut.styles = [
	r,
	e,
	Vt
], Ht([k()], Ut.prototype, "icon", void 0), Ut = Ht([i("wui-input-element")], Ut);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-search-bar/styles.js
var Wt = T`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`, Gt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Kt = class extends E {
	constructor() {
		super(...arguments), this.inputComponentRef = ye();
	}
	render() {
		return w`
      <wui-input-text
        ${ve(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `;
	}
	clearValue() {
		let e = this.inputComponentRef.value?.inputElementRef.value;
		e && (e.value = "", e.focus(), e.dispatchEvent(new Event("input")));
	}
};
Kt.styles = [r, Wt], Kt = Gt([i("wui-search-bar")], Kt);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-card-select-loader/styles.js
var qt = T`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`, Jt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Yt = class extends E {
	constructor() {
		super(...arguments), this.type = "wallet";
	}
	render() {
		return w`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `;
	}
	shimmerTemplate() {
		return this.type === "network" ? w` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${_e}` : w`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
	}
};
Yt.styles = [
	r,
	e,
	qt
], Jt([k()], Yt.prototype, "type", void 0), Yt = Jt([i("wui-card-select-loader")], Yt);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-grid/styles.js
var Xt = T`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`, q = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, J = class extends E {
	render() {
		return this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && n.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && n.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && n.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && n.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && n.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && n.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && n.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && n.getSpacingStyles(this.margin, 3)};
    `, w`<slot></slot>`;
	}
};
J.styles = [r, Xt], q([k()], J.prototype, "gridTemplateRows", void 0), q([k()], J.prototype, "gridTemplateColumns", void 0), q([k()], J.prototype, "justifyItems", void 0), q([k()], J.prototype, "alignItems", void 0), q([k()], J.prototype, "justifyContent", void 0), q([k()], J.prototype, "alignContent", void 0), q([k()], J.prototype, "columnGap", void 0), q([k()], J.prototype, "rowGap", void 0), q([k()], J.prototype, "gap", void 0), q([k()], J.prototype, "padding", void 0), q([k()], J.prototype, "margin", void 0), J = q([i("wui-grid")], J);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list-item/styles.js
var Zt = T`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`, Qt = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, $t = class extends E {
	constructor() {
		super(), this.observer = new IntersectionObserver(() => void 0), this.visible = !1, this.imageSrc = void 0, this.imageLoading = !1, this.wallet = void 0, this.observer = new IntersectionObserver((e) => {
			e.forEach((e) => {
				e.isIntersecting ? (this.visible = !0, this.fetchImageSrc()) : this.visible = !1;
			});
		}, { threshold: .01 });
	}
	firstUpdated() {
		this.observer.observe(this);
	}
	disconnectedCallback() {
		this.observer.disconnect();
	}
	render() {
		let e = this.wallet?.badge_type === "certified";
		return w`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${D(e ? "certified" : void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e ? w`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
	}
	imageTemplate() {
		return !this.visible && !this.imageSrc || this.imageLoading ? this.shimmerTemplate() : w`
      <wui-wallet-image
        size="md"
        imageSrc=${D(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
	}
	shimmerTemplate() {
		return w`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
	}
	async fetchImageSrc() {
		this.wallet && (this.imageSrc = x.getWalletImage(this.wallet), !this.imageSrc && (this.imageLoading = !0, this.imageSrc = await x.fetchWalletImage(this.wallet.image_id), this.imageLoading = !1));
	}
};
$t.styles = Zt, Qt([O()], $t.prototype, "visible", void 0), Qt([O()], $t.prototype, "imageSrc", void 0), Qt([O()], $t.prototype, "imageLoading", void 0), Qt([k()], $t.prototype, "wallet", void 0), $t = Qt([i("w3m-all-wallets-list-item")], $t);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list/styles.js
var en = T`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`, tn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, nn = "local-paginator", rn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.paginationObserver = void 0, this.loading = !S.state.wallets.length, this.wallets = S.state.wallets, this.recommended = S.state.recommended, this.featured = S.state.featured, this.filteredWallets = S.state.filteredWallets, this.unsubscribe.push(S.subscribeKey("wallets", (e) => this.wallets = e), S.subscribeKey("recommended", (e) => this.recommended = e), S.subscribeKey("featured", (e) => this.featured = e), S.subscribeKey("filteredWallets", (e) => this.filteredWallets = e));
	}
	firstUpdated() {
		this.initialFetch(), this.createPaginationObserver();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), this.paginationObserver?.disconnect();
	}
	render() {
		return w`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading ? this.shimmerTemplate(16) : this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `;
	}
	async initialFetch() {
		this.loading = !0;
		let e = this.shadowRoot?.querySelector("wui-grid");
		e && (await S.fetchWalletsByPage({ page: 1 }), await e.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}).finished, this.loading = !1, e.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}));
	}
	shimmerTemplate(e, t) {
		return [...Array(e)].map(() => w`
        <wui-card-select-loader type="wallet" id=${D(t)}></wui-card-select-loader>
      `);
	}
	getWallets() {
		let e = [...this.featured, ...this.recommended];
		this.filteredWallets?.length > 0 ? e.push(...this.filteredWallets) : e.push(...this.wallets);
		let t = d.uniqueBy(e, "id"), n = le.markWalletsAsInstalled(t);
		return le.markWalletsWithDisplayIndex(n);
	}
	walletsTemplate() {
		return this.getWallets().map((e) => w`
        <w3m-all-wallets-list-item
          @click=${() => this.onConnectWallet(e)}
          .wallet=${e}
        ></w3m-all-wallets-list-item>
      `);
	}
	paginationLoaderTemplate() {
		let { wallets: e, recommended: t, featured: n, count: r } = S.state, i = window.innerWidth < 352 ? 3 : 4, a = e.length + t.length, o = Math.ceil(a / i) * i - a + i;
		return o -= e.length ? n.length % i : 0, r === 0 && n.length > 0 ? null : r === 0 || [
			...n,
			...e,
			...t
		].length < r ? this.shimmerTemplate(o, nn) : null;
	}
	createPaginationObserver() {
		let e = this.shadowRoot?.querySelector(`#${nn}`);
		e && (this.paginationObserver = new IntersectionObserver(([e]) => {
			if (e?.isIntersecting && !this.loading) {
				let { page: e, count: t, wallets: n } = S.state;
				n.length < t && S.fetchWalletsByPage({ page: e + 1 });
			}
		}), this.paginationObserver.observe(e));
	}
	onConnectWallet(e) {
		b.selectWalletConnector(e);
	}
};
rn.styles = en, tn([O()], rn.prototype, "loading", void 0), tn([O()], rn.prototype, "wallets", void 0), tn([O()], rn.prototype, "recommended", void 0), tn([O()], rn.prototype, "featured", void 0), tn([O()], rn.prototype, "filteredWallets", void 0), rn = tn([i("w3m-all-wallets-list")], rn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-search/styles.js
var an = T`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`, on = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, sn = class extends E {
	constructor() {
		super(...arguments), this.prevQuery = "", this.prevBadge = void 0, this.loading = !0, this.query = "";
	}
	render() {
		return this.onSearch(), this.loading ? w`<wui-loading-spinner color="accent-100"></wui-loading-spinner>` : this.walletsTemplate();
	}
	async onSearch() {
		(this.query.trim() !== this.prevQuery.trim() || this.badge !== this.prevBadge) && (this.prevQuery = this.query, this.prevBadge = this.badge, this.loading = !0, await S.searchWallet({
			search: this.query,
			badge: this.badge
		}), this.loading = !1);
	}
	walletsTemplate() {
		let { search: e } = S.state, t = le.markWalletsAsInstalled(e);
		return e.length ? w`
      <wui-grid
        data-testid="wallet-list"
        .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${t.map((e) => w`
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    ` : w`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
	}
	onConnectWallet(e) {
		b.selectWalletConnector(e);
	}
};
sn.styles = an, on([O()], sn.prototype, "loading", void 0), on([k()], sn.prototype, "query", void 0), on([k()], sn.prototype, "badge", void 0), sn = on([i("w3m-all-wallets-search")], sn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-all-wallets-view/index.js
var cn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ln = class extends E {
	constructor() {
		super(...arguments), this.search = "", this.onDebouncedSearch = d.debounce((e) => {
			this.search = e;
		});
	}
	render() {
		let e = this.search.length >= 2;
		return w`
      <wui-flex .padding=${[
			"0",
			"s",
			"s",
			"s"
		]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e || this.badge ? w`<w3m-all-wallets-search
            query=${this.search}
            badge=${D(this.badge)}
          ></w3m-all-wallets-search>` : w`<w3m-all-wallets-list badge=${D(this.badge)}></w3m-all-wallets-list>`}
    `;
	}
	onInputChange(e) {
		this.onDebouncedSearch(e.detail);
	}
	onClick() {
		if (this.badge === "certified") {
			this.badge = void 0;
			return;
		}
		this.badge = "certified", g.showSvg("Only WalletConnect certified", {
			icon: "walletConnectBrown",
			iconColor: "accent-100"
		});
	}
	qrButtonTemplate() {
		return d.isMobile() ? w`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      ` : null;
	}
	onWalletConnectQr() {
		m.push("ConnectingWalletConnect");
	}
};
cn([O()], ln.prototype, "search", void 0), cn([O()], ln.prototype, "badge", void 0), ln = cn([i("w3m-all-wallets-view")], ln);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-button/styles.js
var un = T`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`, dn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, fn = class extends E {
	constructor() {
		super(...arguments), this.text = "", this.disabled = !1, this.tabIdx = void 0;
	}
	render() {
		return w`
      <button ?disabled=${this.disabled} tabindex=${D(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `;
	}
};
fn.styles = [
	r,
	e,
	un
], dn([k()], fn.prototype, "text", void 0), dn([k({ type: Boolean })], fn.prototype, "disabled", void 0), dn([k()], fn.prototype, "tabIdx", void 0), fn = dn([i("wui-list-button")], fn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-email-login-widget/styles.js
var pn = T`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`, mn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, hn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.formRef = ye(), this.email = "", this.loading = !1, this.error = "", this.remoteFeatures = u.state.remoteFeatures, this.unsubscribe.push(u.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	firstUpdated() {
		this.formRef.value?.addEventListener("keydown", (e) => {
			e.key === "Enter" && this.onSubmitEmail(e);
		});
	}
	render() {
		let e = h.hasAnyConnection(l.CONNECTOR_ID.AUTH);
		return w`
      <form ${ve(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${D(this.tabIdx)}
          ?disabled=${e}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `;
	}
	submitButtonTemplate() {
		return !this.loading && this.email.length > 3 ? w`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        ` : null;
	}
	loadingTemplate() {
		return this.loading ? w`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : null;
	}
	templateError() {
		return this.error ? w`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>` : null;
	}
	onEmailInputChange(e) {
		this.email = e.detail.trim(), this.error = "";
	}
	async onSubmitEmail(e) {
		if (!l.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((e) => e === v.state.activeChain)) {
			let e = v.getFirstCaipNetworkSupportsAuthConnector();
			if (e) {
				m.push("SwitchNetwork", { network: e });
				return;
			}
		}
		try {
			if (this.loading) return;
			this.loading = !0, e.preventDefault();
			let t = b.getAuthConnector();
			if (!t) throw Error("w3m-email-login-widget: Auth connector not found");
			let { action: n } = await t.provider.connectEmail({ email: this.email });
			if (p.sendEvent({
				type: "track",
				event: "EMAIL_SUBMITTED"
			}), n === "VERIFY_OTP") p.sendEvent({
				type: "track",
				event: "EMAIL_VERIFICATION_CODE_SENT"
			}), m.push("EmailVerifyOtp", { email: this.email });
			else if (n === "VERIFY_DEVICE") m.push("EmailVerifyDevice", { email: this.email });
			else if (n === "CONNECT") {
				let e = this.remoteFeatures?.multiWallet;
				await h.connectExternal(t, v.state.activeChain), e ? (m.replace("ProfileWallets"), g.showSuccess("New Wallet Added")) : m.replace("Account");
			}
		} catch (e) {
			d.parseError(e)?.includes("Invalid email") ? this.error = "Invalid email. Try again." : g.showError(e);
		} finally {
			this.loading = !1;
		}
	}
	onFocusEvent() {
		p.sendEvent({
			type: "track",
			event: "EMAIL_LOGIN_SELECTED"
		});
	}
};
hn.styles = pn, mn([k()], hn.prototype, "tabIdx", void 0), mn([O()], hn.prototype, "email", void 0), mn([O()], hn.prototype, "loading", void 0), mn([O()], hn.prototype, "error", void 0), mn([O()], hn.prototype, "remoteFeatures", void 0), hn = mn([i("w3m-email-login-widget")], hn);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo-select/styles.js
var gn = T`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`, _n = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, vn = class extends E {
	constructor() {
		super(...arguments), this.logo = "google", this.disabled = !1, this.tabIdx = void 0;
	}
	render() {
		return w`
      <button ?disabled=${this.disabled} tabindex=${D(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `;
	}
};
vn.styles = [
	r,
	e,
	gn
], _n([k()], vn.prototype, "logo", void 0), _n([k({ type: Boolean })], vn.prototype, "disabled", void 0), _n([k()], vn.prototype, "tabIdx", void 0), vn = _n([i("wui-logo-select")], vn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-social-login-widget/styles.js
var yn = T`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`, bn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, xn = 2, Sn = 6, Cn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.walletGuide = "get-started", this.tabIdx = void 0, this.connectors = b.state.connectors, this.remoteFeatures = u.state.remoteFeatures, this.authConnector = this.connectors.find((e) => e.type === "AUTH"), this.isPwaLoading = !1, this.unsubscribe.push(b.subscribeKey("connectors", (e) => {
			this.connectors = e, this.authConnector = this.connectors.find((e) => e.type === "AUTH");
		}), u.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e));
	}
	connectedCallback() {
		super.connectedCallback(), this.handlePwaFrameLoad();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `;
	}
	topViewTemplate() {
		let e = this.walletGuide === "explore", t = this.remoteFeatures?.socials;
		return !t && e ? (t = c.DEFAULT_SOCIALS, this.renderTopViewContent(t)) : t ? this.renderTopViewContent(t) : null;
	}
	renderTopViewContent(e) {
		return e.length === 2 ? w` <wui-flex gap="xs">
        ${e.slice(0, xn).map((e) => w`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${() => {
			this.onSocialClick(e);
		}}
              logo=${e}
              tabIdx=${D(this.tabIdx)}
              ?disabled=${this.isPwaLoading || this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>` : w` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${() => {
			this.onSocialClick(e[0]);
		}}
      logo=${D(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${D(this.tabIdx)}
      ?disabled=${this.isPwaLoading || this.hasConnection()}
    ></wui-list-social>`;
	}
	bottomViewTemplate() {
		let e = this.remoteFeatures?.socials, t = this.walletGuide === "explore";
		return (!this.authConnector || !e || e.length === 0) && t && (e = c.DEFAULT_SOCIALS), !e || e.length <= xn ? null : e && e.length > Sn ? w`<wui-flex gap="xs">
        ${e.slice(1, Sn - 1).map((e) => w`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${() => {
			this.onSocialClick(e);
		}}
              logo=${e}
              tabIdx=${D(this.tabIdx)}
              ?focusable=${this.tabIdx !== void 0 && this.tabIdx >= 0}
              ?disabled=${this.isPwaLoading || this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${D(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading || this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>` : e ? w`<wui-flex gap="xs">
      ${e.slice(1, e.length).map((e) => w`<wui-logo-select
            data-testid=${`social-selector-${e}`}
            @click=${() => {
			this.onSocialClick(e);
		}}
            logo=${e}
            tabIdx=${D(this.tabIdx)}
            ?focusable=${this.tabIdx !== void 0 && this.tabIdx >= 0}
            ?disabled=${this.isPwaLoading || this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>` : null;
	}
	onMoreSocialsClick() {
		m.push("ConnectSocials");
	}
	async onSocialClick(e) {
		if (!l.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((e) => e === v.state.activeChain)) {
			let e = v.getFirstCaipNetworkSupportsAuthConnector();
			if (e) {
				m.push("SwitchNetwork", { network: e });
				return;
			}
		}
		e && await xe(e);
	}
	async handlePwaFrameLoad() {
		if (d.isPWA()) {
			this.isPwaLoading = !0;
			try {
				this.authConnector?.provider instanceof he && await this.authConnector.provider.init();
			} catch (e) {
				s.open({
					displayMessage: "Error loading embedded wallet in PWA",
					debugMessage: e.message
				}, "error");
			} finally {
				this.isPwaLoading = !1;
			}
		}
	}
	hasConnection() {
		return h.hasAnyConnection(l.CONNECTOR_ID.AUTH);
	}
};
Cn.styles = yn, bn([k()], Cn.prototype, "walletGuide", void 0), bn([k()], Cn.prototype, "tabIdx", void 0), bn([O()], Cn.prototype, "connectors", void 0), bn([O()], Cn.prototype, "remoteFeatures", void 0), bn([O()], Cn.prototype, "authConnector", void 0), bn([O()], Cn.prototype, "isPwaLoading", void 0), Cn = bn([i("w3m-social-login-widget")], Cn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-guide/styles.js
var wn = T`
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`, Tn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, En = class extends E {
	constructor() {
		super(...arguments), this.walletGuide = "get-started";
	}
	render() {
		return this.walletGuide === "explore" ? w`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>` : w`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${[
			"s",
			"0",
			"s",
			"0"
		]}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${D(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`;
	}
	onGetStarted() {
		m.push("Create");
	}
};
En.styles = wn, Tn([k()], En.prototype, "tabIdx", void 0), Tn([k()], En.prototype, "walletGuide", void 0), En = Tn([i("w3m-wallet-guide")], En);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-all-wallets-image/styles.js
var Dn = T`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`, On = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, kn = 4, An = class extends E {
	constructor() {
		super(...arguments), this.walletImages = [];
	}
	render() {
		let e = this.walletImages.length < kn;
		return w`${this.walletImages.slice(0, kn).map(({ src: e, walletName: t }) => w`
            <wui-wallet-image
              size="inherit"
              imageSrc=${e}
              name=${D(t)}
            ></wui-wallet-image>
          `)}
      ${e ? [...Array(kn - this.walletImages.length)].map(() => w` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`) : null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`;
	}
};
An.styles = [r, Dn], On([k({ type: Array })], An.prototype, "walletImages", void 0), An = On([i("wui-all-wallets-image")], An);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-wallet/styles.js
var jn = T`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`, Y = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, X = class extends E {
	constructor() {
		super(...arguments), this.walletImages = [], this.imageSrc = "", this.name = "", this.tabIdx = void 0, this.installed = !1, this.disabled = !1, this.showAllWallets = !1, this.loading = !1, this.loadingSpinnerColor = "accent-100";
	}
	render() {
		return w`
      <button ?disabled=${this.disabled} tabindex=${D(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `;
	}
	templateAllWallets() {
		return this.showAllWallets && this.imageSrc ? w` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> ` : this.showAllWallets && this.walletIcon ? w` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> ` : null;
	}
	templateWalletImage() {
		return !this.showAllWallets && this.imageSrc ? w`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>` : !this.showAllWallets && !this.imageSrc ? w`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>` : null;
	}
	templateStatus() {
		return this.loading ? w`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>` : this.tagLabel && this.tagVariant ? w`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>` : this.icon ? w`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>` : null;
	}
};
X.styles = [
	r,
	e,
	jn
], Y([k({ type: Array })], X.prototype, "walletImages", void 0), Y([k()], X.prototype, "imageSrc", void 0), Y([k()], X.prototype, "name", void 0), Y([k()], X.prototype, "tagLabel", void 0), Y([k()], X.prototype, "tagVariant", void 0), Y([k()], X.prototype, "icon", void 0), Y([k()], X.prototype, "walletIcon", void 0), Y([k()], X.prototype, "tabIdx", void 0), Y([k({ type: Boolean })], X.prototype, "installed", void 0), Y([k({ type: Boolean })], X.prototype, "disabled", void 0), Y([k({ type: Boolean })], X.prototype, "showAllWallets", void 0), Y([k({ type: Boolean })], X.prototype, "loading", void 0), Y([k({ type: String })], X.prototype, "loadingSpinnerColor", void 0), X = Y([i("wui-list-wallet")], X);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-widget/index.js
var Mn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Nn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.count = S.state.count, this.filteredCount = S.state.filteredWallets.length, this.isFetchingRecommendedWallets = S.state.isFetchingRecommendedWallets, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e), S.subscribeKey("count", (e) => this.count = e), S.subscribeKey("filteredWallets", (e) => this.filteredCount = e.length), S.subscribeKey("isFetchingRecommendedWallets", (e) => this.isFetchingRecommendedWallets = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.connectors.find((e) => e.id === "walletConnect"), { allWallets: t } = u.state;
		if (!e || t === "HIDE" || t === "ONLY_MOBILE" && !d.isMobile()) return null;
		let n = S.state.featured.length, r = this.count + n, i = r < 10 ? r : Math.floor(r / 10) * 10, a = this.filteredCount > 0 ? this.filteredCount : i, o = `${a}`;
		this.filteredCount > 0 ? o = `${this.filteredCount}` : a < r && (o = `${a}+`);
		let s = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${o}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${D(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets ? "fg-300" : "accent-100"}
        ?disabled=${s}
      ></wui-list-wallet>
    `;
	}
	onAllWallets() {
		p.sendEvent({
			type: "track",
			event: "CLICK_ALL_WALLETS"
		}), m.push("AllWallets");
	}
};
Mn([k()], Nn.prototype, "tabIdx", void 0), Mn([O()], Nn.prototype, "connectors", void 0), Mn([O()], Nn.prototype, "count", void 0), Mn([O()], Nn.prototype, "filteredCount", void 0), Mn([O()], Nn.prototype, "isFetchingRecommendedWallets", void 0), Nn = Mn([i("w3m-all-wallets-widget")], Nn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-announced-widget/index.js
var Pn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Fn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.connections = h.state.connections, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e), h.subscribeKey("connections", (e) => this.connections = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.connectors.filter((e) => e.type === "ANNOUNCED");
		return e?.length ? w`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(de.showConnector).map((e) => {
			let t = (this.connections.get(e.chain) ?? []).some((t) => C.isLowerCaseMatch(t.connectorId, e.id));
			return w`
            <wui-list-wallet
              imageSrc=${D(x.getConnectorImage(e))}
              name=${e.name ?? "Unknown"}
              @click=${() => this.onConnector(e)}
              tagVariant=${t ? "shade" : "success"}
              tagLabel=${t ? "connected" : "installed"}
              data-testid=${`wallet-selector-${e.id}`}
              .installed=${!0}
              tabIdx=${D(this.tabIdx)}
            >
            </wui-list-wallet>
          `;
		})}
      </wui-flex>
    ` : (this.style.cssText = "display: none", null);
	}
	onConnector(e) {
		e.id === "walletConnect" ? d.isMobile() ? m.push("AllWallets") : m.push("ConnectingWalletConnect") : m.push("ConnectingExternal", { connector: e });
	}
};
Pn([k()], Fn.prototype, "tabIdx", void 0), Pn([O()], Fn.prototype, "connectors", void 0), Pn([O()], Fn.prototype, "connections", void 0), Fn = Pn([i("w3m-connect-announced-widget")], Fn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-custom-widget/index.js
var In = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ln = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.loading = !1, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e)), d.isTelegram() && d.isIos() && (this.loading = !h.state.wcUri, this.unsubscribe.push(h.subscribeKey("wcUri", (e) => this.loading = !e)));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { customWallets: e } = u.state;
		if (!e?.length) return this.style.cssText = "display: none", null;
		let t = this.filterOutDuplicateWallets(e), n = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`<wui-flex flexDirection="column" gap="xs">
      ${t.map((e) => w`
          <wui-list-wallet
            imageSrc=${D(x.getWalletImage(e))}
            name=${e.name ?? "Unknown"}
            @click=${() => this.onConnectWallet(e)}
            data-testid=${`wallet-selector-${e.id}`}
            tabIdx=${D(this.tabIdx)}
            ?loading=${this.loading}
            ?disabled=${n}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`;
	}
	filterOutDuplicateWallets(e) {
		let t = f.getRecentWallets(), n = this.connectors.map((e) => e.info?.rdns).filter(Boolean), r = t.map((e) => e.rdns).filter(Boolean), i = n.concat(r);
		if (i.includes("io.metamask.mobile") && d.isMobile()) {
			let e = i.indexOf("io.metamask.mobile");
			i[e] = "io.metamask";
		}
		return e.filter((e) => !i.includes(String(e?.rdns)));
	}
	onConnectWallet(e) {
		this.loading || m.push("ConnectingWalletConnect", { wallet: e });
	}
};
In([k()], Ln.prototype, "tabIdx", void 0), In([O()], Ln.prototype, "connectors", void 0), In([O()], Ln.prototype, "loading", void 0), Ln = In([i("w3m-connect-custom-widget")], Ln);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-external-widget/index.js
var Rn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, zn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.connectors.filter((e) => e.type === "EXTERNAL").filter(de.showConnector).filter((e) => e.id !== l.CONNECTOR_ID.COINBASE_SDK);
		if (!e?.length) return this.style.cssText = "display: none", null;
		let t = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e) => w`
            <wui-list-wallet
              imageSrc=${D(x.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name ?? "Unknown"}
              data-testid=${`wallet-selector-external-${e.id}`}
              @click=${() => this.onConnector(e)}
              tabIdx=${D(this.tabIdx)}
              ?disabled=${t}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
	}
	onConnector(e) {
		m.push("ConnectingExternal", { connector: e });
	}
};
Rn([k()], zn.prototype, "tabIdx", void 0), Rn([O()], zn.prototype, "connectors", void 0), zn = Rn([i("w3m-connect-external-widget")], zn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-featured-widget/index.js
var Bn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Vn = class extends E {
	constructor() {
		super(...arguments), this.tabIdx = void 0, this.wallets = [];
	}
	render() {
		if (!this.wallets.length) return this.style.cssText = "display: none", null;
		let e = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map((t) => w`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${D(x.getWalletImage(t))}
              name=${t.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(t)}
              tabIdx=${D(this.tabIdx)}
              ?disabled=${e}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
	}
	onConnectWallet(e) {
		b.selectWalletConnector(e);
	}
};
Bn([k()], Vn.prototype, "tabIdx", void 0), Bn([k()], Vn.prototype, "wallets", void 0), Vn = Bn([i("w3m-connect-featured-widget")], Vn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-injected-widget/index.js
var Hn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Un = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = [], this.connections = h.state.connections, this.unsubscribe.push(h.subscribeKey("connections", (e) => this.connections = e));
	}
	render() {
		let e = this.connectors.filter(de.showConnector);
		return e.length === 0 ? (this.style.cssText = "display: none", null) : w`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e) => {
			let t = (this.connections.get(e.chain) ?? []).some((t) => C.isLowerCaseMatch(t.connectorId, e.id));
			return w`
            <wui-list-wallet
              imageSrc=${D(x.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name ?? "Unknown"}
              tagVariant=${t ? "shade" : "success"}
              tagLabel=${t ? "connected" : "installed"}
              data-testid=${`wallet-selector-${e.id}`}
              @click=${() => this.onConnector(e)}
              tabIdx=${D(this.tabIdx)}
            >
            </wui-list-wallet>
          `;
		})}
      </wui-flex>
    `;
	}
	onConnector(e) {
		b.setActiveConnector(e), m.push("ConnectingExternal", { connector: e });
	}
};
Hn([k()], Un.prototype, "tabIdx", void 0), Hn([k()], Un.prototype, "connectors", void 0), Hn([O()], Un.prototype, "connections", void 0), Un = Hn([i("w3m-connect-injected-widget")], Un);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-multi-chain-widget/index.js
var Wn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Gn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.connectors.filter((e) => e.type === "MULTI_CHAIN" && e.name !== "WalletConnect");
		return e?.length ? w`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e) => w`
            <wui-list-wallet
              imageSrc=${D(x.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name ?? "Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${() => this.onConnector(e)}
              tabIdx=${D(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    ` : (this.style.cssText = "display: none", null);
	}
	onConnector(e) {
		b.setActiveConnector(e), m.push("ConnectingMultiChain");
	}
};
Wn([k()], Gn.prototype, "tabIdx", void 0), Wn([O()], Gn.prototype, "connectors", void 0), Gn = Wn([i("w3m-connect-multi-chain-widget")], Gn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-recent-widget/index.js
var Kn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, qn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.loading = !1, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e)), d.isTelegram() && d.isIos() && (this.loading = !h.state.wcUri, this.unsubscribe.push(h.subscribeKey("wcUri", (e) => this.loading = !e)));
	}
	render() {
		let e = f.getRecentWallets().filter((e) => !le.isExcluded(e)).filter((e) => !this.hasWalletConnector(e)).filter((e) => this.isWalletCompatibleWithCurrentChain(e));
		if (!e.length) return this.style.cssText = "display: none", null;
		let t = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e) => w`
            <wui-list-wallet
              imageSrc=${D(x.getWalletImage(e))}
              name=${e.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(e)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${D(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${t}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
	}
	onConnectWallet(e) {
		this.loading || b.selectWalletConnector(e);
	}
	hasWalletConnector(e) {
		return this.connectors.some((t) => t.id === e.id || t.name === e.name);
	}
	isWalletCompatibleWithCurrentChain(e) {
		let t = v.state.activeChain;
		return t && e.chains ? e.chains.some((e) => t === e.split(":")[0]) : !0;
	}
};
Kn([k()], qn.prototype, "tabIdx", void 0), Kn([O()], qn.prototype, "connectors", void 0), Kn([O()], qn.prototype, "loading", void 0), qn = Kn([i("w3m-connect-recent-widget")], qn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-recommended-widget/index.js
var Jn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Yn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.wallets = [], this.loading = !1, d.isTelegram() && d.isIos() && (this.loading = !h.state.wcUri, this.unsubscribe.push(h.subscribeKey("wcUri", (e) => this.loading = !e)));
	}
	render() {
		let { connectors: e } = b.state, { customWallets: t, featuredWalletIds: n } = u.state, r = f.getRecentWallets(), i = e.find((e) => e.id === "walletConnect"), a = e.filter((e) => e.type === "INJECTED" || e.type === "ANNOUNCED" || e.type === "MULTI_CHAIN").filter((e) => e.name !== "Browser Wallet");
		if (!i) return null;
		if (n || t || !this.wallets.length) return this.style.cssText = "display: none", null;
		let o = a.length + r.length, s = Math.max(0, 2 - o), c = le.filterOutDuplicateWallets(this.wallets).slice(0, s);
		if (!c.length) return this.style.cssText = "display: none", null;
		let ee = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`
      <wui-flex flexDirection="column" gap="xs">
        ${c.map((e) => w`
            <wui-list-wallet
              imageSrc=${D(x.getWalletImage(e))}
              name=${e?.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(e)}
              tabIdx=${D(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${ee}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
	}
	onConnectWallet(e) {
		if (this.loading) return;
		let t = b.getConnector({
			id: e.id,
			rdns: e.rdns
		});
		t ? m.push("ConnectingExternal", { connector: t }) : m.push("ConnectingWalletConnect", { wallet: e });
	}
};
Jn([k()], Yn.prototype, "tabIdx", void 0), Jn([k()], Yn.prototype, "wallets", void 0), Jn([O()], Yn.prototype, "loading", void 0), Yn = Jn([i("w3m-connect-recommended-widget")], Yn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-walletconnect-widget/index.js
var Xn = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Zn = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.connectorImages = te.state.connectorImages, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e), te.subscribeKey("connectorImages", (e) => this.connectorImages = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		if (d.isMobile()) return this.style.cssText = "display: none", null;
		let e = this.connectors.find((e) => e.id === "walletConnect");
		if (!e) return this.style.cssText = "display: none", null;
		let t = e.imageUrl || this.connectorImages[e?.imageId ?? ""], n = h.hasAnyConnection(l.CONNECTOR_ID.WALLET_CONNECT);
		return w`
      <wui-list-wallet
        imageSrc=${D(t)}
        name=${e.name ?? "Unknown"}
        @click=${() => this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${D(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
        ?disabled=${n}
      >
      </wui-list-wallet>
    `;
	}
	onConnector(e) {
		b.setActiveConnector(e), m.push("ConnectingWalletConnect");
	}
};
Xn([k()], Zn.prototype, "tabIdx", void 0), Xn([O()], Zn.prototype, "connectors", void 0), Xn([O()], Zn.prototype, "connectorImages", void 0), Zn = Xn([i("w3m-connect-walletconnect-widget")], Zn);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connector-list/styles.js
var Qn = T`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`, $n = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, er = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = b.state.connectors, this.recommended = S.state.recommended, this.featured = S.state.featured, this.unsubscribe.push(b.subscribeKey("connectors", (e) => this.connectors = e), S.subscribeKey("recommended", (e) => this.recommended = e), S.subscribeKey("featured", (e) => this.featured = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `;
	}
	connectorListTemplate() {
		let { custom: e, recent: t, announced: n, injected: r, multiChain: i, recommended: a, featured: o, external: s } = de.getConnectorsByType(this.connectors, this.recommended, this.featured);
		return de.getConnectorTypeOrder({
			custom: e,
			recent: t,
			announced: n,
			injected: r,
			multiChain: i,
			recommended: a,
			featured: o,
			external: s
		}).map((e) => {
			switch (e) {
				case "injected": return w`
            ${i.length ? w`<w3m-connect-multi-chain-widget
                  tabIdx=${D(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>` : null}
            ${n.length ? w`<w3m-connect-announced-widget
                  tabIdx=${D(this.tabIdx)}
                ></w3m-connect-announced-widget>` : null}
            ${r.length ? w`<w3m-connect-injected-widget
                  .connectors=${r}
                  tabIdx=${D(this.tabIdx)}
                ></w3m-connect-injected-widget>` : null}
          `;
				case "walletConnect": return w`<w3m-connect-walletconnect-widget
            tabIdx=${D(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;
				case "recent": return w`<w3m-connect-recent-widget
            tabIdx=${D(this.tabIdx)}
          ></w3m-connect-recent-widget>`;
				case "featured": return w`<w3m-connect-featured-widget
            .wallets=${o}
            tabIdx=${D(this.tabIdx)}
          ></w3m-connect-featured-widget>`;
				case "custom": return w`<w3m-connect-custom-widget
            tabIdx=${D(this.tabIdx)}
          ></w3m-connect-custom-widget>`;
				case "external": return w`<w3m-connect-external-widget
            tabIdx=${D(this.tabIdx)}
          ></w3m-connect-external-widget>`;
				case "recommended": return w`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${D(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;
				default: return console.warn(`Unknown connector type: ${e}`), null;
			}
		});
	}
};
er.styles = Qn, $n([k()], er.prototype, "tabIdx", void 0), $n([O()], er.prototype, "connectors", void 0), $n([O()], er.prototype, "recommended", void 0), $n([O()], er.prototype, "featured", void 0), er = $n([i("w3m-connector-list")], er);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-login-list/index.js
var tr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, nr = class extends E {
	constructor() {
		super(...arguments), this.tabIdx = void 0;
	}
	render() {
		return w`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${D(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${D(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `;
	}
};
tr([k()], nr.prototype, "tabIdx", void 0), nr = tr([i("w3m-wallet-login-list")], nr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-view/styles.js
var rr = T`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`, Z = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ir = 470, Q = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.connectors = b.state.connectors, this.authConnector = this.connectors.find((e) => e.type === "AUTH"), this.features = u.state.features, this.remoteFeatures = u.state.remoteFeatures, this.enableWallets = u.state.enableWallets, this.noAdapters = v.state.noAdapters, this.walletGuide = "get-started", this.checked = fe.state.isLegalCheckboxChecked, this.isEmailEnabled = this.remoteFeatures?.email && !v.state.noAdapters, this.isSocialEnabled = this.remoteFeatures?.socials && this.remoteFeatures.socials.length > 0 && !v.state.noAdapters, this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors), this.unsubscribe.push(b.subscribeKey("connectors", (e) => {
			this.connectors = e, this.authConnector = this.connectors.find((e) => e.type === "AUTH"), this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
		}), u.subscribeKey("features", (e) => {
			this.features = e;
		}), u.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e, this.setEmailAndSocialEnableCheck(this.noAdapters, this.remoteFeatures);
		}), u.subscribeKey("enableWallets", (e) => this.enableWallets = e), v.subscribeKey("noAdapters", (e) => this.setEmailAndSocialEnableCheck(e, this.remoteFeatures)), fe.subscribeKey("isLegalCheckboxChecked", (e) => this.checked = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), this.resizeObserver?.disconnect(), (this.shadowRoot?.querySelector(".connect"))?.removeEventListener("scroll", this.handleConnectListScroll.bind(this));
	}
	firstUpdated() {
		let e = this.shadowRoot?.querySelector(".connect");
		e && (requestAnimationFrame(this.handleConnectListScroll.bind(this)), e?.addEventListener("scroll", this.handleConnectListScroll.bind(this)), this.resizeObserver = new ResizeObserver(() => {
			this.handleConnectListScroll();
		}), this.resizeObserver?.observe(e), this.handleConnectListScroll());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = u.state, n = u.state.features?.legalCheckbox, r = !!(e || t) && !!n && this.walletGuide === "get-started" && !this.checked, i = {
			connect: !0,
			disabled: r
		}, a = u.state.enableWalletGuide, o = this.enableWallets, s = this.isSocialEnabled || this.authConnector, c = r ? -1 : void 0;
		return w`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${ge(i)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${s && o && a && this.walletGuide === "get-started" ? [
			"3xs",
			"s",
			"0",
			"s"
		] : [
			"3xs",
			"s",
			"s",
			"s"
		]}
          >
            ${this.renderConnectMethod(c)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(r)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `;
	}
	setEmailAndSocialEnableCheck(e, t) {
		this.isEmailEnabled = t?.email && !e, this.isSocialEnabled = t?.socials && t.socials.length > 0 && !e, this.remoteFeatures = t, this.noAdapters = e;
	}
	checkIfAuthEnabled(e) {
		let t = e.filter((e) => e.type === me.CONNECTOR_TYPE_AUTH).map((e) => e.chain);
		return l.AUTH_CONNECTOR_SUPPORTED_CHAINS.some((e) => t.includes(e));
	}
	renderConnectMethod(e) {
		return w`${le.getConnectOrderMethod(this.features, this.connectors).map((t, n) => {
			switch (t) {
				case "email": return w`${this.emailTemplate(e)} ${this.separatorTemplate(n, "email")}`;
				case "social": return w`${this.socialListTemplate(e)}
          ${this.separatorTemplate(n, "social")}`;
				case "wallet": return w`${this.walletListTemplate(e)}
          ${this.separatorTemplate(n, "wallet")}`;
				default: return null;
			}
		})}`;
	}
	checkMethodEnabled(e) {
		switch (e) {
			case "wallet": return this.enableWallets;
			case "social": return this.isSocialEnabled && this.isAuthEnabled;
			case "email": return this.isEmailEnabled && this.isAuthEnabled;
			default: return null;
		}
	}
	checkIsThereNextMethod(e) {
		let t = le.getConnectOrderMethod(this.features, this.connectors)[e + 1];
		if (t) return this.checkMethodEnabled(t) ? t : this.checkIsThereNextMethod(e + 1);
	}
	separatorTemplate(e, t) {
		let n = this.checkIsThereNextMethod(e), r = this.walletGuide === "explore";
		switch (t) {
			case "wallet": return this.enableWallets && n && !r ? w`<wui-separator data-testid="wui-separator" text="or"></wui-separator>` : null;
			case "email": {
				let e = n === "social";
				return this.isAuthEnabled && this.isEmailEnabled && !e && n ? w`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>` : null;
			}
			case "social": {
				let e = n === "email";
				return this.isAuthEnabled && this.isSocialEnabled && !e && n ? w`<wui-separator data-testid="wui-separator" text="or"></wui-separator>` : null;
			}
			default: return null;
		}
	}
	emailTemplate(e) {
		return !this.isEmailEnabled || !this.isAuthEnabled ? null : w`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${D(e)}
    ></w3m-email-login-widget>`;
	}
	socialListTemplate(e) {
		return !this.isSocialEnabled || !this.isAuthEnabled ? null : w`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${D(e)}
    ></w3m-social-login-widget>`;
	}
	walletListTemplate(e) {
		let t = this.enableWallets, n = this.features?.emailShowWallets === !1, r = this.features?.collapseWallets, i = n || r;
		return !t || (d.isTelegram() && (d.isSafari() || d.isIos()) && h.connectWalletConnect().catch((e) => ({})), this.walletGuide === "explore") ? null : this.isAuthEnabled && (this.isEmailEnabled || this.isSocialEnabled) && i ? w`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${D(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>` : w`<w3m-wallet-login-list tabIdx=${D(e)}></w3m-wallet-login-list>`;
	}
	guideTemplate(e = !1) {
		if (!u.state.enableWalletGuide) return null;
		let t = {
			guide: !0,
			disabled: e
		}, n = e ? -1 : void 0;
		return !this.authConnector && !this.isSocialEnabled ? null : w`
      ${this.walletGuide === "explore" && !v.state.noAdapters ? w`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>` : null}
      <w3m-wallet-guide
        class=${ge(t)}
        tabIdx=${D(n)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `;
	}
	legalCheckboxTemplate() {
		return this.walletGuide === "explore" ? null : w`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`;
	}
	handleConnectListScroll() {
		let e = this.shadowRoot?.querySelector(".connect");
		e && (e.scrollHeight > ir ? (e.style.setProperty("--connect-mask-image", "linear-gradient(\n          to bottom,\n          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,\n          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,\n          black 40px,\n          black calc(100% - 40px),\n          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),\n          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%\n        )"), e.style.setProperty("--connect-scroll--top-opacity", a.interpolate([0, 50], [0, 1], e.scrollTop).toString()), e.style.setProperty("--connect-scroll--bottom-opacity", a.interpolate([0, 50], [0, 1], e.scrollHeight - e.scrollTop - e.offsetHeight).toString())) : (e.style.setProperty("--connect-mask-image", "none"), e.style.setProperty("--connect-scroll--top-opacity", "0"), e.style.setProperty("--connect-scroll--bottom-opacity", "0")));
	}
	onContinueWalletClick() {
		m.push("ConnectWallets");
	}
};
Q.styles = rr, Z([O()], Q.prototype, "connectors", void 0), Z([O()], Q.prototype, "authConnector", void 0), Z([O()], Q.prototype, "features", void 0), Z([O()], Q.prototype, "remoteFeatures", void 0), Z([O()], Q.prototype, "enableWallets", void 0), Z([O()], Q.prototype, "noAdapters", void 0), Z([k()], Q.prototype, "walletGuide", void 0), Z([O()], Q.prototype, "checked", void 0), Z([O()], Q.prototype, "isEmailEnabled", void 0), Z([O()], Q.prototype, "isSocialEnabled", void 0), Z([O()], Q.prototype, "isAuthEnabled", void 0), Q = Z([i("w3m-connect-view")], Q);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-cta-button/styles.js
var ar = T`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`, or = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, sr = class extends E {
	constructor() {
		super(...arguments), this.disabled = !1, this.label = "", this.buttonLabel = "";
	}
	render() {
		return w`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${[
			"1xs",
			"2l",
			"1xs",
			"2l"
		]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `;
	}
};
sr.styles = [
	r,
	e,
	ar
], or([k({ type: Boolean })], sr.prototype, "disabled", void 0), or([k()], sr.prototype, "label", void 0), or([k()], sr.prototype, "buttonLabel", void 0), sr = or([i("wui-cta-button")], sr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-mobile-download-links/styles.js
var cr = T`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`, lr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ur = class extends E {
	constructor() {
		super(...arguments), this.wallet = void 0;
	}
	render() {
		if (!this.wallet) return this.style.display = "none", null;
		let { name: e, app_store: t, play_store: r, chrome_store: i, homepage: a } = this.wallet, o = d.isMobile(), s = d.isIos(), c = d.isAndroid(), ee = [
			t,
			r,
			a,
			i
		].filter(Boolean).length > 1, l = n.getTruncateString({
			string: e,
			charsStart: 12,
			charsEnd: 0,
			truncate: "end"
		});
		return ee && !o ? w`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${() => m.push("Downloads", { wallet: this.wallet })}
        ></wui-cta-button>
      ` : !ee && a ? w`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      ` : t && s ? w`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      ` : r && c ? w`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      ` : (this.style.display = "none", null);
	}
	onAppStore() {
		this.wallet?.app_store && d.openHref(this.wallet.app_store, "_blank");
	}
	onPlayStore() {
		this.wallet?.play_store && d.openHref(this.wallet.play_store, "_blank");
	}
	onHomePage() {
		this.wallet?.homepage && d.openHref(this.wallet.homepage, "_blank");
	}
};
ur.styles = [cr], lr([k({ type: Object })], ur.prototype, "wallet", void 0), ur = lr([i("w3m-mobile-download-links")], ur);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-connecting-widget/styles.js
var dr = T`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`, fr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, $ = class extends E {
	constructor() {
		super(), this.wallet = m.state.data?.wallet, this.connector = m.state.data?.connector, this.timeout = void 0, this.secondaryBtnIcon = "refresh", this.onConnect = void 0, this.onRender = void 0, this.onAutoConnect = void 0, this.isWalletConnect = !0, this.unsubscribe = [], this.imageSrc = x.getWalletImage(this.wallet) ?? x.getConnectorImage(this.connector), this.name = this.wallet?.name ?? this.connector?.name ?? "Wallet", this.isRetrying = !1, this.uri = h.state.wcUri, this.error = h.state.wcError, this.ready = !1, this.showRetry = !1, this.label = void 0, this.secondaryBtnLabel = "Try again", this.secondaryLabel = "Accept connection request in the wallet", this.isLoading = !1, this.isMobile = !1, this.onRetry = void 0, this.unsubscribe.push(h.subscribeKey("wcUri", (e) => {
			this.uri = e, this.isRetrying && this.onRetry && (this.isRetrying = !1, this.onConnect?.());
		}), h.subscribeKey("wcError", (e) => this.error = e)), (d.isTelegram() || d.isSafari()) && d.isIos() && h.state.wcUri && this.onConnect?.();
	}
	firstUpdated() {
		this.onAutoConnect?.(), this.showRetry = !this.onAutoConnect;
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), h.setWcError(!1), clearTimeout(this.timeout);
	}
	render() {
		this.onRender?.(), this.onShowRetry();
		let e = this.error ? "Connection can be declined if a previous request is still active" : this.secondaryLabel, t = "";
		return this.label ? t = this.label : (t = `Continue in ${this.name}`, this.error && (t = "Connection declined")), w`
      <wui-flex
        data-error=${D(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"3xl",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${D(this.imageSrc)}></wui-wallet-image>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text
            align="center"
            variant="paragraph-500"
            color=${this.error ? "error-100" : "fg-100"}
          >
            ${t}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel ? w`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying || this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            ` : null}
      </wui-flex>

      ${this.isWalletConnect ? w`
            <wui-flex .padding=${[
			"0",
			"xl",
			"xl",
			"xl"
		]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          ` : null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
	}
	onShowRetry() {
		this.error && !this.showRetry && (this.showRetry = !0, (this.shadowRoot?.querySelector("wui-button"))?.animate([{ opacity: 0 }, { opacity: 1 }], {
			fill: "forwards",
			easing: "ease"
		}));
	}
	onTryAgain() {
		h.setWcError(!1), this.onRetry ? (this.isRetrying = !0, this.onRetry?.()) : this.onConnect?.();
	}
	loaderTemplate() {
		let e = oe.state.themeVariables["--w3m-border-radius-master"];
		return w`<wui-loading-thumbnail radius=${(e ? parseInt(e.replace("px", ""), 10) : 4) * 9}></wui-loading-thumbnail>`;
	}
	onCopyUri() {
		try {
			this.uri && (d.copyToClopboard(this.uri), g.showSuccess("Link copied"));
		} catch {
			g.showError("Failed to copy");
		}
	}
};
$.styles = dr, fr([O()], $.prototype, "isRetrying", void 0), fr([O()], $.prototype, "uri", void 0), fr([O()], $.prototype, "error", void 0), fr([O()], $.prototype, "ready", void 0), fr([O()], $.prototype, "showRetry", void 0), fr([O()], $.prototype, "label", void 0), fr([O()], $.prototype, "secondaryBtnLabel", void 0), fr([O()], $.prototype, "secondaryLabel", void 0), fr([O()], $.prototype, "isLoading", void 0), fr([k({ type: Boolean })], $.prototype, "isMobile", void 0), fr([k()], $.prototype, "onRetry", void 0);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-external-view/index.js
var pr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, mr = class extends $ {
	constructor() {
		if (super(), this.externalViewUnsubscribe = [], this.connectionsByNamespace = h.getConnections(this.connector?.chain), this.hasMultipleConnections = this.connectionsByNamespace.length > 0, this.remoteFeatures = u.state.remoteFeatures, this.currentActiveConnectorId = b.state.activeConnectorIds[this.connector?.chain], !this.connector) throw Error("w3m-connecting-view: No connector provided");
		let e = this.connector?.chain;
		this.isAlreadyConnected(this.connector) && (this.secondaryBtnLabel = void 0, this.label = `This account is already linked, change your account in ${this.connector.name}`, this.secondaryLabel = `To link a new account, open ${this.connector.name} and switch to the account you want to link`), p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.connector.name ?? "Unknown",
				platform: "browser",
				displayIndex: this.wallet?.display_index
			}
		}), this.onConnect = this.onConnectProxy.bind(this), this.onAutoConnect = this.onConnectProxy.bind(this), this.isWalletConnect = !1, this.externalViewUnsubscribe.push(b.subscribeKey("activeConnectorIds", (t) => {
			let n = t[e], r = this.remoteFeatures?.multiWallet;
			n !== this.currentActiveConnectorId && (this.hasMultipleConnections && r ? (m.replace("ProfileWallets"), g.showSuccess("New Wallet Added")) : y.close());
		}), h.subscribeKey("connections", this.onConnectionsChange.bind(this)));
	}
	disconnectedCallback() {
		this.externalViewUnsubscribe.forEach((e) => e());
	}
	async onConnectProxy() {
		try {
			if (this.error = !1, this.connector) {
				if (this.isAlreadyConnected(this.connector)) return;
				(this.connector.id !== l.CONNECTOR_ID.COINBASE_SDK || !this.error) && (await h.connectExternal(this.connector, this.connector.chain), p.sendEvent({
					type: "track",
					event: "CONNECT_SUCCESS",
					properties: {
						method: "browser",
						name: this.connector.name || "Unknown"
					}
				}));
			}
		} catch (e) {
			p.sendEvent({
				type: "track",
				event: "CONNECT_ERROR",
				properties: { message: e?.message ?? "Unknown" }
			}), this.error = !0;
		}
	}
	onConnectionsChange(e) {
		if (this.connector?.chain && e.get(this.connector.chain) && this.isAlreadyConnected(this.connector)) {
			let t = e.get(this.connector.chain) ?? [], n = this.remoteFeatures?.multiWallet;
			if (t.length === 0) m.replace("Connect");
			else {
				let e = ie.getConnectionsByConnectorId(this.connectionsByNamespace, this.connector.id).flatMap((e) => e.accounts), r = ie.getConnectionsByConnectorId(t, this.connector.id).flatMap((e) => e.accounts);
				r.length === 0 ? this.hasMultipleConnections && n ? (m.replace("ProfileWallets"), g.showSuccess("Wallet deleted")) : y.close() : !e.every((e) => r.some((t) => C.isLowerCaseMatch(e.address, t.address))) && n && m.replace("ProfileWallets");
			}
		}
	}
	isAlreadyConnected(e) {
		return !!e && this.connectionsByNamespace.some((t) => C.isLowerCaseMatch(t.connectorId, e.id));
	}
};
mr = pr([i("w3m-connecting-external-view")], mr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-multi-chain-view/styles.js
var hr = T`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`, gr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, _r = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.activeConnector = b.state.activeConnector, this.unsubscribe.push(b.subscribeKey("activeConnector", (e) => this.activeConnector = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"m",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${D(x.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${[
			"0",
			"s",
			"0",
			"s"
		]}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${[
			"xs",
			"0",
			"xs",
			"0"
		]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `;
	}
	networksTemplate() {
		return this.activeConnector?.connectors?.map((e) => e.name ? w`
            <wui-list-wallet
              imageSrc=${D(x.getChainImage(e.chain))}
              name=${l.CHAIN_NAME_MAP[e.chain]}
              @click=${() => this.onConnector(e)}
              data-testid="wui-list-chain-${e.chain}"
            ></wui-list-wallet>
          ` : null);
	}
	onConnector(e) {
		let t = this.activeConnector?.connectors?.find((t) => t.chain === e.chain);
		if (!t) {
			g.showError("Failed to find connector");
			return;
		}
		t.id === "walletConnect" ? d.isMobile() ? m.push("AllWallets") : m.push("ConnectingWalletConnect") : m.push("ConnectingExternal", { connector: t });
	}
};
_r.styles = hr, gr([O()], _r.prototype, "activeConnector", void 0), _r = gr([i("w3m-connecting-multi-chain-view")], _r);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-header/index.js
var vr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, yr = class extends E {
	constructor() {
		super(...arguments), this.platformTabs = [], this.unsubscribe = [], this.platforms = [], this.onSelectPlatfrom = void 0;
	}
	disconnectCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      <wui-flex justifyContent="center" .padding=${[
			"0",
			"0",
			"l",
			"0"
		]}>
        <wui-tabs .tabs=${this.generateTabs()} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `;
	}
	generateTabs() {
		let e = this.platforms.map((e) => e === "browser" ? {
			label: "Browser",
			icon: "extension",
			platform: "browser"
		} : e === "mobile" ? {
			label: "Mobile",
			icon: "mobile",
			platform: "mobile"
		} : e === "qrcode" ? {
			label: "Mobile",
			icon: "mobile",
			platform: "qrcode"
		} : e === "web" ? {
			label: "Webapp",
			icon: "browser",
			platform: "web"
		} : e === "desktop" ? {
			label: "Desktop",
			icon: "desktop",
			platform: "desktop"
		} : {
			label: "Browser",
			icon: "extension",
			platform: "unsupported"
		});
		return this.platformTabs = e.map(({ platform: e }) => e), e;
	}
	onTabChange(e) {
		let t = this.platformTabs[e];
		t && this.onSelectPlatfrom?.(t);
	}
};
vr([k({ type: Array })], yr.prototype, "platforms", void 0), vr([k()], yr.prototype, "onSelectPlatfrom", void 0), yr = vr([i("w3m-connecting-header")], yr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-browser/index.js
var br = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, xr = class extends $ {
	constructor() {
		if (super(), !this.wallet) throw Error("w3m-connecting-wc-browser: No wallet provided");
		this.onConnect = this.onConnectProxy.bind(this), this.onAutoConnect = this.onConnectProxy.bind(this), p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.wallet.name,
				platform: "browser",
				displayIndex: this.wallet?.display_index
			}
		});
	}
	async onConnectProxy() {
		try {
			this.error = !1;
			let { connectors: e } = b.state, t = e.find((e) => e.type === "ANNOUNCED" && e.info?.rdns === this.wallet?.rdns || e.type === "INJECTED" || e.name === this.wallet?.name);
			if (t) await h.connectExternal(t, t.chain);
			else throw Error("w3m-connecting-wc-browser: No connector found");
			y.close(), p.sendEvent({
				type: "track",
				event: "CONNECT_SUCCESS",
				properties: {
					method: "browser",
					name: this.wallet?.name || "Unknown"
				}
			});
		} catch (e) {
			p.sendEvent({
				type: "track",
				event: "CONNECT_ERROR",
				properties: { message: e?.message ?? "Unknown" }
			}), this.error = !0;
		}
	}
};
xr = br([i("w3m-connecting-wc-browser")], xr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-desktop/index.js
var Sr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Cr = class extends $ {
	constructor() {
		if (super(), !this.wallet) throw Error("w3m-connecting-wc-desktop: No wallet provided");
		this.onConnect = this.onConnectProxy.bind(this), this.onRender = this.onRenderProxy.bind(this), p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.wallet.name,
				platform: "desktop",
				displayIndex: this.wallet?.display_index
			}
		});
	}
	onRenderProxy() {
		!this.ready && this.uri && (this.ready = !0, this.onConnect?.());
	}
	onConnectProxy() {
		if (this.wallet?.desktop_link && this.uri) try {
			this.error = !1;
			let { desktop_link: e, name: t } = this.wallet, { redirect: n, href: r } = d.formatNativeUrl(e, this.uri);
			h.setWcLinking({
				name: t,
				href: r
			}), h.setRecentWallet(this.wallet), d.openHref(n, "_blank");
		} catch {
			this.error = !0;
		}
	}
};
Cr = Sr([i("w3m-connecting-wc-desktop")], Cr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-mobile/index.js
var wr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Tr = class extends $ {
	constructor() {
		if (super(), this.btnLabelTimeout = void 0, this.redirectDeeplink = void 0, this.redirectUniversalLink = void 0, this.target = void 0, this.preferUniversalLinks = u.state.experimental_preferUniversalLinks, this.isLoading = !0, this.onConnect = () => {
			if (this.wallet?.mobile_link && this.uri) try {
				this.error = !1;
				let { mobile_link: e, link_mode: t, name: n } = this.wallet, { redirect: r, redirectUniversalLink: i, href: a } = d.formatNativeUrl(e, this.uri, t);
				this.redirectDeeplink = r, this.redirectUniversalLink = i, this.target = d.isIframe() ? "_top" : "_self", h.setWcLinking({
					name: n,
					href: a
				}), h.setRecentWallet(this.wallet), this.preferUniversalLinks && this.redirectUniversalLink ? d.openHref(this.redirectUniversalLink, this.target) : d.openHref(this.redirectDeeplink, this.target);
			} catch (e) {
				p.sendEvent({
					type: "track",
					event: "CONNECT_PROXY_ERROR",
					properties: {
						message: e instanceof Error ? e.message : "Error parsing the deeplink",
						uri: this.uri,
						mobile_link: this.wallet.mobile_link,
						name: this.wallet.name
					}
				}), this.error = !0;
			}
		}, !this.wallet) throw Error("w3m-connecting-wc-mobile: No wallet provided");
		this.secondaryBtnLabel = "Open", this.secondaryLabel = c.CONNECT_LABELS.MOBILE, this.secondaryBtnIcon = "externalLink", this.onHandleURI(), this.unsubscribe.push(h.subscribeKey("wcUri", () => {
			this.onHandleURI();
		})), p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.wallet.name,
				platform: "mobile",
				displayIndex: this.wallet?.display_index
			}
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), clearTimeout(this.btnLabelTimeout);
	}
	onHandleURI() {
		this.isLoading = !this.uri, !this.ready && this.uri && (this.ready = !0, this.onConnect?.());
	}
	onTryAgain() {
		h.setWcError(!1), this.onConnect?.();
	}
};
wr([O()], Tr.prototype, "redirectDeeplink", void 0), wr([O()], Tr.prototype, "redirectUniversalLink", void 0), wr([O()], Tr.prototype, "target", void 0), wr([O()], Tr.prototype, "preferUniversalLinks", void 0), wr([O()], Tr.prototype, "isLoading", void 0), Tr = wr([i("w3m-connecting-wc-mobile")], Tr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-qrcode/styles.js
var Er = T`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`, Dr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Or = class extends $ {
	constructor() {
		super(), this.forceUpdate = () => {
			this.requestUpdate();
		}, window.addEventListener("resize", this.forceUpdate), p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.wallet?.name ?? "WalletConnect",
				platform: "qrcode",
				displayIndex: this.wallet?.display_index
			}
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.forEach((e) => e()), window.removeEventListener("resize", this.forceUpdate);
	}
	render() {
		return this.onRenderProxy(), w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"0",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
	}
	onRenderProxy() {
		!this.ready && this.uri && (this.timeout = setTimeout(() => {
			this.ready = !0;
		}, 200));
	}
	qrCodeTemplate() {
		if (!this.uri || !this.ready) return null;
		let e = this.getBoundingClientRect().width - 40, t = this.wallet ? this.wallet.name : void 0;
		return h.setWcLinking(void 0), h.setRecentWallet(this.wallet), w` <wui-qr-code
      size=${e}
      theme=${oe.state.themeMode}
      uri=${this.uri}
      imageSrc=${D(x.getWalletImage(this.wallet))}
      color=${D(oe.state.themeVariables["--w3m-qr-color"])}
      alt=${D(t)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`;
	}
	copyTemplate() {
		return w`<wui-link
      .disabled=${!this.uri || !this.ready}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
	}
};
Or.styles = Er, Or = Dr([i("w3m-connecting-wc-qrcode")], Or);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-unsupported/index.js
var kr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ar = class extends E {
	constructor() {
		if (super(), this.wallet = m.state.data?.wallet, !this.wallet) throw Error("w3m-connecting-wc-unsupported: No wallet provided");
		p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.wallet.name,
				platform: "browser",
				displayIndex: this.wallet?.display_index
			}
		});
	}
	render() {
		return w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"3xl",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${D(x.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
	}
};
Ar = kr([i("w3m-connecting-wc-unsupported")], Ar);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-web/index.js
var jr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Mr = class extends $ {
	constructor() {
		if (super(), this.isLoading = !0, !this.wallet) throw Error("w3m-connecting-wc-web: No wallet provided");
		this.onConnect = this.onConnectProxy.bind(this), this.secondaryBtnLabel = "Open", this.secondaryLabel = c.CONNECT_LABELS.MOBILE, this.secondaryBtnIcon = "externalLink", this.updateLoadingState(), this.unsubscribe.push(h.subscribeKey("wcUri", () => {
			this.updateLoadingState();
		})), p.sendEvent({
			type: "track",
			event: "SELECT_WALLET",
			properties: {
				name: this.wallet.name,
				platform: "web",
				displayIndex: this.wallet?.display_index
			}
		});
	}
	updateLoadingState() {
		this.isLoading = !this.uri;
	}
	onConnectProxy() {
		if (this.wallet?.webapp_link && this.uri) try {
			this.error = !1;
			let { webapp_link: e, name: t } = this.wallet, { redirect: n, href: r } = d.formatUniversalUrl(e, this.uri);
			h.setWcLinking({
				name: t,
				href: r
			}), h.setRecentWallet(this.wallet), d.openHref(n, "_blank");
		} catch {
			this.error = !0;
		}
	}
};
jr([O()], Mr.prototype, "isLoading", void 0), Mr = jr([i("w3m-connecting-wc-web")], Mr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-wc-view/index.js
var Nr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Pr = class extends E {
	constructor() {
		super(), this.wallet = m.state.data?.wallet, this.unsubscribe = [], this.platform = void 0, this.platforms = [], this.isSiwxEnabled = !!u.state.siwx, this.remoteFeatures = u.state.remoteFeatures, this.displayBranding = !0, this.determinePlatforms(), this.initializeConnection(), this.unsubscribe.push(u.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `;
	}
	reownBrandingTemplate() {
		return !this.remoteFeatures?.reownBranding || !this.displayBranding ? null : w`<wui-ux-by-reown></wui-ux-by-reown>`;
	}
	async initializeConnection(e = !1) {
		if (!(this.platform === "browser" || u.state.manualWCControl && !e)) try {
			let { wcPairingExpiry: t, status: n } = h.state;
			if (e || u.state.enableEmbedded || d.isPairingExpired(t) || n === "connecting") {
				let e = h.getConnections(v.state.activeChain), t = this.remoteFeatures?.multiWallet, n = e.length > 0;
				await h.connectWalletConnect({ cache: "never" }), this.isSiwxEnabled || (n && t ? (m.replace("ProfileWallets"), g.showSuccess("New Wallet Added")) : y.close());
			}
		} catch (e) {
			if (e instanceof Error && e.message.includes("An error occurred when attempting to switch chain") && !u.state.enableNetworkSwitch && v.state.activeChain) {
				v.setActiveCaipNetwork(ue.getUnsupportedNetwork(`${v.state.activeChain}:${v.state.activeCaipNetwork?.id}`)), v.showUnsupportedChainUI();
				return;
			}
			p.sendEvent({
				type: "track",
				event: "CONNECT_ERROR",
				properties: { message: e?.message ?? "Unknown" }
			}), h.setWcError(!0), g.showError(e.message ?? "Connection error"), h.resetWcConnection(), m.goBack();
		}
	}
	determinePlatforms() {
		if (!this.wallet) {
			this.platforms.push("qrcode"), this.platform = "qrcode";
			return;
		}
		if (this.platform) return;
		let { mobile_link: e, desktop_link: t, webapp_link: n, injected: r, rdns: i } = this.wallet, a = r?.map(({ injected_id: e }) => e).filter(Boolean), o = [...i ? [i] : a ?? []], s = u.state.isUniversalProvider ? !1 : o.length, c = e, ee = n, l = h.checkInstalled(o), f = s && l, p = t && !d.isMobile();
		f && !v.state.noAdapters && this.platforms.push("browser"), c && this.platforms.push(d.isMobile() ? "mobile" : "qrcode"), ee && this.platforms.push("web"), p && this.platforms.push("desktop"), !f && s && !v.state.noAdapters && this.platforms.push("unsupported"), this.platform = this.platforms[0];
	}
	platformTemplate() {
		switch (this.platform) {
			case "browser": return w`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;
			case "web": return w`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;
			case "desktop": return w`
          <w3m-connecting-wc-desktop .onRetry=${() => this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;
			case "mobile": return w`
          <w3m-connecting-wc-mobile isMobile .onRetry=${() => this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;
			case "qrcode": return w`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;
			default: return w`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`;
		}
	}
	headerTemplate() {
		return this.platforms.length > 1 ? w`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    ` : null;
	}
	async onSelectPlatform(e) {
		let t = this.shadowRoot?.querySelector("div");
		t && (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}).finished, this.platform = e, t.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 200,
			fill: "forwards",
			easing: "ease"
		}));
	}
};
Nr([O()], Pr.prototype, "platform", void 0), Nr([O()], Pr.prototype, "platforms", void 0), Nr([O()], Pr.prototype, "isSiwxEnabled", void 0), Nr([O()], Pr.prototype, "remoteFeatures", void 0), Nr([k({ type: Boolean })], Pr.prototype, "displayBranding", void 0), Pr = Nr([i("w3m-connecting-wc-view")], Pr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-wc-basic-view/index.js
var Fr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ir = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.isMobile = d.isMobile(), this.remoteFeatures = u.state.remoteFeatures, this.unsubscribe.push(u.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		if (this.isMobile) {
			let { featured: e, recommended: t } = S.state, { customWallets: n } = u.state, r = f.getRecentWallets();
			return w`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${[
				"3xs",
				"s",
				"s",
				"s"
			]}
      >
        ${e.length || t.length || n?.length || r.length ? w`<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
		}
		return w`<wui-flex flexDirection="column" .padding=${[
			"0",
			"0",
			"l",
			"0"
		]}>
        <w3m-connecting-wc-view .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${[
			"0",
			"m",
			"0",
			"m"
		]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `;
	}
	reownBrandingTemplate() {
		return this.remoteFeatures?.reownBranding ? w` <wui-flex flexDirection="column" .padding=${[
			"3xs",
			"0",
			"3xs",
			"0"
		]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>` : null;
	}
};
Fr([O()], Ir.prototype, "isMobile", void 0), Fr([O()], Ir.prototype, "remoteFeatures", void 0), Ir = Fr([i("w3m-connecting-wc-basic-view")], Ir);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-choose-account-name-view/styles.js
var Lr = T`
  .continue-button-container {
    width: 100%;
  }
`, Rr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, zr = class extends E {
	constructor() {
		super(...arguments), this.loading = !1;
	}
	render() {
		return w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${[
			"0",
			"0",
			"l",
			"0"
		]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
			d.openHref(se.URLS.FAQ, "_blank");
		}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
	}
	onboardingTemplate() {
		return w` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${[
			"0",
			"xxl",
			"0",
			"xxl"
		]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`;
	}
	buttonsTemplate() {
		return w`<wui-flex
      .padding=${[
			"0",
			"2l",
			"0",
			"2l"
		]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`;
	}
	handleContinue() {
		m.push("RegisterAccountName"), p.sendEvent({
			type: "track",
			event: "OPEN_ENS_FLOW",
			properties: { isSmartAccount: ne(v.state.activeChain) === o.ACCOUNT_TYPES.SMART_ACCOUNT }
		});
	}
};
zr.styles = Lr, Rr([O()], zr.prototype, "loading", void 0), zr = Rr([i("w3m-choose-account-name-view")], zr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-downloads-view/index.js
var Br = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Vr = class extends E {
	constructor() {
		super(...arguments), this.wallet = m.state.data?.wallet;
	}
	render() {
		if (!this.wallet) throw Error("w3m-downloads-view");
		return w`
      <wui-flex gap="xs" flexDirection="column" .padding=${[
			"s",
			"s",
			"l",
			"s"
		]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
	}
	chromeTemplate() {
		return this.wallet?.chrome_store ? w`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>` : null;
	}
	iosTemplate() {
		return this.wallet?.app_store ? w`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>` : null;
	}
	androidTemplate() {
		return this.wallet?.play_store ? w`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>` : null;
	}
	homepageTemplate() {
		return this.wallet?.homepage ? w`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    ` : null;
	}
	onChromeStore() {
		this.wallet?.chrome_store && d.openHref(this.wallet.chrome_store, "_blank");
	}
	onAppStore() {
		this.wallet?.app_store && d.openHref(this.wallet.app_store, "_blank");
	}
	onPlayStore() {
		this.wallet?.play_store && d.openHref(this.wallet.play_store, "_blank");
	}
	onHomePage() {
		this.wallet?.homepage && d.openHref(this.wallet.homepage, "_blank");
	}
};
Vr = Br([i("w3m-downloads-view")], Vr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-get-wallet-view/index.js
var Hr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ur = "https://walletconnect.com/explorer", Wr = class extends E {
	render() {
		return w`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"s",
			"s",
			"s"
		]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${() => {
			d.openHref("https://walletconnect.com/explorer?type=wallet", "_blank");
		}}
        ></wui-list-wallet>
      </wui-flex>
    `;
	}
	recommendedWalletsTemplate() {
		let { recommended: e, featured: t } = S.state, { customWallets: n } = u.state;
		return [
			...t,
			...n ?? [],
			...e
		].slice(0, 4).map((e) => w`
        <wui-list-wallet
          name=${e.name ?? "Unknown"}
          tagVariant="main"
          imageSrc=${D(x.getWalletImage(e))}
          @click=${() => {
			d.openHref(e.homepage ?? Ur, "_blank");
		}}
        ></wui-list-wallet>
      `);
	}
};
Wr = Hr([i("w3m-get-wallet-view")], Wr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-help-widget/index.js
var Gr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Kr = class extends E {
	constructor() {
		super(...arguments), this.data = [];
	}
	render() {
		return w`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map((e) => w`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map((e) => w`<wui-visual name=${e}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `;
	}
};
Gr([k({ type: Array })], Kr.prototype, "data", void 0), Kr = Gr([i("w3m-help-widget")], Kr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-what-is-a-wallet-view/index.js
var qr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Jr = [
	{
		images: [
			"login",
			"profile",
			"lock"
		],
		title: "One login for all of web3",
		text: "Log in to any app by connecting your wallet. Say goodbye to countless passwords!"
	},
	{
		images: [
			"defi",
			"nft",
			"eth"
		],
		title: "A home for your digital assets",
		text: "A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."
	},
	{
		images: [
			"browser",
			"noun",
			"dao"
		],
		title: "Your gateway to a new web",
		text: "With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."
	}
], Yr = class extends E {
	render() {
		return w`
      <wui-flex
        flexDirection="column"
        .padding=${[
			"xxl",
			"xl",
			"xl",
			"xl"
		]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Jr}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `;
	}
	onGetWallet() {
		p.sendEvent({
			type: "track",
			event: "CLICK_GET_WALLET"
		}), m.push("GetWallet");
	}
};
Yr = qr([i("w3m-what-is-a-wallet-view")], Yr);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-wallets-view/styles.js
var Xr = T`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`, Zr = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Qr = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.checked = fe.state.isLegalCheckboxChecked, this.unsubscribe.push(fe.subscribeKey("isLegalCheckboxChecked", (e) => {
			this.checked = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = u.state, n = u.state.features?.legalCheckbox, r = !!(e || t) && !!n, i = r && !this.checked, a = i ? -1 : void 0;
		return w`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${r ? [
			"0",
			"s",
			"s",
			"s"
		] : "s"}
        gap="xs"
        class=${D(i ? "disabled" : void 0)}
      >
        <w3m-wallet-login-list tabIdx=${D(a)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
	}
};
Qr.styles = Xr, Zr([O()], Qr.prototype, "checked", void 0), Qr = Zr([i("w3m-connect-wallets-view")], Qr);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-hexagon/styles.js
var $r = T`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`, ei = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ti = class extends E {
	render() {
		return w`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `;
	}
};
ti.styles = [r, $r], ti = ei([i("wui-loading-hexagon")], ti);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-network-switch-view/styles.js
var ni = T`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`, ri = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ii = class extends E {
	constructor() {
		super(), this.network = m.state.data?.network, this.unsubscribe = [], this.showRetry = !1, this.error = !1;
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	firstUpdated() {
		this.onSwitchNetwork();
	}
	render() {
		if (!this.network) throw Error("w3m-network-switch-view: No network provided");
		this.onShowRetry();
		let e = this.getLabel(), t = this.getSubLabel();
		return w`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"3xl",
			"xl",
			"3xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${D(x.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error ? null : w`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `;
	}
	getSubLabel() {
		let e = b.getConnectorId(v.state.activeChain);
		return b.getAuthConnector() && e === l.CONNECTOR_ID.AUTH ? "" : this.error ? "Switch can be declined if chain is not supported by a wallet or previous request is still active" : "Accept connection request in your wallet";
	}
	getLabel() {
		let e = b.getConnectorId(v.state.activeChain);
		return b.getAuthConnector() && e === l.CONNECTOR_ID.AUTH ? `Switching to ${this.network?.name ?? "Unknown"} network...` : this.error ? "Switch declined" : "Approve in wallet";
	}
	onShowRetry() {
		this.error && !this.showRetry && (this.showRetry = !0, (this.shadowRoot?.querySelector("wui-button"))?.animate([{ opacity: 0 }, { opacity: 1 }], {
			fill: "forwards",
			easing: "ease"
		}));
	}
	async onSwitchNetwork() {
		try {
			this.error = !1, v.state.activeChain !== this.network?.chainNamespace && v.setIsSwitchingNamespace(!0), this.network && await v.switchActiveNetwork(this.network);
		} catch {
			this.error = !0;
		}
	}
};
ii.styles = ni, ri([O()], ii.prototype, "showRetry", void 0), ri([O()], ii.prototype, "error", void 0), ii = ri([i("w3m-network-switch-view")], ii);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-network/styles.js
var ai = T`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`, oi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, si = class extends E {
	constructor() {
		super(...arguments), this.imageSrc = "", this.name = "", this.disabled = !1, this.selected = !1, this.transparent = !1;
	}
	render() {
		return w`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `;
	}
	checkmarkTemplate() {
		return this.selected ? w`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>` : null;
	}
	templateNetworkImage() {
		return this.imageSrc ? w`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>` : this.imageSrc ? null : w`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`;
	}
};
si.styles = [
	r,
	e,
	ai
], oi([k()], si.prototype, "imageSrc", void 0), oi([k()], si.prototype, "name", void 0), oi([k({ type: Boolean })], si.prototype, "disabled", void 0), oi([k({ type: Boolean })], si.prototype, "selected", void 0), oi([k({ type: Boolean })], si.prototype, "transparent", void 0), si = oi([i("wui-list-network")], si);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-networks-view/styles.js
var ci = T`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`, li = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ui = class extends E {
	constructor() {
		super(), this.unsubscribe = [], this.network = v.state.activeCaipNetwork, this.requestedCaipNetworks = v.getCaipNetworks(), this.search = "", this.onDebouncedSearch = d.debounce((e) => {
			this.search = e;
		}, 100), this.unsubscribe.push(te.subscribeNetworkImages(() => this.requestUpdate()), v.subscribeKey("activeCaipNetwork", (e) => this.network = e), v.subscribe(() => {
			this.requestedCaipNetworks = v.getAllRequestedCaipNetworks();
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `;
	}
	templateSearchInput() {
		return w`
      <wui-flex gap="xs" .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
	}
	onInputChange(e) {
		this.onDebouncedSearch(e.detail);
	}
	onNetworkHelp() {
		p.sendEvent({
			type: "track",
			event: "CLICK_NETWORK_HELP"
		}), m.push("WhatIsANetwork");
	}
	networksTemplate() {
		let e = v.getAllApprovedCaipNetworkIds(), t = d.sortRequestedNetworks(e, this.requestedCaipNetworks);
		return this.search ? this.filteredNetworks = t?.filter((e) => e?.name?.toLowerCase().includes(this.search.toLowerCase())) : this.filteredNetworks = t, this.filteredNetworks?.map((e) => w`
        <wui-list-network
          .selected=${this.network?.id === e.id}
          imageSrc=${D(x.getNetworkImage(e))}
          type="network"
          name=${e.name ?? e.id}
          @click=${() => this.onSwitchNetwork(e)}
          .disabled=${this.getNetworkDisabled(e)}
          data-testid=${`w3m-network-switch-${e.name ?? e.id}`}
        ></wui-list-network>
      `);
	}
	getNetworkDisabled(e) {
		let t = e.chainNamespace, n = _.getCaipAddress(t), r = v.getAllApprovedCaipNetworkIds(), i = v.getNetworkProp("supportsAllNetworks", t) !== !1, a = b.getConnectorId(t), o = b.getAuthConnector(), s = a === l.CONNECTOR_ID.AUTH && o;
		return !n || i || s ? !1 : !r?.includes(e.caipNetworkId);
	}
	onSwitchNetwork(e) {
		ae.onSwitchNetwork({ network: e });
	}
};
ui.styles = ci, li([O()], ui.prototype, "network", void 0), li([O()], ui.prototype, "requestedCaipNetworks", void 0), li([O()], ui.prototype, "filteredNetworks", void 0), li([O()], ui.prototype, "search", void 0), ui = li([i("w3m-networks-view")], ui);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-switch-active-chain-view/styles.js
var di = T`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }

  .capitalize {
    text-transform: capitalize;
  }
`, fi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, pi = {
	eip155: "eth",
	solana: "solana",
	bip122: "bitcoin",
	polkadot: void 0
}, mi = class extends E {
	constructor() {
		super(...arguments), this.unsubscribe = [], this.switchToChain = m.state.data?.switchToChain, this.caipNetwork = m.state.data?.network, this.activeChain = v.state.activeChain;
	}
	firstUpdated() {
		this.unsubscribe.push(v.subscribeKey("activeChain", (e) => this.activeChain = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.switchToChain ? l.CHAIN_NAME_MAP[this.switchToChain] : "supported";
		if (!this.switchToChain) return null;
		let t = l.CHAIN_NAME_MAP[this.switchToChain];
		return w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"3xl",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${D(pi[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${t}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${t}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${e} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `;
	}
	async switchActiveChain() {
		this.switchToChain && (v.setIsSwitchingNamespace(!0), b.setFilterByNamespace(this.switchToChain), this.caipNetwork ? await v.switchActiveNetwork(this.caipNetwork) : v.setActiveNamespace(this.switchToChain), m.reset("Connect"));
	}
};
mi.styles = di, fi([k()], mi.prototype, "activeChain", void 0), mi = fi([i("w3m-switch-active-chain-view")], mi);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-what-is-a-network-view/index.js
var hi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, gi = [{
	images: [
		"network",
		"layers",
		"system"
	],
	title: "The system’s nuts and bolts",
	text: "A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."
}, {
	images: [
		"noun",
		"defiAlt",
		"dao"
	],
	title: "Designed for different uses",
	text: "Each network is designed differently, and may therefore suit certain apps and experiences."
}], _i = class extends E {
	render() {
		return w`
      <wui-flex
        flexDirection="column"
        .padding=${[
			"xxl",
			"xl",
			"xl",
			"xl"
		]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${gi}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${() => {
			d.openHref("https://ethereum.org/en/developers/docs/networks/", "_blank");
		}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
	}
};
_i = hi([i("w3m-what-is-a-network-view")], _i);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-unsupported-chain-view/styles.js
var vi = T`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`, yi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, bi = class extends E {
	constructor() {
		super(), this.swapUnsupportedChain = m.state.data?.swapUnsupportedChain, this.unsubscribe = [], this.disconnecting = !1, this.remoteFeatures = u.state.remoteFeatures, this.unsubscribe.push(te.subscribeNetworkImages(() => this.requestUpdate()), u.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${[
			"m",
			"xl",
			"xs",
			"xl"
		]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
	}
	descriptionTemplate() {
		return this.swapUnsupportedChain ? w`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      ` : w`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `;
	}
	networksTemplate() {
		let e = v.getAllRequestedCaipNetworks(), t = v.getAllApprovedCaipNetworkIds(), n = d.sortRequestedNetworks(t, e);
		return (this.swapUnsupportedChain ? n.filter((e) => c.SWAP_SUPPORTED_NETWORKS.includes(e.caipNetworkId)) : n).map((e) => w`
        <wui-list-network
          imageSrc=${D(x.getNetworkImage(e))}
          name=${e.name ?? "Unknown"}
          @click=${() => this.onSwitchNetwork(e)}
        >
        </wui-list-network>
      `);
	}
	async onDisconnect() {
		try {
			this.disconnecting = !0;
			let e = v.state.activeChain, t = h.getConnections(e).length > 0, n = e && b.state.activeConnectorIds[e], r = this.remoteFeatures?.multiWallet;
			await h.disconnect(r ? {
				id: n,
				namespace: e
			} : {}), t && r && (m.push("ProfileWallets"), g.showSuccess("Wallet deleted"));
		} catch {
			p.sendEvent({
				type: "track",
				event: "DISCONNECT_ERROR",
				properties: { message: "Failed to disconnect" }
			}), g.showError("Failed to disconnect");
		} finally {
			this.disconnecting = !1;
		}
	}
	async onSwitchNetwork(e) {
		let t = _.state.caipAddress, n = v.getAllApprovedCaipNetworkIds();
		v.getNetworkProp("supportsAllNetworks", e.chainNamespace);
		let r = m.state.data;
		t ? n?.includes(e.caipNetworkId) ? await v.switchActiveNetwork(e) : m.push("SwitchNetwork", {
			...r,
			network: e
		}) : t || (v.setActiveCaipNetwork(e), m.push("Connect"));
	}
};
bi.styles = vi, yi([O()], bi.prototype, "disconnecting", void 0), yi([O()], bi.prototype, "remoteFeatures", void 0), bi = yi([i("w3m-unsupported-chain-view")], bi);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-banner/styles.js
var xi = T`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`, Si = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ci = class extends E {
	constructor() {
		super(...arguments), this.icon = "externalLink", this.text = "";
	}
	render() {
		return w`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `;
	}
};
Ci.styles = [
	r,
	e,
	xi
], Si([k()], Ci.prototype, "icon", void 0), Si([k()], Ci.prototype, "text", void 0), Ci = Si([i("wui-banner")], Ci);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-compatible-networks-view/styles.js
var wi = T`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`, Ti = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Ei = class extends E {
	constructor() {
		super(), this.unsubscribe = [];
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return w` <wui-flex
      flexDirection="column"
      .padding=${[
			"xs",
			"s",
			"m",
			"s"
		]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`;
	}
	networkTemplate() {
		let e = v.getAllRequestedCaipNetworks(), t = v.getAllApprovedCaipNetworkIds(), n = v.state.activeCaipNetwork, r = v.checkIfSmartAccountEnabled(), i = d.sortRequestedNetworks(t, e);
		if (r && ne(n?.chainNamespace) === o.ACCOUNT_TYPES.SMART_ACCOUNT) {
			if (!n) return null;
			i = [n];
		}
		return i.filter((e) => e.chainNamespace === n?.chainNamespace).map((e) => w`
        <wui-list-network
          imageSrc=${D(x.getNetworkImage(e))}
          name=${e.name ?? "Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `);
	}
};
Ei.styles = wi, Ei = Ti([i("w3m-wallet-compatible-networks-view")], Ei);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-visual-thumbnail/styles.js
var Di = T`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`, Oi = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, ki = class extends E {
	render() {
		return this.style.cssText = `--local-border-radius: ${this.borderRadiusFull ? "1000px" : "20px"}; background-color: var(--wui-color-modal-bg);`, w`${this.templateVisual()}`;
	}
	templateVisual() {
		return this.imageSrc ? w`<wui-image src=${this.imageSrc} alt=${this.alt ?? ""}></wui-image>` : w`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
	}
};
ki.styles = [r, Di], Oi([k()], ki.prototype, "imageSrc", void 0), Oi([k()], ki.prototype, "alt", void 0), Oi([k({ type: Boolean })], ki.prototype, "borderRadiusFull", void 0), ki = Oi([i("wui-visual-thumbnail")], ki);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-siwx-sign-message-thumbnails/styles.js
var Ai = T`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`, ji = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Mi = class extends E {
	constructor() {
		super(...arguments), this.dappImageUrl = u.state.metadata?.icons, this.walletImageUrl = _.state.connectedWalletInfo?.icon;
	}
	firstUpdated() {
		let e = this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");
		e?.[0] && this.createAnimation(e[0], "translate(18px)"), e?.[1] && this.createAnimation(e[1], "translate(-18px)");
	}
	render() {
		return w`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
	}
	createAnimation(e, t) {
		e.animate([{ transform: "translateX(0px)" }, { transform: t }], {
			duration: 1600,
			easing: "cubic-bezier(0.56, 0, 0.48, 1)",
			direction: "alternate",
			iterations: Infinity
		});
	}
};
Mi.styles = Ai, Mi = ji([i("w3m-siwx-sign-message-thumbnails")], Mi);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-siwx-sign-message-view/index.js
var Ni = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Pi = class extends E {
	constructor() {
		super(...arguments), this.dappName = u.state.metadata?.name, this.isCancelling = !1, this.isSigning = !1;
	}
	render() {
		return w`
      <wui-flex justifyContent="center" .padding=${[
			"2xl",
			"0",
			"xxl",
			"0"
		]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${[
			"0",
			"4xl",
			"l",
			"4xl"
		]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName ?? "Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${[
			"0",
			"3xl",
			"l",
			"3xl"
		]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${[
			"l",
			"xl",
			"xl",
			"xl"
		]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling ? "Cancelling..." : "Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning ? "Signing..." : "Sign"}
        </wui-button>
      </wui-flex>
    `;
	}
	async onSign() {
		this.isSigning = !0;
		try {
			await pe.requestSignMessage();
		} catch (e) {
			if (e instanceof Error && e.message.includes("OTP is required")) {
				g.showError({ message: "Something went wrong. We need to verify your account again." }), m.replace("DataCapture");
				return;
			}
			throw e;
		} finally {
			this.isSigning = !1;
		}
	}
	async onCancel() {
		this.isCancelling = !0, await pe.cancelSignMessage().finally(() => this.isCancelling = !1);
	}
};
Ni([O()], Pi.prototype, "isCancelling", void 0), Ni([O()], Pi.prototype, "isSigning", void 0), Pi = Ni([i("w3m-siwx-sign-message-view")], Pi);
//#endregion
export { Te as AppKitAccountButton, ke as AppKitButton, Ie as AppKitConnectButton, We as AppKitNetworkButton, we as W3mAccountButton, P as W3mAccountSettingsView, Tt as W3mAccountView, ln as W3mAllWalletsView, Oe as W3mButton, zr as W3mChooseAccountNameView, Fe as W3mConnectButton, Q as W3mConnectView, Qr as W3mConnectWalletsView, mr as W3mConnectingExternalView, _r as W3mConnectingMultiChainView, Ir as W3mConnectingWcBasicView, Pr as W3mConnectingWcView, Vr as W3mDownloadsView, Wr as W3mGetWalletView, Ue as W3mNetworkButton, ii as W3mNetworkSwitchView, ui as W3mNetworksView, K as W3mProfileWalletsView, be as W3mRouter, Pi as W3mSIWXSignMessageView, mi as W3mSwitchActiveChainView, bi as W3mUnsupportedChainView, Ei as W3mWalletCompatibleNetworksView, _i as W3mWhatIsANetworkView, Yr as W3mWhatIsAWalletView };
