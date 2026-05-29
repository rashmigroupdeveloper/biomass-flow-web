/**
 * CMS Service - For fetching media content
 * 
 * This service provides mock data for the media section while we await a proper CMS integration.
 */

// Types for different content
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  documentUrl: string | null;
}

export interface Brochure {
  id: number;
  title: string;
  category: string;
  format: string;
  size: string;
  lastUpdated: string;
  thumbnail: string;
  downloadUrl: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  description: string;
  image: string | null;
  file: string | null;
}

/**
 * Get news data (mock data for now)
 */
export async function getNews(): Promise<NewsItem[]> {
  // In a real implementation, this would fetch from a CMS or API
  // For now, we return mock data
  return [
    {
      id: 1,
      title: "Rashmi 6 Paradigm Introduces Innovative Biomass Solutions",
      date: "2023-08-15",
      category: "Achievement",
      excerpt: "Our company has launched a new range of biomass products aimed at reducing carbon footprints for industrial clients.",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1000",
      content: "Rashmi 6 Paradigm, a leader in sustainable biomass solutions, has announced the launch of its innovative new product line designed specifically for industrial applications. The new range includes advanced bio-pellets with higher energy efficiency and reduced emissions, setting new standards in the industry.\n\nThe proprietary manufacturing process ensures consistent quality while maintaining our commitment to sustainable sourcing practices. This breakthrough represents years of research and development focused on maximizing energy output while minimizing environmental impact.",
      documentUrl: null
    },
    {
      id: 2,
      title: "Partnership with Local Farmers Strengthens Supply Chain",
      date: "2023-06-22",
      category: "Sustainability",
      excerpt: "Rashmi 6 Paradigm forms strategic partnerships with local farming communities to ensure sustainable biomass sourcing.",
      image: "https://images.unsplash.com/photo-1590682300936-2091eb76ba00?q=80&w=1000",
      content: "In a move to strengthen our commitment to sustainability, Rashmi 6 Paradigm has established formal partnerships with farming communities across three states. These partnerships ensure ethically sourced raw materials while providing stable income to local farmers.\n\nAs part of this initiative, we're implementing training programs on sustainable agricultural practices, helping farmers to increase yields while maintaining ecological balance. This farm-to-factory approach not only secures our supply chain but also reduces overall carbon emissions by minimizing transportation distances.",
      documentUrl: null
    },
    {
      id: 3,
      title: "Rashmi 6 Paradigm Receives Environmental Excellence Award",
      date: "2023-04-10",
      category: "Award",
      excerpt: "Our sustainable manufacturing practices have been recognized with the prestigious Environmental Excellence Award.",
      image: "https://images.unsplash.com/photo-1635001789168-3eb107f080e7?q=80&w=1000",
      content: "Rashmi 6 Paradigm has been honored with the Environmental Excellence Award by the Green Industry Association in recognition of our pioneering work in sustainable manufacturing practices. The award acknowledges our comprehensive approach to reducing environmental impact across the entire production process.\n\nThe judging panel specifically highlighted our closed-loop water system, which has reduced water consumption by 70%, and our investment in renewable energy infrastructure that powers 60% of our manufacturing facilities.",
      documentUrl: null
    },
    {
      id: 4,
      title: "Expansion of Production Capacity Underway",
      date: "2023-02-18",
      category: "Expansion",
      excerpt: "Rashmi 6 Paradigm announces plans to increase production capacity by 40% with new facility.",
      image: "https://images.unsplash.com/photo-1598300188583-4ab4ffe99512?q=80&w=1000",
      content: "To meet growing global demand for sustainable biomass products, Rashmi 6 Paradigm has begun construction on a new state-of-the-art manufacturing facility. The expansion will increase our production capacity by 40% while implementing the latest energy-efficient technologies.\n\nThe new facility, expected to be operational by Q1 2024, will create approximately 200 new jobs and incorporate advanced automation systems to enhance quality control. Environmental considerations have been central to the design process, with the building aiming for LEED Platinum certification.",
      documentUrl: null
    },
    {
      id: 5,
      title: "Carbon Neutral Certification Achieved",
      date: "2022-11-30",
      category: "Achievement",
      excerpt: "Rashmi 6 Paradigm achieves carbon neutral status for all operations through comprehensive sustainability initiatives.",
      image: "https://images.unsplash.com/photo-1569097387546-9ca13ae72c6b?q=80&w=1000",
      content: "After years of dedicated effort, Rashmi 6 Paradigm has achieved full carbon neutral certification for its entire operational footprint. This milestone represents the culmination of our comprehensive sustainability strategy, encompassing everything from raw material sourcing to manufacturing processes and logistics.\n\nKey to this achievement has been our investment in renewable energy, implementation of energy-efficient technologies, and strategic carbon offset projects in forest conservation. We're proud to be among the first in our industry to reach this important sustainability benchmark.",
      documentUrl: null
    }
  ];
}

/**
 * Get brochures data (mock data for now)
 */
export async function getBrochures(): Promise<Brochure[]> {
  return [
    {
      id: 1,
      title: "Company Profile",
      category: "Corporate",
      format: "PDF",
      size: "3.2 MB",
      lastUpdated: "2023-09-15",
      thumbnail: "https://images.unsplash.com/photo-1586523731382-c9747d1de42b?q=80&w=1000",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Bio-Pellets Product Catalog",
      category: "Product",
      format: "PDF",
      size: "4.5 MB",
      lastUpdated: "2023-08-10",
      thumbnail: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1000",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Sustainability Report 2023",
      category: "Sustainability",
      format: "PDF",
      size: "5.8 MB",
      lastUpdated: "2023-07-22",
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Technical Specifications Guide",
      category: "Technical",
      format: "PDF",
      size: "2.7 MB",
      lastUpdated: "2023-06-18",
      thumbnail: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=1000",
      downloadUrl: "#"
    }
  ];
}

/**
 * Get certificates data (mock data for now)
 */
export async function getCertificates(): Promise<Certificate[]> {
  return [
    {
      id: 1,
      title: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      issueDate: "2022-01-15",
      expiryDate: "2025-01-14",
      description: "Quality Management System Certification",
      image: "https://images.unsplash.com/photo-1568633762547-c6c00210ddf5?q=80&w=1000",
      file: null
    },
    {
      id: 2,
      title: "ISO 14001:2015",
      issuer: "International Organization for Standardization",
      issueDate: "2021-06-22",
      expiryDate: "2024-06-21",
      description: "Environmental Management System Certification",
      image: "https://images.unsplash.com/photo-1547489401-fcada4966052?q=80&w=1000",
      file: null
    },
    {
      id: 3,
      title: "FSC Chain of Custody",
      issuer: "Forest Stewardship Council",
      issueDate: "2022-03-10",
      expiryDate: "2027-03-09",
      description: "Certification for responsible forest management and product traceability",
      image: "https://images.unsplash.com/photo-1507473862839-7282c8fdb279?q=80&w=1000",
      file: null
    },
    {
      id: 4,
      title: "Carbon Trust Standard",
      issuer: "Carbon Trust",
      issueDate: "2022-09-05",
      expiryDate: "2024-09-04",
      description: "Certification for measuring, managing, and reducing carbon emissions",
      image: "https://images.unsplash.com/photo-1462690417829-5b41247f6b0e?q=80&w=1000",
      file: null
    }
  ];
} 