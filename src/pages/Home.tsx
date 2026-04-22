import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Crown,
  Dumbbell,
  Flame,
  HeartPulse,
  MapPin,
  MessageCircle,
  Moon,
  MonitorSmartphone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Target,
  Trophy,
  Users,
  Zap,
  ClipboardList,
  BadgeCheck,
  Camera,
  Send,
  UserCircle2,
} from "lucide-react";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { IMAGES, ROUTE_PATHS } from "@/lib/index";
import { db } from "@/lib/firebase";

type Lang = "ar" | "en" | "de";
type ThemeMode = "dark" | "light";

type ReviewItem = {
  id: string;
  name: string;
  goal: string;
  comment: string;
  rating: number;
  date: string;
};

type HomeContent = {
  heroTitle1Ar: string;
  heroTitle1En: string;
  heroTitle1De: string;
  heroTitle2Ar: string;
  heroTitle2En: string;
  heroTitle2De: string;
  heroTextAr: string;
  heroTextEn: string;
  heroTextDe: string;
  introTitleAr: string;
  introTitleEn: string;
  introTitleDe: string;
  introTextAr: string;
  introTextEn: string;
  introTextDe: string;
};

type SiteSettings = {
  whatsappNumber: string;
  whatsappMessageAr: string;
  facebookLink: string;
  instagramLink: string;
  tiktokLink: string;
  instaPayLink: string;
  vodafoneCashNumber: string;
  stripeLink: string;
  paypalLink: string;
  developerName: string;
  developerPhone: string;
  developerWhatsAppMessage: string;
};

const defaultHomeContent: HomeContent = {
  heroTitle1Ar: "خطة أونلاين",
  heroTitle1En: "Online Coaching",
  heroTitle1De: "Online-Coaching",
  heroTitle2Ar: "بنتيجة حقيقية",
  heroTitle2En: "With Real Results",
  heroTitle2De: "Mit echten Ergebnissen",
  heroTextAr:
    "برنامج احترافي للتدريب الأونلاين، متابعة مستمرة، وخطط واضحة تناسب الهدف والمستوى، مع تركيز قوي على النتائج وتحضير البطولات.",
  heroTextEn:
    "A professional online coaching experience with continuous follow-up, clear plans tailored to each goal and level, and strong focus on results and competition prep.",
  heroTextDe:
    "Ein professionelles Online-Coaching mit kontinuierlicher Betreuung, klaren Plänen passend zu jedem Ziel und Niveau sowie starkem Fokus auf Ergebnisse und Wettkampfvorbereitung.",
  introTitleAr: "تدريب أونلاين باحتراف",
  introTitleEn: "Professional Online Coaching",
  introTitleDe: "Professionelles Online-Coaching",
  introTextAr:
    "خدمة متكاملة تشمل التقييم، الخطة التدريبية، التغذية، المتابعة، والتعديلات المستمرة للوصول لأفضل نتيجة.",
  introTextEn:
    "A complete service including assessment, training plan, nutrition, follow-up, and continuous adjustments to achieve the best result.",
  introTextDe:
    "Ein kompletter Service mit Analyse, Trainingsplan, Ernährung, Betreuung und laufenden Anpassungen für das bestmögliche Ergebnis.",
};

const defaultSiteSettings: SiteSettings = {
  whatsappNumber: "201027570204",
  whatsappMessageAr: "مرحبا، أريد الاستفسار عن خدمات التدريب الأونلاين والحجز",
  facebookLink: "https://www.facebook.com/share/1DTjxnAxVL/?mibextid=wwXIfr",
  instagramLink:
    "https://www.instagram.com/dr.ashraf_el_abd?igsh=c2tpamFreXFuaGI%3D&utm_source=qr",
  tiktokLink: "https://www.tiktok.com/@dr..ashraf.el.abd?_r=1&_t=ZS-95g5Q6SZ8zp",
  instaPayLink: "https://ipn.eg/S/ashraf.elabd570204/instapay/2ybBGM",
  vodafoneCashNumber: "01027570204",
  stripeLink: "",
  paypalLink: "",
  developerName: "المهندس عمرو خالد",
  developerPhone: "201008454029",
  developerWhatsAppMessage: "مرحبًا، أريد الاستفسار بخصوص تطوير الموقع",
};

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
  size = 56,
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
        background: `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.03))`,
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
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 42%)",
          pointerEvents: "none",
        }}
      />
      <Dumbbell size={size * 0.44} strokeWidth={2.2} />
    </span>
  );
}

function HoverCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
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
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        border: `1px solid ${hovered ? accentColor : colors.border}`,
        background: hovered
          ? `linear-gradient(135deg, ${colors.bgSoft}, rgba(255,255,255,0.02))`
          : colors.bgSoft,
        color: colors.text,
        borderRadius: 22,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: hovered ? "0 18px 40px rgba(0,0,0,0.12)" : colors.shadow,
        transition: "all 0.28s ease",
        minHeight: 80,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <span
        style={{
          width: 50,
          height: 50,
          borderRadius: 16,
          background: hovered ? `${accentColor}15` : colors.goldSoft,
          color: accentColor,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.28s ease",
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

function SectionTitle({
  eyebrow,
  title,
  text,
  colors,
}: {
  eyebrow: string;
  title: string;
  text: string;
  colors: {
    gold: string;
    textSoft: string;
  };
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 12, letterSpacing: 0.3 }}>
        {eyebrow}
      </div>
      <h2
        style={{
          margin: "0 0 14px",
          fontSize: "clamp(2rem, 3vw, 3rem)",
          fontWeight: 900,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p style={{ margin: "0 auto", color: colors.textSoft, lineHeight: 1.95, maxWidth: 760 }}>
        {text}
      </p>
    </div>
  );
}

function StarsDisplay({
  value,
  activeColor,
  inactiveColor,
  size = 16,
}: {
  value: number;
  activeColor: string;
  inactiveColor: string;
  size?: number;
}) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < value ? activeColor : "transparent"}
          color={i < value ? activeColor : inactiveColor}
        />
      ))}
    </div>
  );
}

