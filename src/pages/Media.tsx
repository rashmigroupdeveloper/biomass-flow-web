
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Globe, Search, Filter, Eye, Download, AlertCircle, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Footer from '../components/Footer';
import ParticleCanvas from '@/components/ParticleCanvas';

// Interface for news items
interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  documentUrl: string | null;
}

// Define interfaces for other content types
interface Brochure {
  id: number;
  title: string;
  category: string;
  format: string;
  size: string;
  lastUpdated: string;
  thumbnail: string;
  downloadUrl: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  description: string;
  image: string | null;
  file: string | null;
}

// Mock data service for now
const getNews = async (): Promise<NewsItem[]> => {
  // Simulate API call with mock data
  return [
    {
      id: 1,
      title: "Rashmi 6 Paradigm Launches New Biomass Processing Plant",
      date: "2023-11-15",
      category: "Expansion",
      excerpt: "Rashmi 6 Paradigm has inaugurated a new state-of-the-art biomass processing plant, increasing production capacity by 40%.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      content: "Rashmi 6 Paradigm, a leader in sustainable biomass solutions, has inaugurated a new state-of-the-art biomass processing plant in Kolkata. The facility, which represents an investment of over $15 million, will increase the company's production capacity by 40% and create 100 new jobs in the region. The plant features advanced processing technology that significantly reduces energy consumption and emissions during the biomass conversion process. 'This expansion marks a significant milestone in our commitment to providing sustainable energy solutions while reducing our environmental impact,' said the CEO during the opening ceremony. The new facility is expected to be fully operational by the end of the quarter.",
      documentUrl: null
    },
    {
      id: 2,
      title: "Rashmi 6 Paradigm Wins Sustainability Excellence Award",
      date: "2023-10-05",
      category: "Award",
      excerpt: "Our commitment to sustainable practices recognized with the prestigious Sustainability Excellence Award 2023.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Rashmi 6 Paradigm has been honored with the prestigious Sustainability Excellence Award 2023, recognizing the company's outstanding commitment to environmental sustainability and responsible business practices. The award, presented at the annual Green Business Summit, celebrates organizations that demonstrate exceptional leadership in implementing sustainable practices and technologies. Rashmi 6 Paradigm was recognized for its innovative approach to biomass processing that significantly reduces carbon emissions and promotes a circular economy. The company's Bio Pellets product line was specifically noted for its role in helping industrial clients transition from fossil fuels to renewable energy sources, contributing to substantial carbon footprint reduction across multiple industries.",
      documentUrl: "/documents/sustainability-award-press-release.pdf"
    },
    {
      id: 3,
      title: "Strategic Partnership Formed with Global Renewable Energy Alliance",
      date: "2023-09-12",
      category: "Achievement",
      excerpt: "Rashmi 6 Paradigm joins forces with the Global Renewable Energy Alliance to accelerate clean energy transition worldwide.",
      image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
      content: "Rashmi 6 Paradigm has announced a strategic partnership with the Global Renewable Energy Alliance (GREA), a consortium of leading renewable energy companies and organizations working to accelerate the global transition to clean energy. Through this partnership, Rashmi 6 Paradigm will collaborate with GREA members on research and development initiatives, policy advocacy, and market expansion for sustainable biomass solutions. The partnership aims to enhance the adoption of biomass energy in regions currently dependent on fossil fuels, with a focus on developing economies. 'By combining our expertise in biomass processing with GREA's global network and policy influence, we can make significant contributions to the clean energy transition worldwide,' stated the COO of Rashmi 6 Paradigm.",
      documentUrl: null
    },
    {
      id: 4,
      title: "Annual Sustainability Report Released: Carbon Emissions Reduced by 35%",
      date: "2023-08-22",
      category: "Sustainability",
      excerpt: "Our latest sustainability report shows significant progress in reducing environmental impact across all operations.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      content: "Rashmi 6 Paradigm has published its annual Sustainability Report, highlighting remarkable progress in reducing its environmental footprint. The report reveals that the company has achieved a 35% reduction in carbon emissions compared to the previous year, significantly exceeding its target of 25%. This achievement is attributed to several key initiatives, including the implementation of more efficient production processes, transitioning to renewable energy sources for manufacturing facilities, and optimizing logistics to reduce transportation emissions. The report also details the company's social impact initiatives, including community engagement programs and partnerships with local educational institutions to promote awareness about renewable energy and sustainable practices.",
      documentUrl: "/documents/sustainability-report-2023.pdf"
    },
    {
      id: 5,
      title: "Rashmi 6 Paradigm to Exhibit at International Renewable Energy Expo",
      date: "2023-07-30",
      category: "Event",
      excerpt: "Join us at Booth 305 at the International Renewable Energy Expo to explore our latest biomass solutions.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      content: "Rashmi 6 Paradigm will be showcasing its innovative biomass solutions at the upcoming International Renewable Energy Expo, scheduled for September 15-18, 2023, at the Delhi Exhibition Centre. Visitors to Booth 305 will have the opportunity to explore the company's complete range of sustainable biomass products, including Bio Pellets, Activated Carbon, and Charcoal Briquettes. The company will also be unveiling its latest innovation in biomass processing technology, designed to further enhance energy efficiency and reduce environmental impact. Technical experts will be available throughout the event to provide detailed information about product specifications, applications, and customization options. Additionally, the company's sustainability team will be conducting presentations on the environmental benefits of switching to biomass energy.",
      documentUrl: "/documents/renewable-energy-expo-details.pdf"
    }
  ];
};

