import React, { useState } from 'react';
import { Skill } from '../types';
import { Cpu, Lock, Sparkles, Filter } from 'lucide-react';
import { soundFx } from '../services/sound';

interface SkillArsenalProps {
  skills: Skill[];
  isUnlocked: boolean;
  onForceUnlock?: () => void;
}

export const SkillArsenal: React.FC<SkillArsenalProps> = ({ skills, isUnlocked, onForceUnlock }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'BACKEND', 'FRONTEND', 'DATABASE', 'DEVOPS'];

  const filteredSkills = activeCategory === 'ALL'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills-section" style={{ padding: '3.5rem 0' }}>
      <div className="section-title-wrap">
        <Cpu className="title-icon" />
        <h2>[02] TECH ARSENAL // SKILLS</h2>
        <div className="title-line"></div>
        {!isUnlocked && (
          <span className="pixel-badge" style={{ color: 'var(--red-neon)', borderColor: 'var(--red-neon)' }}>
            <Lock size={12} /> SCORE 7 TO UNLOCK
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
            ARSENAL LOCKED [RESTRICTED ACCESS]
          </h3>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Reach a score of 7 in Flappy Dev to unlock the developer skill tree!
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
              [DECRYPT ARSENAL // RECRUITER OVERRIDE]
            </button>
          )}
        </div>
      ) : (
        <div>
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat);
                }}
                className={activeCategory === cat ? 'pixel-btn' : 'pixel-btn-outline'}
                style={{ fontSize: '0.65rem', padding: '0.45rem 0.9rem' }}
              >
                {cat === 'ALL' && <Filter size={12} />}
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' }}>
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="pixel-box-dim"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'transform 0.15s ease'
                }}
              >
                {/* Header: Icon, Name, Rank */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{skill.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '0.85rem', color: '#fff' }}>{skill.name}</h3>
                      <span style={{ fontSize: '0.65rem', color: '#888' }}>{skill.category}</span>
                    </div>
                  </div>
                  <span
                    className={`pixel-badge ${skill.rank === 'S-RANK' ? '' : 'pixel-badge-green'}`}
                    style={{ fontSize: '0.55rem', padding: '2px 5px' }}
                  >
                    <Sparkles size={10} />
                    {skill.rank}
                  </span>
                </div>

                {/* Power Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontFamily: 'var(--font-arcade)', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#aaa' }}>POWER RATING</span>
                    <span style={{ color: 'var(--yellow-neon)' }}>{skill.powerLevel}%</span>
                  </div>
                  <div className="pixel-bar-track" style={{ height: '12px' }}>
                    <div className="pixel-bar-fill" style={{ width: `${skill.powerLevel}%` }}></div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.75rem', color: '#bbb', lineHeight: '1.4', marginTop: '0.2rem' }}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
