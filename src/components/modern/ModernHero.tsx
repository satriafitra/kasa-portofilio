import React from 'react';
import { ArrowDown, Gamepad2, ArrowRight } from 'lucide-react';

interface ModernHeroProps {
  onOpenArcade: () => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ onOpenArcade }) => {
  return (
    <section
      style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        position: 'relative'
      }}
    >
      <div className="modern-container">
        {/* Availability Badge - Clean, Subtle */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="modern-badge">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            <span>Tersedia untuk proyek Web Development &amp; UI Design</span>
          </div>
        </div>

        {/* Main Title - Clean, Sharp, No Fuzzy Glows */}
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            maxWidth: '920px',
            color: '#fff'
          }}
        >
          Membangun produk web dengan <span className="text-yellow">kode presisi</span> dan estetika visual.
        </h1>

        {/* Subtitle - Authentic Satria Fitra (KasaV) context */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--m-text-sub)',
            maxWidth: '740px',
            lineHeight: 1.7,
            marginBottom: '2.5rem'
          }}
        >
          Halo, saya <strong>Satria Fitra</strong> (dikenal secara online sebagai <strong>KasaV</strong>). Saya seorang <strong>Web Developer &amp; UI Designer</strong> yang berfokus menciptakan antarmuka digital yang bersih, terstruktur, dan mudah digunakan—didukung oleh teknologi frontend modern <strong>React &amp; TypeScript</strong> serta backend <strong>Java Spring Boot</strong>.
        </p>

        {/* Action Buttons - Clean & Restrained */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '3.5rem' }}>
          <button
            onClick={() => {
              const el = document.getElementById('projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="modern-btn-primary"
          >
            <span>Lihat Portofolio</span>
            <ArrowDown size={16} />
          </button>

          <button
            onClick={onOpenArcade}
            className="modern-btn-game"
          >
            <Gamepad2 size={16} />
            <span>Mode Game: Flappy Dev</span>
          </button>

          <a
            href="#contact"
            style={{
              color: 'var(--m-text-sub)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              paddingLeft: '0.5rem',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--m-text-sub)')}
          >
            <span>Hubungi Saya</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Highlights Bar - Clean & Informative */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            borderTop: '1px solid var(--m-border)',
            paddingTop: '2rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--m-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Peran &amp; Disiplin
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '0.3rem' }}>
              Web Developer &amp; UI Designer
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--m-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Frontend &amp; Desain
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '0.3rem' }}>
              React, TypeScript, Figma
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--m-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Backend &amp; Arsitektur
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '0.3rem' }}>
              Java 25, Spring Boot 3, SQL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
