import { useState } from "react";
import { getLoginUrl } from "@/const";

const C = {
  bg: "#FAF7F2",
  card: "#F2EDE4",
  border: "#D4C5A9",
  text: "#2C1A0E",
  textMid: "#5C3D20",
  muted: "#8B7355",
  accent: "#B8860B",
  white: "#FDFCF9",
};

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Redirect to Manus OAuth login with admin dashboard as return path
    window.location.href = getLoginUrl();
    // After login, user will be redirected to home, then can navigate to admin dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: C.bg }}>
      <div
        className="w-full max-w-md rounded-lg shadow-lg p-8"
        style={{ background: C.white, border: `1px solid ${C.border}` }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl mb-2" style={{ color: C.text, fontWeight: 500 }}>
            Admin Login
          </h1>
          <p style={{ color: C.muted, fontSize: "0.95rem" }}>
            Sign in with your account to access the admin dashboard
          </p>
        </div>

        {/* Info Box */}
        <div
          className="p-4 rounded mb-8"
          style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}50` }}
        >
          <p style={{ color: C.textMid, fontSize: "0.9rem", lineHeight: "1.5" }}>
            Only users with admin privileges can access the dashboard. If you don't have admin access, please contact the system administrator.
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "0.875rem",
            background: C.accent,
            color: C.white,
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            transition: "opacity 0.2s",
            letterSpacing: "0.05em",
          }}
        >
          {isLoading ? "Redirecting..." : "Sign In with Manus"}
        </button>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            style={{
              color: C.accent,
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
