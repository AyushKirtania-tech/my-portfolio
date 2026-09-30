'use client';
import { useEffect, useRef } from 'react';

// Each project brings its own palette, and the whole page takes it on:
// Desktop: while you hover or focus a row.
// Phones: while that card is in the middle of the screen. The active card is also flipped to an
// inverted solid version of the same colours (see globals.css), so it always stands out.
const projects = [
  {
    title: 'DRIPDUO',
    year: '2026',
    description:
      'The website for my own clothing brand and its FW26 collection. It has an editorial product layout, a responsive type system, and a loading screen that draws the Bengali letter ড, the brand mark, stroke by stroke on a canvas.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas'],
    image: '/projects/dripduo.png',
    live: 'https://dripduo.vercel.app/',
    palette: { bg: '#EE3C24', ink: '#ECE7D1', muted: '#0A0A0A', line: 'rgba(10,10,10,.4)' },
  },
  {
    title: 'FUXI AI',
    year: '2025',
    description:
      'A Chrome extension that helps you manage many open tabs. Type what you are looking for to find a tab by its content, or let it sort your tabs into named groups. It uses the AI built into Chrome (Gemini Nano), so your tab content stays on your device.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Gemini Nano'],
    image: '/projects/logo.png',
    repo: 'https://github.com/AyushKirtania-tech/FUXI-AI.git',
    palette: { bg: '#0B0B12', ink: '#D8FF4A', muted: '#9aa0b8', line: 'rgba(216,255,74,.3)' },
  },
  {
    title: 'OTP Auth',
    year: '2025',
    description:
      'One-time-password login split into three services: a Next.js frontend, an Express API, and a background worker. The API puts each SMS job in a Redis queue (BullMQ), and the worker sends it through Fast2SMS, so the request returns quickly.',
    tech: ['Next.js', 'Express', 'Prisma', 'Redis', 'BullMQ'],
    image: '/projects/otp.png',
    repo: 'https://github.com/AyushKirtania-tech/otp-auth',
    palette: { bg: '#ECE7D1', ink: '#101010', muted: '#4a4a40', line: 'rgba(16,16,16,.35)' },
  },
  {
    title: 'F1 UpToDates',
    year: '2024',
    description:
      'A Formula 1 site about circuits and races, built as a learning project to practise layout, responsive design and plain JavaScript.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/F1.png',
    live: 'https://f1-up-to-dates.vercel.app/',
    palette: { bg: '#00D2BE', ink: '#0A0A0A', muted: '#0a4a43', line: 'rgba(10,10,10,.35)' },
  },
];

const VARS = ['--bg', '--ink', '--muted', '--line'];

const PHONE = '(max-width: 760px)';
const DESKTOP_HOVER = '(min-width: 761px) and (hover: hover)';

function applyPalette(p) {
  const s = document.documentElement.style;
  s.setProperty('--bg', p.bg);
  s.setProperty('--ink', p.ink);
  s.setProperty('--muted', p.muted);
  s.setProperty('--line', p.line);
}

function reset() {
  VARS.forEach((v) => document.documentElement.style.removeProperty(v));
}

// hover and focus only repaint on desktop; phones are driven by scroll position instead
function hoverPaint(p) {
  if (window.matchMedia(DESKTOP_HOVER).matches) applyPalette(p);
}
function hoverReset() {
  if (window.matchMedia(DESKTOP_HOVER).matches) reset();
}

export default function Projects() {
  const listRef = useRef(null);

  // Phones: repaint the page from whichever card sits in the middle of the screen
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const rows = Array.from(listRef.current.querySelectorAll('.row'));
    let io = null;

    const setActive = (i) => {
      rows.forEach((r, j) => {
        if (j === i) r.setAttribute('data-active', 'true');
        else r.removeAttribute('data-active');
      });
      if (i < 0) reset();
      else applyPalette(projects[i].palette);
    };

    const stop = () => {
      if (io) {
        io.disconnect();
        io = null;
      }
      setActive(-1);
    };

    const start = () => {
      stop();
      if (!mq.matches) return;
      const active = new Set();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const i = rows.indexOf(e.target);
            if (e.isIntersecting) active.add(i);
            else active.delete(i);
          });
          setActive(active.size ? Math.max(...active) : -1);
        },
        { rootMargin: '-45% 0px -45% 0px' }
      );
      rows.forEach((r) => io.observe(r));
    };

    start();
    mq.addEventListener('change', start);
    return () => {
      mq.removeEventListener('change', start);
      stop();
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
                onMouseEnter={() => hoverPaint(p.palette)}
                onFocus={() => hoverPaint(p.palette)}
                onMouseLeave={hoverReset}
                onBlur={hoverReset}
                style={{
                  '--c-bg': p.palette.bg,
                  '--c-ink': p.palette.ink,
                  '--c-muted': p.palette.muted,
                  '--c-line': p.palette.line,
                }}
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
          That&apos;s the short list. You&apos;ll find more of my code on GitHub.{' '}
          <a href="https://github.com/AyushKirtania-tech" target="_blank" rel="noopener noreferrer">
            Come have a look
          </a>
        </p>
      </div>
    </section>
  );
}