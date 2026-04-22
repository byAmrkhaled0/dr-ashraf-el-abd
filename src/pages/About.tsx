import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
  Play,
  ExternalLink,
  Mic2,
  Tv,
} from "lucide-react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ROUTE_PATHS } from "@/lib/index";
import { db } from "@/lib/firebase";

type Lang = "ar" | "en" | "de";
type ThemeMode = "dark" | "light";

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

type AboutContent = {
  pageTitleAr: string;
  pageTitleEn: string;
  pageTitleDe: string;

  introTitleAr: string;
  introTitleEn: string;
  introTitleDe: string;

  introTextAr: string;
  introTextEn: string;
  introTextDe: string;

  overviewTitleAr: string;
  overviewTitleEn: string;
  overviewTitleDe: string;

  overviewText1Ar: string;
  overviewText1En: string;
  overviewText1De: string;

  overviewText2Ar: string;
  overviewText2En: string;
  overviewText2De: string;

  highlightsTitleAr: string;
  highlightsTitleEn: string;
  highlightsTitleDe: string;

  rolesTitleAr: string;
  rolesTitleEn: string;
  rolesTitleDe: string;

  servicesTitleAr: string;
  servicesTitleEn: string;
  servicesTitleDe: string;

  certificatesTitleAr: string;
  certificatesTitleEn: string;
  certificatesTitleDe: string;

  featuredTitleAr: string;
  featuredTitleEn: string;
  featuredTitleDe: string;

  mediaTitleAr: string;
  mediaTitleEn: string;
  mediaTitleDe: string;

  mediaSubAr: string;
  mediaSubEn: string;
  mediaSubDe: string;

  galleryTitleAr: string;
  galleryTitleEn: string;
  galleryTitleDe: string;

  finalTitleAr: string;
  finalTitleEn: string;
  finalTitleDe: string;

  finalTextAr: string;
  finalTextEn: string;
  finalTextDe: string;

  footerTextAr: string;
  footerTextEn: string;
  footerTextDe: string;
};

type HighlightItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  titleDe: string;
  icon:
    | "award"
    | "users"
    | "trophy"
    | "building"
    | "chart"
    | "target"
    | "graduation"
    | "plane";
  sortOrder: number;
  isActive: boolean;
};

type RoleItem = {
  id: string;
  textAr: string;
  textEn: string;
  textDe: string;
  sortOrder: number;
  isActive: boolean;
};

type ServiceItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  titleDe: string;
  descAr: string;
  descEn: string;
  descDe: string;
  icon:
    | "dumbbell"
    | "heart"
    | "trophy"
    | "shield"
    | "book"
    | "users"
    | "briefcase";
  sortOrder: number;
  isActive: boolean;
};

type CertificateGroup = {
  id: string;
  groupAr: string;
  groupEn: string;
  groupDe: string;
  itemsAr: string[];
  itemsEn: string[];
  itemsDe: string[];
  sortOrder: number;
  isActive: boolean;
};

type StoryItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  titleDe: string;
  textAr: string;
  textEn: string;
  textDe: string;
  icon: "crown" | "dumbbell" | "medal";
  images: string[];
  sortOrder: number;
  isActive: boolean;
};

type MediaItem = {
  id: string;
  url: string;
  youtubeId: string;
  type: "tv" | "podcast";
  titleAr: string;
  titleEn: string;
  titleDe: string;
  textAr: string;
  textEn: string;
  textDe: string;
  sortOrder: number;
  isActive: boolean;
};

