import { t as e } from "./exports-D_wXhA01.js";
import { K as t, M as n, N as r, S as i, b as a, d as o, p as s, s as c, t as l, v as u } from "./ModalController-DHlkqy_7.js";
import { t as d } from "./ConstantsUtil-DozDCknC.js";
import { i as f, l as p, t as m } from "./lit-CKWVc9vf.js";
import { o as h } from "./wui-text-ec7ybml8.js";
import "./wui-button-BM14n8Pn.js";
import "./wui-link-d0unVgA5.js";
import { t as g } from "./w3m-email-otp-widget-BokV8GST.js";
import "./wui-icon-box-Cxv_9O0m.js";
import { n as _, t as v } from "./ref-Bg7qJIY4.js";
import "./wui-email-input-DvdYlafC.js";
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-verify-otp-view/index.js
var y = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, b = class extends g {
	constructor() {
		super(...arguments), this.onOtpSubmit = async (e) => {
			try {
				if (this.authConnector) {
					let t = c.state.activeChain, r = o.getConnections(t), u = n.state.remoteFeatures?.multiWallet, d = r.length > 0;
					if (await this.authConnector.provider.connectOtp({ otp: e }), i.sendEvent({
						type: "track",
						event: "EMAIL_VERIFICATION_CODE_PASS"
					}), t) await o.connectExternal(this.authConnector, t);
					else throw Error("Active chain is not set on ChainControll");
					if (i.sendEvent({
						type: "track",
						event: "CONNECT_SUCCESS",
						properties: {
							method: "email",
							name: this.authConnector.name || "Unknown"
						}
					}), n.state.remoteFeatures?.emailCapture) return;
					if (n.state.siwx) {
						l.close();
						return;
					}
					if (d && u) {
						a.replace("ProfileWallets"), s.showSuccess("New Wallet Added");
						return;
					}
					l.close();
				}
			} catch (e) {
				throw i.sendEvent({
					type: "track",
					event: "EMAIL_VERIFICATION_CODE_FAIL",
					properties: { message: r.parseError(e) }
				}), e;
			}
		}, this.onOtpResend = async (e) => {
			this.authConnector && (await this.authConnector.provider.connectEmail({ email: e }), i.sendEvent({
				type: "track",
				event: "EMAIL_VERIFICATION_CODE_SENT"
			}));
		};
	}
};
b = y([e("w3m-email-verify-otp-view")], b);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-verify-device-view/styles.js
var x = p`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`, S = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, C = class extends m {
	constructor() {
		super(), this.email = a.state.data?.email, this.authConnector = u.getAuthConnector(), this.loading = !1, this.listenForDeviceApproval();
	}
	render() {
		if (!this.email) throw Error("w3m-email-verify-device-view: No email provided");
		if (!this.authConnector) throw Error("w3m-email-verify-device-view: No auth connector provided");
		return f`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${[
			"xxl",
			"s",
			"xxl",
			"s"
		]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
	}
	async listenForDeviceApproval() {
		if (this.authConnector) try {
			await this.authConnector.provider.connectDevice(), i.sendEvent({
				type: "track",
				event: "DEVICE_REGISTERED_FOR_EMAIL"
			}), i.sendEvent({
				type: "track",
				event: "EMAIL_VERIFICATION_CODE_SENT"
			}), a.replace("EmailVerifyOtp", { email: this.email });
		} catch {
			a.goBack();
		}
	}
	async onResendCode() {
		try {
			if (!this.loading) {
				if (!this.authConnector || !this.email) throw Error("w3m-email-login-widget: Unable to resend email");
				this.loading = !0, await this.authConnector.provider.connectEmail({ email: this.email }), this.listenForDeviceApproval(), s.showSuccess("Code email resent");
			}
		} catch (e) {
			s.showError(e);
		} finally {
			this.loading = !1;
		}
	}
};
C.styles = x, S([h()], C.prototype, "loading", void 0), C = S([e("w3m-email-verify-device-view")], C);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-wallet-view/styles.js
var w = p`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`, T = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, E = class extends m {
	constructor() {
		super(...arguments), this.formRef = v(), this.initialEmail = a.state.data?.email ?? "", this.redirectView = a.state.data?.redirectView, this.email = "", this.loading = !1;
	}
	firstUpdated() {
		this.formRef.value?.addEventListener("keydown", (e) => {
			e.key === "Enter" && this.onSubmitEmail(e);
		});
	}
	render() {
		return f`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${_(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `;
	}
	onEmailInputChange(e) {
		this.email = e.detail;
	}
	async onSubmitEmail(e) {
		try {
			if (this.loading) return;
			this.loading = !0, e.preventDefault();
			let t = u.getAuthConnector();
			if (!t) throw Error("w3m-update-email-wallet: Auth connector not found");
			let n = await t.provider.updateEmail({ email: this.email });
			i.sendEvent({
				type: "track",
				event: "EMAIL_EDIT"
			}), n.action === "VERIFY_SECONDARY_OTP" ? a.push("UpdateEmailSecondaryOtp", {
				email: this.initialEmail,
				newEmail: this.email,
				redirectView: this.redirectView
			}) : a.push("UpdateEmailPrimaryOtp", {
				email: this.initialEmail,
				newEmail: this.email,
				redirectView: this.redirectView
			});
		} catch (e) {
			s.showError(e), this.loading = !1;
		}
	}
	buttonsTemplate() {
		let e = !this.loading && this.email.length > 3 && this.email !== this.initialEmail;
		return this.redirectView ? f`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${a.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    ` : f`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `;
	}
};
E.styles = w, T([h()], E.prototype, "email", void 0), T([h()], E.prototype, "loading", void 0), E = T([e("w3m-update-email-wallet-view")], E);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-primary-otp-view/index.js
var D = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, O = class extends g {
	constructor() {
		super(), this.email = a.state.data?.email, this.onOtpSubmit = async (e) => {
			try {
				this.authConnector && (await this.authConnector.provider.updateEmailPrimaryOtp({ otp: e }), i.sendEvent({
					type: "track",
					event: "EMAIL_VERIFICATION_CODE_PASS"
				}), a.replace("UpdateEmailSecondaryOtp", a.state.data));
			} catch (e) {
				throw i.sendEvent({
					type: "track",
					event: "EMAIL_VERIFICATION_CODE_FAIL",
					properties: { message: r.parseError(e) }
				}), e;
			}
		}, this.onStartOver = () => {
			a.replace("UpdateEmailWallet", a.state.data);
		};
	}
};
O = D([e("w3m-update-email-primary-otp-view")], O);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-secondary-otp-view/index.js
var k = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, A = class extends g {
	constructor() {
		super(), this.email = a.state.data?.newEmail, this.redirectView = a.state.data?.redirectView, this.onOtpSubmit = async (e) => {
			try {
				this.authConnector && (await this.authConnector.provider.updateEmailSecondaryOtp({ otp: e }), i.sendEvent({
					type: "track",
					event: "EMAIL_VERIFICATION_CODE_PASS"
				}), this.redirectView && a.reset(this.redirectView));
			} catch (e) {
				throw i.sendEvent({
					type: "track",
					event: "EMAIL_VERIFICATION_CODE_FAIL",
					properties: { message: r.parseError(e) }
				}), e;
			}
		}, this.onStartOver = () => {
			a.replace("UpdateEmailWallet", a.state.data);
		};
	}
};
A = k([e("w3m-update-email-secondary-otp-view")], A);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-login-view/index.js
var j = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, M = class extends m {
	constructor() {
		super(), this.authConnector = u.getAuthConnector(), this.isEmailEnabled = n.state.remoteFeatures?.email, this.isAuthEnabled = this.checkIfAuthEnabled(u.state.connectors), this.connectors = u.state.connectors, u.subscribeKey("connectors", (e) => {
			this.connectors = e, this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
		});
	}
	render() {
		if (!this.isEmailEnabled) throw Error("w3m-email-login-view: Email is not enabled");
		if (!this.isAuthEnabled) throw Error("w3m-email-login-view: No auth connector provided");
		return f`<wui-flex
      flexDirection="column"
      .padding=${[
			"3xs",
			"m",
			"m",
			"m"
		]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `;
	}
	checkIfAuthEnabled(e) {
		let n = e.filter((e) => e.type === d.CONNECTOR_TYPE_AUTH).map((e) => e.chain);
		return t.AUTH_CONNECTOR_SUPPORTED_CHAINS.some((e) => n.includes(e));
	}
};
j([h()], M.prototype, "connectors", void 0), M = j([e("w3m-email-login-view")], M);
//#endregion
export { M as W3mEmailLoginView, g as W3mEmailOtpWidget, C as W3mEmailVerifyDeviceView, b as W3mEmailVerifyOtpView, O as W3mUpdateEmailPrimaryOtpView, A as W3mUpdateEmailSecondaryOtpView, E as W3mUpdateEmailWalletView };
