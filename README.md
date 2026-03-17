# 4teen-connect-kit

Core wallet connectivity and balance-reading layer for the 4TEEN ecosystem on TRON.

This repository is being built as a reusable module set for:
- website integration
- future Telegram Mini App integration
- standalone widgets
- buy / swap / liquidity / unlock / timeline modules

## Scope of v1

Version 1 focuses on one thing:
**stable wallet connection on TRON with reliable balance reads after connect.**

Supported network:
- TRON Mainnet only

Supported token:
- 4TEEN: `TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A`

Planned wallets for v1:
- TronLink
- OKX Wallet
- Binance Wallet
- Trust Wallet
- Bitget Wallet
- TokenPocket
- MetaMask (TRON-compatible flow)

## Main goals

After wallet connection, the module must reliably provide:
- connected address
- TRX balance
- 4TEEN token balance
- normalized wallet state for external modules

The module is designed to be UI-agnostic internally, while also exposing a ready-to-use wallet button component.

## UX target

Initial state:

`CONNECT WALLET`

Connected state example:

`TJodT...zfwJ6 31.11 [TRX_ICON] 35.24 [4TEEN_ICON]`

## Architecture

The repo is split into:

- `core/` — constants, config, store, shared types
- `adapters/` — wallet adapter registry and connection priorities
- `services/` — connect / disconnect / balances / token reads
- `ui/` — wallet button renderer and DOM binding
- `assets/` — token and chain icons
- `examples/` — plain website integration examples

## Design principles

1. Reown handles modal/session UX
2. Internal store remains the source of truth
3. A wallet is treated as fully connected only after:
   - address resolved
   - TRX balance read succeeds
   - 4TEEN balance read succeeds
4. All modules consume the same normalized wallet API
5. No testnet support in this repository

## Public API target

```ts
initWalletKit(config)
openWalletModal()
connectWallet()
disconnectWallet()
restoreWalletSession()

getWalletState()
getWalletAddress()
getTrxBalance()
getFourteenBalance()
subscribeWalletState(listener)
