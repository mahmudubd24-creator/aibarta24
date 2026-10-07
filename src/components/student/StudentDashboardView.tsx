import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  PlayCircle,
  Clock,
  Download,
  CreditCard,
  User,
  Settings,
  CheckCircle,
  AlertCircle,
  FileText,
  Sparkles,
} from 'lucide-react';

interface StudentDashboardViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenPlayer: (courseId: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  onNavigate,
  onOpenPlayer,
}) => {
  const {
    currentUser,
    enrollments,
    courses,
    orders,
    resources,
    language,
    updateProfile,
    incrementResourceDownload,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'orders' | 'resources' | 'profile'>('courses');
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileBio, setProfileBio] = useState(currentUser?.bio || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Student specific data
  const studentEnrollments = enrollments.filter(
    (e) => e.studentId === currentUser?.id || e.studentEmail === currentUser?.email
  );

  const studentOrders = orders.filter(
    (o) => o.studentId === currentUser?.id || o.studentEmail === currentUser?.email
  );

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      bio: profileBio,
    });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Welcome Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shrink-0">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-xl font-extrabold text-cyan-300">
                {currentUser?.name?.charAt(0).toUpperCase() || 'S'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'bn' ? 'স্বাগতম' : 'Welcome back'}, {currentUser?.name || 'Student'}
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-blue-950 text-cyan-400 border border-blue-800/60 rounded">
                  {currentUser?.role === 'admin' ? 'Admin Portal' : 'Student'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentUser?.email} · Enrolled in {studentEnrollments.length} Course(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'নতুন কোর্স ব্রাউজ করুন' : 'Browse Courses'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'bn' ? 'আমার কোর্সসমূহ' : 'My Courses'} ({studentEnrollments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{language === 'bn' ? 'পেমেন্ট ও অর্ডার হিস্ট্রি' : 'Order History'} ({studentOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{language === 'bn' ? 'ডিজিটাল রিসোর্স ডাউনলোড' : 'Downloads Library'}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{language === 'bn' ? 'প্রোফাইল সেটিংস' : 'Account Settings'}</span>
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {studentEnrollments.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? 'আপনি এখনো কোনো কোর্সে এনরোল করেননি' : 'No Enrolled Courses Yet'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {language === 'bn'
                    ? 'আমাদের প্রফেশনাল এআই কারিকুলাম দেখুন এবং বিকাশ/নগদে সহজ পেমেন্ট করে আজই শুরু করুন।'
                    : 'Explore our curated masterclasses in Generative AI, Video, and Automation.'}
                </p>
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
                >
                  {language === 'bn' ? 'কোর্স ক্যাটালগ দেখুন' : 'Explore All Courses'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentEnrollments.map((enr) => {
                  const course = courses.find((c) => c.id === enr.courseId);
                  if (!course) return null;

                  return (
                    <div
                      key={enr.id}
                      className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="aspect-16/9 bg-slate-950 relative overflow-hidden">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-cyan-400">
                            {course.category}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-3">
                          <h3 className="text-sm font-bold text-white line-clamp-2">
                            {language === 'bn' ? course.titleBn : course.title}
                          </h3>

                          {/* Progress */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-xs text-slate-400">
                              <span>Course Progress</span>
                              <span className="font-mono text-cyan-300 font-semibold">{enr.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                                style={{ width: `${enr.progress}%` }}
                              />
                            </div>
                            <div className="text-[11px] text-slate-500 flex justify-between">
                              <span>{enr.completedLessons.length} of {course.totalLessons} lessons finished</span>
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Continue Learning CTA */}
                      <div className="p-5 pt-0">
                        <button
                          onClick={() => onOpenPlayer(course.id)}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>{language === 'bn' ? 'পড়া চালিয়ে যান (Continue Learning)' : 'Go to Course Room'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders & Payments */}
        {activeTab === 'orders' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? 'আপনার সকল অর্ডার ও ট্রানজেকশন' : 'Your Payment Records'}
              </h3>
              <span className="text-xs text-slate-400 font-mono">{studentOrders.length} records</span>
            </div>

            {studentOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No orders recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Method / Sender</th>
                      <th className="py-3 px-4">TrxID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {studentOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono font-semibold text-cyan-300">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-4 font-medium text-white max-w-[200px] truncate">
                          {ord.courseTitle}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold">
                          ৳{ord.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="uppercase font-semibold text-slate-200">{ord.paymentMethod}</span>
                          <span className="block text-[11px] text-slate-500 font-mono">{ord.senderNumber}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-300">
                          {ord.transactionId}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {ord.status === 'paid' && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                              Approved
                            </span>
                          )}
                          {ord.status === 'pending' && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-950 text-amber-400 border border-amber-800">
                              Verification Pending
                            </span>
                          )}
                          {ord.status === 'rejected' && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-950 text-rose-400 border border-rose-800">
                              Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Downloads & Digital Resources */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'কোর্সের সংযুক্ত রিসোর্স ও ফাইলসমূহ' : 'Available Downloads & Materials'}
                </h3>
                <p className="text-xs text-slate-400">
                  Cheat sheets, prompt collections, and automation blueprints.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-blue-950 text-cyan-300 rounded border border-blue-800/60">
                        {res.type}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{res.fileSize}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate">{res.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{res.description}</p>
                    <span className="text-[11px] text-slate-500 block">
                      {res.downloadCount} Total Downloads
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      incrementResourceDownload(res.id);
                      alert(`Downloading: ${res.title}`);
                    }}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl transition-colors shrink-0 cursor-pointer"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="max-w-xl rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold text-white">
              {language === 'bn' ? 'ব্যক্তিগত তথ্য আপডেট করুন' : 'Update Profile'}
            </h3>

            {profileSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Profile details updated successfully.</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full px-3.5 py-2.5 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Bio / Goals</label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Brief note on your AI learning interests..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
