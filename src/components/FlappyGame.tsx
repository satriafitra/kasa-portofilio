import React, { useRef, useEffect, useState, useCallback } from 'react';
import { soundFx } from '../services/sound';
import { Play, RotateCcw, Sparkles, Send, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlappyGameProps {
  onScoreUpdate: (score: number) => void;
  onCoinUpdate: (coins: number) => void;
  onMilestoneUnlock: (milestone: string, score: number) => void;
  onSaveScore: (initials: string, score: number, coins: number) => Promise<void>;
  highScore: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
  hasCoin: boolean;
  coinCollected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  color: string;
}

export const FlappyGame: React.FC<FlappyGameProps> = ({
  onScoreUpdate,
  onCoinUpdate,
  onMilestoneUnlock,
  onSaveScore,
  highScore
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [currentScore, setCurrentScore] = useState(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [playerInitials, setPlayerInitials] = useState('DEV');
  const [submittingScore, setSubmittingScore] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());

  // Constants
  const CANVAS_WIDTH = 640;
  const CANVAS_HEIGHT = 400;
  const GRAVITY = 0.32;
  const JUMP_FORCE = -6.2;
  const PIPE_SPEED = 2.4;
  const PIPE_SPAWN_RATE = 110; // frames
  const PIPE_GAP = 125;
  const PIPE_WIDTH = 55;

  // Mutable refs for physics
  const birdY = useRef(200);
  const birdVelocity = useRef(0);
  const birdRotation = useRef(0);
  const frameCount = useRef(0);
  const pipesRef = useRef<Pipe[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const scoreRef = useRef(0);
  const coinsRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error("Error attempting to exit fullscreen", err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Sound Toggle
  const toggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Trigger Milestone check
  const checkMilestone = useCallback((score: number) => {
    if (score === 3) {
      soundFx.playUnlock();
      onMilestoneUnlock('about', score);
      showToast('🌟 UNLOCKED: PROFIL DEVELOPER!');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.4 } });
    } else if (score === 7) {
      soundFx.playUnlock();
      onMilestoneUnlock('skills', score);
      showToast('⚡ UNLOCKED: ARSENAL SKILL!');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.4 } });
    } else if (score === 12) {
      soundFx.playUnlock();
      onMilestoneUnlock('projects', score);
      showToast('🚀 UNLOCKED: PROYEK VAULT!');
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.4 } });
    } else if (score === 18) {
      soundFx.playUnlock();
      onMilestoneUnlock('experience', score);
      showToast('⚔️ UNLOCKED: DUNGEON TIMELINE!');
      confetti({ particleCount: 70, spread: 90, origin: { y: 0.4 } });
    } else if (score === 25) {
      soundFx.playUnlock();
      onMilestoneUnlock('hall_of_fame', score);
      showToast('👑 BOSS LEVEL CLEAR!');
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.4 } });
    }
  }, [onMilestoneUnlock]);

  // Jump / Flap Action
  const triggerFlap = useCallback(() => {
    if (gameState === 'IDLE') {
      startGame();
      return;
    }
    if (gameState === 'GAMEOVER') {
      return;
    }

    birdVelocity.current = JUMP_FORCE;
    soundFx.playFlap();

    // Spawn thruster particles
    for (let i = 0; i < 5; i++) {
      particlesRef.current.push({
        x: 100 - 8,
        y: birdY.current + 10,
        vx: -(Math.random() * 2 + 1.5),
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        life: 1.0,
        color: Math.random() > 0.4 ? '#FFE600' : '#FF5500'
      });
    }
  }, [gameState]);

  // Start game
  const startGame = () => {
    birdY.current = 180;
    birdVelocity.current = 0;
    birdRotation.current = 0;
    pipesRef.current = [];
    particlesRef.current = [];
    frameCount.current = 0;
    scoreRef.current = 0;
    coinsRef.current = 0;
    setCurrentScore(0);
    setSessionCoins(0);
    setScoreSubmitted(false);
    setGameState('PLAYING');
    soundFx.playClick();
  };

  // Game over
  const triggerGameOver = () => {
    setGameState('GAMEOVER');
    soundFx.playHit();
    onScoreUpdate(scoreRef.current);
    onCoinUpdate(coinsRef.current);
  };

  // Handle Score Submission
  const handleScoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (scoreSubmitted || submittingScore) return;
    setSubmittingScore(true);
    try {
      await onSaveScore(playerInitials.toUpperCase().slice(0, 3) || 'DEV', scoreRef.current, coinsRef.current);
      setScoreSubmitted(true);
      soundFx.playUnlock();
      showToast('🏆 REKOR BERHASIL DISIMPAN KE BACKEND JAVA!');
    } catch {
      showToast('❌ GAGAL MENYIMPAN SKOR');
    } finally {
      setSubmittingScore(false);
    }
  };

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      frameCount.current++;

      // 1. Clear background
      ctx.fillStyle = '#08080c';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 2. Cyber background grid
      ctx.strokeStyle = 'rgba(255, 230, 0, 0.06)';
      ctx.lineWidth = 1;
      const gridOffset = (frameCount.current * 0.8) % 30;
      for (let x = -gridOffset; x < CANVAS_WIDTH; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }

      // Cyber buildings in background
      ctx.fillStyle = '#101017';
      const buildingWidth = 60;
      for (let i = 0; i < 12; i++) {
        const bx = i * buildingWidth - ((frameCount.current * 0.3) % buildingWidth);
        const bh = 90 + ((i * 37) % 110);
        ctx.fillRect(bx, CANVAS_HEIGHT - bh - 20, buildingWidth - 6, bh);

        // Windows
        ctx.fillStyle = 'rgba(255, 230, 0, 0.15)';
        for (let wy = CANVAS_HEIGHT - bh; wy < CANVAS_HEIGHT - 30; wy += 14) {
          ctx.fillRect(bx + 8, wy, 6, 6);
          ctx.fillRect(bx + 24, wy, 6, 6);
          ctx.fillRect(bx + 40, wy, 6, 6);
        }
        ctx.fillStyle = '#101017';
      }

      // Ground Hazard Line
      ctx.fillStyle = '#181824';
      ctx.fillRect(0, CANVAS_HEIGHT - 22, CANVAS_WIDTH, 22);
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(0, CANVAS_HEIGHT - 22, CANVAS_WIDTH, 2);

      // Hazard stripes on floor
      const stripeOffset = (frameCount.current * 1.5) % 24;
      for (let sx = -stripeOffset; sx < CANVAS_WIDTH; sx += 24) {
        ctx.fillStyle = 'rgba(255, 230, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(sx, CANVAS_HEIGHT);
        ctx.lineTo(sx + 10, CANVAS_HEIGHT - 20);
        ctx.lineTo(sx + 18, CANVAS_HEIGHT - 20);
        ctx.lineTo(sx + 8, CANVAS_HEIGHT);
        ctx.fill();
      }

      // 3. Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1.0;

      // 4. Update Game Physics if PLAYING
      if (gameState === 'PLAYING') {
        birdVelocity.current += GRAVITY;
        birdY.current += birdVelocity.current;
        birdRotation.current = Math.min(Math.PI / 4, Math.max(-Math.PI / 5, birdVelocity.current * 0.08));

        // Floor / Ceiling Collision
        if (birdY.current > CANVAS_HEIGHT - 22 - 20) {
          birdY.current = CANVAS_HEIGHT - 22 - 20;
          triggerGameOver();
        }
        if (birdY.current < 0) {
          birdY.current = 0;
          birdVelocity.current = 0;
        }

        // Spawn Pipes
        if (frameCount.current % PIPE_SPAWN_RATE === 0) {
          const minHeight = 40;
          const maxHeight = CANVAS_HEIGHT - 22 - PIPE_GAP - minHeight;
          const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
          const bottomHeight = CANVAS_HEIGHT - 22 - topHeight - PIPE_GAP;

          pipesRef.current.push({
            x: CANVAS_WIDTH,
            topHeight,
            bottomHeight,
            passed: false,
            hasCoin: Math.random() > 0.4,
            coinCollected: false
          });
        }

        // Update Pipes
        const birdBox = { x: 100, y: birdY.current, w: 24, h: 22 };

        for (let i = pipesRef.current.length - 1; i >= 0; i--) {
          const pipe = pipesRef.current[i];
          pipe.x -= PIPE_SPEED;

          // Score check
          if (!pipe.passed && pipe.x + PIPE_WIDTH < birdBox.x) {
            pipe.passed = true;
            scoreRef.current += 1;
            setCurrentScore(scoreRef.current);
            soundFx.playPoint();
            checkMilestone(scoreRef.current);
          }

          // Coin pickup check
          if (pipe.hasCoin && !pipe.coinCollected) {
            const coinX = pipe.x + PIPE_WIDTH / 2;
            const coinY = pipe.topHeight + PIPE_GAP / 2;
            const dist = Math.hypot(birdBox.x + 12 - coinX, birdBox.y + 11 - coinY);
            if (dist < 26) {
              pipe.coinCollected = true;
              coinsRef.current += 1;
              scoreRef.current += 5; // Bonus points for coin!
              setCurrentScore(scoreRef.current);
              setSessionCoins(coinsRef.current);
              soundFx.playPoint();

              for (let k = 0; k < 8; k++) {
                particlesRef.current.push({
                  x: coinX,
                  y: coinY,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  size: 3,
                  life: 0.8,
                  color: '#FFE600'
                });
              }
            }
          }

          // Collision Detection
          const hitTop =
            birdBox.x + birdBox.w > pipe.x &&
            birdBox.x < pipe.x + PIPE_WIDTH &&
            birdBox.y < pipe.topHeight;

          const hitBottom =
            birdBox.x + birdBox.w > pipe.x &&
            birdBox.x < pipe.x + PIPE_WIDTH &&
            birdBox.y + birdBox.h > CANVAS_HEIGHT - 22 - pipe.bottomHeight;

          if (hitTop || hitBottom) {
            triggerGameOver();
          }

          if (pipe.x + PIPE_WIDTH < -10) {
            pipesRef.current.splice(i, 1);
          }
        }
      }

      // 5. Draw Cyber Server Pipes
      pipesRef.current.forEach((pipe) => {
        // TOP PIPE
        ctx.fillStyle = '#14141d';
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.strokeStyle = '#ffe600';
        ctx.lineWidth = 3;
        ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

        // Cap rim
        ctx.fillStyle = '#ffe600';
        ctx.fillRect(pipe.x - 3, pipe.topHeight - 12, PIPE_WIDTH + 6, 12);
        ctx.fillStyle = '#0b0b0e';
        ctx.fillRect(pipe.x + 2, pipe.topHeight - 10, PIPE_WIDTH - 4, 8);

        // Circuit LEDs
        for (let ly = 15; ly < pipe.topHeight - 20; ly += 24) {
          ctx.fillStyle = (frameCount.current + ly) % 40 < 20 ? '#39ff14' : '#ffe600';
          ctx.fillRect(pipe.x + 8, ly, 4, 4);
          ctx.fillStyle = 'rgba(255, 230, 0, 0.4)';
          ctx.fillRect(pipe.x + 18, ly + 1, 24, 2);
        }

        // BOTTOM PIPE
        const bottomY = CANVAS_HEIGHT - 22 - pipe.bottomHeight;
        ctx.fillStyle = '#14141d';
        ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, pipe.bottomHeight);
        ctx.strokeStyle = '#ffe600';
        ctx.lineWidth = 3;
        ctx.strokeRect(pipe.x, bottomY, PIPE_WIDTH, pipe.bottomHeight);

        // Cap rim
        ctx.fillStyle = '#ffe600';
        ctx.fillRect(pipe.x - 3, bottomY, PIPE_WIDTH + 6, 12);
        ctx.fillStyle = '#0b0b0e';
        ctx.fillRect(pipe.x + 2, bottomY + 2, PIPE_WIDTH - 4, 8);

        // Circuit LEDs
        for (let ly = bottomY + 22; ly < CANVAS_HEIGHT - 35; ly += 24) {
          ctx.fillStyle = (frameCount.current + ly) % 50 < 25 ? '#39ff14' : '#ff0055';
          ctx.fillRect(pipe.x + 8, ly, 4, 4);
          ctx.fillStyle = 'rgba(255, 230, 0, 0.4)';
          ctx.fillRect(pipe.x + 18, ly + 1, 24, 2);
        }

        // Coin
        if (pipe.hasCoin && !pipe.coinCollected) {
          const coinX = pipe.x + PIPE_WIDTH / 2;
          const coinY = pipe.topHeight + PIPE_GAP / 2;
          const pulse = Math.sin(frameCount.current * 0.1) * 2;

          ctx.fillStyle = '#ffe600';
          ctx.beginPath();
          ctx.arc(coinX, coinY + pulse, 9, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#000';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', coinX, coinY + pulse);
        }
      });

      // 6. Draw Flappy Dev (Pixel Character)
      ctx.save();
      const px = 100;
      const py = birdY.current;
      ctx.translate(px + 12, py + 11);
      ctx.rotate(birdRotation.current);

      // Jetpack
      ctx.fillStyle = '#555';
      ctx.fillRect(-14, -6, 6, 14);
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(-16, -2, 2, 6);

      // Flame
      if (gameState === 'PLAYING') {
        const flameLength = (frameCount.current % 4) * 2 + 6;
        ctx.fillStyle = '#ff5500';
        ctx.fillRect(-16 - flameLength, 0, flameLength, 4);
        ctx.fillStyle = '#ffe600';
        ctx.fillRect(-14 - flameLength / 2, 1, flameLength / 2, 2);
      }

      // Body (Dark Hoodie)
      ctx.fillStyle = '#1e1e28';
      ctx.fillRect(-10, -10, 20, 20);
      ctx.strokeStyle = '#ffe600';
      ctx.lineWidth = 2;
      ctx.strokeRect(-10, -10, 20, 20);

      // Visor
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(0, -6, 11, 7);
      ctx.fillStyle = '#000';
      ctx.fillRect(8, -4, 2, 3);

      // Wing
      const wingY = Math.sin(frameCount.current * 0.3) * 3;
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(-6, wingY - 2, 10, 5);

      ctx.restore();

      // 7. Live HUD on Canvas
      if (gameState === 'PLAYING') {
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.fillStyle = '#ffe600';
        ctx.textAlign = 'center';
        ctx.fillText(String(scoreRef.current), CANVAS_WIDTH / 2, 45);
      }

      if (isRunning) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, checkMilestone]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        triggerFlap();
      }
      if (e.code === 'Enter' && gameState === 'GAMEOVER') {
        startGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, triggerFlap]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isFullscreen ? '100vw' : '720px',
        height: isFullscreen ? '100vh' : 'auto',
        margin: '0 auto',
        display: isFullscreen ? 'flex' : 'block',
        flexDirection: 'column',
        justifyContent: isFullscreen ? 'center' : 'initial',
        alignItems: isFullscreen ? 'center' : 'initial',
        background: isFullscreen ? '#060608' : 'transparent',
        padding: isFullscreen ? '1rem' : '0'
      }}
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className="pixel-box"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            background: '#0e0e14',
            borderColor: 'var(--yellow-neon)',
            padding: '0.6rem 1.25rem',
            fontFamily: 'var(--font-arcade)',
            fontSize: '0.75rem',
            color: 'var(--yellow-neon)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Sparkles size={16} />
          {toastMessage}
        </div>
      )}

      {/* Arcade Cabinet Frame (Pixel Theme STRICTLY INSIDE) */}
      <div
        className="pixel-box"
        style={{
          background: '#09090d',
          border: '3px solid var(--yellow-neon)',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          maxWidth: isFullscreen ? '800px' : '100%'
        }}
      >
        {/* Cabinet Top Toolbar (Includes Fullscreen & Controls) */}
        <div
          style={{
            background: '#14141c',
            padding: '0.5rem 1rem',
            borderBottom: '2px solid #2a2a38',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-arcade)',
            fontSize: '0.65rem'
          }}
        >
          <div style={{ color: 'var(--yellow-neon)' }}>FLAPPY DEV // 16-BIT ENGINE</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* SFX Mute Button */}
            <button
              onClick={toggleMute}
              style={{
                background: 'transparent',
                border: '1px solid #3a3a48',
                color: isMuted ? 'var(--red-neon)' : 'var(--yellow-neon)',
                padding: '2px 6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontFamily: 'inherit',
                fontSize: '0.6rem'
              }}
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              <span>{isMuted ? 'MUTE' : 'SFX'}</span>
            </button>

            {/* FULLSCREEN BUTTON */}
            <button
              onClick={toggleFullscreen}
              style={{
                background: isFullscreen ? 'var(--yellow-neon)' : '#22222e',
                color: isFullscreen ? '#000' : 'var(--yellow-neon)',
                border: '1px solid var(--yellow-neon)',
                padding: '3px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'inherit',
                fontSize: '0.6rem',
                fontWeight: 'bold'
              }}
              title={isFullscreen ? "Keluar Fullscreen (Esc)" : "Mode Layar Penuh (Fullscreen)"}
            >
              {isFullscreen ? <Minimize size={12} /> : <Maximize size={12} />}
              <span>{isFullscreen ? 'KELUAR FULLSCREEN' : 'FULLSCREEN'}</span>
            </button>
          </div>
        </div>

        {/* Canvas Area (Click to Flap) */}
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={triggerFlap}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              imageRendering: 'pixelated'
            }}
          />

          {/* Scoped Scanline Texture (Only inside game canvas) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.22) 50%)',
              backgroundSize: '100% 3px',
              opacity: 0.8
            }}
          ></div>

          {/* Overlay: IDLE SCREEN */}
          {gameState === 'IDLE' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(8, 8, 12, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '1.5rem',
                  color: 'var(--yellow-neon)',
                  letterSpacing: '0.08em'
                }}
              >
                FLAPPY DEV: BYTE FLIGHT
              </div>

              <p style={{ color: '#aaa', fontSize: '0.825rem', maxWidth: '440px', lineHeight: 1.6, fontFamily: 'var(--font-silkscreen)' }}>
                Kendalikan developer menghindari rintangan server. Kumpulkan koin dan cetak rekor tertinggi Anda!
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="pixel-btn"
                style={{ fontSize: '0.85rem', padding: '0.8rem 1.6rem' }}
              >
                <Play size={15} />
                MULAI GAME [KLIK / SPASI]
              </button>

              <div style={{ fontSize: '0.65rem', color: '#777', fontFamily: 'var(--font-arcade)' }}>
                KONTROL: [SPASI] ATAU SENTUH LAYAR
              </div>
            </div>
          )}

          {/* Overlay: GAME OVER SCREEN */}
          {gameState === 'GAMEOVER' && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 9, 14, 0.92)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '1.4rem',
                  color: 'var(--red-neon)'
                }}
              >
                CONNECTION TERMINATED!
              </div>

              {/* Score Card */}
              <div
                className="pixel-box"
                style={{
                  background: '#12121c',
                  border: '2px solid var(--yellow-neon)',
                  padding: '1rem 1.5rem',
                  width: '100%',
                  maxWidth: '340px',
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#888' }}>SKOR AKHIR:</span>
                  <span style={{ color: 'var(--yellow-neon)', fontSize: '0.9rem' }}>{currentScore}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#888' }}>KOIN BYTE:</span>
                  <span style={{ color: 'var(--yellow-amber)' }}>🪙 {sessionCoins}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #333', paddingTop: '0.5rem' }}>
                  <span style={{ color: '#888' }}>SKOR TERTINGGI:</span>
                  <span style={{ color: '#fff' }}>{Math.max(highScore, currentScore)}</span>
                </div>
              </div>

              {/* Submit to Java Leaderboard */}
              {!scoreSubmitted ? (
                <form
                  onSubmit={handleScoreSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    maxWidth: '340px'
                  }}
                >
                  <input
                    type="text"
                    maxLength={3}
                    value={playerInitials}
                    onChange={(e) => setPlayerInitials(e.target.value.toUpperCase())}
                    placeholder="DEV"
                    style={{
                      fontFamily: 'var(--font-arcade)',
                      fontSize: '0.9rem',
                      width: '75px',
                      padding: '0.5rem',
                      textAlign: 'center',
                      background: '#09090f',
                      color: 'var(--yellow-neon)',
                      border: '2px solid var(--yellow-neon)',
                      outline: 'none',
                      letterSpacing: '0.15em'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submittingScore}
                    className="pixel-btn"
                    style={{ flex: 1, fontSize: '0.7rem', padding: '0.6rem 0.9rem' }}
                  >
                    <Send size={12} />
                    {submittingScore ? 'MENYIMPAN...' : 'SIMPAN SKOR'}
                  </button>
                </form>
              ) : (
                <div style={{ color: 'var(--green-neon)', fontFamily: 'var(--font-arcade)', fontSize: '0.7rem' }}>
                  ✓ REKOR TERSIMPAN DI PAPAN PERINGKAT!
                </div>
              )}

              {/* Restart Button */}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.4rem' }}>
                <button
                  onClick={startGame}
                  className="pixel-btn"
                  style={{ padding: '0.7rem 1.4rem', fontSize: '0.8rem' }}
                >
                  <RotateCcw size={14} />
                  MAIN LAGI [ENTER]
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Cabinet Controller Footer */}
        <div
          style={{
            background: '#12121a',
            borderTop: '2px solid #2a2a3a',
            padding: '0.6rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#888'
          }}
        >
          <span style={{ fontFamily: 'var(--font-arcade)', fontSize: '0.6rem', color: 'var(--yellow-neon)' }}>
            KONTROL: [SPASI] / KLIK / SENTUH
          </span>
          <span style={{ fontSize: '0.75rem' }}>
            Tekan <strong>[F]</strong> atau tombol Fullscreen untuk memperbesar
          </span>
        </div>
      </div>
    </div>
  );
};
