import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Instagram,
  Moon,
  Sun,
  Award,
  Users,
  Dumbbell,
  Briefcase,
  GraduationCap,
  Trophy,
  HeartPulse,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Crown,
  ShieldCheck,
  BarChart3,
  Medal,
  Star,
  Target,
  BookOpen,
  Building2,
  Plane,
  Clock3,
  MapPin,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { ROUTE_PATHS } from "@/lib/index";

type Lang = "ar" | "en";
type ThemeMode = "dark" | "light";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56v1.91h2.77l-.44 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
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
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: colors.glow,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        color: colors.gold,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), transparent 40%)",
          pointerEvents: "none",
        }}
      />
      <Dumbbell size={size * 0.44} strokeWidth={2.2} />
    </span>
  );
}

function HoverCard({
  children,
  style,
  className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className={`lift-card ${className}`} style={style}>
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
  icon: React.ReactNode;
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="lift-card"
      style={{
        textDecoration: "none",
        border: `1px solid ${colors.border}`,
        background: colors.bgSoft,
        color: colors.text,
        borderRadius: 22,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: colors.shadow,
        minHeight: 78,
      }}
    >
      <span
        style={{
          width: 50,
          height: 50,
          borderRadius: 16,
          background: colors.goldSoft,
          color: accentColor,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>

      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontWeight: 900 }}>{title}</span>
        <span style={{ color: colors.textMuted, fontSize: 13 }}>{subtitle}</span>
      </span>
    </a>
  );
}

