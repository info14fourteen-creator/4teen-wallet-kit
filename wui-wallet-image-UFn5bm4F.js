import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { i as r, l as i, o as a, t as o } from "./lit-CKWVc9vf.js";
import { s } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-icon-box-DJlJZe2u.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-button/styles.js
var c = i`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: var(--wui-color-accent-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-accent-glass-010);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  wui-tooltip {
    padding: 7px var(--wui-spacing-s) 8px var(--wui-spacing-s);
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }
  }
`, l = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, u = class extends o {
	constructor() {
		super(...arguments), this.text = "", this.icon = "card";
	}
	render() {
		return r`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`;
	}
};
u.styles = [
	t,
	e,
	c
], l([s()], u.prototype, "text", void 0), l([s()], u.prototype, "icon", void 0), u = l([n("wui-icon-button")], u);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkLg.js
var d = a`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`, f = a`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`, p = a`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`, m = i`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: var(--wui-color-gray-glass-002);
    border-radius: 100%;
    outline: 1px solid var(--wui-color-gray-glass-005);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-color-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-color-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`, h = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, g = class extends o {
	constructor() {
		super(...arguments), this.size = "md", this.name = "uknown", this.networkImagesBySize = {
			sm: p,
			md: f,
			lg: d
		}, this.selected = !1, this.round = !1;
	}
	render() {
		return this.round ? (this.dataset.round = "true", this.style.cssText = "\n      --local-width: var(--wui-spacing-3xl);\n      --local-height: var(--wui-spacing-3xl);\n      --local-icon-size: var(--wui-spacing-l);\n    ") : this.style.cssText = `

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `, r`${this.templateVisual()} ${this.svgTemplate()} `;
	}
	svgTemplate() {
		return this.round ? null : this.networkImagesBySize[this.size];
	}
	templateVisual() {
		return this.imageSrc ? r`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>` : r`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
	}
};
g.styles = [t, m], h([s()], g.prototype, "size", void 0), h([s()], g.prototype, "name", void 0), h([s({ type: Object })], g.prototype, "networkImagesBySize", void 0), h([s()], g.prototype, "imageSrc", void 0), h([s({ type: Boolean })], g.prototype, "selected", void 0), h([s({ type: Boolean })], g.prototype, "round", void 0), g = h([n("wui-network-image")], g);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/styles.js
var _ = i`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`, v = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, y = class extends o {
	constructor() {
		super(...arguments), this.size = "md", this.name = "", this.installed = !1, this.badgeSize = "xs";
	}
	render() {
		let e = "xxs";
		return e = this.size === "lg" ? "m" : this.size === "md" ? "xs" : "xxs", this.style.cssText = `
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `, this.walletIcon && (this.dataset.walletIcon = this.walletIcon), r`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `;
	}
	templateVisual() {
		return this.imageSrc ? r`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>` : this.walletIcon ? r`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>` : r`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
	}
};
y.styles = [
	e,
	t,
	_
], v([s()], y.prototype, "size", void 0), v([s()], y.prototype, "name", void 0), v([s()], y.prototype, "imageSrc", void 0), v([s()], y.prototype, "walletIcon", void 0), v([s({ type: Boolean })], y.prototype, "installed", void 0), v([s()], y.prototype, "badgeSize", void 0), y = v([n("wui-wallet-image")], y);
//#endregion
export { f as t };
