import { t as e } from "./exports-D_wXhA01.js";
import { H as t, J as n, M as r, N as i, S as a, X as o, b as s, g as c, o as l, p as u, q as d, r as f, s as p, w as m } from "./ModalController-DHlkqy_7.js";
import { i as h, l as g, t as _ } from "./lit-CKWVc9vf.js";
import { o as v } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-link-BE6JisUI.js";
import "./wui-image-BM-LUjZL.js";
import "./wui-list-item-nRWo5lh4.js";
import "./wui-shimmer-Cctp5GZa.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/ExchangeUtil.js
var y = {
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
}, b = class extends Error {};
function x() {
	return `https://rpc.walletconnect.org/v1/json-rpc?projectId=${r.getSnapshot().projectId}&source=fund-wallet`;
}
async function S(e, t) {
	let n = x(), { sdkType: i, sdkVersion: a, projectId: o } = r.getSnapshot(), s = {
		jsonrpc: "2.0",
		id: 1,
		method: e,
		params: {
			...t || {},
			st: i,
			sv: a,
			projectId: o
		}
	}, c = await (await fetch(n, {
		method: "POST",
		body: JSON.stringify(s),
		headers: { "Content-Type": "application/json" }
	})).json();
	if (c.error) throw new b(c.error.message);
	return c;
}
async function C(e) {
	return (await S("reown_getExchanges", e)).result;
}
async function w(e) {
	return (await S("reown_getExchangePayUrl", e)).result;
}
async function T(e) {
	return (await S("reown_getExchangeBuyStatus", e)).result;
}
function E(e, n) {
	let { chainNamespace: r, chainId: i } = t.parseCaipNetworkId(e), a = y[r];
	if (!a) throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${r}`);
	let o = a.native.assetNamespace, s = a.native.assetReference;
	return n !== "native" && (o = a.defaultTokenNamespace, s = n), `${`${r}:${i}`}/${o}:${s}`;
}
//#endregion
//#region node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ExchangeController.js
var D = 0, O = {
	paymentAsset: {
		network: "eip155:1",
		asset: "native",
		metadata: {
			name: "Ethereum",
			symbol: "ETH",
			decimals: 0
		}
	},
	amount: 0,
	tokenAmount: 0,
	tokenPrice: null,
	priceLoading: !1,
	error: null,
	exchanges: [],
	isLoading: !1,
	currentPayment: void 0,
	isPaymentInProgress: !1,
	paymentId: ""
}, k = n(O), A = {
	state: k,
	subscribe(e) {
		return o(k, () => e(k));
	},
	subscribeKey(e, t) {
		return d(k, e, t);
	},
	resetState() {
		Object.assign(k, { ...O });
	},
	async fetchTokenPrice() {
		k.priceLoading = !0;
		let e = c();
		k.tokenPrice = (await l.fetchTokenPrice({ addresses: [e] })).fungibles?.[0]?.price || null, k.priceLoading = !1;
	},
	getTokenAmount() {
		if (!k.tokenPrice) throw Error("Cannot get token price");
		let e = new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 4
		}).format(k.amount / k.tokenPrice);
		return Number(e);
	},
	setAmount(e) {
		k.amount = e, k.tokenPrice && (k.tokenAmount = this.getTokenAmount());
	},
	setPaymentAsset(e) {
		k.paymentAsset = e;
	},
	async fetchExchanges() {
		try {
			k.isLoading = !0, k.exchanges = (await C({
				page: D,
				asset: E(k.paymentAsset.network, k.paymentAsset.asset),
				amount: k.amount.toString()
			})).exchanges.slice(0, 2);
		} catch {
			throw u.showError("Unable to get exchanges"), Error("Unable to get exchanges");
		} finally {
			k.isLoading = !1;
		}
	},
	async getPayUrl(e, t) {
		try {
			let n = Number(t.amount), r = await w({
				exchangeId: e,
				asset: E(t.network, t.asset),
				amount: n.toString(),
				recipient: `${t.network}:${t.recipient}`
			});
			return a.sendEvent({
				type: "track",
				event: "PAY_EXCHANGE_SELECTED",
				properties: {
					exchange: { id: e },
					configuration: {
						network: t.network,
						asset: t.asset,
						recipient: t.recipient,
						amount: n
					},
					currentPayment: {
						type: "exchange",
						exchangeId: e
					},
					source: "fund-from-exchange",
					headless: !1
				}
			}), r;
		} catch (e) {
			throw e instanceof Error && e.message.includes("is not supported") ? Error("Asset not supported") : Error(e.message);
		}
	},
	async handlePayWithExchange(e) {
		try {
			if (!f.state.address) throw Error("No account connected");
			k.isPaymentInProgress = !0, k.paymentId = crypto.randomUUID(), k.currentPayment = {
				type: "exchange",
				exchangeId: e
			};
			let { network: t, asset: n } = k.paymentAsset, r = {
				network: t,
				asset: n,
				amount: k.tokenAmount,
				recipient: f.state.address
			}, a = await this.getPayUrl(e, r);
			if (!a) throw Error("Unable to initiate payment");
			k.currentPayment.sessionId = a.sessionId, k.currentPayment.status = "IN_PROGRESS", k.currentPayment.exchangeId = e, i.openHref(a.url, "_blank", "popup=yes,width=480,height=720,noopener,noreferrer");
		} catch {
			k.error = "Unable to initiate payment", u.showError(k.error);
		}
	},
	async waitUntilComplete({ exchangeId: e, sessionId: t, paymentId: n, retries: r = 20 }) {
		let i = await this.getBuyStatus(e, t, n);
		if (i.status === "SUCCESS" || i.status === "FAILED") return i;
		if (r === 0) throw Error("Unable to get deposit status");
		return await new Promise((e) => {
			setTimeout(e, 5e3);
		}), this.waitUntilComplete({
			exchangeId: e,
			sessionId: t,
			paymentId: n,
			retries: r - 1
		});
	},
	async getBuyStatus(e, t, n) {
		try {
			if (!k.currentPayment) throw Error("No current payment");
			let r = await T({
				sessionId: t,
				exchangeId: e
			});
			return k.currentPayment.status = r.status, (r.status === "SUCCESS" || r.status === "FAILED") && (k.currentPayment.result = r.txHash, k.isPaymentInProgress = !1, a.sendEvent({
				type: "track",
				event: r.status === "SUCCESS" ? "PAY_SUCCESS" : "PAY_ERROR",
				properties: {
					source: "fund-from-exchange",
					paymentId: n,
					configuration: {
						network: k.paymentAsset.network,
						asset: k.paymentAsset.asset,
						recipient: f.state.address || "",
						amount: k.amount
					},
					currentPayment: {
						type: "exchange",
						exchangeId: k.currentPayment?.exchangeId,
						sessionId: k.currentPayment?.sessionId,
						result: r.txHash
					}
				}
			})), r;
		} catch {
			return {
				status: "UNKNOWN",
				txHash: ""
			};
		}
	},
	reset() {
		k.currentPayment = void 0, k.isPaymentInProgress = !1, k.paymentId = "", k.paymentAsset = {
			network: "eip155:1",
			asset: "native",
			metadata: {
				name: "Ethereum",
				symbol: "ETH",
				decimals: 0
			}
		}, k.amount = 0, k.tokenAmount = 0, k.tokenPrice = null, k.priceLoading = !1, k.error = null, k.exchanges = [], k.isLoading = !1;
	}
}, j = g`
  .amount-input-container {
    border-radius: var(--wui-border-radius-m);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-bg-100);
  }

  .container {
    background-color: var(--wui-color-bg-125);
  }
