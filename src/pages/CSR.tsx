
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  HandHeart, 
  Users, 
  TreeDeciduous, 
  Earth, 
  Award,
  Heart,
  GraduationCap,
  Stethoscope,
  Sprout,
  MapPin,
  Target,
  TrendingUp,
  ArrowRight,
  Calendar,
  Download
} from 'lucide-react';

const CSR = () => {
  const impactMetrics = [
    { number: "15,000+", label: "People Impacted", icon: <Users className="w-6 h-6" /> },
    { number: "25+", label: "Active Projects", icon: <Target className="w-6 h-6" /> },
    { number: "₹2.5Cr+", label: "Investment Made", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "50+", label: "Villages Reached", icon: <MapPin className="w-6 h-6" /> }
  ];

  const coreAreas = [
    {
      icon: <GraduationCap className="w-8 h-8 text-primary-600" />,
      title: "Education & Skill Development",
      description: "Empowering communities through education and vocational training programs.",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-primary-600" />,
      title: "Healthcare Initiatives",
      description: "Providing healthcare access and wellness programs in underserved areas.",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Sprout className="w-8 h-8 text-primary-600" />,
      title: "Environmental Conservation",
      description: "Protecting ecosystems and promoting sustainable practices.",
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      icon: <HandHeart className="w-8 h-8 text-primary-600" />,
      title: "Community Empowerment",
      description: "Supporting local communities through economic and social development.",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  const programs = [
    {
      id: "farmer-support",
      title: "Farmer Support Program",
      location: "West Bengal, Odisha",
      beneficiaries: "5,000+ Farmers",
      description: "Providing additional income streams to farmers through agricultural waste collection and sustainable farming practices.",
      image: "https://images.unsplash.com/photo-1595431049262-d8888a50ba17?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      impact: [
        "₹15,000 average additional income per farmer annually",
        "Reduced agricultural waste burning by 80%",
        "Training provided to 2,000+ farmers on sustainable practices"
      ],
      status: "Active"
    },
    {
      id: "education",
      title: "Rural Education Initiative",
      location: "Kharagpur Region",
      beneficiaries: "2,500+ Students",
      description: "Supporting schools with infrastructure, digital learning tools, and scholarship programs.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      impact: [
        "12 schools upgraded with modern facilities",
        "500+ scholarships provided to underprivileged students",
        "Digital literacy programs for 1,000+ students"
      ],
      status: "Active"
    },
    {
      id: "health",
      title: "Community Health Camps",
      location: "Rural Bengal",
      beneficiaries: "8,000+ People",
      description: "Mobile healthcare units providing medical checkups, treatments, and health awareness programs.",
      image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      impact: [
        "24 health camps conducted annually",
        "Free medical checkups for 8,000+ people",
        "Vaccination drives covering 50+ villages"
      ],
      status: "Active"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Corporate Social Responsibility | Rashmi 6 Paradigm</title>
        <meta name="description" content="Our commitment to corporate social responsibility and community development through sustainable biomass solutions." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-15"></div>
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
              <Heart className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm font-medium">Making a Difference</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Corporate Social <span className="text-primary-400">Responsibility</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Creating positive impact beyond business through sustainable community development and environmental stewardship.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                View Our Impact
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                CSR Report 2024
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Measuring our commitment through meaningful metrics and community impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 bg-white border-l-4 border-primary-500">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 text-primary-600">
                    {metric.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary-800 mb-2">{metric.number}</h3>
                  <p className="text-gray-600 font-medium">{metric.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Focus Areas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We focus on four key areas where we can create the most meaningful and lasting impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-xl transition-all duration-300 ${area.color} border-2`}>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">{area.icon}</div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-3">{area.title}</h3>
                    <p className="text-gray-600 text-sm">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs & Initiatives */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Our Programs</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover our flagship programs that are making a real difference in communities across India.
            </p>
          </motion.div>

          <div className="space-y-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-500 text-white">
                          {program.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-primary-800">{program.title}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {program.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {program.beneficiaries}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{program.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-primary-800">Key Impact:</h4>
                        {program.impact.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="text-primary-600 border-primary-600 hover:bg-primary-50">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Partner with Us for Greater Impact</h2>
            <p className="text-lg mb-8 text-gray-200">
              Join us in our mission to create sustainable communities and build a better future for all. 
              Together, we can achieve more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-800 hover:bg-gray-100">
                Partnership Opportunities
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download CSR Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CSR;
