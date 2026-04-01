import { useAuth } from "@/_core/hooks/useAuth";
import { ChevronLeft, LogOut, Trash2, Edit3, Lock } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"lessons" | "practice" | "blocked">("lessons");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [actionType, setActionType] = useState<"cancel" | "reschedule" | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockData, setBlockData] = useState({
    blockDate: "",
    startTime: "",
    endTime: "",
    reason: "",
  });
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [rescheduleData, setRescheduleData] = useState({
    bookingId: 0,
    newDate: "",
    newTime: "",
    notes: "",
  });
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  // Fetch bookings data
  const lessonBookingsQuery = trpc.bookings.getAllLessonBookings.useQuery();
  const practiceBookingsQuery = trpc.bookings.getAllPracticeRoomBookings.useQuery();
  const blockedSlotsQuery = trpc.bookings.getBlockedTimeSlots.useQuery();

  // Mutations
  const cancelLessonMutation = trpc.bookings.cancelLessonBooking.useMutation({
    onSuccess: () => {
      lessonBookingsQuery.refetch();
      setSelectedBooking(null);
      setActionType(null);
    },
  });

  const cancelPracticeMutation = trpc.bookings.cancelPracticeRoomBooking.useMutation({
    onSuccess: () => {
      practiceBookingsQuery.refetch();
      setSelectedBooking(null);
      setActionType(null);
    },
  });

  const blockSlotMutation = trpc.bookings.blockTimeSlot.useMutation({
    onSuccess: () => {
      blockedSlotsQuery.refetch();
      setShowBlockModal(false);
      setBlockData({ blockDate: "", startTime: "", endTime: "", reason: "" });
    },
  });

  const unblockSlotMutation = trpc.bookings.unblockTimeSlot.useMutation({
    onSuccess: () => {
      blockedSlotsQuery.refetch();
    },
  });

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

  let lessonBookings = lessonBookingsQuery.data || [];
  
  // Apply filters
  if (filters.status !== "all") {
    lessonBookings = lessonBookings.filter((b: any) => b.status === filters.status);
  }
  if (filters.dateFrom) {
    lessonBookings = lessonBookings.filter((b: any) => new Date(b.createdAt) >= new Date(filters.dateFrom));
  }
  if (filters.dateTo) {
    lessonBookings = lessonBookings.filter((b: any) => new Date(b.createdAt) <= new Date(filters.dateTo));
  }
  let practiceBookings = practiceBookingsQuery.data || [];
  
  // Apply filters
  if (filters.status !== "all") {
    practiceBookings = practiceBookings.filter((b: any) => b.status === filters.status);
  }
  if (filters.dateFrom) {
    practiceBookings = practiceBookings.filter((b: any) => new Date(b.createdAt) >= new Date(filters.dateFrom));
  }
  if (filters.dateTo) {
    practiceBookings = practiceBookings.filter((b: any) => new Date(b.createdAt) <= new Date(filters.dateTo));
  }
  const blockedSlots = blockedSlotsQuery.data || [];

  const handleCancel = (booking: any, type: "lesson" | "practice") => {
    if (type === "lesson") {
      cancelLessonMutation.mutate({ bookingId: booking.id });
    } else {
      cancelPracticeMutation.mutate({ bookingId: booking.id });
    }
  };

  const handleBlockSlot = () => {
    if (blockData.blockDate && blockData.startTime && blockData.endTime) {
      blockSlotMutation.mutate({
        blockDate: blockData.blockDate,
        startTime: blockData.startTime,
        endTime: blockData.endTime,
        reason: blockData.reason,
      });
    }
  };

  const buttonStyle = {
    padding: "0.5rem 0.75rem",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    marginRight: "0.5rem",
  };

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
              Manage bookings and time slots
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
        <div className="grid md:grid-cols-4 gap-6 mb-12">
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
          <div className="p-6 rounded-lg" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              BLOCKED SLOTS
            </p>
            <p className="font-display text-3xl" style={{ color: C.accent, fontWeight: 600 }}>
              {blockedSlots.length}
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
          <button
            onClick={() => setActiveTab("blocked")}
            style={{
              padding: "1rem 1.5rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "blocked" ? `3px solid ${C.accent}` : "none",
              color: activeTab === "blocked" ? C.accent : C.muted,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Blocked Time Slots ({blockedSlots.length})
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 p-4 rounded-lg" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontWeight: 600, marginBottom: "1rem" }}>Filters</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${C.border}`,
                  borderRadius: "0.375rem",
                  color: C.text,
                }}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${C.border}`,
                  borderRadius: "0.375rem",
                  color: C.text,
                }}
              />
            </div>
            <div>
              <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${C.border}`,
                  borderRadius: "0.375rem",
                  color: C.text,
                }}
              />
            </div>
          </div>
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
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg" style={{ color: C.text, fontWeight: 500 }}>
                          {booking.studentName}
                        </h3>
                        <p style={{ color: C.muted, fontSize: "0.9rem", marginTop: "0.25rem" }}>
                          Teacher: <strong>{booking.teacherName}</strong> • {booking.duration} min
                        </p>
                      </div>
                      <span
                        style={{
                          padding: "0.35rem 0.75rem",
                          background: booking.status === "cancelled" ? "#f5d5d5" : `${C.accent}20`,
                          color: booking.status === "cancelled" ? "#c33" : C.accent,
                          borderRadius: "0.25rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "1rem" }}>
                      Email: <a href={`mailto:${booking.studentEmail}`} style={{ color: C.accent, textDecoration: "none" }}>
                        {booking.studentEmail}
                      </a>
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleCancel(booking, "lesson")}
                        style={{
                          ...buttonStyle,
                          background: "#f5d5d5",
                          color: "#c33",
                        }}
                      >
                        <Trash2 size={14} /> Cancel
                      </button>
                      <button
                        onClick={() => {
                          setRescheduleData({ bookingId: booking.id, newDate: "", newTime: "", notes: "" });
                          setShowRescheduleModal(true);
                        }}
                        style={{
                          ...buttonStyle,
                          background: `${C.accent}20`,
                          color: C.accent,
                        }}
                      >
                        <Edit3 size={14} /> Reschedule
                      </button>
                    </div>
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
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg" style={{ color: C.text, fontWeight: 500 }}>
                          {booking.studentName}
                        </h3>
                        <p style={{ color: C.muted, fontSize: "0.9rem", marginTop: "0.25rem" }}>
                          Room: <strong>{booking.roomType === "premium" ? "Premium" : "Standard"}</strong> • {booking.hours} hour{booking.hours !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <span
                        style={{
                          padding: "0.35rem 0.75rem",
                          background: booking.status === "cancelled" ? "#f5d5d5" : `${C.accent}20`,
                          color: booking.status === "cancelled" ? "#c33" : C.accent,
                          borderRadius: "0.25rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "1rem" }}>
                      Email: <a href={`mailto:${booking.studentEmail}`} style={{ color: C.accent, textDecoration: "none" }}>
                        {booking.studentEmail}
                      </a>
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleCancel(booking, "practice")}
                        style={{
                          ...buttonStyle,
                          background: "#f5d5d5",
                          color: "#c33",
                        }}
                      >
                        <Trash2 size={14} /> Cancel
                      </button>
                      <button
                        onClick={() => {
                          setRescheduleData({ bookingId: booking.id, newDate: "", newTime: "", notes: "" });
                          setShowRescheduleModal(true);
                        }}
                        style={{
                          ...buttonStyle,
                          background: `${C.accent}20`,
                          color: C.accent,
                        }}
                      >
                        <Edit3 size={14} /> Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "blocked" && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setShowBlockModal(true)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: C.accent,
                  color: C.white,
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Lock size={16} /> Block New Time Slot
              </button>
            </div>

            {blockedSlotsQuery.isLoading ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "2rem" }}>
                Loading blocked time slots...
              </div>
            ) : blockedSlots.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: C.white,
                  borderRadius: "0.5rem",
                  border: `1px solid ${C.border}`,
                }}
              >
                <p style={{ color: C.muted }}>No blocked time slots</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blockedSlots.map((slot: any) => (
                  <div
                    key={slot.id}
                    style={{
                      padding: "1.5rem",
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-display text-lg" style={{ color: C.text, fontWeight: 500 }}>
                          {slot.blockDate} • {slot.startTime} - {slot.endTime}
                        </h3>
                        {slot.reason && (
                          <p style={{ color: C.muted, fontSize: "0.9rem", marginTop: "0.25rem" }}>
                            Reason: <strong>{slot.reason}</strong>
                          </p>
                        )}
                        {slot.roomType && (
                          <p style={{ color: C.muted, fontSize: "0.9rem" }}>
                            Room: <strong>{slot.roomType}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => unblockSlotMutation.mutate({ slotId: slot.id })}
                      style={{
                        ...buttonStyle,
                        background: "#f5d5d5",
                        color: "#c33",
                        marginRight: 0,
                      }}
                    >
                      <Trash2 size={14} /> Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Block Time Slot Modal */}
      {showBlockModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowBlockModal(false)}
        >
          <div
            className="w-full max-w-md rounded-lg p-6"
            style={{ background: C.white, border: `1px solid ${C.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl mb-4" style={{ color: C.text, fontWeight: 500 }}>
              Block Time Slot
            </h2>

            <div className="space-y-4">
              <div>
                <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                  Date
                </label>
                <input
                  type="date"
                  value={blockData.blockDate}
                  onChange={(e) => setBlockData({ ...blockData, blockDate: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    color: C.text,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={blockData.startTime}
                    onChange={(e) => setBlockData({ ...blockData, startTime: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: `1px solid ${C.border}`,
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      color: C.text,
                    }}
                  />
                </div>
                <div>
                  <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                    End Time
                  </label>
                  <input
                    type="time"
                    value={blockData.endTime}
                    onChange={(e) => setBlockData({ ...blockData, endTime: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: `1px solid ${C.border}`,
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      color: C.text,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                  Reason (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Maintenance, Staff Meeting"
                  value={blockData.reason}
                  onChange={(e) => setBlockData({ ...blockData, reason: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    color: C.text,
                  }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleBlockSlot}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: C.accent,
                    color: C.white,
                    border: "none",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Block Slot
                </button>
                <button
                  onClick={() => setShowBlockModal(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: C.card,
                    color: C.text,
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowRescheduleModal(false)}
        >
          <div
            className="w-full max-w-md rounded-lg p-6"
            style={{ background: C.white, border: `1px solid ${C.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl mb-4" style={{ color: C.text, fontWeight: 500 }}>
              Reschedule Booking
            </h2>

            <div className="space-y-4">
              <div>
                <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleData.newDate}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    color: C.text,
                  }}
                />
              </div>

              <div>
                <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                  New Time
                </label>
                <input
                  type="time"
                  value={rescheduleData.newTime}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, newTime: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    color: C.text,
                  }}
                />
              </div>

              <div>
                <label style={{ color: C.text, fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
                  Notes (Optional)
                </label>
                <textarea
                  value={rescheduleData.notes}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, notes: e.target.value })}
                  placeholder="Add any notes about the reschedule..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    color: C.text,
                    minHeight: "80px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowRescheduleModal(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: C.accent,
                    color: C.white,
                    border: "none",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: C.card,
                    color: C.text,
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
