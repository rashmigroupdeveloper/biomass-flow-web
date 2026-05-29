
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useInView, useTransform } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { organizationSchema, webPageSchema } from '@/lib/schemas';
import Footer from '@/components/Footer';

const AboutUs = () => {
  // For parallax scrolling
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef);
  
  // Animation controls for scroll-triggered animations
  const timelineControls = useAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });
  
  const valuesControls = useAnimation();
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  
  const leadershipControls = useAnimation();
  const leadershipRef = useRef<HTMLDivElement>(null);
  const leadershipInView = useInView(leadershipRef, { once: true, amount: 0.2 });

  // Parallax effect for hero section
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    if (timelineInView) {
      timelineControls.start('visible');
    }
    
    if (valuesInView) {
      valuesControls.start('visible');
    }
    
    if (leadershipInView) {
      leadershipControls.start('visible');
    }
  }, [timelineControls, valuesControls, leadershipControls, timelineInView, valuesInView, leadershipInView]);

  // Company timeline data
  const timeline = [
    { year: 2005, event: 'Foundation of Rashmi 6 Paradigm with a vision for sustainable energy solutions' },
    { year: 2008, event: 'Launched first biomass pellet production facility in Kharagpur, West Bengal' },
    { year: 2012, event: 'Expanded product line to include activated carbon products' },
    { year: 2015, event: 'Achieved ISO 9001 certification for quality management systems' },
    { year: 2017, event: 'Became India\'s largest manufacturer of biomass pellets' },
    { year: 2019, event: 'Received national award for contributions to sustainable energy' },
    { year: 2022, event: 'Expanded operations across multiple states in India' },
    { year: 2023, event: 'Launched innovative carbon-neutral energy solutions for industrial clients' }
  ];

  // Leadership team data
  const leadershipTeam = [
    {
      name: 'Rajesh Kumar',
      position: 'Chief Executive Officer',
      bio: 'With over 20 years of experience in renewable energy, Rajesh has led Rashmi 6 Paradigm to become India\'s leading biomass energy company.',
      image: '/placeholder.svg'
    },
    {
      name: 'Priya Sharma',
      position: 'Chief Technology Officer',
      bio: 'Dr. Priya brings innovative technical expertise with a Ph.D. in Sustainable Energy Systems from IIT Delhi.',
      image: '/placeholder.svg'
    },
    {
      name: 'Anand Singh',
      position: 'Chief Operations Officer',
      bio: 'Anand oversees our manufacturing facilities, ensuring efficient and sustainable production processes.',
      image: '/placeholder.svg'
    },
    {
      name: 'Meena Patel',
      position: 'Chief Sustainability Officer',
      bio: 'Meena ensures our operations maintain the highest environmental standards and community impact.',
      image: '/placeholder.svg'
    }
  ];

  // Certifications data
  const certifications = [
    { name: 'ISO 9001', description: 'Quality Management System' },
    { name: 'ISO 14001', description: 'Environmental Management System' },
    { name: 'ISO 45001', description: 'Occupational Health and Safety' },
    { name: 'FSC', description: 'Forest Stewardship Council Certification' },
    { name: 'Carbon Trust Standard', description: 'Carbon Footprint Reduction' },
    { name: 'GreenPro', description: 'Green Product Certification' }
  ];

  return (
    <>
      <SEO
        title="About Us | Rashmi 6 Paradigm"
        description="Learn about Rashmi 6 Paradigm, India's leading manufacturer of sustainable biomass products and our commitment to a greener future."
        canonical="/about-us"
        jsonLd={[
          organizationSchema,
          webPageSchema('About Us', 'Learn about Rashmi 6 Paradigm — India\'s leading manufacturer of sustainable biomass products.', 'https://rashmi6paradigm.com/about-us'),
        ]}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with Parallax Effect */}
        <section 
          ref={heroRef}
          className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center"
        >
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ 
              backgroundImage: "url('/placeholder.svg')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: yBg
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Pioneering Sustainable Energy Solutions in India
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-primary-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <motion.p 
              className="text-lg md:text-xl text-white max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Transforming agricultural waste into valuable energy resources while creating a sustainable future for generations to come.
            </motion.p>
          </div>
        </section>
        
        {/* Company Overview Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2005, Rashmi 6 Paradigm began with a simple vision: to create sustainable energy solutions that benefit both the environment and communities. What started as a small operation in Kharagpur, West Bengal has now grown to become India's largest manufacturer of biomass pellets and activated carbon products.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep sense of responsibility towards the planet. Today, we operate state-of-the-art manufacturing facilities that convert agricultural waste into valuable energy resources, helping industries reduce their carbon footprint while supporting rural farmers.
              </p>
              <p className="text-lg text-gray-700">
                With operations across multiple states in India and a growing international presence, Rashmi 6 Paradigm stands at the forefront of India's renewable energy revolution, driving the transition to a more sustainable and circular economy.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div 
                className="bg-gray-50 p-8 md:p-10 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700 mb-4">
                  "To transform agricultural waste into valuable energy resources while supporting rural communities and reducing environmental impact."
                </p>
                <p className="text-gray-600">
                  We are dedicated to creating sustainable solutions that address the dual challenges of waste management and clean energy production, while generating economic opportunities in agricultural communities.
                </p>
              </motion.div>
              
              {/* Vision */}
              <motion.div 
                className="bg-gray-50 p-8 md:p-10 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-700 mb-4">
                  "To be the global leader in sustainable biomass solutions, driving the transition to a circular economy and carbon-neutral future."
                </p>
                <p className="text-gray-600">
                  We envision a world where agricultural waste is no longer burned or discarded, but transformed into valuable resources that power industries, homes, and communities in an environmentally responsible way.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section 
          ref={valuesRef} 
          className="py-16 md:py-24 bg-primary-900 text-white"
        >
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Core Values</h2>
              <div className="w-16 h-1 bg-primary-300 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Value 1 - Sustainability */}
              <motion.div 
                className="text-center p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={valuesControls}
                transition={{ duration: 0.6, delay: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-primary-100">We are committed to creating a positive environmental impact through sustainable processes and products.</p>
              </motion.div>
              
              {/* Value 2 - Innovation */}
              <motion.div 
                className="text-center p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={valuesControls}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-primary-100">We continuously seek new technologies and methods to improve our products and processes.</p>
              </motion.div>
              
              {/* Value 3 - Quality */}
              <motion.div 
                className="text-center p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={valuesControls}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-primary-100">We maintain the highest standards of quality in our products and operations.</p>
              </motion.div>
              
              {/* Value 4 - Community Empowerment */}
              <motion.div 
                className="text-center p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={valuesControls}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Community Empowerment</h3>
                <p className="text-primary-100">We create opportunities and support the communities where we operate.</p>
              </motion.div>
              
              {/* Value 5 - Environmental Stewardship */}
              <motion.div 
                className="text-center p-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={valuesControls}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Environmental Stewardship</h3>
                <p className="text-primary-100">We are committed to protecting and enhancing the natural environment in all our operations.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section 
          ref={timelineRef}
          className="py-16 md:py-24 bg-white"
        >
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Journey</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
            </div>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>
              
              {/* Timeline events */}
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`relative mb-12 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} md:justify-between items-center`}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: index % 2 === 0 ? 50 : -50 
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0 
                    }
                  }}
                  initial="hidden"
                  animate={timelineControls}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'order-last md:order-none'}`}>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold text-primary-600 mb-2">{item.year}</h3>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  
                  <div className="absolute flex items-center justify-center left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 rounded-full bg-primary-500 border-4 border-white"></div>
                  </div>
                  
                  <div className="md:w-5/12 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Manufacturing Capabilities Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Manufacturing Capabilities</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our state-of-the-art manufacturing facility in Kharagpur, West Bengal is equipped with the latest technology to produce high-quality biomass products at scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <img 
                  src="/placeholder.svg" 
                  alt="Rashmi 6 Manufacturing Facility"
                  className="w-full h-80 object-cover"
                />
              </motion.div>
              
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">World-Class Production</h3>
                  <p className="text-gray-700 mb-6">
                    Our facility spans over 10 acres and features automated production lines for biomass pellets, activated carbon, and briquettes. We utilize advanced processing techniques to ensure consistent quality and maximum energy efficiency.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Production capacity of 100,000 metric tons of biomass pellets annually</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Advanced activation kilns for high-quality activated carbon production</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Renewable energy powered operations for minimal carbon footprint</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">In-house R&D lab for continuous product improvement</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Leadership Team Section */}
        <section 
          ref={leadershipRef}
          className="py-16 md:py-24 bg-white"
        >
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Leadership</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Meet the team driving our vision for a sustainable future through innovation and dedication.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  initial="hidden"
                  animate={leadershipControls}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{leader.position}</p>
                    <p className="text-gray-700">{leader.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Certifications Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Certifications & Recognition</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our commitment to quality, sustainability, and excellence is recognized by leading industry standards and certifications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* India Map Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Presence</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                With headquarters in Kolkata and our manufacturing hub in Kharagpur, we serve clients across India and beyond.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14744.846842636176!2d88.36023968681403!3d22.55212754280303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027469debaa061%3A0xa051b0e4e5a9e505!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1684947543059!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rashmi 6 Paradigm Locations"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Headquarters</h3>
                  <p className="text-gray-700">
                    First Floor, Ideal Center<br />
                    9, A.J.C. Bose Road<br />
                    Kolkata, West Bengal - 700017<br />
                    India
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Manufacturing Facility</h3>
                  <p className="text-gray-700">
                    Kharagpur Industrial Area<br />
                    Kharagpur, West Bengal<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary-900 text-white">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Our Journey Towards Sustainability</h2>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                Together, we can create a greener future by transforming waste into valuable energy resources.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/contact" 
                  className="bg-white text-primary-900 hover:bg-primary-100 px-8 py-3 rounded-full font-medium text-lg transition duration-300"
                >
                  Contact Us
                </a>
                <a 
                  href="/products/bio-pellets" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-medium text-lg transition duration-300"
                >
                  Explore Our Products
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
