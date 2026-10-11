import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalAnnouncementModal from './components/GlobalAnnouncementModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomeView from './views/HomeView';
import GamesView from './views/GamesView';
import EventsView from './views/EventsView';
import QuizView from './views/QuizView';
import LeaderboardView from './views/LeaderboardView';
import PollsView from './views/PollsView';
import ProfileView from './views/ProfileView';
import TeamView from './views/TeamView';
import AboutView from './views/AboutView';
import AdminView from './views/AdminView';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function MainRoutes() {
  return (
    <main className="flex-1 w-full relative pt-[70px]">
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/events" element={<EventsView />} />
        <Route path="/games" element={<GamesView />} />
        <Route path="/quizzes" element={<QuizView />} />
        <Route path="/quiz" element={<Navigate to="/quizzes" replace />} />
        <Route path="/leaderboard" element={<LeaderboardView />} />
        <Route path="/polls" element={<PollsView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/team" element={<TeamView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-black">
        {/* Navigation Header */}
        <Navbar />

        {/* Dynamic Client Routes */}
        <MainRoutes />

        {/* Global Announcement Pop-up (PRD Section 8) */}
        <GlobalAnnouncementModal />

        {/* IITM Student Auth & Verification Modal (PRD Section 6) */}
        <AuthModal />

        {/* Toast notifications */}
        <Toast />

        {/* Footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}

