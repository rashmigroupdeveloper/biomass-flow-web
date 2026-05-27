const BASE_URL = 'https://rashmi6paradigm.com';

// ── Core entity schemas ────────────────────────────────────────────────────

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Organization', 'ManufacturingBusiness'],
  name: 'Rashmi 6 Paradigm Limited',
  url: BASE_URL,
  logo: `${BASE_URL}/android-chrome-512x512.png`,
  image: `${BASE_URL}/android-chrome-512x512.png`,
  description:
    "Eastern India's leading manufacturer of Bio Pellets, Activated Carbon, and Charcoal Briquettes — supplying NTPC & DVC co-firing programmes, industrial boilers, water treatment plants, and export markets since 2015.",
  foundingDate: '2015',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    postalCode: '700001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.5726',
    longitude: '88.3639',
  },
  areaServed: [
    { '@type': 'State', name: 'West Bengal' },
    { '@type': 'State', name: 'Jharkhand' },
    { '@type': 'State', name: 'Odisha' },
    { '@type': 'Country', name: 'India' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: `${BASE_URL}/contact`,
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Bengali'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Biomass Products',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bio Pellets', url: `${BASE_URL}/products/bio-pellets` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Activated Carbon', url: `${BASE_URL}/products/activated-carbon` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Charcoal Briquettes', url: `${BASE_URL}/products/charcoal-briquettes` } },
    ],
  },
  sameAs: ['https://twitter.com/rashmi6paradigm'],
  knowsAbout: [
    'Biomass Pellets',
    'Agro Pellets',
    'NTPC Co-firing',
    'DVC Co-firing',
    'Activated Carbon',
    'Coconut Shell Activated Carbon',
    'Charcoal Briquettes',
    'Renewable Energy',
    'Biomass Co-firing Policy India',
  ],
};

export const organizationSchema = localBusinessSchema;

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rashmi 6 Paradigm Limited',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// ── Product schemas ─────────────────────────────────────────────────────────

const manufacturerRef = {
  '@type': 'Organization',
  name: 'Rashmi 6 Paradigm Limited',
  url: BASE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
};

export const bioPelletsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Bio Pellets — Agro-waste Biomass Fuel',
  description:
    'Premium agricultural waste bio pellets for NTPC & DVC co-firing, industrial boilers, cement kilns, and textile mills. 6–8 mm diameter, calorific value 3,800–4,200 kcal/kg, ash <5%, moisture <10%, bulk density ≥600 kg/m³. Manufacturer in Kolkata, Eastern India.',
  brand: { '@type': 'Brand', name: 'Rashmi 6 Paradigm' },
  manufacturer: manufacturerRef,
  category: 'Biomass Fuel',
  material: 'Agricultural waste — paddy straw, sugarcane bagasse, groundnut shells, rice husk',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Diameter', value: '6–8 mm' },
    { '@type': 'PropertyValue', name: 'Calorific Value (GCV)', value: '3,800–4,200 kcal/kg' },
    { '@type': 'PropertyValue', name: 'Moisture Content', value: '<10%' },
    { '@type': 'PropertyValue', name: 'Ash Content', value: '<5%' },
    { '@type': 'PropertyValue', name: 'Bulk Density', value: '≥600 kg/m³' },
    { '@type': 'PropertyValue', name: 'Certifications', value: 'ISO 9001, BIS IS 17084:2018' },
    { '@type': 'PropertyValue', name: 'Minimum Order Quantity', value: '5 metric tonnes' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Thermal power plants (NTPC, DVC), cement kilns, textile boilers (Surat, Tirupur), food processing, distilleries',
  },
  url: `${BASE_URL}/products/bio-pellets`,
};

export const activatedCarbonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Activated Carbon — Coconut Shell & Biomass',
  description:
    'Coconut shell and biomass activated carbon for water treatment, air purification, gold recovery, pharmaceutical, and industrial filtration. Granular (GAC) and powder (PAC) grades. ISO-certified Indian manufacturer, exported to USA, Turkey, Chile, and Middle East.',
  brand: { '@type': 'Brand', name: 'Rashmi 6 Paradigm' },
  manufacturer: manufacturerRef,
  category: 'Industrial Filtration Media',
  material: 'Coconut shell, biomass',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Form', value: 'Granular (GAC) and Powder (PAC)' },
    { '@type': 'PropertyValue', name: 'Applications', value: 'Water treatment, air purification, gold recovery, pharmaceuticals, food processing' },
    { '@type': 'PropertyValue', name: 'Iodine Number', value: '800–1100 mg/g' },
    { '@type': 'PropertyValue', name: 'Export Markets', value: 'USA, Turkey, Chile, UAE, Middle East' },
    { '@type': 'PropertyValue', name: 'Certifications', value: 'ISO 9001, ISO 14001' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Municipal water utilities, pharmaceutical manufacturers, gold refineries, effluent treatment plants',
  },
  url: `${BASE_URL}/products/activated-carbon`,
};

