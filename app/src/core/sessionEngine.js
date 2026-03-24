export function createSessionEngine(batch) {
  const questions = Array.isArray(batch?.questions) ? batch.questions : [];

  return {
    mode: 'batch_practice',
    batchId: batch?.batch_id ?? 'no_batch_loaded',
    totalQuestions: questions.length,
    currentIndex: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
    answers: [],

    setBatch(nextBatch) {
      const nextQuestions = Array.isArray(nextBatch?.questions) ? nextBatch.questions : [];
      this.batchId = nextBatch?.batch_id ?? 'no_batch_loaded';
      this.totalQuestions = nextQuestions.length;
      this.currentIndex = 0;
      this.startedAt = new Date().toISOString();
      this.completedAt = null;
      this.answers = [];
      this._questions = nextQuestions;
    },

    _questions: questions,

    getCurrentQuestion() {
      return this._questions[this.currentIndex] ?? null;
    },

    hasAnsweredCurrent() {
      const current = this.getCurrentQuestion();
      if (!current) return false;
      return this.answers.some((item) => item.question_id === current.question_id);
    },

    answerCurrent(selectedChoice) {
      const question = this.getCurrentQuestion();
      if (!question || this.hasAnsweredCurrent()) return null;

      const isCorrect = question.correct_answer === selectedChoice;
      const result = {
        question_id: question.question_id,
        selected_choice: selectedChoice,
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        correct_explanation: question.correct_explanation,
        wrong_explanations: question.wrong_explanations
      };

      this.answers.push(result);
      return result;
    },

    nextQuestion() {
      if (this.currentIndex < this._questions.length - 1) {
        this.currentIndex += 1;
        return true;
      }
      this.completedAt = new Date().toISOString();
      return false;
    },

    isComplete() {
      return this.answers.length === this.totalQuestions && this.totalQuestions > 0;
    },

    scorePercent() {
      if (this.answers.length === 0 || this.totalQuestions === 0) return 0;
      const correctCount = this.answers.filter((item) => item.is_correct).length;
      return Math.round((correctCount / this.totalQuestions) * 100);
    },

    toSessionResult() {
      return {
        id: `session_${this.batchId}_${Date.now()}`,
        user_id: 'local-user',
        mode: this.mode,
        started_at: this.startedAt,
        completed_at: this.completedAt ?? new Date().toISOString(),
        question_results: this.answers.map((item) => ({
          question_id: item.question_id,
          selected_choice: item.selected_choice,
          is_correct: item.is_correct
        })),
        score_percent: this.scorePercent(),
        status: this.isComplete() ? 'complete' : 'in_progress'
      };
    }
  };
}
