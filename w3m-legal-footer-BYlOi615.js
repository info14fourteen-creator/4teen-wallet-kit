import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { J as r, M as i, X as a, q as o } from "./ModalController-DHlkqy_7.js";
import { i as s, l as c, t as l } from "./lit-CKWVc9vf.js";
import { a as u, o as d, s as f } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
import { n as p, t as m } from "./ref-Bg7qJIY4.js";
import { t as h } from "./ConstantsUtil-DD0h4_n4.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsStateController.js
var g = r({ isLegalCheckboxChecked: !1 }), _ = {
	state: g,
	subscribe(e) {
		return a(g, () => e(g));
	},
	subscribeKey(e, t) {
		return o(g, e, t);
	},
	setIsLegalCheckboxChecked(e) {
		g.isLegalCheckboxChecked = e;
	}
}, v = c`
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    column-gap: var(--wui-spacing-1xs);
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }

  label > span {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
    min-width: var(--wui-spacing-xl);
    min-height: var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-3xs);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-010);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  label > span:hover,
  label > input[type='checkbox']:focus-visible + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  label input[type='checkbox']:checked + span {
    background-color: var(--wui-color-blue-base-90);
  }

  label > span > wui-icon {
    opacity: 0;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span wui-icon {
    opacity: 1;
  }
`, y = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, b = class extends l {
	constructor() {
		super(...arguments), this.inputElementRef = m(), this.checked = void 0;
	}
	render() {
		return s`
      <label>
        <input
          ${p(this.inputElementRef)}
          ?checked=${u(this.checked)}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" color="inverse-100" size="xxs"></wui-icon>
        </span>
        <slot></slot>
      </label>
    `;
	}
	dispatchChangeEvent() {
		this.dispatchEvent(new CustomEvent("checkboxChange", {
			detail: this.inputElementRef.value?.checked,
			bubbles: !0,
			composed: !0
		}));
	}
};
b.styles = [t, v], y([f({ type: Boolean })], b.prototype, "checked", void 0), b = y([n("wui-checkbox")], b);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-legal-checkbox/styles.js
var x = c`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: var(--wui-spacing-s);
  }
  a {
    text-decoration: none;
    color: var(--wui-color-fg-150);
    font-weight: 500;
  }
`, S = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, C = class extends l {
	constructor() {
		super(), this.unsubscribe = [], this.checked = _.state.isLegalCheckboxChecked, this.unsubscribe.push(_.subscribeKey("isLegalCheckboxChecked", (e) => {
			this.checked = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = i.state, n = i.state.features?.legalCheckbox;
		return !e && !t || !n ? null : s`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="fg-250" variant="small-400" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `;
	}
	andTemplate() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = i.state;
		return e && t ? "and" : "";
	}
	termsTemplate() {
		let { termsConditionsUrl: e } = i.state;
		return e ? s`<a rel="noreferrer" target="_blank" href=${e}>terms of service</a>` : null;
	}
	privacyTemplate() {
		let { privacyPolicyUrl: e } = i.state;
		return e ? s`<a rel="noreferrer" target="_blank" href=${e}>privacy policy</a>` : null;
	}
	onCheckboxChange() {
		_.setIsLegalCheckboxChecked(!this.checked);
	}
};
C.styles = [x], S([d()], C.prototype, "checked", void 0), C = S([n("w3m-legal-checkbox")], C);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-ux-by-reown/styles.js
var w = c`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`, T = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, E = class extends l {
	render() {
		return s`
      <a
        data-testid="ux-branding-reown"
        href=${h}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${[
			"0",
			"0",
			"l",
			"0"
		]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `;
	}
};
E.styles = [
	t,
	e,
	w
], E = T([n("wui-ux-by-reown")], E);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-legal-footer/styles.js
var D = c`
  :host > wui-flex {
    background-color: var(--wui-color-gray-glass-005);
  }

  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: var(--wui-spacing-m);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
  }
`, O = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, k = class extends l {
	constructor() {
		super(), this.unsubscribe = [], this.remoteFeatures = i.state.remoteFeatures, this.unsubscribe.push(i.subscribeKey("remoteFeatures", (e) => this.remoteFeatures = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = i.state, n = i.state.features?.legalCheckbox;
		return !e && !t || n ? s`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      ` : s`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${[
			"m",
			"s",
			"s",
			"s"
		]} justifyContent="center">
          <wui-text color="fg-250" variant="small-400" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `;
	}
	andTemplate() {
		let { termsConditionsUrl: e, privacyPolicyUrl: t } = i.state;
		return e && t ? "and" : "";
	}
	termsTemplate() {
		let { termsConditionsUrl: e } = i.state;
		return e ? s`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >` : null;
	}
	privacyTemplate() {
		let { privacyPolicyUrl: e } = i.state;
		return e ? s`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >` : null;
	}
	reownBrandingTemplate(e = !1) {
		return this.remoteFeatures?.reownBranding ? e ? s`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>` : s`<wui-ux-by-reown></wui-ux-by-reown>` : null;
	}
};
k.styles = [D], O([d()], k.prototype, "remoteFeatures", void 0), k = O([n("w3m-legal-footer")], k);
//#endregion
export { _ as t };
