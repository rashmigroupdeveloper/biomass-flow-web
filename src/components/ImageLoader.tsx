import React, { useState, useEffect } from 'react';
import { getSafeImageUrl } from '@/lib/imageUtils';
import ImgFixSpecific from './ImgFixSpecific';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fallbackSrc?: string;
}

/**
 * Component that safely loads images, handling potentially problematic base64 URLs
 * Falls back to a fixed version for known problematic images or the provided fallback
 */
const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className,
  width,
  height,
  fallbackSrc
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  
  // Check if this is the specific problematic image with Cyrillic characters
  const isProblematicImage = src && src.includes('%D1%81%D1%82');
  
  useEffect(() => {
    if (isProblematicImage) {
      // For the specific known problematic image, we'll use the ImgFixSpecific component
      setImgSrc('');
      return;
    }
    
    // Otherwise, try to use the safe image URL
    const safeUrl = getSafeImageUrl(src, fallbackSrc);
    setImgSrc(safeUrl);
    setError(false);
  }, [src, fallbackSrc, isProblematicImage]);
  
  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setError(true);
    
    // If we have a fallback and haven't already tried it
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };
  
  // For the specific problematic image, use the fixed component
  if (isProblematicImage) {
    return <ImgFixSpecific />;
  }
  
  // If we have an error and no fallback, or the fallback also failed
  if (error && (!fallbackSrc || imgSrc === fallbackSrc)) {
    return (
      <div 
        className={`image-placeholder ${className || ''}`}
        style={{ 
          width: width || '100%', 
          height: height || '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666'
        }}
      >
        {alt || 'Image'}
      </div>
    );
  }
  
  // Render the image with the safe URL
  return imgSrc ? (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
    />
  ) : null;
};

export default ImageLoader; 