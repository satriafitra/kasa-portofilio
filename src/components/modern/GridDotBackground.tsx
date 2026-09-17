import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const GridDotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse tracking for interactive effects
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    // Configuration
    const GRID_SIZE = 42; // Ukuran kotak-kotak dalam pixel
    const CONNECTION_DIST = 115;
    const MOUSE_RADIUS = 160;

    // Palette: Modern Gold/Yellow (#facc15), Cyber Cyan (#38bdf8), Crisp White
    const colors = [
      '#facc15', // Gold yellow (theme primary)
      '#facc15', 
      '#eab308',
      '#38bdf8', // Accent cyan
      '#ffffff'  // Crisp white
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Calculate particle density based on screen dimensions
      const count = Math.min(85, Math.max(35, Math.floor((width * height) / 22000)));

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = 0.35 + Math.random() * 0.45;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: 1.6 + Math.random() * 2.2,
          color,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    handleResize();

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;

      // Smooth mouse interpolation (easing)
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // 1. Clear & Dark canvas base
      ctx.clearRect(0, 0, width, height);

      // Deep dark futuristic gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#09090d');
      bgGrad.addColorStop(0.5, '#0c0c12');
      bgGrad.addColorStop(1, '#08080c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Kotak-Kotak (Square Grid)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.038)';
      ctx.beginPath();

      // Vertical grid lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal grid lines
      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Draw Grid Intersection Points (Titik Persimpangan Kotak)
      for (let x = 0; x <= width; x += GRID_SIZE) {
        for (let y = 0; y <= height; y += GRID_SIZE) {
          // Occasional subtle twinkle for random nodes
          const nodePulse = Math.sin(tick * 0.03 + x * 0.02 + y * 0.02);
          if (nodePulse > 0.85) {
            ctx.fillStyle = `rgba(250, 204, 21, ${(nodePulse - 0.85) * 0.8})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }

      // 4. Mouse Interactive Spotlight on Grid
      if (mouse.isHovered && mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_RADIUS
        );
        mouseGlow.addColorStop(0, 'rgba(250, 204, 21, 0.09)');
        mouseGlow.addColorStop(0.5, 'rgba(250, 204, 21, 0.03)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(
          mouse.x - MOUSE_RADIUS,
          mouse.y - MOUSE_RADIUS,
          MOUSE_RADIUS * 2,
          MOUSE_RADIUS * 2
        );
      }

      // 5. Update & Draw Moving Animated Dots (Partikel Bergerak)
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently or wrap around edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Mouse avoidance/attraction subtle physics
        if (mouse.isHovered) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        // Draw connecting constellation lines to neighboring dots
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.22 * ((currentAlpha + p2.baseAlpha) / 2);
            ctx.strokeStyle = `rgba(250, 204, 21, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connecting line to cursor if close
        if (mouse.isHovered) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.strokeStyle = `rgba(250, 204, 21, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Draw the glowing particle dot
        // Subtle outer glow halo
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow & globalAlpha for performance
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // 6. Subtle Vignette edges for focus on content
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.4,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(5, 5, 8, 0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};
