# AGENTS Instructions

## Mission
Maintain a clean, schema-first repository for a Texas LAH/HMO practice platform where validated JSON artifacts drive tooling and app behavior.

## Non-Goals
- Do not generate or claim authoritative legal content in bootstrap/app-shell tasks.
- Do not draft future raw question batches here (Claude owns that stream outside this repo).
- Do not overengineer architecture or add heavy dependencies without explicit request.

## Operating Rules
- Keep changes small, focused, and reviewable.
- Prefer modular plain JavaScript and readable Markdown/JSON.
- Treat `data/questions_validated` and `data/exam_forms` as app runtime content sources.
- Do not modify `data/questions_raw` during app-shell tasks.
- Avoid schema churn; schema edits must be minimal and documented.

## File Ownership Guidance
- `data/master/*`: schema + governance contracts.
- `data/foundation/*`: model-generated foundation artifacts.
- `data/style/*`: model-generated style/trap artifacts.
- `data/questions_raw/*`: draft content staging only.
- `data/questions_validated/*`: approved batches and validation reports.
- `data/exam_forms/*`: assembled practice/exam forms.
- `app/*`: runtime shell/UI/session logic.
- `scripts/*`: validation/transformation tooling.
- `docs/*`: process and contributor documentation.

## Schema Safety
When editing `data/master/schemas.json`:
1. Keep changes minimal.
2. Update docs in `docs/data-contracts.md`.
3. Reflect contract impact in `README.md` or workflow docs.
4. Preserve backward compatibility unless explicitly approved.

## Content Safety
- Never fabricate unsupported legal rules.
- Mark placeholders explicitly.
- Keep non-legal placeholder content clearly separated from validated domain content.
