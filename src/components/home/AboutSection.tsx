import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  Code2,
} from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { settings, language } = useApp();

  return (
    <section id="about" className="py-20 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <GraduationCap className="w-4 h-4" />
            <span>{language === 'bn' ? 'ইনস্ট্রাক্টর পরিচিতি' : 'Founder & Lead Educator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {settings.founderName}
          </h2>
          <p className="text-sm sm:text-base text-cyan-300 font-medium">
            {settings.founderTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait & Identity Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                
                {/* Image Frame */}
                <div className="aspect-4/3 sm:aspect-square relative overflow-hidden bg-slate-950">
                  <img
                    src={settings.founderImage}
                    alt={settings.founderName}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Identity Bar */}
                <div className="p-6 space-y-3 bg-slate-950/90 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{settings.founderName}</h3>
                      <p className="text-xs text-slate-400">Founder of AI Barta 24</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-slate-400">Primary Contact:</span>
                    <a
                      href={`mailto:${settings.founderEmail}`}
                      className="text-cyan-300 hover:underline font-mono text-[11px]"
                    >
                      {settings.founderEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio, Mission, Vision and Teaching Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'bn'
                  ? 'বাস্তবমুখী এআই জ্ঞান সবার জন্য সহজলভ্য করাই আমার লক্ষ্য'
                  : 'Bridging the AI Divide with Practical, Production-Grade Skills'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'bn' ? settings.founderBioBn : settings.founderBio}
              </p>
            </div>

            {/* Mission & Vision Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-900/30 border border-blue-700/40 flex items-center justify-center text-blue-400">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'আমাদের মিশন (Mission)' : 'The Mission'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'bn'
                    ? 'জটিল এআই প্রযুক্তিকে সহজ ভাষায় ভেঙে উপস্থাপন করা যাতে শিক্ষার্থী ও পেশাজীবীরা সরাসরি নিজ ক্যারিয়ার ও কাজে প্রয়োগ করতে পারেন।'
                    : 'Demystifying complex artificial intelligence paradigms into digestible, project-based workflows that empower independent creators.'}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-900/30 border border-cyan-700/40 flex items-center justify-center text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'আমাদের ভিশন (Vision)' : 'The Vision'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'bn'
                    ? 'একটি বিশ্বমানের এআই লার্নিং ইকোসিস্টেম গড়ে তোলা যা বাংলাভাষী সমাজকে চতুর্থ শিল্প বিপ্লবের নেতৃত্বে নিয়ে যাবে।'
                    : 'To build a premier AI learning ecosystem where Bengali learners confidently stand at the forefront of the global AI transformation.'}
                </p>
              </div>
            </div>

            {/* Teaching Philosophy Points */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'bn' ? 'আমাদের শিক্ষাদান পদ্ধতি' : 'Educational Philosophy'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">No Fluff or Overhype:</strong>
                    <span className="text-slate-400">Focus on real tools and reproducible pipelines rather than vanity buzzwords.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Continuous Evolution:</strong>
                    <span className="text-slate-400">AI changes weekly; course modules receive regular updates and live walkthroughs.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'bn' ? 'যোগাযোগ করুন' : 'Get in Touch'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('courses')}
                className="px-5 py-2.5 text-xs font-semibold text-cyan-300 hover:text-white bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/50 rounded-lg transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? 'সকল কোর্স দেখুন' : 'View All Courses'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
