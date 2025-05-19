
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Search, Filter, EyeIcon, Download, AlertCircle, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedFooter from '@/components/EnhancedFooter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card, CardContent } from '@/components/ui/card';

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

// Temporary mock data - replace with actual API calls
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Rashmi 6 Paradigm Expands Biomass Pellet Production Capacity",
    date: "2023-09-15",
    category: "Expansion",
    excerpt: "Rashmi 6 Paradigm Limited announces the expansion of its biomass pellet production capacity to meet growing global demand for sustainable fuel alternatives.",
    image: "https://images.unsplash.com/photo-1611273426858-450e7f64a0f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    content: "Rashmi 6 Paradigm Limited, a leading manufacturer of biomass pellets, activated carbon, and charcoal briquettes, is pleased to announce the expansion of its production capacity at its state-of-the-art facility in Eastern India. The expansion will increase the company's annual production capacity by 50%, enabling it to meet the growing global demand for sustainable fuel alternatives.\n\nThe expansion project, which includes the installation of new pelletizing lines and drying equipment, is expected to be completed by the end of the year. The increased capacity will allow Rashmi 6 Paradigm to strengthen its position as a key player in the renewable energy sector and contribute to the global effort to reduce carbon emissions.",
    documentUrl: null
  },
  {
    id: 2,
    title: "Rashmi 6 Paradigm Achieves ISO 14001 Certification",
    date: "2023-07-22",
    category: "Achievement",
    excerpt: "Our commitment to environmental management excellence recognized with ISO 14001:2015 certification.",
    image: "https://images.unsplash.com/photo-1518544866330-3b71bd8b24b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    content: "Rashmi 6 Paradigm Limited is proud to announce that it has achieved ISO 14001:2015 certification for its Environmental Management System. This prestigious certification recognizes our commitment to minimizing our environmental impact and continually improving our sustainability performance.\n\nThe ISO 14001:2015 standard is the internationally recognized standard for environmental management systems. It provides a framework for organizations to protect the environment, respond to changing environmental conditions, and balance socio-economic needs.\n\nThis certification is a testament to our unwavering commitment to environmental stewardship and sustainable business practices. We look forward to continuing our journey toward a more sustainable future for all.",
    documentUrl: null
  },
  {
    id: 3,
    title: "Rashmi 6 Paradigm Wins Green Manufacturing Excellence Award",
    date: "2023-05-10",
    category: "Award",
    excerpt: "Rashmi 6 Paradigm recognized for its innovative approach to sustainable manufacturing practices.",
    image: "https://images.unsplash.com/photo-1607000975876-d5b92446151a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    content: "Rashmi 6 Paradigm Limited is honored to receive the Green Manufacturing Excellence Award at the annual Sustainable Industries Conference. The award recognizes our innovative approach to sustainable manufacturing practices and our commitment to reducing environmental impact throughout our operations.\n\nOur comprehensive sustainability initiatives include the use of renewable energy sources, water conservation efforts, waste reduction programs, and the implementation of energy-efficient technologies. These efforts have resulted in a significant reduction in our carbon footprint and resource consumption.\n\nWe are proud to be recognized as a leader in sustainable manufacturing and remain committed to advancing our environmental stewardship efforts.",
    documentUrl: "https://example.com/award-document.pdf"
  },
  {
    id: 4,
    title: "Rashmi 6 Paradigm Launches Carbon Offset Program",
    date: "2023-03-20",
    category: "Sustainability",
    excerpt: "New initiative aims to offset carbon emissions from the company's operations through forest conservation and reforestation projects.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    content: "Rashmi 6 Paradigm Limited is pleased to announce the launch of its Carbon Offset Program, a new initiative aimed at offsetting carbon emissions from the company's operations through forest conservation and reforestation projects.\n\nThe program, which is part of our broader sustainability strategy, will fund forest conservation efforts in critical ecosystems and support reforestation projects in degraded areas. These efforts will help sequester carbon dioxide from the atmosphere, preserve biodiversity, and support local communities.\n\nWe believe that businesses have a responsibility to address climate change and are committed to doing our part to create a more sustainable future. This program is a significant step forward in our journey towards carbon neutrality.",
    documentUrl: "https://example.com/carbon-offset.pdf"
  },
  {
    id: 5,
    title: "Rashmi 6 Paradigm Partners with Local Farmers for Sustainable Biomass Sourcing",
    date: "2022-11-15",
    category: "Sustainability",
    excerpt: "New partnership program focuses on sustainable agricultural waste sourcing for biomass pellet production.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    content: "Rashmi 6 Paradigm Limited is excited to announce the launch of its Sustainable Biomass Sourcing Partnership, a program designed to work directly with local farmers to source agricultural waste for our biomass pellet production.\n\nThis innovative program offers farmers a reliable market for their agricultural residues, which might otherwise be burned in the field, contributing to air pollution. Instead, these residues will be transformed into clean-burning biomass pellets, creating a circular economy that benefits both the environment and local communities.\n\nThe program also includes training and support for farmers on sustainable agriculture practices, further enhancing the positive impact of this initiative. We are proud to partner with our local farming communities in this important sustainability effort.",
    documentUrl: null
  },
  {
    id: 6,
    title: "Rashmi 6 Paradigm Completes Installation of Solar Power System",
    date: "2022-09-05",
    category: "Sustainability",
    excerpt: "New solar installation will offset 30% of facility's electricity consumption.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    content: "Rashmi 6 Paradigm Limited is pleased to announce the completion of its large-scale solar power installation at its manufacturing facility. The new solar photovoltaic system will generate approximately 30% of the facility's total electricity needs, significantly reducing our carbon footprint and energy costs.\n\nThis project represents a major investment in renewable energy and demonstrates our commitment to sustainable operations. The solar installation features state-of-the-art technology and is expected to have a lifespan of over 25 years, providing long-term environmental and economic benefits.\n\nThe shift to solar power is part of our broader energy strategy, which includes energy efficiency improvements and other renewable energy initiatives. We are committed to reducing our environmental impact and contributing to a cleaner, more sustainable future.",
    documentUrl: "https://example.com/solar-project.pdf"
  }
];

