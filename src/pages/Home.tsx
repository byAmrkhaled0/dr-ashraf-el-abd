import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Camera,
  Clock3,
  Crown,
  Dumbbell,
  Flame,
  GraduationCap,
  HeartPulse,
  MapPin,
  MessageCircle,
  Moon,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { IMAGES, ROUTE_PATHS } from '@/lib/index';

const PHONE = '201027570204';
const WHATSAPP_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  'مرحبا، أريد الاستفسار عن الخدمات والحجز'
)}`;

const DEVELOPER_WHATSAPP = 'https://wa.me/201008454029';

const FACEBOOK_LINK = 'https://www.facebook.com/share/1DTjxnAxVL/?mibextid=wwXIfr';
const INSTAGRAM_LINK =
  'https://www.instagram.com/dr.ashraf_el_abd?igsh=c2tpamFreXFuaGI%3D&utm_source=qr';
const TIKTOK_LINK = 'https://www.tiktok.com/@dr..ashraf.el.abd?_r=1&_t=ZS-95g5Q6SZ8zp';

const HOME_PATH = ROUTE_PATHS?.HOME ?? '/';
const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? '/about';
const SERVICES_PATH = ROUTE_PATHS?.SERVICES ?? '/services';
const CLASSES_PATH = ROUTE_PATHS?.CLASSES ?? '/classes';
const BOOKING_PATH = ROUTE_PATHS?.BOOKING ?? '/booking';

type Lang = 'ar' | 'en';
type ThemeMode = 'dark' | 'light';

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56v1.91h2.77l-.44 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.25 1.65a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.28 2.2 1.53 3.87 3.5 4.61v2.78c-1.43-.04-2.75-.46-3.93-1.24v5.53c0 3.85-2.94 6.32-6.26 6.32A6.2 6.2 0 0 1 3.6 14.8c0-3.43 2.7-6.19 6.18-6.19.3 0 .59.02.88.08v2.96a3.5 3.5 0 0 0-.88-.11 3.25 3.25 0 0 0-3.25 3.26 3.29 3.29 0 0 0 3.4 3.27c1.85 0 3.2-1.18 3.2-3.68V3h3.37Z" />
    </svg>
  );
}

function BrandLogo({
  colors,
  size = 54,
}: {
  colors: {
    gold: string;
    goldSoft: string;
    border: string;
    glow: string;
  };
  size?: number;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        background: `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.02))`,
        border: `1px solid ${colors.border}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: colors.glow,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        color: colors.gold,
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), transparent 40%)',
          pointerEvents: 'none',
        }}
      />
      <Dumbbell size={size * 0.44} strokeWidth={2.2} />
    </span>
  );
}

function HoverCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SocialLinkCard({
  href,
  icon,
  title,
  subtitle,
  colors,
  accentColor,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  colors: {
    border: string;
    bgSoft: string;
    text: string;
    textMuted: string;
    shadow: string;
    goldSoft: string;
  };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        border: `1px solid ${hovered ? accentColor : colors.border}`,
        background: hovered
          ? `linear-gradient(135deg, ${colors.bgSoft}, rgba(255,255,255,0.02))`
          : colors.bgSoft,
        color: colors.text,
        borderRadius: 22,
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: hovered ? '0 18px 40px rgba(0,0,0,0.16)' : colors.shadow,
        transition: 'all 0.28s ease',
        minHeight: 78,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <span
        style={{
          width: 50,
          height: 50,
          borderRadius: 16,
          background: hovered ? `${accentColor}15` : colors.goldSoft,
          color: accentColor,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.28s ease',
        }}
      >
        {icon}
      </span>

      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontWeight: 900 }}>{title}</span>
        <span style={{ color: colors.textMuted, fontSize: 13 }}>{subtitle}</span>
      </span>
    </a>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const isAr = lang === 'ar';
  const isDark = theme === 'dark';
  const isLightboxOpen = activeImageIndex !== null;

  const colors = useMemo(
    () => ({
      bg: isDark ? '#06080c' : '#f6efe3',
      bgSoft: isDark ? '#0e131b' : '#fffaf4',
      bgCard: isDark ? '#121823' : '#ffffff',
      section: isDark ? '#0a0f16' : '#efe4d5',
      sectionAlt: isDark ? '#090d14' : '#faf2e8',
      text: isDark ? '#f8f3ea' : '#171717',
      textSoft: isDark ? 'rgba(248,243,234,0.83)' : 'rgba(23,23,23,0.78)',
      textMuted: isDark ? 'rgba(248,243,234,0.56)' : 'rgba(23,23,23,0.56)',
      gold: '#d4a63f',
      goldSoft: isDark ? 'rgba(212,166,63,0.12)' : 'rgba(212,166,63,0.14)',
      goldStrong: isDark ? 'rgba(212,166,63,0.24)' : 'rgba(212,166,63,0.22)',
      border: isDark ? 'rgba(212,166,63,0.16)' : 'rgba(212,166,63,0.20)',
      heroOverlay: isDark
        ? 'linear-gradient(180deg, rgba(6,8,12,0.92) 0%, rgba(6,8,12,0.60) 42%, rgba(6,8,12,0.98) 100%)'
        : 'linear-gradient(180deg, rgba(246,239,227,0.88) 0%, rgba(246,239,227,0.64) 42%, rgba(246,239,227,0.97) 100%)',
      shadow: isDark ? '0 24px 70px rgba(0,0,0,0.36)' : '0 18px 46px rgba(0,0,0,0.08)',
      accent: isDark ? '#25D366' : '#1ea952',
      glow: isDark
        ? '0 0 0 1px rgba(212,166,63,0.08), 0 24px 60px rgba(0,0,0,0.34)'
        : '0 0 0 1px rgba(212,166,63,0.16), 0 18px 45px rgba(0,0,0,0.08)',
      heroPanel: isDark ? 'rgba(13,17,25,0.76)' : 'rgba(255,255,255,0.87)',
      headerBg: isDark ? 'rgba(6,8,12,0.82)' : 'rgba(255,255,255,0.86)',
      footerTop: isDark ? '#0d1117' : '#fbf7ef',
      footerBottom: isDark ? '#080b10' : '#f2eadc',
      heroButton: 'linear-gradient(135deg, #d4a63f, #f0ca6b)',
      whatsappGlow: '0 12px 38px rgba(37, 211, 102, 0.28)',
      modalOverlay: 'rgba(5, 7, 11, 0.88)',
      modalButtonBg: 'rgba(255,255,255,0.08)',
    }),
    [isDark]
  );

  const t = useMemo(
    () => ({
      brand: isAr ? 'د. أشرف العبد' : 'Dr. Ashraf El Abd',
      brandSub: isAr ? 'ONLINE COACH • ELITE TRANSFORMATION' : 'ONLINE COACH • ELITE TRANSFORMATION',
      home: isAr ? 'الرئيسية' : 'Home',
      navAbout: isAr ? 'نبذة عنا' : 'About',
      navServices: isAr ? 'الخدمات' : 'Services',
      navClasses: isAr ? 'الكلاسات' : 'Classes',
      navBooking: isAr ? 'الحجز' : 'Booking',
      navGallery: isAr ? 'النتائج' : 'Results',

      heroBadge: isAr ? 'ELITE FITNESS • ONLINE COACHING' : 'ELITE FITNESS • ONLINE COACHING',
      heroTitle1: isAr ? 'ابنِ جسمًا أقوى' : 'Build A Stronger',
      heroTitle2: isAr ? 'ونتيجة تُرى' : 'Body, Real Results',
      heroText: isAr
        ? 'تجربة تدريب أونلاين احترافية تجمع بين التدريب، التغذية، المتابعة، والاستشفاء داخل نظام واضح وملهم يساعدك تصل لهدفك بشكل أسرع وأذكى.'
        : 'A premium online coaching experience that combines training, nutrition, follow-up, and recovery inside a clear, motivating system built for real transformation.',
      heroPrimary: isAr ? 'ابدأ الآن على واتساب' : 'Start on WhatsApp',
      heroSecondary: isAr ? 'تعرف على خدماتنا' : 'Discover Our Services',
      heroClasses: isAr ? 'استكشف الكلاسات' : 'Explore Classes',
      heroBooking: isAr ? 'احجز الآن' : 'Book Now',

      introTitle: isAr ? 'منظومة تدريب متكاملة' : 'Complete Coaching System',
      introText: isAr
        ? 'محتوى وخطة ومتابعة وتنفيذ. كل شيء مبني ليعطيك وضوحًا وثقة ونتيجة حقيقية.'
        : 'Content, planning, follow-up, and execution. Everything is built to give you clarity, confidence, and visible results.',

      sectionServices: isAr ? 'الخدمات' : 'Services',
      sectionServicesTitle: isAr ? 'خدمات احترافية مصممة للنتيجة' : 'Professional Services Built For Results',
      sectionServicesText: isAr
        ? 'كل عنصر داخل المنظومة له دور واضح للوصول لهدفك بطريقة عملية ومستمرة.'
        : 'Every part of the system has a clear role in helping you reach your goal in a practical, sustainable way.',

      sectionResults: isAr ? 'النتائج' : 'Results',
      sectionResultsTitle: isAr ? 'نتائج وتحولات حقيقية' : 'Real Transformations',
      sectionResultsText: isAr
        ? 'صور التحولات الحقيقية بتعطي ثقة أكبر، وتوضح قوة النظام والالتزام والنتيجة.'
        : 'Real transformation visuals build trust and show the power of structure, discipline, and coaching.',

      sectionWhy: isAr ? 'لماذا هذه المنظومة؟' : 'Why This System?',
      sectionWhyTitle: isAr ? 'لأن النتيجة الكبيرة تحتاج خطة واضحة' : 'Because Big Results Need Clear Structure',
      sectionWhyText: isAr
        ? 'التحول الحقيقي لا يعتمد على الحماس فقط، بل على نظام، التزام، متابعة، وتعديل مستمر حسب حالتك وهدفك.'
        : 'Real transformation does not depend on motivation alone, but on structure, consistency, follow-up, and smart adjustments.',

      finalTitle: isAr ? 'جاهز تبدأ التغيير؟' : 'Ready To Transform?',
      finalText: isAr
        ? 'ابدأ محادثتك الآن، واعرف الخدمة المناسبة لك، وخطوتك الأولى.'
        : 'Start your conversation now, discover the best service for you, and get your first step.',
      finalBtn: isAr ? 'احجز استفسارك الآن' : 'Book Your Inquiry',
      serviceBtn: isAr ? 'اذهب إلى صفحة الخدمات' : 'Go To Services Page',

      footerText: isAr
        ? 'جميع الحجوزات والاستفسارات تتم مباشرة عبر واتساب.'
        : 'All bookings and inquiries are handled directly through WhatsApp.',
      footerRights: isAr
        ? 'جميع الحقوق محفوظة © د. أشرف العبد'
        : 'All rights reserved © Dr. Ashraf El Abd',
      developer: isAr
        ? 'تم البرمجة بواسطة المهندس عمرو خالد'
        : 'Developed by Eng. Amr Khaled',
      developerContact: isAr ? 'تواصل واتساب' : 'WhatsApp Contact',

      stat1: isAr ? '15+ سنة خبرة' : '15+ Years Experience',
      stat2: isAr ? '500+ عميل' : '500+ Clients',
      stat3: isAr ? 'حكم دولي IFBB' : 'IFBB International Judge',
      stat4: isAr ? 'نتائج حقيقية' : 'Real Results',

      eliteTag: isAr ? 'نظام احترافي' : 'Elite System',
      watchMore: isAr ? 'شاهد التفاصيل' : 'View Details',

      footerQuick: isAr ? 'روابط سريعة' : 'Quick Links',
      footerServices: isAr ? 'الخدمات الأساسية' : 'Core Services',
      footerContact: isAr ? 'بيانات التواصل' : 'Contact Info',
      footerFollow: isAr ? 'تابعنا' : 'Follow Us',
      footerLocation: isAr ? 'أونلاين + حجز مباشر عبر واتساب' : 'Online + direct WhatsApp booking',
      footerHours: isAr ? 'متابعة وحجز حسب المواعيد المتاحة' : 'Booking based on available schedule',
      whatsappNow: isAr ? 'راسلنا الآن' : 'Chat on WhatsApp',
      knowServices: isAr ? 'تعرف على خدماتنا' : 'Know Our Services',
      statsTitle: isAr ? 'أرقام ترفع الثقة' : 'Authority Metrics',
      socialWhatsapp: isAr ? 'واتساب' : 'WhatsApp',
      socialFacebook: isAr ? 'فيسبوك' : 'Facebook',
      socialInstagram: isAr ? 'إنستجرام' : 'Instagram',
      socialTikTok: isAr ? 'تيك توك' : 'TikTok',
      socialAction: isAr ? 'افتح الآن' : 'Open Now',
      langBadge: isAr ? 'E' : 'ع',
      heroMini1: isAr ? 'متابعة مستمرة' : 'Continuous Follow-up',
      heroMini2: isAr ? 'خطة مخصصة' : 'Custom Plan',
      heroMini3: isAr ? 'تحول حقيقي' : 'Real Transformation',
      resultLabel: isAr ? 'تحول' : 'Transformation',
      clickToView: isAr ? 'اضغط لعرض الصورة' : 'Click to view image',
      next: isAr ? 'التالي' : 'Next',
      prev: isAr ? 'السابق' : 'Previous',
      close: isAr ? 'إغلاق' : 'Close',
    }),
    [isAr]
  );

  const services = useMemo(
    () => [
      {
        icon: <Dumbbell size={20} />,
        title: isAr ? 'التدريب الأونلاين' : 'Online Coaching',
        desc: isAr
          ? 'برامج تدريب فردية حسب الهدف والمستوى والمتابعة المستمرة.'
          : 'Personalized training programs based on your goal, level, and continuous follow-up.',
      },
      {
        icon: <HeartPulse size={20} />,
        title: isAr ? 'برامج التغذية' : 'Nutrition Programs',
        desc: isAr
          ? 'تخسيس، زيادة وزن، بناء عضلات، ومقاومة الإنسولين.'
          : 'Fat loss, weight gain, muscle building, and insulin resistance support.',
      },
      {
        icon: <Trophy size={20} />,
        title: isAr ? 'تحضير البطولات' : 'Competition Prep',
        desc: isAr
          ? 'تحضير اللاعبين للمنافسات والظهور بأفضل جاهزية.'
          : 'Athlete preparation for contests and peak-condition presentation.',
      },
      {
        icon: <ShieldCheck size={20} />,
        title: isAr ? 'الاستشفاء والحجامة' : 'Recovery & Hijama',
        desc: isAr
          ? 'جلسات استشفاء وحجامة ومساج رياضي ضمن منظومة احترافية.'
          : 'Recovery sessions, hijama, and sports massage inside a professional system.',
      },
      {
        icon: <BookOpen size={20} />,
        title: isAr ? 'الكورسات والورش' : 'Courses & Workshops',
        desc: isAr
          ? 'كورسات أونلاين وورش عملية لتطوير المعرفة والخبرة.'
          : 'Online courses and practical workshops to develop knowledge and skill.',
      },
      {
        icon: <Users size={20} />,
        title: isAr ? 'إعداد المدربين والبوت كامب' : 'Trainer Education & Bootcamps',
        desc: isAr
          ? 'تأهيل المدربين، إدارة الفرق، والكلاسات الجماعية والبوت كامب.'
          : 'Trainer education, team leadership, group classes, and bootcamps.',
      },
      {
        icon: <GraduationCap size={20} />,
        title: isAr ? 'الكلاسات والجلسات التعليمية' : 'Classes & Education',
        desc: isAr
          ? 'محتوى تدريبي وتعليمي منظم للمهتمين بالمجال.'
          : 'Structured educational content for fitness learners and coaches.',
      },
      {
        icon: <Briefcase size={20} />,
        title: isAr ? 'الاستشارات والإدارة الرياضية' : 'Fitness Management & Consulting',
        desc: isAr
          ? 'خبرة عملية في إدارة الجيمات والفرق وتطوير الأداء.'
          : 'Practical experience in gym operations, teams, and performance development.',
      },
    ],
    [isAr]
  );

  const heroStats = useMemo(
    () => [
      { icon: <Star size={16} />, label: t.stat1, value: '15+', progress: '82%' },
      { icon: <Users size={16} />, label: t.stat2, value: '500+', progress: '92%' },
      { icon: <Target size={16} />, label: t.stat3, value: 'IFBB', progress: '78%' },
      { icon: <Flame size={16} />, label: t.stat4, value: '100%', progress: '88%' },
    ],
    [t]
  );

  const galleryImages = [
    '/IMAGE/be1.jpeg',
    '/IMAGE/be2.jpeg',
    '/IMAGE/be3.jpeg',
    '/IMAGE/be4.jpeg',
    '/IMAGE/be5.jpeg',
    '/IMAGE/be6.jpeg',
    '/IMAGE/be7.jpeg',
    '/IMAGE/be8.jpeg',
    '/IMAGE/be9.jpeg',
    '/IMAGE/jad.jpeg',
  ];

  const activeImage = activeImageIndex !== null ? galleryImages[activeImageIndex] : null;

  const openImage = (index: number) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const showNextImage = () => {
    setActiveImageIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % galleryImages.length;
    });
  };

  const showPrevImage = () => {
    setActiveImageIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + galleryImages.length) % galleryImages.length;
    });
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') {
        if (isAr) showPrevImage();
        else showNextImage();
      }
      if (event.key === 'ArrowLeft') {
        if (isAr) showNextImage();
        else showPrevImage();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, isAr]);

  const rootDir = isAr ? 'rtl' : 'ltr';
  const rootAlign = isAr ? 'right' : 'left';

  const navLinkBase = ({ isActive }: { isActive: boolean }) =>
    ({
      color: isActive ? colors.gold : colors.text,
      textDecoration: 'none',
      fontWeight: 800,
      fontSize: 14,
      padding: '11px 14px',
      borderRadius: 14,
      transition: '0.25s ease',
      background: isActive ? colors.goldSoft : 'transparent',
      border: `1px solid ${isActive ? colors.border : 'transparent'}`,
      boxShadow: isActive ? colors.glow : 'none',
    }) as const;

  const lightboxButtonStyle: CSSProperties = {
    width: 52,
    height: 52,
    borderRadius: '50%',
    border: `1px solid ${colors.border}`,
    background: colors.modalButtonBg,
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: '0.25s ease',
  };

  return (
    <div
      dir={rootDir}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        fontFamily: 'Cairo, sans-serif',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 55,
          background: colors.headerBg,
          backdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
        }}
      >
        <div
          style={{
            maxWidth: 1260,
            margin: '0 auto',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            flexWrap: 'wrap',
          }}
        >
          <NavLink
            to={HOME_PATH}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              minWidth: 220,
            }}
          >
            <BrandLogo colors={colors} />

            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ color: colors.gold, fontWeight: 900, fontSize: 21 }}>{t.brand}</span>
              <span
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  fontWeight: 800,
                  marginTop: 4,
                  letterSpacing: 1,
                }}
              >
                {t.brandSub}
              </span>
            </span>
          </NavLink>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              flex: 1,
            }}
          >
            <NavLink to={HOME_PATH} style={navLinkBase}>
              {t.home}
            </NavLink>
            <NavLink to={ABOUT_PATH} style={navLinkBase}>
              {t.navAbout}
            </NavLink>
            <NavLink to={SERVICES_PATH} style={navLinkBase}>
              {t.navServices}
            </NavLink>
            <NavLink to={CLASSES_PATH} style={navLinkBase}>
              {t.navClasses}
            </NavLink>
            <NavLink to={BOOKING_PATH} style={navLinkBase}>
              {t.navBooking}
            </NavLink>
            <a
              href="#results"
              style={{
                color: colors.text,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: 14,
                padding: '11px 14px',
                borderRadius: 14,
              }}
            >
              {t.navGallery}
            </a>
          </nav>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
              aria-label={isAr ? 'Change language' : 'تغيير اللغة'}
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bgSoft,
                color: colors.text,
                borderRadius: 14,
                width: 46,
                height: 46,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: colors.shadow,
                fontWeight: 900,
                fontSize: 15,
              }}
            >
              {t.langBadge}
            </button>

            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bgSoft,
                color: colors.text,
                borderRadius: 14,
                width: 46,
                height: 46,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: colors.shadow,
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: colors.heroButton,
                color: '#111',
                textDecoration: 'none',
                padding: '11px 18px',
                borderRadius: 14,
                fontWeight: 900,
                boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <MessageCircle size={16} />
              {t.heroPrimary}
            </a>
          </div>
        </div>
      </header>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          position: 'fixed',
          bottom: 22,
          [isAr ? 'left' : 'right']: 22,
          zIndex: 60,
          width: 62,
          height: 62,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #1aa34e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: colors.whatsappGlow,
        }}
      >
        <MessageCircle size={24} />
      </a>

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${IMAGES?.hero ?? ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: isDark ? 'brightness(0.25) contrast(1.1)' : 'brightness(0.88) contrast(1.04)',
            transform: 'scale(1.05)',
          }}
        />

        <div style={{ position: 'absolute', inset: 0, background: colors.heroOverlay }} />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'linear-gradient(90deg, rgba(6,8,12,0.96) 0%, rgba(6,8,12,0.68) 42%, rgba(6,8,12,0.18) 100%)'
              : 'linear-gradient(90deg, rgba(247,241,230,0.88) 0%, rgba(247,241,230,0.58) 42%, rgba(247,241,230,0.16) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: -120,
            [isAr ? 'right' : 'left']: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: colors.goldSoft,
            filter: 'blur(24px)',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: -100,
            [isAr ? 'left' : 'right']: -60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: colors.goldStrong,
            filter: 'blur(22px)',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: 1260,
            margin: '0 auto',
            padding: '110px 20px 60px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 36,
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: rootAlign }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: `1px solid ${colors.border}`,
                  background: colors.goldSoft,
                  color: colors.gold,
                  fontSize: 13,
                  fontWeight: 800,
                  marginBottom: 18,
                  boxShadow: colors.glow,
                }}
              >
                <Sparkles size={14} />
                {t.heroBadge}
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.7rem, 6vw, 5.4rem)',
                  lineHeight: 0.98,
                  margin: '0 0 16px',
                  fontWeight: 900,
                  maxWidth: 760,
                  marginInline: isAr ? 'auto 0' : '0 auto',
                }}
              >
                {t.heroTitle1}{' '}
                <span
                  style={{
                    color: colors.gold,
                    display: 'inline-block',
                    textShadow: isDark ? '0 8px 30px rgba(212,166,63,0.22)' : 'none',
                  }}
                >
                  {t.heroTitle2}
                </span>
              </h1>

              <p
                style={{
                  color: colors.textSoft,
                  fontSize: 17,
                  lineHeight: 1.95,
                  maxWidth: 640,
                  margin: isAr ? '0 0 28px auto' : '0 auto 28px 0',
                }}
              >
                {t.heroText}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 14,
                  justifyContent: isAr ? 'flex-end' : 'flex-start',
                }}
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: colors.heroButton,
                    color: '#111',
                    textDecoration: 'none',
                    padding: '15px 24px',
                    borderRadius: 16,
                    fontWeight: 900,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    boxShadow: '0 10px 40px rgba(212,166,63,0.32)',
                    fontSize: 15,
                  }}
                >
                  {t.heroPrimary}
                  <ArrowRight size={16} />
                </a>

                <NavLink
                  to={SERVICES_PATH}
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    background: colors.heroPanel,
                    textDecoration: 'none',
                    padding: '15px 22px',
                    borderRadius: 16,
                    fontWeight: 800,
                    boxShadow: colors.shadow,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {t.heroSecondary}
                </NavLink>

                <a
                  href="#services"
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    background: 'transparent',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: 16,
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Play size={15} />
                  {t.watchMore}
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 26,
                  justifyContent: isAr ? 'flex-end' : 'flex-start',
                }}
              >
                <NavLink
                  to={CLASSES_PATH}
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    background: colors.heroPanel,
                    textDecoration: 'none',
                    padding: '14px 20px',
                    borderRadius: 14,
                    fontWeight: 800,
                    boxShadow: colors.shadow,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {t.heroClasses}
                </NavLink>

                <NavLink
                  to={BOOKING_PATH}
                  style={{
                    background: colors.heroButton,
                    color: '#111',
                    textDecoration: 'none',
                    padding: '14px 20px',
                    borderRadius: 14,
                    fontWeight: 900,
                    boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
                  }}
                >
                  {t.heroBooking}
                </NavLink>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  justifyContent: isAr ? 'flex-end' : 'flex-start',
                  marginBottom: 20,
                }}
              >
                {[t.heroMini1, t.heroMini2, t.heroMini3].map((item) => (
                  <span
                    key={item}
                    style={{
                      border: `1px solid ${colors.border}`,
                      background: colors.heroPanel,
                      color: colors.text,
                      borderRadius: 999,
                      padding: '10px 14px',
                      fontSize: 13,
                      fontWeight: 800,
                      boxShadow: colors.shadow,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    color: colors.gold,
                    fontWeight: 900,
                    fontSize: 14,
                    marginBottom: 14,
                  }}
                >
                  {t.statsTitle}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))',
                    gap: 12,
                  }}
                >
                  {heroStats.map((item) => (
                    <HoverCard
                      key={item.label}
                      style={{
                        background: colors.heroPanel,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 20,
                        padding: '16px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        boxShadow: colors.shadow,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            background: colors.goldSoft,
                            color: colors.gold,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </span>

                        <span
                          style={{
                            fontWeight: 900,
                            color: colors.gold,
                            fontSize: 22,
                            lineHeight: 1,
                          }}
                        >
                          {item.value}
                        </span>
                      </div>

                      <span style={{ fontWeight: 800, color: colors.text, fontSize: 14 }}>
                        {item.label}
                      </span>

                      <div
                        style={{
                          height: 6,
                          width: '100%',
                          borderRadius: 999,
                          background: colors.goldSoft,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: item.progress,
                            borderRadius: 999,
                            background: colors.gold,
                          }}
                        />
                      </div>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <HoverCard
                style={{
                  background: colors.heroPanel,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 30,
                  overflow: 'hidden',
                  boxShadow: colors.glow,
                  position: 'relative',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    [isAr ? 'left' : 'right']: 18,
                    zIndex: 3,
                    background: isDark ? 'rgba(8,9,12,0.78)' : 'rgba(255,255,255,0.90)',
                    border: `1px solid ${colors.border}`,
                    color: colors.gold,
                    padding: '8px 12px',
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: 800,
                    fontSize: 13,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Crown size={14} />
                  {t.eliteTag}
                </div>

                <img
                  src="/IMAGE/dr3.jpeg"
                  alt="Dr. Ashraf"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 590,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                <div style={{ padding: 26, textAlign: rootAlign }}>
                  <div
                    style={{
                      color: colors.gold,
                      fontWeight: 800,
                      fontSize: 13,
                      marginBottom: 8,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Zap size={14} />
                    {isAr ? 'بداية التحول الحقيقي' : 'The Start of Real Change'}
                  </div>

                  <h2 style={{ margin: '0 0 10px', fontSize: 30, lineHeight: 1.2 }}>{t.introTitle}</h2>

                  <p
                    style={{
                      margin: 0,
                      color: colors.textSoft,
                      lineHeight: 1.95,
                      fontSize: 15,
                    }}
                  >
                    {t.introText}
                  </p>

                  <div style={{ marginTop: 18 }}>
                    <NavLink
                      to={ABOUT_PATH}
                      style={{
                        color: colors.gold,
                        textDecoration: 'none',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      {t.navAbout}
                      <ArrowRight size={15} />
                    </NavLink>
                  </div>
                </div>
              </HoverCard>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: '100px 20px', background: colors.bg }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 10, letterSpacing: 0.4 }}>
              {t.sectionServices}
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.9rem, 3vw, 2.9rem)', fontWeight: 900 }}>
              {t.sectionServicesTitle}
            </h2>
            <p style={{ margin: '0 auto', color: colors.textSoft, lineHeight: 1.95, maxWidth: 760 }}>
              {t.sectionServicesText}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
            }}
          >
            {services.map((service) => (
              <HoverCard
                key={service.title}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 26,
                  padding: 24,
                  boxShadow: colors.shadow,
                  textAlign: rootAlign,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -50,
                    [isAr ? 'left' : 'right']: -30,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: colors.goldSoft,
                    filter: 'blur(8px)',
                  }}
                />

                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: colors.goldSoft,
                    color: colors.gold,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {service.icon}
                </div>

                <h3 style={{ margin: '0 0 10px', fontSize: 20, position: 'relative', zIndex: 1 }}>
                  {service.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: colors.textSoft,
                    lineHeight: 1.9,
                    fontSize: 14,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {service.desc}
                </p>
              </HoverCard>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <NavLink
              to={SERVICES_PATH}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: colors.heroButton,
                color: '#111',
                textDecoration: 'none',
                padding: '14px 22px',
                borderRadius: 16,
                fontWeight: 900,
                boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
              }}
            >
              {t.serviceBtn}
              <ArrowRight size={16} />
            </NavLink>

            <NavLink
              to={CLASSES_PATH}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                background: colors.bgCard,
                textDecoration: 'none',
                padding: '14px 22px',
                borderRadius: 16,
                fontWeight: 800,
                boxShadow: colors.shadow,
              }}
            >
              {t.navClasses}
            </NavLink>

            <NavLink
              to={BOOKING_PATH}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: colors.heroButton,
                color: '#111',
                textDecoration: 'none',
                padding: '14px 22px',
                borderRadius: 16,
                fontWeight: 900,
                boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
              }}
            >
              {t.navBooking}
            </NavLink>
          </div>
        </div>
      </section>

      <section id="results" style={{ padding: '100px 20px', background: colors.sectionAlt }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 10 }}>{t.sectionResults}</div>
            <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.9rem, 3vw, 2.9rem)', fontWeight: 900 }}>
              {t.sectionResultsTitle}
            </h2>
            <p style={{ margin: '0 auto', color: colors.textSoft, lineHeight: 1.95, maxWidth: 760 }}>
              {t.sectionResultsText}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            {galleryImages.map((image, index) => (
              <HoverCard
                key={index}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 26,
                  overflow: 'hidden',
                  boxShadow: colors.shadow,
                  cursor: 'pointer',
                }}
              >
                <button
                  type="button"
                  onClick={() => openImage(index)}
                  aria-label={`${t.clickToView} ${index + 1}`}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'block',
                  }}
                >
                  <div
                    style={{
                      height: 280,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={image}
                      alt={`Before After ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.45) 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 14,
                        [isAr ? 'left' : 'right']: 14,
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.14)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                      }}
                    >
                      <Camera size={16} />
                    </div>
                  </div>

                  <div
                    style={{
                      padding: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ fontWeight: 900, color: colors.text }}>
                        {t.resultLabel} {index + 1}
                      </div>
                      <div style={{ fontSize: 12, color: colors.textMuted }}>Before / After</div>
                    </div>

                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: colors.goldSoft,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.gold,
                      }}
                    >
                      <Camera size={16} />
                    </span>
                  </div>
                </button>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 20px', background: colors.bg }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div
            style={{
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 30,
              padding: 38,
              boxShadow: colors.shadow,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: colors.goldSoft,
                filter: 'blur(20px)',
                zIndex: 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 10 }}>{t.sectionWhy}</div>
              <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', fontWeight: 900 }}>
                {t.sectionWhyTitle}
              </h2>
              <p style={{ margin: '0 auto', color: colors.textSoft, lineHeight: 2, maxWidth: 760 }}>
                {t.sectionWhyText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '100px 20px', background: colors.section }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 30,
              padding: 38,
              boxShadow: colors.shadow,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at top center, ${colors.goldSoft} 0%, transparent 58%)`,
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', fontWeight: 900 }}>
                  {t.finalTitle}
                </h2>
                <p style={{ margin: '0 auto 22px', color: colors.textSoft, lineHeight: 1.9, maxWidth: 760 }}>
                  {t.finalText}
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: colors.heroButton,
                      color: '#111',
                      textDecoration: 'none',
                      padding: '13px 22px',
                      borderRadius: 14,
                      fontWeight: 900,
                      boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
                    }}
                  >
                    {t.finalBtn}
                  </a>

                  <NavLink
                    to={SERVICES_PATH}
                    style={{
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      background: colors.bgCard,
                      textDecoration: 'none',
                      padding: '13px 22px',
                      borderRadius: 14,
                      fontWeight: 800,
                    }}
                  >
                    {t.knowServices}
                  </NavLink>

                  <NavLink
                    to={BOOKING_PATH}
                    style={{
                      background: colors.heroButton,
                      color: '#111',
                      textDecoration: 'none',
                      padding: '13px 22px',
                      borderRadius: 14,
                      fontWeight: 900,
                      boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
                    }}
                  >
                    {t.navBooking}
                  </NavLink>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 14,
                }}
              >
                <SocialLinkCard
                  href={WHATSAPP_LINK}
                  icon={<MessageCircle size={20} />}
                  title={t.socialWhatsapp}
                  subtitle={t.socialAction}
                  accentColor="#25D366"
                  colors={colors}
                />

                <SocialLinkCard
                  href={FACEBOOK_LINK}
                  icon={<FacebookIcon size={20} />}
                  title={t.socialFacebook}
                  subtitle={t.socialAction}
                  accentColor="#1877F2"
                  colors={colors}
                />

                <SocialLinkCard
                  href={INSTAGRAM_LINK}
                  icon={<InstagramIcon size={20} />}
                  title={t.socialInstagram}
                  subtitle={t.socialAction}
                  accentColor="#E1306C"
                  colors={colors}
                />

                <SocialLinkCard
                  href={TIKTOK_LINK}
                  icon={<TikTokIcon size={20} />}
                  title={t.socialTikTok}
                  subtitle={t.socialAction}
                  accentColor={isDark ? '#ffffff' : '#111111'}
                  colors={colors}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          marginTop: 0,
          borderTop: `1px solid ${colors.border}`,
          background: `linear-gradient(180deg, ${colors.footerTop} 0%, ${colors.footerBottom} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(212,166,63,0.10), transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '54px 20px 26px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 28,
              marginBottom: 34,
            }}
          >
            <div style={{ textAlign: rootAlign }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <BrandLogo colors={colors} size={50} />

                <div>
                  <div style={{ color: colors.gold, fontWeight: 900, fontSize: 20 }}>{t.brand}</div>
                  <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700, marginTop: 3 }}>
                    {t.brandSub}
                  </div>
                </div>
              </div>

              <p style={{ color: colors.textSoft, lineHeight: 1.9, margin: '0 0 18px', fontSize: 14 }}>
                {t.footerText}
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: colors.heroButton,
                  color: '#111',
                  textDecoration: 'none',
                  padding: '12px 18px',
                  borderRadius: 14,
                  fontWeight: 900,
                  boxShadow: '0 10px 40px rgba(212,166,63,0.30)',
                }}
              >
                <MessageCircle size={16} />
                {t.whatsappNow}
              </a>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: '0 0 16px', color: colors.gold, fontSize: 17 }}>{t.footerQuick}</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                <NavLink to={HOME_PATH} style={{ color: colors.textSoft, textDecoration: 'none', fontSize: 14 }}>
                  {t.home}
                </NavLink>
                <NavLink to={ABOUT_PATH} style={{ color: colors.textSoft, textDecoration: 'none', fontSize: 14 }}>
                  {t.navAbout}
                </NavLink>
                <NavLink to={SERVICES_PATH} style={{ color: colors.textSoft, textDecoration: 'none', fontSize: 14 }}>
                  {t.navServices}
                </NavLink>
                <NavLink to={CLASSES_PATH} style={{ color: colors.textSoft, textDecoration: 'none', fontSize: 14 }}>
                  {t.navClasses}
                </NavLink>
                <NavLink to={BOOKING_PATH} style={{ color: colors.textSoft, textDecoration: 'none', fontSize: 14 }}>
                  {t.navBooking}
                </NavLink>
                <a href="#results" style={{ color: colors.textSoft, textDecoration: 'none', fontSize: 14 }}>
                  {t.navGallery}
                </a>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: '0 0 16px', color: colors.gold, fontSize: 17 }}>{t.footerServices}</h3>
              <div style={{ display: 'grid', gap: 12, color: colors.textSoft, fontSize: 14 }}>
                <span>{isAr ? 'التدريب الأونلاين' : 'Online Coaching'}</span>
                <span>{isAr ? 'برامج التغذية' : 'Nutrition Programs'}</span>
                <span>{isAr ? 'تحضير البطولات' : 'Competition Prep'}</span>
                <span>{isAr ? 'الاستشفاء والحجامة' : 'Recovery & Hijama'}</span>
                <span>{isAr ? 'الكورسات والورش' : 'Courses & Workshops'}</span>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: '0 0 16px', color: colors.gold, fontSize: 17 }}>{t.footerContact}</h3>
              <div style={{ display: 'grid', gap: 14, color: colors.textSoft, fontSize: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={16} color={colors.gold} />
                  <span>{t.footerLocation}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Clock3 size={16} color={colors.gold} />
                  <span>{t.footerHours}</span>
                </div>

                <div style={{ marginTop: 4 }}>
                  <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 10 }}>{t.footerFollow}</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href={INSTAGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                        color: '#E1306C',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: colors.bgSoft,
                      }}
                    >
                      <InstagramIcon size={18} />
                    </a>

                    <a
                      href={FACEBOOK_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                        color: '#1877F2',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: colors.bgSoft,
                      }}
                    >
                      <FacebookIcon size={18} />
                    </a>

                    <a
                      href={TIKTOK_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                        color: isDark ? '#ffffff' : '#111111',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: colors.bgSoft,
                      }}
                    >
                      <TikTokIcon size={18} />
                    </a>

                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                        color: '#25D366',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: colors.bgSoft,
                      }}
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${colors.border}`,
              paddingTop: 18,
              display: 'flex',
              justifyContent: 'center',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.9 }}>
              {t.footerRights}
              <br />
              <span style={{ fontWeight: 700 }}>{t.developer}</span>
              <br />
              <a
                href={DEVELOPER_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#25D366',
                  textDecoration: 'none',
                  fontWeight: 800,
                }}
              >
                {t.developerContact}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {isLightboxOpen && activeImage && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: colors.modalOverlay,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <button
            type="button"
            aria-label={t.close}
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            style={{
              ...lightboxButtonStyle,
              position: 'absolute',
              top: 24,
              [isAr ? 'left' : 'right']: 24,
            }}
          >
            <X size={22} />
          </button>

          <button
            type="button"
            aria-label={t.prev}
            onClick={(e) => {
              e.stopPropagation();
              showPrevImage();
            }}
            style={{
              ...lightboxButtonStyle,
              position: 'absolute',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <ArrowLeft size={22} />
          </button>

          <button
            type="button"
            aria-label={t.next}
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            style={{
              ...lightboxButtonStyle,
              position: 'absolute',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <ArrowRight size={22} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'min(1100px, 92vw)',
              maxHeight: '90vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                borderRadius: 28,
                overflow: 'hidden',
                border: `1px solid rgba(255,255,255,0.12)`,
                boxShadow: '0 25px 80px rgba(0,0,0,0.45)',
                background: '#0d1117',
              }}
            >
              <img
                src={activeImage}
                alt={`Transformation ${activeImageIndex! + 1}`}
                style={{
                  display: 'block',
                  width: '100%',
                  maxHeight: '72vh',
                  objectFit: 'contain',
                  background: '#090b10',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: 10,
                overflowX: 'auto',
                maxWidth: '100%',
                padding: '6px 4px',
              }}
            >
              {galleryImages.map((thumb, index) => {
                const isActive = index === activeImageIndex;
                return (
                  <button
                    key={thumb}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    style={{
                      border: isActive ? `2px solid ${colors.gold}` : '1px solid rgba(255,255,255,0.14)',
                      background: 'transparent',
                      padding: 0,
                      borderRadius: 16,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      width: 86,
                      height: 86,
                      flex: '0 0 auto',
                      boxShadow: isActive ? `0 0 0 3px rgba(212,166,63,0.18)` : 'none',
                      opacity: isActive ? 1 : 0.72,
                      transition: '0.22s ease',
                    }}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            <div
              style={{
                color: '#fff',
                fontWeight: 800,
                fontSize: 14,
                textAlign: 'center',
                letterSpacing: 0.3,
              }}
            >
              {t.resultLabel} {activeImageIndex! + 1} • {activeImageIndex! + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}