
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import BioPellets from "@/pages/BioPellets";
import ActivatedCarbon from "@/pages/ActivatedCarbon";
import CharcoalBriquettes from "@/pages/CharcoalBriquettes";
import QualityPolicy from "@/pages/QualityPolicy";
import Certificates from "@/pages/Certificates";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Process from "@/pages/Process";
import Impact from "@/pages/Impact";
import CSR from "@/pages/CSR";
import Sustainability from "@/pages/Sustainability";
import PageTransition from "@/components/PageTransition";
import ExampleFixedImage from "@/pages/ExampleFixedImage";
import Media from "@/pages/Media";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FixImages from '@/components/FixImages';
import Navigation from '@/components/Navigation';

// Import styles
import '@/styles/fonts.css';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  // Add preload effect for the manifest icons
  useEffect(() => {
    // Preload the manifest icons to ensure they're available
    const preloadIcons = async () => {
      try {
        // Create preload links for each icon to ensure they're loaded
        const iconSizes = [16, 32, 180, 192, 512];
        const iconTypes = [
          { size: 16, path: '/favicon-16x16.png' },
          { size: 32, path: '/favicon-32x32.png' },
          { size: 180, path: '/apple-touch-icon.png' },
          { size: 192, path: '/android-chrome-192x192.png' },
          { size: 512, path: '/android-chrome-512x512.png' },
        ];
        
        iconTypes.forEach(icon => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = icon.path;
          link.as = 'image';
          link.type = 'image/png';
          document.head.appendChild(link);
        });
        
        // Also preload the favicon.ico
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'preload';
        faviconLink.href = '/favicon.ico';
        faviconLink.as = 'image';
        document.head.appendChild(faviconLink);
      } catch (err) {
        console.error('Failed to preload icons:', err);
      }
    };
    
    preloadIcons();
  }, []);

  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Helmet>
            <title>Rashmi 6 Paradigm</title>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="theme-color" content="#4CAF50" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
          <FixImages />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navigation />
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products/bio-pellets" element={<BioPellets />} />
                  <Route path="/products/activated-carbon" element={<ActivatedCarbon />} />
                  <Route path="/products/charcoal-briquettes" element={<CharcoalBriquettes />} />
                  <Route path="/policy" element={<QualityPolicy />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/csr" element={<CSR />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/example-fixed-image" element={<ExampleFixedImage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
