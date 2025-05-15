
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ProductsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple 3D visualization (placeholder for Three.js implementation)
  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Draw a simple rotating cylinder as a placeholder for 3D pellet
    let rotation = 0;
    let animationId: number;

    const drawCylinder = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const width = 100;
      const height = 200;
      
      // Draw top ellipse
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
      ctx.fillStyle = '#66bb6a';
      ctx.fill();
      
      // Draw bottom ellipse
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
      ctx.fillStyle = '#43a047';
      ctx.fill();
      
      // Draw sides
      ctx.beginPath();
      ctx.moveTo(centerX - width * Math.abs(Math.cos(rotation)), centerY - height/2);
      ctx.lineTo(centerX - width * Math.abs(Math.cos(rotation)), centerY + height/2);
      ctx.lineTo(centerX + width * Math.abs(Math.cos(rotation)), centerY + height/2);
      ctx.lineTo(centerX + width * Math.abs(Math.cos(rotation)), centerY - height/2);
      ctx.closePath();
      ctx.fillStyle = '#2e7d32';
      ctx.fill();
      
      rotation += 0.01;
      animationId = requestAnimationFrame(drawCylinder);
    };

    drawCylinder();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

  const products = [
    {
      name: "Bio Pellets",
      description: "Premium quality biomass pellets from selected Paddy straws, Plant Stalks, and Agro residues for clean thermal applications.",
      specs: [
        { name: "Moisture", value: "<9%" },
        { name: "Calorific Value", value: "4000±200 kcal/kg" },
        { name: "Ash Content", value: "<5%" }
      ]
    },
    {
      name: "Wood Pellets",
      description: "Sustainable wood pellets produced from responsibly sourced wood residues, providing high energy output with minimal emissions.",
      specs: [
        { name: "Moisture", value: "<10%" },
        { name: "Calorific Value", value: "4500±200 kcal/kg" },
        { name: "Ash Content", value: "<1%" }
      ]
    }
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 md:py-32 bg-gray-50"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-primary-500">Products</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our range of sustainable biomass solutions designed to meet your energy needs while reducing environmental impact.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">3D Product Visualization</h3>
              <div className="bg-gray-50 rounded-lg h-80 flex items-center justify-center">
                <canvas 
                  ref={canvasRef}
                  className="w-full h-full"
                ></canvas>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Drag to rotate and explore our biomass pellets in 3D
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-primary-700 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {product.specs.map(spec => (
                      <div key={spec.name} className="bg-primary-50 rounded-lg p-3 text-center">
                        <span className="block text-xs text-gray-500">{spec.name}</span>
                        <span className="block font-bold text-primary-700">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to="/contact" 
                    className="inline-block w-full text-center py-3 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                  >
                    Request Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
