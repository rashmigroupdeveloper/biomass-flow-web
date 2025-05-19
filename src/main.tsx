import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { applyCSSFixPolyfill } from './utils/cssFixPolyfill';

// Apply CSS @import polyfill before rendering
applyCSSFixPolyfill();

// Remove the dynamic font loading which can cause issues
// The fonts are now loaded through index.html with proper link tags

// Fix for potential @import rule error in constructed stylesheets
// This ensures all CSS is properly loaded through standard methods
document.addEventListener('DOMContentLoaded', () => {
  // Create a root element and render the app
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
