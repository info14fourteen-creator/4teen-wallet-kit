import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { i as r, l as i, t as a } from "./lit-CKWVc9vf.js";
import { s as o } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/styles.js
var s = i`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`, c = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, l = class extends a {
	constructor() {
		super(...arguments), this.size = "md", this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.background = "transparent", this.border = !1, this.borderColor = "wui-color-bg-125", this.icon = "copy";
	}
	render() {
		let e = this.iconSize || this.size, t = this.size === "lg", n = this.size === "xl", i = t ? "12%" : "16%", a = t ? "xxs" : n ? "s" : "3xl", o = this.background === "gray", s = this.background === "opaque", c = this.backgroundColor === "accent-100" && s || this.backgroundColor === "success-100" && s || this.backgroundColor === "error-100" && s || this.backgroundColor === "inverse-100" && s, l = `var(--wui-color-${this.backgroundColor})`;
		return c ? l = `var(--wui-icon-box-bg-${this.backgroundColor})` : o && (l = `var(--wui-color-gray-${this.backgroundColor})`), this.style.cssText = `
       --local-bg-value: ${l};
       --local-bg-mix: ${c || o ? "100%" : i};
       --local-border-radius: var(--wui-border-radius-${a});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor === "wui-color-bg-125" ? "2px" : "1px"} solid ${this.border ? `var(--${this.borderColor})` : "transparent"}
   `, r` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `;
	}
};
l.styles = [
	t,
	e,
	s
], c([o()], l.prototype, "size", void 0), c([o()], l.prototype, "backgroundColor", void 0), c([o()], l.prototype, "iconColor", void 0), c([o()], l.prototype, "iconSize", void 0), c([o()], l.prototype, "background", void 0), c([o({ type: Boolean })], l.prototype, "border", void 0), c([o()], l.prototype, "borderColor", void 0), c([o()], l.prototype, "icon", void 0), l = c([n("wui-icon-box")], l);
//#endregion
