# 4teen-wallet-kit — PROJECT OVERVIEW

Generated: 2026-03-31T00:50:40.953Z
Repository: info14fourteen-creator/4teen-wallet-kit
Branch: main

## Snapshot rules

- This is a curated AI snapshot, not a full raw dump.
- Files are grouped for easier reading.
- Every file in this snapshot belongs to the repository shown above.

## Project tree

```txt
- .github/
  - workflows/
    - build-and-publish-ai-bundle.yml
    - build-and-publish.yml
- ai/
  - WORKING_RULES.md
- examples/
  - vanilla/
    - index.html
    - main.js
- scripts/
  - build-ai-bundle.js
- src/
  - adapters/
    - drivers/
      - binance/
        - index.js
      - bitget/
        - index.js
      - foxwallet/
        - index.js
      - imtoken/
        - index.js
      - metamask/
        - index.js
      - okx/
        - index.js
      - tokenpocket/
        - index.js
      - tronlink/
        - index.js
      - trust/
        - index.js
      - walletconnect/
        - index.js
    - registry/
      - getAvailableDrivers.js
      - getDriverById.js
      - getDriverMap.js
      - pickWalletAdapter.js
      - walletRegistry.js
    - shared/
      - accountRequests.js
      - addressResolver.js
      - browserDetection.js
      - createReadonlyTronWeb.js
      - providerResolver.js
      - signingReadiness.js
      - tokenBalanceReader.js
      - trxBalanceReader.js
    - createAdapters.js
    - priority.js
  - assets/
    - menu/
      - buy_menu.svg
      - liquidity_menu.svg
      - swap_menu.svg
      - unlock_menu.svg
    - socials/
      - discord_social.svg
      - facebook_social.svg
      - github_social.svg
      - instagram_social.svg
      - telegram_social.svg
      - threads_social.svg
      - tiktok_social.svg
      - whatsapp_social.svg
      - x_social.svg
      - youtube_social.svg
    - 4teen_swap.svg
    - 4teen.svg
    - binance.svg
    - bitget.svg
    - foxwallet.svg
    - imtoken.svg
    - justmoney_swap.svg
    - metamask.svg
    - okx.svg
    - sunio_swap.svg
    - swap_arrows.svg
    - text_bg.svg
    - tokenpocket.svg
    - tronlink.svg
    - trust.svg
    - trx_swap.svg
    - trx.svg
    - usdt_swap.svg
    - wallet.svg
    - walletconnect.svg
  - core/
    - config/
      - appkit.js
      - constants.js
      - token.js
      - wallets.js
    - store/
      - walletStore.js
    - utils/
      - address.js
      - format.js
      - tron.js
  - debug/
    - debugOverlay.js
  - diagnostics/
    - assertWalletSigning.js
    - walletDiagnostics.js
  - polyfills/
    - node.js
  - services/
    - balances/
      - getFourteenBalance.js
      - getTokenBalance.js
      - getTrxBalance.js
      - refreshAllBalances.js
    - contracts/
      - trc20.js
    - readonly/
      - getTokenContractData.js
      - getTokenDecimals.js
  - wallet/
    - actions/
      - connectWallet.js
      - disconnectWallet.js
      - refreshWalletBalances.js
      - restoreWalletSession.js
    - core/
      - walletManager.js
    - runtime/
      - bindAdapterEvents.js
      - buildWalletKitRuntime.js
      - refreshAvailableWallets.js
      - resolveAutoWallet.js
      - waitAdaptersReady.js
      - walletScheduler.js
    - services/
      - initWalletKit.js
      - restoreSession.js
    - session/
      - failWalletConnection.js
      - finalizeWalletConnection.js
  - widgets/
    - ambassadorCabinet/
      - ambassadorCabinet.css
      - index.js
    - ambassadorRegister/
      - ambassadorRegister.css
      - index.js
    - directBuy/
      - directBuy.css
      - index.js
    - liquidityController/
      - index.js
      - liquidityController.css
    - mobileShell/
      - index.js
    - swap/
      - providers/
        - justmoney.js
        - sunio.js
      - services/
        - quotes.js
        - swapExecution.js
      - constants.js
      - index.js
      - swap.css
    - unlockTimeline/
      - index.js
      - unlockTimeline.css
  - index.js
- package.json
- README.md
```

