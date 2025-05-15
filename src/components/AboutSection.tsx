
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  return (
    <section 
      ref={ref} 
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float animation-delay-2000"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with creative flourish */}
          <motion.div 
            className="order-2 lg:order-1 relative"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div 
              className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 rounded-lg z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            ></motion.div>
            
            <div className="relative z-10">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Biomass Pellet Production" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 rounded-full mix-blend-multiply filter blur-lg opacity-70 z-0"
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
              className="inline-block text-primary-500 font-medium tracking-wider uppercase text-sm mb-2"
            >
              About Us
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4"
            >
              Leading the <span className="text-primary-500">Green Revolution</span> in Energy
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="bg-primary-500 w-20 h-1.5 mb-6"
            ></motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              Rashmi 6 Paradigm Limited is a venture of the Rashmi Group, dedicated to producing premium quality biomass pellets, activated carbon, and charcoal products. Our focus is on delivering sustainable, environmentally friendly energy solutions that help industries reduce their carbon footprint by replacing traditional fossil fuels.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              With state-of-the-art facilities in Kolkata and Kharagpur, India, we combine innovation with sustainability to create products that power industries while preserving our planet for future generations.
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              <motion.div 
                variants={itemVariants}
                className="flex flex-col p-4 border border-primary-100 rounded-lg bg-white hover:border-primary-300 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-3xl font-bold text-primary-500">5+</span>
                <span className="text-sm text-gray-500">Years of Experience</span>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col p-4 border border-primary-100 rounded-lg bg-white hover:border-primary-300 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-3xl font-bold text-primary-500">20K+</span>
                <span className="text-sm text-gray-500">Tons Produced Annually</span>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col p-4 border border-primary-100 rounded-lg bg-white hover:border-primary-300 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-3xl font-bold text-primary-500">38M</span>
                <span className="text-sm text-gray-500">CO₂ Reduction (Tons)</span>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col p-4 border border-primary-100 rounded-lg bg-white hover:border-primary-300 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-3xl font-bold text-primary-500">100%</span>
                <span className="text-sm text-gray-500">Sustainable Sourcing</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
