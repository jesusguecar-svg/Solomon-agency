# Data Contracts

## `question_item` (approved validated schema)
Required fields:
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

Notes:
- `wrong_explanations` remains the canonical explanation map for incorrect options.
- `rationale_by_choice` is not part of the approved schema.

## `validated_question_batch`
Required fields:
- `batch_id`
- `title`
- `status`
- `questions`

Optional:
- `validation_report_ref`

## `validation_report`
Required fields:
- `id`
- `batch_id`
- `status`
- `summary`
- `flags`
- `generated_at`

## `validated_batches_manifest`
Required fields:
- `id`
- `version`
- `batches[]` entries with:
  - `batch_id`
  - `batch_path`
  - `report_path`

## Canonical Contract File
- `data/master/schemas.json`
