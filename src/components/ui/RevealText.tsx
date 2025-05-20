
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
}

const RevealText: React.FC<RevealTextProps> = ({
  text,
  as: Component = 'p',
  className = '',
  staggerDelay = 0.03,
  initialDelay = 0.2,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  // Create an array of words
  const words = text.split(' ');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: initialDelay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      // Add GPU acceleration hints
      willChange: 'opacity, transform',
    },
    visible: {
      opacity: 1,
      y: 0,
      willChange: 'opacity, transform',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div ref={ref} className={className} aria-label={text}>
      <Component className="flex flex-wrap">
        <motion.span
          variants={container}
          initial="hidden"
          animate={controls}
          className="inline-flex flex-wrap"
          style={{ willChange: 'opacity' }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={child}
              className="inline-block mr-1 last:mr-0"
              aria-hidden="true"
              style={{
                willChange: 'transform, opacity',
                // Promote to GPU layer
                transform: 'translateZ(0)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    </div>
  );
};

export default RevealText;
