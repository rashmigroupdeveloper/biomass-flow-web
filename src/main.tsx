import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Add TypeScript declaration for our global variable
declare global {
  interface Window {
    BIOMASS_LOW_PERFORMANCE_MODE: boolean;
  }

  // Add deviceMemory to Navigator interface
  interface Navigator {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  }
}

// Enhanced device performance capabilities detection
const detectDeviceCapabilities = () => {
  // Check for URL parameter to force low performance mode (for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const forceLowPerformance = urlParams.get('lowPerformance') === 'true';
  const forceHighPerformance = urlParams.get('highPerformance') === 'true';

  // If forced via URL, use that setting
  if (forceLowPerformance) {
    window.BIOMASS_LOW_PERFORMANCE_MODE = true;
    document.body.classList.add('low-performance-device');
    console.info('Low performance mode forced via URL parameter');
    return;
  }

  if (forceHighPerformance) {
    window.BIOMASS_LOW_PERFORMANCE_MODE = false;
    document.body.classList.remove('low-performance-device');
    console.info('High performance mode forced via URL parameter');
    return;
  }

  // Otherwise, detect based on device capabilities
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Check CPU cores
  const hasLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

  // Check memory (not supported in all browsers)
  const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

  // Check for GPU performance (indirect method)
  let hasLowGPU = false;

  // Create a test canvas and run a simple WebGL test
  try {
    const canvas = document.createElement('canvas');
    // Get WebGL context
    const gl = canvas.getContext('webgl');

    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for known low-performance GPU indicators
        hasLowGPU = /Intel|HD Graphics|GMA|Radeon HD 2|GeForce 8|Mali-4|Adreno 3|PowerVR/i.test(renderer);
      }
    }
  } catch (e) {
    console.warn('WebGL detection failed', e);
    // If we can't detect, assume it might be low performance
    hasLowGPU = true;
  }

  // Determine overall performance mode
  const lowPerformanceMode = isMobileDevice || hasLowCPU || hasLowMemory || hasLowGPU;

  // Set a global variable that can be used throughout the app
  window.BIOMASS_LOW_PERFORMANCE_MODE = lowPerformanceMode;

  // Add helpful class to body element
  document.body.classList.toggle('low-performance-device', lowPerformanceMode);

  // Log the detection results
  console.info(`Performance mode: ${lowPerformanceMode ? 'Low' : 'High'}`);
  console.info(`- Mobile device: ${isMobileDevice}`);
  console.info(`- CPU cores: ${navigator.hardwareConcurrency || 'unknown'}`);
  console.info(`- Device memory: ${navigator.deviceMemory || 'unknown'} GB`);
  console.info(`- Low GPU detected: ${hasLowGPU}`);
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
