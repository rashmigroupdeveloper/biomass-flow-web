import React from 'react';
import { SEO } from '@/components/SEO';
import { articleSchema, breadcrumbSchema } from '@/lib/schemas';
import { BlogPostLayout } from '@/components/BlogPostLayout';
import { getBlogPost } from '@/lib/blogData';

const post = getBlogPost('ntpc-biomass-cofiring-west-bengal-guide')!;

const NTPCCofiringWestBengal = () => (
  <>
    <SEO
      title={post.title}
      description={post.description}
      canonical={`/blog/${post.slug}`}
      jsonLd={[
        articleSchema(post.title, post.description, `https://rashmi6paradigm.com/blog/${post.slug}`, post.publishedDate, post.updatedDate),
        breadcrumbSchema([
          { name: 'Home', url: 'https://rashmi6paradigm.com/' },
          { name: 'Blog', url: 'https://rashmi6paradigm.com/blog' },
          { name: 'NTPC Co-firing West Bengal', url: `https://rashmi6paradigm.com/blog/${post.slug}` },
        ]),
      ]}
    />
    <BlogPostLayout {...post}>

      <p>
        West Bengal is one of India's most important biomass co-firing markets — home to three major
        power stations that are actively procuring agro-residue pellets under the Government of India's
        mandatory biomass co-firing policy. Yet most pellet suppliers in Eastern India don't fully
        understand how the procurement system works or how to participate.
      </p>
      <p>
        This guide explains the policy, the specific West Bengal plants, the exact specifications
        required, and what both suppliers and industrial buyers need to know.
      </p>

      <h2>The Government Mandate: What It Means</h2>
      <p>
        The Ministry of Power issued a revised Biomass Policy in October 2021, mandating all
        coal-based thermal power plants to co-fire biomass pellets:
      </p>
      <ul>
        <li><strong>FY 2024-25:</strong> 5% biomass co-firing (mandatory)</li>
        <li><strong>FY 2025-26:</strong> 7% biomass co-firing</li>
        <li><strong>FY 2027-28:</strong> 10% biomass co-firing target</li>
      </ul>
      <p>
        At 10% co-firing, India's coal plants will need <strong>15–20 million tonnes of biomass
        pellets per year</strong>. Current national production is only ~2.5 million tonnes. The
        supply gap is the single largest business opportunity in India's biomass sector right now.
      </p>

      <h2>West Bengal's Three Key Co-firing Plants</h2>
      <p>
        The Damodar Valley Corporation (DVC), which operates power stations across West Bengal and
        Jharkhand, is procuring biomass pellets through competitive tenders. Three stations in West
        Bengal have active procurement:
      </p>

      <table>
        <thead>
          <tr>
            <th>Power Station</th>
            <th>Location</th>
            <th>Annual Procurement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mejia Thermal Power Station</td>
            <td>Bankura, West Bengal</td>
            <td>51,100 MT/year</td>
          </tr>
          <tr>
            <td>Durgapur Steel Thermal Power Station</td>
            <td>Andal, Bardhaman, West Bengal</td>
            <td>51,100 MT/year</td>
          </tr>
          <tr>
            <td>Dumdumi RTPP</td>
            <td>Purulia, West Bengal</td>
            <td>51,100 MT/year</td>
          </tr>
        </tbody>
      </table>

      <p>
        Combined, these three stations represent <strong>153,300 MT per year of biomass pellet
        demand</strong> — all within 250 km of Kharagpur. This is one of the most concentrated
        procurement zones in India, and it overwhelmingly favours local Eastern India suppliers on
        logistics cost alone.
      </p>

      <h2>Technical Specifications Required</h2>
      <p>
        DVC and NTPC follow CEA (Central Electricity Authority) biomass pellet specifications.
        Suppliers must meet all of the following:
      </p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Minimum Requirement</th>
            <th>Our Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross Calorific Value (GCV)</td>
            <td>≥ 3,000 kcal/kg</td>
            <td>3,800–4,200 kcal/kg</td>
          </tr>
          <tr>
            <td>Moisture Content</td>
            <td>≤ 14%</td>
            <td>&lt;10%</td>
          </tr>
          <tr>
            <td>Ash Content</td>
            <td>≤ 10%</td>
            <td>&lt;5%</td>
          </tr>
          <tr>
            <td>Pellet Diameter</td>
            <td>6–8 mm (standard) or 10–12 mm</td>
            <td>6–8 mm</td>
          </tr>
          <tr>
            <td>Bulk Density</td>
            <td>≥ 600 kg/m³</td>
            <td>≥ 650 kg/m³</td>
          </tr>
          <tr>
            <td>Sulphur Content</td>
            <td>≤ 0.5%</td>
            <td>&lt;0.3%</td>
          </tr>
          <tr>
            <td>Chlorine Content</td>
            <td>≤ 0.1%</td>
            <td>&lt;0.05%</td>
          </tr>
          <tr>
            <td>Origin</td>
            <td>100% domestic (Make in India)</td>
            <td>100% agro-waste, Eastern India</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Important:</strong> DVC explicitly prohibits imported raw materials in its tender
        conditions. All biomass must be sourced from Indian agricultural waste — which is our
        entire supply chain.
      </p>

      <h2>How the Tender Process Works</h2>
      <p>DVC and NTPC follow a standard tender process for biomass pellet procurement:</p>
      <ol>
        <li>
          <strong>Notice Inviting Tender (NIT)</strong> — published on{' '}
          <em>ntpctender.ntpc.co.in</em> and the DVC portal. Tenders are typically issued
          quarterly.
        </li>
        <li>
          <strong>Supplier Eligibility</strong> — must be a Class 1 Local Supplier; MSE suppliers
          get purchase preference under Make in India policy
        </li>
        <li>
          <strong>Technical Bid</strong> — submit test certificates (lab reports for GCV, moisture,
          ash) from a NABL-accredited laboratory
        </li>
        <li>
          <strong>Price Bid</strong> — quoted on a FOR (Free on Rail/Road) basis to the power
          station gate
        </li>
        <li>
          <strong>Sample Inspection</strong> — winning bidders typically supply a 5–10 MT sample
          for plant-level testing before full-volume orders begin
        </li>
        <li>
          <strong>Supply Schedule</strong> — deliveries are typically monthly, in 20–24 MT truck
          loads, with staggered unloading slots
        </li>
      </ol>

      <h2>Why Location Matters More Than Price</h2>
      <p>
        For DVC's West Bengal plants, transport cost is a dominant factor. A supplier in Punjab
        pays ₹2,500–₹3,500/MT in freight to deliver to Mejia or Durgapur. A Kharagpur-based
        manufacturer pays ₹400–₹800/MT. Even if the Punjab price is ₹1,000/MT lower at the gate,
        the logistics math heavily favours local supply.
      </p>
      <p>
        This is one of the key reasons Eastern India manufacturers have a structural competitive
        advantage in DVC tenders — and why this procurement opportunity belongs to local suppliers.
      </p>

      <h2>What Industrial Buyers Should Know</h2>
      <p>
        If you operate an industrial boiler in West Bengal and you're considering biomass co-firing,
        here is what you need to know:
      </p>
      <ul>
        <li>
          <strong>Stoker and CFBC boilers</strong> accept biomass pellets with minimal modification;
          BFB (bubbling fluidised bed) boilers may need feed system adjustments
        </li>
        <li>
          You can co-fire at <strong>5–30% biomass substitution</strong> without significant boiler
          modification in most industrial installations
        </li>
        <li>
          At 20% biomass substitution with coal at ₹8,000/MT and pellets at ₹10,000/MT, you still
          reduce your <strong>fuel cost by ~8%</strong> on a heat basis due to coal's lower GCV
        </li>
        <li>
          Government <strong>carbon credit benefits</strong> are available for industrial co-firing
          under India's carbon market framework
        </li>
      </ul>

      <h2>Next Steps for Suppliers and Buyers</h2>
      <p>
        If you are a pellet supplier looking to tender for DVC or NTPC contracts in West Bengal,
        or an industrial buyer evaluating biomass co-firing at your facility, we are happy to share
        our experience and assist with technical documentation.
      </p>
      <p>
        We have been supplying biomass pellets in Eastern India since 2015 and have direct
        experience with the DVC tender process and NTPC specification requirements.{' '}
        <strong>Contact us to discuss your specific requirement.</strong>
      </p>

    </BlogPostLayout>
  </>
);

export default NTPCCofiringWestBengal;
