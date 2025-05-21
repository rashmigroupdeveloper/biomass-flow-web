
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RevealText from './ui/RevealText';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const CoreStrengthsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const strengthsList = [
    {
      title: "Advanced Manufacturing",
      description: "State-of-the-art facilities with cutting-edge technology ensuring precision and quality in every product.",
      link: "/manufacturing",
      icon: "settings"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes that exceed industry standards to deliver exceptional products.",
      link: "/quality",
      icon: "shield-check"
    },
    {
      title: "Sustainable Practices",
      description: "Environmentally conscious manufacturing processes that minimize our ecological footprint.",
      link: "/sustainability",
      icon: "award"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <RevealText 
            text="Core Strengths" 
            as="span"
            className="inline-block text-primary-500 font-medium tracking-wider uppercase text-sm mb-2"
          />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
            What Sets Us Apart
          </h2>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Our commitment to excellence, innovation, and customer satisfaction are the pillars that define Rashmi Metaliks' position as an industry leader.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {strengthsList.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.icon === "settings" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        )}
                        {item.icon === "shield-check" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        )}
                        {item.icon === "award" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        )}
                      </svg>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  
                  <a 
                    href={item.link} 
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group"
                  >
                    Learn more
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16">
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg font-medium hover:text-primary-600 py-6">
                How do we ensure quality across all our products?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                We implement a rigorous three-stage quality control process that begins with raw material inspection, continues with in-process monitoring, and concludes with comprehensive finished product testing. Every batch undergoes multiple checks to ensure it meets or exceeds the strictest industry standards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg font-medium hover:text-primary-600 py-6">
                What makes our manufacturing facilities advanced?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                Our facilities integrate the latest automation technologies, IoT monitoring systems, and precision equipment calibrated to deliver exceptional results. We continuously invest in upgrading our infrastructure to maintain our competitive edge and deliver superior products.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg font-medium hover:text-primary-600 py-6">
                How do our sustainable practices benefit our customers?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                Our sustainability initiatives lead to more efficient operations, reduced waste, and optimized resource usage. This translates to cost savings that we pass on to customers, along with products that meet increasingly important environmental standards and certifications required in global markets.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CoreStrengthsSection;
