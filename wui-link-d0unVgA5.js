import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { i as r, l as i, t as a } from "./lit-CKWVc9vf.js";
import { a as o, s } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/styles.js
var c = i`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`, l = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, u = class extends a {
	constructor() {
		super(...arguments), this.tabIdx = void 0, this.disabled = !1, this.color = "inherit";
	}
	render() {
		return r`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
	}
};
u.styles = [
	t,
	e,
	c
], l([s()], u.prototype, "tabIdx", void 0), l([s({ type: Boolean })], u.prototype, "disabled", void 0), l([s()], u.prototype, "color", void 0), u = l([n("wui-link")], u);
//#endregion
