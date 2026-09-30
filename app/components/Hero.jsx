'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, FileText } from 'lucide-react';

const LOW = 0.3; // resting weight/width of each letter (0 = thin and narrow, 1 = heavy and wide)

function Word({ text }) {
  return (
    <span className="wline" aria-hidden="true">
      <span className="word">
        {text.split('').map((ch, i) => (
          <span key={i} className="vl">{ch}</span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const [time, setTime] = useState('');

  // Live Kolkata clock
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
    const tick = () => setTime(fmt.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  // The name always fills the width. Letters swell near the pointer and the word re-fits,
  // so the heavy letters squeeze the others instead of overflowing. Each line sits in a box
  // whose height is fixed at the resting size, so nothing around the name ever moves.
  useEffect(() => {
    const root = ref.current;
    const nameEl = root.querySelector('.name');
    const words = Array.from(root.querySelectorAll('.word'));
    const letters = Array.from(root.querySelectorAll('.vl'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const REST = letters.map(() => LOW);
    const cur = letters.map(() => LOW);
    const tgt = letters.map(() => LOW);
    let raf = 0;
    let dead = false;
    let lastW = 0;

    // Width available to the name. Read from the page container, never from the name itself,
    // so a momentarily-too-wide word can't feed back into the measurement.
    const available = () => {
      const cs = getComputedStyle(root);
      return root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    };

    const setLetters = (vals) => {
      letters.forEach((l, i) => {
        const t = vals[i];
        l.style.fontVariationSettings = `'wght' ${(200 + 600 * t).toFixed(0)}, 'wdth' ${(75 + 25 * t).toFixed(0)}`;
      });
    };

    const fit = () => {
      const W = available();
      if (W <= 0) return;
      const inline = window.matchMedia('(min-width: 900px)').matches;
      words.forEach((w) => (w.style.fontSize = '100px'));
      const widths = words.map((w) => w.offsetWidth);
      if (inline) {
        // desktop: one line, both words share one size
        const gap = 22;
        const total = widths.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
        const fs = (100 * W) / total;
        words.forEach((w) => (w.style.fontSize = fs + 'px'));
        nameEl.style.columnGap = 0.22 * fs + 'px';
      } else {
        // phone/tablet: two lines, each word fills the width
        words.forEach((w, i) => (w.style.fontSize = (100 * W) / widths[i] + 'px'));
        nameEl.style.columnGap = '';
      }
    };

    const apply = () => {
      setLetters(cur);
      fit();
    };

    // Measure the resting layout and lock each line's height to it
    const layout = () => {
      setLetters(REST);
      fit();
      words.forEach((w) => {
        w.parentElement.style.height = parseFloat(w.style.fontSize) * 0.86 + 'px';
      });
      apply();
    };

    const frame = () => {
      raf = 0;
      let moving = false;
      letters.forEach((_, i) => {
        const d = tgt[i] - cur[i];
        if (Math.abs(d) > 0.003) {
          cur[i] += d * 0.22;
          moving = true;
        } else {
          cur[i] = tgt[i];
        }
      });
      apply();
      if (moving) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const react = (x, y) => {
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        tgt[i] = LOW + (1 - LOW) * Math.max(0, 1 - d / (r.width * 2.4));
      });
      kick();
    };
    const onMove = (e) => react(e.clientX, e.clientY);
    const onTouch = (e) => react(e.touches[0].clientX, e.touches[0].clientY);
    const onLeave = () => {
      tgt.fill(LOW);
      kick();
    };
    const onResize = () => {
      const w = root.clientWidth;
      if (w !== lastW) {
        lastW = w;
        layout();
      }
    };

    // Reveal once, after the font has loaded and the layout is measured (no visible jumping)
    const start = () => {
      if (dead) return;
      lastW = root.clientWidth;
      layout();
      root.classList.add('ready');
    };
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(start);
    if (document.fonts) document.fonts.addEventListener('loadingdone', layout);

    window.addEventListener('resize', onResize);
    if (!reduce) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('touchmove', onTouch, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
    }

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (document.fonts) document.fonts.removeEventListener('loadingdone', layout);
    };
  }, []);

  return (
    <div className="wrap hero" ref={ref}>
      <div className="hero-top">
        <span className="avail">
          <i className="dot" aria-hidden="true" />
          Open to internships &amp; freelance
        </span>
        <span className="clock">Kolkata{time && <> · {time}</>}</span>
      </div>

      <div className="hero-main">
        <h1 className="name" aria-label="Ayush Kirtania">
          <Word text="Ayush" />
          <Word text="Kirtania" />
        </h1>

        <div className="hero-foot">
          <div>
            <p>
              I&apos;m a full stack developer in Kolkata. I build web apps, and I care as much about
              how they look and move as about how they work.
            </p>
            <p className="hint">
              <span className="h-mouse">Move your cursor over my name.</span>
              <span className="h-touch">Drag your finger across my name.</span>
            </p>
          </div>
          <div className="hero-cta">
            <a className="btn btn-solid" href="#work">
              See my work <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="btn" href="/Resume/Ayush_Kirtania_CV.pdf" download>
              <FileText size={18} aria-hidden="true" /> Résumé
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}