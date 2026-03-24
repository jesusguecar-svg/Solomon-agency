# Data Contracts

This document describes JSON contracts used by this repository.

## Core Artifact Types

### `rule_card`
Structured concept/rule entry tied to a topic.

Required fields:
- `id`, `topic_code`, `title`, `summary`, `points`, `status`

### `question_item`
A multiple-choice item used in validated batches.

Required fields:
- `id`, `topic_code`, `prompt`, `choices`, `correct_choice`, `rationale`, `rationale_by_choice`, `difficulty`, `status`

Notes:
- `choices` uses keys `A`, `B`, `C`, `D`.
- `rationale_by_choice` must include explanations for `A`, `B`, `C`, `D`.
- App shell uses this map to show why correct answers are right and wrong answers are wrong.

### `validation_flag`
Issue marker tied to an artifact.

Required fields:
- `id`, `artifact_type`, `artifact_id`, `severity`, `code`, `message`, `status`

### `practice_set`
Batch-practice assembly artifact.

Required fields:
- `id`, `title`, `mode`, `question_ids`, `status`

Optional:
- `time_limit_minutes`, `batch_ref`

### `mock_exam_form`
Exam-mode assembly artifact.

Required fields:
- `id`, `title`, `mode`, `question_ids`, `time_limit_minutes`, `passing_score_percent`, `status`

### `session_result`
App session outcome record.

Required fields:
- `id`, `user_id`, `mode`, `started_at`, `question_results`, `score_percent`, `status`

## Batch-Level Contracts

### `validated_question_batch`
Container for approved question items.

Required fields:
- `id`, `title`, `status` (`validated`), `questions`

Optional:
- `validation_report_ref`, `notes`

### `validation_report`
Validation output associated with a batch.

Required fields:
- `id`, `batch_id`, `status`, `summary`, `flags`, `generated_at`

## Canonical Machine Schema
All above contracts are defined in:
- `data/master/schemas.json`

Use this file as the validation authority.
