import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ── Step data ─────────────────────────────────────────────────────────
const steps = [
  {
    id: '01',
    tag: 'Sourcing',
    title: 'Raw Material\nCollection',
    description:
      'Agro and wood waste procured from local farmers, compiled into bales — creating supplemental income while repurposing waste that would otherwise be burned in fields.',
  },
  {
    id: '02',
    tag: 'Preparation',
    title: 'Processing\n& Cleaning',
    description:
      'Bales are cleaned, dried, and conditioned using precision thermal technology, removing moisture to optimal levels before the next stage begins.',
  },
  {
    id: '03',
    tag: 'Production',
    title: 'Pelletization',
    description:
      'Conditioned material is compressed under high pressure into dense, energy-rich biomass pellets through our precision-engineered die system.',
  },
  {
    id: '04',
    tag: 'Delivery',
    title: 'Green Energy\nGeneration',
    description:
      'Finished pellets are deployed by industrial partners for co-firing, significantly reducing net CO₂ emissions while maintaining full energy output.',
  },
];

// ── SVG art — one per step ─────────────────────────────────────────────

// Step 1: Scattered organic dots
const ArtScatter = ({ visible }: { visible: boolean }) => {
  const pts = [
    [72, 110], [130, 80], [195, 95], [255, 75], [310, 105],
    [85, 160], [155, 145], [220, 135], [280, 155], [335, 140],
    [100, 210], [170, 225], [235, 205], [300, 215], [350, 190],
    [60, 260], [140, 270], [210, 255], [270, 265], [325, 250],
    [90, 310], [160, 295], [230, 305], [290, 310], [355, 295],
  ];
  return (
    <svg viewBox="0 0 420 380" className="w-full h-full">
      {pts.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy}
          r={4 + (i % 3) * 1.5}
          fill="none"
          stroke="rgba(76,175,80,0.7)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: i * 0.035, duration: 0.45, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
};

// Step 2: Lines converging into order
const ArtConverge = ({ visible }: { visible: boolean }) => {
  const paths = [
    'M 60 90 C 140 90 220 170 340 170',
    'M 60 130 C 140 130 220 185 340 185',
    'M 60 165 C 140 165 220 195 340 200',
    'M 60 200 C 140 200 220 205 340 210',
    'M 60 235 C 140 235 220 215 340 220',
    'M 60 270 C 140 270 220 230 340 230',
    'M 60 305 C 140 305 220 245 340 245',
  ];
  return (
    <svg viewBox="0 0 420 380" className="w-full h-full">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={i === 3 ? 'rgba(76,175,80,0.9)' : 'rgba(76,175,80,0.45)'}
          strokeWidth={i === 3 ? 2.5 : 1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: i * 0.08, duration: 0.9, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
};

// Step 3: Grid of pellets (rounded rects)
const ArtPellets = ({ visible }: { visible: boolean }) => {
  const cols = 6;
  const rows = 5;
  const rects = Array.from({ length: rows * cols }, (_, i) => ({
    col: i % cols,
    row: Math.floor(i / cols),
  }));
  return (
    <svg viewBox="0 0 420 380" className="w-full h-full">
      {rects.map(({ col, row }, i) => (
        <motion.rect
          key={i}
          x={72 + col * 46}
          y={110 + row * 34}
          width={34}
          height={20}
          rx={10}
          fill="rgba(46,125,50,0.25)"
          stroke="rgba(76,175,80,0.85)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            delay: i * 0.025,
            duration: 0.4,
            ease: 'backOut',
          }}
          style={{ transformOrigin: `${72 + col * 46 + 17}px ${110 + row * 34 + 10}px` }}
        />
      ))}
    </svg>
  );
};

// Step 4: Radial energy burst
const ArtEnergy = ({ visible }: { visible: boolean }) => {
  const spokes = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 360) / 16;
    const rad = (angle * Math.PI) / 180;
    const r1 = 50, r2 = 70 + (i % 3) * 25;
    return {
      x1: 210 + Math.cos(rad) * r1,
      y1: 190 + Math.sin(rad) * r1,
      x2: 210 + Math.cos(rad) * r2,
      y2: 190 + Math.sin(rad) * r2,
    };
  });
  return (
    <svg viewBox="0 0 420 380" className="w-full h-full">
      {/* Concentric rings */}
      {[40, 80, 130, 165].map((r, i) => (
        <motion.circle
          key={i}
          cx="210" cy="190" r={r}
          fill="none"
          stroke="rgba(76,175,80,0.15)"
          strokeWidth="1"
          strokeDasharray="6 4"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
          style={{ transformOrigin: '210px 190px' }}
        />
      ))}
      {/* Core */}
      <motion.circle
        cx="210" cy="190" r="38"
        fill="rgba(46,125,50,0.35)"
        stroke="rgba(76,175,80,0.9)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        style={{ transformOrigin: '210px 190px' }}
      />
      {/* Spokes */}
      {spokes.map((s, i) => (
        <motion.line
          key={i}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="rgba(76,175,80,0.7)"
          strokeWidth={i % 2 === 0 ? 2 : 1}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: 0.35 + i * 0.04, duration: 0.45 }}
        />
      ))}
    </svg>
  );
};

