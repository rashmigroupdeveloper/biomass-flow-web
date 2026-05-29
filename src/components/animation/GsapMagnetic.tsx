import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GsapMagneticProps {
  children: React.ReactElement;
  strength?: number; // 0 to 1, factor of translation pull
  range?: number;    // Distance in pixels within which magnetic attraction is active
}

export default function GsapMagnetic({
  children,
  strength = 0.38,
  range = 65
}: GsapMagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // We target the immediate child element of this wrapper
    const child = el.firstElementChild as HTMLElement;
    if (!child) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate cursor position relative to the center of the bounding rectangle
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Check if cursor is within range distance
      const distance = Math.hypot(x, y);
      
      if (distance < range) {
        // Apply magnetic pull toward cursor
        gsap.to(child, {
          x: x * strength,
          y: y * strength,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Gently slide back if cursor moves beyond range
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      // Snap back with a premium elastic slide when mouse leaves completely
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.45)',
        overwrite: 'auto'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, range]);

  // Keep the inline container minimal so it does not alter layouts
  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
