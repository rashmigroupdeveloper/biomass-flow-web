import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import GsapMagnetic from '@/components/animation/GsapMagnetic';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  title: string;
  category: string;
  description: string;
  image: string;
  metric: string;
  route: string;
  action: string;
  placement: string;
  imagePosition: string;
  overlay: string;
}

const products: Product[] = [
  {
    title: 'Biomass Pellets',
    category: 'Industrial Fuel',
    description:
      'High-efficiency biomass fuel manufactured from wood waste, sawdust, and agro residues for thermal applications and co-firing.',
    image: '/biomass_pallets.png',
    metric: 'High CV',
    route: '/products/bio-pellets',
    action: 'View product',
    placement: 'md:col-span-6 lg:[grid-column:5/9] lg:[grid-row:2/5] lg:min-h-0',
    imagePosition: 'object-center',
    overlay: 'from-[#07130b]/95 via-[#0f2a16]/70 to-[#43a047]/20',
  },
  {
    title: 'Black Pellets',
    category: 'Torrefied Fuel',
    description:
      'High-carbon renewable fuel engineered for industrial decarbonization and coal replacement.',
    image: '/pel2.jpg',
    metric: 'Coal alternative',
    route: '/contact',
    action: 'Discuss supply',
    placement: 'md:col-span-3 lg:[grid-column:5/9] lg:[grid-row:1/2] lg:min-h-0',
    imagePosition: 'object-center',
    overlay: 'from-[#080808]/95 via-[#252525]/68 to-[#8b7355]/25',
  },
  {
    title: 'Biochar',
    category: 'Carbon Material',
    description:
      'Carbon-rich material for agriculture, steel, fertilizer, sequestration, and environmental use cases.',
    image: '/biochar.jpg',
    metric: 'Carbon rich',
    route: '/contact',
    action: 'Discuss supply',
    placement: 'md:col-span-3 lg:[grid-column:1/5] lg:[grid-row:1/3] lg:min-h-0',
    imagePosition: 'object-center',
    overlay: 'from-[#17120c]/95 via-[#3f2c18]/72 to-[#b46b25]/25',
  },
  {
    title: 'Activated Carbon',
    category: 'Filtration',
    description:
      'High-performance adsorption and filtration media for industrial and environmental processes.',
    image: '/activated_charcoal.png',
    metric: 'Adsorption grade',
    route: '/products/activated-carbon',
    action: 'View product',
    placement: 'md:col-span-3 lg:[grid-column:9/13] lg:[grid-row:1/3] lg:min-h-0',
    imagePosition: 'object-center',
    overlay: 'from-[#071016]/95 via-[#102536]/72 to-[#1976d2]/24',
  },
  {
    title: 'Charcoal Briquettes',
    category: 'Solid Fuel',
    description:
      'Sustainable briquettes with controlled density and dependable burn performance for cooking and industrial heat.',
    image: '/Charcoal_Briquettes.jpg',
    metric: 'Stable burn',
    route: '/products/charcoal-briquettes',
    action: 'View product',
    placement: 'md:col-span-3 lg:[grid-column:1/5] lg:[grid-row:3/5] lg:min-h-0',
    imagePosition: 'object-center',
    overlay: 'from-[#080808]/95 via-[#201f1c]/72 to-[#d08b2f]/22',
  },
  {
    title: 'Palm Kernel Shell',
    category: 'Global Biomass',
    description:
      'Premium renewable biomass fuel sourced through Indonesian operations for consistent global energy supply.',
    image: '/pks.png',
    metric: 'Export ready',
    route: '/contact',
    action: 'Discuss supply',
    placement: 'md:col-span-6 lg:[grid-column:9/13] lg:[grid-row:3/5] lg:min-h-0',
    imagePosition: 'object-center',
    overlay: 'from-[#0b1510]/95 via-[#183729]/72 to-[#2e7d32]/24',
  },
];

