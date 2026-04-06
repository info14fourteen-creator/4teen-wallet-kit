import { J as e, P as t, X as n, b as r, d as i, j as a, o, q as s, r as c, s as l, v as u } from "./ModalController-DHlkqy_7.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/EnsUtil.js
var d = 2147483648, f = { convertEVMChainIdToCoinType(e) {
	if (e >= d) throw Error("Invalid chainId");
	return (d | e) >>> 0;
} }, p = e({
	suggestions: [],
	loading: !1
}), m = a({
	state: p,
	subscribe(e) {
		return n(p, () => e(p));
	},
	subscribeKey(e, t) {
		return s(p, e, t);
	},
	async resolveName(e) {
		try {
			return await o.lookupEnsName(e);
		} catch (e) {
			throw Error(e?.reasons?.[0]?.description || "Error resolving name");
		}
	},
	async isNameRegistered(e) {
		try {
			return await o.lookupEnsName(e), !0;
		} catch {
			return !1;
		}
	},
	async getSuggestions(e) {
		try {
			return p.loading = !0, p.suggestions = [], p.suggestions = (await o.getEnsNameSuggestions(e)).suggestions || [], p.suggestions;
		} catch (e) {
			let t = m.parseEnsApiError(e, "Error fetching name suggestions");
			throw Error(t);
		} finally {
			p.loading = !1;
		}
	},
	async getNamesForAddress(e) {
		try {
			if (!l.state.activeCaipNetwork) return [];
			let n = t.getEnsFromCacheForAddress(e);
			if (n) return n;
			let r = await o.reverseLookupEnsName({ address: e });
			return t.updateEnsCache({
				address: e,
				ens: r,
				timestamp: Date.now()
			}), r;
		} catch (e) {
			let t = m.parseEnsApiError(e, "Error fetching names for address");
			throw Error(t);
		}
	},
	async registerName(e) {
		let n = l.state.activeCaipNetwork, a = c.state.address, s = u.getAuthConnector();
		if (!n) throw Error("Network not found");
		if (!a || !s) throw Error("Address or auth connector not found");
		p.loading = !0;
		try {
			let s = JSON.stringify({
				name: e,
				attributes: {},
				timestamp: Math.floor(Date.now() / 1e3)
			});
			r.pushTransactionStack({ onCancel() {
				r.replace("RegisterAccountName");
			} });
			let l = await i.signMessage(s);
			p.loading = !1;
			let u = n.id;
			if (!u) throw Error("Network not found");
			let d = f.convertEVMChainIdToCoinType(Number(u));
			await o.registerEnsName({
				coinType: d,
				address: a,
				signature: l,
				message: s
			}), c.setProfileName(e, n.chainNamespace), t.updateEnsCache({
				address: a,
				ens: [{
					name: e,
					registered_at: (/* @__PURE__ */ new Date()).toISOString(),
					updated_at: void 0,
					addresses: {},
					attributes: []
				}],
				timestamp: Date.now()
			}), r.replace("RegisterAccountNameSuccess");
		} catch (t) {
			let n = m.parseEnsApiError(t, `Error registering name ${e}`);
			throw r.replace("RegisterAccountName"), Error(n);
		} finally {
			p.loading = !1;
		}
	},
	validateName(e) {
		return /^[a-zA-Z0-9-]{4,}$/u.test(e);
	},
	parseEnsApiError(e, t) {
		return e?.reasons?.[0]?.description || t;
	}
});
//#endregion
export { m as t };
