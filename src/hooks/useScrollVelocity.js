import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that tracks real-time scroll velocity, scroll direction,
 * physics momentum, and normalized scroll progress.
 * 
 * Features:
 * - Speed-proportional skew, stretch, and parallax calculations
 * - Smooth lerp dampening for fluid 60fps spring reactions
 * - Reversible physics when scrolling up vs down
 */
export function useScrollVelocity() {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    velocity: 0,        // Raw velocity in px/ms (positive = scrolling down, negative = scrolling up)
    smoothVelocity: 0,  // Lerp-smoothed velocity
    speed: 0,           // Absolute magnitude of velocity
    direction: 0,       // 1 for down, -1 for up, 0 for stationary
    progress: 0,        // 0 to 100 percentage of total document scroll
    isScrolling: false,
  });

  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const rawVelocityRef = useRef(0);
  const smoothVelocityRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTimestamp.current = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastTimestamp.current, 1); // Avoid division by zero
      const dy = currentScrollY - lastScrollY.current;

      const rawVelocity = dy / dt; // px per millisecond
      rawVelocityRef.current = rawVelocity;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max((currentScrollY / maxScroll) * 100, 0), 100);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = now;

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        rawVelocityRef.current = 0;
      }, 100);
    };

    // Smooth physics loop via requestAnimationFrame
    const updatePhysics = () => {
      // Lerp smooth velocity towards raw velocity
      smoothVelocityRef.current += (rawVelocityRef.current - smoothVelocityRef.current) * 0.15;

      const absSpeed = Math.abs(smoothVelocityRef.current);
      const dir = smoothVelocityRef.current > 0.01 ? 1 : smoothVelocityRef.current < -0.01 ? -1 : 0;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max((window.scrollY / maxScroll) * 100, 0), 100);

      setScrollState({
        scrollY: window.scrollY,
        velocity: rawVelocityRef.current,
        smoothVelocity: smoothVelocityRef.current,
        speed: absSpeed,
        direction: dir,
        progress,
        isScrolling: absSpeed > 0.02,
      });

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return scrollState;
}
