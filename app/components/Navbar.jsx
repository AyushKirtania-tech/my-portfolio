'use client';
import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';

const links = [
  { id: 'top', label: 'AK', mark: true },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('top');
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const dockRef = useRef(null);
  const barRef = useRef(null);

  // Scroll progress + which section is in view
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      let current = 'top';
      for (const l of links) {
        if (l.id === 'top') continue;
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.id;
      }
      if (max > 0 && y >= max - 4) current = 'contact';
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Slide the highlight under the active link
  useEffect(() => {
    const measure = () => {
      const el = dockRef.current?.querySelector(`[data-id="${active}"]`);
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <nav className="dock" aria-label="Primary" ref={dockRef}>
      <span
        className="dock-pill"
        aria-hidden="true"
        style={{ width: pill.w, transform: `translateX(${pill.x}px)`, opacity: pill.w ? 1 : 0 }}
      />
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          data-id={l.id}
          className={`dock-link${l.mark ? ' dock-mark' : ''}`}
          aria-current={active === l.id ? 'true' : undefined}
          aria-label={l.mark ? 'Back to top' : undefined}
        >
          {l.label}
        </a>
      ))}
      <a
        href="/Resume/Ayush_Kirtania_CV.pdf"
        download
        className="dock-link dock-cv"
        aria-label="Download résumé"
      >
        <Download size={16} aria-hidden="true" />
        <span>Résumé</span>
      </a>
      <span className="dock-progress" aria-hidden="true">
        <span ref={barRef} />
      </span>
    </nav>
  );
}