`, M = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, N = [
	10,
	50,
	100
], P = class extends _ {
	constructor() {
		super(), this.unsubscribe = [], this.network = p.state.activeCaipNetwork, this.exchanges = A.state.exchanges, this.isLoading = A.state.isLoading, this.amount = A.state.amount, this.tokenAmount = A.state.tokenAmount, this.priceLoading = A.state.priceLoading, this.isPaymentInProgress = A.state.isPaymentInProgress, this.currentPayment = A.state.currentPayment, this.paymentId = A.state.paymentId, this.unsubscribe.push(A.subscribe((e) => {
			this.exchanges = e.exchanges, this.isLoading = e.isLoading, this.amount = e.amount, this.tokenAmount = e.tokenAmount, this.priceLoading = e.priceLoading, this.paymentId = e.paymentId, this.isPaymentInProgress = e.isPaymentInProgress, this.currentPayment = e.currentPayment, e.isPaymentInProgress && e.currentPayment?.exchangeId && e.currentPayment?.sessionId && e.paymentId && this.handlePaymentInProgress();
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e()), A.reset();
	}
	firstUpdated() {
		A.fetchExchanges(), A.fetchTokenPrice();
	}
	render() {
		return h`
      <wui-flex flexDirection="column" gap="xs" class="container">
        ${this.amountInputTemplate()} ${this.exchangesTemplate()}
      </wui-flex>
    `;
	}
	exchangesTemplate() {
		return h`
      <wui-flex
        flexDirection="column"
        gap="xs"
        .padding=${[
			"xs",
			"s",
			"s",
			"s"
		]}
        class="exchanges-container"
      >
        ${this.exchanges.map((e) => h`<wui-list-item
              @click=${() => this.onExchangeClick(e)}
              chevron
              variant="image"
              imageSrc=${e.imageUrl}
              ?loading=${this.isLoading}
              ?disabled=${!this.amount}
            >
              <wui-text variant="paragraph-500" color="fg-200">
                Deposit from ${e.name}
              </wui-text>
            </wui-list-item>`)}
      </wui-flex>
    `;
	}
	amountInputTemplate() {
		return h`
      <wui-flex flexDirection="column" gap="s" .padding=${[
			"0",
			"s",
			"s",
			"s"
		]} class="amount-input-container">
        <wui-flex justifyContent="space-between">
          <wui-text variant="paragraph-500" color="fg-200">Asset</wui-text>
          <wui-chip-button
            data-testid="deposit-from-exchange-asset-button"
            text=${this.network?.nativeCurrency.symbol || ""}
            imageSrc=${m.getNetworkImage(this.network)}
            size="sm"
            variant="gray"
            icon=${null}
          ></wui-chip-button>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" justifyContent="center">
          <wui-flex alignItems="center" gap="4xs">
            <wui-text variant="2xl-500" color="fg-200">${this.amount}</wui-text>
            <wui-text variant="paragraph-500" color="fg-200">USD</wui-text>
          </wui-flex>
          ${this.tokenAmountTemplate()}
          </wui-flex>
          <wui-flex justifyContent="space-between" gap="xs">
            ${N.map((e) => h`<wui-button @click=${() => this.onPresetAmountClick(e)} variant=${this.amount === e ? "accent" : "shade"} size="sm" fullWidth>$${e}</wui-button>`)}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
	}
	tokenAmountTemplate() {
		return this.priceLoading ? h`<wui-shimmer
        width="65px"
        height="20px"
        borderRadius="xxs"
        variant="light"
      ></wui-shimmer>` : h`
      <wui-text variant="paragraph-500" color="fg-200">
        ${this.tokenAmount} ${this.network?.nativeCurrency.symbol}
      </wui-text>
    `;
	}
	async onExchangeClick(e) {
		this.amount && await A.handlePayWithExchange(e.id);
	}
	handlePaymentInProgress() {
		this.isPaymentInProgress && this.currentPayment?.exchangeId && this.currentPayment?.sessionId && this.paymentId && (u.showLoading("Deposit in progress..."), s.replace("Account"), A.waitUntilComplete({
			exchangeId: this.currentPayment.exchangeId,
			sessionId: this.currentPayment.sessionId,
			paymentId: this.paymentId
		}).then((e) => {
			e.status === "SUCCESS" ? u.showSuccess("Deposit completed") : e.status === "FAILED" && u.showError("Deposit failed");
		}));
	}
	onPresetAmountClick(e) {
		A.setAmount(e);
	}
};
P.styles = j, M([v()], P.prototype, "network", void 0), M([v()], P.prototype, "exchanges", void 0), M([v()], P.prototype, "isLoading", void 0), M([v()], P.prototype, "amount", void 0), M([v()], P.prototype, "tokenAmount", void 0), M([v()], P.prototype, "priceLoading", void 0), M([v()], P.prototype, "isPaymentInProgress", void 0), M([v()], P.prototype, "currentPayment", void 0), M([v()], P.prototype, "paymentId", void 0), P = M([e("w3m-deposit-from-exchange-view")], P);
//#endregion
export { P as W3mDepositFromExchangeView };
