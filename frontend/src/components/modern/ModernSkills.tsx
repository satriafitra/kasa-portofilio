import React, { useState } from 'react';
import { Skill } from '../../types';

interface ModernSkillsProps {
  skills: Skill[];
}

export const ModernSkills: React.FC<ModernSkillsProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Semua' },
    { id: 'DESIGN', label: 'UI/UX & Desain' },
    { id: 'FRONTEND', label: 'Frontend' },
    { id: 'BACKEND', label: 'Backend & API' },
    { id: 'TOOLS', label: 'Tools & Workflow' }
  ];

  const filteredSkills = activeTab === 'ALL'
    ? skills
    : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" style={{ padding: '5rem 0', borderTop: '1px solid var(--m-border)' }}>
      <div className="modern-container">
        {/* Section Header */}
        <div className="modern-section-header">
          <span className="modern-badge modern-badge-yellow">KEAHLIAN TEKNIS</span>
          <h2>Teknologi &amp; Toolkit Perancangan</h2>
          <p>
            Kombinasi perangkat lunak desain dan bahasa pemrograman yang saya gunakan dalam membangun produk web modern.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                background: activeTab === cat.id ? 'var(--m-yellow)' : 'transparent',
                color: activeTab === cat.id ? '#09090b' : 'var(--m-text-sub)',
                fontWeight: 600,
                fontSize: '0.825rem',
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                border: activeTab === cat.id ? '1px solid var(--m-yellow)' : '1px solid var(--m-border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="modern-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.975rem', fontWeight: 600, color: '#fff' }}>{skill.name}</h3>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--m-yellow)',
                      background: 'rgba(250, 204, 21, 0.08)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    {skill.powerLevel}%
                  </span>
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--m-text-sub)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {skill.description}
                </p>
              </div>

              {/* Clean Minimalist Progress Line */}
              <div
                style={{
                  height: '4px',
                  borderRadius: '2px',
                  background: '#23232b',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${skill.powerLevel}%`,
                    height: '100%',
                    background: 'var(--m-yellow)',
                    borderRadius: '2px'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
