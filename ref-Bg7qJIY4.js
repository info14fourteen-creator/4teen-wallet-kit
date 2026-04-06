import { n as e } from "./lit-CKWVc9vf.js";
import { n as t } from "./wui-text-ec7ybml8.js";
import { t as n } from "./wui-icon-CAz-1_6w.js";
//#region node_modules/lit-html/directives/ref.js
var r = () => new i(), i = class {}, a = /* @__PURE__ */ new WeakMap(), o = t(class extends n {
	render(t) {
		return e;
	}
	update(t, [n]) {
		let r = n !== this.G;
		return r && this.G !== void 0 && this.rt(void 0), (r || this.lt !== this.ct) && (this.G = n, this.ht = t.options?.host, this.rt(this.ct = t.element)), e;
	}
	rt(e) {
		if (this.isConnected || (e = void 0), typeof this.G == "function") {
			let t = this.ht ?? globalThis, n = a.get(t);
			n === void 0 && (n = /* @__PURE__ */ new WeakMap(), a.set(t, n)), n.get(this.G) !== void 0 && this.G.call(this.ht, void 0), n.set(this.G, e), e !== void 0 && this.G.call(this.ht, e);
		} else this.G.value = e;
	}
	get lt() {
		return typeof this.G == "function" ? a.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
	}
	disconnected() {
		this.lt === this.ct && this.rt(void 0);
	}
	reconnected() {
		this.rt(this.ct);
	}
});
//#endregion
export { o as n, r as t };
