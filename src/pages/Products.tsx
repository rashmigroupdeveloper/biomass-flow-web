
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-800 mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Discover our range of sustainable biomass solutions.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
