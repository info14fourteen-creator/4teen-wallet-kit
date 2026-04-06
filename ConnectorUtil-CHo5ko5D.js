import { K as e, M as t, N as n, P as r, a as i, d as a, s as o, v as s, x as c } from "./ModalController-DHlkqy_7.js";
import { t as l } from "./ConstantsUtil-DozDCknC.js";
import { t as u } from "./ConstantsUtil-BluUpxh9.js";
//#region node_modules/viem/_esm/utils/data/isHex.js
function d(e, { strict: t = !0 } = {}) {
	return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x");
}
//#endregion
//#region node_modules/viem/_esm/utils/data/size.js
function f(e) {
	return d(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
//#endregion
//#region node_modules/viem/_esm/errors/version.js
var p = "2.47.10", m = {
	getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) => t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
	version: `viem@${p}`
}, h = class e extends Error {
	constructor(t, n = {}) {
		let r = n.cause instanceof e ? n.cause.details : n.cause?.message ? n.cause.message : n.details, i = n.cause instanceof e && n.cause.docsPath || n.docsPath, a = m.getDocsUrl?.({
			...n,
			docsPath: i
		}), o = [
			t || "An error occurred.",
			"",
			...n.metaMessages ? [...n.metaMessages, ""] : [],
			...a ? [`Docs: ${a}`] : [],
			...r ? [`Details: ${r}`] : [],
			...m.version ? [`Version: ${m.version}`] : []
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
		}), this.details = r, this.docsPath = i, this.metaMessages = n.metaMessages, this.name = n.name ?? this.name, this.shortMessage = t, this.version = p;
	}
	walk(e) {
		return ee(this, e);
	}
};
function ee(e, t) {
	return t?.(e) ? e : e && typeof e == "object" && "cause" in e && e.cause !== void 0 ? ee(e.cause, t) : t ? null : e;
}
//#endregion
//#region node_modules/viem/_esm/errors/data.js
var te = class extends h {
	constructor({ size: e, targetSize: t, type: n }) {
		super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`, { name: "SizeExceedsPaddingSizeError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/data/pad.js
function g(e, { dir: t, size: n = 32 } = {}) {
	return typeof e == "string" ? _(e, {
		dir: t,
		size: n
	}) : v(e, {
		dir: t,
		size: n
	});
}
function _(e, { dir: t, size: n = 32 } = {}) {
	if (n === null) return e;
	let r = e.replace("0x", "");
	if (r.length > n * 2) throw new te({
		size: Math.ceil(r.length / 2),
		targetSize: n,
		type: "hex"
	});
	return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function v(e, { dir: t, size: n = 32 } = {}) {
	if (n === null) return e;
	if (e.length > n) throw new te({
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
//#region node_modules/viem/_esm/errors/encoding.js
var ne = class extends h {
	constructor({ max: e, min: t, signed: n, size: r, value: i }) {
		super(`Number "${i}" is not in safe ${r ? `${r * 8}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`, { name: "IntegerOutOfRangeError" });
	}
}, re = class extends h {
	constructor({ givenSize: e, maxSize: t }) {
		super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, { name: "SizeOverflowError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/encoding/fromHex.js
function ie(e, { size: t }) {
	if (f(e) > t) throw new re({
		givenSize: f(e),
		maxSize: t
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/toHex.js
var ae = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function oe(e, t = {}) {
	return typeof e == "number" || typeof e == "bigint" ? le(e, t) : typeof e == "string" ? de(e, t) : typeof e == "boolean" ? se(e, t) : ce(e, t);
}
function se(e, t = {}) {
	let n = `0x${Number(e)}`;
	return typeof t.size == "number" ? (ie(n, { size: t.size }), g(n, { size: t.size })) : n;
}
function ce(e, t = {}) {
	let n = "";
	for (let t = 0; t < e.length; t++) n += ae[e[t]];
	let r = `0x${n}`;
	return typeof t.size == "number" ? (ie(r, { size: t.size }), g(r, {
		dir: "right",
		size: t.size
	})) : r;
}
function le(e, t = {}) {
	let { signed: n, size: r } = t, i = BigInt(e), a;
	r ? a = n ? (1n << BigInt(r) * 8n - 1n) - 1n : 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (a = BigInt(2 ** 53 - 1));
	let o = typeof a == "bigint" && n ? -a - 1n : 0;
	if (a && i > a || i < o) {
		let t = typeof e == "bigint" ? "n" : "";
		throw new ne({
			max: a ? `${a}${t}` : void 0,
			min: `${o}${t}`,
			signed: n,
			size: r,
			value: `${e}${t}`
		});
	}
	let s = `0x${(n && i < 0 ? (1n << BigInt(r * 8)) + BigInt(i) : i).toString(16)}`;
	return r ? g(s, { size: r }) : s;
}
var ue = /* @__PURE__ */ new TextEncoder();
function de(e, t = {}) {
	return ce(ue.encode(e), t);
}
//#endregion
//#region node_modules/viem/_esm/utils/lru.js
var fe = class extends Map {
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
		return super.has(e) && (super.delete(e), super.set(e, t)), t;
	}
	set(e, t) {
		if (super.has(e) && super.delete(e), super.set(e, t), this.maxSize && this.size > this.maxSize) {
			let e = super.keys().next().value;
			e !== void 0 && super.delete(e);
		}
		return this;
	}
}, y = (e, t, n) => JSON.stringify(e, (e, n) => {
	let r = typeof n == "bigint" ? n.toString() : n;
	return typeof t == "function" ? t(e, r) : r;
}, n), pe = {
	ether: -9,
	wei: 9
};
//#endregion
//#region node_modules/viem/_esm/utils/unit/formatGwei.js
function b(e, t = "wei") {
	return i(e, pe[t]);
}
//#endregion
//#region node_modules/viem/_esm/errors/utils.js
var me = (e) => e, x = class extends h {
	constructor({ body: e, cause: t, details: n, headers: r, status: i, url: a }) {
		super("HTTP request failed.", {
			cause: t,
			details: n,
			metaMessages: [
				i && `Status: ${i}`,
				`URL: ${me(a)}`,
				e && `Request body: ${y(e)}`
			].filter(Boolean),
			name: "HttpRequestError"
		}), Object.defineProperty(this, "body", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "headers", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "status", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "url", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), this.body = e, this.headers = r, this.status = i, this.url = a;
	}
}, he = class extends h {
	constructor({ body: e, error: t, url: n }) {
		super("RPC Request failed.", {
			cause: t,
			details: t.message,
			metaMessages: [`URL: ${me(n)}`, `Request body: ${y(e)}`],
			name: "RpcRequestError"
		}), Object.defineProperty(this, "code", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "data", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), Object.defineProperty(this, "url", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), this.code = t.code, this.data = t.data, this.url = n;
	}
}, ge = class extends h {
	constructor({ body: e, url: t }) {
		super("The request took too long to respond.", {
			details: "The request timed out.",
			metaMessages: [`URL: ${me(t)}`, `Request body: ${y(e)}`],
			name: "TimeoutError"
		}), Object.defineProperty(this, "url", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), this.url = t;
	}
}, _e = -1, S = class extends h {
	constructor(e, { code: t, docsPath: n, metaMessages: r, name: i, shortMessage: a }) {
		super(a, {
			cause: e,
			docsPath: n,
			metaMessages: r || e?.metaMessages,
			name: i || "RpcError"
		}), Object.defineProperty(this, "code", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), this.name = i || e.name, this.code = e instanceof he ? e.code : t ?? _e;
	}
}, C = class extends S {
	constructor(e, t) {
		super(e, t), Object.defineProperty(this, "data", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: void 0
		}), this.data = t.data;
	}
}, w = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "ParseRpcError",
			shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
		});
	}
};
Object.defineProperty(w, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32700
});
var T = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "InvalidRequestRpcError",
			shortMessage: "JSON is not a valid request object."
		});
	}
};
Object.defineProperty(T, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32600
});
var E = class e extends S {
	constructor(t, { method: n } = {}) {
		super(t, {
			code: e.code,
			name: "MethodNotFoundRpcError",
			shortMessage: `The method${n ? ` "${n}"` : ""} does not exist / is not available.`
		});
	}
};
Object.defineProperty(E, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32601
});
var D = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "InvalidParamsRpcError",
			shortMessage: ["Invalid parameters were provided to the RPC method.", "Double check you have provided the correct parameters."].join("\n")
		});
	}
};
Object.defineProperty(D, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32602
});
var O = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "InternalRpcError",
			shortMessage: "An internal error was received."
		});
	}
};
Object.defineProperty(O, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32603
});
var k = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "InvalidInputRpcError",
			shortMessage: ["Missing or invalid parameters.", "Double check you have provided the correct parameters."].join("\n")
		});
	}
};
Object.defineProperty(k, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32e3
});
var A = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "ResourceNotFoundRpcError",
			shortMessage: "Requested resource not found."
		}), Object.defineProperty(this, "name", {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: "ResourceNotFoundRpcError"
		});
	}
};
Object.defineProperty(A, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32001
});
var j = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "ResourceUnavailableRpcError",
			shortMessage: "Requested resource not available."
		});
	}
};
Object.defineProperty(j, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32002
});
var M = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "TransactionRejectedRpcError",
			shortMessage: "Transaction creation failed."
		});
	}
};
Object.defineProperty(M, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32003
});
var N = class e extends S {
	constructor(t, { method: n } = {}) {
		super(t, {
			code: e.code,
			name: "MethodNotSupportedRpcError",
			shortMessage: `Method${n ? ` "${n}"` : ""} is not supported.`
		});
	}
};
Object.defineProperty(N, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32004
});
var P = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "LimitExceededRpcError",
			shortMessage: "Request exceeds defined limit."
		});
	}
};
Object.defineProperty(P, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32005
});
var F = class e extends S {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "JsonRpcVersionUnsupportedError",
			shortMessage: "Version of JSON-RPC protocol is not supported."
		});
	}
};
Object.defineProperty(F, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: -32006
});
var I = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "UserRejectedRequestError",
			shortMessage: "User rejected the request."
		});
	}
};
Object.defineProperty(I, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 4001
});
var L = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "UnauthorizedProviderError",
			shortMessage: "The requested method and/or account has not been authorized by the user."
		});
	}
};
Object.defineProperty(L, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 4100
});
var R = class e extends C {
	constructor(t, { method: n } = {}) {
		super(t, {
			code: e.code,
			name: "UnsupportedProviderMethodError",
			shortMessage: `The Provider does not support the requested method${n ? ` " ${n}"` : ""}.`
		});
	}
};
Object.defineProperty(R, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 4200
});
var z = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "ProviderDisconnectedError",
			shortMessage: "The Provider is disconnected from all chains."
		});
	}
};
Object.defineProperty(z, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 4900
});
var B = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "ChainDisconnectedError",
			shortMessage: "The Provider is not connected to the requested chain."
		});
	}
};
Object.defineProperty(B, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 4901
});
var V = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "SwitchChainError",
			shortMessage: "An error occurred when attempting to switch chain."
		});
	}
};
Object.defineProperty(V, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 4902
});
var H = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "UnsupportedNonOptionalCapabilityError",
			shortMessage: "This Wallet does not support a capability that was not marked as optional."
		});
	}
};
Object.defineProperty(H, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5700
});
var U = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "UnsupportedChainIdError",
			shortMessage: "This Wallet does not support the requested chain ID."
		});
	}
};
Object.defineProperty(U, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5710
});
var W = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "DuplicateIdError",
			shortMessage: "There is already a bundle submitted with this ID."
		});
	}
};
Object.defineProperty(W, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5720
});
var G = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "UnknownBundleIdError",
			shortMessage: "This bundle id is unknown / has not been submitted"
		});
	}
};
Object.defineProperty(G, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5730
});
var K = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "BundleTooLargeError",
			shortMessage: "The call bundle is too large for the Wallet to process."
		});
	}
};
Object.defineProperty(K, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5740
});
var q = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "AtomicReadyWalletRejectedUpgradeError",
			shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
		});
	}
};
Object.defineProperty(q, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5750
});
var ve = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "AtomicityNotSupportedError",
			shortMessage: "The wallet does not support atomic execution but the request requires it."
		});
	}
};
Object.defineProperty(ve, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 5760
});
var J = class e extends C {
	constructor(t) {
		super(t, {
			code: e.code,
			name: "WalletConnectSessionSettlementError",
			shortMessage: "WalletConnect session settlement failed."
		});
	}
};
Object.defineProperty(J, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 7e3
});
var ye = class extends S {
	constructor(e) {
		super(e, {
			name: "UnknownRpcError",
			shortMessage: "An unknown RPC error occurred."
		});
	}
}, be = class extends h {
	constructor({ cause: e, message: t } = {}) {
		let n = t?.replace("execution reverted: ", "")?.replace("execution reverted", "");
		super(`Execution reverted ${n ? `with reason: ${n}` : "for an unknown reason"}.`, {
			cause: e,
			name: "ExecutionRevertedError"
		});
	}
};
Object.defineProperty(be, "code", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: 3
}), Object.defineProperty(be, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /execution reverted|gas required exceeds allowance/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, maxFeePerGas: t } = {}) {
		super(`The fee cap (\`maxFeePerGas\`${t ? ` = ${b(t)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
			cause: e,
			name: "FeeCapTooHighError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, maxFeePerGas: t } = {}) {
		super(`The fee cap (\`maxFeePerGas\`${t ? ` = ${b(t)}` : ""} gwei) cannot be lower than the block base fee.`, {
			cause: e,
			name: "FeeCapTooLowError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, nonce: t } = {}) {
		super(`Nonce provided for the transaction ${t ? `(${t}) ` : ""}is higher than the next one expected.`, {
			cause: e,
			name: "NonceTooHighError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /nonce too high/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, nonce: t } = {}) {
		super([`Nonce provided for the transaction ${t ? `(${t}) ` : ""}is lower than the current nonce of the account.`, "Try increasing the nonce or find the latest nonce with `getTransactionCount`."].join("\n"), {
			cause: e,
			name: "NonceTooLowError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /nonce too low|transaction already imported|already known/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, nonce: t } = {}) {
		super(`Nonce provided for the transaction ${t ? `(${t}) ` : ""}exceeds the maximum allowed nonce.`, {
			cause: e,
			name: "NonceMaxValueError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /nonce has max value/
}), Object.defineProperty(class extends h {
	constructor({ cause: e } = {}) {
		super(["The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."].join("\n"), {
			cause: e,
			metaMessages: [
				"This error could arise when the account does not have enough funds to:",
				" - pay for the total gas fee,",
				" - pay for the value to send.",
				" ",
				"The cost of the transaction is calculated as `gas * gas fee + value`, where:",
				" - `gas` is the amount of gas needed for transaction to execute,",
				" - `gas fee` is the gas fee,",
				" - `value` is the amount of ether to send to the recipient."
			],
			name: "InsufficientFundsError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /insufficient funds|exceeds transaction sender account balance/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, gas: t } = {}) {
		super(`The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
			cause: e,
			name: "IntrinsicGasTooHighError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /intrinsic gas too high|gas limit reached/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, gas: t } = {}) {
		super(`The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction is too low.`, {
			cause: e,
			name: "IntrinsicGasTooLowError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /intrinsic gas too low/
}), Object.defineProperty(class extends h {
	constructor({ cause: e }) {
		super("The transaction type is not supported for this chain.", {
			cause: e,
			name: "TransactionTypeNotSupportedError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /transaction type not valid/
}), Object.defineProperty(class extends h {
	constructor({ cause: e, maxPriorityFeePerGas: t, maxFeePerGas: n } = {}) {
		super([`The provided tip (\`maxPriorityFeePerGas\`${t ? ` = ${b(t)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${n ? ` = ${b(n)} gwei` : ""}).`].join("\n"), {
			cause: e,
			name: "TipAboveFeeCapError"
		});
	}
}, "nodeMessage", {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
//#endregion
//#region node_modules/viem/_esm/utils/promise/withResolvers.js
function xe() {
	let e = () => void 0, t = () => void 0;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/createBatchScheduler.js
var Se = /* @__PURE__ */ new Map();
function Ce({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0, sort: i }) {
	let a = async () => {
		let t = c();
		o();
		let n = t.map(({ args: e }) => e);
		n.length !== 0 && e(n).then((e) => {
			i && Array.isArray(e) && e.sort(i);
			for (let n = 0; n < t.length; n++) {
				let { resolve: r } = t[n];
				r?.([e[n], e]);
			}
		}).catch((e) => {
			for (let n = 0; n < t.length; n++) {
				let { reject: r } = t[n];
				r?.(e);
			}
		});
	}, o = () => Se.delete(t), s = () => c().map(({ args: e }) => e), c = () => Se.get(t) || [], l = (e) => Se.set(t, [...c(), e]);
	return {
		flush: o,
		async schedule(e) {
			let { promise: t, resolve: i, reject: o } = xe();
			return n?.([...s(), e]) && a(), c().length > 0 ? (l({
				args: e,
				resolve: i,
				reject: o
			}), t) : (l({
				args: e,
				resolve: i,
				reject: o
			}), setTimeout(a, r), t);
		}
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/wait.js
async function we(e) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withRetry.js
function Te(e, { delay: t = 100, retryCount: n = 2, shouldRetry: r = () => !0 } = {}) {
	return new Promise((i, a) => {
		let o = async ({ count: s = 0 } = {}) => {
			let c = async ({ error: e }) => {
				let n = typeof t == "function" ? t({
					count: s,
					error: e
				}) : t;
				n && await we(n), o({ count: s + 1 });
			};
			try {
				i(await e());
			} catch (e) {
				if (s < n && await r({
					count: s,
					error: e
				})) return c({ error: e });
				a(e);
			}
		};
		o();
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/uid.js
var Ee = 256, Y = Ee, X;
function De(e = 11) {
	if (!X || Y + e > Ee * 2) {
		X = "", Y = 0;
		for (let e = 0; e < Ee; e++) X += (256 + Math.random() * 256 | 0).toString(16).substring(1);
	}
	return X.substring(Y, Y++ + e);
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withDedupe.js
var Z = /* @__PURE__ */ new fe(8192);
function Oe(e, { enabled: t = !0, id: n }) {
	if (!t || !n) return e();
	if (Z.get(n)) return Z.get(n);
	let r = e().finally(() => Z.delete(n));
	return Z.set(n, r), r;
}
//#endregion
//#region node_modules/viem/_esm/utils/buildRequest.js
function ke(e, t = {}) {
	return async (n, r = {}) => {
		let { dedupe: i = !1, methods: a, retryDelay: o = 150, retryCount: s = 3, uid: c } = {
			...t,
			...r
		}, { method: l } = n;
		if (a?.exclude?.includes(l) || a?.include && !a.include.includes(l)) throw new N(/* @__PURE__ */ Error("method not supported"), { method: l });
		return Oe(() => Te(async () => {
			try {
				return await e(n);
			} catch (e) {
				let t = e;
				switch (t.code) {
					case w.code: throw new w(t);
					case T.code: throw new T(t);
					case E.code: throw new E(t, { method: n.method });
					case D.code: throw new D(t);
					case O.code: throw new O(t);
					case k.code: throw new k(t);
					case A.code: throw new A(t);
					case j.code: throw new j(t);
					case M.code: throw new M(t);
					case N.code: throw new N(t, { method: n.method });
					case P.code: throw new P(t);
					case F.code: throw new F(t);
					case I.code: throw new I(t);
					case L.code: throw new L(t);
					case R.code: throw new R(t);
					case z.code: throw new z(t);
					case B.code: throw new B(t);
					case V.code: throw new V(t);
					case H.code: throw new H(t);
					case U.code: throw new U(t);
					case W.code: throw new W(t);
					case G.code: throw new G(t);
					case K.code: throw new K(t);
					case q.code: throw new q(t);
					case ve.code: throw new ve(t);
					case 5e3: throw new I(t);
					case J.code: throw new J(t);
					default: throw e instanceof h ? e : new ye(t);
				}
			}
		}, {
			delay: ({ count: e, error: t }) => {
				if (t && t instanceof x) {
					let e = t?.headers?.get("Retry-After");
					if (e?.match(/\d/)) return Number.parseInt(e, 10) * 1e3;
				}
				return ~~(1 << e) * o;
			},
			retryCount: s,
			shouldRetry: ({ error: e }) => Ae(e)
		}), {
			enabled: i,
			id: i ? de(`${c}.${y(n)}`) : void 0
		});
	};
}
function Ae(e) {
	return "code" in e && typeof e.code == "number" ? e.code === -1 || e.code === P.code || e.code === O.code : e instanceof x && e.status ? e.status === 403 || e.status === 408 || e.status === 413 || e.status === 429 || e.status === 500 || e.status === 502 || e.status === 503 || e.status === 504 : !0;
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withTimeout.js
function je(e, { errorInstance: t = /* @__PURE__ */ Error("timed out"), timeout: n, signal: r }) {
	return new Promise((i, a) => {
		(async () => {
			let o;
			try {
				let s = new AbortController();
				n > 0 && (o = setTimeout(() => {
					r ? s.abort() : a(t);
				}, n)), i(await e({ signal: s?.signal || null }));
			} catch (e) {
				e?.name === "AbortError" && a(t), a(e);
			} finally {
				clearTimeout(o);
			}
		})();
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/rpc/id.js
function Me() {
	return {
		current: 0,
		take() {
			return this.current++;
		},
		reset() {
			this.current = 0;
		}
	};
}
var Ne = /* @__PURE__ */ Me();
//#endregion
//#region node_modules/viem/_esm/utils/rpc/http.js
function Pe(e, t = {}) {
	let { url: n, headers: r } = Fe(e);
	return { async request(e) {
		let { body: i, fetchFn: a = t.fetchFn ?? fetch, onRequest: o = t.onRequest, onResponse: s = t.onResponse, timeout: c = t.timeout ?? 1e4 } = e, l = {
			...t.fetchOptions ?? {},
			...e.fetchOptions ?? {}
		}, { headers: u, method: d, signal: f } = l;
		try {
			let e = await je(async ({ signal: e }) => {
				let t = {
					...l,
					body: y(Array.isArray(i) ? i.map((e) => ({
						jsonrpc: "2.0",
						id: e.id ?? Ne.take(),
						...e
					})) : {
						jsonrpc: "2.0",
						id: i.id ?? Ne.take(),
						...i
					}),
					headers: {
						...r,
						"Content-Type": "application/json",
						...u
					},
					method: d || "POST",
					signal: f || (c > 0 ? e : null)
				}, s = new Request(n, t), p = await o?.(s, t) ?? {
					...t,
					url: n
				};
				return await a(p.url ?? n, p);
			}, {
				errorInstance: new ge({
					body: i,
					url: n
				}),
				timeout: c,
				signal: !0
			});
			s && await s(e);
			let t;
			if (e.headers.get("Content-Type")?.startsWith("application/json")) t = await e.json();
			else {
				t = await e.text();
				try {
					t = JSON.parse(t || "{}");
				} catch (n) {
					if (e.ok) throw n;
					t = { error: t };
				}
			}
			if (!e.ok) {
				if (typeof t.error?.code == "number" && typeof t.error?.message == "string") return t;
				throw new x({
					body: i,
					details: y(t.error) || e.statusText,
					headers: e.headers,
					status: e.status,
					url: n
				});
			}
			return t;
		} catch (e) {
			throw e instanceof x || e instanceof ge ? e : new x({
				body: i,
				cause: e,
				url: n
			});
		}
	} };
}
function Fe(e) {
	try {
		let t = new URL(e), n = (() => {
			if (t.username) {
				let e = `${decodeURIComponent(t.username)}:${decodeURIComponent(t.password)}`;
				return t.username = "", t.password = "", {
					url: t.toString(),
					headers: { Authorization: `Basic ${btoa(e)}` }
				};
			}
		})();
		return {
			url: t.toString(),
			...n
		};
	} catch {
		return { url: e };
	}
}
//#endregion
//#region node_modules/viem/_esm/clients/transports/createTransport.js
function Ie({ key: e, methods: t, name: n, request: r, retryCount: i = 3, retryDelay: a = 150, timeout: o, type: s }, c) {
	let l = De();
	return {
		config: {
			key: e,
			methods: t,
			name: n,
			request: r,
			retryCount: i,
			retryDelay: a,
			timeout: o,
			type: s
		},
		request: ke(r, {
			methods: t,
			retryCount: i,
			retryDelay: a,
			uid: l
		}),
		value: c
	};
}
//#endregion
//#region node_modules/viem/_esm/clients/transports/fallback.js
function Le(e, t = {}) {
	let { key: n = "fallback", name: r = "Fallback", rank: i = !1, shouldThrow: a = Re, retryCount: o, retryDelay: s } = t;
	return (({ chain: t, pollingInterval: c = 4e3, timeout: l, ...u }) => {
		let d = e, f = () => {}, p = Ie({
			key: n,
			name: r,
			async request({ method: e, params: n }) {
				let r, i = async (o = 0) => {
					let s = d[o]({
						...u,
						chain: t,
						retryCount: 0,
						timeout: l
					});
					try {
						let t = await s.request({
							method: e,
							params: n
						});
						return f({
							method: e,
							params: n,
							response: t,
							transport: s,
							status: "success"
						}), t;
					} catch (c) {
						if (f({
							error: c,
							method: e,
							params: n,
							transport: s,
							status: "error"
						}), a(c) || o === d.length - 1 || (r ?? (r = d.slice(o + 1).some((n) => {
							let { include: r, exclude: i } = n({ chain: t }).config.methods || {};
							return r ? r.includes(e) : i ? !i.includes(e) : !0;
						})), !r)) throw c;
						return i(o + 1);
					}
				};
				return i();
			},
			retryCount: o,
			retryDelay: s,
			type: "fallback"
		}, {
			onResponse: (e) => f = e,
			transports: d.map((e) => e({
				chain: t,
				retryCount: 0
			}))
		});
		if (i) {
			let e = typeof i == "object" ? i : {};
			ze({
				chain: t,
				interval: e.interval ?? c,
				onTransports: (e) => d = e,
				ping: e.ping,
				sampleCount: e.sampleCount,
				timeout: e.timeout,
				transports: d,
				weights: e.weights
			});
		}
		return p;
	});
}
function Re(e) {
	return !!("code" in e && typeof e.code == "number" && (e.code === M.code || e.code === I.code || e.code === J.code || be.nodeMessage.test(e.message) || e.code === 5e3));
}
function ze({ chain: e, interval: t = 4e3, onTransports: n, ping: r, sampleCount: i = 10, timeout: a = 1e3, transports: o, weights: s = {} }) {
	let { stability: c = .7, latency: l = .3 } = s, u = [], d = async () => {
		let s = await Promise.all(o.map(async (t) => {
			let n = t({
				chain: e,
				retryCount: 0,
				timeout: a
			}), i = Date.now(), o, s;
			try {
				await (r ? r({ transport: n }) : n.request({ method: "net_listening" })), s = 1;
			} catch {
				s = 0;
			} finally {
				o = Date.now();
			}
			return {
				latency: o - i,
				success: s
			};
		}));
		u.push(s), u.length > i && u.shift();
		let f = Math.max(...u.map((e) => Math.max(...e.map(({ latency: e }) => e))));
		n(o.map((e, t) => {
			let n = u.map((e) => e[t].latency), r = 1 - n.reduce((e, t) => e + t, 0) / n.length / f, i = u.map((e) => e[t].success), a = i.reduce((e, t) => e + t, 0) / i.length;
			return a === 0 ? [0, t] : [l * r + c * a, t];
		}).sort((e, t) => t[0] - e[0]).map(([, e]) => o[e])), await we(t), d();
	};
	d();
}
//#endregion
//#region node_modules/viem/_esm/errors/transport.js
var Be = class extends h {
	constructor() {
		super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
			docsPath: "/docs/clients/intro",
			name: "UrlRequiredError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/clients/transports/http.js
function Q(e, t = {}) {
	let { batch: n, fetchFn: r, fetchOptions: i, key: a = "http", methods: o, name: s = "HTTP JSON-RPC", onFetchRequest: c, onFetchResponse: l, retryDelay: u, raw: d } = t;
	return ({ chain: f, retryCount: p, timeout: m }) => {
		let { batchSize: h = 1e3, wait: ee = 0 } = typeof n == "object" ? n : {}, te = t.retryCount ?? p, g = m ?? t.timeout ?? 1e4, _ = e || f?.rpcUrls.default.http[0];
		if (!_) throw new Be();
		let v = Pe(_, {
			fetchFn: r,
			fetchOptions: i,
			onRequest: c,
			onResponse: l,
			timeout: g
		});
		return Ie({
			key: a,
			methods: o,
			name: s,
			async request({ method: e, params: t }) {
				let r = {
					method: e,
					params: t
				}, { schedule: i } = Ce({
					id: _,
					wait: ee,
					shouldSplitBatch(e) {
						return e.length > h;
					},
					fn: (e) => v.request({ body: e }),
					sort: (e, t) => e.id - t.id
				}), [{ error: a, result: o }] = await (async (e) => n ? i(e) : [await v.request({ body: e })])(r);
				if (d) return {
					error: a,
					result: o
				};
				if (a) throw new he({
					body: r,
					error: a,
					url: _
				});
				return o;
			},
			retryCount: te,
			retryDelay: u,
			timeout: g,
			type: "http"
		}, {
			fetchOptions: i,
			url: _
		});
	};
}
//#endregion
//#region node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js
var Ve = {
	ConnectorExplorerIds: {
		[e.CONNECTOR_ID.COINBASE]: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
		[e.CONNECTOR_ID.COINBASE_SDK]: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
		[e.CONNECTOR_ID.SAFE]: "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
		[e.CONNECTOR_ID.LEDGER]: "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
		[e.CONNECTOR_ID.OKX]: "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
		[l.METMASK_CONNECTOR_NAME]: "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
		[l.TRUST_CONNECTOR_NAME]: "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
		[l.SOLFLARE_CONNECTOR_NAME]: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
		[l.PHANTOM_CONNECTOR_NAME]: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
		[l.COIN98_CONNECTOR_NAME]: "2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01",
		[l.MAGIC_EDEN_CONNECTOR_NAME]: "8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6",
		[l.BACKPACK_CONNECTOR_NAME]: "2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0",
		[l.BITGET_CONNECTOR_NAME]: "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
		[l.FRONTIER_CONNECTOR_NAME]: "85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041",
		[l.XVERSE_CONNECTOR_NAME]: "2a87d74ae02e10bdd1f51f7ce6c4e1cc53cd5f2c0b6b5ad0d7b3007d2b13de7b",
		[l.LEATHER_CONNECTOR_NAME]: "483afe1df1df63daf313109971ff3ef8356ddf1cc4e45877d205eee0b7893a13",
		[l.OKX_CONNECTOR_NAME]: "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709"
	},
	NetworkImageIds: {
		1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
		42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
		43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
		56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
		250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
		10: "ab9c186a-c52f-464b-2906-ca59d760a400",
		137: "41d04d42-da3b-4453-8506-668cc0727900",
		5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
		295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
		11155111: "e909ea0a-f92a-4512-c8fc-748044ea6800",
		84532: "a18a7ecd-e307-4360-4746-283182228e00",
		1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
		130: "2257980a-3463-48c6-cbac-a42d2a956e00",
		10143: "0a728e83-bacb-46db-7844-948f05434900",
		100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
		9001: "f926ff41-260d-4028-635e-91913fc28e00",
		324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
		314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
		4689: "34e68754-e536-40da-c153-6ef2e7188a00",
		1088: "3897a66d-40b9-4833-162f-a2c90531c900",
		1284: "161038da-44ae-4ec7-1208-0ea569454b00",
		1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
		7777777: "845c60df-d429-4991-e687-91ae45791600",
		42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
		8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
		1313161554: "3ff73439-a619-4894-9262-4470c773a100",
		2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
		2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
		80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
		2741: "fc2427d1-5af9-4a9c-8da5-6f94627cd900",
		"5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "a1b58899-f671-4276-6a5e-56ca5bd59700",
		"4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z": "a1b58899-f671-4276-6a5e-56ca5bd59700",
		EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
		"000000000019d6689c085ae165831e93": "0b4838db-0161-4ffe-022d-532bf03dba00",
		"000000000933ea01ad0ee984209779ba": "39354064-d79b-420b-065d-f980c4b78200"
	},
	ConnectorImageIds: {
		[e.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
		[e.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
		[e.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
		[e.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
		[e.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
		[e.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
	},
	ConnectorNamesMap: {
		[e.CONNECTOR_ID.INJECTED]: "Browser Wallet",
		[e.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
		[e.CONNECTOR_ID.COINBASE]: "Coinbase",
		[e.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
		[e.CONNECTOR_ID.LEDGER]: "Ledger",
		[e.CONNECTOR_ID.SAFE]: "Safe"
	},
	ConnectorTypesMap: {
		[e.CONNECTOR_ID.INJECTED]: "INJECTED",
		[e.CONNECTOR_ID.WALLET_CONNECT]: "WALLET_CONNECT",
		[e.CONNECTOR_ID.EIP6963]: "ANNOUNCED",
		[e.CONNECTOR_ID.AUTH]: "AUTH",
		[l.CONNECTOR_TYPE_AUTH]: "AUTH"
	},
	WalletConnectRpcChainIds: [
		1,
		5,
		11155111,
		10,
		420,
		42161,
		421613,
		137,
		80001,
		42220,
		1313161554,
		1313161555,
		56,
		97,
		43114,
		43113,
		100,
		8453,
		84531,
		7777777,
		999,
		324,
		280
	]
}, He = {
	getCaipTokens(e) {
		if (!e) return;
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			t[`${l.EIP155}:${e}`] = n;
		}), t;
	},
	isLowerCaseMatch(e, t) {
		return e?.toLowerCase() === t?.toLowerCase();
	},
	getActiveNamespaceConnectedToAuth() {
		let t = o.state.activeChain;
		return e.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((n) => s.getConnectorId(n) === e.CONNECTOR_ID.AUTH && n === t);
	},
	withRetry({ conditionFn: e, intervalMs: t, maxRetries: n }) {
		let r = 0;
		return new Promise((i) => {
			async function a() {
				return r += 1, await e() ? i(!0) : r >= n ? i(!1) : (setTimeout(a, t), null);
			}
			a();
		});
	}
}, Ue = "rpc.walletconnect.org";
function We(e, t) {
	let n = new URL("https://rpc.walletconnect.org/v1/");
	return n.searchParams.set("chainId", e), n.searchParams.set("projectId", t), n.toString();
}
var Ge = /* @__PURE__ */ "near:mainnet.solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp.eip155:1101.eip155:56.eip155:42161.eip155:7777777.eip155:59144.eip155:324.solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1.eip155:5000.solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz.eip155:80084.eip155:5003.eip155:100.eip155:8453.eip155:42220.eip155:1313161555.eip155:17000.eip155:1.eip155:300.eip155:1313161554.eip155:1329.eip155:84532.eip155:421614.eip155:11155111.eip155:8217.eip155:43114.solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z.eip155:999999999.eip155:11155420.eip155:80002.eip155:97.eip155:43113.eip155:137.eip155:10.eip155:1301.eip155:80094.eip155:80069.eip155:560048.eip155:31.eip155:2818.eip155:57054.eip155:911867.eip155:534351.eip155:1112.eip155:534352.eip155:1111.eip155:146.eip155:130.eip155:1284.eip155:30.eip155:2810.bip122:000000000019d6689c085ae165831e93.bip122:000000000933ea01ad0ee984209779ba".split("."), Ke = {
	extendRpcUrlWithProjectId(e, t) {
		let n = !1;
		try {
			n = new URL(e).host === Ue;
		} catch {
			n = !1;
		}
		if (n) {
			let n = new URL(e);
			return n.searchParams.has("projectId") || n.searchParams.set("projectId", t), n.toString();
		}
		return e;
	},
	isCaipNetwork(e) {
		return "chainNamespace" in e && "caipNetworkId" in e;
	},
	getChainNamespace(t) {
		return this.isCaipNetwork(t) ? t.chainNamespace : e.CHAIN.EVM;
	},
	getCaipNetworkId(t) {
		return this.isCaipNetwork(t) ? t.caipNetworkId : `${e.CHAIN.EVM}:${t.id}`;
	},
	getDefaultRpcUrl(e, t, n) {
		let r = e.rpcUrls?.default?.http?.[0];
		return Ge.includes(t) ? We(t, n) : r || "";
	},
	extendCaipNetwork(e, { customNetworkImageUrls: t, projectId: n, customRpcUrls: r }) {
		let i = this.getChainNamespace(e), a = this.getCaipNetworkId(e), o = e.rpcUrls?.default?.http?.[0], s = this.getDefaultRpcUrl(e, a, n), c = e?.rpcUrls?.chainDefault?.http?.[0] || o, l = r?.[a]?.map((e) => e.url) || [], u = [...l, ...s ? [s] : []], d = [...l];
		return c && !d.includes(c) && d.push(c), {
			...e,
			chainNamespace: i,
			caipNetworkId: a,
			assets: {
				imageId: Ve.NetworkImageIds[e.id],
				imageUrl: t?.[e.id]
			},
			rpcUrls: {
				...e.rpcUrls,
				default: { http: u },
				chainDefault: { http: d }
			}
		};
	},
	extendCaipNetworks(e, { customNetworkImageUrls: t, projectId: n, customRpcUrls: r }) {
		return e.map((e) => Ke.extendCaipNetwork(e, {
			customNetworkImageUrls: t,
			customRpcUrls: r,
			projectId: n
		}));
	},
	getViemTransport(e, t, n) {
		let r = [];
		return n?.forEach((e) => {
			r.push(Q(e.url, e.config));
		}), Ge.includes(e.caipNetworkId) && r.push(Q(We(e.caipNetworkId, t), { fetchOptions: { headers: { "Content-Type": "text/plain" } } })), e?.rpcUrls?.default?.http?.forEach((e) => {
			r.push(Q(e));
		}), Le(r);
	},
	extendWagmiTransports(e, t, n) {
		return Ge.includes(e.caipNetworkId) ? Le([n, Q(this.getDefaultRpcUrl(e, e.caipNetworkId, t))]) : n;
	},
	getUnsupportedNetwork(t) {
		return {
			id: t.split(":")[1],
			caipNetworkId: t,
			name: e.UNSUPPORTED_NETWORK_NAME,
			chainNamespace: t.split(":")[0],
			nativeCurrency: {
				name: "",
				decimals: 0,
				symbol: ""
			},
			rpcUrls: { default: { http: [] } }
		};
	},
	getCaipNetworkFromStorage(e) {
		let t = r.getActiveCaipNetworkId(), n = o.getAllRequestedCaipNetworks(), i = Array.from(o.state.chains?.keys() || []), a = t?.split(":")[0], s = a ? i.includes(a) : !1, c = n?.find((e) => e.caipNetworkId === t);
		return s && !c && t ? this.getUnsupportedNetwork(t) : c || e || n?.[0];
	}
}, qe = {
	filterOutDuplicatesByRDNS(e) {
		let i = t.state.enableEIP6963 ? s.state.connectors : [], a = r.getRecentWallets(), o = i.map((e) => e.info?.rdns).filter(Boolean), c = a.map((e) => e.rdns).filter(Boolean), l = o.concat(c);
		if (l.includes("io.metamask.mobile") && n.isMobile()) {
			let e = l.indexOf("io.metamask.mobile");
			l[e] = "io.metamask";
		}
		return e.filter((e) => !(e?.rdns && l.includes(String(e.rdns)) || !e?.rdns && i.some((t) => t.name === e.name)));
	},
	filterOutDuplicatesByIds(e) {
		let t = s.state.connectors.filter((e) => e.type === "ANNOUNCED" || e.type === "INJECTED"), n = r.getRecentWallets(), i = t.map((e) => e.explorerId), a = n.map((e) => e.id), o = i.concat(a);
		return e.filter((e) => !o.includes(e?.id));
	},
	filterOutDuplicateWallets(e) {
		let t = this.filterOutDuplicatesByRDNS(e);
		return this.filterOutDuplicatesByIds(t);
	},
	markWalletsAsInstalled(e) {
		let { connectors: n } = s.state, { featuredWalletIds: r } = t.state, i = n.filter((e) => e.type === "ANNOUNCED").reduce((e, t) => (t.info?.rdns && (e[t.info.rdns] = !0), e), {});
		return e.map((e) => ({
			...e,
			installed: !!e.rdns && !!i[e.rdns ?? ""]
		})).sort((e, t) => {
			let n = Number(t.installed) - Number(e.installed);
			if (n !== 0) return n;
			if (r?.length) {
				let n = r.indexOf(e.id), i = r.indexOf(t.id);
				if (n !== -1 && i !== -1) return n - i;
				if (n !== -1) return -1;
				if (i !== -1) return 1;
			}
			return 0;
		});
	},
	getConnectOrderMethod(e, n) {
		let r = e?.connectMethodsOrder || t.state.features?.connectMethodsOrder, i = n || s.state.connectors;
		if (r) return r;
		let { injected: a, announced: o } = $.getConnectorsByType(i, c.state.recommended, c.state.featured), l = a.filter($.showConnector), d = o.filter($.showConnector);
		return l.length || d.length ? [
			"wallet",
			"email",
			"social"
		] : u.DEFAULT_CONNECT_METHOD_ORDER;
	},
	isExcluded(e) {
		let t = !!e.rdns && c.state.excludedWallets.some((t) => t.rdns === e.rdns), n = !!e.name && c.state.excludedWallets.some((t) => He.isLowerCaseMatch(t.name, e.name));
		return t || n;
	},
	markWalletsWithDisplayIndex(e) {
		return e.map((e, t) => ({
			...e,
			display_index: t
		}));
	}
}, $ = {
	getConnectorsByType(e, n, i) {
		let { customWallets: a } = t.state, o = r.getRecentWallets(), s = qe.filterOutDuplicateWallets(n), c = qe.filterOutDuplicateWallets(i), l = e.filter((e) => e.type === "MULTI_CHAIN"), u = e.filter((e) => e.type === "ANNOUNCED"), d = e.filter((e) => e.type === "INJECTED");
		return {
			custom: a,
			recent: o,
			external: e.filter((e) => e.type === "EXTERNAL"),
			multiChain: l,
			announced: u,
			injected: d,
			recommended: s,
			featured: c
		};
	},
	showConnector(e) {
		let t = e.info?.rdns, r = !!t && c.state.excludedWallets.some((e) => !!e.rdns && e.rdns === t), i = !!e.name && c.state.excludedWallets.some((t) => He.isLowerCaseMatch(t.name, e.name));
		return !(e.type === "INJECTED" && (e.name === "Browser Wallet" && (!n.isMobile() || n.isMobile() && !t && !a.checkInstalled()) || r || i) || (e.type === "ANNOUNCED" || e.type === "EXTERNAL") && (r || i));
	},
	getIsConnectedWithWC() {
		return Array.from(o.state.chains.values()).some((t) => s.getConnectorId(t.namespace) === e.CONNECTOR_ID.WALLET_CONNECT);
	},
	getConnectorTypeOrder({ recommended: e, featured: n, custom: r, recent: i, announced: a, injected: o, multiChain: s, external: c, overriddenConnectors: l = t.state.features?.connectorTypeOrder ?? [] }) {
		let u = [
			{
				type: "walletConnect",
				isEnabled: t.state.enableWalletConnect
			},
			{
				type: "recent",
				isEnabled: i.length > 0
			},
			{
				type: "injected",
				isEnabled: [
					...o,
					...a,
					...s
				].length > 0
			},
			{
				type: "featured",
				isEnabled: n.length > 0
			},
			{
				type: "custom",
				isEnabled: r && r.length > 0
			},
			{
				type: "external",
				isEnabled: c.length > 0
			},
			{
				type: "recommended",
				isEnabled: e.length > 0
			}
		].filter((e) => e.isEnabled), d = new Set(u.map((e) => e.type)), f = l.filter((e) => d.has(e)).map((e) => ({
			type: e,
			isEnabled: !0
		})), p = u.filter(({ type: e }) => !f.some(({ type: t }) => t === e));
		return Array.from(new Set([...f, ...p].map(({ type: e }) => e)));
	},
	getAuthName({ email: e, socialUsername: t, socialProvider: n }) {
		return t ? n && n === "discord" && t.endsWith("0") ? t.slice(0, -1) : t : e.length > 30 ? `${e.slice(0, -3)}...` : e;
	},
	async fetchProviderData(t) {
		try {
			if (t.name === "Browser Wallet" && !n.isMobile() || t.id === e.CONNECTOR_ID.AUTH) return {
				accounts: [],
				chainId: void 0
			};
			let [r, i] = await Promise.all([t.provider?.request({ method: "eth_accounts" }), t.provider?.request({ method: "eth_chainId" }).then((e) => Number(e))]);
			return {
				accounts: r,
				chainId: i
			};
		} catch (e) {
			return console.warn(`Failed to fetch provider data for ${t.name}`, e), {
				accounts: [],
				chainId: void 0
			};
		}
	}
};
//#endregion
export { Ve as a, He as i, qe as n, oe as o, Ke as r, $ as t };
