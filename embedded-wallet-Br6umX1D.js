import { s as e, t } from "./exports-D_wXhA01.js";
import { A as n, F as r, K as i, M as a, N as o, R as s, S as c, _ as l, b as u, p as d, r as f, s as p, t as m, v as h, y as g } from "./ModalController-DHlkqy_7.js";
import { n as _, t as v } from "./HelpersUtil-DGysdoOO.js";
import { t as y } from "./EnsController-7zku2iTl.js";
import { i as b, l as x, t as S } from "./lit-CKWVc9vf.js";
import { a as C, o as w, s as T } from "./wui-text-ec7ybml8.js";
import "./wui-loading-spinner-D9SqO953.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-xSC_yRIR.js";
import "./wui-icon-link-BE6JisUI.js";
import "./wui-loading-spinner-CgnUakaY.js";
import "./wui-link-d0unVgA5.js";
import "./wui-icon-box-Cxv_9O0m.js";
import { n as E, t as D } from "./ref-Bg7qJIY4.js";
import "./wui-input-text-DaYBnzKP.js";
import "./wui-tag-BqdKUeiG.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-approve-transaction-view/styles.js
var O = x`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`, k = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, A = 600, j = 360, M = 64, N = class extends S {
	constructor() {
		super(), this.bodyObserver = void 0, this.unsubscribe = [], this.iframe = document.getElementById("w3m-iframe"), this.ready = !1, this.unsubscribe.push(m.subscribeKey("open", (e) => {
			e || this.onHideIframe();
		}), m.subscribeKey("shake", (e) => {
			e ? this.iframe.style.animation = "w3m-shake 500ms var(--wui-ease-out-power-2)" : this.iframe.style.animation = "none";
		}));
	}
	disconnectedCallback() {
		this.onHideIframe(), this.unsubscribe.forEach((e) => e()), this.bodyObserver?.unobserve(window.document.body);
	}
	async firstUpdated() {
		await this.syncTheme(), this.iframe.style.display = "block";
		let e = this?.renderRoot?.querySelector("div");
		this.bodyObserver = new ResizeObserver((t) => {
			let n = (t?.[0]?.contentBoxSize)?.[0]?.inlineSize;
			this.iframe.style.height = `${A}px`, e.style.height = `${A}px`, a.state.enableEmbedded ? this.updateFrameSizeForEmbeddedMode() : n && n <= 430 ? (this.iframe.style.width = "100%", this.iframe.style.left = "0px", this.iframe.style.bottom = "0px", this.iframe.style.top = "unset", this.onShowIframe()) : (this.iframe.style.width = `${j}px`, this.iframe.style.left = `calc(50% - ${j / 2}px)`, this.iframe.style.top = `calc(50% - ${A / 2}px + ${M / 2}px)`, this.iframe.style.bottom = "unset", this.onShowIframe());
		}), this.bodyObserver.observe(window.document.body);
	}
	render() {
		return b`<div data-ready=${this.ready} id="w3m-frame-container"></div>`;
	}
	onShowIframe() {
		let e = window.innerWidth <= 430;
		this.ready = !0, this.iframe.style.animation = e ? "w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)" : "w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)";
	}
	onHideIframe() {
		this.iframe.style.display = "none", this.iframe.style.animation = "w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)";
	}
	async syncTheme() {
		let e = h.getAuthConnector();
		if (e) {
			let t = g.getSnapshot().themeMode, n = g.getSnapshot().themeVariables;
			await e.provider.syncTheme({
				themeVariables: n,
				w3mThemeVariables: s(n, t)
			});
		}
	}
	async updateFrameSizeForEmbeddedMode() {
		let e = this?.renderRoot?.querySelector("div");
		await new Promise((e) => {
			setTimeout(e, 300);
		});
		let t = this.getBoundingClientRect();
		e.style.width = "100%", this.iframe.style.left = `${t.left}px`, this.iframe.style.top = `${t.top}px`, this.iframe.style.width = `${t.width}px`, this.iframe.style.height = `${t.height}px`, this.onShowIframe();
	}
};
N.styles = O, k([w()], N.prototype, "ready", void 0), N = k([t("w3m-approve-transaction-view")], N);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-upgrade-wallet-view/index.js
var P = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, F = class extends S {
	render() {
		return b`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${r.SECURE_SITE_DASHBOARD}
          imageSrc=${r.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `;
	}
};
F = P([t("w3m-upgrade-wallet-view")], F);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-ens-input/styles.js
var I = x`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`, L = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, R = class extends S {
	constructor() {
		super(...arguments), this.disabled = !1, this.loading = !1;
	}
	render() {
		return b`
      <wui-input-text
        value=${C(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value || ""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `;
	}
	baseNameTemplate() {
		return b`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${i.WC_NAME_SUFFIX}
    </wui-text>`;
	}
	loadingTemplate() {
		return this.loading ? b`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : null;
	}
	errorTemplate() {
		return this.errorMessage ? b`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >` : null;
	}
};
R.styles = [e, I], L([T()], R.prototype, "errorMessage", void 0), L([T({ type: Boolean })], R.prototype, "disabled", void 0), L([T()], R.prototype, "value", void 0), L([T({ type: Boolean })], R.prototype, "loading", void 0), L([T({ attribute: !1 })], R.prototype, "onKeyDown", void 0), R = L([t("wui-ens-input")], R);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-register-account-name-view/styles.js
var z = x`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    padding: var(--wui-spacing-m);
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    outline: 1px solid var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggestion:hover:not(:disabled) {
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 26px;
    transform: translateY(-50%);
    right: 10px;
  }
`, B = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, V = class extends S {
	constructor() {
		super(), this.formRef = D(), this.usubscribe = [], this.name = "", this.error = "", this.loading = y.state.loading, this.suggestions = y.state.suggestions, this.profileName = f.state.profileName, this.onDebouncedNameInputChange = o.debounce((e) => {
			e.length < 4 ? this.error = "Name must be at least 4 characters long" : v.isValidReownName(e) ? (this.error = "", y.getSuggestions(e)) : this.error = "The value is not a valid username";
		}), this.usubscribe.push(y.subscribe((e) => {
			this.suggestions = e.suggestions, this.loading = e.loading;
		}), f.subscribeKey("profileName", (e) => {
			this.profileName = e, e && (this.error = "You already own a name");
		}));
	}
	firstUpdated() {
		this.formRef.value?.addEventListener("keydown", this.onEnterKey.bind(this));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.usubscribe.forEach((e) => e()), this.formRef.value?.removeEventListener("keydown", this.onEnterKey.bind(this));
	}
	render() {
		return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${[
			"0",
			"s",
			"m",
			"s"
		]}
      >
        <form ${E(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `;
	}
	submitButtonTemplate() {
		let e = this.suggestions.find((e) => e.name?.split(".")?.[0] === this.name && e.registered);
		if (this.loading) return b`<wui-loading-spinner
        class="input-loading-spinner"
        color="fg-200"
      ></wui-loading-spinner>`;
		let t = `${this.name}${i.WC_NAME_SUFFIX}`;
		return b`
      <wui-icon-link
        .disabled=${e}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${e ? "fg-200" : "accent-100"}
        @click=${() => this.onSubmitName(t)}
      >
      </wui-icon-link>
    `;
	}
	onNameInputChange(e) {
		let t = v.validateReownName(e.detail || "");
		this.name = t, this.onDebouncedNameInputChange(t);
	}
	onKeyDown(e) {
		e.key.length === 1 && !v.isValidReownName(e.key) && e.preventDefault();
	}
	nameSuggestionTagTemplate(e) {
		return this.loading ? b`<wui-loading-spinner color="fg-200"></wui-loading-spinner>` : e.registered ? b`<wui-tag variant="shade" size="lg">Registered</wui-tag>` : b`<wui-tag variant="success" size="lg">Available</wui-tag>`;
	}
	templateSuggestions() {
		return !this.name || this.name.length < 4 || this.error ? null : b`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      ${this.suggestions.map((e) => b`<button
            .disabled=${e.registered || this.loading}
            data-testid="account-name-suggestion"
            class="suggestion"
            @click=${() => this.onSubmitName(e.name)}
          >
            <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
              ${e.name}</wui-text
            >${this.nameSuggestionTagTemplate(e)}
          </button>`)}
    </wui-flex>`;
	}
	isAllowedToSubmit(e) {
		let t = e.split(".")?.[0], n = this.suggestions.find((e) => e.name?.split(".")?.[0] === t && e.registered);
		return !this.loading && !this.error && !this.profileName && t && y.validateName(t) && !n;
	}
	async onSubmitName(e) {
		try {
			if (!this.isAllowedToSubmit(e)) return;
			c.sendEvent({
				type: "track",
				event: "REGISTER_NAME_INITIATED",
				properties: {
					isSmartAccount: l(p.state.activeChain) === n.ACCOUNT_TYPES.SMART_ACCOUNT,
					ensName: e
				}
			}), await y.registerName(e), c.sendEvent({
				type: "track",
				event: "REGISTER_NAME_SUCCESS",
				properties: {
					isSmartAccount: l(p.state.activeChain) === n.ACCOUNT_TYPES.SMART_ACCOUNT,
					ensName: e
				}
			});
		} catch (t) {
			d.showError(t.message), c.sendEvent({
				type: "track",
				event: "REGISTER_NAME_ERROR",
				properties: {
					isSmartAccount: l(p.state.activeChain) === n.ACCOUNT_TYPES.SMART_ACCOUNT,
					ensName: e,
					error: t?.message || "Unknown error"
				}
			});
		}
	}
	onEnterKey(e) {
		if (e.key === "Enter" && this.name && this.isAllowedToSubmit(this.name)) {
			let e = `${this.name}${i.WC_NAME_SUFFIX}`;
			this.onSubmitName(e);
		}
	}
};
V.styles = z, B([T()], V.prototype, "errorMessage", void 0), B([w()], V.prototype, "name", void 0), B([w()], V.prototype, "error", void 0), B([w()], V.prototype, "loading", void 0), B([w()], V.prototype, "suggestions", void 0), B([w()], V.prototype, "profileName", void 0), V = B([t("w3m-register-account-name-view")], V);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-register-account-name-success-view/styles.js
var H = x`
  .continue-button-container {
    width: 100%;
  }
`, U = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, W = class extends S {
	render() {
		return b`
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
			o.openHref(_.URLS.FAQ, "_blank");
		}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
	}
	onboardingTemplate() {
		return b` <wui-flex
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
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`;
	}
	buttonsTemplate() {
		return b`<wui-flex
      .padding=${[
			"0",
			"2l",
			"0",
			"2l"
		]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`;
	}
	redirectToAccount() {
		u.replace("Account");
	}
};
W.styles = H, W = U([t("w3m-register-account-name-success-view")], W);
//#endregion
export { N as W3mApproveTransactionView, W as W3mRegisterAccountNameSuccess, V as W3mRegisterAccountNameView, F as W3mUpgradeWalletView };
