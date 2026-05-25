import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import ProcessSection from '@/components/ProcessSection';
import ImpactSection from '@/components/ImpactSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => (
  <>
    <Helmet>
      <title>Rashmi 6 Paradigm — Sustainable Biomass Energy Solutions</title>
      <meta
        name="description"
        content="Rashmi 6 Paradigm Limited — India's leading manufacturer of Bio Pellets, Activated Carbon and Charcoal Briquettes. Clean energy from agricultural waste."
      />
      <link rel="canonical" href="https://rashmi6paradigm.com/" />
    </Helmet>

    <div className="relative" style={{ overflowX: 'clip' }}>
      {/* Custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <main>
        <Hero />
        <AboutSection />
        <ProductsSection />
        <ProcessSection />
        <ImpactSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  </>
);

export default Index;
