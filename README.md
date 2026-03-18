# 4teen-wallet-kit

Core wallet connectivity and balance-reading layer for the 4TEEN ecosystem on TRON.

This repository is designed as a reusable foundation for:
- website integration
- future Telegram Mini App integration
- standalone widgets
- buy / swap / liquidity / unlock / timeline modules

## Scope of v1

Version 1 is focused on one thing:

**stable wallet connection on TRON with reliable balance reads immediately after connect**

### Supported network
- TRON Mainnet only

### Supported token
- 4TEEN: `TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A`

### Planned wallets for v1
- TronLink
- OKX Wallet
- Binance Wallet
- Trust Wallet
- Bitget Wallet
- TokenPocket
- MetaMask (TRON-compatible flow)
- WalletConnect fallback
- imToken
- FoxWallet

## Main goals

After a wallet connection is established, the module must reliably provide:
- connected address
- TRX balance
- 4TEEN token balance
- normalized wallet state for external modules

The kit is internally UI-agnostic, while also exposing a ready-to-use wallet button component for fast website integration.

## UX target

### Initial state
`CONNECT WALLET`

### Connected state example
`TJodT...zfwJ6 31.11 [TRX_ICON] 35.24 [4TEEN_ICON]`

## Architecture

The repository is split into the following layers:

- `core/` — constants, config, store, normalized wallet state
- `adapters/` — wallet-specific drivers, browser detection, registry, provider resolution
- `wallet/` — connect, disconnect, restore, runtime scheduling, session lifecycle
- `services/` — TRX and token balance reads
- `ui/` — wallet button, wallet picker, notices
- `assets/` — wallet and token icons
- `debug/` — debug overlay and wallet health inspection
- `diagnostics/` — signing and connection diagnostics
- `examples/` — plain website integration examples

## Design principles

1. Reown/AppKit handles modal and session UX where applicable.
2. The internal wallet store is the single source of truth.
3. A wallet is treated as fully connected only after:
   - address is resolved
   - TRX balance is resolved
   - 4TEEN balance is resolved
4. All downstream modules consume the same normalized wallet API.
5. Wallet-specific quirks are handled inside drivers, not scattered across the app.
6. The repository targets TRON Mainnet only.
7. Testnet support is intentionally out of scope for this repository.

## Connection model

The kit is built around a driver-based architecture.

Each wallet driver is responsible for:
- resolving the correct provider
- handling wallet-specific connect flow
- waiting for address availability
- binding provider / tronWeb state when needed
- exposing signing readiness
- subscribing to wallet events

This keeps the external API stable while allowing wallet-specific behavior internally.

## Connectivity contract

A wallet session is considered usable when the kit can provide:
- wallet identity
- resolved TRON address
- provider / tronWeb binding
- TRX balance
- 4TEEN token balance

Signing readiness is tracked separately so that wallet-specific execution modules can decide when to require strict signing checks.

## Public API target

```ts
initWalletKit(config)
initFourteenConnect(config)

openWalletModal()
connectWallet()
disconnectWallet()
restoreWalletSession()

refreshWalletBalances()
refreshAllBalances()

getWalletState()
getWalletAddress()
getTrxBalance()
getFourteenBalance()

subscribeWalletState(listener)
