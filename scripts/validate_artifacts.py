#!/usr/bin/env python3
"""Minimal validator for approved validated-batch artifacts."""

from __future__ import annotations

import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data/questions_validated/validated_batches_manifest.json"


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def validate_question(question: dict, idx: int) -> list[str]:
    errors: list[str] = []
    required = [
        "question_id",
        "rule_ids",
        "domain",
        "subdomain",
        "difficulty",
        "format",
        "stem",
        "options",
        "correct_answer",
        "correct_explanation",
        "wrong_explanations",
        "trap_type",
        "source_confidence",
        "review_status",
        "status_history",
    ]

    for field in required:
        if field not in question:
            errors.append(f"question[{idx}] missing field: {field}")

    if not isinstance(question.get("wrong_explanations", {}), dict):
        errors.append(f"question[{idx}] wrong_explanations must be an object")

    return errors


def validate_batch(batch: dict, path: Path) -> list[str]:
    errors: list[str] = []
    for field in ["batch_id", "title", "status", "questions"]:
        if field not in batch:
            errors.append(f"{path.name} missing field: {field}")

    questions = batch.get("questions", [])
    if not isinstance(questions, list) or not questions:
        errors.append(f"{path.name} questions must be a non-empty list")
        return errors

    for idx, question in enumerate(questions):
        errors.extend(validate_question(question, idx))

    return errors


def validate_report(report: dict, batch: dict, report_path: Path) -> list[str]:
    errors: list[str] = []
    for field in ["id", "batch_id", "status", "summary", "flags", "generated_at"]:
        if field not in report:
            errors.append(f"{report_path.name} missing field: {field}")

    if report.get("batch_id") != batch.get("batch_id"):
        errors.append(f"{report_path.name} batch_id does not match {batch.get('batch_id')}")

    return errors


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    found_batches = []

    manifest = load_json(MANIFEST_PATH)
    entries = manifest.get("batches", [])

    for entry in entries:
        batch_path = ROOT / entry["batch_path"].replace("../", "")
        report_path = ROOT / entry["report_path"].replace("../", "")

        if not batch_path.exists() or not report_path.exists():
            warnings.append(f"Missing declared manifest artifact(s) for {entry.get('batch_id')}")
            continue

        batch = load_json(batch_path)
        found_batches.append(batch_path.name)
        errors.extend(validate_batch(batch, batch_path))

        report = load_json(report_path)
        errors.extend(validate_report(report, batch, report_path))

    print(f"Discovered batches: {', '.join(found_batches) if found_batches else '(none)'}")

    if warnings:
        print("Warnings:")
        for warning in warnings:
            print(f"- {warning}")

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Validation passed for discovered validated batches and reports.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
