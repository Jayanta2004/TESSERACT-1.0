import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    signUp,
    allowedDomains,
    switchRole
  } = useApp();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const validateIITMDomain = (testEmail) => {
    return allowedDomains.some(dom => testEmail.trim().toLowerCase().endsWith(dom.toLowerCase()));
  };

  const handleSignUpInit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setErrorMsg('Please enter your IIT Madras student email.');
      return;
    }

    const isValidDomain = validateIITMDomain(email);
    if (!isValidDomain) {
      setErrorMsg(
        `Email domain must end with one of: ${allowedDomains.join(', ')}. Unofficial emails cannot be verified.`
      );
      return;
    }

    // Move to simulated OTP step
    setStep('otp');
    setOtpCode('2409'); // Demo pre-hint
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode.trim().length < 4) {
      setErrorMsg('Please enter the 4-digit verification code.');
      return;
    }
    const success = signUp({ name: fullName, email });
    if (success) {
      setStep('input');
      setEmail('');
      setPassword('');
      setFullName('');
      setErrorMsg('');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your student email.');
      return;
    }
    login(email, password || 'password123');
    setEmail('');
    setPassword('');
    setErrorMsg('');
  };

  const handleQuickDemo = (role) => {
    switchRole(role);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0d121e] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-in zoom-in-95 duration-200">
        {/* Header decoration */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-cyan-950/40 to-transparent border-b border-slate-800">
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setStep('input');
              setErrorMsg('');
            }}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                IITM BS Auth Portal
              </h3>
              <p className="text-xs text-slate-400">
                Tesseract Official Esports Society
              </p>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex mt-4 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setStep('input');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authModalTab === 'login'
                  ? 'bg-cyan-500 text-black shadow font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('signup');
                setStep('input');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authModalTab === 'signup'
                  ? 'bg-cyan-500 text-black shadow font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Sign Up
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {authModalTab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  IIT Madras Student Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="23fxxxxxxx@ds.study.iitm.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] mt-2"
              >
                Log In to Tesseract
              </button>
            </form>
          ) : step === 'input' ? (
            /* SIGN UP STEP 1: Details & Domain Check */
            <form onSubmit={handleSignUpInit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jayanta Mondal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    IIT Madras Email Address
                  </label>
                  <span className="text-[10px] text-cyan-400 font-mono-code">
                    Domain Verified
                  </span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="rollno@ds.study.iitm.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono-code text-xs"
                  />
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {allowedDomains.map((dom) => (
                    <span
                      key={dom}
                      onClick={() => {
                        if (!email.includes('@')) {
                          setEmail((email || '24f100xxxx') + dom);
                        } else {
                          setEmail(email.split('@')[0] + dom);
                        }
                      }}
                      className="cursor-pointer text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500 border border-slate-700 transition-colors"
                      title="Click to append domain"
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PRD Section 6 IITM Verification Rule
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Only verified IIT Madras BS student emails are permitted to compete in prize tournaments, participate in society quizzes, and vote in polls.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 mt-2"
              >
                <span>Send Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* SIGN UP STEP 2: Simulated OTP verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center py-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-base font-bold text-white">
                  Enter Verification Code
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  We sent a 4-digit code to <span className="text-cyan-300 font-mono-code">{email}</span>
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="2409"
                  className="w-full text-center tracking-[1em] font-mono-code text-xl py-3 bg-slate-900 border border-cyan-500/50 rounded-xl text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <p className="text-center text-[11px] text-slate-500 mt-1.5">
                  Demo auto-filled code: 2409
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-2 py-2.5 rounded-xl font-heading text-xs font-bold uppercase text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow"
                >
                  Verify & Activate Account
                </button>
              </div>
            </form>
          )}

          {/* Quick Instant Test Presets */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Quick Test Presets (Instant):</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('guest')}
                className="py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono-code font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors text-center cursor-pointer"
              >
                👤 Guest
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('unverified')}
                className="py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono-code font-medium bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-700/60 transition-colors text-center cursor-pointer"
              >
                ⏳ Unverified
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono-code font-medium bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-700/60 transition-colors text-center cursor-pointer"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono-code font-medium bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-700/60 transition-colors text-center cursor-pointer"
              >
                ⚡ Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
