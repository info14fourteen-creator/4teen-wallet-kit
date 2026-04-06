import { A as e, C as t, F as n, J as r, K as i, N as a, S as o, W as s, X as c, _ as l, b as u, d, g as f, i as p, j as m, l as h, o as g, p as _, q as v, r as y, s as b, v as x } from "./ModalController-DHlkqy_7.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/SwapCalculationUtil.js
var S = {
	getGasPriceInEther(e, t) {
		let n = t * e;
		return Number(n) / 0xde0b6b3a7640000;
	},
	getGasPriceInUSD(e, t, n) {
		let r = S.getGasPriceInEther(t, n);
		return s.bigNumber(e).times(r).toNumber();
	},
	getPriceImpact({ sourceTokenAmount: e, sourceTokenPriceInUSD: t, toTokenPriceInUSD: n, toTokenAmount: r }) {
		let i = s.bigNumber(e).times(t), a = s.bigNumber(r).times(n);
		return i.minus(a).div(i).times(100).toNumber();
	},
	getMaxSlippage(e, t) {
		let n = s.bigNumber(e).div(100);
		return s.multiply(t, n).toNumber();
	},
	getProviderFee(e, t = .0085) {
		return s.bigNumber(e).times(t).toString();
	},
	isInsufficientNetworkTokenForGas(e, t) {
		let n = t || "0";
		return s.bigNumber(e).eq(0) ? !0 : s.bigNumber(s.bigNumber(n)).gt(e);
	},
	isInsufficientSourceTokenForSwap(e, t, n) {
		let r = n?.find((e) => e.address === t)?.quantity?.numeric;
		return s.bigNumber(r || "0").lt(e);
	}
}, C = 15e4, w = {
	initializing: !1,
	initialized: !1,
	loadingPrices: !1,
	loadingQuote: !1,
	loadingApprovalTransaction: !1,
	loadingBuildTransaction: !1,
	loadingTransaction: !1,
	fetchError: !1,
	approvalTransaction: void 0,
	swapTransaction: void 0,
	transactionError: void 0,
	sourceToken: void 0,
	sourceTokenAmount: "",
	sourceTokenPriceInUSD: 0,
	toToken: void 0,
	toTokenAmount: "",
	toTokenPriceInUSD: 0,
	networkPrice: "0",
	networkBalanceInUSD: "0",
	networkTokenSymbol: "",
	inputError: void 0,
	slippage: n.CONVERT_SLIPPAGE_TOLERANCE,
	tokens: void 0,
	popularTokens: void 0,
	suggestedTokens: void 0,
	foundTokens: void 0,
	myTokensWithBalance: void 0,
	tokensPriceMap: {},
	gasFee: "0",
	gasPriceInUSD: 0,
	priceImpact: void 0,
	maxSlippage: void 0,
	providerFee: void 0
}, T = r({ ...w }), E = {
	state: T,
	subscribe(e) {
		return c(T, () => e(T));
	},
	subscribeKey(e, t) {
		return v(T, e, t);
	},
	getParams() {
		let e = b.state.activeChain, t = y.getCaipAddress(e) ?? b.state.activeCaipAddress, n = a.getPlainAddress(t), r = f(), o = x.getConnectorId(b.state.activeChain);
		if (!n) throw Error("No address found to swap the tokens from.");
		let c = !T.toToken?.address || !T.toToken?.decimals, l = !T.sourceToken?.address || !T.sourceToken?.decimals || !s.bigNumber(T.sourceTokenAmount).gt(0), u = !T.sourceTokenAmount;
		return {
			networkAddress: r,
			fromAddress: n,
			fromCaipAddress: t,
			sourceTokenAddress: T.sourceToken?.address,
			toTokenAddress: T.toToken?.address,
			toTokenAmount: T.toTokenAmount,
			toTokenDecimals: T.toToken?.decimals,
			sourceTokenAmount: T.sourceTokenAmount,
			sourceTokenDecimals: T.sourceToken?.decimals,
			invalidToToken: c,
			invalidSourceToken: l,
			invalidSourceTokenAmount: u,
			availableToSwap: t && !c && !l && !u,
			isAuthConnector: o === i.CONNECTOR_ID.AUTH
		};
	},
	setSourceToken(e) {
		if (!e) {
			T.sourceToken = e, T.sourceTokenAmount = "", T.sourceTokenPriceInUSD = 0;
			return;
		}
		T.sourceToken = e, D.setTokenPrice(e.address, "sourceToken");
	},
	setSourceTokenAmount(e) {
		T.sourceTokenAmount = e;
	},
	setToToken(e) {
		if (!e) {
			T.toToken = e, T.toTokenAmount = "", T.toTokenPriceInUSD = 0;
			return;
		}
		T.toToken = e, D.setTokenPrice(e.address, "toToken");
	},
	setToTokenAmount(e) {
		T.toTokenAmount = e ? s.toFixed(e, 6) : "";
	},
	async setTokenPrice(e, t) {
		let n = T.tokensPriceMap[e] || 0;
		n || (T.loadingPrices = !0, n = await D.getAddressPrice(e)), t === "sourceToken" ? T.sourceTokenPriceInUSD = n : t === "toToken" && (T.toTokenPriceInUSD = n), T.loadingPrices && (T.loadingPrices = !1), D.getParams().availableToSwap && D.swapTokens();
	},
	switchTokens() {
		if (T.initializing || !T.initialized) return;
		let e = T.toToken ? { ...T.toToken } : void 0, t = T.sourceToken ? { ...T.sourceToken } : void 0, n = e && T.toTokenAmount === "" ? "1" : T.toTokenAmount;
		D.setSourceToken(e), D.setToToken(t), D.setSourceTokenAmount(n), D.setToTokenAmount(""), D.swapTokens();
	},
	resetState() {
		T.myTokensWithBalance = w.myTokensWithBalance, T.tokensPriceMap = w.tokensPriceMap, T.initialized = w.initialized, T.initializing = w.initializing, T.sourceToken = w.sourceToken, T.sourceTokenAmount = w.sourceTokenAmount, T.sourceTokenPriceInUSD = w.sourceTokenPriceInUSD, T.toToken = w.toToken, T.toTokenAmount = w.toTokenAmount, T.toTokenPriceInUSD = w.toTokenPriceInUSD, T.networkPrice = w.networkPrice, T.networkTokenSymbol = w.networkTokenSymbol, T.networkBalanceInUSD = w.networkBalanceInUSD, T.inputError = w.inputError;
	},
	resetValues() {
		let { networkAddress: e } = D.getParams(), t = T.tokens?.find((t) => t.address === e);
		D.setSourceToken(t), D.setToToken(void 0);
	},
	getApprovalLoadingState() {
		return T.loadingApprovalTransaction;
	},
	clearError() {
		T.transactionError = void 0;
	},
	async initializeState() {
		if (!T.initializing) {
			if (T.initializing = !0, !T.initialized) try {
				await D.fetchTokens(), T.initialized = !0;
			} catch {
				T.initialized = !1, _.showError("Failed to initialize swap"), u.goBack();
			}
			T.initializing = !1;
		}
	},
	async fetchTokens() {
		let { networkAddress: e } = D.getParams();
		await D.getNetworkTokenPrice(), await D.getMyTokensWithBalance();
		let t = T.myTokensWithBalance?.find((t) => t.address === e);
		t && (T.networkTokenSymbol = t.symbol, D.setSourceToken(t), D.setSourceTokenAmount("0"));
	},
	async getTokenList() {
		let e = b.state.activeCaipNetwork?.caipNetworkId;
		if (!(T.caipNetworkId === e && T.tokens)) try {
			T.tokensLoading = !0;
			let t = await h.getTokenList(e);
			T.tokens = t, T.caipNetworkId = e, T.popularTokens = t.sort((e, t) => e.symbol < t.symbol ? -1 : e.symbol > t.symbol ? 1 : 0), T.suggestedTokens = t.filter((e) => !!n.SWAP_SUGGESTED_TOKENS.includes(e.symbol));
		} catch {
			T.tokens = [], T.popularTokens = [], T.suggestedTokens = [];
		} finally {
			T.tokensLoading = !1;
		}
	},
	async getAddressPrice(e) {
		let t = T.tokensPriceMap[e];
		if (t) return t;
		let n = (await g.fetchTokenPrice({ addresses: [e] }))?.fungibles || [], r = [...T.tokens || [], ...T.myTokensWithBalance || []]?.find((t) => t.address === e)?.symbol, i = n.find((e) => e.symbol.toLowerCase() === r?.toLowerCase())?.price || 0, a = parseFloat(i.toString());
		return T.tokensPriceMap[e] = a, a;
	},
	async getNetworkTokenPrice() {
		let { networkAddress: e } = D.getParams(), t = (await g.fetchTokenPrice({ addresses: [e] }).catch(() => (_.showError("Failed to fetch network token price"), { fungibles: [] }))).fungibles?.[0], n = t?.price.toString() || "0";
		T.tokensPriceMap[e] = parseFloat(n), T.networkTokenSymbol = t?.symbol || "", T.networkPrice = n;
	},
	async getMyTokensWithBalance(e) {
		let t = await p.getMyTokensWithBalance(e), n = h.mapBalancesToSwapTokens(t);
		n && (await D.getInitialGasPrice(), D.setBalances(n));
	},
	setBalances(e) {
		let { networkAddress: t } = D.getParams(), n = b.state.activeCaipNetwork;
		if (!n) return;
		let r = e.find((e) => e.address === t);
		e.forEach((e) => {
			T.tokensPriceMap[e.address] = e.price || 0;
		}), T.myTokensWithBalance = e.filter((e) => e.address.startsWith(n.caipNetworkId)), T.networkBalanceInUSD = r ? s.multiply(r.quantity.numeric, r.price).toString() : "0";
	},
	async getInitialGasPrice() {
		let e = await h.fetchGasPrice();
		if (!e) return {
			gasPrice: null,
			gasPriceInUSD: null
		};
		switch (b.state?.activeCaipNetwork?.chainNamespace) {
			case i.CHAIN.SOLANA: return T.gasFee = e.standard ?? "0", T.gasPriceInUSD = s.multiply(e.standard, T.networkPrice).div(1e9).toNumber(), {
				gasPrice: BigInt(T.gasFee),
				gasPriceInUSD: Number(T.gasPriceInUSD)
			};
			case i.CHAIN.EVM:
			default:
				let t = e.standard ?? "0", n = BigInt(t), r = BigInt(C), a = S.getGasPriceInUSD(T.networkPrice, r, n);
				return T.gasFee = t, T.gasPriceInUSD = a, {
					gasPrice: n,
					gasPriceInUSD: a
				};
		}
	},
	async swapTokens() {
		let e = y.state.address, n = T.sourceToken, r = T.toToken, i = s.bigNumber(T.sourceTokenAmount).gt(0);
		if (i || D.setToTokenAmount(""), !r || !n || T.loadingPrices || !i) return;
		T.loadingQuote = !0;
		let a = s.bigNumber(T.sourceTokenAmount).times(10 ** n.decimals).round(0);
		try {
			let i = await g.fetchSwapQuote({
				userAddress: e,
				from: n.address,
				to: r.address,
				gasPrice: T.gasFee,
				amount: a.toString()
			});
			T.loadingQuote = !1;
			let o = i?.quotes?.[0]?.toAmount;
			if (!o) {
				t.open({
					displayMessage: "Incorrect amount",
					debugMessage: "Please enter a valid amount"
				}, "error");
				return;
			}
			let c = s.bigNumber(o).div(10 ** r.decimals).toString();
			D.setToTokenAmount(c), D.hasInsufficientToken(T.sourceTokenAmount, n.address) ? T.inputError = "Insufficient balance" : (T.inputError = void 0, D.setTransactionDetails());
		} catch {
			T.loadingQuote = !1, T.inputError = "Insufficient balance";
		}
	},
	async getTransaction() {
		let { fromCaipAddress: e, availableToSwap: t } = D.getParams(), n = T.sourceToken, r = T.toToken;
		if (!(!e || !t || !n || !r || T.loadingQuote)) try {
			T.loadingBuildTransaction = !0;
			let t = await h.fetchSwapAllowance({
				userAddress: e,
				tokenAddress: n.address,
				sourceTokenAmount: T.sourceTokenAmount,
				sourceTokenDecimals: n.decimals
			}), r;
			return r = t ? await D.createSwapTransaction() : await D.createAllowanceTransaction(), T.loadingBuildTransaction = !1, T.fetchError = !1, r;
		} catch {
			u.goBack(), _.showError("Failed to check allowance"), T.loadingBuildTransaction = !1, T.approvalTransaction = void 0, T.swapTransaction = void 0, T.fetchError = !0;
			return;
		}
	},
	async createAllowanceTransaction() {
		let { fromCaipAddress: e, sourceTokenAddress: t, toTokenAddress: n } = D.getParams();
		if (!(!e || !n)) {
			if (!t) throw Error("createAllowanceTransaction - No source token address found.");
			try {
				let r = await g.generateApproveCalldata({
					from: t,
					to: n,
					userAddress: e
				}), i = a.getPlainAddress(r.tx.from);
				if (!i) throw Error("SwapController:createAllowanceTransaction - address is required");
				let o = {
					data: r.tx.data,
					to: i,
					gasPrice: BigInt(r.tx.eip155.gasPrice),
					value: BigInt(r.tx.value),
					toAmount: T.toTokenAmount
				};
				return T.swapTransaction = void 0, T.approvalTransaction = {
					data: o.data,
					to: o.to,
					gasPrice: o.gasPrice,
					value: o.value,
					toAmount: o.toAmount
				}, {
					data: o.data,
					to: o.to,
					gasPrice: o.gasPrice,
					value: o.value,
					toAmount: o.toAmount
				};
			} catch {
				u.goBack(), _.showError("Failed to create approval transaction"), T.approvalTransaction = void 0, T.swapTransaction = void 0, T.fetchError = !0;
				return;
			}
		}
	},
	async createSwapTransaction() {
		let { networkAddress: e, fromCaipAddress: t, sourceTokenAmount: n } = D.getParams(), r = T.sourceToken, i = T.toToken;
		if (!t || !n || !r || !i) return;
		let o = d.parseUnits(n, r.decimals)?.toString();
		try {
			let n = await g.generateSwapCalldata({
				userAddress: t,
				from: r.address,
				to: i.address,
				amount: o,
				disableEstimate: !0
			}), s = r.address === e, c = BigInt(n.tx.eip155.gas), l = BigInt(n.tx.eip155.gasPrice), u = a.getPlainAddress(n.tx.to);
			if (!u) throw Error("SwapController:createSwapTransaction - address is required");
			let d = {
				data: n.tx.data,
				to: u,
				gas: c,
				gasPrice: l,
				value: BigInt(s ? o ?? "0" : "0"),
				toAmount: T.toTokenAmount
			};
			return T.gasPriceInUSD = S.getGasPriceInUSD(T.networkPrice, c, l), T.approvalTransaction = void 0, T.swapTransaction = d, d;
		} catch {
			u.goBack(), _.showError("Failed to create transaction"), T.approvalTransaction = void 0, T.swapTransaction = void 0, T.fetchError = !0;
			return;
		}
	},
	onEmbeddedWalletApprovalSuccess() {
		_.showLoading("Approve limit increase in your wallet"), u.replace("SwapPreview");
	},
	async sendTransactionForApproval(t) {
		let { fromAddress: n, isAuthConnector: r } = D.getParams();
		T.loadingApprovalTransaction = !0, r ? u.pushTransactionStack({ onSuccess: D.onEmbeddedWalletApprovalSuccess }) : _.showLoading("Approve limit increase in your wallet");
		try {
			await d.sendTransaction({
				address: n,
				to: t.to,
				data: t.data,
				value: t.value,
				chainNamespace: i.CHAIN.EVM
			}), await D.swapTokens(), await D.getTransaction(), T.approvalTransaction = void 0, T.loadingApprovalTransaction = !1;
		} catch (t) {
			let n = t;
			T.transactionError = n?.displayMessage, T.loadingApprovalTransaction = !1, _.showError(n?.displayMessage || "Transaction error"), o.sendEvent({
				type: "track",
				event: "SWAP_APPROVAL_ERROR",
				properties: {
					message: n?.displayMessage || n?.message || "Unknown",
					network: b.state.activeCaipNetwork?.caipNetworkId || "",
					swapFromToken: D.state.sourceToken?.symbol || "",
					swapToToken: D.state.toToken?.symbol || "",
					swapFromAmount: D.state.sourceTokenAmount || "",
					swapToAmount: D.state.toTokenAmount || "",
					isSmartAccount: l(i.CHAIN.EVM) === e.ACCOUNT_TYPES.SMART_ACCOUNT
				}
			});
		}
	},
	async sendTransactionForSwap(t) {
		if (!t) return;
		let { fromAddress: n, toTokenAmount: r, isAuthConnector: a } = D.getParams();
		T.loadingTransaction = !0;
		let c = `Swapping ${T.sourceToken?.symbol} to ${s.formatNumberToLocalString(r, 3)} ${T.toToken?.symbol}`, f = `Swapped ${T.sourceToken?.symbol} to ${s.formatNumberToLocalString(r, 3)} ${T.toToken?.symbol}`;
		a ? u.pushTransactionStack({ onSuccess() {
			u.replace("Account"), _.showLoading(c), E.resetState();
		} }) : _.showLoading("Confirm transaction in your wallet");
		try {
			let r = [T.sourceToken?.address, T.toToken?.address].join(","), s = await d.sendTransaction({
				address: n,
				to: t.to,
				data: t.data,
				value: t.value,
				chainNamespace: i.CHAIN.EVM
			});
			return T.loadingTransaction = !1, _.showSuccess(f), o.sendEvent({
				type: "track",
				event: "SWAP_SUCCESS",
				properties: {
					network: b.state.activeCaipNetwork?.caipNetworkId || "",
					swapFromToken: D.state.sourceToken?.symbol || "",
					swapToToken: D.state.toToken?.symbol || "",
					swapFromAmount: D.state.sourceTokenAmount || "",
					swapToAmount: D.state.toTokenAmount || "",
					isSmartAccount: l(i.CHAIN.EVM) === e.ACCOUNT_TYPES.SMART_ACCOUNT
				}
			}), E.resetState(), a || u.replace("Account"), E.getMyTokensWithBalance(r), s;
		} catch (t) {
			let n = t;
			T.transactionError = n?.displayMessage, T.loadingTransaction = !1, _.showError(n?.displayMessage || "Transaction error"), o.sendEvent({
				type: "track",
				event: "SWAP_ERROR",
				properties: {
					message: n?.displayMessage || n?.message || "Unknown",
					network: b.state.activeCaipNetwork?.caipNetworkId || "",
					swapFromToken: D.state.sourceToken?.symbol || "",
					swapToToken: D.state.toToken?.symbol || "",
					swapFromAmount: D.state.sourceTokenAmount || "",
					swapToAmount: D.state.toTokenAmount || "",
					isSmartAccount: l(i.CHAIN.EVM) === e.ACCOUNT_TYPES.SMART_ACCOUNT
				}
			});
			return;
		}
	},
	hasInsufficientToken(e, t) {
		return S.isInsufficientSourceTokenForSwap(e, t, T.myTokensWithBalance);
	},
	setTransactionDetails() {
		let { toTokenAddress: e, toTokenDecimals: t } = D.getParams();
		!e || !t || (T.gasPriceInUSD = S.getGasPriceInUSD(T.networkPrice, BigInt(T.gasFee), BigInt(C)), T.priceImpact = S.getPriceImpact({
			sourceTokenAmount: T.sourceTokenAmount,
			sourceTokenPriceInUSD: T.sourceTokenPriceInUSD,
			toTokenPriceInUSD: T.toTokenPriceInUSD,
			toTokenAmount: T.toTokenAmount
		}), T.maxSlippage = S.getMaxSlippage(T.slippage, T.toTokenAmount), T.providerFee = S.getProviderFee(T.sourceTokenAmount));
	}
}, D = m(E);
//#endregion
export { D as t };
