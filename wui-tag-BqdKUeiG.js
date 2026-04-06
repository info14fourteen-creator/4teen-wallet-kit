import { s as e, t } from "./exports-D_wXhA01.js";
import { i as n, l as r, t as i } from "./lit-CKWVc9vf.js";
import { s as a } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/styles.js
var o = r`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }

  :host([data-size='xs']) {
    height: var(--wui-spacing-2l);
    padding: 0 var(--wui-spacing-3xs) !important;
  }

  :host([data-size='xs']) > wui-text {
    transform: translateY(2%);
  }
`, s = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, c = class extends i {
	constructor() {
		super(...arguments), this.variant = "main", this.size = "lg";
	}
	render() {
		this.dataset.variant = this.variant, this.dataset.size = this.size;
		let e = this.size === "md" || this.size === "xs" ? "mini-700" : "micro-700";
		return n`
      <wui-text data-variant=${this.variant} variant=${e} color="inherit">
        <slot></slot>
      </wui-text>
    `;
	}
};
c.styles = [e, o], s([a()], c.prototype, "variant", void 0), s([a()], c.prototype, "size", void 0), c = s([t("wui-tag")], c);
//#endregion
