export type Role = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'prompt' | 'link' | 'code';
  fileUrl: string;
  fileSize: string;
  isPremium: boolean;
  downloadCount: number;
  description?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
  videoUrl?: string; // YouTube, Vimeo or MP4 URL
  contentNotes?: string;
  resources?: ResourceItem[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  description: string;
  descriptionBn: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  totalLessons: number;
  originalPrice: number; // in BDT
  discountPrice: number; // in BDT
  currency: string;
  isPublished: boolean;
  isFeatured: boolean;
  thumbnail: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  outcomes: string[];
  requirements: string[];
  targetAudience: string[];
  curriculum: CourseModule[];
  faqs?: { question: string; answer: string }[];
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentEmail: string;
  courseId: string;
  enrolledAt: string;
  progress: number; // 0 - 100
  completedLessons: string[]; // lesson IDs
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'bank';
export type OrderStatus = 'pending' | 'paid' | 'rejected' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  originalAmount: number;
  discountAmount: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  transactionId: string;
  receiptUrl?: string;
  status: OrderStatus;
  adminNotes?: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface PaymentMethodConfig {
  id: string;
  code: PaymentMethod;
  name: string;
  accountNumber: string;
  accountType: 'Personal' | 'Merchant' | 'Agent';
  instructionsBn: string;
  instructionsEn: string;
  isActive: boolean;
  qrCodeUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  content: string;
  contentBn: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  studentRole: string;
  studentAvatar?: string;
  courseTitle: string;
  rating: number;
  feedback: string;
  feedbackBn: string;
  isApproved: boolean;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  category: string;
  order: number;
  isPublished: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  validUntil: string;
  usageCount: number;
  maxUsage: number;
  isActive: boolean;
}

export interface PlatformSettings {
  siteTitle: string;
  siteTagline: string;
  siteTaglineBn: string;
  founderName: string;
  founderTitle: string;
  founderEmail: string;
  founderPhone: string;
  founderBio: string;
  founderBioBn: string;
  founderImage: string;
  heroHeading: string;
  heroHeadingBn: string;
  heroSubheading: string;
  heroSubheadingBn: string;
  darkAiSectionHeading: string;
  darkAiSectionHeadingBn: string;
  darkAiSectionText: string;
  darkAiSectionTextBn: string;
  expertiseCategories: string[];
  socialLinks: {
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    whatsapp?: string;
    telegram?: string;
    github?: string;
  };
  seoTitle: string;
  seoDescription: string;
  isManualPaymentEnabled: boolean;
}
