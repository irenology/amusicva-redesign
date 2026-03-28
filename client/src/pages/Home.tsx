import { useEffect, useState } from "react";
import { Menu, X, Music, MapPin, Clock, Mail, ChevronDown, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

// ─── Color Tokens ─────────────────────────────────────────────

const C = {
  bg:       "#FAF7F2",
  bgAlt:    "#F5EFE6",
  card:     "#F2EDE4",
  border:   "#D4C5A9",
  text:     "#2C1A0E",
  textMid:  "#5C3D20",
  muted:    "#8B7355",
  accent:   "#B8860B",
  accentHover: "#9A7009",
  white:    "#FDFCF9",
};

// ─── Image URLs ───────────────────────────────────────────────

const LESSONS_IMG     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/music-lessons-DBvXHve9iDTfF8DnJacAEQ.webp";
const INSTRUMENTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/instruments-collage-D3j55uxi2k8BPmw3bFSwkm.webp";
const PERFORMANCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/hero-performance-Nidvp7kDrsnypDvYJ9wdtC.webp";

// ─── Vimeo Video ID from original site ───────────────────────

const VIMEO_ID = "1088841151";

// ─── Faculty Data ─────────────────────────────────────────────

const faculty = [
  {
    name: "Norman Charette",
    instrument: "Piano",
    short: "DMA Candidate, Indiana University MM. Faculty at College of William & Mary. Performed across the US and in China's 2024 China-US Youth Festival.",
    unsplash: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=763,fit=crop/A3QOXG1bN1tJNqOp/20250505_164140---zoomed---pop---shadow-removed-YZ98qkboDRFaq67p.jpg",
  },
  {
    name: "Bogdan (Bobo) Pejić",
    instrument: "Guitar, Ukulele & Composition",
    short: "Internationally acclaimed guitarist with 1,400+ concerts across Europe and South America. Founding member of Beltango Quinteto.",
    unsplash: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=763,fit=crop/A3QOXG1bN1tJNqOp/dsc04692~2-AoPJebP3vySaZOpR.jpg",
  },
  {
    name: "Vesna Pejić",
    instrument: "Violin, Viola & Ukulele",
    short: "Professional violist and violinist with 20+ years of experience. Performed with orchestras across Europe including Austria, France, Italy, Spain, and Sweden.",
    unsplash: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=763,fit=crop/A3QOXG1bN1tJNqOp/fb_img_1739448270556-mv0Jjby5X3F0vPbO.jpg",
  },
  {
    name: "Erin McAfee",
    instrument: "Flute & Piccolo",
    short: "DC-based flutist, winner of the 2025 UW Wind Ensemble concerto competition. Member of the prestigious DCFlutes ensemble.",
    unsplash: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=763,fit=crop/A3QOXG1bN1tJNqOp/erin-mcafee-1-A1azw0DnWBu5GgkQ.jpeg",
  },
  {
    name: "Teymour Saifi",
    instrument: "Electric Bass",
    short: "DC-based bassist, composer, and educator. Georgetown University music theory and performance studies. Performs across rock, ambient, and experimental genres.",
    unsplash: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=763,fit=crop/A3QOXG1bN1tJNqOp/teymour-saifi-1-jpeg-m7VDw0bQVLSqo8zY.jpg",
  },
];

// ─── Scroll Reveal Hook ───────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Divider ──────────────────────────────────────────────────

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${C.accent}55, transparent)`,
        margin: "0 0 5rem",
      }}
    />
  );
}

// ─── Booking Modal ─────────────────────────────────────────────

function BookingModal({ isOpen, onClose, preSelectedTeacher }: { isOpen: boolean; onClose: () => void; preSelectedTeacher?: string }) {
  const [bookingType, setBookingType] = useState<"lesson" | "practice" | null>(preSelectedTeacher ? "lesson" : null);
  const [selectedTeacher, setSelectedTeacher] = useState<string>(preSelectedTeacher || "");

  useEffect(() => {
    if (preSelectedTeacher) {
      setBookingType("lesson");
      setSelectedTeacher(preSelectedTeacher);
    }
  }, [preSelectedTeacher, isOpen]);
  const [lessonData, setLessonData] = useState({ name: "", email: "", teacher: preSelectedTeacher || "", duration: "" });
  const [practiceData, setPracticeData] = useState({ type: "", hours: "", name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const submitLesson = trpc.bookings.submitLessonBooking.useMutation();

  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLesson.mutateAsync({
        studentName: lessonData.name,
        studentEmail: lessonData.email,
        teacherName: lessonData.teacher,
        duration: lessonData.duration as "30" | "45" | "60",
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setBookingType(null);
        setLessonData({ teacher: "", duration: "", name: "", email: "" });
      }, 2000);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const submitPractice = trpc.bookings.submitPracticeRoomBooking.useMutation();

  const handlePracticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitPractice.mutateAsync({
        studentName: practiceData.name,
        studentEmail: practiceData.email,
        roomType: practiceData.type as "standard" | "premium",
        hours: parseInt(practiceData.hours),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setBookingType(null);
        setPracticeData({ type: "", hours: "", name: "", email: "" });
      }, 2000);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl"
        style={{ background: C.white, maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between p-6 border-b"
          style={{ background: C.card, borderColor: C.border }}
        >
          <div className="flex items-center gap-4">
            {bookingType && (
              <button
                onClick={() => setBookingType(null)}
                className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: C.accent, background: "none", border: "none" }}
                title="Go back to booking options"
              >
                <ChevronDown size={24} style={{ transform: "rotate(90deg)" }} />
              </button>
            )}
            <h2 className="font-display text-2xl" style={{ color: C.text, fontWeight: 500 }}>
              {!bookingType ? "What would you like to book?" : bookingType === "lesson" ? "Book a Lesson" : "Rent a Practice Room"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: C.muted, background: "none", border: "none" }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {!bookingType ? (
            // Type Selection
            <div className="space-y-4">
              <button
                onClick={() => setBookingType("lesson")}
                className="w-full p-6 rounded text-left transition-all hover:shadow-md"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.white)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.card)}
              >
                <h3 className="font-display text-lg mb-2" style={{ color: C.text, fontWeight: 500 }}>
                  Book a Music Lesson
                </h3>
                <p style={{ color: C.muted, fontSize: "0.9rem" }}>
                  Schedule a lesson with one of our world-class instructors
                </p>
              </button>

              <button
                onClick={() => setBookingType("practice")}
                className="w-full p-6 rounded text-left transition-all hover:shadow-md"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.white)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.card)}
              >
                <h3 className="font-display text-lg mb-2" style={{ color: C.text, fontWeight: 500 }}>
                  Rent a Practice Room
                </h3>
                <p style={{ color: C.muted, fontSize: "0.9rem" }}>
                  Reserve our professional practice rooms by the hour
                </p>
              </button>
            </div>
          ) : submitted ? (
            // Success Message
            <div className="text-center py-12">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
              <h3 className="font-display text-2xl mb-3" style={{ color: C.text, fontWeight: 500 }}>
                Booking Request Submitted!
              </h3>
              <p style={{ color: C.muted, fontSize: "0.95rem" }}>
                We'll contact you shortly to confirm your booking and discuss details.
              </p>
            </div>
          ) : bookingType === "lesson" ? (
            // Lesson Form
            <form onSubmit={handleLessonSubmit} className="space-y-4">
              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Teacher
                </label>
                <select
                  value={lessonData.teacher}
                  onChange={(e) => setLessonData({ ...lessonData, teacher: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                >
                  <option value="">Select a teacher</option>
                  {faculty.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name} ({f.instrument})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Duration
                </label>
                <select
                  value={lessonData.duration}
                  onChange={(e) => setLessonData({ ...lessonData, duration: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                >
                  <option value="">Select duration</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={lessonData.name}
                  onChange={(e) => setLessonData({ ...lessonData, name: e.target.value })}
                  required
                  placeholder="Jane Smith"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                />
              </div>

              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={lessonData.email}
                  onChange={(e) => setLessonData({ ...lessonData, email: e.target.value })}
                  required
                  placeholder="jane@example.com"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                />
              </div>

              <p style={{ color: C.muted, fontSize: "0.85rem", fontStyle: "italic" }}>
                For pricing and available times, please contact us at appassionatava@gmail.com
              </p>

              <button
                type="submit"
                className="w-full py-3 rounded font-ui text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
                style={{ background: C.accent, color: C.white, border: "none" }}
              >
                Submit Booking Request
              </button>
            </form>
          ) : (
            // Practice Room Form
            <form onSubmit={handlePracticeSubmit} className="space-y-4">
              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Room Type
                </label>
                <select
                  value={practiceData.type}
                  onChange={(e) => setPracticeData({ ...practiceData, type: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                >
                  <option value="">Select room type</option>
                  <option value="standard">Standard Practice Room</option>
                  <option value="premium">Premium Practice Room (with piano)</option>
                </select>
              </div>

              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={practiceData.hours}
                  onChange={(e) => setPracticeData({ ...practiceData, hours: e.target.value })}
                  required
                  placeholder="Number of hours"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                />
              </div>

              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={practiceData.name}
                  onChange={(e) => setPracticeData({ ...practiceData, name: e.target.value })}
                  required
                  placeholder="Jane Smith"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                />
              </div>

              <div>
                <label style={{ color: C.muted, fontSize: "0.85rem", fontWeight: 600 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={practiceData.email}
                  onChange={(e) => setPracticeData({ ...practiceData, email: e.target.value })}
                  required
                  placeholder="jane@example.com"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: `1px solid ${C.border}`,
                    borderRadius: "0.5rem",
                    color: C.text,
                    background: C.white,
                  }}
                />
              </div>

              <p style={{ color: C.muted, fontSize: "0.85rem", fontStyle: "italic" }}>
                For pricing and availability, please contact us at appassionatava@gmail.com
              </p>

              <button
                type="submit"
                className="w-full py-3 rounded font-ui text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
                style={{ background: C.accent, color: C.white, border: "none" }}
              >
                Submit Booking Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────

function Nav({ onBookClick }: { onBookClick: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Our Vision", href: "#vision" },
    { label: "Lessons", href: "#lessons" },
    { label: "Faculty", href: "#faculty" },
    { label: "Spaces", href: "#spaces" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${C.white}F0` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${C.accent}18`, border: `1px solid ${C.accent}50` }}
          >
            <Music size={16} style={{ color: C.accent }} />
          </div>
          <div>
            <div className="font-display text-lg leading-none" style={{ color: C.text, fontWeight: 600 }}>
              Appassionata
            </div>
            <div
              className="font-ui text-xs tracking-widest uppercase"
              style={{ color: C.accent, letterSpacing: "0.15em" }}
            >
              Music School of VA
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-ui text-sm tracking-wide transition-colors duration-200 relative group"
              style={{ color: C.textMid, fontWeight: 400, letterSpacing: "0.04em" }}
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: C.accent }}
              />
            </a>
          ))}
          <button
            onClick={onBookClick}
            className="font-ui text-sm px-5 py-2 rounded transition-all duration-200 hover:opacity-90 cursor-pointer"
            style={{ background: C.accent, color: C.white, fontWeight: 600, letterSpacing: "0.05em", border: "none" }}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: C.text }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: `${C.white}F8`, backdropFilter: "blur(12px)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-ui text-base py-2 border-b"
              style={{ color: C.textMid, borderColor: C.border }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              onBookClick();
              setOpen(false);
            }}
            className="font-ui text-sm px-5 py-3 rounded text-center mt-2 w-full cursor-pointer"
            style={{ background: C.accent, color: C.white, fontWeight: 600, border: "none" }}
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section (with Vimeo video) ─────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: C.bg }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 70% 40%, ${C.accent}0A 0%, transparent 60%)`,
        }}
      />

      <div className="container relative z-10 py-16 flex flex-col items-center text-center">
        {/* Tag */}
        <div
          className="inline-flex items-center gap-2 mb-8 font-ui text-xs tracking-widest uppercase"
          style={{ color: C.accent, letterSpacing: "0.2em" }}
        >
          <span className="w-8 h-px" style={{ background: C.accent }} />
          Fairfax, Virginia
          <span className="w-8 h-px" style={{ background: C.accent }} />
        </div>

        {/* Headline */}
        <h1
          className="font-display mb-6 leading-none"
          style={{
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            color: C.text,
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Learn with Joy,
          <br />
          <span style={{ color: C.accent, fontStyle: "italic", fontWeight: 500 }}>
            Play with Passion.
          </span>
        </h1>

        <p
          className="mb-10 max-w-xl leading-relaxed"
          style={{ color: C.muted, fontSize: "1.1rem", fontWeight: 300 }}
        >
          World-class musicians. Personalized instruction. A community where students
          don't just learn music —{" "}
          <em style={{ color: C.textMid }}>they learn to shine, connect, and be heard.</em>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <a
            href="#lessons"
            className="font-ui px-8 py-3.5 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: C.accent, color: C.white, fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.05em" }}
          >
            Explore Lessons
          </a>
          <a
            href="#vision"
            className="font-ui px-8 py-3.5 rounded transition-all duration-200"
            style={{
              border: `1px solid ${C.border}`,
              color: C.textMid,
              fontWeight: 400,
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
              background: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.card)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Our Vision
          </a>
        </div>

        {/* ── Vimeo Video ── */}
        <div
          className="w-full max-w-3xl rounded overflow-hidden"
          style={{
            border: `1px solid ${C.border}`,
            boxShadow: `0 20px 60px ${C.accent}15`,
          }}
        >
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Appassionata Music School"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Vision Section ───────────────────────────────────────────

function Vision() {
  return (
    <section id="vision" className="py-24" style={{ background: C.bg }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="reveal" style={{ transitionDelay: "0s" }}>
            <div
              className="inline-flex items-center gap-2 mb-4 font-ui text-xs tracking-widest uppercase"
              style={{ color: C.accent, letterSpacing: "0.2em" }}
            >
              <span className="w-4 h-px" style={{ background: C.accent }} />
              Our Vision
            </div>

            <h2
              className="font-display mb-6 leading-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: C.text,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              More than a music school —
              <br />
              <span style={{ color: C.accent, fontStyle: "italic" }}>a launchpad for life.</span>
            </h2>

            <p
              className="mb-6 leading-relaxed"
              style={{ color: C.textMid, fontSize: "1rem", fontWeight: 300 }}
            >
              At Appassionata Music School of VA, our instructors are professional musicians — many holding advanced degrees including doctorates and masters. Our faculty has performed on stages across <strong>Europe, America, and Asia</strong>, bringing real-world, international experience directly into the classroom.
            </p>

            <p
              className="mb-8 leading-relaxed"
              style={{ color: C.textMid, fontSize: "1rem", fontWeight: 300 }}
            >
              We don't just teach notes and techniques. We teach <em>confidence, stage presence, and the art of storytelling through music</em>.
            </p>

            <p
              className="mb-8 leading-relaxed"
              style={{ color: C.textMid, fontSize: "1rem", fontWeight: 300 }}
            >
              Our students gain ongoing live performance opportunities at community events, concerts, festivals, and competitions — building not just skill, but character.
            </p>

            {/* Outcomes Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "How to perform with confidence",
                "How to express emotion through music",
                "How to practice and problem-solve",
                "How to collaborate and lead",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Star size={16} style={{ color: C.accent, flexShrink: 0, marginTop: "0.25rem" }} />
                  <p style={{ color: C.textMid, fontSize: "0.95rem", fontWeight: 300 }}>{item}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              className="p-6 rounded"
              style={{
                background: `${C.accent}08`,
                border: `1px solid ${C.accent}20`,
                borderLeft: `4px solid ${C.accent}`,
              }}
            >
              <p style={{ color: C.textMid, fontSize: "1rem", fontStyle: "italic", fontWeight: 300 }}>
                "Appassionata transformed my musical journey with exceptional teachers and a supportive community."
              </p>
              <p style={{ color: C.muted, fontSize: "0.85rem", marginTop: "0.5rem" }}>— Student Review</p>
            </div>
          </div>

          {/* Right: Lessons Info */}
          <div className="reveal" style={{ transitionDelay: "0.08s" }}>
            <div
              className="p-8 rounded"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <h3 className="font-display text-2xl mb-6" style={{ color: C.text, fontWeight: 500 }}>
                Individual & Group Lessons
              </h3>

              <p
                className="mb-6 leading-relaxed"
                style={{ color: C.textMid, fontSize: "0.95rem", fontWeight: 300 }}
              >
                Personalized one-on-one instruction tailored to your goals, or collaborative group sessions that build ensemble skills and musical community.
              </p>

              <a
                href="#lessons"
                className="font-ui inline-block px-8 py-3.5 rounded transition-all hover:opacity-90"
                style={{ background: C.accent, color: C.white, fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.05em" }}
              >
                Book a Lesson
              </a>
            </div>
          </div>
        </div>
      </div>

      <Divider />
    </section>
  );
}

// ─── Lessons Section ──────────────────────────────────────────

// Map lessons to teachers
const lessonToTeacher: Record<string, string> = {
  "Piano": "Norman Charette",
  "Guitar & Ukulele": "Bogdan (Bobo) Pejić",
  "Violin & Viola": "Vesna Pejić",
  "Flute & Piccolo": "Erin McAfee",
  "Electric Bass": "Teymour Saifi",
  "Composition": "Bogdan (Bobo) Pejić",
};

function Lessons({ onLessonClick }: { onLessonClick: (teacher: string) => void }) {
  const lessons = [
    { icon: "🎹", title: "Piano", desc: "Classical, contemporary, and jazz piano for all ages and skill levels." },
    { icon: "🎸", title: "Guitar & Ukulele", desc: "Classical, jazz, tango, and contemporary guitar. Ukulele for all ages." },
    { icon: "🎻", title: "Violin & Viola", desc: "From beginner to competition-ready. Chamber music and ensemble work." },
    { icon: "🎵", title: "Flute & Piccolo", desc: "Solo, orchestral, and chamber flute. All levels from beginner to advanced." },
    { icon: "🎸", title: "Electric Bass", desc: "Rock, jazz, ambient, and experimental. Improvisation and composition." },
    { icon: "🎼", title: "Composition", desc: "Learn to write and arrange music across genres with expert guidance." },
  ];

  return (
    <section id="lessons" className="py-24" style={{ background: C.bg }}>
      <div className="container">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 font-ui text-xs tracking-widest uppercase"
            style={{ color: C.accent, letterSpacing: "0.2em" }}
          >
            <span className="w-4 h-px" style={{ background: C.accent }} />
            Lessons
            <span className="w-4 h-px" style={{ background: C.accent }} />
          </div>

          <h2
            className="font-display mb-6 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: C.text,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Find your instrument,
            <br />
            <span style={{ color: C.accent, fontStyle: "italic" }}>find your voice.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {lessons.map((lesson, i) => (
            <div
              key={i}
              className="reveal p-8 rounded transition-all hover:shadow-lg cursor-pointer"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                transitionDelay: `${i * 0.04}s`,
              }}
              onClick={() => onLessonClick(lessonToTeacher[lesson.title])}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.white;
                e.currentTarget.style.borderColor = C.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = C.card;
                e.currentTarget.style.borderColor = C.border;
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{lesson.icon}</div>
              <h3 className="font-display text-xl mb-3" style={{ color: C.text, fontWeight: 500 }}>
                {lesson.title}
              </h3>
              <p style={{ color: C.muted, fontSize: "0.95rem", fontWeight: 300, lineHeight: "1.6" }}>
                {lesson.desc}
              </p>
              <p style={{ color: C.accent, fontSize: "0.85rem", fontWeight: 500, marginTop: "1rem" }}>
                → Click to book with {lessonToTeacher[lesson.title]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </section>
  );
}

// ─── Faculty Section ──────────────────────────────────────────

function Faculty() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="faculty" className="py-24" style={{ background: C.bg }}>
      <div className="container">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 font-ui text-xs tracking-widest uppercase"
            style={{ color: C.accent, letterSpacing: "0.2em" }}
          >
            <span className="w-4 h-px" style={{ background: C.accent }} />
            Our Faculty
            <span className="w-4 h-px" style={{ background: C.accent }} />
          </div>

          <h2
            className="font-display mb-6 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: C.text,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            World-class musicians.
            <br />
            <span style={{ color: C.accent, fontStyle: "italic" }}>Dedicated teachers.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-8">
          {faculty.map((f, i) => (
            <div
              key={i}
              className="reveal cursor-pointer transition-all"
              style={{ transitionDelay: `${i * 0.04}s` }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div
                className="relative rounded overflow-hidden mb-4 aspect-square group"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src={f.unsplash}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to top, ${C.text}80, transparent)` }}
                >
                  <p style={{ color: C.white, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                    Click to learn more
                  </p>
                </div>
              </div>

              <h3 className="font-display text-lg mb-1" style={{ color: C.text, fontWeight: 500 }}>
                {f.name}
              </h3>
              <p className="font-ui text-xs" style={{ color: C.accent, letterSpacing: "0.05em", fontWeight: 600 }}>
                {f.instrument}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center font-ui text-sm" style={{ color: C.muted, letterSpacing: "0.05em" }}>
          Click any faculty member to learn more
        </p>

        {/* Expanded Bio */}
        {expanded !== null && (
          <div
            className="mt-12 p-8 rounded"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-2xl mb-2" style={{ color: C.text, fontWeight: 500 }}>
                  {faculty[expanded].name}
                </h3>
                <p style={{ color: C.accent, fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {faculty[expanded].instrument}
                </p>
              </div>
              <button
                onClick={() => setExpanded(null)}
                className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: C.muted, background: "none", border: "none" }}
              >
                <X size={20} />
              </button>
            </div>
            <p style={{ color: C.textMid, fontSize: "0.95rem", fontWeight: 300, lineHeight: "1.7" }}>
              {faculty[expanded].short}
            </p>
          </div>
        )}
      </div>

      <Divider />
    </section>
  );
}

// ─── Spaces Section ───────────────────────────────────────────

function Spaces() {
  const [expandedSpace, setExpandedSpace] = useState<number | null>(null);

  const spaces = [
    {
      title: "Practice Rooms",
      desc: "Professional practice rooms used by our faculty for lessons, available for individual rental. Equipped with quality instruments and acoustically treated.",
      features: ["Daily availability 6am–2am", "Acoustic treatment", "Quality instruments provided", "Flexible hourly rental"],
      images: [
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=553,fit=crop/A3QOXG1bN1tJNqOp/screenshot_20250513_205155_photos-Yan14BQM49c4X9xV.jpg",
      ],
    },
    {
      title: "Performance Space",
      desc: "Our elegant performance space is available for recitals, showcases, concerts, and private events. Perfect for student recitals or professional performances.",
      features: ["Concert-quality grand piano", "Professional lighting", "Ideal for recitals & events", "Rental inquiries welcome"],
      images: [
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=932,fit=crop/A3QOXG1bN1tJNqOp/polish_20250611_005501641-YBgbgg63pnuxj3Ro.jpg",
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=512,fit=crop/A3QOXG1bN1tJNqOp/polish_20250611_010008888-Awv9vvVzM4S7ee4P.jpg",
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=563,fit=crop/A3QOXG1bN1tJNqOp/mmexport1747177511454-Aq2W7gQaarC2n1pJ.jpg",
      ],
    },
  ];

  return (
    <section id="spaces" className="py-24" style={{ background: C.bg }}>
      <div className="container">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 font-ui text-xs tracking-widest uppercase"
            style={{ color: C.accent, letterSpacing: "0.2em" }}
          >
            <span className="w-4 h-px" style={{ background: C.accent }} />
            Our Spaces
            <span className="w-4 h-px" style={{ background: C.accent }} />
          </div>

          <h2
            className="font-display mb-6 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: C.text,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Practice. Perform.
            <br />
            <span style={{ color: C.accent, fontStyle: "italic" }}>Make it yours.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {spaces.map((space, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div
                className="p-8 rounded cursor-pointer transition-all hover:shadow-lg"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                onClick={() => setExpandedSpace(expandedSpace === i ? null : i)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.white;
                  e.currentTarget.style.borderColor = C.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                <h3 className="font-display text-2xl mb-4" style={{ color: C.text, fontWeight: 500 }}>
                  {space.title}
                </h3>

                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: C.textMid, fontSize: "0.95rem", fontWeight: 300 }}
                >
                  {space.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {space.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span style={{ color: C.accent, fontWeight: 600 }}>✓</span>
                      <span style={{ color: C.muted, fontSize: "0.9rem", fontWeight: 300 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <p style={{ color: C.accent, fontSize: "0.85rem", fontWeight: 500 }}>
                  → Click to view {space.images.length} photo{space.images.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Image Gallery Modal */}
              {expandedSpace === i && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
                  onClick={() => setExpandedSpace(null)}
                >
                  <div
                    className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl"
                    style={{ background: C.white, maxHeight: "90vh", overflowY: "auto" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div
                      className="sticky top-0 flex items-center justify-between p-6 border-b"
                      style={{ background: C.card, borderColor: C.border }}
                    >
                      <h2 className="font-display text-2xl" style={{ color: C.text, fontWeight: 500 }}>
                        {space.title}
                      </h2>
                      <button
                        onClick={() => setExpandedSpace(null)}
                        className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
                        style={{ color: C.muted, background: "none", border: "none" }}
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Gallery */}
                    <div className="p-8">
                      <div className="space-y-6">
                        {space.images.map((img, idx) => (
                          <div key={idx} className="rounded overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                            <img
                              src={img}
                              alt={`${space.title} ${idx + 1}`}
                              className="w-full h-auto object-cover"
                              style={{ maxHeight: "500px" }}
                            />
                          </div>
                        ))}
                      </div>
                      <p style={{ color: C.muted, fontSize: "0.85rem", marginTop: "1rem", textAlign: "center" }}>
                        {space.images.length} photo{space.images.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────

function Contact({ onBookClick }: { onBookClick: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: `1px solid ${C.border}`,
    borderRadius: "0.5rem",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    color: C.text,
    background: C.white,
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="py-24" style={{ background: C.bg }}>
      <div className="container">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 font-ui text-xs tracking-widest uppercase"
            style={{ color: C.accent, letterSpacing: "0.2em" }}
          >
            <span className="w-4 h-px" style={{ background: C.accent }} />
            Contact & Location
            <span className="w-4 h-px" style={{ background: C.accent }} />
          </div>

          <h2
            className="font-display mb-6 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: C.text,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Start your
            <br />
            <span style={{ color: C.accent, fontStyle: "italic" }}>music journey today.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="reveal" style={{ transitionDelay: "0s" }}>
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  content: "3911 Blenheim Blvd, Unit 43C\nFairfax, VA 22030",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  content: "Weekday Lessons: Mon–Fri, 2pm–9pm\nWeekend Lessons: Sat–Sun, 10am–6pm\nPractice Rooms: Daily, 6am–2am",
                },
                {
                  icon: Mail,
                  label: "Online",
                  content: "amusicva.com\nBook a Lesson Online",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon size={18} style={{ color: C.accent }} />
                    <p
                      className="font-ui text-xs uppercase tracking-widest"
                      style={{ color: C.muted, letterSpacing: "0.1em" }}
                    >
                      {item.label}
                    </p>
                  </div>
                  <p
                    style={{
                      color: C.textMid,
                      fontSize: "0.95rem",
                      fontWeight: 300,
                      whiteSpace: "pre-line",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={onBookClick}
              className="font-ui inline-block px-8 py-3.5 rounded transition-all hover:opacity-90 cursor-pointer mt-8"
              style={{ background: C.accent, color: C.white, fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.05em", border: "none" }}
            >
              Book a Lesson Online
            </button>
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{ transitionDelay: "0.12s" }}>
            <div
              className="p-8 rounded"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <h3 className="font-display text-2xl mb-6" style={{ color: C.text, fontWeight: 500 }}>
                Send an Inquiry
              </h3>

              {sent && (
                <div
                  className="mb-5 p-4 rounded font-ui text-sm"
                  style={{ background: `${C.accent}15`, border: `1px solid ${C.accent}40`, color: C.accent }}
                >
                  Thank you! We'll be in touch soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Jane Smith", required: true },
                  { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
                  { id: "phone", label: "Phone (optional)", type: "tel", placeholder: "+1 (555) 000-0000", required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block font-ui text-xs uppercase tracking-widest mb-2"
                      style={{ color: C.muted, letterSpacing: "0.1em" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = `${C.accent}80`)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block font-ui text-xs uppercase tracking-widest mb-2"
                    style={{ color: C.muted, letterSpacing: "0.1em" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us about your musical goals..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = `${C.accent}80`)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded font-ui text-sm font-semibold transition-all hover:opacity-90 mt-2 cursor-pointer"
                  style={{ background: C.accent, color: C.white, letterSpacing: "0.05em", border: "none" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-12" style={{ background: C.card, borderTop: `1px solid ${C.border}` }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-display text-2xl mb-1" style={{ color: C.text, fontWeight: 500 }}>
              Appassionata
            </div>
            <div className="font-ui text-xs tracking-widest uppercase" style={{ color: C.accent, letterSpacing: "0.15em" }}>
              Music School of Virginia
            </div>
            <p className="font-ui text-xs mt-3" style={{ color: C.muted, fontWeight: 300 }}>
              3911 Blenheim Blvd, Unit 43C · Fairfax, VA 22030
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { label: "Our Vision", href: "#vision" },
              { label: "Lessons", href: "#lessons" },
              { label: "Faculty", href: "#faculty" },
              { label: "Spaces", href: "#spaces" },
              { label: "Contact", href: "#contact" },
              { label: "Book Online", href: "#" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-ui text-xs transition-colors"
                style={{ color: C.muted, letterSpacing: "0.05em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <p className="font-ui text-xs" style={{ color: C.muted }}>
            © {new Date().getFullYear()} Appassionata Music School of Virginia. All rights reserved.
          </p>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs transition-colors"
            style={{ color: C.muted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ──────────────────────────────────────────

export default function Home() {
  useReveal();
  const [showCalendly, setShowCalendly] = useState(false);
  const [preSelectedTeacher, setPreSelectedTeacher] = useState<string | undefined>();

  const handleLessonClick = (teacher: string) => {
    setPreSelectedTeacher(teacher);
    setShowCalendly(true);
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <Nav onBookClick={() => { setPreSelectedTeacher(undefined); setShowCalendly(true); }} />
      <BookingModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} preSelectedTeacher={preSelectedTeacher} />
      <Hero />
      <Vision />
      <Lessons onLessonClick={handleLessonClick} />
      <Faculty />
      <Spaces />
      <Contact onBookClick={() => { setPreSelectedTeacher(undefined); setShowCalendly(true); }} />
      <Footer />
    </div>
  );
}
