'use client';
import { useEffect, useRef } from 'react';

// Each project brings its own palette. On desktop, hovering or focusing a row repaints the page.
// On touch screens the row crossing the middle of the screen repaints it as you scroll.
const projects = [
  {
    title: 'DRIPDUO',
    year: '2026',
    description:
      'Independent luxury streetwear brand site for the FW26 collection: editorial layouts, a custom canvas loading animation, and scroll-triggered parallax.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/dripduo.png',
    live: 'https://dripduo.vercel.app/',
    palette: { bg: '#EE3C24', ink: '#ECE7D1', muted: '#0A0A0A', line: 'rgba(10,10,10,.4)' },
  },
  {
    title: 'FUXI AI',
    year: '2025',
    description: 'Privacy-first Chrome extension using on-device Gemini Nano AI.',
    tech: ['React', 'Vite', 'Gemini Nano', 'Tailwind'],
    image: '/projects/logo.png',
    repo: 'https://github.com/AyushKirtania-tech/FUXI-AI.git',
    palette: { bg: '#0B0B12', ink: '#D8FF4A', muted: '#9aa0b8', line: 'rgba(216,255,74,.3)' },
  },
  {
    title: 'OTP Auth',
    year: '2025',
    description: 'Scalable full-stack auth with SMS verification and Redis queuing.',
    tech: ['Next.js', 'Node.js', 'Redis', 'Prisma'],
    image: '/projects/otp.png',
    repo: 'https://github.com/AyushKirtania-tech/otp-auth',
    palette: { bg: '#ECE7D1', ink: '#101010', muted: '#4a4a40', line: 'rgba(16,16,16,.35)' },
  },
  {
    title: 'F1 UpToDates',
    year: '2024',
    description: 'Formula 1 info hub with circuits and race data.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/F1.png',
    live: 'https://f1-up-to-dates.vercel.app/',
    palette: { bg: '#f4f4f4', ink: '#E10600', muted: '#3b3b3b', line: 'rgba(225,6,0,.4)' },
  },
];

const VARS = ['--bg', '--ink', '--muted', '--line'];

function paint(p) {
  const s = document.documentElement.style;
  s.setProperty('--bg', p.bg);
  s.setProperty('--ink', p.ink);
  s.setProperty('--muted', p.muted);
  s.setProperty('--line', p.line);
}

function reset() {
  VARS.forEach((v) => document.documentElement.style.removeProperty(v));
}

export default function Projects() {
  const listRef = useRef(null);

  useEffect(() => {
    // Touch screens have no hover, so repaint from scroll position instead
    if (!window.matchMedia('(hover: none)').matches) return;

    const rows = Array.from(listRef.current.querySelectorAll('.row'));
    const active = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = rows.indexOf(e.target);
          if (e.isIntersecting) active.add(i);
          else active.delete(i);
        });
        if (active.size) paint(projects[Math.max(...active)].palette);
        else reset();
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    rows.forEach((r) => io.observe(r));

    return () => {
      io.disconnect();
      reset();
    };
  }, []);

  return (
    <section id="work">
      <div className="wrap">
        <h2>Selected work</h2>
        <ul className="work-list" ref={listRef}>
          {projects.map((p) => (
            <li key={p.title}>
              <a
                className="row"
                href={p.live || p.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title}, ${p.live ? 'view live site' : 'view source code'}`}
                onMouseEnter={() => paint(p.palette)}
                onFocus={() => paint(p.palette)}
                onMouseLeave={reset}
                onBlur={reset}
              >
                <div className="row-main">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="row-side">
                  <span className="year">{p.year}</span>
                  <span className="go">{p.live ? 'Live site' : 'Source code'}</span>
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
        <p className="note">
          Hover a project (or scroll through them on your phone) and the whole page takes on its palette.{' '}
          <a href="https://github.com/AyushKirtania-tech" target="_blank" rel="noopener noreferrer">
            More on GitHub
          </a>
        </p>
      </div>
    </section>
  );
}