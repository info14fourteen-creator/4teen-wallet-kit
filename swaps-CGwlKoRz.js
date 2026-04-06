import { a as e, s as t, t as n, u as r } from "./exports-D_wXhA01.js";
import { A as i, F as a, N as o, S as s, W as c, _ as l, b as u, r as d, s as f, t as p } from "./ModalController-DHlkqy_7.js";
import { t as m } from "./SwapController-4z3X1f9r.js";
import "./w3m-tooltip-BYcqa_Vj.js";
import { i as h, l as g, t as _ } from "./lit-CKWVc9vf.js";
import { o as v, s as y } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-icon-xSC_yRIR.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-shimmer-OxoqWYWL.js";
import "./w3m-tooltip-trigger-CJzTgHzq.js";
import "./wui-shimmer-Cctp5GZa.js";
import "./wui-input-text-wJvlkZd9.js";
import "./wui-token-button-vRkNVK_Y.js";
//#region node_modules/@reown/appkit-common/dist/esm/src/utils/InputUtil.js
var b = { numericInputKeyDown(e, t, n) {
	let r = [
		"Backspace",
		"Meta",
		"Ctrl",
		"a",
		"A",
		"c",
		"C",
		"x",
		"X",
		"v",
		"V",
		"ArrowLeft",
		"ArrowRight",
		"Tab"
	], i = e.metaKey || e.ctrlKey, a = e.key, o = a.toLocaleLowerCase(), s = o === "a", c = o === "c", l = o === "v", u = o === "x", d = a === ",", f = a === ".", p = a >= "0" && a <= "9";
	!i && (s || c || l || u) && e.preventDefault(), t === "0" && !d && !f && a === "0" && e.preventDefault(), t === "0" && p && (n(a), e.preventDefault()), (d || f) && (t || (n("0."), e.preventDefault()), (t?.includes(".") || t?.includes(",")) && e.preventDefault()), !p && !r.includes(a) && !f && !d && e.preventDefault();
} }, x = g`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`, S = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, C = a.CONVERT_SLIPPAGE_TOLERANCE, w = class extends _ {
	constructor() {
		super(), this.unsubscribe = [], this.networkName = f.state.activeCaipNetwork?.name, this.detailsOpen = !1, this.sourceToken = m.state.sourceToken, this.toToken = m.state.toToken, this.toTokenAmount = m.state.toTokenAmount, this.sourceTokenPriceInUSD = m.state.sourceTokenPriceInUSD, this.toTokenPriceInUSD = m.state.toTokenPriceInUSD, this.priceImpact = m.state.priceImpact, this.maxSlippage = m.state.maxSlippage, this.networkTokenSymbol = m.state.networkTokenSymbol, this.inputError = m.state.inputError, this.unsubscribe.push(m.subscribe((e) => {
			this.sourceToken = e.sourceToken, this.toToken = e.toToken, this.toTokenAmount = e.toTokenAmount, this.priceImpact = e.priceImpact, this.maxSlippage = e.maxSlippage, this.sourceTokenPriceInUSD = e.sourceTokenPriceInUSD, this.toTokenPriceInUSD = e.toTokenPriceInUSD, this.inputError = e.inputError;
		}));
	}
	render() {
		let e = this.toTokenAmount && this.maxSlippage ? c.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString() : null;
		if (!this.sourceToken || !this.toToken || this.inputError) return null;
		let t = this.sourceTokenPriceInUSD && this.toTokenPriceInUSD ? 1 / this.toTokenPriceInUSD * this.sourceTokenPriceInUSD : 0;
		return h`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${[
			"0",
			"xs",
			"0",
			"xs"
		]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${c.formatNumberToLocalString(t, 3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${c.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen ? h`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact ? h` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${c.formatNumberToLocalString(this.priceImpact, 3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  ${this.maxSlippage && this.sourceToken.symbol ? h`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${e ? `Transaction will be reversed if you receive less than ${c.formatNumberToLocalString(e, 6)} ${this.toToken.symbol} due to price changes.` : ""}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${c.formatNumberToLocalString(this.maxSlippage, 6)}
                              ${this.toToken.symbol} ${C}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              ` : null}
        </wui-flex>
      </wui-flex>
    `;
	}
	toggleDetails() {
		this.detailsOpen = !this.detailsOpen;
	}
};
w.styles = [x], S([v()], w.prototype, "networkName", void 0), S([y()], w.prototype, "detailsOpen", void 0), S([v()], w.prototype, "sourceToken", void 0), S([v()], w.prototype, "toToken", void 0), S([v()], w.prototype, "toTokenAmount", void 0), S([v()], w.prototype, "sourceTokenPriceInUSD", void 0), S([v()], w.prototype, "toTokenPriceInUSD", void 0), S([v()], w.prototype, "priceImpact", void 0), S([v()], w.prototype, "maxSlippage", void 0), S([v()], w.prototype, "networkTokenSymbol", void 0), S([v()], w.prototype, "inputError", void 0), w = S([n("w3m-swap-details")], w);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-swap-input-skeleton/styles.js
var T = g`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`, E = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, D = class extends _ {
	constructor() {
		super(...arguments), this.target = "sourceToken";
	}
	render() {
		return h`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
	}
	templateTokenSelectButton() {
		return h`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `;
	}
};
D.styles = [T], E([y()], D.prototype, "target", void 0), D = E([n("w3m-swap-input-skeleton")], D);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-swap-input/styles.js
var O = g`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`, k = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, A = 5e-5, j = class extends _ {
	constructor() {
		super(...arguments), this.focused = !1, this.price = 0, this.target = "sourceToken", this.onSetAmount = null, this.onSetMaxValue = null;
	}
	render() {
		let e = this.marketValue || "0", t = c.bigNumber(e).gt("0");
		return h`
      <wui-flex class="${this.focused ? "focus" : ""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${() => this.onFocusChange(!0)}
            @focusout=${() => this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${t ? `$${c.formatNumberToLocalString(this.marketValue, 2)}` : null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
	}
	handleKeydown(e) {
		return b.numericInputKeyDown(e, this.value, (e) => this.onSetAmount?.(this.target, e));
	}
	dispatchInputChangeEvent(e) {
		if (!this.onSetAmount) return;
		let t = e.target.value.replace(/[^0-9.]/gu, "");
		t === "," || t === "." ? this.onSetAmount(this.target, "0.") : t.endsWith(",") ? this.onSetAmount(this.target, t.replace(",", ".")) : this.onSetAmount(this.target, t);
	}
	setMaxValueToInput() {
		this.onSetMaxValue?.(this.target, this.balance);
	}
	templateTokenSelectButton() {
		return this.token ? h`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    ` : h` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`;
	}
	tokenBalanceTemplate() {
		let e = c.multiply(this.balance, this.price), t = e ? e?.gt(A) : !1;
		return h`
      ${t ? h`<wui-text variant="small-400" color="fg-200">
            ${c.formatNumberToLocalString(this.balance, 2)}
          </wui-text>` : null}
      ${this.target === "sourceToken" ? this.tokenActionButtonTemplate(t) : null}
    `;
	}
	tokenActionButtonTemplate(e) {
		return e ? h` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>` : h` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`;
	}
	onFocusChange(e) {
		this.focused = e;
	}
	onSelectToken() {
		s.sendEvent({
			type: "track",
			event: "CLICK_SELECT_TOKEN_TO_SWAP"
		}), u.push("SwapSelectToken", { target: this.target });
	}
	onBuyToken() {
		u.push("OnRampProviders");
	}
};
j.styles = [O], k([y()], j.prototype, "focused", void 0), k([y()], j.prototype, "balance", void 0), k([y()], j.prototype, "value", void 0), k([y()], j.prototype, "price", void 0), k([y()], j.prototype, "marketValue", void 0), k([y()], j.prototype, "disabled", void 0), k([y()], j.prototype, "target", void 0), k([y()], j.prototype, "token", void 0), k([y()], j.prototype, "onSetAmount", void 0), k([y()], j.prototype, "onSetMaxValue", void 0), j = k([n("w3m-swap-input")], j);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-swap-view/styles.js
var M = g`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`, N = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, P = class extends _ {
	constructor() {
		super(), this.unsubscribe = [], this.initialParams = u.state.data?.swap, this.detailsOpen = !1, this.caipAddress = d.state.caipAddress, this.caipNetworkId = f.state.activeCaipNetwork?.caipNetworkId, this.initialized = m.state.initialized, this.loadingQuote = m.state.loadingQuote, this.loadingPrices = m.state.loadingPrices, this.loadingTransaction = m.state.loadingTransaction, this.sourceToken = m.state.sourceToken, this.sourceTokenAmount = m.state.sourceTokenAmount, this.sourceTokenPriceInUSD = m.state.sourceTokenPriceInUSD, this.toToken = m.state.toToken, this.toTokenAmount = m.state.toTokenAmount, this.toTokenPriceInUSD = m.state.toTokenPriceInUSD, this.inputError = m.state.inputError, this.fetchError = m.state.fetchError, this.lastTokenPriceUpdate = 0, this.minTokenPriceUpdateInterval = 1e4, this.visibilityChangeHandler = () => {
			document?.hidden ? (clearInterval(this.interval), this.interval = void 0) : this.startTokenPriceInterval();
		}, this.startTokenPriceInterval = () => {
			this.interval && Date.now() - this.lastTokenPriceUpdate < this.minTokenPriceUpdateInterval || (this.lastTokenPriceUpdate && Date.now() - this.lastTokenPriceUpdate > this.minTokenPriceUpdateInterval && this.fetchTokensAndValues(), clearInterval(this.interval), this.interval = setInterval(() => {
				this.fetchTokensAndValues();
			}, this.minTokenPriceUpdateInterval));
		}, this.watchTokensAndValues = () => {
			!this.sourceToken || !this.toToken || (this.subscribeToVisibilityChange(), this.startTokenPriceInterval());
		}, this.onDebouncedGetSwapCalldata = o.debounce(async () => {
			await m.swapTokens();
		}, 200), f.subscribeKey("activeCaipNetwork", (e) => this.onCaipNetworkChange({
			newCaipNetwork: e,
			resetSwapState: !0,
			initializeSwapState: !1
		})), d.subscribeKey("caipAddress", (e) => this.onCaipAddressChange({
			newCaipAddress: e,
			resetSwapState: !0,
			initializeSwapState: !1
		})), this.unsubscribe.push(f.subscribeKey("activeCaipNetwork", (e) => this.onCaipNetworkChange({
			newCaipNetwork: e,
			resetSwapState: !1,
			initializeSwapState: !0
		})), d.subscribeKey("caipAddress", (e) => this.onCaipAddressChange({
			newCaipAddress: e,
			resetSwapState: !1,
			initializeSwapState: !0
		})), p.subscribeKey("open", (e) => {
			e || m.resetState();
		}), u.subscribeKey("view", (e) => {
			e.includes("Swap") || m.resetValues();
		}), m.subscribe((e) => {
			this.initialized = e.initialized, this.loadingQuote = e.loadingQuote, this.loadingPrices = e.loadingPrices, this.loadingTransaction = e.loadingTransaction, this.sourceToken = e.sourceToken, this.sourceTokenAmount = e.sourceTokenAmount, this.sourceTokenPriceInUSD = e.sourceTokenPriceInUSD, this.toToken = e.toToken, this.toTokenAmount = e.toTokenAmount, this.toTokenPriceInUSD = e.toTokenPriceInUSD, this.inputError = e.inputError, this.fetchError = e.fetchError, e.sourceToken && e.toToken && this.watchTokensAndValues();
		}));
	}
	async firstUpdated() {
		m.initializeState(), this.watchTokensAndValues(), await this.handleSwapParameters();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e?.()), clearInterval(this.interval), document?.removeEventListener("visibilitychange", this.visibilityChangeHandler);
	}
	render() {
		return h`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"l",
			"l"
		]} gap="s">
        ${this.initialized ? this.templateSwap() : this.templateLoading()}
      </wui-flex>
    `;
	}
	subscribeToVisibilityChange() {
		document?.removeEventListener("visibilitychange", this.visibilityChangeHandler), document?.addEventListener("visibilitychange", this.visibilityChangeHandler);
	}
	fetchTokensAndValues() {
		m.getNetworkTokenPrice(), m.getMyTokensWithBalance(), m.swapTokens(), this.lastTokenPriceUpdate = Date.now();
	}
	templateSwap() {
		return h`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken", this.sourceToken)}
          ${this.templateTokenInput("toToken", this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `;
	}
	actionButtonLabel() {
		return this.fetchError ? "Swap" : !this.sourceToken || !this.toToken ? "Select token" : this.sourceTokenAmount ? this.inputError ? this.inputError : "Review swap" : "Enter amount";
	}
	templateReplaceTokensButton() {
		return h`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `;
	}
	templateLoading() {
		return h`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `;
	}
	templateTokenInput(e, t) {
		let n = m.state.myTokensWithBalance?.find((e) => e?.address === t?.address), r = e === "toToken" ? this.toTokenAmount : this.sourceTokenAmount, i = e === "toToken" ? this.toTokenPriceInUSD : this.sourceTokenPriceInUSD, a = c.parseLocalStringToNumber(r) * i;
		return h`<w3m-swap-input
      .value=${e === "toToken" ? this.toTokenAmount : this.sourceTokenAmount}
      .disabled=${e === "toToken"}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${e}
      .token=${t}
      .balance=${n?.quantity?.numeric}
      .price=${n?.price}
      .marketValue=${a}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`;
	}
	onSetMaxValue(e, t) {
		let n = c.bigNumber(t || "0");
		this.handleChangeAmount(e, n.gt(0) ? n.toFixed(20) : "0");
	}
	templateDetails() {
		return !this.sourceToken || !this.toToken || this.inputError ? null : h`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
	}
	handleChangeAmount(e, t) {
		m.clearError(), e === "sourceToken" ? m.setSourceTokenAmount(t) : m.setToTokenAmount(t), this.onDebouncedGetSwapCalldata();
	}
	templateActionButton() {
		let e = !this.toToken || !this.sourceToken, t = !this.sourceTokenAmount, n = this.loadingQuote || this.loadingPrices || this.loadingTransaction, r = n || e || t || this.inputError;
		return h` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${e ? "neutral" : "main"}
        .loading=${n}
        .disabled=${r}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`;
	}
	onSwitchTokens() {
		m.switchTokens();
	}
	async onSwapPreview() {
		this.fetchError && await m.swapTokens(), s.sendEvent({
			type: "track",
			event: "INITIATE_SWAP",
			properties: {
				network: this.caipNetworkId || "",
				swapFromToken: this.sourceToken?.symbol || "",
				swapToToken: this.toToken?.symbol || "",
				swapFromAmount: this.sourceTokenAmount || "",
				swapToAmount: this.toTokenAmount || "",
				isSmartAccount: l(f.state.activeChain) === i.ACCOUNT_TYPES.SMART_ACCOUNT
			}
		}), u.push("SwapPreview");
	}
	async handleSwapParameters() {
		this.initialParams && (m.state.initialized || await new Promise((e) => {
			let t = m.subscribeKey("initialized", (n) => {
				n && (t?.(), e());
			});
		}), await this.setSwapParameters(this.initialParams));
	}
	async setSwapParameters({ amount: e, fromToken: t, toToken: n }) {
		(!m.state.tokens || !m.state.myTokensWithBalance) && await new Promise((e) => {
			let t = m.subscribeKey("myTokensWithBalance", (n) => {
				n && n.length > 0 && (t?.(), e());
			});
			setTimeout(() => {
				t?.(), e();
			}, 5e3);
		});
		let r = [...m.state.tokens || [], ...m.state.myTokensWithBalance || []];
		if (t) {
			let e = r.find((e) => e.symbol.toLowerCase() === t.toLowerCase());
			e && m.setSourceToken(e);
		}
		if (n) {
			let e = r.find((e) => e.symbol.toLowerCase() === n.toLowerCase());
			e && m.setToToken(e);
		}
		e && !isNaN(Number(e)) && m.setSourceTokenAmount(e);
	}
	onCaipAddressChange({ newCaipAddress: e, resetSwapState: t, initializeSwapState: n }) {
		this.caipAddress !== e && (this.caipAddress = e, t && m.resetState(), n && m.initializeState());
	}
	onCaipNetworkChange({ newCaipNetwork: e, resetSwapState: t, initializeSwapState: n }) {
		this.caipNetworkId !== e?.caipNetworkId && (this.caipNetworkId = e?.caipNetworkId, t && m.resetState(), n && m.initializeState());
	}
};
P.styles = M, N([y({ type: Object })], P.prototype, "initialParams", void 0), N([v()], P.prototype, "interval", void 0), N([v()], P.prototype, "detailsOpen", void 0), N([v()], P.prototype, "caipAddress", void 0), N([v()], P.prototype, "caipNetworkId", void 0), N([v()], P.prototype, "initialized", void 0), N([v()], P.prototype, "loadingQuote", void 0), N([v()], P.prototype, "loadingPrices", void 0), N([v()], P.prototype, "loadingTransaction", void 0), N([v()], P.prototype, "sourceToken", void 0), N([v()], P.prototype, "sourceTokenAmount", void 0), N([v()], P.prototype, "sourceTokenPriceInUSD", void 0), N([v()], P.prototype, "toToken", void 0), N([v()], P.prototype, "toTokenAmount", void 0), N([v()], P.prototype, "toTokenPriceInUSD", void 0), N([v()], P.prototype, "inputError", void 0), N([v()], P.prototype, "fetchError", void 0), N([v()], P.prototype, "lastTokenPriceUpdate", void 0), P = N([n("w3m-swap-view")], P);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-swap-preview-view/styles.js
var F = g`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`, I = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, L = class extends _ {
	constructor() {
		super(), this.unsubscribe = [], this.detailsOpen = !0, this.approvalTransaction = m.state.approvalTransaction, this.swapTransaction = m.state.swapTransaction, this.sourceToken = m.state.sourceToken, this.sourceTokenAmount = m.state.sourceTokenAmount ?? "", this.sourceTokenPriceInUSD = m.state.sourceTokenPriceInUSD, this.toToken = m.state.toToken, this.toTokenAmount = m.state.toTokenAmount ?? "", this.toTokenPriceInUSD = m.state.toTokenPriceInUSD, this.caipNetwork = f.state.activeCaipNetwork, this.balanceSymbol = d.state.balanceSymbol, this.inputError = m.state.inputError, this.loadingQuote = m.state.loadingQuote, this.loadingApprovalTransaction = m.state.loadingApprovalTransaction, this.loadingBuildTransaction = m.state.loadingBuildTransaction, this.loadingTransaction = m.state.loadingTransaction, this.unsubscribe.push(d.subscribeKey("balanceSymbol", (e) => {
			this.balanceSymbol !== e && u.goBack();
		}), f.subscribeKey("activeCaipNetwork", (e) => {
			this.caipNetwork !== e && (this.caipNetwork = e);
		}), m.subscribe((e) => {
			this.approvalTransaction = e.approvalTransaction, this.swapTransaction = e.swapTransaction, this.sourceToken = e.sourceToken, this.toToken = e.toToken, this.toTokenPriceInUSD = e.toTokenPriceInUSD, this.sourceTokenAmount = e.sourceTokenAmount ?? "", this.toTokenAmount = e.toTokenAmount ?? "", this.inputError = e.inputError, e.inputError && u.goBack(), this.loadingQuote = e.loadingQuote, this.loadingApprovalTransaction = e.loadingApprovalTransaction, this.loadingBuildTransaction = e.loadingBuildTransaction, this.loadingTransaction = e.loadingTransaction;
		}));
	}
	firstUpdated() {
		m.getTransaction(), this.refreshTransaction();
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e?.()), clearInterval(this.interval);
	}
	render() {
		return h`
      <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"l",
			"l"
		]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `;
	}
	refreshTransaction() {
		this.interval = setInterval(() => {
			m.getApprovalLoadingState() || m.getTransaction();
		}, 1e4);
	}
	templateSwap() {
		let e = `${c.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`, t = `${c.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`, n = parseFloat(this.sourceTokenAmount) * this.sourceTokenPriceInUSD, r = parseFloat(this.toTokenAmount) * this.toTokenPriceInUSD, i = c.formatNumberToLocalString(n), a = c.formatNumberToLocalString(r), o = this.loadingQuote || this.loadingBuildTransaction || this.loadingTransaction || this.loadingApprovalTransaction;
		return h`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${i}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${a}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${o}
            ?disabled=${o}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
	}
	templateDetails() {
		return !this.sourceToken || !this.toToken || this.inputError ? null : h`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
	}
	actionButtonLabel() {
		return this.loadingApprovalTransaction ? "Approving..." : this.approvalTransaction ? "Approve" : "Swap";
	}
	onCancelTransaction() {
		u.goBack();
	}
	onSendTransaction() {
		this.approvalTransaction ? m.sendTransactionForApproval(this.approvalTransaction) : m.sendTransactionForSwap(this.swapTransaction);
	}
};
L.styles = F, I([v()], L.prototype, "interval", void 0), I([v()], L.prototype, "detailsOpen", void 0), I([v()], L.prototype, "approvalTransaction", void 0), I([v()], L.prototype, "swapTransaction", void 0), I([v()], L.prototype, "sourceToken", void 0), I([v()], L.prototype, "sourceTokenAmount", void 0), I([v()], L.prototype, "sourceTokenPriceInUSD", void 0), I([v()], L.prototype, "toToken", void 0), I([v()], L.prototype, "toTokenAmount", void 0), I([v()], L.prototype, "toTokenPriceInUSD", void 0), I([v()], L.prototype, "caipNetwork", void 0), I([v()], L.prototype, "balanceSymbol", void 0), I([v()], L.prototype, "inputError", void 0), I([v()], L.prototype, "loadingQuote", void 0), I([v()], L.prototype, "loadingApprovalTransaction", void 0), I([v()], L.prototype, "loadingBuildTransaction", void 0), I([v()], L.prototype, "loadingTransaction", void 0), L = I([n("w3m-swap-preview-view")], L);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-token-list-item/styles.js
var R = g`
  :host {
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-lg),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    :host > wui-flex:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`, z = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, B = class extends _ {
	constructor() {
		super(), this.observer = new IntersectionObserver(() => void 0), this.imageSrc = void 0, this.name = void 0, this.symbol = void 0, this.price = void 0, this.amount = void 0, this.visible = !1, this.imageError = !1, this.observer = new IntersectionObserver((e) => {
			e.forEach((e) => {
				e.isIntersecting ? this.visible = !0 : this.visible = !1;
			});
		}, { threshold: .1 });
	}
	firstUpdated() {
		this.observer.observe(this);
	}
	disconnectedCallback() {
		this.observer.disconnect();
	}
	render() {
		if (!this.visible) return null;
		let e = this.amount && this.price ? c.multiply(this.price, this.amount)?.toFixed(3) : null;
		return h`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${e ? h`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${c.formatNumberToLocalString(e, 3)}
                  </wui-text>
                ` : null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount ? h`<wui-text variant="small-400" color="fg-200">
                  ${c.formatNumberToLocalString(this.amount, 5)}
                </wui-text>` : null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
	}
	visualTemplate() {
		return this.imageError ? h`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>` : this.imageSrc ? h`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>` : null;
	}
	imageLoadError() {
		this.imageError = !0;
	}
};
B.styles = [
	t,
	e,
	R
], z([y()], B.prototype, "imageSrc", void 0), z([y()], B.prototype, "name", void 0), z([y()], B.prototype, "symbol", void 0), z([y()], B.prototype, "price", void 0), z([y()], B.prototype, "amount", void 0), z([v()], B.prototype, "visible", void 0), z([v()], B.prototype, "imageError", void 0), B = z([n("wui-token-list-item")], B);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-token-list-item-loader/styles.js
var V = g`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`, H = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, U = class extends _ {
	render() {
		return h`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2xs" alignItems="flex-end">
          <wui-shimmer width="24px" height="12px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="32px" height="12px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `;
	}
};
U.styles = [t, V], U = H([n("wui-token-list-item-loader")], U);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-swap-select-token-view/styles.js
var W = g`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`, G = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, K = class extends _ {
	constructor() {
		super(), this.unsubscribe = [], this.targetToken = u.state.data?.target, this.sourceToken = m.state.sourceToken, this.sourceTokenAmount = m.state.sourceTokenAmount, this.toToken = m.state.toToken, this.myTokensWithBalance = m.state.myTokensWithBalance, this.popularTokens = m.state.popularTokens, this.suggestedTokens = m.state.suggestedTokens, this.tokensLoading = m.state.tokensLoading, this.searchValue = "", this.unsubscribe.push(m.subscribe((e) => {
			this.sourceToken = e.sourceToken, this.toToken = e.toToken, this.myTokensWithBalance = e.myTokensWithBalance, this.popularTokens = e.popularTokens, this.suggestedTokens = e.suggestedTokens, this.tokensLoading = e.tokensLoading;
		}));
	}
	async firstUpdated() {
		await m.getTokenList();
	}
	updated() {
		(this.renderRoot?.querySelector(".suggested-tokens-container"))?.addEventListener("scroll", this.handleSuggestedTokensScroll.bind(this)), (this.renderRoot?.querySelector(".tokens"))?.addEventListener("scroll", this.handleTokenListScroll.bind(this));
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		let e = this.renderRoot?.querySelector(".suggested-tokens-container"), t = this.renderRoot?.querySelector(".tokens");
		e?.removeEventListener("scroll", this.handleSuggestedTokensScroll.bind(this)), t?.removeEventListener("scroll", this.handleTokenListScroll.bind(this)), clearInterval(this.interval);
	}
	render() {
		return h`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `;
	}
	onSelectToken(e) {
		this.targetToken === "sourceToken" ? m.setSourceToken(e) : (m.setToToken(e), this.sourceToken && this.sourceTokenAmount && m.swapTokens()), u.goBack();
	}
	templateSearchInput() {
		return h`
      <wui-flex .padding=${[
			"3xs",
			"s",
			"0",
			"s"
		]} gap="xs">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `;
	}
	templateMyTokens() {
		let e = this.myTokensWithBalance ? Object.values(this.myTokensWithBalance) : [], t = this.filterTokensWithText(e, this.searchValue);
		return t?.length > 0 ? h`<wui-flex justifyContent="flex-start" padding="s">
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        ${t.map((e) => {
			let t = e.symbol === this.sourceToken?.symbol || e.symbol === this.toToken?.symbol;
			return h`
            <wui-token-list-item
              data-testid="swap-select-token-item-${e.symbol}"
              name=${e.name}
              ?disabled=${t}
              symbol=${e.symbol}
              price=${e?.price}
              amount=${e?.quantity?.numeric}
              imageSrc=${e.logoUri}
              @click=${() => {
				t || this.onSelectToken(e);
			}}
            >
            </wui-token-list-item>
          `;
		})}` : null;
	}
	templateAllTokens() {
		let e = this.popularTokens ? this.popularTokens : [], t = this.filterTokensWithText(e, this.searchValue);
		return this.tokensLoading ? h`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      ` : t?.length > 0 ? h`
        ${t.map((e) => h`
            <wui-token-list-item
              data-testid="swap-select-token-item-${e.symbol}"
              name=${e.name}
              symbol=${e.symbol}
              imageSrc=${e.logoUri}
              @click=${() => this.onSelectToken(e)}
            >
            </wui-token-list-item>
          `)}
      ` : null;
	}
	templateTokens() {
		return h`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${[
			"0",
			"s",
			"s",
			"s"
		]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `;
	}
	templateSuggestedTokens() {
		let e = this.suggestedTokens ? this.suggestedTokens.slice(0, 8) : null;
		return this.tokensLoading ? h`
        <wui-flex class="suggested-tokens-container" .padding=${[
			"0",
			"s",
			"0",
			"s"
		]} gap="xs">
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      ` : e ? h`
      <wui-flex class="suggested-tokens-container" .padding=${[
			"0",
			"s",
			"0",
			"s"
		]} gap="xs">
        ${e.map((e) => h`
            <wui-token-button
              text=${e.symbol}
              imageSrc=${e.logoUri}
              @click=${() => this.onSelectToken(e)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    ` : null;
	}
	onSearchInputChange(e) {
		this.searchValue = e.detail;
	}
	handleSuggestedTokensScroll() {
		let e = this.renderRoot?.querySelector(".suggested-tokens-container");
		e && (e.style.setProperty("--suggested-tokens-scroll--left-opacity", r.interpolate([0, 100], [0, 1], e.scrollLeft).toString()), e.style.setProperty("--suggested-tokens-scroll--right-opacity", r.interpolate([0, 100], [0, 1], e.scrollWidth - e.scrollLeft - e.offsetWidth).toString()));
	}
	handleTokenListScroll() {
		let e = this.renderRoot?.querySelector(".tokens");
		e && (e.style.setProperty("--tokens-scroll--top-opacity", r.interpolate([0, 100], [0, 1], e.scrollTop).toString()), e.style.setProperty("--tokens-scroll--bottom-opacity", r.interpolate([0, 100], [0, 1], e.scrollHeight - e.scrollTop - e.offsetHeight).toString()));
	}
	filterTokensWithText(e, t) {
		return e.filter((e) => `${e.symbol} ${e.name} ${e.address}`.toLowerCase().includes(t.toLowerCase())).sort((e, n) => {
			let r = `${e.symbol} ${e.name} ${e.address}`.toLowerCase(), i = `${n.symbol} ${n.name} ${n.address}`.toLowerCase();
			return r.indexOf(t.toLowerCase()) - i.indexOf(t.toLowerCase());
		});
	}
};
K.styles = W, G([v()], K.prototype, "interval", void 0), G([v()], K.prototype, "targetToken", void 0), G([v()], K.prototype, "sourceToken", void 0), G([v()], K.prototype, "sourceTokenAmount", void 0), G([v()], K.prototype, "toToken", void 0), G([v()], K.prototype, "myTokensWithBalance", void 0), G([v()], K.prototype, "popularTokens", void 0), G([v()], K.prototype, "suggestedTokens", void 0), G([v()], K.prototype, "tokensLoading", void 0), G([v()], K.prototype, "searchValue", void 0), K = G([n("w3m-swap-select-token-view")], K);
//#endregion
export { L as W3mSwapPreviewView, K as W3mSwapSelectTokenView, P as W3mSwapView };
