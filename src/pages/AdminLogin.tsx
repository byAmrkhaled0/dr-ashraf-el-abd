import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/admin", { replace: true });
    } catch {
      setErrorText("فشل تسجيل الدخول. تأكد من الإيميل والباسورد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(212,166,63,0.12), transparent 35%), #0b0f16",
        color: "#f7f2e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "Cairo, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "rgba(18,25,38,0.95)",
          border: "1px solid rgba(212,166,63,0.16)",
          borderRadius: 28,
          padding: 28,
          boxShadow: "0 20px 60px rgba(0,0,0,0.34)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              margin: "0 auto 14px",
              borderRadius: 22,
              background: "rgba(212,166,63,0.12)",
              color: "#d4a63f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(212,166,63,0.16)",
            }}
          >
            <ShieldCheck size={34} />
          </div>

          <h1 style={{ margin: "0 0 8px", fontSize: 30, fontWeight: 900 }}>
            تسجيل دخول الأدمن
          </h1>

          <p
            style={{
              margin: 0,
              color: "rgba(247,242,232,0.72)",
              lineHeight: 1.9,
              fontSize: 14,
            }}
          >
            ادخل بحساب الأدمن للتحكم في الباقات والريفيوهات ومحتوى الموقع.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 800,
                color: "#d4a63f",
              }}
            >
              البريد الإلكتروني
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#0d131d",
                border: "1px solid rgba(212,166,63,0.14)",
                borderRadius: 16,
                padding: "0 14px",
              }}
            >
              <Mail size={18} color="#d4a63f" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  flex: 1,
                  height: 52,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f7f2e8",
                  fontFamily: "inherit",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 800,
                color: "#d4a63f",
              }}
            >
              كلمة المرور
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#0d131d",
                border: "1px solid rgba(212,166,63,0.14)",
                borderRadius: 16,
                padding: "0 14px",
              }}
            >
              <Lock size={18} color="#d4a63f" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  flex: 1,
                  height: 52,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f7f2e8",
                  fontFamily: "inherit",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {errorText ? (
            <div
              style={{
                background: "rgba(255,80,80,0.10)",
                border: "1px solid rgba(255,80,80,0.18)",
                color: "#ffb4b4",
                borderRadius: 14,
                padding: "12px 14px",
                fontSize: 14,
              }}
            >
              {errorText}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              height: 54,
              border: "none",
              borderRadius: 16,
              background: "linear-gradient(135deg, #d4a63f, #f0ca6b)",
              color: "#111",
              fontWeight: 900,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 14px 28px rgba(212,166,63,0.22)",
            }}
          >
            {loading ? "جاري تسجيل الدخول..." : "دخول لوحة التحكم"}
          </button>
        </form>
      </div>
    </div>
  );
}