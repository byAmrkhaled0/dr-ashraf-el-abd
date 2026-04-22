import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type CSSProperties,
  type FormEvent,
} from "react";
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
  Sparkles,
  Wallet,
  CreditCard,
  BadgeCheck,
} from "lucide-react";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { ROUTE_PATHS } from "@/lib/index";
import { db } from "@/lib/firebase";

type Step = "package" | "details" | "payment" | "confirm";
type Lang = "ar" | "en" | "de";
type ThemeMode = "dark" | "light";

type BookingPackage = {
  id: string;
  nameAr: string;
  nameEn: string;
  nameDe: string;
  price: number;
  oldPrice?: number | null;
  currency?: string;
  priceNoteAr?: string;
  priceNoteEn?: string;
  priceNoteDe?: string;
  featuresAr?: string[];
  featuresEn?: string[];
  featuresDe?: string[];
  badgeAr?: string;
  badgeEn?: string;
  badgeDe?: string;
  isPopular?: boolean;
  sortOrder?: number;
  isActive?: boolean;
};

type PaymentMethodItem = {
  id: string;
  nameAr: string;
  nameEn: string;
  nameDe: string;
  regionAr?: string;
  regionEn?: string;
  regionDe?: string;
  flag?: string;
  color?: string;
  value?: string;
  link?: string;
  noteAr?: string;
  noteEn?: string;
  noteDe?: string;
  sortOrder?: number;
  isActive?: boolean;
};

type BookingContent = {
  heroBadgeAr: string;
  heroBadgeEn: string;
  heroBadgeDe: string;

  heroTitle1Ar: string;
  heroTitle1En: string;
  heroTitle1De: string;

  heroTitle2Ar: string;
  heroTitle2En: string;
  heroTitle2De: string;

  heroTextAr: string;
  heroTextEn: string;
  heroTextDe: string;

  footerTextAr: string;
  footerTextEn: string;
  footerTextDe: string;

  successTitleAr: string;
  successTitleEn: string;
  successTitleDe: string;

  successTextAr: string;
  successTextEn: string;
  successTextDe: string;
};

type SiteSettings = {
  whatsappNumber: string;
  whatsappMessageAr: string;
  facebookLink: string;
  instagramLink: string;
  tiktokLink: string;
  developerName: string;
  developerPhone: string;
  developerWhatsAppMessage: string;
};

const defaultBookingContent: BookingContent = {
  heroBadgeAr: "احجز الآن",
  heroBadgeEn: "Book Now",
  heroBadgeDe: "Jetzt buchen",

  heroTitle1Ar: "احجز",
  heroTitle1En: "Claim Your",
  heroTitle1De: "Starte deine",

  heroTitle2Ar: "رحلتك الاحترافية",
  heroTitle2En: "Premium Journey",
  heroTitle2De: "Premium-Reise",

  heroTextAr:
    "اختار الباقة المناسبة، أكمل بياناتك، وحدد وسيلة الدفع في تجربة واضحة وفخمة.",
  heroTextEn:
    "Choose your package, complete your details, and select your payment method in a clear premium experience.",
  heroTextDe:
    "Wähle dein Paket, ergänze deine Daten und bestimme deine Zahlungsmethode in einem klaren Premium-Erlebnis.",

  footerTextAr: "جميع الحجوزات والاستفسارات تتم مباشرة عبر واتساب.",
  footerTextEn: "All bookings and inquiries are handled directly through WhatsApp.",
  footerTextDe: "Alle Buchungen und Anfragen werden direkt über WhatsApp abgewickelt.",

  successTitleAr: "تم استلام طلبك!",
  successTitleEn: "Booking Received!",
  successTitleDe: "Deine Buchung wurde erhalten!",

  successTextAr: "فريق د. أشرف سيتواصل معك قريبًا لتأكيد الحجز.",
  successTextEn: "Dr. Ashraf's team will contact you shortly to confirm your booking.",
  successTextDe: "Das Team von Dr. Ashraf wird dich in Kürze kontaktieren, um deine Buchung zu bestätigen.",
};

const defaultSiteSettings: SiteSettings = {
  whatsappNumber: "201027570204",
  whatsappMessageAr: "مرحبا، أريد الاستفسار عن البرامج التدريبية والحجز",
  facebookLink: "https://www.facebook.com/share/1DTjxnAxVL/?mibextid=wwXIfr",
  instagramLink:
    "https://www.instagram.com/dr.ashraf_el_abd?igsh=c2tpamFreXFuaGI%3D&utm_source=qr",
  tiktokLink: "https://www.tiktok.com/@dr..ashraf.el.abd?_r=1&_t=ZS-95g5Q6SZ8zp",
  developerName: "المهندس عمرو خالد",
  developerPhone: "201008454029",
  developerWhatsAppMessage: "مرحبًا، أريد الاستفسار بخصوص تطوير الموقع",
};