const stepArts = [ArtScatter, ArtConverge, ArtPellets, ArtEnergy];

// ── Individual step slide ──────────────────────────────────────────────
const StepSlide = ({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const total = steps.length;
  const start = index / total;
  const end = (index + 1) / total;
  const buf = 0.025;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + buf, end - buf, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start - buf * 2, start + buf, end - buf, end + buf * 2],
    [72, 0, 0, -72]
  );

  const Art = stepArts[index];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y }}
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-16">

        {/* Left — editorial content */}
        <div>
          <div className="flex items-center gap-4 mb-7">
            <span className="text-primary-400 text-[10px] font-mono uppercase tracking-[0.4em]">
              Step {step.id}
            </span>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-300 border border-primary-400/25 rounded-full">
              {step.tag}
            </span>
          </div>

          <h3
            className="font-serif font-bold text-white leading-[0.93] tracking-tight mb-7"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)' }}
          >
            {step.title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>

          <div className="w-10 h-0.5 bg-primary-500/60 mb-7" />

          <p className="text-white/45 text-base leading-[1.85] font-light max-w-sm">
            {step.description}
          </p>

          {/* Step progress dots */}
          <div className="flex items-center gap-2 mt-10">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  i === index ? 'w-7 h-2 bg-primary-400' : 'w-2 h-2 bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right — SVG art + ghost step number */}
        <div className="relative flex items-center justify-center h-64 md:h-80 lg:h-96">
          {/* Giant ghost number */}
          <span
            className="absolute font-serif font-bold text-white pointer-events-none select-none"
            style={{
              fontSize: 'clamp(9rem, 22vw, 16rem)',
              opacity: 0.04,
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}
          >
            {step.id}
          </span>

          {/* Art */}
          <div className="relative z-10 w-64 h-64 md:w-80 md:h-72 lg:w-full lg:h-80 max-w-md">
            <Art visible />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main section ───────────────────────────────────────────────────────
const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const indicatorY = useTransform(scrollYProgress, [0, 1], [0, 44]);

  return (
    // 500vh = 4 steps × 100vh + 100vh buffer
    <div ref={containerRef} className="relative bg-[#0a1a0c]" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen bg-[#0a1a0c] overflow-hidden">

        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(46,125,50,0.09) 0%, transparent 70%)',
          }}
        />

        {/* Section label bar */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-6 py-5 border-b border-white/[0.06]">
              <span className="text-white/30 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
                03 — Process
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-white/20 text-[10px] font-mono shrink-0">
                Scroll to explore each step
              </span>
            </div>
          </div>
        </div>

        {/* Step slides */}
        <div className="absolute inset-0">
          {steps.map((step, index) => (
            <StepSlide
              key={step.id}
              step={step}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Scroll progress pill — bottom right */}
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2">
          <div
            className="w-0.5 rounded-full bg-white/10 overflow-hidden relative"
            style={{ height: '56px' }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary-400 rounded-full"
              style={{ height: '12px', y: indicatorY }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProcessSection;
