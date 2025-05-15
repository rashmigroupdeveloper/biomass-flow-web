
import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleLinkHoverOn = () => setLinkHovered(true);
    const handleLinkHoverOff = () => setLinkHovered(false);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener('mousemove', updatePosition);
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
      document.removeEventListener('mousemove', updatePosition);
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

  const cursorClasses = `
    fixed pointer-events-none z-50 transition-opacity duration-300
    ${hidden ? 'opacity-0' : 'opacity-100'}
  `;

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
          marginTop: '-4px'
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
          backgroundColor: linkHovered ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
        }}
      />
    </>
  );
};

export default CustomCursor;
