import { A as e, k as t } from "./ModalController-DHlkqy_7.js";
//#region node_modules/@reown/appkit-wallet/dist/esm/src/RegexUtil.js
var n = {
	address: /^0x(?:[A-Fa-f0-9]{40})$/u,
	transactionHash: /^0x(?:[A-Fa-f0-9]{64})$/u,
	signedMessage: /^0x(?:[a-fA-F0-9]{62,})$/u
}, r = {
	set(e, n) {
		a.isClient && localStorage.setItem(`${t.STORAGE_KEY}${e}`, n);
	},
	get(e) {
		return a.isClient ? localStorage.getItem(`${t.STORAGE_KEY}${e}`) : null;
	},
	delete(e, n) {
		a.isClient && (n ? localStorage.removeItem(e) : localStorage.removeItem(`${t.STORAGE_KEY}${e}`));
	}
}, i = 30 * 1e3, a = {
	checkIfAllowedToTriggerEmail() {
		let e = r.get(t.LAST_EMAIL_LOGIN_TIME);
		if (e) {
			let t = Date.now() - Number(e);
			if (t < i) {
				let e = Math.ceil((i - t) / 1e3);
				throw Error(`Please try again after ${e} seconds`);
			}
		}
	},
	getTimeToNextEmailLogin() {
		let e = r.get(t.LAST_EMAIL_LOGIN_TIME);
		if (e) {
			let t = Date.now() - Number(e);
			if (t < i) return Math.ceil((i - t) / 1e3);
		}
		return 0;
	},
	checkIfRequestExists(t) {
		return e.NOT_SAFE_RPC_METHODS.includes(t.method) || e.SAFE_RPC_METHODS.includes(t.method);
	},
	getResponseType(e) {
		return typeof e == "string" && (e?.match(n.transactionHash) || e?.match(n.signedMessage)) ? t.RPC_RESPONSE_TYPE_TX : t.RPC_RESPONSE_TYPE_OBJECT;
	},
	checkIfRequestIsSafe(t) {
		return e.SAFE_RPC_METHODS.includes(t.method);
	},
	isClient: typeof window < "u"
};
//#endregion
export { r as n, a as t };
