import { loadMasterProject, loadValidatedManifest, discoverValidatedBatches } from './core/contentLoader.js';
import { createSessionEngine } from './core/sessionEngine.js';
import { renderAppShell } from './components/appShell.js';

async function bootstrap() {
  const root = document.querySelector('#app');

  try {
    const master = await loadMasterProject();
    const manifestPath = master.validated_manifest_path;
    const manifest = await loadValidatedManifest(manifestPath);
    const discoveredBatches = await discoverValidatedBatches(manifest);

    const initialBatch = discoveredBatches[0]?.batch ?? null;
    const session = createSessionEngine(initialBatch);

    renderAppShell(root, { master, discoveredBatches, activeBatch: initialBatch, session });
  } catch (error) {
    root.innerHTML = `
      <main class="container">
        <section class="card">
          <h1>App Bootstrap Error</h1>
          <p class="muted">${error.message}</p>
          <p>Run a static server from repository root and open <code>/app/</code>.</p>
        </section>
      </main>
    `;
  }
}

bootstrap();
