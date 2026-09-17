import React from 'react';
import { SystemStats } from '../../types';
import { ChevronUp, Gamepad2 } from 'lucide-react';

interface ModernFooterProps {
  stats: SystemStats | null;
  onOpenArcade: () => void;
}

export const ModernFooter: React.FC<ModernFooterProps> = ({ stats, onOpenArcade }) => {
  return (
    <footer
      style={{
        background: '#09090c',
        borderTop: '1px solid var(--m-border)',
        padding: '2.5rem 0',
        color: 'var(--m-text-muted)'
      }}
    >
      <div className="modern-container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                KasaV<span style={{ color: 'var(--m-yellow)' }}>.</span>
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--m-text-muted)' }}>
                &bull; Satria Fitra &bull; Web Developer &amp; UI Designer
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--m-text-sub)' }}>
              Backend: {stats?.systemStatus || 'Java Spring Boot [ONLINE]'} &bull; Frontend: React 19
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={onOpenArcade}
              className="modern-btn-game"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              <Gamepad2 size={15} />
              <span>Buka Game Flappy Dev</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="modern-btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
              title="Kembali ke atas"
            >
              <ChevronUp size={15} />
              <span>Atas</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #1a1a22', fontSize: '0.75rem', color: 'var(--m-text-muted)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>&copy; {new Date().getFullYear()} Satria Fitra (KasaV). Hak cipta dilindungi.</span>
          <span>Desain bersih &bull; Bebas AI-Slop &bull; Kode Terstruktur</span>
        </div>
      </div>
    </footer>
  );
};
