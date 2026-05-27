import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { webPageSchema } from '@/lib/schemas';
import { blogPosts } from '@/lib/blogData';
import Footer from '@/components/Footer';

const categoryColors: Record<string, string> = {
  'Market Pricing': 'bg-amber-50 text-amber-700',
  'Government Policy': 'bg-blue-50 text-blue-700',
  'Technical Guide': 'bg-purple-50 text-purple-700',
  'Product Guide': 'bg-teal-50 text-teal-700',
  'Supplier Guide': 'bg-green-50 text-green-700',
};

const Blog = () => {
  const formatted = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="relative bg-white" style={{ overflowX: 'clip' }}>
      <SEO
        title="Blog | Biomass Energy Insights | Rashmi 6 Paradigm"
        description="Expert guides on bio pellets pricing in India, NTPC co-firing requirements, activated carbon for water treatment, and the latest biomass energy industry insights from Eastern India."
        canonical="/blog"
        jsonLd={webPageSchema(
          'Biomass Energy Blog',
          'Expert guides on bio pellets, activated carbon, and biomass energy from Eastern India.',
          'https://rashmi6paradigm.com/blog'
        )}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-green-600 mb-4">
              Insights & Guides
            </p>
            <h1 className="font-serif font-bold text-gray-900 mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              Biomass Energy Intelligence
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              Pricing data, technical guides, government policy updates, and supplier intelligence
              for India's biomass pellets, activated carbon, and biofuel markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group border border-gray-100 rounded-2xl p-7 hover:border-green-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">{post.readTime} read</span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="font-serif font-bold text-gray-900 text-xl leading-snug mb-3 group-hover:text-green-800 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {formatted(post.publishedDate)}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-green-700 text-sm font-semibold hover:text-green-900 transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
