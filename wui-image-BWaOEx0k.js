import { i as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { i as r, l as i, t as a } from "./lit-CKWVc9vf.js";
import { s as o } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/styles.js
var s = i`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-object-fit='cover']) img {
    object-fit: cover;
    object-position: center center;
  }

  :host([data-object-fit='contain']) img {
    object-fit: contain;
    object-position: center center;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`, c = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, l = class extends a {
	constructor() {
		super(...arguments), this.src = "./path/to/image.jpg", this.alt = "Image", this.size = void 0, this.objectFit = "cover";
	}
	render() {
		return this.objectFit && (this.dataset.objectFit = this.objectFit), this.style.cssText = `
      --local-width: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      --local-height: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      `, r`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`;
	}
	handleImageError() {
		this.dispatchEvent(new CustomEvent("onLoadError", {
			bubbles: !0,
			composed: !0
		}));
	}
};
l.styles = [
	t,
	e,
	s
], c([o()], l.prototype, "src", void 0), c([o()], l.prototype, "alt", void 0), c([o()], l.prototype, "size", void 0), c([o()], l.prototype, "objectFit", void 0), l = c([n("wui-image")], l);
//#endregion
