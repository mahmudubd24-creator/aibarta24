import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, language } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const publishedFaqs = faqs
    .filter((f) => f.isPublished)
    .sort((a, b) => a.order - b.order);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর' : 'Common Inquiries & Clear Answers'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'কোর্স এনরোলমেন্ট, পেমেন্ট ও সাপোর্ট সংক্রান্ত বিস্তারিত তথ্য জানুন।'
              : 'Everything you need to know about enrollment, manual mobile banking payments, and course access.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {publishedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {language === 'bn' ? faq.questionBn : faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400 bg-cyan-950/50' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    <p>{language === 'bn' ? faq.answerBn : faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
