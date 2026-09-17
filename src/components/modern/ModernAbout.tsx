import React from 'react';
import { Profile } from '../../types';
import { OpenStreetMapCard } from './OpenStreetMapCard';

interface ModernAboutProps {
  profile: Profile | null;
  onOpenArcade: () => void;
}

export const ModernAbout: React.FC<ModernAboutProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <section id="about" style={{ padding: '5rem 0', borderTop: '1px solid var(--m-border)' }}>
      <div className="modern-container">
        {/* Section Header */}
        <div className="modern-section-header">
          <span className="modern-badge modern-badge-yellow">TENTANG SAYA</span>
          <h2>Menghubungkan Desain Visual dan Rekayasa Kode</h2>
          <p>
            Antarmuka yang baik berakar pada harmoni antara estetika tata letak dan keandalan sistem di baliknya.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Left: Bio & Philosophy */}
          <div className="modern-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
              Satria Fitra &bull; KasaV
            </h3>

            <p style={{ color: 'var(--m-text-sub)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Sebagai <strong>Web Developer dan UI Designer</strong>, saya mendampingi siklus produk dari perancangan antarmuka pengguna di <strong>Figma</strong> hingga implementasi kode modular berbasis <strong>React</strong> dan <strong>TypeScript</strong>.
            </p>

            <p style={{ color: 'var(--m-text-sub)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              Untuk lapisan backend, saya mengandalkan <strong>Java Spring Boot</strong> guna mengelola logika bisnis yang membutuhkan stabilitas tinggi, transaksi database relasional, dan integrasi REST API yang aman.
            </p>

            {/* Principles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderTop: '1px solid var(--m-border)', paddingTop: '1.5rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--m-yellow)', fontWeight: 700 }}>01.</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Desain yang Bertujuan (Purpose-Driven UI)</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--m-text-sub)', marginTop: '0.2rem' }}>
                    Mengutamakan keterbacaan tipografi, hierarki visual yang jelas, dan navigasi tanpa hambatan.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--m-yellow)', fontWeight: 700 }}>02.</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Kode yang Rapi dan Modular</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--m-text-sub)', marginTop: '0.2rem' }}>
                    Menyusun komponen UI yang reusable, type-safe dengan TypeScript, dan terintegrasi mulus dengan backend.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links - Clean text buttons, no unnecessary icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="modern-btn-outline"
                style={{ padding: '0.45rem 1rem', fontSize: '0.825rem' }}
              >
                GitHub ↗
              </a>
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="modern-btn-outline"
                style={{ padding: '0.45rem 1rem', fontSize: '0.825rem' }}
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${profile.socialLinks.email}`}
                className="modern-btn-outline"
                style={{ padding: '0.45rem 1rem', fontSize: '0.825rem' }}
              >
                Email
              </a>
            </div>
          </div>

          {/* Right: Technical Spec & Interactive Location Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Spec Card */}
            <div className="modern-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>
                Ringkasan Profil
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--m-border)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Nama Lengkap</span>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{profile.name}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--m-border)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Nama Panggilan / Brand</span>
                  <span style={{ fontWeight: 700, color: 'var(--m-yellow)' }}>KasaV</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--m-border)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Fokus Utama</span>
                  <span style={{ fontWeight: 600, color: '#fff' }}>Web Developer &amp; UI Designer</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--m-border)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Lokasi Kerja</span>
                  <span style={{ fontWeight: 500, color: '#fff' }}>Cianjur, Indonesia (Remote)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Status Ketersediaan</span>
                  <span style={{ fontWeight: 600, color: '#22c55e' }}>{profile.status}</span>
                </div>
              </div>
            </div>

            {/* Interactive OpenStreetMap Card */}
            <OpenStreetMapCard />
          </div>
        </div>
      </div>
    </section>
  );
};
