import React from 'react';
import { SEO } from '@/components/SEO';
import { localBusinessSchema, websiteSchema } from '@/lib/schemas';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProductPortfolio from '@/components/ProductPortfolio';
import ProcessSection from '@/components/ProcessSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import TechnologySection from '@/components/TechnologySection';
import ImpactSection from '@/components/ImpactSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => (
  <>
    <SEO
      title="Rashmi 6 Paradigm — Bio Pellets, Activated Carbon & Charcoal Briquettes from Eastern India"
      description="Rashmi 6 Paradigm Limited, Kolkata — manufacturer of agro-waste bio pellets for NTPC co-firing & industrial boilers, coconut shell activated carbon for water treatment & gold recovery, and charcoal briquettes for export."
      canonical="/"
      jsonLd={[localBusinessSchema, websiteSchema]}
    />

    <div className="relative" style={{ overflowX: 'clip' }}>
      {/* Custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <main>
        <Hero />
        <AboutSection />
        <ProductPortfolio />
        <InfrastructureSection />
        <TechnologySection />
        <ProcessSection />
        <ImpactSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  </>
);

export default Index;
