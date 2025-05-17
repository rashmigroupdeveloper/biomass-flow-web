
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Process = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-800 mb-6">
            Our Process
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Learn how we turn agricultural waste into valuable biomass products.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Process;
