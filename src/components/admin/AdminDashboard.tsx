import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Order, PaymentMethodConfig, ResourceItem, BlogPost, Testimonial, FAQItem, Coupon } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Users,
  Download,
  FileText,
  MessageSquare,
  Sparkles,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  Eye,
  Tag,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Upload,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const {
    currentUser,
    courses,
    orders,
    users,
    resources,
    blogPosts,
    testimonials,
    faqs,
    messages,
    coupons,
    paymentMethods,
    settings,
    approveOrder,
    rejectOrder,
    addCourse,
    updateCourse,
    deleteCourse,
    togglePublishCourse,
    addResource,
    deleteResource,
    addBlogPost,
    deleteBlogPost,
    toggleApproveTestimonial,
    deleteTestimonial,
    addFaq,
    deleteFaq,
    markMessageRead,
    deleteMessage,
    addCoupon,
    deleteCoupon,
    updatePaymentMethod,
    updateSettings,
    exportPlatformData,
    importPlatformData,
    resetToDefaults,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'orders'
    | 'courses'
    | 'students'
    | 'resources'
    | 'blog'
    | 'testimonials'
    | 'faqs'
    | 'messages'
    | 'coupons'
    | 'settings'
  >('overview');

  // Quick stats
  const totalRevenue = orders
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const totalStudents = users.filter((u) => u.role === 'student').length;

  // Course creation modal / form state
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseTitleBn, setNewCourseTitleBn] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Generative AI');
  const [newCourseOriginalPrice, setNewCourseOriginalPrice] = useState(4000);
  const [newCourseDiscountPrice, setNewCourseDiscountPrice] = useState(2500);

  // Settings form states
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [founderName, setFounderName] = useState(settings.founderName);
  const [founderEmail, setFounderEmail] = useState(settings.founderEmail);
  const [founderPhone, setFounderPhone] = useState(settings.founderPhone);
  const [founderBio, setFounderBio] = useState(settings.founderBio);
  const [founderBioBn, setFounderBioBn] = useState(settings.founderBioBn);
  const [heroHeadingBn, setHeroHeadingBn] = useState(settings.heroHeadingBn);
  const [heroSubheadingBn, setHeroSubheadingBn] = useState(settings.heroSubheadingBn);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New resource state
  const [newResTitle, setNewResTitle] = useState('');
  const [newResType, setNewResType] = useState<'pdf' | 'prompt' | 'zip'>('pdf');
  const [newResSize, setNewResSize] = useState('2.5 MB');
  const [newResDesc, setNewResDesc] = useState('');
  const [newResPremium, setNewResPremium] = useState(false);

  // New coupon state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteTitle,
      founderName,
      founderEmail,
      founderPhone,
      founderBio,
      founderBioBn,
      heroHeadingBn,
      heroSubheadingBn,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle) return;

    addCourse({
      slug: newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newCourseTitle,
      titleBn: newCourseTitleBn || newCourseTitle,
      subtitle: 'Comprehensive practical AI training syllabus.',
      subtitleBn: 'বাস্তবমুখী এআই ট্রেনিং কারিকুলাম।',
      description: 'Hands-on project oriented curriculum created by Mahmudul Hasan.',
      descriptionBn: 'মাহমুদুল হাসানের পরিচালনায় প্রজেক্ট ভিত্তিক ট্রেনিং।',
      category: newCourseCategory,
      level: 'All Levels',
      duration: '10 Hours',
      totalLessons: 15,
      originalPrice: Number(newCourseOriginalPrice),
      discountPrice: Number(newCourseDiscountPrice),
      currency: '৳',
      isPublished: true,
      isFeatured: false,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      instructor: {
        name: settings.founderName,
        title: 'Lead Instructor',
        avatar: settings.founderImage,
        bio: settings.founderBio,
      },
      outcomes: ['Understand core AI architectures', 'Deploy production workflows'],
      requirements: ['Basic computer literacy'],
      targetAudience: ['Learners and modern professionals'],
      curriculum: [
        {
          id: `mod-${Date.now()}`,
          title: 'Module 1: Getting Started',
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: 'Introduction & Course Objectives',
              duration: '15 min',
              isFreePreview: true,
              contentNotes: 'Orientation lesson.',
            },
          ],
        },
      ],
      enrolledCount: 0,
      rating: 5.0,
      reviewsCount: 1,
    });

    setNewCourseTitle('');
    setNewCourseTitleBn('');
    setShowAddCourseModal(false);
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle) return;
    addResource({
      title: newResTitle,
      type: newResType,
      fileSize: newResSize,
      fileUrl: '#download',
      description: newResDesc,
      isPremium: newResPremium,
    });
    setNewResTitle('');
    setNewResDesc('');
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.toUpperCase(),
      discountPercent: Number(newCouponPercent),
      validUntil: '2026-12-31',
      maxUsage: 100,
      isActive: true,
    });
    setNewCouponCode('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Admin Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm text-white">AI BARTA 24</span>
                <span className="block text-[10px] text-cyan-400 font-mono">ADMIN WORKSPACE</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Orders & Payments</span>
              </div>
              {pendingOrders.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black">
                  {pendingOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses Management</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Enrolled Students</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Digital Resources</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog Articles</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>FAQ Items</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full p-2.5 rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Contact Messages</span>
              </div>
              {messages.filter((m) => !m.isRead).length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-black">
                  {messages.filter((m) => !m.isRead).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'coupons'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Promo Coupons</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <div className="text-slate-400 truncate">
            Admin: <strong className="text-white">{currentUser?.name}</strong>
          </div>
          <button
            onClick={onBackToHome}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-center cursor-pointer transition-colors"
          >
            ← View Public Site
          </button>
          <button
            onClick={() => {
              logout();
              onBackToHome();
            }}
            className="w-full py-2 text-rose-400 hover:bg-slate-800 rounded-lg text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace Viewport */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
              <p className="text-xs text-slate-400">
                Key performance metrics and manual payment verification queue for AI Barta 24.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Total Revenue (Verified)</span>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                  ৳{totalRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-400">{paidOrders.length} Completed Orders</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Pending Payment Verifications</span>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">
                  {pendingOrders.length}
                </div>
                <span className="text-[11px] text-slate-500">Requires manual TrxID match</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Total Enrolled Students</span>
                <div className="text-2xl font-extrabold text-white font-mono">
                  {totalStudents}
                </div>
                <span className="text-[11px] text-slate-500">Registered student profiles</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Published Courses</span>
                <div className="text-2xl font-extrabold text-blue-400 font-mono">
                  {courses.filter((c) => c.isPublished).length}
                </div>
                <span className="text-[11px] text-slate-500">{courses.length} Total Curriculums</span>
              </div>
            </div>

            {/* Verification Alert Banner if Pending Orders */}
            {pendingOrders.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      You have {pendingOrders.length} pending payment(s) awaiting verification!
                    </h4>
                    <p className="text-[11px] text-amber-300/80">
                      Check your bKash or Nagad statement to confirm TrxIDs and grant course access.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-black font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Review Orders
                </button>
              </div>
            )}

            {/* Recent Orders Preview */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Orders & Verification Actions
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Method & TrxID</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-white block">{ord.studentName}</span>
                          <span className="text-[11px] text-slate-500">{ord.studentEmail}</span>
                        </td>
                        <td className="py-3 px-4 max-w-[180px] truncate">{ord.courseTitle}</td>
                        <td className="py-3 px-4 font-mono font-semibold">৳{ord.amount}</td>
                        <td className="py-3 px-4">
                          <span className="uppercase font-bold text-slate-200">{ord.paymentMethod}</span>
                          <span className="block text-[11px] text-cyan-400 font-mono">{ord.transactionId}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.status === 'paid'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : ord.status === 'pending'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}
                          >
                            {ord.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {ord.status === 'pending' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => approveOrder(ord.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectOrder(ord.id)}
                                className="px-2.5 py-1 bg-rose-900 hover:bg-rose-800 text-rose-200 rounded text-[11px] cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">No actions</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & PAYMENTS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Order & Payment Verification Desk</h1>
                <p className="text-xs text-slate-400">
                  Review student transaction IDs, approve valid payments, or reject mismatched slips.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Student Details</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Method & Sender</th>
                      <th className="py-3 px-4">TrxID</th>
                      <th className="py-3 px-4">Receipt</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Verification Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-white block">{ord.studentName}</span>
                          <span className="text-[11px] text-slate-400">{ord.studentEmail}</span>
                          <span className="text-[11px] text-slate-500 font-mono">{ord.studentPhone}</span>
                        </td>
                        <td className="py-3 px-4 max-w-[180px] truncate">{ord.courseTitle}</td>
                        <td className="py-3 px-4 font-mono font-bold text-white">৳{ord.amount}</td>
                        <td className="py-3 px-4">
                          <span className="uppercase font-bold text-slate-200">{ord.paymentMethod}</span>
                          <span className="block text-[11px] text-slate-400 font-mono">{ord.senderNumber}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-cyan-300 font-bold">
                          {ord.transactionId}
                        </td>
                        <td className="py-3 px-4">
                          {ord.receiptUrl ? (
                            <a
                              href={ord.receiptUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </a>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.status === 'paid'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : ord.status === 'pending'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}
                          >
                            {ord.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {ord.status === 'pending' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => approveOrder(ord.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold cursor-pointer shadow-xs"
                                title="Approve and grant course access"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectOrder(ord.id)}
                                className="px-2.5 py-1 bg-rose-900 hover:bg-rose-800 text-rose-200 rounded text-[11px] cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">
                              {ord.status === 'paid' ? 'Access Granted' : 'Rejected'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COURSES MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Course Curriculum Management</h1>
                <p className="text-xs text-slate-400">
                  Create, edit, toggle publish, and configure syllabus pricing.
                </p>
              </div>

              <button
                onClick={() => setShowAddCourseModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-16/9 bg-slate-950 relative">
                      <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => togglePublishCourse(c.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.isPublished
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {c.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] text-cyan-400 font-mono">{c.category}</span>
                      <h3 className="text-sm font-bold text-white line-clamp-2">{c.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
                      
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
                        <span>Fee: {c.currency}{c.discountPrice}</span>
                        <span className="text-slate-500 line-through">{c.currency}{c.originalPrice}</span>
                        <span className="text-slate-400">{c.totalLessons} Lessons</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                    <button
                      onClick={() => togglePublishCourse(c.id)}
                      className="text-xs text-slate-300 hover:text-white"
                    >
                      {c.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete course ${c.title}?`)) deleteCourse(c.id);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ENROLLED STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Registered Students</h1>
              <p className="text-xs text-slate-400">List of learners and their profile contact info.</p>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-4 font-semibold text-white">{u.name}</td>
                      <td className="py-3 px-4 text-slate-400">{u.email}</td>
                      <td className="py-3 px-4 font-mono text-slate-300">{u.phone || '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.role === 'admin' ? 'bg-blue-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DIGITAL RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Digital Resources & Products</h1>
                <p className="text-xs text-slate-400">Manage downloadable PDFs, prompt templates, and blueprints.</p>
              </div>
            </div>

            {/* Upload / Add Form */}
            <form onSubmit={handleAddResource} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Add New Downloadable Product</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newResTitle}
                    onChange={(e) => setNewResTitle(e.target.value)}
                    placeholder="e.g. Master Prompt Cheat Sheet"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Type</label>
                  <select
                    value={newResType}
                    onChange={(e) => setNewResType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="prompt">Prompt Pack</option>
                    <option value="zip">ZIP File</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">File Size</label>
                  <input
                    type="text"
                    value={newResSize}
                    onChange={(e) => setNewResSize(e.target.value)}
                    placeholder="4.5 MB"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newResPremium}
                    onChange={(e) => setNewResPremium(e.target.checked)}
                  />
                  <span>Require Student Login / Enrollment (Premium Resource)</span>
                </label>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
                >
                  Save Resource
                </button>
              </div>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400">{r.type} · {r.fileSize}</span>
                    <h4 className="text-sm font-bold text-white">{r.title}</h4>
                    <span className="text-xs text-slate-500">{r.downloadCount} Downloads</span>
                  </div>
                  <button
                    onClick={() => deleteResource(r.id)}
                    className="p-2 text-rose-400 hover:bg-slate-800 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BLOG ARTICLES */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">AI Blog Management</h1>
              <p className="text-xs text-slate-400">Publish articles, tutorial essays, and emerging AI analyses.</p>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400">{post.category} · {post.publishedAt}</span>
                    <h4 className="text-sm font-bold text-white">{post.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <button
                    onClick={() => deleteBlogPost(post.id)}
                    className="p-2 text-rose-400 hover:bg-slate-800 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Student Testimonials & Reviews</h1>
              <p className="text-xs text-slate-400">Review, approve or hide authentic feedback.</p>
            </div>

            <div className="space-y-3">
              {testimonials.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{t.studentName}</span>
                      <span className="text-[11px] text-slate-500">({t.courseTitle})</span>
                    </div>
                    <p className="text-xs text-slate-300 italic mt-1">"{t.feedback}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleApproveTestimonial(t.id)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        t.isApproved
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {t.isApproved ? 'Approved' : 'Hidden'}
                    </button>
                    <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Frequently Asked Questions (FAQ)</h1>
              <p className="text-xs text-slate-400">Edit and add questions displayed on the website accordion.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{f.question}</h4>
                    <p className="text-[11px] text-cyan-300 font-bengali">{f.questionBn}</p>
                  </div>
                  <button onClick={() => deleteFaq(f.id)} className="p-2 text-rose-400 hover:bg-slate-800 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Inbound Contact Messages</h1>
              <p className="text-xs text-slate-400">Submitted directly from the public contact form.</p>
            </div>

            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`p-5 rounded-2xl border ${m.isRead ? 'bg-slate-900/60 border-slate-800' : 'bg-blue-950/20 border-cyan-500/40'}`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-sm font-bold text-white">{m.name}</h4>
                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <a href={`mailto:${m.email}`} className="text-cyan-400 hover:underline">{m.email}</a>
                        {m.phone && <span>· {m.phone}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!m.isRead && (
                        <button
                          onClick={() => markMessageRead(m.id)}
                          className="px-2.5 py-1 bg-cyan-900 text-cyan-200 text-xs rounded"
                        >
                          Mark Read
                        </button>
                      )}
                      <button onClick={() => deleteMessage(m.id)} className="p-1.5 text-rose-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="pt-3 text-xs text-slate-300 space-y-1">
                    <strong className="text-white block font-semibold">Subject: {m.subject}</strong>
                    <p className="whitespace-pre-line text-slate-400">{m.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: PROMO COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Discount Coupon Management</h1>
              <p className="text-xs text-slate-400">Generate discount codes for campaigns and early bird batches.</p>
            </div>

            <form onSubmit={handleAddCoupon} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-3 text-xs">
              <input
                type="text"
                required
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                placeholder="COUPON CODE (e.g. FLASH20)"
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white uppercase flex-1"
              />
              <input
                type="number"
                value={newCouponPercent}
                onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                placeholder="% Discount"
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white w-28"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
              >
                Create Coupon
              </button>
            </form>

            <div className="space-y-2">
              {coupons.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-cyan-300 text-sm">{c.code}</span>
                    <span className="text-slate-400 ml-3">
                      {c.discountPercent ? `${c.discountPercent}% Off` : `৳${c.discountAmount} Off`}
                    </span>
                    <span className="text-slate-500 ml-3">Used: {c.usageCount} times</span>
                  </div>
                  <button onClick={() => deleteCoupon(c.id)} className="p-1.5 text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 11: SETTINGS & PAYMENT CONFIGURATION */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Platform & Payment Settings</h1>
              <p className="text-xs text-slate-400">
                Update brand identity, founder biography, mobile banking account numbers, and backup data.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Website settings successfully updated!</span>
              </div>
            )}

            {/* General Site & Founder Info Form */}
            <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Brand & Instructor Info</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">Platform Brand Name</label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Founder / Instructor Name</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">Founder Email (Official)</label>
                  <input
                    type="email"
                    value={founderEmail}
                    onChange={(e) => setFounderEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={founderPhone}
                    onChange={(e) => setFounderPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Founder Biography (English)</label>
                <textarea
                  rows={3}
                  value={founderBio}
                  onChange={(e) => setFounderBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Founder Biography (Bengali)</label>
                <textarea
                  rows={3}
                  value={founderBioBn}
                  onChange={(e) => setFounderBioBn(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none font-bengali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">Hero Heading (Bengali)</label>
                  <input
                    type="text"
                    value={heroHeadingBn}
                    onChange={(e) => setHeroHeadingBn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bengali"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Hero Subheading (Bengali)</label>
                  <input
                    type="text"
                    value={heroSubheadingBn}
                    onChange={(e) => setHeroSubheadingBn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bengali"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </form>

            {/* Mobile Banking Accounts Configuration */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Mobile Banking & Payment Method Numbers
              </h3>
              <p className="text-slate-400">
                These numbers and instructions are shown dynamically on the student checkout screen.
              </p>

              <div className="space-y-4">
                {paymentMethods.map((pm) => (
                  <div key={pm.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{pm.name}</span>
                      <button
                        onClick={() => updatePaymentMethod(pm.id, { isActive: !pm.isActive })}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pm.isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {pm.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Account Number</label>
                        <input
                          type="text"
                          value={pm.accountNumber}
                          onChange={(e) => updatePaymentMethod(pm.id, { accountNumber: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-cyan-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Account Type</label>
                        <select
                          value={pm.accountType}
                          onChange={(e) => updatePaymentMethod(pm.id, { accountType: e.target.value as any })}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-white"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Merchant">Merchant</option>
                          <option value="Agent">Agent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Backup, Export & Reset */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Platform Data Export & Backup
              </h3>
              <p className="text-slate-400">
                Export all your courses, orders, students, and settings as a clean JSON backup file, or reset to factory defaults.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const json = exportPlatformData();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `aibarta24-backup-${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset demo data to initial defaults?')) {
                      resetToDefaults();
                      alert('Platform state reset to initial defaults.');
                    }
                  }}
                  className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-300 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create New Course Curriculum</h3>
            
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Course Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Generative AI Video Production"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Course Title (Bengali)</label>
                <input
                  type="text"
                  value={newCourseTitleBn}
                  onChange={(e) => setNewCourseTitleBn(e.target.value)}
                  placeholder="e.g. জেনারেটিভ এআই ভিডিও প্রোডাকশন"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bengali"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Regular Fee (BDT)</label>
                  <input
                    type="number"
                    value={newCourseOriginalPrice}
                    onChange={(e) => setNewCourseOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Discount Fee (BDT)</label>
                  <input
                    type="number"
                    value={newCourseDiscountPrice}
                    onChange={(e) => setNewCourseDiscountPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
