#!/usr/bin/env python3
"""Minimal artifact validator for bootstrap-stage repository checks."""

from __future__ import annotations

import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
BATCH_PATH = ROOT / "data/questions_validated/validated_batch_001.json"
REPORT_PATH = ROOT / "data/questions_validated/validation_report_001.json"


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def validate_batch(batch: dict) -> list[str]:
    errors: list[str] = []
    for field in ["id", "title", "status", "questions"]:
        if field not in batch:
            errors.append(f"batch missing field: {field}")

    questions = batch.get("questions", [])
    if not isinstance(questions, list) or not questions:
        errors.append("batch.questions must be a non-empty list")
        return errors

    required_question_fields = [
        "id",
        "prompt",
        "choices",
        "correct_choice",
        "rationale",
        "rationale_by_choice",
        "status",
    ]

    for idx, question in enumerate(questions):
        for field in required_question_fields:
            if field not in question:
                errors.append(f"question[{idx}] missing field: {field}")

        rationale_by_choice = question.get("rationale_by_choice", {})
        for key in ["A", "B", "C", "D"]:
            if key not in rationale_by_choice:
                errors.append(f"question[{idx}] missing rationale_by_choice.{key}")

    return errors


def validate_report(report: dict, batch_id: str) -> list[str]:
    errors: list[str] = []
    for field in ["id", "batch_id", "status", "summary", "flags", "generated_at"]:
        if field not in report:
            errors.append(f"report missing field: {field}")

    if report.get("batch_id") != batch_id:
        errors.append("report.batch_id does not match batch.id")

    return errors


def main() -> int:
    batch = load_json(BATCH_PATH)
    report = load_json(REPORT_PATH)

    errors = []
    errors.extend(validate_batch(batch))
    errors.extend(validate_report(report, batch.get("id", "")))

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Validation passed for validated batch and report.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
