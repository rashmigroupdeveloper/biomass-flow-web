import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Factory, Flame, Leaf, Lightbulb, Zap, Recycle } from 'lucide-react';

const collaborations = [
  'ANDRITZ',
  'Indian Institute of Technology',
  'Steel Authority of India Limited',
  'KAHL',
  'Prodesa',
];

const focusAreas = [
  {
    title: 'Industrial Decarbonization',
    icon: <Factory className="w-6 h-6 text-primary-500" />,
    description: 'Transitioning heavy industries towards sustainable, low-carbon operations.',
  },
  {
    title: 'Biomass Co-firing',
    icon: <Flame className="w-6 h-6 text-primary-500" />,
    description: 'Integrating renewable biomass with existing thermal power generation.',
  },
  {
    title: 'Carbon Reduction',
    icon: <Leaf className="w-6 h-6 text-primary-500" />,
    description: 'Advanced technologies designed to capture and mitigate emissions.',
  },
  {
    title: 'Sustainable Fuel Innovation',
    icon: <Lightbulb className="w-6 h-6 text-primary-500" />,
    description: 'Pioneering next-generation biofuels and torrefied biomass.',
  },
  {
    title: 'Combustion Efficiency',
    icon: <Zap className="w-6 h-6 text-primary-500" />,
    description: 'Optimizing burn rates and energy output for industrial applications.',
  },
  {
    title: 'Circular Economy',
    icon: <Recycle className="w-6 h-6 text-primary-500" />,
    description: 'Transforming agricultural and industrial waste into valuable resources.',
  },
];

const TechnologySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { triggerOnce: true, margin: '-10% 0px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Label */}
        <div className="flex items-center gap-6 pb-10 border-b border-gray-200">
          <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
            04 — Technology & Innovation
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-16">
          
          {/* Left Column: Heading and Collabs */}
          <div className="lg:col-span-5">
            <motion.h2
              className="font-serif font-bold text-gray-900 leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
              {...fadeUp(0)}
            >
              Technology-Driven <br />
              <span className="text-primary-600 italic font-normal">Sustainable</span> Solutions
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-[1.05rem] leading-[1.8] font-light mb-12"
              {...fadeUp(0.1)}
            >
              Innovation and continuous research form the foundation of our operations. We collaborate with globally recognized organizations and technology providers to develop next-generation biomass and carbon solutions.
            </motion.p>

            <motion.div {...fadeUp(0.2)}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-6">
                Technology & Research Collaborations
              </h4>
              <div className="flex flex-wrap gap-3">
                {collaborations.map((collab, idx) => (
                  <div 
                    key={idx}
                    className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all duration-300 text-sm font-medium text-gray-700 cursor-default shadow-sm"
                  >
                    {collab}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Focus Areas Grid */}
          <div className="lg:col-span-7">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-6 hidden lg:block">
              Core Focus Areas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focusAreas.map((area, idx) => (
                <motion.div
                  key={idx}
                  className="group p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1), ease: 'easeOut' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-50 transition-transform duration-500">
                    {area.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
