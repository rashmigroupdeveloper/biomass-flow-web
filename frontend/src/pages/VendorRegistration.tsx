import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';

const VendorRegistration = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    gstOrTaxId: '',
    materials: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: 'Registration received',
        description: 'Our procurement team will review your details and respond shortly.',
        duration: 5000,
      });
      setFormData({
        company: '',
        contactName: '',
        email: '',
        phone: '',
        gstOrTaxId: '',
        materials: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const fieldClass =
    'w-full bg-transparent border-0 border-b text-gray-900 text-base py-3 placeholder-gray-300 focus:outline-none focus:ring-0 transition-colors duration-200';
  const labelClass = 'block text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 mb-1.5';

  return (
    <>
      <Helmet>
        <title>Vendor registration | Rashmi 6 Paradigm</title>
        <meta
          name="description"
          content="Register as a vendor or supplier for Rashmi 6 Paradigm biomass and related materials."
        />
        <link rel="canonical" href="https://rashmi6paradigm.com/contactus/venderregister" />
      </Helmet>

      <div className="relative" style={{ overflowX: 'clip' }}>
        <section
          className="relative pt-36 pb-16 md:pt-44 md:pb-20"
          style={{ background: '#0a1a0c' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 50% 60%, rgba(46,125,50,0.1) 0%, transparent 65%)',
            }}
          />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex items-center gap-5 mb-10">
              <span className="text-white/25 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
                Suppliers
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <SplitReveal
              as="h1"
              className="font-serif font-bold text-white leading-[0.93] tracking-tight max-w-4xl"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              mode="chars"
              delay={0.15}
            >
              Vendor registration
            </SplitReveal>
            <p className="mt-8 text-white/55 text-base md:text-lg max-w-2xl leading-relaxed">
              Share your company profile, capabilities, and the materials or services you can supply.
            </p>
          </div>
        </section>

        <section ref={ref} className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Company name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Registered legal name"
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                  />
                </div>
                <div>
                  <label className={labelClass}>Contact person</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="procurement@yourcompany.com"
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 …"
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>GST / tax ID (optional)</label>
                <input
                  type="text"
                  name="gstOrTaxId"
                  value={formData.gstOrTaxId}
                  onChange={handleChange}
                  placeholder="If applicable"
                  className={fieldClass}
                  style={{ borderBottomColor: '#e5e7eb' }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                />
              </div>

              <div>
                <label className={labelClass}>Materials or services offered</label>
                <input
                  type="text"
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  required
                  placeholder="e.g. biomass feedstock, logistics, packaging"
                  className={fieldClass}
                  style={{ borderBottomColor: '#e5e7eb' }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                />
              </div>

              <div>
                <label className={labelClass}>Additional details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Capacity, certifications, delivery regions…"
                  className={`${fieldClass} resize-none`}
                  style={{ borderBottomColor: '#e5e7eb' }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-gray-400">We review vendor submissions during business hours.</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50"
                  style={{ background: '#2e7d32' }}
                >
                  {isSubmitting ? 'Submitting…' : 'Submit registration'}
                </button>
              </div>
            </motion.form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default VendorRegistration;
