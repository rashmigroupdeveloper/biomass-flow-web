
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BiomassParticleSystem } from '@/utils/particle-system';

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // 3D visualization (placeholder for Three.js implementation)
  useEffect(() => {
    if (!canvasRef.current || !isInView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Draw a simple rotating cylinder as a placeholder for 3D pellet
    let rotation = 0;
    let animationId: number;
    
    // Add glow effect
    ctx.shadowColor = '#66bb6a';
    ctx.shadowBlur = 15;

    const drawCylinder = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const width = 100;
      const height = 200;
      
      // Draw top ellipse with enhanced 3D effect
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY - height/2,
        width * Math.abs(Math.cos(rotation)),
        width * 0.3,
        0,
        0,
        Math.PI * 2
      );
      
      // Create gradient for top
      const topGradient = ctx.createRadialGradient(
        centerX, centerY - height/2, 0,
        centerX, centerY - height/2, width * Math.abs(Math.cos(rotation))
      );
      topGradient.addColorStop(0, '#81c784');
      topGradient.addColorStop(1, '#66bb6a');
      
      ctx.fillStyle = topGradient;
      ctx.fill();
      
      // Draw bottom ellipse with enhanced 3D effect
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY + height/2,
        width * Math.abs(Math.cos(rotation)),
        width * 0.3,
        0,
        0,
        Math.PI * 2
      );
      
      // Create gradient for bottom
      const bottomGradient = ctx.createRadialGradient(
        centerX, centerY + height/2, 0,
        centerX, centerY + height/2, width * Math.abs(Math.cos(rotation))
      );
      bottomGradient.addColorStop(0, '#43a047');
      bottomGradient.addColorStop(1, '#2e7d32');
      
      ctx.fillStyle = bottomGradient;
      ctx.fill();
      
      // Draw sides with enhanced 3D effect
      ctx.beginPath();
      ctx.moveTo(centerX - width * Math.abs(Math.cos(rotation)), centerY - height/2);
      ctx.lineTo(centerX - width * Math.abs(Math.cos(rotation)), centerY + height/2);
      ctx.lineTo(centerX + width * Math.abs(Math.cos(rotation)), centerY + height/2);
      ctx.lineTo(centerX + width * Math.abs(Math.cos(rotation)), centerY - height/2);
      ctx.closePath();
      
      // Create gradient for sides
      const sideGradient = ctx.createLinearGradient(
        centerX - width * Math.abs(Math.cos(rotation)), 0,
        centerX + width * Math.abs(Math.cos(rotation)), 0
      );
      sideGradient.addColorStop(0, '#2e7d32');
      sideGradient.addColorStop(0.5, '#43a047');
      sideGradient.addColorStop(1, '#2e7d32');
      
      ctx.fillStyle = sideGradient;
      ctx.fill();
      
      // Add highlights
      ctx.beginPath();
      ctx.moveTo(centerX - width * 0.5 * Math.abs(Math.cos(rotation)), centerY - height/2);
      ctx.lineTo(centerX - width * 0.5 * Math.abs(Math.cos(rotation)), centerY + height/2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      rotation += 0.01;
      animationId = requestAnimationFrame(drawCylinder);
    };

    drawCylinder();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isInView]);

  const products = [
    {
      name: "Bio Pellets",
      description: "Premium quality biomass pellets from selected Paddy straws, Plant Stalks, and Agro residues for clean thermal applications.",
      specs: [
        { name: "Moisture", value: "<9%" },
        { name: "Calorific Value", value: "4000±200 kcal/kg" },
        { name: "Ash Content", value: "<5%" }
      ],
      link: "/products/bio-pellets"
    },
    {
      name: "Wood Pellets",
      description: "Sustainable wood pellets produced from responsibly sourced wood residues, providing high energy output with minimal emissions.",
      specs: [
        { name: "Moisture", value: "<10%" },
        { name: "Calorific Value", value: "4500±200 kcal/kg" },
        { name: "Ash Content", value: "<1%" }
      ],
      link: "/products/wood-pellets"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="py-20 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decoration elements */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-50"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-50"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-primary-500 font-medium uppercase tracking-wider mb-2 inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sustainable Solutions
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Our <span className="text-primary-500">Products</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover our range of sustainable biomass solutions designed to meet your energy 
              needs while reducing environmental impact.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <motion.h3 
                className="text-2xl font-serif font-bold text-gray-900 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                3D Product Visualization
              </motion.h3>
              <div className="bg-gray-50 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
                <canvas 
                  ref={canvasRef}
                  className="w-full h-full"
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary-100/30 to-transparent"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Interactive 3D view of our biomass pellets
                  <span className="block mt-2 text-primary-600 font-medium">Drag to explore</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardHeader className="pb-3 bg-gradient-to-r from-primary-50 to-white">
                    <Badge className="w-fit mb-2 bg-primary-100 text-primary-700 hover:bg-primary-200">Featured</Badge>
                    <CardTitle className="text-2xl font-serif text-primary-700">{product.name}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {product.specs.map(spec => (
                        <motion.div 
                          key={spec.name} 
                          className="bg-primary-50 rounded-lg p-3 text-center"
                          whileHover={{ y: -3, backgroundColor: "#e8f5e9" }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="block text-xs text-gray-500">{spec.name}</span>
                          <span className="block font-bold text-primary-700">{spec.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to={product.link}>
                        Learn More
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
