import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Droplets, Wind } from 'lucide-react';

const products = [
  {
    icon: <Flame className="w-6 h-6" />, // using flame as placeholder
    name: 'Biomass Pellets',
    tagline: 'High-efficiency industrial fuel',
    description: 'High-efficiency industrial fuel manufactured from wood waste, sawdust, and agro residues for thermal applications and biomass co-firing. Offers high calorific value, low emissions, and reliable combustion performance.',
    specs: [],
    path: '/products/biomass-pellets',
    accent: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100 text-green-700',
    image: '/images/pellets.jpg'
  },
  {
    icon: <Droplets className="w-6 h-6" />, // placeholder
    name: 'Black (Torrefied) Pellets',
    tagline: 'Advanced high-carbon renewable fuel',
    description: 'Advanced high-carbon renewable fuel engineered for industrial decarbonization and coal replacement applications.',
    specs: [],
    path: '/products/torrefied-pellets',
    accent: 'bg-gray-50 border-gray-200',
    iconBg: 'bg-gray-100 text-gray-700',
    image: '/images/torrefied.jpg'
  },
  {
    icon: <Wind className="w-6 h-6" />, // placeholder
    name: 'Biochar',
    tagline: 'Carbon-rich soil amendment',
    description: 'Innovative carbon‑rich material used in steel, fertilizer, agriculture, carbon sequestration, and environmental applications. Improves soil health while contributing to long‑term carbon reduction initiatives.',
    specs: [],
    path: '/products/biochar',
    accent: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    image: '/images/biochar.jpg'
  },
  {
    icon: <Droplets className="w-6 h-6" />, // reuse droplet icon
    name: 'Activated Carbon',
    tagline: 'High-performance filtration',
    description: 'High‑performance adsorption and filtration solutions for industrial and environmental processes.',
    specs: [],
    path: '/products/activated-carbon',
    accent: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
    image: '/images/activated-carbon.jpg'
  },
  {
    icon: <Wind className="w-6 h-6" />, // placeholder
    name: 'Lump Charcoal',
    tagline: 'Industrial-grade charcoal',
    description: 'Industrial‑grade charcoal with high fixed carbon and low ash content for metallurgical and industrial applications.',
    specs: [],
    path: '/products/lump-charcoal',
    accent: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    image: '/images/lump-charcoal.jpg'
  },
  {
    icon: <Flame className="w-6 h-6" />, // placeholder
    name: 'Palm Kernel Shell (PKS)',
    tagline: 'Premium renewable biomass fuel',
    description: 'Premium renewable biomass fuel sourced through Indonesian operations, offering high calorific value, low ash, and consistent industrial performance for global energy markets.',
    specs: [],
    path: '/products/pks',
    accent: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100 text-green-700',
    image: '/images/pks.jpg'
  },
];

const ProductsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What We Make
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our <span className="text-primary-600">Products</span>
          </motion.h2>
          <motion.div
            className="h-1 w-14 bg-primary-500 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          />
          <motion.p
            className="mt-5 text-gray-500 text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Sustainable biomass products designed to meet your energy and filtration
            needs — manufactured to international quality standards.
          </motion.p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              className={`group bg-white rounded-2xl border ${product.accent} shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              {/* Card top accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${
                i === 0 ? 'from-green-400 to-green-600' :
                i === 1 ? 'from-blue-400 to-blue-600' :
                'from-amber-400 to-amber-600'
              }`} />

              <div className="p-7">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${product.iconBg}`}>
                  {product.icon}
                </div>

                {/* Name + tagline */}
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mb-7">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100"
                    >
                      <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                        {s.label}
                      </div>
                      <div className="text-sm font-bold text-gray-800">{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={product.path}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 group/link transition-colors"
                >
                  Learn more
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-200 hover:-translate-y-0.5"
          >
            Request Samples or Quote
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
