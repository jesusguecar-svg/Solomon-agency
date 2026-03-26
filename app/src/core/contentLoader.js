const DEFAULT_BATCH_PATH = '../data/questions_validated/question_bank_validated_batch_01.json';

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

export async function loadValidatedBatch(path = DEFAULT_BATCH_PATH) {
  return loadJson(path);
}
