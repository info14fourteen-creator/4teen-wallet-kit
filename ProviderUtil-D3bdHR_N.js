import { J as e, X as t, Y as n, q as r } from "./ModalController-DHlkqy_7.js";
//#region node_modules/@reown/appkit-utils/dist/esm/src/ProviderUtil.js
var i = {
	eip155: void 0,
	solana: void 0,
	polkadot: void 0,
	bip122: void 0,
	cosmos: void 0,
	sui: void 0,
	stacks: void 0
}, a = e({
	providers: { ...i },
	providerIds: { ...i }
}), o = {
	state: a,
	subscribeKey(e, t) {
		return r(a, e, t);
	},
	subscribe(e) {
		return t(a, () => {
			e(a);
		});
	},
	subscribeProviders(e) {
		return t(a.providers, () => e(a.providers));
	},
	setProvider(e, t) {
		e && t && (a.providers[e] = n(t));
	},
	getProvider(e) {
		if (e) return a.providers[e];
	},
	setProviderId(e, t) {
		t && (a.providerIds[e] = t);
	},
	getProviderId(e) {
		if (e) return a.providerIds[e];
	},
	reset() {
		a.providers = { ...i }, a.providerIds = { ...i };
	},
	resetChain(e) {
		a.providers[e] = void 0, a.providerIds[e] = void 0;
	}
};
//#endregion
export { o as t };
