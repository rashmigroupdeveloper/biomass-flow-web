import React, { useState, useEffect, useRef } from 'react';

interface AutoplayVideoProps {
  videoSrc: string;
  posterSrc: string;
  triggerMode?: 'viewport' | 'hover' | 'click';
  className?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[4/3]"
  overlayColor?: string; // Optional overlay gradient or color
}

export default function AutoplayVideo({
  videoSrc,
  posterSrc,
  triggerMode = 'viewport',
  className = '',
  aspectRatio = 'aspect-video',
  overlayColor = 'rgba(0,0,0,0)'
}: AutoplayVideoProps) {
  const [videoStarted, setVideoStarted] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (triggerMode !== 'viewport') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [triggerMode]);

  // Handle playing and pausing based on visibility/trigger mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (triggerMode === 'viewport') {
      if (isIntersecting) {
        video.play().catch((err) => console.log('Autoplay play blocked or failed:', err));
      } else {
        video.pause();
      }
    }
  }, [isIntersecting, triggerMode]);

  const handleMouseEnter = () => {
    if (triggerMode !== 'hover') return;
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => console.log('Hover play blocked or failed:', err));
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode !== 'hover') return;
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  const handleClick = () => {
    if (triggerMode !== 'click') return;
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch((err) => console.log('Click play blocked or failed:', err));
      } else {
        video.pause();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative rounded-2xl overflow-hidden shadow-xl select-none group/video cursor-pointer border border-gray-100 ${aspectRatio} ${className}`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        onPlaying={() => setVideoStarted(true)}
        className="w-full h-full object-cover z-0"
      />

      {/* Crossfading Poster Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-700 ease-in-out pointer-events-none"
        style={{
          backgroundImage: `url(${posterSrc})`,
          opacity: videoStarted ? 0 : 1
        }}
      />

      {/* Styled Color Overlay (e.g. for text contrast) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Optional Hover Action Prompt Indicator */}
      <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full py-1 px-3 text-[10px] tracking-wider uppercase font-mono transition-opacity duration-300 opacity-60 group-hover/video:opacity-100">
        {triggerMode === 'hover' && "Hover to Play"}
        {triggerMode === 'click' && "Click to Play"}
        {triggerMode === 'viewport' && "Autoplay on Scroll"}
      </div>
    </div>
  );
}
