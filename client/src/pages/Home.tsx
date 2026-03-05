/* =============================================================
   HOME PAGE — ATMOSPHERIC NOIR DESIGN
   Sections: Nav, Hero, Vision, Lessons, Faculty, Spaces, Contact
   Colors: Near-black bg, warm amber accent, off-white text
   Fonts: Cormorant Garamond (display), Source Sans 3 (body), Outfit (UI)
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { Menu, X, Music, MapPin, Clock, Phone, Mail, ChevronDown, Star } from "lucide-react";

// ─── Image URLs (CDN) ────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/hero-piano-7t3PB5qqBMgyZu6tKiyRjB.webp";
const PERFORMANCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/hero-performance-Nidvp7kDrsnypDvYJ9wdtC.webp";
const LESSONS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/music-lessons-DBvXHve9iDTfF8DnJacAEQ.webp";
const INSTRUMENTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333334060/LSYMFpTaKgJ4fs4qHQmZSd/instruments-collage-D3j55uxi2k8BPmw3bFSwkm.webp";

// ─── Faculty Data ─────────────────────────────────────────────
const faculty = [
  {
    name: "Norman Charette",
    instrument: "Piano",
    short: "DMA Candidate, Indiana University MM. Faculty at College of William & Mary. Performed across the US and in China's 2024 China-US Youth Festival.",
    unsplash: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Bogdan (Bobo) Pejić",
    instrument: "Guitar, Ukulele & Composition",
    short: "Internationally acclaimed guitarist with 1,400+ concerts across Europe and South America. Founding member of Beltango Quinteto.",
    unsplash: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Vesna Pejić",
    instrument: "Violin, Viola & Ukulele",
    short: "Professional violist and violinist with 20+ years of experience. Performed with orchestras across Europe including Austria, France, Italy, Spain, and Sweden.",
    unsplash: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Erin McAfee",
    instrument: "Flute & Piccolo",
    short: "DC-based flutist, winner of the 2025 UW Wind Ensemble concerto competition. Member of the prestigious DCFlutes ensemble.",
    unsplash: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Teymour Saifi",
    instrument: "Electric Bass",
    short: "DC-based bassist, composer, and educator. Georgetown University music theory and performance studies. Performs across rock, ambient, and experimental genres.",
    unsplash: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
  },
];

// ─── Scroll Reveal Hook ───────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navigation ───────────────────────────────────────────────
function Nav() {
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
        background: scrolled
          ? "oklch(0.095 0.005 60 / 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 6%)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "oklch(0.72 0.14 70 / 15%)", border: "1px solid oklch(0.72 0.14 70 / 40%)" }}
          >
            <Music size={16} style={{ color: "oklch(0.72 0.14 70)" }} />
          </div>
          <div>
            <div
              className="font-display text-lg leading-none"
              style={{ color: "oklch(0.94 0.008 80)", fontWeight: 600 }}
            >
              Appassionata
            </div>
            <div
              className="font-ui text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.15em" }}
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
              style={{ color: "oklch(0.75 0.008 70)", fontWeight: 400, letterSpacing: "0.05em" }}
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: "oklch(0.72 0.14 70)" }}
              />
            </a>
          ))}
          <a
            href="https://amusicva.com/book-here"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-sm px-5 py-2 rounded transition-all duration-200 hover:opacity-90"
            style={{
              background: "oklch(0.72 0.14 70)",
              color: "oklch(0.095 0.005 60)",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          style={{ color: "oklch(0.94 0.008 80)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "oklch(0.095 0.005 60 / 0.98)", backdropFilter: "blur(12px)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-ui text-base py-2 border-b"
              style={{
                color: "oklch(0.75 0.008 70)",
                borderColor: "oklch(1 0 0 / 6%)",
                letterSpacing: "0.05em",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://amusicva.com/book-here"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-sm px-5 py-3 rounded text-center mt-2"
            style={{
              background: "oklch(0.72 0.14 70)",
              color: "oklch(0.095 0.005 60)",
              fontWeight: 600,
            }}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "oklch(0.095 0.005 60)" }}
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Grand piano on stage"
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, oklch(0.095 0.005 60 / 0.9) 0%, oklch(0.095 0.005 60 / 0.5) 50%, oklch(0.095 0.005 60 / 0.85) 100%)",
          }}
        />
        {/* Amber spotlight glow */}
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.14 70 / 12%) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Tag line */}
          <div
            className="inline-flex items-center gap-2 mb-8 font-ui text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.2em" }}
          >
            <span
              className="w-8 h-px"
              style={{ background: "oklch(0.72 0.14 70)" }}
            />
            Fairfax, Virginia
          </div>

          {/* Main headline */}
          <h1
            className="font-display mb-6 leading-none"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: "oklch(0.94 0.008 80)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Learn with Joy,
            <br />
            <span
              style={{
                color: "oklch(0.72 0.14 70)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Play with Passion.
            </span>
          </h1>

          <p
            className="mb-10 max-w-xl leading-relaxed"
            style={{
              color: "oklch(0.75 0.008 70)",
              fontSize: "1.125rem",
              fontWeight: 300,
            }}
          >
            World-class musicians. Personalized instruction. A community where
            students don't just learn music — they learn to{" "}
            <em style={{ color: "oklch(0.85 0.008 80)" }}>shine, connect, and be heard.</em>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#lessons"
              className="font-ui px-8 py-3.5 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: "oklch(0.72 0.14 70)",
                color: "oklch(0.095 0.005 60)",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              Explore Lessons
            </a>
            <a
              href="#vision"
              className="font-ui px-8 py-3.5 rounded transition-all duration-200 hover:bg-white/10"
              style={{
                border: "1px solid oklch(1 0 0 / 20%)",
                color: "oklch(0.94 0.008 80)",
                fontWeight: 400,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              Our Vision
            </a>
          </div>

          {/* Stats */}
          <div
            className="mt-16 pt-8 flex flex-wrap gap-10"
            style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
          >
            {[
              { value: "5", label: "World-Class Faculty" },
              { value: "5+", label: "Instruments Taught" },
              { value: "All", label: "Skill Levels Welcome" },
              { value: "Daily", label: "Practice Hours Available" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="font-display text-3xl"
                  style={{ color: "oklch(0.72 0.14 70)", fontWeight: 600 }}
                >
                  {s.value}
                </div>
                <div
                  className="font-ui text-xs tracking-wide mt-0.5"
                  style={{ color: "oklch(0.58 0.01 70)", letterSpacing: "0.05em" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown size={20} style={{ color: "oklch(0.72 0.14 70 / 60%)" }} />
      </div>
    </section>
  );
}

// ─── Vision Section ───────────────────────────────────────────
function Vision() {
  return (
    <section id="vision" className="py-28" style={{ background: "oklch(0.095 0.005 60)" }}>
      <div className="container">
        <div className="divider-amber mb-20" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <div
              className="font-ui text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.2em" }}
            >
              Our Vision
            </div>
            <h2
              className="font-display mb-8 leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "oklch(0.94 0.008 80)",
                fontWeight: 400,
              }}
            >
              More than a music school —
              <br />
              <span style={{ fontStyle: "italic", color: "oklch(0.72 0.14 70)" }}>
                a launchpad for life.
              </span>
            </h2>
            <div
              className="space-y-5 leading-relaxed"
              style={{ color: "oklch(0.72 0.01 70)", fontSize: "1.05rem", fontWeight: 300 }}
            >
              <p>
                At Appassionata Music School of VA, our instructors are professional musicians — many holding advanced degrees including doctorates and masters. Our faculty has performed on stages across{" "}
                <strong style={{ color: "oklch(0.85 0.008 80)", fontWeight: 500 }}>Europe, America, and Asia</strong>, bringing real-world, international experience directly into the classroom.
              </p>
              <p>
                We don't just teach notes and techniques. We teach{" "}
                <em style={{ color: "oklch(0.85 0.008 80)" }}>confidence, stage presence, and the art of storytelling through music</em>.
              </p>
              <p>
                Our students gain ongoing live performance opportunities at community events, concerts, festivals, and competitions — building not just skill, but character.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                "How to perform with confidence",
                "How to express emotion through music",
                "How to practice and problem-solve",
                "How to collaborate and lead",
              ].map((v) => (
                <div
                  key={v}
                  className="flex items-start gap-3 p-4 rounded"
                  style={{ background: "oklch(0.13 0.006 60)", border: "1px solid oklch(1 0 0 / 6%)" }}
                >
                  <Star
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.72 0.14 70)" }}
                  />
                  <span
                    className="font-ui text-sm leading-snug"
                    style={{ color: "oklch(0.75 0.008 70)", fontWeight: 300 }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="relative">
              <img
                src={LESSONS_IMG}
                alt="Music lesson in session"
                className="w-full rounded-sm object-cover"
                style={{ height: "520px", filter: "brightness(0.85) contrast(1.05)" }}
              />
              {/* Amber border accent */}
              <div
                className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded-sm -z-10"
                style={{ border: "1px solid oklch(0.72 0.14 70 / 30%)" }}
              />
              {/* Quote overlay */}
              <div
                className="absolute bottom-6 left-6 right-6 p-5 rounded"
                style={{
                  background: "oklch(0.095 0.005 60 / 0.88)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                }}
              >
                <p
                  className="font-display text-lg italic leading-snug"
                  style={{ color: "oklch(0.94 0.008 80)", fontWeight: 400 }}
                >
                  "Appassionata transformed my musical journey with exceptional teachers and a supportive community."
                </p>
                <p
                  className="font-ui text-xs mt-2 tracking-wide"
                  style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.05em" }}
                >
                  — Student Review
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Lessons Section ──────────────────────────────────────────
function Lessons() {
  const instruments = [
    { name: "Piano", icon: "🎹", desc: "Classical, contemporary, and jazz piano for all ages and skill levels." },
    { name: "Guitar & Ukulele", icon: "🎸", desc: "Classical, jazz, tango, and contemporary guitar. Ukulele for all ages." },
    { name: "Violin & Viola", icon: "🎻", desc: "From beginner to competition-ready. Chamber music and ensemble work." },
    { name: "Flute & Piccolo", icon: "🎵", desc: "Solo, orchestral, and chamber flute. All levels from beginner to advanced." },
    { name: "Electric Bass", icon: "🎸", desc: "Rock, jazz, ambient, and experimental. Improvisation and composition." },
    { name: "Composition", icon: "🎼", desc: "Learn to write and arrange music across genres with expert guidance." },
  ];

  return (
    <section id="lessons" className="py-28" style={{ background: "oklch(0.11 0.005 60)" }}>
      <div className="container">
        <div className="divider-amber mb-20" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <div className="reveal lg:sticky lg:top-28">
            <img
              src={INSTRUMENTS_IMG}
              alt="Musical instruments"
              className="w-full rounded-sm object-cover"
              style={{ height: "480px", filter: "brightness(0.9) contrast(1.05)" }}
            />
            <div
              className="mt-8 p-6 rounded-sm"
              style={{ background: "oklch(0.13 0.006 60)", border: "1px solid oklch(1 0 0 / 6%)" }}
            >
              <h3
                className="font-display text-2xl mb-3"
                style={{ color: "oklch(0.94 0.008 80)", fontWeight: 500 }}
              >
                Individual & Group Lessons
              </h3>
              <p
                className="font-ui text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.65 0.01 70)", fontWeight: 300 }}
              >
                Personalized one-on-one instruction tailored to your goals, or collaborative group sessions that build ensemble skills and musical community.
              </p>
              <a
                href="https://amusicva.com/book-here"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-sm px-6 py-3 rounded inline-block transition-all hover:opacity-90"
                style={{
                  background: "oklch(0.72 0.14 70)",
                  color: "oklch(0.095 0.005 60)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Book a Lesson
              </a>
            </div>
          </div>

          {/* Instruments Grid */}
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <div
              className="font-ui text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.2em" }}
            >
              Lessons
            </div>
            <h2
              className="font-display mb-10 leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                color: "oklch(0.94 0.008 80)",
                fontWeight: 400,
              }}
            >
              Find your instrument,
              <br />
              <span style={{ fontStyle: "italic", color: "oklch(0.72 0.14 70)" }}>
                find your voice.
              </span>
            </h2>

            <div className="space-y-3">
              {instruments.map((inst, i) => (
                <div
                  key={inst.name}
                  className="p-5 rounded-sm transition-all duration-300 hover:border-amber-500/30 group"
                  style={{
                    background: "oklch(0.095 0.005 60)",
                    border: "1px solid oklch(1 0 0 / 6%)",
                    transitionDelay: `${i * 0.05}s`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{inst.icon}</span>
                    <div>
                      <h3
                        className="font-display text-xl mb-1 group-hover:text-amber-400 transition-colors"
                        style={{ color: "oklch(0.94 0.008 80)", fontWeight: 500 }}
                      >
                        {inst.name}
                      </h3>
                      <p
                        className="font-ui text-sm leading-relaxed"
                        style={{ color: "oklch(0.62 0.01 70)", fontWeight: 300 }}
                      >
                        {inst.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Faculty Section ──────────────────────────────────────────
function Faculty() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="faculty" className="py-28" style={{ background: "oklch(0.095 0.005 60)" }}>
      <div className="container">
        <div className="divider-amber mb-20" />

        <div className="reveal mb-16">
          <div
            className="font-ui text-xs tracking-widest uppercase mb-6"
            style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.2em" }}
          >
            Our Faculty
          </div>
          <h2
            className="font-display leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "oklch(0.94 0.008 80)",
              fontWeight: 400,
            }}
          >
            World-class musicians.
            <br />
            <span style={{ fontStyle: "italic", color: "oklch(0.72 0.14 70)" }}>
              Dedicated teachers.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {faculty.map((f, i) => (
            <div
              key={f.name}
              className="reveal group cursor-pointer"
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div
                className="relative overflow-hidden rounded-sm"
                style={{ border: "1px solid oklch(1 0 0 / 6%)" }}
              >
                {/* Portrait */}
                <div className="relative overflow-hidden" style={{ paddingBottom: "125%" }}>
                  <img
                    src={f.unsplash}
                    alt={f.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(30%) brightness(0.8) contrast(1.1)" }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, oklch(0.095 0.005 60 / 0.9) 0%, transparent 50%)",
                    }}
                  />
                  {/* Amber hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "oklch(0.72 0.14 70 / 8%)",
                    }}
                  />
                </div>

                {/* Name & Instrument */}
                <div className="p-4">
                  <h3
                    className="font-display text-lg leading-tight mb-1"
                    style={{ color: "oklch(0.94 0.008 80)", fontWeight: 500 }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="font-ui text-xs tracking-wide"
                    style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.05em" }}
                  >
                    {f.instrument}
                  </p>
                </div>
              </div>

              {/* Expanded Bio */}
              {active === i && (
                <div
                  className="mt-2 p-4 rounded-sm"
                  style={{
                    background: "oklch(0.13 0.006 60)",
                    border: "1px solid oklch(0.72 0.14 70 / 20%)",
                  }}
                >
                  <p
                    className="font-ui text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.01 70)", fontWeight: 300 }}
                  >
                    {f.short}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p
          className="text-center mt-8 font-ui text-sm"
          style={{ color: "oklch(0.5 0.01 70)" }}
        >
          Click any faculty member to learn more
        </p>
      </div>
    </section>
  );
}

// ─── Spaces Section ───────────────────────────────────────────
function Spaces() {
  const spaces = [
    {
      title: "Practice Rooms",
      desc: "Professional practice rooms used by our faculty for lessons, available for individual rental. Equipped with quality instruments and acoustically treated.",
      details: ["Daily availability 6am–2am", "Acoustic treatment", "Quality instruments provided", "Flexible hourly rental"],
      img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop",
    },
    {
      title: "Performance Space",
      desc: "Our elegant performance space is available for recitals, showcases, concerts, and private events. Perfect for student recitals or professional performances.",
      details: ["Concert-quality grand piano", "Professional lighting", "Ideal for recitals & events", "Rental inquiries welcome"],
      img: PERFORMANCE_IMG,
    },
  ];

  return (
    <section id="spaces" className="py-28" style={{ background: "oklch(0.11 0.005 60)" }}>
      <div className="container">
        <div className="divider-amber mb-20" />

        <div className="reveal mb-16">
          <div
            className="font-ui text-xs tracking-widest uppercase mb-6"
            style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.2em" }}
          >
            Our Spaces
          </div>
          <h2
            className="font-display leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "oklch(0.94 0.008 80)",
              fontWeight: 400,
            }}
          >
            Practice. Perform.
            <br />
            <span style={{ fontStyle: "italic", color: "oklch(0.72 0.14 70)" }}>
              Make it yours.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {spaces.map((space, i) => (
            <div
              key={space.title}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div
                className="rounded-sm overflow-hidden"
                style={{ border: "1px solid oklch(1 0 0 / 6%)" }}
              >
                <div className="relative overflow-hidden" style={{ height: "280px" }}>
                  <img
                    src={space.img}
                    alt={space.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.75) contrast(1.1)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, oklch(0.095 0.005 60 / 0.7) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute bottom-5 left-6"
                    style={{
                      color: "oklch(0.94 0.008 80)",
                    }}
                  >
                    <h3
                      className="font-display text-3xl"
                      style={{ fontWeight: 500 }}
                    >
                      {space.title}
                    </h3>
                  </div>
                </div>
                <div
                  className="p-6"
                  style={{ background: "oklch(0.13 0.006 60)" }}
                >
                  <p
                    className="font-ui text-sm leading-relaxed mb-5"
                    style={{ color: "oklch(0.65 0.01 70)", fontWeight: 300 }}
                  >
                    {space.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {space.details.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2 font-ui text-xs"
                        style={{ color: "oklch(0.72 0.01 70)" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "oklch(0.72 0.14 70)" }}
                        />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would connect to a backend
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-28" style={{ background: "oklch(0.095 0.005 60)" }}>
      <div className="container">
        <div className="divider-amber mb-20" />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="reveal">
            <div
              className="font-ui text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.2em" }}
            >
              Contact & Location
            </div>
            <h2
              className="font-display mb-8 leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                color: "oklch(0.94 0.008 80)",
                fontWeight: 400,
              }}
            >
              Start your
              <br />
              <span style={{ fontStyle: "italic", color: "oklch(0.72 0.14 70)" }}>
                music journey today.
              </span>
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "oklch(0.72 0.14 70 / 12%)", border: "1px solid oklch(0.72 0.14 70 / 30%)" }}
                >
                  <MapPin size={16} style={{ color: "oklch(0.72 0.14 70)" }} />
                </div>
                <div>
                  <p
                    className="font-ui text-xs uppercase tracking-widest mb-1"
                    style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.15em" }}
                  >
                    Address
                  </p>
                  <p
                    className="font-ui text-sm leading-relaxed"
                    style={{ color: "oklch(0.75 0.008 70)", fontWeight: 300 }}
                  >
                    3911 Blenheim Blvd, Unit 43C
                    <br />
                    Fairfax, VA 22030
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "oklch(0.72 0.14 70 / 12%)", border: "1px solid oklch(0.72 0.14 70 / 30%)" }}
                >
                  <Clock size={16} style={{ color: "oklch(0.72 0.14 70)" }} />
                </div>
                <div>
                  <p
                    className="font-ui text-xs uppercase tracking-widest mb-1"
                    style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.15em" }}
                  >
                    Hours
                  </p>
                  <div
                    className="font-ui text-sm leading-relaxed"
                    style={{ color: "oklch(0.75 0.008 70)", fontWeight: 300 }}
                  >
                    <p>Weekday Lessons: Mon–Fri, 2pm–9pm</p>
                    <p>Weekend Lessons: Sat–Sun, 10am–6pm</p>
                    <p>Practice Rooms: Daily, 6am–2am</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "oklch(0.72 0.14 70 / 12%)", border: "1px solid oklch(0.72 0.14 70 / 30%)" }}
                >
                  <Mail size={16} style={{ color: "oklch(0.72 0.14 70)" }} />
                </div>
                <div>
                  <p
                    className="font-ui text-xs uppercase tracking-widest mb-1"
                    style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.15em" }}
                  >
                    Online
                  </p>
                  <a
                    href="https://amusicva.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-sm transition-colors hover:text-amber-400"
                    style={{ color: "oklch(0.75 0.008 70)", fontWeight: 300 }}
                  >
                    amusicva.com
                  </a>
                </div>
              </div>
            </div>

            {/* Book CTA */}
            <a
              href="https://amusicva.com/book-here"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui inline-block px-8 py-3.5 rounded transition-all hover:opacity-90"
              style={{
                background: "oklch(0.72 0.14 70)",
                color: "oklch(0.095 0.005 60)",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              Book a Lesson Online
            </a>
          </div>

          {/* Contact Form */}
          <div className="reveal" style={{ transitionDelay: "0.12s" }}>
            <div
              className="p-8 rounded-sm"
              style={{
                background: "oklch(0.13 0.006 60)",
                border: "1px solid oklch(1 0 0 / 6%)",
              }}
            >
              <h3
                className="font-display text-2xl mb-6"
                style={{ color: "oklch(0.94 0.008 80)", fontWeight: 500 }}
              >
                Send an Inquiry
              </h3>

              {sent && (
                <div
                  className="mb-5 p-4 rounded-sm font-ui text-sm"
                  style={{
                    background: "oklch(0.72 0.14 70 / 12%)",
                    border: "1px solid oklch(0.72 0.14 70 / 30%)",
                    color: "oklch(0.72 0.14 70)",
                  }}
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
                      style={{ color: "oklch(0.65 0.01 70)", letterSpacing: "0.1em" }}
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
                      className="w-full px-4 py-3 rounded-sm font-ui text-sm outline-none transition-all"
                      style={{
                        background: "oklch(0.095 0.005 60)",
                        border: "1px solid oklch(1 0 0 / 10%)",
                        color: "oklch(0.94 0.008 80)",
                        fontWeight: 300,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.14 70 / 50%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 10%)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block font-ui text-xs uppercase tracking-widest mb-2"
                    style={{ color: "oklch(0.65 0.01 70)", letterSpacing: "0.1em" }}
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
                    className="w-full px-4 py-3 rounded-sm font-ui text-sm outline-none transition-all resize-none"
                    style={{
                      background: "oklch(0.095 0.005 60)",
                      border: "1px solid oklch(1 0 0 / 10%)",
                      color: "oklch(0.94 0.008 80)",
                      fontWeight: 300,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.14 70 / 50%)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 10%)")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-sm font-ui text-sm font-semibold transition-all hover:opacity-90 mt-2"
                  style={{
                    background: "oklch(0.72 0.14 70)",
                    color: "oklch(0.095 0.005 60)",
                    letterSpacing: "0.05em",
                  }}
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
    <footer
      className="py-12"
      style={{
        background: "oklch(0.08 0.005 60)",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div
              className="font-display text-2xl mb-1"
              style={{ color: "oklch(0.94 0.008 80)", fontWeight: 500 }}
            >
              Appassionata
            </div>
            <div
              className="font-ui text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.14 70)", letterSpacing: "0.15em" }}
            >
              Music School of Virginia
            </div>
            <p
              className="font-ui text-xs mt-3"
              style={{ color: "oklch(0.45 0.01 70)", fontWeight: 300 }}
            >
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
              { label: "Book Online", href: "https://amusicva.com/book-here" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-ui text-xs transition-colors hover:text-amber-400"
                style={{ color: "oklch(0.55 0.01 70)", letterSpacing: "0.05em" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 5%)" }}
        >
          <p
            className="font-ui text-xs"
            style={{ color: "oklch(0.38 0.008 70)" }}
          >
            © {new Date().getFullYear()} Appassionata Music School of Virginia. All rights reserved.
          </p>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs transition-colors hover:text-amber-400"
            style={{ color: "oklch(0.45 0.01 70)" }}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Home() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.095 0.005 60)" }}>
      <Nav />
      <Hero />
      <Vision />
      <Lessons />
      <Faculty />
      <Spaces />
      <Contact />
      <Footer />
    </div>
  );
}
