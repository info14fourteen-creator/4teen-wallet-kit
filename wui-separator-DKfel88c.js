import { s as e, t } from "./exports-D_wXhA01.js";
import { i as n, l as r, t as i } from "./lit-CKWVc9vf.js";
import { s as a } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-separator/styles.js
var o = r`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: var(--wui-color-gray-glass-005);
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 10px;
    background-color: var(--wui-color-modal-bg);
    transition: background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color;
  }
`, s = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, c = class extends i {
	constructor() {
		super(...arguments), this.text = "";
	}
	render() {
		return n`${this.template()}`;
	}
	template() {
		return this.text ? n`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>` : null;
	}
};
c.styles = [e, o], s([a()], c.prototype, "text", void 0), c = s([t("wui-separator")], c);
//#endregion
