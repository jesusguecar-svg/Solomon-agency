const DEFAULT_MANIFEST_PATH = '../data/questions_validated/validated_batches_manifest.json';

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

export async function loadMasterProject(path = '../data/master/master_project.json') {
  return loadJson(path);
}

export async function loadValidatedManifest(path = DEFAULT_MANIFEST_PATH) {
  return loadJson(path);
}

export async function discoverValidatedBatches(manifest) {
  const entries = Array.isArray(manifest?.batches) ? manifest.batches : [];

  const results = await Promise.all(
    entries.map(async (entry) => {
      try {
        const batch = await loadJson(entry.batch_path);
        return {
          batch,
          batchPath: entry.batch_path,
          reportPath: entry.report_path,
          manifestBatchId: entry.batch_id
        };
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean);
}
