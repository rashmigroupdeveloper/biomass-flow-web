import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

interface ProcessStepProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ title, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.2, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-6 mb-8 relative z-10"
    >
      <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-green-100 flex items-center justify-center mb-4 md:mb-0 md:mr-6 transition-all duration-300 hover:bg-green-200">
        <img src={icon} alt={title} className="w-10 h-10 md:w-14 md:h-14 object-contain" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {index < 5 && (
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-4">
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  direction: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const ProcessAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make canvas responsive
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle configuration
    const particleCount = Math.min(150, Math.max(50, window.innerWidth * 0.08));
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        addParticle(Math.random() * canvas.width, Math.random() * canvas.height);
      }
    };
    
    const addParticle = (x: number, y: number) => {
      const radius = Math.random() * 3 + 1;
      const baseHue = 120; // Green base hue
      const hue = baseHue + Math.random() * 40 - 20;
      const speed = Math.random() * 2 + 0.5;
      const direction = Math.random() * Math.PI * 2;
      const life = Math.random() * 1000 + 1000; // Lifetime in ms
      
      particlesRef.current.push({
        x,
        y,
        radius,
        color: `hsla(${hue}, 70%, 50%, ${Math.random() * 0.4 + 0.3})`,
        speed,
        direction,
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed * 0.3,
        life,
        maxLife: life
      });
    };
    
    initParticles();
    
    // Listen to scroll to adjust flow direction
    const unsubscribeScroll = scrollYProgress.onChange((progress) => {
      const flowStrength = progress * 2; // Increase flow as user scrolls
      particlesRef.current.forEach(particle => {
        // Adjust horizontal velocity based on scroll progress
        particle.vx = (particle.vx * 0.9) + (0.7 * flowStrength);
      });
    });
    
    // Animation
    let lastTime = 0;
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current || 0;
      lastTimeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Draw flow line
      const gradient = ctx.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2);
      gradient.addColorStop(0, 'rgba(76, 175, 80, 0.05)');
      gradient.addColorStop(0.5, 'rgba(76, 175, 80, 0.2)');
      gradient.addColorStop(1, 'rgba(76, 175, 80, 0.05)');
      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        
        // Update position
        particle.x += particle.vx * (deltaTime / 16);
        particle.y += particle.vy * (deltaTime / 16);
        
        // Add a gravity effect towards the center line
        const distanceFromCenter = particle.y - canvas.height / (2 * window.devicePixelRatio);
        particle.y -= distanceFromCenter * 0.03 * (deltaTime / 16);
        
        // Reduce life
        particle.life -= deltaTime;
        
        // Reset if particle goes off-screen or life ends
        if (particle.x > canvas.width / window.devicePixelRatio) {
          particle.x = 0;
        } else if (particle.x < 0) {
          particle.x = canvas.width / window.devicePixelRatio;
        }
        
        if (particle.y > canvas.height / window.devicePixelRatio || 
            particle.y < 0 || 
            particle.life <= 0) {
          // Respawn the particle
          particle.x = Math.random() * 100;
          particle.y = canvas.height / (2 * window.devicePixelRatio) + (Math.random() * 50 - 25);
          particle.life = particle.maxLife;
        }
        
        // Calculate opacity based on life
        const opacity = Math.min(1, particle.life / particle.maxLife);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
        ctx.fill();
        
        // Connect nearby particles with lines
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 60) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const lineOpacity = (1 - distance / 60) * 0.2 * opacity * (otherParticle.life / otherParticle.maxLife);
            ctx.strokeStyle = `rgba(76, 175, 80, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      unsubscribeScroll();
    };
  }, [scrollYProgress]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10 opacity-70"
    />
  );
};

const Process: React.FC = () => {
  const processSteps = [
    {
      title: "Biomass Collection",
      description: "We source sustainable biomass materials from agricultural residues, forest residues, and dedicated energy crops, ensuring a responsible supply chain.",
      icon: "/icons/collection.svg"
    },
    {
      title: "Material Preparation",
      description: "The collected biomass undergoes sorting, cleaning, and size reduction to prepare it for efficient processing.",
      icon: "/icons/preparation.svg"
    },
    {
      title: "Drying",
      description: "The moisture content is carefully reduced using energy-efficient drying techniques to optimize the subsequent processing steps.",
      icon: "/icons/drying.svg"
    },
    {
      title: "Processing",
      description: "Depending on the end product, the biomass undergoes specialized processing, including pelletization, carbonization, or activation.",
      icon: "/icons/processing.svg"
    },
    {
      title: "Quality Control",
      description: "Rigorous testing ensures our products meet international standards for quality, consistency, and environmental performance.",
      icon: "/icons/quality.svg"
    },
    {
      title: "Distribution",
      description: "Our efficient logistics network ensures timely delivery to customers worldwide while minimizing our carbon footprint.",
      icon: "/icons/distribution.svg"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16 overflow-hidden">
      <Helmet>
        <title>Our Process | Rashmi 6 Paradigm</title>
        <meta name="description" content="Learn about the sustainable process behind our biomass products - from collection to distribution." />
      </Helmet>
      
      <ProcessAnimation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Process
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            At Rashmi 6 Paradigm, we transform nature's resources into valuable products through a sustainable, efficient process that minimizes environmental impact.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto text-center bg-green-100 rounded-lg p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Commitment to Innovation</h2>
          <p className="text-gray-700">
            Our process is continuously refined through research and development. We invest in innovative technologies to improve efficiency, reduce waste, and enhance product quality. This commitment ensures we stay at the forefront of sustainable biomass processing.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Process; 