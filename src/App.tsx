import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { AboutSection } from './components/home/AboutSection';
import { ExpertiseSection } from './components/home/ExpertiseSection';
import { CourseMarketplace } from './components/home/CourseMarketplace';
import { WhyAiBarta } from './components/home/WhyAiBarta';
import { DarkAiSection } from './components/home/DarkAiSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';
import { CourseDetailsView } from './components/courses/CourseDetailsView';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { StudentDashboardView } from './components/student/StudentDashboardView';
import { CoursePlayerView } from './components/student/CoursePlayerView';
import { ResourcesView } from './components/resources/ResourcesView';
import { BlogView } from './components/blog/BlogView';
import { BlogPostView } from './components/blog/BlogPostView';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Course } from './types';

function MainApp() {
  const { currentUser, language } = useApp();
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentParam, setCurrentParam] = useState<string | undefined>(undefined);

  // Modal States
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');

  // Handle URL hash or direct history navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, currentParam]);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setCurrentParam(param);
  };

  const handleOpenAuth = (initialTab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(initialTab);
    setAuthModalOpen(true);
  };

  const handleEnrollClick = (course: Course) => {
    setEnrollingCourse(course);
  };

  // If in Admin view
  if (currentView === 'admin') {
    if (currentUser?.role !== 'admin') {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl font-bold">
              🛡️
            </div>
            <h2 className="text-xl font-bold text-white">Protected Admin Portal</h2>
            <p className="text-xs text-slate-400">
              This area is restricted to Mahmudul Hasan and designated platform administrators. Please sign in with admin credentials.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleOpenAuth('login')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs"
              >
                Sign In as Admin
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Back to Public Site
              </button>
            </div>
          </div>
          {authModalOpen && (
            <AuthModal
              initialTab={authInitialTab}
              onClose={() => setAuthModalOpen(false)}
              onSuccess={() => {}}
            />
          )}
        </div>
      );
    }

    return <AdminDashboard onBackToHome={() => setCurrentView('home')} />;
  }

  // If in Course Player classroom view
  if (currentView === 'student-player' && currentParam) {
    return (
      <CoursePlayerView
        courseId={currentParam}
        onBack={() => setCurrentView('student-dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <AboutSection onNavigate={handleNavigate} />
            <ExpertiseSection onNavigate={handleNavigate} />
            <CourseMarketplace onNavigate={handleNavigate} onEnroll={handleEnrollClick} />
            <WhyAiBarta onNavigate={handleNavigate} />
            <DarkAiSection onNavigate={handleNavigate} />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
          </>
        )}

        {currentView === 'courses' && (
          <div className="py-6">
            <CourseMarketplace onNavigate={handleNavigate} onEnroll={handleEnrollClick} />
          </div>
        )}

        {currentView === 'course-details' && currentParam && (
          <CourseDetailsView
            courseSlug={currentParam}
            onNavigate={handleNavigate}
            onEnroll={handleEnrollClick}
          />
        )}

        {currentView === 'student-dashboard' && (
          <StudentDashboardView
            onNavigate={handleNavigate}
            onOpenPlayer={(cId) => handleNavigate('student-player', cId)}
          />
        )}

        {currentView === 'resources' && (
          <ResourcesView
            onNavigate={handleNavigate}
            onOpenAuth={() => handleOpenAuth('login')}
          />
        )}

        {currentView === 'blog' && (
          <BlogView onSelectPost={(slug) => handleNavigate('blog-post', slug)} />
        )}

        {currentView === 'blog-post' && currentParam && (
          <BlogPostView slug={currentParam} onBack={() => handleNavigate('blog')} />
        )}

        {currentView === 'about' && (
          <div className="space-y-12 py-6">
            <AboutSection onNavigate={handleNavigate} />
            <ExpertiseSection onNavigate={handleNavigate} />
            <ContactSection />
          </div>
        )}

        {currentView === 'faq' && (
          <div className="py-6 space-y-12">
            <FaqSection />
            <ContactSection />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="py-6">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Checkout Modal */}
      {enrollingCourse && (
        <CheckoutModal
          course={enrollingCourse}
          onClose={() => setEnrollingCourse(null)}
          onOrderSuccess={() => {
            setCurrentView('student-dashboard');
          }}
        />
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          initialTab={authInitialTab}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
