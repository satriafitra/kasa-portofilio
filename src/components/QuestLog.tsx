import React from 'react';
import { Experience } from '../types';
import { Map, ShieldCheck, Lock, Calendar, MapPin } from 'lucide-react';
import { soundFx } from '../services/sound';

interface QuestLogProps {
  experiences: Experience[];
  isUnlocked: boolean;
  onForceUnlock?: () => void;
}

export const QuestLog: React.FC<QuestLogProps> = ({ experiences, isUnlocked, onForceUnlock }) => {
  return (
    <section id="experience-section" style={{ padding: '3.5rem 0' }}>
      <div className="section-title-wrap">
        <Map className="title-icon" />
        <h2>[04] DUNGEON QUEST LOG // CAREER EXP</h2>
        <div className="title-line"></div>
        {!isUnlocked && (
          <span className="pixel-badge" style={{ color: 'var(--red-neon)', borderColor: 'var(--red-neon)' }}>
            <Lock size={12} /> SCORE 18 TO UNLOCK
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
            EXPEDITION RECORDS SEALED
          </h3>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Reach a score of 18 in Flappy Dev to unseal the career dungeon map!
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
              [UNSEAL DUNGEON LOG // RECRUITER OVERRIDE]
            </button>
          )}
        </div>
      ) : (
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical Glowing Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '9px',
              width: '3px',
              background: 'repeating-linear-gradient(to bottom, var(--yellow-neon) 0, var(--yellow-neon) 8px, transparent 8px, transparent 16px)'
            }}
          ></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} style={{ position: 'relative' }}>
                {/* Node Diamond */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '1.25rem',
                    width: '18px',
                    height: '18px',
                    background: 'var(--yellow-neon)',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    boxShadow: '0 0 10px var(--yellow-glow)',
                    zIndex: 2
                  }}
                ></div>

                {/* Card */}
                <div className="pixel-box" style={{ padding: '1.5rem', background: '#12121a' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <span className="pixel-badge" style={{ fontSize: '0.6rem', marginBottom: '0.4rem' }}>
                        {exp.questType}
                      </span>
                      <h3 className="neon-yellow" style={{ fontSize: '1rem', marginTop: '0.35rem' }}>
                        {exp.role}
                      </h3>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        @ {exp.guildOrCompany}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem', fontSize: '0.75rem', color: '#999' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={12} color="var(--yellow-neon)" />
                        {exp.period}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={12} color="var(--yellow-neon)" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Duties list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.duties.map((duty, dIdx) => (
                      <li key={dIdx} style={{ fontSize: '0.8rem', color: '#ccc', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--yellow-neon)', fontFamily: 'var(--font-arcade)', fontSize: '0.65rem', marginTop: '2px' }}>►</span>
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Artifacts */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', borderTop: '1px dashed #2a2a38', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#777', fontFamily: 'var(--font-arcade)', alignSelf: 'center', marginRight: '0.4rem' }}>
                      ARTIFACTS:
                    </span>
                    {exp.techArtifacts.map((art, aIdx) => (
                      <span
                        key={aIdx}
                        style={{
                          background: '#1d1d28',
                          color: '#fff',
                          border: '1px solid #3d3d52',
                          fontSize: '0.65rem',
                          padding: '0.15rem 0.45rem'
                        }}
                      >
                        {art}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
