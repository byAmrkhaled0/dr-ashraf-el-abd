// ============================================================
// ROUTES
// ============================================================
export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  TRANSFORMATIONS: '/transformations',
  BOOKING: '/booking',
  CLASSES: '/classes',
} as const;

// ============================================================
// TYPES
// ============================================================
export interface Package {
  id: string;
  name: string;
  nameAr: string;
  price: string;
  priceNote: string;
  priceNoteAr: string;
  badge?: string;
  badgeAr?: string;
  features: string[];
  featuresAr: string[];
  isPopular?: boolean;
  isVip?: boolean;
  cta: string;
  ctaAr: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  result: string;
  resultAr: string;
  duration: string;
  durationAr: string;
  text: string;
  textAr: string;
  image: string;
  flag: string;
}

export interface TransformationCard {
  id: string;
  name: string;
  nameAr: string;
  loss: string;
  lossAr: string;
  duration: string;
  durationAr: string;
  before: string;
  after: string;
  type: 'fat-loss' | 'muscle-gain' | 'body-recomp';
}

export interface ClassSchedule {
  id: string;
  name: string;
  nameAr: string;
  day: string;
  dayAr: string;
  time: string;
  trainer: string;
  spots: number;
  totalSpots: number;
  type: 'online' | 'live';
}

// ============================================================
// PACKAGES DATA
// ============================================================
export const PACKAGES: Package[] = [
  {
    id: 'basic',
    name: 'BASIC',
    nameAr: 'أساسي',
    price: '1,200 EGP',
    priceNote: '/month',
    priceNoteAr: '/شهر',
    badge: 'ENTRY LEVEL',
    badgeAr: 'مستوى البداية',
    features: [
      'Custom Nutrition Plan',
      'Weekly Workout Program',
      'WhatsApp Check-ins (2x/week)',
      'Progress Tracking',
      'Video Library Access',
    ],
    featuresAr: [
      'خطة تغذية مخصصة',
      'برنامج تمارين أسبوعي',
      'متابعة واتساب (مرتين/أسبوع)',
      'تتبع التقدم',
      'مكتبة فيديوهات تدريبية',
    ],
    cta: 'Start Now',
    ctaAr: 'ابدأ دلوقتي',
  },
  {
    id: 'pro',
    name: 'PRO',
    nameAr: 'برو',
    price: '2,800 EGP',
    priceNote: '/month',
    priceNoteAr: '/شهر',
    badge: 'MOST POPULAR 🔥',
    badgeAr: 'الأكثر طلباً 🔥',
    features: [
      'Everything in Basic',
      'Daily WhatsApp Support',
      'Weekly Video Feedback',
      'Supplement Protocol',
      'Competition Prep Guide',
      'Monthly Video Calls',
    ],
    featuresAr: [
      'كل حاجة في الأساسي',
      'دعم واتساب يومي',
      'تغذية راجعة فيديو أسبوعية',
      'بروتوكول سابلمنت',
      'دليل تحضير البطولات',
      'مكالمات فيديو شهرية',
    ],
    isPopular: true,
    cta: 'Join the PRO',
    ctaAr: 'انضم للبرو',
  },
  {
    id: 'vip',
    name: 'VIP ELITE',
    nameAr: 'VIP النخبة',
    price: '5,500 EGP',
    priceNote: '/month',
    priceNoteAr: '/شهر',
    badge: '⚠️ LIMITED — 5 SPOTS',
    badgeAr: '⚠️ محدود — 5 أماكن فقط',
    features: [
      'Everything in PRO',
      '24/7 Direct Access',
      'Bi-weekly Video Calls',
      'Blood Work Analysis',
      'Posing & Stage Coaching',
      'Lifetime Transformation Plan',
      'Priority Response < 2 Hours',
    ],
    featuresAr: [
      'كل حاجة في البرو',
      'وصول مباشر 24/7',
      'مكالمات فيديو كل أسبوعين',
      'تحليل نتائج الدم',
      'تدريب الوقفة والمسرح',
      'خطة تحول مدى الحياة',
      'رد أولوية أقل من ساعتين',
    ],
    isVip: true,
    cta: 'Claim Your VIP Spot',
    ctaAr: 'احجز مكانك VIP',
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed M.',
    nameAr: 'أحمد م.',
    result: '-24 kg',
    resultAr: '-24 كجم',
    duration: '5 months',
    durationAr: '5 شهور',
    text: "Dr. Ashraf didn't just give me a diet. He rebuilt my entire relationship with food and training. I went from 98kg to 74kg. This is not coaching — this is transformation surgery.",
    textAr: 'د. أشرف مش بس كاتبلي دايت. هو أعاد بناء علاقتي بالأكل والتمارين بالكامل. وصلت من 98 كيلو لـ74 كيلو. ده مش كوتشينج — ده عملية تحويل كاملة.',
    image: 'https://images.unsplash.com/photo-1583500178495-4c7e93a56b3c?w=400&q=80',
    flag: '🇪🇬',
  },
  {
    id: '2',
    name: 'Omar K.',
    nameAr: 'عمر ك.',
    result: '+12 kg muscle',
    resultAr: '+12 كجم عضل',
    duration: '8 months',
    durationAr: '8 شهور',
    text: 'I tried 4 different coaches before Dr. Ashraf. None of them understood my body like he did. Scientific, precise, and results that shocked everyone at my gym.',
    textAr: 'جربت 4 كوتشيز قبل د. أشرف. محدش فهم جسمي زيه. علمي، دقيق، ونتائج صدمت الكل في الجيم.',
    image: 'https://images.unsplash.com/photo-1583500178048-f5c4013b4ab9?w=400&q=80',
    flag: '🇸🇦',
  },
  {
    id: '3',
    name: 'Khalid R.',
    nameAr: 'خالد ر.',
    result: 'Competition Ready',
    resultAr: 'جاهز للبطولة',
    duration: '12 months',
    durationAr: '12 شهر',
    text: "Went from zero to competing in my first IFBB show — all under Dr. Ashraf's guidance. His knowledge as a judge + coach combination is unmatched in the region.",
    textAr: 'من صفر لأول بطولة IFBB ليا — كلها تحت إشراف د. أشرف. معرفته كحكم وكوتش في نفس الوقت مفيش زيها في المنطقة.',
    image: 'https://images.unsplash.com/photo-1584952811368-02328c3e7eb3?w=400&q=80',
    flag: '🇦🇪',
  },
  {
    id: '4',
    name: 'Sara T.',
    nameAr: 'سارة ت.',
    result: '-18 kg fat',
    resultAr: '-18 كجم دهون',
    duration: '6 months',
    durationAr: '6 شهور',
    text: "As a woman, I was skeptical. But Dr. Ashraf's approach is completely scientific — no starvation, no extreme cardio. Just results. My confidence is back.",
    textAr: 'كامرأة كنت شاكة. لكن نهج د. أشرف علمي بالكامل — مفيش جوع، مفيش كارديو مبالغ فيه. بس نتايج. ثقتي بنفسي رجعت.',
    image: 'https://images.unsplash.com/photo-1584952807377-b52cbfc8aaec?w=400&q=80',
    flag: '🇪🇬',
  },
];