const fallbackPackages: BookingPackage[] = [
  {
    id: "basic",
    nameAr: "BASIC",
    nameEn: "BASIC",
    nameDe: "BASIC",
    price: 1200,
    currency: "EGP",
    priceNoteAr: "/شهر",
    priceNoteEn: "/month",
    priceNoteDe: "/Monat",
    featuresAr: [
      "خطة تغذية مخصصة",
      "برنامج تمارين أسبوعي",
      "متابعة واتساب مرتين أسبوعيًا",
      "متابعة التقدم",
    ],
    featuresEn: [
      "Custom nutrition plan",
      "Weekly workout program",
      "WhatsApp check-ins twice weekly",
      "Progress tracking",
    ],
    featuresDe: [
      "Individueller Ernährungsplan",
      "Wöchentliches Trainingsprogramm",
      "WhatsApp-Betreuung zweimal pro Woche",
      "Fortschrittskontrolle",
    ],
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "pro",
    nameAr: "PRO",
    nameEn: "PRO",
    nameDe: "PRO",
    price: 2800,
    currency: "EGP",
    priceNoteAr: "/شهر",
    priceNoteEn: "/month",
    priceNoteDe: "/Monat",
    badgeAr: "الأكثر طلبًا",
    badgeEn: "Most Popular",
    badgeDe: "Am beliebtesten",
    isPopular: true,
    featuresAr: [
      "كل مميزات الأساسي",
      "دعم واتساب يومي",
      "تغذية راجعة فيديو أسبوعية",
      "مكالمات فيديو شهرية",
    ],
    featuresEn: [
      "Everything in Basic",
      "Daily WhatsApp support",
      "Weekly video feedback",
      "Monthly video calls",
    ],
    featuresDe: [
      "Alles aus Basic",
      "Täglicher WhatsApp-Support",
      "Wöchentliches Video-Feedback",
      "Monatliche Video-Calls",
    ],
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "vip",
    nameAr: "VIP ELITE",
    nameEn: "VIP ELITE",
    nameDe: "VIP ELITE",
    price: 5500,
    currency: "EGP",
    priceNoteAr: "/شهر",
    priceNoteEn: "/month",
    priceNoteDe: "/Monat",
    featuresAr: [
      "كل مميزات البرو",
      "وصول مباشر 24/7",
      "مكالمات فيديو كل أسبوعين",
      "أولوية في الرد",
    ],
    featuresEn: [
      "Everything in PRO",
      "24/7 direct access",
      "Bi-weekly video calls",
      "Priority response",
    ],
    featuresDe: [
      "Alles aus PRO",
      "24/7 Direktzugang",
      "Videoanrufe alle zwei Wochen",
      "Priorisierte Antwort",
    ],
    sortOrder: 3,
    isActive: true,
  },
];

