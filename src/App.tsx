import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import { useLenis } from "@/hooks/useLenis";

// Code-split every page — each route is its own chunk loaded on demand
const Index            = lazy(() => import("@/pages/Index"));
const About            = lazy(() => import("@/pages/About"));
const AboutUs          = lazy(() => import("@/pages/AboutUs"));
const BioPellets       = lazy(() => import("@/pages/BioPellets"));
const ActivatedCarbon  = lazy(() => import("@/pages/ActivatedCarbon"));
const CharcoalBriquettes = lazy(() => import("@/pages/CharcoalBriquettes"));
const QualityPolicy    = lazy(() => import("@/pages/QualityPolicy"));
const Certificates     = lazy(() => import("@/pages/Certificates"));
const Contact          = lazy(() => import("@/pages/Contact"));
const NotFound         = lazy(() => import("@/pages/NotFound"));
const Process          = lazy(() => import("@/pages/Process"));
const Impact           = lazy(() => import("@/pages/Impact"));
const CSR              = lazy(() => import("@/pages/CSR"));
const Sustainability   = lazy(() => import("@/pages/Sustainability"));
const Media            = lazy(() => import("@/pages/Media"));
const Blog             = lazy(() => import("@/pages/Blog"));
const BlogBiomassPrice = lazy(() => import("@/pages/blog/BiomassParticlesPriceWestBengal"));
const BlogNTPC         = lazy(() => import("@/pages/blog/NTPCCofiringWestBengal"));
const BlogVsCoal       = lazy(() => import("@/pages/blog/BioPelletsVsCoal"));
const BlogActivatedCarbon = lazy(() => import("@/pages/blog/ActivatedCarbonWaterTreatment"));
const BlogEmpanelment  = lazy(() => import("@/pages/blog/NTPCSupplierEmpanelment"));

// Import styles
import '@/styles/fonts.css';
import '@/styles/design-excellence.css';
import '@/styles/micro-interactions.css';
import '@/styles/visual-storytelling.css';

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen" style={{ background: '#071a09' }} />
);

const AppInner: React.FC = () => {
  useLenis();
  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <LoadingScreen />
      <Navigation />
      <PageTransition>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                           element={<Index />} />
            <Route path="/about"                      element={<About />} />
            <Route path="/about-us"                   element={<AboutUs />} />
            <Route path="/products/bio-pellets"       element={<BioPellets />} />
            <Route path="/products/activated-carbon"  element={<ActivatedCarbon />} />
            <Route path="/products/charcoal-briquettes" element={<CharcoalBriquettes />} />
            <Route path="/policy"                     element={<QualityPolicy />} />
            <Route path="/certificates"               element={<Certificates />} />
            <Route path="/contact"                    element={<Contact />} />
            <Route path="/process"                    element={<Process />} />
            <Route path="/impact"                     element={<Impact />} />
            <Route path="/csr"                        element={<CSR />} />
            <Route path="/sustainability"             element={<Sustainability />} />
            <Route path="/media"                      element={<Media />} />
            <Route path="/blog"                       element={<Blog />} />
            <Route path="/blog/biomass-pellets-price-west-bengal-2026" element={<BlogBiomassPrice />} />
            <Route path="/blog/ntpc-biomass-cofiring-west-bengal-guide" element={<BlogNTPC />} />
            <Route path="/blog/bio-pellets-vs-coal-industrial-boilers-india" element={<BlogVsCoal />} />
            <Route path="/blog/coconut-shell-activated-carbon-water-treatment-india" element={<BlogActivatedCarbon />} />
            <Route path="/blog/ntpc-biomass-pellet-supplier-empanelment-india-2026" element={<BlogEmpanelment />} />
            <Route path="*"                           element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </>
  );
};

const App: React.FC = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
