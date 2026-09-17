import React, { useState } from 'react';
import { ContactMessage } from '../../types';
import { Send, CheckCircle2 } from 'lucide-react';

interface ModernContactProps {
  messages: ContactMessage[];
  onSubmitMessage: (msg: ContactMessage) => Promise<boolean>;
}

export const ModernContact: React.FC<ModernContactProps> = ({ messages, onSubmitMessage }) => {
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSuccessStatus(null);

    const success = await onSubmitMessage({
      senderName,
      email,
      message
    });

    if (success) {
      setSuccessStatus("Pesan Anda telah berhasil terkirim ke server!");
      setSenderName('');
      setEmail('');
      setMessage('');
    } else {
      setSuccessStatus("Gagal mengirim pesan. Silakan coba lagi.");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" style={{ padding: '5rem 0', borderTop: '1px solid var(--m-border)' }}>
      <div className="modern-container">
        {/* Section Header */}
        <div className="modern-section-header">
          <span className="modern-badge modern-badge-yellow">KONTAK</span>
          <h2>Mulai Diskusi &amp; Kolaborasi</h2>
          <p>
            Punya penawaran proyek, ingin berdiskusi seputar desain dan pengembangan web, atau ingin merekrut? Kirimkan pesan di bawah ini.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Form Card */}
          <div className="modern-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>
              Kirim Pesan Langsung
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Nama Anda atau Perusahaan"
                  style={{
                    width: '100%',
                    background: '#121217',
                    border: '1px solid var(--m-border)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--m-yellow)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--m-border)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  style={{
                    width: '100%',
                    background: '#121217',
                    border: '1px solid var(--m-border)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--m-yellow)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--m-border)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Pesan
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pesan atau kebutuhan proyek Anda..."
                  style={{
                    width: '100%',
                    background: '#121217',
                    border: '1px solid var(--m-border)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--m-yellow)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--m-border)')}
                />
              </div>

              {successStatus && (
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    borderRadius: '6px',
                    color: '#22c55e',
                    fontSize: '0.825rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{successStatus}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="modern-btn-primary"
                style={{ justifyContent: 'center', marginTop: '0.25rem' }}
              >
                <Send size={15} />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
              </button>
            </form>
          </div>

          {/* Right: Info & Guestbook */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="modern-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.85rem' }}>
                Koneksi Cepat
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--m-border)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Email</span>
                  <a href="mailto:satria.fitra@kasav.dev" style={{ color: 'var(--m-yellow)', textDecoration: 'none', fontWeight: 500 }}>
                    satria.fitra@kasav.dev
                  </a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                  <span style={{ color: 'var(--m-text-muted)' }}>Lokasi</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>Indonesia / Remote</span>
                </div>
              </div>
            </div>

            {/* Guestbook list */}
            <div className="modern-card" style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                Buku Tamu / Transmisi Pesan
              </h4>

              <div style={{ flex: 1, overflowY: 'auto', maxHeight: '220px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {messages.length === 0 ? (
                  <div style={{ color: 'var(--m-text-muted)', fontSize: '0.825rem' }}>Belum ada pesan. Jadilah yang pertama mengirim!</div>
                ) : (
                  messages.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      style={{
                        background: '#121217',
                        borderRadius: '6px',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid var(--m-border)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--m-yellow)' }}>{item.senderName}</span>
                        <span style={{ color: 'var(--m-text-muted)' }}>
                          {item.sentAt ? new Date(item.sentAt).toLocaleTimeString() : 'Terkirim'}
                        </span>
                      </div>
                      <p style={{ color: 'var(--m-text-sub)', fontSize: '0.825rem', lineHeight: 1.4 }}>
                        "{item.message}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
