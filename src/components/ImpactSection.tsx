import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ── Animated counter ──────────────────────────────────────────────────
const Counter = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
  inView,
  delay = 0,
  className = '',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  inView: boolean;
  delay?: number;
  className?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, target, delay, duration]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

// ── Horizontal comparison bar ─────────────────────────────────────────
const CompareBar = ({
  label,
  coalVal,
  biomassVal,
  unit,
  inView,
  delay = 0,
}: {
  label: string;
  coalVal: number;
  biomassVal: number;
  unit: string;
  inView: boolean;
  delay?: number;
}) => {
  const max = Math.max(coalVal, biomassVal);
  const coalPct = (coalVal / max) * 100;
  const biomassPct = (biomassVal / max) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-white/55 text-xs uppercase tracking-widest font-medium">{label}</span>
        <span className="text-white/20 text-[10px] font-mono">{unit}</span>
      </div>

      {/* Coal bar */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-red-400/60 w-14 shrink-0 text-right">Coal</span>
        <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-red-500/55"
            initial={{ width: 0 }}
            animate={inView ? { width: `${coalPct}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[10px] text-white/25 w-7 shrink-0 tabular-nums">{coalVal}</span>
      </div>

      {/* Biomass bar */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-primary-400/70 w-14 shrink-0 text-right">Biomass</span>
        <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary-500"
            initial={{ width: 0 }}
            animate={inView ? { width: `${biomassPct}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay: delay + 0.12, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[10px] text-white/25 w-7 shrink-0 tabular-nums">{biomassVal}</span>
      </div>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────
const ImpactSection = () => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [chartRef, chartInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const compareData = [
    { label: 'CO₂ Emissions', coalVal: 95, biomassVal: 10, unit: 'g/MJ' },
    { label: 'Sulfur Content', coalVal: 85, biomassVal: 10, unit: 'relative' },
    { label: 'Particulate Matter', coalVal: 75, biomassVal: 18, unit: 'relative' },
    { label: 'Renewability', coalVal: 0, biomassVal: 100, unit: '%' },
  ];

  return (
    <section className="relative bg-[#071a09] overflow-hidden py-20 md:py-32">

      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 100%, rgba(46,125,50,0.14) 0%, transparent 65%)',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section label */}
        <div ref={headerRef} className="flex items-center gap-6 pb-14 border-b border-white/[0.05]">
          <span className="text-white/30 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
            04 — Impact
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>

        {/* Section heading */}
        <div className="py-14 md:py-20">
          <motion.h2
            className="font-serif font-bold text-white leading-[0.93] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Environmental{' '}
            <span className="text-primary-400 italic">Impact</span>
          </motion.h2>
          <motion.p
            className="text-white/35 text-[0.9375rem] leading-relaxed font-light max-w-lg mt-5"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Every pellet produced is a quantified step toward a carbon-neutral
            industrial sector. These are the numbers that matter.
          </motion.p>
        </div>

        {/* ── Hero split: big number LEFT / bar chart RIGHT ── */}
        <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: primary giant stat */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Giant counter */}
              <div
                className="font-bold text-white leading-none tabular-nums"
                style={{ fontSize: 'clamp(5rem, 13vw, 11rem)' }}
              >
                <Counter target={38} suffix="M" inView={heroInView} delay={0.1} />
              </div>

              <div className="mt-4 mb-7 border-l-2 border-primary-500 pl-4">
                <p className="text-white/60 text-sm leading-relaxed">
                  Metric tons of CO₂ emissions reduced annually through 5%
                  biomass co-firing with coal.
                </p>
              </div>

              {/* Two secondary stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/[0.07] rounded-xl p-5">
                  <div
                    className="font-bold text-white leading-none tabular-nums mb-2"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                  >
                    <Counter target={65} suffix="%" inView={heroInView} delay={0.4} />
                  </div>
                  <div className="text-[10px] text-white/35 uppercase tracking-widest">
                    Emission Reduction
                  </div>
                </div>
                <div className="border border-white/[0.07] rounded-xl p-5">
                  <div
                    className="font-bold text-white leading-none tabular-nums mb-2"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                  >
                    <Counter target={90} suffix="%" inView={heroInView} delay={0.55} />
                  </div>
                  <div className="text-[10px] text-white/35 uppercase tracking-widest">
                    Carbon Neutral
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: horizontal bar comparison chart */}
          <div ref={chartRef} className="lg:col-span-7">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {/* Chart header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                <span
                  className="font-serif font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                >
                  Coal vs.{' '}
                  <span className="text-primary-400">Biomass</span>
                </span>
                <div className="flex items-center gap-4 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 rounded-full bg-red-500/55" />
                    <span className="text-white/30 uppercase tracking-widest">Coal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 rounded-full bg-primary-500" />
                    <span className="text-white/30 uppercase tracking-widest">Biomass</span>
                  </div>
                </div>
              </div>

              {/* Bars */}
              {compareData.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={chartInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <CompareBar
                    label={d.label}
                    coalVal={d.coalVal}
                    biomassVal={d.biomassVal}
                    unit={d.unit}
                    inView={chartInView}
                    delay={i * 0.1}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;
