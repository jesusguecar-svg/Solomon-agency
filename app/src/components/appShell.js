function renderChoices(question, disabled) {
  return question.options
    .map(
      (choice) => `
        <button class="choice" data-choice="${choice.key}" ${disabled ? 'disabled' : ''}>
          <strong>${choice.key}.</strong> ${choice.text}
        </button>
      `
    )
    .join('');
}

function renderWrongExplanationList(question) {
  const wrongMap = question.wrong_explanations ?? {};
  return Object.entries(wrongMap)
    .map(([key, text]) => `<li><strong>${key}</strong>: ${text}</li>`)
    .join('');
}

function renderFeedback(question, answer) {
  if (!answer) return '';

  return `
    <section class="feedback card">
      <h3>${answer.is_correct ? 'Correct' : 'Incorrect'}</h3>
      <p><strong>Correct answer:</strong> ${question.correct_answer}</p>
      <p><strong>Why the correct answer is right:</strong> ${question.correct_explanation}</p>
      <p><strong>Why the wrong answers are wrong:</strong></p>
      <ul>${renderWrongExplanationList(question)}</ul>
    </section>
  `;
}

function renderSessionSummary(session) {
  const result = session.toSessionResult();
  return `
    <section class="card">
      <h2>Session Summary</h2>
      <p>Batch: <code>${session.batchId}</code></p>
      <p>Questions answered: ${session.answers.length}/${session.totalQuestions}</p>
      <p>Score: <strong>${result.score_percent}%</strong></p>
      <pre class="summary-json">${JSON.stringify(result, null, 2)}</pre>
    </section>
  `;
}

function renderBatchSelector(discoveredBatches, activeBatch) {
  if (!discoveredBatches.length) {
    return '<p class="muted">No validated batches discovered.</p>';
  }

  const options = discoveredBatches
    .map(({ batch }, index) => {
      const selected = activeBatch?.batch_id === batch.batch_id ? 'selected' : '';
      return `<option value="${index}" ${selected}>${batch.batch_id}</option>`;
    })
    .join('');

  return `
    <label for="batch-select"><strong>Validated Batch:</strong></label>
    <select id="batch-select">${options}</select>
  `;
}

export function renderAppShell(root, { master, discoveredBatches, activeBatch, session }) {
  if (!root) return;

  const current = session.getCurrentQuestion();
  const answer = current ? session.answers.find((item) => item.question_id === current.question_id) : null;

  root.innerHTML = `
    <main class="container">
      <section class="card">
        <h1>${master.project.name}</h1>
        <p class="muted">Mode: ${session.mode}</p>
        ${renderBatchSelector(discoveredBatches, activeBatch)}
        <p class="muted">Discovered batches: ${discoveredBatches.length}</p>

        ${
          !activeBatch
            ? '<p class="muted">No validated batches available for runtime.</p>'
            : session.answers.length === 0 && session.currentIndex === 0 && !answer
              ? '<button id="start-btn" class="primary">Start Batch Practice</button>'
              : `
                <h2>Question ${session.currentIndex + 1} of ${session.totalQuestions}</h2>
                <p>${current.stem}</p>
                <div class="choices">${renderChoices(current, Boolean(answer))}</div>
                ${renderFeedback(current, answer)}
                ${answer ? '<button id="next-btn" class="primary">Next Question</button>' : ''}
              `
        }
      </section>

      ${session.isComplete() ? renderSessionSummary(session) : ''}
    </main>
  `;

  const selector = root.querySelector('#batch-select');
  if (selector) {
    selector.addEventListener('change', (event) => {
      const next = discoveredBatches[Number(event.target.value)]?.batch ?? null;
      session.setBatch(next);
      renderAppShell(root, { master, discoveredBatches, activeBatch: next, session });
    });
  }

  const startBtn = root.querySelector('#start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      renderAppShell(root, { master, discoveredBatches, activeBatch, session });
    });
  }

  const choiceButtons = root.querySelectorAll('[data-choice]');
  choiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.getAttribute('data-choice');
      session.answerCurrent(choice);
      renderAppShell(root, { master, discoveredBatches, activeBatch, session });
    });
  });

  const nextBtn = root.querySelector('#next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      session.nextQuestion();
      renderAppShell(root, { master, discoveredBatches, activeBatch, session });
    });
  }
}
