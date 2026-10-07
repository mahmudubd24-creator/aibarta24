import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2 } from 'lucide-react';

interface BlogPostViewProps {
  slug: string;
  onBack: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ slug, onBack }) => {
  const { blogPosts, language } = useApp();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-white font-bold">Article Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 rounded text-xs text-white">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <article className="py-12 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'সকল ব্লগে ফিরে যান' : 'Back to All Articles'}</span>
        </button>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span>{post.category}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {language === 'bn' ? post.titleBn : post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-300 font-medium">{post.author}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.publishedAt}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
          <div className="whitespace-pre-line">
            {language === 'bn' ? post.contentBn : post.content}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-500" />
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Footer */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 shrink-0">
            MH
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Written by {post.author}</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              AI Educator and Lead Instructor at AI Barta 24.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
