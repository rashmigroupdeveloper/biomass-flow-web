
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BiomassParticleSystem } from '@/utils/particle-system';
import ParticleCanvas from '@/components/ParticleCanvas';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float animation-delay-2000"></div>

      {/* Ambient particle effect */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <ParticleCanvas
          id="about-particles"
          options={{
            particleCount: 40,
            particleMinSize: 2,
            particleMaxSize: 4,
            baseHue: 120,
            flowIntensity: 0.8,
            speedFactor: 0.4,
            connectionRadius: 150,
            connectionOpacity: 0.05
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with creative flourish */}
          <motion.div
            className="order-2 lg:order-1 relative group"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 rounded-lg z-0 group-hover:scale-110 transition-transform duration-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            ></motion.div>

            <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg"
                  alt="Biomass Pellet Production"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 rounded-full mix-blend-multiply filter blur-lg opacity-70 z-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-primary-500 font-medium tracking-wider uppercase text-sm mb-2 relative"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </motion.span>

            <motion.div
              variants={itemVariants}
            >
              <h2 className="section-heading">
                Leading the <span className="section-heading-accent">
                  Green Revolution
                </span> in Energy
              </h2>
              <div className="decorative-line"></div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-primary-500 w-20 h-1.5 mb-6 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
            </motion.div>

            <motion.div
              className="content-frame-accent mb-6"
              variants={itemVariants}
            >
              <p className="enhanced-paragraph hover:text-gray-800 transition-colors duration-300">
                Rashmi 6 Paradigm Limited is a venture of the Rashmi Group, dedicated to producing premium quality biomass pellets, activated carbon, and charcoal products. Our focus is on delivering sustainable, environmentally friendly energy solutions that help industries reduce their carbon footprint by replacing traditional fossil fuels.
              </p>
            </motion.div>

            <motion.div
              className="content-frame mb-8 hover-lift"
              variants={itemVariants}
            >
              <p className="enhanced-paragraph hover:text-gray-800 transition-colors duration-300">
                With state-of-the-art facilities in Kolkata and Kharagpur, India, we combine innovation with sustainability to create products that power industries while preserving our planet for future generations.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              {[
                { value: "5+", label: "Years of Experience" },
                { value: "20K+", label: "Tons Produced Annually" },
                { value: "38M", label: "CO₂ Reduction (Tons)" },
                { value: "100%", label: "Sustainable Sourcing" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statsVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="depth-card flex flex-col items-center justify-center p-6 card-3d"
                >
                  <span className="stat-value">
                    {stat.value}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
