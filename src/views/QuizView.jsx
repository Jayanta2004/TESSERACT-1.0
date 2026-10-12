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
      <section className="w-full bg-[#0a0e18]/80 backdrop-blur-xl px-margin py-2.5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono-code text-xs uppercase font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              PRD SEC 12 EVALUATOR CONSOLE
            </span>
            <span className="text-slate-400 text-xs font-mono-code hidden sm:inline">Assessment lifecycle phases:</span>
          </div>
          <div className="flex items-center gap-1 glass-panel p-1 rounded-xl">
            {[
              { id: 1, label: '1. Catalog' },
              { id: 2, label: '2. Briefing' },
              { id: 3, label: '3. Live Exam' },
              { id: 4, label: '4. Review' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveState(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold uppercase transition-all cursor-pointer ${
                  activeState === tab.id
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
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
            <div className="relative overflow-hidden rounded-2xl glass-card border border-white/10 p-6 sm:p-8 shadow-2xl">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono-code text-[11px] uppercase font-bold tracking-wider">
                      DECOMMISSIONED: UNSTOP / FORMS
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono-code text-[11px] uppercase font-bold tracking-wider">
                      PROPRIETARY ENGINE v2.4 ONLINE
                    </span>
                  </div>
                  <h1 className="font-heading text-3xl sm:text-4xl text-white font-black tracking-tight uppercase leading-tight">
                    Tesseract In-House MCQ Arena
                  </h1>
                  <p className="text-sm font-body text-slate-300 leading-relaxed">
                    High-frequency competitive testing engine with sub-20ms telemetry, real-time focus sentinels, negative scoring calibration, and millisecond tie-breaker precision built natively for IIT Madras BS students.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 glass-panel p-4 rounded-xl border border-white/10 font-mono-code text-xs">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>&lt; 18ms Webhook Edge Sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-cyan-400 text-[15px]">security</span>
                    <span>Anti-Tab Switch Sentinel Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-amber-400 text-[15px]">lock_clock</span>
                    <span>Zero External Latency Leakage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Controls & Search */}
            <div className="glass-panel p-2.5 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {[
                  { id: 'all', label: `All Quizzes (${quizzes.length})` },
                  { id: 'fps', label: 'Tactical Shooter Meta' },
                  { id: 'lore', label: 'Gaming Lore & Trivia' },
                  { id: 'tech', label: 'IITM BS Tech & Algo' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCatalogFilter(tab.id)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono-code uppercase font-semibold transition-all cursor-pointer ${
                      catalogFilter === tab.id
                        ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64 shrink-0">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">search</span>
                <input
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-body"
                  placeholder="Search trials, games, tags..."
                  type="text"
                />
              </div>
            </div>

            {/* Quiz Catalog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="relative rounded-2xl glass-card glass-card-hover border border-white/10 p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono-code text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                        ACTIVE • S03 INTER-HOUSE TRIAL
                      </span>
                      <span className="font-mono-code text-[11px] text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20 font-bold">
                        HOUSE POINTS x2
                      </span>
                    </div>

                    <div>
                      <h2 className="font-heading text-xl text-white group-hover:text-cyan-400 transition-colors uppercase font-bold">
                        {quiz.title}
                      </h2>
                      <p className="text-xs font-body text-slate-300 mt-1 leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>

                    {/* Telemetry Matrix */}
                    <div className="grid grid-cols-3 gap-2 glass-panel p-3 rounded-xl border border-white/10 font-mono-code text-xs">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase">DURATION</span>
                        <span className="text-white font-bold">{quiz.durationMinutes || 15} Mins</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase">QUESTIONS</span>
                        <span className="text-white font-bold">{quiz.questions?.length || 20} MCQs</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase">MARKING</span>
                        <span className="text-rose-400 font-bold">+4 / -1</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono-code pt-1">
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[15px]">military_tech</span>
                        Prize: ₹2,500 Cash + House Standings
                      </span>
                      <span className="text-slate-400">428 Attempts Logged</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleSelectQuizForBriefing(quiz)}
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-heading text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
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
        <section className="w-full px-margin py-8 flex flex-col">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <div className="flex items-center gap-2 font-mono-code text-xs text-slate-400">
              <button onClick={() => setActiveState(1)} className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Catalog
              </button>
              <span className="text-slate-600">/</span>
              <span className="text-white uppercase font-semibold">Pre-Flight Briefing Protocol</span>
            </div>

            {/* Main Protocol Card */}
            <div className="rounded-2xl glass-card border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-mono-code text-[11px] uppercase tracking-widest text-rose-400 font-bold">
                    IITM ES-AUTH // SECURE BROWSER ENVIRONMENT CHECK
                  </span>
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl text-white tracking-tight uppercase font-bold">
                  PRE-FLIGHT BRIEFING &amp; ANTI-CHEAT PROTOCOL
                </h1>
                <p className="font-body text-sm text-slate-300">
                  Assessment: <strong className="text-cyan-300">{selectedQuiz?.title}</strong>
                </p>
              </div>

              {/* Verified Student Identity Card */}
              <div className="p-4 rounded-xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-heading text-cyan-400 font-bold text-lg">
                    {user?.name?.slice(0, 2).toUpperCase() || 'AS'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm text-white font-bold">{user?.name || 'Active Student'}</span>
                      <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono-code text-[10px] uppercase font-bold border border-emerald-500/20">Active Student</span>
                    </div>
                    <div className="font-mono-code text-xs text-slate-400 flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                      <span>Roll: {user?.rollNumber || '21F1000000'}</span>
                      <span>•</span>
                      <span>{user?.email || 'student@study.iitm.ac.in'}</span>
                      <span>•</span>
                      <span className="text-cyan-300">{user?.house || 'House Turing'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right font-mono-code text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">SESSION IP ENCRYPTION</span>
                  <span className="text-emerald-400 font-bold">10.24.89.12 // TLS 1.3 OK</span>
                </div>
              </div>

              {/* Mandatory Rules Matrix */}
              <div className="space-y-4">
                <h2 className="font-heading text-sm text-white uppercase tracking-wider flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-cyan-400 text-[18px]">gavel</span>
                  Mandatory Arena Competition Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body text-xs">
                  <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono-code uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">timer</span>
                      1. Strict Server Clock ({selectedQuiz?.durationMinutes || 15}:00)
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The timer runs continuously upon initialization. The clock cannot be paused, delayed, or restarted.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-mono-code uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">balance</span>
                      2. Negative Marking Calibration
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400">+4 Marks</strong> for every correct option. <strong className="text-rose-400">-1 Mark</strong> deduction for wrong answers. <strong className="text-white">0 Marks</strong> for skipped questions.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-mono-code uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                      3. Millisecond Tie-Breaker Engine
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Ties are broken first by overall net score, second by least incorrect answers, and finally by absolute submission timestamp.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-mono-code uppercase font-bold">
                      <span className="material-symbols-outlined text-[18px]">warning</span>
                      4. Anti-Tab Switch Sentinel
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Switching browser tabs or defocusing the window triggers <strong className="text-rose-400">1 Strike Warning</strong>. A 2nd trigger causes instant forfeit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acknowledgement Checkbox */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={charterAgreed}
                    onChange={(e) => setCharterAgreed(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0 cursor-pointer accent-cyan-400"
                  />
                  <span className="font-body text-xs text-slate-300 group-hover:text-white transition-colors">
                    I acknowledge and agree to abide by the <strong className="text-cyan-400">Tesseract Esports Academic Integrity Charter</strong> &amp; Anti-Cheat Code.
                  </span>
                </label>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => setActiveState(1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-panel border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-heading text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel &amp; Return
                </button>
                <button
                  disabled={!charterAgreed}
                  onClick={startQuizExam}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    charterAgreed
                      ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
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
          <div className="sticky top-[68px] z-40 w-full bg-[#0a0e18]/90 backdrop-blur-xl border-b border-white/10 px-margin py-3 shadow-lg">
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
          <div className="max-w-7xl mx-auto w-full px-margin py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: QUESTION & OPTIONS */}
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-2xl glass-card border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
                  {/* Metadata Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono-code text-[11px] uppercase font-bold tracking-wider border border-cyan-400/20">
                        QUESTION #{currentQuestionIndex + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 font-mono-code text-[11px] uppercase font-bold border border-rose-500/20">
                        DIFFICULTY: RATED
                      </span>
                    </div>
                    <div className="font-mono-code text-xs text-slate-400">
                      <span className="text-emerald-400 font-bold">+4</span> CORRECT / <span className="text-rose-400 font-bold">-1</span> WRONG
                    </div>
                  </div>

                  {/* Statement */}
                  <div className="space-y-2">
                    <span className="font-mono-code text-xs text-slate-500 uppercase tracking-wider">
                      QUESTION {currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : currentQuestionIndex + 1}
                    </span>
                    <p className="font-heading text-lg sm:text-xl text-white leading-relaxed font-bold">
                      {currentQ.question}
                    </p>
                  </div>

                  {/* 4 Interactive Option Tiles */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                      const letter = String.fromCharCode(65 + optIdx);

                      return (
                        <div
                          key={optIdx}
                          onClick={() => selectOption(optIdx)}
                          className={`cursor-pointer rounded-xl p-4 border transition-all flex items-center justify-between group ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                              : 'glass-panel border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg border font-heading text-xs font-bold flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)] border-cyan-400'
                                  : 'bg-slate-900 border-white/10 text-slate-400 group-hover:text-cyan-400'
                              }`}
                            >
                              {letter}
                            </div>
                            <span className="font-body text-sm text-slate-200 group-hover:text-white transition-colors">
                              {option}
                            </span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-cyan-400' : 'border-white/20'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-transparent'}`}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Bar Under Question */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/10">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={toggleFlagCurrentQuestion}
                        className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl border font-mono-code text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                          flaggedQuestions[currentQuestionIndex]
                            ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                            : 'glass-panel hover:bg-white/10 border-white/10 text-slate-300'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">flag</span>
                        <span>{flaggedQuestions[currentQuestionIndex] ? 'Flagged for Review' : 'Flag for Review'}</span>
                      </button>
                      <button
                        onClick={clearCurrentResponse}
                        className="px-3.5 py-2 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-slate-400 hover:text-rose-400 font-mono-code text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Clear Choice
                      </button>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => navigateQuestion(-1)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-white font-heading text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        <span>Previous</span>
                      </button>
                      <button
                        disabled={currentQuestionIndex === questions.length - 1}
                        onClick={() => navigateQuestion(1)}
                        className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-heading text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <span>Next Question</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Anti-Cheat Status Ticker */}
                <div className="rounded-xl glass-panel border border-white/10 p-3 flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>FOCUS SENTINEL: LOCKED ON ACTIVE WINDOW</span>
                  </div>
                  <div className="text-white font-bold">
                    STRIKES: 0 / 2
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: QUESTION NAVIGATOR PALETTE */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-2xl glass-card border border-white/10 p-5 space-y-5 shadow-xl sticky top-[88px]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-cyan-400 text-[18px]">grid_view</span>
                      Question Navigator
                    </span>
                    <span className="font-mono-code text-xs text-slate-400">{questions.length} Total</span>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 font-mono-code text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded bg-emerald-500 shrink-0"></div>
                      <span>Answered ({answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded bg-purple-500 text-white shrink-0 flex items-center justify-center text-[7px] font-bold">⚑</div>
                      <span>Flagged ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded border border-cyan-400 bg-cyan-400/20 shrink-0"></div>
                      <span>Current (Q{currentQuestionIndex + 1})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded bg-white/10 shrink-0"></div>
                      <span>Unattempted ({questions.length - answeredCount})</span>
                    </div>
                  </div>

                  {/* Question Button Grid */}
                  <div className="grid grid-cols-5 gap-2 pt-1">
                    {questions.map((_, qIdx) => {
                      const isCurrent = qIdx === currentQuestionIndex;
                      const isAnswered = userAnswers[qIdx] !== undefined;
                      const isFlagged = flaggedQuestions[qIdx];

                      let btnClasses = "h-9 rounded-xl font-mono-code text-xs font-bold flex items-center justify-center transition-all cursor-pointer ";
                      if (isCurrent) {
                        btnClasses += "bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.4)]";
                      } else if (isFlagged) {
                        btnClasses += "bg-purple-500/30 text-purple-200 border border-purple-400/50";
                      } else if (isAnswered) {
                        btnClasses += "bg-emerald-500/30 text-emerald-300 border border-emerald-400/40";
                      } else {
                        btnClasses += "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5";
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
                  <div className="glass-panel p-3 rounded-xl border border-white/10 font-mono-code text-xs flex items-center justify-between text-slate-400">
                    <span>Answered: <strong className="text-emerald-400">{answeredCount}</strong></span>
                    <span>Remaining: <strong className="text-white">{questions.length - answeredCount}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= SUBMIT CONFIRMATION MODAL ================= */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl glass-card border border-white/10 p-6 md:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <span className="material-symbols-outlined text-[28px]">crisis_alert</span>
              <h3 className="font-heading text-lg font-bold uppercase text-white">Submit Assessment?</h3>
            </div>
            <p className="font-body text-xs text-slate-300 leading-relaxed">
              You are about to lock your submission for <strong className="text-cyan-300">{selectedQuiz?.title}</strong>. Once finalized, responses cannot be amended.
            </p>
            <div className="p-3.5 rounded-xl glass-panel border border-white/10 space-y-1.5 font-mono-code text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Answered Questions:</span>
                <span className="text-emerald-400 font-bold">{answeredCount} / {questions.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Flagged for Review:</span>
                <span className="text-purple-300 font-bold">{Object.values(flaggedQuestions).filter(Boolean).length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unattempted (0 Marks):</span>
                <span className="text-white font-bold">{questions.length - answeredCount}</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white font-heading text-xs uppercase cursor-pointer transition-colors"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Resume Test
              </button>
              <button
                className="px-5 py-2.5 rounded-xl bg-rose-500 text-white hover:bg-rose-400 font-heading text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.4)] cursor-pointer transition-all"
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
        <section className="w-full px-margin py-8 flex flex-col">
          <div className="max-w-5xl mx-auto w-full space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono-code text-xs text-slate-400">
                <button onClick={() => setActiveState(1)} className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors">
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  Catalog
                </button>
                <span className="text-slate-600">/</span>
                <span className="text-white uppercase font-semibold">Official Telemetry Results</span>
              </div>
              <button
                onClick={() => setActiveState(1)}
                className="px-4 py-2 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-white font-heading text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                Back to Quiz Catalog
              </button>
            </div>

            {/* Victory Score Hero Card */}
            <div className="relative overflow-hidden rounded-2xl glass-card border border-emerald-500/30 p-6 md:p-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono-code text-[11px] uppercase font-bold tracking-wider">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    SUBMISSION VERIFIED &amp; RECORDED ON-CHAIN
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl text-white uppercase font-bold">
                    {selectedQuiz?.title}
                  </h1>
                  <p className="font-body text-xs text-slate-300">
                    Candidate: <strong className="text-white">{user?.name}</strong> ({user?.rollNumber}) • Millisecond Telemetry Logged
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end font-mono-code text-xs">
                  <span className="text-slate-400 text-[10px] uppercase">HOUSE CHAMPIONSHIP ALLOCATION</span>
                  <span className="font-heading text-xl text-cyan-400 font-bold">+150 HOUSE POINTS</span>
                  <span className="text-slate-400 text-[11px]">Credited to {user?.house}</span>
                </div>
              </div>

              {/* Big Score Telemetry Display */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2 p-5 rounded-xl glass-panel border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-mono-code text-[10px] text-slate-400 uppercase tracking-wider">AGGREGATE SCORE</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-4xl leading-none font-bold text-emerald-400">
                        {quizResult?.score !== undefined ? quizResult.score : 64}
                      </span>
                      <span className="font-heading text-lg text-slate-400">
                        / {quizResult?.maxScore !== undefined ? quizResult.maxScore : 80}
                      </span>
                    </div>
                    <span className="font-mono-code text-xs text-emerald-400 font-bold block pt-1">
                      {quizResult?.percentage !== undefined ? `${quizResult.percentage}%` : '80.0%'} OVERALL ACCURACY
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-mono-code text-xs text-white font-bold bg-emerald-500/10">
                    TOP 1%
                  </div>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1">
                  <span className="font-mono-code text-[10px] text-slate-400 uppercase">INSTITUTIONAL RANK</span>
                  <div className="font-heading text-2xl text-white font-bold flex items-center gap-1.5">
                    <span>#03</span>
                    <span className="text-xs font-normal text-slate-400 font-mono-code">/ 428 Squads</span>
                  </div>
                  <span className="font-mono-code text-[11px] text-emerald-400 font-semibold block">Podium Placement Achieved</span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1">
                  <span className="font-mono-code text-[10px] text-slate-400 uppercase">PRECISION TIME ELAPSED</span>
                  <div className="font-mono-code text-2xl text-cyan-400 font-bold">
                    {formatTime(totalTimeElapsed || 522)}
                  </div>
                  <span className="font-mono-code text-[11px] text-slate-400 block">Tie-breaker benchmark verified</span>
                </div>
              </div>

              {/* Question Solutions Review Section */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="font-heading text-base uppercase text-white flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-cyan-400 text-[20px]">fact_check</span>
                  Telemetry Response Review &amp; Solutions
                </h3>

                <div className="space-y-3">
                  {questions.map((q, qIndex) => {
                    const candidateAns = userAnswers[qIndex];
                    const isCorrect = candidateAns === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl glass-panel border border-white/10 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-[11px] text-slate-400 uppercase">QUESTION {qIndex + 1}</span>
                          <span className={`font-mono-code text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                            candidateAns === undefined
                              ? 'bg-white/5 text-slate-400 border-white/10'
                              : isCorrect
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          }`}>
                            {candidateAns === undefined ? 'SKIPPED (0)' : isCorrect ? 'CORRECT (+4)' : 'INCORRECT (-1)'}
                          </span>
                        </div>
                        <p className="font-heading text-sm text-white font-semibold">
                          {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                            <span className="font-mono-code text-[10px] text-slate-400 block uppercase">Your Selection</span>
                            <span className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {candidateAns !== undefined ? q.options[candidateAns] : 'None (Skipped)'}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                            <span className="font-mono-code text-[10px] text-slate-400 block uppercase">Official Validated Answer</span>
                            <span className="text-emerald-400 font-semibold">
                              {q.options[q.correctAnswer]}
                            </span>
                          </div>
                        </div>
                        <p className="font-body text-xs text-slate-300 pt-1 leading-relaxed">
                          <strong className="text-cyan-400 font-mono-code">Explanation:</strong> {q.explanation}
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
