import { A as e, D as t, E as n, H as r, K as i, O as a, k as o } from "./ModalController-DHlkqy_7.js";
import { i as s, n as c, t as ee } from "./index.es-CQBj5vab.js";
import { n as l, t as u } from "./W3mFrameHelpers-BVt-hf8v.js";
//#region node_modules/zod/lib/index.mjs
var d;
(function(e) {
	e.assertEqual = (e) => e;
	function t(e) {}
	e.assertIs = t;
	function n(e) {
		throw Error();
	}
	e.assertNever = n, e.arrayToEnum = (e) => {
		let t = {};
		for (let n of e) t[n] = n;
		return t;
	}, e.getValidEnumValues = (t) => {
		let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != "number"), r = {};
		for (let e of n) r[e] = t[e];
		return e.objectValues(r);
	}, e.objectValues = (t) => e.objectKeys(t).map(function(e) {
		return t[e];
	}), e.objectKeys = typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
		let t = [];
		for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = (e, t) => {
		for (let n of e) if (t(n)) return n;
	}, e.isInteger = typeof Number.isInteger == "function" ? (e) => Number.isInteger(e) : (e) => typeof e == "number" && isFinite(e) && Math.floor(e) === e;
	function r(e, t = " | ") {
		return e.map((e) => typeof e == "string" ? `'${e}'` : e).join(t);
	}
	e.joinValues = r, e.jsonStringifyReplacer = (e, t) => typeof t == "bigint" ? t.toString() : t;
})(d || (d = {}));
var te;
(function(e) {
	e.mergeShapes = (e, t) => ({
		...e,
		...t
	});
})(te || (te = {}));
var f = d.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]), p = (e) => {
	switch (typeof e) {
		case "undefined": return f.undefined;
		case "string": return f.string;
		case "number": return isNaN(e) ? f.nan : f.number;
		case "boolean": return f.boolean;
		case "function": return f.function;
		case "bigint": return f.bigint;
		case "symbol": return f.symbol;
		case "object": return Array.isArray(e) ? f.array : e === null ? f.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? f.promise : typeof Map < "u" && e instanceof Map ? f.map : typeof Set < "u" && e instanceof Set ? f.set : typeof Date < "u" && e instanceof Date ? f.date : f.object;
		default: return f.unknown;
	}
}, m = d.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]), ne = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"), h = class extends Error {
	constructor(e) {
		super(), this.issues = [], this.addIssue = (e) => {
			this.issues = [...this.issues, e];
		}, this.addIssues = (e = []) => {
			this.issues = [...this.issues, ...e];
		};
		let t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
	}
	get errors() {
		return this.issues;
	}
	format(e) {
		let t = e || function(e) {
			return e.message;
		}, n = { _errors: [] }, r = (e) => {
			for (let i of e.issues) if (i.code === "invalid_union") i.unionErrors.map(r);
			else if (i.code === "invalid_return_type") r(i.returnTypeError);
			else if (i.code === "invalid_arguments") r(i.argumentsError);
			else if (i.path.length === 0) n._errors.push(t(i));
			else {
				let e = n, r = 0;
				for (; r < i.path.length;) {
					let n = i.path[r];
					r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
				}
			}
		};
		return r(this), n;
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, d.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (e) => e.message) {
		let t = {}, n = [];
		for (let r of this.issues) r.path.length > 0 ? (t[r.path[0]] = t[r.path[0]] || [], t[r.path[0]].push(e(r))) : n.push(e(r));
		return {
			formErrors: n,
			fieldErrors: t
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
h.create = (e) => new h(e);
var g = (e, t) => {
	let n;
	switch (e.code) {
		case m.invalid_type:
			n = e.received === f.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
			break;
		case m.invalid_literal:
			n = `Invalid literal value, expected ${JSON.stringify(e.expected, d.jsonStringifyReplacer)}`;
			break;
		case m.unrecognized_keys:
			n = `Unrecognized key(s) in object: ${d.joinValues(e.keys, ", ")}`;
			break;
		case m.invalid_union:
			n = "Invalid input";
			break;
		case m.invalid_union_discriminator:
			n = `Invalid discriminator value. Expected ${d.joinValues(e.options)}`;
			break;
		case m.invalid_enum_value:
			n = `Invalid enum value. Expected ${d.joinValues(e.options)}, received '${e.received}'`;
			break;
		case m.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case m.invalid_return_type:
			n = "Invalid function return type";
			break;
		case m.invalid_date:
			n = "Invalid date";
			break;
		case m.invalid_string:
			typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : d.assertNever(e.validation) : n = e.validation === "regex" ? "Invalid" : `Invalid ${e.validation}`;
			break;
		case m.too_small:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
			break;
		case m.too_big:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
			break;
		case m.custom:
			n = "Invalid input";
			break;
		case m.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case m.not_multiple_of:
			n = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case m.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, d.assertNever(e);
	}
	return { message: n };
}, re = g;
function ie(e) {
	re = e;
}
function ae() {
	return re;
}
var oe = (e) => {
	let { data: t, path: n, errorMaps: r, issueData: i } = e, a = [...n, ...i.path || []], o = {
		...i,
		path: a
	}, s = "", c = r.filter((e) => !!e).slice().reverse();
	for (let e of c) s = e(o, {
		data: t,
		defaultError: s
	}).message;
	return {
		...i,
		path: a,
		message: i.message || s
	};
}, se = [];
function _(e, t) {
	let n = oe({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			ae(),
			g
		].filter((e) => !!e)
	});
	e.common.issues.push(n);
}
var v = class e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(e, t) {
		let n = [];
		for (let r of t) {
			if (r.status === "aborted") return y;
			r.status === "dirty" && e.dirty(), n.push(r.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
	static async mergeObjectAsync(t, n) {
		let r = [];
		for (let e of n) r.push({
			key: await e.key,
			value: await e.value
		});
		return e.mergeObjectSync(t, r);
	}
	static mergeObjectSync(e, t) {
		let n = {};
		for (let r of t) {
			let { key: t, value: i } = r;
			if (t.status === "aborted" || i.status === "aborted") return y;
			t.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), t.value !== "__proto__" && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
}, y = Object.freeze({ status: "aborted" }), ce = (e) => ({
	status: "dirty",
	value: e
}), b = (e) => ({
	status: "valid",
	value: e
}), le = (e) => e.status === "aborted", ue = (e) => e.status === "dirty", x = (e) => e.status === "valid", de = (e) => typeof Promise < "u" && e instanceof Promise, S;
(function(e) {
	e.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, e.toString = (e) => typeof e == "string" ? e : e?.message;
})(S || (S = {}));
var C = class {
	constructor(e, t, n, r) {
		this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
	}
	get path() {
		return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
	}
}, fe = (e, t) => {
	if (x(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			return this._error || (this._error = new h(e.common.issues)), this._error;
		}
	};
};
function w(e) {
	if (!e) return {};
	let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
	if (t && (n || r)) throw Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: i
	} : {
		errorMap: (e, t) => e.code === "invalid_type" ? t.data === void 0 ? { message: r ?? t.defaultError } : { message: n ?? t.defaultError } : { message: t.defaultError },
		description: i
	};
}
var T = class {
	constructor(e) {
		this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
	}
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return p(e.data);
	}
	_getOrReturnCtx(e, t) {
		return t || {
			common: e.parent.common,
			data: e.data,
			parsedType: p(e.data),
			schemaErrorMap: this._def.errorMap,
			path: e.path,
			parent: e.parent
		};
	}
	_processInputParams(e) {
		return {
			status: new v(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: p(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		let t = this._parse(e);
		if (de(t)) throw Error("Synchronous parse encountered promise.");
		return t;
	}
	_parseAsync(e) {
		let t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		let n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		let n = {
			common: {
				issues: [],
				async: t?.async ?? !1,
				contextualErrorMap: t?.errorMap
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: p(e)
		};
		return fe(n, this._parseSync({
			data: e,
			path: n.path,
			parent: n
		}));
	}
	async parseAsync(e, t) {
		let n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		let n = {
			common: {
				issues: [],
				contextualErrorMap: t?.errorMap,
				async: !0
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: p(e)
		}, r = this._parse({
			data: e,
			path: n.path,
			parent: n
		});
		return fe(n, await (de(r) ? r : Promise.resolve(r)));
	}
	refine(e, t) {
		let n = (e) => typeof t == "string" || t === void 0 ? { message: t } : typeof t == "function" ? t(e) : t;
		return this._refinement((t, r) => {
			let i = e(t), a = () => r.addIssue({
				code: m.custom,
				...n(t)
			});
			return typeof Promise < "u" && i instanceof Promise ? i.then((e) => e ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
	}
	_refinement(e) {
		return new G({
			schema: this,
			typeName: Y.ZodEffects,
			effect: {
				type: "refinement",
				refinement: e
			}
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	optional() {
		return K.create(this, this._def);
	}
	nullable() {
		return q.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return P.create(this, this._def);
	}
	promise() {
		return W.create(this, this._def);
	}
	or(e) {
		return L.create([this, e], this._def);
	}
	and(e) {
		return R.create(this, e, this._def);
	}
	transform(e) {
		return new G({
			...w(this._def),
			schema: this,
			typeName: Y.ZodEffects,
			effect: {
				type: "transform",
				transform: e
			}
		});
	}
	default(e) {
		let t = typeof e == "function" ? e : () => e;
		return new J({
			...w(this._def),
			innerType: this,
			defaultValue: t,
			typeName: Y.ZodDefault
		});
	}
	brand() {
		return new Be({
			typeName: Y.ZodBranded,
			type: this,
			...w(this._def)
		});
	}
	catch(e) {
		let t = typeof e == "function" ? e : () => e;
		return new Le({
			...w(this._def),
			innerType: this,
			catchValue: t,
			typeName: Y.ZodCatch
		});
	}
	describe(e) {
		let t = this.constructor;
		return new t({
			...this._def,
			description: e
		});
	}
	pipe(e) {
		return Ve.create(this, e);
	}
	readonly() {
		return He.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}, pe = /^c[^\s-]{8,}$/i, me = /^[a-z][a-z0-9]*$/, he = /^[0-9A-HJKMNP-TV-Z]{26}$/, ge = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, _e = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, ve = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", ye, be = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, xe = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Se = (e) => e.precision ? e.offset ? RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}Z$`) : e.precision === 0 ? e.offset ? RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : e.offset ? RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function Ce(e, t) {
	return !!((t === "v4" || !t) && be.test(e) || (t === "v6" || !t) && xe.test(e));
}
var E = class e extends T {
	_parse(e) {
		if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.string,
				received: t.parsedType
			}), y;
		}
		let t = new v(), n;
		for (let r of this._def.checks) if (r.kind === "min") e.data.length < r.value && (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.too_small,
			minimum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "max") e.data.length > r.value && (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.too_big,
			maximum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "length") {
			let i = e.data.length > r.value, a = e.data.length < r.value;
			(i || a) && (n = this._getOrReturnCtx(e, n), i ? _(n, {
				code: m.too_big,
				maximum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}) : a && _(n, {
				code: m.too_small,
				minimum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}), t.dirty());
		} else if (r.kind === "email") _e.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "email",
			code: m.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "emoji") ye || (ye = new RegExp(ve, "u")), ye.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "emoji",
			code: m.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "uuid") ge.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "uuid",
			code: m.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid") pe.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "cuid",
			code: m.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid2") me.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "cuid2",
			code: m.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "ulid") he.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "ulid",
			code: m.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "url") try {
			new URL(e.data);
		} catch {
			n = this._getOrReturnCtx(e, n), _(n, {
				validation: "url",
				code: m.invalid_string,
				message: r.message
			}), t.dirty();
		}
		else r.kind === "regex" ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "regex",
			code: m.invalid_string,
			message: r.message
		}), t.dirty())) : r.kind === "trim" ? e.data = e.data.trim() : r.kind === "includes" ? e.data.includes(r.value, r.position) || (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.invalid_string,
			validation: {
				includes: r.value,
				position: r.position
			},
			message: r.message
		}), t.dirty()) : r.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : r.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : r.kind === "startsWith" ? e.data.startsWith(r.value) || (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.invalid_string,
			validation: { startsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "endsWith" ? e.data.endsWith(r.value) || (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.invalid_string,
			validation: { endsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "datetime" ? Se(r).test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.invalid_string,
			validation: "datetime",
			message: r.message
		}), t.dirty()) : r.kind === "ip" ? Ce(e.data, r.version) || (n = this._getOrReturnCtx(e, n), _(n, {
			validation: "ip",
			code: m.invalid_string,
			message: r.message
		}), t.dirty()) : d.assertNever(r);
		return {
			status: t.value,
			value: e.data
		};
	}
	_regex(e, t, n) {
		return this.refinement((t) => e.test(t), {
			validation: t,
			code: m.invalid_string,
			...S.errToObj(n)
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	email(e) {
		return this._addCheck({
			kind: "email",
			...S.errToObj(e)
		});
	}
	url(e) {
		return this._addCheck({
			kind: "url",
			...S.errToObj(e)
		});
	}
	emoji(e) {
		return this._addCheck({
			kind: "emoji",
			...S.errToObj(e)
		});
	}
	uuid(e) {
		return this._addCheck({
			kind: "uuid",
			...S.errToObj(e)
		});
	}
	cuid(e) {
		return this._addCheck({
			kind: "cuid",
			...S.errToObj(e)
		});
	}
	cuid2(e) {
		return this._addCheck({
			kind: "cuid2",
			...S.errToObj(e)
		});
	}
	ulid(e) {
		return this._addCheck({
			kind: "ulid",
			...S.errToObj(e)
		});
	}
	ip(e) {
		return this._addCheck({
			kind: "ip",
			...S.errToObj(e)
		});
	}
	datetime(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "datetime",
			precision: null,
			offset: !1,
			message: e
		}) : this._addCheck({
			kind: "datetime",
			precision: e?.precision === void 0 ? null : e?.precision,
			offset: e?.offset ?? !1,
			...S.errToObj(e?.message)
		});
	}
	regex(e, t) {
		return this._addCheck({
			kind: "regex",
			regex: e,
			...S.errToObj(t)
		});
	}
	includes(e, t) {
		return this._addCheck({
			kind: "includes",
			value: e,
			position: t?.position,
			...S.errToObj(t?.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({
			kind: "startsWith",
			value: e,
			...S.errToObj(t)
		});
	}
	endsWith(e, t) {
		return this._addCheck({
			kind: "endsWith",
			value: e,
			...S.errToObj(t)
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e,
			...S.errToObj(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e,
			...S.errToObj(t)
		});
	}
	length(e, t) {
		return this._addCheck({
			kind: "length",
			value: e,
			...S.errToObj(t)
		});
	}
	nonempty(e) {
		return this.min(1, S.errToObj(e));
	}
	trim() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === "datetime");
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === "uuid");
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === "ip");
	}
	get minLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
E.create = (e) => new E({
	checks: [],
	typeName: Y.ZodString,
	coerce: e?.coerce ?? !1,
	...w(e)
});
function we(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, i = n > r ? n : r;
	return parseInt(e.toFixed(i).replace(".", "")) % parseInt(t.toFixed(i).replace(".", "")) / 10 ** i;
}
var Te = class e extends T {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.number,
				received: t.parsedType
			}), y;
		}
		let t, n = new v();
		for (let r of this._def.checks) r.kind === "int" ? d.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.invalid_type,
			expected: "integer",
			received: "float",
			message: r.message
		}), n.dirty()) : r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.too_small,
			minimum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.too_big,
			maximum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? we(e.data, r.value) !== 0 && (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : r.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.not_finite,
			message: r.message
		}), n.dirty()) : d.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, S.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, S.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, S.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, S.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: S.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	int(e) {
		return this._addCheck({
			kind: "int",
			message: S.toString(e)
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: S.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: S.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: S.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: S.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: S.toString(t)
		});
	}
	finite(e) {
		return this._addCheck({
			kind: "finite",
			message: S.toString(e)
		});
	}
	safe(e) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: -(2 ** 53 - 1),
			message: S.toString(e)
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: 2 ** 53 - 1,
			message: S.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && d.isInteger(e.value));
	}
	get isFinite() {
		let e = null, t = null;
		for (let n of this._def.checks) if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
		else n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
Te.create = (e) => new Te({
	checks: [],
	typeName: Y.ZodNumber,
	coerce: e?.coerce || !1,
	...w(e)
});
var D = class e extends T {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== f.bigint) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.bigint,
				received: t.parsedType
			}), y;
		}
		let t, n = new v();
		for (let r of this._def.checks) r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.too_small,
			type: "bigint",
			minimum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.too_big,
			type: "bigint",
			maximum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), _(t, {
			code: m.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : d.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, S.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, S.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, S.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, S.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: S.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: S.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: S.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: S.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: S.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: S.toString(t)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
D.create = (e) => new D({
	checks: [],
	typeName: Y.ZodBigInt,
	coerce: e?.coerce ?? !1,
	...w(e)
});
var Ee = class extends T {
	_parse(e) {
		if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== f.boolean) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.boolean,
				received: t.parsedType
			}), y;
		}
		return b(e.data);
	}
};
Ee.create = (e) => new Ee({
	typeName: Y.ZodBoolean,
	coerce: e?.coerce || !1,
	...w(e)
});
var O = class e extends T {
	_parse(e) {
		if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.date,
				received: t.parsedType
			}), y;
		}
		if (isNaN(e.data.getTime())) return _(this._getOrReturnCtx(e), { code: m.invalid_date }), y;
		let t = new v(), n;
		for (let r of this._def.checks) r.kind === "min" ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.too_small,
			message: r.message,
			inclusive: !0,
			exact: !1,
			minimum: r.value,
			type: "date"
		}), t.dirty()) : r.kind === "max" ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), _(n, {
			code: m.too_big,
			message: r.message,
			inclusive: !0,
			exact: !1,
			maximum: r.value,
			type: "date"
		}), t.dirty()) : d.assertNever(r);
		return {
			status: t.value,
			value: new Date(e.data.getTime())
		};
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e.getTime(),
			message: S.toString(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e.getTime(),
			message: S.toString(t)
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
};
O.create = (e) => new O({
	checks: [],
	coerce: e?.coerce || !1,
	typeName: Y.ZodDate,
	...w(e)
});
var De = class extends T {
	_parse(e) {
		if (this._getType(e) !== f.symbol) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.symbol,
				received: t.parsedType
			}), y;
		}
		return b(e.data);
	}
};
De.create = (e) => new De({
	typeName: Y.ZodSymbol,
	...w(e)
});
var k = class extends T {
	_parse(e) {
		if (this._getType(e) !== f.undefined) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.undefined,
				received: t.parsedType
			}), y;
		}
		return b(e.data);
	}
};
k.create = (e) => new k({
	typeName: Y.ZodUndefined,
	...w(e)
});
var A = class extends T {
	_parse(e) {
		if (this._getType(e) !== f.null) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.null,
				received: t.parsedType
			}), y;
		}
		return b(e.data);
	}
};
A.create = (e) => new A({
	typeName: Y.ZodNull,
	...w(e)
});
var j = class extends T {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return b(e.data);
	}
};
j.create = (e) => new j({
	typeName: Y.ZodAny,
	...w(e)
});
var M = class extends T {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return b(e.data);
	}
};
M.create = (e) => new M({
	typeName: Y.ZodUnknown,
	...w(e)
});
var N = class extends T {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return _(t, {
			code: m.invalid_type,
			expected: f.never,
			received: t.parsedType
		}), y;
	}
};
N.create = (e) => new N({
	typeName: Y.ZodNever,
	...w(e)
});
var Oe = class extends T {
	_parse(e) {
		if (this._getType(e) !== f.undefined) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.void,
				received: t.parsedType
			}), y;
		}
		return b(e.data);
	}
};
Oe.create = (e) => new Oe({
	typeName: Y.ZodVoid,
	...w(e)
});
var P = class e extends T {
	_parse(e) {
		let { ctx: t, status: n } = this._processInputParams(e), r = this._def;
		if (t.parsedType !== f.array) return _(t, {
			code: m.invalid_type,
			expected: f.array,
			received: t.parsedType
		}), y;
		if (r.exactLength !== null) {
			let e = t.data.length > r.exactLength.value, i = t.data.length < r.exactLength.value;
			(e || i) && (_(t, {
				code: e ? m.too_big : m.too_small,
				minimum: i ? r.exactLength.value : void 0,
				maximum: e ? r.exactLength.value : void 0,
				type: "array",
				inclusive: !0,
				exact: !0,
				message: r.exactLength.message
			}), n.dirty());
		}
		if (r.minLength !== null && t.data.length < r.minLength.value && (_(t, {
			code: m.too_small,
			minimum: r.minLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.minLength.message
		}), n.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (_(t, {
			code: m.too_big,
			maximum: r.maxLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.maxLength.message
		}), n.dirty()), t.common.async) return Promise.all([...t.data].map((e, n) => r.type._parseAsync(new C(t, e, t.path, n)))).then((e) => v.mergeArray(n, e));
		let i = [...t.data].map((e, n) => r.type._parseSync(new C(t, e, t.path, n)));
		return v.mergeArray(n, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, n) {
		return new e({
			...this._def,
			minLength: {
				value: t,
				message: S.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxLength: {
				value: t,
				message: S.toString(n)
			}
		});
	}
	length(t, n) {
		return new e({
			...this._def,
			exactLength: {
				value: t,
				message: S.toString(n)
			}
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
P.create = (e, t) => new P({
	type: e,
	minLength: null,
	maxLength: null,
	exactLength: null,
	typeName: Y.ZodArray,
	...w(t)
});
function F(e) {
	if (e instanceof I) {
		let t = {};
		for (let n in e.shape) {
			let r = e.shape[n];
			t[n] = K.create(F(r));
		}
		return new I({
			...e._def,
			shape: () => t
		});
	} else if (e instanceof P) return new P({
		...e._def,
		type: F(e.element)
	});
	else if (e instanceof K) return K.create(F(e.unwrap()));
	else if (e instanceof q) return q.create(F(e.unwrap()));
	else if (e instanceof z) return z.create(e.items.map((e) => F(e)));
	else return e;
}
var I = class e extends T {
	constructor() {
		super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape();
		return this._cached = {
			shape: e,
			keys: d.objectKeys(e)
		};
	}
	_parse(e) {
		if (this._getType(e) !== f.object) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.object,
				received: t.parsedType
			}), y;
		}
		let { status: t, ctx: n } = this._processInputParams(e), { shape: r, keys: i } = this._getCached(), a = [];
		if (!(this._def.catchall instanceof N && this._def.unknownKeys === "strip")) for (let e in n.data) i.includes(e) || a.push(e);
		let o = [];
		for (let e of i) {
			let t = r[e], i = n.data[e];
			o.push({
				key: {
					status: "valid",
					value: e
				},
				value: t._parse(new C(n, i, n.path, e)),
				alwaysSet: e in n.data
			});
		}
		if (this._def.catchall instanceof N) {
			let e = this._def.unknownKeys;
			if (e === "passthrough") for (let e of a) o.push({
				key: {
					status: "valid",
					value: e
				},
				value: {
					status: "valid",
					value: n.data[e]
				}
			});
			else if (e === "strict") a.length > 0 && (_(n, {
				code: m.unrecognized_keys,
				keys: a
			}), t.dirty());
			else if (e !== "strip") throw Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let e = this._def.catchall;
			for (let t of a) {
				let r = n.data[t];
				o.push({
					key: {
						status: "valid",
						value: t
					},
					value: e._parse(new C(n, r, n.path, t)),
					alwaysSet: t in n.data
				});
			}
		}
		return n.common.async ? Promise.resolve().then(async () => {
			let e = [];
			for (let t of o) {
				let n = await t.key;
				e.push({
					key: n,
					value: await t.value,
					alwaysSet: t.alwaysSet
				});
			}
			return e;
		}).then((e) => v.mergeObjectSync(t, e)) : v.mergeObjectSync(t, o);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return S.errToObj, new e({
			...this._def,
			unknownKeys: "strict",
			...t === void 0 ? {} : { errorMap: (e, n) => {
				var r;
				let i = (r = this._def).errorMap?.call(r, e, n).message ?? n.defaultError;
				return e.code === "unrecognized_keys" ? { message: S.errToObj(t).message ?? i } : { message: i };
			} }
		});
	}
	strip() {
		return new e({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new e({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(t) {
		return new e({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...t
			})
		});
	}
	merge(t) {
		return new e({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...t._def.shape()
			}),
			typeName: Y.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(t) {
		return new e({
			...this._def,
			catchall: t
		});
	}
	pick(t) {
		let n = {};
		return d.objectKeys(t).forEach((e) => {
			t[e] && this.shape[e] && (n[e] = this.shape[e]);
		}), new e({
			...this._def,
			shape: () => n
		});
	}
	omit(t) {
		let n = {};
		return d.objectKeys(this.shape).forEach((e) => {
			t[e] || (n[e] = this.shape[e]);
		}), new e({
			...this._def,
			shape: () => n
		});
	}
	deepPartial() {
		return F(this);
	}
	partial(t) {
		let n = {};
		return d.objectKeys(this.shape).forEach((e) => {
			let r = this.shape[e];
			t && !t[e] ? n[e] = r : n[e] = r.optional();
		}), new e({
			...this._def,
			shape: () => n
		});
	}
	required(t) {
		let n = {};
		return d.objectKeys(this.shape).forEach((e) => {
			if (t && !t[e]) n[e] = this.shape[e];
			else {
				let t = this.shape[e];
				for (; t instanceof K;) t = t._def.innerType;
				n[e] = t;
			}
		}), new e({
			...this._def,
			shape: () => n
		});
	}
	keyof() {
		return Ie(d.objectKeys(this.shape));
	}
};
I.create = (e, t) => new I({
	shape: () => e,
	unknownKeys: "strip",
	catchall: N.create(),
	typeName: Y.ZodObject,
	...w(t)
}), I.strictCreate = (e, t) => new I({
	shape: () => e,
	unknownKeys: "strict",
	catchall: N.create(),
	typeName: Y.ZodObject,
	...w(t)
}), I.lazycreate = (e, t) => new I({
	shape: e,
	unknownKeys: "strip",
	catchall: N.create(),
	typeName: Y.ZodObject,
	...w(t)
});
var L = class extends T {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = this._def.options;
		function r(e) {
			for (let t of e) if (t.result.status === "valid") return t.result;
			for (let n of e) if (n.result.status === "dirty") return t.common.issues.push(...n.ctx.common.issues), n.result;
			let n = e.map((e) => new h(e.ctx.common.issues));
			return _(t, {
				code: m.invalid_union,
				unionErrors: n
			}), y;
		}
		if (t.common.async) return Promise.all(n.map(async (e) => {
			let n = {
				...t,
				common: {
					...t.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await e._parseAsync({
					data: t.data,
					path: t.path,
					parent: n
				}),
				ctx: n
			};
		})).then(r);
		{
			let e, r = [];
			for (let i of n) {
				let n = {
					...t,
					common: {
						...t.common,
						issues: []
					},
					parent: null
				}, a = i._parseSync({
					data: t.data,
					path: t.path,
					parent: n
				});
				if (a.status === "valid") return a;
				a.status === "dirty" && !e && (e = {
					result: a,
					ctx: n
				}), n.common.issues.length && r.push(n.common.issues);
			}
			if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
			let i = r.map((e) => new h(e));
			return _(t, {
				code: m.invalid_union,
				unionErrors: i
			}), y;
		}
	}
	get options() {
		return this._def.options;
	}
};
L.create = (e, t) => new L({
	options: e,
	typeName: Y.ZodUnion,
	...w(t)
});
var ke = (e) => e instanceof B ? ke(e.schema) : e instanceof G ? ke(e.innerType()) : e instanceof V ? [e.value] : e instanceof H ? e.options : e instanceof U ? Object.keys(e.enum) : e instanceof J ? ke(e._def.innerType) : e instanceof k ? [void 0] : e instanceof A ? [null] : null, Ae = class e extends T {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== f.object) return _(t, {
			code: m.invalid_type,
			expected: f.object,
			received: t.parsedType
		}), y;
		let n = this.discriminator, r = t.data[n], i = this.optionsMap.get(r);
		return i ? t.common.async ? i._parseAsync({
			data: t.data,
			path: t.path,
			parent: t
		}) : i._parseSync({
			data: t.data,
			path: t.path,
			parent: t
		}) : (_(t, {
			code: m.invalid_union_discriminator,
			options: Array.from(this.optionsMap.keys()),
			path: [n]
		}), y);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(t, n, r) {
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = ke(e.shape[t]);
			if (!n) throw Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
			for (let r of n) {
				if (i.has(r)) throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
				i.set(r, e);
			}
		}
		return new e({
			typeName: Y.ZodDiscriminatedUnion,
			discriminator: t,
			options: n,
			optionsMap: i,
			...w(r)
		});
	}
};
function je(e, t) {
	let n = p(e), r = p(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === f.object && r === f.object) {
		let n = d.objectKeys(t), r = d.objectKeys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = je(e[n], t[n]);
			if (!r.valid) return { valid: !1 };
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	} else if (n === f.array && r === f.array) {
		if (e.length !== t.length) return { valid: !1 };
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = je(i, a);
			if (!o.valid) return { valid: !1 };
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	} else if (n === f.date && r === f.date && +e == +t) return {
		valid: !0,
		data: e
	};
	else return { valid: !1 };
}
var R = class extends T {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = (e, r) => {
			if (le(e) || le(r)) return y;
			let i = je(e.value, r.value);
			return i.valid ? ((ue(e) || ue(r)) && t.dirty(), {
				status: t.value,
				value: i.data
			}) : (_(n, { code: m.invalid_intersection_types }), y);
		};
		return n.common.async ? Promise.all([this._def.left._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		})]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}));
	}
};
R.create = (e, t, n) => new R({
	left: e,
	right: t,
	typeName: Y.ZodIntersection,
	...w(n)
});
var z = class e extends T {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== f.array) return _(n, {
			code: m.invalid_type,
			expected: f.array,
			received: n.parsedType
		}), y;
		if (n.data.length < this._def.items.length) return _(n, {
			code: m.too_small,
			minimum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), y;
		!this._def.rest && n.data.length > this._def.items.length && (_(n, {
			code: m.too_big,
			maximum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), t.dirty());
		let r = [...n.data].map((e, t) => {
			let r = this._def.items[t] || this._def.rest;
			return r ? r._parse(new C(n, e, n.path, t)) : null;
		}).filter((e) => !!e);
		return n.common.async ? Promise.all(r).then((e) => v.mergeArray(t, e)) : v.mergeArray(t, r);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new e({
			...this._def,
			rest: t
		});
	}
};
z.create = (e, t) => {
	if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new z({
		items: e,
		typeName: Y.ZodTuple,
		rest: null,
		...w(t)
	});
};
var Me = class e extends T {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== f.object) return _(n, {
			code: m.invalid_type,
			expected: f.object,
			received: n.parsedType
		}), y;
		let r = [], i = this._def.keyType, a = this._def.valueType;
		for (let e in n.data) r.push({
			key: i._parse(new C(n, e, n.path, e)),
			value: a._parse(new C(n, n.data[e], n.path, e))
		});
		return n.common.async ? v.mergeObjectAsync(t, r) : v.mergeObjectSync(t, r);
	}
	get element() {
		return this._def.valueType;
	}
	static create(t, n, r) {
		return n instanceof T ? new e({
			keyType: t,
			valueType: n,
			typeName: Y.ZodRecord,
			...w(r)
		}) : new e({
			keyType: E.create(),
			valueType: t,
			typeName: Y.ZodRecord,
			...w(n)
		});
	}
}, Ne = class extends T {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== f.map) return _(n, {
			code: m.invalid_type,
			expected: f.map,
			received: n.parsedType
		}), y;
		let r = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([e, t], a) => ({
			key: r._parse(new C(n, e, n.path, [a, "key"])),
			value: i._parse(new C(n, t, n.path, [a, "value"]))
		}));
		if (n.common.async) {
			let e = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (let n of a) {
					let r = await n.key, i = await n.value;
					if (r.status === "aborted" || i.status === "aborted") return y;
					(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
				}
				return {
					status: t.value,
					value: e
				};
			});
		} else {
			let e = /* @__PURE__ */ new Map();
			for (let n of a) {
				let r = n.key, i = n.value;
				if (r.status === "aborted" || i.status === "aborted") return y;
				(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
			}
			return {
				status: t.value,
				value: e
			};
		}
	}
};
Ne.create = (e, t, n) => new Ne({
	valueType: t,
	keyType: e,
	typeName: Y.ZodMap,
	...w(n)
});
var Pe = class e extends T {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== f.set) return _(n, {
			code: m.invalid_type,
			expected: f.set,
			received: n.parsedType
		}), y;
		let r = this._def;
		r.minSize !== null && n.data.size < r.minSize.value && (_(n, {
			code: m.too_small,
			minimum: r.minSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.minSize.message
		}), t.dirty()), r.maxSize !== null && n.data.size > r.maxSize.value && (_(n, {
			code: m.too_big,
			maximum: r.maxSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.maxSize.message
		}), t.dirty());
		let i = this._def.valueType;
		function a(e) {
			let n = /* @__PURE__ */ new Set();
			for (let r of e) {
				if (r.status === "aborted") return y;
				r.status === "dirty" && t.dirty(), n.add(r.value);
			}
			return {
				status: t.value,
				value: n
			};
		}
		let o = [...n.data.values()].map((e, t) => i._parse(new C(n, e, n.path, t)));
		return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
	}
	min(t, n) {
		return new e({
			...this._def,
			minSize: {
				value: t,
				message: S.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxSize: {
				value: t,
				message: S.toString(n)
			}
		});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
Pe.create = (e, t) => new Pe({
	valueType: e,
	minSize: null,
	maxSize: null,
	typeName: Y.ZodSet,
	...w(t)
});
var Fe = class e extends T {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== f.function) return _(t, {
			code: m.invalid_type,
			expected: f.function,
			received: t.parsedType
		}), y;
		function n(e, n) {
			return oe({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					ae(),
					g
				].filter((e) => !!e),
				issueData: {
					code: m.invalid_arguments,
					argumentsError: n
				}
			});
		}
		function r(e, n) {
			return oe({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					ae(),
					g
				].filter((e) => !!e),
				issueData: {
					code: m.invalid_return_type,
					returnTypeError: n
				}
			});
		}
		let i = { errorMap: t.common.contextualErrorMap }, a = t.data;
		if (this._def.returns instanceof W) {
			let e = this;
			return b(async function(...t) {
				let o = new h([]), s = await e._def.args.parseAsync(t, i).catch((e) => {
					throw o.addIssue(n(t, e)), o;
				}), c = await Reflect.apply(a, this, s);
				return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
					throw o.addIssue(r(c, e)), o;
				});
			});
		} else {
			let e = this;
			return b(function(...t) {
				let o = e._def.args.safeParse(t, i);
				if (!o.success) throw new h([n(t, o.error)]);
				let s = Reflect.apply(a, this, o.data), c = e._def.returns.safeParse(s, i);
				if (!c.success) throw new h([r(s, c.error)]);
				return c.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...t) {
		return new e({
			...this._def,
			args: z.create(t).rest(M.create())
		});
	}
	returns(t) {
		return new e({
			...this._def,
			returns: t
		});
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(t, n, r) {
		return new e({
			args: t || z.create([]).rest(M.create()),
			returns: n || M.create(),
			typeName: Y.ZodFunction,
			...w(r)
		});
	}
}, B = class extends T {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({
			data: t.data,
			path: t.path,
			parent: t
		});
	}
};
B.create = (e, t) => new B({
	getter: e,
	typeName: Y.ZodLazy,
	...w(t)
});
var V = class extends T {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				received: t.data,
				code: m.invalid_literal,
				expected: this._def.value
			}), y;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
	get value() {
		return this._def.value;
	}
};
V.create = (e, t) => new V({
	value: e,
	typeName: Y.ZodLiteral,
	...w(t)
});
function Ie(e, t) {
	return new H({
		values: e,
		typeName: Y.ZodEnum,
		...w(t)
	});
}
var H = class e extends T {
	_parse(e) {
		if (typeof e.data != "string") {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return _(t, {
				expected: d.joinValues(n),
				received: t.parsedType,
				code: m.invalid_type
			}), y;
		}
		if (this._def.values.indexOf(e.data) === -1) {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return _(t, {
				received: t.data,
				code: m.invalid_enum_value,
				options: n
			}), y;
		}
		return b(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(t) {
		return e.create(t);
	}
	exclude(t) {
		return e.create(this.options.filter((e) => !t.includes(e)));
	}
};
H.create = Ie;
var U = class extends T {
	_parse(e) {
		let t = d.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
		if (n.parsedType !== f.string && n.parsedType !== f.number) {
			let e = d.objectValues(t);
			return _(n, {
				expected: d.joinValues(e),
				received: n.parsedType,
				code: m.invalid_type
			}), y;
		}
		if (t.indexOf(e.data) === -1) {
			let e = d.objectValues(t);
			return _(n, {
				received: n.data,
				code: m.invalid_enum_value,
				options: e
			}), y;
		}
		return b(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
U.create = (e, t) => new U({
	values: e,
	typeName: Y.ZodNativeEnum,
	...w(t)
});
var W = class extends T {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return t.parsedType !== f.promise && t.common.async === !1 ? (_(t, {
			code: m.invalid_type,
			expected: f.promise,
			received: t.parsedType
		}), y) : b((t.parsedType === f.promise ? t.data : Promise.resolve(t.data)).then((e) => this._def.type.parseAsync(e, {
			path: t.path,
			errorMap: t.common.contextualErrorMap
		})));
	}
};
W.create = (e, t) => new W({
	type: e,
	typeName: Y.ZodPromise,
	...w(t)
});
var G = class extends T {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === Y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = this._def.effect || null, i = {
			addIssue: (e) => {
				_(n, e), e.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return n.path;
			}
		};
		if (i.addIssue = i.addIssue.bind(i), r.type === "preprocess") {
			let e = r.transform(n.data, i);
			return n.common.issues.length ? {
				status: "dirty",
				value: n.data
			} : n.common.async ? Promise.resolve(e).then((e) => this._def.schema._parseAsync({
				data: e,
				path: n.path,
				parent: n
			})) : this._def.schema._parseSync({
				data: e,
				path: n.path,
				parent: n
			});
		}
		if (r.type === "refinement") {
			let e = (e) => {
				let t = r.refinement(e, i);
				if (n.common.async) return Promise.resolve(t);
				if (t instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return e;
			};
			if (n.common.async === !1) {
				let r = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? y : (r.status === "dirty" && t.dirty(), e(r.value), {
					status: t.value,
					value: r.value
				});
			} else return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((n) => n.status === "aborted" ? y : (n.status === "dirty" && t.dirty(), e(n.value).then(() => ({
				status: t.value,
				value: n.value
			}))));
		}
		if (r.type === "transform") if (n.common.async === !1) {
			let e = this._def.schema._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			if (!x(e)) return e;
			let a = r.transform(e.value, i);
			if (a instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
			return {
				status: t.value,
				value: a
			};
		} else return this._def.schema._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}).then((e) => x(e) ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
			status: t.value,
			value: e
		})) : e);
		d.assertNever(r);
	}
};
G.create = (e, t, n) => new G({
	schema: e,
	typeName: Y.ZodEffects,
	effect: t,
	...w(n)
}), G.createWithPreprocess = (e, t, n) => new G({
	schema: t,
	effect: {
		type: "preprocess",
		transform: e
	},
	typeName: Y.ZodEffects,
	...w(n)
});
var K = class extends T {
	_parse(e) {
		return this._getType(e) === f.undefined ? b(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
K.create = (e, t) => new K({
	innerType: e,
	typeName: Y.ZodOptional,
	...w(t)
});
var q = class extends T {
	_parse(e) {
		return this._getType(e) === f.null ? b(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
q.create = (e, t) => new q({
	innerType: e,
	typeName: Y.ZodNullable,
	...w(t)
});
var J = class extends T {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return t.parsedType === f.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
J.create = (e, t) => new J({
	innerType: e,
	typeName: Y.ZodDefault,
	defaultValue: typeof t.default == "function" ? t.default : () => t.default,
	...w(t)
});
var Le = class extends T {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = {
			...t,
			common: {
				...t.common,
				issues: []
			}
		}, r = this._def.innerType._parse({
			data: n.data,
			path: n.path,
			parent: { ...n }
		});
		return de(r) ? r.then((e) => ({
			status: "valid",
			value: e.status === "valid" ? e.value : this._def.catchValue({
				get error() {
					return new h(n.common.issues);
				},
				input: n.data
			})
		})) : {
			status: "valid",
			value: r.status === "valid" ? r.value : this._def.catchValue({
				get error() {
					return new h(n.common.issues);
				},
				input: n.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
Le.create = (e, t) => new Le({
	innerType: e,
	typeName: Y.ZodCatch,
	catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
	...w(t)
});
var Re = class extends T {
	_parse(e) {
		if (this._getType(e) !== f.nan) {
			let t = this._getOrReturnCtx(e);
			return _(t, {
				code: m.invalid_type,
				expected: f.nan,
				received: t.parsedType
			}), y;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
};
Re.create = (e) => new Re({
	typeName: Y.ZodNaN,
	...w(e)
});
var ze = Symbol("zod_brand"), Be = class extends T {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return this._def.type._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	unwrap() {
		return this._def.type;
	}
}, Ve = class e extends T {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async) return (async () => {
			let e = await this._def.in._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? y : e.status === "dirty" ? (t.dirty(), ce(e.value)) : this._def.out._parseAsync({
				data: e.value,
				path: n.path,
				parent: n
			});
		})();
		{
			let e = this._def.in._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? y : e.status === "dirty" ? (t.dirty(), {
				status: "dirty",
				value: e.value
			}) : this._def.out._parseSync({
				data: e.value,
				path: n.path,
				parent: n
			});
		}
	}
	static create(t, n) {
		return new e({
			in: t,
			out: n,
			typeName: Y.ZodPipeline
		});
	}
}, He = class extends T {
	_parse(e) {
		let t = this._def.innerType._parse(e);
		return x(t) && (t.value = Object.freeze(t.value)), t;
	}
};
He.create = (e, t) => new He({
	innerType: e,
	typeName: Y.ZodReadonly,
	...w(t)
});
var Ue = (e, t = {}, n) => e ? j.create().superRefine((r, i) => {
	if (!e(r)) {
		let e = typeof t == "function" ? t(r) : typeof t == "string" ? { message: t } : t, a = e.fatal ?? n ?? !0, o = typeof e == "string" ? { message: e } : e;
		i.addIssue({
			code: "custom",
			...o,
			fatal: a
		});
	}
}) : j.create(), We = { object: I.lazycreate }, Y;
(function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(Y || (Y = {}));
var Ge = (e, t = { message: `Input not instance of ${e.name}` }) => Ue((t) => t instanceof e, t), Ke = E.create, qe = Te.create, Je = Re.create, Ye = D.create, Xe = Ee.create, Ze = O.create, Qe = De.create, $e = k.create, et = A.create, tt = j.create, nt = M.create, rt = N.create, it = Oe.create, at = P.create, ot = I.create, st = I.strictCreate, ct = L.create, lt = Ae.create, ut = R.create, dt = z.create, ft = Me.create, pt = Ne.create, mt = Pe.create, ht = Fe.create, gt = B.create, _t = V.create, vt = H.create, yt = U.create, bt = W.create, xt = G.create, St = K.create, Ct = q.create, wt = G.createWithPreprocess, Tt = Ve.create, X = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	defaultErrorMap: g,
	setErrorMap: ie,
	getErrorMap: ae,
	makeIssue: oe,
	EMPTY_PATH: se,
	addIssueToContext: _,
	ParseStatus: v,
	INVALID: y,
	DIRTY: ce,
	OK: b,
	isAborted: le,
	isDirty: ue,
	isValid: x,
	isAsync: de,
	get util() {
		return d;
	},
	get objectUtil() {
		return te;
	},
	ZodParsedType: f,
	getParsedType: p,
	ZodType: T,
	ZodString: E,
	ZodNumber: Te,
	ZodBigInt: D,
	ZodBoolean: Ee,
	ZodDate: O,
	ZodSymbol: De,
	ZodUndefined: k,
	ZodNull: A,
	ZodAny: j,
	ZodUnknown: M,
	ZodNever: N,
	ZodVoid: Oe,
	ZodArray: P,
	ZodObject: I,
	ZodUnion: L,
	ZodDiscriminatedUnion: Ae,
	ZodIntersection: R,
	ZodTuple: z,
	ZodRecord: Me,
	ZodMap: Ne,
	ZodSet: Pe,
	ZodFunction: Fe,
	ZodLazy: B,
	ZodLiteral: V,
	ZodEnum: H,
	ZodNativeEnum: U,
	ZodPromise: W,
	ZodEffects: G,
	ZodTransformer: G,
	ZodOptional: K,
	ZodNullable: q,
	ZodDefault: J,
	ZodCatch: Le,
	ZodNaN: Re,
	BRAND: ze,
	ZodBranded: Be,
	ZodPipeline: Ve,
	ZodReadonly: He,
	custom: Ue,
	Schema: T,
	ZodSchema: T,
	late: We,
	get ZodFirstPartyTypeKind() {
		return Y;
	},
	coerce: {
		string: ((e) => E.create({
			...e,
			coerce: !0
		})),
		number: ((e) => Te.create({
			...e,
			coerce: !0
		})),
		boolean: ((e) => Ee.create({
			...e,
			coerce: !0
		})),
		bigint: ((e) => D.create({
			...e,
			coerce: !0
		})),
		date: ((e) => O.create({
			...e,
			coerce: !0
		}))
	},
	any: tt,
	array: at,
	bigint: Ye,
	boolean: Xe,
	date: Ze,
	discriminatedUnion: lt,
	effect: xt,
	enum: vt,
	function: ht,
	instanceof: Ge,
	intersection: ut,
	lazy: gt,
	literal: _t,
	map: pt,
	nan: Je,
	nativeEnum: yt,
	never: rt,
	null: et,
	nullable: Ct,
	number: qe,
	object: ot,
	oboolean: () => Xe().optional(),
	onumber: () => qe().optional(),
	optional: St,
	ostring: () => Ke().optional(),
	pipeline: Tt,
	preprocess: wt,
	promise: bt,
	record: ft,
	set: mt,
	strictObject: st,
	string: Ke,
	symbol: Qe,
	transformer: xt,
	tuple: dt,
	undefined: $e,
	union: ct,
	unknown: nt,
	void: it,
	NEVER: y,
	ZodIssueCode: m,
	quotelessJson: ne,
	ZodError: h
}), Z = X.object({ message: X.string() });
function Q(e) {
	return X.literal(o[e]);
}
var Et = X.object({
	serializedMessage: X.string().optional(),
	accountAddress: X.string(),
	chainId: X.string(),
	notBefore: X.string().optional(),
	domain: X.string(),
	uri: X.string(),
	version: X.string(),
	nonce: X.string(),
	statement: X.string().optional(),
	resources: X.array(X.string()).optional(),
	requestId: X.string().optional(),
	issuedAt: X.string().optional(),
	expirationTime: X.string().optional()
});
X.object({
	accessList: X.array(X.string()),
	blockHash: X.string().nullable(),
	blockNumber: X.string().nullable(),
	chainId: X.string().or(X.number()),
	from: X.string(),
	gas: X.string(),
	hash: X.string(),
	input: X.string().nullable(),
	maxFeePerGas: X.string(),
	maxPriorityFeePerGas: X.string(),
	nonce: X.string(),
	r: X.string(),
	s: X.string(),
	to: X.string(),
	transactionIndex: X.string().nullable(),
	type: X.string(),
	v: X.string(),
	value: X.string()
});
var Dt = X.object({
	chainId: X.string().or(X.number()),
	rpcUrl: X.optional(X.string())
}), Ot = X.object({ email: X.string().email() }), kt = X.object({ otp: X.string() }), At = X.object({
	uri: X.string(),
	preferredAccountType: X.optional(X.string()),
	chainId: X.optional(X.string().or(X.number())),
	siwxMessage: X.optional(Et),
	rpcUrl: X.optional(X.string())
}), jt = X.object({
	chainId: X.optional(X.string().or(X.number())),
	preferredAccountType: X.optional(X.string()),
	socialUri: X.optional(X.string()),
	siwxMessage: X.optional(Et),
	rpcUrl: X.optional(X.string())
}), Mt = X.object({ provider: X.enum([
	"google",
	"github",
	"apple",
	"facebook",
	"x",
	"discord"
]) }), Nt = X.object({ email: X.string().email() }), Pt = X.object({ otp: X.string() }), Ft = X.object({ otp: X.string() }), It = X.object({
	themeMode: X.optional(X.enum(["light", "dark"])),
	themeVariables: X.optional(X.record(X.string(), X.string().or(X.number()))),
	w3mThemeVariables: X.optional(X.record(X.string(), X.string()))
}), Lt = X.object({
	metadata: X.object({
		name: X.string(),
		description: X.string(),
		url: X.string(),
		icons: X.array(X.string())
	}).optional(),
	sdkVersion: X.string().optional(),
	sdkType: X.string().optional(),
	projectId: X.string()
}), Rt = X.object({ type: X.string() }), zt = X.object({ action: X.enum([
	"VERIFY_DEVICE",
	"VERIFY_OTP",
	"CONNECT"
]) }), Bt = X.object({ url: X.string() }), Vt = X.object({ userName: X.string() }), Ht = X.object({
	email: X.string().optional().nullable(),
	address: X.string(),
	chainId: X.string().or(X.number()),
	accounts: X.array(X.object({
		address: X.string(),
		type: X.enum([e.ACCOUNT_TYPES.EOA, e.ACCOUNT_TYPES.SMART_ACCOUNT])
	})).optional(),
	userName: X.string().optional().nullable(),
	preferredAccountType: X.optional(X.string()),
	signature: X.string().optional(),
	message: X.string().optional(),
	siwxMessage: X.optional(Et)
}), Ut = X.object({ action: X.enum(["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"]) }), Wt = X.object({
	email: X.string().email().optional().nullable(),
	address: X.string(),
	chainId: X.string().or(X.number()),
	smartAccountDeployed: X.optional(X.boolean()),
	accounts: X.array(X.object({
		address: X.string(),
		type: X.enum([e.ACCOUNT_TYPES.EOA, e.ACCOUNT_TYPES.SMART_ACCOUNT])
	})).optional(),
	preferredAccountType: X.optional(X.string()),
	signature: X.string().optional(),
	message: X.string().optional(),
	siwxMessage: X.optional(Et)
}), Gt = X.object({ uri: X.string() }), Kt = X.object({ isConnected: X.boolean() }), qt = X.object({ chainId: X.string().or(X.number()) }), Jt = X.object({ chainId: X.string().or(X.number()) }), Yt = X.object({ newEmail: X.string().email() }), Xt = X.object({ smartAccountEnabledNetworks: X.array(X.number()) });
X.object({
	address: X.string(),
	isDeployed: X.boolean()
});
var Zt = X.object({ version: X.string().optional() }), Qt = X.object({
	type: X.string(),
	address: X.string()
}), $t = X.any(), en = X.object({ method: X.literal("eth_accounts") }), tn = X.object({ method: X.literal("eth_blockNumber") }), nn = X.object({
	method: X.literal("eth_call"),
	params: X.array(X.any())
}), rn = X.object({ method: X.literal("eth_chainId") }), an = X.object({
	method: X.literal("eth_estimateGas"),
	params: X.array(X.any())
}), on = X.object({
	method: X.literal("eth_feeHistory"),
	params: X.array(X.any())
}), sn = X.object({ method: X.literal("eth_gasPrice") }), cn = X.object({
	method: X.literal("eth_getAccount"),
	params: X.array(X.any())
}), ln = X.object({
	method: X.literal("eth_getBalance"),
	params: X.array(X.any())
}), un = X.object({
	method: X.literal("eth_getBlockByHash"),
	params: X.array(X.any())
}), dn = X.object({
	method: X.literal("eth_getBlockByNumber"),
	params: X.array(X.any())
}), fn = X.object({
	method: X.literal("eth_getBlockReceipts"),
	params: X.array(X.any())
}), pn = X.object({
	method: X.literal("eth_getBlockTransactionCountByHash"),
	params: X.array(X.any())
}), mn = X.object({
	method: X.literal("eth_getBlockTransactionCountByNumber"),
	params: X.array(X.any())
}), hn = X.object({
	method: X.literal("eth_getCode"),
	params: X.array(X.any())
}), gn = X.object({
	method: X.literal("eth_getFilterChanges"),
	params: X.array(X.any())
}), _n = X.object({
	method: X.literal("eth_getFilterLogs"),
	params: X.array(X.any())
}), vn = X.object({
	method: X.literal("eth_getLogs"),
	params: X.array(X.any())
}), yn = X.object({
	method: X.literal("eth_getProof"),
	params: X.array(X.any())
}), bn = X.object({
	method: X.literal("eth_getStorageAt"),
	params: X.array(X.any())
}), xn = X.object({
	method: X.literal("eth_getTransactionByBlockHashAndIndex"),
	params: X.array(X.any())
}), Sn = X.object({
	method: X.literal("eth_getTransactionByBlockNumberAndIndex"),
	params: X.array(X.any())
}), Cn = X.object({
	method: X.literal("eth_getTransactionByHash"),
	params: X.array(X.any())
}), wn = X.object({
	method: X.literal("eth_getTransactionCount"),
	params: X.array(X.any())
}), Tn = X.object({
	method: X.literal("eth_getTransactionReceipt"),
	params: X.array(X.any())
}), En = X.object({
	method: X.literal("eth_getUncleCountByBlockHash"),
	params: X.array(X.any())
}), Dn = X.object({
	method: X.literal("eth_getUncleCountByBlockNumber"),
	params: X.array(X.any())
}), On = X.object({ method: X.literal("eth_maxPriorityFeePerGas") }), kn = X.object({ method: X.literal("eth_newBlockFilter") }), An = X.object({
	method: X.literal("eth_newFilter"),
	params: X.array(X.any())
}), jn = X.object({ method: X.literal("eth_newPendingTransactionFilter") }), Mn = X.object({
	method: X.literal("eth_sendRawTransaction"),
	params: X.array(X.any())
}), Nn = X.object({
	method: X.literal("eth_syncing"),
	params: X.array(X.any())
}), Pn = X.object({
	method: X.literal("eth_uninstallFilter"),
	params: X.array(X.any())
}), Fn = X.object({
	method: X.literal("personal_sign"),
	params: X.array(X.any())
}), In = X.object({
	method: X.literal("eth_signTypedData_v4"),
	params: X.array(X.any())
}), Ln = X.object({
	method: X.literal("eth_sendTransaction"),
	params: X.array(X.any())
}), Rn = X.object({
	method: X.literal("solana_signMessage"),
	params: X.object({
		message: X.string(),
		pubkey: X.string()
	})
}), zn = X.object({
	method: X.literal("solana_signTransaction"),
	params: X.object({ transaction: X.string() })
}), Bn = X.object({
	method: X.literal("solana_signAllTransactions"),
	params: X.object({ transactions: X.array(X.string()) })
}), Vn = X.object({
	method: X.literal("solana_signAndSendTransaction"),
	params: X.object({
		transaction: X.string(),
		options: X.object({
			skipPreflight: X.boolean().optional(),
			preflightCommitment: X.enum([
				"processed",
				"confirmed",
				"finalized",
				"recent",
				"single",
				"singleGossip",
				"root",
				"max"
			]).optional(),
			maxRetries: X.number().optional(),
			minContextSlot: X.number().optional()
		}).optional()
	})
}), Hn = X.object({
	method: X.literal("wallet_sendCalls"),
	params: X.array(X.object({
		chainId: X.string().or(X.number()).optional(),
		from: X.string().optional(),
		version: X.string().optional(),
		capabilities: X.any().optional(),
		calls: X.array(X.object({
			to: X.string().startsWith("0x"),
			data: X.string().startsWith("0x").optional(),
			value: X.string().optional()
		}))
	}))
}), Un = X.object({
	method: X.literal("wallet_getCallsStatus"),
	params: X.array(X.string())
}), Wn = X.object({
	method: X.literal("wallet_getCapabilities"),
	params: X.array(X.string().or(X.number()).optional()).optional()
}), Gn = X.object({
	method: X.literal("wallet_grantPermissions"),
	params: X.array(X.any())
}), Kn = X.object({
	method: X.literal("wallet_revokePermissions"),
	params: X.any()
}), qn = X.object({
	method: X.literal("wallet_getAssets"),
	params: X.any()
}), Jn = X.object({ token: X.string() }), $ = X.object({ id: X.string().optional() }), Yn = {
	appEvent: $.extend({
		type: Q("APP_SWITCH_NETWORK"),
		payload: Dt
	}).or($.extend({
		type: Q("APP_CONNECT_EMAIL"),
		payload: Ot
	})).or($.extend({ type: Q("APP_CONNECT_DEVICE") })).or($.extend({
		type: Q("APP_CONNECT_OTP"),
		payload: kt
	})).or($.extend({
		type: Q("APP_CONNECT_SOCIAL"),
		payload: At
	})).or($.extend({ type: Q("APP_GET_FARCASTER_URI") })).or($.extend({ type: Q("APP_CONNECT_FARCASTER") })).or($.extend({
		type: Q("APP_GET_USER"),
		payload: X.optional(jt)
	})).or($.extend({
		type: Q("APP_GET_SOCIAL_REDIRECT_URI"),
		payload: Mt
	})).or($.extend({ type: Q("APP_SIGN_OUT") })).or($.extend({
		type: Q("APP_IS_CONNECTED"),
		payload: X.optional(Jn)
	})).or($.extend({ type: Q("APP_GET_CHAIN_ID") })).or($.extend({ type: Q("APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS") })).or($.extend({ type: Q("APP_INIT_SMART_ACCOUNT") })).or($.extend({
		type: Q("APP_SET_PREFERRED_ACCOUNT"),
		payload: Rt
	})).or($.extend({
		type: Q("APP_RPC_REQUEST"),
		payload: Fn.or(qn).or(en).or(tn).or(nn).or(rn).or(an).or(on).or(sn).or(cn).or(ln).or(un).or(dn).or(fn).or(pn).or(mn).or(hn).or(gn).or(_n).or(vn).or(yn).or(bn).or(xn).or(Sn).or(Cn).or(wn).or(Tn).or(En).or(Dn).or(On).or(kn).or(An).or(jn).or(Mn).or(Nn).or(Pn).or(Fn).or(In).or(Ln).or(Rn).or(zn).or(Bn).or(Vn).or(Un).or(Hn).or(Wn).or(Gn).or(Kn).and(X.object({
			chainId: X.string().or(X.number()).optional(),
			chainNamespace: X.enum([
				"eip155",
				"solana",
				"polkadot",
				"bip122",
				"cosmos"
			]).optional(),
			rpcUrl: X.string().optional()
		}))
	})).or($.extend({
		type: Q("APP_UPDATE_EMAIL"),
		payload: Nt
	})).or($.extend({
		type: Q("APP_UPDATE_EMAIL_PRIMARY_OTP"),
		payload: Pt
	})).or($.extend({
		type: Q("APP_UPDATE_EMAIL_SECONDARY_OTP"),
		payload: Ft
	})).or($.extend({
		type: Q("APP_SYNC_THEME"),
		payload: It
	})).or($.extend({
		type: Q("APP_SYNC_DAPP_DATA"),
		payload: Lt
	})).or($.extend({ type: Q("APP_RELOAD") })).or($.extend({ type: Q("APP_RPC_ABORT") })),
	frameEvent: $.extend({
		type: Q("FRAME_SWITCH_NETWORK_ERROR"),
		payload: Z
	}).or($.extend({
		type: Q("FRAME_SWITCH_NETWORK_SUCCESS"),
		payload: Jt
	})).or($.extend({
		type: Q("FRAME_CONNECT_EMAIL_SUCCESS"),
		payload: zt
	})).or($.extend({
		type: Q("FRAME_CONNECT_EMAIL_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_GET_FARCASTER_URI_SUCCESS"),
		payload: Bt
	})).or($.extend({
		type: Q("FRAME_GET_FARCASTER_URI_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_CONNECT_FARCASTER_SUCCESS"),
		payload: Vt
	})).or($.extend({
		type: Q("FRAME_CONNECT_FARCASTER_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_CONNECT_OTP_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_CONNECT_OTP_SUCCESS") })).or($.extend({
		type: Q("FRAME_CONNECT_DEVICE_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_CONNECT_DEVICE_SUCCESS") })).or($.extend({
		type: Q("FRAME_CONNECT_SOCIAL_SUCCESS"),
		payload: Ht
	})).or($.extend({
		type: Q("FRAME_CONNECT_SOCIAL_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_GET_USER_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_GET_USER_SUCCESS"),
		payload: Wt
	})).or($.extend({
		type: Q("FRAME_GET_SOCIAL_REDIRECT_URI_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS"),
		payload: Gt
	})).or($.extend({
		type: Q("FRAME_SIGN_OUT_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_SIGN_OUT_SUCCESS") })).or($.extend({
		type: Q("FRAME_IS_CONNECTED_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_IS_CONNECTED_SUCCESS"),
		payload: Kt
	})).or($.extend({
		type: Q("FRAME_GET_CHAIN_ID_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_GET_CHAIN_ID_SUCCESS"),
		payload: qt
	})).or($.extend({
		type: Q("FRAME_RPC_REQUEST_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_RPC_REQUEST_SUCCESS"),
		payload: $t
	})).or($.extend({
		type: Q("FRAME_SESSION_UPDATE"),
		payload: Jn
	})).or($.extend({
		type: Q("FRAME_UPDATE_EMAIL_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_UPDATE_EMAIL_SUCCESS"),
		payload: Ut
	})).or($.extend({
		type: Q("FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS") })).or($.extend({
		type: Q("FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS"),
		payload: Yt
	})).or($.extend({
		type: Q("FRAME_SYNC_THEME_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_SYNC_THEME_SUCCESS") })).or($.extend({
		type: Q("FRAME_SYNC_DAPP_DATA_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_SYNC_DAPP_DATA_SUCCESS") })).or($.extend({
		type: Q("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS"),
		payload: Xt
	})).or($.extend({
		type: Q("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_INIT_SMART_ACCOUNT_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_SET_PREFERRED_ACCOUNT_SUCCESS"),
		payload: Qt
	})).or($.extend({
		type: Q("FRAME_SET_PREFERRED_ACCOUNT_ERROR"),
		payload: Z
	})).or($.extend({
		type: Q("FRAME_READY"),
		payload: Zt
	})).or($.extend({
		type: Q("FRAME_RELOAD_ERROR"),
		payload: Z
	})).or($.extend({ type: Q("FRAME_RELOAD_SUCCESS") }))
};
//#endregion
//#region node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrame.js
function Xn(e, t = {}) {
	return typeof t?.type == "string" && t?.type?.includes(e);
}
function Zn({ projectId: e, chainId: n, enableLogger: r, rpcUrl: o = i.BLOCKCHAIN_API_RPC_URL, enableCloudAuthAccount: s = !1 }) {
	let c = new URL(t);
	return c.searchParams.set("projectId", e), c.searchParams.set("chainId", String(n)), c.searchParams.set("version", a), c.searchParams.set("enableLogger", String(r)), c.searchParams.set("rpcUrl", o), s && c.searchParams.set("enableCloudAuthAccount", "true"), c.toString();
}
var Qn = class {
	constructor({ projectId: e, isAppClient: t = !1, chainId: n = "eip155:1", enableLogger: r = !0, enableCloudAuthAccount: a = !1, rpcUrl: s = i.BLOCKCHAIN_API_RPC_URL }) {
		if (this.iframe = null, this.iframeIsReady = !1, this.initFrame = () => {
			let e = document.getElementById("w3m-iframe");
			this.iframe && !e && document.body.appendChild(this.iframe);
		}, this.events = {
			registerFrameEventHandler: (e, t, n) => {
				function r({ data: n }) {
					if (!Xn(o.FRAME_EVENT_KEY, n)) return;
					let i = Yn.frameEvent.safeParse(n);
					if (!i.success) {
						console.warn("W3mFrame: invalid frame event", i.error.message);
						return;
					}
					i.data?.id === e && (t(i.data), window.removeEventListener("message", r));
				}
				u.isClient && (window.addEventListener("message", r), n.addEventListener("abort", () => {
					window.removeEventListener("message", r);
				}));
			},
			onFrameEvent: (e) => {
				u.isClient && window.addEventListener("message", ({ data: t }) => {
					if (!Xn(o.FRAME_EVENT_KEY, t)) return;
					let n = Yn.frameEvent.safeParse(t);
					n.success ? e(n.data) : console.warn("W3mFrame: invalid frame event", n.error.message);
				});
			},
			onAppEvent: (e) => {
				u.isClient && window.addEventListener("message", ({ data: t }) => {
					if (!Xn(o.APP_EVENT_KEY, t)) return;
					let n = Yn.appEvent.safeParse(t);
					n.success || console.warn("W3mFrame: invalid app event", n.error.message), e(t);
				});
			},
			postAppEvent: (e) => {
				if (u.isClient) {
					if (!this.iframe?.contentWindow) throw Error("W3mFrame: iframe is not set");
					this.iframe.contentWindow.postMessage(e, "*");
				}
			},
			postFrameEvent: (e) => {
				if (u.isClient) {
					if (!parent) throw Error("W3mFrame: parent is not set");
					parent.postMessage(e, "*");
				}
			}
		}, this.projectId = e, this.frameLoadPromise = new Promise((e, t) => {
			this.frameLoadPromiseResolver = {
				resolve: e,
				reject: t
			};
		}), this.rpcUrl = s, t && (this.frameLoadPromise = new Promise((e, t) => {
			this.frameLoadPromiseResolver = {
				resolve: e,
				reject: t
			};
		}), u.isClient)) {
			let t = document.createElement("iframe");
			t.id = "w3m-iframe", t.src = Zn({
				projectId: e,
				chainId: n,
				enableLogger: r,
				rpcUrl: this.rpcUrl,
				enableCloudAuthAccount: a
			}), t.name = "w3m-secure-iframe", t.style.position = "fixed", t.style.zIndex = "999999", t.style.display = "none", t.style.border = "none", t.style.animationDelay = "0s, 50ms", t.style.borderBottomLeftRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", t.style.borderBottomRightRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", this.iframe = t, this.iframe.onerror = () => {
				this.frameLoadPromiseResolver?.reject("Unable to load email login dependency");
			}, this.events.onFrameEvent((e) => {
				e.type === "@w3m-frame/READY" && (this.iframeIsReady = !0, this.frameLoadPromiseResolver?.resolve(void 0));
			});
		}
	}
	get networks() {
		let e = (/* @__PURE__ */ "eip155:1.eip155:5.eip155:11155111.eip155:10.eip155:420.eip155:42161.eip155:421613.eip155:137.eip155:80001.eip155:42220.eip155:1313161554.eip155:1313161555.eip155:56.eip155:97.eip155:43114.eip155:43113.eip155:324.eip155:280.eip155:100.eip155:8453.eip155:84531.eip155:84532.eip155:7777777.eip155:999.solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp.solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z.solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1".split(".")).map((e) => ({ [e]: {
			rpcUrl: `${this.rpcUrl}/v1/?chainId=${e}&projectId=${this.projectId}`,
			chainId: e
		} }));
		return Object.assign({}, ...e);
	}
}, $n = class {
	constructor(e) {
		let { logger: t, chunkLoggerController: r } = ee({ opts: s({ level: n }) });
		this.logger = c(t, this.constructor.name), this.chunkLoggerController = r, typeof window < "u" && this.chunkLoggerController?.downloadLogsBlobInBrowser && (window.downloadAppKitLogsBlob || (window.downloadAppKitLogsBlob = {}), window.downloadAppKitLogsBlob.sdk = () => {
			this.chunkLoggerController?.downloadLogsBlobInBrowser && this.chunkLoggerController.downloadLogsBlobInBrowser({ projectId: e });
		});
	}
}, er = class {
	constructor({ projectId: e, chainId: t, enableLogger: n = !0, onTimeout: r, abortController: i, getActiveCaipNetwork: a, getCaipNetworks: o, enableCloudAuthAccount: s }) {
		this.openRpcRequests = [], this.isInitialized = !1, n && (this.w3mLogger = new $n(e)), this.abortController = i, this.getActiveCaipNetwork = a, this.getCaipNetworks = o, this.w3mFrame = new Qn({
			projectId: e,
			isAppClient: !0,
			chainId: t,
			enableLogger: n,
			rpcUrl: this.getRpcUrl(t),
			enableCloudAuthAccount: s
		}), this.onTimeout = r, this.getLoginEmailUsed() && this.createFrame();
	}
	async createFrame() {
		this.w3mFrame.initFrame(), this.initPromise = new Promise((e) => {
			this.w3mFrame.events.onFrameEvent((t) => {
				t.type === o.FRAME_READY && setTimeout(() => {
					e();
				}, 500);
			});
		}), await this.initPromise, this.isInitialized = !0, this.initPromise = void 0;
	}
	async init() {
		if (!this.isInitialized) {
			if (this.initPromise) {
				await this.initPromise;
				return;
			}
			await this.createFrame();
		}
	}
	getLoginEmailUsed() {
		return !!l.get(o.EMAIL_LOGIN_USED_KEY);
	}
	getEmail() {
		return l.get(o.EMAIL);
	}
	getUsername() {
		return l.get(o.SOCIAL_USERNAME);
	}
	async reload() {
		try {
			await this.appEvent({ type: o.APP_RELOAD });
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error reloading iframe"), e;
		}
	}
	async connectEmail(e) {
		try {
			u.checkIfAllowedToTriggerEmail(), await this.init();
			let t = await this.appEvent({
				type: o.APP_CONNECT_EMAIL,
				payload: e
			});
			return this.setNewLastEmailLoginTime(), t;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting email"), e;
		}
	}
	async connectDevice() {
		try {
			return this.appEvent({ type: o.APP_CONNECT_DEVICE });
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting device"), e;
		}
	}
	async connectOtp(e) {
		try {
			return this.appEvent({
				type: o.APP_CONNECT_OTP,
				payload: e
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting otp"), e;
		}
	}
	async isConnected() {
		try {
			if (!this.getLoginEmailUsed()) return { isConnected: !1 };
			let e = await this.appEvent({ type: o.APP_IS_CONNECTED });
			return e?.isConnected || this.deleteAuthLoginCache(), e;
		} catch (e) {
			throw this.deleteAuthLoginCache(), this.w3mLogger?.logger.error({ error: e }, "Error checking connection"), e;
		}
	}
	async getChainId() {
		try {
			let e = await this.appEvent({ type: o.APP_GET_CHAIN_ID });
			return this.setLastUsedChainId(e.chainId), e;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error getting chain id"), e;
		}
	}
	async getSocialRedirectUri(e) {
		try {
			return await this.init(), this.appEvent({
				type: o.APP_GET_SOCIAL_REDIRECT_URI,
				payload: e
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error getting social redirect uri"), e;
		}
	}
	async updateEmail(e) {
		try {
			let t = await this.appEvent({
				type: o.APP_UPDATE_EMAIL,
				payload: e
			});
			return this.setNewLastEmailLoginTime(), t;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error updating email"), e;
		}
	}
	async updateEmailPrimaryOtp(e) {
		try {
			return this.appEvent({
				type: o.APP_UPDATE_EMAIL_PRIMARY_OTP,
				payload: e
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error updating email primary otp"), e;
		}
	}
	async updateEmailSecondaryOtp(e) {
		try {
			let t = await this.appEvent({
				type: o.APP_UPDATE_EMAIL_SECONDARY_OTP,
				payload: e
			});
			return this.setLoginSuccess(t.newEmail), t;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error updating email secondary otp"), e;
		}
	}
	async syncTheme(e) {
		try {
			return this.appEvent({
				type: o.APP_SYNC_THEME,
				payload: e
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error syncing theme"), e;
		}
	}
	async syncDappData(e) {
		try {
			return this.appEvent({
				type: o.APP_SYNC_DAPP_DATA,
				payload: e
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error syncing dapp data"), e;
		}
	}
	async getSmartAccountEnabledNetworks() {
		try {
			let e = await this.appEvent({ type: o.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS });
			return this.persistSmartAccountEnabledNetworks(e.smartAccountEnabledNetworks), e;
		} catch (e) {
			throw this.persistSmartAccountEnabledNetworks([]), this.w3mLogger?.logger.error({ error: e }, "Error getting smart account enabled networks"), e;
		}
	}
	async setPreferredAccount(e) {
		try {
			return this.appEvent({
				type: o.APP_SET_PREFERRED_ACCOUNT,
				payload: { type: e }
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error setting preferred account"), e;
		}
	}
	async connect(e) {
		if (e?.socialUri) try {
			await this.init();
			let t = this.getRpcUrl(e.chainId), n = await this.appEvent({
				type: o.APP_CONNECT_SOCIAL,
				payload: {
					uri: e.socialUri,
					preferredAccountType: e.preferredAccountType,
					chainId: e.chainId,
					siwxMessage: e.siwxMessage,
					rpcUrl: t
				}
			});
			return n.userName && this.setSocialLoginSuccess(n.userName), this.setLoginSuccess(n.email), this.setLastUsedChainId(n.chainId), this.user = n, n;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting social"), e;
		}
		else try {
			let t = e?.chainId || this.getLastUsedChainId() || 1, n = await this.getUser({
				chainId: t,
				preferredAccountType: e?.preferredAccountType,
				siwxMessage: e?.siwxMessage,
				rpcUrl: this.getRpcUrl(t)
			});
			return this.setLoginSuccess(n.email), this.setLastUsedChainId(n.chainId), this.user = n, n;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting"), e;
		}
	}
	async getUser(e) {
		try {
			await this.init();
			let t = e?.chainId || this.getLastUsedChainId() || 1, n = await this.appEvent({
				type: o.APP_GET_USER,
				payload: {
					...e,
					chainId: t,
					rpcUrl: this.getRpcUrl(t)
				}
			});
			return this.user = n, n;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting"), e;
		}
	}
	async connectSocial({ uri: e, chainId: t, preferredAccountType: n }) {
		try {
			await this.init();
			let r = this.getRpcUrl(t), i = await this.appEvent({
				type: o.APP_CONNECT_SOCIAL,
				payload: {
					uri: e,
					chainId: t,
					rpcUrl: r,
					preferredAccountType: n
				}
			});
			return i.userName && this.setSocialLoginSuccess(i.userName), i;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting social"), e;
		}
	}
	async getFarcasterUri() {
		try {
			return await this.init(), await this.appEvent({ type: o.APP_GET_FARCASTER_URI });
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error getting farcaster uri"), e;
		}
	}
	async connectFarcaster() {
		try {
			let e = await this.appEvent({ type: o.APP_CONNECT_FARCASTER });
			return e.userName && this.setSocialLoginSuccess(e.userName), e;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error connecting farcaster"), e;
		}
	}
	async switchNetwork({ chainId: e }) {
		try {
			let t = this.getRpcUrl(e), n = await this.appEvent({
				type: o.APP_SWITCH_NETWORK,
				payload: {
					chainId: e,
					rpcUrl: t
				}
			});
			return this.setLastUsedChainId(n.chainId), n;
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error switching network"), e;
		}
	}
	async disconnect() {
		try {
			return this.deleteAuthLoginCache(), await new Promise(async (e) => {
				let t = setTimeout(() => {
					e();
				}, 3e3);
				await this.appEvent({ type: o.APP_SIGN_OUT }), clearTimeout(t), e();
			});
		} catch (e) {
			throw this.w3mLogger?.logger.error({ error: e }, "Error disconnecting"), e;
		}
	}
	async request(t) {
		let n = t;
		try {
			if (e.GET_CHAIN_ID === t.method) return this.getLastUsedChainId();
			let r = t.chainNamespace || "eip155", i = this.getActiveCaipNetwork(r)?.id;
			n.chainNamespace = r, n.chainId = i, n.rpcUrl = this.getRpcUrl(i), this.rpcRequestHandler?.(t);
			let a = await this.appEvent({
				type: o.APP_RPC_REQUEST,
				payload: n
			});
			return this.rpcSuccessHandler?.(a, n), a;
		} catch (e) {
			throw this.rpcErrorHandler?.(e, n), this.w3mLogger?.logger.error({ error: e }, "Error requesting"), e;
		}
	}
	onRpcRequest(e) {
		this.rpcRequestHandler = e;
	}
	onRpcSuccess(e) {
		this.rpcSuccessHandler = e;
	}
	onRpcError(e) {
		this.rpcErrorHandler = e;
	}
	onIsConnected(e) {
		this.w3mFrame.events.onFrameEvent((t) => {
			t.type === o.FRAME_IS_CONNECTED_SUCCESS && t.payload.isConnected && e();
		});
	}
	onNotConnected(e) {
		this.w3mFrame.events.onFrameEvent((t) => {
			t.type === o.FRAME_IS_CONNECTED_ERROR && e(), t.type === o.FRAME_IS_CONNECTED_SUCCESS && !t.payload.isConnected && e();
		});
	}
	onConnect(e) {
		this.w3mFrame.events.onFrameEvent((t) => {
			t.type === o.FRAME_GET_USER_SUCCESS && e(t.payload);
		});
	}
	onSocialConnected(e) {
		this.w3mFrame.events.onFrameEvent((t) => {
			t.type === o.FRAME_CONNECT_SOCIAL_SUCCESS && e(t.payload);
		});
	}
	async getCapabilities() {
		try {
			return await this.request({ method: "wallet_getCapabilities" }) || {};
		} catch {
			return {};
		}
	}
	onSetPreferredAccount(t) {
		this.w3mFrame.events.onFrameEvent((n) => {
			n.type === o.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS ? t(n.payload) : n.type === o.FRAME_SET_PREFERRED_ACCOUNT_ERROR && t({ type: e.ACCOUNT_TYPES.EOA });
		});
	}
	getAvailableChainIds() {
		return Object.keys(this.w3mFrame.networks);
	}
	async rejectRpcRequests() {
		try {
			await Promise.all(this.openRpcRequests.map(async ({ abortController: t, method: n }) => {
				e.SAFE_RPC_METHODS.includes(n) || t.abort(), await this.appEvent({ type: o.APP_RPC_ABORT });
			})), this.openRpcRequests = [];
		} catch (e) {
			this.w3mLogger?.logger.error({ error: e }, "Error aborting RPC request");
		}
	}
	async appEvent(e) {
		let t, n;
		function r(e) {
			return e.replace("@w3m-app/", "");
		}
		let i = [
			o.APP_SYNC_DAPP_DATA,
			o.APP_SYNC_THEME,
			o.APP_SET_PREFERRED_ACCOUNT
		], a = r(e.type);
		return !this.w3mFrame.iframeIsReady && !i.includes(e.type) && (n = setTimeout(() => {
			this.onTimeout?.("iframe_load_failed"), this.abortController.abort();
		}, 2e4)), await this.w3mFrame.frameLoadPromise, clearTimeout(n), [
			o.APP_CONNECT_EMAIL,
			o.APP_CONNECT_DEVICE,
			o.APP_CONNECT_OTP,
			o.APP_CONNECT_SOCIAL,
			o.APP_GET_SOCIAL_REDIRECT_URI
		].map(r).includes(a) && (t = setTimeout(() => {
			this.onTimeout?.("iframe_request_timeout"), this.abortController.abort();
		}, 12e4)), new Promise((r, i) => {
			let o = Math.random().toString(36).substring(7);
			this.w3mLogger?.logger.info?.({
				event: e,
				id: o
			}, "Sending app event"), this.w3mFrame.events.postAppEvent({
				...e,
				id: o
			});
			let s = new AbortController();
			if (a === "RPC_REQUEST") {
				let t = e;
				this.openRpcRequests = [...this.openRpcRequests, {
					...t.payload,
					abortController: s
				}];
			}
			s.signal.addEventListener("abort", () => {
				a === "RPC_REQUEST" ? i(/* @__PURE__ */ Error("Request was aborted")) : a !== "GET_FARCASTER_URI" && i(/* @__PURE__ */ Error("Something went wrong"));
			});
			function c(e, s) {
				e.id === o && (s?.logger.info?.({
					framEvent: e,
					id: o
				}, "Received frame response"), e.type === `@w3m-frame/${a}_SUCCESS` ? (t && clearTimeout(t), n && clearTimeout(n), "payload" in e && r(e.payload), r(void 0)) : e.type === `@w3m-frame/${a}_ERROR` && (t && clearTimeout(t), n && clearTimeout(n), "payload" in e && i(Error(e.payload?.message || "An error occurred")), i(/* @__PURE__ */ Error("An error occurred"))));
			}
			this.w3mFrame.events.registerFrameEventHandler(o, (e) => c(e, this.w3mLogger), this.abortController.signal);
		});
	}
	setNewLastEmailLoginTime() {
		l.set(o.LAST_EMAIL_LOGIN_TIME, Date.now().toString());
	}
	setSocialLoginSuccess(e) {
		l.set(o.SOCIAL_USERNAME, e);
	}
	setLoginSuccess(e) {
		e && l.set(o.EMAIL, e), l.set(o.EMAIL_LOGIN_USED_KEY, "true"), l.delete(o.LAST_EMAIL_LOGIN_TIME);
	}
	deleteAuthLoginCache() {
		l.delete(o.EMAIL_LOGIN_USED_KEY), l.delete(o.EMAIL), l.delete(o.LAST_USED_CHAIN_KEY), l.delete(o.SOCIAL_USERNAME);
	}
	setLastUsedChainId(e) {
		e && l.set(o.LAST_USED_CHAIN_KEY, String(e));
	}
	getLastUsedChainId() {
		let e = l.get(o.LAST_USED_CHAIN_KEY) ?? void 0, t = Number(e);
		return isNaN(t) ? e : t;
	}
	persistSmartAccountEnabledNetworks(e) {
		l.set(o.SMART_ACCOUNT_ENABLED_NETWORKS, e.join(","));
	}
	getRpcUrl(e) {
		let t = e === void 0 ? void 0 : "eip155";
		typeof e == "string" && (t = e.includes(":") ? r.parseCaipNetworkId(e)?.chainNamespace : Number.isInteger(Number(e)) ? "eip155" : "solana");
		let n = this.getCaipNetworks(t);
		return (e ? n.find((t) => String(t.id) === String(e) || t.caipNetworkId === e) : n[0])?.rpcUrls.default.http?.[0];
	}
};
//#endregion
export { er as t };
