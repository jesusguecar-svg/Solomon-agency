# Workflow

## Validated Content Pipeline
1. Foundation/style/raw generation happens upstream.
2. Only validated batches are promoted into `data/questions_validated/`.
3. Manifest (`data/questions_validated/validated_batches_manifest.json`) declares approved batch/report paths.
4. App loader discovers runtime-available validated batches from manifest entries.
5. Practice sessions run only from discovered validated batches.

## Guardrails
- Do not ingest raw draft files into app runtime.
- Do not redesign approved question schema fields.
- Keep loader/docs/contracts aligned with validated pipeline artifacts.
