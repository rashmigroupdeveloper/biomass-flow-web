
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Process = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Process steps
  const processSteps = [
    {
      title: "Biomass Collection",
      description: "We source agricultural waste and residues from local farmers, ensuring a sustainable supply chain and providing additional income to farmers.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      icon: "🌾"
    },
    {
      title: "Material Processing",
      description: "The collected biomass undergoes cutting, shredding, and grinding to achieve uniform particle size suitable for pelletizing.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      icon: "🔄"
    },
    {
      title: "Drying",
      description: "Moisture content is reduced to optimal levels using energy-efficient drying techniques, often utilizing waste heat from our own processes.",
      image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
      icon: "💧"
    },
    {
      title: "Pelletizing",
      description: "The prepared biomass is compressed under high pressure in our pellet mills to form dense, uniform pellets without any chemical additives.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      icon: "🏭"
    },
    {
      title: "Quality Control",
      description: "Every batch undergoes rigorous testing for calorific value, ash content, moisture, and durability to ensure consistent high quality.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      icon: "✅"
    },
    {
      title: "Packaging & Distribution",
      description: "The finished pellets are packaged in moisture-resistant materials and distributed through our efficient logistics network.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      icon: "📦"
    }
  ];

  // SustainabilityCard component definition
  const SustainabilityCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
    // Define component-level variants
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    };
    
    return (
      <motion.div 
        variants={cardVariants}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                Our Manufacturing 
              </motion.span>{" "}
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="inline-block text-primary-600"
              >
                Process
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mt-6"
            >
              From agricultural waste to sustainable energy - discover how we transform biomass into premium quality, eco-friendly fuel.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Process Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
            className="space-y-24"
          >
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
              >
                <motion.div 
                  className="w-full md:w-1/2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl group">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-72 md:h-96 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end">
                      <div className="p-6 md:p-8 text-white">
                        <motion.div 
                          className="text-4xl mb-3"
                          animate={{ 
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        >
                          {step.icon}
                        </motion.div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-primary-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  
                  {index === processSteps.length - 1 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/products/bio-pellets"
                        className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg transition-colors hover:bg-primary-600"
                      >
                        See Our Products
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Sustainability Commitment */}
      <section className="py-16 bg-primary-50/60">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Commitment to <span className="text-primary-600">Sustainability</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Our manufacturing process is designed to minimize environmental impact at every stage. 
              We prioritize energy efficiency, water conservation, and zero waste principles, ensuring 
              that our operations are as sustainable as the products we create.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SustainabilityCard
                icon={
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                }
                title="Energy Efficient"
                description="Our facilities utilize energy-efficient technologies and renewable power sources."
              />
              
              <SustainabilityCard
                icon={
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                }
                title="Water Conservation"
                description="Advanced water recycling systems minimize freshwater usage in our operations."
              />
              
              <SustainabilityCard
                icon={
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                }
                title="Zero Waste"
                description="All by-products from our manufacturing process are repurposed or recycled."
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary-600 text-white rounded-2xl p-10 md:p-16 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
            
            <div className="max-w-3xl mx-auto relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Interested in our Sustainable Bio-Energy Solutions?
              </h2>
              <p className="text-primary-50 text-lg mb-10">
                Contact us to learn more about our products, process, or to discuss how we can help meet your energy needs sustainably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-3 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                  >
                    Learn More About Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Process;
