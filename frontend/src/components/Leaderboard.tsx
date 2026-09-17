import React from 'react';
import { ScoreEntry } from '../types';
import { Trophy, RefreshCw, Crown, Award } from 'lucide-react';
import { soundFx } from '../services/sound';

interface LeaderboardProps {
  scores: ScoreEntry[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, isLoading, onRefresh }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="modern-card" style={{ padding: '2rem' }}>
        {/* Leaderboard Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--m-border)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={20} color="var(--m-yellow)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Papan Peringkat Global</h3>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--m-text-sub)', marginTop: '0.2rem' }}>
              Rekor skor Flappy Dev yang tersimpan di database Java Spring Boot.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onRefresh();
            }}
            className="modern-btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            title="Sinkronisasi skor dari server Java"
          >
            <RefreshCw size={14} className={isLoading ? 'spin-icon' : ''} />
            <span>{isLoading ? 'Sinkron...' : 'Perbarui'}</span>
          </button>
        </div>

        {/* Clean Modern Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ color: 'var(--m-text-muted)', borderBottom: '1px solid var(--m-border)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.65rem 0.75rem' }}>Peringkat</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Inisial</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>Karakter</th>
                <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>Koin</th>
                <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>Skor Akhir</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry, index) => {
                const rank = entry.rank || index + 1;
                const isFirst = rank === 1;
                const isTop3 = rank <= 3;

                return (
                  <tr
                    key={entry.id || index}
                    style={{
                      borderBottom: '1px solid #1c1c24',
                      background: isFirst ? 'rgba(250, 204, 21, 0.05)' : 'transparent',
                      color: isFirst ? 'var(--m-yellow)' : '#fff'
                    }}
                  >
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>
                      {rank === 1 && <Crown size={15} color="var(--m-yellow)" style={{ display: 'inline', marginRight: '6px' }} />}
                      {rank === 2 && <Award size={15} color="#e2e8f0" style={{ display: 'inline', marginRight: '6px' }} />}
                      {rank === 3 && <Award size={15} color="#cd7f32" style={{ display: 'inline', marginRight: '6px' }} />}
                      #{rank}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span
                        style={{
                          background: '#121217',
                          border: `1px solid ${isTop3 ? 'var(--m-yellow)' : 'var(--m-border)'}`,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {entry.playerInitials}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', color: 'var(--m-text-sub)', fontSize: '0.8rem' }}>
                      {entry.characterClass || 'FLAPPER'}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right', color: 'var(--m-yellow)', fontWeight: 600 }}>
                      🪙 {entry.coins}
                    </td>
                    <td
                      style={{
                        padding: '0.85rem 0.75rem',
                        textAlign: 'right',
                        fontSize: '0.925rem',
                        fontWeight: 700,
                        color: isFirst ? 'var(--m-yellow)' : '#fff'
                      }}
                    >
                      {entry.score.toLocaleString()} PTS
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--m-text-muted)' }}>
          Mainkan game Flappy Dev di atas untuk memasukkan 3 huruf inisial Anda ke papan peringkat!
        </div>
      </div>
    </div>
  );
};
