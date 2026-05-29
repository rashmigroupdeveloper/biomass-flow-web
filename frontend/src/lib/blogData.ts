export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'biomass-pellets-price-west-bengal-2026',
    title: 'Biomass Pellets Price in West Bengal 2026: Current Rates for NTPC & Industrial Buyers',
    description: 'Current biomass pellet prices in West Bengal for 2026 — what industrial buyers and NTPC co-firing programmes are paying, what drives pricing, and how to get the best rates from a local Kolkata manufacturer.',
    publishedDate: '2026-03-15',
    updatedDate: '2026-05-01',
    readTime: '7 min',
    category: 'Market Pricing',
    tags: ['biomass pellets', 'price', 'West Bengal', 'NTPC', 'industrial boiler'],
  },
  {
    slug: 'ntpc-biomass-cofiring-west-bengal-guide',
    title: 'NTPC & DVC Biomass Co-firing in West Bengal: Mejia, Durgapur & Dumdumi Supply Guide',
    description: 'A complete guide for biomass pellet suppliers and industrial buyers on NTPC and DVC co-firing requirements in West Bengal — covering Mejia TPS, Durgapur Steel TPS, and Dumdumi RTPP procurement specs and process.',
    publishedDate: '2026-04-02',
    updatedDate: '2026-05-10',
    readTime: '9 min',
    category: 'Government Policy',
    tags: ['NTPC', 'DVC', 'co-firing', 'West Bengal', 'Mejia', 'Durgapur', 'biomass mandate'],
  },
  {
    slug: 'bio-pellets-vs-coal-industrial-boilers-india',
    title: 'Bio Pellets vs Coal for Industrial Boilers in India: Cost, Emissions & ROI Comparison',
    description: 'A side-by-side comparison of bio pellets vs coal for industrial boilers in India — calorific value, price per unit of heat, CO₂ savings, boiler compatibility, and a real ROI calculation for cement, textile, and food processing plants.',
    publishedDate: '2026-04-20',
    updatedDate: '2026-05-15',
    readTime: '8 min',
    category: 'Technical Guide',
    tags: ['bio pellets vs coal', 'industrial boiler', 'biomass fuel India', 'cost comparison', 'emissions'],
  },
  {
    slug: 'coconut-shell-activated-carbon-water-treatment-india',
    title: 'Coconut Shell Activated Carbon for Water Treatment: Complete Buyer\'s Guide for India',
    description: 'Everything water treatment plant operators, municipal utilities, and effluent treatment buyers in India need to know about coconut shell activated carbon — specifications, grades, dosing, and how to choose the right supplier.',
    publishedDate: '2026-05-01',
    updatedDate: '2026-05-20',
    readTime: '10 min',
    category: 'Product Guide',
    tags: ['activated carbon', 'coconut shell', 'water treatment', 'GAC', 'PAC', 'India'],
  },
  {
    slug: 'ntpc-biomass-pellet-supplier-empanelment-india-2026',
    title: 'How to Become an NTPC Biomass Pellet Supplier in India: Empanelment Guide 2026',
    description: 'Step-by-step guide to becoming an NTPC-approved biomass pellet supplier in India — eligibility criteria, technical specifications, tender process, documentation, and what buyers need to prepare for the 5–7% mandatory co-firing procurement.',
    publishedDate: '2026-05-15',
    updatedDate: '2026-05-25',
    readTime: '11 min',
    category: 'Supplier Guide',
    tags: ['NTPC supplier', 'biomass empanelment', 'co-firing tender', 'India', 'Make in India'],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
