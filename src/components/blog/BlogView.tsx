import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import { BookOpen, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';

interface BlogViewProps {
  onSelectPost: (slug: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onSelectPost }) => {
  const { blogPosts, language } = useApp();
  const [search, setSearch] = useState('');

  const published = blogPosts.filter(
    (p) =>
      p.isPublished &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.titleBn.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'bn' ? 'এআই ব্লগ ও আর্টিকোল' : 'AI Insights & Articles'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'প্রযুক্তি বিশ্লেষণ ও গাইড' : 'Dispatches from the AI Frontier'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'মাহমুদুল হাসানের লেখা জেনারেটিভ এআই, প্রম্পটিং এবং আধুনিক ওয়ার্কফ্লো নিয়ে গবেষণাধর্মী লেখা।'
              : 'Technical essays, practical workflows, and strategic analyses of emerging generative artificial intelligence.'}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title or keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {published.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between shadow-xl transition-all"
            >
              <div>
                {/* Cover Image */}
                <div className="aspect-16/9 bg-slate-950 overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 left-3 text-[11px] font-mono text-cyan-400 font-semibold">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{post.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {language === 'bn' ? post.titleBn : post.title}
                  </h2>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {language === 'bn' ? post.excerptBn : post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More */}
              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400 font-medium">By {post.author}</span>
                <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
