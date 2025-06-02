
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Globe, Search, Filter, Eye, Download, AlertCircle, Linkedin, Play, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RevealText from '@/components/ui/RevealText';
import { getNews, getBrochures, getCertificates } from '@/lib/cmsService';
import type { NewsItem, Brochure, Certificate } from '@/lib/cmsService';

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
  const [activeTab, setActiveTab] = useState<'news' | 'resources' | 'press'>('news');
  const [expandedNewsId, setExpandedNewsId] = useState<number | null>(null);
  
  const categories = ['All', 'Achievement', 'Expansion', 'Award', 'Sustainability', 'Innovation'];
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'news') {
          const newsData = await getNews();
          setNews(newsData);
        } else if (activeTab === 'resources') {
          const brochuresData = await getBrochures();
          const certificatesData = await getCertificates();
          setBrochures(brochuresData);
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

  const featuredNews = filteredNews.slice(0, 3);
  const regularNews = filteredNews.slice(3);
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Media & News | Rashmi 6 Paradigm</title>
        <meta name="description" content="Latest news, press releases, and media coverage about Rashmi 6 Paradigm and our industry-leading biomass products." />
        <meta name="keywords" content="Rashmi 6 Paradigm news, biomass industry news, company updates, press releases" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585974738771-84483dd9f89f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Latest Updates</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Media & <span className="text-primary-400">News</span>
            </h1>
            
            <RevealText
              text="Stay informed about our journey towards sustainable energy"
              as="p"
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
              staggerDelay={0.03}
              initialDelay={0.5}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                Latest News
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Linkedin className="w-4 h-4 mr-2" />
                Follow on LinkedIn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <section className="py-8 bg-card/50 backdrop-blur-sm border-y border-border/40 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <TabsList className="grid w-full lg:w-auto grid-cols-3 lg:grid-cols-3">
                <TabsTrigger value="news" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  News & Updates
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="press" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Press Kit
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="pl-10 pr-4 py-2 w-64 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsContent value="news" className="space-y-12">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Error Loading Content</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : (
              <>
                {/* Featured News */}
                {featuredNews.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Featured Stories</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {featuredNews.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 h-full">
                            <div className="relative overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-4 right-4">
                                <Badge variant="secondary" className="bg-white/90 text-primary-800">
                                  {item.category}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(item.date).toLocaleDateString('en-US', {
                                  year: 'numeric', month: 'long', day: 'numeric'
                                })}
                              </div>
                              <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.title}</h3>
                              <p className="text-muted-foreground mb-4 line-clamp-3">{item.excerpt}</p>
                              <Button 
                                variant="ghost" 
                                onClick={() => toggleArticle(item.id)}
                                className="group/btn p-0 h-auto font-medium text-primary-600 hover:text-primary-700"
                              >
                                Read More
                                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular News Grid */}
                {regularNews.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">All News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regularNews.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                            <div className="relative">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-40 object-cover"
                              />
                              <Badge className="absolute top-3 right-3 bg-primary-500">
                                {item.category}
                              </Badge>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-center text-xs text-muted-foreground mb-2">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(item.date).toLocaleDateString()}
                              </div>
                              <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.excerpt}</p>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleArticle(item.id)}
                                className="p-0 h-auto text-primary-600"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Read More
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredNews.length === 0 && !loading && (
                  <div className="text-center py-20">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                    <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="text-center py-20">
              <Download className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Resources Coming Soon</h3>
              <p className="text-muted-foreground">Brochures, certificates, and other resources will be available here.</p>
            </div>
          </TabsContent>

          <TabsContent value="press" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                    Follow Our Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-6">
                    Stay updated with our latest achievements, insights, and industry developments through our LinkedIn presence.
                  </p>
                  <iframe 
                    src='https://widgets.sociablekit.com/linkedin-page-posts/iframe/25546715' 
                    frameBorder='0' 
                    width='100%' 
                    height='400'
                    title="Rashmi 6 Paradigm LinkedIn Feed"
                    className="rounded-lg border border-border"
                  ></iframe>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Media Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4">
                      For press releases, interviews, or media partnerships, contact our media relations team.
                    </p>
                    <Button className="w-full">
                      Contact Media Team
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Press Kit</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Company Logo Package
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Executive Photos
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Fact Sheet
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Media;
