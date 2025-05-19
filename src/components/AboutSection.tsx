
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Image hover animation
  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  return (
    <section 
      ref={containerRef} 
      id="about-section" 
      className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* About Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-800 mb-6">
              Pioneering <span className="text-primary-600">Sustainable</span> Biomass Solutions
            </h2>
            
            <motion.div 
              className="w-24 h-1.5 bg-primary-500 mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                At Rashmi 6 Paradigm, we transform agricultural waste into valuable renewable energy resources. Our innovative approach helps industries reduce carbon footprints while meeting their energy needs sustainably.
              </p>
              <p>
                Founded on the principles of environmental stewardship and technological innovation, we have been at the forefront of the biomass industry for over a decade, delivering high-quality bio pellets, activated carbon, and charcoal briquettes.
              </p>
              <p>
                Our commitment to sustainability drives everything we do – from sourcing raw materials responsibly to implementing energy-efficient manufacturing processes.
              </p>
            </div>

            <motion.div 
              className="mt-10 flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link 
                to="/about"
                className="flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 group"
              >
                <span>Learn more about our story</span>
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                >
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Images */}
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <motion.div
              className="absolute -top-8 -left-8 w-32 h-32 bg-primary-100 rounded-full -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="rest"
              whileHover="hover"
            >
              <motion.div className="space-y-4">
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-lg"
                  variants={imageHoverVariants}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=600&q=80" 
                    alt="Biomass pellets production" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </motion.div>
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-lg lg:mt-8"
                  variants={imageHoverVariants}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80" 
                    alt="Factory worker examining biomass pellets" 
                    className="w-full h-auto object-cover aspect-square"
                  />
                </motion.div>
              </motion.div>
              
              <motion.div className="space-y-4 mt-8">
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-lg"
                  variants={imageHoverVariants}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80" 
                    alt="Sustainable forest management" 
                    className="w-full h-auto object-cover aspect-square"
                  />
                </motion.div>
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-lg"
                  variants={imageHoverVariants}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80" 
                    alt="Biomass energy production" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary-50 rounded-full -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2 
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <StatCard 
            number="10+"
            label="Years of Experience"
            delay={0.1}
          />
          <StatCard 
            number="500K"
            label="Tons of Biomass Processed"
            delay={0.2}
          />
          <StatCard 
            number="150K"
            label="Tons of CO₂ Reduced"
            delay={0.3}
          />
          <StatCard 
            number="200+"
            label="Client Industries"
            delay={0.4}
          />
        </motion.div>
      </div>
    </section>
  );
};

interface StatCardProps {
  number: string;
  label: string;
  delay?: number;
}

const StatCard = ({ number, label, delay = 0 }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-6 h-6 bg-primary-500 rounded-full" />
      </div>
      <motion.h3 
        className="text-3xl md:text-4xl font-bold text-primary-700 mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      >
        {number}
      </motion.h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

export default AboutSection;
