
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };
  
  // Animation variants
  const pageTransitionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const contactItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const formFieldVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const formSubmitVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-primary-50">
          <motion.div 
            className="container mx-auto px-6 md:px-12 text-center"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-800 mb-6">
              Get in <span className="text-primary-600">Touch</span>
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 mb-8">
              Have questions about our products or services? We're here to help you find the perfect biomass solution for your needs.
            </p>
            <motion.div 
              className="w-24 h-1.5 bg-primary-500 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </section>
        
        {/* Contact Information & Form Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-8">
                <h2 className="text-3xl font-serif font-bold text-primary-800 mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    custom={0}
                    variants={contactItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Office Address</h3>
                      <p className="text-gray-700">123 Green Energy Way<br />Kolkata, West Bengal 700001<br />India</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    custom={1}
                    variants={contactItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-700">+91 33 1234 5678</p>
                      <p className="text-gray-700">+91 98765 43210 (Sales)</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    custom={2}
                    variants={contactItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-700">info@rashmi6paradigm.com</p>
                      <p className="text-gray-700">sales@rashmi6paradigm.com</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    custom={3}
                    variants={contactItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-700">Monday-Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Map */}
                <motion.div 
                  className="mt-8 bg-gray-100 rounded-lg h-64 overflow-hidden shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <iframe 
                    title="Company Location"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35231272291!2d88.26494086639558!3d22.535564339733883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1620143800902!5m2!1sen!2sin" 
                    loading="lazy"
                    style={{ border: 0 }}
                  ></iframe>
                </motion.div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-serif font-bold text-primary-800 mb-8">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      custom={0}
                      variants={formFieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={1}
                      variants={formFieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={2}
                      variants={formFieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={3}
                      variants={formFieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </motion.div>
                    
                    <motion.div
                      className="md:col-span-2"
                      custom={4}
                      variants={formFieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="mt-8"
                    custom={5}
                    variants={formFieldVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      variants={formSubmitVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors duration-300 flex items-center space-x-2 w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin w-5 h-5 border-2 border-white border-opacity-30 rounded-full border-t-white mr-2" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            <span>Send Message</span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                    
                    {/* Form submission status */}
                    {formStatus === 'success' && (
                      <motion.div 
                        className="mt-4 flex items-center text-green-600"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <CheckCircle size={18} className="mr-2" />
                        <span>Your message has been sent successfully. We'll get back to you soon!</span>
                      </motion.div>
                    )}
                    
                    {formStatus === 'error' && (
                      <motion.div 
                        className="mt-4 flex items-center text-red-600"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <AlertCircle size={18} className="mr-2" />
                        <span>There was an error sending your message. Please try again later.</span>
                      </motion.div>
                    )}
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-primary-800 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <FAQItem 
                  question="What are the minimum order quantities for your products?" 
                  answer="Our minimum order quantities vary by product. For bio pellets, we typically accept orders starting at 10 metric tons. For activated carbon and charcoal briquettes, minimum orders start at 5 metric tons. However, we can be flexible depending on your specific requirements." 
                  index={0}
                />
                
                <FAQItem 
                  question="Do you provide samples before large orders?" 
                  answer="Yes, we provide samples of all our products for testing and evaluation purposes. Please contact our sales team to request samples for your specific application." 
                  index={1}
                />
                
                <FAQItem 
                  question="What are your shipping and delivery terms?" 
                  answer="We offer both FOB and CIF shipping terms. Delivery times depend on your location and the volume of the order. Typically, domestic orders are delivered within 7-10 business days, while international shipments may take 2-4 weeks." 
                  index={2}
                />
                
                <FAQItem 
                  question="Are your products certified to international standards?" 
                  answer="Yes, all our products meet relevant international standards. Our bio pellets comply with ISO 17225-2, our activated carbon meets ASTM and AWWA standards, and our production facilities are ISO 9001:2015 and ISO 14001:2015 certified." 
                  index={3}
                />
                
                <FAQItem 
                  question="Do you offer customized products for specific applications?" 
                  answer="Yes, we can customize our products to meet your specific requirements. Our R&D team can work with you to develop products with properties tailored to your application, whether it's specific sizes, densities, or performance characteristics." 
                  index={4}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Page Transition */}
      <motion.div
        className="page-transition fixed inset-0 bg-primary-500 z-[100] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.button
        className="flex justify-between items-center w-full px-6 py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.99 }}
      >
        <h3 className="text-lg font-medium text-primary-800">{question}</h3>
        <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </motion.button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 pt-2 text-gray-700">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
