import { s as e, t } from "./exports-D_wXhA01.js";
import { i as n, l as r, t as i } from "./lit-CKWVc9vf.js";
import { a, s as o } from "./wui-text-ec7ybml8.js";
import "./wui-input-text-DaYBnzKP.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-email-input/styles.js
var s = r`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`, c = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, l = class extends i {
	constructor() {
		super(...arguments), this.disabled = !1;
	}
	render() {
		return n`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${a(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `;
	}
	templateError() {
		return this.errorMessage ? n`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>` : null;
	}
};
l.styles = [e, s], c([o()], l.prototype, "errorMessage", void 0), c([o({ type: Boolean })], l.prototype, "disabled", void 0), c([o()], l.prototype, "value", void 0), c([o()], l.prototype, "tabIdx", void 0), l = c([t("wui-email-input")], l);
//#endregion
