import React from 'react';
import kasaProfileImg from '../../assets/kasaprofile.png';
import { soundFx } from '../../services/sound';

interface ModernHeroProps {
  onOpenArcade: () => void;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ onOpenArcade }) => {
  return (
    <section
      style={{
        paddingTop: '7.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
      }}
    >
      <div className="modern-container">
        {/* Two-column layout: Bespoke asymmetrical geometric layout */}
        <div className="hero-grid-layout">
          {/* Left Column: Greeting, Title, Subtitle, CTAs, Bento Deck */}
          <div className="hero-content-col">
            {/* Main Greeting / Headline: Bold, Architectural Typography (Solid, Clean, No Glow) */}
            <h1 className="hero-custom-headline">
              <span className="headline-greet">Hi Bro,</span>
              <span className="headline-name">
                Saya <span className="highlight-kasa">Satria</span>
              </span>
            </h1>

            {/* Subtitle: Sederhana, natural, bebas AI-slop */}
            <p className="hero-custom-subtitle">
              Web Developer &amp; UI Designer yang fokus merancang website modern yang bersih, fungsional, dan terstruktur.
            </p>

            {/* Action Buttons: Clean text-first buttons (no icon clutter) */}
            <div className="hero-action-row">
              <button
                onClick={() => {
                  soundFx.playClick();
                  const el = document.getElementById('projects');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bespoke-btn-primary"
              >
                Lihat Portofolio
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenArcade();
                }}
                className="bespoke-btn-arcade"
              >
                Flappy Dev
              </button>

              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="bespoke-btn-ghost"
              >
                Hubungi Saya &rarr;
              </a>
            </div>

            {/* Tech Highlights: Floating Modular Bento Deck */}
            <div className="hero-tech-deck">
              <div className="tech-deck-item">
                <div className="deck-label">FOKUS UTAMA</div>
                <div className="deck-val">Web Dev &amp; UI Design</div>
              </div>

              <div className="deck-divider" />

              <div className="tech-deck-item">
                <div className="deck-label">FRONTEND</div>
                <div className="deck-val">React &bull; TypeScript</div>
              </div>

              <div className="deck-divider" />

              <div className="tech-deck-item">
                <div className="deck-label">BACKEND</div>
                <div className="deck-val">Java Spring Boot</div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Non-Template Architectural Photo Card */}
          <div className="hero-photo-col">
            <div className="hero-bespoke-card">
              {/* Integrated Top Dock Bar */}
              <div className="card-top-dock">
                <div className="card-dock-meta">
                  <span className="dock-dot" />
                  <span>Satria Fitra</span>
                </div>
                <span className="card-dock-tag">@kasav</span>
              </div>

              {/* Photo Frame with subtle gradient integration */}
              <div className="card-photo-viewport">
                <img
                  src={kasaProfileImg}
                  alt="Satria Fitra - Kasa Profile"
                  className="card-profile-photo"
                />
                <div className="card-photo-gradient-blend" />
              </div>

              {/* Integrated Bottom Dock Info */}
              <div className="card-bottom-dock">
                <div className="card-name-title">Web Developer &amp; UI Designer</div>
                <div className="card-spec-tag">Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped Bespoke Styling - Architectural, Pure Solid Typography, Zero AI-Slop */}
      <style>{`
        .hero-grid-layout {
          display: grid;
          grid-template-columns: 1.18fr 0.95fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 990px) {
          .hero-grid-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-photo-col {
            order: -1;
            display: flex;
            justify-content: center;
          }
        }

        .hero-photo-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* 1. Headline & Typography - Solid, Crisp, Zero Glow */
        .hero-custom-headline {
          font-size: clamp(2.8rem, 5.6vw, 4.4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin-bottom: 1.25rem;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
        }

        .highlight-kasa {
          color: var(--m-yellow);
          display: inline-block;
        }

        .hero-custom-subtitle {
          font-size: clamp(1rem, 1.7vw, 1.125rem);
          color: var(--m-text-sub);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 2.25rem;
        }

        /* 2. Action Buttons - Asymmetrical Custom Geometry without Icon Clutter */
        .hero-action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        .bespoke-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--m-yellow);
          color: #0b0b10;
          font-family: inherit;
          font-size: 0.925rem;
          font-weight: 700;
          padding: 0.78rem 1.65rem;
          border-radius: 12px 4px 12px 4px;
          border: none;
          cursor: pointer;
          transition: transform 0.22s ease, background-color 0.22s ease;
        }

        .bespoke-btn-primary:hover {
          transform: translateY(-2px);
          background: #fde047;
        }

        .bespoke-btn-arcade {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(22, 22, 30, 0.7);
          color: var(--m-yellow);
          font-family: inherit;
          font-size: 0.925rem;
          font-weight: 600;
          padding: 0.78rem 1.45rem;
          border-radius: 4px 12px 4px 12px;
          border: 1px solid rgba(250, 204, 21, 0.3);
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: transform 0.22s ease, border-color 0.22s ease, background-color 0.22s ease;
        }

        .bespoke-btn-arcade:hover {
          transform: translateY(-2px);
          background: rgba(250, 204, 21, 0.12);
          border-color: var(--m-yellow);
        }

        .bespoke-btn-ghost {
          display: inline-flex;
          align-items: center;
          color: var(--m-text-sub);
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          transition: color 0.18s ease, transform 0.18s ease;
        }

        .bespoke-btn-ghost:hover {
          color: #fff;
          transform: translateX(3px);
        }

        /* 3. Tech Deck - Floating Bento Capsule */
        .hero-tech-deck {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          background: rgba(18, 18, 25, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px 6px 18px 6px;
          padding: 1rem 1.4rem;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          max-width: 580px;
          transition: border-color 0.25s ease;
        }

        .hero-tech-deck:hover {
          border-color: rgba(250, 204, 21, 0.25);
        }

        .tech-deck-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .deck-label {
          font-size: 0.68rem;
          color: var(--m-text-muted);
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .deck-val {
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
        }

        .deck-divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.08);
          margin: 0 0.85rem;
        }

        @media (max-width: 600px) {
          .hero-tech-deck {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.25rem;
            border-radius: 14px;
          }
          .deck-divider {
            display: none;
          }
        }

        /* 4. Architectural Photo Card */
        .hero-bespoke-card {
          position: relative;
          width: 100%;
          max-width: 430px;
          border-radius: 36px 10px 36px 10px;
          background: linear-gradient(165deg, rgba(22, 22, 30, 0.88) 0%, rgba(12, 12, 18, 0.96) 100%);
          border: 1px solid rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.8);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        .hero-bespoke-card:hover {
          transform: translateY(-5px);
          border-color: rgba(250, 204, 21, 0.35);
        }

        /* Integrated Top Dock */
        .card-top-dock {
          padding: 0.85rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(14, 14, 20, 0.4);
        }

        .card-dock-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .dock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--m-yellow);
        }

        .card-dock-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--m-yellow);
          background: rgba(250, 204, 21, 0.08);
          padding: 0.2rem 0.55rem;
          border-radius: 5px;
          border: 1px solid rgba(250, 204, 21, 0.2);
          letter-spacing: 0.02em;
        }

        /* Photo Viewport */
        .card-photo-viewport {
          position: relative;
          width: 100%;
          height: 440px;
          overflow: hidden;
          background: #0d0d12;
        }

        .card-profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 15%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }

        .hero-bespoke-card:hover .card-profile-photo {
          transform: scale(1.035);
        }

        .card-photo-gradient-blend {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 72%,
            rgba(12, 12, 18, 0.9) 95%,
            rgba(12, 12, 18, 1) 100%
          );
          pointer-events: none;
        }

        /* Integrated Bottom Dock */
        .card-bottom-dock {
          padding: 1.15rem 1.4rem;
          background: rgba(12, 12, 18, 0.95);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .card-name-title {
          font-weight: 600;
          color: #fff;
          font-size: 0.925rem;
          letter-spacing: -0.01em;
        }

        .card-spec-tag {
          font-size: 0.75rem;
          color: var(--m-text-muted);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};
