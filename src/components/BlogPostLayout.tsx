import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

interface BlogPostLayoutProps {
  title: string;
  description: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  children: React.ReactNode;
}

export function BlogPostLayout({
  title,
  description,
  publishedDate,
  updatedDate,
  readTime,
  category,
  tags,
  children,
}: BlogPostLayoutProps) {
  const formatted = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="relative bg-white" style={{ overflowX: 'clip' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 bg-gradient-to-b from-green-50 to-white px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <Link
              to="/blog"
              className="text-[11px] font-mono uppercase tracking-[0.25em] text-green-700 hover:text-green-900 transition-colors"
            >
              ← Blog
            </Link>
            <span className="text-gray-200">|</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400">
              {category}
            </span>
          </div>

          <h1 className="font-serif font-bold text-gray-900 leading-tight mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}>
            {title}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-8">{description}</p>

          <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-400 font-mono border-t border-gray-100 pt-5">
            <span>Published {formatted(publishedDate)}</span>
            {updatedDate !== publishedDate && (
              <span>· Updated {formatted(updatedDate)}</span>
            )}
            <span>· {readTime} read</span>
            <span className="ml-auto hidden sm:block">
              Rashmi 6 Paradigm Limited
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-gray prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
            prose-li:text-gray-600
            prose-strong:text-gray-800
            prose-table:text-sm
            prose-th:bg-green-50 prose-th:text-green-900 prose-th:font-semibold
            prose-td:border prose-td:border-gray-200 prose-td:p-3
            prose-th:border prose-th:border-green-200 prose-th:p-3">
            {children}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] bg-green-50 text-green-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-green-900 to-green-800 text-white">
            <h3 className="font-serif text-xl font-bold mb-3">
              Get a Quote from Rashmi 6 Paradigm
            </h3>
            <p className="text-green-200 text-sm mb-5 leading-relaxed">
              We supply bio pellets, activated carbon, and charcoal briquettes from our facility in
              Kharagpur, West Bengal. Fast response, bulk pricing, and pan-India delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-green-900 text-sm font-semibold hover:bg-green-50 transition-colors"
              >
                Request a Quote →
              </Link>
              <Link
                to="/products/bio-pellets"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-600 text-white text-sm font-semibold hover:bg-green-800 transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
