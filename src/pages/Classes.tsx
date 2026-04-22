import { useMemo, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crown,
  Dumbbell,
  Flame,
  GraduationCap,
  HeartPulse,
  Layers3,
  MapPin,
  MessageCircle,
  Moon,
  Shield,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Tv,
  Wallet,
  Zap,
} from "lucide-react";
import { ROUTE_PATHS } from "@/lib/index";

type Lang = "ar" | "en" | "de";
type ThemeMode = "dark" | "light";
type ServiceTab = "online" | "sessions" | "courses";

type LocalizedText = {
  ar: string;
  en: string;
  de: string;
};

type OnlinePackage = {
  id: string;
  brand: string;
  localName: LocalizedText;
  price: string;
  priceNote: LocalizedText;
  badge?: LocalizedText;
  features: LocalizedText[];
  cta: LocalizedText;
  highlight?: boolean;
  vip?: boolean;
};

type ExtraPackage = {
  id: string;
  localName: LocalizedText;
  subtitle: LocalizedText;
  price: LocalizedText;
  badge?: LocalizedText;
  features: LocalizedText[];
  cta: LocalizedText;
  color: string;
  highlight?: boolean;
};

type LeadOffer = {
  icon: ReactNode;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  bullets: LocalizedText[];
  startingPrice: LocalizedText;
  cta: LocalizedText;
  color: string;
};

type PaymentMethod = {
  id: string;
  icon: string;
  name: LocalizedText;
  region: LocalizedText;
  color: string;
};

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
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 42%)",
          pointerEvents: "none",
        }}
      />
      <Dumbbell size={size * 0.44} strokeWidth={2.2} />
    </span>
  );
}

function MiniStatCard({
  value,
  label,
  colors,
}: {
  value: string;
  label: string;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    gold: string;
    textMuted: string;
  };
}) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 20,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadow,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 900, color: colors.gold, marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 800 }}>{label}</div>
    </div>
  );
}

function AchievementCard({
  icon,
  text,
  colors,
}: {
  icon: ReactNode;
  text: string;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    gold: string;
    goldSoft: string;
    textSoft: string;
  };
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: 18,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 22,
        boxShadow: colors.shadow,
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: colors.goldSoft,
          color: colors.gold,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div style={{ color: colors.textSoft, fontSize: 14, lineHeight: 1.9 }}>{text}</div>
    </div>
  );
}

function PaymentCard({
  method,
  lang,
  colors,
}: {
  method: PaymentMethod;
  lang: Lang;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    textMuted: string;
    goldSoft: string;
  };
}) {
  const getText = (v: LocalizedText) => (lang === "ar" ? v.ar : lang === "en" ? v.en : v.de);

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 22,
        padding: 22,
        boxShadow: colors.shadow,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 34, marginBottom: 10 }}>{method.icon}</div>
      <div style={{ fontWeight: 900, fontSize: 18, color: method.color, marginBottom: 8 }}>
        {getText(method.name)}
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 12px",
          borderRadius: 999,
          background: colors.goldSoft,
          color: colors.textMuted,
          fontSize: 12,
          fontWeight: 900,
        }}
      >
        {getText(method.region)}
      </div>
    </div>
  );
}

function WhyCard({
  title,
  text,
  icon,
  colors,
}: {
  title: string;
  text: string;
  icon: ReactNode;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    gold: string;
    goldSoft: string;
    textMuted: string;
    text: string;
  };
}) {
  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 24,
        padding: 24,
        boxShadow: colors.shadow,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 16,
          background: colors.goldSoft,
          color: colors.gold,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 900, fontSize: 19, marginBottom: 8, color: colors.text }}>{title}</div>
      <div style={{ color: colors.textMuted, lineHeight: 1.85, fontSize: 14 }}>{text}</div>
    </div>
  );
}

