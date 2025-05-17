
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Get in touch with our team for more information.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
