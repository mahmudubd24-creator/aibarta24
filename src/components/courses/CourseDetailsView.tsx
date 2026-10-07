import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Lesson } from '../../types';
import {
  Clock,
  PlayCircle,
  CheckCircle,
  HelpCircle,
  Users,
  Award,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
} from 'lucide-react';

interface CourseDetailsViewProps {
  courseSlug: string;
  onNavigate: (view: string, param?: string) => void;
  onEnroll: (course: Course) => void;
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({
  courseSlug,
  onNavigate,
  onEnroll,
}) => {
  const { getCourseBySlug, language, isCourseEnrolled } = useApp();
  const [activePreviewLesson, setActivePreviewLesson] = useState<Lesson | null>(null);
  const [openModuleIds, setOpenModuleIds] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-v1': true,
    'mod-a1': true,
  });

  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-2">কোর্সটি খুঁজে পাওয়া যায়নি (Course Not Found)</h2>
        <p className="text-sm text-slate-400 mb-6">The requested course could not be located.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          View All Courses
        </button>
      </div>
    );
  }

  const isEnrolled = isCourseEnrolled(course.id);
  const discountPercent = Math.round(
    ((course.originalPrice - course.discountPrice) / course.originalPrice) * 100
  );

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('courses')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'সকল কোর্সে ফিরে যান' : 'Back to All Courses'}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Left Content: 8 cols */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header Block */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium">
                <span>{course.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{course.level}</span>
                {course.badge && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-emerald-400 font-semibold">{course.badge}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {language === 'bn' ? course.titleBn : course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {language === 'bn' ? course.subtitleBn : course.subtitle}
              </p>

              {/* Instructor Mini Badge */}
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="font-semibold text-white">{course.instructor.name}</div>
                  <div className="text-[11px] text-slate-400">{course.instructor.title}</div>
                </div>
              </div>
            </div>

            {/* Course Overview / Description */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white">
                {language === 'bn' ? 'কোর্স বিবরণ (Course Description)' : 'Course Overview'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'bn' ? course.descriptionBn : course.description}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>{language === 'bn' ? 'এই কোর্স থেকে আপনি কী কী শিখবেন' : 'What You Will Master'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {language === 'bn' ? 'কোর্স কারিকুলাম ও লেকচার' : 'Detailed Curriculum'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {course.curriculum.length} Modules · {course.totalLessons} Lessons · {course.duration}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((module) => {
                  const isOpen = openModuleIds[module.id] ?? true;
                  return (
                    <div
                      key={module.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-850 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {module.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span>{module.lessons.length} Lessons</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-slate-800/60 bg-slate-950/60">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-3.5 px-4 flex items-center justify-between gap-4 text-xs hover:bg-slate-900/40 transition-colors"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <PlayCircle className="w-4 h-4 text-slate-500 shrink-0" />
                                <span className="text-slate-200 truncate font-medium">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-slate-500 font-mono text-[11px]">{lesson.duration}</span>

                                {lesson.isFreePreview ? (
                                  <button
                                    onClick={() => setActivePreviewLesson(lesson)}
                                    className="px-2.5 py-1 bg-cyan-950 border border-cyan-800/60 text-cyan-300 rounded text-[11px] font-semibold hover:bg-cyan-900 transition-colors cursor-pointer"
                                  >
                                    Preview
                                  </button>
                                ) : (
                                  <span className="text-[11px] text-slate-600">Locked</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target Audience & Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'bn' ? 'কোর্সটি যাদের জন্য' : 'Who Should Take This'}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {course.targetAudience.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400">·</span>
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span>{language === 'bn' ? 'পূর্বশর্ত (Requirements)' : 'Course Requirements'}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400">·</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Course Specific FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? 'কোর্স সম্পর্কিত প্রশ্নাবলী' : 'Course FAQs'}
                </h3>
                <div className="space-y-2">
                  {course.faqs.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-1.5">
                      <strong className="text-white block font-semibold">{f.question}</strong>
                      <p className="text-slate-300 leading-relaxed">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Sidebar: Enrollment & Pricing Card: 4 cols */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden space-y-6 p-6">
              
              {/* Media Thumbnail */}
              <div className="aspect-16/9 rounded-xl overflow-hidden relative bg-slate-950 border border-slate-800">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                
                {/* Watch Intro Button */}
                <button
                  onClick={() => {
                    const firstPreview = course.curriculum[0]?.lessons[0];
                    if (firstPreview) setActivePreviewLesson(firstPreview);
                  }}
                  className="absolute inset-0 flex items-center justify-center gap-2 text-white bg-slate-950/40 hover:bg-slate-950/60 transition-colors cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-600/90 group-hover:scale-110 flex items-center justify-center transition-transform shadow-lg shadow-blue-500/30">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>

              {/* Price Calculation Box */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-extrabold text-white">
                    {course.currency}{course.discountPrice.toLocaleString()}
                  </span>
                  {course.originalPrice > course.discountPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {course.currency}{course.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950 border border-emerald-800 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'এককালীন পেমেন্ট · আজীবন এক্সেস' : 'One-time payment · Lifetime access'}
                </p>
              </div>

              {/* Primary Enrollment / Player Action */}
              {isEnrolled ? (
                <div className="space-y-2">
                  <button
                    onClick={() => onNavigate('student-player', course.id)}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{language === 'bn' ? 'ক্লাস শুরু করুন (Continue Learning)' : 'Go to Course Player'}</span>
                  </button>
                  <p className="text-[11px] text-center text-emerald-400 font-medium">
                    ✓ You are enrolled in this course
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => onEnroll(course)}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'এখনই এনরোল করুন' : 'Enroll in Masterclass'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[11px] text-center text-slate-400">
                    {language === 'bn'
                      ? 'বিকাশ, নগদ, রকেট অথবা ব্যাংকের মাধ্যমে ম্যানুয়াল পেমেন্ট অনুমোদিত।'
                      : 'Pay via bKash, Nagad, Rocket, or Bank Transfer with instant verification.'}
                  </div>
                </div>
              )}

              {/* Course Includes Checklist */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <span className="font-semibold text-white block text-[11px] uppercase tracking-wider">
                  {language === 'bn' ? 'এই কোর্সে যা যা অন্তর্ভুক্ত:' : 'This Masterclass Includes:'}
                </span>
                <div className="flex items-center gap-2 text-slate-300">
                  <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{course.duration} High-definition recorded lectures</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Downloadable prompt blueprints & resources</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Course completion digital certificate</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full lifetime access on desktop and mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Video Preview Modal */}
      {activePreviewLesson && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-cyan-400" />
                <span>Free Preview: {activePreviewLesson.title}</span>
              </div>
              <button
                onClick={() => setActivePreviewLesson(null)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-16/9 bg-black relative">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title={activePreviewLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-900 text-xs text-slate-300 flex items-center justify-between">
              <p>{activePreviewLesson.contentNotes || 'Enjoy this free preview lesson from AI Barta 24.'}</p>
              <button
                onClick={() => {
                  setActivePreviewLesson(null);
                  onEnroll(course);
                }}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors"
              >
                Enroll to Unlock All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