function OnlinePackageCard({
  item,
  lang,
  colors,
  href,
}: {
  item: OnlinePackage;
  lang: Lang;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    glow: string;
    text: string;
    textMuted: string;
    textSoft: string;
    gold: string;
    goldSoft: string;
    heroButton: string;
    success: string;
  };
  href: string;
}) {
  const getText = (v: LocalizedText) => (lang === "ar" ? v.ar : lang === "en" ? v.en : v.de);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        borderRadius: 30,
        background: item.highlight
          ? `linear-gradient(135deg, ${colors.goldSoft} 0%, ${colors.bgCard} 100%)`
          : item.vip
          ? "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(18,24,35,1) 100%)"
          : colors.bgCard,
        border: item.highlight
          ? `2px solid ${colors.gold}`
          : item.vip
          ? `2px solid rgba(34,197,94,0.28)`
          : `1px solid ${colors.border}`,
        boxShadow: item.highlight ? colors.glow : colors.shadow,
        overflow: "hidden",
      }}
    >
      {item.badge && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 900,
            whiteSpace: "nowrap",
            background: item.vip
              ? "linear-gradient(135deg, #22c55e, #16a34a)"
              : "linear-gradient(135deg, #D4AF37, #B8860B)",
            color: "#111",
          }}
        >
          {getText(item.badge)}
        </div>
      )}

      <div style={{ marginTop: item.badge ? 10 : 0 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: item.highlight ? colors.gold : item.vip ? colors.success : colors.text,
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          {item.brand}
        </div>

        <div style={{ color: colors.textMuted, fontWeight: 800, marginBottom: 16 }}>
          {getText(item.localName)}
        </div>
      </div>

      <div
        style={{
          marginBottom: 18,
          paddingBottom: 18,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 900 }}>{item.price}</span>
        <span style={{ color: colors.textMuted, marginInlineStart: 6, fontSize: 14 }}>
          {getText(item.priceNote)}
        </span>
      </div>

      <div style={{ display: "grid", gap: 10, marginBottom: 18, flex: 1 }}>
        {item.features.map((feature, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2
              size={15}
              style={{
                color: item.highlight ? colors.gold : item.vip ? colors.success : colors.gold,
                flexShrink: 0,
              }}
            />
            <span style={{ color: colors.textSoft, fontSize: 14 }}>{getText(feature)}</span>
          </div>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          textAlign: "center",
          padding: "14px 18px",
          borderRadius: 16,
          textDecoration: "none",
          fontWeight: 900,
          background: item.highlight || item.vip ? colors.heroButton : "transparent",
          border: item.highlight || item.vip ? "none" : `1px solid ${colors.gold}55`,
          color: item.highlight || item.vip ? "#111" : colors.gold,
        }}
      >
        {getText(item.cta)}
      </a>
    </div>
  );
}

function ExtraPackageCard({
  item,
  lang,
  colors,
  href,
}: {
  item: ExtraPackage;
  lang: Lang;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    glow: string;
    textMuted: string;
    textSoft: string;
    goldSoft: string;
    heroButton: string;
  };
  href: string;
}) {
  const getText = (v: LocalizedText) => (lang === "ar" ? v.ar : lang === "en" ? v.en : v.de);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        borderRadius: 30,
        background: item.highlight
          ? `linear-gradient(135deg, ${colors.goldSoft} 0%, ${colors.bgCard} 100%)`
          : colors.bgCard,
        border: item.highlight ? `2px solid ${item.color}` : `1px solid ${colors.border}`,
        boxShadow: item.highlight ? colors.glow : colors.shadow,
      }}
    >
      {item.badge && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 900,
            whiteSpace: "nowrap",
            background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
            color: "#111",
          }}
        >
          {getText(item.badge)}
        </div>
      )}

      <div style={{ marginTop: item.badge ? 10 : 0 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: item.color, lineHeight: 1.1, marginBottom: 8 }}>
          {getText(item.localName)}
        </div>
        <div style={{ color: colors.textMuted, marginBottom: 16, fontSize: 14 }}>
          {getText(item.subtitle)}
        </div>
      </div>

      <div
        style={{
          marginBottom: 18,
          paddingBottom: 18,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 900 }}>{getText(item.price)}</span>
      </div>

      <div style={{ display: "grid", gap: 10, marginBottom: 18, flex: 1 }}>
        {item.features.map((feature, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={15} style={{ color: item.color, flexShrink: 0 }} />
            <span style={{ color: colors.textSoft, fontSize: 14 }}>{getText(feature)}</span>
          </div>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          textAlign: "center",
          padding: "14px 18px",
          borderRadius: 16,
          textDecoration: "none",
          fontWeight: 900,
          background: item.highlight ? colors.heroButton : "transparent",
          border: item.highlight ? "none" : `1px solid ${item.color}55`,
          color: item.highlight ? "#111" : item.color,
        }}
      >
        {getText(item.cta)}
      </a>
    </div>
  );
}

