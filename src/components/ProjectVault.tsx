import React from 'react';
import { Project } from '../types';
import { FolderGit2, ExternalLink, Code2, Lock, Gift } from 'lucide-react';
import { soundFx } from '../services/sound';

interface ProjectVaultProps {
  projects: Project[];
  isUnlocked: boolean;
  onForceUnlock?: () => void;
}

export const ProjectVault: React.FC<ProjectVaultProps> = ({ projects, isUnlocked, onForceUnlock }) => {
  return (
    <section id="projects-section" style={{ padding: '3.5rem 0' }}>
      <div className="section-title-wrap">
        <FolderGit2 className="title-icon" />
        <h2>[03] PROJECT VAULT // COMPLETED QUESTS</h2>
        <div className="title-line"></div>
        {!isUnlocked && (
          <span className="pixel-badge" style={{ color: 'var(--red-neon)', borderColor: 'var(--red-neon)' }}>
            <Lock size={12} /> SCORE 12 TO UNLOCK
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
            PROJECT ARCHIVE ENCRYPTED
          </h3>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Flap past 12 pipes in the arcade mini-game to unlock the project vault!
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
              [UNLOCK VAULT // RECRUITER OVERRIDE]
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="pixel-box"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: '#13131b'
              }}
            >
              <div>
                {/* Header: Quest Code & Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-arcade)', fontSize: '0.65rem', color: 'var(--yellow-neon)' }}>
                    {proj.questCode}
                  </span>
                  <span className="pixel-badge" style={{ fontSize: '0.55rem', padding: '2px 6px' }}>
                    {proj.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="neon-yellow"
                  style={{
                    fontSize: '0.95rem',
                    marginBottom: '0.75rem',
                    lineHeight: '1.4'
                  }}
                >
                  {proj.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.8rem', color: '#ccc', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>

                {/* Tech Stack Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#1f1f2c',
                        color: 'var(--yellow-neon)',
                        border: '1px solid #3d3d52',
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.5rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Loot Drop perk */}
                <div
                  style={{
                    background: '#0a0a0f',
                    border: '1px dashed #333346',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.65rem',
                    color: 'var(--green-neon)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-arcade)'
                  }}
                >
                  <Gift size={12} />
                  <span>LOOT: {proj.loot}</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-btn-outline"
                    style={{ flex: 1, fontSize: '0.65rem', padding: '0.5rem', textDecoration: 'none' }}
                  >
                    <Code2 size={12} /> REPO
                  </a>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-btn"
                    style={{ flex: 1, fontSize: '0.65rem', padding: '0.5rem', textDecoration: 'none' }}
                  >
                    <ExternalLink size={12} /> LAUNCH
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