export const charcoalBriquettesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Charcoal Briquettes — Coconut Shell & Biomass',
  description:
    'High fixed-carbon charcoal briquettes for BBQ, shisha/hookah, hospitality, and industrial heating. Fixed carbon >75%, low smoke, clean-burning. Exporter to UAE, Netherlands, Maldives, and Gulf markets.',
  brand: { '@type': 'Brand', name: 'Rashmi 6 Paradigm' },
  manufacturer: manufacturerRef,
  category: 'Biomass Fuel',
  material: 'Coconut shell, agricultural biomass',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Fixed Carbon', value: '>75%' },
    { '@type': 'PropertyValue', name: 'Applications', value: 'BBQ, shisha/hookah, hospitality, industrial heating' },
    { '@type': 'PropertyValue', name: 'Export Markets', value: 'UAE, Netherlands, Maldives, Gulf region' },
    { '@type': 'PropertyValue', name: 'Burning Time', value: '2–3 hours' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Hospitality industry, shisha bars, BBQ restaurants, exporters, industrial buyers',
  },
  url: `${BASE_URL}/products/charcoal-briquettes`,
};

// ── FAQ schemas (trigger Google rich snippets / People Also Ask) ────────────

export const bioPelletsFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the price of bio pellets per tonne in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bio pellet prices in India range from ₹7,500 to ₹13,000 per metric tonne depending on specification (calorific value, ash content), quantity, and delivery location. Our pellets for NTPC co-firing and industrial boilers are competitively priced — contact us for a bulk quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the specifications of bio pellets for NTPC co-firing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NTPC requires agro-residue bio pellets with GCV ≥ 3,000 kcal/kg (typically 3,800–4,200 kcal/kg), moisture <14%, ash content <10%, diameter 6–8 mm, and bulk density ≥600 kg/m³. Our pellets meet CEA and NTPC tender specifications (IS 17084:2018).',
      },
    },
    {
      '@type': 'Question',
      name: 'What raw materials are used to make bio pellets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We manufacture bio pellets from 100% agricultural waste including paddy straw, rice husk, sugarcane bagasse, groundnut shells, and mustard husk — sourced directly from local farmers in Eastern India, ensuring a clean and traceable supply chain.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity for bio pellets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our minimum order quantity is 5 metric tonnes for trial orders. For long-term supply contracts (monthly / quarterly), we supply 500+ MT per month across West Bengal, Jharkhand, Odisha, and other states. Contact us to discuss delivery schedules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can bio pellets replace coal in industrial boilers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bio pellets are a direct drop-in replacement for coal in stoker and fluidised-bed boilers. With a calorific value of 3,800–4,200 kcal/kg and low sulphur content, they reduce CO₂ emissions by up to 80% compared to coal while meeting the Government of India\'s mandatory biomass co-firing policy.',
      },
    },
  ],
};

export const activatedCarbonFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is coconut shell activated carbon used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coconut shell activated carbon is used for drinking water purification, effluent treatment, air filtration, gold recovery in mining, pharmaceutical manufacturing (removing toxins), food and beverage decolourisation, and solvent recovery. Its high hardness and iodine number (800–1100 mg/g) make it ideal for demanding industrial applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between granular activated carbon (GAC) and powdered activated carbon (PAC)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GAC (8×30 or 12×40 mesh) is used in fixed-bed filters for continuous water and air treatment — it can be reactivated and reused. PAC is a fine powder added directly to water or process streams for rapid adsorption of taste, odour, and contaminants. We supply both grades from our facility in Kolkata.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you export activated carbon from India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We export coconut shell and biomass activated carbon to the USA, Turkey, Chile, UAE, and other international markets. India is among the top global exporters of activated carbon, and our ISO 9001 & ISO 14001 certified products meet international quality standards. Contact us for export pricing and documentation.',
      },
    },
  ],
};

export const charcoalBriiquettesFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What type of charcoal briquettes are best for shisha / hookah?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coconut shell charcoal briquettes are widely considered the best for shisha and hookah — they have high fixed carbon (>75%), low ash, minimal smoke, and long burn time (2–3 hours). They do not impart any taste or odour to the smoke. We supply flat and finger-shaped coconut shell briquettes for the hospitality and export market.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you export charcoal briquettes to the UAE and Middle East?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We regularly export charcoal briquettes to the UAE, Netherlands, Maldives, and Gulf markets for BBQ and shisha use. We handle all export documentation, quality certificates, and logistics. Contact us for FOB/CIF pricing and sample requests.',
      },
    },
  ],
};

// ── Article schema (blog posts) ────────────────────────────────────────────

export function articleSchema(title: string, description: string, url: string, publishedDate: string, updatedDate: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedDate,
    dateModified: updatedDate,
    author: {
      '@type': 'Organization',
      name: 'Rashmi 6 Paradigm Limited',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rashmi 6 Paradigm Limited',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/android-chrome-512x512.png` },
    },
    isPartOf: { '@type': 'WebSite', url: BASE_URL },
    about: { '@type': 'Thing', name: 'Biomass Energy India' },
  };
}

// ── Helper schemas ──────────────────────────────────────────────────────────

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: { '@type': 'WebSite', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Rashmi 6 Paradigm Limited', url: BASE_URL },
  };
}
