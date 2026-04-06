import { t as e } from "./exports-D_wXhA01.js";
import { b as t, t as n } from "./ModalController-DHlkqy_7.js";
import { t as r } from "./w3m-tooltip-BYcqa_Vj.js";
import { i, l as a, t as o } from "./lit-CKWVc9vf.js";
import { o as s, s as c } from "./wui-text-ec7ybml8.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip-trigger/styles.js
var l = a`
  :host {
    width: 100%;
    display: block;
  }
`, u = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, d = class extends o {
	constructor() {
		super(), this.unsubscribe = [], this.text = "", this.open = r.state.open, this.unsubscribe.push(t.subscribeKey("view", () => {
			r.hide();
		}), n.subscribeKey("open", (e) => {
			e || r.hide();
		}), r.subscribeKey("open", (e) => {
			this.open = e;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), r.hide();
	}
	render() {
		return i`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `;
	}
	renderChildren() {
		return i`<slot></slot> `;
	}
	onMouseEnter() {
		let e = this.getBoundingClientRect();
		this.open || r.showTooltip({
			message: this.text,
			triggerRect: {
				width: e.width,
				height: e.height,
				left: e.left,
				top: e.top
			},
			variant: "shade"
		});
	}
	onMouseLeave(e) {
		this.contains(e.relatedTarget) || r.hide();
	}
};
d.styles = [l], u([c()], d.prototype, "text", void 0), u([s()], d.prototype, "open", void 0), d = u([e("w3m-tooltip-trigger")], d);
//#endregion
