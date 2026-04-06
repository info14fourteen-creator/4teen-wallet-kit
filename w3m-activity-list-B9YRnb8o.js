import { d as e, n as t, s as n, t as r } from "./exports-D_wXhA01.js";
import { A as i, M as a, N as o, S as s, _ as c, b as l, f as u, s as d } from "./ModalController-DHlkqy_7.js";
import { i as f, l as p, t as m } from "./lit-CKWVc9vf.js";
import { a as h, o as g, s as _ } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-icon-box-DJlJZe2u.js";
import "./wui-link-d0unVgA5.js";
import "./wui-icon-box-Cxv_9O0m.js";
import "./wui-shimmer-OxoqWYWL.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/utils/TypeUtil.js
var v;
(function(e) {
	e.approve = "approved", e.bought = "bought", e.borrow = "borrowed", e.burn = "burnt", e.cancel = "canceled", e.claim = "claimed", e.deploy = "deployed", e.deposit = "deposited", e.execute = "executed", e.mint = "minted", e.receive = "received", e.repay = "repaid", e.send = "sent", e.sell = "sold", e.stake = "staked", e.trade = "swapped", e.unstake = "unstaked", e.withdraw = "withdrawn";
})(v || (v = {}));
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-visual/styles.js
var y = p`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-005);
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }

  wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }
`, b = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, x = class extends m {
	constructor() {
		super(...arguments), this.images = [], this.secondImage = {
			type: void 0,
			url: ""
		};
	}
	render() {
		let [e, t] = this.images, n = e?.type === "NFT", r = t?.url ? t.type === "NFT" : n, i = n ? "var(--wui-border-radius-xxs)" : "var(--wui-border-radius-s)", a = r ? "var(--wui-border-radius-xxs)" : "var(--wui-border-radius-s)";
		return this.style.cssText = `
    --local-left-border-radius: ${i};
    --local-right-border-radius: ${a};
    `, f`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`;
	}
	templateVisual() {
		let [e, t] = this.images, n = e?.type;
		return this.images.length === 2 && (e?.url || t?.url) ? f`<div class="swap-images-container">
        ${e?.url ? f`<wui-image src=${e.url} alt="Transaction image"></wui-image>` : null}
        ${t?.url ? f`<wui-image src=${t.url} alt="Transaction image"></wui-image>` : null}
      </div>` : e?.url ? f`<wui-image src=${e.url} alt="Transaction image"></wui-image>` : n === "NFT" ? f`<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>` : f`<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`;
	}
	templateIcon() {
		let e = "accent-100", t;
		return t = this.getIcon(), this.status && (e = this.getStatusColor()), t ? f`
      <wui-icon-box
        size="xxs"
        iconColor=${e}
        backgroundColor=${e}
        background="opaque"
        icon=${t}
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    ` : null;
	}
	getDirectionIcon() {
		switch (this.direction) {
			case "in": return "arrowBottom";
			case "out": return "arrowTop";
			default: return;
		}
	}
	getIcon() {
		return this.onlyDirectionIcon ? this.getDirectionIcon() : this.type === "trade" ? "swapHorizontalBold" : this.type === "approve" ? "checkmark" : this.type === "cancel" ? "close" : this.getDirectionIcon();
	}
	getStatusColor() {
		switch (this.status) {
			case "confirmed": return "success-100";
			case "failed": return "error-100";
			case "pending": return "inverse-100";
			default: return "accent-100";
		}
	}
};
x.styles = [y], b([_()], x.prototype, "type", void 0), b([_()], x.prototype, "status", void 0), b([_()], x.prototype, "direction", void 0), b([_({ type: Boolean })], x.prototype, "onlyDirectionIcon", void 0), b([_({ type: Array })], x.prototype, "images", void 0), b([_({ type: Object })], x.prototype, "secondImage", void 0), x = b([r("wui-transaction-visual")], x);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-list-item/styles.js
var S = p`
  :host > wui-flex:first-child {
    align-items: center;
    column-gap: var(--wui-spacing-s);
    padding: 6.5px var(--wui-spacing-xs) 6.5px var(--wui-spacing-xs);
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`, C = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, w = class extends m {
	constructor() {
		super(...arguments), this.type = "approve", this.onlyDirectionIcon = !1, this.images = [], this.price = [], this.amount = [], this.symbol = [];
	}
	render() {
		return f`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${h(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${h(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${v[this.type] || this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `;
	}
	templateDescription() {
		let e = this.descriptions?.[0];
		return e ? f`
          <wui-text variant="small-500" color="fg-200">
            <span>${e}</span>
          </wui-text>
        ` : null;
	}
	templateSecondDescription() {
		let e = this.descriptions?.[1];
		return e ? f`
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${e}</span>
          </wui-text>
        ` : null;
	}
};
w.styles = [n, S], C([_()], w.prototype, "type", void 0), C([_({ type: Array })], w.prototype, "descriptions", void 0), C([_()], w.prototype, "date", void 0), C([_({ type: Boolean })], w.prototype, "onlyDirectionIcon", void 0), C([_()], w.prototype, "status", void 0), C([_()], w.prototype, "direction", void 0), C([_({ type: Array })], w.prototype, "images", void 0), C([_({ type: Array })], w.prototype, "price", void 0), C([_({ type: Array })], w.prototype, "amount", void 0), C([_({ type: Array })], w.prototype, "symbol", void 0), w = C([r("wui-transaction-list-item")], w);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-list-item-loader/styles.js
var T = p`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`, E = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, D = class extends m {
	render() {
		return f`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `;
	}
};
D.styles = [n, T], D = E([r("wui-transaction-list-item-loader")], D);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-activity-list/styles.js
var O = p`
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: var(--wui-spacing-m);
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }

  .emptyContainer {
    height: 100%;
  }
`, k = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, A = "last-transaction", j = 7, M = class extends m {
	constructor() {
		super(), this.unsubscribe = [], this.paginationObserver = void 0, this.page = "activity", this.caipAddress = d.state.activeCaipAddress, this.transactionsByYear = u.state.transactionsByYear, this.loading = u.state.loading, this.empty = u.state.empty, this.next = u.state.next, u.clearCursor(), this.unsubscribe.push(d.subscribeKey("activeCaipAddress", (e) => {
			e && this.caipAddress !== e && (u.resetTransactions(), u.fetchTransactions(e)), this.caipAddress = e;
		}), d.subscribeKey("activeCaipNetwork", () => {
			this.updateTransactionView();
		}), u.subscribe((e) => {
			this.transactionsByYear = e.transactionsByYear, this.loading = e.loading, this.empty = e.empty, this.next = e.next;
		}));
	}
	firstUpdated() {
		this.updateTransactionView(), this.createPaginationObserver();
	}
	updated() {
		this.setPaginationObserver();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return f` ${this.empty ? null : this.templateTransactionsByYear()}
    ${this.loading ? this.templateLoading() : null}
    ${!this.loading && this.empty ? this.templateEmpty() : null}`;
	}
	updateTransactionView() {
		u.resetTransactions(), this.caipAddress && u.fetchTransactions(o.getPlainAddress(this.caipAddress));
	}
	templateTransactionsByYear() {
		return Object.keys(this.transactionsByYear).sort().reverse().map((e) => {
			let n = parseInt(e, 10), r = Array(12).fill(null).map((e, r) => ({
				groupTitle: t.getTransactionGroupTitle(n, r),
				transactions: this.transactionsByYear[n]?.[r]
			})).filter(({ transactions: e }) => e).reverse();
			return r.map(({ groupTitle: e, transactions: t }, n) => {
				let i = n === r.length - 1;
				return t ? f`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${i ? "true" : "false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${[
					"xs",
					"s",
					"s",
					"s"
				]}
            >
              <wui-text variant="paragraph-500" color="fg-200" data-testid="group-title"
                >${e}</wui-text
              >
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(t, i)}
            </wui-flex>
          </wui-flex>
        ` : null;
			});
		});
	}
	templateRenderTransaction(e, n) {
		let { date: r, descriptions: i, direction: a, isAllNFT: o, images: s, status: c, transfers: l, type: u } = this.getTransactionListItemProps(e), d = l?.length > 1;
		return l?.length === 2 && !o ? f`
        <wui-transaction-list-item
          date=${r}
          .direction=${a}
          id=${n && this.next ? A : ""}
          status=${c}
          type=${u}
          .images=${s}
          .descriptions=${i}
        ></wui-transaction-list-item>
      ` : d ? l.map((e, i) => {
			let a = t.getTransferDescription(e), o = n && i === l.length - 1;
			return f` <wui-transaction-list-item
          date=${r}
          direction=${e.direction}
          id=${o && this.next ? A : ""}
          status=${c}
          type=${u}
          .onlyDirectionIcon=${!0}
          .images=${[s[i]]}
          .descriptions=${[a]}
        ></wui-transaction-list-item>`;
		}) : f`
      <wui-transaction-list-item
        date=${r}
        .direction=${a}
        id=${n && this.next ? A : ""}
        status=${c}
        type=${u}
        .images=${s}
        .descriptions=${i}
      ></wui-transaction-list-item>
    `;
	}
	templateTransactions(e, t) {
		return e.map((n, r) => {
			let i = t && r === e.length - 1;
			return f`${this.templateRenderTransaction(n, i)}`;
		});
	}
	emptyStateActivity() {
		return f`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${[
			"3xl",
			"xl",
			"3xl",
			"xl"
		]}
      gap="xl"
      data-testid="empty-activity-state"
    >
      <wui-icon-box
        backgroundColor="gray-glass-005"
        background="gray"
        iconColor="fg-200"
        icon="wallet"
        size="lg"
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >No Transactions yet</wui-text
        >
        <wui-text align="center" variant="small-500" color="fg-200"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`;
	}
	emptyStateAccount() {
		return f`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
      data-testid="empty-account-state"
    >
      <wui-icon-box
        icon="swapHorizontal"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100">No activity yet</wui-text>
        <wui-text variant="small-400" align="center" color="fg-200"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`;
	}
	templateEmpty() {
		return this.page === "account" ? f`${this.emptyStateAccount()}` : f`${this.emptyStateActivity()}`;
	}
	templateLoading() {
		return this.page === "activity" ? Array(j).fill(f` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map((e) => e) : null;
	}
	onReceiveClick() {
		l.push("WalletReceive");
	}
	createPaginationObserver() {
		let { projectId: e } = a.state;
		this.paginationObserver = new IntersectionObserver(([t]) => {
			t?.isIntersecting && !this.loading && (u.fetchTransactions(o.getPlainAddress(this.caipAddress)), s.sendEvent({
				type: "track",
				event: "LOAD_MORE_TRANSACTIONS",
				properties: {
					address: o.getPlainAddress(this.caipAddress),
					projectId: e,
					cursor: this.next,
					isSmartAccount: c(d.state.activeChain) === i.ACCOUNT_TYPES.SMART_ACCOUNT
				}
			}));
		}, {}), this.setPaginationObserver();
	}
	setPaginationObserver() {
		this.paginationObserver?.disconnect();
		let e = this.shadowRoot?.querySelector(`#${A}`);
		e && this.paginationObserver?.observe(e);
	}
	getTransactionListItemProps(n) {
		let r = e.formatDate(n?.metadata?.minedAt), i = t.getTransactionDescriptions(n), a = n?.transfers, o = n?.transfers?.[0], s = !!o && n?.transfers?.every((e) => !!e.nft_info), c = t.getTransactionImages(a);
		return {
			date: r,
			direction: o?.direction,
			descriptions: i,
			isAllNFT: s,
			images: c,
			status: n.metadata?.status,
			transfers: a,
			type: n.metadata?.operationType
		};
	}
};
M.styles = O, k([_()], M.prototype, "page", void 0), k([g()], M.prototype, "caipAddress", void 0), k([g()], M.prototype, "transactionsByYear", void 0), k([g()], M.prototype, "loading", void 0), k([g()], M.prototype, "empty", void 0), k([g()], M.prototype, "next", void 0), M = k([r("w3m-activity-list")], M);
//#endregion
