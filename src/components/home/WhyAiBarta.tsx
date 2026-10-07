import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Zap,
  FolderGit2,
  Users2,
  HelpCircle,
  Laptop2,
  TrendingUp,
  Compass,
} from 'lucide-react';

interface WhyAiBartaProps {
  onNavigate: (view: string, param?: string) => void;
}

export const WhyAiBarta: React.FC<WhyAiBartaProps> = ({ onNavigate }) => {
  const { language } = useApp();

  const features = [
    {
      icon: Zap,
      titleEn: 'Practical AI, Zero Fluff',
      titleBn: 'ব্যবহারিক প্রয়োগমুখী শিখন',
      descEn: 'We skip theoretical lectures to focus immediately on tools you can deploy today in freelancing, marketing, and business.',
      descBn: 'অপ্রয়োজনীয় জটিল থিওরির বদলে সরাসরি কর্মক্ষেত্রে ব্যবহারের উপযোগী টুলস এবং টেকনিক হাতে-কলমে শেখানো হয়।'
    },
    {
      icon: FolderGit2,
      titleEn: 'Real-World Project Portfolios',
      titleBn: 'বাস্তব প্রজেক্ট-ভিত্তিক পোর্টফোলিও',
      descEn: 'Build actual content automation engines, custom trained GPTs, and cinematic commercial reels during your coursework.',
      descBn: 'কোর্স চলাকালীন স্বয়ংক্রিয় কনটেন্ট পাইপলাইন, কাস্টম জিপিটি এবং পোর্টফোলিও প্রজেক্ট তৈরি করতে পারবেন।'
    },
    {
      icon: Laptop2,
      titleEn: 'Bengali & English Synthesis',
      titleBn: 'সহজ বাংলা ভাষায় ব্যাখ্যা',
      descEn: 'Complex prompt architectures and neural workflows demystified in clear, fluent Bengali without sacrificing global standards.',
      descBn: 'আন্তর্জাতিক মানের আধুনিক প্রযুক্তি অত্যন্ত সহজ ও সাবলীল বাংলা ভাষায় উপস্থাপন করা হয়েছে।'
    },
    {
      icon: Users2,
      titleEn: 'Community & Peer Feedback',
      titleBn: 'অ্যাক্টিভ লার্নার কমিউনিটি',
      descEn: 'Join hundreds of proactive Bangladeshi learners sharing prompts, critique, tool updates, and freelance collaboration.',
      descBn: 'সহপাঠী শিক্ষার্থীদের সাথে আইডিয়া শেয়ারিং, অ্যাসাইনমেন্ট ফিডব্যাক এবং টিম কোলাবোরেশনের সুযোগ।'
    },
    {
      icon: HelpCircle,
      titleEn: 'Direct Instructor Q&A Support',
      titleBn: 'ইনস্ট্রাক্টরের প্রত্যক্ষ সাপোর্ট',
      descEn: 'Weekly live troubleshooting sessions where Mahmudul Hasan personally answers student roadblocks.',
      descBn: 'প্রতি সপ্তাহে লাইভ প্রশ্নোত্তর সেশনে মাহমুদুল হাসান সরাসরি শিক্ষার্থীদের বিভিন্ন সমস্যার সমাধান প্রদান করেন।'
    },
    {
      icon: TrendingUp,
      titleEn: 'Lifetime Access & Free Updates',
      titleBn: 'লাইফটাইম এক্সেস ও নিয়মিত আপডেট',
      descEn: 'As foundational AI models evolve, our curriculum is updated. You never have to pay twice for version refreshes.',
      descBn: 'নতুন এআই মডেল রিলিজের সাথে সাথে কারিকুলাম আপডেট করা হয় এবং আপনার একবারের এনরোলমেন্টেই আজীবন এক্সেস থাকবে।'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>{language === 'bn' ? 'কেন AI Barta 24?' : 'Why Learn with Us'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'bn'
              ? 'ভবিষ্যতের দক্ষতায় একধাপ এগিয়ে থাকার আত্মবিশ্বাস'
              : 'Designed for Real Execution, Not Academic Theory'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'AI Barta 24 এমন একটি প্ল্যাটফর্ম যা আপনাকে কৃত্রিম বুদ্ধিমত্তার দ্রুত পরিবর্তনশীল যুগে সবসময় আপডেট ও দক্ষ রাখবে।'
              : 'Built specifically for curious Bengali creators, freelancers, and innovators who want real output.'}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200 space-y-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'bn' ? item.descBn : item.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick CTA strip */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-cyan-950/30 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Sparkles className="w-6 h-6 text-cyan-400 shrink-0 hidden sm:block" />
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? 'আজই আপনার এআই যাত্রা শুরু করুন' : 'Ready to Transform Your Workflow?'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'বিকাশ অথবা নগদে সহজে পেমেন্ট করে তাৎক্ষণিক এনরোল করুন।'
                  : 'Enroll easily via bKash, Nagad, or Bank Transfer and start learning today.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-md shadow-blue-600/20"
          >
            {language === 'bn' ? 'সকল কোর্স দেখুন' : 'Explore Courses'}
          </button>
        </div>
      </div>
    </section>
  );
};
