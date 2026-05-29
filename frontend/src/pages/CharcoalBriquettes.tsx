import React from 'react';
import { SEO } from '@/components/SEO';
import { charcoalBriquettesSchema, charcoalBriiquettesFAQSchema, breadcrumbSchema } from '@/lib/schemas';
import { FAQSection } from '@/components/FAQSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import ScrollRevealLine from '@/components/ScrollRevealLine';
import MarqueeTicker from '@/components/MarqueeTicker';

// ── SVG visual for Charcoal Briquettes (hexagonal heat pattern) ──────────
const BriqueArt = () => {
  const hex = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');
    return pts;
  };
  const grid: [number, number][] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const x = 70 + col * 90 + (row % 2) * 45;
      const y = 80 + row * 78;
      grid.push([x, y]);
    }
  }
  return (
    <svg viewBox="0 0 520 380" className="w-full h-full">
      <defs>
        <radialGradient id="hg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(120,53,15,0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="520" height="380" fill="url(#hg)" />
      {grid.map(([x, y], i) => (
        <motion.polygon
          key={i}
          points={hex(x, y, 32)}
          fill="rgba(180,83,9,0.08)"
          stroke="rgba(217,119,6,0.55)"
          strokeWidth="1.2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04, duration: 0.5, ease: 'backOut' }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      {/* Heat shimmer lines */}
      {[120, 200, 280, 360, 440].map((x, i) => (
        <motion.line
          key={`h${i}`}
          x1={x} y1={10} x2={x + 20} y2={370}
          stroke="rgba(251,191,36,0.06)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
        />
      ))}
    </svg>
  );
};

const specs = [
  { label: 'Heat Output', value: '7,500 – 8,200 kcal/kg' },
  { label: 'Fixed Carbon', value: '> 80%' },
  { label: 'Ash Content', value: '< 5%' },
  { label: 'Moisture Content', value: '< 5%' },
  { label: 'Burn Time', value: '3 – 4 hours' },
  { label: 'Sulfur Content', value: '< 0.02%' },
  { label: 'Briquette Shape', value: 'Pillow / Cylinder' },
  { label: 'Packaging', value: '5 kg / 10 kg / 25 kg bags' },
];

const CharcoalBriquettes = () => {
  const [specsInView, setSpecsInView] = React.useState(false);
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const specsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSpecsInView(true); },
      { threshold: 0.1 }
    );
    if (specsRef.current) observer.observe(specsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Charcoal Briquettes Exporter India | BBQ & Shisha | Rashmi 6 Paradigm"
        description="Coconut shell charcoal briquettes for BBQ, shisha/hookah & hospitality. Fixed carbon >75%, low smoke, clean-burning. Exporter to UAE, Netherlands & Gulf markets from India."
        canonical="/products/charcoal-briquettes"
        ogType="product"
        jsonLd={[
          charcoalBriquettesSchema,
          charcoalBriiquettesFAQSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://rashmi6paradigm.com/' },
            { name: 'Products', url: 'https://rashmi6paradigm.com/products/charcoal-briquettes' },
            { name: 'Charcoal Briquettes', url: 'https://rashmi6paradigm.com/products/charcoal-briquettes' },
          ]),
        ]}
      />

      <div className="relative" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section
          className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-28"
          style={{ background: '#110a05' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 60% at 65% 50%, rgba(180,83,9,0.13) 0%, transparent 65%)',
            }}
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-amber-600/60 text-[10px] font-mono uppercase tracking-[0.4em]">
                    Products — 03
                  </span>
                  <ScrollRevealLine color="rgba(217,119,6,0.12)" />
                </div>

                <SplitReveal
                  as="h1"
                  className="font-serif font-bold text-white leading-[0.92] tracking-tight mb-7"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
                  mode="chars"
                  delay={0.15}
                >
                  Charcoal Briquettes
                </SplitReveal>

                <motion.p
                  className="text-white/45 text-base leading-[1.85] font-light max-w-md mb-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Compressed charcoal fuel with 80%+ fixed carbon for consistent, long-burning heat. Produces less smoke, less ash, and more BTUs than conventional wood charcoal.
                </motion.p>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(180,83,9,0.85)', border: '1px solid rgba(217,119,6,0.3)' }}
                  >
                    Request Samples
                  </Link>
                  <a href="#specifications" className="text-white/40 text-sm hover:text-white/70 transition-colors">
                    View Specs ↓
                  </a>
                </motion.div>
              </div>

              <div className="h-64 md:h-80 lg:h-[420px] opacity-80">
                <BriqueArt />
              </div>
            </div>
          </div>
        </section>

        {/* Spec ticker */}
        <div className="py-3 border-y" style={{ background: '#110a05', borderColor: 'rgba(255,255,255,0.05)' }}>
          <MarqueeTicker
            items={[
              { text: 'Fixed Carbon > 80%', accent: true },
              { text: 'Burn Time 3–4 hrs', accent: false },
              { text: 'Ash Content < 5%', accent: true },
              { text: 'Low Smoke Output', accent: false },
              { text: 'Calorific Value 7,000 kcal/kg', accent: true },
              { text: 'Uniform Shape & Size', accent: false },
              { text: 'Shisha / BBQ / Industrial', accent: true },
            ]}
            speed={24}
          />
        </div>

        {/* ── Why Briquettes vs. Wood Charcoal ── */}
        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-6 pb-10 mb-10">
              <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
                Briquettes vs. Wood Charcoal
              </span>
              <ScrollRevealLine color="rgba(0,0,0,0.08)" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[
                { metric: 'Fixed Carbon', briq: '> 80%', wood: '65–75%', better: true },
                { metric: 'Burn Time', briq: '3–4 hrs', wood: '1–2 hrs', better: true },
                { metric: 'Ash Content', briq: '< 5%', wood: '8–15%', better: true },
                { metric: 'Smoke Output', briq: 'Minimal', wood: 'High', better: true },
              ].map((row, i) => (
                <motion.div
                  key={row.metric}
                  className="p-6 border-r border-gray-100 last:border-0"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">{row.metric}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-amber-700 font-medium">Briquette</span>
                      <span className="text-sm font-bold text-gray-800">{row.briq}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">Wood char</span>
                      <span className="text-sm text-gray-400">{row.wood}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Specifications ── */}
        <section id="specifications" ref={specsRef} className="bg-gray-50 py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <motion.h2
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={specsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Consistency you can measure.
                </motion.h2>
                <motion.p
                  className="text-gray-500 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={specsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Every batch tested for fixed carbon, ash, moisture, and calorific value. Full COA shipped with every order.
                </motion.p>
              </div>

              <div className="lg:col-span-8">
                <table className="w-full">
                  <tbody>
                    {specs.map((s, i) => (
                      <motion.tr
                        key={s.label}
                        className="border-b border-gray-200 last:border-0"
                        initial={{ opacity: 0, x: 16 }}
                        animate={specsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                      >
                        <td className="py-4 pr-8 w-1/2">
                          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">{s.label}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-[15px] font-semibold text-gray-800 tabular-nums">{s.value}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Applications ── */}
        <section ref={benefitsRef} className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <h2
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
                >
                  From kitchen to kiln.
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-0">
                {[
                  { sector: 'Restaurant & Hospitality', desc: 'Tandoor ovens, grills, and BBQ setups in restaurant chains and five-star hotels. Long burn time reduces charcoal changes during service hours.' },
                  { sector: 'Food Processing', desc: 'Industrial kilns for bread, ceramic, and pottery firing where consistent, controllable heat is critical to product quality and throughput.' },
                  { sector: 'Metallurgy & Foundry', desc: 'Blacksmithing forges, small-scale metal casting, and jewelry making where cleaner coal alternatives are preferred over traditional coke.' },
                  { sector: 'Export Markets', desc: 'Packaged in pillow and hexagonal briquette shapes for retail and bulk export to Middle East, South Asia, and Southeast Asian markets.' },
                ].map((app, i) => (
                  <motion.div
                    key={app.sector}
                    className="py-7 border-b border-gray-100 last:border-0"
                    initial={{ opacity: 0, x: 16 }}
                    animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1.5">{app.sector}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{app.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-serif font-bold text-gray-900 text-xl">Bulk orders and export inquiries welcome.</p>
                <p className="text-gray-500 text-sm mt-1">Minimum order quantities and custom packaging available.</p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors"
                style={{ background: '#92400e' }}
              >
                Contact Our Team →
              </Link>
            </div>
          </div>
        </section>

        <FAQSection
          title="Charcoal Briquettes — Frequently Asked Questions"
          items={[
            { question: 'What type of charcoal briquettes are best for shisha / hookah?', answer: 'Coconut shell charcoal briquettes are widely considered the best for shisha — high fixed carbon (>75%), low ash, minimal smoke, neutral taste, and 2–3 hour burn time. We supply flat and finger-shaped coconut shell briquettes specifically for the hospitality and export market.' },
            { question: 'Do you export charcoal briquettes to the UAE and Middle East?', answer: 'Yes. We export regularly to the UAE, Netherlands, Maldives, and Gulf markets. We handle all export documentation, SGS quality certificates, and logistics. Contact us for FOB/CIF pricing and free samples.' },
            { question: 'What is the fixed carbon content of your briquettes?', answer: 'Our coconut shell charcoal briquettes have fixed carbon >75%, ash <5%, moisture <8%, and burn time of 2–3 hours. We provide full test certificates from NABL-accredited labs with every shipment.' },
            { question: 'What is the minimum export order quantity?', answer: 'Minimum export order is 1 FCL (20-foot container, approximately 18–20 MT). We also accept smaller domestic trial orders starting at 500 kg. Contact us to discuss your requirement.' },
          ]}
        />

        <Footer />
      </div>
    </>
  );
};

export default CharcoalBriquettes;
