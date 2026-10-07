import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  FileText,
  FileCode,
  FolderArchive,
  Search,
  Lock,
  Sparkles,
} from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { resources, currentUser, incrementResourceDownload, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'pdf' | 'prompt' | 'zip'>('all');

  const filtered = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.description && res.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || res.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDownload = (resId: string, isPremium: boolean, title: string) => {
    if (isPremium && !currentUser) {
      alert(language === 'bn' ? 'এই প্রিমিয়াম রিসোর্সটি ডাউনলোড করতে দয়া করে লগইন করুন।' : 'Please sign in to access premium digital products.');
      onOpenAuth();
      return;
    }
    incrementResourceDownload(resId);
    alert(`Starting download for: ${title}`);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      case 'prompt':
        return <FileCode className="w-5 h-5 text-cyan-400" />;
      case 'zip':
        return <FolderArchive className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'bn' ? 'ডিজিটাল প্রোডাক্ট ও রিসোর্স লাইব্রেরি' : 'Digital Products & Downloads'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn'
              ? 'প্রম্পট প্যাক, চিটশিট ও অটোমেশন ব্লুপ্রিন্ট'
              : 'Curated Prompt Blueprints & Guides'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'AI Barta 24 ল্যাব থেকে তৈরি করা যাচাইকৃত প্রম্পট টেমপ্লেট ও রিসোর্স সংগ্রহ।'
              : 'Production-ready templates, parameter cheatsheets, and automated flow configurations.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            {(['all', 'pdf', 'prompt', 'zip'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl uppercase transition-colors cursor-pointer ${
                  typeFilter === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getIcon(res.type)}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500">{res.fileSize}</span>
                    {res.isPremium ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-950/80 text-amber-400 border border-amber-800/80 rounded flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Premium</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded">
                        Free
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white line-clamp-2">{res.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {res.downloadCount} downloads
                </span>

                <button
                  onClick={() => handleDownload(res.id, res.isPremium, res.title)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
