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
import { VideoLibrarySection } from './components/videos/VideoLibrarySection';
import { VideosView } from './components/videos/VideosView';
import { CourseDetailsView } from './components/courses/CourseDetailsView';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { StudentDashboardView } from './components/student/StudentDashboardView';
import { CoursePlayerView } from './components/student/CoursePlayerView';
import { ResourcesView } from './components/resources/ResourcesView';
import { BlogView } from './components/blog/BlogView';
import { BlogPostView } from './components/blog/BlogPostView';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminSetupPage } from './components/admin/AdminSetupPage';
import { getActiveAdminSession } from './services/authCrypto';
import { Course } from './types';

function parseUrlRoute(): { view: string; param?: string } {
  const path = window.location.pathname.toLowerCase();
  if (path === '/admin/login' || path === '/admin/login/') {
    return { view: 'admin-login' };
  }
  if (path === '/admin/setup' || path === '/admin/setup/') {
    return { view: 'admin-setup' };
  }
  if (path === '/admin' || path === '/admin/') {
    return getActiveAdminSession() ? { view: 'admin' } : { view: 'admin-login' };
  }
  if (path === '/courses' || path === '/courses/') {
    return { view: 'courses' };
  }
  if (path === '/videos' || path === '/videos/') {
    return { view: 'videos' };
  }
  if (path === '/resources' || path === '/resources/') {
    return { view: 'resources' };
  }
  if (path === '/blog' || path === '/blog/') {
    return { view: 'blog' };
  }
  if (path === '/about' || path === '/about/') {
    return { view: 'about' };
  }
  if (path === '/faq' || path === '/faq/') {
    return { view: 'faq' };
  }
  if (path === '/contact' || path === '/contact/') {
    return { view: 'contact' };
  }
  return { view: 'home' };
}

function MainApp() {
  const { currentUser, language, refreshAdminSessionUser } = useApp();
  
  // Initialize view from URL
  const [currentView, setCurrentView] = useState<string>(() => parseUrlRoute().view);
  const [currentParam, setCurrentParam] = useState<string | undefined>(() => parseUrlRoute().param);

  // Modal States
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');

  // Handle URL popstate & scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, currentParam]);

  useEffect(() => {
    const onPopState = () => {
      const parsed = parseUrlRoute();
      setCurrentView(parsed.view);
      setCurrentParam(parsed.param);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    // Protected admin route verification
    if (view === 'admin') {
      const session = getActiveAdminSession();
      if (!session) {
        setCurrentView('admin-login');
        setCurrentParam(undefined);
        if (window.location.pathname !== '/admin/login') {
          window.history.pushState({}, '', '/admin/login');
        }
        return;
      }
    }

    setCurrentView(view);
    setCurrentParam(param);

    // Sync clean browser URL
    let newPath = '/';
    if (view === 'admin') newPath = '/admin';
    else if (view === 'admin-login') newPath = '/admin/login';
    else if (view === 'admin-setup') newPath = '/admin/setup';
    else if (view === 'courses') newPath = '/courses';
    else if (view === 'videos') newPath = '/videos';
    else if (view === 'resources') newPath = '/resources';
    else if (view === 'blog') newPath = '/blog';
    else if (view === 'about') newPath = '/about';
    else if (view === 'faq') newPath = '/faq';
    else if (view === 'contact') newPath = '/contact';

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  const handleOpenAuth = (initialTab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(initialTab);
    setAuthModalOpen(true);
  };

  const handleEnrollClick = (course: Course) => {
    setEnrollingCourse(course);
  };

  // 1. Dedicated Protected Admin Setup Route
  if (currentView === 'admin-setup') {
    return (
      <AdminSetupPage
        onSuccess={() => {
          refreshAdminSessionUser();
          handleNavigate('admin');
        }}
        onNavigateToLogin={() => handleNavigate('admin-login')}
        onBackToHome={() => handleNavigate('home')}
      />
    );
  }

  // 2. Dedicated Protected Admin Login Route
  if (currentView === 'admin-login') {
    return (
      <AdminLoginPage
        onSuccess={() => {
          refreshAdminSessionUser();
          handleNavigate('admin');
        }}
        onNavigateToSetup={() => handleNavigate('admin-setup')}
        onBackToHome={() => handleNavigate('home')}
      />
    );
  }

  // 3. Protected Admin Dashboard View
  if (currentView === 'admin') {
    const session = getActiveAdminSession();
    if (!session) {
      return (
        <AdminLoginPage
          onSuccess={() => {
            refreshAdminSessionUser();
            handleNavigate('admin');
          }}
          onNavigateToSetup={() => handleNavigate('admin-setup')}
          onBackToHome={() => handleNavigate('home')}
        />
      );
    }

    return <AdminDashboard onBackToHome={() => handleNavigate('home')} />;
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
            <VideoLibrarySection onNavigate={handleNavigate} />
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

        {currentView === 'videos' && (
          <VideosView onBackToHome={() => setCurrentView('home')} />
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
