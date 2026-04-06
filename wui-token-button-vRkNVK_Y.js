import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { i as r, l as i, t as a } from "./lit-CKWVc9vf.js";
import { s as o } from "./wui-text-ec7ybml8.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-icon-box-DJlJZe2u.js";
import "./wui-shimmer-OxoqWYWL.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-token-button/styles.js
var s = i`
  :host {
    display: block;
  }

  :host > button,
  :host > wui-flex {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`, c = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, l = class extends a {
	constructor() {
		super(...arguments), this.text = "", this.loading = !1;
	}
	render() {
		return this.loading ? r` <wui-flex alignItems="center" gap="xxs" padding="xs">
        <wui-shimmer width="24px" height="24px"></wui-shimmer>
        <wui-shimmer width="40px" height="20px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>` : r`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `;
	}
	tokenTemplate() {
		return this.imageSrc ? r`<wui-image src=${this.imageSrc}></wui-image>` : r`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
	}
};
l.styles = [
	t,
	e,
	s
], c([o()], l.prototype, "imageSrc", void 0), c([o()], l.prototype, "text", void 0), c([o({ type: Boolean })], l.prototype, "loading", void 0), l = c([n("wui-token-button")], l);
//#endregion
