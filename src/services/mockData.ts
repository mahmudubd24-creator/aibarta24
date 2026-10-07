import {
  Course,
  PaymentMethodConfig,
  BlogPost,
  Testimonial,
  FAQItem,
  PlatformSettings,
  ResourceItem,
  Coupon,
  User,
} from '../types';

export const INITIAL_SETTINGS: PlatformSettings = {
  siteTitle: 'AI Barta 24',
  siteTagline: 'Empowering minds with practical AI skills, creative workflows, and future technologies.',
  siteTaglineBn: 'ব্যবহারিক কৃত্রিম বুদ্ধিমত্তা ও ভবিষ্যৎ প্রযুক্তির মাধ্যমে আপনার দক্ষতাকে অনন্য উচ্চতায় নিয়ে যান।',
  founderName: 'Mahmudul Hasan',
  founderTitle: 'AI Educator | AI Trainer | AI Learner | Content Creator',
  founderEmail: 'aibartabd@mail.com',
  founderPhone: '+880 1700-000000',
  founderBio: 'Mahmudul Hasan is an AI educator, trainer, and technology content creator dedicated to bridging the AI divide for Bengali-speaking learners worldwide. Through AI Barta 24, he shares practical, production-ready AI frameworks, prompt engineering systems, and automated workflows designed for career growth and creative independence.',
  founderBioBn: 'মাহমুদুল হাসান একজন এআই শিক্ষক, প্রশিক্ষক এবং প্রযুক্তি কনটেন্ট ক্রিয়েটর। বাংলাভাষী শিক্ষার্থীদের জন্য বাস্তবসম্মত এবং প্রয়োগমুখী কৃত্রিম বুদ্ধিমত্তার জ্ঞান সহজলভ্য করতে তিনি প্রতিষ্ঠা করেছেন ‘AI Barta 24’। ব্যবহারিক প্রম্পট ইঞ্জিনিয়ারিং, অটোমেশন এবং প্রোডাকশন-রেডি এআই টুলস আয়ত্ত করতে তিনি নিয়মিত প্রশিক্ষণ প্রদান করছেন।',
  founderImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  heroHeading: 'Master Practical AI. Build Smarter. Shape Your Future.',
  heroHeadingBn: 'AI শিখুন। স্মার্টভাবে তৈরি করুন। ভবিষ্যৎ গড়ুন।',
  heroSubheading: 'Master Generative AI, Prompt Engineering, Automation, and Next-Gen Digital Workflows tailored for students, creators, and modern professionals.',
  heroSubheadingBn: 'কনটেন্ট ক্রিয়েশন, অটোমেশন এবং বাস্তবমুখী প্রজেক্টের মাধ্যমে কৃত্রিম বুদ্ধিমত্তার সেরা ব্যবহার শিখুন বাংলা ভাষায়।',
  darkAiSectionHeading: 'AI-Driven Creative & Automation Superpowers',
  darkAiSectionHeadingBn: 'বাস্তব প্রজেক্টের সাথে আধুনিক এআই কর্মপদ্ধতি',
  darkAiSectionText: 'Go beyond theoretical buzzwords. Build automated pipelines, generate broadcast-quality media, and elevate your everyday workflow with structured guidance.',
  darkAiSectionTextBn: 'শুধু তাত্ত্বিক আলোচনা নয়, বাস্তব জীবনের জন্য প্রম্পট ইঞ্জিনিয়ারিং, এআই ভিডিও প্রোডাকশন এবং সিস্টেম অটোমেশন শিখুন হাতে-কলমে।',
  expertiseCategories: [
    'Generative AI & LLMs',
    'AI Image & Graphic Generation',
    'AI Video Production & Storytelling',
    'Prompt Engineering Architectures',
    'No-Code AI Automation & Workflows',
    'AI for Content Marketing & Copywriting',
    'AI Productivity Systems',
    'Custom AI Assistants & GPTs'
  ],
  socialLinks: {
    facebook: 'https://facebook.com/aibarta24',
    youtube: 'https://youtube.com/@aibarta24',
    linkedin: 'https://linkedin.com/in/mahmudulhasan',
    whatsapp: 'https://wa.me/8801700000000',
    telegram: 'https://t.me/aibarta24',
    github: 'https://github.com/mahmudulhasan'
  },
  seoTitle: 'AI Barta 24 | AI Education & Online Learning by Mahmudul Hasan',
  seoDescription: 'Master Generative AI, Prompt Engineering, and automation in Bengali with Mahmudul Hasan. Practical hands-on curriculum for creators, students, and professionals.',
  isManualPaymentEnabled: true,
};

