import { R as e } from "./ModalController-DHlkqy_7.js";
import { l as t, u as n } from "./lit-CKWVc9vf.js";
//#region \0rolldown/runtime.js
var r = Object.create, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, s = Object.getPrototypeOf, c = Object.prototype.hasOwnProperty, l = (e, t) => () => (e && (t = e(e = 0)), t), u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), d = (e, t) => {
	let n = {};
	for (var r in e) i(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || i(n, Symbol.toStringTag, { value: "Module" }), n;
}, f = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var s = o(t), l = 0, u = s.length, d; l < u; l++) d = s[l], !c.call(e, d) && d !== n && i(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(r = a(t, d)) || r.enumerable
	});
	return e;
}, p = (e, t, n) => (f(e, t, "default"), n && f(n, t, "default")), m = (e, t, n) => (n = e == null ? {} : r(s(e)), f(t || !e || !e.__esModule ? i(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), h = (e) => c.call(e, "module.exports") ? e["module.exports"] : f(i({}, "__esModule", { value: !0 }), e), g = /* @__PURE__ */ u(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs = r();
	})(e, (function() {
		var e = 1e3, t = 6e4, n = 36e5, r = "millisecond", i = "second", a = "minute", o = "hour", s = "day", c = "week", l = "month", u = "quarter", d = "year", f = "date", p = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		}, _ = function(e, t, n) {
			var r = String(e);
			return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e;
		}, v = {
			s: _,
			z: function(e) {
				var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), i = n % 60;
				return (t <= 0 ? "+" : "-") + _(r, 2, "0") + ":" + _(i, 2, "0");
			},
			m: function e(t, n) {
				if (t.date() < n.date()) return -e(n, t);
				var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), i = t.clone().add(r, l), a = n - i < 0, o = t.clone().add(r + (a ? -1 : 1), l);
				return +(-(r + (n - i) / (a ? i - o : o - i)) || 0);
			},
			a: function(e) {
				return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
			},
			p: function(e) {
				return {
					M: l,
					y: d,
					w: c,
					d: s,
					D: f,
					h: o,
					m: a,
					s: i,
					ms: r,
					Q: u
				}[e] || String(e || "").toLowerCase().replace(/s$/, "");
			},
			u: function(e) {
				return e === void 0;
			}
		}, y = "en", b = {};
		b[y] = g;
		var x = "$isDayjsObject", S = function(e) {
			return e instanceof E || !(!e || !e[x]);
		}, C = function e(t, n, r) {
			var i;
			if (!t) return y;
			if (typeof t == "string") {
				var a = t.toLowerCase();
				b[a] && (i = a), n && (b[a] = n, i = a);
				var o = t.split("-");
				if (!i && o.length > 1) return e(o[0]);
			} else {
				var s = t.name;
				b[s] = t, i = s;
			}
			return !r && i && (y = i), i || !r && y;
		}, w = function(e, t) {
			if (S(e)) return e.clone();
			var n = typeof t == "object" ? t : {};
			return n.date = e, n.args = arguments, new E(n);
		}, T = v;
		T.l = C, T.i = S, T.w = function(e, t) {
			return w(e, {
				locale: t.$L,
				utc: t.$u,
				x: t.$x,
				$offset: t.$offset
			});
		};
		var E = function() {
			function g(e) {
				this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[x] = !0;
			}
			var _ = g.prototype;
			return _.parse = function(e) {
				this.$d = function(e) {
					var t = e.date, n = e.utc;
					if (t === null) return /* @__PURE__ */ new Date(NaN);
					if (T.u(t)) return /* @__PURE__ */ new Date();
					if (t instanceof Date) return new Date(t);
					if (typeof t == "string" && !/Z$/i.test(t)) {
						var r = t.match(m);
						if (r) {
							var i = r[2] - 1 || 0, a = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a);
						}
					}
					return new Date(t);
				}(e), this.init();
			}, _.init = function() {
				var e = this.$d;
				this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
			}, _.$utils = function() {
				return T;
			}, _.isValid = function() {
				return this.$d.toString() !== p;
			}, _.isSame = function(e, t) {
				var n = w(e);
				return this.startOf(t) <= n && n <= this.endOf(t);
			}, _.isAfter = function(e, t) {
				return w(e) < this.startOf(t);
			}, _.isBefore = function(e, t) {
				return this.endOf(t) < w(e);
			}, _.$g = function(e, t, n) {
				return T.u(e) ? this[t] : this.set(n, e);
			}, _.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, _.valueOf = function() {
				return this.$d.getTime();
			}, _.startOf = function(e, t) {
				var n = this, r = !!T.u(t) || t, u = T.p(e), p = function(e, t) {
					var i = T.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
					return r ? i : i.endOf(s);
				}, m = function(e, t) {
					return T.w(n.toDate()[e].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(t)), n);
				}, h = this.$W, g = this.$M, _ = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (u) {
					case d: return r ? p(1, 0) : p(31, 11);
					case l: return r ? p(1, g) : p(0, g + 1);
					case c:
						var y = this.$locale().weekStart || 0, b = (h < y ? h + 7 : h) - y;
						return p(r ? _ - b : _ + (6 - b), g);
					case s:
					case f: return m(v + "Hours", 0);
					case o: return m(v + "Minutes", 1);
					case a: return m(v + "Seconds", 2);
					case i: return m(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, _.endOf = function(e) {
				return this.startOf(e, !1);
			}, _.$set = function(e, t) {
				var n, c = T.p(e), u = "set" + (this.$u ? "UTC" : ""), p = (n = {}, n[s] = u + "Date", n[f] = u + "Date", n[l] = u + "Month", n[d] = u + "FullYear", n[o] = u + "Hours", n[a] = u + "Minutes", n[i] = u + "Seconds", n[r] = u + "Milliseconds", n)[c], m = c === s ? this.$D + (t - this.$W) : t;
				if (c === l || c === d) {
					var h = this.clone().set(f, 1);
					h.$d[p](m), h.init(), this.$d = h.set(f, Math.min(this.$D, h.daysInMonth())).$d;
				} else p && this.$d[p](m);
				return this.init(), this;
			}, _.set = function(e, t) {
				return this.clone().$set(e, t);
			}, _.get = function(e) {
				return this[T.p(e)]();
			}, _.add = function(r, u) {
				var f, p = this;
				r = Number(r);
				var m = T.p(u), h = function(e) {
					var t = w(p);
					return T.w(t.date(t.date() + Math.round(e * r)), p);
				};
				if (m === l) return this.set(l, this.$M + r);
				if (m === d) return this.set(d, this.$y + r);
				if (m === s) return h(1);
				if (m === c) return h(7);
				var g = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[m] || 1, _ = this.$d.getTime() + r * g;
				return T.w(_, this);
			}, _.subtract = function(e, t) {
				return this.add(-1 * e, t);
			}, _.format = function(e) {
				var t = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || p;
				var r = e || "YYYY-MM-DDTHH:mm:ssZ", i = T.z(this), a = this.$H, o = this.$m, s = this.$M, c = n.weekdays, l = n.months, u = n.meridiem, d = function(e, n, i, a) {
					return e && (e[n] || e(t, r)) || i[n].slice(0, a);
				}, f = function(e) {
					return T.s(a % 12 || 12, e, "0");
				}, m = u || function(e, t, n) {
					var r = e < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(h, (function(e, r) {
					return r || function(e) {
						switch (e) {
							case "YY": return String(t.$y).slice(-2);
							case "YYYY": return T.s(t.$y, 4, "0");
							case "M": return s + 1;
							case "MM": return T.s(s + 1, 2, "0");
							case "MMM": return d(n.monthsShort, s, l, 3);
							case "MMMM": return d(l, s);
							case "D": return t.$D;
							case "DD": return T.s(t.$D, 2, "0");
							case "d": return String(t.$W);
							case "dd": return d(n.weekdaysMin, t.$W, c, 2);
							case "ddd": return d(n.weekdaysShort, t.$W, c, 3);
							case "dddd": return c[t.$W];
							case "H": return String(a);
							case "HH": return T.s(a, 2, "0");
							case "h": return f(1);
							case "hh": return f(2);
							case "a": return m(a, o, !0);
							case "A": return m(a, o, !1);
							case "m": return String(o);
							case "mm": return T.s(o, 2, "0");
							case "s": return String(t.$s);
							case "ss": return T.s(t.$s, 2, "0");
							case "SSS": return T.s(t.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(e) || i.replace(":", "");
				}));
			}, _.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, _.diff = function(r, f, p) {
				var m, h = this, g = T.p(f), _ = w(r), v = (_.utcOffset() - this.utcOffset()) * t, y = this - _, b = function() {
					return T.m(h, _);
				};
				switch (g) {
					case d:
						m = b() / 12;
						break;
					case l:
						m = b();
						break;
					case u:
						m = b() / 3;
						break;
					case c:
						m = (y - v) / 6048e5;
						break;
					case s:
						m = (y - v) / 864e5;
						break;
					case o:
						m = y / n;
						break;
					case a:
						m = y / t;
						break;
					case i:
						m = y / e;
						break;
					default: m = y;
				}
				return p ? m : T.a(m);
			}, _.daysInMonth = function() {
				return this.endOf(l).$D;
			}, _.$locale = function() {
				return b[this.$L];
			}, _.locale = function(e, t) {
				if (!e) return this.$L;
				var n = this.clone(), r = C(e, t, !0);
				return r && (n.$L = r), n;
			}, _.clone = function() {
				return T.w(this.$d, this);
			}, _.toDate = function() {
				return new Date(this.valueOf());
			}, _.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, _.toISOString = function() {
				return this.$d.toISOString();
			}, _.toString = function() {
				return this.$d.toUTCString();
			}, g;
		}(), D = E.prototype;
		return w.prototype = D, [
			["$ms", r],
			["$s", i],
			["$m", a],
			["$H", o],
			["$W", s],
			["$M", l],
			["$y", d],
			["$D", f]
		].forEach((function(e) {
			D[e[1]] = function(t) {
				return this.$g(t, e[0], e[1]);
			};
		})), w.extend = function(e, t) {
			return e.$i || (e(t, E, w), e.$i = !0), w;
		}, w.locale = C, w.isDayjs = S, w.unix = function(e) {
			return w(1e3 * e);
		}, w.en = b[y], w.Ls = b, w.p = {}, w;
	}));
})), _ = /* @__PURE__ */ u(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_locale_en = r();
	})(e, (function() {
		return {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		};
	}));
})), v = /* @__PURE__ */ u(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_relativeTime = r();
	})(e, (function() {
		return function(e, t, n) {
			e = e || {};
			var r = t.prototype, i = {
				future: "in %s",
				past: "%s ago",
				s: "a few seconds",
				m: "a minute",
				mm: "%d minutes",
				h: "an hour",
				hh: "%d hours",
				d: "a day",
				dd: "%d days",
				M: "a month",
				MM: "%d months",
				y: "a year",
				yy: "%d years"
			};
			function a(e, t, n, i) {
				return r.fromToBase(e, t, n, i);
			}
			n.en.relativeTime = i, r.fromToBase = function(t, r, a, o, s) {
				for (var c, l, u, d = a.$locale().relativeTime || i, f = e.thresholds || [
					{
						l: "s",
						r: 44,
						d: "second"
					},
					{
						l: "m",
						r: 89
					},
					{
						l: "mm",
						r: 44,
						d: "minute"
					},
					{
						l: "h",
						r: 89
					},
					{
						l: "hh",
						r: 21,
						d: "hour"
					},
					{
						l: "d",
						r: 35
					},
					{
						l: "dd",
						r: 25,
						d: "day"
					},
					{
						l: "M",
						r: 45
					},
					{
						l: "MM",
						r: 10,
						d: "month"
					},
					{
						l: "y",
						r: 17
					},
					{
						l: "yy",
						d: "year"
					}
				], p = f.length, m = 0; m < p; m += 1) {
					var h = f[m];
					h.d && (c = o ? n(t).diff(a, h.d, !0) : a.diff(t, h.d, !0));
					var g = (e.rounding || Math.round)(Math.abs(c));
					if (u = c > 0, g <= h.r || !h.r) {
						g <= 1 && m > 0 && (h = f[m - 1]);
						var _ = d[h.l];
						s && (g = s("" + g)), l = typeof _ == "string" ? _.replace("%d", g) : _(g, r, h.l, u);
						break;
					}
				}
				if (r) return l;
				var v = u ? d.future : d.past;
				return typeof v == "function" ? v(l) : v.replace("%s", l);
			}, r.to = function(e, t) {
				return a(e, t, this, !0);
			}, r.from = function(e, t) {
				return a(e, t, this);
			};
			var o = function(e) {
				return e.$u ? n.utc() : n();
			};
			r.toNow = function(e) {
				return this.to(o(this), e);
			}, r.fromNow = function(e) {
				return this.from(o(this), e);
			};
		};
	}));
})), y = /* @__PURE__ */ u(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_updateLocale = r();
	})(e, (function() {
		return function(e, t, n) {
			n.updateLocale = function(e, t) {
				var r = n.Ls[e];
				if (r) return (t ? Object.keys(t) : []).forEach((function(e) {
					r[e] = t[e];
				})), r;
			};
		};
	}));
})), b = /* @__PURE__ */ m(g(), 1), x = /* @__PURE__ */ m(_(), 1), S = /* @__PURE__ */ m(v(), 1), C = /* @__PURE__ */ m(y(), 1);
b.default.extend(S.default), b.default.extend(C.default);
var w = {
	...x.default,
	name: "en-web3-modal",
	relativeTime: {
		future: "in %s",
		past: "%s ago",
		s: "%d sec",
		m: "1 min",
		mm: "%d min",
		h: "1 hr",
		hh: "%d hrs",
		d: "1 d",
		dd: "%d d",
		M: "1 mo",
		MM: "%d mo",
		y: "1 yr",
		yy: "%d yr"
	}
}, T = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
b.default.locale("en-web3-modal", w);
var E = {
	getMonthNameByIndex(e) {
		return T[e];
	},
	getYear(e = (/* @__PURE__ */ new Date()).toISOString()) {
		return (0, b.default)(e).year();
	},
	getRelativeDateFromNow(e) {
		return (0, b.default)(e).locale("en-web3-modal").fromNow(!0);
	},
	formatDate(e, t = "DD MMM") {
		return (0, b.default)(e).format(t);
	}
}, D = { interpolate(e, t, n) {
	if (e.length !== 2 || t.length !== 2) throw Error("inputRange and outputRange must be an array of length 2");
	let r = e[0] || 0, i = e[1] || 0, a = t[0] || 0, o = t[1] || 0;
	return n < r ? a : n > i ? o : (o - a) / (i - r) * (n - r) + a;
} }, O = void 0, k = void 0, A = void 0;
function j(e, t) {
	O = document.createElement("style"), k = document.createElement("style"), A = document.createElement("style"), O.textContent = P(e).core.cssText, k.textContent = P(e).dark.cssText, A.textContent = P(e).light.cssText, document.head.appendChild(O), document.head.appendChild(k), document.head.appendChild(A), M(t);
}
function M(e) {
	k && A && (e === "light" ? (k.removeAttribute("media"), A.media = "enabled") : (A.removeAttribute("media"), k.media = "enabled"));
}
function N(e) {
	O && k && A && (O.textContent = P(e).core.cssText, k.textContent = P(e).dark.cssText, A.textContent = P(e).light.cssText);
}
function P(r) {
	return {
		core: t`
      ${r?.["--w3m-font-family"] ? t`` : t`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          `}
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${n(r?.["--w3m-color-mix-strength"] ? `${r["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${n(r?.["--w3m-font-family"] || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${n(r?.["--w3m-font-size-master"] || "10px")};
        --w3m-border-radius-master: ${n(r?.["--w3m-border-radius-master"] || "4px")};
        --w3m-z-index: ${n(r?.["--w3m-z-index"] || 999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,
		light: t`
      :root {
        --w3m-color-mix: ${n(r?.["--w3m-color-mix"] || "#fff")};
        --w3m-accent: ${n(e(r, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${n(e(r, "dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,
		dark: t`
      :root {
        --w3m-color-mix: ${n(r?.["--w3m-color-mix"] || "#000")};
        --w3m-accent: ${n(e(r, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${n(e(r, "light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `
	};
}
var F = t`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`, I = t`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`, L = t`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`, R = {
	getSpacingStyles(e, t) {
		if (Array.isArray(e)) return e[t] ? `var(--wui-spacing-${e[t]})` : void 0;
		if (typeof e == "string") return `var(--wui-spacing-${e})`;
	},
	getFormattedDate(e) {
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric"
		}).format(e);
	},
	getHostName(e) {
		try {
			return new URL(e).hostname;
		} catch {
			return "";
		}
	},
	getTruncateString({ string: e, charsStart: t, charsEnd: n, truncate: r }) {
		return e.length <= t + n ? e : r === "end" ? `${e.substring(0, t)}...` : r === "start" ? `...${e.substring(e.length - n)}` : `${e.substring(0, Math.floor(t))}...${e.substring(e.length - Math.floor(n))}`;
	},
	generateAvatarColors(e) {
		let t = e.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "").substring(0, 6).padEnd(6, "0"), n = this.hexToRgb(t), r = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"), i = 100 - 3 * Number(r?.replace("px", "")), a = `${i}% ${i}% at 65% 40%`, o = [];
		for (let e = 0; e < 5; e += 1) {
			let t = this.tintColor(n, .15 * e);
			o.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`);
		}
		return `
    --local-color-1: ${o[0]};
    --local-color-2: ${o[1]};
    --local-color-3: ${o[2]};
    --local-color-4: ${o[3]};
    --local-color-5: ${o[4]};
    --local-radial-circle: ${a}
   `;
	},
	hexToRgb(e) {
		let t = parseInt(e, 16);
		return [
			t >> 16 & 255,
			t >> 8 & 255,
			t & 255
		];
	},
	tintColor(e, t) {
		let [n, r, i] = e;
		return [
			Math.round(n + (255 - n) * t),
			Math.round(r + (255 - r) * t),
			Math.round(i + (255 - i) * t)
		];
	},
	isNumber(e) {
		return { number: /^[0-9]+$/u }.number.test(e);
	},
	getColorTheme(e) {
		return e || (typeof window < "u" && window.matchMedia && typeof window.matchMedia == "function" ? window.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light" : "dark");
	},
	splitBalance(e) {
		let t = e.split(".");
		return t.length === 2 ? [t[0], t[1]] : ["0", "00"];
	},
	roundNumber(e, t, n) {
		return e.toString().length >= t ? Number(e).toFixed(n) : e;
	}
}, z = 3, B = [
	"receive",
	"deposit",
	"borrow",
	"claim"
], V = [
	"withdraw",
	"repay",
	"burn"
], H = {
	getTransactionGroupTitle(e, t) {
		let n = E.getYear(), r = E.getMonthNameByIndex(t);
		return e === n ? r : `${r} ${e}`;
	},
	getTransactionImages(e) {
		let [t, n] = e, r = !!t && e?.every((e) => !!e.nft_info), i = e?.length > 1;
		return e?.length === 2 && !r ? [this.getTransactionImage(n), this.getTransactionImage(t)] : i ? e.map((e) => this.getTransactionImage(e)) : [this.getTransactionImage(t)];
	},
	getTransactionImage(e) {
		return {
			type: H.getTransactionTransferTokenType(e),
			url: H.getTransactionImageURL(e)
		};
	},
	getTransactionImageURL(e) {
		let t, n = !!e?.nft_info, r = !!e?.fungible_info;
		return e && n ? t = e?.nft_info?.content?.preview?.url : e && r && (t = e?.fungible_info?.icon?.url), t;
	},
	getTransactionTransferTokenType(e) {
		if (e?.fungible_info) return "FUNGIBLE";
		if (e?.nft_info) return "NFT";
	},
	getTransactionDescriptions(e) {
		let t = e?.metadata?.operationType, n = e?.transfers, r = e?.transfers?.length > 0, i = e?.transfers?.length > 1, a = r && n?.every((e) => !!e?.fungible_info), [o, s] = n, c = this.getTransferDescription(o), l = this.getTransferDescription(s);
		if (!r) return (t === "send" || t === "receive") && a ? (c = R.getTruncateString({
			string: e?.metadata.sentFrom,
			charsStart: 4,
			charsEnd: 6,
			truncate: "middle"
		}), l = R.getTruncateString({
			string: e?.metadata.sentTo,
			charsStart: 4,
			charsEnd: 6,
			truncate: "middle"
		}), [c, l]) : [e.metadata.status];
		if (i) return n.map((e) => this.getTransferDescription(e)).reverse();
		let u = "";
		return B.includes(t) ? u = "+" : V.includes(t) && (u = "-"), c = u.concat(c), [c];
	},
	getTransferDescription(e) {
		let t = "";
		return e && (e?.nft_info ? t = e?.nft_info?.name || "-" : e?.fungible_info && (t = this.getFungibleTransferDescription(e) || "-")), t;
	},
	getFungibleTransferDescription(e) {
		return e ? [this.getQuantityFixedValue(e?.quantity.numeric), e?.fungible_info?.symbol].join(" ").trim() : null;
	},
	getQuantityFixedValue(e) {
		return e ? parseFloat(e).toFixed(z) : null;
	}
};
//#endregion
//#region node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
function U(e, t) {
	let { kind: n, elements: r } = t;
	return {
		kind: n,
		elements: r,
		finisher(t) {
			customElements.get(e) || customElements.define(e, t);
		}
	};
}
function W(e, t) {
	return customElements.get(e) || customElements.define(e, t), t;
}
function G(e) {
	return function(t) {
		return typeof t == "function" ? W(e, t) : U(e, t);
	};
}
//#endregion
export { m as _, I as a, M as c, E as d, u as f, h as g, p as h, L as i, N as l, d as m, H as n, j as o, l as p, R as r, F as s, G as t, D as u };
