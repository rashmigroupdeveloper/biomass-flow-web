import React, { useEffect, useRef, useState } from 'react';
import { SEO } from '@/components/SEO';
import { organizationSchema, webPageSchema } from '@/lib/schemas';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import MarqueeTicker from '@/components/MarqueeTicker';
import ScrollRevealLine from '@/components/ScrollRevealLine';

gsap.registerPlugin(ScrollTrigger);

// ── Scrub-tied animated counter ────────────────────────────────────
function ScrubCounter({ target, suffix = '', label, sub }: {
  target: number; suffix?: string; label: string; sub: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString();
        },
      },
    });
    return () => {
      tween.kill();
    };
  }, [target]);

  return (
    <motion.div
      ref={ref}
      className="py-8 pr-8 border-r border-b border-gray-100 last:border-r-0 md:border-b-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="font-bold text-gray-900 leading-none tabular-nums mb-2"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        <span ref={numRef}>0</span>{suffix}
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">{label}</div>
      <div className="text-[11px] text-primary-500/70 mt-1 font-mono">{sub}</div>
    </motion.div>
  );
}

const values = [
  {
    id: '01',
    name: 'Integrity',
    body: 'We conduct business with transparency — certifications are not marketing claims, they are audited commitments with numbers attached.',
  },
  {
    id: '02',
    name: 'Innovation',
    body: 'Continuous R&D in pelletization, carbonization, and activation processes to improve product performance and reduce input costs.',
  },
  {
    id: '03',
    name: 'Sustainability',
    body: 'Every tonne of product we make converts waste that would have been burned in fields into clean, tradeable energy — a net positive for the environment.',
  },
];

const VALUE_TICKER = [
  { text: 'Integrity', accent: true },
  { text: 'Innovation', accent: false },
  { text: 'Sustainability', accent: true },
  { text: 'Zero Field Burning', accent: false },
  { text: 'Clean Energy', accent: true },
  { text: 'Circular Economy', accent: false },
  { text: 'ISO Certified', accent: true },
  { text: 'Agro Waste', accent: false },
];

// ── GSAP parallax hero ─────────────────────────────────────────────
function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBg = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(layerBg.current, {
        y: '22%', ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(contentRef.current, {
        y: '14%', opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '55% top', scrub: true },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '100dvh', minHeight: 600, background: '#0a1a0c', overflow: 'hidden' }}
    >
      {/* Atmosphere layer */}
      <div
        ref={layerBg}
        className="absolute pointer-events-none"
        style={{
          inset: 0, top: '-10%', height: '120%',
          background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(46,125,50,0.2) 0%, transparent 68%)',
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(76,175,80,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,175,80,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ height: 1, background: 'rgba(76,175,80,0.1)', top: '44%' }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Label bar */}
      <div className="absolute top-36 left-0 right-0 container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">About Us</span>
          <ScrollRevealLine color="rgba(255,255,255,0.05)" delay={0.4} />
        </motion.div>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center container mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-8 lg:pr-16">
            <SplitReveal
              as="h1"
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.91, letterSpacing: '-0.025em' }}
              delay={0.1}
              mode="chars"
            >
              Making industrial energy sustainable since 2015.
            </SplitReveal>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end mt-8 lg:mt-0 lg:pb-3">
            <motion.p
              className="text-white/38 text-[0.9375rem] leading-[1.85] font-light mb-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.9 }}
            >
              Rashmi 6 Paradigm Limited — a venture of the Rashmi Group — manufactures premium biomass energy products that replace fossil fuels with clean, renewable alternatives produced from agricultural waste.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary-400/70 text-sm hover:text-primary-400 transition-colors"
              >
                Work with us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-px mx-auto bg-white/18"
          style={{ height: 52 }}
          animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
      </motion.div>
    </section>
  );
}

// ── Full-viewport number ───────────────────────────────────────────
function BigNumberMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: 38,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        end: 'center 40%',
        scrub: 1.5,
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString();
        },
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: '#071a09' }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          <div className="lg:col-span-7">
            <div
              className="font-serif font-bold leading-none tracking-tighter select-none"
              style={{
                fontSize: 'clamp(6rem, 20vw, 18rem)',
                color: 'rgba(46,125,50,0.12)',
                lineHeight: 1,
              }}
            >
              <span ref={numRef}>0</span>
              <span style={{ color: 'rgba(46,125,50,0.08)' }}>M</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SplitReveal
              as="h2"
              className="font-serif font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              mode="words"
            >
              Metric tons of CO₂ reduced every single year.
            </SplitReveal>
            <motion.p
              className="text-white/35 text-sm leading-[1.85] mt-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Each tonne of agro-waste we process replaces coal that would have released CO₂. At 20,000 MT annual capacity, the offset compounds every cycle.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main page ──────────────────────────────────────────────────────
