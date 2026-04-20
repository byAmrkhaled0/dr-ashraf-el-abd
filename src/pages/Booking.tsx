import { useMemo, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Flame,
  Shield,
  Phone,
  MessageCircle,
  Moon,
  Sun,
  Dumbbell,
  MapPin,
  Clock3,
} from "lucide-react";
import { PACKAGES, ROUTE_PATHS, WHATSAPP_URL, WHATSAPP_URL_AR } from "@/lib/index";

type Step = "package" | "details" | "payment" | "confirm";
type Lang = "ar" | "en";
type ThemeMode = "dark" | "light";

const PAYMENT_METHODS = [
  { id: "instapay", name: "InstaPay", nameAr: "إنستاباي", flag: "🇪🇬", region: "Egypt", color: "#10b981" },
  { id: "vodafone", name: "Vodafone Cash", nameAr: "فودافون كاش", flag: "🇪🇬", region: "Egypt", color: "#DC2626" },
  { id: "stripe", name: "Stripe", nameAr: "سترايب", flag: "🌍", region: "International", color: "#6366f1" },
  { id: "paypal", name: "PayPal", nameAr: "باي بال", flag: "🌍", region: "International", color: "#0070ba" },
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
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
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
        boxShadow: hovered ? "0 18px 40px rgba(0,0,0,0.16)" : colors.shadow,
        transition: "all 0.28s ease",
        minHeight: 78,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
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

export default function Booking() {
  const [selectedPackage, setSelectedPackage] = useState<string>("pro");
  const [selectedPayment, setSelectedPayment] = useState<string>("instapay");
  const [step, setStep] = useState<Step>("package");
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    goal: "",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isAr = lang === "ar";
  const isDark = theme === "dark";

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
      red: "#DC2626",
      green: "#22c55e",
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
      booking: isAr ? "الحجز" : "Booking",
      contact: isAr ? "تواصل" : "Contact",
      langBadge: isAr ? "E" : "ع",
      pageBadge: isAr ? "احجز الآن" : "Book Now",
      heroTitle1: isAr ? "احجز" : "Claim Your",
      heroTitle2: isAr ? "رحلتك للتحول" : "Transformation",
      heroText: isAr ? "احجز مكانك دلوقتي · الأماكن محدودة" : "Reserve your spot now · Limited seats available",
      choosePackage: isAr ? "اختار باقتك" : "Choose Your Package",
      yourDetails: isAr ? "بياناتك" : "Your Details",
      choosePayment: isAr ? "اختار الدفع" : "Choose Payment",
      confirmOrder: isAr ? "تأكيد طلبك" : "Confirm Your Order",
      packageStep: isAr ? "الباقة" : "Package",
      detailsStep: isAr ? "البيانات" : "Details",
      paymentStep: isAr ? "الدفع" : "Payment",
      confirmStep: isAr ? "التأكيد" : "Confirm",
      continue: isAr ? "استمرار" : "Continue",
      continuePayment: isAr ? "المتابعة للدفع" : "Continue to Payment",
      reviewConfirm: isAr ? "مراجعة وتأكيد" : "Review & Confirm",
      confirmStart: isAr ? "تأكيد وابدأ" : "Confirm & Start",
      back: isAr ? "رجوع" : "Back",
      fullName: isAr ? "الاسم الكامل" : "Full Name",
      email: isAr ? "البريد الإلكتروني" : "Email",
      phone: isAr ? "رقم الواتساب" : "WhatsApp Number",
      country: isAr ? "البلد" : "Country",
      goal: isAr ? "هدفك" : "Your Goal",
      experience: isAr ? "مستوى الخبرة" : "Experience Level",
      selectGoal: isAr ? "اختار هدفك" : "Select your goal",
      selectLevel: isAr ? "اختار المستوى" : "Select level",
      paymentInstructions: isAr ? "تعليمات الدفع" : "Payment Instructions",
      packageSummary: isAr ? "الباقة المختارة" : "Selected Package",
      price: isAr ? "السعر" : "Price",
      name: isAr ? "الاسم" : "Name",
      payment: isAr ? "الدفع" : "Payment",
      satisfaction: isAr ? "ضمان رضا كامل" : "100% Satisfaction Guarantee",
      satisfactionText: isAr
        ? "إذا التزمت بالخطة ولم ترَ نتائج خلال 30 يومًا، نعيد التخطيط أو نوفر الحل المناسب."
        : "If you follow the plan and don't see results in 30 days, we'll refund or re-plan at no cost.",
      successTitle: isAr ? "تم استلام طلبك!" : "Booking Received!",
      successSub: isAr ? "أهلاً بيك" : "Welcome",
      successList: isAr
        ? [
            "فريق د. أشرف سيتواصل معك خلال ساعتين",
            "أكمل الدفع وأرسل لقطة التأكيد",
            "رحلة التغيير بدأت الآن",
          ]
        : [
            "Dr. Ashraf's team will contact you within 2 hours",
            "Please complete your payment and send confirmation screenshot",
            "Your transformation starts NOW",
          ],
      contactWhatsApp: isAr ? "تواصل عبر واتساب" : "Contact via WhatsApp",
      returnHome: isAr ? "العودة للرئيسية" : "Return to Home",
      directBooking: isAr ? "احجز عبر الواتساب مباشرة" : "WhatsApp Direct Booking",
      preferDirect: isAr ? "تفضل تحجز مباشرة؟" : "Prefer to book directly?",
      knowServices: isAr ? "تعرف على خدماتنا" : "Know Our Services",
      quickLinks: isAr ? "روابط سريعة" : "Quick Links",
      coreServices: isAr ? "الخدمات الأساسية" : "Core Services",
      contactInfo: isAr ? "بيانات التواصل" : "Contact Info",
      followUs: isAr ? "تابعنا" : "Follow Us",
      footerText: isAr
        ? "جميع الحجوزات والاستفسارات تتم مباشرة عبر واتساب."
        : "All bookings and inquiries are handled directly through WhatsApp.",
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
      packageLabel: isAr ? "باقة" : "Package",
      detailsConfirmed: isAr ? "تم تأكيد بياناتك" : "Your details confirmed",
      mostPopular: isAr ? "الأكثر طلبًا" : "MOST POPULAR",
      international: isAr ? "دولي" : "International",
      egypt: isAr ? "مصر" : "Egypt",
    }),
    [isAr]
  );

  const stepOrder: Step[] = ["package", "details", "payment", "confirm"];
  const stepIdx = stepOrder.indexOf(step);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPackage)!;

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const SERVICES_PATH = ROUTE_PATHS?.SERVICES ?? "/services";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING ?? "/booking";

  const FACEBOOK_LINK = "https://www.facebook.com/share/1DTjxnAxVL/?mibextid=wwXIfr";
  const INSTAGRAM_LINK =
    "https://www.instagram.com/dr.ashraf_el_abd?igsh=c2tpamFreXFuaGI%3D&utm_source=qr";
  const TIKTOK_LINK = "https://www.tiktok.com/@dr..ashraf.el.abd?_r=1&_t=ZS-95g5Q6SZ8zp";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    color: colors.text,
    fontSize: 14,
    outline: "none",
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    fontFamily: "Cairo, sans-serif",
  };

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
            <NavLink to={BOOKING_PATH} style={navLinkBase}>
              {t.booking}
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
              href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
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
              {t.pageBadge}
            </a>
          </div>
        </div>
      </header>

      <a
        href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
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
          padding: "80px 20px 50px",
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

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
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
              boxShadow: colors.glow,
            }}
          >
            <Flame size={14} />
            {t.pageBadge}
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              lineHeight: 1.05,
              margin: "0 0 14px",
              fontWeight: 900,
              color: colors.text,
            }}
          >
            {t.heroTitle1} <span style={{ color: colors.gold }}>{t.heroTitle2}</span>
          </h1>

          <p
            style={{
              color: colors.textMuted,
              maxWidth: 760,
              margin: "0 auto",
              lineHeight: 1.9,
              fontSize: 18,
            }}
          >
            {t.heroText}
          </p>
        </div>
      </section>

      <section
        style={{
          backgroundColor: colors.sectionAlt,
          padding: "18px 20px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {stepOrder.map((s, i) => {
              const label =
                s === "package"
                  ? t.packageStep
                  : s === "details"
                  ? t.detailsStep
                  : s === "payment"
                  ? t.paymentStep
                  : t.confirmStep;

              return (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 12,
                      background:
                        i <= stepIdx ? "linear-gradient(135deg, #D4AF37, #B8860B)" : colors.bgSoft,
                      color: i <= stepIdx ? "#111" : colors.textMuted,
                      border: i === stepIdx ? `2px solid ${colors.gold}` : "2px solid transparent",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: i === stepIdx ? colors.gold : colors.textMuted,
                    }}
                  >
                    {label}
                  </span>
                  {i < 3 && (
                    <div
                      style={{
                        width: 24,
                        height: 1,
                        background: colors.border,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {!submitted ? (
        <section style={{ padding: "60px 20px 80px", background: colors.bg }}>
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            {step === "package" && (
              <div>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  {t.choosePackage}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 18,
                    marginBottom: 30,
                  }}
                >
                  {PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      style={{
                        position: "relative",
                        textAlign: isAr ? "right" : "left",
                        padding: 24,
                        borderRadius: 24,
                        cursor: "pointer",
                        background: selectedPackage === pkg.id ? colors.goldSoft : colors.bgCard,
                        border:
                          selectedPackage === pkg.id
                            ? `2px solid ${colors.gold}`
                            : `1px solid ${colors.border}`,
                        boxShadow: selectedPackage === pkg.id ? colors.glow : colors.shadow,
                        transition: "0.25s ease",
                        color: colors.text,
                      }}
                    >
                      {pkg.isPopular && (
                        <div
                          style={{
                            position: "absolute",
                            top: -10,
                            [isAr ? "right" : "left"]: 16,
                            background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                            color: "#111",
                            fontWeight: 900,
                            fontSize: 12,
                            padding: "6px 10px",
                            borderRadius: 999,
                          }}
                        >
                          {t.mostPopular}
                        </div>
                      )}

                      <div style={{ fontWeight: 900, fontSize: 24, color: selectedPackage === pkg.id ? colors.gold : colors.text }}>
                        {pkg.name}
                      </div>
                      <div style={{ color: colors.textMuted, marginTop: 4, marginBottom: 12, fontSize: 14 }}>
                        {pkg.nameAr}
                      </div>

                      <div style={{ fontWeight: 900, fontSize: 28, marginBottom: 14 }}>
                        {pkg.price}
                        <span style={{ color: colors.textMuted, fontSize: 16, marginInlineStart: 6 }}>
                          {pkg.priceNote}
                        </span>
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        {pkg.features.slice(0, 3).map((f: string, i: number) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <CheckCircle size={15} style={{ color: selectedPackage === pkg.id ? colors.gold : colors.textMuted, flexShrink: 0 }} />
                            <span style={{ color: colors.textSoft, fontSize: 14 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => setStep("details")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "15px 28px",
                      borderRadius: 16,
                      background: colors.heroButton,
                      color: "#111",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 900,
                      boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                    }}
                  >
                    {t.continue} {selectedPkg.name}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === "details" && (
              <form onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  {t.yourDetails}
                </h2>

                <div
                  style={{
                    background: colors.bgSoft,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 28,
                    padding: 26,
                    boxShadow: colors.shadow,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    {[
                      { id: "name", label: t.fullName, type: "text", required: true },
                      { id: "email", label: t.email, type: "email", required: true },
                      { id: "phone", label: t.phone, type: "tel", required: true },
                      { id: "country", label: t.country, type: "text", required: true },
                    ].map((field) => (
                      <div key={field.id}>
                        <label style={{ display: "block", fontWeight: 800, color: colors.gold, marginBottom: 8, fontSize: 13 }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={(form as Record<string, string>)[field.id]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [field.id]: e.target.value }))}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontWeight: 800, color: colors.gold, marginBottom: 8, fontSize: 13 }}>
                      {t.goal}
                    </label>
                    <select
                      required
                      value={form.goal}
                      onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">{t.selectGoal}</option>
                      <option value="fat-loss">{isAr ? "خسارة دهون" : "Fat Loss"}</option>
                      <option value="muscle-gain">{isAr ? "بناء عضل" : "Muscle Gain"}</option>
                      <option value="body-recomp">{isAr ? "إعادة تكوين الجسم" : "Body Recomposition"}</option>
                      <option value="competition">{isAr ? "تحضير بطولة" : "Competition Prep"}</option>
                      <option value="general">{isAr ? "لياقة عامة" : "General Fitness"}</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontWeight: 800, color: colors.gold, marginBottom: 8, fontSize: 13 }}>
                      {t.experience}
                    </label>
                    <select
                      required
                      value={form.experience}
                      onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">{t.selectLevel}</option>
                      <option value="beginner">{isAr ? "مبتدئ" : "Beginner (0-1 yr)"}</option>
                      <option value="intermediate">{isAr ? "متوسط" : "Intermediate (1-3 yrs)"}</option>
                      <option value="advanced">{isAr ? "متقدم" : "Advanced (3+ yrs)"}</option>
                      <option value="competitor">{isAr ? "رياضي محترف" : "Competitive Athlete"}</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => setStep("package")}
                      style={{
                        padding: "13px 20px",
                        borderRadius: 14,
                        border: `1px solid ${colors.border}`,
                        background: "transparent",
                        color: colors.textMuted,
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      {t.back}
                    </button>

                    <button
                      type="submit"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 26px",
                        borderRadius: 16,
                        background: colors.heroButton,
                        color: "#111",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 900,
                        boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                      }}
                    >
                      {t.continuePayment}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === "payment" && (
              <div>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  {t.choosePayment}
                </h2>

                <div
                  style={{
                    background: colors.bgSoft,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 28,
                    padding: 26,
                    boxShadow: colors.shadow,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 14,
                      flexWrap: "wrap",
                      paddingBottom: 18,
                      marginBottom: 18,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 20, color: colors.gold }}>
                        {selectedPkg.name} {isAr ? `· باقة ${selectedPkg.nameAr}` : `· ${t.packageLabel}`}
                      </div>
                      <div style={{ color: colors.textMuted, marginTop: 4, fontSize: 14 }}>
                        {form.name || t.detailsConfirmed}
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 24 }}>{selectedPkg.price}</div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                      gap: 14,
                      marginBottom: 22,
                    }}
                  >
                    {PAYMENT_METHODS.map((pm) => (
                      <button
                        key={pm.id}
                        onClick={() => setSelectedPayment(pm.id)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 18,
                          borderRadius: 20,
                          cursor: "pointer",
                          background: selectedPayment === pm.id ? `${pm.color}15` : colors.bgCard,
                          border:
                            selectedPayment === pm.id
                              ? `2px solid ${pm.color}`
                              : `1px solid ${colors.border}`,
                          boxShadow: selectedPayment === pm.id ? `0 0 20px ${pm.color}20` : "none",
                          color: colors.text,
                          transition: "0.25s ease",
                        }}
                      >
                        <span style={{ fontSize: 28, marginBottom: 8 }}>{pm.flag}</span>
                        <div style={{ fontWeight: 900, fontSize: 14 }}>{isAr ? pm.nameAr : pm.name}</div>
                        <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
                          {isAr
                            ? pm.region === "Egypt"
                              ? t.egypt
                              : t.international
                            : pm.region}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div
                    style={{
                      background: colors.bgCard,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 20,
                      padding: 18,
                      marginBottom: 24,
                    }}
                  >
                    <div style={{ fontWeight: 800, color: colors.gold, marginBottom: 10 }}>
                      {t.paymentInstructions}
                    </div>

                    {selectedPayment === "instapay" && (
                      <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.8, fontSize: 14 }}>
                        {isAr
                          ? 'حوّل عبر إنستاباي إلى: "01234567890" ثم أرسل لقطة تأكيد على واتساب.'
                          : 'Send payment via InstaPay to: "01234567890" then send a confirmation screenshot on WhatsApp.'}
                      </p>
                    )}

                    {selectedPayment === "vodafone" && (
                      <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.8, fontSize: 14 }}>
                        {isAr
                          ? 'حوّل عبر فودافون كاش إلى: "01234567890" ثم أرسل لقطة التأكيد على واتساب.'
                          : 'Transfer via Vodafone Cash to: "01234567890" then send a confirmation screenshot on WhatsApp.'}
                      </p>
                    )}

                    {selectedPayment === "stripe" && (
                      <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.8, fontSize: 14 }}>
                        {isAr
                          ? "سيتم إرسال رابط دفع Stripe آمن عبر واتساب بعد إرسال الحجز."
                          : "You'll receive a secure Stripe payment link via WhatsApp after submitting your booking."}
                      </p>
                    )}

                    {selectedPayment === "paypal" && (
                      <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.8, fontSize: 14 }}>
                        {isAr
                          ? "سيتم إرسال رابط PayPal عبر واتساب ويقبل الدفع من مختلف الدول."
                          : "A PayPal payment link will be sent via WhatsApp and supports international payments."}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      style={{
                        padding: "13px 20px",
                        borderRadius: 14,
                        border: `1px solid ${colors.border}`,
                        background: "transparent",
                        color: colors.textMuted,
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      {t.back}
                    </button>

                    <button
                      onClick={() => setStep("confirm")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 26px",
                        borderRadius: 16,
                        background: colors.heroButton,
                        color: "#111",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 900,
                        boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                      }}
                    >
                      {t.reviewConfirm}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <form onSubmit={handleSubmit}>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  {t.confirmOrder}
                </h2>

                <div
                  style={{
                    background: colors.bgSoft,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 28,
                    padding: 26,
                    boxShadow: colors.shadow,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: 16,
                      marginBottom: 22,
                    }}
                  >
                    {[
                      { label: t.packageLabel, value: selectedPkg.name },
                      { label: t.price, value: `${selectedPkg.price}/month` },
                      { label: t.name, value: form.name || "—" },
                      { label: t.email, value: form.email || "—" },
                      { label: t.phone, value: form.phone || "—" },
                      { label: t.country, value: form.country || "—" },
                      { label: t.goal, value: form.goal || "—" },
                      { label: t.payment, value: PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.name || "—" },
                    ].map((row) => (
                      <div key={row.label}>
                        <div style={{ color: colors.textMuted, fontSize: 12, marginBottom: 4 }}>{row.label}</div>
                        <div style={{ color: colors.text, fontSize: 15, fontWeight: 800 }}>{row.value}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: 16,
                      borderRadius: 20,
                      background: "rgba(34,197,94,0.05)",
                      border: "1px solid rgba(34,197,94,0.2)",
                    }}
                  >
                    <Shield size={20} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 15 }}>{t.satisfaction}</div>
                      <div style={{ color: colors.textMuted, fontSize: 13, marginTop: 4, lineHeight: 1.7 }}>
                        {t.satisfactionText}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    style={{
                      padding: "13px 20px",
                      borderRadius: 14,
                      border: `1px solid ${colors.border}`,
                      background: "transparent",
                      color: colors.textMuted,
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    {t.back}
                  </button>

                  <button
                    type="submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "15px 28px",
                      borderRadius: 16,
                      background: colors.heroButton,
                      color: "#111",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 900,
                      boxShadow: "0 0 30px rgba(212,175,55,0.35)",
                    }}
                  >
                    <Flame size={18} />
                    {t.confirmStart}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      ) : (
        <section style={{ padding: "90px 20px", background: colors.bg }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🏆</div>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 900,
                marginBottom: 10,
              }}
            >
              {t.successTitle} <span style={{ color: colors.gold }}>{t.successSub}</span>
            </h2>

            <div
              style={{
                background: colors.bgSoft,
                border: `1px solid ${colors.border}`,
                borderRadius: 28,
                padding: 26,
                boxShadow: colors.shadow,
                textAlign: isAr ? "right" : "left",
                marginBottom: 28,
              }}
            >
              <div style={{ display: "grid", gap: 14 }}>
                {t.successList.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <CheckCircle size={18} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: colors.textSoft, lineHeight: 1.8 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 26px",
                borderRadius: 16,
                background: "#25D366",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 900,
                boxShadow: "0 12px 28px rgba(37,211,102,0.24)",
              }}
            >
              <Phone size={16} />
              {t.contactWhatsApp}
            </a>

            <div style={{ marginTop: 20 }}>
              <NavLink
                to={HOME_PATH}
                style={{
                  color: colors.textMuted,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {t.returnHome}
              </NavLink>
            </div>
          </div>
        </section>
      )}

      <section
        style={{
          backgroundColor: colors.sectionAlt,
          padding: "60px 20px",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: colors.textMuted, marginBottom: 18 }}>
            {t.preferDirect}
          </p>
          <a
            href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 26px",
              borderRadius: 16,
              background: "#25D366",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 900,
              boxShadow: "0 12px 28px rgba(37,211,102,0.24)",
            }}
          >
            <MessageCircle size={18} />
            {t.directBooking}
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
                  {isAr ? "جاهز تبدأ؟" : "Ready To Start?"}
                </h2>
                <p style={{ margin: "0 auto 22px", color: colors.textSoft, lineHeight: 1.9, maxWidth: 760 }}>
                  {isAr
                    ? "ابدأ المحادثة الآن واختر الباقة المناسبة لك."
                    : "Start the conversation now and choose the package that fits you."}
                </p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
                  <a
                    href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
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
                    {t.pageBadge}
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
                  href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
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
                href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
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
                  {t.booking}
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
                <span>{isAr ? "برامج التغذية" : "Nutrition Programs"}</span>
                <span>{isAr ? "تحضير البطولات" : "Competition Prep"}</span>
                <span>{isAr ? "الاستشفاء والحجامة" : "Recovery & Hijama"}</span>
                <span>{isAr ? "الكورسات والورش" : "Courses & Workshops"}</span>
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
                      href={isAr ? WHATSAPP_URL_AR : WHATSAPP_URL}
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