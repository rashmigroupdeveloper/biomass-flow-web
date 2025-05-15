
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  type: 'biomass' | 'energy' | 'connecting';
  life: number;
  maxLife: number;
  originalSize: number;
}

const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{x: number, y: number} | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create particles with different types representing biomass and energy
    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(150, Math.floor(window.innerWidth / 15));
      
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.6 ? 'biomass' : 'energy';
        const size = type === 'biomass' ? 
                     Math.random() * 5 + 2 : // Biomass particles are slightly larger
                     Math.random() * 3 + 1;  // Energy particles are smaller
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          originalSize: size,
          speedX: (Math.random() - 0.5) * 0.8, // Slower movement
          speedY: (Math.random() - 0.5) * 0.8,
          color: getParticleColor(type),
          alpha: Math.random() * 0.5 + (type === 'biomass' ? 0.4 : 0.2),
          type: type,
          life: 1,
          maxLife: Math.random() * 200 + 100 // Particles have different lifespans
        });
      }
    };
    
    const getParticleColor = (type: 'biomass' | 'energy' | 'connecting'): string => {
      const colors = {
        biomass: [
          'rgba(76, 175, 80, alpha)',  // Green - primary-500
          'rgba(46, 125, 50, alpha)',  // Dark green - primary-800
          'rgba(139, 69, 19, alpha)',  // Brown (for wood/straw)
          'rgba(171, 102, 18, alpha)'  // Amber (for agricultural waste)
        ],
        energy: [
          'rgba(165, 214, 167, alpha)', // Light green - primary-200
          'rgba(129, 199, 132, alpha)', // Medium green - primary-300
          'rgba(197, 225, 165, alpha)'  // Pale yellow-green (energy glow)
        ],
        connecting: [
          'rgba(76, 175, 80, alpha)',   // Green for connections
        ]
      };
      
      return colors[type][Math.floor(Math.random() * colors[type].length)];
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Process and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check with bounce effect
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.speedY *= -1;
        }
        
        // Update life cycle
        particle.life -= 0.2;
        if (particle.life <= 0) {
          // Reset particle
          particle.life = particle.maxLife;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.size = particle.originalSize;
          particle.speedX = (Math.random() - 0.5) * 0.8;
          particle.speedY = (Math.random() - 0.5) * 0.8;
        }
        
        // Mouse interaction
        if (mouseRef.current) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Attract particles to mouse
            const angle = Math.atan2(dy, dx);
            const force = (150 - distance) / 1500;
            
            particle.speedX += Math.cos(angle) * force;
            particle.speedY += Math.sin(angle) * force;
            
            // Limit speed
            const maxSpeed = 2;
            const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (speed > maxSpeed) {
              particle.speedX = (particle.speedX / speed) * maxSpeed;
              particle.speedY = (particle.speedY / speed) * maxSpeed;
            }
            
            // Increase size slightly when near mouse
            particle.size = particle.originalSize * 1.2;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('alpha', particle.alpha.toString());
        ctx.fill();
        
        // Draw connections between nearby particles
        connectParticles(particle, particles.slice(index));
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    const connectParticles = (particle: Particle, otherParticles: Particle[]) => {
      for (const otherParticle of otherParticles) {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Calculate connection opacity based on distance
          const alpha = 0.15 * (1 - distance / 100);
          
          if (alpha > 0) {
            // Different connection styles based on particle types
            if (particle.type === 'biomass' && otherParticle.type === 'energy') {
              // Connection between biomass and energy (transformation)
              ctx.beginPath();
              ctx.strokeStyle = `rgba(102, 187, 106, ${alpha * 1.5})`; // Brighter connections for transformation
              ctx.lineWidth = 0.8;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            } else {
              // Regular connections
              ctx.beginPath();
              ctx.strokeStyle = `rgba(76, 175, 80, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        }
      }
    };
    
    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };
    
    // Touch interaction handlers
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      mouseRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };
    
    const handleTouchEnd = () => {
      mouseRef.current = null;
    };
    
    // Initialize
    resizeCanvas();
    createParticles();
    drawParticles();
    
    // Add event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 cursor-none"
    />
  );
};

export default ParticleAnimation;
