import React, { useEffect, useRef } from 'react';

/**
 * Interactive Light Ambient Canvas
 * Reacts to scroll speed and direction (reversing flow when scrolling up)
 * and interacts smoothly with mouse movement.
 */
export default function InteractiveCanvas({ smoothVelocity }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const colors = [
      'rgba(37, 99, 235, 0.25)',   // Royal Blue
      'rgba(6, 182, 212, 0.25)',   // Cyan
      'rgba(124, 58, 237, 0.20)',  // Purple
      'rgba(245, 158, 11, 0.20)',  // Amber
      'rgba(16, 185, 129, 0.20)',  // Emerald
    ];

    const initParticles = () => {
      const count = Math.min(Math.floor(window.innerWidth / 25), 45);
      const particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          baseY: Math.random() * canvas.height,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const velocityBoost = smoothVelocity * 12; // Positive when scrolling down, negative when scrolling up

      particlesRef.current.forEach((p, idx) => {
        // Natural drift + Scroll velocity physics boost
        p.x += p.vx;
        p.y += p.vy - velocityBoost; // Note: scrolling down pushes content up, so particles react dynamically
        p.pulse += p.pulseSpeed;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        // Draw particle with gentle breathing effect
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(currentRadius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles with subtle light lines
        for (let j = idx + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist2 / 90)})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [smoothVelocity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
}
