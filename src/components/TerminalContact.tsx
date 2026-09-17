import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { Terminal, Send, CheckCircle2, MessageSquareText } from 'lucide-react';
import { soundFx } from '../services/sound';

interface TerminalContactProps {
  messages: ContactMessage[];
  onSubmitMessage: (msg: ContactMessage) => Promise<boolean>;
}

export const TerminalContact: React.FC<TerminalContactProps> = ({ messages, onSubmitMessage }) => {
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
      soundFx.playUnlock();
      setSuccessStatus("TRANSMISSION DISPATCHED TO JAVA SPRING BE! STATUS: 201 CREATED");
      setSenderName('');
      setEmail('');
      setMessage('');
    } else {
      soundFx.playHit();
      setSuccessStatus("ERROR: TRANSMISSION FAILED TO REACH MAINFRAME");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact-section" style={{ padding: '3.5rem 0' }}>
      <div className="section-title-wrap">
        <Terminal className="title-icon" />
        <h2>[06] ARCADETERMINAL // TRANSMISSION DISPATCH</h2>
        <div className="title-line"></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Terminal Input Form */}
        <div
          className="pixel-box"
          style={{
            background: '#0a0a0f',
            border: '3px solid var(--yellow-neon)',
            padding: '1.5rem'
          }}
        >
          {/* Terminal Title Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#161622',
              margin: '-1.5rem -1.5rem 1.25rem -1.5rem',
              padding: '0.5rem 1rem',
              borderBottom: '2px solid #2a2a38',
              fontFamily: 'var(--font-arcade)',
              fontSize: '0.65rem',
              color: 'var(--yellow-neon)'
            }}
          >
            <div>COMM_CHANNEL://PORT_8080/API/CONTACT</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', background: '#ff0055', display: 'inline-block' }}></span>
              <span style={{ width: '8px', height: '8px', background: '#ffe600', display: 'inline-block' }}></span>
              <span style={{ width: '8px', height: '8px', background: '#39ff14', display: 'inline-block' }}></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '0.65rem',
                  color: 'var(--yellow-neon)',
                  marginBottom: '0.4rem'
                }}
              >
                CALLSIGN / SENDER NAME:
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. RECRUITER_CORP"
                style={{
                  width: '100%',
                  background: '#12121c',
                  border: '2px solid #333348',
                  padding: '0.6rem 0.8rem',
                  color: '#fff',
                  fontFamily: 'var(--font-silkscreen)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--yellow-neon)')}
                onBlur={(e) => (e.target.style.borderColor = '#333348')}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '0.65rem',
                  color: 'var(--yellow-neon)',
                  marginBottom: '0.4rem'
                }}
              >
                RETURN FREQUENCY (EMAIL):
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. talent@futurecorp.tech"
                style={{
                  width: '100%',
                  background: '#12121c',
                  border: '2px solid #333348',
                  padding: '0.6rem 0.8rem',
                  color: '#fff',
                  fontFamily: 'var(--font-silkscreen)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--yellow-neon)')}
                onBlur={(e) => (e.target.style.borderColor = '#333348')}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '0.65rem',
                  color: 'var(--yellow-neon)',
                  marginBottom: '0.4rem'
                }}
              >
                TRANSMISSION PAYLOAD (MESSAGE):
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your quest proposal, feedback, or greeting..."
                style={{
                  width: '100%',
                  background: '#12121c',
                  border: '2px solid #333348',
                  padding: '0.6rem 0.8rem',
                  color: '#fff',
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '1.15rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--yellow-neon)')}
                onBlur={(e) => (e.target.style.borderColor = '#333348')}
              />
            </div>

            {successStatus && (
              <div
                style={{
                  padding: '0.6rem',
                  background: '#0d1f12',
                  border: '1px solid var(--green-neon)',
                  color: 'var(--green-neon)',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-arcade)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <CheckCircle2 size={14} />
                {successStatus}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="pixel-btn"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Send size={14} />
              {isSubmitting ? 'DISPATCHING...' : 'BROADCAST TO JAVA BE'}
            </button>
          </form>
        </div>

        {/* Live Transmission Feed / Guestbook */}
        <div
          className="pixel-box"
          style={{
            background: '#101018',
            border: '2px solid #333348',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-arcade)',
              fontSize: '0.75rem',
              color: 'var(--yellow-neon)',
              borderBottom: '2px solid #2a2a38',
              paddingBottom: '0.75rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <MessageSquareText size={16} /> RECENT TRANSMISSIONS // GUESTBOOK
          </div>

          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '380px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.length === 0 ? (
              <div style={{ color: '#777', fontSize: '0.8rem', textAlign: 'center', margin: 'auto' }}>
                No transmissions logged yet. Be the first to broadcast!
              </div>
            ) : (
              messages.map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    background: '#151520',
                    border: '1px solid #2c2c3d',
                    padding: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                    <span style={{ color: 'var(--yellow-neon)', fontFamily: 'var(--font-arcade)' }}>
                      @{item.senderName}
                    </span>
                    <span style={{ color: '#777' }}>
                      {item.sentAt ? new Date(item.sentAt).toLocaleTimeString() : 'RECENT'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#ccc', fontFamily: 'var(--font-terminal)', lineHeight: 1.4 }}>
                    "{item.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
