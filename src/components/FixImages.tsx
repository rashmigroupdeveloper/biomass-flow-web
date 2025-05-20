import React, { useEffect } from 'react';
import { cleanBase64Url, containsUrlEncodedChars } from '@/lib/imageUtils';

/**
 * This component automatically fixes problematic base64 image URLs throughout the application
 * It works by overriding the global Image constructor and patching the src property
 */
const FixImages: React.FC = () => {
  useEffect(() => {
    // Store the original Image constructor
    const OriginalImage = window.Image;
    
    // Create a patched Image constructor that fixes base64 URLs
    function PatchedImage(this: any, width?: number, height?: number) {
      const img = new OriginalImage(width, height);
      
      // Override the src property setter
      let originalSrc = '';
      Object.defineProperty(img, 'src', {
        get: function() {
          return originalSrc;
        },
        set: function(url) {
          try {
            // Check if the URL is a data URL with encoded characters
            if (url && typeof url === 'string' && url.startsWith('data:') && containsUrlEncodedChars(url)) {
              // Clean the URL by removing URL-encoded characters
              const cleanedUrl = cleanBase64Url(url);
              originalSrc = cleanedUrl;
              
              // Call the original setter with the cleaned URL
              Object.getOwnPropertyDescriptor(OriginalImage.prototype, 'src')?.set?.call(this, cleanedUrl);
            } else {
              // For regular URLs, use the original setter
              originalSrc = url;
              Object.getOwnPropertyDescriptor(OriginalImage.prototype, 'src')?.set?.call(this, url);
            }
          } catch (e) {
            console.warn('Error fixing image URL:', e);
            // Fall back to the original setter
            originalSrc = url;
            Object.getOwnPropertyDescriptor(OriginalImage.prototype, 'src')?.set?.call(this, url);
          }
        },
        enumerable: true,
        configurable: true
      });
      
      return img;
    }
    
    // Copy properties from the original constructor
    PatchedImage.prototype = OriginalImage.prototype;
    PatchedImage.toString = OriginalImage.toString.bind(OriginalImage);
    
    // Replace the global Image constructor
    window.Image = PatchedImage as any;
    
    // Cleanup function to restore the original Image constructor
    return () => {
      window.Image = OriginalImage;
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default FixImages; 