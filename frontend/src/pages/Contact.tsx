import React, { useState } from 'react';
import { SEO } from '@/components/SEO';
import { webPageSchema } from '@/lib/schemas';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import { submitContactForm } from '@/api/contact';

const SITE_ORIGIN = 'https://rashmi6paradigm.com';

const PRODUCT_LABELS: Record<string, string> = {
  'bio-pellets': 'Bio Pellets',
  'activated-carbon': 'Activated Carbon',
  'charcoal-briquettes': 'Charcoal Briquettes',
  multiple: 'Multiple products',
  other: 'General inquiry',
};

function buildContactSubject(company: string, productSlug: string): string {
  const product = PRODUCT_LABELS[productSlug] ?? productSlug;
  return `${product} - ${company.trim()}`;
}

const Contact = () => {
  const location = useLocation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const canonicalPath = location.pathname === '/contactus/contactus' ? '/contactus/contactus' : '/contact';

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    product: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: '',
        subject: buildContactSubject(formData.company, formData.product),
        message: formData.message.trim(),
        selectedProducts: formData.product ? [formData.product] : undefined,
        recaptchaToken: '',
      };

      const data = await submitContactForm(payload);

      if (!data.success) {
        const detail =
          data.errors?.length ? data.errors.join(' ') : data.message;
        toast({
          title: 'Could not send inquiry',
          description: detail,
          variant: 'destructive',
          duration: 8000,
        });
        return;
      }

      toast({
        title: 'Inquiry received',
        description: data.referenceId
          ? `${data.message} Reference: ${data.referenceId}.`
          : data.message,
        duration: 6000,
      });
      setFormData({ company: '', name: '', email: '', product: '', message: '' });
    } catch {
      toast({
        title: 'Network error',
        description: 'Could not reach the server. Check that the API is running and VITE_API_URL is set correctly.',
        variant: 'destructive',
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full bg-transparent border-0 border-b text-gray-900 text-base py-3 placeholder-gray-300 focus:outline-none focus:ring-0 transition-colors duration-200';
  const labelClass = 'block text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 mb-1.5';

  return (
    <>
      <SEO
        title="Contact | Rashmi 6 Paradigm"
        description="Get in touch with Rashmi 6 Paradigm for bio pellets, activated carbon, and charcoal briquette inquiries, samples, and pricing."
        canonical={canonicalPath}
        jsonLd={webPageSchema(
          'Contact',
          'Get in touch with Rashmi 6 Paradigm for bio pellets, activated carbon, and charcoal briquette inquiries.',
          `${SITE_ORIGIN}${canonicalPath}`
        )}
      />

      <div className="relative" style={{ overflowX: 'clip' }}>

        {/* ── Hero ── */}
        <section
          className="relative pt-36 pb-20 md:pt-44 md:pb-24"
          style={{ background: '#0a1a0c' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 60%, rgba(46,125,50,0.1) 0%, transparent 65%)',
            }}
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex items-center gap-5 mb-10">
              <span className="text-white/25 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">Contact</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <SplitReveal
                  as="h1"
                  className="font-serif font-bold text-white leading-[0.93] tracking-tight"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
                  mode="chars"
                  delay={0.2}
                >
                  Let's talk biomass.
                </SplitReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact body ── */}
        <section ref={ref} className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

              {/* Left: contact details */}
              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="space-y-10">

                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] block mb-3">
                      Email
                    </span>
                    <a
                      href="mailto:bioenergy.tender@rashmigroup.com"
                      className="text-gray-900 font-medium text-sm hover:text-primary-700 transition-colors break-all"
                    >
                      bioenergy.tender@rashmigroup.com
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] block mb-3">
                      Phone
                    </span>
                    <a href="tel:+913340237200" className="text-gray-900 font-medium text-sm hover:text-primary-700 transition-colors block">
                      +91 33 4023 7200
                    </a>
                    <a href="tel:+918420018282" className="text-gray-900 font-medium text-sm hover:text-primary-700 transition-colors block mt-1">
                      +91 84200 18282
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] block mb-3">
                      Registered Office
                    </span>
                    <address className="not-italic text-gray-500 text-sm leading-[1.8]">
                      First Floor, Ideal Center,<br />
                      9, A.J.C. Bose Road,<br />
                      Kolkata, West Bengal – 700017
                    </address>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] block mb-3">
                      Factory
                    </span>
                    <address className="not-italic text-gray-500 text-sm leading-[1.8]">
                      Khatranga, Changual,<br />
                      Kharagpur – 721301,<br />
                      West Bengal
                    </address>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] block mb-3">
                      Hours
                    </span>
                    <p className="text-gray-500 text-sm">Monday – Friday</p>
                    <p className="text-gray-500 text-sm">9:00 am – 8:00 pm IST</p>
                  </div>

                </div>
              </motion.div>

              {/* Right: inquiry form */}
              <motion.div
                className="lg:col-span-8"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <form onSubmit={handleSubmit} className="space-y-10">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your organization"
                        required
                        className={fieldClass}
                        style={{ borderBottomColor: '#e5e7eb' }}
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
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
                        placeholder="work@company.com"
                        required
                        className={fieldClass}
                        style={{ borderBottomColor: '#e5e7eb' }}
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Product Interest</label>
                      <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        required
                        className={`${fieldClass} cursor-pointer`}
                        style={{ borderBottomColor: '#e5e7eb', color: formData.product ? '#111827' : '#9ca3af' }}
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                      >
                        <option value="" disabled>Select a product</option>
                        <option value="bio-pellets">Bio Pellets</option>
                        <option value="activated-carbon">Activated Carbon</option>
                        <option value="charcoal-briquettes">Charcoal Briquettes</option>
                        <option value="multiple">Multiple Products</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements — volumes, specifications, timelines..."
                      required
                      rows={5}
                      className={`${fieldClass} resize-none`}
                      style={{ borderBottomColor: '#e5e7eb' }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#4caf50')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#e5e7eb')}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-[11px] text-gray-400">
                      We respond within 1 business day.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50"
                      style={{ background: '#2e7d32' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#1b5e20')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#2e7d32')}
                    >
                      {isSubmitting ? 'Sending…' : 'Send Inquiry'}
                      {!isSubmitting && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