## Included files

- 4teen-wallet-kit :: ai/WORKING_RULES.md
- 4teen-wallet-kit :: package.json
- 4teen-wallet-kit :: README.md

---

## FILE: 4teen-wallet-kit :: ai/WORKING_RULES.md

```md
# 4TEEN WALLET REBUILD — WORKING RULES (GOLD STANDARD)

## Purpose

Define strict rules for how we work during the rebuild.  
This document is the contract between us for all further steps.

---

## CORE PRINCIPLES

### 1. FULL FILE REWRITE ONLY

- No partial patches
- No diff-style edits
- No “change this line” instructions

Every time:

- you send a file
- I return a FULL rewritten version
- ready for copy-paste

### 2. ENGLISH ONLY

- All code comments MUST be in English
- No Russian comments
- No mixed language

### 3. SOURCE OF TRUTH = YOUR FILE

- You ALWAYS send the current file from repo
- I NEVER assume its content
- I NEVER reuse outdated versions

### 4. NO GUESSING

If something is unclear:

- I ask OR design safely
- never invent hidden behavior

### 5. CLEAN ARCHITECTURE FIRST

We are not fixing bugs.  
We are rebuilding the system.

If file is bad:

- we rewrite

If file is useless:

- we delete

---

## FILE DECISION RULE

Every file falls into ONE category:

1. KEEP (unchanged or minimal change)
2. REWRITE (full replacement)
3. DELETE (no longer needed)

I will always explicitly say which one it is.

---

## REWRITE STANDARD

Every rewritten file must be:

- self-contained
- clean
- readable
- no dead code
- no legacy hacks
- no hidden fallbacks
- no cross-wallet leakage
- strict responsibility

---

## WALLET RULES

1. One wallet = one driver
2. No wallet logic outside driver
3. No global provider guessing
4. No TronLink shadow leaks into other wallets
5. Each driver must:
   - detect itself
   - connect itself
   - read balances
   - sign transactions

---

## FALLBACK RULES

Fallbacks must be:

- explicit
- ordered
- logged

Never silent.

---

## SESSION RULES

- Session must restore without reconnect
- Must NOT attach wrong wallet
- Must NOT pick random provider
- Must match walletId + environment

---

## UI RULES

UI must:

- not talk to providers
- not know wallet internals
- only use wallet manager

---

## DIAGNOSTICS RULES

Every important action must be traceable:

- connect
- restore
- balance read
- sign
- send
- disconnect

If something fails:

- we must know WHY

---

## TESTING RULES

After each rewritten file (important ones):

You test:

1. Connect
2. Balance
3. Reload page
4. Page navigation
5. Disconnect

If broken:

- we fix immediately
- no stacking bugs

---

## WORKFLOW

You send file →  
I respond with:

1. Decision (keep / rewrite / delete)
2. Full file (if rewrite)
3. Short explanation (if needed)

Then next file.

---

## STRICT RULE

No skipping steps.  
No jumping ahead.  
No “let’s fix later”.

Everything must work step-by-step.

---

## FINAL GOAL

- Stable wallet system
- No random failures
- No cross-wallet bugs
- Full control over behavior
- Ready for buy / swap / contract logic

---

## END
```

---

## FILE: 4teen-wallet-kit :: package.json

```json
{
  "name": "4teen-wallet-kit",
  "version": "0.2.0",
  "private": false,
  "type": "module",
  "main": "dist/fourteen-connect.umd.js",
  "module": "dist/fourteen-connect.es.js",
  "exports": {
    ".": {
      "import": "./dist/fourteen-connect.es.js",
      "require": "./dist/fourteen-connect.umd.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "clean": "rm -rf dist",

    "build:ai": "node scripts/build-ai-bundle.js",
    "build:all": "vite build && node scripts/build-ai-bundle.js"
  },
  "dependencies": {
    "@tronweb3/tronwallet-abstract-adapter": "latest",
    "@tronweb3/tronwallet-adapters": "latest",
    "tronweb": "latest"
  },
  "devDependencies": {
    "vite": "latest"
  }
}
```

---

## FILE: 4teen-wallet-kit :: README.md

