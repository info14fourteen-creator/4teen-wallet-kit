# 4TEEN Wallet Kit

TRON-focused wallet runtime, services layer, and ready-to-use UI widgets for the 4TEEN ecosystem.

## What this project is

4TEEN Wallet Kit is not just a wallet connector.

It is a modular frontend SDK that combines:

- multi-wallet adapter support
- wallet drivers and registry
- wallet runtime and session flow
- balance and readonly services
- diagnostics helpers
- reusable UI components
- product widgets such as swap, direct buy, liquidity control, and unlock timeline

## Project architecture

The repository is split into several layers.

### 1. Adapters

Located in `src/adapters/`

This layer contains:

- wallet adapter creation
- wallet priority rules
- per-wallet drivers
- driver registry
- shared adapter utilities

Structure:

- `src/adapters/createAdapters.js`
- `src/adapters/priority.js`
- `src/adapters/drivers/*`
- `src/adapters/registry/*`
- `src/adapters/shared/*`

Supported wallet drivers in the current structure:

- TronLink
- OKX
- Binance
- TokenPocket
- Bitget
- Trust
- MetaMask
- imToken
- FoxWallet
- WalletConnect

The adapter factory builds adapters with browser-aware ordering and WalletConnect metadata.

### 2. Core

Located in `src/core/`

This layer contains shared application-level primitives:

- config
- wallet store
- address / format / tron utils

Structure:

- `src/core/config/*`
- `src/core/store/walletStore.js`
- `src/core/utils/*`

### 3. Wallet runtime

Located in `src/wallet/`

This is the runtime flow for wallet lifecycle management.

It contains:

- wallet actions
- wallet manager
- runtime helpers
- session finalization / failure logic
- wallet service bootstrapping

Structure:

- `src/wallet/actions/*`
- `src/wallet/core/walletManager.js`
- `src/wallet/runtime/*`
- `src/wallet/services/*`
- `src/wallet/session/*`

### 4. Services

Located in `src/services/`

This layer contains app-facing logic for:

- balances
- readonly token data
- TRC20 contract helpers
- wallet connect / disconnect / init / restore flows

Structure:

- `src/services/balances/*`
- `src/services/contracts/*`
- `src/services/readonly/*`
- `src/services/wallet/*`

### 5. Diagnostics

Located in `src/diagnostics/`

This layer is responsible for wallet diagnostics and signing assertions.

Structure:

- `src/diagnostics/assertWalletSigning.js`
- `src/diagnostics/walletDiagnostics.js`

### 6. UI

Located in `src/ui/`

Reusable user interface primitives:

- wallet button
- wallet picker
- wallet dropdown
- notice center
- wallet icons

Structure:

- `src/ui/wallet/*`
- `src/ui/walletButton.js`
- `src/ui/walletDropdown.js`
- `src/ui/walletPicker.js`
- `src/ui/noticeCenter.js`
- `src/ui/icons.js`

### 7. Widgets

Located in `src/widgets/`

This is the product/widget layer built on top of the wallet and services stack.

Current widgets in the repository:

- `src/widgets/directBuy/`
- `src/widgets/liquidityController/`
- `src/widgets/swap/`
- `src/widgets/unlockTimeline/`

These are not placeholder names in README terms — they are actual modules present in the project structure.

## Current widgets

### Direct Buy

Located in `src/widgets/directBuy/`

Contains:

- `index.js`
- `directBuy.css`

### Liquidity Controller

Located in `src/widgets/liquidityController/`

Contains:

- `index.js`
- `liquidityController.css`

### Swap

Located in `src/widgets/swap/`

Contains:

- providers
- quote services
- execution service
- constants
- widget entry
- styles

Structure:

- `src/widgets/swap/providers/justmoney.js`
- `src/widgets/swap/providers/sunio.js`
- `src/widgets/swap/services/quotes.js`
- `src/widgets/swap/services/swapExecution.js`
- `src/widgets/swap/constants.js`
- `src/widgets/swap/index.js`
- `src/widgets/swap/swap.css`

### Unlock Timeline

Located in `src/widgets/unlockTimeline/`

Contains:

- `index.js`
- `unlockTimeline.css`

## Wallet model

The current codebase is built around a driver-based wallet architecture.

Important parts:

- adapter creation
- wallet priority
- driver registry
- wallet runtime
- session restore
- diagnostics
- balance refresh

This means the project is not structured as a single connect button package.
It is structured as a wallet-aware application kit.

## Signing and diagnostics

The repository includes explicit signing diagnostics and readiness logic.

Relevant files:

- `src/adapters/shared/signingReadiness.js`
- `src/diagnostics/assertWalletSigning.js`
- `src/diagnostics/walletDiagnostics.js`

This is an important part of the system because the project needs to support real wallet flows, not only passive connection state.

## Balance and readonly services

The project includes dedicated balance and readonly data services.

Balances:

- `src/services/balances/getFourteenBalance.js`
- `src/services/balances/getTokenBalance.js`
- `src/services/balances/getTrxBalance.js`
- `src/services/balances/refreshAllBalances.js`

Readonly token data:

- `src/services/readonly/getTokenContractData.js`
- `src/services/readonly/getTokenDecimals.js`
- `src/services/readonly/getTokenSymbol.js`
- `src/services/readonly/getTokenTotalSupply.js`

Contracts:

- `src/services/contracts/trc20.js`

## UI and product direction

Based on the actual structure, 4TEEN Wallet Kit is closer to a frontend product SDK than to a minimal wallet connector.

It currently includes:

- wallet connectivity
- wallet runtime
- balances
- readonly token helpers
- diagnostics
- reusable wallet UI
- end-user widgets

So the honest positioning is:

> 4TEEN Wallet Kit is a TRON-focused frontend SDK that combines wallet infrastructure, app services, reusable UI, and product widgets for the 4TEEN ecosystem.

## Project tree summary

```text
src/
  adapters/
    createAdapters.js
    priority.js
    drivers/
    registry/
    shared/
  assets/
  core/
    config/
    store/
    utils/
  debug/
  diagnostics/
  polyfills/
  services/
    balances/
    contracts/
    readonly/
    wallet/
  ui/
    wallet/
    icons.js
    noticeCenter.js
    walletButton.js
    walletDropdown.js
    walletPicker.js
  wallet/
    actions/
    core/
    runtime/
    services/
    session/
  widgets/
    directBuy/
    liquidityController/
    swap/
    unlockTimeline/
  index.js
