import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  INITIAL_ANNOUNCEMENT,
  INITIAL_GAMES,
  INITIAL_EVENTS,
  INITIAL_QUIZZES,
  INITIAL_LEADERBOARD,
  INITIAL_POLLS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_USER,
  ALLOWED_EMAIL_DOMAINS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation state kept in sync with router
  const [currentView, setCurrentViewState] = useState('home');
  const [selectedGameForModal, setSelectedGameForModal] = useState(null);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [activeQuizForRunner, setActiveQuizForRunner] = useState(null);

  // Sync state whenever the URL path changes
  useEffect(() => {
    const rawPath = location.pathname.replace(/^\//, '').toLowerCase();
    const cleanPath = rawPath === '' ? 'home' : (rawPath === 'quiz' ? 'quizzes' : rawPath);
    setCurrentViewState(cleanPath);
  }, [location.pathname]);

  // Navigate both router and local state
  const setCurrentView = (viewId) => {
    setCurrentViewState(viewId);
    const targetPath = (viewId === 'home' || !viewId) ? '/' : `/${viewId}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  // Authentication & Account State: 'guest' | 'unverified' | 'student' | 'admin'
  const [accountState, setAccountState] = useState('student');
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'signup'

  // Global Announcement
  const [announcement, setAnnouncement] = useState(INITIAL_ANNOUNCEMENT);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  // Core Data Entities
  const [games, setGames] = useState(INITIAL_GAMES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [allowedDomains, setAllowedDomains] = useState(ALLOWED_EMAIL_DOMAINS);

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Helper to switch roles easily for instant evaluation
  const switchRole = (newRole) => {
    setAccountState(newRole);
    if (newRole === 'guest') {
      setUser(null);
      showToast('Switched to Guest mode (Public pages only)', 'info');
    } else if (newRole === 'unverified') {
      setUser({
        name: 'Rahul Sharma (New Student)',
        email: '24f1004812@study.iitm.ac.in',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        gamerTag: 'GHOST_IITM',
        bio: 'Freshman student exploring esports society.',
        favoriteGames: [],
        gamingInterests: ['Esports'],
        verified: false,
        role: 'unverified',
        registeredEvents: [],
        quizAttempts: [],
        pollVotes: {}
      });
      showToast('Switched to Unverified Student mode', 'info');
    } else if (newRole === 'student') {
      setUser({
        ...INITIAL_USER,
        role: 'student',
        verified: true
      });
      showToast('Switched to Verified Student mode (Full participation)', 'success');
    } else if (newRole === 'admin') {
      setUser({
        ...INITIAL_USER,
        role: 'admin',
        verified: true
      });
      showToast('Switched to Admin / Team Member mode', 'success');
    }
  };

  // Authentication actions
  const login = (email, password) => {
    // Check if domain is allowed
    const isIITM = allowedDomains.some(d => email.toLowerCase().endsWith(d));
    const newUser = {
      ...INITIAL_USER,
      email,
      name: email.split('@')[0],
      verified: isIITM,
      role: email.toLowerCase().includes('admin') ? 'admin' : (isIITM ? 'student' : 'unverified')
    };
    setUser(newUser);
    setAccountState(newUser.role);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.name}! Logged in successfully.`, 'success');
  };

  const signUp = ({ name, email }) => {
    const isIITM = allowedDomains.some(d => email.toLowerCase().endsWith(d));
    if (!isIITM) {
      showToast(`Please use an approved IIT Madras domain (${allowedDomains.join(', ')})`, 'error');
      return false;
    }
    const newUser = {
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      gamerTag: name.split(' ')[0].toUpperCase() + '_IITM',
      bio: 'Enthusiastic IITM BS Esports member.',
      favoriteGames: ['Valorant'],
      gamingInterests: ['Competitive FPS'],
      verified: true,
      role: 'student',
      registeredEvents: [],
      quizAttempts: [],
      pollVotes: {}
    };
    setUser(newUser);
    setAccountState('student');
    setIsAuthModalOpen(false);
    showToast(`Account created and verified with IITM domain! Welcome, ${name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    setAccountState('guest');
    if (currentView === 'profile' || currentView === 'admin') {
      setCurrentView('home');
    }
    showToast('Logged out successfully.', 'info');
  };

  const updateUserProfile = (updatedData) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    showToast('Profile updated successfully!', 'success');
  };

  // Event Registration Flow
  const registerForEvent = (eventId, studentDetails) => {
    if (accountState === 'guest') {
      setIsAuthModalOpen(true);
      showToast('Please sign in with your IITM student account to register for events', 'warning');
      return false;
    }
    if (accountState === 'unverified') {
      showToast('Your account is not yet verified. Only verified IITM students can register.', 'error');
      return false;
    }

    if (user && !user.registeredEvents.includes(eventId)) {
      setUser(prev => ({
        ...prev,
        registeredEvents: [...prev.registeredEvents, eventId]
      }));
    }
    showToast('Successfully registered! Redirecting to Google Form submission slip...', 'success');
    return true;
  };

  // Quiz submission & scoring
  const submitQuizAttempt = (quizId, answers, timeSpentSeconds) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return null;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    quiz.questions.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected === undefined || selected === null) {
        unattemptedCount++;
      } else if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const marksPerQ = quiz.marksPerQuestion || 4;
    const negMarks = quiz.negativeMarks || 0;
    const totalScore = Math.max(0, (correctCount * marksPerQ) - (incorrectCount * negMarks));
    const totalPossible = quiz.questions.length * marksPerQ;

    const minutes = Math.floor(timeSpentSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeSpentSeconds % 60).toString().padStart(2, '0');
    const timeFormatted = `${minutes}:${seconds}`;

    const newAttempt = {
      quizId,
      quizTitle: quiz.title,
      score: totalScore,
      totalPossible,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeTaken: timeFormatted,
      timeSpentSeconds,
      completedAt: new Date().toISOString().split('T')[0]
    };

    // Update user profile
    if (user) {
      setUser(prev => ({
        ...prev,
        quizAttempts: [newAttempt, ...(prev.quizAttempts || [])]
      }));
    }

    // Insert into Leaderboard and sort: Higher score first, then lower time!
    const newEntry = {
      rank: 1,
      student: user ? user.name : 'Verified Student',
      email: user ? user.email : 'student@study.iitm.ac.in',
      score: totalScore,
      time: timeFormatted,
      quizId,
      date: new Date().toISOString().split('T')[0]
    };

    setLeaderboard(prev => {
      const updated = [...prev, newEntry];
      // Sort: score desc, then time asc
      updated.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time.localeCompare(b.time);
      });
      // Re-assign ranks
      return updated.map((item, idx) => ({ ...item, rank: idx + 1 }));
    });

    return newAttempt;
  };

  // Poll voting (Section 14: Limit each verified student to one vote)
  const votePoll = (pollId, optionId, isAnonymous = false) => {
    if (accountState === 'guest') {
      setIsAuthModalOpen(true);
      showToast('Please sign in to vote in society polls', 'warning');
      return false;
    }
    if (accountState === 'unverified') {
      showToast('Only verified IITM BS students can vote in society polls.', 'error');
      return false;
    }

    if (user && user.pollVotes && user.pollVotes[pollId]) {
      showToast('You have already voted in this poll! (1 vote limit strictly enforced)', 'warning');
      return false;
    }

    // Increment option vote in state
    setPolls(prev => prev.map(p => {
      if (p.id !== pollId) return p;
      return {
        ...p,
        totalVotes: p.totalVotes + 1,
        options: p.options.map(opt => {
          if (opt.id !== optionId) return opt;
          return { ...opt, votes: opt.votes + 1 };
        })
      };
    }));

    // Record vote in user profile
    if (user) {
      setUser(prev => ({
        ...prev,
        pollVotes: {
          ...prev.pollVotes,
          [pollId]: optionId
        }
      }));
    }

    showToast('Your vote has been recorded! Thank you for participating.', 'success');
    return true;
  };

  // Admin Actions for CRUD
  const addEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    showToast('Event created successfully!', 'success');
  };

  const updateEvent = (id, updatedData) => {
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, ...updatedData } : ev));
    showToast('Event updated successfully!', 'success');
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
    showToast('Event removed.', 'info');
  };

  const addGame = (newGame) => {
    setGames(prev => [...prev, newGame]);
    showToast('Game added to directory!', 'success');
  };

  const updateGame = (id, updatedData) => {
    setGames(prev => prev.map(g => g.id === id ? { ...g, ...updatedData } : g));
    showToast('Game details updated!', 'success');
  };

  const deleteGame = (id) => {
    setGames(prev => prev.filter(g => g.id !== id));
    showToast('Game removed from catalog.', 'info');
  };

  const addQuiz = (newQuiz) => {
    setQuizzes(prev => [newQuiz, ...prev]);
    showToast('Quiz created and published!', 'success');
  };

  const updateQuiz = (id, updatedData) => {
    setQuizzes(prev => prev.map(q => q.id === id ? { ...q, ...updatedData } : q));
    showToast('Quiz settings updated!', 'success');
  };

  const deleteQuiz = (id) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
    showToast('Quiz deleted.', 'info');
  };

  const createPoll = (newPoll) => {
    setPolls(prev => [newPoll, ...prev]);
    showToast('Society poll created and published!', 'success');
  };

  const addAllowedDomain = (domain) => {
    if (!domain.startsWith('@')) domain = '@' + domain;
    if (!allowedDomains.includes(domain)) {
      setAllowedDomains(prev => [...prev, domain]);
      showToast(`Added ${domain} to allowed student domains!`, 'success');
    }
  };

  const removeAllowedDomain = (domain) => {
    setAllowedDomains(prev => prev.filter(d => d !== domain));
    showToast(`Removed ${domain}`, 'info');
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      accountState,
      switchRole,
      user,
      updateUserProfile,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalTab,
      setAuthModalTab,
      login,
      signUp,
      logout,
      announcement,
      setAnnouncement,
      isAnnouncementOpen,
      setIsAnnouncementOpen,
      games,
      addGame,
      updateGame,
      deleteGame,
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      quizzes,
      addQuiz,
      updateQuiz,
      deleteQuiz,
      submitQuizAttempt,
      leaderboard,
      polls,
      votePoll,
      createPoll,
      teamMembers,
      setTeamMembers,
      allowedDomains,
      addAllowedDomain,
      removeAllowedDomain,
      selectedGameForModal,
      setSelectedGameForModal,
      selectedEventForModal,
      setSelectedEventForModal,
      activeQuizForRunner,
      setActiveQuizForRunner,
      toast,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
