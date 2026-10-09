import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trophy,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Flag,
  Sparkles,
  ShieldAlert,
  Lock,
  ChevronRight,
  Timer
} from 'lucide-react';

export default function QuizView() {
  const {
    quizzes,
    accountState,
    user,
    setIsAuthModalOpen,
    submitQuizAttempt,
    setCurrentView
  } = useApp();

  // Screen state: 'catalog' | 'instructions' | 'running' | 'results'
  const [screen, setScreen] = useState('catalog');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [index]: selectedOptionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [index]: boolean }
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [quizResult, setQuizResult] = useState(null);

  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (screen === 'running') {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
        setTotalTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen]);

  // Handle timeout auto-submission cleanly outside of state updater
  useEffect(() => {
    if (screen === 'running' && secondsRemaining === 0 && totalTimeElapsed > 0) {
      alert('Time has expired! Your quiz answers have been automatically submitted.');
      finishQuiz();
    }
  }, [screen, secondsRemaining, totalTimeElapsed]);

  // Open Quiz Instructions
  const handleSelectQuiz = (quiz) => {
    if (accountState === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedQuiz(quiz);
    setScreen('instructions');
  };

  // Start the Quiz
  const handleStartQuiz = () => {
    if (!selectedQuiz) return;
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    const durationSec = (selectedQuiz.durationMinutes || 5) * 60;
    setSecondsRemaining(durationSec);
    setTotalTimeElapsed(0);
    setScreen('running');
  };

  // Select option for current question
  const handleSelectOption = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Clear answer
  const handleClearAnswer = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestionIndex];
      return copy;
    });
  };

  // Toggle flag for review
  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex]
    }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    if (window.confirm('Are you sure you want to finish and submit your quiz attempt?')) {
      finishQuiz();
    }
  };


  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const result = submitQuizAttempt(selectedQuiz.id, userAnswers, totalTimeElapsed);
    setQuizResult(result);
    setScreen('results');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // 1. CATALOG SCREEN
  if (screen === 'catalog') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>PRD SECTION 12 • NATIVE QUIZ PLATFORM</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
              Tesseract Quiz Arena
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Competitive, timed multiple-choice quizzes hosted directly on Tesseract without external third-party platforms.
            </p>
          </div>

          {accountState === 'guest' && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold block">IITM BS Student Login Required</span>
                <span>Only verified student accounts can attempt quizzes and claim ranks.</span>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold shrink-0"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Quizzes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quizzes.map((quiz) => {
            const hasAttempted = user?.quizAttempts?.some(a => a.quizId === quiz.id);

            return (
              <div
                key={quiz.id}
                className="group rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-cyan-500/50 p-7 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      ● {quiz.status}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">
                      Ends: {quiz.endDate}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {quiz.description}
                  </p>

                  {/* Marking Scheme badges */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 text-xs font-mono-code">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[10px] uppercase">DURATION</span>
                      <span className="text-white font-bold text-sm mt-0.5 block">{quiz.durationMinutes} Mins</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[10px] uppercase">QUESTIONS</span>
                      <span className="text-cyan-400 font-bold text-sm mt-0.5 block">{quiz.questions.length} MCQs</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[10px] uppercase">MARKING</span>
                      <span className="text-amber-400 font-bold text-sm mt-0.5 block">+{quiz.marksPerQuestion} / -{quiz.negativeMarks}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  {hasAttempted ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Already Attempted (1-attempt rule)</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 font-mono-code">
                      Single Attempt • Server-side Verified
                    </div>
                  )}

                  <button
                    onClick={() => handleSelectQuiz(quiz)}
                    className="px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow flex items-center gap-1.5"
                  >
                    <span>{hasAttempted ? 'Retake / Review' : 'Open Quiz'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. INSTRUCTIONS SCREEN (PRD 12.2: Instructions are displayed)
  if (screen === 'instructions') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="p-8 rounded-3xl bg-[#0d121d] border border-cyan-500/40 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Timer className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest block">
                Quiz Instructions & Rules
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-white">
                {selectedQuiz.title}
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
                Key Parameters
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs font-mono-code text-slate-300">
                <li>• Duration: <strong className="text-white">{selectedQuiz.durationMinutes} Minutes</strong></li>
                <li>• Questions: <strong className="text-white">{selectedQuiz.questions.length} Questions</strong></li>
                <li>• Correct Answer: <strong className="text-emerald-400">+{selectedQuiz.marksPerQuestion} Marks</strong></li>
                <li>• Negative Marking: <strong className="text-rose-400">-{selectedQuiz.negativeMarks} Mark</strong></li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs text-slate-400">
              <p>• <strong>Strict Timer:</strong> The countdown starts immediately once you click "Start Quiz". The quiz auto-submits when time expires.</p>
              <p>• <strong>Navigation:</strong> You can navigate freely between questions, change your selected choices, or mark questions for review.</p>
              <p>• <strong>Tie-Breaker Policy:</strong> Leaderboard ranks are determined by higher score first, then lower total completion time.</p>
              <p>• <strong>Integrity:</strong> Tab switches are logged. Please maintain academic and gaming integrity.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={() => setScreen('catalog')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-700"
            >
              Back to Catalog
            </button>

            <button
              onClick={handleStartQuiz}
              className="px-8 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2"
            >
              <span>I Understand, Start Quiz Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. RUNNING QUIZ SCREEN (PRD 12.2: Timed, Question Palette, Radio MCQ, Auto-submit)
  if (screen === 'running') {
    const currentQ = selectedQuiz.questions[currentQuestionIndex];
    const isUrgent = secondsRemaining < 60;

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Sticky Quiz Header Bar with Live Countdown Timer */}
        <div className="sticky top-20 z-40 p-4 rounded-2xl bg-[#090e17]/95 border border-cyan-500/30 backdrop-blur-xl flex items-center justify-between shadow-2xl">
          <div>
            <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider block">
              IITM BS Quiz Engine
            </span>
            <div className="text-sm font-heading font-bold text-white truncate max-w-xs sm:max-w-md">
              {selectedQuiz.title}
            </div>
          </div>

          {/* Live Timer Clock */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono-code font-bold text-base sm:text-lg border transition-all ${
            isUrgent
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse'
              : 'bg-slate-900 text-cyan-300 border-cyan-500/40'
          }`}>
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-rose-400' : 'text-cyan-400'}`} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={handleSubmitQuiz}
            className="px-4 py-2 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 shadow transition-colors"
          >
            Submit Quiz
          </button>
        </div>

        {/* Main Quiz Runner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left / Center: Question & Options */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-[#0d121d] border border-slate-800 space-y-6 shadow-xl flex flex-col justify-between min-h-[460px]">
            <div className="space-y-6">
              {/* Question Index Badge & Review Flag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono-code font-bold text-cyan-400 uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                </span>

                <button
                  onClick={handleToggleFlag}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    flaggedQuestions[currentQuestionIndex]
                      ? 'bg-purple-950/70 text-purple-300 border-purple-500/60'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQuestionIndex] ? 'Flagged for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Statement */}
              <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* MCQ Options List */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono-code text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400 text-black'
                          : 'border-slate-600 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm sm:text-base leading-snug">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleClearAnswer}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  Clear Selection
                </button>
              </div>

              {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-6 py-2 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1.5 shadow"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 flex items-center gap-1.5 shadow"
                >
                  <span>Final Submit</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Question Navigator Palette */}
          <div className="p-5 rounded-3xl bg-[#0d121d] border border-slate-800 space-y-4 h-fit">
            <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">
              Question Navigator
            </h4>

            {/* Palette grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
              {selectedQuiz.questions.map((_, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = userAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions[idx];

                let bgClass = 'bg-slate-900 text-slate-400 border-slate-800';
                if (isCurrent) bgClass = 'ring-2 ring-cyan-400 bg-cyan-950 text-cyan-300 border-cyan-500 font-bold';
                else if (isFlagged) bgClass = 'bg-purple-950 text-purple-300 border-purple-500/60';
                else if (isAnswered) bgClass = 'bg-emerald-950 text-emerald-300 border-emerald-500/60 font-semibold';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-mono-code flex items-center justify-center transition-all ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-[11px] font-mono-code text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500/40 border border-purple-500"></span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-900 border border-slate-800"></span>
                <span>Unattempted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. RESULTS & SCORE REVIEW SCREEN (PRD 12.2: System calculates score, result is displayed)
  if (screen === 'results' && quizResult) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d121d] border border-cyan-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest block">
              Quiz Completed • Verified Submission
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mt-1">
              {quizResult.score} / {quizResult.totalPossible} Points
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Time taken: <span className="font-mono-code text-slate-200">{quizResult.timeTaken}</span>
            </p>
          </div>

          {/* Stats breakdown */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs font-mono-code">
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              <span className="block text-[10px] text-emerald-500 uppercase">CORRECT</span>
              <span className="text-lg font-bold">{quizResult.correctCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300">
              <span className="block text-[10px] text-rose-500 uppercase">INCORRECT</span>
              <span className="text-lg font-bold">{quizResult.incorrectCount}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              <span className="block text-[10px] text-slate-500 uppercase">SKIPPED</span>
              <span className="text-lg font-bold">{quizResult.unattemptedCount}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('leaderboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>View Leaderboard Ranking</span>
            </button>
            <button
              onClick={() => setScreen('catalog')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700"
            >
              Return to Quizzes
            </button>
          </div>
        </div>

        {/* Detailed Question Review & Explanations */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>Question Review & Explanations</span>
          </h3>

          <div className="space-y-4">
            {selectedQuiz.questions.map((q, idx) => {
              const studentAnswer = userAnswers[idx];
              const isCorrect = studentAnswer === q.correctAnswer;
              const isUnattempted = studentAnswer === undefined;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? 'bg-[#0d1519] border-emerald-500/30'
                      : isUnattempted
                      ? 'bg-[#0d121d] border-slate-800'
                      : 'bg-[#190d13] border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                    <span className="text-slate-400">Question {idx + 1}</span>
                    {isCorrect ? (
                      <span className="text-emerald-400 font-bold">✓ Correct (+{selectedQuiz.marksPerQuestion})</span>
                    ) : isUnattempted ? (
                      <span className="text-slate-500">○ Unattempted (0)</span>
                    ) : (
                      <span className="text-rose-400 font-bold">✗ Incorrect (-{selectedQuiz.negativeMarks})</span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white mb-3">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctAnswer;
                      const isOptionStudentChoice = oIdx === studentAnswer;

                      let optClass = 'bg-slate-900/60 border-slate-800 text-slate-400';
                      if (isOptionCorrect) optClass = 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 font-medium';
                      else if (isOptionStudentChoice && !isOptionCorrect) optClass = 'bg-rose-950/70 border-rose-500/60 text-rose-300';

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${optClass}`}>
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isOptionCorrect && <span className="text-[10px] text-emerald-400 font-bold">Correct Ans</span>}
                          {isOptionStudentChoice && !isOptionCorrect && <span className="text-[10px] text-rose-400 font-bold">Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-cyan-400 font-mono-code">Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
