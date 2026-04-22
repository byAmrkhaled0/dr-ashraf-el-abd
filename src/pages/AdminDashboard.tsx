import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  ArrowRight,
  BookOpen,
  Crown,
  Dumbbell,
  ImagePlus,
  Images,
  Layers3,
  LogOut,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  WalletCards,
  X,
} from "lucide-react";
import { auth, db, storage } from "@/lib/firebase";

type AdminPage = "classes" | "booking" | "transformations";
type PackageCategory = "online" | "recovery" | "courses";
type TransformationCategory = "fatLoss" | "transformation" | "competition";

type PackageItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  titleDe: string;
  subtitleAr: string;
  subtitleEn: string;
  subtitleDe: string;
  price: number;
  currency: string;
  periodAr: string;
  periodEn: string;
  periodDe: string;
  featuresAr: string[];
  featuresEn: string[];
  featuresDe: string[];
  category: PackageCategory;
  badge: string;
  imageUrl: string;
  imagePath: string;
  sortOrder: number;
  isActive: boolean;
};

type BookingPackageItem = {
  id: string;
  nameAr: string;
  nameEn: string;
  nameDe: string;
  price: number;
  oldPrice: number | null;
  currency: string;
  priceNoteAr: string;
  priceNoteEn: string;
  priceNoteDe: string;
  featuresAr: string[];
  featuresEn: string[];
  featuresDe: string[];
  badgeAr: string;
  badgeEn: string;
  badgeDe: string;
  isPopular: boolean;
  sortOrder: number;
  isActive: boolean;
};

type TransformationImageItem = {
  id: string;
  category: TransformationCategory;
  imageUrl: string;
  imagePath: string;
  titleAr: string;
  titleEn: string;
  titleDe: string;
  subtitleAr: string;
  subtitleEn: string;
  subtitleDe: string;
  sortOrder: number;
  isActive: boolean;
};

type PackageFormState = {
  titleAr: string;
  subtitleAr: string;
  price: string;
  currency: string;
  periodAr: string;
  featuresAr: string;
  category: PackageCategory;
  badge: string;
  imageUrl: string;
  imagePath: string;
  sortOrder: string;
  isActive: boolean;
};

type BookingPackageFormState = {
  nameAr: string;
  price: string;
  oldPrice: string;
  currency: string;
  priceNoteAr: string;
  featuresAr: string;
  badgeAr: string;
  isPopular: boolean;
  sortOrder: string;
  isActive: boolean;
};

type TransformationFormState = {
  titleAr: string;
  subtitleAr: string;
  category: TransformationCategory;
  imageUrl: string;
  imagePath: string;
  sortOrder: string;
  isActive: boolean;
};

const defaultPackageForm: PackageFormState = {
  titleAr: "",
  subtitleAr: "",
  price: "",
  currency: "ج",
  periodAr: "",
  featuresAr: "",
  category: "online",
  badge: "",
  imageUrl: "",
  imagePath: "",
  sortOrder: "1",
  isActive: true,
};

const defaultBookingForm: BookingPackageFormState = {
  nameAr: "",
  price: "",
  oldPrice: "",
  currency: "ج",
  priceNoteAr: "",
  featuresAr: "",
  badgeAr: "",
  isPopular: false,
  sortOrder: "1",
  isActive: true,
};

const defaultImageForm: TransformationFormState = {
  titleAr: "",
  subtitleAr: "",
  category: "transformation",
  imageUrl: "",
  imagePath: "",
  sortOrder: "1",
  isActive: true,
};

function parseLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function toTextLines(value?: string[]) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((a, b) => Number(a.sortOrder || 999) - Number(b.sortOrder || 999));
}

function normalizePackageCategory(value: string): PackageCategory {
  if (["recovery", "recovery-performance", "recovery_performance"].includes(value)) {
    return "recovery";
  }
  if (["courses", "courses-bootcamps", "courses_bootcamps"].includes(value)) {
    return "courses";
  }
  return "online";
}

function normalizeTransformationCategory(value: string): TransformationCategory {
  if (value === "fatLoss") return "fatLoss";
  if (value === "competition") return "competition";
  return "transformation";
}

