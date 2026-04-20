import { useMemo, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Star,
  Flame,
  Dumbbell,
  MessageCircle,
  Moon,
  Sun,
  MapPin,
  Clock3,
  Sparkles,
} from "lucide-react";
import { PACKAGES, ROUTE_PATHS, WHATSAPP_URL } from "@/lib/index";

type Lang = "ar" | "en";
type ThemeMode = "dark" | "light";
type ServiceTab = "online" | "sessions" | "courses";

const SERVICES_EXTRA = [
  {
    id: "sessions",
    icon: "⚡",
    title: "Recovery & Performance Sessions",
    titleAr: "جلسات الاستشفاء والأداء",
    subtitle: "Optimize Recovery. Maximize Results.",
    subtitleAr: "حسّن الاستشفاء. عظّم النتائج.",
    desc: "Science-backed recovery protocols to reduce injury risk, accelerate fat burn, and push your body to peak performance faster than any standard training approach.",
    descAr: "بروتوكولات استشفاء مدعومة علمياً لتقليل خطر الإصابات، تسريع حرق الدهون، ودفع جسمك للأداء الأمثل.",
    benefits: [
      { en: "Faster Recovery Between Sessions", ar: "استشفاء أسرع بين الجلسات" },
      { en: "Higher Fat Burn Rate", ar: "معدل حرق دهون أعلى" },
      { en: "Injury Prevention Protocol", ar: "بروتوكول تقليل الإصابات" },
      { en: "Performance Optimization", ar: "تحسين الأداء الرياضي" },
    ],
    price: "Starting 800 EGP/session",
    priceAr: "بداية من 800 جنيه / جلسة",
    color: "#D4AF37",
  },
  {
    id: "courses",
    icon: "🎓",
    title: "Coaching Courses & Bootcamps",
    titleAr: "كورسات وبوتكامبات التدريب",
    subtitle: "Become a Coach. Lead Others.",
    subtitleAr: "خليك كوتش… واصنع فريقك",
    desc: "Transform from athlete to coach. Dr. Ashraf shares decades of elite coaching knowledge condensed into actionable, career-changing courses taught by an IFBB Judge.",
    descAr: "تحول من رياضي لكوتش. د. أشرف يشارك عقوداً من المعرفة النخبوية في كورسات تغير مسيرتك المهنية.",
    benefits: [
      { en: "Nutrition Science Mastery", ar: "إتقان علوم التغذية" },
      { en: "Programming & Periodization", ar: "البرمجة والتدوير" },
      { en: "Competition Prep Secrets", ar: "أسرار تحضير البطولات" },
      { en: "Business of Coaching", ar: "أعمال الكوتشينج" },
    ],
    price: "Starting 3,500 EGP/course",
    priceAr: "بداية من 3,500 جنيه / كورس",
    color: "#22c55e",
  },
];

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56v1.91h2.77l-.44 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.25 1.65a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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

