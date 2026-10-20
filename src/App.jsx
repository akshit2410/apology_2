import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

/* ====== SVG ICONS ====== */
function HeartSVG({ color = '#722031', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function PetalSVG({ color = '#D4A5B5', size = 14 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill={color} opacity="0.6">
      <ellipse cx="10" cy="13" rx="8" ry="11" transform="rotate(20 10 13)" />
    </svg>
  );
}

/* Seeded random */
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const STATIC_PETALS = (() => {
  const items = [];
  const colors = ['#B8ACCB', '#D4A5B5', '#C5BCDC', '#E8CAD4', '#9F91B6'];
  for (let i = 0; i < 14; i++) {
    const r1 = seededRandom(i * 7 + 1);
    const r2 = seededRandom(i * 13 + 3);
    const r3 = seededRandom(i * 17 + 5);
    const r4 = seededRandom(i * 23 + 7);
    items.push({
      id: i,
      left: `${r1 * 100}%`,
      size: 9 + r2 * 12,
      color: colors[Math.floor(r3 * colors.length)],
      duration: 10 + r4 * 10,
      delay: r1 * 8,
    });
  }
  return items;
})();

const STATIC_SPARKLES = (() => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const r1 = seededRandom(i * 11 + 2);
    const r2 = seededRandom(i * 19 + 4);
    const r3 = seededRandom(i * 29 + 6);
    const r4 = seededRandom(i * 31 + 8);
    items.push({
      id: i,
      left: `${r1 * 100}%`,
      top: `${r2 * 100}%`,
      size: 2 + r3 * 3,
      delay: r4 * 6,
      duration: 2.5 + r1 * 3,
    });
  }
  return items;
})();

