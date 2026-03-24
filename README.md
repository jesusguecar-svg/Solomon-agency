# Texas General Lines Life Accident Health and HMO Practice Engine

## Project Purpose
This repository is the source-of-truth for a schema-first exam practice platform.

Priority order:
1. Schema-first
2. Content-second
3. UI-third

## Current Status
- Foundation repository structure is in place.
- A first **validated non-legal placeholder batch** and validation report are present for app wiring.
- App shell supports one-question-at-a-time batch practice flow.

## Repository Structure
```text
.
├── docs/                     # Project/process documentation
├── data/
│   ├── master/               # Governance metadata + schemas
│   ├── foundation/           # Foundation artifacts (model-produced)
│   ├── style/                # Style/trap artifacts (model-produced)
│   ├── questions_raw/        # Draft question batches (not app-consumable)
│   ├── questions_validated/  # Approved validated question artifacts
│   └── exam_forms/           # Practice sets and exam forms
├── app/                      # Minimal frontend shell
├── scripts/                  # Validation + transformation tooling
└── .github/                  # Repo/CI metadata
```

## Data Folder Responsibilities
- `data/master`: canonical schemas and project-level workflow/validation rules.
- `data/foundation`: foundation content artifacts created upstream.
- `data/style`: style and distractor/trap guidance artifacts.
- `data/questions_raw`: non-final drafts (do not load in runtime app).
- `data/questions_validated`: validated batches and validation reports.
- `data/exam_forms`: practice/exam assembly artifacts referencing validated questions.

## App Modes (Target)
- Batch Practice
- Review Mode
- Exam Mode

## Working App Shell (Current)
The current shell in `app/` can:
- Load validated batch JSON from `/data/questions_validated`
- Start a batch practice session
- Show one question at a time
- Accept one answer per question
- Show why the correct answer is right
- Show why wrong answers are wrong
- Move to next question
- Show session summary

## Local Run
From repository root:
```bash
python3 -m http.server 4173
```
Open:
- `http://localhost:4173/app/`

## Minimal Dev Checks
```bash
python3 -m json.tool data/master/master_project.json >/dev/null
python3 -m json.tool data/master/schemas.json >/dev/null
python3 -m json.tool data/questions_validated/validated_batch_001.json >/dev/null
python3 -m json.tool data/questions_validated/validation_report_001.json >/dev/null
```

## Roadmap (Short)
1. Add JSON schema validation script in `scripts/`.
2. Add CI job for schema + artifact checks.
3. Connect `data/exam_forms` artifacts to mode selector.
4. Add persistence for `session_result` exports.
