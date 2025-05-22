
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';

// Pages
import Index from './pages/Index';
import About from './pages/About';
import BioPellets from './pages/BioPellets';
import ActivatedCarbon from './pages/ActivatedCarbon';
import CharcoalBriquettes from './pages/CharcoalBriquettes';
import Process from './pages/Process';
import Impact from './pages/Impact';
import Sustainability from './pages/Sustainability';
import CSR from './pages/CSR';
import QualityPolicy from './pages/QualityPolicy';
import Certificates from './pages/Certificates';
import Media from './pages/Media';
import Contact from './pages/Contact';
import ExampleFixedImage from './pages/ExampleFixedImage';
import NotFound from './pages/NotFound';

// Performance optimizer
import './utils/performance-optimizer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Custom global type for window
declare global {
  interface Window {
    BIOMASS_LOW_PERFORMANCE_MODE: boolean;
  }
}

// Detect low-end devices or older browsers
// Use feature detection instead of UA sniffing
window.BIOMASS_LOW_PERFORMANCE_MODE = false;

// Check if device is low-end
if (
  !('IntersectionObserver' in window) ||
  navigator.hardwareConcurrency < 4 ||
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
) {
  window.BIOMASS_LOW_PERFORMANCE_MODE = true;
  console.log('Low performance mode enabled');
}

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/bio-pellets" element={<BioPellets />} />
          <Route path="/products/activated-carbon" element={<ActivatedCarbon />} />
          <Route path="/products/charcoal-briquettes" element={<CharcoalBriquettes />} />
          <Route path="/process" element={<Process />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/quality-policy" element={<QualityPolicy />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/example-fixed-image" element={<ExampleFixedImage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
