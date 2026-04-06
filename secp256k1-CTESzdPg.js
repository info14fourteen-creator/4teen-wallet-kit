import { a as e, c as t, f as n, h as r, i, l as a, n as o, o as s, p as c, r as l, s as u, t as d, u as f, x as p } from "./utils-DpxvPXEZ.js";
//#region node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_md.js
function m(e, t, n, r) {
	if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
	let i = BigInt(32), a = BigInt(4294967295), o = Number(n >> i & a), s = Number(n & a), c = r ? 4 : 0, l = r ? 0 : 4;
	e.setUint32(t + c, o, r), e.setUint32(t + l, s, r);
}
function h(e, t, n) {
	return e & t ^ ~e & n;
}
function g(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var _ = class extends d {
	constructor(e, t, n, r) {
		super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = f(this.buffer);
	}
	update(e) {
		l(this), e = r(e), o(e);
		let { view: t, buffer: n, blockLen: i } = this, a = e.length;
		for (let r = 0; r < a;) {
			let o = Math.min(i - this.pos, a - r);
			if (o === i) {
				let t = f(e);
				for (; i <= a - r; r += i) this.process(t, r);
				continue;
			}
			n.set(e.subarray(r, r + o), this.pos), this.pos += o, r += o, this.pos === i && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		l(this), s(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, u(this.buffer.subarray(a)), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		m(n, r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = f(e), c = this.outputLen;
		if (c % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
		let d = c / 4, p = this.get();
		if (d > p.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < d; e++) o.setUint32(4 * e, p[e], i);
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneInto(e) {
		e || (e = new this.constructor()), e.set(...this.get());
		let { blockLen: t, buffer: n, length: r, finished: i, destroyed: a, pos: o } = this;
		return e.destroyed = a, e.finished = i, e.length = r, e.pos = o, r % t && e.buffer.set(n), e;
	}
	clone() {
		return this._cloneInto();
	}
}, v = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), y = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]), b = /* @__PURE__ */ new Uint32Array(64), x = class extends _ {
	constructor(e = 32) {
		super(64, e, 8, !1), this.A = v[0] | 0, this.B = v[1] | 0, this.C = v[2] | 0, this.D = v[3] | 0, this.E = v[4] | 0, this.F = v[5] | 0, this.G = v[6] | 0, this.H = v[7] | 0;
	}
	get() {
		let { A: e, B: t, C: n, D: r, E: i, F: a, G: o, H: s } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s
		];
	}
	set(e, t, n, r, i, a, o, s) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = s | 0;
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) b[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = b[e - 15], n = b[e - 2], r = c(t, 7) ^ c(t, 18) ^ t >>> 3;
			b[e] = (c(n, 17) ^ c(n, 19) ^ n >>> 10) + b[e - 7] + r + b[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: l, H: u } = this;
		for (let e = 0; e < 64; e++) {
			let t = c(o, 6) ^ c(o, 11) ^ c(o, 25), d = u + t + h(o, s, l) + y[e] + b[e] | 0, f = (c(n, 2) ^ c(n, 13) ^ c(n, 22)) + g(n, r, i) | 0;
			u = l, l = s, s = o, o = a + d | 0, a = i, i = r, r = n, n = d + f | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(n, r, i, a, o, s, l, u);
	}
	roundClean() {
		u(b);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0, 0, 0, 0), u(this.buffer);
	}
}, S = p((/* @__PURE__ */ "0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817".split(".")).map((e) => BigInt(e)));
S[0], S[1];
var C = /* @__PURE__ */ a(() => new x()), w = class extends d {
	constructor(e, t) {
		super(), this.finished = !1, this.destroyed = !1, i(e);
		let n = r(t);
		if (this.iHash = e.create(), typeof this.iHash.update != "function") throw Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
		let a = this.blockLen, o = new Uint8Array(a);
		o.set(n.length > a ? e.create().update(n).digest() : n);
		for (let e = 0; e < o.length; e++) o[e] ^= 54;
		this.iHash.update(o), this.oHash = e.create();
		for (let e = 0; e < o.length; e++) o[e] ^= 106;
		this.oHash.update(o), u(o);
	}
	update(e) {
		return l(this), this.iHash.update(e), this;
	}
	digestInto(e) {
		l(this), o(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
	}
	digest() {
		let e = new Uint8Array(this.oHash.outputLen);
		return this.digestInto(e), e;
	}
	_cloneInto(e) {
		e || (e = Object.create(Object.getPrototypeOf(this), {}));
		let { oHash: t, iHash: n, finished: r, destroyed: i, blockLen: a, outputLen: o } = this;
		return e = e, e.finished = r, e.destroyed = i, e.blockLen = a, e.outputLen = o, e.oHash = t._cloneInto(e.oHash), e.iHash = n._cloneInto(e.iHash), e;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
	}
}, T = (e, t, n) => new w(e, t).update(n).digest();
T.create = (e, t) => new w(e, t);
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/abstract/utils.js
var E = /* @__PURE__ */ BigInt(0), D = /* @__PURE__ */ BigInt(1);
function O(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function k(e) {
	if (!O(e)) throw Error("Uint8Array expected");
}
function A(e, t) {
	if (typeof t != "boolean") throw Error(e + " boolean expected, got " + t);
}
function j(e) {
	let t = e.toString(16);
	return t.length & 1 ? "0" + t : t;
}
function ee(e) {
	if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
	return e === "" ? E : BigInt("0x" + e);
}
var te = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", ne = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function M(e) {
	if (k(e), te) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += ne[e[n]];
	return t;
}
var N = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function re(e) {
	if (e >= N._0 && e <= N._9) return e - N._0;
	if (e >= N.A && e <= N.F) return e - (N.A - 10);
	if (e >= N.a && e <= N.f) return e - (N.a - 10);
}
function P(e) {
	if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
	if (te) return Uint8Array.fromHex(e);
	let t = e.length, n = t / 2;
	if (t % 2) throw Error("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = re(e.charCodeAt(i)), a = re(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw Error("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function F(e) {
	return ee(M(e));
}
function ie(e) {
	return k(e), ee(M(Uint8Array.from(e).reverse()));
}
function I(e, t) {
	return P(e.toString(16).padStart(t * 2, "0"));
}
function ae(e, t) {
	return I(e, t).reverse();
}
function L(e, t, n) {
	let r;
	if (typeof t == "string") try {
		r = P(t);
	} catch (t) {
		throw Error(e + " must be hex string or Uint8Array, cause: " + t);
	}
	else if (O(t)) r = Uint8Array.from(t);
	else throw Error(e + " must be hex string or Uint8Array");
	let i = r.length;
	if (typeof n == "number" && i !== n) throw Error(e + " of length " + n + " expected, got " + i);
	return r;
}
function R(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		k(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
function oe(e) {
	if (typeof e != "string") throw Error("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
var se = (e) => typeof e == "bigint" && E <= e;
function ce(e, t, n) {
	return se(e) && se(t) && se(n) && t <= e && e < n;
}
function z(e, t, n, r) {
	if (!ce(t, n, r)) throw Error("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function le(e) {
	let t;
	for (t = 0; e > E; e >>= D, t += 1);
	return t;
}
var ue = (e) => (D << BigInt(e)) - D, de = (e) => new Uint8Array(e), fe = (e) => Uint8Array.from(e);
function pe(e, t, n) {
	if (typeof e != "number" || e < 2) throw Error("hashLen must be a number");
	if (typeof t != "number" || t < 2) throw Error("qByteLen must be a number");
	if (typeof n != "function") throw Error("hmacFn must be a function");
	let r = de(e), i = de(e), a = 0, o = () => {
		r.fill(1), i.fill(0), a = 0;
	}, s = (...e) => n(i, r, ...e), c = (e = de(0)) => {
		i = s(fe([0]), e), r = s(), e.length !== 0 && (i = s(fe([1]), e), r = s());
	}, l = () => {
		if (a++ >= 1e3) throw Error("drbg: tried 1000 values");
		let e = 0, n = [];
		for (; e < t;) {
			r = s();
			let t = r.slice();
			n.push(t), e += r.length;
		}
		return R(...n);
	};
	return (e, t) => {
		o(), c(e);
		let n;
		for (; !(n = t(l()));) c();
		return o(), n;
	};
}
var me = {
	bigint: (e) => typeof e == "bigint",
	function: (e) => typeof e == "function",
	boolean: (e) => typeof e == "boolean",
	string: (e) => typeof e == "string",
	stringOrUint8Array: (e) => typeof e == "string" || O(e),
	isSafeInteger: (e) => Number.isSafeInteger(e),
	array: (e) => Array.isArray(e),
	field: (e, t) => t.Fp.isValid(e),
	hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function B(e, t, n = {}) {
	let r = (t, n, r) => {
		let i = me[n];
		if (typeof i != "function") throw Error("invalid validator function");
		let a = e[t];
		if (!(r && a === void 0) && !i(a, e)) throw Error("param " + String(t) + " is invalid. Expected " + n + ", got " + a);
	};
	for (let [e, n] of Object.entries(t)) r(e, n, !1);
	for (let [e, t] of Object.entries(n)) r(e, t, !0);
	return e;
}
function he(e) {
	let t = /* @__PURE__ */ new WeakMap();
	return (n, ...r) => {
		let i = t.get(n);
		if (i !== void 0) return i;
		let a = e(n, ...r);
		return t.set(n, a), a;
	};
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/abstract/modular.js
var V = BigInt(0), H = BigInt(1), U = /* @__PURE__ */ BigInt(2), ge = /* @__PURE__ */ BigInt(3), _e = /* @__PURE__ */ BigInt(4), ve = /* @__PURE__ */ BigInt(5), ye = /* @__PURE__ */ BigInt(8);
function W(e, t) {
	let n = e % t;
	return n >= V ? n : t + n;
}
function G(e, t, n) {
	let r = e;
	for (; t-- > V;) r *= r, r %= n;
	return r;
}
function be(e, t) {
	if (e === V) throw Error("invert: expected non-zero number");
	if (t <= V) throw Error("invert: expected positive modulus, got " + t);
	let n = W(e, t), r = t, i = V, a = H, o = H, s = V;
	for (; n !== V;) {
		let e = r / n, t = r % n, c = i - o * e, l = a - s * e;
		r = n, n = t, i = o, a = s, o = c, s = l;
	}
	if (r !== H) throw Error("invert: does not exist");
	return W(i, t);
}
function xe(e, t) {
	let n = (e.ORDER + H) / _e, r = e.pow(t, n);
	if (!e.eql(e.sqr(r), t)) throw Error("Cannot find square root");
	return r;
}
function Se(e, t) {
	let n = (e.ORDER - ve) / ye, r = e.mul(t, U), i = e.pow(r, n), a = e.mul(t, i), o = e.mul(e.mul(a, U), i), s = e.mul(a, e.sub(o, e.ONE));
	if (!e.eql(e.sqr(s), t)) throw Error("Cannot find square root");
	return s;
}
function Ce(e) {
	if (e < BigInt(3)) throw Error("sqrt is not defined for small field");
	let t = e - H, n = 0;
	for (; t % U === V;) t /= U, n++;
	let r = U, i = je(e);
	for (; ke(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return xe;
	let a = i.pow(r, t), o = (t + H) / U;
	return function(e, r) {
		if (e.is0(r)) return r;
		if (ke(e, r) !== 1) throw Error("Cannot find square root");
		let i = n, s = e.mul(e.ONE, a), c = e.pow(r, t), l = e.pow(r, o);
		for (; !e.eql(c, e.ONE);) {
			if (e.is0(c)) return e.ZERO;
			let t = 1, n = e.sqr(c);
			for (; !e.eql(n, e.ONE);) if (t++, n = e.sqr(n), t === i) throw Error("Cannot find square root");
			let r = H << BigInt(i - t - 1), a = e.pow(s, r);
			i = t, s = e.sqr(a), c = e.mul(c, s), l = e.mul(l, a);
		}
		return l;
	};
}
function we(e) {
	return e % _e === ge ? xe : e % ye === ve ? Se : Ce(e);
}
var Te = [
	"create",
	"isValid",
	"is0",
	"neg",
	"inv",
	"sqrt",
	"sqr",
	"eql",
	"add",
	"sub",
	"mul",
	"pow",
	"div",
	"addN",
	"subN",
	"mulN",
	"sqrN"
];
function Ee(e) {
	return B(e, Te.reduce((e, t) => (e[t] = "function", e), {
		ORDER: "bigint",
		MASK: "bigint",
		BYTES: "isSafeInteger",
		BITS: "isSafeInteger"
	}));
}
function De(e, t, n) {
	if (n < V) throw Error("invalid exponent, negatives unsupported");
	if (n === V) return e.ONE;
	if (n === H) return t;
	let r = e.ONE, i = t;
	for (; n > V;) n & H && (r = e.mul(r, i)), i = e.sqr(i), n >>= H;
	return r;
}
function Oe(e, t, n = !1) {
	let r = Array(t.length).fill(n ? e.ZERO : void 0), i = t.reduce((t, n, i) => e.is0(n) ? t : (r[i] = t, e.mul(t, n)), e.ONE), a = e.inv(i);
	return t.reduceRight((t, n, i) => e.is0(n) ? t : (r[i] = e.mul(t, r[i]), e.mul(t, n)), a), r;
}
function ke(e, t) {
	let n = (e.ORDER - H) / U, r = e.pow(t, n), i = e.eql(r, e.ONE), a = e.eql(r, e.ZERO), o = e.eql(r, e.neg(e.ONE));
	if (!i && !a && !o) throw Error("invalid Legendre symbol result");
	return i ? 1 : a ? 0 : -1;
}
function Ae(t, n) {
	n !== void 0 && e(n);
	let r = n === void 0 ? t.toString(2).length : n;
	return {
		nBitLength: r,
		nByteLength: Math.ceil(r / 8)
	};
}
function je(e, t, n = !1, r = {}) {
	if (e <= V) throw Error("invalid field: expected ORDER > 0, got " + e);
	let { nBitLength: i, nByteLength: a } = Ae(e, t);
	if (a > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
	let o, s = Object.freeze({
		ORDER: e,
		isLE: n,
		BITS: i,
		BYTES: a,
		MASK: ue(i),
		ZERO: V,
		ONE: H,
		create: (t) => W(t, e),
		isValid: (t) => {
			if (typeof t != "bigint") throw Error("invalid field element: expected bigint, got " + typeof t);
			return V <= t && t < e;
		},
		is0: (e) => e === V,
		isOdd: (e) => (e & H) === H,
		neg: (t) => W(-t, e),
		eql: (e, t) => e === t,
		sqr: (t) => W(t * t, e),
		add: (t, n) => W(t + n, e),
		sub: (t, n) => W(t - n, e),
		mul: (t, n) => W(t * n, e),
		pow: (e, t) => De(s, e, t),
		div: (t, n) => W(t * be(n, e), e),
		sqrN: (e) => e * e,
		addN: (e, t) => e + t,
		subN: (e, t) => e - t,
		mulN: (e, t) => e * t,
		inv: (t) => be(t, e),
		sqrt: r.sqrt || ((t) => (o || (o = we(e)), o(s, t))),
		toBytes: (e) => n ? ae(e, a) : I(e, a),
		fromBytes: (e) => {
			if (e.length !== a) throw Error("Field.fromBytes: expected " + a + " bytes, got " + e.length);
			return n ? ie(e) : F(e);
		},
		invertBatch: (e) => Oe(s, e),
		cmov: (e, t, n) => n ? t : e
	});
	return Object.freeze(s);
}
function Me(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	let t = e.toString(2).length;
	return Math.ceil(t / 8);
}
function Ne(e) {
	let t = Me(e);
	return t + Math.ceil(t / 2);
}
function Pe(e, t, n = !1) {
	let r = e.length, i = Me(t), a = Ne(t);
	if (r < 16 || r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = W(n ? ie(e) : F(e), t - H) + H;
	return n ? ae(o, i) : I(o, i);
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/abstract/curve.js
var Fe = BigInt(0), Ie = BigInt(1);
function Le(e, t) {
	let n = t.negate();
	return e ? n : t;
}
function Re(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function ze(e, t) {
	Re(e, t);
	let n = Math.ceil(t / e) + 1, r = 2 ** (e - 1), i = 2 ** e;
	return {
		windows: n,
		windowSize: r,
		mask: ue(e),
		maxNumber: i,
		shiftBy: BigInt(e)
	};
}
function Be(e, t, n) {
	let { windowSize: r, mask: i, maxNumber: a, shiftBy: o } = n, s = Number(e & i), c = e >> o;
	s > r && (s -= a, c += Ie);
	let l = t * r, u = l + Math.abs(s) - 1, d = s === 0, f = s < 0, p = t % 2 != 0;
	return {
		nextN: c,
		offset: u,
		isZero: d,
		isNeg: f,
		isNegF: p,
		offsetF: l
	};
}
function Ve(e, t) {
	if (!Array.isArray(e)) throw Error("array expected");
	e.forEach((e, n) => {
		if (!(e instanceof t)) throw Error("invalid point at index " + n);
	});
}
function He(e, t) {
	if (!Array.isArray(e)) throw Error("array of scalars expected");
	e.forEach((e, n) => {
		if (!t.isValid(e)) throw Error("invalid scalar at index " + n);
	});
}
var Ue = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap();
function Ge(e) {
	return We.get(e) || 1;
}
function Ke(e, t) {
	return {
		constTimeNegate: Le,
		hasPrecomputes(e) {
			return Ge(e) !== 1;
		},
		unsafeLadder(t, n, r = e.ZERO) {
			let i = t;
			for (; n > Fe;) n & Ie && (r = r.add(i)), i = i.double(), n >>= Ie;
			return r;
		},
		precomputeWindow(e, n) {
			let { windows: r, windowSize: i } = ze(n, t), a = [], o = e, s = o;
			for (let e = 0; e < r; e++) {
				s = o, a.push(s);
				for (let e = 1; e < i; e++) s = s.add(o), a.push(s);
				o = s.double();
			}
			return a;
		},
		wNAF(n, r, i) {
			let a = e.ZERO, o = e.BASE, s = ze(n, t);
			for (let e = 0; e < s.windows; e++) {
				let { nextN: t, offset: n, isZero: c, isNeg: l, isNegF: u, offsetF: d } = Be(i, e, s);
				i = t, c ? o = o.add(Le(u, r[d])) : a = a.add(Le(l, r[n]));
			}
			return {
				p: a,
				f: o
			};
		},
		wNAFUnsafe(n, r, i, a = e.ZERO) {
			let o = ze(n, t);
			for (let e = 0; e < o.windows && i !== Fe; e++) {
				let { nextN: t, offset: n, isZero: s, isNeg: c } = Be(i, e, o);
				if (i = t, !s) {
					let e = r[n];
					a = a.add(c ? e.negate() : e);
				}
			}
			return a;
		},
		getPrecomputes(e, t, n) {
			let r = Ue.get(t);
			return r || (r = this.precomputeWindow(t, e), e !== 1 && Ue.set(t, n(r))), r;
		},
		wNAFCached(e, t, n) {
			let r = Ge(e);
			return this.wNAF(r, this.getPrecomputes(r, e, n), t);
		},
		wNAFCachedUnsafe(e, t, n, r) {
			let i = Ge(e);
			return i === 1 ? this.unsafeLadder(e, t, r) : this.wNAFUnsafe(i, this.getPrecomputes(i, e, n), t, r);
		},
		setWindowSize(e, n) {
			Re(n, t), We.set(e, n), Ue.delete(e);
		}
	};
}
function qe(e, t, n, r) {
	Ve(n, e), He(r, t);
	let i = n.length, a = r.length;
	if (i !== a) throw Error("arrays of points and scalars must have equal length");
	let o = e.ZERO, s = le(BigInt(i)), c = 1;
	s > 12 ? c = s - 3 : s > 4 ? c = s - 2 : s > 0 && (c = 2);
	let l = ue(c), u = Array(Number(l) + 1).fill(o), d = Math.floor((t.BITS - 1) / c) * c, f = o;
	for (let e = d; e >= 0; e -= c) {
		u.fill(o);
		for (let t = 0; t < a; t++) {
			let i = r[t], a = Number(i >> BigInt(e) & l);
			u[a] = u[a].add(n[t]);
		}
		let t = o;
		for (let e = u.length - 1, n = o; e > 0; e--) n = n.add(u[e]), t = t.add(n);
		if (f = f.add(t), e !== 0) for (let e = 0; e < c; e++) f = f.double();
	}
	return f;
}
function Je(e) {
	return Ee(e.Fp), B(e, {
		n: "bigint",
		h: "bigint",
		Gx: "field",
		Gy: "field"
	}, {
		nBitLength: "isSafeInteger",
		nByteLength: "isSafeInteger"
	}), Object.freeze({
		...Ae(e.n, e.nBitLength),
		...e,
		p: e.Fp.ORDER
	});
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/abstract/weierstrass.js
function Ye(e) {
	e.lowS !== void 0 && A("lowS", e.lowS), e.prehash !== void 0 && A("prehash", e.prehash);
}
function Xe(e) {
	let t = Je(e);
	B(t, {
		a: "field",
		b: "field"
	}, {
		allowInfinityPoint: "boolean",
		allowedPrivateKeyLengths: "array",
		clearCofactor: "function",
		fromBytes: "function",
		isTorsionFree: "function",
		toBytes: "function",
		wrapPrivateKey: "boolean"
	});
	let { endo: n, Fp: r, a: i } = t;
	if (n) {
		if (!r.eql(i, r.ZERO)) throw Error("invalid endo: CURVE.a must be 0");
		if (typeof n != "object" || typeof n.beta != "bigint" || typeof n.splitScalar != "function") throw Error("invalid endo: expected \"beta\": bigint and \"splitScalar\": function");
	}
	return Object.freeze({ ...t });
}
var K = {
	Err: class extends Error {
		constructor(e = "") {
			super(e);
		}
	},
	_tlv: {
		encode: (e, t) => {
			let { Err: n } = K;
			if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
			if (t.length & 1) throw new n("tlv.encode: unpadded data");
			let r = t.length / 2, i = j(r);
			if (i.length / 2 & 128) throw new n("tlv.encode: long form length too big");
			let a = r > 127 ? j(i.length / 2 | 128) : "";
			return j(e) + a + i + t;
		},
		decode(e, t) {
			let { Err: n } = K, r = 0;
			if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
			if (t.length < 2 || t[r++] !== e) throw new n("tlv.decode: wrong tlv");
			let i = t[r++], a = !!(i & 128), o = 0;
			if (!a) o = i;
			else {
				let e = i & 127;
				if (!e) throw new n("tlv.decode(long): indefinite length not supported");
				if (e > 4) throw new n("tlv.decode(long): byte length is too big");
				let a = t.subarray(r, r + e);
				if (a.length !== e) throw new n("tlv.decode: length bytes not complete");
				if (a[0] === 0) throw new n("tlv.decode(long): zero leftmost byte");
				for (let e of a) o = o << 8 | e;
				if (r += e, o < 128) throw new n("tlv.decode(long): not minimal encoding");
			}
			let s = t.subarray(r, r + o);
			if (s.length !== o) throw new n("tlv.decode: wrong value length");
			return {
				v: s,
				l: t.subarray(r + o)
			};
		}
	},
	_int: {
		encode(e) {
			let { Err: t } = K;
			if (e < q) throw new t("integer: negative integers are not allowed");
			let n = j(e);
			if (Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1) throw new t("unexpected DER parsing assertion: unpadded hex");
			return n;
		},
		decode(e) {
			let { Err: t } = K;
			if (e[0] & 128) throw new t("invalid signature integer: negative");
			if (e[0] === 0 && !(e[1] & 128)) throw new t("invalid signature integer: unnecessary leading zero");
			return F(e);
		}
	},
	toSig(e) {
		let { Err: t, _int: n, _tlv: r } = K, i = L("signature", e), { v: a, l: o } = r.decode(48, i);
		if (o.length) throw new t("invalid signature: left bytes after parsing");
		let { v: s, l: c } = r.decode(2, a), { v: l, l: u } = r.decode(2, c);
		if (u.length) throw new t("invalid signature: left bytes after parsing");
		return {
			r: n.decode(s),
			s: n.decode(l)
		};
	},
	hexFromSig(e) {
		let { _tlv: t, _int: n } = K, r = t.encode(2, n.encode(e.r)) + t.encode(2, n.encode(e.s));
		return t.encode(48, r);
	}
};
function Ze(e, t) {
	return M(I(e, t));
}
var q = BigInt(0), J = BigInt(1), Y = BigInt(2), X = BigInt(3), Qe = BigInt(4);
function $e(e) {
	let t = Xe(e), { Fp: n } = t, r = je(t.n, t.nBitLength), i = t.toBytes || ((e, t, r) => {
		let i = t.toAffine();
		return R(Uint8Array.from([4]), n.toBytes(i.x), n.toBytes(i.y));
	}), a = t.fromBytes || ((e) => {
		let t = e.subarray(1);
		return {
			x: n.fromBytes(t.subarray(0, n.BYTES)),
			y: n.fromBytes(t.subarray(n.BYTES, 2 * n.BYTES))
		};
	});
	function o(e) {
		let { a: r, b: i } = t, a = n.sqr(e), o = n.mul(a, e);
		return n.add(n.add(o, n.mul(e, r)), i);
	}
	function s(e, t) {
		let r = n.sqr(t), i = o(e);
		return n.eql(r, i);
	}
	if (!s(t.Gx, t.Gy)) throw Error("bad curve params: generator point");
	let c = n.mul(n.pow(t.a, X), Qe), l = n.mul(n.sqr(t.b), BigInt(27));
	if (n.is0(n.add(c, l))) throw Error("bad curve params: a or b");
	function u(e) {
		return ce(e, J, t.n);
	}
	function d(e) {
		let { allowedPrivateKeyLengths: n, nByteLength: r, wrapPrivateKey: i, n: a } = t;
		if (n && typeof e != "bigint") {
			if (O(e) && (e = M(e)), typeof e != "string" || !n.includes(e.length)) throw Error("invalid private key");
			e = e.padStart(r * 2, "0");
		}
		let o;
		try {
			o = typeof e == "bigint" ? e : F(L("private key", e, r));
		} catch {
			throw Error("invalid private key, expected hex or " + r + " bytes, got " + typeof e);
		}
		return i && (o = W(o, a)), z("private key", o, J, a), o;
	}
	function f(e) {
		if (!(e instanceof h)) throw Error("ProjectivePoint expected");
	}
	let p = he((e, t) => {
		let { px: r, py: i, pz: a } = e;
		if (n.eql(a, n.ONE)) return {
			x: r,
			y: i
		};
		let o = e.is0();
		t ?? (t = o ? n.ONE : n.inv(a));
		let s = n.mul(r, t), c = n.mul(i, t), l = n.mul(a, t);
		if (o) return {
			x: n.ZERO,
			y: n.ZERO
		};
		if (!n.eql(l, n.ONE)) throw Error("invZ was invalid");
		return {
			x: s,
			y: c
		};
	}), m = he((e) => {
		if (e.is0()) {
			if (t.allowInfinityPoint && !n.is0(e.py)) return;
			throw Error("bad point: ZERO");
		}
		let { x: r, y: i } = e.toAffine();
		if (!n.isValid(r) || !n.isValid(i)) throw Error("bad point: x or y not FE");
		if (!s(r, i)) throw Error("bad point: equation left != right");
		if (!e.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
		return !0;
	});
	class h {
		constructor(e, t, r) {
			if (e == null || !n.isValid(e)) throw Error("x required");
			if (t == null || !n.isValid(t) || n.is0(t)) throw Error("y required");
			if (r == null || !n.isValid(r)) throw Error("z required");
			this.px = e, this.py = t, this.pz = r, Object.freeze(this);
		}
		static fromAffine(e) {
			let { x: t, y: r } = e || {};
			if (!e || !n.isValid(t) || !n.isValid(r)) throw Error("invalid affine point");
			if (e instanceof h) throw Error("projective point not allowed");
			let i = (e) => n.eql(e, n.ZERO);
			return i(t) && i(r) ? h.ZERO : new h(t, r, n.ONE);
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		static normalizeZ(e) {
			let t = Oe(n, e.map((e) => e.pz));
			return e.map((e, n) => e.toAffine(t[n])).map(h.fromAffine);
		}
		static fromHex(e) {
			let t = h.fromAffine(a(L("pointHex", e)));
			return t.assertValidity(), t;
		}
		static fromPrivateKey(e) {
			return h.BASE.multiply(d(e));
		}
		static msm(e, t) {
			return qe(h, r, e, t);
		}
		_setWindowSize(e) {
			v.setWindowSize(this, e);
		}
		assertValidity() {
			m(this);
		}
		hasEvenY() {
			let { y: e } = this.toAffine();
			if (n.isOdd) return !n.isOdd(e);
			throw Error("Field doesn't support isOdd");
		}
		equals(e) {
			f(e);
			let { px: t, py: r, pz: i } = this, { px: a, py: o, pz: s } = e, c = n.eql(n.mul(t, s), n.mul(a, i)), l = n.eql(n.mul(r, s), n.mul(o, i));
			return c && l;
		}
		negate() {
			return new h(this.px, n.neg(this.py), this.pz);
		}
		double() {
			let { a: e, b: r } = t, i = n.mul(r, X), { px: a, py: o, pz: s } = this, c = n.ZERO, l = n.ZERO, u = n.ZERO, d = n.mul(a, a), f = n.mul(o, o), p = n.mul(s, s), m = n.mul(a, o);
			return m = n.add(m, m), u = n.mul(a, s), u = n.add(u, u), c = n.mul(e, u), l = n.mul(i, p), l = n.add(c, l), c = n.sub(f, l), l = n.add(f, l), l = n.mul(c, l), c = n.mul(m, c), u = n.mul(i, u), p = n.mul(e, p), m = n.sub(d, p), m = n.mul(e, m), m = n.add(m, u), u = n.add(d, d), d = n.add(u, d), d = n.add(d, p), d = n.mul(d, m), l = n.add(l, d), p = n.mul(o, s), p = n.add(p, p), d = n.mul(p, m), c = n.sub(c, d), u = n.mul(p, f), u = n.add(u, u), u = n.add(u, u), new h(c, l, u);
		}
		add(e) {
			f(e);
			let { px: r, py: i, pz: a } = this, { px: o, py: s, pz: c } = e, l = n.ZERO, u = n.ZERO, d = n.ZERO, p = t.a, m = n.mul(t.b, X), g = n.mul(r, o), _ = n.mul(i, s), v = n.mul(a, c), y = n.add(r, i), b = n.add(o, s);
			y = n.mul(y, b), b = n.add(g, _), y = n.sub(y, b), b = n.add(r, a);
			let x = n.add(o, c);
			return b = n.mul(b, x), x = n.add(g, v), b = n.sub(b, x), x = n.add(i, a), l = n.add(s, c), x = n.mul(x, l), l = n.add(_, v), x = n.sub(x, l), d = n.mul(p, b), l = n.mul(m, v), d = n.add(l, d), l = n.sub(_, d), d = n.add(_, d), u = n.mul(l, d), _ = n.add(g, g), _ = n.add(_, g), v = n.mul(p, v), b = n.mul(m, b), _ = n.add(_, v), v = n.sub(g, v), v = n.mul(p, v), b = n.add(b, v), g = n.mul(_, b), u = n.add(u, g), g = n.mul(x, b), l = n.mul(y, l), l = n.sub(l, g), g = n.mul(y, _), d = n.mul(x, d), d = n.add(d, g), new h(l, u, d);
		}
		subtract(e) {
			return this.add(e.negate());
		}
		is0() {
			return this.equals(h.ZERO);
		}
		wNAF(e) {
			return v.wNAFCached(this, e, h.normalizeZ);
		}
		multiplyUnsafe(e) {
			let { endo: r, n: i } = t;
			z("scalar", e, q, i);
			let a = h.ZERO;
			if (e === q) return a;
			if (this.is0() || e === J) return this;
			if (!r || v.hasPrecomputes(this)) return v.wNAFCachedUnsafe(this, e, h.normalizeZ);
			let { k1neg: o, k1: s, k2neg: c, k2: l } = r.splitScalar(e), u = a, d = a, f = this;
			for (; s > q || l > q;) s & J && (u = u.add(f)), l & J && (d = d.add(f)), f = f.double(), s >>= J, l >>= J;
			return o && (u = u.negate()), c && (d = d.negate()), d = new h(n.mul(d.px, r.beta), d.py, d.pz), u.add(d);
		}
		multiply(e) {
			let { endo: r, n: i } = t;
			z("scalar", e, J, i);
			let a, o;
			if (r) {
				let { k1neg: t, k1: i, k2neg: s, k2: c } = r.splitScalar(e), { p: l, f: u } = this.wNAF(i), { p: d, f } = this.wNAF(c);
				l = v.constTimeNegate(t, l), d = v.constTimeNegate(s, d), d = new h(n.mul(d.px, r.beta), d.py, d.pz), a = l.add(d), o = u.add(f);
			} else {
				let { p: t, f: n } = this.wNAF(e);
				a = t, o = n;
			}
			return h.normalizeZ([a, o])[0];
		}
		multiplyAndAddUnsafe(e, t, n) {
			let r = h.BASE, i = (e, t) => t === q || t === J || !e.equals(r) ? e.multiplyUnsafe(t) : e.multiply(t), a = i(this, t).add(i(e, n));
			return a.is0() ? void 0 : a;
		}
		toAffine(e) {
			return p(this, e);
		}
		isTorsionFree() {
			let { h: e, isTorsionFree: n } = t;
			if (e === J) return !0;
			if (n) return n(h, this);
			throw Error("isTorsionFree() has not been declared for the elliptic curve");
		}
		clearCofactor() {
			let { h: e, clearCofactor: n } = t;
			return e === J ? this : n ? n(h, this) : this.multiplyUnsafe(t.h);
		}
		toRawBytes(e = !0) {
			return A("isCompressed", e), this.assertValidity(), i(h, this, e);
		}
		toHex(e = !0) {
			return A("isCompressed", e), M(this.toRawBytes(e));
		}
	}
	h.BASE = new h(t.Gx, t.Gy, n.ONE), h.ZERO = new h(n.ZERO, n.ONE, n.ZERO);
	let { endo: g, nBitLength: _ } = t, v = Ke(h, g ? Math.ceil(_ / 2) : _);
	return {
		CURVE: t,
		ProjectivePoint: h,
		normPrivateKeyToScalar: d,
		weierstrassEquation: o,
		isWithinCurveOrder: u
	};
}
function et(e) {
	let t = Je(e);
	return B(t, {
		hash: "hash",
		hmac: "function",
		randomBytes: "function"
	}, {
		bits2int: "function",
		bits2int_modN: "function",
		lowS: "boolean"
	}), Object.freeze({
		lowS: !0,
		...t
	});
}
function tt(e) {
	let t = et(e), { Fp: n, n: r, nByteLength: i, nBitLength: a } = t, o = n.BYTES + 1, s = 2 * n.BYTES + 1;
	function c(e) {
		return W(e, r);
	}
	function l(e) {
		return be(e, r);
	}
	let { ProjectivePoint: u, normPrivateKeyToScalar: d, weierstrassEquation: f, isWithinCurveOrder: p } = $e({
		...t,
		toBytes(e, t, r) {
			let i = t.toAffine(), a = n.toBytes(i.x), o = R;
			return A("isCompressed", r), r ? o(Uint8Array.from([t.hasEvenY() ? 2 : 3]), a) : o(Uint8Array.from([4]), a, n.toBytes(i.y));
		},
		fromBytes(e) {
			let t = e.length, r = e[0], i = e.subarray(1);
			if (t === o && (r === 2 || r === 3)) {
				let e = F(i);
				if (!ce(e, J, n.ORDER)) throw Error("Point is not on curve");
				let t = f(e), a;
				try {
					a = n.sqrt(t);
				} catch (e) {
					let t = e instanceof Error ? ": " + e.message : "";
					throw Error("Point is not on curve" + t);
				}
				let o = (a & J) === J;
				return (r & 1) == 1 !== o && (a = n.neg(a)), {
					x: e,
					y: a
				};
			} else if (t === s && r === 4) return {
				x: n.fromBytes(i.subarray(0, n.BYTES)),
				y: n.fromBytes(i.subarray(n.BYTES, 2 * n.BYTES))
			};
			else {
				let e = o, n = s;
				throw Error("invalid Point, expected length of " + e + ", or uncompressed " + n + ", got " + t);
			}
		}
	});
	function m(e) {
		return e > r >> J;
	}
	function h(e) {
		return m(e) ? c(-e) : e;
	}
	let g = (e, t, n) => F(e.slice(t, n));
	class _ {
		constructor(e, t, n) {
			z("r", e, J, r), z("s", t, J, r), this.r = e, this.s = t, n != null && (this.recovery = n), Object.freeze(this);
		}
		static fromCompact(e) {
			let t = i;
			return e = L("compactSignature", e, t * 2), new _(g(e, 0, t), g(e, t, 2 * t));
		}
		static fromDER(e) {
			let { r: t, s: n } = K.toSig(L("DER", e));
			return new _(t, n);
		}
		assertValidity() {}
		addRecoveryBit(e) {
			return new _(this.r, this.s, e);
		}
		recoverPublicKey(e) {
			let { r, s: i, recovery: a } = this, o = C(L("msgHash", e));
			if (a == null || ![
				0,
				1,
				2,
				3
			].includes(a)) throw Error("recovery id invalid");
			let s = a === 2 || a === 3 ? r + t.n : r;
			if (s >= n.ORDER) throw Error("recovery id 2 or 3 invalid");
			let d = a & 1 ? "03" : "02", f = u.fromHex(d + Ze(s, n.BYTES)), p = l(s), m = c(-o * p), h = c(i * p), g = u.BASE.multiplyAndAddUnsafe(f, m, h);
			if (!g) throw Error("point at infinify");
			return g.assertValidity(), g;
		}
		hasHighS() {
			return m(this.s);
		}
		normalizeS() {
			return this.hasHighS() ? new _(this.r, c(-this.s), this.recovery) : this;
		}
		toDERRawBytes() {
			return P(this.toDERHex());
		}
		toDERHex() {
			return K.hexFromSig(this);
		}
		toCompactRawBytes() {
			return P(this.toCompactHex());
		}
		toCompactHex() {
			let e = i;
			return Ze(this.r, e) + Ze(this.s, e);
		}
	}
	let v = {
		isValidPrivateKey(e) {
			try {
				return d(e), !0;
			} catch {
				return !1;
			}
		},
		normPrivateKeyToScalar: d,
		randomPrivateKey: () => {
			let e = Ne(t.n);
			return Pe(t.randomBytes(e), t.n);
		},
		precompute(e = 8, t = u.BASE) {
			return t._setWindowSize(e), t.multiply(BigInt(3)), t;
		}
	};
	function y(e, t = !0) {
		return u.fromPrivateKey(e).toRawBytes(t);
	}
	function b(e) {
		if (typeof e == "bigint") return !1;
		if (e instanceof u) return !0;
		let r = L("key", e).length, a = n.BYTES, o = a + 1, s = 2 * a + 1;
		if (!(t.allowedPrivateKeyLengths || i === o)) return r === o || r === s;
	}
	function x(e, t, n = !0) {
		if (b(e) === !0) throw Error("first arg must be private key");
		if (b(t) === !1) throw Error("second arg must be public key");
		return u.fromHex(t).multiply(d(e)).toRawBytes(n);
	}
	let S = t.bits2int || function(e) {
		if (e.length > 8192) throw Error("input is too large");
		let t = F(e), n = e.length * 8 - a;
		return n > 0 ? t >> BigInt(n) : t;
	}, C = t.bits2int_modN || function(e) {
		return c(S(e));
	}, w = ue(a);
	function T(e) {
		return z("num < 2^" + a, e, q, w), I(e, i);
	}
	function E(e, r, i = D) {
		if (["recovered", "canonical"].some((e) => e in i)) throw Error("sign() legacy options not supported");
		let { hash: a, randomBytes: o } = t, { lowS: s, prehash: f, extraEntropy: g } = i;
		s ?? (s = !0), e = L("msgHash", e), Ye(i), f && (e = L("prehashed msgHash", a(e)));
		let v = C(e), y = d(r), b = [T(y), T(v)];
		if (g != null && g !== !1) {
			let e = g === !0 ? o(n.BYTES) : g;
			b.push(L("extraEntropy", e));
		}
		let x = R(...b), w = v;
		function E(e) {
			let t = S(e);
			if (!p(t)) return;
			let n = l(t), r = u.BASE.multiply(t).toAffine(), i = c(r.x);
			if (i === q) return;
			let a = c(n * c(w + i * y));
			if (a === q) return;
			let o = (r.x === i ? 0 : 2) | Number(r.y & J), d = a;
			return s && m(a) && (d = h(a), o ^= 1), new _(i, d, o);
		}
		return {
			seed: x,
			k2sig: E
		};
	}
	let D = {
		lowS: t.lowS,
		prehash: !1
	}, k = {
		lowS: t.lowS,
		prehash: !1
	};
	function j(e, n, r = D) {
		let { seed: i, k2sig: a } = E(e, n, r), o = t;
		return pe(o.hash.outputLen, o.nByteLength, o.hmac)(i, a);
	}
	u.BASE._setWindowSize(8);
	function ee(e, n, r, i = k) {
		let a = e;
		n = L("msgHash", n), r = L("publicKey", r);
		let { lowS: o, prehash: s, format: d } = i;
		if (Ye(i), "strict" in i) throw Error("options.strict was renamed to lowS");
		if (d !== void 0 && d !== "compact" && d !== "der") throw Error("format must be compact or der");
		let f = typeof a == "string" || O(a), p = !f && !d && typeof a == "object" && !!a && typeof a.r == "bigint" && typeof a.s == "bigint";
		if (!f && !p) throw Error("invalid signature, expected Uint8Array, hex string or Signature instance");
		let m, h;
		try {
			if (p && (m = new _(a.r, a.s)), f) {
				try {
					d !== "compact" && (m = _.fromDER(a));
				} catch (e) {
					if (!(e instanceof K.Err)) throw e;
				}
				!m && d !== "der" && (m = _.fromCompact(a));
			}
			h = u.fromHex(r);
		} catch {
			return !1;
		}
		if (!m || o && m.hasHighS()) return !1;
		s && (n = t.hash(n));
		let { r: g, s: v } = m, y = C(n), b = l(v), x = c(y * b), S = c(g * b), w = u.BASE.multiplyAndAddUnsafe(h, x, S)?.toAffine();
		return w ? c(w.x) === g : !1;
	}
	return {
		CURVE: t,
		getPublicKey: y,
		getSharedSecret: x,
		sign: j,
		verify: ee,
		ProjectivePoint: u,
		Signature: _,
		utils: v
	};
}
function nt(e, t) {
	let n = e.ORDER, r = q;
	for (let e = n - J; e % Y === q; e /= Y) r += J;
	let i = r, a = Y << i - J - J, o = a * Y, s = (n - J) / o, c = (s - J) / Y, l = o - J, u = a, d = e.pow(t, s), f = e.pow(t, (s + J) / Y), p = (t, n) => {
		let r = d, a = e.pow(n, l), o = e.sqr(a);
		o = e.mul(o, n);
		let s = e.mul(t, o);
		s = e.pow(s, c), s = e.mul(s, a), a = e.mul(s, n), o = e.mul(s, t);
		let p = e.mul(o, a);
		s = e.pow(p, u);
		let m = e.eql(s, e.ONE);
		a = e.mul(o, f), s = e.mul(p, r), o = e.cmov(a, o, m), p = e.cmov(s, p, m);
		for (let t = i; t > J; t--) {
			let n = t - Y;
			n = Y << n - J;
			let i = e.pow(p, n), s = e.eql(i, e.ONE);
			a = e.mul(o, r), r = e.mul(r, r), i = e.mul(p, r), o = e.cmov(a, o, s), p = e.cmov(i, p, s);
		}
		return {
			isValid: m,
			value: o
		};
	};
	if (e.ORDER % Qe === X) {
		let n = (e.ORDER - X) / Qe, r = e.sqrt(e.neg(t));
		p = (t, i) => {
			let a = e.sqr(i), o = e.mul(t, i);
			a = e.mul(a, o);
			let s = e.pow(a, n);
			s = e.mul(s, o);
			let c = e.mul(s, r), l = e.mul(e.sqr(s), i), u = e.eql(l, t);
			return {
				isValid: u,
				value: e.cmov(c, s, u)
			};
		};
	}
	return p;
}
function rt(e, t) {
	if (Ee(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)) throw Error("mapToCurveSimpleSWU: invalid opts");
	let n = nt(e, t.Z);
	if (!e.isOdd) throw Error("Fp.isOdd is not implemented!");
	return (r) => {
		let i, a, o, s, c, l, u, d;
		i = e.sqr(r), i = e.mul(i, t.Z), a = e.sqr(i), a = e.add(a, i), o = e.add(a, e.ONE), o = e.mul(o, t.B), s = e.cmov(t.Z, e.neg(a), !e.eql(a, e.ZERO)), s = e.mul(s, t.A), a = e.sqr(o), l = e.sqr(s), c = e.mul(l, t.A), a = e.add(a, c), a = e.mul(a, o), l = e.mul(l, s), c = e.mul(l, t.B), a = e.add(a, c), u = e.mul(i, o);
		let { isValid: f, value: p } = n(a, l);
		d = e.mul(i, r), d = e.mul(d, p), u = e.cmov(u, o, f), d = e.cmov(d, p, f);
		let m = e.isOdd(r) === e.isOdd(d);
		d = e.cmov(e.neg(d), d, m);
		let h = Oe(e, [s], !0)[0];
		return u = e.mul(u, h), {
			x: u,
			y: d
		};
	};
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/_shortw_utils.js
function it(e) {
	return {
		hash: e,
		hmac: (n, ...r) => T(e, n, t(...r)),
		randomBytes: n
	};
}
function at(e, t) {
	let n = (t) => tt({
		...e,
		...it(t)
	});
	return {
		...n(t),
		create: n
	};
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/abstract/hash-to-curve.js
var ot = F;
function Z(e, t) {
	if (Q(e), Q(t), e < 0 || e >= 1 << 8 * t) throw Error("invalid I2OSP input: " + e);
	let n = Array.from({ length: t }).fill(0);
	for (let r = t - 1; r >= 0; r--) n[r] = e & 255, e >>>= 8;
	return new Uint8Array(n);
}
function st(e, t) {
	let n = new Uint8Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = e[r] ^ t[r];
	return n;
}
function Q(e) {
	if (!Number.isSafeInteger(e)) throw Error("number expected");
}
function ct(e, t, n, r) {
	k(e), k(t), Q(n), t.length > 255 && (t = r(R(oe("H2C-OVERSIZE-DST-"), t)));
	let { outputLen: i, blockLen: a } = r, o = Math.ceil(n / i);
	if (n > 65535 || o > 255) throw Error("expand_message_xmd: invalid lenInBytes");
	let s = R(t, Z(t.length, 1)), c = Z(0, a), l = Z(n, 2), u = Array(o), d = r(R(c, e, l, Z(0, 1), s));
	u[0] = r(R(d, Z(1, 1), s));
	for (let e = 1; e <= o; e++) u[e] = r(R(st(d, u[e - 1]), Z(e + 1, 1), s));
	return R(...u).slice(0, n);
}
function lt(e, t, n, r, i) {
	if (k(e), k(t), Q(n), t.length > 255) {
		let e = Math.ceil(2 * r / 8);
		t = i.create({ dkLen: e }).update(oe("H2C-OVERSIZE-DST-")).update(t).digest();
	}
	if (n > 65535 || t.length > 255) throw Error("expand_message_xof: invalid lenInBytes");
	return i.create({ dkLen: n }).update(e).update(Z(n, 2)).update(t).update(Z(t.length, 1)).digest();
}
function ut(e, t, n) {
	B(n, {
		DST: "stringOrUint8Array",
		p: "bigint",
		m: "isSafeInteger",
		k: "isSafeInteger",
		hash: "hash"
	});
	let { p: r, k: i, m: a, hash: o, expand: s, DST: c } = n;
	k(e), Q(t);
	let l = typeof c == "string" ? oe(c) : c, u = r.toString(2).length, d = Math.ceil((u + i) / 8), f = t * a * d, p;
	if (s === "xmd") p = ct(e, l, f, o);
	else if (s === "xof") p = lt(e, l, f, i, o);
	else if (s === "_internal_pass") p = e;
	else throw Error("expand must be \"xmd\" or \"xof\"");
	let m = Array(t);
	for (let e = 0; e < t; e++) {
		let t = Array(a);
		for (let n = 0; n < a; n++) {
			let i = d * (n + e * a);
			t[n] = W(ot(p.subarray(i, i + d)), r);
		}
		m[e] = t;
	}
	return m;
}
function dt(e, t) {
	let n = t.map((e) => Array.from(e).reverse());
	return (t, r) => {
		let [i, a, o, s] = n.map((n) => n.reduce((n, r) => e.add(e.mul(n, t), r))), [c, l] = Oe(e, [a, s], !0);
		return t = e.mul(i, c), r = e.mul(r, e.mul(o, l)), {
			x: t,
			y: r
		};
	};
}
function ft(e, t, n) {
	if (typeof t != "function") throw Error("mapToCurve() must be defined");
	function r(n) {
		return e.fromAffine(t(n));
	}
	function i(t) {
		let n = t.clearCofactor();
		return n.equals(e.ZERO) ? e.ZERO : (n.assertValidity(), n);
	}
	return {
		defaults: n,
		hashToCurve(e, t) {
			let a = ut(e, 2, {
				...n,
				DST: n.DST,
				...t
			}), o = r(a[0]), s = r(a[1]);
			return i(o.add(s));
		},
		encodeToCurve(e, t) {
			return i(r(ut(e, 1, {
				...n,
				DST: n.encodeDST,
				...t
			})[0]));
		},
		mapToCurve(e) {
			if (!Array.isArray(e)) throw Error("expected array of bigints");
			for (let t of e) if (typeof t != "bigint") throw Error("expected array of bigints");
			return i(r(e));
		}
	};
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/secp256k1.js
var pt = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), mt = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), ht = BigInt(0), gt = BigInt(1), _t = BigInt(2), vt = (e, t) => (e + t / _t) / t;
function yt(e) {
	let t = pt, n = BigInt(3), r = BigInt(6), i = BigInt(11), a = BigInt(22), o = BigInt(23), s = BigInt(44), c = BigInt(88), l = e * e * e % t, u = l * l * e % t, d = G(G(G(u, n, t) * u % t, n, t) * u % t, _t, t) * l % t, f = G(d, i, t) * d % t, p = G(f, a, t) * f % t, m = G(p, s, t) * p % t, h = G(G(G(G(G(G(m, c, t) * m % t, s, t) * p % t, n, t) * u % t, o, t) * f % t, r, t) * l % t, _t, t);
	if (!$.eql($.sqr(h), e)) throw Error("Cannot find square root");
	return h;
}
var $ = je(pt, void 0, void 0, { sqrt: yt }), bt = at({
	a: ht,
	b: BigInt(7),
	Fp: $,
	n: mt,
	Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
	Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
	h: BigInt(1),
	lowS: !0,
	endo: {
		beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
		splitScalar: (e) => {
			let t = mt, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -gt * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), a = n, o = BigInt("0x100000000000000000000000000000000"), s = vt(a * e, t), c = vt(-r * e, t), l = W(e - s * n - c * i, t), u = W(-s * r - c * a, t), d = l > o, f = u > o;
			if (d && (l = t - l), f && (u = t - u), l > o || u > o) throw Error("splitScalar: Endomorphism failed, k=" + e);
			return {
				k1neg: d,
				k1: l,
				k2neg: f,
				k2: u
			};
		}
	}
}, C);
bt.ProjectivePoint, bt.utils.randomPrivateKey;
var xt = dt($, [
	[
		"0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
		"0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
		"0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
		"0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
	],
	[
		"0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
		"0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
		"0x0000000000000000000000000000000000000000000000000000000000000001"
	],
	[
		"0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
		"0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
		"0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
		"0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
	],
	[
		"0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
		"0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
		"0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
		"0x0000000000000000000000000000000000000000000000000000000000000001"
	]
].map((e) => e.map((e) => BigInt(e)))), St = rt($, {
	A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
	B: BigInt("1771"),
	Z: $.create(BigInt("-11"))
}), Ct = ft(bt.ProjectivePoint, (e) => {
	let { x: t, y: n } = St($.create(e[0]));
	return xt(t, n);
}, {
	DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
	encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
	p: $.ORDER,
	m: 1,
	k: 128,
	expand: "xmd",
	hash: C
});
Ct.hashToCurve, Ct.encodeToCurve;
//#endregion
export { bt as secp256k1 };
