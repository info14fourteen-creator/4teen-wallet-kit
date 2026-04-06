import { a as e, i as t, s as n, t as r } from "./exports-D_wXhA01.js";
import { i, l as a, t as o } from "./lit-CKWVc9vf.js";
import { s } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/styles.js
var c = a`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    :host(:not([size='sm'])) button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`, l = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, u = class extends o {
	constructor() {
		super(...arguments), this.size = "md", this.disabled = !1, this.icon = "copy", this.iconColor = "inherit";
	}
	render() {
		this.dataset.size = this.size;
		let e = "", t = "";
		switch (this.size) {
			case "lg":
				e = "--wui-border-radius-xs", t = "--wui-spacing-1xs";
				break;
			case "sm":
				e = "--wui-border-radius-3xs", t = "--wui-spacing-xxs";
				break;
			default:
				e = "--wui-border-radius-xxs", t = "--wui-spacing-2xs";
				break;
		}
		return this.style.cssText = `
    --local-border-radius: var(${e});
    --local-padding: var(${t});
    `, i`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `;
	}
};
u.styles = [
	n,
	e,
	t,
	c
], l([s()], u.prototype, "size", void 0), l([s({ type: Boolean })], u.prototype, "disabled", void 0), l([s()], u.prototype, "icon", void 0), l([s()], u.prototype, "iconColor", void 0), u = l([r("wui-icon-link")], u);
//#endregion
