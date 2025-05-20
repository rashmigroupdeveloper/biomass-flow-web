import React from 'react';
import ImgFixSpecific from './ImgFixSpecific';

interface BiomassPosterImageProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * A dedicated component for displaying the biomass poster image 
 * This component uses the ImgFixSpecific component to handle the image with URL-encoded characters
 */
const BiomassPosterImage: React.FC<BiomassPosterImageProps> = ({ 
  className,
  width,
  height 
}) => {
  return (
    <ImgFixSpecific
      alt="Biomass Flow Poster"
      className={className}
      width={width}
      height={height}
    />
  );
};

export default BiomassPosterImage; 