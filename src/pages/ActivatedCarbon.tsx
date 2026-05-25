import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import ScrollRevealLine from '@/components/ScrollRevealLine';
import MarqueeTicker from '@/components/MarqueeTicker';

// ── SVG visual for Activated Carbon (porous geometric lattice) ──────────
const CarbonArt = () => {
  const nodes: [number, number][] = [
    [100,80],[200,60],[300,80],[400,60],[480,90],
    [60,160],[160,140],[260,160],[360,140],[460,160],
    [100,240],[200,220],[300,240],[400,220],[480,250],
    [60,320],[160,300],[260,320],[360,300],[460,320],
  ];
  const edges: [number,number][] = [
    [0,1],[1,2],[2,3],[3,4],
    [5,6],[6,7],[7,8],[8,9],
    [10,11],[11,12],[12,13],[13,14],
    [15,16],[16,17],[17,18],[18,19],
    [0,5],[1,6],[2,7],[3,8],[4,9],
    [5,10],[6,11],[7,12],[8,13],[9,14],
    [10,15],[11,16],[12,17],[13,18],[14,19],
  ];
  return (
    <svg viewBox="0 0 540 400" className="w-full h-full">
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(30,30,40,0.5)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="540" height="400" fill="url(#cg)" />
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="rgba(148,163,184,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: i * 0.02, duration: 0.6, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r={4 + (i % 3)}
          fill="rgba(148,163,184,0.12)"
          stroke="rgba(148,163,184,0.55)"
          strokeWidth="1.2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 + 0.3, duration: 0.4, ease: 'backOut' }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
};

const specs = [
  { label: 'Iodine Value', value: '900 – 1,100 mg/g' },
  { label: 'Surface Area (BET)', value: '950 – 1,200 m²/g' },
  { label: 'Moisture Content', value: '< 5%' },
  { label: 'Ash Content', value: '< 8%' },
  { label: 'Bulk Density (GAC)', value: '480 – 520 g/L' },
  { label: 'Particle Size (GAC)', value: '0.5 – 4.75 mm' },
  { label: 'Hardness', value: '> 90%' },
  { label: 'Methylene Blue Value', value: '≥ 200 mg/g' },
];

const types = [
  { code: 'PAC', name: 'Powdered (PAC)', size: '< 75 µm', use: 'Water treatment, pharmaceutical, food processing' },
  { code: 'GAC', name: 'Granular (GAC)', size: '0.5 – 4.75 mm', use: 'Municipal water, HVAC, industrial process gas' },
  { code: 'EAC', name: 'Extruded (EAC)', size: '0.8 – 5 mm cylinders', use: 'Gas purification, solvent recovery, air treatment' },
  { code: 'IAC', name: 'Impregnated', size: 'Custom', use: 'Specialized gas capture, defense, medical applications' },
];

const ActivatedCarbon = () => {
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
      <Helmet>
        <title>Activated Carbon | Rashmi 6 Paradigm</title>
        <meta name="description" content="High-performance activated carbon for water treatment, air purification and industrial filtration. Produced from coconut shells and biomass." />
        <link rel="canonical" href="https://rashmi6paradigm.com/products/activated-carbon" />
      </Helmet>

      <div className="relative" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section
          className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-28"
          style={{ background: '#0d0f14' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 60% at 65% 50%, rgba(100,116,139,0.1) 0%, transparent 65%)',
            }}
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-slate-500/70 text-[10px] font-mono uppercase tracking-[0.4em]">
                    Products — 02
                  </span>
                  <ScrollRevealLine color="rgba(148,163,184,0.12)" />
                </div>

                <SplitReveal
                  as="h1"
                  className="font-serif font-bold text-white leading-[0.92] tracking-tight mb-7"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
                  mode="chars"
                  delay={0.15}
                >
                  Activated Carbon
                </SplitReveal>

                <motion.p
                  className="text-white/45 text-base leading-[1.85] font-light max-w-md mb-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  High-performance adsorbent for water treatment, air purification, and industrial separation. Surface areas exceeding 1,100 m²/g — engineered for demanding industrial applications.
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
                    style={{ background: 'rgba(100,116,139,0.85)', border: '1px solid rgba(148,163,184,0.25)' }}
                  >
                    Request Samples
                  </Link>
                  <a href="#specifications" className="text-white/40 text-sm hover:text-white/70 transition-colors">
                    View Specs ↓
                  </a>
                </motion.div>
              </div>

              <div className="h-64 md:h-80 lg:h-[420px] opacity-80">
                <CarbonArt />
              </div>
            </div>
          </div>
        </section>

        {/* Spec ticker */}
        <div className="py-3 border-y" style={{ background: '#0d0f14', borderColor: 'rgba(255,255,255,0.05)' }}>
          <MarqueeTicker
            items={[
              { text: '1,100 m²/g Surface Area', accent: true },
              { text: 'Iodine Value 900–1,100', accent: false },
              { text: 'PAC / GAC / EAC / IAC', accent: true },
              { text: 'AWWA C606 Tested', accent: false },
              { text: 'Food Grade Available', accent: true },
              { text: 'Moisture < 5%', accent: false },
              { text: 'Hardness > 90%', accent: true },
            ]}
            speed={24}
          />
        </div>

        {/* ── Product Types ── */}
        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-6 pb-10 mb-10">
              <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
                Product Forms
              </span>
              <ScrollRevealLine color="rgba(0,0,0,0.08)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {types.map((t, i) => (
                <motion.div
                  key={t.code}
                  className="py-7 pr-7 border-r border-b border-gray-100 last:border-r-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest block mb-3">{t.code}</span>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{t.name}</h3>
                  <p className="text-[11px] text-primary-600 font-mono mb-3">{t.size}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{t.use}</p>
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
                <SplitReveal
                  as="h2"
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
                  mode="words"
                >
                  Performance parameters that matter.
                </SplitReveal>
                <motion.p
                  className="text-gray-500 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={specsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  All activated carbon tested per IS/AWWA C606 and food-grade standards. Third-party COA available.
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
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.35em]">Industries Served</span>
                </div>
                <h2
                  className="font-serif font-bold text-gray-900 leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
                >
                  Across every purification challenge.
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-0">
                {[
                  { sector: 'Water Treatment', desc: 'Removal of chlorine, organic compounds, pesticides, and taste/odor from municipal and industrial water supplies. Certified for potable water use.' },
                  { sector: 'Air & Gas Purification', desc: 'VOC capture from industrial exhaust, HVAC filtration, solvent recovery, and odor control in food, pharmaceutical, and petrochemical plants.' },
                  { sector: 'Food & Beverage', desc: 'Sugar decolorization, beverage clarification, edible oil purification, and decaffeination — compliant with food-grade purity requirements.' },
                  { sector: 'Pharmaceutical', desc: 'API purification, hemoperfusion cartridge media, and active ingredient stabilization in drug formulation and medical-grade manufacturing.' },
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
                <p className="font-serif font-bold text-gray-900 text-xl">Need a specific grade or custom spec?</p>
                <p className="text-gray-500 text-sm mt-1">Our technical team can formulate activated carbon to your exact requirements.</p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors"
                style={{ background: '#374151' }}
              >
                Contact Our Team →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ActivatedCarbon;
