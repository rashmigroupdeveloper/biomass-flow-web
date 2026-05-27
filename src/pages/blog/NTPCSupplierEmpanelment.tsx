import React from 'react';
import { SEO } from '@/components/SEO';
import { articleSchema, bioPelletsFAQSchema, breadcrumbSchema } from '@/lib/schemas';
import { BlogPostLayout } from '@/components/BlogPostLayout';
import { getBlogPost } from '@/lib/blogData';

const post = getBlogPost('ntpc-biomass-pellet-supplier-empanelment-india-2026')!;

const NTPCSupplierEmpanelment = () => (
  <>
    <SEO
      title={post.title}
      description={post.description}
      canonical={`/blog/${post.slug}`}
      jsonLd={[
        articleSchema(post.title, post.description, `https://rashmi6paradigm.com/blog/${post.slug}`, post.publishedDate, post.updatedDate),
        bioPelletsFAQSchema,
        breadcrumbSchema([
          { name: 'Home', url: 'https://rashmi6paradigm.com/' },
          { name: 'Blog', url: 'https://rashmi6paradigm.com/blog' },
          { name: 'NTPC Supplier Empanelment', url: `https://rashmi6paradigm.com/blog/${post.slug}` },
        ]),
      ]}
    />
    <BlogPostLayout {...post}>

      <p>
        India's mandatory biomass co-firing policy has created one of the largest government
        procurement opportunities in the renewable energy sector — and it is open to any
        Indian manufacturer that can meet NTPC's technical and commercial requirements.
      </p>
      <p>
        This guide walks through the complete process for becoming an NTPC-approved biomass
        pellet supplier: eligibility, specifications, tender process, documentation, and
        practical advice from experienced suppliers.
      </p>

      <h2>Understanding the Mandate</h2>
      <p>
        Under the Ministry of Power's Biomass Policy, all coal-based thermal power plants
        must co-fire biomass pellets:
      </p>
      <ul>
        <li><strong>5%</strong> biomass co-firing in FY 2024-25</li>
        <li><strong>7%</strong> in FY 2025-26</li>
        <li><strong>10%</strong> target by FY 2027-28</li>
      </ul>
      <p>
        NTPC operates 70+ power stations across India. Combined, the 10% target requires
        approximately <strong>15–20 million tonnes of biomass pellets per year</strong>.
        Current national production capacity is ~2.5 million tonnes. The demand gap is enormous,
        and NTPC is actively seeking new suppliers across all regions.
      </p>

      <h2>Eligibility Requirements</h2>

      <h3>Supplier Classification</h3>
      <p>
        NTPC's biomass tenders are issued under the <strong>Make in India (MII) policy</strong>
        and are reserved for <strong>Class 1 Local Suppliers</strong> — manufacturers who source
        at least 50% of the value of goods from India. Import of raw biomass material is not
        permitted.
      </p>
      <p>
        <strong>Micro and Small Enterprises (MSE)</strong> registered under MSME receive purchase
        preference in NTPC tenders — typically 4% lower L1 threshold. If your manufacturing
        facility qualifies as MSE, ensure your Udyam Registration Certificate is up to date.
      </p>

      <h3>Technical Eligibility</h3>
      <p>You must be able to supply pellets meeting all of the following:</p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>NTPC Minimum Requirement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross Calorific Value (GCV)</td>
            <td>≥ 3,000 kcal/kg (as-received basis)</td>
          </tr>
          <tr>
            <td>Moisture Content</td>
            <td>≤ 14%</td>
          </tr>
          <tr>
            <td>Ash Content</td>
            <td>≤ 10%</td>
          </tr>
          <tr>
            <td>Pellet Diameter</td>
            <td>6–8 mm or 10–12 mm (as specified in tender)</td>
          </tr>
          <tr>
            <td>Pellet Length</td>
            <td>10–30 mm</td>
          </tr>
          <tr>
            <td>Bulk Density</td>
            <td>≥ 600 kg/m³</td>
          </tr>
          <tr>
            <td>Sulphur</td>
            <td>≤ 0.5% (as-received)</td>
          </tr>
          <tr>
            <td>Chlorine</td>
            <td>≤ 0.1%</td>
          </tr>
          <tr>
            <td>Raw Material Origin</td>
            <td>100% Indian agricultural/forestry waste — NO imported biomass</td>
          </tr>
          <tr>
            <td>Standard</td>
            <td>CEA Technical Specification for Agro Residue Pellets (2020)</td>
          </tr>
        </tbody>
      </table>

      <h3>Commercial Eligibility</h3>
      <p>
        For larger tenders (typically above 5,000 MT/contract), NTPC may require:
      </p>
      <ul>
        <li>Proven production capacity (plant inspection or self-certification)</li>
        <li>Minimum annual turnover (varies by tender — typically ₹1–5 crore)</li>
        <li>ISO 9001 quality management certification (increasingly required)</li>
        <li>Valid GST registration</li>
        <li>PAN card and bank account details</li>
      </ul>

      <h2>Step-by-Step Tender Process</h2>

      <h3>Step 1: Monitor the Tender Portal</h3>
      <p>
        NTPC publishes all biomass tenders on its eProcurement portal:{' '}
        <em>ntpctender.ntpc.co.in</em>. Register on the portal as a vendor. Set up email alerts
        for "Biomass" category tenders in your target region.
      </p>
      <p>
        DVC (Damodar Valley Corporation) tenders for West Bengal plants are published on:{' '}
        <em>dvc.gov.in</em> and <em>eprocure.gov.in</em>.
      </p>

      <h3>Step 2: Download and Study the NIT</h3>
      <p>
        When a relevant Notice Inviting Tender (NIT) is published, download the full bidding
        document. Key sections to review:
      </p>
      <ul>
        <li><strong>Schedule of Requirement</strong> — quantity, delivery point, delivery schedule</li>
        <li><strong>Technical Specification</strong> — exact parameters required</li>
        <li><strong>Eligibility criteria</strong> — turnover, capacity, certifications</li>
        <li><strong>Payment terms</strong> — typically 30 days from delivery + test certificate</li>
        <li><strong>Penalty clauses</strong> — for delay or specification non-compliance</li>
      </ul>

      <h3>Step 3: Obtain Laboratory Test Certificates</h3>
      <p>
        You must submit test certificates for your pellets from a <strong>NABL-accredited
        laboratory</strong>. The certificates must cover all parameters in the tender specification.
      </p>
      <p>
        Key NABL labs for biomass testing:
      </p>
      <ul>
        <li>Central Institute of Mining and Fuel Research (CIMFR), Dhanbad, Jharkhand</li>
        <li>National Productivity Council (NPC) labs</li>
        <li>Bureau Veritas, SGS, Intertek (commercial labs with NABL accreditation)</li>
      </ul>
      <p>
        Send a representative sample (minimum 2 kg) for testing. Turn-around time is typically
        5–10 working days. Budget ₹5,000–₹15,000 per test batch.
      </p>

      <h3>Step 4: Prepare Your Bid Package</h3>
      <p>
        NTPC bids are typically two-envelope: Technical and Commercial. Prepare:
      </p>
      <p><strong>Technical Bid:</strong></p>
      <ul>
        <li>Company profile and plant details</li>
        <li>NABL test certificates (dated within 6 months)</li>
        <li>ISO 9001 certificate (if held)</li>
        <li>GST, PAN, Udyam Registration (for MSE preference)</li>
        <li>Declaration of domestic raw material sourcing</li>
        <li>Plant capacity and production capacity certificate</li>
      </ul>
      <p><strong>Commercial Bid:</strong></p>
      <ul>
        <li>Price per MT on FOR (Free on Rail/Road) basis to the delivery point</li>
        <li>Include loading, transport, unloading, and applicable GST (typically 5%)</li>
        <li>Validity: minimum 90 days from bid submission</li>
      </ul>

      <h3>Step 5: Sample Inspection</h3>
      <p>
        Successful L1 bidders are typically asked to supply a <strong>5–10 MT sample lot</strong>{' '}
        for plant-level testing before full-volume orders begin. The power station's lab will
        test GCV, moisture, ash, and other parameters and issue an acceptance certificate.
      </p>
      <p>
        Ensure your sample lot is representative of your full production — NTPC retains a portion
        of each delivery for dispute resolution testing throughout the contract period.
      </p>

      <h3>Step 6: Delivery Execution</h3>
      <p>
        NTPC and DVC typically require:
      </p>
      <ul>
        <li>Delivery in 20–24 MT truck loads (standard truck sizes)</li>
        <li>Each truck accompanied by a delivery challan, test certificate, and weight slip</li>
        <li>Unloading at designated biomass storage area at the plant</li>
        <li>Invoice submission with delivery documents for 30-day payment cycle</li>
      </ul>

      <h2>Common Mistakes That Disqualify Bids</h2>
      <ul>
        <li>
          <strong>Test certificates older than 6 months</strong> — NTPC rejects stale certificates.
          Time your testing to align with bid submission.
        </li>
        <li>
          <strong>Specification mismatch in lab report</strong> — ensure your lab tests exactly the
          parameters listed in the NIT, in the same units.
        </li>
        <li>
          <strong>Missing MSE preference documentation</strong> — Udyam Registration must be valid
          and the certificate must clearly state your product category.
        </li>
        <li>
          <strong>Incorrect pricing basis</strong> — bid must be on FOR basis (inclusive of freight
          to the plant gate). Quoting ex-factory and asking for freight reimbursement will be
          rejected.
        </li>
        <li>
          <strong>Imported raw material</strong> — any evidence of imported biomass in your supply
          chain will result in immediate disqualification.
        </li>
      </ul>

      <h2>How Rashmi 6 Paradigm Can Help</h2>
      <p>
        We have been manufacturing biomass pellets in Eastern India since 2015 and have direct
        experience supplying NTPC and DVC tenders. Our facility is located in Kharagpur, West
        Bengal — strategically positioned to supply Mejia TPS, Durgapur Steel TPS, and Dumdumi
        RTPP at low freight cost.
      </p>
      <p>
        If you are a power plant procurement manager, an energy buyer, or a new entrant to the
        biomass sector, we are happy to discuss the supply chain and quality requirements in
        detail. Contact us using the button below.
      </p>

    </BlogPostLayout>
  </>
);

export default NTPCSupplierEmpanelment;