const fallbackPaymentMethods: PaymentMethodItem[] = [
  {
    id: "instapay",
    nameAr: "إنستاباي",
    nameEn: "InstaPay",
    nameDe: "InstaPay",
    regionAr: "مصر",
    regionEn: "Egypt",
    regionDe: "Ägypten",
    flag: "🇪🇬",
    color: "#10b981",
    value: "ashraf.elabd570204@instapay",
    link: "https://ipn.eg/S/ashraf.elabd570204/instapay/2ybBGM",
    noteAr: "بعد التحويل ابعت لقطة شاشة التأكيد على واتساب.",
    noteEn: "After payment, send the confirmation screenshot on WhatsApp.",
    noteDe: "Sende nach der Zahlung den Zahlungsnachweis per WhatsApp.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "vodafone",
    nameAr: "فودافون كاش",
    nameEn: "Vodafone Cash",
    nameDe: "Vodafone Cash",
    regionAr: "مصر",
    regionEn: "Egypt",
    regionDe: "Ägypten",
    flag: "🇪🇬",
    color: "#DC2626",
    value: "+20 10 27570204",
    noteAr: "حوّل على الرقم ثم أرسل لقطة التأكيد.",
    noteEn: "Transfer to the number then send the confirmation screenshot.",
    noteDe: "Überweise an die Nummer und sende dann den Nachweis.",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "stripe",
    nameAr: "سترايب",
    nameEn: "Stripe",
    nameDe: "Stripe",
    regionAr: "دولي",
    regionEn: "International",
    regionDe: "International",
    flag: "🌍",
    color: "#6366f1",
    noteAr: "سيتم إرسال رابط Stripe عبر واتساب بعد الحجز.",
    noteEn: "A Stripe link will be sent via WhatsApp after booking.",
    noteDe: "Ein Stripe-Link wird nach der Buchung per WhatsApp gesendet.",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "paypal",
    nameAr: "باي بال",
    nameEn: "PayPal",
    nameDe: "PayPal",
    regionAr: "دولي",
    regionEn: "International",
    regionDe: "International",
    flag: "🌍",
    color: "#0070ba",
    noteAr: "سيتم إرسال رابط PayPal عبر واتساب بعد الحجز.",
    noteEn: "A PayPal link will be sent via WhatsApp after booking.",
    noteDe: "Ein PayPal-Link wird nach der Buchung per WhatsApp gesendet.",
    sortOrder: 4,
    isActive: true,
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

function getLocalizedText(
  lang: Lang,
  ar?: string,
  en?: string,
  de?: string,
  fallback = ""
) {
  if (lang === "ar") return ar || fallback;
  if (lang === "en") return en || fallback;
  return de || en || fallback;
}

function formatPrice(price: number, currency = "EGP") {
  return `${price.toLocaleString()} ${currency}`;
}

export default function Booking() {
  const [packagesData, setPackagesData] = useState<BookingPackage[]>([]);
  const [paymentMethodsData, setPaymentMethodsData] = useState<PaymentMethodItem[]>([]);
  const [bookingContent, setBookingContent] = useState<BookingContent>(defaultBookingContent);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
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
  const [submitting, setSubmitting] = useState(false);

  const isAr = lang === "ar";
  const isEn = lang === "en";
  const isDark = theme === "dark";

  const packageList = useMemo(() => {
    const items = packagesData
      .filter((item) => item.isActive !== false)
      .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
    return items.length ? items : fallbackPackages;
  }, [packagesData]);

  const paymentList = useMemo(() => {
    const items = paymentMethodsData
      .filter((item) => item.isActive !== false)
      .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
    return items.length ? items : fallbackPaymentMethods;
  }, [paymentMethodsData]);

  useEffect(() => {
    const unsubBookingContent = onSnapshot(
      doc(db, "siteContent", "booking"),
      (snapshot) => {
        if (!snapshot.exists()) return;
        setBookingContent({
          ...defaultBookingContent,
          ...(snapshot.data() as Partial<BookingContent>),
        });
      },
      () => {}
    );

    const unsubSettings = onSnapshot(
      doc(db, "siteContent", "settings"),
      (snapshot) => {
        if (!snapshot.exists()) return;
        setSiteSettings({
          ...defaultSiteSettings,
          ...(snapshot.data() as Partial<SiteSettings>),
        });
      },
      () => {}
    );

    const unsubPackages = onSnapshot(
      collection(db, "bookingPackages"),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<BookingPackage, "id">),
        }));
        setPackagesData(data);
      },
      () => {}
    );

    const unsubPaymentMethods = onSnapshot(
      collection(db, "paymentMethods"),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<PaymentMethodItem, "id">),
        }));
        setPaymentMethodsData(data);
      },
      () => {}
    );

    return () => {
      unsubBookingContent();
      unsubSettings();
      unsubPackages();
      unsubPaymentMethods();
    };
  }, []);

  useEffect(() => {
    if (!selectedPackage && packageList.length) {
      setSelectedPackage(packageList[0].id);
    }
  }, [packageList, selectedPackage]);

  useEffect(() => {
    if (!selectedPayment && paymentList.length) {
      setSelectedPayment(paymentList[0].id);
    }
  }, [paymentList, selectedPayment]);

  const selectedPkg =
    packageList.find((p) => p.id === selectedPackage) ?? packageList[0];
  const selectedPaymentMethod =
    paymentList.find((p) => p.id === selectedPayment) ?? paymentList[0];

  const stepOrder: Step[] = ["package", "details", "payment", "confirm"];
  const stepIdx = stepOrder.indexOf(step);

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
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
      success: "#22c55e",
    }),
    [isDark]
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

  const t = useMemo(
    () => ({
      brand: getLocalizedText(lang, "د. أشرف العبد", "Dr. Ashraf El Abd", "Dr. Ashraf El Abd"),
      brandSub: "ONLINE COACH • ELITE TRANSFORMATION",
      home: getLocalizedText(lang, "الرئيسية", "Home", "Startseite"),
      about: getLocalizedText(lang, "نبذة عني", "About", "Über mich"),
      classes: getLocalizedText(lang, "الكلاسات", "Classes", "Kurse"),
      booking: getLocalizedText(lang, "الحجز", "Booking", "Buchung"),
      contact: getLocalizedText(lang, "تواصل", "Contact", "Kontakt"),

      langArabic: "العربية",
      langEnglish: "English",
      langGerman: "Deutsch",

      pageBadge: getLocalizedText(
        lang,
        bookingContent.heroBadgeAr,
        bookingContent.heroBadgeEn,
        bookingContent.heroBadgeDe,
        defaultBookingContent.heroBadgeAr
      ),
      heroTitle1: getLocalizedText(
        lang,
        bookingContent.heroTitle1Ar,
        bookingContent.heroTitle1En,
        bookingContent.heroTitle1De,
        defaultBookingContent.heroTitle1Ar
      ),
      heroTitle2: getLocalizedText(
        lang,
        bookingContent.heroTitle2Ar,
        bookingContent.heroTitle2En,
        bookingContent.heroTitle2De,
        defaultBookingContent.heroTitle2Ar
      ),
      heroText: getLocalizedText(
        lang,
        bookingContent.heroTextAr,
        bookingContent.heroTextEn,
        bookingContent.heroTextDe,
        defaultBookingContent.heroTextAr
      ),

      choosePackage: getLocalizedText(lang, "اختار باقتك", "Choose Your Package", "Wähle dein Paket"),
      yourDetails: getLocalizedText(lang, "بياناتك", "Your Details", "Deine Daten"),
      choosePayment: getLocalizedText(lang, "اختار الدفع", "Choose Payment", "Zahlung wählen"),
      confirmOrder: getLocalizedText(lang, "تأكيد طلبك", "Confirm Your Order", "Bestellung bestätigen"),

      packageStep: getLocalizedText(lang, "الباقة", "Package", "Paket"),
      detailsStep: getLocalizedText(lang, "البيانات", "Details", "Daten"),
      paymentStep: getLocalizedText(lang, "الدفع", "Payment", "Zahlung"),
      confirmStep: getLocalizedText(lang, "التأكيد", "Confirm", "Bestätigung"),

      continue: getLocalizedText(lang, "استمرار", "Continue", "Weiter"),
      continuePayment: getLocalizedText(lang, "المتابعة للدفع", "Continue to Payment", "Weiter zur Zahlung"),
      reviewConfirm: getLocalizedText(lang, "مراجعة وتأكيد", "Review & Confirm", "Prüfen & Bestätigen"),
      confirmStart: getLocalizedText(lang, "تأكيد وابدأ", "Confirm & Start", "Bestätigen & Starten"),
      back: getLocalizedText(lang, "رجوع", "Back", "Zurück"),

      fullName: getLocalizedText(lang, "الاسم الكامل", "Full Name", "Vollständiger Name"),
      email: getLocalizedText(lang, "البريد الإلكتروني", "Email", "E-Mail"),
      phone: getLocalizedText(lang, "رقم الواتساب", "WhatsApp Number", "WhatsApp-Nummer"),
      country: getLocalizedText(lang, "البلد", "Country", "Land"),
      goal: getLocalizedText(lang, "هدفك", "Your Goal", "Dein Ziel"),
      experience: getLocalizedText(lang, "مستوى الخبرة", "Experience Level", "Erfahrungsniveau"),

      selectGoal: getLocalizedText(lang, "اختار هدفك", "Select your goal", "Wähle dein Ziel"),
      selectLevel: getLocalizedText(lang, "اختار المستوى", "Select level", "Wähle dein Niveau"),

      paymentInstructions: getLocalizedText(lang, "تعليمات الدفع", "Payment Instructions", "Zahlungsanweisungen"),
      price: getLocalizedText(lang, "السعر", "Price", "Preis"),
      payment: getLocalizedText(lang, "الدفع", "Payment", "Zahlung"),
      packageLabel: getLocalizedText(lang, "الباقة", "Package", "Paket"),
      detailsConfirmed: getLocalizedText(lang, "تم تأكيد بياناتك", "Your details confirmed", "Deine Daten wurden bestätigt"),
      mostPopular: getLocalizedText(lang, "الأكثر طلبًا", "Most Popular", "Am beliebtesten"),

      satisfaction: getLocalizedText(lang, "ضمان رضا كامل", "100% Satisfaction Guarantee", "100% Zufriedenheitsgarantie"),
      satisfactionText: getLocalizedText(
        lang,
        "إذا التزمت بالخطة ولم ترَ نتائج خلال 30 يومًا، نعيد التخطيط أو نوفر الحل المناسب.",
        "If you follow the plan and don't see results in 30 days, we'll re-plan or provide the right solution.",
        "Wenn du dem Plan folgst und innerhalb von 30 Tagen keine Ergebnisse siehst, passen wir den Plan an oder finden die passende Lösung."
      ),

      successTitle: getLocalizedText(
        lang,
        bookingContent.successTitleAr,
        bookingContent.successTitleEn,
        bookingContent.successTitleDe,
        defaultBookingContent.successTitleAr
      ),
      successText: getLocalizedText(
        lang,
        bookingContent.successTextAr,
        bookingContent.successTextEn,
        bookingContent.successTextDe,
        defaultBookingContent.successTextAr
      ),

      contactWhatsApp: getLocalizedText(lang, "تواصل عبر واتساب", "Contact via WhatsApp", "Über WhatsApp kontaktieren"),
      returnHome: getLocalizedText(lang, "العودة للرئيسية", "Return to Home", "Zurück zur Startseite"),
      directBooking: getLocalizedText(lang, "احجز عبر الواتساب مباشرة", "WhatsApp Direct Booking", "Direkte WhatsApp-Buchung"),
      preferDirect: getLocalizedText(lang, "تفضل تحجز مباشرة؟", "Prefer to book directly?", "Direkt buchen?"),
      knowClasses: getLocalizedText(lang, "تعرف على الكلاسات", "View Classes", "Kurse ansehen"),

      quickLinks: getLocalizedText(lang, "روابط سريعة", "Quick Links", "Schnellzugriffe"),
      coreServices: getLocalizedText(lang, "الخدمات الأساسية", "Core Services", "Kernleistungen"),
      contactInfo: getLocalizedText(lang, "بيانات التواصل", "Contact Info", "Kontaktinformationen"),
      followUs: getLocalizedText(lang, "تابعنا", "Follow Us", "Folge uns"),

      footerText: getLocalizedText(
        lang,
        bookingContent.footerTextAr,
        bookingContent.footerTextEn,
        bookingContent.footerTextDe,
        defaultBookingContent.footerTextAr
      ),
      onlineBooking: getLocalizedText(
        lang,
        "أونلاين + حجز مباشر عبر واتساب",
        "Online + direct WhatsApp booking",
        "Online + direkte WhatsApp-Buchung"
      ),
      bookingSchedule: getLocalizedText(
        lang,
        "الحجز حسب المواعيد المتاحة",
        "Booking based on available schedule",
        "Buchung nach verfügbaren Zeiten"
      ),
      rights: getLocalizedText(
        lang,
        "جميع الحقوق محفوظة © د. أشرف العبد",
        "All rights reserved © Dr. Ashraf El Abd",
        "Alle Rechte vorbehalten © Dr. Ashraf El Abd"
      ),
      premium: getLocalizedText(lang, "تجربة احترافية", "Premium Experience", "Premium-Erlebnis"),
      directWhatsApp: getLocalizedText(lang, "حجز مباشر عبر واتساب", "Direct WhatsApp Booking", "Direkte WhatsApp-Buchung"),
      openNow: getLocalizedText(lang, "افتح الآن", "Open Now", "Jetzt öffnen"),

      whatsapp: getLocalizedText(lang, "واتساب", "WhatsApp", "WhatsApp"),
      facebook: "Facebook",
      instagram: "Instagram",
      tiktok: "TikTok",

      goalFatLoss: getLocalizedText(lang, "خسارة دهون", "Fat Loss", "Fettabbau"),
      goalMuscleGain: getLocalizedText(lang, "بناء عضل", "Muscle Gain", "Muskelaufbau"),
      goalRecomp: getLocalizedText(lang, "إعادة تكوين الجسم", "Body Recomposition", "Körperrekomposition"),
      goalCompetition: getLocalizedText(lang, "تحضير بطولة", "Competition Prep", "Wettkampfvorbereitung"),
      goalGeneral: getLocalizedText(lang, "لياقة عامة", "General Fitness", "Allgemeine Fitness"),

      expBeginner: getLocalizedText(lang, "مبتدئ", "Beginner (0-1 yr)", "Anfänger (0-1 Jahr)"),
      expIntermediate: getLocalizedText(lang, "متوسط", "Intermediate (1-3 yrs)", "Mittelstufe (1-3 Jahre)"),
      expAdvanced: getLocalizedText(lang, "متقدم", "Advanced (3+ yrs)", "Fortgeschritten (3+ Jahre)"),
      expCompetitor: getLocalizedText(lang, "رياضي محترف", "Competitive Athlete", "Wettkampfsportler"),

      themeLight: getLocalizedText(lang, "فاتح", "Light", "Hell"),
      themeDark: getLocalizedText(lang, "ليلي", "Dark", "Dunkel"),

      sending: getLocalizedText(lang, "جاري الإرسال...", "Sending...", "Wird gesendet..."),
    }),
    [lang, bookingContent]
  );

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

  const inputStyle: CSSProperties = {
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

  const getPackageName = (pkg: BookingPackage) =>
    getLocalizedText(lang, pkg.nameAr, pkg.nameEn, pkg.nameDe, pkg.nameEn || pkg.nameAr);

  const getPackageFeatures = (pkg: BookingPackage) => {
    if (lang === "ar") return pkg.featuresAr ?? pkg.featuresEn ?? [];
    if (lang === "en") return pkg.featuresEn ?? pkg.featuresAr ?? [];
    return pkg.featuresDe ?? pkg.featuresEn ?? pkg.featuresAr ?? [];
  };

  const getPackagePriceNote = (pkg: BookingPackage) =>
    getLocalizedText(lang, pkg.priceNoteAr, pkg.priceNoteEn, pkg.priceNoteDe);

  const getPackageBadge = (pkg: BookingPackage) =>
    getLocalizedText(lang, pkg.badgeAr, pkg.badgeEn, pkg.badgeDe);

  const getPaymentName = (pm: PaymentMethodItem) =>
    getLocalizedText(lang, pm.nameAr, pm.nameEn, pm.nameDe, pm.nameEn || pm.nameAr);

  const getPaymentRegion = (pm: PaymentMethodItem) =>
    getLocalizedText(lang, pm.regionAr, pm.regionEn, pm.regionDe);

  const getPaymentNote = (pm: PaymentMethodItem) =>
    getLocalizedText(lang, pm.noteAr, pm.noteEn, pm.noteDe);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedPkg || !selectedPaymentMethod) return;

    setSubmitting(true);

    try {
      await addDoc(collection(db, "bookingRequests"), {
        packageId: selectedPkg.id,
        packageNameAr: selectedPkg.nameAr,
        packageNameEn: selectedPkg.nameEn,
        packageNameDe: selectedPkg.nameDe,
        paymentMethodId: selectedPaymentMethod.id,
        paymentMethodNameAr: selectedPaymentMethod.nameAr,
        paymentMethodNameEn: selectedPaymentMethod.nameEn,
        paymentMethodNameDe: selectedPaymentMethod.nameDe,
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        goal: form.goal,
        experience: form.experience,
        status: "new",
        lang,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!selectedPkg || !selectedPaymentMethod) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: colors.bg,
          color: colors.text,
          fontFamily: "Cairo, sans-serif",
        }}
      >
        ...
      </div>
    );
  }

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
            <NavLink to={CLASSES_PATH} style={navLinkBase}>
              {t.classes}
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

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                style={{
                  height: 46,
                  minWidth: 145,
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
                aria-label="Language selector"
              >
                <option value="ar">{t.langArabic}</option>
                <option value="en">{t.langEnglish}</option>
                <option value="de">{t.langGerman}</option>
              </select>

              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  [isAr ? "left" : "right"]: 12,
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
              aria-label="Theme toggle"
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
              <span>{isDark ? t.themeDark : t.themeLight}</span>
            </button>

            <a
              href={whatsappLink}
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
        href={whatsappLink}
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
          padding: "88px 20px 56px",
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

        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
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
            {t.pageBadge}
          </div>

          <h1
            style={{
              fontSize: "clamp(2.6rem, 6vw, 4.9rem)",
              lineHeight: 1,
              margin: "0 0 14px",
              fontWeight: 900,
            }}
          >
            {t.heroTitle1} <span style={{ color: colors.gold }}>{t.heroTitle2}</span>
          </h1>

          <p
            style={{
              color: colors.textMuted,
              maxWidth: 760,
              margin: "0 auto 26px",
              lineHeight: 1.95,
              fontSize: 18,
            }}
          >
            {t.heroText}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: 14,
              maxWidth: 820,
              margin: "0 auto",
            }}
          >
            {[
              { value: "1", label: t.packageStep },
              { value: "2", label: t.detailsStep },
              { value: "3", label: t.paymentStep },
              { value: "4", label: t.confirmStep },
            ].map((item) => (
              <div
                key={item.label}
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
                  {item.value}
                </div>
                <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 800 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: colors.sectionAlt,
          padding: "18px 20px 26px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
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
                <button
                  key={s}
                  onClick={() => {
                    if (i <= stepIdx) setStep(s);
                  }}
                  style={{
                    flexShrink: 0,
                    border: "none",
                    cursor: i <= stepIdx ? "pointer" : "default",
                    padding: "14px 18px",
                    borderRadius: 18,
                    background:
                      i === stepIdx
                        ? `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.02))`
                        : "transparent",
                    color: i === stepIdx ? colors.gold : i < stepIdx ? colors.text : colors.textMuted,
                    fontWeight: 900,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: i === stepIdx ? colors.glow : "none",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: i <= stepIdx ? colors.goldSoft : "transparent",
                      fontSize: 12,
                    }}
                  >
                    {i + 1}
                  </span>
                  {label}
                </button>
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 18,
                    marginBottom: 30,
                  }}
                >
                  {packageList.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      style={{
                        position: "relative",
                        textAlign: isAr ? "right" : "left",
                        padding: 24,
                        borderRadius: 28,
                        cursor: "pointer",
                        background:
                          selectedPackage === pkg.id
                            ? `linear-gradient(135deg, ${colors.goldSoft} 0%, ${colors.bgCard} 100%)`
                            : colors.bgCard,
                        border:
                          selectedPackage === pkg.id
                            ? `2px solid ${colors.gold}`
                            : `1px solid ${colors.border}`,
                        boxShadow: selectedPackage === pkg.id ? colors.glow : colors.shadow,
                        transition: "0.25s ease",
                        color: colors.text,
                      }}
                    >
                      {(pkg.isPopular || getPackageBadge(pkg)) && (
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
                          {getPackageBadge(pkg) || t.mostPopular}
                        </div>
                      )}

                      <div
                        style={{
                          fontWeight: 900,
                          fontSize: 24,
                          color: selectedPackage === pkg.id ? colors.gold : colors.text,
                          marginBottom: 12,
                        }}
                      >
                        {getPackageName(pkg)}
                      </div>

                      <div style={{ fontWeight: 900, fontSize: 28, marginBottom: 14 }}>
                        {formatPrice(pkg.price, pkg.currency || "EGP")}
                        {pkg.oldPrice ? (
                          <span
                            style={{
                              color: colors.textMuted,
                              fontSize: 16,
                              marginInlineStart: 8,
                              textDecoration: "line-through",
                            }}
                          >
                            {formatPrice(pkg.oldPrice, pkg.currency || "EGP")}
                          </span>
                        ) : null}
                        {getPackagePriceNote(pkg) ? (
                          <span style={{ color: colors.textMuted, fontSize: 16, marginInlineStart: 6 }}>
                            {getPackagePriceNote(pkg)}
                          </span>
                        ) : null}
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        {getPackageFeatures(pkg)
                          .slice(0, 4)
                          .map((f, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <CheckCircle
                                size={15}
                                style={{
                                  color: selectedPackage === pkg.id ? colors.gold : colors.textMuted,
                                  flexShrink: 0,
                                }}
                              />
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
                    {t.continue} {getPackageName(selectedPkg)}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === "details" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("payment");
                }}
              >
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
                        <label
                          style={{
                            display: "block",
                            fontWeight: 800,
                            color: colors.gold,
                            marginBottom: 8,
                            fontSize: 13,
                          }}
                        >
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
                    <label
                      style={{
                        display: "block",
                        fontWeight: 800,
                        color: colors.gold,
                        marginBottom: 8,
                        fontSize: 13,
                      }}
                    >
                      {t.goal}
                    </label>
                    <select
                      required
                      value={form.goal}
                      onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">{t.selectGoal}</option>
                      <option value="fat-loss">{t.goalFatLoss}</option>
                      <option value="muscle-gain">{t.goalMuscleGain}</option>
                      <option value="body-recomp">{t.goalRecomp}</option>
                      <option value="competition">{t.goalCompetition}</option>
                      <option value="general">{t.goalGeneral}</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label
                      style={{
                        display: "block",
                        fontWeight: 800,
                        color: colors.gold,
                        marginBottom: 8,
                        fontSize: 13,
                      }}
                    >
                      {t.experience}
                    </label>
                    <select
                      required
                      value={form.experience}
                      onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">{t.selectLevel}</option>
                      <option value="beginner">{t.expBeginner}</option>
                      <option value="intermediate">{t.expIntermediate}</option>
                      <option value="advanced">{t.expAdvanced}</option>
                      <option value="competitor">{t.expCompetitor}</option>
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
                        {getPackageName(selectedPkg)}
                      </div>
                      <div style={{ color: colors.textMuted, marginTop: 4, fontSize: 14 }}>
                        {form.name || t.detailsConfirmed}
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 24 }}>
                      {formatPrice(selectedPkg.price, selectedPkg.currency || "EGP")}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                      gap: 14,
                      marginBottom: 22,
                    }}
                  >
                    {paymentList.map((pm) => (
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
                          background: selectedPayment === pm.id ? `${pm.color || "#D4AF37"}15` : colors.bgCard,
                          border:
                            selectedPayment === pm.id
                              ? `2px solid ${pm.color || colors.gold}`
                              : `1px solid ${colors.border}`,
                          boxShadow:
                            selectedPayment === pm.id ? `0 0 20px ${(pm.color || "#D4AF37")}20` : "none",
                          color: colors.text,
                          transition: "0.25s ease",
                        }}
                      >
                        <span style={{ fontSize: 28, marginBottom: 8 }}>{pm.flag || "💳"}</span>
                        <div style={{ fontWeight: 900, fontSize: 14 }}>{getPaymentName(pm)}</div>
                        <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
                          {getPaymentRegion(pm)}
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

                    {selectedPaymentMethod.value ? (
                      <div
                        style={{
                          background: colors.bgSoft,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 16,
                          padding: "12px 14px",
                          marginBottom: 12,
                          fontWeight: 800,
                          color: colors.text,
                          wordBreak: "break-word",
                          direction:
                            selectedPaymentMethod.id === "vodafone" ? "ltr" : isAr ? "rtl" : "ltr",
                          textAlign:
                            selectedPaymentMethod.id === "vodafone"
                              ? "left"
                              : isAr
                              ? "right"
                              : "left",
                        }}
                      >
                        {selectedPaymentMethod.value}
                      </div>
                    ) : null}

                    {selectedPaymentMethod.link ? (
                      <a
                        href={selectedPaymentMethod.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 18px",
                          borderRadius: 14,
                          background: colors.heroButton,
                          color: "#111",
                          textDecoration: "none",
                          fontWeight: 900,
                          marginBottom: 12,
                        }}
                      >
                        <CreditCard size={16} />
                        {getLocalizedText(lang, "افتح رابط الدفع", "Open Payment Link", "Zahlungslink öffnen")}
                      </a>
                    ) : null}

                    <p style={{ margin: 0, color: colors.textMuted, lineHeight: 1.9, fontSize: 14 }}>
                      {getPaymentNote(selectedPaymentMethod)}
                    </p>
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
                      { label: t.packageLabel, value: getPackageName(selectedPkg) },
                      { label: t.price, value: `${formatPrice(selectedPkg.price, selectedPkg.currency || "EGP")} ${getPackagePriceNote(selectedPkg)}` },
                      { label: t.fullName, value: form.name || "—" },
                      { label: t.email, value: form.email || "—" },
                      { label: t.phone, value: form.phone || "—" },
                      { label: t.country, value: form.country || "—" },
                      { label: t.goal, value: form.goal || "—" },
                      { label: t.experience, value: form.experience || "—" },
                      { label: t.payment, value: getPaymentName(selectedPaymentMethod) || "—" },
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
                    <Shield style={{ color: colors.success, flexShrink: 0, marginTop: 2 }} size={20} />
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
                    disabled={submitting}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "15px 28px",
                      borderRadius: 16,
                      background: colors.heroButton,
                      color: "#111",
                      border: "none",
                      cursor: submitting ? "wait" : "pointer",
                      fontWeight: 900,
                      boxShadow: "0 0 30px rgba(212,175,55,0.35)",
                      opacity: submitting ? 0.8 : 1,
                    }}
                  >
                    <Flame size={18} />
                    {submitting ? t.sending : t.confirmStart}
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
              {t.successTitle}
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
                {[
                  t.successText,
                  getLocalizedText(
                    lang,
                    "أكمل الدفع وأرسل لقطة التأكيد على واتساب.",
                    "Complete your payment and send the confirmation screenshot on WhatsApp.",
                    "Schließe die Zahlung ab und sende den Zahlungsnachweis per WhatsApp."
                  ),
                  getLocalizedText(
                    lang,
                    "رحلة التغيير بدأت الآن.",
                    "Your transformation journey starts now.",
                    "Deine Veränderungsreise beginnt jetzt."
                  ),
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <CheckCircle size={18} style={{ color: colors.success, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: colors.textSoft, lineHeight: 1.8 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={whatsappLink}
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
          <p style={{ color: colors.textMuted, marginBottom: 18 }}>{t.preferDirect}</p>
          <a
            href={whatsappLink}
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
                  {getLocalizedText(lang, "جاهز تبدأ؟", "Ready To Start?", "Bereit zu starten?")}
                </h2>
                <p style={{ margin: "0 auto 22px", color: colors.textSoft, lineHeight: 1.9, maxWidth: 760 }}>
                  {getLocalizedText(
                    lang,
                    "ابدأ المحادثة الآن واختر الباقة المناسبة لك.",
                    "Start the conversation now and choose the package that fits you.",
                    "Starte jetzt das Gespräch und wähle das Paket, das zu dir passt."
                  )}
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
                      boxShadow: "0 10px 40px rgba(212,166,63,0.30)",
                    }}
                  >
                    {t.pageBadge}
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
                    {t.knowClasses}
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
                  href={whatsappLink}
                  icon={<MessageCircle size={20} />}
                  title={t.whatsapp}
                  subtitle={t.openNow}
                  accentColor="#25D366"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.facebookLink}
                  icon={<FacebookIcon size={20} />}
                  title={t.facebook}
                  subtitle={t.openNow}
                  accentColor="#1877F2"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.instagramLink}
                  icon={<InstagramIcon size={20} />}
                  title={t.instagram}
                  subtitle={t.openNow}
                  accentColor="#E1306C"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.tiktokLink}
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
                <NavLink to={CLASSES_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.classes}
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
                <span>{getLocalizedText(lang, "الحجز المباشر", "Direct Booking", "Direkte Buchung")}</span>
                <span>{getLocalizedText(lang, "الباقات التدريبية", "Coaching Packages", "Coaching-Pakete")}</span>
                <span>{getLocalizedText(lang, "طرق الدفع", "Payment Methods", "Zahlungsmethoden")}</span>
                <span>{getLocalizedText(lang, "خدمة العملاء", "Client Support", "Kundensupport")}</span>
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
                      href={siteSettings.instagramLink}
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
                      href={siteSettings.facebookLink}
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
                      href={siteSettings.tiktokLink}
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
              alignItems: "center",
              flexDirection: "row",
              gap: 14,
              color: colors.textMuted,
              fontSize: 13,
              flexWrap: "wrap",
            }}
          >
            <span>{t.rights}</span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.02))`,
                border: `1px solid ${colors.border}`,
                boxShadow: colors.glow,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 700 }}>
                  {getLocalizedText(lang, "تم التطوير بواسطة", "Developed by", "Entwickelt von")}
                </span>
                <span style={{ color: colors.gold, fontWeight: 900, fontSize: 15 }}>
                  {siteSettings.developerName || defaultSiteSettings.developerName}
                </span>
                <span style={{ color: colors.textMuted, fontSize: 12 }}>
                  {getLocalizedText(lang, "برمجة وتطوير واجهات", "Frontend & Web Development", "Frontend- & Webentwicklung")}
                </span>
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
                }}
              >
                <MessageCircle size={16} />
                {getLocalizedText(lang, "واتساب المطور", "Developer WhatsApp", "WhatsApp des Entwicklers")}
              </a>
            </div>

            <span>{t.premium}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}