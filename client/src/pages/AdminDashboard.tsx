import { useAuth } from "@/_core/hooks/useAuth";
import { ChevronLeft } from "lucide-react";

const C = {
  bg: "#FAF7F2",
  bgAlt: "#F5EFE6",
  card: "#F2EDE4",
  border: "#D4C5A9",
  text: "#2C1A0E",
  textMid: "#5C3D20",
  muted: "#8B7355",
  accent: "#B8860B",
  white: "#FDFCF9",
};

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();

  // Check authorization
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
        <div style={{ textAlign: "center", color: C.text }}>
          <div style={{ fontSize: "1.2rem" }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
        <div
          className="p-8 rounded-lg text-center max-w-md"
          style={{ background: C.white, border: `1px solid ${C.border}` }}
        >
          <h1 className="font-display text-2xl mb-4" style={{ color: C.text, fontWeight: 500 }}>
            Access Denied
          </h1>
          <p style={{ color: C.muted, marginBottom: "2rem" }}>
            You do not have permission to access this page. Admin access required.
          </p>
          <a href="/" style={{ color: C.accent, textDecoration: "none", fontWeight: 500 }}>
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-40 py-6" style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div className="container flex items-center justify-between">
          <div>
            <a href="/" className="flex items-center gap-2 mb-2 text-sm font-semibold cursor-pointer" style={{ color: C.accent }}>
              <ChevronLeft size={16} /> Back to Home
            </a>
            <h1 className="font-display text-3xl" style={{ color: C.text, fontWeight: 500 }}>
              Admin Dashboard
            </h1>
            <p style={{ color: C.muted, marginTop: "0.5rem" }}>
              Manage practice room bookings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Feature Not Yet Implemented */}
        <div
          className="p-12 rounded-lg text-center"
          style={{ background: C.white, border: `2px solid ${C.accent}` }}
        >
          <h2 className="font-display text-2xl mb-4" style={{ color: C.accent, fontWeight: 500 }}>
            Admin Dashboard - Coming Soon
          </h2>
          <p style={{ color: C.textMid, marginBottom: "2rem", fontSize: "1.05rem" }}>
            The admin booking management interface is currently under development. This dashboard will allow you to:
          </p>

          <ul className="max-w-md mx-auto text-left space-y-3 mb-8">
            <li style={{ color: C.text, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: C.accent, fontWeight: 600 }}>✓</span>
              View all practice room bookings
            </li>
            <li style={{ color: C.text, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: C.accent, fontWeight: 600 }}>✓</span>
              Cancel or reschedule bookings
            </li>
            <li style={{ color: C.text, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: C.accent, fontWeight: 600 }}>✓</span>
              Manage room availability and pricing
            </li>
            <li style={{ color: C.text, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: C.accent, fontWeight: 600 }}>✓</span>
              View booking statistics and analytics
            </li>
          </ul>

          <p style={{ color: C.muted, fontSize: "0.95rem" }}>
            Backend procedures are being implemented to support these features. Check back soon!
          </p>
        </div>

        {/* Quick Stats Placeholder */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              TOTAL BOOKINGS
            </p>
            <p className="font-display text-3xl" style={{ color: C.text, fontWeight: 600 }}>
              —
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              UPCOMING
            </p>
            <p className="font-display text-3xl" style={{ color: C.accent, fontWeight: 600 }}>
              —
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              COMPLETED
            </p>
            <p className="font-display text-3xl" style={{ color: C.text, fontWeight: 600 }}>
              —
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
