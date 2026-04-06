import { i as e, s as t, t as n } from "./exports-D_wXhA01.js";
import { a as r, i, l as a, r as o, t as s } from "./lit-CKWVc9vf.js";
import { i as c, n as l, r as u, s as d } from "./wui-text-ec7ybml8.js";
//#region node_modules/lit-html/directive-helpers.js
var { I: f } = r, p = (e) => e === null || typeof e != "object" && typeof e != "function", m = (e) => e.strings === void 0, h = (e, t) => {
	let n = e._$AN;
	if (n === void 0) return !1;
	for (let e of n) e._$AO?.(t, !1), h(e, t);
	return !0;
}, g = (e) => {
	let t, n;
	do {
		if ((t = e._$AM) === void 0) break;
		n = t._$AN, n.delete(e), e = t;
	} while (n?.size === 0);
}, _ = (e) => {
	for (let t; t = e._$AM; e = t) {
		let n = t._$AN;
		if (n === void 0) t._$AN = n = /* @__PURE__ */ new Set();
		else if (n.has(e)) break;
		n.add(e), b(t);
	}
};
function v(e) {
	this._$AN === void 0 ? this._$AM = e : (g(this), this._$AM = e, _(this));
}
function y(e, t = !1, n = 0) {
	let r = this._$AH, i = this._$AN;
	if (i !== void 0 && i.size !== 0) if (t) if (Array.isArray(r)) for (let e = n; e < r.length; e++) h(r[e], !1), g(r[e]);
	else r != null && (h(r, !1), g(r));
	else h(this, e);
}
var b = (e) => {
	e.type == c.CHILD && (e._$AP ?? (e._$AP = y), e._$AQ ?? (e._$AQ = v));
}, x = class extends u {
	constructor() {
		super(...arguments), this._$AN = void 0;
	}
	_$AT(e, t, n) {
		super._$AT(e, t, n), _(this), this.isConnected = e._$AU;
	}
	_$AO(e, t = !0) {
		e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (h(this, e), g(this));
	}
	setValue(e) {
		if (m(this._$Ct)) this._$Ct._$AI(e, this);
		else {
			let t = [...this._$Ct._$AH];
			t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
		}
	}
	disconnected() {}
	reconnected() {}
}, S = class {
	constructor(e) {
		this.G = e;
	}
	disconnect() {
		this.G = void 0;
	}
	reconnect(e) {
		this.G = e;
	}
	deref() {
		return this.G;
	}
}, C = class {
	constructor() {
		this.Y = void 0, this.Z = void 0;
	}
	get() {
		return this.Y;
	}
	pause() {
		this.Y ?? (this.Y = new Promise((e) => this.Z = e));
	}
	resume() {
		this.Z?.(), this.Y = this.Z = void 0;
	}
}, w = (e) => !p(e) && typeof e.then == "function", T = 1073741823, E = l(class extends x {
	constructor() {
		super(...arguments), this._$Cwt = T, this._$Cbt = [], this._$CK = new S(this), this._$CX = new C();
	}
	render(...e) {
		return e.find((e) => !w(e)) ?? o;
	}
	update(e, t) {
		let n = this._$Cbt, r = n.length;
		this._$Cbt = t;
		let i = this._$CK, a = this._$CX;
		this.isConnected || this.disconnected();
		for (let e = 0; e < t.length && !(e > this._$Cwt); e++) {
			let o = t[e];
			if (!w(o)) return this._$Cwt = e, o;
			e < r && o === n[e] || (this._$Cwt = T, r = 0, Promise.resolve(o).then(async (e) => {
				for (; a.get();) await a.get();
				let t = i.deref();
				if (t !== void 0) {
					let n = t._$Cbt.indexOf(o);
					n > -1 && n < t._$Cwt && (t._$Cwt = n, t.setValue(e));
				}
			}));
		}
		return o;
	}
	disconnected() {
		this._$CK.disconnect(), this._$CX.pause();
	}
	reconnected() {
		this._$CK.reconnect(this), this._$CX.resume();
	}
}), D = new class {
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
	}
	set(e, t) {
		this.cache.set(e, t);
	}
	get(e) {
		return this.cache.get(e);
	}
	has(e) {
		return this.cache.has(e);
	}
	delete(e) {
		this.cache.delete(e);
	}
	clear() {
		this.cache.clear();
	}
}(), O = a`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`, k = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, A = {
	add: async () => (await import("./add-CTtVon4h.js")).addSvg,
	allWallets: async () => (await import("./all-wallets-oEUkCdPC.js")).allWalletsSvg,
	arrowBottomCircle: async () => (await import("./arrow-bottom-circle-P4KGYjtG.js")).arrowBottomCircleSvg,
	appStore: async () => (await import("./app-store-SlLXvX8I.js")).appStoreSvg,
	apple: async () => (await import("./apple-BhR1c4sU.js")).appleSvg,
	arrowBottom: async () => (await import("./arrow-bottom-xB6MGeOS.js")).arrowBottomSvg,
	arrowLeft: async () => (await import("./arrow-left-BM1zreC7.js")).arrowLeftSvg,
	arrowRight: async () => (await import("./arrow-right-B6r0_DYt.js")).arrowRightSvg,
	arrowTop: async () => (await import("./arrow-top-CRVLeBvg.js")).arrowTopSvg,
	bank: async () => (await import("./bank-DGPVVWVQ.js")).bankSvg,
	browser: async () => (await import("./browser-By7fnJCb.js")).browserSvg,
	bin: async () => (await import("./bin-CTX7jzVV.js")).binSvg,
	bitcoin: async () => (await import("./bitcoin-Ad4s6QyJ.js")).bitcoinSvg,
	card: async () => (await import("./card-UxCbNagx.js")).cardSvg,
	checkmark: async () => (await import("./checkmark-_XZ0KZ5c.js")).checkmarkSvg,
	checkmarkBold: async () => (await import("./checkmark-bold-BAOC1sp2.js")).checkmarkBoldSvg,
	chevronBottom: async () => (await import("./chevron-bottom-BjvR7edU.js")).chevronBottomSvg,
	chevronLeft: async () => (await import("./chevron-left-oY8EBUK2.js")).chevronLeftSvg,
	chevronRight: async () => (await import("./chevron-right-CiOf7DMM.js")).chevronRightSvg,
	chevronTop: async () => (await import("./chevron-top-DYkSn-M3.js")).chevronTopSvg,
	chromeStore: async () => (await import("./chrome-store-sXJl_zEp.js")).chromeStoreSvg,
	clock: async () => (await import("./clock-CcGuF1Zh.js")).clockSvg,
	close: async () => (await import("./close-2RnJTFo9.js")).closeSvg,
	compass: async () => (await import("./compass-BZSiuhDT.js")).compassSvg,
	coinPlaceholder: async () => (await import("./coinPlaceholder-Dbfwd2aV.js")).coinPlaceholderSvg,
	copy: async () => (await import("./copy-Dp4AB1Cm.js")).copySvg,
	cursor: async () => (await import("./cursor-C2ueB-90.js")).cursorSvg,
	cursorTransparent: async () => (await import("./cursor-transparent-FDhtf199.js")).cursorTransparentSvg,
	circle: async () => (await import("./circle-Ctv93JAp.js")).circleSvg,
	desktop: async () => (await import("./desktop-B8C-Un34.js")).desktopSvg,
	disconnect: async () => (await import("./disconnect-3S7_3X8i.js")).disconnectSvg,
	discord: async () => (await import("./discord-DdW4fMnU.js")).discordSvg,
	download: async () => (await import("./download-BP9LJm3k.js")).downloadSvg,
	ethereum: async () => (await import("./ethereum-IQ58jpsa.js")).ethereumSvg,
	etherscan: async () => (await import("./etherscan-MEyBsbfs.js")).etherscanSvg,
	extension: async () => (await import("./extension-D69Ha0CP.js")).extensionSvg,
	externalLink: async () => (await import("./external-link-BEGpjTO8.js")).externalLinkSvg,
	facebook: async () => (await import("./facebook-DS-kV1A0.js")).facebookSvg,
	farcaster: async () => (await import("./farcaster-SrNNLgqq.js")).farcasterSvg,
	filters: async () => (await import("./filters-BYRfwYWs.js")).filtersSvg,
	github: async () => (await import("./github-Dn9gQawA.js")).githubSvg,
	google: async () => (await import("./google-BjBBlu4y.js")).googleSvg,
	helpCircle: async () => (await import("./help-circle-RsIt6w5W.js")).helpCircleSvg,
	image: async () => (await import("./image-BtvefEo0.js")).imageSvg,
	id: async () => (await import("./id-C7JBEmbn.js")).idSvg,
	infoCircle: async () => (await import("./info-circle-COMGbmQk.js")).infoCircleSvg,
	lightbulb: async () => (await import("./lightbulb-IH0aiRJV.js")).lightbulbSvg,
	mail: async () => (await import("./mail-BeA_TUEg.js")).mailSvg,
	mobile: async () => (await import("./mobile-Bbyr8kxu.js")).mobileSvg,
	more: async () => (await import("./more-DLtJINBx.js")).moreSvg,
	networkPlaceholder: async () => (await import("./network-placeholder-CbS3tQk_.js")).networkPlaceholderSvg,
	nftPlaceholder: async () => (await import("./nftPlaceholder-B5eToJjN.js")).nftPlaceholderSvg,
	off: async () => (await import("./off-1tM1dHcN.js")).offSvg,
	playStore: async () => (await import("./play-store-Dyv7T0JE.js")).playStoreSvg,
	plus: async () => (await import("./plus-DUfHQ6pJ.js")).plusSvg,
	qrCode: async () => (await import("./qr-code-BKeQqjoW.js")).qrCodeIcon,
	recycleHorizontal: async () => (await import("./recycle-horizontal-CaXwvTng.js")).recycleHorizontalSvg,
	refresh: async () => (await import("./refresh-DVYKrW3f.js")).refreshSvg,
	search: async () => (await import("./search-ehPPwjjN.js")).searchSvg,
	send: async () => (await import("./send-DCEnSwRL.js")).sendSvg,
	swapHorizontal: async () => (await import("./swapHorizontal-Cj1kFAgH.js")).swapHorizontalSvg,
	swapHorizontalMedium: async () => (await import("./swapHorizontalMedium-DCeX3mEI.js")).swapHorizontalMediumSvg,
	swapHorizontalBold: async () => (await import("./swapHorizontalBold-BI6DcBTD.js")).swapHorizontalBoldSvg,
	swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-C4l1910m.js")).swapHorizontalRoundedBoldSvg,
	swapVertical: async () => (await import("./swapVertical-BTntvT3m.js")).swapVerticalSvg,
	solana: async () => (await import("./solana-CaDoVwcQ.js")).solanaSvg,
	telegram: async () => (await import("./telegram-DUeyGuWk.js")).telegramSvg,
	threeDots: async () => (await import("./three-dots-Bog-ZY14.js")).threeDotsSvg,
	twitch: async () => (await import("./twitch-qXyB2Zbi.js")).twitchSvg,
	twitter: async () => (await import("./x-CCZbSFHg.js")).xSvg,
	twitterIcon: async () => (await import("./twitterIcon-B2jmq5lp.js")).twitterIconSvg,
	user: async () => (await import("./user-DzGDmonv.js")).userSvg,
	verify: async () => (await import("./verify-CDbIWp52.js")).verifySvg,
	verifyFilled: async () => (await import("./verify-filled-C0UZwC3C.js")).verifyFilledSvg,
	wallet: async () => (await import("./wallet-CjM_fNac.js")).walletSvg,
	walletConnect: async () => (await import("./walletconnect-BCHT3O74.js")).walletConnectSvg,
	walletConnectLightBrown: async () => (await import("./walletconnect-BCHT3O74.js")).walletConnectLightBrownSvg,
	walletConnectBrown: async () => (await import("./walletconnect-BCHT3O74.js")).walletConnectBrownSvg,
	walletPlaceholder: async () => (await import("./wallet-placeholder-D41kjLap.js")).walletPlaceholderSvg,
	warningCircle: async () => (await import("./warning-circle-CkjEVgbh.js")).warningCircleSvg,
	x: async () => (await import("./x-CCZbSFHg.js")).xSvg,
	info: async () => (await import("./info-CyCHE55o.js")).infoSvg,
	exclamationTriangle: async () => (await import("./exclamation-triangle-DOjJubEw.js")).exclamationTriangleSvg,
	reown: async () => (await import("./reown-logo-BbqrmEas.js")).reownSvg,
	"x-mark": async () => (await import("./x-mark-CksKLE3u.js")).xMarkSvg,
	dollar: async () => (await import("./dollar-CB0bNvtx.js")).dollarSvg
};
async function j(e) {
	if (D.has(e)) return D.get(e);
	let t = (A[e] ?? A.copy)();
	return D.set(e, t), t;
}
var M = class extends s {
	constructor() {
		super(...arguments), this.size = "md", this.name = "copy", this.color = "fg-300", this.aspectRatio = "1 / 1";
	}
	render() {
		return this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `, i`${E(j(this.name), i`<div class="fallback"></div>`)}`;
	}
};
M.styles = [
	t,
	e,
	O
], k([d()], M.prototype, "size", void 0), k([d()], M.prototype, "name", void 0), k([d()], M.prototype, "color", void 0), k([d()], M.prototype, "aspectRatio", void 0), M = k([n("wui-icon")], M);
//#endregion
export { x as t };
