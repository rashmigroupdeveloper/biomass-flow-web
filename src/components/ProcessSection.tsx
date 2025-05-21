
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleCanvas, { ParticleCanvasRef } from './ParticleCanvas';

const steps = [
  {
    id: 1,
    title: "Raw Material Collection",
    description: "Agro and Wood Waste is procured from farmers and compiled into bales, providing additional income for farmers while repurposing agricultural waste.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Processing & Cleaning",
    description: "Bales are processed in our state-of-the-art facility where they are cleaned, dried, and prepared for pelletization.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Pelletization",
    description: "Processed material is transformed into high-quality Bio Mass Pellets through our precision engineering process.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Green Energy Generation",
    description: "The final pellets are used by various industries for green power generation, reducing carbon footprints and supporting sustainable practices.",
    image: "/placeholder.svg"
  }
];

const ProcessSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const particleRef = useRef<ParticleCanvasRef>(null);

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Process section particle animation */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas
          id="processCanvas"
          options={{
            particleCount: 100,
            particleMinSize: 1,
            particleMaxSize: 3.5,
            baseHue: 100, // More yellowish green
            backgroundColor: 'rgba(76, 175, 80, 0.03)',
            flowIntensity: 1.5,
            flowDirection: 'custom' as const, // Custom flow pattern is now included in the types
            speedFactor: 0.7,
            connectionRadius: 100,
            connectionOpacity: 0.1,
            mouseInteraction: true,
            responsive: true,
            densityFactor: 0.00007,
          }}
          ref={particleRef}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 process-text">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading">
              Our <span className="section-heading-accent">Process</span>
            </h2>
            <div className="decorative-line mx-auto"></div>
          </motion.div>

          <motion.div
            className="glass-card max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="enhanced-paragraph">
              From raw agricultural waste to sustainable energy solutions. Discover how we transform waste materials into valuable energy resources.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-primary-100"></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="mb-24 last:mb-0"
            >
              <div className={`flex flex-col items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Process step marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary-500 z-10"></div>

                {/* Content */}
                <motion.div
                  className={`lg:w-1/2 process-step hover-lift ${index % 2 === 0 ? 'lg:mr-8 lg:text-right' : 'lg:ml-8'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="process-step-number">
                    {step.id}
                  </div>
                  <div className="process-step-title">
                    {step.title}
                  </div>
                  <p className="process-step-description">
                    {step.description}
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div
                  className={`mt-6 lg:mt-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                >
                  <div className="rounded-lg overflow-hidden shadow-lg hover-lift gradient-border-card">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
