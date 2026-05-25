import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [bentoRef, bentoInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* ── Section label ── */}
        <div className="flex items-center gap-6 pt-20 pb-10 border-b border-gray-100">
          <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
            01 — About
          </span>
          <div className="flex-1 h-px bg-gray-100" />
          <span className="hidden sm:block text-gray-300 text-[10px] font-mono uppercase tracking-[0.25em] shrink-0">
            Rashmi 6 Paradigm · Est. 2015
          </span>
        </div>

        {/* ── Editorial heading grid ── */}
        <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-16 md:py-24">

          {/* Heading — 8 of 12 columns */}
          <div className="lg:col-span-8 lg:pr-20">
            <motion.h2
              className="font-serif font-bold text-gray-900 leading-[0.93] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
              {...fadeUp(0)}
              animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            >
              Leading the{' '}
              <span className="text-primary-600 italic">Green Revolution</span>
              <br />
              in Energy
            </motion.h2>

            <motion.div
              className="w-16 h-0.5 bg-primary-500 mt-8"
              initial={{ scaleX: 0, originX: '0%' }}
              animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            />
          </div>

          {/* Body copy — 4 of 12 columns, bottom-aligned */}
          <div className="lg:col-span-4 flex flex-col justify-end mt-10 lg:mt-0">
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.0, delay: 0.38 }}
            >
              <p className="text-[0.9375rem] text-gray-500 leading-[1.85] font-light">
                Rashmi 6 Paradigm Limited is a venture of the Rashmi Group, producing
                premium biomass pellets, activated carbon, and charcoal products that
                help industries eliminate fossil fuel dependence.
              </p>
              <p className="text-[0.9375rem] text-gray-500 leading-[1.85] font-light">
                With facilities in Kolkata and Kharagpur, we combine cutting-edge
                engineering with 100% sustainable sourcing — powering industries while
                preserving the planet for generations to come.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold group pt-1"
              >
                <span className="border-b border-primary-200 group-hover:border-primary-600 pb-0.5 transition-colors duration-200">
                  Our full story
                </span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1.5 transition-transform duration-200"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Bento stats grid ── */}
        <div ref={bentoRef} className="grid grid-cols-12 gap-3 md:gap-4 pb-6">

          {/* Stat 1 — 5/12 wide, tallest */}
          <motion.div
            className="col-span-6 md:col-span-5 border border-gray-100 rounded-2xl p-7 md:p-10 flex flex-col justify-between min-h-[140px] md:min-h-[180px]"
            initial={{ opacity: 0, y: 24 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.0 }}
          >
            <div className="text-[2.5rem] md:text-[3.25rem] font-bold text-gray-900 leading-none tabular-nums">
              5+
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-medium mt-3">
              Years of Excellence
            </div>
          </motion.div>

          {/* Stat 2 — 4/12 */}
          <motion.div
            className="col-span-6 md:col-span-4 border border-gray-100 rounded-2xl p-7 md:p-10 flex flex-col justify-between min-h-[140px] md:min-h-[180px]"
            initial={{ opacity: 0, y: 24 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="text-[2.5rem] md:text-[3.25rem] font-bold text-gray-900 leading-none tabular-nums">
              20K+
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-medium mt-3">
              Metric Tons / Year
            </div>
          </motion.div>

          {/* Stat 3 — 3/12, accent color */}
          <motion.div
            className="col-span-12 md:col-span-3 bg-primary-600 border border-primary-600 rounded-2xl p-7 md:p-10 flex flex-col justify-between min-h-[100px] md:min-h-[180px]"
            initial={{ opacity: 0, y: 24 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            <div className="text-[2.5rem] md:text-[3.25rem] font-bold text-white leading-none tabular-nums">
              38M
            </div>
            <div className="text-[10px] text-white/60 uppercase tracking-[0.25em] font-medium mt-3">
              CO₂ Tons Saved
            </div>
          </motion.div>

          {/* Stat 4 — full-width accent strip */}
          <motion.div
            className="col-span-12 bg-gray-50 border border-gray-100 rounded-2xl px-7 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.24 }}
          >
            <div className="text-[2rem] font-bold text-gray-900 leading-none tabular-nums">
              100%
            </div>
            <div className="flex-1 sm:text-right">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-medium">
                Sustainable Sourcing
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                Every raw material responsibly sourced from agricultural waste
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Micro footer ── */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12 py-5 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
          <span className="text-[10px] text-gray-300 uppercase tracking-[0.28em]">
            Kharagpur, West Bengal, India
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