function StarsInput({
  value,
  onChange,
  activeColor,
  inactiveColor,
}: {
  value: number;
  onChange: (val: number) => void;
  activeColor: string;
  inactiveColor: string;
}) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange(starValue)}
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Star
              size={24}
              fill={starValue <= value ? activeColor : "transparent"}
              color={starValue <= value ? activeColor : inactiveColor}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  const [homeContent, setHomeContent] = useState<HomeContent>(defaultHomeContent);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    goal: "",
    comment: "",
    rating: 5,
  });

  const isAr = lang === "ar";
  const isEn = lang === "en";
  const isDark = theme === "dark";
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth < 1024;

  const colors = useMemo(
    () => ({
      bg: isDark ? "#07090e" : "#f7f1e8",
      bgSoft: isDark ? "#0d121b" : "#fffaf3",
      bgCard: isDark ? "#101722" : "#ffffff",
      section: isDark ? "#0b1018" : "#f3eade",
      sectionAlt: isDark ? "#0a0e15" : "#fcf6ee",
      text: isDark ? "#f7f2e8" : "#161616",
      textSoft: isDark ? "rgba(247,242,232,0.82)" : "rgba(22,22,22,0.78)",
      textMuted: isDark ? "rgba(247,242,232,0.54)" : "rgba(22,22,22,0.56)",
      gold: "#d4a63f",
      goldSoft: isDark ? "rgba(212,166,63,0.10)" : "rgba(212,166,63,0.12)",
      goldStrong: isDark ? "rgba(212,166,63,0.18)" : "rgba(212,166,63,0.16)",
      border: isDark ? "rgba(212,166,63,0.14)" : "rgba(212,166,63,0.16)",
      heroOverlay: isDark
        ? "linear-gradient(180deg, rgba(7,9,14,0.95) 0%, rgba(7,9,14,0.62) 42%, rgba(7,9,14,0.98) 100%)"
        : "linear-gradient(180deg, rgba(247,241,232,0.92) 0%, rgba(247,241,232,0.64) 42%, rgba(247,241,232,0.98) 100%)",
      shadow: isDark ? "0 18px 50px rgba(0,0,0,0.28)" : "0 12px 34px rgba(0,0,0,0.08)",
      glow: isDark
        ? "0 0 0 1px rgba(212,166,63,0.06), 0 18px 44px rgba(0,0,0,0.24)"
        : "0 0 0 1px rgba(212,166,63,0.12), 0 14px 34px rgba(0,0,0,0.06)",
      heroPanel: isDark ? "rgba(14,18,27,0.72)" : "rgba(255,255,255,0.86)",
      headerBg: isDark ? "rgba(7,9,14,0.78)" : "rgba(255,255,255,0.82)",
      footerTop: isDark ? "#0d121a" : "#fcf7ef",
      footerBottom: isDark ? "#080b11" : "#f2eadf",
      heroButton: "linear-gradient(135deg, #d4a63f, #f0ca6b)",
      whatsappGlow: "0 12px 38px rgba(37, 211, 102, 0.24)",
    }),
    [isDark]
  );

  const textByLang = (ar: string, en: string, de: string) => (isAr ? ar : isEn ? en : de);

  const dynamicHome = useMemo(
    () => ({
      heroTitle1: textByLang(
        homeContent.heroTitle1Ar || defaultHomeContent.heroTitle1Ar,
        homeContent.heroTitle1En || defaultHomeContent.heroTitle1En,
        homeContent.heroTitle1De || defaultHomeContent.heroTitle1De
      ),
      heroTitle2: textByLang(
        homeContent.heroTitle2Ar || defaultHomeContent.heroTitle2Ar,
        homeContent.heroTitle2En || defaultHomeContent.heroTitle2En,
        homeContent.heroTitle2De || defaultHomeContent.heroTitle2De
      ),
      heroText: textByLang(
        homeContent.heroTextAr || defaultHomeContent.heroTextAr,
        homeContent.heroTextEn || defaultHomeContent.heroTextEn,
        homeContent.heroTextDe || defaultHomeContent.heroTextDe
      ),
      introTitle: textByLang(
        homeContent.introTitleAr || defaultHomeContent.introTitleAr,
        homeContent.introTitleEn || defaultHomeContent.introTitleEn,
        homeContent.introTitleDe || defaultHomeContent.introTitleDe
      ),
      introText: textByLang(
        homeContent.introTextAr || defaultHomeContent.introTextAr,
        homeContent.introTextEn || defaultHomeContent.introTextEn,
        homeContent.introTextDe || defaultHomeContent.introTextDe
      ),
    }),
    [homeContent, isAr, isEn]
  );

  const whatsappLink = useMemo(
    () =>
      `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
        siteSettings.whatsappMessageAr || defaultSiteSettings.whatsappMessageAr
      )}`,
    [siteSettings]
  );

  const developerWhatsapp = useMemo(
    () =>
      `https://wa.me/${siteSettings.developerPhone}?text=${encodeURIComponent(
        siteSettings.developerWhatsAppMessage || defaultSiteSettings.developerWhatsAppMessage
      )}`,
    [siteSettings]
  );

  const t = useMemo(() => {
    if (isAr) {
      return {
        brand: "د. أشرف العبد",
        brandSub: "ONLINE COACH • ELITE TRANSFORMATION",
        home: "الرئيسية",
        navAbout: "نبذة عني",
        navClasses: "الكلاسات",
        navBooking: "الحجز",
        navTransformations: "التحولات",

        heroBadge: "ONLINE COACHING • BODY TRANSFORMATION",
        heroPrimary: "ابدأ على واتساب",
        heroSecondary: "تفاصيل الأونلاين كوتشينج",
        heroBooking: "احجز الآن",
        heroTransformations: "شاهد التحولات",

        sectionServices: "الأونلاين كوتشينج",
        sectionServicesTitle: "الخدمة الأساسية بالموقع",
        sectionServicesText:
          "التركيز الرئيسي هنا على عرض خدمة الأونلاين كوتشينج بشكل واضح واحترافي، مع إبراز قيمة المتابعة والخطة والنتائج.",

        systemSection: "مميزات الخدمة",
        systemTitle: "نظام واضح، متابعة حقيقية، ونتيجة قابلة للقياس",
        systemText:
          "الخدمة ليست مجرد جدول، بل منظومة متكاملة مبنية على وضوح، متابعة، تعديل مستمر، والتزام بالهدف.",

        finalTitle: "جاهز تبدأ؟",
        finalText:
          "ابدأ الآن وخد أول خطوة في برنامج أونلاين مناسب لهدفك، مستواك، وطبيعة جسمك.",
        finalBtn: "احجز استفسارك الآن",
        serviceBtn: "صفحة الأونلاين كوتشينج",
        transformationsBtn: "صفحة التحولات",

        footerText:
          "التركيز الأساسي على خدمات التدريب الأونلاين وتحضير البطولات مع تواصل مباشر عبر واتساب.",
        rights: "جميع الحقوق محفوظة © د. أشرف العبد",

        stat1: "متابعة مستمرة",
        stat2: "خطط مخصصة",
        stat3: "نتائج واضحة",
        stat4: "تحضير بطولات",

        eliteTag: "أونلاين كوتشينج",
        footerQuick: "روابط سريعة",
        footerServices: "الأقسام الأساسية",
        footerContact: "بيانات التواصل",
        footerFollow: "تابعنا",
        footerLocation: "أونلاين + تواصل مباشر عبر واتساب",
        footerHours: "المتابعة حسب المواعيد المتاحة",
        whatsappNow: "راسلنا الآن",
        knowServices: "تعرف على التفاصيل",
        statsTitle: "مميزات المنظومة",
        socialWhatsapp: "واتساب",
        socialFacebook: "فيسبوك",
        socialInstagram: "إنستجرام",
        socialTikTok: "تيك توك",
        socialAction: "افتح الآن",
        heroMini1: "متابعة مستمرة",
        heroMini2: "خطة مخصصة",
        heroMini3: "نتيجة حقيقية",
        developerCredit: "تم التطوير بواسطة",
        developerRole: "برمجة وتطوير واجهات",
        modernDesign: "تصميم حديث موجه للتدريب الأونلاين",
        themeLight: "فاتح",
        themeDark: "ليلي",
        devWhatsapp: "تواصل واتساب",
        loadingReviews: "جاري تحميل التقييمات...",
        noReviews: "لا توجد تقييمات بعد.",
      };
    }

    if (isEn) {
      return {
        brand: "Dr. Ashraf El Abd",
        brandSub: "ONLINE COACH • ELITE TRANSFORMATION",
        home: "Home",
        navAbout: "About",
        navClasses: "Classes",
        navBooking: "Booking",
        navTransformations: "Transformations",

        heroBadge: "ONLINE COACHING • BODY TRANSFORMATION",
        heroPrimary: "Start on WhatsApp",
        heroSecondary: "Online Coaching Details",
        heroBooking: "Book Now",
        heroTransformations: "View Transformations",

        sectionServices: "Online Coaching",
        sectionServicesTitle: "The Core Service Of The Website",
        sectionServicesText:
          "The main focus here is presenting online coaching in a clear and professional way, highlighting follow-up, planning, and results.",

        systemSection: "System Highlights",
        systemTitle: "Clear System, Real Follow-up & Measurable Results",
        systemText:
          "This is not just a program sheet. It is a complete coaching system built on clarity, follow-up, smart adjustments, and commitment to the goal.",

        finalTitle: "Ready To Start?",
        finalText:
          "Start now and take your first step into an online coaching program tailored to your goal, level, and body type.",
        finalBtn: "Book Your Inquiry",
        serviceBtn: "Online Coaching Page",
        transformationsBtn: "Transformations Page",

        footerText:
          "Main focus on online coaching and competition prep with direct contact through WhatsApp.",
        rights: "All rights reserved © Dr. Ashraf El Abd",

        stat1: "Continuous Follow-up",
        stat2: "Custom Plans",
        stat3: "Visible Results",
        stat4: "Competition Prep",

        eliteTag: "Online Coaching",
        footerQuick: "Quick Links",
        footerServices: "Core Sections",
        footerContact: "Contact Info",
        footerFollow: "Follow Us",
        footerLocation: "Online + Direct WhatsApp Contact",
        footerHours: "Follow-up based on available schedule",
        whatsappNow: "Chat on WhatsApp",
        knowServices: "Know The Details",
        statsTitle: "System Highlights",
        socialWhatsapp: "WhatsApp",
        socialFacebook: "Facebook",
        socialInstagram: "Instagram",
        socialTikTok: "TikTok",
        socialAction: "Open Now",
        heroMini1: "Continuous Follow-up",
        heroMini2: "Custom Plan",
        heroMini3: "Real Result",
        developerCredit: "Developed by",
        developerRole: "Frontend & Web Development",
        modernDesign: "Modern design focused on online coaching",
        themeLight: "Light",
        themeDark: "Dark",
        devWhatsapp: "WhatsApp Contact",
        loadingReviews: "Loading reviews...",
        noReviews: "No reviews yet.",
      };
    }

    return {
      brand: "Dr. Ashraf El Abd",
      brandSub: "ONLINE COACH • ELITE TRANSFORMATION",
      home: "Startseite",
      navAbout: "Über mich",
      navClasses: "Kurse",
      navBooking: "Buchung",
      navTransformations: "Transformationen",

      heroBadge: "ONLINE-COACHING • BODY TRANSFORMATION",
      heroPrimary: "Auf WhatsApp starten",
      heroSecondary: "Details zum Online-Coaching",
      heroBooking: "Jetzt buchen",
      heroTransformations: "Transformationen ansehen",

      sectionServices: "Online-Coaching",
      sectionServicesTitle: "Die Hauptleistung der Website",
      sectionServicesText:
        "Der Schwerpunkt liegt hier auf einer klaren und professionellen Präsentation des Online-Coachings mit Fokus auf Betreuung, Planung und Ergebnissen.",

      systemSection: "Service-Vorteile",
      systemTitle: "Klares System, echte Betreuung und messbare Ergebnisse",
      systemText:
        "Das ist nicht nur ein Plan, sondern ein komplettes Coaching-System mit Klarheit, Betreuung, laufenden Anpassungen und Zielorientierung.",

      finalTitle: "Bereit zu starten?",
      finalText:
        "Starte jetzt und mache den ersten Schritt in ein Online-Coaching-Programm, das zu deinem Ziel, deinem Niveau und deinem Körper passt.",
      finalBtn: "Jetzt anfragen",
      serviceBtn: "Online-Coaching-Seite",
      transformationsBtn: "Transformations-Seite",

      footerText:
        "Der Hauptfokus liegt auf Online-Coaching und Wettkampfvorbereitung mit direktem Kontakt über WhatsApp.",
      rights: "Alle Rechte vorbehalten © Dr. Ashraf El Abd",

      stat1: "Kontinuierliche Betreuung",
      stat2: "Individuelle Pläne",
      stat3: "Klare Ergebnisse",
      stat4: "Wettkampfvorbereitung",

      eliteTag: "Online-Coaching",
      footerQuick: "Schnellzugriffe",
      footerServices: "Kernbereiche",
      footerContact: "Kontakt",
      footerFollow: "Folge uns",
      footerLocation: "Online + direkter WhatsApp-Kontakt",
      footerHours: "Betreuung nach verfügbaren Zeiten",
      whatsappNow: "Jetzt schreiben",
      knowServices: "Mehr erfahren",
      statsTitle: "System-Vorteile",
      socialWhatsapp: "WhatsApp",
      socialFacebook: "Facebook",
      socialInstagram: "Instagram",
      socialTikTok: "TikTok",
      socialAction: "Jetzt öffnen",
      heroMini1: "Kontinuierliche Betreuung",
      heroMini2: "Individueller Plan",
      heroMini3: "Echtes Ergebnis",
      developerCredit: "Entwickelt von",
      developerRole: "Frontend- & Webentwicklung",
      modernDesign: "Modernes Design mit Fokus auf Online-Coaching",
      themeLight: "Hell",
      themeDark: "Dunkel",
      devWhatsapp: "WhatsApp-Kontakt",
      loadingReviews: "Bewertungen werden geladen...",
      noReviews: "Noch keine Bewertungen.",
    };
  }, [isAr, isEn]);

  const reviewText = useMemo(
    () => ({
      eyebrow: isAr ? "آراء العملاء" : isEn ? "Client Reviews" : "Kundenbewertungen",
      title: isAr ? "الناس بتقول إيه عن الكابتن؟" : isEn ? "What Do Clients Say?" : "Was sagen die Kunden?",
      text: isAr
         
        ? "A dedicated section for rating the captain with stars and comments in a clean visual layout."
        : "Ein eigener Bereich für Sternebewertungen und Kommentare in einem klaren, angenehmen Layout.",

      average: isAr ? "متوسط التقييم" : isEn ? "Average Rating" : "Durchschnittsbewertung",
      total: isAr ? "عدد التقييمات" : isEn ? "Total Reviews" : "Gesamtbewertungen",
      top: isAr ? "تقييمات 5 نجوم" : isEn ? "5-Star Reviews" : "5-Sterne-Bewertungen",
      latest: isAr ? "أحدث تقييم" : isEn ? "Latest Review" : "Neueste Bewertung",

      writeTitle: isAr ? "اكتب تقييمك" : isEn ? "Write Your Review" : "Schreibe deine Bewertung",
      writeText: isAr
        ? "سيب رأيك في التجربة، واكتب التقييم والكومنت."
        : isEn
        ? "Share your experience by leaving a rating and a comment."
        : "Teile deine Erfahrung mit einer Bewertung und einem Kommentar.",

      yourName: isAr ? "اسمك" : isEn ? "Your Name" : "Dein Name",
      yourGoal: isAr ? "هدفك" : isEn ? "Your Goal" : "Dein Ziel",
      yourComment: isAr ? "الكومنت" : isEn ? "Comment" : "Kommentar",
      yourRating: isAr ? "تقييمك" : isEn ? "Your Rating" : "Deine Bewertung",
      submit: isAr ? "إرسال التقييم" : isEn ? "Submit Review" : "Bewertung senden",
      success: isAr
        ? "تم إرسال التقييم بنجاح"
        : isEn
        ? "Review submitted successfully"
        : "Bewertung erfolgreich gesendet",

      placeholderName: isAr ? "اكتب اسمك" : isEn ? "Enter your name" : "Name eingeben",
      placeholderGoal: isAr
        ? "مثال: خسارة دهون / بناء عضل"
        : isEn
        ? "Example: Fat Loss / Muscle Gain"
        : "Beispiel: Fettabbau / Muskelaufbau",
      placeholderComment: isAr
        ? "اكتب رأيك في التجربة..."
        : isEn
        ? "Write your feedback..."
        : "Schreibe dein Feedback...",
    }),
    [isAr, isEn]
  );

  const services = useMemo(
    () => [
      {
        icon: <MonitorSmartphone size={20} />,
        title: isAr ? "برنامج تدريب أونلاين" : isEn ? "Online Training Program" : "Online-Trainingsprogramm",
        desc: isAr
          ? "خطة تدريب مخصصة حسب الهدف، المستوى، ونمط الحياة."
          : isEn
          ? "A training program tailored to your goal, level, and lifestyle."
          : "Ein Trainingsprogramm, das auf dein Ziel, dein Niveau und deinen Lebensstil abgestimmt ist.",
      },
      {
        icon: <HeartPulse size={20} />,
        title: isAr ? "خطة تغذية" : isEn ? "Nutrition Plan" : "Ernährungsplan",
        desc: isAr
          ? "نظام غذائي عملي ومرن يناسب الهدف اليومي."
          : isEn
          ? "A practical and flexible nutrition plan aligned with your goal."
          : "Ein praktischer und flexibler Ernährungsplan passend zu deinem Ziel.",
      },
      {
        icon: <ClipboardList size={20} />,
        title: isAr ? "متابعة وتقييم" : isEn ? "Follow-up & Evaluation" : "Betreuung & Auswertung",
        desc: isAr
          ? "متابعة مستمرة وتقييم دوري للتقدم والالتزام."
          : isEn
          ? "Continuous follow-up and regular evaluation of progress and consistency."
          : "Kontinuierliche Betreuung und regelmäßige Auswertung von Fortschritt und Disziplin.",
      },
      {
        icon: <BadgeCheck size={20} />,
        title: isAr ? "تعديلات مستمرة" : isEn ? "Ongoing Adjustments" : "Laufende Anpassungen",
        desc: isAr
          ? "تعديل الخطة حسب الاستجابة والنتائج الفعلية."
          : isEn
          ? "Plan adjustments based on actual response and results."
          : "Anpassung des Plans auf Basis der tatsächlichen Reaktion und Ergebnisse.",
      },
      {
        icon: <Trophy size={20} />,
        title: isAr ? "تحضير بطولات" : isEn ? "Competition Prep" : "Wettkampfvorbereitung",
        desc: isAr
          ? "تحضير احترافي للبطولات والوصول لأفضل فورمة."
          : isEn
          ? "Professional competition prep to reach your best condition."
          : "Professionelle Wettkampfvorbereitung, um in Bestform zu kommen.",
      },
      {
        icon: <ShieldCheck size={20} />,
        title: isAr ? "نتائج قابلة للقياس" : isEn ? "Measurable Results" : "Messbare Ergebnisse",
        desc: isAr
          ? "متابعة الأداء والنتائج بشكل واضح ومباشر."
          : isEn
          ? "Track performance and results clearly and directly."
          : "Leistung und Ergebnisse klar und direkt verfolgen.",
      },
    ],
    [isAr, isEn]
  );

  const programSteps = useMemo(
    () => [
      {
        icon: <Target size={18} />,
        title: isAr ? "تقييم البداية" : isEn ? "Initial Assessment" : "Erste Analyse",
        text: isAr
          ? "تحديد الهدف، المستوى، ونقطة البداية بدقة."
          : isEn
          ? "Identify your goal, level, and exact starting point."
          : "Ziel, Niveau und Ausgangspunkt präzise bestimmen.",
      },
      {
        icon: <Dumbbell size={18} />,
        title: isAr ? "خطة التدريب" : isEn ? "Training Plan" : "Trainingsplan",
        text: isAr
          ? "برنامج تدريبي مخصص حسب الاحتياج."
          : isEn
          ? "A tailored training structure built around your needs."
          : "Ein individueller Trainingsplan nach deinem Bedarf.",
      },
      {
        icon: <HeartPulse size={18} />,
        title: isAr ? "خطة التغذية" : isEn ? "Nutrition Plan" : "Ernährungsplan",
        text: isAr
          ? "نظام غذائي عملي يناسب الهدف."
          : isEn
          ? "A realistic nutrition plan aligned with your goal."
          : "Ein realistischer Ernährungsplan passend zu deinem Ziel.",
      },
      {
        icon: <Users size={18} />,
        title: isAr ? "المتابعة" : isEn ? "Follow-up" : "Betreuung",
        text: isAr
          ? "متابعة دورية وتواصل مستمر."
          : isEn
          ? "Regular follow-up and ongoing communication."
          : "Regelmäßige Betreuung und kontinuierliche Kommunikation.",
      },
    ],
    [isAr, isEn]
  );

  const heroStats = useMemo(
    () => [
      { icon: <Star size={16} />, label: t.stat1, value: "1:1", progress: "90%" },
      { icon: <Users size={16} />, label: t.stat2, value: "100%", progress: "86%" },
      { icon: <Target size={16} />, label: t.stat3, value: "Real", progress: "84%" },
      { icon: <Flame size={16} />, label: t.stat4, value: "Elite", progress: "80%" },
    ],
    [t]
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const unsubHome = onSnapshot(doc(db, "siteContent", "home"), (snapshot) => {
      if (!snapshot.exists()) return;
      setHomeContent({ ...defaultHomeContent, ...(snapshot.data() as Partial<HomeContent>) });
    });

    const unsubSettings = onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      if (!snapshot.exists()) return;
      setSiteSettings({ ...defaultSiteSettings, ...(snapshot.data() as Partial<SiteSettings>) });
    });

    const unsubReviews = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const data: ReviewItem[] = snapshot.docs
        .map((docSnap) => {
          const d = docSnap.data() as Omit<ReviewItem, "id">;
          return {
            id: docSnap.id,
            name: d.name || "",
            goal: d.goal || "",
            comment: d.comment || "",
            rating: Number(d.rating || 5),
            date: d.date || "",
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date));

      setUserReviews(data);
      setReviewsLoading(false);
    });

    return () => {
      unsubHome();
      unsubSettings();
      unsubReviews();
    };
  }, []);

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;

    const newReview = {
      name: reviewForm.name.trim(),
      goal: reviewForm.goal.trim() || (isAr ? "عميل" : isEn ? "Client" : "Kunde"),
      comment: reviewForm.comment.trim(),
      rating: reviewForm.rating,
      date: new Date().toISOString().slice(0, 10),
    };

    await addDoc(collection(db, "reviews"), newReview);

    setReviewForm({
      name: "",
      goal: "",
      comment: "",
      rating: 5,
    });
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 2500);
  };

  const averageRating = useMemo(() => {
    if (!userReviews.length) return 0;
    const total = userReviews.reduce((sum, item) => sum + item.rating, 0);
    return total / userReviews.length;
  }, [userReviews]);

  const fiveStarsCount = useMemo(
    () => userReviews.filter((item) => item.rating === 5).length,
    [userReviews]
  );

  const latestReviewDate = useMemo(() => {
    if (!userReviews.length) return "-";
    return userReviews[0]?.date ?? "-";
  }, [userReviews]);

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const CLASSES_PATH = ROUTE_PATHS?.CLASSES ?? "/classes";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING ?? "/booking";
  const TRANSFORMATIONS_PATH = ROUTE_PATHS?.TRANSFORMATIONS ?? "/transformations";

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
      whiteSpace: "nowrap",
    }) as const;

  const mobileQuickLinks = [
    { to: ABOUT_PATH, label: t.navAbout },
    { to: CLASSES_PATH, label: t.navClasses },
    { to: TRANSFORMATIONS_PATH, label: t.navTransformations },
    { to: BOOKING_PATH, label: t.navBooking },
  ];

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    color: colors.text,
    outline: "none",
    fontFamily: "Cairo, sans-serif",
    fontSize: 14,
  };

  return (
    <div
      dir={rootDir}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      <header
        style={{
          position: isMobile ? "relative" : "sticky",
          top: isMobile ? undefined : 0,
          zIndex: 120,
          background: colors.headerBg,
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: isMobile ? "none" : "0 6px 22px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            maxWidth: 1260,
            margin: "0 auto",
            padding: isMobile ? "12px 14px" : "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <NavLink
            to={HOME_PATH}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <BrandLogo colors={colors} size={48} />

            <div>
              <div style={{ color: colors.gold, fontWeight: 900, fontSize: 18 }}>{t.brand}</div>
              <div style={{ color: colors.textMuted, fontSize: 11 }}>{t.brandSub}</div>
            </div>
          </NavLink>

          {!isTablet && (
            <nav style={{ display: "flex", gap: 8 }}>
              {[
                { to: HOME_PATH, label: t.home },
                { to: ABOUT_PATH, label: t.navAbout },
                { to: CLASSES_PATH, label: t.navClasses },
                { to: TRANSFORMATIONS_PATH, label: t.navTransformations },
                { to: BOOKING_PATH, label: t.navBooking },
              ].map((item) => (
                <NavLink key={item.to} to={item.to} style={navLinkBase}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              style={{
                height: 40,
                minWidth: isMobile ? 132 : 145,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                background: colors.bgSoft,
                color: colors.text,
                fontWeight: 800,
                padding: isAr ? "0 12px 0 38px" : "0 38px 0 12px",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                boxShadow: colors.shadow,
              }}
              aria-label="Language selector"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>

            <button
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              style={{
                height: 40,
                minWidth: isMobile ? 94 : 118,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                background: colors.bgSoft,
                color: colors.text,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "0 14px",
                fontWeight: 800,
                boxShadow: colors.shadow,
                transition: "all 0.25s ease",
              }}
              aria-label="Theme toggle"
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  background: colors.goldSoft,
                  color: colors.gold,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
              </span>
              <span>{isDark ? t.themeDark : t.themeLight}</span>
            </button>
          </div>
        </div>

        {isTablet && (
          <div
            style={{
              maxWidth: 1260,
              margin: "0 auto",
              padding: "0 14px 12px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {mobileQuickLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={({ isActive }) => ({
                    color: isActive ? colors.gold : colors.text,
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: 13,
                    padding: "10px 14px",
                    borderRadius: 999,
                    background: isActive ? colors.goldSoft : colors.bgSoft,
                    border: `1px solid ${colors.border}`,
                    whiteSpace: "nowrap",
                    boxShadow: isActive ? colors.glow : "none",
                    flexShrink: 0,
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          position: "fixed",
          bottom: 20,
          [isAr ? "left" : "right"]: 20,
          zIndex: 100,
          width: isMobile ? 58 : 62,
          height: isMobile ? 58 : 62,
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

      <section
        style={{
          position: "relative",
          minHeight: isMobile ? "auto" : "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${IMAGES?.hero ?? ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: isDark ? "brightness(0.24) contrast(1.05)" : "brightness(0.92) contrast(1.02)",
            transform: "scale(1.03)",
          }}
        />

        <div style={{ position: "absolute", inset: 0, background: colors.heroOverlay }} />

        <div
          style={{
            position: "absolute",
            top: -120,
            [isAr ? "right" : "left"]: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: colors.goldSoft,
            filter: "blur(30px)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -100,
            [isAr ? "left" : "right"]: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: colors.goldStrong,
            filter: "blur(28px)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1260,
            margin: "0 auto",
            padding: isMobile ? "44px 14px 54px" : "100px 20px 70px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 1.08fr) minmax(0, 0.92fr)",
              gap: isMobile ? 24 : 42,
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: rootAlign }}>
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
                  boxShadow: colors.glow,
                }}
              >
                <Sparkles size={14} />
                {t.heroBadge}
              </div>

              <h1
                style={{
                  fontSize: isMobile ? "2.45rem" : "clamp(3rem, 6vw, 5.4rem)",
                  lineHeight: 0.98,
                  margin: "0 0 18px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  maxWidth: 760,
                }}
              >
                {dynamicHome.heroTitle1}{" "}
                <span
                  style={{
                    color: colors.gold,
                    display: "inline-block",
                    textShadow: isDark ? "0 8px 24px rgba(212,166,63,0.16)" : "none",
                  }}
                >
                  {dynamicHome.heroTitle2}
                </span>
              </h1>

              <p
                style={{
                  color: colors.textSoft,
                  fontSize: isMobile ? 15 : 17,
                  lineHeight: 1.95,
                  maxWidth: 640,
                  margin: isAr ? "0 0 30px auto" : "0 auto 30px 0",
                }}
              >
                {dynamicHome.heroText}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 18,
                  justifyContent: isAr ? "flex-end" : "flex-start",
                }}
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: colors.heroButton,
                    color: "#111",
                    textDecoration: "none",
                    padding: isMobile ? "14px 18px" : "15px 24px",
                    borderRadius: 16,
                    fontWeight: 900,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    boxShadow: "0 12px 28px rgba(212,166,63,0.22)",
                    fontSize: 15,
                  }}
                >
                  {t.heroPrimary}
                  <ArrowRight size={16} />
                </a>

                <NavLink
                  to={CLASSES_PATH}
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    background: colors.heroPanel,
                    textDecoration: "none",
                    padding: isMobile ? "14px 18px" : "15px 22px",
                    borderRadius: 16,
                    fontWeight: 800,
                    boxShadow: colors.shadow,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {t.heroSecondary}
                </NavLink>

                <NavLink
                  to={TRANSFORMATIONS_PATH}
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    background: colors.heroPanel,
                    textDecoration: "none",
                    padding: isMobile ? "14px 18px" : "15px 22px",
                    borderRadius: 16,
                    fontWeight: 800,
                    boxShadow: colors.shadow,
                    backdropFilter: "blur(10px)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Camera size={15} />
                  {t.heroTransformations}
                </NavLink>

                <NavLink
                  to={BOOKING_PATH}
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    background: "transparent",
                    textDecoration: "none",
                    padding: isMobile ? "14px 18px" : "15px 20px",
                    borderRadius: 16,
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Play size={15} />
                  {t.heroBooking}
                </NavLink>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: isAr ? "flex-end" : "flex-start",
                  marginBottom: 24,
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
                      padding: "10px 14px",
                      fontSize: 13,
                      fontWeight: 800,
                      boxShadow: colors.shadow,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 8 }}>
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
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(165px, 1fr))",
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
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        boxShadow: colors.shadow,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
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

                      <span style={{ fontWeight: 800, color: colors.text, fontSize: 14 }}>{item.label}</span>

                      <div
                        style={{
                          height: 6,
                          width: "100%",
                          borderRadius: 999,
                          background: colors.goldSoft,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
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
                  overflow: "hidden",
                  boxShadow: colors.glow,
                  position: "relative",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    [isAr ? "left" : "right"]: 18,
                    zIndex: 3,
                    background: isDark ? "rgba(8,9,12,0.74)" : "rgba(255,255,255,0.92)",
                    border: `1px solid ${colors.border}`,
                    color: colors.gold,
                    padding: "8px 12px",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontWeight: 800,
                    fontSize: 13,
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
                    width: "100%",
                    height: isMobile ? 420 : 620,
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div style={{ padding: isMobile ? 20 : 28, textAlign: rootAlign }}>
                  <div
                    style={{
                      color: colors.gold,
                      fontWeight: 800,
                      fontSize: 13,
                      marginBottom: 8,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Zap size={14} />
                    {isAr ? "تركيز كامل على النتائج" : isEn ? "Full Focus On Results" : "Voller Fokus auf Ergebnisse"}
                  </div>

                  <h2 style={{ margin: "0 0 10px", fontSize: isMobile ? 24 : 30, lineHeight: 1.2 }}>
                    {dynamicHome.introTitle}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: colors.textSoft,
                      lineHeight: 1.95,
                      fontSize: 15,
                    }}
                  >
                    {dynamicHome.introText}
                  </p>

                  <div style={{ marginTop: 18 }}>
                    <NavLink
                      to={ABOUT_PATH}
                      style={{
                        color: colors.gold,
                        textDecoration: "none",
                        fontWeight: 800,
                        display: "inline-flex",
                        alignItems: "center",
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

      <section style={{ padding: isMobile ? "74px 14px" : "110px 20px", background: colors.bg }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <SectionTitle
            eyebrow={t.sectionServices}
            title={t.sectionServicesTitle}
            text={t.sectionServicesText}
            colors={colors}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {services.map((service) => (
              <HoverCard
                key={service.title}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 24,
                  padding: 24,
                  boxShadow: colors.shadow,
                  textAlign: rootAlign,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 18,
                    background: colors.goldSoft,
                    color: colors.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {service.icon}
                </div>

                <h3 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 900 }}>{service.title}</h3>
                <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.9, fontSize: 14 }}>{service.desc}</p>
              </HoverCard>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <NavLink
              to={CLASSES_PATH}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: colors.heroButton,
                color: "#111",
                textDecoration: "none",
                padding: "14px 24px",
                borderRadius: 16,
                fontWeight: 900,
                boxShadow: "0 12px 28px rgba(212,166,63,0.22)",
              }}
            >
              {t.serviceBtn}
              <ArrowRight size={16} />
            </NavLink>

            <NavLink
              to={CLASSES_PATH}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                background: colors.bgCard,
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: 16,
                fontWeight: 800,
                boxShadow: colors.shadow,
              }}
            >
              {t.navClasses}
            </NavLink>

            <NavLink
              to={TRANSFORMATIONS_PATH}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                background: colors.bgCard,
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: 16,
                fontWeight: 800,
                boxShadow: colors.shadow,
              }}
            >
              <Camera size={16} />
              {t.transformationsBtn}
            </NavLink>

            <NavLink
              to={BOOKING_PATH}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: colors.heroButton,
                color: "#111",
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: 16,
                fontWeight: 900,
                boxShadow: "0 12px 28px rgba(212,166,63,0.22)",
              }}
            >
              {t.navBooking}
            </NavLink>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "74px 14px" : "110px 20px", background: colors.sectionAlt }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <SectionTitle
            eyebrow={t.systemSection}
            title={t.systemTitle}
            text={t.systemText}
            colors={colors}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {programSteps.map((item) => (
              <HoverCard
                key={item.title}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 22,
                  padding: 22,
                  boxShadow: colors.shadow,
                  textAlign: rootAlign,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    background: colors.goldSoft,
                    color: colors.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 17 }}>{item.title}</div>
                <div style={{ color: colors.textSoft, fontSize: 14, lineHeight: 1.85 }}>{item.text}</div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "74px 14px" : "110px 20px", background: colors.bg }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <SectionTitle
            eyebrow={reviewText.eyebrow}
            title={reviewText.title}
            text={reviewText.text}
            colors={colors}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "320px minmax(0, 1fr)",
              gap: 20,
              alignItems: "start",
              marginBottom: 22,
            }}
          >
            <div style={{ display: "grid", gap: 16 }}>
              <HoverCard
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 22,
                  padding: 20,
                  boxShadow: colors.shadow,
                }}
              >
                <div style={{ color: colors.textMuted, fontSize: 13, marginBottom: 10 }}>
                  {reviewText.average}
                </div>
                <div style={{ fontWeight: 900, fontSize: 32, color: colors.gold, marginBottom: 10 }}>
                  {averageRating.toFixed(1)}
                </div>
                <StarsDisplay
                  value={Math.round(averageRating)}
                  activeColor={colors.gold}
                  inactiveColor={colors.textMuted}
                  size={18}
                />
              </HoverCard>

              <HoverCard
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 22,
                  padding: 20,
                  boxShadow: colors.shadow,
                }}
              >
                <div style={{ color: colors.textMuted, fontSize: 13, marginBottom: 10 }}>
                  {reviewText.total}
                </div>
                <div style={{ fontWeight: 900, fontSize: 32, color: colors.gold }}>
                  {userReviews.length}
                </div>
              </HoverCard>

              <HoverCard
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 22,
                  padding: 20,
                  boxShadow: colors.shadow,
                }}
              >
                <div style={{ color: colors.textMuted, fontSize: 13, marginBottom: 10 }}>
                  {reviewText.top}
                </div>
                <div style={{ fontWeight: 900, fontSize: 32, color: colors.gold }}>
                  {fiveStarsCount}
                </div>
              </HoverCard>

              <HoverCard
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 22,
                  padding: 20,
                  boxShadow: colors.shadow,
                }}
              >
                <div style={{ color: colors.textMuted, fontSize: 13, marginBottom: 10 }}>
                  {reviewText.latest}
                </div>
                <div style={{ fontWeight: 900, fontSize: 22, color: colors.gold }}>
                  {latestReviewDate}
                </div>
              </HoverCard>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {reviewsLoading ? (
                <div
                  style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 22,
                    padding: 22,
                    boxShadow: colors.shadow,
                    color: colors.textMuted,
                  }}
                >
                  {t.loadingReviews}
                </div>
              ) : userReviews.length === 0 ? (
                <div
                  style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 22,
                    padding: 22,
                    boxShadow: colors.shadow,
                    color: colors.textMuted,
                  }}
                >
                  {t.noReviews}
                </div>
              ) : (
                userReviews.map((review) => (
                  <HoverCard
                    key={review.id}
                    style={{
                      background: colors.bgCard,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 22,
                      padding: 20,
                      boxShadow: colors.shadow,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        gap: 14,
                        flexDirection: isMobile ? "column" : "row",
                        marginBottom: 14,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 16,
                            background: colors.goldSoft,
                            color: colors.gold,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <UserCircle2 size={24} />
                        </span>

                        <div>
                          <div style={{ fontWeight: 900, fontSize: 16 }}>{review.name}</div>
                          <div style={{ color: colors.textMuted, fontSize: 13 }}>{review.goal}</div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: isMobile ? "flex-start" : "center",
                          flexDirection: isMobile ? "column" : "row",
                          gap: 10,
                        }}
                      >
                        <StarsDisplay
                          value={review.rating}
                          activeColor={colors.gold}
                          inactiveColor={colors.textMuted}
                        />
                        <span style={{ color: colors.textMuted, fontSize: 13 }}>{review.date}</span>
                      </div>
                    </div>

                    <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.95 }}>{review.comment}</p>
                  </HoverCard>
                ))
              )}
            </div>
          </div>

          <div
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 26,
              padding: isMobile ? 20 : 28,
              boxShadow: colors.shadow,
            }}
          >
            <div style={{ textAlign: rootAlign, marginBottom: 22 }}>
              <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>
                {reviewText.writeTitle}
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 900 }}>
                {reviewText.writeTitle}
              </h3>
              <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.9 }}>
                {reviewText.writeText}
              </p>
            </div>

            <form onSubmit={handleReviewSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 800,
                      color: colors.gold,
                    }}
                  >
                    {reviewText.yourName}
                  </label>
                  <input
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={reviewText.placeholderName}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 800,
                      color: colors.gold,
                    }}
                  >
                    {reviewText.yourGoal}
                  </label>
                  <input
                    value={reviewForm.goal}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, goal: e.target.value }))}
                    placeholder={reviewText.placeholderGoal}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 10,
                    fontWeight: 800,
                    color: colors.gold,
                  }}
                >
                  {reviewText.yourRating}
                </label>
                <StarsInput
                  value={reviewForm.rating}
                  onChange={(value) => setReviewForm((prev) => ({ ...prev, rating: value }))}
                  activeColor={colors.gold}
                  inactiveColor={colors.textMuted}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 800,
                    color: colors.gold,
                  }}
                >
                  {reviewText.yourComment}
                </label>
                <textarea
                  rows={5}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                  placeholder={reviewText.placeholderComment}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: isMobile ? "stretch" : "center",
                  justifyContent: "space-between",
                  gap: 14,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: reviewSuccess ? "#25D366" : colors.textMuted,
                    fontWeight: 800,
                    minHeight: 24,
                  }}
                >
                  {reviewSuccess && <BadgeCheck size={18} />}
                  {reviewSuccess ? reviewText.success : ""}
                </div>

                <button
                  type="submit"
                  style={{
                    background: colors.heroButton,
                    color: "#111",
                    border: "none",
                    padding: "14px 22px",
                    borderRadius: 16,
                    fontWeight: 900,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 12px 28px rgba(212,166,63,0.22)",
                    minWidth: isMobile ? "100%" : "auto",
                  }}
                >
                  <Send size={16} />
                  {reviewText.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: isMobile ? "74px 14px" : "110px 20px", background: colors.section }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 30,
              padding: isMobile ? 24 : 42,
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
                <h2 style={{ margin: "0 0 12px", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 900 }}>
                  {t.finalTitle}
                </h2>
                <p style={{ margin: "0 auto 24px", color: colors.textSoft, lineHeight: 1.9, maxWidth: 760 }}>
                  {t.finalText}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: 28,
                  }}
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: colors.heroButton,
                      color: "#111",
                      textDecoration: "none",
                      padding: "13px 22px",
                      borderRadius: 14,
                      fontWeight: 900,
                      boxShadow: "0 12px 28px rgba(212,166,63,0.22)",
                    }}
                  >
                    {t.finalBtn}
                  </a>

                  <NavLink
                    to={CLASSES_PATH}
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

                  <NavLink
                    to={TRANSFORMATIONS_PATH}
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
                    {t.transformationsBtn}
                  </NavLink>

                  <NavLink
                    to={BOOKING_PATH}
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
                    {t.navBooking}
                  </NavLink>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                <SocialLinkCard
                  href={whatsappLink}
                  icon={<MessageCircle size={20} />}
                  title={t.socialWhatsapp}
                  subtitle={t.socialAction}
                  accentColor="#25D366"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.facebookLink}
                  icon={<FacebookIcon size={20} />}
                  title={t.socialFacebook}
                  subtitle={t.socialAction}
                  accentColor="#1877F2"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.instagramLink}
                  icon={<InstagramIcon size={20} />}
                  title={t.socialInstagram}
                  subtitle={t.socialAction}
                  accentColor="#E1306C"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.tiktokLink}
                  icon={<TikTokIcon size={20} />}
                  title={t.socialTikTok}
                  subtitle={t.socialAction}
                  accentColor={isDark ? "#ffffff" : "#111111"}
                  colors={colors}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          background: `linear-gradient(180deg, ${colors.footerTop} 0%, ${colors.footerBottom} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "40px 14px 22px" : "54px 20px 26px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
              marginBottom: 28,
            }}
          >
            <div style={{ textAlign: rootAlign }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <BrandLogo colors={colors} size={50} />
                <div>
                  <div style={{ color: colors.gold, fontWeight: 900, fontSize: 20 }}>{t.brand}</div>
                  <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700, marginTop: 3 }}>
                    {t.brandSub}
                  </div>
                </div>
              </div>

              <p style={{ color: colors.textSoft, lineHeight: 1.9, margin: "0 0 18px", fontSize: 14 }}>
                {t.footerText}
              </p>

              <a
                href={whatsappLink}
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
                  boxShadow: "0 12px 28px rgba(212,166,63,0.20)",
                }}
              >
                <MessageCircle size={16} />
                {t.whatsappNow}
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
                <NavLink to={CLASSES_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navClasses}
                </NavLink>
                <NavLink
                  to={TRANSFORMATIONS_PATH}
                  style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}
                >
                  {t.navTransformations}
                </NavLink>
                <NavLink to={BOOKING_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navBooking}
                </NavLink>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.footerServices}</h3>
              <div style={{ display: "grid", gap: 12, color: colors.textSoft, fontSize: 14 }}>
                <span>{isAr ? "الكلاسات" : isEn ? "Classes" : "Kurse"}</span>
                <span>{isAr ? "التدريب الأونلاين" : isEn ? "Online Coaching" : "Online-Coaching"}</span>
                <span>
                  {isAr
                    ? "جلسات الاستشفاء والأداء"
                    : isEn
                    ? "Recovery & Performance"
                    : "Regeneration & Performance"}
                </span>
                <span>
                  {isAr
                    ? "الكورسات والبوتكامبات"
                    : isEn
                    ? "Courses & Bootcamps"
                    : "Kurse & Bootcamps"}
                </span>
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
                      href={siteSettings.instagramLink || "#"}
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
                      <InstagramIcon size={18} />
                    </a>

                    <a
                      href={siteSettings.facebookLink || "#"}
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
                      href={siteSettings.tiktokLink || "#"}
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
                      href={whatsappLink}
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
              alignItems: isMobile ? "stretch" : "center",
              flexDirection: isMobile ? "column" : "row",
              gap: 14,
              color: colors.textMuted,
              fontSize: 13,
            }}
          >
            <span>{t.rights}</span>

            <div
              style={{
                width: isMobile ? "100%" : "auto",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: isMobile ? "14px" : "12px 16px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.02))`,
                border: `1px solid ${colors.border}`,
                boxShadow: colors.glow,
              }}
            >
              <div
                style={{
                  textAlign: isMobile ? "center" : rootAlign,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700 }}>
                  {t.developerCredit}
                </span>
                <span style={{ color: colors.gold, fontWeight: 900, fontSize: 15 }}>
                  {siteSettings.developerName || defaultSiteSettings.developerName}
                </span>
                <span style={{ color: colors.textMuted, fontSize: 12 }}>{t.developerRole}</span>
              </div>

              <a
                href={developerWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#111",
                  fontWeight: 900,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "11px 16px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #25D366, #53df87)",
                  boxShadow: "0 10px 24px rgba(37,211,102,0.22)",
                  minWidth: isMobile ? "100%" : "auto",
                }}
              >
                <MessageCircle size={16} />
                {t.devWhatsapp}
              </a>
            </div>

            <span>{t.modernDesign}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}