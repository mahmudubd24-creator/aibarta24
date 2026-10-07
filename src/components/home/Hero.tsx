import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Play,
  BrainCircuit,
  Cpu,
  Layers,
} from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { settings, language } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Subtle AI Mesh & Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        
        {/* Subtle SVG Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Unboxed Kicker Metadata */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>{language === 'bn' ? 'এআই এডুকেশন প্ল্যাটফর্ম' : 'Next-Generation AI Education'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{settings.founderName}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              {language === 'bn' ? (
                <>
                  <span className="block text-slate-100">{settings.heroHeadingBn.split('।')[0]}।</span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                    {settings.heroHeadingBn.split('।')[1] ? settings.heroHeadingBn.split('।')[1] + '।' : ''}
                  </span>
                  <span className="block text-slate-200">
                    {settings.heroHeadingBn.split('।')[2] || ''}
                  </span>
                </>
              ) : (
                <>
                  Master Practical AI.{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                    Build Smarter.
                  </span>{' '}
                  Shape Your Future.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {language === 'bn' ? settings.heroSubheadingBn : settings.heroSubheading}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{language === 'bn' ? 'কোর্সসমূহ দেখুন' : 'Explore Courses'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>{language === 'bn' ? 'মাহমুদুল হাসান সম্পর্কে' : 'About Instructor'}</span>
              </button>
            </div>

            {/* Trust Markers - Quiet unboxed editorial format */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{language === 'bn' ? 'ব্যবহারিক বাংলা কারিকুলাম' : 'Practical Bengali Curriculum'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{language === 'bn' ? 'প্রজেক্ট-ভিত্তিক অ্যাসাইনমেন্ট' : 'Real-World Project Based'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{language === 'bn' ? 'লাইফটাইম কোর্স এক্সেস' : 'Lifetime Course Access'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with High-Tech Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Gradient Border Card */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-blue-600/20 to-transparent shadow-2xl shadow-blue-900/20">
                <div className="relative rounded-[14px] bg-slate-900/95 border border-slate-800/90 overflow-hidden">
                  
                  {/* Top Bar of the Interactive Visual Card */}
                  <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 tracking-wider">
                      AI BARTA 24 · LAB
                    </div>
                  </div>

                  {/* Visual Content Canvas */}
                  <div className="p-5 space-y-4">
                    {/* Instructor Portrait & Bio Header */}
                    <div className="flex items-center gap-3.5 pb-3 border-b border-slate-800/80">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0 bg-slate-800">
                        <img
                          src={settings.founderImage}
                          alt={settings.founderName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback container
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white leading-tight">
                          {settings.founderName}
                        </h2>
                        <p className="text-xs text-cyan-400 font-medium">
                          {settings.founderTitle.split('|')[0]?.trim() || 'AI Educator & Trainer'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Founder, AI Barta 24
                        </p>
                      </div>
                    </div>

                    {/* Featured Curriculum Snippet */}
                    <div className="bg-slate-950/70 rounded-xl p-3.5 border border-slate-800/80 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          {language === 'bn' ? 'বর্তমানে রানিং কোর্স:' : 'Featured Flagship Course:'}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400">
                          Module 01 - 04
                        </span>
                      </div>
                      
                      <div className="text-xs font-medium text-slate-300">
                        {language === 'bn'
                          ? 'জেনারেটিভ এআই ও প্রম্পট ইঞ্জিনিয়ারিং মাস্টারক্লাস'
                          : 'Generative AI & Prompt Engineering Masterclass'}
                      </div>

                      {/* Micro Progress Bar */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-3/4 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                        <span>28 Lessons · Hands-on Projects</span>
                        <span className="text-emerald-400 font-medium">Lifetime Access</span>
                      </div>
                    </div>

                    {/* Interactive Workflow Node Snippet */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <BrainCircuit className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-[11px] font-medium text-slate-300">LLM Prompts</div>
                        <div className="text-[9px] text-slate-400">Claude & GPT-4o</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <Layers className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                        <div className="text-[11px] font-medium text-slate-300">AI Media</div>
                        <div className="text-[9px] text-slate-400">Midjourney & Kling</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <Cpu className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                        <div className="text-[11px] font-medium text-slate-300">Automation</div>
                        <div className="text-[9px] text-slate-400">Make & n8n Nodes</div>
                      </div>
                    </div>

                    {/* Quick Preview Action */}
                    <button
                      onClick={() => onNavigate('courses')}
                      className="w-full py-2.5 px-3 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/40 rounded-xl text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-cyan-300 text-cyan-300" />
                      <span>{language === 'bn' ? 'ফ্রি প্রিভিউ লেকচার দেখুন' : 'Watch Free Lesson Preview'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
