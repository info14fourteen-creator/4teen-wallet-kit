# SNAPSHOT INFO — 4teen-wallet-kit

- Generated: 2026-03-25T17:14:04.750Z
- Repository: info14fourteen-creator/4teen-wallet-kit
- Branch: main
- Files captured: 137
- Snapshot documents: 12
- Zip archive: ai/latest/4teen-wallet-kit.zip

## Notes

- Every snapshot file contains real file contents.
- Files are grouped for easier AI reading.
- Repository name is embedded in every snapshot file.
- Working rules remain in ai/WORKING_RULES.md.

## WORKING RULES

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
