import React from 'react';
import { Experience } from '../../types';

interface ModernExperienceProps {
  experiences: Experience[];
}

export const ModernExperience: React.FC<ModernExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" style={{ padding: '5rem 0', borderTop: '1px solid var(--m-border)' }}>
      <div className="modern-container">
        {/* Section Header */}
        <div className="modern-section-header">
          <span className="modern-badge modern-badge-yellow">PENGALAMAN KARIER</span>
          <h2>Rekam Jejak &amp; Kontribusi</h2>
          <p>
            Pengalaman dalam merancang antarmuka produk digital dan berkolaborasi mengembangkan aplikasi web berskala produksi.
          </p>
        </div>

        {/* Minimalist Timeline */}
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="modern-card"
              style={{ padding: '2rem' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{exp.role}</h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--m-yellow)', fontWeight: 600, marginTop: '0.15rem' }}>
                    {exp.guildOrCompany}
                  </div>
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--m-text-muted)', fontWeight: 500 }}>
                  {exp.period} &bull; {exp.location}
                </span>
              </div>

              {/* Duties */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {exp.duties.map((duty, dIdx) => (
                  <li key={dIdx} style={{ fontSize: '0.875rem', color: 'var(--m-text-sub)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--m-yellow)', marginTop: '2px' }}>–</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', borderTop: '1px solid var(--m-border)', paddingTop: '0.85rem' }}>
                {exp.techArtifacts.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      background: '#121217',
                      color: 'var(--m-text-sub)',
                      border: '1px solid var(--m-border)',
                      fontSize: '0.725rem',
                      fontWeight: 500,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
