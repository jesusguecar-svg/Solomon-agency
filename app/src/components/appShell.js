function renderChoices(question, disabled) {
  return question.choices
    .map(
      (choice) => `
        <button class="choice" data-choice="${choice.key}" ${disabled ? 'disabled' : ''}>
          <strong>${choice.key}.</strong> ${choice.text}
        </button>
      `
    )
    .join('');
}

function renderFeedback(question, answer) {
  if (!answer) return '';

  const choiceRows = ['A', 'B', 'C', 'D']
    .map((key) => {
      const reason = question.rationale_by_choice?.[key] ?? 'No explanation provided.';
      return `<li><strong>${key}</strong>: ${reason}</li>`;
    })
    .join('');

  return `
    <section class="feedback card">
      <h3>${answer.is_correct ? 'Correct' : 'Incorrect'}</h3>
      <p><strong>Correct answer:</strong> ${question.correct_choice}</p>
      <p><strong>Why the correct answer is right:</strong> ${question.rationale_by_choice?.[question.correct_choice] ?? question.rationale}</p>
      <p><strong>Choice-by-choice explanation:</strong></p>
      <ul>${choiceRows}</ul>
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

export function renderAppShell(root, { master, batch, session }) {
  if (!root) return;

  const current = session.getCurrentQuestion();
  const answer = current ? session.answers.find((item) => item.question_id === current.id) : null;

  if (!current) {
    root.innerHTML = `
      <main class="container">
        <section class="card">
          <h1>${master.project.name}</h1>
          <p class="muted">No questions found in validated batch.</p>
        </section>
      </main>
    `;
    return;
  }

  const started = session.answers.length > 0 || session.currentIndex > 0;

  root.innerHTML = `
    <main class="container">
      <section class="card">
        <h1>${master.project.name}</h1>
        <p class="muted">Mode: ${session.mode}</p>
        <p class="muted">Batch: ${batch.id}</p>

        ${
          !started
            ? '<button id="start-btn" class="primary">Start Batch Practice</button>'
            : `
              <h2>Question ${session.currentIndex + 1} of ${session.totalQuestions}</h2>
              <p>${current.prompt}</p>
              <div class="choices">${renderChoices(current, Boolean(answer))}</div>
              ${renderFeedback(current, answer)}
              ${answer ? '<button id="next-btn" class="primary">Next Question</button>' : ''}
            `
        }
      </section>

      ${session.isComplete() ? renderSessionSummary(session) : ''}
    </main>
  `;

  const startBtn = root.querySelector('#start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      session.currentIndex = 0;
      renderAppShell(root, { master, batch, session });
    });
  }

  const choiceButtons = root.querySelectorAll('[data-choice]');
  choiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.getAttribute('data-choice');
      session.answerCurrent(choice);
      renderAppShell(root, { master, batch, session });
    });
  });

  const nextBtn = root.querySelector('#next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      session.nextQuestion();
      renderAppShell(root, { master, batch, session });
    });
  }
}
