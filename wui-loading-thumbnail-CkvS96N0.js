import { s as e, t } from "./exports-D_wXhA01.js";
import { i as n, l as r, t as i } from "./lit-CKWVc9vf.js";
import { s as a } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-thumbnail/styles.js
var o = r`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`, s = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, c = class extends i {
	constructor() {
		super(...arguments), this.radius = 36;
	}
	render() {
		return this.svgLoaderTemplate();
	}
	svgLoaderTemplate() {
		let e = this.radius > 50 ? 50 : this.radius, t = 36 - e;
		return n`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116 + t} ${245 + t}"
          stroke-dashoffset=${360 + t * 1.75}
        />
      </svg>
    `;
	}
};
c.styles = [e, o], s([a({ type: Number })], c.prototype, "radius", void 0), c = s([t("wui-loading-thumbnail")], c);
//#endregion
