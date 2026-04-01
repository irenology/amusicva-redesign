import { useAuth } from "@/_core/hooks/useAuth";
import { ChevronLeft, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

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
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  // Fetch bookings data
  const lessonBookingsQuery = trpc.bookings.getAllLessonBookings.useQuery();
  const practiceBookingsQuery = trpc.bookings.getAllPracticeRoomBookings.useQuery();

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

  const lessonBookings = lessonBookingsQuery.data || [];
  const practiceBookings = practiceBookingsQuery.data || [];

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
          <div className="flex items-center gap-4">
            <div style={{ textAlign: "right" }}>
              <p style={{ color: C.text, fontSize: "0.9rem", fontWeight: 500 }}>
                {user?.name || "Admin User"}
              </p>
              <p style={{ color: C.muted, fontSize: "0.8rem" }}>Admin</p>
            </div>
            <button
              onClick={logout}
              style={{
                padding: "0.5rem 1rem",
                background: C.accent,
                color: C.white,
                border: "none",
                borderRadius: "0.375rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              TOTAL BOOKINGS
            </p>
            <p className="font-display text-3xl" style={{ color: C.text, fontWeight: 600 }}>
              {lessonBookings.length + practiceBookings.length}
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              LESSON BOOKINGS
            </p>
            <p className="font-display text-3xl" style={{ color: C.accent, fontWeight: 600 }}>
              {lessonBookings.length}
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              PRACTICE ROOM BOOKINGS
            </p>
            <p className="font-display text-3xl" style={{ color: C.accent, fontWeight: 600 }}>
              {practiceBookings.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b" style={{ borderColor: C.border }}>
          <button
            onClick={() => setActiveTab("lessons")}
            style={{
              padding: "1rem 1.5rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "lessons" ? `3px solid ${C.accent}` : "none",
              color: activeTab === "lessons" ? C.accent : C.muted,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Lesson Bookings ({lessonBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            style={{
              padding: "1rem 1.5rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "practice" ? `3px solid ${C.accent}` : "none",
              color: activeTab === "practice" ? C.accent : C.muted,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Practice Room Bookings ({practiceBookings.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "lessons" && (
          <div>
            {lessonBookingsQuery.isLoading ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "2rem" }}>
                Loading lesson bookings...
              </div>
            ) : lessonBookings.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: C.white,
                  borderRadius: "0.5rem",
                  border: `1px solid ${C.border}`,
                }}
              >
                <p style={{ color: C.muted }}>No lesson bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessonBookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    style={{
                      padding: "1.5rem",
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-lg" style={{ color: C.text, fontWeight: 500 }}>
                        {booking.studentName}
                      </h3>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          background: `${C.accent}20`,
                          color: C.accent,
                          borderRadius: "0.25rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {booking.duration} min
                      </span>
                    </div>
                    <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      Teacher: <strong>{booking.teacherName}</strong>
                    </p>
                    <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      Email: <a href={`mailto:${booking.studentEmail}`} style={{ color: C.accent, textDecoration: "none" }}>
                        {booking.studentEmail}
                      </a>
                    </p>
                    <p style={{ color: C.muted, fontSize: "0.85rem" }}>
                      Submitted: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "practice" && (
          <div>
            {practiceBookingsQuery.isLoading ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "2rem" }}>
                Loading practice room bookings...
              </div>
            ) : practiceBookings.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: C.white,
                  borderRadius: "0.5rem",
                  border: `1px solid ${C.border}`,
                }}
              >
                <p style={{ color: C.muted }}>No practice room bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {practiceBookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    style={{
                      padding: "1.5rem",
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-lg" style={{ color: C.text, fontWeight: 500 }}>
                        {booking.studentName}
                      </h3>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          background: `${C.accent}20`,
                          color: C.accent,
                          borderRadius: "0.25rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {booking.hours} hour{booking.hours !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      Room Type: <strong>{booking.roomType === "premium" ? "Premium" : "Standard"}</strong>
                    </p>
                    <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      Email: <a href={`mailto:${booking.studentEmail}`} style={{ color: C.accent, textDecoration: "none" }}>
                        {booking.studentEmail}
                      </a>
                    </p>
                    <p style={{ color: C.muted, fontSize: "0.85rem" }}>
                      Submitted: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
