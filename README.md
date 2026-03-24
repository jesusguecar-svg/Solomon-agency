# Texas General Lines Life Accident Health and HMO Practice Engine

## Project Purpose
Schema-first repository for a validated-content exam practice app.

## Current Validated-Content Pipeline
- Runtime consumes only files from `data/questions_validated`.
- Manifest-driven discovery is used via `data/questions_validated/validated_batches_manifest.json`.
- Manifest includes approved entries for batches 01, 02, and 03.
- App loads only manifest entries that are present on disk at runtime.

## Manifest + Validated Files
- `data/questions_validated/validated_batches_manifest.json`
- `data/questions_validated/question_bank_validated_batch_01.json`
- `data/questions_validated/question_bank_validated_batch_02.json`
- `data/questions_validated/question_bank_validated_batch_03.json`
- `data/questions_validated/validation_report_batch_01.json`
- `data/questions_validated/validation_report_batch_02.json`
- `data/questions_validated/validation_report_batch_03.json`

## Approved Question Fields
`question_item` shape consumed by app/contracts:
- `question_id`
- `rule_ids`
- `domain`
- `subdomain`
- `difficulty`
- `format`
- `stem`
- `options`
- `correct_answer`
- `correct_explanation`
- `wrong_explanations`
- `trap_type`
- `source_confidence`
- `review_status`
- `status_history`

## App Shell Behavior
- Discovers and loads validated batches only.
- Starts batch-practice session from selected validated batch.
- Shows one question at a time and feedback explanations.
- Preserves session summary behavior.

## Local Run
From repository root:
```bash
python3 -m http.server 4173
```
Open `http://localhost:4173/app/`.

## Checks
```bash
python3 -m json.tool data/master/master_project.json >/dev/null
python3 -m json.tool data/master/schemas.json >/dev/null
python3 -m json.tool data/questions_validated/validated_batches_manifest.json >/dev/null
python3 scripts/validate_artifacts.py
```