const About = () => {
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.1 });
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.1 });

  return (
    <>
      <SEO
        title="About Us | Rashmi 6 Paradigm"
        description="Learn about Rashmi 6 Paradigm Limited — our story, vision, mission and core values. Leading sustainable biomass manufacturer since 2015."
        canonical="/about"
        jsonLd={[
          organizationSchema,
          webPageSchema('About Us', 'Learn about Rashmi 6 Paradigm Limited — our story, vision, mission and core values.', 'https://rashmi6paradigm.com/about'),
        ]}
      />

      <div className="relative" style={{ overflowX: 'clip' }}>

        <ParallaxHero />

        {/* ── Scrub-tied stats ── */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              <ScrubCounter target={5} suffix="+" label="Years in Operation" sub="Since 2015" />
              <ScrubCounter target={20} suffix="K+" label="MT Annual Capacity" sub="Bio Pellets" />
              <ScrubCounter target={38} suffix="M" label="Metric Tons CO₂" sub="Reduced annually" />
              <ScrubCounter target={100} suffix="%" label="Agro-waste Sourced" sub="From local farmers" />
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section ref={storyRef} className="bg-white py-20 md:py-28 border-t border-gray-100">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-6 pb-12 mb-12">
              <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">Our Story</span>
              <ScrollRevealLine color="rgba(0,0,0,0.08)" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                <SplitReveal
                  as="h2"
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                  mode="words"
                >
                  Born from a belief that industrial energy can be responsible.
                </SplitReveal>
              </div>

              <motion.div
                className="lg:col-span-7 space-y-5 text-gray-500 text-[0.9375rem] leading-[1.85]"
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p>
                  Founded in 2015 as a venture of the Rashmi Group, Rashmi 6 Paradigm Limited was established at a moment when India's industrial energy sector was under growing pressure to reduce its carbon footprint. We saw a clear opportunity: agro-waste was being burned in fields across Eastern India while coal was being burned in factories — two problems that could solve each other.
                </p>
                <p>
                  Our state-of-the-art manufacturing facility in Kharagpur processes agricultural residues — rice husk, groundnut shells, mustard stalks, sawdust — into certified Bio Pellets, high-performance Activated Carbon, and Charcoal Briquettes. The process creates supplemental income for farmers, eliminates open-field burning, and provides industrial operators with a cleaner, cost-stable fuel alternative.
                </p>
                <p>
                  Today, Rashmi 6 Paradigm supplies industrial customers across power generation, water treatment, food processing, and export markets. We hold ISO 9001:2015 certification and comply with ENplus standards for bio pellet quality.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Big number moment ── */}
        <BigNumberMoment />

        {/* ── Vision & Mission ── */}
        <section className="py-20 md:py-28" style={{ background: '#f7faf7' }}>
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <VisionBlock
                label="Vision"
                text="To be the global standard-setter for sustainable biomass energy — making clean industrial fuel as accessible and cost-effective as coal."
              />
              <VisionBlock
                label="Mission"
                text="To manufacture ISO-certified biomass products that exceed customer performance requirements while building a supply chain that benefits farmers, communities, and the environment."
                right
              />
            </div>
          </div>
        </section>

        {/* ── Values marquee ── */}
        <div
          className="py-4 border-y"
          style={{ background: '#0a1a0c', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <MarqueeTicker items={VALUE_TICKER} speed={22} direction="right" />
        </div>

        {/* ── Core Values ── */}
        <section ref={valuesRef} className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-6 pb-12 mb-12">
              <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">Core Values</span>
              <ScrollRevealLine color="rgba(0,0,0,0.08)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {values.map((v, i) => (
                <motion.div
                  key={v.id}
                  className="py-8 pr-8 border-r border-gray-100 last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest block mb-4">{v.id}</span>
                  <h3 className="font-serif font-bold text-gray-900 text-xl mb-3">{v.name}</h3>
                  <p className="text-gray-500 text-sm leading-[1.8]">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Rashmi Group ── */}
        <section className="py-20 md:py-28 relative" style={{ background: '#0a1a0c' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 40% 50% at 50% 0%, rgba(46,125,50,0.1) 0%, transparent 60%)' }}
          />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.35em] block mb-6">
                  Part of Rashmi Group
                </span>
                <SplitReveal
                  as="h2"
                  className="font-serif font-bold text-white leading-tight tracking-tight mb-6"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
                  mode="words"
                >
                  Backed by one of Eastern India's most trusted industrial conglomerates.
                </SplitReveal>
                <motion.p
                  className="text-white/38 text-[0.9375rem] leading-[1.85] mb-8 max-w-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  The Rashmi Group operates across steel, power, and infrastructure with facilities across West Bengal, Jharkhand, and Odisha. Rashmi 6 Paradigm is the group's clean energy vertical — applying the same engineering rigor to biomass that built the group's industrial reputation.
                </motion.p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300"
                  style={{ background: 'rgba(76,175,80,0.85)', border: '1px solid rgba(76,175,80,0.25)' }}
                >
                  Get in Touch
                </Link>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                <motion.div
                  className="w-full max-w-xs aspect-square rounded-3xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src="/logo.png"
                    alt="Rashmi 6 Paradigm"
                    className="h-16 w-auto"
                    style={{ filter: 'brightness(0) invert(0.35)' }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

function VisionBlock({ label, text, right }: { label: string; text: string; right?: boolean }) {
  return (
    <div className={`py-10 md:py-16 ${right ? 'md:pl-16' : 'md:pr-16 md:border-r border-gray-200 border-b md:border-b-0 pb-12 md:pb-16'}`}>
      <motion.span
        className="text-[10px] font-mono text-primary-500/55 uppercase tracking-widest block mb-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.span>
      <SplitReveal
        as="p"
        className="font-serif font-bold text-gray-900 leading-tight tracking-tight"
        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
        mode="words"
      >
        {text}
      </SplitReveal>
    </div>
  );
}

export default About;