export default function About() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  const isAr = lang === "ar";
  const isDark = theme === "dark";

  const PHONE = "201027570204";
  const WHATSAPP_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    isAr
      ? "مرحبا، أريد الاستفسار عن البرامج التدريبية والحجز"
      : "Hello, I want to ask about the coaching programs and booking"
  )}`;

  const FACEBOOK_LINK = "https://www.facebook.com/share/1DTjxnAxVL/?mibextid=wwXIfr";
  const INSTAGRAM_LINK =
    "https://www.instagram.com/dr.ashraf_el_abd?igsh=c2tpamFreXFuaGI%3D&utm_source=qr";
  const TIKTOK_LINK = "https://www.tiktok.com/@dr..ashraf.el.abd?_r=1&_t=ZS-95g5Q6SZ8zp";

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const SERVICES_PATH = ROUTE_PATHS?.SERVICES ?? "/services";
  const CONTACT_PATH = "#contact";

  const colors = useMemo(
    () => ({
      bg: isDark ? "#06080c" : "#f6efe3",
      bgSoft: isDark ? "#0e131b" : "#fffaf4",
      bgCard: isDark ? "#121823" : "#ffffff",
      section: isDark ? "#0a0f16" : "#efe4d5",
      sectionAlt: isDark ? "#090d14" : "#faf2e8",
      text: isDark ? "#f8f3ea" : "#171717",
      textSoft: isDark ? "rgba(248,243,234,0.83)" : "rgba(23,23,23,0.78)",
      textMuted: isDark ? "rgba(248,243,234,0.56)" : "rgba(23,23,23,0.56)",
      gold: "#d4a63f",
      goldSoft: isDark ? "rgba(212,166,63,0.12)" : "rgba(212,166,63,0.14)",
      goldStrong: isDark ? "rgba(212,166,63,0.24)" : "rgba(212,166,63,0.22)",
      border: isDark ? "rgba(212,166,63,0.16)" : "rgba(212,166,63,0.20)",
      shadow: isDark ? "0 24px 70px rgba(0,0,0,0.36)" : "0 18px 46px rgba(0,0,0,0.08)",
      glow: isDark
        ? "0 0 0 1px rgba(212,166,63,0.08), 0 24px 60px rgba(0,0,0,0.34)"
        : "0 0 0 1px rgba(212,166,63,0.16), 0 18px 45px rgba(0,0,0,0.08)",
      accent: isDark ? "#25D366" : "#1ea952",
      headerBg: isDark ? "rgba(6,8,12,0.82)" : "rgba(255,255,255,0.86)",
      footerTop: isDark ? "#0d1117" : "#fbf7ef",
      footerBottom: isDark ? "#080b10" : "#f2eadc",
      heroButton: "linear-gradient(135deg, #d4a63f, #f0ca6b)",
      whatsappGlow: "0 12px 38px rgba(37, 211, 102, 0.28)",
      heroPanel: isDark ? "rgba(13,17,25,0.76)" : "rgba(255,255,255,0.87)",
      modalOverlay: "rgba(5, 7, 11, 0.88)",
      modalButtonBg: "rgba(255,255,255,0.08)",
    }),
    [isDark]
  );

  const t = useMemo(
    () => ({
      pageTitle: isAr ? "نبذة عن د. أشرف العبد" : "About Dr. Ashraf El Abd",
      introTitle: isAr ? "تعريف مختصر" : "Quick Introduction",
      introText: isAr
        ? "د. أشرف العبد خبير في التدريب والتغذية والإدارة الرياضية بخبرة تتجاوز 15 سنة، ويجمع بين الإدارة، التدريب الاحترافي، التأهيل، والتعليم والمحاضرات الأكاديمية."
        : "Dr. Ashraf El Abd is a coaching, nutrition, and sports operations expert with 15+ years of experience, combining management, elite coaching, rehabilitation, and academic lecturing.",

      overviewTitle: isAr ? "من هو د. أشرف؟" : "Who Is Dr. Ashraf?",
      overviewText1: isAr
        ? "د. أشرف العبد يعمل كمدير تشغيل وإدارة لعدة فروع جيم، ومدرب محترف، ومحاضر أكاديمي، وحكم دولي IFBB، وله خبرة قوية في بناء الأنظمة التدريبية، رفع كفاءة الفرق، وتحقيق نمو فعلي في الأداء، العضويات، والمبيعات."
        : "Dr. Ashraf El Abd works as a multi-branch gym operations leader, professional coach, academic lecturer, and IFBB International Judge, with strong expertise in coaching systems, team performance, and measurable growth.",
      overviewText2: isAr
        ? "قاد 4 فروع جيم تضم أكثر من 7000 عضو نشط، وحقق نمو عضويات بنسبة 54% وزيادة سنوية في الربح بنسبة 32%، كما ساعد أكثر من 500 عميل على تحقيق نتائج حقيقية، وشارك في إعداد وتطوير المدربين والمحاضرات المتخصصة داخل المجال."
        : "He led 4 gym branches serving 7,000+ active members, achieved 54% membership growth and a 32% annual profit increase, helped 500+ clients reach real results, and contributed to trainer development and specialized education.",

      highlightsTitle: isAr ? "أبرز النقاط" : "Key Highlights",
      rolesTitle: isAr ? "الأدوار والخبرة" : "Roles & Experience",
      servicesTitle: isAr ? "الخدمات التي يقدمها" : "Services Offered",
      certificatesTitle: isAr ? "المؤهلات والشهادات" : "Education & Certifications",
      featuredTitle: isAr ? "رحلة مهنية متكاملة" : "A Complete Professional Journey",
      galleryTitle: isAr ? "صور للكابتن" : "Captain Gallery",
      socialTitle: isAr ? "تابعنا" : "Follow Us",
      footerText: isAr
        ? "جميع الحجوزات والاستفسارات تتم مباشرة عبر واتساب."
        : "All bookings and inquiries are handled directly through WhatsApp.",

      bookNow: isAr ? "احجز الآن" : "Book Now",
      contactWhatsapp: isAr ? "راسلنا الآن" : "Chat on WhatsApp",
      backHome: isAr ? "العودة للرئيسية" : "Back Home",
      langBadge: isAr ? "E" : "ع",
      instagramLabel: isAr ? "إنستجرام" : "Instagram",
      facebookLabel: isAr ? "فيسبوك" : "Facebook",
      tiktokLabel: isAr ? "تيك توك" : "TikTok",
      home: isAr ? "الرئيسية" : "Home",
      navAbout: isAr ? "نبذة عنا" : "About",
      navServices: isAr ? "الخدمات" : "Services",
      navGallery: isAr ? "الصور" : "Gallery",
      navContact: isAr ? "تواصل" : "Contact",
      finalTitle: isAr ? "جاهز تبدأ التغيير؟" : "Ready To Transform?",
      finalText: isAr
        ? "ابدأ محادثتك الآن، واعرف الخدمة المناسبة لك، وخطوتك الأولى."
        : "Start your conversation now, discover the best service for you, and get your first step.",
      finalBtn: isAr ? "احجز استفسارك الآن" : "Book Your Inquiry",
      knowServices: isAr ? "تعرف على خدماتنا" : "Know Our Services",
      footerQuick: isAr ? "روابط سريعة" : "Quick Links",
      footerServices: isAr ? "الخدمات الأساسية" : "Core Services",
      footerContact: isAr ? "بيانات التواصل" : "Contact Info",
      footerFollow: isAr ? "تابعنا" : "Follow Us",
      footerLocation: isAr ? "أونلاين + حجز مباشر عبر واتساب" : "Online + direct WhatsApp booking",
      footerHours: isAr ? "متابعة وحجز حسب المواعيد المتاحة" : "Booking based on available schedule",
      brandSub: isAr ? "ONLINE COACH • ELITE TRANSFORMATION" : "ONLINE COACH • ELITE TRANSFORMATION",
      openImage: isAr ? "عرض الصورة" : "Open Image",
      close: isAr ? "إغلاق" : "Close",
      next: isAr ? "التالي" : "Next",
      prev: isAr ? "السابق" : "Previous",
    }),
    [isAr]
  );

  const highlights = useMemo(
    () => [
      { icon: <Award size={18} />, title: isAr ? "15+ سنة خبرة فعلية" : "15+ Years of Real Experience" },
      { icon: <Users size={18} />, title: isAr ? "500+ عميل بنتائج حقيقية" : "500+ Clients with Real Results" },
      { icon: <Trophy size={18} />, title: isAr ? "حكم دولي IFBB" : "IFBB International Judge" },
      { icon: <Building2 size={18} />, title: isAr ? "إدارة 4 فروع جيم" : "Managed 4 Gym Branches" },
      { icon: <BarChart3 size={18} />, title: isAr ? "54% نمو في العضويات" : "54% Membership Growth" },
      { icon: <Target size={18} />, title: isAr ? "32% زيادة أرباح سنوية" : "32% Annual Profit Growth" },
      { icon: <GraduationCap size={18} />, title: isAr ? "محاضر أكاديمي وإعداد مدربين" : "Academic Lecturer & Trainer Educator" },
      { icon: <Plane size={18} />, title: isAr ? "سفر لأكثر من دولة حول العالم" : "Travel Across Multiple Countries" },
    ],
    [isAr]
  );

  const roles = useMemo(
    () => [
      isAr ? "خبرة تتجاوز 15 سنة في التدريب والتغذية والإدارة الرياضية" : "15+ years of experience in coaching, nutrition, and sports operations",
      isAr ? "General Manager لـ Add Fit Fitness Club و Seven Day Gym" : "General Manager of Add Fit Fitness Club and Seven Day Gym",
      isAr ? "مدير لجيم Seven Day ضمن منظومة تشغيل متعددة الفروع" : "Manager of Seven Day Gym within a multi-branch operation system",
      isAr ? "مدير سابق في Gold’s Gym Pyramids View" : "Former Fitness Manager at Gold’s Gym Pyramids View",
      isAr ? "إدارة تشغيل 4 فروع مع مسؤولية كاملة عن الأداء والربحية" : "Managed operations across 4 branches with full performance and profit ownership",
      isAr ? "قيادة أكثر من 100 فرد داخل المنظومة" : "Led 100+ staff members across the network",
      isAr ? "إدارة وتوجيه أكثر من 30 مدرب وأخصائي تغذية" : "Managed and mentored 30+ trainers and nutritionists",
      isAr ? "Director & Head Judge بالاتحاد المصري لكمال الأجسام" : "Director and Head Judge at the Egyptian Bodybuilding Federation",
      isAr ? "تنسيق بطولات وطنية ودولية وفق معايير IFBB" : "Coordinated national and international championships under IFBB standards",
      isAr ? "محاضر في كلية وداخل المجال الأكاديمي الرياضي" : "Lecturer in a college and within the sports academic field",
      isAr ? "خبرة قوية في KPI dashboards والتحليل التشغيلي" : "Strong expertise in KPI dashboards and performance analytics",
      isAr ? "خبرة في التوسع، جدولة الفرق، التشغيل، والمتابعة اليومية" : "Experienced in expansion, scheduling, operations, and daily follow-up",
      isAr ? "يسافر إلى أكثر من دولة حول العالم للعمل، الإدارة، التحكيم، والتطوير المهني" : "Travels across multiple countries for work, operations, judging, and professional development",
      isAr ? "بطل قومي لعدة سنوات عبر مسيرة تنافسية مميزة" : "National bodybuilding champion across a long elite competitive career",
    ],
    [isAr]
  );

  const services = useMemo(
    () => [
      {
        icon: <Dumbbell size={18} />,
        title: isAr ? "التدريب الأونلاين" : "Online Coaching",
        desc: isAr
          ? "برامج تدريب فردية حسب الهدف والمستوى والحالة البدنية."
          : "Personalized coaching plans based on goals, level, and condition.",
      },
      {
        icon: <HeartPulse size={18} />,
        title: isAr ? "برامج التغذية" : "Nutrition Programs",
        desc: isAr
          ? "تخسيس، زيادة وزن، بناء عضلات، ومقاومة الإنسولين."
          : "Fat loss, weight gain, muscle building, and insulin resistance support.",
      },
      {
        icon: <Trophy size={18} />,
        title: isAr ? "تحضير البطولات" : "Competition Prep",
        desc: isAr
          ? "تحضير اللاعبين للمنافسات والبطولات بأعلى جاهزية."
          : "Athlete preparation for contests and competitions.",
      },
      {
        icon: <ShieldCheck size={18} />,
        title: isAr ? "الاستشفاء والحجامة" : "Recovery & Hijama",
        desc: isAr
          ? "جلسات مساج رياضي، استشفاء، وحجامة."
          : "Sports massage, recovery sessions, and hijama.",
      },
      {
        icon: <BookOpen size={18} />,
        title: isAr ? "الكورسات والورش" : "Courses & Workshops",
        desc: isAr
          ? "كورسات وورش أونلاين لتطوير المعرفة والخبرة."
          : "Online courses and workshops for education and development.",
      },
      {
        icon: <Users size={18} />,
        title: isAr ? "إعداد المدربين والبوت كامب" : "Trainer Education & Bootcamps",
        desc: isAr
          ? "تطوير المدربين والكلاسات الجماعية والبوت كامب."
          : "Trainer education, group classes, and bootcamps.",
      },
      {
        icon: <Briefcase size={18} />,
        title: isAr ? "الإدارة الرياضية والاستشارات" : "Fitness Management & Consulting",
        desc: isAr
          ? "خبرة عملية في إدارة الجيمات والفرق وتحسين الأداء."
          : "Practical experience in gym operations, teams, and performance growth.",
      },
    ],
    [isAr]
  );

  const certificates = useMemo(
    () => [
      {
        group: isAr ? "المؤهلات العلمية" : "Education",
        items: [
          isAr ? "دكتوراه في التربية الرياضية – 2025" : "PhD in Sports Education – 2025",
          isAr ? "ماجستير تغذية وتدريب رياضي – 2021" : "Master of Science in Nutrition and Sports Training – 2021",
          isAr ? "MBA – 2018" : "Master of Business Administration (MBA) – 2018",
          isAr ? "دبلومة القيادة – 2017" : "Diploma in Leadership – 2017",
          isAr ? "بكالوريوس تربية رياضية بتقدير امتياز مع مرتبة الشرف – 2016" : "Bachelor of Physical Education, Excellent with Honors – 2016",
        ],
      },
      {
        group: isAr ? "الشهادات المهنية" : "Professional Certifications",
        items: [
          isAr ? "IFBB International Judge – 2024" : "IFBB International Judge – 2024",
          isAr ? "ISSA Certified Fitness Management" : "ISSA Certified Fitness Management",
          isAr ? "Certification for Operation Management" : "Certification for Operation Management",
          isAr ? "Certified Rehabilitation Specialist" : "Certified Rehabilitation Specialist",
          isAr ? "ISSA Certified Fitness Trainer" : "ISSA Certified Fitness Trainer",
          isAr ? "First Aid and Rehabilitation" : "First Aid and Rehabilitation",
        ],
      },
    ],
    [isAr]
  );

  const featuredStories = useMemo(
    () => [
      {
        title: isAr ? "حكم دولي IFBB" : "IFBB International Judge",
        text: isAr
          ? "يشغل د. أشرف دورًا مهمًا في التحكيم الرياضي على مستوى البطولات، حيث يعمل كرئيس لجنة تحكيم ومدير فني في بطولات محلية ودولية. هذه المكانة تعكس الثقة الكبيرة في خبرته، ودقته في التقييم، والتزامه الكامل بالمعايير الاحترافية والتنظيمية الخاصة بـ IFBB."
          : "Dr. Ashraf plays a major judging role in bodybuilding championships as a head judge and technical leader in national and international events, reflecting strong trust in his experience, accuracy, and IFBB standards.",
        images: ["/IMAGE/judg4.jpg", "/IMAGE/judge-2.jpg", "/IMAGE/judge-3.jpg"],
        icon: <Crown size={18} />,
      },
      {
        title: isAr ? "مدرب برايفت وصانع نتائج" : "Private Coach & Results Builder",
        text: isAr
          ? "على مستوى التدريب الفردي، يمتلك خبرة قوية في تصميم برامج مخصصة لكل حالة، سواء كان الهدف خسارة دهون، بناء عضلات، تحسين الأداء، أو إعادة التأهيل. المتابعة تكون عملية، منظمة، ومبنية على تفاصيل فعلية، لذلك قدر يساعد عدد كبير من العملاء في الوصول لنتائج واضحة ومستقرة."
          : "As a private coach, he creates tailored plans for fat loss, muscle gain, performance development, and rehabilitation, with structured follow-up that helps clients achieve stable and visible results.",
        images: ["/IMAGE/private-1.jpeg", "/IMAGE/private-2.jpeg", "/IMAGE/private-3.jpeg"],
        icon: <Dumbbell size={18} />,
      },
      {
        title: isAr ? "مع كباتن وأبطال كبار" : "With Elite Captains and Champions",
        text: isAr
          ? "وجود د. أشرف وسط نخبة من الكباتن والأبطال يعكس مكانته داخل المجال الرياضي. خبرته لا تقتصر فقط على التدريب، بل تمتد لتطوير المدربين، بناء فرق قوية، وصناعة بيئة احترافية عالية المستوى داخل الجيمات والبطولات والمناسبات الرياضية."
          : "Being surrounded by elite captains and champions reflects his strong standing in the sports field. His impact goes beyond coaching into trainer development, team building, and creating professional high-performance environments.",
        images: ["/IMAGE/judg4.jpg"],
        icon: <Medal size={18} />,
      },
    ],
    [isAr]
  );

  const galleryImages = [
    "/IMAGE/dr3.jpeg",
    "/IMAGE/dr2.jpg",
    "/IMAGE/dr3.jpg",
    "/IMAGE/champions.jpg",
  ];

  const allGalleryTitle = isAr ? "صور الكابتن" : "Captain Gallery";

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightbox({ images, index, title });
  };

  const closeLightbox = () => setLightbox(null);

  const nextImage = () => {
    setLightbox((prev) => {
      if (!prev) return prev;
      return { ...prev, index: (prev.index + 1) % prev.images.length };
    });
  };

  const prevImage = () => {
    setLightbox((prev) => {
      if (!prev) return prev;
      return { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length };
    });
  };

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const rootDir = isAr ? "rtl" : "ltr";
  const rootAlign = isAr ? "right" : "left";

  const navLinkBase = ({ isActive }: { isActive: boolean }) =>
    ({
      color: isActive ? colors.gold : colors.text,
      textDecoration: "none",
      fontWeight: 800,
      fontSize: 14,
      padding: "11px 14px",
      borderRadius: 14,
      transition: "0.25s ease",
      background: isActive ? colors.goldSoft : "transparent",
      border: `1px solid ${isActive ? colors.border : "transparent"}`,
      boxShadow: isActive ? colors.glow : "none",
    }) as const;

  return (
    <div
      dir={rootDir}
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          .fade-up {
            animation: fadeUp 0.8s ease both;
          }
          .fade-up-delay-1 {
            animation: fadeUp 0.95s ease both;
          }
          .fade-up-delay-2 {
            animation: fadeUp 1.1s ease both;
          }
          .lift-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }
          .lift-card:hover {
            transform: translateY(-8px);
          }
          .zoom-wrap {
            overflow: hidden;
            position: relative;
          }
          .zoom-img {
            transition: transform 0.45s ease;
          }
          .zoom-wrap:hover .zoom-img {
            transform: scale(1.06);
          }
          .shine::after {
            content: "";
            position: absolute;
            top: 0;
            left: -140%;
            width: 70%;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0),
              rgba(255,255,255,0.10),
              rgba(255,255,255,0)
            );
            transform: skewX(-20deg);
            transition: left 0.8s ease;
            pointer-events: none;
          }
          .shine:hover::after {
            left: 150%;
          }
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(26px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 55,
          background: colors.headerBg,
          backdropFilter: "blur(18px)",
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
        }}
      >
        <div
          style={{
            maxWidth: 1260,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <NavLink
            to={HOME_PATH}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 220,
            }}
          >
            <BrandLogo colors={colors} />

            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ color: colors.gold, fontWeight: 900, fontSize: 21 }}>
                {isAr ? "د. أشرف العبد" : "Dr. Ashraf El Abd"}
              </span>
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
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
            <a
              href="#gallery"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 14,
                padding: "11px 14px",
                borderRadius: 14,
              }}
            >
              {t.navGallery}
            </a>
            <a
              href={CONTACT_PATH}
              style={{
                color: colors.text,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 14,
                padding: "11px 14px",
                borderRadius: 14,
              }}
            >
              {t.navContact}
            </a>
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setLang((prev) => (prev === "ar" ? "en" : "ar"))}
              aria-label={isAr ? "Change language" : "تغيير اللغة"}
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bgSoft,
                color: colors.text,
                borderRadius: 14,
                width: 46,
                height: 46,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: colors.shadow,
                fontWeight: 900,
                fontSize: 15,
              }}
            >
              {t.langBadge}
            </button>

            <button
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              aria-label={isDark ? "الوضع النهاري" : "الوضع الليلي"}
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bgSoft,
                color: colors.text,
                borderRadius: 14,
                width: 46,
                height: 46,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
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
                color: "#111",
                textDecoration: "none",
                padding: "11px 18px",
                borderRadius: 14,
                fontWeight: 900,
                boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MessageCircle size={16} />
              {t.bookNow}
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
          position: "fixed",
          bottom: 22,
          [isAr ? "left" : "right"]: 22,
          zIndex: 60,
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #1aa34e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textDecoration: "none",
          boxShadow: colors.whatsappGlow,
        }}
      >
        <MessageCircle size={24} />
      </a>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 20px 50px" }}>
        <div className="fade-up" style={{ textAlign: rootAlign, marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 999,
              border: `1px solid ${colors.border}`,
              background: colors.goldSoft,
              color: colors.gold,
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            <Sparkles size={14} />
            {t.introTitle}
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", margin: "0 0 12px", fontWeight: 900 }}>
            {t.pageTitle}
          </h1>

          <p style={{ color: colors.textSoft, lineHeight: 1.95, maxWidth: 820, margin: 0 }}>
            {t.introText}
          </p>
        </div>

        <div
          className="fade-up-delay-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 26,
            alignItems: "center",
            marginBottom: 42,
          }}
        >
          <HoverCard
            style={{
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: colors.glow,
            }}
          >
            <div className="zoom-wrap shine">
              <img
                className="zoom-img"
                src="/IMAGE/dr3.jpeg"
                alt="Dr Ashraf"
                style={{
                  width: "100%",
                  height: 560,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </HoverCard>

          <div
            style={{
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 28,
              padding: 28,
              boxShadow: colors.shadow,
              textAlign: rootAlign,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 999,
                border: `1px solid ${colors.border}`,
                background: colors.goldSoft,
                color: colors.gold,
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 18,
              }}
            >
              <Star size={14} />
              {t.overviewTitle}
            </div>

            <p style={{ color: colors.textSoft, lineHeight: 2, marginBottom: 14 }}>
              {t.overviewText1}
            </p>

            <p style={{ color: colors.textSoft, lineHeight: 2, marginBottom: 20 }}>
              {t.overviewText2}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: colors.heroButton,
                  color: "#111",
                  textDecoration: "none",
                  padding: "12px 22px",
                  borderRadius: 14,
                  fontWeight: 900,
                  boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                }}
              >
                {t.bookNow}
              </a>

              <NavLink
                to={HOME_PATH}
                style={{
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  background: colors.bgCard,
                  textDecoration: "none",
                  padding: "12px 22px",
                  borderRadius: 14,
                  fontWeight: 800,
                }}
              >
                {t.backHome}
              </NavLink>
            </div>
          </div>
        </div>

        <section className="fade-up-delay-2" style={{ marginBottom: 42 }}>
          <div style={{ textAlign: rootAlign, marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.highlightsTitle}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {highlights.map((item) => (
              <HoverCard
                key={item.title}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 20,
                  padding: 22,
                  boxShadow: colors.shadow,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: colors.goldSoft,
                    color: colors.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ fontWeight: 800, lineHeight: 1.6 }}>{item.title}</div>
              </HoverCard>
            ))}
          </div>
        </section>

        <section
          className="fade-up"
          style={{
            background: colors.bgSoft,
            border: `1px solid ${colors.border}`,
            borderRadius: 28,
            padding: 28,
            boxShadow: colors.shadow,
            marginBottom: 42,
            textAlign: rootAlign,
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>{t.rolesTitle}</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.overviewTitle}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            {roles.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  color: colors.textSoft,
                  lineHeight: 1.85,
                  padding: "4px 0",
                }}
              >
                <CheckCircle2 size={16} style={{ color: colors.gold, flexShrink: 0, marginTop: 6 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fade-up" style={{ marginBottom: 42 }}>
          <div style={{ textAlign: rootAlign, marginBottom: 20 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>{t.featuredTitle}</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.featuredTitle}</h2>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            {featuredStories.map((story) => (
              <HoverCard
                key={story.title}
                style={{
                  background: colors.bgSoft,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 28,
                  overflow: "hidden",
                  boxShadow: colors.shadow,
                }}
              >
                <div
                  style={{
                    padding: 28,
                    textAlign: rootAlign,
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: colors.goldSoft,
                      color: colors.gold,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    {story.icon}
                  </div>

                  <h3 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 900 }}>{story.title}</h3>
                  <p style={{ margin: 0, color: colors.textSoft, lineHeight: 2 }}>{story.text}</p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${story.images.length}, minmax(0, 1fr))`,
                    gap: 0,
                  }}
                >
                  {story.images.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => openLightbox(story.images, idx, story.title)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        display: "block",
                        borderInlineEnd:
                          idx !== story.images.length - 1 ? `1px solid ${colors.border}` : "none",
                      }}
                      aria-label={`${t.openImage} ${story.title}`}
                    >
                      <div className="zoom-wrap shine">
                        <img
                          className="zoom-img"
                          src={img}
                          alt={`${story.title} ${idx + 1}`}
                          style={{
                            width: "100%",
                            height: story.images.length === 1 ? 360 : 280,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </HoverCard>
            ))}
          </div>
        </section>

        <section className="fade-up" style={{ marginBottom: 42 }}>
          <div style={{ textAlign: rootAlign, marginBottom: 20 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>{t.certificatesTitle}</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.certificatesTitle}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 18,
            }}
          >
            {certificates.map((group) => (
              <HoverCard
                key={group.group}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 22,
                  padding: 24,
                  boxShadow: colors.shadow,
                  textAlign: rootAlign,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: colors.gold,
                    fontWeight: 800,
                    marginBottom: 14,
                  }}
                >
                  <GraduationCap size={18} />
                  {group.group}
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {group.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        color: colors.textSoft,
                        lineHeight: 1.8,
                      }}
                    >
                      <CheckCircle2 size={16} style={{ color: colors.gold, flexShrink: 0, marginTop: 5 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </HoverCard>
            ))}
          </div>
        </section>

        <section className="fade-up" style={{ marginBottom: 42 }}>
          <div style={{ textAlign: rootAlign, marginBottom: 20 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>{t.servicesTitle}</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.servicesTitle}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {services.map((service) => (
              <HoverCard
                key={service.title}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 20,
                  padding: 22,
                  boxShadow: colors.shadow,
                  textAlign: rootAlign,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: colors.goldSoft,
                    color: colors.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  {service.icon}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 900 }}>{service.title}</h3>
                <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.85, fontSize: 14 }}>{service.desc}</p>
              </HoverCard>
            ))}
          </div>
        </section>

        <section id="gallery" className="fade-up" style={{ marginBottom: 42 }}>
          <div style={{ textAlign: rootAlign, marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.galleryTitle}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {galleryImages.map((img, index) => (
              <HoverCard
                key={img + index}
                style={{
                  background: colors.bgSoft,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: colors.shadow,
                }}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(galleryImages, index, allGalleryTitle)}
                  style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
                  aria-label={`${t.openImage} ${index + 1}`}
                >
                  <div className="zoom-wrap shine">
                    <img
                      className="zoom-img"
                      src={img}
                      alt={`Dr Ashraf ${index + 1}`}
                      style={{
                        width: "100%",
                        height: 280,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </button>
              </HoverCard>
            ))}
          </div>
        </section>

        <section id="contact" className="fade-up" style={{ padding: "20px 0 0", background: "transparent" }}>
          <div
            style={{
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 30,
              padding: 38,
              boxShadow: colors.shadow,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at top center, ${colors.goldSoft} 0%, transparent 58%)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 900 }}>
                  {t.finalTitle}
                </h2>
                <p style={{ margin: "0 auto 22px", color: colors.textSoft, lineHeight: 1.9, maxWidth: 760 }}>
                  {t.finalText}
                </p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: colors.heroButton,
                      color: "#111",
                      textDecoration: "none",
                      padding: "13px 22px",
                      borderRadius: 14,
                      fontWeight: 900,
                      boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
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
                      textDecoration: "none",
                      padding: "13px 22px",
                      borderRadius: 14,
                      fontWeight: 800,
                    }}
                  >
                    {t.knowServices}
                  </NavLink>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                <SocialLinkCard
                  href={WHATSAPP_LINK}
                  icon={<MessageCircle size={20} />}
                  title={isAr ? "واتساب" : "WhatsApp"}
                  subtitle={isAr ? "افتح الآن" : "Open Now"}
                  accentColor="#25D366"
                  colors={colors}
                />

                <SocialLinkCard
                  href={FACEBOOK_LINK}
                  icon={<FacebookIcon size={20} />}
                  title={t.facebookLabel}
                  subtitle={isAr ? "افتح الآن" : "Open Now"}
                  accentColor="#1877F2"
                  colors={colors}
                />

                <SocialLinkCard
                  href={INSTAGRAM_LINK}
                  icon={<Instagram size={20} />}
                  title={t.instagramLabel}
                  subtitle={isAr ? "افتح الآن" : "Open Now"}
                  accentColor="#E1306C"
                  colors={colors}
                />

                <SocialLinkCard
                  href={TIKTOK_LINK}
                  icon={<TikTokIcon size={20} />}
                  title={t.tiktokLabel}
                  subtitle={isAr ? "افتح الآن" : "Open Now"}
                  accentColor={isDark ? "#ffffff" : "#111111"}
                  colors={colors}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer
        style={{
          marginTop: 0,
          borderTop: `1px solid ${colors.border}`,
          background: `linear-gradient(180deg, ${colors.footerTop} 0%, ${colors.footerBottom} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(212,166,63,0.10), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "54px 20px 26px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
              marginBottom: 34,
            }}
          >
            <div style={{ textAlign: rootAlign }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  justifyContent: "flex-start",
                  marginBottom: 16,
                }}
              >
                <BrandLogo colors={colors} size={50} />

                <div>
                  <div style={{ color: colors.gold, fontWeight: 900, fontSize: 20 }}>
                    {isAr ? "د. أشرف العبد" : "Dr. Ashraf El Abd"}
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700, marginTop: 3 }}>
                    {t.brandSub}
                  </div>
                </div>
              </div>

              <p style={{ color: colors.textSoft, lineHeight: 1.9, margin: "0 0 18px", fontSize: 14 }}>
                {t.footerText}
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: colors.heroButton,
                  color: "#111",
                  textDecoration: "none",
                  padding: "12px 18px",
                  borderRadius: 14,
                  fontWeight: 900,
                  boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                }}
              >
                <MessageCircle size={16} />
                {t.contactWhatsapp}
              </a>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.footerQuick}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <NavLink to={HOME_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.home}
                </NavLink>
                <NavLink to={ABOUT_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navAbout}
                </NavLink>
                <NavLink to={SERVICES_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navServices}
                </NavLink>
                <a href="#gallery" style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navGallery}
                </a>
                <a href="#contact" style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navContact}
                </a>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.footerServices}</h3>
              <div style={{ display: "grid", gap: 12, color: colors.textSoft, fontSize: 14 }}>
                <span>{isAr ? "التدريب الأونلاين" : "Online Coaching"}</span>
                <span>{isAr ? "برامج التغذية" : "Nutrition Programs"}</span>
                <span>{isAr ? "تحضير البطولات" : "Competition Prep"}</span>
                <span>{isAr ? "الاستشفاء والحجامة" : "Recovery & Hijama"}</span>
                <span>{isAr ? "الكورسات والورش" : "Courses & Workshops"}</span>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.footerContact}</h3>
              <div style={{ display: "grid", gap: 14, color: colors.textSoft, fontSize: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={16} color={colors.gold} />
                  <span>{t.footerLocation}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Clock3 size={16} color={colors.gold} />
                  <span>{t.footerHours}</span>
                </div>

                <div style={{ marginTop: 4 }}>
                  <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 10 }}>{t.footerFollow}</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a
                      href={INSTAGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                        color: "#E1306C",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        background: colors.bgSoft,
                      }}
                    >
                      <Instagram size={18} />
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
                        color: "#1877F2",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
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
                        color: isDark ? "#ffffff" : "#111111",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
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
                        color: "#25D366",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
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
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ color: colors.textMuted, fontSize: 13 }}>
              {isAr ? "جميع الحقوق محفوظة © د. أشرف العبد" : "All rights reserved © Dr. Ashraf El Abd"}
            </div>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                alignItems: "center",
                color: colors.textMuted,
                fontSize: 13,
              }}
            >
              <span>{isAr ? "تصميم احترافي" : "Premium Experience"}</span>
              <span>•</span>
              <span>{isAr ? "حجز مباشر عبر واتساب" : "Direct WhatsApp Booking"}</span>
            </div>
          </div>
        </div>
      </footer>

      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: colors.modalOverlay,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: `1px solid ${colors.border}`,
              background: colors.modalButtonBg,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "absolute",
              top: 24,
              right: 24,
            }}
            aria-label={t.close}
          >
            <X size={22} />
          </button>

          {lightbox.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: `1px solid ${colors.border}`,
                  background: colors.modalButtonBg,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "absolute",
                  left: 24,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                aria-label={t.prev}
              >
                <ArrowLeft size={22} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: `1px solid ${colors.border}`,
                  background: colors.modalButtonBg,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "absolute",
                  right: 24,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                aria-label={t.next}
              >
                <ArrowRight size={22} />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(1100px, 92vw)",
              maxHeight: "90vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: 28,
                overflow: "hidden",
                border: `1px solid rgba(255,255,255,0.12)`,
                boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
                background: "#0d1117",
              }}
            >
              <img
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.title} ${lightbox.index + 1}`}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  background: "#090b10",
                }}
              />
            </div>

            {lightbox.images.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  maxWidth: "100%",
                  padding: "6px 4px",
                }}
              >
                {lightbox.images.map((thumb, idx) => {
                  const active = idx === lightbox.index;
                  return (
                    <button
                      key={thumb + idx}
                      type="button"
                      onClick={() => setLightbox((prev) => (prev ? { ...prev, index: idx } : prev))}
                      style={{
                        border: active ? `2px solid ${colors.gold}` : "1px solid rgba(255,255,255,0.14)",
                        background: "transparent",
                        padding: 0,
                        borderRadius: 16,
                        overflow: "hidden",
                        cursor: "pointer",
                        width: 86,
                        height: 86,
                        flex: "0 0 auto",
                        boxShadow: active ? `0 0 0 3px rgba(212,166,63,0.18)` : "none",
                        opacity: active ? 1 : 0.72,
                      }}
                    >
                      <img
                        src={thumb}
                        alt={`thumb ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {lightbox.title} • {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}