import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
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

function MainContent() {
  const { currentView } = useApp();

  return (
    <main className="flex-1 w-full relative">
      {currentView === 'home' && <HomeView />}
      {currentView === 'games' && <GamesView />}
      {currentView === 'events' && <EventsView />}
      {currentView === 'quizzes' && <QuizView />}
      {currentView === 'leaderboard' && <LeaderboardView />}
      {currentView === 'polls' && <PollsView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'team' && <TeamView />}
      {currentView === 'about' && <AboutView />}
      {currentView === 'admin' && <AdminView />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
        {/* Navigation */}
        <Navbar />

        {/* Dynamic Route View */}
        <MainContent />

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
