import { a as e, r as t, s as n, t as r } from "./exports-D_wXhA01.js";
import { A as i, N as a, _ as o, b as s, p as c, r as l, s as u, w as d, y as f } from "./ModalController-DHlkqy_7.js";
import { i as p, l as m, t as h } from "./lit-CKWVc9vf.js";
import { a as g, o as _, s as v } from "./wui-text-ec7ybml8.js";
import "./wui-icon-CAz-1_6w.js";
import "./wui-image-BWaOEx0k.js";
import "./wui-chip-button-DliE7z5S.js";
import "./wui-qr-code-B__Ozs2I.js";
//#region node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-compatible-network/styles.js
var y = m`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`, b = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, x = class extends h {
	constructor() {
		super(...arguments), this.networkImages = [""], this.text = "";
	}
	render() {
		return p`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `;
	}
	networksTemplate() {
		return p` <wui-flex class="networks">
      ${this.networkImages.slice(0, 5)?.map((e) => p` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`;
	}
};
x.styles = [
	n,
	e,
	y
], b([v({ type: Array })], x.prototype, "networkImages", void 0), b([v()], x.prototype, "text", void 0), x = b([r("wui-compatible-network")], x);
//#endregion
//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-receive-view/styles.js
var S = m`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`, C = function(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}, w = class extends h {
	constructor() {
		super(), this.unsubscribe = [], this.address = l.state.address, this.profileName = l.state.profileName, this.network = u.state.activeCaipNetwork, this.unsubscribe.push(l.subscribe((e) => {
			e.address ? (this.address = e.address, this.profileName = e.profileName) : c.showError("Account not found");
		}), u.subscribeKey("activeCaipNetwork", (e) => {
			e?.id && (this.network = e);
		}));
	}
	disconnectedCallback() {
		this.unsubscribe.forEach((e) => e());
	}
	render() {
		if (!this.address) throw Error("w3m-wallet-receive-view: No account provided");
		let e = d.getNetworkImage(this.network);
		return p` <wui-flex
      flexDirection="column"
      .padding=${[
			"0",
			"l",
			"l",
			"l"
		]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${t.getTruncateString({
			string: this.profileName || this.address || "",
			charsStart: this.profileName ? 18 : 4,
			charsEnd: this.profileName ? 0 : 4,
			truncate: this.profileName ? "end" : "middle"
		})}
        icon="copy"
        size="sm"
        imageSrc=${e || ""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${[
			"l",
			"0",
			"0",
			"0"
		]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${f.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${g(f.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`;
	}
	networkTemplate() {
		let e = u.getAllRequestedCaipNetworks(), t = u.checkIfSmartAccountEnabled(), n = u.state.activeCaipNetwork, r = e.filter((e) => e?.chainNamespace === n?.chainNamespace);
		if (o(n?.chainNamespace) === i.ACCOUNT_TYPES.SMART_ACCOUNT && t) return n ? p`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[d.getNetworkImage(n) ?? ""]}
      ></wui-compatible-network>` : null;
		let a = (r?.filter((e) => e?.assets?.imageId)?.slice(0, 5)).map(d.getNetworkImage).filter(Boolean);
		return p`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${a}
    ></wui-compatible-network>`;
	}
	onReceiveClick() {
		s.push("WalletCompatibleNetworks");
	}
	onCopyClick() {
		try {
			this.address && (a.copyToClopboard(this.address), c.showSuccess("Address copied"));
		} catch {
			c.showError("Failed to copy");
		}
	}
};
w.styles = S, C([_()], w.prototype, "address", void 0), C([_()], w.prototype, "profileName", void 0), C([_()], w.prototype, "network", void 0), w = C([r("w3m-wallet-receive-view")], w);
//#endregion
export { w as W3mWalletReceiveView };