/* ====== AMBIENT ATMOSPHERE ====== */
function AmbientAtmosphere() {
  return (
    <div className="ambient-layer">
      {STATIC_PETALS.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="floating-petal"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <PetalSVG color={p.color} size={p.size} />
        </div>
      ))}
      {STATIC_SPARKLES.map((s) => (
        <div
          key={`sparkle-${s.id}`}
          className="floating-sparkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ====== REUSABLE LETTER BODY CONTENT ====== */
function LetterBodyContent({ dateFormatted, onRefold }) {
  return (
    <div className="parchment-sheet">
      <div className="paper-crease-shadow crease-1" />
      <div className="paper-crease-shadow crease-2" />
      <div className="parchment-lines-overlay" />

      <div className="letter-inner-content">
        {/* Top meta */}
        <div className="letter-top-meta">
          <span className="letter-location">From the bottom of my heart</span>
          <span className="letter-date-stamp">{dateFormatted}</span>
        </div>

        {/* Polaroid Snapshot */}
        <div className="polaroid-container">
          <div className="polaroid-frame">
            <div className="washi-tape" />
            <div className="polaroid-photo-box">
              <img src="/photo.jpg" alt="Us together 💜" className="polaroid-photo" />
            </div>
            <div className="polaroid-caption">us, always 💜</div>
          </div>
        </div>

        {/* Salutation */}
        <div className="letter-salutation">Hey Babe, 🥺</div>

        {/* Apology Body */}
        <div className="letter-body-prose">
          <p>
            I messed up again babe, and I know it. I'm not going to make excuses, you deserve
            better than that and more love than that I swear. You're the best thing in my life, babe, and the thought
            of losing you over something I could've handled better breaks me, I shouldn't have said things I dont mean. I'm sorry.
            Not just in words, I'll prove it, I will change. I will love you more and more every single day. 💜
          </p>
        </div>

        {/* Taylor Swift "Lover" Bridge Card */}
        <div className="lover-lyrics-card">
          <div className="lover-badge">
            <span className="lover-badge-sparkle">✨</span>
            <span>Lover — Taylor Swift</span>
          </div>
          <div className="lover-lyrics-block">
            <span className="lyric-quote">"Ladies and gentlemen, will you please stand?</span>
            <span className="lyric-quote">With every guitar string scar on my hand</span>
            <span className="lyric-quote">I take this magnetic force of a man to be my lover</span>
            <span className="lyric-quote">My heart's been borrowed and yours has been blue</span>
            <span className="lyric-quote">All's well that ends well to end up with you</span>
            <span className="lyric-quote">Swear to be overdramatic and true to my lover."</span>
          </div>
          <div className="lover-card-footer">
            <span>— because this song is us, always 💜</span>
          </div>
        </div>

        {/* Divider */}
        <div className="letter-filigree-divider">
          <span className="filigree-line" />
          <span>✦ ♡ ✦</span>
          <span className="filigree-line" />
        </div>

        {/* Closing */}
        <div className="letter-closing-block">
          <p className="letter-closing-note">
            I love you more than all the Taylor Swift songs combined. And that's saying something. 🥺
          </p>
          <div className="letter-signature-calligraphy">
            Forever your pengu, 💕
          </div>
        </div>

        {/* Post Scriptum */}
        <div className="letter-post-scriptum">
          <p>
            P.S. — "Can I go where you go? Can we always be this close?
            Forever and ever" ...that's my promise to you, babe. Always. 🤍
          </p>
        </div>

        {/* Refold action */}
        {onRefold && (
          <div className="refold-action-container">
            <button className="refold-button" onClick={onRefold}>
              <span>✉️</span>
              <span>Fold &amp; put back in envelope</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====== MAIN COMPONENT ====== */
export default function App() {
  const [progress, setProgress] = useState(0);       // 0 = closed, 1 = open
  const [phase, setPhase] = useState('interactive');  // 'interactive' | 'reading'
  const [tapParticles, setTapParticles] = useState([]);

  const touchStartRef = useRef(null);
  const progressRef = useRef(0);
  const heartCounterRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Safe clamp helper
  const clamp = (v, min = 0, max = 1) => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    return Math.min(Math.max(v, lo), hi);
  };

  // Safe map range with normalized t (handles both ascending and descending ranges)
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
    return outMin + t * (outMax - outMin);
  };

  // Smooth snap animation
  const snapTo = useCallback((target) => {
    const start = progressRef.current;
    const startTime = performance.now();
    const duration = 550;

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3); // Ease out cubic
      const current = start + (target - start) * eased;
      progressRef.current = current;
      setProgress(current);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        progressRef.current = target;
        setProgress(target);
        if (target >= 1) {
          setPhase('reading');
        }
      }
    };
    requestAnimationFrame(animate);
  }, []);

  // Touch gesture handlers
  const handleTouchStart = useCallback((e) => {
    if (phase === 'reading') return;
    isDraggingRef.current = false;
    touchStartRef.current = {
      y: e.touches[0].clientY,
      startProgress: progressRef.current,
    };
  }, [phase]);

  const handleTouchMove = useCallback((e) => {
    if (!touchStartRef.current || phase === 'reading') return;
    const dy = touchStartRef.current.y - e.touches[0].clientY;
    if (Math.abs(dy) > 6) {
      isDraggingRef.current = true;
    }
    // 240px drag = full 0→1
    const dragProgress = dy / 240;
    const newProgress = clamp(touchStartRef.current.startProgress + dragProgress, 0, 1);
    progressRef.current = newProgress;
    setProgress(newProgress);
  }, [phase]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current || phase === 'reading') return;
    const wasDragging = isDraggingRef.current;
    touchStartRef.current = null;
    isDraggingRef.current = false;

    if (!wasDragging && progressRef.current < 0.1) {
      // Tap detected! Open smoothly
      snapTo(1);
      return;
    }

    const p = progressRef.current;
    if (p > 0.45) {
      snapTo(1);
    } else {
      snapTo(0);
    }
  }, [phase, snapTo]);

  // Desktop mouse handlers
  const mouseDownRef = useRef(false);
  const handleMouseDown = useCallback((e) => {
    if (phase === 'reading') return;
    mouseDownRef.current = true;
    isDraggingRef.current = false;
    touchStartRef.current = {
      y: e.clientY,
      startProgress: progressRef.current,
    };
  }, [phase]);

  const handleMouseMove = useCallback((e) => {
    if (!mouseDownRef.current || !touchStartRef.current || phase === 'reading') return;
    const dy = touchStartRef.current.y - e.clientY;
    if (Math.abs(dy) > 5) {
      isDraggingRef.current = true;
    }
    const dragProgress = dy / 240;
    const newProgress = clamp(touchStartRef.current.startProgress + dragProgress, 0, 1);
    progressRef.current = newProgress;
    setProgress(newProgress);
  }, [phase]);

  const handleMouseUp = useCallback(() => {
    if (!mouseDownRef.current) return;
    mouseDownRef.current = false;
    handleTouchEnd();
  }, [handleTouchEnd]);

  // Refold back to closed envelope
  const handleRefold = useCallback((e) => {
    if (e) e.stopPropagation();
    setPhase('interactive');
    window.scrollTo({ top: 0, behavior: 'instant' });
    const start = 1;
    const startTime = performance.now();
    const duration = 650;
    const animate = (now) => {
      const elapsed = now - startTime;
      const t = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = start + (0 - start) * eased;
      progressRef.current = current;
      setProgress(current);
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Ambient tap hearts
  const handleScreenClick = (e) => {
    if (e.target.closest('button')) return;
    const heartIcons = ['🤍', '✨', '💜', '💌', '💕'];
    const emoji = heartIcons[heartCounterRef.current % heartIcons.length];
    heartCounterRef.current += 1;
    const id = Date.now() + Math.random();
    setTapParticles((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY, emoji }]);
    setTimeout(() => {
      setTapParticles((prev) => prev.filter((p) => p.id !== id));
    }, 900);
  };

  // Interpolated visual values
  const sealScale = mapRange(progress, 0, 0.18, 1, 0);
  const sealOpacity = mapRange(progress, 0, 0.15, 1, 0);
  const flapRotation = mapRange(progress, 0.06, 0.45, 0, -180);
  const letterSlide = mapRange(progress, 0.25, 0.65, 0, -210);
  const letterScale = mapRange(progress, 0.25, 0.65, 1, 1.04);
  const envelopePocketOpacity = mapRange(progress, 0.60, 0.90, 1, 0);
  const envelopeY = mapRange(progress, 0.60, 0.90, 0, 90);
  const hintOpacity = mapRange(progress, 0, 0.10, 1, 0);
  const progressPercent = Math.round(progress * 100);

  // Today's date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div
      className={`app ${phase === 'reading' ? 'is-letter-view' : 'is-envelope-view'}`}
      onClick={handleScreenClick}
    >
      <AmbientAtmosphere />

      {/* Tap particles */}
      {tapParticles.map((tp) => (
        <span
          key={tp.id}
          className="tap-heart-particle"
          style={{ left: tp.x, top: tp.y }}
        >
          {tp.emoji}
        </span>
      ))}

      {/* ===== INTERACTIVE ENVELOPE STAGE ===== */}
      {phase === 'interactive' && (
        <div
          className="gesture-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 3D Envelope Box */}
          <div
            className="envelope-3d-box"
            style={{
              transform: `translateY(${envelopeY}px)`,
            }}
          >
            {/* Back pocket and lining (fades as letter takes over) */}
            <div
              className="envelope-back-pocket"
              style={{ opacity: envelopePocketOpacity }}
            />
            <div
              className="envelope-lining"
              style={{ opacity: envelopePocketOpacity }}
            />

            {/* Letter sliding out (STAYS VISIBLE ALWAYS!) */}
            <div
              className="envelope-sliding-letter"
              style={{
                transform: `translateY(${letterSlide}px) scale(${letterScale})`,
                zIndex: progress > 0.45 ? 8 : 3, // Pops in front of front flaps once emerging
              }}
            >
              <div className="letter-mini-header">
                <span className="letter-mini-to">To my favorite person</span>
                <span className="letter-mini-heart">💜</span>
              </div>
              <div className="letter-mini-lines">
                <div className="mini-line full" />
                <div className="mini-line med" />
                <div className="mini-line full" />
                <div className="mini-line short" />
              </div>
            </div>

            {/* Front pocket & address (fades as letter unfolds) */}
            <div
              className="envelope-front-pocket"
              style={{ opacity: envelopePocketOpacity }}
            />
            <div
              className="envelope-front-flaps"
              style={{ opacity: envelopePocketOpacity }}
            />
            <div
              className="envelope-address"
              style={{ opacity: envelopePocketOpacity }}
            >
              <div className="envelope-recipient">To My Babe</div>
              <div className="envelope-subtext">Personal &amp; Confidential</div>
            </div>

            {/* Triangular Flap */}
            <div
              className="envelope-top-flap"
              style={{
                transform: `rotateX(${flapRotation}deg)`,
                opacity: envelopePocketOpacity,
              }}
            >
              <div className="flap-face-front" />
              <div className="flap-face-back" />
            </div>

            {/* Wine-red Wax Seal */}
            <div
              className="wax-seal-wrapper"
              style={{
                transform: `translateX(-50%) scale(${sealScale})`,
                opacity: sealOpacity,
              }}
            >
              <div className="wax-seal-body">
                <div className="wax-seal-rim" />
                <span className="wax-seal-icon">💌</span>
              </div>
            </div>
          </div>

          {/* Interaction guide */}
          <div
            className="open-interaction-guide"
            style={{ opacity: hintOpacity }}
          >
            <div className="interactive-pill">
              <span className="pulse-arrow">↑</span>
              <span>Drag up or tap to open</span>
              <span className="pulse-arrow">↑</span>
            </div>
          </div>

          {/* Progress bar */}
          {progress > 0.02 && (
            <div className="drag-progress-bar">
              <div
                className="drag-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* ===== FULL READING STAGE ===== */}
      {phase === 'reading' && (
        <motion.div
          className="letter-viewport"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <LetterBodyContent
            dateFormatted={dateFormatted}
            onRefold={handleRefold}
          />
        </motion.div>
      )}
    </div>
  );
}
