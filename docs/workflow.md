# Workflow

## Multi-Model Artifact Flow

1. **Gemini** creates foundation artifacts in `data/foundation/`.
2. **Grok** creates style/trap artifacts in `data/style/`.
3. **Claude** drafts raw question batches outside this repo process and publishes approved drafts into `data/questions_raw/` when instructed.
4. **ChatGPT** validates content and assembles approved artifacts into:
   - `data/questions_validated/`
   - `data/exam_forms/`
5. **Codex** builds app and tooling around approved artifacts.

## Repo-Lane Clarification (Current)
- This repository lane is app shell + loaders + docs + schema alignment.
- Future raw drafting is not performed here.

## Promotion Rules
- Raw artifacts are not runtime-safe.
- Only validated artifacts are app-consumable.
- `data/master/schemas.json` is the authoritative contract definition.

## Suggested Loop
1. Add/update validated batch + report.
2. Run schema checks.
3. Update app loaders/UI only if contract changes.
4. Keep commits small and reviewable.
