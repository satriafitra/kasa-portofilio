import React, { useState, useEffect } from 'react';
import { ModernNavbar } from './components/modern/ModernNavbar';
import { ModernHero } from './components/modern/ModernHero';
import { ModernAbout } from './components/modern/ModernAbout';
import { ModernSkills } from './components/modern/ModernSkills';
import { ModernProjects } from './components/modern/ModernProjects';
import { ModernExperience } from './components/modern/ModernExperience';
import { ModernContact } from './components/modern/ModernContact';
import { ModernFooter } from './components/modern/ModernFooter';
import { ArcadeView } from './components/arcade/ArcadeView';
import {
  Profile,
  Skill,
  Project,
  Experience,
  ScoreEntry,
  ContactMessage,
  SystemStats
} from './types';
import {
  fetchProfile,
  fetchSkills,
  fetchProjects,
  fetchExperience,
  fetchLeaderboard,
  fetchGuestbook,
  fetchStats,
  submitScore,
  submitContact
} from './services/api';
import { soundFx } from './services/sound';
import { Gamepad2 } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation View State: 'portfolio' (Modern Landing Page) or 'arcade' (Dedicated Pixel Game Page)
  const [currentView, setCurrentView] = useState<'portfolio' | 'arcade'>('portfolio');

  // Backend Data States
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [guestbook, setGuestbook] = useState<ContactMessage[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loadingScores, setLoadingScores] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Fetch initial data from Spring Boot Backend
  useEffect(() => {
    async function loadData() {
      try {
        const [prof, skl, prj, exp, ldb, gbk, st] = await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchProjects(),
          fetchExperience(),
          fetchLeaderboard(10),
          fetchGuestbook(),
          fetchStats()
        ]);
        setProfile(prof);
        setSkills(skl);
        setProjects(prj);
        setExperiences(exp);
        setLeaderboard(ldb);
        setGuestbook(gbk);
        setSystemStats(st);

        if (ldb.length > 0) {
          setHighScore(ldb[0].score);
        }
      } catch (err) {
        console.error("Error loading portfolio data", err);
      }
    }
    loadData();
  }, []);

  // Save score to Java backend
  const handleSaveScore = async (initials: string, finalScore: number, finalCoins: number) => {
    const newEntry: ScoreEntry = {
      playerInitials: initials,
      score: finalScore,
      coins: finalCoins,
      characterClass: 'FLAPPER'
    };

    const saved = await submitScore(newEntry);
    setLeaderboard((prev) => {
      const updated = [saved, ...prev].sort((a, b) => b.score - a.score);
      return updated.slice(0, 10);
    });
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
  };

  // Submit Contact message to Java backend
  const handleSendMessage = async (msg: ContactMessage): Promise<boolean> => {
    try {
      const saved = await submitContact(msg);
      setGuestbook((prev) => [saved, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  // Refresh leaderboard
  const handleRefreshLeaderboard = async () => {
    setLoadingScores(true);
    try {
      const data = await fetchLeaderboard(10);
      setLeaderboard(data);
    } finally {
      setLoadingScores(false);
    }
  };

  // Scroll to top upon view change
  const navigateTo = (view: 'portfolio' | 'arcade') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // RENDER DEDICATED PIXEL ARCADE GAME VIEW
  if (currentView === 'arcade') {
    return (
      <ArcadeView
        onBackToPortfolio={() => navigateTo('portfolio')}
        scores={leaderboard}
        isLoadingScores={loadingScores}
        onRefreshScores={handleRefreshLeaderboard}
        onSaveScore={handleSaveScore}
        highScore={highScore}
      />
    );
  }

  // RENDER SLEEK MODERN LANDING PAGE (SATRIA FITRA / KASAV)
  return (
    <div className="modern-theme">
      {/* Modern Navigation Header */}
      <ModernNavbar onOpenArcade={() => navigateTo('arcade')} />

      {/* Hero Section */}
      <ModernHero onOpenArcade={() => navigateTo('arcade')} />

      {/* About Section */}
      <ModernAbout profile={profile} onOpenArcade={() => navigateTo('arcade')} />

      {/* Skills Section */}
      <ModernSkills skills={skills} />

      {/* Projects Section */}
      <ModernProjects projects={projects} />

      {/* Experience Timeline Section */}
      <ModernExperience experiences={experiences} />

      {/* Contact Section */}
      <ModernContact messages={guestbook} onSubmitMessage={handleSendMessage} />

      {/* Modern Footer */}
      <ModernFooter stats={systemStats} onOpenArcade={() => navigateTo('arcade')} />

      {/* Floating Action Button: Clean, Subtle, Minimalist */}
      <button
        onClick={() => {
          soundFx.playClick();
          navigateTo('arcade');
        }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 990,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.65rem 1.15rem',
          borderRadius: '8px',
          background: '#18181f',
          color: 'var(--m-yellow)',
          fontWeight: 600,
          fontSize: '0.85rem',
          border: '1px solid rgba(250, 204, 21, 0.3)',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.15s ease'
        }}
        className="clean-floating-game-btn"
        title="Buka Game Flappy Dev (Mode Pixel)"
      >
        <Gamepad2 size={16} />
        <span>Flappy Dev</span>
      </button>

      <style>{`
        .clean-floating-game-btn:hover {
          background: var(--m-yellow) !important;
          color: #09090b !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};