```md
# 4TEEN Wallet Kit

TRON-focused frontend SDK for wallet connection, wallet runtime, balances, diagnostics, reusable UI, and ready-to-mount product widgets for the 4TEEN ecosystem.

## What this project is

4TEEN Wallet Kit is not just a wallet connector.

It is a modular frontend SDK that combines:
- multi-wallet adapter support
- wallet drivers and driver registry
- wallet runtime and session lifecycle
- balance and readonly contract services
- signing diagnostics
- reusable wallet UI
- ready-to-use product widgets
- ambassador widgets for registration and cabinet flows
- a mobile shell mounting layer

In its current structure, the repository is closer to a product SDK than to a minimal connect-button package.

## Current repository structure

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
    mobileShell.config.js
    mobileShell.css
    mobileShell.js
    noticeCenter.css
    noticeCenter.js
    walletButton.css
    walletButton.js
    walletDropdown.js
    walletPicker.css
    walletPicker.js
  wallet/
    actions/
    core/
    runtime/
    services/
    session/
  widgets/
    ambassadorCabinet/
    ambassadorRegister/
    directBuy/
    liquidityController/
    mobileShell/
    swap/
    unlockTimeline/
  index.js
examples/
  vanilla/
README.md
vite.config.js

## Main architecture

### 1. Adapters

Located in src/adapters/

This layer contains:
- wallet adapter creation
- wallet priority rules
- per-wallet drivers
- driver registry
- shared adapter utilities

Main files:
- src/adapters/createAdapters.js
- src/adapters/priority.js
- src/adapters/drivers/*
- src/adapters/registry/*
- src/adapters/shared/*

### 2. Core

Located in src/core/

This layer contains shared application primitives:
- config
- wallet state store
- address utilities
- formatting helpers
- tron utilities

Main files:
- src/core/config/*
- src/core/store/walletStore.js
- src/core/utils/*

### 3. Wallet runtime

Located in src/wallet/

This is the runtime flow for wallet lifecycle management.

It contains:
- wallet actions
- wallet manager
- runtime helpers
- session finalization and failure logic
- wallet service bootstrapping

Main files:
- src/wallet/actions/*
- src/wallet/core/walletManager.js
- src/wallet/runtime/*
- src/wallet/services/*
- src/wallet/session/*

### 4. Services

Located in src/services/

This layer contains app-facing logic for:
- balances
- readonly token data
- TRC20 helpers
- wallet connect, disconnect, init, and restore flows

Main files:
- src/services/balances/*
- src/services/contracts/*
- src/services/readonly/*
- src/services/wallet/*

### 5. Diagnostics

Located in src/diagnostics/

This layer is responsible for wallet diagnostics and signing assertions.

Main files:
- src/diagnostics/assertWalletSigning.js
- src/diagnostics/walletDiagnostics.js

### 6. UI

Located in src/ui/

Reusable interface primitives:
- wallet button
- wallet picker
- wallet dropdown
- notice center
- icons
- mobile shell UI support

Main files:
- src/ui/wallet/*
- src/ui/icons.js
- src/ui/mobileShell.*
- src/ui/noticeCenter.*
- src/ui/walletButton.*
- src/ui/walletDropdown.js
- src/ui/walletPicker.*

### 7. Widgets

Located in src/widgets/

This is the product layer built on top of the wallet and services stack.

Current widget modules:
- ambassadorCabinet
- ambassadorRegister
- directBuy
- liquidityController
- mobileShell
- swap
- unlockTimeline

## Supported wallets

The current adapter layer includes support for:
- TronLink
- OKX Wallet
- Binance Wallet
- TokenPocket
- Bitget Wallet
- Trust
- MetaMask
- imToken
- FoxWallet
- WalletConnect

The adapter factory builds browser-aware ordering and includes WalletConnect metadata for the 4TEEN application.

## Public entrypoint and exports

The main public entrypoint is:
- src/index.js

From the snapshot, the package exports not only high-level init and wallet methods, but also:
- wallet state helpers
- address utilities
- wallet UI mounting helpers
- widgets
- debug overlay helpers
- notice helpers
- adapter creation and browser detection helpers
- provider resolution utilities
- balance readers
- signing readiness utilities
- registry utilities

This means the package is intentionally usable at multiple layers:
- turnkey widget mounting
- wallet-aware app integration
- lower-level custom integration

## Current widgets

### Ambassador Register

Located in src/widgets/ambassadorRegister/

Contains:
- index.js
- ambassadorRegister.css

### Ambassador Cabinet

Located in src/widgets/ambassadorCabinet/

Contains:
- index.js
- ambassadorCabinet.css

### Direct Buy

Located in src/widgets/directBuy/

Contains:
- index.js
- directBuy.css

### Liquidity Controller

Located in src/widgets/liquidityController/

Contains:
- index.js
- liquidityController.css

### Swap

Located in src/widgets/swap/

Contains:
- providers
- quote services
- execution service
- constants
- widget entry
- styles

Structure:
- src/widgets/swap/providers/justmoney.js
- src/widgets/swap/providers/sunio.js
- src/widgets/swap/services/quotes.js
- src/widgets/swap/services/swapExecution.js
- src/widgets/swap/constants.js
- src/widgets/swap/index.js
- src/widgets/swap/swap.css

The current swap widget is built around route comparison and prepared execution flow for 4TEEN to TRX or USDT, with provider metadata for SUN.io and JustMoney.

### Unlock Timeline

Located in src/widgets/unlockTimeline/

Contains:
- index.js
- unlockTimeline.css

### Mobile Shell

Located in src/widgets/mobileShell/

Contains:
- index.js

## Wallet model

The codebase is built around a driver-based wallet architecture.

Important areas include:
- adapter creation
- wallet priority
- driver registry
- wallet runtime
- session restore
- diagnostics
- balance refresh

This means the project is not structured as a single connect-button package.
It is structured as a wallet-aware frontend kit.

## Signing and diagnostics

The repository includes explicit signing diagnostics and readiness logic.

Relevant files:
- src/adapters/shared/signingReadiness.js
- src/diagnostics/assertWalletSigning.js
- src/diagnostics/walletDiagnostics.js

This is important because the SDK is designed to support real wallet flows, not only passive connection state.

## Balance and readonly services

The project includes dedicated balance and readonly data services.

Balances:
- src/services/balances/getFourteenBalance.js
- src/services/balances/getTokenBalance.js
- src/services/balances/getTrxBalance.js
- src/services/balances/refreshAllBalances.js

Readonly token data:
- src/services/readonly/getTokenContractData.js
- src/services/readonly/getTokenDecimals.js
- src/services/readonly/getTokenSymbol.js
- src/services/readonly/getTokenTotalSupply.js

Contracts:
- src/services/contracts/trc20.js

## Example usage

The repository includes a vanilla example.

examples/vanilla/main.js:

import { initFourteenConnect } from '../../src/index.js';

const buttonTarget = document.getElementById('wallet-button');

initFourteenConnect({
  projectId: 'YOUR_REOWN_PROJECT_ID',
  buttonTarget
});

This shows that the package is meant to be mountable in a regular frontend context without requiring a framework-specific wrapper.

## Build and publish

The repository includes two important GitHub workflows:
- build-and-publish.yml
- build-and-publish-ai-bundle.yml

Observed build and release behavior from the snapshot:
- Node is used in CI
- npm install is used for dependencies
- npm run build is used for library build
- dist is uploaded as an artifact
- dist is published to gh-pages
- AI snapshot bundles are generated and committed into ai/latest

## Honest positioning

The most accurate current positioning is:

4TEEN Wallet Kit is a TRON-focused frontend SDK that combines wallet infrastructure, runtime lifecycle, balances, diagnostics, reusable UI, and product widgets for the 4TEEN ecosystem.

It is broader than a wallet connector and already includes end-user product surfaces such as swap, direct buy, liquidity, unlock timeline, ambassador registration, and ambassador cabinet modules.

## Suggested README short description

4TEEN Wallet Kit is a TRON-focused frontend SDK for the 4TEEN ecosystem. It combines multi-wallet connectivity, runtime and session management, balances, readonly token services, signing diagnostics, reusable wallet UI, and ready-to-mount product widgets.

## Suggested README title block

# 4TEEN Wallet Kit

TRON-focused frontend SDK for wallet connection, wallet runtime, balances, diagnostics, reusable UI, and ready-to-mount product widgets for the 4TEEN ecosystem.
```