const getBrochures = async (): Promise<Brochure[]> => {
  // Simulate API call with mock data
  return [
    {
      id: 1,
      title: "Bio Pellets Product Brochure",
      category: "Products",
      format: "PDF",
      size: "2.5 MB",
      lastUpdated: "2023-10-10",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      downloadUrl: "/brochures/bio-pellets-brochure.pdf"
    },
    {
      id: 2,
      title: "Activated Carbon Technical Specifications",
      category: "Technical",
      format: "PDF",
      size: "3.2 MB",
      lastUpdated: "2023-09-15",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      downloadUrl: "/brochures/activated-carbon-specs.pdf"
    },
    {
      id: 3,
      title: "Charcoal Briquettes Application Guide",
      category: "Technical",
      format: "PDF",
      size: "4.1 MB",
      lastUpdated: "2023-08-22",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      downloadUrl: "/brochures/charcoal-briquettes-guide.pdf"
    },
    {
      id: 4,
      title: "Corporate Sustainability Overview",
      category: "Corporate",
      format: "PDF",
      size: "5.7 MB",
      lastUpdated: "2023-07-30",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      downloadUrl: "/brochures/sustainability-overview.pdf"
    },
    {
      id: 5,
      title: "Biomass Energy Solutions Catalog",
      category: "Products",
      format: "PDF",
      size: "8.3 MB",
      lastUpdated: "2023-06-15",
      thumbnail: "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
      downloadUrl: "/brochures/biomass-solutions-catalog.pdf"
    }
  ];
};

const getCertificates = async (): Promise<Certificate[]> => {
  // Simulate API call with mock data
  return [
    {
      id: 1,
      title: "ISO 9001:2015 Quality Management",
      issuer: "International Standards Organization",
      issueDate: "2023-01-15",
      expiryDate: "2026-01-14",
      description: "Certifies that Rashmi 6 Paradigm's quality management systems meet international standards.",
      image: "/certificates/iso-9001.jpg",
      file: "/certificates/iso-9001-certificate.pdf"
    },
    {
      id: 2,
      title: "ISO 14001:2015 Environmental Management",
      issuer: "International Standards Organization",
      issueDate: "2023-02-20",
      expiryDate: "2026-02-19",
      description: "Certifies that Rashmi 6 Paradigm's environmental management systems meet international standards.",
      image: "/certificates/iso-14001.jpg",
      file: "/certificates/iso-14001-certificate.pdf"
    },
    {
      id: 3,
      title: "Sustainable Biomass Program Certificate",
      issuer: "SBP Certification Body",
      issueDate: "2022-11-05",
      expiryDate: "2025-11-04",
      description: "Certifies that Rashmi 6 Paradigm's biomass products meet sustainable sourcing and production criteria.",
      image: "/certificates/sbp-cert.jpg",
      file: "/certificates/sbp-certificate.pdf"
    },
    {
      id: 4,
      title: "FSC Chain of Custody Certification",
      issuer: "Forest Stewardship Council",
      issueDate: "2022-09-10",
      expiryDate: "2025-09-09",
      description: "Certifies that wood used in Rashmi 6 Paradigm's biomass products comes from responsibly managed forests.",
      image: "/certificates/fsc-cert.jpg",
      file: "/certificates/fsc-certificate.pdf"
    }
  ];
};

