import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

interface ModernNavbarProps {
  onOpenArcade: () => void;
}

export const ModernNavbar: React.FC<ModernNavbarProps> = ({ onOpenArcade }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
        background: scrolled ? 'rgba(13, 13, 17, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #22222a' : '1px solid transparent',
        padding: '0.9rem 0'
      }}
    >
      <div className="modern-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo: KasaV */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--m-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#09090b',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.02em'
            }}
          >
            K
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              KasaV<span style={{ color: 'var(--m-yellow)' }}>.</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--m-text-muted)', fontWeight: 500 }}>
              Satria Fitra &bull; Web &amp; UI
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '1.75rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                color: 'var(--m-text-sub)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--m-text-sub)')}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right Action: Game Launch Button (Clean, Non-overwhelming) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onOpenArcade}
            className="modern-btn-game"
            title="Buka Game Flappy Dev (Mode Pixel)"
          >
            <Gamepad2 size={16} />
            <span>Arcade: Flappy Dev</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              padding: '0.4rem'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#121217',
            borderBottom: '1px solid #23232b',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.925rem',
                fontWeight: 500
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* Responsive Rules */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
