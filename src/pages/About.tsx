
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import AboutParallaxHero from '@/components/AboutParallaxHero';
import AboutAnimatedStats from '@/components/AboutAnimatedStats';
import EnhancedButton from '@/components/EnhancedButton';
import EnhancedFooter from '@/components/EnhancedFooter';
import AboutCEOSection from '@/components/AboutCEOSection';
import CoreStrengthsSection from '@/components/CoreStrengthsSection';

const About = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <div className="relative overflow-x-hidden">
      <Navigation />
      
      {/* Replace standard hero with parallax hero */}
      <AboutParallaxHero />
      
      {/* Company Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Our Story
              </h2>
              <div className="w-16 h-1 bg-primary-500 mb-6"></div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2015, Rashmi 6 Paradigm Limited has emerged as a leading manufacturer of Activated Carbon, Bio Pellets, and Charcoal Briquettes in Eastern India. With a commitment to innovation, sustainability, and customer satisfaction, we have established ourselves as a trusted name in the industry.
                </p>
                <p>
                  Our state-of-the-art manufacturing facility, equipped with cutting-edge technology, allows us to produce high-quality products that meet international standards. We pride ourselves on our ability to deliver products that not only meet but exceed customer expectations.
                </p>
                <p>
                  At Rashmi 6 Paradigm Limited, we are dedicated to promoting sustainable practices. Our products are environmentally friendly and are designed to reduce carbon footprint. We are constantly exploring new ways to innovate and improve our processes to ensure minimal impact on the environment.
                </p>
              </div>
              
              <div className="mt-8">
                <EnhancedButton to="/contact" variant="primary" animationType="shine">
                  Contact Us
                </EnhancedButton>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-200 rounded-lg z-0"></div>
              <motion.div 
                className="relative z-10 rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1586528116493-a029325540b5?auto=format&fit=crop&w=1000&q=80" 
                  alt="Our Facility" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <AboutAnimatedStats />
      
      {/* CEO Section - New */}
      <AboutCEOSection />
      
      {/* Core Strengths Section - New */}
      <CoreStrengthsSection />
      
      {/* Vision & Mission */}
      <section ref={ref1} className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
              Vision & Mission
            </h2>
            <div className="w-24 h-1.5 bg-primary-500 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the global leader in sustainable energy solutions, setting new standards of excellence, innovation, and environmental stewardship. We envision a world where clean energy solutions are accessible to all, leading to a greener, more sustainable future.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To manufacture and deliver high-quality Activated Carbon, Bio Pellets, and Charcoal Briquettes that meet and exceed customer expectations while minimizing environmental impact. We are committed to continuous innovation, operational excellence, and ethical business practices that benefit our customers, employees, and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section ref={ref2} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
              Our Core Values
            </h2>
            <div className="w-24 h-1.5 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              At the heart of our operations are these fundamental principles that guide our actions and decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with the highest ethical standards, fostering trust and transparency in all our relationships.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek new and better ways to serve our customers, driving progress through creativity and adaptability.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We are committed to environmental stewardship, striving to minimize our ecological footprint and promote sustainable practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Make a Sustainable Impact?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Join us in our mission to create a greener future through innovative biomass energy solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <EnhancedButton to="/contact" variant="secondary" animationType="fill">
              Contact Us
            </EnhancedButton>
            <EnhancedButton to="/products/bio-pellets" variant="outline" animationType="border" className="text-white border-white hover:bg-white/10">
              Explore Our Products
            </EnhancedButton>
          </div>
        </div>
      </section>
      
      {/* Replace standard footer with enhanced footer */}
      <EnhancedFooter />
      
      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAOh0lEQVR4nO1dbVczNw69JCEvBJInEEIgEIb//6/6fbu73e77tt0P1o2vZQ3QPgk9nMP9dM+ZzIztWJYlWZJlnRsAxVUl58z5iLgyKbBCL/0oF09+fq6KiJB/tps3zXVFWZ3bGl+9/XP8tlh8V359qbMh/rr8fpr+7uSouhrfzKslOvtQnNS5vDh5StpEg9RSnydnyGnI+dzст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")'
        }}
      ></div>
      
      {/* Page Transition */}
      <motion.div
        className="page-transition fixed inset-0 bg-primary-500 z-[100] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
};

export default About;