export const INITIAL_PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'pm-bkash',
    code: 'bkash',
    name: 'bKash (বিকাশ)',
    accountNumber: '01700-000000',
    accountType: 'Personal',
    instructionsBn: '১. আপনার bKash অ্যাপ অথবা *247# ডায়াল করে "Send Money" অপশনে যান।\n২. উপরের একাউন্ট নাম্বারে নির্ধারিত কোর্স ফি সেন্ড মানি করুন।\n৩. রেফারেন্সে আপনার নাম বা কোর্সের নাম লিখুন।\n৪. পেমেন্ট সফল হওয়ার পর নিচের ফর্মে আপনার প্রেরক বিকাশ নাম্বার এবং TrxID (ট্রানজেকশন আইডি) সাবমিট করুন।',
    instructionsEn: '1. Open bKash app or dial *247# and choose "Send Money".\n2. Send the exact course amount to the account number above.\n3. Put your name in reference.\n4. Enter your Sender Number and Transaction ID (TrxID) below to submit.',
    isActive: true,
  },
  {
    id: 'pm-nagad',
    code: 'nagad',
    name: 'Nagad (নগদ)',
    accountNumber: '01800-000000',
    accountType: 'Personal',
    instructionsBn: '১. আপনার Nagad অ্যাপ অথবা *167# ডায়াল করে "Send Money" অপশন সিলেক্ট করুন।\n২. উপরোক্ত নগদ নাম্বারে নির্ধারিত ফি সেন্ড মানি করুন।\n৩. ট্রানজেকশন সম্পন্ন হলে প্রাপ্ত TrxID এবং আপনার নগদ মোবাইল নম্বর নিচের ফর্মে সাবমিট করুন।',
    instructionsEn: '1. Open Nagad app or dial *167# and select "Send Money".\n2. Send the exact fee to the Nagad number above.\n3. Enter your Sender Number and Transaction ID (TrxID) in the form below.',
    isActive: true,
  },
  {
    id: 'pm-rocket',
    code: 'rocket',
    name: 'Rocket (রকেট)',
    accountNumber: '01900-000000-0',
    accountType: 'Personal',
    instructionsBn: '১. রকেট অ্যাপ অথবা *322# ব্যবহার করে "Send Money" করুন।\n২. সফল ট্রানজেকশনের পর ট্রানজেকশন আইডি সংরক্ষণ করুন এবং নিচের বক্সে প্রদান করুন।',
    instructionsEn: '1. Send money to the Rocket number via Rocket App or *322#.\n2. Submit your Sender mobile number and Rocket TrxID.',
    isActive: true,
  },
  {
    id: 'pm-bank',
    code: 'bank',
    name: 'Bank Transfer (ব্যাংক ট্রান্সফার)',
    accountNumber: 'Account: 2050XXXXXXXXXX | Bank: Islami Bank Bangladesh / City Bank | Branch: Dhaka | Name: Mahmudul Hasan',
    accountType: 'Personal',
    instructionsBn: 'যেকোনো ব্যাংক অ্যাপ (iBanking / BEFTN / NPSB) এর মাধ্যমে উপরোক্ত ব্যাংক একাউন্টে ফি ট্রান্সফার করুন এবং রেফারেন্স হিসেবে আপনার মোবাইল নম্বর লিখুন। পেমেন্টের স্ক্রিনশট বা স্লিপ আইডি প্রদান করুন।',
    instructionsEn: 'Transfer through online banking (BEFTN/NPSB) to the bank account details above. Provide the transfer reference ID or receipt.',
    isActive: true,
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-genai-mastery',
    slug: 'generative-ai-masterclass',
    title: 'Generative AI Masterclass: From Fundamentals to Professional Workflows',
    titleBn: 'জেনারেটিভ এআই মাস্টারক্লাস: বেসিক থেকে প্রফেশনাল লেভেল',
    subtitle: 'Comprehensive blueprint to master LLMs, ChatGPT, Claude, Midjourney, and generative frameworks for everyday excellence.',
    subtitleBn: 'চ্যাটজিপিটি, ক্লড, মিডজার্নি এবং আধুনিক জেনারেটিভ এআই টুলসের পূর্ণাঙ্গ গাইডলাইন।',
    description: 'This masterclass is designed for anyone who wants to harness the true power of Generative AI without technical intimidation. You will build a rock-solid mental model of large language models, learn systemic prompt engineering methodologies, master multi-modal asset creation, and integrate AI into daily productivity.',
    descriptionBn: 'এই মাস্টারক্লাসটি এমনভাবে সাজানো হয়েছে যেন যে কেউ কোনো জটিল কোডিং ছাড়াই কৃত্রিম বুদ্ধিমত্তার সর্বোচ্চ সুবিধা গ্রহণ করতে পারেন। প্রম্পট আর্কিটেকচার, কনটেন্ট অপ্টিমাইজেশন, এআই ইমেজ ও ভিজ্যুয়াল মেকিং এবং দৈনন্দিন কর্মদক্ষতা বাড়ানোর সকল কৌশল ধাপে ধাপে শেখানো হবে।',
    category: 'Generative AI',
    level: 'All Levels',
    duration: '14 Hours (Recorded & Live Q&A)',
    totalLessons: 28,
    originalPrice: 4500,
    discountPrice: 2450,
    currency: '৳',
    isPublished: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    instructor: {
      name: 'Mahmudul Hasan',
      title: 'AI Educator & Founder, AI Barta 24',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Practicing AI trainer helping learners demystify cutting-edge generative tools and build scalable personal workflows.'
    },
    outcomes: [
      'Master prompt engineering patterns: Zero-shot, Few-shot, Chain-of-Thought & Role Prompting',
      'Create high-converting written content, articles, and marketing copies using AI',
      'Craft stunning commercial visuals with Midjourney, Leonardo, and Stable Diffusion',
      'Build custom GPTs and personalized knowledge assistants for your work',
      'Understand ethical AI principles, copyright safety, and hallucinations management'
    ],
    requirements: [
      'A computer or smartphone with reliable internet connection',
      'No prior programming or computer science degree required',
      'Eagerness to experiment and apply AI tools in real tasks'
    ],
    targetAudience: [
      'Content Creators, Writers & Digital Marketers',
      'University Students & Fresh Graduates aiming for AI literacy',
      'Freelancers seeking to multiply project delivery speed',
      'Entrepreneurs and small business owners optimizing operational costs'
    ],
    curriculum: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Generative Artificial Intelligence',
        lessons: [
          {
            id: 'l-101',
            title: 'Welcome to AI Barta 24 & Course Roadmap',
            duration: '12 min',
            isFreePreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            contentNotes: 'Overview of the course, learning objectives, and joining our private community group for peer feedback.'
          },
          {
            id: 'l-102',
            title: 'How Large Language Models Actually Think and Generate',
            duration: '22 min',
            isFreePreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            contentNotes: 'Demystifying tokens, context windows, temperature, and why models hallucinate.'
          },
          {
            id: 'l-103',
            title: 'Comparing the Big Models: ChatGPT, Claude 3.5, and Gemini',
            duration: '26 min',
            isFreePreview: false,
            contentNotes: 'Benchmark comparisons and choosing the right model for research, coding, or creative writing.'
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Advanced Prompt Engineering Frameworks',
        lessons: [
          {
            id: 'l-201',
            title: 'The Anatomy of a Perfect Prompt: Context, Role, Task & Constraints',
            duration: '28 min',
            isFreePreview: false,
            contentNotes: 'The CREATE prompt formula with downloadable template cards.'
          },
          {
            id: 'l-202',
            title: 'Few-Shot Conditioning & Persona Orchestration',
            duration: '25 min',
            isFreePreview: false,
            contentNotes: 'Giving structural examples to get deterministic output formats every time.'
          },
          {
            id: 'l-203',
            title: 'Iterative Refinement & Prompt Debugging Strategies',
            duration: '20 min',
            isFreePreview: false,
            contentNotes: 'What to do when the AI produces generic or incomplete outputs.'
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Commercial AI Image Creation & Visual Design',
        lessons: [
          {
            id: 'l-301',
            title: 'Midjourney Prompt Architecture: Lighting, Camera Lenses, & Styles',
            duration: '34 min',
            isFreePreview: false,
            contentNotes: 'How to control aesthetics, aspect ratios, seeds, and image weighting.'
          },
          {
            id: 'l-302',
            title: 'Consistent Characters and Product Mockups with AI',
            duration: '30 min',
            isFreePreview: false,
            contentNotes: 'Techniques for maintaining face and character consistency across multiple generations.'
          }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Real-World Capstone & Custom AI Assistants',
        lessons: [
          {
            id: 'l-401',
            title: 'Building Custom GPTs with Tailored Knowledge Files',
            duration: '32 min',
            isFreePreview: false,
            contentNotes: 'Step by step deployment of a specialized AI agent for your business.'
          },
          {
            id: 'l-402',
            title: 'Capstone Project Submission & Certification Criteria',
            duration: '18 min',
            isFreePreview: false,
            contentNotes: 'How to submit your completed capstone portfolio for personal review.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'কোর্সটি কি লাইভ নাকি রেকর্ডেড হবে?',
        answer: 'কোর্সের মূল লেকচারগুলো হাই-কোয়ালিটি প্রি-রেকর্ডেড ভিডিও আকারে দেওয়া থাকবে যা আপনি যেকোনো সময় দেখতে পারবেন। এছাড়াও প্রতি সপ্তাহে লাইভ প্রব্লেম সলভিং ও প্রশ্নোত্তর সেশন থাকবে।'
      },
      {
        question: 'আমি কি কোনো সার্টিফিকেট পাবো?',
        answer: 'হ্যাঁ, সম্পূর্ণ কোর্স এবং ক্যাপস্টোন প্রজেক্ট সফলভাবে সম্পন্ন করার পর আপনি AI Barta 24 ভেরিফাইড ডিজিটাল সার্টিফিকেট পাবেন।'
      },
      {
        question: 'কোর্স এক্সেস কত দিন থাকবে?',
        answer: 'একবার এনরোল করলে আপনার একাউন্টে কোর্সটির লাইফটাইম এক্সেস থাকবে।'
      }
    ],
    enrolledCount: 42,
    rating: 4.9,
    reviewsCount: 18,
    badge: 'Best Seller'
  },
  {
    id: 'course-ai-video-storytelling',
    slug: 'ai-video-generation-storytelling',
    title: 'AI Video Generation & Visual Storytelling for Creators',
    titleBn: 'এআই ভিডিও জেনারেশন ও ভিজ্যুয়াল স্টোরিটেলিং',
    subtitle: 'From text script to cinematic video: Master Runway, Kling, Luma Dream Machine, Suno AI, and ElevenLabs voice cloning.',
    subtitleBn: 'রানওয়ে, ক্লিং, সানও এবং ইলেভেনল্যাবস দিয়ে সিনেমাটিক ভিডিও ও অডিও তৈরির পূর্ণাঙ্গ কোর্স।',
    description: 'Learn the end-to-end craft of creating ultra-realistic AI videos, cinematic ads, music, and voiceovers. This course takes you from script ideation with LLMs, generating keyframes, synthesizing coherent motion, to professional timeline sound design.',
    descriptionBn: 'ভিডিও মেকিং এবং কনটেন্ট ক্রিয়েশনে এআই-এর যুগান্তকারী ব্যবহার শিখুন। স্ক্রিপ্ট লেখা থেকে শুরু করে ভয়েস ক্লোনিং, সিনেমাটিক ক্যামেরা মুভমেন্ট এবং কমপ্লিট ভিডিও এডিটিং এর বাস্তব অভিজ্ঞতা অর্জন করুন।',
    category: 'Video & Audio AI',
    level: 'Intermediate',
    duration: '10 Hours',
    totalLessons: 20,
    originalPrice: 4000,
    discountPrice: 2200,
    currency: '৳',
    isPublished: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    instructor: {
      name: 'Mahmudul Hasan',
      title: 'AI Educator & Founder, AI Barta 24',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Practicing AI trainer helping learners demystify cutting-edge generative tools and build scalable personal workflows.'
    },
    outcomes: [
      'Write cinematic prompts that guide realistic camera pans, tilts, and motion zoom',
      'Generate ultra-realistic human voices in multiple languages and accents with ElevenLabs',
      'Compose original background music and sound effects using Suno & Udio',
      'Assemble clips, lip-sync audio, and color grade in CapCut / Premiere Pro'
    ],
    requirements: [
      'Basic familiarity with computer navigation',
      'A PC or laptop capable of running standard web browsers and basic video editing tools'
    ],
    targetAudience: [
      'YouTubers, TikTokers & Social Media Video Creators',
      'Agency Creatives & Motion Designers',
      'Storytellers, educators, and indie filmmakers'
    ],
    curriculum: [
      {
        id: 'mod-v1',
        title: 'Module 1: The AI Video Pipeline Overview',
        lessons: [
          {
            id: 'l-v101',
            title: 'Deconstructing the Modern AI Film Pipeline',
            duration: '15 min',
            isFreePreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            contentNotes: 'The four-step process: Scripting -> Keyframing -> Motion generation -> Audio mastering.'
          },
          {
            id: 'l-v102',
            title: 'Generating Storyboards and Cinematic Keyframes',
            duration: '22 min',
            isFreePreview: false,
            contentNotes: 'Setting aspect ratios, lighting continuity, and camera perspectives.'
          }
        ]
      },
      {
        id: 'mod-v2',
        title: 'Module 2: Motion Synthesis & Camera Direction',
        lessons: [
          {
            id: 'l-v201',
            title: 'Runway Gen-3 Alpha & Motion Brush Techniques',
            duration: '28 min',
            isFreePreview: false,
            contentNotes: 'Directing precise subject motions and camera trajectories.'
          },
          {
            id: 'l-v202',
            title: 'Kling AI & Luma Dream Machine for Hyper-Real Physics',
            duration: '26 min',
            isFreePreview: false,
            contentNotes: 'Handling complex human actions and continuous movement.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'ভিডিও জেনারেশনের টুলগুলো কি ফ্রী ব্যবহার করা যায়?',
        answer: 'আমরা কোর্সে ফ্রি ক্রেডিট অপ্টিমাইজেশন পদ্ধতি এবং সাশ্রয়ীভাবে প্রজেক্ট করার কৌশল বিস্তারিতভাবে আলোচনা করেছি।'
      }
    ],
    enrolledCount: 29,
    rating: 4.8,
    reviewsCount: 11,
    badge: 'Popular'
  },
  {
    id: 'course-ai-automation-n8n',
    slug: 'ai-automation-workflows-n8n-make',
    title: 'No-Code AI Automation: Building Scalable Agents with Make & n8n',
    titleBn: 'নো-কোড এআই অটোমেশন: Make ও n8n দিয়ে স্মার্ট ওয়ার্কফ্লো',
    subtitle: 'Automate content research, customer communication, and business tasks without writing complex backend code.',
    subtitleBn: 'কোডিং ছাড়া ব্যবসা এবং কনটেন্টের অটোমেশন সিস্টেম তৈরি করুন।',
    description: 'Learn to build powerful automated pipelines connecting AI models to Google Sheets, Telegram, WhatsApp, Gmail, and social networks. Boost your team productivity 10x with autonomous workflows.',
    descriptionBn: 'দৈনন্দিন পুনরাবৃত্তিমূলক কাজগুলোকে অটোমেট করতে শিখুন। গুগল শিটস, ইমেইল এবং মেসেজিং অ্যাপের সাথে চ্যাটজিপিটি ও ক্লড কানেক্ট করে স্মার্ট বিজনেস ওয়ার্কফ্লো তৈরি করুন।',
    category: 'Automation & Productivity',
    level: 'Intermediate',
    duration: '12 Hours',
    totalLessons: 22,
    originalPrice: 4200,
    discountPrice: 2300,
    currency: '৳',
    isPublished: true,
    isFeatured: false,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    instructor: {
      name: 'Mahmudul Hasan',
      title: 'AI Educator & Founder, AI Barta 24',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Practicing AI trainer helping learners demystify cutting-edge generative tools and build scalable personal workflows.'
    },
    outcomes: [
      'Connect LLM APIs to Make.com and self-hosted n8n workflows',
      'Build an autonomous content publishing engine that drafts and schedules posts',
      'Create an automated AI inquiry responder for WhatsApp & Email',
      'Understand webhook triggers, JSON payloads, and error fallback nodes'
    ],
    requirements: [
      'Basic logical thinking',
      'Familiarity with web services like Google Drive and email'
    ],
    targetAudience: [
      'Business owners wanting to automate operations',
      'Digital marketers handling multiple clients',
      'Productivity enthusiasts seeking to save 20+ hours a week'
    ],
    curriculum: [
      {
        id: 'mod-a1',
        title: 'Module 1: Introduction to No-Code AI Integrations',
        lessons: [
          {
            id: 'l-a101',
            title: 'Understanding Webhooks, APIs, and Workflow Triggers',
            duration: '18 min',
            isFreePreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            contentNotes: 'Foundational concepts of automated webhooks without coding.'
          }
        ]
      }
    ],
    enrolledCount: 19,
    rating: 4.9,
    reviewsCount: 7
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'The Ultimate Generative AI & Prompt Engineering Cheat Sheet (PDF)',
    type: 'pdf',
    fileUrl: '#download-prompt-cheatsheet',
    fileSize: '4.8 MB',
    isPremium: false,
    downloadCount: 384,
    description: 'Comprehensive 24-page quick reference containing 50+ tested prompt formulas, persona templates, and error-handling techniques.'
  },
  {
    id: 'res-2',
    title: 'Midjourney Commercial Parameter & Camera Angle Guide',
    type: 'pdf',
    fileUrl: '#download-midjourney-guide',
    fileSize: '6.2 MB',
    isPremium: false,
    downloadCount: 295,
    description: 'Visual reference guide showcasing 40+ artistic styles, focal lengths, aperture values, and lighting terminologies for AI art.'
  },
  {
    id: 'res-3',
    title: '50+ High-Conversion Copywriting Prompts for Bengali & English',
    type: 'prompt',
    fileUrl: '#download-copywriting-prompts',
    fileSize: '1.2 MB',
    isPremium: true,
    downloadCount: 167,
    description: 'Tested prompt architectures for landing page copy, email sequences, video hooks, and social carousels.'
  },
  {
    id: 'res-4',
    title: 'Make.com & n8n AI Content Pipeline Workflow Blueprint (JSON/ZIP)',
    type: 'zip',
    fileUrl: '#download-automation-blueprints',
    fileSize: '8.5 MB',
    isPremium: true,
    downloadCount: 120,
    description: 'Ready-to-import blueprint files for automated YouTube/Blog research, drafting, and Telegram alert triggers.'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'prompt-engineering-principles-2026',
    title: 'The 5 Non-Negotiable Rules of Systemic Prompt Engineering in 2026',
    titleBn: '২০২৬ সালে প্রম্পট ইঞ্জিনিয়ারিংয়ের ৫টি মৌলিক নিয়ম',
    excerpt: 'Why casual conversation prompts fail, and how structured conditioning leads to deterministic, reliable AI outputs.',
    excerptBn: 'সাধারণ চ্যাটের চেয়ে স্ট্রাকচার্ড প্রম্পটিং কেন অনেক বেশি নিখুঁত ও প্রফেশনাল ফলাফল দেয়—বিশ্লেষণ।',
    content: `When most beginners start using AI tools like Claude, ChatGPT, or Gemini, they treat the model like an intuitive human friend. They type vague requests like *"Write me a good post about marketing"*, and then feel disappointed when the output sounds generic, repetitive, and bland.

In this guide, we break down five systemic prompt engineering principles that transform AI from a trivial chatbot into an indispensable thinking partner:

### 1. Give Explicit Operational Roles
Before specifying the task, establish the cognitive domain. For example, instead of asking for marketing tips, state:
> *"You are an elite B2B product marketing director with 15 years of experience in enterprise software. Analyze this product positioning..."*

### 2. Define Strict Negative Constraints
Language models naturally expand into verbosity unless reined in. Always include what the AI must NOT do:
- No generic transition cliches (e.g., "In today's fast-paced digital world").
- Keep paragraphs under 3 sentences.
- Avoid hyperbole.

### 3. Provide Structural Conditioning (Few-Shot)
Provide at least one ideal example of the desired format. The model mirrors the cadence, tone, and depth of the input.

### 4. Separate Reasoning from Output Generation
For intricate tasks, instruct the model to first output a 'thinking' scratchpad analyzing the constraints before drafting the final response.

### 5. Iterative Refinement Loops
Professional AI output is never generated in a single prompt. Treat the first response as a draft, then apply specific editorial critique.`,
    contentBn: `অধিকাংশ মানুষ যখন চ্যাটজিপিটি বা ক্লড ব্যবহার শুরু করেন, তখন তারা সাধারণ কথাবার্তার মতো নির্দেশনা দেন। ফলে এআই যে আউটপুট দেয় তা অনেক সময় রোবোটিক এবং সাধারণ শোনায়।

বাস্তব জীবনে পেশাদার কাজ করতে হলে প্রম্পটিংকে একটি সিস্টেম হিসেবে দেখতে হবে:
১. সুনির্দিষ্ট রোল বা ভূমিকা নির্ধারণ করা।
২. নেগেটিভ কনস্ট্রেইন্ট বা কি কি করা যাবে না তা বলে দেওয়া।
৩. কয়েকটি ভালো উদাহরণের মাধ্যমে এআইকে ট্রেন বা কন্ডিশন করা।
৪. ধাপে ধাপে আউটপুট রিফাইন করা।`,
    author: 'Mahmudul Hasan',
    category: 'Prompt Engineering',
    tags: ['Generative AI', 'Prompt Engineering', 'Productivity', 'ChatGPT'],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    isPublished: true,
    publishedAt: '2026-09-15'
  },
  {
    id: 'post-2',
    slug: 'ai-video-tools-comparison',
    title: 'Runway Gen-3, Kling, or Luma: Which AI Video Generator is Right for You?',
    titleBn: 'রানওয়ে, ক্লিং নাকি লুমা: আপনার জন্য কোনটি সেরা এআই ভিডিও টুল?',
    excerpt: 'An objective breakdown of motion coherence, camera control, prompt adherence, and render pricing for modern creators.',
    excerptBn: 'এআই ভিডিও তৈরিতে ক্যামেরা কন্ট্রোল, গতি ও মানের দিক থেকে সেরা টুল নির্বাচনের গাইডলাইন।',
    content: `Video generation has leaped forward at breakneck speed. Only twelve months ago, AI video was notorious for morphing limbs and melted physics. Today, state-of-the-art models render photorealistic camera moves and physics-accurate interactions.

In this deep dive, we compare the top three generators currently dominating professional workflows:

### Runway Gen-3 Alpha
- **Strengths**: Unmatched cinematic control, sophisticated Motion Brush, and multi-camera directions.
- **Ideal For**: Commercial advertising, fashion films, and stylized aesthetic scenes.

### Kling AI
- **Strengths**: Superior human anatomy preservation, realistic facial expressions, and natural walking cycles.
- **Ideal For**: Character-driven narratives and documentary re-enactments.

### Luma Dream Machine
- **Strengths**: Lightning-fast render times, wide dynamic range, and seamless loop creation.
- **Ideal For**: Social media motion graphics and high-frequency content experiments.`,
    contentBn: `বর্তমানে এআই দিয়ে চমৎকার সিনেমাটিক ভিডিও তৈরি করা সম্ভব। এই আর্টিকেলে আমরা রানওয়ে, ক্লিং এবং লুমার মূল পার্থক্য এবং বাস্তব প্রজেক্টে ব্যবহারের সুবিধাগুলো আলোচনা করেছি।`,
    author: 'Mahmudul Hasan',
    category: 'AI Video',
    tags: ['Video AI', 'Runway', 'Kling', 'Content Creation'],
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    isPublished: true,
    publishedAt: '2026-09-28'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    studentName: 'Tanvir Ahmed',
    studentRole: 'Digital Content Creator & Freelancer',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    courseTitle: 'Generative AI Masterclass',
    rating: 5,
    feedback: 'Mahmudul Hasan brother explains complex AI tools in clear, everyday Bengali. The prompt engineering framework alone saved me hours every week on content research and client scripts.',
    feedbackBn: 'মাহমুদুল ভাই অত্যন্ত সহজ ও সাবলীল ভাষায় জটিল বিষয়গুলো বুঝিয়ে দেন। কোর্সের প্রম্পট আর্কিটেকচার শেখার পর আমার ফ্রিল্যান্সিং কাজের গতি অনেক বেড়ে গেছে।',
    isApproved: true,
    createdAt: '2026-09-10'
  },
  {
    id: 'test-2',
    studentName: 'Farhana Kabir',
    studentRole: 'Marketing Specialist',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    courseTitle: 'Generative AI Masterclass',
    rating: 5,
    feedback: 'The practical workflow emphasis is what sets AI Barta 24 apart. No empty hype, just actionable steps to generate high quality visual assets and copy.',
    feedbackBn: 'শুধু তাত্ত্বিক আলোচনা নয়, একদম বাস্তবসম্মতভাবে টুলসের ব্যবহার শেখানো হয়েছে। বিশেষ করে ইমেজ জেনারেশনের টেকনিকগুলো অসাধারণ লেগেছে।',
    isApproved: true,
    createdAt: '2026-09-20'
  },
  {
    id: 'test-3',
    studentName: 'Zubair Hossain',
    studentRole: 'Computer Science Student',
    studentAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200',
    courseTitle: 'AI Automation Workflows',
    rating: 5,
    feedback: 'Connecting LLMs to webhooks and automation nodes was eye-opening. The step-by-step guidance made building my first automated research bot completely smooth.',
    feedbackBn: 'ওয়েবহুক আর অটোমেশন দিয়ে যে এত সহজে এআই সিস্টেম বানানো যায় তা এই কোর্স না করলে বুঝতে পারতাম না। ধন্যবাদ মাহমুদ ভাইয়াকে।',
    isApproved: true,
    createdAt: '2026-10-01'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is AI Barta 24?',
    questionBn: 'AI Barta 24 কী এবং এর মূল উদ্দেশ্য কী?',
    answer: 'AI Barta 24 is the premier online education platform founded by Mahmudul Hasan to deliver structured, practical, and hands-on learning in Generative Artificial Intelligence, Prompt Engineering, and Automation, primarily presented in Bengali with global standards.',
    answerBn: 'AI Barta 24 হলো মাহমুদুল হাসান কর্তৃক প্রতিষ্ঠিত একটি বিশেষায়িত অনলাইন লার্নিং প্ল্যাটফর্ম। এর উদ্দেশ্য বাংলাভাষী শিক্ষার্থীদের জন্য জেনারেটিভ এআই, প্রম্পট ইঞ্জিনিয়ারিং এবং অটোমেশনের মতো ভবিষ্যৎ দক্ষতাকে সহজবোধ্য ও ব্যবহারিক উপায়ে উপস্থাপন করা।',
    category: 'General',
    order: 1,
    isPublished: true,
  },
  {
    id: 'faq-2',
    question: 'Do I need prior coding experience to take these courses?',
    questionBn: 'কোর্সগুলো করতে কি পূর্বে কোনো কোডিং জানা প্রয়োজন?',
    answer: 'No. The foundational courses are engineered from first principles so that anyone with basic computer navigation skills can follow along. For advanced automation modules, zero-code visual builders like Make and n8n are utilized.',
    answerBn: 'না, কোনো পূর্ব কোডিং জ্ঞান ছাড়াই আপনি কোর্সগুলো শুরু করতে পারেন। আমরা জটিল প্রোগ্রামিংয়ের বদলে নো-কোড টুলস এবং লজিক্যাল প্রম্পটিং ফ্রেমওয়ার্ক শেখাই।',
    category: 'Prerequisites',
    order: 2,
    isPublished: true,
  },
  {
    id: 'faq-3',
    question: 'How do I enroll and pay via bKash, Nagad, or Bank Transfer?',
    questionBn: 'বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে কীভাবে পেমেন্ট ও এনরোল করব?',
    answer: 'Select your preferred course, click "Enroll Now", and choose bKash, Nagad, Rocket, or Bank Transfer. Follow the on-screen instructions to send the fee, enter your sender number and transaction ID (TrxID), and submit. Once verified by our team, your course will be instantly unlocked in your Student Dashboard.',
    answerBn: 'পছন্দের কোর্সে গিয়ে "Enroll Now" বাটনে ক্লিক করুন। এরপর বিকাশ, নগদ, রকেট বা ব্যাংক সিলেক্ট করে উল্লেখিত নাম্বারে সেন্ড মানি করুন। এরপর আপনার প্রেরক নাম্বার ও TrxID সাবমিট করলেই আমাদের টিম যাচাই করে আপনার স্টুডেন্ট ড্যাশবোর্ডে কোর্সটি আনলক করে দেবে।',
    category: 'Payment',
    order: 3,
    isPublished: true,
  },
  {
    id: 'faq-4',
    question: 'How long will I have access to course materials?',
    questionBn: 'কোর্সের ভিডিও ও রিসোর্স কতদিন দেখা যাবে?',
    answer: 'Once enrolled and approved, you enjoy lifetime access to the course lectures, project files, and updates inside your AI Barta 24 student portal.',
    answerBn: 'একবার এনরোলমেন্ট অ্যাপ্রুভ হলে আপনার একাউন্টে কোর্সটি আজীবন থাকবে। আপনি যেকোনো সময় যেকোনো ডিভাইস থেকে লগইন করে লেকচারগুলো দেখতে পারবেন।',
    category: 'Access',
    order: 4,
    isPublished: true,
  },
  {
    id: 'faq-5',
    question: 'Can I ask questions and get instructor support?',
    questionBn: 'কোর্স চলাকালীন কোনো সমস্যায় সরাসরি ইনস্ট্রাক্টরের সাপোর্ট পাওয়া যাবে?',
    answer: 'Yes! Enrolled students receive access to our dedicated community forum and weekly live Q&A sessions where Mahmudul Hasan personally assists with assignments and technical roadblocks.',
    answerBn: 'হ্যাঁ! প্রতিটি কোর্সের সাথে ডেডিকেটেড ডিসকাশন সাপোর্ট এবং সাপ্তাহিক লাইভ প্রশ্নোত্তর সেশন থাকে, যেখানে মাহমুদুল হাসান সরাসরি শিক্ষার্থীদের প্রশ্নের উত্তর দিয়ে থাকেন।',
    category: 'Support',
    order: 5,
    isPublished: true,
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp-aibarta24',
    code: 'AIBARTA24',
    discountPercent: 15,
    validUntil: '2026-12-31',
    usageCount: 12,
    maxUsage: 500,
    isActive: true,
  },
  {
    id: 'cp-welcome',
    code: 'STARTAI',
    discountAmount: 300,
    validUntil: '2026-12-31',
    usageCount: 8,
    maxUsage: 200,
    isActive: true,
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Mahmudul Hasan (Admin)',
    email: 'admin@aibarta24.com',
    phone: '+880 1700-000000',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Founder and Lead Instructor at AI Barta 24.',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-student-1',
    name: 'Shakil Ahmed',
    email: 'student@example.com',
    phone: '+880 1812-345678',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    bio: 'Lifelong learner mastering AI tools.',
    createdAt: '2026-08-14'
  }
];
