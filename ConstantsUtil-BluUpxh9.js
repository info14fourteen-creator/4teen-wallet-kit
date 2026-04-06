//#region node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js
var e = {
	ACCOUNT_TABS: [
		{ label: "Tokens" },
		{ label: "NFTs" },
		{ label: "Activity" }
	],
	SECURE_SITE_ORIGIN: (typeof process < "u" && process.env !== void 0 ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org",
	VIEW_DIRECTION: {
		Next: "next",
		Prev: "prev"
	},
	DEFAULT_CONNECT_METHOD_ORDER: [
		"email",
		"social",
		"wallet"
	],
	ANIMATION_DURATIONS: {
		HeaderText: 120,
		ModalHeight: 150,
		ViewTransition: 150
	}
};
//#endregion
export { e as t };
