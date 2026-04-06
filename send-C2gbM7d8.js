import { a as e, r as t, s as n, t as r } from "./exports-D_wXhA01.js";
import { A as i, N as a, S as o, W as s, _ as c, b as l, c as u, d, p as f, s as p, w as m } from "./ModalController-DHlkqy_7.js";
import { t as h } from "./SwapController-4z3X1f9r.js";
import { i as g, l as _, t as v } from "./lit-CKWVc9vf.js";
import { a as y, o as b, s as x } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-icon-xSC_yRIR.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-separator-DKfel88c.js";
import "./wui-link-d0unVgA5.js";
import "./wui-icon-box-Cxv_9O0m.js";
import { n as S, t as C } from "./ref-Bg7qJIY4.js";
import "./wui-list-token-CuaGloPq.js";
import { n as w, r as T } from "./ConstantsUtil-DD0h4_n4.js";
import "./wui-input-text-wJvlkZd9.js";
import "./wui-token-button-vRkNVK_Y.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-input-address/styles.js
var E = _`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: var(--wui-color-fg-100);
    margin: 0 var(--wui-spacing-xs);
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: var(--w3m-font-family);
    font-size: var(--wui-font-size-medium);
    font-style: normal;
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    letter-spacing: var(--wui-letter-spacing-medium);
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`, D = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, O = class extends v {
	constructor() {
		super(...arguments), this.inputElementRef = C(), this.instructionElementRef = C(), this.instructionHidden = !!this.value, this.pasting = !1, this.onDebouncedSearch = a.debounce(async (e) => {
			if (!e.length) {
				this.setReceiverAddress("");
				return;
			}
			let t = p.state.activeChain;
			if (a.isAddress(e, t)) {
				this.setReceiverAddress(e);
				return;
			}
			try {
				let t = await d.getEnsAddress(e);
				if (t) {
					u.setReceiverProfileName(e), u.setReceiverAddress(t);
					let n = await d.getEnsAvatar(e);
					u.setReceiverProfileImageUrl(n || void 0);
				}
			} catch {
				this.setReceiverAddress(e);
			} finally {
				u.setLoading(!1);
			}
		});
	}
	firstUpdated() {
		this.value && (this.instructionHidden = !0), this.checkHidden();
	}
	render() {
		return g` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${[
			"2xl",
			"l",
			"xl",
			"l"
		]}
    >
      <wui-text
        ${S(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${S(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value ?? ""}
        autocomplete="off"
      >
${this.value ?? ""}</textarea
      >
    </wui-flex>`;
	}
	async focusInput() {
		this.instructionElementRef.value && (this.instructionHidden = !0, await this.toggleInstructionFocus(!1), this.instructionElementRef.value.style.pointerEvents = "none", this.inputElementRef.value?.focus(), this.inputElementRef.value && (this.inputElementRef.value.selectionStart = this.inputElementRef.value.selectionEnd = this.inputElementRef.value.value.length));
	}
	async focusInstruction() {
		this.instructionElementRef.value && (this.instructionHidden = !1, await this.toggleInstructionFocus(!0), this.instructionElementRef.value.style.pointerEvents = "auto", this.inputElementRef.value?.blur());
	}
	async toggleInstructionFocus(e) {
		this.instructionElementRef.value && await this.instructionElementRef.value.animate([{ opacity: e ? 0 : 1 }, { opacity: e ? 1 : 0 }], {
			duration: 100,
			easing: "ease",
			fill: "forwards"
		}).finished;
	}
	onBoxClick() {
		!this.value && !this.instructionHidden && this.focusInput();
	}
	onBlur() {
		!this.value && this.instructionHidden && !this.pasting && this.focusInstruction();
	}
	checkHidden() {
		this.instructionHidden && this.focusInput();
	}
	async onPasteClick() {
		this.pasting = !0;
		let e = await navigator.clipboard.readText();
		u.setReceiverAddress(e), this.focusInput();
	}
	onInputChange(e) {
		let t = e.target;
		this.pasting = !1, this.value = e.target?.value, t.value && !this.instructionHidden && this.focusInput(), u.setLoading(!0), this.onDebouncedSearch(t.value);
	}
	setReceiverAddress(e) {
		u.setReceiverAddress(e), u.setReceiverProfileName(void 0), u.setReceiverProfileImageUrl(void 0), u.setLoading(!1);
	}
};
O.styles = E, D([x()], O.prototype, "value", void 0), D([b()], O.prototype, "instructionHidden", void 0), D([b()], O.prototype, "pasting", void 0), O = D([r("w3m-input-address")], O);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-amount/styles.js
var k = _`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    font-family: var(--wui-font-family);
    color: var(--wui-color-fg-100);

    font-feature-settings: 'case' on;
    font-size: 32px;
    font-weight: var(--wui-font-weight-light);
    caret-color: var(--wui-color-accent-100);
    line-height: 130%;
    letter-spacing: -1.28px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }
`, A = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, j = class extends v {
	constructor() {
		super(...arguments), this.inputElementRef = C(), this.disabled = !1, this.value = "", this.placeholder = "0";
	}
	render() {
		return this.inputElementRef?.value && this.value && (this.inputElementRef.value.value = this.value), g`<input
      ${S(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value ?? ""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `;
	}
	dispatchInputChangeEvent(e) {
		let t = e.data;
		if (t && this.inputElementRef?.value) if (t === ",") {
			let e = this.inputElementRef.value.value.replace(",", ".");
			this.inputElementRef.value.value = e, this.value = `${this.value}${e}`;
		} else w.test(t) || (this.inputElementRef.value.value = this.value.replace(new RegExp(t.replace(T, "\\$&"), "gu"), ""));
		this.dispatchEvent(new CustomEvent("inputChange", {
			detail: this.inputElementRef.value?.value,
			bubbles: !0,
			composed: !0
		}));
	}
};
j.styles = [
	n,
	e,
	k
], A([x({ type: Boolean })], j.prototype, "disabled", void 0), A([x({ type: String })], j.prototype, "value", void 0), A([x({ type: String })], j.prototype, "placeholder", void 0), j = A([r("wui-input-amount")], j);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-input-token/styles.js
var M = _`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
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

  .totalValue {
    width: 100%;
  }
`, N = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, P = class extends v {
	render() {
		return g` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${[
			"xl",
			"s",
			"l",
			"l"
		]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token && !0}
          .value=${this.sendTokenAmount ? String(this.sendTokenAmount) : ""}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`;
	}
	buttonTemplate() {
		return this.token ? g`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>` : g`<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`;
	}
	handleSelectButtonClick() {
		l.push("WalletSendSelectToken");
	}
	sendValueTemplate() {
		if (this.token && this.sendTokenAmount) {
			let e = this.token.price * this.sendTokenAmount;
			return g`<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${e ? `$${s.formatNumberToLocalString(e, 2)}` : "Incorrect value"}</wui-text
      >`;
		}
		return null;
	}
	maxAmountTemplate() {
		return this.token ? this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric) ? g` <wui-text variant="small-400" color="error-100">
          ${t.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
        </wui-text>` : g` <wui-text variant="small-400" color="fg-200">
        ${t.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
      </wui-text>` : null;
	}
	actionTemplate() {
		return this.token ? this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric) ? g`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>` : g`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>` : null;
	}
	onInputChange(e) {
		u.setTokenAmount(e.detail);
	}
	onMaxClick() {
		if (this.token) {
			let e = s.bigNumber(this.token.quantity.numeric);
			u.setTokenAmount(Number(e.toFixed(20)));
		}
	}
	onBuyClick() {
		l.push("OnRampProviders");
	}
};
P.styles = M, N([x({ type: Object })], P.prototype, "token", void 0), N([x({ type: Number })], P.prototype, "sendTokenAmount", void 0), P = N([r("w3m-input-token")], P);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-view/styles.js
var F = _`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xs) !important;
    border: 5px solid var(--wui-color-bg-125);
    background: var(--wui-color-bg-175);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .inputContainer {
    height: fit-content;
  }
`, I = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, L = class extends v {
	constructor() {
		super(), this.unsubscribe = [], this.token = u.state.token, this.sendTokenAmount = u.state.sendTokenAmount, this.receiverAddress = u.state.receiverAddress, this.receiverProfileName = u.state.receiverProfileName, this.loading = u.state.loading, this.message = "Preview Send", this.token && (this.fetchBalances(), this.fetchNetworkPrice()), this.unsubscribe.push(u.subscribe((e) => {
			this.token = e.token, this.sendTokenAmount = e.sendTokenAmount, this.receiverAddress = e.receiverAddress, this.receiverProfileName = e.receiverProfileName, this.loading = e.loading;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return this.getMessage(), g` <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"l",
			"l"
		]}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName ? this.receiverProfileName : this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${[
			"l",
			"0",
			"0",
			"0"
		]}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith("Preview Send")}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`;
	}
	async fetchBalances() {
		await u.fetchTokenBalance(), u.fetchNetworkBalance();
	}
	async fetchNetworkPrice() {
		await h.getNetworkTokenPrice();
	}
	onButtonClick() {
		l.push("WalletSendPreview");
	}
	getMessage() {
		this.message = "Preview Send", this.receiverAddress && !a.isAddress(this.receiverAddress, p.state.activeChain) && (this.message = "Invalid Address"), this.receiverAddress || (this.message = "Add Address"), this.sendTokenAmount && this.token && this.sendTokenAmount > Number(this.token.quantity.numeric) && (this.message = "Insufficient Funds"), this.sendTokenAmount || (this.message = "Add Amount"), this.sendTokenAmount && this.token?.price && (this.sendTokenAmount * this.token.price || (this.message = "Incorrect Value")), this.token || (this.message = "Select Token");
	}
};
L.styles = F, I([b()], L.prototype, "token", void 0), I([b()], L.prototype, "sendTokenAmount", void 0), I([b()], L.prototype, "receiverAddress", void 0), I([b()], L.prototype, "receiverProfileName", void 0), I([b()], L.prototype, "loading", void 0), I([b()], L.prototype, "message", void 0), L = I([r("w3m-wallet-send-view")], L);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-select-token-view/styles.js
var R = _`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }
`, z = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, B = class extends v {
	constructor() {
		super(), this.unsubscribe = [], this.tokenBalances = u.state.tokenBalances, this.search = "", this.onDebouncedSearch = a.debounce((e) => {
			this.search = e;
		}), this.fetchBalancesAndNetworkPrice(), this.unsubscribe.push(u.subscribe((e) => {
			this.tokenBalances = e.tokenBalances;
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return g`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `;
	}
	async fetchBalancesAndNetworkPrice() {
		(!this.tokenBalances || this.tokenBalances?.length === 0) && (await this.fetchBalances(), await this.fetchNetworkPrice());
	}
	async fetchBalances() {
		await u.fetchTokenBalance(), u.fetchNetworkBalance();
	}
	async fetchNetworkPrice() {
		await h.getNetworkTokenPrice();
	}
	templateSearchInput() {
		return g`
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
	}
	templateTokens() {
		return this.tokens = this.tokenBalances?.filter((e) => e.chainId === p.state.activeCaipNetwork?.caipNetworkId), this.search ? this.filteredTokens = this.tokenBalances?.filter((e) => e.name.toLowerCase().includes(this.search.toLowerCase())) : this.filteredTokens = this.tokens, g`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${[
			"0",
			"s",
			"0",
			"s"
		]}
      >
        <wui-flex justifyContent="flex-start" .padding=${[
			"m",
			"s",
			"s",
			"s"
		]}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens && this.filteredTokens.length > 0 ? this.filteredTokens.map((e) => g`<wui-list-token
                    @click=${this.handleTokenClick.bind(this, e)}
                    ?clickable=${!0}
                    tokenName=${e.name}
                    tokenImageUrl=${e.iconUrl}
                    tokenAmount=${e.quantity.numeric}
                    tokenValue=${e.value}
                    tokenCurrency=${e.symbol}
                  ></wui-list-token>`) : g`<wui-flex
                .padding=${[
			"4xl",
			"0",
			"0",
			"0"
		]}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
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
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `;
	}
	onBuyClick() {
		l.push("OnRampProviders");
	}
	onInputChange(e) {
		this.onDebouncedSearch(e.detail);
	}
	handleTokenClick(e) {
		u.setToken(e), u.setTokenAmount(void 0), l.goBack();
	}
};
B.styles = R, z([b()], B.prototype, "tokenBalances", void 0), z([b()], B.prototype, "tokens", void 0), z([b()], B.prototype, "filteredTokens", void 0), z([b()], B.prototype, "search", void 0), B = z([r("w3m-wallet-send-select-token-view")], B);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-preview-item/styles.js
var V = _`
  :host {
    display: flex;
    gap: var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-xs) var(--wui-spacing-2xs)
      var(--wui-spacing-s);
    align-items: center;
  }

  wui-avatar,
  wui-icon,
  wui-image {
    width: 32px;
    height: 32px;
    border: 1px solid var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-002);
  }
`, H = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, U = class extends v {
	constructor() {
		super(...arguments), this.text = "", this.address = "", this.isAddress = !1;
	}
	render() {
		return g`<wui-text variant="large-500" color="fg-100">${this.text}</wui-text>
      ${this.imageTemplate()}`;
	}
	imageTemplate() {
		return this.isAddress ? g`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>` : this.imageSrc ? g`<wui-image src=${this.imageSrc}></wui-image>` : g`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
	}
};
U.styles = [
	n,
	e,
	V
], H([x()], U.prototype, "text", void 0), H([x()], U.prototype, "address", void 0), H([x()], U.prototype, "imageSrc", void 0), H([x({ type: Boolean })], U.prototype, "isAddress", void 0), U = H([r("wui-preview-item")], U);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-content/styles.js
var W = _`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`, G = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, K = class extends v {
	constructor() {
		super(...arguments), this.imageSrc = void 0, this.textTitle = "", this.textValue = void 0;
	}
	render() {
		return g`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue ? "fg-200" : "fg-100"}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `;
	}
	templateContent() {
		return this.imageSrc ? g`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>` : this.textValue ? g` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>` : g`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
	}
};
K.styles = [
	n,
	e,
	W
], G([x()], K.prototype, "imageSrc", void 0), G([x()], K.prototype, "textTitle", void 0), G([x()], K.prototype, "textValue", void 0), K = G([r("wui-list-content")], K);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-send-details/styles.js
var q = _`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: var(--wui-border-radius-1xs);
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-s) var(--wui-spacing-1xs) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }

  wui-text {
    padding: 0 var(--wui-spacing-1xs);
  }

  wui-flex {
    margin-top: var(--wui-spacing-1xs);
  }

  .network {
    cursor: pointer;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  .network:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .network:active {
    background-color: var(--wui-color-gray-glass-010);
  }
`, J = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Y = class extends v {
	render() {
		return g` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content
          textTitle="Address"
          textValue=${t.getTruncateString({
			string: this.receiverAddress ?? "",
			charsStart: 4,
			charsEnd: 4,
			truncate: "middle"
		})}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`;
	}
	networkTemplate() {
		return this.caipNetwork?.name ? g` <wui-list-content
        @click=${() => this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${y(m.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>` : null;
	}
	onNetworkClick(e) {
		e && l.push("Networks", { network: e });
	}
};
Y.styles = q, J([x()], Y.prototype, "receiverAddress", void 0), J([x({ type: Object })], Y.prototype, "caipNetwork", void 0), Y = J([r("w3m-wallet-send-details")], Y);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-preview-view/styles.js
var X = _`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: var(--wui-border-radius-3xl);
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }
`, Z = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, Q = class extends v {
	constructor() {
		super(), this.unsubscribe = [], this.token = u.state.token, this.sendTokenAmount = u.state.sendTokenAmount, this.receiverAddress = u.state.receiverAddress, this.receiverProfileName = u.state.receiverProfileName, this.receiverProfileImageUrl = u.state.receiverProfileImageUrl, this.caipNetwork = p.state.activeCaipNetwork, this.loading = u.state.loading, this.unsubscribe.push(u.subscribe((e) => {
			this.token = e.token, this.sendTokenAmount = e.sendTokenAmount, this.receiverAddress = e.receiverAddress, this.receiverProfileName = e.receiverProfileName, this.receiverProfileImageUrl = e.receiverProfileImageUrl, this.loading = e.loading;
		}), p.subscribeKey("activeCaipNetwork", (e) => this.caipNetwork = e));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		return g` <wui-flex flexDirection="column" .padding=${[
			"0",
			"l",
			"l",
			"l"
		]}>
      <wui-flex gap="xs" flexDirection="column" .padding=${[
			"0",
			"xs",
			"0",
			"xs"
		]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="4xs">
            <wui-text variant="small-400" color="fg-150">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount ? t.roundNumber(this.sendTokenAmount, 6, 5) : "unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="fg-200" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="small-400" color="fg-150">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName ? t.getTruncateString({
			string: this.receiverProfileName,
			charsStart: 20,
			charsEnd: 0,
			truncate: "end"
		}) : t.getTruncateString({
			string: this.receiverAddress ? this.receiverAddress : "",
			charsStart: 4,
			charsEnd: 4,
			truncate: "middle"
		})}"
            address=${this.receiverAddress ?? ""}
            .imageSrc=${this.receiverProfileImageUrl ?? void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${[
			"xxl",
			"0",
			"0",
			"0"
		]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="xxs" .padding=${[
			"s",
			"0",
			"0",
			"0"
		]}>
          <wui-icon size="sm" color="fg-200" name="warningCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="s" .padding=${[
			"l",
			"0",
			"0",
			"0"
		]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="main"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`;
	}
	sendValueTemplate() {
		return this.token && this.sendTokenAmount ? g`<wui-text variant="paragraph-400" color="fg-100"
        >$${(this.token.price * this.sendTokenAmount).toFixed(2)}</wui-text
      >` : null;
	}
	async onSendClick() {
		if (!this.sendTokenAmount || !this.receiverAddress) {
			f.showError("Please enter a valid amount and receiver address");
			return;
		}
		try {
			await u.sendToken(), f.showSuccess("Transaction started"), l.replace("Account");
		} catch (e) {
			f.showError("Failed to send transaction. Please try again."), console.error("SendController:sendToken - failed to send transaction", e);
			let t = e instanceof Error ? e.message : "Unknown error";
			o.sendEvent({
				type: "track",
				event: "SEND_ERROR",
				properties: {
					message: t,
					isSmartAccount: c(p.state.activeChain) === i.ACCOUNT_TYPES.SMART_ACCOUNT,
					token: this.token?.symbol || "",
					amount: this.sendTokenAmount,
					network: p.state.activeCaipNetwork?.caipNetworkId || ""
				}
			});
		}
	}
	onCancelClick() {
		l.goBack();
	}
};
Q.styles = X, Z([b()], Q.prototype, "token", void 0), Z([b()], Q.prototype, "sendTokenAmount", void 0), Z([b()], Q.prototype, "receiverAddress", void 0), Z([b()], Q.prototype, "receiverProfileName", void 0), Z([b()], Q.prototype, "receiverProfileImageUrl", void 0), Z([b()], Q.prototype, "caipNetwork", void 0), Z([b()], Q.prototype, "loading", void 0), Q = Z([r("w3m-wallet-send-preview-view")], Q);
//#endregion
export { B as W3mSendSelectTokenView, Q as W3mWalletSendPreviewView, L as W3mWalletSendView };
