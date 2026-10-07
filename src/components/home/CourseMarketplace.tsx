import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import {
  BookOpen,
  Clock,
  PlayCircle,
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CourseMarketplaceProps {
  onNavigate: (view: string, param?: string) => void;
  onEnroll: (course: Course) => void;
}

export const CourseMarketplace: React.FC<CourseMarketplaceProps> = ({ onNavigate, onEnroll }) => {
  const { courses, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Generative AI', 'Video & Audio AI', 'Automation & Productivity'];

  const filteredCourses = courses.filter((course) => {
    if (!course.isPublished) return false;
    const matchesCategory =
      selectedCategory === 'All' ||
      course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses" className="py-20 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <BookOpen className="w-4 h-4" />
              <span>{language === 'bn' ? 'অনলাইন কোর্স মার্কেটপ্লেস' : 'Course Marketplace'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'bn' ? 'আমাদের বিশেষায়িত এআই কোর্সসমূহ' : 'Master In-Demand AI Skills'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'বাংলা ভাষায় সাজানো সম্পূর্ণ বাস্তবমুখী এবং ক্যারিয়ার-ওরিয়েন্টেড এআই কারিকুলাম।'
                : 'Project-first masterclasses designed to take you from foundational concepts to advanced production workflows.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'কোর্স খুঁজুন...' : 'Search courses...'}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl mb-10 overflow-x-auto max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'All' ? (language === 'bn' ? 'সকল কোর্স' : 'All Courses') : cat}
            </button>
          ))}
        </div>

        {/* Courses Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">
              {language === 'bn' ? 'কোনো কোর্স পাওয়া যায়নি।' : 'No courses found matching your criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const discountPercent = Math.round(
                ((course.originalPrice - course.discountPrice) / course.originalPrice) * 100
              );

              return (
                <div
                  key={course.id}
                  className="group flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 overflow-hidden transition-all duration-200 shadow-xl shadow-slate-950/50"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-950">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    
                    {/* Badge if present */}
                    {course.badge && (
                      <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {course.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-cyan-400">{course.category}</span>
                      <span className="text-[11px] text-slate-400">{course.level}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {language === 'bn' ? course.titleBn : course.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {language === 'bn' ? course.subtitleBn : course.subtitle}
                      </p>

                      {/* Clean Unboxed Metadata */}
                      <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{course.totalLessons} Lessons</span>
                        </div>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Instructor & Price Zone */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-6 h-6 rounded-full object-cover border border-slate-700"
                          />
                          <span className="text-xs text-slate-300 font-medium">
                            {course.instructor.name}
                          </span>
                        </div>

                        {/* Price display */}
                        <div className="text-right">
                          <div className="flex items-baseline gap-1.5 justify-end">
                            <span className="text-base font-extrabold text-white">
                              {course.currency}{course.discountPrice.toLocaleString()}
                            </span>
                            {course.originalPrice > course.discountPrice && (
                              <span className="text-xs text-slate-500 line-through">
                                {course.currency}{course.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {discountPercent > 0 && (
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              {discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => onNavigate('course-details', course.slug)}
                          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
                        >
                          {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                        </button>

                        <button
                          onClick={() => onEnroll(course)}
                          className="py-2 px-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-xl text-center shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{language === 'bn' ? 'এনরোল করুন' : 'Enroll Now'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
