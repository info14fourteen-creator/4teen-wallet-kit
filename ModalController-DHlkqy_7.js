//#region node_modules/proxy-compare/dist/index.js
var e = Symbol(), t = Object.getPrototypeOf, n = /* @__PURE__ */ new WeakMap(), r = (e) => e && (n.has(e) ? n.get(e) : t(e) === Object.prototype || t(e) === Array.prototype), i = (t) => r(t) && t[e] || null, a = (e, t = !0) => {
	n.set(e, t);
}, o = (e) => typeof e == "object" && !!e, s = (e) => o(e) && !d.has(e) && (Array.isArray(e) || !(Symbol.iterator in e)) && !(e instanceof WeakMap) && !(e instanceof WeakSet) && !(e instanceof Error) && !(e instanceof Number) && !(e instanceof Date) && !(e instanceof String) && !(e instanceof RegExp) && !(e instanceof ArrayBuffer) && !(e instanceof Promise), c = (e, t) => {
	let n = f.get(e);
	if (n?.[0] === t) return n[1];
	let r = Array.isArray(e) ? [] : Object.create(Object.getPrototypeOf(e));
	return a(r, !0), f.set(e, [t, r]), Reflect.ownKeys(e).forEach((t) => {
		if (Object.getOwnPropertyDescriptor(r, t)) return;
		let n = Reflect.get(e, t), { enumerable: i } = Reflect.getOwnPropertyDescriptor(e, t), o = {
			value: n,
			enumerable: i,
			configurable: !0
		};
		if (d.has(n)) a(n, !1);
		else if (u.has(n)) {
			let [e, t] = u.get(n);
			o.value = c(e, t());
		}
		Object.defineProperty(r, t, o);
	}), Object.preventExtensions(r);
}, l = (e, t, n, r) => ({
	deleteProperty(e, t) {
		let i = Reflect.get(e, t);
		n(t);
		let a = Reflect.deleteProperty(e, t);
		return a && r([
			"delete",
			[t],
			i
		]), a;
	},
	set(a, s, c, l) {
		let d = !e() && Reflect.has(a, s), f = Reflect.get(a, s, l);
		if (d && (m(f, c) || ee.has(c) && m(f, ee.get(c)))) return !0;
		n(s), o(c) && (c = i(c) || c);
		let p = !u.has(c) && te(c) ? g(c) : c;
		return t(s, p), Reflect.set(a, s, p, l), r([
			"set",
			[s],
			c,
			f
		]), !0;
	}
}), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakSet(), f = /* @__PURE__ */ new WeakMap(), p = [1, 1], ee = /* @__PURE__ */ new WeakMap(), m = Object.is, h = (e, t) => new Proxy(e, t), te = s, ne = c, re = l;
function g(e = {}) {
	if (!o(e)) throw Error("object required");
	let t = ee.get(e);
	if (t) return t;
	let n = p[0], r = /* @__PURE__ */ new Set(), i = (e, t = ++p[0]) => {
		n !== t && (n = t, r.forEach((n) => n(e, t)));
	}, a = p[1], s = (e = ++p[1]) => (a !== e && !r.size && (a = e, l.forEach(([t]) => {
		let r = t[1](e);
		r > n && (n = r);
	})), n), c = (e) => (t, n) => {
		let r = [...t];
		r[1] = [e, ...r[1]], i(r, n);
	}, l = /* @__PURE__ */ new Map(), f = (e, t) => {
		let n = !d.has(t) && u.get(t);
		if (n) if (r.size) {
			let t = n[2](c(e));
			l.set(e, [n, t]);
		} else l.set(e, [n]);
	}, m = (e) => {
		var t;
		let n = l.get(e);
		n && (l.delete(e), (t = n[1]) == null || t.call(n));
	}, te = (e) => (r.add(e), r.size === 1 && l.forEach(([e, t], n) => {
		let r = e[2](c(n));
		l.set(n, [e, r]);
	}), () => {
		r.delete(e), r.size === 0 && l.forEach(([e, t], n) => {
			t && (t(), l.set(n, [e]));
		});
	}), ne = !0, g = h(e, re(() => ne, f, m, i));
	ee.set(e, g);
	let _ = [
		e,
		s,
		te
	];
	return u.set(g, _), Reflect.ownKeys(e).forEach((t) => {
		let n = Object.getOwnPropertyDescriptor(e, t);
		"value" in n && n.writable && (g[t] = e[t]);
	}), ne = !1, g;
}
function _(e, t, n) {
	let r = u.get(e), i, a = [], o = r[2], s = !1, c = o((e) => {
		if (a.push(e), n) {
			t(a.splice(0));
			return;
		}
		i || (i = Promise.resolve().then(() => {
			i = void 0, s && t(a.splice(0));
		}));
	});
	return s = !0, () => {
		s = !1, c();
	};
}
function ie(e) {
	let [t, n] = u.get(e);
	return ne(t, n());
}
function ae(e) {
	return d.add(e), e;
}
function oe() {
	return {
		proxyStateMap: u,
		refSet: d,
		snapCache: f,
		versionHolder: p,
		proxyCache: ee
	};
}
//#endregion
//#region node_modules/valtio/esm/vanilla/utils.mjs
function v(e, t, n, r) {
	let i = e[t];
	return _(e, () => {
		let r = e[t];
		Object.is(i, r) || n(i = r);
	}, r);
}
var { proxyStateMap: se, snapCache: ce } = oe(), le = (e) => se.has(e);
function ue(e) {
	let t = [], n = 0, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new WeakMap(), a = () => {
		let e = ce.get(s)?.[1];
		if (e && !i.has(e)) {
			let t = new Map(r);
			i.set(e, t);
		}
	}, o = (e) => i.get(e) || r;
	if (e) {
		if (typeof e[Symbol.iterator] != "function") throw TypeError("proxyMap:\n	initial state must be iterable\n		tip: structure should be [[key, value]]");
		for (let [i, a] of e) r.set(i, n), t[n++] = a;
	}
	let s = {
		data: t,
		index: n,
		epoch: 0,
		get size() {
			return le(this) || a(), o(this).size;
		},
		get(e) {
			let t = o(this).get(e);
			if (t === void 0) {
				this.epoch;
				return;
			}
			return this.data[t];
		},
		has(e) {
			let t = o(this);
			return this.epoch, t.has(e);
		},
		set(e, t) {
			if (!le(this)) throw Error("Cannot perform mutations on a snapshot");
			let n = r.get(e);
			return n === void 0 ? (r.set(e, this.index), this.data[this.index++] = t) : this.data[n] = t, this.epoch++, this;
		},
		delete(e) {
			if (!le(this)) throw Error("Cannot perform mutations on a snapshot");
			let t = r.get(e);
			return t === void 0 ? !1 : (delete this.data[t], r.delete(e), this.epoch++, !0);
		},
		clear() {
			if (!le(this)) throw Error("Cannot perform mutations on a snapshot");
			this.data.length = 0, this.index = 0, this.epoch++, r.clear();
		},
		forEach(e) {
			this.epoch, o(this).forEach((t, n) => {
				e(this.data[t], n, this);
			});
		},
		*entries() {
			this.epoch;
			let e = o(this);
			for (let [t, n] of e) yield [t, this.data[n]];
		},
		*keys() {
			this.epoch;
			let e = o(this);
			for (let t of e.keys()) yield t;
		},
		*values() {
			this.epoch;
			let e = o(this);
			for (let t of e.values()) yield this.data[t];
		},
		[Symbol.iterator]() {
			return this.entries();
		},
		get [Symbol.toStringTag]() {
			return "Map";
		},
		toJSON() {
			return new Map(this.entries());
		}
	}, c = g(s);
	return Object.defineProperties(c, {
		size: { enumerable: !1 },
		index: { enumerable: !1 },
		epoch: { enumerable: !1 },
		data: { enumerable: !1 },
		toJSON: { enumerable: !1 }
	}), Object.seal(c), c;
}
var { proxyStateMap: de, snapCache: fe } = oe(), y = {
	WC_NAME_SUFFIX: ".reown.id",
	WC_NAME_SUFFIX_LEGACY: ".wcn.id",
	BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
	PULSE_API_URL: "https://pulse.walletconnect.org",
	W3M_API_URL: "https://api.web3modal.org",
	CONNECTOR_ID: {
		WALLET_CONNECT: "walletConnect",
		INJECTED: "injected",
		WALLET_STANDARD: "announced",
		COINBASE: "coinbaseWallet",
		COINBASE_SDK: "coinbaseWalletSDK",
		SAFE: "safe",
		LEDGER: "ledger",
		OKX: "okx",
		EIP6963: "eip6963",
		AUTH: "ID_AUTH"
	},
	CONNECTOR_NAMES: { AUTH: "Auth" },
	AUTH_CONNECTOR_SUPPORTED_CHAINS: ["eip155", "solana"],
	LIMITS: { PENDING_TRANSACTIONS: 99 },
	CHAIN: {
		EVM: "eip155",
		SOLANA: "solana",
		POLKADOT: "polkadot",
		BITCOIN: "bip122"
	},
	CHAIN_NAME_MAP: {
		eip155: "EVM Networks",
		solana: "Solana",
		polkadot: "Polkadot",
		bip122: "Bitcoin",
		cosmos: "Cosmos",
		sui: "Sui",
		stacks: "Stacks"
	},
	ADAPTER_TYPES: {
		BITCOIN: "bitcoin",
		SOLANA: "solana",
		WAGMI: "wagmi",
		ETHERS: "ethers",
		ETHERS5: "ethers5"
	},
	USDT_CONTRACT_ADDRESSES: [
		"0xdac17f958d2ee523a2206206994597c13d831ec7",
		"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
		"0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
		"0x919C1c267BC06a7039e03fcc2eF738525769109c",
		"0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
		"0x55d398326f99059fF775485246999027B3197955",
		"0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
	],
	HTTP_STATUS_CODES: {
		SERVER_ERROR: 500,
		TOO_MANY_REQUESTS: 429,
		SERVICE_UNAVAILABLE: 503,
		FORBIDDEN: 403
	},
	UNSUPPORTED_NETWORK_NAME: "Unknown Network",
	SECURE_SITE_SDK_ORIGIN: (typeof process < "u" && process.env !== void 0 ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org",
	REMOTE_FEATURES_ALERTS: { MULTI_WALLET_NOT_ENABLED: {
		DEFAULT: {
			displayMessage: "Multi-Wallet Not Enabled",
			debugMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com."
		},
		CONNECTIONS_HOOK: {
			displayMessage: "Multi-Wallet Not Enabled",
			debugMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnections hook."
		},
		CONNECTION_HOOK: {
			displayMessage: "Multi-Wallet Not Enabled",
			debugMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnection hook."
		}
	} }
}, pe = {
	caipNetworkIdToNumber(e) {
		return e ? Number(e.split(":")[1]) : void 0;
	},
	parseEvmChainId(e) {
		return typeof e == "string" ? this.caipNetworkIdToNumber(e) : e;
	},
	getNetworksByNamespace(e, t) {
		return e?.filter((e) => e.chainNamespace === t) || [];
	},
	getFirstNetworkByNamespace(e, t) {
		return this.getNetworksByNamespace(e, t)[0];
	},
	getNetworkNameByCaipNetworkId(e, t) {
		if (!t) return;
		let n = e.find((e) => e.caipNetworkId === t);
		if (n) return n.name;
		let [r] = t.split(":");
		return y.CHAIN_NAME_MAP?.[r] || void 0;
	}
}, me = [
	"eip155",
	"solana",
	"polkadot",
	"bip122",
	"cosmos",
	"sui",
	"stacks"
], he = 20, ge = 1, _e = 1e6, ve = 1e6, ye = -7, be = 21, xe = !1, Se = "[big.js] ", Ce = Se + "Invalid ", we = Ce + "decimal places", Te = Ce + "rounding mode", Ee = Se + "Division by zero", b = {}, x = void 0, De = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function Oe() {
	function e(t) {
		var n = this;
		if (!(n instanceof e)) return t === x ? Oe() : new e(t);
		if (t instanceof e) n.s = t.s, n.e = t.e, n.c = t.c.slice();
		else {
			if (typeof t != "string") {
				if (e.strict === !0 && typeof t != "bigint") throw TypeError(Ce + "value");
				t = t === 0 && 1 / t < 0 ? "-0" : String(t);
			}
			ke(n, t);
		}
		n.constructor = e;
	}
	return e.prototype = b, e.DP = he, e.RM = ge, e.NE = ye, e.PE = be, e.strict = xe, e.roundDown = 0, e.roundHalfUp = 1, e.roundHalfEven = 2, e.roundUp = 3, e;
}
function ke(e, t) {
	var n, r, i;
	if (!De.test(t)) throw Error(Ce + "number");
	for (e.s = t.charAt(0) == "-" ? (t = t.slice(1), -1) : 1, (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), i = t.length, r = 0; r < i && t.charAt(r) == "0";) ++r;
	if (r == i) e.c = [e.e = 0];
	else {
		for (; i > 0 && t.charAt(--i) == "0";);
		for (e.e = n - r - 1, e.c = [], n = 0; r <= i;) e.c[n++] = +t.charAt(r++);
	}
	return e;
}
function Ae(e, t, n, r) {
	var i = e.c;
	if (n === x && (n = e.constructor.RM), n !== 0 && n !== 1 && n !== 2 && n !== 3) throw Error(Te);
	if (t < 1) r = n === 3 && (r || !!i[0]) || t === 0 && (n === 1 && i[0] >= 5 || n === 2 && (i[0] > 5 || i[0] === 5 && (r || i[1] !== x))), i.length = 1, r ? (e.e = e.e - t + 1, i[0] = 1) : i[0] = e.e = 0;
	else if (t < i.length) {
		if (r = n === 1 && i[t] >= 5 || n === 2 && (i[t] > 5 || i[t] === 5 && (r || i[t + 1] !== x || i[t - 1] & 1)) || n === 3 && (r || !!i[0]), i.length = t, r) {
			for (; ++i[--t] > 9;) if (i[t] = 0, t === 0) {
				++e.e, i.unshift(1);
				break;
			}
		}
		for (t = i.length; !i[--t];) i.pop();
	}
	return e;
}
function je(e, t, n) {
	var r = e.e, i = e.c.join(""), a = i.length;
	if (t) i = i.charAt(0) + (a > 1 ? "." + i.slice(1) : "") + (r < 0 ? "e" : "e+") + r;
	else if (r < 0) {
		for (; ++r;) i = "0" + i;
		i = "0." + i;
	} else if (r > 0) if (++r > a) for (r -= a; r--;) i += "0";
	else r < a && (i = i.slice(0, r) + "." + i.slice(r));
	else a > 1 && (i = i.charAt(0) + "." + i.slice(1));
	return e.s < 0 && n ? "-" + i : i;
}
b.abs = function() {
	var e = new this.constructor(this);
	return e.s = 1, e;
}, b.cmp = function(e) {
	var t, n = this, r = n.c, i = (e = new n.constructor(e)).c, a = n.s, o = e.s, s = n.e, c = e.e;
	if (!r[0] || !i[0]) return r[0] ? a : i[0] ? -o : 0;
	if (a != o) return a;
	if (t = a < 0, s != c) return s > c ^ t ? 1 : -1;
	for (o = (s = r.length) < (c = i.length) ? s : c, a = -1; ++a < o;) if (r[a] != i[a]) return r[a] > i[a] ^ t ? 1 : -1;
	return s == c ? 0 : s > c ^ t ? 1 : -1;
}, b.div = function(e) {
	var t = this, n = t.constructor, r = t.c, i = (e = new n(e)).c, a = t.s == e.s ? 1 : -1, o = n.DP;
	if (o !== ~~o || o < 0 || o > _e) throw Error(we);
	if (!i[0]) throw Error(Ee);
	if (!r[0]) return e.s = a, e.c = [e.e = 0], e;
	var s, c, l, u, d, f = i.slice(), p = s = i.length, ee = r.length, m = r.slice(0, s), h = m.length, te = e, ne = te.c = [], re = 0, g = o + (te.e = t.e - e.e) + 1;
	for (te.s = a, a = g < 0 ? 0 : g, f.unshift(0); h++ < s;) m.push(0);
	do {
		for (l = 0; l < 10; l++) {
			if (s != (h = m.length)) u = s > h ? 1 : -1;
			else for (d = -1, u = 0; ++d < s;) if (i[d] != m[d]) {
				u = i[d] > m[d] ? 1 : -1;
				break;
			}
			if (u < 0) {
				for (c = h == s ? i : f; h;) {
					if (m[--h] < c[h]) {
						for (d = h; d && !m[--d];) m[d] = 9;
						--m[d], m[h] += 10;
					}
					m[h] -= c[h];
				}
				for (; !m[0];) m.shift();
			} else break;
		}
		ne[re++] = u ? l : ++l, m[0] && u ? m[h] = r[p] || 0 : m = [r[p]];
	} while ((p++ < ee || m[0] !== x) && a--);
	return !ne[0] && re != 1 && (ne.shift(), te.e--, g--), re > g && Ae(te, g, n.RM, m[0] !== x), te;
}, b.eq = function(e) {
	return this.cmp(e) === 0;
}, b.gt = function(e) {
	return this.cmp(e) > 0;
}, b.gte = function(e) {
	return this.cmp(e) > -1;
}, b.lt = function(e) {
	return this.cmp(e) < 0;
}, b.lte = function(e) {
	return this.cmp(e) < 1;
}, b.minus = b.sub = function(e) {
	var t, n, r, i, a = this, o = a.constructor, s = a.s, c = (e = new o(e)).s;
	if (s != c) return e.s = -c, a.plus(e);
	var l = a.c.slice(), u = a.e, d = e.c, f = e.e;
	if (!l[0] || !d[0]) return d[0] ? e.s = -c : l[0] ? e = new o(a) : e.s = 1, e;
	if (s = u - f) {
		for ((i = s < 0) ? (s = -s, r = l) : (f = u, r = d), r.reverse(), c = s; c--;) r.push(0);
		r.reverse();
	} else for (n = ((i = l.length < d.length) ? l : d).length, s = c = 0; c < n; c++) if (l[c] != d[c]) {
		i = l[c] < d[c];
		break;
	}
	if (i && (r = l, l = d, d = r, e.s = -e.s), (c = (n = d.length) - (t = l.length)) > 0) for (; c--;) l[t++] = 0;
	for (c = t; n > s;) {
		if (l[--n] < d[n]) {
			for (t = n; t && !l[--t];) l[t] = 9;
			--l[t], l[n] += 10;
		}
		l[n] -= d[n];
	}
	for (; l[--c] === 0;) l.pop();
	for (; l[0] === 0;) l.shift(), --f;
	return l[0] || (e.s = 1, l = [f = 0]), e.c = l, e.e = f, e;
}, b.mod = function(e) {
	var t, n = this, r = n.constructor, i = n.s, a = (e = new r(e)).s;
	if (!e.c[0]) throw Error(Ee);
	return n.s = e.s = 1, t = e.cmp(n) == 1, n.s = i, e.s = a, t ? new r(n) : (i = r.DP, a = r.RM, r.DP = r.RM = 0, n = n.div(e), r.DP = i, r.RM = a, this.minus(n.times(e)));
}, b.neg = function() {
	var e = new this.constructor(this);
	return e.s = -e.s, e;
}, b.plus = b.add = function(e) {
	var t, n, r, i = this, a = i.constructor;
	if (e = new a(e), i.s != e.s) return e.s = -e.s, i.minus(e);
	var o = i.e, s = i.c, c = e.e, l = e.c;
	if (!s[0] || !l[0]) return l[0] || (s[0] ? e = new a(i) : e.s = i.s), e;
	if (s = s.slice(), t = o - c) {
		for (t > 0 ? (c = o, r = l) : (t = -t, r = s), r.reverse(); t--;) r.push(0);
		r.reverse();
	}
	for (s.length - l.length < 0 && (r = l, l = s, s = r), t = l.length, n = 0; t; s[t] %= 10) n = (s[--t] = s[t] + l[t] + n) / 10 | 0;
	for (n && (s.unshift(n), ++c), t = s.length; s[--t] === 0;) s.pop();
	return e.c = s, e.e = c, e;
}, b.pow = function(e) {
	var t = this, n = new t.constructor("1"), r = n, i = e < 0;
	if (e !== ~~e || e < -ve || e > ve) throw Error(Ce + "exponent");
	for (i && (e = -e); e & 1 && (r = r.times(t)), e >>= 1, e;) t = t.times(t);
	return i ? n.div(r) : r;
}, b.prec = function(e, t) {
	if (e !== ~~e || e < 1 || e > _e) throw Error(Ce + "precision");
	return Ae(new this.constructor(this), e, t);
}, b.round = function(e, t) {
	if (e === x) e = 0;
	else if (e !== ~~e || e < -_e || e > _e) throw Error(we);
	return Ae(new this.constructor(this), e + this.e + 1, t);
}, b.sqrt = function() {
	var e, t, n, r = this, i = r.constructor, a = r.s, o = r.e, s = new i("0.5");
	if (!r.c[0]) return new i(r);
	if (a < 0) throw Error(Se + "No square root");
	a = Math.sqrt(+je(r, !0, !0)), a === 0 || a === Infinity ? (t = r.c.join(""), t.length + o & 1 || (t += "0"), a = Math.sqrt(t), o = ((o + 1) / 2 | 0) - (o < 0 || o & 1), e = new i((a == Infinity ? "5e" : (a = a.toExponential()).slice(0, a.indexOf("e") + 1)) + o)) : e = new i(a + ""), o = e.e + (i.DP += 4);
	do
		n = e, e = s.times(n.plus(r.div(n)));
	while (n.c.slice(0, o).join("") !== e.c.slice(0, o).join(""));
	return Ae(e, (i.DP -= 4) + e.e + 1, i.RM);
}, b.times = b.mul = function(e) {
	var t, n = this, r = n.constructor, i = n.c, a = (e = new r(e)).c, o = i.length, s = a.length, c = n.e, l = e.e;
	if (e.s = n.s == e.s ? 1 : -1, !i[0] || !a[0]) return e.c = [e.e = 0], e;
	for (e.e = c + l, o < s && (t = i, i = a, a = t, l = o, o = s, s = l), t = Array(l = o + s); l--;) t[l] = 0;
	for (c = s; c--;) {
		for (s = 0, l = o + c; l > c;) s = t[l] + a[c] * i[l - c - 1] + s, t[l--] = s % 10, s = s / 10 | 0;
		t[l] = s;
	}
	for (s ? ++e.e : t.shift(), c = t.length; !t[--c];) t.pop();
	return e.c = t, e;
}, b.toExponential = function(e, t) {
	var n = this, r = n.c[0];
	if (e !== x) {
		if (e !== ~~e || e < 0 || e > _e) throw Error(we);
		for (n = Ae(new n.constructor(n), ++e, t); n.c.length < e;) n.c.push(0);
	}
	return je(n, !0, !!r);
}, b.toFixed = function(e, t) {
	var n = this, r = n.c[0];
	if (e !== x) {
		if (e !== ~~e || e < 0 || e > _e) throw Error(we);
		for (n = Ae(new n.constructor(n), e + n.e + 1, t), e = e + n.e + 1; n.c.length < e;) n.c.push(0);
	}
	return je(n, !1, !!r);
}, b[Symbol.for("nodejs.util.inspect.custom")] = b.toJSON = b.toString = function() {
	var e = this, t = e.constructor;
	return je(e, e.e <= t.NE || e.e >= t.PE, !!e.c[0]);
}, b.toNumber = function() {
	var e = +je(this, !0, !0);
	if (this.constructor.strict === !0 && !this.eq(e.toString())) throw Error(Se + "Imprecise conversion");
	return e;
}, b.toPrecision = function(e, t) {
	var n = this, r = n.constructor, i = n.c[0];
	if (e !== x) {
		if (e !== ~~e || e < 1 || e > _e) throw Error(Ce + "precision");
		for (n = Ae(new r(n), e, t); n.c.length < e;) n.c.push(0);
	}
	return je(n, e <= n.e || n.e <= r.NE || n.e >= r.PE, !!i);
}, b.valueOf = function() {
	var e = this, t = e.constructor;
	if (t.strict === !0) throw Error(Se + "valueOf disallowed");
	return je(e, e.e <= t.NE || e.e >= t.PE, !0);
};
var Me = Oe(), Ne = {
	bigNumber(e) {
		return e ? new Me(e) : new Me(0);
	},
	multiply(e, t) {
		if (e === void 0 || t === void 0) return new Me(0);
		let n = new Me(e), r = new Me(t);
		return n.times(r);
	},
	toFixed(e, t = 2) {
		return e === void 0 || e === "" ? new Me(0).toFixed(t) : new Me(e).toFixed(t);
	},
	formatNumberToLocalString(e, t = 2) {
		return e === void 0 || e === "" ? "0.00" : typeof e == "number" ? e.toLocaleString("en-US", {
			maximumFractionDigits: t,
			minimumFractionDigits: t,
			roundingMode: "floor"
		}) : parseFloat(e).toLocaleString("en-US", {
			maximumFractionDigits: t,
			minimumFractionDigits: t,
			roundingMode: "floor"
		});
	},
	parseLocalStringToNumber(e) {
		return e === void 0 || e === "" ? 0 : new Me(e.replace(/,/gu, "")).toNumber();
	}
}, Pe = [{
	type: "function",
	name: "transfer",
	stateMutability: "nonpayable",
	inputs: [{
		name: "_to",
		type: "address"
	}, {
		name: "_value",
		type: "uint256"
	}],
	outputs: [{
		name: "",
		type: "bool"
	}]
}, {
	type: "function",
	name: "transferFrom",
	stateMutability: "nonpayable",
	inputs: [
		{
			name: "_from",
			type: "address"
		},
		{
			name: "_to",
			type: "address"
		},
		{
			name: "_value",
			type: "uint256"
		}
	],
	outputs: [{
		name: "",
		type: "bool"
	}]
}], Fe = [{
	type: "function",
	name: "approve",
	stateMutability: "nonpayable",
	inputs: [{
		name: "spender",
		type: "address"
	}, {
		name: "amount",
		type: "uint256"
	}],
	outputs: [{ type: "bool" }]
}], Ie = [{
	type: "function",
	name: "transfer",
	stateMutability: "nonpayable",
	inputs: [{
		name: "recipient",
		type: "address"
	}, {
		name: "amount",
		type: "uint256"
	}],
	outputs: []
}, {
	type: "function",
	name: "transferFrom",
	stateMutability: "nonpayable",
	inputs: [
		{
			name: "sender",
			type: "address"
		},
		{
			name: "recipient",
			type: "address"
		},
		{
			name: "amount",
			type: "uint256"
		}
	],
	outputs: [{
		name: "",
		type: "bool"
	}]
}], Le = {
	getERC20Abi: (e) => y.USDT_CONTRACT_ADDRESSES.includes(e) ? Ie : Pe,
	getSwapAbi: () => Fe
}, Re = {
	validateCaipAddress(e) {
		if (e.split(":")?.length !== 3) throw Error("Invalid CAIP Address");
		return e;
	},
	parseCaipAddress(e) {
		let t = e.split(":");
		if (t.length !== 3) throw Error(`Invalid CAIP-10 address: ${e}`);
		let [n, r, i] = t;
		if (!n || !r || !i) throw Error(`Invalid CAIP-10 address: ${e}`);
		return {
			chainNamespace: n,
			chainId: r,
			address: i
		};
	},
	parseCaipNetworkId(e) {
		let t = e.split(":");
		if (t.length !== 2) throw Error(`Invalid CAIP-2 network id: ${e}`);
		let [n, r] = t;
		if (!n || !r) throw Error(`Invalid CAIP-2 network id: ${e}`);
		return {
			chainNamespace: n,
			chainId: r
		};
	}
}, S = {
	WALLET_ID: "@appkit/wallet_id",
	WALLET_NAME: "@appkit/wallet_name",
	SOLANA_WALLET: "@appkit/solana_wallet",
	SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
	ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
	CONNECTED_SOCIAL: "@appkit/connected_social",
	CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
	RECENT_WALLETS: "@appkit/recent_wallets",
	DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
	ACTIVE_NAMESPACE: "@appkit/active_namespace",
	CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
	CONNECTION_STATUS: "@appkit/connection_status",
	SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
	SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
	TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
	NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
	PORTFOLIO_CACHE: "@appkit/portfolio_cache",
	ENS_CACHE: "@appkit/ens_cache",
	IDENTITY_CACHE: "@appkit/identity_cache",
	PREFERRED_ACCOUNT_TYPES: "@appkit/preferred_account_types",
	CONNECTIONS: "@appkit/connections",
	DISCONNECTED_CONNECTOR_IDS: "@appkit/disconnected_connector_ids",
	HISTORY_TRANSACTIONS_CACHE: "@appkit/history_transactions_cache",
	TOKEN_PRICE_CACHE: "@appkit/token_price_cache",
	RECENT_EMAILS: "@appkit/recent_emails"
};
function ze(e) {
	if (!e) throw Error("Namespace is required for CONNECTED_CONNECTOR_ID");
	return `@appkit/${e}:connected_connector_id`;
}
var C = {
	setItem(e, t) {
		Be() && t !== void 0 && localStorage.setItem(e, t);
	},
	getItem(e) {
		if (Be()) return localStorage.getItem(e) || void 0;
	},
	removeItem(e) {
		Be() && localStorage.removeItem(e);
	},
	clear() {
		Be() && localStorage.clear();
	}
};
function Be() {
	return typeof window < "u" && typeof localStorage < "u";
}
//#endregion
//#region node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js
function Ve(e, t) {
	return t === "light" ? {
		"--w3m-accent": e?.["--w3m-accent"] || "hsla(231, 100%, 70%, 1)",
		"--w3m-background": "#fff"
	} : {
		"--w3m-accent": e?.["--w3m-accent"] || "hsla(230, 100%, 67%, 1)",
		"--w3m-background": "#121313"
	};
}
//#endregion
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js
var He = (typeof process < "u" && process.env !== void 0 ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org", Ue = [{
	label: "Meld.io",
	name: "meld",
	feeRange: "1-2%",
	url: "https://meldcrypto.com",
	supportedChains: ["eip155", "solana"]
}], We = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU", w = {
	FOUR_MINUTES_MS: 24e4,
	TEN_SEC_MS: 1e4,
	FIVE_SEC_MS: 5e3,
	THREE_SEC_MS: 3e3,
	ONE_SEC_MS: 1e3,
	SECURE_SITE: He,
	SECURE_SITE_DASHBOARD: `${He}/dashboard`,
	SECURE_SITE_FAVICON: `${He}/images/favicon.png`,
	RESTRICTED_TIMEZONES: [
		"ASIA/SHANGHAI",
		"ASIA/URUMQI",
		"ASIA/CHONGQING",
		"ASIA/HARBIN",
		"ASIA/KASHGAR",
		"ASIA/MACAU",
		"ASIA/HONG_KONG",
		"ASIA/MACAO",
		"ASIA/BEIJING",
		"ASIA/HARBIN"
	],
	SWAP_SUGGESTED_TOKENS: /* @__PURE__ */ "ETH.UNI.1INCH.AAVE.SOL.ADA.AVAX.DOT.LINK.NITRO.GAIA.MILK.TRX.NEAR.GNO.WBTC.DAI.WETH.USDC.USDT.ARB.BAL.BICO.CRV.ENS.MATIC.OP".split("."),
	SWAP_POPULAR_TOKENS: /* @__PURE__ */ "ETH.UNI.1INCH.AAVE.SOL.ADA.AVAX.DOT.LINK.NITRO.GAIA.MILK.TRX.NEAR.GNO.WBTC.DAI.WETH.USDC.USDT.ARB.BAL.BICO.CRV.ENS.MATIC.OP.METAL.DAI.CHAMP.WOLF.SALE.BAL.BUSD.MUST.BTCpx.ROUTE.HEX.WELT.amDAI.VSQ.VISION.AURUM.pSP.SNX.VC.LINK.CHP.amUSDT.SPHERE.FOX.GIDDY.GFC.OMEN.OX_OLD.DE.WNT".split("."),
	BALANCE_SUPPORTED_CHAINS: [y.CHAIN.EVM, y.CHAIN.SOLANA],
	SWAP_SUPPORTED_NETWORKS: [
		"eip155:1",
		"eip155:42161",
		"eip155:10",
		"eip155:324",
		"eip155:8453",
		"eip155:56",
		"eip155:137",
		"eip155:100",
		"eip155:43114",
		"eip155:250",
		"eip155:8217",
		"eip155:1313161554"
	],
	NAMES_SUPPORTED_CHAIN_NAMESPACES: [y.CHAIN.EVM],
	ONRAMP_SUPPORTED_CHAIN_NAMESPACES: [y.CHAIN.EVM, y.CHAIN.SOLANA],
	ACTIVITY_ENABLED_CHAIN_NAMESPACES: [y.CHAIN.EVM],
	NATIVE_TOKEN_ADDRESS: {
		eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
		solana: "So11111111111111111111111111111111111111111",
		polkadot: "0x",
		bip122: "0x",
		cosmos: "0x",
		sui: "0x",
		stacks: "0x"
	},
	CONVERT_SLIPPAGE_TOLERANCE: 1,
	CONNECT_LABELS: {
		MOBILE: "Open and continue in the wallet app",
		WEB: "Open and continue in the wallet app"
	},
	SEND_SUPPORTED_NAMESPACES: [y.CHAIN.EVM, y.CHAIN.SOLANA],
	DEFAULT_REMOTE_FEATURES: {
		swaps: ["1inch"],
		onramp: ["meld"],
		email: !0,
		socials: [
			"google",
			"x",
			"discord",
			"farcaster",
			"github",
			"apple",
			"facebook"
		],
		activity: !0,
		reownBranding: !0,
		multiWallet: !1,
		emailCapture: !1,
		payWithExchange: !1,
		payments: !1,
		reownAuthentication: !1
	},
	DEFAULT_REMOTE_FEATURES_DISABLED: {
		email: !1,
		socials: !1,
		swaps: !1,
		onramp: !1,
		activity: !1,
		reownBranding: !1,
		emailCapture: !1,
		reownAuthentication: !1
	},
	DEFAULT_FEATURES: {
		receive: !0,
		send: !0,
		emailShowWallets: !0,
		connectorTypeOrder: [
			"walletConnect",
			"recent",
			"injected",
			"featured",
			"custom",
			"external",
			"recommended"
		],
		analytics: !0,
		allWallets: !0,
		legalCheckbox: !1,
		smartSessions: !1,
		collapseWallets: !1,
		walletFeaturesOrder: [
			"onramp",
			"swaps",
			"receive",
			"send"
		],
		connectMethodsOrder: void 0,
		pay: !1,
		reownAuthentication: !1
	},
	DEFAULT_SOCIALS: [
		"google",
		"x",
		"farcaster",
		"discord",
		"apple",
		"github",
		"facebook"
	],
	DEFAULT_ACCOUNT_TYPES: {
		bip122: "payment",
		eip155: "smartAccount",
		polkadot: "eoa",
		solana: "eoa"
	},
	ADAPTER_TYPES: {
		UNIVERSAL: "universal",
		SOLANA: "solana",
		WAGMI: "wagmi",
		ETHERS: "ethers",
		ETHERS5: "ethers5",
		BITCOIN: "bitcoin"
	},
	SIWX_DEFAULTS: { signOutOnDisconnect: !0 }
}, T = {
	cacheExpiry: {
		portfolio: 3e4,
		nativeBalance: 3e4,
		ens: 3e5,
		identity: 3e5,
		transactionsHistory: 15e3,
		tokenPrice: 15e3
	},
	isCacheExpired(e, t) {
		return Date.now() - e > t;
	},
	getActiveNetworkProps() {
		let e = T.getActiveNamespace(), t = T.getActiveCaipNetworkId(), n = t ? t.split(":")[1] : void 0;
		return {
			namespace: e,
			caipNetworkId: t,
			chainId: n ? isNaN(Number(n)) ? n : Number(n) : void 0
		};
	},
	setWalletConnectDeepLink({ name: e, href: t }) {
		try {
			C.setItem(S.DEEPLINK_CHOICE, JSON.stringify({
				href: t,
				name: e
			}));
		} catch {
			console.info("Unable to set WalletConnect deep link");
		}
	},
	getWalletConnectDeepLink() {
		try {
			let e = C.getItem(S.DEEPLINK_CHOICE);
			if (e) return JSON.parse(e);
		} catch {
			console.info("Unable to get WalletConnect deep link");
		}
	},
	deleteWalletConnectDeepLink() {
		try {
			C.removeItem(S.DEEPLINK_CHOICE);
		} catch {
			console.info("Unable to delete WalletConnect deep link");
		}
	},
	setActiveNamespace(e) {
		try {
			C.setItem(S.ACTIVE_NAMESPACE, e);
		} catch {
			console.info("Unable to set active namespace");
		}
	},
	setActiveCaipNetworkId(e) {
		try {
			C.setItem(S.ACTIVE_CAIP_NETWORK_ID, e), T.setActiveNamespace(e.split(":")[0]);
		} catch {
			console.info("Unable to set active caip network id");
		}
	},
	getActiveCaipNetworkId() {
		try {
			return C.getItem(S.ACTIVE_CAIP_NETWORK_ID);
		} catch {
			console.info("Unable to get active caip network id");
			return;
		}
	},
	deleteActiveCaipNetworkId() {
		try {
			C.removeItem(S.ACTIVE_CAIP_NETWORK_ID);
		} catch {
			console.info("Unable to delete active caip network id");
		}
	},
	deleteConnectedConnectorId(e) {
		try {
			let t = ze(e);
			C.removeItem(t);
		} catch {
			console.info("Unable to delete connected connector id");
		}
	},
	setAppKitRecent(e) {
		try {
			let t = T.getRecentWallets();
			t.find((t) => t.id === e.id) || (t.unshift(e), t.length > 2 && t.pop(), C.setItem(S.RECENT_WALLETS, JSON.stringify(t)));
		} catch {
			console.info("Unable to set AppKit recent");
		}
	},
	getRecentWallets() {
		try {
			let e = C.getItem(S.RECENT_WALLETS);
			return e ? JSON.parse(e) : [];
		} catch {
			console.info("Unable to get AppKit recent");
		}
		return [];
	},
	setConnectedConnectorId(e, t) {
		try {
			let n = ze(e);
			C.setItem(n, t);
		} catch {
			console.info("Unable to set Connected Connector Id");
		}
	},
	getActiveNamespace() {
		try {
			return C.getItem(S.ACTIVE_NAMESPACE);
		} catch {
			console.info("Unable to get active namespace");
		}
	},
	getConnectedConnectorId(e) {
		if (e) try {
			let t = ze(e);
			return C.getItem(t);
		} catch {
			console.info("Unable to get connected connector id in namespace", e);
		}
	},
	setConnectedSocialProvider(e) {
		try {
			C.setItem(S.CONNECTED_SOCIAL, e);
		} catch {
			console.info("Unable to set connected social provider");
		}
	},
	getConnectedSocialProvider() {
		try {
			return C.getItem(S.CONNECTED_SOCIAL);
		} catch {
			console.info("Unable to get connected social provider");
		}
	},
	deleteConnectedSocialProvider() {
		try {
			C.removeItem(S.CONNECTED_SOCIAL);
		} catch {
			console.info("Unable to delete connected social provider");
		}
	},
	getConnectedSocialUsername() {
		try {
			return C.getItem(S.CONNECTED_SOCIAL_USERNAME);
		} catch {
			console.info("Unable to get connected social username");
		}
	},
	getStoredActiveCaipNetworkId() {
		return C.getItem(S.ACTIVE_CAIP_NETWORK_ID)?.split(":")?.[1];
	},
	setConnectionStatus(e) {
		try {
			C.setItem(S.CONNECTION_STATUS, e);
		} catch {
			console.info("Unable to set connection status");
		}
	},
	getConnectionStatus() {
		try {
			return C.getItem(S.CONNECTION_STATUS);
		} catch {
			return;
		}
	},
	getConnectedNamespaces() {
		try {
			let e = C.getItem(S.CONNECTED_NAMESPACES);
			return e?.length ? e.split(",") : [];
		} catch {
			return [];
		}
	},
	setConnectedNamespaces(e) {
		try {
			let t = Array.from(new Set(e));
			C.setItem(S.CONNECTED_NAMESPACES, t.join(","));
		} catch {
			console.info("Unable to set namespaces in storage");
		}
	},
	addConnectedNamespace(e) {
		try {
			let t = T.getConnectedNamespaces();
			t.includes(e) || (t.push(e), T.setConnectedNamespaces(t));
		} catch {
			console.info("Unable to add connected namespace");
		}
	},
	removeConnectedNamespace(e) {
		try {
			let t = T.getConnectedNamespaces(), n = t.indexOf(e);
			n > -1 && (t.splice(n, 1), T.setConnectedNamespaces(t));
		} catch {
			console.info("Unable to remove connected namespace");
		}
	},
	getTelegramSocialProvider() {
		try {
			return C.getItem(S.TELEGRAM_SOCIAL_PROVIDER);
		} catch {
			return console.info("Unable to get telegram social provider"), null;
		}
	},
	setTelegramSocialProvider(e) {
		try {
			C.setItem(S.TELEGRAM_SOCIAL_PROVIDER, e);
		} catch {
			console.info("Unable to set telegram social provider");
		}
	},
	removeTelegramSocialProvider() {
		try {
			C.removeItem(S.TELEGRAM_SOCIAL_PROVIDER);
		} catch {
			console.info("Unable to remove telegram social provider");
		}
	},
	getBalanceCache() {
		let e = {};
		try {
			let t = C.getItem(S.PORTFOLIO_CACHE);
			e = t ? JSON.parse(t) : {};
		} catch {
			console.info("Unable to get balance cache");
		}
		return e;
	},
	removeAddressFromBalanceCache(e) {
		try {
			let t = T.getBalanceCache();
			C.setItem(S.PORTFOLIO_CACHE, JSON.stringify({
				...t,
				[e]: void 0
			}));
		} catch {
			console.info("Unable to remove address from balance cache", e);
		}
	},
	getBalanceCacheForCaipAddress(e) {
		try {
			let t = T.getBalanceCache()[e];
			if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.portfolio)) return t.balance;
			T.removeAddressFromBalanceCache(e);
		} catch {
			console.info("Unable to get balance cache for address", e);
		}
	},
	updateBalanceCache(e) {
		try {
			let t = T.getBalanceCache();
			t[e.caipAddress] = e, C.setItem(S.PORTFOLIO_CACHE, JSON.stringify(t));
		} catch {
			console.info("Unable to update balance cache", e);
		}
	},
	getNativeBalanceCache() {
		let e = {};
		try {
			let t = C.getItem(S.NATIVE_BALANCE_CACHE);
			e = t ? JSON.parse(t) : {};
		} catch {
			console.info("Unable to get balance cache");
		}
		return e;
	},
	removeAddressFromNativeBalanceCache(e) {
		try {
			let t = T.getBalanceCache();
			C.setItem(S.NATIVE_BALANCE_CACHE, JSON.stringify({
				...t,
				[e]: void 0
			}));
		} catch {
			console.info("Unable to remove address from balance cache", e);
		}
	},
	getNativeBalanceCacheForCaipAddress(e) {
		try {
			let t = T.getNativeBalanceCache()[e];
			if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.nativeBalance)) return t;
			console.info("Discarding cache for address", e), T.removeAddressFromBalanceCache(e);
		} catch {
			console.info("Unable to get balance cache for address", e);
		}
	},
	updateNativeBalanceCache(e) {
		try {
			let t = T.getNativeBalanceCache();
			t[e.caipAddress] = e, C.setItem(S.NATIVE_BALANCE_CACHE, JSON.stringify(t));
		} catch {
			console.info("Unable to update balance cache", e);
		}
	},
	getEnsCache() {
		let e = {};
		try {
			let t = C.getItem(S.ENS_CACHE);
			e = t ? JSON.parse(t) : {};
		} catch {
			console.info("Unable to get ens name cache");
		}
		return e;
	},
	getEnsFromCacheForAddress(e) {
		try {
			let t = T.getEnsCache()[e];
			if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.ens)) return t.ens;
			T.removeEnsFromCache(e);
		} catch {
			console.info("Unable to get ens name from cache", e);
		}
	},
	updateEnsCache(e) {
		try {
			let t = T.getEnsCache();
			t[e.address] = e, C.setItem(S.ENS_CACHE, JSON.stringify(t));
		} catch {
			console.info("Unable to update ens name cache", e);
		}
	},
	removeEnsFromCache(e) {
		try {
			let t = T.getEnsCache();
			C.setItem(S.ENS_CACHE, JSON.stringify({
				...t,
				[e]: void 0
			}));
		} catch {
			console.info("Unable to remove ens name from cache", e);
		}
	},
	getIdentityCache() {
		let e = {};
		try {
			let t = C.getItem(S.IDENTITY_CACHE);
			e = t ? JSON.parse(t) : {};
		} catch {
			console.info("Unable to get identity cache");
		}
		return e;
	},
	getIdentityFromCacheForAddress(e) {
		try {
			let t = T.getIdentityCache()[e];
			if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.identity)) return t.identity;
			T.removeIdentityFromCache(e);
		} catch {
			console.info("Unable to get identity from cache", e);
		}
	},
	updateIdentityCache(e) {
		try {
			let t = T.getIdentityCache();
			t[e.address] = {
				identity: e.identity,
				timestamp: e.timestamp
			}, C.setItem(S.IDENTITY_CACHE, JSON.stringify(t));
		} catch {
			console.info("Unable to update identity cache", e);
		}
	},
	removeIdentityFromCache(e) {
		try {
			let t = T.getIdentityCache();
			C.setItem(S.IDENTITY_CACHE, JSON.stringify({
				...t,
				[e]: void 0
			}));
		} catch {
			console.info("Unable to remove identity from cache", e);
		}
	},
	clearAddressCache() {
		try {
			C.removeItem(S.PORTFOLIO_CACHE), C.removeItem(S.NATIVE_BALANCE_CACHE), C.removeItem(S.ENS_CACHE), C.removeItem(S.IDENTITY_CACHE), C.removeItem(S.HISTORY_TRANSACTIONS_CACHE);
		} catch {
			console.info("Unable to clear address cache");
		}
	},
	setPreferredAccountTypes(e) {
		try {
			C.setItem(S.PREFERRED_ACCOUNT_TYPES, JSON.stringify(e));
		} catch {
			console.info("Unable to set preferred account types", e);
		}
	},
	getPreferredAccountTypes() {
		try {
			let e = C.getItem(S.PREFERRED_ACCOUNT_TYPES);
			return e ? JSON.parse(e) : {};
		} catch {
			console.info("Unable to get preferred account types");
		}
		return {};
	},
	setConnections(e, t) {
		try {
			let n = T.getConnections(), r = n[t] ?? [], i = /* @__PURE__ */ new Map();
			for (let e of r) i.set(e.connectorId, { ...e });
			for (let t of e) {
				let e = i.get(t.connectorId), n = t.connectorId === y.CONNECTOR_ID.AUTH;
				if (e && !n) {
					let n = new Set(e.accounts.map((e) => e.address.toLowerCase())), r = t.accounts.filter((e) => !n.has(e.address.toLowerCase()));
					e.accounts.push(...r);
				} else i.set(t.connectorId, { ...t });
			}
			let a = {
				...n,
				[t]: Array.from(i.values())
			};
			C.setItem(S.CONNECTIONS, JSON.stringify(a));
		} catch (e) {
			console.error("Unable to sync connections to storage", e);
		}
	},
	getConnections() {
		try {
			let e = C.getItem(S.CONNECTIONS);
			return e ? JSON.parse(e) : {};
		} catch (e) {
			return console.error("Unable to get connections from storage", e), {};
		}
	},
	deleteAddressFromConnection({ connectorId: e, address: t, namespace: n }) {
		try {
			let r = T.getConnections(), i = r[n] ?? [], a = new Map(i.map((e) => [e.connectorId, e])), o = a.get(e);
			o && (o.accounts.filter((e) => e.address.toLowerCase() !== t.toLowerCase()).length === 0 ? a.delete(e) : a.set(e, {
				...o,
				accounts: o.accounts.filter((e) => e.address.toLowerCase() !== t.toLowerCase())
			})), C.setItem(S.CONNECTIONS, JSON.stringify({
				...r,
				[n]: Array.from(a.values())
			}));
		} catch {
			console.error(`Unable to remove address "${t}" from connector "${e}" in namespace "${n}"`);
		}
	},
	getDisconnectedConnectorIds() {
		try {
			let e = C.getItem(S.DISCONNECTED_CONNECTOR_IDS);
			return e ? JSON.parse(e) : {};
		} catch {
			console.info("Unable to get disconnected connector ids");
		}
		return {};
	},
	addDisconnectedConnectorId(e, t) {
		try {
			let n = T.getDisconnectedConnectorIds(), r = n[t] ?? [];
			r.push(e), C.setItem(S.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
				...n,
				[t]: Array.from(new Set(r))
			}));
		} catch {
			console.error(`Unable to set disconnected connector id "${e}" for namespace "${t}"`);
		}
	},
	removeDisconnectedConnectorId(e, t) {
		try {
			let n = T.getDisconnectedConnectorIds(), r = n[t] ?? [];
			r = r.filter((t) => t.toLowerCase() !== e.toLowerCase()), C.setItem(S.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
				...n,
				[t]: Array.from(new Set(r))
			}));
		} catch {
			console.error(`Unable to remove disconnected connector id "${e}" for namespace "${t}"`);
		}
	},
	isConnectorDisconnected(e, t) {
		try {
			return (T.getDisconnectedConnectorIds()[t] ?? []).some((t) => t.toLowerCase() === e.toLowerCase());
		} catch {
			console.info(`Unable to get disconnected connector id "${e}" for namespace "${t}"`);
		}
		return !1;
	},
	getTransactionsCache() {
		try {
			let e = C.getItem(S.HISTORY_TRANSACTIONS_CACHE);
			return e ? JSON.parse(e) : {};
		} catch {
			console.info("Unable to get transactions cache");
		}
		return {};
	},
	getTransactionsCacheForAddress({ address: e, chainId: t = "" }) {
		try {
			let n = T.getTransactionsCache()[e]?.[t];
			if (n && !this.isCacheExpired(n.timestamp, this.cacheExpiry.transactionsHistory)) return n.transactions;
			T.removeTransactionsCache({
				address: e,
				chainId: t
			});
		} catch {
			console.info("Unable to get transactions cache");
		}
	},
	updateTransactionsCache({ address: e, chainId: t = "", timestamp: n, transactions: r }) {
		try {
			let i = T.getTransactionsCache();
			i[e] = {
				...i[e],
				[t]: {
					timestamp: n,
					transactions: r
				}
			}, C.setItem(S.HISTORY_TRANSACTIONS_CACHE, JSON.stringify(i));
		} catch {
			console.info("Unable to update transactions cache", {
				address: e,
				chainId: t,
				timestamp: n,
				transactions: r
			});
		}
	},
	removeTransactionsCache({ address: e, chainId: t }) {
		try {
			let n = T.getTransactionsCache(), { [t]: r, ...i } = n?.[e] || {};
			C.setItem(S.HISTORY_TRANSACTIONS_CACHE, JSON.stringify({
				...n,
				[e]: i
			}));
		} catch {
			console.info("Unable to remove transactions cache", {
				address: e,
				chainId: t
			});
		}
	},
	getTokenPriceCache() {
		try {
			let e = C.getItem(S.TOKEN_PRICE_CACHE);
			return e ? JSON.parse(e) : {};
		} catch {
			console.info("Unable to get token price cache");
		}
		return {};
	},
	getTokenPriceCacheForAddresses(e) {
		try {
			let t = T.getTokenPriceCache()[e.join(",")];
			if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.tokenPrice)) return t.tokenPrice;
			T.removeTokenPriceCache(e);
		} catch {
			console.info("Unable to get token price cache for addresses", e);
		}
	},
	updateTokenPriceCache(e) {
		try {
			let t = T.getTokenPriceCache();
			t[e.addresses.join(",")] = {
				timestamp: e.timestamp,
				tokenPrice: e.tokenPrice
			}, C.setItem(S.TOKEN_PRICE_CACHE, JSON.stringify(t));
		} catch {
			console.info("Unable to update token price cache", e);
		}
	},
	removeTokenPriceCache(e) {
		try {
			let t = T.getTokenPriceCache();
			C.setItem(S.TOKEN_PRICE_CACHE, JSON.stringify({
				...t,
				[e.join(",")]: void 0
			}));
		} catch {
			console.info("Unable to remove token price cache", e);
		}
	}
}, E = {
	isMobile() {
		return this.isClient() ? !!(window?.matchMedia && typeof window.matchMedia == "function" && window.matchMedia("(pointer:coarse)")?.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
	},
	checkCaipNetwork(e, t = "") {
		return e?.caipNetworkId.toLocaleLowerCase().includes(t.toLowerCase());
	},
	isAndroid() {
		if (!this.isMobile()) return !1;
		let e = window?.navigator.userAgent.toLowerCase();
		return E.isMobile() && e.includes("android");
	},
	isIos() {
		if (!this.isMobile()) return !1;
		let e = window?.navigator.userAgent.toLowerCase();
		return e.includes("iphone") || e.includes("ipad");
	},
	isSafari() {
		return this.isClient() ? (window?.navigator.userAgent.toLowerCase()).includes("safari") : !1;
	},
	isClient() {
		return typeof window < "u";
	},
	isPairingExpired(e) {
		return e ? e - Date.now() <= w.TEN_SEC_MS : !0;
	},
	isAllowedRetry(e, t = w.ONE_SEC_MS) {
		return Date.now() - e >= t;
	},
	copyToClopboard(e) {
		navigator.clipboard.writeText(e);
	},
	isIframe() {
		try {
			return window?.self !== window?.top;
		} catch {
			return !1;
		}
	},
	isSafeApp() {
		if (E.isClient() && window.self !== window.top) try {
			let e = window?.location?.ancestorOrigins?.[0];
			if (e) {
				let t = new URL(e), n = new URL("https://app.safe.global");
				return t.hostname === n.hostname;
			}
		} catch {
			return !1;
		}
		return !1;
	},
	getPairingExpiry() {
		return Date.now() + w.FOUR_MINUTES_MS;
	},
	getNetworkId(e) {
		return e?.split(":")[1];
	},
	getPlainAddress(e) {
		return e?.split(":")[2];
	},
	async wait(e) {
		return new Promise((t) => {
			setTimeout(t, e);
		});
	},
	debounce(e, t = 500) {
		let n;
		return (...r) => {
			function i() {
				e(...r);
			}
			n && clearTimeout(n), n = setTimeout(i, t);
		};
	},
	isHttpUrl(e) {
		return e.startsWith("http://") || e.startsWith("https://");
	},
	formatNativeUrl(e, t, n = null) {
		if (E.isHttpUrl(e)) return this.formatUniversalUrl(e, t);
		let r = e, i = n;
		r.includes("://") || (r = e.replaceAll("/", "").replaceAll(":", ""), r = `${r}://`), r.endsWith("/") || (r = `${r}/`), i && !i?.endsWith("/") && (i = `${i}/`), this.isTelegram() && this.isAndroid() && (t = encodeURIComponent(t));
		let a = encodeURIComponent(t);
		return {
			redirect: `${r}wc?uri=${a}`,
			redirectUniversalLink: i ? `${i}wc?uri=${a}` : void 0,
			href: r
		};
	},
	formatUniversalUrl(e, t) {
		if (!E.isHttpUrl(e)) return this.formatNativeUrl(e, t);
		let n = e;
		return n.endsWith("/") || (n = `${n}/`), {
			redirect: `${n}wc?uri=${encodeURIComponent(t)}`,
			href: n
		};
	},
	getOpenTargetForPlatform(e) {
		return e === "popupWindow" ? e : this.isTelegram() ? T.getTelegramSocialProvider() ? "_top" : "_blank" : e;
	},
	openHref(e, t, n) {
		window?.open(e, this.getOpenTargetForPlatform(t), n || "noreferrer noopener");
	},
	returnOpenHref(e, t, n) {
		return window?.open(e, this.getOpenTargetForPlatform(t), n || "noreferrer noopener");
	},
	isTelegram() {
		return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
	},
	isPWA() {
		if (typeof window > "u") return !1;
		let e = window?.matchMedia && typeof window.matchMedia == "function" ? window.matchMedia("(display-mode: standalone)")?.matches : !1, t = window?.navigator?.standalone;
		return !!(e || t);
	},
	async preloadImage(e) {
		let t = new Promise((t, n) => {
			let r = new Image();
			r.onload = t, r.onerror = n, r.crossOrigin = "anonymous", r.src = e;
		});
		return Promise.race([t, E.wait(2e3)]);
	},
	formatBalance(e, t) {
		let n = "0.000";
		if (typeof e == "string") {
			let t = Number(e);
			if (t) {
				let e = Math.floor(t * 1e3) / 1e3;
				e && (n = e.toString());
			}
		}
		return `${n}${t ? ` ${t}` : ""}`;
	},
	getApiUrl() {
		return y.W3M_API_URL;
	},
	getBlockchainApiUrl() {
		return y.BLOCKCHAIN_API_RPC_URL;
	},
	getAnalyticsUrl() {
		return y.PULSE_API_URL;
	},
	getUUID() {
		return crypto?.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
			let t = Math.random() * 16 | 0;
			return (e === "x" ? t : t & 3 | 8).toString(16);
		});
	},
	parseError(e) {
		return typeof e == "string" ? e : typeof e?.issues?.[0]?.message == "string" ? e.issues[0].message : e instanceof Error ? e.message : "Unknown error";
	},
	sortRequestedNetworks(e, t = []) {
		let n = {};
		return t && e && (e.forEach((e, t) => {
			n[e] = t;
		}), t.sort((e, t) => {
			let r = n[e.id], i = n[t.id];
			return r !== void 0 && i !== void 0 ? r - i : r === void 0 ? i === void 0 ? 0 : 1 : -1;
		})), t;
	},
	calculateBalance(e) {
		let t = 0;
		for (let n of e) t += n.value ?? 0;
		return t;
	},
	formatTokenBalance(e) {
		let [t, n] = e.toFixed(2).split(".");
		return {
			dollars: t,
			pennies: n
		};
	},
	isAddress(e, t = "eip155") {
		switch (t) {
			case "eip155": return /^(?:0x)?[0-9a-f]{40}$/iu.test(e) ? !!(/^(?:0x)?[0-9a-f]{40}$/iu.test(e) || /^(?:0x)?[0-9A-F]{40}$/iu.test(e)) : !1;
			case "solana": return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(e);
			default: return !1;
		}
	},
	uniqueBy(e, t) {
		let n = /* @__PURE__ */ new Set();
		return e.filter((e) => {
			let r = e[t];
			return n.has(r) ? !1 : (n.add(r), !0);
		});
	},
	generateSdkVersion(e, t, n) {
		return `${t}-${e.length === 0 ? w.ADAPTER_TYPES.UNIVERSAL : e.map((e) => e.adapterType).join(",")}-${n}`;
	},
	createAccount(e, t, n, r, i) {
		return {
			namespace: e,
			address: t,
			type: n,
			publicKey: r,
			path: i
		};
	},
	isCaipAddress(e) {
		if (typeof e != "string") return !1;
		let t = e.split(":"), n = t[0];
		return t.filter(Boolean).length === 3 && n in y.CHAIN_NAME_MAP;
	},
	getAccount(e) {
		return e ? typeof e == "string" ? {
			address: e,
			chainId: void 0
		} : {
			address: e.address,
			chainId: e.chainId
		} : {
			address: void 0,
			chainId: void 0
		};
	},
	isMac() {
		let e = window?.navigator.userAgent.toLowerCase();
		return e.includes("macintosh") && !e.includes("safari");
	},
	formatTelegramSocialLoginUrl(e) {
		let t = `--${encodeURIComponent(window?.location.href)}`, n = "state=";
		if (new URL(e).host === "auth.magic.link") {
			let r = e.substring(e.indexOf("provider_authorization_url=") + 27), i = this.injectIntoUrl(decodeURIComponent(r), n, t);
			return e.replace(r, encodeURIComponent(i));
		}
		return this.injectIntoUrl(e, n, t);
	},
	injectIntoUrl(e, t, n) {
		let r = e.indexOf(t);
		if (r === -1) throw Error(`${t} parameter not found in the URL: ${e}`);
		let i = e.indexOf("&", r), a = t.length, o = i === -1 ? e.length : i, s = e.substring(0, r + a), c = e.substring(r + a, o), l = e.substring(i);
		return s + (c + n) + l;
	}
};
//#endregion
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js
async function Ge(...e) {
	let t = await fetch(...e);
	if (!t.ok) throw Error(`HTTP status code: ${t.status}`, { cause: t });
	return t;
}
var Ke = class {
	constructor({ baseUrl: e, clientId: t }) {
		this.baseUrl = e, this.clientId = t;
	}
	async get({ headers: e, signal: t, cache: n, ...r }) {
		return (await Ge(this.createUrl(r), {
			method: "GET",
			headers: e,
			signal: t,
			cache: n
		})).json();
	}
	async getBlob({ headers: e, signal: t, ...n }) {
		return (await Ge(this.createUrl(n), {
			method: "GET",
			headers: e,
			signal: t
		})).blob();
	}
	async post({ body: e, headers: t, signal: n, ...r }) {
		return (await Ge(this.createUrl(r), {
			method: "POST",
			headers: t,
			body: e ? JSON.stringify(e) : void 0,
			signal: n
		})).json();
	}
	async put({ body: e, headers: t, signal: n, ...r }) {
		return (await Ge(this.createUrl(r), {
			method: "PUT",
			headers: t,
			body: e ? JSON.stringify(e) : void 0,
			signal: n
		})).json();
	}
	async delete({ body: e, headers: t, signal: n, ...r }) {
		return (await Ge(this.createUrl(r), {
			method: "DELETE",
			headers: t,
			body: e ? JSON.stringify(e) : void 0,
			signal: n
		})).json();
	}
	createUrl({ path: e, params: t }) {
		let n = new URL(e, this.baseUrl);
		return t && Object.entries(t).forEach(([e, t]) => {
			t && n.searchParams.append(e, t);
		}), this.clientId && n.searchParams.append("clientId", this.clientId), n;
	}
}, qe = {
	getFeatureValue(e, t) {
		let n = t?.[e];
		return n === void 0 ? w.DEFAULT_FEATURES[e] : n;
	},
	filterSocialsByPlatform(e) {
		if (!e || !e.length) return e;
		if (E.isTelegram()) {
			if (E.isIos()) return e.filter((e) => e !== "google");
			if (E.isMac()) return e.filter((e) => e !== "x");
			if (E.isAndroid()) return e.filter((e) => !["facebook", "x"].includes(e));
		}
		return e;
	}
}, D = g({
	features: w.DEFAULT_FEATURES,
	projectId: "",
	sdkType: "appkit",
	sdkVersion: "html-wagmi-undefined",
	defaultAccountTypes: w.DEFAULT_ACCOUNT_TYPES,
	enableNetworkSwitch: !0,
	experimental_preferUniversalLinks: !1,
	remoteFeatures: {}
}), O = {
	state: D,
	subscribeKey(e, t) {
		return v(D, e, t);
	},
	setOptions(e) {
		Object.assign(D, e);
	},
	setRemoteFeatures(e) {
		e && (D.remoteFeatures = {
			...D.remoteFeatures,
			...e
		}, D.remoteFeatures?.socials && (D.remoteFeatures.socials = qe.filterSocialsByPlatform(D.remoteFeatures.socials)), D.features?.pay && (D.remoteFeatures.email = !1, D.remoteFeatures.socials = !1));
	},
	setFeatures(e) {
		e && (D.features || (D.features = w.DEFAULT_FEATURES), D.features = {
			...D.features,
			...e
		}, D.features?.pay && D.remoteFeatures && (D.remoteFeatures.email = !1, D.remoteFeatures.socials = !1));
	},
	setProjectId(e) {
		D.projectId = e;
	},
	setCustomRpcUrls(e) {
		D.customRpcUrls = e;
	},
	setAllWallets(e) {
		D.allWallets = e;
	},
	setIncludeWalletIds(e) {
		D.includeWalletIds = e;
	},
	setExcludeWalletIds(e) {
		D.excludeWalletIds = e;
	},
	setFeaturedWalletIds(e) {
		D.featuredWalletIds = e;
	},
	setTokens(e) {
		D.tokens = e;
	},
	setTermsConditionsUrl(e) {
		D.termsConditionsUrl = e;
	},
	setPrivacyPolicyUrl(e) {
		D.privacyPolicyUrl = e;
	},
	setCustomWallets(e) {
		D.customWallets = e;
	},
	setIsSiweEnabled(e) {
		D.isSiweEnabled = e;
	},
	setIsUniversalProvider(e) {
		D.isUniversalProvider = e;
	},
	setSdkVersion(e) {
		D.sdkVersion = e;
	},
	setMetadata(e) {
		D.metadata = e;
	},
	setDisableAppend(e) {
		D.disableAppend = e;
	},
	setEIP6963Enabled(e) {
		D.enableEIP6963 = e;
	},
	setDebug(e) {
		D.debug = e;
	},
	setEnableWalletConnect(e) {
		D.enableWalletConnect = e;
	},
	setEnableWalletGuide(e) {
		D.enableWalletGuide = e;
	},
	setEnableAuthLogger(e) {
		D.enableAuthLogger = e;
	},
	setEnableWallets(e) {
		D.enableWallets = e;
	},
	setPreferUniversalLinks(e) {
		D.experimental_preferUniversalLinks = e;
	},
	setSIWX(e) {
		if (e) for (let [t, n] of Object.entries(w.SIWX_DEFAULTS)) e[t] ?? (e[t] = n);
		D.siwx = e;
	},
	setConnectMethodsOrder(e) {
		D.features = {
			...D.features,
			connectMethodsOrder: e
		};
	},
	setWalletFeaturesOrder(e) {
		D.features = {
			...D.features,
			walletFeaturesOrder: e
		};
	},
	setSocialsOrder(e) {
		D.remoteFeatures = {
			...D.remoteFeatures,
			socials: e
		};
	},
	setCollapseWallets(e) {
		D.features = {
			...D.features,
			collapseWallets: e
		};
	},
	setEnableEmbedded(e) {
		D.enableEmbedded = e;
	},
	setAllowUnsupportedChain(e) {
		D.allowUnsupportedChain = e;
	},
	setManualWCControl(e) {
		D.manualWCControl = e;
	},
	setEnableNetworkSwitch(e) {
		D.enableNetworkSwitch = e;
	},
	setEnableReconnect(e) {
		D.enableReconnect = e;
	},
	setDefaultAccountTypes(e = {}) {
		Object.entries(e).forEach(([e, t]) => {
			t && (D.defaultAccountTypes[e] = t);
		});
	},
	setUniversalProviderConfigOverride(e) {
		D.universalProviderConfigOverride = e;
	},
	getUniversalProviderConfigOverride() {
		return D.universalProviderConfigOverride;
	},
	getSnapshot() {
		return ie(D);
	}
}, Je = Object.freeze({
	enabled: !0,
	events: []
}), Ye = new Ke({
	baseUrl: E.getAnalyticsUrl(),
	clientId: null
}), Xe = 5, Ze = 60 * 1e3, Qe = g({ ...Je }), $e = {
	state: Qe,
	subscribeKey(e, t) {
		return v(Qe, e, t);
	},
	async sendError(e, t) {
		if (!Qe.enabled) return;
		let n = Date.now();
		if (Qe.events.filter((e) => n - new Date(e.properties.timestamp || "").getTime() < Ze).length >= Xe) return;
		let r = {
			type: "error",
			event: t,
			properties: {
				errorType: e.name,
				errorMessage: e.message,
				stackTrace: e.stack,
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			}
		};
		Qe.events.push(r);
		try {
			if (typeof window > "u") return;
			let { projectId: n, sdkType: r, sdkVersion: i } = O.state;
			await Ye.post({
				path: "/e",
				params: {
					projectId: n,
					st: r,
					sv: i || "html-wagmi-4.2.2"
				},
				body: {
					eventId: E.getUUID(),
					url: window.location.href,
					domain: window.location.hostname,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					props: {
						type: "error",
						event: t,
						errorType: e.name,
						errorMessage: e.message,
						stackTrace: e.stack
					}
				}
			});
		} catch {}
	},
	enable() {
		Qe.enabled = !0;
	},
	disable() {
		Qe.enabled = !1;
	},
	clearEvents() {
		Qe.events = [];
	}
}, et = class e extends Error {
	constructor(t, n, r) {
		super(t), this.name = "AppKitError", this.category = n, this.originalError = r, Object.setPrototypeOf(this, e.prototype);
		let i = !1;
		if (r instanceof Error && typeof r.stack == "string" && r.stack) {
			let e = r.stack, t = e.indexOf("\n");
			if (t > -1) {
				let n = e.substring(t + 1);
				this.stack = `${this.name}: ${this.message}\n${n}`, i = !0;
			}
		}
		i || (Error.captureStackTrace ? Error.captureStackTrace(this, e) : this.stack || (this.stack = `${this.name}: ${this.message}`));
	}
};
function tt(e, t) {
	let n = "";
	try {
		n = e instanceof Error ? e.message : typeof e == "string" ? e : typeof e == "object" && e ? JSON.stringify(e) : String(e);
	} catch (e) {
		n = "Unknown error", console.error("Error parsing error message", e);
	}
	let r = e instanceof et ? e : new et(n, t, e);
	throw $e.sendError(r, r.category), r;
}
function k(e, t = "INTERNAL_SDK_ERROR") {
	let n = {};
	return Object.keys(e).forEach((r) => {
		let i = e[r];
		if (typeof i == "function") {
			let e = i;
			e = i.constructor.name === "AsyncFunction" ? async (...e) => {
				try {
					return await i(...e);
				} catch (e) {
					return tt(e, t);
				}
			} : (...e) => {
				try {
					return i(...e);
				} catch (e) {
					return tt(e, t);
				}
			}, n[r] = e;
		} else n[r] = i;
	}), n;
}
var nt = (typeof process < "u" && process.env !== void 0 ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL : void 0) || "https://secure.walletconnect.org/sdk", rt = (typeof process < "u" && process.env !== void 0 ? process.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL : void 0) || "error", it = (typeof process < "u" && process.env !== void 0 ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION : void 0) || "4", at = {
	APP_EVENT_KEY: "@w3m-app/",
	FRAME_EVENT_KEY: "@w3m-frame/",
	RPC_METHOD_KEY: "RPC_",
	STORAGE_KEY: "@appkit-wallet/",
	SESSION_TOKEN_KEY: "SESSION_TOKEN_KEY",
	EMAIL_LOGIN_USED_KEY: "EMAIL_LOGIN_USED_KEY",
	LAST_USED_CHAIN_KEY: "LAST_USED_CHAIN_KEY",
	LAST_EMAIL_LOGIN_TIME: "LAST_EMAIL_LOGIN_TIME",
	EMAIL: "EMAIL",
	PREFERRED_ACCOUNT_TYPE: "PREFERRED_ACCOUNT_TYPE",
	SMART_ACCOUNT_ENABLED: "SMART_ACCOUNT_ENABLED",
	SMART_ACCOUNT_ENABLED_NETWORKS: "SMART_ACCOUNT_ENABLED_NETWORKS",
	SOCIAL_USERNAME: "SOCIAL_USERNAME",
	APP_SWITCH_NETWORK: "@w3m-app/SWITCH_NETWORK",
	APP_CONNECT_EMAIL: "@w3m-app/CONNECT_EMAIL",
	APP_CONNECT_DEVICE: "@w3m-app/CONNECT_DEVICE",
	APP_CONNECT_OTP: "@w3m-app/CONNECT_OTP",
	APP_CONNECT_SOCIAL: "@w3m-app/CONNECT_SOCIAL",
	APP_GET_SOCIAL_REDIRECT_URI: "@w3m-app/GET_SOCIAL_REDIRECT_URI",
	APP_GET_USER: "@w3m-app/GET_USER",
	APP_SIGN_OUT: "@w3m-app/SIGN_OUT",
	APP_IS_CONNECTED: "@w3m-app/IS_CONNECTED",
	APP_GET_CHAIN_ID: "@w3m-app/GET_CHAIN_ID",
	APP_RPC_REQUEST: "@w3m-app/RPC_REQUEST",
	APP_UPDATE_EMAIL: "@w3m-app/UPDATE_EMAIL",
	APP_UPDATE_EMAIL_PRIMARY_OTP: "@w3m-app/UPDATE_EMAIL_PRIMARY_OTP",
	APP_UPDATE_EMAIL_SECONDARY_OTP: "@w3m-app/UPDATE_EMAIL_SECONDARY_OTP",
	APP_AWAIT_UPDATE_EMAIL: "@w3m-app/AWAIT_UPDATE_EMAIL",
	APP_SYNC_THEME: "@w3m-app/SYNC_THEME",
	APP_SYNC_DAPP_DATA: "@w3m-app/SYNC_DAPP_DATA",
	APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: "@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS",
	APP_INIT_SMART_ACCOUNT: "@w3m-app/INIT_SMART_ACCOUNT",
	APP_SET_PREFERRED_ACCOUNT: "@w3m-app/SET_PREFERRED_ACCOUNT",
	APP_CONNECT_FARCASTER: "@w3m-app/CONNECT_FARCASTER",
	APP_GET_FARCASTER_URI: "@w3m-app/GET_FARCASTER_URI",
	APP_RELOAD: "@w3m-app/RELOAD",
	APP_RPC_ABORT: "@w3m-app/RPC_ABORT",
	FRAME_SWITCH_NETWORK_ERROR: "@w3m-frame/SWITCH_NETWORK_ERROR",
	FRAME_SWITCH_NETWORK_SUCCESS: "@w3m-frame/SWITCH_NETWORK_SUCCESS",
	FRAME_CONNECT_EMAIL_ERROR: "@w3m-frame/CONNECT_EMAIL_ERROR",
	FRAME_CONNECT_EMAIL_SUCCESS: "@w3m-frame/CONNECT_EMAIL_SUCCESS",
	FRAME_CONNECT_DEVICE_ERROR: "@w3m-frame/CONNECT_DEVICE_ERROR",
	FRAME_CONNECT_DEVICE_SUCCESS: "@w3m-frame/CONNECT_DEVICE_SUCCESS",
	FRAME_CONNECT_OTP_SUCCESS: "@w3m-frame/CONNECT_OTP_SUCCESS",
	FRAME_CONNECT_OTP_ERROR: "@w3m-frame/CONNECT_OTP_ERROR",
	FRAME_CONNECT_SOCIAL_SUCCESS: "@w3m-frame/CONNECT_SOCIAL_SUCCESS",
	FRAME_CONNECT_SOCIAL_ERROR: "@w3m-frame/CONNECT_SOCIAL_ERROR",
	FRAME_CONNECT_FARCASTER_SUCCESS: "@w3m-frame/CONNECT_FARCASTER_SUCCESS",
	FRAME_CONNECT_FARCASTER_ERROR: "@w3m-frame/CONNECT_FARCASTER_ERROR",
	FRAME_GET_FARCASTER_URI_SUCCESS: "@w3m-frame/GET_FARCASTER_URI_SUCCESS",
	FRAME_GET_FARCASTER_URI_ERROR: "@w3m-frame/GET_FARCASTER_URI_ERROR",
	FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS",
	FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR",
	FRAME_GET_USER_SUCCESS: "@w3m-frame/GET_USER_SUCCESS",
	FRAME_GET_USER_ERROR: "@w3m-frame/GET_USER_ERROR",
	FRAME_SIGN_OUT_SUCCESS: "@w3m-frame/SIGN_OUT_SUCCESS",
	FRAME_SIGN_OUT_ERROR: "@w3m-frame/SIGN_OUT_ERROR",
	FRAME_IS_CONNECTED_SUCCESS: "@w3m-frame/IS_CONNECTED_SUCCESS",
	FRAME_IS_CONNECTED_ERROR: "@w3m-frame/IS_CONNECTED_ERROR",
	FRAME_GET_CHAIN_ID_SUCCESS: "@w3m-frame/GET_CHAIN_ID_SUCCESS",
	FRAME_GET_CHAIN_ID_ERROR: "@w3m-frame/GET_CHAIN_ID_ERROR",
	FRAME_RPC_REQUEST_SUCCESS: "@w3m-frame/RPC_REQUEST_SUCCESS",
	FRAME_RPC_REQUEST_ERROR: "@w3m-frame/RPC_REQUEST_ERROR",
	FRAME_SESSION_UPDATE: "@w3m-frame/SESSION_UPDATE",
	FRAME_UPDATE_EMAIL_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SUCCESS",
	FRAME_UPDATE_EMAIL_ERROR: "@w3m-frame/UPDATE_EMAIL_ERROR",
	FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS",
	FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR",
	FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS",
	FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR",
	FRAME_SYNC_THEME_SUCCESS: "@w3m-frame/SYNC_THEME_SUCCESS",
	FRAME_SYNC_THEME_ERROR: "@w3m-frame/SYNC_THEME_ERROR",
	FRAME_SYNC_DAPP_DATA_SUCCESS: "@w3m-frame/SYNC_DAPP_DATA_SUCCESS",
	FRAME_SYNC_DAPP_DATA_ERROR: "@w3m-frame/SYNC_DAPP_DATA_ERROR",
	FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS",
	FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR",
	FRAME_INIT_SMART_ACCOUNT_SUCCESS: "@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS",
	FRAME_INIT_SMART_ACCOUNT_ERROR: "@w3m-frame/INIT_SMART_ACCOUNT_ERROR",
	FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: "@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS",
	FRAME_SET_PREFERRED_ACCOUNT_ERROR: "@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR",
	FRAME_READY: "@w3m-frame/READY",
	FRAME_RELOAD_SUCCESS: "@w3m-frame/RELOAD_SUCCESS",
	FRAME_RELOAD_ERROR: "@w3m-frame/RELOAD_ERROR",
	FRAME_RPC_ABORT_SUCCESS: "@w3m-frame/RPC_ABORT_SUCCESS",
	FRAME_RPC_ABORT_ERROR: "@w3m-frame/RPC_ABORT_ERROR",
	RPC_RESPONSE_TYPE_ERROR: "RPC_RESPONSE_ERROR",
	RPC_RESPONSE_TYPE_TX: "RPC_RESPONSE_TRANSACTION_HASH",
	RPC_RESPONSE_TYPE_OBJECT: "RPC_RESPONSE_OBJECT"
}, ot = {
	SAFE_RPC_METHODS: /* @__PURE__ */ "eth_accounts.eth_blockNumber.eth_call.eth_chainId.eth_estimateGas.eth_feeHistory.eth_gasPrice.eth_getAccount.eth_getBalance.eth_getBlockByHash.eth_getBlockByNumber.eth_getBlockReceipts.eth_getBlockTransactionCountByHash.eth_getBlockTransactionCountByNumber.eth_getCode.eth_getFilterChanges.eth_getFilterLogs.eth_getLogs.eth_getProof.eth_getStorageAt.eth_getTransactionByBlockHashAndIndex.eth_getTransactionByBlockNumberAndIndex.eth_getTransactionByHash.eth_getTransactionCount.eth_getTransactionReceipt.eth_getUncleCountByBlockHash.eth_getUncleCountByBlockNumber.eth_maxPriorityFeePerGas.eth_newBlockFilter.eth_newFilter.eth_newPendingTransactionFilter.eth_sendRawTransaction.eth_syncing.eth_uninstallFilter.wallet_getCapabilities.wallet_getCallsStatus.eth_getUserOperationReceipt.eth_estimateUserOperationGas.eth_getUserOperationByHash.eth_supportedEntryPoints.wallet_getAssets".split("."),
	NOT_SAFE_RPC_METHODS: [
		"personal_sign",
		"eth_signTypedData_v4",
		"eth_sendTransaction",
		"solana_signMessage",
		"solana_signTransaction",
		"solana_signAllTransactions",
		"solana_signAndSendTransaction",
		"wallet_sendCalls",
		"wallet_grantPermissions",
		"wallet_revokePermissions",
		"eth_sendUserOperation"
	],
	GET_CHAIN_ID: "eth_chainId",
	RPC_METHOD_NOT_ALLOWED_MESSAGE: "Requested RPC call is not allowed",
	RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: "Action not allowed",
	ACCOUNT_TYPES: {
		EOA: "eoa",
		SMART_ACCOUNT: "smartAccount"
	}
}, A = {
	PHANTOM: {
		id: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
		url: "https://phantom.app"
	},
	SOLFLARE: {
		id: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
		url: "https://solflare.com"
	},
	COINBASE: {
		id: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
		url: "https://go.cb-w.com"
	},
	BINANCE: {
		id: "2fafea35bb471d22889ccb49c08d99dd0a18a37982602c33f696a5723934ba25",
		appId: "yFK5FCqYprrXDiVFbhyRx7",
		deeplink: "bnc://app.binance.com/mp/app",
		url: "https://app.binance.com/en/download"
	}
}, st = { handleMobileDeeplinkRedirect(e, t) {
	let n = window.location.href, r = encodeURIComponent(n);
	if (e === A.PHANTOM.id && !("phantom" in window)) {
		let e = n.startsWith("https") ? "https" : "http", t = n.split("/")[2], i = encodeURIComponent(`${e}://${t}`);
		window.location.href = `${A.PHANTOM.url}/ul/browse/${r}?ref=${i}`;
	}
	if (e === A.SOLFLARE.id && !("solflare" in window) && (window.location.href = `${A.SOLFLARE.url}/ul/v1/browse/${r}?ref=${r}`), t === y.CHAIN.SOLANA && e === A.COINBASE.id && !("coinbaseSolana" in window) && (window.location.href = `${A.COINBASE.url}/dapp?cb_url=${r}`), t === y.CHAIN.BITCOIN && e === A.BINANCE.id && !("binancew3w" in window)) {
		let e = J.state.activeCaipNetwork, t = window.btoa("/pages/browser/index"), n = window.btoa(`url=${r}&defaultChainId=${e?.id ?? 1}`), i = new URL(A.BINANCE.deeplink);
		i.searchParams.set("appId", A.BINANCE.appId), i.searchParams.set("startPagePath", t), i.searchParams.set("startPageQuery", n);
		let a = new URL(A.BINANCE.url);
		a.searchParams.set("_dp", window.btoa(i.toString())), window.location.href = a.toString();
	}
} }, j = g({
	walletImages: {},
	networkImages: {},
	chainImages: {},
	connectorImages: {},
	tokenImages: {},
	currencyImages: {}
}), M = k({
	state: j,
	subscribeNetworkImages(e) {
		return _(j.networkImages, () => e(j.networkImages));
	},
	subscribeKey(e, t) {
		return v(j, e, t);
	},
	subscribe(e) {
		return _(j, () => e(j));
	},
	setWalletImage(e, t) {
		j.walletImages[e] = t;
	},
	setNetworkImage(e, t) {
		j.networkImages[e] = t;
	},
	setChainImage(e, t) {
		j.chainImages[e] = t;
	},
	setConnectorImage(e, t) {
		j.connectorImages = {
			...j.connectorImages,
			[e]: t
		};
	},
	setTokenImage(e, t) {
		j.tokenImages[e] = t;
	},
	setCurrencyImage(e, t) {
		j.currencyImages[e] = t;
	}
}), ct = {
	eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
	solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
	polkadot: "",
	bip122: "0b4838db-0161-4ffe-022d-532bf03dba00",
	cosmos: "",
	sui: "",
	stacks: ""
}, lt = g({ networkImagePromises: {} }), ut = {
	async fetchWalletImage(e) {
		if (e) return await I._fetchWalletImage(e), this.getWalletImageById(e);
	},
	async fetchNetworkImage(e) {
		return e ? this.getNetworkImageById(e) || (lt.networkImagePromises[e] || (lt.networkImagePromises[e] = I._fetchNetworkImage(e)), await lt.networkImagePromises[e], this.getNetworkImageById(e)) : void 0;
	},
	getWalletImageById(e) {
		if (e) return M.state.walletImages[e];
	},
	getWalletImage(e) {
		if (e?.image_url) return e?.image_url;
		if (e?.image_id) return M.state.walletImages[e.image_id];
	},
	getNetworkImage(e) {
		if (e?.assets?.imageUrl) return e?.assets?.imageUrl;
		if (e?.assets?.imageId) return M.state.networkImages[e.assets.imageId];
	},
	getNetworkImageById(e) {
		if (e) return M.state.networkImages[e];
	},
	getConnectorImage(e) {
		if (e?.imageUrl) return e.imageUrl;
		if (e?.info?.icon) return e.info.icon;
		if (e?.imageId) return M.state.connectorImages[e.imageId];
	},
	getChainImage(e) {
		return M.state.networkImages[ct[e]];
	}
}, dt = g({
	message: "",
	variant: "info",
	open: !1
}), ft = k({
	state: dt,
	subscribeKey(e, t) {
		return v(dt, e, t);
	},
	open(e, t) {
		let { debug: n } = O.state, { code: r, displayMessage: i, debugMessage: a } = e;
		i && n && (dt.message = i, dt.variant = t, dt.open = !0), a && console.error(typeof a == "function" ? a() : a, r ? { code: r } : void 0);
	},
	close() {
		dt.open = !1, dt.message = "", dt.variant = "info";
	}
}), pt = new Ke({
	baseUrl: E.getAnalyticsUrl(),
	clientId: null
}), mt = ["MODAL_CREATED"], ht = g({
	timestamp: Date.now(),
	reportedErrors: {},
	data: {
		type: "track",
		event: "MODAL_CREATED"
	}
}), N = {
	state: ht,
	subscribe(e) {
		return _(ht, () => e(ht));
	},
	getSdkProperties() {
		let { projectId: e, sdkType: t, sdkVersion: n } = O.state;
		return {
			projectId: e,
			st: t,
			sv: n || "html-wagmi-4.2.2"
		};
	},
	async _sendAnalyticsEvent(e) {
		try {
			let t = Z.state.address;
			if ("address" in e.data && e.data.address && (t = e.data.address), mt.includes(e.data.event) || typeof window > "u") return;
			let n = J.getActiveCaipNetwork()?.caipNetworkId;
			await pt.post({
				path: "/e",
				params: N.getSdkProperties(),
				body: {
					eventId: E.getUUID(),
					url: window.location.href,
					domain: window.location.hostname,
					timestamp: e.timestamp,
					props: {
						...e.data,
						address: t,
						properties: {
							..."properties" in e.data ? e.data.properties : {},
							caipNetworkId: n
						}
					}
				}
			}), ht.reportedErrors.FORBIDDEN = !1;
		} catch (e) {
			e instanceof Error && e.cause instanceof Response && e.cause.status === y.HTTP_STATUS_CODES.FORBIDDEN && !ht.reportedErrors.FORBIDDEN && (ft.open({
				displayMessage: "Invalid App Configuration",
				debugMessage: `Origin ${Be() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
			}, "error"), ht.reportedErrors.FORBIDDEN = !0);
		}
	},
	sendEvent(e) {
		ht.timestamp = Date.now(), ht.data = e, (O.state.features?.analytics || [
			"INITIALIZE",
			"CONNECT_SUCCESS",
			"SOCIAL_LOGIN_SUCCESS"
		].includes(e.event)) && N._sendAnalyticsEvent(ht);
	}
}, P = new Ke({
	baseUrl: E.getApiUrl(),
	clientId: null
}), gt = 40, _t = 4, vt = 20, F = g({
	promises: {},
	page: 1,
	count: 0,
	featured: [],
	allFeatured: [],
	recommended: [],
	allRecommended: [],
	wallets: [],
	filteredWallets: [],
	search: [],
	isAnalyticsEnabled: !1,
	excludedWallets: [],
	isFetchingRecommendedWallets: !1
}), I = {
	state: F,
	subscribeKey(e, t) {
		return v(F, e, t);
	},
	_getSdkProperties() {
		let { projectId: e, sdkType: t, sdkVersion: n } = O.state;
		return {
			projectId: e,
			st: t || "appkit",
			sv: n || "html-wagmi-4.2.2"
		};
	},
	_filterOutExtensions(e) {
		return O.state.isUniversalProvider ? e.filter((e) => !!(e.mobile_link || e.desktop_link || e.webapp_link)) : e;
	},
	async _fetchWalletImage(e) {
		let t = `${P.baseUrl}/getWalletImage/${e}`, n = await P.getBlob({
			path: t,
			params: I._getSdkProperties()
		});
		M.setWalletImage(e, URL.createObjectURL(n));
	},
	async _fetchNetworkImage(e) {
		let t = `${P.baseUrl}/public/getAssetImage/${e}`, n = await P.getBlob({
			path: t,
			params: I._getSdkProperties()
		});
		M.setNetworkImage(e, URL.createObjectURL(n));
	},
	async _fetchConnectorImage(e) {
		let t = `${P.baseUrl}/public/getAssetImage/${e}`, n = await P.getBlob({
			path: t,
			params: I._getSdkProperties()
		});
		M.setConnectorImage(e, URL.createObjectURL(n));
	},
	async _fetchCurrencyImage(e) {
		let t = `${P.baseUrl}/public/getCurrencyImage/${e}`, n = await P.getBlob({
			path: t,
			params: I._getSdkProperties()
		});
		M.setCurrencyImage(e, URL.createObjectURL(n));
	},
	async _fetchTokenImage(e) {
		let t = `${P.baseUrl}/public/getTokenImage/${e}`, n = await P.getBlob({
			path: t,
			params: I._getSdkProperties()
		});
		M.setTokenImage(e, URL.createObjectURL(n));
	},
	_filterWalletsByPlatform(e) {
		return E.isMobile() ? e?.filter((e) => e.mobile_link || e.id === A.COINBASE.id || e.id === A.BINANCE.id ? !0 : J.state.activeChain === "solana" && (e.id === A.SOLFLARE.id || e.id === A.PHANTOM.id)) : e;
	},
	async fetchProjectConfig() {
		return (await P.get({
			path: "/appkit/v1/config",
			params: I._getSdkProperties()
		})).features;
	},
	async fetchAllowedOrigins() {
		try {
			let { allowedOrigins: e } = await P.get({
				path: "/projects/v1/origins",
				params: I._getSdkProperties()
			});
			return e;
		} catch (e) {
			if (e instanceof Error && e.cause instanceof Response) {
				let t = e.cause.status;
				if (t === y.HTTP_STATUS_CODES.TOO_MANY_REQUESTS) throw Error("RATE_LIMITED", { cause: e });
				if (t >= y.HTTP_STATUS_CODES.SERVER_ERROR && t < 600) throw Error("SERVER_ERROR", { cause: e });
				return [];
			}
			return [];
		}
	},
	async fetchNetworkImages() {
		let e = J.getAllRequestedCaipNetworks()?.map(({ assets: e }) => e?.imageId).filter(Boolean).filter((e) => !ut.getNetworkImageById(e));
		e && await Promise.allSettled(e.map((e) => I._fetchNetworkImage(e)));
	},
	async fetchConnectorImages() {
		let { connectors: e } = B.state, t = e.map(({ imageId: e }) => e).filter(Boolean);
		await Promise.allSettled(t.map((e) => I._fetchConnectorImage(e)));
	},
	async fetchCurrencyImages(e = []) {
		await Promise.allSettled(e.map((e) => I._fetchCurrencyImage(e)));
	},
	async fetchTokenImages(e = []) {
		await Promise.allSettled(e.map((e) => I._fetchTokenImage(e)));
	},
	async fetchWallets(e) {
		let t = e.exclude ?? [];
		I._getSdkProperties().sv.startsWith("html-core-") && t.push(...Object.values(A).map((e) => e.id));
		let n = await P.get({
			path: "/getWallets",
			params: {
				...I._getSdkProperties(),
				...e,
				page: String(e.page),
				entries: String(e.entries),
				include: e.include?.join(","),
				exclude: t.join(",")
			}
		});
		return {
			data: I._filterWalletsByPlatform(n?.data) || [],
			count: n?.count
		};
	},
	async fetchFeaturedWallets() {
		let { featuredWalletIds: e } = O.state;
		if (e?.length) {
			let t = {
				...I._getSdkProperties(),
				page: 1,
				entries: e?.length ?? _t,
				include: e
			}, { data: n } = await I.fetchWallets(t), r = [...n].sort((t, n) => e.indexOf(t.id) - e.indexOf(n.id)), i = r.map((e) => e.image_id).filter(Boolean);
			await Promise.allSettled(i.map((e) => I._fetchWalletImage(e))), F.featured = r, F.allFeatured = r;
		}
	},
	async fetchRecommendedWallets() {
		try {
			F.isFetchingRecommendedWallets = !0;
			let { includeWalletIds: e, excludeWalletIds: t, featuredWalletIds: n } = O.state, r = {
				page: 1,
				entries: _t,
				include: e,
				exclude: [...t ?? [], ...n ?? []].filter(Boolean),
				chains: J.getRequestedCaipNetworkIds().join(",")
			}, { data: i, count: a } = await I.fetchWallets(r), o = T.getRecentWallets(), s = i.map((e) => e.image_id).filter(Boolean), c = o.map((e) => e.image_id).filter(Boolean);
			await Promise.allSettled([...s, ...c].map((e) => I._fetchWalletImage(e))), F.recommended = i, F.allRecommended = i, F.count = a ?? 0;
		} catch {} finally {
			F.isFetchingRecommendedWallets = !1;
		}
	},
	async fetchWalletsByPage({ page: e }) {
		let { includeWalletIds: t, excludeWalletIds: n, featuredWalletIds: r } = O.state, i = J.getRequestedCaipNetworkIds().join(","), a = {
			page: e,
			entries: gt,
			include: t,
			exclude: [
				...F.recommended.map(({ id: e }) => e),
				...n ?? [],
				...r ?? []
			].filter(Boolean),
			chains: i
		}, { data: o, count: s } = await I.fetchWallets(a), c = o.slice(0, vt).map((e) => e.image_id).filter(Boolean);
		await Promise.allSettled(c.map((e) => I._fetchWalletImage(e))), F.wallets = E.uniqueBy([...F.wallets, ...I._filterOutExtensions(o)], "id").filter((e) => e.chains?.some((e) => i.includes(e))), F.count = s > F.count ? s : F.count, F.page = e;
	},
	async initializeExcludedWallets({ ids: e }) {
		let t = {
			page: 1,
			entries: e.length,
			include: e
		}, { data: n } = await I.fetchWallets(t);
		n && n.forEach((e) => {
			F.excludedWallets.push({
				rdns: e.rdns,
				name: e.name
			});
		});
	},
	async searchWallet({ search: e, badge: t }) {
		let { includeWalletIds: n, excludeWalletIds: r } = O.state, i = J.getRequestedCaipNetworkIds().join(",");
		F.search = [];
		let a = {
			page: 1,
			entries: 100,
			search: e?.trim(),
			badge_type: t,
			include: n,
			exclude: r,
			chains: i
		}, { data: o } = await I.fetchWallets(a);
		N.sendEvent({
			type: "track",
			event: "SEARCH_WALLET",
			properties: {
				badge: t ?? "",
				search: e ?? ""
			}
		});
		let s = o.map((e) => e.image_id).filter(Boolean);
		await Promise.allSettled([...s.map((e) => I._fetchWalletImage(e)), E.wait(300)]), F.search = I._filterOutExtensions(o);
	},
	initPromise(e, t) {
		return F.promises[e] || (F.promises[e] = t());
	},
	prefetch({ fetchConnectorImages: e = !0, fetchFeaturedWallets: t = !0, fetchRecommendedWallets: n = !0, fetchNetworkImages: r = !0 } = {}) {
		let i = [
			e && I.initPromise("connectorImages", I.fetchConnectorImages),
			t && I.initPromise("featuredWallets", I.fetchFeaturedWallets),
			n && I.initPromise("recommendedWallets", I.fetchRecommendedWallets),
			r && I.initPromise("networkImages", I.fetchNetworkImages)
		].filter(Boolean);
		return Promise.allSettled(i);
	},
	prefetchAnalyticsConfig() {
		O.state.features?.analytics && I.fetchAnalyticsConfig();
	},
	async fetchAnalyticsConfig() {
		try {
			let { isAnalyticsEnabled: e } = await P.get({
				path: "/getAnalyticsConfig",
				params: I._getSdkProperties()
			});
			O.setFeatures({ analytics: e });
		} catch {
			O.setFeatures({ analytics: !1 });
		}
	},
	filterByNamespaces(e) {
		if (!e?.length) {
			F.featured = F.allFeatured, F.recommended = F.allRecommended;
			return;
		}
		let t = J.getRequestedCaipNetworkIds().join(",");
		F.featured = F.allFeatured.filter((e) => e.chains?.some((e) => t.includes(e))), F.recommended = F.allRecommended.filter((e) => e.chains?.some((e) => t.includes(e))), F.filteredWallets = F.wallets.filter((e) => e.chains?.some((e) => t.includes(e)));
	},
	clearFilterByNamespaces() {
		F.filteredWallets = [];
	},
	setFilterByNamespace(e) {
		if (!e) {
			F.featured = F.allFeatured, F.recommended = F.allRecommended;
			return;
		}
		let t = J.getRequestedCaipNetworkIds().join(",");
		F.featured = F.allFeatured.filter((e) => e.chains?.some((e) => t.includes(e))), F.recommended = F.allRecommended.filter((e) => e.chains?.some((e) => t.includes(e))), F.filteredWallets = F.wallets.filter((e) => e.chains?.some((e) => t.includes(e)));
	}
}, L = g({
	view: "Connect",
	history: ["Connect"],
	transactionStack: []
}), R = k({
	state: L,
	subscribeKey(e, t) {
		return v(L, e, t);
	},
	pushTransactionStack(e) {
		L.transactionStack.push(e);
	},
	popTransactionStack(e) {
		let t = L.transactionStack.pop();
		if (!t) return;
		let { onSuccess: n, onError: r, onCancel: i } = t;
		switch (e) {
			case "success":
				n?.();
				break;
			case "error":
				r?.(), R.goBack();
				break;
			case "cancel":
				i?.(), R.goBack();
				break;
			default:
		}
	},
	push(e, t) {
		e !== L.view && (L.view = e, L.history.push(e), L.data = t);
	},
	reset(e, t) {
		L.view = e, L.history = [e], L.data = t;
	},
	replace(e, t) {
		L.history.at(-1) !== e && (L.view = e, L.history[L.history.length - 1] = e, L.data = t);
	},
	goBack() {
		let e = J.state.activeCaipAddress, t = R.state.view === "ConnectingFarcaster", n = !e && t;
		if (L.history.length > 1) {
			L.history.pop();
			let [t] = L.history.slice(-1);
			t && (e && t === "Connect" ? L.view = "Account" : L.view = t);
		} else $.close();
		L.data?.wallet && (L.data.wallet = void 0), setTimeout(() => {
			if (n) {
				Z.setFarcasterUrl(void 0, J.state.activeChain);
				let e = B.getAuthConnector();
				e?.provider?.reload();
				let t = ie(O.state);
				e?.provider?.syncDappData?.({
					metadata: t.metadata,
					sdkVersion: t.sdkVersion,
					projectId: t.projectId,
					sdkType: t.sdkType
				});
			}
		}, 100);
	},
	goBackToIndex(e) {
		if (L.history.length > 1) {
			L.history = L.history.slice(0, e + 1);
			let [t] = L.history.slice(-1);
			t && (L.view = t);
		}
	},
	goBackOrCloseModal() {
		R.state.history.length > 1 ? R.goBack() : $.close();
	}
}), yt = g({
	themeMode: "dark",
	themeVariables: {},
	w3mThemeVariables: void 0
}), bt = {
	state: yt,
	subscribe(e) {
		return _(yt, () => e(yt));
	},
	setThemeMode(e) {
		yt.themeMode = e;
		try {
			let t = B.getAuthConnector();
			if (t) {
				let n = bt.getSnapshot().themeVariables;
				t.provider.syncTheme({
					themeMode: e,
					themeVariables: n,
					w3mThemeVariables: Ve(n, e)
				});
			}
		} catch {
			console.info("Unable to sync theme to auth connector");
		}
	},
	setThemeVariables(e) {
		yt.themeVariables = {
			...yt.themeVariables,
			...e
		};
		try {
			let e = B.getAuthConnector();
			if (e) {
				let t = bt.getSnapshot().themeVariables;
				e.provider.syncTheme({
					themeVariables: t,
					w3mThemeVariables: Ve(yt.themeVariables, yt.themeMode)
				});
			}
		} catch {
			console.info("Unable to sync theme to auth connector");
		}
	},
	getSnapshot() {
		return ie(yt);
	}
}, xt = k(bt), St = Object.fromEntries(me.map((e) => [e, void 0])), z = g({
	allConnectors: [],
	connectors: [],
	activeConnector: void 0,
	filterByNamespace: void 0,
	activeConnectorIds: St,
	filterByNamespaceMap: Object.fromEntries(me.map((e) => [e, !0]))
}), B = k({
	state: z,
	subscribe(e) {
		return _(z, () => {
			e(z);
		});
	},
	subscribeKey(e, t) {
		return v(z, e, t);
	},
	initialize(e) {
		e.forEach((e) => {
			let t = T.getConnectedConnectorId(e);
			t && B.setConnectorId(t, e);
		});
	},
	setActiveConnector(e) {
		e && (z.activeConnector = ae(e));
	},
	setConnectors(e) {
		e.filter((e) => !z.allConnectors.some((t) => t.id === e.id && B.getConnectorName(t.name) === B.getConnectorName(e.name) && t.chain === e.chain)).forEach((e) => {
			e.type !== "MULTI_CHAIN" && z.allConnectors.push(ae(e));
		});
		let t = B.getEnabledNamespaces(), n = B.getEnabledConnectors(t);
		z.connectors = B.mergeMultiChainConnectors(n);
	},
	filterByNamespaces(e) {
		Object.keys(z.filterByNamespaceMap).forEach((e) => {
			z.filterByNamespaceMap[e] = !1;
		}), e.forEach((e) => {
			z.filterByNamespaceMap[e] = !0;
		}), B.updateConnectorsForEnabledNamespaces();
	},
	filterByNamespace(e, t) {
		z.filterByNamespaceMap[e] = t, B.updateConnectorsForEnabledNamespaces();
	},
	updateConnectorsForEnabledNamespaces() {
		let e = B.getEnabledNamespaces(), t = B.getEnabledConnectors(e), n = B.areAllNamespacesEnabled();
		z.connectors = B.mergeMultiChainConnectors(t), n ? I.clearFilterByNamespaces() : I.filterByNamespaces(e);
	},
	getEnabledNamespaces() {
		return Object.entries(z.filterByNamespaceMap).filter(([e, t]) => t).map(([e]) => e);
	},
	getEnabledConnectors(e) {
		return z.allConnectors.filter((t) => e.includes(t.chain));
	},
	areAllNamespacesEnabled() {
		return Object.values(z.filterByNamespaceMap).every((e) => e);
	},
	mergeMultiChainConnectors(e) {
		let t = B.generateConnectorMapByName(e), n = [];
		return t.forEach((e) => {
			let t = e[0], r = t?.id === y.CONNECTOR_ID.AUTH;
			e.length > 1 && t ? n.push({
				name: t.name,
				imageUrl: t.imageUrl,
				imageId: t.imageId,
				connectors: [...e],
				type: r ? "AUTH" : "MULTI_CHAIN",
				chain: "eip155",
				id: t?.id || ""
			}) : t && n.push(t);
		}), n;
	},
	generateConnectorMapByName(e) {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => {
			let { name: n } = e, r = B.getConnectorName(n);
			if (!r) return;
			let i = t.get(r) || [];
			i.find((t) => t.chain === e.chain) || i.push(e), t.set(r, i);
		}), t;
	},
	getConnectorName(e) {
		return e && ({ "Trust Wallet": "Trust" }[e] || e);
	},
	getUniqueConnectorsByName(e) {
		let t = [];
		return e.forEach((e) => {
			t.find((t) => t.chain === e.chain) || t.push(e);
		}), t;
	},
	addConnector(e) {
		if (e.id === y.CONNECTOR_ID.AUTH) {
			let t = e, n = ie(O.state), r = xt.getSnapshot().themeMode, i = xt.getSnapshot().themeVariables;
			t?.provider?.syncDappData?.({
				metadata: n.metadata,
				sdkVersion: n.sdkVersion,
				projectId: n.projectId,
				sdkType: n.sdkType
			}), t?.provider?.syncTheme({
				themeMode: r,
				themeVariables: i,
				w3mThemeVariables: Ve(i, r)
			}), B.setConnectors([e]);
		} else B.setConnectors([e]);
	},
	getAuthConnector(e) {
		let t = e || J.state.activeChain, n = z.connectors.find((e) => e.id === y.CONNECTOR_ID.AUTH);
		if (n) return n?.connectors?.length ? n.connectors.find((e) => e.chain === t) : n;
	},
	getAnnouncedConnectorRdns() {
		return z.connectors.filter((e) => e.type === "ANNOUNCED").map((e) => e.info?.rdns);
	},
	getConnectorById(e) {
		return z.allConnectors.find((t) => t.id === e);
	},
	getConnector({ id: e, rdns: t, namespace: n }) {
		let r = n || J.state.activeChain;
		return z.allConnectors.filter((e) => e.chain === r).find((n) => n.explorerId === e || n.info?.rdns === t);
	},
	syncIfAuthConnector(e) {
		if (e.id !== "ID_AUTH") return;
		let t = e, n = ie(O.state), r = xt.getSnapshot().themeMode, i = xt.getSnapshot().themeVariables;
		t?.provider?.syncDappData?.({
			metadata: n.metadata,
			sdkVersion: n.sdkVersion,
			sdkType: n.sdkType,
			projectId: n.projectId
		}), t.provider.syncTheme({
			themeMode: r,
			themeVariables: i,
			w3mThemeVariables: Ve(i, r)
		});
	},
	getConnectorsByNamespace(e) {
		let t = z.allConnectors.filter((t) => t.chain === e);
		return B.mergeMultiChainConnectors(t);
	},
	canSwitchToSmartAccount(e) {
		return J.checkIfSmartAccountEnabled() && Et(e) === ot.ACCOUNT_TYPES.EOA;
	},
	selectWalletConnector(e) {
		let t = B.getConnector({
			id: e.id,
			rdns: e.rdns
		});
		st.handleMobileDeeplinkRedirect(t?.explorerId || e.id, J.state.activeChain), t ? R.push("ConnectingExternal", {
			connector: t,
			wallet: e
		}) : R.push("ConnectingWalletConnect", { wallet: e });
	},
	getConnectors(e) {
		return e ? B.getConnectorsByNamespace(e) : B.mergeMultiChainConnectors(z.allConnectors);
	},
	setFilterByNamespace(e) {
		z.filterByNamespace = e, z.connectors = B.getConnectors(e), I.setFilterByNamespace(e);
	},
	setConnectorId(e, t) {
		e && (z.activeConnectorIds = {
			...z.activeConnectorIds,
			[t]: e
		}, T.setConnectedConnectorId(t, e));
	},
	removeConnectorId(e) {
		z.activeConnectorIds = {
			...z.activeConnectorIds,
			[e]: void 0
		}, T.deleteConnectedConnectorId(e);
	},
	getConnectorId(e) {
		if (e) return z.activeConnectorIds[e];
	},
	isConnected(e) {
		return e ? !!z.activeConnectorIds[e] : Object.values(z.activeConnectorIds).some((e) => !!e);
	},
	resetConnectorIds() {
		z.activeConnectorIds = { ...St };
	}
}), Ct = 1e3, wt = {
	checkNamespaceConnectorId(e, t) {
		return B.getConnectorId(e) === t;
	},
	isSocialProvider(e) {
		return w.DEFAULT_REMOTE_FEATURES.socials.includes(e);
	},
	connectWalletConnect({ walletConnect: e, connector: t, closeModalOnConnect: n = !0, redirectViewOnModalClose: r = "Connect", onOpen: i, onConnect: a }) {
		return new Promise((o, s) => {
			if (e && B.setActiveConnector(t), i?.(E.isMobile() && e), r) {
				let e = $.subscribeKey("open", (t) => {
					t || (R.state.view !== r && R.replace(r), e(), s(/* @__PURE__ */ Error("Modal closed")));
				});
			}
			let c = J.subscribeKey("activeCaipAddress", (e) => {
				e && (a?.(), n && $.close(), c(), o(Re.parseCaipAddress(e)));
			});
		});
	},
	connectExternal(e) {
		return new Promise((t, n) => {
			let r = J.subscribeKey("activeCaipAddress", (e) => {
				e && ($.close(), r(), t(Re.parseCaipAddress(e)));
			});
			W.connectExternal(e, e.chain).catch(() => {
				r(), n(/* @__PURE__ */ Error("Connection rejected"));
			});
		});
	},
	connectSocial({ social: e, namespace: t, closeModalOnConnect: n = !0, onOpenFarcaster: r, onConnect: i }) {
		let a = Z.state.socialWindow, o = Z.state.socialProvider, s = !1, c = null, l = t || J.state.activeChain, u = J.subscribeKey("activeCaipAddress", (e) => {
			e && (n && $.close(), u());
		});
		return new Promise((t, n) => {
			async function u(e) {
				if (e.data?.resultUri) if (e.origin === y.SECURE_SITE_SDK_ORIGIN) {
					window.removeEventListener("message", u, !1);
					try {
						let r = B.getAuthConnector(l);
						if (r && !s) {
							a && (a.close(), Z.setSocialWindow(void 0, l), a = Z.state.socialWindow), s = !0;
							let i = e.data.resultUri;
							if (o && N.sendEvent({
								type: "track",
								event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
								properties: { provider: o }
							}), o) {
								T.setConnectedSocialProvider(o), await W.connectExternal({
									id: r.id,
									type: r.type,
									socialUri: i
								}, r.chain);
								let e = J.state.activeCaipAddress;
								if (!e) {
									n(/* @__PURE__ */ Error("Failed to connect"));
									return;
								}
								t(Re.parseCaipAddress(e)), N.sendEvent({
									type: "track",
									event: "SOCIAL_LOGIN_SUCCESS",
									properties: { provider: o }
								});
							}
						}
					} catch {
						o && N.sendEvent({
							type: "track",
							event: "SOCIAL_LOGIN_ERROR",
							properties: { provider: o }
						}), n(/* @__PURE__ */ Error("Failed to connect"));
					}
				} else o && N.sendEvent({
					type: "track",
					event: "SOCIAL_LOGIN_ERROR",
					properties: { provider: o }
				});
			}
			async function d() {
				if (e && (Z.setSocialProvider(e, l), o = Z.state.socialProvider, N.sendEvent({
					type: "track",
					event: "SOCIAL_LOGIN_STARTED",
					properties: { provider: o }
				})), o === "farcaster") {
					r?.();
					let t = $.subscribeKey("open", (r) => {
						!r && e === "farcaster" && (n(/* @__PURE__ */ Error("Popup closed")), i?.(), t());
					}), a = B.getAuthConnector();
					if (a && !Z.state.farcasterUrl) try {
						let { url: e } = await a.provider.getFarcasterUri();
						Z.setFarcasterUrl(e, l);
					} catch {
						n(/* @__PURE__ */ Error("Failed to connect to farcaster"));
					}
				} else {
					let e = B.getAuthConnector();
					c = E.returnOpenHref(`${y.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
					try {
						if (e && o) {
							let { uri: t } = await e.provider.getSocialRedirectUri({ provider: o });
							if (c && t) {
								Z.setSocialWindow(c, l), a = Z.state.socialWindow, c.location.href = t;
								let e = setInterval(() => {
									a?.closed && !s && (n(/* @__PURE__ */ Error("Popup closed")), clearInterval(e));
								}, 1e3);
								window.addEventListener("message", u, !1);
							} else c?.close(), n(/* @__PURE__ */ Error("Failed to initiate social connection"));
						}
					} catch {
						n(/* @__PURE__ */ Error("Failed to initiate social connection")), c?.close();
					}
				}
			}
			d();
		});
	},
	connectEmail({ closeModalOnConnect: e = !0, redirectViewOnModalClose: t = "Connect", onOpen: n, onConnect: r }) {
		return new Promise((i, a) => {
			if (n?.(), t) {
				let e = $.subscribeKey("open", (n) => {
					n || (R.state.view !== t && R.replace(t), e(), a(/* @__PURE__ */ Error("Modal closed")));
				});
			}
			let o = J.subscribeKey("activeCaipAddress", (t) => {
				t && (r?.(), e && $.close(), o(), i(Re.parseCaipAddress(t)));
			});
		});
	},
	async updateEmail() {
		let e = T.getConnectedConnectorId(J.state.activeChain), t = B.getAuthConnector();
		if (!t) throw Error("No auth connector found");
		if (e !== y.CONNECTOR_ID.AUTH) throw Error("Not connected to email or social");
		let n = t.provider.getEmail() ?? "";
		return await $.open({
			view: "UpdateEmailWallet",
			data: {
				email: n,
				redirectView: void 0
			}
		}), new Promise((e, r) => {
			let i = setInterval(() => {
				let r = t.provider.getEmail() ?? "";
				r !== n && ($.close(), clearInterval(i), a(), e({ email: r }));
			}, Ct), a = $.subscribeKey("open", (e) => {
				e || (R.state.view !== "Connect" && R.push("Connect"), clearInterval(i), a(), r(/* @__PURE__ */ Error("Modal closed")));
			});
		});
	},
	canSwitchToSmartAccount(e) {
		return J.checkIfSmartAccountEnabled() && Et(e) === ot.ACCOUNT_TYPES.EOA;
	}
};
//#endregion
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js
function Tt() {
	let e = J.state.activeCaipNetwork?.chainNamespace || "eip155";
	return `${e}:${J.state.activeCaipNetwork?.id || 1}:${w.NATIVE_TOKEN_ADDRESS[e]}`;
}
function Et(e) {
	return J.getAccountData(e)?.preferredAccountType;
}
function Dt(e) {
	return e ? J.state.chains.get(e)?.networkState?.caipNetwork : J.state.activeCaipNetwork;
}
//#endregion
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectionControllerUtil.js
var Ot = {
	getConnectionStatus(e, t) {
		let n = B.state.activeConnectorIds[t], r = W.getConnections(t);
		return n && e.connectorId === n ? "connected" : r.some((t) => t.connectorId.toLowerCase() === e.connectorId.toLowerCase()) ? "active" : "disconnected";
	},
	excludeConnectorAddressFromConnections({ connections: e, connectorId: t, addresses: n }) {
		return e.map((e) => {
			if (t && e.connectorId.toLowerCase() === t.toLowerCase() && n) {
				let t = e.accounts.filter((e) => !n.some((t) => t.toLowerCase() === e.address.toLowerCase()));
				return {
					...e,
					accounts: t
				};
			}
			return e;
		});
	},
	excludeExistingConnections(e, t) {
		let n = new Set(e);
		return t.filter((e) => !n.has(e.connectorId));
	},
	getConnectionsByConnectorId(e, t) {
		return e.filter((e) => e.connectorId.toLowerCase() === t.toLowerCase());
	},
	getConnectionsData(e) {
		let t = !!O.state.remoteFeatures?.multiWallet, n = B.state.activeConnectorIds[e], r = W.getConnections(e), i = (W.state.recentConnections.get(e) ?? []).filter((e) => B.getConnectorById(e.connectorId)), a = Ot.excludeExistingConnections([...r.map((e) => e.connectorId), ...n ? [n] : []], i);
		return t ? {
			connections: r,
			recentConnections: a
		} : {
			connections: r.filter((e) => e.connectorId.toLowerCase() === n?.toLowerCase()),
			recentConnections: []
		};
	}
}, kt = Object.freeze({
	message: "",
	variant: "success",
	svg: void 0,
	open: !1,
	autoClose: !0
}), V = g({ ...kt }), At = {
	state: V,
	subscribeKey(e, t) {
		return v(V, e, t);
	},
	showLoading(e, t = {}) {
		this._showMessage({
			message: e,
			variant: "loading",
			...t
		});
	},
	showSuccess(e) {
		this._showMessage({
			message: e,
			variant: "success"
		});
	},
	showSvg(e, t) {
		this._showMessage({
			message: e,
			svg: t
		});
	},
	showError(e) {
		let t = E.parseError(e);
		this._showMessage({
			message: t,
			variant: "error"
		});
	},
	hide() {
		V.message = kt.message, V.variant = kt.variant, V.svg = kt.svg, V.open = kt.open, V.autoClose = kt.autoClose;
	},
	_showMessage({ message: e, svg: t, variant: n = "success", autoClose: r = kt.autoClose }) {
		V.open ? (V.open = !1, setTimeout(() => {
			V.message = e, V.variant = n, V.svg = t, V.open = !0, V.autoClose = r;
		}, 150)) : (V.message = e, V.variant = n, V.svg = t, V.open = !0, V.autoClose = r);
	}
}, H = g({
	transactions: [],
	transactionsByYear: {},
	lastNetworkInView: void 0,
	loading: !1,
	empty: !1,
	next: void 0
}), jt = k({
	state: H,
	subscribe(e) {
		return _(H, () => e(H));
	},
	setLastNetworkInView(e) {
		H.lastNetworkInView = e;
	},
	async fetchTransactions(e) {
		if (!e) throw Error("Transactions can't be fetched without an accountAddress");
		H.loading = !0;
		try {
			let t = await X.fetchTransactions({
				account: e,
				cursor: H.next,
				chainId: J.state.activeCaipNetwork?.caipNetworkId
			}), n = jt.filterSpamTransactions(t.data), r = jt.filterByConnectedChain(n), i = [...H.transactions, ...r];
			H.loading = !1, H.transactions = i, H.transactionsByYear = jt.groupTransactionsByYearAndMonth(H.transactionsByYear, r), H.empty = i.length === 0, H.next = t.next ? t.next : void 0;
		} catch {
			let t = J.state.activeChain;
			N.sendEvent({
				type: "track",
				event: "ERROR_FETCH_TRANSACTIONS",
				properties: {
					address: e,
					projectId: O.state.projectId,
					cursor: H.next,
					isSmartAccount: Et(t) === ot.ACCOUNT_TYPES.SMART_ACCOUNT
				}
			}), At.showError("Failed to fetch transactions"), H.loading = !1, H.empty = !0, H.next = void 0;
		}
	},
	groupTransactionsByYearAndMonth(e = {}, t = []) {
		let n = e;
		return t.forEach((e) => {
			let t = new Date(e.metadata.minedAt).getFullYear(), r = new Date(e.metadata.minedAt).getMonth(), i = n[t] ?? {}, a = (i[r] ?? []).filter((t) => t.id !== e.id);
			n[t] = {
				...i,
				[r]: [...a, e].sort((e, t) => new Date(t.metadata.minedAt).getTime() - new Date(e.metadata.minedAt).getTime())
			};
		}), n;
	},
	filterSpamTransactions(e) {
		return e.filter((e) => !e.transfers.every((e) => e.nft_info?.flags.is_spam === !0));
	},
	filterByConnectedChain(e) {
		let t = J.state.activeCaipNetwork?.caipNetworkId;
		return e.filter((e) => e.metadata.chain === t);
	},
	clearCursor() {
		H.next = void 0;
	},
	resetTransactions() {
		H.transactions = [], H.transactionsByYear = {}, H.lastNetworkInView = void 0, H.loading = !1, H.empty = !1, H.next = void 0;
	}
}, "API_ERROR"), U = g({
	connections: /* @__PURE__ */ new Map(),
	recentConnections: /* @__PURE__ */ new Map(),
	isSwitchingConnection: !1,
	wcError: !1,
	buffering: !1,
	status: "disconnected"
}), Mt, W = k({
	state: U,
	subscribe(e) {
		return _(U, () => e(U));
	},
	subscribeKey(e, t) {
		return v(U, e, t);
	},
	_getClient() {
		return U._client;
	},
	setClient(e) {
		U._client = ae(e);
	},
	initialize(e) {
		let t = e.filter((e) => !!e.namespace).map((e) => e.namespace);
		W.syncStorageConnections(t);
	},
	syncStorageConnections(e) {
		let t = T.getConnections(), n = e ?? Array.from(J.state.chains.keys());
		for (let e of n) {
			let n = t[e] ?? [], r = new Map(U.recentConnections);
			r.set(e, n), U.recentConnections = r;
		}
	},
	getConnections(e) {
		return e ? U.connections.get(e) ?? [] : [];
	},
	hasAnyConnection(e) {
		let t = W.state.connections;
		return Array.from(t.values()).flatMap((e) => e).some(({ connectorId: t }) => t === e);
	},
	async connectWalletConnect({ cache: e = "auto" } = {}) {
		let t = E.isTelegram() || E.isSafari() && E.isIos();
		if (e === "always" || e === "auto" && t) {
			if (Mt) {
				await Mt, Mt = void 0;
				return;
			}
			if (!E.isPairingExpired(U?.wcPairingExpiry)) {
				U.wcUri = U.wcUri;
				return;
			}
			Mt = W._getClient()?.connectWalletConnect?.().catch(() => void 0), W.state.status = "connecting", await Mt, Mt = void 0, U.wcPairingExpiry = void 0, W.state.status = "connected";
		} else await W._getClient()?.connectWalletConnect?.();
	},
	async connectExternal(e, t, n = !0) {
		let r = await W._getClient()?.connectExternal?.(e);
		return n && J.setActiveNamespace(t), r;
	},
	async reconnectExternal(e) {
		await W._getClient()?.reconnectExternal?.(e);
		let t = e.chain || J.state.activeChain;
		t && B.setConnectorId(e.id, t);
	},
	async setPreferredAccountType(e, t) {
		if (!t) return;
		$.setLoading(!0, J.state.activeChain);
		let n = B.getAuthConnector();
		n && (Z.setPreferredAccountType(e, t), await n.provider.setPreferredAccount(e), T.setPreferredAccountTypes(Object.entries(J.state.chains).reduce((e, [t, n]) => {
			let r = t, i = Et(r);
			return i !== void 0 && (e[r] = i), e;
		}, {})), await W.reconnectExternal(n), $.setLoading(!1, J.state.activeChain), N.sendEvent({
			type: "track",
			event: "SET_PREFERRED_ACCOUNT_TYPE",
			properties: {
				accountType: e,
				network: J.state.activeCaipNetwork?.caipNetworkId || ""
			}
		}));
	},
	async signMessage(e) {
		return W._getClient()?.signMessage(e);
	},
	parseUnits(e, t) {
		return W._getClient()?.parseUnits(e, t);
	},
	formatUnits(e, t) {
		return W._getClient()?.formatUnits(e, t);
	},
	async sendTransaction(e) {
		return W._getClient()?.sendTransaction(e);
	},
	async getCapabilities(e) {
		return W._getClient()?.getCapabilities(e);
	},
	async grantPermissions(e) {
		return W._getClient()?.grantPermissions(e);
	},
	async walletGetAssets(e) {
		return W._getClient()?.walletGetAssets(e) ?? {};
	},
	async estimateGas(e) {
		return W._getClient()?.estimateGas(e);
	},
	async writeContract(e) {
		return W._getClient()?.writeContract(e);
	},
	async getEnsAddress(e) {
		return W._getClient()?.getEnsAddress(e);
	},
	async getEnsAvatar(e) {
		return W._getClient()?.getEnsAvatar(e);
	},
	checkInstalled(e) {
		return W._getClient()?.checkInstalled?.(e) || !1;
	},
	resetWcConnection() {
		U.wcUri = void 0, U.wcPairingExpiry = void 0, U.wcLinking = void 0, U.recentWallet = void 0, U.status = "disconnected", jt.resetTransactions(), T.deleteWalletConnectDeepLink();
	},
	resetUri() {
		U.wcUri = void 0, U.wcPairingExpiry = void 0, Mt = void 0;
	},
	finalizeWcConnection(e) {
		let { wcLinking: t, recentWallet: n } = W.state;
		t && T.setWalletConnectDeepLink(t), n && T.setAppKitRecent(n), N.sendEvent({
			type: "track",
			event: "CONNECT_SUCCESS",
			address: e,
			properties: {
				method: t ? "mobile" : "qrcode",
				name: R.state.data?.wallet?.name || "Unknown"
			}
		});
	},
	setWcBasic(e) {
		U.wcBasic = e;
	},
	setUri(e) {
		U.wcUri = e, U.wcPairingExpiry = E.getPairingExpiry();
	},
	setWcLinking(e) {
		U.wcLinking = e;
	},
	setWcError(e) {
		U.wcError = e, U.buffering = !1;
	},
	setRecentWallet(e) {
		U.recentWallet = e;
	},
	setBuffering(e) {
		U.buffering = e;
	},
	setStatus(e) {
		U.status = e;
	},
	setIsSwitchingConnection(e) {
		U.isSwitchingConnection = e;
	},
	async disconnect({ id: e, namespace: t, initialDisconnect: n } = {}) {
		try {
			await W._getClient()?.disconnect({
				id: e,
				chainNamespace: t,
				initialDisconnect: n
			});
		} catch (e) {
			throw new et("Failed to disconnect", "INTERNAL_SDK_ERROR", e);
		}
	},
	setConnections(e, t) {
		let n = new Map(U.connections);
		n.set(t, e), U.connections = n;
	},
	async handleAuthAccountSwitch({ address: e, namespace: t }) {
		let n = Z.state.user?.accounts?.find((e) => e.type === "smartAccount"), r = n && n.address.toLowerCase() === e.toLowerCase() && wt.canSwitchToSmartAccount(t) ? "smartAccount" : "eoa";
		await W.setPreferredAccountType(r, t);
	},
	async handleActiveConnection({ connection: e, namespace: t, address: n }) {
		let r = B.getConnectorById(e.connectorId), i = e.connectorId === y.CONNECTOR_ID.AUTH;
		if (!r) throw Error(`No connector found for connection: ${e.connectorId}`);
		if (i) i && n && await W.handleAuthAccountSwitch({
			address: n,
			namespace: t
		});
		else return (await W.connectExternal({
			id: r.id,
			type: r.type,
			provider: r.provider,
			address: n,
			chain: t
		}, t))?.address;
		return n;
	},
	async handleDisconnectedConnection({ connection: e, namespace: t, address: n, closeModalOnConnect: r }) {
		let i = B.getConnectorById(e.connectorId), a = e.auth?.name?.toLowerCase(), o = e.connectorId === y.CONNECTOR_ID.AUTH, s = e.connectorId === y.CONNECTOR_ID.WALLET_CONNECT;
		if (!i) throw Error(`No connector found for connection: ${e.connectorId}`);
		let c;
		if (o) if (a && wt.isSocialProvider(a)) {
			let { address: e } = await wt.connectSocial({
				social: a,
				closeModalOnConnect: r,
				onOpenFarcaster() {
					$.open({ view: "ConnectingFarcaster" });
				},
				onConnect() {
					R.replace("ProfileWallets");
				}
			});
			c = e;
		} else {
			let { address: e } = await wt.connectEmail({
				closeModalOnConnect: r,
				onOpen() {
					$.open({ view: "EmailLogin" });
				},
				onConnect() {
					R.replace("ProfileWallets");
				}
			});
			c = e;
		}
		else if (s) {
			let { address: e } = await wt.connectWalletConnect({
				walletConnect: !0,
				connector: i,
				closeModalOnConnect: r,
				onOpen(e) {
					let t = e ? "AllWallets" : "ConnectingWalletConnect";
					$.state.open ? R.push(t) : $.open({ view: t });
				},
				onConnect() {
					R.replace("ProfileWallets");
				}
			});
			c = e;
		} else {
			let e = await W.connectExternal({
				id: i.id,
				type: i.type,
				provider: i.provider,
				chain: t
			}, t);
			e && (c = e.address);
		}
		return o && n && await W.handleAuthAccountSwitch({
			address: n,
			namespace: t
		}), c;
	},
	async switchConnection({ connection: e, address: t, namespace: n, closeModalOnConnect: r, onChange: i }) {
		let a, o = Z.getCaipAddress(n);
		if (o) {
			let { address: e } = Re.parseCaipAddress(o);
			a = e;
		}
		let s = Ot.getConnectionStatus(e, n);
		switch (s) {
			case "connected":
			case "active": {
				let r = await W.handleActiveConnection({
					connection: e,
					namespace: n,
					address: t
				});
				if (a && r) {
					let e = r.toLowerCase() !== a.toLowerCase();
					i?.({
						address: r,
						namespace: n,
						hasSwitchedAccount: e,
						hasSwitchedWallet: s === "active"
					});
				}
				break;
			}
			case "disconnected": {
				let a = await W.handleDisconnectedConnection({
					connection: e,
					namespace: n,
					address: t,
					closeModalOnConnect: r
				});
				a && i?.({
					address: a,
					namespace: n,
					hasSwitchedAccount: !0,
					hasSwitchedWallet: !0
				});
				break;
			}
			default: throw Error(`Invalid connection status: ${s}`);
		}
	}
}), Nt = g({
	loading: !1,
	open: !1,
	selectedNetworkId: void 0,
	activeChain: void 0,
	initialized: !1
}), Pt = {
	state: Nt,
	subscribe(e) {
		return _(Nt, () => e(Nt));
	},
	subscribeOpen(e) {
		return v(Nt, "open", e);
	},
	set(e) {
		Object.assign(Nt, {
			...Nt,
			...e
		});
	}
}, Ft = {
	async getTokenList(e) {
		return (await X.fetchSwapTokens({ chainId: e }))?.tokens?.map((e) => ({
			...e,
			eip2612: !1,
			quantity: {
				decimals: "0",
				numeric: "0"
			},
			price: 0,
			value: 0
		})) || [];
	},
	async fetchGasPrice() {
		let e = J.state.activeCaipNetwork;
		if (!e) return null;
		try {
			switch (e.chainNamespace) {
				case "solana":
					let t = (await W?.estimateGas({ chainNamespace: "solana" }))?.toString();
					return {
						standard: t,
						fast: t,
						instant: t
					};
				default: return await X.fetchGasPrice({ chainId: e.caipNetworkId });
			}
		} catch {
			return null;
		}
	},
	async fetchSwapAllowance({ tokenAddress: e, userAddress: t, sourceTokenAmount: n, sourceTokenDecimals: r }) {
		let i = await X.fetchSwapAllowance({
			tokenAddress: e,
			userAddress: t
		});
		if (i?.allowance && n && r) {
			let e = W.parseUnits(n, r) || 0;
			return BigInt(i.allowance) >= e;
		}
		return !1;
	},
	async getMyTokensWithBalance(e) {
		let t = await Ht.getMyTokensWithBalance(e);
		return Z.setTokenBalance(t, J.state.activeChain), this.mapBalancesToSwapTokens(t);
	},
	mapBalancesToSwapTokens(e) {
		return e?.map((e) => ({
			...e,
			address: e?.address ? e.address : Tt(),
			decimals: parseInt(e.quantity.decimals, 10),
			logoUri: e.iconUrl,
			eip2612: !1
		})) || [];
	}
}, G = g({
	tokenBalances: [],
	loading: !1
}), K = k({
	state: G,
	subscribe(e) {
		return _(G, () => e(G));
	},
	subscribeKey(e, t) {
		return v(G, e, t);
	},
	setToken(e) {
		e && (G.token = ae(e));
	},
	setTokenAmount(e) {
		G.sendTokenAmount = e;
	},
	setReceiverAddress(e) {
		G.receiverAddress = e;
	},
	setReceiverProfileImageUrl(e) {
		G.receiverProfileImageUrl = e;
	},
	setReceiverProfileName(e) {
		G.receiverProfileName = e;
	},
	setNetworkBalanceInUsd(e) {
		G.networkBalanceInUSD = e;
	},
	setLoading(e) {
		G.loading = e;
	},
	async sendToken() {
		try {
			switch (K.setLoading(!0), J.state.activeCaipNetwork?.chainNamespace) {
				case "eip155":
					await K.sendEvmToken();
					return;
				case "solana":
					await K.sendSolanaToken();
					return;
				default: throw Error("Unsupported chain");
			}
		} finally {
			K.setLoading(!1);
		}
	},
	async sendEvmToken() {
		let e = J.state.activeChain;
		if (!e) throw Error("SendController:sendEvmToken - activeChainNamespace is required");
		let t = Et(e);
		if (!K.state.sendTokenAmount || !K.state.receiverAddress) throw Error("An amount and receiver address are required");
		if (!K.state.token) throw Error("A token is required");
		K.state.token?.address ? (N.sendEvent({
			type: "track",
			event: "SEND_INITIATED",
			properties: {
				isSmartAccount: t === ot.ACCOUNT_TYPES.SMART_ACCOUNT,
				token: K.state.token.address,
				amount: K.state.sendTokenAmount,
				network: J.state.activeCaipNetwork?.caipNetworkId || ""
			}
		}), await K.sendERC20Token({
			receiverAddress: K.state.receiverAddress,
			tokenAddress: K.state.token.address,
			sendTokenAmount: K.state.sendTokenAmount,
			decimals: K.state.token.quantity.decimals
		})) : (N.sendEvent({
			type: "track",
			event: "SEND_INITIATED",
			properties: {
				isSmartAccount: t === ot.ACCOUNT_TYPES.SMART_ACCOUNT,
				token: K.state.token.symbol || "",
				amount: K.state.sendTokenAmount,
				network: J.state.activeCaipNetwork?.caipNetworkId || ""
			}
		}), await K.sendNativeToken({
			receiverAddress: K.state.receiverAddress,
			sendTokenAmount: K.state.sendTokenAmount,
			decimals: K.state.token.quantity.decimals
		}));
	},
	async fetchTokenBalance(e) {
		G.loading = !0;
		let t = J.state.activeChain, n = J.state.activeCaipNetwork?.caipNetworkId, r = J.state.activeCaipNetwork?.chainNamespace, i = Z.getCaipAddress(t) ?? J.state.activeCaipAddress, a = i ? E.getPlainAddress(i) : void 0;
		if (G.lastRetry && !E.isAllowedRetry(G.lastRetry, 30 * w.ONE_SEC_MS)) return G.loading = !1, [];
		try {
			if (a && n && r) {
				let e = await Ht.getMyTokensWithBalance();
				return G.tokenBalances = e, G.lastRetry = void 0, e;
			}
		} catch (t) {
			G.lastRetry = Date.now(), e?.(t), At.showError("Token Balance Unavailable");
		} finally {
			G.loading = !1;
		}
		return [];
	},
	fetchNetworkBalance() {
		if (G.tokenBalances.length === 0) return;
		let e = Ft.mapBalancesToSwapTokens(G.tokenBalances);
		if (!e) return;
		let t = e.find((e) => e.address === Tt());
		t && (G.networkBalanceInUSD = t ? Ne.multiply(t.quantity.numeric, t.price).toString() : "0");
	},
	async sendNativeToken(e) {
		R.pushTransactionStack({});
		let t = e.receiverAddress, n = Z.state.address, r = W.parseUnits(e.sendTokenAmount.toString(), Number(e.decimals));
		await W.sendTransaction({
			chainNamespace: y.CHAIN.EVM,
			to: t,
			address: n,
			data: "0x",
			value: r ?? BigInt(0)
		}), N.sendEvent({
			type: "track",
			event: "SEND_SUCCESS",
			properties: {
				isSmartAccount: Et("eip155") === ot.ACCOUNT_TYPES.SMART_ACCOUNT,
				token: K.state.token?.symbol || "",
				amount: e.sendTokenAmount,
				network: J.state.activeCaipNetwork?.caipNetworkId || ""
			}
		}), W._getClient()?.updateBalance("eip155"), K.resetSend();
	},
	async sendERC20Token(e) {
		R.pushTransactionStack({ onSuccess() {
			R.replace("Account");
		} });
		let t = W.parseUnits(e.sendTokenAmount.toString(), Number(e.decimals));
		if (Z.state.address && e.sendTokenAmount && e.receiverAddress && e.tokenAddress) {
			let n = E.getPlainAddress(e.tokenAddress);
			if (!n) throw Error("SendController:sendERC20Token - tokenAddress is required");
			await W.writeContract({
				fromAddress: Z.state.address,
				tokenAddress: n,
				args: [e.receiverAddress, t ?? BigInt(0)],
				method: "transfer",
				abi: Le.getERC20Abi(n),
				chainNamespace: y.CHAIN.EVM
			}), K.resetSend();
		}
	},
	async sendSolanaToken() {
		if (!K.state.sendTokenAmount || !K.state.receiverAddress) throw Error("An amount and receiver address are required");
		R.pushTransactionStack({ onSuccess() {
			R.replace("Account");
		} }), await W.sendTransaction({
			chainNamespace: "solana",
			to: K.state.receiverAddress,
			value: K.state.sendTokenAmount
		}), W._getClient()?.updateBalance("solana"), K.resetSend();
	},
	resetSend() {
		G.token = void 0, G.sendTokenAmount = void 0, G.receiverAddress = void 0, G.receiverProfileImageUrl = void 0, G.receiverProfileName = void 0, G.loading = !1, G.tokenBalances = [];
	}
}), It = {
	currentTab: 0,
	tokenBalance: [],
	smartAccountDeployed: !1,
	addressLabels: /* @__PURE__ */ new Map(),
	user: void 0,
	preferredAccountType: void 0
}, Lt = {
	caipNetwork: void 0,
	supportsAllNetworks: !0,
	smartAccountEnabledNetworks: []
}, q = g({
	chains: ue(),
	activeCaipAddress: void 0,
	activeChain: void 0,
	activeCaipNetwork: void 0,
	noAdapters: !1,
	universalAdapter: {
		networkControllerClient: void 0,
		connectionControllerClient: void 0
	},
	isSwitchingNamespace: !1
}), J = k({
	state: q,
	subscribe(e) {
		return _(q, () => {
			e(q);
		});
	},
	subscribeKey(e, t) {
		return v(q, e, t);
	},
	subscribeChainProp(e, t, n) {
		let r;
		return _(q.chains, () => {
			let i = n || q.activeChain;
			if (i) {
				let n = q.chains.get(i)?.[e];
				r !== n && (r = n, t(n));
			}
		});
	},
	initialize(e, t, n) {
		let { chainId: r, namespace: i } = T.getActiveNetworkProps(), a = t?.find((e) => e.id.toString() === r?.toString()), o = e.find((e) => e?.namespace === i) || e?.[0], s = e.map((e) => e.namespace).filter((e) => e !== void 0), c = O.state.enableEmbedded ? new Set([...s]) : new Set([...t?.map((e) => e.chainNamespace) ?? []]);
		(e?.length === 0 || !o) && (q.noAdapters = !0), q.noAdapters || (q.activeChain = o?.namespace, q.activeCaipNetwork = a, J.setChainNetworkData(o?.namespace, { caipNetwork: a }), q.activeChain && Pt.set({ activeChain: o?.namespace })), c.forEach((e) => {
			let r = t?.filter((t) => t.chainNamespace === e), i = T.getPreferredAccountTypes() || {}, a = {
				...O.state.defaultAccountTypes,
				...i
			};
			J.state.chains.set(e, {
				namespace: e,
				networkState: g({
					...Lt,
					caipNetwork: r?.[0]
				}),
				accountState: g({
					...It,
					preferredAccountType: a[e]
				}),
				caipNetworks: r ?? [],
				...n
			}), J.setRequestedCaipNetworks(r ?? [], e);
		});
	},
	removeAdapter(e) {
		if (q.activeChain === e) {
			let t = Array.from(q.chains.entries()).find(([t]) => t !== e);
			if (t) {
				let e = t[1]?.caipNetworks?.[0];
				e && J.setActiveCaipNetwork(e);
			}
		}
		q.chains.delete(e);
	},
	addAdapter(e, { networkControllerClient: t, connectionControllerClient: n }, r) {
		if (!e.namespace) throw Error("ChainController:addAdapter - adapter must have a namespace");
		q.chains.set(e.namespace, {
			namespace: e.namespace,
			networkState: {
				...Lt,
				caipNetwork: r[0]
			},
			accountState: It,
			caipNetworks: r,
			connectionControllerClient: n,
			networkControllerClient: t
		}), J.setRequestedCaipNetworks(r?.filter((t) => t.chainNamespace === e.namespace) ?? [], e.namespace);
	},
	addNetwork(e) {
		let t = q.chains.get(e.chainNamespace);
		if (t) {
			let n = [...t.caipNetworks || []];
			t.caipNetworks?.find((t) => t.id === e.id) || n.push(e), q.chains.set(e.chainNamespace, {
				...t,
				caipNetworks: n
			}), J.setRequestedCaipNetworks(n, e.chainNamespace), B.filterByNamespace(e.chainNamespace, !0);
		}
	},
	removeNetwork(e, t) {
		let n = q.chains.get(e);
		if (n) {
			let r = q.activeCaipNetwork?.id === t, i = [...n.caipNetworks?.filter((e) => e.id !== t) || []];
			r && n?.caipNetworks?.[0] && J.setActiveCaipNetwork(n.caipNetworks[0]), q.chains.set(e, {
				...n,
				caipNetworks: i
			}), J.setRequestedCaipNetworks(i || [], e), i.length === 0 && B.filterByNamespace(e, !1);
		}
	},
	setAdapterNetworkState(e, t) {
		let n = q.chains.get(e);
		n && (n.networkState = {
			...n.networkState || Lt,
			...t
		}, q.chains.set(e, n));
	},
	setChainAccountData(e, t, n = !0) {
		if (!e) throw Error("Chain is required to update chain account data");
		let r = q.chains.get(e);
		if (r) {
			let n = {
				...r.accountState || It,
				...t
			};
			q.chains.set(e, {
				...r,
				accountState: n
			}), (q.chains.size === 1 || q.activeChain === e) && (t.caipAddress && (q.activeCaipAddress = t.caipAddress), Z.replaceState(n));
		}
	},
	setChainNetworkData(e, t) {
		if (!e) return;
		let n = q.chains.get(e);
		if (n) {
			let r = {
				...n.networkState || Lt,
				...t
			};
			q.chains.set(e, {
				...n,
				networkState: r
			});
		}
	},
	setAccountProp(e, t, n, r = !0) {
		J.setChainAccountData(n, { [e]: t }, r);
	},
	setActiveNamespace(e) {
		q.activeChain = e;
		let t = e ? q.chains.get(e) : void 0, n = t?.networkState?.caipNetwork;
		n?.id && e && (q.activeCaipAddress = t?.accountState?.caipAddress, q.activeCaipNetwork = n, J.setChainNetworkData(e, { caipNetwork: n }), T.setActiveCaipNetworkId(n?.caipNetworkId), Pt.set({
			activeChain: e,
			selectedNetworkId: n?.caipNetworkId
		}));
	},
	setActiveCaipNetwork(e) {
		if (!e) return;
		q.activeChain !== e.chainNamespace && J.setIsSwitchingNamespace(!0);
		let t = q.chains.get(e.chainNamespace);
		q.activeChain = e.chainNamespace, q.activeCaipNetwork = e, J.setChainNetworkData(e.chainNamespace, { caipNetwork: e }), t?.accountState?.address ? q.activeCaipAddress = `${e.chainNamespace}:${e.id}:${t?.accountState?.address}` : q.activeCaipAddress = void 0, J.setAccountProp("caipAddress", q.activeCaipAddress, e.chainNamespace), t && Z.replaceState(t.accountState), K.resetSend(), Pt.set({
			activeChain: q.activeChain,
			selectedNetworkId: q.activeCaipNetwork?.caipNetworkId
		}), T.setActiveCaipNetworkId(e.caipNetworkId), !J.checkIfSupportedNetwork(e.chainNamespace) && O.state.enableNetworkSwitch && !O.state.allowUnsupportedChain && !W.state.wcBasic && J.showUnsupportedChainUI();
	},
	addCaipNetwork(e) {
		if (!e) return;
		let t = q.chains.get(e.chainNamespace);
		t && t?.caipNetworks?.push(e);
	},
	async switchActiveNamespace(e) {
		if (!e) return;
		let t = e !== J.state.activeChain, n = J.getNetworkData(e)?.caipNetwork, r = J.getCaipNetworkByNamespace(e, n?.id);
		t && r && await J.switchActiveNetwork(r);
	},
	async switchActiveNetwork(e) {
		let t = J.state.activeChain;
		if (!t) throw Error("ChainController:switchActiveNetwork - namespace is required");
		let n = !J.state.chains.get(t)?.caipNetworks?.some((e) => e.id === q.activeCaipNetwork?.id), r = J.getNetworkControllerClient(e.chainNamespace);
		if (r) {
			try {
				await r.switchCaipNetwork(e), n && $.close();
			} catch {
				R.goBack();
			}
			N.sendEvent({
				type: "track",
				event: "SWITCH_NETWORK",
				properties: { network: e.caipNetworkId }
			});
		}
	},
	getNetworkControllerClient(e) {
		let t = e || q.activeChain;
		if (!t) throw Error("ChainController:getNetworkControllerClient - chain is required");
		let n = q.chains.get(t);
		if (!n) throw Error("Chain adapter not found");
		if (!n.networkControllerClient) throw Error("NetworkController client not set");
		return n.networkControllerClient;
	},
	getConnectionControllerClient(e) {
		let t = e || q.activeChain;
		if (!t) throw Error("Chain is required to get connection controller client");
		let n = q.chains.get(t);
		if (!n?.connectionControllerClient) throw Error("ConnectionController client not set");
		return n.connectionControllerClient;
	},
	getNetworkProp(e, t) {
		let n = q.chains.get(t)?.networkState;
		if (n) return n[e];
	},
	getRequestedCaipNetworks(e) {
		let { approvedCaipNetworkIds: t = [], requestedCaipNetworks: n = [] } = q.chains.get(e)?.networkState || {};
		return E.sortRequestedNetworks(t, n).filter((e) => e?.id);
	},
	getAllRequestedCaipNetworks() {
		let e = [];
		return q.chains.forEach((t) => {
			if (!t.namespace) throw Error("ChainController:getAllRequestedCaipNetworks - chainAdapter must have a namespace");
			let n = J.getRequestedCaipNetworks(t.namespace);
			e.push(...n);
		}), e;
	},
	setRequestedCaipNetworks(e, t) {
		J.setAdapterNetworkState(t, { requestedCaipNetworks: e });
		let n = J.getAllRequestedCaipNetworks().map((e) => e.chainNamespace), r = Array.from(new Set(n));
		B.filterByNamespaces(r);
	},
	getAllApprovedCaipNetworkIds() {
		let e = [];
		return q.chains.forEach((t) => {
			if (!t.namespace) throw Error("ChainController:getAllApprovedCaipNetworkIds - chainAdapter must have a namespace");
			let n = J.getApprovedCaipNetworkIds(t.namespace);
			e.push(...n);
		}), e;
	},
	getActiveCaipNetwork(e) {
		return e ? q.chains.get(e)?.networkState?.caipNetwork : q.activeCaipNetwork;
	},
	getActiveCaipAddress() {
		return q.activeCaipAddress;
	},
	getApprovedCaipNetworkIds(e) {
		return q.chains.get(e)?.networkState?.approvedCaipNetworkIds || [];
	},
	async setApprovedCaipNetworksData(e) {
		let t = await J.getNetworkControllerClient()?.getApprovedCaipNetworksData();
		J.setAdapterNetworkState(e, {
			approvedCaipNetworkIds: t?.approvedCaipNetworkIds,
			supportsAllNetworks: t?.supportsAllNetworks
		});
	},
	checkIfSupportedNetwork(e, t) {
		let n = t || q.activeCaipNetwork?.caipNetworkId, r = J.getRequestedCaipNetworks(e);
		return r.length ? r?.some((e) => e.caipNetworkId === n) : !0;
	},
	checkIfSupportedChainId(e) {
		return q.activeChain ? J.getRequestedCaipNetworks(q.activeChain)?.some((t) => t.id === e) : !0;
	},
	setSmartAccountEnabledNetworks(e, t) {
		J.setAdapterNetworkState(t, { smartAccountEnabledNetworks: e });
	},
	checkIfSmartAccountEnabled() {
		let e = pe.caipNetworkIdToNumber(q.activeCaipNetwork?.caipNetworkId), t = q.activeChain;
		return !t || !e ? !1 : !!J.getNetworkProp("smartAccountEnabledNetworks", t)?.includes(Number(e));
	},
	showUnsupportedChainUI() {
		$.open({ view: "UnsupportedChain" });
	},
	checkIfNamesSupported() {
		let e = q.activeCaipNetwork;
		return !!(e?.chainNamespace && w.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(e.chainNamespace));
	},
	resetNetwork(e) {
		J.setAdapterNetworkState(e, {
			approvedCaipNetworkIds: void 0,
			supportsAllNetworks: !0
		});
	},
	resetAccount(e) {
		let t = e;
		if (!t) throw Error("Chain is required to set account prop");
		let n = J.state.chains.get(t)?.accountState?.preferredAccountType, r = O.state.defaultAccountTypes[t];
		q.activeCaipAddress = void 0, J.setChainAccountData(t, {
			smartAccountDeployed: !1,
			currentTab: 0,
			caipAddress: void 0,
			address: void 0,
			balance: void 0,
			balanceSymbol: void 0,
			profileName: void 0,
			profileImage: void 0,
			addressExplorerUrl: void 0,
			tokenBalance: [],
			connectedWalletInfo: void 0,
			preferredAccountType: r || n,
			socialProvider: void 0,
			socialWindow: void 0,
			farcasterUrl: void 0,
			user: void 0,
			status: "disconnected"
		}), B.removeConnectorId(t);
	},
	setIsSwitchingNamespace(e) {
		q.isSwitchingNamespace = e;
	},
	getFirstCaipNetworkSupportsAuthConnector() {
		let e = [], t;
		if (q.chains.forEach((t) => {
			y.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((e) => e === t.namespace) && t.namespace && e.push(t.namespace);
		}), e.length > 0) {
			let n = e[0];
			return t = n ? q.chains.get(n)?.caipNetworks?.[0] : void 0, t;
		}
	},
	getAccountData(e) {
		let t = e || q.activeChain;
		if (t) return J.state.chains.get(t)?.accountState;
	},
	getNetworkData(e) {
		let t = e || q.activeChain;
		if (t) return J.state.chains.get(t)?.networkState;
	},
	getCaipNetworkByNamespace(e, t) {
		if (!e) return;
		let n = J.state.chains.get(e);
		return n?.caipNetworks?.find((e) => e.id === t) || n?.networkState?.caipNetwork || n?.caipNetworks?.[0];
	},
	getRequestedCaipNetworkIds() {
		let e = B.state.filterByNamespace;
		return (e ? [q.chains.get(e)] : Array.from(q.chains.values())).flatMap((e) => e?.caipNetworks || []).map((e) => e.caipNetworkId);
	},
	getCaipNetworks(e) {
		return e ? J.getRequestedCaipNetworks(e) : J.getAllRequestedCaipNetworks();
	},
	setLastConnectedSIWECaipNetwork(e) {
		q.lastConnectedSIWECaipNetwork = e;
	},
	getLastConnectedSIWECaipNetwork() {
		return q.lastConnectedSIWECaipNetwork;
	}
}), Rt = {
	purchaseCurrencies: [{
		id: "2b92315d-eab7-5bef-84fa-089a131333f5",
		name: "USD Coin",
		symbol: "USDC",
		networks: [{
			name: "ethereum-mainnet",
			display_name: "Ethereum",
			chain_id: "1",
			contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
		}, {
			name: "polygon-mainnet",
			display_name: "Polygon",
			chain_id: "137",
			contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
		}]
	}, {
		id: "2b92315d-eab7-5bef-84fa-089a131333f5",
		name: "Ether",
		symbol: "ETH",
		networks: [{
			name: "ethereum-mainnet",
			display_name: "Ethereum",
			chain_id: "1",
			contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
		}, {
			name: "polygon-mainnet",
			display_name: "Polygon",
			chain_id: "137",
			contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
		}]
	}],
	paymentCurrencies: [{
		id: "USD",
		payment_method_limits: [{
			id: "card",
			min: "10.00",
			max: "7500.00"
		}, {
			id: "ach_bank_account",
			min: "10.00",
			max: "25000.00"
		}]
	}, {
		id: "EUR",
		payment_method_limits: [{
			id: "card",
			min: "10.00",
			max: "7500.00"
		}, {
			id: "ach_bank_account",
			min: "10.00",
			max: "25000.00"
		}]
	}]
}, zt = E.getBlockchainApiUrl(), Y = g({
	clientId: null,
	api: new Ke({
		baseUrl: zt,
		clientId: null
	}),
	supportedChains: {
		http: [],
		ws: []
	}
}), X = {
	state: Y,
	async get(e) {
		let { st: t, sv: n } = X.getSdkProperties(), r = O.state.projectId, i = {
			...e.params || {},
			st: t,
			sv: n,
			projectId: r
		};
		return Y.api.get({
			...e,
			params: i
		});
	},
	getSdkProperties() {
		let { sdkType: e, sdkVersion: t } = O.state;
		return {
			st: e || "unknown",
			sv: t || "unknown"
		};
	},
	async isNetworkSupported(e) {
		if (!e) return !1;
		try {
			Y.supportedChains.http.length || await X.getSupportedNetworks();
		} catch {
			return !1;
		}
		return Y.supportedChains.http.includes(e);
	},
	async getSupportedNetworks() {
		try {
			let e = await X.get({ path: "v1/supported-chains" });
			return Y.supportedChains = e, e;
		} catch {
			return Y.supportedChains;
		}
	},
	async fetchIdentity({ address: e }) {
		let t = T.getIdentityFromCacheForAddress(e);
		if (t) return t;
		let n = await X.get({
			path: `/v1/identity/${e}`,
			params: { sender: J.state.activeCaipAddress ? E.getPlainAddress(J.state.activeCaipAddress) : void 0 }
		});
		return T.updateIdentityCache({
			address: e,
			identity: n,
			timestamp: Date.now()
		}), n;
	},
	async fetchTransactions({ account: e, cursor: t, signal: n, cache: r, chainId: i }) {
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) return {
			data: [],
			next: void 0
		};
		let a = T.getTransactionsCacheForAddress({
			address: e,
			chainId: i
		});
		if (a) return a;
		let o = await X.get({
			path: `/v1/account/${e}/history`,
			params: {
				cursor: t,
				chainId: i
			},
			signal: n,
			cache: r
		});
		return T.updateTransactionsCache({
			address: e,
			chainId: i,
			timestamp: Date.now(),
			transactions: o
		}), o;
	},
	async fetchSwapQuote({ amount: e, userAddress: t, from: n, to: r, gasPrice: i }) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({
			path: "/v1/convert/quotes",
			headers: { "Content-Type": "application/json" },
			params: {
				amount: e,
				userAddress: t,
				from: n,
				to: r,
				gasPrice: i
			}
		}) : { quotes: [] };
	},
	async fetchSwapTokens({ chainId: e }) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({
			path: "/v1/convert/tokens",
			params: { chainId: e }
		}) : { tokens: [] };
	},
	async fetchTokenPrice({ addresses: e }) {
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) return { fungibles: [] };
		let t = T.getTokenPriceCacheForAddresses(e);
		if (t) return t;
		let n = await Y.api.post({
			path: "/v1/fungible/price",
			body: {
				currency: "usd",
				addresses: e,
				projectId: O.state.projectId
			},
			headers: { "Content-Type": "application/json" }
		});
		return T.updateTokenPriceCache({
			addresses: e,
			timestamp: Date.now(),
			tokenPrice: n
		}), n;
	},
	async fetchSwapAllowance({ tokenAddress: e, userAddress: t }) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({
			path: "/v1/convert/allowance",
			params: {
				tokenAddress: e,
				userAddress: t
			},
			headers: { "Content-Type": "application/json" }
		}) : { allowance: "0" };
	},
	async fetchGasPrice({ chainId: e }) {
		let { st: t, sv: n } = X.getSdkProperties();
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) throw Error("Network not supported for Gas Price");
		return X.get({
			path: "/v1/convert/gas-price",
			headers: { "Content-Type": "application/json" },
			params: {
				chainId: e,
				st: t,
				sv: n
			}
		});
	},
	async generateSwapCalldata({ amount: e, from: t, to: n, userAddress: r, disableEstimate: i }) {
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) throw Error("Network not supported for Swaps");
		return Y.api.post({
			path: "/v1/convert/build-transaction",
			headers: { "Content-Type": "application/json" },
			body: {
				amount: e,
				eip155: { slippage: w.CONVERT_SLIPPAGE_TOLERANCE },
				projectId: O.state.projectId,
				from: t,
				to: n,
				userAddress: r,
				disableEstimate: i
			}
		});
	},
	async generateApproveCalldata({ from: e, to: t, userAddress: n }) {
		let { st: r, sv: i } = X.getSdkProperties();
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) throw Error("Network not supported for Swaps");
		return X.get({
			path: "/v1/convert/build-approve",
			headers: { "Content-Type": "application/json" },
			params: {
				userAddress: n,
				from: e,
				to: t,
				st: r,
				sv: i
			}
		});
	},
	async getBalance(e, t, n) {
		let { st: r, sv: i } = X.getSdkProperties();
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) return At.showError("Token Balance Unavailable"), { balances: [] };
		let a = `${t}:${e}`, o = T.getBalanceCacheForCaipAddress(a);
		if (o) return o;
		let s = await X.get({
			path: `/v1/account/${e}/balance`,
			params: {
				currency: "usd",
				chainId: t,
				forceUpdate: n,
				st: r,
				sv: i
			}
		});
		return T.updateBalanceCache({
			caipAddress: a,
			balance: s,
			timestamp: Date.now()
		}), s;
	},
	async lookupEnsName(e) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({
			path: `/v1/profile/account/${e}`,
			params: { apiVersion: "2" }
		}) : {
			addresses: {},
			attributes: []
		};
	},
	async reverseLookupEnsName({ address: e }) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({
			path: `/v1/profile/reverse/${e}`,
			params: {
				sender: Z.state.address,
				apiVersion: "2"
			}
		}) : [];
	},
	async getEnsNameSuggestions(e) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({
			path: `/v1/profile/suggestions/${e}`,
			params: { zone: "reown.id" }
		}) : { suggestions: [] };
	},
	async registerEnsName({ coinType: e, address: t, message: n, signature: r }) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? Y.api.post({
			path: "/v1/profile/account",
			body: {
				coin_type: e,
				address: t,
				message: n,
				signature: r
			},
			headers: { "Content-Type": "application/json" }
		}) : { success: !1 };
	},
	async generateOnRampURL({ destinationWallets: e, partnerUserId: t, defaultNetwork: n, purchaseAmount: r, paymentAmount: i }) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? (await Y.api.post({
			path: "/v1/generators/onrampurl",
			params: { projectId: O.state.projectId },
			body: {
				destinationWallets: e,
				defaultNetwork: n,
				partnerUserId: t,
				defaultExperience: "buy",
				presetCryptoAmount: r,
				presetFiatAmount: i
			}
		})).url : "";
	},
	async getOnrampOptions() {
		if (!await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId)) return {
			paymentCurrencies: [],
			purchaseCurrencies: []
		};
		try {
			return await X.get({ path: "/v1/onramp/options" });
		} catch {
			return Rt;
		}
	},
	async getOnrampQuote({ purchaseCurrency: e, paymentCurrency: t, amount: n, network: r }) {
		try {
			return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? await Y.api.post({
				path: "/v1/onramp/quote",
				params: { projectId: O.state.projectId },
				body: {
					purchaseCurrency: e,
					paymentCurrency: t,
					amount: n,
					network: r
				}
			}) : null;
		} catch {
			return {
				networkFee: {
					amount: n,
					currency: t.id
				},
				paymentSubtotal: {
					amount: n,
					currency: t.id
				},
				paymentTotal: {
					amount: n,
					currency: t.id
				},
				purchaseAmount: {
					amount: n,
					currency: t.id
				},
				quoteId: "mocked-quote-id"
			};
		}
	},
	async getSmartSessions(e) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? X.get({ path: `/v1/sessions/${e}` }) : [];
	},
	async revokeSmartSession(e, t, n) {
		return await X.isNetworkSupported(J.state.activeCaipNetwork?.caipNetworkId) ? Y.api.post({
			path: `/v1/sessions/${e}/revoke`,
			params: { projectId: O.state.projectId },
			body: {
				pci: t,
				signature: n
			}
		}) : { success: !1 };
	},
	setClientId(e) {
		Y.clientId = e, Y.api = new Ke({
			baseUrl: zt,
			clientId: e
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/unit/formatUnits.js
function Bt(e, t) {
	let n = e.toString(), r = n.startsWith("-");
	r && (n = n.slice(1)), n = n.padStart(t, "0");
	let [i, a] = [n.slice(0, n.length - t), n.slice(n.length - t)];
	return a = a.replace(/(0+)$/, ""), `${r ? "-" : ""}${i || "0"}${a ? `.${a}` : ""}`;
}
//#endregion
//#region node_modules/@reown/appkit-controllers/dist/esm/src/utils/ERC7811Util.js
var Vt = {
	createBalance(e, t) {
		let n = {
			name: e.metadata.name || "",
			symbol: e.metadata.symbol || "",
			decimals: e.metadata.decimals || 0,
			value: e.metadata.value || 0,
			price: e.metadata.price || 0,
			iconUrl: e.metadata.iconUrl || ""
		};
		return {
			name: n.name,
			symbol: n.symbol,
			chainId: t,
			address: e.address === "native" ? void 0 : this.convertAddressToCAIP10Address(e.address, t),
			value: n.value,
			price: n.price,
			quantity: {
				decimals: n.decimals.toString(),
				numeric: this.convertHexToBalance({
					hex: e.balance,
					decimals: n.decimals
				})
			},
			iconUrl: n.iconUrl
		};
	},
	convertHexToBalance({ hex: e, decimals: t }) {
		return Bt(BigInt(e), t);
	},
	convertAddressToCAIP10Address(e, t) {
		return `${t}:${e}`;
	},
	createCAIP2ChainId(e, t) {
		return `${t}:${parseInt(e, 16)}`;
	},
	getChainIdHexFromCAIP2ChainId(e) {
		let t = e.split(":");
		if (t.length < 2 || !t[1]) return "0x0";
		let n = t[1], r = parseInt(n, 10);
		return isNaN(r) ? "0x0" : `0x${r.toString(16)}`;
	},
	isWalletGetAssetsResponse(e) {
		return typeof e != "object" || !e ? !1 : Object.values(e).every((e) => Array.isArray(e) && e.every((e) => this.isValidAsset(e)));
	},
	isValidAsset(e) {
		return typeof e == "object" && !!e && typeof e.address == "string" && typeof e.balance == "string" && (e.type === "ERC20" || e.type === "NATIVE") && typeof e.metadata == "object" && e.metadata !== null && typeof e.metadata.name == "string" && typeof e.metadata.symbol == "string" && typeof e.metadata.decimals == "number" && typeof e.metadata.price == "number" && typeof e.metadata.iconUrl == "string";
	}
}, Ht = {
	async getMyTokensWithBalance(e) {
		let t = Z.state.address, n = J.state.activeCaipNetwork, r = B.getConnectorId("eip155") === y.CONNECTOR_ID.AUTH;
		if (!t || !n) return [];
		let i = `${n.caipNetworkId}:${t}`, a = T.getBalanceCacheForCaipAddress(i);
		if (a) return a.balances;
		if (n.chainNamespace === y.CHAIN.EVM && r) {
			let e = await this.getEIP155Balances(t, n);
			if (e) return this.filterLowQualityTokens(e);
		}
		let o = await X.getBalance(t, n.caipNetworkId, e);
		return this.filterLowQualityTokens(o.balances);
	},
	async getEIP155Balances(e, t) {
		try {
			let n = Vt.getChainIdHexFromCAIP2ChainId(t.caipNetworkId);
			if (!(await W.getCapabilities(e))?.[n]?.assetDiscovery?.supported) return null;
			let r = await W.walletGetAssets({
				account: e,
				chainFilter: [n]
			});
			if (!Vt.isWalletGetAssetsResponse(r)) return null;
			let i = (r[n] || []).map((e) => Vt.createBalance(e, t.caipNetworkId));
			return T.updateBalanceCache({
				caipAddress: `${t.caipNetworkId}:${e}`,
				balance: { balances: i },
				timestamp: Date.now()
			}), i;
		} catch {
			return null;
		}
	},
	filterLowQualityTokens(e) {
		return e.filter((e) => e.quantity.decimals !== "0");
	}
}, Ut = g({
	currentTab: 0,
	tokenBalance: [],
	smartAccountDeployed: !1,
	addressLabels: /* @__PURE__ */ new Map()
}), Z = k({
	state: Ut,
	replaceState(e) {
		e && Object.assign(Ut, ae(e));
	},
	subscribe(e) {
		return J.subscribeChainProp("accountState", (t) => {
			if (t) return e(t);
		});
	},
	subscribeKey(e, t, n) {
		let r;
		return J.subscribeChainProp("accountState", (n) => {
			if (n) {
				let i = n[e];
				r !== i && (r = i, t(i));
			}
		}, n);
	},
	setStatus(e, t) {
		J.setAccountProp("status", e, t);
	},
	getCaipAddress(e) {
		if (e) return J.state.chains.get(e)?.accountState?.caipAddress;
	},
	setCaipAddress(e, t) {
		let n = e ? E.getPlainAddress(e) : void 0;
		t === J.state.activeChain && (J.state.activeCaipAddress = e), J.setAccountProp("caipAddress", e, t), J.setAccountProp("address", n, t);
	},
	setBalance(e, t, n) {
		J.setAccountProp("balance", e, n), J.setAccountProp("balanceSymbol", t, n);
	},
	setProfileName(e, t) {
		J.setAccountProp("profileName", e, t);
	},
	setProfileImage(e, t) {
		J.setAccountProp("profileImage", e, t);
	},
	setUser(e, t) {
		J.setAccountProp("user", e, t);
	},
	setAddressExplorerUrl(e, t) {
		J.setAccountProp("addressExplorerUrl", e, t);
	},
	setSmartAccountDeployed(e, t) {
		J.setAccountProp("smartAccountDeployed", e, t);
	},
	setCurrentTab(e) {
		J.setAccountProp("currentTab", e, J.state.activeChain);
	},
	setTokenBalance(e, t) {
		e && J.setAccountProp("tokenBalance", e, t);
	},
	setShouldUpdateToAddress(e, t) {
		J.setAccountProp("shouldUpdateToAddress", e, t);
	},
	addAddressLabel(e, t, n) {
		if (!n) return;
		let r = J.state.chains.get(n)?.accountState?.addressLabels || /* @__PURE__ */ new Map();
		r.set(e, t), J.setAccountProp("addressLabels", r, n);
	},
	removeAddressLabel(e, t) {
		if (!t) return;
		let n = J.state.chains.get(t)?.accountState?.addressLabels || /* @__PURE__ */ new Map();
		n.delete(e), J.setAccountProp("addressLabels", n, t);
	},
	setConnectedWalletInfo(e, t) {
		J.setAccountProp("connectedWalletInfo", e, t, !1);
	},
	setPreferredAccountType(e, t) {
		J.setAccountProp("preferredAccountType", e, t);
	},
	setSocialProvider(e, t) {
		e && J.setAccountProp("socialProvider", e, t);
	},
	setSocialWindow(e, t) {
		J.setAccountProp("socialWindow", e ? ae(e) : void 0, t);
	},
	setFarcasterUrl(e, t) {
		J.setAccountProp("farcasterUrl", e, t);
	},
	async fetchTokenBalance(e) {
		Ut.balanceLoading = !0;
		let t = J.state.activeCaipNetwork?.caipNetworkId, n = J.state.activeCaipNetwork?.chainNamespace, r = J.state.activeCaipAddress, i = r ? E.getPlainAddress(r) : void 0;
		if (Ut.lastRetry && !E.isAllowedRetry(Ut.lastRetry, 30 * w.ONE_SEC_MS)) return Ut.balanceLoading = !1, [];
		try {
			if (i && t && n) {
				let e = await Ht.getMyTokensWithBalance();
				return Z.setTokenBalance(e, n), Ut.lastRetry = void 0, Ut.balanceLoading = !1, e;
			}
		} catch (t) {
			Ut.lastRetry = Date.now(), e?.(t), At.showError("Token Balance Unavailable");
		} finally {
			Ut.balanceLoading = !1;
		}
		return [];
	},
	resetAccount(e) {
		J.resetAccount(e);
	}
}), Wt = { onSwitchNetwork({ network: e, ignoreSwitchConfirmation: t = !1 }) {
	let n = J.state.activeCaipNetwork, r = R.state.data;
	if (e.id === n?.id) return;
	let i = Z.getCaipAddress(J.state.activeChain), a = e.chainNamespace !== J.state.activeChain, o = Z.getCaipAddress(e.chainNamespace), s = B.getConnectorId(J.state.activeChain) === y.CONNECTOR_ID.AUTH, c = y.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((t) => t === e.chainNamespace);
	t || s && c ? R.push("SwitchNetwork", {
		...r,
		network: e
	}) : i && a && !o ? R.push("SwitchActiveChain", {
		switchToChain: e.chainNamespace,
		navigateTo: "Connect",
		navigateWithReplace: !0,
		network: e
	}) : R.push("SwitchNetwork", {
		...r,
		network: e
	});
} }, Q = g({
	loading: !1,
	loadingNamespaceMap: /* @__PURE__ */ new Map(),
	open: !1,
	shake: !1,
	namespace: void 0
}), $ = k({
	state: Q,
	subscribe(e) {
		return _(Q, () => e(Q));
	},
	subscribeKey(e, t) {
		return v(Q, e, t);
	},
	async open(e) {
		let t = e?.namespace, n = J.state.activeChain, r = t && t !== n, i = J.getAccountData(e?.namespace)?.caipAddress;
		if (W.state.wcBasic ? I.prefetch({
			fetchNetworkImages: !1,
			fetchConnectorImages: !1
		}) : await I.prefetch(), B.setFilterByNamespace(e?.namespace), $.setLoading(!0, t), t && r) {
			let e = J.getNetworkData(t)?.caipNetwork || J.getRequestedCaipNetworks(t)[0];
			e && Wt.onSwitchNetwork({
				network: e,
				ignoreSwitchConfirmation: !0
			});
		} else {
			let t = J.state.noAdapters;
			O.state.manualWCControl || t && !i ? E.isMobile() ? R.reset("AllWallets") : R.reset("ConnectingWalletConnectBasic") : e?.view ? R.reset(e.view, e.data) : i ? R.reset("Account") : R.reset("Connect");
		}
		Q.open = !0, Pt.set({ open: !0 }), N.sendEvent({
			type: "track",
			event: "MODAL_OPEN",
			properties: { connected: !!i }
		});
	},
	close() {
		let e = O.state.enableEmbedded, t = !!J.state.activeCaipAddress;
		Q.open && N.sendEvent({
			type: "track",
			event: "MODAL_CLOSE",
			properties: { connected: t }
		}), Q.open = !1, R.reset("Connect"), $.clearLoading(), e ? t ? R.replace("Account") : R.push("Connect") : Pt.set({ open: !1 }), W.resetUri();
	},
	setLoading(e, t) {
		t && Q.loadingNamespaceMap.set(t, e), Q.loading = e, Pt.set({ loading: e });
	},
	clearLoading() {
		Q.loadingNamespaceMap.clear(), Q.loading = !1, Pt.set({ loading: !1 });
	},
	shake() {
		Q.shake || (Q.shake = !0, setTimeout(() => {
			Q.shake = !1;
		}, 500));
	}
});
//#endregion
export { ot as A, S as B, ft as C, nt as D, rt as E, w as F, pe as G, Re as H, We as I, g as J, y as K, Ue as L, O as M, E as N, it as O, T as P, Ve as R, N as S, M as T, Le as U, Be as V, Ne as W, _ as X, ae as Y, Et as _, Bt as a, R as b, K as c, W as d, jt as f, Tt as g, Dt as h, Ht as i, k as j, at as k, Ft as l, Ot as m, Wt as n, X as o, At as p, v as q, Z as r, J as s, $ as t, Pt as u, B as v, ut as w, I as x, xt as y, C as z };
