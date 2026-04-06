import { t as e } from "./exports-D_wXhA01.js";
import { H as t, J as n, K as r, M as i, N as a, S as o, U as s, X as c, b as l, d as u, p as d, q as f, r as p, s as m, t as h, v as g, w as _, y as ee } from "./ModalController-DHlkqy_7.js";
import { t as v } from "./ProviderUtil-D3bdHR_N.js";
import { i as y, l as b, t as x } from "./lit-CKWVc9vf.js";
import { a as S, o as C } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-xSC_yRIR.js";
import "./wui-wallet-image-UFn5bm4F.js";
import "./wui-icon-link-BE6JisUI.js";
import "./wui-image-BM-LUjZL.js";
import "./wui-list-item-nRWo5lh4.js";
import "./wui-loading-spinner-CgnUakaY.js";
import "./wui-separator-DKfel88c.js";
import "./wui-loading-thumbnail-CkvS96N0.js";
//#region node_modules/@reown/appkit-pay/dist/esm/src/types/errors.js
var w = {
	INVALID_PAYMENT_CONFIG: "INVALID_PAYMENT_CONFIG",
	INVALID_RECIPIENT: "INVALID_RECIPIENT",
	INVALID_ASSET: "INVALID_ASSET",
	INVALID_AMOUNT: "INVALID_AMOUNT",
	UNKNOWN_ERROR: "UNKNOWN_ERROR",
	UNABLE_TO_INITIATE_PAYMENT: "UNABLE_TO_INITIATE_PAYMENT",
	INVALID_CHAIN_NAMESPACE: "INVALID_CHAIN_NAMESPACE",
	GENERIC_PAYMENT_ERROR: "GENERIC_PAYMENT_ERROR",
	UNABLE_TO_GET_EXCHANGES: "UNABLE_TO_GET_EXCHANGES",
	ASSET_NOT_SUPPORTED: "ASSET_NOT_SUPPORTED",
	UNABLE_TO_GET_PAY_URL: "UNABLE_TO_GET_PAY_URL",
	UNABLE_TO_GET_BUY_STATUS: "UNABLE_TO_GET_BUY_STATUS"
}, T = {
	[w.INVALID_PAYMENT_CONFIG]: "Invalid payment configuration",
	[w.INVALID_RECIPIENT]: "Invalid recipient address",
	[w.INVALID_ASSET]: "Invalid asset specified",
	[w.INVALID_AMOUNT]: "Invalid payment amount",
	[w.UNKNOWN_ERROR]: "Unknown payment error occurred",
	[w.UNABLE_TO_INITIATE_PAYMENT]: "Unable to initiate payment",
	[w.INVALID_CHAIN_NAMESPACE]: "Invalid chain namespace",
	[w.GENERIC_PAYMENT_ERROR]: "Unable to process payment",
	[w.UNABLE_TO_GET_EXCHANGES]: "Unable to get exchanges",
	[w.ASSET_NOT_SUPPORTED]: "Asset not supported by the selected exchange",
	[w.UNABLE_TO_GET_PAY_URL]: "Unable to get payment URL",
	[w.UNABLE_TO_GET_BUY_STATUS]: "Unable to get buy status"
}, E = class e extends Error {
	get message() {
		return T[this.code];
	}
	constructor(t, n) {
		super(T[t]), this.name = "AppKitPayError", this.code = t, this.details = n, Error.captureStackTrace && Error.captureStackTrace(this, e);
	}
}, D = "https://rpc.walletconnect.org/v1/json-rpc", O = class extends Error {};
function k() {
	return `${D}?projectId=${i.getSnapshot().projectId}`;
}
async function A(e, t) {
	let n = k(), { sdkType: r, sdkVersion: a, projectId: o } = i.getSnapshot(), s = {
		jsonrpc: "2.0",
		id: 1,
		method: e,
		params: {
			...t || {},
			st: r,
			sv: a,
			projectId: o
		}
	}, c = await (await fetch(n, {
		method: "POST",
		body: JSON.stringify(s),
		headers: { "Content-Type": "application/json" }
	})).json();
	if (c.error) throw new O(c.error.message);
	return c;
}
async function j(e) {
	return (await A("reown_getExchanges", e)).result;
}
async function M(e) {
	return (await A("reown_getExchangePayUrl", e)).result;
}
async function N(e) {
	return (await A("reown_getExchangeBuyStatus", e)).result;
}
//#endregion
//#region node_modules/@reown/appkit-pay/dist/esm/src/utils/AssetUtil.js
var P = ["eip155", "solana"], te = {
	eip155: {
		native: {
			assetNamespace: "slip44",
			assetReference: "60"
		},
		defaultTokenNamespace: "erc20"
	},
	solana: {
		native: {
			assetNamespace: "slip44",
			assetReference: "501"
		},
		defaultTokenNamespace: "token"
	}
};
function F(e, n) {
	let { chainNamespace: r, chainId: i } = t.parseCaipNetworkId(e), a = te[r];
	if (!a) throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${r}`);
	let o = a.native.assetNamespace, s = a.native.assetReference;
	return n !== "native" && (o = a.defaultTokenNamespace, s = n), `${`${r}:${i}`}/${o}:${s}`;
}
function ne(e) {
	let { chainNamespace: n } = t.parseCaipNetworkId(e);
	return P.includes(n);
}
//#endregion
//#region node_modules/@reown/appkit-pay/dist/esm/src/utils/PaymentUtil.js
async function re(e) {
	let { paymentAssetNetwork: t, activeCaipNetwork: n, approvedCaipNetworkIds: r, requestedCaipNetworks: i } = e, o = a.sortRequestedNetworks(r, i).find((e) => e.caipNetworkId === t);
	if (!o) throw new E(w.INVALID_PAYMENT_CONFIG);
	if (o.caipNetworkId === n.caipNetworkId) return;
	let s = m.getNetworkProp("supportsAllNetworks", o.chainNamespace);
	if (!(r?.includes(o.caipNetworkId) || s)) throw new E(w.INVALID_PAYMENT_CONFIG);
	try {
		await m.switchActiveNetwork(o);
	} catch (e) {
		throw new E(w.GENERIC_PAYMENT_ERROR, e);
	}
}
async function I(e, t, n) {
	if (t !== r.CHAIN.EVM) throw new E(w.INVALID_CHAIN_NAMESPACE);
	if (!n.fromAddress) throw new E(w.INVALID_PAYMENT_CONFIG, "fromAddress is required for native EVM payments.");
	let i = typeof n.amount == "string" ? parseFloat(n.amount) : n.amount;
	if (isNaN(i)) throw new E(w.INVALID_PAYMENT_CONFIG);
	let a = e.metadata?.decimals ?? 18, o = u.parseUnits(i.toString(), a);
	if (typeof o != "bigint") throw new E(w.GENERIC_PAYMENT_ERROR);
	return await u.sendTransaction({
		chainNamespace: t,
		to: n.recipient,
		address: n.fromAddress,
		value: o,
		data: "0x"
	}) ?? void 0;
}
async function L(e, t) {
	if (!t.fromAddress) throw new E(w.INVALID_PAYMENT_CONFIG, "fromAddress is required for ERC20 EVM payments.");
	let n = e.asset, i = t.recipient, a = Number(e.metadata.decimals), o = u.parseUnits(t.amount.toString(), a);
	if (o === void 0) throw new E(w.GENERIC_PAYMENT_ERROR);
	return await u.writeContract({
		fromAddress: t.fromAddress,
		tokenAddress: n,
		args: [i, o],
		method: "transfer",
		abi: s.getERC20Abi(n),
		chainNamespace: r.CHAIN.EVM
	}) ?? void 0;
}
async function R(e, t) {
	if (e !== r.CHAIN.SOLANA) throw new E(w.INVALID_CHAIN_NAMESPACE);
	if (!t.fromAddress) throw new E(w.INVALID_PAYMENT_CONFIG, "fromAddress is required for Solana payments.");
	let n = typeof t.amount == "string" ? parseFloat(t.amount) : t.amount;
	if (isNaN(n) || n <= 0) throw new E(w.INVALID_PAYMENT_CONFIG, "Invalid payment amount.");
	try {
		if (!v.getProvider(e)) throw new E(w.GENERIC_PAYMENT_ERROR, "No Solana provider available.");
		let i = await u.sendTransaction({
			chainNamespace: r.CHAIN.SOLANA,
			to: t.recipient,
			value: n,
			tokenMint: t.tokenMint
		});
		if (!i) throw new E(w.GENERIC_PAYMENT_ERROR, "Transaction failed.");
		return i;
	} catch (e) {
		throw e instanceof E ? e : new E(w.GENERIC_PAYMENT_ERROR, `Solana payment failed: ${e}`);
	}
}
//#endregion
//#region node_modules/@reown/appkit-pay/dist/esm/src/controllers/PayController.js
var z = 0, B = "unknown", V = n({
	paymentAsset: {
		network: "eip155:1",
		asset: "0x0",
		metadata: {
			name: "0x0",
			symbol: "0x0",
			decimals: 0
		}
	},
	recipient: "0x0",
	amount: 0,
	isConfigured: !1,
	error: null,
	isPaymentInProgress: !1,
	exchanges: [],
	isLoading: !1,
	openInNewTab: !0,
	redirectUrl: void 0,
	payWithExchange: void 0,
	currentPayment: void 0,
	analyticsSet: !1,
	paymentId: void 0
}), H = {
	state: V,
	subscribe(e) {
		return c(V, () => e(V));
	},
	subscribeKey(e, t) {
		return f(V, e, t);
	},
	async handleOpenPay(e) {
		this.resetState(), this.setPaymentConfig(e), this.subscribeEvents(), this.initializeAnalytics(), V.isConfigured = !0, o.sendEvent({
			type: "track",
			event: "PAY_MODAL_OPEN",
			properties: {
				exchanges: V.exchanges,
				configuration: {
					network: V.paymentAsset.network,
					asset: V.paymentAsset.asset,
					recipient: V.recipient,
					amount: V.amount
				}
			}
		}), await h.open({ view: "Pay" });
	},
	resetState() {
		V.paymentAsset = {
			network: "eip155:1",
			asset: "0x0",
			metadata: {
				name: "0x0",
				symbol: "0x0",
				decimals: 0
			}
		}, V.recipient = "0x0", V.amount = 0, V.isConfigured = !1, V.error = null, V.isPaymentInProgress = !1, V.isLoading = !1, V.currentPayment = void 0;
	},
	setPaymentConfig(e) {
		if (!e.paymentAsset) throw new E(w.INVALID_PAYMENT_CONFIG);
		try {
			V.paymentAsset = e.paymentAsset, V.recipient = e.recipient, V.amount = e.amount, V.openInNewTab = e.openInNewTab ?? !0, V.redirectUrl = e.redirectUrl, V.payWithExchange = e.payWithExchange, V.error = null;
		} catch (e) {
			throw new E(w.INVALID_PAYMENT_CONFIG, e.message);
		}
	},
	getPaymentAsset() {
		return V.paymentAsset;
	},
	getExchanges() {
		return V.exchanges;
	},
	async fetchExchanges() {
		try {
			V.isLoading = !0, V.exchanges = (await j({
				page: z,
				asset: F(V.paymentAsset.network, V.paymentAsset.asset),
				amount: V.amount.toString()
			})).exchanges.slice(0, 2);
		} catch {
			throw d.showError(T.UNABLE_TO_GET_EXCHANGES), new E(w.UNABLE_TO_GET_EXCHANGES);
		} finally {
			V.isLoading = !1;
		}
	},
	async getAvailableExchanges(e) {
		try {
			let t = e?.asset && e?.network ? F(e.network, e.asset) : void 0;
			return await j({
				page: e?.page ?? z,
				asset: t,
				amount: e?.amount?.toString()
			});
		} catch {
			throw new E(w.UNABLE_TO_GET_EXCHANGES);
		}
	},
	async getPayUrl(e, t, n = !1) {
		try {
			let r = Number(t.amount), i = await M({
				exchangeId: e,
				asset: F(t.network, t.asset),
				amount: r.toString(),
				recipient: `${t.network}:${t.recipient}`
			});
			return o.sendEvent({
				type: "track",
				event: "PAY_EXCHANGE_SELECTED",
				properties: {
					source: "pay",
					exchange: { id: e },
					configuration: {
						network: t.network,
						asset: t.asset,
						recipient: t.recipient,
						amount: r
					},
					currentPayment: {
						type: "exchange",
						exchangeId: e
					},
					headless: n
				}
			}), n && (this.initiatePayment(), o.sendEvent({
				type: "track",
				event: "PAY_INITIATED",
				properties: {
					source: "pay",
					paymentId: V.paymentId || B,
					configuration: {
						network: t.network,
						asset: t.asset,
						recipient: t.recipient,
						amount: r
					},
					currentPayment: {
						type: "exchange",
						exchangeId: e
					}
				}
			})), i;
		} catch (e) {
			throw e instanceof Error && e.message.includes("is not supported") ? new E(w.ASSET_NOT_SUPPORTED) : Error(e.message);
		}
	},
	async openPayUrl(e, t, n = !1) {
		try {
			let r = await this.getPayUrl(e.exchangeId, t, n);
			if (!r) throw new E(w.UNABLE_TO_GET_PAY_URL);
			let i = e.openInNewTab ?? !0 ? "_blank" : "_self";
			return a.openHref(r.url, i), r;
		} catch (e) {
			throw e instanceof E ? V.error = e.message : V.error = T.GENERIC_PAYMENT_ERROR, new E(w.UNABLE_TO_GET_PAY_URL);
		}
	},
	subscribeEvents() {
		V.isConfigured || (u.subscribeKey("connections", (e) => {
			e.size > 0 && this.handlePayment();
		}), p.subscribeKey("caipAddress", (e) => {
			let t = u.hasAnyConnection(r.CONNECTOR_ID.WALLET_CONNECT);
			e && (t ? setTimeout(() => {
				this.handlePayment();
			}, 100) : this.handlePayment());
		}));
	},
	async handlePayment() {
		V.currentPayment = {
			type: "wallet",
			status: "IN_PROGRESS"
		};
		let e = p.state.caipAddress;
		if (!e) return;
		let { chainId: n, address: i } = t.parseCaipAddress(e), a = m.state.activeChain;
		if (!i || !n || !a || !v.getProvider(a)) return;
		let o = m.state.activeCaipNetwork;
		if (o && !V.isPaymentInProgress) try {
			this.initiatePayment();
			let e = m.getAllRequestedCaipNetworks(), t = m.getAllApprovedCaipNetworkIds();
			switch (await re({
				paymentAssetNetwork: V.paymentAsset.network,
				activeCaipNetwork: o,
				approvedCaipNetworkIds: t,
				requestedCaipNetworks: e
			}), await h.open({ view: "PayLoading" }), a) {
				case r.CHAIN.EVM:
					V.paymentAsset.asset === "native" && (V.currentPayment.result = await I(V.paymentAsset, a, {
						recipient: V.recipient,
						amount: V.amount,
						fromAddress: i
					})), V.paymentAsset.asset.startsWith("0x") && (V.currentPayment.result = await L(V.paymentAsset, {
						recipient: V.recipient,
						amount: V.amount,
						fromAddress: i
					})), V.currentPayment.status = "SUCCESS";
					break;
				case r.CHAIN.SOLANA:
					V.currentPayment.result = await R(a, {
						recipient: V.recipient,
						amount: V.amount,
						fromAddress: i,
						tokenMint: V.paymentAsset.asset === "native" ? void 0 : V.paymentAsset.asset
					}), V.currentPayment.status = "SUCCESS";
					break;
				default: throw new E(w.INVALID_CHAIN_NAMESPACE);
			}
		} catch (e) {
			e instanceof E ? V.error = e.message : V.error = T.GENERIC_PAYMENT_ERROR, V.currentPayment.status = "FAILED", d.showError(V.error);
		} finally {
			V.isPaymentInProgress = !1;
		}
	},
	getExchangeById(e) {
		return V.exchanges.find((t) => t.id === e);
	},
	validatePayConfig(e) {
		let { paymentAsset: t, recipient: n, amount: r } = e;
		if (!t) throw new E(w.INVALID_PAYMENT_CONFIG);
		if (!n) throw new E(w.INVALID_RECIPIENT);
		if (!t.asset) throw new E(w.INVALID_ASSET);
		if (r == null || r <= 0) throw new E(w.INVALID_AMOUNT);
	},
	handlePayWithWallet() {
		let e = p.state.caipAddress;
		if (!e) {
			l.push("Connect");
			return;
		}
		let { chainId: n, address: r } = t.parseCaipAddress(e), i = m.state.activeChain;
		if (!r || !n || !i) {
			l.push("Connect");
			return;
		}
		this.handlePayment();
	},
	async handlePayWithExchange(e) {
		try {
			V.currentPayment = {
				type: "exchange",
				exchangeId: e
			};
			let { network: t, asset: n } = V.paymentAsset, r = {
				network: t,
				asset: n,
				amount: V.amount,
				recipient: V.recipient
			}, i = await this.getPayUrl(e, r);
			if (!i) throw new E(w.UNABLE_TO_INITIATE_PAYMENT);
			return V.currentPayment.sessionId = i.sessionId, V.currentPayment.status = "IN_PROGRESS", V.currentPayment.exchangeId = e, this.initiatePayment(), {
				url: i.url,
				openInNewTab: V.openInNewTab
			};
		} catch (e) {
			return e instanceof E ? V.error = e.message : V.error = T.GENERIC_PAYMENT_ERROR, V.isPaymentInProgress = !1, d.showError(V.error), null;
		}
	},
	async getBuyStatus(e, t) {
		try {
			let n = await N({
				sessionId: t,
				exchangeId: e
			});
			return (n.status === "SUCCESS" || n.status === "FAILED") && o.sendEvent({
				type: "track",
				event: n.status === "SUCCESS" ? "PAY_SUCCESS" : "PAY_ERROR",
				properties: {
					source: "pay",
					paymentId: V.paymentId || B,
					configuration: {
						network: V.paymentAsset.network,
						asset: V.paymentAsset.asset,
						recipient: V.recipient,
						amount: V.amount
					},
					currentPayment: {
						type: "exchange",
						exchangeId: V.currentPayment?.exchangeId,
						sessionId: V.currentPayment?.sessionId,
						result: n.txHash
					}
				}
			}), n;
		} catch {
			throw new E(w.UNABLE_TO_GET_BUY_STATUS);
		}
	},
	async updateBuyStatus(e, t) {
		try {
			let n = await this.getBuyStatus(e, t);
			V.currentPayment && (V.currentPayment.status = n.status, V.currentPayment.result = n.txHash), (n.status === "SUCCESS" || n.status === "FAILED") && (V.isPaymentInProgress = !1);
		} catch {
			throw new E(w.UNABLE_TO_GET_BUY_STATUS);
		}
	},
	initiatePayment() {
		V.isPaymentInProgress = !0, V.paymentId = crypto.randomUUID();
	},
	initializeAnalytics() {
		V.analyticsSet || (V.analyticsSet = !0, this.subscribeKey("isPaymentInProgress", (e) => {
			if (V.currentPayment?.status && V.currentPayment.status !== "UNKNOWN") {
				let e = {
					IN_PROGRESS: "PAY_INITIATED",
					SUCCESS: "PAY_SUCCESS",
					FAILED: "PAY_ERROR"
				}[V.currentPayment.status];
				o.sendEvent({
					type: "track",
					event: e,
					properties: {
						source: "pay",
						paymentId: V.paymentId || B,
						configuration: {
							network: V.paymentAsset.network,
							asset: V.paymentAsset.asset,
							recipient: V.recipient,
							amount: V.amount
						},
						currentPayment: {
							type: V.currentPayment.type,
							exchangeId: V.currentPayment.exchangeId,
							sessionId: V.currentPayment.sessionId,
							result: V.currentPayment.result
						}
					}
				});
			}
		}));
	}
}, U = b`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  .token-display {
    padding: var(--wui-spacing-s) var(--wui-spacing-m);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-bg-125);
    margin-top: var(--wui-spacing-s);
    margin-bottom: var(--wui-spacing-s);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--wui-spacing-xs);
  }