const Media = () => {
  // State for content
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usingCachedData, setUsingCachedData] = useState<boolean>(false);
  
  // Filtering and display state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'brochures' | 'certificates'>('news');
  const [expandedNewsId, setExpandedNewsId] = useState<number | null>(null);
  
  // Add new state for view mode toggle
  const [viewMode, setViewMode] = useState<'regular' | 'linkedin'>('regular');
  const linkedInContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = ['All', 'Achievement', 'Expansion', 'Award', 'Sustainability'];
  
  // LinkedIn script loading effect
  useEffect(() => {
    if (viewMode === 'linkedin' && !document.getElementById('sk-linkedin-script')) {
      const script = document.createElement('script');
      script.id = 'sk-linkedin-script';
      script.src = 'https://widgets.sociablekit.com/linkedin-page-posts/widget.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script if component unmounts
        const existingScript = document.getElementById('sk-linkedin-script');
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, [viewMode]);

  // Update category filter when a category button is clicked
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    // Reset expanded article when filter changes
    setExpandedNewsId(null);
  };
  
  // Filter news based on selected category and search term
  const filteredNews = news.filter(item => {
    // Check if the item matches the search term
    const matchesSearch = 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if the item matches the selected category
    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category === selectedCategory;
    
    // Item must match both conditions to be included
    return matchesSearch && matchesCategory;
  });
  
  const toggleArticle = (id: number) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const shimmerEffect = {
    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite'
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-900/90 to-background/80 mix-blend-multiply">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-fixed bg-center bg-cover opacity-20"></div>
          {/* Animated particles for a dynamic background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-primary-300/20 animate-float"></div>
            <div className="absolute top-2/3 left-2/3 w-24 h-24 rounded-full bg-primary-400/20 animate-float animation-delay-2000"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-primary-500/10 animate-float animation-delay-1000"></div>
          </div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">
              Media & <span className="text-primary-300">News</span>
            </h1>
            <motion.div
              variants={fadeInUp}
              className="h-1 w-24 bg-primary-500 mx-auto mb-6 rounded-full"
            ></motion.div>
            <motion.p 
              variants={fadeInUp}
              className="text-white/90 text-xl max-w-3xl mx-auto mb-8"
            >
              Stay informed about the latest developments, innovations, and sustainability initiatives from Rashmi 6 Paradigm Limited.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              variants={fadeInUp}
            >
              <a href="#news" className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 inline-flex items-center justify-center">
                <Globe size={18} className="mr-2" />
                Latest News
              </a>
              <a href="#social" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-medium rounded-lg transition-all transform hover:scale-105 inline-flex items-center justify-center">
                <Linkedin size={18} className="mr-2" />
                Social Updates
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-0 z-5"
        >
          <svg className="relative block w-full h-[40px] text-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,99.92,112.08,103.29,166,101.5c24.59-.86,49.62-2.95,73.26-5.41Z" opacity=".15" className="fill-background"></path>
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86-40,7.47-80.59,12.24-121.15,16.56a1084.48,1084.48,0,0,1-110,5.19,1041.87,1041.87,0,0,1-110-5.19c-40.55-4.32-81.14-9.09-121.16-16.56C14.71,44.13,0,36.08,0,36.08V120H1200V36.08C1200,36.08,1064.09,110.36,985.66,92.83Z" className="fill-background"></path>
          </svg>
        </motion.div>
      </section>
      
      {/* View Mode Toggle */}
      <section id="news" className="py-4 bg-card border-t border-border/40 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <div className="inline-flex p-1 bg-muted rounded-full shadow-inner">
              <button
                onClick={() => setViewMode('regular')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'regular' 
                    ? 'bg-white dark:bg-primary-900 shadow text-primary-600 dark:text-primary-300' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/10'
                }`}
              >
                Media Content
              </button>
              <button
                onClick={() => setViewMode('linkedin')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                  viewMode === 'linkedin' 
                    ? 'bg-white dark:bg-primary-900 shadow text-primary-600 dark:text-primary-300' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/10'
                }`}
              >
                <Linkedin size={16} className="mr-1.5" />
                LinkedIn Feed
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {viewMode === 'regular' ? (
        <>
          {/* Filters Section */}
          <section className="py-6 bg-card border-y border-border/40 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                  <Filter size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-4 py-2 rounded-md text-sm whitespace-nowrap transition-all duration-300 transform ${
                          selectedCategory === category 
                            ? 'bg-primary-500 text-white shadow-md hover:shadow-lg scale-105' 
                            : 'bg-muted hover:bg-muted/80 text-foreground hover:-translate-y-1'
                        }`}
                        onClick={() => handleCategoryFilter(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="w-full py-2 pl-10 pr-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
          </section>
          
          {/* News Grid Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {/* Display active filters if any are selected */}
              {(selectedCategory !== 'All' || searchTerm !== '') && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2"
                >
                  <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-500/10 border border-primary-500/20 text-primary-700 dark:text-primary-300">
                        <span>Category: {selectedCategory}</span>
                        <button 
                          onClick={() => setSelectedCategory('All')}
                          className="ml-2 text-primary-600/80 hover:text-primary-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {searchTerm !== '' && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-500/10 border border-primary-500/20 text-primary-700 dark:text-primary-300">
                        <span>Search: {searchTerm}</span>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="ml-2 text-primary-600/80 hover:text-primary-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Display error if any */}
              {error && !usingCachedData && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">Error</h3>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-200 opacity-30"></div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                  </div>
                </div>
              ) : activeTab === 'news' ? (
                filteredNews.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredNews.map(newsItem => (
                      <motion.div
                        key={newsItem.id}
                        variants={fadeInUp}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="h-full"
                      >
                        <Card className="overflow-hidden h-full flex flex-col bg-card hover:shadow-xl transition-all duration-300 group border-border">
                          <div className="relative overflow-hidden">
                            <img 
                              src={newsItem.image} 
                              alt={newsItem.title}
                              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-0 right-0 m-3">
                              <HoverCard openDelay={0} closeDelay={100}>
                                <HoverCardTrigger asChild>
                                  <span className="px-3 py-1 bg-card/80 backdrop-blur-sm text-xs font-medium rounded-full border border-border/40 cursor-help">
                                    {newsItem.category}
                                  </span>
                                </HoverCardTrigger>
                                <HoverCardContent className="bg-card w-64 p-4 shadow-lg border border-border text-sm">
                                  <div className="space-y-2">
                                    <h4 className="font-bold">{newsItem.category} News</h4>
                                    <p className="text-muted-foreground">
                                      {newsItem.category === 'Achievement' && 'Recent milestones and recognitions achieved by Rashmi 6 Paradigm.'}
                                      {newsItem.category === 'Expansion' && 'Updates on company growth, new facilities, and market expansion.'}
                                      {newsItem.category === 'Award' && 'Honors and recognitions received for excellence in the industry.'}
                                      {newsItem.category === 'Sustainability' && 'Initiatives and progress toward environmental sustainability goals.'}
                                    </p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                          </div>
                          
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <Calendar size={14} className="mr-1" />
                              {new Date(newsItem.date).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                              })}
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors duration-300">{newsItem.title}</h3>
                            <p className="text-muted-foreground mb-4 flex-grow">{newsItem.excerpt}</p>
                            
                            <button
                              onClick={() => toggleArticle(newsItem.id)}
                              className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors group/button"
                              aria-expanded={expandedNewsId === newsItem.id}
                              aria-controls={`content-${newsItem.id}`}
                            >
                              {expandedNewsId === newsItem.id ? 'Read Less' : 'Read More'}
                              <EyeIcon size={16} className="ml-1 group-hover/button:translate-x-1 transition-transform duration-300" />
                            </button>
                            
                            {expandedNewsId === newsItem.id && (
                              <motion.div 
                                id={`content-${newsItem.id}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="mt-4 pt-4 border-t border-border/40"
                              >
                                <p className="text-muted-foreground whitespace-pre-line">{newsItem.content}</p>
                                <div className="mt-4 pt-4 border-t border-border/40 flex justify-between">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Globe size={14} className="mr-1" />
                                    Press Release
                                  </div>
                                  {newsItem.documentUrl ? (
                                    <a 
                                      href={newsItem.documentUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                                      download
                                    >
                                      <Download size={14} className="mr-1" />
                                      Download PDF
                                    </a>
                                  ) : null}
                                </div>
                              </motion.div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-16"
                  >
                    <div className="bg-card border border-border rounded-xl p-10 inline-block max-w-md">
                      <Search size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                      <h3 className="text-xl font-bold mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria to find what you're looking for.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('All');
                        }}
                        className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </motion.div>
                )
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-muted-foreground">
                    {activeTab === 'brochures' ? 'Brochures' : 'Certificates'} content will be available soon.
                  </p>
                </motion.div>
              )}
            </div>
          </section>
          
          {/* Press Releases CTA Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative overflow-hidden"
              >
                {/* Decorative backgrounds */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                    Stay Updated with <span className="text-primary-500">Latest News</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                    Subscribe to our newsletter for regular updates on new products, sustainability initiatives, and company announcements.
                  </p>
                  
                  <div id="subscribe" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary-500/50 bg-card"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Subscribe
                    </motion.button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    By subscribing, you agree to receive news and updates from Rashmi 6 Paradigm.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        // LinkedIn Feed Section
        <section className="py-16" id="social">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold flex items-center">
                    <Linkedin size={24} className="text-[#0A66C2] mr-2" />
                    <span>LinkedIn <span className="text-primary-500">Updates</span></span>
                  </h2>
                  <span className="text-sm text-muted-foreground">Stay Connected</span>
                </div>
                
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="aspect-video bg-muted animate-pulse flex items-center justify-center">
                    <div className="text-muted-foreground text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.953 9.953 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="font-medium">LinkedIn Feed Loading</p>
                      <p className="text-sm mt-2">If the feed doesn't appear, please ensure you have allowed third-party content in your browser settings.</p>
                    </div>
                  </div>
                </div>
                
                {/* LinkedIn feed embed */}
                <div className="linkedin-feed-container overflow-hidden rounded-lg" ref={linkedInContainerRef}>
                  {/* Using iframe for more reliable rendering */}
                  <iframe 
                    src='https://widgets.sociablekit.com/linkedin-page-posts/iframe/25546715' 
                    frameBorder='0' 
                    width='100%' 
                    height='800'
                    title="Rashmi 6 Paradigm LinkedIn Feed"
                    className="bg-white rounded-lg"
                  ></iframe>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border/40 text-center">
                  <a 
                    href="https://www.linkedin.com/company/rashmi-6-paradigm/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors"
                  >
                    <Linkedin size={18} className="mr-2" />
                    Follow Us on LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      
      <EnhancedFooter />
    </div>
  );
};

export default Media;
