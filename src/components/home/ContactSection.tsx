import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, language, sendContactMessage } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      sendContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'Direct Website Inquiry',
        message: formData.message,
      });
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 400);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Communication'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন' : 'Have a Question or Custom Inquiry?'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'কোর্স এনরোলমেন্ট, কর্পোরেট ট্রেনিং কিংবা যেকোনো পরামর্শের জন্য সরাসরি মেসেজ পাঠাতে পারেন।'
              : 'Reach out directly to Mahmudul Hasan and the AI Barta 24 team. We review every message personally.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? 'প্রাথমিক ইমেইল অ্যাড্রেস' : 'Official Primary Email'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'সবচেয়ে দ্রুত রেসপন্সের জন্য সরাসরি এই ইমেইলে যোগাযোগ করতে পারেন:'
                  : 'For general inquiries, collaboration proposals, and enterprise queries:'}
              </p>
              <a
                href={`mailto:${settings.founderEmail}`}
                className="inline-block text-cyan-300 font-semibold text-sm hover:underline"
              >
                {settings.founderEmail}
              </a>
            </div>

            {settings.founderPhone && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'হটলাইন / হোয়াটসঅ্যাপ' : 'WhatsApp & Phone Support'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'bn' ? 'পেমেন্ট ও এনরোলমেন্ট সংক্রান্ত জরুরি তথ্যের জন্য:' : 'For urgent payment verification assistance:'}
                </p>
                <div className="text-slate-200 font-semibold text-sm font-mono">
                  {settings.founderPhone}
                </div>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{language === 'bn' ? 'রেসপন্স সময়' : 'Response Schedule'}</span>
              </div>
              <p>
                {language === 'bn'
                  ? 'সাধারণত ১২ থেকে ২৪ ঘণ্টার মধ্যে সকল ইনবক্স মেসেজের উত্তর প্রদান করা হয়।'
                  : 'We typically respond to inquiries within 12 to 24 business hours.'}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'bn' ? 'আপনার মেসেজ সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                    {language === 'bn'
                      ? 'ধন্যবাদ! আপনার মেসেজটি সংরক্ষিত হয়েছে। মাহমুদুল হাসান বা আমাদের সাপোর্ট টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।'
                      : 'Thank you for reaching out. Your inquiry is recorded in our admin desk and we will get back to you shortly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {language === 'bn' ? 'আরেকটি মেসেজ পাঠান' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        {language === 'bn' ? 'আপনার নাম *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ রহিম' : 'e.g. Shakil Ahmed'}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        {language === 'bn' ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        {language === 'bn' ? 'ফোন / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1700-000000"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        {language === 'bn' ? 'বিষয়' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={language === 'bn' ? 'কোর্স সম্পর্কিত বা অন্য কিছু' : 'Course Inquiry, Corporate Batch...'}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      {language === 'bn' ? 'আপনার বার্তা *' : 'Your Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'bn' ? 'আপনার প্রশ্ন বা বিস্তারিত বার্তা লিখুন...' : 'Write your question or request in detail...'}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <Sparkles className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{language === 'bn' ? 'মেসেজ পাঠিয়ে দিন' : 'Send Message Now'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
