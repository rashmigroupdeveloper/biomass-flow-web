
import React from 'react';
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
import Media from "@/pages/Media";
import Process from "@/pages/Process";
import NotFound from "@/pages/NotFound";
import PageTransition from "@/components/PageTransition";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
                <Route path="/media" element={<Media />} />
                <Route path="/process" element={<Process />} />
                <Route path="/impact" element={<About />} /> {/* Temporary route until proper Impact page is created */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