const Media = () => {
  // State for content
  const [news, setNews] = useState<NewsItem[]>([]);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtering and display state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'brochures' | 'certificates'>('news');
  const [expandedNewsId, setExpandedNewsId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'regular' | 'linkedin'>('regular');
  
  const linkedInContainerRef = useRef<HTMLDivElement>(null);
  const categories = ['All', 'Achievement', 'Expansion', 'Award', 'Sustainability', 'Event'];

  // References for scroll animations
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Handle LinkedIn widget loading
  useEffect(() => {
    if (viewMode === 'linkedin' && !document.getElementById('sk-linkedin-script')) {
      const script = document.createElement('script');
      script.id = 'sk-linkedin-script';
      script.src = 'https://widgets.sociablekit.com/linkedin-page-posts/widget.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        const existingScript = document.getElementById('sk-linkedin-script');
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, [viewMode]);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'news') {
          const newsData = await getNews();
          setNews(Array.isArray(newsData) ? newsData : []);
        } else if (activeTab === 'brochures') {
          const brochuresData = await getBrochures();
          setBrochures(brochuresData);
        } else if (activeTab === 'certificates') {
          const certificatesData = await getCertificates();
          setCertificates(certificatesData);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Filter news based on selected category and search term
  const filteredNews = news.filter(item => {
    const matchesSearch = 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleArticle = (id: number) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const tabVariants = {
    inactive: { 
      color: "var(--muted-foreground)", 
      borderColor: "transparent" 
    },
    active: { 
      color: "var(--primary-500)", 
      borderColor: "var(--primary-500)",
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden" ref={scrollRef}>
      {/* Particle background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <ParticleCanvas 
          id="media-particles" 
          options={{
            particleCount: 60,
            particleMinSize: 1,
            particleMaxSize: 3,
            baseHue: 120, // green hue
            backgroundColor: 'rgba(255, 255, 255, 0)',
            flowIntensity: 0.2,
            flowDirection: 'upward',
            connectionRadius: 150
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 to-transparent z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                News &amp; 
              </motion.span>{" "}
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="inline-block text-primary-600"
              >
                Media
              </motion.span>
            </h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 mb-6"
            >
              Latest Updates from Rashmi 6 Paradigm
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Stay informed about our latest developments, achievements, and initiatives in the sustainable biomass energy sector.
              Learn how we're transforming waste into clean, renewable energy solutions.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="bg-white/30 backdrop-blur-sm p-1 rounded-full shadow-md">
              <div className="flex space-x-1">
                {['news', 'brochures', 'certificates'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                      activeTab === tab 
                        ? 'bg-white text-primary-600 shadow-sm' 
                        : 'hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    variants={tabVariants}
                    animate={activeTab === tab ? 'active' : 'inactive'}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* View Mode Toggle */}
          {activeTab === 'news' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-10"
            >
              <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full shadow-sm">
                <div className="flex space-x-1">
                  <motion.button
                    onClick={() => setViewMode('regular')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center ${
                      viewMode === 'regular' 
                        ? 'bg-white text-primary-600 shadow-sm' 
                        : 'hover:bg-white/50 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Globe size={16} className="mr-1.5" />
                    News Articles
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode('linkedin')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center ${
                      viewMode === 'linkedin' 
                        ? 'bg-white text-primary-600 shadow-sm' 
                        : 'hover:bg-white/50 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Linkedin size={16} className="mr-1.5" />
                    LinkedIn Updates
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Filters for News */}
          {activeTab === 'news' && viewMode === 'regular' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    <Filter size={16} className="text-gray-500 flex-shrink-0" />
                    {categories.map(category => (
                      <motion.button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search news..."
                      className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Display active filters if any are selected */}
          {activeTab === 'news' && viewMode === 'regular' && (selectedCategory !== 'All' || searchTerm !== '') && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Active filters:</span>
                {selectedCategory !== 'All' && (
                  <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                    Category: {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('All')}
                      className="ml-2 text-primary-400 hover:text-primary-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchTerm !== '' && (
                  <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                    Search: {searchTerm}
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-primary-400 hover:text-primary-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Error display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800"
            >
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800">Error</h3>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Content Display */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
                <div className="w-16 h-16 border-t-4 border-primary-300 border-solid rounded-full animate-spin absolute top-0 left-0" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : viewMode === 'linkedin' && activeTab === 'news' ? (
            // LinkedIn Feed
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold flex items-center">
                    <Linkedin size={24} className="text-[#0A66C2] mr-2" />
                    <span>LinkedIn <span className="text-primary-600">Updates</span></span>
                  </h2>
                  <span className="text-sm text-gray-500">Latest posts from our LinkedIn page</span>
                </div>
              </div>
              <div className="linkedin-feed-container overflow-hidden" ref={linkedInContainerRef}>
                <iframe 
                  src='https://widgets.sociablekit.com/linkedin-page-posts/iframe/25546715' 
                  frameBorder='0' 
                  width='100%' 
                  height='800'
                  title="Rashmi 6 Paradigm LinkedIn Feed"
                  className="bg-white"
                ></iframe>
              </div>
            </motion.div>
          ) : activeTab === 'news' ? (
            // News Articles
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredNews.length > 0 ? (
                filteredNews.map((news, index) => (
                  <motion.div 
                    key={news.id} 
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-full"
                    style={{ originY: 0 }}
                  >
                    <Card className="h-full overflow-hidden bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                      <div className="relative overflow-hidden h-48">
                        <motion.img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                        <Badge className="absolute top-2 right-2 bg-white/80 text-primary-600 backdrop-blur-sm border-0">
                          {news.category}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar size={14} className="mr-1" />
                          {new Date(news.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </div>
                        <CardTitle className="text-lg font-bold line-clamp-2">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-0">
                        <p className="text-gray-600 line-clamp-3 mb-4">{news.excerpt}</p>
                      </CardContent>
                      <CardFooter className="pt-0 mt-auto">
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-primary-600 hover:text-primary-800 hover:bg-transparent"
                          onClick={() => toggleArticle(news.id)}
                        >
                          {expandedNewsId === news.id ? 'Read Less' : 'Read More'} <Eye size={16} className="ml-1" />
                        </Button>
                      </CardFooter>
                      
                      <AnimatePresence>
                        {expandedNewsId === news.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <Separator className="my-4" />
                              <p className="text-gray-600">{news.content}</p>
                              
                              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Globe size={14} className="mr-1" />
                                  Press Release
                                </div>
                                {news.documentUrl && (
                                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                                    <a href={news.documentUrl} target="_blank" rel="noopener noreferrer" download>
                                      <Download size={14} />
                                      PDF
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-1 md:col-span-3 flex justify-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
                    <Search size={48} className="mx-auto text-gray-400 mb-4" />
                    <CardTitle className="mb-2">No results found</CardTitle>
                    <CardDescription>
                      Try adjusting your search or filter criteria
                    </CardDescription>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ) : activeTab === 'brochures' ? (
            // Brochures
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {brochures.map(brochure => (
                <motion.div 
                  key={brochure.id} 
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img 
                        src={brochure.thumbnail} 
                        alt={brochure.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <Badge className="bg-primary-500 hover:bg-primary-600 mb-2">{brochure.category}</Badge>
                          <h3 className="font-bold text-lg leading-tight">{brochure.title}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Format</p>
                          <p className="font-medium">{brochure.format}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Size</p>
                          <p className="font-medium">{brochure.size}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500">Last Updated</p>
                          <p className="font-medium">{new Date(brochure.lastUpdated).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full gap-2" asChild>
                        <a href={brochure.downloadUrl} download>
                          <Download size={16} />
                          Download Brochure
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Certificates
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {certificates.map(certificate => (
                <motion.div 
                  key={certificate.id} 
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row">
                    {certificate.image && (
                      <div className="w-full md:w-1/3 relative overflow-hidden">
                        <div className="h-full min-h-[160px] bg-gray-100 flex items-center justify-center p-4">
                          <div className="relative w-24 h-24">
                            <motion.div 
                              className="absolute inset-0 bg-primary-100 rounded-full"
                              animate={{ 
                                scale: [1, 1.05, 1],
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            />
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 1 }}
                            >
                              <img 
                                src={certificate.image} 
                                alt={certificate.title}
                                className="w-16 h-16 object-contain"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={`flex-1 ${certificate.image ? 'md:w-2/3' : 'w-full'}`}>
                      <CardHeader>
                        <Badge className="w-fit mb-2 bg-primary-100 text-primary-800 hover:bg-primary-200">
                          {certificate.issuer}
                        </Badge>
                        <CardTitle className="text-lg">{certificate.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{certificate.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Issue Date</p>
                            <p className="font-medium">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expiry Date</p>
                            <p className="font-medium">{new Date(certificate.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {certificate.file && (
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href={certificate.file} target="_blank" rel="noopener noreferrer">
                              <Eye size={16} />
                              View Certificate
                            </a>
                          </Button>
                        )}
                      </CardFooter>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Press Releases CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-md relative overflow-hidden"
          >
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-100 rounded-full"></div>
            <div className="absolute right-20 bottom-10 w-32 h-32 bg-primary-200/50 rounded-full"></div>
            <div className="absolute left-10 top-10 w-24 h-24 bg-primary-50 rounded-full"></div>
            
            <div className="relative z-10 max-w-3xl">
              <motion.h2 
                className="text-3xl md:text-4xl font-serif font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Press & Media <span className="text-primary-600">Inquiries</span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                For press releases, media kits, interview requests, or information about our sustainable biomass solutions,
                please reach out to our media relations team.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button asChild className="gap-2">
                  <Link to="/contact">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                      <path d="M16.5 9.4 7.55 4.24"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                      <circle cx="18.5" cy="15.5" r="2.5"></circle>
                      <path d="M20.27 17.27 22 19"></path>
                    </svg>
                    Contact Media Team
                  </Link>
                </Button>
                <Button variant="outline" asChild className="gap-2">
                  <Link to="/downloads">
                    <Download size={18} />
                    Media Resources
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Media;
