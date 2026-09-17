import React from 'react';
import { Project } from '../../types';

interface ModernProjectsProps {
  projects: Project[];
}

export const ModernProjects: React.FC<ModernProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" style={{ padding: '5rem 0', borderTop: '1px solid var(--m-border)' }}>
      <div className="modern-container">
        {/* Section Header */}
        <div className="modern-section-header">
          <span className="modern-badge modern-badge-yellow">PROYEK TERPILIH</span>
          <h2>Koleksi Portofolio &amp; Studi Kasus</h2>
          <p>
            Rangkuman proyek yang merefleksikan keahlian saya dalam perancangan antarmuka pengguna dan implementasi web fullstack.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="modern-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Top Label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--m-yellow)' }}>
                    {proj.questCode}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--m-text-muted)',
                      border: '1px solid var(--m-border)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {proj.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.65rem', lineHeight: 1.3 }}>
                  {proj.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.875rem', color: 'var(--m-text-sub)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>

                {/* Tech Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#14141a',
                        color: 'var(--m-text-main)',
                        border: '1px solid var(--m-border)',
                        fontSize: '0.725rem',
                        fontWeight: 500,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Clean text buttons */}
              <div style={{ display: 'flex', gap: '0.65rem', borderTop: '1px solid var(--m-border)', paddingTop: '1rem' }}>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="modern-btn-outline"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.825rem', padding: '0.55rem' }}
                >
                  GitHub ↗
                </a>
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="modern-btn-primary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.825rem', padding: '0.55rem' }}
                >
                  Lihat Demo ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
