import { _ as e, f as t } from "./exports-D_wXhA01.js";
//#region node_modules/@walletconnect/safe-json/dist/esm/index.js
var n = (e) => JSON.stringify(e, (e, t) => typeof t == "bigint" ? t.toString() + "n" : t), r = (e) => {
	let t = e.replace(/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, "$1\"$2n\"$3");
	return JSON.parse(t, (e, t) => typeof t == "string" && t.match(/^\d+n$/) ? BigInt(t.substring(0, t.length - 1)) : t);
};
function i(e) {
	if (typeof e != "string") throw Error(`Cannot safe json parse value of type ${typeof e}`);
	try {
		return r(e);
	} catch {
		return e;
	}
}
function a(e) {
	return typeof e == "string" ? e : n(e) || "";
}
//#endregion
//#region node_modules/quick-format-unescaped/index.js
var o = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		try {
			return JSON.stringify(e);
		} catch {
			return "\"[Circular]\"";
		}
	}
	t.exports = r;
	function r(e, t, r) {
		var i = r && r.stringify || n, a = 1;
		if (typeof e == "object" && e) {
			var o = t.length + a;
			if (o === 1) return e;
			var s = Array(o);
			s[0] = i(e);
			for (var c = 1; c < o; c++) s[c] = i(t[c]);
			return s.join(" ");
		}
		if (typeof e != "string") return e;
		var l = t.length;
		if (l === 0) return e;
		for (var u = "", d = 1 - a, f = -1, p = e && e.length || 0, m = 0; m < p;) {
			if (e.charCodeAt(m) === 37 && m + 1 < p) {
				switch (f = f > -1 ? f : 0, e.charCodeAt(m + 1)) {
					case 100:
					case 102:
						if (d >= l || t[d] == null) break;
						f < m && (u += e.slice(f, m)), u += Number(t[d]), f = m + 2, m++;
						break;
					case 105:
						if (d >= l || t[d] == null) break;
						f < m && (u += e.slice(f, m)), u += Math.floor(Number(t[d])), f = m + 2, m++;
						break;
					case 79:
					case 111:
					case 106:
						if (d >= l || t[d] === void 0) break;
						f < m && (u += e.slice(f, m));
						var h = typeof t[d];
						if (h === "string") {
							u += "'" + t[d] + "'", f = m + 2, m++;
							break;
						}
						if (h === "function") {
							u += t[d].name || "<anonymous>", f = m + 2, m++;
							break;
						}
						u += i(t[d]), f = m + 2, m++;
						break;
					case 115:
						if (d >= l) break;
						f < m && (u += e.slice(f, m)), u += String(t[d]), f = m + 2, m++;
						break;
					case 37:
						f < m && (u += e.slice(f, m)), u += "%", f = m + 2, m++, d--;
						break;
				}
				++d;
			}
			++m;
		}
		return f === -1 ? e : (f < p && (u += e.slice(f)), u);
	}
})), s = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = o();
	t.exports = s;
	var r = w().console || {}, i = {
		mapHttpRequest: _,
		mapHttpResponse: _,
		wrapRequestSerializer: v,
		wrapResponseSerializer: v,
		wrapErrorSerializer: v,
		req: _,
		res: _,
		err: h
	};
	function a(e, t) {
		return Array.isArray(e) ? e.filter(function(e) {
			return e !== "!stdSerializers.err";
		}) : e === !0 ? Object.keys(t) : !1;
	}
	function s(e) {
		e = e || {}, e.browser = e.browser || {};
		let t = e.browser.transmit;
		if (t && typeof t.send != "function") throw Error("pino: transmit option must have a send function");
		let n = e.browser.write || r;
		e.browser.write && (e.browser.asObject = !0);
		let i = e.serializers || {}, o = a(e.browser.serialize, i), l = e.browser.serialize;
		Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (l = !1);
		let u = [
			"error",
			"fatal",
			"warn",
			"info",
			"debug",
			"trace"
		];
		typeof n == "function" && (n.error = n.fatal = n.warn = n.info = n.debug = n.trace = n), e.enabled === !1 && (e.level = "silent");
		let p = e.level || "info", h = Object.create(n);
		h.log || (h.log = y), Object.defineProperty(h, "levelVal", { get: v }), Object.defineProperty(h, "level", {
			get: b,
			set: x
		});
		let _ = {
			transmit: t,
			serialize: o,
			asObject: e.browser.asObject,
			levels: u,
			timestamp: g(e)
		};
		h.levels = s.levels, h.level = p, h.setMaxListeners = h.getMaxListeners = h.emit = h.addListener = h.on = h.prependListener = h.once = h.prependOnceListener = h.removeListener = h.removeAllListeners = h.listeners = h.listenerCount = h.eventNames = h.write = h.flush = y, h.serializers = i, h._serialize = o, h._stdErrSerialize = l, h.child = S, t && (h._logEvent = m());
		function v() {
			return this.level === "silent" ? Infinity : this.levels.values[this.level];
		}
		function b() {
			return this._level;
		}
		function x(e) {
			if (e !== "silent" && !this.levels.values[e]) throw Error("unknown level " + e);
			this._level = e, c(_, h, "error", "log"), c(_, h, "fatal", "error"), c(_, h, "warn", "error"), c(_, h, "info", "log"), c(_, h, "debug", "log"), c(_, h, "trace", "log");
		}
		function S(n, r) {
			if (!n) throw Error("missing bindings for child Pino");
			r = r || {}, o && n.serializers && (r.serializers = n.serializers);
			let a = r.serializers;
			if (o && a) {
				var s = Object.assign({}, i, a), c = e.browser.serialize === !0 ? Object.keys(s) : o;
				delete n.serializers, d([n], c, s, this._stdErrSerialize);
			}
			function l(e) {
				this._childLevel = (e._childLevel | 0) + 1, this.error = f(e, n, "error"), this.fatal = f(e, n, "fatal"), this.warn = f(e, n, "warn"), this.info = f(e, n, "info"), this.debug = f(e, n, "debug"), this.trace = f(e, n, "trace"), s && (this.serializers = s, this._serialize = c), t && (this._logEvent = m([].concat(e._logEvent.bindings, n)));
			}
			return l.prototype = this, new l(this);
		}
		return h;
	}
	s.levels = {
		values: {
			fatal: 60,
			error: 50,
			warn: 40,
			info: 30,
			debug: 20,
			trace: 10
		},
		labels: {
			10: "trace",
			20: "debug",
			30: "info",
			40: "warn",
			50: "error",
			60: "fatal"
		}
	}, s.stdSerializers = i, s.stdTimeFunctions = Object.assign({}, {
		nullTime: b,
		epochTime: x,
		unixTime: S,
		isoTime: C
	});
	function c(e, t, n, i) {
		let a = Object.getPrototypeOf(t);
		t[n] = t.levelVal > t.levels.values[n] ? y : a[n] ? a[n] : r[n] || r[i] || y, l(e, t, n);
	}
	function l(e, t, n) {
		!e.transmit && t[n] === y || (t[n] = (function(i) {
			return function() {
				let a = e.timestamp(), o = Array(arguments.length), c = Object.getPrototypeOf && Object.getPrototypeOf(this) === r ? r : this;
				for (var l = 0; l < o.length; l++) o[l] = arguments[l];
				if (e.serialize && !e.asObject && d(o, this._serialize, this.serializers, this._stdErrSerialize), e.asObject ? i.call(c, u(this, n, o, a)) : i.apply(c, o), e.transmit) {
					let r = e.transmit.level || t.level, i = s.levels.values[r], c = s.levels.values[n];
					if (c < i) return;
					p(this, {
						ts: a,
						methodLevel: n,
						methodValue: c,
						transmitLevel: r,
						transmitValue: s.levels.values[e.transmit.level || t.level],
						send: e.transmit.send,
						val: t.levelVal
					}, o);
				}
			};
		})(t[n]));
	}
	function u(e, t, r, i) {
		e._serialize && d(r, e._serialize, e.serializers, e._stdErrSerialize);
		let a = r.slice(), o = a[0], c = {};
		i && (c.time = i), c.level = s.levels.values[t];
		let l = (e._childLevel | 0) + 1;
		if (l < 1 && (l = 1), typeof o == "object" && o) {
			for (; l-- && typeof a[0] == "object";) Object.assign(c, a.shift());
			o = a.length ? n(a.shift(), a) : void 0;
		} else typeof o == "string" && (o = n(a.shift(), a));
		return o !== void 0 && (c.msg = o), c;
	}
	function d(e, t, n, r) {
		for (let i in e) if (r && e[i] instanceof Error) e[i] = s.stdSerializers.err(e[i]);
		else if (typeof e[i] == "object" && !Array.isArray(e[i])) for (let r in e[i]) t && t.indexOf(r) > -1 && r in n && (e[i][r] = n[r](e[i][r]));
	}
	function f(e, t, n) {
		return function() {
			let r = Array(1 + arguments.length);
			r[0] = t;
			for (var i = 1; i < r.length; i++) r[i] = arguments[i - 1];
			return e[n].apply(this, r);
		};
	}
	function p(e, t, n) {
		let r = t.send, i = t.ts, a = t.methodLevel, o = t.methodValue, s = t.val, c = e._logEvent.bindings;
		d(n, e._serialize || Object.keys(e.serializers), e.serializers, e._stdErrSerialize === void 0 ? !0 : e._stdErrSerialize), e._logEvent.ts = i, e._logEvent.messages = n.filter(function(e) {
			return c.indexOf(e) === -1;
		}), e._logEvent.level.label = a, e._logEvent.level.value = o, r(a, e._logEvent, s), e._logEvent = m(c);
	}
	function m(e) {
		return {
			ts: 0,
			messages: [],
			bindings: e || [],
			level: {
				label: "",
				value: 0
			}
		};
	}
	function h(e) {
		let t = {
			type: e.constructor.name,
			msg: e.message,
			stack: e.stack
		};
		for (let n in e) t[n] === void 0 && (t[n] = e[n]);
		return t;
	}
	function g(e) {
		return typeof e.timestamp == "function" ? e.timestamp : e.timestamp === !1 ? b : x;
	}
	function _() {
		return {};
	}
	function v(e) {
		return e;
	}
	function y() {}
	function b() {
		return !1;
	}
	function x() {
		return Date.now();
	}
	function S() {
		return Math.round(Date.now() / 1e3);
	}
	function C() {
		return new Date(Date.now()).toISOString();
	}
	/* istanbul ignore next */
	function w() {
		function e(e) {
			return e !== void 0 && e;
		}
		try {
			return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
				get: function() {
					return delete Object.prototype.globalThis, this.globalThis = this;
				},
				configurable: !0
			}), globalThis;
		} catch {
			return e(self) || e(window) || e(this) || {};
		}
	}
})))()), c = { level: "info" }, l = "custom_context", u = 1e3 * 1024, d = class {
	constructor(e) {
		this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
	}
	get value() {
		return this.nodeValue;
	}
	get size() {
		return this.sizeInBytes;
	}
}, f = class {
	constructor(e) {
		this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
	}
	append(e) {
		let t = new d(e);
		if (t.size > this.maxSizeInBytes) throw Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);
		for (; this.size + t.size > this.maxSizeInBytes;) this.shift();
		this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
	}
	shift() {
		if (!this.head) return;
		let e = this.head;
		this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
	}
	toArray() {
		let e = [], t = this.head;
		for (; t !== null;) e.push(t.value), t = t.next;
		return e;
	}
	get length() {
		return this.lengthInNodes;
	}
	get size() {
		return this.sizeInBytes;
	}
	toOrderedArray() {
		return Array.from(this);
	}
	[Symbol.iterator]() {
		let e = this.head;
		return { next: () => {
			if (!e) return {
				done: !0,
				value: null
			};
			let t = e.value;
			return e = e.next, {
				done: !1,
				value: t
			};
		} };
	}
}, p = class {
	constructor(e, t = u) {
		this.level = e ?? "error", this.levelValue = s.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new f(this.MAX_LOG_SIZE_IN_BYTES);
	}
	forwardToConsole(e, t) {
		t === s.levels.values.error ? console.error(e) : t === s.levels.values.warn ? console.warn(e) : t === s.levels.values.debug ? console.debug(e) : t === s.levels.values.trace ? console.trace(e) : console.log(e);
	}
	appendToLogs(e) {
		this.logs.append(a({
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			log: e
		}));
		let t = typeof e == "string" ? JSON.parse(e).level : e.level;
		t >= this.levelValue && this.forwardToConsole(e, t);
	}
	getLogs() {
		return this.logs;
	}
	clearLogs() {
		this.logs = new f(this.MAX_LOG_SIZE_IN_BYTES);
	}
	getLogArray() {
		return Array.from(this.logs);
	}
	logsToBlob(e) {
		let t = this.getLogArray();
		return t.push(a({ extraMetadata: e })), new Blob(t, { type: "application/json" });
	}
}, m = class {
	constructor(e, t = u) {
		this.baseChunkLogger = new p(e, t);
	}
	write(e) {
		this.baseChunkLogger.appendToLogs(e);
	}
	getLogs() {
		return this.baseChunkLogger.getLogs();
	}
	clearLogs() {
		this.baseChunkLogger.clearLogs();
	}
	getLogArray() {
		return this.baseChunkLogger.getLogArray();
	}
	logsToBlob(e) {
		return this.baseChunkLogger.logsToBlob(e);
	}
	downloadLogsBlobInBrowser(e) {
		let t = URL.createObjectURL(this.logsToBlob(e)), n = document.createElement("a");
		n.href = t, n.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(t);
	}
}, h = class {
	constructor(e, t = u) {
		this.baseChunkLogger = new p(e, t);
	}
	write(e) {
		this.baseChunkLogger.appendToLogs(e);
	}
	getLogs() {
		return this.baseChunkLogger.getLogs();
	}
	clearLogs() {
		this.baseChunkLogger.clearLogs();
	}
	getLogArray() {
		return this.baseChunkLogger.getLogArray();
	}
	logsToBlob(e) {
		return this.baseChunkLogger.logsToBlob(e);
	}
}, g = Object.defineProperty, _ = Object.defineProperties, v = Object.getOwnPropertyDescriptors, y = Object.getOwnPropertySymbols, b = Object.prototype.hasOwnProperty, x = Object.prototype.propertyIsEnumerable, S = (e, t, n) => t in e ? g(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, C = (e, t) => {
	for (var n in t || (t = {})) b.call(t, n) && S(e, n, t[n]);
	if (y) for (var n of y(t)) x.call(t, n) && S(e, n, t[n]);
	return e;
}, w = (e, t) => _(e, v(t));
function T(e) {
	return w(C({}, e), { level: e?.level || c.level });
}
function E(e, t = l) {
	return e[t] || "";
}
function D(e, t, n = l) {
	return e[n] = t, e;
}
function O(e, t = l) {
	let n = "";
	return n = typeof e.bindings > "u" ? E(e, t) : e.bindings().context || "", n;
}
function k(e, t, n = l) {
	let r = O(e, n);
	return r.trim() ? `${r}/${t}` : t;
}
function A(e, t, n = l) {
	let r = k(e, t, n);
	return D(e.child({ context: r }), r, n);
}
function j(e) {
	let t = new m(e.opts?.level, e.maxSizeInBytes);
	return {
		logger: (0, s.default)(w(C({}, e.opts), {
			level: "trace",
			browser: w(C({}, e.opts?.browser), { write: (e) => t.write(e) })
		})),
		chunkLoggerController: t
	};
}
function M(e) {
	let t = new h(e.opts?.level, e.maxSizeInBytes);
	return {
		logger: (0, s.default)(w(C({}, e.opts), { level: "trace" }), t),
		chunkLoggerController: t
	};
}
function N(e) {
	return typeof e.loggerOverride < "u" && typeof e.loggerOverride != "string" ? {
		logger: e.loggerOverride,
		chunkLoggerController: null
	} : typeof window < "u" ? j(e) : M(e);
}
//#endregion
export { O as a, T as i, A as n, i as o, s as r, a as s, N as t };
