# ecommerce-dashboard-practice

You are helping audit a migration script project that was AI-generated and likely has errors.
Your ONLY job right now is to understand the codebase and produce a planning document.
Do NOT make any changes to any file.

## Locations
- Source project: [PATH_TO_PROJECT]
- Environment A migrations: [PATH_TO_ENV_A_MIGRATIONS]
- Environment B migrations: [PATH_TO_ENV_B_MIGRATIONS]

---

## Step 1 — Get the lay of the land
List all files in both migration folders. Do not read them yet.
Also skim the source project structure (one level deep) to understand what kind of migrations these are.
Then STOP and tell me:
- How many migration files exist per environment
- What the naming convention looks like
- What database/framework this appears to be for

---

## Step 2 — Lightweight audit
Go through each migration file but read ONLY enough to understand its intent
(first 40–60 lines, or just the schema/table operations — skip boilerplate).

For each file, note:
- What it's trying to do
- Any immediately obvious mistakes (wrong types, missing rollbacks, broken references, hardcoded env values, ordering issues)
- Whether the same file exists in both environments and if they differ

---

## Step 3 — Identify error patterns
After reading all files, look for systemic patterns, not just one-off mistakes. For example:
- Is the same type of mistake repeated across files?
- Are there dependency/ordering issues (e.g. table B references table A but A is created after)?
- Are there things that would work in one environment but silently fail in the other?
- Are there edge cases that the original author clearly didn't think about?

---

## Step 4 — Write MIGRATION_PLAN.md
Create this file at [PATH_TO_PROJECT]/MIGRATION_PLAN.md with the following structure:

---
# Migration Audit & Fix Plan

## Project Overview
Brief description of what this migration project does.

## Environment Map
| Environment | Path | # of Files |
|-------------|------|------------|

## File Index
| File | Env | Purpose | Issues | Priority to Fix |
|------|-----|---------|--------|-----------------|

## Issues Found
For each issue:
### [Issue Name]
- **File(s):** ...
- **What's wrong:** ...
- **Why it's a problem:** ...
- **Edge cases to consider before fixing:** ...
- **Suggested fix:** ...

## Systemic Patterns
Things that are wrong across multiple files — fix these as a batch.

## Fix Order / Dependencies
Which files need to be fixed before others, and why.
(e.g. "Fix table_A migration before table_B because B has a FK to A")

## Open Questions
Things that are ambiguous and need my input before any fix can be made.

---

Do not update any migration f
