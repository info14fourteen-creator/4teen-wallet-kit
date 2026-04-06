import { a as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { K as r, N as i, P as a, S as o, b as s, p as c, r as l, s as u, v as d } from "./ModalController-DHlkqy_7.js";
import { i as f, l as p, t as m } from "./lit-CKWVc9vf.js";
import { a as h, s as g } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/SocialsUtil.js
function _() {
	try {
		return i.returnOpenHref(`${r.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
	} catch {
		throw Error("Could not open social popup");
	}
}
async function v() {
	s.push("ConnectingFarcaster");
	let e = d.getAuthConnector();
	if (e && !l.state.farcasterUrl) try {
		let { url: t } = await e.provider.getFarcasterUri();
		l.setFarcasterUrl(t, u.state.activeChain);
	} catch (e) {
		s.goBack(), c.showError(e);
	}
}
async function y(e) {
	s.push("ConnectingSocial");
	let t = d.getAuthConnector(), n = null;
	try {
		let r = setTimeout(() => {
			throw Error("Social login timed out. Please try again.");
		}, 45e3);
		if (t && e) {
			if (i.isTelegram() || (n = _()), n) l.setSocialWindow(n, u.state.activeChain);
			else if (!i.isTelegram()) throw Error("Could not create social popup");
			let { uri: o } = await t.provider.getSocialRedirectUri({ provider: e });
			if (!o) throw n?.close(), Error("Could not fetch the social redirect uri");
			if (n && (n.location.href = o), i.isTelegram()) {
				a.setTelegramSocialProvider(e);
				let t = i.formatTelegramSocialLoginUrl(o);
				i.openHref(t, "_top");
			}
			clearTimeout(r);
		}
	} catch (e) {
		n?.close(), c.showError(e?.message);
	}
}
async function b(e) {
	l.setSocialProvider(e, u.state.activeChain), o.sendEvent({
		type: "track",
		event: "SOCIAL_LOGIN_STARTED",
		properties: { provider: e }
	}), e === "farcaster" ? await v() : await y(e);
}
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo/styles.js
var x = p`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`, S = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, C = class extends m {
	constructor() {
		super(...arguments), this.logo = "google";
	}
	render() {
		return f`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `;
	}
};
C.styles = [t, x], S([g()], C.prototype, "logo", void 0), C = S([n("wui-logo")], C);
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-social/styles.js
var w = p`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`, T = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, E = class extends m {
	constructor() {
		super(...arguments), this.logo = "google", this.name = "Continue with google", this.align = "left", this.disabled = !1;
	}
	render() {
		return f`
      <button ?disabled=${this.disabled} tabindex=${h(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `;
	}
	templatePlacement() {
		return this.align === "center" ? f` <wui-logo class="invisible" logo=${this.logo}></wui-logo>` : null;
	}
};
E.styles = [
	t,
	e,
	w
], T([g()], E.prototype, "logo", void 0), T([g()], E.prototype, "name", void 0), T([g()], E.prototype, "align", void 0), T([g()], E.prototype, "tabIdx", void 0), T([g({ type: Boolean })], E.prototype, "disabled", void 0), E = T([n("wui-list-social")], E);
//#endregion
export { b as t };
