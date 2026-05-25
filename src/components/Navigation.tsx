import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';

const products = [
  { name: 'Bio Pellets', path: '/products/bio-pellets', desc: 'Compressed agricultural biomass fuel' },
  { name: 'Activated Carbon', path: '/products/activated-carbon', desc: 'High-performance filtration & purification' },
  { name: 'Charcoal Briquettes', path: '/products/charcoal-briquettes', desc: 'Sustainable cooking & industrial fuel' },
];

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Products', path: '#', hasDropdown: true },
  { name: 'Impact', path: '/impact' },
  { name: 'Certificates', path: '/certificates' },
];

const overlayLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Bio Pellets', path: '/products/bio-pellets' },
  { name: 'Activated Carbon', path: '/products/activated-carbon' },
  { name: 'Charcoal Briquettes', path: '/products/charcoal-briquettes' },
  { name: 'Process', path: '/process' },
  { name: 'Impact', path: '/impact' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // On hero: transparent until scroll. On inner pages: always frosted.
  const frosted = scrolled || !isHeroPage;

  return (
    <>
      {/* ── Floating nav bar ── */}
      <header
        className="fixed z-50 transition-all duration-500"
        style={{
          top: 12,
          left: 16,
          right: 16,
          borderRadius: 14,
          padding: frosted ? '10px 20px' : '14px 20px',
          background: frosted ? 'rgba(8,26,9,0.82)' : 'rgba(8,26,9,0)',
          backdropFilter: frosted ? 'blur(22px)' : 'blur(0px)',
          WebkitBackdropFilter: frosted ? 'blur(22px)' : 'blur(0px)',
          border: frosted ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0)',
          boxShadow: frosted ? '0 4px 32px rgba(0,0,0,0.28)' : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-10">
            <img
              src="/logo.png"
              alt="Rashmi 6 Paradigm"
              className="h-8 md:h-9 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.name} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setProductsOpen((v) => !v)}
                      className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white/80 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/8"
                    >
                      {item.name}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 opacity-60 ${productsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-0 mt-3 w-72"
                          style={{
                            background: 'rgba(8,26,9,0.95)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 12,
                            overflow: 'hidden',
                          }}
                        >
                          <div className="p-2">
                            {products.map((p) => (
                              <Link
                                key={p.path}
                                to={p.path}
                                className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-white/6 transition-colors group"
                              >
                                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                                  {p.name}
                                </span>
                                <span className="text-[11px] text-white/35 group-hover:text-white/50">
                                  {p.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg hover:bg-white/8"
                  style={{ color: active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)' }}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA + mobile trigger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-300"
              style={{
                background: 'rgba(76,175,80,0.9)',
                color: 'white',
                border: '1px solid rgba(76,175,80,0.3)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(76,175,80,1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(76,175,80,0.9)')}
            >
              Get a Quote
            </Link>

            {/* Mobile: "MENU" text trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              aria-label="Open navigation"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop tap to close */}
            <motion.div
              className="fixed inset-0 z-[60] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Overlay panel */}
            <motion.div
              className="fixed inset-0 z-[61] lg:hidden flex flex-col"
              style={{ background: '#071a09' }}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Overlay header */}
              <div className="flex items-center justify-between px-6 py-5">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="Rashmi 6 Paradigm"
                    className="h-8 w-auto"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  aria-label="Close navigation"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>

              {/* Large stacked nav links */}
              <nav className="flex-1 flex flex-col justify-center px-8 pb-4">
                {overlayLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 border-b transition-colors"
                      style={{
                        fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700,
                        color: location.pathname === item.path ? 'rgba(76,175,80,0.9)' : 'rgba(255,255,255,0.75)',
                        borderColor: 'rgba(255,255,255,0.05)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom contact strip */}
              <motion.div
                className="px-8 pb-10 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-4 rounded-xl font-semibold text-sm transition-colors"
                  style={{ background: '#4caf50', color: 'white' }}
                >
                  Get a Quote
                </Link>
                <p className="text-center text-[11px] text-white/25 mt-3 font-mono">
                  bioenergy.tender@rashmigroup.com
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
