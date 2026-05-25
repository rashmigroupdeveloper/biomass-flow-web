import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** 'chars' for character-level, 'words' for word-level */
  mode?: 'chars' | 'words';
}

export default function SplitReveal({
  children,
  className,
  style,
  as: Tag = 'span',
  delay = 0,
  stagger,
  once = true,
  mode = 'chars',
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' });

  const defaultStagger = mode === 'chars' ? 0.022 : 0.065;
  const s = stagger ?? defaultStagger;

  if (mode === 'words') {
    const words = children.split(' ');
    return (
      // @ts-expect-error dynamic tag
      <Tag ref={ref} className={className} style={{ ...style, display: 'block' }}>
        {words.map((word, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: delay + i * s, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  // Character mode
  const words = children.split(' ');
  let charIndex = 0;

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ ...style, display: 'block' }}>
      {words.map((word, wi) => {
        const chars = word.split('');
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {chars.map((char, ci) => {
              const idx = charIndex++;
              return (
                <span key={ci} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '115%', rotateX: 45, opacity: 0 }}
                    animate={inView ? { y: '0%', rotateX: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.65,
                      delay: delay + idx * s,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
            {wi < words.length - 1 && (
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}
