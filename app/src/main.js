import { loadMasterProject, loadValidatedBatch } from './core/contentLoader.js';
import { createSessionEngine } from './core/sessionEngine.js';
import { renderAppShell } from './components/appShell.js';

async function bootstrap() {
  const root = document.querySelector('#app');

  try {
    const [master, batch] = await Promise.all([loadMasterProject(), loadValidatedBatch()]);
    const session = createSessionEngine(batch);

    renderAppShell(root, { master, batch, session });
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
