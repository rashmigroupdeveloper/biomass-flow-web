import React, { useEffect, useState } from 'react';
import { validateBase64ImageUrl } from '../utils/image-utils';

interface ImageFixProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Component that properly handles data URLs and regular image URLs
 */
const ImageFix: React.FC<ImageFixProps> = ({
  src,
  alt,
  className,
  width,
  height,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      // If it's a data URL, validate it
      if (src.startsWith('data:')) {
        setImageSrc(validateBase64ImageUrl(src));
      } else {
        // It's a regular URL
        setImageSrc(src);
      }
    } catch (err) {
      console.error('Error preparing image source:', err);
      setError(true);
      if (onError) onError();
    }
  }, [src, onError]);

  if (error) {
    return <div className={`image-error ${className || ''}`}>Image failed to load</div>;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={() => {
        setError(true);
        if (onError) onError();
      }}
    />
  );
};

export default ImageFix; 