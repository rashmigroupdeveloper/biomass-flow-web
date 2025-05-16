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

  useEffect(() => {
    const updateTargetPosition = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleLinkHoverOn = () => setLinkHovered(true);
    const handleLinkHoverOff = () => setLinkHovered(false);

    const handleMouseDown = () => setClicked(true);
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

  // Animation loop for smooth cursor movement
  useEffect(() => {
    let isMounted = true;
    const animate = () => {
      setPosition(prev => {
        const amt = 0.18; // Lower is smoother/slower, higher is snappier
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

  return (
    <>
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
        }}
      />
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
    </>
  );
};

export default CustomCursor;
