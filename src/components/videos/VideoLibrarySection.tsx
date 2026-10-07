import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoItem } from '../../types';
import { VideoModal } from './VideoModal';
import {
  Play,
  Youtube,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

interface VideoLibrarySectionProps {
  onNavigate: (view: string, param?: string) => void;
}

export const VideoLibrarySection: React.FC<VideoLibrarySectionProps> = ({ onNavigate }) => {
  const { videos, language } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const publishedVideos = videos.filter((v) => v.isPublished);

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(new Set(publishedVideos.map((v) => v.category))),
  ];

  const filteredVideos = publishedVideos.filter((v) => {
    if (activeCategory === 'All') return true;
    return v.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const featuredVideo = publishedVideos.find((v) => v.isFeatured) || publishedVideos[0];

  return (
    <section id="videos" className="py-20 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400">
              <Youtube className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{language === 'bn' ? 'ইউটিউব ভিডিও লাইব্রেরি' : 'AI Video Library'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">@AIBARTA24</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'bn'
                ? 'ভিডিও টিউটোরিয়াল ও প্র্যাকটিক্যাল এআই গাইড'
                : 'Watch Practical AI Breakdowns Directly On-Site'}
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'মাহমুদুল হাসানের ইউটিউব চ্যানেলের জনপ্রিয় ভিডিওগুলো ওয়েবসাইট থেকেই সহজে ফুল স্ক্রিনে দেখতে পারবেন।'
                : 'High-impact tutorials, prompt engineering breakdowns, and generative workflows from Mahmudul Hasan.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@AIBARTA24"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-rose-600/25 transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Subscribe on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onNavigate('videos')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{language === 'bn' ? 'সকল ভিডিও দেখুন' : 'Explore All Videos'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'All' ? (language === 'bn' ? 'সকল ভিডিও' : 'All Videos') : cat}
            </button>
          ))}
        </div>

        {/* Featured Spotlight + Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-200"
            >
              <div>
                {/* Thumbnail Screen */}
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

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
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

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'bn' && video.descriptionBn ? video.descriptionBn : video.description}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 mt-2">
                <span>By Mahmudul Hasan</span>
                <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                  <span>Watch Video</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Banner Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Youtube className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn'
                  ? 'নতুন এআই ভিডিও সবার আগে দেখতে সাবস্ক্রাইব করুন'
                  : 'Subscribe to AI Barta 24 on YouTube'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Join the official YouTube channel for weekly masterclasses, live Q&As, and AI updates.
              </p>
            </div>
          </div>

          <a
            href="https://www.youtube.com/@AIBARTA24"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Visit @AIBARTA24</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
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
    </section>
  );
};
