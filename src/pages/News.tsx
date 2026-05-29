import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ExternalLink, FileText, Loader2 } from 'lucide-react';
import SplitReveal from '@/components/SplitReveal';
import Footer from '@/components/Footer';
import { fetchNews, type NewsItem } from '@/api/news';

function formatNewsDate(value: string) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const News = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchNews();
    if (result.ok === false) {
      setError(result.message);
      setItems([]);
    } else {
      setItems(result.items);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <Helmet>
        <title>News | Rashmi 6 Paradigm</title>
        <meta name="description" content="Latest news and updates from Rashmi 6 Paradigm." />
        <link rel="canonical" href="https://rashmi6paradigm.com/news" />
      </Helmet>

      <div className="relative" style={{ overflowX: 'clip' }}>
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-24" style={{ background: '#0a1a0c' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 50% 60%, rgba(46,125,50,0.1) 0%, transparent 65%)',
            }}
          />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <span className="text-white/25 text-[10px] font-mono uppercase tracking-[0.35em] shrink-0">
                Media
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <SplitReveal
              as="h1"
              className="font-serif font-bold text-white leading-[0.93] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 7.5rem)' }}
              mode="chars"
              delay={0.2}
            >
              News &amp; Updates
            </SplitReveal>
            <p
              className="mt-6 text-white/70 max-w-2xl"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
            >
              Stay informed with the latest developments, press releases, and industry insights from
              Rashmi 6 Paradigm.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            {loading && (
              <div className="flex items-center justify-center gap-3 py-20 text-gray-500">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-sm">Loading news…</span>
              </div>
            )}

            {!loading && error && (
              <div className="max-w-lg mx-auto text-center rounded-xl border border-red-100 bg-red-50 px-6 py-10">
                <p className="text-gray-800 text-sm mb-4">{error}</p>
                <button
                  type="button"
                  onClick={load}
                  className="text-sm font-semibold text-primary-800 hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <p className="text-center text-gray-500 py-12">No news articles yet.</p>
            )}

            {!loading && !error && items.length > 0 && (
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {items.map((item) => {
                  const expanded = expandedId === item.id;
                  return (
                    <li
                      key={item.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="aspect-[16/10] bg-gray-100 relative shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm font-mono uppercase tracking-widest"
                            style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}
                          >
                            Rashmi 6 Paradigm
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={12} />
                            {formatNewsDate(item.date)}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-800 font-medium">
                            {item.category}
                          </span>
                        </div>
                        <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
                          {item.title}
                        </h2>
                        {item.excerpt ? (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
                        ) : null}

                        <div className="flex flex-wrap gap-3 mt-auto pt-2">
                          {item.externalUrl && (
                            <a
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
                            >
                              <ExternalLink size={14} />
                              External link
                            </a>
                          )}
                          {item.documentUrl && (
                            <a
                              href={item.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
                            >
                              <FileText size={14} />
                              Document
                            </a>
                          )}
                        </div>

                        {item.content ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setExpandedId(expanded ? null : item.id)}
                              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary-800"
                            >
                              {expanded ? 'Show less' : 'Read full article'}
                              <ChevronDown size={16} className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
                            </button>
                            {expanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 pt-4 border-t border-gray-100"
                              >
                                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-[min(60vh,480px)] overflow-y-auto">
                                  {item.content}
                                </div>
                              </motion.div>
                            )}
                          </>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default News;
