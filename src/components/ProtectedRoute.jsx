import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { hasPermission, hasRole, getRoleInfo, ROLES, PERMISSIONS } from '../utils/rbac';

/**
 * ProtectedRoute Component
 * Implements strict, user-friendly Role-Based Access Control
 * 
 * Props:
 * - requiredRole: string (e.g. 'admin')
 * - allowedRoles: Array<string> (e.g. ['student', 'admin'])
 * - requiredPermission: string (e.g. PERMISSIONS.ACCESS_ADMIN_PANEL)
 * - children: React.ReactNode
 */
export default function ProtectedRoute({
  children,
  requiredRole,
  allowedRoles,
  requiredPermission
}) {
  const { accountState, user, switchRole, setIsAuthModalOpen } = useApp();
  const navigate = useNavigate();

  const currentRoleInfo = getRoleInfo(accountState);

  // Verification checks
  let isAuthorized = true;

  if (requiredRole && accountState !== requiredRole) {
    isAuthorized = false;
  }

  if (allowedRoles && !hasRole(accountState, allowedRoles)) {
    isAuthorized = false;
  }

  if (requiredPermission && !hasPermission(accountState, requiredPermission)) {
    isAuthorized = false;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  // If user is attempting to access Admin console without admin clearance
  if (requiredRole === ROLES.ADMIN || requiredPermission === PERMISSIONS.ACCESS_ADMIN_PANEL) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full glass-card p-8 sm:p-10 rounded-2xl border border-red-500/30 shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden">
          
          {/* Ambient Security Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-red-500/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-500/15 blur-3xl pointer-events-none"></div>

          {/* Header Warning Strip */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono-code text-red-400 font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              SECURITY PROTOCOL // 403 FORBIDDEN
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-red-500/10 text-red-400 border border-red-500/20">
              GATEWAY ENFORCED
            </span>
          </div>

          {/* Center Graphic */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.3)]">
              <span className="material-symbols-outlined text-[34px]">lock_person</span>
            </div>

            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                WebOps Clearance Required
              </h1>
              <p className="text-sm font-body text-slate-300 mt-2 leading-relaxed">
                The Tesseract Admin Operations Center is strictly restricted to Society Executive Council governors, Tournament Marshals, and WebOps Leads.
              </p>
            </div>

            {/* Clearance Comparison Matrix */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-white/10 text-left font-mono-code text-xs space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Your Current Identity:</span>
                <span className={`px-2 py-0.5 rounded border font-semibold ${currentRoleInfo.badgeClass}`}>
                  {currentRoleInfo.label} (Level {currentRoleInfo.clearanceLevel})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Required Clearance:</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  WebOps Admin (Level 3)
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
                <span>Access Rule:</span>
                <span className="text-red-400 font-semibold">Strict Role-Based Access Control</span>
              </div>
            </div>

            {/* Evaluation Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => switchRole(ROLES.ADMIN)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Switch to Admin (Demo)
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-mono-code text-xs border border-white/10 transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>

            <p className="text-[11px] font-mono-code text-slate-500 pt-1">
              Tip: You can also toggle roles at any time using the header identity switcher.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Generic unauthorized screen (for unauthenticated users needing login)
  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-cyan-500/30 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-[30px]">vpn_key</span>
        </div>
        
        <div>
          <h2 className="font-heading text-xl font-bold text-white uppercase">
            Authentication Required
          </h2>
          <p className="text-xs font-body text-slate-300 mt-1.5 leading-relaxed">
            Please authenticate with your verified IIT Madras student credentials to access this protected area.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            Sign In with IITM Identity
          </button>
          <button
            onClick={() => switchRole(ROLES.STUDENT)}
            className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono-code text-xs border border-cyan-500/30 transition-colors cursor-pointer"
          >
            Instant Student Mode (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
