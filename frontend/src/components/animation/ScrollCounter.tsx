import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollCounterProps {
  endValue: number;
  startValue?: number;
  duration?: number;  // Duration of animation in seconds
  decimals?: number;   // Number of decimal places
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function ScrollCounter({
  endValue,
  startValue = 0,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}: ScrollCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dataObj = { val: startValue };

    const tl = gsap.to(dataObj, {
      val: endValue,
      duration: duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%', // Triggers when the top of element reaches 90% of screen height
        toggleActions: 'play none none none' // Play once and do not reset
      },
      onUpdate: () => {
        if (el) {
          el.innerText = `${prefix}${dataObj.val.toFixed(decimals)}${suffix}`;
        }
      }
    });

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [endValue, startValue, duration, decimals, prefix, suffix]);

  return (
    <span
      ref={containerRef}
      className={`tabular-nums font-bold ${className}`}
    >
      {prefix}{startValue.toFixed(decimals)}{suffix}
    </span>
  );
}
