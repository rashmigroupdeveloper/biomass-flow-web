
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section 
      ref={ref} 
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div 
            className="order-2 lg:order-1"
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Biomass Pellet Production" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 rounded-full mix-blend-multiply filter blur-lg opacity-70 z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-lg opacity-70 z-0"></div>
            </div>
          </motion.div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              <motion.span 
                variants={fadeIn}
                className="inline-block text-primary-500 font-medium"
              >
                About Us
              </motion.span>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-serif font-bold text-gray-900"
              >
                Leading the <span className="text-primary-500">Green Revolution</span> in Energy
              </motion.h2>
              
              <motion.div 
                variants={fadeIn}
                className="bg-primary-50 w-20 h-1.5"
              ></motion.div>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                Rashmi 6 Paradigm Limited is a venture of the Rashmi Group, dedicated to producing premium quality biomass pellets, activated carbon, and charcoal products. Our focus is on delivering sustainable, environmentally friendly energy solutions that help industries reduce their carbon footprint by replacing traditional fossil fuels.
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                With state-of-the-art facilities in Kolkata and Kharagpur, India, we combine innovation with sustainability to create products that power industries while preserving our planet for future generations.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="grid grid-cols-2 gap-6 pt-4"
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary-500">5+</span>
                  <span className="text-sm text-gray-500">Years of Experience</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary-500">20K+</span>
                  <span className="text-sm text-gray-500">Tons Produced Annually</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary-500">38M</span>
                  <span className="text-sm text-gray-500">CO₂ Reduction (Tons)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary-500">100%</span>
                  <span className="text-sm text-gray-500">Sustainable Sourcing</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
