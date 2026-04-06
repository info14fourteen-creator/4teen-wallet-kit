import { I as e, J as t, K as n, L as r, M as i, X as a, j as o, o as s, q as c, s as l, x as u } from "./ModalController-DHlkqy_7.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OnRampController.js
var d = {
	id: "2b92315d-eab7-5bef-84fa-089a131333f5",
	name: "USD Coin",
	symbol: "USDC",
	networks: [{
		name: "ethereum-mainnet",
		display_name: "Ethereum",
		chain_id: "1",
		contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
	}, {
		name: "polygon-mainnet",
		display_name: "Polygon",
		chain_id: "137",
		contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
	}]
}, f = {
	id: "USD",
	payment_method_limits: [{
		id: "card",
		min: "10.00",
		max: "7500.00"
	}, {
		id: "ach_bank_account",
		min: "10.00",
		max: "25000.00"
	}]
}, p = t({
	providers: r,
	selectedProvider: null,
	error: null,
	purchaseCurrency: d,
	paymentCurrency: f,
	purchaseCurrencies: [d],
	paymentCurrencies: [],
	quotesLoading: !1
}), m = o({
	state: p,
	subscribe(e) {
		return a(p, () => e(p));
	},
	subscribeKey(e, t) {
		return c(p, e, t);
	},
	setSelectedProvider(t) {
		if (t && t.name === "meld") {
			let r = l.state.activeChain, a = r === n.CHAIN.SOLANA ? "SOL" : "USDC", o = r ? l.state.chains.get(r)?.accountState?.address ?? "" : "", s = new URL(t.url);
			s.searchParams.append("publicKey", e), s.searchParams.append("destinationCurrencyCode", a), s.searchParams.append("walletAddress", o), s.searchParams.append("externalCustomerId", i.state.projectId), p.selectedProvider = {
				...t,
				url: s.toString()
			};
		} else p.selectedProvider = t;
	},
	setOnrampProviders(e) {
		if (Array.isArray(e) && e.every((e) => typeof e == "string")) {
			let t = e;
			p.providers = r.filter((e) => t.includes(e.name));
		} else p.providers = [];
	},
	setPurchaseCurrency(e) {
		p.purchaseCurrency = e;
	},
	setPaymentCurrency(e) {
		p.paymentCurrency = e;
	},
	setPurchaseAmount(e) {
		m.state.purchaseAmount = e;
	},
	setPaymentAmount(e) {
		m.state.paymentAmount = e;
	},
	async getAvailableCurrencies() {
		let e = await s.getOnrampOptions();
		p.purchaseCurrencies = e.purchaseCurrencies, p.paymentCurrencies = e.paymentCurrencies, p.paymentCurrency = e.paymentCurrencies[0] || f, p.purchaseCurrency = e.purchaseCurrencies[0] || d, await u.fetchCurrencyImages(e.paymentCurrencies.map((e) => e.id)), await u.fetchTokenImages(e.purchaseCurrencies.map((e) => e.symbol));
	},
	async getQuote() {
		p.quotesLoading = !0;
		try {
			let e = await s.getOnrampQuote({
				purchaseCurrency: p.purchaseCurrency,
				paymentCurrency: p.paymentCurrency,
				amount: p.paymentAmount?.toString() || "0",
				network: p.purchaseCurrency?.symbol
			});
			return p.quotesLoading = !1, p.purchaseAmount = Number(e?.purchaseAmount.amount), e;
		} catch (e) {
			return p.error = e.message, p.quotesLoading = !1, null;
		} finally {
			p.quotesLoading = !1;
		}
	},
	resetState() {
		p.selectedProvider = null, p.error = null, p.purchaseCurrency = d, p.paymentCurrency = f, p.purchaseCurrencies = [d], p.paymentCurrencies = [], p.paymentAmount = void 0, p.purchaseAmount = void 0, p.quotesLoading = !1;
	}
});
//#endregion
export { m as t };
