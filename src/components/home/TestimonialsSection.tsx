import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquareQuote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, language } = useApp();

  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  if (approvedTestimonials.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <MessageSquareQuote className="w-4 h-4" />
            <span>{language === 'bn' ? 'শিক্ষার্থীদের অভিজ্ঞতা' : 'Student Experiences'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'বাস্তব অভিজ্ঞতা ও ফিডব্যাক' : 'Verified Learner Reviews'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'আমাদের কোর্সে অংশগ্রহণকারী শিক্ষার্থীদের বাস্তব অভিজ্ঞতা এবং তাদের অর্জিত ফলাফল।'
              : 'Authentic reviews and workflow milestones shared by members of our learning cohort.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{language === 'bn' ? t.feedbackBn : t.feedback}"
                </p>
              </div>

              {/* Student Identity */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.studentAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'}
                  alt={t.studentName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">{t.studentName}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{t.studentRole}</p>
                  <p className="text-[10px] text-cyan-400 truncate font-medium">{t.courseTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
