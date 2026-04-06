import { t as e } from "./exports-D_wXhA01.js";
import { A as t, F as n, M as r, N as i, S as a, T as o, _ as s, b as c, d as l, p as u, s as d, t as f, w as p, y as m } from "./ModalController-DHlkqy_7.js";
import { t as h } from "./OnRampController-CiB147vR.js";
import { t as g } from "./w3m-legal-footer-BYlOi615.js";
import { i as _, l as v, t as y } from "./lit-CKWVc9vf.js";
import { a as b, o as x, s as S } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-xSC_yRIR.js";
import "./wui-image-BM-LUjZL.js";
import "./wui-list-item-nRWo5lh4.js";
import "./wui-loading-spinner-CgnUakaY.js";
import "./wui-loading-thumbnail-CkvS96N0.js";
import "./wui-link-d0unVgA5.js";
import "./wui-icon-box-Cxv_9O0m.js";
import "./wui-visual-3YAnHwn6.js";
import "./wui-input-text-wJvlkZd9.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-fiat-select-view/styles.js
var C = v`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`, w = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, T = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.selectedCurrency = h.state.paymentCurrency, this.currencies = h.state.paymentCurrencies, this.currencyImages = o.state.currencyImages, this.checked = g.state.isLegalCheckboxChecked, this.unsubscribe.push(h.subscribe((e) => {
			this.selectedCurrency = e.paymentCurrency, this.currencies = e.paymentCurrencies;
		}), o.subscribeKey("currencyImages", (e) => this.currencyImages = e), g.subscribeKey("isLegalCheckboxChecked", (e) => {
			this.checked = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = r.state, n = r.state.features?.legalCheckbox, i = !!(e || t) && !!n && !this.checked;
		return _`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}
        gap="xs"
        class=${b(i ? "disabled" : void 0)}
      >
        ${this.currenciesTemplate(i)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
	}
	currenciesTemplate(e = !1) {
		return this.currencies.map((t) => _`
        <wui-list-item
          imageSrc=${b(this.currencyImages?.[t.id])}
          @click=${() => this.selectCurrency(t)}
          variant="image"
          tabIdx=${b(e ? -1 : void 0)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${t.id}</wui-text>
        </wui-list-item>
      `);
	}
	selectCurrency(e) {
		e && (h.setPaymentCurrency(e), f.close());
	}
};
T.styles = C, w([x()], T.prototype, "selectedCurrency", void 0), w([x()], T.prototype, "currencies", void 0), w([x()], T.prototype, "currencyImages", void 0), w([x()], T.prototype, "checked", void 0), T = w([e("w3m-onramp-fiat-select-view")], T);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-provider-item/styles.js
var E = v`
  button {
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    border: none;
    outline: none;
    background-color: var(--wui-color-gray-glass-002);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .provider-image {
    width: var(--wui-spacing-3xl);
    min-width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    position: relative;
    overflow: hidden;
  }

  .provider-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .network-icon {
    width: var(--wui-spacing-m);
    height: var(--wui-spacing-m);
    border-radius: calc(var(--wui-spacing-m) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-005),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`, D = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, O = class extends y {
	constructor() {
		super(...arguments), this.disabled = !1, this.color = "inherit", this.label = "", this.feeRange = "", this.loading = !1, this.onClick = null;
	}
	render() {
		return _`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${b(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading ? _`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>` : _`<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `;
	}
	networksTemplate() {
		return _`
      <wui-flex class="networks">
        ${(d.getAllRequestedCaipNetworks()?.filter((e) => e?.assets?.imageId)?.slice(0, 5))?.map((e) => _`
            <wui-flex class="network-icon">
              <wui-image src=${b(p.getNetworkImage(e))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `;
	}
};
O.styles = [E], D([S({ type: Boolean })], O.prototype, "disabled", void 0), D([S()], O.prototype, "color", void 0), D([S()], O.prototype, "name", void 0), D([S()], O.prototype, "label", void 0), D([S()], O.prototype, "feeRange", void 0), D([S({ type: Boolean })], O.prototype, "loading", void 0), D([S()], O.prototype, "onClick", void 0), O = D([e("w3m-onramp-provider-item")], O);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-providers-footer/styles.js
var k = v`
  wui-flex {
    border-top: 1px solid var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
  }
`, A = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, j = class extends y {
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = r.state;
		return !e && !t ? null : _`
      <wui-flex
        .padding=${[
			"m",
			"s",
			"s",
			"s"
		]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `;
	}
	howDoesItWorkTemplate() {
		return _` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`;
	}
	onWhatIsBuy() {
		a.sendEvent({
			type: "track",
			event: "SELECT_WHAT_IS_A_BUY",
			properties: { isSmartAccount: s(d.state.activeChain) === t.ACCOUNT_TYPES.SMART_ACCOUNT }
		}), c.push("WhatIsABuy");
	}
};
j.styles = [k], j = A([e("w3m-onramp-providers-footer")], j);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-providers-view/index.js
var M = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, N = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.providers = h.state.providers, this.unsubscribe.push(h.subscribeKey("providers", (e) => {
			this.providers = e;
		}));
	}
	render() {
		return _`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"s",
			"s",
			"s"
		]} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `;
	}
	onRampProvidersTemplate() {
		return this.providers.filter((e) => e.supportedChains.includes(d.state.activeChain ?? "eip155")).map((e) => _`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${() => {
			this.onClickProvider(e);
		}}
            ?disabled=${!e.url}
            data-testid=${`onramp-provider-${e.name}`}
          ></w3m-onramp-provider-item>
        `);
	}
	onClickProvider(e) {
		h.setSelectedProvider(e), c.push("BuyInProgress"), i.openHref(h.state.selectedProvider?.url || e.url, "popupWindow", "width=600,height=800,scrollbars=yes"), a.sendEvent({
			type: "track",
			event: "SELECT_BUY_PROVIDER",
			properties: {
				provider: e.name,
				isSmartAccount: s(d.state.activeChain) === t.ACCOUNT_TYPES.SMART_ACCOUNT
			}
		});
	}
};
M([x()], N.prototype, "providers", void 0), N = M([e("w3m-onramp-providers-view")], N);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-tokens-select-view/styles.js
var P = v`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`, F = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, I = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.selectedCurrency = h.state.purchaseCurrencies, this.tokens = h.state.purchaseCurrencies, this.tokenImages = o.state.tokenImages, this.checked = g.state.isLegalCheckboxChecked, this.unsubscribe.push(h.subscribe((e) => {
			this.selectedCurrency = e.purchaseCurrencies, this.tokens = e.purchaseCurrencies;
		}), o.subscribeKey("tokenImages", (e) => this.tokenImages = e), g.subscribeKey("isLegalCheckboxChecked", (e) => {
			this.checked = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = r.state, n = r.state.features?.legalCheckbox, i = !!(e || t) && !!n && !this.checked;
		return _`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${[
			"0",
			"s",
			"s",
			"s"
		]}
        gap="xs"
        class=${b(i ? "disabled" : void 0)}
      >
        ${this.currenciesTemplate(i)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
	}
	currenciesTemplate(e = !1) {
		return this.tokens.map((t) => _`
        <wui-list-item
          imageSrc=${b(this.tokenImages?.[t.symbol])}
          @click=${() => this.selectToken(t)}
          variant="image"
          tabIdx=${b(e ? -1 : void 0)}
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${t.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${t.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `);
	}
	selectToken(e) {
		e && (h.setPurchaseCurrency(e), f.close());
	}
};
I.styles = P, F([x()], I.prototype, "selectedCurrency", void 0), F([x()], I.prototype, "tokens", void 0), F([x()], I.prototype, "tokenImages", void 0), F([x()], I.prototype, "checked", void 0), I = F([e("w3m-onramp-token-select-view")], I);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-buy-in-progress-view/styles.js
var L = v`
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
`, R = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, z = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.selectedOnRampProvider = h.state.selectedProvider, this.uri = l.state.wcUri, this.ready = !1, this.showRetry = !1, this.buffering = !1, this.error = !1, this.isMobile = !1, this.onRetry = void 0, this.unsubscribe.push(h.subscribeKey("selectedProvider", (e) => {
			this.selectedOnRampProvider = e;
		}));
	}
	disconnectedCallback() {
		this.intervalId && clearInterval(this.intervalId);
	}
	render() {
		let e = "Continue in external window";
		this.error ? e = "Buy failed" : this.selectedOnRampProvider && (e = `Buy in ${this.selectedOnRampProvider?.label}`);
		let t = this.error ? "Buy can be declined from your side or due to and error on the provider app" : "We’ll notify you once your Buy is processed";
		return _`
      <wui-flex
        data-error=${b(this.error)}
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
          <wui-visual
            name=${b(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

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
          <wui-text variant="paragraph-500" color=${this.error ? "error-100" : "fg-100"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${this.error ? this.tryAgainTemplate() : null}
      </wui-flex>

      <wui-flex .padding=${[
			"0",
			"xl",
			"xl",
			"xl"
		]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `;
	}
	onTryAgain() {
		this.selectedOnRampProvider && (this.error = !1, i.openHref(this.selectedOnRampProvider.url, "popupWindow", "width=600,height=800,scrollbars=yes"));
	}
	tryAgainTemplate() {
		return this.selectedOnRampProvider?.url ? _`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>` : null;
	}
	loaderTemplate() {
		let e = m.state.themeVariables["--w3m-border-radius-master"];
		return _`<wui-loading-thumbnail radius=${(e ? parseInt(e.replace("px", ""), 10) : 4) * 9}></wui-loading-thumbnail>`;
	}
	onCopyUri() {
		if (!this.selectedOnRampProvider?.url) {
			u.showError("No link found"), c.goBack();
			return;
		}
		try {
			i.copyToClopboard(this.selectedOnRampProvider.url), u.showSuccess("Link copied");
		} catch {
			u.showError("Failed to copy");
		}
	}
};
z.styles = L, R([x()], z.prototype, "intervalId", void 0), R([x()], z.prototype, "selectedOnRampProvider", void 0), R([x()], z.prototype, "uri", void 0), R([x()], z.prototype, "ready", void 0), R([x()], z.prototype, "showRetry", void 0), R([x()], z.prototype, "buffering", void 0), R([x()], z.prototype, "error", void 0), R([S({ type: Boolean })], z.prototype, "isMobile", void 0), R([S()], z.prototype, "onRetry", void 0), z = R([e("w3m-buy-in-progress-view")], z);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-what-is-a-buy-view/index.js
var B = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, V = class extends y {
	render() {
		return _`
      <wui-flex
        flexDirection="column"
        .padding=${[
			"xxl",
			"3xl",
			"xl",
			"3xl"
		]}
        alignItems="center"
        gap="xl"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="xs" alignItems="center">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${c.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `;
	}
};
V = B([e("w3m-what-is-a-buy-view")], V);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-fund-wallet-view/index.js
var H = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, U = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.namespace = d.state.activeChain, this.features = r.state.features, this.remoteFeatures = r.state.remoteFeatures, this.unsubscribe.push(r.subscribeKey("features", (e) => this.features = e), r.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e), d.subscribeKey("activeChain", (e) => this.namespace = e), d.subscribeKey("activeCaipNetwork", (e) => {
			e?.chainNamespace && (this.namespace = e?.chainNamespace);
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return _`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"s",
			"xl",
			"s"
		]} gap="xs">
        ${this.onrampTemplate()} ${this.receiveTemplate()} ${this.depositFromExchangeTemplate()}
      </wui-flex>
    `;
	}
	onrampTemplate() {
		if (!this.namespace) return null;
		let e = this.remoteFeatures?.onramp, t = n.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
		return !e || !t ? null : _`
      <wui-list-description
        @click=${this.onBuyCrypto.bind(this)}
        text="Buy crypto"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        data-testid="wallet-features-onramp-button"
      ></wui-list-description>
    `;
	}
	depositFromExchangeTemplate() {
		return this.remoteFeatures?.payWithExchange ? _`
      <wui-list-description
        @click=${this.onDepositFromExchange.bind(this)}
        text="Deposit from exchange"
        icon="download"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="wallet-features-deposit-from-exchange-button"
      ></wui-list-description>
    ` : null;
	}
	receiveTemplate() {
		return this.features?.receive ? _`
      <wui-list-description
        @click=${this.onReceive.bind(this)}
        text="Receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="wallet-features-receive-button"
      ></wui-list-description>
    ` : null;
	}
	onBuyCrypto() {
		c.push("OnRampProviders");
	}
	onReceive() {
		c.push("WalletReceive");
	}
	onDepositFromExchange() {
		c.push("PayWithExchange");
	}
};
H([x()], U.prototype, "namespace", void 0), H([x()], U.prototype, "features", void 0), H([x()], U.prototype, "remoteFeatures", void 0), U = H([e("w3m-fund-wallet-view")], U);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-input/styles.js
var W = v`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--wui-spacing-1xs);
    height: 40px;
    padding: var(--wui-spacing-xs) var(--wui-spacing-1xs) var(--wui-spacing-xs)
      var(--wui-spacing-xs);
    min-width: 95px;
    border-radius: var(--FULL, 1000px);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`, G = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, K = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.type = "Token", this.value = 0, this.currencies = [], this.selectedCurrency = this.currencies?.[0], this.currencyImages = o.state.currencyImages, this.tokenImages = o.state.tokenImages, this.unsubscribe.push(h.subscribeKey("purchaseCurrency", (e) => {
			!e || this.type === "Fiat" || (this.selectedCurrency = this.formatPurchaseCurrency(e));
		}), h.subscribeKey("paymentCurrency", (e) => {
			!e || this.type === "Token" || (this.selectedCurrency = this.formatPaymentCurrency(e));
		}), h.subscribe((e) => {
			this.type === "Fiat" ? this.currencies = e.purchaseCurrencies.map(this.formatPurchaseCurrency) : this.currencies = e.paymentCurrencies.map(this.formatPaymentCurrency);
		}), o.subscribe((e) => {
			this.currencyImages = { ...e.currencyImages }, this.tokenImages = { ...e.tokenImages };
		}));
	}
	firstUpdated() {
		h.getAvailableCurrencies();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let e = this.selectedCurrency?.symbol || "", t = this.currencyImages[e] || this.tokenImages[e];
		return _`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency ? _` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${() => f.open({ view: `OnRamp${this.type}Select` })}
          >
            <wui-image src=${b(t)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>` : _`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`;
	}
	formatPaymentCurrency(e) {
		return {
			name: e.id,
			symbol: e.id
		};
	}
	formatPurchaseCurrency(e) {
		return {
			name: e.name,
			symbol: e.symbol
		};
	}
};
K.styles = W, G([S({ type: String })], K.prototype, "type", void 0), G([S({ type: Number })], K.prototype, "value", void 0), G([x()], K.prototype, "currencies", void 0), G([x()], K.prototype, "selectedCurrency", void 0), G([x()], K.prototype, "currencyImages", void 0), G([x()], K.prototype, "tokenImages", void 0), K = G([e("w3m-onramp-input")], K);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-onramp-widget/styles.js
var q = v`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: var(--wui-border-radius-l);
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`, J = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Y = {
	USD: "$",
	EUR: "€",
	GBP: "£"
}, X = [
	100,
	250,
	500,
	1e3
], Z = class extends y {
	constructor() {
		super(), this.unsubscribe = [], this.disabled = !1, this.caipAddress = d.state.activeCaipAddress, this.loading = f.state.loading, this.paymentCurrency = h.state.paymentCurrency, this.paymentAmount = h.state.paymentAmount, this.purchaseAmount = h.state.purchaseAmount, this.quoteLoading = h.state.quotesLoading, this.unsubscribe.push(d.subscribeKey("activeCaipAddress", (e) => this.caipAddress = e), f.subscribeKey("loading", (e) => {
			this.loading = e;
		}), h.subscribe((e) => {
			this.paymentCurrency = e.paymentCurrency, this.paymentAmount = e.paymentAmount, this.purchaseAmount = e.purchaseAmount, this.quoteLoading = e.quotesLoading;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return _`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount || 0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount || 0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${X.map((e) => _`<wui-button
                  variant=${this.paymentAmount === e ? "accent" : "neutral"}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${() => this.selectPresetAmount(e)}
                  >${`${Y[this.paymentCurrency?.id || "USD"]} ${e}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `;
	}
	templateButton() {
		return this.caipAddress ? _`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>` : _`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`;
	}
	getQuotes() {
		this.loading || f.open({ view: "OnRampProviders" });
	}
	openModal() {
		f.open({ view: "Connect" });
	}
	async onPaymentAmountChange(e) {
		h.setPaymentAmount(Number(e.detail)), await h.getQuote();
	}
	async selectPresetAmount(e) {
		h.setPaymentAmount(e), await h.getQuote();
	}
};
Z.styles = q, J([S({ type: Boolean })], Z.prototype, "disabled", void 0), J([x()], Z.prototype, "caipAddress", void 0), J([x()], Z.prototype, "loading", void 0), J([x()], Z.prototype, "paymentCurrency", void 0), J([x()], Z.prototype, "paymentAmount", void 0), J([x()], Z.prototype, "purchaseAmount", void 0), J([x()], Z.prototype, "quoteLoading", void 0), Z = J([e("w3m-onramp-widget")], Z);
//#endregion
export { z as W3mBuyInProgressView, U as W3mFundWalletView, N as W3mOnRampProvidersView, T as W3mOnrampFiatSelectView, I as W3mOnrampTokensView, Z as W3mOnrampWidget, V as W3mWhatIsABuyView };
