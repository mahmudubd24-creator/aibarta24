import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Course,
  PaymentMethodConfig,
  Order,
  Enrollment,
  ResourceItem,
  BlogPost,
  Testimonial,
  FAQItem,
  ContactMessage,
  Coupon,
  PlatformSettings,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_PAYMENT_METHODS,
  INITIAL_COURSES,
  INITIAL_RESOURCES,
  INITIAL_BLOG_POSTS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_COUPONS,
  INITIAL_USERS,
} from '../services/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  courses: Course[];
  paymentMethods: PaymentMethodConfig[];
  orders: Order[];
  enrollments: Enrollment[];
  resources: ResourceItem[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  messages: ContactMessage[];
  coupons: Coupon[];
  settings: PlatformSettings;
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;

  // Auth
  login: (email: string, password?: string) => { success: boolean; message: string; user?: User };
  register: (name: string, email: string, phone: string, password?: string) => { success: boolean; message: string; user?: User };
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  switchDemoUser: (role: 'student' | 'admin' | 'guest') => void;

  // Courses
  getCourseBySlug: (slug: string) => Course | undefined;
  getCourseById: (id: string) => Course | undefined;
  addCourse: (course: Omit<Course, 'id'>) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  togglePublishCourse: (id: string) => void;

  // Orders & Enrollment
  createOrder: (orderData: {
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    courseId: string;
    courseTitle: string;
    amount: number;
    originalAmount: number;
    discountAmount: number;
    couponCode?: string;
    paymentMethod: Order['paymentMethod'];
    senderNumber: string;
    transactionId: string;
    receiptUrl?: string;
  }) => Order;
  approveOrder: (orderId: string, adminNotes?: string) => void;
  rejectOrder: (orderId: string, adminNotes?: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  getStudentEnrollments: (studentId: string) => Enrollment[];
  isCourseEnrolled: (courseId: string) => boolean;

  // Digital Resources
  addResource: (res: Omit<ResourceItem, 'id' | 'downloadCount'>) => void;
  updateResource: (id: string, updates: Partial<ResourceItem>) => void;
  deleteResource: (id: string) => void;
  incrementResourceDownload: (id: string) => void;

  // Blog
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Testimonials
  addTestimonial: (test: Omit<Testimonial, 'id' | 'createdAt'>) => void;
  toggleApproveTestimonial: (id: string) => void;
  deleteTestimonial: (id: string) => void;

  // FAQ
  addFaq: (faq: Omit<FAQItem, 'id'>) => void;
  updateFaq: (id: string, updates: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;

  // Messages
  sendContactMessage: (msg: { name: string; email: string; phone?: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Coupons
  validateCoupon: (code: string, currentTotal: number) => { valid: boolean; discount: number; message: string; coupon?: Coupon };
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  deleteCoupon: (id: string) => void;

  // Settings
  updateSettings: (updates: Partial<PlatformSettings>) => void;
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethodConfig>) => void;
  exportPlatformData: () => string;
  importPlatformData: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  CURRENT_USER: 'aibarta24_user',
  USERS: 'aibarta24_users_list',
  COURSES: 'aibarta24_courses',
  PAYMENT_METHODS: 'aibarta24_payment_methods',
  ORDERS: 'aibarta24_orders',
  ENROLLMENTS: 'aibarta24_enrollments',
  RESOURCES: 'aibarta24_resources',
  BLOG: 'aibarta24_blog',
  TESTIMONIALS: 'aibarta24_testimonials',
  FAQS: 'aibarta24_faqs',
  MESSAGES: 'aibarta24_messages',
  COUPONS: 'aibarta24_coupons',
  SETTINGS: 'aibarta24_settings',
  LANGUAGE: 'aibarta24_lang',
};

function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Failed to load ${key} from storage`, e);
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    safeGetStorage<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]) // Default admin logged in for easy test/demo
  );

  const [users, setUsers] = useState<User[]>(() =>
    safeGetStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS)
  );

  const [courses, setCourses] = useState<Course[]>(() =>
    safeGetStorage<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES)
  );

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodConfig[]>(() =>
    safeGetStorage<PaymentMethodConfig[]>(STORAGE_KEYS.PAYMENT_METHODS, INITIAL_PAYMENT_METHODS)
  );

  const [orders, setOrders] = useState<Order[]>(() =>
    safeGetStorage<Order[]>(STORAGE_KEYS.ORDERS, [
      {
        id: 'ord-1001',
        orderNumber: 'AB-88219',
        studentId: 'usr-student-1',
        studentName: 'Shakil Ahmed',
        studentEmail: 'student@example.com',
        studentPhone: '+880 1812-345678',
        courseId: 'course-genai-mastery',
        courseTitle: 'Generative AI Masterclass: From Fundamentals to Professional Workflows',
        amount: 2450,
        originalAmount: 4500,
        discountAmount: 2050,
        paymentMethod: 'bkash',
        senderNumber: '01812345678',
        transactionId: '9K28X91PLA',
        status: 'paid',
        adminNotes: 'Payment verified manually via bKash statement.',
        createdAt: '2026-09-02T10:15:00Z',
        verifiedAt: '2026-09-02T11:00:00Z',
      },
      {
        id: 'ord-1002',
        orderNumber: 'AB-88220',
        studentId: 'usr-student-2',
        studentName: 'Nadia Sultana',
        studentEmail: 'nadia.creative@gmail.com',
        studentPhone: '+880 1711-987654',
        courseId: 'course-ai-video-storytelling',
        courseTitle: 'AI Video Generation & Visual Storytelling for Creators',
        amount: 2200,
        originalAmount: 4000,
        discountAmount: 1800,
        paymentMethod: 'nagad',
        senderNumber: '01711987654',
        transactionId: 'NGD9841203',
        status: 'pending',
        createdAt: '2026-10-06T14:30:00Z',
      }
    ])
  );

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() =>
    safeGetStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, [
      {
        id: 'enr-1',
        studentId: 'usr-student-1',
        studentEmail: 'student@example.com',
        courseId: 'course-genai-mastery',
        enrolledAt: '2026-09-02T11:00:00Z',
        progress: 35,
        completedLessons: ['l-101', 'l-102']
      },
      {
        id: 'enr-2',
        studentId: 'usr-admin-1', // admin has access to test
        studentEmail: 'admin@aibarta24.com',
        courseId: 'course-genai-mastery',
        enrolledAt: '2026-01-01T00:00:00Z',
        progress: 100,
        completedLessons: ['l-101', 'l-102', 'l-103', 'l-201', 'l-202']
      }
    ])
  );

  const [resources, setResources] = useState<ResourceItem[]>(() =>
    safeGetStorage<ResourceItem[]>(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES)
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() =>
    safeGetStorage<BlogPost[]>(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS)
  );

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    safeGetStorage<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS)
  );

  const [faqs, setFaqs] = useState<FAQItem[]>(() =>
    safeGetStorage<FAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS)
  );

  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    safeGetStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, [
      {
        id: 'msg-1',
        name: 'Rafiqul Islam',
        email: 'rafiqul@example.com',
        phone: '+880 1600-112233',
        subject: 'Corporate Team Training Inquiry',
        message: 'Hello Mahmudul Hasan, we are interested in booking a corporate batch for 15 executives at our digital agency. Please let us know the quotation.',
        isRead: false,
        createdAt: '2026-10-05T08:20:00Z'
      }
    ])
  );

  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    safeGetStorage<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS)
  );

  const [settings, setSettings] = useState<PlatformSettings>(() =>
    safeGetStorage<PlatformSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  const [language, setLanguageState] = useState<'bn' | 'en'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return saved === 'en' ? 'en' : 'bn'; // Default to Bengali as requested
  });

  const setLanguage = (lang: 'bn' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Auth Operations
  const login = (email: string, _password?: string) => {
    const trimmed = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmed);
    if (existing) {
      setCurrentUser(existing);
      return { success: true, message: 'Logged in successfully', user: existing };
    }
    // Auto-create student if not exists
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: trimmed,
      role: trimmed.includes('admin') ? 'admin' : 'student',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Account initialized and logged in', user: newUser };
  };

  const register = (name: string, email: string, phone: string, _password?: string) => {
    const trimmed = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmed);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please login.' };
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: trimmed,
      phone: phone.trim(),
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Account registered successfully!', user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const switchDemoUser = (role: 'student' | 'admin' | 'guest') => {
    if (role === 'guest') {
      setCurrentUser(null);
    } else if (role === 'admin') {
      const admin = users.find((u) => u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(admin);
    } else {
      const student = users.find((u) => u.role === 'student') || INITIAL_USERS[1];
      setCurrentUser(student);
    }
  };

  // Course Operations
  const getCourseBySlug = (slug: string) => {
    return courses.find((c) => c.slug === slug || c.id === slug);
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id);
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [newCourse, ...prev]);
    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const togglePublishCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
  };

  // Orders & Enrollment
  const createOrder = (orderData: {
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    courseId: string;
    courseTitle: string;
    amount: number;
    originalAmount: number;
    discountAmount: number;
    couponCode?: string;
    paymentMethod: Order['paymentMethod'];
    senderNumber: string;
    transactionId: string;
    receiptUrl?: string;
  }) => {
    const studentId = currentUser?.id || `usr-anon-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AB-${Math.floor(10000 + Math.random() * 90000)}`,
      studentId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const approveOrder = (orderId: string, adminNotes?: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    // Update order status
    const verifiedAt = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: 'paid', adminNotes, verifiedAt } : o
      )
    );

    // Grant enrollment
    const existingEnrollment = enrollments.find(
      (e) => e.studentId === order.studentId && e.courseId === order.courseId
    );

    if (!existingEnrollment) {
      const newEnrollment: Enrollment = {
        id: `enr-${Date.now()}`,
        studentId: order.studentId,
        studentEmail: order.studentEmail,
        courseId: order.courseId,
        enrolledAt: verifiedAt,
        progress: 0,
        completedLessons: [],
      };
      setEnrollments((prev) => [...prev, newEnrollment]);
    }
  };

  const rejectOrder = (orderId: string, adminNotes?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: 'rejected', adminNotes } : o
      )
    );
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.courseId === courseId && enr.studentId === currentUser.id) {
          const completed = enr.completedLessons.includes(lessonId)
            ? enr.completedLessons
            : [...enr.completedLessons, lessonId];
          const course = courses.find((c) => c.id === courseId);
          const totalLessons = course ? course.totalLessons : 10;
          const progress = Math.min(100, Math.round((completed.length / totalLessons) * 100));
          return { ...enr, completedLessons: completed, progress };
        }
        return enr;
      })
    );
  };

  const getStudentEnrollments = (studentId: string) => {
    return enrollments.filter((e) => e.studentId === studentId);
  };

  const isCourseEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true; // Admin has preview access to all courses
    return enrollments.some((e) => e.courseId === courseId && e.studentId === currentUser.id);
  };

  // Resources
  const addResource = (res: Omit<ResourceItem, 'id' | 'downloadCount'>) => {
    const newRes: ResourceItem = {
      ...res,
      id: `res-${Date.now()}`,
      downloadCount: 0,
    };
    setResources((prev) => [newRes, ...prev]);
  };

  const updateResource = (id: string, updates: Partial<ResourceItem>) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const incrementResourceDownload = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
  };

  // Blog
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
    };
    setBlogPosts((prev) => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Testimonials
  const addTestimonial = (test: Omit<Testimonial, 'id' | 'createdAt'>) => {
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTestimonials((prev) => [newTest, ...prev]);
  };

  const toggleApproveTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: !t.isApproved } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // FAQ
  const addFaq = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`,
    };
    setFaqs((prev) => [...prev, newFaq]);
  };

  const updateFaq = (id: string, updates: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Contact Messages
  const sendContactMessage = (msg: { name: string; email: string; phone?: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Coupons
  const validateCoupon = (code: string, currentTotal: number) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.isActive);
    if (!found) {
      return { valid: false, discount: 0, message: 'Invalid or inactive coupon code' };
    }
    if (new Date(found.validUntil) < new Date()) {
      return { valid: false, discount: 0, message: 'This coupon code has expired' };
    }
    if (found.usageCount >= found.maxUsage) {
      return { valid: false, discount: 0, message: 'Coupon usage limit reached' };
    }
    let discount = 0;
    if (found.discountPercent) {
      discount = Math.round((currentTotal * found.discountPercent) / 100);
    } else if (found.discountAmount) {
      discount = Math.min(found.discountAmount, currentTotal);
    }
    return {
      valid: true,
      discount,
      message: `Coupon applied: ৳${discount} discount`,
      coupon: found,
    };
  };

  const addCoupon = (coupon: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newC: Coupon = {
      ...coupon,
      id: `cp-${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newC, ...prev]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // Settings & System
  const updateSettings = (updates: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethodConfig>) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => (pm.id === id ? { ...pm, ...updates } : pm))
    );
  };

  const exportPlatformData = () => {
    return JSON.stringify(
      {
        settings,
        courses,
        paymentMethods,
        orders,
        enrollments,
        resources,
        blogPosts,
        testimonials,
        faqs,
        coupons,
      },
      null,
      2
    );
  };

  const importPlatformData = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) setSettings(data.settings);
      if (data.courses) setCourses(data.courses);
      if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
      if (data.orders) setOrders(data.orders);
      if (data.enrollments) setEnrollments(data.enrollments);
      if (data.resources) setResources(data.resources);
      if (data.blogPosts) setBlogPosts(data.blogPosts);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.faqs) setFaqs(data.faqs);
      if (data.coupons) setCoupons(data.coupons);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setCourses(INITIAL_COURSES);
    setPaymentMethods(INITIAL_PAYMENT_METHODS);
    setResources(INITIAL_RESOURCES);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setCoupons(INITIAL_COUPONS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        courses,
        paymentMethods,
        orders,
        enrollments,
        resources,
        blogPosts,
        testimonials,
        faqs,
        messages,
        coupons,
        settings,
        language,
        setLanguage,
        login,
        register,
        logout,
        updateProfile,
        switchDemoUser,
        getCourseBySlug,
        getCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        togglePublishCourse,
        createOrder,
        approveOrder,
        rejectOrder,
        markLessonComplete,
        getStudentEnrollments,
        isCourseEnrolled,
        addResource,
        updateResource,
        deleteResource,
        incrementResourceDownload,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTestimonial,
        toggleApproveTestimonial,
        deleteTestimonial,
        addFaq,
        updateFaq,
        deleteFaq,
        sendContactMessage,
        markMessageRead,
        deleteMessage,
        validateCoupon,
        addCoupon,
        deleteCoupon,
        updateSettings,
        updatePaymentMethod,
        exportPlatformData,
        importPlatformData,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
