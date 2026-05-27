import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SplitReveal from '@/components/SplitReveal';
import MagneticButton from '@/components/MagneticButton';
import MarqueeTicker from '@/components/MarqueeTicker';
import ScrollRevealLine from '@/components/ScrollRevealLine';

const Footer = () => {
  const year = new Date().getFullYear();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer className="relative overflow-hidden" style={{ background: '#071a09' }}>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(46,125,50,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Marquee above CTA */}
      <div className="relative z-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)', paddingBlock: '10px' }}>
        <MarqueeTicker
          items={[
            { text: 'ISO 9001:2015 Certified', accent: true },
            { text: 'ENplus A1 Standard', accent: false },
            { text: 'FSC Chain of Custody', accent: true },
            { text: 'Bureau Veritas Audited', accent: false },
            { text: '20,000 MT Capacity', accent: true },
            { text: 'Zero Field Burning', accent: false },
            { text: 'Rashmi Group', accent: true },
            { text: 'Kharagpur, West Bengal', accent: false },
            { text: 'Bio Pellets · Activated Carbon · Charcoal Briquettes', accent: true },
          ]}
          speed={32}
          direction="right"
        />
      </div>

      {/* ── Main CTA block ── */}
      <div ref={ref} className="container mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-14 md:pb-20 relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-5 mb-12 md:mb-16">
          <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
            Work with us
          </span>
          <ScrollRevealLine color="rgba(255,255,255,0.05)" />
        </div>

        {/* Giant CTA heading */}
        <SplitReveal
          as="h2"
          className="font-serif font-bold text-white leading-[0.93] tracking-tight mb-10 md:mb-14"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7.5rem)' }}
          mode="chars"
          delay={0.1}
          stagger={0.015}
        >
          Powering Industry Sustainably.
        </SplitReveal>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            as="a"
            href="/contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: 'rgba(76,175,80,0.15)',
              border: '1px solid rgba(76,175,80,0.35)',
              color: 'rgba(76,175,80,0.95)',
            }}
          >
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>

          <a
            href="mailto:bioenergy.tender@rashmigroup.com"
            className="text-white/35 text-sm hover:text-white/60 transition-colors font-mono"
          >
            bioenergy.tender@rashmigroup.com
          </a>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t relative z-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/logo.png"
                alt="Rashmi 6 Paradigm"
                className="h-7 w-auto"
                style={{ filter: 'brightness(0) invert(0.3)' }}
              />
            </Link>

            {/* Center: minimal nav */}
            <div className="flex items-center gap-5">
              {[
                { label: 'Products', to: '/products/bio-pellets' },
                { label: 'About', to: '/about' },
                { label: 'Blog', to: '/blog' },
                { label: 'Certificates', to: '/certificates' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-[11px] text-white/20 font-mono">
              © {year} Rashmi 6 Paradigm Ltd.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
