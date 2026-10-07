import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Lesson } from '../../types';
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Check,
  ChevronDown,
  Download,
  FileText,
  Sparkles,
  Award,
  Share2,
} from 'lucide-react';

interface CoursePlayerViewProps {
  courseId: string;
  onBack: () => void;
}

export const CoursePlayerView: React.FC<CoursePlayerViewProps> = ({
  courseId,
  onBack,
}) => {
  const {
    getCourseById,
    currentUser,
    enrollments,
    markLessonComplete,
    language,
    incrementResourceDownload,
  } = useApp();

  const course = getCourseById(courseId);

  // Find enrollment
  const enrollment = enrollments.find(
    (e) => (e.studentId === currentUser?.id || e.studentEmail === currentUser?.email) && e.courseId === courseId
  );

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  if (!course) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-white font-bold">Course Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 rounded text-xs text-white">
          Back
        </button>
      </div>
    );
  }

  const currentModule = course.curriculum[activeModuleIndex] || course.curriculum[0];
  const currentLesson: Lesson | undefined = currentModule?.lessons[activeLessonIndex] || currentModule?.lessons[0];

  const isCompleted = currentLesson
    ? enrollment?.completedLessons?.includes(currentLesson.id)
    : false;

  const handleToggleComplete = () => {
    if (!currentLesson) return;
    markLessonComplete(course.id, currentLesson.id);
  };

  const handleNextLesson = () => {
    if (!currentModule) return;
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else if (activeModuleIndex < course.curriculum.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      const prevMod = course.curriculum[activeModuleIndex - 1];
      setActiveModuleIndex(activeModuleIndex - 1);
      setActiveLessonIndex(prevMod.lessons.length - 1);
    }
  };

  const progressPercentage = enrollment ? enrollment.progress : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-cyan-400 font-mono">
              Module {activeModuleIndex + 1}: {currentModule?.title}
            </p>
          </div>
        </div>

        {/* Progress Bar & Certificate Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <span className="text-[11px] text-slate-400">Course Progress</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300">{progressPercentage}%</span>
            </div>
          </div>

          {progressPercentage >= 100 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Certified</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Learning Classroom Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Column: Video & Lesson Canvas: 8 cols */}
        <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          {/* Video Player Display Screen */}
          <div className="aspect-16/9 bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            {currentLesson?.videoUrl ? (
              <iframe
                src={`${currentLesson.videoUrl}?autoplay=0`}
                title={currentLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
                <PlayCircle className="w-16 h-16 text-cyan-400/80" />
                <h3 className="text-base font-bold text-white">{currentLesson?.title}</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Lesson lecture simulation prepared for AI Barta 24 enrolled students. Review the curriculum notes and assignment below.
                </p>
              </div>
            )}
          </div>

          {/* Lesson Action Controls */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">
                {currentLesson?.title}
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Duration: {currentLesson?.duration}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrevLesson}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Previous
              </button>

              <button
                onClick={handleToggleComplete}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>

              <button
                onClick={handleNextLesson}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Next Lesson
              </button>
            </div>
          </div>

          {/* Lesson Notes & Instructions */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>{language === 'bn' ? 'লেকচার নোটস ও অ্যাসাইনমেন্ট' : 'Lesson Study Notes & Guidelines'}</span>
            </h3>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              <p>
                {currentLesson?.contentNotes ||
                  'In this lecture, focus on applying the demonstrated prompt schemas with your own domain data. Pay attention to how the constraints influence the determinism of outputs.'}
              </p>
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                <span className="text-cyan-400 font-semibold block">Key Takeaway:</span>
                <p className="text-slate-400">
                  Always inspect token usage and structure conditioning before executing large batch completions. Use the provided prompt blueprint templates.
                </p>
              </div>
            </div>
          </div>

          {/* Attached Resources */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {language === 'bn' ? 'সংযুক্ত ফাইল ও রিসোর্স' : 'Lesson Downloadable Assets'}
            </h4>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  alert('Downloading Lesson Companion Guide (PDF)');
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Companion_Lesson_Guide.pdf (1.8 MB)</span>
              </button>

              <button
                onClick={() => {
                  alert('Downloading Prompt Code Pack (ZIP)');
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Prompt_Templates_Bundle.zip (2.4 MB)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus Curriculum Sidebar: 4 cols */}
        <div className="lg:col-span-4 bg-slate-900/60 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'কোর্স সিলেবাস' : 'Course Syllabus'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {course.curriculum.length} Modules
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
            {course.curriculum.map((mod, modIdx) => (
              <div key={mod.id} className="p-3">
                <div className="text-xs font-bold text-slate-300 mb-2 px-2 flex items-center justify-between">
                  <span>{mod.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{mod.lessons.length}</span>
                </div>

                <div className="space-y-1">
                  {mod.lessons.map((les, lesIdx) => {
                    const isActive = activeModuleIndex === modIdx && activeLessonIndex === lesIdx;
                    const isLesCompleted = enrollment?.completedLessons?.includes(les.id);

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModuleIndex(modIdx);
                          setActiveLessonIndex(lesIdx);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                            : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                            isLesCompleted
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {isLesCompleted ? '✓' : lesIdx + 1}
                          </div>
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {les.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
