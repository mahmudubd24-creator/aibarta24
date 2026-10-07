import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Mail,
  Phone,
  Youtube,
  Facebook,
  Linkedin,
  Send,
  Github,
  MessageCircle,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, language } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {settings.siteTitle || 'AI Barta 24'}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {language === 'bn' ? settings.siteTaglineBn : settings.siteTagline}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-cyan-400 font-medium">Founder & Instructor:</span>
                <span className="text-white font-semibold">{settings.founderName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${settings.founderEmail}`}
                  className="hover:text-cyan-300 transition-colors"
                >
                  {settings.founderEmail}
                </a>
              </div>
              {settings.founderPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{settings.founderPhone}</span>
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinks.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.whatsapp && (
                <a
                  href={settings.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.telegram && (
                <a
                  href={settings.socialLinks.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">
              {language === 'bn' ? 'কুইক লিংকস' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'হোম পেইজ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'সকল কোর্স' : 'All Courses'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'মাহমুদুল হাসান সম্পর্কে' : 'About Instructor'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'ডিজিটাল রিসোর্স ও প্রম্পট' : 'Digital Resources'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'এআই ব্লগ ও আর্টিকোল' : 'Blog & Insights'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Student Learning Portal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">
              {language === 'bn' ? 'লার্নিং পোর্টাল' : 'Learning Portal'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('student-dashboard')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'স্টুডেন্ট ড্যাশবোর্ড' : 'Student Dashboard'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'পেমেন্ট ভেরিফিকেশন ও হেল্প' : 'Payment Verification Help'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {language === 'bn' ? 'এডমিন পোর্টাল' : 'Admin Portal'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Payment Methods Supported */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">
              {language === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Methods'}
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              {language === 'bn'
                ? 'বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফারের মাধ্যমে সহজেই কোর্স ফি পরিশোধ করা যায়।'
                : 'Manual & Instant verification supported via bKash, Nagad, Rocket, and Bank Transfer.'}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-pink-400 font-semibold">bKash</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-orange-400 font-semibold">Nagad</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-purple-400 font-semibold">Rocket</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-cyan-400 font-semibold">Bank</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-medium">AI Barta 24</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Founded by <strong className="text-slate-300">Mahmudul Hasan</strong></span>
            <span>·</span>
            <span>Empowering Bengali AI Learners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