function LeadOfferCard({
  item,
  lang,
  colors,
  href,
}: {
  item: LeadOffer;
  lang: Lang;
  colors: {
    bgCard: string;
    border: string;
    shadow: string;
    glow: string;
    text: string;
    textMuted: string;
    textSoft: string;
    goldSoft: string;
    heroButton: string;
  };
  href: string;
}) {
  const getText = (v: LocalizedText) => (lang === "ar" ? v.ar : lang === "en" ? v.en : v.de);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.goldSoft} 0%, ${colors.bgCard} 100%)`,
        border: `1px solid ${colors.border}`,
        borderRadius: 30,
        padding: 28,
        boxShadow: colors.glow,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 26,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: `${item.color}22`,
              color: item.color,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {item.icon}
          </div>

          <h2 style={{ margin: "0 0 8px", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900 }}>
            {getText(item.title)}
          </h2>

          <div style={{ color: item.color, fontWeight: 900, fontSize: 18, marginBottom: 14 }}>
            {getText(item.subtitle)}
          </div>

          <p style={{ color: colors.textSoft, lineHeight: 1.95, margin: "0 0 16px" }}>
            {getText(item.description)}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 16,
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              fontWeight: 900,
              marginBottom: 16,
            }}
          >
            <Wallet size={16} color={item.color} />
            {getText(item.startingPrice)}
          </div>

          <div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: colors.heroButton,
                color: "#111",
                textDecoration: "none",
                padding: "14px 20px",
                borderRadius: 16,
                fontWeight: 900,
              }}
            >
              {getText(item.cta)}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {item.bullets.map((bullet, index) => (
            <div
              key={index}
              style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 22,
                padding: 18,
                boxShadow: colors.shadow,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: `${item.color}18`,
                  color: item.color,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                  fontWeight: 900,
                }}
              >
                ✓
              </div>
              <div style={{ color: colors.textSoft, fontSize: 14, lineHeight: 1.8 }}>
                {getText(bullet)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Classes() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("online");
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const isAr = lang === "ar";
  const isEn = lang === "en";
  const isDark = theme === "dark";

  const tr = (ar: string, en: string, de: string) => (isAr ? ar : isEn ? en : de);

  const PHONE = "201027570204";
  const createWhatsAppLink = (message: string) =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const SERVICES_PATH = ROUTE_PATHS?.SERVICES ?? "/services";
  const CLASSES_PATH = ROUTE_PATHS?.CLASSES ?? "/classes";
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
      goldStrong: isDark ? "rgba(212,166,63,0.22)" : "rgba(212,166,63,0.18)",
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
      success: "#22c55e",
      cyan: "#06b6d4",
      orange: "#f59e0b",
    }),
    [isDark]
  );

  const onlinePackages: OnlinePackage[] = [
    {
      id: "basic",
      brand: "BASIC",
      localName: {
        ar: "أساسي",
        en: "Basic",
        de: "Basis",
      },
      price: "1,200 EGP/month",
      priceNote: {
        ar: "/شهر",
        en: "/month",
        de: "/Monat",
      },
      features: [
        { ar: "خطة تغذية مخصصة", en: "Custom Nutrition Plan", de: "Individueller Ernährungsplan" },
        { ar: "برنامج تمارين أسبوعي", en: "Weekly Workout Program", de: "Wöchentliches Trainingsprogramm" },
        { ar: "متابعة واتساب (مرتين/أسبوع)", en: "WhatsApp Check-ins (2x/week)", de: "WhatsApp-Check-ins (2x/Woche)" },
        { ar: "تتبع التقدم", en: "Progress Tracking", de: "Fortschrittsverfolgung" },
        { ar: "مكتبة فيديوهات تدريبية", en: "Video Library Access", de: "Zugang zur Videobibliothek" },
      ],
      cta: {
        ar: "ابدأ دلوقتي",
        en: "Start Now",
        de: "Jetzt starten",
      },
    },
    {
      id: "pro",
      brand: "PRO",
      localName: {
        ar: "برو",
        en: "Pro",
        de: "Pro",
      },
      price: "2,800 EGP/month",
      priceNote: {
        ar: "/شهر",
        en: "/month",
        de: "/Monat",
      },
      badge: {
        ar: "الأكثر طلبًا 🔥",
        en: "MOST POPULAR 🔥",
        de: "AM BELIEBTESTEN 🔥",
      },
      features: [
        { ar: "كل حاجة في الأساسي", en: "Everything in Basic", de: "Alles aus Basic" },
        { ar: "دعم واتساب يومي", en: "Daily WhatsApp Support", de: "Täglicher WhatsApp-Support" },
        { ar: "تغذية راجعة فيديو أسبوعية", en: "Weekly Video Feedback", de: "Wöchentliches Video-Feedback" },
        { ar: "بروتوكول سابلمنت", en: "Supplement Protocol", de: "Supplement-Protokoll" },
        { ar: "دليل تحضير البطولات", en: "Competition Prep Guide", de: "Leitfaden zur Wettkampfvorbereitung" },
        { ar: "مكالمات فيديو شهرية", en: "Monthly Video Calls", de: "Monatliche Videoanrufe" },
      ],
      cta: {
        ar: "انضم للبرو",
        en: "Join the PRO",
        de: "PRO beitreten",
      },
      highlight: true,
    },
    {
      id: "vip",
      brand: "VIP ELITE",
      localName: {
        ar: "VIP النخبة",
        en: "VIP Elite",
        de: "VIP Elite",
      },
      price: "5,500 EGP/month",
      priceNote: {
        ar: "/شهر",
        en: "/month",
        de: "/Monat",
      },
      badge: {
        ar: "⚠️ محدود — 5 أماكن فقط",
        en: "⚠️ LIMITED — 5 SPOTS",
        de: "⚠️ LIMITIERT — 5 PLÄTZE",
      },
      features: [
        { ar: "كل حاجة في البرو", en: "Everything in PRO", de: "Alles aus PRO" },
        { ar: "وصول مباشر 24/7", en: "24/7 Direct Access", de: "Direkter Zugang 24/7" },
        { ar: "مكالمات فيديو كل أسبوعين", en: "Bi-weekly Video Calls", de: "Videoanrufe alle zwei Wochen" },
        { ar: "تحليل نتائج الدم", en: "Blood Work Analysis", de: "Blutwerte-Analyse" },
        { ar: "تدريب الوقفة والمسرح", en: "Posing & Stage Coaching", de: "Posing- & Bühnen-Coaching" },
        { ar: "خطة تحول مدى الحياة", en: "Lifetime Transformation Plan", de: "Lebenslanger Transformationsplan" },
        { ar: "رد أولوية أقل من ساعتين", en: "Priority Response < 2 Hours", de: "Priorisierte Antwort < 2 Stunden" },
      ],
      cta: {
        ar: "احجز مكانك VIP",
        en: "Claim Your VIP Spot",
        de: "Sichere dir deinen VIP-Platz",
      },
      vip: true,
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "instapay",
      icon: "🇪🇬",
      name: { ar: "InstaPay", en: "InstaPay", de: "InstaPay" },
      region: { ar: "مصر", en: "Egypt", de: "Ägypten" },
      color: "#10b981",
    },
    {
      id: "vodafone",
      icon: "🇪🇬",
      name: { ar: "Vodafone Cash", en: "Vodafone Cash", de: "Vodafone Cash" },
      region: { ar: "مصر", en: "Egypt", de: "Ägypten" },
      color: "#ef4444",
    },
    {
      id: "stripe",
      icon: "🌍",
      name: { ar: "Stripe", en: "Stripe", de: "Stripe" },
      region: { ar: "دولي", en: "International", de: "International" },
      color: "#6366f1",
    },
    {
      id: "paypal",
      icon: "🌍",
      name: { ar: "PayPal", en: "PayPal", de: "PayPal" },
      region: { ar: "دولي", en: "International", de: "International" },
      color: "#0ea5e9",
    },
  ];

  const whyBest = [
    {
      title: tr("حكم IFBB دولي", "IFBB International Judge", "Internationaler IFBB-Kampfrichter"),
      text: tr("يشوف اللي غيره مشافهوش", "Sees what others miss", "Er erkennt, was andere übersehen"),
      icon: <Trophy size={22} />,
    },
    {
      title: tr("دكتور جامعة", "University Doctor", "Universitätsdozent"),
      text: tr(
        "علم حقيقي مش كلام سوشيال ميديا",
        "Real science, not social media talk",
        "Echte Wissenschaft, nicht Social-Media-Gerede"
      ),
      icon: <Award size={22} />,
    },
    {
      title: tr("12+ سنة نخبوية", "12+ Elite Years", "12+ Elite-Jahre"),
      text: tr(
        "آلاف التحولات ومئات الأبطال",
        "Thousands of transformations and hundreds of champions",
        "Tausende Transformationen und Hunderte Champions"
      ),
      icon: <Crown size={22} />,
    },
  ];

  const onlineAchievements = [
    tr(
      "أكثر من 15 سنة خبرة عملية في التحول البدني وتطوير الرياضيين.",
      "15+ years of practical coaching experience in body transformation and athlete development.",
      "Über 15 Jahre praktische Coaching-Erfahrung in Körpertransformation und Athletenentwicklung."
    ),
    tr(
      "خلفية أكاديمية وتحكيم IFBB تضيف دقة وتنظيم ونتائج قابلة للقياس.",
      "Academic background and IFBB judging experience add precision, structure, and measurable results.",
      "Akademischer Hintergrund und IFBB-Kampfrichter-Erfahrung bringen Präzision, Struktur und messbare Ergebnisse."
    ),
  ];

  const sessionsAchievements = [
    tr(
      "فهم عملي قوي للاستشفاء ودعم الأداء وتقليل الإجهاد الناتج عن التدريب.",
      "Strong practical understanding of recovery, performance support, and reducing training fatigue.",
      "Starkes praktisches Verständnis für Regeneration, Leistungsunterstützung und geringere Trainingsbelastung."
    ),
    tr(
      "خبرة ميدانية تطبيقية مع رياضيين ومتدربين في أهداف بدنية مختلفة.",
      "Applied field experience with athletes and trainees across different physical goals.",
      "Praxisnahe Erfahrung mit Athleten und Trainierenden mit unterschiedlichen körperlichen Zielen."
    ),
  ];

  const coursesAchievements = [
    tr(
      "محاضر أكاديمي بخبرة تدريبية عملية، وليس مجرد محتوى نظري.",
      "Academic lecturer with hands-on coaching experience, not just theory.",
      "Akademischer Dozent mit praktischer Coaching-Erfahrung, nicht nur Theorie."
    ),
    tr(
      "خلفية تحكيمية وتدريبية احترافية تعطي قيمة تعليمية أعمق.",
      "Professional judging and coaching background that gives deeper educational value.",
      "Professioneller Hintergrund in Wertung und Coaching mit tieferem Bildungswert."
    ),
  ];

  const sessionsLeadOffer: LeadOffer = {
    icon: <Zap size={28} />,
    title: {
      ar: "جلسات الاستشفاء والأداء",
      en: "Recovery & Performance Sessions",
      de: "Regenerations- & Performance-Sitzungen",
    },
    subtitle: {
      ar: "حسّن الاستشفاء. عظّم النتائج.",
      en: "Improve Recovery. Maximize Results.",
      de: "Regeneration verbessern. Ergebnisse maximieren.",
    },
    description: {
      ar: "بروتوكولات استشفاء مدعومة علمياً لتقليل خطر الإصابات، تسريع حرق الدهون، ودفع جسمك للأداء الأمثل.",
      en: "Science-backed recovery protocols to reduce injury risk, speed up fat loss, and push your body toward optimal performance.",
      de: "Wissenschaftlich gestützte Regenerationsprotokolle zur Verringerung des Verletzungsrisikos, Beschleunigung des Fettabbaus und Optimierung deiner Leistung.",
    },
    bullets: [
      { ar: "استشفاء أسرع بين الجلسات", en: "Faster Recovery Between Sessions", de: "Schnellere Regeneration zwischen den Einheiten" },
      { ar: "معدل حرق دهون أعلى", en: "Higher Fat Burn Rate", de: "Höhere Fettverbrennungsrate" },
      { ar: "بروتوكول تقليل الإصابات", en: "Injury Prevention Protocol", de: "Verletzungspräventions-Protokoll" },
      { ar: "تحسين الأداء الرياضي", en: "Performance Optimization", de: "Leistungsoptimierung" },
    ],
    startingPrice: {
      ar: "بداية من 800 جنيه / جلسة",
      en: "Starting from 800 EGP / session",
      de: "Ab 800 EGP / Sitzung",
    },
    cta: {
      ar: "احجز عبر واتساب",
      en: "Book via WhatsApp",
      de: "Per WhatsApp buchen",
    },
    color: "#f59e0b",
  };

  const coursesLeadOffer: LeadOffer = {
    icon: <GraduationCap size={28} />,
    title: {
      ar: "كورسات وبوتكامبات التدريب",
      en: "Training Courses & Bootcamps",
      de: "Trainingskurse & Bootcamps",
    },
    subtitle: {
      ar: "خليك كوتش… واصنع فريقك",
      en: "Become a Coach… Build Your Team",
      de: "Werde Coach… und baue dein Team auf",
    },
    description: {
      ar: "تحول من رياضي لكوتش. د. أشرف يشارك عقوداً من المعرفة النخبوية في كورسات تغير مسيرتك المهنية.",
      en: "Transform from athlete to coach. Dr. Ashraf shares decades of elite knowledge in courses that can change your career path.",
      de: "Verwandle dich vom Athleten zum Coach. Dr. Ashraf teilt jahrzehntelanges Elite-Wissen in Kursen, die deinen Karriereweg verändern können.",
    },
    bullets: [
      { ar: "إتقان علوم التغذية", en: "Nutrition Science Mastery", de: "Meisterschaft in Ernährungswissenschaft" },
      { ar: "البرمجة والتدوير", en: "Programming & Periodization", de: "Programmierung & Periodisierung" },
      { ar: "أسرار تحضير البطولات", en: "Competition Prep Secrets", de: "Geheimnisse der Wettkampfvorbereitung" },
      { ar: "أعمال الكوتشينج", en: "Business of Coaching", de: "Business des Coachings" },
    ],
    startingPrice: {
      ar: "بداية من 3,500 جنيه / كورس",
      en: "Starting from 3,500 EGP / course",
      de: "Ab 3.500 EGP / Kurs",
    },
    cta: {
      ar: "احجز عبر واتساب",
      en: "Book via WhatsApp",
      de: "Per WhatsApp buchen",
    },
    color: "#22c55e",
  };

  const sessionPackages: ExtraPackage[] = [
    {
      id: "session-basic",
      localName: {
        ar: "جلسة استشفاء أساسية",
        en: "Recovery Basic Session",
        de: "Basis-Regenerationssitzung",
      },
      subtitle: {
        ar: "تهيئة سريعة للجسم واستعادة الجاهزية",
        en: "Quick body reset and readiness boost",
        de: "Schnelle Erholung und bessere Bereitschaft",
      },
      price: {
        ar: "800 جنيه / جلسة",
        en: "800 EGP / session",
        de: "800 EGP / Sitzung",
      },
      badge: { ar: "بداية", en: "STARTER", de: "STARTER" },
      features: [
        { ar: "جلسة موجهة للاستشفاء", en: "Recovery-focused session", de: "Regenerationsorientierte Sitzung" },
        { ar: "دعم لتقليل الإجهاد", en: "Fatigue reduction support", de: "Unterstützung zur Ermüdungsreduktion" },
        { ar: "جاهزية أفضل للتمرين", en: "Better training readiness", de: "Bessere Trainingsbereitschaft" },
      ],
      cta: { ar: "احجز الجلسة", en: "Book Session", de: "Sitzung buchen" },
      color: "#d4a63f",
    },
    {
      id: "session-pro",
      localName: {
        ar: "جلسة أداء متقدمة",
        en: "Performance Reset Session",
        de: "Performance-Reset-Sitzung",
      },
      subtitle: {
        ar: "استشفاء مع دعم للأداء البدني",
        en: "Recovery plus performance support",
        de: "Regeneration plus Leistungsunterstützung",
      },
      price: {
        ar: "1,250 جنيه / جلسة",
        en: "1,250 EGP / session",
        de: "1.250 EGP / Sitzung",
      },
      badge: { ar: "الأكثر طلبًا", en: "MOST REQUESTED", de: "AM MEISTEN GEFRAGT" },
      features: [
        { ar: "بروتوكول استشفاء متقدم", en: "Advanced recovery protocol", de: "Fortgeschrittenes Regenerationsprotokoll" },
        { ar: "دعم لتحسين الأداء", en: "Performance enhancement support", de: "Unterstützung zur Leistungssteigerung" },
        { ar: "جاهزية أفضل للأحمال التدريبية", en: "Better training load readiness", de: "Bessere Belastungsbereitschaft" },
        { ar: "استجابة بدنية أفضل", en: "Better physical response", de: "Bessere körperliche Reaktion" },
      ],
      cta: { ar: "احجز جلسة الأداء", en: "Book Performance Session", de: "Performance-Sitzung buchen" },
      color: "#f59e0b",
      highlight: true,
    },
    {
      id: "session-elite",
      localName: {
        ar: "بروتوكول استشفاء النخبة",
        en: "Elite Recovery Protocol",
        de: "Elite-Regenerationsprotokoll",
      },
      subtitle: {
        ar: "للمتدربين الجادين والرياضيين",
        en: "For serious trainees and athletes",
        de: "Für ernsthafte Trainierende und Athleten",
      },
      price: {
        ar: "1,800 جنيه / جلسة",
        en: "1,800 EGP / session",
        de: "1.800 EGP / Sitzung",
      },
      badge: { ar: "مستوى الرياضي", en: "ATHLETE LEVEL", de: "ATHLETEN-NIVEAU" },
      features: [
        { ar: "منظومة استشفاء شاملة", en: "Comprehensive recovery structure", de: "Umfassende Regenerationsstruktur" },
        { ar: "دعم كامل للجاهزية البدنية", en: "Full readiness support", de: "Volle Unterstützung der Bereitschaft" },
        { ar: "ثبات أعلى بين الجلسات", en: "Better consistency between sessions", de: "Mehr Konstanz zwischen den Sitzungen" },
        { ar: "مناسب للأهداف المتقدمة", en: "Suitable for advanced goals", de: "Geeignet für fortgeschrittene Ziele" },
      ],
      cta: { ar: "احجز جلسة النخبة", en: "Book Elite Session", de: "Elite-Sitzung buchen" },
      color: "#22c55e",
    },
  ];

  const coursePackages: ExtraPackage[] = [
    {
      id: "course-basic",
      localName: {
        ar: "كورس أساسيات التغذية",
        en: "Nutrition Basics Course",
        de: "Grundkurs Ernährung",
      },
      subtitle: {
        ar: "فهم قوي قابل للتطبيق العملي",
        en: "Strong knowledge for practical use",
        de: "Starkes Wissen zur praktischen Anwendung",
      },
      price: {
        ar: "3,500 جنيه / كورس",
        en: "3,500 EGP / course",
        de: "3.500 EGP / Kurs",
      },
      badge: { ar: "أساسيات", en: "FOUNDATION", de: "GRUNDLAGE" },
      features: [
        { ar: "أساسيات التغذية", en: "Nutrition fundamentals", de: "Grundlagen der Ernährung" },
        { ar: "تطبيق عملي للرياضيين", en: "Practical athlete application", de: "Praktische Anwendung für Athleten" },
        { ar: "تعلم منظم وواضح", en: "Structured learning path", de: "Strukturierter Lernweg" },
      ],
      cta: { ar: "اشترك في الكورس", en: "Join Course", de: "Kurs beitreten" },
      color: "#22c55e",
    },
    {
      id: "course-bootcamp",
      localName: {
        ar: "بوتكامب الكوتش",
        en: "Coach Bootcamp",
        de: "Coach Bootcamp",
      },
      subtitle: {
        ar: "تعلم البرمجة التدريبية والتطبيق العملي",
        en: "Learn programming and applied coaching",
        de: "Lerne Trainingsplanung und praktisches Coaching",
      },
      price: {
        ar: "5,500 جنيه / بوتكامب",
        en: "5,500 EGP / bootcamp",
        de: "5.500 EGP / Bootcamp",
      },
      badge: { ar: "الأكثر طلبًا", en: "MOST POPULAR", de: "AM BELIEBTESTEN" },
      features: [
        { ar: "البرمجة والتخطيط", en: "Programming and planning", de: "Programmierung und Planung" },
        { ar: "مفاهيم تدريبية تطبيقية", en: "Applied coaching concepts", de: "Angewandte Coaching-Konzepte" },
        { ar: "أساسيات منظومات الأداء", en: "Performance system basics", de: "Grundlagen von Leistungssystemen" },
        { ar: "اتجاه أوضح للكوتشينج", en: "Clearer coaching direction", de: "Klarere Coaching-Richtung" },
      ],
      cta: { ar: "اشترك في البوتكامب", en: "Join Bootcamp", de: "Bootcamp beitreten" },
      color: "#16a34a",
      highlight: true,
    },
    {
      id: "course-elite",
      localName: {
        ar: "برنامج تحضير بطولات وتعليم متقدم",
        en: "Advanced Prep Mentorship",
        de: "Fortgeschrittenes Mentoring",
      },
      subtitle: {
        ar: "للكوتشز الطموحين والرياضيين الجادين",
        en: "For ambitious coaches and serious athletes",
        de: "Für ambitionierte Coaches und ernsthafte Athleten",
      },
      price: {
        ar: "7,500 جنيه / برنامج",
        en: "7,500 EGP / program",
        de: "7.500 EGP / Programm",
      },
      badge: { ar: "متقدم", en: "ADVANCED", de: "FORTGESCHRITTEN" },
      features: [
        { ar: "مفاهيم تحضير البطولات", en: "Competition prep concepts", de: "Konzepte der Wettkampfvorbereitung" },
        { ar: "فهم عملي أعمق", en: "Deeper practical insight", de: "Tieferes praktisches Verständnis" },
        { ar: "توجيه وتعليم متخصص", en: "Educational mentoring", de: "Bildungs-Mentoring" },
        { ar: "تعرض احترافي وتطبيقي", en: "Professional applied exposure", de: "Professionelle praxisnahe Erfahrung" },
      ],
      cta: { ar: "اشترك في البرنامج", en: "Join Program", de: "Programm beitreten" },
      color: "#06b6d4",
    },
  ];

  const tabs = [
    {
      id: "online" as ServiceTab,
      label: tr("تدريب أونلاين", "Online Coaching", "Online-Coaching"),
      icon: <Layers3 size={17} />,
      title: tr("باقات التدريب الأونلاين", "Online Coaching Packages", "Online-Coaching-Pakete"),
      desc: tr(
        "باقات احترافية واضحة للمتابعة، التغذية، وتعديل الخطة حسب الهدف والمستوى.",
        "Clear premium packages for follow-up, nutrition, and plan adjustments based on your goal and level.",
        "Klare Premium-Pakete für Betreuung, Ernährung und Plananpassungen je nach Ziel und Niveau."
      ),
      badge: tr("النظام الأشمل", "Most Complete System", "Das umfassendste System"),
      highlight: tr(
        "متابعة + تغذية + تعديل + نتائج",
        "Follow-up + Nutrition + Adjustments + Results",
        "Betreuung + Ernährung + Anpassung + Ergebnisse"
      ),
    },
    {
      id: "sessions" as ServiceTab,
      label: tr("جلسات", "Sessions", "Sitzungen"),
      icon: <HeartPulse size={17} />,
      title: tr("جلسات الاستشفاء والأداء", "Recovery & Performance", "Regeneration & Performance"),
      desc: tr(
        "جلسات متخصصة للاستشفاء ورفع الجاهزية وتحسين جودة الأداء الرياضي.",
        "Specialized sessions for recovery, better readiness, and enhanced athletic performance quality.",
        "Spezialisierte Sitzungen für Regeneration, bessere Bereitschaft und höhere sportliche Leistung."
      ),
      badge: tr("استشفاء مدعوم علميًا", "Science-Backed Recovery", "Wissenschaftlich gestützte Regeneration"),
      highlight: tr(
        "استشفاء + حرق دهون + أداء أعلى",
        "Recovery + Fat Burn + Better Performance",
        "Regeneration + Fettabbau + Bessere Leistung"
      ),
    },
    {
      id: "courses" as ServiceTab,
      label: tr("كورسات وبوتكامبات", "Courses & Bootcamps", "Kurse & Bootcamps"),
      icon: <BookOpen size={17} />,
      title: tr("كورسات وبوتكامبات التدريب", "Courses & Bootcamps", "Kurse & Bootcamps"),
      desc: tr(
        "تعلم تدريبي احترافي للكوتشز والمتدربين الجادين بشكل عملي ومنظم.",
        "Professional coaching education for serious trainees and coaches in a practical structured format.",
        "Professionelle Coaching-Ausbildung für ernsthafte Trainierende und Coaches in einem praktischen, strukturierten Format."
      ),
      badge: tr("تعلم تطبيقي", "Applied Learning", "Praxisorientiertes Lernen"),
      highlight: tr(
        "تغذية + برمجة + تحضير بطولات + بزنس",
        "Nutrition + Programming + Prep + Business",
        "Ernährung + Programmierung + Wettkampf + Business"
      ),
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab)!;

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
                {tr("د. أشرف العبد", "Dr. Ashraf El Abd", "Dr. Ashraf El Abd")}
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
                ONLINE COACH • ELITE TRANSFORMATION
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
            {[
              { to: HOME_PATH, label: tr("الرئيسية", "Home", "Startseite") },
              { to: ABOUT_PATH, label: tr("نبذة عنا", "About", "Über uns") },
              { to: CLASSES_PATH, label: tr("الكلاسات", "Classes", "Kurse") },
              { to: BOOKING_PATH, label: tr("الحجز", "Booking", "Buchung") },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
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
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                style={{
                  height: 46,
                  minWidth: 150,
                  borderRadius: 14,
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
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>

              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  ...(isAr ? { left: 12 } : { right: 12 }),
                  pointerEvents: "none",
                  color: colors.textMuted,
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                ▼
              </span>
            </div>

            <button
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              style={{
                height: 46,
                minWidth: 118,
                borderRadius: 14,
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
              }}
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
              <span>{isDark ? tr("ليلي", "Dark", "Dunkel") : tr("فاتح", "Light", "Hell")}</span>
            </button>

            <a
              href={createWhatsAppLink(
                tr(
                  "مرحبًا، أريد الاستفسار عن الكلاسات والخدمات.",
                  "Hello, I want to ask about the classes and services.",
                  "Hallo, ich möchte nach den Kursen und Leistungen fragen."
                )
              )}
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
              {tr("احجز عبر واتساب", "Book via WhatsApp", "Per WhatsApp buchen")}
            </a>
          </div>
        </div>
      </header>

      <a
        href={createWhatsAppLink(
          tr(
            "مرحبًا، أريد الاستفسار عن الكلاسات والخدمات.",
            "Hello, I want to ask about the classes and services.",
            "Hallo, ich möchte nach den Kursen und Leistungen fragen."
          )
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          position: "fixed",
          bottom: 22,
          ...(isAr ? { left: 22 } : { right: 22 }),
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
          padding: "90px 20px 56px",
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

        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
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
            {tr("منظومة خدمات متكاملة", "Structured Service System", "Strukturiertes Leistungssystem")}
          </div>

          <h1
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              lineHeight: 1,
              margin: "0 0 14px",
              fontWeight: 900,
            }}
          >
            {tr("الكلاسات", "Classes", "Kurse")}
            <br />
            <span style={{ color: colors.gold }}>
              {tr("والخدمات المتخصصة", "And Specialized Offers", "Und Spezialisierte Angebote")}
            </span>
          </h1>

          <p
            style={{
              color: colors.textMuted,
              maxWidth: 860,
              margin: "0 auto 24px",
              lineHeight: 1.95,
              fontSize: 18,
            }}
          >
            {tr(
              "اختار القسم المناسب لك: تدريب أونلاين، جلسات الاستشفاء والأداء، أو كورسات وبوتكامبات التدريب — وكل قسم فيه عرض واضح وباقات مناسبة له.",
              "Choose the section that fits you: online coaching, recovery & performance sessions, or training courses and bootcamps — each section has a clear structure and suitable packages.",
              "Wähle den passenden Bereich: Online-Coaching, Regenerations- & Performance-Sitzungen oder Trainingskurse & Bootcamps — jeder Bereich hat eine klare Struktur und passende Pakete."
            )}
          </p>
          
        </div>
      </section>

      <section
        style={{
          backgroundColor: colors.sectionAlt,
          padding: "18px 20px 26px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              overflowX: "auto",
              padding: 8,
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: 24,
              boxShadow: colors.shadow,
              gap: 8,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flexShrink: 0,
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 18px",
                  borderRadius: 18,
                  background:
                    activeTab === tab.id
                      ? `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.02))`
                      : "transparent",
                  color: activeTab === tab.id ? colors.gold : colors.textMuted,
                  fontWeight: 900,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: activeTab === tab.id ? colors.glow : "none",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "52px 20px 70px", background: colors.bg }}>
        <div style={{ maxWidth: 1150, margin: "0 auto" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.bgSoft} 0%, ${colors.sectionAlt} 100%)`,
              border: `1px solid ${colors.border}`,
              borderRadius: 30,
              padding: 28,
              boxShadow: colors.shadow,
              marginBottom: 26,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 22,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    borderRadius: 999,
                    background: colors.goldSoft,
                    color: colors.gold,
                    fontSize: 12,
                    fontWeight: 900,
                    marginBottom: 14,
                  }}
                >
                  <Star size={14} />
                  {activeTabData.badge}
                </div>

                <h2 style={{ margin: "0 0 10px", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>
                  {activeTabData.title}
                </h2>

                <p style={{ margin: "0 0 18px", color: colors.textSoft, lineHeight: 1.95, maxWidth: 720 }}>
                  {activeTabData.desc}
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    borderRadius: 16,
                    border: `1px solid ${colors.border}`,
                    background: colors.bgCard,
                    color: colors.text,
                    fontWeight: 800,
                  }}
                >
                  <Flame size={15} color={colors.gold} />
                  {activeTabData.highlight}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 14,
                }}
              >
                <MiniStatCard value="15+" label={tr("سنة خبرة", "Years Experience", "Jahre Erfahrung")} colors={colors} />
                <MiniStatCard value="500+" label={tr("نتائج فعلية", "Real Results", "Echte Ergebnisse")} colors={colors} />
                <MiniStatCard value="IFBB" label={tr("تحكيم دولي", "International Judge", "Internationaler Kampfrichter")} colors={colors} />
                <MiniStatCard value="12+" label={tr("سنوات نخبوية", "Elite Years", "Elite-Jahre")} colors={colors} />
              </div>
            </div>
          </div>

          {activeTab === "online" && (
            <>
              <div style={{ marginBottom: 26 }}>
                <div style={{ textAlign: "center", marginBottom: 16, color: colors.gold, fontWeight: 900 }}>
                  {tr("إنجازات الكابتن", "Captain Achievements", "Erfolge des Captains")}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  <AchievementCard icon={<Award size={18} />} text={onlineAchievements[0]} colors={colors} />
                  <AchievementCard icon={<Trophy size={18} />} text={onlineAchievements[1]} colors={colors} />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 22,
                  marginBottom: 34,
                }}
              >
                {onlinePackages.map((pkg) => (
                  <OnlinePackageCard
                    key={pkg.id}
                    item={pkg}
                    lang={lang}
                    colors={colors}
                    href={createWhatsAppLink(
                      isAr
                        ? `مرحبًا، أريد الحجز في باقة ${pkg.brand} - ${pkg.localName.ar} - ${pkg.price}`
                        : isEn
                        ? `Hello, I want to book the ${pkg.brand} - ${pkg.localName.en} - ${pkg.price}`
                        : `Hallo, ich möchte das Paket ${pkg.brand} - ${pkg.localName.de} - ${pkg.price} buchen`
                    )}
                  />
                ))}
              </div>

              <div style={{ marginBottom: 34 }}>
                <div style={{ textAlign: "center", marginBottom: 16, color: colors.gold, fontWeight: 900 }}>
                  {tr("طرق الدفع", "Payment Methods", "Zahlungsmethoden")}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                  }}
                >
                  {paymentMethods.map((method) => (
                    <PaymentCard key={method.id} method={method} lang={lang} colors={colors} />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ textAlign: "center", marginBottom: 16, color: colors.gold, fontWeight: 900 }}>
                  {tr("لماذا د. أشرف هو الأفضل", "Why Dr. Ashraf Is The Best", "Warum Dr. Ashraf der Beste ist")}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 18,
                  }}
                >
                  {whyBest.map((item) => (
                    <WhyCard
                      key={item.title}
                      title={item.title}
                      text={item.text}
                      icon={item.icon}
                      colors={colors}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "sessions" && (
            <>
              <LeadOfferCard
                item={sessionsLeadOffer}
                lang={lang}
                colors={colors}
                href={createWhatsAppLink(
                  isAr
                    ? "مرحبًا، أريد الحجز في جلسات الاستشفاء والأداء."
                    : isEn
                    ? "Hello, I want to book recovery and performance sessions."
                    : "Hallo, ich möchte Regenerations- und Performance-Sitzungen buchen."
                )}
              />

              <div style={{ marginBottom: 26 }}>
                <div style={{ textAlign: "center", marginBottom: 16, color: colors.gold, fontWeight: 900 }}>
                  {tr("إنجازات الكابتن", "Captain Achievements", "Erfolge des Captains")}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  <AchievementCard icon={<HeartPulse size={18} />} text={sessionsAchievements[0]} colors={colors} />
                  <AchievementCard icon={<Zap size={18} />} text={sessionsAchievements[1]} colors={colors} />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 22,
                }}
              >
                {sessionPackages.map((item) => (
                  <ExtraPackageCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    colors={colors}
                    href={createWhatsAppLink(
                      isAr
                        ? `مرحبًا، أريد الحجز في ${item.localName.ar} - ${item.price.ar}`
                        : isEn
                        ? `Hello, I want to book ${item.localName.en} - ${item.price.en}`
                        : `Hallo, ich möchte ${item.localName.de} - ${item.price.de} buchen`
                    )}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === "courses" && (
            <>
              <LeadOfferCard
                item={coursesLeadOffer}
                lang={lang}
                colors={colors}
                href={createWhatsAppLink(
                  isAr
                    ? "مرحبًا، أريد الحجز في كورسات وبوتكامبات التدريب."
                    : isEn
                    ? "Hello, I want to join the training courses and bootcamps."
                    : "Hallo, ich möchte den Trainingskursen und Bootcamps beitreten."
                )}
              />

              <div style={{ marginBottom: 26 }}>
                <div style={{ textAlign: "center", marginBottom: 16, color: colors.gold, fontWeight: 900 }}>
                  {tr("إنجازات الكابتن", "Captain Achievements", "Erfolge des Captains")}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  <AchievementCard icon={<GraduationCap size={18} />} text={coursesAchievements[0]} colors={colors} />
                  <AchievementCard icon={<BookOpen size={18} />} text={coursesAchievements[1]} colors={colors} />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 22,
                }}
              >
                {coursePackages.map((item) => (
                  <ExtraPackageCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    colors={colors}
                    href={createWhatsAppLink(
                      isAr
                        ? `مرحبًا، أريد الاشتراك في ${item.localName.ar} - ${item.price.ar}`
                        : isEn
                        ? `Hello, I want to join ${item.localName.en} - ${item.price.en}`
                        : `Hallo, ich möchte ${item.localName.de} - ${item.price.de} buchen`
                    )}
                  />
                ))}
              </div>
            </>
          )}
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
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <BrandLogo colors={colors} size={50} />
                <div>
                  <div style={{ color: colors.gold, fontWeight: 900, fontSize: 20 }}>
                    {tr("د. أشرف العبد", "Dr. Ashraf El Abd", "Dr. Ashraf El Abd")}
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700, marginTop: 3 }}>
                    ONLINE COACH • ELITE TRANSFORMATION
                  </div>
                </div>
              </div>

              <p style={{ color: colors.textSoft, lineHeight: 1.9, margin: "0 0 18px", fontSize: 14 }}>
                {tr(
                  "صفحة الكلاسات تعرض الأقسام الأساسية بشكل واضح ومنظم.",
                  "The classes page presents the core sections in a clear and organized way.",
                  "Die Kursseite zeigt die Kernbereiche klar und organisiert."
                )}
              </p>

              <a
                href={createWhatsAppLink(
                  tr(
                    "مرحبًا، أريد الاستفسار عن الكلاسات والخدمات.",
                    "Hello, I want to ask about the classes and services.",
                    "Hallo, ich möchte nach den Kursen und Leistungen fragen."
                  )
                )}
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
                {tr("احجز عبر واتساب", "Book via WhatsApp", "Per WhatsApp buchen")}
              </a>
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>
                {tr("روابط سريعة", "Quick Links", "Schnellzugriffe")}
              </h3>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { to: HOME_PATH, label: tr("الرئيسية", "Home", "Startseite") },
                  { to: ABOUT_PATH, label: tr("نبذة عنا", "About", "Über uns") },
                  { to: SERVICES_PATH, label: tr("الخدمات", "Services", "Leistungen") },
                  { to: CLASSES_PATH, label: tr("الكلاسات", "Classes", "Kurse") },
                  { to: BOOKING_PATH, label: tr("الحجز", "Booking", "Buchung") },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>
                {tr("الأقسام الأساسية", "Core Sections", "Kernbereiche")}
              </h3>
              <div style={{ display: "grid", gap: 12, color: colors.textSoft, fontSize: 14 }}>
                <span>{tr("تدريب أونلاين", "Online Coaching", "Online-Coaching")}</span>
                <span>{tr("جلسات الاستشفاء والأداء", "Recovery & Performance", "Regeneration & Performance")}</span>
                <span>{tr("كورسات وبوتكامبات التدريب", "Courses & Bootcamps", "Kurse & Bootcamps")}</span>
              </div>
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>
                {tr("بيانات التواصل", "Contact Info", "Kontaktinformationen")}
              </h3>
              <div style={{ display: "grid", gap: 14, color: colors.textSoft, fontSize: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={16} color={colors.gold} />
                  <span>
                    {tr(
                      "أونلاين + حجز مباشر عبر واتساب",
                      "Online + direct WhatsApp booking",
                      "Online + direkte WhatsApp-Buchung"
                    )}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Clock3 size={16} color={colors.gold} />
                  <span>
                    {tr(
                      "الحجز حسب المواعيد المتاحة",
                      "Booking based on available schedule",
                      "Buchung nach verfügbaren Zeiten"
                    )}
                  </span>
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
              {tr(
                "جميع الحقوق محفوظة © د. أشرف العبد",
                "All rights reserved © Dr. Ashraf El Abd",
                "Alle Rechte vorbehalten © Dr. Ashraf El Abd"
              )}
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
              <span>{tr("تجربة احترافية", "Premium Experience", "Premium-Erlebnis")}</span>
              <span>•</span>
              <span>{tr("حجز مباشر عبر واتساب", "Direct WhatsApp Booking", "Direkte WhatsApp-Buchung")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}