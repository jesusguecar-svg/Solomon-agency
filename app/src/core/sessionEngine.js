export function createSessionEngine(batch) {
  const questions = Array.isArray(batch?.questions) ? batch.questions : [];

  return {
    mode: 'batch_practice',
    batchId: batch?.id ?? 'unknown_batch',
    totalQuestions: questions.length,
    currentIndex: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
    answers: [],

    getCurrentQuestion() {
      return questions[this.currentIndex] ?? null;
    },

    hasAnsweredCurrent() {
      const current = this.getCurrentQuestion();
      if (!current) return false;
      return this.answers.some((item) => item.question_id === current.id);
    },

    answerCurrent(selectedChoice) {
      const question = this.getCurrentQuestion();
      if (!question || this.hasAnsweredCurrent()) return null;

      const isCorrect = question.correct_choice === selectedChoice;
      const result = {
        question_id: question.id,
        selected_choice: selectedChoice,
        correct_choice: question.correct_choice,
        is_correct: isCorrect,
        correct_explanation: question.correct_explanation,
        wrong_explanations: question.wrong_explanations
      };

      this.answers.push(result);
      return result;
    },

    nextQuestion() {
      if (this.currentIndex < questions.length - 1) {
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
      if (this.answers.length === 0) return 0;
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