`, W = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, G = class extends x {
	constructor() {
		super(), this.unsubscribe = [], this.amount = "", this.tokenSymbol = "", this.networkName = "", this.exchanges = H.state.exchanges, this.isLoading = H.state.isLoading, this.loadingExchangeId = null, this.connectedWalletInfo = p.state.connectedWalletInfo, this.initializePaymentDetails(), this.unsubscribe.push(H.subscribeKey("exchanges", (e) => this.exchanges = e)), this.unsubscribe.push(H.subscribeKey("isLoading", (e) => this.isLoading = e)), this.unsubscribe.push(p.subscribe((e) => this.connectedWalletInfo = e.connectedWalletInfo)), H.fetchExchanges();
	}
	get isWalletConnected() {
		return p.state.status === "connected";
	}
	render() {
		return y`
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"l",
			"l"
		]} gap="s">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="s">
            ${this.renderPayWithWallet()} ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
	}
	initializePaymentDetails() {
		let e = H.getPaymentAsset();
		this.networkName = e.network, this.tokenSymbol = e.metadata.symbol, this.amount = H.state.amount.toString();
	}
	renderPayWithWallet() {
		return ne(this.networkName) ? y`<wui-flex flexDirection="column" gap="s">
        ${this.isWalletConnected ? this.renderConnectedView() : this.renderDisconnectedView()}
      </wui-flex>
      <wui-separator text="or"></wui-separator>` : y``;
	}
	renderPaymentHeader() {
		let e = this.networkName;
		if (this.networkName) {
			let t = m.getAllRequestedCaipNetworks().find((e) => e.caipNetworkId === this.networkName);
			t && (e = t.name);
		}
		return y`
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="large-700" color="fg-100">${this.amount || "0.0000"}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="xxs">
            <wui-text variant="paragraph-600" color="fg-100">
              ${this.tokenSymbol || "Unknown Asset"}
            </wui-text>
            ${e ? y`
                  <wui-text variant="small-500" color="fg-200"> on ${e} </wui-text>
                ` : ""}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
	}
	renderConnectedView() {
		let e = this.connectedWalletInfo?.name || "connected wallet";
		return y`
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${!0}
        data-testid="wallet-payment-option"
      >
        <wui-flex alignItems="center" gap="s">
          <wui-wallet-image
            size="sm"
            imageSrc=${S(this.connectedWalletInfo?.icon)}
            name=${S(this.connectedWalletInfo?.name)}
          ></wui-wallet-image>
          <wui-text variant="paragraph-500" color="inherit">Pay with ${e}</wui-text>
        </wui-flex>
      </wui-list-item>

      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="disconnect"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${!1}
      >
        <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
      </wui-list-item>
    `;
	}
	renderDisconnectedView() {
		return y`<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="walletPlaceholder"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="paragraph-500" color="inherit">Pay from wallet</wui-text>
    </wui-list-item>`;
	}
	renderExchangeOptions() {
		return this.isLoading ? y`<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>` : this.exchanges.length === 0 ? y`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-100">No exchanges available</wui-text>
      </wui-flex>` : this.exchanges.map((e) => y`
        <wui-list-item
          @click=${() => this.onExchangePayment(e.id)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          ?disabled=${this.loadingExchangeId !== null}
        >
          <wui-flex alignItems="center" gap="s">
            ${this.loadingExchangeId === e.id ? y`<wui-loading-spinner color="accent-100" size="md"></wui-loading-spinner>` : y`<wui-wallet-image
                  size="sm"
                  imageSrc=${S(e.imageUrl)}
                  name=${e.name}
                ></wui-wallet-image>`}
            <wui-text flexGrow="1" variant="paragraph-500" color="inherit"
              >Pay with ${e.name} <wui-spinner size="sm" color="fg-200"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `);
	}
	onWalletPayment() {
		H.handlePayWithWallet();
	}
	async onExchangePayment(e) {
		try {
			this.loadingExchangeId = e;
			let t = await H.handlePayWithExchange(e);
			t && (await h.open({ view: "PayLoading" }), a.openHref(t.url, t.openInNewTab ? "_blank" : "_self"));
		} catch (e) {
			console.error("Failed to pay with exchange", e), d.showError("Failed to pay with exchange");
		} finally {
			this.loadingExchangeId = null;
		}
	}
	async onDisconnect(e) {
		e.stopPropagation();
		try {
			await u.disconnect();
		} catch {
			console.error("Failed to disconnect"), d.showError("Failed to disconnect");
		}
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
};
G.styles = U, W([C()], G.prototype, "amount", void 0), W([C()], G.prototype, "tokenSymbol", void 0), W([C()], G.prototype, "networkName", void 0), W([C()], G.prototype, "exchanges", void 0), W([C()], G.prototype, "isLoading", void 0), W([C()], G.prototype, "loadingExchangeId", void 0), W([C()], G.prototype, "connectedWalletInfo", void 0), G = W([e("w3m-pay-view")], G);
//#endregion
//#region node_modules/@reown/appkit-pay/dist/esm/src/ui/w3m-pay-loading-view/styles.js
var K = b`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }
`, q = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, J = 4e3, Y = class extends x {
	constructor() {
		super(), this.loadingMessage = "", this.subMessage = "", this.paymentState = "in-progress", this.paymentState = H.state.isPaymentInProgress ? "in-progress" : "completed", this.updateMessages(), this.setupSubscription(), this.setupExchangeSubscription();
	}
	disconnectedCallback() {
		clearInterval(this.exchangeSubscription);
	}
	render() {
		return y`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"xl",
			"xl",
			"xl",
			"xl"
		]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
	}
	updateMessages() {
		switch (this.paymentState) {
			case "completed":
				this.loadingMessage = "Payment completed", this.subMessage = "Your transaction has been successfully processed";
				break;
			case "error":
				this.loadingMessage = "Payment failed", this.subMessage = "There was an error processing your transaction";
				break;
			default:
				H.state.currentPayment?.type === "exchange" ? (this.loadingMessage = "Payment initiated", this.subMessage = "Please complete the payment on the exchange") : (this.loadingMessage = "Awaiting payment confirmation", this.subMessage = "Please confirm the payment transaction in your wallet");
				break;
		}
	}
	getStateIcon() {
		switch (this.paymentState) {
			case "completed": return this.successTemplate();
			case "error": return this.errorTemplate();
			default: return this.loaderTemplate();
		}
	}
	setupExchangeSubscription() {
		H.state.currentPayment?.type === "exchange" && (this.exchangeSubscription = setInterval(async () => {
			let e = H.state.currentPayment?.exchangeId, t = H.state.currentPayment?.sessionId;
			e && t && (await H.updateBuyStatus(e, t), H.state.currentPayment?.status === "SUCCESS" && clearInterval(this.exchangeSubscription));
		}, J));
	}
	setupSubscription() {
		H.subscribeKey("isPaymentInProgress", (e) => {
			!e && this.paymentState === "in-progress" && (H.state.error || !H.state.currentPayment?.result ? this.paymentState = "error" : this.paymentState = "completed", this.updateMessages(), setTimeout(() => {
				u.state.status !== "disconnected" && h.close();
			}, 3e3));
		}), H.subscribeKey("error", (e) => {
			e && this.paymentState === "in-progress" && (this.paymentState = "error", this.updateMessages());
		});
	}
	loaderTemplate() {
		let e = ee.state.themeVariables["--w3m-border-radius-master"], t = e ? parseInt(e.replace("px", ""), 10) : 4, n = this.getPaymentIcon();
		return y`
      <wui-flex justifyContent="center" alignItems="center" style="position: relative;">
        ${n ? y`<wui-wallet-image size="lg" imageSrc=${n}></wui-wallet-image>` : null}
        <wui-loading-thumbnail radius=${t * 9}></wui-loading-thumbnail>
      </wui-flex>
    `;
	}
	getPaymentIcon() {
		let e = H.state.currentPayment;
		if (e) {
			if (e.type === "exchange") {
				let t = e.exchangeId;
				if (t) return H.getExchangeById(t)?.imageUrl;
			}
			if (e.type === "wallet") {
				let e = p.state.connectedWalletInfo?.icon;
				if (e) return e;
				let t = m.state.activeChain;
				if (!t) return;
				let n = g.getConnectorId(t);
				if (!n) return;
				let r = g.getConnectorById(n);
				return r ? _.getConnectorImage(r) : void 0;
			}
		}
	}
	successTemplate() {
		return y`<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`;
	}
	errorTemplate() {
		return y`<wui-icon size="xl" color="error-100" name="close"></wui-icon>`;
	}
};
Y.styles = K, q([C()], Y.prototype, "loadingMessage", void 0), q([C()], Y.prototype, "subMessage", void 0), q([C()], Y.prototype, "paymentState", void 0), Y = q([e("w3m-pay-loading-view")], Y);
//#endregion
//#region node_modules/@reown/appkit-pay/dist/esm/src/client.js
var X = 3e5;
async function Z(e) {
	return H.handleOpenPay(e);
}
async function ie(e, t = X) {
	if (t <= 0) throw new E(w.INVALID_PAYMENT_CONFIG, "Timeout must be greater than 0");
	try {
		await Z(e);
	} catch (e) {
		throw e instanceof E ? e : new E(w.UNABLE_TO_INITIATE_PAYMENT, e.message);
	}
	return new Promise((e, n) => {
		let r = !1, i = setTimeout(() => {
			r || (r = !0, o(), n(new E(w.GENERIC_PAYMENT_ERROR, "Payment timeout")));
		}, t);
		function a() {
			if (r) return;
			let t = H.state.currentPayment, n = H.state.error, a = H.state.isPaymentInProgress;
			if (t?.status === "SUCCESS") {
				r = !0, o(), clearTimeout(i), e({
					success: !0,
					result: t.result
				});
				return;
			}
			if (t?.status === "FAILED") {
				r = !0, o(), clearTimeout(i), e({
					success: !1,
					error: n || "Payment failed"
				});
				return;
			}
			n && !a && !t && (r = !0, o(), clearTimeout(i), e({
				success: !1,
				error: n
			}));
		}
		let o = le([
			Q("currentPayment", a),
			Q("error", a),
			Q("isPaymentInProgress", a)
		]);
		a();
	});
}
function ae() {
	return H.getExchanges();
}
function oe() {
	return H.state.currentPayment?.result;
}
function se() {
	return H.state.error;
}
function ce() {
	return H.state.isPaymentInProgress;
}
function Q(e, t) {
	return H.subscribeKey(e, t);
}
function le(e) {
	return () => {
		e.forEach((e) => {
			try {
				e();
			} catch {}
		});
	};
}
//#endregion
//#region node_modules/@reown/appkit-pay/dist/esm/src/types/assets.js
var ue = {
	network: "eip155:8453",
	asset: "native",
	metadata: {
		name: "Ethereum",
		symbol: "ETH",
		decimals: 18
	}
}, de = {
	network: "eip155:8453",
	asset: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
	metadata: {
		name: "USD Coin",
		symbol: "USDC",
		decimals: 6
	}
}, fe = {
	network: "eip155:84532",
	asset: "native",
	metadata: {
		name: "Ethereum",
		symbol: "ETH",
		decimals: 18
	}
}, pe = {
	network: "eip155:1",
	asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
	metadata: {
		name: "USD Coin",
		symbol: "USDC",
		decimals: 6
	}
}, $ = {
	network: "eip155:10",
	asset: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
	metadata: {
		name: "USD Coin",
		symbol: "USDC",
		decimals: 6
	}
}, me = {
	network: "eip155:42161",
	asset: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
	metadata: {
		name: "USD Coin",
		symbol: "USDC",
		decimals: 6
	}
}, he = {
	network: "eip155:137",
	asset: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
	metadata: {
		name: "USD Coin",
		symbol: "USDC",
		decimals: 6
	}
}, ge = {
	network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
	asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
	metadata: {
		name: "USD Coin",
		symbol: "USDC",
		decimals: 6
	}
}, _e = {
	network: "eip155:1",
	asset: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
	metadata: {
		name: "Tether USD",
		symbol: "USDT",
		decimals: 6
	}
}, ve = {
	network: "eip155:10",
	asset: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
	metadata: {
		name: "Tether USD",
		symbol: "USDT",
		decimals: 6
	}
}, ye = {
	network: "eip155:42161",
	asset: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
	metadata: {
		name: "Tether USD",
		symbol: "USDT",
		decimals: 6
	}
}, be = {
	network: "eip155:137",
	asset: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
	metadata: {
		name: "Tether USD",
		symbol: "USDT",
		decimals: 6
	}
}, xe = {
	network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
	asset: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
	metadata: {
		name: "Tether USD",
		symbol: "USDT",
		decimals: 6
	}
}, Se = {
	network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
	asset: "native",
	metadata: {
		name: "Solana",
		symbol: "SOL",
		decimals: 9
	}
};
//#endregion
export { Y as W3mPayLoadingView, G as W3mPayView, me as arbitrumUSDC, ye as arbitrumUSDT, ue as baseETH, fe as baseSepoliaETH, de as baseUSDC, pe as ethereumUSDC, _e as ethereumUSDT, ae as getExchanges, ce as getIsPaymentInProgress, se as getPayError, oe as getPayResult, Z as openPay, $ as optimismUSDC, ve as optimismUSDT, ie as pay, he as polygonUSDC, be as polygonUSDT, Se as solanaSOL, ge as solanaUSDC, xe as solanaUSDT };