type GalleryImageItem = {
  id: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
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

const defaultAboutContent: AboutContent = {
  pageTitleAr: "نبذة عن د. أشرف العبد",
  pageTitleEn: "About Dr. Ashraf El Abd",
  pageTitleDe: "Über Dr. Ashraf El Abd",

  introTitleAr: "تعريف مختصر",
  introTitleEn: "Quick Introduction",
  introTitleDe: "Kurze Vorstellung",

  introTextAr:
    "د. أشرف العبد خبير في التدريب والتغذية والإدارة الرياضية بخبرة تتجاوز 15 سنة، ويجمع بين الإدارة، التدريب الاحترافي، التأهيل، والتعليم والمحاضرات الأكاديمية.",
  introTextEn:
    "Dr. Ashraf El Abd is a coaching, nutrition, and sports operations expert with 15+ years of experience, combining management, elite coaching, rehabilitation, and academic lecturing.",
  introTextDe:
    "Dr. Ashraf El Abd ist Experte für Coaching, Ernährung und Sportmanagement mit über 15 Jahren Erfahrung und verbindet Management, professionelles Coaching, Rehabilitation und akademische Lehre.",

  overviewTitleAr: "من هو د. أشرف؟",
  overviewTitleEn: "Who Is Dr. Ashraf?",
  overviewTitleDe: "Wer ist Dr. Ashraf?",

  overviewText1Ar:
    "د. أشرف العبد يعمل كمدير تشغيل وإدارة لعدة فروع جيم، ومدرب محترف، ومحاضر أكاديمي، وحكم دولي IFBB، وله خبرة قوية في بناء الأنظمة التدريبية، رفع كفاءة الفرق، وتحقيق نمو فعلي في الأداء، العضويات، والمبيعات.",
  overviewText1En:
    "Dr. Ashraf El Abd works as a multi-branch gym operations leader, professional coach, academic lecturer, and IFBB International Judge, with strong expertise in coaching systems, team performance, and measurable growth.",
  overviewText1De:
    "Dr. Ashraf El Abd arbeitet als Leiter für den Betrieb mehrerer Fitnessstudio-Filialen, professioneller Coach, akademischer Dozent und internationaler IFBB-Kampfrichter mit starker Erfahrung in Trainingssystemen, Teamleistung und messbarem Wachstum.",

  overviewText2Ar:
    "قاد 4 فروع جيم تضم أكثر من 7000 عضو نشط، وحقق نمو عضويات بنسبة 54% وزيادة سنوية في الربح بنسبة 32%، كما ساعد أكثر من 500 عميل على تحقيق نتائج حقيقية، وشارك في إعداد وتطوير المدربين والمحاضرات المتخصصة داخل المجال.",
  overviewText2En:
    "He led 4 gym branches serving 7,000+ active members, achieved 54% membership growth and a 32% annual profit increase, helped 500+ clients reach real results, and contributed to trainer development and specialized education.",
  overviewText2De:
    "Er leitete 4 Fitnessstudio-Filialen mit über 7.000 aktiven Mitgliedern, erzielte 54 % Mitgliederwachstum und 32 % jährliche Gewinnsteigerung, half mehr als 500 Kunden zu echten Ergebnissen und trug zur Entwicklung von Trainern und Fachschulungen bei.",

  highlightsTitleAr: "أبرز النقاط",
  highlightsTitleEn: "Key Highlights",
  highlightsTitleDe: "Wichtige Highlights",

  rolesTitleAr: "الأدوار والخبرة",
  rolesTitleEn: "Roles & Experience",
  rolesTitleDe: "Rollen & Erfahrung",

  servicesTitleAr: "الخدمات التي يقدمها",
  servicesTitleEn: "Services Offered",
  servicesTitleDe: "Angebotene Leistungen",

  certificatesTitleAr: "المؤهلات والشهادات",
  certificatesTitleEn: "Education & Certifications",
  certificatesTitleDe: "Ausbildung & Zertifikate",

  featuredTitleAr: "رحلة مهنية متكاملة",
  featuredTitleEn: "A Complete Professional Journey",
  featuredTitleDe: "Eine vollständige berufliche Laufbahn",

  mediaTitleAr: "الظهور الإعلامي",
  mediaTitleEn: "Media Appearances",
  mediaTitleDe: "Medienauftritte",

  mediaSubAr:
    "لقاءات تلفزيونية وبودكاست تعكس الحضور الإعلامي والخبرة المهنية للكابتن.",
  mediaSubEn:
    "TV interviews and podcast appearances that highlight the captain's media presence and professional expertise.",
  mediaSubDe:
    "TV-Interviews und Podcast-Auftritte, die die Medienpräsenz und berufliche Expertise des Captains zeigen.",

  galleryTitleAr: "صور للكابتن",
  galleryTitleEn: "Captain Gallery",
  galleryTitleDe: "Galerie des Captains",

  finalTitleAr: "جاهز تبدأ التغيير؟",
  finalTitleEn: "Ready To Transform?",
  finalTitleDe: "Bereit für die Veränderung?",

  finalTextAr:
    "ابدأ محادثتك الآن، واعرف القسم المناسب لك، وخطوتك الأولى.",
  finalTextEn:
    "Start your conversation now, discover the right section for you, and take your first step.",
  finalTextDe:
    "Starte jetzt dein Gespräch, entdecke den passenden Bereich für dich und mache deinen ersten Schritt.",

  footerTextAr: "جميع الحجوزات والاستفسارات تتم مباشرة عبر واتساب.",
  footerTextEn:
    "All bookings and inquiries are handled directly through WhatsApp.",
  footerTextDe:
    "Alle Buchungen und Anfragen werden direkt über WhatsApp abgewickelt.",
};

const fallbackHighlights: HighlightItem[] = [
  {
    id: "1",
    titleAr: "15+ سنة خبرة فعلية",
    titleEn: "15+ Years of Real Experience",
    titleDe: "15+ Jahre echte Erfahrung",
    icon: "award",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    titleAr: "500+ عميل بنتائج حقيقية",
    titleEn: "500+ Clients with Real Results",
    titleDe: "500+ Kunden mit echten Ergebnissen",
    icon: "users",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "3",
    titleAr: "حكم دولي IFBB",
    titleEn: "IFBB International Judge",
    titleDe: "Internationaler IFBB-Kampfrichter",
    icon: "trophy",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "4",
    titleAr: "إدارة 4 فروع جيم",
    titleEn: "Managed 4 Gym Branches",
    titleDe: "Leitung von 4 Fitnessstudio-Filialen",
    icon: "building",
    sortOrder: 4,
    isActive: true,
  },
];

const fallbackRoles: RoleItem[] = [
  {
    id: "1",
    textAr: "خبرة تتجاوز 15 سنة في التدريب والتغذية والإدارة الرياضية",
    textEn: "15+ years of experience in coaching, nutrition, and sports operations",
    textDe: "Über 15 Jahre Erfahrung in Coaching, Ernährung und Sportmanagement",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    textAr: "General Manager لـ Add Fit Fitness Club و Seven Day Gym",
    textEn: "General Manager of Add Fit Fitness Club and Seven Day Gym",
    textDe: "General Manager von Add Fit Fitness Club und Seven Day Gym",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "3",
    textAr: "مدير سابق في Gold’s Gym Pyramids View",
    textEn: "Former Fitness Manager at Gold’s Gym Pyramids View",
    textDe: "Ehemaliger Fitness Manager bei Gold’s Gym Pyramids View",
    sortOrder: 3,
    isActive: true,
  },
];

const fallbackServices: ServiceItem[] = [
  {
    id: "1",
    titleAr: "التدريب الأونلاين",
    titleEn: "Online Coaching",
    titleDe: "Online-Coaching",
    descAr: "برامج تدريب فردية حسب الهدف والمستوى والحالة البدنية.",
    descEn: "Personalized coaching plans based on goals, level, and condition.",
    descDe: "Individuelle Coaching-Pläne nach Ziel, Niveau und körperlichem Zustand.",
    icon: "dumbbell",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    titleAr: "برامج التغذية",
    titleEn: "Nutrition Programs",
    titleDe: "Ernährungsprogramme",
    descAr: "تخسيس، زيادة وزن، بناء عضلات، ومقاومة الإنسولين.",
    descEn: "Fat loss, weight gain, muscle building, and insulin resistance support.",
    descDe: "Fettabbau, Gewichtszunahme, Muskelaufbau und Unterstützung bei Insulinresistenz.",
    icon: "heart",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "3",
    titleAr: "تحضير البطولات",
    titleEn: "Competition Prep",
    titleDe: "Wettkampfvorbereitung",
    descAr: "تحضير اللاعبين للمنافسات والبطولات بأعلى جاهزية.",
    descEn: "Athlete preparation for contests and competitions.",
    descDe: "Vorbereitung von Athleten auf Wettkämpfe und Meisterschaften.",
    icon: "trophy",
    sortOrder: 3,
    isActive: true,
  },
];

const fallbackCertificates: CertificateGroup[] = [
  {
    id: "1",
    groupAr: "المؤهلات العلمية",
    groupEn: "Education",
    groupDe: "Ausbildung",
    itemsAr: [
      "دكتوراه في التربية الرياضية – 2025",
      "ماجستير تغذية وتدريب رياضي – 2021",
      "MBA – 2018",
    ],
    itemsEn: [
      "PhD in Sports Education – 2025",
      "Master of Science in Nutrition and Sports Training – 2021",
      "MBA – 2018",
    ],
    itemsDe: [
      "Promotion in Sportpädagogik – 2025",
      "Master in Ernährung und Sporttraining – 2021",
      "MBA – 2018",
    ],
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    groupAr: "الشهادات المهنية",
    groupEn: "Professional Certifications",
    groupDe: "Berufliche Zertifikate",
    itemsAr: [
      "IFBB International Judge – 2024",
      "ISSA Certified Fitness Management",
      "Certified Rehabilitation Specialist",
    ],
    itemsEn: [
      "IFBB International Judge – 2024",
      "ISSA Certified Fitness Management",
      "Certified Rehabilitation Specialist",
    ],
    itemsDe: [
      "IFBB International Judge – 2024",
      "ISSA Certified Fitness Management",
      "Zertifizierter Rehabilitationsspezialist",
    ],
    sortOrder: 2,
    isActive: true,
  },
];

const fallbackStories: StoryItem[] = [
  {
    id: "1",
    titleAr: "حكم دولي IFBB",
    titleEn: "IFBB International Judge",
    titleDe: "Internationaler IFBB-Kampfrichter",
    textAr:
      "يشغل د. أشرف دورًا مهمًا في التحكيم الرياضي على مستوى البطولات المحلية والدولية.",
    textEn:
      "Dr. Ashraf plays a major judging role in national and international championships.",
    textDe:
      "Dr. Ashraf übernimmt eine bedeutende Rolle als Kampfrichter auf nationaler und internationaler Ebene.",
    icon: "crown",
    images: ["/IMAGE/judg4.jpg", "/IMAGE/judge-2.jpg", "/IMAGE/judge-3.jpg"],
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    titleAr: "مدرب برايفت وصانع نتائج",
    titleEn: "Private Coach & Results Builder",
    titleDe: "Privatcoach & Ergebnismacher",
    textAr:
      "خبرة قوية في تصميم برامج فردية تساعد العملاء على الوصول لنتائج واضحة ومستقرة.",
    textEn:
      "Strong experience in building personalized programs that help clients reach visible and stable results.",
    textDe:
      "Große Erfahrung in der Erstellung individueller Programme mit sichtbaren und stabilen Ergebnissen.",
    icon: "dumbbell",
    images: ["/IMAGE/private-1.jpeg", "/IMAGE/private-2.jpeg", "/IMAGE/private-3.jpeg"],
    sortOrder: 2,
    isActive: true,
  },
];

const fallbackMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://youtu.be/AuNPOkFu5fI?si=VUrukhq_xb-l11hG",
    youtubeId: "AuNPOkFu5fI",
    type: "tv",
    titleAr: "ظهور فضائي ومداخلة إعلامية",
    titleEn: "TV Appearance & Media Interview",
    titleDe: "TV-Auftritt & Medieninterview",
    textAr:
      "حلقة تعكس الحضور الإعلامي للكابتن وتبرز خبرته داخل المجال الرياضي والتدريبي.",
    textEn:
      "An episode that reflects the captain's media presence and highlights his expertise in the fitness field.",
    textDe:
      "Eine Episode, die die Medienpräsenz des Captains widerspiegelt und seine Expertise im Fitnessbereich zeigt.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "2",
    url: "https://youtu.be/3vdvbr0nPYI?si=6mqIIuR0Ux-jGujb",
    youtubeId: "3vdvbr0nPYI",
    type: "podcast",
    titleAr: "بودكاست وحوار متخصص",
    titleEn: "Podcast & Expert Conversation",
    titleDe: "Podcast & Fachgespräch",
    textAr:
      "محتوى حواري يبرز خبرة الكابتن بشكل أعمق ويعكس أسلوبه العملي والعلمي.",
    textEn:
      "A conversation piece that presents the captain's experience in more depth.",
    textDe:
      "Ein Gesprächsformat, das die Erfahrung des Captains tiefer zeigt.",
    sortOrder: 2,
    isActive: true,
  },
];

