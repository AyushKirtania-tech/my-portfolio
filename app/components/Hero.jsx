'use client';
import { useEffect, useRef } from 'react';

function Word({ text }) {
  return (
    <span className="word" aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} className="vl">{ch}</span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const letters = Array.from(ref.current.querySelectorAll('.vl'));
    const set = (l, t) => {
      l.style.fontVariationSettings = `'wght' ${Math.round(200 + 600 * t)}, 'wdth' ${Math.round(75 + 25 * t)}`;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      letters.forEach((l) => set(l, 1));
      return;
    }

    // One intro sweep across all letters, then the pointer takes over
    let raf;
    let start = null;
    const intro = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      letters.forEach((l, i) => {
        const t = Math.max(0, Math.min(1, p * letters.length * 0.9 - i * 0.9));
        set(l, Math.sin(t * Math.PI));
      });
      if (p < 1) raf = requestAnimationFrame(intro);
    };
    raf = requestAnimationFrame(intro);

    const react = (x, y) => {
      letters.forEach((l) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        set(l, Math.max(0, 1 - d / (r.width * 2.4)));
      });
    };
    const onMove = (e) => react(e.clientX, e.clientY);
    const onTouch = (e) => react(e.touches[0].clientX, e.touches[0].clientY);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div className="wrap hero" ref={ref}>
      <h1 className="name" aria-label="Ayush Kirtania">
        <Word text="Ayush" />
        <Word text="Kirtania" />
      </h1>
      <div className="hero-foot">
        <p>
          I build full stack web apps with the care of a designer: clean code underneath,
          layouts and motion people remember on top.
        </p>
        <div className="side">
          Full stack developer, Kolkata
          <br />
          <span className="hint">Move your cursor over my name.</span>
        </div>
      </div>
    </div>
  );
}