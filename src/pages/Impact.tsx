import React, { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { webPageSchema } from '@/lib/schemas';
import { LeafIcon, GlobeIcon, DropletIcon, BatteryChargingIcon, SparklesIcon, TreesIcon } from 'lucide-react';

interface ImpactStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
}

interface ImpactCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const Counter: React.FC<{ target: number; suffix?: string; duration?: number; decimals?: number }> = ({ 
  target, 
  suffix = '', 
  duration = 2000,
  decimals = 0 
}) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(countRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentCount = progress * target;
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target, duration]);
  
  return (
    <span ref={countRef} className="font-bold">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const ImpactStat: React.FC<ImpactStatProps> = ({ icon, value, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      className="bg-white rounded-xl shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <div className="w-12 h-12 mx-auto mb-4 text-green-600">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-2">
        {value.startsWith('counter:') ? (
          <Counter 
            target={parseInt(value.split(':')[1])} 
            suffix={value.includes('/') ? value.split('/')[1] : ''} 
          />
        ) : (
          value
        )}
      </h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const ImpactCard: React.FC<ImpactCardProps> = ({ title, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="w-12 h-12 text-green-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  angleSpeed: number;
  orbitRadius: number;
  orbitX: number;
  orbitY: number;
  life: number;
  maxLife: number;
}

const ImpactAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.3]);
  
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
    const particleCount = Math.min(120, Math.max(60, window.innerWidth * 0.1));
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      
      // Create grid of orbit points
      const gridSize = Math.ceil(Math.sqrt(particleCount / 3));
      const cellSize = Math.min(canvas.width, canvas.height) / (gridSize * window.devicePixelRatio);
      
      for (let i = 0; i < particleCount; i++) {
        // Create more organized orbital patterns
        let orbitX, orbitY;
        
        if (i < particleCount * 0.7) {
          // 70% of particles in a grid
          const gridX = Math.floor(i / gridSize) % gridSize;
          const gridY = i % gridSize;
          
          orbitX = (gridX + 0.5) * cellSize * 1.5;
          orbitY = (gridY + 0.5) * cellSize * 1.5;
          
          // Add some randomness to grid positions
          orbitX += (Math.random() - 0.5) * cellSize * 0.5;
          orbitY += (Math.random() - 0.5) * cellSize * 0.5;
        } else {
          // 30% random positions
          orbitX = Math.random() * (canvas.width / window.devicePixelRatio);
          orbitY = Math.random() * (canvas.height / window.devicePixelRatio);
        }
        
        const orbitRadius = Math.random() * 80 + 30;
        const angle = Math.random() * Math.PI * 2;
        const angleSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
        const radius = Math.random() * 2 + 1;
        const life = Math.random() * 2000 + 4000; // Longer lifetime in ms
        
        particlesRef.current.push({
          x: orbitX + Math.cos(angle) * orbitRadius,
          y: orbitY + Math.sin(angle) * orbitRadius,
          radius,
          color: `hsla(${110 + Math.random() * 40}, 70%, ${40 + Math.random() * 20}%, ${Math.random() * 0.4 + 0.3})`,
          speed: Math.random() * 0.5 + 0.2,
          angle,
          angleSpeed,
          orbitRadius,
          orbitX,
          orbitY,
          life,
          maxLife: life
        });
      }
    };
    
    initParticles();
    
    // Listen to scroll to adjust animation
    const unsubscribeScroll = scrollYProgress.onChange((progress) => {
      // Slow down particles as user scrolls down
      particlesRef.current.forEach(particle => {
        particle.angleSpeed = particle.angleSpeed * 0.99 + (particle.angleSpeed > 0 ? 0.001 : -0.001) * (1 - progress);
      });
    });
    
    // Animation
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current || 0;
      lastTimeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        
        // Update position in circular motion
        particle.angle += particle.angleSpeed * (deltaTime / 16);
        particle.x = particle.orbitX + Math.cos(particle.angle) * particle.orbitRadius;
        particle.y = particle.orbitY + Math.sin(particle.angle) * particle.orbitRadius;
        
        // Reduce life
        particle.life -= deltaTime;
        
        // Reset if life ends
        if (particle.life <= 0) {
          particle.life = particle.maxLife;
          // Slightly change orbit position
          particle.orbitX += (Math.random() - 0.5) * 5;
          particle.orbitY += (Math.random() - 0.5) * 5;
          
          // Keep in bounds
          if (particle.orbitX < 0) particle.orbitX = 0;
          if (particle.orbitX > canvas.width / window.devicePixelRatio) 
            particle.orbitX = canvas.width / window.devicePixelRatio;
          if (particle.orbitY < 0) particle.orbitY = 0;
          if (particle.orbitY > canvas.height / window.devicePixelRatio) 
            particle.orbitY = canvas.height / window.devicePixelRatio;
        }
        
        // Calculate opacity based on life
        const opacity = Math.min(1, particle.life / particle.maxLife);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
        ctx.fill();
        
        // Connect particles that are close to each other
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const lineOpacity = (1 - distance / 100) * 0.2 * opacity * 
              (otherParticle.life / otherParticle.maxLife);
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
    <motion.canvas 
      ref={canvasRef} 
      style={{ opacity }}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

const Impact: React.FC = () => {
  const impactStats = [
    {
      icon: <LeafIcon className="w-full h-full" />,
      value: "counter:78",
      label: "CO₂ Reduction (thousand tons/year)",
      index: 0
    },
    {
      icon: <TreesIcon className="w-full h-full" />,
      value: "counter:120/K",
      label: "Trees Equivalent Preserved",
      index: 1
    },
    {
      icon: <DropletIcon className="w-full h-full" />,
      value: "counter:25",
      label: "Water Conservation (million gallons/year)",
      index: 2
    },
    {
      icon: <BatteryChargingIcon className="w-full h-full" />,
      value: "counter:45",
      label: "Clean Energy Production (GWh/year)",
      index: 3
    }
  ];

  const impactCards = [
    {
      title: "Carbon Footprint Reduction",
      description: "Our biomass products replace fossil fuels, significantly reducing carbon emissions and helping combat climate change.",
      icon: <GlobeIcon className="w-full h-full" />,
      index: 0
    },
    {
      title: "Waste-to-Value Conversion",
      description: "We transform agricultural and forestry residues that would otherwise be wasted into valuable products, promoting circular economy principles.",
      icon: <SparklesIcon className="w-full h-full" />,
      index: 1
    },
    {
      title: "Sustainable Agriculture",
      description: "Our sourcing practices support sustainable agriculture by providing additional revenue streams for farmers and promoting responsible land management.",
      icon: <LeafIcon className="w-full h-full" />,
      index: 2
    },
    {
      title: "Energy Independence",
      description: "Biomass products contribute to energy independence by providing locally-produced, renewable alternatives to imported fossil fuels.",
      icon: <BatteryChargingIcon className="w-full h-full" />,
      index: 3
    },
    {
      title: "Cleaner Air and Water",
      description: "Compared to fossil fuels, our products produce fewer air pollutants and help protect water resources through responsible manufacturing processes.",
      icon: <DropletIcon className="w-full h-full" />,
      index: 4
    },
    {
      title: "Forest Conservation",
      description: "By utilizing waste materials and promoting sustainable forestry, we help protect natural forests and their biodiversity.",
      icon: <TreesIcon className="w-full h-full" />,
      index: 5
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16 overflow-hidden">
      <SEO
        title="Environmental Impact | Rashmi 6 Paradigm"
        description="Discover the positive environmental impact of our sustainable biomass products — reducing CO₂ emissions, eliminating agricultural waste, and powering clean industry."
        canonical="/impact"
        jsonLd={webPageSchema('Environmental Impact', 'The positive environmental impact of Rashmi 6 Paradigm biomass solutions.', 'https://rashmi6paradigm.com/impact')}
      />
      
      <ImpactAnimation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Environmental Impact
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            At Rashmi 6 Paradigm, sustainability isn't just a buzzword—it's the foundation of everything we do. Explore the measurable difference our products and processes make.
          </motion.p>
        </div>
        
        <motion.div 
          style={{ scale, y }}
          className="mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10"
          >
            Our Impact by the Numbers
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <ImpactStat
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10"
          >
            Environmental Benefits
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactCards.map((card, index) => (
              <ImpactCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                index={index}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center bg-green-100 rounded-lg p-8 shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-4">
            We're committed to continuous improvement in our environmental performance. Each year, we set ambitious targets to reduce our carbon footprint, minimize waste, and enhance the sustainability of our supply chain.
          </p>
          <p className="text-gray-700">
            By choosing Rashmi 6 Paradigm products, you're contributing to a healthier planet for future generations.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Impact; 