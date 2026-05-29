import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQSection({ items, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-green-600 mb-3">FAQ</p>
        <h2 className="font-serif font-bold text-gray-900 text-3xl mb-10">{title}</h2>

        <div className="space-y-0 divide-y divide-gray-100 border-t border-gray-100">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left group"
              >
                <span className="font-medium text-gray-900 text-[0.95rem] leading-snug group-hover:text-green-800 transition-colors">
                  {item.question}
                </span>
                <span
                  className="shrink-0 mt-0.5 text-gray-400 group-hover:text-green-700 transition-all duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: '1.3rem', lineHeight: 1 }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed pb-5 pr-8">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
