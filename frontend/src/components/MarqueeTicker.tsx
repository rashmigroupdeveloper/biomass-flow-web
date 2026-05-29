import React from 'react';

interface MarqueeItem {
  text: string;
  accent?: boolean;
}

interface MarqueeTickerProps {
  items: MarqueeItem[];
  speed?: number; // seconds per full loop
  direction?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export default function MarqueeTicker({
  items,
  speed = 28,
  direction = 'left',
  className = '',
  style,
}: MarqueeTickerProps) {
  // Triplicate for seamless loop
  const allItems = [...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={style}
      aria-hidden
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee-${direction} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6em',
              padding: '0 1.5em',
              fontSize: '0.6875rem',
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: item.accent ? 'rgba(76,175,80,0.7)' : 'rgba(255,255,255,0.18)',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: item.accent ? 'rgba(76,175,80,0.6)' : 'rgba(255,255,255,0.12)',
                flexShrink: 0,
              }}
            />
            {item.text}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