// ============================================================
// STATS
// ============================================================
export const STATS = [
  { number: '500+', label: 'Transformations', labelAr: 'تحول حقيقي' },
  { number: '15+', label: 'Years Experience', labelAr: 'سنة خبرة' },
  { number: '15+', label: 'Countries', labelAr: 'دولة' },
  { number: '98%', label: 'Success Rate', labelAr: 'نسبة نجاح' },
];

// ============================================================
// CLASSES SCHEDULE
// ============================================================
export const CLASSES_SCHEDULE: ClassSchedule[] = [
  {
    id: '1',
    name: 'Fat Burn Masterclass',
    nameAr: 'ماستركلاس حرق الدهون',
    day: 'Sunday',
    dayAr: 'الأحد',
    time: '7:00 PM (Cairo)',
    trainer: 'Dr. Ashraf',
    spots: 3,
    totalSpots: 20,
    type: 'online',
  },
  {
    id: '2',
    name: 'Muscle Building Blueprint',
    nameAr: 'بلوبرينت بناء العضل',
    day: 'Tuesday',
    dayAr: 'الثلاثاء',
    time: '8:00 PM (Cairo)',
    trainer: 'Dr. Ashraf',
    spots: 7,
    totalSpots: 20,
    type: 'online',
  },
  {
    id: '3',
    name: 'Competition Prep Intensive',
    nameAr: 'إنتنسيف تحضير البطولات',
    day: 'Thursday',
    dayAr: 'الخميس',
    time: '9:00 PM (Cairo)',
    trainer: 'Dr. Ashraf',
    spots: 2,
    totalSpots: 15,
    type: 'live',
  },
  {
    id: '4',
    name: 'Nutrition Science Lab',
    nameAr: 'معمل علوم التغذية',
    day: 'Saturday',
    dayAr: 'السبت',
    time: '6:00 PM (Cairo)',
    trainer: 'Dr. Ashraf',
    spots: 5,
    totalSpots: 25,
    type: 'online',
  },
];

// ============================================================
// IMAGE URLS
// ============================================================
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1598767781238-3995fe11be79?w=1600&q=90',
  heroGym: 'https://images.unsplash.com/photo-1637651684506-07e16fcf7b06?w=1600&q=80',
  bodybuilder: '/images/DR ASHRAF.jpg',
  barbell: 'https://images.unsplash.com/photo-1709315957145-a4bad1feef28?w=1200&q=80',
  goldAbstract: 'https://images.unsplash.com/photo-1647101734210-ff5d79813069?w=1600&q=80',
  transform1Before: 'https://images.unsplash.com/photo-1584952811178-17383f34d7f4?w=600&q=80',
  transform1After: 'https://images.unsplash.com/photo-1583500178495-4c7e93a56b3c?w=600&q=80',
  transform2Before: 'https://images.unsplash.com/photo-1584952811320-7e85d8f3a5c4?w=600&q=80',
  transform2After: 'https://images.unsplash.com/photo-1583500178048-f5c4013b4ab9?w=600&q=80',
  transform3Before: 'https://images.unsplash.com/photo-1584952807377-b52cbfc8aaec?w=600&q=80',
  transform3After: 'https://images.unsplash.com/photo-1584952811368-02328c3e7eb3?w=600&q=80',
  competition: 'https://images.unsplash.com/photo-1655238785350-fb8009f49a0f?w=1200&q=80',
  workout: 'https://images.unsplash.com/photo-1645362841580-965e3171912b?w=1200&q=80',
};

// ============================================================
// UTILS
// ============================================================
export const WHATSAPP_NUMBER = '201027570204';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'I want to start my transformation with Dr. Ashraf'
)}`;
export const WHATSAPP_URL_AR = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'أريد أن أبدأ رحلتي مع د. أشرف'
)}`;

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}