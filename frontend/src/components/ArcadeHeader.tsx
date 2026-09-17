import React from 'react';
import { Volume2, VolumeX, Monitor, ShieldCheck, Gamepad2, FileText, Sparkles } from 'lucide-react';
import { soundFx } from '../services/sound';

interface ArcadeHeaderProps {
  score: number;
  highScore: number;
  coins: number;
  isMuted: boolean;
  onToggleMute: () => void;
  crtActive: boolean;
  onToggleCrt: () => void;
  viewMode: 'arcade' | 'dossier';
  onToggleMode: (mode: 'arcade' | 'dossier') => void;
  unlockedCount: number;
  totalUnlockables: number;
}

export const ArcadeHeader: React.FC<ArcadeHeaderProps> = ({
  score,
  highScore,
  coins,
  isMuted,
  onToggleMute,
  crtActive,
  onToggleCrt,
  viewMode,
  onToggleMode,
  unlockedCount,
  totalUnlockables
}) => {
  return (
    <header className="arcade-header-wrapper" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#0b0b0e' }}>
      {/* Top Retro Marquee */}
      <div className="marquee-bar">
        <div className="marquee-content">
          ⚡ WELCOME TO KAKANG'S 16-BIT CYBERSPACE ⚡ FULLSTACK ARCHITECT: JAVA SPRING BOOT 3 &amp; REACT 19 ⚡ FLAP TO UNLOCK SECRET SECTIONS ⚡ CURRENT QUEST: AVAILABLE FOR HIRE ⚡ INSERT COIN TO PLAY ⚡
        </div>
      </div>

      {/* Main Arcade Dashboard Bar */}
      <div style={{
        background: '#121218',
        borderBottom: '3px solid var(--yellow-neon)',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {/* Logo & Callout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--yellow-neon)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: 'bold',
            fontFamily: 'var(--font-arcade)',
            fontSize: '0.9rem',
            boxShadow: '0 0 10px var(--yellow-glow)'
          }}>
            K
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-arcade)', fontSize: '0.85rem', color: 'var(--yellow-neon)' }}>
              FLAPPY DEV // PORTFOLIO
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--green-neon)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-neon)', display: 'inline-block' }}></span>
              SYSTEM: ONLINE [200 OK]
            </div>
          </div>
        </div>

        {/* Live Score HUD & Unlocks */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          fontFamily: 'var(--font-arcade)',
          fontSize: '0.75rem',
          background: '#0d0d12',
          padding: '0.5rem 1rem',
          border: '2px solid #2a2a38'
        }}>
          <div>
            <span style={{ color: '#888' }}>SCORE: </span>
            <span className="neon-yellow" style={{ fontSize: '0.9rem' }}>{String(score).padStart(4, '0')}</span>
          </div>
          <div>
            <span style={{ color: '#888' }}>HI: </span>
            <span style={{ color: '#fff' }}>{String(highScore).padStart(4, '0')}</span>
          </div>
          <div>
            <span style={{ color: '#888' }}>BYTE COINS: </span>
            <span style={{ color: 'var(--yellow-amber)' }}>🪙 {coins}</span>
          </div>
          <div style={{ borderLeft: '1px solid #333', paddingLeft: '1rem', color: 'var(--green-neon)' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            UNLOCKED: {unlockedCount}/{totalUnlockables}
          </div>
        </div>

        {/* Controls: Mode Switcher, CRT Toggle, Sound Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Mode Switcher */}
          <div style={{ display: 'flex', background: '#0a0a0f', border: '2px solid var(--yellow-neon)', padding: '2px' }}>
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleMode('arcade');
              }}
              style={{
                fontFamily: 'var(--font-arcade)',
                fontSize: '0.65rem',
                padding: '0.4rem 0.75rem',
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'arcade' ? 'var(--yellow-neon)' : 'transparent',
                color: viewMode === 'arcade' ? '#000' : 'var(--yellow-neon)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Gamepad2 size={12} />
              ARCADE
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleMode('dossier');
              }}
              style={{
                fontFamily: 'var(--font-arcade)',
                fontSize: '0.65rem',
                padding: '0.4rem 0.75rem',
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'dossier' ? 'var(--yellow-neon)' : 'transparent',
                color: viewMode === 'dossier' ? '#000' : 'var(--yellow-neon)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="View all portfolio sections directly without playing"
            >
              <FileText size={12} />
              DOSSIER
            </button>
          </div>

          {/* CRT Scanline Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleCrt();
            }}
            className="pixel-btn-outline"
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.65rem' }}
            title="Toggle Retro CRT Scanlines"
          >
            <Monitor size={13} />
            CRT: {crtActive ? 'ON' : 'OFF'}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className="pixel-btn-outline"
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.65rem' }}
            title="Toggle 8-Bit Audio Synth"
          >
            {isMuted ? <VolumeX size={13} color="var(--red-neon)" /> : <Volume2 size={13} color="var(--yellow-neon)" />}
            SFX: {isMuted ? 'MUTE' : 'ON'}
          </button>
        </div>
      </div>
    </header>
  );
};
