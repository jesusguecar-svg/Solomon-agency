# Texas General Lines Life Accident Health and HMO Practice Engine

## Project Purpose
Schema-first repository for a content-driven exam practice app.

Priority order:
1. Schema-first
2. Content-second
3. UI-third

## Current Status
- Repository scaffold is in place.
- App shell is wired to the approved validated pipeline file names.
- Runtime uses validated artifacts from `data/questions_validated`.

## Repository Structure
```text
.
├── docs/
├── data/
│   ├── master/
│   ├── foundation/
│   ├── style/
│   ├── questions_raw/
│   ├── questions_validated/
│   └── exam_forms/
├── app/
├── scripts/
└── .github/
```

## Validated Pipeline Files (Current)
- `data/questions_validated/question_bank_validated_batch_01.json`
- `data/questions_validated/validation_report_batch_01.json`
- `data/exam_forms/practice_set_001.json`

## App Shell Capabilities
- Load validated batch JSON from `/data/questions_validated`
- Start batch practice session
- Show one question at a time
- Accept answer submission
- Show `correct_explanation`
- Show `wrong_explanations` for incorrect options
- Advance to next question
- Show session summary

## Local Run
From repository root:
```bash
python3 -m http.server 4173
```
Open:
- `http://localhost:4173/app/`

## Minimal Checks
```bash
python3 -m json.tool data/master/master_project.json >/dev/null
python3 -m json.tool data/master/schemas.json >/dev/null
python3 -m json.tool data/questions_validated/question_bank_validated_batch_01.json >/dev/null
python3 -m json.tool data/questions_validated/validation_report_batch_01.json >/dev/null
python3 scripts/validate_artifacts.py
```
