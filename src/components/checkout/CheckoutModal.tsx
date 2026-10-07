import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, PaymentMethod } from '../../types';
import {
  X,
  CreditCard,
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Tag,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface CheckoutModalProps {
  course: Course;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  course,
  onClose,
  onOrderSuccess,
}) => {
  const {
    currentUser,
    paymentMethods,
    createOrder,
    validateCoupon,
    language,
  } = useApp();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || '');
  const [studentPhone, setStudentPhone] = useState(currentUser?.phone || '');
  
  // Active payment method
  const activeMethods = paymentMethods.filter((pm) => pm.isActive);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    activeMethods[0]?.code || 'bkash'
  );
  
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Created Order Record
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const currentMethodConfig = paymentMethods.find((pm) => pm.code === selectedMethod);

  // Pricing calculations
  const originalAmount = course.originalPrice;
  const baseDiscount = course.originalPrice - course.discountPrice;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalPayable = Math.max(0, course.discountPrice - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    setCouponError('');
    const res = validateCoupon(couponCode, course.discountPrice);
    if (res.valid) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: res.discount });
    } else {
      setCouponError(res.message);
    }
  };

  const handleCopyAccountNumber = () => {
    if (!currentMethodConfig) return;
    navigator.clipboard.writeText(currentMethodConfig.accountNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderNumber || !transactionId) return;

    const newOrder = createOrder({
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim().toLowerCase(),
      studentPhone: studentPhone.trim(),
      courseId: course.id,
      courseTitle: course.title,
      amount: finalPayable,
      originalAmount: course.originalPrice,
      discountAmount: baseDiscount + couponDiscount,
      couponCode: appliedCoupon?.code,
      paymentMethod: selectedMethod,
      senderNumber: senderNumber.trim(),
      transactionId: transactionId.trim().toUpperCase(),
      receiptUrl: receiptUrl.trim() || undefined,
    });

    setCreatedOrderNumber(newOrder.orderNumber);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">
              {language === 'bn' ? 'কোর্স এনরোলমেন্ট ও পেমেন্ট' : 'Enrollment & Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Details & Coupon */}
        {step === 'details' && (
          <div className="p-6 space-y-6">
            
            {/* Course Summary Card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-semibold text-cyan-400 block tracking-wider">
                  Selected Course
                </span>
                <h3 className="text-sm font-bold text-white truncate">{course.title}</h3>
                <span className="text-xs text-slate-400">{course.totalLessons} Lessons · {course.duration}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-bold text-white">{course.currency}{course.discountPrice.toLocaleString()}</span>
                {course.originalPrice > course.discountPrice && (
                  <span className="block text-xs text-slate-500 line-through">
                    {course.currency}{course.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Student Info Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {language === 'bn' ? 'শিক্ষার্থীর তথ্য' : 'Student Information'}
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">
                    {language === 'bn' ? 'পুরো নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 mb-1 block">
                      {language === 'bn' ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 mb-1 block">
                      {language === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ *' : 'Mobile / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{language === 'bn' ? 'কুপন কোড ব্যবহার করুন' : 'Have a Promo / Coupon Code?'}</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Try: AIBARTA24</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. AIBARTA24"
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white uppercase focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Coupon {appliedCoupon.code} applied! Discount: ৳{appliedCoupon.discount}</span>
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{couponError}</span>
                </div>
              )}
            </div>

            {/* Total Calculation */}
            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Course Regular Fee:</span>
                <span className="line-through text-slate-500">{course.currency}{course.originalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Special Discount:</span>
                <span className="text-emerald-400">- {course.currency}{baseDiscount}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between">
                  <span>Coupon Discount:</span>
                  <span className="text-emerald-400">- {course.currency}{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Payable:</span>
                <span className="text-cyan-400 text-base">{course.currency}{finalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                if (!studentName || !studentEmail || !studentPhone) {
                  alert(language === 'bn' ? 'অনুগ্রহ করে নাম, ইমেইল ও মোবাইল নম্বর দিন।' : 'Please provide name, email, and phone number.');
                  return;
                }
                setStep('payment');
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'bn' ? 'পেমেন্ট মেথড সিলেক্ট করুন' : 'Proceed to Payment Method'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Payment Method & TrxID Verification */}
        {step === 'payment' && (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            
            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                {language === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন *' : 'Select Mobile Banking / Payment Method *'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.code)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedMethod === method.code
                        ? 'bg-blue-600/20 border-cyan-400 text-white shadow-xs'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block text-xs font-bold">{method.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-500">{method.accountType}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Payment Instruction Card */}
            {currentMethodConfig && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Send Money to {currentMethodConfig.name} ({currentMethodConfig.accountType})
                    </span>
                    <span className="text-base font-mono font-bold text-cyan-300">
                      {currentMethodConfig.accountNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAccountNumber}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 hover:border-cyan-400 text-[11px] text-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {language === 'bn' ? currentMethodConfig.instructionsBn : currentMethodConfig.instructionsEn}
                </div>

                <div className="text-[11px] text-cyan-400 font-mono bg-cyan-950/30 p-2 rounded-lg border border-cyan-900/50">
                  Payable Amount: {course.currency}{finalPayable.toLocaleString()}
                </div>
              </div>
            )}

            {/* Transaction Verification Submission Form */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {language === 'bn' ? 'পেমেন্ট ট্রানজেকশন তথ্য দিন *' : 'Submit Transaction Details *'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">
                    {language === 'bn' ? 'প্রেরক নম্বর (Sender Number) *' : 'Sender Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 mb-1 block">
                    {language === 'bn' ? 'ট্রানজেকশন আইডি (TrxID) *' : 'Transaction ID (TrxID) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 9K28X91PLA"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1 block">
                  {language === 'bn' ? 'পেমেন্ট স্ক্রিনশট লিংক (ঐচ্ছিক)' : 'Receipt / Screenshot URL (Optional)'}
                </label>
                <input
                  type="url"
                  value={receiptUrl}
                  onChange={(e) => setReceiptUrl(e.target.value)}
                  placeholder="https://imgur.com/... or Google Drive link"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'পেমেন্ট সাবমিট করুন' : 'Confirm & Submit Order'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation Screen */}
        {step === 'confirmation' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">
              {language === 'bn' ? 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে!' : 'Order Placed Successfully!'}
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono text-cyan-300 font-bold">{createdOrderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Course:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">{course.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="text-emerald-400 font-bold">{course.currency}{finalPayable.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">TrxID:</span>
                <span className="font-mono text-slate-200">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-semibold">Verification Pending</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {language === 'bn'
                ? 'আপনার ট্রানজেকশন তথ্য আমাদের এডমিন প্যানেলে জমা হয়েছে। যাচাইকরণের পর কোর্সটি আপনার স্টুডেন্ট ড্যাশবোর্ডে আনলক হয়ে যাবে। ড্যাশবোর্ড থেকে আপনি অর্ডার স্ট্যাটাস পর্যবেক্ষণ করতে পারবেন।'
                : 'Your manual payment submission has been dispatched to the admin queue. Once verified by Mahmudul Hasan, the course will be accessible in your student portal.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOrderSuccess(createdOrderNumber);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'স্টুডেন্ট ড্যাশবোর্ডে যান' : 'Go to Student Dashboard'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
