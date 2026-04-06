import { _ as e, f as t, g as n, h as r, m as i, p as a } from "./exports-D_wXhA01.js";
import { A as o, K as s, M as c, N as l, S as u, _ as d, b as f, d as p, h as m, p as h, r as g, s as _, t as v, v as y } from "./ModalController-DHlkqy_7.js";
import { a as b, i as x, n as S, o as C, r as w, s as T, t as E } from "./index.es-CQBj5vab.js";
import { _ as D, a as O, b as k, d as A, g as j, h as M, l as N, m as P, n as F, o as ee, r as te, s as I, t as ne, v as re, x as ie, y as ae } from "./utils-DpxvPXEZ.js";
//#region node_modules/events/events.js
var oe = /* @__PURE__ */ t(((e, t) => {
	var n = typeof Reflect == "object" ? Reflect : null, r = n && typeof n.apply == "function" ? n.apply : function(e, t, n) {
		return Function.prototype.apply.call(e, t, n);
	}, i = n && typeof n.ownKeys == "function" ? n.ownKeys : Object.getOwnPropertySymbols ? function(e) {
		return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
	} : function(e) {
		return Object.getOwnPropertyNames(e);
	};
	function a(e) {
		console && console.warn && console.warn(e);
	}
	var o = Number.isNaN || function(e) {
		return e !== e;
	};
	function s() {
		s.init.call(this);
	}
	t.exports = s, t.exports.once = y, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
	var c = 10;
	function l(e) {
		if (typeof e != "function") throw TypeError("The \"listener\" argument must be of type Function. Received type " + typeof e);
	}
	Object.defineProperty(s, "defaultMaxListeners", {
		enumerable: !0,
		get: function() {
			return c;
		},
		set: function(e) {
			if (typeof e != "number" || e < 0 || o(e)) throw RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + e + ".");
			c = e;
		}
	}), s.init = function() {
		(this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
	}, s.prototype.setMaxListeners = function(e) {
		if (typeof e != "number" || e < 0 || o(e)) throw RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + e + ".");
		return this._maxListeners = e, this;
	};
	function u(e) {
		return e._maxListeners === void 0 ? s.defaultMaxListeners : e._maxListeners;
	}
	s.prototype.getMaxListeners = function() {
		return u(this);
	}, s.prototype.emit = function(e) {
		for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
		var i = e === "error", a = this._events;
		if (a !== void 0) i = i && a.error === void 0;
		else if (!i) return !1;
		if (i) {
			var o;
			if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
			var s = /* @__PURE__ */ Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
			throw s.context = o, s;
		}
		var c = a[e];
		if (c === void 0) return !1;
		if (typeof c == "function") r(c, this, t);
		else for (var l = c.length, u = g(c, l), n = 0; n < l; ++n) r(u[n], this, t);
		return !0;
	};
	function d(e, t, n, r) {
		var i, o, s;
		if (l(n), o = e._events, o === void 0 ? (o = e._events = Object.create(null), e._eventsCount = 0) : (o.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), s = o[t]), s === void 0) s = o[t] = n, ++e._eventsCount;
		else if (typeof s == "function" ? s = o[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), i = u(e), i > 0 && s.length > i && !s.warned) {
			s.warned = !0;
			var c = /* @__PURE__ */ Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
			c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = s.length, a(c);
		}
		return e;
	}
	s.prototype.addListener = function(e, t) {
		return d(this, e, t, !1);
	}, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e, t) {
		return d(this, e, t, !0);
	};
	function f() {
		if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
	}
	function p(e, t, n) {
		var r = {
			fired: !1,
			wrapFn: void 0,
			target: e,
			type: t,
			listener: n
		}, i = f.bind(r);
		return i.listener = n, r.wrapFn = i, i;
	}
	s.prototype.once = function(e, t) {
		return l(t), this.on(e, p(this, e, t)), this;
	}, s.prototype.prependOnceListener = function(e, t) {
		return l(t), this.prependListener(e, p(this, e, t)), this;
	}, s.prototype.removeListener = function(e, t) {
		var n, r, i, a, o;
		if (l(t), r = this._events, r === void 0 || (n = r[e], n === void 0)) return this;
		if (n === t || n.listener === t) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
		else if (typeof n != "function") {
			for (i = -1, a = n.length - 1; a >= 0; a--) if (n[a] === t || n[a].listener === t) {
				o = n[a].listener, i = a;
				break;
			}
			if (i < 0) return this;
			i === 0 ? n.shift() : _(n, i), n.length === 1 && (r[e] = n[0]), r.removeListener !== void 0 && this.emit("removeListener", e, o || t);
		}
		return this;
	}, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(e) {
		var t, n = this._events, r;
		if (n === void 0) return this;
		if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete n[e]), this;
		if (arguments.length === 0) {
			var i = Object.keys(n), a;
			for (r = 0; r < i.length; ++r) a = i[r], a !== "removeListener" && this.removeAllListeners(a);
			return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
		}
		if (t = n[e], typeof t == "function") this.removeListener(e, t);
		else if (t !== void 0) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
		return this;
	};
	function m(e, t, n) {
		var r = e._events;
		if (r === void 0) return [];
		var i = r[t];
		return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? v(i) : g(i, i.length);
	}
	s.prototype.listeners = function(e) {
		return m(this, e, !0);
	}, s.prototype.rawListeners = function(e) {
		return m(this, e, !1);
	}, s.listenerCount = function(e, t) {
		return typeof e.listenerCount == "function" ? e.listenerCount(t) : h.call(e, t);
	}, s.prototype.listenerCount = h;
	function h(e) {
		var t = this._events;
		if (t !== void 0) {
			var n = t[e];
			if (typeof n == "function") return 1;
			if (n !== void 0) return n.length;
		}
		return 0;
	}
	s.prototype.eventNames = function() {
		return this._eventsCount > 0 ? i(this._events) : [];
	};
	function g(e, t) {
		for (var n = Array(t), r = 0; r < t; ++r) n[r] = e[r];
		return n;
	}
	function _(e, t) {
		for (; t + 1 < e.length; t++) e[t] = e[t + 1];
		e.pop();
	}
	function v(e) {
		for (var t = Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
		return t;
	}
	function y(e, t) {
		return new Promise(function(n, r) {
			function i(n) {
				e.removeListener(t, a), r(n);
			}
			function a() {
				typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
			}
			x(e, t, a, { once: !0 }), t !== "error" && b(e, i, { once: !0 });
		});
	}
	function b(e, t, n) {
		typeof e.on == "function" && x(e, "error", t, n);
	}
	function x(e, t, n, r) {
		if (typeof e.on == "function") r.once ? e.once(t, n) : e.on(t, n);
		else if (typeof e.addEventListener == "function") e.addEventListener(t, function i(a) {
			r.once && e.removeEventListener(t, i), n(a);
		});
		else throw TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof e);
	}
})), se = /* @__PURE__ */ i({
	__assign: () => je,
	__asyncDelegator: () => Ce,
	__asyncGenerator: () => Se,
	__asyncValues: () => we,
	__await: () => xe,
	__awaiter: () => pe,
	__classPrivateFieldGet: () => Oe,
	__classPrivateFieldSet: () => ke,
	__createBinding: () => he,
	__decorate: () => ue,
	__exportStar: () => ge,
	__extends: () => ce,
	__generator: () => me,
	__importDefault: () => De,
	__importStar: () => Ee,
	__makeTemplateObject: () => Te,
	__metadata: () => fe,
	__param: () => de,
	__read: () => ve,
	__rest: () => le,
	__spread: () => ye,
	__spreadArrays: () => be,
	__values: () => _e
});
function ce(e, t) {
	Ae(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function le(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function ue(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function de(e, t) {
	return function(n, r) {
		t(n, r, e);
	};
}
function fe(e, t) {
	if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e, t);
}
function pe(e, t, n, r) {
	function i(e) {
		return e instanceof n ? e : new n(function(t) {
			t(e);
		});
	}
	return new (n || (n = Promise))(function(n, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			e.done ? n(e.value) : i(e.value).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
function me(e, t) {
	var n = {
		label: 0,
		sent: function() {
			if (a[0] & 1) throw a[1];
			return a[1];
		},
		trys: [],
		ops: []
	}, r, i, a, o;
	return o = {
		next: s(0),
		throw: s(1),
		return: s(2)
	}, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
		return this;
	}), o;
	function s(e) {
		return function(t) {
			return c([e, t]);
		};
	}
	function c(o) {
		if (r) throw TypeError("Generator is already executing.");
		for (; n;) try {
			if (r = 1, i && (a = o[0] & 2 ? i.return : o[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, o[1])).done) return a;
			switch (i = 0, a && (o = [o[0] & 2, a.value]), o[0]) {
				case 0:
				case 1:
					a = o;
					break;
				case 4: return n.label++, {
					value: o[1],
					done: !1
				};
				case 5:
					n.label++, i = o[1], o = [0];
					continue;
				case 7:
					o = n.ops.pop(), n.trys.pop();
					continue;
				default:
					if ((a = n.trys, !(a = a.length > 0 && a[a.length - 1])) && (o[0] === 6 || o[0] === 2)) {
						n = 0;
						continue;
					}
					if (o[0] === 3 && (!a || o[1] > a[0] && o[1] < a[3])) {
						n.label = o[1];
						break;
					}
					if (o[0] === 6 && n.label < a[1]) {
						n.label = a[1], a = o;
						break;
					}
					if (a && n.label < a[2]) {
						n.label = a[2], n.ops.push(o);
						break;
					}
					a[2] && n.ops.pop(), n.trys.pop();
					continue;
			}
			o = t.call(e, n);
		} catch (e) {
			o = [6, e], i = 0;
		} finally {
			r = a = 0;
		}
		if (o[0] & 5) throw o[1];
		return {
			value: o[0] ? o[1] : void 0,
			done: !0
		};
	}
}
function he(e, t, n, r) {
	r === void 0 && (r = n), e[r] = t[n];
}
function ge(e, t) {
	for (var n in e) n !== "default" && !t.hasOwnProperty(n) && (t[n] = e[n]);
}
function _e(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ve(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function ye() {
	for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(ve(arguments[t]));
	return e;
}
function be() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}
function xe(e) {
	return this instanceof xe ? (this.v = e, this) : new xe(e);
}
function Se(e, t, n) {
	if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
	var r = n.apply(e, t || []), i, a = [];
	return i = {}, o("next"), o("throw"), o("return"), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function o(e) {
		r[e] && (i[e] = function(t) {
			return new Promise(function(n, r) {
				a.push([
					e,
					t,
					n,
					r
				]) > 1 || s(e, t);
			});
		});
	}
	function s(e, t) {
		try {
			c(r[e](t));
		} catch (e) {
			d(a[0][3], e);
		}
	}
	function c(e) {
		e.value instanceof xe ? Promise.resolve(e.value.v).then(l, u) : d(a[0][2], e);
	}
	function l(e) {
		s("next", e);
	}
	function u(e) {
		s("throw", e);
	}
	function d(e, t) {
		e(t), a.shift(), a.length && s(a[0][0], a[0][1]);
	}
}
function Ce(e) {
	var t, n;
	return t = {}, r("next"), r("throw", function(e) {
		throw e;
	}), r("return"), t[Symbol.iterator] = function() {
		return this;
	}, t;
	function r(r, i) {
		t[r] = e[r] ? function(t) {
			return (n = !n) ? {
				value: xe(e[r](t)),
				done: r === "return"
			} : i ? i(t) : t;
		} : i;
	}
}
function we(e) {
	if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
	var t = e[Symbol.asyncIterator], n;
	return t ? t.call(e) : (e = typeof _e == "function" ? _e(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
		return this;
	}, n);
	function r(t) {
		n[t] = e[t] && function(n) {
			return new Promise(function(r, a) {
				n = e[t](n), i(r, a, n.done, n.value);
			});
		};
	}
	function i(e, t, n, r) {
		Promise.resolve(r).then(function(t) {
			e({
				value: t,
				done: n
			});
		}, t);
	}
}
function Te(e, t) {
	return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
}
function Ee(e) {
	if (e && e.__esModule) return e;
	var t = {};
	if (e != null) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	return t.default = e, t;
}
function De(e) {
	return e && e.__esModule ? e : { default: e };
}
function Oe(e, t) {
	if (!t.has(e)) throw TypeError("attempted to get private field on non-instance");
	return t.get(e);
}
function ke(e, t, n) {
	if (!t.has(e)) throw TypeError("attempted to set private field on non-instance");
	return t.set(e, n), n;
}
var Ae, je, Me = a((() => {
	Ae = function(e, t) {
		return Ae = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
		}, Ae(e, t);
	}, je = function() {
		return je = Object.assign || function(e) {
			for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
			return e;
		}, je.apply(this, arguments);
	};
})), Ne = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.delay = void 0;
	function t(e) {
		return new Promise((t) => {
			setTimeout(() => {
				t(!0);
			}, e);
		});
	}
	e.delay = t;
})), Pe = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ONE_THOUSAND = e.ONE_HUNDRED = void 0, e.ONE_HUNDRED = 100, e.ONE_THOUSAND = 1e3;
})), Fe = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ONE_YEAR = e.FOUR_WEEKS = e.THREE_WEEKS = e.TWO_WEEKS = e.ONE_WEEK = e.THIRTY_DAYS = e.SEVEN_DAYS = e.FIVE_DAYS = e.THREE_DAYS = e.ONE_DAY = e.TWENTY_FOUR_HOURS = e.TWELVE_HOURS = e.SIX_HOURS = e.THREE_HOURS = e.ONE_HOUR = e.SIXTY_MINUTES = e.THIRTY_MINUTES = e.TEN_MINUTES = e.FIVE_MINUTES = e.ONE_MINUTE = e.SIXTY_SECONDS = e.THIRTY_SECONDS = e.TEN_SECONDS = e.FIVE_SECONDS = e.ONE_SECOND = void 0, e.ONE_SECOND = 1, e.FIVE_SECONDS = 5, e.TEN_SECONDS = 10, e.THIRTY_SECONDS = 30, e.SIXTY_SECONDS = 60, e.ONE_MINUTE = e.SIXTY_SECONDS, e.FIVE_MINUTES = e.ONE_MINUTE * 5, e.TEN_MINUTES = e.ONE_MINUTE * 10, e.THIRTY_MINUTES = e.ONE_MINUTE * 30, e.SIXTY_MINUTES = e.ONE_MINUTE * 60, e.ONE_HOUR = e.SIXTY_MINUTES, e.THREE_HOURS = e.ONE_HOUR * 3, e.SIX_HOURS = e.ONE_HOUR * 6, e.TWELVE_HOURS = e.ONE_HOUR * 12, e.TWENTY_FOUR_HOURS = e.ONE_HOUR * 24, e.ONE_DAY = e.TWENTY_FOUR_HOURS, e.THREE_DAYS = e.ONE_DAY * 3, e.FIVE_DAYS = e.ONE_DAY * 5, e.SEVEN_DAYS = e.ONE_DAY * 7, e.THIRTY_DAYS = e.ONE_DAY * 30, e.ONE_WEEK = e.SEVEN_DAYS, e.TWO_WEEKS = e.ONE_WEEK * 2, e.THREE_WEEKS = e.ONE_WEEK * 3, e.FOUR_WEEKS = e.ONE_WEEK * 4, e.ONE_YEAR = e.ONE_DAY * 365;
})), Ie = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = (Me(), n(se));
	t.__exportStar(Pe(), e), t.__exportStar(Fe(), e);
})), Le = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.fromMiliseconds = e.toMiliseconds = void 0;
	var t = Ie();
	function n(e) {
		return e * t.ONE_THOUSAND;
	}
	e.toMiliseconds = n;
	function r(e) {
		return Math.floor(e / t.ONE_THOUSAND);
	}
	e.fromMiliseconds = r;
})), Re = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = (Me(), n(se));
	t.__exportStar(Ne(), e), t.__exportStar(Le(), e);
})), ze = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Watch = void 0;
	var t = class {
		constructor() {
			this.timestamps = /* @__PURE__ */ new Map();
		}
		start(e) {
			if (this.timestamps.has(e)) throw Error(`Watch already started for label: ${e}`);
			this.timestamps.set(e, { started: Date.now() });
		}
		stop(e) {
			let t = this.get(e);
			if (t.elapsed !== void 0) throw Error(`Watch already stopped for label: ${e}`);
			let n = Date.now() - t.started;
			this.timestamps.set(e, {
				started: t.started,
				elapsed: n
			});
		}
		get(e) {
			let t = this.timestamps.get(e);
			if (t === void 0) throw Error(`No timestamp found for label: ${e}`);
			return t;
		}
		elapsed(e) {
			let t = this.get(e);
			return t.elapsed || Date.now() - t.started;
		}
	};
	e.Watch = t, e.default = t;
})), Be = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.IWatch = void 0, e.IWatch = class {};
})), Ve = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), (Me(), n(se)).__exportStar(Be(), e);
})), He = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = (Me(), n(se));
	t.__exportStar(Re(), e), t.__exportStar(ze(), e), t.__exportStar(Ve(), e), t.__exportStar(Ie(), e);
})), Ue = class {}, We = /* @__PURE__ */ e(oe()), L = He(), Ge = class extends Ue {
	constructor(e) {
		super();
	}
}, Ke = L.FIVE_SECONDS, qe = { pulse: "heartbeat_pulse" }, Je = class e extends Ge {
	constructor(e) {
		super(e), this.events = new We.EventEmitter(), this.interval = Ke, this.interval = e?.interval || Ke;
	}
	static async init(t) {
		let n = new e(t);
		return await n.init(), n;
	}
	async init() {
		await this.initialize();
	}
	stop() {
		clearInterval(this.intervalRef);
	}
	on(e, t) {
		this.events.on(e, t);
	}
	once(e, t) {
		this.events.once(e, t);
	}
	off(e, t) {
		this.events.off(e, t);
	}
	removeListener(e, t) {
		this.events.removeListener(e, t);
	}
	async initialize() {
		this.intervalRef = setInterval(() => this.pulse(), (0, L.toMiliseconds)(this.interval));
	}
	pulse() {
		this.events.emit(qe.pulse);
	}
}, Ye = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Xe = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Ze = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Qe(e, t) {
	if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
		$e(e);
		return;
	}
	return t;
}
function $e(e) {
	console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function et(e, t = {}) {
	if (typeof e != "string") return e;
	if (e[0] === "\"" && e[e.length - 1] === "\"" && e.indexOf("\\") === -1) return e.slice(1, -1);
	let n = e.trim();
	if (n.length <= 9) switch (n.toLowerCase()) {
		case "true": return !0;
		case "false": return !1;
		case "undefined": return;
		case "null": return null;
		case "nan": return NaN;
		case "infinity": return Infinity;
		case "-infinity": return -Infinity;
	}
	if (!Ze.test(e)) {
		if (t.strict) throw SyntaxError("[destr] Invalid JSON");
		return e;
	}
	try {
		if (Ye.test(e) || Xe.test(e)) {
			if (t.strict) throw Error("[destr] Possible prototype pollution");
			return JSON.parse(e, Qe);
		}
		return JSON.parse(e);
	} catch (n) {
		if (t.strict) throw n;
		return e;
	}
}
//#endregion
//#region node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs
function tt(e) {
	return !e || typeof e.then != "function" ? Promise.resolve(e) : e;
}
function nt(e, ...t) {
	try {
		return tt(e(...t));
	} catch (e) {
		return Promise.reject(e);
	}
}
function rt(e) {
	let t = typeof e;
	return e === null || t !== "object" && t !== "function";
}
function it(e) {
	let t = Object.getPrototypeOf(e);
	return !t || t.isPrototypeOf(Object);
}
function at(e) {
	if (rt(e)) return String(e);
	if (it(e) || Array.isArray(e)) return JSON.stringify(e);
	if (typeof e.toJSON == "function") return at(e.toJSON());
	throw Error("[unstorage] Cannot stringify value!");
}
var ot = "base64:";
function st(e) {
	return typeof e == "string" ? e : ot + ut(e);
}
function ct(e) {
	return typeof e != "string" || !e.startsWith(ot) ? e : lt(e.slice(7));
}
function lt(e) {
	return globalThis.Buffer ? Buffer.from(e, "base64") : Uint8Array.from(globalThis.atob(e), (e) => e.codePointAt(0));
}
function ut(e) {
	return globalThis.Buffer ? Buffer.from(e).toString("base64") : globalThis.btoa(String.fromCodePoint(...e));
}
function dt(e) {
	return e && e.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function ft(...e) {
	return dt(e.join(":"));
}
function pt(e) {
	return e = dt(e), e ? e + ":" : "";
}
function mt(e, t) {
	if (t === void 0) return !0;
	let n = 0, r = e.indexOf(":");
	for (; r > -1;) n++, r = e.indexOf(":", r + 1);
	return n <= t;
}
function ht(e, t) {
	return t ? e.startsWith(t) && e[e.length - 1] !== "$" : e[e.length - 1] !== "$";
}
//#endregion
//#region node_modules/unstorage/dist/index.mjs
function gt(e) {
	return e;
}
var _t = "memory", vt = gt(() => {
	let e = /* @__PURE__ */ new Map();
	return {
		name: _t,
		getInstance: () => e,
		hasItem(t) {
			return e.has(t);
		},
		getItem(t) {
			return e.get(t) ?? null;
		},
		getItemRaw(t) {
			return e.get(t) ?? null;
		},
		setItem(t, n) {
			e.set(t, n);
		},
		setItemRaw(t, n) {
			e.set(t, n);
		},
		removeItem(t) {
			e.delete(t);
		},
		getKeys() {
			return [...e.keys()];
		},
		clear() {
			e.clear();
		},
		dispose() {
			e.clear();
		}
	};
});
function yt(e = {}) {
	let t = {
		mounts: { "": e.driver || vt() },
		mountpoints: [""],
		watching: !1,
		watchListeners: [],
		unwatch: {}
	}, n = (e) => {
		for (let n of t.mountpoints) if (e.startsWith(n)) return {
			base: n,
			relativeKey: e.slice(n.length),
			driver: t.mounts[n]
		};
		return {
			base: "",
			relativeKey: e,
			driver: t.mounts[""]
		};
	}, r = (e, n) => t.mountpoints.filter((t) => t.startsWith(e) || n && e.startsWith(t)).map((n) => ({
		relativeBase: e.length > n.length ? e.slice(n.length) : void 0,
		mountpoint: n,
		driver: t.mounts[n]
	})), i = (e, n) => {
		if (t.watching) {
			n = dt(n);
			for (let r of t.watchListeners) r(e, n);
		}
	}, a = async () => {
		if (!t.watching) {
			t.watching = !0;
			for (let e in t.mounts) t.unwatch[e] = await bt(t.mounts[e], i, e);
		}
	}, o = async () => {
		if (t.watching) {
			for (let e in t.unwatch) await t.unwatch[e]();
			t.unwatch = {}, t.watching = !1;
		}
	}, s = (e, t, r) => {
		let i = /* @__PURE__ */ new Map(), a = (e) => {
			let t = i.get(e.base);
			return t || (t = {
				driver: e.driver,
				base: e.base,
				items: []
			}, i.set(e.base, t)), t;
		};
		for (let r of e) {
			let e = typeof r == "string", i = dt(e ? r : r.key), o = e ? void 0 : r.value, s = e || !r.options ? t : {
				...t,
				...r.options
			}, c = n(i);
			a(c).items.push({
				key: i,
				value: o,
				relativeKey: c.relativeKey,
				options: s
			});
		}
		return Promise.all([...i.values()].map((e) => r(e))).then((e) => e.flat());
	}, c = {
		hasItem(e, t = {}) {
			e = dt(e);
			let { relativeKey: r, driver: i } = n(e);
			return nt(i.hasItem, r, t);
		},
		getItem(e, t = {}) {
			e = dt(e);
			let { relativeKey: r, driver: i } = n(e);
			return nt(i.getItem, r, t).then((e) => et(e));
		},
		getItems(e, t = {}) {
			return s(e, t, (e) => e.driver.getItems ? nt(e.driver.getItems, e.items.map((e) => ({
				key: e.relativeKey,
				options: e.options
			})), t).then((t) => t.map((t) => ({
				key: ft(e.base, t.key),
				value: et(t.value)
			}))) : Promise.all(e.items.map((t) => nt(e.driver.getItem, t.relativeKey, t.options).then((e) => ({
				key: t.key,
				value: et(e)
			})))));
		},
		getItemRaw(e, t = {}) {
			e = dt(e);
			let { relativeKey: r, driver: i } = n(e);
			return i.getItemRaw ? nt(i.getItemRaw, r, t) : nt(i.getItem, r, t).then((e) => ct(e));
		},
		async setItem(e, t, r = {}) {
			if (t === void 0) return c.removeItem(e);
			e = dt(e);
			let { relativeKey: a, driver: o } = n(e);
			o.setItem && (await nt(o.setItem, a, at(t), r), o.watch || i("update", e));
		},
		async setItems(e, t) {
			await s(e, t, async (e) => {
				if (e.driver.setItems) return nt(e.driver.setItems, e.items.map((e) => ({
					key: e.relativeKey,
					value: at(e.value),
					options: e.options
				})), t);
				e.driver.setItem && await Promise.all(e.items.map((t) => nt(e.driver.setItem, t.relativeKey, at(t.value), t.options)));
			});
		},
		async setItemRaw(e, t, r = {}) {
			if (t === void 0) return c.removeItem(e, r);
			e = dt(e);
			let { relativeKey: a, driver: o } = n(e);
			if (o.setItemRaw) await nt(o.setItemRaw, a, t, r);
			else if (o.setItem) await nt(o.setItem, a, st(t), r);
			else return;
			o.watch || i("update", e);
		},
		async removeItem(e, t = {}) {
			typeof t == "boolean" && (t = { removeMeta: t }), e = dt(e);
			let { relativeKey: r, driver: a } = n(e);
			a.removeItem && (await nt(a.removeItem, r, t), (t.removeMeta || t.removeMata) && await nt(a.removeItem, r + "$", t), a.watch || i("remove", e));
		},
		async getMeta(e, t = {}) {
			typeof t == "boolean" && (t = { nativeOnly: t }), e = dt(e);
			let { relativeKey: r, driver: i } = n(e), a = /* @__PURE__ */ Object.create(null);
			if (i.getMeta && Object.assign(a, await nt(i.getMeta, r, t)), !t.nativeOnly) {
				let e = await nt(i.getItem, r + "$", t).then((e) => et(e));
				e && typeof e == "object" && (typeof e.atime == "string" && (e.atime = new Date(e.atime)), typeof e.mtime == "string" && (e.mtime = new Date(e.mtime)), Object.assign(a, e));
			}
			return a;
		},
		setMeta(e, t, n = {}) {
			return this.setItem(e + "$", t, n);
		},
		removeMeta(e, t = {}) {
			return this.removeItem(e + "$", t);
		},
		async getKeys(e, t = {}) {
			e = pt(e);
			let n = r(e, !0), i = [], a = [], o = !0;
			for (let e of n) {
				e.driver.flags?.maxDepth || (o = !1);
				let n = await nt(e.driver.getKeys, e.relativeBase, t);
				for (let t of n) {
					let n = e.mountpoint + dt(t);
					i.some((e) => n.startsWith(e)) || a.push(n);
				}
				i = [e.mountpoint, ...i.filter((t) => !t.startsWith(e.mountpoint))];
			}
			let s = t.maxDepth !== void 0 && !o;
			return a.filter((n) => (!s || mt(n, t.maxDepth)) && ht(n, e));
		},
		async clear(e, t = {}) {
			e = pt(e), await Promise.all(r(e, !1).map(async (e) => {
				if (e.driver.clear) return nt(e.driver.clear, e.relativeBase, t);
				if (e.driver.removeItem) {
					let n = await e.driver.getKeys(e.relativeBase || "", t);
					return Promise.all(n.map((n) => e.driver.removeItem(n, t)));
				}
			}));
		},
		async dispose() {
			await Promise.all(Object.values(t.mounts).map((e) => xt(e)));
		},
		async watch(e) {
			return await a(), t.watchListeners.push(e), async () => {
				t.watchListeners = t.watchListeners.filter((t) => t !== e), t.watchListeners.length === 0 && await o();
			};
		},
		async unwatch() {
			t.watchListeners = [], await o();
		},
		mount(e, n) {
			if (e = pt(e), e && t.mounts[e]) throw Error(`already mounted at ${e}`);
			return e && (t.mountpoints.push(e), t.mountpoints.sort((e, t) => t.length - e.length)), t.mounts[e] = n, t.watching && Promise.resolve(bt(n, i, e)).then((n) => {
				t.unwatch[e] = n;
			}).catch(console.error), c;
		},
		async unmount(e, n = !0) {
			e = pt(e), !(!e || !t.mounts[e]) && (t.watching && e in t.unwatch && (t.unwatch[e]?.(), delete t.unwatch[e]), n && await xt(t.mounts[e]), t.mountpoints = t.mountpoints.filter((t) => t !== e), delete t.mounts[e]);
		},
		getMount(e = "") {
			e = dt(e) + ":";
			let t = n(e);
			return {
				driver: t.driver,
				base: t.base
			};
		},
		getMounts(e = "", t = {}) {
			return e = dt(e), r(e, t.parents).map((e) => ({
				driver: e.driver,
				base: e.mountpoint
			}));
		},
		keys: (e, t = {}) => c.getKeys(e, t),
		get: (e, t = {}) => c.getItem(e, t),
		set: (e, t, n = {}) => c.setItem(e, t, n),
		has: (e, t = {}) => c.hasItem(e, t),
		del: (e, t = {}) => c.removeItem(e, t),
		remove: (e, t = {}) => c.removeItem(e, t)
	};
	return c;
}
function bt(e, t, n) {
	return e.watch ? e.watch((e, r) => t(e, n + r)) : () => {};
}
async function xt(e) {
	typeof e.dispose == "function" && await nt(e.dispose);
}
//#endregion
//#region node_modules/idb-keyval/dist/index.js
function St(e) {
	return new Promise((t, n) => {
		e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => n(e.error);
	});
}
function Ct(e, t) {
	let n, r = () => {
		if (n) return n;
		let r = indexedDB.open(e);
		return r.onupgradeneeded = () => r.result.createObjectStore(t), n = St(r), n.then((e) => {
			e.onclose = () => n = void 0;
		}, () => {}), n;
	};
	return (e, n) => r().then((r) => n(r.transaction(t, e).objectStore(t)));
}
var wt;
function Tt() {
	return wt || (wt = Ct("keyval-store", "keyval")), wt;
}
function Et(e, t = Tt()) {
	return t("readonly", (t) => St(t.get(e)));
}
function Dt(e, t, n = Tt()) {
	return n("readwrite", (n) => (n.put(t, e), St(n.transaction)));
}
function Ot(e, t = Tt()) {
	return t("readwrite", (t) => (t.delete(e), St(t.transaction)));
}
function kt(e = Tt()) {
	return e("readwrite", (e) => (e.clear(), St(e.transaction)));
}
function At(e, t) {
	return e.openCursor().onsuccess = function() {
		this.result && (t(this.result), this.result.continue());
	}, St(e.transaction);
}
function jt(e = Tt()) {
	return e("readonly", (e) => {
		if (e.getAllKeys) return St(e.getAllKeys());
		let t = [];
		return At(e, (e) => t.push(e.key)).then(() => t);
	});
}
//#endregion
//#region node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var Mt = "idb-keyval", Nt = (e = {}) => {
	let t = e.base && e.base.length > 0 ? `${e.base}:` : "", n = (e) => t + e, r;
	return e.dbName && e.storeName && (r = Ct(e.dbName, e.storeName)), {
		name: Mt,
		options: e,
		async hasItem(e) {
			return !(typeof await Et(n(e), r) > "u");
		},
		async getItem(e) {
			return await Et(n(e), r) ?? null;
		},
		setItem(e, t) {
			return Dt(n(e), t, r);
		},
		removeItem(e) {
			return Ot(n(e), r);
		},
		getKeys() {
			return jt(r);
		},
		clear() {
			return kt(r);
		}
	};
}, Pt = "WALLET_CONNECT_V2_INDEXED_DB", Ft = "keyvaluestorage", It = class {
	constructor() {
		this.indexedDb = yt({ driver: Nt({
			dbName: Pt,
			storeName: Ft
		}) });
	}
	async getKeys() {
		return this.indexedDb.getKeys();
	}
	async getEntries() {
		return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((e) => [e.key, e.value]);
	}
	async getItem(e) {
		let t = await this.indexedDb.getItem(e);
		if (t !== null) return t;
	}
	async setItem(e, t) {
		await this.indexedDb.setItem(e, T(t));
	}
	async removeItem(e) {
		await this.indexedDb.removeItem(e);
	}
}, Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, Rt = { exports: {} };
(function() {
	let e;
	function t() {}
	e = t, e.prototype.getItem = function(e) {
		return this.hasOwnProperty(e) ? String(this[e]) : null;
	}, e.prototype.setItem = function(e, t) {
		this[e] = String(t);
	}, e.prototype.removeItem = function(e) {
		delete this[e];
	}, e.prototype.clear = function() {
		let e = this;
		Object.keys(e).forEach(function(t) {
			e[t] = void 0, delete e[t];
		});
	}, e.prototype.key = function(e) {
		return e = e || 0, Object.keys(this)[e];
	}, e.prototype.__defineGetter__("length", function() {
		return Object.keys(this).length;
	}), typeof Lt < "u" && Lt.localStorage ? Rt.exports = Lt.localStorage : typeof window < "u" && window.localStorage ? Rt.exports = window.localStorage : Rt.exports = new t();
})();
function zt(e) {
	return [e[0], C(e[1] ?? "")];
}
var Bt = class {
	constructor() {
		this.localStorage = Rt.exports;
	}
	async getKeys() {
		return Object.keys(this.localStorage);
	}
	async getEntries() {
		return Object.entries(this.localStorage).map(zt);
	}
	async getItem(e) {
		let t = this.localStorage.getItem(e);
		if (t !== null) return C(t);
	}
	async setItem(e, t) {
		this.localStorage.setItem(e, T(t));
	}
	async removeItem(e) {
		this.localStorage.removeItem(e);
	}
}, Vt = "wc_storage_version", Ht = 1, Ut = async (e, t, n) => {
	let r = Vt, i = await t.getItem(r);
	if (i && i >= Ht) {
		n(t);
		return;
	}
	let a = await e.getKeys();
	if (!a.length) {
		n(t);
		return;
	}
	let o = [];
	for (; a.length;) {
		let n = a.shift();
		if (!n) continue;
		let r = n.toLowerCase();
		if (r.includes("wc@") || r.includes("walletconnect") || r.includes("wc_") || r.includes("wallet_connect")) {
			let r = await e.getItem(n);
			await t.setItem(n, r), o.push(n);
		}
	}
	await t.setItem(r, Ht), n(t), Wt(e, o);
}, Wt = async (e, t) => {
	t.length && t.forEach(async (t) => {
		await e.removeItem(t);
	});
}, Gt = class {
	constructor() {
		this.initialized = !1, this.setInitialized = (e) => {
			this.storage = e, this.initialized = !0;
		};
		let e = new Bt();
		this.storage = e;
		try {
			Ut(e, new It(), this.setInitialized);
		} catch {
			this.initialized = !0;
		}
	}
	async getKeys() {
		return await this.initialize(), this.storage.getKeys();
	}
	async getEntries() {
		return await this.initialize(), this.storage.getEntries();
	}
	async getItem(e) {
		return await this.initialize(), this.storage.getItem(e);
	}
	async setItem(e, t) {
		return await this.initialize(), this.storage.setItem(e, t);
	}
	async removeItem(e) {
		return await this.initialize(), this.storage.removeItem(e);
	}
	async initialize() {
		this.initialized || await new Promise((e) => {
			let t = setInterval(() => {
				this.initialized && (clearInterval(t), e());
			}, 20);
		});
	}
}, Kt = Object.defineProperty, qt = (e, t, n) => t in e ? Kt(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Jt = (e, t, n) => qt(e, typeof t == "symbol" ? t : t + "", n), Yt = class extends Ue {
	constructor(e) {
		super(), this.opts = e, Jt(this, "protocol", "wc"), Jt(this, "version", 2);
	}
}, Xt = Object.defineProperty, Zt = (e, t, n) => t in e ? Xt(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Qt = (e, t, n) => Zt(e, typeof t == "symbol" ? t : t + "", n), $t = class extends Ue {
	constructor(e, t) {
		super(), this.core = e, this.logger = t, Qt(this, "records", /* @__PURE__ */ new Map());
	}
}, en = class {
	constructor(e, t) {
		this.logger = e, this.core = t;
	}
}, tn = class extends Ue {
	constructor(e, t) {
		super(), this.relayer = e, this.logger = t;
	}
}, nn = class extends Ue {
	constructor(e) {
		super();
	}
}, rn = class {
	constructor(e, t, n, r) {
		this.core = e, this.logger = t, this.name = n;
	}
}, an = class extends Ue {
	constructor(e, t) {
		super(), this.relayer = e, this.logger = t;
	}
}, on = class extends Ue {
	constructor(e, t) {
		super(), this.core = e, this.logger = t;
	}
}, sn = class {
	constructor(e, t, n) {
		this.core = e, this.logger = t, this.store = n;
	}
}, cn = class {
	constructor(e, t) {
		this.projectId = e, this.logger = t;
	}
}, ln = class {
	constructor(e, t, n) {
		this.core = e, this.logger = t, this.telemetryEnabled = n;
	}
}, un = Object.defineProperty, dn = (e, t, n) => t in e ? un(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, fn = (e, t, n) => dn(e, typeof t == "symbol" ? t : t + "", n), pn = class {
	constructor(e) {
		this.opts = e, fn(this, "protocol", "wc"), fn(this, "version", 2);
	}
}, mn = class {
	constructor(e) {
		this.client = e;
	}
};
//#endregion
//#region node_modules/@walletconnect/relay-auth/dist/index.es.js
function hn(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function gn(e, ...t) {
	if (!hn(e)) throw Error("Uint8Array expected");
	if (t.length > 0 && !t.includes(e.length)) throw Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function _n(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function vn(e, t) {
	gn(e);
	let n = t.outputLen;
	if (e.length < n) throw Error("digestInto() expects output buffer of length at least " + n);
}
var yn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, bn = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength);
function xn(e) {
	if (typeof e != "string") throw Error("utf8ToBytes expected string, got " + typeof e);
	return new Uint8Array(new TextEncoder().encode(e));
}
function Sn(e) {
	return typeof e == "string" && (e = xn(e)), gn(e), e;
}
var Cn = class {
	clone() {
		return this._cloneInto();
	}
};
function wn(e) {
	let t = (t) => e().update(Sn(t)).digest(), n = e();
	return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Tn(e = 32) {
	if (yn && typeof yn.getRandomValues == "function") return yn.getRandomValues(new Uint8Array(e));
	if (yn && typeof yn.randomBytes == "function") return yn.randomBytes(e);
	throw Error("crypto.getRandomValues must be defined");
}
function En(e, t, n, r) {
	if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
	let i = BigInt(32), a = BigInt(4294967295), o = Number(n >> i & a), s = Number(n & a), c = r ? 4 : 0, l = r ? 0 : 4;
	e.setUint32(t + c, o, r), e.setUint32(t + l, s, r);
}
var Dn = class extends Cn {
	constructor(e, t, n, r) {
		super(), this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = bn(this.buffer);
	}
	update(e) {
		_n(this);
		let { view: t, buffer: n, blockLen: r } = this;
		e = Sn(e);
		let i = e.length;
		for (let a = 0; a < i;) {
			let o = Math.min(r - this.pos, i - a);
			if (o === r) {
				let t = bn(e);
				for (; r <= i - a; a += r) this.process(t, a);
				continue;
			}
			n.set(e.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === r && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		_n(this), vn(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		En(n, r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = bn(e), s = this.outputLen;
		if (s % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
		let c = s / 4, l = this.get();
		if (c > l.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
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
		return e.length = r, e.pos = o, e.finished = i, e.destroyed = a, r % t && e.buffer.set(n), e;
	}
}, On = BigInt(2 ** 32 - 1), kn = BigInt(32);
function An(e, t = !1) {
	return t ? {
		h: Number(e & On),
		l: Number(e >> kn & On)
	} : {
		h: Number(e >> kn & On) | 0,
		l: Number(e & On) | 0
	};
}
function jn(e, t = !1) {
	let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
	for (let i = 0; i < e.length; i++) {
		let { h: a, l: o } = An(e[i], t);
		[n[i], r[i]] = [a, o];
	}
	return [n, r];
}
var Mn = (e, t) => BigInt(e >>> 0) << kn | BigInt(t >>> 0), Nn = (e, t, n) => e >>> n, Pn = (e, t, n) => e << 32 - n | t >>> n, Fn = (e, t, n) => e >>> n | t << 32 - n, In = (e, t, n) => e << 32 - n | t >>> n, Ln = (e, t, n) => e << 64 - n | t >>> n - 32, Rn = (e, t, n) => e >>> n - 32 | t << 64 - n, zn = (e, t) => t, Bn = (e, t) => e, Vn = (e, t, n) => e << n | t >>> 32 - n, Hn = (e, t, n) => t << n | e >>> 32 - n, Un = (e, t, n) => t << n - 32 | e >>> 64 - n, Wn = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Gn(e, t, n, r) {
	let i = (t >>> 0) + (r >>> 0);
	return {
		h: e + n + (i / 2 ** 32 | 0) | 0,
		l: i | 0
	};
}
var R = {
	fromBig: An,
	split: jn,
	toBig: Mn,
	shrSH: Nn,
	shrSL: Pn,
	rotrSH: Fn,
	rotrSL: In,
	rotrBH: Ln,
	rotrBL: Rn,
	rotr32H: zn,
	rotr32L: Bn,
	rotlSH: Vn,
	rotlSL: Hn,
	rotlBH: Un,
	rotlBL: Wn,
	add: Gn,
	add3L: (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
	add3H: (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0,
	add4L: (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
	add4H: (e, t, n, r, i) => t + n + r + i + (e / 2 ** 32 | 0) | 0,
	add5H: (e, t, n, r, i, a) => t + n + r + i + a + (e / 2 ** 32 | 0) | 0,
	add5L: (e, t, n, r, i) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0)
}, [Kn, qn] = R.split((/* @__PURE__ */ "0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817".split(".")).map((e) => BigInt(e))), Jn = new Uint32Array(80), Yn = new Uint32Array(80), Xn = class extends Dn {
	constructor() {
		super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
	}
	get() {
		let { Ah: e, Al: t, Bh: n, Bl: r, Ch: i, Cl: a, Dh: o, Dl: s, Eh: c, El: l, Fh: u, Fl: d, Gh: f, Gl: p, Hh: m, Hl: h } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s,
			c,
			l,
			u,
			d,
			f,
			p,
			m,
			h
		];
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.Ah = e | 0, this.Al = t | 0, this.Bh = n | 0, this.Bl = r | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = s | 0, this.Eh = c | 0, this.El = l | 0, this.Fh = u | 0, this.Fl = d | 0, this.Gh = f | 0, this.Gl = p | 0, this.Hh = m | 0, this.Hl = h | 0;
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) Jn[n] = e.getUint32(t), Yn[n] = e.getUint32(t += 4);
		for (let e = 16; e < 80; e++) {
			let t = Jn[e - 15] | 0, n = Yn[e - 15] | 0, r = R.rotrSH(t, n, 1) ^ R.rotrSH(t, n, 8) ^ R.shrSH(t, n, 7), i = R.rotrSL(t, n, 1) ^ R.rotrSL(t, n, 8) ^ R.shrSL(t, n, 7), a = Jn[e - 2] | 0, o = Yn[e - 2] | 0, s = R.rotrSH(a, o, 19) ^ R.rotrBH(a, o, 61) ^ R.shrSH(a, o, 6), c = R.rotrSL(a, o, 19) ^ R.rotrBL(a, o, 61) ^ R.shrSL(a, o, 6), l = R.add4L(i, c, Yn[e - 7], Yn[e - 16]);
			Jn[e] = R.add4H(l, r, s, Jn[e - 7], Jn[e - 16]) | 0, Yn[e] = l | 0;
		}
		let { Ah: n, Al: r, Bh: i, Bl: a, Ch: o, Cl: s, Dh: c, Dl: l, Eh: u, El: d, Fh: f, Fl: p, Gh: m, Gl: h, Hh: g, Hl: _ } = this;
		for (let e = 0; e < 80; e++) {
			let t = R.rotrSH(u, d, 14) ^ R.rotrSH(u, d, 18) ^ R.rotrBH(u, d, 41), v = R.rotrSL(u, d, 14) ^ R.rotrSL(u, d, 18) ^ R.rotrBL(u, d, 41), y = u & f ^ ~u & m, b = d & p ^ ~d & h, x = R.add5L(_, v, b, qn[e], Yn[e]), S = R.add5H(x, g, t, y, Kn[e], Jn[e]), C = x | 0, w = R.rotrSH(n, r, 28) ^ R.rotrBH(n, r, 34) ^ R.rotrBH(n, r, 39), T = R.rotrSL(n, r, 28) ^ R.rotrBL(n, r, 34) ^ R.rotrBL(n, r, 39), E = n & i ^ n & o ^ i & o, D = r & a ^ r & s ^ a & s;
			g = m | 0, _ = h | 0, m = f | 0, h = p | 0, f = u | 0, p = d | 0, {h: u, l: d} = R.add(c | 0, l | 0, S | 0, C | 0), c = o | 0, l = s | 0, o = i | 0, s = a | 0, i = n | 0, a = r | 0;
			let O = R.add3L(C, T, D);
			n = R.add3H(O, S, w, E), r = O | 0;
		}
		({h: n, l: r} = R.add(this.Ah | 0, this.Al | 0, n | 0, r | 0)), {h: i, l: a} = R.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), {h: o, l: s} = R.add(this.Ch | 0, this.Cl | 0, o | 0, s | 0), {h: c, l: l} = R.add(this.Dh | 0, this.Dl | 0, c | 0, l | 0), {h: u, l: d} = R.add(this.Eh | 0, this.El | 0, u | 0, d | 0), {h: f, l: p} = R.add(this.Fh | 0, this.Fl | 0, f | 0, p | 0), {h: m, l: h} = R.add(this.Gh | 0, this.Gl | 0, m | 0, h | 0), {h: g, l: _} = R.add(this.Hh | 0, this.Hl | 0, g | 0, _ | 0), this.set(n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _);
	}
	roundClean() {
		Jn.fill(0), Yn.fill(0);
	}
	destroy() {
		this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
}, Zn = wn(() => new Xn()), Qn = BigInt(0), $n = BigInt(1), er = BigInt(2);
function tr(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function nr(e) {
	if (!tr(e)) throw Error("Uint8Array expected");
}
function rr(e, t) {
	if (typeof t != "boolean") throw Error(e + " boolean expected, got " + t);
}
var ir = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ar(e) {
	nr(e);
	let t = "";
	for (let n = 0; n < e.length; n++) t += ir[e[n]];
	return t;
}
function or(e) {
	if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
	return e === "" ? Qn : BigInt("0x" + e);
}
var sr = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function cr(e) {
	if (e >= sr._0 && e <= sr._9) return e - sr._0;
	if (e >= sr.A && e <= sr.F) return e - (sr.A - 10);
	if (e >= sr.a && e <= sr.f) return e - (sr.a - 10);
}
function lr(e) {
	if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
	let t = e.length, n = t / 2;
	if (t % 2) throw Error("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = cr(e.charCodeAt(i)), a = cr(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw Error("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function ur(e) {
	return or(ar(e));
}
function dr(e) {
	return nr(e), or(ar(Uint8Array.from(e).reverse()));
}
function fr(e, t) {
	return lr(e.toString(16).padStart(t * 2, "0"));
}
function pr(e, t) {
	return fr(e, t).reverse();
}
function mr(e, t, n) {
	let r;
	if (typeof t == "string") try {
		r = lr(t);
	} catch (t) {
		throw Error(e + " must be hex string or Uint8Array, cause: " + t);
	}
	else if (tr(t)) r = Uint8Array.from(t);
	else throw Error(e + " must be hex string or Uint8Array");
	let i = r.length;
	if (typeof n == "number" && i !== n) throw Error(e + " of length " + n + " expected, got " + i);
	return r;
}
function hr(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		nr(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
var gr = (e) => typeof e == "bigint" && Qn <= e;
function _r(e, t, n) {
	return gr(e) && gr(t) && gr(n) && t <= e && e < n;
}
function vr(e, t, n, r) {
	if (!_r(t, n, r)) throw Error("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function yr(e) {
	let t;
	for (t = 0; e > Qn; e >>= $n, t += 1);
	return t;
}
var br = (e) => (er << BigInt(e - 1)) - $n, xr = {
	bigint: (e) => typeof e == "bigint",
	function: (e) => typeof e == "function",
	boolean: (e) => typeof e == "boolean",
	string: (e) => typeof e == "string",
	stringOrUint8Array: (e) => typeof e == "string" || tr(e),
	isSafeInteger: (e) => Number.isSafeInteger(e),
	array: (e) => Array.isArray(e),
	field: (e, t) => t.Fp.isValid(e),
	hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function Sr(e, t, n = {}) {
	let r = (t, n, r) => {
		let i = xr[n];
		if (typeof i != "function") throw Error("invalid validator function");
		let a = e[t];
		if (!(r && a === void 0) && !i(a, e)) throw Error("param " + String(t) + " is invalid. Expected " + n + ", got " + a);
	};
	for (let [e, n] of Object.entries(t)) r(e, n, !1);
	for (let [e, t] of Object.entries(n)) r(e, t, !0);
	return e;
}
function Cr(e) {
	let t = /* @__PURE__ */ new WeakMap();
	return (n, ...r) => {
		let i = t.get(n);
		if (i !== void 0) return i;
		let a = e(n, ...r);
		return t.set(n, a), a;
	};
}
var wr = BigInt(0), z = BigInt(1), Tr = BigInt(2), Er = BigInt(3), Dr = BigInt(4), Or = BigInt(5), kr = BigInt(8);
function Ar(e, t) {
	let n = e % t;
	return n >= wr ? n : t + n;
}
function jr(e, t, n) {
	if (t < wr) throw Error("invalid exponent, negatives unsupported");
	if (n <= wr) throw Error("invalid modulus");
	if (n === z) return wr;
	let r = z;
	for (; t > wr;) t & z && (r = r * e % n), e = e * e % n, t >>= z;
	return r;
}
function Mr(e, t, n) {
	let r = e;
	for (; t-- > wr;) r *= r, r %= n;
	return r;
}
function Nr(e, t) {
	if (e === wr) throw Error("invert: expected non-zero number");
	if (t <= wr) throw Error("invert: expected positive modulus, got " + t);
	let n = Ar(e, t), r = t, i = wr, a = z;
	for (; n !== wr;) {
		let e = r / n, t = r % n, o = i - a * e;
		r = n, n = t, i = a, a = o;
	}
	if (r !== z) throw Error("invert: does not exist");
	return Ar(i, t);
}
function Pr(e) {
	let t = (e - z) / Tr, n, r, i;
	for (n = e - z, r = 0; n % Tr === wr; n /= Tr, r++);
	for (i = Tr; i < e && jr(i, t, e) !== e - z; i++) if (i > 1e3) throw Error("Cannot find square root: likely non-prime P");
	if (r === 1) {
		let t = (e + z) / Dr;
		return function(e, n) {
			let r = e.pow(n, t);
			if (!e.eql(e.sqr(r), n)) throw Error("Cannot find square root");
			return r;
		};
	}
	let a = (n + z) / Tr;
	return function(e, o) {
		if (e.pow(o, t) === e.neg(e.ONE)) throw Error("Cannot find square root");
		let s = r, c = e.pow(e.mul(e.ONE, i), n), l = e.pow(o, a), u = e.pow(o, n);
		for (; !e.eql(u, e.ONE);) {
			if (e.eql(u, e.ZERO)) return e.ZERO;
			let t = 1;
			for (let n = e.sqr(u); t < s && !e.eql(n, e.ONE); t++) n = e.sqr(n);
			let n = e.pow(c, z << BigInt(s - t - 1));
			c = e.sqr(n), l = e.mul(l, n), u = e.mul(u, c), s = t;
		}
		return l;
	};
}
function Fr(e) {
	if (e % Dr === Er) {
		let t = (e + z) / Dr;
		return function(e, n) {
			let r = e.pow(n, t);
			if (!e.eql(e.sqr(r), n)) throw Error("Cannot find square root");
			return r;
		};
	}
	if (e % kr === Or) {
		let t = (e - Or) / kr;
		return function(e, n) {
			let r = e.mul(n, Tr), i = e.pow(r, t), a = e.mul(n, i), o = e.mul(e.mul(a, Tr), i), s = e.mul(a, e.sub(o, e.ONE));
			if (!e.eql(e.sqr(s), n)) throw Error("Cannot find square root");
			return s;
		};
	}
	return Pr(e);
}
var Ir = (e, t) => (Ar(e, t) & z) === z, Lr = [
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
function Rr(e) {
	return Sr(e, Lr.reduce((e, t) => (e[t] = "function", e), {
		ORDER: "bigint",
		MASK: "bigint",
		BYTES: "isSafeInteger",
		BITS: "isSafeInteger"
	}));
}
function zr(e, t, n) {
	if (n < wr) throw Error("invalid exponent, negatives unsupported");
	if (n === wr) return e.ONE;
	if (n === z) return t;
	let r = e.ONE, i = t;
	for (; n > wr;) n & z && (r = e.mul(r, i)), i = e.sqr(i), n >>= z;
	return r;
}
function Br(e, t) {
	let n = Array(t.length), r = t.reduce((t, r, i) => e.is0(r) ? t : (n[i] = t, e.mul(t, r)), e.ONE), i = e.inv(r);
	return t.reduceRight((t, r, i) => e.is0(r) ? t : (n[i] = e.mul(t, n[i]), e.mul(t, r)), i), n;
}
function Vr(e, t) {
	let n = t === void 0 ? e.toString(2).length : t;
	return {
		nBitLength: n,
		nByteLength: Math.ceil(n / 8)
	};
}
function Hr(e, t, n = !1, r = {}) {
	if (e <= wr) throw Error("invalid field: expected ORDER > 0, got " + e);
	let { nBitLength: i, nByteLength: a } = Vr(e, t);
	if (a > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
	let o, s = Object.freeze({
		ORDER: e,
		isLE: n,
		BITS: i,
		BYTES: a,
		MASK: br(i),
		ZERO: wr,
		ONE: z,
		create: (t) => Ar(t, e),
		isValid: (t) => {
			if (typeof t != "bigint") throw Error("invalid field element: expected bigint, got " + typeof t);
			return wr <= t && t < e;
		},
		is0: (e) => e === wr,
		isOdd: (e) => (e & z) === z,
		neg: (t) => Ar(-t, e),
		eql: (e, t) => e === t,
		sqr: (t) => Ar(t * t, e),
		add: (t, n) => Ar(t + n, e),
		sub: (t, n) => Ar(t - n, e),
		mul: (t, n) => Ar(t * n, e),
		pow: (e, t) => zr(s, e, t),
		div: (t, n) => Ar(t * Nr(n, e), e),
		sqrN: (e) => e * e,
		addN: (e, t) => e + t,
		subN: (e, t) => e - t,
		mulN: (e, t) => e * t,
		inv: (t) => Nr(t, e),
		sqrt: r.sqrt || ((t) => (o || (o = Fr(e)), o(s, t))),
		invertBatch: (e) => Br(s, e),
		cmov: (e, t, n) => n ? t : e,
		toBytes: (e) => n ? pr(e, a) : fr(e, a),
		fromBytes: (e) => {
			if (e.length !== a) throw Error("Field.fromBytes: expected " + a + " bytes, got " + e.length);
			return n ? dr(e) : ur(e);
		}
	});
	return Object.freeze(s);
}
var Ur = BigInt(0), Wr = BigInt(1);
function Gr(e, t) {
	let n = t.negate();
	return e ? n : t;
}
function Kr(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function qr(e, t) {
	return Kr(e, t), {
		windows: Math.ceil(t / e) + 1,
		windowSize: 2 ** (e - 1)
	};
}
function Jr(e, t) {
	if (!Array.isArray(e)) throw Error("array expected");
	e.forEach((e, n) => {
		if (!(e instanceof t)) throw Error("invalid point at index " + n);
	});
}
function Yr(e, t) {
	if (!Array.isArray(e)) throw Error("array of scalars expected");
	e.forEach((e, n) => {
		if (!t.isValid(e)) throw Error("invalid scalar at index " + n);
	});
}
var Xr = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap();
function Qr(e) {
	return Zr.get(e) || 1;
}
function $r(e, t) {
	return {
		constTimeNegate: Gr,
		hasPrecomputes(e) {
			return Qr(e) !== 1;
		},
		unsafeLadder(t, n, r = e.ZERO) {
			let i = t;
			for (; n > Ur;) n & Wr && (r = r.add(i)), i = i.double(), n >>= Wr;
			return r;
		},
		precomputeWindow(e, n) {
			let { windows: r, windowSize: i } = qr(n, t), a = [], o = e, s = o;
			for (let e = 0; e < r; e++) {
				s = o, a.push(s);
				for (let e = 1; e < i; e++) s = s.add(o), a.push(s);
				o = s.double();
			}
			return a;
		},
		wNAF(n, r, i) {
			let { windows: a, windowSize: o } = qr(n, t), s = e.ZERO, c = e.BASE, l = BigInt(2 ** n - 1), u = 2 ** n, d = BigInt(n);
			for (let e = 0; e < a; e++) {
				let t = e * o, n = Number(i & l);
				i >>= d, n > o && (n -= u, i += Wr);
				let a = t, f = t + Math.abs(n) - 1, p = e % 2 != 0, m = n < 0;
				n === 0 ? c = c.add(Gr(p, r[a])) : s = s.add(Gr(m, r[f]));
			}
			return {
				p: s,
				f: c
			};
		},
		wNAFUnsafe(n, r, i, a = e.ZERO) {
			let { windows: o, windowSize: s } = qr(n, t), c = BigInt(2 ** n - 1), l = 2 ** n, u = BigInt(n);
			for (let e = 0; e < o; e++) {
				let t = e * s;
				if (i === Ur) break;
				let n = Number(i & c);
				if (i >>= u, n > s && (n -= l, i += Wr), n === 0) continue;
				let o = r[t + Math.abs(n) - 1];
				n < 0 && (o = o.negate()), a = a.add(o);
			}
			return a;
		},
		getPrecomputes(e, t, n) {
			let r = Xr.get(t);
			return r || (r = this.precomputeWindow(t, e), e !== 1 && Xr.set(t, n(r))), r;
		},
		wNAFCached(e, t, n) {
			let r = Qr(e);
			return this.wNAF(r, this.getPrecomputes(r, e, n), t);
		},
		wNAFCachedUnsafe(e, t, n, r) {
			let i = Qr(e);
			return i === 1 ? this.unsafeLadder(e, t, r) : this.wNAFUnsafe(i, this.getPrecomputes(i, e, n), t, r);
		},
		setWindowSize(e, n) {
			Kr(n, t), Zr.set(e, n), Xr.delete(e);
		}
	};
}
function ei(e, t, n, r) {
	if (Jr(n, e), Yr(r, t), n.length !== r.length) throw Error("arrays of points and scalars must have equal length");
	let i = e.ZERO, a = yr(BigInt(n.length)), o = a > 12 ? a - 3 : a > 4 ? a - 2 : a ? 2 : 1, s = (1 << o) - 1, c = Array(s + 1).fill(i), l = Math.floor((t.BITS - 1) / o) * o, u = i;
	for (let e = l; e >= 0; e -= o) {
		c.fill(i);
		for (let t = 0; t < r.length; t++) {
			let i = r[t], a = Number(i >> BigInt(e) & BigInt(s));
			c[a] = c[a].add(n[t]);
		}
		let t = i;
		for (let e = c.length - 1, n = i; e > 0; e--) n = n.add(c[e]), t = t.add(n);
		if (u = u.add(t), e !== 0) for (let e = 0; e < o; e++) u = u.double();
	}
	return u;
}
function ti(e) {
	return Rr(e.Fp), Sr(e, {
		n: "bigint",
		h: "bigint",
		Gx: "field",
		Gy: "field"
	}, {
		nBitLength: "isSafeInteger",
		nByteLength: "isSafeInteger"
	}), Object.freeze({
		...Vr(e.n, e.nBitLength),
		...e,
		p: e.Fp.ORDER
	});
}
var ni = BigInt(0), ri = BigInt(1), ii = BigInt(2), ai = BigInt(8), oi = { zip215: !0 };
function si(e) {
	let t = ti(e);
	return Sr(e, {
		hash: "function",
		a: "bigint",
		d: "bigint",
		randomBytes: "function"
	}, {
		adjustScalarBytes: "function",
		domain: "function",
		uvRatio: "function",
		mapToCurve: "function"
	}), Object.freeze({ ...t });
}
function ci(e) {
	let t = si(e), { Fp: n, n: r, prehash: i, hash: a, randomBytes: o, nByteLength: s, h: c } = t, l = ii << BigInt(s * 8) - ri, u = n.create, d = Hr(t.n, t.nBitLength), f = t.uvRatio || ((e, t) => {
		try {
			return {
				isValid: !0,
				value: n.sqrt(e * n.inv(t))
			};
		} catch {
			return {
				isValid: !1,
				value: ni
			};
		}
	}), p = t.adjustScalarBytes || ((e) => e), m = t.domain || ((e, t, n) => {
		if (rr("phflag", n), t.length || n) throw Error("Contexts/pre-hash are not supported");
		return e;
	});
	function h(e, t) {
		vr("coordinate " + e, t, ni, l);
	}
	function g(e) {
		if (!(e instanceof y)) throw Error("ExtendedPoint expected");
	}
	let _ = Cr((e, t) => {
		let { ex: r, ey: i, ez: a } = e, o = e.is0();
		t ?? (t = o ? ai : n.inv(a));
		let s = u(r * t), c = u(i * t), l = u(a * t);
		if (o) return {
			x: ni,
			y: ri
		};
		if (l !== ri) throw Error("invZ was invalid");
		return {
			x: s,
			y: c
		};
	}), v = Cr((e) => {
		let { a: n, d: r } = t;
		if (e.is0()) throw Error("bad point: ZERO");
		let { ex: i, ey: a, ez: o, et: s } = e, c = u(i * i), l = u(a * a), d = u(o * o), f = u(d * d);
		if (u(d * u(u(c * n) + l)) !== u(f + u(r * u(c * l)))) throw Error("bad point: equation left != right (1)");
		if (u(i * a) !== u(o * s)) throw Error("bad point: equation left != right (2)");
		return !0;
	});
	class y {
		constructor(e, t, n, r) {
			this.ex = e, this.ey = t, this.ez = n, this.et = r, h("x", e), h("y", t), h("z", n), h("t", r), Object.freeze(this);
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		static fromAffine(e) {
			if (e instanceof y) throw Error("extended point not allowed");
			let { x: t, y: n } = e || {};
			return h("x", t), h("y", n), new y(t, n, ri, u(t * n));
		}
		static normalizeZ(e) {
			let t = n.invertBatch(e.map((e) => e.ez));
			return e.map((e, n) => e.toAffine(t[n])).map(y.fromAffine);
		}
		static msm(e, t) {
			return ei(y, d, e, t);
		}
		_setWindowSize(e) {
			S.setWindowSize(this, e);
		}
		assertValidity() {
			v(this);
		}
		equals(e) {
			g(e);
			let { ex: t, ey: n, ez: r } = this, { ex: i, ey: a, ez: o } = e, s = u(t * o), c = u(i * r), l = u(n * o), d = u(a * r);
			return s === c && l === d;
		}
		is0() {
			return this.equals(y.ZERO);
		}
		negate() {
			return new y(u(-this.ex), this.ey, this.ez, u(-this.et));
		}
		double() {
			let { a: e } = t, { ex: n, ey: r, ez: i } = this, a = u(n * n), o = u(r * r), s = u(ii * u(i * i)), c = u(e * a), l = n + r, d = u(u(l * l) - a - o), f = c + o, p = f - s, m = c - o, h = u(d * p), g = u(f * m), _ = u(d * m);
			return new y(h, g, u(p * f), _);
		}
		add(e) {
			g(e);
			let { a: n, d: r } = t, { ex: i, ey: a, ez: o, et: s } = this, { ex: c, ey: l, ez: d, et: f } = e;
			if (n === BigInt(-1)) {
				let e = u((a - i) * (l + c)), t = u((a + i) * (l - c)), n = u(t - e);
				if (n === ni) return this.double();
				let r = u(o * ii * f), p = u(s * ii * d), m = p + r, h = t + e, g = p - r, _ = u(m * n), v = u(h * g), b = u(m * g);
				return new y(_, v, u(n * h), b);
			}
			let p = u(i * c), m = u(a * l), h = u(s * r * f), _ = u(o * d), v = u((i + a) * (c + l) - p - m), b = _ - h, x = _ + h, S = u(m - n * p), C = u(v * b), w = u(x * S), T = u(v * S);
			return new y(C, w, u(b * x), T);
		}
		subtract(e) {
			return this.add(e.negate());
		}
		wNAF(e) {
			return S.wNAFCached(this, e, y.normalizeZ);
		}
		multiply(e) {
			let t = e;
			vr("scalar", t, ri, r);
			let { p: n, f: i } = this.wNAF(t);
			return y.normalizeZ([n, i])[0];
		}
		multiplyUnsafe(e, t = y.ZERO) {
			let n = e;
			return vr("scalar", n, ni, r), n === ni ? x : this.is0() || n === ri ? this : S.wNAFCachedUnsafe(this, n, y.normalizeZ, t);
		}
		isSmallOrder() {
			return this.multiplyUnsafe(c).is0();
		}
		isTorsionFree() {
			return S.unsafeLadder(this, r).is0();
		}
		toAffine(e) {
			return _(this, e);
		}
		clearCofactor() {
			let { h: e } = t;
			return e === ri ? this : this.multiplyUnsafe(e);
		}
		static fromHex(e, r = !1) {
			let { d: i, a } = t, o = n.BYTES;
			e = mr("pointHex", e, o), rr("zip215", r);
			let s = e.slice(), c = e[o - 1];
			s[o - 1] = c & -129;
			let d = dr(s);
			vr("pointHex.y", d, ni, r ? l : n.ORDER);
			let p = u(d * d), { isValid: m, value: h } = f(u(p - ri), u(i * p - a));
			if (!m) throw Error("Point.fromHex: invalid y coordinate");
			let g = (h & ri) === ri, _ = (c & 128) != 0;
			if (!r && h === ni && _) throw Error("Point.fromHex: x=0 and x_0=1");
			return _ !== g && (h = u(-h)), y.fromAffine({
				x: h,
				y: d
			});
		}
		static fromPrivateKey(e) {
			return T(e).point;
		}
		toRawBytes() {
			let { x: e, y: t } = this.toAffine(), r = pr(t, n.BYTES);
			return r[r.length - 1] |= e & ri ? 128 : 0, r;
		}
		toHex() {
			return ar(this.toRawBytes());
		}
	}
	y.BASE = new y(t.Gx, t.Gy, ri, u(t.Gx * t.Gy)), y.ZERO = new y(ni, ri, ri, ni);
	let { BASE: b, ZERO: x } = y, S = $r(y, s * 8);
	function C(e) {
		return Ar(e, r);
	}
	function w(e) {
		return C(dr(e));
	}
	function T(e) {
		let t = n.BYTES;
		e = mr("private key", e, t);
		let r = mr("hashed private key", a(e), 2 * t), i = p(r.slice(0, t)), o = r.slice(t, 2 * t), s = w(i), c = b.multiply(s);
		return {
			head: i,
			prefix: o,
			scalar: s,
			point: c,
			pointBytes: c.toRawBytes()
		};
	}
	function E(e) {
		return T(e).pointBytes;
	}
	function D(e = new Uint8Array(), ...t) {
		return w(a(m(hr(...t), mr("context", e), !!i)));
	}
	function O(e, t, a = {}) {
		e = mr("message", e), i && (e = i(e));
		let { prefix: o, scalar: s, pointBytes: c } = T(t), l = D(a.context, o, e), u = b.multiply(l).toRawBytes(), d = C(l + D(a.context, u, c, e) * s);
		return vr("signature.s", d, ni, r), mr("result", hr(u, pr(d, n.BYTES)), n.BYTES * 2);
	}
	let k = oi;
	function A(e, t, r, a = k) {
		let { context: o, zip215: s } = a, c = n.BYTES;
		e = mr("signature", e, 2 * c), t = mr("message", t), r = mr("publicKey", r, c), s !== void 0 && rr("zip215", s), i && (t = i(t));
		let l = dr(e.slice(c, 2 * c)), u, d, f;
		try {
			u = y.fromHex(r, s), d = y.fromHex(e.slice(0, c), s), f = b.multiplyUnsafe(l);
		} catch {
			return !1;
		}
		if (!s && u.isSmallOrder()) return !1;
		let p = D(o, d.toRawBytes(), u.toRawBytes(), t);
		return d.add(u.multiplyUnsafe(p)).subtract(f).clearCofactor().equals(y.ZERO);
	}
	return b._setWindowSize(8), {
		CURVE: t,
		getPublicKey: E,
		sign: O,
		verify: A,
		ExtendedPoint: y,
		utils: {
			getExtendedPublicKey: T,
			randomPrivateKey: () => o(n.BYTES),
			precompute(e = 8, t = y.BASE) {
				return t._setWindowSize(e), t.multiply(BigInt(3)), t;
			}
		}
	};
}
var li = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), ui = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"), di = BigInt(1), fi = BigInt(2), pi = BigInt(5), mi = BigInt(8);
function hi(e) {
	let t = BigInt(10), n = BigInt(20), r = BigInt(40), i = BigInt(80), a = li, o = e * e % a * e % a, s = Mr(Mr(o, fi, a) * o % a, di, a) * e % a, c = Mr(s, pi, a) * s % a, l = Mr(c, t, a) * c % a, u = Mr(l, n, a) * l % a, d = Mr(u, r, a) * u % a;
	return {
		pow_p_5_8: Mr(Mr(Mr(Mr(d, i, a) * d % a, i, a) * d % a, t, a) * c % a, fi, a) * e % a,
		b2: o
	};
}
function gi(e) {
	return e[0] &= 248, e[31] &= 127, e[31] |= 64, e;
}
function _i(e, t) {
	let n = li, r = Ar(t * t * t, n), i = hi(e * Ar(r * r * t, n)).pow_p_5_8, a = Ar(e * r * i, n), o = Ar(t * a * a, n), s = a, c = Ar(a * ui, n), l = o === e, u = o === Ar(-e, n), d = o === Ar(-e * ui, n);
	return l && (a = s), (u || d) && (a = c), Ir(a, n) && (a = Ar(-a, n)), {
		isValid: l || u,
		value: a
	};
}
var vi = Hr(li, void 0, !0), yi = ci({
	a: BigInt(-1),
	d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
	Fp: vi,
	n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
	h: mi,
	Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
	Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
	hash: Zn,
	randomBytes: Tn,
	adjustScalarBytes: gi,
	uvRatio: _i
}), bi = "EdDSA", xi = "base64url", Si = "utf8", Ci = "utf8", wi = "base58btc";
function Ti(e) {
	return globalThis.Buffer == null ? e : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
function Ei(e = 0) {
	return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Ti(globalThis.Buffer.allocUnsafe(e)) : new Uint8Array(e);
}
function Di(e, t) {
	t || (t = e.reduce((e, t) => e + t.length, 0));
	let n = Ei(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return Ti(n);
}
function Oi(e, t) {
	if (e.length >= 255) throw TypeError("Alphabet too long");
	for (var n = new Uint8Array(256), r = 0; r < n.length; r++) n[r] = 255;
	for (var i = 0; i < e.length; i++) {
		var a = e.charAt(i), o = a.charCodeAt(0);
		if (n[o] !== 255) throw TypeError(a + " is ambiguous");
		n[o] = i;
	}
	var s = e.length, c = e.charAt(0), l = Math.log(s) / Math.log(256), u = Math.log(256) / Math.log(s);
	function d(t) {
		if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
		if (t.length === 0) return "";
		for (var n = 0, r = 0, i = 0, a = t.length; i !== a && t[i] === 0;) i++, n++;
		for (var o = (a - i) * u + 1 >>> 0, l = new Uint8Array(o); i !== a;) {
			for (var d = t[i], f = 0, p = o - 1; (d !== 0 || f < r) && p !== -1; p--, f++) d += 256 * l[p] >>> 0, l[p] = d % s >>> 0, d = d / s >>> 0;
			if (d !== 0) throw Error("Non-zero carry");
			r = f, i++;
		}
		for (var m = o - r; m !== o && l[m] === 0;) m++;
		for (var h = c.repeat(n); m < o; ++m) h += e.charAt(l[m]);
		return h;
	}
	function f(e) {
		if (typeof e != "string") throw TypeError("Expected String");
		if (e.length === 0) return new Uint8Array();
		var t = 0;
		if (e[t] !== " ") {
			for (var r = 0, i = 0; e[t] === c;) r++, t++;
			for (var a = (e.length - t) * l + 1 >>> 0, o = new Uint8Array(a); e[t];) {
				var u = n[e.charCodeAt(t)];
				if (u === 255) return;
				for (var d = 0, f = a - 1; (u !== 0 || d < i) && f !== -1; f--, d++) u += s * o[f] >>> 0, o[f] = u % 256 >>> 0, u = u / 256 >>> 0;
				if (u !== 0) throw Error("Non-zero carry");
				i = d, t++;
			}
			if (e[t] !== " ") {
				for (var p = a - i; p !== a && o[p] === 0;) p++;
				for (var m = new Uint8Array(r + (a - p)), h = r; p !== a;) m[h++] = o[p++];
				return m;
			}
		}
	}
	function p(e) {
		var n = f(e);
		if (n) return n;
		throw Error(`Non-${t} character`);
	}
	return {
		encode: d,
		decodeUnsafe: f,
		decode: p
	};
}
var ki = Oi, Ai = (e) => {
	if (e instanceof Uint8Array && e.constructor.name === "Uint8Array") return e;
	if (e instanceof ArrayBuffer) return new Uint8Array(e);
	if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
	throw Error("Unknown type, must be binary type");
}, ji = (e) => new TextEncoder().encode(e), Mi = (e) => new TextDecoder().decode(e), Ni = class {
	constructor(e, t, n) {
		this.name = e, this.prefix = t, this.baseEncode = n;
	}
	encode(e) {
		if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
		throw Error("Unknown type, must be binary type");
	}
}, Pi = class {
	constructor(e, t, n) {
		if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw Error("Invalid prefix character");
		this.prefixCodePoint = t.codePointAt(0), this.baseDecode = n;
	}
	decode(e) {
		if (typeof e == "string") {
			if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
			return this.baseDecode(e.slice(this.prefix.length));
		} else throw Error("Can only multibase decode strings");
	}
	or(e) {
		return Ii(this, e);
	}
}, Fi = class {
	constructor(e) {
		this.decoders = e;
	}
	or(e) {
		return Ii(this, e);
	}
	decode(e) {
		let t = e[0], n = this.decoders[t];
		if (n) return n.decode(e);
		throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
	}
}, Ii = (e, t) => new Fi({
	...e.decoders || { [e.prefix]: e },
	...t.decoders || { [t.prefix]: t }
}), Li = class {
	constructor(e, t, n, r) {
		this.name = e, this.prefix = t, this.baseEncode = n, this.baseDecode = r, this.encoder = new Ni(e, t, n), this.decoder = new Pi(e, t, r);
	}
	encode(e) {
		return this.encoder.encode(e);
	}
	decode(e) {
		return this.decoder.decode(e);
	}
}, Ri = ({ name: e, prefix: t, encode: n, decode: r }) => new Li(e, t, n, r), zi = ({ prefix: e, name: t, alphabet: n }) => {
	let { encode: r, decode: i } = ki(n, t);
	return Ri({
		prefix: e,
		name: t,
		encode: r,
		decode: (e) => Ai(i(e))
	});
}, Bi = (e, t, n, r) => {
	let i = {};
	for (let e = 0; e < t.length; ++e) i[t[e]] = e;
	let a = e.length;
	for (; e[a - 1] === "=";) --a;
	let o = new Uint8Array(a * n / 8 | 0), s = 0, c = 0, l = 0;
	for (let t = 0; t < a; ++t) {
		let a = i[e[t]];
		if (a === void 0) throw SyntaxError(`Non-${r} character`);
		c = c << n | a, s += n, s >= 8 && (s -= 8, o[l++] = 255 & c >> s);
	}
	if (s >= n || 255 & c << 8 - s) throw SyntaxError("Unexpected end of data");
	return o;
}, Vi = (e, t, n) => {
	let r = t[t.length - 1] === "=", i = (1 << n) - 1, a = "", o = 0, s = 0;
	for (let r = 0; r < e.length; ++r) for (s = s << 8 | e[r], o += 8; o > n;) o -= n, a += t[i & s >> o];
	if (o && (a += t[i & s << n - o]), r) for (; a.length * n & 7;) a += "=";
	return a;
}, Hi = ({ name: e, prefix: t, bitsPerChar: n, alphabet: r }) => Ri({
	prefix: t,
	name: e,
	encode(e) {
		return Vi(e, r, n);
	},
	decode(t) {
		return Bi(t, r, n, e);
	}
}), Ui = Ri({
	prefix: "\0",
	name: "identity",
	encode: (e) => Mi(e),
	decode: (e) => ji(e)
}), Wi = Object.freeze({
	__proto__: null,
	identity: Ui
}), Gi = Hi({
	prefix: "0",
	name: "base2",
	alphabet: "01",
	bitsPerChar: 1
}), Ki = Object.freeze({
	__proto__: null,
	base2: Gi
}), qi = Hi({
	prefix: "7",
	name: "base8",
	alphabet: "01234567",
	bitsPerChar: 3
}), Ji = Object.freeze({
	__proto__: null,
	base8: qi
}), Yi = zi({
	prefix: "9",
	name: "base10",
	alphabet: "0123456789"
}), Xi = Object.freeze({
	__proto__: null,
	base10: Yi
}), Zi = Hi({
	prefix: "f",
	name: "base16",
	alphabet: "0123456789abcdef",
	bitsPerChar: 4
}), Qi = Hi({
	prefix: "F",
	name: "base16upper",
	alphabet: "0123456789ABCDEF",
	bitsPerChar: 4
}), $i = Object.freeze({
	__proto__: null,
	base16: Zi,
	base16upper: Qi
}), ea = Hi({
	prefix: "b",
	name: "base32",
	alphabet: "abcdefghijklmnopqrstuvwxyz234567",
	bitsPerChar: 5
}), ta = Hi({
	prefix: "B",
	name: "base32upper",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
	bitsPerChar: 5
}), na = Hi({
	prefix: "c",
	name: "base32pad",
	alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
	bitsPerChar: 5
}), ra = Hi({
	prefix: "C",
	name: "base32padupper",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
	bitsPerChar: 5
}), ia = Hi({
	prefix: "v",
	name: "base32hex",
	alphabet: "0123456789abcdefghijklmnopqrstuv",
	bitsPerChar: 5
}), aa = Hi({
	prefix: "V",
	name: "base32hexupper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
	bitsPerChar: 5
}), oa = Hi({
	prefix: "t",
	name: "base32hexpad",
	alphabet: "0123456789abcdefghijklmnopqrstuv=",
	bitsPerChar: 5
}), sa = Hi({
	prefix: "T",
	name: "base32hexpadupper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
	bitsPerChar: 5
}), ca = Hi({
	prefix: "h",
	name: "base32z",
	alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
	bitsPerChar: 5
}), la = Object.freeze({
	__proto__: null,
	base32: ea,
	base32upper: ta,
	base32pad: na,
	base32padupper: ra,
	base32hex: ia,
	base32hexupper: aa,
	base32hexpad: oa,
	base32hexpadupper: sa,
	base32z: ca
}), ua = zi({
	prefix: "k",
	name: "base36",
	alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), da = zi({
	prefix: "K",
	name: "base36upper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), fa = Object.freeze({
	__proto__: null,
	base36: ua,
	base36upper: da
}), pa = zi({
	name: "base58btc",
	prefix: "z",
	alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), ma = zi({
	name: "base58flickr",
	prefix: "Z",
	alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), ha = Object.freeze({
	__proto__: null,
	base58btc: pa,
	base58flickr: ma
}), ga = Hi({
	prefix: "m",
	name: "base64",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	bitsPerChar: 6
}), _a = Hi({
	prefix: "M",
	name: "base64pad",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	bitsPerChar: 6
}), va = Hi({
	prefix: "u",
	name: "base64url",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
	bitsPerChar: 6
}), ya = Hi({
	prefix: "U",
	name: "base64urlpad",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
	bitsPerChar: 6
}), ba = Object.freeze({
	__proto__: null,
	base64: ga,
	base64pad: _a,
	base64url: va,
	base64urlpad: ya
}), xa = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Sa = xa.reduce((e, t, n) => (e[n] = t, e), []), Ca = xa.reduce((e, t, n) => (e[t.codePointAt(0)] = n, e), []);
function wa(e) {
	return e.reduce((e, t) => (e += Sa[t], e), "");
}
function Ta(e) {
	let t = [];
	for (let n of e) {
		let e = Ca[n.codePointAt(0)];
		if (e === void 0) throw Error(`Non-base256emoji character: ${n}`);
		t.push(e);
	}
	return new Uint8Array(t);
}
var Ea = Ri({
	prefix: "🚀",
	name: "base256emoji",
	encode: wa,
	decode: Ta
}), Da = Object.freeze({
	__proto__: null,
	base256emoji: Ea
}), Oa = Ma, ka = 128, Aa = -128, ja = 2 ** 31;
function Ma(e, t, n) {
	t = t || [], n = n || 0;
	for (var r = n; e >= ja;) t[n++] = e & 255 | ka, e /= 128;
	for (; e & Aa;) t[n++] = e & 255 | ka, e >>>= 7;
	return t[n] = e | 0, Ma.bytes = n - r + 1, t;
}
var Na = Ia, Pa = 128, Fa = 127;
function Ia(e, t) {
	var n = 0, t = t || 0, r = 0, i = t, a, o = e.length;
	do {
		if (i >= o) throw Ia.bytes = 0, /* @__PURE__ */ RangeError("Could not decode varint");
		a = e[i++], n += r < 28 ? (a & Fa) << r : (a & Fa) * 2 ** r, r += 7;
	} while (a >= Pa);
	return Ia.bytes = i - t, n;
}
var La = 2 ** 7, Ra = 2 ** 14, za = 2 ** 21, Ba = 2 ** 28, Va = 2 ** 35, Ha = 2 ** 42, Ua = 2 ** 49, Wa = 2 ** 56, Ga = 2 ** 63, Ka = {
	encode: Oa,
	decode: Na,
	encodingLength: function(e) {
		return e < La ? 1 : e < Ra ? 2 : e < za ? 3 : e < Ba ? 4 : e < Va ? 5 : e < Ha ? 6 : e < Ua ? 7 : e < Wa ? 8 : e < Ga ? 9 : 10;
	}
}, qa = (e, t, n = 0) => (Ka.encode(e, t, n), t), Ja = (e) => Ka.encodingLength(e), Ya = (e, t) => {
	let n = t.byteLength, r = Ja(e), i = r + Ja(n), a = new Uint8Array(i + n);
	return qa(e, a, 0), qa(n, a, r), a.set(t, i), new Xa(e, n, t, a);
}, Xa = class {
	constructor(e, t, n, r) {
		this.code = e, this.size = t, this.digest = n, this.bytes = r;
	}
}, Za = ({ name: e, code: t, encode: n }) => new Qa(e, t, n), Qa = class {
	constructor(e, t, n) {
		this.name = e, this.code = t, this.encode = n;
	}
	digest(e) {
		if (e instanceof Uint8Array) {
			let t = this.encode(e);
			return t instanceof Uint8Array ? Ya(this.code, t) : t.then((e) => Ya(this.code, e));
		} else throw Error("Unknown type, must be binary type");
	}
}, $a = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t)), eo = Za({
	name: "sha2-256",
	code: 18,
	encode: $a("SHA-256")
}), to = Za({
	name: "sha2-512",
	code: 19,
	encode: $a("SHA-512")
}), no = Object.freeze({
	__proto__: null,
	sha256: eo,
	sha512: to
}), ro = 0, io = "identity", ao = Ai, oo = Object.freeze({
	__proto__: null,
	identity: {
		code: ro,
		name: io,
		encode: ao,
		digest: (e) => Ya(ro, ao(e))
	}
});
new TextEncoder(), new TextDecoder();
var so = {
	...Wi,
	...Ki,
	...Ji,
	...Xi,
	...$i,
	...la,
	...fa,
	...ha,
	...ba,
	...Da
};
({
	...no,
	...oo
});
function co(e, t, n, r) {
	return {
		name: e,
		prefix: t,
		encoder: {
			name: e,
			prefix: t,
			encode: n
		},
		decoder: { decode: r }
	};
}
var lo = co("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), uo = co("ascii", "a", (e) => {
	let t = "a";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return t;
}, (e) => {
	e = e.substring(1);
	let t = Ei(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return t;
}), fo = {
	utf8: lo,
	"utf-8": lo,
	hex: so.base16,
	latin1: uo,
	ascii: uo,
	binary: uo,
	...so
};
function po(e, t = "utf8") {
	let n = fo[t];
	if (!n) throw Error(`Unsupported encoding "${t}"`);
	return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("utf8") : n.encoder.encode(e).substring(1);
}
function mo(e, t = "utf8") {
	let n = fo[t];
	if (!n) throw Error(`Unsupported encoding "${t}"`);
	return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Ti(globalThis.Buffer.from(e, "utf-8")) : n.decoder.decode(`${n.prefix}${e}`);
}
function ho(e) {
	return C(po(mo(e, xi), Si));
}
function go(e) {
	return po(mo(T(e), Si), xi);
}
function _o(e) {
	return [
		"did",
		"key",
		"z" + po(Di([mo("K36", wi), e]), wi)
	].join(":");
}
function vo(e) {
	return po(e, xi);
}
function yo(e) {
	return mo(e, xi);
}
function bo(e) {
	return mo([go(e.header), go(e.payload)].join("."), Ci);
}
function xo(e) {
	return [
		go(e.header),
		go(e.payload),
		vo(e.signature)
	].join(".");
}
function So(e) {
	let t = e.split(".");
	return {
		header: ho(t[0]),
		payload: ho(t[1]),
		signature: yo(t[2]),
		data: mo(t.slice(0, 2).join("."), Ci)
	};
}
function Co(e = Tn(32)) {
	let t = yi.getPublicKey(e);
	return {
		secretKey: Di([e, t]),
		publicKey: t
	};
}
async function wo(e, t, n, r, i = (0, L.fromMiliseconds)(Date.now())) {
	let a = {
		alg: bi,
		typ: "JWT"
	}, o = {
		iss: _o(r.publicKey),
		sub: e,
		aud: t,
		iat: i,
		exp: i + n
	}, s = bo({
		header: a,
		payload: o
	});
	return xo({
		header: a,
		payload: o,
		signature: yi.sign(s, r.secretKey.slice(0, 32))
	});
}
//#endregion
//#region node_modules/detect-browser/es/index.js
var To = function(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}, Eo = function() {
	function e(e, t, n) {
		this.name = e, this.version = t, this.os = n, this.type = "browser";
	}
	return e;
}(), Do = function() {
	function e(e) {
		this.version = e, this.type = "node", this.name = "node", this.os = process.platform;
	}
	return e;
}(), Oo = function() {
	function e(e, t, n, r) {
		this.name = e, this.version = t, this.os = n, this.bot = r, this.type = "bot-device";
	}
	return e;
}(), ko = function() {
	function e() {
		this.type = "bot", this.bot = !0, this.name = "bot", this.version = null, this.os = null;
	}
	return e;
}(), Ao = function() {
	function e() {
		this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
	}
	return e;
}(), jo = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/, Mo = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/, No = 3, Po = [
	["aol", /AOLShield\/([0-9\._]+)/],
	["edge", /Edge\/([0-9\._]+)/],
	["edge-ios", /EdgiOS\/([0-9\._]+)/],
	["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
	["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
	["samsung", /SamsungBrowser\/([0-9\.]+)/],
	["silk", /\bSilk\/([0-9._-]+)\b/],
	["miui", /MiuiBrowser\/([0-9\.]+)$/],
	["beaker", /BeakerBrowser\/([0-9\.]+)/],
	["edge-chromium", /EdgA?\/([0-9\.]+)/],
	["chromium-webview", /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
	["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
	["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
	["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
	["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
	["fxios", /FxiOS\/([0-9\.]+)/],
	["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
	["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
	["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
	["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
	["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
	["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
	["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
	["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
	["ie", /MSIE\s(7\.0)/],
	["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
	["android", /Android\s([0-9\.]+)/],
	["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
	["safari", /Version\/([0-9\._]+).*Safari/],
	["facebook", /FB[AS]V\/([0-9\.]+)/],
	["instagram", /Instagram\s([0-9\.]+)/],
	["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
	["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
	["curl", /^curl\/([0-9\.]+)$/],
	["searchbot", jo]
], Fo = [
	["iOS", /iP(hone|od|ad)/],
	["Android OS", /Android/],
	["BlackBerry OS", /BlackBerry|BB10/],
	["Windows Mobile", /IEMobile/],
	["Amazon OS", /Kindle/],
	["Windows 3.11", /Win16/],
	["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
	["Windows 98", /(Windows 98)|(Win98)/],
	["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
	["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
	["Windows Server 2003", /(Windows NT 5.2)/],
	["Windows Vista", /(Windows NT 6.0)/],
	["Windows 7", /(Windows NT 6.1)/],
	["Windows 8", /(Windows NT 6.2)/],
	["Windows 8.1", /(Windows NT 6.3)/],
	["Windows 10", /(Windows NT 10.0)/],
	["Windows ME", /Windows ME/],
	["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
	["Open BSD", /OpenBSD/],
	["Sun OS", /SunOS/],
	["Chrome OS", /CrOS/],
	["Linux", /(Linux)|(X11)/],
	["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
	["QNX", /QNX/],
	["BeOS", /BeOS/],
	["OS/2", /OS\/2/]
];
function Io(e) {
	return e ? Ro(e) : typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative" ? new Ao() : typeof navigator < "u" ? Ro(navigator.userAgent) : Bo();
}
function Lo(e) {
	return e !== "" && Po.reduce(function(t, n) {
		var r = n[0], i = n[1];
		if (t) return t;
		var a = i.exec(e);
		return !!a && [r, a];
	}, !1);
}
function Ro(e) {
	var t = Lo(e);
	if (!t) return null;
	var n = t[0], r = t[1];
	if (n === "searchbot") return new ko();
	var i = r[1] && r[1].split(".").join("_").split("_").slice(0, 3);
	i ? i.length < No && (i = To(To([], i, !0), Vo(No - i.length), !0)) : i = [];
	var a = i.join("."), o = zo(e), s = Mo.exec(e);
	return s && s[1] ? new Oo(n, a, o, s[1]) : new Eo(n, a, o);
}
function zo(e) {
	for (var t = 0, n = Fo.length; t < n; t++) {
		var r = Fo[t], i = r[0];
		if (r[1].exec(e)) return i;
	}
	return null;
}
function Bo() {
	return typeof process < "u" && process.version ? new Do(process.version.slice(1)) : null;
}
function Vo(e) {
	for (var t = [], n = 0; n < e; n++) t.push("0");
	return t;
}
//#endregion
//#region node_modules/@walletconnect/window-getters/dist/cjs/index.js
var Ho = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getLocalStorage = e.getLocalStorageOrThrow = e.getCrypto = e.getCryptoOrThrow = e.getLocation = e.getLocationOrThrow = e.getNavigator = e.getNavigatorOrThrow = e.getDocument = e.getDocumentOrThrow = e.getFromWindowOrThrow = e.getFromWindow = void 0;
	function t(e) {
		let t;
		return typeof window < "u" && window[e] !== void 0 && (t = window[e]), t;
	}
	e.getFromWindow = t;
	function n(e) {
		let n = t(e);
		if (!n) throw Error(`${e} is not defined in Window`);
		return n;
	}
	e.getFromWindowOrThrow = n;
	function r() {
		return n("document");
	}
	e.getDocumentOrThrow = r;
	function i() {
		return t("document");
	}
	e.getDocument = i;
	function a() {
		return n("navigator");
	}
	e.getNavigatorOrThrow = a;
	function o() {
		return t("navigator");
	}
	e.getNavigator = o;
	function s() {
		return n("location");
	}
	e.getLocationOrThrow = s;
	function c() {
		return t("location");
	}
	e.getLocation = c;
	function l() {
		return n("crypto");
	}
	e.getCryptoOrThrow = l;
	function u() {
		return t("crypto");
	}
	e.getCrypto = u;
	function d() {
		return n("localStorage");
	}
	e.getLocalStorageOrThrow = d;
	function f() {
		return t("localStorage");
	}
	e.getLocalStorage = f;
})), Uo = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getWindowMetadata = void 0;
	var t = Ho();
	function n() {
		let e, n;
		try {
			e = t.getDocumentOrThrow(), n = t.getLocationOrThrow();
		} catch {
			return null;
		}
		function r() {
			let t = e.getElementsByTagName("link"), r = [];
			for (let e = 0; e < t.length; e++) {
				let i = t[e], a = i.getAttribute("rel");
				if (a && a.toLowerCase().indexOf("icon") > -1) {
					let e = i.getAttribute("href");
					if (e) if (e.toLowerCase().indexOf("https:") === -1 && e.toLowerCase().indexOf("http:") === -1 && e.indexOf("//") !== 0) {
						let t = n.protocol + "//" + n.host;
						if (e.indexOf("/") === 0) t += e;
						else {
							let r = n.pathname.split("/");
							r.pop();
							let i = r.join("/");
							t += i + "/" + e;
						}
						r.push(t);
					} else if (e.indexOf("//") === 0) {
						let t = n.protocol + e;
						r.push(t);
					} else r.push(e);
				}
			}
			return r;
		}
		function i(...t) {
			let n = e.getElementsByTagName("meta");
			for (let e = 0; e < n.length; e++) {
				let r = n[e], i = [
					"itemprop",
					"property",
					"name"
				].map((e) => r.getAttribute(e)).filter((e) => e ? t.includes(e) : !1);
				if (i.length && i) {
					let e = r.getAttribute("content");
					if (e) return e;
				}
			}
			return "";
		}
		function a() {
			let t = i("name", "og:site_name", "og:title", "twitter:title");
			return t || (t = e.title), t;
		}
		function o() {
			return i("description", "og:description", "twitter:description", "keywords");
		}
		let s = a();
		return {
			description: o(),
			url: n.origin,
			icons: r(),
			name: s
		};
	}
	e.getWindowMetadata = n;
}));
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js
function Wo(e, { strict: t = !0 } = {}) {
	return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x");
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/size.js
function Go(e) {
	return Wo(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/version.js
var Ko = "2.31.0", qo = {
	getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) => t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
	version: `viem@${Ko}`
}, Jo = class e extends Error {
	constructor(t, n = {}) {
		let r = n.cause instanceof e ? n.cause.details : n.cause?.message ? n.cause.message : n.details, i = n.cause instanceof e && n.cause.docsPath || n.docsPath, a = qo.getDocsUrl?.({
			...n,
			docsPath: i
		}), o = [
			t || "An error occurred.",
			"",
			...n.metaMessages ? [...n.metaMessages, ""] : [],
			...a ? [`Docs: ${a}`] : [],
			...r ? [`Details: ${r}`] : [],
			...qo.version ? [`Version: ${qo.version}`] : []
		].join("\n");
		super(o, n.cause ? { cause: n.cause } : void 0), Object.defineProperty(this, "details", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "docsPath", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "metaMessages", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "shortMessage", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "version", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "name", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: "BaseError"
		}), this.details = r, this.docsPath = i, this.metaMessages = n.metaMessages, this.name = n.name ?? this.name, this.shortMessage = t, this.version = Ko;
	}
	walk(e) {
		return Yo(this, e);
	}
};
function Yo(e, t) {
	return t?.(e) ? e : e && typeof e == "object" && "cause" in e && e.cause !== void 0 ? Yo(e.cause, t) : t ? null : e;
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/data.js
var Xo = class extends Jo {
	constructor({ size: e, targetSize: t, type: n }) {
		super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`, { name: "SizeExceedsPaddingSizeError" });
	}
};
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js
function Zo(e, { dir: t, size: n = 32 } = {}) {
	return typeof e == "string" ? Qo(e, {
		dir: t,
		size: n
	}) : $o(e, {
		dir: t,
		size: n
	});
}
function Qo(e, { dir: t, size: n = 32 } = {}) {
	if (n === null) return e;
	let r = e.replace("0x", "");
	if (r.length > n * 2) throw new Xo({
		size: Math.ceil(r.length / 2),
		targetSize: n,
		type: "hex"
	});
	return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function $o(e, { dir: t, size: n = 32 } = {}) {
	if (n === null) return e;
	if (e.length > n) throw new Xo({
		size: e.length,
		targetSize: n,
		type: "bytes"
	});
	let r = new Uint8Array(n);
	for (let i = 0; i < n; i++) {
		let a = t === "right";
		r[a ? i : n - i - 1] = e[a ? i : e.length - i - 1];
	}
	return r;
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js
var es = class extends Jo {
	constructor({ max: e, min: t, signed: n, size: r, value: i }) {
		super(`Number "${i}" is not in safe ${r ? `${r * 8}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`, { name: "IntegerOutOfRangeError" });
	}
}, ts = class extends Jo {
	constructor({ givenSize: e, maxSize: t }) {
		super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, { name: "SizeOverflowError" });
	}
};
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js
function ns(e, { size: t }) {
	if (Go(e) > t) throw new ts({
		givenSize: Go(e),
		maxSize: t
	});
}
function rs(e, t = {}) {
	let { signed: n } = t;
	t.size && ns(e, { size: t.size });
	let r = BigInt(e);
	if (!n) return r;
	let i = (e.length - 2) / 2;
	return r <= (1n << BigInt(i) * 8n - 1n) - 1n ? r : r - BigInt(`0x${"f".padStart(i * 2, "f")}`) - 1n;
}
function is(e, t = {}) {
	return Number(rs(e, t));
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js
var as = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function os(e, t = {}) {
	return typeof e == "number" || typeof e == "bigint" ? ls(e, t) : typeof e == "string" ? ds(e, t) : typeof e == "boolean" ? ss(e, t) : cs(e, t);
}
function ss(e, t = {}) {
	let n = `0x${Number(e)}`;
	return typeof t.size == "number" ? (ns(n, { size: t.size }), Zo(n, { size: t.size })) : n;
}
function cs(e, t = {}) {
	let n = "";
	for (let t = 0; t < e.length; t++) n += as[e[t]];
	let r = `0x${n}`;
	return typeof t.size == "number" ? (ns(r, { size: t.size }), Zo(r, {
		dir: "right",
		size: t.size
	})) : r;
}
function ls(e, t = {}) {
	let { signed: n, size: r } = t, i = BigInt(e), a;
	r ? a = n ? (1n << BigInt(r) * 8n - 1n) - 1n : 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (a = BigInt(2 ** 53 - 1));
	let o = typeof a == "bigint" && n ? -a - 1n : 0;
	if (a && i > a || i < o) {
		let t = typeof e == "bigint" ? "n" : "";
		throw new es({
			max: a ? `${a}${t}` : void 0,
			min: `${o}${t}`,
			signed: n,
			size: r,
			value: `${e}${t}`
		});
	}
	let s = `0x${(n && i < 0 ? (1n << BigInt(r * 8)) + BigInt(i) : i).toString(16)}`;
	return r ? Zo(s, { size: r }) : s;
}
var us = /* @__PURE__ */ new TextEncoder();
function ds(e, t = {}) {
	return cs(us.encode(e), t);
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js
var fs = /* @__PURE__ */ new TextEncoder();
function ps(e, t = {}) {
	return typeof e == "number" || typeof e == "bigint" ? vs(e, t) : typeof e == "boolean" ? ms(e, t) : Wo(e) ? _s(e, t) : ys(e, t);
}
function ms(e, t = {}) {
	let n = new Uint8Array(1);
	return n[0] = Number(e), typeof t.size == "number" ? (ns(n, { size: t.size }), Zo(n, { size: t.size })) : n;
}
var hs = {
	zero: 48,
	nine: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function gs(e) {
	if (e >= hs.zero && e <= hs.nine) return e - hs.zero;
	if (e >= hs.A && e <= hs.F) return e - (hs.A - 10);
	if (e >= hs.a && e <= hs.f) return e - (hs.a - 10);
}
function _s(e, t = {}) {
	let n = e;
	t.size && (ns(n, { size: t.size }), n = Zo(n, {
		dir: "right",
		size: t.size
	}));
	let r = n.slice(2);
	r.length % 2 && (r = `0${r}`);
	let i = r.length / 2, a = new Uint8Array(i);
	for (let e = 0, t = 0; e < i; e++) {
		let n = gs(r.charCodeAt(t++)), i = gs(r.charCodeAt(t++));
		if (n === void 0 || i === void 0) throw new Jo(`Invalid byte sequence ("${r[t - 2]}${r[t - 1]}" in "${r}").`);
		a[e] = n * 16 + i;
	}
	return a;
}
function vs(e, t) {
	return _s(ls(e, t));
}
function ys(e, t = {}) {
	let n = fs.encode(e);
	return typeof t.size == "number" ? (ns(n, { size: t.size }), Zo(n, {
		dir: "right",
		size: t.size
	})) : n;
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha3.js
var bs = BigInt(0), xs = BigInt(1), Ss = BigInt(2), Cs = BigInt(7), ws = BigInt(256), Ts = BigInt(113), Es = [], Ds = [], Os = [];
for (let e = 0, t = xs, n = 1, r = 0; e < 24; e++) {
	[n, r] = [r, (2 * n + 3 * r) % 5], Es.push(2 * (5 * r + n)), Ds.push((e + 1) * (e + 2) / 2 % 64);
	let i = bs;
	for (let e = 0; e < 7; e++) t = (t << xs ^ (t >> Cs) * Ts) % ws, t & Ss && (i ^= xs << (xs << /* @__PURE__ */ BigInt(e)) - xs);
	Os.push(i);
}
var ks = ie(Os, !0), As = ks[0], js = ks[1], Ms = (e, t, n) => n > 32 ? D(e, t, n) : ae(e, t, n), Ns = (e, t, n) => n > 32 ? re(e, t, n) : k(e, t, n);
function Ps(e, t = 24) {
	let n = new Uint32Array(10);
	for (let r = 24 - t; r < 24; r++) {
		for (let t = 0; t < 10; t++) n[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
		for (let t = 0; t < 10; t += 2) {
			let r = (t + 8) % 10, i = (t + 2) % 10, a = n[i], o = n[i + 1], s = Ms(a, o, 1) ^ n[r], c = Ns(a, o, 1) ^ n[r + 1];
			for (let n = 0; n < 50; n += 10) e[t + n] ^= s, e[t + n + 1] ^= c;
		}
		let t = e[2], i = e[3];
		for (let n = 0; n < 24; n++) {
			let r = Ds[n], a = Ms(t, i, r), o = Ns(t, i, r), s = Es[n];
			t = e[s], i = e[s + 1], e[s] = a, e[s + 1] = o;
		}
		for (let t = 0; t < 50; t += 10) {
			for (let r = 0; r < 10; r++) n[r] = e[t + r];
			for (let r = 0; r < 10; r++) e[t + r] ^= ~n[(r + 2) % 10] & n[(r + 4) % 10];
		}
		e[0] ^= As[r], e[1] ^= js[r];
	}
	I(n);
}
var Fs = class e extends ne {
	constructor(e, t, n, r = !1, i = 24) {
		if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = e, this.suffix = t, this.outputLen = n, this.enableXOF = r, this.rounds = i, O(n), !(0 < e && e < 200)) throw Error("only keccak-f1600 function is supported");
		this.state = new Uint8Array(200), this.state32 = j(this.state);
	}
	clone() {
		return this._cloneInto();
	}
	keccak() {
		P(this.state32), Ps(this.state32, this.rounds), P(this.state32), this.posOut = 0, this.pos = 0;
	}
	update(e) {
		te(this), e = M(e), F(e);
		let { blockLen: t, state: n } = this, r = e.length;
		for (let i = 0; i < r;) {
			let a = Math.min(t - this.pos, r - i);
			for (let t = 0; t < a; t++) n[this.pos++] ^= e[i++];
			this.pos === t && this.keccak();
		}
		return this;
	}
	finish() {
		if (this.finished) return;
		this.finished = !0;
		let { state: e, suffix: t, pos: n, blockLen: r } = this;
		e[n] ^= t, t & 128 && n === r - 1 && this.keccak(), e[r - 1] ^= 128, this.keccak();
	}
	writeInto(e) {
		te(this, !1), F(e), this.finish();
		let t = this.state, { blockLen: n } = this;
		for (let r = 0, i = e.length; r < i;) {
			this.posOut >= n && this.keccak();
			let a = Math.min(n - this.posOut, i - r);
			e.set(t.subarray(this.posOut, this.posOut + a), r), this.posOut += a, r += a;
		}
		return e;
	}
	xofInto(e) {
		if (!this.enableXOF) throw Error("XOF is not possible for this instance");
		return this.writeInto(e);
	}
	xof(e) {
		return O(e), this.xofInto(new Uint8Array(e));
	}
	digestInto(e) {
		if (ee(e, this), this.finished) throw Error("digest() was already called");
		return this.writeInto(e), this.destroy(), e;
	}
	digest() {
		return this.digestInto(new Uint8Array(this.outputLen));
	}
	destroy() {
		this.destroyed = !0, I(this.state);
	}
	_cloneInto(t) {
		let { blockLen: n, suffix: r, outputLen: i, rounds: a, enableXOF: o } = this;
		return t || (t = new e(n, r, i, o, a)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = a, t.suffix = r, t.outputLen = i, t.enableXOF = o, t.destroyed = this.destroyed, t;
	}
}, Is = (e, t, n) => N(() => new Fs(t, e, n));
Is(6, 144, 224 / 8), Is(6, 136, 256 / 8), Is(6, 104, 384 / 8), Is(6, 72, 512 / 8), Is(1, 144, 224 / 8);
var Ls = Is(1, 136, 256 / 8);
Is(1, 104, 384 / 8), Is(1, 72, 512 / 8);
var Rs = (e, t, n) => A((r = {}) => new Fs(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
Rs(31, 168, 128 / 8), Rs(31, 136, 256 / 8);
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js
function zs(e, t) {
	let n = t || "hex", r = Ls(Wo(e, { strict: !1 }) ? ps(e) : e);
	return n === "bytes" ? r : os(r);
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js
var Bs = /* @__PURE__ */ new class extends Map {
	constructor(e) {
		super(), Object.defineProperty(this, "maxSize", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), this.maxSize = e;
	}
	get(e) {
		let t = super.get(e);
		return super.has(e) && t !== void 0 && (this.delete(e), super.set(e, t)), t;
	}
	set(e, t) {
		if (super.set(e, t), this.maxSize && this.size > this.maxSize) {
			let e = this.keys().next().value;
			e && this.delete(e);
		}
		return this;
	}
}(8192);
function Vs(e, t) {
	if (Bs.has(`${e}.${t}`)) return Bs.get(`${e}.${t}`);
	let n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(), r = zs(ys(n), "bytes"), i = (t ? n.substring(`${t}0x`.length) : n).split("");
	for (let e = 0; e < 40; e += 2) r[e >> 1] >> 4 >= 8 && i[e] && (i[e] = i[e].toUpperCase()), (r[e >> 1] & 15) >= 8 && i[e + 1] && (i[e + 1] = i[e + 1].toUpperCase());
	let a = `0x${i.join("")}`;
	return Bs.set(`${e}.${t}`, a), a;
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
function Hs(e) {
	return Vs(`0x${zs(`0x${e.substring(4)}`).substring(26)}`);
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function Us({ hash: e, signature: t }) {
	let n = Wo(e) ? e : os(e), { secp256k1: r } = await import("./secp256k1-CTESzdPg.js");
	return `0x${(() => {
		if (typeof t == "object" && "r" in t && "s" in t) {
			let { r: e, s: n, v: i, yParity: a } = t, o = Ws(Number(a ?? i));
			return new r.Signature(rs(e), rs(n)).addRecoveryBit(o);
		}
		let e = Wo(t) ? t : os(t);
		if (Go(e) !== 65) throw Error("invalid signature length");
		let n = Ws(is(`0x${e.slice(130)}`));
		return r.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(n);
	})().recoverPublicKey(n.substring(2)).toHex(!1)}`;
}
function Ws(e) {
	if (e === 0 || e === 1) return e;
	if (e === 27) return 0;
	if (e === 28) return 1;
	throw Error("Invalid yParityOrV value");
}
//#endregion
//#region node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverAddress.js
async function Gs({ hash: e, signature: t }) {
	return Hs(await Us({
		hash: e,
		signature: t
	}));
}
//#endregion
//#region node_modules/base-x/src/esm/index.js
function Ks(e) {
	if (e.length >= 255) throw TypeError("Alphabet too long");
	let t = new Uint8Array(256);
	for (let e = 0; e < t.length; e++) t[e] = 255;
	for (let n = 0; n < e.length; n++) {
		let r = e.charAt(n), i = r.charCodeAt(0);
		if (t[i] !== 255) throw TypeError(r + " is ambiguous");
		t[i] = n;
	}
	let n = e.length, r = e.charAt(0), i = Math.log(n) / Math.log(256), a = Math.log(256) / Math.log(n);
	function o(t) {
		if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
		if (t.length === 0) return "";
		let i = 0, o = 0, s = 0, c = t.length;
		for (; s !== c && t[s] === 0;) s++, i++;
		let l = (c - s) * a + 1 >>> 0, u = new Uint8Array(l);
		for (; s !== c;) {
			let e = t[s], r = 0;
			for (let t = l - 1; (e !== 0 || r < o) && t !== -1; t--, r++) e += 256 * u[t] >>> 0, u[t] = e % n >>> 0, e = e / n >>> 0;
			if (e !== 0) throw Error("Non-zero carry");
			o = r, s++;
		}
		let d = l - o;
		for (; d !== l && u[d] === 0;) d++;
		let f = r.repeat(i);
		for (; d < l; ++d) f += e.charAt(u[d]);
		return f;
	}
	function s(e) {
		if (typeof e != "string") throw TypeError("Expected String");
		if (e.length === 0) return new Uint8Array();
		let a = 0, o = 0, s = 0;
		for (; e[a] === r;) o++, a++;
		let c = (e.length - a) * i + 1 >>> 0, l = new Uint8Array(c);
		for (; a < e.length;) {
			let r = e.charCodeAt(a);
			if (r > 255) return;
			let i = t[r];
			if (i === 255) return;
			let o = 0;
			for (let e = c - 1; (i !== 0 || o < s) && e !== -1; e--, o++) i += n * l[e] >>> 0, l[e] = i % 256 >>> 0, i = i / 256 >>> 0;
			if (i !== 0) throw Error("Non-zero carry");
			s = o, a++;
		}
		let u = c - s;
		for (; u !== c && l[u] === 0;) u++;
		let d = new Uint8Array(o + (c - u)), f = o;
		for (; u !== c;) d[f++] = l[u++];
		return d;
	}
	function c(e) {
		let t = s(e);
		if (t) return t;
		throw Error("Non-base" + n + " character");
	}
	return {
		encode: o,
		decodeUnsafe: s,
		decode: c
	};
}
var qs = Ks("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function Js(e) {
	let t = e.length, n = 0, r = 0;
	for (; r < t;) {
		let i = e.charCodeAt(r++);
		if (!(i & 4294967168)) {
			n++;
			continue;
		} else if (!(i & 4294965248)) n += 2;
		else {
			if (i >= 55296 && i <= 56319 && r < t) {
				let t = e.charCodeAt(r);
				(t & 64512) == 56320 && (++r, i = ((i & 1023) << 10) + (t & 1023) + 65536);
			}
			i & 4294901760 ? n += 4 : n += 3;
		}
	}
	return n;
}
function Ys(e, t, n) {
	let r = e.length, i = n, a = 0;
	for (; a < r;) {
		let n = e.charCodeAt(a++);
		if (!(n & 4294967168)) {
			t[i++] = n;
			continue;
		} else if (!(n & 4294965248)) t[i++] = n >> 6 & 31 | 192;
		else {
			if (n >= 55296 && n <= 56319 && a < r) {
				let t = e.charCodeAt(a);
				(t & 64512) == 56320 && (++a, n = ((n & 1023) << 10) + (t & 1023) + 65536);
			}
			n & 4294901760 ? (t[i++] = n >> 18 & 7 | 240, t[i++] = n >> 12 & 63 | 128, t[i++] = n >> 6 & 63 | 128) : (t[i++] = n >> 12 & 15 | 224, t[i++] = n >> 6 & 63 | 128);
		}
		t[i++] = n & 63 | 128;
	}
}
var Xs = new TextEncoder(), Zs = 50;
function Qs(e, t, n) {
	Xs.encodeInto(e, t.subarray(n));
}
function $s(e, t, n) {
	e.length > Zs ? Qs(e, t, n) : Ys(e, t, n);
}
var ec = 4096;
function tc(e, t, n) {
	let r = t, i = r + n, a = [], o = "";
	for (; r < i;) {
		let t = e[r++];
		if (!(t & 128)) a.push(t);
		else if ((t & 224) == 192) {
			let n = e[r++] & 63;
			a.push((t & 31) << 6 | n);
		} else if ((t & 240) == 224) {
			let n = e[r++] & 63, i = e[r++] & 63;
			a.push((t & 31) << 12 | n << 6 | i);
		} else if ((t & 248) == 240) {
			let n = e[r++] & 63, i = e[r++] & 63, o = e[r++] & 63, s = (t & 7) << 18 | n << 12 | i << 6 | o;
			s > 65535 && (s -= 65536, a.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), a.push(s);
		} else a.push(t);
		a.length >= ec && (o += String.fromCharCode(...a), a.length = 0);
	}
	return a.length > 0 && (o += String.fromCharCode(...a)), o;
}
var nc = new TextDecoder(), rc = 200;
function ic(e, t, n) {
	let r = e.subarray(t, t + n);
	return nc.decode(r);
}
function ac(e, t, n) {
	return n > rc ? ic(e, t, n) : tc(e, t, n);
}
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var oc = class {
	constructor(e, t) {
		this.type = e, this.data = t;
	}
}, sc = class e extends Error {
	constructor(t) {
		super(t);
		let n = Object.create(e.prototype);
		Object.setPrototypeOf(this, n), Object.defineProperty(this, "name", {
			configurable: !0,
			enumerable: !1,
			value: e.name
		});
	}
};
function cc(e, t, n) {
	let r = n / 4294967296, i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function lc(e, t, n) {
	let r = Math.floor(n / 4294967296), i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function uc(e, t) {
	let n = e.getInt32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
function dc(e, t) {
	let n = e.getUint32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
var fc = 4294967295, pc = 17179869183;
function mc({ sec: e, nsec: t }) {
	if (e >= 0 && t >= 0 && e <= pc) if (t === 0 && e <= fc) {
		let t = new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e), t;
	} else {
		let n = e / 4294967296, r = e & 4294967295, i = new Uint8Array(8), a = new DataView(i.buffer);
		return a.setUint32(0, t << 2 | n & 3), a.setUint32(4, r), i;
	}
	else {
		let n = new Uint8Array(12), r = new DataView(n.buffer);
		return r.setUint32(0, t), lc(r, 4, e), n;
	}
}
function hc(e) {
	let t = e.getTime(), n = Math.floor(t / 1e3), r = (t - n * 1e3) * 1e6, i = Math.floor(r / 1e9);
	return {
		sec: n + i,
		nsec: r - i * 1e9
	};
}
function gc(e) {
	return e instanceof Date ? mc(hc(e)) : null;
}
function _c(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
	switch (e.byteLength) {
		case 4: return {
			sec: t.getUint32(0),
			nsec: 0
		};
		case 8: {
			let e = t.getUint32(0), n = t.getUint32(4);
			return {
				sec: (e & 3) * 4294967296 + n,
				nsec: e >>> 2
			};
		}
		case 12: return {
			sec: uc(t, 4),
			nsec: t.getUint32(0)
		};
		default: throw new sc(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
	}
}
function vc(e) {
	let t = _c(e);
	return /* @__PURE__ */ new Date(t.sec * 1e3 + t.nsec / 1e6);
}
var yc = {
	type: -1,
	encode: gc,
	decode: vc
}, bc = class {
	constructor() {
		this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(yc);
	}
	register({ type: e, encode: t, decode: n }) {
		if (e >= 0) this.encoders[e] = t, this.decoders[e] = n;
		else {
			let r = -1 - e;
			this.builtInEncoders[r] = t, this.builtInDecoders[r] = n;
		}
	}
	tryToEncode(e, t) {
		for (let n = 0; n < this.builtInEncoders.length; n++) {
			let r = this.builtInEncoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new oc(-1 - n, i);
			}
		}
		for (let n = 0; n < this.encoders.length; n++) {
			let r = this.encoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new oc(n, i);
			}
		}
		return e instanceof oc ? e : null;
	}
	decode(e, t, n) {
		let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
		return r ? r(e, t, n) : new oc(t, e);
	}
};
bc.defaultCodec = new bc();
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function xc(e) {
	return e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer;
}
function Sc(e) {
	return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : xc(e) ? new Uint8Array(e) : Uint8Array.from(e);
}
var Cc = class e {
	constructor(e) {
		this.entered = !1, this.extensionCodec = e?.extensionCodec ?? bc.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.maxDepth = e?.maxDepth ?? 100, this.initialBufferSize = e?.initialBufferSize ?? 2048, this.sortKeys = e?.sortKeys ?? !1, this.forceFloat32 = e?.forceFloat32 ?? !1, this.ignoreUndefined = e?.ignoreUndefined ?? !1, this.forceIntegerToFloat = e?.forceIntegerToFloat ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
	}
	clone() {
		return new e({
			extensionCodec: this.extensionCodec,
			context: this.context,
			useBigInt64: this.useBigInt64,
			maxDepth: this.maxDepth,
			initialBufferSize: this.initialBufferSize,
			sortKeys: this.sortKeys,
			forceFloat32: this.forceFloat32,
			ignoreUndefined: this.ignoreUndefined,
			forceIntegerToFloat: this.forceIntegerToFloat
		});
	}
	reinitializeState() {
		this.pos = 0;
	}
	encodeSharedRef(e) {
		if (this.entered) return this.clone().encodeSharedRef(e);
		try {
			return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
		} finally {
			this.entered = !1;
		}
	}
	encode(e) {
		if (this.entered) return this.clone().encode(e);
		try {
			return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
		} finally {
			this.entered = !1;
		}
	}
	doEncode(e, t) {
		if (t > this.maxDepth) throw Error(`Too deep objects in depth ${t}`);
		e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(e) : this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.useBigInt64 && typeof e == "bigint" ? this.encodeBigInt64(e) : this.encodeObject(e, t);
	}
	ensureBufferSizeToWrite(e) {
		let t = this.pos + e;
		this.view.byteLength < t && this.resizeBuffer(t * 2);
	}
	resizeBuffer(e) {
		let t = new ArrayBuffer(e), n = new Uint8Array(t), r = new DataView(t);
		n.set(this.bytes), this.view = r, this.bytes = n;
	}
	encodeNil() {
		this.writeU8(192);
	}
	encodeBoolean(e) {
		e === !1 ? this.writeU8(194) : this.writeU8(195);
	}
	encodeNumber(e) {
		!this.forceIntegerToFloat && Number.isSafeInteger(e) ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(211), this.writeI64(e)) : this.encodeNumberAsFloat(e);
	}
	encodeNumberAsFloat(e) {
		this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
	}
	encodeBigInt64(e) {
		e >= BigInt(0) ? (this.writeU8(207), this.writeBigUint64(e)) : (this.writeU8(211), this.writeBigInt64(e));
	}
	writeStringHeader(e) {
		if (e < 32) this.writeU8(160 + e);
		else if (e < 256) this.writeU8(217), this.writeU8(e);
		else if (e < 65536) this.writeU8(218), this.writeU16(e);
		else if (e < 4294967296) this.writeU8(219), this.writeU32(e);
		else throw Error(`Too long string: ${e} bytes in UTF-8`);
	}
	encodeString(e) {
		let t = Js(e);
		this.ensureBufferSizeToWrite(5 + t), this.writeStringHeader(t), $s(e, this.bytes, this.pos), this.pos += t;
	}
	encodeObject(e, t) {
		let n = this.extensionCodec.tryToEncode(e, this.context);
		if (n != null) this.encodeExtension(n);
		else if (Array.isArray(e)) this.encodeArray(e, t);
		else if (ArrayBuffer.isView(e)) this.encodeBinary(e);
		else if (typeof e == "object") this.encodeMap(e, t);
		else throw Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
	}
	encodeBinary(e) {
		let t = e.byteLength;
		if (t < 256) this.writeU8(196), this.writeU8(t);
		else if (t < 65536) this.writeU8(197), this.writeU16(t);
		else if (t < 4294967296) this.writeU8(198), this.writeU32(t);
		else throw Error(`Too large binary: ${t}`);
		let n = Sc(e);
		this.writeU8a(n);
	}
	encodeArray(e, t) {
		let n = e.length;
		if (n < 16) this.writeU8(144 + n);
		else if (n < 65536) this.writeU8(220), this.writeU16(n);
		else if (n < 4294967296) this.writeU8(221), this.writeU32(n);
		else throw Error(`Too large array: ${n}`);
		for (let n of e) this.doEncode(n, t + 1);
	}
	countWithoutUndefined(e, t) {
		let n = 0;
		for (let r of t) e[r] !== void 0 && n++;
		return n;
	}
	encodeMap(e, t) {
		let n = Object.keys(e);
		this.sortKeys && n.sort();
		let r = this.ignoreUndefined ? this.countWithoutUndefined(e, n) : n.length;
		if (r < 16) this.writeU8(128 + r);
		else if (r < 65536) this.writeU8(222), this.writeU16(r);
		else if (r < 4294967296) this.writeU8(223), this.writeU32(r);
		else throw Error(`Too large map object: ${r}`);
		for (let r of n) {
			let n = e[r];
			this.ignoreUndefined && n === void 0 || (this.encodeString(r), this.doEncode(n, t + 1));
		}
	}
	encodeExtension(e) {
		if (typeof e.data == "function") {
			let t = e.data(this.pos + 6), n = t.length;
			if (n >= 4294967296) throw Error(`Too large extension object: ${n}`);
			this.writeU8(201), this.writeU32(n), this.writeI8(e.type), this.writeU8a(t);
			return;
		}
		let t = e.data.length;
		if (t === 1) this.writeU8(212);
		else if (t === 2) this.writeU8(213);
		else if (t === 4) this.writeU8(214);
		else if (t === 8) this.writeU8(215);
		else if (t === 16) this.writeU8(216);
		else if (t < 256) this.writeU8(199), this.writeU8(t);
		else if (t < 65536) this.writeU8(200), this.writeU16(t);
		else if (t < 4294967296) this.writeU8(201), this.writeU32(t);
		else throw Error(`Too large extension object: ${t}`);
		this.writeI8(e.type), this.writeU8a(e.data);
	}
	writeU8(e) {
		this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
	}
	writeU8a(e) {
		let t = e.length;
		this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t;
	}
	writeI8(e) {
		this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
	}
	writeU16(e) {
		this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
	}
	writeI16(e) {
		this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
	}
	writeU32(e) {
		this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
	}
	writeI32(e) {
		this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
	}
	writeF32(e) {
		this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
	}
	writeF64(e) {
		this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
	}
	writeU64(e) {
		this.ensureBufferSizeToWrite(8), cc(this.view, this.pos, e), this.pos += 8;
	}
	writeI64(e) {
		this.ensureBufferSizeToWrite(8), lc(this.view, this.pos, e), this.pos += 8;
	}
	writeBigUint64(e) {
		this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e), this.pos += 8;
	}
	writeBigInt64(e) {
		this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e), this.pos += 8;
	}
};
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function wc(e, t) {
	return new Cc(t).encodeSharedRef(e);
}
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function Tc(e) {
	return `${e < 0 ? "-" : ""}0x${Math.abs(e).toString(16).padStart(2, "0")}`;
}
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var Ec = 16, Dc = 16, Oc = class {
	constructor(e = Ec, t = Dc) {
		this.hit = 0, this.miss = 0, this.maxKeyLength = e, this.maxLengthPerKey = t, this.caches = [];
		for (let e = 0; e < this.maxKeyLength; e++) this.caches.push([]);
	}
	canBeCached(e) {
		return e > 0 && e <= this.maxKeyLength;
	}
	find(e, t, n) {
		let r = this.caches[n - 1];
		FIND_CHUNK: for (let i of r) {
			let r = i.bytes;
			for (let i = 0; i < n; i++) if (r[i] !== e[t + i]) continue FIND_CHUNK;
			return i.str;
		}
		return null;
	}
	store(e, t) {
		let n = this.caches[e.length - 1], r = {
			bytes: e,
			str: t
		};
		n.length >= this.maxLengthPerKey ? n[Math.random() * n.length | 0] = r : n.push(r);
	}
	decode(e, t, n) {
		let r = this.find(e, t, n);
		if (r != null) return this.hit++, r;
		this.miss++;
		let i = tc(e, t, n), a = Uint8Array.prototype.slice.call(e, t, t + n);
		return this.store(a, i), i;
	}
}, kc = "array", Ac = "map_key", jc = "map_value", Mc = (e) => {
	if (typeof e == "string" || typeof e == "number") return e;
	throw new sc("The type of key must be string or number but " + typeof e);
}, Nc = class {
	constructor() {
		this.stack = [], this.stackHeadPosition = -1;
	}
	get length() {
		return this.stackHeadPosition + 1;
	}
	top() {
		return this.stack[this.stackHeadPosition];
	}
	pushArrayState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = kc, t.position = 0, t.size = e, t.array = Array(e);
	}
	pushMapState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = Ac, t.readCount = 0, t.size = e, t.map = {};
	}
	getUninitializedStateFromPool() {
		return this.stackHeadPosition++, this.stackHeadPosition === this.stack.length && this.stack.push({
			type: void 0,
			size: 0,
			array: void 0,
			position: 0,
			readCount: 0,
			map: void 0,
			key: null
		}), this.stack[this.stackHeadPosition];
	}
	release(e) {
		if (this.stack[this.stackHeadPosition] !== e) throw Error("Invalid stack state. Released state is not on top of the stack.");
		if (e.type === kc) {
			let t = e;
			t.size = 0, t.array = void 0, t.position = 0, t.type = void 0;
		}
		if (e.type === Ac || e.type === jc) {
			let t = e;
			t.size = 0, t.map = void 0, t.readCount = 0, t.type = void 0;
		}
		this.stackHeadPosition--;
	}
	reset() {
		this.stack.length = 0, this.stackHeadPosition = -1;
	}
}, Pc = -1, Fc = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0)), Ic = new Uint8Array(Fc.buffer);
try {
	Fc.getInt8(0);
} catch (e) {
	if (!(e instanceof RangeError)) throw Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
}
var Lc = /* @__PURE__ */ RangeError("Insufficient data"), Rc = new Oc(), zc = class e {
	constructor(e) {
		this.totalPos = 0, this.pos = 0, this.view = Fc, this.bytes = Ic, this.headByte = Pc, this.stack = new Nc(), this.entered = !1, this.extensionCodec = e?.extensionCodec ?? bc.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.rawStrings = e?.rawStrings ?? !1, this.maxStrLength = e?.maxStrLength ?? 4294967295, this.maxBinLength = e?.maxBinLength ?? 4294967295, this.maxArrayLength = e?.maxArrayLength ?? 4294967295, this.maxMapLength = e?.maxMapLength ?? 4294967295, this.maxExtLength = e?.maxExtLength ?? 4294967295, this.keyDecoder = e?.keyDecoder === void 0 ? Rc : e.keyDecoder, this.mapKeyConverter = e?.mapKeyConverter ?? Mc;
	}
	clone() {
		return new e({
			extensionCodec: this.extensionCodec,
			context: this.context,
			useBigInt64: this.useBigInt64,
			rawStrings: this.rawStrings,
			maxStrLength: this.maxStrLength,
			maxBinLength: this.maxBinLength,
			maxArrayLength: this.maxArrayLength,
			maxMapLength: this.maxMapLength,
			maxExtLength: this.maxExtLength,
			keyDecoder: this.keyDecoder
		});
	}
	reinitializeState() {
		this.totalPos = 0, this.headByte = Pc, this.stack.reset();
	}
	setBuffer(e) {
		let t = Sc(e);
		this.bytes = t, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength), this.pos = 0;
	}
	appendBuffer(e) {
		if (this.headByte === Pc && !this.hasRemaining(1)) this.setBuffer(e);
		else {
			let t = this.bytes.subarray(this.pos), n = Sc(e), r = new Uint8Array(t.length + n.length);
			r.set(t), r.set(n, t.length), this.setBuffer(r);
		}
	}
	hasRemaining(e) {
		return this.view.byteLength - this.pos >= e;
	}
	createExtraByteError(e) {
		let { view: t, pos: n } = this;
		return /* @__PURE__ */ RangeError(`Extra ${t.byteLength - n} of ${t.byteLength} byte(s) found at buffer[${e}]`);
	}
	decode(e) {
		if (this.entered) return this.clone().decode(e);
		try {
			this.entered = !0, this.reinitializeState(), this.setBuffer(e);
			let t = this.doDecodeSync();
			if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
			return t;
		} finally {
			this.entered = !1;
		}
	}
	*decodeMulti(e) {
		if (this.entered) {
			yield* this.clone().decodeMulti(e);
			return;
		}
		try {
			for (this.entered = !0, this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1);) yield this.doDecodeSync();
		} finally {
			this.entered = !1;
		}
	}
	async decodeAsync(e) {
		if (this.entered) return this.clone().decodeAsync(e);
		try {
			this.entered = !0;
			let t = !1, n;
			for await (let r of e) {
				if (t) throw this.entered = !1, this.createExtraByteError(this.totalPos);
				this.appendBuffer(r);
				try {
					n = this.doDecodeSync(), t = !0;
				} catch (e) {
					if (!(e instanceof RangeError)) throw e;
				}
				this.totalPos += this.pos;
			}
			if (t) {
				if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
				return n;
			}
			let { headByte: r, pos: i, totalPos: a } = this;
			throw RangeError(`Insufficient data in parsing ${Tc(r)} at ${a} (${i} in the current buffer)`);
		} finally {
			this.entered = !1;
		}
	}
	decodeArrayStream(e) {
		return this.decodeMultiAsync(e, !0);
	}
	decodeStream(e) {
		return this.decodeMultiAsync(e, !1);
	}
	async *decodeMultiAsync(e, t) {
		if (this.entered) {
			yield* this.clone().decodeMultiAsync(e, t);
			return;
		}
		try {
			this.entered = !0;
			let n = t, r = -1;
			for await (let i of e) {
				if (t && r === 0) throw this.createExtraByteError(this.totalPos);
				this.appendBuffer(i), n && (r = this.readArraySize(), n = !1, this.complete());
				try {
					for (; yield this.doDecodeSync(), --r !== 0;);
				} catch (e) {
					if (!(e instanceof RangeError)) throw e;
				}
				this.totalPos += this.pos;
			}
		} finally {
			this.entered = !1;
		}
	}
	doDecodeSync() {
		DECODE: for (;;) {
			let e = this.readHeadByte(), t;
			if (e >= 224) t = e - 256;
			else if (e < 192) if (e < 128) t = e;
			else if (e < 144) {
				let n = e - 128;
				if (n !== 0) {
					this.pushMapState(n), this.complete();
					continue DECODE;
				} else t = {};
			} else if (e < 160) {
				let n = e - 144;
				if (n !== 0) {
					this.pushArrayState(n), this.complete();
					continue DECODE;
				} else t = [];
			} else {
				let n = e - 160;
				t = this.decodeString(n, 0);
			}
			else if (e === 192) t = null;
			else if (e === 194) t = !1;
			else if (e === 195) t = !0;
			else if (e === 202) t = this.readF32();
			else if (e === 203) t = this.readF64();
			else if (e === 204) t = this.readU8();
			else if (e === 205) t = this.readU16();
			else if (e === 206) t = this.readU32();
			else if (e === 207) t = this.useBigInt64 ? this.readU64AsBigInt() : this.readU64();
			else if (e === 208) t = this.readI8();
			else if (e === 209) t = this.readI16();
			else if (e === 210) t = this.readI32();
			else if (e === 211) t = this.useBigInt64 ? this.readI64AsBigInt() : this.readI64();
			else if (e === 217) {
				let e = this.lookU8();
				t = this.decodeString(e, 1);
			} else if (e === 218) {
				let e = this.lookU16();
				t = this.decodeString(e, 2);
			} else if (e === 219) {
				let e = this.lookU32();
				t = this.decodeString(e, 4);
			} else if (e === 220) {
				let e = this.readU16();
				if (e !== 0) {
					this.pushArrayState(e), this.complete();
					continue DECODE;
				} else t = [];
			} else if (e === 221) {
				let e = this.readU32();
				if (e !== 0) {
					this.pushArrayState(e), this.complete();
					continue DECODE;
				} else t = [];
			} else if (e === 222) {
				let e = this.readU16();
				if (e !== 0) {
					this.pushMapState(e), this.complete();
					continue DECODE;
				} else t = {};
			} else if (e === 223) {
				let e = this.readU32();
				if (e !== 0) {
					this.pushMapState(e), this.complete();
					continue DECODE;
				} else t = {};
			} else if (e === 196) {
				let e = this.lookU8();
				t = this.decodeBinary(e, 1);
			} else if (e === 197) {
				let e = this.lookU16();
				t = this.decodeBinary(e, 2);
			} else if (e === 198) {
				let e = this.lookU32();
				t = this.decodeBinary(e, 4);
			} else if (e === 212) t = this.decodeExtension(1, 0);
			else if (e === 213) t = this.decodeExtension(2, 0);
			else if (e === 214) t = this.decodeExtension(4, 0);
			else if (e === 215) t = this.decodeExtension(8, 0);
			else if (e === 216) t = this.decodeExtension(16, 0);
			else if (e === 199) {
				let e = this.lookU8();
				t = this.decodeExtension(e, 1);
			} else if (e === 200) {
				let e = this.lookU16();
				t = this.decodeExtension(e, 2);
			} else if (e === 201) {
				let e = this.lookU32();
				t = this.decodeExtension(e, 4);
			} else throw new sc(`Unrecognized type byte: ${Tc(e)}`);
			this.complete();
			let n = this.stack;
			for (; n.length > 0;) {
				let e = n.top();
				if (e.type === kc) if (e.array[e.position] = t, e.position++, e.position === e.size) t = e.array, n.release(e);
				else continue DECODE;
				else if (e.type === Ac) {
					if (t === "__proto__") throw new sc("The key __proto__ is not allowed");
					e.key = this.mapKeyConverter(t), e.type = jc;
					continue DECODE;
				} else if (e.map[e.key] = t, e.readCount++, e.readCount === e.size) t = e.map, n.release(e);
				else {
					e.key = null, e.type = Ac;
					continue DECODE;
				}
			}
			return t;
		}
	}
	readHeadByte() {
		return this.headByte === Pc && (this.headByte = this.readU8()), this.headByte;
	}
	complete() {
		this.headByte = Pc;
	}
	readArraySize() {
		let e = this.readHeadByte();
		switch (e) {
			case 220: return this.readU16();
			case 221: return this.readU32();
			default:
				if (e < 160) return e - 144;
				throw new sc(`Unrecognized array type byte: ${Tc(e)}`);
		}
	}
	pushMapState(e) {
		if (e > this.maxMapLength) throw new sc(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
		this.stack.pushMapState(e);
	}
	pushArrayState(e) {
		if (e > this.maxArrayLength) throw new sc(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
		this.stack.pushArrayState(e);
	}
	decodeString(e, t) {
		return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(e, t) : this.decodeBinary(e, t);
	}
	decodeUtf8String(e, t) {
		if (e > this.maxStrLength) throw new sc(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
		if (this.bytes.byteLength < this.pos + t + e) throw Lc;
		let n = this.pos + t, r;
		return r = this.stateIsMapKey() && this.keyDecoder?.canBeCached(e) ? this.keyDecoder.decode(this.bytes, n, e) : ac(this.bytes, n, e), this.pos += t + e, r;
	}
	stateIsMapKey() {
		return this.stack.length > 0 ? this.stack.top().type === Ac : !1;
	}
	decodeBinary(e, t) {
		if (e > this.maxBinLength) throw new sc(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
		if (!this.hasRemaining(e + t)) throw Lc;
		let n = this.pos + t, r = this.bytes.subarray(n, n + e);
		return this.pos += t + e, r;
	}
	decodeExtension(e, t) {
		if (e > this.maxExtLength) throw new sc(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
		let n = this.view.getInt8(this.pos + t), r = this.decodeBinary(e, t + 1);
		return this.extensionCodec.decode(r, n, this.context);
	}
	lookU8() {
		return this.view.getUint8(this.pos);
	}
	lookU16() {
		return this.view.getUint16(this.pos);
	}
	lookU32() {
		return this.view.getUint32(this.pos);
	}
	readU8() {
		let e = this.view.getUint8(this.pos);
		return this.pos++, e;
	}
	readI8() {
		let e = this.view.getInt8(this.pos);
		return this.pos++, e;
	}
	readU16() {
		let e = this.view.getUint16(this.pos);
		return this.pos += 2, e;
	}
	readI16() {
		let e = this.view.getInt16(this.pos);
		return this.pos += 2, e;
	}
	readU32() {
		let e = this.view.getUint32(this.pos);
		return this.pos += 4, e;
	}
	readI32() {
		let e = this.view.getInt32(this.pos);
		return this.pos += 4, e;
	}
	readU64() {
		let e = dc(this.view, this.pos);
		return this.pos += 8, e;
	}
	readI64() {
		let e = uc(this.view, this.pos);
		return this.pos += 8, e;
	}
	readU64AsBigInt() {
		let e = this.view.getBigUint64(this.pos);
		return this.pos += 8, e;
	}
	readI64AsBigInt() {
		let e = this.view.getBigInt64(this.pos);
		return this.pos += 8, e;
	}
	readF32() {
		let e = this.view.getFloat32(this.pos);
		return this.pos += 4, e;
	}
	readF64() {
		let e = this.view.getFloat64(this.pos);
		return this.pos += 8, e;
	}
};
//#endregion
//#region node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function Bc(e, t) {
	return new zc(t).decode(e);
}
//#endregion
//#region node_modules/@scure/base/lib/esm/index.js
function Vc(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function Hc(e, t) {
	return Array.isArray(t) ? t.length === 0 ? !0 : e ? t.every((e) => typeof e == "string") : t.every((e) => Number.isSafeInteger(e)) : !1;
}
function Uc(e) {
	if (typeof e != "function") throw Error("function expected");
	return !0;
}
function Wc(e, t) {
	if (typeof t != "string") throw Error(`${e}: string expected`);
	return !0;
}
function Gc(e) {
	if (!Number.isSafeInteger(e)) throw Error(`invalid integer: ${e}`);
}
function Kc(e) {
	if (!Array.isArray(e)) throw Error("array expected");
}
function qc(e, t) {
	if (!Hc(!0, t)) throw Error(`${e}: array of strings expected`);
}
function Jc(e, t) {
	if (!Hc(!1, t)) throw Error(`${e}: array of numbers expected`);
}
function Yc(...e) {
	let t = (e) => e, n = (e, t) => (n) => e(t(n));
	return {
		encode: e.map((e) => e.encode).reduceRight(n, t),
		decode: e.map((e) => e.decode).reduce(n, t)
	};
}
function Xc(e) {
	let t = typeof e == "string" ? e.split("") : e, n = t.length;
	qc("alphabet", t);
	let r = new Map(t.map((e, t) => [e, t]));
	return {
		encode: (r) => (Kc(r), r.map((r) => {
			if (!Number.isSafeInteger(r) || r < 0 || r >= n) throw Error(`alphabet.encode: digit index outside alphabet "${r}". Allowed: ${e}`);
			return t[r];
		})),
		decode: (t) => (Kc(t), t.map((t) => {
			Wc("alphabet.decode", t);
			let n = r.get(t);
			if (n === void 0) throw Error(`Unknown letter: "${t}". Allowed: ${e}`);
			return n;
		}))
	};
}
function Zc(e = "") {
	return Wc("join", e), {
		encode: (t) => (qc("join.decode", t), t.join(e)),
		decode: (t) => (Wc("join.decode", t), t.split(e))
	};
}
function Qc(e, t = "=") {
	return Gc(e), Wc("padding", t), {
		encode(n) {
			for (qc("padding.encode", n); n.length * e % 8;) n.push(t);
			return n;
		},
		decode(n) {
			qc("padding.decode", n);
			let r = n.length;
			if (r * e % 8) throw Error("padding: invalid, string should have whole number of bytes");
			for (; r > 0 && n[r - 1] === t; r--) if ((r - 1) * e % 8 == 0) throw Error("padding: invalid, string has too much padding");
			return n.slice(0, r);
		}
	};
}
function $c(e) {
	return Uc(e), {
		encode: (e) => e,
		decode: (t) => e(t)
	};
}
var el = (e, t) => t === 0 ? e : el(t, e % t), tl = /* @__NO_SIDE_EFFECTS__ */ (e, t) => e + (t - el(e, t)), nl = /* @__PURE__ */ (() => {
	let e = [];
	for (let t = 0; t < 40; t++) e.push(2 ** t);
	return e;
})();
function rl(e, t, n, r) {
	if (Kc(e), t <= 0 || t > 32) throw Error(`convertRadix2: wrong from=${t}`);
	if (n <= 0 || n > 32) throw Error(`convertRadix2: wrong to=${n}`);
	if (/* @__PURE__ */ tl(t, n) > 32) throw Error(`convertRadix2: carry overflow from=${t} to=${n} carryBits=${/* @__PURE__ */ tl(t, n)}`);
	let i = 0, a = 0, o = nl[t], s = nl[n] - 1, c = [];
	for (let r of e) {
		if (Gc(r), r >= o) throw Error(`convertRadix2: invalid data word=${r} from=${t}`);
		if (i = i << t | r, a + t > 32) throw Error(`convertRadix2: carry overflow pos=${a} from=${t}`);
		for (a += t; a >= n; a -= n) c.push((i >> a - n & s) >>> 0);
		let e = nl[a];
		if (e === void 0) throw Error("invalid carry");
		i &= e - 1;
	}
	if (i = i << n - a & s, !r && a >= t) throw Error("Excess padding");
	if (!r && i > 0) throw Error(`Non-zero padding: ${i}`);
	return r && a > 0 && c.push(i >>> 0), c;
}
function il(e, t = !1) {
	if (Gc(e), e <= 0 || e > 32) throw Error("radix2: bits should be in (0..32]");
	if (/* @__PURE__ */ tl(8, e) > 32 || /* @__PURE__ */ tl(e, 8) > 32) throw Error("radix2: carry overflow");
	return {
		encode: (n) => {
			if (!Vc(n)) throw Error("radix2.encode input should be Uint8Array");
			return rl(Array.from(n), 8, e, !t);
		},
		decode: (n) => (Jc("radix2.decode", n), Uint8Array.from(rl(n, e, 8, t)))
	};
}
function al(e) {
	return Uc(e), function(...t) {
		try {
			return e.apply(null, t);
		} catch {}
	};
}
Yc(il(4), Xc("0123456789ABCDEF"), Zc(""));
var ol = Yc(il(5), Xc("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), Qc(5), Zc(""));
Yc(il(5), Xc("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), Zc("")), Yc(il(5), Xc("0123456789ABCDEFGHIJKLMNOPQRSTUV"), Qc(5), Zc("")), Yc(il(5), Xc("0123456789ABCDEFGHIJKLMNOPQRSTUV"), Zc("")), Yc(il(5), Xc("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), Zc(""), $c((e) => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
var sl = typeof Uint8Array.from([]).toBase64 == "function" && typeof Uint8Array.fromBase64 == "function";
sl || Yc(il(6), Xc("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), Qc(6), Zc("")), Yc(il(6), Xc("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), Zc("")), sl || Yc(il(6), Xc("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), Qc(6), Zc("")), Yc(il(6), Xc("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), Zc(""));
var cl = Yc(Xc("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), Zc("")), ll = [
	996825010,
	642813549,
	513874426,
	1027748829,
	705979059
];
function ul(e) {
	let t = e >> 25, n = (e & 33554431) << 5;
	for (let e = 0; e < ll.length; e++) (t >> e & 1) == 1 && (n ^= ll[e]);
	return n;
}
function dl(e, t, n = 1) {
	let r = e.length, i = 1;
	for (let t = 0; t < r; t++) {
		let n = e.charCodeAt(t);
		if (n < 33 || n > 126) throw Error(`Invalid prefix (${e})`);
		i = ul(i) ^ n >> 5;
	}
	i = ul(i);
	for (let t = 0; t < r; t++) i = ul(i) ^ e.charCodeAt(t) & 31;
	for (let e of t) i = ul(i) ^ e;
	for (let e = 0; e < 6; e++) i = ul(i);
	return i ^= n, cl.encode(rl([i % nl[30]], 30, 5, !1));
}
function fl(e) {
	let t = e === "bech32" ? 1 : 734539939, n = il(5), r = n.decode, i = n.encode, a = al(r);
	function o(e, n, r = 90) {
		Wc("bech32.encode prefix", e), Vc(n) && (n = Array.from(n)), Jc("bech32.encode", n);
		let i = e.length;
		if (i === 0) throw TypeError(`Invalid prefix length ${i}`);
		let a = i + 7 + n.length;
		if (r !== !1 && a > r) throw TypeError(`Length ${a} exceeds limit ${r}`);
		let o = e.toLowerCase(), s = dl(o, n, t);
		return `${o}1${cl.encode(n)}${s}`;
	}
	function s(e, n = 90) {
		Wc("bech32.decode input", e);
		let r = e.length;
		if (r < 8 || n !== !1 && r > n) throw TypeError(`invalid string length: ${r} (${e}). Expected (8..${n})`);
		let i = e.toLowerCase();
		if (e !== i && e !== e.toUpperCase()) throw Error("String must be lowercase or uppercase");
		let a = i.lastIndexOf("1");
		if (a === 0 || a === -1) throw Error("Letter \"1\" must be present between prefix and data only");
		let o = i.slice(0, a), s = i.slice(a + 1);
		if (s.length < 6) throw Error("Data must be at least 6 characters long");
		let c = cl.decode(s).slice(0, -6), l = dl(o, c, t);
		if (!s.endsWith(l)) throw Error(`Invalid checksum in ${e}: expected "${l}"`);
		return {
			prefix: o,
			words: c
		};
	}
	let c = al(s);
	function l(e) {
		let { prefix: t, words: n } = s(e, !1);
		return {
			prefix: t,
			words: n,
			bytes: r(n)
		};
	}
	function u(e, t) {
		return o(e, i(t));
	}
	return {
		encode: o,
		decode: s,
		encodeFromBytes: u,
		decodeToBytes: l,
		decodeUnsafe: c,
		fromWords: r,
		fromWordsUnsafe: a,
		toWords: i
	};
}
fl("bech32"), fl("bech32m"), typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function" || Yc(il(4), Xc("0123456789abcdef"), Zc(""), $c((e) => {
	if (typeof e != "string" || e.length % 2 != 0) throw TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
	return e.toLowerCase();
}));
//#endregion
//#region node_modules/uint8arrays/esm/src/util/as-uint8array.js
function pl(e) {
	return globalThis.Buffer == null ? e : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
//#endregion
//#region node_modules/uint8arrays/esm/src/alloc.js
function ml(e = 0) {
	return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? pl(globalThis.Buffer.allocUnsafe(e)) : new Uint8Array(e);
}
//#endregion
//#region node_modules/uint8arrays/esm/src/concat.js
function hl(e, t) {
	t || (t = e.reduce((e, t) => e + t.length, 0));
	let n = ml(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return pl(n);
}
//#endregion
//#region node_modules/multiformats/esm/vendor/base-x.js
function gl(e, t) {
	if (e.length >= 255) throw TypeError("Alphabet too long");
	for (var n = new Uint8Array(256), r = 0; r < n.length; r++) n[r] = 255;
	for (var i = 0; i < e.length; i++) {
		var a = e.charAt(i), o = a.charCodeAt(0);
		if (n[o] !== 255) throw TypeError(a + " is ambiguous");
		n[o] = i;
	}
	var s = e.length, c = e.charAt(0), l = Math.log(s) / Math.log(256), u = Math.log(256) / Math.log(s);
	function d(t) {
		if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
		if (t.length === 0) return "";
		for (var n = 0, r = 0, i = 0, a = t.length; i !== a && t[i] === 0;) i++, n++;
		for (var o = (a - i) * u + 1 >>> 0, l = new Uint8Array(o); i !== a;) {
			for (var d = t[i], f = 0, p = o - 1; (d !== 0 || f < r) && p !== -1; p--, f++) d += 256 * l[p] >>> 0, l[p] = d % s >>> 0, d = d / s >>> 0;
			if (d !== 0) throw Error("Non-zero carry");
			r = f, i++;
		}
		for (var m = o - r; m !== o && l[m] === 0;) m++;
		for (var h = c.repeat(n); m < o; ++m) h += e.charAt(l[m]);
		return h;
	}
	function f(e) {
		if (typeof e != "string") throw TypeError("Expected String");
		if (e.length === 0) return new Uint8Array();
		var t = 0;
		if (e[t] !== " ") {
			for (var r = 0, i = 0; e[t] === c;) r++, t++;
			for (var a = (e.length - t) * l + 1 >>> 0, o = new Uint8Array(a); e[t];) {
				var u = n[e.charCodeAt(t)];
				if (u === 255) return;
				for (var d = 0, f = a - 1; (u !== 0 || d < i) && f !== -1; f--, d++) u += s * o[f] >>> 0, o[f] = u % 256 >>> 0, u = u / 256 >>> 0;
				if (u !== 0) throw Error("Non-zero carry");
				i = d, t++;
			}
			if (e[t] !== " ") {
				for (var p = a - i; p !== a && o[p] === 0;) p++;
				for (var m = new Uint8Array(r + (a - p)), h = r; p !== a;) m[h++] = o[p++];
				return m;
			}
		}
	}
	function p(e) {
		var n = f(e);
		if (n) return n;
		throw Error(`Non-${t} character`);
	}
	return {
		encode: d,
		decodeUnsafe: f,
		decode: p
	};
}
var _l = gl, vl = (e) => {
	if (e instanceof Uint8Array && e.constructor.name === "Uint8Array") return e;
	if (e instanceof ArrayBuffer) return new Uint8Array(e);
	if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
	throw Error("Unknown type, must be binary type");
}, yl = (e) => new TextEncoder().encode(e), bl = (e) => new TextDecoder().decode(e), xl = class {
	constructor(e, t, n) {
		this.name = e, this.prefix = t, this.baseEncode = n;
	}
	encode(e) {
		if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
		throw Error("Unknown type, must be binary type");
	}
}, Sl = class {
	constructor(e, t, n) {
		if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw Error("Invalid prefix character");
		this.prefixCodePoint = t.codePointAt(0), this.baseDecode = n;
	}
	decode(e) {
		if (typeof e == "string") {
			if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
			return this.baseDecode(e.slice(this.prefix.length));
		} else throw Error("Can only multibase decode strings");
	}
	or(e) {
		return wl(this, e);
	}
}, Cl = class {
	constructor(e) {
		this.decoders = e;
	}
	or(e) {
		return wl(this, e);
	}
	decode(e) {
		let t = e[0], n = this.decoders[t];
		if (n) return n.decode(e);
		throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
	}
}, wl = (e, t) => new Cl({
	...e.decoders || { [e.prefix]: e },
	...t.decoders || { [t.prefix]: t }
}), Tl = class {
	constructor(e, t, n, r) {
		this.name = e, this.prefix = t, this.baseEncode = n, this.baseDecode = r, this.encoder = new xl(e, t, n), this.decoder = new Sl(e, t, r);
	}
	encode(e) {
		return this.encoder.encode(e);
	}
	decode(e) {
		return this.decoder.decode(e);
	}
}, El = ({ name: e, prefix: t, encode: n, decode: r }) => new Tl(e, t, n, r), Dl = ({ prefix: e, name: t, alphabet: n }) => {
	let { encode: r, decode: i } = _l(n, t);
	return El({
		prefix: e,
		name: t,
		encode: r,
		decode: (e) => vl(i(e))
	});
}, Ol = (e, t, n, r) => {
	let i = {};
	for (let e = 0; e < t.length; ++e) i[t[e]] = e;
	let a = e.length;
	for (; e[a - 1] === "=";) --a;
	let o = new Uint8Array(a * n / 8 | 0), s = 0, c = 0, l = 0;
	for (let t = 0; t < a; ++t) {
		let a = i[e[t]];
		if (a === void 0) throw SyntaxError(`Non-${r} character`);
		c = c << n | a, s += n, s >= 8 && (s -= 8, o[l++] = 255 & c >> s);
	}
	if (s >= n || 255 & c << 8 - s) throw SyntaxError("Unexpected end of data");
	return o;
}, kl = (e, t, n) => {
	let r = t[t.length - 1] === "=", i = (1 << n) - 1, a = "", o = 0, s = 0;
	for (let r = 0; r < e.length; ++r) for (s = s << 8 | e[r], o += 8; o > n;) o -= n, a += t[i & s >> o];
	if (o && (a += t[i & s << n - o]), r) for (; a.length * n & 7;) a += "=";
	return a;
}, Al = ({ name: e, prefix: t, bitsPerChar: n, alphabet: r }) => El({
	prefix: t,
	name: e,
	encode(e) {
		return kl(e, r, n);
	},
	decode(t) {
		return Ol(t, r, n, e);
	}
}), jl = /* @__PURE__ */ i({ identity: () => Ml }), Ml = El({
	prefix: "\0",
	name: "identity",
	encode: (e) => bl(e),
	decode: (e) => yl(e)
}), Nl = /* @__PURE__ */ i({ base2: () => Pl }), Pl = Al({
	prefix: "0",
	name: "base2",
	alphabet: "01",
	bitsPerChar: 1
}), Fl = /* @__PURE__ */ i({ base8: () => Il }), Il = Al({
	prefix: "7",
	name: "base8",
	alphabet: "01234567",
	bitsPerChar: 3
}), Ll = /* @__PURE__ */ i({ base10: () => Rl }), Rl = Dl({
	prefix: "9",
	name: "base10",
	alphabet: "0123456789"
}), zl = /* @__PURE__ */ i({
	base16: () => Bl,
	base16upper: () => Vl
}), Bl = Al({
	prefix: "f",
	name: "base16",
	alphabet: "0123456789abcdef",
	bitsPerChar: 4
}), Vl = Al({
	prefix: "F",
	name: "base16upper",
	alphabet: "0123456789ABCDEF",
	bitsPerChar: 4
}), Hl = /* @__PURE__ */ i({
	base32: () => Ul,
	base32hex: () => ql,
	base32hexpad: () => Yl,
	base32hexpadupper: () => Xl,
	base32hexupper: () => Jl,
	base32pad: () => Gl,
	base32padupper: () => Kl,
	base32upper: () => Wl,
	base32z: () => Zl
}), Ul = Al({
	prefix: "b",
	name: "base32",
	alphabet: "abcdefghijklmnopqrstuvwxyz234567",
	bitsPerChar: 5
}), Wl = Al({
	prefix: "B",
	name: "base32upper",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
	bitsPerChar: 5
}), Gl = Al({
	prefix: "c",
	name: "base32pad",
	alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
	bitsPerChar: 5
}), Kl = Al({
	prefix: "C",
	name: "base32padupper",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
	bitsPerChar: 5
}), ql = Al({
	prefix: "v",
	name: "base32hex",
	alphabet: "0123456789abcdefghijklmnopqrstuv",
	bitsPerChar: 5
}), Jl = Al({
	prefix: "V",
	name: "base32hexupper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
	bitsPerChar: 5
}), Yl = Al({
	prefix: "t",
	name: "base32hexpad",
	alphabet: "0123456789abcdefghijklmnopqrstuv=",
	bitsPerChar: 5
}), Xl = Al({
	prefix: "T",
	name: "base32hexpadupper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
	bitsPerChar: 5
}), Zl = Al({
	prefix: "h",
	name: "base32z",
	alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
	bitsPerChar: 5
}), Ql = /* @__PURE__ */ i({
	base36: () => $l,
	base36upper: () => eu
}), $l = Dl({
	prefix: "k",
	name: "base36",
	alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), eu = Dl({
	prefix: "K",
	name: "base36upper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), tu = /* @__PURE__ */ i({
	base58btc: () => nu,
	base58flickr: () => ru
}), nu = Dl({
	name: "base58btc",
	prefix: "z",
	alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), ru = Dl({
	name: "base58flickr",
	prefix: "Z",
	alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), iu = /* @__PURE__ */ i({
	base64: () => au,
	base64pad: () => ou,
	base64url: () => su,
	base64urlpad: () => cu
}), au = Al({
	prefix: "m",
	name: "base64",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	bitsPerChar: 6
}), ou = Al({
	prefix: "M",
	name: "base64pad",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	bitsPerChar: 6
}), su = Al({
	prefix: "u",
	name: "base64url",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
	bitsPerChar: 6
}), cu = Al({
	prefix: "U",
	name: "base64urlpad",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
	bitsPerChar: 6
}), lu = /* @__PURE__ */ i({ base256emoji: () => hu }), uu = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), du = uu.reduce((e, t, n) => (e[n] = t, e), []), fu = uu.reduce((e, t, n) => (e[t.codePointAt(0)] = n, e), []);
function pu(e) {
	return e.reduce((e, t) => (e += du[t], e), "");
}
function mu(e) {
	let t = [];
	for (let n of e) {
		let e = fu[n.codePointAt(0)];
		if (e === void 0) throw Error(`Non-base256emoji character: ${n}`);
		t.push(e);
	}
	return new Uint8Array(t);
}
var hu = El({
	prefix: "🚀",
	name: "base256emoji",
	encode: pu,
	decode: mu
}), gu = bu, _u = 128, vu = -128, yu = 2 ** 31;
function bu(e, t, n) {
	t = t || [], n = n || 0;
	for (var r = n; e >= yu;) t[n++] = e & 255 | _u, e /= 128;
	for (; e & vu;) t[n++] = e & 255 | _u, e >>>= 7;
	return t[n] = e | 0, bu.bytes = n - r + 1, t;
}
var xu = wu, Su = 128, Cu = 127;
function wu(e, t) {
	var n = 0, t = t || 0, r = 0, i = t, a, o = e.length;
	do {
		if (i >= o) throw wu.bytes = 0, RangeError("Could not decode varint");
		a = e[i++], n += r < 28 ? (a & Cu) << r : (a & Cu) * 2 ** r, r += 7;
	} while (a >= Su);
	return wu.bytes = i - t, n;
}
var Tu = 2 ** 7, Eu = 2 ** 14, Du = 2 ** 21, Ou = 2 ** 28, ku = 2 ** 35, Au = 2 ** 42, ju = 2 ** 49, Mu = 2 ** 56, Nu = 2 ** 63, Pu = {
	encode: gu,
	decode: xu,
	encodingLength: function(e) {
		return e < Tu ? 1 : e < Eu ? 2 : e < Du ? 3 : e < Ou ? 4 : e < ku ? 5 : e < Au ? 6 : e < ju ? 7 : e < Mu ? 8 : e < Nu ? 9 : 10;
	}
}, Fu = (e, t, n = 0) => (Pu.encode(e, t, n), t), Iu = (e) => Pu.encodingLength(e), Lu = (e, t) => {
	let n = t.byteLength, r = Iu(e), i = r + Iu(n), a = new Uint8Array(i + n);
	return Fu(e, a, 0), Fu(n, a, r), a.set(t, i), new Ru(e, n, t, a);
}, Ru = class {
	constructor(e, t, n, r) {
		this.code = e, this.size = t, this.digest = n, this.bytes = r;
	}
}, zu = ({ name: e, code: t, encode: n }) => new Bu(e, t, n), Bu = class {
	constructor(e, t, n) {
		this.name = e, this.code = t, this.encode = n;
	}
	digest(e) {
		if (e instanceof Uint8Array) {
			let t = this.encode(e);
			return t instanceof Uint8Array ? Lu(this.code, t) : t.then((e) => Lu(this.code, e));
		} else throw Error("Unknown type, must be binary type");
	}
}, Vu = /* @__PURE__ */ i({
	sha256: () => Uu,
	sha512: () => Wu
}), Hu = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t)), Uu = zu({
	name: "sha2-256",
	code: 18,
	encode: Hu("SHA-256")
}), Wu = zu({
	name: "sha2-512",
	code: 19,
	encode: Hu("SHA-512")
}), Gu = /* @__PURE__ */ i({ identity: () => Yu }), Ku = 0, qu = "identity", Ju = vl, Yu = {
	code: Ku,
	name: qu,
	encode: Ju,
	digest: (e) => Lu(Ku, Ju(e))
};
new TextEncoder(), new TextDecoder();
//#endregion
//#region node_modules/multiformats/esm/src/basics.js
var Xu = {
	...jl,
	...Nl,
	...Fl,
	...Ll,
	...zl,
	...Hl,
	...Ql,
	...tu,
	...iu,
	...lu
};
({
	...Vu,
	...Gu
});
//#endregion
//#region node_modules/uint8arrays/esm/src/util/bases.js
function Zu(e, t, n, r) {
	return {
		name: e,
		prefix: t,
		encoder: {
			name: e,
			prefix: t,
			encode: n
		},
		decoder: { decode: r }
	};
}
var Qu = Zu("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), $u = Zu("ascii", "a", (e) => {
	let t = "a";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return t;
}, (e) => {
	e = e.substring(1);
	let t = ml(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return t;
}), ed = {
	utf8: Qu,
	"utf-8": Qu,
	hex: Xu.base16,
	latin1: $u,
	ascii: $u,
	binary: $u,
	...Xu
};
//#endregion
//#region node_modules/uint8arrays/esm/src/from-string.js
function td(e, t = "utf8") {
	let n = ed[t];
	if (!n) throw Error(`Unsupported encoding "${t}"`);
	return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? pl(globalThis.Buffer.from(e, "utf-8")) : n.decoder.decode(`${n.prefix}${e}`);
}
//#endregion
//#region node_modules/uint8arrays/esm/src/to-string.js
function nd(e, t = "utf8") {
	let n = ed[t];
	if (!n) throw Error(`Unsupported encoding "${t}"`);
	return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("utf8") : n.encoder.encode(e).substring(1);
}
//#endregion
//#region node_modules/@walletconnect/relay-api/dist/index.es.js
var rd = {
	waku: {
		publish: "waku_publish",
		batchPublish: "waku_batchPublish",
		subscribe: "waku_subscribe",
		batchSubscribe: "waku_batchSubscribe",
		subscription: "waku_subscription",
		unsubscribe: "waku_unsubscribe",
		batchUnsubscribe: "waku_batchUnsubscribe",
		batchFetchMessages: "waku_batchFetchMessages"
	},
	irn: {
		publish: "irn_publish",
		batchPublish: "irn_batchPublish",
		subscribe: "irn_subscribe",
		batchSubscribe: "irn_batchSubscribe",
		subscription: "irn_subscription",
		unsubscribe: "irn_unsubscribe",
		batchUnsubscribe: "irn_batchUnsubscribe",
		batchFetchMessages: "irn_batchFetchMessages"
	},
	iridium: {
		publish: "iridium_publish",
		batchPublish: "iridium_batchPublish",
		subscribe: "iridium_subscribe",
		batchSubscribe: "iridium_batchSubscribe",
		subscription: "iridium_subscription",
		unsubscribe: "iridium_unsubscribe",
		batchUnsubscribe: "iridium_batchUnsubscribe",
		batchFetchMessages: "iridium_batchFetchMessages"
	}
}, id = /* @__PURE__ */ t(((e, t) => {
	var n = "Input must be an string, Buffer or Uint8Array";
	function r(e) {
		let t;
		if (e instanceof Uint8Array) t = e;
		else if (typeof e == "string") t = new TextEncoder().encode(e);
		else throw Error(n);
		return t;
	}
	function i(e) {
		return Array.prototype.map.call(e, function(e) {
			return (e < 16 ? "0" : "") + e.toString(16);
		}).join("");
	}
	function a(e) {
		return (4294967296 + e).toString(16).substring(1);
	}
	function o(e, t, n) {
		let r = "\n" + e + " = ";
		for (let i = 0; i < t.length; i += 2) {
			if (n === 32) r += a(t[i]).toUpperCase(), r += " ", r += a(t[i + 1]).toUpperCase();
			else if (n === 64) r += a(t[i + 1]).toUpperCase(), r += a(t[i]).toUpperCase();
			else throw Error("Invalid size " + n);
			i % 6 == 4 ? r += "\n" + Array(e.length + 4).join(" ") : i < t.length - 2 && (r += " ");
		}
		console.log(r);
	}
	function s(e, t, n) {
		let r = (/* @__PURE__ */ new Date()).getTime(), i = new Uint8Array(t);
		for (let e = 0; e < t; e++) i[e] = e % 256;
		let a = (/* @__PURE__ */ new Date()).getTime();
		console.log("Generated random input in " + (a - r) + "ms"), r = a;
		for (let a = 0; a < n; a++) {
			let n = e(i), a = (/* @__PURE__ */ new Date()).getTime(), o = a - r;
			r = a, console.log("Hashed in " + o + "ms: " + n.substring(0, 20) + "..."), console.log(Math.round(t / (1 << 20) / (o / 1e3) * 100) / 100 + " MB PER SECOND");
		}
	}
	t.exports = {
		normalizeInput: r,
		toHex: i,
		debugPrint: o,
		testSpeed: s
	};
})), ad = /* @__PURE__ */ t(((e, t) => {
	var n = id();
	function r(e, t, n) {
		let r = e[t] + e[n], i = e[t + 1] + e[n + 1];
		r >= 4294967296 && i++, e[t] = r, e[t + 1] = i;
	}
	function i(e, t, n, r) {
		let i = e[t] + n;
		n < 0 && (i += 4294967296);
		let a = e[t + 1] + r;
		i >= 4294967296 && a++, e[t] = i, e[t + 1] = a;
	}
	function a(e, t) {
		return e[t] ^ e[t + 1] << 8 ^ e[t + 2] << 16 ^ e[t + 3] << 24;
	}
	function o(e, t, n, a, o, s) {
		let c = u[o], d = u[o + 1], f = u[s], p = u[s + 1];
		r(l, e, t), i(l, e, c, d);
		let m = l[a] ^ l[e], h = l[a + 1] ^ l[e + 1];
		l[a] = h, l[a + 1] = m, r(l, n, a), m = l[t] ^ l[n], h = l[t + 1] ^ l[n + 1], l[t] = m >>> 24 ^ h << 8, l[t + 1] = h >>> 24 ^ m << 8, r(l, e, t), i(l, e, f, p), m = l[a] ^ l[e], h = l[a + 1] ^ l[e + 1], l[a] = m >>> 16 ^ h << 16, l[a + 1] = h >>> 16 ^ m << 16, r(l, n, a), m = l[t] ^ l[n], h = l[t + 1] ^ l[n + 1], l[t] = h >>> 31 ^ m << 1, l[t + 1] = m >>> 31 ^ h << 1;
	}
	var s = new Uint32Array([
		4089235720,
		1779033703,
		2227873595,
		3144134277,
		4271175723,
		1013904242,
		1595750129,
		2773480762,
		2917565137,
		1359893119,
		725511199,
		2600822924,
		4215389547,
		528734635,
		327033209,
		1541459225
	]), c = new Uint8Array([
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		14,
		10,
		4,
		8,
		9,
		15,
		13,
		6,
		1,
		12,
		0,
		2,
		11,
		7,
		5,
		3,
		11,
		8,
		12,
		0,
		5,
		2,
		15,
		13,
		10,
		14,
		3,
		6,
		7,
		1,
		9,
		4,
		7,
		9,
		3,
		1,
		13,
		12,
		11,
		14,
		2,
		6,
		5,
		10,
		4,
		0,
		15,
		8,
		9,
		0,
		5,
		7,
		2,
		4,
		10,
		15,
		14,
		1,
		11,
		12,
		6,
		8,
		3,
		13,
		2,
		12,
		6,
		10,
		0,
		11,
		8,
		3,
		4,
		13,
		7,
		5,
		15,
		14,
		1,
		9,
		12,
		5,
		1,
		15,
		14,
		13,
		4,
		10,
		0,
		7,
		6,
		3,
		9,
		2,
		8,
		11,
		13,
		11,
		7,
		14,
		12,
		1,
		3,
		9,
		5,
		0,
		15,
		4,
		8,
		6,
		2,
		10,
		6,
		15,
		14,
		9,
		11,
		3,
		0,
		8,
		12,
		2,
		13,
		7,
		1,
		4,
		10,
		5,
		10,
		2,
		8,
		4,
		7,
		6,
		1,
		5,
		15,
		11,
		9,
		14,
		3,
		12,
		13,
		0,
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		14,
		10,
		4,
		8,
		9,
		15,
		13,
		6,
		1,
		12,
		0,
		2,
		11,
		7,
		5,
		3
	].map(function(e) {
		return e * 2;
	})), l = new Uint32Array(32), u = new Uint32Array(32);
	function d(e, t) {
		let n = 0;
		for (n = 0; n < 16; n++) l[n] = e.h[n], l[n + 16] = s[n];
		for (l[24] ^= e.t, l[25] ^= e.t / 4294967296, t && (l[28] = ~l[28], l[29] = ~l[29]), n = 0; n < 32; n++) u[n] = a(e.b, 4 * n);
		for (n = 0; n < 12; n++) o(0, 8, 16, 24, c[n * 16 + 0], c[n * 16 + 1]), o(2, 10, 18, 26, c[n * 16 + 2], c[n * 16 + 3]), o(4, 12, 20, 28, c[n * 16 + 4], c[n * 16 + 5]), o(6, 14, 22, 30, c[n * 16 + 6], c[n * 16 + 7]), o(0, 10, 20, 30, c[n * 16 + 8], c[n * 16 + 9]), o(2, 12, 22, 24, c[n * 16 + 10], c[n * 16 + 11]), o(4, 14, 16, 26, c[n * 16 + 12], c[n * 16 + 13]), o(6, 8, 18, 28, c[n * 16 + 14], c[n * 16 + 15]);
		for (n = 0; n < 16; n++) e.h[n] = e.h[n] ^ l[n] ^ l[n + 16];
	}
	var f = new Uint8Array([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]);
	function p(e, t, n, r) {
		if (e === 0 || e > 64) throw Error("Illegal output length, expected 0 < length <= 64");
		if (t && t.length > 64) throw Error("Illegal key, expected Uint8Array with 0 < length <= 64");
		if (n && n.length !== 16) throw Error("Illegal salt, expected Uint8Array with length is 16");
		if (r && r.length !== 16) throw Error("Illegal personal, expected Uint8Array with length is 16");
		let i = {
			b: new Uint8Array(128),
			h: new Uint32Array(16),
			t: 0,
			c: 0,
			outlen: e
		};
		f.fill(0), f[0] = e, t && (f[1] = t.length), f[2] = 1, f[3] = 1, n && f.set(n, 32), r && f.set(r, 48);
		for (let e = 0; e < 16; e++) i.h[e] = s[e] ^ a(f, e * 4);
		return t && (m(i, t), i.c = 128), i;
	}
	function m(e, t) {
		for (let n = 0; n < t.length; n++) e.c === 128 && (e.t += e.c, d(e, !1), e.c = 0), e.b[e.c++] = t[n];
	}
	function h(e) {
		for (e.t += e.c; e.c < 128;) e.b[e.c++] = 0;
		d(e, !0);
		let t = new Uint8Array(e.outlen);
		for (let n = 0; n < e.outlen; n++) t[n] = e.h[n >> 2] >> 8 * (n & 3);
		return t;
	}
	function g(e, t, r, i, a) {
		r = r || 64, e = n.normalizeInput(e), i && (i = n.normalizeInput(i)), a && (a = n.normalizeInput(a));
		let o = p(r, t, i, a);
		return m(o, e), h(o);
	}
	function _(e, t, r, i, a) {
		let o = g(e, t, r, i, a);
		return n.toHex(o);
	}
	t.exports = {
		blake2b: g,
		blake2bHex: _,
		blake2bInit: p,
		blake2bUpdate: m,
		blake2bFinal: h
	};
})), od = /* @__PURE__ */ t(((e, t) => {
	var n = id();
	function r(e, t) {
		return e[t] ^ e[t + 1] << 8 ^ e[t + 2] << 16 ^ e[t + 3] << 24;
	}
	function i(e, t, n, r, i, o) {
		c[e] = c[e] + c[t] + i, c[r] = a(c[r] ^ c[e], 16), c[n] = c[n] + c[r], c[t] = a(c[t] ^ c[n], 12), c[e] = c[e] + c[t] + o, c[r] = a(c[r] ^ c[e], 8), c[n] = c[n] + c[r], c[t] = a(c[t] ^ c[n], 7);
	}
	function a(e, t) {
		return e >>> t ^ e << 32 - t;
	}
	var o = new Uint32Array([
		1779033703,
		3144134277,
		1013904242,
		2773480762,
		1359893119,
		2600822924,
		528734635,
		1541459225
	]), s = new Uint8Array([
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		14,
		10,
		4,
		8,
		9,
		15,
		13,
		6,
		1,
		12,
		0,
		2,
		11,
		7,
		5,
		3,
		11,
		8,
		12,
		0,
		5,
		2,
		15,
		13,
		10,
		14,
		3,
		6,
		7,
		1,
		9,
		4,
		7,
		9,
		3,
		1,
		13,
		12,
		11,
		14,
		2,
		6,
		5,
		10,
		4,
		0,
		15,
		8,
		9,
		0,
		5,
		7,
		2,
		4,
		10,
		15,
		14,
		1,
		11,
		12,
		6,
		8,
		3,
		13,
		2,
		12,
		6,
		10,
		0,
		11,
		8,
		3,
		4,
		13,
		7,
		5,
		15,
		14,
		1,
		9,
		12,
		5,
		1,
		15,
		14,
		13,
		4,
		10,
		0,
		7,
		6,
		3,
		9,
		2,
		8,
		11,
		13,
		11,
		7,
		14,
		12,
		1,
		3,
		9,
		5,
		0,
		15,
		4,
		8,
		6,
		2,
		10,
		6,
		15,
		14,
		9,
		11,
		3,
		0,
		8,
		12,
		2,
		13,
		7,
		1,
		4,
		10,
		5,
		10,
		2,
		8,
		4,
		7,
		6,
		1,
		5,
		15,
		11,
		9,
		14,
		3,
		12,
		13,
		0
	]), c = new Uint32Array(16), l = new Uint32Array(16);
	function u(e, t) {
		let n = 0;
		for (n = 0; n < 8; n++) c[n] = e.h[n], c[n + 8] = o[n];
		for (c[12] ^= e.t, c[13] ^= e.t / 4294967296, t && (c[14] = ~c[14]), n = 0; n < 16; n++) l[n] = r(e.b, 4 * n);
		for (n = 0; n < 10; n++) i(0, 4, 8, 12, l[s[n * 16 + 0]], l[s[n * 16 + 1]]), i(1, 5, 9, 13, l[s[n * 16 + 2]], l[s[n * 16 + 3]]), i(2, 6, 10, 14, l[s[n * 16 + 4]], l[s[n * 16 + 5]]), i(3, 7, 11, 15, l[s[n * 16 + 6]], l[s[n * 16 + 7]]), i(0, 5, 10, 15, l[s[n * 16 + 8]], l[s[n * 16 + 9]]), i(1, 6, 11, 12, l[s[n * 16 + 10]], l[s[n * 16 + 11]]), i(2, 7, 8, 13, l[s[n * 16 + 12]], l[s[n * 16 + 13]]), i(3, 4, 9, 14, l[s[n * 16 + 14]], l[s[n * 16 + 15]]);
		for (n = 0; n < 8; n++) e.h[n] ^= c[n] ^ c[n + 8];
	}
	function d(e, t) {
		if (!(e > 0 && e <= 32)) throw Error("Incorrect output length, should be in [1, 32]");
		let n = t ? t.length : 0;
		if (t && !(n > 0 && n <= 32)) throw Error("Incorrect key length, should be in [1, 32]");
		let r = {
			h: new Uint32Array(o),
			b: new Uint8Array(64),
			c: 0,
			t: 0,
			outlen: e
		};
		return r.h[0] ^= 16842752 ^ n << 8 ^ e, n > 0 && (f(r, t), r.c = 64), r;
	}
	function f(e, t) {
		for (let n = 0; n < t.length; n++) e.c === 64 && (e.t += e.c, u(e, !1), e.c = 0), e.b[e.c++] = t[n];
	}
	function p(e) {
		for (e.t += e.c; e.c < 64;) e.b[e.c++] = 0;
		u(e, !0);
		let t = new Uint8Array(e.outlen);
		for (let n = 0; n < e.outlen; n++) t[n] = e.h[n >> 2] >> 8 * (n & 3) & 255;
		return t;
	}
	function m(e, t, r) {
		r = r || 32, e = n.normalizeInput(e);
		let i = d(r, t);
		return f(i, e), p(i);
	}
	function h(e, t, r) {
		let i = m(e, t, r);
		return n.toHex(i);
	}
	t.exports = {
		blake2s: m,
		blake2sHex: h,
		blake2sInit: d,
		blake2sUpdate: f,
		blake2sFinal: p
	};
})), sd = /* @__PURE__ */ t(((e, t) => {
	var n = ad(), r = od();
	t.exports = {
		blake2b: n.blake2b,
		blake2bHex: n.blake2bHex,
		blake2bInit: n.blake2bInit,
		blake2bUpdate: n.blake2bUpdate,
		blake2bFinal: n.blake2bFinal,
		blake2s: r.blake2s,
		blake2sHex: r.blake2sHex,
		blake2sInit: r.blake2sInit,
		blake2sUpdate: r.blake2sUpdate,
		blake2sFinal: r.blake2sFinal
	};
})), cd = Ho(), ld = Uo(), ud = sd(), dd = ":";
function fd(e) {
	let [t, n] = e.split(dd);
	return {
		namespace: t,
		reference: n
	};
}
function pd(e, t) {
	return e.includes(":") ? [e] : t.chains || [];
}
var md = Object.defineProperty, hd = Object.defineProperties, gd = Object.getOwnPropertyDescriptors, _d = Object.getOwnPropertySymbols, vd = Object.prototype.hasOwnProperty, yd = Object.prototype.propertyIsEnumerable, bd = (e, t, n) => t in e ? md(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, xd = (e, t) => {
	for (var n in t || (t = {})) vd.call(t, n) && bd(e, n, t[n]);
	if (_d) for (var n of _d(t)) yd.call(t, n) && bd(e, n, t[n]);
	return e;
}, Sd = (e, t) => hd(e, gd(t)), Cd = (e, t, n) => bd(e, typeof t == "symbol" ? t : t + "", n), wd = {
	reactNative: "react-native",
	node: "node",
	browser: "browser",
	unknown: "unknown"
};
function Td() {
	return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Ed() {
	return !(0, cd.getDocument)() && !!(0, cd.getNavigator)() && navigator.product === "ReactNative";
}
function Dd() {
	return Ed() && typeof globalThis < "u" && typeof (globalThis == null ? void 0 : globalThis.Platform) < "u" && (globalThis == null ? void 0 : globalThis.Platform.OS) === "android";
}
function Od() {
	return Ed() && typeof globalThis < "u" && typeof (globalThis == null ? void 0 : globalThis.Platform) < "u" && (globalThis == null ? void 0 : globalThis.Platform.OS) === "ios";
}
function kd() {
	return !Td() && !!(0, cd.getNavigator)() && !!(0, cd.getDocument)();
}
function Ad() {
	return Ed() ? wd.reactNative : Td() ? wd.node : kd() ? wd.browser : wd.unknown;
}
function jd() {
	try {
		return Ed() && typeof globalThis < "u" && typeof (globalThis == null ? void 0 : globalThis.Application) < "u" ? globalThis.Application?.applicationId : void 0;
	} catch {
		return;
	}
}
function Md(e, t) {
	let n = new URLSearchParams(e);
	for (let e of Object.keys(t).sort()) if (t.hasOwnProperty(e)) {
		let r = t[e];
		r !== void 0 && n.set(e, r);
	}
	return n.toString();
}
function Nd(e) {
	var t, n;
	let r = Pd();
	try {
		return e != null && e.url && r.url && new URL(e.url).host !== new URL(r.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${e.url} differs from the actual page url:${r.url}. This is probably unintended and can lead to issues.`), e.url = r.url), (t = e?.icons) != null && t.length && e.icons.length > 0 && (e.icons = e.icons.filter((e) => e !== "")), Sd(xd(xd({}, r), e), {
			url: e?.url || r.url,
			name: e?.name || r.name,
			description: e?.description || r.description,
			icons: (n = e?.icons) != null && n.length && e.icons.length > 0 ? e.icons : r.icons
		});
	} catch (t) {
		return console.warn("Error populating app metadata", t), e || r;
	}
}
function Pd() {
	return (0, ld.getWindowMetadata)() || {
		name: "",
		description: "",
		url: "",
		icons: [""]
	};
}
function Fd() {
	if (Ad() === wd.reactNative && typeof globalThis < "u" && typeof (globalThis == null ? void 0 : globalThis.Platform) < "u") {
		let { OS: e, Version: t } = globalThis.Platform;
		return [e, t].join("-");
	}
	let e = Io();
	if (e === null) return "unknown";
	let t = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
	return e.type === "browser" ? [
		t,
		e.name,
		e.version
	].join("-") : [t, e.version].join("-");
}
function Id() {
	let e = Ad();
	return e === wd.browser ? [e, (0, cd.getLocation)()?.host || "unknown"].join(":") : e;
}
function Ld(e, t, n) {
	let r = Fd(), i = Id();
	return [
		[e, t].join("-"),
		["js", n].join("-"),
		r,
		i
	].join("/");
}
function Rd({ protocol: e, version: t, relayUrl: n, sdkVersion: r, auth: i, projectId: a, useOnCloseEvent: o, bundleId: s, packageName: c }) {
	let l = n.split("?"), u = {
		auth: i,
		ua: Ld(e, t, r),
		projectId: a,
		useOnCloseEvent: o || void 0,
		packageName: c || void 0,
		bundleId: s || void 0
	}, d = Md(l[1] || "", u);
	return l[0] + "?" + d;
}
function zd(e, t) {
	return e.filter((e) => t.includes(e)).length === e.length;
}
function Bd(e) {
	return Object.fromEntries(e.entries());
}
function Vd(e) {
	return new Map(Object.entries(e));
}
function Hd(e = L.FIVE_MINUTES, t) {
	let n = (0, L.toMiliseconds)(e || L.FIVE_MINUTES), r, i, a, o;
	return {
		resolve: (e) => {
			a && r && (clearTimeout(a), r(e), o = Promise.resolve(e));
		},
		reject: (e) => {
			a && i && (clearTimeout(a), i(e));
		},
		done: () => new Promise((e, s) => {
			if (o) return e(o);
			a = setTimeout(() => {
				let e = Error(t);
				o = Promise.reject(e), s(e);
			}, n), r = e, i = s;
		})
	};
}
function Ud(e, t, n) {
	return new Promise(async (r, i) => {
		let a = setTimeout(() => i(Error(n)), t);
		try {
			r(await e);
		} catch (e) {
			i(e);
		}
		clearTimeout(a);
	});
}
function Wd(e, t) {
	if (typeof t == "string" && t.startsWith(`${e}:`)) return t;
	if (e.toLowerCase() === "topic") {
		if (typeof t != "string") throw Error("Value must be \"string\" for expirer target type: topic");
		return `topic:${t}`;
	} else if (e.toLowerCase() === "id") {
		if (typeof t != "number") throw Error("Value must be \"number\" for expirer target type: id");
		return `id:${t}`;
	}
	throw Error(`Unknown expirer target type: ${e}`);
}
function Gd(e) {
	return Wd("topic", e);
}
function Kd(e) {
	return Wd("id", e);
}
function qd(e) {
	let [t, n] = e.split(":"), r = {
		id: void 0,
		topic: void 0
	};
	if (t === "topic" && typeof n == "string") r.topic = n;
	else if (t === "id" && Number.isInteger(Number(n))) r.id = Number(n);
	else throw Error(`Invalid target, expected id:number or topic:string, got ${t}:${n}`);
	return r;
}
function Jd(e, t) {
	return (0, L.fromMiliseconds)((t || Date.now()) + (0, L.toMiliseconds)(e));
}
function Yd(e) {
	return Date.now() >= (0, L.toMiliseconds)(e);
}
function B(e, t) {
	return `${e}${t ? `:${t}` : ""}`;
}
function Xd(e = [], t = []) {
	return [...new Set([...e, ...t])];
}
async function Zd({ id: e, topic: t, wcDeepLink: n }) {
	var r;
	try {
		if (!n) return;
		let i = (typeof n == "string" ? JSON.parse(n) : n)?.href;
		if (typeof i != "string") return;
		let a = Qd(i, e, t), o = Ad();
		if (o === wd.browser) {
			if (!((r = (0, cd.getDocument)()) != null && r.hasFocus())) {
				console.warn("Document does not have focus, skipping deeplink.");
				return;
			}
			$d(a);
		} else o === wd.reactNative && typeof (globalThis == null ? void 0 : globalThis.Linking) < "u" && await globalThis.Linking.openURL(a);
	} catch (e) {
		console.error(e);
	}
}
function Qd(e, t, n) {
	let r = `requestId=${t}&sessionTopic=${n}`;
	e.endsWith("/") && (e = e.slice(0, -1));
	let i = `${e}`;
	if (e.startsWith("https://t.me")) {
		let t = e.includes("?") ? "&startapp=" : "?startapp=";
		i = `${i}${t}${sf(r, !0)}`;
	} else i = `${i}/wc?${r}`;
	return i;
}
function $d(e) {
	let t = "_self";
	of() ? t = "_top" : (af() || e.startsWith("https://") || e.startsWith("http://")) && (t = "_blank"), window.open(e, t, "noreferrer noopener");
}
async function ef(e, t) {
	let n = "";
	try {
		if (kd() && (n = localStorage.getItem(t), n)) return n;
		n = await e.getItem(t);
	} catch (e) {
		console.error(e);
	}
	return n;
}
function tf(e, t) {
	if (!e.includes(t)) return null;
	let n = e.split(/([&,?,=])/);
	return n[n.indexOf(t) + 2];
}
function nf() {
	return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
		let t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
function rf() {
	return typeof process < "u" && process.env.IS_VITEST === "true";
}
function af() {
	return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function of() {
	try {
		return window.self !== window.top;
	} catch {
		return !1;
	}
}
function sf(e, t = !1) {
	let n = Buffer.from(e).toString("base64");
	return t ? n.replace(/[=]/g, "") : n;
}
function cf(e) {
	return Buffer.from(e, "base64").toString("utf-8");
}
function lf(e) {
	return new Promise((t) => setTimeout(t, e));
}
var uf = class {
	constructor({ limit: e }) {
		Cd(this, "limit"), Cd(this, "set"), this.limit = e, this.set = /* @__PURE__ */ new Set();
	}
	add(e) {
		if (!this.set.has(e)) {
			if (this.set.size >= this.limit) {
				let e = this.set.values().next().value;
				e && this.set.delete(e);
			}
			this.set.add(e);
		}
	}
	has(e) {
		return this.set.has(e);
	}
}, df = BigInt(2 ** 32 - 1), ff = BigInt(32);
function pf(e, t = !1) {
	return t ? {
		h: Number(e & df),
		l: Number(e >> ff & df)
	} : {
		h: Number(e >> ff & df) | 0,
		l: Number(e & df) | 0
	};
}
function mf(e, t = !1) {
	let n = e.length, r = new Uint32Array(n), i = new Uint32Array(n);
	for (let a = 0; a < n; a++) {
		let { h: n, l: o } = pf(e[a], t);
		[r[a], i[a]] = [n, o];
	}
	return [r, i];
}
var hf = (e, t, n) => e >>> n, gf = (e, t, n) => e << 32 - n | t >>> n, _f = (e, t, n) => e >>> n | t << 32 - n, vf = (e, t, n) => e << 32 - n | t >>> n, yf = (e, t, n) => e << 64 - n | t >>> n - 32, bf = (e, t, n) => e >>> n - 32 | t << 64 - n, xf = (e, t) => t, Sf = (e, t) => e, Cf = (e, t, n) => e << n | t >>> 32 - n, wf = (e, t, n) => t << n | e >>> 32 - n, Tf = (e, t, n) => t << n - 32 | e >>> 64 - n, Ef = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Df(e, t, n, r) {
	let i = (t >>> 0) + (r >>> 0);
	return {
		h: e + n + (i / 2 ** 32 | 0) | 0,
		l: i | 0
	};
}
var Of = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), kf = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, Af = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), jf = (e, t, n, r, i) => t + n + r + i + (e / 2 ** 32 | 0) | 0, Mf = (e, t, n, r, i) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0), Nf = (e, t, n, r, i, a) => t + n + r + i + a + (e / 2 ** 32 | 0) | 0, Pf = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Ff(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function If(e) {
	if (!Number.isSafeInteger(e) || e < 0) throw Error("positive integer expected, got " + e);
}
function Lf(e, ...t) {
	if (!Ff(e)) throw Error("Uint8Array expected");
	if (t.length > 0 && !t.includes(e.length)) throw Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function Rf(e) {
	if (typeof e != "function" || typeof e.create != "function") throw Error("Hash should be wrapped by utils.createHasher");
	If(e.outputLen), If(e.blockLen);
}
function zf(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function Bf(e, t) {
	Lf(e);
	let n = t.outputLen;
	if (e.length < n) throw Error("digestInto() expects output buffer of length at least " + n);
}
function Vf(e) {
	return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function Hf(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function Uf(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Wf(e, t) {
	return e << 32 - t | e >>> t;
}
var Gf = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Kf(e) {
	return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
}
var qf = Gf ? (e) => e : (e) => Kf(e);
function Jf(e) {
	for (let t = 0; t < e.length; t++) e[t] = Kf(e[t]);
	return e;
}
var Yf = Gf ? (e) => e : Jf, Xf = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Zf = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Qf(e) {
	if (Lf(e), Xf) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += Zf[e[n]];
	return t;
}
var $f = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function ep(e) {
	if (e >= $f._0 && e <= $f._9) return e - $f._0;
	if (e >= $f.A && e <= $f.F) return e - ($f.A - 10);
	if (e >= $f.a && e <= $f.f) return e - ($f.a - 10);
}
function tp(e) {
	if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
	if (Xf) return Uint8Array.fromHex(e);
	let t = e.length, n = t / 2;
	if (t % 2) throw Error("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = ep(e.charCodeAt(i)), a = ep(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw Error("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function np(e) {
	if (typeof e != "string") throw Error("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
function rp(e) {
	return typeof e == "string" && (e = np(e)), Lf(e), e;
}
function ip(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		Lf(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
var ap = class {};
function op(e) {
	let t = (t) => e().update(rp(t)).digest(), n = e();
	return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function sp(e) {
	let t = (t, n) => e(n).update(rp(t)).digest(), n = e({});
	return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (t) => e(t), t;
}
function cp(e = 32) {
	if (Pf && typeof Pf.getRandomValues == "function") return Pf.getRandomValues(new Uint8Array(e));
	if (Pf && typeof Pf.randomBytes == "function") return Uint8Array.from(Pf.randomBytes(e));
	throw Error("crypto.getRandomValues must be defined");
}
var lp = BigInt(0), up = BigInt(1), dp = BigInt(2), fp = BigInt(7), pp = BigInt(256), mp = BigInt(113), hp = [], gp = [], _p = [];
for (let e = 0, t = up, n = 1, r = 0; e < 24; e++) {
	[n, r] = [r, (2 * n + 3 * r) % 5], hp.push(2 * (5 * r + n)), gp.push((e + 1) * (e + 2) / 2 % 64);
	let i = lp;
	for (let e = 0; e < 7; e++) t = (t << up ^ (t >> fp) * mp) % pp, t & dp && (i ^= up << (up << BigInt(e)) - up);
	_p.push(i);
}
var vp = mf(_p, !0), yp = vp[0], bp = vp[1], xp = (e, t, n) => n > 32 ? Tf(e, t, n) : Cf(e, t, n), Sp = (e, t, n) => n > 32 ? Ef(e, t, n) : wf(e, t, n);
function Cp(e, t = 24) {
	let n = new Uint32Array(10);
	for (let r = 24 - t; r < 24; r++) {
		for (let t = 0; t < 10; t++) n[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
		for (let t = 0; t < 10; t += 2) {
			let r = (t + 8) % 10, i = (t + 2) % 10, a = n[i], o = n[i + 1], s = xp(a, o, 1) ^ n[r], c = Sp(a, o, 1) ^ n[r + 1];
			for (let n = 0; n < 50; n += 10) e[t + n] ^= s, e[t + n + 1] ^= c;
		}
		let t = e[2], i = e[3];
		for (let n = 0; n < 24; n++) {
			let r = gp[n], a = xp(t, i, r), o = Sp(t, i, r), s = hp[n];
			t = e[s], i = e[s + 1], e[s] = a, e[s + 1] = o;
		}
		for (let t = 0; t < 50; t += 10) {
			for (let r = 0; r < 10; r++) n[r] = e[t + r];
			for (let r = 0; r < 10; r++) e[t + r] ^= ~n[(r + 2) % 10] & n[(r + 4) % 10];
		}
		e[0] ^= yp[r], e[1] ^= bp[r];
	}
	Hf(n);
}
var wp = class e extends ap {
	constructor(e, t, n, r = !1, i = 24) {
		if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = e, this.suffix = t, this.outputLen = n, this.enableXOF = r, this.rounds = i, If(n), !(0 < e && e < 200)) throw Error("only keccak-f1600 function is supported");
		this.state = new Uint8Array(200), this.state32 = Vf(this.state);
	}
	clone() {
		return this._cloneInto();
	}
	keccak() {
		Yf(this.state32), Cp(this.state32, this.rounds), Yf(this.state32), this.posOut = 0, this.pos = 0;
	}
	update(e) {
		zf(this), e = rp(e), Lf(e);
		let { blockLen: t, state: n } = this, r = e.length;
		for (let i = 0; i < r;) {
			let a = Math.min(t - this.pos, r - i);
			for (let t = 0; t < a; t++) n[this.pos++] ^= e[i++];
			this.pos === t && this.keccak();
		}
		return this;
	}
	finish() {
		if (this.finished) return;
		this.finished = !0;
		let { state: e, suffix: t, pos: n, blockLen: r } = this;
		e[n] ^= t, t & 128 && n === r - 1 && this.keccak(), e[r - 1] ^= 128, this.keccak();
	}
	writeInto(e) {
		zf(this, !1), Lf(e), this.finish();
		let t = this.state, { blockLen: n } = this;
		for (let r = 0, i = e.length; r < i;) {
			this.posOut >= n && this.keccak();
			let a = Math.min(n - this.posOut, i - r);
			e.set(t.subarray(this.posOut, this.posOut + a), r), this.posOut += a, r += a;
		}
		return e;
	}
	xofInto(e) {
		if (!this.enableXOF) throw Error("XOF is not possible for this instance");
		return this.writeInto(e);
	}
	xof(e) {
		return If(e), this.xofInto(new Uint8Array(e));
	}
	digestInto(e) {
		if (Bf(e, this), this.finished) throw Error("digest() was already called");
		return this.writeInto(e), this.destroy(), e;
	}
	digest() {
		return this.digestInto(new Uint8Array(this.outputLen));
	}
	destroy() {
		this.destroyed = !0, Hf(this.state);
	}
	_cloneInto(t) {
		let { blockLen: n, suffix: r, outputLen: i, rounds: a, enableXOF: o } = this;
		return t || (t = new e(n, r, i, o, a)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = a, t.suffix = r, t.outputLen = i, t.enableXOF = o, t.destroyed = this.destroyed, t;
	}
}, Tp = ((e, t, n) => op(() => new wp(t, e, n)))(1, 136, 256 / 8);
function Ep(e, t, n, r) {
	if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
	let i = BigInt(32), a = BigInt(4294967295), o = Number(n >> i & a), s = Number(n & a), c = r ? 4 : 0, l = r ? 0 : 4;
	e.setUint32(t + c, o, r), e.setUint32(t + l, s, r);
}
function Dp(e, t, n) {
	return e & t ^ ~e & n;
}
function Op(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var kp = class extends ap {
	constructor(e, t, n, r) {
		super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = Uf(this.buffer);
	}
	update(e) {
		zf(this), e = rp(e), Lf(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length;
		for (let a = 0; a < i;) {
			let o = Math.min(r - this.pos, i - a);
			if (o === r) {
				let t = Uf(e);
				for (; r <= i - a; a += r) this.process(t, a);
				continue;
			}
			n.set(e.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === r && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		zf(this), Bf(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, Hf(this.buffer.subarray(a)), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		Ep(n, r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = Uf(e), s = this.outputLen;
		if (s % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
		let c = s / 4, l = this.get();
		if (c > l.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
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
}, Ap = Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), jp = Uint32Array.from([
	3418070365,
	3238371032,
	1654270250,
	914150663,
	2438529370,
	812702999,
	355462360,
	4144912697,
	1731405415,
	4290775857,
	2394180231,
	1750603025,
	3675008525,
	1694076839,
	1203062813,
	3204075428
]), Mp = Uint32Array.from([
	1779033703,
	4089235720,
	3144134277,
	2227873595,
	1013904242,
	4271175723,
	2773480762,
	1595750129,
	1359893119,
	2917565137,
	2600822924,
	725511199,
	528734635,
	4215389547,
	1541459225,
	327033209
]), Np = Uint32Array.from([
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
]), Pp = new Uint32Array(64), Fp = class extends kp {
	constructor(e = 32) {
		super(64, e, 8, !1), this.A = Ap[0] | 0, this.B = Ap[1] | 0, this.C = Ap[2] | 0, this.D = Ap[3] | 0, this.E = Ap[4] | 0, this.F = Ap[5] | 0, this.G = Ap[6] | 0, this.H = Ap[7] | 0;
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
		for (let n = 0; n < 16; n++, t += 4) Pp[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = Pp[e - 15], n = Pp[e - 2], r = Wf(t, 7) ^ Wf(t, 18) ^ t >>> 3;
			Pp[e] = (Wf(n, 17) ^ Wf(n, 19) ^ n >>> 10) + Pp[e - 7] + r + Pp[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = Wf(o, 6) ^ Wf(o, 11) ^ Wf(o, 25), u = l + t + Dp(o, s, c) + Np[e] + Pp[e] | 0, d = (Wf(n, 2) ^ Wf(n, 13) ^ Wf(n, 22)) + Op(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		Hf(Pp);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0, 0, 0, 0), Hf(this.buffer);
	}
}, Ip = mf((/* @__PURE__ */ "0x428a2f98d728ae22.0x7137449123ef65cd.0xb5c0fbcfec4d3b2f.0xe9b5dba58189dbbc.0x3956c25bf348b538.0x59f111f1b605d019.0x923f82a4af194f9b.0xab1c5ed5da6d8118.0xd807aa98a3030242.0x12835b0145706fbe.0x243185be4ee4b28c.0x550c7dc3d5ffb4e2.0x72be5d74f27b896f.0x80deb1fe3b1696b1.0x9bdc06a725c71235.0xc19bf174cf692694.0xe49b69c19ef14ad2.0xefbe4786384f25e3.0x0fc19dc68b8cd5b5.0x240ca1cc77ac9c65.0x2de92c6f592b0275.0x4a7484aa6ea6e483.0x5cb0a9dcbd41fbd4.0x76f988da831153b5.0x983e5152ee66dfab.0xa831c66d2db43210.0xb00327c898fb213f.0xbf597fc7beef0ee4.0xc6e00bf33da88fc2.0xd5a79147930aa725.0x06ca6351e003826f.0x142929670a0e6e70.0x27b70a8546d22ffc.0x2e1b21385c26c926.0x4d2c6dfc5ac42aed.0x53380d139d95b3df.0x650a73548baf63de.0x766a0abb3c77b2a8.0x81c2c92e47edaee6.0x92722c851482353b.0xa2bfe8a14cf10364.0xa81a664bbc423001.0xc24b8b70d0f89791.0xc76c51a30654be30.0xd192e819d6ef5218.0xd69906245565a910.0xf40e35855771202a.0x106aa07032bbd1b8.0x19a4c116b8d2d0c8.0x1e376c085141ab53.0x2748774cdf8eeb99.0x34b0bcb5e19b48a8.0x391c0cb3c5c95a63.0x4ed8aa4ae3418acb.0x5b9cca4f7763e373.0x682e6ff3d6b2b8a3.0x748f82ee5defb2fc.0x78a5636f43172f60.0x84c87814a1f0ab72.0x8cc702081a6439ec.0x90befffa23631e28.0xa4506cebde82bde9.0xbef9a3f7b2c67915.0xc67178f2e372532b.0xca273eceea26619c.0xd186b8c721c0c207.0xeada7dd6cde0eb1e.0xf57d4f7fee6ed178.0x06f067aa72176fba.0x0a637dc5a2c898a6.0x113f9804bef90dae.0x1b710b35131c471b.0x28db77f523047d84.0x32caab7b40c72493.0x3c9ebe0a15c9bebc.0x431d67c49c100d4c.0x4cc5d4becb3e42b6.0x597f299cfc657e2a.0x5fcb6fab3ad6faec.0x6c44198c4a475817".split(".")).map((e) => BigInt(e))), Lp = Ip[0], Rp = Ip[1], zp = new Uint32Array(80), Bp = new Uint32Array(80), Vp = class extends kp {
	constructor(e = 64) {
		super(128, e, 16, !1), this.Ah = Mp[0] | 0, this.Al = Mp[1] | 0, this.Bh = Mp[2] | 0, this.Bl = Mp[3] | 0, this.Ch = Mp[4] | 0, this.Cl = Mp[5] | 0, this.Dh = Mp[6] | 0, this.Dl = Mp[7] | 0, this.Eh = Mp[8] | 0, this.El = Mp[9] | 0, this.Fh = Mp[10] | 0, this.Fl = Mp[11] | 0, this.Gh = Mp[12] | 0, this.Gl = Mp[13] | 0, this.Hh = Mp[14] | 0, this.Hl = Mp[15] | 0;
	}
	get() {
		let { Ah: e, Al: t, Bh: n, Bl: r, Ch: i, Cl: a, Dh: o, Dl: s, Eh: c, El: l, Fh: u, Fl: d, Gh: f, Gl: p, Hh: m, Hl: h } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s,
			c,
			l,
			u,
			d,
			f,
			p,
			m,
			h
		];
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.Ah = e | 0, this.Al = t | 0, this.Bh = n | 0, this.Bl = r | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = s | 0, this.Eh = c | 0, this.El = l | 0, this.Fh = u | 0, this.Fl = d | 0, this.Gh = f | 0, this.Gl = p | 0, this.Hh = m | 0, this.Hl = h | 0;
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) zp[n] = e.getUint32(t), Bp[n] = e.getUint32(t += 4);
		for (let e = 16; e < 80; e++) {
			let t = zp[e - 15] | 0, n = Bp[e - 15] | 0, r = _f(t, n, 1) ^ _f(t, n, 8) ^ hf(t, n, 7), i = vf(t, n, 1) ^ vf(t, n, 8) ^ gf(t, n, 7), a = zp[e - 2] | 0, o = Bp[e - 2] | 0, s = _f(a, o, 19) ^ yf(a, o, 61) ^ hf(a, o, 6), c = Af(i, vf(a, o, 19) ^ bf(a, o, 61) ^ gf(a, o, 6), Bp[e - 7], Bp[e - 16]);
			zp[e] = jf(c, r, s, zp[e - 7], zp[e - 16]) | 0, Bp[e] = c | 0;
		}
		let { Ah: n, Al: r, Bh: i, Bl: a, Ch: o, Cl: s, Dh: c, Dl: l, Eh: u, El: d, Fh: f, Fl: p, Gh: m, Gl: h, Hh: g, Hl: _ } = this;
		for (let e = 0; e < 80; e++) {
			let t = _f(u, d, 14) ^ _f(u, d, 18) ^ yf(u, d, 41), v = vf(u, d, 14) ^ vf(u, d, 18) ^ bf(u, d, 41), y = u & f ^ ~u & m, b = d & p ^ ~d & h, x = Mf(_, v, b, Rp[e], Bp[e]), S = Nf(x, g, t, y, Lp[e], zp[e]), C = x | 0, w = _f(n, r, 28) ^ yf(n, r, 34) ^ yf(n, r, 39), T = vf(n, r, 28) ^ bf(n, r, 34) ^ bf(n, r, 39), E = n & i ^ n & o ^ i & o, D = r & a ^ r & s ^ a & s;
			g = m | 0, _ = h | 0, m = f | 0, h = p | 0, f = u | 0, p = d | 0, {h: u, l: d} = Df(c | 0, l | 0, S | 0, C | 0), c = o | 0, l = s | 0, o = i | 0, s = a | 0, i = n | 0, a = r | 0;
			let O = Of(C, T, D);
			n = kf(O, S, w, E), r = O | 0;
		}
		({h: n, l: r} = Df(this.Ah | 0, this.Al | 0, n | 0, r | 0)), {h: i, l: a} = Df(this.Bh | 0, this.Bl | 0, i | 0, a | 0), {h: o, l: s} = Df(this.Ch | 0, this.Cl | 0, o | 0, s | 0), {h: c, l: l} = Df(this.Dh | 0, this.Dl | 0, c | 0, l | 0), {h: u, l: d} = Df(this.Eh | 0, this.El | 0, u | 0, d | 0), {h: f, l: p} = Df(this.Fh | 0, this.Fl | 0, f | 0, p | 0), {h: m, l: h} = Df(this.Gh | 0, this.Gl | 0, m | 0, h | 0), {h: g, l: _} = Df(this.Hh | 0, this.Hl | 0, g | 0, _ | 0), this.set(n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _);
	}
	roundClean() {
		Hf(zp, Bp);
	}
	destroy() {
		Hf(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
}, Hp = class extends Vp {
	constructor() {
		super(48), this.Ah = jp[0] | 0, this.Al = jp[1] | 0, this.Bh = jp[2] | 0, this.Bl = jp[3] | 0, this.Ch = jp[4] | 0, this.Cl = jp[5] | 0, this.Dh = jp[6] | 0, this.Dl = jp[7] | 0, this.Eh = jp[8] | 0, this.El = jp[9] | 0, this.Fh = jp[10] | 0, this.Fl = jp[11] | 0, this.Gh = jp[12] | 0, this.Gl = jp[13] | 0, this.Hh = jp[14] | 0, this.Hl = jp[15] | 0;
	}
}, Up = Uint32Array.from([
	573645204,
	4230739756,
	2673172387,
	3360449730,
	596883563,
	1867755857,
	2520282905,
	1497426621,
	2519219938,
	2827943907,
	3193839141,
	1401305490,
	721525244,
	746961066,
	246885852,
	2177182882
]), Wp = class extends Vp {
	constructor() {
		super(32), this.Ah = Up[0] | 0, this.Al = Up[1] | 0, this.Bh = Up[2] | 0, this.Bl = Up[3] | 0, this.Ch = Up[4] | 0, this.Cl = Up[5] | 0, this.Dh = Up[6] | 0, this.Dl = Up[7] | 0, this.Eh = Up[8] | 0, this.El = Up[9] | 0, this.Fh = Up[10] | 0, this.Fl = Up[11] | 0, this.Gh = Up[12] | 0, this.Gl = Up[13] | 0, this.Hh = Up[14] | 0, this.Hl = Up[15] | 0;
	}
}, Gp = op(() => new Fp()), Kp = op(() => new Vp()), qp = op(() => new Hp()), Jp = op(() => new Wp()), Yp = Uint8Array.from([
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9,
	12,
	5,
	1,
	15,
	14,
	13,
	4,
	10,
	0,
	7,
	6,
	3,
	9,
	2,
	8,
	11,
	13,
	11,
	7,
	14,
	12,
	1,
	3,
	9,
	5,
	0,
	15,
	4,
	8,
	6,
	2,
	10,
	6,
	15,
	14,
	9,
	11,
	3,
	0,
	8,
	12,
	2,
	13,
	7,
	1,
	4,
	10,
	5,
	10,
	2,
	8,
	4,
	7,
	6,
	1,
	5,
	15,
	11,
	9,
	14,
	3,
	12,
	13,
	0,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9
]), Xp = Uint32Array.from([
	4089235720,
	1779033703,
	2227873595,
	3144134277,
	4271175723,
	1013904242,
	1595750129,
	2773480762,
	2917565137,
	1359893119,
	725511199,
	2600822924,
	4215389547,
	528734635,
	327033209,
	1541459225
]), V = new Uint32Array(32);
function Zp(e, t, n, r, i, a) {
	let o = i[a], s = i[a + 1], c = V[2 * e], l = V[2 * e + 1], u = V[2 * t], d = V[2 * t + 1], f = V[2 * n], p = V[2 * n + 1], m = V[2 * r], h = V[2 * r + 1], g = Of(c, u, o);
	l = kf(g, l, d, s), c = g | 0, {Dh: h, Dl: m} = {
		Dh: h ^ l,
		Dl: m ^ c
	}, {Dh: h, Dl: m} = {
		Dh: xf(h, m),
		Dl: Sf(h)
	}, {h: p, l: f} = Df(p, f, h, m), {Bh: d, Bl: u} = {
		Bh: d ^ p,
		Bl: u ^ f
	}, {Bh: d, Bl: u} = {
		Bh: _f(d, u, 24),
		Bl: vf(d, u, 24)
	}, V[2 * e] = c, V[2 * e + 1] = l, V[2 * t] = u, V[2 * t + 1] = d, V[2 * n] = f, V[2 * n + 1] = p, V[2 * r] = m, V[2 * r + 1] = h;
}
function Qp(e, t, n, r, i, a) {
	let o = i[a], s = i[a + 1], c = V[2 * e], l = V[2 * e + 1], u = V[2 * t], d = V[2 * t + 1], f = V[2 * n], p = V[2 * n + 1], m = V[2 * r], h = V[2 * r + 1], g = Of(c, u, o);
	l = kf(g, l, d, s), c = g | 0, {Dh: h, Dl: m} = {
		Dh: h ^ l,
		Dl: m ^ c
	}, {Dh: h, Dl: m} = {
		Dh: _f(h, m, 16),
		Dl: vf(h, m, 16)
	}, {h: p, l: f} = Df(p, f, h, m), {Bh: d, Bl: u} = {
		Bh: d ^ p,
		Bl: u ^ f
	}, {Bh: d, Bl: u} = {
		Bh: yf(d, u, 63),
		Bl: bf(d, u, 63)
	}, V[2 * e] = c, V[2 * e + 1] = l, V[2 * t] = u, V[2 * t + 1] = d, V[2 * n] = f, V[2 * n + 1] = p, V[2 * r] = m, V[2 * r + 1] = h;
}
function $p(e, t = {}, n, r, i) {
	if (If(n), e < 0 || e > n) throw Error("outputLen bigger than keyLen");
	let { key: a, salt: o, personalization: s } = t;
	if (a !== void 0 && (a.length < 1 || a.length > n)) throw Error("key length must be undefined or 1.." + n);
	if (o !== void 0 && o.length !== r) throw Error("salt must be undefined or " + r);
	if (s !== void 0 && s.length !== i) throw Error("personalization must be undefined or " + i);
}
var em = class extends ap {
	constructor(e, t) {
		super(), this.finished = !1, this.destroyed = !1, this.length = 0, this.pos = 0, If(e), If(t), this.blockLen = e, this.outputLen = t, this.buffer = new Uint8Array(e), this.buffer32 = Vf(this.buffer);
	}
	update(e) {
		zf(this), e = rp(e), Lf(e);
		let { blockLen: t, buffer: n, buffer32: r } = this, i = e.length, a = e.byteOffset, o = e.buffer;
		for (let s = 0; s < i;) {
			this.pos === t && (Yf(r), this.compress(r, 0, !1), Yf(r), this.pos = 0);
			let c = Math.min(t - this.pos, i - s), l = a + s;
			if (c === t && !(l % 4) && s + c < i) {
				let e = new Uint32Array(o, l, Math.floor((i - s) / 4));
				Yf(e);
				for (let n = 0; s + t < i; n += r.length, s += t) this.length += t, this.compress(e, n, !1);
				Yf(e);
				continue;
			}
			n.set(e.subarray(s, s + c), this.pos), this.pos += c, this.length += c, s += c;
		}
		return this;
	}
	digestInto(e) {
		zf(this), Bf(e, this);
		let { pos: t, buffer32: n } = this;
		this.finished = !0, Hf(this.buffer.subarray(t)), Yf(n), this.compress(n, 0, !0), Yf(n);
		let r = Vf(e);
		this.get().forEach((e, t) => r[t] = qf(e));
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneInto(e) {
		let { buffer: t, length: n, finished: r, destroyed: i, outputLen: a, pos: o } = this;
		return e || (e = new this.constructor({ dkLen: a })), e.set(...this.get()), e.buffer.set(t), e.destroyed = i, e.finished = r, e.length = n, e.pos = o, e.outputLen = a, e;
	}
	clone() {
		return this._cloneInto();
	}
}, tm = class extends em {
	constructor(e = {}) {
		let t = e.dkLen === void 0 ? 64 : e.dkLen;
		super(128, t), this.v0l = Xp[0] | 0, this.v0h = Xp[1] | 0, this.v1l = Xp[2] | 0, this.v1h = Xp[3] | 0, this.v2l = Xp[4] | 0, this.v2h = Xp[5] | 0, this.v3l = Xp[6] | 0, this.v3h = Xp[7] | 0, this.v4l = Xp[8] | 0, this.v4h = Xp[9] | 0, this.v5l = Xp[10] | 0, this.v5h = Xp[11] | 0, this.v6l = Xp[12] | 0, this.v6h = Xp[13] | 0, this.v7l = Xp[14] | 0, this.v7h = Xp[15] | 0, $p(t, e, 64, 16, 16);
		let { key: n, personalization: r, salt: i } = e, a = 0;
		if (n !== void 0 && (n = rp(n), a = n.length), this.v0l ^= this.outputLen | a << 8 | 16842752, i !== void 0) {
			i = rp(i);
			let e = Vf(i);
			this.v4l ^= qf(e[0]), this.v4h ^= qf(e[1]), this.v5l ^= qf(e[2]), this.v5h ^= qf(e[3]);
		}
		if (r !== void 0) {
			r = rp(r);
			let e = Vf(r);
			this.v6l ^= qf(e[0]), this.v6h ^= qf(e[1]), this.v7l ^= qf(e[2]), this.v7h ^= qf(e[3]);
		}
		if (n !== void 0) {
			let e = new Uint8Array(this.blockLen);
			e.set(n), this.update(e);
		}
	}
	get() {
		let { v0l: e, v0h: t, v1l: n, v1h: r, v2l: i, v2h: a, v3l: o, v3h: s, v4l: c, v4h: l, v5l: u, v5h: d, v6l: f, v6h: p, v7l: m, v7h: h } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s,
			c,
			l,
			u,
			d,
			f,
			p,
			m,
			h
		];
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.v0l = e | 0, this.v0h = t | 0, this.v1l = n | 0, this.v1h = r | 0, this.v2l = i | 0, this.v2h = a | 0, this.v3l = o | 0, this.v3h = s | 0, this.v4l = c | 0, this.v4h = l | 0, this.v5l = u | 0, this.v5h = d | 0, this.v6l = f | 0, this.v6h = p | 0, this.v7l = m | 0, this.v7h = h | 0;
	}
	compress(e, t, n) {
		this.get().forEach((e, t) => V[t] = e), V.set(Xp, 16);
		let { h: r, l: i } = pf(BigInt(this.length));
		V[24] = Xp[8] ^ i, V[25] = Xp[9] ^ r, n && (V[28] = ~V[28], V[29] = ~V[29]);
		let a = 0, o = Yp;
		for (let n = 0; n < 12; n++) Zp(0, 4, 8, 12, e, t + 2 * o[a++]), Qp(0, 4, 8, 12, e, t + 2 * o[a++]), Zp(1, 5, 9, 13, e, t + 2 * o[a++]), Qp(1, 5, 9, 13, e, t + 2 * o[a++]), Zp(2, 6, 10, 14, e, t + 2 * o[a++]), Qp(2, 6, 10, 14, e, t + 2 * o[a++]), Zp(3, 7, 11, 15, e, t + 2 * o[a++]), Qp(3, 7, 11, 15, e, t + 2 * o[a++]), Zp(0, 5, 10, 15, e, t + 2 * o[a++]), Qp(0, 5, 10, 15, e, t + 2 * o[a++]), Zp(1, 6, 11, 12, e, t + 2 * o[a++]), Qp(1, 6, 11, 12, e, t + 2 * o[a++]), Zp(2, 7, 8, 13, e, t + 2 * o[a++]), Qp(2, 7, 8, 13, e, t + 2 * o[a++]), Zp(3, 4, 9, 14, e, t + 2 * o[a++]), Qp(3, 4, 9, 14, e, t + 2 * o[a++]);
		this.v0l ^= V[0] ^ V[16], this.v0h ^= V[1] ^ V[17], this.v1l ^= V[2] ^ V[18], this.v1h ^= V[3] ^ V[19], this.v2l ^= V[4] ^ V[20], this.v2h ^= V[5] ^ V[21], this.v3l ^= V[6] ^ V[22], this.v3h ^= V[7] ^ V[23], this.v4l ^= V[8] ^ V[24], this.v4h ^= V[9] ^ V[25], this.v5l ^= V[10] ^ V[26], this.v5h ^= V[11] ^ V[27], this.v6l ^= V[12] ^ V[28], this.v6h ^= V[13] ^ V[29], this.v7l ^= V[14] ^ V[30], this.v7h ^= V[15] ^ V[31], Hf(V);
	}
	destroy() {
		this.destroyed = !0, Hf(this.buffer32), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
}, nm = sp((e) => new tm(e)), rm = "https://rpc.walletconnect.org/v1";
function im(e) {
	let t = `Ethereum Signed Message:
${e.length}`, n = new TextEncoder().encode(t + e);
	return "0x" + Buffer.from(Tp(n)).toString("hex");
}
async function am(e, t, n, r, i, a) {
	switch (n.t) {
		case "eip191": return await om(e, t, n.s);
		case "eip1271": return await sm(e, t, n.s, r, i, a);
		default: throw Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n.t}`);
	}
}
async function om(e, t, n) {
	return (await Gs({
		hash: im(t),
		signature: n
	})).toLowerCase() === e.toLowerCase();
}
async function sm(e, t, n, r, i, a) {
	let o = fd(r);
	if (!o.namespace || !o.reference) throw Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);
	try {
		let o = n.substring(2), s = (o.length / 2).toString(16).padStart(64, "0"), c = "0x1626ba7e" + (t.startsWith("0x") ? t : im(t)).substring(2) + "0000000000000000000000000000000000000000000000000000000000000040" + s + o, { result: l } = await (await fetch(`${a || rm}/?chainId=${r}&projectId=${i}`, {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({
				id: cm(),
				jsonrpc: "2.0",
				method: "eth_call",
				params: [{
					to: e,
					data: c
				}, "latest"]
			})
		})).json();
		return l ? l.slice(0, 10).toLowerCase() === "0x1626ba7e" : !1;
	} catch (e) {
		return console.error("isValidEip1271Signature: ", e), !1;
	}
}
function cm() {
	return Date.now() + Math.floor(Math.random() * 1e3);
}
function lm(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	let r = n[0];
	if (r === 0) throw Error("No signatures found");
	let i = 1 + r * 64;
	if (n.length < i) throw Error("Transaction data too short for claimed signature count");
	if (n.length < 100) throw Error("Transaction too short");
	let a = Buffer.from(e, "base64").slice(1, 65);
	return qs.encode(a);
}
function um(e) {
	let t = new Uint8Array(Buffer.from(e, "base64")), n = Array.from("TransactionData::").map((e) => e.charCodeAt(0)), r = new Uint8Array(n.length + t.length);
	r.set(n), r.set(t, n.length);
	let i = nm(r, { dkLen: 32 });
	return qs.encode(i);
}
function dm(e) {
	let t = new Uint8Array(Gp(fm(e)));
	return qs.encode(t);
}
function fm(e) {
	if (e instanceof Uint8Array) return e;
	if (Array.isArray(e)) return new Uint8Array(e);
	if (typeof e == "object" && e && e.data) return new Uint8Array(Object.values(e.data));
	if (typeof e == "object" && e) return new Uint8Array(Object.values(e));
	throw Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array");
}
function pm(e) {
	let t = Bc(Buffer.from(e, "base64")).txn;
	if (!t) throw Error("Invalid signed transaction: missing 'txn' field");
	let n = wc(t), r = Buffer.from("TX"), i = Jp(Buffer.concat([r, Buffer.from(n)]));
	return ol.encode(i).replace(/=+$/, "");
}
function mm(e) {
	let t = [], n = BigInt(e);
	for (; n >= BigInt(128);) t.push(Number(n & BigInt(127) | BigInt(128))), n >>= BigInt(7);
	return t.push(Number(n)), Buffer.from(t);
}
function hm(e) {
	let t = Buffer.from(e.signed.bodyBytes, "base64"), n = Buffer.from(e.signed.authInfoBytes, "base64"), r = Buffer.from(e.signature.signature, "base64"), i = [];
	i.push(Buffer.from([10])), i.push(mm(t.length)), i.push(t), i.push(Buffer.from([18])), i.push(mm(n.length)), i.push(n), i.push(Buffer.from([26])), i.push(mm(r.length)), i.push(r);
	let a = Gp(Buffer.concat(i));
	return Buffer.from(a).toString("hex").toUpperCase();
}
var gm = Object.defineProperty, _m = Object.defineProperties, vm = Object.getOwnPropertyDescriptors, ym = Object.getOwnPropertySymbols, bm = Object.prototype.hasOwnProperty, xm = Object.prototype.propertyIsEnumerable, Sm = (e, t, n) => t in e ? gm(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Cm = (e, t) => {
	for (var n in t || (t = {})) bm.call(t, n) && Sm(e, n, t[n]);
	if (ym) for (var n of ym(t)) xm.call(t, n) && Sm(e, n, t[n]);
	return e;
}, wm = (e, t) => _m(e, vm(t)), Tm = "did:pkh:", Em = (e) => e?.split(":"), Dm = (e) => {
	let t = e && Em(e);
	if (t) return e.includes(Tm) ? t[3] : t[1];
}, Om = (e) => {
	let t = e && Em(e);
	if (t) return t[2] + ":" + t[3];
}, km = (e) => {
	let t = e && Em(e);
	if (t) return t.pop();
};
async function Am(e) {
	let { cacao: t, projectId: n } = e, { s: r, p: i } = t, a = jm(i, i.iss);
	return await am(km(i.iss), a, r, Om(i.iss), n);
}
var jm = (e, t) => {
	let n = `${e.domain} wants you to sign in with your Ethereum account:`, r = km(t);
	if (!e.aud && !e.uri) throw Error("Either `aud` or `uri` is required to construct the message");
	let i = e.statement || void 0, a = `URI: ${e.aud || e.uri}`, o = `Version: ${e.version}`, s = `Chain ID: ${Dm(t)}`, c = `Nonce: ${e.nonce}`, l = `Issued At: ${e.iat}`, u = e.exp ? `Expiration Time: ${e.exp}` : void 0, d = e.nbf ? `Not Before: ${e.nbf}` : void 0, f = e.requestId ? `Request ID: ${e.requestId}` : void 0, p = e.resources ? `Resources:${e.resources.map((e) => `
- ${e}`).join("")}` : void 0, m = Km(e.resources);
	if (m) {
		let e = Rm(m);
		i = Um(i, e);
	}
	return [
		n,
		r,
		"",
		i,
		"",
		a,
		o,
		s,
		c,
		l,
		u,
		d,
		f,
		p
	].filter((e) => e != null).join("\n");
};
function Mm(e) {
	return Buffer.from(JSON.stringify(e)).toString("base64");
}
function Nm(e) {
	return JSON.parse(Buffer.from(e, "base64").toString("utf-8"));
}
function Pm(e) {
	if (!e) throw Error("No recap provided, value is undefined");
	if (!e.att) throw Error("No `att` property found");
	let t = Object.keys(e.att);
	if (!(t != null && t.length)) throw Error("No resources found in `att` property");
	t.forEach((t) => {
		let n = e.att[t];
		if (Array.isArray(n) || typeof n != "object") throw Error(`Resource must be an object: ${t}`);
		if (!Object.keys(n).length) throw Error(`Resource object is empty: ${t}`);
		Object.keys(n).forEach((e) => {
			let t = n[e];
			if (!Array.isArray(t)) throw Error(`Ability limits ${e} must be an array of objects, found: ${t}`);
			if (!t.length) throw Error(`Value of ${e} is empty array, must be an array with objects`);
			t.forEach((t) => {
				if (typeof t != "object") throw Error(`Ability limits (${e}) must be an array of objects, found: ${t}`);
			});
		});
	});
}
function Fm(e, t, n, r = {}) {
	return n?.sort((e, t) => e.localeCompare(t)), { att: { [e]: Im(t, n, r) } };
}
function Im(e, t, n = {}) {
	t = t?.sort((e, t) => e.localeCompare(t));
	let r = t.map((t) => ({ [`${e}/${t}`]: [n] }));
	return Object.assign({}, ...r);
}
function Lm(e) {
	return Pm(e), `urn:recap:${Mm(e).replace(/=/g, "")}`;
}
function Rm(e) {
	let t = Nm(e.replace("urn:recap:", ""));
	return Pm(t), t;
}
function zm(e, t, n) {
	return Lm(Fm(e, t, n));
}
function Bm(e) {
	return e && e.includes("urn:recap:");
}
function Vm(e, t) {
	return Lm(Hm(Rm(e), Rm(t)));
}
function Hm(e, t) {
	Pm(e), Pm(t);
	let n = Object.keys(e.att).concat(Object.keys(t.att)).sort((e, t) => e.localeCompare(t)), r = { att: {} };
	return n.forEach((n) => {
		Object.keys(e.att?.[n] || {}).concat(Object.keys(t.att?.[n] || {})).sort((e, t) => e.localeCompare(t)).forEach((i) => {
			r.att[n] = wm(Cm({}, r.att[n]), { [i]: e.att[n]?.[i] || t.att[n]?.[i] });
		});
	}), r;
}
function Um(e = "", t) {
	Pm(t);
	let n = "I further authorize the stated URI to perform the following actions on my behalf: ";
	if (e.includes(n)) return e;
	let r = [], i = 0;
	Object.keys(t.att).forEach((e) => {
		let n = Object.keys(t.att[e]).map((e) => ({
			ability: e.split("/")[0],
			action: e.split("/")[1]
		}));
		n.sort((e, t) => e.action.localeCompare(t.action));
		let a = {};
		n.forEach((e) => {
			a[e.ability] || (a[e.ability] = []), a[e.ability].push(e.action);
		});
		let o = Object.keys(a).map((t) => (i++, `(${i}) '${t}': '${a[t].join("', '")}' for '${e}'.`));
		r.push(o.join(", ").replace(".,", "."));
	});
	let a = `${n}${r.join(" ")}`;
	return `${e ? e + " " : ""}${a}`;
}
function Wm(e) {
	let t = Rm(e);
	Pm(t);
	let n = t.att?.eip155;
	return n ? Object.keys(n).map((e) => e.split("/")[1]) : [];
}
function Gm(e) {
	let t = Rm(e);
	Pm(t);
	let n = [];
	return Object.values(t.att).forEach((e) => {
		Object.values(e).forEach((e) => {
			var t;
			(t = e?.[0]) != null && t.chains && n.push(e[0].chains);
		});
	}), [...new Set(n.flat())];
}
function Km(e) {
	if (!e) return;
	let t = e?.[e.length - 1];
	return Bm(t) ? t : void 0;
}
function qm(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function Jm(e) {
	if (typeof e != "boolean") throw Error(`boolean expected, not ${e}`);
}
function Ym(e) {
	if (!Number.isSafeInteger(e) || e < 0) throw Error("positive integer expected, got " + e);
}
function Xm(e, ...t) {
	if (!qm(e)) throw Error("Uint8Array expected");
	if (t.length > 0 && !t.includes(e.length)) throw Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function Zm(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function Qm(e, t) {
	Xm(e);
	let n = t.outputLen;
	if (e.length < n) throw Error("digestInto() expects output buffer of length at least " + n);
}
function $m(e) {
	return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function eh(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function th(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
var nh = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function rh(e) {
	if (typeof e != "string") throw Error("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
function ih(e) {
	if (typeof e == "string") e = rh(e);
	else if (qm(e)) e = fh(e);
	else throw Error("Uint8Array expected, got " + typeof e);
	return e;
}
function ah(e, t) {
	if (typeof t != "object" || !t) throw Error("options must be defined");
	return Object.assign(e, t);
}
function oh(e, t) {
	if (e.length !== t.length) return !1;
	let n = 0;
	for (let r = 0; r < e.length; r++) n |= e[r] ^ t[r];
	return n === 0;
}
var sh = (e, t) => {
	function n(n, ...r) {
		if (Xm(n), !nh) throw Error("Non little-endian hardware is not yet supported");
		if (e.nonceLength !== void 0) {
			let t = r[0];
			if (!t) throw Error("nonce / iv required");
			e.varSizeNonce ? Xm(t) : Xm(t, e.nonceLength);
		}
		let i = e.tagLength;
		i && r[1] !== void 0 && Xm(r[1]);
		let a = t(n, ...r), o = (e, t) => {
			if (t !== void 0) {
				if (e !== 2) throw Error("cipher output not supported");
				Xm(t);
			}
		}, s = !1;
		return {
			encrypt(e, t) {
				if (s) throw Error("cannot encrypt() twice with same key + nonce");
				return s = !0, Xm(e), o(a.encrypt.length, t), a.encrypt(e, t);
			},
			decrypt(e, t) {
				if (Xm(e), i && e.length < i) throw Error("invalid ciphertext length: smaller than tagLength=" + i);
				return o(a.decrypt.length, t), a.decrypt(e, t);
			}
		};
	}
	return Object.assign(n, e), n;
};
function ch(e, t, n = !0) {
	if (t === void 0) return new Uint8Array(e);
	if (t.length !== e) throw Error("invalid output length, expected " + e + ", got: " + t.length);
	if (n && !dh(t)) throw Error("invalid output, must be aligned");
	return t;
}
function lh(e, t, n, r) {
	if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
	let i = BigInt(32), a = BigInt(4294967295), o = Number(n >> i & a), s = Number(n & a), c = r ? 4 : 0, l = r ? 0 : 4;
	e.setUint32(t + c, o, r), e.setUint32(t + l, s, r);
}
function uh(e, t, n) {
	Jm(n);
	let r = new Uint8Array(16), i = th(r);
	return lh(i, 0, BigInt(t), n), lh(i, 8, BigInt(e), n), r;
}
function dh(e) {
	return e.byteOffset % 4 == 0;
}
function fh(e) {
	return Uint8Array.from(e);
}
var ph = (e) => Uint8Array.from(e.split("").map((e) => e.charCodeAt(0))), mh = ph("expand 16-byte k"), hh = ph("expand 32-byte k"), gh = $m(mh), _h = $m(hh);
function H(e, t) {
	return e << t | e >>> 32 - t;
}
function vh(e) {
	return e.byteOffset % 4 == 0;
}
var yh = 64, bh = 16, xh = 2 ** 32 - 1, Sh = new Uint32Array();
function Ch(e, t, n, r, i, a, o, s) {
	let c = i.length, l = new Uint8Array(yh), u = $m(l), d = vh(i) && vh(a), f = d ? $m(i) : Sh, p = d ? $m(a) : Sh;
	for (let m = 0; m < c; o++) {
		if (e(t, n, r, u, o, s), o >= xh) throw Error("arx: counter overflow");
		let h = Math.min(yh, c - m);
		if (d && h === yh) {
			let e = m / 4;
			if (m % 4 != 0) throw Error("arx: invalid block position");
			for (let t = 0, n; t < bh; t++) n = e + t, p[n] = f[n] ^ u[t];
			m += yh;
			continue;
		}
		for (let e = 0, t; e < h; e++) t = m + e, a[t] = i[t] ^ l[e];
		m += h;
	}
}
function wh(e, t) {
	let { allowShortKeys: n, extendNonceFn: r, counterLength: i, counterRight: a, rounds: o } = ah({
		allowShortKeys: !1,
		counterLength: 8,
		counterRight: !1,
		rounds: 20
	}, t);
	if (typeof e != "function") throw Error("core must be a function");
	return Ym(i), Ym(o), Jm(a), Jm(n), (t, s, c, l, u = 0) => {
		Xm(t), Xm(s), Xm(c);
		let d = c.length;
		if (l === void 0 && (l = new Uint8Array(d)), Xm(l), Ym(u), u < 0 || u >= xh) throw Error("arx: counter overflow");
		if (l.length < d) throw Error(`arx: output (${l.length}) is shorter than data (${d})`);
		let f = [], p = t.length, m, h;
		if (p === 32) f.push(m = fh(t)), h = _h;
		else if (p === 16 && n) m = new Uint8Array(32), m.set(t), m.set(t, 16), h = gh, f.push(m);
		else throw Error(`arx: invalid 32-byte key, got length=${p}`);
		vh(s) || f.push(s = fh(s));
		let g = $m(m);
		if (r) {
			if (s.length !== 24) throw Error("arx: extended nonce must be 24 bytes");
			r(h, g, $m(s.subarray(0, 16)), g), s = s.subarray(16);
		}
		let _ = 16 - i;
		if (_ !== s.length) throw Error(`arx: nonce must be ${_} or 16 bytes`);
		if (_ !== 12) {
			let e = new Uint8Array(12);
			e.set(s, a ? 0 : 12 - s.length), s = e, f.push(s);
		}
		let v = $m(s);
		return Ch(e, h, g, v, c, l, u, o), eh(...f), l;
	};
}
var Th = (e, t) => e[t++] & 255 | (e[t++] & 255) << 8, Eh = class {
	constructor(e) {
		this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = ih(e), Xm(e, 32);
		let t = Th(e, 0), n = Th(e, 2), r = Th(e, 4), i = Th(e, 6), a = Th(e, 8), o = Th(e, 10), s = Th(e, 12), c = Th(e, 14);
		this.r[0] = t & 8191, this.r[1] = (t >>> 13 | n << 3) & 8191, this.r[2] = (n >>> 10 | r << 6) & 7939, this.r[3] = (r >>> 7 | i << 9) & 8191, this.r[4] = (i >>> 4 | a << 12) & 255, this.r[5] = a >>> 1 & 8190, this.r[6] = (a >>> 14 | o << 2) & 8191, this.r[7] = (o >>> 11 | s << 5) & 8065, this.r[8] = (s >>> 8 | c << 8) & 8191, this.r[9] = c >>> 5 & 127;
		for (let t = 0; t < 8; t++) this.pad[t] = Th(e, 16 + 2 * t);
	}
	process(e, t, n = !1) {
		let r = n ? 0 : 2048, { h: i, r: a } = this, o = a[0], s = a[1], c = a[2], l = a[3], u = a[4], d = a[5], f = a[6], p = a[7], m = a[8], h = a[9], g = Th(e, t + 0), _ = Th(e, t + 2), v = Th(e, t + 4), y = Th(e, t + 6), b = Th(e, t + 8), x = Th(e, t + 10), S = Th(e, t + 12), C = Th(e, t + 14), w = i[0] + (g & 8191), T = i[1] + ((g >>> 13 | _ << 3) & 8191), E = i[2] + ((_ >>> 10 | v << 6) & 8191), D = i[3] + ((v >>> 7 | y << 9) & 8191), O = i[4] + ((y >>> 4 | b << 12) & 8191), k = i[5] + (b >>> 1 & 8191), A = i[6] + ((b >>> 14 | x << 2) & 8191), j = i[7] + ((x >>> 11 | S << 5) & 8191), M = i[8] + ((S >>> 8 | C << 8) & 8191), N = i[9] + (C >>> 5 | r), P = 0, F = P + w * o + 5 * h * T + 5 * m * E + 5 * p * D + 5 * f * O;
		P = F >>> 13, F &= 8191, F += 5 * d * k + 5 * u * A + 5 * l * j + 5 * c * M + 5 * s * N, P += F >>> 13, F &= 8191;
		let ee = P + w * s + T * o + 5 * h * E + 5 * m * D + 5 * p * O;
		P = ee >>> 13, ee &= 8191, ee += 5 * f * k + 5 * d * A + 5 * u * j + 5 * l * M + 5 * c * N, P += ee >>> 13, ee &= 8191;
		let te = P + w * c + T * s + E * o + 5 * h * D + 5 * m * O;
		P = te >>> 13, te &= 8191, te += 5 * p * k + 5 * f * A + 5 * d * j + 5 * u * M + 5 * l * N, P += te >>> 13, te &= 8191;
		let I = P + w * l + T * c + E * s + D * o + 5 * h * O;
		P = I >>> 13, I &= 8191, I += 5 * m * k + 5 * p * A + 5 * f * j + 5 * d * M + 5 * u * N, P += I >>> 13, I &= 8191;
		let ne = P + w * u + T * l + E * c + D * s + O * o;
		P = ne >>> 13, ne &= 8191, ne += 5 * h * k + 5 * m * A + 5 * p * j + 5 * f * M + 5 * d * N, P += ne >>> 13, ne &= 8191;
		let re = P + w * d + T * u + E * l + D * c + O * s;
		P = re >>> 13, re &= 8191, re += k * o + 5 * h * A + 5 * m * j + 5 * p * M + 5 * f * N, P += re >>> 13, re &= 8191;
		let ie = P + w * f + T * d + E * u + D * l + O * c;
		P = ie >>> 13, ie &= 8191, ie += k * s + A * o + 5 * h * j + 5 * m * M + 5 * p * N, P += ie >>> 13, ie &= 8191;
		let ae = P + w * p + T * f + E * d + D * u + O * l;
		P = ae >>> 13, ae &= 8191, ae += k * c + A * s + j * o + 5 * h * M + 5 * m * N, P += ae >>> 13, ae &= 8191;
		let oe = P + w * m + T * p + E * f + D * d + O * u;
		P = oe >>> 13, oe &= 8191, oe += k * l + A * c + j * s + M * o + 5 * h * N, P += oe >>> 13, oe &= 8191;
		let se = P + w * h + T * m + E * p + D * f + O * d;
		P = se >>> 13, se &= 8191, se += k * u + A * l + j * c + M * s + N * o, P += se >>> 13, se &= 8191, P = (P << 2) + P | 0, P = P + F | 0, F = P & 8191, P >>>= 13, ee += P, i[0] = F, i[1] = ee, i[2] = te, i[3] = I, i[4] = ne, i[5] = re, i[6] = ie, i[7] = ae, i[8] = oe, i[9] = se;
	}
	finalize() {
		let { h: e, pad: t } = this, n = new Uint16Array(10), r = e[1] >>> 13;
		e[1] &= 8191;
		for (let t = 2; t < 10; t++) e[t] += r, r = e[t] >>> 13, e[t] &= 8191;
		e[0] += r * 5, r = e[0] >>> 13, e[0] &= 8191, e[1] += r, r = e[1] >>> 13, e[1] &= 8191, e[2] += r, n[0] = e[0] + 5, r = n[0] >>> 13, n[0] &= 8191;
		for (let t = 1; t < 10; t++) n[t] = e[t] + r, r = n[t] >>> 13, n[t] &= 8191;
		n[9] -= 8192;
		let i = (r ^ 1) - 1;
		for (let e = 0; e < 10; e++) n[e] &= i;
		i = ~i;
		for (let t = 0; t < 10; t++) e[t] = e[t] & i | n[t];
		e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
		let a = e[0] + t[0];
		e[0] = a & 65535;
		for (let n = 1; n < 8; n++) a = (e[n] + t[n] | 0) + (a >>> 16) | 0, e[n] = a & 65535;
		eh(n);
	}
	update(e) {
		Zm(this), e = ih(e), Xm(e);
		let { buffer: t, blockLen: n } = this, r = e.length;
		for (let i = 0; i < r;) {
			let a = Math.min(n - this.pos, r - i);
			if (a === n) {
				for (; n <= r - i; i += n) this.process(e, i);
				continue;
			}
			t.set(e.subarray(i, i + a), this.pos), this.pos += a, i += a, this.pos === n && (this.process(t, 0, !1), this.pos = 0);
		}
		return this;
	}
	destroy() {
		eh(this.h, this.r, this.buffer, this.pad);
	}
	digestInto(e) {
		Zm(this), Qm(e, this), this.finished = !0;
		let { buffer: t, h: n } = this, { pos: r } = this;
		if (r) {
			for (t[r++] = 1; r < 16; r++) t[r] = 0;
			this.process(t, 0, !0);
		}
		this.finalize();
		let i = 0;
		for (let t = 0; t < 8; t++) e[i++] = n[t] >>> 0, e[i++] = n[t] >>> 8;
		return e;
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
};
function Dh(e) {
	let t = (t, n) => e(n).update(ih(t)).digest(), n = e(new Uint8Array(32));
	return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (t) => e(t), t;
}
var Oh = Dh((e) => new Eh(e));
function kh(e, t, n, r, i, a = 20) {
	let o = e[0], s = e[1], c = e[2], l = e[3], u = t[0], d = t[1], f = t[2], p = t[3], m = t[4], h = t[5], g = t[6], _ = t[7], v = i, y = n[0], b = n[1], x = n[2], S = o, C = s, w = c, T = l, E = u, D = d, O = f, k = p, A = m, j = h, M = g, N = _, P = v, F = y, ee = b, te = x;
	for (let e = 0; e < a; e += 2) S = S + E | 0, P = H(P ^ S, 16), A = A + P | 0, E = H(E ^ A, 12), S = S + E | 0, P = H(P ^ S, 8), A = A + P | 0, E = H(E ^ A, 7), C = C + D | 0, F = H(F ^ C, 16), j = j + F | 0, D = H(D ^ j, 12), C = C + D | 0, F = H(F ^ C, 8), j = j + F | 0, D = H(D ^ j, 7), w = w + O | 0, ee = H(ee ^ w, 16), M = M + ee | 0, O = H(O ^ M, 12), w = w + O | 0, ee = H(ee ^ w, 8), M = M + ee | 0, O = H(O ^ M, 7), T = T + k | 0, te = H(te ^ T, 16), N = N + te | 0, k = H(k ^ N, 12), T = T + k | 0, te = H(te ^ T, 8), N = N + te | 0, k = H(k ^ N, 7), S = S + D | 0, te = H(te ^ S, 16), M = M + te | 0, D = H(D ^ M, 12), S = S + D | 0, te = H(te ^ S, 8), M = M + te | 0, D = H(D ^ M, 7), C = C + O | 0, P = H(P ^ C, 16), N = N + P | 0, O = H(O ^ N, 12), C = C + O | 0, P = H(P ^ C, 8), N = N + P | 0, O = H(O ^ N, 7), w = w + k | 0, F = H(F ^ w, 16), A = A + F | 0, k = H(k ^ A, 12), w = w + k | 0, F = H(F ^ w, 8), A = A + F | 0, k = H(k ^ A, 7), T = T + E | 0, ee = H(ee ^ T, 16), j = j + ee | 0, E = H(E ^ j, 12), T = T + E | 0, ee = H(ee ^ T, 8), j = j + ee | 0, E = H(E ^ j, 7);
	let I = 0;
	r[I++] = o + S | 0, r[I++] = s + C | 0, r[I++] = c + w | 0, r[I++] = l + T | 0, r[I++] = u + E | 0, r[I++] = d + D | 0, r[I++] = f + O | 0, r[I++] = p + k | 0, r[I++] = m + A | 0, r[I++] = h + j | 0, r[I++] = g + M | 0, r[I++] = _ + N | 0, r[I++] = v + P | 0, r[I++] = y + F | 0, r[I++] = b + ee | 0, r[I++] = x + te | 0;
}
var Ah = wh(kh, {
	counterRight: !1,
	counterLength: 4,
	allowShortKeys: !1
}), jh = new Uint8Array(16), Mh = (e, t) => {
	e.update(t);
	let n = t.length % 16;
	n && e.update(jh.subarray(n));
}, Nh = new Uint8Array(32);
function Ph(e, t, n, r, i) {
	let a = e(t, n, Nh), o = Oh.create(a);
	i && Mh(o, i), Mh(o, r);
	let s = uh(r.length, i ? i.length : 0, !0);
	o.update(s);
	let c = o.digest();
	return eh(a, s), c;
}
var Fh = sh({
	blockSize: 64,
	nonceLength: 12,
	tagLength: 16
}, ((e) => (t, n, r) => ({
	encrypt(i, a) {
		let o = i.length;
		a = ch(o + 16, a, !1), a.set(i);
		let s = a.subarray(0, -16);
		e(t, n, s, s, 1);
		let c = Ph(e, t, n, s, r);
		return a.set(c, o), eh(c), a;
	},
	decrypt(i, a) {
		a = ch(i.length - 16, a, !1);
		let o = i.subarray(0, -16), s = i.subarray(-16), c = Ph(e, t, n, o, r);
		if (!oh(s, c)) throw Error("invalid tag");
		return a.set(i.subarray(0, -16)), e(t, n, a, a, 1), eh(c), a;
	}
}))(Ah)), Ih = class extends ap {
	constructor(e, t) {
		super(), this.finished = !1, this.destroyed = !1, Rf(e);
		let n = rp(t);
		if (this.iHash = e.create(), typeof this.iHash.update != "function") throw Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
		let r = this.blockLen, i = new Uint8Array(r);
		i.set(n.length > r ? e.create().update(n).digest() : n);
		for (let e = 0; e < i.length; e++) i[e] ^= 54;
		this.iHash.update(i), this.oHash = e.create();
		for (let e = 0; e < i.length; e++) i[e] ^= 106;
		this.oHash.update(i), Hf(i);
	}
	update(e) {
		return zf(this), this.iHash.update(e), this;
	}
	digestInto(e) {
		zf(this), Lf(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
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
}, Lh = (e, t, n) => new Ih(e, t).update(n).digest();
Lh.create = (e, t) => new Ih(e, t);
function Rh(e, t, n) {
	return Rf(e), n === void 0 && (n = new Uint8Array(e.outputLen)), Lh(e, rp(n), rp(t));
}
var zh = Uint8Array.from([0]), Bh = Uint8Array.of();
function Vh(e, t, n, r = 32) {
	Rf(e), If(r);
	let i = e.outputLen;
	if (r > 255 * i) throw Error("Length should be <= 255*HashLen");
	let a = Math.ceil(r / i);
	n === void 0 && (n = Bh);
	let o = new Uint8Array(a * i), s = Lh.create(e, t), c = s._cloneInto(), l = new Uint8Array(s.outputLen);
	for (let e = 0; e < a; e++) zh[0] = e + 1, c.update(e === 0 ? Bh : l).update(n).update(zh).digestInto(l), o.set(l, i * e), s._cloneInto(c);
	return s.destroy(), c.destroy(), Hf(l, zh), o.slice(0, r);
}
var Hh = (e, t, n, r, i) => Vh(e, Rh(e, t, n), r, i), Uh = Gp, Wh = BigInt(0), Gh = BigInt(1);
function Kh(e, t) {
	if (typeof t != "boolean") throw Error(e + " boolean expected, got " + t);
}
function qh(e) {
	let t = e.toString(16);
	return t.length & 1 ? "0" + t : t;
}
function Jh(e) {
	if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
	return e === "" ? Wh : BigInt("0x" + e);
}
function Yh(e) {
	return Jh(Qf(e));
}
function Xh(e) {
	return Lf(e), Jh(Qf(Uint8Array.from(e).reverse()));
}
function Zh(e, t) {
	return tp(e.toString(16).padStart(t * 2, "0"));
}
function Qh(e, t) {
	return Zh(e, t).reverse();
}
function $h(e, t, n) {
	let r;
	if (typeof t == "string") try {
		r = tp(t);
	} catch (t) {
		throw Error(e + " must be hex string or Uint8Array, cause: " + t);
	}
	else if (Ff(t)) r = Uint8Array.from(t);
	else throw Error(e + " must be hex string or Uint8Array");
	let i = r.length;
	if (typeof n == "number" && i !== n) throw Error(e + " of length " + n + " expected, got " + i);
	return r;
}
var eg = (e) => typeof e == "bigint" && Wh <= e;
function tg(e, t, n) {
	return eg(e) && eg(t) && eg(n) && t <= e && e < n;
}
function ng(e, t, n, r) {
	if (!tg(t, n, r)) throw Error("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function rg(e) {
	let t;
	for (t = 0; e > Wh; e >>= Gh, t += 1);
	return t;
}
var ig = (e) => (Gh << BigInt(e)) - Gh;
function ag(e, t, n) {
	if (typeof e != "number" || e < 2) throw Error("hashLen must be a number");
	if (typeof t != "number" || t < 2) throw Error("qByteLen must be a number");
	if (typeof n != "function") throw Error("hmacFn must be a function");
	let r = (e) => new Uint8Array(e), i = (e) => Uint8Array.of(e), a = r(e), o = r(e), s = 0, c = () => {
		a.fill(1), o.fill(0), s = 0;
	}, l = (...e) => n(o, a, ...e), u = (e = r(0)) => {
		o = l(i(0), e), a = l(), e.length !== 0 && (o = l(i(1), e), a = l());
	}, d = () => {
		if (s++ >= 1e3) throw Error("drbg: tried 1000 values");
		let e = 0, n = [];
		for (; e < t;) {
			a = l();
			let t = a.slice();
			n.push(t), e += a.length;
		}
		return ip(...n);
	};
	return (e, t) => {
		c(), u(e);
		let n;
		for (; !(n = t(d()));) u();
		return c(), n;
	};
}
function og(e, t, n = {}) {
	if (!e || typeof e != "object") throw Error("expected valid options object");
	function r(t, n, r) {
		let i = e[t];
		if (r && i === void 0) return;
		let a = typeof i;
		if (a !== n || i === null) throw Error(`param "${t}" is invalid: expected ${n}, got ${a}`);
	}
	Object.entries(t).forEach(([e, t]) => r(e, t, !1)), Object.entries(n).forEach(([e, t]) => r(e, t, !0));
}
function sg(e) {
	let t = /* @__PURE__ */ new WeakMap();
	return (n, ...r) => {
		let i = t.get(n);
		if (i !== void 0) return i;
		let a = e(n, ...r);
		return t.set(n, a), a;
	};
}
var cg = BigInt(0), lg = BigInt(1), ug = BigInt(2), dg = BigInt(3), fg = BigInt(4), pg = BigInt(5), mg = BigInt(8);
function hg(e, t) {
	let n = e % t;
	return n >= cg ? n : t + n;
}
function gg(e, t, n) {
	let r = e;
	for (; t-- > cg;) r *= r, r %= n;
	return r;
}
function _g(e, t) {
	if (e === cg) throw Error("invert: expected non-zero number");
	if (t <= cg) throw Error("invert: expected positive modulus, got " + t);
	let n = hg(e, t), r = t, i = cg, a = lg;
	for (; n !== cg;) {
		let e = r / n, t = r % n, o = i - a * e;
		r = n, n = t, i = a, a = o;
	}
	if (r !== lg) throw Error("invert: does not exist");
	return hg(i, t);
}
function vg(e, t) {
	let n = (e.ORDER + lg) / fg, r = e.pow(t, n);
	if (!e.eql(e.sqr(r), t)) throw Error("Cannot find square root");
	return r;
}
function yg(e, t) {
	let n = (e.ORDER - pg) / mg, r = e.mul(t, ug), i = e.pow(r, n), a = e.mul(t, i), o = e.mul(e.mul(a, ug), i), s = e.mul(a, e.sub(o, e.ONE));
	if (!e.eql(e.sqr(s), t)) throw Error("Cannot find square root");
	return s;
}
function bg(e) {
	if (e < BigInt(3)) throw Error("sqrt is not defined for small field");
	let t = e - lg, n = 0;
	for (; t % ug === cg;) t /= ug, n++;
	let r = ug, i = Og(e);
	for (; Eg(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return vg;
	let a = i.pow(r, t), o = (t + lg) / ug;
	return function(e, r) {
		if (e.is0(r)) return r;
		if (Eg(e, r) !== 1) throw Error("Cannot find square root");
		let i = n, s = e.mul(e.ONE, a), c = e.pow(r, t), l = e.pow(r, o);
		for (; !e.eql(c, e.ONE);) {
			if (e.is0(c)) return e.ZERO;
			let t = 1, n = e.sqr(c);
			for (; !e.eql(n, e.ONE);) if (t++, n = e.sqr(n), t === i) throw Error("Cannot find square root");
			let r = lg << BigInt(i - t - 1), a = e.pow(s, r);
			i = t, s = e.sqr(a), c = e.mul(c, s), l = e.mul(l, a);
		}
		return l;
	};
}
function xg(e) {
	return e % fg === dg ? vg : e % mg === pg ? yg : bg(e);
}
var Sg = [
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
function Cg(e) {
	return og(e, Sg.reduce((e, t) => (e[t] = "function", e), {
		ORDER: "bigint",
		MASK: "bigint",
		BYTES: "number",
		BITS: "number"
	})), e;
}
function wg(e, t, n) {
	if (n < cg) throw Error("invalid exponent, negatives unsupported");
	if (n === cg) return e.ONE;
	if (n === lg) return t;
	let r = e.ONE, i = t;
	for (; n > cg;) n & lg && (r = e.mul(r, i)), i = e.sqr(i), n >>= lg;
	return r;
}
function Tg(e, t, n = !1) {
	let r = Array(t.length).fill(n ? e.ZERO : void 0), i = t.reduce((t, n, i) => e.is0(n) ? t : (r[i] = t, e.mul(t, n)), e.ONE), a = e.inv(i);
	return t.reduceRight((t, n, i) => e.is0(n) ? t : (r[i] = e.mul(t, r[i]), e.mul(t, n)), a), r;
}
function Eg(e, t) {
	let n = (e.ORDER - lg) / ug, r = e.pow(t, n), i = e.eql(r, e.ONE), a = e.eql(r, e.ZERO), o = e.eql(r, e.neg(e.ONE));
	if (!i && !a && !o) throw Error("invalid Legendre symbol result");
	return i ? 1 : a ? 0 : -1;
}
function Dg(e, t) {
	t !== void 0 && If(t);
	let n = t === void 0 ? e.toString(2).length : t;
	return {
		nBitLength: n,
		nByteLength: Math.ceil(n / 8)
	};
}
function Og(e, t, n = !1, r = {}) {
	if (e <= cg) throw Error("invalid field: expected ORDER > 0, got " + e);
	let i, a;
	if (typeof t == "object" && t) {
		if (r.sqrt || n) throw Error("cannot specify opts in two arguments");
		let e = t;
		e.BITS && (i = e.BITS), e.sqrt && (a = e.sqrt), typeof e.isLE == "boolean" && (n = e.isLE);
	} else typeof t == "number" && (i = t), r.sqrt && (a = r.sqrt);
	let { nBitLength: o, nByteLength: s } = Dg(e, i);
	if (s > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
	let c, l = Object.freeze({
		ORDER: e,
		isLE: n,
		BITS: o,
		BYTES: s,
		MASK: ig(o),
		ZERO: cg,
		ONE: lg,
		create: (t) => hg(t, e),
		isValid: (t) => {
			if (typeof t != "bigint") throw Error("invalid field element: expected bigint, got " + typeof t);
			return cg <= t && t < e;
		},
		is0: (e) => e === cg,
		isValidNot0: (e) => !l.is0(e) && l.isValid(e),
		isOdd: (e) => (e & lg) === lg,
		neg: (t) => hg(-t, e),
		eql: (e, t) => e === t,
		sqr: (t) => hg(t * t, e),
		add: (t, n) => hg(t + n, e),
		sub: (t, n) => hg(t - n, e),
		mul: (t, n) => hg(t * n, e),
		pow: (e, t) => wg(l, e, t),
		div: (t, n) => hg(t * _g(n, e), e),
		sqrN: (e) => e * e,
		addN: (e, t) => e + t,
		subN: (e, t) => e - t,
		mulN: (e, t) => e * t,
		inv: (t) => _g(t, e),
		sqrt: a || ((t) => (c || (c = xg(e)), c(l, t))),
		toBytes: (e) => n ? Qh(e, s) : Zh(e, s),
		fromBytes: (e) => {
			if (e.length !== s) throw Error("Field.fromBytes: expected " + s + " bytes, got " + e.length);
			return n ? Xh(e) : Yh(e);
		},
		invertBatch: (e) => Tg(l, e),
		cmov: (e, t, n) => n ? t : e
	});
	return Object.freeze(l);
}
function kg(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	let t = e.toString(2).length;
	return Math.ceil(t / 8);
}
function Ag(e) {
	let t = kg(e);
	return t + Math.ceil(t / 2);
}
function jg(e, t, n = !1) {
	let r = e.length, i = kg(t), a = Ag(t);
	if (r < 16 || r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = hg(n ? Xh(e) : Yh(e), t - lg) + lg;
	return n ? Qh(o, i) : Zh(o, i);
}
var Mg = BigInt(0), Ng = BigInt(1);
function Pg(e, t) {
	let n = t.negate();
	return e ? n : t;
}
function Fg(e, t, n) {
	let r = t === "pz" ? (e) => e.pz : (e) => e.ez, i = Tg(e.Fp, n.map(r));
	return n.map((e, t) => e.toAffine(i[t])).map(e.fromAffine);
}
function Ig(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function Lg(e, t) {
	Ig(e, t);
	let n = Math.ceil(t / e) + 1, r = 2 ** (e - 1), i = 2 ** e;
	return {
		windows: n,
		windowSize: r,
		mask: ig(e),
		maxNumber: i,
		shiftBy: BigInt(e)
	};
}
function Rg(e, t, n) {
	let { windowSize: r, mask: i, maxNumber: a, shiftBy: o } = n, s = Number(e & i), c = e >> o;
	s > r && (s -= a, c += Ng);
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
function zg(e, t) {
	if (!Array.isArray(e)) throw Error("array expected");
	e.forEach((e, n) => {
		if (!(e instanceof t)) throw Error("invalid point at index " + n);
	});
}
function Bg(e, t) {
	if (!Array.isArray(e)) throw Error("array of scalars expected");
	e.forEach((e, n) => {
		if (!t.isValid(e)) throw Error("invalid scalar at index " + n);
	});
}
var Vg = /* @__PURE__ */ new WeakMap(), Hg = /* @__PURE__ */ new WeakMap();
function Ug(e) {
	return Hg.get(e) || 1;
}
function Wg(e) {
	if (e !== Mg) throw Error("invalid wNAF");
}
function Gg(e, t) {
	return {
		constTimeNegate: Pg,
		hasPrecomputes(e) {
			return Ug(e) !== 1;
		},
		unsafeLadder(t, n, r = e.ZERO) {
			let i = t;
			for (; n > Mg;) n & Ng && (r = r.add(i)), i = i.double(), n >>= Ng;
			return r;
		},
		precomputeWindow(e, n) {
			let { windows: r, windowSize: i } = Lg(n, t), a = [], o = e, s = o;
			for (let e = 0; e < r; e++) {
				s = o, a.push(s);
				for (let e = 1; e < i; e++) s = s.add(o), a.push(s);
				o = s.double();
			}
			return a;
		},
		wNAF(n, r, i) {
			let a = e.ZERO, o = e.BASE, s = Lg(n, t);
			for (let e = 0; e < s.windows; e++) {
				let { nextN: t, offset: n, isZero: c, isNeg: l, isNegF: u, offsetF: d } = Rg(i, e, s);
				i = t, c ? o = o.add(Pg(u, r[d])) : a = a.add(Pg(l, r[n]));
			}
			return Wg(i), {
				p: a,
				f: o
			};
		},
		wNAFUnsafe(n, r, i, a = e.ZERO) {
			let o = Lg(n, t);
			for (let e = 0; e < o.windows && i !== Mg; e++) {
				let { nextN: t, offset: n, isZero: s, isNeg: c } = Rg(i, e, o);
				if (i = t, !s) {
					let e = r[n];
					a = a.add(c ? e.negate() : e);
				}
			}
			return Wg(i), a;
		},
		getPrecomputes(e, t, n) {
			let r = Vg.get(t);
			return r || (r = this.precomputeWindow(t, e), e !== 1 && (typeof n == "function" && (r = n(r)), Vg.set(t, r))), r;
		},
		wNAFCached(e, t, n) {
			let r = Ug(e);
			return this.wNAF(r, this.getPrecomputes(r, e, n), t);
		},
		wNAFCachedUnsafe(e, t, n, r) {
			let i = Ug(e);
			return i === 1 ? this.unsafeLadder(e, t, r) : this.wNAFUnsafe(i, this.getPrecomputes(i, e, n), t, r);
		},
		setWindowSize(e, n) {
			Ig(n, t), Hg.set(e, n), Vg.delete(e);
		}
	};
}
function Kg(e, t, n, r) {
	let i = t, a = e.ZERO, o = e.ZERO;
	for (; n > Mg || r > Mg;) n & Ng && (a = a.add(i)), r & Ng && (o = o.add(i)), i = i.double(), n >>= Ng, r >>= Ng;
	return {
		p1: a,
		p2: o
	};
}
function qg(e, t, n, r) {
	zg(n, e), Bg(r, t);
	let i = n.length, a = r.length;
	if (i !== a) throw Error("arrays of points and scalars must have equal length");
	let o = e.ZERO, s = rg(BigInt(i)), c = 1;
	s > 12 ? c = s - 3 : s > 4 ? c = s - 2 : s > 0 && (c = 2);
	let l = ig(c), u = Array(Number(l) + 1).fill(o), d = Math.floor((t.BITS - 1) / c) * c, f = o;
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
function Jg(e, t) {
	if (t) {
		if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return Cg(t), t;
	} else return Og(e);
}
function Yg(e, t, n = {}) {
	if (!t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
	for (let e of [
		"p",
		"n",
		"h"
	]) {
		let n = t[e];
		if (!(typeof n == "bigint" && n > Mg)) throw Error(`CURVE.${e} must be positive bigint`);
	}
	let r = Jg(t.p, n.Fp), i = Jg(t.n, n.Fn), a = [
		"Gx",
		"Gy",
		"a",
		e === "weierstrass" ? "b" : "d"
	];
	for (let e of a) if (!r.isValid(t[e])) throw Error(`CURVE.${e} must be valid field element of CURVE.Fp`);
	return {
		Fp: r,
		Fn: i
	};
}
var Xg = BigInt(0), Zg = BigInt(1), Qg = BigInt(2);
function $g(e) {
	return og(e, {
		adjustScalarBytes: "function",
		powPminus2: "function"
	}), Object.freeze({ ...e });
}
function e_(e) {
	let { P: t, type: n, adjustScalarBytes: r, powPminus2: i, randomBytes: a } = $g(e), o = n === "x25519";
	if (!o && n !== "x448") throw Error("invalid type");
	let s = a || cp, c = o ? 255 : 448, l = o ? 32 : 56, u = BigInt(o ? 9 : 5), d = BigInt(o ? 121665 : 39081), f = o ? Qg ** BigInt(254) : Qg ** BigInt(447), p = f + (o ? BigInt(8) * Qg ** BigInt(251) - Zg : BigInt(4) * Qg ** BigInt(445) - Zg) + Zg, m = (e) => hg(e, t), h = g(u);
	function g(e) {
		return Qh(m(e), l);
	}
	function _(e) {
		let t = $h("u coordinate", e, l);
		return o && (t[31] &= 127), m(Xh(t));
	}
	function v(e) {
		return Xh(r($h("scalar", e, l)));
	}
	function y(e, t) {
		let n = S(_(t), v(e));
		if (n === Xg) throw Error("invalid private or public key received");
		return g(n);
	}
	function b(e) {
		return y(e, h);
	}
	function x(e, t, n) {
		let r = m(e * (t - n));
		return t = m(t - r), n = m(n + r), {
			x_2: t,
			x_3: n
		};
	}
	function S(e, n) {
		ng("u", e, Xg, t), ng("scalar", n, f, p);
		let r = n, a = e, o = Zg, s = Xg, l = e, u = Zg, h = Xg;
		for (let e = BigInt(c - 1); e >= Xg; e--) {
			let t = r >> e & Zg;
			h ^= t, {x_2: o, x_3: l} = x(h, o, l), {x_2: s, x_3: u} = x(h, s, u), h = t;
			let n = o + s, i = m(n * n), c = o - s, f = m(c * c), p = i - f, g = l + u, _ = m((l - u) * n), v = m(g * c), y = _ + v, b = _ - v;
			l = m(y * y), u = m(a * m(b * b)), o = m(i * f), s = m(p * (i + m(d * p)));
		}
		({x_2: o, x_3: l} = x(h, o, l)), {x_2: s, x_3: u} = x(h, s, u);
		let g = i(s);
		return m(o * g);
	}
	return {
		scalarMult: y,
		scalarMultBase: b,
		getSharedSecret: (e, t) => y(e, t),
		getPublicKey: (e) => b(e),
		utils: { randomPrivateKey: () => s(l) },
		GuBytes: h.slice()
	};
}
var t_ = BigInt(1), n_ = BigInt(2), r_ = BigInt(3), i_ = BigInt(5), a_ = {
	p: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),
	n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
	h: BigInt(8),
	a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
	d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
	Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
	Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
};
function o_(e) {
	let t = BigInt(10), n = BigInt(20), r = BigInt(40), i = BigInt(80), a = a_.p, o = e * e % a * e % a, s = gg(gg(o, n_, a) * o % a, t_, a) * e % a, c = gg(s, i_, a) * s % a, l = gg(c, t, a) * c % a, u = gg(l, n, a) * l % a, d = gg(u, r, a) * u % a;
	return {
		pow_p_5_8: gg(gg(gg(gg(d, i, a) * d % a, i, a) * d % a, t, a) * c % a, n_, a) * e % a,
		b2: o
	};
}
function s_(e) {
	return e[0] &= 248, e[31] &= 127, e[31] |= 64, e;
}
var c_ = (() => {
	let e = a_.p;
	return e_({
		P: e,
		type: "x25519",
		powPminus2: (t) => {
			let { pow_p_5_8: n, b2: r } = o_(t);
			return hg(gg(n, r_, e) * r, e);
		},
		adjustScalarBytes: s_
	});
})();
function l_(e) {
	e.lowS !== void 0 && Kh("lowS", e.lowS), e.prehash !== void 0 && Kh("prehash", e.prehash);
}
var u_ = {
	Err: class extends Error {
		constructor(e = "") {
			super(e);
		}
	},
	_tlv: {
		encode: (e, t) => {
			let { Err: n } = u_;
			if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
			if (t.length & 1) throw new n("tlv.encode: unpadded data");
			let r = t.length / 2, i = qh(r);
			if (i.length / 2 & 128) throw new n("tlv.encode: long form length too big");
			let a = r > 127 ? qh(i.length / 2 | 128) : "";
			return qh(e) + a + i + t;
		},
		decode(e, t) {
			let { Err: n } = u_, r = 0;
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
			let { Err: t } = u_;
			if (e < d_) throw new t("integer: negative integers are not allowed");
			let n = qh(e);
			if (Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1) throw new t("unexpected DER parsing assertion: unpadded hex");
			return n;
		},
		decode(e) {
			let { Err: t } = u_;
			if (e[0] & 128) throw new t("invalid signature integer: negative");
			if (e[0] === 0 && !(e[1] & 128)) throw new t("invalid signature integer: unnecessary leading zero");
			return Yh(e);
		}
	},
	toSig(e) {
		let { Err: t, _int: n, _tlv: r } = u_, i = $h("signature", e), { v: a, l: o } = r.decode(48, i);
		if (o.length) throw new t("invalid signature: left bytes after parsing");
		let { v: s, l: c } = r.decode(2, a), { v: l, l: u } = r.decode(2, c);
		if (u.length) throw new t("invalid signature: left bytes after parsing");
		return {
			r: n.decode(s),
			s: n.decode(l)
		};
	},
	hexFromSig(e) {
		let { _tlv: t, _int: n } = u_, r = t.encode(2, n.encode(e.r)) + t.encode(2, n.encode(e.s));
		return t.encode(48, r);
	}
}, d_ = BigInt(0), f_ = BigInt(1), p_ = BigInt(2), m_ = BigInt(3), h_ = BigInt(4);
function g_(e, t, n) {
	function r(r) {
		let i = e.sqr(r), a = e.mul(i, r);
		return e.add(e.add(a, e.mul(r, t)), n);
	}
	return r;
}
function __(e, t, n) {
	let { BYTES: r } = e;
	function i(i) {
		let a;
		if (typeof i == "bigint") a = i;
		else {
			let n = $h("private key", i);
			if (t) {
				if (!t.includes(n.length * 2)) throw Error("invalid private key");
				let e = new Uint8Array(r);
				e.set(n, e.length - n.length), n = e;
			}
			try {
				a = e.fromBytes(n);
			} catch {
				throw Error(`invalid private key: expected ui8a of size ${r}, got ${typeof i}`);
			}
		}
		if (n && (a = e.create(a)), !e.isValidNot0(a)) throw Error("invalid private key: out of range [1..N-1]");
		return a;
	}
	return i;
}
function v_(e, t = {}) {
	let { Fp: n, Fn: r } = Yg("weierstrass", e, t), { h: i, n: a } = e;
	og(t, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object",
		wrapPrivateKey: "boolean"
	});
	let { endo: o } = t;
	if (o && (!n.is0(e.a) || typeof o.beta != "bigint" || typeof o.splitScalar != "function")) throw Error("invalid endo: expected \"beta\": bigint and \"splitScalar\": function");
	function s() {
		if (!n.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	function c(e, t, r) {
		let { x: i, y: a } = t.toAffine(), o = n.toBytes(i);
		return Kh("isCompressed", r), r ? (s(), ip(y_(!n.isOdd(a)), o)) : ip(Uint8Array.of(4), o, n.toBytes(a));
	}
	function l(e) {
		Lf(e);
		let t = n.BYTES, r = t + 1, i = 2 * t + 1, a = e.length, o = e[0], c = e.subarray(1);
		if (a === r && (o === 2 || o === 3)) {
			let e = n.fromBytes(c);
			if (!n.isValid(e)) throw Error("bad point: is not on curve, wrong x");
			let t = f(e), r;
			try {
				r = n.sqrt(t);
			} catch (e) {
				let t = e instanceof Error ? ": " + e.message : "";
				throw Error("bad point: is not on curve, sqrt error" + t);
			}
			s();
			let i = n.isOdd(r);
			return (o & 1) == 1 !== i && (r = n.neg(r)), {
				x: e,
				y: r
			};
		} else if (a === i && o === 4) {
			let e = n.fromBytes(c.subarray(t * 0, t * 1)), r = n.fromBytes(c.subarray(t * 1, t * 2));
			if (!p(e, r)) throw Error("bad point: is not on curve");
			return {
				x: e,
				y: r
			};
		} else throw Error(`bad point: got length ${a}, expected compressed=${r} or uncompressed=${i}`);
	}
	let u = t.toBytes || c, d = t.fromBytes || l, f = g_(n, e.a, e.b);
	function p(e, t) {
		let r = n.sqr(t), i = f(e);
		return n.eql(r, i);
	}
	if (!p(e.Gx, e.Gy)) throw Error("bad curve params: generator point");
	let m = n.mul(n.pow(e.a, m_), h_), h = n.mul(n.sqr(e.b), BigInt(27));
	if (n.is0(n.add(m, h))) throw Error("bad curve params: a or b");
	function g(e, t, r = !1) {
		if (!n.isValid(t) || r && n.is0(t)) throw Error(`bad point coordinate ${e}`);
		return t;
	}
	function _(e) {
		if (!(e instanceof x)) throw Error("ProjectivePoint expected");
	}
	let v = sg((e, t) => {
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
	}), y = sg((e) => {
		if (e.is0()) {
			if (t.allowInfinityPoint && !n.is0(e.py)) return;
			throw Error("bad point: ZERO");
		}
		let { x: r, y: i } = e.toAffine();
		if (!n.isValid(r) || !n.isValid(i)) throw Error("bad point: x or y not field elements");
		if (!p(r, i)) throw Error("bad point: equation left != right");
		if (!e.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
		return !0;
	});
	function b(e, t, r, i, a) {
		return r = new x(n.mul(r.px, e), r.py, r.pz), t = Pg(i, t), r = Pg(a, r), t.add(r);
	}
	class x {
		constructor(e, t, n) {
			this.px = g("x", e), this.py = g("y", t, !0), this.pz = g("z", n), Object.freeze(this);
		}
		static fromAffine(e) {
			let { x: t, y: r } = e || {};
			if (!e || !n.isValid(t) || !n.isValid(r)) throw Error("invalid affine point");
			if (e instanceof x) throw Error("projective point not allowed");
			return n.is0(t) && n.is0(r) ? x.ZERO : new x(t, r, n.ONE);
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		static normalizeZ(e) {
			return Fg(x, "pz", e);
		}
		static fromBytes(e) {
			return Lf(e), x.fromHex(e);
		}
		static fromHex(e) {
			let t = x.fromAffine(d($h("pointHex", e)));
			return t.assertValidity(), t;
		}
		static fromPrivateKey(e) {
			let n = __(r, t.allowedPrivateKeyLengths, t.wrapPrivateKey);
			return x.BASE.multiply(n(e));
		}
		static msm(e, t) {
			return qg(x, r, e, t);
		}
		precompute(e = 8, t = !0) {
			return C.setWindowSize(this, e), t || this.multiply(m_), this;
		}
		_setWindowSize(e) {
			this.precompute(e);
		}
		assertValidity() {
			y(this);
		}
		hasEvenY() {
			let { y: e } = this.toAffine();
			if (!n.isOdd) throw Error("Field doesn't support isOdd");
			return !n.isOdd(e);
		}
		equals(e) {
			_(e);
			let { px: t, py: r, pz: i } = this, { px: a, py: o, pz: s } = e, c = n.eql(n.mul(t, s), n.mul(a, i)), l = n.eql(n.mul(r, s), n.mul(o, i));
			return c && l;
		}
		negate() {
			return new x(this.px, n.neg(this.py), this.pz);
		}
		double() {
			let { a: t, b: r } = e, i = n.mul(r, m_), { px: a, py: o, pz: s } = this, c = n.ZERO, l = n.ZERO, u = n.ZERO, d = n.mul(a, a), f = n.mul(o, o), p = n.mul(s, s), m = n.mul(a, o);
			return m = n.add(m, m), u = n.mul(a, s), u = n.add(u, u), c = n.mul(t, u), l = n.mul(i, p), l = n.add(c, l), c = n.sub(f, l), l = n.add(f, l), l = n.mul(c, l), c = n.mul(m, c), u = n.mul(i, u), p = n.mul(t, p), m = n.sub(d, p), m = n.mul(t, m), m = n.add(m, u), u = n.add(d, d), d = n.add(u, d), d = n.add(d, p), d = n.mul(d, m), l = n.add(l, d), p = n.mul(o, s), p = n.add(p, p), d = n.mul(p, m), c = n.sub(c, d), u = n.mul(p, f), u = n.add(u, u), u = n.add(u, u), new x(c, l, u);
		}
		add(t) {
			_(t);
			let { px: r, py: i, pz: a } = this, { px: o, py: s, pz: c } = t, l = n.ZERO, u = n.ZERO, d = n.ZERO, f = e.a, p = n.mul(e.b, m_), m = n.mul(r, o), h = n.mul(i, s), g = n.mul(a, c), v = n.add(r, i), y = n.add(o, s);
			v = n.mul(v, y), y = n.add(m, h), v = n.sub(v, y), y = n.add(r, a);
			let b = n.add(o, c);
			return y = n.mul(y, b), b = n.add(m, g), y = n.sub(y, b), b = n.add(i, a), l = n.add(s, c), b = n.mul(b, l), l = n.add(h, g), b = n.sub(b, l), d = n.mul(f, y), l = n.mul(p, g), d = n.add(l, d), l = n.sub(h, d), d = n.add(h, d), u = n.mul(l, d), h = n.add(m, m), h = n.add(h, m), g = n.mul(f, g), y = n.mul(p, y), h = n.add(h, g), g = n.sub(m, g), g = n.mul(f, g), y = n.add(y, g), m = n.mul(h, y), u = n.add(u, m), m = n.mul(b, y), l = n.mul(v, l), l = n.sub(l, m), m = n.mul(v, h), d = n.mul(b, d), d = n.add(d, m), new x(l, u, d);
		}
		subtract(e) {
			return this.add(e.negate());
		}
		is0() {
			return this.equals(x.ZERO);
		}
		multiply(e) {
			let { endo: n } = t;
			if (!r.isValidNot0(e)) throw Error("invalid scalar: out of range");
			let i, a, o = (e) => C.wNAFCached(this, e, x.normalizeZ);
			if (n) {
				let { k1neg: t, k1: r, k2neg: s, k2: c } = n.splitScalar(e), { p: l, f: u } = o(r), { p: d, f } = o(c);
				a = u.add(f), i = b(n.beta, l, d, t, s);
			} else {
				let { p: t, f: n } = o(e);
				i = t, a = n;
			}
			return x.normalizeZ([i, a])[0];
		}
		multiplyUnsafe(e) {
			let { endo: n } = t, i = this;
			if (!r.isValid(e)) throw Error("invalid scalar: out of range");
			if (e === d_ || i.is0()) return x.ZERO;
			if (e === f_) return i;
			if (C.hasPrecomputes(this)) return this.multiply(e);
			if (n) {
				let { k1neg: t, k1: r, k2neg: a, k2: o } = n.splitScalar(e), { p1: s, p2: c } = Kg(x, i, r, o);
				return b(n.beta, s, c, t, a);
			} else return C.wNAFCachedUnsafe(i, e);
		}
		multiplyAndAddUnsafe(e, t, n) {
			let r = this.multiplyUnsafe(t).add(e.multiplyUnsafe(n));
			return r.is0() ? void 0 : r;
		}
		toAffine(e) {
			return v(this, e);
		}
		isTorsionFree() {
			let { isTorsionFree: e } = t;
			return i === f_ ? !0 : e ? e(x, this) : C.wNAFCachedUnsafe(this, a).is0();
		}
		clearCofactor() {
			let { clearCofactor: e } = t;
			return i === f_ ? this : e ? e(x, this) : this.multiplyUnsafe(i);
		}
		toBytes(e = !0) {
			return Kh("isCompressed", e), this.assertValidity(), u(x, this, e);
		}
		toRawBytes(e = !0) {
			return this.toBytes(e);
		}
		toHex(e = !0) {
			return Qf(this.toBytes(e));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	x.BASE = new x(e.Gx, e.Gy, n.ONE), x.ZERO = new x(n.ZERO, n.ONE, n.ZERO), x.Fp = n, x.Fn = r;
	let S = r.BITS, C = Gg(x, t.endo ? Math.ceil(S / 2) : S);
	return x;
}
function y_(e) {
	return Uint8Array.of(e ? 2 : 3);
}
function b_(e, t, n = {}) {
	og(t, { hash: "function" }, {
		hmac: "function",
		lowS: "boolean",
		randomBytes: "function",
		bits2int: "function",
		bits2int_modN: "function"
	});
	let r = t.randomBytes || cp, i = t.hmac || ((e, ...n) => Lh(t.hash, e, ip(...n))), { Fp: a, Fn: o } = e, { ORDER: s, BITS: c } = o;
	function l(e) {
		return e > s >> f_;
	}
	function u(e) {
		return l(e) ? o.neg(e) : e;
	}
	function d(e, t) {
		if (!o.isValidNot0(t)) throw Error(`invalid signature ${e}: out of range 1..CURVE.n`);
	}
	class f {
		constructor(e, t, n) {
			d("r", e), d("s", t), this.r = e, this.s = t, n != null && (this.recovery = n), Object.freeze(this);
		}
		static fromCompact(e) {
			let t = o.BYTES, n = $h("compactSignature", e, t * 2);
			return new f(o.fromBytes(n.subarray(0, t)), o.fromBytes(n.subarray(t, t * 2)));
		}
		static fromDER(e) {
			let { r: t, s: n } = u_.toSig($h("DER", e));
			return new f(t, n);
		}
		assertValidity() {}
		addRecoveryBit(e) {
			return new f(this.r, this.s, e);
		}
		recoverPublicKey(t) {
			let n = a.ORDER, { r, s: i, recovery: c } = this;
			if (c == null || ![
				0,
				1,
				2,
				3
			].includes(c)) throw Error("recovery id invalid");
			if (s * p_ < n && c > 1) throw Error("recovery id is ambiguous for h>1 curve");
			let l = c === 2 || c === 3 ? r + s : r;
			if (!a.isValid(l)) throw Error("recovery id 2 or 3 invalid");
			let u = a.toBytes(l), d = e.fromHex(ip(y_((c & 1) == 0), u)), f = o.inv(l), p = y($h("msgHash", t)), m = o.create(-p * f), h = o.create(i * f), g = e.BASE.multiplyUnsafe(m).add(d.multiplyUnsafe(h));
			if (g.is0()) throw Error("point at infinify");
			return g.assertValidity(), g;
		}
		hasHighS() {
			return l(this.s);
		}
		normalizeS() {
			return this.hasHighS() ? new f(this.r, o.neg(this.s), this.recovery) : this;
		}
		toBytes(e) {
			if (e === "compact") return ip(o.toBytes(this.r), o.toBytes(this.s));
			if (e === "der") return tp(u_.hexFromSig(this));
			throw Error("invalid format");
		}
		toDERRawBytes() {
			return this.toBytes("der");
		}
		toDERHex() {
			return Qf(this.toBytes("der"));
		}
		toCompactRawBytes() {
			return this.toBytes("compact");
		}
		toCompactHex() {
			return Qf(this.toBytes("compact"));
		}
	}
	let p = __(o, n.allowedPrivateKeyLengths, n.wrapPrivateKey), m = {
		isValidPrivateKey(e) {
			try {
				return p(e), !0;
			} catch {
				return !1;
			}
		},
		normPrivateKeyToScalar: p,
		randomPrivateKey: () => {
			let e = s;
			return jg(r(Ag(e)), e);
		},
		precompute(t = 8, n = e.BASE) {
			return n.precompute(t, !1);
		}
	};
	function h(t, n = !0) {
		return e.fromPrivateKey(t).toBytes(n);
	}
	function g(t) {
		if (typeof t == "bigint") return !1;
		if (t instanceof e) return !0;
		let r = $h("key", t).length, i = a.BYTES, s = i + 1, c = 2 * i + 1;
		if (!(n.allowedPrivateKeyLengths || o.BYTES === s)) return r === s || r === c;
	}
	function _(t, n, r = !0) {
		if (g(t) === !0) throw Error("first arg must be private key");
		if (g(n) === !1) throw Error("second arg must be public key");
		return e.fromHex(n).multiply(p(t)).toBytes(r);
	}
	let v = t.bits2int || function(e) {
		if (e.length > 8192) throw Error("input is too large");
		let t = Yh(e), n = e.length * 8 - c;
		return n > 0 ? t >> BigInt(n) : t;
	}, y = t.bits2int_modN || function(e) {
		return o.create(v(e));
	}, b = ig(c);
	function x(e) {
		return ng("num < 2^" + c, e, d_, b), o.toBytes(e);
	}
	function S(n, i, s = C) {
		if (["recovered", "canonical"].some((e) => e in s)) throw Error("sign() legacy options not supported");
		let { hash: c } = t, { lowS: d, prehash: m, extraEntropy: h } = s;
		d ?? (d = !0), n = $h("msgHash", n), l_(s), m && (n = $h("prehashed msgHash", c(n)));
		let g = y(n), _ = p(i), b = [x(_), x(g)];
		if (h != null && h !== !1) {
			let e = h === !0 ? r(a.BYTES) : h;
			b.push($h("extraEntropy", e));
		}
		let S = ip(...b), w = g;
		function T(t) {
			let n = v(t);
			if (!o.isValidNot0(n)) return;
			let r = o.inv(n), i = e.BASE.multiply(n).toAffine(), a = o.create(i.x);
			if (a === d_) return;
			let s = o.create(r * o.create(w + a * _));
			if (s === d_) return;
			let c = (i.x === a ? 0 : 2) | Number(i.y & f_), p = s;
			return d && l(s) && (p = u(s), c ^= 1), new f(a, p, c);
		}
		return {
			seed: S,
			k2sig: T
		};
	}
	let C = {
		lowS: t.lowS,
		prehash: !1
	}, w = {
		lowS: t.lowS,
		prehash: !1
	};
	function T(e, n, r = C) {
		let { seed: a, k2sig: s } = S(e, n, r);
		return ag(t.hash.outputLen, o.BYTES, i)(a, s);
	}
	e.BASE.precompute(8);
	function E(n, r, i, a = w) {
		let s = n;
		r = $h("msgHash", r), i = $h("publicKey", i), l_(a);
		let { lowS: c, prehash: l, format: u } = a;
		if ("strict" in a) throw Error("options.strict was renamed to lowS");
		if (u !== void 0 && ![
			"compact",
			"der",
			"js"
		].includes(u)) throw Error("format must be \"compact\", \"der\" or \"js\"");
		let d = typeof s == "string" || Ff(s), p = !d && !u && typeof s == "object" && !!s && typeof s.r == "bigint" && typeof s.s == "bigint";
		if (!d && !p) throw Error("invalid signature, expected Uint8Array, hex string or Signature instance");
		let m, h;
		try {
			if (p) if (u === void 0 || u === "js") m = new f(s.r, s.s);
			else throw Error("invalid format");
			if (d) {
				try {
					u !== "compact" && (m = f.fromDER(s));
				} catch (e) {
					if (!(e instanceof u_.Err)) throw e;
				}
				!m && u !== "der" && (m = f.fromCompact(s));
			}
			h = e.fromHex(i);
		} catch {
			return !1;
		}
		if (!m || c && m.hasHighS()) return !1;
		l && (r = t.hash(r));
		let { r: g, s: _ } = m, v = y(r), b = o.inv(_), x = o.create(v * b), S = o.create(g * b), C = e.BASE.multiplyUnsafe(x).add(h.multiplyUnsafe(S));
		return C.is0() ? !1 : o.create(C.x) === g;
	}
	return Object.freeze({
		getPublicKey: h,
		getSharedSecret: _,
		sign: T,
		verify: E,
		utils: m,
		Point: e,
		Signature: f
	});
}
function x_(e) {
	let t = {
		a: e.a,
		b: e.b,
		p: e.Fp.ORDER,
		n: e.n,
		h: e.h,
		Gx: e.Gx,
		Gy: e.Gy
	};
	return {
		CURVE: t,
		curveOpts: {
			Fp: e.Fp,
			Fn: Og(t.n, e.nBitLength),
			allowedPrivateKeyLengths: e.allowedPrivateKeyLengths,
			allowInfinityPoint: e.allowInfinityPoint,
			endo: e.endo,
			wrapPrivateKey: e.wrapPrivateKey,
			isTorsionFree: e.isTorsionFree,
			clearCofactor: e.clearCofactor,
			fromBytes: e.fromBytes,
			toBytes: e.toBytes
		}
	};
}
function S_(e) {
	let { CURVE: t, curveOpts: n } = x_(e);
	return {
		CURVE: t,
		curveOpts: n,
		ecdsaOpts: {
			hash: e.hash,
			hmac: e.hmac,
			randomBytes: e.randomBytes,
			lowS: e.lowS,
			bits2int: e.bits2int,
			bits2int_modN: e.bits2int_modN
		}
	};
}
function C_(e, t) {
	return Object.assign({}, t, {
		ProjectivePoint: t.Point,
		CURVE: e
	});
}
function w_(e) {
	let { CURVE: t, curveOpts: n, ecdsaOpts: r } = S_(e);
	return C_(e, b_(v_(t, n), r, n));
}
function T_(e, t) {
	let n = (t) => w_({
		...e,
		hash: t
	});
	return {
		...n(t),
		create: n
	};
}
var E_ = {
	p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
	n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
	h: BigInt(1),
	a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
	b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
	Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
	Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
}, D_ = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
	n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
	h: BigInt(1),
	a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
	b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
	Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
	Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
}, O_ = {
	p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
	n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
	h: BigInt(1),
	a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
	b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
	Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
	Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
}, k_ = Og(E_.p), A_ = Og(D_.p), j_ = Og(O_.p), M_ = T_({
	...E_,
	Fp: k_,
	lowS: !1
}, Gp);
T_({
	...D_,
	Fp: A_,
	lowS: !1
}, qp), T_({
	...O_,
	Fp: j_,
	lowS: !1,
	allowedPrivateKeyLengths: [
		130,
		131,
		132
	]
}, Kp);
var N_ = M_, P_ = "base10", F_ = "base16", I_ = "base64pad", L_ = "base64url", R_ = "utf8", z_ = 0, B_ = 1, V_ = 12, H_ = 32;
function U_() {
	let e = c_.utils.randomPrivateKey(), t = c_.getPublicKey(e);
	return {
		privateKey: nd(e, F_),
		publicKey: nd(t, F_)
	};
}
function W_() {
	return nd(cp(H_), F_);
}
function G_(e, t) {
	return nd(Hh(Uh, c_.getSharedSecret(td(e, F_), td(t, F_)), void 0, void 0, H_), F_);
}
function K_(e) {
	return nd(Uh(td(e, F_)), F_);
}
function q_(e) {
	return nd(Uh(td(e, R_)), F_);
}
function J_(e) {
	return td(`${e}`, P_);
}
function Y_(e) {
	return Number(nd(e, P_));
}
function X_(e) {
	return e.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function Z_(e) {
	let t = e.replace(/-/g, "+").replace(/_/g, "/"), n = (4 - t.length % 4) % 4;
	return t + "=".repeat(n);
}
function Q_(e) {
	let t = J_(typeof e.type < "u" ? e.type : 0);
	if (Y_(t) === 1 && typeof e.senderPublicKey > "u") throw Error("Missing sender public key for type 1 envelope");
	let n = typeof e.senderPublicKey < "u" ? td(e.senderPublicKey, F_) : void 0, r = typeof e.iv < "u" ? td(e.iv, F_) : cp(V_), i = nv({
		type: t,
		sealed: Fh(td(e.symKey, F_), r).encrypt(td(e.message, R_)),
		iv: r,
		senderPublicKey: n
	});
	return e.encoding === "base64url" ? X_(i) : i;
}
function $_(e) {
	let t = td(e.symKey, F_), { sealed: n, iv: r } = rv({
		encoded: e.encoded,
		encoding: e.encoding
	}), i = Fh(t, r).decrypt(n);
	if (i === null) throw Error("Failed to decrypt");
	return nd(i, R_);
}
function ev(e, t) {
	let n = J_(2), r = cp(V_), i = nv({
		type: n,
		sealed: td(e, R_),
		iv: r
	});
	return t === "base64url" ? X_(i) : i;
}
function tv(e, t) {
	let { sealed: n } = rv({
		encoded: e,
		encoding: t
	});
	return nd(n, R_);
}
function nv(e) {
	if (Y_(e.type) === 2) return nd(hl([e.type, e.sealed]), I_);
	if (Y_(e.type) === 1) {
		if (typeof e.senderPublicKey > "u") throw Error("Missing sender public key for type 1 envelope");
		return nd(hl([
			e.type,
			e.senderPublicKey,
			e.iv,
			e.sealed
		]), I_);
	}
	return nd(hl([
		e.type,
		e.iv,
		e.sealed
	]), I_);
}
function rv(e) {
	let t = td((e.encoding || "base64pad") === "base64url" ? Z_(e.encoded) : e.encoded, I_), n = t.slice(z_, B_), r = B_;
	if (Y_(n) === 1) {
		let e = r + H_, i = e + V_, a = t.slice(r, e), o = t.slice(e, i);
		return {
			type: n,
			sealed: t.slice(i),
			iv: o,
			senderPublicKey: a
		};
	}
	if (Y_(n) === 2) return {
		type: n,
		sealed: t.slice(r),
		iv: cp(V_)
	};
	let i = r + V_, a = t.slice(r, i);
	return {
		type: n,
		sealed: t.slice(i),
		iv: a
	};
}
function iv(e, t) {
	let n = rv({
		encoded: e,
		encoding: t?.encoding
	});
	return av({
		type: Y_(n.type),
		senderPublicKey: typeof n.senderPublicKey < "u" ? nd(n.senderPublicKey, F_) : void 0,
		receiverPublicKey: t?.receiverPublicKey
	});
}
function av(e) {
	let t = e?.type || 0;
	if (t === 1) {
		if (typeof e?.senderPublicKey > "u") throw Error("missing sender public key");
		if (typeof e?.receiverPublicKey > "u") throw Error("missing receiver public key");
	}
	return {
		type: t,
		senderPublicKey: e?.senderPublicKey,
		receiverPublicKey: e?.receiverPublicKey
	};
}
function ov(e) {
	return e.type === 1 && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
function sv(e) {
	return e.type === 2;
}
function cv(e) {
	let t = Buffer.from(e.x, "base64"), n = Buffer.from(e.y, "base64");
	return hl([
		new Uint8Array([4]),
		t,
		n
	]);
}
function lv(e, t) {
	let [n, r, i] = e.split("."), a = Buffer.from(Z_(i), "base64");
	if (a.length !== 64) throw Error("Invalid signature length");
	let o = a.slice(0, 32), s = a.slice(32, 64), c = Uh(`${n}.${r}`), l = cv(t);
	if (!N_.verify(hl([o, s]), c, l)) throw Error("Invalid signature");
	return So(e).payload;
}
function uv(e) {
	return e?.relay || { protocol: "irn" };
}
function dv(e) {
	let t = rd[e];
	if (typeof t > "u") throw Error(`Relay Protocol not supported: ${e}`);
	return t;
}
function fv(e, t = "-") {
	let n = {}, r = "relay" + t;
	return Object.keys(e).forEach((t) => {
		if (t.startsWith(r)) {
			let i = t.replace(r, "");
			n[i] = e[t];
		}
	}), n;
}
function pv(e) {
	if (!e.includes("wc:")) {
		let t = cf(e);
		t != null && t.includes("wc:") && (e = t);
	}
	e = e.includes("wc://") ? e.replace("wc://", "") : e, e = e.includes("wc:") ? e.replace("wc:", "") : e;
	let t = e.indexOf(":"), n = e.indexOf("?") === -1 ? void 0 : e.indexOf("?"), r = e.substring(0, t), i = e.substring(t + 1, n).split("@"), a = typeof n < "u" ? e.substring(n) : "", o = new URLSearchParams(a), s = {};
	o.forEach((e, t) => {
		s[t] = e;
	});
	let c = typeof s.methods == "string" ? s.methods.split(",") : void 0;
	return {
		protocol: r,
		topic: mv(i[0]),
		version: parseInt(i[1], 10),
		symKey: s.symKey,
		relay: fv(s),
		methods: c,
		expiryTimestamp: s.expiryTimestamp ? parseInt(s.expiryTimestamp, 10) : void 0
	};
}
function mv(e) {
	return e.startsWith("//") ? e.substring(2) : e;
}
function hv(e, t = "-") {
	let n = {};
	return Object.keys(e).forEach((r) => {
		let i = r, a = "relay" + t + i;
		e[i] && (n[a] = e[i]);
	}), n;
}
function gv(e) {
	let t = new URLSearchParams(), n = hv(e.relay);
	Object.keys(n).sort().forEach((e) => {
		t.set(e, n[e]);
	}), t.set("symKey", e.symKey), e.expiryTimestamp && t.set("expiryTimestamp", e.expiryTimestamp.toString()), e.methods && t.set("methods", e.methods.join(","));
	let r = t.toString();
	return `${e.protocol}:${e.topic}@${e.version}?${r}`;
}
function _v(e, t, n) {
	return `${e}?wc_ev=${n}&topic=${t}`;
}
var vv = Object.defineProperty, yv = Object.defineProperties, bv = Object.getOwnPropertyDescriptors, xv = Object.getOwnPropertySymbols, Sv = Object.prototype.hasOwnProperty, Cv = Object.prototype.propertyIsEnumerable, wv = (e, t, n) => t in e ? vv(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Tv = (e, t) => {
	for (var n in t || (t = {})) Sv.call(t, n) && wv(e, n, t[n]);
	if (xv) for (var n of xv(t)) Cv.call(t, n) && wv(e, n, t[n]);
	return e;
}, Ev = (e, t) => yv(e, bv(t));
function Dv(e) {
	let t = [];
	return e.forEach((e) => {
		let [n, r] = e.split(":");
		t.push(`${n}:${r}`);
	}), t;
}
function Ov(e) {
	let t = [];
	return Object.values(e).forEach((e) => {
		t.push(...Dv(e.accounts));
	}), t;
}
function kv(e, t) {
	let n = [];
	return Object.values(e).forEach((e) => {
		Dv(e.accounts).includes(t) && n.push(...e.methods);
	}), n;
}
function Av(e, t) {
	let n = [];
	return Object.values(e).forEach((e) => {
		Dv(e.accounts).includes(t) && n.push(...e.events);
	}), n;
}
function jv(e) {
	return e.includes(":");
}
function Mv(e) {
	return jv(e) ? e.split(":")[0] : e;
}
function Nv(e) {
	let t = {};
	if (!Bv(e)) return t;
	for (let [n, r] of Object.entries(e)) {
		let e = jv(n) ? [n] : r.chains, i = r.methods || [], a = r.events || [], o = Mv(n);
		t[o] = Ev(Tv({}, t[o]), {
			chains: Xd(e, t[o]?.chains),
			methods: Xd(i, t[o]?.methods),
			events: Xd(a, t[o]?.events)
		});
	}
	return t;
}
function Pv(e) {
	let t = {};
	return e?.forEach((e) => {
		var n;
		let [r, i] = e.split(":");
		t[r] || (t[r] = {
			accounts: [],
			chains: [],
			events: [],
			methods: []
		}), t[r].accounts.push(e), (n = t[r].chains) == null || n.push(`${r}:${i}`);
	}), t;
}
function Fv(e, t) {
	t = t.map((e) => e.replace("did:pkh:", ""));
	let n = Pv(t);
	for (let [t, r] of Object.entries(n)) r.methods ? r.methods = Xd(r.methods, e) : r.methods = e, r.events = ["chainChanged", "accountsChanged"];
	return n;
}
function Iv(e, t) {
	let n = Nv(e), r = Nv(t), i = {}, a = Object.keys(n).concat(Object.keys(r));
	for (let e of a) i[e] = {
		chains: Xd(n[e]?.chains, r[e]?.chains),
		methods: Xd(n[e]?.methods, r[e]?.methods),
		events: Xd(n[e]?.events, r[e]?.events)
	};
	return i;
}
var Lv = {
	INVALID_METHOD: {
		message: "Invalid method.",
		code: 1001
	},
	INVALID_EVENT: {
		message: "Invalid event.",
		code: 1002
	},
	INVALID_UPDATE_REQUEST: {
		message: "Invalid update request.",
		code: 1003
	},
	INVALID_EXTEND_REQUEST: {
		message: "Invalid extend request.",
		code: 1004
	},
	INVALID_SESSION_SETTLE_REQUEST: {
		message: "Invalid session settle request.",
		code: 1005
	},
	UNAUTHORIZED_METHOD: {
		message: "Unauthorized method.",
		code: 3001
	},
	UNAUTHORIZED_EVENT: {
		message: "Unauthorized event.",
		code: 3002
	},
	UNAUTHORIZED_UPDATE_REQUEST: {
		message: "Unauthorized update request.",
		code: 3003
	},
	UNAUTHORIZED_EXTEND_REQUEST: {
		message: "Unauthorized extend request.",
		code: 3004
	},
	USER_REJECTED: {
		message: "User rejected.",
		code: 5e3
	},
	USER_REJECTED_CHAINS: {
		message: "User rejected chains.",
		code: 5001
	},
	USER_REJECTED_METHODS: {
		message: "User rejected methods.",
		code: 5002
	},
	USER_REJECTED_EVENTS: {
		message: "User rejected events.",
		code: 5003
	},
	UNSUPPORTED_CHAINS: {
		message: "Unsupported chains.",
		code: 5100
	},
	UNSUPPORTED_METHODS: {
		message: "Unsupported methods.",
		code: 5101
	},
	UNSUPPORTED_EVENTS: {
		message: "Unsupported events.",
		code: 5102
	},
	UNSUPPORTED_ACCOUNTS: {
		message: "Unsupported accounts.",
		code: 5103
	},
	UNSUPPORTED_NAMESPACE_KEY: {
		message: "Unsupported namespace key.",
		code: 5104
	},
	USER_DISCONNECTED: {
		message: "User disconnected.",
		code: 6e3
	},
	SESSION_SETTLEMENT_FAILED: {
		message: "Session settlement failed.",
		code: 7e3
	},
	WC_METHOD_UNSUPPORTED: {
		message: "Unsupported wc_ method.",
		code: 10001
	}
}, Rv = {
	NOT_INITIALIZED: {
		message: "Not initialized.",
		code: 1
	},
	NO_MATCHING_KEY: {
		message: "No matching key.",
		code: 2
	},
	RESTORE_WILL_OVERRIDE: {
		message: "Restore will override.",
		code: 3
	},
	RESUBSCRIBED: {
		message: "Resubscribed.",
		code: 4
	},
	MISSING_OR_INVALID: {
		message: "Missing or invalid.",
		code: 5
	},
	EXPIRED: {
		message: "Expired.",
		code: 6
	},
	UNKNOWN_TYPE: {
		message: "Unknown type.",
		code: 7
	},
	MISMATCHED_TOPIC: {
		message: "Mismatched topic.",
		code: 8
	},
	NON_CONFORMING_NAMESPACES: {
		message: "Non conforming namespaces.",
		code: 9
	}
};
function U(e, t) {
	let { message: n, code: r } = Rv[e];
	return {
		message: t ? `${n} ${t}` : n,
		code: r
	};
}
function W(e, t) {
	let { message: n, code: r } = Lv[e];
	return {
		message: t ? `${n} ${t}` : n,
		code: r
	};
}
function zv(e, t) {
	return Array.isArray(e) ? typeof t < "u" && e.length ? e.every(t) : !0 : !1;
}
function Bv(e) {
	return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function Vv(e) {
	return typeof e > "u";
}
function Hv(e, t) {
	return t && Vv(e) ? !0 : typeof e == "string" && !!e.trim().length;
}
function Uv(e, t) {
	return t && Vv(e) ? !0 : typeof e == "number" && !isNaN(e);
}
function Wv(e, t) {
	let { requiredNamespaces: n } = t, r = Object.keys(e.namespaces), i = Object.keys(n), a = !0;
	return zd(i, r) ? (r.forEach((t) => {
		let { accounts: r, methods: i, events: o } = e.namespaces[t], s = Dv(r), c = n[t];
		(!zd(pd(t, c), s) || !zd(c.methods, i) || !zd(c.events, o)) && (a = !1);
	}), a) : !1;
}
function Gv(e) {
	return Hv(e, !1) && e.includes(":") ? e.split(":").length === 2 : !1;
}
function Kv(e) {
	if (Hv(e, !1) && e.includes(":")) {
		let t = e.split(":");
		if (t.length === 3) {
			let e = t[0] + ":" + t[1];
			return !!t[2] && Gv(e);
		}
	}
	return !1;
}
function qv(e) {
	function t(e) {
		try {
			return typeof new URL(e) < "u";
		} catch {
			return !1;
		}
	}
	try {
		if (Hv(e, !1)) return t(e) ? !0 : t(cf(e));
	} catch {}
	return !1;
}
function Jv(e) {
	return e?.proposer?.publicKey;
}
function Yv(e) {
	return e?.topic;
}
function Xv(e, t) {
	let n = null;
	return Hv(e?.publicKey, !1) || (n = U("MISSING_OR_INVALID", `${t} controller public key should be a string`)), n;
}
function Zv(e) {
	let t = !0;
	return zv(e) ? e.length && (t = e.every((e) => Hv(e, !1))) : t = !1, t;
}
function Qv(e, t, n) {
	let r = null;
	return zv(t) && t.length ? t.forEach((e) => {
		r || Gv(e) || (r = W("UNSUPPORTED_CHAINS", `${n}, chain ${e} should be a string and conform to "namespace:chainId" format`));
	}) : Gv(e) || (r = W("UNSUPPORTED_CHAINS", `${n}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function $v(e, t, n) {
	let r = null;
	return Object.entries(e).forEach(([e, i]) => {
		if (r) return;
		let a = Qv(e, pd(e, i), `${t} ${n}`);
		a && (r = a);
	}), r;
}
function ey(e, t) {
	let n = null;
	return zv(e) ? e.forEach((e) => {
		n || Kv(e) || (n = W("UNSUPPORTED_ACCOUNTS", `${t}, account ${e} should be a string and conform to "namespace:chainId:address" format`));
	}) : n = W("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n;
}
function ty(e, t) {
	let n = null;
	return Object.values(e).forEach((e) => {
		if (n) return;
		let r = ey(e?.accounts, `${t} namespace`);
		r && (n = r);
	}), n;
}
function ny(e, t) {
	let n = null;
	return Zv(e?.methods) ? Zv(e?.events) || (n = W("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : n = W("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), n;
}
function ry(e, t) {
	let n = null;
	return Object.values(e).forEach((e) => {
		if (n) return;
		let r = ny(e, `${t}, namespace`);
		r && (n = r);
	}), n;
}
function iy(e, t, n) {
	let r = null;
	if (e && Bv(e)) {
		let i = ry(e, t);
		i && (r = i);
		let a = $v(e, t, n);
		a && (r = a);
	} else r = U("MISSING_OR_INVALID", `${t}, ${n} should be an object with data`);
	return r;
}
function ay(e, t) {
	let n = null;
	if (e && Bv(e)) {
		let r = ry(e, t);
		r && (n = r);
		let i = ty(e, t);
		i && (n = i);
	} else n = U("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
	return n;
}
function oy(e) {
	return Hv(e.protocol, !0);
}
function sy(e, t) {
	let n = !1;
	return t && !e ? n = !0 : e && zv(e) && e.length && e.forEach((e) => {
		n = oy(e);
	}), n;
}
function cy(e) {
	return typeof e == "number";
}
function ly(e) {
	return typeof e < "u" && !0;
}
function uy(e) {
	return !(!e || typeof e != "object" || !e.code || !Uv(e.code, !1) || !e.message || !Hv(e.message, !1));
}
function dy(e) {
	return !(Vv(e) || !Hv(e.method, !1));
}
function fy(e) {
	return !(Vv(e) || Vv(e.result) && Vv(e.error) || !Uv(e.id, !1) || !Hv(e.jsonrpc, !1));
}
function py(e) {
	return !(Vv(e) || !Hv(e.name, !1));
}
function my(e, t) {
	return !(!Gv(t) || !Ov(e).includes(t));
}
function hy(e, t, n) {
	return Hv(n, !1) ? kv(e, t).includes(n) : !1;
}
function gy(e, t, n) {
	return Hv(n, !1) ? Av(e, t).includes(n) : !1;
}
function _y(e, t, n) {
	let r = null, i = vy(e), a = by(t), o = Object.keys(i), s = Object.keys(a), c = yy(Object.keys(e)), l = yy(Object.keys(t)), u = c.filter((e) => !l.includes(e));
	return u.length && (r = U("NON_CONFORMING_NAMESPACES", `${n} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(t).toString()}`)), zd(o, s) || (r = U("NON_CONFORMING_NAMESPACES", `${n} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${s.toString()}`)), Object.keys(t).forEach((e) => {
		if (!e.includes(":") || r) return;
		let i = Dv(t[e].accounts);
		i.includes(e) || (r = U("NON_CONFORMING_NAMESPACES", `${n} namespaces accounts don't satisfy namespace accounts for ${e}
        Required: ${e}
        Approved: ${i.toString()}`));
	}), o.forEach((e) => {
		r || (zd(i[e].methods, a[e].methods) ? zd(i[e].events, a[e].events) || (r = U("NON_CONFORMING_NAMESPACES", `${n} namespaces events don't satisfy namespace events for ${e}`)) : r = U("NON_CONFORMING_NAMESPACES", `${n} namespaces methods don't satisfy namespace methods for ${e}`));
	}), r;
}
function vy(e) {
	let t = {};
	return Object.keys(e).forEach((n) => {
		var r;
		n.includes(":") ? t[n] = e[n] : (r = e[n].chains) == null || r.forEach((r) => {
			t[r] = {
				methods: e[n].methods,
				events: e[n].events
			};
		});
	}), t;
}
function yy(e) {
	return [...new Set(e.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function by(e) {
	let t = {};
	return Object.keys(e).forEach((n) => {
		n.includes(":") ? t[n] = e[n] : Dv(e[n].accounts)?.forEach((r) => {
			t[r] = {
				accounts: e[n].accounts.filter((e) => e.includes(`${r}:`)),
				methods: e[n].methods,
				events: e[n].events
			};
		});
	}), t;
}
function xy(e, t) {
	return Uv(e, !1) && e <= t.max && e >= t.min;
}
function Sy() {
	let e = Ad();
	return new Promise((t) => {
		switch (e) {
			case wd.browser:
				t(Cy());
				break;
			case wd.reactNative:
				t(wy());
				break;
			case wd.node:
				t(Ty());
				break;
			default: t(!0);
		}
	});
}
function Cy() {
	return kd() && navigator?.onLine;
}
async function wy() {
	return Ed() && typeof globalThis < "u" && globalThis != null && globalThis.NetInfo ? (await (globalThis == null ? void 0 : globalThis.NetInfo.fetch()))?.isConnected : !0;
}
function Ty() {
	return !0;
}
function Ey(e) {
	switch (Ad()) {
		case wd.browser:
			Dy(e);
			break;
		case wd.reactNative:
			Oy(e);
			break;
		case wd.node: break;
	}
}
function Dy(e) {
	!Ed() && kd() && (window.addEventListener("online", () => e(!0)), window.addEventListener("offline", () => e(!1)));
}
function Oy(e) {
	Ed() && typeof globalThis < "u" && globalThis != null && globalThis.NetInfo && globalThis?.NetInfo.addEventListener((t) => e(t?.isConnected));
}
function ky() {
	return kd() && (0, cd.getDocument)() ? (0, cd.getDocument)()?.visibilityState === "visible" : !0;
}
var Ay = {}, jy = class {
	static get(e) {
		return Ay[e];
	}
	static set(e, t) {
		Ay[e] = t;
	}
	static delete(e) {
		delete Ay[e];
	}
};
function My(e) {
	let t = qs.decode(e);
	if (t.length < 33) throw Error("Too short to contain a public key");
	return t.slice(1, 33);
}
function Ny({ publicKey: e, signature: t, payload: n }) {
	let r = Fy(n.method), i = 128 | parseInt(n.version?.toString() || "4"), a = Ly(n.address), o = n.era === "00" ? new Uint8Array([0]) : Fy(n.era);
	if (o.length !== 1 && o.length !== 2) throw Error("Invalid era length");
	let s = parseInt(n.nonce, 16), c = new Uint8Array([s & 255, s >> 8 & 255]), l = zy(BigInt(`0x${Iy(n.tip)}`)), u = new Uint8Array([
		0,
		...e,
		a,
		...t,
		...o,
		...c,
		...l,
		...r
	]), d = Ry(u.length + 1);
	return new Uint8Array([
		...d,
		i,
		...u
	]);
}
function Py(e) {
	let t = (0, ud.blake2b)(Fy(e), void 0, 32);
	return "0x" + Buffer.from(t).toString("hex");
}
function Fy(e) {
	return new Uint8Array(e.replace(/^0x/, "").match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
function Iy(e) {
	return e.startsWith("0x") ? e.slice(2) : e;
}
function Ly(e) {
	let t = qs.decode(e)[0];
	return t === 42 ? 0 : t === 60 ? 2 : 1;
}
function Ry(e) {
	if (e < 64) return new Uint8Array([e << 2]);
	if (e < 16384) {
		let t = e << 2 | 1;
		return new Uint8Array([t & 255, t >> 8 & 255]);
	} else if (e < 1 << 30) {
		let t = e << 2 | 2;
		return new Uint8Array([
			t & 255,
			t >> 8 & 255,
			t >> 16 & 255,
			t >> 24 & 255
		]);
	} else throw Error("Compact encoding > 2^30 not supported");
}
function zy(e) {
	if (e < BigInt(1) << BigInt(6)) return new Uint8Array([Number(e << BigInt(2))]);
	if (e < BigInt(1) << BigInt(14)) {
		let t = e << BigInt(2) | BigInt(1);
		return new Uint8Array([Number(t & BigInt(255)), Number(t >> BigInt(8) & BigInt(255))]);
	} else if (e < BigInt(1) << BigInt(30)) {
		let t = e << BigInt(2) | BigInt(2);
		return new Uint8Array([
			Number(t & BigInt(255)),
			Number(t >> BigInt(8) & BigInt(255)),
			Number(t >> BigInt(16) & BigInt(255)),
			Number(t >> BigInt(24) & BigInt(255))
		]);
	} else throw Error("BigInt compact encoding not supported > 2^30");
}
function By(e) {
	let t = Uint8Array.from(Buffer.from(e.signature, "hex")), n = Ny({
		publicKey: My(e.transaction.address),
		signature: t,
		payload: e.transaction
	});
	return Py(Buffer.from(n).toString("hex"));
}
//#endregion
//#region node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var Vy = "PARSE_ERROR", Hy = "INVALID_REQUEST", Uy = "METHOD_NOT_FOUND", Wy = "INVALID_PARAMS", Gy = "INTERNAL_ERROR", Ky = "SERVER_ERROR", qy = [
	-32700,
	-32600,
	-32601,
	-32602,
	-32603
], Jy = [-32e3, -32099], Yy = {
	[Vy]: {
		code: -32700,
		message: "Parse error"
	},
	[Hy]: {
		code: -32600,
		message: "Invalid Request"
	},
	[Uy]: {
		code: -32601,
		message: "Method not found"
	},
	[Wy]: {
		code: -32602,
		message: "Invalid params"
	},
	[Gy]: {
		code: -32603,
		message: "Internal error"
	},
	[Ky]: {
		code: -32e3,
		message: "Server error"
	}
}, Xy = Ky;
//#endregion
//#region node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function Zy(e) {
	return e <= Jy[0] && e >= Jy[1];
}
function Qy(e) {
	return qy.includes(e);
}
function $y(e) {
	return typeof e == "number";
}
function eb(e) {
	return Object.keys(Yy).includes(e) ? Yy[e] : Yy[Xy];
}
function tb(e) {
	return Object.values(Yy).find((t) => t.code === e) || Yy[Xy];
}
function nb(e) {
	if (e.error.code === void 0) return {
		valid: !1,
		error: "Missing code for JSON-RPC error"
	};
	if (e.error.message === void 0) return {
		valid: !1,
		error: "Missing message for JSON-RPC error"
	};
	if (!$y(e.error.code)) return {
		valid: !1,
		error: `Invalid error code type for JSON-RPC: ${e.error.code}`
	};
	if (Qy(e.error.code)) {
		let t = tb(e.error.code);
		if (t.message !== Yy.SERVER_ERROR.message && e.error.message === t.message) return {
			valid: !1,
			error: `Invalid error code message for JSON-RPC: ${e.error.code}`
		};
	}
	return { valid: !0 };
}
function rb(e, t, n) {
	return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? /* @__PURE__ */ Error(`Unavailable ${n} RPC url at ${t}`) : e;
}
//#endregion
//#region node_modules/@walletconnect/environment/dist/cjs/crypto.js
var ib = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.isBrowserCryptoAvailable = e.getSubtleCrypto = e.getBrowerCrypto = void 0;
	function t() {
		return (globalThis == null ? void 0 : globalThis.crypto) || (globalThis == null ? void 0 : globalThis.msCrypto) || {};
	}
	e.getBrowerCrypto = t;
	function n() {
		let e = t();
		return e.subtle || e.webkitSubtle;
	}
	e.getSubtleCrypto = n;
	function r() {
		return !!t() && !!n();
	}
	e.isBrowserCryptoAvailable = r;
})), ab = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.isBrowser = e.isNode = e.isReactNative = void 0;
	function t() {
		return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative";
	}
	e.isReactNative = t;
	function n() {
		return typeof process < "u" && process.versions !== void 0 && process.versions.node !== void 0;
	}
	e.isNode = n;
	function r() {
		return !t() && !n();
	}
	e.isBrowser = r;
})), ob = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = (Me(), n(se));
	t.__exportStar(ib(), e), t.__exportStar(ab(), e);
})), sb = /* @__PURE__ */ i({ isNodeJs: () => lb }), cb = ob();
r(sb, /* @__PURE__ */ e(ob()));
var lb = cb.isNode;
//#endregion
//#region node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function ub(e = 3) {
	return Date.now() * 10 ** e + Math.floor(Math.random() * 10 ** e);
}
function db(e = 6) {
	return BigInt(ub(e));
}
function fb(e, t, n) {
	return {
		id: n || ub(),
		jsonrpc: "2.0",
		method: e,
		params: t
	};
}
function pb(e, t) {
	return {
		id: e,
		jsonrpc: "2.0",
		result: t
	};
}
function mb(e, t, n) {
	return {
		id: e,
		jsonrpc: "2.0",
		error: hb(t, n)
	};
}
function hb(e, t) {
	return e === void 0 ? eb(Gy) : (typeof e == "string" && (e = Object.assign(Object.assign({}, eb(Ky)), { message: e })), t !== void 0 && (e.data = t), Qy(e.code) && (e = tb(e.code)), e);
}
//#endregion
//#region node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function gb(e) {
	return e.includes("*") ? vb(e) : !/\W/g.test(e);
}
function _b(e) {
	return e === "*";
}
function vb(e) {
	return _b(e) ? !0 : !(!e.includes("*") || e.split("*").length !== 2 || e.split("*").filter((e) => e.trim() === "").length !== 1);
}
function yb(e) {
	return !_b(e) && vb(e) && !e.split("*")[0].trim();
}
function bb(e) {
	return !_b(e) && vb(e) && !e.split("*")[1].trim();
}
//#endregion
//#region node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var xb = class {}, Sb = class extends xb {
	constructor(e) {
		super();
	}
}, Cb = class extends xb {
	constructor() {
		super();
	}
}, wb = class extends Cb {
	constructor(e) {
		super();
	}
}, Tb = "^https?:", Eb = "^wss?:";
function Db(e) {
	let t = e.match(/* @__PURE__ */ new RegExp(/^\w+:/, "gi"));
	if (!(!t || !t.length)) return t[0];
}
function Ob(e, t) {
	let n = Db(e);
	return n === void 0 ? !1 : new RegExp(t).test(n);
}
function kb(e) {
	return Ob(e, Tb);
}
function Ab(e) {
	return Ob(e, Eb);
}
function jb(e) {
	return (/* @__PURE__ */ RegExp("wss?://localhost(:d{2,5})?")).test(e);
}
//#endregion
//#region node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function Mb(e) {
	return typeof e == "object" && "id" in e && "jsonrpc" in e && e.jsonrpc === "2.0";
}
function Nb(e) {
	return Mb(e) && "method" in e;
}
function Pb(e) {
	return Mb(e) && (Fb(e) || Ib(e));
}
function Fb(e) {
	return "result" in e;
}
function Ib(e) {
	return "error" in e;
}
function Lb(e) {
	return "error" in e && e.valid === !1;
}
//#endregion
//#region node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var Rb = /* @__PURE__ */ i({
	DEFAULT_ERROR: () => Xy,
	IBaseJsonRpcProvider: () => Cb,
	IEvents: () => xb,
	IJsonRpcConnection: () => Sb,
	IJsonRpcProvider: () => wb,
	INTERNAL_ERROR: () => Gy,
	INVALID_PARAMS: () => Wy,
	INVALID_REQUEST: () => Hy,
	METHOD_NOT_FOUND: () => Uy,
	PARSE_ERROR: () => Vy,
	RESERVED_ERROR_CODES: () => qy,
	SERVER_ERROR: () => Ky,
	SERVER_ERROR_CODE_RANGE: () => Jy,
	STANDARD_ERROR_MAP: () => Yy,
	formatErrorMessage: () => hb,
	formatJsonRpcError: () => mb,
	formatJsonRpcRequest: () => fb,
	formatJsonRpcResult: () => pb,
	getBigIntRpcId: () => db,
	getError: () => eb,
	getErrorByCode: () => tb,
	isHttpUrl: () => kb,
	isJsonRpcError: () => Ib,
	isJsonRpcPayload: () => Mb,
	isJsonRpcRequest: () => Nb,
	isJsonRpcResponse: () => Pb,
	isJsonRpcResult: () => Fb,
	isJsonRpcValidationInvalid: () => Lb,
	isLocalhostUrl: () => jb,
	isNodeJs: () => lb,
	isReservedErrorCode: () => Qy,
	isServerErrorCode: () => Zy,
	isValidDefaultRoute: () => _b,
	isValidErrorCode: () => $y,
	isValidLeadingWildcardRoute: () => yb,
	isValidRoute: () => gb,
	isValidTrailingWildcardRoute: () => bb,
	isValidWildcardRoute: () => vb,
	isWsUrl: () => Ab,
	parseConnectionError: () => rb,
	payloadId: () => ub,
	validateJsonRpcError: () => nb
});
r(Rb, sb);
//#endregion
//#region node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var zb = class extends wb {
	constructor(e) {
		super(e), this.events = new We.EventEmitter(), this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(e), this.connection.connected && this.registerEventListeners();
	}
	async connect(e = this.connection) {
		await this.open(e);
	}
	async disconnect() {
		await this.close();
	}
	on(e, t) {
		this.events.on(e, t);
	}
	once(e, t) {
		this.events.once(e, t);
	}
	off(e, t) {
		this.events.off(e, t);
	}
	removeListener(e, t) {
		this.events.removeListener(e, t);
	}
	async request(e, t) {
		return this.requestStrict(fb(e.method, e.params || [], e.id || db().toString()), t);
	}
	async requestStrict(e, t) {
		return new Promise(async (n, r) => {
			if (!this.connection.connected) try {
				await this.open();
			} catch (e) {
				r(e);
			}
			this.events.on(`${e.id}`, (e) => {
				Ib(e) ? r(e.error) : n(e.result);
			});
			try {
				await this.connection.send(e, t);
			} catch (e) {
				r(e);
			}
		});
	}
	setConnection(e = this.connection) {
		return e;
	}
	onPayload(e) {
		this.events.emit("payload", e), Pb(e) ? this.events.emit(`${e.id}`, e) : this.events.emit("message", {
			type: e.method,
			data: e.params
		});
	}
	onClose(e) {
		e && e.code === 3e3 && this.events.emit("error", /* @__PURE__ */ Error(`WebSocket connection closed abnormally with code: ${e.code} ${e.reason ? `(${e.reason})` : ""}`)), this.events.emit("disconnect");
	}
	async open(e = this.connection) {
		this.connection === e && this.connection.connected || (this.connection.connected && this.close(), typeof e == "string" && (await this.connection.open(e), e = this.connection), this.connection = this.setConnection(e), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
	}
	async close() {
		await this.connection.close();
	}
	registerEventListeners() {
		this.hasRegisteredEventListeners || (this.connection.on("payload", (e) => this.onPayload(e)), this.connection.on("close", (e) => this.onClose(e)), this.connection.on("error", (e) => this.events.emit("error", e)), this.connection.on("register_error", (e) => this.onClose()), this.hasRegisteredEventListeners = !0);
	}
}, Bb = /* @__PURE__ */ t(((e, t) => {
	t.exports = function() {
		throw Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
	};
})), Vb = () => typeof WebSocket < "u" ? WebSocket : typeof globalThis < "u" && typeof globalThis.WebSocket < "u" ? globalThis.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : Bb(), Hb = () => typeof WebSocket < "u" || typeof globalThis < "u" && typeof globalThis.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", Ub = (e) => e.split("?")[0], Wb = 10, Gb = Vb(), Kb = class {
	constructor(e) {
		if (this.url = e, this.events = new We.EventEmitter(), this.registering = !1, !Ab(e)) throw Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
		this.url = e;
	}
	get connected() {
		return typeof this.socket < "u";
	}
	get connecting() {
		return this.registering;
	}
	on(e, t) {
		this.events.on(e, t);
	}
	once(e, t) {
		this.events.once(e, t);
	}
	off(e, t) {
		this.events.off(e, t);
	}
	removeListener(e, t) {
		this.events.removeListener(e, t);
	}
	async open(e = this.url) {
		await this.register(e);
	}
	async close() {
		return new Promise((e, t) => {
			if (typeof this.socket > "u") {
				t(/* @__PURE__ */ Error("Connection already closed"));
				return;
			}
			this.socket.onclose = (t) => {
				this.onClose(t), e();
			}, this.socket.close();
		});
	}
	async send(e) {
		typeof this.socket > "u" && (this.socket = await this.register());
		try {
			this.socket.send(T(e));
		} catch (t) {
			this.onError(e.id, t);
		}
	}
	register(e = this.url) {
		if (!Ab(e)) throw Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
		if (this.registering) {
			let e = this.events.getMaxListeners();
			return (this.events.listenerCount("register_error") >= e || this.events.listenerCount("open") >= e) && this.events.setMaxListeners(e + 1), new Promise((e, t) => {
				this.events.once("register_error", (e) => {
					this.resetMaxListeners(), t(e);
				}), this.events.once("open", () => {
					if (this.resetMaxListeners(), typeof this.socket > "u") return t(/* @__PURE__ */ Error("WebSocket connection is missing or invalid"));
					e(this.socket);
				});
			});
		}
		return this.url = e, this.registering = !0, new Promise((t, n) => {
			let r = new Gb(e, [], (0, Rb.isReactNative)() ? void 0 : { rejectUnauthorized: !jb(e) });
			Hb() ? r.onerror = (e) => {
				let t = e;
				n(this.emitError(t.error));
			} : r.on("error", (e) => {
				n(this.emitError(e));
			}), r.onopen = () => {
				this.onOpen(r), t(r);
			};
		});
	}
	onOpen(e) {
		e.onmessage = (e) => this.onPayload(e), e.onclose = (e) => this.onClose(e), this.socket = e, this.registering = !1, this.events.emit("open");
	}
	onClose(e) {
		this.socket = void 0, this.registering = !1, this.events.emit("close", e);
	}
	onPayload(e) {
		if (typeof e.data > "u") return;
		let t = typeof e.data == "string" ? C(e.data) : e.data;
		this.events.emit("payload", t);
	}
	onError(e, t) {
		let n = this.parseError(t), r = mb(e, n.message || n.toString());
		this.events.emit("payload", r);
	}
	parseError(e, t = this.url) {
		return rb(e, Ub(t), "WS");
	}
	resetMaxListeners() {
		this.events.getMaxListeners() > Wb && this.events.setMaxListeners(Wb);
	}
	emitError(e) {
		let t = this.parseError(Error(e?.message || `WebSocket connection failed for host: ${Ub(this.url)}`));
		return this.events.emit("register_error", t), t;
	}
}, qb = "core", Jb = `wc@2:${qb}:`, Yb = {
	name: qb,
	logger: "error"
}, Xb = { database: ":memory:" }, Zb = "crypto", Qb = "client_ed25519_seed", $b = L.ONE_DAY, ex = "keychain", tx = "messages", nx = L.SIX_HOURS, rx = "publisher", ix = "relayer", ax = {
	message: "relayer_message",
	message_ack: "relayer_message_ack",
	connect: "relayer_connect",
	disconnect: "relayer_disconnect",
	error: "relayer_error",
	connection_stalled: "relayer_connection_stalled",
	transport_closed: "relayer_transport_closed",
	publish: "relayer_publish"
}, ox = {
	payload: "payload",
	connect: "connect",
	disconnect: "disconnect",
	error: "error"
}, sx = "2.21.7", G = {
	link_mode: "link_mode",
	relay: "relay"
}, cx = {
	inbound: "inbound",
	outbound: "outbound"
}, lx = "WALLETCONNECT_CLIENT_ID", ux = {
	created: "subscription_created",
	deleted: "subscription_deleted",
	expired: "subscription_expired",
	disabled: "subscription_disabled",
	sync: "subscription_sync",
	resubscribed: "subscription_resubscribed"
};
L.THIRTY_DAYS;
//#endregion
//#region node_modules/@walletconnect/core/dist/index.es.js
var dx = "subscription";
L.FIVE_SECONDS * 1e3;
var fx = "pairing";
L.THIRTY_DAYS;
var px = {
	wc_pairingDelete: {
		req: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1e3
		},
		res: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1001
		}
	},
	wc_pairingPing: {
		req: {
			ttl: L.THIRTY_SECONDS,
			prompt: !1,
			tag: 1002
		},
		res: {
			ttl: L.THIRTY_SECONDS,
			prompt: !1,
			tag: 1003
		}
	},
	unregistered_method: {
		req: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 0
		},
		res: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 0
		}
	}
}, mx = {
	create: "pairing_create",
	expire: "pairing_expire",
	delete: "pairing_delete",
	ping: "pairing_ping"
}, hx = {
	created: "history_created",
	updated: "history_updated",
	deleted: "history_deleted",
	sync: "history_sync"
}, gx = "history", _x = "expirer", vx = {
	created: "expirer_created",
	deleted: "expirer_deleted",
	expired: "expirer_expired",
	sync: "expirer_sync"
};
L.ONE_DAY;
var yx = "verify-api", bx = "https://verify.walletconnect.com", xx = "https://verify.walletconnect.org", Sx = `${xx}/v3`, Cx = [bx, xx], wx = "echo", Tx = "https://echo.walletconnect.com", Ex = {
	pairing_started: "pairing_started",
	pairing_uri_validation_success: "pairing_uri_validation_success",
	pairing_uri_not_expired: "pairing_uri_not_expired",
	store_new_pairing: "store_new_pairing",
	subscribing_pairing_topic: "subscribing_pairing_topic",
	subscribe_pairing_topic_success: "subscribe_pairing_topic_success",
	existing_pairing: "existing_pairing",
	pairing_not_expired: "pairing_not_expired",
	emit_inactive_pairing: "emit_inactive_pairing",
	emit_session_proposal: "emit_session_proposal",
	subscribing_to_pairing_topic: "subscribing_to_pairing_topic"
}, Dx = {
	no_wss_connection: "no_wss_connection",
	no_internet_connection: "no_internet_connection",
	malformed_pairing_uri: "malformed_pairing_uri",
	active_pairing_already_exists: "active_pairing_already_exists",
	subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure",
	pairing_expired: "pairing_expired",
	proposal_expired: "proposal_expired",
	proposal_listener_not_found: "proposal_listener_not_found"
}, Ox = {
	session_approve_started: "session_approve_started",
	proposal_not_expired: "proposal_not_expired",
	session_namespaces_validation_success: "session_namespaces_validation_success",
	create_session_topic: "create_session_topic",
	subscribing_session_topic: "subscribing_session_topic",
	subscribe_session_topic_success: "subscribe_session_topic_success",
	publishing_session_approve: "publishing_session_approve",
	session_approve_publish_success: "session_approve_publish_success",
	store_session: "store_session",
	publishing_session_settle: "publishing_session_settle",
	session_settle_publish_success: "session_settle_publish_success"
}, kx = {
	no_internet_connection: "no_internet_connection",
	no_wss_connection: "no_wss_connection",
	proposal_expired: "proposal_expired",
	subscribe_session_topic_failure: "subscribe_session_topic_failure",
	session_approve_publish_failure: "session_approve_publish_failure",
	session_settle_publish_failure: "session_settle_publish_failure",
	session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure",
	proposal_not_found: "proposal_not_found"
}, Ax = {
	authenticated_session_approve_started: "authenticated_session_approve_started",
	authenticated_session_not_expired: "authenticated_session_not_expired",
	chains_caip2_compliant: "chains_caip2_compliant",
	chains_evm_compliant: "chains_evm_compliant",
	create_authenticated_session_topic: "create_authenticated_session_topic",
	cacaos_verified: "cacaos_verified",
	store_authenticated_session: "store_authenticated_session",
	subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic",
	subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success",
	publishing_authenticated_session_approve: "publishing_authenticated_session_approve",
	authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success"
}, jx = {
	no_internet_connection: "no_internet_connection",
	no_wss_connection: "no_wss_connection",
	missing_session_authenticate_request: "missing_session_authenticate_request",
	session_authenticate_request_expired: "session_authenticate_request_expired",
	chains_caip2_compliant_failure: "chains_caip2_compliant_failure",
	chains_evm_compliant_failure: "chains_evm_compliant_failure",
	invalid_cacao: "invalid_cacao",
	subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure",
	authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure",
	authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found"
}, Mx = .1, Nx = "event-client", Px = "https://pulse.walletconnect.org/batch";
function Fx(e, t) {
	if (e.length >= 255) throw TypeError("Alphabet too long");
	for (var n = new Uint8Array(256), r = 0; r < n.length; r++) n[r] = 255;
	for (var i = 0; i < e.length; i++) {
		var a = e.charAt(i), o = a.charCodeAt(0);
		if (n[o] !== 255) throw TypeError(a + " is ambiguous");
		n[o] = i;
	}
	var s = e.length, c = e.charAt(0), l = Math.log(s) / Math.log(256), u = Math.log(256) / Math.log(s);
	function d(t) {
		if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
		if (t.length === 0) return "";
		for (var n = 0, r = 0, i = 0, a = t.length; i !== a && t[i] === 0;) i++, n++;
		for (var o = (a - i) * u + 1 >>> 0, l = new Uint8Array(o); i !== a;) {
			for (var d = t[i], f = 0, p = o - 1; (d !== 0 || f < r) && p !== -1; p--, f++) d += 256 * l[p] >>> 0, l[p] = d % s >>> 0, d = d / s >>> 0;
			if (d !== 0) throw Error("Non-zero carry");
			r = f, i++;
		}
		for (var m = o - r; m !== o && l[m] === 0;) m++;
		for (var h = c.repeat(n); m < o; ++m) h += e.charAt(l[m]);
		return h;
	}
	function f(e) {
		if (typeof e != "string") throw TypeError("Expected String");
		if (e.length === 0) return new Uint8Array();
		var t = 0;
		if (e[t] !== " ") {
			for (var r = 0, i = 0; e[t] === c;) r++, t++;
			for (var a = (e.length - t) * l + 1 >>> 0, o = new Uint8Array(a); e[t];) {
				var u = n[e.charCodeAt(t)];
				if (u === 255) return;
				for (var d = 0, f = a - 1; (u !== 0 || d < i) && f !== -1; f--, d++) u += s * o[f] >>> 0, o[f] = u % 256 >>> 0, u = u / 256 >>> 0;
				if (u !== 0) throw Error("Non-zero carry");
				i = d, t++;
			}
			if (e[t] !== " ") {
				for (var p = a - i; p !== a && o[p] === 0;) p++;
				for (var m = new Uint8Array(r + (a - p)), h = r; p !== a;) m[h++] = o[p++];
				return m;
			}
		}
	}
	function p(e) {
		var n = f(e);
		if (n) return n;
		throw Error(`Non-${t} character`);
	}
	return {
		encode: d,
		decodeUnsafe: f,
		decode: p
	};
}
var Ix = Fx, Lx = (e) => {
	if (e instanceof Uint8Array && e.constructor.name === "Uint8Array") return e;
	if (e instanceof ArrayBuffer) return new Uint8Array(e);
	if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
	throw Error("Unknown type, must be binary type");
}, Rx = (e) => new TextEncoder().encode(e), zx = (e) => new TextDecoder().decode(e), Bx = class {
	constructor(e, t, n) {
		this.name = e, this.prefix = t, this.baseEncode = n;
	}
	encode(e) {
		if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
		throw Error("Unknown type, must be binary type");
	}
}, Vx = class {
	constructor(e, t, n) {
		if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw Error("Invalid prefix character");
		this.prefixCodePoint = t.codePointAt(0), this.baseDecode = n;
	}
	decode(e) {
		if (typeof e == "string") {
			if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
			return this.baseDecode(e.slice(this.prefix.length));
		} else throw Error("Can only multibase decode strings");
	}
	or(e) {
		return Ux(this, e);
	}
}, Hx = class {
	constructor(e) {
		this.decoders = e;
	}
	or(e) {
		return Ux(this, e);
	}
	decode(e) {
		let t = e[0], n = this.decoders[t];
		if (n) return n.decode(e);
		throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
	}
}, Ux = (e, t) => new Hx({
	...e.decoders || { [e.prefix]: e },
	...t.decoders || { [t.prefix]: t }
}), Wx = class {
	constructor(e, t, n, r) {
		this.name = e, this.prefix = t, this.baseEncode = n, this.baseDecode = r, this.encoder = new Bx(e, t, n), this.decoder = new Vx(e, t, r);
	}
	encode(e) {
		return this.encoder.encode(e);
	}
	decode(e) {
		return this.decoder.decode(e);
	}
}, Gx = ({ name: e, prefix: t, encode: n, decode: r }) => new Wx(e, t, n, r), Kx = ({ prefix: e, name: t, alphabet: n }) => {
	let { encode: r, decode: i } = Ix(n, t);
	return Gx({
		prefix: e,
		name: t,
		encode: r,
		decode: (e) => Lx(i(e))
	});
}, qx = (e, t, n, r) => {
	let i = {};
	for (let e = 0; e < t.length; ++e) i[t[e]] = e;
	let a = e.length;
	for (; e[a - 1] === "=";) --a;
	let o = new Uint8Array(a * n / 8 | 0), s = 0, c = 0, l = 0;
	for (let t = 0; t < a; ++t) {
		let a = i[e[t]];
		if (a === void 0) throw SyntaxError(`Non-${r} character`);
		c = c << n | a, s += n, s >= 8 && (s -= 8, o[l++] = 255 & c >> s);
	}
	if (s >= n || 255 & c << 8 - s) throw SyntaxError("Unexpected end of data");
	return o;
}, Jx = (e, t, n) => {
	let r = t[t.length - 1] === "=", i = (1 << n) - 1, a = "", o = 0, s = 0;
	for (let r = 0; r < e.length; ++r) for (s = s << 8 | e[r], o += 8; o > n;) o -= n, a += t[i & s >> o];
	if (o && (a += t[i & s << n - o]), r) for (; a.length * n & 7;) a += "=";
	return a;
}, Yx = ({ name: e, prefix: t, bitsPerChar: n, alphabet: r }) => Gx({
	prefix: t,
	name: e,
	encode(e) {
		return Jx(e, r, n);
	},
	decode(t) {
		return qx(t, r, n, e);
	}
}), Xx = Gx({
	prefix: "\0",
	name: "identity",
	encode: (e) => zx(e),
	decode: (e) => Rx(e)
}), Zx = Object.freeze({
	__proto__: null,
	identity: Xx
}), Qx = Yx({
	prefix: "0",
	name: "base2",
	alphabet: "01",
	bitsPerChar: 1
}), $x = Object.freeze({
	__proto__: null,
	base2: Qx
}), eS = Yx({
	prefix: "7",
	name: "base8",
	alphabet: "01234567",
	bitsPerChar: 3
}), tS = Object.freeze({
	__proto__: null,
	base8: eS
}), nS = Kx({
	prefix: "9",
	name: "base10",
	alphabet: "0123456789"
}), rS = Object.freeze({
	__proto__: null,
	base10: nS
}), iS = Yx({
	prefix: "f",
	name: "base16",
	alphabet: "0123456789abcdef",
	bitsPerChar: 4
}), aS = Yx({
	prefix: "F",
	name: "base16upper",
	alphabet: "0123456789ABCDEF",
	bitsPerChar: 4
}), oS = Object.freeze({
	__proto__: null,
	base16: iS,
	base16upper: aS
}), sS = Yx({
	prefix: "b",
	name: "base32",
	alphabet: "abcdefghijklmnopqrstuvwxyz234567",
	bitsPerChar: 5
}), cS = Yx({
	prefix: "B",
	name: "base32upper",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
	bitsPerChar: 5
}), lS = Yx({
	prefix: "c",
	name: "base32pad",
	alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
	bitsPerChar: 5
}), uS = Yx({
	prefix: "C",
	name: "base32padupper",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
	bitsPerChar: 5
}), dS = Yx({
	prefix: "v",
	name: "base32hex",
	alphabet: "0123456789abcdefghijklmnopqrstuv",
	bitsPerChar: 5
}), fS = Yx({
	prefix: "V",
	name: "base32hexupper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
	bitsPerChar: 5
}), pS = Yx({
	prefix: "t",
	name: "base32hexpad",
	alphabet: "0123456789abcdefghijklmnopqrstuv=",
	bitsPerChar: 5
}), mS = Yx({
	prefix: "T",
	name: "base32hexpadupper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
	bitsPerChar: 5
}), hS = Yx({
	prefix: "h",
	name: "base32z",
	alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
	bitsPerChar: 5
}), gS = Object.freeze({
	__proto__: null,
	base32: sS,
	base32upper: cS,
	base32pad: lS,
	base32padupper: uS,
	base32hex: dS,
	base32hexupper: fS,
	base32hexpad: pS,
	base32hexpadupper: mS,
	base32z: hS
}), _S = Kx({
	prefix: "k",
	name: "base36",
	alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), vS = Kx({
	prefix: "K",
	name: "base36upper",
	alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), yS = Object.freeze({
	__proto__: null,
	base36: _S,
	base36upper: vS
}), bS = Kx({
	name: "base58btc",
	prefix: "z",
	alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), xS = Kx({
	name: "base58flickr",
	prefix: "Z",
	alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), SS = Object.freeze({
	__proto__: null,
	base58btc: bS,
	base58flickr: xS
}), CS = Yx({
	prefix: "m",
	name: "base64",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	bitsPerChar: 6
}), wS = Yx({
	prefix: "M",
	name: "base64pad",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	bitsPerChar: 6
}), TS = Yx({
	prefix: "u",
	name: "base64url",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
	bitsPerChar: 6
}), ES = Yx({
	prefix: "U",
	name: "base64urlpad",
	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
	bitsPerChar: 6
}), DS = Object.freeze({
	__proto__: null,
	base64: CS,
	base64pad: wS,
	base64url: TS,
	base64urlpad: ES
}), OS = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), kS = OS.reduce((e, t, n) => (e[n] = t, e), []), AS = OS.reduce((e, t, n) => (e[t.codePointAt(0)] = n, e), []);
function jS(e) {
	return e.reduce((e, t) => (e += kS[t], e), "");
}
function MS(e) {
	let t = [];
	for (let n of e) {
		let e = AS[n.codePointAt(0)];
		if (e === void 0) throw Error(`Non-base256emoji character: ${n}`);
		t.push(e);
	}
	return new Uint8Array(t);
}
var NS = Gx({
	prefix: "🚀",
	name: "base256emoji",
	encode: jS,
	decode: MS
}), PS = Object.freeze({
	__proto__: null,
	base256emoji: NS
}), FS = zS, IS = 128, LS = -128, RS = 2 ** 31;
function zS(e, t, n) {
	t = t || [], n = n || 0;
	for (var r = n; e >= RS;) t[n++] = e & 255 | IS, e /= 128;
	for (; e & LS;) t[n++] = e & 255 | IS, e >>>= 7;
	return t[n] = e | 0, zS.bytes = n - r + 1, t;
}
var BS = US, VS = 128, HS = 127;
function US(e, t) {
	var n = 0, t = t || 0, r = 0, i = t, a, o = e.length;
	do {
		if (i >= o) throw US.bytes = 0, /* @__PURE__ */ RangeError("Could not decode varint");
		a = e[i++], n += r < 28 ? (a & HS) << r : (a & HS) * 2 ** r, r += 7;
	} while (a >= VS);
	return US.bytes = i - t, n;
}
var WS = 2 ** 7, GS = 2 ** 14, KS = 2 ** 21, qS = 2 ** 28, JS = 2 ** 35, YS = 2 ** 42, XS = 2 ** 49, ZS = 2 ** 56, QS = 2 ** 63, $S = {
	encode: FS,
	decode: BS,
	encodingLength: function(e) {
		return e < WS ? 1 : e < GS ? 2 : e < KS ? 3 : e < qS ? 4 : e < JS ? 5 : e < YS ? 6 : e < XS ? 7 : e < ZS ? 8 : e < QS ? 9 : 10;
	}
}, eC = (e, t, n = 0) => ($S.encode(e, t, n), t), tC = (e) => $S.encodingLength(e), nC = (e, t) => {
	let n = t.byteLength, r = tC(e), i = r + tC(n), a = new Uint8Array(i + n);
	return eC(e, a, 0), eC(n, a, r), a.set(t, i), new rC(e, n, t, a);
}, rC = class {
	constructor(e, t, n, r) {
		this.code = e, this.size = t, this.digest = n, this.bytes = r;
	}
}, iC = ({ name: e, code: t, encode: n }) => new aC(e, t, n), aC = class {
	constructor(e, t, n) {
		this.name = e, this.code = t, this.encode = n;
	}
	digest(e) {
		if (e instanceof Uint8Array) {
			let t = this.encode(e);
			return t instanceof Uint8Array ? nC(this.code, t) : t.then((e) => nC(this.code, e));
		} else throw Error("Unknown type, must be binary type");
	}
}, oC = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t)), sC = iC({
	name: "sha2-256",
	code: 18,
	encode: oC("SHA-256")
}), cC = iC({
	name: "sha2-512",
	code: 19,
	encode: oC("SHA-512")
}), lC = Object.freeze({
	__proto__: null,
	sha256: sC,
	sha512: cC
}), uC = 0, dC = "identity", fC = Lx, pC = Object.freeze({
	__proto__: null,
	identity: {
		code: uC,
		name: dC,
		encode: fC,
		digest: (e) => nC(uC, fC(e))
	}
});
new TextEncoder(), new TextDecoder();
var mC = {
	...Zx,
	...$x,
	...tS,
	...rS,
	...oS,
	...gS,
	...yS,
	...SS,
	...DS,
	...PS
};
({
	...lC,
	...pC
});
function hC(e) {
	return globalThis.Buffer == null ? e : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
function gC(e = 0) {
	return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? hC(globalThis.Buffer.allocUnsafe(e)) : new Uint8Array(e);
}
function _C(e, t, n, r) {
	return {
		name: e,
		prefix: t,
		encoder: {
			name: e,
			prefix: t,
			encode: n
		},
		decoder: { decode: r }
	};
}
var vC = _C("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), yC = _C("ascii", "a", (e) => {
	let t = "a";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return t;
}, (e) => {
	e = e.substring(1);
	let t = gC(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return t;
}), bC = {
	utf8: vC,
	"utf-8": vC,
	hex: mC.base16,
	latin1: yC,
	ascii: yC,
	binary: yC,
	...mC
};
function xC(e, t = "utf8") {
	let n = bC[t];
	if (!n) throw Error(`Unsupported encoding "${t}"`);
	return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? hC(globalThis.Buffer.from(e, "utf-8")) : n.decoder.decode(`${n.prefix}${e}`);
}
var SC = Object.defineProperty, CC = (e, t, n) => t in e ? SC(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, wC = (e, t, n) => CC(e, typeof t == "symbol" ? t : t + "", n), TC = class {
	constructor(e, t) {
		this.core = e, this.logger = t, wC(this, "keychain", /* @__PURE__ */ new Map()), wC(this, "name", ex), wC(this, "version", "0.3"), wC(this, "initialized", !1), wC(this, "storagePrefix", Jb), wC(this, "init", async () => {
			if (!this.initialized) {
				let e = await this.getKeyChain();
				typeof e < "u" && (this.keychain = e), this.initialized = !0;
			}
		}), wC(this, "has", (e) => (this.isInitialized(), this.keychain.has(e))), wC(this, "set", async (e, t) => {
			this.isInitialized(), this.keychain.set(e, t), await this.persist();
		}), wC(this, "get", (e) => {
			this.isInitialized();
			let t = this.keychain.get(e);
			if (typeof t > "u") {
				let { message: t } = U("NO_MATCHING_KEY", `${this.name}: ${e}`);
				throw Error(t);
			}
			return t;
		}), wC(this, "del", async (e) => {
			this.isInitialized(), this.keychain.delete(e), await this.persist();
		}), this.core = e, this.logger = S(t, this.name);
	}
	get context() {
		return b(this.logger);
	}
	get storageKey() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
	}
	async setKeyChain(e) {
		await this.core.storage.setItem(this.storageKey, Bd(e));
	}
	async getKeyChain() {
		let e = await this.core.storage.getItem(this.storageKey);
		return typeof e < "u" ? Vd(e) : void 0;
	}
	async persist() {
		await this.setKeyChain(this.keychain);
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
}, EC = Object.defineProperty, DC = (e, t, n) => t in e ? EC(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, OC = (e, t, n) => DC(e, typeof t == "symbol" ? t : t + "", n), kC = class {
	constructor(e, t, n) {
		this.core = e, this.logger = t, OC(this, "name", Zb), OC(this, "keychain"), OC(this, "randomSessionIdentifier", W_()), OC(this, "initialized", !1), OC(this, "init", async () => {
			this.initialized || (await this.keychain.init(), this.initialized = !0);
		}), OC(this, "hasKeys", (e) => (this.isInitialized(), this.keychain.has(e))), OC(this, "getClientId", async () => (this.isInitialized(), _o(Co(await this.getClientSeed()).publicKey))), OC(this, "generateKeyPair", () => {
			this.isInitialized();
			let e = U_();
			return this.setPrivateKey(e.publicKey, e.privateKey);
		}), OC(this, "signJWT", async (e) => {
			this.isInitialized();
			let t = Co(await this.getClientSeed()), n = this.randomSessionIdentifier;
			return await wo(n, e, $b, t);
		}), OC(this, "generateSharedKey", (e, t, n) => {
			this.isInitialized();
			let r = G_(this.getPrivateKey(e), t);
			return this.setSymKey(r, n);
		}), OC(this, "setSymKey", async (e, t) => {
			this.isInitialized();
			let n = t || K_(e);
			return await this.keychain.set(n, e), n;
		}), OC(this, "deleteKeyPair", async (e) => {
			this.isInitialized(), await this.keychain.del(e);
		}), OC(this, "deleteSymKey", async (e) => {
			this.isInitialized(), await this.keychain.del(e);
		}), OC(this, "encode", async (e, t, n) => {
			this.isInitialized();
			let r = av(n), i = T(t);
			if (sv(r)) return ev(i, n?.encoding);
			if (ov(r)) {
				let t = r.senderPublicKey, n = r.receiverPublicKey;
				e = await this.generateSharedKey(t, n);
			}
			let a = this.getSymKey(e), { type: o, senderPublicKey: s } = r;
			return Q_({
				type: o,
				symKey: a,
				message: i,
				senderPublicKey: s,
				encoding: n?.encoding
			});
		}), OC(this, "decode", async (e, t, n) => {
			this.isInitialized();
			let r = iv(t, n);
			if (sv(r)) return C(tv(t, n?.encoding));
			if (ov(r)) {
				let t = r.receiverPublicKey, n = r.senderPublicKey;
				e = await this.generateSharedKey(t, n);
			}
			try {
				return C($_({
					symKey: this.getSymKey(e),
					encoded: t,
					encoding: n?.encoding
				}));
			} catch (t) {
				this.logger.error(`Failed to decode message from topic: '${e}', clientId: '${await this.getClientId()}'`), this.logger.error(t);
			}
		}), OC(this, "getPayloadType", (e, t = I_) => Y_(rv({
			encoded: e,
			encoding: t
		}).type)), OC(this, "getPayloadSenderPublicKey", (e, t = I_) => {
			let n = rv({
				encoded: e,
				encoding: t
			});
			return n.senderPublicKey ? nd(n.senderPublicKey, F_) : void 0;
		}), this.core = e, this.logger = S(t, this.name), this.keychain = n || new TC(this.core, this.logger);
	}
	get context() {
		return b(this.logger);
	}
	async setPrivateKey(e, t) {
		return await this.keychain.set(e, t), e;
	}
	getPrivateKey(e) {
		return this.keychain.get(e);
	}
	async getClientSeed() {
		let e = "";
		try {
			e = this.keychain.get(Qb);
		} catch {
			e = W_(), await this.keychain.set(Qb, e);
		}
		return xC(e, "base16");
	}
	getSymKey(e) {
		return this.keychain.get(e);
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
}, AC = Object.defineProperty, jC = Object.defineProperties, MC = Object.getOwnPropertyDescriptors, NC = Object.getOwnPropertySymbols, PC = Object.prototype.hasOwnProperty, FC = Object.prototype.propertyIsEnumerable, IC = (e, t, n) => t in e ? AC(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, LC = (e, t) => {
	for (var n in t || (t = {})) PC.call(t, n) && IC(e, n, t[n]);
	if (NC) for (var n of NC(t)) FC.call(t, n) && IC(e, n, t[n]);
	return e;
}, RC = (e, t) => jC(e, MC(t)), zC = (e, t, n) => IC(e, typeof t == "symbol" ? t : t + "", n), BC = class extends en {
	constructor(e, t) {
		super(e, t), this.logger = e, this.core = t, zC(this, "messages", /* @__PURE__ */ new Map()), zC(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), zC(this, "name", tx), zC(this, "version", "0.3"), zC(this, "initialized", !1), zC(this, "storagePrefix", Jb), zC(this, "init", async () => {
			if (!this.initialized) {
				this.logger.trace("Initialized");
				try {
					let e = await this.getRelayerMessages();
					typeof e < "u" && (this.messages = e);
					let t = await this.getRelayerMessagesWithoutClientAck();
					typeof t < "u" && (this.messagesWithoutClientAck = t), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
						type: "method",
						method: "restore",
						size: this.messages.size
					});
				} catch (e) {
					this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
				} finally {
					this.initialized = !0;
				}
			}
		}), zC(this, "set", async (e, t, n) => {
			this.isInitialized();
			let r = q_(t), i = this.messages.get(e);
			if (typeof i > "u" && (i = {}), typeof i[r] < "u") return r;
			if (i[r] = t, this.messages.set(e, i), n === cx.inbound) {
				let n = this.messagesWithoutClientAck.get(e) || {};
				this.messagesWithoutClientAck.set(e, RC(LC({}, n), { [r]: t }));
			}
			return await this.persist(), r;
		}), zC(this, "get", (e) => {
			this.isInitialized();
			let t = this.messages.get(e);
			return typeof t > "u" && (t = {}), t;
		}), zC(this, "getWithoutAck", (e) => {
			this.isInitialized();
			let t = {};
			for (let n of e) {
				let e = this.messagesWithoutClientAck.get(n) || {};
				t[n] = Object.values(e);
			}
			return t;
		}), zC(this, "has", (e, t) => (this.isInitialized(), typeof this.get(e)[q_(t)] < "u")), zC(this, "ack", async (e, t) => {
			this.isInitialized();
			let n = this.messagesWithoutClientAck.get(e);
			if (typeof n > "u") return;
			let r = q_(t);
			delete n[r], Object.keys(n).length === 0 ? this.messagesWithoutClientAck.delete(e) : this.messagesWithoutClientAck.set(e, n), await this.persist();
		}), zC(this, "del", async (e) => {
			this.isInitialized(), this.messages.delete(e), this.messagesWithoutClientAck.delete(e), await this.persist();
		}), this.logger = S(e, this.name), this.core = t;
	}
	get context() {
		return b(this.logger);
	}
	get storageKey() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
	}
	get storageKeyWithoutClientAck() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
	}
	async setRelayerMessages(e) {
		await this.core.storage.setItem(this.storageKey, Bd(e));
	}
	async setRelayerMessagesWithoutClientAck(e) {
		await this.core.storage.setItem(this.storageKeyWithoutClientAck, Bd(e));
	}
	async getRelayerMessages() {
		let e = await this.core.storage.getItem(this.storageKey);
		return typeof e < "u" ? Vd(e) : void 0;
	}
	async getRelayerMessagesWithoutClientAck() {
		let e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
		return typeof e < "u" ? Vd(e) : void 0;
	}
	async persist() {
		await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
}, VC = Object.defineProperty, HC = Object.defineProperties, UC = Object.getOwnPropertyDescriptors, WC = Object.getOwnPropertySymbols, GC = Object.prototype.hasOwnProperty, KC = Object.prototype.propertyIsEnumerable, qC = (e, t, n) => t in e ? VC(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, JC = (e, t) => {
	for (var n in t || (t = {})) GC.call(t, n) && qC(e, n, t[n]);
	if (WC) for (var n of WC(t)) KC.call(t, n) && qC(e, n, t[n]);
	return e;
}, YC = (e, t) => HC(e, UC(t)), XC = (e, t, n) => qC(e, typeof t == "symbol" ? t : t + "", n), ZC = class extends tn {
	constructor(e, t) {
		super(e, t), this.relayer = e, this.logger = t, XC(this, "events", new We.EventEmitter()), XC(this, "name", rx), XC(this, "queue", /* @__PURE__ */ new Map()), XC(this, "publishTimeout", (0, L.toMiliseconds)(L.ONE_MINUTE)), XC(this, "initialPublishTimeout", (0, L.toMiliseconds)(L.ONE_SECOND * 15)), XC(this, "needsTransportRestart", !1), XC(this, "publish", async (e, t, n) => {
			var r, i, a;
			this.logger.debug("Publishing Payload"), this.logger.trace({
				type: "method",
				method: "publish",
				params: {
					topic: e,
					message: t,
					opts: n
				}
			});
			let o = n?.ttl || nx, s = n?.prompt || !1, c = n?.tag || 0, l = n?.id || db().toString(), u = dv(uv().protocol), d = {
				id: l,
				method: n?.publishMethod || u.publish,
				params: JC({
					topic: e,
					message: t,
					ttl: o,
					prompt: s,
					tag: c,
					attestation: n?.attestation
				}, n?.tvf && { tvf: n.tvf })
			}, f = `Failed to publish payload, please try again. id:${l} tag:${c}`;
			try {
				Vv(d.params?.prompt) && ((r = d.params) == null || delete r.prompt), Vv(d.params?.tag) && ((i = d.params) == null || delete i.tag);
				let a = new Promise(async (e) => {
					let t = ({ id: n }) => {
						d.id?.toString() === n.toString() && (this.removeRequestFromQueue(n), this.relayer.events.removeListener(ax.publish, t), e());
					};
					this.relayer.events.on(ax.publish, t);
					let r = Ud(new Promise((e, t) => {
						this.rpcPublish(d, n).then(e).catch((e) => {
							this.logger.warn(e, e?.message), t(e);
						});
					}), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${l} tag:${c}`);
					try {
						await r, this.events.removeListener(ax.publish, t);
					} catch (e) {
						this.queue.set(l, {
							request: d,
							opts: n,
							attempt: 1
						}), this.logger.warn(e, e?.message);
					}
				});
				this.logger.trace({
					type: "method",
					method: "publish",
					params: {
						id: l,
						topic: e,
						message: t,
						opts: n
					}
				}), await Ud(a, this.publishTimeout, f);
			} catch (e) {
				if (this.logger.debug("Failed to Publish Payload"), this.logger.error(e), (a = n?.internal) != null && a.throwOnFailedPublish) throw e;
			} finally {
				this.queue.delete(l);
			}
		}), XC(this, "publishCustom", async (e) => {
			var t, n, r;
			this.logger.debug("Publishing custom payload"), this.logger.trace({
				type: "method",
				method: "publishCustom",
				params: e
			});
			let { payload: i, opts: a = {} } = e, { attestation: o, tvf: s, publishMethod: c, prompt: l, tag: u, ttl: d = L.FIVE_MINUTES } = a, f = a.id || db().toString(), p = dv(uv().protocol), m = c || p.publish, h = {
				id: f,
				method: m,
				params: JC(YC(JC({}, i), {
					ttl: d,
					prompt: l,
					tag: u,
					attestation: o
				}), s)
			}, g = `Failed to publish custom payload, please try again. id:${f} tag:${u}`;
			try {
				Vv(h.params?.prompt) && ((t = h.params) == null || delete t.prompt), Vv(h.params?.tag) && ((n = h.params) == null || delete n.tag);
				let e = new Promise(async (e) => {
					let t = ({ id: n }) => {
						h.id?.toString() === n.toString() && (this.removeRequestFromQueue(n), this.relayer.events.removeListener(ax.publish, t), e());
					};
					this.relayer.events.on(ax.publish, t);
					let n = Ud(new Promise((e, t) => {
						this.rpcPublish(h, a).then(e).catch((e) => {
							this.logger.warn(e, e?.message), t(e);
						});
					}), this.initialPublishTimeout, `Failed initial custom payload publish, retrying.... method:${m} id:${f} tag:${u}`);
					try {
						await n, this.events.removeListener(ax.publish, t);
					} catch (e) {
						this.queue.set(f, {
							request: h,
							opts: a,
							attempt: 1
						}), this.logger.warn(e, e?.message);
					}
				});
				this.logger.trace({
					type: "method",
					method: "publish",
					params: {
						id: f,
						payload: i,
						opts: a
					}
				}), await Ud(e, this.publishTimeout, g);
			} catch (e) {
				if (this.logger.debug("Failed to Publish Payload"), this.logger.error(e), (r = a?.internal) != null && r.throwOnFailedPublish) throw e;
			} finally {
				this.queue.delete(f);
			}
		}), XC(this, "on", (e, t) => {
			this.events.on(e, t);
		}), XC(this, "once", (e, t) => {
			this.events.once(e, t);
		}), XC(this, "off", (e, t) => {
			this.events.off(e, t);
		}), XC(this, "removeListener", (e, t) => {
			this.events.removeListener(e, t);
		}), this.relayer = e, this.logger = S(t, this.name), this.registerEventListeners();
	}
	get context() {
		return b(this.logger);
	}
	async rpcPublish(e, t) {
		this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
			type: "message",
			direction: "outgoing",
			request: e
		});
		let n = await this.relayer.request(e);
		return this.relayer.events.emit(ax.publish, JC(JC({}, e), t)), this.logger.debug("Successfully Published Payload"), n;
	}
	removeRequestFromQueue(e) {
		this.queue.delete(e);
	}
	checkQueue() {
		this.queue.forEach(async (e, t) => {
			let n = e.attempt + 1;
			this.queue.set(t, YC(JC({}, e), { attempt: n })), this.logger.warn({}, `Publisher: queue->publishing: ${e.request.id}, tag: ${e.request.params?.tag}, attempt: ${n}`), await this.rpcPublish(e.request, e.opts), this.logger.warn({}, `Publisher: queue->published: ${e.request.id}`);
		});
	}
	registerEventListeners() {
		this.relayer.core.heartbeat.on(qe.pulse, () => {
			if (this.needsTransportRestart) {
				this.needsTransportRestart = !1, this.relayer.events.emit(ax.connection_stalled);
				return;
			}
			this.checkQueue();
		}), this.relayer.on(ax.message_ack, (e) => {
			this.removeRequestFromQueue(e.id.toString());
		});
	}
}, QC = Object.defineProperty, $C = (e, t, n) => t in e ? QC(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ew = (e, t, n) => $C(e, typeof t == "symbol" ? t : t + "", n), tw = class {
	constructor() {
		ew(this, "map", /* @__PURE__ */ new Map()), ew(this, "set", (e, t) => {
			let n = this.get(e);
			this.exists(e, t) || this.map.set(e, [...n, t]);
		}), ew(this, "get", (e) => this.map.get(e) || []), ew(this, "exists", (e, t) => this.get(e).includes(t)), ew(this, "delete", (e, t) => {
			if (typeof t > "u") {
				this.map.delete(e);
				return;
			}
			if (!this.map.has(e)) return;
			let n = this.get(e);
			if (!this.exists(e, t)) return;
			let r = n.filter((e) => e !== t);
			if (!r.length) {
				this.map.delete(e);
				return;
			}
			this.map.set(e, r);
		}), ew(this, "clear", () => {
			this.map.clear();
		});
	}
	get topics() {
		return Array.from(this.map.keys());
	}
}, nw = Object.defineProperty, rw = Object.defineProperties, iw = Object.getOwnPropertyDescriptors, aw = Object.getOwnPropertySymbols, ow = Object.prototype.hasOwnProperty, sw = Object.prototype.propertyIsEnumerable, cw = (e, t, n) => t in e ? nw(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, lw = (e, t) => {
	for (var n in t || (t = {})) ow.call(t, n) && cw(e, n, t[n]);
	if (aw) for (var n of aw(t)) sw.call(t, n) && cw(e, n, t[n]);
	return e;
}, uw = (e, t) => rw(e, iw(t)), K = (e, t, n) => cw(e, typeof t == "symbol" ? t : t + "", n), dw = class extends an {
	constructor(e, t) {
		super(e, t), this.relayer = e, this.logger = t, K(this, "subscriptions", /* @__PURE__ */ new Map()), K(this, "topicMap", new tw()), K(this, "events", new We.EventEmitter()), K(this, "name", dx), K(this, "version", "0.3"), K(this, "pending", /* @__PURE__ */ new Map()), K(this, "cached", []), K(this, "initialized", !1), K(this, "storagePrefix", Jb), K(this, "subscribeTimeout", (0, L.toMiliseconds)(L.ONE_MINUTE)), K(this, "initialSubscribeTimeout", (0, L.toMiliseconds)(L.ONE_SECOND * 15)), K(this, "clientId"), K(this, "batchSubscribeTopicsLimit", 500), K(this, "init", async () => {
			this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = !0;
		}), K(this, "subscribe", async (e, t) => {
			var n;
			this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({
				type: "method",
				method: "subscribe",
				params: {
					topic: e,
					opts: t
				}
			});
			try {
				let r = uv(t), i = {
					topic: e,
					relay: r,
					transportType: t?.transportType
				};
				(n = t?.internal) != null && n.skipSubscribe || this.pending.set(e, i);
				let a = await this.rpcSubscribe(e, r, t);
				return typeof a == "string" && (this.onSubscribe(a, i), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({
					type: "method",
					method: "subscribe",
					params: {
						topic: e,
						opts: t
					}
				})), a;
			} catch (e) {
				throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(e), e;
			}
		}), K(this, "unsubscribe", async (e, t) => {
			this.isInitialized(), typeof t?.id < "u" ? await this.unsubscribeById(e, t.id, t) : await this.unsubscribeByTopic(e, t);
		}), K(this, "isSubscribed", (e) => new Promise((t) => {
			t(this.topicMap.topics.includes(e));
		})), K(this, "isKnownTopic", (e) => new Promise((t) => {
			t(this.topicMap.topics.includes(e) || this.pending.has(e) || this.cached.some((t) => t.topic === e));
		})), K(this, "on", (e, t) => {
			this.events.on(e, t);
		}), K(this, "once", (e, t) => {
			this.events.once(e, t);
		}), K(this, "off", (e, t) => {
			this.events.off(e, t);
		}), K(this, "removeListener", (e, t) => {
			this.events.removeListener(e, t);
		}), K(this, "start", async () => {
			await this.onConnect();
		}), K(this, "stop", async () => {
			await this.onDisconnect();
		}), K(this, "restart", async () => {
			await this.restore(), await this.onRestart();
		}), K(this, "checkPending", async () => {
			if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
			let e = [];
			this.pending.forEach((t) => {
				e.push(t);
			}), await this.batchSubscribe(e);
		}), K(this, "registerEventListeners", () => {
			this.relayer.core.heartbeat.on(qe.pulse, async () => {
				await this.checkPending();
			}), this.events.on(ux.created, async (e) => {
				let t = ux.created;
				this.logger.info(`Emitting ${t}`), this.logger.debug({
					type: "event",
					event: t,
					data: e
				}), await this.persist();
			}), this.events.on(ux.deleted, async (e) => {
				let t = ux.deleted;
				this.logger.info(`Emitting ${t}`), this.logger.debug({
					type: "event",
					event: t,
					data: e
				}), await this.persist();
			});
		}), this.relayer = e, this.logger = S(t, this.name), this.clientId = "";
	}
	get context() {
		return b(this.logger);
	}
	get storageKey() {
		return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
	}
	get length() {
		return this.subscriptions.size;
	}
	get ids() {
		return Array.from(this.subscriptions.keys());
	}
	get values() {
		return Array.from(this.subscriptions.values());
	}
	get topics() {
		return this.topicMap.topics;
	}
	get hasAnyTopics() {
		return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
	}
	hasSubscription(e, t) {
		let n = !1;
		try {
			n = this.getSubscription(e).topic === t;
		} catch {}
		return n;
	}
	reset() {
		this.cached = [], this.initialized = !0;
	}
	onDisable() {
		this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
	}
	async unsubscribeByTopic(e, t) {
		let n = this.topicMap.get(e);
		await Promise.all(n.map(async (n) => await this.unsubscribeById(e, n, t)));
	}
	async unsubscribeById(e, t, n) {
		this.logger.debug("Unsubscribing Topic"), this.logger.trace({
			type: "method",
			method: "unsubscribe",
			params: {
				topic: e,
				id: t,
				opts: n
			}
		});
		try {
			let r = uv(n);
			await this.restartToComplete({
				topic: e,
				id: t,
				relay: r
			}), await this.rpcUnsubscribe(e, t, r);
			let i = W("USER_DISCONNECTED", `${this.name}, ${e}`);
			await this.onUnsubscribe(e, t, i), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({
				type: "method",
				method: "unsubscribe",
				params: {
					topic: e,
					id: t,
					opts: n
				}
			});
		} catch (e) {
			throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(e), e;
		}
	}
	async rpcSubscribe(e, t, n) {
		var r;
		let i = await this.getSubscriptionId(e);
		if ((r = n?.internal) != null && r.skipSubscribe) return i;
		(!n || n?.transportType === G.relay) && await this.restartToComplete({
			topic: e,
			id: e,
			relay: t
		});
		let a = {
			method: dv(t.protocol).subscribe,
			params: { topic: e }
		};
		this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
			type: "payload",
			direction: "outgoing",
			request: a
		});
		let o = n?.internal?.throwOnFailedPublish;
		try {
			if (n?.transportType === G.link_mode) return setTimeout(() => {
				(this.relayer.connected || this.relayer.connecting) && this.relayer.request(a).catch((e) => this.logger.warn(e));
			}, (0, L.toMiliseconds)(L.ONE_SECOND)), i;
			let t = await Ud(new Promise(async (t) => {
				let n = (r) => {
					r.topic === e && (this.events.removeListener(ux.created, n), t(r.id));
				};
				this.events.on(ux.created, n);
				try {
					let r = await Ud(new Promise((e, t) => {
						this.relayer.request(a).catch((e) => {
							this.logger.warn(e, e?.message), t(e);
						}).then(e);
					}), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
					this.events.removeListener(ux.created, n), t(r);
				} catch {}
			}), this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
			if (!t && o) throw Error(`Subscribing to ${e} failed, please try again`);
			return t ? i : null;
		} catch (e) {
			if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(ax.connection_stalled), o) throw e;
		}
		return null;
	}
	async rpcBatchSubscribe(e) {
		if (!e.length) return;
		let t = e[0].relay, n = {
			method: dv(t.protocol).batchSubscribe,
			params: { topics: e.map((e) => e.topic) }
		};
		this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
			type: "payload",
			direction: "outgoing",
			request: n
		});
		try {
			await await Ud(new Promise((e) => {
				this.relayer.request(n).catch((e) => this.logger.warn(e)).then(e);
			}), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
		} catch {
			this.relayer.events.emit(ax.connection_stalled);
		}
	}
	async rpcBatchFetchMessages(e) {
		if (!e.length) return;
		let t = e[0].relay, n = {
			method: dv(t.protocol).batchFetchMessages,
			params: { topics: e.map((e) => e.topic) }
		};
		this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
			type: "payload",
			direction: "outgoing",
			request: n
		});
		let r;
		try {
			r = await await Ud(new Promise((e, t) => {
				this.relayer.request(n).catch((e) => {
					this.logger.warn(e), t(e);
				}).then(e);
			}), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
		} catch {
			this.relayer.events.emit(ax.connection_stalled);
		}
		return r;
	}
	rpcUnsubscribe(e, t, n) {
		let r = {
			method: dv(n.protocol).unsubscribe,
			params: {
				topic: e,
				id: t
			}
		};
		return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
			type: "payload",
			direction: "outgoing",
			request: r
		}), this.relayer.request(r);
	}
	onSubscribe(e, t) {
		this.setSubscription(e, uw(lw({}, t), { id: e })), this.pending.delete(t.topic);
	}
	onBatchSubscribe(e) {
		e.length && e.forEach((e) => {
			this.setSubscription(e.id, lw({}, e)), this.pending.delete(e.topic);
		});
	}
	async onUnsubscribe(e, t, n) {
		this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, n), await this.relayer.messages.del(e);
	}
	async setRelayerSubscriptions(e) {
		await this.relayer.core.storage.setItem(this.storageKey, e);
	}
	async getRelayerSubscriptions() {
		return await this.relayer.core.storage.getItem(this.storageKey);
	}
	setSubscription(e, t) {
		this.logger.debug("Setting subscription"), this.logger.trace({
			type: "method",
			method: "setSubscription",
			id: e,
			subscription: t
		}), this.addSubscription(e, t);
	}
	addSubscription(e, t) {
		this.subscriptions.set(e, lw({}, t)), this.topicMap.set(t.topic, e), this.events.emit(ux.created, t);
	}
	getSubscription(e) {
		this.logger.debug("Getting subscription"), this.logger.trace({
			type: "method",
			method: "getSubscription",
			id: e
		});
		let t = this.subscriptions.get(e);
		if (!t) {
			let { message: t } = U("NO_MATCHING_KEY", `${this.name}: ${e}`);
			throw Error(t);
		}
		return t;
	}
	deleteSubscription(e, t) {
		this.logger.debug("Deleting subscription"), this.logger.trace({
			type: "method",
			method: "deleteSubscription",
			id: e,
			reason: t
		});
		let n = this.getSubscription(e);
		this.subscriptions.delete(e), this.topicMap.delete(n.topic, e), this.events.emit(ux.deleted, uw(lw({}, n), { reason: t }));
	}
	async persist() {
		await this.setRelayerSubscriptions(this.values), this.events.emit(ux.sync);
	}
	async onRestart() {
		if (this.cached.length) {
			let e = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
			for (let n = 0; n < t; n++) {
				let t = e.splice(0, this.batchSubscribeTopicsLimit);
				await this.batchSubscribe(t);
			}
		}
		this.events.emit(ux.resubscribed);
	}
	async restore() {
		try {
			let e = await this.getRelayerSubscriptions();
			if (typeof e > "u" || !e.length) return;
			if (this.subscriptions.size && !e.every((e) => e.topic === this.subscriptions.get(e.id)?.topic)) {
				let { message: e } = U("RESTORE_WILL_OVERRIDE", this.name);
				throw this.logger.error(e), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), Error(e);
			}
			this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({
				type: "method",
				method: "restore",
				subscriptions: this.values
			});
		} catch (e) {
			this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
		}
	}
	async batchSubscribe(e) {
		e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (e) => uw(lw({}, e), { id: await this.getSubscriptionId(e.topic) })))));
	}
	async batchFetchMessages(e) {
		if (!e.length) return;
		this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
		let t = await this.rpcBatchFetchMessages(e);
		t && t.messages && (await lf((0, L.toMiliseconds)(L.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
	}
	async onConnect() {
		await this.restart(), this.reset();
	}
	onDisconnect() {
		this.onDisable();
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
	async restartToComplete(e) {
		!this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
	}
	async getClientId() {
		return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
	}
	async getSubscriptionId(e) {
		return q_(e + await this.getClientId());
	}
}, fw = Object.defineProperty, pw = Object.getOwnPropertySymbols, mw = Object.prototype.hasOwnProperty, hw = Object.prototype.propertyIsEnumerable, gw = (e, t, n) => t in e ? fw(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, _w = (e, t) => {
	for (var n in t || (t = {})) mw.call(t, n) && gw(e, n, t[n]);
	if (pw) for (var n of pw(t)) hw.call(t, n) && gw(e, n, t[n]);
	return e;
}, q = (e, t, n) => gw(e, typeof t == "symbol" ? t : t + "", n), vw = class extends nn {
	constructor(e) {
		super(e), q(this, "protocol", "wc"), q(this, "version", 2), q(this, "core"), q(this, "logger"), q(this, "events", new We.EventEmitter()), q(this, "provider"), q(this, "messages"), q(this, "subscriber"), q(this, "publisher"), q(this, "name", ix), q(this, "transportExplicitlyClosed", !1), q(this, "initialized", !1), q(this, "connectionAttemptInProgress", !1), q(this, "relayUrl"), q(this, "projectId"), q(this, "packageName"), q(this, "bundleId"), q(this, "hasExperiencedNetworkDisruption", !1), q(this, "pingTimeout"), q(this, "heartBeatTimeout", (0, L.toMiliseconds)(L.THIRTY_SECONDS + L.FIVE_SECONDS)), q(this, "reconnectTimeout"), q(this, "connectPromise"), q(this, "reconnectInProgress", !1), q(this, "requestsInFlight", []), q(this, "connectTimeout", (0, L.toMiliseconds)(L.ONE_SECOND * 15)), q(this, "request", async (e) => {
			this.logger.debug("Publishing Request Payload");
			let t = e.id || db().toString();
			await this.toEstablishConnection();
			try {
				this.logger.trace({
					id: t,
					method: e.method,
					topic: e.params?.topic
				}, "relayer.request - publishing...");
				let n = `${t}:${e.params?.tag || ""}`;
				this.requestsInFlight.push(n);
				let r = await this.provider.request(e);
				return this.requestsInFlight = this.requestsInFlight.filter((e) => e !== n), r;
			} catch (e) {
				throw this.logger.debug(`Failed to Publish Request: ${t}`), e;
			}
		}), q(this, "resetPingTimeout", () => {
			Td() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
				var e, t;
				try {
					this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (t = (e = this.provider?.connection?.socket)?.terminate) == null || t.call(e);
				} catch (e) {
					this.logger.warn(e, e?.message);
				}
			}, this.heartBeatTimeout));
		}), q(this, "onPayloadHandler", (e) => {
			this.onProviderPayload(e), this.resetPingTimeout();
		}), q(this, "onConnectHandler", () => {
			this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(ax.connect);
		}), q(this, "onDisconnectHandler", () => {
			this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
		}), q(this, "onProviderErrorHandler", (e) => {
			this.logger.fatal(`Fatal socket error: ${e.message}`), this.events.emit(ax.error, e), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
		}), q(this, "registerProviderListeners", () => {
			this.provider.on(ox.payload, this.onPayloadHandler), this.provider.on(ox.connect, this.onConnectHandler), this.provider.on(ox.disconnect, this.onDisconnectHandler), this.provider.on(ox.error, this.onProviderErrorHandler);
		}), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? S(e.logger, this.name) : (0, w.default)(x({ level: e.logger || "error" })), this.messages = new BC(this.logger, e.core), this.subscriber = new dw(this, this.logger), this.publisher = new ZC(this, this.logger), this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || "wss://relay.walletconnect.org", Dd() ? this.packageName = jd() : Od() && (this.bundleId = jd()), this.provider = {};
	}
	async init() {
		this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.transportOpen().catch((e) => this.logger.warn(e, e?.message));
	}
	get context() {
		return b(this.logger);
	}
	get connected() {
		return this.provider?.connection?.socket?.readyState === 1 || !1;
	}
	get connecting() {
		return this.provider?.connection?.socket?.readyState === 0 || this.connectPromise !== void 0 || !1;
	}
	async publish(e, t, n) {
		this.isInitialized(), await this.publisher.publish(e, t, n), await this.recordMessageEvent({
			topic: e,
			message: t,
			publishedAt: Date.now(),
			transportType: G.relay
		}, cx.outbound);
	}
	async publishCustom(e) {
		this.isInitialized(), await this.publisher.publishCustom(e);
	}
	async subscribe(e, t) {
		this.isInitialized(), (!(t != null && t.transportType) || t?.transportType === "relay") && await this.toEstablishConnection();
		let n = typeof t?.internal?.throwOnFailedPublish > "u" ? !0 : t?.internal?.throwOnFailedPublish, r = this.subscriber.topicMap.get(e)?.[0] || "", i, a = (t) => {
			t.topic === e && (this.subscriber.off(ux.created, a), i());
		};
		return await Promise.all([new Promise((e) => {
			i = e, this.subscriber.on(ux.created, a);
		}), new Promise(async (i, a) => {
			r = await this.subscriber.subscribe(e, _w({ internal: { throwOnFailedPublish: n } }, t)).catch((e) => {
				n && a(e);
			}) || r, i();
		})]), r;
	}
	async unsubscribe(e, t) {
		this.isInitialized(), await this.subscriber.unsubscribe(e, t);
	}
	on(e, t) {
		this.events.on(e, t);
	}
	once(e, t) {
		this.events.once(e, t);
	}
	off(e, t) {
		this.events.off(e, t);
	}
	removeListener(e, t) {
		this.events.removeListener(e, t);
	}
	async transportDisconnect() {
		this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await Ud(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
	}
	async transportClose() {
		this.transportExplicitlyClosed = !0, await this.transportDisconnect();
	}
	async transportOpen(e) {
		if (!this.subscriber.hasAnyTopics) {
			this.logger.info("Starting WS connection skipped because the client has no topics to work with.");
			return;
		}
		if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, n) => {
			await this.connect(e).then(t).catch(n).finally(() => {
				this.connectPromise = void 0;
			});
		}), await this.connectPromise), !this.connected) throw Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
	}
	async restartTransport(e) {
		this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
	}
	async confirmOnlineStateOrThrow() {
		if (!await Sy()) throw Error("No internet connection detected. Please restart your network and try again.");
	}
	async handleBatchMessageEvents(e) {
		if (e?.length === 0) {
			this.logger.trace("Batch message events is empty. Ignoring...");
			return;
		}
		let t = e.sort((e, t) => e.publishedAt - t.publishedAt);
		this.logger.debug(`Batch of ${t.length} message events sorted`);
		for (let e of t) try {
			await this.onMessageEvent(e);
		} catch (e) {
			this.logger.warn(e, "Error while processing batch message event: " + e?.message);
		}
		this.logger.trace(`Batch of ${t.length} message events processed`);
	}
	async onLinkMessageEvent(e, t) {
		let { topic: n } = e;
		if (!t.sessionExists) {
			let e = {
				topic: n,
				expiry: Jd(L.FIVE_MINUTES),
				relay: { protocol: "irn" },
				active: !1
			};
			await this.core.pairing.pairings.set(n, e);
		}
		this.events.emit(ax.message, e), await this.recordMessageEvent(e, cx.inbound);
	}
	async connect(e) {
		await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
		let t = 1;
		for (; t < 6;) {
			try {
				if (this.transportExplicitlyClosed) break;
				this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (e, t) => {
					let n = () => {
						t(/* @__PURE__ */ Error("Connection interrupted while trying to connect"));
					};
					this.provider.once(ox.disconnect, n), await Ud(new Promise((e, t) => {
						this.provider.connect().then(e).catch(t);
					}), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((e) => {
						t(e);
					}).finally(() => {
						this.provider.off(ox.disconnect, n), clearTimeout(this.reconnectTimeout);
					}), await new Promise(async (e, n) => {
						let r = () => {
							t(/* @__PURE__ */ Error("Connection interrupted while trying to subscribe"));
						};
						this.provider.once(ox.disconnect, r), await this.subscriber.start().then(e).catch(n).finally(() => {
							this.provider.off(ox.disconnect, r);
						});
					}), this.hasExperiencedNetworkDisruption = !1, e();
				});
			} catch (e) {
				await this.subscriber.stop();
				let t = e;
				this.logger.warn({}, t.message), this.hasExperiencedNetworkDisruption = !0;
			} finally {
				this.connectionAttemptInProgress = !1;
			}
			if (this.connected) {
				this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
				break;
			}
			await new Promise((e) => setTimeout(e, (0, L.toMiliseconds)(t * 1))), t++;
		}
	}
	startPingTimeout() {
		var e, t;
		if (Td()) try {
			(e = this.provider?.connection) != null && e.socket && ((t = this.provider?.connection?.socket) == null || t.on("ping", () => {
				this.resetPingTimeout();
			})), this.resetPingTimeout();
		} catch (e) {
			this.logger.warn(e, e?.message);
		}
	}
	async createProvider() {
		this.provider.connection && this.unregisterProviderListeners();
		let e = await this.core.crypto.signJWT(this.relayUrl);
		this.provider = new zb(new Kb(Rd({
			sdkVersion: sx,
			protocol: this.protocol,
			version: this.version,
			relayUrl: this.relayUrl,
			projectId: this.projectId,
			auth: e,
			useOnCloseEvent: !0,
			bundleId: this.bundleId,
			packageName: this.packageName
		}))), this.registerProviderListeners();
	}
	async recordMessageEvent(e, t) {
		let { topic: n, message: r } = e;
		await this.messages.set(n, r, t);
	}
	async shouldIgnoreMessageEvent(e) {
		let { topic: t, message: n } = e;
		if (!n || n.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${n}`), !0;
		if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), !0;
		let r = this.messages.has(t, n);
		return r && this.logger.warn(`Ignoring duplicate message: ${n}`), r;
	}
	async onProviderPayload(e) {
		if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({
			type: "payload",
			direction: "incoming",
			payload: e
		}), Nb(e)) {
			if (!e.method.endsWith("_subscription")) return;
			let t = e.params, { topic: n, message: r, publishedAt: i, attestation: a } = t.data, o = {
				topic: n,
				message: r,
				publishedAt: i,
				transportType: G.relay,
				attestation: a
			};
			this.logger.debug("Emitting Relayer Payload"), this.logger.trace(_w({
				type: "event",
				event: t.id
			}, o)), this.events.emit(t.id, o), await this.acknowledgePayload(e), await this.onMessageEvent(o);
		} else Pb(e) && this.events.emit(ax.message_ack, e);
	}
	async onMessageEvent(e) {
		await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, cx.inbound), this.events.emit(ax.message, e));
	}
	async acknowledgePayload(e) {
		let t = pb(e.id, !0);
		await this.provider.connection.send(t);
	}
	unregisterProviderListeners() {
		this.provider.off(ox.payload, this.onPayloadHandler), this.provider.off(ox.connect, this.onConnectHandler), this.provider.off(ox.disconnect, this.onDisconnectHandler), this.provider.off(ox.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
	}
	async registerEventListeners() {
		let e = await Sy();
		Ey(async (t) => {
			e !== t && (e = t, t ? await this.transportOpen().catch((e) => this.logger.error(e, e?.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
		}), this.core.heartbeat.on(qe.pulse, async () => {
			if (!this.transportExplicitlyClosed && !this.connected && ky()) try {
				await this.confirmOnlineStateOrThrow(), await this.transportOpen();
			} catch (e) {
				this.logger.warn(e, e?.message);
			}
		});
	}
	async onProviderDisconnect() {
		clearTimeout(this.pingTimeout), this.events.emit(ax.disconnect), this.connectionAttemptInProgress = !1, !this.reconnectInProgress && (this.reconnectInProgress = !0, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
			await this.transportOpen().catch((e) => this.logger.error(e, e?.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
		}, (0, L.toMiliseconds)(.1)))));
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
	async toEstablishConnection() {
		if (await this.confirmOnlineStateOrThrow(), !this.connected) {
			if (this.connectPromise) {
				await this.connectPromise;
				return;
			}
			await this.connect();
		}
	}
};
function yw(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function bw(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function xw(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
var Sw = "[object RegExp]", Cw = "[object String]", ww = "[object Number]", Tw = "[object Boolean]", Ew = "[object Arguments]", Dw = "[object Symbol]", Ow = "[object Date]", kw = "[object Map]", Aw = "[object Set]", jw = "[object Array]", Mw = "[object Function]", Nw = "[object ArrayBuffer]", Pw = "[object Object]", Fw = "[object Error]", Iw = "[object DataView]", Lw = "[object Uint8Array]", Rw = "[object Uint8ClampedArray]", zw = "[object Uint16Array]", Bw = "[object Uint32Array]", Vw = "[object BigUint64Array]", Hw = "[object Int8Array]", Uw = "[object Int16Array]", Ww = "[object Int32Array]", Gw = "[object BigInt64Array]", Kw = "[object Float32Array]", qw = "[object Float64Array]";
function Jw() {}
function Yw(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" : !1;
}
function Xw(e, t, n) {
	return Zw(e, t, void 0, void 0, void 0, void 0, n);
}
function Zw(e, t, n, r, i, a, o) {
	let s = o(e, t, n, r, i, a);
	if (s !== void 0) return s;
	if (typeof e == typeof t) switch (typeof e) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return e === t;
		case "number": return e === t || Object.is(e, t);
		case "function": return e === t;
		case "object": return Qw(e, t, a, o);
	}
	return Qw(e, t, a, o);
}
function Qw(e, t, n, r) {
	if (Object.is(e, t)) return !0;
	let i = xw(e), a = xw(t);
	if (i === Ew && (i = Pw), a === Ew && (a = Pw), i !== a) return !1;
	switch (i) {
		case Cw: return e.toString() === t.toString();
		case ww: return yw(e.valueOf(), t.valueOf());
		case Tw:
		case Ow:
		case Dw: return Object.is(e.valueOf(), t.valueOf());
		case Sw: return e.source === t.source && e.flags === t.flags;
		case Mw: return e === t;
	}
	n = n ?? /* @__PURE__ */ new Map();
	let o = n.get(e), s = n.get(t);
	if (o != null && s != null) return o === t;
	n.set(e, t), n.set(t, e);
	try {
		switch (i) {
			case kw:
				if (e.size !== t.size) return !1;
				for (let [i, a] of e.entries()) if (!t.has(i) || !Zw(a, t.get(i), i, e, t, n, r)) return !1;
				return !0;
			case Aw: {
				if (e.size !== t.size) return !1;
				let i = Array.from(e.values()), a = Array.from(t.values());
				for (let o = 0; o < i.length; o++) {
					let s = i[o], c = a.findIndex((i) => Zw(s, i, void 0, e, t, n, r));
					if (c === -1) return !1;
					a.splice(c, 1);
				}
				return !0;
			}
			case jw:
			case Lw:
			case Rw:
			case zw:
			case Bw:
			case Vw:
			case Hw:
			case Uw:
			case Ww:
			case Gw:
			case Kw:
			case qw:
				if (typeof Buffer < "u" && Buffer.isBuffer(e) !== Buffer.isBuffer(t) || e.length !== t.length) return !1;
				for (let i = 0; i < e.length; i++) if (!Zw(e[i], t[i], i, e, t, n, r)) return !1;
				return !0;
			case Nw: return e.byteLength === t.byteLength ? Qw(new Uint8Array(e), new Uint8Array(t), n, r) : !1;
			case Iw: return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : Qw(new Uint8Array(e), new Uint8Array(t), n, r);
			case Fw: return e.name === t.name && e.message === t.message;
			case Pw: {
				if (!(Qw(e.constructor, t.constructor, n, r) || Yw(e) && Yw(t))) return !1;
				let i = [...Object.keys(e), ...bw(e)], a = [...Object.keys(t), ...bw(t)];
				if (i.length !== a.length) return !1;
				for (let a = 0; a < i.length; a++) {
					let o = i[a], s = e[o];
					if (!Object.hasOwn(t, o)) return !1;
					let c = t[o];
					if (!Zw(s, c, o, e, t, n, r)) return !1;
				}
				return !0;
			}
			default: return !1;
		}
	} finally {
		n.delete(e), n.delete(t);
	}
}
function $w(e, t) {
	return Xw(e, t, Jw);
}
var eT = Object.defineProperty, tT = Object.getOwnPropertySymbols, nT = Object.prototype.hasOwnProperty, rT = Object.prototype.propertyIsEnumerable, iT = (e, t, n) => t in e ? eT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, aT = (e, t) => {
	for (var n in t || (t = {})) nT.call(t, n) && iT(e, n, t[n]);
	if (tT) for (var n of tT(t)) rT.call(t, n) && iT(e, n, t[n]);
	return e;
}, oT = (e, t, n) => iT(e, typeof t == "symbol" ? t : t + "", n), sT = class extends rn {
	constructor(e, t, n, r = Jb, i = void 0) {
		super(e, t, n, r), this.core = e, this.logger = t, this.name = n, oT(this, "map", /* @__PURE__ */ new Map()), oT(this, "version", "0.3"), oT(this, "cached", []), oT(this, "initialized", !1), oT(this, "getKey"), oT(this, "storagePrefix", Jb), oT(this, "recentlyDeleted", []), oT(this, "recentlyDeletedLimit", 200), oT(this, "init", async () => {
			this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((e) => {
				this.getKey && e !== null && !Vv(e) ? this.map.set(this.getKey(e), e) : Jv(e) ? this.map.set(e.id, e) : Yv(e) && this.map.set(e.topic, e);
			}), this.cached = [], this.initialized = !0);
		}), oT(this, "set", async (e, t) => {
			this.isInitialized(), this.map.has(e) ? await this.update(e, t) : (this.logger.debug("Setting value"), this.logger.trace({
				type: "method",
				method: "set",
				key: e,
				value: t
			}), this.map.set(e, t), await this.persist());
		}), oT(this, "get", (e) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({
			type: "method",
			method: "get",
			key: e
		}), this.getData(e))), oT(this, "getAll", (e) => (this.isInitialized(), e ? this.values.filter((t) => Object.keys(e).every((n) => $w(t[n], e[n]))) : this.values)), oT(this, "update", async (e, t) => {
			this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({
				type: "method",
				method: "update",
				key: e,
				update: t
			});
			let n = aT(aT({}, this.getData(e)), t);
			this.map.set(e, n), await this.persist();
		}), oT(this, "delete", async (e, t) => {
			this.isInitialized(), this.map.has(e) && (this.logger.debug("Deleting value"), this.logger.trace({
				type: "method",
				method: "delete",
				key: e,
				reason: t
			}), this.map.delete(e), this.addToRecentlyDeleted(e), await this.persist());
		}), this.logger = S(t, this.name), this.storagePrefix = r, this.getKey = i;
	}
	get context() {
		return b(this.logger);
	}
	get storageKey() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
	}
	get length() {
		return this.map.size;
	}
	get keys() {
		return Array.from(this.map.keys());
	}
	get values() {
		return Array.from(this.map.values());
	}
	addToRecentlyDeleted(e) {
		this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
	}
	async setDataStore(e) {
		await this.core.storage.setItem(this.storageKey, e);
	}
	async getDataStore() {
		return await this.core.storage.getItem(this.storageKey);
	}
	getData(e) {
		let t = this.map.get(e);
		if (!t) {
			if (this.recentlyDeleted.includes(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
				throw this.logger.error(t), Error(t);
			}
			let { message: t } = U("NO_MATCHING_KEY", `${this.name}: ${e}`);
			throw this.logger.error(t), Error(t);
		}
		return t;
	}
	async persist() {
		await this.setDataStore(this.values);
	}
	async restore() {
		try {
			let e = await this.getDataStore();
			if (typeof e > "u" || !e.length) return;
			if (this.map.size) {
				let { message: e } = U("RESTORE_WILL_OVERRIDE", this.name);
				throw this.logger.error(e), Error(e);
			}
			this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({
				type: "method",
				method: "restore",
				value: this.values
			});
		} catch (e) {
			this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
		}
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
}, cT = Object.defineProperty, lT = (e, t, n) => t in e ? cT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, J = (e, t, n) => lT(e, typeof t == "symbol" ? t : t + "", n), uT = class {
	constructor(e, t) {
		this.core = e, this.logger = t, J(this, "name", fx), J(this, "version", "0.3"), J(this, "events", new We.default()), J(this, "pairings"), J(this, "initialized", !1), J(this, "storagePrefix", Jb), J(this, "ignoredPayloadTypes", [1]), J(this, "registeredMethods", []), J(this, "init", async () => {
			this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
		}), J(this, "register", ({ methods: e }) => {
			this.isInitialized(), this.registeredMethods = [...new Set([...this.registeredMethods, ...e])];
		}), J(this, "create", async (e) => {
			this.isInitialized();
			let t = W_(), n = await this.core.crypto.setSymKey(t), r = Jd(L.FIVE_MINUTES), i = { protocol: "irn" }, a = {
				topic: n,
				expiry: r,
				relay: i,
				active: !1,
				methods: e?.methods
			}, o = gv({
				protocol: this.core.protocol,
				version: this.core.version,
				topic: n,
				symKey: t,
				relay: i,
				expiryTimestamp: r,
				methods: e?.methods
			});
			return this.events.emit(mx.create, a), this.core.expirer.set(n, r), await this.pairings.set(n, a), await this.core.relayer.subscribe(n, {
				transportType: e?.transportType,
				internal: e?.internal
			}), {
				topic: n,
				uri: o
			};
		}), J(this, "pair", async (e) => {
			this.isInitialized();
			let t = this.core.eventClient.createEvent({ properties: {
				topic: e?.uri,
				trace: [Ex.pairing_started]
			} });
			this.isValidPair(e, t);
			let { topic: n, symKey: r, relay: i, expiryTimestamp: a, methods: o } = pv(e.uri);
			t.props.properties.topic = n, t.addTrace(Ex.pairing_uri_validation_success), t.addTrace(Ex.pairing_uri_not_expired);
			let s;
			if (this.pairings.keys.includes(n)) {
				if (s = this.pairings.get(n), t.addTrace(Ex.existing_pairing), s.active) throw t.setError(Dx.active_pairing_already_exists), /* @__PURE__ */ Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);
				t.addTrace(Ex.pairing_not_expired);
			}
			let c = a || Jd(L.FIVE_MINUTES), l = {
				topic: n,
				relay: i,
				expiry: c,
				active: !1,
				methods: o
			};
			this.core.expirer.set(n, c), await this.pairings.set(n, l), t.addTrace(Ex.store_new_pairing), e.activatePairing && await this.activate({ topic: n }), this.events.emit(mx.create, l), t.addTrace(Ex.emit_inactive_pairing), this.core.crypto.keychain.has(n) || await this.core.crypto.setSymKey(r, n), t.addTrace(Ex.subscribing_pairing_topic);
			try {
				await this.core.relayer.confirmOnlineStateOrThrow();
			} catch {
				t.setError(Dx.no_internet_connection);
			}
			try {
				await this.core.relayer.subscribe(n, { relay: i });
			} catch (e) {
				throw t.setError(Dx.subscribe_pairing_topic_failure), e;
			}
			return t.addTrace(Ex.subscribe_pairing_topic_success), l;
		}), J(this, "activate", async ({ topic: e }) => {
			this.isInitialized();
			let t = Jd(L.FIVE_MINUTES);
			this.core.expirer.set(e, t), await this.pairings.update(e, {
				active: !0,
				expiry: t
			});
		}), J(this, "ping", async (e) => {
			this.isInitialized(), await this.isValidPing(e), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
			let { topic: t } = e;
			if (this.pairings.keys.includes(t)) {
				let e = await this.sendRequest(t, "wc_pairingPing", {}), { done: n, resolve: r, reject: i } = Hd();
				this.events.once(B("pairing_ping", e), ({ error: e }) => {
					e ? i(e) : r();
				}), await n();
			}
		}), J(this, "updateExpiry", async ({ topic: e, expiry: t }) => {
			this.isInitialized(), await this.pairings.update(e, { expiry: t });
		}), J(this, "updateMetadata", async ({ topic: e, metadata: t }) => {
			this.isInitialized(), await this.pairings.update(e, { peerMetadata: t });
		}), J(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), J(this, "disconnect", async (e) => {
			this.isInitialized(), await this.isValidDisconnect(e);
			let { topic: t } = e;
			this.pairings.keys.includes(t) && (await this.sendRequest(t, "wc_pairingDelete", W("USER_DISCONNECTED")), await this.deletePairing(t));
		}), J(this, "formatUriFromPairing", (e) => {
			this.isInitialized();
			let { topic: t, relay: n, expiry: r, methods: i } = e, a = this.core.crypto.keychain.get(t);
			return gv({
				protocol: this.core.protocol,
				version: this.core.version,
				topic: t,
				symKey: a,
				relay: n,
				expiryTimestamp: r,
				methods: i
			});
		}), J(this, "sendRequest", async (e, t, n) => {
			let r = fb(t, n), i = await this.core.crypto.encode(e, r), a = px[t].req;
			return this.core.history.set(e, r), this.core.relayer.publish(e, i, a), r.id;
		}), J(this, "sendResult", async (e, t, n) => {
			let r = pb(e, n), i = await this.core.crypto.encode(t, r), a = px[(await this.core.history.get(t, e)).request.method].res;
			await this.core.relayer.publish(t, i, a), await this.core.history.resolve(r);
		}), J(this, "sendError", async (e, t, n) => {
			let r = mb(e, n), i = await this.core.crypto.encode(t, r), a = (await this.core.history.get(t, e)).request.method, o = px[a] ? px[a].res : px.unregistered_method.res;
			await this.core.relayer.publish(t, i, o), await this.core.history.resolve(r);
		}), J(this, "deletePairing", async (e, t) => {
			await this.core.relayer.unsubscribe(e), await Promise.all([
				this.pairings.delete(e, W("USER_DISCONNECTED")),
				this.core.crypto.deleteSymKey(e),
				t ? Promise.resolve() : this.core.expirer.del(e)
			]);
		}), J(this, "cleanup", async () => {
			let e = this.pairings.getAll().filter((e) => Yd(e.expiry));
			await Promise.all(e.map((e) => this.deletePairing(e.topic)));
		}), J(this, "onRelayEventRequest", async (e) => {
			let { topic: t, payload: n } = e;
			switch (n.method) {
				case "wc_pairingPing": return await this.onPairingPingRequest(t, n);
				case "wc_pairingDelete": return await this.onPairingDeleteRequest(t, n);
				default: return await this.onUnknownRpcMethodRequest(t, n);
			}
		}), J(this, "onRelayEventResponse", async (e) => {
			let { topic: t, payload: n } = e, r = (await this.core.history.get(t, n.id)).request.method;
			switch (r) {
				case "wc_pairingPing": return this.onPairingPingResponse(t, n);
				default: return this.onUnknownRpcMethodResponse(r);
			}
		}), J(this, "onPairingPingRequest", async (e, t) => {
			let { id: n } = t;
			try {
				this.isValidPing({ topic: e }), await this.sendResult(n, e, !0), this.events.emit(mx.ping, {
					id: n,
					topic: e
				});
			} catch (t) {
				await this.sendError(n, e, t), this.logger.error(t);
			}
		}), J(this, "onPairingPingResponse", (e, t) => {
			let { id: n } = t;
			setTimeout(() => {
				Fb(t) ? this.events.emit(B("pairing_ping", n), {}) : Ib(t) && this.events.emit(B("pairing_ping", n), { error: t.error });
			}, 500);
		}), J(this, "onPairingDeleteRequest", async (e, t) => {
			let { id: n } = t;
			try {
				this.isValidDisconnect({ topic: e }), await this.deletePairing(e), this.events.emit(mx.delete, {
					id: n,
					topic: e
				});
			} catch (t) {
				await this.sendError(n, e, t), this.logger.error(t);
			}
		}), J(this, "onUnknownRpcMethodRequest", async (e, t) => {
			let { id: n, method: r } = t;
			try {
				if (this.registeredMethods.includes(r)) return;
				let t = W("WC_METHOD_UNSUPPORTED", r);
				await this.sendError(n, e, t), this.logger.error(t);
			} catch (t) {
				await this.sendError(n, e, t), this.logger.error(t);
			}
		}), J(this, "onUnknownRpcMethodResponse", (e) => {
			this.registeredMethods.includes(e) || this.logger.error(W("WC_METHOD_UNSUPPORTED", e));
		}), J(this, "isValidPair", (e, t) => {
			var n;
			if (!ly(e)) {
				let { message: n } = U("MISSING_OR_INVALID", `pair() params: ${e}`);
				throw t.setError(Dx.malformed_pairing_uri), Error(n);
			}
			if (!qv(e.uri)) {
				let { message: n } = U("MISSING_OR_INVALID", `pair() uri: ${e.uri}`);
				throw t.setError(Dx.malformed_pairing_uri), Error(n);
			}
			let r = pv(e?.uri);
			if (!((n = r?.relay) != null && n.protocol)) {
				let { message: e } = U("MISSING_OR_INVALID", "pair() uri#relay-protocol");
				throw t.setError(Dx.malformed_pairing_uri), Error(e);
			}
			if (!(r != null && r.symKey)) {
				let { message: e } = U("MISSING_OR_INVALID", "pair() uri#symKey");
				throw t.setError(Dx.malformed_pairing_uri), Error(e);
			}
			if (r != null && r.expiryTimestamp && (0, L.toMiliseconds)(r?.expiryTimestamp) < Date.now()) {
				t.setError(Dx.pairing_expired);
				let { message: e } = U("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
				throw Error(e);
			}
		}), J(this, "isValidPing", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `ping() params: ${e}`);
				throw Error(t);
			}
			let { topic: t } = e;
			await this.isValidPairingTopic(t);
		}), J(this, "isValidDisconnect", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `disconnect() params: ${e}`);
				throw Error(t);
			}
			let { topic: t } = e;
			await this.isValidPairingTopic(t);
		}), J(this, "isValidPairingTopic", async (e) => {
			if (!Hv(e, !1)) {
				let { message: t } = U("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
				throw Error(t);
			}
			if (!this.pairings.keys.includes(e)) {
				let { message: t } = U("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
				throw Error(t);
			}
			if (Yd(this.pairings.get(e).expiry)) {
				await this.deletePairing(e);
				let { message: t } = U("EXPIRED", `pairing topic: ${e}`);
				throw Error(t);
			}
		}), this.core = e, this.logger = S(t, this.name), this.pairings = new sT(this.core, this.logger, this.name, this.storagePrefix);
	}
	get context() {
		return b(this.logger);
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
	registerRelayerEvents() {
		this.core.relayer.on(ax.message, async (e) => {
			let { topic: t, message: n, transportType: r } = e;
			if (this.pairings.keys.includes(t) && r !== G.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(n))) try {
				let e = await this.core.crypto.decode(t, n);
				Nb(e) ? (this.core.history.set(t, e), await this.onRelayEventRequest({
					topic: t,
					payload: e
				})) : Pb(e) && (await this.core.history.resolve(e), await this.onRelayEventResponse({
					topic: t,
					payload: e
				}), this.core.history.delete(t, e.id)), await this.core.relayer.messages.ack(t, n);
			} catch (e) {
				this.logger.error(e);
			}
		});
	}
	registerExpirerEvents() {
		this.core.expirer.on(vx.expired, async (e) => {
			let { topic: t } = qd(e.target);
			t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit(mx.expire, { topic: t }));
		});
	}
}, dT = Object.defineProperty, fT = (e, t, n) => t in e ? dT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, pT = (e, t, n) => fT(e, typeof t == "symbol" ? t : t + "", n), mT = class extends $t {
	constructor(e, t) {
		super(e, t), this.core = e, this.logger = t, pT(this, "records", /* @__PURE__ */ new Map()), pT(this, "events", new We.EventEmitter()), pT(this, "name", gx), pT(this, "version", "0.3"), pT(this, "cached", []), pT(this, "initialized", !1), pT(this, "storagePrefix", Jb), pT(this, "init", async () => {
			this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((e) => this.records.set(e.id, e)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
		}), pT(this, "set", (e, t, n) => {
			if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({
				type: "method",
				method: "set",
				topic: e,
				request: t,
				chainId: n
			}), this.records.has(t.id)) return;
			let r = {
				id: t.id,
				topic: e,
				request: {
					method: t.method,
					params: t.params || null
				},
				chainId: n,
				expiry: Jd(L.THIRTY_DAYS)
			};
			this.records.set(r.id, r), this.persist(), this.events.emit(hx.created, r);
		}), pT(this, "resolve", async (e) => {
			if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({
				type: "method",
				method: "update",
				response: e
			}), !this.records.has(e.id)) return;
			let t = await this.getRecord(e.id);
			typeof t.response > "u" && (t.response = Ib(e) ? { error: e.error } : { result: e.result }, this.records.set(t.id, t), this.persist(), this.events.emit(hx.updated, t));
		}), pT(this, "get", async (e, t) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({
			type: "method",
			method: "get",
			topic: e,
			id: t
		}), await this.getRecord(t))), pT(this, "delete", (e, t) => {
			this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({
				type: "method",
				method: "delete",
				id: t
			}), this.values.forEach((n) => {
				if (n.topic === e) {
					if (typeof t < "u" && n.id !== t) return;
					this.records.delete(n.id), this.events.emit(hx.deleted, n);
				}
			}), this.persist();
		}), pT(this, "exists", async (e, t) => (this.isInitialized(), this.records.has(t) ? (await this.getRecord(t)).topic === e : !1)), pT(this, "on", (e, t) => {
			this.events.on(e, t);
		}), pT(this, "once", (e, t) => {
			this.events.once(e, t);
		}), pT(this, "off", (e, t) => {
			this.events.off(e, t);
		}), pT(this, "removeListener", (e, t) => {
			this.events.removeListener(e, t);
		}), this.logger = S(t, this.name);
	}
	get context() {
		return b(this.logger);
	}
	get storageKey() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
	}
	get size() {
		return this.records.size;
	}
	get keys() {
		return Array.from(this.records.keys());
	}
	get values() {
		return Array.from(this.records.values());
	}
	get pending() {
		let e = [];
		return this.values.forEach((t) => {
			if (typeof t.response < "u") return;
			let n = {
				topic: t.topic,
				request: fb(t.request.method, t.request.params, t.id),
				chainId: t.chainId
			};
			return e.push(n);
		}), e;
	}
	async setJsonRpcRecords(e) {
		await this.core.storage.setItem(this.storageKey, e);
	}
	async getJsonRpcRecords() {
		return await this.core.storage.getItem(this.storageKey);
	}
	getRecord(e) {
		this.isInitialized();
		let t = this.records.get(e);
		if (!t) {
			let { message: t } = U("NO_MATCHING_KEY", `${this.name}: ${e}`);
			throw Error(t);
		}
		return t;
	}
	async persist() {
		await this.setJsonRpcRecords(this.values), this.events.emit(hx.sync);
	}
	async restore() {
		try {
			let e = await this.getJsonRpcRecords();
			if (typeof e > "u" || !e.length) return;
			if (this.records.size) {
				let { message: e } = U("RESTORE_WILL_OVERRIDE", this.name);
				throw this.logger.error(e), Error(e);
			}
			this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
				type: "method",
				method: "restore",
				records: this.values
			});
		} catch (e) {
			this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
		}
	}
	registerEventListeners() {
		this.events.on(hx.created, (e) => {
			let t = hx.created;
			this.logger.info(`Emitting ${t}`), this.logger.debug({
				type: "event",
				event: t,
				record: e
			});
		}), this.events.on(hx.updated, (e) => {
			let t = hx.updated;
			this.logger.info(`Emitting ${t}`), this.logger.debug({
				type: "event",
				event: t,
				record: e
			});
		}), this.events.on(hx.deleted, (e) => {
			let t = hx.deleted;
			this.logger.info(`Emitting ${t}`), this.logger.debug({
				type: "event",
				event: t,
				record: e
			});
		}), this.core.heartbeat.on(qe.pulse, () => {
			this.cleanup();
		});
	}
	cleanup() {
		try {
			this.isInitialized();
			let e = !1;
			this.records.forEach((t) => {
				(0, L.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(hx.deleted, t, !1), e = !0);
			}), e && this.persist();
		} catch (e) {
			this.logger.warn(e);
		}
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
}, hT = Object.defineProperty, gT = (e, t, n) => t in e ? hT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, _T = (e, t, n) => gT(e, typeof t == "symbol" ? t : t + "", n), vT = class extends on {
	constructor(e, t) {
		super(e, t), this.core = e, this.logger = t, _T(this, "expirations", /* @__PURE__ */ new Map()), _T(this, "events", new We.EventEmitter()), _T(this, "name", _x), _T(this, "version", "0.3"), _T(this, "cached", []), _T(this, "initialized", !1), _T(this, "storagePrefix", Jb), _T(this, "init", async () => {
			this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((e) => this.expirations.set(e.target, e)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
		}), _T(this, "has", (e) => {
			try {
				let t = this.formatTarget(e);
				return typeof this.getExpiration(t) < "u";
			} catch {
				return !1;
			}
		}), _T(this, "set", (e, t) => {
			this.isInitialized();
			let n = this.formatTarget(e), r = {
				target: n,
				expiry: t
			};
			this.expirations.set(n, r), this.checkExpiry(n, r), this.events.emit(vx.created, {
				target: n,
				expiration: r
			});
		}), _T(this, "get", (e) => {
			this.isInitialized();
			let t = this.formatTarget(e);
			return this.getExpiration(t);
		}), _T(this, "del", (e) => {
			if (this.isInitialized(), this.has(e)) {
				let t = this.formatTarget(e), n = this.getExpiration(t);
				this.expirations.delete(t), this.events.emit(vx.deleted, {
					target: t,
					expiration: n
				});
			}
		}), _T(this, "on", (e, t) => {
			this.events.on(e, t);
		}), _T(this, "once", (e, t) => {
			this.events.once(e, t);
		}), _T(this, "off", (e, t) => {
			this.events.off(e, t);
		}), _T(this, "removeListener", (e, t) => {
			this.events.removeListener(e, t);
		}), this.logger = S(t, this.name);
	}
	get context() {
		return b(this.logger);
	}
	get storageKey() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
	}
	get length() {
		return this.expirations.size;
	}
	get keys() {
		return Array.from(this.expirations.keys());
	}
	get values() {
		return Array.from(this.expirations.values());
	}
	formatTarget(e) {
		if (typeof e == "string") return Gd(e);
		if (typeof e == "number") return Kd(e);
		let { message: t } = U("UNKNOWN_TYPE", `Target type: ${typeof e}`);
		throw Error(t);
	}
	async setExpirations(e) {
		await this.core.storage.setItem(this.storageKey, e);
	}
	async getExpirations() {
		return await this.core.storage.getItem(this.storageKey);
	}
	async persist() {
		await this.setExpirations(this.values), this.events.emit(vx.sync);
	}
	async restore() {
		try {
			let e = await this.getExpirations();
			if (typeof e > "u" || !e.length) return;
			if (this.expirations.size) {
				let { message: e } = U("RESTORE_WILL_OVERRIDE", this.name);
				throw this.logger.error(e), Error(e);
			}
			this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({
				type: "method",
				method: "restore",
				expirations: this.values
			});
		} catch (e) {
			this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
		}
	}
	getExpiration(e) {
		let t = this.expirations.get(e);
		if (!t) {
			let { message: t } = U("NO_MATCHING_KEY", `${this.name}: ${e}`);
			throw this.logger.warn(t), Error(t);
		}
		return t;
	}
	checkExpiry(e, t) {
		let { expiry: n } = t;
		(0, L.toMiliseconds)(n) - Date.now() <= 0 && this.expire(e, t);
	}
	expire(e, t) {
		this.expirations.delete(e), this.events.emit(vx.expired, {
			target: e,
			expiration: t
		});
	}
	checkExpirations() {
		this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
	}
	registerEventListeners() {
		this.core.heartbeat.on(qe.pulse, () => this.checkExpirations()), this.events.on(vx.created, (e) => {
			let t = vx.created;
			this.logger.info(`Emitting ${t}`), this.logger.debug({
				type: "event",
				event: t,
				data: e
			}), this.persist();
		}), this.events.on(vx.expired, (e) => {
			let t = vx.expired;
			this.logger.info(`Emitting ${t}`), this.logger.debug({
				type: "event",
				event: t,
				data: e
			}), this.persist();
		}), this.events.on(vx.deleted, (e) => {
			let t = vx.deleted;
			this.logger.info(`Emitting ${t}`), this.logger.debug({
				type: "event",
				event: t,
				data: e
			}), this.persist();
		});
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
}, yT = Object.defineProperty, bT = (e, t, n) => t in e ? yT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, xT = (e, t, n) => bT(e, typeof t == "symbol" ? t : t + "", n), ST = class extends sn {
	constructor(e, t, n) {
		super(e, t, n), this.core = e, this.logger = t, this.store = n, xT(this, "name", yx), xT(this, "abortController"), xT(this, "isDevEnv"), xT(this, "verifyUrlV3", Sx), xT(this, "storagePrefix", Jb), xT(this, "version", 2), xT(this, "publicKey"), xT(this, "fetchPromise"), xT(this, "init", async () => {
			this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, L.toMiliseconds)(this.publicKey?.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
		}), xT(this, "register", async (e) => {
			if (!kd() || this.isDevEnv) return;
			let t = window.location.origin, { id: n, decryptedId: r } = e, i = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${t}&id=${n}&decryptedId=${r}`;
			try {
				let e = (0, cd.getDocument)(), t = this.startAbortTimer(L.ONE_SECOND * 5), r = await new Promise((r, a) => {
					let o = () => {
						window.removeEventListener("message", c), e.body.removeChild(s), a("attestation aborted");
					};
					this.abortController.signal.addEventListener("abort", o);
					let s = e.createElement("iframe");
					s.src = i, s.style.display = "none", s.addEventListener("error", o, { signal: this.abortController.signal });
					let c = (i) => {
						if (i.data && typeof i.data == "string") try {
							let a = JSON.parse(i.data);
							if (a.type === "verify_attestation") {
								if (So(a.attestation).payload.id !== n) return;
								clearInterval(t), e.body.removeChild(s), this.abortController.signal.removeEventListener("abort", o), window.removeEventListener("message", c), r(a.attestation === null ? "" : a.attestation);
							}
						} catch (e) {
							this.logger.warn(e);
						}
					};
					e.body.appendChild(s), window.addEventListener("message", c, { signal: this.abortController.signal });
				});
				return this.logger.debug("jwt attestation", r), r;
			} catch (e) {
				this.logger.warn(e);
			}
			return "";
		}), xT(this, "resolve", async (e) => {
			if (this.isDevEnv) return "";
			let { attestationId: t, hash: n, encryptedId: r } = e;
			if (t === "") {
				this.logger.debug("resolve: attestationId is empty, skipping");
				return;
			}
			if (t) {
				if (So(t).payload.id !== r) return;
				let e = await this.isValidJwtAttestation(t);
				if (e) {
					if (!e.isVerified) {
						this.logger.warn("resolve: jwt attestation: origin url not verified");
						return;
					}
					return e;
				}
			}
			if (!n) return;
			let i = this.getVerifyUrl(e?.verifyUrl);
			return this.fetchAttestation(n, i);
		}), xT(this, "fetchAttestation", async (e, t) => {
			this.logger.debug(`resolving attestation: ${e} from url: ${t}`);
			let n = this.startAbortTimer(L.ONE_SECOND * 5), r = await fetch(`${t}/attestation/${e}?v2Supported=true`, { signal: this.abortController.signal });
			return clearTimeout(n), r.status === 200 ? await r.json() : void 0;
		}), xT(this, "getVerifyUrl", (e) => {
			let t = e || "https://verify.walletconnect.org";
			return Cx.includes(t) || (this.logger.info(`verify url: ${t}, not included in trusted list, assigning default: https://verify.walletconnect.org`), t = "https://verify.walletconnect.org"), t;
		}), xT(this, "fetchPublicKey", async () => {
			try {
				this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
				let e = this.startAbortTimer(L.FIVE_SECONDS), t = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
				return clearTimeout(e), await t.json();
			} catch (e) {
				this.logger.warn(e);
			}
		}), xT(this, "persistPublicKey", async (e) => {
			this.logger.debug("persisting public key to local storage", e), await this.store.setItem(this.storeKey, e), this.publicKey = e;
		}), xT(this, "removePublicKey", async () => {
			this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
		}), xT(this, "isValidJwtAttestation", async (e) => {
			let t = await this.getPublicKey();
			try {
				if (t) return this.validateAttestation(e, t);
			} catch (e) {
				this.logger.error(e), this.logger.warn("error validating attestation");
			}
			let n = await this.fetchAndPersistPublicKey();
			try {
				if (n) return this.validateAttestation(e, n);
			} catch (e) {
				this.logger.error(e), this.logger.warn("error validating attestation");
			}
		}), xT(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), xT(this, "fetchAndPersistPublicKey", async () => {
			if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
			this.fetchPromise = new Promise(async (e) => {
				let t = await this.fetchPublicKey();
				t && (await this.persistPublicKey(t), e(t));
			});
			let e = await this.fetchPromise;
			return this.fetchPromise = void 0, e;
		}), xT(this, "validateAttestation", (e, t) => {
			let n = lv(e, t.publicKey), r = {
				hasExpired: (0, L.toMiliseconds)(n.exp) < Date.now(),
				payload: n
			};
			if (r.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), /* @__PURE__ */ Error("JWT attestation expired");
			return {
				origin: r.payload.origin,
				isScam: r.payload.isScam,
				isVerified: r.payload.isVerified
			};
		}), this.logger = S(t, this.name), this.abortController = new AbortController(), this.isDevEnv = rf(), this.init();
	}
	get storeKey() {
		return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
	}
	get context() {
		return b(this.logger);
	}
	startAbortTimer(e) {
		return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, L.toMiliseconds)(e));
	}
}, CT = Object.defineProperty, wT = (e, t, n) => t in e ? CT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, TT = (e, t, n) => wT(e, typeof t == "symbol" ? t : t + "", n), ET = class extends cn {
	constructor(e, t) {
		super(e, t), this.projectId = e, this.logger = t, TT(this, "context", wx), TT(this, "registerDeviceToken", async (e) => {
			let { clientId: t, token: n, notificationType: r, enableEncrypted: i = !1 } = e, a = `${Tx}/${this.projectId}/clients`;
			await fetch(a, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					client_id: t,
					type: r,
					token: n,
					always_raw: i
				})
			});
		}), this.logger = S(t, this.context);
	}
}, DT = Object.defineProperty, OT = Object.getOwnPropertySymbols, kT = Object.prototype.hasOwnProperty, AT = Object.prototype.propertyIsEnumerable, jT = (e, t, n) => t in e ? DT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, MT = (e, t) => {
	for (var n in t || (t = {})) kT.call(t, n) && jT(e, n, t[n]);
	if (OT) for (var n of OT(t)) AT.call(t, n) && jT(e, n, t[n]);
	return e;
}, NT = (e, t, n) => jT(e, typeof t == "symbol" ? t : t + "", n), PT = class extends ln {
	constructor(e, t, n = !0) {
		super(e, t, n), this.core = e, this.logger = t, NT(this, "context", Nx), NT(this, "storagePrefix", Jb), NT(this, "storageVersion", Mx), NT(this, "events", /* @__PURE__ */ new Map()), NT(this, "shouldPersist", !1), NT(this, "init", async () => {
			if (!rf()) try {
				let e = {
					eventId: nf(),
					timestamp: Date.now(),
					domain: this.getAppDomain(),
					props: {
						event: "INIT",
						type: "",
						properties: {
							client_id: await this.core.crypto.getClientId(),
							user_agent: Ld(this.core.relayer.protocol, this.core.relayer.version, sx)
						}
					}
				};
				await this.sendEvent([e]);
			} catch (e) {
				this.logger.warn(e);
			}
		}), NT(this, "createEvent", (e) => {
			let { event: t = "ERROR", type: n = "", properties: { topic: r, trace: i } } = e, a = nf(), o = this.core.projectId || "", s = MT({
				eventId: a,
				timestamp: Date.now(),
				props: {
					event: t,
					type: n,
					properties: {
						topic: r,
						trace: i
					}
				},
				bundleId: o,
				domain: this.getAppDomain()
			}, this.setMethods(a));
			return this.telemetryEnabled && (this.events.set(a, s), this.shouldPersist = !0), s;
		}), NT(this, "getEvent", (e) => {
			let { eventId: t, topic: n } = e;
			if (t) return this.events.get(t);
			let r = Array.from(this.events.values()).find((e) => e.props.properties.topic === n);
			if (r) return MT(MT({}, r), this.setMethods(r.eventId));
		}), NT(this, "deleteEvent", (e) => {
			let { eventId: t } = e;
			this.events.delete(t), this.shouldPersist = !0;
		}), NT(this, "setEventListeners", () => {
			this.core.heartbeat.on(qe.pulse, async () => {
				this.shouldPersist && await this.persist(), this.events.forEach((e) => {
					(0, L.fromMiliseconds)(Date.now()) - (0, L.fromMiliseconds)(e.timestamp) > 86400 && (this.events.delete(e.eventId), this.shouldPersist = !0);
				});
			});
		}), NT(this, "setMethods", (e) => ({
			addTrace: (t) => this.addTrace(e, t),
			setError: (t) => this.setError(e, t)
		})), NT(this, "addTrace", (e, t) => {
			let n = this.events.get(e);
			n && (n.props.properties.trace.push(t), this.events.set(e, n), this.shouldPersist = !0);
		}), NT(this, "setError", (e, t) => {
			let n = this.events.get(e);
			n && (n.props.type = t, n.timestamp = Date.now(), this.events.set(e, n), this.shouldPersist = !0);
		}), NT(this, "persist", async () => {
			await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
		}), NT(this, "restore", async () => {
			try {
				let e = await this.core.storage.getItem(this.storageKey) || [];
				if (!e.length) return;
				e.forEach((e) => {
					this.events.set(e.eventId, MT(MT({}, e), this.setMethods(e.eventId)));
				});
			} catch (e) {
				this.logger.warn(e);
			}
		}), NT(this, "submit", async () => {
			if (!this.telemetryEnabled || this.events.size === 0) return;
			let e = [];
			for (let [t, n] of this.events) n.props.type && e.push(n);
			if (e.length !== 0) try {
				if ((await this.sendEvent(e)).ok) for (let t of e) this.events.delete(t.eventId), this.shouldPersist = !0;
			} catch (e) {
				this.logger.warn(e);
			}
		}), NT(this, "sendEvent", async (e) => {
			let t = this.getAppDomain() ? "" : "&sp=desktop";
			return await fetch(`${Px}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${sx}${t}`, {
				method: "POST",
				body: JSON.stringify(e)
			});
		}), NT(this, "getAppDomain", () => Pd().url), this.logger = S(t, this.context), this.telemetryEnabled = n, n ? this.restore().then(async () => {
			await this.submit(), this.setEventListeners();
		}) : this.persist();
	}
	get storageKey() {
		return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
	}
}, FT = Object.defineProperty, IT = Object.getOwnPropertySymbols, LT = Object.prototype.hasOwnProperty, RT = Object.prototype.propertyIsEnumerable, zT = (e, t, n) => t in e ? FT(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, BT = (e, t) => {
	for (var n in t || (t = {})) LT.call(t, n) && zT(e, n, t[n]);
	if (IT) for (var n of IT(t)) RT.call(t, n) && zT(e, n, t[n]);
	return e;
}, Y = (e, t, n) => zT(e, typeof t == "symbol" ? t : t + "", n), VT = class e extends Yt {
	constructor(e) {
		var t;
		super(e), Y(this, "protocol", "wc"), Y(this, "version", 2), Y(this, "name", qb), Y(this, "relayUrl"), Y(this, "projectId"), Y(this, "customStoragePrefix"), Y(this, "events", new We.EventEmitter()), Y(this, "logger"), Y(this, "heartbeat"), Y(this, "relayer"), Y(this, "crypto"), Y(this, "storage"), Y(this, "history"), Y(this, "expirer"), Y(this, "pairing"), Y(this, "verify"), Y(this, "echoClient"), Y(this, "linkModeSupportedApps"), Y(this, "eventClient"), Y(this, "initialized", !1), Y(this, "logChunkController"), Y(this, "on", (e, t) => this.events.on(e, t)), Y(this, "once", (e, t) => this.events.once(e, t)), Y(this, "off", (e, t) => this.events.off(e, t)), Y(this, "removeListener", (e, t) => this.events.removeListener(e, t)), Y(this, "dispatchEnvelope", ({ topic: e, message: t, sessionExists: n }) => {
			if (!e || !t) return;
			let r = {
				topic: e,
				message: t,
				publishedAt: Date.now(),
				transportType: G.link_mode
			};
			this.relayer.onLinkMessageEvent(r, { sessionExists: n });
		});
		let n = this.getGlobalCore(e?.customStoragePrefix);
		if (n) try {
			return this.customStoragePrefix = n.customStoragePrefix, this.logger = n.logger, this.heartbeat = n.heartbeat, this.crypto = n.crypto, this.history = n.history, this.expirer = n.expirer, this.storage = n.storage, this.relayer = n.relayer, this.pairing = n.pairing, this.verify = n.verify, this.echoClient = n.echoClient, this.linkModeSupportedApps = n.linkModeSupportedApps, this.eventClient = n.eventClient, this.initialized = n.initialized, this.logChunkController = n.logChunkController, n;
		} catch (e) {
			console.warn("Failed to copy global core", e);
		}
		this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || "wss://relay.walletconnect.org", this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
		let { logger: r, chunkLoggerController: i } = E({
			opts: x({
				level: typeof e?.logger == "string" && e.logger ? e.logger : Yb.logger,
				name: qb
			}),
			maxSizeInBytes: e?.maxLogBlobSizeInBytes,
			loggerOverride: e?.logger
		});
		this.logChunkController = i, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
			var e, t;
			(e = this.logChunkController) != null && e.downloadLogsBlobInBrowser && ((t = this.logChunkController) == null || t.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
		}), this.logger = S(r, this.name), this.heartbeat = new Je(), this.crypto = new kC(this, this.logger, e?.keychain), this.history = new mT(this, this.logger), this.expirer = new vT(this, this.logger), this.storage = e != null && e.storage ? e.storage : new Gt(BT(BT({}, Xb), e?.storageOptions)), this.relayer = new vw({
			core: this,
			logger: this.logger,
			relayUrl: this.relayUrl,
			projectId: this.projectId
		}), this.pairing = new uT(this, this.logger), this.verify = new ST(this, this.logger, this.storage), this.echoClient = new ET(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new PT(this, this.logger, e?.telemetryEnabled), this.setGlobalCore(this);
	}
	static async init(t) {
		let n = new e(t);
		await n.initialize();
		let r = await n.crypto.getClientId();
		return await n.storage.setItem(lx, r), n;
	}
	get context() {
		return b(this.logger);
	}
	async start() {
		this.initialized || await this.initialize();
	}
	async getLogsBlob() {
		return this.logChunkController?.logsToBlob({ clientId: await this.crypto.getClientId() });
	}
	async addLinkModeSupportedApp(e) {
		this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem("WALLETCONNECT_LINK_MODE_APPS", this.linkModeSupportedApps));
	}
	async initialize() {
		this.logger.trace("Initialized");
		try {
			await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem("WALLETCONNECT_LINK_MODE_APPS") || [], this.initialized = !0, this.logger.info("Core Initialization Success");
		} catch (e) {
			throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
		}
	}
	getGlobalCore(e = "") {
		try {
			if (this.isGlobalCoreDisabled()) return;
			let t = `_walletConnectCore_${e}`, n = `${t}_count`;
			return globalThis[n] = (globalThis[n] || 0) + 1, globalThis[n] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[n]} times.`), globalThis[t];
		} catch (e) {
			console.warn("Failed to get global WalletConnect core", e);
			return;
		}
	}
	setGlobalCore(e) {
		try {
			if (this.isGlobalCoreDisabled()) return;
			let t = `_walletConnectCore_${e.opts?.customStoragePrefix || ""}`;
			globalThis[t] = e;
		} catch (e) {
			console.warn("Failed to set global WalletConnect core", e);
		}
	}
	isGlobalCoreDisabled() {
		try {
			return typeof process < "u" && process.env.DISABLE_GLOBAL_CORE === "true";
		} catch {
			return !0;
		}
	}
}, HT = "client", UT = `wc@2:${HT}:`, WT = {
	name: HT,
	logger: "error",
	controller: !1,
	relayUrl: "wss://relay.walletconnect.org"
}, GT = "WALLETCONNECT_DEEPLINK_CHOICE", KT = "proposal";
L.THIRTY_DAYS;
//#endregion
//#region node_modules/@walletconnect/sign-client/dist/index.es.js
var qT = "Proposal expired", JT = "session", YT = L.SEVEN_DAYS, XT = "engine", ZT = {
	wc_sessionPropose: {
		req: {
			ttl: L.FIVE_MINUTES,
			prompt: !0,
			tag: 1100
		},
		res: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1101
		},
		reject: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1120
		},
		autoReject: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1121
		}
	},
	wc_sessionSettle: {
		req: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1102
		},
		res: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1103
		}
	},
	wc_sessionUpdate: {
		req: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1104
		},
		res: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1105
		}
	},
	wc_sessionExtend: {
		req: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1106
		},
		res: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1107
		}
	},
	wc_sessionRequest: {
		req: {
			ttl: L.FIVE_MINUTES,
			prompt: !0,
			tag: 1108
		},
		res: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1109
		}
	},
	wc_sessionEvent: {
		req: {
			ttl: L.FIVE_MINUTES,
			prompt: !0,
			tag: 1110
		},
		res: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1111
		}
	},
	wc_sessionDelete: {
		req: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1112
		},
		res: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1113
		}
	},
	wc_sessionPing: {
		req: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1114
		},
		res: {
			ttl: L.ONE_DAY,
			prompt: !1,
			tag: 1115
		}
	},
	wc_sessionAuthenticate: {
		req: {
			ttl: L.ONE_HOUR,
			prompt: !0,
			tag: 1116
		},
		res: {
			ttl: L.ONE_HOUR,
			prompt: !1,
			tag: 1117
		},
		reject: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1118
		},
		autoReject: {
			ttl: L.FIVE_MINUTES,
			prompt: !1,
			tag: 1119
		}
	}
}, QT = {
	min: L.FIVE_MINUTES,
	max: L.SEVEN_DAYS
}, $T = {
	idle: "IDLE",
	active: "ACTIVE"
}, eE = {
	eth_sendTransaction: { key: "" },
	eth_sendRawTransaction: { key: "" },
	wallet_sendCalls: { key: "" },
	solana_signTransaction: { key: "signature" },
	solana_signAllTransactions: { key: "transactions" },
	solana_signAndSendTransaction: { key: "signature" },
	sui_signAndExecuteTransaction: { key: "digest" },
	sui_signTransaction: { key: "" },
	hedera_signAndExecuteTransaction: { key: "transactionId" },
	hedera_executeTransaction: { key: "transactionId" },
	near_signTransaction: { key: "" },
	near_signTransactions: { key: "" },
	tron_signTransaction: { key: "txID" },
	xrpl_signTransaction: { key: "" },
	xrpl_signTransactionFor: { key: "" },
	algo_signTxn: { key: "" },
	sendTransfer: { key: "txid" },
	stacks_stxTransfer: { key: "txId" },
	polkadot_signTransaction: { key: "" },
	cosmos_signDirect: { key: "" }
}, tE = "request", nE = [
	"wc_sessionPropose",
	"wc_sessionRequest",
	"wc_authRequest",
	"wc_sessionAuthenticate"
], rE = "auth", iE = "authKeys", aE = "pairingTopics", oE = "requests", sE = `wc@1.5:${rE}:`, cE = `${sE}:PUB_KEY`, lE = Object.defineProperty, uE = Object.defineProperties, dE = Object.getOwnPropertyDescriptors, fE = Object.getOwnPropertySymbols, pE = Object.prototype.hasOwnProperty, mE = Object.prototype.propertyIsEnumerable, hE = (e, t, n) => t in e ? lE(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, X = (e, t) => {
	for (var n in t || (t = {})) pE.call(t, n) && hE(e, n, t[n]);
	if (fE) for (var n of fE(t)) mE.call(t, n) && hE(e, n, t[n]);
	return e;
}, gE = (e, t) => uE(e, dE(t)), Z = (e, t, n) => hE(e, typeof t == "symbol" ? t : t + "", n), _E = class extends mn {
	constructor(e) {
		super(e), Z(this, "name", XT), Z(this, "events", new We.default()), Z(this, "initialized", !1), Z(this, "requestQueue", {
			state: $T.idle,
			queue: []
		}), Z(this, "sessionRequestQueue", {
			state: $T.idle,
			queue: []
		}), Z(this, "emittedSessionRequests", new uf({ limit: 500 })), Z(this, "requestQueueDelay", L.ONE_SECOND), Z(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), Z(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), Z(this, "recentlyDeletedLimit", 200), Z(this, "relayMessageCache", []), Z(this, "pendingSessions", /* @__PURE__ */ new Map()), Z(this, "init", async () => {
			this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(ZT) }), this.initialized = !0, setTimeout(async () => {
				await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
			}, (0, L.toMiliseconds)(this.requestQueueDelay)));
		}), Z(this, "connect", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow();
			let t = gE(X({}, e), {
				requiredNamespaces: e.requiredNamespaces || {},
				optionalNamespaces: e.optionalNamespaces || {}
			});
			await this.isValidConnect(t), t.optionalNamespaces = Iv(t.requiredNamespaces, t.optionalNamespaces), t.requiredNamespaces = {};
			let { pairingTopic: n, requiredNamespaces: r, optionalNamespaces: i, sessionProperties: a, scopedProperties: o, relays: s } = t, c = n, l, u = !1;
			try {
				if (c) {
					let e = this.client.core.pairing.pairings.get(c);
					this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), u = e.active;
				}
			} catch (e) {
				throw this.client.logger.error(`connect() -> pairing.get(${c}) failed`), e;
			}
			if (!c || !u) {
				let { topic: e, uri: t } = await this.client.core.pairing.create({ internal: { skipSubscribe: !0 } });
				c = e, l = t;
			}
			if (!c) {
				let { message: e } = U("NO_MATCHING_KEY", `connect() pairing topic: ${c}`);
				throw Error(e);
			}
			let d = await this.client.core.crypto.generateKeyPair(), f = ZT.wc_sessionPropose.req.ttl || L.FIVE_MINUTES, p = Jd(f), m = gE(X(X({
				requiredNamespaces: r,
				optionalNamespaces: i,
				relays: s ?? [{ protocol: "irn" }],
				proposer: {
					publicKey: d,
					metadata: this.client.metadata
				},
				expiryTimestamp: p,
				pairingTopic: c
			}, a && { sessionProperties: a }), o && { scopedProperties: o }), { id: ub() }), h = B("session_connect", m.id), { reject: g, resolve: _, done: v } = Hd(f, qT), y = ({ id: e }) => {
				e === m.id && (this.client.events.off("proposal_expire", y), this.pendingSessions.delete(m.id), this.events.emit(h, { error: {
					message: "Proposal expired",
					code: 0
				} }));
			};
			return this.client.events.on("proposal_expire", y), this.events.once(h, ({ error: e, session: t }) => {
				this.client.events.off("proposal_expire", y), e ? g(e) : t && _(t);
			}), await this.sendProposeSession({
				proposal: m,
				publishOpts: {
					internal: { throwOnFailedPublish: !0 },
					tvf: { correlationId: m.id }
				}
			}), await this.setProposal(m.id, m), {
				uri: l,
				approval: v
			};
		}), Z(this, "pair", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow();
			try {
				return await this.client.core.pairing.pair(e);
			} catch (e) {
				throw this.client.logger.error("pair() failed"), e;
			}
		}), Z(this, "approve", async (e) => {
			let t = this.client.core.eventClient.createEvent({ properties: {
				topic: (e?.id)?.toString(),
				trace: [Ox.session_approve_started]
			} });
			try {
				this.isInitialized(), await this.confirmOnlineStateOrThrow();
			} catch (e) {
				throw t.setError(kx.no_internet_connection), e;
			}
			try {
				await this.isValidProposalId(e?.id);
			} catch (n) {
				throw this.client.logger.error(`approve() -> proposal.get(${e?.id}) failed`), t.setError(kx.proposal_not_found), n;
			}
			try {
				await this.isValidApprove(e);
			} catch (e) {
				throw this.client.logger.error("approve() -> isValidApprove() failed"), t.setError(kx.session_approve_namespace_validation_failure), e;
			}
			let { id: n, relayProtocol: r, namespaces: i, sessionProperties: a, scopedProperties: o, sessionConfig: s } = e, c = this.client.proposal.get(n);
			this.client.core.eventClient.deleteEvent({ eventId: t.eventId });
			let { pairingTopic: l, proposer: u, requiredNamespaces: d, optionalNamespaces: f } = c, p = this.client.core.eventClient?.getEvent({ topic: l });
			p || (p = this.client.core.eventClient?.createEvent({
				type: Ox.session_approve_started,
				properties: {
					topic: l,
					trace: [Ox.session_approve_started, Ox.session_namespaces_validation_success]
				}
			}));
			let m = await this.client.core.crypto.generateKeyPair(), h = u.publicKey, g = await this.client.core.crypto.generateSharedKey(m, h), _ = X(X(X({
				relay: { protocol: r ?? "irn" },
				namespaces: i,
				controller: {
					publicKey: m,
					metadata: this.client.metadata
				},
				expiry: Jd(YT)
			}, a && { sessionProperties: a }), o && { scopedProperties: o }), s && { sessionConfig: s }), v = G.relay;
			p.addTrace(Ox.subscribing_session_topic);
			try {
				await this.client.core.relayer.subscribe(g, {
					transportType: v,
					internal: { skipSubscribe: !0 }
				});
			} catch (e) {
				throw p.setError(kx.subscribe_session_topic_failure), e;
			}
			p.addTrace(Ox.subscribe_session_topic_success);
			let y = gE(X({}, _), {
				topic: g,
				requiredNamespaces: d,
				optionalNamespaces: f,
				pairingTopic: l,
				acknowledged: !1,
				self: _.controller,
				peer: {
					publicKey: u.publicKey,
					metadata: u.metadata
				},
				controller: m,
				transportType: G.relay
			});
			await this.client.session.set(g, y), p.addTrace(Ox.store_session);
			try {
				await this.sendApproveSession({
					sessionTopic: g,
					proposal: c,
					pairingProposalResponse: {
						relay: { protocol: r ?? "irn" },
						responderPublicKey: m
					},
					sessionSettleRequest: _,
					publishOpts: {
						internal: { throwOnFailedPublish: !0 },
						tvf: { correlationId: n }
					}
				}), p.addTrace(Ox.session_approve_publish_success);
			} catch (e) {
				throw this.client.logger.error(e), this.client.session.delete(g, W("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(g), e;
			}
			return this.client.core.eventClient.deleteEvent({ eventId: p.eventId }), await this.client.core.pairing.updateMetadata({
				topic: l,
				metadata: u.metadata
			}), await this.deleteProposal(n), await this.client.core.pairing.activate({ topic: l }), await this.setExpiry(g, Jd(YT)), {
				topic: g,
				acknowledged: () => Promise.resolve(this.client.session.get(g))
			};
		}), Z(this, "reject", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow();
			try {
				await this.isValidReject(e);
			} catch (e) {
				throw this.client.logger.error("reject() -> isValidReject() failed"), e;
			}
			let { id: t, reason: n } = e, r;
			try {
				r = this.client.proposal.get(t).pairingTopic;
			} catch (e) {
				throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), e;
			}
			r && await this.sendError({
				id: t,
				topic: r,
				error: n,
				rpcOpts: ZT.wc_sessionPropose.reject
			}), await this.deleteProposal(t);
		}), Z(this, "update", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow();
			try {
				await this.isValidUpdate(e);
			} catch (e) {
				throw this.client.logger.error("update() -> isValidUpdate() failed"), e;
			}
			let { topic: t, namespaces: n } = e, { done: r, resolve: i, reject: a } = Hd(), o = ub(), s = db().toString(), c = this.client.session.get(t).namespaces;
			return this.events.once(B("session_update", o), ({ error: e }) => {
				e ? a(e) : i();
			}), await this.client.session.update(t, { namespaces: n }), await this.sendRequest({
				topic: t,
				method: "wc_sessionUpdate",
				params: { namespaces: n },
				throwOnFailedPublish: !0,
				clientRpcId: o,
				relayRpcId: s
			}).catch((e) => {
				this.client.logger.error(e), this.client.session.update(t, { namespaces: c }), a(e);
			}), { acknowledged: r };
		}), Z(this, "extend", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow();
			try {
				await this.isValidExtend(e);
			} catch (e) {
				throw this.client.logger.error("extend() -> isValidExtend() failed"), e;
			}
			let { topic: t } = e, n = ub(), { done: r, resolve: i, reject: a } = Hd();
			return this.events.once(B("session_extend", n), ({ error: e }) => {
				e ? a(e) : i();
			}), await this.setExpiry(t, Jd(YT)), this.sendRequest({
				topic: t,
				method: "wc_sessionExtend",
				params: {},
				clientRpcId: n,
				throwOnFailedPublish: !0
			}).catch((e) => {
				a(e);
			}), { acknowledged: r };
		}), Z(this, "request", async (e) => {
			this.isInitialized();
			try {
				await this.isValidRequest(e);
			} catch (e) {
				throw this.client.logger.error("request() -> isValidRequest() failed"), e;
			}
			let { chainId: t, request: n, topic: r, expiry: i = ZT.wc_sessionRequest.req.ttl } = e, a = this.client.session.get(r);
			a?.transportType === G.relay && await this.confirmOnlineStateOrThrow();
			let o = ub(), s = db().toString(), { done: c, resolve: l, reject: u } = Hd(i, "Request expired. Please try again.");
			this.events.once(B("session_request", o), ({ error: e, result: t }) => {
				e ? u(e) : l(t);
			});
			let d = "wc_sessionRequest", f = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
			if (f) return await this.sendRequest({
				clientRpcId: o,
				relayRpcId: s,
				topic: r,
				method: d,
				params: {
					request: gE(X({}, n), { expiryTimestamp: Jd(i) }),
					chainId: t
				},
				expiry: i,
				throwOnFailedPublish: !0,
				appLink: f
			}).catch((e) => u(e)), this.client.events.emit("session_request_sent", {
				topic: r,
				request: n,
				chainId: t,
				id: o
			}), await c();
			let p = {
				request: gE(X({}, n), { expiryTimestamp: Jd(i) }),
				chainId: t
			};
			return await Promise.all([
				new Promise(async (e) => {
					await this.sendRequest({
						clientRpcId: o,
						relayRpcId: s,
						topic: r,
						method: d,
						params: p,
						expiry: i,
						throwOnFailedPublish: !0,
						tvf: this.getTVFParams(o, p)
					}).catch((e) => u(e)), this.client.events.emit("session_request_sent", {
						topic: r,
						request: n,
						chainId: t,
						id: o
					}), e();
				}),
				new Promise(async (e) => {
					var t;
					(t = a.sessionConfig) != null && t.disableDeepLink || await Zd({
						id: o,
						topic: r,
						wcDeepLink: await ef(this.client.core.storage, GT)
					}), e();
				}),
				c()
			]).then((e) => e[2]);
		}), Z(this, "respond", async (e) => {
			this.isInitialized(), await this.isValidRespond(e);
			let { topic: t, response: n } = e, { id: r } = n, i = this.client.session.get(t);
			i.transportType === G.relay && await this.confirmOnlineStateOrThrow();
			let a = this.getAppLinkIfEnabled(i.peer.metadata, i.transportType);
			Fb(n) ? await this.sendResult({
				id: r,
				topic: t,
				result: n.result,
				throwOnFailedPublish: !0,
				appLink: a
			}) : Ib(n) && await this.sendError({
				id: r,
				topic: t,
				error: n.error,
				appLink: a
			}), this.cleanupAfterResponse(e);
		}), Z(this, "ping", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow();
			try {
				await this.isValidPing(e);
			} catch (e) {
				throw this.client.logger.error("ping() -> isValidPing() failed"), e;
			}
			let { topic: t } = e;
			if (this.client.session.keys.includes(t)) {
				let e = ub(), n = db().toString(), { done: r, resolve: i, reject: a } = Hd();
				this.events.once(B("session_ping", e), ({ error: e }) => {
					e ? a(e) : i();
				}), await Promise.all([this.sendRequest({
					topic: t,
					method: "wc_sessionPing",
					params: {},
					throwOnFailedPublish: !0,
					clientRpcId: e,
					relayRpcId: n
				}), r()]);
			} else this.client.core.pairing.pairings.keys.includes(t) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t }));
		}), Z(this, "emit", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e);
			let { topic: t, event: n, chainId: r } = e, i = db().toString(), a = ub();
			await this.sendRequest({
				topic: t,
				method: "wc_sessionEvent",
				params: {
					event: n,
					chainId: r
				},
				throwOnFailedPublish: !0,
				relayRpcId: i,
				clientRpcId: a
			});
		}), Z(this, "disconnect", async (e) => {
			this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e);
			let { topic: t } = e;
			if (this.client.session.keys.includes(t)) await this.sendRequest({
				topic: t,
				method: "wc_sessionDelete",
				params: W("USER_DISCONNECTED"),
				throwOnFailedPublish: !0
			}), await this.deleteSession({
				topic: t,
				emitEvent: !1
			});
			else if (this.client.core.pairing.pairings.keys.includes(t)) await this.client.core.pairing.disconnect({ topic: t });
			else {
				let { message: e } = U("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
				throw Error(e);
			}
		}), Z(this, "find", (e) => (this.isInitialized(), this.client.session.getAll().filter((t) => Wv(t, e)))), Z(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), Z(this, "authenticate", async (e, t) => {
			this.isInitialized(), this.isValidAuthenticate(e);
			let n = t && this.client.core.linkModeSupportedApps.includes(t) && this.client.metadata.redirect?.linkMode, r = n ? G.link_mode : G.relay;
			r === G.relay && await this.confirmOnlineStateOrThrow();
			let { chains: i, statement: a = "", uri: o, domain: s, nonce: c, type: l, exp: u, nbf: d, methods: f = [], expiry: p } = e, m = [...e.resources || []], { topic: h, uri: g } = await this.client.core.pairing.create({
				methods: ["wc_sessionAuthenticate"],
				transportType: r
			});
			this.client.logger.info({
				message: "Generated new pairing",
				pairing: {
					topic: h,
					uri: g
				}
			});
			let _ = await this.client.core.crypto.generateKeyPair(), v = K_(_);
			if (await Promise.all([this.client.auth.authKeys.set(cE, {
				responseTopic: v,
				publicKey: _
			}), this.client.auth.pairingTopics.set(v, {
				topic: v,
				pairingTopic: h
			})]), await this.client.core.relayer.subscribe(v, { transportType: r }), this.client.logger.info(`sending request to new pairing topic: ${h}`), f.length > 0) {
				let { namespace: e } = fd(i[0]), t = zm(e, "request", f);
				Km(m) && (t = Vm(t, m.pop())), m.push(t);
			}
			let y = p && p > ZT.wc_sessionAuthenticate.req.ttl ? p : ZT.wc_sessionAuthenticate.req.ttl, b = {
				authPayload: {
					type: l ?? "caip122",
					chains: i,
					statement: a,
					aud: o,
					domain: s,
					version: "1",
					nonce: c,
					iat: (/* @__PURE__ */ new Date()).toISOString(),
					exp: u,
					nbf: d,
					resources: m
				},
				requester: {
					publicKey: _,
					metadata: this.client.metadata
				},
				expiryTimestamp: Jd(y)
			}, x = {
				requiredNamespaces: {},
				optionalNamespaces: { eip155: {
					chains: i,
					methods: [...new Set(["personal_sign", ...f])],
					events: ["chainChanged", "accountsChanged"]
				} },
				relays: [{ protocol: "irn" }],
				pairingTopic: h,
				proposer: {
					publicKey: _,
					metadata: this.client.metadata
				},
				expiryTimestamp: Jd(ZT.wc_sessionPropose.req.ttl),
				id: ub()
			}, { done: S, resolve: C, reject: w } = Hd(y, "Request expired"), T = ub(), E = B("session_connect", x.id), D = B("session_request", T), O = async ({ error: e, session: t }) => {
				this.events.off(D, k), e ? w(e) : t && C({ session: t });
			}, k = async (e) => {
				var n, i, a;
				if (await this.deletePendingAuthRequest(T, {
					message: "fulfilled",
					code: 0
				}), e.error) {
					let t = W("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
					return e.error.code === t.code ? void 0 : (this.events.off(E, O), w(e.error.message));
				}
				await this.deleteProposal(x.id), this.events.off(E, O);
				let { cacaos: o, responder: s } = e.result, c = [], l = [];
				for (let e of o) {
					await Am({
						cacao: e,
						projectId: this.client.core.projectId
					}) || (this.client.logger.error(e, "Signature verification failed"), w(W("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
					let { p: t } = e, n = Km(t.resources), r = [Om(t.iss)], i = km(t.iss);
					if (n) {
						let e = Wm(n), t = Gm(n);
						c.push(...e), r.push(...t);
					}
					for (let e of r) l.push(`${e}:${i}`);
				}
				let u = await this.client.core.crypto.generateSharedKey(_, s.publicKey), d;
				c.length > 0 && (d = {
					topic: u,
					acknowledged: !0,
					self: {
						publicKey: _,
						metadata: this.client.metadata
					},
					peer: s,
					controller: s.publicKey,
					expiry: Jd(YT),
					requiredNamespaces: {},
					optionalNamespaces: {},
					relay: { protocol: "irn" },
					pairingTopic: h,
					namespaces: Fv([...new Set(c)], [...new Set(l)]),
					transportType: r
				}, await this.client.core.relayer.subscribe(u, { transportType: r }), await this.client.session.set(u, d), h && await this.client.core.pairing.updateMetadata({
					topic: h,
					metadata: s.metadata
				}), d = this.client.session.get(u)), (n = this.client.metadata.redirect) != null && n.linkMode && (i = s.metadata.redirect) != null && i.linkMode && (a = s.metadata.redirect) != null && a.universal && t && (this.client.core.addLinkModeSupportedApp(s.metadata.redirect.universal), this.client.session.update(u, { transportType: G.link_mode })), C({
					auths: o,
					session: d
				});
			};
			this.events.once(E, O), this.events.once(D, k);
			let A;
			try {
				if (n) {
					let e = fb("wc_sessionAuthenticate", b, T);
					this.client.core.history.set(h, e), A = _v(t, h, await this.client.core.crypto.encode("", e, {
						type: 2,
						encoding: L_
					}));
				} else await Promise.all([this.sendRequest({
					topic: h,
					method: "wc_sessionAuthenticate",
					params: b,
					expiry: e.expiry,
					throwOnFailedPublish: !0,
					clientRpcId: T
				}), this.sendRequest({
					topic: h,
					method: "wc_sessionPropose",
					params: x,
					expiry: ZT.wc_sessionPropose.req.ttl,
					throwOnFailedPublish: !0,
					clientRpcId: x.id
				})]);
			} catch (e) {
				throw this.events.off(E, O), this.events.off(D, k), e;
			}
			return await this.setProposal(x.id, x), await this.setAuthRequest(T, {
				request: gE(X({}, b), { verifyContext: {} }),
				pairingTopic: h,
				transportType: r
			}), {
				uri: A ?? g,
				response: S
			};
		}), Z(this, "approveSessionAuthenticate", async (e) => {
			let { id: t, auths: n } = e, r = this.client.core.eventClient.createEvent({ properties: {
				topic: t.toString(),
				trace: [Ax.authenticated_session_approve_started]
			} });
			try {
				this.isInitialized();
			} catch (e) {
				throw r.setError(jx.no_internet_connection), e;
			}
			let i = this.getPendingAuthRequest(t);
			if (!i) throw r.setError(jx.authenticated_session_pending_request_not_found), /* @__PURE__ */ Error(`Could not find pending auth request with id ${t}`);
			let a = i.transportType || G.relay;
			a === G.relay && await this.confirmOnlineStateOrThrow();
			let o = i.requester.publicKey, s = await this.client.core.crypto.generateKeyPair(), c = K_(o), l = {
				type: 1,
				receiverPublicKey: o,
				senderPublicKey: s
			}, u = [], d = [];
			for (let e of n) {
				if (!await Am({
					cacao: e,
					projectId: this.client.core.projectId
				})) {
					r.setError(jx.invalid_cacao);
					let e = W("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
					throw await this.sendError({
						id: t,
						topic: c,
						error: e,
						encodeOpts: l
					}), Error(e.message);
				}
				r.addTrace(Ax.cacaos_verified);
				let { p: n } = e, i = Km(n.resources), a = [Om(n.iss)], o = km(n.iss);
				if (i) {
					let e = Wm(i), t = Gm(i);
					u.push(...e), a.push(...t);
				}
				for (let e of a) d.push(`${e}:${o}`);
			}
			let f = await this.client.core.crypto.generateSharedKey(s, o);
			r.addTrace(Ax.create_authenticated_session_topic);
			let p;
			if (u?.length > 0) {
				p = {
					topic: f,
					acknowledged: !0,
					self: {
						publicKey: s,
						metadata: this.client.metadata
					},
					peer: {
						publicKey: o,
						metadata: i.requester.metadata
					},
					controller: o,
					expiry: Jd(YT),
					authentication: n,
					requiredNamespaces: {},
					optionalNamespaces: {},
					relay: { protocol: "irn" },
					pairingTopic: i.pairingTopic,
					namespaces: Fv([...new Set(u)], [...new Set(d)]),
					transportType: a
				}, r.addTrace(Ax.subscribing_authenticated_session_topic);
				try {
					await this.client.core.relayer.subscribe(f, { transportType: a });
				} catch (e) {
					throw r.setError(jx.subscribe_authenticated_session_topic_failure), e;
				}
				r.addTrace(Ax.subscribe_authenticated_session_topic_success), await this.client.session.set(f, p), r.addTrace(Ax.store_authenticated_session), await this.client.core.pairing.updateMetadata({
					topic: i.pairingTopic,
					metadata: i.requester.metadata
				});
			}
			r.addTrace(Ax.publishing_authenticated_session_approve);
			try {
				await this.sendResult({
					topic: c,
					id: t,
					result: {
						cacaos: n,
						responder: {
							publicKey: s,
							metadata: this.client.metadata
						}
					},
					encodeOpts: l,
					throwOnFailedPublish: !0,
					appLink: this.getAppLinkIfEnabled(i.requester.metadata, a)
				});
			} catch (e) {
				throw r.setError(jx.authenticated_session_approve_publish_failure), e;
			}
			return await this.client.auth.requests.delete(t, {
				message: "fulfilled",
				code: 0
			}), await this.client.core.pairing.activate({ topic: i.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: r.eventId }), { session: p };
		}), Z(this, "rejectSessionAuthenticate", async (e) => {
			this.isInitialized();
			let { id: t, reason: n } = e, r = this.getPendingAuthRequest(t);
			if (!r) throw Error(`Could not find pending auth request with id ${t}`);
			r.transportType === G.relay && await this.confirmOnlineStateOrThrow();
			let i = r.requester.publicKey, a = await this.client.core.crypto.generateKeyPair(), o = K_(i), s = {
				type: 1,
				receiverPublicKey: i,
				senderPublicKey: a
			};
			await this.sendError({
				id: t,
				topic: o,
				error: n,
				encodeOpts: s,
				rpcOpts: ZT.wc_sessionAuthenticate.reject,
				appLink: this.getAppLinkIfEnabled(r.requester.metadata, r.transportType)
			}), await this.client.auth.requests.delete(t, {
				message: "rejected",
				code: 0
			}), await this.deleteProposal(t);
		}), Z(this, "formatAuthMessage", (e) => {
			this.isInitialized();
			let { request: t, iss: n } = e;
			return jm(t, n);
		}), Z(this, "processRelayMessageCache", () => {
			setTimeout(async () => {
				if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0;) try {
					let e = this.relayMessageCache.shift();
					e && await this.onRelayMessage(e);
				} catch (e) {
					this.client.logger.error(e);
				}
			}, 50);
		}), Z(this, "cleanupDuplicatePairings", async (e) => {
			if (e.pairingTopic) try {
				let t = this.client.core.pairing.pairings.get(e.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((n) => n.peerMetadata?.url && n.peerMetadata?.url === e.peer.metadata.url && n.topic && n.topic !== t.topic);
				if (n.length === 0) return;
				this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), await Promise.all(n.map((e) => this.client.core.pairing.disconnect({ topic: e.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
			} catch (e) {
				this.client.logger.error(e);
			}
		}), Z(this, "deleteSession", async (e) => {
			let { topic: t, expirerHasDeleted: n = !1, emitEvent: r = !0, id: i = 0 } = e, { self: a } = this.client.session.get(t);
			await this.client.core.relayer.unsubscribe(t), await this.client.session.delete(t, W("USER_DISCONNECTED")), this.addToRecentlyDeleted(t, "session"), this.client.core.crypto.keychain.has(a.publicKey) && await this.client.core.crypto.deleteKeyPair(a.publicKey), this.client.core.crypto.keychain.has(t) && await this.client.core.crypto.deleteSymKey(t), n || this.client.core.expirer.del(t), this.client.core.storage.removeItem(GT).catch((e) => this.client.logger.warn(e)), this.getPendingSessionRequests().forEach((e) => {
				e.topic === t && this.deletePendingSessionRequest(e.id, W("USER_DISCONNECTED"));
			}), t === this.sessionRequestQueue.queue[0]?.topic && (this.sessionRequestQueue.state = $T.idle), r && this.client.events.emit("session_delete", {
				id: i,
				topic: t
			});
		}), Z(this, "deleteProposal", async (e, t) => {
			if (t) try {
				let t = this.client.proposal.get(e);
				this.client.core.eventClient.getEvent({ topic: t.pairingTopic })?.setError(kx.proposal_expired);
			} catch {}
			await Promise.all([this.client.proposal.delete(e, W("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "proposal");
		}), Z(this, "deletePendingSessionRequest", async (e, t, n = !1) => {
			await Promise.all([this.client.pendingRequest.delete(e, t), n ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((t) => t.id !== e), n && (this.sessionRequestQueue.state = $T.idle, this.client.events.emit("session_request_expire", { id: e }));
		}), Z(this, "deletePendingAuthRequest", async (e, t, n = !1) => {
			await Promise.all([this.client.auth.requests.delete(e, t), n ? Promise.resolve() : this.client.core.expirer.del(e)]);
		}), Z(this, "setExpiry", async (e, t) => {
			this.client.session.keys.includes(e) && (this.client.core.expirer.set(e, t), await this.client.session.update(e, { expiry: t }));
		}), Z(this, "setProposal", async (e, t) => {
			this.client.core.expirer.set(e, Jd(ZT.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e, t);
		}), Z(this, "setAuthRequest", async (e, t) => {
			let { request: n, pairingTopic: r, transportType: i = G.relay } = t;
			this.client.core.expirer.set(e, n.expiryTimestamp), await this.client.auth.requests.set(e, {
				authPayload: n.authPayload,
				requester: n.requester,
				expiryTimestamp: n.expiryTimestamp,
				id: e,
				pairingTopic: r,
				verifyContext: n.verifyContext,
				transportType: i
			});
		}), Z(this, "setPendingSessionRequest", async (e) => {
			let { id: t, topic: n, params: r, verifyContext: i } = e, a = r.request.expiryTimestamp || Jd(ZT.wc_sessionRequest.req.ttl);
			this.client.core.expirer.set(t, a), await this.client.pendingRequest.set(t, {
				id: t,
				topic: n,
				params: r,
				verifyContext: i
			});
		}), Z(this, "sendRequest", async (e) => {
			let { topic: t, method: n, params: r, expiry: i, relayRpcId: a, clientRpcId: o, throwOnFailedPublish: s, appLink: c, tvf: l, publishOpts: u = {} } = e, d = fb(n, r, o), f, p = !!c;
			try {
				let e = p ? L_ : I_;
				f = await this.client.core.crypto.encode(t, d, { encoding: e });
			} catch (e) {
				throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), e;
			}
			let m;
			if (nE.includes(n)) {
				let e = q_(JSON.stringify(d)), t = q_(f);
				m = await this.client.core.verify.register({
					id: t,
					decryptedId: e
				});
			}
			let h = X(X({}, ZT[n].req), u);
			if (h.attestation = m, i && (h.ttl = i), a && (h.id = a), this.client.core.history.set(t, d), p) {
				let e = _v(c, t, f);
				await globalThis.Linking.openURL(e, this.client.name);
			} else h.tvf = gE(X({}, l), { correlationId: d.id }), s ? (h.internal = gE(X({}, h.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(t, f, h)) : this.client.core.relayer.publish(t, f, h).catch((e) => this.client.logger.error(e));
			return d.id;
		}), Z(this, "sendProposeSession", async (e) => {
			let { proposal: t, publishOpts: n } = e, r = fb("wc_sessionPropose", t, t.id);
			this.client.core.history.set(t.pairingTopic, r);
			let i = await this.client.core.crypto.encode(t.pairingTopic, r, { encoding: I_ }), a = q_(JSON.stringify(r)), o = q_(i), s = await this.client.core.verify.register({
				id: o,
				decryptedId: a
			});
			await this.client.core.relayer.publishCustom({
				payload: {
					pairingTopic: t.pairingTopic,
					sessionProposal: i
				},
				opts: gE(X({}, n), {
					publishMethod: "wc_proposeSession",
					attestation: s
				})
			});
		}), Z(this, "sendApproveSession", async (e) => {
			let { sessionTopic: t, pairingProposalResponse: n, proposal: r, sessionSettleRequest: i, publishOpts: a } = e, o = pb(r.id, n), s = await this.client.core.crypto.encode(r.pairingTopic, o, { encoding: I_ }), c = fb("wc_sessionSettle", i, a?.id), l = await this.client.core.crypto.encode(t, c, { encoding: I_ });
			this.client.core.history.set(t, c), await this.client.core.relayer.publishCustom({
				payload: {
					sessionTopic: t,
					pairingTopic: r.pairingTopic,
					sessionProposalResponse: s,
					sessionSettlementRequest: l
				},
				opts: gE(X({}, a), { publishMethod: "wc_approveSession" })
			});
		}), Z(this, "sendResult", async (e) => {
			let { id: t, topic: n, result: r, throwOnFailedPublish: i, encodeOpts: a, appLink: o } = e, s = pb(t, r), c, l = o && typeof (globalThis == null ? void 0 : globalThis.Linking) < "u";
			try {
				let e = l ? L_ : I_;
				c = await this.client.core.crypto.encode(n, s, gE(X({}, a || {}), { encoding: e }));
			} catch (e) {
				throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${n} failed`), e;
			}
			let u, d;
			try {
				u = await this.client.core.history.get(n, t);
				let e = u.request;
				try {
					d = this.getTVFParams(t, e.params, r);
				} catch (e) {
					this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${e?.message}`);
				}
			} catch (e) {
				throw this.client.logger.error(`sendResult() -> history.get(${n}, ${t}) failed`), e;
			}
			if (l) {
				let e = _v(o, n, c);
				await globalThis.Linking.openURL(e, this.client.name);
			} else {
				let e = ZT[u.request.method].res;
				e.tvf = gE(X({}, d), { correlationId: t }), i ? (e.internal = gE(X({}, e.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(n, c, e)) : this.client.core.relayer.publish(n, c, e).catch((e) => this.client.logger.error(e));
			}
			await this.client.core.history.resolve(s);
		}), Z(this, "sendError", async (e) => {
			let { id: t, topic: n, error: r, encodeOpts: i, rpcOpts: a, appLink: o } = e, s = mb(t, r), c, l = o && typeof (globalThis == null ? void 0 : globalThis.Linking) < "u";
			try {
				let e = l ? L_ : I_;
				c = await this.client.core.crypto.encode(n, s, gE(X({}, i || {}), { encoding: e }));
			} catch (e) {
				throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${n} failed`), e;
			}
			let u;
			try {
				u = await this.client.core.history.get(n, t);
			} catch (e) {
				throw this.client.logger.error(`sendError() -> history.get(${n}, ${t}) failed`), e;
			}
			if (l) {
				let e = _v(o, n, c);
				await globalThis.Linking.openURL(e, this.client.name);
			} else {
				let e = u.request.method, t = a || ZT[e].res;
				this.client.core.relayer.publish(n, c, t);
			}
			await this.client.core.history.resolve(s);
		}), Z(this, "cleanup", async () => {
			let e = [], t = [];
			this.client.session.getAll().forEach((t) => {
				let n = !1;
				Yd(t.expiry) && (n = !0), this.client.core.crypto.keychain.has(t.topic) || (n = !0), n && e.push(t.topic);
			}), this.client.proposal.getAll().forEach((e) => {
				Yd(e.expiryTimestamp) && t.push(e.id);
			}), await Promise.all([...e.map((e) => this.deleteSession({ topic: e })), ...t.map((e) => this.deleteProposal(e))]);
		}), Z(this, "onProviderMessageEvent", async (e) => {
			!this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e) : await this.onRelayMessage(e);
		}), Z(this, "onRelayEventRequest", async (e) => {
			this.requestQueue.queue.push(e), await this.processRequestsQueue();
		}), Z(this, "processRequestsQueue", async () => {
			if (this.requestQueue.state === $T.active) {
				this.client.logger.info("Request queue already active, skipping...");
				return;
			}
			for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0;) {
				this.requestQueue.state = $T.active;
				let e = this.requestQueue.queue.shift();
				if (e) try {
					await this.processRequest(e);
				} catch (e) {
					this.client.logger.warn(e);
				}
			}
			this.requestQueue.state = $T.idle;
		}), Z(this, "processRequest", async (e) => {
			let { topic: t, payload: n, attestation: r, transportType: i, encryptedId: a } = e, o = n.method;
			if (!this.shouldIgnorePairingRequest({
				topic: t,
				requestMethod: o
			})) switch (o) {
				case "wc_sessionPropose": return await this.onSessionProposeRequest({
					topic: t,
					payload: n,
					attestation: r,
					encryptedId: a
				});
				case "wc_sessionSettle": return await this.onSessionSettleRequest(t, n);
				case "wc_sessionUpdate": return await this.onSessionUpdateRequest(t, n);
				case "wc_sessionExtend": return await this.onSessionExtendRequest(t, n);
				case "wc_sessionPing": return await this.onSessionPingRequest(t, n);
				case "wc_sessionDelete": return await this.onSessionDeleteRequest(t, n);
				case "wc_sessionRequest": return await this.onSessionRequest({
					topic: t,
					payload: n,
					attestation: r,
					encryptedId: a,
					transportType: i
				});
				case "wc_sessionEvent": return await this.onSessionEventRequest(t, n);
				case "wc_sessionAuthenticate": return await this.onSessionAuthenticateRequest({
					topic: t,
					payload: n,
					attestation: r,
					encryptedId: a,
					transportType: i
				});
				default: return this.client.logger.info(`Unsupported request method ${o}`);
			}
		}), Z(this, "onRelayEventResponse", async (e) => {
			let { topic: t, payload: n, transportType: r } = e, i = (await this.client.core.history.get(t, n.id)).request.method;
			switch (i) {
				case "wc_sessionPropose": return this.onSessionProposeResponse(t, n, r);
				case "wc_sessionSettle": return this.onSessionSettleResponse(t, n);
				case "wc_sessionUpdate": return this.onSessionUpdateResponse(t, n);
				case "wc_sessionExtend": return this.onSessionExtendResponse(t, n);
				case "wc_sessionPing": return this.onSessionPingResponse(t, n);
				case "wc_sessionRequest": return this.onSessionRequestResponse(t, n);
				case "wc_sessionAuthenticate": return this.onSessionAuthenticateResponse(t, n);
				default: return this.client.logger.info(`Unsupported response method ${i}`);
			}
		}), Z(this, "onRelayEventUnknownPayload", (e) => {
			let { topic: t } = e, { message: n } = U("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
			throw Error(n);
		}), Z(this, "shouldIgnorePairingRequest", (e) => {
			let { topic: t, requestMethod: n } = e, r = this.expectedPairingMethodMap.get(t);
			return !r || r.includes(n) ? !1 : !!(r.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
		}), Z(this, "onSessionProposeRequest", async (e) => {
			let { topic: t, payload: n, attestation: r, encryptedId: i } = e, { params: a, id: o } = n;
			try {
				let e = this.client.core.eventClient.getEvent({ topic: t });
				this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), e?.setError(Dx.proposal_listener_not_found)), this.isValidConnect(X({}, n.params));
				let s = X({
					id: o,
					pairingTopic: t,
					expiryTimestamp: a.expiryTimestamp || Jd(ZT.wc_sessionPropose.req.ttl),
					attestation: r,
					encryptedId: i
				}, a);
				await this.setProposal(o, s);
				let c = await this.getVerifyContext({
					attestationId: r,
					hash: q_(JSON.stringify(n)),
					encryptedId: i,
					metadata: s.proposer.metadata
				});
				e?.addTrace(Ex.emit_session_proposal), this.client.events.emit("session_proposal", {
					id: o,
					params: s,
					verifyContext: c
				});
			} catch (e) {
				await this.sendError({
					id: o,
					topic: t,
					error: e,
					rpcOpts: ZT.wc_sessionPropose.autoReject
				}), this.client.logger.error(e);
			}
		}), Z(this, "onSessionProposeResponse", async (e, t, n) => {
			let { id: r } = t;
			if (Fb(t)) {
				let { result: i } = t;
				this.client.logger.trace({
					type: "method",
					method: "onSessionProposeResponse",
					result: i
				});
				let a = this.client.proposal.get(r);
				this.client.logger.trace({
					type: "method",
					method: "onSessionProposeResponse",
					proposal: a
				});
				let o = a.proposer.publicKey;
				this.client.logger.trace({
					type: "method",
					method: "onSessionProposeResponse",
					selfPublicKey: o
				});
				let s = i.responderPublicKey;
				this.client.logger.trace({
					type: "method",
					method: "onSessionProposeResponse",
					peerPublicKey: s
				});
				let c = await this.client.core.crypto.generateSharedKey(o, s);
				this.pendingSessions.set(r, {
					sessionTopic: c,
					pairingTopic: e,
					proposalId: r,
					publicKey: o
				});
				let l = await this.client.core.relayer.subscribe(c, { transportType: n });
				this.client.logger.trace({
					type: "method",
					method: "onSessionProposeResponse",
					subscriptionId: l
				}), await this.client.core.pairing.activate({ topic: e });
			} else if (Ib(t)) {
				await this.deleteProposal(r);
				let e = B("session_connect", r);
				if (this.events.listenerCount(e) === 0) throw Error(`emitting ${e} without any listeners, 954`);
				this.events.emit(e, { error: t.error });
			}
		}), Z(this, "onSessionSettleRequest", async (e, t) => {
			let { id: n, params: r } = t;
			try {
				this.isValidSessionSettleRequest(r);
				let { relay: n, controller: i, expiry: a, namespaces: o, sessionProperties: s, scopedProperties: c, sessionConfig: l } = t.params, u = [...this.pendingSessions.values()].find((t) => t.sessionTopic === e);
				if (!u) return this.client.logger.error(`Pending session not found for topic ${e}`);
				let d = this.client.proposal.get(u.proposalId), f = gE(X(X(X({
					topic: e,
					relay: n,
					expiry: a,
					namespaces: o,
					acknowledged: !0,
					pairingTopic: u.pairingTopic,
					requiredNamespaces: d.requiredNamespaces,
					optionalNamespaces: d.optionalNamespaces,
					controller: i.publicKey,
					self: {
						publicKey: u.publicKey,
						metadata: this.client.metadata
					},
					peer: {
						publicKey: i.publicKey,
						metadata: i.metadata
					}
				}, s && { sessionProperties: s }), c && { scopedProperties: c }), l && { sessionConfig: l }), { transportType: G.relay });
				await this.client.session.set(f.topic, f), await this.setExpiry(f.topic, f.expiry), await this.client.core.pairing.updateMetadata({
					topic: u.pairingTopic,
					metadata: f.peer.metadata
				}), this.client.events.emit("session_connect", { session: f }), this.events.emit(B("session_connect", u.proposalId), { session: f }), this.pendingSessions.delete(u.proposalId), this.deleteProposal(u.proposalId, !1), this.cleanupDuplicatePairings(f), await this.sendResult({
					id: t.id,
					topic: e,
					result: !0
				});
			} catch (t) {
				await this.sendError({
					id: n,
					topic: e,
					error: t
				}), this.client.logger.error(t);
			}
		}), Z(this, "onSessionSettleResponse", async (e, t) => {
			let { id: n } = t;
			Fb(t) ? (await this.client.session.update(e, { acknowledged: !0 }), this.events.emit(B("session_approve", n), {})) : Ib(t) && (await this.client.session.delete(e, W("USER_DISCONNECTED")), this.events.emit(B("session_approve", n), { error: t.error }));
		}), Z(this, "onSessionUpdateRequest", async (e, t) => {
			let { params: n, id: r } = t;
			try {
				let t = `${e}_session_update`, i = jy.get(t);
				if (i && this.isRequestOutOfSync(i, r)) {
					this.client.logger.warn(`Discarding out of sync request - ${r}`), this.sendError({
						id: r,
						topic: e,
						error: W("INVALID_UPDATE_REQUEST")
					});
					return;
				}
				this.isValidUpdate(X({ topic: e }, n));
				try {
					jy.set(t, r), await this.client.session.update(e, { namespaces: n.namespaces }), await this.sendResult({
						id: r,
						topic: e,
						result: !0
					});
				} catch (e) {
					throw jy.delete(t), e;
				}
				this.client.events.emit("session_update", {
					id: r,
					topic: e,
					params: n
				});
			} catch (t) {
				await this.sendError({
					id: r,
					topic: e,
					error: t
				}), this.client.logger.error(t);
			}
		}), Z(this, "isRequestOutOfSync", (e, t) => t.toString().slice(0, -3) < e.toString().slice(0, -3)), Z(this, "onSessionUpdateResponse", (e, t) => {
			let { id: n } = t, r = B("session_update", n);
			if (this.events.listenerCount(r) === 0) throw Error(`emitting ${r} without any listeners`);
			Fb(t) ? this.events.emit(B("session_update", n), {}) : Ib(t) && this.events.emit(B("session_update", n), { error: t.error });
		}), Z(this, "onSessionExtendRequest", async (e, t) => {
			let { id: n } = t;
			try {
				this.isValidExtend({ topic: e }), await this.setExpiry(e, Jd(YT)), await this.sendResult({
					id: n,
					topic: e,
					result: !0
				}), this.client.events.emit("session_extend", {
					id: n,
					topic: e
				});
			} catch (t) {
				await this.sendError({
					id: n,
					topic: e,
					error: t
				}), this.client.logger.error(t);
			}
		}), Z(this, "onSessionExtendResponse", (e, t) => {
			let { id: n } = t, r = B("session_extend", n);
			if (this.events.listenerCount(r) === 0) throw Error(`emitting ${r} without any listeners`);
			Fb(t) ? this.events.emit(B("session_extend", n), {}) : Ib(t) && this.events.emit(B("session_extend", n), { error: t.error });
		}), Z(this, "onSessionPingRequest", async (e, t) => {
			let { id: n } = t;
			try {
				this.isValidPing({ topic: e }), await this.sendResult({
					id: n,
					topic: e,
					result: !0,
					throwOnFailedPublish: !0
				}), this.client.events.emit("session_ping", {
					id: n,
					topic: e
				});
			} catch (t) {
				await this.sendError({
					id: n,
					topic: e,
					error: t
				}), this.client.logger.error(t);
			}
		}), Z(this, "onSessionPingResponse", (e, t) => {
			let { id: n } = t, r = B("session_ping", n);
			setTimeout(() => {
				if (this.events.listenerCount(r) === 0) throw Error(`emitting ${r} without any listeners 2176`);
				Fb(t) ? this.events.emit(B("session_ping", n), {}) : Ib(t) && this.events.emit(B("session_ping", n), { error: t.error });
			}, 500);
		}), Z(this, "onSessionDeleteRequest", async (e, t) => {
			let { id: n } = t;
			try {
				this.isValidDisconnect({
					topic: e,
					reason: t.params
				}), await Promise.all([
					new Promise((t) => {
						this.client.core.relayer.once(ax.publish, async () => {
							t(await this.deleteSession({
								topic: e,
								id: n
							}));
						});
					}),
					this.sendResult({
						id: n,
						topic: e,
						result: !0
					}),
					this.cleanupPendingSentRequestsForTopic({
						topic: e,
						error: W("USER_DISCONNECTED")
					})
				]).catch((e) => this.client.logger.error(e));
			} catch (e) {
				this.client.logger.error(e);
			}
		}), Z(this, "onSessionRequest", async (e) => {
			var t, n;
			let { topic: r, payload: i, attestation: a, encryptedId: o, transportType: s } = e, { id: c, params: l } = i;
			try {
				await this.isValidRequest(X({ topic: r }, l));
				let e = this.client.session.get(r), i = {
					id: c,
					topic: r,
					params: l,
					verifyContext: await this.getVerifyContext({
						attestationId: a,
						hash: q_(JSON.stringify(fb("wc_sessionRequest", l, c))),
						encryptedId: o,
						metadata: e.peer.metadata,
						transportType: s
					})
				};
				await this.setPendingSessionRequest(i), s === G.link_mode && (t = e.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(e.peer.metadata.redirect?.universal), (n = this.client.signConfig) != null && n.disableRequestQueue ? this.emitSessionRequest(i) : (this.addSessionRequestToSessionRequestQueue(i), this.processSessionRequestQueue());
			} catch (e) {
				await this.sendError({
					id: c,
					topic: r,
					error: e
				}), this.client.logger.error(e);
			}
		}), Z(this, "onSessionRequestResponse", (e, t) => {
			let { id: n } = t, r = B("session_request", n);
			if (this.events.listenerCount(r) === 0) throw Error(`emitting ${r} without any listeners`);
			Fb(t) ? this.events.emit(B("session_request", n), { result: t.result }) : Ib(t) && this.events.emit(B("session_request", n), { error: t.error });
		}), Z(this, "onSessionEventRequest", async (e, t) => {
			let { id: n, params: r } = t;
			try {
				let t = `${e}_session_event_${r.event.name}`, i = jy.get(t);
				if (i && this.isRequestOutOfSync(i, n)) {
					this.client.logger.info(`Discarding out of sync request - ${n}`);
					return;
				}
				this.isValidEmit(X({ topic: e }, r)), this.client.events.emit("session_event", {
					id: n,
					topic: e,
					params: r
				}), jy.set(t, n);
			} catch (t) {
				await this.sendError({
					id: n,
					topic: e,
					error: t
				}), this.client.logger.error(t);
			}
		}), Z(this, "onSessionAuthenticateResponse", (e, t) => {
			let { id: n } = t;
			this.client.logger.trace({
				type: "method",
				method: "onSessionAuthenticateResponse",
				topic: e,
				payload: t
			}), Fb(t) ? this.events.emit(B("session_request", n), { result: t.result }) : Ib(t) && this.events.emit(B("session_request", n), { error: t.error });
		}), Z(this, "onSessionAuthenticateRequest", async (e) => {
			var t;
			let { topic: n, payload: r, attestation: i, encryptedId: a, transportType: o } = e;
			try {
				let { requester: e, authPayload: s, expiryTimestamp: c } = r.params, l = await this.getVerifyContext({
					attestationId: i,
					hash: q_(JSON.stringify(r)),
					encryptedId: a,
					metadata: e.metadata,
					transportType: o
				}), u = {
					requester: e,
					pairingTopic: n,
					id: r.id,
					authPayload: s,
					verifyContext: l,
					expiryTimestamp: c
				};
				await this.setAuthRequest(r.id, {
					request: u,
					pairingTopic: n,
					transportType: o
				}), o === G.link_mode && (t = e.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(e.metadata.redirect.universal), this.client.events.emit("session_authenticate", {
					topic: n,
					params: r.params,
					id: r.id,
					verifyContext: l
				});
			} catch (e) {
				this.client.logger.error(e);
				let t = r.params.requester.publicKey, i = await this.client.core.crypto.generateKeyPair(), a = this.getAppLinkIfEnabled(r.params.requester.metadata, o), s = {
					type: 1,
					receiverPublicKey: t,
					senderPublicKey: i
				};
				await this.sendError({
					id: r.id,
					topic: n,
					error: e,
					encodeOpts: s,
					rpcOpts: ZT.wc_sessionAuthenticate.autoReject,
					appLink: a
				});
			}
		}), Z(this, "addSessionRequestToSessionRequestQueue", (e) => {
			this.sessionRequestQueue.queue.push(e);
		}), Z(this, "cleanupAfterResponse", (e) => {
			this.deletePendingSessionRequest(e.response.id, {
				message: "fulfilled",
				code: 0
			}), setTimeout(() => {
				this.sessionRequestQueue.state = $T.idle, this.processSessionRequestQueue();
			}, (0, L.toMiliseconds)(this.requestQueueDelay));
		}), Z(this, "cleanupPendingSentRequestsForTopic", ({ topic: e, error: t }) => {
			let n = this.client.core.history.pending;
			n.length > 0 && n.filter((t) => t.topic === e && t.request.method === "wc_sessionRequest").forEach((e) => {
				let n = e.request.id, r = B("session_request", n);
				if (this.events.listenerCount(r) === 0) throw Error(`emitting ${r} without any listeners`);
				this.events.emit(B("session_request", e.request.id), { error: t });
			});
		}), Z(this, "processSessionRequestQueue", () => {
			if (this.sessionRequestQueue.state === $T.active) {
				this.client.logger.info("session request queue is already active.");
				return;
			}
			let e = this.sessionRequestQueue.queue[0];
			if (!e) {
				this.client.logger.info("session request queue is empty.");
				return;
			}
			try {
				this.emitSessionRequest(e);
			} catch (e) {
				this.client.logger.error(e);
			}
		}), Z(this, "emitSessionRequest", (e) => {
			if (this.emittedSessionRequests.has(e.id)) {
				this.client.logger.warn({ id: e.id }, `Skipping emitting \`session_request\` event for duplicate request. id: ${e.id}`);
				return;
			}
			this.sessionRequestQueue.state = $T.active, this.emittedSessionRequests.add(e.id), this.client.events.emit("session_request", e);
		}), Z(this, "onPairingCreated", (e) => {
			if (e.methods && this.expectedPairingMethodMap.set(e.topic, e.methods), e.active) return;
			let t = this.client.proposal.getAll().find((t) => t.pairingTopic === e.topic);
			t && this.onSessionProposeRequest({
				topic: e.topic,
				payload: fb("wc_sessionPropose", gE(X({}, t), {
					requiredNamespaces: t.requiredNamespaces,
					optionalNamespaces: t.optionalNamespaces,
					relays: t.relays,
					proposer: t.proposer,
					sessionProperties: t.sessionProperties,
					scopedProperties: t.scopedProperties
				}), t.id),
				attestation: t.attestation,
				encryptedId: t.encryptedId
			});
		}), Z(this, "isValidConnect", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
				throw Error(t);
			}
			let { pairingTopic: t, requiredNamespaces: n, optionalNamespaces: r, sessionProperties: i, scopedProperties: a, relays: o } = e;
			if (Vv(t) || await this.isValidPairingTopic(t), !sy(o, !0)) {
				let { message: e } = U("MISSING_OR_INVALID", `connect() relays: ${o}`);
				throw Error(e);
			}
			if (!Vv(n) && Bv(n) !== 0) {
				let e = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
				[
					"fatal",
					"error",
					"silent"
				].includes(this.client.logger.level) ? console.warn(e) : this.client.logger.warn(e), this.validateNamespaces(n, "requiredNamespaces");
			}
			if (!Vv(r) && Bv(r) !== 0 && this.validateNamespaces(r, "optionalNamespaces"), Vv(i) || this.validateSessionProps(i, "sessionProperties"), !Vv(a)) {
				this.validateSessionProps(a, "scopedProperties");
				let e = Object.keys(n || {}).concat(Object.keys(r || {}));
				if (!Object.keys(a).every((t) => e.includes(t.split(":")[0]))) throw Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(e)}`);
			}
		}), Z(this, "validateNamespaces", (e, t) => {
			let n = iy(e, "connect()", t);
			if (n) throw Error(n.message);
		}), Z(this, "isValidApprove", async (e) => {
			if (!ly(e)) throw Error(U("MISSING_OR_INVALID", `approve() params: ${e}`).message);
			let { id: t, namespaces: n, relayProtocol: r, sessionProperties: i, scopedProperties: a } = e;
			this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
			let o = this.client.proposal.get(t), s = ay(n, "approve()");
			if (s) throw Error(s.message);
			let c = _y(o.requiredNamespaces, n, "approve()");
			if (c) throw Error(c.message);
			if (!Hv(r, !0)) {
				let { message: e } = U("MISSING_OR_INVALID", `approve() relayProtocol: ${r}`);
				throw Error(e);
			}
			if (Vv(i) || this.validateSessionProps(i, "sessionProperties"), !Vv(a)) {
				this.validateSessionProps(a, "scopedProperties");
				let e = new Set(Object.keys(n));
				if (!Object.keys(a).every((t) => e.has(t.split(":")[0]))) throw Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(e).join(", ")}`);
			}
		}), Z(this, "isValidReject", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `reject() params: ${e}`);
				throw Error(t);
			}
			let { id: t, reason: n } = e;
			if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !uy(n)) {
				let { message: e } = U("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
				throw Error(e);
			}
		}), Z(this, "isValidSessionSettleRequest", (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
				throw Error(t);
			}
			let { relay: t, controller: n, namespaces: r, expiry: i } = e;
			if (!oy(t)) {
				let { message: e } = U("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
				throw Error(e);
			}
			let a = Xv(n, "onSessionSettleRequest()");
			if (a) throw Error(a.message);
			let o = ay(r, "onSessionSettleRequest()");
			if (o) throw Error(o.message);
			if (Yd(i)) {
				let { message: e } = U("EXPIRED", "onSessionSettleRequest()");
				throw Error(e);
			}
		}), Z(this, "isValidUpdate", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `update() params: ${e}`);
				throw Error(t);
			}
			let { topic: t, namespaces: n } = e;
			this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
			let r = this.client.session.get(t), i = ay(n, "update()");
			if (i) throw Error(i.message);
			let a = _y(r.requiredNamespaces, n, "update()");
			if (a) throw Error(a.message);
		}), Z(this, "isValidExtend", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `extend() params: ${e}`);
				throw Error(t);
			}
			let { topic: t } = e;
			this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
		}), Z(this, "isValidRequest", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `request() params: ${e}`);
				throw Error(t);
			}
			let { topic: t, request: n, chainId: r, expiry: i } = e;
			this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
			let { namespaces: a } = this.client.session.get(t);
			if (!my(a, r)) {
				let { message: e } = U("MISSING_OR_INVALID", `request() chainId: ${r}`);
				throw Error(e);
			}
			if (!dy(n)) {
				let { message: e } = U("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
				throw Error(e);
			}
			if (!hy(a, r, n.method)) {
				let { message: e } = U("MISSING_OR_INVALID", `request() method: ${n.method}`);
				throw Error(e);
			}
			if (i && !xy(i, QT)) {
				let { message: e } = U("MISSING_OR_INVALID", `request() expiry: ${i}. Expiry must be a number (in seconds) between ${QT.min} and ${QT.max}`);
				throw Error(e);
			}
		}), Z(this, "isValidRespond", async (e) => {
			var t;
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `respond() params: ${e}`);
				throw Error(t);
			}
			let { topic: n, response: r } = e;
			try {
				await this.isValidSessionTopic(n);
			} catch (n) {
				throw (t = e?.response) != null && t.id && this.cleanupAfterResponse(e), n;
			}
			if (!fy(r)) {
				let { message: e } = U("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(r)}`);
				throw Error(e);
			}
		}), Z(this, "isValidPing", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `ping() params: ${e}`);
				throw Error(t);
			}
			let { topic: t } = e;
			await this.isValidSessionOrPairingTopic(t);
		}), Z(this, "isValidEmit", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `emit() params: ${e}`);
				throw Error(t);
			}
			let { topic: t, event: n, chainId: r } = e;
			await this.isValidSessionTopic(t);
			let { namespaces: i } = this.client.session.get(t);
			if (!my(i, r)) {
				let { message: e } = U("MISSING_OR_INVALID", `emit() chainId: ${r}`);
				throw Error(e);
			}
			if (!py(n)) {
				let { message: e } = U("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
				throw Error(e);
			}
			if (!gy(i, r, n.name)) {
				let { message: e } = U("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
				throw Error(e);
			}
		}), Z(this, "isValidDisconnect", async (e) => {
			if (!ly(e)) {
				let { message: t } = U("MISSING_OR_INVALID", `disconnect() params: ${e}`);
				throw Error(t);
			}
			let { topic: t } = e;
			await this.isValidSessionOrPairingTopic(t);
		}), Z(this, "isValidAuthenticate", (e) => {
			let { chains: t, uri: n, domain: r, nonce: i } = e;
			if (!Array.isArray(t) || t.length === 0) throw Error("chains is required and must be a non-empty array");
			if (!Hv(n, !1)) throw Error("uri is required parameter");
			if (!Hv(r, !1)) throw Error("domain is required parameter");
			if (!Hv(i, !1)) throw Error("nonce is required parameter");
			if ([...new Set(t.map((e) => fd(e).namespace))].length > 1) throw Error("Multi-namespace requests are not supported. Please request single namespace only.");
			let { namespace: a } = fd(t[0]);
			if (a !== "eip155") throw Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
		}), Z(this, "getVerifyContext", async (e) => {
			let { attestationId: t, hash: n, encryptedId: r, metadata: i, transportType: a } = e, o = { verified: {
				verifyUrl: i.verifyUrl || "https://verify.walletconnect.org",
				validation: "UNKNOWN",
				origin: i.url || ""
			} };
			try {
				if (a === G.link_mode) {
					let e = this.getAppLinkIfEnabled(i, a);
					return o.verified.validation = e && new URL(e).origin === new URL(i.url).origin ? "VALID" : "INVALID", o;
				}
				let e = await this.client.core.verify.resolve({
					attestationId: t,
					hash: n,
					encryptedId: r,
					verifyUrl: i.verifyUrl
				});
				e && (o.verified.origin = e.origin, o.verified.isScam = e.isScam, o.verified.validation = e.origin === new URL(i.url).origin ? "VALID" : "INVALID");
			} catch (e) {
				this.client.logger.warn(e);
			}
			return this.client.logger.debug(`Verify context: ${JSON.stringify(o)}`), o;
		}), Z(this, "validateSessionProps", (e, t) => {
			Object.values(e).forEach((n, r) => {
				if (n == null) {
					let { message: i } = U("MISSING_OR_INVALID", `${t} must contain an existing value for each key. Received: ${n} for key ${Object.keys(e)[r]}`);
					throw Error(i);
				}
			});
		}), Z(this, "getPendingAuthRequest", (e) => {
			let t = this.client.auth.requests.get(e);
			return typeof t == "object" ? t : void 0;
		}), Z(this, "addToRecentlyDeleted", (e, t) => {
			if (this.recentlyDeletedMap.set(e, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
				let e = 0, t = this.recentlyDeletedLimit / 2;
				for (let n of this.recentlyDeletedMap.keys()) {
					if (e++ >= t) break;
					this.recentlyDeletedMap.delete(n);
				}
			}
		}), Z(this, "checkRecentlyDeleted", (e) => {
			let t = this.recentlyDeletedMap.get(e);
			if (t) {
				let { message: n } = U("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e}`);
				throw Error(n);
			}
		}), Z(this, "isLinkModeEnabled", (e, t) => !e || t !== G.link_mode ? !1 : this.client.metadata?.redirect?.linkMode === !0 && this.client.metadata?.redirect?.universal !== void 0 && this.client.metadata?.redirect?.universal !== "" && e?.redirect?.universal !== void 0 && e?.redirect?.universal !== "" && e?.redirect?.linkMode === !0 && this.client.core.linkModeSupportedApps.includes(e.redirect.universal) && typeof (globalThis == null ? void 0 : globalThis.Linking) < "u"), Z(this, "getAppLinkIfEnabled", (e, t) => this.isLinkModeEnabled(e, t) ? e?.redirect?.universal : void 0), Z(this, "handleLinkModeMessage", ({ url: e }) => {
			if (!e || !e.includes("wc_ev") || !e.includes("topic")) return;
			let t = tf(e, "topic") || "", n = decodeURIComponent(tf(e, "wc_ev") || ""), r = this.client.session.keys.includes(t);
			r && this.client.session.update(t, { transportType: G.link_mode }), this.client.core.dispatchEnvelope({
				topic: t,
				message: n,
				sessionExists: r
			});
		}), Z(this, "registerLinkModeListeners", async () => {
			var e;
			if (rf() || Ed() && (e = this.client.metadata.redirect) != null && e.linkMode) {
				let e = globalThis == null ? void 0 : globalThis.Linking;
				if (typeof e < "u") {
					e.addEventListener("url", this.handleLinkModeMessage, this.client.name);
					let t = await e.getInitialURL();
					t && setTimeout(() => {
						this.handleLinkModeMessage({ url: t });
					}, 50);
				}
			}
		}), Z(this, "getTVFParams", (e, t, n) => {
			var r;
			if (!((r = t.request) != null && r.method)) return {};
			let i = {
				correlationId: e,
				rpcMethods: [t.request.method],
				chainId: t.chainId
			};
			try {
				i.txHashes = this.extractTxHashesFromResult(t.request, n), i.contractAddresses = this.isValidContractData(t.request.params) ? [t.request.params?.[0]?.to] : [];
			} catch (e) {
				this.client.logger.warn("Error getting TVF params", e);
			}
			return i;
		}), Z(this, "isValidContractData", (e) => {
			if (!e) return !1;
			try {
				let t = e?.data || e?.[0]?.data;
				if (!t.startsWith("0x")) return !1;
				let n = t.slice(2);
				return /^[0-9a-fA-F]*$/.test(n) ? n.length % 2 == 0 : !1;
			} catch {}
			return !1;
		}), Z(this, "extractTxHashesFromResult", (e, t) => {
			try {
				if (!t) return [];
				let n = e.method, r = eE[n];
				if (n === "sui_signTransaction") return [um(t.transactionBytes)];
				if (n === "near_signTransaction") return [dm(t)];
				if (n === "near_signTransactions") return t.map((e) => dm(e));
				if (n === "xrpl_signTransactionFor" || n === "xrpl_signTransaction") return [t.tx_json?.hash];
				if (n === "polkadot_signTransaction") return [By({
					transaction: e.params.transactionPayload,
					signature: t.signature
				})];
				if (n === "algo_signTxn") return zv(t) ? t.map((e) => pm(e)) : [pm(t)];
				if (n === "cosmos_signDirect") return [hm(t)];
				if (typeof t == "string") return [t];
				let i = t[r.key];
				if (zv(i)) return n === "solana_signAllTransactions" ? i.map((e) => lm(e)) : i;
				if (typeof i == "string") return [i];
			} catch (e) {
				this.client.logger.warn("Error extracting tx hashes from result", e);
			}
			return [];
		});
	}
	async processPendingMessageEvents() {
		try {
			let e = this.client.session.keys, t = this.client.core.relayer.messages.getWithoutAck(e);
			for (let [e, n] of Object.entries(t)) for (let t of n) try {
				await this.onProviderMessageEvent({
					topic: e,
					message: t,
					publishedAt: Date.now()
				});
			} catch {
				this.client.logger.warn(`Error processing pending message event for topic: ${e}, message: ${t}`);
			}
		} catch (e) {
			this.client.logger.warn("processPendingMessageEvents failed", e);
		}
	}
	isInitialized() {
		if (!this.initialized) {
			let { message: e } = U("NOT_INITIALIZED", this.name);
			throw Error(e);
		}
	}
	async confirmOnlineStateOrThrow() {
		await this.client.core.relayer.confirmOnlineStateOrThrow();
	}
	registerRelayerEvents() {
		this.client.core.relayer.on(ax.message, (e) => {
			this.onProviderMessageEvent(e);
		});
	}
	async onRelayMessage(e) {
		let { topic: t, message: n, attestation: r, transportType: i } = e, { publicKey: a } = this.client.auth.authKeys.keys.includes(cE) ? this.client.auth.authKeys.get(cE) : {
			responseTopic: void 0,
			publicKey: void 0
		};
		try {
			let e = await this.client.core.crypto.decode(t, n, {
				receiverPublicKey: a,
				encoding: i === G.link_mode ? L_ : I_
			});
			Nb(e) ? (this.client.core.history.set(t, e), await this.onRelayEventRequest({
				topic: t,
				payload: e,
				attestation: r,
				transportType: i,
				encryptedId: q_(n)
			})) : Pb(e) ? (await this.client.core.history.resolve(e), await this.onRelayEventResponse({
				topic: t,
				payload: e,
				transportType: i
			}), this.client.core.history.delete(t, e.id)) : await this.onRelayEventUnknownPayload({
				topic: t,
				payload: e,
				transportType: i
			}), await this.client.core.relayer.messages.ack(t, n);
		} catch (e) {
			this.client.logger.error(e);
		}
	}
	registerExpirerEvents() {
		this.client.core.expirer.on(vx.expired, async (e) => {
			let { topic: t, id: n } = qd(e.target);
			if (n && this.client.pendingRequest.keys.includes(n)) return await this.deletePendingSessionRequest(n, U("EXPIRED"), !0);
			if (n && this.client.auth.requests.keys.includes(n)) return await this.deletePendingAuthRequest(n, U("EXPIRED"), !0);
			t ? this.client.session.keys.includes(t) && (await this.deleteSession({
				topic: t,
				expirerHasDeleted: !0
			}), this.client.events.emit("session_expire", { topic: t })) : n && (await this.deleteProposal(n, !0), this.client.events.emit("proposal_expire", { id: n }));
		});
	}
	registerPairingEvents() {
		this.client.core.pairing.events.on(mx.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(mx.delete, (e) => {
			this.addToRecentlyDeleted(e.topic, "pairing");
		});
	}
	isValidPairingTopic(e) {
		if (!Hv(e, !1)) {
			let { message: t } = U("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
			throw Error(t);
		}
		if (!this.client.core.pairing.pairings.keys.includes(e)) {
			let { message: t } = U("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
			throw Error(t);
		}
		if (Yd(this.client.core.pairing.pairings.get(e).expiry)) {
			let { message: t } = U("EXPIRED", `pairing topic: ${e}`);
			throw Error(t);
		}
	}
	async isValidSessionTopic(e) {
		if (!Hv(e, !1)) {
			let { message: t } = U("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
			throw Error(t);
		}
		if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
			let { message: t } = U("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
			throw Error(t);
		}
		if (Yd(this.client.session.get(e).expiry)) {
			await this.deleteSession({ topic: e });
			let { message: t } = U("EXPIRED", `session topic: ${e}`);
			throw Error(t);
		}
		if (!this.client.core.crypto.keychain.has(e)) {
			let { message: t } = U("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
			throw await this.deleteSession({ topic: e }), Error(t);
		}
	}
	async isValidSessionOrPairingTopic(e) {
		if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
		else if (this.client.core.pairing.pairings.keys.includes(e)) this.isValidPairingTopic(e);
		else if (Hv(e, !1)) {
			let { message: t } = U("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
			throw Error(t);
		} else {
			let { message: t } = U("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
			throw Error(t);
		}
	}
	async isValidProposalId(e) {
		if (!cy(e)) {
			let { message: t } = U("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
			throw Error(t);
		}
		if (!this.client.proposal.keys.includes(e)) {
			let { message: t } = U("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
			throw Error(t);
		}
		if (Yd(this.client.proposal.get(e).expiryTimestamp)) {
			await this.deleteProposal(e);
			let { message: t } = U("EXPIRED", `proposal id: ${e}`);
			throw Error(t);
		}
	}
}, vE = class extends sT {
	constructor(e, t) {
		super(e, t, KT, UT), this.core = e, this.logger = t;
	}
}, yE = class extends sT {
	constructor(e, t) {
		super(e, t, JT, UT), this.core = e, this.logger = t;
	}
}, bE = class extends sT {
	constructor(e, t) {
		super(e, t, tE, UT, (e) => e.id), this.core = e, this.logger = t;
	}
}, xE = class extends sT {
	constructor(e, t) {
		super(e, t, iE, sE, () => cE), this.core = e, this.logger = t;
	}
}, SE = class extends sT {
	constructor(e, t) {
		super(e, t, aE, sE), this.core = e, this.logger = t;
	}
}, CE = class extends sT {
	constructor(e, t) {
		super(e, t, oE, sE, (e) => e.id), this.core = e, this.logger = t;
	}
}, wE = Object.defineProperty, TE = (e, t, n) => t in e ? wE(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, EE = (e, t, n) => TE(e, typeof t == "symbol" ? t : t + "", n), DE = class {
	constructor(e, t) {
		this.core = e, this.logger = t, EE(this, "authKeys"), EE(this, "pairingTopics"), EE(this, "requests"), this.authKeys = new xE(this.core, this.logger), this.pairingTopics = new SE(this.core, this.logger), this.requests = new CE(this.core, this.logger);
	}
	async init() {
		await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
	}
}, OE = Object.defineProperty, kE = (e, t, n) => t in e ? OE(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Q = (e, t, n) => kE(e, typeof t == "symbol" ? t : t + "", n), AE = class e extends pn {
	constructor(e) {
		super(e), Q(this, "protocol", "wc"), Q(this, "version", 2), Q(this, "name", WT.name), Q(this, "metadata"), Q(this, "core"), Q(this, "logger"), Q(this, "events", new We.EventEmitter()), Q(this, "engine"), Q(this, "session"), Q(this, "proposal"), Q(this, "pendingRequest"), Q(this, "auth"), Q(this, "signConfig"), Q(this, "on", (e, t) => this.events.on(e, t)), Q(this, "once", (e, t) => this.events.once(e, t)), Q(this, "off", (e, t) => this.events.off(e, t)), Q(this, "removeListener", (e, t) => this.events.removeListener(e, t)), Q(this, "removeAllListeners", (e) => this.events.removeAllListeners(e)), Q(this, "connect", async (e) => {
			try {
				return await this.engine.connect(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "pair", async (e) => {
			try {
				return await this.engine.pair(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "approve", async (e) => {
			try {
				return await this.engine.approve(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "reject", async (e) => {
			try {
				return await this.engine.reject(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "update", async (e) => {
			try {
				return await this.engine.update(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "extend", async (e) => {
			try {
				return await this.engine.extend(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "request", async (e) => {
			try {
				return await this.engine.request(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "respond", async (e) => {
			try {
				return await this.engine.respond(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "ping", async (e) => {
			try {
				return await this.engine.ping(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "emit", async (e) => {
			try {
				return await this.engine.emit(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "disconnect", async (e) => {
			try {
				return await this.engine.disconnect(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "find", (e) => {
			try {
				return this.engine.find(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "getPendingSessionRequests", () => {
			try {
				return this.engine.getPendingSessionRequests();
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "authenticate", async (e, t) => {
			try {
				return await this.engine.authenticate(e, t);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "formatAuthMessage", (e) => {
			try {
				return this.engine.formatAuthMessage(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "approveSessionAuthenticate", async (e) => {
			try {
				return await this.engine.approveSessionAuthenticate(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), Q(this, "rejectSessionAuthenticate", async (e) => {
			try {
				return await this.engine.rejectSessionAuthenticate(e);
			} catch (e) {
				throw this.logger.error(e.message), e;
			}
		}), this.name = e?.name || WT.name, this.metadata = Nd(e?.metadata), this.signConfig = e?.signConfig;
		let t = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, w.default)(x({ level: e?.logger || WT.logger }));
		this.core = e?.core || new VT(e), this.logger = S(t, this.name), this.session = new yE(this.core, this.logger), this.proposal = new vE(this.core, this.logger), this.pendingRequest = new bE(this.core, this.logger), this.engine = new _E(this), this.auth = new DE(this.core, this.logger);
	}
	static async init(t) {
		let n = new e(t);
		return await n.initialize(), n;
	}
	get context() {
		return b(this.logger);
	}
	get pairing() {
		return this.core.pairing.pairings;
	}
	async initialize() {
		this.logger.trace("Initialized");
		try {
			await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success");
		} catch (e) {
			throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
		}
	}
}, jE = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof globalThis < "u" && globalThis, r = (function() {
		function e() {
			this.fetch = !1, this.DOMException = n.DOMException;
		}
		return e.prototype = n, new e();
	})();
	(function(e) {
		(function(t) {
			var n = e !== void 0 && e || typeof self < "u" && self || e !== void 0 && e || {}, r = {
				searchParams: "URLSearchParams" in n,
				iterable: "Symbol" in n && "iterator" in Symbol,
				blob: "FileReader" in n && "Blob" in n && (function() {
					try {
						return new Blob(), !0;
					} catch {
						return !1;
					}
				})(),
				formData: "FormData" in n,
				arrayBuffer: "ArrayBuffer" in n
			};
			function i(e) {
				return e && DataView.prototype.isPrototypeOf(e);
			}
			if (r.arrayBuffer) var a = [
				"[object Int8Array]",
				"[object Uint8Array]",
				"[object Uint8ClampedArray]",
				"[object Int16Array]",
				"[object Uint16Array]",
				"[object Int32Array]",
				"[object Uint32Array]",
				"[object Float32Array]",
				"[object Float64Array]"
			], o = ArrayBuffer.isView || function(e) {
				return e && a.indexOf(Object.prototype.toString.call(e)) > -1;
			};
			function s(e) {
				if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "") throw TypeError("Invalid character in header field name: \"" + e + "\"");
				return e.toLowerCase();
			}
			function c(e) {
				return typeof e != "string" && (e = String(e)), e;
			}
			function l(e) {
				var t = { next: function() {
					var t = e.shift();
					return {
						done: t === void 0,
						value: t
					};
				} };
				return r.iterable && (t[Symbol.iterator] = function() {
					return t;
				}), t;
			}
			function u(e) {
				this.map = {}, e instanceof u ? e.forEach(function(e, t) {
					this.append(t, e);
				}, this) : Array.isArray(e) ? e.forEach(function(e) {
					if (e.length != 2) throw TypeError("Headers constructor: expected name/value pair to be length 2, found" + e.length);
					this.append(e[0], e[1]);
				}, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
					this.append(t, e[t]);
				}, this);
			}
			u.prototype.append = function(e, t) {
				e = s(e), t = c(t);
				var n = this.map[e];
				this.map[e] = n ? n + ", " + t : t;
			}, u.prototype.delete = function(e) {
				delete this.map[s(e)];
			}, u.prototype.get = function(e) {
				return e = s(e), this.has(e) ? this.map[e] : null;
			}, u.prototype.has = function(e) {
				return this.map.hasOwnProperty(s(e));
			}, u.prototype.set = function(e, t) {
				this.map[s(e)] = c(t);
			}, u.prototype.forEach = function(e, t) {
				for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
			}, u.prototype.keys = function() {
				var e = [];
				return this.forEach(function(t, n) {
					e.push(n);
				}), l(e);
			}, u.prototype.values = function() {
				var e = [];
				return this.forEach(function(t) {
					e.push(t);
				}), l(e);
			}, u.prototype.entries = function() {
				var e = [];
				return this.forEach(function(t, n) {
					e.push([n, t]);
				}), l(e);
			}, r.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
			function d(e) {
				if (!e._noBody) {
					if (e.bodyUsed) return Promise.reject(/* @__PURE__ */ TypeError("Already read"));
					e.bodyUsed = !0;
				}
			}
			function f(e) {
				return new Promise(function(t, n) {
					e.onload = function() {
						t(e.result);
					}, e.onerror = function() {
						n(e.error);
					};
				});
			}
			function p(e) {
				var t = new FileReader(), n = f(t);
				return t.readAsArrayBuffer(e), n;
			}
			function m(e) {
				var t = new FileReader(), n = f(t), r = /charset=([A-Za-z0-9_-]+)/.exec(e.type), i = r ? r[1] : "utf-8";
				return t.readAsText(e, i), n;
			}
			function h(e) {
				for (var t = new Uint8Array(e), n = Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
				return n.join("");
			}
			function g(e) {
				if (e.slice) return e.slice(0);
				var t = new Uint8Array(e.byteLength);
				return t.set(new Uint8Array(e)), t.buffer;
			}
			function _() {
				return this.bodyUsed = !1, this._initBody = function(e) {
					this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : r.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : r.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : r.arrayBuffer && r.blob && i(e) ? (this._bodyArrayBuffer = g(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : r.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || o(e)) ? this._bodyArrayBuffer = g(e) : this._bodyText = e = Object.prototype.toString.call(e) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
				}, r.blob && (this.blob = function() {
					var e = d(this);
					if (e) return e;
					if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
					if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
					if (this._bodyFormData) throw Error("could not read FormData body as blob");
					return Promise.resolve(new Blob([this._bodyText]));
				}), this.arrayBuffer = function() {
					if (this._bodyArrayBuffer) return d(this) || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer));
					if (r.blob) return this.blob().then(p);
					throw Error("could not read as ArrayBuffer");
				}, this.text = function() {
					var e = d(this);
					if (e) return e;
					if (this._bodyBlob) return m(this._bodyBlob);
					if (this._bodyArrayBuffer) return Promise.resolve(h(this._bodyArrayBuffer));
					if (this._bodyFormData) throw Error("could not read FormData body as text");
					return Promise.resolve(this._bodyText);
				}, r.formData && (this.formData = function() {
					return this.text().then(x);
				}), this.json = function() {
					return this.text().then(JSON.parse);
				}, this;
			}
			var v = [
				"CONNECT",
				"DELETE",
				"GET",
				"HEAD",
				"OPTIONS",
				"PATCH",
				"POST",
				"PUT",
				"TRACE"
			];
			function y(e) {
				var t = e.toUpperCase();
				return v.indexOf(t) > -1 ? t : e;
			}
			function b(e, t) {
				if (!(this instanceof b)) throw TypeError("Please use the \"new\" operator, this DOM object constructor cannot be called as a function.");
				t = t || {};
				var r = t.body;
				if (e instanceof b) {
					if (e.bodyUsed) throw TypeError("Already read");
					this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !r && e._bodyInit != null && (r = e._bodyInit, e.bodyUsed = !0);
				} else this.url = String(e);
				if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new u(t.headers)), this.method = y(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal || function() {
					if ("AbortController" in n) return new AbortController().signal;
				}(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && r) throw TypeError("Body not allowed for GET or HEAD requests");
				if (this._initBody(r), (this.method === "GET" || this.method === "HEAD") && (t.cache === "no-store" || t.cache === "no-cache")) {
					var i = /([?&])_=[^&]*/;
					i.test(this.url) ? this.url = this.url.replace(i, "$1_=" + (/* @__PURE__ */ new Date()).getTime()) : this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
				}
			}
			b.prototype.clone = function() {
				return new b(this, { body: this._bodyInit });
			};
			function x(e) {
				var t = new FormData();
				return e.trim().split("&").forEach(function(e) {
					if (e) {
						var n = e.split("="), r = n.shift().replace(/\+/g, " "), i = n.join("=").replace(/\+/g, " ");
						t.append(decodeURIComponent(r), decodeURIComponent(i));
					}
				}), t;
			}
			function S(e) {
				var t = new u();
				return e.replace(/\r?\n[\t ]+/g, " ").split("\r").map(function(e) {
					return e.indexOf("\n") === 0 ? e.substr(1, e.length) : e;
				}).forEach(function(e) {
					var n = e.split(":"), r = n.shift().trim();
					if (r) {
						var i = n.join(":").trim();
						try {
							t.append(r, i);
						} catch (e) {
							console.warn("Response " + e.message);
						}
					}
				}), t;
			}
			_.call(b.prototype);
			function C(e, t) {
				if (!(this instanceof C)) throw TypeError("Please use the \"new\" operator, this DOM object constructor cannot be called as a function.");
				if (t || (t = {}), this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.status < 200 || this.status > 599) throw RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
				this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e);
			}
			_.call(C.prototype), C.prototype.clone = function() {
				return new C(this._bodyInit, {
					status: this.status,
					statusText: this.statusText,
					headers: new u(this.headers),
					url: this.url
				});
			}, C.error = function() {
				var e = new C(null, {
					status: 200,
					statusText: ""
				});
				return e.ok = !1, e.status = 0, e.type = "error", e;
			};
			var w = [
				301,
				302,
				303,
				307,
				308
			];
			C.redirect = function(e, t) {
				if (w.indexOf(t) === -1) throw RangeError("Invalid status code");
				return new C(null, {
					status: t,
					headers: { location: e }
				});
			}, t.DOMException = n.DOMException;
			try {
				new t.DOMException();
			} catch {
				t.DOMException = function(e, t) {
					this.message = e, this.name = t, this.stack = Error(e).stack;
				}, t.DOMException.prototype = Object.create(Error.prototype), t.DOMException.prototype.constructor = t.DOMException;
			}
			function T(e, i) {
				return new Promise(function(a, o) {
					var l = new b(e, i);
					if (l.signal && l.signal.aborted) return o(new t.DOMException("Aborted", "AbortError"));
					var d = new XMLHttpRequest();
					function f() {
						d.abort();
					}
					d.onload = function() {
						var e = {
							statusText: d.statusText,
							headers: S(d.getAllResponseHeaders() || "")
						};
						l.url.indexOf("file://") === 0 && (d.status < 200 || d.status > 599) ? e.status = 200 : e.status = d.status, e.url = "responseURL" in d ? d.responseURL : e.headers.get("X-Request-URL");
						var t = "response" in d ? d.response : d.responseText;
						setTimeout(function() {
							a(new C(t, e));
						}, 0);
					}, d.onerror = function() {
						setTimeout(function() {
							o(/* @__PURE__ */ TypeError("Network request failed"));
						}, 0);
					}, d.ontimeout = function() {
						setTimeout(function() {
							o(/* @__PURE__ */ TypeError("Network request timed out"));
						}, 0);
					}, d.onabort = function() {
						setTimeout(function() {
							o(new t.DOMException("Aborted", "AbortError"));
						}, 0);
					};
					function p(e) {
						try {
							return e === "" && n.location.href ? n.location.href : e;
						} catch {
							return e;
						}
					}
					if (d.open(l.method, p(l.url), !0), l.credentials === "include" ? d.withCredentials = !0 : l.credentials === "omit" && (d.withCredentials = !1), "responseType" in d && (r.blob ? d.responseType = "blob" : r.arrayBuffer && (d.responseType = "arraybuffer")), i && typeof i.headers == "object" && !(i.headers instanceof u || n.Headers && i.headers instanceof n.Headers)) {
						var m = [];
						Object.getOwnPropertyNames(i.headers).forEach(function(e) {
							m.push(s(e)), d.setRequestHeader(e, c(i.headers[e]));
						}), l.headers.forEach(function(e, t) {
							m.indexOf(t) === -1 && d.setRequestHeader(t, e);
						});
					} else l.headers.forEach(function(e, t) {
						d.setRequestHeader(t, e);
					});
					l.signal && (l.signal.addEventListener("abort", f), d.onreadystatechange = function() {
						d.readyState === 4 && l.signal.removeEventListener("abort", f);
					}), d.send(l._bodyInit === void 0 ? null : l._bodyInit);
				});
			}
			return T.polyfill = !0, n.fetch || (n.fetch = T, n.Headers = u, n.Request = b, n.Response = C), t.Headers = u, t.Request = b, t.Response = C, t.fetch = T, Object.defineProperty(t, "__esModule", { value: !0 }), t;
		})({});
	})(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
	var i = n.fetch ? n : r;
	e = i.fetch, e.default = i.fetch, e.fetch = i.fetch, e.Headers = i.Headers, e.Request = i.Request, e.Response = i.Response, t.exports = e;
})))()), ME = Object.defineProperty, NE = Object.defineProperties, PE = Object.getOwnPropertyDescriptors, FE = Object.getOwnPropertySymbols, IE = Object.prototype.hasOwnProperty, LE = Object.prototype.propertyIsEnumerable, RE = (e, t, n) => t in e ? ME(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, zE = (e, t) => {
	for (var n in t || (t = {})) IE.call(t, n) && RE(e, n, t[n]);
	if (FE) for (var n of FE(t)) LE.call(t, n) && RE(e, n, t[n]);
	return e;
}, BE = (e, t) => NE(e, PE(t)), VE = {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	method: "POST"
}, HE = 10, UE = class {
	constructor(e, t = !1) {
		if (this.url = e, this.disableProviderPing = t, this.events = new We.EventEmitter(), this.isAvailable = !1, this.registering = !1, !kb(e)) throw Error(`Provided URL is not compatible with HTTP connection: ${e}`);
		this.url = e, this.disableProviderPing = t;
	}
	get connected() {
		return this.isAvailable;
	}
	get connecting() {
		return this.registering;
	}
	on(e, t) {
		this.events.on(e, t);
	}
	once(e, t) {
		this.events.once(e, t);
	}
	off(e, t) {
		this.events.off(e, t);
	}
	removeListener(e, t) {
		this.events.removeListener(e, t);
	}
	async open(e = this.url) {
		await this.register(e);
	}
	async close() {
		if (!this.isAvailable) throw Error("Connection already closed");
		this.onClose();
	}
	async send(e) {
		this.isAvailable || await this.register();
		try {
			let t = T(e), n = await (await (0, jE.default)(this.url, BE(zE({}, VE), { body: t }))).json();
			this.onPayload({ data: n });
		} catch (t) {
			this.onError(e.id, t);
		}
	}
	async register(e = this.url) {
		if (!kb(e)) throw Error(`Provided URL is not compatible with HTTP connection: ${e}`);
		if (this.registering) {
			let e = this.events.getMaxListeners();
			return (this.events.listenerCount("register_error") >= e || this.events.listenerCount("open") >= e) && this.events.setMaxListeners(e + 1), new Promise((e, t) => {
				this.events.once("register_error", (e) => {
					this.resetMaxListeners(), t(e);
				}), this.events.once("open", () => {
					if (this.resetMaxListeners(), typeof this.isAvailable > "u") return t(/* @__PURE__ */ Error("HTTP connection is missing or invalid"));
					e();
				});
			});
		}
		this.url = e, this.registering = !0;
		try {
			if (!this.disableProviderPing) {
				let t = T({
					id: 1,
					jsonrpc: "2.0",
					method: "test",
					params: []
				});
				await (0, jE.default)(e, BE(zE({}, VE), { body: t }));
			}
			this.onOpen();
		} catch (e) {
			let t = this.parseError(e);
			throw this.events.emit("register_error", t), this.onClose(), t;
		}
	}
	onOpen() {
		this.isAvailable = !0, this.registering = !1, this.events.emit("open");
	}
	onClose() {
		this.isAvailable = !1, this.registering = !1, this.events.emit("close");
	}
	onPayload(e) {
		if (typeof e.data > "u") return;
		let t = typeof e.data == "string" ? C(e.data) : e.data;
		this.events.emit("payload", t);
	}
	onError(e, t) {
		let n = this.parseError(t), r = mb(e, n.message || n.toString());
		this.events.emit("payload", r);
	}
	parseError(e, t = this.url) {
		return rb(e, t, "HTTP");
	}
	resetMaxListeners() {
		this.events.getMaxListeners() > HE && this.events.setMaxListeners(HE);
	}
}, WE = "error", GE = "wss://relay.walletconnect.org", KE = "wc@2:universal_provider:", qE = "https://rpc.walletconnect.org/v1/", JE = "generic", YE = `${qE}bundler`, XE = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function ZE(e) {
	return e == null || typeof e != "object" && typeof e != "function";
}
function QE(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function $E(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
var eD = "[object RegExp]", tD = "[object String]", nD = "[object Number]", rD = "[object Boolean]", iD = "[object Arguments]", aD = "[object Symbol]", oD = "[object Date]", sD = "[object Map]", cD = "[object Set]", lD = "[object Array]", uD = "[object ArrayBuffer]", dD = "[object Object]", fD = "[object DataView]", pD = "[object Uint8Array]", mD = "[object Uint8ClampedArray]", hD = "[object Uint16Array]", gD = "[object Uint32Array]", _D = "[object Int8Array]", vD = "[object Int16Array]", yD = "[object Int32Array]", bD = "[object Float32Array]", xD = "[object Float64Array]";
function SD(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function CD(e, t) {
	return wD(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function wD(e, t, n, r = /* @__PURE__ */ new Map(), i = void 0) {
	let a = i?.(e, t, n, r);
	if (a != null) return a;
	if (ZE(e)) return e;
	if (r.has(e)) return r.get(e);
	if (Array.isArray(e)) {
		let t = Array(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = wD(e[a], a, n, r, i);
		return Object.hasOwn(e, "index") && (t.index = e.index), Object.hasOwn(e, "input") && (t.input = e.input), t;
	}
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof RegExp) {
		let t = new RegExp(e.source, e.flags);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof Map) {
		let t = /* @__PURE__ */ new Map();
		r.set(e, t);
		for (let [a, o] of e) t.set(a, wD(o, a, n, r, i));
		return t;
	}
	if (e instanceof Set) {
		let t = /* @__PURE__ */ new Set();
		r.set(e, t);
		for (let a of e) t.add(wD(a, void 0, n, r, i));
		return t;
	}
	if (typeof Buffer < "u" && Buffer.isBuffer(e)) return e.subarray();
	if (SD(e)) {
		let t = new (Object.getPrototypeOf(e)).constructor(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = wD(e[a], a, n, r, i);
		return t;
	}
	if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	if (e instanceof DataView) {
		let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
		return r.set(e, t), TD(t, e, n, r, i), t;
	}
	if (typeof File < "u" && e instanceof File) {
		let t = new File([e], e.name, { type: e.type });
		return r.set(e, t), TD(t, e, n, r, i), t;
	}
	if (e instanceof Blob) {
		let t = new Blob([e], { type: e.type });
		return r.set(e, t), TD(t, e, n, r, i), t;
	}
	if (e instanceof Error) {
		let t = new e.constructor();
		return r.set(e, t), t.message = e.message, t.name = e.name, t.stack = e.stack, t.cause = e.cause, TD(t, e, n, r, i), t;
	}
	if (typeof e == "object" && ED(e)) {
		let t = Object.create(Object.getPrototypeOf(e));
		return r.set(e, t), TD(t, e, n, r, i), t;
	}
	return e;
}
function TD(e, t, n = e, r, i) {
	let a = [...Object.keys(t), ...QE(t)];
	for (let o = 0; o < a.length; o++) {
		let s = a[o], c = Object.getOwnPropertyDescriptor(e, s);
		(c == null || c.writable) && (e[s] = wD(t[s], s, n, r, i));
	}
}
function ED(e) {
	switch ($E(e)) {
		case iD:
		case lD:
		case uD:
		case fD:
		case rD:
		case oD:
		case bD:
		case xD:
		case _D:
		case vD:
		case yD:
		case sD:
		case nD:
		case dD:
		case eD:
		case cD:
		case tD:
		case aD:
		case pD:
		case mD:
		case hD:
		case gD: return !0;
		default: return !1;
	}
}
function DD(e, t) {
	return CD(e, (n, r, i, a) => {
		let o = t?.(n, r, i, a);
		if (o != null) return o;
		if (typeof e == "object") switch (Object.prototype.toString.call(e)) {
			case nD:
			case tD:
			case rD: {
				let t = new e.constructor(e?.valueOf());
				return TD(t, e), t;
			}
			case iD: {
				let t = {};
				return TD(t, e), t.length = e.length, t[Symbol.iterator] = e[Symbol.iterator], t;
			}
			default: return;
		}
	});
}
function OD(e) {
	return DD(e);
}
function kD(e) {
	return typeof e == "object" && !!e && $E(e) === "[object Arguments]";
}
function AD(e) {
	return typeof e == "object" && !!e;
}
function jD() {}
function MD(e) {
	return SD(e);
}
function ND(e) {
	if (typeof e != "object" || !e) return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	if (Object.prototype.toString.call(e) !== "[object Object]") {
		let t = e[Symbol.toStringTag];
		return t == null || !Object.getOwnPropertyDescriptor(e, Symbol.toStringTag)?.writable ? !1 : e.toString() === `[object ${t}]`;
	}
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
function PD(e) {
	if (ZE(e)) return e;
	if (Array.isArray(e) || SD(e) || e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	let t = Object.getPrototypeOf(e), n = t.constructor;
	if (e instanceof Date || e instanceof Map || e instanceof Set) return new n(e);
	if (e instanceof RegExp) {
		let t = new n(e);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof DataView) return new n(e.buffer.slice(0));
	if (e instanceof Error) {
		let t = new n(e.message);
		return t.stack = e.stack, t.name = e.name, t.cause = e.cause, t;
	}
	return typeof File < "u" && e instanceof File ? new n([e], e.name, {
		type: e.type,
		lastModified: e.lastModified
	}) : typeof e == "object" ? Object.assign(Object.create(t), e) : e;
}
function FD(e, ...t) {
	let n = t.slice(0, -1), r = t[t.length - 1], i = e;
	for (let e = 0; e < n.length; e++) {
		let t = n[e];
		i = ID(i, t, r, /* @__PURE__ */ new Map());
	}
	return i;
}
function ID(e, t, n, r) {
	if (ZE(e) && (e = Object(e)), typeof t != "object" || !t) return e;
	if (r.has(t)) return PD(r.get(t));
	if (r.set(t, e), Array.isArray(t)) {
		t = t.slice();
		for (let e = 0; e < t.length; e++) t[e] = t[e] ?? void 0;
	}
	let i = [...Object.keys(t), ...QE(t)];
	for (let a = 0; a < i.length; a++) {
		let o = i[a], s = t[o], c = e[o];
		if (kD(s) && (s = { ...s }), kD(c) && (c = { ...c }), typeof Buffer < "u" && Buffer.isBuffer(s) && (s = OD(s)), Array.isArray(s)) if (typeof c == "object" && c) {
			let e = [], t = Reflect.ownKeys(c);
			for (let n = 0; n < t.length; n++) {
				let r = t[n];
				e[r] = c[r];
			}
			c = e;
		} else c = [];
		let l = n(c, s, o, e, t, r);
		l == null ? Array.isArray(s) || AD(c) && AD(s) ? e[o] = ID(c, s, n, r) : c == null && ND(s) ? e[o] = ID({}, s, n, r) : c == null && MD(s) ? e[o] = OD(s) : (c === void 0 || s !== void 0) && (e[o] = s) : e[o] = l;
	}
	return e;
}
function LD(e, ...t) {
	return FD(e, ...t, jD);
}
var RD = Object.defineProperty, zD = Object.defineProperties, BD = Object.getOwnPropertyDescriptors, VD = Object.getOwnPropertySymbols, HD = Object.prototype.hasOwnProperty, UD = Object.prototype.propertyIsEnumerable, WD = (e, t, n) => t in e ? RD(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, GD = (e, t) => {
	for (var n in t || (t = {})) HD.call(t, n) && WD(e, n, t[n]);
	if (VD) for (var n of VD(t)) UD.call(t, n) && WD(e, n, t[n]);
	return e;
}, KD = (e, t) => zD(e, BD(t));
function qD(e, t, n) {
	let r = fd(e);
	return t.rpcMap?.[r.reference] || `${qE}?chainId=${r.namespace}:${r.reference}&projectId=${n}`;
}
function JD(e) {
	return e.includes(":") ? e.split(":")[1] : e;
}
function YD(e) {
	return e.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function XD(e, t) {
	let n = Object.keys(t.namespaces).filter((t) => t.includes(e));
	if (!n.length) return [];
	let r = [];
	return n.forEach((e) => {
		let n = t.namespaces[e].accounts;
		r.push(...n);
	}), r;
}
function ZD(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => t?.chains?.length && t?.chains?.length > 0));
}
function QD(e = {}, t = {}) {
	return LD(ZD($D(e)), ZD($D(t)));
}
function $D(e) {
	let t = {};
	if (!Bv(e)) return t;
	for (let [n, r] of Object.entries(e)) {
		let e = jv(n) ? [n] : r.chains, i = r.methods || [], a = r.events || [], o = r.rpcMap || {}, s = Mv(n);
		t[s] = KD(GD(GD({}, t[s]), r), {
			chains: Xd(e, t[s]?.chains),
			methods: Xd(i, t[s]?.methods),
			events: Xd(a, t[s]?.events)
		}), (Bv(o) || Bv(t[s]?.rpcMap || {})) && (t[s].rpcMap = GD(GD({}, o), t[s]?.rpcMap));
	}
	return t;
}
function eO(e) {
	return e.includes(":") ? e.split(":")[2] : e;
}
function tO(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		let e = r.methods || [], i = r.events || [], a = r.accounts || [];
		t[n] = {
			chains: jv(n) ? [n] : r.chains ? r.chains : YD(r.accounts),
			methods: e,
			events: i,
			accounts: a
		};
	}
	return t;
}
function nO(e) {
	return typeof e == "number" ? e : e.includes("0x") ? parseInt(e, 16) : (e = e.includes(":") ? e.split(":")[1] : e, isNaN(Number(e)) ? e : Number(e));
}
var rO = {}, $ = (e) => rO[e], iO = (e, t) => {
	rO[e] = t;
}, aO = Object.defineProperty, oO = Object.getOwnPropertySymbols, sO = Object.prototype.hasOwnProperty, cO = Object.prototype.propertyIsEnumerable, lO = (e, t, n) => t in e ? aO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, uO = (e, t) => {
	for (var n in t || (t = {})) sO.call(t, n) && lO(e, n, t[n]);
	if (oO) for (var n of oO(t)) cO.call(t, n) && lO(e, n, t[n]);
	return e;
}, dO = "eip155", fO = [
	"atomic",
	"flow-control",
	"paymasterService",
	"sessionKeys",
	"auxiliaryFunds"
], pO = (e) => e && e.startsWith("0x") ? BigInt(e).toString(10) : e, mO = (e) => e && e.startsWith("0x") ? e : `0x${BigInt(e).toString(16)}`, hO = (e) => Object.keys(e).filter((e) => fO.includes(e)).reduce((t, n) => (t[n] = e[n], t), {}), gO = (e, t, n) => {
	let { sessionProperties: r = {}, scopedProperties: i = {} } = e, a = {};
	if (!Bv(i) && !Bv(r)) return;
	let o = hO(r);
	for (let e of n) {
		let n = pO(e);
		if (!n) continue;
		a[mO(n)] = o;
		let r = i?.[`${dO}:${n}`];
		if (r) {
			let e = r?.[`${dO}:${n}:${t}`];
			a[mO(n)] = uO(uO({}, a[mO(n)]), hO(e || r));
		}
	}
	for (let [e, t] of Object.entries(a)) Object.keys(t).length === 0 && delete a[e];
	return Object.keys(a).length > 0 ? a : void 0;
}, _O = Object.defineProperty, vO = (e, t, n) => t in e ? _O(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, yO = (e, t, n) => vO(e, typeof t == "symbol" ? t : t + "", n), bO = class {
	constructor(e) {
		yO(this, "name", "polkadot"), yO(this, "client"), yO(this, "httpProviders"), yO(this, "events"), yO(this, "namespace"), yO(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e && e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = JD(t);
			e[n] = this.createHttpProvider(n, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, xO = Object.defineProperty, SO = Object.defineProperties, CO = Object.getOwnPropertyDescriptors, wO = Object.getOwnPropertySymbols, TO = Object.prototype.hasOwnProperty, EO = Object.prototype.propertyIsEnumerable, DO = (e, t, n) => t in e ? xO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, OO = (e, t) => {
	for (var n in t || (t = {})) TO.call(t, n) && DO(e, n, t[n]);
	if (wO) for (var n of wO(t)) EO.call(t, n) && DO(e, n, t[n]);
	return e;
}, kO = (e, t) => SO(e, CO(t)), AO = (e, t, n) => DO(e, typeof t == "symbol" ? t : t + "", n), jO = class {
	constructor(e) {
		AO(this, "name", "eip155"), AO(this, "client"), AO(this, "chainId"), AO(this, "namespace"), AO(this, "httpProviders"), AO(this, "events"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
	}
	async request(e) {
		switch (e.request.method) {
			case "eth_requestAccounts": return this.getAccounts();
			case "eth_accounts": return this.getAccounts();
			case "wallet_switchEthereumChain": return await this.handleSwitchChain(e);
			case "eth_chainId": return parseInt(this.getDefaultChain());
			case "wallet_getCapabilities": return await this.getCapabilities(e);
			case "wallet_getCallsStatus": return await this.getCallStatus(e);
		}
		return this.namespace.methods.includes(e.request.method) ? await this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(parseInt(e), t), this.chainId = parseInt(e), this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId.toString();
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	createHttpProvider(e, t) {
		let n = t || qD(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = parseInt(JD(t));
			e[n] = this.createHttpProvider(n, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	getHttpProvider() {
		let e = this.chainId, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	async handleSwitchChain(e) {
		let t = e.request.params ? e.request.params[0]?.chainId : "0x0";
		t = t.startsWith("0x") ? t : `0x${t}`;
		let n = parseInt(t, 16);
		if (this.isChainApproved(n)) this.setDefaultChain(`${n}`);
		else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({
			topic: e.topic,
			request: {
				method: e.request.method,
				params: [{ chainId: t }]
			},
			chainId: this.namespace.chains?.[0]
		}), this.setDefaultChain(`${n}`);
		else throw Error(`Failed to switch to chain 'eip155:${n}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
		return null;
	}
	isChainApproved(e) {
		return this.namespace.chains.includes(`${this.name}:${e}`);
	}
	async getCapabilities(e) {
		let t = e.request?.params?.[0], n = e.request?.params?.[1] || [];
		if (!t) throw Error("Missing address parameter in `wallet_getCapabilities` request");
		let r = this.client.session.get(e.topic), i = r?.sessionProperties?.capabilities || {}, a = `${t}${n.join(",")}`, o = i?.[a];
		if (o) return o;
		let s;
		try {
			s = gO(r, t, n);
		} catch (e) {
			console.warn("Failed to extract capabilities from session", e);
		}
		if (s) return s;
		let c = await this.client.request(e);
		try {
			await this.client.session.update(e.topic, { sessionProperties: kO(OO({}, r.sessionProperties || {}), { capabilities: kO(OO({}, i || {}), { [a]: c }) }) });
		} catch (e) {
			console.warn("Failed to update session with capabilities", e);
		}
		return c;
	}
	async getCallStatus(e) {
		let t = this.client.session.get(e.topic), n = t.sessionProperties?.bundler_name;
		if (n) {
			let t = this.getBundlerUrl(e.chainId, n);
			try {
				return await this.getUserOperationReceipt(t, e);
			} catch (e) {
				console.warn("Failed to fetch call status from bundler", e, t);
			}
		}
		let r = t.sessionProperties?.bundler_url;
		if (r) try {
			return await this.getUserOperationReceipt(r, e);
		} catch (e) {
			console.warn("Failed to fetch call status from custom bundler", e, r);
		}
		if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
		throw Error("Fetching call status not approved by the wallet.");
	}
	async getUserOperationReceipt(e, t) {
		let n = new URL(e), r = await fetch(n, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(fb("eth_getUserOperationReceipt", [t.request.params?.[0]]))
		});
		if (!r.ok) throw Error(`Failed to fetch user operation receipt - ${r.status}`);
		return await r.json();
	}
	getBundlerUrl(e, t) {
		return `${YE}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
	}
}, MO = Object.defineProperty, NO = (e, t, n) => t in e ? MO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, PO = (e, t, n) => NO(e, typeof t == "symbol" ? t : t + "", n), FO = class {
	constructor(e) {
		PO(this, "name", "solana"), PO(this, "client"), PO(this, "httpProviders"), PO(this, "events"), PO(this, "namespace"), PO(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = JD(t);
			e[n] = this.createHttpProvider(n, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, IO = Object.defineProperty, LO = (e, t, n) => t in e ? IO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, RO = (e, t, n) => LO(e, typeof t == "symbol" ? t : t + "", n), zO = class {
	constructor(e) {
		RO(this, "name", "cosmos"), RO(this, "client"), RO(this, "httpProviders"), RO(this, "events"), RO(this, "namespace"), RO(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = JD(t);
			e[n] = this.createHttpProvider(n, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, BO = Object.defineProperty, VO = (e, t, n) => t in e ? BO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, HO = (e, t, n) => VO(e, typeof t == "symbol" ? t : t + "", n), UO = class {
	constructor(e) {
		HO(this, "name", "algorand"), HO(this, "client"), HO(this, "httpProviders"), HO(this, "events"), HO(this, "namespace"), HO(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		if (!this.httpProviders[e]) {
			let n = t || qD(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
			if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
			this.setHttpProvider(e, n);
		}
		this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			e[t] = this.createHttpProvider(t, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		return typeof n > "u" ? void 0 : new zb(new UE(n, $("disableProviderPing")));
	}
}, WO = Object.defineProperty, GO = (e, t, n) => t in e ? WO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, KO = (e, t, n) => GO(e, typeof t == "symbol" ? t : t + "", n), qO = class {
	constructor(e) {
		KO(this, "name", "cip34"), KO(this, "client"), KO(this, "httpProviders"), KO(this, "events"), KO(this, "namespace"), KO(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = this.getCardanoRPCUrl(t), r = JD(t);
			e[r] = this.createHttpProvider(r, n);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	getCardanoRPCUrl(e) {
		let t = this.namespace.rpcMap;
		if (t) return t[e];
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || this.getCardanoRPCUrl(e);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, JO = Object.defineProperty, YO = (e, t, n) => t in e ? JO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, XO = (e, t, n) => YO(e, typeof t == "symbol" ? t : t + "", n), ZO = class {
	constructor(e) {
		XO(this, "name", "elrond"), XO(this, "client"), XO(this, "httpProviders"), XO(this, "events"), XO(this, "namespace"), XO(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = JD(t);
			e[n] = this.createHttpProvider(n, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, QO = Object.defineProperty, $O = (e, t, n) => t in e ? QO(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ek = (e, t, n) => $O(e, typeof t == "symbol" ? t : t + "", n), tk = class {
	constructor(e) {
		ek(this, "name", "multiversx"), ek(this, "client"), ek(this, "httpProviders"), ek(this, "events"), ek(this, "namespace"), ek(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			let n = JD(t);
			e[n] = this.createHttpProvider(n, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, nk = Object.defineProperty, rk = (e, t, n) => t in e ? nk(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ik = (e, t, n) => rk(e, typeof t == "symbol" ? t : t + "", n), ak = class {
	constructor(e) {
		ik(this, "name", "near"), ik(this, "client"), ik(this, "httpProviders"), ik(this, "events"), ik(this, "namespace"), ik(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		if (this.chainId = e, !this.httpProviders[e]) {
			let n = t || qD(`${this.name}:${e}`, this.namespace);
			if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
			this.setHttpProvider(e, n);
		}
		this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e && e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			e[t] = this.createHttpProvider(t, this.namespace.rpcMap?.[t]);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace);
		return typeof n > "u" ? void 0 : new zb(new UE(n, $("disableProviderPing")));
	}
}, ok = Object.defineProperty, sk = (e, t, n) => t in e ? ok(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ck = (e, t, n) => sk(e, typeof t == "symbol" ? t : t + "", n), lk = class {
	constructor(e) {
		ck(this, "name", "tezos"), ck(this, "client"), ck(this, "httpProviders"), ck(this, "events"), ck(this, "namespace"), ck(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace = Object.assign(this.namespace, e);
	}
	requestAccounts() {
		return this.getAccounts();
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
	}
	setDefaultChain(e, t) {
		if (this.chainId = e, !this.httpProviders[e]) {
			let n = t || qD(`${this.name}:${e}`, this.namespace);
			if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
			this.setHttpProvider(e, n);
		}
		this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e && e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [];
	}
	createHttpProviders() {
		let e = {};
		return this.namespace.chains.forEach((t) => {
			e[t] = this.createHttpProvider(t);
		}), e;
	}
	getHttpProvider() {
		let e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace);
		return typeof n > "u" ? void 0 : new zb(new UE(n));
	}
}, uk = Object.defineProperty, dk = (e, t, n) => t in e ? uk(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, fk = (e, t, n) => dk(e, typeof t == "symbol" ? t : t + "", n), pk = class {
	constructor(e) {
		fk(this, "name", JE), fk(this, "client"), fk(this, "httpProviders"), fk(this, "events"), fk(this, "namespace"), fk(this, "chainId"), this.namespace = e.namespace, this.events = $("events"), this.client = $("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
	}
	updateNamespace(e) {
		this.namespace.chains = [...new Set((this.namespace.chains || []).concat(e.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(e.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(e.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(e.events || []))], this.httpProviders = this.createHttpProviders();
	}
	requestAccounts() {
		return this.getAccounts();
	}
	request(e) {
		return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider(e.chainId).request(e.request);
	}
	setDefaultChain(e, t) {
		this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(XE.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
	}
	getDefaultChain() {
		if (this.chainId) return this.chainId;
		if (this.namespace.defaultChain) return this.namespace.defaultChain;
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return e.split(":")[1];
	}
	getNamespaceName() {
		let e = this.namespace.chains[0];
		if (!e) throw Error("ChainId not found");
		return fd(e).namespace;
	}
	getAccounts() {
		let e = this.namespace.accounts;
		return e ? [...new Set(e.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
	}
	createHttpProviders() {
		var e;
		let t = {};
		return (e = this.namespace?.accounts) == null || e.forEach((e) => {
			let n = fd(e);
			t[n.reference] = this.createHttpProvider(e);
		}), t;
	}
	getHttpProvider(e) {
		let t = this.httpProviders[e];
		if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
		return t;
	}
	setHttpProvider(e, t) {
		let n = this.createHttpProvider(e, t);
		n && (this.httpProviders[e] = n);
	}
	createHttpProvider(e, t) {
		let n = t || qD(e, this.namespace, this.client.core.projectId);
		if (!n) throw Error(`No RPC url provided for chainId: ${e}`);
		return new zb(new UE(n, $("disableProviderPing")));
	}
}, mk = Object.defineProperty, hk = Object.defineProperties, gk = Object.getOwnPropertyDescriptors, _k = Object.getOwnPropertySymbols, vk = Object.prototype.hasOwnProperty, yk = Object.prototype.propertyIsEnumerable, bk = (e, t, n) => t in e ? mk(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, xk = (e, t) => {
	for (var n in t || (t = {})) vk.call(t, n) && bk(e, n, t[n]);
	if (_k) for (var n of _k(t)) yk.call(t, n) && bk(e, n, t[n]);
	return e;
}, Sk = (e, t) => hk(e, gk(t)), Ck = (e, t, n) => bk(e, typeof t == "symbol" ? t : t + "", n), wk = class e {
	constructor(e) {
		Ck(this, "client"), Ck(this, "namespaces"), Ck(this, "optionalNamespaces"), Ck(this, "sessionProperties"), Ck(this, "scopedProperties"), Ck(this, "events", new We.default()), Ck(this, "rpcProviders", {}), Ck(this, "session"), Ck(this, "providerOpts"), Ck(this, "logger"), Ck(this, "uri"), Ck(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, w.default)(x({ level: e?.logger || WE })), this.disableProviderPing = e?.disableProviderPing || !1;
	}
	static async init(t) {
		let n = new e(t);
		return await n.initialize(), n;
	}
	async request(e, t, n) {
		let [r, i] = this.validateChain(t);
		if (!this.session) throw Error("Please call connect() before request()");
		return await this.getProvider(r).request({
			request: xk({}, e),
			chainId: `${r}:${i}`,
			topic: this.session.topic,
			expiry: n
		});
	}
	sendAsync(e, t, n, r) {
		let i = (/* @__PURE__ */ new Date()).getTime();
		this.request(e, n, r).then((e) => t(null, pb(i, e))).catch((e) => t(e, void 0));
	}
	async enable() {
		if (!this.client) throw Error("Sign Client not initialized");
		return this.session || await this.connect({
			namespaces: this.namespaces,
			optionalNamespaces: this.optionalNamespaces,
			sessionProperties: this.sessionProperties,
			scopedProperties: this.scopedProperties
		}), await this.requestAccounts();
	}
	async disconnect() {
		if (!this.session) throw Error("Please call connect() before enable()");
		await this.client.disconnect({
			topic: this.session?.topic,
			reason: W("USER_DISCONNECTED")
		}), await this.cleanup();
	}
	async connect(e) {
		if (!this.client) throw Error("Sign Client not initialized");
		if (this.setNamespaces(e), this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
	}
	async authenticate(e, t) {
		if (!this.client) throw Error("Sign Client not initialized");
		this.setNamespaces(e), await this.cleanupPendingPairings();
		let { uri: n, response: r } = await this.client.authenticate(e, t);
		n && (this.uri = n, this.events.emit("display_uri", n));
		let i = await r();
		if (this.session = i.session, this.session) {
			let e = tO(this.session.namespaces);
			this.namespaces = QD(this.namespaces, e), await this.persist("namespaces", this.namespaces), this.onConnect();
		}
		return i;
	}
	on(e, t) {
		this.events.on(e, t);
	}
	once(e, t) {
		this.events.once(e, t);
	}
	removeListener(e, t) {
		this.events.removeListener(e, t);
	}
	off(e, t) {
		this.events.off(e, t);
	}
	get isWalletConnect() {
		return !0;
	}
	async pair(e) {
		let { uri: t, approval: n } = await this.client.connect({
			pairingTopic: e,
			requiredNamespaces: this.namespaces,
			optionalNamespaces: this.optionalNamespaces,
			sessionProperties: this.sessionProperties,
			scopedProperties: this.scopedProperties
		});
		t && (this.uri = t, this.events.emit("display_uri", t));
		let r = await n();
		this.session = r;
		let i = tO(r.namespaces);
		return this.namespaces = QD(this.namespaces, i), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
	}
	setDefaultChain(e, t) {
		try {
			if (!this.session) return;
			let [n, r] = this.validateChain(e);
			this.getProvider(n).setDefaultChain(r, t);
		} catch (e) {
			if (!/Please call connect/.test(e.message)) throw e;
		}
	}
	async cleanupPendingPairings(e = {}) {
		try {
			this.logger.info("Cleaning up inactive pairings...");
			let t = this.client.pairing.getAll();
			if (!zv(t)) return;
			for (let n of t) e.deletePairings ? this.client.core.expirer.set(n.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(n.topic);
			this.logger.info(`Inactive pairings cleared: ${t.length}`);
		} catch (e) {
			this.logger.warn("Failed to cleanup pending pairings", e);
		}
	}
	abortPairingAttempt() {
		this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
	}
	async checkStorage() {
		this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
	}
	async initialize() {
		this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
	}
	async createClient() {
		if (this.client = this.providerOpts.client || await AE.init({
			core: this.providerOpts.core,
			logger: this.providerOpts.logger || WE,
			relayUrl: this.providerOpts.relayUrl || GE,
			projectId: this.providerOpts.projectId,
			metadata: this.providerOpts.metadata,
			storageOptions: this.providerOpts.storageOptions,
			storage: this.providerOpts.storage,
			name: this.providerOpts.name,
			customStoragePrefix: this.providerOpts.customStoragePrefix,
			telemetryEnabled: this.providerOpts.telemetryEnabled
		}), this.providerOpts.session) try {
			this.session = this.client.session.get(this.providerOpts.session.topic);
		} catch (e) {
			throw this.logger.error("Failed to get session", e), /* @__PURE__ */ Error(`The provided session: ${this.providerOpts?.session?.topic} doesn't exist in the Sign client`);
		}
		else this.session = this.client.session.getAll()[0];
		this.logger.trace("SignClient Initialized");
	}
	createProviders() {
		if (!this.client) throw Error("Sign Client not initialized");
		if (!this.session) throw Error("Session not initialized. Please call connect() before enable()");
		let e = [...new Set(Object.keys(this.session.namespaces).map((e) => Mv(e)))];
		iO("client", this.client), iO("events", this.events), iO("disableProviderPing", this.disableProviderPing), e.forEach((e) => {
			if (!this.session) return;
			let t = XD(e, this.session);
			if (t?.length === 0) return;
			let n = YD(t), r = Sk(xk({}, QD(this.namespaces, this.optionalNamespaces)[e]), {
				accounts: t,
				chains: n
			});
			switch (e) {
				case "eip155":
					this.rpcProviders[e] = new jO({ namespace: r });
					break;
				case "algorand":
					this.rpcProviders[e] = new UO({ namespace: r });
					break;
				case "solana":
					this.rpcProviders[e] = new FO({ namespace: r });
					break;
				case "cosmos":
					this.rpcProviders[e] = new zO({ namespace: r });
					break;
				case "polkadot":
					this.rpcProviders[e] = new bO({ namespace: r });
					break;
				case "cip34":
					this.rpcProviders[e] = new qO({ namespace: r });
					break;
				case "elrond":
					this.rpcProviders[e] = new ZO({ namespace: r });
					break;
				case "multiversx":
					this.rpcProviders[e] = new tk({ namespace: r });
					break;
				case "near":
					this.rpcProviders[e] = new ak({ namespace: r });
					break;
				case "tezos":
					this.rpcProviders[e] = new lk({ namespace: r });
					break;
				default: this.rpcProviders[e] = new pk({ namespace: r });
			}
		});
	}
	registerEventListeners() {
		if (typeof this.client > "u") throw Error("Sign Client is not initialized");
		this.client.on("session_ping", (e) => {
			let { topic: t } = e;
			t === this.session?.topic && this.events.emit("session_ping", e);
		}), this.client.on("session_event", (e) => {
			let { params: t, topic: n } = e;
			if (n !== this.session?.topic) return;
			let { event: r } = t;
			if (r.name === "accountsChanged") {
				let e = r.data;
				e && zv(e) && this.events.emit("accountsChanged", e.map(eO));
			} else if (r.name === "chainChanged") {
				let e = t.chainId, n = t.event.data, r = Mv(e), i = nO(e) === nO(n) ? e : `${r}:${nO(n)}`;
				this.onChainChanged(i);
			} else this.events.emit(r.name, r.data);
			this.events.emit("session_event", e);
		}), this.client.on("session_update", ({ topic: e, params: t }) => {
			if (e !== this.session?.topic) return;
			let { namespaces: n } = t;
			this.session = Sk(xk({}, this.client?.session.get(e)), { namespaces: n }), this.onSessionUpdate(), this.events.emit("session_update", {
				topic: e,
				params: t
			});
		}), this.client.on("session_delete", async (e) => {
			e.topic === this.session?.topic && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", Sk(xk({}, W("USER_DISCONNECTED")), { data: e.topic })));
		}), this.on(XE.DEFAULT_CHAIN_CHANGED, (e) => {
			this.onChainChanged(e, !0);
		});
	}
	getProvider(e) {
		return this.rpcProviders[e] || this.rpcProviders[JE];
	}
	onSessionUpdate() {
		Object.keys(this.rpcProviders).forEach((e) => {
			this.getProvider(e).updateNamespace(this.session?.namespaces[e]);
		});
	}
	setNamespaces(e) {
		let { namespaces: t = {}, optionalNamespaces: n = {}, sessionProperties: r, scopedProperties: i } = e;
		this.optionalNamespaces = QD(t, n), this.sessionProperties = r, this.scopedProperties = i;
	}
	validateChain(e) {
		let [t, n] = e?.split(":") || ["", ""];
		if (!this.namespaces || !Object.keys(this.namespaces).length) return [t, n];
		if (t && !Object.keys(this.namespaces || {}).map((e) => Mv(e)).includes(t)) throw Error(`Namespace '${t}' is not configured. Please call connect() first with namespace config.`);
		if (t && n) return [t, n];
		let r = Mv(Object.keys(this.namespaces)[0]);
		return [r, this.rpcProviders[r].getDefaultChain()];
	}
	async requestAccounts() {
		let [e] = this.validateChain();
		return await this.getProvider(e).requestAccounts();
	}
	async onChainChanged(e, t = !1) {
		if (!this.namespaces) return;
		let [n, r] = this.validateChain(e);
		if (!r) return;
		this.updateNamespaceChain(n, r);
		let i = this.getProvider(n).getDefaultChain();
		t ? (this.events.emit("chainChanged", r), this.emitAccountsChangedOnChainChange({
			namespace: n,
			previousChainId: i,
			newChainId: e
		})) : this.getProvider(n).setDefaultChain(r), await this.persist("namespaces", this.namespaces);
	}
	emitAccountsChangedOnChainChange({ namespace: e, previousChainId: t, newChainId: n }) {
		try {
			if (t === n) return;
			let r = this.session?.namespaces[e]?.accounts;
			if (!r) return;
			let i = r.filter((e) => e.includes(`${n}:`)).map(eO);
			if (!zv(i)) return;
			this.events.emit("accountsChanged", i);
		} catch (e) {
			this.logger.warn("Failed to emit accountsChanged on chain change", e);
		}
	}
	updateNamespaceChain(e, t) {
		if (!this.namespaces) return;
		let n = this.namespaces[e] ? e : `${e}:${t}`, r = {
			chains: [],
			methods: [],
			events: [],
			defaultChain: t
		};
		this.namespaces[n] ? this.namespaces[n] && (this.namespaces[n].defaultChain = t) : this.namespaces[n] = r;
	}
	onConnect() {
		this.createProviders(), this.events.emit("connect", { session: this.session });
	}
	async cleanup() {
		this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, this.cleanupPendingPairings({ deletePairings: !0 }), await this.cleanupStorage();
	}
	async persist(e, t) {
		let n = this.session?.topic || "";
		await this.client.core.storage.setItem(`${KE}/${e}${n}`, t);
	}
	async getFromStore(e) {
		let t = this.session?.topic || "";
		return await this.client.core.storage.getItem(`${KE}/${e}${t}`);
	}
	async deleteFromStore(e) {
		let t = this.session?.topic || "";
		await this.client.core.storage.removeItem(`${KE}/${e}${t}`);
	}
	async cleanupStorage() {
		try {
			if (this.client?.session.length > 0) return;
			let e = await this.client.core.storage.getKeys();
			for (let t of e) t.startsWith(KE) && await this.client.core.storage.removeItem(t);
		} catch (e) {
			this.logger.warn("Failed to cleanup storage", e);
		}
	}
}, Tk = wk, Ek = null, Dk = {
	getSIWX() {
		return c.state.siwx;
	},
	async initializeIfEnabled(e = _.getActiveCaipAddress()) {
		let t = c.state.siwx;
		if (!(t && e)) return;
		let [n, r, i] = e.split(":");
		if (_.checkIfSupportedNetwork(n, `${n}:${r}`)) try {
			if (c.state.remoteFeatures?.emailCapture) {
				let e = _.getAccountData(n)?.user;
				await v.open({
					view: "DataCapture",
					data: { email: e?.email ?? void 0 }
				});
				return;
			}
			if (Ek && await Ek, (await t.getSessions(`${n}:${r}`, i)).length) return;
			await v.open({ view: "SIWXSignMessage" });
		} catch (e) {
			console.error("SIWXUtil:initializeIfEnabled", e), u.sendEvent({
				type: "track",
				event: "SIWX_AUTH_ERROR",
				properties: this.getSIWXEventProperties()
			}), await p._getClient()?.disconnect().catch(console.error), f.reset("Connect"), h.showError("A problem occurred while trying initialize authentication");
		}
	},
	async requestSignMessage() {
		let e = c.state.siwx, t = l.getPlainAddress(_.getActiveCaipAddress()), n = m(), r = p._getClient();
		if (!e) throw Error("SIWX is not enabled");
		if (!t) throw Error("No ActiveCaipAddress found");
		if (!n) throw Error("No ActiveCaipNetwork or client found");
		if (!r) throw Error("No ConnectionController client found");
		try {
			let i = await e.createMessage({
				chainId: n.caipNetworkId,
				accountAddress: t
			}), a = i.toString();
			y.getConnectorId(n.chainNamespace) === s.CONNECTOR_ID.AUTH && f.pushTransactionStack({});
			let o = await r.signMessage(a);
			await e.addSession({
				data: i,
				message: a,
				signature: o
			}), _.setLastConnectedSIWECaipNetwork(n), v.close(), u.sendEvent({
				type: "track",
				event: "SIWX_AUTH_SUCCESS",
				properties: this.getSIWXEventProperties()
			});
		} catch (e) {
			let t = this.getSIWXEventProperties();
			(!v.state.open || f.state.view === "ApproveTransaction") && await v.open({ view: "SIWXSignMessage" }), h.showError("Error signing message"), u.sendEvent({
				type: "track",
				event: "SIWX_AUTH_ERROR",
				properties: t
			}), console.error("SWIXUtil:requestSignMessage", e);
		}
	},
	async cancelSignMessage() {
		try {
			let e = this.getSIWX();
			if (e?.getRequired?.()) {
				let t = _.getLastConnectedSIWECaipNetwork();
				if (t) {
					let n = await e?.getSessions(t?.caipNetworkId, l.getPlainAddress(_.getActiveCaipAddress()) || "");
					n && n.length > 0 ? await _.switchActiveNetwork(t) : await p.disconnect();
				} else await p.disconnect();
			} else v.close();
			v.close(), u.sendEvent({
				event: "CLICK_CANCEL_SIWX",
				type: "track",
				properties: this.getSIWXEventProperties()
			});
		} catch (e) {
			console.error("SIWXUtil:cancelSignMessage", e);
		}
	},
	async getAllSessions() {
		let e = this.getSIWX(), t = _.getAllRequestedCaipNetworks(), n = [];
		return await Promise.all(t.map(async (t) => {
			let r = await e?.getSessions(t.caipNetworkId, l.getPlainAddress(_.getActiveCaipAddress()) || "");
			r && n.push(...r);
		})), n;
	},
	async getSessions(e) {
		let t = c.state.siwx, n = e?.address;
		if (!n) {
			let e = _.getActiveCaipAddress();
			n = l.getPlainAddress(e);
		}
		let r = e?.caipNetworkId;
		return r || (r = _.getActiveCaipNetwork()?.caipNetworkId), t && n && r ? t.getSessions(r, n) : [];
	},
	async isSIWXCloseDisabled() {
		let e = this.getSIWX();
		if (e) {
			let t = f.state.view === "ApproveTransaction", n = f.state.view === "SIWXSignMessage";
			if (t || n) return e.getRequired?.() && (await this.getSessions()).length === 0;
		}
		return !1;
	},
	async authConnectorAuthenticate({ authConnector: e, chainId: t, socialUri: n, preferredAccountType: r, chainNamespace: i }) {
		let a = Dk.getSIWX(), o = m();
		if (!a || !i.includes(s.CHAIN.EVM) || c.state.remoteFeatures?.emailCapture) {
			let i = await e.connect({
				chainId: t,
				socialUri: n,
				preferredAccountType: r
			});
			return {
				address: i.address,
				chainId: i.chainId,
				accounts: i.accounts
			};
		}
		let l = `${i}:${t}`, u = await a.createMessage({
			chainId: l,
			accountAddress: "<<AccountAddress>>"
		}), d = {
			accountAddress: u.accountAddress,
			chainId: u.chainId,
			domain: u.domain,
			uri: u.uri,
			version: u.version,
			nonce: u.nonce,
			notBefore: u.notBefore,
			statement: u.statement,
			resources: u.resources,
			requestId: u.requestId,
			issuedAt: u.issuedAt,
			expirationTime: u.expirationTime,
			serializedMessage: u.toString()
		}, f = await e.connect({
			chainId: t,
			socialUri: n,
			siwxMessage: d,
			preferredAccountType: r
		});
		return d.accountAddress = f.address, d.serializedMessage = f.message || "", f.signature && f.message && await Dk.addEmbeddedWalletSession(d, f.message, f.signature), _.setLastConnectedSIWECaipNetwork(o), {
			address: f.address,
			chainId: f.chainId,
			accounts: f.accounts
		};
	},
	async addEmbeddedWalletSession(e, t, n) {
		if (Ek) return Ek;
		let r = Dk.getSIWX();
		return r ? (Ek = r.addSession({
			data: e,
			message: t,
			signature: n
		}).finally(() => {
			Ek = null;
		}), Ek) : Promise.resolve();
	},
	async universalProviderAuthenticate({ universalProvider: e, chains: t, methods: n }) {
		let r = Dk.getSIWX(), i = m(), a = new Set(t.map((e) => e.split(":")[0]));
		if (!r || a.size !== 1 || !a.has("eip155")) return !1;
		let o = await r.createMessage({
			chainId: m()?.caipNetworkId || "",
			accountAddress: ""
		}), s = await e.authenticate({
			nonce: o.nonce,
			domain: o.domain,
			uri: o.uri,
			exp: o.expirationTime,
			iat: o.issuedAt,
			nbf: o.notBefore,
			requestId: o.requestId,
			version: o.version,
			resources: o.resources,
			statement: o.statement,
			chainId: o.chainId,
			methods: n,
			chains: [o.chainId, ...t.filter((e) => e !== o.chainId)]
		});
		if (h.showLoading("Authenticating...", { autoClose: !1 }), g.setConnectedWalletInfo({
			...s.session.peer.metadata,
			name: s.session.peer.metadata.name,
			icon: s.session.peer.metadata.icons?.[0],
			type: "WALLET_CONNECT"
		}, Array.from(a)[0]), s?.auths?.length) {
			let t = s.auths.map((t) => {
				let n = e.client.formatAuthMessage({
					request: t.p,
					iss: t.p.iss
				});
				return {
					data: {
						...t.p,
						accountAddress: t.p.iss.split(":").slice(-1).join(""),
						chainId: t.p.iss.split(":").slice(2, 4).join(":"),
						uri: t.p.aud,
						version: t.p.version || o.version,
						expirationTime: t.p.exp,
						issuedAt: t.p.iat,
						notBefore: t.p.nbf
					},
					message: n,
					signature: t.s.s,
					cacao: t
				};
			});
			try {
				await r.setSessions(t), i && _.setLastConnectedSIWECaipNetwork(i), u.sendEvent({
					type: "track",
					event: "SIWX_AUTH_SUCCESS",
					properties: Dk.getSIWXEventProperties()
				});
			} catch (t) {
				throw console.error("SIWX:universalProviderAuth - failed to set sessions", t), u.sendEvent({
					type: "track",
					event: "SIWX_AUTH_ERROR",
					properties: Dk.getSIWXEventProperties()
				}), await e.disconnect().catch(console.error), t;
			} finally {
				h.hide();
			}
		}
		return !0;
	},
	getSIWXEventProperties() {
		let e = _.state.activeChain;
		if (!e) throw Error("SIWXUtil:getSIWXEventProperties - namespace is required");
		return {
			network: _.state.activeCaipNetwork?.caipNetworkId || "",
			isSmartAccount: d(e) === o.ACCOUNT_TYPES.SMART_ACCOUNT
		};
	},
	async clearSessions() {
		let e = this.getSIWX();
		e && await e.setSessions([]);
	}
};
//#endregion
export { qs as a, W as i, wk as n, Tk as r, Dk as t };
