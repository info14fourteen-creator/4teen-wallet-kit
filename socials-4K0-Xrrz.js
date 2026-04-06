import { t as e } from "./exports-D_wXhA01.js";
import { C as t, F as n, M as r, N as i, P as a, S as o, b as s, d as c, p as l, r as u, s as d, t as f, v as p, y as m } from "./ModalController-DHlkqy_7.js";
import { t as h } from "./w3m-legal-footer-BYlOi615.js";
import { t as g } from "./ErrorUtil-Dik48O9C.js";
import { t as _ } from "./W3mFrameProvider-DIecb6Xz.js";
import { t as v } from "./ConstantsUtil-BluUpxh9.js";
import { i as y, l as b, t as x } from "./lit-CKWVc9vf.js";
import { a as S, o as C, s as w } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-xSC_yRIR.js";
import "./wui-loading-thumbnail-CkvS96N0.js";
import "./wui-link-d0unVgA5.js";
import "./wui-icon-box-Cxv_9O0m.js";
import "./wui-shimmer-Cctp5GZa.js";
import { t as T } from "./wui-list-social-QMRaUXbh.js";
import "./wui-qr-code-B__Ozs2I.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-social-login-list/styles.js
var E = b`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`, D = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, O = class extends x {
	constructor() {
		super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = p.state.connectors, this.authConnector = this.connectors.find((e) => e.type === "AUTH"), this.remoteFeatures = r.state.remoteFeatures, this.isPwaLoading = !1, this.unsubscribe.push(p.subscribeKey("connectors", (e) => {
			this.connectors = e, this.authConnector = this.connectors.find((e) => e.type === "AUTH");
		}), r.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e));
	}
	connectedCallback() {
		super.connectedCallback(), this.handlePwaFrameLoad();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.remoteFeatures?.socials || [], t = !!this.authConnector, r = e?.length, i = s.state.view === "ConnectSocials";
		return (!t || !r) && !i ? null : (i && !r && (e = n.DEFAULT_SOCIALS), y` <wui-flex flexDirection="column" gap="xs">
      ${e.map((e) => y`<wui-list-social
            @click=${() => {
			this.onSocialClick(e);
		}}
            data-testid=${`social-selector-${e}`}
            name=${e}
            logo=${e}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`);
	}
	async onSocialClick(e) {
		e && await T(e);
	}
	async handlePwaFrameLoad() {
		if (i.isPWA()) {
			this.isPwaLoading = !0;
			try {
				this.authConnector?.provider instanceof _ && await this.authConnector.provider.init();
			} catch (e) {
				t.open({
					displayMessage: "Error loading embedded wallet in PWA",
					debugMessage: e.message
				}, "error");
			} finally {
				this.isPwaLoading = !1;
			}
		}
	}
};
O.styles = E, D([w()], O.prototype, "tabIdx", void 0), D([C()], O.prototype, "connectors", void 0), D([C()], O.prototype, "authConnector", void 0), D([C()], O.prototype, "remoteFeatures", void 0), D([C()], O.prototype, "isPwaLoading", void 0), O = D([e("w3m-social-login-list")], O);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-socials-view/styles.js
var k = b`
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
`, A = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, j = class extends x {
	constructor() {
		super(), this.unsubscribe = [], this.checked = h.state.isLegalCheckboxChecked, this.unsubscribe.push(h.subscribeKey("isLegalCheckboxChecked", (e) => {
			this.checked = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = r.state, n = r.state.features?.legalCheckbox, i = !!(e || t) && !!n, a = i && !this.checked, o = a ? -1 : void 0;
		return y`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${i ? [
			"0",
			"s",
			"s",
			"s"
		] : "s"}
        gap="xs"
        class=${S(a ? "disabled" : void 0)}
      >
        <w3m-social-login-list tabIdx=${S(o)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
	}
};
j.styles = k, A([C()], j.prototype, "checked", void 0), j = A([e("w3m-connect-socials-view")], j);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-social-view/styles.js
var M = b`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
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
  .capitalize {
    text-transform: capitalize;
  }
`, N = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, P = class extends x {
	constructor() {
		super(), this.unsubscribe = [], this.socialProvider = u.state.socialProvider, this.socialWindow = u.state.socialWindow, this.error = !1, this.connecting = !1, this.message = "Connect in the provider window", this.remoteFeatures = r.state.remoteFeatures, this.address = u.state.address, this.connectionsByNamespace = c.getConnections(d.state.activeChain), this.hasMultipleConnections = this.connectionsByNamespace.length > 0, this.authConnector = p.getAuthConnector(), this.handleSocialConnection = async (e) => {
			if (e.data?.resultUri) if (e.origin === v.SECURE_SITE_ORIGIN) {
				window.removeEventListener("message", this.handleSocialConnection, !1);
				try {
					if (this.authConnector && !this.connecting) {
						this.socialWindow && (this.socialWindow.close(), u.setSocialWindow(void 0, d.state.activeChain)), this.connecting = !0, this.updateMessage();
						let t = e.data.resultUri;
						this.socialProvider && o.sendEvent({
							type: "track",
							event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
							properties: { provider: this.socialProvider }
						}), await c.connectExternal({
							id: this.authConnector.id,
							type: this.authConnector.type,
							socialUri: t
						}, this.authConnector.chain), this.socialProvider && (a.setConnectedSocialProvider(this.socialProvider), o.sendEvent({
							type: "track",
							event: "SOCIAL_LOGIN_SUCCESS",
							properties: { provider: this.socialProvider }
						}));
					}
				} catch {
					this.error = !0, this.updateMessage(), this.socialProvider && o.sendEvent({
						type: "track",
						event: "SOCIAL_LOGIN_ERROR",
						properties: { provider: this.socialProvider }
					});
				}
			} else s.goBack(), l.showError("Untrusted Origin"), this.socialProvider && o.sendEvent({
				type: "track",
				event: "SOCIAL_LOGIN_ERROR",
				properties: { provider: this.socialProvider }
			});
		}, g.EmbeddedWalletAbortController.signal.addEventListener("abort", () => {
			this.socialWindow && (this.socialWindow.close(), u.setSocialWindow(void 0, d.state.activeChain));
		}), this.unsubscribe.push(u.subscribe((e) => {
			e.socialProvider && (this.socialProvider = e.socialProvider), e.socialWindow && (this.socialWindow = e.socialWindow);
		}), r.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e;
		}), u.subscribeKey("address", (e) => {
			let t = this.remoteFeatures?.multiWallet;
			e && e !== this.address && (this.hasMultipleConnections && t ? (s.replace("ProfileWallets"), l.showSuccess("New Wallet Added")) : (f.state.open || r.state.enableEmbedded) && f.close());
		})), this.authConnector && this.connectSocial();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), window.removeEventListener("message", this.handleSocialConnection, !1), this.socialWindow?.close(), u.setSocialWindow(void 0, d.state.activeChain);
	}
	render() {
		return y`
      <wui-flex
        data-error=${S(this.error)}
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
          <wui-logo logo=${S(this.socialProvider)}></wui-logo>
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
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${this.socialProvider ?? "Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error ? "error-100" : "fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `;
	}
	loaderTemplate() {
		let e = m.state.themeVariables["--w3m-border-radius-master"];
		return y`<wui-loading-thumbnail radius=${(e ? parseInt(e.replace("px", ""), 10) : 4) * 9}></wui-loading-thumbnail>`;
	}
	connectSocial() {
		let e = setInterval(() => {
			this.socialWindow?.closed && (!this.connecting && s.state.view === "ConnectingSocial" && (this.socialProvider && o.sendEvent({
				type: "track",
				event: "SOCIAL_LOGIN_CANCELED",
				properties: { provider: this.socialProvider }
			}), s.goBack()), clearInterval(e));
		}, 1e3);
		window.addEventListener("message", this.handleSocialConnection, !1);
	}
	updateMessage() {
		this.error ? this.message = "Something went wrong" : this.connecting ? this.message = "Retrieving user data" : this.message = "Connect in the provider window";
	}
};
P.styles = M, N([C()], P.prototype, "socialProvider", void 0), N([C()], P.prototype, "socialWindow", void 0), N([C()], P.prototype, "error", void 0), N([C()], P.prototype, "connecting", void 0), N([C()], P.prototype, "message", void 0), N([C()], P.prototype, "remoteFeatures", void 0), P = N([e("w3m-connecting-social-view")], P);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-farcaster-view/styles.js
var F = b`
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

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
`, I = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, L = class extends x {
	constructor() {
		super(), this.unsubscribe = [], this.timeout = void 0, this.socialProvider = u.state.socialProvider, this.uri = u.state.farcasterUrl, this.ready = !1, this.loading = !1, this.remoteFeatures = r.state.remoteFeatures, this.authConnector = p.getAuthConnector(), this.forceUpdate = () => {
			this.requestUpdate();
		}, this.unsubscribe.push(u.subscribeKey("farcasterUrl", (e) => {
			e && (this.uri = e, this.connectFarcaster());
		}), u.subscribeKey("socialProvider", (e) => {
			e && (this.socialProvider = e);
		}), r.subscribeKey("remoteFeatures", (e) => {
			this.remoteFeatures = e;
		})), window.addEventListener("resize", this.forceUpdate);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), clearTimeout(this.timeout), window.removeEventListener("resize", this.forceUpdate);
	}
	render() {
		return this.onRenderProxy(), y`${this.platformTemplate()}`;
	}
	platformTemplate() {
		return i.isMobile() ? y`${this.mobileTemplate()}` : y`${this.desktopTemplate()}`;
	}
	desktopTemplate() {
		return this.loading ? y`${this.loadingTemplate()}` : y`${this.qrTemplate()}`;
	}
	qrTemplate() {
		return y` <wui-flex
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
    </wui-flex>`;
	}
	loadingTemplate() {
		return y`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"xl",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
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
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
	}
	mobileTemplate() {
		return y` <wui-flex
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
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
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
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`;
	}
	loaderTemplate() {
		let e = m.state.themeVariables["--w3m-border-radius-master"];
		return y`<wui-loading-thumbnail radius=${(e ? parseInt(e.replace("px", ""), 10) : 4) * 9}></wui-loading-thumbnail>`;
	}
	async connectFarcaster() {
		if (this.authConnector) try {
			await this.authConnector?.provider.connectFarcaster(), this.socialProvider && (a.setConnectedSocialProvider(this.socialProvider), o.sendEvent({
				type: "track",
				event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
				properties: { provider: this.socialProvider }
			})), this.loading = !0;
			let e = c.getConnections(this.authConnector.chain).length > 0;
			await c.connectExternal(this.authConnector, this.authConnector.chain);
			let t = this.remoteFeatures?.multiWallet;
			this.socialProvider && o.sendEvent({
				type: "track",
				event: "SOCIAL_LOGIN_SUCCESS",
				properties: { provider: this.socialProvider }
			}), this.loading = !1, e && t ? (s.replace("ProfileWallets"), l.showSuccess("New Wallet Added")) : f.close();
		} catch (e) {
			this.socialProvider && o.sendEvent({
				type: "track",
				event: "SOCIAL_LOGIN_ERROR",
				properties: { provider: this.socialProvider }
			}), s.goBack(), l.showError(e);
		}
	}
	mobileLinkTemplate() {
		return y`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri || this.loading}
      @click=${() => {
			this.uri && i.openHref(this.uri, "_blank");
		}}
    >
      Open farcaster</wui-button
    >`;
	}
	onRenderProxy() {
		!this.ready && this.uri && (this.timeout = setTimeout(() => {
			this.ready = !0;
		}, 200));
	}
	qrCodeTemplate() {
		return !this.uri || !this.ready ? null : y` <wui-qr-code
      size=${this.getBoundingClientRect().width - 40}
      theme=${m.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${S(m.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`;
	}
	copyTemplate() {
		return y`<wui-link
      .disabled=${!this.uri || !this.ready}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
	}
	onCopyUri() {
		try {
			this.uri && (i.copyToClopboard(this.uri), l.showSuccess("Link copied"));
		} catch {
			l.showError("Failed to copy");
		}
	}
};
L.styles = F, I([C()], L.prototype, "socialProvider", void 0), I([C()], L.prototype, "uri", void 0), I([C()], L.prototype, "ready", void 0), I([C()], L.prototype, "loading", void 0), I([C()], L.prototype, "remoteFeatures", void 0), L = I([e("w3m-connecting-farcaster-view")], L);
//#endregion
export { j as W3mConnectSocialsView, L as W3mConnectingFarcasterView, P as W3mConnectingSocialView };
