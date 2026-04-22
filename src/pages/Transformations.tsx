import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Globe,
  MessageCircle,
  Moon,
  Sun,
  Tv,
  X,
  ZoomIn,
} from "lucide-react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ROUTE_PATHS } from "@/lib/index";
import { db } from "@/lib/firebase";

type Lang = "ar" | "en" | "de";
type ThemeMode = "dark" | "light";
type GalleryCategory = "fatLoss" | "transformation" | "competition";

type GalleryItem = {
  id: string;
  category: GalleryCategory;
  imageUrl: string;
  titleAr: string;
  titleEn: string;
  titleDe: string;
  subtitleAr: string;
  subtitleEn: string;
  subtitleDe: string;
  sortOrder: number;
  isActive: boolean;
};

type TransformationsContent = {
  pageTitleAr: string;
  pageTitleEn: string;
  pageTitleDe: string;
  pageTextAr: string;
  pageTextEn: string;
  pageTextDe: string;

  fatLossLabelAr: string;
  fatLossLabelEn: string;
  fatLossLabelDe: string;

  transformationLabelAr: string;
  transformationLabelEn: string;
  transformationLabelDe: string;

  competitionLabelAr: string;
  competitionLabelEn: string;
  competitionLabelDe: string;

  footerTextAr: string;
  footerTextEn: string;
  footerTextDe: string;

  footerNoteAr: string;
  footerNoteEn: string;
  footerNoteDe: string;
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

const defaultTransformationsContent: TransformationsContent = {
  pageTitleAr: "التحولات والنتائج",
  pageTitleEn: "Transformations & Results",
  pageTitleDe: "Transformationen & Ergebnisse",

  pageTextAr: "نتائج التخسيس، تحولات الجسم، وتحضير البطولات في عرض واضح ومنظم.",
  pageTextEn:
    "Fat loss results, body transformations, and competition prep in a clean organized layout.",
  pageTextDe:
    "Ergebnisse bei Fettabbau, Körpertransformationen und Wettkampfvorbereitung in einem klaren, organisierten Layout.",

  fatLossLabelAr: "نتائج التخسيس",
  fatLossLabelEn: "Fat Loss",
  fatLossLabelDe: "Fettabbau",

  transformationLabelAr: "تحولات الجسم",
  transformationLabelEn: "Transformations",
  transformationLabelDe: "Transformationen",

  competitionLabelAr: "تحضير البطولات",
  competitionLabelEn: "Competition Prep",
  competitionLabelDe: "Wettkampfvorbereitung",

  footerTextAr: "عرض منظم وواضح لنتائج التخسيس وتحولات الجسم وتحضير البطولات.",
  footerTextEn:
    "A clean presentation for fat loss results, body transformations, and competition prep.",
  footerTextDe:
    "Eine saubere Darstellung von Fettabbau-Ergebnissen, Körpertransformationen und Wettkampfvorbereitung.",

  footerNoteAr: "تصميم بسيط وواضح لعرض النتائج",
  footerNoteEn: "Clean and clear results presentation",
  footerNoteDe: "Klare und übersichtliche Darstellung der Ergebnisse",
};

const defaultSiteSettings: SiteSettings = {
  whatsappNumber: "201027570204",
  whatsappMessageAr:
    "مرحبا، أريد الاستفسار عن نتائج التحولات وخدمة التدريب الأونلاين",
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

const fallbackImages: Record<GalleryCategory, GalleryItem[]> = {
  fatLoss: [
    {
      id: "fat-1",
      category: "fatLoss",
      imageUrl: "/IMAGE/be15.jpeg",
      titleAr: "نتيجة تخسيس 1",
      titleEn: "Fat Loss 1",
      titleDe: "Fettabbau 1",
      subtitleAr: "تحسن واضح",
      subtitleEn: "Clear improvement",
      subtitleDe: "Klare Verbesserung",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "fat-2",
      category: "fatLoss",
      imageUrl: "/IMAGE/be14.jpeg",
      titleAr: "نتيجة تخسيس 2",
      titleEn: "Fat Loss 2",
      titleDe: "Fettabbau 2",
      subtitleAr: "نزول دهون",
      subtitleEn: "Fat reduction",
      subtitleDe: "Weniger Körperfett",
      sortOrder: 2,
      isActive: true,
    },
    {
      id: "fat-3",
      category: "fatLoss",
      imageUrl: "/IMAGE/be2.jpeg",
      titleAr: "نتيجة تخسيس 3",
      titleEn: "Fat Loss 3",
      titleDe: "Fettabbau 3",
      subtitleAr: "فرق حقيقي",
      subtitleEn: "Real difference",
      subtitleDe: "Echter Unterschied",
      sortOrder: 3,
      isActive: true,
    },
    {
      id: "fat-4",
      category: "fatLoss",
      imageUrl: "/IMAGE/be11.jpeg",
      titleAr: "نتيجة تخسيس 4",
      titleEn: "Fat Loss 4",
      titleDe: "Fettabbau 4",
      subtitleAr: "تطور ممتاز",
      subtitleEn: "Strong progress",
      subtitleDe: "Starke Entwicklung",
      sortOrder: 4,
      isActive: true,
    },
  ],
  transformation: [
    {
      id: "tr-1",
      category: "transformation",
      imageUrl: "/IMAGE/be1.jpeg",
      titleAr: "تحول 1",
      titleEn: "Transformation 1",
      titleDe: "Transformation 1",
      subtitleAr: "تحول كامل",
      subtitleEn: "Full transformation",
      subtitleDe: "Komplette Transformation",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "tr-2",
      category: "transformation",
      imageUrl: "/IMAGE/be3.jpeg",
      titleAr: "تحول 2",
      titleEn: "Transformation 2",
      titleDe: "Transformation 2",
      subtitleAr: "تغيير واضح",
      subtitleEn: "Visible change",
      subtitleDe: "Sichtbare Veränderung",
      sortOrder: 2,
      isActive: true,
    },
    {
      id: "tr-3",
      category: "transformation",
      imageUrl: "/IMAGE/be6.jpeg",
      titleAr: "تحول 3",
      titleEn: "Transformation 3",
      titleDe: "Transformation 3",
      subtitleAr: "نتيجة قوية",
      subtitleEn: "Strong result",
      subtitleDe: "Starkes Ergebnis",
      sortOrder: 3,
      isActive: true,
    },
    {
      id: "tr-4",
      category: "transformation",
      imageUrl: "/IMAGE/be9.jpeg",
      titleAr: "تحول 4",
      titleEn: "Transformation 4",
      titleDe: "Transformation 4",
      subtitleAr: "مستوى أفضل",
      subtitleEn: "Better shape",
      subtitleDe: "Bessere Form",
      sortOrder: 4,
      isActive: true,
    },
    {
      id: "tr-5",
      category: "transformation",
      imageUrl: "/IMAGE/be12.jpeg",
      titleAr: "تحول 5",
      titleEn: "Transformation 5",
      titleDe: "Transformation 5",
      subtitleAr: "فرق واضح",
      subtitleEn: "Clear difference",
      subtitleDe: "Klarer Unterschied",
      sortOrder: 5,
      isActive: true,
    },
    {
      id: "tr-6",
      category: "transformation",
      imageUrl: "/IMAGE/be13.jpeg",
      titleAr: "تحول 6",
      titleEn: "Transformation 6",
      titleDe: "Transformation 6",
      subtitleAr: "تطور شامل",
      subtitleEn: "Complete progress",
      subtitleDe: "Umfassender Fortschritt",
      sortOrder: 6,
      isActive: true,
    },
  ],
  competition: [
    {
      id: "comp-1",
      category: "competition",
      imageUrl: "/IMAGE/b15.jpeg",
      titleAr: "بطولة 1",
      titleEn: "Prep 1",
      titleDe: "Vorbereitung 1",
      subtitleAr: "فورمة تنافسية",
      subtitleEn: "Competitive shape",
      subtitleDe: "Wettkampfform",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "comp-2",
      category: "competition",
      imageUrl: "/IMAGE/be16.jpeg",
      titleAr: "بطولة 2",
      titleEn: "Prep 2",
      titleDe: "Vorbereitung 2",
      subtitleAr: "تفاصيل أعلى",
      subtitleEn: "Sharper condition",
      subtitleDe: "Schärfere Form",
      sortOrder: 2,
      isActive: true,
    },
    {
      id: "comp-3",
      category: "competition",
      imageUrl: "/IMAGE/be17.jpeg",
      titleAr: "بطولة 3",
      titleEn: "Prep 3",
      titleDe: "Vorbereitung 3",
      subtitleAr: "جاهزية ممتازة",
      subtitleEn: "Strong readiness",
      subtitleDe: "Sehr gute Bereitschaft",
      sortOrder: 3,
      isActive: true,
    },
    {
      id: "comp-4",
      category: "competition",
      imageUrl: "/IMAGE/be18.jpeg",
      titleAr: "بطولة 4",
      titleEn: "Prep 4",
      titleDe: "Vorbereitung 4",
      subtitleAr: "تحضير قوي",
      subtitleEn: "Strong prep",
      subtitleDe: "Starke Vorbereitung",
      sortOrder: 4,
      isActive: true,
    },
  ],
};

function BrandLogo({
  colors,
  size = 50,
}: {
  colors: { gold: string; goldSoft: string; border: string; glow: string };
  size?: number;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 18,
        background: `linear-gradient(135deg, ${colors.goldSoft}, rgba(255,255,255,0.02))`,
        border: `1px solid ${colors.border}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.gold,
        boxShadow: colors.glow,
        fontWeight: 900,
        fontSize: size * 0.34,
        flexShrink: 0,
      }}
    >
      AE
    </span>
  );
}

export default function Transformations() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("transformation");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const [transformationsContent, setTransformationsContent] =
    useState<TransformationsContent>(defaultTransformationsContent);
  const [siteSettings, setSiteSettings] =
    useState<SiteSettings>(defaultSiteSettings);
  const [adminImages, setAdminImages] = useState<GalleryItem[]>([]);

  const isAr = lang === "ar";
  const isEn = lang === "en";
  const isDark = theme === "dark";
  const isMobile = viewportWidth < 768;

  const colors = useMemo(
    () => ({
      bg: isDark ? "#07090d" : "#f7f2ea",
      bgSoft: isDark ? "#0f141c" : "#fffaf4",
      bgCard: isDark ? "#121923" : "#ffffff",
      section: isDark ? "#0b1017" : "#f2e8da",
      text: isDark ? "#f7f2ea" : "#171717",
      textSoft: isDark ? "rgba(247,242,234,0.78)" : "rgba(23,23,23,0.72)",
      textMuted: isDark ? "rgba(247,242,234,0.56)" : "rgba(23,23,23,0.54)",
      gold: "#d4a63f",
      goldSoft: isDark ? "rgba(212,166,63,0.10)" : "rgba(212,166,63,0.14)",
      border: isDark ? "rgba(212,166,63,0.12)" : "rgba(212,166,63,0.18)",
      shadow: isDark
        ? "0 18px 50px rgba(0,0,0,0.30)"
        : "0 14px 34px rgba(0,0,0,0.07)",
      glow: isDark
        ? "0 0 0 1px rgba(212,166,63,0.06), 0 16px 40px rgba(0,0,0,0.24)"
        : "0 0 0 1px rgba(212,166,63,0.10), 0 12px 30px rgba(0,0,0,0.06)",
      headerBg: isDark ? "rgba(7,9,13,0.86)" : "rgba(255,255,255,0.88)",
      heroButton: "linear-gradient(135deg, #d4a63f, #f0ca6b)",
      modalOverlay: "rgba(5, 7, 11, 0.94)",
      modalButtonBg: "rgba(255,255,255,0.08)",
      whatsappGlow: "0 12px 38px rgba(37, 211, 102, 0.28)",
    }),
    [isDark]
  );

  const t = useMemo(() => {
    if (isAr) {
      return {
        brand: "د. أشرف العبد",
        brandSub: "تحولات ونتائج",
        home: "الرئيسية",
        about: "نبذة عني",
        classes: "الكلاسات",
        transformations: "التحولات",
        booking: "الحجز",
        title:
          transformationsContent.pageTitleAr ||
          defaultTransformationsContent.pageTitleAr,
        subtitle:
          transformationsContent.pageTextAr ||
          defaultTransformationsContent.pageTextAr,
        fatLoss:
          transformationsContent.fatLossLabelAr ||
          defaultTransformationsContent.fatLossLabelAr,
        transformation:
          transformationsContent.transformationLabelAr ||
          defaultTransformationsContent.transformationLabelAr,
        competition:
          transformationsContent.competitionLabelAr ||
          defaultTransformationsContent.competitionLabelAr,
        openImage: "فتح الصورة",
        whatsapp: "تواصل واتساب",
        rights: "جميع الحقوق محفوظة © د. أشرف العبد",
        developerCredit: `تمت البرمجة بواسطة ${
          siteSettings.developerName || defaultSiteSettings.developerName
        }`,
        footerNote:
          transformationsContent.footerNoteAr ||
          defaultTransformationsContent.footerNoteAr,
        footerText:
          transformationsContent.footerTextAr ||
          defaultTransformationsContent.footerTextAr,
        footerQuick: "روابط سريعة",
        footerContact: "تواصل",
        langArabic: "العربية",
        langEnglish: "English",
        langGerman: "Deutsch",
        next: "التالي",
        prev: "السابق",
        close: "إغلاق",
        swipeHint: "اسحب للتنقل بين الصور",
        themeLight: "فاتح",
        themeDark: "ليلي",
        noImages: "لا توجد صور مضافة في هذا القسم حالياً.",
      };
    }

    if (isEn) {
      return {
        brand: "Dr. Ashraf El Abd",
        brandSub: "Transformations & Results",
        home: "Home",
        about: "About",
        classes: "Classes",
        transformations: "Transformations",
        booking: "Booking",
        title:
          transformationsContent.pageTitleEn ||
          defaultTransformationsContent.pageTitleEn,
        subtitle:
          transformationsContent.pageTextEn ||
          defaultTransformationsContent.pageTextEn,
        fatLoss:
          transformationsContent.fatLossLabelEn ||
          defaultTransformationsContent.fatLossLabelEn,
        transformation:
          transformationsContent.transformationLabelEn ||
          defaultTransformationsContent.transformationLabelEn,
        competition:
          transformationsContent.competitionLabelEn ||
          defaultTransformationsContent.competitionLabelEn,
        openImage: "Open Image",
        whatsapp: "WhatsApp",
        rights: "All rights reserved © Dr. Ashraf El Abd",
        developerCredit: `Developed by ${
          siteSettings.developerName || defaultSiteSettings.developerName
        }`,
        footerNote:
          transformationsContent.footerNoteEn ||
          defaultTransformationsContent.footerNoteEn,
        footerText:
          transformationsContent.footerTextEn ||
          defaultTransformationsContent.footerTextEn,
        footerQuick: "Quick Links",
        footerContact: "Contact",
        langArabic: "العربية",
        langEnglish: "English",
        langGerman: "Deutsch",
        next: "Next",
        prev: "Previous",
        close: "Close",
        swipeHint: "Swipe to navigate",
        themeLight: "Light",
        themeDark: "Dark",
        noImages: "No images added to this section yet.",
      };
    }

    return {
      brand: "Dr. Ashraf El Abd",
      brandSub: "Transformationen & Ergebnisse",
      home: "Startseite",
      about: "Über mich",
      classes: "Kurse",
      transformations: "Transformationen",
      booking: "Buchung",
      title:
        transformationsContent.pageTitleDe ||
        defaultTransformationsContent.pageTitleDe,
      subtitle:
        transformationsContent.pageTextDe ||
        defaultTransformationsContent.pageTextDe,
      fatLoss:
        transformationsContent.fatLossLabelDe ||
        defaultTransformationsContent.fatLossLabelDe,
      transformation:
        transformationsContent.transformationLabelDe ||
        defaultTransformationsContent.transformationLabelDe,
      competition:
        transformationsContent.competitionLabelDe ||
        defaultTransformationsContent.competitionLabelDe,
      openImage: "Bild öffnen",
      whatsapp: "WhatsApp",
      rights: "Alle Rechte vorbehalten © Dr. Ashraf El Abd",
      developerCredit: `Entwickelt von ${
        siteSettings.developerName || defaultSiteSettings.developerName
      }`,
      footerNote:
        transformationsContent.footerNoteDe ||
        defaultTransformationsContent.footerNoteDe,
      footerText:
        transformationsContent.footerTextDe ||
        defaultTransformationsContent.footerTextDe,
      footerQuick: "Schnellzugriffe",
      footerContact: "Kontakt",
      langArabic: "العربية",
      langEnglish: "English",
      langGerman: "Deutsch",
      next: "Weiter",
      prev: "Zurück",
      close: "Schließen",
      swipeHint: "Wischen zum Navigieren",
      themeLight: "Hell",
      themeDark: "Dunkel",
      noImages: "In diesem Bereich wurden noch keine Bilder hinzugefügt.",
    };
  }, [isAr, isEn, transformationsContent, siteSettings]);

  const whatsappLink = useMemo(
    () =>
      `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
        siteSettings.whatsappMessageAr ||
          defaultSiteSettings.whatsappMessageAr
      )}`,
    [siteSettings]
  );

  const developerWhatsapp = useMemo(
    () =>
      `https://wa.me/${siteSettings.developerPhone}?text=${encodeURIComponent(
        siteSettings.developerWhatsAppMessage ||
          defaultSiteSettings.developerWhatsAppMessage
      )}`,
    [siteSettings]
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const unsubContent = onSnapshot(
      doc(db, "siteContent", "transformations"),
      (snapshot) => {
        if (!snapshot.exists()) return;
        setTransformationsContent({
          ...defaultTransformationsContent,
          ...(snapshot.data() as Partial<TransformationsContent>),
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

    const unsubImages = onSnapshot(
      collection(db, "transformations"),
      (snapshot) => {
        const data: GalleryItem[] = snapshot.docs
          .map((docSnap) => {
            const item = docSnap.data() as Omit<GalleryItem, "id">;
            return {
              id: docSnap.id,
              category:
                item.category === "fatLoss" ||
                item.category === "transformation" ||
                item.category === "competition"
                  ? item.category
                  : "transformation",
              imageUrl: item.imageUrl || "",
              titleAr: item.titleAr || "",
              titleEn: item.titleEn || "",
              titleDe: item.titleDe || "",
              subtitleAr: item.subtitleAr || "",
              subtitleEn: item.subtitleEn || "",
              subtitleDe: item.subtitleDe || "",
              sortOrder: Number(item.sortOrder || 1),
              isActive: Boolean(item.isActive),
            };
          })
          .filter((item) => item.isActive && item.imageUrl)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        setAdminImages(data);
      },
      () => {}
    );

    return () => {
      unsubContent();
      unsubSettings();
      unsubImages();
    };
  }, []);

  const galleryMap = useMemo<Record<GalleryCategory, GalleryItem[]>>(() => {
    const grouped: Record<GalleryCategory, GalleryItem[]> = {
      fatLoss: [],
      transformation: [],
      competition: [],
    };

    adminImages.forEach((item) => {
      grouped[item.category].push(item);
    });

    return {
      fatLoss: grouped.fatLoss.length ? grouped.fatLoss : fallbackImages.fatLoss,
      transformation: grouped.transformation.length
        ? grouped.transformation
        : fallbackImages.transformation,
      competition: grouped.competition.length
        ? grouped.competition
        : fallbackImages.competition,
    };
  }, [adminImages]);

  const currentImages = galleryMap[activeCategory] || [];
  const activeImage =
    activeImageIndex !== null && currentImages[activeImageIndex]
      ? currentImages[activeImageIndex]
      : null;

  const getItemTitle = (item: GalleryItem) => {
    if (isAr) return item.titleAr;
    if (isEn) return item.titleEn;
    return item.titleDe;
  };

  const getItemSubtitle = (item: GalleryItem) => {
    if (isAr) return item.subtitleAr;
    if (isEn) return item.subtitleEn;
    return item.subtitleDe;
  };

  const openImage = (index: number) => setActiveImageIndex(index);

  const closeLightbox = () => {
    setActiveImageIndex(null);
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const showNextImage = () => {
    if (!currentImages.length) return;
    setActiveImageIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % currentImages.length;
    });
  };

  const showPrevImage = () => {
    if (!currentImages.length) return;
    setActiveImageIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + currentImages.length) % currentImages.length;
    });
  };

  useEffect(() => {
    setActiveImageIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    if (activeImageIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") {
        if (isAr) showPrevImage();
        else showNextImage();
      }
      if (event.key === "ArrowLeft") {
        if (isAr) showNextImage();
        else showPrevImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImageIndex, isAr, currentImages.length]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      showNextImage();
    } else {
      showPrevImage();
    }
  };

  const HOME_PATH = ROUTE_PATHS?.HOME ?? "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT ?? "/about";
  const CLASSES_PATH = ROUTE_PATHS?.CLASSES ?? "/classes";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING ?? "/booking";
  const TRANSFORMATIONS_PATH =
    ROUTE_PATHS?.TRANSFORMATIONS ?? "/transformations";

  const navLinkBase = ({ isActive }: { isActive: boolean }) =>
    ({
      color: isActive ? colors.gold : colors.text,
      textDecoration: "none",
      fontWeight: 800,
      fontSize: 14,
      padding: "10px 14px",
      borderRadius: 14,
      transition: "0.25s ease",
      background: isActive ? colors.goldSoft : "transparent",
      border: `1px solid ${isActive ? colors.border : "transparent"}`,
      whiteSpace: "nowrap",
    }) as const;

  const rootAlign = isAr ? "right" : "left";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: "Cairo, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 120,
          background: colors.headerBg,
          backdropFilter: "blur(18px)",
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
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
            }}
          >
            <BrandLogo colors={colors} />
            <div>
              <div style={{ color: colors.gold, fontWeight: 900, fontSize: 20 }}>
                {t.brand}
              </div>
              <div style={{ color: colors.textMuted, fontSize: 12 }}>
                {t.brandSub}
              </div>
            </div>
          </NavLink>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
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
            <NavLink to={TRANSFORMATIONS_PATH} style={navLinkBase}>
              {t.transformations}
            </NavLink>
            <NavLink to={BOOKING_PATH} style={navLinkBase}>
              {t.booking}
            </NavLink>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                style={{
                  height: 42,
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
              style={{
                height: 42,
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
          width: 58,
          height: 58,
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

      <section style={{ padding: isMobile ? "40px 14px" : "64px 20px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: isMobile ? "2rem" : "3rem",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              margin: "0 auto",
              maxWidth: 760,
              color: colors.textSoft,
              lineHeight: 1.9,
              fontSize: isMobile ? 14 : 16,
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 14px 28px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {([
            { key: "fatLoss", label: t.fatLoss },
            { key: "transformation", label: t.transformation },
            { key: "competition", label: t.competition },
          ] as const).map((tab) => {
            const active = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                style={{
                  border: `1px solid ${active ? colors.gold : colors.border}`,
                  background: active ? colors.goldSoft : colors.bgSoft,
                  color: active ? colors.gold : colors.text,
                  borderRadius: 16,
                  padding: "12px 18px",
                  fontWeight: 800,
                  cursor: "pointer",
                  minWidth: isMobile ? 160 : 190,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      <section id="gallery" style={{ padding: isMobile ? "0 14px 70px" : "0 20px 90px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {currentImages.length === 0 ? (
              <div
                style={{
                  gridColumn: "1 / -1",
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 24,
                  padding: 28,
                  boxShadow: colors.shadow,
                  textAlign: "center",
                  color: colors.textMuted,
                }}
              >
                {t.noImages}
              </div>
            ) : (
              currentImages.map((item, index) => (
                <button
                  key={`${activeCategory}-${item.id}-${index}`}
                  onClick={() => openImage(index)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "block",
                  }}
                >
                  <div
                    style={{
                      background: colors.bgCard,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 24,
                      overflow: "hidden",
                      boxShadow: colors.shadow,
                      transition: "transform 0.28s ease, box-shadow 0.28s ease",
                    }}
                  >
                    <div
                      style={{
                        height: isMobile ? 360 : 340,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={getItemTitle(item)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.35s ease",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.56))",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          [isAr ? "left" : "right"]: 14,
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.14)",
                          border: "1px solid rgba(255,255,255,0.16)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <ZoomIn size={18} />
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          left: 16,
                          right: 16,
                          bottom: 16,
                          color: "#fff",
                          textAlign: isAr ? "right" : "left",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 900,
                            fontSize: 20,
                            marginBottom: 4,
                          }}
                        >
                          {getItemTitle(item)}
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.9 }}>
                          {getItemSubtitle(item)}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontWeight: 800, color: colors.text }}>
                        {t.openImage}
                      </span>

                      <span
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: colors.goldSoft,
                          color: colors.gold,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Camera size={17} />
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          background: colors.section,
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: isMobile ? "34px 14px 22px" : "44px 20px 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(3, minmax(220px, 1fr))",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div style={{ textAlign: rootAlign }}>
              <div
                style={{
                  color: colors.gold,
                  fontWeight: 900,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                {t.brand}
              </div>
              <p
                style={{
                  margin: 0,
                  color: colors.textSoft,
                  lineHeight: 1.9,
                  fontSize: 14,
                }}
              >
                {t.footerText}
              </p>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <div
                style={{
                  color: colors.gold,
                  fontWeight: 900,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                {t.footerQuick}
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <NavLink
                  to={HOME_PATH}
                  style={{ color: colors.textSoft, textDecoration: "none" }}
                >
                  {t.home}
                </NavLink>
                <NavLink
                  to={ABOUT_PATH}
                  style={{ color: colors.textSoft, textDecoration: "none" }}
                >
                  {t.about}
                </NavLink>
                <NavLink
                  to={CLASSES_PATH}
                  style={{ color: colors.textSoft, textDecoration: "none" }}
                >
                  {t.classes}
                </NavLink>
                <NavLink
                  to={BOOKING_PATH}
                  style={{ color: colors.textSoft, textDecoration: "none" }}
                >
                  {t.booking}
                </NavLink>
              </div>
            </div>

            <div style={{ textAlign: rootAlign }}>
              <div
                style={{
                  color: colors.gold,
                  fontWeight: 900,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                {t.footerContact}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
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
                  <Globe size={18} />
                </a>

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
                  <Camera size={18} />
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
                  <Tv size={18} />
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
                  padding: "12px 16px",
                  borderRadius: 14,
                  fontWeight: 900,
                }}
              >
                <MessageCircle size={16} />
                {t.whatsapp}
              </a>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${colors.border}`,
              paddingTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "column" : "row",
              gap: 10,
              color: colors.textMuted,
              fontSize: 13,
            }}
          >
            <span>{t.rights}</span>

            <div
              style={{
                textAlign: "center",
                width: isMobile ? "100%" : "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: colors.gold, fontWeight: 900 }}>
                {t.developerCredit}
              </span>

              <a
                href={developerWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#25D366",
                  fontWeight: 900,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <MessageCircle size={15} />
                {siteSettings.developerPhone || defaultSiteSettings.developerPhone}
              </a>
            </div>

            <span>{t.footerNote}</span>
          </div>
        </div>
      </footer>

      {activeImage && (
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
            padding: isMobile ? 12 : 24,
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
              position: "absolute",
              top: 18,
              [isAr ? "left" : "right"]: 18,
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: `1px solid ${colors.border}`,
              background: colors.modalButtonBg,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              zIndex: 2,
            }}
          >
            <X size={20} />
          </button>

          {!isMobile && (
            <>
              <button
                type="button"
                aria-label={t.prev}
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevImage();
                }}
                style={{
                  position: "absolute",
                  left: 18,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: `1px solid ${colors.border}`,
                  background: colors.modalButtonBg,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  zIndex: 2,
                }}
              >
                <ArrowLeft size={20} />
              </button>

              <button
                type="button"
                aria-label={t.next}
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                style={{
                  position: "absolute",
                  right: 18,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: `1px solid ${colors.border}`,
                  background: colors.modalButtonBg,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  zIndex: 2,
                }}
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              maxWidth: "min(1200px, 96vw)",
              maxHeight: "92vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              userSelect: "none",
              touchAction: "pan-y",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: 24,
                overflow: "hidden",
                border: `1px solid rgba(255,255,255,0.12)`,
                background: "#0d1117",
                boxShadow: "0 26px 80px rgba(0,0,0,0.48)",
                position: "relative",
              }}
            >
              <img
                src={activeImage.imageUrl}
                alt={getItemTitle(activeImage)}
                style={{
                  width: "100%",
                  maxHeight: isMobile ? "70vh" : "76vh",
                  objectFit: "contain",
                  display: "block",
                  background: "#090b10",
                }}
              />

              {isMobile && (
                <>
                  <button
                    type="button"
                    aria-label={t.prev}
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrevImage();
                    }}
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      border: `1px solid rgba(255,255,255,0.14)`,
                      background: "rgba(0,0,0,0.28)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    type="button"
                    aria-label={t.next}
                    onClick={(e) => {
                      e.stopPropagation();
                      showNextImage();
                    }}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      border: `1px solid rgba(255,255,255,0.14)`,
                      background: "rgba(0,0,0,0.28)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                color: "#fff",
                flexWrap: "wrap",
              }}
            >
              <div style={{ textAlign: isAr ? "right" : "left" }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>
                  {getItemTitle(activeImage)}
                </div>
                <div style={{ opacity: 0.78, fontSize: 13, marginTop: 4 }}>
                  {getItemSubtitle(activeImage)}
                </div>
              </div>

              <div style={{ fontWeight: 800, opacity: 0.88 }}>
                {activeImageIndex! + 1} / {currentImages.length}
              </div>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 12,
                fontWeight: 700,
                display: isMobile ? "block" : "none",
              }}
            >
              {t.swipeHint}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                overflowX: "auto",
                maxWidth: "100%",
                padding: "4px 2px",
              }}
            >
              {currentImages.map((thumb, index) => {
                const isActive = index === activeImageIndex;
                return (
                  <button
                    key={`${thumb.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    style={{
                      border: isActive
                        ? `2px solid ${colors.gold}`
                        : "1px solid rgba(255,255,255,0.16)",
                      background: "transparent",
                      padding: 0,
                      borderRadius: 16,
                      overflow: "hidden",
                      cursor: "pointer",
                      width: isMobile ? 72 : 88,
                      height: isMobile ? 72 : 88,
                      flex: "0 0 auto",
                      opacity: isActive ? 1 : 0.7,
                      boxShadow: isActive
                        ? `0 0 0 3px rgba(212,166,63,0.18)`
                        : "none",
                    }}
                  >
                    <img
                      src={thumb.imageUrl}
                      alt={getItemTitle(thumb)}
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
          </div>
        </div>
      )}
    </div>
  );
}