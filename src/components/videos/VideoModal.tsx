import React from 'react';
import { VideoItem } from '../../types';
import { getVideoEmbedUrl } from '../../utils/youtube';
import { X, Youtube, ExternalLink, Play, Clock, Sparkles } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem;
  allVideos: VideoItem[];
  onClose: () => void;
  onSelectVideo: (video: VideoItem) => void;
  language: 'bn' | 'en';
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  allVideos,
  onClose,
  onSelectVideo,
  language,
}) => {
  const embedUrl = getVideoEmbedUrl(video, true);
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && v.isPublished)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative my-8">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-cyan-400 font-mono uppercase">{video.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="truncate max-w-xs sm:max-w-md text-white font-medium">
              {language === 'bn' && video.titleBn ? video.titleBn : video.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded YouTube Player */}
        <div className="aspect-16/9 bg-black relative">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Details & Actions */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1.5 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {language === 'bn' && video.titleBn ? video.titleBn : video.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Published on AI Barta 24</span>
                <span aria-hidden="true">·</span>
                <span>Instructor: Mahmudul Hasan</span>
                {video.duration && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-cyan-400">{video.duration}</span>
                  </>
                )}
              </div>
            </div>

            {/* Subscribe on YouTube CTA Button */}
            <a
              href="https://www.youtube.com/@AIBARTA24"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all shrink-0 cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Subscribe @AIBARTA24</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'bn' ? 'ভিডিও সম্পর্কে বিস্তারিত:' : 'About this Video:'}
            </h4>
            <p className="whitespace-pre-line text-slate-300">
              {language === 'bn' && video.descriptionBn ? video.descriptionBn : video.description}
            </p>
          </div>

          {/* Related Videos Strip */}
          {relatedVideos.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'bn' ? 'সম্পর্কিত অন্যান্য এআই ভিডিও' : 'More Videos from AI Barta 24'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedVideos.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectVideo(rel)}
                    className="group text-left p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex gap-3 transition-colors cursor-pointer"
                  >
                    <div className="relative w-20 aspect-16/9 rounded-lg overflow-hidden bg-black shrink-0">
                      <img
                        src={rel.thumbnailUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                        {language === 'bn' && rel.titleBn ? rel.titleBn : rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                        {rel.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
