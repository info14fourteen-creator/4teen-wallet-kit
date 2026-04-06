import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { i as r, l as i, t as a } from "./lit-CKWVc9vf.js";
import { a as o, s } from "./wui-text-ec7ybml8.js";
import "./wui-loading-spinner-D9SqO953.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-icon-box-DJlJZe2u.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-item/styles.js
var c = i`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`, l = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, u = class extends a {
	constructor() {
		super(...arguments), this.tabIdx = void 0, this.variant = "icon", this.disabled = !1, this.imageSrc = void 0, this.alt = void 0, this.chevron = !1, this.loading = !1;
	}
	render() {
		return r`
      <button
        ?disabled=${this.loading ? !0 : !!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${o(this.iconVariant)}
        tabindex=${o(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `;
	}
	visualTemplate() {
		if (this.variant === "image" && this.imageSrc) return r`<wui-image src=${this.imageSrc} alt=${this.alt ?? "list item"}></wui-image>`;
		if (this.iconVariant === "square" && this.icon && this.variant === "icon") return r`<wui-icon name=${this.icon}></wui-icon>`;
		if (this.variant === "icon" && this.icon && this.iconVariant) {
			let e = ["blue", "square-blue"].includes(this.iconVariant) ? "accent-100" : "fg-200", t = this.iconVariant === "square-blue" ? "mdl" : "md", n = this.iconSize ? this.iconSize : t;
			return r`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${n}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${t}
        ></wui-icon-box>
      `;
		}
		return null;
	}
	loadingTemplate() {
		return this.loading ? r`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>` : r``;
	}
	chevronTemplate() {
		return this.chevron ? r`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>` : null;
	}
};
u.styles = [
	t,
	e,
	c
], l([s()], u.prototype, "icon", void 0), l([s()], u.prototype, "iconSize", void 0), l([s()], u.prototype, "tabIdx", void 0), l([s()], u.prototype, "variant", void 0), l([s()], u.prototype, "iconVariant", void 0), l([s({ type: Boolean })], u.prototype, "disabled", void 0), l([s()], u.prototype, "imageSrc", void 0), l([s()], u.prototype, "alt", void 0), l([s({ type: Boolean })], u.prototype, "chevron", void 0), l([s({ type: Boolean })], u.prototype, "loading", void 0), u = l([n("wui-list-item")], u);
//#endregion