export default function Services() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("online");
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const isAr = lang === "ar";
  const isDark = theme === "dark";

  const FACEBOOK_LINK = "https://www.facebook.com/share/1DTjxnAxVL/?mibextid=wwXIfr";
  const INSTAGRAM_LINK =
    "https://www.instagram.com/dr.ashraf_el_abd?igsh=c2tpamFreXFuaGI%3D&utm_source=qr";
  const TIKTOK_LINK = "https://www.tiktok.com/@dr..ashraf.el.abd?_r=1&_t=ZS-95g5Q6SZ8zp";

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const SERVICES_PATH = ROUTE_PATHS?.SERVICES ?? "/services";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING ?? "/booking";

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
      headerBg: isDark ? "rgba(6,8,12,0.82)" : "rgba(255,255,255,0.86)",
      footerTop: isDark ? "#0d1117" : "#fbf7ef",
      footerBottom: isDark ? "#080b10" : "#f2eadc",
      heroButton: "linear-gradient(135deg, #d4a63f, #f0ca6b)",
      whatsappGlow: "0 12px 38px rgba(37, 211, 102, 0.28)",
      heroPanel: isDark ? "rgba(13,17,25,0.76)" : "rgba(255,255,255,0.87)",
    }),
    [isDark]
  );

  const t = useMemo(
    () => ({
      brand: isAr ? "د. أشرف العبد" : "Dr. Ashraf El Abd",
      brandSub: "ONLINE COACH • ELITE TRANSFORMATION",
      home: isAr ? "الرئيسية" : "Home",
      about: isAr ? "نبذة عنا" : "About",
      services: isAr ? "الخدمات" : "Services",
      contact: isAr ? "تواصل" : "Contact",
      bookNow: isAr ? "احجز الآن" : "Book Now",
      langBadge: isAr ? "E" : "ع",
      heroBadge: isAr ? "خدمات النخبة" : "Elite Services",
      heroTitle1: isAr ? "خدمات" : "Your Body Will",
      heroTitle2: isAr ? "تغير جسمك" : "Change",
      heroText: isAr ? "جسمك هيتغير… غصب عنه" : "Your Body Will Change. Guaranteed.",
      limited: isAr ? "أماكن محدودة — 20 عميل شهرياً" : "Only 20 clients accepted per month",
      online: isAr ? "تدريب أونلاين" : "Online Coaching",
      sessions: isAr ? "جلسات" : "Sessions",
      courses: isAr ? "كورسات وبوتكامبات" : "Courses & Bootcamps",
      onlineTitle: isAr ? "باقات التدريب الأونلاين" : "Online Coaching Packages",
      mainDriver: isAr ? "المحرك الرئيسي" : "Main Money Driver",
      paymentMethods: isAr ? "طرق الدفع" : "Payment Methods",
      whyTitle1: isAr ? "لماذا" : "Why",
      whyTitle2: isAr ? "د. أشرف" : "Dr. Ashraf",
      whyTitle3: isAr ? "هو الأفضل" : "Wins",
      finalTitle1: isAr ? "جاهز" : "Ready to",
      finalTitle2: isAr ? "تبدأ التحول؟" : "Transform?",
      finalBtn: isAr ? "احجز دلوقتي" : "Book Now",
      footerText: isAr
        ? "جميع الحجوزات والاستفسارات تتم مباشرة عبر واتساب."
        : "All bookings and inquiries are handled directly through WhatsApp.",
      quickLinks: isAr ? "روابط سريعة" : "Quick Links",
      coreServices: isAr ? "الخدمات الأساسية" : "Core Services",
      contactInfo: isAr ? "بيانات التواصل" : "Contact Info",
      followUs: isAr ? "تابعنا" : "Follow Us",
      onlineBooking: isAr ? "أونلاين + حجز مباشر عبر واتساب" : "Online + direct WhatsApp booking",
      bookingSchedule: isAr ? "الحجز حسب المواعيد المتاحة" : "Booking based on available schedule",
      rights: isAr ? "جميع الحقوق محفوظة © د. أشرف العبد" : "All rights reserved © Dr. Ashraf El Abd",
      premium: isAr ? "تجربة احترافية" : "Premium Experience",
      directWhatsApp: isAr ? "حجز مباشر عبر واتساب" : "Direct WhatsApp Booking",
      openNow: isAr ? "افتح الآن" : "Open Now",
      whatsapp: isAr ? "واتساب" : "WhatsApp",
      facebook: isAr ? "فيسبوك" : "Facebook",
      instagram: isAr ? "إنستجرام" : "Instagram",
      tiktok: isAr ? "تيك توك" : "TikTok",
      egypt: isAr ? "مصر" : "Egypt",
      international: isAr ? "دولي" : "International",
      bookViaWhatsApp: isAr ? "احجز عبر واتساب" : "Book via WhatsApp",
      transformText: isAr ? "مستعد تبدأ تحولك؟" : "Ready to transform?",
    }),
    [isAr]
  );

  const createWhatsAppLink = (message: string) => {
    const separator = WHATSAPP_URL.includes("?") ? "&" : "?";
    return `${WHATSAPP_URL}${separator}text=${encodeURIComponent(message)}`;
  };

  const getPackageWhatsAppLink = (pkg: any) => {
    const message = isAr
      ? `مرحبًا، أريد الحجز في باقة ${pkg.nameAr} (${pkg.name}) بسعر ${pkg.price} ${pkg.priceNoteAr || ""}`.trim()
      : `Hello, I want to book the ${pkg.name} package at ${pkg.price} ${pkg.priceNote || ""}`.trim();

    return createWhatsAppLink(message);
  };

  const getExtraServiceWhatsAppLink = (service: (typeof SERVICES_EXTRA)[number]) => {
    const message = isAr
      ? `مرحبًا، أريد الحجز في خدمة ${service.titleAr} (${service.title}) - ${service.priceAr}`
      : `Hello, I want to book ${service.title} - ${service.price}`;

    return createWhatsAppLink(message);
  };

  const getGeneralBookingLink = () => {
    const message = isAr
      ? "مرحبًا، أريد معرفة الخدمة المناسبة لي والحجز."
      : "Hello, I want to know the best service for me and book now.";
    return createWhatsAppLink(message);
  };

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
      dir={isAr ? "rtl" : "ltr"}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        fontFamily: "Cairo, sans-serif",
      }}
    >
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
                {t.brand}
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
              {t.about}
            </NavLink>
            <NavLink to={SERVICES_PATH} style={navLinkBase}>
              {t.services}
            </NavLink>
            <a
              href="#contact"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 14,
                padding: "11px 14px",
                borderRadius: 14,
              }}
            >
              {t.contact}
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
              aria-label={isDark ? "Light mode" : "Dark mode"}
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
              href={getGeneralBookingLink()}
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
        href={getGeneralBookingLink()}
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

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "90px 20px 70px",
          background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.section} 50%, ${colors.bg} 100%)`,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: colors.goldSoft,
            filter: "blur(24px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -90,
            left: -50,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: colors.goldStrong,
            filter: "blur(22px)",
          }}
        />

        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
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
              fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
              lineHeight: 1,
              margin: "0 0 14px",
              fontWeight: 900,
            }}
          >
            {t.heroTitle1}
            <br />
            <span style={{ color: colors.gold }}>{t.heroTitle2}</span>
          </h1>

          <p
            style={{
              color: colors.textMuted,
              maxWidth: 760,
              margin: "0 auto 24px",
              lineHeight: 1.9,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            {t.heroText}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 18px",
              borderRadius: 16,
              background: "rgba(139,0,0,0.15)",
              border: "1px solid rgba(220,38,38,0.3)",
              color: "#fca5a5",
              fontWeight: 800,
            }}
          >
            ⚠️ {t.limited}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: colors.sectionAlt,
          padding: "0",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {[
              { id: "online" as ServiceTab, label: t.online },
              { id: "sessions" as ServiceTab, label: t.sessions },
              { id: "courses" as ServiceTab, label: t.courses },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flexShrink: 0,
                  padding: "18px 24px",
                  fontSize: 14,
                  fontWeight: 900,
                  border: "none",
                  borderBottom: activeTab === tab.id ? `2px solid ${colors.gold}` : "2px solid transparent",
                  color: activeTab === tab.id ? colors.gold : colors.textMuted,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeTab === "online" && (
        <section style={{ padding: "60px 20px", background: colors.bg }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>
                {t.mainDriver}
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>
                {t.onlineTitle}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 22,
                marginBottom: 28,
              }}
            >
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: 24,
                    borderRadius: 28,
                    background: pkg.isPopular
                      ? `linear-gradient(135deg, ${colors.goldSoft} 0%, ${colors.bgCard} 100%)`
                      : pkg.isVip
                      ? "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(18,24,35,1) 100%)"
                      : colors.bgCard,
                    border: pkg.isPopular
                      ? `2px solid ${colors.gold}`
                      : pkg.isVip
                      ? "2px solid rgba(74,222,128,0.3)"
                      : `1px solid ${colors.border}`,
                    boxShadow: pkg.isPopular ? colors.glow : colors.shadow,
                  }}
                >
                  {(pkg.isPopular || pkg.isVip) && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "6px 12px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                        background: pkg.isPopular
                          ? "linear-gradient(135deg, #D4AF37, #B8860B)"
                          : "linear-gradient(135deg, #8B0000, #DC2626)",
                        color: pkg.isPopular ? "#111" : "#fff",
                      }}
                    >
                      {pkg.badge}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: pkg.isPopular ? colors.gold : pkg.isVip ? "#4ade80" : colors.text,
                    }}
                  >
                    {pkg.name}
                  </div>
                  <div style={{ color: colors.textMuted, marginTop: 4, marginBottom: 14, fontSize: 14 }}>
                    {pkg.nameAr}
                  </div>

                  <div
                    style={{
                      marginBottom: 18,
                      paddingBottom: 18,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={{ fontSize: 32, fontWeight: 900 }}>{pkg.price}</span>
                    <span style={{ color: colors.textMuted, marginInlineStart: 6, fontSize: 14 }}>
                      {pkg.priceNote}
                    </span>
                    <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
                      {pkg.priceNoteAr}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10, marginBottom: 14, flex: 1 }}>
                    {pkg.features.map((feature: string, i: number) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle size={15} style={{ color: colors.gold, flexShrink: 0 }} />
                        <span style={{ color: colors.textSoft, fontSize: 14 }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gap: 6, marginBottom: 18 }}>
                    {pkg.featuresAr.slice(0, 3).map((feature: string, i: number) => (
                      <div
                        key={i}
                        style={{
                          color: colors.textMuted,
                          fontSize: 12,
                          textAlign: isAr ? "right" : "left",
                        }}
                      >
                        ✓ {feature}
                      </div>
                    ))}
                  </div>

                  <a
                    href={getPackageWhatsAppLink(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "14px 18px",
                      borderRadius: 16,
                      textDecoration: "none",
                      fontWeight: 900,
                      background: pkg.isPopular ? colors.heroButton : "transparent",
                      border: pkg.isPopular ? "none" : `1px solid rgba(212,175,55,0.35)`,
                      color: pkg.isPopular ? "#111" : colors.gold,
                    }}
                  >
                    {pkg.cta} / {pkg.ctaAr}
                  </a>
                </div>
              ))}
            </div>

            <div
              style={{
                background: colors.bgSoft,
                border: `1px solid ${colors.border}`,
                borderRadius: 28,
                padding: 24,
                boxShadow: colors.shadow,
              }}
            >
              <h3 style={{ margin: "0 0 16px", textAlign: "center", fontSize: 22, fontWeight: 900, color: colors.gold }}>
                {t.paymentMethods}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  { name: "InstaPay", flag: "🇪🇬", type: t.egypt },
                  { name: "Vodafone Cash", flag: "🇪🇬", type: t.egypt },
                  { name: "Stripe", flag: "🌍", type: t.international },
                  { name: "PayPal", flag: "🌍", type: t.international },
                ].map((pm) => (
                  <div
                    key={pm.name}
                    style={{
                      background: colors.bgCard,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 18,
                      padding: 16,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{pm.flag}</div>
                    <div style={{ fontWeight: 900, fontSize: 14 }}>{pm.name}</div>
                    <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>{pm.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {(activeTab === "sessions" || activeTab === "courses") && (
        <section style={{ padding: "60px 20px", background: colors.bg }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            {SERVICES_EXTRA.filter((s) => {
              if (activeTab === "sessions") return s.id === "sessions";
              return s.id === "courses";
            }).map((service) => (
              <div key={service.id}>
                <div
                  style={{
                    background: colors.bgSoft,
                    border: `1px solid ${service.color}25`,
                    boxShadow: `0 0 40px ${service.color}10`,
                    borderRadius: 30,
                    padding: 30,
                    marginBottom: 26,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: 54 }}>{service.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ margin: "0 0 6px", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>
                        {isAr ? service.titleAr : service.title}
                      </h2>
                      <p style={{ margin: "0 0 12px", color: service.color, fontWeight: 800, fontSize: 20 }}>
                        {isAr ? service.subtitleAr : service.subtitle}
                      </p>
                      <p style={{ margin: "0 0 10px", color: colors.textSoft, lineHeight: 1.8, fontSize: 14 }}>
                        {isAr ? service.descAr : service.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 16,
                    marginBottom: 26,
                  }}
                >
                  {service.benefits.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: 18,
                        background: colors.bgCard,
                        border: `1px solid ${service.color}25`,
                        borderRadius: 20,
                        boxShadow: colors.shadow,
                      }}
                    >
                      <CheckCircle size={18} style={{ color: service.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 14 }}>
                          {isAr ? b.ar : b.en}
                        </div>
                        <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 3 }}>
                          {isAr ? b.en : b.ar}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 18,
                    flexWrap: "wrap",
                    padding: 24,
                    background: colors.bgSoft,
                    border: `1px solid ${service.color}25`,
                    borderRadius: 24,
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: service.color }}>
                      {isAr ? service.priceAr : service.price}
                    </div>
                  </div>

                  <a
                    href={getExtraServiceWhatsAppLink(service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "15px 24px",
                      borderRadius: 16,
                      textDecoration: "none",
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}88)`,
                      color: "#111",
                    }}
                  >
                    {t.bookViaWhatsApp}
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section
        style={{
          backgroundColor: colors.sectionAlt,
          padding: "80px 20px",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>
              {t.whyTitle1} <span style={{ color: colors.gold }}>{t.whyTitle2}</span> {t.whyTitle3}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {[
              {
                icon: <Star size={24} />,
                title: "IFBB Judge",
                titleAr: "حكم IFBB دولي",
                desc: "Sees what others miss. Builds what others can't.",
                descAr: "يشوف اللي غيره مشافهوش",
              },
              {
                icon: <Shield size={24} />,
                title: "University Professor",
                titleAr: "دكتور جامعة",
                desc: "PhD-backed science. Not fitness influencer nonsense.",
                descAr: "علم حقيقي مش كلام سوشيال ميديا",
              },
              {
                icon: <Zap size={24} />,
                title: "12+ Years Elite",
                titleAr: "12+ سنة نخبوية",
                desc: "Thousands of bodies transformed. Hundreds of champions.",
                descAr: "آلاف التحولات ومئات الأبطال",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 24,
                  padding: 24,
                  textAlign: "center",
                  boxShadow: colors.shadow,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 14,
                    color: colors.gold,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ fontWeight: 900, fontSize: 19, marginBottom: 6 }}>
                  {isAr ? item.titleAr : item.title}
                </div>
                <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                  {isAr ? item.descAr : item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "80px 20px",
          background: `linear-gradient(135deg, ${colors.section} 0%, ${colors.bg} 50%, ${colors.section} 100%)`,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 900 }}>
            {t.finalTitle1} <span style={{ color: colors.gold }}>{t.finalTitle2}</span>
          </h2>
          <p style={{ color: colors.textMuted, marginBottom: 28, fontSize: 18 }}>
            {t.transformText}
          </p>

          <a
            href={getGeneralBookingLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 30px",
              borderRadius: 18,
              background: colors.heroButton,
              color: "#111",
              textDecoration: "none",
              fontWeight: 900,
              boxShadow: "0 0 40px rgba(212,175,55,0.30)",
            }}
          >
            <Flame size={20} />
            {t.finalBtn}
          </a>
        </div>
      </section>

      <section id="contact" style={{ padding: "90px 20px", background: colors.section }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
                  {isAr ? "جاهز تبدأ معانا؟" : "Ready To Start?"}
                </h2>
                <p style={{ margin: "0 auto 22px", color: colors.textSoft, lineHeight: 1.9, maxWidth: 760 }}>
                  {isAr
                    ? "ابدأ المحادثة الآن واعرف الخدمة المناسبة لك."
                    : "Start your conversation now and discover the best service for you."}
                </p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
                  <a
                    href={getGeneralBookingLink()}
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
                    {t.bookNow}
                  </a>

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
                    {t.bookNow}
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
                  href={getGeneralBookingLink()}
                  icon={<MessageCircle size={20} />}
                  title={t.whatsapp}
                  subtitle={t.openNow}
                  accentColor="#25D366"
                  colors={colors}
                />

                <SocialLinkCard
                  href={FACEBOOK_LINK}
                  icon={<FacebookIcon size={20} />}
                  title={t.facebook}
                  subtitle={t.openNow}
                  accentColor="#1877F2"
                  colors={colors}
                />

                <SocialLinkCard
                  href={INSTAGRAM_LINK}
                  icon={<InstagramIcon size={20} />}
                  title={t.instagram}
                  subtitle={t.openNow}
                  accentColor="#E1306C"
                  colors={colors}
                />

                <SocialLinkCard
                  href={TIKTOK_LINK}
                  icon={<TikTokIcon size={20} />}
                  title={t.tiktok}
                  subtitle={t.openNow}
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
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <BrandLogo colors={colors} size={50} />

                <div>
                  <div style={{ color: colors.gold, fontWeight: 900, fontSize: 20 }}>
                    {t.brand}
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
                href={getGeneralBookingLink()}
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
                {t.whatsapp}
              </a>
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.quickLinks}</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <NavLink to={HOME_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.home}
                </NavLink>
                <NavLink to={ABOUT_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.about}
                </NavLink>
                <NavLink to={SERVICES_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.services}
                </NavLink>
                <NavLink to={BOOKING_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.bookNow}
                </NavLink>
                <a href="#contact" style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.contact}
                </a>
              </div>
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.coreServices}</h3>
              <div style={{ display: "grid", gap: 12, color: colors.textSoft, fontSize: 14 }}>
                <span>{isAr ? "التدريب الأونلاين" : "Online Coaching"}</span>
                <span>{isAr ? "جلسات الاستشفاء" : "Recovery Sessions"}</span>
                <span>{isAr ? "الكورسات والبوتكامب" : "Courses & Bootcamps"}</span>
                <span>{isAr ? "تحضير البطولات" : "Competition Prep"}</span>
                <span>{isAr ? "برامج التغذية" : "Nutrition Programs"}</span>
              </div>
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.contactInfo}</h3>
              <div style={{ display: "grid", gap: 14, color: colors.textSoft, fontSize: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={16} color={colors.gold} />
                  <span>{t.onlineBooking}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Clock3 size={16} color={colors.gold} />
                  <span>{t.bookingSchedule}</span>
                </div>

                <div style={{ marginTop: 4 }}>
                  <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 10 }}>{t.followUs}</div>
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
                      href={getGeneralBookingLink()}
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
              {t.rights}
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
              <span>{t.premium}</span>
              <span>•</span>
              <span>{t.directWhatsApp}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}