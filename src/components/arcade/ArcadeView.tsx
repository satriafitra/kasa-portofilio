import React, { useState } from 'react';
import { FlappyGame } from '../FlappyGame';
import { Leaderboard } from '../Leaderboard';
import { ScoreEntry } from '../../types';
import { ArrowLeft, Trophy } from 'lucide-react';
import { soundFx } from '../../services/sound';

interface ArcadeViewProps {
  onBackToPortfolio: () => void;
  scores: ScoreEntry[];
  isLoadingScores: boolean;
  onRefreshScores: () => void;
  onSaveScore: (initials: string, score: number, coins: number) => Promise<void>;
  highScore: number;
}

export const ArcadeView: React.FC<ArcadeViewProps> = ({
  onBackToPortfolio,
  scores,
  isLoadingScores,
  onRefreshScores,
  onSaveScore,
  highScore
}) => {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);

  return (
    <div className="modern-theme" style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Modern Clean Header Nav (NO CRT, NO PIXEL FONT) */}
      <div
        style={{
          background: 'rgba(13, 13, 17, 0.95)',
          borderBottom: '1px solid var(--m-border)',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 990,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="modern-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Clean Return Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onBackToPortfolio();
            }}
            className="modern-btn-outline"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.875rem' }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Portofolio Modern</span>
          </button>

          {/* High Score Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--m-text-sub)' }}>
              Skor Tertinggi: <strong style={{ color: 'var(--m-yellow)' }}>{highScore}</strong>
            </div>

            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
              KasaV<span style={{ color: 'var(--m-yellow)' }}>.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="modern-container" style={{ paddingTop: '2.5rem' }}>
        {/* Modern Title & Context Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="modern-badge modern-badge-yellow">
              MINI-GAME INTERAKTIF
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0.3rem 0' }}>
            Flappy Dev: Byte Flight
          </h1>

          <p style={{ color: 'var(--m-text-sub)', fontSize: '0.95rem', maxWidth: '620px', margin: '0.5rem auto 0 auto', lineHeight: 1.6 }}>
            Kendalikan arsitek sistem menghindari pilar server. Kumpulkan koin dan raih skor tertinggi. Gunakan tombol <strong>Fullscreen</strong> di pojok kabinet untuk bermain dalam mode layar penuh.
          </p>
        </div>

        {/* The Flappy Dev Canvas Game (Pixel Art strictly INSIDE this cabinet) */}
        <div style={{ marginBottom: '4rem' }}>
          <FlappyGame
            onScoreUpdate={(s) => setScore(s)}
            onCoinUpdate={(c) => setCoins(c)}
            onMilestoneUnlock={() => {}}
            onSaveScore={onSaveScore}
            highScore={highScore}
          />
        </div>

        {/* Modern Leaderboard Component (Clean Styling, NO PIXEL TEXT) */}
        <div>
          <Leaderboard
            scores={scores}
            isLoading={isLoadingScores}
            onRefresh={onRefreshScores}
          />
        </div>
      </main>
    </div>
  );
};
