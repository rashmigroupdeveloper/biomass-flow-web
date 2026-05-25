import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealLineProps {
  className?: string;
  color?: string;
  delay?: number;
  origin?: 'left' | 'center' | 'right';
}

export default function ScrollRevealLine({
  className = '',
  color = 'rgba(255,255,255,0.08)',
  delay = 0,
  origin = 'left',
}: ScrollRevealLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  const originMap = { left: '0%', center: '50%', right: '100%' };

  return (
    <div ref={ref} className={`relative h-px w-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{ background: color, transformOrigin: originMap[origin] }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
