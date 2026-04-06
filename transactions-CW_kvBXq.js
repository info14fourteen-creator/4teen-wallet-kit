import { t as e } from "./exports-D_wXhA01.js";
import { i as t, l as n, t as r } from "./lit-CKWVc9vf.js";
import "./wui-text-ec7ybml8.js";
import "./w3m-activity-list-B9YRnb8o.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-transactions-view/styles.js
var i = n`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`, a = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, o = class extends r {
	render() {
		return t`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"m",
			"m",
			"m"
		]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `;
	}
};
o.styles = i, o = a([e("w3m-transactions-view")], o);
//#endregion
export { o as W3mTransactionsView };
