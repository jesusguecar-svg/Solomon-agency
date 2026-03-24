# Data Contracts

## Core Artifact Types

### `rule_card`
Required: `id`, `topic_code`, `title`, `summary`, `points`, `status`

### `question_item`
Required:
- `id`
- `topic_code`
- `prompt`
- `choices` (`A`/`B`/`C`/`D`)
- `correct_choice`
- `correct_explanation`
- `wrong_explanations`
- `difficulty`
- `status`

Notes:
- `wrong_explanations` is keyed by incorrect choice letters (subset of `A`-`D`).
- App feedback uses `correct_explanation` plus `wrong_explanations`.

### `validation_flag`
Required: `id`, `artifact_type`, `artifact_id`, `severity`, `code`, `message`, `status`

### `practice_set`
Required: `id`, `title`, `mode`, `question_ids`, `status`
Optional: `time_limit_minutes`, `batch_ref`

### `mock_exam_form`
Required: `id`, `title`, `mode`, `question_ids`, `time_limit_minutes`, `passing_score_percent`, `status`

### `session_result`
Required: `id`, `user_id`, `mode`, `started_at`, `question_results`, `score_percent`, `status`

## Batch-Level Contracts

### `validated_question_batch`
Required: `id`, `title`, `status` (`validated`), `questions`
Optional: `validation_report_ref`, `notes`

### `validation_report`
Required: `id`, `batch_id`, `status`, `summary`, `flags`, `generated_at`

## Canonical Schema
- `data/master/schemas.json`
