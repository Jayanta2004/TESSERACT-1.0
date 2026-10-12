/**
 * TESSERACT 1.0 — Role-Based Access Control (RBAC) System
 * PRD Specification v1.0
 * 
 * Formalizes roles, permissions, clearances, and security policies
 * across the IIT Madras BS Esports Society platform.
 */

export const ROLES = {
  GUEST: 'guest',
  UNVERIFIED: 'unverified',
  STUDENT: 'student',
  ADMIN: 'admin'
};

export const PERMISSIONS = {
  // Public & General
  VIEW_PUBLIC_PAGES: 'view:public_pages',
  
  // Student Passport & Identity
  VIEW_PROFILE: 'view:profile',
  EDIT_PROFILE: 'edit:profile',
  
  // Competitive Esports Operations
  REGISTER_TOURNAMENTS: 'participate:tournaments',
  VIEW_TOURNAMENT_RULES: 'view:tournament_rules',
  
  // Timed Quiz Arena
  ATTEMPT_QUIZ: 'attempt:quiz',
  RECORD_LEADERBOARD_SCORE: 'record:leaderboard_score',
  
  // Democratic Governance
  VOTE_POLLS: 'vote:polls',
  
  // Executive WebOps / Admin CMS
  ACCESS_ADMIN_PANEL: 'access:admin_panel',
  MANAGE_ANNOUNCEMENTS: 'manage:announcements',
  MANAGE_EVENTS: 'manage:events',
  MANAGE_GAMES: 'manage:games',
  MANAGE_QUIZZES: 'manage:quizzes',
  MANAGE_POLLS: 'manage:polls',
  MANAGE_DOMAINS: 'manage:domains',
  MANAGE_ROSTERS: 'manage:rosters'
};

export const ROLE_DEFINITIONS = {
  [ROLES.GUEST]: {
    id: ROLES.GUEST,
    label: 'Public Guest',
    shortLabel: 'Guest',
    clearanceLevel: 0,
    icon: 'person',
    color: 'text-slate-400',
    borderColor: 'border-slate-700/60',
    bgColor: 'bg-slate-800/40',
    badgeClass: 'bg-slate-800/80 text-slate-300 border-slate-700',
    description: 'Public visitor with read-only access to sanctioned games, tournament schedules, team council, and public leaderboard.',
    permissions: [
      PERMISSIONS.VIEW_PUBLIC_PAGES,
      PERMISSIONS.VIEW_TOURNAMENT_RULES
    ]
  },

  [ROLES.UNVERIFIED]: {
    id: ROLES.UNVERIFIED,
    label: 'Unverified Student',
    shortLabel: 'Unverified',
    clearanceLevel: 1,
    icon: 'hourglass_empty',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-950/20',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    description: 'Account registered with external or unverified email. Requires verification with an approved @study.iitm.ac.in domain to unlock official house tournaments, verified quizzes, and society voting.',
    permissions: [
      PERMISSIONS.VIEW_PUBLIC_PAGES,
      PERMISSIONS.VIEW_PROFILE,
      PERMISSIONS.EDIT_PROFILE,
      PERMISSIONS.VIEW_TOURNAMENT_RULES,
      PERMISSIONS.ATTEMPT_QUIZ // Practice mode only; score not registered on verified podium
    ]
  },

  [ROLES.STUDENT]: {
    id: ROLES.STUDENT,
    label: 'Verified Student',
    shortLabel: 'Student',
    clearanceLevel: 2,
    icon: 'school',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-950/20',
    badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30',
    description: 'Authenticated student with verified IIT Madras institutional identity. Full privileges for house tournaments, official timed quizzes, democratic referendum voting, and personal esports passport.',
    permissions: [
      PERMISSIONS.VIEW_PUBLIC_PAGES,
      PERMISSIONS.VIEW_PROFILE,
      PERMISSIONS.EDIT_PROFILE,
      PERMISSIONS.REGISTER_TOURNAMENTS,
      PERMISSIONS.VIEW_TOURNAMENT_RULES,
      PERMISSIONS.ATTEMPT_QUIZ,
      PERMISSIONS.RECORD_LEADERBOARD_SCORE,
      PERMISSIONS.VOTE_POLLS
    ]
  },

  [ROLES.ADMIN]: {
    id: ROLES.ADMIN,
    label: 'WebOps Admin',
    shortLabel: 'Admin',
    clearanceLevel: 3,
    icon: 'bolt',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-950/20',
    badgeClass: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    description: 'Society Executive Council, Tournament Directors, and WebOps Leads. Full platform administrative authority, CMS management, telemetry analytics, and domain whitelist governance.',
    permissions: Object.values(PERMISSIONS)
  }
};

/**
 * Check if a role possesses a specific permission
 */
export function hasPermission(role, permission) {
  if (!role) return false;
  const roleConfig = ROLE_DEFINITIONS[role];
  if (!roleConfig) return false;
  return roleConfig.permissions.includes(permission);
}

/**
 * Check if a role is authorized against an array of allowed roles
 */
export function hasRole(currentRole, allowedRoles = []) {
  if (!currentRole) return false;
  if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) return true;
  return allowedRoles.includes(currentRole);
}

/**
 * Get comprehensive metadata for a role
 */
export function getRoleInfo(role) {
  return ROLE_DEFINITIONS[role] || ROLE_DEFINITIONS[ROLES.GUEST];
}

/**
 * Check if current role has sufficient clearance level
 */
export function hasClearance(currentRole, requiredLevel = 0) {
  const info = getRoleInfo(currentRole);
  return info.clearanceLevel >= requiredLevel;
}
