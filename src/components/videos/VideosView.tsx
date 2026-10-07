import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoItem } from '../../types';
import { VideoModal } from './VideoModal';
import {
  Play,
  Youtube,
  Search,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Clock,
  Filter,
} from 'lucide-react';

interface VideosViewProps {
  onBackToHome: () => void;
}

export const VideosView: React.FC<VideosViewProps> = ({ onBackToHome }) => {
  const { videos, language } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedVideos = videos.filter((v) => v.isPublished);

  const categories = [
    'All',
    ...Array.from(new Set(publishedVideos.map((v) => v.category))),
  ];

  const filteredVideos = publishedVideos.filter((v) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      v.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.titleBn && v.titleBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'হোম পেইজে ফিরে যান' : 'Back to Home'}</span>
        </button>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400">
              <Youtube className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{language === 'bn' ? 'এআই ভিডিও লাইব্রেরি' : 'AI Video Classroom & Library'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Mahmudul Hasan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {language === 'bn'
                ? 'ইউটিউব ভিডিও লেকচার ও টিউটোরিয়াল'
                : 'Free AI Tutorials & Step-by-Step Guides'}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'জেনারেটিভ এআই, প্রম্পট ইঞ্জিনিয়ারিং, ভিডিও মেকিং ও অটোমেশন নিয়ে মাহমুদুল হাসানের সব ভিডিও সরাসরি এখানে দেখুন।'
                : 'Watch high-quality masterclasses and workflow walkthroughs directly inside the AI Barta 24 platform.'}
            </p>
          </div>

          <a
            href="https://www.youtube.com/@AIBARTA24"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-rose-600/25 transition-all shrink-0 cursor-pointer"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Subscribe @AIBARTA24</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'All' ? (language === 'bn' ? 'সকল ভিডিও' : 'All Videos') : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'ভিডিও খুঁজুন...' : 'Search tutorials...'}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <Youtube className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No videos found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Thumbnail with hover zoom */}
                  <div className="relative aspect-16/9 bg-slate-950 overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70" />

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="text-[11px] font-mono text-cyan-300 font-medium px-2 py-0.5 bg-slate-950/80 rounded backdrop-blur-xs border border-slate-800">
                        {video.category}
                      </span>
                      {video.duration && (
                        <span className="text-[11px] font-mono bg-black/80 px-2 py-0.5 rounded text-slate-300">
                          {video.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {language === 'bn' && video.titleBn ? video.titleBn : video.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {language === 'bn' && video.descriptionBn ? video.descriptionBn : video.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>Instructor: Mahmudul Hasan</span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                    <span>Watch Now</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          allVideos={publishedVideos}
          onClose={() => setSelectedVideo(null)}
          onSelectVideo={(v) => setSelectedVideo(v)}
          language={language}
        />
      )}
    </div>
  );
};
