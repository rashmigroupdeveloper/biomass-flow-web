import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface RevealTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

const wordVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: i,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function RevealText({
  children,
  className,
  style,
  as: Tag = 'span',
  delay = 0,
  stagger = 0.055,
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' });

  const words = children.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ ...style, display: 'block' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            custom={delay + i * stagger}
            variants={wordVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block' }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
