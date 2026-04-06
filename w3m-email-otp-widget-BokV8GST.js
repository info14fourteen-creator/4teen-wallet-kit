import { a as e, r as t, s as n, t as r } from "./exports-D_wXhA01.js";
import { N as i, b as a, p as o, v as s } from "./ModalController-DHlkqy_7.js";
import { t as c } from "./W3mFrameHelpers-BVt-hf8v.js";
import { i as l, l as u, t as d } from "./lit-CKWVc9vf.js";
import { o as f, s as p } from "./wui-text-ec7ybml8.js";
import "./wui-loading-spinner-CgnUakaY.js";
import "./wui-link-d0unVgA5.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-numeric/styles.js
var m = u`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
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

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`, h = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, g = class extends d {
	constructor() {
		super(...arguments), this.disabled = !1, this.value = "";
	}
	render() {
		return l`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `;
	}
};
g.styles = [
	n,
	e,
	m
], h([p({ type: Boolean })], g.prototype, "disabled", void 0), h([p({ type: String })], g.prototype, "value", void 0), g = h([r("wui-input-numeric")], g);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-otp/styles.js
var _ = u`
  :host {
    position: relative;
    display: block;
  }
`, v = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, y = class extends d {
	constructor() {
		super(...arguments), this.length = 6, this.otp = "", this.values = Array.from({ length: this.length }).map(() => ""), this.numerics = [], this.shouldInputBeEnabled = (e) => this.values.slice(0, e).every((e) => e !== ""), this.handleKeyDown = (e, t) => {
			let n = e.target, r = this.getInputElement(n), i = [
				"ArrowLeft",
				"ArrowRight",
				"Shift",
				"Delete"
			];
			if (!r) return;
			i.includes(e.key) && e.preventDefault();
			let a = r.selectionStart;
			switch (e.key) {
				case "ArrowLeft":
					a && r.setSelectionRange(a + 1, a + 1), this.focusInputField("prev", t);
					break;
				case "ArrowRight":
					this.focusInputField("next", t);
					break;
				case "Shift":
					this.focusInputField("next", t);
					break;
				case "Delete":
					r.value === "" ? this.focusInputField("prev", t) : this.updateInput(r, t, "");
					break;
				case "Backspace":
					r.value === "" ? this.focusInputField("prev", t) : this.updateInput(r, t, "");
					break;
				default:
			}
		}, this.focusInputField = (e, t) => {
			if (e === "next") {
				let e = t + 1;
				if (!this.shouldInputBeEnabled(e)) return;
				let n = this.numerics[e < this.length ? e : t], r = n ? this.getInputElement(n) : void 0;
				r && (r.disabled = !1, r.focus());
			}
			if (e === "prev") {
				let e = t - 1, n = this.numerics[e > -1 ? e : t], r = n ? this.getInputElement(n) : void 0;
				r && r.focus();
			}
		};
	}
	firstUpdated() {
		this.otp && (this.values = this.otp.split(""));
		let e = this.shadowRoot?.querySelectorAll("wui-input-numeric");
		e && (this.numerics = Array.from(e)), this.numerics[0]?.focus();
	}
	render() {
		return l`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({ length: this.length }).map((e, t) => l`
            <wui-input-numeric
              @input=${(e) => this.handleInput(e, t)}
              @click=${(e) => this.selectInput(e)}
              @keydown=${(e) => this.handleKeyDown(e, t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t] || ""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `;
	}
	updateInput(e, t, n) {
		let r = this.numerics[t], i = e || (r ? this.getInputElement(r) : void 0);
		i && (i.value = n, this.values = this.values.map((e, r) => r === t ? n : e));
	}
	selectInput(e) {
		let t = e.target;
		t && this.getInputElement(t)?.select();
	}
	handleInput(e, n) {
		let r = e.target, i = this.getInputElement(r);
		if (i) {
			let r = i.value;
			e.inputType === "insertFromPaste" ? this.handlePaste(i, r, n) : t.isNumber(r) && e.data ? (this.updateInput(i, n, e.data), this.focusInputField("next", n)) : this.updateInput(i, n, "");
		}
		this.dispatchInputChangeEvent();
	}
	handlePaste(e, n, r) {
		let i = n[0];
		if (i && t.isNumber(i)) {
			this.updateInput(e, r, i);
			let t = n.substring(1);
			if (r + 1 < this.length && t.length) {
				let e = this.numerics[r + 1], n = e ? this.getInputElement(e) : void 0;
				n && this.handlePaste(n, t, r + 1);
			} else this.focusInputField("next", r);
		} else this.updateInput(e, r, "");
	}
	getInputElement(e) {
		return e.shadowRoot?.querySelector("input") ? e.shadowRoot.querySelector("input") : null;
	}
	dispatchInputChangeEvent() {
		let e = this.values.join("");
		this.dispatchEvent(new CustomEvent("inputChange", {
			detail: e,
			bubbles: !0,
			composed: !0
		}));
	}
};
y.styles = [n, _], v([p({ type: Number })], y.prototype, "length", void 0), v([p({ type: String })], y.prototype, "otp", void 0), v([f()], y.prototype, "values", void 0), y = v([r("wui-otp")], y);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-email-otp-widget/styles.js
var b = u`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`, x = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, S, C = S = class extends d {
	firstUpdated() {
		this.startOTPTimeout();
	}
	disconnectedCallback() {
		clearTimeout(this.OTPTimeout);
	}
	constructor() {
		super(), this.loading = !1, this.timeoutTimeLeft = c.getTimeToNextEmailLogin(), this.error = "", this.otp = "", this.email = a.state.data?.email, this.authConnector = s.getAuthConnector();
	}
	render() {
		if (!this.email) throw Error("w3m-email-otp-widget: No email provided");
		let e = !!this.timeoutTimeLeft, t = this.getFooterLabels(e);
		return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"l",
			"0",
			"l",
			"0"
		]}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${[
			"0",
			"xl",
			"0",
			"xl"
		]}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading ? l`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>` : l` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error ? l`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  ` : null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
	}
	startOTPTimeout() {
		this.timeoutTimeLeft = c.getTimeToNextEmailLogin(), this.OTPTimeout = setInterval(() => {
			this.timeoutTimeLeft > 0 ? this.timeoutTimeLeft = c.getTimeToNextEmailLogin() : clearInterval(this.OTPTimeout);
		}, 1e3);
	}
	async onOtpInputChange(e) {
		try {
			this.loading || (this.otp = e.detail, this.shouldSubmitOnOtpChange() && (this.loading = !0, await this.onOtpSubmit?.(this.otp)));
		} catch (e) {
			this.error = i.parseError(e), this.loading = !1;
		}
	}
	async onResendCode() {
		try {
			if (this.onOtpResend) {
				if (!this.loading && !this.timeoutTimeLeft) {
					if (this.error = "", this.otp = "", !s.getAuthConnector() || !this.email) throw Error("w3m-email-otp-widget: Unable to resend email");
					this.loading = !0, await this.onOtpResend(this.email), this.startOTPTimeout(), o.showSuccess("Code email resent");
				}
			} else this.onStartOver && this.onStartOver();
		} catch (e) {
			o.showError(e);
		} finally {
			this.loading = !1;
		}
	}
	getFooterLabels(e) {
		return this.onStartOver ? {
			title: "Something wrong?",
			action: `Try again ${e ? `in ${this.timeoutTimeLeft}s` : ""}`
		} : {
			title: "Didn't receive it?",
			action: `Resend ${e ? `in ${this.timeoutTimeLeft}s` : "Code"}`
		};
	}
	shouldSubmitOnOtpChange() {
		return this.authConnector && this.otp.length === S.OTP_LENGTH;
	}
};
C.OTP_LENGTH = 6, C.styles = b, x([f()], C.prototype, "loading", void 0), x([f()], C.prototype, "timeoutTimeLeft", void 0), x([f()], C.prototype, "error", void 0), C = S = x([r("w3m-email-otp-widget")], C);
//#endregion
export { C as t };
