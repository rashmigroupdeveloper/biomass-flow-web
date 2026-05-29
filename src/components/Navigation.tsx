import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';

const products = [
  { name: 'Bio Pellets', path: '/products/bio-pellets', desc: 'Compressed agricultural biomass fuel' },
  { name: 'Activated Carbon', path: '/products/activated-carbon', desc: 'High-performance filtration & purification' },
  { name: 'Charcoal Briquettes', path: '/products/charcoal-briquettes', desc: 'Sustainable cooking & industrial fuel' },
];

const contactUs = [
  { name: 'Contact Us', path: '/contactus/contactus', desc: '' },
  { name: 'Career', path: '/contactus/career', desc: '' },
  { name: 'Vender Registeration', path: '/contactus/venderregister', desc: '' },
];

type NavLinkItem =
  | { name: string; path: string }
  | { name: string; path: '#'; dropdown: 'products' | 'contact' };

const navLinks: NavLinkItem[] = [
  { name: 'About', path: '/about' },
  { name: 'Products', path: '#', dropdown: 'products' },
  { name: 'Impact', path: '/impact' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'News', path: '/news' },
  { name: 'Contact Us', path: '#', dropdown: 'contact' },
];

const overlayLinks = [
  { name: 'News', path: '/news' },
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Bio Pellets', path: '/products/bio-pellets' },
  { name: 'Activated Carbon', path: '/products/activated-carbon' },
  { name: 'Charcoal Briquettes', path: '/products/charcoal-briquettes' },
  { name: 'Process', path: '/process' },
  { name: 'Impact', path: '/impact' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contactus/contactus' },
  { name: 'Career', path: '/contactus/career' },
  { name: 'Vendor registration', path: '/contactus/venderregister' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'products' | 'contact' | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLElement>(null);

  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const frosted = scrolled || !isHeroPage;

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-500"
        style={{
          top: 12,
          left: 12,
          right: 12,
          borderRadius: 14,
          padding: frosted ? '3px 20px' : '5px 20px',
          background: frosted ? 'rgba(8,26,9,0.82)' : 'rgba(8,26,9,0)',
          backdropFilter: frosted ? 'blur(22px)' : 'blur(0px)',
          WebkitBackdropFilter: frosted ? 'blur(22px)' : 'blur(0px)',
          border: frosted ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0)',
          boxShadow: frosted ? '0 4px 32px rgba(0,0,0,0.28)' : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0 z-10">
            <img
              src="/logo.png"
              alt="Rashmi 6 Paradigm"
              className="h-10 md:h-12 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              if ('dropdown' in item) {
                const isOpen = openDropdown === item.dropdown;
                const dropdownItems = item.dropdown === 'products' ? products : contactUs;
                const isActiveParent =
                  item.dropdown === 'products'
                    ? location.pathname.startsWith('/products')
                    : location.pathname.startsWith('/contactus') || location.pathname === '/contact';

                return (
                  <div key={item.name} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((d) => (d === item.dropdown ? null : item.dropdown))
                      }
                      className="relative flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg hover:bg-white/8"
                      style={{ color: isActiveParent ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)' }}
                    >
                      {item.name}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`}
                      />
                      {isActiveParent && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400"
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
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
                            {dropdownItems.map((p) => (
                              <Link
                                key={p.path}
                                to={p.path}
                                onClick={() => setOpenDropdown(null)}
                                className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-white/6 transition-colors group"
                              >
                                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                                  {p.name}
                                </span>
                                {p.desc ? (
                                  <span className="text-[11px] text-white/35 group-hover:text-white/50">
                                    {p.desc}
                                  </span>
                                ) : null}
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

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/contactus/contactus"
              className="hidden lg:inline-flex items-center px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-300"
              style={{
                background: 'rgba(76,175,80,0.9)',
                color: 'white',
                border: '1px solid rgba(76,175,80,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(76,175,80,1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(76,175,80,0.9)';
              }}
            >
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              aria-label="Open navigation"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-[61] lg:hidden flex flex-col"
              style={{ background: '#071a09' }}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
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
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  aria-label="Close navigation"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center px-8 pb-4 overflow-y-auto">
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
                        color:
                          location.pathname === item.path
                            ? 'rgba(76,175,80,0.9)'
                            : 'rgba(255,255,255,0.75)',
                        borderColor: 'rgba(255,255,255,0.05)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="px-8 pb-10 pt-4 shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-[11px] font-medium uppercase tracking-wider">
                  {contactUs.map((c) => (
                    <Link
                      key={c.path}
                      to={c.path}
                      onClick={() => setMenuOpen(false)}
                      className="text-white/45 hover:text-white/90 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/contactus/contactus"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-4 rounded-xl font-semibold text-sm transition-colors"
                  style={{ background: '#4caf50', color: 'white' }}
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
