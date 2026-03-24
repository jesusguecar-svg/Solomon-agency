# Workflow

## Multi-Model Flow
1. Gemini builds foundation artifacts in `data/foundation/`.
2. Grok builds style/trap artifacts in `data/style/`.
3. Claude drafts raw batches (outside this repo lane) for eventual placement in `data/questions_raw/`.
4. ChatGPT validates and promotes artifacts into `data/questions_validated/` and `data/exam_forms/`.
5. Codex maintains app, loaders, schemas/docs alignment, and tooling around approved artifacts.

## Source-of-Truth Rule
- The validated content pipeline schema is authoritative.
- App and schemas must adapt to approved upstream structure.

## Promotion Rules
- Do not consume `data/questions_raw` in runtime app.
- Consume only validated batches and assembled forms.
- Keep schema changes minimal and explicit.
