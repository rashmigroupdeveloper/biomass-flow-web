import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const features = [
  'Fully automated PLC-controlled systems',
  'Advanced drying and pelleting technology',
  'Spark detection and safety systems',
  'Quality-controlled production lines',
  'Integrated utilities and logistics support',
];

const InfrastructureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(containerRef, { triggerOnce: true, margin: '-10% 0px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 48 },
    animate: headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 },
    transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative bg-white overflow-hidden py-20 md:py-28" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        {/* ── Section label ── */}
        <div className="flex items-center gap-6 pb-10 border-b border-gray-100">
          <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
            03 — Infrastructure
          </span>
          <div className="flex-1 h-px bg-gray-100" />
          <span className="hidden sm:block text-gray-300 text-[10px] font-mono uppercase tracking-[0.25em] shrink-0">
            Rashmi 6 Paradigm · Kharagpur Facility
          </span>
        </div>

        {/* ── Editorial heading grid ── */}
        <div className="pt-16 pb-12">
          <motion.h2
            className="font-serif font-bold text-gray-900 leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.8rem)' }}
            {...fadeUp(0)}
          >
            Advanced Manufacturing{' '}
            <span className="text-primary-600 italic font-normal">Infrastructure</span>
          </motion.h2>
          <motion.div
            className="w-20 h-0.5 bg-primary-500 mt-6"
            initial={{ scaleX: 0, originX: '0%' }}
            animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          />
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text and Features */}
          <div className="lg:col-span-6 space-y-8">
            <motion.p
              className="text-[1.05rem] md:text-[1.1rem] text-gray-600 leading-[1.8] font-light"
              {...fadeUp(0.1)}
            >
              Our world-class biomass manufacturing facility at Kharagpur, West Bengal, is equipped
              with advanced automated systems and globally trusted technologies to ensure consistent
              product quality and operational efficiency.
            </motion.p>

            <motion.div className="space-y-4 pt-2" {...fadeUp(0.2)}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                The facility integrates:
              </h4>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-[1rem] leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              className="text-[1rem] text-gray-500 leading-[1.7] font-light pt-4 border-t border-gray-100"
              {...fadeUp(0.3)}
            >
              With strong infrastructure, large-scale production capabilities, and stringent quality
              standards, we deliver reliable renewable fuel solutions for domestic and international
              industries.
            </motion.p>
          </div>

          {/* Right Column: Image Bento */}
          <div className="lg:col-span-6">
            <motion.div
              className="grid grid-cols-2 gap-4 h-[500px] md:h-[600px]"
              {...fadeUp(0.4)}
            >
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <img
                  src="/20240705_105126.jpg"
                  alt="Automated PLC-controlled systems"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                   <p className="text-white font-medium">Automated Manufacturing</p>
                </div>
              </div>
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                <img
                  src="/MBS_0100.JPG"
                  alt="Quality Control"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                <img
                  src="/MBS_0112.JPG"
                  alt="Advanced Drying Technology"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
