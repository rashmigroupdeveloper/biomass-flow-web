
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Detect device performance capabilities
const detectDeviceCapabilities = () => {
  const lowPerformanceMode = 
    // Check if it's a mobile device
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    // Or if it has a low number of logical processors
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    // Or check for memory constraints (not supported in all browsers)
    //@ts-ignore - deviceMemory is not in all browser types
    (navigator.deviceMemory && navigator.deviceMemory < 4);
    
  // Set a global variable that can be used throughout the app
  window.BIOMASS_LOW_PERFORMANCE_MODE = lowPerformanceMode;
  
  // Add helpful class to body element
  document.body.classList.toggle('low-performance-device', lowPerformanceMode);
};

// Run the detection
detectDeviceCapabilities();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
