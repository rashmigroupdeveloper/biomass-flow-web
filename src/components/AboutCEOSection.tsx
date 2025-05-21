
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RevealText from './ui/RevealText';
import { ArrowRight } from 'lucide-react';
import EnhancedButton from '@/components/EnhancedButton';

const AboutCEOSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const achievementItems = [
    {
      title: "Technology Integration",
      description: "Implementing cutting-edge manufacturing processes",
      icon: "settings"
    },
    {
      title: "Global Expansion",
      description: "Strategic market penetration worldwide",
      icon: "building"
    },
    {
      title: "Product Innovation",
      description: "Continuous development of world-class products",
      icon: "bulb"
    },
    {
      title: "Capacity Expansion",
      description: "Driving growth through strategic capacity increase",
      icon: "trending-up"
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: CEO Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <span className="inline-block text-primary-500 font-medium tracking-wider uppercase text-sm mb-2">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
              Chief Executive Officer
            </h2>
            <div className="w-16 h-1 bg-primary-500 mb-6"></div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
              Transforming Rashmi Group into a global conglomerate
            </h3>

            <div className="relative overflow-hidden mb-10">
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
                  alt="Mr. Sunil Kumar Patwari" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h4 className="text-white text-2xl font-bold">Mr. Sunil Kumar Patwari</h4>
                  <p className="text-white/90 font-medium">Chief Executive Officer</p>
                </div>
              </motion.div>
            </div>

            <RevealText
              text="About our CEO"
              as="h3"
              className="text-2xl font-bold text-primary-700 mb-4"
            />
            
            <div className="space-y-4 text-gray-600">
              <p>
                Mr. Sunil Kumar Patwari joined the family business which then was centered around the steel industry. Within a very short period of time, Mr. Patwari turned the greatest chapter in the group's history with his highly effective managerial and leadership skills.
              </p>
              <p>
                His largest focus areas have been infusing the latest cutting-edge technology into the businesses and constantly innovate and produce world class products. He is the main reason why Rashmi Group has become a force to reckon with – not just in India, but so also in global markets.
              </p>
              <p>
                Mr. Patwari has singlehandedly led the group towards its current transformation as a global business conglomerate. The technology adopted under his guidance is world class. This combined with the constant capacity expansion has led to market domination by Rashmi Group.
              </p>
            </div>

            <div className="mt-8">
              <EnhancedButton 
                to="/leadership" 
                variant="primary" 
                animationType="shine"
                className="inline-flex items-center"
              >
                Learn more about our leadership
                <ArrowRight size={16} className="ml-2" />
              </EnhancedButton>
            </div>
          </motion.div>

          {/* Right Column: Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievementItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="depth-card hover-lift relative overflow-hidden p-8 rounded-lg border-l-4 border-primary-500"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-100 rounded-full opacity-50 z-0"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon === "settings" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                      {item.icon === "settings" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                      
                      {item.icon === "building" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                      
                      {item.icon === "bulb" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
                      
                      {item.icon === "trending-up" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCEOSection;