const fallbackGallery: GalleryImageItem[] = [
  { id: "1", imageUrl: "/IMAGE/dr3.jpeg", sortOrder: 1, isActive: true },
  { id: "2", imageUrl: "/IMAGE/dr2.jpg", sortOrder: 2, isActive: true },
  { id: "3", imageUrl: "/IMAGE/dr3.jpg", sortOrder: 3, isActive: true },
  { id: "4", imageUrl: "/IMAGE/t1.jpeg", sortOrder: 4, isActive: true },
  { id: "5", imageUrl: "/IMAGE/t2.jpeg", sortOrder: 5, isActive: true },
  { id: "6", imageUrl: "/IMAGE/t3.jpeg", sortOrder: 6, isActive: true },
];

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
  children: ReactNode;
  style?: CSSProperties;
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
      href={href || "#"}
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

function localize(lang: Lang, ar?: string, en?: string, de?: string, fallback = "") {
  if (lang === "ar") return ar || fallback;
  if (lang === "en") return en || ar || fallback;
  return de || en || ar || fallback;
}

function getHighlightIcon(icon: HighlightItem["icon"]) {
  switch (icon) {
    case "award":
      return <Award size={18} />;
    case "users":
      return <Users size={18} />;
    case "trophy":
      return <Trophy size={18} />;
    case "building":
      return <Building2 size={18} />;
    case "chart":
      return <BarChart3 size={18} />;
    case "target":
      return <Target size={18} />;
    case "graduation":
      return <GraduationCap size={18} />;
    case "plane":
      return <Plane size={18} />;
    default:
      return <Star size={18} />;
  }
}

