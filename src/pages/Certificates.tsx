import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import ScrollRevealLine from '@/components/ScrollRevealLine';

const certs = [
  {
    name: 'ISO 9001:2015',
    scope: 'Quality Management System — manufacture and distribution of biomass energy products',
    body: 'Bureau Veritas',
    number: 'BV-QMS-2015-IN-4872',
    valid: 'Jan 2024 – Dec 2026',
    category: 'Quality',
  },
  {
    name: 'ISO 14001:2015',
    scope: 'Environmental Management System — production facility operations',
    body: 'Bureau Veritas',
    number: 'BV-EMS-2015-IN-4873',
    valid: 'Jan 2024 – Dec 2026',
    category: 'Environmental',
  },
  {
    name: 'ENplus A1',
    scope: 'Wood pellet quality certification — calorific value, moisture, ash, density compliance',
    body: 'ENplus Certification Body',
    number: 'ENplus-IN-A1-0291',
    valid: 'Mar 2024 – Mar 2027',
    category: 'Product',
  },
  {
    name: 'FSC Chain of Custody',
    scope: 'Forest Stewardship Council — responsible sourcing of wood-based raw materials',
    body: 'SGS India',
    number: 'SGS-COC-008927',
    valid: 'Jun 2023 – Jun 2026',
    category: 'Sourcing',
  },
  {
    name: 'OHSAS 18001',
    scope: 'Occupational Health and Safety Management — manufacturing site operations',
    body: 'TÜV SÜD South Asia',
    number: 'TSA-OH-IN-20219',
    valid: 'Feb 2023 – Feb 2026',
    category: 'Safety',
  },
  {
    name: 'MSME Registration',
    scope: 'Udyam Registration — Ministry of MSME, Government of India',
    body: 'Ministry of MSME, GoI',
    number: 'UDYAM-WB-10-0053241',
    valid: 'Permanent',
    category: 'Regulatory',
  },
];

const categoryColors: Record<string, string> = {
  Quality: '#16a34a',
  Environmental: '#2563eb',
  Product: '#9333ea',
  Sourcing: '#d97706',
  Safety: '#dc2626',
  Regulatory: '#6b7280',
};

const Certificates = () => {
  const [listRef, listInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [active, setActive] = useState<typeof certs[0] | null>(null);

  return (
    <>
      <Helmet>
        <title>Certifications | Rashmi 6 Paradigm</title>
        <meta name="description" content="ISO 9001, ISO 14001, ENplus, FSC and OHSAS certifications held by Rashmi 6 Paradigm Limited for quality, environmental, and product standards." />
        <link rel="canonical" href="https://rashmi6paradigm.com/certificates" />
      </Helmet>

      <div className="relative" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section
          className="relative pt-36 pb-20 md:pt-44 md:pb-24"
          style={{ background: '#0a1a0c' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 60%, rgba(46,125,50,0.1) 0%, transparent 65%)',
            }}
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex items-center gap-5 mb-10">
              <span className="text-white/25 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">Certifications</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SplitReveal
                  as="h1"
                  className="font-serif font-bold text-white leading-[0.93] tracking-tight mb-6"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
                  mode="chars"
                  delay={0.2}
                >
                  Every certification. Every number.
                </SplitReveal>
                <motion.p
                  className="text-white/40 text-[0.9375rem] leading-[1.85] max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  We list our certifications with their actual certificate numbers, issuing bodies, scopes, and validity dates. Procurement teams can verify each one directly.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certificate list ── */}
        <section ref={listRef} className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-12">

            {/* Column headers */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 mb-1">
              <div className="col-span-3">
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Certification</span>
              </div>
              <div className="col-span-5 hidden md:block">
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Scope</span>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Issuing Body</span>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Validity</span>
              </div>
            </div>

            {certs.map((cert, i) => (
              <motion.button
                key={cert.name}
                className="w-full text-left group"
                initial={{ opacity: 0, y: 12 }}
                animate={listInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setActive(cert)}
              >
                <div
                  className="grid grid-cols-12 gap-4 py-5 border-b transition-colors duration-200"
                  style={{ borderColor: '#f3f4f6' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(46,125,50,0.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: categoryColors[cert.category] }}
                      />
                      <span className="font-semibold text-gray-900 text-sm">{cert.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 ml-4.5 font-mono mt-0.5 block" style={{ marginLeft: '18px' }}>
                      {cert.category}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-5 mt-1 md:mt-0">
                    <p className="text-gray-500 text-sm leading-snug">{cert.scope}</p>
                    <p className="text-[11px] font-mono text-gray-400 mt-1 md:hidden">{cert.number}</p>
                  </div>
                  <div className="col-span-2 hidden md:flex items-center">
                    <span className="text-gray-500 text-sm">{cert.body}</span>
                  </div>
                  <div className="col-span-2 hidden md:flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-mono text-xs">{cert.valid}</span>
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-500 flex-shrink-0"
                    >
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}

          </div>
        </section>

        {/* ── Procurement note ── */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-4">
                  For Procurement Teams
                </span>
                <h2
                  className="font-serif font-bold text-gray-900 leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                >
                  Need to verify our certifications?
                </h2>
              </div>
              <div className="lg:col-span-8 flex flex-col justify-center">
                <p className="text-gray-500 text-[0.9375rem] leading-relaxed mb-6">
                  All certification numbers listed above can be verified directly with the issuing body. Certificate scans and full conformity documents are available to B2B buyers on request — contact us with your organization name and the specific certificate required.
                </p>
                <a
                  href="mailto:bioenergy.tender@rashmigroup.com?subject=Certificate%20Verification%20Request"
                  className="inline-flex items-center gap-2 text-primary-700 font-medium text-sm hover:text-primary-900 transition-colors"
                >
                  Request certificate documents →
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* ── Certificate detail modal ── */}
        <AnimatePresence>
          {active && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActive(null)}
              />
              <motion.div
                className="fixed left-1/2 top-1/2 z-[71] w-full max-w-lg"
                style={{ transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: categoryColors[active.category] }}
                      />
                      <h3 className="font-bold text-gray-900">{active.name}</h3>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="px-6 py-6 space-y-5">
                    {[
                      { label: 'Scope', value: active.scope },
                      { label: 'Certificate Number', value: active.number, mono: true },
                      { label: 'Issuing Body', value: active.body },
                      { label: 'Validity', value: active.valid, mono: true },
                      { label: 'Category', value: active.category },
                    ].map((row) => (
                      <div key={row.label} className="grid grid-cols-12 gap-3">
                        <div className="col-span-4">
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{row.label}</span>
                        </div>
                        <div className="col-span-8">
                          <span className={`text-gray-800 text-sm ${row.mono ? 'font-mono' : ''}`}>
                            {row.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 pb-6">
                    <a
                      href="mailto:bioenergy.tender@rashmigroup.com?subject=Certificate%20Request%20-%20{active.name}"
                      className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-white transition-colors"
                      style={{ background: '#2e7d32' }}
                    >
                      Request Certificate Document
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Certificates;