export default function ProductPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-portfolio-card]');
      const images = gsap.utils.toArray<HTMLElement>('[data-portfolio-image]');

      if (reduceMotion) {
        gsap.set(cards, { autoAlpha: 1, clearProps: 'transform' });
        gsap.set('[data-portfolio-kicker], [data-portfolio-title], [data-portfolio-copy]', {
          autoAlpha: 1,
          clearProps: 'transform',
        });
        gsap.set('[data-portfolio-rule]', { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        '[data-portfolio-kicker], [data-portfolio-title], [data-portfolio-copy]',
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-portfolio-header]',
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '[data-portfolio-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-portfolio-header]',
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: { each: 0.1, from: 'start' },
          ease: 'power3.out',
          onComplete: () => gsap.set(cards, { clearProps: 'transform' }),
          scrollTrigger: {
            trigger: '[data-portfolio-grid]',
            start: 'top 72%',
            once: true,
          },
        }
      );

      images.forEach((image) => {
        const card = image.closest('[data-portfolio-card]');
        if (!card) return;

        gsap.fromTo(
          image,
          { yPercent: -4, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#f7f8f4] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="container mx-auto px-6 md:px-12">
        <div
          data-portfolio-header
          className="grid gap-10 border-b border-gray-200 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p
              data-portfolio-kicker
              className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary-700"
            >
              02 - Products
            </p>
            <h2
              data-portfolio-title
              className="mt-6 max-w-4xl font-serif font-bold leading-[0.95] text-gray-950"
              style={{ fontSize: 'clamp(2.7rem, 6vw, 5.4rem)' }}
            >
              Our Product{' '}
              <span className="font-normal italic text-primary-700">Portfolio</span>
            </h2>
            <div
              data-portfolio-rule
              className="mt-7 h-0.5 w-24 origin-left bg-primary-500"
            />
          </div>

          <p
            data-portfolio-copy
            className="max-w-xl text-base leading-8 text-gray-600 lg:justify-self-end"
          >
            Renewable fuels, bio-carbon materials, and filtration products arranged for
            quick comparison across energy, industrial, and environmental applications.
          </p>
        </div>

        <div
          data-portfolio-grid
          className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-6 lg:grid-cols-12 lg:auto-rows-[minmax(280px,auto)] lg:gap-6 lg:pb-10"
        >
          {products.map((product, index) => {
            const isFeatured = product.title === 'Biomass Pellets';
            const isCompact = product.title === 'Black Pellets';

            return (
              <article
                key={product.title}
                data-portfolio-card
                className={`group relative isolate flex min-h-[360px] overflow-hidden rounded-md border border-white/80 bg-gray-950 shadow-[0_18px_54px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 hover:border-primary-300 hover:shadow-[0_26px_72px_rgba(15,23,42,0.18)] ${product.placement}`}
              >
                <img
                  data-portfolio-image
                  src={product.image}
                  alt={product.title}
                  className={`absolute inset-0 h-full w-full ${product.imagePosition} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.overlay}`} />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />

                <div className="relative z-10 flex w-full flex-col justify-between p-5 text-white sm:p-6 lg:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">
                        {product.category}
                      </p>
                      <p className="mt-2 text-xs font-medium text-white/55">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                      {product.metric}
                    </span>
                  </div>

                  <div className="max-w-xl transition-transform duration-500 group-hover:-translate-y-1">
                    <h3
                      className={`font-semibold leading-tight text-white ${
                        isFeatured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
                      }`}
                    >
                      {product.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-[38rem] text-sm leading-6 text-white/74 ${
                        isCompact
                          ? 'lg:line-clamp-2'
                          : isFeatured
                            ? 'lg:text-base lg:leading-7'
                            : 'lg:line-clamp-3'
                      }`}
                    >
                      {product.description}
                    </p>
                    <div className={isCompact ? 'mt-4' : 'mt-6'}>
                      <GsapMagnetic strength={0.18} range={70}>
                        <Link
                          to={product.route}
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-gray-950"
                        >
                          {product.action}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </GsapMagnetic>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