function getServiceIcon(icon: ServiceItem["icon"]) {
  switch (icon) {
    case "dumbbell":
      return <Dumbbell size={18} />;
    case "heart":
      return <HeartPulse size={18} />;
    case "trophy":
      return <Trophy size={18} />;
    case "shield":
      return <ShieldCheck size={18} />;
    case "book":
      return <BookOpen size={18} />;
    case "users":
      return <Users size={18} />;
    case "briefcase":
      return <Briefcase size={18} />;
    default:
      return <Dumbbell size={18} />;
  }
}

function getStoryIcon(icon: StoryItem["icon"]) {
  switch (icon) {
    case "crown":
      return <Crown size={18} />;
    case "dumbbell":
      return <Dumbbell size={18} />;
    case "medal":
      return <Medal size={18} />;
    default:
      return <Star size={18} />;
  }
}

export default function About() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);

  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateGroup[]>([]);
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>([]);

  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  const isAr = lang === "ar";
  const isEn = lang === "en";
  const isDark = theme === "dark";

  useEffect(() => {
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

    const unsubAboutContent = onSnapshot(
      doc(db, "siteContent", "about"),
      (snapshot) => {
        if (!snapshot.exists()) return;
        setAboutContent({
          ...defaultAboutContent,
          ...(snapshot.data() as Partial<AboutContent>),
        });
      },
      () => {}
    );

    const unsubHighlights = onSnapshot(
      collection(db, "aboutHighlights"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<HighlightItem, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setHighlights(data);
      },
      () => {}
    );

    const unsubRoles = onSnapshot(
      collection(db, "aboutRoles"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<RoleItem, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setRoles(data);
      },
      () => {}
    );

    const unsubServices = onSnapshot(
      collection(db, "aboutServices"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceItem, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setServices(data);
      },
      () => {}
    );

    const unsubCertificates = onSnapshot(
      collection(db, "aboutCertificates"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<CertificateGroup, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setCertificates(data);
      },
      () => {}
    );

    const unsubStories = onSnapshot(
      collection(db, "aboutStories"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<StoryItem, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setStories(data);
      },
      () => {}
    );

    const unsubMedia = onSnapshot(
      collection(db, "aboutMedia"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<MediaItem, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setMediaItems(data);
      },
      () => {}
    );

    const unsubGallery = onSnapshot(
      collection(db, "aboutGallery"),
      (snapshot) => {
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryImageItem, "id">) }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
        setGalleryImages(data);
      },
      () => {}
    );

    return () => {
      unsubSettings();
      unsubAboutContent();
      unsubHighlights();
      unsubRoles();
      unsubServices();
      unsubCertificates();
      unsubStories();
      unsubMedia();
      unsubGallery();
    };
  }, []);

  const liveHighlights = highlights.length ? highlights : fallbackHighlights;
  const liveRoles = roles.length ? roles : fallbackRoles;
  const liveServices = services.length ? services : fallbackServices;
  const liveCertificates = certificates.length ? certificates : fallbackCertificates;
  const liveStories = stories.length ? stories : fallbackStories;
  const liveMedia = mediaItems.length ? mediaItems : fallbackMedia;
  const liveGallery = galleryImages.length ? galleryImages : fallbackGallery;

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
      modalOverlay: "rgba(5, 7, 11, 0.88)",
      modalButtonBg: "rgba(255,255,255,0.08)",
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
      pageTitle: localize(
        lang,
        aboutContent.pageTitleAr,
        aboutContent.pageTitleEn,
        aboutContent.pageTitleDe,
        defaultAboutContent.pageTitleAr
      ),
      introTitle: localize(
        lang,
        aboutContent.introTitleAr,
        aboutContent.introTitleEn,
        aboutContent.introTitleDe,
        defaultAboutContent.introTitleAr
      ),
      introText: localize(
        lang,
        aboutContent.introTextAr,
        aboutContent.introTextEn,
        aboutContent.introTextDe,
        defaultAboutContent.introTextAr
      ),

      overviewTitle: localize(
        lang,
        aboutContent.overviewTitleAr,
        aboutContent.overviewTitleEn,
        aboutContent.overviewTitleDe,
        defaultAboutContent.overviewTitleAr
      ),
      overviewText1: localize(
        lang,
        aboutContent.overviewText1Ar,
        aboutContent.overviewText1En,
        aboutContent.overviewText1De,
        defaultAboutContent.overviewText1Ar
      ),
      overviewText2: localize(
        lang,
        aboutContent.overviewText2Ar,
        aboutContent.overviewText2En,
        aboutContent.overviewText2De,
        defaultAboutContent.overviewText2Ar
      ),

      highlightsTitle: localize(
        lang,
        aboutContent.highlightsTitleAr,
        aboutContent.highlightsTitleEn,
        aboutContent.highlightsTitleDe,
        defaultAboutContent.highlightsTitleAr
      ),
      rolesTitle: localize(
        lang,
        aboutContent.rolesTitleAr,
        aboutContent.rolesTitleEn,
        aboutContent.rolesTitleDe,
        defaultAboutContent.rolesTitleAr
      ),
      servicesTitle: localize(
        lang,
        aboutContent.servicesTitleAr,
        aboutContent.servicesTitleEn,
        aboutContent.servicesTitleDe,
        defaultAboutContent.servicesTitleAr
      ),
      certificatesTitle: localize(
        lang,
        aboutContent.certificatesTitleAr,
        aboutContent.certificatesTitleEn,
        aboutContent.certificatesTitleDe,
        defaultAboutContent.certificatesTitleAr
      ),
      featuredTitle: localize(
        lang,
        aboutContent.featuredTitleAr,
        aboutContent.featuredTitleEn,
        aboutContent.featuredTitleDe,
        defaultAboutContent.featuredTitleAr
      ),
      mediaTitle: localize(
        lang,
        aboutContent.mediaTitleAr,
        aboutContent.mediaTitleEn,
        aboutContent.mediaTitleDe,
        defaultAboutContent.mediaTitleAr
      ),
      mediaSub: localize(
        lang,
        aboutContent.mediaSubAr,
        aboutContent.mediaSubEn,
        aboutContent.mediaSubDe,
        defaultAboutContent.mediaSubAr
      ),
      galleryTitle: localize(
        lang,
        aboutContent.galleryTitleAr,
        aboutContent.galleryTitleEn,
        aboutContent.galleryTitleDe,
        defaultAboutContent.galleryTitleAr
      ),
      finalTitle: localize(
        lang,
        aboutContent.finalTitleAr,
        aboutContent.finalTitleEn,
        aboutContent.finalTitleDe,
        defaultAboutContent.finalTitleAr
      ),
      finalText: localize(
        lang,
        aboutContent.finalTextAr,
        aboutContent.finalTextEn,
        aboutContent.finalTextDe,
        defaultAboutContent.finalTextAr
      ),
      footerText: localize(
        lang,
        aboutContent.footerTextAr,
        aboutContent.footerTextEn,
        aboutContent.footerTextDe,
        defaultAboutContent.footerTextAr
      ),

      brand: localize(lang, "د. أشرف العبد", "Dr. Ashraf El Abd", "Dr. Ashraf El Abd"),
      brandSub: "ONLINE COACH • ELITE TRANSFORMATION",
      home: localize(lang, "الرئيسية", "Home", "Startseite"),
      navAbout: localize(lang, "نبذة عنا", "About", "Über uns"),
      navClasses: localize(lang, "الكلاسات", "Classes", "Kurse"),
      navBooking: localize(lang, "الحجز", "Booking", "Buchung"),
      navGallery: localize(lang, "الصور", "Gallery", "Galerie"),
      navContact: localize(lang, "تواصل", "Contact", "Kontakt"),

      bookNow: localize(lang, "احجز الآن", "Book Now", "Jetzt buchen"),
      contactWhatsapp: localize(lang, "راسلنا الآن", "Chat on WhatsApp", "Jetzt auf WhatsApp schreiben"),
      backHome: localize(lang, "العودة للرئيسية", "Back Home", "Zur Startseite"),
      instagramLabel: localize(lang, "إنستجرام", "Instagram", "Instagram"),
      facebookLabel: localize(lang, "فيسبوك", "Facebook", "Facebook"),
      tiktokLabel: localize(lang, "تيك توك", "TikTok", "TikTok"),
      watchEpisode: localize(lang, "شاهد الحلقة", "Watch Episode", "Episode ansehen"),
      tvLabel: localize(lang, "ظهور فضائي", "TV Appearance", "TV-Auftritt"),
      podcastLabel: localize(lang, "بودكاست", "Podcast", "Podcast"),
      finalBtn: localize(lang, "احجز استفسارك الآن", "Book Your Inquiry", "Jetzt anfragen"),
      knowClasses: localize(lang, "تعرف على الكلاسات", "View Classes", "Kurse ansehen"),
      footerQuick: localize(lang, "روابط سريعة", "Quick Links", "Schnellzugriffe"),
      footerServices: localize(lang, "الأقسام الأساسية", "Core Sections", "Kernbereiche"),
      footerContact: localize(lang, "بيانات التواصل", "Contact Info", "Kontaktinformationen"),
      footerFollow: localize(lang, "تابعنا", "Follow Us", "Folge uns"),
      footerLocation: localize(
        lang,
        "أونلاين + حجز مباشر عبر واتساب",
        "Online + direct WhatsApp booking",
        "Online + direkte Buchung über WhatsApp"
      ),
      footerHours: localize(
        lang,
        "متابعة وحجز حسب المواعيد المتاحة",
        "Booking based on available schedule",
        "Buchung nach verfügbaren Zeiten"
      ),
      openImage: localize(lang, "عرض الصورة", "Open Image", "Bild öffnen"),
      close: localize(lang, "إغلاق", "Close", "Schließen"),
      next: localize(lang, "التالي", "Next", "Weiter"),
      prev: localize(lang, "السابق", "Previous", "Zurück"),
      langArabic: "العربية",
      langEnglish: "English",
      langGerman: "Deutsch",
      themeLight: localize(lang, "فاتح", "Light", "Hell"),
      themeDark: localize(lang, "ليلي", "Dark", "Dunkel"),
      rights: localize(
        lang,
        "جميع الحقوق محفوظة © د. أشرف العبد",
        "All rights reserved © Dr. Ashraf El Abd",
        "Alle Rechte vorbehalten © Dr. Ashraf El Abd"
      ),
      footerTag1: localize(lang, "تصميم احترافي", "Premium Experience", "Premium-Erlebnis"),
      footerTag2: localize(
        lang,
        "حجز مباشر عبر واتساب",
        "Direct WhatsApp Booking",
        "Direkte WhatsApp-Buchung"
      ),
      openNow: localize(lang, "افتح الآن", "Open Now", "Jetzt öffnen"),
      developerCredit: localize(
        lang,
        `تمت البرمجة بواسطة ${siteSettings.developerName || defaultSiteSettings.developerName}`,
        `Developed by ${siteSettings.developerName || defaultSiteSettings.developerName}`,
        `Entwickelt von ${siteSettings.developerName || defaultSiteSettings.developerName}`
      ),
    }),
    [lang, aboutContent, siteSettings]
  );

  const allGalleryImages = liveGallery.map((item) => item.imageUrl).filter(Boolean);

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

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const CLASSES_PATH = ROUTE_PATHS?.CLASSES ?? "/classes";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING ?? "/booking";
  const CONTACT_PATH = "#contact";

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
              {t.navAbout}
            </NavLink>
            <NavLink to={CLASSES_PATH} style={navLinkBase}>
              {t.navClasses}
            </NavLink>
            <NavLink to={BOOKING_PATH} style={navLinkBase}>
              {t.navBooking}
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
                transition: "all 0.25s ease",
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
              {t.bookNow}
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

            <p style={{ color: colors.textSoft, lineHeight: 2, marginBottom: 14 }}>{t.overviewText1}</p>
            <p style={{ color: colors.textSoft, lineHeight: 2, marginBottom: 20 }}>{t.overviewText2}</p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={whatsappLink}
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
            {liveHighlights.map((item) => (
              <HoverCard
                key={item.id}
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
                  {getHighlightIcon(item.icon)}
                </div>

                <div style={{ fontWeight: 800, lineHeight: 1.6 }}>
                  {localize(lang, item.titleAr, item.titleEn, item.titleDe)}
                </div>
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
            {liveRoles.map((item) => (
              <div
                key={item.id}
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
                <span>{localize(lang, item.textAr, item.textEn, item.textDe)}</span>
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
            {liveStories.map((story) => (
              <HoverCard
                key={story.id}
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
                    {getStoryIcon(story.icon)}
                  </div>

                  <h3 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 900 }}>
                    {localize(lang, story.titleAr, story.titleEn, story.titleDe)}
                  </h3>
                  <p style={{ margin: 0, color: colors.textSoft, lineHeight: 2 }}>
                    {localize(lang, story.textAr, story.textEn, story.textDe)}
                  </p>
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
                      onClick={() =>
                        openLightbox(
                          story.images,
                          idx,
                          localize(lang, story.titleAr, story.titleEn, story.titleDe)
                        )
                      }
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        display: "block",
                        borderInlineEnd:
                          idx !== story.images.length - 1 ? `1px solid ${colors.border}` : "none",
                      }}
                      aria-label={`${t.openImage} ${idx + 1}`}
                    >
                      <div className="zoom-wrap shine">
                        <img
                          className="zoom-img"
                          src={img}
                          alt={`${localize(lang, story.titleAr, story.titleEn, story.titleDe)} ${idx + 1}`}
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
            {liveCertificates.map((group) => {
              const items =
                lang === "ar"
                  ? group.itemsAr
                  : lang === "en"
                  ? group.itemsEn?.length
                    ? group.itemsEn
                    : group.itemsAr
                  : group.itemsDe?.length
                  ? group.itemsDe
                  : group.itemsEn?.length
                  ? group.itemsEn
                  : group.itemsAr;

              return (
                <HoverCard
                  key={group.id}
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
                    {localize(lang, group.groupAr, group.groupEn, group.groupDe)}
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {items.map((item, idx) => (
                      <div
                        key={idx}
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
              );
            })}
          </div>
        </section>

        <section className="fade-up" style={{ marginBottom: 42 }}>
          <div style={{ textAlign: rootAlign, marginBottom: 20 }}>
            <div style={{ color: colors.gold, fontWeight: 800, marginBottom: 8 }}>{t.mediaTitle}</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>{t.mediaTitle}</h2>
            <p style={{ color: colors.textSoft, lineHeight: 1.9, margin: "10px 0 0", maxWidth: 760 }}>
              {t.mediaSub}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {liveMedia.map((item) => {
              const title = localize(lang, item.titleAr, item.titleEn, item.titleDe);
              const text = localize(lang, item.textAr, item.textEn, item.textDe);
              const typeLabel = item.type === "tv" ? t.tvLabel : t.podcastLabel;
              const typeIcon = item.type === "tv" ? <Tv size={16} /> : <Mic2 size={16} />;

              return (
                <HoverCard
                  key={item.id}
                  style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: colors.shadow,
                  }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <div className="zoom-wrap shine" style={{ height: 220 }}>
                      <img
                        className="zoom-img"
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.52))",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          [isAr ? "right" : "left"]: 14,
                          background: colors.heroPanel,
                          border: `1px solid ${colors.border}`,
                          color: colors.gold,
                          padding: "8px 12px",
                          borderRadius: 999,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 12,
                          fontWeight: 800,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {typeIcon}
                        {typeLabel}
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            width: 68,
                            height: 68,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.14)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            color: "#fff",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.28)",
                          }}
                        >
                          <Play size={26} fill="currentColor" />
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: 22, textAlign: rootAlign }}>
                      <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 900 }}>{title}</h3>
                      <p style={{ margin: "0 0 18px", color: colors.textSoft, lineHeight: 1.9 }}>{text}</p>

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          color: colors.gold,
                          fontWeight: 900,
                        }}
                      >
                        {t.watchEpisode}
                        <ExternalLink size={16} />
                      </span>
                    </div>
                  </a>
                </HoverCard>
              );
            })}
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
            {liveServices.map((service) => (
              <HoverCard
                key={service.id}
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
                  {getServiceIcon(service.icon)}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 900 }}>
                  {localize(lang, service.titleAr, service.titleEn, service.titleDe)}
                </h3>
                <p style={{ margin: 0, color: colors.textSoft, lineHeight: 1.85, fontSize: 14 }}>
                  {localize(lang, service.descAr, service.descEn, service.descDe)}
                </p>
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
            {liveGallery.map((img, index) => (
              <HoverCard
                key={img.id}
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
                  onClick={() => openLightbox(allGalleryImages, index, t.galleryTitle)}
                  style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
                  aria-label={`${t.openImage} ${index + 1}`}
                >
                  <div className="zoom-wrap shine">
                    <img
                      className="zoom-img"
                      src={img.imageUrl}
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
                  title={localize(lang, "واتساب", "WhatsApp", "WhatsApp")}
                  subtitle={t.openNow}
                  accentColor="#25D366"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.facebookLink}
                  icon={<FacebookIcon size={20} />}
                  title={t.facebookLabel}
                  subtitle={t.openNow}
                  accentColor="#1877F2"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.instagramLink}
                  icon={<Instagram size={20} />}
                  title={t.instagramLabel}
                  subtitle={t.openNow}
                  accentColor="#E1306C"
                  colors={colors}
                />

                <SocialLinkCard
                  href={siteSettings.tiktokLink}
                  icon={<TikTokIcon size={20} />}
                  title={t.tiktokLabel}
                  subtitle={t.openNow}
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
                <NavLink to={CLASSES_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navClasses}
                </NavLink>
                <NavLink to={BOOKING_PATH} style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navBooking}
                </NavLink>
                <a href="#gallery" style={{ color: colors.textSoft, textDecoration: "none", fontSize: 14 }}>
                  {t.navGallery}
                </a>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <h3 style={{ margin: "0 0 16px", color: colors.gold, fontSize: 17 }}>{t.footerServices}</h3>
              <div style={{ display: "grid", gap: 12, color: colors.textSoft, fontSize: 14 }}>
                <span>{localize(lang, "التدريب الأونلاين", "Online Coaching", "Online-Coaching")}</span>
                <span>{localize(lang, "البرامج الغذائية", "Nutrition Programs", "Ernährungsprogramme")}</span>
                <span>{localize(lang, "تحضير البطولات", "Competition Prep", "Wettkampfvorbereitung")}</span>
                <span>{localize(lang, "ورش وكورسات", "Courses & Workshops", "Kurse & Workshops")}</span>
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
                      <Instagram size={18} />
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
                  {localize(lang, "تم التطوير بواسطة", "Developed by", "Entwickelt von")}
                </span>
                <span style={{ color: colors.gold, fontWeight: 900, fontSize: 15 }}>
                  {siteSettings.developerName || defaultSiteSettings.developerName}
                </span>
                <span style={{ color: colors.textMuted, fontSize: 12 }}>
                  {localize(lang, "برمجة وتطوير واجهات", "Frontend & Web Development", "Frontend- & Webentwicklung")}
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
                {localize(lang, "واتساب المطور", "Developer WhatsApp", "WhatsApp des Entwicklers")}
              </a>
            </div>

            <span>{t.footerTag1}</span>
          </div>
        </div>
      </footer>

      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: colors.modalOverlay,
            zIndex: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            style={{
              position: "absolute",
              top: 20,
              [isAr ? "left" : "right"]: 20,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.12)`,
              background: colors.modalButtonBg,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.12)`,
              background: colors.modalButtonBg,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.12)`,
              background: colors.modalButtonBg,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowRight size={20} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1000px, 92vw)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
            }}
          >
            <img
              src={lightbox.images[lightbox.index]}
              alt={lightbox.title}
              style={{
                width: "100%",
                maxHeight: "78vh",
                objectFit: "contain",
                borderRadius: 24,
                display: "block",
              }}
            />

            <div style={{ color: "#fff", textAlign: "center", fontWeight: 800 }}>
              {lightbox.title} · {lightbox.index + 1}/{lightbox.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}