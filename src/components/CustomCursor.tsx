
import React, { useState, useEffect, useRef } from 'react';

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

const CustomCursor = () => {
  // Store the target mouse position
  const targetPosition = useRef({ x: -100, y: -100 });
  // Store the current rendered position
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const animationFrame = useRef<number | null>(null);
  // Track previous position for velocity calculation
  const prevPosition = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  // Track click ripple effects
  const [ripples, setRipples] = useState<{ x: number; y: number; scale: number; opacity: number; id: number }[]>([]);
  const nextRippleId = useRef(0);

  useEffect(() => {
    const updateTargetPosition = (e: MouseEvent) => {
      prevPosition.current = { ...targetPosition.current };
      targetPosition.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity (for particle effects)
      velocity.current = {
        x: targetPosition.current.x - prevPosition.current.x,
        y: targetPosition.current.y - prevPosition.current.y
      };
    };

    const handleLinkHoverOn = () => setLinkHovered(true);
    const handleLinkHoverOff = () => setLinkHovered(false);

    const handleMouseDown = (e: MouseEvent) => {
      setClicked(true);
      // Add ripple effect at click position
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        scale: 0,
        opacity: 0.5,
        id: nextRippleId.current++
      };
      setRipples(prev => [...prev, newRipple]);
    };

    const handleMouseUp = () => setClicked(false);

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener('mousemove', updateTargetPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleLinkHoverOn);
      element.addEventListener('mouseleave', handleLinkHoverOff);
    });

    return () => {
      document.removeEventListener('mousemove', updateTargetPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkHoverOn);
        element.removeEventListener('mouseleave', handleLinkHoverOff);
      });
    };
  }, []);

  // Handle ripple animations with performance optimization
  useEffect(() => {
    if (ripples.length === 0) return;

    const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;

    // Use less frequent updates and faster animations on low-performance devices
    const animationInterval = isLowPerformance ? 32 : 16; // ms between updates
    const scaleIncrement = isLowPerformance ? 0.25 : 0.15;  // faster expansion
    const opacityDecrement = isLowPerformance ? 0.03 : 0.02; // faster fade

    // Limit maximum number of ripples in low performance mode
    const maxRipples = isLowPerformance ? 3 : 10;

    const animateRipples = () => {
      setRipples(prev => {
        // First update existing ripples
        const updatedRipples = prev
          .map(ripple => ({
            ...ripple,
            scale: ripple.scale + scaleIncrement,
            opacity: ripple.opacity - opacityDecrement
          }))
          .filter(ripple => ripple.opacity > 0);

        // Then limit the number if needed
        return updatedRipples.slice(-maxRipples);
      });
    };

    const rippleAnimation = setInterval(animateRipples, animationInterval);
    return () => clearInterval(rippleAnimation);
  }, [ripples]);

  // Animation loop for smooth cursor movement with performance optimization
  useEffect(() => {
    let isMounted = true;
    let lastFrameTime = 0;
    const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;

    // Use a less smooth animation on low-performance devices (higher amt = less smooth but more efficient)
    const amt = isLowPerformance ? 0.3 : 0.15;

    // Throttle animation frame rate on low-performance devices
    const targetFPS = isLowPerformance ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      // Throttle frame rate on low-performance devices
      if (isLowPerformance) {
        const elapsed = timestamp - lastFrameTime;
        if (elapsed < frameInterval) {
          if (isMounted) {
            animationFrame.current = requestAnimationFrame(animate);
          }
          return;
        }
        lastFrameTime = timestamp;
      }

      setPosition(prev => {
        const x = lerp(prev.x, targetPosition.current.x, amt);
        const y = lerp(prev.y, targetPosition.current.y, amt);
        return { x, y };
      });

      if (isMounted) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  // Hide regular cursor and show custom cursor only on desktop
  useEffect(() => {
    // Check if we're on desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (!isMobile) {
      document.body.style.cursor = 'none';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const dotClasses = `
    fixed rounded-full pointer-events-none z-50
    transition-transform duration-150 ease-out
    bg-primary-500
    ${clicked ? 'scale-50' : 'scale-100'}
  `;

  const ringClasses = `
    fixed rounded-full pointer-events-none z-50 border
    transition-all duration-300 ease-out
    border-primary-500
    ${linkHovered ? 'scale-150 border-opacity-20' : 'scale-100'}
    ${clicked ? 'scale-150' : 'scale-100'}
  `;

  // Calculate speed for trail effect
  const speed = Math.sqrt(
    Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
  );
  const trailOpacity = Math.min(speed / 30, 0.5);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={dotClasses}
        style={{
          left: position.x,
          top: position.y,
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s',
          boxShadow: `0 0 ${Math.min(speed * 2, 15)}px 1px rgba(76, 175, 80, ${trailOpacity})`
        }}
      />

      {/* Cursor ring */}
      <div
        className={ringClasses}
        style={{
          left: position.x,
          top: position.y,
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          backgroundColor: linkHovered ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Mouse trail dots - optimized for performance */}
      {speed > 5 && !window.BIOMASS_LOW_PERFORMANCE_MODE &&
        Array.from({ length: Math.min(Math.floor(speed / 10), 5) }).map((_, index) => {
          const trailDistance = (index + 1) * 6;
          const angle = Math.atan2(velocity.current.y, velocity.current.x);
          const trailX = position.x - Math.cos(angle) * trailDistance;
          const trailY = position.y - Math.sin(angle) * trailDistance;

          return (
            <div
              key={`trail-${index}`}
              className="fixed rounded-full pointer-events-none z-40 bg-primary-500"
              style={{
                left: trailX,
                top: trailY,
                width: `${8 - index * 1.5}px`,
                height: `${8 - index * 1.5}px`,
                marginLeft: `-${(8 - index * 1.5) / 2}px`,
                marginTop: `-${(8 - index * 1.5) / 2}px`,
                opacity: 0.3 - index * 0.05
              }}
            />
          );
        })
      }

      {/* Click ripple effects */}
      {ripples.map(ripple => (
        <div
          key={`ripple-${ripple.id}`}
          className="fixed rounded-full pointer-events-none z-40 border border-primary-500"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: `${ripple.scale * 100}px`,
            height: `${ripple.scale * 100}px`,
            marginLeft: `-${ripple.scale * 50}px`,
            marginTop: `-${ripple.scale * 50}px`,
            opacity: ripple.opacity,
            transition: 'width 0.2s, height 0.2s, margin 0.2s, opacity 0.2s'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
