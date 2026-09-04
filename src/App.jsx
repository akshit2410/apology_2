import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

/* ====== MINI HEART SVG ====== */
function HeartSVG({ color = '#FF6B9D', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ====== 3D MAIN HEART ====== */
function BigHeart() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Main body gradient — deep 3D feel */}
        <radialGradient id="heartBase" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFD0E0" />
          <stop offset="25%" stopColor="#FF8FB4" />
          <stop offset="55%" stopColor="#FF5A8A" />
          <stop offset="80%" stopColor="#E91E6C" />
          <stop offset="100%" stopColor="#C2185B" />
        </radialGradient>
        {/* Top-left highlight — simulates light source */}
        <radialGradient id="highlight1" cx="32%" cy="28%" r="25%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Secondary highlight on right lobe */}
        <radialGradient id="highlight2" cx="68%" cy="30%" r="18%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Bottom shadow for depth */}
        <radialGradient id="bottomShadow" cx="50%" cy="75%" r="40%">
          <stop offset="0%" stopColor="rgba(130,0,50,0.3)" />
          <stop offset="100%" stopColor="rgba(130,0,50,0)" />
        </radialGradient>
        {/* Inner glow at center */}
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="rgba(255,180,200,0.4)" />
          <stop offset="100%" stopColor="rgba(255,180,200,0)" />
        </radialGradient>
        {/* Outer drop shadow */}
        <filter id="heartShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#C2185B" floodOpacity="0.35" />
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#E91E6C" floodOpacity="0.2" />
        </filter>
      </defs>
      
      {/* Heart path */}
      {(() => {
        const d = `M100 175
           C60 145, 15 115, 15 70
           C15 40, 40 20, 65 20
           C80 20, 92 30, 100 45
           C108 30, 120 20, 135 20
           C160 20, 185 40, 185 70
           C185 115, 140 145, 100 175Z`;
        return (
          <>
            {/* Base shape with shadow */}
            <path d={d} fill="url(#heartBase)" filter="url(#heartShadow)" />
            {/* Bottom depth shadow */}
            <path d={d} fill="url(#bottomShadow)" />
            {/* Inner glow */}
            <path d={d} fill="url(#innerGlow)" />
            {/* Primary specular highlight */}
            <path d={d} fill="url(#highlight1)" />
            {/* Secondary highlight */}
            <path d={d} fill="url(#highlight2)" />
          </>
        );
      })()}
      
      {/* Specular shine spots */}
      <ellipse cx="62" cy="50" rx="20" ry="13" fill="rgba(255,255,255,0.45)" transform="rotate(-30 62 50)" />
      <ellipse cx="72" cy="42" rx="8" ry="5" fill="rgba(255,255,255,0.6)" transform="rotate(-30 72 42)" />
      {/* Tiny extra gleam on right lobe */}
      <ellipse cx="138" cy="48" rx="10" ry="6" fill="rgba(255,255,255,0.2)" transform="rotate(-20 138 48)" />
    </svg>
  );
}

/* ====== EXPLOSION PARTICLES ====== */
function ExplosionParticles({ originX, originY }) {
  const particles = useMemo(() => {
    const items = [];
    const colors = ['#FF6B9D', '#FFB3CC', '#E91E6C', '#FF8FB4', '#D1C4E9', '#B39DDB', '#F8BBD0'];
    for (let i = 0; i < 35; i++) {
      const angle = (Math.PI * 2 * i) / 35 + (Math.random() - 0.5) * 0.5;
      const distance = 120 + Math.random() * 250;
      const size = 10 + Math.random() * 22;
      items.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 40,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 720 - 360,
        delay: Math.random() * 0.15,
        duration: 0.8 + Math.random() * 0.6,
      });
    }
    return items;
  }, []);

  return (
    <div className="explosion-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="explosion-heart"
          style={{
            left: originX,
            top: originY,
          }}
          initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0.3, 1.2, 0],
            opacity: [1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
        >
          <HeartSVG color={p.color} size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ====== AMBIENT FLOATING HEARTS ====== */
function AmbientHearts() {
  const hearts = useMemo(() => {
    const items = [];
    const colors = ['#FF6B9D', '#FFB3CC', '#D1C4E9', '#F8BBD0', '#B39DDB'];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 12 + Math.random() * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.2,
      });
    }
    return items;
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="ambient-heart"
          style={{
            left: h.left,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          <HeartSVG color={h.color} size={h.size} />
        </div>
      ))}
    </>
  );
}

