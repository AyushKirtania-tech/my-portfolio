'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, FileText, Volume2, VolumeX } from 'lucide-react';

const LOW = 0.3; // resting weight/width of each letter (0 = thin and narrow, 1 = heavy and wide)

// ---------------------------------------------------------------------------
// SOUND TUNING. Everything you'd want to adjust lives here. Defaults are deliberately conservative.
// ---------------------------------------------------------------------------
const SOUND = {
  maxVolume: 0.05, // overall ceiling (0..1). Raise slowly: 0.1 is clearly audible on speakers.
  minSpeed: 0.05, // px/ms. Below this the sound is (smoothly) near-silent, not cut off.
  maxSpeed: 2.0, // px/ms. At/above this speed you get the full (still soft) intensity.
  speedCurve: 0.75, // <1 keeps slow movement audible but quiet; 1 = linear; >1 = more dynamic range
  speedSmoothing: 0.3, // 0..1, per-event smoothing of raw pointer speed. Lower = smoother
  attackMs: 70, // how quickly the sound swells when you speed up
  releaseMs: 220, // how slowly it eases off when you slow down. Higher = more continuous drag
  idleMs: 50, // ms with no pointer events before speed starts decaying (bridges event gaps)
  decayMs: 140, // how fast speed decays after you stop moving
  edgePad: 80, // px around the name where the sound still plays (fades out toward the edge)
  edgeMs: 120, // smoothing of that edge fade, so gaps between letters never cut the sound
  filterMin: 2200, // Hz, band-pass centre at slow speed
  filterMax: 2600, // Hz, centre at fast speed. Keep this close to filterMin: a big sweep sounds like swirling
  filterMs: 0.3, // seconds, how slowly the tone follows your speed (higher = steadier)
  stereoWidth: 0.12, // 0 = identical in both ears (steadiest), 1 = fully independent (can sound like it swirls)
  filterQ: 0.6, // low Q = wide, airy band. Higher = more whistly (avoid)
  lowpass: 7500, // Hz, rolls off hiss so it never gets harsh
  fadeIn: 0.03, // seconds (audio-level time constant; the main smoothing is attackMs/releaseMs)
  fadeOut: 0.07, // seconds (audio-level time constant)
  touchSlop: 10, // px a finger must travel before any sound, so taps stay silent
};

// ---------------------------------------------------------------------------
// Swoosh sound. Synthesised live with the Web Audio API (no audio file): one looping stereo pink-noise
// buffer shaped by high-pass -> band-pass -> low-pass filters.
// Pointer speed drives loudness and a gentle brightness shift only (no tremolo or pitch change, which
// sounded like spinning). The graph is built once and only its
// parameters are changed afterwards, so no nodes are created while the pointer moves.
// ---------------------------------------------------------------------------
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;

