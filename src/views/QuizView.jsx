import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function QuizView() {
  const {
    quizzes,
    accountState,
    user,
    setIsAuthModalOpen,
    submitQuizAttempt,
    setCurrentView,
    showToast
  } = useApp();

  // Screen state: 1: 'catalog' | 2: 'briefing' | 3: 'running' | 4: 'results'
  const [activeState, setActiveState] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState(quizzes[0] || null);

  // Runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [quizResult, setQuizResult] = useState(null);
  const [charterAgreed, setCharterAgreed] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState('all');

  const timerRef = useRef(null);

  // Active quiz reference questions
  const questions = selectedQuiz?.questions || [
    {
      id: 1,
      question: "In Valorant Patch 9.08, what is the maximum duration of Omen's Dark Cover smoke from initial bloom to dissipation, and what is its internal cooldown once consumed?",
      options: [
        "15.0 seconds duration, 30 seconds cooldown",
        "15.0 seconds duration, 40 seconds cooldown",
        "14.25 seconds duration, 30 seconds cooldown",
        "13.5 seconds duration, 35 seconds cooldown"
      ],
      correctAnswer: 1,
      explanation: "Omen's Dark Cover lasts for 15 seconds after blooming, and charges regenerate on a 40-second cooldown timer."
    }
  ];

  // Timer effect
  useEffect(() => {
    if (activeState === 3) {
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
  }, [activeState]);

  // Handle timeout auto-submission
  useEffect(() => {
    if (activeState === 3 && secondsRemaining === 0 && totalTimeElapsed > 0) {
      showToast('Time has expired! Auto-submitting responses to server.', 'info');
      executeFinalSubmit();
    }
  }, [activeState, secondsRemaining, totalTimeElapsed]);

  const handleSelectQuizForBriefing = (quiz) => {
    if (accountState === 'guest') {
      showToast('Please sign in with your IIT Madras student email to attempt timed quizzes.', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    if (accountState === 'unverified') {
      showToast('Unverified Student Notice: Taking quiz in Practice mode. Verified credentials required for official podium.', 'info');
    }
    setSelectedQuiz(quiz);
    setCharterAgreed(false);
    setActiveState(2);
    window.scrollTo(0, 0);
  };

  const startQuizExam = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    const duration = (selectedQuiz?.durationMinutes || 15) * 60;
    setSecondsRemaining(duration);
    setTotalTimeElapsed(0);
    setActiveState(3);
    window.scrollTo(0, 0);
  };

  const selectOption = (optIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const clearCurrentResponse = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestionIndex];
      return copy;
    });
  };

  const toggleFlagCurrentQuestion = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex]
    }));
  };

  const navigateQuestion = (direction) => {
    const nextIdx = currentQuestionIndex + direction;
    if (nextIdx >= 0 && nextIdx < questions.length) {
      setCurrentQuestionIndex(nextIdx);
    }
  };

  const executeFinalSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitModalOpen(false);

    const result = submitQuizAttempt(selectedQuiz?.id || 'quiz-vct-25', userAnswers, totalTimeElapsed);
    setQuizResult(result);
    setActiveState(4);
    window.scrollTo(0, 0);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  return (
    <div className="w-full flex flex-col pb-16">
      {/* ================= STATE SIMULATION QUICK BAR ================= */}
      <section className="w-full bg-surface-container-lowest px-margin py-space-sm border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/10 border border-primary-container/40 text-primary-container font-label-sm text-label-sm uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              PRD SEC 12 EVALUATOR CONSOLE
            </span>
            <span className="text-text-dim text-body-sm hidden sm:inline">Inspect assessment lifecycle phases:</span>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-carbon-border">
            {[
              { id: 1, label: '1. Quiz Catalog' },
              { id: 2, label: '2. Pre-Flight Rules' },
              { id: 3, label: '3. Live Exam HUD' },
              { id: 4, label: '4. Results & Review' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveState(tab.id)}
                className={`state-tab-btn px-3 py-1 rounded text-label-sm font-label-sm font-bold uppercase transition-all cursor-pointer ${
                  activeState === tab.id
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'text-text-dim hover:text-text-bright hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATE 1: QUIZ CATALOG                                        */}
      {/* ============================================================ */}
      {activeState === 1 && (
        <section className="w-full px-margin py-space-xl flex flex-col">
          <div className="max-w-7xl mx-auto w-full space-y-space-xl">
            {/* Anti-Unstop Announcement Banner */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-surface-container-lowest border border-carbon-border p-space-lg shadow-2xl">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <span className="px-2.5 py-0.5 rounded bg-alert-crimson/15 border border-alert-crimson text-alert-crimson font-label-sm text-label-sm uppercase font-bold tracking-wider">
                      DECOMMISSIONED: UNSTOP / GOOGLE FORMS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-verified-emerald/15 border border-verified-emerald text-verified-emerald font-label-sm text-label-sm uppercase font-bold tracking-wider">
                      PROPRIETARY ENGINE v2.4 ONLINE
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-3xl sm:text-headline-xl text-text-bright tracking-tight uppercase leading-tight">
                    Tesseract In-House MCQ Arena
                  </h1>
                  <p className="font-body-md text-body-md text-text-dim">
                    High-frequency competitive testing engine with sub-20ms telemetry, real-time focus sentinels, negative scoring calibration, and millisecond tie-breaker precision built natively for IIT Madras BS students.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 bg-surface-container-lowest/80 p-space-md rounded-xl border border-carbon-border font-label-sm text-label-sm">
                  <div className="flex items-center gap-2 text-text-bright">
                    <span className="w-2 h-2 rounded-full bg-verified-emerald animate-pulse"></span>
                    <span>&lt; 18ms Webhook Edge Sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-bright">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">security</span>
                    <span>Anti-Tab Switch Sentinel Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-bright">
                    <span className="material-symbols-outlined text-admin-amber text-[14px]">lock_clock</span>
                    <span>Zero External Latency Leakage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Controls & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: `All Quizzes (${quizzes.length})` },
                  { id: 'fps', label: 'Tactical Shooter Meta' },
                  { id: 'lore', label: 'Gaming Lore & Trivia' },
                  { id: 'tech', label: 'IITM BS Tech & Algo' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCatalogFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md whitespace-nowrap cursor-pointer transition-colors ${
                      catalogFilter === tab.id
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                        : 'bg-surface-container-low hover:bg-surface-container text-text-dim hover:text-text-bright border border-carbon-border'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72 shrink-0">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-dim text-[18px]">search</span>
                <input
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-container-low border border-carbon-border text-body-sm text-text-bright placeholder-text-dim focus:outline-none focus:border-primary-container transition-all"
                  placeholder="Search trials, games, tags..."
                  type="text"
                />
              </div>
            </div>

            {/* Quiz Catalog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="relative rounded-xl bg-surface-container-low border-2 border-primary-container/80 p-space-lg flex flex-col justify-between shadow-[0_0_24px_rgba(0,240,255,0.15)] group hover:border-primary-container transition-all"
                >
                  <div className="space-y-space-md">
                    <div className="flex items-center justify-between gap-space-sm">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-alert-crimson/20 border border-alert-crimson text-alert-crimson font-label-sm text-label-sm font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson animate-pulse"></span>
                        ACTIVE • S03 INTER-HOUSE TRIAL
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-container bg-primary-container/10 px-2 py-0.5 rounded border border-primary-container/30">
                        HOUSE POINTS x2
                      </span>
                    </div>

                    <div>
                      <h2 className="font-headline-lg text-headline-lg text-text-bright group-hover:text-primary transition-colors uppercase">
                        {quiz.title}
                      </h2>
                      <p className="font-body-sm text-body-sm text-text-dim mt-1">
                        {quiz.description}
                      </p>
                    </div>

                    {/* Telemetry Matrix */}
                    <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest/90 p-space-sm rounded-lg border border-carbon-border font-label-sm text-label-sm">
                      <div className="flex flex-col">
                        <span className="text-text-dim">DURATION</span>
                        <span className="text-text-bright font-bold">{quiz.durationMinutes || 15} Mins</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-text-dim">QUESTIONS</span>
                        <span className="text-text-bright font-bold">{quiz.questions?.length || 20} MCQs</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-text-dim">MARKING</span>
                        <span className="text-alert-crimson font-bold">+4 / -1</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-label-sm font-label-sm pt-1">
                      <span className="text-verified-emerald flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">military_tech</span>
                        Prize: ₹2,500 Cash + House Standings
                      </span>
                      <span className="text-text-dim">428 Attempts Logged</span>
                    </div>
                  </div>

                  <div className="pt-space-lg">
                    <button
                      onClick={() => handleSelectQuizForBriefing(quiz)}
                      className="w-full py-2.5 px-space-md rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.3)] cursor-pointer"
                    >
                      <span>Enter Pre-Flight Briefing</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* STATE 2: PRE-FLIGHT BRIEFING & ANTI-CHEAT PROTOCOL           */}
      {/* ============================================================ */}
      {activeState === 2 && (
        <section className="w-full px-margin py-space-xl flex flex-col">
          <div className="max-w-4xl mx-auto w-full space-y-space-lg">
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-text-dim">
              <button onClick={() => setActiveState(1)} className="hover:text-primary-container flex items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Catalog
              </button>
              <span>/</span>
              <span className="text-text-bright uppercase">Pre-Flight Briefing Protocol</span>
            </div>

            {/* Main Protocol Card */}
            <div className="rounded-xl bg-surface-container-low border border-carbon-border p-space-lg md:p-space-xl shadow-2xl space-y-space-lg">
              <div className="border-b border-carbon-border pb-space-md space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-alert-crimson animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-alert-crimson font-bold">
                    IITM ES-AUTH // SECURE BROWSER ENVIRONMENT CHECK
                  </span>
                </div>
                <h1 className="font-headline-xl text-2xl sm:text-headline-xl text-text-bright tracking-tight uppercase">
                  PRE-FLIGHT BRIEFING &amp; ANTI-CHEAT PROTOCOL
                </h1>
                <p className="font-body-md text-body-md text-text-dim">
                  Assessment: <strong className="text-text-bright">{selectedQuiz?.title}</strong>
                </p>
              </div>

              {/* Verified Student Identity Card */}
              <div className="p-space-md rounded-lg bg-surface-container-lowest border border-carbon-border flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-carbon-border flex items-center justify-center font-headline-md text-primary-container font-bold">
                    {user?.name?.slice(0, 2).toUpperCase() || 'AS'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg text-text-bright">{user?.name}</span>
                      <span className="material-symbols-outlined text-verified-emerald text-[16px]">verified</span>
                      <span className="px-1.5 py-0.2 rounded bg-verified-emerald/10 text-verified-emerald font-label-sm text-[10px] uppercase font-bold">Active Student</span>
                    </div>
                    <div className="font-label-sm text-label-sm text-text-dim flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                      <span>Roll: {user?.rollNumber}</span>
                      <span>•</span>
                      <span>{user?.email}</span>
                      <span>•</span>
                      <span className="text-primary-container">{user?.house}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right font-label-sm text-label-sm">
                  <span className="text-text-dim block">SESSION IP ENCRYPTION</span>
                  <span className="text-verified-emerald font-mono">10.24.89.12 // TLS 1.3 OK</span>
                </div>
              </div>

              {/* Mandatory Rules Matrix */}
              <div className="space-y-space-md">
                <h2 className="font-label-lg text-label-lg text-text-bright uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">gavel</span>
                  Mandatory Arena Competition Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md font-body-sm text-body-sm">
                  <div className="p-space-md rounded-lg bg-surface-container border border-carbon-border space-y-1">
                    <div className="flex items-center gap-2 text-primary-container font-label-md text-label-md uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">timer</span>
                      1. Strict Server Clock ({selectedQuiz?.durationMinutes || 15}:00)
                    </div>
                    <p className="text-text-dim">
                      The timer runs continuously upon initialization. The clock cannot be paused, delayed, or restarted.
                    </p>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container border border-carbon-border space-y-1">
                    <div className="flex items-center gap-2 text-alert-crimson font-label-md text-label-md uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">balance</span>
                      2. Negative Marking Calibration
                    </div>
                    <p className="text-text-dim">
                      <strong className="text-verified-emerald">+4 Marks</strong> for every correct option. <strong className="text-alert-crimson">-1 Mark</strong> deduction for wrong answers. <strong className="text-text-bright">0 Marks</strong> for skipped questions.
                    </p>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container border border-carbon-border space-y-1">
                    <div className="flex items-center gap-2 text-admin-amber font-label-md text-label-md uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      3. Millisecond Tie-Breaker Engine
                    </div>
                    <p className="text-text-dim">
                      Ties are broken first by overall net score, second by least incorrect answers, and finally by absolute submission timestamp.
                    </p>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container border border-carbon-border space-y-1">
                    <div className="flex items-center gap-2 text-alert-crimson font-label-md text-label-md uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">warning</span>
                      4. Anti-Tab Switch Sentinel
                    </div>
                    <p className="text-text-dim">
                      Switching browser tabs or defocusing the window triggers <strong className="text-alert-crimson">1 Strike Warning</strong>. A 2nd trigger causes instant forfeit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acknowledgement Checkbox */}
              <div className="pt-space-sm border-t border-carbon-border">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={charterAgreed}
                    onChange={(e) => setCharterAgreed(e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-container border-carbon-border text-primary-container focus:ring-0 cursor-pointer"
                  />
                  <span className="font-body-sm text-body-sm text-text-dim group-hover:text-text-bright transition-colors">
                    I acknowledge and agree to abide by the <strong className="text-text-bright">Tesseract Esports Academic Integrity Charter</strong> &amp; Anti-Cheat Code.
                  </span>
                </label>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-sm">
                <button
                  onClick={() => setActiveState(1)}
                  className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-surface-container border border-carbon-border hover:bg-surface-container-high text-text-dim hover:text-text-bright font-label-md text-label-md uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel &amp; Return
                </button>
                <button
                  disabled={!charterAgreed}
                  onClick={startQuizExam}
                  className={`w-full sm:w-auto px-space-xl py-3 rounded-lg font-label-md text-label-md font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    charterAgreed
                      ? 'bg-primary-container text-on-primary-container hover:bg-primary shadow-[0_0_16px_rgba(0,240,255,0.4)] cursor-pointer'
                      : 'bg-surface-container-highest text-text-dim cursor-not-allowed opacity-60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  <span>Launch Timed Quiz Now [Enter Arena]</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* STATE 3: LIVE ACTIVE EXAM HUD                                */}
      {/* ============================================================ */}
      {activeState === 3 && (
        <section className="w-full flex-col">
          {/* Sticky Exam Telemetry Bar */}
          <div className="sticky top-[104px] z-40 w-full bg-surface-glass backdrop-blur-xl border-b border-carbon-border px-margin py-2 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-alert-crimson animate-pulse"></span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-text-bright">
                      LIVE EXAM: {selectedQuiz?.title}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary-container font-mono">
                    QUESTION {currentQuestionIndex + 1} OF {questions.length}
                  </span>
                </div>
              </div>

              {/* Glowing Countdown Clock */}
              <div className="flex items-center gap-space-md">
                <div className="flex flex-col items-center">
                  <span className="font-label-sm text-[9px] uppercase tracking-widest text-text-dim leading-none">TIME REMAINING</span>
                  <div className={`font-label-lg text-[22px] md:text-[26px] font-mono font-bold tracking-widest leading-tight ${
                    secondsRemaining < 60
                      ? 'text-alert-crimson animate-pulse drop-shadow-[0_0_10px_rgba(255,51,102,0.6)]'
                      : 'text-primary-container drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  }`}>
                    {formatTime(secondsRemaining)}
                  </div>
                </div>
              </div>

              {/* Live Progress Bar */}
              <div className="hidden md:flex flex-col w-48 space-y-1">
                <div className="flex justify-between font-label-sm text-label-sm text-text-dim">
                  <span>ANSWERED</span>
                  <span className="text-text-bright font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-container to-verified-emerald transition-all duration-300 shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Submit Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-space-md py-1.5 rounded-lg bg-alert-crimson/20 border border-alert-crimson hover:bg-alert-crimson hover:text-white text-alert-crimson font-label-sm text-label-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(255,51,102,0.25)] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>SUBMIT QUIZ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Exam Arena Canvas (Split Layout 70% / 30%) */}
          <div className="max-w-7xl mx-auto w-full px-margin py-space-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* LEFT COLUMN: QUESTION & OPTIONS */}
              <div className="lg:col-span-8 space-y-space-md">
                <div className="rounded-xl bg-surface-container-low border border-carbon-border p-space-lg space-y-space-lg shadow-xl">
                  {/* Metadata Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-carbon-border pb-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary-container font-label-sm text-label-sm uppercase font-bold tracking-wider">
                        QUESTION #{currentQuestionIndex + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-alert-crimson font-label-sm text-label-sm uppercase font-bold">
                        DIFFICULTY: RATED
                      </span>
                    </div>
                    <div className="font-label-sm text-label-sm text-text-dim">
                      <span className="text-verified-emerald font-bold">+4</span> CORRECT / <span className="text-alert-crimson font-bold">-1</span> WRONG
                    </div>
                  </div>

                  {/* Statement */}
                  <div className="space-y-2">
                    <span className="font-label-sm text-label-sm text-text-dim uppercase tracking-wider">
                      QUESTION {currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : currentQuestionIndex + 1}
                    </span>
                    <p className="font-headline-lg text-lg sm:text-headline-lg text-text-bright leading-relaxed">
                      {currentQ.question}
                    </p>
                  </div>

                  {/* 4 Interactive Option Tiles */}
                  <div className="space-y-space-sm pt-space-xs">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                      const letter = String.fromCharCode(65 + optIdx);

                      return (
                        <div
                          key={optIdx}
                          onClick={() => selectOption(optIdx)}
                          className={`cursor-pointer rounded-xl p-space-md border transition-all flex items-center justify-between group ${
                            isSelected
                              ? 'border-2 border-primary-container bg-primary-container/10 shadow-[0_0_16px_rgba(0,240,255,0.2)]'
                              : 'border-carbon-border bg-surface-container hover:bg-surface-container-high'
                          }`}
                        >
                          <div className="flex items-center gap-space-md">
                            <div
                              className={`w-8 h-8 rounded-lg border font-label-md text-label-md font-bold flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_8px_rgba(0,240,255,0.4)] border-primary-container'
                                  : 'bg-surface-container-lowest border-carbon-border text-text-dim group-hover:text-primary-container'
                              }`}
                            >
                              {letter}
                            </div>
                            <span className="font-body-md text-body-md text-text-bright">
                              {option}
                            </span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-primary-container' : 'border-carbon-border'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-primary-container' : 'bg-transparent'}`}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Bar Under Question */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md border-t border-carbon-border">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={toggleFlagCurrentQuestion}
                        className={`flex-1 sm:flex-none px-3 py-2 rounded-lg border font-label-sm text-label-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                          flaggedQuestions[currentQuestionIndex]
                            ? 'bg-secondary-container text-secondary border-secondary/40'
                            : 'bg-surface-container hover:bg-surface-container-high border-carbon-border text-secondary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">flag</span>
                        <span>{flaggedQuestions[currentQuestionIndex] ? 'Flagged for Review' : 'Flag for Review'}</span>
                      </button>
                      <button
                        onClick={clearCurrentResponse}
                        className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high border border-carbon-border text-text-dim hover:text-alert-crimson font-label-sm text-label-sm uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Clear Choice
                      </button>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => navigateQuestion(-1)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high border border-carbon-border text-text-bright font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        <span>Previous</span>
                      </button>
                      <button
                        disabled={currentQuestionIndex === questions.length - 1}
                        onClick={() => navigateQuestion(1)}
                        className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(0,240,255,0.3)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span>Next Question</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Anti-Cheat Status Ticker */}
                <div className="rounded-lg bg-surface-container-low border border-carbon-border p-space-sm flex items-center justify-between text-label-sm font-label-sm text-text-dim">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald"></span>
                    <span>FOCUS SENTINEL: LOCKED ON ACTIVE WINDOW</span>
                  </div>
                  <div className="text-text-bright font-mono">
                    STRIKES: 0 / 2
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: QUESTION NAVIGATOR PALETTE */}
              <div className="lg:col-span-4 space-y-space-md">
                <div className="rounded-xl bg-surface-container-low border border-carbon-border p-space-md space-y-space-md shadow-xl sticky top-[180px]">
                  <div className="flex items-center justify-between border-b border-carbon-border pb-space-sm">
                    <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-text-bright flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">grid_view</span>
                      Question Navigator
                    </span>
                    <span className="font-label-sm text-label-sm text-text-dim">{questions.length} Total</span>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 text-label-sm font-label-sm">
                    <div className="flex items-center gap-1.5 text-text-dim">
                      <div className="w-3 h-3 rounded bg-verified-emerald shrink-0"></div>
                      <span>Answered ({answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-dim">
                      <div className="w-3 h-3 rounded bg-secondary-container text-secondary shrink-0 flex items-center justify-center text-[8px] font-bold">⚑</div>
                      <span>Flagged ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-dim">
                      <div className="w-3 h-3 rounded border-2 border-primary-container bg-primary-container/20 shrink-0"></div>
                      <span>Current (Q{currentQuestionIndex + 1})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-dim">
                      <div className="w-3 h-3 rounded bg-surface-container-highest shrink-0"></div>
                      <span>Unattempted ({questions.length - answeredCount})</span>
                    </div>
                  </div>

                  {/* Question Button Grid */}
                  <div className="grid grid-cols-5 gap-2 pt-space-xs">
                    {questions.map((_, qIdx) => {
                      const isCurrent = qIdx === currentQuestionIndex;
                      const isAnswered = userAnswers[qIdx] !== undefined;
                      const isFlagged = flaggedQuestions[qIdx];

                      let btnClasses = "h-10 rounded-lg font-label-sm font-bold flex items-center justify-center transition-all cursor-pointer ";
                      if (isCurrent) {
                        btnClasses += "bg-primary-container/20 border-2 border-primary-container text-primary-container ring-2 ring-primary-container/40 shadow-[0_0_12px_rgba(0,240,255,0.4)]";
                      } else if (isFlagged) {
                        btnClasses += "bg-secondary-container text-secondary border border-secondary/40";
                      } else if (isAnswered) {
                        btnClasses += "bg-verified-emerald text-on-tertiary-fixed";
                      } else {
                        btnClasses += "bg-surface-container-highest hover:bg-surface-container-high text-text-dim hover:text-text-bright";
                      }

                      return (
                        <button
                          key={qIdx}
                          onClick={() => setCurrentQuestionIndex(qIdx)}
                          className={btnClasses}
                        >
                          {qIdx + 1}
                          {isFlagged && <span className="text-[8px] ml-0.5">⚑</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Stats Ticker */}
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-carbon-border font-label-sm text-label-sm flex items-center justify-between text-text-dim">
                    <span>Answered: <strong className="text-verified-emerald">{answeredCount}</strong></span>
                    <span>Remaining: <strong className="text-text-bright">{questions.length - answeredCount}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= SUBMIT CONFIRMATION MODAL ================= */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="max-w-md w-full rounded-xl bg-surface-container-low border border-carbon-border p-space-lg space-y-space-md shadow-2xl">
            <div className="flex items-center gap-space-sm text-alert-crimson">
              <span className="material-symbols-outlined text-[28px]">crisis_alert</span>
              <h3 className="font-headline-md text-headline-md font-bold uppercase text-text-bright">Submit Assessment?</h3>
            </div>
            <p className="font-body-md text-body-md text-text-dim">
              You are about to lock your submission for <strong className="text-text-bright">{selectedQuiz?.title}</strong>. Once finalized, responses cannot be amended.
            </p>
            <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-carbon-border space-y-1 font-label-sm text-label-sm">
              <div className="flex justify-between text-text-dim">
                <span>Answered Questions:</span>
                <span className="text-verified-emerald font-bold">{answeredCount} / {questions.length}</span>
              </div>
              <div className="flex justify-between text-text-dim">
                <span>Flagged for Review:</span>
                <span className="text-secondary font-bold">{Object.values(flaggedQuestions).filter(Boolean).length}</span>
              </div>
              <div className="flex justify-between text-text-dim">
                <span>Unattempted (0 Marks):</span>
                <span className="text-text-bright font-bold">{questions.length - answeredCount}</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-dim hover:text-text-bright font-label-md text-label-md uppercase cursor-pointer"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Resume Test
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-alert-crimson text-white hover:bg-alert-crimson/90 font-label-md text-label-md font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(255,51,102,0.4)] cursor-pointer"
                onClick={executeFinalSubmit}
              >
                Confirm Lock &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STATE 4: CELEBRATION & RESULTS REVIEW SCREEN                 */}
      {/* ============================================================ */}
      {activeState === 4 && (
        <section className="w-full px-margin py-space-xl flex flex-col">
          <div className="max-w-5xl mx-auto w-full space-y-space-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-text-dim">
                <button onClick={() => setActiveState(1)} className="hover:text-primary-container flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  Catalog
                </button>
                <span>/</span>
                <span className="text-text-bright uppercase">Official Telemetry Results</span>
              </div>
              <button
                onClick={() => setActiveState(1)}
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-carbon-border text-text-bright font-label-sm text-label-sm uppercase flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                Back to Quiz Catalog
              </button>
            </div>

            {/* Victory Score Hero Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-surface-container via-surface-container-low to-surface-container-lowest border-2 border-verified-emerald/60 p-space-lg md:p-space-xl shadow-[0_0_36px_rgba(0,230,118,0.15)] space-y-space-lg">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-verified-emerald/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-carbon-border pb-space-md">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-verified-emerald/20 border border-verified-emerald text-verified-emerald font-label-sm text-label-sm uppercase font-bold tracking-wider">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    SUBMISSION VERIFIED &amp; RECORDED ON-CHAIN
                  </span>
                  <h1 className="font-headline-xl text-2xl sm:text-headline-xl text-text-bright uppercase">
                    {selectedQuiz?.title}
                  </h1>
                  <p className="font-body-sm text-body-sm text-text-dim">
                    Candidate: <strong className="text-text-bright">{user?.name}</strong> ({user?.rollNumber}) • Millisecond Telemetry Logged
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end font-label-sm text-label-sm">
                  <span className="text-text-dim">HOUSE CHAMPIONSHIP ALLOCATION</span>
                  <span className="font-headline-md text-headline-md text-primary-container font-bold">+150 HOUSE POINTS</span>
                  <span className="text-text-dim">Credited to {user?.house}</span>
                </div>
              </div>

              {/* Big Score Telemetry Display */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md items-center">
                <div className="md:col-span-2 p-space-lg rounded-xl bg-surface-container-lowest border border-carbon-border flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-text-dim uppercase tracking-wider">AGGREGATE SCORE</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-xl text-[44px] leading-none font-bold text-verified-emerald">
                        {quizResult?.score !== undefined ? quizResult.score : 64}
                      </span>
                      <span className="font-headline-md text-headline-md text-text-dim">
                        / {quizResult?.maxScore !== undefined ? quizResult.maxScore : 80}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-verified-emerald font-bold">
                      {quizResult?.percentage !== undefined ? `${quizResult.percentage}%` : '80.0%'} OVERALL ACCURACY
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-verified-emerald/30 border-t-verified-emerald flex items-center justify-center font-label-md text-label-md text-text-bright font-bold">
                    TOP 1%
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-lowest border border-carbon-border space-y-1">
                  <span className="font-label-sm text-label-sm text-text-dim uppercase">INSTITUTIONAL RANK</span>
                  <div className="font-headline-lg text-headline-lg text-text-bright font-bold flex items-center gap-1.5">
                    <span>#03</span>
                    <span className="text-body-sm font-body-sm text-text-dim font-normal">/ 428 Squads</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-verified-emerald">Podium Placement Achieved</span>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-lowest border border-carbon-border space-y-1">
                  <span className="font-label-sm text-label-sm text-text-dim uppercase">PRECISION TIME ELAPSED</span>
                  <div className="font-label-lg text-label-lg font-mono text-primary-container font-bold">
                    {formatTime(totalTimeElapsed || 522)}
                  </div>
                  <span className="font-label-sm text-label-sm text-text-dim">Tie-breaker benchmark verified</span>
                </div>
              </div>

              {/* Question Solutions Review Section */}
              <div className="space-y-space-md pt-space-md border-t border-carbon-border">
                <h3 className="font-headline-md text-headline-md uppercase text-text-bright flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">fact_check</span>
                  Telemetry Response Review &amp; Solutions
                </h3>

                <div className="space-y-3">
                  {questions.map((q, qIndex) => {
                    const candidateAns = userAnswers[qIndex];
                    const isCorrect = candidateAns === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className="p-space-md rounded-xl bg-surface-container-lowest border border-carbon-border space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-text-dim uppercase">QUESTION {qIndex + 1}</span>
                          <span className={`font-label-sm text-label-sm font-bold uppercase px-2 py-0.5 rounded ${
                            candidateAns === undefined
                              ? 'bg-surface-container text-text-dim'
                              : isCorrect
                              ? 'bg-verified-emerald/20 text-verified-emerald'
                              : 'bg-alert-crimson/20 text-alert-crimson'
                          }`}>
                            {candidateAns === undefined ? 'SKIPPED (0)' : isCorrect ? 'CORRECT (+4)' : 'INCORRECT (-1)'}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-text-bright font-medium">
                          {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm pt-1">
                          <div className="p-2 rounded bg-surface-container border border-carbon-border">
                            <span className="font-label-sm text-[10px] text-text-dim block uppercase">Your Selection</span>
                            <span className={isCorrect ? 'text-verified-emerald font-bold' : 'text-alert-crimson font-bold'}>
                              {candidateAns !== undefined ? q.options[candidateAns] : 'None (Skipped)'}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-surface-container border border-carbon-border">
                            <span className="font-label-sm text-[10px] text-text-dim block uppercase">Official Validated Answer</span>
                            <span className="text-verified-emerald font-bold">
                              {q.options[q.correctAnswer]}
                            </span>
                          </div>
                        </div>
                        <p className="font-body-sm text-text-dim text-[12px] pt-1">
                          <strong className="text-primary-container">Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