/* ====== SPARKLES & GLOWING ORBS ====== */
function Sparkles() {
  const sparkles = useMemo(() => {
    const items = [];
    const types = ['dot', 'star', 'diamond'];
    for (let i = 0; i < 45; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      items.push({
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: type === 'diamond' ? 3 + Math.random() * 5 : 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 2 + Math.random() * 4,
      });
    }
    return items;
  }, []);

  const orbs = useMemo(() => {
    const colors = [
      'rgba(255, 107, 157, 0.3)',
      'rgba(209, 196, 233, 0.4)',
      'rgba(248, 187, 208, 0.3)',
      'rgba(179, 157, 219, 0.35)',
      'rgba(255, 143, 180, 0.25)',
    ];
    return colors.map((color, i) => ({
      id: i,
      color,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 80 + Math.random() * 120,
      duration: 8 + Math.random() * 10,
      delay: i * 2.5,
    }));
  }, []);

  return (
    <>
      {/* Glowing background orbs */}
      {orbs.map((o) => (
        <div
          key={`orb-${o.id}`}
          className="glow-orb"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: o.color,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className={`sparkle sparkle--${s.type}`}
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
    </>
  );
}

/* ====== MAIN APP ====== */
export default function App() {
  const [exploded, setExploded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [explosionOrigin, setExplosionOrigin] = useState({ x: 0, y: 0 });

  const handleTap = useCallback((e) => {
    if (exploded) return;

    // Get tap position for explosion origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setExplosionOrigin({ x, y });
    setExploded(true);

    // Show content after explosion settles
    setTimeout(() => {
      setShowContent(true);
    }, 900);
  }, [exploded]);

  return (
    <div className="app">
      {/* Ambient background effects */}
      <AmbientHearts />
      <Sparkles />

      {/* Big tappable heart */}
      <AnimatePresence>
        {!exploded && (
          <motion.div
            className="heart-container"
            onClick={handleTap}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.5,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            <div className="main-heart">
              <BigHeart />
            </div>
            <motion.span
              className="tap-hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              tap me 💕
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion particles */}
      <AnimatePresence>
        {exploded && !showContent && (
          <ExplosionParticles originX={explosionOrigin.x} originY={explosionOrigin.y} />
        )}
      </AnimatePresence>

      {/* Revealed content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="content-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo */}
            <motion.div
              className="photo-wrapper"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 20,
                delay: 0.1,
              }}
            >
              <img
                src="/photo.jpg"
                alt="Us together 💜"
                className="photo"
              />
            </motion.div>

            {/* Message card */}
            <motion.div
              className="message-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 20,
                delay: 0.4,
              }}
            >
              <h1 className="apology-title">I'm Sorry 🥺</h1>
              <p className="apology-text">
                I'm sorry for being such a dummy. You mean the world to me, 
                and I never want to see you upset because of me. 
                I promise to be better — because you deserve nothing less. 💜
              </p>
              <hr className="divider" />
              <p className="compliment-text">
                "You're the most beautiful soul I've ever known. 
                Every moment with you is magic. ✨"
              </p>
              <div className="kannada-section">
                <p className="kannada-label">in Kannada, just for you 💜</p>
                <p className="kannada-text">
                  ನಂಗೆ ತುಂಬಾ sorry ಕಣೆ 🥺 ನೀನು ನಂಗೆ ಎಷ್ಟು important ಅಂತ 
                  ನಂಗೆ ಗೊತ್ತು. ನಿನ್ನನ್ನ ನೋಯಿಸೋಕೆ ನಂಗೆ ಇಷ್ಟ ಇಲ್ಲ. 
                  ಇನ್ಮೇಲೆ ನಾನು ಚೆನ್ನಾಗಿ ಇರ್ತೀನಿ, promise. 
                  ನೀನು ನನ್ನ ಪ್ರಪಂಚ 💜
                </p>
              </div>
            </motion.div>

            {/* Bottom hearts */}
            <motion.div
              className="bottom-hearts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
            >
              <span>💜</span>
              <span>🤍</span>
              <span>💜</span>
              <span>🤍</span>
              <span>💜</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