function createSwooshEngine() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();

  // four seconds of stereo pink-ish noise (softer than white), looped. A touch of L/R difference gives a little width.
  const len = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
  const first = buffer.getChannelData(0);
  for (let c = 0; c < 2; c++) {
    const d = buffer.getChannelData(c);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  }
  // blend the right channel toward the left so the noise stays put in the centre instead of drifting around
  {
    const r = buffer.getChannelData(1);
    const k = SOUND.stereoWidth;
    for (let i = 0; i < len; i++) r[i] = first[i] * (1 - k) + r[i] * k;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const high = ctx.createBiquadFilter();
  high.type = 'highpass';
  high.frequency.value = 500;

  const band = ctx.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = SOUND.filterMin;
  band.Q.value = SOUND.filterQ;

  const low = ctx.createBiquadFilter();
  low.type = 'lowpass';
  low.frequency.value = SOUND.lowpass;

  const env = ctx.createGain();
  env.gain.value = 0;

  const master = ctx.createGain();
  master.gain.value = SOUND.maxVolume;

  src.connect(high);
  high.connect(band);
  band.connect(low);
  low.connect(env);
  env.connect(master);
  master.connect(ctx.destination);

  src.start();

  let level = 0;

  return {
    resume: () => (ctx.state !== 'running' ? ctx.resume().catch(() => {}) : Promise.resolve()),
    // norm (pointer speed) and proximity are both 0..1
    setLevel(norm, proximity) {
      const t = ctx.currentTime;
      const target = Math.pow(clamp01(norm), SOUND.speedCurve) * clamp01(proximity);
      env.gain.setTargetAtTime(target, t, target > level ? SOUND.fadeIn : SOUND.fadeOut);
      level = target;
      band.frequency.setTargetAtTime(lerp(SOUND.filterMin, SOUND.filterMax, norm), t, SOUND.filterMs);
    },
    silence() {
      const t = ctx.currentTime;
      level = 0;
      env.gain.cancelScheduledValues(t);
      env.gain.setTargetAtTime(0, t, SOUND.fadeOut);
    },
    // a very soft swipe when sound is switched on, so you hear that it works
    blip() {
      const t = ctx.currentTime;
      env.gain.cancelScheduledValues(t);
      band.frequency.cancelScheduledValues(t);
      band.frequency.setValueAtTime(SOUND.filterMin, t);
      band.frequency.exponentialRampToValueAtTime(SOUND.filterMax, t + 0.25);
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.4, t + 0.08);
      env.gain.linearRampToValueAtTime(0, t + 0.3);
      level = 0;
    },
    destroy() {
      try {
        src.stop();
      } catch (e) {
        /* already stopped */
      }
      ctx.close().catch(() => {});
    },
  };
}

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
  const engineRef = useRef(null);
  const [time, setTime] = useState('');
  const [soundOn, setSoundOn] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

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

  // Browsers only allow audio after a tap or click, so sound starts switched off and the
  // AudioContext is only created inside this click handler.
  const toggleSound = () => {
    if (engineRef.current) {
      engineRef.current.silence();
      engineRef.current.destroy();
      engineRef.current = null;
      setSoundOn(false);
      return;
    }
    let engine = null;
    try {
      engine = createSwooshEngine();
    } catch (e) {
      engine = null; // audio unavailable: the visual interaction carries on untouched
    }
    if (!engine) return;
    engine.resume();
    engine.blip();
    engineRef.current = engine;
    setSoundOn(true);
  };

  // The name always fills the width. Letters swell near the pointer and the word re-fits,
  // so the heavy letters squeeze the others instead of overflowing. Each line sits in a box
  // whose height is fixed at the resting size, so nothing around the name ever moves.
  useEffect(() => {
    const root = ref.current;
    const nameEl = root.querySelector('.name');
    const words = Array.from(root.querySelectorAll('.word'));
    const letters = Array.from(root.querySelectorAll('.vl'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) setMotionOk(false);

    const REST = letters.map(() => LOW);
    const cur = letters.map(() => LOW);
    const tgt = letters.map(() => LOW);
    let raf = 0;
    let dead = false;
    let lastW = 0;

    // pointer tracking for the swoosh sound (plain variables, no React state)
    let last = null; // { x, y, t }
    let speed = 0; // smoothed, in pixels per millisecond
    let touchGesture = false; // a finger is currently down
    let travel = 0; // distance the finger has moved since touching down

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

    // Continuous sound control. Pointer events only set *targets*; a per-frame loop eases the real
    // values toward them, so the sound glides through event gaps, slow moments and the spaces between
    // letters instead of stuttering.
    let sTarget = 0;
    let sCur = 0;
    let pTarget = 0;
    let pCur = 0;
    let lastEvent = 0;
    let loopRaf = 0;
    let loopT = 0;

    const loop = (now) => {
      loopRaf = 0;
      const engine = engineRef.current;
      if (!engine) {
        sTarget = sCur = pTarget = pCur = 0;
        return;
      }
      const dt = Math.min(64, now - loopT || 16);
      loopT = now;
      if (now - lastEvent > SOUND.idleMs) sTarget *= Math.exp(-dt / SOUND.decayMs);
      const tau = sTarget > sCur ? SOUND.attackMs : SOUND.releaseMs;
      sCur += (sTarget - sCur) * (1 - Math.exp(-dt / tau));
      pCur += (pTarget - pCur) * (1 - Math.exp(-dt / SOUND.edgeMs));
      const x = clamp01((sCur - SOUND.minSpeed) / (SOUND.maxSpeed - SOUND.minSpeed));
      engine.setLevel(x * x * (3 - 2 * x), pCur); // smoothstep: no hard on/off threshold
      if (sCur < 0.003 && sTarget < 0.003) {
        engine.silence();
        return;
      }
      loopRaf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!loopRaf && engineRef.current) {
        loopT = performance.now();
        loopRaf = requestAnimationFrame(loop);
      }
    };

    const quiet = () => {
      last = null;
      speed = 0;
      sTarget = 0; // the loop eases the sound out naturally
      wake();
    };

    // Sound side of a pointer sample. proximity is 0..1 (how close the pointer is to the name).
    const sound = (x, y, proximity, isTouch) => {
      if (!engineRef.current) return;
      const now = performance.now();
      if (last && now - last.t < 200) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const instant = dist / Math.max(4, now - last.t);
        speed = speed * (1 - SOUND.speedSmoothing) + instant * SOUND.speedSmoothing;
        if (isTouch) travel += dist;
      } else {
        speed = 0;
      }
      last = { x, y, t: now };

      // a finger must actually travel before it makes a sound, so plain taps stay silent
      if (isTouch && travel < SOUND.touchSlop) return;

      sTarget = speed;
      pTarget = proximity;
      lastEvent = now;
      wake();
    };

    const react = (x, y, withSound, isTouch) => {
      let proximity = 0;
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
        const near = Math.max(0, 1 - d / (r.width * 2.4));
        tgt[i] = LOW + (1 - LOW) * near;
        if (near > proximity) proximity = near;
      });
      kick();
      if (withSound) {
        // proximity to the whole name (not single letters), so gaps between letters never cut the sound
        const box = nameEl.getBoundingClientRect();
        const dx = Math.max(box.left - x, 0, x - box.right);
        const dy = Math.max(box.top - y, 0, y - box.bottom);
        sound(x, y, clamp01(1 - Math.hypot(dx, dy) / SOUND.edgePad), isTouch);
      }
    };

    // Pointer events: mouse moves drive sound directly; for touch, pointerdown/up bracket the gesture
    // and touchmove (which keeps firing even after the browser starts scrolling) supplies the samples.
    const onDown = (e) => {
      if (e.pointerType === 'touch') {
        touchGesture = true;
        travel = 0;
        last = null;
        speed = 0;
      }
    };
    const onUp = (e) => {
      if (e.pointerType === 'touch') {
        touchGesture = false;
        quiet();
      }
    };
    const onMove = (e) => react(e.clientX, e.clientY, e.pointerType !== 'touch', false);
    const onTouch = (e) => react(e.touches[0].clientX, e.touches[0].clientY, touchGesture, true);
    const onTouchEnd = () => {
      touchGesture = false;
      quiet();
    };
    const onLeave = () => {
      tgt.fill(LOW);
      kick();
      quiet();
    };
    const onHidden = () => {
      if (document.hidden) {
        quiet();
        if (engineRef.current) engineRef.current.silence();
      }
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
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('touchmove', onTouch, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
      window.addEventListener('touchcancel', onTouchEnd);
      document.addEventListener('visibilitychange', onHidden);
      document.documentElement.addEventListener('mouseleave', onLeave);
    }

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loopRaf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('visibilitychange', onHidden);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (document.fonts) document.fonts.removeEventListener('loadingdone', layout);
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="wrap hero"
      ref={ref}
      style={{
        // Fill the first screen: clock/availability row stays on top, the name + intro sit at the
        // bottom of the viewport. The bottom padding keeps clear of the floating nav pill.
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
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
            {motionOk && (
              <button
                type="button"
                className={`btn sound-btn ${soundOn ? 'btn-solid' : ''}`}
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  minHeight: '2.75rem',
                  padding: 0,
                  marginTop: '0.8rem',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
                onClick={toggleSound}
                aria-pressed={soundOn}
                aria-label="Soft swoosh sound when moving across my name"
                title={soundOn ? 'Sound on' : 'Sound off'}
              >
                {soundOn ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
              </button>
            )}
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