async function uploadFileToStorage(file: File, folder: string) {
  const path = `${folder}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return {
    path,
    url: await getDownloadURL(storageRef),
  };
}

function pageTitle(page: AdminPage) {
  if (page === "classes") return "صفحة الكلاسات";
  if (page === "booking") return "صفحة الحجز";
  return "صفحة التحولات";
}

function packageCategoryLabel(category: PackageCategory) {
  if (category === "online") return "أونلاين";
  if (category === "recovery") return "جلسات / ريكافري";
  return "كورسات";
}

function transformationCategoryLabel(category: TransformationCategory) {
  if (category === "fatLoss") return "نتائج التخسيس";
  if (category === "competition") return "تحضير البطولات";
  return "تحولات الجسم";
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#eef2ef",
        color: "#17211d",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function TopBar({
  email,
  activePage,
  onChangePage,
  onLogout,
}: {
  email?: string | null;
  activePage: AdminPage;
  onChangePage: (page: AdminPage) => void;
  onLogout: () => void;
}) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(15,118,110,0.10)",
      }}
    >
      <div
        style={{
          maxWidth: 1460,
          margin: "0 auto",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 22,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #0f9b8e, #0b7b71)",
              color: "white",
              boxShadow: "0 16px 30px rgba(15,155,142,0.22)",
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>لوحة التحكم — بنفس لون الموقع</div>
            <div style={{ color: "#6c7c76", marginTop: 4 }}>
              تحكم مباشر في صفحة الكلاسات، صفحة الحجز، وصفحة التحولات.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => onChangePage("classes")} style={tabButtonStyle(activePage === "classes")}> 
              <Layers3 size={16} /> الكلاسات
            </button>
            <button onClick={() => onChangePage("booking")} style={tabButtonStyle(activePage === "booking")}> 
              <WalletCards size={16} /> الحجز
            </button>
            <button onClick={() => onChangePage("transformations")} style={tabButtonStyle(activePage === "transformations")}> 
              <Images size={16} /> التحولات
            </button>
          </div>

          {email ? (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: "white",
                border: "1px solid rgba(15,118,110,0.10)",
                color: "#49635b",
                fontWeight: 700,
              }}
            >
              {email}
            </div>
          ) : null}

          <button onClick={onLogout} style={ghostButtonStyle()}>
            <LogOut size={16} /> خروج
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #ffffff, #f6fbfa)",
        border: "1px solid rgba(15,118,110,0.08)",
        borderRadius: 34,
        padding: 26,
        boxShadow: "0 14px 38px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 900 }}>{title}</h1>
          <p style={{ margin: "8px 0 0", color: "#6c7c76", lineHeight: 1.9 }}>{subtitle}</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <InfoChip>ستايل الموقع</InfoChip>
          <InfoChip>كروت مباشرة</InfoChip>
          <InfoChip>إضافة / تعديل / حذف</InfoChip>
        </div>
      </div>
    </section>
  );
}

function Section({
  icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        background: "rgba(255,255,255,0.82)",
        border: "1px solid rgba(15,118,110,0.08)",
        borderRadius: 34,
        padding: 24,
        boxShadow: "0 14px 38px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              background: "#f1fbf8",
              color: "#0f9b8e",
              border: "1px solid rgba(15,118,110,0.12)",
            }}
          >
            {icon}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>{title}</h2>
            <p style={{ margin: "6px 0 0", color: "#74817d", lineHeight: 1.8 }}>{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SubSection({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{title}</div>
          <div style={{ color: "#7a8984", marginTop: 6 }}>{subtitle}</div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function InfoChip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#f4faf8",
        border: "1px solid rgba(15,118,110,0.10)",
        color: "#507068",
        borderRadius: 999,
        padding: "7px 12px",
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 20,
      }}
    >
      {children}
    </div>
  );
}

function AddCard({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 280,
        borderRadius: 30,
        border: "1px dashed rgba(15,118,110,0.28)",
        background: "#f7fcfb",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "grid", gap: 10, textAlign: "center" }}>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 18,
            margin: "0 auto",
            display: "grid",
            placeItems: "center",
            background: "#0f9b8e",
            color: "white",
          }}
        >
          <Plus size={28} />
        </div>
        <div style={{ fontWeight: 900, fontSize: 20 }}>{title}</div>
      </div>
    </button>
  );
}

function CardActions({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>{children}</div>;
}

function BookingCard({
  item,
  onEdit,
  onDelete,
}: {
  item: BookingPackageItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div style={siteCardStyle}>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <InfoChip>{item.priceNoteAr || "باقة"}</InfoChip>
          {item.badgeAr ? <InfoChip>{item.badgeAr}</InfoChip> : null}
        </div>

        <div style={{ fontSize: 28, fontWeight: 900, color: "#0f9b8e" }}>{item.nameAr || "اسم العرض"}</div>

        <div style={{ display: "grid", gap: 10 }}>
          <Row label="السعر" value={`${item.price || 0} ${item.currency || "ج"}`} />
          {item.oldPrice ? <Row label="السعر قبل الخصم" value={`${item.oldPrice} ${item.currency || "ج"}`} /> : null}
        </div>

        <div style={{ display: "grid", gap: 8, color: "#687571" }}>
          {item.featuresAr.slice(0, 5).map((feature, index) => (
            <div key={`${item.id}-${index}`}>{feature}</div>
          ))}
        </div>
      </div>

      <CardActions>
        <button onClick={onEdit} style={ghostButtonStyle()}>
          <Pencil size={15} /> تعديل
        </button>
        <button onClick={onDelete} style={dangerButtonStyle}>
          <Trash2 size={15} /> حذف العرض
        </button>
      </CardActions>
    </div>
  );
}

function PackageCard({
  item,
  onEdit,
  onDelete,
  onReplaceImage,
}: {
  item: PackageItem;
  onEdit: () => void;
  onDelete: () => void;
  onReplaceImage: () => void;
}) {
  return (
    <div style={siteCardStyle}>
      <div
        style={{
          height: 190,
          borderRadius: 22,
          backgroundColor: "#eff6f4",
          backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid rgba(15,118,110,0.08)",
          marginBottom: 16,
        }}
      />

      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 24, fontWeight: 900 }}>{item.titleAr || "اسم الباقة"}</div>
          <InfoChip>{packageCategoryLabel(item.category)}</InfoChip>
        </div>

        <div style={{ color: "#6f7c77", lineHeight: 1.8 }}>{item.subtitleAr || "وصف مختصر"}</div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#0f9b8e" }}>{item.price || 0}</div>
          <div style={{ color: "#61716b" }}>{item.currency || "ج"}</div>
          {item.periodAr ? <div style={{ color: "#92a09b" }}>{item.periodAr}</div> : null}
        </div>

        <div style={{ display: "grid", gap: 8, color: "#687571" }}>
          {item.featuresAr.slice(0, 5).map((feature, index) => (
            <div key={`${item.id}-${index}`}>{feature}</div>
          ))}
        </div>
      </div>

      <CardActions>
        <button onClick={onEdit} style={ghostButtonStyle()}>
          <Pencil size={15} /> تعديل
        </button>
        <button onClick={onReplaceImage} style={ghostButtonStyle()}>
          <ImagePlus size={15} /> تبديل صورة
        </button>
        <button onClick={onDelete} style={dangerButtonStyle}>
          <Trash2 size={15} /> حذف الباقة
        </button>
      </CardActions>
    </div>
  );
}

function ImageCard({
  item,
  onEdit,
  onDelete,
  onReplaceImage,
}: {
  item: TransformationImageItem;
  onEdit: () => void;
  onDelete: () => void;
  onReplaceImage: () => void;
}) {
  return (
    <div style={siteCardStyle}>
      <div
        style={{
          height: 240,
          borderRadius: 22,
          backgroundColor: "#eff6f4",
          backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid rgba(15,118,110,0.08)",
          marginBottom: 16,
        }}
      />

      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{item.titleAr || "صورة"}</div>
          <InfoChip>{transformationCategoryLabel(item.category)}</InfoChip>
        </div>
        <div style={{ color: "#6f7c77", lineHeight: 1.8 }}>{item.subtitleAr || "وصف الصورة"}</div>
      </div>

      <CardActions>
        <button onClick={onEdit} style={ghostButtonStyle()}>
          <Pencil size={15} /> تعديل
        </button>
        <button onClick={onReplaceImage} style={ghostButtonStyle()}>
          <Upload size={15} /> رفع صورة جديدة
        </button>
        <button onClick={onDelete} style={dangerButtonStyle}>
          <Trash2 size={15} /> حذف الصورة
        </button>
      </CardActions>
    </div>
  );
}

function Drawer({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(14,20,18,0.35)",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{ flex: 1, border: "none", background: "transparent", cursor: "pointer" }}
      />
      <div
        dir="rtl"
        style={{
          width: "min(620px, 100%)",
          height: "100%",
          background: "#ffffff",
          borderInlineStart: "1px solid rgba(15,118,110,0.10)",
          boxShadow: "-14px 0 40px rgba(0,0,0,0.10)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: 20,
            position: "sticky",
            top: 0,
            background: "rgba(255,255,255,0.96)",
            borderBottom: "1px solid rgba(15,118,110,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 900 }}>{title}</div>
          <button onClick={onClose} style={ghostButtonStyle()}>
            <ArrowRight size={16} /> رجوع
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

function Input({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label style={{ fontWeight: 800, color: "#375b54" }}>{label}</label>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...inputStyle, minHeight: 120, resize: "vertical", ...(props.style || {}) }} />;
}

const inputStyle: CSSProperties = {
  width: "100%",
  minHeight: 48,
  borderRadius: 16,
  border: "1px solid rgba(15,118,110,0.12)",
  background: "#f8fcfb",
  padding: "12px 14px",
  outline: "none",
  fontFamily: "Cairo, sans-serif",
  color: "#16231f",
};

const siteCardStyle: CSSProperties = {
  background: "#fbfdfc",
  border: "1px solid rgba(15,118,110,0.08)",
  borderRadius: 30,
  padding: 22,
  boxShadow: "0 10px 26px rgba(0,0,0,0.04)",
  display: "grid",
  gap: 16,
};

function tabButtonStyle(active = false): CSSProperties {
  return {
    height: 44,
    padding: "0 16px",
    borderRadius: 16,
    border: active ? "none" : "1px solid rgba(15,118,110,0.12)",
    background: active ? "linear-gradient(135deg, #0f9b8e, #0b7b71)" : "#ffffff",
    color: active ? "white" : "#0f6f65",
    fontFamily: "Cairo, sans-serif",
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
  };
}

function ghostButtonStyle(block = false): CSSProperties {
  return {
    height: 44,
    width: block ? "100%" : undefined,
    padding: "0 16px",
    borderRadius: 16,
    border: "1px solid rgba(15,118,110,0.12)",
    background: "#ffffff",
    color: "#0f6f65",
    fontFamily: "Cairo, sans-serif",
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
  };
}

const primaryButtonStyle: CSSProperties = {
  height: 48,
  padding: "0 18px",
  borderRadius: 16,
  border: "none",
  background: "linear-gradient(135deg, #0f9b8e, #0b7b71)",
  color: "white",
  fontFamily: "Cairo, sans-serif",
  fontWeight: 900,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  cursor: "pointer",
};

const dangerButtonStyle: CSSProperties = {
  height: 44,
  padding: "0 16px",
  borderRadius: 16,
  border: "none",
  background: "#e6175f",
  color: "white",
  fontFamily: "Cairo, sans-serif",
  fontWeight: 800,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  cursor: "pointer",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#6b7773" }}>
      <span>{label}</span>
      <span style={{ color: "#26332f", fontWeight: 800 }}>{value}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [adminUser, setAdminUser] = useState<User | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [statusText, setStatusText] = useState("");
  const [activePage, setActivePage] = useState<AdminPage>("classes");

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [bookingPackages, setBookingPackages] = useState<BookingPackageItem[]>([]);
  const [images, setImages] = useState<TransformationImageItem[]>([]);

  const [packageDrawerOpen, setPackageDrawerOpen] = useState(false);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [imageDrawerOpen, setImageDrawerOpen] = useState(false);

  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  const [packageForm, setPackageForm] = useState<PackageFormState>(defaultPackageForm);
  const [bookingForm, setBookingForm] = useState<BookingPackageFormState>(defaultBookingForm);
  const [imageForm, setImageForm] = useState<TransformationFormState>(defaultImageForm);

  const [packageImageFile, setPackageImageFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [savingPackage, setSavingPackage] = useState(false);
  const [savingBooking, setSavingBooking] = useState(false);
  const [savingImage, setSavingImage] = useState(false);

  const onlinePackages = useMemo(() => sortByOrder(packages.filter((item) => item.category === "online")), [packages]);
  const recoveryPackages = useMemo(() => sortByOrder(packages.filter((item) => item.category === "recovery")), [packages]);
  const coursesPackages = useMemo(() => sortByOrder(packages.filter((item) => item.category === "courses")), [packages]);

  const fatLossImages = useMemo(() => sortByOrder(images.filter((item) => item.category === "fatLoss")), [images]);
  const bodyTransformationImages = useMemo(() => sortByOrder(images.filter((item) => item.category === "transformation")), [images]);
  const competitionImages = useMemo(() => sortByOrder(images.filter((item) => item.category === "competition")), [images]);
  const subscriptions = useMemo(() => sortByOrder(bookingPackages), [bookingPackages]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user ?? null);
      setAuthLoading(false);
      if (!user) navigate("/admin/login", { replace: true });
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const unsubPackages = onSnapshot(collection(db, "packages"), (snapshot) => {
      const data = snapshot.docs.map((item) => {
        const d = item.data() as Partial<PackageItem>;
        return {
          id: item.id,
          titleAr: String(d.titleAr || ""),
          titleEn: String(d.titleEn || ""),
          titleDe: String(d.titleDe || ""),
          subtitleAr: String(d.subtitleAr || ""),
          subtitleEn: String(d.subtitleEn || ""),
          subtitleDe: String(d.subtitleDe || ""),
          price: Number(d.price || 0),
          currency: String(d.currency || "ج"),
          periodAr: String(d.periodAr || ""),
          periodEn: String(d.periodEn || ""),
          periodDe: String(d.periodDe || ""),
          featuresAr: Array.isArray(d.featuresAr) ? d.featuresAr : [],
          featuresEn: Array.isArray(d.featuresEn) ? d.featuresEn : [],
          featuresDe: Array.isArray(d.featuresDe) ? d.featuresDe : [],
          category: normalizePackageCategory(String(d.category || "online")),
          badge: String(d.badge || ""),
          imageUrl: String(d.imageUrl || ""),
          imagePath: String(d.imagePath || ""),
          sortOrder: Number(d.sortOrder || 1),
          isActive: d.isActive !== false,
        } satisfies PackageItem;
      });
      setPackages(sortByOrder(data));
    });

    const unsubBooking = onSnapshot(collection(db, "bookingPackages"), (snapshot) => {
      const data = snapshot.docs.map((item) => {
        const d = item.data() as Partial<BookingPackageItem> & Record<string, unknown>;
        return {
          id: item.id,
          nameAr: String(d.nameAr || d.titleAr || ""),
          nameEn: String(d.nameEn || d.titleEn || ""),
          nameDe: String(d.nameDe || d.titleDe || ""),
          price: Number(d.price || 0),
        oldPrice:
  d?.oldPrice === null ||
  d?.oldPrice === undefined ||
  String(d?.oldPrice).trim() === ""
    ? null
    : Number(d.oldPrice),
          currency: String(d.currency || "ج"),
          priceNoteAr: String(d.priceNoteAr || d.subtitleAr || ""),
          priceNoteEn: String(d.priceNoteEn || d.subtitleEn || ""),
          priceNoteDe: String(d.priceNoteDe || d.subtitleDe || ""),
          featuresAr: Array.isArray(d.featuresAr) ? d.featuresAr : [],
          featuresEn: Array.isArray(d.featuresEn) ? d.featuresEn : [],
          featuresDe: Array.isArray(d.featuresDe) ? d.featuresDe : [],
          badgeAr: String(d.badgeAr || ""),
          badgeEn: String(d.badgeEn || ""),
          badgeDe: String(d.badgeDe || ""),
          isPopular: Boolean(d.isPopular),
          sortOrder: Number(d.sortOrder || 1),
          isActive: d.isActive !== false,
        } satisfies BookingPackageItem;
      });
      setBookingPackages(sortByOrder(data));
    });

    const unsubImages = onSnapshot(collection(db, "transformations"), (snapshot) => {
      const data = snapshot.docs.map((item) => {
        const d = item.data() as Partial<TransformationImageItem>;
        return {
          id: item.id,
          category: normalizeTransformationCategory(String(d.category || "transformation")),
          imageUrl: String(d.imageUrl || ""),
          imagePath: String(d.imagePath || ""),
          titleAr: String(d.titleAr || ""),
          titleEn: String(d.titleEn || ""),
          titleDe: String(d.titleDe || ""),
          subtitleAr: String(d.subtitleAr || ""),
          subtitleEn: String(d.subtitleEn || ""),
          subtitleDe: String(d.subtitleDe || ""),
          sortOrder: Number(d.sortOrder || 1),
          isActive: d.isActive !== false,
        } satisfies TransformationImageItem;
      });
      setImages(sortByOrder(data));
    });

    return () => {
      unsubPackages();
      unsubBooking();
      unsubImages();
    };
  }, []);

  function closeAllDrawers() {
    setPackageDrawerOpen(false);
    setBookingDrawerOpen(false);
    setImageDrawerOpen(false);
    setEditingPackageId(null);
    setEditingBookingId(null);
    setEditingImageId(null);
    setPackageImageFile(null);
    setImageFile(null);
    setPackageForm(defaultPackageForm);
    setBookingForm(defaultBookingForm);
    setImageForm(defaultImageForm);
  }

  function openNewPackage(category: PackageCategory) {
    setEditingPackageId(null);
    setPackageImageFile(null);
    setPackageForm({ ...defaultPackageForm, category, sortOrder: String(packages.filter((item) => item.category === category).length + 1) });
    setPackageDrawerOpen(true);
  }

  function openEditPackage(item: PackageItem) {
    setEditingPackageId(item.id);
    setPackageImageFile(null);
    setPackageForm({
      titleAr: item.titleAr,
      subtitleAr: item.subtitleAr,
      price: String(item.price),
      currency: item.currency,
      periodAr: item.periodAr,
      featuresAr: toTextLines(item.featuresAr),
      category: item.category,
      badge: item.badge,
      imageUrl: item.imageUrl,
      imagePath: item.imagePath,
      sortOrder: String(item.sortOrder),
      isActive: item.isActive,
    });
    setPackageDrawerOpen(true);
  }

  function openNewBooking() {
    setEditingBookingId(null);
    setBookingForm({ ...defaultBookingForm, sortOrder: String(bookingPackages.length + 1) });
    setBookingDrawerOpen(true);
  }

  function openEditBooking(item: BookingPackageItem) {
    setEditingBookingId(item.id);
    setBookingForm({
      nameAr: item.nameAr,
      price: String(item.price),
      oldPrice: item.oldPrice === null ? "" : String(item.oldPrice),
      currency: item.currency,
      priceNoteAr: item.priceNoteAr,
      featuresAr: toTextLines(item.featuresAr),
      badgeAr: item.badgeAr,
      isPopular: item.isPopular,
      sortOrder: String(item.sortOrder),
      isActive: item.isActive,
    });
    setBookingDrawerOpen(true);
  }

  function openNewImage(category: TransformationCategory) {
    setEditingImageId(null);
    setImageFile(null);
    setImageForm({ ...defaultImageForm, category, sortOrder: String(images.filter((item) => item.category === category).length + 1) });
    setImageDrawerOpen(true);
  }

  function openEditImage(item: TransformationImageItem) {
    setEditingImageId(item.id);
    setImageFile(null);
    setImageForm({
      titleAr: item.titleAr,
      subtitleAr: item.subtitleAr,
      category: item.category,
      imageUrl: item.imageUrl,
      imagePath: item.imagePath,
      sortOrder: String(item.sortOrder),
      isActive: item.isActive,
    });
    setImageDrawerOpen(true);
  }

  async function handleSavePackage(e: FormEvent) {
    e.preventDefault();
    setSavingPackage(true);
    setStatusText("");

    try {
      let imageUrl = packageForm.imageUrl.trim();
      let imagePath = packageForm.imagePath.trim();

      if (packageImageFile) {
        const uploaded = await uploadFileToStorage(packageImageFile, "packages");
        imageUrl = uploaded.url;
        imagePath = uploaded.path;
        if (editingPackageId && packageForm.imagePath) {
          try {
            await deleteObject(ref(storage, packageForm.imagePath));
          } catch {}
        }
      }

      const payload = {
        titleAr: packageForm.titleAr.trim(),
        titleEn: packageForm.titleAr.trim(),
        titleDe: packageForm.titleAr.trim(),
        subtitleAr: packageForm.subtitleAr.trim(),
        subtitleEn: packageForm.subtitleAr.trim(),
        subtitleDe: packageForm.subtitleAr.trim(),
        price: Number(packageForm.price || 0),
        currency: packageForm.currency.trim() || "ج",
        periodAr: packageForm.periodAr.trim(),
        periodEn: packageForm.periodAr.trim(),
        periodDe: packageForm.periodAr.trim(),
        featuresAr: parseLines(packageForm.featuresAr),
        featuresEn: parseLines(packageForm.featuresAr),
        featuresDe: parseLines(packageForm.featuresAr),
        category: packageForm.category,
        badge: packageForm.badge.trim(),
        imageUrl,
        imagePath,
        sortOrder: Number(packageForm.sortOrder || 1),
        isActive: packageForm.isActive,
      };

      if (editingPackageId) {
        await updateDoc(doc(db, "packages", editingPackageId), payload);
        setStatusText("تم تحديث الباقة / الكورس بنجاح.");
      } else {
        await addDoc(collection(db, "packages"), payload);
        setStatusText("تمت إضافة باقة / كورس جديد.");
      }

      closeAllDrawers();
    } catch (error: any) {
      setStatusText(error?.message || "فشل حفظ الباقة.");
    } finally {
      setSavingPackage(false);
    }
  }

  async function handleSaveBooking(e: FormEvent) {
    e.preventDefault();
    setSavingBooking(true);
    setStatusText("");

    try {
      const payload = {
        nameAr: bookingForm.nameAr.trim(),
        nameEn: bookingForm.nameAr.trim(),
        nameDe: bookingForm.nameAr.trim(),
        titleAr: bookingForm.nameAr.trim(),
        titleEn: bookingForm.nameAr.trim(),
        titleDe: bookingForm.nameAr.trim(),
        price: Number(bookingForm.price || 0),
        oldPrice: bookingForm.oldPrice.trim() ? Number(bookingForm.oldPrice) : null,
        currency: bookingForm.currency.trim() || "ج",
        priceNoteAr: bookingForm.priceNoteAr.trim(),
        priceNoteEn: bookingForm.priceNoteAr.trim(),
        priceNoteDe: bookingForm.priceNoteAr.trim(),
        subtitleAr: bookingForm.priceNoteAr.trim(),
        subtitleEn: bookingForm.priceNoteAr.trim(),
        subtitleDe: bookingForm.priceNoteAr.trim(),
        featuresAr: parseLines(bookingForm.featuresAr),
        featuresEn: parseLines(bookingForm.featuresAr),
        featuresDe: parseLines(bookingForm.featuresAr),
        badgeAr: bookingForm.badgeAr.trim(),
        badgeEn: bookingForm.badgeAr.trim(),
        badgeDe: bookingForm.badgeAr.trim(),
        isPopular: bookingForm.isPopular,
        sortOrder: Number(bookingForm.sortOrder || 1),
        isActive: bookingForm.isActive,
      };

      if (editingBookingId) {
        await updateDoc(doc(db, "bookingPackages", editingBookingId), payload);
        setStatusText("تم تحديث عرض الحجز بنجاح.");
      } else {
        await addDoc(collection(db, "bookingPackages"), payload);
        setStatusText("تمت إضافة عرض جديد في صفحة الحجز.");
      }

      closeAllDrawers();
    } catch (error: any) {
      setStatusText(error?.message || "فشل حفظ عرض الحجز.");
    } finally {
      setSavingBooking(false);
    }
  }

  async function handleSaveImage(e: FormEvent) {
    e.preventDefault();
    setSavingImage(true);
    setStatusText("");

    try {
      let imageUrl = imageForm.imageUrl.trim();
      let imagePath = imageForm.imagePath.trim();

      if (imageFile) {
        const uploaded = await uploadFileToStorage(imageFile, "transformations");
        imageUrl = uploaded.url;
        imagePath = uploaded.path;
        if (editingImageId && imageForm.imagePath) {
          try {
            await deleteObject(ref(storage, imageForm.imagePath));
          } catch {}
        }
      }

      const payload = {
        titleAr: imageForm.titleAr.trim(),
        titleEn: imageForm.titleAr.trim(),
        titleDe: imageForm.titleAr.trim(),
        subtitleAr: imageForm.subtitleAr.trim(),
        subtitleEn: imageForm.subtitleAr.trim(),
        subtitleDe: imageForm.subtitleAr.trim(),
        category: imageForm.category,
        imageUrl,
        imagePath,
        sortOrder: Number(imageForm.sortOrder || 1),
        isActive: imageForm.isActive,
      };

      if (editingImageId) {
        await updateDoc(doc(db, "transformations", editingImageId), payload);
        setStatusText("تم تحديث صورة التحول بنجاح.");
      } else {
        await addDoc(collection(db, "transformations"), payload);
        setStatusText("تمت إضافة صورة جديدة في القسم.");
      }

      closeAllDrawers();
    } catch (error: any) {
      setStatusText(error?.message || "فشل حفظ الصورة.");
    } finally {
      setSavingImage(false);
    }
  }

  async function handleDeletePackage(item: PackageItem) {
    if (!window.confirm("حذف هذه الباقة / الكورس؟")) return;
    await deleteDoc(doc(db, "packages", item.id));
    if (item.imagePath) {
      try {
        await deleteObject(ref(storage, item.imagePath));
      } catch {}
    }
    setStatusText("تم حذف الباقة / الكورس.");
  }

  async function handleDeleteBooking(item: BookingPackageItem) {
    if (!window.confirm("حذف هذا العرض؟")) return;
    await deleteDoc(doc(db, "bookingPackages", item.id));
    setStatusText("تم حذف عرض الحجز.");
  }

  async function handleDeleteImage(item: TransformationImageItem) {
    if (!window.confirm("حذف هذه الصورة؟")) return;
    await deleteDoc(doc(db, "transformations", item.id));
    if (item.imagePath) {
      try {
        await deleteObject(ref(storage, item.imagePath));
      } catch {}
    }
    setStatusText("تم حذف الصورة.");
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin/login", { replace: true });
  }

  if (authLoading) {
    return (
      <div dir="rtl" style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Cairo, sans-serif" }}>
        جاري تحميل لوحة التحكم...
      </div>
    );
  }

  if (!adminUser) return null;

  return (
    <PageShell>
      <TopBar email={adminUser.email} activePage={activePage} onChangePage={setActivePage} onLogout={handleLogout} />

      <div style={{ maxWidth: 1460, margin: "0 auto", padding: "24px 22px 40px", display: "grid", gap: 24 }}>
        <Hero
          title={pageTitle(activePage)}
          subtitle={
            activePage === "classes"
              ? "كل أقسام الكلاسات والباقات والكورسات في شاشة واحدة، مع إضافة كارت جديد بنفس شكل الموقع."
              : activePage === "booking"
              ? "كل عروض وصفحة الحجز في شكل كروت، وتقدري تعدلي أي عرض أو تضيفي عرض جديد بسهولة."
              : "إدارة أقسام صور التحولات: إضافة صورة، تبديل صورة، حذف صورة، وترتيبها داخل القسم."
          }
        />

        {statusText ? (
          <div
            style={{
              background: "#f3fffb",
              color: "#0f6f65",
              border: "1px solid rgba(15,118,110,0.14)",
              borderRadius: 18,
              padding: "14px 16px",
              fontWeight: 800,
            }}
          >
            {statusText}
          </div>
        ) : null}

        {activePage === "classes" ? (
          <Section
            icon={<Layers3 size={24} />}
            title="صفحة الكلاسات"
            subtitle="الباقات والكورسات متقسمة بنفس الأقسام، وكل قسم له زر إضافة خاص به."
          >
            <div style={{ display: "grid", gap: 28 }}>
              <SubSection
                title="الأونلاين"
                subtitle="باقات التدريب الأونلاين الظاهرة في صفحة الكلاسات."
                action={<button onClick={() => openNewPackage("online")} style={primaryButtonStyle}><Plus size={16} /> إضافة باقة</button>}
              >
                <Grid>
                  {onlinePackages.map((item) => (
                    <PackageCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditPackage(item)}
                      onDelete={() => handleDeletePackage(item)}
                      onReplaceImage={() => openEditPackage(item)}
                    />
                  ))}
                  <AddCard title="إضافة باقة أونلاين" onClick={() => openNewPackage("online")} />
                </Grid>
              </SubSection>

              <SubSection
                title="الريكاڤري / الجلسات"
                subtitle="جلسات الاستشفاء أو الباقات الخاصة بها داخل الصفحة."
                action={<button onClick={() => openNewPackage("recovery")} style={primaryButtonStyle}><Plus size={16} /> إضافة جلسة / باقة</button>}
              >
                <Grid>
                  {recoveryPackages.map((item) => (
                    <PackageCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditPackage(item)}
                      onDelete={() => handleDeletePackage(item)}
                      onReplaceImage={() => openEditPackage(item)}
                    />
                  ))}
                  <AddCard title="إضافة جلسة جديدة" onClick={() => openNewPackage("recovery")} />
                </Grid>
              </SubSection>

              <SubSection
                title="الكورسات"
                subtitle="كل الكورسات أو البوت كامب أو أي كروت تعليمية داخل صفحة الكلاسات."
                action={<button onClick={() => openNewPackage("courses")} style={primaryButtonStyle}><Plus size={16} /> إضافة كورس</button>}
              >
                <Grid>
                  {coursesPackages.map((item) => (
                    <PackageCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditPackage(item)}
                      onDelete={() => handleDeletePackage(item)}
                      onReplaceImage={() => openEditPackage(item)}
                    />
                  ))}
                  <AddCard title="إضافة كورس جديد" onClick={() => openNewPackage("courses")} />
                </Grid>
              </SubSection>
            </div>
          </Section>
        ) : null}

        {activePage === "booking" ? (
          <Section
            icon={<WalletCards size={24} />}
            title="صفحة الحجز"
            subtitle="كل عروض الاشتراك في نفس شكل كروت الموقع مع إضافة أو تعديل أو حذف العرض."
            action={<button onClick={openNewBooking} style={primaryButtonStyle}><Plus size={16} /> إضافة عرض</button>}
          >
            <Grid>
              {subscriptions.map((item) => (
                <BookingCard
                  key={item.id}
                  item={item}
                  onEdit={() => openEditBooking(item)}
                  onDelete={() => handleDeleteBooking(item)}
                />
              ))}
              <AddCard title="إضافة عرض جديد" onClick={openNewBooking} />
            </Grid>
          </Section>
        ) : null}

        {activePage === "transformations" ? (
          <Section
            icon={<Images size={24} />}
            title="صفحة التحولات"
            subtitle="كل قسم له صور مستقلة وزر إضافة صورة داخل نفس القسم."
          >
            <div style={{ display: "grid", gap: 28 }}>
              <SubSection
                title="نتائج التخسيس"
                subtitle="الصور المعروضة داخل قسم نتائج التخسيس."
                action={<button onClick={() => openNewImage("fatLoss")} style={primaryButtonStyle}><Plus size={16} /> إضافة صورة</button>}
              >
                <Grid>
                  {fatLossImages.map((item) => (
                    <ImageCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditImage(item)}
                      onDelete={() => handleDeleteImage(item)}
                      onReplaceImage={() => openEditImage(item)}
                    />
                  ))}
                  <AddCard title="إضافة صورة تخسيس" onClick={() => openNewImage("fatLoss")} />
                </Grid>
              </SubSection>

              <SubSection
                title="تحولات الجسم"
                subtitle="الصور الموجودة داخل قسم التحولات الأساسية."
                action={<button onClick={() => openNewImage("transformation")} style={primaryButtonStyle}><Plus size={16} /> إضافة صورة</button>}
              >
                <Grid>
                  {bodyTransformationImages.map((item) => (
                    <ImageCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditImage(item)}
                      onDelete={() => handleDeleteImage(item)}
                      onReplaceImage={() => openEditImage(item)}
                    />
                  ))}
                  <AddCard title="إضافة صورة تحول" onClick={() => openNewImage("transformation")} />
                </Grid>
              </SubSection>

              <SubSection
                title="تحضير البطولات"
                subtitle="صور البطولات أو الفورمة التنافسية داخل قسم البطولات."
                action={<button onClick={() => openNewImage("competition")} style={primaryButtonStyle}><Plus size={16} /> إضافة صورة</button>}
              >
                <Grid>
                  {competitionImages.map((item) => (
                    <ImageCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditImage(item)}
                      onDelete={() => handleDeleteImage(item)}
                      onReplaceImage={() => openEditImage(item)}
                    />
                  ))}
                  <AddCard title="إضافة صورة بطولة" onClick={() => openNewImage("competition")} />
                </Grid>
              </SubSection>
            </div>
          </Section>
        ) : null}
      </div>

      <Drawer
        title={editingPackageId ? "تعديل الباقة / الكورس" : "إضافة باقة / كورس"}
        open={packageDrawerOpen}
        onClose={closeAllDrawers}
      >
        <form onSubmit={handleSavePackage} style={{ display: "grid", gap: 16 }}>
          <Input label="اسم الباقة / الكورس">
            <TextInput value={packageForm.titleAr} onChange={(e) => setPackageForm((p) => ({ ...p, titleAr: e.target.value }))} />
          </Input>

          <Input label="الوصف">
            <TextArea value={packageForm.subtitleAr} onChange={(e) => setPackageForm((p) => ({ ...p, subtitleAr: e.target.value }))} />
          </Input>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
            <Input label="السعر">
              <TextInput value={packageForm.price} onChange={(e) => setPackageForm((p) => ({ ...p, price: e.target.value }))} />
            </Input>
            <Input label="العملة">
              <TextInput value={packageForm.currency} onChange={(e) => setPackageForm((p) => ({ ...p, currency: e.target.value }))} />
            </Input>
            <Input label="الفترة">
              <TextInput value={packageForm.periodAr} onChange={(e) => setPackageForm((p) => ({ ...p, periodAr: e.target.value }))} />
            </Input>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            <Input label="القسم">
              <select value={packageForm.category} onChange={(e) => setPackageForm((p) => ({ ...p, category: e.target.value as PackageCategory }))} style={inputStyle}>
                <option value="online">أونلاين</option>
                <option value="recovery">ريكاڤري / جلسات</option>
                <option value="courses">كورسات</option>
              </select>
            </Input>
            <Input label="Badge / شارة">
              <TextInput value={packageForm.badge} onChange={(e) => setPackageForm((p) => ({ ...p, badge: e.target.value }))} />
            </Input>
          </div>

          <Input label="المميزات — كل سطر ميزة">
            <TextArea value={packageForm.featuresAr} onChange={(e) => setPackageForm((p) => ({ ...p, featuresAr: e.target.value }))} />
          </Input>

          <Input label="رابط الصورة الحالية">
            <TextInput value={packageForm.imageUrl} onChange={(e) => setPackageForm((p) => ({ ...p, imageUrl: e.target.value }))} />
          </Input>

          <Input label="تبديل / رفع صورة">
            <label style={{ ...ghostButtonStyle(true), width: "100%" }}>
              <input type="file" accept="image/*" hidden onChange={(e) => setPackageImageFile(e.target.files?.[0] || null)} />
              <Upload size={16} /> {packageImageFile ? packageImageFile.name : "اختيار صورة"}
            </label>
          </Input>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            <Input label="الترتيب">
              <TextInput value={packageForm.sortOrder} onChange={(e) => setPackageForm((p) => ({ ...p, sortOrder: e.target.value }))} />
            </Input>
            <Input label="إعدادات سريعة">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 12 }}>
                <label><input type="checkbox" checked={packageForm.isActive} onChange={(e) => setPackageForm((p) => ({ ...p, isActive: e.target.checked }))} /> ظاهر بالموقع</label>
              </div>
            </Input>
          </div>

          <button type="submit" disabled={savingPackage} style={primaryButtonStyle}>
            <Save size={16} /> {savingPackage ? "جاري الحفظ..." : "حفظ الباقة"}
          </button>
        </form>
      </Drawer>

      <Drawer
        title={editingBookingId ? "تعديل عرض الحجز" : "إضافة عرض حجز"}
        open={bookingDrawerOpen}
        onClose={closeAllDrawers}
      >
        <form onSubmit={handleSaveBooking} style={{ display: "grid", gap: 16 }}>
          <Input label="اسم العرض">
            <TextInput value={bookingForm.nameAr} onChange={(e) => setBookingForm((p) => ({ ...p, nameAr: e.target.value }))} />
          </Input>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
            <Input label="السعر">
              <TextInput value={bookingForm.price} onChange={(e) => setBookingForm((p) => ({ ...p, price: e.target.value }))} />
            </Input>
            <Input label="قبل الخصم">
              <TextInput value={bookingForm.oldPrice} onChange={(e) => setBookingForm((p) => ({ ...p, oldPrice: e.target.value }))} />
            </Input>
            <Input label="العملة">
              <TextInput value={bookingForm.currency} onChange={(e) => setBookingForm((p) => ({ ...p, currency: e.target.value }))} />
            </Input>
          </div>

          <Input label="وصف مختصر / المدة">
            <TextInput value={bookingForm.priceNoteAr} onChange={(e) => setBookingForm((p) => ({ ...p, priceNoteAr: e.target.value }))} />
          </Input>

          <Input label="Badge / شارة">
            <TextInput value={bookingForm.badgeAr} onChange={(e) => setBookingForm((p) => ({ ...p, badgeAr: e.target.value }))} />
          </Input>

          <Input label="التفاصيل — كل سطر ميزة">
            <TextArea value={bookingForm.featuresAr} onChange={(e) => setBookingForm((p) => ({ ...p, featuresAr: e.target.value }))} />
          </Input>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            <Input label="الترتيب">
              <TextInput value={bookingForm.sortOrder} onChange={(e) => setBookingForm((p) => ({ ...p, sortOrder: e.target.value }))} />
            </Input>
            <Input label="إعدادات سريعة">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 12 }}>
                <label><input type="checkbox" checked={bookingForm.isPopular} onChange={(e) => setBookingForm((p) => ({ ...p, isPopular: e.target.checked }))} /> مميز</label>
                <label><input type="checkbox" checked={bookingForm.isActive} onChange={(e) => setBookingForm((p) => ({ ...p, isActive: e.target.checked }))} /> ظاهر بالموقع</label>
              </div>
            </Input>
          </div>

          <button type="submit" disabled={savingBooking} style={primaryButtonStyle}>
            <Save size={16} /> {savingBooking ? "جاري الحفظ..." : "حفظ العرض"}
          </button>
        </form>
      </Drawer>

      <Drawer
        title={editingImageId ? "تعديل الصورة" : "إضافة صورة جديدة"}
        open={imageDrawerOpen}
        onClose={closeAllDrawers}
      >
        <form onSubmit={handleSaveImage} style={{ display: "grid", gap: 16 }}>
          <Input label="عنوان الصورة">
            <TextInput value={imageForm.titleAr} onChange={(e) => setImageForm((p) => ({ ...p, titleAr: e.target.value }))} />
          </Input>

          <Input label="وصف الصورة">
            <TextArea value={imageForm.subtitleAr} onChange={(e) => setImageForm((p) => ({ ...p, subtitleAr: e.target.value }))} />
          </Input>

          <Input label="القسم">
            <select value={imageForm.category} onChange={(e) => setImageForm((p) => ({ ...p, category: e.target.value as TransformationCategory }))} style={inputStyle}>
              <option value="fatLoss">نتائج التخسيس</option>
              <option value="transformation">تحولات الجسم</option>
              <option value="competition">تحضير البطولات</option>
            </select>
          </Input>

          <Input label="رابط الصورة الحالية">
            <TextInput value={imageForm.imageUrl} onChange={(e) => setImageForm((p) => ({ ...p, imageUrl: e.target.value }))} />
          </Input>

          <Input label="رفع / تبديل صورة">
            <label style={{ ...ghostButtonStyle(true), width: "100%" }}>
              <input type="file" accept="image/*" hidden onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              <Upload size={16} /> {imageFile ? imageFile.name : "اختيار صورة"}
            </label>
          </Input>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            <Input label="الترتيب">
              <TextInput value={imageForm.sortOrder} onChange={(e) => setImageForm((p) => ({ ...p, sortOrder: e.target.value }))} />
            </Input>
            <Input label="إعدادات سريعة">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 12 }}>
                <label><input type="checkbox" checked={imageForm.isActive} onChange={(e) => setImageForm((p) => ({ ...p, isActive: e.target.checked }))} /> ظاهر بالموقع</label>
              </div>
            </Input>
          </div>

          <button type="submit" disabled={savingImage} style={primaryButtonStyle}>
            <Save size={16} /> {savingImage ? "جاري الحفظ..." : "حفظ الصورة"}
          </button>
        </form>
      </Drawer>
    </PageShell>
  );
}
