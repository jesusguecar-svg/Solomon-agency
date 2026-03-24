# AGENTS Instructions

## Mission
Maintain a schema-first repository where validated JSON artifacts drive app behavior and tooling.

## Non-Goals
- Do not generate authoritative legal content in app/repo tasks.
- Do not draft future raw question content in this lane.
- Do not redesign approved upstream schema without explicit approval.

## Operating Rules
- Keep commits small and reviewable.
- Treat validated pipeline artifacts as source of truth.
- Do not modify `data/questions_raw` during app-shell work.
- Preserve modular architecture in `app/src` (`core`, `components`, `main`).

## Approved Question Shape (Current)
`question_item` explanations use:
- `correct_explanation`
- `wrong_explanations`

Do not replace with alternative explanation models unless approved.

## File Guidance
- `data/master/*`: schema and governance contracts.
- `data/questions_validated/*`: approved runtime question artifacts and validation reports.
- `data/exam_forms/*`: assembled practice/exam forms.
- `app/*`: runtime loader/session/UI shell.
- `docs/*`: contributor and process documentation.
- `scripts/*`: validation and transformation scripts.
