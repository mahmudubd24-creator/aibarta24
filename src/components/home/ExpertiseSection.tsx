import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Sparkles,
  Video,
  PenTool,
  Workflow,
  Cpu,
  Layers,
  Wand2,
} from 'lucide-react';

interface ExpertiseSectionProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onNavigate }) => {
  const { settings, language } = useApp();

  const domainIcons = [
    { icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { icon: Wand2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Video, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { icon: PenTool, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: Workflow, color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { icon: Cpu, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'আমাদের বিশেষত্ব ও দক্ষতা' : 'Core Disciplines'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'bn'
                ? 'এআই প্রযুক্তির প্রতিটি প্রধান শাখায় দক্ষতা অর্জন করুন'
                : 'Master Key Frontiers of Practical AI'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'থিওরির বাইরে গিয়ে আধুনিক কৃত্রিম বুদ্ধিমত্তার বাস্তবমুখী প্রয়োগ ও কর্মপদ্ধতি শিখুন।'
                : 'A curated spectrum of AI competencies designed to future-proof creators, freelancers, and builders.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="self-start md:self-auto text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer pb-1"
          >
            <span>{language === 'bn' ? 'সম্পর্কিত কোর্স দেখুন' : 'Explore Related Courses'}</span>
            <span>→</span>
          </button>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {settings.expertiseCategories.map((category, index) => {
            const iconObj = domainIcons[index % domainIcons.length];
            const Icon = iconObj.icon;

            return (
              <div
                key={index}
                className="group relative p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${iconObj.bg} border border-slate-700/60 flex items-center justify-center ${iconObj.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {category}
                  </h3>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed">
                  {language === 'bn'
                    ? `${category}-এর আধুনিক ফ্রেমওয়ার্ক ও টুলসের বাস্তবমুখী ব্যবহারিক প্রজেক্ট।`
                    : `Practical workflows and deployment patterns for ${category}.`}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>Included in Syllabus</span>
                  <span>View Details →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
