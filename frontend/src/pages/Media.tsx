import React from 'react';
import { Helmet } from 'react-helmet-async';

const Media: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Media</title>
        <meta name="description" content="Media page for Biomass Flow Web" />
      </Helmet>
      <section className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Media</h1>
        <p className="text-lg text-gray-700">
          This is a placeholder Media page. Add your media content here.
        </p>
      </section>
    </>
  );
};

export default Media;
