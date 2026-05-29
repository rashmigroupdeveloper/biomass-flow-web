import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, MapPin, Briefcase, Loader2 } from 'lucide-react';
import Footer from '@/components/Footer';
import SplitReveal from '@/components/SplitReveal';
import { toast } from '@/components/ui/use-toast';
import { fetchJobListings, type JobListing } from '@/api/jobs';
import { submitJobApplication } from '@/api/applications';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

const fieldClass =
  'w-full bg-transparent border-0 border-b text-gray-900 text-base py-3 placeholder-gray-300 focus:outline-none focus:ring-0 transition-colors duration-200';
const labelClass = 'block text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 mb-1.5';

const Career = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const applyRef = useRef<HTMLElement>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    coverLetter: '',
  });
  const [resume, setResume] = useState<File | null>(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const result = await fetchJobListings();
    if (result.ok === false) {
      setLoadError(result.message);
      setJobs([]);
    } else {
      setJobs(result.jobs);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  const handleSelectApply = (job: JobListing) => {
    setSelectedJobId(job.id);
    setExpandedId(job.id);
    applyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) {
      toast({
        title: 'Select a position',
        description: 'Choose an open role before submitting your application.',
        variant: 'destructive',
      });
      return;
    }
    if (!resume) {
      toast({
        title: 'Resume required',
        description: 'Please upload your resume (PDF, DOC, or DOCX).',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitJobApplication({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        position: selectedJob.title,
        department: selectedJob.department,
        experience: form.experience.trim() || undefined,
        education: form.education.trim() || undefined,
        coverLetter: form.coverLetter.trim() || undefined,
        vacancyId: selectedJob.id,
        resume,
      });

      if (result.ok === false) {
        toast({
          title: 'Application not sent',
          description: result.message,
          variant: 'destructive',
          duration: 8000,
        });
        return;
      }

      const { data } = result;
      toast({
        title: 'Application submitted',
        description: `Reference: ${data.applicationId}. ${data.note ?? data.message}`,
        duration: 8000,
      });
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        education: '',
        coverLetter: '',
      });
      setResume(null);
      setSelectedJobId('');
    } catch {
      toast({
        title: 'Network error',
        description: 'Could not reach the server. Check that the API is running.',
        variant: 'destructive',
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const borderFocus = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderBottomColor = '#4caf50';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderBottomColor = '#e5e7eb';
    },
  };

  return (
    <>
      <Helmet>
        <title>Careers | Rashmi 6 Paradigm</title>
        <meta
          name="description"
          content="Explore career opportunities at Rashmi 6 Paradigm in sustainable biomass, bioenergy, and industrial materials."
        />
        <link rel="canonical" href="https://rashmi6paradigm.com/contactus/career" />
      </Helmet>

      <div className="relative" style={{ overflowX: 'clip' }}>
        <section
          className="relative pt-36 pb-20 md:pt-44 md:pb-24"
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
                Careers
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
              Build the future of sustainable biomass.
            </SplitReveal>
            <p className="mt-8 text-white/55 text-base md:text-lg max-w-2xl leading-relaxed">
              Join our team across operations, quality, supply chain, and commercial roles. Browse
              open positions below and apply online.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Open positions
            </h2>
            <p className="text-gray-500 text-sm mb-10 max-w-2xl">
              Roles are synced from our hiring system. Listings update when new vacancies are approved.
            </p>

            {loading && (
              <div className="flex items-center gap-3 text-gray-500 py-16 justify-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading opportunities…</span>
              </div>
            )}

            {!loading && loadError && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-8 text-center max-w-lg mx-auto">
                <p className="text-gray-800 text-sm mb-4">{loadError}</p>
                <button
                  type="button"
                  onClick={loadJobs}
                  className="text-sm font-semibold text-primary-800 hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !loadError && jobs.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-12 text-center max-w-lg">
                <p className="text-gray-600 text-sm mb-4">
                  There are no open roles listed right now. You can still reach out with your CV.
                </p>
                <a
                  href="mailto:bioenergy.tender@rashmigroup.com?subject=Careers%20inquiry"
                  className="inline-flex px-6 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ background: '#2e7d32' }}
                >
                  Email your profile
                </a>
              </div>
            )}

            {!loading && !loadError && jobs.length > 0 && (
              <ul className="space-y-4 max-w-4xl">
                {jobs.map((job) => {
                  const expanded = expandedId === job.id;
                  return (
                    <li
                      key={job.id}
                      className="border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : job.id)}
                        className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-serif text-lg font-bold text-gray-900">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary-100 text-primary-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1">
                              <Briefcase size={12} />
                              {job.department}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={12} />
                              {job.location}
                            </span>
                            <span>{job.type}</span>
                            {job.posted_date && (
                              <span>Posted {formatDate(job.posted_date)}</span>
                            )}
                          </div>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-6 pb-6 border-t border-gray-100"
                        >
                          {job.salary_range && (
                            <p className="text-sm text-gray-600 mt-4 mb-2">
                              <span className="font-medium text-gray-800">Compensation: </span>
                              {job.salary_range}
                            </p>
                          )}
                          {job.description && (
                            <div className="mt-4">
                              <h4 className={labelClass}>Overview</h4>
                              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {job.description}
                              </p>
                            </div>
                          )}
                          {job.responsibilities?.length > 0 && (
                            <div className="mt-6">
                              <h4 className={labelClass}>Responsibilities</h4>
                              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                {job.responsibilities.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {job.requirements && (
                            <div className="mt-6">
                              <h4 className={labelClass}>Requirements</h4>
                              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {job.requirements}
                              </p>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleSelectApply(job)}
                            className="mt-6 inline-flex px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                            style={{ background: '#2e7d32' }}
                          >
                            Apply for this role
                          </button>
                        </motion.div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        <section
          ref={applyRef}
          className="bg-gray-50 py-16 md:py-24 border-t border-gray-200"
        >
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Apply online
            </h2>
            <p className="text-gray-500 text-sm mb-10">
              Complete the form below. Resume must be PDF, DOC, or DOCX (max 5MB).
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className={labelClass} htmlFor="position-select">
                  Position
                </label>
                <select
                  id="position-select"
                  value={selectedJobId}
                  onChange={(e) =>
                    setSelectedJobId(e.target.value ? Number(e.target.value) : '')
                  }
                  required
                  className={`${fieldClass} cursor-pointer bg-gray-50`}
                  style={{
                    borderBottomColor: '#e5e7eb',
                    color: selectedJobId ? '#111827' : '#9ca3af',
                  }}
                  {...borderFocus}
                >
                  <option value="" disabled>
                    {jobs.length ? 'Select an open role' : 'No roles loaded'}
                  </option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} — {j.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass} htmlFor="firstName">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleFormChange}
                    required
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    {...borderFocus}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="lastName">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleFormChange}
                    required
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    {...borderFocus}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    {...borderFocus}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="+91 …"
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    {...borderFocus}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass} htmlFor="experience">
                    Experience (optional)
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleFormChange}
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    {...borderFocus}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="education">
                    Education (optional)
                  </label>
                  <input
                    id="education"
                    name="education"
                    value={form.education}
                    onChange={handleFormChange}
                    className={fieldClass}
                    style={{ borderBottomColor: '#e5e7eb' }}
                    {...borderFocus}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="coverLetter">
                  Cover letter (optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleFormChange}
                  rows={4}
                  className={`${fieldClass} resize-none`}
                  style={{ borderBottomColor: '#e5e7eb' }}
                  {...borderFocus}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="resume">
                  Resume
                </label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  required
                  onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-800 hover:file:bg-primary-100"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <p className="text-[11px] text-gray-400">
                  Questions?{' '}
                  <Link to="/contactus/contactus" className="text-primary-700 hover:underline">
                    Contact us
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || jobs.length === 0}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: '#2e7d32' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    'Submit application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Career;
