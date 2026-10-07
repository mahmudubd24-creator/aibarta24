import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Menu,
  X,
  User as UserIcon,
  BookOpen,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Globe,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAuth }) => {
  const { currentUser, logout, language, setLanguage, switchDemoUser, settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'courses', labelEn: 'Courses', labelBn: 'কোর্সসমূহ' },
    { id: 'about', labelEn: 'About Instructor', labelBn: 'মাহমুদুল হাসান' },
    { id: 'resources', labelEn: 'Resources', labelBn: 'রিসোর্স' },
    { id: 'blog', labelEn: 'Blog', labelBn: 'ব্লগ' },
    { id: 'faq', labelEn: 'FAQ', labelBn: 'সাধারণ জিজ্ঞাসা' },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Quick Demo Switcher Bar */}
      <aside aria-label="Demo role selector" className="bg-slate-900/90 border-b border-slate-800 text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">
              {language === 'bn' ? 'এআই বার্তা ২৪ লার্নিং প্ল্যাটফর্ম' : 'AI Barta 24 Education Platform'}
            </span>
            <span className="hidden sm:inline text-slate-400">· Mahmudul Hasan</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden md:inline">
              {language === 'bn' ? 'টেস্ট মোড:' : 'Switch Demo View:'}
            </span>
            <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-md border border-slate-700/60">
              <button
                onClick={() => switchDemoUser('admin')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                  currentUser?.role === 'admin'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin (এডমিন)
              </button>
              <button
                onClick={() => switchDemoUser('student')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                  currentUser?.role === 'student'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Student (শিক্ষার্থী)
              </button>
              <button
                onClick={() => switchDemoUser('guest')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                  !currentUser ? 'bg-slate-700 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Guest (ভিজিটর)
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single Text Element Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-500/30 transition-all">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  {settings.siteTitle || 'AI Barta 24'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Text Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
                    isActive ? 'text-cyan-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {language === 'bn' ? link.labelBn : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions & User Profile */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium max-w-[100px] truncate hidden sm:inline">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">
                        {language === 'bn' ? 'সাইন ইন করেছেন:' : 'Signed in as'}
                      </p>
                      <p className="text-sm font-semibold text-slate-200 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-cyan-300 hover:bg-slate-800 flex items-center gap-2 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span>{language === 'bn' ? 'এডমিন ড্যাশবোর্ড' : 'Admin Panel'}</span>
                      </button>
                    ) : null}

                    <button
                      onClick={() => {
                        onNavigate('student-dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-400" />
                      <span>{language === 'bn' ? 'স্টুডেন্ট ড্যাশবোর্ড' : 'Student Portal'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('courses');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>{language === 'bn' ? 'আমার কোর্সসমূহ' : 'Browse Courses'}</span>
                    </button>

                    <div className="my-1 border-t border-slate-800"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        onNavigate('home');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>{language === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লগইন' : 'Sign In'}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg shadow-md shadow-blue-600/20 hover:shadow-cyan-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              {language === 'bn' ? 'কোর্স দেখুন' : 'Explore Courses'}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 text-sm rounded-lg font-medium ${
                    currentView === link.id
                      ? 'bg-blue-900/40 text-cyan-300 border border-blue-800/60'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {language === 'bn' ? link.labelBn : link.labelEn}
                </button>
              ))}

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-left px-3 py-2 text-sm rounded-lg font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/40"
                >
                  {language === 'bn' ? '🛡️ এডমিন প্যানেল' : '🛡️ Admin Panel'}
                </button>
              )}

              {currentUser && (
                <button
                  onClick={() => handleNavClick('student-dashboard')}
                  className="text-left px-3 py-2 text-sm rounded-lg font-medium text-blue-300 bg-blue-950/40 border border-blue-800/40"
                >
                  {language === 'bn' ? '🎓 স্টুডেন্ট ড্যাশবোর্ড' : '🎓 Student Portal'}
                </button>
              )}

              {!currentUser && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="text-left px-3 py-2 text-sm rounded-lg font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'bn' ? 'স্টুডেন্ট লগইন / রেজিস্টার' : 'Student Login / Register'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
