import { a as e, r as t, s as n, t as r } from "./exports-D_wXhA01.js";
import { W as i } from "./ModalController-DHlkqy_7.js";
import { i as a, l as o, t as s } from "./lit-CKWVc9vf.js";
import { s as c } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-image-BWaOEx0k.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-avatar/styles.js
var l = o`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host([data-variant='generated']) {
      --mixed-local-color-1: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-1)
      );
      --mixed-local-color-2: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-2)
      );
      --mixed-local-color-3: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-3)
      );
      --mixed-local-color-4: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-4)
      );
      --mixed-local-color-5: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-5)
      );
    }
  }

  :host([data-variant='generated']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`, u = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, d = class extends s {
	constructor() {
		super(...arguments), this.imageSrc = void 0, this.alt = void 0, this.address = void 0, this.size = "xl";
	}
	render() {
		return this.style.cssText = `
    --local-width: var(--wui-icon-box-size-${this.size});
    --local-height: var(--wui-icon-box-size-${this.size});
    `, a`${this.visualTemplate()}`;
	}
	visualTemplate() {
		if (this.imageSrc) return this.dataset.variant = "image", a`<wui-image src=${this.imageSrc} alt=${this.alt ?? "avatar"}></wui-image>`;
		if (this.address) {
			this.dataset.variant = "generated";
			let e = t.generateAvatarColors(this.address);
			return this.style.cssText += `\n ${e}`, null;
		}
		return this.dataset.variant = "default", null;
	}
};
d.styles = [n, l], u([c()], d.prototype, "imageSrc", void 0), u([c()], d.prototype, "alt", void 0), u([c()], d.prototype, "address", void 0), u([c()], d.prototype, "size", void 0), d = u([r("wui-avatar")], d);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-token/styles.js
var f = o`
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
  }
`, p = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, m = class extends s {
	constructor() {
		super(...arguments), this.tokenName = "", this.tokenImageUrl = "", this.tokenValue = 0, this.tokenAmount = "0.0", this.tokenCurrency = "", this.clickable = !1;
	}
	render() {
		return a`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${i.formatNumberToLocalString(this.tokenAmount, 4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `;
	}
	visualTemplate() {
		return this.tokenName && this.tokenImageUrl ? a`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>` : a`<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`;
	}
};
m.styles = [
	n,
	e,
	f
], p([c()], m.prototype, "tokenName", void 0), p([c()], m.prototype, "tokenImageUrl", void 0), p([c({ type: Number })], m.prototype, "tokenValue", void 0), p([c()], m.prototype, "tokenAmount", void 0), p([c()], m.prototype, "tokenCurrency", void 0), p([c({ type: Boolean })], m.prototype, "clickable", void 0), m = p([r("wui-list-token")], m);
//#endregion
