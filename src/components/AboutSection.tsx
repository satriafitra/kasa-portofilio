import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { User, Shield, Zap, Heart, MapPin, Terminal, Code2, Globe, Mail, MessageSquare, Lock } from 'lucide-react';
import { soundFx } from '../services/sound';

interface AboutSectionProps {
  profile: Profile | null;
  isUnlocked: boolean;
  onForceUnlock?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, isUnlocked, onForceUnlock }) => {
  const [dialogueText, setDialogueText] = useState('');
  const fullDialogue = "SYSTEM BOOT COMPLETED. Greetings, traveler of cyberspace! I am an architect specialized in building high-scale Java Spring Boot distributed engines and reactive, pixel-perfect frontend experiences. Prepare to inspect my tech arsenal.";

  useEffect(() => {
    if (!isUnlocked) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= fullDialogue.length) {
        setDialogueText(fullDialogue.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  if (!profile) return null;

  return (
    <section id="about-section" style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="section-title-wrap">
        <User className="title-icon" />
        <h2>[01] CHARACTER PROFILE // BIO</h2>
        <div className="title-line"></div>
        {!isUnlocked && (
          <span className="pixel-badge" style={{ color: 'var(--red-neon)', borderColor: 'var(--red-neon)' }}>
            <Lock size={12} /> SCORE 3 TO UNLOCK
          </span>
        )}
      </div>

      {!isUnlocked ? (
        <div
          className="pixel-box-dim"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            background: 'rgba(18, 18, 24, 0.7)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <Lock size={36} color="var(--yellow-neon)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--yellow-neon)', marginBottom: '0.5rem', fontSize: '1rem' }}>
            SECTOR ENCRYPTED [FIREWALL ACTIVE]
          </h3>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Dodge 3 server pipes in the Flappy Dev arcade cabinet above to decrypt character dossier!
          </p>
          {onForceUnlock && (
            <button
              onClick={() => {
                soundFx.playUnlock();
                onForceUnlock();
              }}
              className="pixel-btn-outline"
              style={{ fontSize: '0.7rem' }}
            >
              [BYPASS SECURITY // RECRUITER OVERRIDE]
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Column 1: Pixel Avatar & RPG Stat Sheet */}
          <div className="pixel-box" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              {/* 8-Bit Pixel Character Avatar */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  background: '#0a0a0f',
                  border: '3px solid var(--yellow-neon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px var(--yellow-glow)',
                  position: 'relative'
                }}
              >
                {/* SVG Pixel Head Avatar */}
                <svg width="64" height="64" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
                  {/* Hair / Hood */}
                  <rect x="3" y="1" width="10" height="4" fill="#FFE600" />
                  <rect x="2" y="3" width="12" height="4" fill="#14141E" />
                  {/* Face */}
                  <rect x="4" y="5" width="8" height="6" fill="#F0C27B" />
                  {/* Visor / Glasses */}
                  <rect x="4" y="6" width="8" height="2" fill="#FFE600" />
                  <rect x="6" y="6" width="1" height="1" fill="#000" />
                  <rect x="10" y="6" width="1" height="1" fill="#000" />
                  {/* Cyber collar */}
                  <rect x="3" y="11" width="10" height="4" fill="#FFE600" />
                  <rect x="5" y="12" width="6" height="3" fill="#14141E" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-6px',
                    background: 'var(--green-neon)',
                    color: '#000',
                    fontFamily: 'var(--font-arcade)',
                    fontSize: '0.55rem',
                    padding: '2px 4px',
                    fontWeight: 'bold'
                  }}
                >
                  LVL {profile.level}
                </span>
              </div>

              <div>
                <h3 className="neon-yellow" style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                  {profile.name}
                </h3>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-arcade)', marginBottom: '0.4rem' }}>
                  {profile.characterClass}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#999', fontSize: '0.75rem' }}>
                  <MapPin size={12} color="var(--yellow-neon)" />
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Stat Bars: HP, MP, XP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-arcade)', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--green-neon)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={12} /> HP (HEALTH)
                  </span>
                  <span>{profile.hp} / {profile.maxHp}</span>
                </div>
                <div className="pixel-bar-track">
                  <div className="pixel-bar-fill pixel-bar-hp" style={{ width: `${(profile.hp / profile.maxHp) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-arcade)', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--yellow-neon)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={12} /> MP (MANA / FOCUS)
                  </span>
                  <span>{profile.mp} / {profile.maxMp}</span>
                </div>
                <div className="pixel-bar-track">
                  <div className="pixel-bar-fill" style={{ width: `${(profile.mp / profile.maxMp) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-arcade)', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Shield size={12} /> XP (EXP POINTS)
                  </span>
                  <span>{profile.xp} / {profile.nextLevelXp}</span>
                </div>
                <div className="pixel-bar-track">
                  <div className="pixel-bar-fill" style={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Status & Specialty */}
            <div style={{ borderTop: '2px solid #282836', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: '#888' }}>CURRENT STATUS:</span>
                <span style={{ color: 'var(--green-neon)', fontWeight: 'bold' }}>{profile.status}</span>
              </div>
              <div style={{ fontSize: '0.75rem' }}>
                <span style={{ color: '#888' }}>CORE SPECIALTY:</span>
                <div style={{ color: 'var(--yellow-neon)', marginTop: '0.2rem' }}>{profile.specialty}</div>
              </div>
            </div>
          </div>

          {/* Column 2: Dialogue Box & Equipped Inventory */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 8-Bit Terminal Dialogue Box */}
            <div className="pixel-box" style={{ padding: '1.25rem', background: '#0e0e14', flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '0.7rem',
                  color: 'var(--yellow-neon)',
                  borderBottom: '2px solid #2a2a38',
                  paddingBottom: '0.5rem',
                  marginBottom: '0.75rem'
                }}
              >
                <Terminal size={14} /> DEVLOG // TRANSMISSION
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '1.25rem',
                  color: '#eee',
                  lineHeight: '1.5',
                  minHeight: '100px'
                }}
              >
                "{dialogueText}"
                <span className="blink-cursor"></span>
              </div>
            </div>

            {/* Inventory / Equipment Slots */}
            <div className="pixel-box" style={{ padding: '1.25rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '0.7rem',
                  color: 'var(--yellow-neon)',
                  marginBottom: '0.75rem'
                }}
              >
                EQUIPPED ARTIFACTS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                {profile.inventory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#14141e',
                      border: '1px solid #333346',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#ddd'
                    }}
                  >
                    <span style={{ color: 'var(--yellow-neon)' }}>✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Signal Transceivers */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline"
                style={{ fontSize: '0.7rem', textDecoration: 'none' }}
              >
                <Code2 size={14} /> GITHUB
              </a>
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline"
                style={{ fontSize: '0.7rem', textDecoration: 'none' }}
              >
                <Globe size={14} /> LINKEDIN
              </a>
              <a
                href={`mailto:${profile.socialLinks.email}`}
                className="pixel-btn-outline"
                style={{ fontSize: '0.7rem', textDecoration: 'none' }}
              >
                <Mail size={14} /> EMAIL
              </a>
              <div
                className="pixel-badge"
                style={{ fontSize: '0.7rem', padding: '0.6rem 0.9rem' }}
              >
                <MessageSquare size={14} /> {profile.socialLinks.discord}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
