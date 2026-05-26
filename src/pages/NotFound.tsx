import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const NotFound = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      if (headingRef.current) {
        headingRef.current.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center relative"
        style={{ background: '#071a09', overflowX: 'clip' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 45% 45% at 50% 50%, rgba(46,125,50,0.1) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Ghost number - mouse-tracked */}
          <div
            ref={headingRef}
            className="font-serif font-bold text-white/[0.06] select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(8rem, 28vw, 22rem)',
              letterSpacing: '-0.05em',
              transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            404
          </div>

          <motion.div
            className="-mt-12 md:-mt-20 lg:-mt-28 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-serif font-bold text-white leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
            >
              This page has been composted.
            </h1>
            <p className="text-white/35 text-[0.9375rem] mb-10 max-w-sm mx-auto leading-relaxed">
              It returned to the earth. Let us help you find where you were headed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300"
                style={{ background: 'rgba(76,175,80,0.9)', border: '1px solid rgba(76,175,80,0.3)' }}
              >
                ← Return Home
              </Link>
              <div className="flex items-center gap-5">
                {[
                  { label: 'Products', to: '/products/bio-pellets' },
                  { label: 'About', to: '/about' },
                  { label: 'Contact', to: '/contact' },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="text-white/35 text-sm hover:text-white/70 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 flex justify-center w-full">
          <span className="text-white/15 text-[10px] font-mono uppercase tracking-[0.4em]">
            Rashmi 6 Paradigm · Sustainable Biomass Energy
          </span>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
