import React from 'react';
import { SEO } from '@/components/SEO';
import { articleSchema, activatedCarbonFAQSchema, breadcrumbSchema } from '@/lib/schemas';
import { BlogPostLayout } from '@/components/BlogPostLayout';
import { getBlogPost } from '@/lib/blogData';

const post = getBlogPost('coconut-shell-activated-carbon-water-treatment-india')!;

const ActivatedCarbonWaterTreatment = () => (
  <>
    <SEO
      title={post.title}
      description={post.description}
      canonical={`/blog/${post.slug}`}
      jsonLd={[
        articleSchema(post.title, post.description, `https://rashmi6paradigm.com/blog/${post.slug}`, post.publishedDate, post.updatedDate),
        activatedCarbonFAQSchema,
        breadcrumbSchema([
          { name: 'Home', url: 'https://rashmi6paradigm.com/' },
          { name: 'Blog', url: 'https://rashmi6paradigm.com/blog' },
          { name: 'Activated Carbon Water Treatment', url: `https://rashmi6paradigm.com/blog/${post.slug}` },
        ]),
      ]}
    />
    <BlogPostLayout {...post}>

      <p>
        Activated carbon is one of the most widely used materials in water treatment — yet most
        buyers in India still source it from intermediaries without fully understanding what
        specifications they need or how to evaluate quality.
      </p>
      <p>
        This guide covers everything a water treatment plant operator, municipal utility, or ETP
        (Effluent Treatment Plant) manager needs to know about coconut shell activated carbon —
        from how it works to how to specify and procure the right grade.
      </p>

      <h2>Why Coconut Shell Activated Carbon?</h2>
      <p>
        Activated carbon can be made from coal, wood, biomass, or coconut shells. For water
        treatment applications, <strong>coconut shell activated carbon is preferred</strong> for
        several reasons:
      </p>
      <ul>
        <li>
          <strong>Higher hardness</strong> — coconut shell carbon has a hardness number of 95–98
          vs 75–85 for coal-based carbon, meaning less attrition and longer filter bed life
        </li>
        <li>
          <strong>Microporous structure</strong> — ideal for removing dissolved organic contaminants,
          taste, odour, chlorine, and chloramines from drinking water
        </li>
        <li>
          <strong>Lower ash content</strong> — typically 2–4% vs 8–15% for coal-based, which
          means cleaner effluent from the carbon bed itself
        </li>
        <li>
          <strong>Reactivatable</strong> — spent coconut shell GAC can be thermally reactivated
          2–4 times, significantly reducing lifecycle cost
        </li>
      </ul>

      <h2>GAC vs PAC: Which Do You Need?</h2>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Granular Activated Carbon (GAC)</th>
            <th>Powdered Activated Carbon (PAC)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Form</td>
            <td>8×30, 12×40 mesh granules</td>
            <td>Fine powder (&lt;75 micron)</td>
          </tr>
          <tr>
            <td>Application method</td>
            <td>Fixed-bed filter column</td>
            <td>Dosed directly into water stream</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Continuous water treatment, long contact time</td>
            <td>Seasonal/intermittent contamination events</td>
          </tr>
          <tr>
            <td>Reactivation</td>
            <td>Yes — 2–4 reactivation cycles</td>
            <td>No — single-use, disposed with sludge</td>
          </tr>
          <tr>
            <td>Contaminants removed</td>
            <td>THMs, VOCs, chlorine, pesticides, colour, odour</td>
            <td>Same, plus algae toxins, emergency dosing</td>
          </tr>
          <tr>
            <td>Typical dose</td>
            <td>Filter bed volume, contact time 10–20 min</td>
            <td>5–50 mg/L depending on contamination level</td>
          </tr>
          <tr>
            <td>Price (₹/kg)</td>
            <td>₹80–₹150</td>
            <td>₹60–₹120</td>
          </tr>
        </tbody>
      </table>

      <h2>Key Specifications to Specify When Buying</h2>
      <p>
        When procuring activated carbon for water treatment, specify these parameters — and require
        test certificates from a NABL-accredited lab:
      </p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Standard Grade</th>
            <th>Premium Grade (Drinking Water)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Iodine Number (mg/g)</td>
            <td>800–900</td>
            <td>1,000–1,100</td>
          </tr>
          <tr>
            <td>BET Surface Area (m²/g)</td>
            <td>900–1,000</td>
            <td>1,100–1,200</td>
          </tr>
          <tr>
            <td>Moisture Content</td>
            <td>≤5%</td>
            <td>≤3%</td>
          </tr>
          <tr>
            <td>Ash Content</td>
            <td>≤4%</td>
            <td>≤3%</td>
          </tr>
          <tr>
            <td>Hardness Number</td>
            <td>≥95</td>
            <td>≥97</td>
          </tr>
          <tr>
            <td>pH (10% slurry)</td>
            <td>6–8</td>
            <td>7–8</td>
          </tr>
          <tr>
            <td>Mesh Size</td>
            <td>8×30 (drinking water) / 12×40</td>
            <td>8×30 or per specification</td>
          </tr>
          <tr>
            <td>IS / BIS Standard</td>
            <td>IS 877</td>
            <td>IS 877, NSF/ANSI 61</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Iodine number is the most commonly tested parameter</strong> — it correlates with
        micropore surface area and is the best single indicator of adsorption capacity for water
        treatment applications.
      </p>

      <h2>Applications in Indian Water Treatment</h2>

      <h3>Municipal Drinking Water Plants</h3>
      <p>
        GAC is used as a polishing stage after conventional treatment (coagulation, sedimentation,
        filtration) to remove residual chlorine, disinfection by-products (THMs), and taste/odour
        compounds. Typical bed life: 3–5 years before reactivation is needed.
      </p>

      <h3>Industrial Effluent Treatment (ETP)</h3>
      <p>
        Pharmaceutical, textile, food processing, and chemical ETPs use activated carbon to remove
        COD, BOD, colour, and specific organic contaminants before discharge. PAC is often used for
        seasonal shock loads; GAC for continuous polishing.
      </p>

      <h3>Reverse Osmosis Pre-treatment</h3>
      <p>
        Carbon filters upstream of RO membranes protect membranes from chlorine damage and organic
        fouling. This extends membrane life significantly and reduces replacement costs.
      </p>

      <h3>Gold Recovery (Mining)</h3>
      <p>
        In gold and silver heap leaching operations, granular coconut shell activated carbon is
        used in carbon-in-pulp (CIP) and carbon-in-leach (CIL) processes to recover precious
        metals from cyanide solutions. Our export grades meet international mining industry
        standards.
      </p>

      <h2>How to Calculate How Much You Need</h2>
      <p>For a GAC filter bed:</p>
      <ul>
        <li>
          <strong>Contact time</strong>: Minimum 10 minutes EBCT (Empty Bed Contact Time) for most
          organic removal; 15–20 min for THMs and chloramines
        </li>
        <li>
          <strong>Filter loading rate</strong>: 5–12 m/hr superficial velocity (12 m/hr maximum to
          avoid channelling)
        </li>
        <li>
          <strong>Carbon volume required</strong> = flow rate (m³/hr) × EBCT (hr)
        </li>
        <li>
          <strong>Carbon weight</strong> = volume × bulk density (approximately 500 kg/m³ for
          coconut shell GAC)
        </li>
      </ul>
      <p>
        Example: A 100 m³/hr water treatment plant with 15-minute EBCT requires 25 m³ of carbon,
        or approximately <strong>12,500 kg (~12.5 MT)</strong>.
      </p>

      <h2>Procurement Tips</h2>
      <ul>
        <li>
          <strong>Always request test certificates</strong> from a NABL-accredited laboratory —
          iodine number, ash, moisture, pH. Reputable suppliers provide these with every batch.
        </li>
        <li>
          <strong>Check the source material</strong> — coconut shell carbon from South India is
          generally superior to wood-based or coal-based alternatives for water applications.
        </li>
        <li>
          <strong>Consider lifecycle cost</strong>, not just purchase price — reactivatable GAC at
          ₹120/kg that lasts 4 years is cheaper than ₹80/kg PAC that must be replaced every 6 months.
        </li>
        <li>
          <strong>Buy from ISO-certified manufacturers</strong> — ISO 9001 and ISO 14001
          certification indicates consistent quality management, not just claimed specification.
        </li>
      </ul>

      <h2>About Our Activated Carbon</h2>
      <p>
        We manufacture coconut shell and biomass activated carbon at our facility in West Bengal.
        Our products are ISO 9001 and ISO 14001 certified, and we supply both domestic water
        treatment projects and export markets (USA, Turkey, Chile, UAE). We provide full test
        certificates with every batch from NABL-accredited labs.
      </p>
      <p>
        Contact us for grades, pricing, and technical data sheets — we respond within one business
        day.
      </p>

    </BlogPostLayout>
  </>
);

export default ActivatedCarbonWaterTreatment;
