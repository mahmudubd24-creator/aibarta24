import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Terminal,
  Cpu,
  Copy,
  Check,
  Play,
  ArrowRight,
} from 'lucide-react';

interface DarkAiSectionProps {
  onNavigate: (view: string, param?: string) => void;
}

export const DarkAiSection: React.FC<DarkAiSectionProps> = ({ onNavigate }) => {
  const { settings, language } = useApp();
  const [activeTab, setActiveTab] = useState<'prompt' | 'automation' | 'video'>('prompt');
  const [copied, setCopied] = useState(false);

  const workflows = {
    prompt: {
      title: 'Systemic Prompt Architecture (CREATE Framework)',
      description: 'Used in Module 2 of Generative AI Masterclass to generate high-converting commercial copy.',
      inputRole: 'Elite Brand Strategist & Technology Copywriter',
      inputContext: 'Launching AI Barta 24 online course platform for Bengali-speaking digital creators.',
      outputSnippet: `1. Value Proposition: "AI শেখার নতুন দিগন্ত — আন্তর্জাতিক মানের বাস্তবসম্মত প্রজেক্ট এবার সহজ বাংলায়।"
2. Target Pain Point: "কোডিং ছাড়া চ্যাটজিপিটি, ক্লড ও মিডজার্নির আসল ক্ষমতা ব্যবহার করতে পারছেন না?"
3. Concrete Deliverables: 
   - 28+ Hands-on Production Workflows
   - Downloadable Prompt Blueprint Library
   - Step-by-Step Personal Automation Nodes`,
    },
    automation: {
      title: 'Autonomous Content Research & Telegram Dispatcher',
      description: 'Built with Make.com / n8n in the No-Code AI Automation curriculum.',
      inputRole: 'Autonomous Webhook Trigger',
      inputContext: 'Monitors arXiv AI research -> Filters relevant breakthroughs -> Summarizes into 3 takeaways.',
      outputSnippet: `[Trigger: Daily 08:00 AM UTC]
├─ 1. Fetch Latest Generative AI papers via API
├─ 2. Pass JSON payload to Claude 3.5 Sonnet
│  └─ Generate 2-sentence summary in Bengali & English
├─ 3. Append row to Google Sheets database
└─ 4. Dispatch Instant Push Notification to Student Telegram Channel
[Status: Success | Execution Latency: 1.4s]`,
    },
    video: {
      title: 'Cinematic AI Video Motion Prompt (Runway Gen-3)',
      description: 'Curated camera parameter conditioning taught in the AI Video & Storytelling course.',
      inputRole: 'Cinematographer & Camera Director Prompt',
      inputContext: 'Hyper-realistic commercial studio ad with dramatic lighting and fluid physics.',
      outputSnippet: `Prompt:
"Cinematic 35mm wide-angle tracking shot moving forward into a sleek neon-lit creative workstation in Dhaka at dusk. Mahmudul Hasan working on dual holographic screens showing neural networks. Volumetric electric cyan fog, gentle lens flare, anamorphic bokeh, photorealistic 8k, seamless fluid 24fps motion."
Camera trajectory: Forward dolly zoom, 0.4 motion brush intensity on screen glow.`,
    }
  };

  const currentWf = workflows[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentWf.outputSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#070b19] relative overflow-hidden border-t border-b border-cyan-900/30">
      
      {/* Visual Ambient AI Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>{language === 'bn' ? 'বাস্তব কর্মপদ্ধতি' : 'Interactive Lab Simulation'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {language === 'bn' ? settings.darkAiSectionHeadingBn : settings.darkAiSectionHeading}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {language === 'bn' ? settings.darkAiSectionTextBn : settings.darkAiSectionText}
          </p>
        </div>

        {/* Interactive Lab Showcase Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden">
          
          {/* Top Bar with Mode Tabs */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                AI BARTA 24 // WORKFLOW_STUDIO
              </span>
            </div>

            {/* Segmented Controls for Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'prompt'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Prompt Engineering
              </button>
              <button
                onClick={() => setActiveTab('automation')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'automation'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Automation Flow
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Video Camera
              </button>
            </div>
          </div>

          {/* Terminal / Code / Output View */}
          <div className="p-6 space-y-6">
            
            {/* Context & Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{currentWf.title}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{currentWf.description}</p>
              </div>

              <button
                onClick={handleCopy}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Output'}</span>
              </button>
            </div>

            {/* Input Spec */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-cyan-400 uppercase tracking-wider block">Target Role</span>
                <p className="text-slate-200">{currentWf.inputRole}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-indigo-400 uppercase tracking-wider block">Context & Objective</span>
                <p className="text-slate-200">{currentWf.inputContext}</p>
              </div>
            </div>

            {/* Generated Execution Result */}
            <div className="relative rounded-xl bg-[#030612] border border-cyan-950 p-4 font-mono text-xs leading-relaxed text-cyan-200/90 overflow-x-auto shadow-inner">
              <pre className="whitespace-pre-wrap">{currentWf.outputSnippet}</pre>
            </div>

            {/* CTA to Learn in Courses */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>
                  {language === 'bn'
                    ? 'কোর্সে এই ধরণের ২০+ রিয়েল-ওয়ার্ল্ড প্রজেক্ট হাতে-কলমে শেখানো হয়।'
                    : 'Over 20+ real-world production templates included in all full courses.'}
                </span>
              </div>

              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'bn' ? 'এই দক্ষতাগুলো শিখুন' : 'Master These Workflows'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
