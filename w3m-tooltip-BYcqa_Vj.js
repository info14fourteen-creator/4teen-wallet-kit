import { t as e } from "./exports-D_wXhA01.js";
import { J as t, X as n, j as r, q as i } from "./ModalController-DHlkqy_7.js";
import { i as a, l as o, t as s } from "./lit-CKWVc9vf.js";
import { o as c } from "./wui-text-ec7ybml8.js";
import "./wui-icon-xSC_yRIR.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TooltipController.js
var l = t({
	message: "",
	open: !1,
	triggerRect: {
		width: 0,
		height: 0,
		top: 0,
		left: 0
	},
	variant: "shade"
}), u = r({
	state: l,
	subscribe(e) {
		return n(l, () => e(l));
	},
	subscribeKey(e, t) {
		return i(l, e, t);
	},
	showTooltip({ message: e, triggerRect: t, variant: n }) {
		l.open = !0, l.message = e, l.triggerRect = t, l.variant = n;
	},
	hide() {
		l.open = !1, l.message = "", l.triggerRect = {
			width: 0,
			height: 0,
			top: 0,
			left: 0
		};
	}
}), d = o`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`, f = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, p = class extends s {
	constructor() {
		super(), this.unsubscribe = [], this.open = u.state.open, this.message = u.state.message, this.triggerRect = u.state.triggerRect, this.variant = u.state.variant, this.unsubscribe.push(u.subscribe((e) => {
			this.open = e.open, this.message = e.message, this.triggerRect = e.triggerRect, this.variant = e.variant;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		this.dataset.variant = this.variant;
		let e = this.triggerRect.top, t = this.triggerRect.left;
		return this.style.cssText = `
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width / 2}px;
    --w3m-tooltip-display: ${this.open ? "flex" : "none"};
    --w3m-tooltip-opacity: ${this.open ? 1 : 0};
    `, a`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`;
	}
};
p.styles = [d], f([c()], p.prototype, "open", void 0), f([c()], p.prototype, "message", void 0), f([c()], p.prototype, "triggerRect", void 0), f([c()], p.prototype, "variant", void 0), p = f([e("w3m-tooltip"), e("w3m-tooltip")], p);
//#endregion
export { u as t };
