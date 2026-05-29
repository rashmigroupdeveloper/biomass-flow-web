import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'fuels',
    title: 'Biomass Fuels',
    desc: 'Advanced renewable energy alternatives',
    image: '/pel2.jpg',
    caption: 'High-density biomass pellets produced from agricultural residues.'
  },
  {
    id: 'biochar',
    title: 'Biochar Solutions',
    desc: 'Carbon sequestration & soil enhancement',
    image: '/green-plant-sprout-biochar-soil-biochar-increases-carbon-content-soil-increasing-its-fertility-providing-optimal-conditions-plant-growth.jpg',
    caption: 'Premium biochar promoting sustainable farming and carbon capture.'
  },
  {
    id: 'carbon',
    title: 'Carbon Solutions',
    desc: 'Activated carbon & industrial filtration',
    image: '/Charcoal_Briquettes.jpg',
    caption: 'High-surface-area activated carbon for water and air purification.'
  },
  {
    id: 'supply',
    title: 'Biomass Supply Chain',
    desc: 'Global sourcing & logistics compliance',
    image: '/pikaso_texttoimage_35mm-film-photography-indian-green-farm-with-bioch.jpeg',
    caption: 'Vast agricultural sourcing network ensuring stable global supply.'
  }
];

const AboutSection = () => {
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [bentoRef, bentoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
            01 — About Us
          </span>
          <div className="flex-1 h-px bg-gray-100" />
          <span className="hidden sm:block text-gray-300 text-[10px] font-mono uppercase tracking-[0.25em] shrink-0">
            Rashmi 6 Paradigm · Est. 2015
          </span>
        </div>

        {/* ── Editorial heading grid ── */}
        <div ref={headingRef} className="pt-16 pb-2">
          <motion.h2
            className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.8rem)' }}
            {...fadeUp(0)}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          >
            Building a{' '}
            <span className="text-primary-600 italic font-normal">Sustainable</span>
            <br />
            Industrial Future
          </motion.h2>
          <motion.div
            className="w-20 h-0.5 bg-primary-500 mt-6"
            initial={{ scaleX: 0, originX: '0%' }}
            animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          />
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 items-start">
          {/* Left Column: 3 Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              className="text-[0.98rem] md:text-[1.05rem] text-gray-600 leading-[1.85] font-light"
              {...fadeUp(0.1)}
              animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            >
              <strong>Rashmi 6 Paradigm Limited</strong> is the sustainable energy and advanced carbon solutions division of Rashmi Group, one of India’s leading diversified industrial conglomerates with a strong presence across Iron &amp; Steel, Cement, Power, Ferro Alloys, Mining, Infrastructure, and Global Trade.
            </motion.p>
            <motion.p
              className="text-[0.98rem] md:text-[1.05rem] text-gray-600 leading-[1.85] font-light"
              {...fadeUp(0.2)}
              animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            >
              Driven by innovation, sustainability, and industrial excellence, we specialize in renewable biomass fuels, biochar, activated carbon, lump charcoal, and global biomass sourcing solutions designed to help industries reduce carbon emissions and transition toward cleaner energy alternatives.
            </motion.p>
            <motion.p
              className="text-[0.98rem] md:text-[1.05rem] text-gray-600 leading-[1.85] font-light"
              {...fadeUp(0.3)}
              animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            >
              With advanced manufacturing infrastructure, global partnerships, and export-focused operations, we are committed to supporting industries worldwide in achieving ESG compliance, NET-ZERO targets, and long-term sustainability goals.
            </motion.p>

            <motion.div
              className="pt-4"
              {...fadeUp(0.4)}
              animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 border border-primary-600 hover:bg-primary-600 text-primary-600 hover:text-white font-semibold rounded-full transition-all duration-300 group text-sm"
              >
                <span>Read Our Corporate Journey</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1.5 transition-transform duration-200"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive Category/Image Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 group/img">
              {/* Overlay with current active caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 z-20 pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-400 font-semibold mb-1 block">
                  {categories[activeIndex].title}
                </span>
                <p className="text-white text-sm font-light leading-relaxed">
                  {categories[activeIndex].caption}
                </p>
              </div>

              {/* Dynamic Image Crossfade */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={categories[activeIndex].image}
                  alt={categories[activeIndex].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            {/* Selector list */}
            <div className="flex flex-col gap-2 bg-gray-50/70 p-2 rounded-2xl border border-gray-100">
              {categories.map((cat, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      // Reset timer on manual click
                      if (timerRef.current) clearInterval(timerRef.current);
                    }}
                    className={`flex items-start gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-left relative ${
                      isActive 
                        ? 'bg-white shadow-md shadow-gray-100 border border-gray-100' 
                        : 'hover:bg-white/40 border border-transparent'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold leading-none py-1 px-2 rounded ${
                        isActive ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-sm font-semibold transition-colors duration-200 ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {cat.title}
                      </span>
                      <span className="text-[11px] text-gray-400 font-light leading-none">
                        {cat.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
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
